# -*- coding: utf-8 -*-
"""
runner — orquestador determinista de HF-SPATIAL-COMPARE V1.

Responsabilidades:
- Resolver repositorio y raíz del caso portable por convención.
- Leer el inventario espacial gobernado (spatial-data-registry.json).
- Aplicar la compuerta de gobernanza: ninguna fuente no apta produce métricas.
- Ejecutar métricas puras y análisis multibuffer en memoria (EPSG:32618).
- Firmar el resultado (comparison_run_id/output_hash), persistirlo y registrarlo
  en el ledger de evidencia SIN tocar estado ni decisiones.
- Regenerar integridad verificando que state_hash permanezca invariante.
"""

from __future__ import annotations

import hashlib
import json
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any

from shapely.geometry import Point, shape as shape_fn
from shapely.ops import unary_union

from . import __version__
from . import result as R
from .corridors import analisis_multibuffer
from .deps import importar_generador, importar_resolver
from .evidence import append_ledger, persistir_run, slug_question
from .governance import audit_gobernanza, cumplimiento_metricas
from .metrics import (
    cobertura_comun,
    continuidad,
    divergencias,
    distancia_punto_red,
    distancias_punto_red_percentiles,
    hausdorff,
    longitud_coincidente,
    longitud_total,
    nodos_cercanos,
    orientacion_local,
    segmentos_sin_homologo,
)
from .models import (
    ALTA,
    BAJA,
    CANDIDATE_WITH_EVIDENCE,
    CLASE_C_REFERENCIAL_VISUAL,
    CLASE_EVIDENCIA,
    COMPARABLE,
    COMPARE_D03_CANDIDATES_V1,
    COMPARE_NETWORK_TO_TERRAIN_V1,
    COMPARE_POINT_TO_NETWORKS_V1,
    COMPARE_SEGMENT_CORRESPONDENCE_V1,
    COMPARE_VECTOR_NETWORKS_V1,
    COMPARISON_CRS,
    COMPUTATIONAL_INTERNAL_COMPARISON,
    CORREDOR_RADIOS_M,
    DIAGNOSTIC_COMPARISON,
    INSUFFICIENT_EVIDENCE,
    INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE,
    MEDIA,
    NOT_COMPARABLE,
    PARTIALLY_COMPARABLE,
    PERFIL_IDS_ESPERADOS,
    REFERENCE_UNAVAILABLE,
    REGISTER_VISUAL_REFERENCE_V1,
    RESULTADOS_PROHIBIDOS,
    TERRITORIAL_CONTRAST_AUDIT,
    MetricRecord,
    SourceRef,
    SpatialCompareError,
    TransformationRecord,
    ComparisonResult,
)
from .registry import obtener
from .transforms import es_crs_gobernado, transformar_lineas, transformar_puntos

_UTC = lambda: datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")  # noqa: E731
_FECHA = lambda: date.today().isoformat()  # noqa: E731

_CASE_INTERNOS = {
    "project-location": "geometry/project-location.geojson",
    "proposed-cell": "geometry/proposed-cell.geojson",
}

_QA_REFERENCIA = "spatial/qa/qa-ledger.jsonl"
_REGISTRO = "spatial/spatial-data-registry.json"
_NETWORK_REF = "network/hf-network-reference.json"
_DECISION_REF = "decision/spatial-decision.json"
_GATES_REF = "state/gates.jsonl"

_METRIC_PROFILES = frozenset(
    {
        COMPARE_VECTOR_NETWORKS_V1,
        COMPARE_POINT_TO_NETWORKS_V1,
        COMPARE_SEGMENT_CORRESPONDENCE_V1,
        COMPARE_NETWORK_TO_TERRAIN_V1,
        COMPARE_D03_CANDIDATES_V1,
    }
)


def repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def _raiz_absoluta(case_root, repo: Path) -> Path:
    p = Path(case_root)
    return p.resolve() if p.is_absolute() else (repo / p).resolve()


# ---------------------------------------------------------------- helpers i/o

