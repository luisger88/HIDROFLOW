export default function derivarTablaResumenTrDesdeQTrMultiEscenario(
  qTrMultiEscenario
) {
  const escenarios =
    qTrMultiEscenario?.escenarios ?? [];

  return escenarios.map((escenario) => {
    const hidroDiseno =
      escenario?.hidrogramas?.find(
        (h) => h?.metodo === "SCS"
      ) ?? null;

    return {
      Tr: escenario?.Tr ?? null,
      estado: hidroDiseno ? "disponible" : "No calculado",
      Q: hidroDiseno?.Qp ?? null,
      ratioVolumen:
        hidroDiseno?.volumen != null ? 1 : null
    };
  });
}
