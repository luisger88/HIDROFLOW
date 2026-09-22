# -*- coding: utf-8 -*-
"""
limited — contraste territorial LIMITADO post-assessment (OT-HF-SPATIAL-COMPARE-002).

Objetivo: emitir la única vía gobernada por la que una fuente externa evaluada
(CONDITIONALLY_APT_FOR_COMPARISON, licencia UNKNOWN, SIN_GOBERNANZA previa)
puede producir métricas de contraste dentro de la ventana del assessment:

- Compuerta propia e independiente: `cumplimiento_metricas_limitadas` (governance).
- Perfil COMPARE_LIMITED_EXTERNAL_V1 FUERA del catálogo V1 (no se registra en
  profiles.PERFILES ni en PERFIL_IDS_ESPERADOS; se persiste como artefacto).
- Adaptador GeoPackage read-only: preselección por el índice rtree nativo del
  archivo (SQL puro, sin copiar ni indexar), reducción Z->XY y transformación
  EPSG:9377->EPSG:32618 en memoria, clip a la ventana de D-03.
- Resultado máximo PARTIALLY_COMPARABLE; jamás competencia ni adopción.
- La fuente NO se copia; se enlaza por hash (sha256) e identidad del assessment.
"""

from __future__ import annotations

import json
import sqlite3
from pathlib import Path
from typing import Any

from shapely.geometry import Point, box
from shapely.ops import unary_union

from . import __version__
from . import result as R
from .corridors import analisis_multibuffer
from .deps import importar_resolver
from .evidence import append_ledger, persistir_run
from .governance import cumplimiento_metricas, cumplimiento_metricas_limitadas
from .metrics import (
    cobertura_comun,
    continuidad,
    distancia_punto_red,
    hausdorff,
    longitud_coincidente,
    longitud_total,
    nodos_cercanos,
    orientacion_local,
    resumen_distancias,
    segmentos_sin_homologo,
)
from .models import (
    BAJA,
    CORREDOR_RADIOS_M,
    CORRESPONDENCE_OBSERVED,
    COMPARISON_CRS,
    DIVERGENCE_OBSERVED,
    INSUFFICIENT_EVIDENCE,
    NOT_COMPARABLE,
    PARTIALLY_COMPARABLE,
    TERRITORIAL_CONTRAST_AUDIT,
    MetricRecord,
    SourceRef,
    SpatialCompareError,
    TransformationRecord,
    ComparisonResult,
)
from .runner import (
    _activo_registro,
    _armar_resultado,
    _features_de,
    _geoms_lineas,
    _normalizar_crs,
    _raiz_absoluta,
    _ref_fuente,
    _ruta_activo,
    regenerar_integridad,
    repo_root,
)
from .transforms import (
    bounds_en_crs,
    reducir_xyz_xy,
    registro_reduccion_z,
    transformar_lineas,
)

_PERFIL_LIMITADO_ID = "COMPARE_LIMITED_EXTERNAL_V1"
PERFIL_LIMITADO_ID = _PERFIL_LIMITADO_ID

_ASSESSMENT_SCHEMA = "hf.spatial-source-assessment.v1"
_CAPA_GPKG = "Channel Network"

