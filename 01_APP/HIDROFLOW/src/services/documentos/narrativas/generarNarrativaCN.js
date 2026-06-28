
const texto = (v) =>
  v === undefined || v === null || v === ""
    ? "NO DETECTADO"
    : String(v);

export function generarNarrativaCN(
  payload = {}
) {

  const lluvia =
    payload?.lluviaYAbstraccion ?? {};

  const cnBase =
    lluvia?.cnBase;

  const cnAjustado =
    lluvia?.cnAjustado;

  const cnEfectivo =
    lluvia?.cnEfectivo;

  const amc =
    lluvia?.condicionAMC;

  return `
Trazabilidad CN:

El Número de Curva (CN) representa la capacidad de la cuenca para transformar lluvia en escorrentía.

El CN base adoptado corresponde a ${texto(cnBase)}.

La condición de humedad antecedente (AMC) evaluada para el evento corresponde a ${texto(amc)}.

Después del ajuste por humedad antecedente se obtiene un CN ajustado de ${texto(cnAjustado)}.

El CN efectivo utilizado por el motor hidrológico corresponde a ${texto(cnEfectivo)}.

El CN efectivo es el valor empleado para calcular la lluvia efectiva (Pe) y posteriormente la respuesta hidrológica Q(t) de la cuenca.
  `.trim();

}
