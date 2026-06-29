import { texto, numero } from "./_utilsNarrativas";

export function generarNarrativaQTr(payload = {}) {
  return `
Narrativa Q-Tr:

El escenario Q-Tr activo documenta el periodo de retorno y el caudal de diseño adoptado para la lectura del expediente.

Tr activo: ${numero(payload?.escenarioQTrActivo?.periodoRetornoTrAnios, 0)} años
Estado: ${texto(payload?.escenarioQTrActivo?.estado)}
Q-Tr: ${numero(payload?.escenarioQTrActivo?.caudalDisenoM3s, 2)} m³/s
`.trim();
}