PERFIL_LIMITADO: dict[str, Any] = {
    "id": _PERFIL_LIMITADO_ID,
    "nombre": "Contraste territorial limitado post-assessment (fuente externa condicional)",
    "version": "1.0",
    "objetivo": (
        "Contraste gobernado de una fuente externa evaluada (CONDITIONALLY_APT_FOR_COMPARISON) "
        "contra la red de referencia HF dentro de la ventana del assessment, con métricas "
        "limitadas y resultado máximo PARTIALLY_COMPARABLE. Sin competencia ni adopción; "
        "fuente externa NO copiada, enlazada por hash; reducción Z y reproyección en memoria."
    ),
    "tipo": "limited_external_network",
    "fuentes": {"source": "GeoPackage externo evaluado (Channel Network)", "target": "red HF"},
    "qa_previo": [],
    "metricas_obligatorias": [
        "longitud_fuente",
        "longitud_target",
        "cobertura_comun",
        "longitud_coincidente",
        "pct_dentro_corredor",
        "pct_target_dentro_corredor",
        "hausdorff",
        "orientacion_local_mediana",
        "nodos_cercanos",
        "continuidad_target",
        "distancias_fuente_red_percentiles",
        "n_divergentes",
    ],
    "tolerancias_default": [
        {"pf": "PF-01", "rango_m": "0-30"},
        {"pf": "PF-02", "rango_m": "30-136", "exige_acta": True},
        {"pf": "PF-03", "rango_m": ">136", "exige_acta": True},
    ],
    "resultado_maximo": PARTIALLY_COMPARABLE,
    "clasificaciones_permitidas": [TERRITORIAL_CONTRAST_AUDIT],
    "confianza_default": BAJA,
    "consumidores_permitidos": (
        "HF_GEO_QA",
        "HF_CARTO_DIAGNOSTIC",
        "HISTORICAL_AUDIT",
        "DIAGNOSTIC",
        "COMPARISON",
        "RUPTURE_EVIDENCE",
    ),
    "consumidores_bloqueados": (
        "PF02_ADOPTION",
        "GATE_3",
        "CANONICAL_WATERSHED",
        "HYDRO_CONSUMPTION",
        "DECISION_PROFESIONAL",
        "CARTOGRAPHIC_REPORT",
        "EXPEDIENTE",
        "TERRITORIAL_COMPETENCE",
    ),
    "interpretaciones_prohibidas": [
        "TRUE_NETWORK",
        "CORRECT_CHANNEL",
        "ADOPTED_SEGMENT",
        "ADOPTED_CELL",
        "TERRITORIALLY_COMPETENT",
    ],
    "reglas": [
        "máximo PARTIALLY_COMPARABLE; nunca adopción ni competencia territorial",
        "preselección por índice rtree nativo en modo read-only; fuente no copiada",
        "reducción Z->XY y reproyección en memoria; archivos intactos",
        "corredores 30/60/90/136 m como tolerancias de análisis",
    ],
}

_RUTA_PERFIL_CATALOGO = "spatial/comparisons/profiles/COMPARE_LIMITED_EXTERNAL_V1.json"


