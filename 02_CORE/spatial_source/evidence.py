# -*- coding: utf-8 -*-
"""
evidence — persistencia del assessment, contraste post-assessment y
regeneración serial de integridad.

Convenciones:
- assessments/ <source_id>.json            documento completo firmado.
- assessments/ spatial-source-assessment-ledger.jsonl  append serial.
- spatial/comparisons/runs|evidence/...    run post-assessment (contrato
  hf.spatial-comparison.result.v1 para que el escáner C19 lo acepte).
- manifest.json activos_referenciados_pesados  entra la fuente evaluada.
- regeneración serial: manifest -> checksums -> integrity (generar_integridad).

output_hash es determinista (fecha_utc excluida del material firmado, igual
que el timestamp en spatial_compare). Ninguna ruta absoluta se persiste.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from . import registry as REG
from .deps import importar_generador, importar_resolver
from .models import (
    QUESTION_POST_ASSESSMENT,
    SOURCE_ID,
    SOURCE_ID_ASESADO,
    canonical_json,
)
from .result import (
    AssessmentResult,
    calcular_assessment_id,
    calcular_output_hash,
)

_CARPETA_ASSESSMENTS = "spatial/sources/assessments"
_ARCHIVO_ASSESSMENT = _CARPETA_ASSESSMENTS + "/" + SOURCE_ID_ASESADO + ".json"
_LEDGER = _CARPETA_ASSESSMENTS + "/spatial-source-assessment-ledger.jsonl"

_PREGUNTA = QUESTION_POST_ASSESSMENT
_SLUG = "EXTERNO_STREAMS_URBAN_1000_POST_ASSESSMENT"
_RUN = "spatial/comparisons/runs/" + _SLUG + ".json"
_SOURCES = "spatial/comparisons/evidence/" + _SLUG + "_sources.json"
_AUDIT = "spatial/comparisons/evidence/" + _SLUG + "_audit.md"


def _fecha_utc() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _leer_jsonl(ruta: Path) -> list[dict]:
    out: list[dict] = []
    if not ruta.is_file():
        return out
    for linea in ruta.read_text(encoding="utf-8").splitlines():
        linea = linea.strip()
        if linea:
            out.append(json.loads(linea))
    return out


def documento_firmado(res: AssessmentResult) -> dict:
    """Documento final autoconsistente. output_hash es determinista: se calcula
    sobre el documento sin fecha_utc (equivalente a `calcular_output_hash`)."""
    doc = res.to_dict()
    doc["fecha_utc"] = _fecha_utc()
    doc["assessment_id"] = res.assessment_id or calcular_assessment_id(res)
    doc["firmas"] = {
        "algoritmo": "sha256",
        "output_hash": res.firmas.get("output_hash") or calcular_output_hash(res),
    }
    return doc


def persistir_documento_assessment(caso_raiz: Path, res: AssessmentResult) -> list[str]:
    doc = documento_firmado(res)
    ruta = Path(caso_raiz) / _ARCHIVO_ASSESSMENT
    ruta.parent.mkdir(parents=True, exist_ok=True)
    ruta.write_text(canonical_json(doc) + "\n", encoding="utf-8")

    ledger = Path(caso_raiz) / _LEDGER
    actuales = _leer_jsonl(ledger)
    previos = [e for e in actuales if e.get("grupo") == "spatial_source_assessment"]
    if not any(e.get("assessment_id") == doc["assessment_id"] for e in previos):
        numero = max([e.get("linea") or 0 for e in actuales], default=0) + 1
        entrada = {
            "linea": numero,
            "grupo": "spatial_source_assessment",
            "source_id": SOURCE_ID,
            "source_id_assesed": SOURCE_ID_ASESADO,
            "assessment_id": doc["assessment_id"],
            "resultado": doc["aptitud"]["resultado"],
            "detalle": doc["aptitud"].get("razon"),
            "fecha": doc["fecha_utc"],
            "metodo": f"{doc['motores']['modulo']} v{doc['schema_version']}",
            "output_hash": doc["firmas"]["output_hash"],
            "evidencia": _ARCHIVO_ASSESSMENT,
            "state_change": False,
        }
        ledger.parent.mkdir(parents=True, exist_ok=True)
        with open(ledger, "a", encoding="utf-8") as fh:
            fh.write(json.dumps(entrada, ensure_ascii=False) + "\n")
        return [_ARCHIVO_ASSESSMENT, _LEDGER]
    return [_ARCHIVO_ASSESSMENT]


def sincronizar_registro(caso_raiz: Path, res: AssessmentResult) -> str:
    """Inserta la entrada evaluada; idempotente para el mismo assessment_id."""
    existente = REG.buscar_activo(caso_raiz, SOURCE_ID_ASESADO)
    if existente:
        if existente.get("assessment_id") != res.assessment_id:
            raise ValueError(
                f"registro '{SOURCE_ID_ASESADO}' ya existe con otro assessment_id"
            )
        return SOURCE_ID_ASESADO
    REG.insertar_activo(caso_raiz, REG.entrada_assessed(res, dict(res.qa.get("quorum") or {})))
    return SOURCE_ID_ASESADO


def construir_run_post_assessment(caso_raiz: Path, res: AssessmentResult):
    """Run post-assessment con el contrato hf.spatial-comparison.result.v1."""
    from spatial_compare.models import (  # noqa: PLC0415
        BAJA,
        CONSUMIDORES_BLOQUEADOS_DEF,
        CONSUMIDORES_PERMITIDOS_DEF,
        ComparisonResult,
        SCHEMA_RESULTADO,
        SCHEMA_VERSION as SCV,
        SourceRef,
        TERRITORIAL_CONTRAST_AUDIT,
        TransformationRecord,
    )

    resolver = importar_resolver()
    registry_hash = resolver.sha256_archivo(
        resolver.ruta_interna(caso_raiz, "spatial/spatial-data-registry.json")
    )
    registro = REG.leer_registro(caso_raiz)
    entry = next(
        (a for a in registro.get("activos", []) if a.get("id") == SOURCE_ID_ASESADO),
        None,
    )
    if entry is None:
        raise RuntimeError("registro sin entrada evaluada (sincronizar primero)")

    source = SourceRef(
        asset_id=SOURCE_ID_ASESADO,
        nombre="Red de drenajes urbanos 1:1000 del Distrito de Medellín (Streams) — evaluada",
        clase="B_COMPUTACIONAL",
        ruta="01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg",
        hash_sha256=res.hashes["sha256"],
        crs_declarado=entry.get("crs"),
        crs_operativo_registro=None,
        estado_registro=entry.get("estado", ""),
        autoridad=None,
        licencia=entry.get("licencia"),
    )
    qa_resumen = {p["perfil"]: p["resultado_global"] for p in res.qa.get("perfiles", [])}
    tr = TransformationRecord(
        motor="pyproj",
        version=res.motores["pyproj"],
        always_xy=True,
        origen=res.crs["crs_declarado"] or "n/a",
        destino="EPSG:32618",
        datum_origen=(res.crs.get("datum") or {}).get("nombre"),
        datum_destino="MAGNA-SIRGAS (UTM 18N)",
        metodo="Transformer, errcheck=True (reproyecta ventana D-03 y envolvente)",
    )
    gobernanza = {
        "clase_source": "B_COMPUTACIONAL",
        "crs_source": entry.get("crs"),
        "autoridad_source": None,
        "licencia_source": entry.get("licencia"),
        "estado_registro_source": entry.get("estado", ""),
        "bloqueos_source": ["licencia UNKNOWN", "autoridad no declarada"],
        "bloqueos_target": [],
        "fuente_apta_para_metricas": False,
        "target_apta_para_metricas": True,
        "nota": (
            "post-assessment: 'CRS ausente' resuelto por assessment; licencia "
            "UNKNOWN limita el contraste a PARTIALLY_COMPARABLE"
        ),
    }
    return ComparisonResult(
        question_id=_PREGUNTA,
        case_id="iguana_pc80",
        comparison_profile="COMPARE_D03_CANDIDATES_V1",
        classification=TERRITORIAL_CONTRAST_AUDIT,
        source=source,
        target=None,
        comparison_crs="EPSG:32618",
        transformation_record=tr,
        overlap_extent={
            "iou_envolventes": round(res.cobertura["iou_extension"], 4),
            "pct_cobertura_a_en_b": round(res.cobertura["pct_extension_sobre_ventana"], 4),
            "pct_cobertura_b_en_a": round(res.cobertura["pct_extension_sobre_ventana"], 4),
        },
        tolerances=[
            {"pf": "PF-02", "rango_m": "30-136", "exige_acta": True},
        ],
        metrics=[],
        corridors={
            "nota": "sin métricas; evaluación de aptitud de la fuente",
            "por_radio": [],
            "radios_m": [],
            "sensibilidad": "n/a",
        },
        assumptions=[
            "post-assessment re-emite la aptitud de la fuente: condicional",
            "sin métricas geométricas en este run (reservadas a futuros runs de GATE 3)",
        ],
        limitations=[
            "licencia UNKNOWN y autoridad no declarada bloquean métricas plenas",
        ],
        divergences=[],
        correspondences=[],
        unmatched_segments=[],
        evidence_refs=[
            _ARCHIVO_ASSESSMENT,
            "spatial/spatial-data-registry.json",
            "decision/spatial-decision.json",
            "state/gates.jsonl",
        ],
        qa_prereq={
            "nota": "QA previo de hf.geo-qa.v1; la comparación no sustituye veredictos",
            "qa_profiles": [
                "QA_SPATIAL_REFERENCE_V1", "QA_VECTOR_GEOMETRY_V1", "QA_NETWORK_INTERNAL_V1",
            ],
            "qa_resumen": qa_resumen,
            "red_competencia": "NOT_DEMONSTRATED",
            "source_estado": entry.get("estado", ""),
            "target_estado": None,
        },
        governance=gobernanza,
        result="INSUFFICIENT_EVIDENCE",
        confidence=BAJA,
        allowed_interpretations=[
            "PARTIALLY_COMPARABLE: solapamiento parcial y métricas restringidas por licencia UNKNOWN",
        ],
        forbidden_interpretations=[
            "TRUE_NETWORK", "CORRECT_CHANNEL", "ADOPTED_SEGMENT",
            "TERRITORIALLY_COMPETENT", "ADOPTED_CELL",
        ],
        consumers_allowed=sorted(CONSUMIDORES_PERMITIDOS_DEF),
        consumers_blocked=sorted(CONSUMIDORES_BLOQUEADOS_DEF),
        razones=[
            "fuente redimida a CONDITIONALLY_APT_FOR_COMPARISON vía assessment",
            "métricas reservadas a futuros runs de GATE 3 (licencia UNKNOWN)",
        ],
        schema=SCHEMA_RESULTADO,
        schema_version=SCV,
        motor="HF_SPATIAL_COMPARE_RUNNER",
        version=res.version,
        input_hashes={
            "source_file": res.hashes["sha256"],
            "registry": registry_hash,
            "target_file": "",
        },
        professional_decision=None,
        state_change=False,
    )


def persistir_run_post_assessment(caso_raiz: Path, res: AssessmentResult) -> list[str]:
    """Escribe run, fuentes y auditoría post-assessment (contrato de comparación)."""
    from spatial_compare import evidence as SC_EVID  # noqa: PLC0415
    from spatial_compare.result import (  # noqa: PLC0415
        calcular_comparison_run_id,
        calcular_output_hash,
    )

    run = construir_run_post_assessment(caso_raiz, res)
    run.comparison_run_id = calcular_comparison_run_id(run)
    run.output_hash = calcular_output_hash(run)
    run.timestamp = _fecha_utc()
    # Idempotencia: id determinista (misma fuente/proceso) -> no duplicar ledger.
    ledger_run = Path(caso_raiz) / "spatial" / "comparisons" / "comparison-ledger.jsonl"
    ya_registrado = False
    if ledger_run.is_file():
        for linea in ledger_run.read_text("utf-8").splitlines():
            if linea.strip() and json.loads(linea).get("evidencia") == run.comparison_run_id:
                ya_registrado = True
                break
    if ya_registrado:
        return []
    rutas = SC_EVID.persistir_run(caso_raiz, run)
    SC_EVID.append_ledger(caso_raiz, run)
    return rutas


def actualizar_manifest(caso_raiz: Path, res: AssessmentResult) -> None:
    """Añade la fuente evaluada a activos_referenciados_pesados y registra los
    documentos del assessment/post-assessment en activos_incorporados."""
    manifest_path = Path(caso_raiz) / "manifest.json"
    manifest = json.loads(manifest_path.read_text("utf-8"))
    referencial = manifest.setdefault("activos_referenciados_pesados", [])
    if not any(e.get("id") == SOURCE_ID_ASESADO for e in referencial):
        referencial.append(
            {
                "id": SOURCE_ID_ASESADO,
                "clase": "B_COMPUTACIONAL",
                "formato": "GeoPackage",
                "ruta_relativa_repo": "01_DEM_HIDRO/04_STREAMS_VECTOR/streams_urban_1000_medellin.gpkg",
                "hash": res.hashes["sha256"],
                "tamano_bytes": res.hashes["tamano_bytes"],
                "crs": res.crs["crs_declarado"],
                "fuente": "externa (Distrito de Medellín)",
                "autoridad": None,
                "fecha": None,
                "vigencia": "no_definida",
                "licencia": "UNKNOWN",
                "portabilidad": "no_portable_datos_privados",
                "regenerabilidad": "no_regenerable",
                "procedencia": "assessment OT-HF-SPATIAL-SOURCE-001",
                "estado": res.aptitud["resultado"],
                "restricciones": [
                    "NO copiado",
                    "verificar por hash",
                    "máx. PARTIALLY_COMPARABLE (licencia UNKNOWN)",
                ],
            }
        )
    incorporados = manifest.setdefault("activos_incorporados", [])
    nuevas = [
        ("spatial-source-assessment-streams-1000", "JSON", _ARCHIVO_ASSESSMENT),
        ("spatial-source-assessment-ledger", "JSONL", _LEDGER),
        ("post-assessment-run-externo-streams-1000", "JSON", _RUN),
        ("post-assessment-sources-externo-streams-1000", "JSON", _SOURCES),
        ("post-assessment-audit-externo-streams-1000", "Markdown", _AUDIT),
    ]
    ids = [e.get("id") for e in incorporados]
    for rid, formato, rel in nuevas:
        if rid in ids:
            continue
        incorporados.append(
            {
                "id": rid,
                "clase": "B_COMPUTACIONAL",
                "formato": formato,
                "ruta_relativa": rel,
                "hash": None,
                "tamano_bytes": 0,
                "fuente": "OT-HF-SPATIAL-SOURCE-001",
                "autoridad": "Ingeniero Digital (Big Pickle)",
                "portabilidad": "internal",
                "regenerabilidad": "regenerable",
                "estado": "EMITIDO_POR_MOTOR",
                "restricciones": [
                    "state_change=false; professional_decision=null; sin autoridad territorial"
                ],
            }
        )
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def regenerar_integridad(caso_raiz: Path) -> dict:
    """Regenera serialmente manifest -> integrity -> checksums (generar_integridad)."""
    gen = importar_generador()
    codigo = gen.main([str(caso_raiz)])
    if codigo != 0:
        raise RuntimeError("generar_integridad falló al regenerar la integridad")
    resolver = importar_resolver()
    return resolver.leer_integridad(caso_raiz)["hashes"]


def correr_y_registrar(ruta_fuente=None, caso_raiz=None, regenerar=True) -> dict:
    """Orquestación completa: assessment -> persistencia -> post-assessment -> integridad."""
    from .assessment import correr_assessment  # noqa: PLC0415

    resolver = importar_resolver()
    caso_raiz = resolver.resolver_raiz_caso(caso_raiz)
    res = correr_assessment(ruta_fuente=ruta_fuente, caso_raiz=caso_raiz)

    persistir_documento_assessment(caso_raiz, res)
    sincronizar_registro(caso_raiz, res)
    rutas_run = persistir_run_post_assessment(caso_raiz, res)
    actualizar_manifest(caso_raiz, res)
    hashes = regenerar_integridad(caso_raiz) if regenerar else {}

    return {
        "assessment_id": res.assessment_id,
        "output_hash": res.firmas["output_hash"],
        "aptitud": res.aptitud["resultado"],
        "assessment_doc": _ARCHIVO_ASSESSMENT,
        "perfiles": {p["perfil"]: p["resultado_global"] for p in res.qa.get("perfiles", [])},
        "post_assessment_runs": rutas_run,
        "hashes_post": hashes,
    }


__all__ = [
    "documento_firmado",
    "persistir_documento_assessment",
    "sincronizar_registro",
    "construir_run_post_assessment",
    "persistir_run_post_assessment",
    "actualizar_manifest",
    "regenerar_integridad",
    "correr_y_registrar",
    "_ARCHIVO_ASSESSMENT",
    "_LEDGER",
    "_RUN",
    "_SOURCES",
    "_AUDIT",
]