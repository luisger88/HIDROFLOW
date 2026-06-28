const texto = (v) =>
  v === undefined || v === null || v === ""
    ? "NO DETECTADO"
    : String(v);

export function generarResumenEjecutivo(
  payload = {}
) {

  const cuenca =
    payload?.cuenca ?? {};

  const lluvia =
    payload?.lluviaYAbstraccion ?? {};

  const qtr =
    payload?.escenarioQTrActivo ?? {};

  const consistencia =
    payload?.controlConsistencia ?? {};

  const ratio =
    Number.isFinite(
      Number(
        consistencia?.ratioVolumetrico
      )
    )
      ? Number(
          consistencia?.ratioVolumetrico
        ).toFixed(6)
      : "NO DETECTADO";

  return `
RESUMEN EJECUTIVO

La cuenca ${texto(cuenca?.nombre).replace(/^Cuenca\s+/i, "")} fue evaluada utilizando la estación IDF ${texto(lluvia?.estacionActiva)}.

La condición AMC adoptada corresponde a ${texto(lluvia?.condicionAMC)} y el CN efectivo utilizado por el motor hidrológico corresponde a ${texto(lluvia?.cnEfectivo)}.

El escenario activo evaluado corresponde a Tr=${texto(qtr?.periodoRetornoTrAnios)} años.

La relación volumétrica obtenida es ${ratio}, indicando coherencia entre el volumen esperado de escorrentía y el volumen integrado por el hidrograma.

Estado general: ${texto(consistencia?.estadoConsistencia)}.
  `.trim();

}
