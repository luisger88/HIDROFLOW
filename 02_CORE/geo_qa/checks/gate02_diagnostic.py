# -*- coding: utf-8 -*-
"""
checks/gate02_diagnostic — cross-checks integrales de la puerta 2.

Contrato hf.geo-qa.puerta2.v1@1.0. Cruza registros del caso (~/spatial,
~/~/*reference, ~/decision, ~/gates) para verificar coherencia SIN tocar
decisiones. Resultado global INTERNALLY_VALIDATED (o _WITH_RESTRICTIONS)
cuando no existen FAIL.
"""

from __future__ import annotations

from ..models import PASS, CONDICIONAL, FAIL, INFO, ERROR, CRITICAL, WARNING, CheckResult

_GRP = "integridad_repositorio"
_GRP2 = "correspondencia_materializada"
_GRP3 = "gobernanza_decision"


def _r(ctx: dict) -> dict:
    return ctx.get("registry") or {}


def hash_mdt_registrado(ctx: dict) -> CheckResult:
    real = ctx.get("hash_mdt_real")
    esperado = ctx.get("hash_mdt_esperado")
    if not real or not esperado:
        return CheckResult(
            check_id="hash_mdt_registrado",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin hash real o registrado del MDT",
        )
    if real != esperado:
        return CheckResult(
            check_id="hash_mdt_registrado",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"Hash MDT {real[:16]}.. != registrado {esperado[:16]}..",
            razon="El DEM de referencia no corresponde al contratado",
            consumers_blocked=("DIAGNOSTIC",),
        )
    return CheckResult(
        check_id="hash_mdt_registrado",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Hash del MDT de referencia coincide",
    )


def hash_red_registrado(ctx: dict) -> CheckResult:
    real = ctx.get("hash_red_real")
    esperado = ctx.get("hash_red_esperado")
    if not real or not esperado:
        return CheckResult(
            check_id="hash_red_registrado",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin hash real o registrado de la red",
        )
    if real != esperado:
        return CheckResult(
            check_id="hash_red_registrado",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"Hash red {real[:16]}.. != registrado {esperado[:16]}..",
            razon="La red derivada no corresponde a la versión registrada",
            consumers_blocked=("DIAGNOSTIC",),
        )
    return CheckResult(
        check_id="hash_red_registrado",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Hash de la red derivada coincide",
    )


def umbral_red_registrado(ctx: dict) -> CheckResult:
    real = ctx.get("umbral_red")
    esperado = ctx.get("umbral_red_esperado")
    if real is None or esperado is None:
        return CheckResult(
            check_id="umbral_red_registrado",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin umbral comparable",
        )
    if real != esperado:
        return CheckResult(
            check_id="umbral_red_registrado",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"Umbral {real!r} != esperado {esperado!r}",
        )
    return CheckResult(
        check_id="umbral_red_registrado",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Umbral de red {esperado} celdas",
    )


def conjuntos_coherentes(ctx: dict) -> CheckResult:
    r = _r(ctx)
    net = ctx.get("net_ref") or {}
    reg_umbral = r.get("umbral_red_celdas")
    ref_umbral = net.get("umbral")
    esperado = ctx.get("umbral_red_esperado")
    ok = True
    motivos = []
    if reg_umbral is not None and esperado is not None and reg_umbral != esperado:
        ok = False
        motivos.append("umbral del registro != esperado")
    if ref_umbral is not None and esperado is not None and ref_umbral != esperado:
        ok = False
        motivos.append("umbral de referencia != esperado")
    if ok:
        return CheckResult(
            check_id="conjuntos_coherentes",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle="Conjuntos de umbral/celdas coherentes entre registro y referencia",
        )
    return CheckResult(
        check_id="conjuntos_coherentes",
        grupo=_GRP,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle="Incoherencia de conjuntos: " + "; ".join(motivos),
    )


def inclusion_punto_contractual(ctx: dict) -> CheckResult:
    punto = ctx.get("punto_contractual")
    shape = ctx.get("shape_mdt")
    if not punto or not shape:
        return CheckResult(
            check_id="inclusion_punto_contractual",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin punto contractual o sin shape del MDT",
        )
    fila, col = punto
    rows, cols = shape[0], shape[1]
    if 0 <= fila < rows and 0 <= col < cols:
        return CheckResult(
            check_id="inclusion_punto_contractual",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Punto D-03 (fila={fila}, col={col}) dentro del MDT {rows}x{cols}",
        )
    return CheckResult(
        check_id="inclusion_punto_contractual",
        grupo=_GRP,
        resultado=FAIL,
        severidad=CRITICAL,
        detalle=f"Punto D-03 (fila={fila}, col={col}) fuera del MDT {rows}x{cols}",
        consumers_blocked=("DIAGNOSTIC",),
    )


def contraste_existente(ctx: dict) -> CheckResult:
    if ctx.get("contraste_presente"):
        return CheckResult(
            check_id="contraste_existente",
            grupo=_GRP2,
            resultado=PASS,
            severidad=INFO,
            detalle="Contraste D-03 del gate 2 presente en el repositorio espacial",
        )
    return CheckResult(
        check_id="contraste_existente",
        grupo=_GRP2,
        resultado=FAIL,
        severidad=ERROR,
        detalle="Contraste del gate 2 ausente",
        razon="Sin contraste no hay materialización de la puerta 2",
        consumers_blocked=("DIAGNOSTIC",),
    )


