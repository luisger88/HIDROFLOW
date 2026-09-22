# -*- coding: utf-8 -*-
"""
cli — interfaz de línea de comandos del motor spatial_source.

Uso:
  python -m spatial_source.cli evaluar   [--fuente RUTA] [--root CASO] [--json]
  python -m spatial_source.cli registrar [--fuente RUTA] [--root CASO] [--json]
"""

from __future__ import annotations

import argparse
import json
import sys

from .deps import instalar_core
from .runner import evaluar, registrar

_INSTALADO = False


def _instalar() -> None:
    global _INSTALADO  # noqa: PLW0603
    if not _INSTALADO:
        instalar_core()
        _INSTALADO = True


def main(argv: list[str] | None = None) -> int:
    argv = argv if argv is not None else sys.argv[1:]
    _instalar()
    parser = argparse.ArgumentParser(prog="spatial_source")
    sub = parser.add_subparsers(dest="comando", required=True)

    p_eval = sub.add_parser("evaluar", help="evalúa la fuente sin persistir")
    p_eval.add_argument("--fuente", default=None, help="ruta de la fuente (absoluta o relativa al repo)")
    p_eval.add_argument("--root", default=None, help="raíz del caso portable")
    p_eval.add_argument("--json", action="store_true", help="salida JSON")

    p_reg = sub.add_parser("registrar", help="evalúa y persiste assessment + post-assessment")
    p_reg.add_argument("--fuente", default=None, help="ruta de la fuente")
    p_reg.add_argument("--root", default=None, help="raíz del caso portable")
    p_reg.add_argument("--sin-integridad", action="store_true", help="no regenerar la integridad")
    p_reg.add_argument("--json", action="store_true", help="salida JSON")

    args = parser.parse_args(argv)

    if args.comando == "evaluar":
        from .result import serializar_sin_firma  # noqa: PLC0415
        from .runner import resumen  # noqa: PLC0415

        res = evaluar(ruta_fuente=args.fuente, caso_raiz=args.root)
        if args.json:
            sys.stdout.write(serializar_sin_firma(res))
            return 0
        print(json.dumps(resumen(res), ensure_ascii=False, indent=2))
        return 0

    from datetime import datetime, timezone  # noqa: PLC0415

    resultado = registrar(
        ruta_fuente=args.fuente, caso_raiz=args.root, regenerar=not args.sin_integridad
    )
    if args.json:
        print(json.dumps(resultado, ensure_ascii=False, indent=2))
        return 0
    for k, v in resultado.items():
        print(f"{k}: {v}")
    print("fecha_utc:", datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))
    return 0


if __name__ == "__main__":
    sys.exit(main())