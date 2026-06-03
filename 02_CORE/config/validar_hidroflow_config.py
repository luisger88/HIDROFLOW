# -*- coding: utf-8 -*-
# ============================================================
# validar_hidroflow_config.py
# Validador fisico de rutas HidroFlow
# ============================================================

from pathlib import Path
from hidroflow_config import cargar_config


def validar_ruta(nombre, valor):
    if valor is None:
        return "SIN_VALOR"

    p = Path(valor)

    if p.exists():
        if p.is_dir():
            return "OK_DIR"
        if p.is_file():
            return "OK_FILE"
        return "OK_EXISTE"

    return "NO_EXISTE"


def main():
    config = cargar_config()

    claves_ruta = [
        "raiz_hidroflow",
        "repositorio_app_nuevo",
        "repositorio_app_original",
        "modelo_terreno_actual",
        "gdb_oficial_actual",
        "scripts_actuales",
        "scripts_modulo1_nuevo",
        "exportaciones_actuales_iguana",
        "exportaciones_nuevas_iguana",
        "toolbox_actual_sugerida",
        "toolbox_nueva_sugerida",
        "modulo1_run_actual",
        "modulo1_run_nuevo",
    ]

    print("========================================")
    print("VALIDACION HIDROFLOW CONFIG")
    print("========================================")

    total = 0
    ok = 0
    faltan = 0

    for clave in claves_ruta:
        valor = config.get(clave)
        estado = validar_ruta(clave, valor)

        total += 1

        if estado.startswith("OK"):
            ok += 1
        elif estado == "NO_EXISTE":
            faltan += 1

        print(clave)
        print("  ruta:", valor)
        print("  estado:", estado)
        print("----------------------------------------")

    print("========================================")
    print("RESUMEN")
    print("Total rutas:", total)
    print("OK:", ok)
    print("No existen:", faltan)
    print("========================================")


if __name__ == "__main__":
    main()