class GeoPackageSegmentedLimited:
    """Adaptador read-only de capa vectorial GeoPackage con preselección por
    el índice rtree nativo del propio archivo (SQL puro, sin escrituras)."""

    def __init__(self, ruta, capa: str = _CAPA_GPKG):
        self.ruta = Path(ruta)
        self.capa = capa

    def _conexion(self):
        uri = "file:" + str(self.ruta.resolve()).replace("\\", "/") + "?mode=ro"
        con = sqlite3.connect(uri, uri=True)
        con.row_factory = sqlite3.Row
        con.execute("PRAGMA query_only=ON")
        return con

    def metadatos(self) -> dict[str, Any]:
        con = self._conexion()
        try:
            filas = [
                (r[0],)
                for r in con.execute(
                    "SELECT table_name FROM gpkg_contents WHERE data_type='features'"
                ).fetchall()
            ]
        finally:
            con.close()
        tablas = [f[0] for f in filas]
        if self.capa not in tablas:
            raise SpatialCompareError(
                f"capa {self.capa!r} ausente en {self.ruta.name} (tablas: {sorted(tablas)})"
            )
        con = self._conexion()
        try:
            geo = con.execute(
                "SELECT * FROM gpkg_geometry_columns WHERE table_name=?", (self.capa,)
            ).fetchone()
            srs = con.execute(
                "SELECT srs_id, srs_name, organization, organization_coordsys_id "
                "FROM gpkg_spatial_ref_sys WHERE srs_id=?",
                (geo["srs_id"],),
            ).fetchone()
            n_total = con.execute(f'SELECT COUNT(*) FROM "{self.capa}"').fetchone()[0]
            tabla_rt = f"rtree_{self.capa}_{geo['column_name']}"
            tiene_rtree = (
                con.execute(
                    "SELECT 1 FROM sqlite_master WHERE type='table' AND name=?", (tabla_rt,)
                ).fetchone()
                is not None
            )
        finally:
            con.close()
        return {
            "capa": self.capa,
            "tablas_features": sorted(tablas),
            "geometry_type": geo["geometry_type_name"],
            "columna_geom": geo["column_name"],
            "srs_id": geo["srs_id"],
            "srs_name": srs["srs_name"],
            "srs_organization": srs["organization"],
            "srs_org_codigo": srs["organization_coordsys_id"],
            "n_total_features": int(n_total),
            "rtree_nativo": bool(tiene_rtree),
        }

    def preseleccionar(self, bbox_nativo) -> list[int]:
        """Fids por el índice rtree nativo del archivo (solo SELECT)."""
        minx, miny, maxx, maxy = (float(v) for v in bbox_nativo)
        meta = self.metadatos()
        if not meta["rtree_nativo"]:
            raise SpatialCompareError(
                f"capa {self.capa!r} sin índice rtree nativo; preselección no disponible"
            )
        con = self._conexion()
        try:
            tabla_rt = f"rtree_{self.capa}_{meta['columna_geom']}"
            filas = con.execute(
                f"SELECT id FROM \"{tabla_rt}\" "
                f"WHERE minx <= {maxx!r} AND maxx >= {minx!r} "
                f"AND miny <= {maxy!r} AND maxy >= {miny!r} ORDER BY id"
            ).fetchall()
        finally:
            con.close()
        return [int(r["id"]) for r in filas]

    def leer_preseleccionadas(self, fids: list[int], crs_operativo_nativo: str = "EPSG:9377"):
        """Lee solo las features preseleccionadas (SQL read-only) y devuelve las
        geometrías reducidas a XY en `crs_operativo_nativo`."""
        if not fids:
            return [], self._resumen_reduccion([], 0)
        import pyogrio  # import bajo demanda

        sql = (
            f'SELECT fid, geom FROM "{self.capa}" WHERE fid IN ('
            + ",".join(str(int(f)) for f in fids)
            + ") ORDER BY fid"
        )
        gdf = pyogrio.read_dataframe(str(self.ruta), sql=sql, layer=None)
        geoms_raw: list[Any] = []
        n_vertices_raw = 0
        for g in gdf["geometry"].values:
            if g.geom_type == "LineString":
                geoms_raw.append(g)
                n_vertices_raw += len(g.coords)
            elif g.geom_type == "MultiLineString":
                for ln in g.geoms:
                    geoms_raw.append(ln)
                    n_vertices_raw += len(ln.coords)
        if not geoms_raw:
            return [], self._resumen_reduccion([], 0)
        xy_2d, resumen = reducir_xyz_xy(geoms_raw)
        resumen["n_vertices_raw"] = n_vertices_raw
        return xy_2d, resumen

    def _resumen_reduccion(self, geoms, n_vertices):
        return {
            "metodo": "reducir_xyz_xy",
            "n_geometrias_entrada": len(geoms),
            "n_con_z": 0,
            "n_vertices": n_vertices,
            "n_salida_xy": len(geoms),
            "unidad": "n",
        }


def _sha_archivo(path: Path) -> str:
    resolver = importar_resolver()
    return resolver.sha256_archivo(path)


def _leer_json(path: Path) -> dict:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _ventana_de_assessment(assessment: dict) -> tuple[float, float, float, float]:
    vent = (assessment.get("cobertura") or {}).get("ventana_utm_32618") or {}
    try:
        return (
            float(vent["minx"]),
            float(vent["miny"]),
            float(vent["maxx"]),
            float(vent["maxy"]),
        )
    except (KeyError, TypeError, ValueError):
        raise SpatialCompareError("assessment sin cobertura.ventana_utm_32618 válida")


