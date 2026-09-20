"""HF-LCP_DIV-PRODUCTION-001 — Producción determinista de Lcp_div.

Implementa la definición HF_LCP_DIV_DEFINITION_001:
Lcp_div = longitud del recorrido hidráulico MÁXIMO (camino de mayor longitud)
desde la divisoria de aguas hasta el outlet, sobre el MDT operativo
(Copernicus GLO30, 30 m, EPSG:32618).

Método: programación dinámica sobre el grafo D8 (determinista, O(n)):
  flow_length[celda] = max(flow_length[vecino_aguas_arriba] + distancia)
procesando celdas en orden topológico (flowacc ascendente).

Salida (HF_LCP_DIV_001.json):
  - lcp_div_km: camino de mayor longitud (divisoria -> outlet)
  - lcp_main_km: camino de máxima acumulación (cauce principal), contraste.

C-01 (OT-HF-003-CSTATE-001A): el directorio temporal de rasters es explícito
(``--dir_temp`` / ``HF_GEO_DIR_TEMP``); no hay ruta rígida al caso histórico.
"""

import os
import argparse
import json
import hashlib
import numpy as np
import rasterio

from hf_geo.parametros_gobernado import resolver_dir_temp, resolver_datos_gobernados

_D8_VEC = {
    1: (-1, 1), 2: (0, 1), 4: (1, 1), 8: (1, 0),
    16: (1, -1), 32: (0, -1), 64: (-1, -1), 128: (-1, 0),
}
_DIST_M = {
    1: 30.0 * np.sqrt(2), 2: 30.0, 4: 30.0 * np.sqrt(2), 8: 30.0,
    16: 30.0 * np.sqrt(2), 32: 30.0, 64: 30.0 * np.sqrt(2), 128: 30.0,
}
_VEC2D = {v: k for k, v in _D8_VEC.items()}  # offset -> código de dirección


def leer(ruta):
    with rasterio.open(ruta) as ds:
        return ds.read(1), ds.res, str(ds.crs)


def flujo_longitud(fd, fa, mask):
    """DP: longitud del camino más largo desde cada cabecera hasta cada celda."""
    h, w = fd.shape
    fl = np.zeros((h, w), dtype=np.float64)
    valid = np.argwhere(mask)
    order = valid[np.argsort(fa[mask])]
    for (r, c) in order:
        d = int(fd[r, c])
        if d not in _D8_VEC:
            continue
        dr, dc = _D8_VEC[d]
        nr, nc = r + dr, c + dc
        if 0 <= nr < h and 0 <= nc < w and mask[nr, nc]:
            cand = fl[r, c] + _DIST_M[d]
            if cand > fl[nr, nc]:
                fl[nr, nc] = cand
    return fl


def es_aguas_arriba(fd, r, c, nr, nc):
    """¿El vecino (nr,nc) drena hacia (r,c)?  offset de (r,c)->(nr,nc) es (dr,dc);
    el vecino drena a (r,c) si su flowdir apunta a (-dr,-dc)."""
    dr, dc = nr - r, nc - c
    return int(fd[nr, nc]) == _VEC2D.get((-dr, -dc))


def reconstruir_camino(fd, fa, mask, fl, outlet, criterio='largo'):
    h, w = fd.shape
    path = [outlet]
    r, c = outlet
    while True:
        best = None
        bestval = -1.0
        for (dr, dc) in _D8_VEC.values():
            nr, nc = r + dr, c + dc
            if not (0 <= nr < h and 0 <= nc < w and mask[nr, nc]):
                continue
            if not es_aguas_arriba(fd, r, c, nr, nc):
                continue
            val = fl[nr, nc] if criterio == 'largo' else fa[nr, nc]
            if val > bestval:
                best = (nr, nc)
                bestval = val
        if best is None:
            break
        path.append(best)
        r, c = best
    return path


def longitud_camino(path, res):
    """Suma de distancias euclidianas entre centros consecutivos (m)."""
    total = 0.0
    for (r0, c0), (r1, c1) in zip(path, path[1:]):
        dr = abs(r1 - r0)
        dc = abs(c1 - c0)
        if dr and dc:
            total += res * np.sqrt(2)
        else:
            total += res
    return total