def registro_espacial_coherente(ctx: dict) -> CheckResult:
    r = _r(ctx)
    crs = r.get("crs") or {}
    exigidos = {"DEM", "HIDROGRAFIA", "CALIDAD_SPATIAL", "red_gate02_D03", "project-location", "proposed-cell", "manifiesto_gate02", "contraste_snap_D03"}
    presentes = set((r.get("activos") or {}).keys())
    faltan = sorted(exigidos - presentes)
    if faltan:
        return CheckResult(
            check_id="registro_espacial_coherente",
            grupo=_GRP2,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"Activos esperados ausentes del registro: {faltan}",
        )
    if not crs:
        return CheckResult(
            check_id="registro_espacial_coherente",
            grupo=_GRP2,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="CRS global del registro ausente",
        )
    return CheckResult(
        check_id="registro_espacial_coherente",
        grupo=_GRP2,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Registro espacial coherente ({len(presentes)} activos; CRS={crs})",
    )


def correspondencia_proposed_cell(ctx: dict) -> CheckResult:
    proposed = ctx.get("proposed_cell") or {}
    if not isinstance(proposed, dict) or not proposed:
        return CheckResult(
            check_id="correspondencia_proposed_cell",
            grupo=_GRP3,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin celda propuesta materializada",
        )
    problema = None
    if proposed.get("fila") != 1028:
        problema = "fila"
    if problema is None and proposed.get("columna") != 946:
        problema = "columna"
    if problema is None and proposed.get("segmento") != 24:
        problema = "segmento"
    if problema is None and "PROPUESTA" not in str(proposed.get("clasificacion", "")).upper():
        problema = "clasificacion"
    if problema:
        return CheckResult(
            check_id="correspondencia_proposed_cell",
            grupo=_GRP3,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"Proposed cell con divergencia en {problema}",
        )
    return CheckResult(
        check_id="correspondencia_proposed_cell",
        grupo=_GRP3,
        resultado=PASS,
        severidad=INFO,
        detalle="Proposed cell (1028, 946, segmento 24) coherente con el contrato del dominio",
    )


def decision_no_adoptada(ctx: dict) -> CheckResult:
    decision = ctx.get("spatial_decision") or {}
    estado = decision.get("estado") or {}
    adoptada = estado.get("adoptada") or estado.get("aceptada")
    adopted_cell = decision.get("adopted_cell")
    if adoptada or adopted_cell is not None:
        return CheckResult(
            check_id="decision_no_adoptada",
            grupo=_GRP3,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle="Se detectó adopción de celda espacial NO avalada (adopted_cell presente)",
            razon="En V1 no está autorizado adoptar la celda propuesta",
            consumers_blocked=("DIAGNOSTIC", "DECISION_PROFESIONAL"),
        )
    return CheckResult(
        check_id="decision_no_adoptada",
        grupo=_GRP3,
        resultado=PASS,
        severidad=INFO,
        detalle="Sin adopción de decisión espacial; adopted_cell null",
    )


def gate2_condicional(ctx: dict) -> CheckResult:
    gates = ctx.get("gates") or {}
    g2 = gates.get("GATE_2")
    if g2 == "CONDICIONAL":
        return CheckResult(
            check_id="gate2_condicional",
            grupo=_GRP3,
            resultado=PASS,
            severidad=INFO,
            detalle="GATE_2 registrado como CONDICIONAL",
        )
    return CheckResult(
        check_id="gate2_condicional",
        grupo=_GRP3,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle=f"GATE_2={g2!r}; se esperaba CONDICIONAL",
    )


def cell_propuesta_no_adoptada(ctx: dict) -> CheckResult:
    proposed = ctx.get("proposed_cell") or {}
    estado = proposed.get("status") if isinstance(proposed, dict) else None
    if estado and "NO_" in str(estado).upper():
        return CheckResult(
            check_id="cell_propuesta_no_adoptada",
            grupo=_GRP3,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Celda propuesta en estado {estado!r} (no adoptada)",
        )
    if estado:
        return CheckResult(
            check_id="cell_propuesta_no_adoptada",
            grupo=_GRP3,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"Estado de la celda propuesta inesperado: {estado!r}",
        )
    return CheckResult(
        check_id="cell_propuesta_no_adoptada",
        grupo=_GRP3,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle="Status de la celda propuesta no declarado",
    )


def gates_preservados(ctx: dict) -> CheckResult:
    gates = ctx.get("gates") or {}
    g1 = gates.get("GATE_1")
    g2 = gates.get("GATE_2")
    g3 = gates.get("GATE_3")
    problemas = []
    if g1 != "PASS":
        problemas.append(f"GATE_1={g1!r}")
    if g2 != "CONDICIONAL":
        problemas.append(f"GATE_2={g2!r}")
    if g3 != "BLOQUEADO":
        problemas.append(f"GATE_3={g3!r}")
    if problemas:
        return CheckResult(
            check_id="gates_preservados",
            grupo=_GRP3,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Gates divergentes: " + "; ".join(problemas),
        )
    return CheckResult(
        check_id="gates_preservados",
        grupo=_GRP3,
        resultado=PASS,
        severidad=INFO,
        detalle="GATE_1=PASS, GATE_2=CONDICIONAL, GATE_3=BLOQUEADO preservados",
    )


__all__ = [
    "hash_mdt_registrado",
    "hash_red_registrado",
    "umbral_red_registrado",
    "conjuntos_coherentes",
    "inclusion_punto_contractual",
    "contraste_existente",
    "registro_espacial_coherente",
    "correspondencia_proposed_cell",
    "decision_no_adoptada",
    "gate2_condicional",
    "cell_propuesta_no_adoptada",
    "gates_preservados",
]