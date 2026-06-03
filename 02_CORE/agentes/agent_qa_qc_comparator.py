# -*- coding: utf-8 -*-
# ============================================================
# agent_qa_qc_comparator.py
# HidroFlow - Agente Comparador QA/QC
# ============================================================

from datetime import datetime


class AgenteQAQCComparador:
    def __init__(self):
        self.nombre = "Agente Comparador QA/QC"
        self.estado = "diseno_inicial"

        self.productos_referencia = [
            "PC_Snap_Obra_Iguana",
            "Cuenca_Obra_Iguana",
            "Red_Hidrica_Obra_Iguana",
            "Eje_Principal_Continuo_Iguana",
            "Perfil_Puntos_SEG_QC_Iguana",
            "Tramos_Geomorf_QC_Iguana",
            "Tramos_Geomorf_Lineas_QC_Iguana",
            "Parametros_Geomorf_Iguana"
        ]

        self.metricas_comparacion = [
            "area_cuenca",
            "perimetro_cuenca",
            "longitud_cauce",
            "longitud_red",
            "z_salida",
            "z_cabecera",
            "desnivel",
            "pendiente_media",
            "numero_quiebres_qc",
            "numero_tramos_qc"
        ]

    def resumen(self):
        print("========================================")
        print(self.nombre)
        print("Estado:", self.estado)
        print("Fecha:", datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
        print("----------------------------------------")
        print("Productos de referencia:")
        for producto in self.productos_referencia:
            print(" -", producto)
        print("----------------------------------------")
        print("Metricas de comparacion:")
        for metrica in self.metricas_comparacion:
            print(" -", metrica)
        print("========================================")


if __name__ == "__main__":
    agente = AgenteQAQCComparador()
    agente.resumen()
