# -*- coding: utf-8 -*-
"""
Regeneración determinista del contrato de integridad triple (OT-HF-SIG-002B).

Actualiza HF_CASE/<caso>:
  - integrity.json            hf.integrity.v1 (state/package/evidence)
  - manifest.json              entradas restrictions-json e integrity-json,
                               hash/tamano actualizado de case.json,
                               activadores.reference_hash
  - checksums.sha256           regenerado (todos los archivos salvo sí mismo)

Convención anti-ciclos: package_hash nunca incluye case.json, integrity.json,
manifest.json (crudo) ni checksums.sha256; el manifest participa vía su
proyección canónica (sin entradas meta).

Uso:
  python generar_integridad.py [ruta_al_caso]
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from resolver import (
    PortabilityError,
    evidence_hash_paquete,
    generar_integridad,
    package_hash_paquete,
    resolver_raiz_caso,
    sha256_archivo,
    state_hash_paquete,
)

ENDR = {
    "id": "restrictions-json",
    "clase": "A_CANONICO",
    "formato": "JSON",
    "ruta_relativa": "decision/restrictions.json",
    "hash": None,
    "tamano_bytes": 0,
    "fuente": "OT-HF-SIG-002B",
    "autoridad": "Ingeniero Digital (Big Pickle)",
    "portabilidad": "internal",
    "regenerabilidad": "inmutable",
    "estado": "vigente",
    "restricciones": [
        "contrato hf.restrictions.v1; consolida restricciones del caso"
    ],
}

ENINT = {
    "id": "integrity-json",
    "clase": "A_CANONICO",
    "formato": "JSON",
    "ruta_relativa": "integrity.json",
    "hash": None,
    "tamano_bytes": 0,
    "fuente": "OT-HF-SIG-002B",
    "autoridad": "Ingeniero Digital (Big Pickle)",
    "portabilidad": "internal",
    "regenerabilidad": "inmutable",
    "estado": "vigente",
    "restricciones": [
        "contrato hf.integrity.v1; state/package/evidence hashes"
    ],
}


def _hash_y_tamano(path: Path) -> tuple[str, int]:
    return sha256_archivo(path), path.stat().st_size


def _escribir_json(path: Path, doc: dict) -> None:
    path.write_text(
        json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


def _insertar_despues_de(
    lista: list[dict], nuevo: dict, id_referencia: str
) -> None:
    for i, entrada in enumerate(lista):
        if entrada.get("id") == id_referencia:
            lista.insert(i + 1, nuevo)
            return
    lista.append(nuevo)


def _reconciliar_incorporados(raiz: Path, incorporados: list[dict]) -> None:
    """Actualiza hash y tamano de cada activo incorporado presente en disco
    (excepto las entradas self-referenciales manifest.json y checksums)."""
    for entrada in incorporados:
        if entrada.get("hash") == "self":
            continue
        rel_path = str(entrada.get("ruta_relativa") or "")
        if not rel_path:
            continue
        target = raiz.joinpath(rel_path.replace("/", "\\"))
        if target.is_file():
            entrada["hash"], entrada["tamano_bytes"] = _hash_y_tamano(target)


def main(argv: list[str] | None = None) -> int:
    argv = argv if argv is not None else sys.argv[1:]
    try:
        raiz = resolver_raiz_caso(argv[0] if argv else None)
    except PortabilityError as exc:
        print(f"FAIL: {exc}")
        return 1

    manifest_path = raiz / "manifest.json"
    manifest = json.loads(manifest_path.read_text("utf-8"))
    incorporados: list[dict] = manifest.get("activos_incorporados", [])
    manifest["activadores"]["reference_hash"] = "state_hash en case.json"

    # Phase 1: manifest con todas las entradas reconciliadas contra disco,
    # salvo integrity-json (aún ausente) y las self-referenciales.
    if not any(e.get("id") == "restrictions-json" for e in incorporados):
        _insertar_despues_de(incorporados, dict(ENDR), "spatial-decision")
    _reconciliar_incorporados(raiz, incorporados)
    _escribir_json(manifest_path, manifest)

    # Integridad con el manifest ya consolidado (integrity.json aún ausente;
    # su entrada se añade en fase 2 pero queda excluida de la proyección).
    state = state_hash_paquete(raiz)
    paquete = package_hash_paquete(raiz)
    evidencia = evidence_hash_paquete(raiz)
    integ = generar_integridad(raiz)
    if (
        integ["hashes"]["state_hash"] != state
        or integ["hashes"]["package_hash"] != paquete
        or integ["hashes"]["evidence_hash"] != evidencia
    ):
        print("FAIL: generar_integridad difiere del cálculo directo")
        return 1

    _escribir_json(raiz / "integrity.json", integ)
    h_i, t_i = _hash_y_tamano(raiz / "integrity.json")

    # Phase 2: añade la entrada integrity-json (excluida de la proyección →
    # package_hash invariante).
    manifest = json.loads(manifest_path.read_text("utf-8"))
    incorporados = manifest.get("activos_incorporados", [])
    if not any(e.get("id") == "integrity-json" for e in incorporados):
        _insertar_despues_de(incorporados, dict(ENINT), "manifest-json")
    for entrada in incorporados:
        if entrada.get("id") == "integrity-json":
            entrada["hash"] = h_i
            entrada["tamano_bytes"] = t_i
    _escribir_json(manifest_path, manifest)

    if package_hash_paquete(raiz) != paquete:
        print("FAIL: package_hash cambió tras registrar integrity.json")
        return 1

    # checksums.sha256 regenerado (rutas relativas con '/'; nunca se hashea a
    # sí mismo; las entradas meta del manifest no se declaran como hash real).
    lineas = []
    for path in sorted(raiz.rglob("*")):
        if not path.is_file() or path.name == "checksums.sha256":
            continue
        rel = path.relative_to(raiz).as_posix()
        lineas.append(f"{sha256_archivo(path)}  {rel}")
    (raiz / "checksums.sha256").write_text(
        "\n".join(lineas) + "\n", encoding="utf-8"
    )

    print(f"Caso: {raiz}")
    print(f"state_hash    {state}")
    print(f"package_hash  {paquete}")
    print(f"evidence_hash {evidencia}")
    print("checksums.sha256 regenerado:")
    print(f"  integrity.json       {h_i}")
    return 0


if __name__ == "__main__":
    sys.exit(main())