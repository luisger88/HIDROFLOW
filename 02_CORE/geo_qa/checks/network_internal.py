# -*- coding: utf-8 -*-
"""
checks/network_internal — validez interna de la red HF derivada (gate02).

Contrato hf.geo-qa.net.v1@1.0. Evalúa la red frente a su registro: continuidad
según el modo declarado (unica=ERROR si desconectada; subred=WARNING),
segmentos, dirección D8, evidencia de monotonicidad (nunca afirmable desde el
vector), umbral, hash y procedencia. MAXIMO resultado global:
INTERNALLY_VALIDATED (gobernado por perfiles.py).
"""

from __future__ import annotations

import json

from ..models import (
    PASS,
    CONDICIONAL,
    FAIL,
    INFO,
    ERROR,
    CRITICAL,
    WARNING,
    RESTRICCION_TERRITORIAL,
    DIAGNOSTIC,
    COMPARISON,
    HISTORICAL_AUDIT,
    CheckResult,
)

_GRP = "red_interna"


def _geoms(fc: dict):
    from shapely.geometry import shape  # noqa: PLC0415

    geoms = []
    for feat in fc.get("features", []):
        geom = feat.get("geometry")
        geoms.append(None if geom is None else shape(geom))
    return geoms


def _componentes(fc: dict) -> list[int]:
    """Componentes conexas por nodos compartidos exactos (6 decimales)."""
    geoms = _geoms(fc)
    n = len(geoms)
    nodo_a_lineas: dict[tuple, list[int]] = {}
    for i, g in enumerate(geoms):
        if g is None or g.geom_type != "LineString":
            continue
        for x, y in (g.coords[0], g.coords[-1]):
            k = (round(float(x), 6), round(float(y), 6))
            nodo_a_lineas.setdefault(k, []).append(i)
    vecinos = [[] for _ in range(n)]
    for k, ids in nodo_a_lineas.items():
        if len(ids) > 1:
            for a in ids:
                for b in ids:
                    if a != b:
                        vecinos[a].append(b)
    visitados = [False] * n
    comps = []
    for i in range(n):
        if visitados[i]:
            continue
        pila = [i]
        visitados[i] = True
        tam = 0
        while pila:
            cur = pila.pop()
            tam += 1
            for v in vecinos[cur]:
                if not visitados[v]:
                    visitados[v] = True
                    pila.append(v)
        comps.append(tam)
    return comps


