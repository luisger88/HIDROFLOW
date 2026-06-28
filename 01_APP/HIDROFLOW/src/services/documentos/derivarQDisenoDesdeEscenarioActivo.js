export default function derivarQDisenoDesdeEscenarioActivo(
  escenarioQTrActivo,
  qTrMultiEscenario
) {
  const trActivo =
    Number(
      escenarioQTrActivo?.periodoRetornoTrAnios
    );

  const escenario =
    qTrMultiEscenario?.escenarios?.find(
      (e) => Number(e?.Tr) === trActivo
    ) ?? null;

  const hidroDiseno =
    escenario?.hidrogramas?.find(
      (h) => h?.metodo === "SCS"
    ) ?? null;

  return hidroDiseno?.Qp ?? null;
}