def _geoms_red_en_ventana(
    target_activo: dict,
    raiz: Path,
    repo: Path,
    ventana: tuple[float, float, float, float],
) -> tuple[list[Any], list[Any], str]:
    """Carga la red HF target (solo la ventana) y devuelve (en_ventana, crs, tr)."""
    ruta_t = _ruta_activo(raiz, repo, target_activo)
    feats_t, crs_t_cab, crs_t_props = _features_de(ruta_t)
    crs_t = _normalizar_crs(crs_t_cab) or _normalizar_crs(crs_t_props)
    if not crs_t:
        raise SpatialCompareError(f"target sin CRS gobernado detectable: {target_activo.get('id')!r}")
    red_raw = _geoms_lineas(feats_t)
    red_utm, tr_t = transformar_lineas(red_raw, crs_t, COMPARISON_CRS)
    win = box(*ventana)
    en_ventana: list[Any] = []
    for g in red_utm:
        i = g.intersection(win)
        if i.is_empty or i.length <= 0:
            continue
        if i.geom_type == "LineString":
            en_ventana.append(i)
        elif i.geom_type == "MultiLineString":
            en_ventana.extend(list(i.geoms))
    return en_ventana, crs_t, tr_t


def _clasificar_limitado(extra: dict) -> tuple[str, str, list[str], list[str], list[str]]:
    """Reglas deterministas del perfil limitado (máx. PARTIALLY_COMPARABLE)."""
    por30 = next(r for r in extra["corridors"]["por_radio"] if r["radio_m"] == 30.0)
    pct_b = por30["pct_target_dentro"]
    pct_a = por30["pct_fuente_dentro"]
    n_sin = extra.get("sin_homologo", {}).get("n_sin_homologo", 0)
    med_ori = extra["orientacion"]["diferencia_angular_mediana_deg"]
    if pct_b >= 40.0:
        resultado = PARTIALLY_COMPARABLE
    elif pct_b >= 20.0:
        resultado = CORRESPONDENCE_OBSERVED
    elif pct_b > 0.0:
        resultado = PARTIALLY_COMPARABLE if n_sin == 0 else DIVERGENCE_OBSERVED
    else:
        resultado = NOT_COMPARABLE
    corr = [
        f"correspondencia local observada: {pct_b}% del target dentro de 30 m de la fuente"
    ]
    div: list[str] = []
    unmatched: list[str] = []
    if n_sin:
        div.append(f"{n_sin} features del target sin homólogo visible en la fuente")
        unmatched = [f"sin homólogo: {n_sin} features del target"]
    razones30 = (
        f"corredor 30 m: fuente {pct_a}% / target {pct_b}%; "
        f"orientación mediana {med_ori}°; sin_homólogo {n_sin}"
    )
    return resultado, razones30, corr, div, unmatched


