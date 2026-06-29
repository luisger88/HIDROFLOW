function numero(valor, decimales = 2) {
  const n = Number(valor);
  return Number.isFinite(n)
    ? n.toLocaleString("es-CO", { maximumFractionDigits: decimales })
    : "—";
}

function obtenerEscenarios(entrada = {}) {
  if (Array.isArray(entrada)) return entrada;

  return (
    entrada?.escenarios ??
    entrada?.qTrMultiEscenario?.escenarios ??
    entrada?.q_tr_multiescenario?.escenarios ??
    entrada?.escenarioQTrMulti?.escenarios ??
    entrada?.qtrMultiEscenario?.escenarios ??
    []
  );
}

function obtenerTr(e = {}) {
  return (
    e?.Tr ??
    e?.tr ??
    e?.periodoRetornoTrAnios ??
    e?.periodo_retorno ??
    e?.periodoRetorno ??
    null
  );
}

function obtenerQ(e = {}) {
  return (
    e?.Q ??
    e?.q ??
    e?.caudal ??
    e?.caudalDisenoM3s ??
    e?.Qp ??
    e?.Qpico ??
    e?.qPico ??
    e?.caudalPicoM3s ??
    null
  );
}

function obtenerPe(e = {}) {
  return (
    e?.peTotalMm ??
    e?.PeTotalMm ??
    e?.lluviaEfectivaTotalMm ??
    e?.lluvia_efectiva_total_mm ??
    e?.pe_mm ??
    null
  );
}

function obtenerVolumen(e = {}) {
  return (
    e?.volumenIntegradoM3 ??
    e?.volumenEsperadoM3 ??
    e?.volumenM3 ??
    e?.volTotal ??
    e?.volumen ??
    null
  );
}

export function derivarTablaResumenTrDesdeQTrMultiEscenario(entrada = {}) {
  const escenarios = obtenerEscenarios(entrada);

  if (!Array.isArray(escenarios) || escenarios.length === 0) {
    return [
      "Tabla resumen Tr multiescenario: no disponible en el payload."
    ];
  }

  const lineas = [
    "| Tr (años) | Q / Qp (m³/s) | Pe total (mm) | Volumen (m³) |",
    "|---:|---:|---:|---:|"
  ];

  escenarios.forEach((e) => {
    lineas.push(
      `| ${numero(obtenerTr(e), 2)} | ${numero(obtenerQ(e), 2)} | ${numero(obtenerPe(e), 2)} | ${numero(obtenerVolumen(e), 2)} |`
    );
  });

  return lineas;
}

export default derivarTablaResumenTrDesdeQTrMultiEscenario;
