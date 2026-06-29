import { texto, numero } from "./_utilsNarrativas";

export function generarNarrativaTc(payload = {}) {
  return `
Trazabilidad Tc:

El tiempo de concentración representa la referencia temporal del escenario evaluado.

Tc sugerido: ${numero(payload?.tiempoConcentracion?.tcSugeridoMinutos, 2)} min
Método de ponderación: ${texto(payload?.tiempoConcentracion?.metodoPonderacion)}
Métodos excluidos: ${(payload?.tiempoConcentracion?.metodosExcluidos ?? []).join(", ") || "NO DETECTADO"}
`.trim();
}