def correr_comparacion_limitada(
    case_root,
    question_id: str = "EXTERNO_STREAMS_URBAN_1000_LIMITED_COMPARISON",
    source_asset_id: str = "streams_urban_1000_medellin_assessed",
    target_asset_id: str = "red_hf_gate02_d03",
    repo: Path | None = None,
    assessment_ref: str = "spatial/sources/assessments/streams_urban_1000_medellin_assessed.json",
) -> ComparisonResult:
    """Ejecuta la comparación limitada en memoria (sin persistir)."""
    repo = repo or repo_root()
    raiz = _raiz_absoluta(case_root, repo)
    perfil = PERFIL_LIMITADO
    case_id = f"caso_{Path(case_root).name}"
    clasif = TERRITORIAL_CONTRAST_AUDIT
    conf = BAJA

    fuente_activo = _activo_registro(raiz, source_asset_id)
    if fuente_activo is None:
        return _resultado_limited_no_fuente(raiz, perfil, case_id, question_id, clasif, source_asset_id)
    ruta_assessment = raiz / assessment_ref
    if not ruta_assessment.exists():
        return _resultado_limited_no_fuente(
            raiz, perfil, case_id, question_id, clasif, assessment_ref,
            justificacion="assessment no encontrado en spatial/sources/assessments",
        )
    assessment = _leer_json(ruta_assessment)
    gate = cumplimiento_metricas_limitadas(fuente_activo, assessment)
    target_activo = _activo_registro(raiz, target_asset_id)
    if target_activo is None:
        return _resultado_limited_no_fuente(raiz, perfil, case_id, question_id, clasif, target_asset_id)
    source_ref = _ref_fuente(raiz, repo, fuente_activo)
    target_ref = _ref_fuente(raiz, repo, target_activo)
    if not gate["habilitado"]:
        return _resultado_limited_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo, gate, assessment,
            ["compuerta limitada bloqueada; sin métricas de contraste"],
        )

    # --- lectura preseleccionada de la fuente (modo read-only, sin copiar) -----
    ruta_s = _ruta_activo(raiz, repo, fuente_activo)
    sha_real = _sha_archivo(ruta_s)
    if sha_real.lower() != str(fuente_activo.get("sha256") or "").lower():
        return _resultado_limited_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo, gate, assessment,
            ["hash del GeoPackage no coincide con el assessment/registry; fuente alterada"],
        )
    ventana = _ventana_de_assessment(assessment)
    adaptador = GeoPackageSegmentedLimited(ruta_s, capa=_CAPA_GPKG)
    meta = adaptador.metadatos()
    bbox_nativo = bounds_en_crs(ventana, COMPARISON_CRS, "EPSG:9377", pad_m=10.0)
    fids = adaptador.preseleccionar(bbox_nativo)
    n_preseleccionadas = len(fids)
    fuente_xy_nativo, resumen_reduccion = adaptador.leer_preseleccionadas(fids)
    if not fuente_xy_nativo:
        return _resultado_limited_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo, gate, assessment,
            ["sin features de la fuente en la ventana tras preselección"],
        )
    fuente_utm, tr_s = transformar_lineas(fuente_xy_nativo, "EPSG:9377", COMPARISON_CRS)
    win = box(*ventana)
    s_ventana: list[Any] = []
    for g in fuente_utm:
        i = g.intersection(win)
        if i.is_empty or i.length <= 0:
            continue
        if i.geom_type == "LineString":
            s_ventana.append(i)
        elif i.geom_type == "MultiLineString":
            s_ventana.extend(list(i.geoms))
    if not s_ventana:
        return _resultado_limited_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo, gate, assessment,
            ["sin features de la fuente dentro de la ventana tras el clip"],
        )

    # --- target (red HF) en la ventana ----------------------------------------
    t_ventana, crs_t, tr_t = _geoms_red_en_ventana(target_activo, raiz, repo, ventana)
    if not t_ventana:
        return _resultado_limited_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo, gate, assessment,
            ["sin features del target dentro de la ventana"],
        )

    tr = TransformationRecord(
        motor=tr_s.motor,
        version=tr_s.version,
        always_xy=True,
        origen="EPSG:9377",
        destino=COMPARISON_CRS,
        datum_origen=tr_s.datum_origen,
        datum_destino=tr_s.datum_destino,
        metodo=(
            "preselección por rtree nativo read-only; reducir_xyz_xy; "
            f"pyproj Transformer {tr_s.origen}->{tr_s.destino}"
        ),
        advertencias=tuple(
            sorted(set(tr_s.advertencias) | set(tr_t.advertencias))
            + ["reducción Z->XY documentada en metrics.reduccion_z"]
        ),
    )

    # --- métricas reutilizando el motor (uniones precomputadas) ----------------
    ua = unary_union(s_ventana)
    ub = unary_union(t_ventana)
    lt_s = longitud_total([ua])
    lt_t = longitud_total([ub])
    comun = cobertura_comun([g.envelope for g in s_ventana], [g.envelope for g in t_ventana])
    perc_ab = longitud_coincidente([ua], [ub], 30.0)
    perc_ba = longitud_coincidente([ub], [ua], 30.0)
    hd = hausdorff([ua], [ub])
    ori = orientacion_local(s_ventana, [ub], paso_muestreo=5)
    comp = continuidad([ub])
    nodos = nodos_cercanos(_vertices(s_ventana), _vertices(t_ventana), 30.0)
    sin_hom = segmentos_sin_homologo(t_ventana, [ua], 30.0, 50.0)
    ds = [
        distancia_punto_red(Point(p), t_ventana)["distancia_minima_m"]
        for p in _vertices(s_ventana)
    ]
    perc_dist = resumen_distancias(ds)
    conv = analisis_multibuffer([ua], [ub], CORREDOR_RADIOS_M)
    extra = {"corridors": conv, "orientacion": ori, "sin_homologo": sin_hom}

    metricas = [
        MetricRecord("longitud_fuente", "Longitud de la fuente en ventana", "m", round(ua.length, 3)),
        MetricRecord("longitud_target", "Longitud del target en ventana", "m", round(ub.length, 3)),
        MetricRecord(
            "cobertura_comun",
            "Cobertura común de envolventes",
            "m2/fraccion",
            {
                "iou_envolventes": comun["iou_envolventes"],
                "pct_cobertura_b_en_a": comun["pct_cobertura_b_en_a"],
                "pct_cobertura_a_en_b": comun["pct_cobertura_a_en_b"],
            },
        ),
        MetricRecord(
            "longitud_coincidente",
            "Longitud de fuente dentro de 30 m del target",
            "m",
            perc_ab["longitud_coincidente_m"],
            fuente="corredor 30 m",
        ),
        MetricRecord("pct_dentro_corredor", "% de fuente dentro de corredor 30 m", "%",
                     perc_ab["pct_de_fuente"], fuente="corredor 30 m"),
        MetricRecord("pct_target_dentro_corredor", "% de target dentro de corredor 30 m de la fuente",
                     "%", perc_ba["pct_de_fuente"], fuente="target en ventana"),
        MetricRecord("hausdorff", "Hausdorff máximo", "m", hd["hausdorff_max_m"]),
        MetricRecord("hausdorff_dirigido_A_B", "Hausdorff dirigido A->B", "m",
                     hd["hausdorff_dirigido_A_B_m"]),
        MetricRecord("hausdorff_dirigido_B_A", "Hausdorff dirigido B->A", "m",
                     hd["hausdorff_dirigido_B_A_m"]),
        MetricRecord("orientacion_local_mediana", "Diferencia angular local (mediana)", "deg",
                     ori["diferencia_angular_mediana_deg"]),
        MetricRecord("orientacion_local_p90", "Diferencia angular local (p90)", "deg",
                     ori["diferencia_angular_p90_deg"]),
        MetricRecord("nodos_cercanos", "Fracción de vértices de fuente con soporte <=30 m", "%",
                     nodos["fraccion_soportada_pct"]),
        MetricRecord("continuidad_target", "Componentes conectados del target", "n",
                     comp["componentes"]),
        MetricRecord("distancias_fuente_red_percentiles",
                     "Percentiles de distancia vértice fuente-red",
                     "m",
                     {k: perc_dist[k] for k in
                      ("n", "min_m", "media_m", "mediana_m", "p90_m", "p95_m", "p99_m", "max_m")},
                     fuente="vértices de la fuente (ventana)"),
        MetricRecord("n_divergentes", "Features del target sin homólogo a <=30 m", "n",
                     sin_hom["n_sin_homologo"]),
        MetricRecord("preseleccion_fuente", "Features preseleccionadas por rtree / totales", "n",
                     {"preseleccionadas": n_preseleccionadas, "total": meta["n_total_features"]},
                     fuente="rtree nativo read-only"),
        MetricRecord("reduccion_z", "Reducción Z -> XY del material nativo", "n",
                     registro_reduccion_z(resumen_reduccion)),
        MetricRecord("ventana_analisis", "Cuadro de ventana D-03", "m",
                     {"minx": ventana[0], "miny": ventana[1], "maxx": ventana[2], "maxy": ventana[3]}),
    ]

    resultado, razones30, corr_list, div_list, unmatched = _clasificar_limitado(extra)

    assumptions = [
        "perfil COMPARE_LIMITED_EXTERNAL_V1: contraste post-assessment limitado",
        f"assessment_id {gate['assessment_id']}; schema {_ASSESSMENT_SCHEMA}",
        f"ventana de análisis (cuadro D-03 ±1000 m en EPSG:32618): {json.dumps(ventana)}",
        "preselección por el índice rtree nativo del GeoPackage en modo read-only (fuente no copiada)",
        "reducción Z->XY y reproyección en memoria; archivos fuente y target intactos",
        "métricas limitadas: máx PARTIALLY_COMPARABLE; sin TRUE_NETWORK/CORRECT_CHANNEL/"
        "ADOPTED_SEGMENT/TERRITORIALLY_COMPETENT/ADOPTED_CELL",
        "los buffers 30/60/90/136 m son tolerancias de análisis, no verdades",
    ]
    limitations = [
        "la comparación no demuestra competencia territorial",
        "licencia UNKNOWN: métricas restringidas a contraste y auditoría (fuente externa NO copiada)",
        "longitud y Hausdorff dependen de la precisión posicional de las fuentes (celdas de 30 m)",
        "la ventana del assessment no cubre el territorio completo de la fuente",
    ]
    governance = {
        "fuente_apta_para_metricas_plenas": False,
        "bloqueos_metricas_plenas": sorted(set(cumplimiento_metricas(fuente_activo))),
        "fuente_habilitada_contraste_limitado": True,
        "assessment_id": gate["assessment_id"],
        "assessment_ref": assessment_ref,
        "assessment_output_hash": (assessment.get("firmas") or {}).get("output_hash"),
        "resultado_maximo": gate["resultado_maximo"],
        "quorum": gate["quorum"],
        "n_restricciones": gate["n_restricciones"],
        "cantidad_preseleccionada": n_preseleccionadas,
        "cantidad_en_ventana_fuente": len(s_ventana),
        "cantidad_en_ventana_target": len(t_ventana),
        "nota": "contraste limitado habilitado por assessment; nunca adopción ni competencia",
    }
    res = _armar_resultado(
        raiz, perfil, case_id, question_id, clasif, conf, source_ref, target_ref,
        tr, comun, metricas, conv, assumptions, limitations, div_list, corr_list,
        unmatched, governance, fuente_activo, target_activo,
        [razones30, f"resultado por reglas del perfil {_PERFIL_LIMITADO_ID}"],
        resultado,
    )
    res.allowed_interpretations = list(
        (assessment.get("resolucion") or {}).get("interpretaciones_permitidas") or []
    )
    res.qa_prereq = {
        "assessment_id": gate["assessment_id"],
        "assessment_ref": assessment_ref,
        "assessment_output_hash": (assessment.get("firmas") or {}).get("output_hash"),
        "quorum": gate["quorum"],
        "n_condicionales_qa": int((gate["quorum"] or {}).get("CONDICIONAL") or 0),
        "resultado_emitible_max": gate["resultado_maximo"],
        "source_estado": fuente_activo.get("estado"),
        "target_estado": (target_activo or {}).get("estado"),
        "red_competencia": "NOT_DEMONSTRATED",
        "nota": (
            "QA previo = assessment hf.spatial-source-assessment.v1; la comparación "
            "limitada no sustituye veredictos ni decisiones"
        ),
    }
    res.input_hashes = {
        **dict(res.input_hashes),
        "assessment": (assessment.get("firmas") or {}).get("output_hash") or "",
        "assessment_file": _sha_archivo(ruta_assessment),
    }
    res.evidence_refs = sorted(
        set(res.evidence_refs)
        | {assessment_ref, _RUTA_PERFIL_CATALOGO}
    )
    res.comparison_run_id = R.calcular_comparison_run_id(res)
    res.output_hash = R.calcular_output_hash(res)
    return res


