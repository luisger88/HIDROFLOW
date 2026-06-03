# -*- coding: utf-8 -*-
# ============================================================
# agent_limpieza_trazabilidad.py
# HidroFlow - Agente Limpieza y Trazabilidad
# ============================================================

class AgenteLimpiezaTrazabilidad:
    def __init__(self):
        self.nombre = "Agente Limpieza y Trazabilidad"

        self.productos_protegidos_modulo1 = [
            "PC_Obra_Iguana",
            "PC_Snap_Obra_Iguana",
            "Cuenca_R_Obra_Iguana",
            "Cuenca_Obra_Iguana",
            "Red_Hidrica_Obra_Iguana",
            "Red_Candidata_Z_Iguana",
            "Cabecera_Candidata_Iguana",
            "Eje_Principal_Continuo_Iguana",
            "Perfil_Puntos_SEG_QC_Iguana",
            "Tramos_Geomorf_QC_Iguana",
            "Tramos_Geomorf_Lineas_QC_Iguana",
            "Parametros_Geomorf_Iguana"
        ]

        self.patrones_temporales = [
            "tmp",
            "clean",
            "lyr",
            "scratch",
            "Watersh_Flow",
            "StreamPts_Base_tmp",
            "Buffer_Obra_tmp",
            "StreamPts_Local_tmp"
        ]

    def resumen(self):
        print("========================================")
        print(self.nombre)
        print("----------------------------------------")
        print("Productos protegidos Modulo 1:")
        for p in self.productos_protegidos_modulo1:
            print(" -", p)
        print("----------------------------------------")
        print("Patrones temporales:")
        for p in self.patrones_temporales:
            print(" -", p)
        print("========================================")


if __name__ == "__main__":
    agente = AgenteLimpiezaTrazabilidad()
    agente.resumen()