def _leer_json(path: Path) -> dict:
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def _sha_texto(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def _sha_archivo(path: Path) -> str:
    resolver = importar_resolver()
    return resolver.sha256_archivo(path)


def _activo_registro(raiz: Path, asset_id: str) -> dict | None:
    reg = _leer_json(raiz / _REGISTRO)
    return next((a for a in reg.get("activos", []) if a.get("id") == asset_id), None)


def _ruta_activo(raiz: Path, repo: Path, entrada: dict) -> Path | None:
    if entrada.get("ruta_relativa_repo"):
        p = repo / entrada["ruta_relativa_repo"]
        return p if p.exists() else None
    interno = _CASE_INTERNOS.get(entrada.get("id"))
    if interno:
        p = raiz / interno
        return p if p.exists() else None
    return None


def _ref_fuente(raiz: Path, repo: Path, entrada: dict) -> SourceRef:
    path = _ruta_activo(raiz, repo, entrada)
    hash_ = _sha_archivo(path) if path is not None and path.exists() else ""
    crs_declarado = entrada.get("crs") or entrada.get("cms")
    return SourceRef(
        asset_id=entrada.get("id", ""),
        nombre=entrada.get("nombre", ""),
        clase=entrada.get("clase", ""),
        ruta=entrada.get("ruta_relativa_repo") or _CASE_INTERNOS.get(entrada.get("id", "")) or "",
        hash_sha256=hash_,
        crs_declarado=crs_declarado,
        crs_operativo_registro=entrada.get("crs_operativo") or entrada.get("crs"),
        estado_registro=entrada.get("estado", ""),
        autoridad=entrada.get("autoridad"),
        licencia=entrada.get("licencia"),
    )


def _features_de(path: Path) -> tuple[list[dict], str | None, str | None]:
    doc = _leer_json(path)
    crs_cabecera = (doc.get("crs") or {}).get("properties", {}).get("name")
    feats = [f for f in doc.get("features", []) if f.get("geometry")]
    crs_props = feats[0]["properties"].get("cms") if feats else None
    return feats, crs_cabecera, crs_props


def _normalizar_crs(s: str | None) -> str | None:
    if not s:
        return None
    if "CRS84" in s.upper():
        return "EPSG:4326"
    if s.startswith("EPSG:"):
        return s
    return s


def _geoms_lineas(features: list[dict]) -> list[Any]:
    out: list[Any] = []
    for f in features:
        g = shape_fn(f["geometry"])
        if g.geom_type == "LineString":
            out.append(g)
        elif g.geom_type == "MultiLineString":
            out.extend(list(g.geoms))
    return out


def seleccion_target_segmento(
    features: list[dict],
    source_geoms: list[Any],
    tipo: str,
    segmento: int,
) -> tuple[list[Any], int, int]:
    """Selección determinista del target: features tipo/segmento dentro del
    envelope de la fuente (mismo CRS geodésico). Devuelve (geoms, total, sel)."""
    env = unary_union([g.envelope for g in source_geoms])
    sel = [
        f
        for f in features
        if (f.get("properties") or {}).get("tipo") == tipo
        and (f.get("properties") or {}).get("segmento") == segmento
        and shape_fn(f["geometry"]).intersects(env)
    ]
    return _geoms_lineas(sel), len(features), len(sel)


def _vertices(geoms: list[Any]) -> list[tuple[float, float]]:
    pts: list[tuple[float, float]] = []
    for g in geoms:
        for ln in g.geoms if g.geom_type == "MultiLineString" else [g]:
            pts.extend(ln.coords)
    return pts


def _transformar_lista(geoms: list[Any], crs_origen: str, destino: str):
    return transformar_lineas(geoms, crs_origen, destino)


# --------------------------------------------------------- métricas por perfil

def _metricas_red_red(
    perfil: dict,
    src: list[Any],
    tgt: list[Any],
    src_crs: str,
    tgt_crs: str,
    comun: dict,
) -> tuple[list[MetricRecord], dict, TransformationRecord]:
    """Métricas network-network / segment-correspondence en EPSG:32618."""
    s_utm, tr_s = _transformar_lista(src, src_crs, COMPARISON_CRS)
    t_utm, tr_t = _transformar_lista(tgt, tgt_crs, COMPARISON_CRS)
    if not s_utm or not t_utm:
        raise SpatialCompareError("red vacía tras transformar en memoria")
    tr = TransformationRecord(
        motor=tr_s.motor,
        version=tr_s.version,
        always_xy=True,
        origen=tr_s.origen,
        destino=tr_s.destino,
        datum_origen=tr_s.datum_origen,
        datum_destino=tr_s.datum_destino,
        metodo=f"pyproj Transformer {tr_s.origen}->{tr_s.destino}",
        advertencias=tuple(sorted(set(tr_s.advertencias) | set(tr_t.advertencias))),
    )
    lt_s = longitud_total(s_utm)
    lt_t = longitud_total(t_utm)
    hd = hausdorff(s_utm, t_utm)
    perc_30 = longitud_coincidente(s_utm, t_utm, 30.0)
    nodos = nodos_cercanos(_vertices(s_utm), _vertices(t_utm), 30.0)
    comp = continuidad(t_utm)
    ori = orientacion_local(s_utm, t_utm, paso_muestreo=5)
    conv = analisis_multibuffer(s_utm, t_utm, CORREDOR_RADIOS_M)
    sin_hom = segmentos_sin_homologo(t_utm, s_utm, 30.0, 50.0)

    metricas = [
        MetricRecord("longitud_fuente", "Longitud de la fuente", "m", lt_s["longitud_m"]),
        MetricRecord("longitud_target", "Longitud del target", "m", lt_t["longitud_m"]),
        MetricRecord("cobertura_comun", "Cobertura común de envolventes", "m2/fraccion",
                     {"iou_envolventes": comun["iou_envolventes"],
                      "pct_cobertura_b_en_a": comun["pct_cobertura_b_en_a"],
                      "pct_cobertura_a_en_b": comun["pct_cobertura_a_en_b"]}),
        MetricRecord("longitud_coincidente", "Longitud de fuente dentro de 30m del target", "m",
                     perc_30["longitud_coincidente_m"], fuente="corredor 30 m"),
        MetricRecord("pct_dentro_corredor", "% de fuente dentro de corredor 30m", "%",
                     perc_30["pct_de_fuente"], fuente="corredor 30 m"),
        MetricRecord("hausdorff", "Hausdorff máximo", "m", hd["hausdorff_max_m"]),
        MetricRecord("hausdorff_dirigido_A_B", "Hausdorff dirigido A->B", "m", hd["hausdorff_dirigido_A_B_m"]),
        MetricRecord("hausdorff_dirigido_B_A", "Hausdorff dirigido B->A", "m", hd["hausdorff_dirigido_B_A_m"]),
        MetricRecord("orientacion_local_mediana", "Diferencia angular local (mediana)", "deg",
                     ori["diferencia_angular_mediana_deg"]),
        MetricRecord("orientacion_local_p90", "Diferencia angular local (p90)", "deg",
                     ori["diferencia_angular_p90_deg"]),
        MetricRecord("nodos_cercanos", "Fracción de vértices de fuente con soporte <=30m", "%",
                     nodos["fraccion_soportada_pct"]),
        MetricRecord("continuidad_target", "Componentes conectados del target", "n", comp["componentes"]),
        MetricRecord("n_divergentes", "Features del target sin homólogo a <=30m", "n", sin_hom["n_sin_homologo"]),
    ]
    return metricas, {"corridors": conv, "orientacion": ori, "sin_homologo": sin_hom}, tr


def _resolver_resultado(
    perfil: dict, extra: dict
) -> tuple[str, list[str], list[str], list[str], str]:
    """Resuelve result + correspondencias + divergencias + unmatched por reglas."""
    corr: list[str] = []
    div: list[str] = []
    unmatched: list[str] = []
    pct_a = pct_b = 0.0
    med_ori = 180.0
    n_sin = 0
    if extra.get("corridors"):
        por30 = next(r for r in extra["corridors"]["por_radio"] if r["radio_m"] == 30.0)
        pct_a = por30["pct_fuente_dentro"]
        pct_b = por30["pct_target_dentro"]
        if extra.get("orientacion"):
            med_ori = extra["orientacion"]["diferencia_angular_mediana_deg"]
        n_sin = extra.get("sin_homologo", {}).get("n_sin_homologo", 0)
        corr.append(f"alta correspondencia local: {pct_b}% del target dentro de 30m de la fuente")
        if n_sin:
            div.append(f"{n_sin} features del target sin homólogo visible en la fuente")
            unmatched = [f"sin homólogo: {n_sin} features del target"]
        if extra["corridors"]["sensibilidad"].startswith("plano"):
            div.append("sensibilidad de corredores plana: el radio no altera el % dentro del corredor")
        razones30 = f"corredor 30m: fuente {pct_a}% / target {pct_b}%; orientación mediana {med_ori}°"
    else:
        razones30 = "sin corredores en este perfil"
    perfil_id = perfil["id"]
    if perfil_id == COMPARE_SEGMENT_CORRESPONDENCE_V1:
        if pct_b >= 40.0 and med_ori <= 15.0:
            resultado = CANDIDATE_WITH_EVIDENCE
            corr.append("el segmento candidato presenta correspondencia fuerte con la red; permanece CANDIDATO_NO_DEMOSTRADO")
        elif pct_b >= 20.0:
            resultado = PARTIALLY_COMPARABLE
        else:
            resultado = NOT_COMPARABLE
    else:
        if pct_b >= 40.0:
            resultado = COMPARABLE
        elif pct_b >= 20.0:
            resultado = PARTIALLY_COMPARABLE
        else:
            resultado = NOT_COMPARABLE
    maximo = perfil.get("resultado_maximo")
    if maximo:
        if maximo in RESULTADOS_PROHIBIDOS:
            raise SpatialCompareError(f"resultado máximo del perfil prohibido: {maximo!r}")
        if resultado != maximo:
            resultado = maximo
    return resultado, corr, div, unmatched, razones30


# ------------------------------------------------------------------- ejecución

def correr_comparacion(
    perfil_id: str,
    case_root,
    question_id: str,
    source_asset_id: str,
    target_asset_id: str | None = None,
    repo: Path | None = None,
    clasificacion: str | None = None,
    seleccion_target: dict | None = None,
    confianza: str | None = None,
) -> ComparisonResult:
    repo = repo or repo_root()
    raiz = _raiz_absoluta(case_root, repo)
    perfil = obtener(perfil_id)
    case_id = f"caso_{Path(case_root).name}"
    clasif = clasificacion or perfil["clasificaciones_permitidas"][0]
    conf = confianza or perfil["confianza_default"]

    fuente_activo = _activo_registro(raiz, source_asset_id)
    if fuente_activo is None:
        return _resultado_no_fuente(
            raiz, perfil, case_id, question_id, clasif, source_asset_id,
            "fuente no registrada en el inventario espacial",
        )
    source_ref = _ref_fuente(raiz, repo, fuente_activo)
    bloqueos_src = cumplimiento_metricas(fuente_activo)

    target_activo: dict | None = None
    target_ref: SourceRef | None = None
    bloqueos_tgt: list[str] = []

    if target_asset_id:
        target_activo = _activo_registro(raiz, target_asset_id)
        if target_activo is None:
            return _resultado_no_fuente(
                raiz, perfil, case_id, question_id, clasif, target_asset_id,
                "target no registrado en el inventario espacial",
            )
        target_ref = _ref_fuente(raiz, repo, target_activo)
        bloqueos_tgt = cumplimiento_metricas(target_activo)

    si_metricas = perfil_id in _METRIC_PROFILES

    if si_metricas and fuente_activo["clase"] in (CLASE_C_REFERENCIAL_VISUAL, CLASE_EVIDENCIA):
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo,
            [f"clase no apta para métricas: {fuente_activo['clase']!r}"], bloqueos_tgt,
            ["fuente visual o evidencia; no produce métricas precisas"],
        )
    if si_metricas and bloqueos_src:
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo, bloqueos_src, bloqueos_tgt,
            ["fuente no apta para métricas; auditoría de gobernanza persistida"],
        )

    # ---- perfiles especiales -------------------------------------------------
    if perfil_id in (COMPARE_POINT_TO_NETWORKS_V1, COMPARE_D03_CANDIDATES_V1):
        return _correr_punto_red(
            raiz, repo, perfil, case_id, question_id, clasif, conf,
            source_ref, target_ref, fuente_activo, target_activo, seleccion_target,
        )
    if perfil_id == COMPARE_NETWORK_TO_TERRAIN_V1:
        return _correr_terreno(raiz, repo, perfil, case_id, question_id, clasif, conf, source_ref, fuente_activo)
    if perfil_id == REGISTER_VISUAL_REFERENCE_V1:
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, None,
            fuente_activo, None, bloqueos_src or ["referencia visual: sin métricas"],
            [], ["la referencia visual se registra, no se mide"],
        )

    # ---- red vs red / segmento -------------------------------------------------
    ruta_s = _ruta_activo(raiz, repo, fuente_activo)
    ruta_t = _ruta_activo(raiz, repo, target_activo)
    feats_s, crs_s_cab, crs_s_props = _features_de(ruta_s)
    feats_t, crs_t_cab, crs_t_props = _features_de(ruta_t)
    crs_s = _normalizar_crs(crs_s_cab) or _normalizar_crs(crs_s_props)
    crs_t = _normalizar_crs(crs_t_cab) or _normalizar_crs(crs_t_props)
    if not (es_crs_gobernado(crs_s) and es_crs_gobernado(crs_t)):
        faltas = []
        for etq, crs in (("fuente", crs_s), ("target", crs_t)):
            if not es_crs_gobernado(crs):
                faltas.append(f"CRS {etq} no gobernado: {crs!r}")
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo, faltas, [], ["CRS no gobernado; sin métricas"],
        )

    s_geoms = _geoms_lineas(feats_s)
    if seleccion_target:
        t_geoms, n_tot, n_sel = seleccion_target_segmento(
            feats_t, s_geoms, str(seleccion_target.get("tipo")), int(seleccion_target.get("segmento", 0))
        )
        seleccion = {
            "tipo": seleccion_target.get("tipo"),
            "segmento": seleccion_target.get("segmento"),
            "ventana": seleccion_target.get("ventana", "interseccion_con_envelope_de_la_fuente"),
            "features_originales": n_tot,
            "features_seleccionadas": n_sel,
        }
    else:
        t_geoms = _geoms_lineas(feats_t)
        seleccion = None

    comun = cobertura_comun([g.envelope for g in s_geoms], [g.envelope for g in t_geoms])
    metricas, extra, tr = _metricas_red_red(perfil, s_geoms, t_geoms, crs_s, crs_t, comun)
    resultado, corr_list, div_list, unmatched, razones30 = _resolver_resultado(perfil, extra)
    corridors = extra["corridors"]

    assumptions = [
        f"selección de target: {json.dumps(seleccion, ensure_ascii=False) if seleccion else 'sin filtro (features completas)'}",
        f"comparison_crs={COMPARISON_CRS}; transformación en memoria; archivos fuente intactos",
        "clasificación COMPUTATIONAL_INTERNAL_COMPARISON: evidencia interna sin autoridad territorial"
        if clasif == COMPUTATIONAL_INTERNAL_COMPARISON else f"clasificación {clasif}",
        "los buffers 30/60/90/136 m son tolerancias de análisis, no verdades",
    ]
    limitations = [
        "la comparación interna no demuestra competencia territorial",
        "discrepancia registrada entre CRS operativo del inventario (EPSG:32618) y CRS declarado del archivo (EPSG:4326); transformación explícita",
        "longitud y Hausdorff dependen de la precisión posicional de las fuentes (celdas de 30 m)",
    ]
    governance = {
        "fuente_apta_para_metricas": True,
        "target_apta_para_metricas": True,
        "bloqueos_source": [],
        "bloqueos_target": [],
        "nota": "fuentes B_COMPUTACIONAL internas; sin licencia UNKNOWN",
    }
    return _armar_resultado(
        raiz, perfil, case_id, question_id, clasif, conf, source_ref, target_ref,
        tr, comun, metricas, corridors, assumptions, limitations, div_list, corr_list,
        unmatched, governance, fuente_activo, target_activo,
        [razones30, f"resultado por reglas del perfil {perfil_id}"], resultado, seleccion=seleccion,
    )


