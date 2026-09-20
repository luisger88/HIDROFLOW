"""HF-GEOMORPHOMETRY-PRODUCTION-001 — Producción determinista de dH y Sc.

Definiciones (catálogo 260-2022, HF_GEO_HYDRO_ESPECIFICACION_REFERENCIA.md):
  - dH (desnivel de cuenca) = Hmax - Hcmin        (línea 40)
      Hmax  = elevación máxima de la cuenca (ZonalStatistics MDT)
      Hcmin = cota mínima del cauce principal = elevación del outlet
  - Sc (pendiente media del cauce) = (Hcmax - Hcmin) / Lcp   (línea 35)
      Hcmax = cota máxima del cauce principal (a lo largo del camino de mayor longitud)
      Lcp   = longitud del cauce principal (gobernado como Lcp_div; coinciden en La Iguana)

IMPORTANTE (documentado, no asumido):
  dH usa Hmax (elevación máxima de la CUENCA = 3142.3 msnm).
  Sc usa Hcmax (cota máxima del CAUCE = 3134.9 msnm).
  Son distintos: Hmax incluye el punto más alto del relieve (divisoria),
  mientras Hcmax es la cabecera del cauce. Por eso Sc != dH / Lcp_div.

Método: determinista, programación dinámica D8 (reusa lógica de producir_lcp_div.py).

C-01 (OT-HF-003-CSTATE-001A): el directorio temporal de rasters y el
``Lcp_div`` se leen explícitamente (env/args y ``parametros.json``); no hay
rutas ni valores rígidos del caso histórico.
"""

import argparse
import os
import json
import hashlib
import numpy as np
import rasterio

from hf_geo.parametros_gobernado import (
    cargar_parametros,
    extraer_geomorfologia,
    resolver_ruta_parametros,
    resolver_datos_gobernados,
    resolver_dir_temp,
)

_D8_VEC = {
    1: (-1, 1), 2: (0, 1), 4: (1, 1), 8: (1, 0),
    16: (1, -1), 32: (0, -1), 64: (-1, -1), 128: (-1, 0),
}
_VEC2D = {v: k for k, v in _D8_VEC.items()}


def leer(ruta):
    with rasterio.open(ruta) as ds:
        return ds.read(1), ds.res, str(ds.crs)


def flujo_longitud(fd, fa, mask, resolucion_m=30.0):
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
            dist = resolucion_m * np.sqrt(2) if (dr and dc) else resolucion_m
            cand = fl[r, c] + dist
            if cand > fl[nr, nc]:
                fl[nr, nc] = cand
    return fl


def es_aguas_arriba(fd, r, c, nr, nc):
    dr, dc = nr - r, nc - c
    return int(fd[nr, nc]) == _VEC2D.get((-dr, -dc))


def camino_largo(fd, mask, fl, outlet):
    h, w = fd.shape
    path = [outlet]
    r, c = outlet
    while True:
        best, bestval = None, -1.0
        for (dr, dc) in _D8_VEC.values():
            nr, nc = r + dr, c + dc
            if 0 <= nr < h and 0 <= nc < w and mask[nr, nc]:
                if es_aguas_arriba(fd, r, c, nr, nc) and fl[nr, nc] > bestval:
                    best, bestval = (nr, nc), fl[nr, nc]
        if best is None:
            break
        path.append(best)
        r, c = best
    return path


