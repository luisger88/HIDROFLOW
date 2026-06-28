const texto = (v) =>
  v === undefined || v === null || v === ""
    ? "NO DETECTADO"
    : String(v);

export function generarNarrativaIDF(
  payload = {}
) {

  const lluvia =
    payload?.lluviaYAbstraccion ?? {};

  const estacion =
    lluvia?.estacionActiva;

  const k =
    lluvia?.parametrosIDF?.k;

  const n =
    lluvia?.parametrosIDF?.n;

  const c =
    lluvia?.parametrosIDF?.c;

  return `
Trazabilidad IDF:

La estación IDF adoptada para el análisis corresponde a ${texto(estacion)}.

Los parámetros k=${texto(k)}, n=${texto(n)} y c=${texto(c)} describen la relación intensidad-duración-frecuencia utilizada por el motor hidrológico.

Estos parámetros permiten estimar las intensidades de precipitación asociadas a los distintos periodos de retorno evaluados.

Las intensidades calculadas se utilizan para construir el hietograma de diseño, obtener la lluvia efectiva (Pe) y generar la respuesta hidrológica Q(t) de la cuenca.
  `.trim();

}