# ------------------------------------------- ejecutores de perfiles especiales

def _correr_punto_red(raiz, repo, perfil, case_id, question_id, clasif, conf,
                      source_ref, target_ref, fuente_activo, target_activo, seleccion_target):
    """Punto(s) vs red: distancias y percentiles deterministas (sin adopción)."""
    ruta = _ruta_activo(raiz, repo, fuente_activo)
    feats, crs_cab, crs_props = _features_de(ruta)
    crs_s = _normalizar_crs(crs_cab) or _normalizar_crs(crs_props)
    puntos: list[Any] = []
    for f in feats:
        g = shape_fn(f["geometry"])
        if g.geom_type == "Point":
            puntos.append(g)
        elif g.geom_type == "MultiPoint":
            puntos.extend([Point(c) for c in g.geoms])
    if not puntos:
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, target_ref,
            fuente_activo, target_activo, ["fuente sin geometrías Point"], [],
            ["fuente sin puntos; sin métricas"],
        )
    if target_activo is None:
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, None,
            fuente_activo, None, ["falta red de referencia"], [],
            ["sin red de referencia para punto-red"],
        )
    ruta_t = _ruta_activo(raiz, repo, target_activo)
    feats_t, crs_t_cab, crs_t_props = _features_de(ruta_t)
    crs_t = _normalizar_crs(crs_t_cab) or _normalizar_crs(crs_t_props)
    red_in = _geoms_lineas(feats_t)
    if seleccion_target:
        red_in, _, _ = seleccion_target_segmento(
            feats_t, red_in, str(seleccion_target.get("tipo")), int(seleccion_target.get("segmento", 0))
        )
    red, tr_t = _transformar_lista(red_in, crs_t, COMPARISON_CRS)
    pts, tr_s = transformar_puntos([p for p in puntos], crs_s, COMPARISON_CRS)
    min_d = distancia_punto_red(pts[0], red)
    perc = distancias_punto_red_percentiles(pts[0], red)
    tr = TransformationRecord(
        motor=tr_s.motor,
        version=tr_s.version,
        always_xy=True,
        origen=crs_s,
        destino=COMPARISON_CRS,
        datum_origen=tr_s.datum_origen,
        datum_destino=tr_s.datum_destino,
        metodo="pyproj Transformer en memoria",
        advertencias=tuple(sorted(set(tr_s.advertencias) | set(tr_t.advertencias))),
    )
    metricas = [
        MetricRecord("distancia_punto_red_min", "Distancia mínima punto-red", "m", min_d["distancia_minima_m"],
                     fuente=source_ref.nombre),
        MetricRecord("distancia_punto_red_percentiles", "Percentiles de distancia vértice-red", "m",
                     {k: perc[k] for k in ("min_m", "media_m", "mediana_m", "p90_m", "p95_m", "p99_m", "max_m", "n")},
                     fuente="vértices de la red"),
    ]
    min_m = min_d["distancia_minima_m"]
    resultado = COMPARABLE if min_m <= 30 else (PARTIALLY_COMPARABLE if min_m <= 136 else NOT_COMPARABLE)
    comun = cobertura_comun([p.buffer(500.0) for p in pts], [g.envelope for g in red])
    governance = {"fuente_apta_para_metricas": True, "target_apta_para_metricas": True,
                  "bloqueos_source": [], "bloqueos_target": []}
    assumptions = [
        "diagnóstico de distancias: no selecciona ni adopta celdas",
        "punto y red transformados en memoria; fuentes intactas",
    ]
    limitations = ["la distancia no sustituye el acta profesional PF-02", "red construida con celdas de 30 m"]
    return _armar_resultado(
        raiz, perfil, case_id, question_id, clasif, conf, source_ref, target_ref,
        tr, comun, metricas, {"radios_m": [], "por_radio": [], "sensibilidad": "n/a",
                              "nota": "perfil punto-red"}, assumptions, limitations,
        [], ["correspondencia local punto-red calculada"], [], governance,
        fuente_activo, target_activo,
        [f"distancia mínima punto-red {min_m} m (PF-02 requiere acta si 30-136 m)"], resultado,
    )


