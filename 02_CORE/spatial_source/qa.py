# -*- coding: utf-8 -*-
"""
qa — perfiles de calidad de la fuente (adaptación de HF-GEO-QA V1).

Perfiles:
  QA_SPATIAL_REFERENCE_V1  -> checks puros de geo_qa.checks.spatial_reference.
  QA_VECTOR_GEOMETRY_V1    -> checks puros de geo_qa.checks.vector_geometry con
                              la FeatureCollection materializada de la capa.
  QA_NETWORK_INTERNAL_V1    -> adaptación streaming propia para fuente externa
                              (semántica hf.geo-qa.v1; los checks de red de HF
                              exigen el expediente interno de red, no aplicable).

Los checks puros no se modifican: se les entrega el `ctx` que esperan. Las
adaptaciones de red declaran `metodo: "streaming adaptado"` en el detalle.
"""

from __future__ import annotations

from .models import QA_PROFILES, PERFIL_SOURCE_IDS

_GRP_RED = "red"
_GRP_DATOS = "datos"


def _checks_referencia(gpkg, crs_info, cobertura, stats, d03_nativo):
    import geo_qa.models as GM  # noqa: PLC0415
    import geo_qa.checks.spatial_reference as SR  # noqa: PLC0415

    ventana = cobertura["ventana_utm_32618"]
    native_b = cobertura["extension_nativa"]
    datum_info = crs_info.get("datum") or {}
    registro = {
        "crs": crs_info["crs_declarado"],
        "datum": datum_info.get("nombre"),
        "unidades": crs_info.get("unidades"),
        "axis_order": crs_info.get("axis_order"),
        "transformaciones": crs_info.get("transformaciones") or [],
        "extension": {
            "minx": native_b["minx"],
            "miny": native_b["miny"],
            "maxx": native_b["maxx"],
            "maxy": native_b["maxy"],
        },
    }
    coords = [
        (native_b["minx"], native_b["miny"]),
        (native_b["maxx"], native_b["maxy"]),
        (d03_nativo[0], d03_nativo[1]),
    ]
    ctx = {
        "registro": registro,
        "crs": crs_info["crs_declarado"],
        "coords": coords,
        "extension": registro["extension"],
        "requiere_transformacion": True,
    }
    orden = [
        "crs_presente", "crs_legible", "datum_consistente", "unidades_declaradas",
        "axis_order_implicito", "always_xy_consistente", "transformacion_registrada",
        "coordenadas_finitas", "inclusion_extension_declarada",
    ]
    ejecutor = {
        "crs_presente": SR.crs_presente,
        "crs_legible": SR.crs_legible,
        "datum_consistente": SR.datum_consistente,
        "unidades_declaradas": SR.unidades_declaradas,
        "axis_order_implicito": SR.axis_order_implicito,
        "always_xy_consistente": SR.always_xy_consistente,
        "transformacion_registrada": SR.transformacion_registrada,
        "coordenadas_finitas": SR.coordenadas_finitas,
        "inclusion_extension_declarada": SR.inclusion_extension_declarada,
    }
    return [ejecutor[cid](ctx).as_dict() for cid in orden]


def _build_fc(gpkg) -> dict:
    import fiona  # noqa: PLC0415

    fc = {"type": "FeatureCollection", "features": []}
    with fiona.open(str(gpkg.ruta), layer=gpkg.capa) as c:
        for f in c:
            geom = f.get("geometry")
            if geom is None:
                # Las geometrías nulas no entran al FC de QA: se gobiernan en las
                # estadísticas (n_geom_nulas) y en el escalón GEOMETRIES_VALIDAS.
                continue
            fc["features"].append(
                {
                    "type": "Feature",
                    "id": f.get("id"),
                    "geometry": dict(geom),
                    "properties": dict(f.get("properties") or {}),
                }
            )
    fc["crs"] = {"type": "name", "properties": {"name": gpkg.srs.get("srs_name") or "undefined"}}
    return fc


