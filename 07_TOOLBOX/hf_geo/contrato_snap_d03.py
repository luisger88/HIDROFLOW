"""Contrato gobernado del snap D-03 (HF-CASE-STATE-001A, corrección C-03).

Define, de forma conceptual y configurable, el contrato que regirá el futuro
snap del punto hidrológico D-03:

  lat = 6.271785117145225, lon = -75.59408755595547, cota = 1511.36 msnm

Regla de tolerancia (C-03):
  - tolerancia primaria = resolución operativa (1 celda) = 30 m.
  - excepción profesional documentada (con acta): hasta 136 m (máximo
    histórico observado, banda 128–136 m).
  - bloqueo: si la distancia candidata supera la excepción máxima o no existe
    acta profesional, el snap queda bloqueado.

Resolución de la ambigüedad de tolerancias (documentada, no arbitraria):
  - 30 m      → tolerancia primaria vinculada a resolución del MDT.
  - 200 m     → tolerancia legada hardcodeada en mod_04_snap.py; descartada
                como límite canónico por no derivar de la resolución ni de un
                acta.
  - 128–136 m → distancias históricas observadas; exceden la primaria; solo
                admitidas bajo excepción profesional documentada (acta).

Prohibición: el snap no puede seleccionar automáticamente un outlet distinto
del punto D-03.
"""

from __future__ import annotations

import json
import os
from pathlib import Path

RUTA_CONTRATO_DEFAULT = str(
    Path(__file__).resolve().parent / "config" / "contrato_snap_D03.json"
)

#: Máximo histórico documentado de la banda ambigua (128–136 m).
EXCEPCION_MAX_M = 136.0

CAMPOS_REQUERIDOS = (
    "version",
    "ot",
    "punto_original",
    "crs_original",
    "mdt",
    "umbral_red_celdas",
    "tolerancia",
    "punto_snappeado",
    "resultado_snap",
    "criterios_pass_fail",
    "prohibicion",
)


def resolver_ruta_contrato(ruta: str | None = None) -> str:
    """Resuelve la ruta del contrato (arg > env > el contratado por defecto)."""
    if ruta:
        return str(Path(ruta).resolve())
    env = os.environ.get("HF_SNAP_CONTRATO")
    if env:
        return str(Path(env).resolve())
    return RUTA_CONTRATO_DEFAULT


def cargar_contrato(ruta: str | None = None) -> dict:
    ruta_resuelta = resolver_ruta_contrato(ruta)
    with open(ruta_resuelta, "r", encoding="utf-8") as f:
        return json.load(f)


def validar_contrato_snap(contrato: dict) -> list[str]:
    """Valida el contrato y retorna errores (vacío si cumple)."""
    errores = []
    for campo in CAMPOS_REQUERIDOS:
        if campo not in contrato:
            errores.append(f"falta campo: {campo}")

    if "tolerancia" in contrato:
        tol = contrato["tolerancia"]
        for sub in ("resolucion_m", "tolerancia_primaria_m",
                    "excepcion_profesional_max_m"):
            if sub not in tol:
                errores.append(f"falta campo de tolerancia: {sub}")
        if tol.get("excepcion_profesional_max_m", 0) < EXCEPCION_MAX_M:
            errores.append(
                f"excepcion_profesional_max_m < {EXCEPCION_MAX_M} m documentado"
            )

    po = contrato.get("punto_original", {})
    if po.get("lat") != 6.271785117145225:
        errores.append("punto_original.lat difiere del catálogo D-03")
    if po.get("lon") != -75.59408755595547:
        errores.append("punto_original.lon difiere del catálogo D-03")
    if po.get("cota_msnm") != 1511.36:
        errores.append("punto_original.cota_msnm difiere del catálogo D-03")

    # Prohibición de outlet automático: el contrato debe retener D-03.
    if contrato.get("resultado_snap", {}).get("outlet_retenido", True) is False:
        errores.append("el resultado_snap declara outlet_retenido=False (prohibido)")

    return errores


