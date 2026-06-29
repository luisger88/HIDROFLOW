import { texto, numero } from "./_utilsNarrativas";

export function generarNarrativaQ5(payload = {}) {
  return `
Narrativa Q-5:

La hidrografía principal Q-5 resume magnitud, temporalidad y volumen integrado del hidrograma principal.

Método principal: ${texto(payload?.hidrografiaQ5?.metodoPrincipal)}
Qp: ${numero(payload?.hidrografiaQ5?.caudalPicoM3s, 2)} m³/s
Tp: ${numero(payload?.hidrografiaQ5?.tiempoPicoMinutos, 0)} min
Volumen integrado: ${numero(payload?.hidrografiaQ5?.volumenIntegradoM3, 2)} m³
`.trim();
}
