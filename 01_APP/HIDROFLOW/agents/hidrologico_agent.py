# Agent: Hidrología – verificador de coherencia (HidroFlow)
# agents/hidrologico_agent.py

from typing import Dict, List


class AgenteHidrologico:
    """
    Agente técnico para verificación de coherencia hidrológica.
    NO recalcula, NO modifica parámetros.
    """

    def __init__(self):
        self.nombre = "Agente Hidrológico HidroFlow"
        self.version = "1.0"

    def evaluar(self, datos: Dict) -> Dict:
        mensajes: List[str] = []
        alertas: List[str] = []

        cuenca = datos.get("parametros_cuenca", {})
        lluvia = datos.get("lluvia", {})
        perdidas = datos.get("perdidas", {})
        caudales = datos.get("caudales", {})

        pendiente = cuenca.get("pendiente_media")
        tc = lluvia.get("tc_min")
        hietograma = lluvia.get("hietograma", [])
        C = perdidas.get("C_racional")
        CN = perdidas.get("CN")
        AMC = perdidas.get("AMC")
        Q_sel = caudales.get("Q_seleccionado")
        Q_tr = caudales.get("Q_por_TR", {})

        if pendiente is not None and tc is not None:
            if pendiente > 20 and tc > 120:
                alertas.append(
                    "Pendiente alta con tiempo de concentración elevado: revisar coherencia morfométrica."
                )
            else:
                mensajes.append(
                    "El tiempo de concentración es coherente con la pendiente media."
                )

        if C is not None and CN is not None:
            C_cn_aprox = CN / 100
            if AMC == "AMC-III" and C < (0.7 * C_cn_aprox):
                alertas.append(
                    "El coeficiente C es bajo frente al CN en condición AMC-III."
                )
            else:
                mensajes.append(
                    "El coeficiente de escorrentía es coherente frente al CN."
                )

        if hietograma and tc is not None:
            if tc < (0.5 * len(hietograma)):
                alertas.append(
                    "Duración del hietograma supera ampliamente el Tc."
                )
            else:
                mensajes.append(
                    "Distribución temporal de la lluvia coherente con Tc."
                )

        if Q_sel is not None and Q_tr:
            q_vals = list(Q_tr.values())
            if Q_sel < min(q_vals) or Q_sel > max(q_vals):
                alertas.append(
                    "Caudal seleccionado fuera del rango de métodos."
                )
            else:
                mensajes.append(
                    "Caudal seleccionado dentro del rango esperado."
                )

        estado = "advertencia" if alertas else "coherente"

        return {
            "agente": self.nombre,
            "version": self.version,
            "estado": estado,
            "mensajes": mensajes,
            "alertas": alertas
        }