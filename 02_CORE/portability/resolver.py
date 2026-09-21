# -*- coding: utf-8 -*-
"""
Resolvedor portable aislado del caso HidroFlow.

OT-HF-PORT-002 — Contrato portable del caso iguana_pc80.

Resuelve la raíz de un caso portable (HF_CASE_ROOT) con esta prioridad:

1. Argumento explícito.
2. Variable de entorno HF_CASE_ROOT.
3. Descubrimiento ascendente del marcador .hfcase.
4. Error explícito (sin fallbacks silenciosos).

Prohibido por contrato:
- fallback a D:/HidroFlow
- fallback a C:/Users/User
- fallback a caso_real_001
- fallback a "Cien Pesos"
- fallback a una salida histórica
- completar silenciosamente una ruta faltante

Garantías:
- Funciona en Windows y conceptualmente en Linux.
- Usa pathlib.
- Normaliza separadores.
- Impide escape fuera de la raíz cuando una ruta deba ser interna.
- Distingue activos internos (dentro del paquete) y externos (referencias).

Este módulo NO modifica componentes productivos (express-server, hf_geo_bridge,
hf_hydro_cli, wbt_runner, motores, productores, aplicación React).
"""

from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path, PurePath


MARKER = ".hfcase"
ENV_ROOT = "HF_CASE_ROOT"

# --- Modelo de integridad triple (OT-HF-SIG-002B) ---------------------------
# state_hash: contratos de decisión del caso (lista inclusiva y explícita).
CONTRATOS_ESTADO = [
    "decision-log.jsonl",
    "state/gates.jsonl",
    "decision/spatial-decision.json",
    "decision/restrictions.json",
    "geometry/project-location.geojson",
    "geometry/proposed-cell.geojson",
]
# adopted-cell se añade automáticamente cuando exista (adopción futura).
CONTRATOS_ESTADO_ADICIONALES = ["geometry/adopted-cell.geojson"]

# evidence_hash: contratos de evidencia (futuro spatial/comparisons/**).
CONTRATOS_EVIDENCIA = [
    "evidence/hashes.json",
    "evidence/provenance.json",
    "spatial/spatial-data-registry.json",
    "spatial/qa/qa-ledger.jsonl",
]

# Meta que nunca forma parte del material de package_hash (corta ciclos).
META_PAQUETE = {
    "case.json",
    "integrity.json",
    "manifest.json",
    "checksums.sha256",
}
# Directorios excluidos del material de package_hash (caché/exportaciones).
DIRS_EXCLUIDOS_PAQUETE = ("cache", "exports")
# Entradas del manifest que la proyección canónica elimina (meta / self).
ENTRADAS_MANIFEST_META = {
    "case.json",
    "integrity.json",
    "manifest.json",
    "checksums.sha256",
}


class PortabilityError(Exception):
    """Error gobernado de portabilidad. Mensaje explícito, sin fallback."""


def _buscar_marcador_ascendente(start: Path, marker: str = MARKER) -> Path:
    """Busca marker hacia arriba; devuelve el directorio que lo contiene."""
    current = start
    for _ in range(64):  # límite defensivo de profundidad
        probe = current / marker
        if probe.is_file():
            return current
        if current.parent == current:
            break
        current = current.parent
    raise PortabilityError(
        f"No se encontró el marcador '{marker}' ascendiendo desde "
        f"'{start}'. No se aplica ningún fallback: el caso portable no es "
        f"descubrible desde esa ruta."
    )


def resolver_raiz_caso(ejplicit: str | os.PathLike | None = None) -> Path:
    """
    Resuelve HF_CASE_ROOT con prioridad:
    1) argumento explícito
    2) variable de entorno HF_CASE_ROOT
    3) descubrimiento ascendente de .hfcase
    4) error explícito

    Acepta tanto la raíz del caso (la carpeta que contiene .hfcase) como una
    ruta interior desde la que se descubrirá la raíz.
    """
    candidates: list[Path] = []

    if ejplicit is not None:
        src = Path(os.fspath(ejplicit))
        candidates.append(src)

    env = os.environ.get(ENV_ROOT)
    if env:
        candidates.append(Path(env))

    if not candidates:
        cwd = Path.cwd().resolve()
        if (cwd / MARKER).is_file():
            return cwd
        return _buscar_marcador_ascendente(cwd)

    errores: list[str] = []
    for cand in candidates:
        try:
            path = Path(cand).expanduser().resolve()
        except Exception as exc:  # pragma: no cover - defensa de resolución
            errores.append(f"{cand}: no resoluble ({exc})")
            continue
        if not path.exists():
            errores.append(f"{cand}: no existe")
            continue
        if (path / MARKER).is_file():
            return path
        try:
            return _buscar_marcador_ascendente(path)
        except PortabilityError as exc:
            errores.append(str(exc))
            continue

    detalle = " | ".join(errores) if errores else "sin candidatos"
    raise PortabilityError(
        "No se pudo resolver HF_CASE_ROOT. Se intentó: argumento explícito, "
        f"variable de entorno '{ENV_ROOT}'\n y descubrimiento de '{MARKER}'.\n"
        f"Detalle: {detalle}"
    )