def _correr_terreno(raiz, repo, perfil, case_id, question_id, clasif, conf,
                    source_ref, fuente_activo):
    """Alineación red-terreno ligera: elevación y fracción de descenso
    preservada. Jamás emite competencia territorial."""
    mdt = _activo_registro(raiz, "mdt_copernicus_glo30_aburra")
    if mdt is None or not mdt.get("ruta_relativa_repo"):
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, None,
            fuente_activo, None, ["raster MDT no registrado"], [],
            ["MDT no registrado; sin evidencia de terreno"],
        )
    if not es_crs_gobernado(mdt.get("crs")):
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, None,
            fuente_activo, None, [f"CRS MDT no gobernado: {mdt.get('crs')!r}"], [],
            ["MDT sin CRS gobernado; sin evidencia de terreno"],
        )
    ruta = repo / mdt["ruta_relativa_repo"]
    if not ruta.exists():
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, None,
            fuente_activo, None, ["raster MDT no encontrado"], [],
            ["MDT ausente; sin evidencia de terreno"],
        )
    ruta_s = _ruta_activo(raiz, repo, fuente_activo)
    feats, crs_cab, crs_props = _features_de(ruta_s)
    crs_s = _normalizar_crs(crs_cab) or _normalizar_crs(crs_props)
    s_geoms = _geoms_lineas(feats)
    import rasterio  # import bajo demanda

    elevaciones: list[float] = []
    with rasterio.open(str(ruta)) as src:
        for (x, y) in _vertices(s_geoms):
            if not (x == x and y == y):
                continue
            try:
                muestras = list(src.sample([(x, y)]))
                v = float(muestras[0][0])
                if v == v and v != src.nodata:
                    elevaciones.append(v)
            except Exception:
                continue
    if len(elevaciones) < 2:
        return _resultado_sin_metricas(
            raiz, perfil, case_id, question_id, clasif, source_ref, None,
            fuente_activo, None, ["muestreo de elevaciones insuficiente"], [],
            ["terreno sin muestras suficientes"],
        )
    descenso = sum(1 for i in range(len(elevaciones) - 1) if elevaciones[i + 1] <= elevaciones[i] + 1e-6)
    ratio = descenso / (len(elevaciones) - 1)
    resultado = INTERNALLY_VALIDATED_WITH_TERRAIN_EVIDENCE if ratio >= 0.8 else PARTIALLY_COMPARABLE
    metricas = [
        MetricRecord("elevacion_red", "Elevación muestreada en vértices de red", "msnm",
                     {"min": round(min(elevaciones), 3), "media": round(sum(elevaciones) / len(elevaciones), 3),
                      "max": round(max(elevaciones), 3), "n": len(elevaciones)}),
        MetricRecord("fraccion_descenso", "Fracción de tramos con descenso preservado", "fraccion", round(ratio, 3)),
        MetricRecord("cobertura_mdt", "Muestras de elevación válidas", "n", len(elevaciones)),
    ]
    tr = TransformationRecord(motor="rasterio", version=rasterio.__version__, always_xy=True,
                              origen=crs_s or "EPSG:4326", destino=COMPARISON_CRS,
                              datum_origen="WGS84", datum_destino="WGS84",
                              metodo="rasterio.sample en CRS de la red", advertencias=())
    comun = {"iou_envolventes": 0.0, "pct_cobertura_b_en_a": 0.0, "pct_cobertura_a_en_b": 0.0}
    governance = {"fuente_apta_para_metricas": True, "raster_mdt": mdt.get("id"), "bloqueos_source": [], "bloqueos_target": []}
    assumptions = ["evidencia de terreno = muestra altimétrica ligera; no es competencia territorial"]
    limitations = ["la fracción de descenso no certifica competencia territorial"]
    return _armar_resultado(
        raiz, perfil, case_id, question_id, clasif, conf, source_ref, None,
        tr, comun, metricas, {"radios_m": [], "por_radio": [], "sensibilidad": "n/a",
                              "nota": "perfil terreno"}, assumptions, limitations,
        [f"descenso preservado en {ratio*100:.1f}% de los tramos"], ["terreno alineado con la red"], [],
        governance, fuente_activo, None,
        [f"fracción de descenso {ratio:.3f}"], resultado,
    )


