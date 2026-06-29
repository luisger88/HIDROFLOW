import { texto } from "./_utilsNarrativas";

export function generarNarrativaIDF(payload = {}) {
  return `
Narrativa IDF:

La lluvia de diseño se documenta mediante la estación IDF, el método adoptado y los parámetros disponibles.

Estación IDF: ${texto(payload?.lluviaYAbstraccion?.estacionIDF)}
Método IDF: ${texto(payload?.lluviaYAbstraccion?.metodoIDF)}
Parámetro k: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.k)}
Parámetro n: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.n)}
Parámetro c: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.c)}
`.trim();
}