def ruta_interna(raiz: Path, relativa: str) -> Path:
    """
    Resuelve una ruta relativa DENTRO de la raíz del caso.
    Impide escape fuera de la raíz (permite . y subdirectorios).
    Devuelve la ruta absoluta al activo interno.
    """
    raiz_res = raiz.resolve()
    parts = [p for p in PurePath(relativa).parts if p not in (".", "")]
    target = raiz_res.joinpath(*parts)
    target_res = target.resolve()
    # Control de escape: la ruta debe quedar dentro de la raíz
    if target_res != raiz_res and not target_res.is_relative_to(raiz_res):
        raise PortabilityError(
            f"Escape de raíz bloqueado: '{relativa}' resuelve fuera de "
            f"'{raiz_res}'."
        )
    return target_res


def es_interna(relativa: str) -> bool:
    """Una ruta relativa sin prefijo absoluto/drive se considera interna."""
    if not relativa:
        raise PortabilityError("Ruta vacía no admitida.")
    p = PurePath(relativa)
    if p.is_absolute():
        return False
    if p.drive or (len(p.parts) and (p.parts[0] in ("C:", "D:", "/", "\\"))):
        return False
    return True


def sha256_archivo(path: Path) -> str:
    """SHA-256 de un archivo en hex minúsculas, en bloque de 1 MiB."""
    h = hashlib.sha256()
    with open(path, "rb") as fh:
        for bloque in iter(lambda: fh.read(1048576), b""):
            h.update(bloque)
    return h.hexdigest()


def sha256_texto(texto: str) -> str:
    """SHA-256 de un texto (UTF-8)."""
    return hashlib.sha256(texto.encode("utf-8")).hexdigest()


def leer_json(raiz: Path, relativa: str) -> dict:
    """Lee un contrato JSON interno desde la raíz del caso."""
    path = ruta_interna(raiz, relativa)
    if not path.is_file():
        raise PortabilityError(f"Contrato ausente: '{relativa}' en '{raiz}'.")
    try:
        with open(path, "r", encoding="utf-8") as fh:
            return json.load(fh)
    except json.JSONDecodeError as exc:
        raise PortabilityError(f"JSON inválido '{relativa}': {exc}")


def leer_jsonl(raiz: Path, relativa: str) -> list[dict]:
    """Lee un JSONL (una línea = un objeto JSON)."""
    path = ruta_interna(raiz, relativa)
    if not path.is_file():
        raise PortabilityError(f"JSONL ausente: '{relativa}' en '{raiz}'.")
    registros: list[dict] = []
    with open(path, "r", encoding="utf-8") as fh:
        for num, linea in enumerate(fh, start=1):
            linea = linea.strip()
            if not linea:
                continue
            try:
                registros.append(json.loads(linea))
            except json.JSONDecodeError as exc:
                raise PortabilityError(
                    f"JSONL inválido '{relativa}' línea {num}: {exc}"
                )
    return registros


def manifest_activos(raiz: Path) -> list[dict]:
    """Devuelve la lista de activos incorporados del manifest interno."""
    manifest = leer_json(raiz, "manifest.json")
    clave = "activos_incorporados"
    if clave not in manifest:
        raise PortabilityError(
            "manifest.json no contiene 'activos_incorporados' "
            "(esquema hf.manifest.v1 esperado)."
        )
    return manifest[clave]


def _hash_cuerpo(lineas: list[str]) -> str:
    """SHA-256 determinista de un cuerpo de líneas 'ruta::sha256' (UTF-8)."""
    cuerpo = "\n".join(lineas)
    return hashlib.sha256(cuerpo.encode("utf-8")).hexdigest()


def _rel_posix(rel: str) -> str:
    """Normaliza una ruta relativa a formato posix, sin prefijo './'."""
    return rel.replace("\\", "/").lstrip("./")


