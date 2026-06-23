export function construirQTrMultiEscenario({
  TR_LIST,
  est,
  CNact,
  dtMin,
  tcSugeridoMinutos,
  unidadesHidrologicas,
  calcHietograma,
  calcLluviaEfectiva,
  calcHidroCompleto
}) {

  const escenarios = TR_LIST.map((Tr) => {

    const hiet = calcHietograma(
      est,
      Tr,
      3,
      dtMin,
      "EPM_Q1"
    );

    const lluviaEfectiva = calcLluviaEfectiva(
      hiet,
      CNact
    );

    const lluviaEfectivaTotalMm =
      lluviaEfectiva.reduce(
        (s, r) => s + (r.PeIncrem || 0),
        0
      );

    const hidrogramas =
      unidadesHidrologicas.map((HU) => {

        const H = calcHidroCompleto(
          lluviaEfectiva,
          HU,
          dtMin
        );

        return {
          metodo: H.metodo,
          Qp: H.Qpico,
          Tp: H.tPico,
          volumen: H.volTotal
        };
      });

    return {
      Tr,
      Ptotal: hiet?.Ptotal ?? null,
      lluviaEfectivaTotalMm:
        +lluviaEfectivaTotalMm.toFixed(4),
      hidrogramas
    };
  });

  return {
    version: "OT-0344",
    tcSugeridoMinutos,
    escenarios
  };
}