# -------------------------------------------------------- resultados sin métricas

def _resultado_no_fuente(raiz, perfil, case_id, question_id, clasif, asset_id, razon):
    source = SourceRef(asset_id=asset_id, nombre=asset_id, clase="", ruta="",
                       hash_sha256="", crs_declarado=None, crs_operativo_registro=None,
                       estado_registro="NO_REGISTRADO", autoridad=None, licencia=None)
    tr = _tr_placeholder()
    governance = {"fuente_apta_para_metricas": False, "bloqueos_source": [razon],
                  "bloqueos_target": [], "nota": "fuente no registrada"}
    return _armar_resultado(
        raiz, perfil, case_id, question_id, clasif, BAJA, source, None, tr,
        {"iou_envolventes": 0.0, "pct_cobertura_b_en_a": 0.0, "pct_cobertura_a_en_b": 0.0}, [],
        {"radios_m": [], "por_radio": [], "sensibilidad": "n/a", "nota": "sin métricas"},
        [], [], [], [], governance, None, None, [razon], REFERENCE_UNAVAILABLE,
    )


def _resultado_sin_metricas(raiz, perfil, case_id, question_id, clasif, source, target,
                            fuente_activo, target_activo, bloqueos_src, bloqueos_tgt, razones):
    tr = _tr_placeholder()
    gov = audit_gobernanza(fuente_activo or {})
    governance = {
        "fuente_apta_para_metricas": False,
        "bloqueos_source": sorted(set(bloqueos_src or gov.get("bloqueos", []))),
        "target_apta_para_metricas": True if target is None else not bloqueos_tgt,
        "bloqueos_target": sorted(set(bloqueos_tgt or [])),
        "estado_registro_source": (fuente_activo or {}).get("estado"),
        "clase_source": (fuente_activo or {}).get("clase"),
        "licencia_source": (fuente_activo or {}).get("licencia"),
        "autoridad_source": (fuente_activo or {}).get("autoridad"),
        "crs_source": (fuente_activo or {}).get("crs"),
        "nota": "sin métricas; auditoría de gobernanza persistida",
    }
    return _armar_resultado(
        raiz, perfil, case_id, question_id, clasif, BAJA, source, target, tr,
        {"iou_envolventes": 0.0, "pct_cobertura_b_en_a": 0.0, "pct_cobertura_a_en_b": 0.0}, [],
        {"radios_m": [], "por_radio": [], "sensibilidad": "n/a", "nota": "sin métricas"},
        ["sin métricas: la comparación se restringe a la auditoría de gobernanza de la fuente"],
        ["no hay evidencia geométrica suficiente"], [], [], [], governance,
        fuente_activo, target_activo, razones, INSUFFICIENT_EVIDENCE,
    )


