# -*- coding: utf-8 -*-
# ============================================================
# hidroflow_config.py
# Lector de configuracion centralizada de HidroFlow
# ============================================================

import json
from pathlib import Path

CONFIG_PATH = Path(r"D:\HIDROFLOW\02_CORE\config\hidroflow_paths.json")


def cargar_config():
    if not CONFIG_PATH.exists():
        raise FileNotFoundError(
            f"No existe archivo de configuracion: {CONFIG_PATH}"
        )

    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def ruta(clave):
    config = cargar_config()

    if clave not in config:
        raise KeyError(
            f"No existe la clave en configuracion: {clave}"
        )

    return config[clave]


def mostrar_resumen():
    config = cargar_config()

    print("========================================")
    print("HIDROFLOW CONFIG")
    print("========================================")
    print("Raiz:", config.get("raiz_hidroflow"))
    print("GDB oficial:", config.get("gdb_oficial_actual"))
    print("Run actual:", config.get("modulo1_run_actual"))
    print("Run nuevo:", config.get("modulo1_run_nuevo"))
    print("Modo:", config.get("modo"))
    print("========================================")


if __name__ == "__main__":
    mostrar_resumen()