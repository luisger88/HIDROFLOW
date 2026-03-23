# agents/normativo_agent.py

import json
from typing import Dict, List


class AgenteNormativo:
    """
    Agente para verificación normativa y de discurso técnico-legal.
    """

    def __init__(self, ruta_dataset: str):
        self.nombre = "Agente Normativo HidroFlow"
        self.version = "1.0"
        self.dataset = self._cargar_dataset(ruta_dataset)

    def _cargar_dataset(self, ruta: str) -> List[Dict]:
        reglas = []
        with open(ruta, "r", encoding="utf-8") as f:
            for linea in f:
                reglas.append(json.loads(linea))
        return reglas

    def evaluar(self, datos: Dict) -> Dict:
        observaciones: List[str] = []
        alertas: List[str] = []

        tipo_permiso = datos.get("tipo_permiso")
        texto = datos.get("texto_informe", {})

        justificacion = texto.get("justificacion_ambiental", "").lower()
        metodologia = texto.get("metodologia", "").lower()
        seleccion = texto.get("seleccion_caudal", "").lower()

        if tipo_permiso != "ocupacion_cauce":
            alertas.append("Tipo de permiso no corresponde a ocupación de cauce.")

        if "1541" not in justificacion and "2811" not in justificacion:
            alertas.append(
                "No se cita explícitamente Decreto 1541/78 o Decreto 2811/74."
            )
        else:
            observaciones.append(
                "Normativa base citada correctamente."
            )

        expresiones_riesgo = [
            "no genera impacto",
            "impacto nulo",
            "no afecta"
        ]
        for exp in expresiones_riesgo:
            if exp in seleccion:
                alertas.append(
                    f"Lenguaje prescriptivo detectado: '{exp}'."
                )

        if "metodo" not in metodologia:
            alertas.append(
                "La metodología no describe explícitamente los métodos."
            )
        else:
            observaciones.append(
                "Metodología descrita adecuadamente."
            )

        return {
            "agente": self.nombre,
            "version": self.version,
            "cumple": not bool(alertas),
            "observaciones": observaciones,
            "alertas": alertas
        }
