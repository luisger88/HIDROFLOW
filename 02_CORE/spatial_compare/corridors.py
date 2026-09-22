# -*- coding: utf-8 -*-
"""
corridors — análisis multibuffer de corredores (30/60/90/136 m).

Los radios son tolerancias de análisis, no criterios de verdad. Se ejecutan
siempre los cuatro radios y se registra la sensibilidad; el resultado nunca
elige un radio favorable.
"""

from __future__ import annotations

from typing import Any

from .metrics import iou_corredores, longitud_coincidente


def analisis_multibuffer(
    a_geoms: list[Any],
    b_geoms: list[Any],
    radios_m: tuple[float, ...] = (30, 60, 90, 136),
) -> dict[str, Any]:
    """Corredores por radio: % de A dentro de corredor de B y IoU de buffers."""
    radios = tuple(float(r) for r in radios_m)
    if len(set(radios)) != len(radios):
        raise ValueError("radios duplicados en analisis_multibuffer")
    por_radio: list[dict[str, Any]] = []
    sensibilidad: set[float] = set()
    for r in radios:
        a_en_b = longitud_coincidente(a_geoms, b_geoms, r)
        b_en_a = longitud_coincidente(b_geoms, a_geoms, r)
        iou = iou_corredores(a_geoms, b_geoms, r)
        sensibilidad.add(round(a_en_b["pct_de_fuente"], 2))
        por_radio.append(
            {
                "radio_m": r,
                "pct_fuente_dentro": a_en_b["pct_de_fuente"],
                "pct_target_dentro": b_en_a["pct_de_fuente"],
                "longitud_coincidente_m": round(
                    a_en_b["longitud_coincidente_m"], 3
                ),
                "iou_corredores": iou["iou_corredores"],
            }
        )
    observacion = (
        "sensible"
        if len(sensibilidad) > 1
        else "plano: el cambio de radio no altera el % dentro del corredor"
    )
    return {
        "radios_m": sorted(radios),
        "por_radio": por_radio,
        "sensibilidad": observacion,
        "nota": "tolerancias de análisis; ninguna selección de radio representa verdad",
    }


__all__ = ["analisis_multibuffer"]