def _vertices(geoms: list[Any]) -> list[tuple[float, float]]:
    pts: list[tuple[float, float]] = []
    for g in geoms:
        for ln in g.geoms if g.geom_type == "MultiLineString" else [g]:
            pts.extend(ln.coords)
    return pts


def _resultado_limited_no_fuente(raiz, perfil, case_id, question_id, clasif, asset_id,
                                 justificacion: str = "activo no registrado en el inventario espacial"):
    source = SourceRef(asset_id=asset_id, nombre=asset_id, clase="", ruta="",
                       hash_sha256="", crs_declarado=None, crs_operativo_registro=None,
                       estado_registro="NO_REGISTRADO", autoridad=None, licencia=None)
    tr = TransformationRecord(motor="n/a", version="", always_xy=True, origen="n/a",
                              destino=COMPARISON_CRS, datum_origen="n/a", datum_destino="n/a",
                              metodo="sin transformación", advertencias=(), precision="n/a")
    governance = {"fuente_apta_para_metricas_plenas": False,
                  "fuente_habilitada_contraste_limitado": False,
                  "bloqueos_metricas_plenas": [justificacion],
                  "nota": "activo no registrado; sin métricas"}
    return _armar_resultado(
        raiz, perfil, case_id, question_id, clasif, BAJA, source, None, tr,
        {"iou_envolventes": 0.0, "pct_cobertura_b_en_a": 0.0, "pct_cobertura_a_en_b": 0.0}, [],
        {"radios_m": [], "por_radio": [], "sensibilidad": "n/a", "nota": "sin métricas"},
        [justificacion], ["no hay evidencia geométrica suficiente"], [], [], [], governance,
        None, None, [justificacion], INSUFFICIENT_EVIDENCE,
    )