def _checks_vector(fc) -> list[dict]:
    import geo_qa.models as GM  # noqa: PLC0415
    import geo_qa.checks.vector_geometry as VG  # noqa: PLC0415

    # La fuente externa es una red de líneas: se admiten LineString y
    # MultiLineString (el WKB real de la capa declara MULTILINESTRING pero
    # almacena piezas LineString con Z vacía).
    ctx = {"fc": fc, "tipos_permitidos": {"MultiLineString", "LineString"}, "consumo": "red"}
    orden = [
        "geojson_valido", "feature_collection_valida", "tipos_permitidos",
        "geometrias_no_vacias", "coordenadas_finitas", "geometrias_validas",
        "autointersecciones_ausentes", "duplicados_geometricos", "crs_declarado",
        "bounds_finitos",
    ]
    ejecutor = {
        "geojson_valido": VG.geojson_valido,
        "feature_collection_valida": VG.feature_collection_valida,
        "tipos_permitidos": VG.tipos_permitidos,
        "geometrias_no_vacias": VG.geometrias_no_vacias,
        "coordenadas_finitas": VG.coordenadas_finitas,
        "geometrias_validas": VG.geometrias_validas,
        "autointersecciones_ausentes": VG.autointersecciones_ausentes,
        "duplicados_geometricos": VG.duplicados_geometricos,
        "crs_declarado": VG.crs_declarado,
        "bounds_finitos": VG.bounds_finitos,
    }
    checks = [ejecutor[cid](ctx).as_dict() for cid in orden]
    # Política del perfil: los cruces/tornadas de la red se declaran como
    # limitación del contraste territorial, no como bloqueo de uso comparativo.
    # No se modifica geo_qa: se recalifica en la adaptación del perfil.
    for c in checks:
        if c.get("check_id") == "autointersecciones_ausentes" and c.get("resultado") == GM.FAIL:
            c["resultado"] = GM.CONDICIONAL
            c["severidad"] = GM.WARNING
            c["razon"] = (
                "autointersecciones / cruces de línea registrados como limitación "
                "declarada del contraste territorial; no apto para análisis topológico"
            )
            c.pop("consumers_blocked", None)
    return checks