def producir_geomorfometria(dir_temp: str, lcp_div_km: float, ruta_parametros: str) -> dict:
    """Calcula dH y Sc desde rasters operativos y el Lcp_div gobernado."""
    fill, res, crs = leer(os.path.join(dir_temp, 'fill.tif'))
    fd, _, _ = leer(os.path.join(dir_temp, 'flowdir.tif'))
    fa, _, _ = leer(os.path.join(dir_temp, 'flowacc.tif'))
    cu, _, _ = leer(os.path.join(dir_temp, 'cuenca.tif'))

    mask = cu > 0
    res = float(res[0])

    outlet = tuple(int(x) for x in np.unravel_index(
        int(np.argmax(np.where(mask, fa, -1.0))), fa.shape))

    Hmax = float(fill[mask].max())
    Hcmin = float(fill[outlet])
    dH = Hmax - Hcmin

    fl = flujo_longitud(fd, fa, mask, res)
    path = camino_largo(fd, mask, fl, outlet)
    Hcmax = float(max(fill[r_, c_] for (r_, c_) in path))
    Sc = (Hcmax - Hcmin) / (lcp_div_km * 1000.0)

    dH_r = round(dH, 1)
    Sc_r = round(Sc, 6)

    resultado_dh = {
        "identificador": "dH",
        "variable": "dH (desnivel de cuenca)",
        "definicion": "HF_GEO_HYDRO_ESPECIFICACION_REFERENCIA.md linea 40 (dH = Hmax - Hcmin)",
        "mdt": "HF_MDT_OPERATIVO_001 (DEM_Copernicus_GLO30_Aburra.tif)",
        "caso": "iguana_pc80",
        "unidad": "m",
        "valor_m": dH_r,
        "Hmax_msnm": round(Hmax, 1),
        "Hcmin_msnm": round(Hcmin, 1),
        "outlet_row_col": list(outlet),
        "resolucion_m": res,
        "crs": crs,
        "reproducible": True,
    }
    resultado_sc = {
        "identificador": "Sc",
        "variable": "Sc (pendiente media del cauce)",
        "definicion": "HF_GEO_HYDRO_ESPECIFICACION_REFERENCIA.md linea 35 (Sc = (Hcmax-Hcmin)/Lcp)",
        "mdt": "HF_MDT_OPERATIVO_001 (DEM_Copernicus_GLO30_Aburra.tif)",
        "caso": "iguana_pc80",
        "unidad": "m/m",
        "valor_m_m": Sc_r,
        "Hcmax_msnm": round(Hcmax, 1),
        "Hcmin_msnm": round(Hcmin, 1),
        "Lcp_div_km": lcp_div_km,
        "Lcp_div_canon": "parametros.json de la cuenca reproducida (C-01)",
        "ruta_parametros": ruta_parametros,
        "nota": "Sc usa Hcmax (cabecera del cauce), no Hmax (cuenca). Catalogo 260-2022.",
        "reproducible": True,
    }
    return {
        "dH": resultado_dh,
        "Sc": resultado_sc,
        "Hmax": Hmax,
        "Hcmin": Hcmin,
        "Hcmax": Hcmax,
        "outlet": outlet,
        "res": res,
    }


def main():
    parser = argparse.ArgumentParser(description="HF-GEOMORPHOMETRY-PRODUCTION-001")
    parser.add_argument("--parametros", default=None,
                        help="Ruta explícita a parametros.json de la cuenca reproducida")
    parser.add_argument("--dir_temp", default=None,
                        help="Directorio temporal de rasters operativos")
    args = parser.parse_args()

    ruta_parametros = resolver_ruta_parametros(args.parametros)
    geom = extraer_geomorfologia(cargar_parametros(ruta_parametros))
    dir_temp = resolver_dir_temp(args.dir_temp)

    res = producir_geomorfometria(dir_temp, geom["lcp_km"], ruta_parametros)
    resultado_dh, resultado_sc = res["dH"], res["Sc"]

    print('=== dH ===')
    print('Hmax (max cuenca):', round(res["Hmax"], 3), 'msnm')
    print('Hcmin (outlet):', round(res["Hcmin"], 3), 'msnm')
    print('dH =', resultado_dh["valor_m"], 'm')
    print()
    print('=== Sc ===')
    print('Hcmax (cabecera cauce, camino largo):', round(res["Hcmax"], 3), 'msnm')
    print('Lcp_div:', resultado_sc["Lcp_div_km"], 'km')
    print('Sc = (Hcmax-Hcmin)/Lcp_div =', resultado_sc["valor_m_m"], 'm/m')
    print('NOTA: Sc usa Hcmax (cauce), no Hmax (cuenca). Sc != dH/Lcp_div =',
          round(resultado_dh["valor_m"] / (resultado_sc["Lcp_div_km"] * 1000.0), 6))

    out_dir = resolver_datos_gobernados()
    for nombre, resultado in [("HF_DH_001.json", resultado_dh),
                               ("HF_SC_001.json", resultado_sc)]:
        payload = json.dumps(resultado, ensure_ascii=False, indent=2, sort_keys=True)
        sha = hashlib.sha256(payload.encode('utf-8')).hexdigest()
        resultado['sha256'] = sha
        payload = json.dumps(resultado, ensure_ascii=False, indent=2, sort_keys=True)
        ruta = os.path.join(out_dir, nombre)
        with open(ruta, 'w', encoding='utf-8') as f:
            f.write(payload)
        print(f'{nombre} -> SHA-256: {sha}')


if __name__ == '__main__':
    main()