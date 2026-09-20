"""HF-TC-PRODUCTION-001 — Producción determinista de Tc.

Produce la primera versión gobernada de Tc como Variable Defendible,
usando exclusivamente los datos geomorfológicos del artefacto de entrada
EXPLÍCITO (``parametros.json`` de la cuenca reproducida) y el
CATALOGO_TC_OFICIAL_001 (Contrato 260-2022, 10 métodos).

C-01 (OT-HF-003-CSTATE-001A): los datos geomorfológicos NO se hardcodean del
caso histórico; se leen y validan desde el artefacto gobernado. Sin ruta
explícita no hay corrida (fallo explícito, sin fallback silencioso).

Métodos excluidos (CONTRASTE, no participan): Kirpich, Clark, FAA, Izzard,
Passini, Williams & Hann, Kerby, NRCS Lag, Ven Te Chow, Cuerpo de Ingenieros.

Adopción: promedio aritmético simple (μ), según el catálogo.
"""

import argparse
import json
import os
import hashlib
import math

from hf_geo.parametros_gobernado import (
    cargar_parametros,
    extraer_geomorfologia,
    resolver_ruta_parametros,
    resolver_datos_gobernados,
)

# ── Fórmulas CATALOGO_TC_OFICIAL_001 (260-2022) ──────────────────
# Salida en horas; luego minutos.
def temez(lcp, sc):
    return 0.3 * (lcp / sc ** 0.25) ** 0.76

def california(lcp, dh):
    return (0.87075 * lcp ** 3 / dh) ** 0.385

def giandotti(area, lcp, dh):
    return (4 * math.sqrt(area) + 1.5 * lcp) / (0.8 * math.sqrt(dh))

def scs_ranser(lcp, sc):
    return 0.000325 * (lcp * 1000) ** 0.77 / sc ** 0.385  # lcp en metros

def johnstone_cross(lcp, sc):
    return 0.1773 * (lcp / sc ** 0.5) ** 0.574

def ventura():
    return None  # requiere α, T1 regionales (no computable)

def bransby_williams(area, sc):
    return 0.083 * area ** 0.374 / sc ** 0.254

def perez_monteagudo(lcp, sc):
    return 0.066 * (lcp / sc ** 0.25) ** 0.77


def producir_tc(g: dict, ruta_parametros: str) -> dict:
    """Calcula Tc desde la geomorfología del artefacto gobernado.

    ``g`` es la salida de ``extraer_geomorfologia``: contiene al menos
    ``area_km2``, ``perimetro_km``, ``lcp_km``, ``dh_msnm``, ``sc_m_m``.
    No mezcla familias geométricas (D-13); Lcp y Lcp_div provienen del mismo
    campo único ``lcp_km`` del artefacto.
    """
    AREA = g["area_km2"]
    LCP_DIV = g["lcp_km"]
    LCP = g["lcp_km"]
    DH = g["dh_msnm"]
    SC = g["sc_m_m"]

    METHODS = [
        ("Témez (1978)", lambda: temez(LCP_DIV, SC)),
        ("California Culverts (1942)", lambda: california(LCP_DIV, DH)),
        ("Giandotti (1990)", lambda: giandotti(AREA, LCP, DH)),
        ("SCS-Ranser (1958)", lambda: scs_ranser(LCP_DIV, SC)),
        ("Johnstone y Cross (1949)", lambda: johnstone_cross(LCP_DIV, SC)),
        ("Ventura-Heron (1978)", ventura),
        ("Bransby-Williams", lambda: bransby_williams(AREA, SC)),
        ("Pérez-Monteagudo (1985)", lambda: perez_monteagudo(LCP_DIV, SC)),
    ]

    resultados = []
    for nombre, fn in METHODS:
        h = fn()
        if h is None:
            resultados.append({"metodo": nombre, "tc_h": None, "tc_min": None})
        else:
            resultados.append({
                "metodo": nombre,
                "tc_h": round(h, 6),
                "tc_min": round(h * 60, 3),
            })

    computables = [r["tc_h"] for r in resultados if r["tc_h"] is not None]
    n = len(computables)
    media_h = sum(computables) / n
    varianza = sum((v - media_h) ** 2 for v in computables) / n
    desv_h = math.sqrt(varianza)
    cv = desv_h / media_h if media_h else None

    doc = {
        "identificador": "Tc",
        "variable": "Tc (Tiempo de Concentración)",
        "version": "1.0",
        "fecha": "2026-09-04",
        "caso": "iguana_pc80",
        "unidad": "min",
        "metodos": resultados,
        "tc_adoptado_min": round(media_h * 60, 3),
        "tc_adoptado_h": round(media_h, 4),
        "media_min": round(media_h * 60, 3),
        "desviacion_estandar_min": round(desv_h * 60, 3),
        "coeficiente_variacion": round(cv, 4) if cv else None,
        "n_metodos_computados": n,
        "metodo_adopcion": "promedio aritmético simple (μ) — CATALOGO_TC_OFICIAL_001",
        "datos_padre": {
            "area_km2": AREA,
            "lcp_div_km": LCP_DIV,
            "lcp_km": LCP,
            "dh_m": DH,
            "sc_m_m": SC,
            "canon": "parametros.json de la cuenca reproducida (C-01)",
            "ruta_parametros": ruta_parametros,
        },
        "referencias_gobernantes": [
            "HF_CORE_METHODS_001.md (CATALOGO_TC_OFICIAL_001)",
            "HF_CORE_DATA_001.md (Área, Lcp_div, dH, Sc)",
        ],
        "excluidos_contraste": [
            "Kirpich", "Clark", "FAA", "Izzard", "Passini",
            "Williams & Hann", "Kerby", "NRCS Lag", "Ven Te Chow",
            "Cuerpo de Ingenieros",
        ],
        "reproducible": True,
    }
    return doc


def main():
    parser = argparse.ArgumentParser(description="HF-TC-PRODUCTION-001")
    parser.add_argument("--parametros", default=None,
                        help="Ruta explícita a parametros.json de la cuenca reproducida")
    args = parser.parse_args()

    ruta = resolver_ruta_parametros(args.parametros)
    geom = extraer_geomorfologia(cargar_parametros(ruta))
    doc = producir_tc(geom, ruta)

    out_dir = resolver_datos_gobernados()
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "HF_TC_001.json")

    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=True)
    sha = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    doc["sha256"] = sha
    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(payload)

    print("=== HF-TC-PRODUCTION-001 ===")
    for r in doc["metodos"]:
        print(f"  {r['metodo']}: {r['tc_min'] if r['tc_min'] is not None else 'null'} min")
    print(f"Tc adoptado (μ) = {doc['tc_adoptado_min']} min")
    print(f"σ = {doc['desviacion_estandar_min']} min | CV = {doc['coeficiente_variacion']}")
    print(f"Fuente geomorfología: {ruta}")
    print(f"JSON: {out_path}")
    print(f"SHA-256: {sha}")


if __name__ == "__main__":
    main()