def _archivos_estado(raiz: Path) -> list[str]:
    """Contratos de decisión ordenados (incluye adopted-cell si existe)."""
    base = raiz.resolve()
    rels = list(CONTRATOS_ESTADO)
    for extra in CONTRATOS_ESTADO_ADICIONALES:
        if (base / _rel_posix(extra)).is_file():
            rels.append(extra)
    return sorted(rels)


def _archivos_evidencia(raiz: Path) -> list[str]:
    """Contratos de evidencia ordenados (incluye spatial/comparisons/**)."""
    base = raiz.resolve()
    rels = list(CONTRATOS_EVIDENCIA)
    comparaciones = base / "spatial" / "comparisons"
    if comparaciones.is_dir():
        for path in sorted(comparaciones.rglob("*")):
            if path.is_file():
                rels.append(path.relative_to(base).as_posix())
    return sorted(rels)


def _archivos_paquete(raiz: Path) -> list[str]:
    """Composición física del paquete sin meta ni caché/exportaciones."""
    base = raiz.resolve()
    rels: list[str] = []
    for path in sorted(base.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(base).as_posix()
        rel_low = rel.lower()
        if rel_low in META_PAQUETE:
            continue
        if rel_low.startswith("cache/") or rel_low.startswith("exports/"):
            continue
        rels.append(rel)
    return sorted(rels)


def _lineas_hash(raiz: Path, relativas: list[str]) -> list[str]:
    """Líneas 'ruta::sha256' para un conjunto de rutas relativas."""
    lineas: list[str] = []
    for rel in sorted(relativas):
        target = ruta_interna(raiz, rel)
        if not target.is_file():
            raise PortabilityError(f"Contrato de integridad ausente: '{rel}'")
        lineas.append(f"{rel}::{sha256_archivo(target)}")
    return lineas


def _proyeccion_manifest(raiz: Path) -> str:
    """SHA-256 de la proyección canónica de manifest.json.

    La proyección elimina las entradas meta (case.json, integrity.json,
    manifest.json y checksums.sha256) para no crear ciclos y conserva las
    restantes ordenadas por ruta_relativa con serialización canónica.
    """
    manifest = leer_json(raiz, "manifest.json")
    proyectados = [
        a for a in manifest.get("activos_incorporados", [])
        if _rel_posix(a.get("ruta_relativa", "")) not in ENTRADAS_MANIFEST_META
    ]
    cuerpo = "\n".join(
        json.dumps(a, sort_keys=True, ensure_ascii=False, separators=(",", ":"))
        for a in sorted(
            proyectados, key=lambda e: _rel_posix(e.get("ruta_relativa", ""))
        )
    )
    return hashlib.sha256(cuerpo.encode("utf-8")).hexdigest()


def state_hash_paquete(raiz: Path) -> str:
    """SHA-256 determinista de los contratos de decisión del paquete."""
    return _hash_cuerpo(_lineas_hash(raiz, _archivos_estado(raiz)))


def package_hash_paquete(raiz: Path) -> str:
    """SHA-256 determinista de la composición física del paquete sin meta."""
    lineas = _lineas_hash(raiz, _archivos_paquete(raiz))
    lineas.append(f"manifest.json::{_proyeccion_manifest(raiz)}")
    return _hash_cuerpo(lineas)


def evidence_hash_paquete(raiz: Path) -> str:
    """SHA-256 determinista de los contratos de evidencia."""
    return _hash_cuerpo(_lineas_hash(raiz, _archivos_evidencia(raiz)))


def estado_hash_paquete(raiz: Path) -> str:
    """Alias legacy de state_hash_paquete (OT-HF-SIG-002B)."""
    return state_hash_paquete(raiz)


def leer_integridad(raiz: Path) -> dict:
    """Lee integrity.json como contrato hf.integrity.v1."""
    doc = leer_json(raiz, "integrity.json")
    if doc.get("schema") != "hf.integrity.v1":
        raise PortabilityError("integrity.json no es hf.integrity.v1")
    return doc


def generar_integridad(raiz: Path) -> dict:
    """Reconstruye el contrato hf.integrity.v1 a partir del contenido real.

    Solo informativo: integrity.json nunca forma parte del material hasheado
    (ver META_PAQUETE). No incluye marcas de tiempo para que la regeneración
    sea byte-idéntica.
    """
    return {
        "schema": "hf.integrity.v1",
        "schema_version": "1.0",
        "hash_version": 2,
        "caso_id": "iguana_pc80",
        "descripcion": "Integridad separada del estado, del paquete y de la evidencia.",
        "hashes": {
            "state_hash": state_hash_paquete(raiz),
            "package_hash": package_hash_paquete(raiz),
            "evidence_hash": evidence_hash_paquete(raiz),
        },
        "cobertura": {
            "state": _archivos_estado(raiz),
            "evidence": _archivos_evidencia(raiz),
            "paquete_excluidos_meta": sorted(META_PAQUETE),
            "paquete_dirs_excluidos": list(DIRS_EXCLUIDOS_PAQUETE),
            "manifest_referenciado_por": "proyección canónica sin entradas meta",
        },
        "generator": (
            "02_CORE/portability/resolver.py::state_hash_paquete, "
            "package_hash_paquete, evidence_hash_paquete"
        ),
    }


def abrir_caso(ejplicit: str | os.PathLike | None = None) -> dict:
    """
    Abre el caso portable: resuelve la raíz y devuelve un resumen verificado
    de integridad (state_hash, package_hash, evidence_hash) junto con la
    identidad, gates y decisión espacial.
    """
    raiz = resolver_raiz_caso(ejplicit)
    caso = leer_json(raiz, "case.json")
    espacial = leer_json(raiz, "decision/spatial-decision.json")
    try:
        integ = leer_integridad(raiz)
        hashes_registrados = integ.get("hashes", {})
    except PortabilityError:
        hashes_registrados = {}

    return {
        "case_root": str(raiz),
        "schema": caso.get("schema"),
        "caso": caso.get("caso", {}),
        "gates": caso.get("gates", {}),
        "state_hash_registrado": caso.get("state_hash"),
        "state_hash_calculado": state_hash_paquete(raiz),
        "package_hash_registrado": hashes_registrados.get("package_hash"),
        "package_hash_calculado": package_hash_paquete(raiz),
        "evidence_hash_registrado": hashes_registrados.get("evidence_hash"),
        "evidence_hash_calculado": evidence_hash_paquete(raiz),
        "veredicto_espacial": espacial.get("verdict"),
        "adopted_cell": espacial.get("adopted_cell"),
        "proposed_cell": espacial.get("proposed_cell", {}),
    }


def verificar_hashes(raiz: Path) -> dict:
    """
    Verifica checksums.sha256 contra el contenido real del paquete.
    Devuelve {ok, coincidencias, diferencias, archivos}.
    """
    checks_path = ruta_interna(raiz, "checksums.sha256")
    if not checks_path.is_file():
        raise PortabilityError("checksums.sha256 ausente en la raíz del caso.")

    esperados: dict[str, str] = {}
    with open(checks_path, "r", encoding="utf-8") as fh:
        for num, linea in enumerate(fh, start=1):
            linea = linea.strip()
            if not linea or linea.startswith("#"):
                continue
            try:
                hak, rel = linea.split(None, 1)
            except ValueError:
                raise PortabilityError(
                    f"checksums.sha256 línea {num} mal formada: '{linea}'"
                )
            esperados[rel.strip()] = hak.lower()

    coincidencias: list[str] = []
    diferencias: list[str] = []
    base = raiz.resolve()
    for rel, hak_esperado in sorted(esperados.items()):
        target = base.joinpath(*[p for p in PurePath(rel).parts])
        if not target.is_file():
            diferencias.append(f"{rel}: AUSENTE")
            continue
        hak = sha256_archivo(target)
        if hak == hak_esperado:
            coincidencias.append(rel)
        else:
            diferencias.append(f"{rel}: {hak} != {hak_esperado}")

    return {
        "ok": not diferencias,
        "coincidencias": coincidencias,
        "diferencias": diferencias,
        "archivos": sorted(esperados.keys()),
    }


__all__ = [
    "PortabilityError",
    "resolver_raiz_caso",
    "ruta_interna",
    "es_interna",
    "sha256_archivo",
    "sha256_texto",
    "leer_json",
    "leer_jsonl",
    "manifest_activos",
    "state_hash_paquete",
    "package_hash_paquete",
    "evidence_hash_paquete",
    "estado_hash_paquete",
    "leer_integridad",
    "generar_integridad",
    "abrir_caso",
    "verificar_hashes",
    "CONTRATOS_ESTADO",
    "CONTRATOS_ESTADO_ADICIONALES",
    "CONTRATOS_EVIDENCIA",
    "META_PAQUETE",
    "DIRS_EXCLUIDOS_PAQUETE",
    "ENTRADAS_MANIFEST_META",
    "MARKER",
    "ENV_ROOT",
]