def _tr_placeholder() -> TransformationRecord:
    return TransformationRecord(motor="n/a", version="", always_xy=True, origen="n/a",
                                destino=COMPARISON_CRS, datum_origen="n/a", datum_destino="n/a",
                                metodo="sin transformación", advertencias=(), precision="n/a")


def _armar_resultado(raiz, perfil: dict, case_id, question_id, clasif, conf,
                     source, target, tr, comun_d, metricas, corridors, assumptions,
                     limitations, divergences, correspondences, unmatched, governance,
                     source_activo, target_activo, razones, resultado, seleccion=None):
    permitidos = list(perfil.get("consumidores_permitidos", []))
    bloqueados = list(perfil.get("consumidores_bloqueados", []))
    prohibidas = list(perfil.get("interpretaciones_prohibidas", []))
    evid = [
        _REGISTRO,
        _QA_REFERENCIA,
        _NETWORK_REF,
        _DECISION_REF,
        _GATES_REF,
    ]
    if source_activo and source_activo.get("ruta_relativa_repo"):
        evid.append(source_activo["ruta_relativa_repo"])
    if target_activo and target_activo.get("ruta_relativa_repo"):
        evid.append(target_activo["ruta_relativa_repo"])
    evid.append(f"spatial/comparisons/runs/{slug_question(question_id)}.json")

    qa_prereq = {
        "qa_profiles": sorted(set(perfil.get("qa_previo", []))),
        "source_estado": (source_activo or {}).get("estado"),
        "target_estado": (target_activo or {}).get("estado") if target_activo else None,
        "red_competencia": "NOT_DEMONSTRATED",
        "nota": "QA previo de hf.geo-qa.v1; la comparación no sustituye veredictos",
    }
    input_hashes = {
        "registry": _sha_texto(json.dumps(_leer_json(raiz / _REGISTRO), sort_keys=True)),
        "source_file": source.hash_sha256,
        "target_file": target.hash_sha256 if target else "",
    }
    res = ComparisonResult(
        question_id=question_id,
        case_id=case_id,
        comparison_profile=perfil["id"],
        classification=clasif,
        source=source,
        target=target,
        comparison_crs=COMPARISON_CRS,
        transformation_record=tr,
        overlap_extent=comun_d,
        tolerances=list(perfil.get("tolerancias_default", [])),
        metrics=metricas,
        corridors=corridors,
        assumptions=assumptions,
        limitations=limitations,
        divergences=divergences,
        correspondences=correspondences,
        unmatched_segments=unmatched,
        evidence_refs=sorted(set(evid)),
        qa_prereq=qa_prereq,
        governance=governance,
        result=resultado,
        confidence=conf,
        allowed_interpretations=["CANDIDATE_WITH_EVIDENCE"] if resultado == CANDIDATE_WITH_EVIDENCE else [],
        forbidden_interpretations=prohibidas,
        consumers_allowed=permitidos,
        consumers_blocked=bloqueados,
        razones=razones,
        version=__version__,
        input_hashes=input_hashes,
        timestamp=_UTC(),
        state_change=False,
        professional_decision=None,
    )
    res.comparison_run_id = R.calcular_comparison_run_id(res)
    res.output_hash = R.calcular_output_hash(res)
    return res


