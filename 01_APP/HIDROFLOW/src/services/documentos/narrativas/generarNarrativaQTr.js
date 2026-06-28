const texto = (v) =>
  v === undefined || v === null || v === ""
    ? "NO DETECTADO"
    : String(v);

const numero = (v, decimales = 2) => {
  const n = Number(v);

  return Number.isFinite(n)
    ? n.toLocaleString(
        "es-CO",
        {
          maximumFractionDigits: decimales
        }
      )
    : "NO DETECTADO";
};

export function generarNarrativaQTr(
  payload = {}
) {

  const qtr =
    payload?.escenarioQTrActivo ?? {};

  return `
Trazabilidad Q-Tr:

El periodo de retorno (Tr) representa la frecuencia estadística asociada al evento hidrológico evaluado.

El escenario actualmente activo corresponde a Tr=${texto(qtr?.periodoRetornoTrAnios)} años.

Para este escenario se adopta un caudal de diseño de ${numero(qtr?.caudalDisenoM3s, 2)} m³/s.

Este caudal constituye la referencia hidrológica utilizada para el dimensionamiento y evaluación del escenario analizado.

El estado reportado para el escenario corresponde a ${texto(qtr?.estado)}.
  `.trim();

}
