import { texto, numero } from "./_utilsNarrativas";

export function generarNarrativaCN(payload = {}) {
  return `
Narrativa CN:

El bloque CN documenta la transformación lluvia–escorrentía usada para el escenario evaluado.

CN base: ${texto(payload?.lluviaYAbstraccion?.cnBase)}
CN ajustado: ${texto(payload?.lluviaYAbstraccion?.cnAjustado)}
CN efectivo: ${texto(payload?.lluviaYAbstraccion?.cnEfectivo)}
Pe total: ${numero(payload?.lluviaYAbstraccion?.peTotalMm, 2)} mm
`.trim();
}
