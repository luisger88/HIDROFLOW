"""HF-QP-PRODUCTION-001 — Producción de Qp (Caudal Pico).

Qp se produce por el método SCS-HU (triangular) desde datos gobernados:
  - Área (A), Tc, Pe por Tr.

Método oficial (scsUh.ts):
  Tlag = 0.6·Tc
  Tp   = Tlag + Δt/2        (Δt = 5 min)
  Tb   = 2.67·Tp
  qp   = 2·V_1mm / (Tb·60)  = 0.208·A/Tp_h  [m³/s por mm]
  Qp   = qp · Pe

Snyder y Clark IUH permanecen en CONTRASTE (no participan en Qp oficial).

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

DT_MIN = 5.0  # Δt estándar HF


def producir_qp(area_km2: float, tc_artefacto: dict, pe_artefacto: dict,
                ruta_parametros: str) -> dict:
    tc_min = tc_artefacto["tc_adoptado_min"]

    tlag = 0.6 * tc_min
    tp = tlag + DT_MIN / 2
    tb = 2.67 * tp
    tp_h = tp / 60.0

    v_1mm = area_km2 * 1000.0
    qp = 2.0 * v_1mm / (tb * 60.0)

    resultados = []
    for r in pe_artefacto["resultados"]:
        tr = r["tr_anos"]
        pe = r["Pe_mm"]
        q_ = qp * pe
        resultados.append({
            "tr_anos": tr,
            "Pe_mm": r["Pe_mm"],
            "Qp_m3s": round(q_, 3),
        })

    return {
        "identificador": "Qp",
        "variable": "Qp (Caudal Pico)",
        "version": "1.0",
        "fecha": "2026-09-04",
        "caso": "iguana_pc80",
        "unidad": "m3/s",
        "metodo_adoptado": "SCS Unit Hydrograph (triangular)",
        "datos_padre": {
            "area_km2": area_km2,
            "canon": "parametros.json de la cuenca reproducida (C-01)",
            "ruta_parametros": ruta_parametros,
            "tc_min": tc_min,
            "tc_sha": tc_artefacto["sha256"],
            "pe_sha": pe_artefacto["sha256"],
        },
        "parametros_uh": {
            "Tlag_min": round(tlag, 3),
            "Tp_min": round(tp, 3),
            "Tb_min": round(tb, 3),
            "qp_m3s_mm": round(qp, 4),
            "dt_min": DT_MIN,
        },
        "metodos_contraste": ["Snyder", "Clark IUH"],
        "resultados": resultados,
        "reproducible": True,
    }


def main():
    parser = argparse.ArgumentParser(description="HF-QP-PRODUCTION-001")
    parser.add_argument("--parametros", default=None,
                        help="Ruta explícita a parametros.json de la cuenca reproducida")
    args = parser.parse_args()

    ruta_parametros = resolver_ruta_parametros(args.parametros)
    geom = extraer_geomorfologia(cargar_parametros(ruta_parametros))

    datos_dir = resolver_datos_gobernados()
    tc = json.load(open(os.path.join(datos_dir, "HF_TC_001.json"), encoding="utf-8"))
    pe = json.load(open(os.path.join(datos_dir, "HF_PE_001.json"), encoding="utf-8"))
    doc = producir_qp(geom["area_km2"], tc, pe, ruta_parametros)

    out_dir = datos_dir
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "HF_QP_001.json")
    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=True)
    sha = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    doc["sha256"] = sha
    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(payload)

    print("=== HF-QP-PRODUCTION ===")
    print(f"A={doc['datos_padre']['area_km2']} km² | Tc={tc_min_doc(doc)} min | "
          f"Tp={doc['parametros_uh']['Tp_min']} min | qp={doc['parametros_uh']['qp_m3s_mm']} m³/s/mm")
    print()
    for r in doc["resultados"]:
        print(f"  Tr {r['tr_anos']:>5}: Pe={r['Pe_mm']:7.2f} mm  Qp={r['Qp_m3s']:8.2f} m³/s")
    print()
    print(f"Fuente geomorfología: {ruta_parametros}")
    print("JSON:", out_path)
    print("SHA-256:", sha)


def tc_min_doc(doc: dict) -> float:
    return doc["datos_padre"]["tc_min"]


if __name__ == "__main__":
    main()