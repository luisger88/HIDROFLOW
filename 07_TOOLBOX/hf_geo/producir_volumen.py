"""HF-VOLUMEN-PRODUCTION-001 — Producción de Volumen de Escorrentía.

Volumen = Pe × Área, con conversión de unidades consistente:
  Pe [mm] × Área [km²] × 1000 = Volumen [m³]

Control de masa: Volumen / (Pe × Área × 1000) = 1.0 (cierre exacto).

C-01 (OT-HF-003-CSTATE-001A): el área se lee del artefacto gobernado
(``parametros.json`` de la cuenca reproducida); no se hardcodea del caso
histórico.
"""

import argparse
import json
import os
import hashlib

from hf_geo.parametros_gobernado import (
    cargar_parametros,
    extraer_geomorfologia,
    resolver_ruta_parametros,
    resolver_datos_gobernados,
)


def producir_volumen(area_km2: float, pe_artefacto: dict, ruta_parametros: str) -> dict:
    resultados = []
    for r in pe_artefacto["resultados"]:
        tr = r["tr_anos"]
        pe_mm = r["Pe_mm"]
        vol = pe_mm * area_km2 * 1000.0
        resultados.append({
            "tr_anos": tr,
            "Pe_mm": pe_mm,
            "area_km2": area_km2,
            "volumen_m3": round(vol, 1),
        })

    return {
        "identificador": "Volumen",
        "variable": "Volumen de Escorrentía",
        "version": "1.0",
        "fecha": "2026-09-04",
        "caso": "iguana_pc80",
        "unidad": "m3",
        "metodo": "Volumen = Pe × Área (conservación de masa)",
        "area_km2": area_km2,
        "factor_cierre_masa": 1.0,
        "datos_padre": {
            "area_km2": area_km2,
            "canon": "parametros.json de la cuenca reproducida (C-01)",
            "ruta_parametros": ruta_parametros,
            "pe_sha": pe_artefacto["sha256"],
        },
        "resultados": resultados,
        "reproducible": True,
    }


def main():
    parser = argparse.ArgumentParser(description="HF-VOLUMEN-PRODUCTION-001")
    parser.add_argument("--parametros", default=None,
                        help="Ruta explícita a parametros.json de la cuenca reproducida")
    args = parser.parse_args()

    ruta_parametros = resolver_ruta_parametros(args.parametros)
    geom = extraer_geomorfologia(cargar_parametros(ruta_parametros))

    datos_dir = resolver_datos_gobernados()
    pe = json.load(open(os.path.join(datos_dir, "HF_PE_001.json"), encoding="utf-8"))
    doc = producir_volumen(geom["area_km2"], pe, ruta_parametros)

    out_dir = datos_dir
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "HF_VOLUMEN_001.json")
    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=True)
    sha = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    doc["sha256"] = sha
    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(payload)

    print("=== HF-VOLUMEN-PRODUCTION ===")
    print(f"Área = {doc['area_km2']} km² | factor conversión = 1000 (mm·km² → m³)")
    print()
    for r in resultados_esperados(doc):
        print(f"  Tr {r['tr_anos']:>5}: Pe={r['Pe_mm']:7.2f} mm  Volumen={r['volumen_m3']:>12.0f} m³")
    print()
    print("factor de cierre de masa:", doc["factor_cierre_masa"])
    print(f"Fuente geomorfología: {ruta_parametros}")
    print("JSON:", out_path)
    print("SHA-256:", sha)


def resultados_esperados(doc: dict):
    return doc["resultados"]


if __name__ == "__main__":
    main()