def _resultado_limited_sin_metricas(raiz, perfil, case_id, question_id, clasif,
                                    source, target, fuente_activo, target_activo,
                                    gate, assessment, razones):
    tr = TransformationRecord(motor="n/a", version="", always_xy=True, origen="n/a",
                              destino=COMPARISON_CRS, datum_origen="n/a", datum_destino="n/a",
                              metodo="sin métricas de contraste", advertencias=(), precision="n/a")
    governance = {
        "fuente_apta_para_metricas_plenas": False,
        "bloqueos_metricas_plenas": sorted(set(cumplimiento_metricas(fuente_activo or {}))),
        "fuente_habilitada_contraste_limitado": bool(gate and gate.get("habilitado")),
        "bloqueos_gate_limitado": sorted(set((gate or {}).get("bloqueos", []))),
        "assessment_id": (gate or {}).get("assessment_id"),
        "assessment_ref": (gate or {}).get("assessment_ref"),
        "resultado_maximo": (gate or {}).get("resultado_maximo"),
        "quorum": (gate or {}).get("quorum"),
        "n_restricciones": (gate or {}).get("n_restricciones"),
        "nota": "sin métricas de contraste limitado",
    }
    res = _armar_resultado(
        raiz, perfil, case_id, question_id, clasif, BAJA, source, target, tr,
        {"iou_envolventes": 0.0, "pct_cobertura_b_en_a": 0.0, "pct_cobertura_a_en_b": 0.0}, [],
        {"radios_m": [], "por_radio": [], "sensibilidad": "n/a", "nota": "sin métricas"},
        ["sin métricas: compuerta limitada bloqueada o sin evidencia suficiente"],
        ["no hay evidencia geométrica suficiente"], [], [], [], governance,
        fuente_activo, target_activo, list(razones), INSUFFICIENT_EVIDENCE,
    )
    return res