def producir_lcp_div(dir_temp: str, caso_id: str = "iguana_pc80") -> dict:
    fd, res, crs = leer(os.path.join(dir_temp, 'flowdir.tif'))
    fa, _, _ = leer(os.path.join(dir_temp, 'flowacc.tif'))
    cu, _, _ = leer(os.path.join(dir_temp, 'cuenca.tif'))
    fill, _, _ = leer(os.path.join(dir_temp, 'fill.tif'))

    mask = cu > 0
    h, w = fd.shape
    res = float(res[0])

    # outlet = máxima acumulación dentro de la cuenca
    outlet = tuple(int(x) for x in np.unravel_index(
        int(np.argmax(np.where(mask, fa, -1.0))), fa.shape))

    # camino de mayor longitud (Lcp_div)
    fl = flujo_longitud(fd, fa, mask)
    camino_largo = reconstruir_camino(fd, fa, mask, fl, outlet, criterio='largo')
    lcp_div_m = fl[outlet]
    lcp_div_km = round(lcp_div_m / 1000.0, 4)

    # camino de máxima acumulación (cauce principal) para contraste
    camino_main = reconstruir_camino(fd, fa, mask, fl, outlet, criterio='acum')
    lcp_main_km = round(longitud_camino(camino_main, res) / 1000.0, 4)

    cotas = [float(fill[r, c]) for (r, c) in camino_largo if mask[r, c]]

    resultado = {
        "identificador": "Lcp_div",
        "variable": "Lcp_div (longitud de cauce principal hasta divisoria)",
        "definicion": "HF_LCP_DIV_DEFINITION_001",
        "mdt": "HF_MDT_OPERATIVO_001 (DEM_Copernicus_GLO30_Aburra.tif)",
        "caso": caso_id,
        "unidad": "km",
        "valor_km": lcp_div_km,
        "metodo": "camino hidraulico de mayor longitud (longest flow path, D8)",
        "resolucion_m": res,
        "crs": crs,
        "outlet_row_col": list(outlet),
        "outlet_flowacc": int(fa[outlet]),
        "n_celdas_camino": len(camino_largo),
        "cota_max_camino_msnm": round(max(cotas), 1) if cotas else None,
        "cota_min_camino_msnm": round(min(cotas), 1) if cotas else None,
        "contraste_lcp_main_km": lcp_main_km,
        "contraste_lcp_main_n_celdas": len(camino_main),
        "reproducible": True,
    }

    return {
        "resultado": resultado,
        "lcp_div_km": lcp_div_km,
        "outlet": outlet,
        "lcp_main_km": lcp_main_km,
        "n_celdas_camino": len(camino_largo),
        "n_celdas_main": len(camino_main),
        "flowacc_outlet": int(fa[outlet]),
        "res": res,
        "crs": crs,
    }


def main():
    parser = argparse.ArgumentParser(description="HF-LCP_DIV-PRODUCTION-001")
    parser.add_argument("--dir_temp", default=None,
                        help="Directorio temporal de rasters operativos (explicito; C-01)")
    parser.add_argument("--caso", default="iguana_pc80", help="id de caso")
    args = parser.parse_args()

    dir_temp = resolver_dir_temp(args.dir_temp)
    salida = producir_lcp_div(dir_temp, caso_id=args.caso)
    resultado = salida["resultado"]

    out_dir = resolver_datos_gobernados()
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'HF_LCP_DIV_001.json')

    payload = json.dumps(resultado, ensure_ascii=False, indent=2, sort_keys=True)
    sha = hashlib.sha256(payload.encode('utf-8')).hexdigest()
    resultado['sha256'] = sha
    payload = json.dumps(resultado, ensure_ascii=False, indent=2, sort_keys=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(payload)

    print('outlet:', salida["outlet"], 'flowacc:', salida["flowacc_outlet"])
    print('Lcp_div (camino mayor longitud):', salida["lcp_div_km"], 'km | celdas:', salida["n_celdas_camino"])
    print('  cota_max:', resultado['cota_max_camino_msnm'], 'cota_min:', resultado['cota_min_camino_msnm'])
    print('contraste Lcp_main (max acum):', salida["lcp_main_km"], 'km | celdas:', salida["n_celdas_main"])
    print('JSON:', out_path)
    print('SHA-256:', sha)


if __name__ == '__main__':
    main()