# ----------------------------------------------------------------------- pilotos

def piloto_interno_red_vs_seg24(
    case_root,
    repo: Path | None = None,
    question_id: str = "INTERNO_RED_VS_SEGMENTO_24",
    clasificacion: str = COMPUTATIONAL_INTERNAL_COMPARISON,
) -> ComparisonResult:
    """Piloto interno: red HF vs segmento candidato 24 en ventana portable."""
    return correr_comparacion(
        COMPARE_SEGMENT_CORRESPONDENCE_V1, case_root, question_id,
        source_asset_id="red_hf_gate02_d03", target_asset_id="segmento_candidato_d03",
        repo=repo, clasificacion=clasificacion,
        seleccion_target={
            "tipo": "segmento_elegido",
            "segmento": 24,
            "ventana": "interseccion_con_envelope_de_la_fuente",
        },
    )


def piloto_territorial_streams(
    case_root,
    repo: Path | None = None,
    question_id: str = "EXTERNO_STREAMS_URBAN_1000_AUDIT",
    clasificacion: str = TERRITORIAL_CONTRAST_AUDIT,
) -> ComparisonResult:
    """Piloto territorial: auditoría de gobernanza de la fuente externa
    streams_urban_1000_medellin.gpkg (sin métricas; esperado INSUFFICIENT_EVIDENCE)."""
    return correr_comparacion(
        COMPARE_VECTOR_NETWORKS_V1, case_root, question_id,
        source_asset_id="streams_urban_1000_medellin", repo=repo,
        clasificacion=clasificacion,
    )