def registar_comparacion_limitada(
    case_root,
    question_id: str = "EXTERNO_STREAMS_URBAN_1000_LIMITED_COMPARISON",
    source_asset_id: str = "streams_urban_1000_medellin_assessed",
    target_asset_id: str = "red_hf_gate02_d03",
    repo: Path | None = None,
) -> dict:
    """Ejecuta, persiste y registra la comparación limitada; regenera integridad."""
    repo = repo or repo_root()
    raiz = _raiz_absoluta(case_root, repo)
    res = correr_comparacion_limitada(
        case_root, question_id=question_id, source_asset_id=source_asset_id,
        target_asset_id=target_asset_id, repo=repo,
    )
    errores = R.validar_invariantes(res)
    if errores:
        raise RuntimeError(f"comparación limitada con invariantes rotas: {errores}")
    persistir_run(raiz, res)
    _persistir_perfil_limitado(raiz)
    numero = append_ledger(raiz, res)
    regenerar_integridad(raiz)
    return {
        "linea": numero,
        "comparison_run_id": res.comparison_run_id,
        "result": res.result,
        "question_id": res.question_id,
        "classification": res.classification,
        "output_hash": res.output_hash,
    }


def _persistir_perfil_limitado(raiz: Path) -> None:
    ruta = raiz / _RUTA_PERFIL_CATALOGO
    ruta.parent.mkdir(parents=True, exist_ok=True)
    ruta.write_text(
        json.dumps(PERFIL_LIMITADO, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )


__all__ = [
    "PERFIL_LIMITADO",
    "PERFIL_LIMITADO_ID",
    "GeoPackageSegmentedLimited",
    "correr_comparacion_limitada",
    "registar_comparacion_limitada",
]