def clasificar_distancia(distancia_m: float, con_acta: bool = False) -> dict:
    """Clasifica una distancia de snap según la regla gobernada.

    Returns:
        dict con ``veredicto`` (PASS / PASS_CONDICIONAL / FAIL), ``motivo`` y
        ``distancia_m``.
    """
    tol_primaria = 30.0
    if distancia_m <= tol_primaria:
        return {
            "veredicto": "PASS",
            "motivo": (f"distancia {distancia_m:0.1f} m ≤ tolerancia primaria "
                       f"{tol_primaria:0.0f} m (1 celda de resolución)"),
            "distancia_m": distancia_m,
        }
    if distancia_m <= EXCEPCION_MAX_M:
        if con_acta:
            return {
                "veredicto": "PASS_CONDICIONAL",
                "motivo": (f"distancia {distancia_m:0.1f} m entre tolerancia "
                           f"primaria y excepción máxima {EXCEPCION_MAX_M:0.0f} m "
                           "con acta profesional documentada"),
                "distancia_m": distancia_m,
            }
        return {
            "veredicto": "FAIL",
            "motivo": (f"distancia {distancia_m:0.1f} m excede la tolerancia "
                       f"primaria y no existe acta profesional"),
            "distancia_m": distancia_m,
        }
    return {
        "veredicto": "FAIL",
        "motivo": (f"distancia {distancia_m:0.1f} m excede la excepción máxima "
                   f"{EXCEPCION_MAX_M:0.0f} m; snap bloqueado"),
        "distancia_m": distancia_m,
    }


def construir_contrato_default() -> dict:
    """Contrato canónico del snap D-03."""
    return {
        "version": "1.0",
        "ot": "OT-HF-003-CSTATE-001A",
        "decision": "D-03",
        "punto_original": {
            "lat": 6.271785117145225,
            "lon": -75.59408755595547,
            "cota_msnm": 1511.36,
        },
        "crs_original": "EPSG:4326",
        "mdt": {
            "ruta": "01_DEM_HIDRO/00_BASE/DEM_Copernicus_GLO30_Aburra.tif",
            "sha256": "1B12E9DB53AF9474407ECBCAD846A6FA16E35FDB0AAD53D81529C025E22B0800",
            "resolucion_m": 30,
        },
        "crs_operativo": "EPSG:32618",
        "umbral_red_celdas": 500,
        "tolerancia": {
            "resolucion_m": 30,
            "tolerancia_primaria_m": 30,
            "excepcion_profesional_max_m": 136,
            "regla": (
                "tolerancia primaria = resolución (1 celda = 30 m); excepción "
                "profesional documentada hasta 136 m con acta; bloqueo si se "
                "supera sin acta"
            ),
        },
        "resolucion_ambiguedad": [
            {"valor_m": 30.0, "clasificacion": "tolerancia primaria (1 celda de resolución operativa)"},
            {"valor_m": 200.0, "clasificacion": "tolerancia legada hardcodeada (mod_04_snap); descartada como límite canónico"},
            {"valor_m": 132.0, "rango": "128-136", "clasificacion": "distancias históricas observadas; admitidas solo bajo excepción profesional documentada (acta)"},
        ],
        "punto_snappeado": None,
        "resultado_snap": {
            "distancia_m": None,
            "fila": None,
            "columna": None,
            "elevacion_msnm": None,
            "segmento": None,
            "outlet_retenido": True,
        },
        "criterios_pass_fail": [
            {"id": "PF-01", "regla": "0 ≤ distancia ≤ 30 m", "veredicto": "PASS"},
            {"id": "PF-02", "regla": "30 m < distancia ≤ 136 m con acta profesional", "veredicto": "PASS_CONDICIONAL"},
            {"id": "PF-03", "regla": "distancia > 136 m o sin acta", "veredicto": "FAIL"},
        ],
        "prohibicion": (
            "El snap no puede seleccionar automáticamente un outlet distinto del "
            "punto D-03; cualquier desviación requiere acta profesional y "
            "registro explícito."
        ),
    }


if __name__ == "__main__":
    import sys
    contrato = construir_contrato_default()
    errores = validar_contrato_snap(contrato)
    print(json.dumps(contrato, ensure_ascii=False, indent=2, sort_keys=True))
    print("ERRORES:", errores if errores else "ninguno")
    if errores:
        sys.exit(1)