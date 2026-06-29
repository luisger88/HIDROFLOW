import { texto, numero } from "./_utilsNarrativas";

export function generarResumenEjecutivo(payload = {}) {
  return `
Resumen ejecutivo:

El expediente consolida la información hidrológica exportable del escenario evaluado, incluyendo identificación, lluvia y abstracción, tiempo de concentración, escenario Q-Tr activo, hidrografía Q-5, contraste racional, consistencia volumétrica y lectura de cierre.

Cuenca: ${texto(payload?.identificacion?.nombreCuenca)}
Área: ${numero(payload?.identificacion?.areaKm2, 4)} km²
Tr activo: ${numero(payload?.escenarioQTrActivo?.periodoRetornoTrAnios, 0)} años
Q-Tr: ${numero(payload?.escenarioQTrActivo?.caudalDisenoM3s, 2)} m³/s
Tc sugerido: ${numero(payload?.tiempoConcentracion?.tcSugeridoMinutos, 2)} min
`.trim();
}
