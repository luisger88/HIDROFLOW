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


def _calcula_estado_hash(raiz: Path, excluidos: set[str]) -> str:
    """
    estado_hash determinista sobre los archivos de estado del paquete:
    para cada archivo pequeño del paquete (recursivo, positivo), ordenado por
    ruta con '/', concatena 'ruta::sha256\\n'. Excluye los archivos que
    generan auto-referencia (case.json, manifest.json, checksums.sha256,
    caché y exportaciones).
    """
    lineas: list[str] = []
    base = raiz.resolve()
    for path in sorted(base.rglob("*")):
        if not path.is_file():
            continue
        rel = path.relative_to(base).as_posix()
        rel_low = rel.lower()
        if rel_low in excluidos:
            continue
        if rel_low.startswith("cache/") or rel_low.startswith("exports/"):
            continue
        hak = sha256_archivo(path)
        lineas.append(f"{rel}::{hak}")
    cuerpo = "\n".join(lineas)
    return hashlib.sha256(cuerpo.encode("utf-8")).hexdigest()


def estado_hash_paquete(raiz: Path) -> str:
    """Calcula el estado_hash del paquete (misma regla que case.json)."""
    excluidos = {"case.json", "manifest.json", "checksums.sha256"}
    return _calcula_estado_hash(raiz, excluidos)


def abrir_caso(ejplicit: str | os.PathLike | None = None) -> dict:
    """
    Abre el caso portable: resuelve la raíz, lee case.json y devuelve un
    resumen verificado (identidad, gates, decisión espacial).
    """
    raiz = resolver_raiz_caso(ejplicit)
    caso = leer_json(raiz, "case.json")
    espacial = leer_json(raiz, "decision/spatial-decision.json")

    resumen = {
        "case_root": str(raiz),
        "schema": caso.get("schema"),
        "caso": caso.get("caso", {}),
        "gates": caso.get("gates", {}),
        "estado_hash_registrado": caso.get("estado_hash"),
        "estado_hash_calculado": estado_hash_paquete(raiz),
        "veredicto_espacial": espacial.get("verdict"),
        "adopted_cell": espacial.get("adopted_cell"),
        "proposed_cell": espacial.get("proposed_cell", {}),
    }
    return resumen


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
    "estado_hash_paquete",
    "abrir_caso",
    "verificar_hashes",
    "MARKER",
    "ENV_ROOT",
]