def _checks_red(gpkg, stats, hash_fuente, capa_h1) -> list[dict]:
    import geo_qa.models as GM  # noqa: PLC0415

    ch: list[dict] = []

    def add(rid, resultado, severidad, detalle, razon=None, evidencia=()):
        ch.append(
            GM.CheckResult(
                check_id=rid, grupo=_GRP_RED, resultado=resultado,
                severidad=severidad, detalle=detalle, razon=razon,
                evidence_refs=evidencia,
            ).as_dict()
        )

    add(
        "correspondencia_registro", GM.PASS, GM.INFO,
        f"SHA-256 del archivo verificado ({str(hash_fuente)[:16]}...); capa_h1 {str(capa_h1)[:16]}",
        evidencia=("spatial/sources/assessments",),
    )
    add("capa_leible", GM.PASS, GM.INFO, f"capa '{gpkg.capa}' con {stats['conteo']} feature(s)")
    if stats["n_geom_nulas"] > 0:
        add("nulidad_geometrias", GM.FAIL, GM.CRITICAL,
            f"{stats['n_geom_nulas']} registros sin geometría", evidencia=("spatial-data-registry.json",))
    else:
        add("nulidad_geometrias", GM.PASS, GM.INFO, "sin registros sin geometría")
    nulos = {k: v for k, v in stats["nulls_por_atributo"].items() if v}
    if nulos:
        add("nulidad_atributos", GM.FAIL, GM.ERROR,
            f"atributos con nulos: {nulos}", evidencia=("spatial-data-registry.json",))
    else:
        add("nulidad_atributos", GM.PASS, GM.INFO, "sin nulos en atributos")
    if stats["segment_ids_duplicados"]:
        add("segmentid_degenerado", GM.CONDICIONAL, GM.WARNING,
            f"{stats['segment_ids_duplicados']} SegmentID duplicado(s); dominio no restaurable")
    else:
        add("segmentid_degenerado", GM.PASS, GM.INFO, "SegmentID únicos")
    add(
        "significado_de_Order", GM.CONDICIONAL, GM.WARNING,
        "el dominio de 'Order' no está documentado en el expediente externo; "
        "no se afirma significado hidrológico",
        razon="oficio de la fuente sin diccionario de atributos",
    )
    if int(gpkg.geometria.get("z") or 0):
        add("significado_Z", GM.CONDICIONAL, GM.WARNING,
            "capa con dimensión Z; significado de Z no documentado")
    else:
        add("significado_Z_desconocido", GM.CONDICIONAL, GM.WARNING,
            "capa 2D sin cota; no se afirma elevación (Z desconocida)")
    tipos = stats.get("tipos_geometricos") or []
    declarado = gpkg.geometria.get("geometry_type_name")
    if declarado and tipos:
        if set(tipos) == {declarado}:
            add("geometria_multipart", GM.PASS, GM.INFO,
                f"{stats['n_multilinestring']} MultiLineString de {stats['n_geom']} geometrías")
        else:
            add("geometria_multipart", GM.CONDICIONAL, GM.WARNING,
                f"declaración {declarado}; geometrías almacenadas {tipos} "
                f"({stats['n_multilinestring']} MultiLineString de {stats['n_geom']} geometrías)",
                razon="tipo geométrico efectivo no coincide exacto con la declaración",
            )
    else:
        add("geometria_multipart", GM.CONDICIONAL, GM.WARNING,
            f"{stats['n_multilinestring']} MultiLineString de {stats['n_geom']} geometrías; "
            "tipo efectivo y declaración no verificables")
    delta = stats["longitud_geom_total_m"]
    if delta > 0:
        ratio = abs(stats["longitud_attr_total_m"] - delta) / delta
        add("longitud_atributo_vs_geometria", GM.PASS, GM.INFO,
            f"longitud por atributo vs geometría: discrepancia {ratio:.4e}")
    else:
        add("longitud_atributo_vs_geometria", GM.CONDICIONAL, GM.WARNING,
            "sin longitud geométrica computable")
    # continuidad/desconexiones: extremos compartidos (análogo topologia_minima_coincidente).
    if stats.get("extremos_compartidos") is None:
        add("continuidad_topologica_declarada", GM.CONDICIONAL, GM.WARNING,
            "esquema de nodos no documentado para la fuente externa")
    else:
        add("continuidad_topologica_declarada", GM.PASS, GM.INFO,
            f"{stats['extremos_compartidos']} extremo(s) con nodo compartido")
        add("desconexiones_declaradas", GM.CONDICIONAL, GM.WARNING,
            f"{stats['extremos_totales'] - stats['extremos_compartidos']} extremo(s) sin nodo compartido")
    return ch


def ejecutar_qa(gpkg, crs_info, cobertura, stats, hash_fuente, capa_h1, d03_nativo) -> dict:
    import geo_qa.models as GM  # noqa: PLC0415

    refs = _checks_referencia(gpkg, crs_info, cobertura, stats, d03_nativo)
    fc = _build_fc(gpkg)
    try:
        vecs = _checks_vector(fc)
    finally:
        fc["features"] = []
    reds = _checks_red(gpkg, stats, hash_fuente, capa_h1)

    perfiles: list[dict] = []
    quorum = {"PASS": 0, "CONDICIONAL": 0, "FAIL": 0, "FAIL_ORIENTATION": 0}
    for perfil, checks in (
        ("QA_SPATIAL_REFERENCE_V1", refs),
        ("QA_VECTOR_GEOMETRY_V1", vecs),
        ("QA_NETWORK_INTERNAL_V1", reds),
    ):
        cont = {k: 0 for k in ("PASS", "CONDICIONAL", "FAIL", "FAIL_ORIENTATION")}
        for c in checks:
            r = c["resultado"]
            cont[r] = cont.get(r, 0) + 1
            quorum[r] = quorum.get(r, 0) + 1
        perfiles.append(
            {
                "perfil": perfil,
                "perfil_source": PERFIL_SOURCE_IDS[perfil],
                "tot": len(checks),
                "resumen": cont,
                "resultado_global": "PASS" if cont.get("FAIL", 0) == 0 else "FAIL",
                "checks": checks,
            }
        )
    qa = {
        "tot_checks": sum(quorum.values()),
        "quorum": quorum,
        "ok": quorum.get("FAIL", 0) == 0,
        "perfiles": perfiles,
    }
    return {"qa": qa}


__all__ = ["ejecutar_qa", "QA_PROFILES", "PERFIL_SOURCE_IDS"]