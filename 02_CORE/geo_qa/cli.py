# -*- coding: utf-8 -*-
"""
cli — interfaz de línea de comandos de HF-GEO-QA V1.

Uso:
    python -m geo_qa.cli profiles
    python -m geo_qa.cli verify <perfil> <case_root> <asset_id> [--repo-root R]
    python -m geo_qa.cli run-all <case_root> [--repo-root R]
    python -m geo_qa.cli pilot <case_root> <A|B|C|D> [--repo-root R]

Exit codes: 0 éxito; 1 error de uso; 2 QA con resultado FAIL/FAIL_ORIENTATION.
"""

from __future__ import annotations

import json
import sys

from . import __version__
from . import result as R
from .registry import listar as listar_perfiles, PERFIL_IDS_ESPERADOS
from .runner import correr_perfil, registar_piloto, repo_root as _repo_root

PILOTOS = {
    "A": {"perfil": "spatial_reference", "asset_id": "project-location"},
    "B": {"perfil": "cartographic_evidence", "asset_id": "manifiesto_gate02", "decl": True},
    "C": {"perfil": "network_internal", "asset_id": "red_hf_gate02_d03"},
    "D": {"perfil": "gate02_diagnostic", "asset_id": "caso_iguana_pc80"},
}

_DECL_B = {
    "north_arrow_present": True,
    "north_arrow_verified": True,
    "north_arrow_direction": "south",
    "map_north_direction": "north",
    "estado": "MANIFIESTO_E2",
}


def _uso_raiz(args):
    repo = _repo_root()
    if "--repo-root" in args:
        repo = args[args.index("--repo-root") + 1]
    return repo


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    if not args or args[0] in ("-h", "--help", "help"):
        print(__doc__)
        return 0
    comando = args[0]
    if comando == "profiles":
        for p in listar_perfiles():
            print(
                f"{p['id']:<24} v{p['version']}  max={p['resultado_maximo']:<24}  checks={len(p['checks_obligatorios'])}"
            )
        return 0
    if comando == "verify":
        if len(args) < 4:
            print("uso: verify <perfil> <case_root> <asset_id>", file=sys.stderr)
            return 1
        perfil, caso, asset = args[1], args[2], args[3]
        if perfil not in PERFIL_IDS_ESPERADOS:
            print(f"perfil desconocido: {perfil!r}", file=sys.stderr)
            return 1
        qa = correr_perfil(perfil, caso, asset, repo=_uso_raiz(args))
        errores = R.validar_invariantes(qa)
        if errores:
            print("ERRORES DE INVARIANTE:", errores, file=sys.stderr)
            return 1
        sys.stdout.write(R.serializar_qa_sin_firma(qa))
        return 2 if qa.resultado in ("FAIL", "FAIL_ORIENTATION") else 0
    if comando == "run-all":
        if len(args) < 2:
            print("uso: run-all <case_root>", file=sys.stderr)
            return 1
        caso = args[1]
        repo = _uso_raiz(args)
        for letra in ("A", "B", "C", "D"):
            desc = PILOTOS[letra]
            qa = correr_perfil(
                desc["perfil"],
                caso,
                desc["asset_id"],
                repo=repo,
                decl=_DECL_B if desc.get("decl") else None,
            )
            sys.stdout.write(R.serializar_qa_sin_firma(qa))
        return 0
    if comando == "pilot":
        if len(args) < 3:
            print("uso: pilot <case_root> <A|B|C|D>", file=sys.stderr)
            return 1
        caso, letra = args[1], args[2].upper()
        if letra not in PILOTOS:
            print(f"piloto desconocido: {letra!r} (A-D)", file=sys.stderr)
            return 1
        desc = PILOTOS[letra]
        repo = _uso_raiz(args)
        resumen = registar_piloto(
            desc["perfil"],
            caso,
            desc["asset_id"],
            repo=repo,
            decl=_DECL_B if desc.get("decl") else None,
        )
        print(json.dumps(resumen, ensure_ascii=False))
        return 0
    print(f"comando desconocido: {comando!r}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())