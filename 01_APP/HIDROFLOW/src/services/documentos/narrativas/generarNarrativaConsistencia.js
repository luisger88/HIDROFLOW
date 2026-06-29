import { texto, numero } from "./_utilsNarrativas";

export function generarNarrativaConsistencia(payload = {}) {
  return `
Narrativa de consistencia:

El control de consistencia compara el volumen esperado Pe × Área con el volumen integrado del hidrograma Q-5.

Volumen esperado: ${numero(payload?.controlConsistencia?.volumenEsperadoTeoricoM3, 2)} m³
Volumen integrado Q-5: ${numero(payload?.controlConsistencia?.volumenIntegradoQ5M3, 2)} m³
Estado: ${texto(payload?.controlConsistencia?.estadoConsistencia)}
`.trim();
}
