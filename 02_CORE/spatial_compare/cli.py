# -*- coding: utf-8 -*-
"""
cli — interfaz de línea de comandos de HF-SPATIAL-COMPARE V1.

Uso:
    python -m spatial_compare.cli profiles
    python -m spatial_compare.cli run <perfil> <case_root> <question> <source> [target] [--repo-root R] [--clasificacion C]
    python -m spatial_compare.cli pilot-interno <case_root> [--repo-root R]
    python -m spatial_compare.cli pilot-territorial <case_root> [--repo-root R]
    python -m spatial_compare.cli run-limited <case_root> [--repo-root R]

Exit codes: 0 éxito; 1 error de uso; 2 error de invariantes.
"""

from __future__ import annotations

import json
import sys

from . import result as R
from .limited import registar_comparacion_limitada
from .models import (
    COMPUTATIONAL_INTERNAL_COMPARISON,
    TERRITORIAL_CONTRAST_AUDIT,
)
from .registry import listar as listar_perfiles, obtener, validar_registry
from .runner import (
    correr_comparacion,
    registar_piloto,
    repo_root,
)


def _uso_raiz(args):
    repo = repo_root()
    if "--repo-root" in args:
        repo = args[args.index("--repo-root") + 1]
    return repo


def _clasificacion_arg(args):
    if "--clasificacion" in args:
        return args[args.index("--clasificacion") + 1]
    return None


def main(argv: list[str] | None = None) -> int:
    args = list(sys.argv[1:] if argv is None else argv)
    if not args or args[0] in ("-h", "--help", "help"):
        print(__doc__)
        return 0
    comando = args[0]
    if comando == "profiles":
        errores = validar_registry()
        if errores:
            print("ERRORES DEL CATÁLOGO:", file=sys.stderr)
            for e in errores:
                print(" -", e, file=sys.stderr)
            return 1
        for p in listar_perfiles():
            print(f"{p['id']:<40} v{p['version']}  max={p['resultado_maximo'] or '-'}")
        return 0
    if comando == "run":
        if len(args) < 5:
            print("uso: run <perfil> <case_root> <question> <source> [target]", file=sys.stderr)
            return 1
        perfil, caso, question, source = args[1:5]
        target = args[5] if len(args) > 5 and not args[5].startswith("--") else None
        try:
            obtener(perfil)
        except KeyError:
            print(f"perfil desconocido: {perfil!r}", file=sys.stderr)
            return 1
        repo = _uso_raiz(args)
        clasificacion = _clasificacion_arg(args)
        res = correr_comparacion(
            perfil, caso, question, source, target, repo=repo,
            clasificacion=clasificacion,
        )
        errores = R.validar_invariantes(res)
        if errores:
            print("ERRORES DE INVARIANTE:", errores, file=sys.stderr)
            return 2
        sys.stdout.write(R.serializar_sin_firma(res))
        return 0
    if comando in ("pilot-interno", "pilot-territorial"):
        if len(args) < 2:
            print(f"uso: {comando} <case_root>", file=sys.stderr)
            return 1
        caso = args[1]
        repo = _uso_raiz(args)
        if comando == "pilot-interno":
            resumen = registar_piloto(
                "COMPARE_SEGMENT_CORRESPONDENCE_V1", caso,
                question_id="INTERNO_RED_VS_SEGMENTO_24",
                source_asset_id="red_hf_gate02_d03",
                target_asset_id="segmento_candidato_d03",
                repo=repo, clasificacion=COMPUTATIONAL_INTERNAL_COMPARISON,
                seleccion_target={"tipo": "segmento_elegido", "segmento": 24,
                                  "ventana": "interseccion_con_envelope_de_la_fuente"},
            )
        else:
            resumen = registar_piloto(
                "COMPARE_VECTOR_NETWORKS_V1", caso,
                question_id="EXTERNO_STREAMS_URBAN_1000_AUDIT",
                source_asset_id="streams_urban_1000_medellin",
                repo=repo, clasificacion=TERRITORIAL_CONTRAST_AUDIT,
            )
        print(json.dumps(resumen, ensure_ascii=False))
        return 0
    if comando == "run-limited":
        if len(args) < 2:
            print(f"uso: {comando} <case_root> [--repo-root R]", file=sys.stderr)
            return 1
        caso = args[1]
        repo = _uso_raiz(args)
        try:
            resumen = registar_comparacion_limitada(caso, repo=repo)
        except RuntimeError as e:
            print(f"ERROR DE INVARIANTES: {e}", file=sys.stderr)
            return 2
        print(json.dumps(resumen, ensure_ascii=False))
        return 0
    print(f"comando desconocido: {comando!r}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    raise SystemExit(main())