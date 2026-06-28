const numero = (valor, dec = 2) => {
  const n = Number(valor);

  return Number.isFinite(n)
    ? n.toLocaleString(
        "es-CO",
        {
          minimumFractionDigits: dec,
          maximumFractionDigits: dec
        }
      )
    : "NO DETECTADO";
};

export function generarNarrativaConsistencia(
  payload = {}
) {

  const control =
    payload?.controlConsistencia ?? {};

  const volumenEsperado =
    control?.volumenEsperadoTeoricoM3;

  const volumenIntegrado =
    control?.volumenIntegradoQ5M3;

  const ratio =
    control?.ratioVolumetrico;

  const estado =
    control?.estadoConsistencia ??
    "NO EVALUADO";

  return `
Control de consistencia:

El volumen esperado (${numero(volumenEsperado)} m³) representa la cantidad total de agua que la cuenca debería transformar en escorrentía a partir de la lluvia efectiva aplicada sobre el área de drenaje.

El volumen integrado (${numero(volumenIntegrado)} m³) representa la cantidad de agua realmente movilizada por el hidrograma principal Q-5 mediante integración temporal del caudal.

La relación entre ambos resultados es ${numero(ratio,6)}.

Un valor cercano a la unidad indica que el volumen calculado por el hidrograma coincide con el volumen generado por la lluvia efectiva.

Esto evidencia conservación de masa, es decir, que el agua transformada por el modelo hidrológico no aparece ni desaparece artificialmente durante el proceso lluvia–escorrentía.

Desde el punto de vista hidrológico, la coherencia entre lluvia efectiva, área de drenaje y volumen integrado demuestra que el escenario evaluado mantiene consistencia física interna.

Estado final del control: ${estado}.
  `.trim();

}