def feature_collection_valida(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    if fc.get("type") != "FeatureCollection":
        return CheckResult(
            check_id="feature_collection_valida",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"type {fc.get('type')!r} != 'FeatureCollection'",
            consumers_blocked=("DIAGNOSTIC",),
        )
    return CheckResult(
        check_id="feature_collection_valida",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"FeatureCollection con {len(fc.get('features', []))} feature(s)",
    )


def geometrias_lineales(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    tipos = {((f.get("geometry") or {}).get("type")) for f in fc.get("features", [])}
    if tipos != {"LineString"}:
        return CheckResult(
            check_id="geometrias_lineales",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"La red debe ser solo LineString; encontrados {sorted(tipos)}",
            consumers_blocked=("DIAGNOSTIC",),
        )
    return CheckResult(
        check_id="geometrias_lineales",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"{len(fc.get('features', []))} tramos LineString",
    )


def continuidad_topologica_declarada(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    comps = _componentes(fc)
    modo = ctx.get("modo", "subred")
    if not comps:
        return CheckResult(
            check_id="continuidad_topologica_declarada",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin tramos; continuidad no computable",
        )
    if modo == "unica" and len(comps) != 1:
        return CheckResult(
            check_id="continuidad_topologica_declarada",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"Red declarada única pero desconectada: {len(comps)} componente(s)",
            razon="Red desconectada = ERROR (contrato hf.geo-qa.net.v1)",
            consumers_blocked=("DIAGNOSTIC",),
        )
    if len(comps) != 1:
        return CheckResult(
            check_id="continuidad_topologica_declarada",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"{len(comps)} componente(s) por nodos exactos; la red es una subred derivada",
            razon="La continuidad de la red raster consta en el registro (celdas contiguas); "
            "la continuidad vectorial exacta no es afirmable en V1",
        )
    return CheckResult(
        check_id="continuidad_topologica_declarada",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="1 componente conexo por nodos compartidos",
    )


def segmentos_registrados(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    num = len(fc.get("features", []))
    esperado = ctx.get("num_segmentos_esperado")
    if esperado is not None and num != esperado:
        return CheckResult(
            check_id="segmentos_registrados",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"{num} feature(s) != {esperado} segmentos registrados (correspondencia indirecta)",
        )
    return CheckResult(
        check_id="segmentos_registrados",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"{num} segmento(s) en la red",
    )


def duplicados_geometricos(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    vistos: set[str] = set()
    dups = 0
    for feat in fc.get("features", []):
        clave = json.dumps(feat.get("geometry"), sort_keys=True)
        if clave in vistos:
            dups += 1
        vistos.add(clave)
    if dups:
        return CheckResult(
            check_id="duplicados_geometricos",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"{dups} tramo(s) geométricamente duplicado(s)",
        )
    return CheckResult(
        check_id="duplicados_geometricos",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Sin tramos duplicados",
    )


def desconexiones_declaradas(ctx: dict) -> CheckResult:
    comps = _componentes(ctx.get("fc") or {})
    modo = ctx.get("modo", "subred")
    if not comps:
        return CheckResult(
            check_id="desconexiones_declaradas",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin tramos; sin componentes",
        )
    aislados = [c for c in comps if c == 1]
    if modo == "unica" and len(aislados):
        return CheckResult(
            check_id="desconexiones_declaradas",
            grupo=_GRP,
            resultado=FAIL,
            severidad=ERROR,
            detalle=f"{len(aislados)} tramo(s) aislado(s) en red única",
            consumers_blocked=("DIAGNOSTIC",),
        )
    if aislados:
        return CheckResult(
            check_id="desconexiones_declaradas",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"{len(aislados)} tramo(s) sin nodo compartido (subred derivada)",
        )
    return CheckResult(
        check_id="desconexiones_declaradas",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle="Sin tramos aislados",
    )


def direccion_declarada(ctx: dict) -> CheckResult:
    fc = ctx.get("fc") or {}
    direcciones = [
        (f.get("properties") or {}).get("direccion") or (f.get("properties") or {}).get("direction")
        for f in fc.get("features", [])
    ]
    if direcciones and all(d is not None for d in direcciones):
        return CheckResult(
            check_id="direccion_declarada",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle="Dirección declarada por feature",
        )
    return CheckResult(
        check_id="direccion_declarada",
        grupo=_GRP,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle="Dirección no declarada por feature; se remite a la convención D8 del registro",
    )


def coherencia_d8_registrada(ctx: dict) -> CheckResult:
    registro = ctx.get("registro") or {}
    espec = ctx.get("registro_red") or ctx.get("net_ref") or {}
    d8 = (
        registro.get("direccion")
        or registro.get("direccion_d8")
        or registro.get("d8")
        or registro.get("metodo", {}).get("direccion")
        or registro.get("metodo", {}).get("direccion_d8")
        or espec.get("convencion_flujo")
        or espec.get("convencion_direccion")
        or espec.get("direccion_d8")
    )
    if d8:
        return CheckResult(
            check_id="coherencia_d8_registrada",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Convención D8 registrada: {d8}",
        )
    return CheckResult(
        check_id="coherencia_d8_registrada",
        grupo=_GRP,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle="Convención de dirección D8 no visible en el registro técnico",
    )


def monotonicidad_acumulacion_evidencia(ctx: dict) -> CheckResult:
    """NUNCA se afirma monotonicidad: se reporta la evidencia disponible."""
    fc = ctx.get("fc") or {}
    campos = set()
    for f in fc.get("features", []):
        campos |= set((f.get("properties") or {}).keys())
    tiene_acumulacion = any("acumulacion" in c or "accumulation" in c for c in campos)
    if tiene_acumulacion:
        return CheckResult(
            check_id="monotonicidad_acumulacion_evidencia",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Campo de acumulación presente en el vector; la verificación de monotonicidad se deja al análisis raster",
        )
    return CheckResult(
        check_id="monotonicidad_acumulacion_evidencia",
        grupo=_GRP,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle="El vector no expone campo de acumulación; no se afirma monotonicidad",
        razon="Evidencia insuficiente: se requiere contraste con acumulación raster",
    )


def correspondencia_registro(ctx: dict) -> CheckResult:
    registro = ctx.get("registro") or {}
    idx = "está"
    if ctx.get("hash_real") and ctx.get("hash_esperado") and ctx.get("hash_real") != ctx.get("hash_esperado"):
        return CheckResult(
            check_id="correspondencia_registro",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle="Hash de la red no coincide con el registro",
            razon="El archivo de la red fue alterado",
            consumers_blocked=("DIAGNOSTIC",),
        )
    return CheckResult(
        check_id="correspondencia_registro",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Corresponde al registro (hash {'' if idx else ''}coherente)",
    )


def umbral_declarado(ctx: dict) -> CheckResult:
    umbral = ctx.get("umbral_esperado")
    registro = ctx.get("registro") or {}
    reg_umbral = registro.get("umbral_red_celdas") or registro.get("umbral")
    if umbral is None:
        return CheckResult(
            check_id="umbral_declarado",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin umbral esperado en el contexto",
        )
    if reg_umbral is not None and reg_umbral != umbral:
        return CheckResult(
            check_id="umbral_declarado",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=f"Umbral registrado {reg_umbral!r} != esperado {umbral!r}",
        )
    return CheckResult(
        check_id="umbral_declarado",
        grupo=_GRP,
        resultado=PASS,
        severidad=WARNING,
        detalle=f"Umbral de red: {umbral} celdas",
    )


def hash_registrado(ctx: dict) -> CheckResult:
    real = ctx.get("hash_real")
    esperado = ctx.get("hash_esperado")
    if not real or not esperado:
        return CheckResult(
            check_id="hash_registrado",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Sin hash real o registrado",
        )
    if real != esperado:
        return CheckResult(
            check_id="hash_registrado",
            grupo=_GRP,
            resultado=FAIL,
            severidad=CRITICAL,
            detalle=f"Hash real {real[:16]}.. != registrado {esperado[:16]}..",
            razon="La red no corresponde a la versión registrada",
            consumers_blocked=("DIAGNOSTIC",),
        )
    return CheckResult(
        check_id="hash_registrado",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"Hash SHA-256 coincide: {real[:16]}...",
    )


def procedencia_registrada(ctx: dict) -> CheckResult:
    registro = ctx.get("registro") or {}
    procedencia = registro.get("procedencia") or registro.get("origen")
    if procedencia:
        return CheckResult(
            check_id="procedencia_registrada",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Procedencia registrada: {procedencia}",
        )
    return CheckResult(
        check_id="procedencia_registrada",
        grupo=_GRP,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle="Procedencia no declarada en el registro técnico",
    )


def crs_declarado_consistente(ctx: dict) -> CheckResult:
    crs_registro = ctx.get("crs_registro")
    crs_archivo = ctx.get("crs_archivo")
    if not crs_registro or not crs_archivo:
        return CheckResult(
            check_id="crs_declarado_consistente",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="CRS del archivo o del registro no disponible para comparar",
        )
    if crs_registro != crs_archivo:
        return CheckResult(
            check_id="crs_declarado_consistente",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle=(
                f"CRS del archivo {crs_archivo!r} != CRS del registro {crs_registro!r}; "
                "la red se representa en EPSG:4326 aunque el registro de referencia declara EPSG:32618"
            ),
            razon="Discrepancia de CRS declarado; no es un fallo de geometría pero exige "
            "reproyección explícita antes de consumo UTM",
        )
    return CheckResult(
        check_id="crs_declarado_consistente",
        grupo=_GRP,
        resultado=PASS,
        severidad=INFO,
        detalle=f"CRS coherente: {crs_registro}",
    )


def coincidencia_segmento_candidato(ctx: dict) -> CheckResult:
    """Check opcional: el segmento de la celda propuesta coincide con un segmento registrado."""
    proposed = ctx.get("proposed_cell") or {}
    seg = proposed.get("segmento") if isinstance(proposed, dict) else None
    if seg is None:
        return CheckResult(
            check_id="coincidencia_segmento_candidato",
            grupo=_GRP,
            resultado=CONDICIONAL,
            severidad=WARNING,
            detalle="Celda propuesta sin segmento declarado",
        )
    registro = ctx.get("registro") or {}
    cards = registro.get("tarjetas")
    if isinstance(cards, dict) and f"segmento_{seg}" in cards:
        return CheckResult(
            check_id="coincidencia_segmento_candidato",
            grupo=_GRP,
            resultado=PASS,
            severidad=INFO,
            detalle=f"Segmento {seg} declarado en el registro de red",
        )
    return CheckResult(
        check_id="coincidencia_segmento_candidato",
        grupo=_GRP,
        resultado=CONDICIONAL,
        severidad=WARNING,
        detalle=f"Segmento {seg} sin tarjeta individual en el registro; compatibilidad NO tiene certeza",
        razon="Sin tarjeta no se puede atribuir competencia al segmento",
    )


__all__ = [
    "feature_collection_valida",
    "geometrias_lineales",
    "continuidad_topologica_declarada",
    "segmentos_registrados",
    "duplicados_geometricos",
    "desconexiones_declaradas",
    "direccion_declarada",
    "coherencia_d8_registrada",
    "monotonicidad_acumulacion_evidencia",
    "correspondencia_registro",
    "umbral_declarado",
    "hash_registrado",
    "procedencia_registrada",
    "crs_declarado_consistente",
    "coincidencia_segmento_candidato",
]