# -*- coding: utf-8 -*-
# ============================================================
# agent_configuracion_hidroflow.py
# HidroFlow - Agente Configuracion
# ============================================================

import sys
from pathlib import Path

CONFIG_DIR = Path(r"D:\HIDROFLOW\02_CORE\config")
sys.path.append(str(CONFIG_DIR))

from hidroflow_config import cargar_config


class AgenteConfiguracionHidroFlow:
    def __init__(self):
        self.nombre = "Agente Configuracion HidroFlow"
        self.config = cargar_config()

    def validar_claves_basicas(self):
        claves = [
            "raiz_hidroflow",
            "gdb_oficial_actual",
            "modulo1_run_actual",
            "modulo1_run_nuevo",
            "toolbox_nueva_sugerida"
        ]

        print("========================================")
        print(self.nombre)
        print("Validacion de claves basicas")
        print("----------------------------------------")

        for clave in claves:
            valor = self.config.get(clave)
            existe = Path(valor).exists() if valor else False
            print(clave, "->", valor, "| existe:", existe)

        print("========================================")


if __name__ == "__main__":
    agente = AgenteConfiguracionHidroFlow()
    agente.validar_claves_basicas()