# ----------------------------------------------------------------------- registro

def regenerar_integridad(raiz: Path) -> dict:
    """Refresca package/evidence tras registro; verifica state_hash invariante."""
    resolver = importar_resolver()
    antes = resolver.estado_hash_paquete(raiz)
    generar = importar_generador()
    generar.main([str(raiz)])
    despues = resolver.estado_hash_paquete(raiz)
    if despues != antes:
        raise RuntimeError(f"state_hash cambió ({antes} -> {despues}); no se persiste")
    return resolver.generar_integridad(raiz)


def registar_piloto(
    perfil_id: str,
    case_root,
    question_id: str,
    source_asset_id: str,
    target_asset_id: str | None = None,
    repo: Path | None = None,
    clasificacion: str | None = None,
    seleccion_target: dict | None = None,
) -> dict:
    """Ejecuta la comparación, la persiste, la registra en el ledger y regenera."""
    repo = repo or repo_root()
    raiz = _raiz_absoluta(case_root, repo)
    res = correr_comparacion(
        perfil_id, case_root, question_id, source_asset_id, target_asset_id,
        repo=repo, clasificacion=clasificacion, seleccion_target=seleccion_target,
    )
    errores = R.validar_invariantes(res)
    if errores:
        raise RuntimeError(f"comparación con invariantes rotas: {errores}")
    persistir_run(raiz, res)
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


__all__ = [
    "repo_root",
    "correr_comparacion",
    "piloto_interno_red_vs_seg24",
    "piloto_territorial_streams",
    "registar_piloto",
    "regenerar_integridad",
    "seleccion_target_segmento",
]