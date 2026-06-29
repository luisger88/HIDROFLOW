const FALLBACK_TEXTO_QTR_ACTIVO = "—";
const ESTADO_QTR_NO_PUBLICADO = "no_publicado";
const LECTURA_TECNICA_QTR_NO_PUBLICADO =
  "bloque reservado para integración posterior sin recálculo.";

export function normalizarEstadoQTrActivoDocumental(valor) {
  if (valor === undefined || valor === null) {
    return ESTADO_QTR_NO_PUBLICADO;
  }

  if (typeof valor === "string") {
    const valorLimpio = valor.trim();
    return valorLimpio.length > 0 ? valorLimpio : ESTADO_QTR_NO_PUBLICADO;
  }

  if (typeof valor === "number" || typeof valor === "boolean") {
    return String(valor);
  }

  if (typeof valor === "object") {
    const estado =
      valor.estado ??
      valor.status ??
      valor.valor ??
      valor.codigo ??
      null;

    return normalizarEstadoQTrActivoDocumental(estado);
  }

  return ESTADO_QTR_NO_PUBLICADO;
}

export function formatearValorQTrActivoDocumental(valor) {
  if (valor === undefined || valor === null) {
    return FALLBACK_TEXTO_QTR_ACTIVO;
  }

  if (typeof valor === "string") {
    const valorLimpio = valor.trim();
    return valorLimpio.length > 0 ? valorLimpio : FALLBACK_TEXTO_QTR_ACTIVO;
  }

  if (typeof valor === "number") {
    return Number.isFinite(valor) ? String(valor) : FALLBACK_TEXTO_QTR_ACTIVO;
  }

  if (typeof valor === "boolean") {
    return valor ? "sí" : "no";
  }

  if (typeof valor === "object") {
    const candidatos = [
      valor.q,
      valor.Q,
      valor.q_m3s,
      valor.Q_m3s,
      valor.qTr,
      valor.QTr,
      valor.q_tr,
      valor.Q_Tr,
      valor.caudal,
      valor.caudal_m3s,
      valor.caudalPico,
      valor.valor,
      valor.etiqueta,
      valor.label,
      valor.tr_activo,
      valor.Tr,
      valor.TR,
      valor.periodoRetorno,
      valor.periodo_retorno,
      valor.periodoRetornoActivo
    ];

    const candidato = candidatos.find(
      (item) =>
        typeof item === "string" ||
        typeof item === "number" ||
        typeof item === "boolean"
    );

    return formatearValorQTrActivoDocumental(candidato);
  }

  return FALLBACK_TEXTO_QTR_ACTIVO;
}

function normalizarEntradaQTrActivo(entrada = {}) {
  const entradaSegura = entrada && typeof entrada === "object" ? entrada : {};

  const estadoQTrActivoExpediente =
    entradaSegura.estadoQTrActivoExpediente ??
    entradaSegura.estadoQTrActivo ??
    entradaSegura.estado ??
    null;

  const qTrActivoExpediente =
    entradaSegura.qTrActivoExpediente ??
    entradaSegura.qTrActivo ??
    null;

  const faltantesQTrActivoExpediente = Array.isArray(
    entradaSegura.faltantesQTrActivoExpediente
  )
    ? [...entradaSegura.faltantesQTrActivoExpediente]
    : [];

  const trDisenoActivoExpediente =
    entradaSegura.trDisenoActivoExpediente ??
    entradaSegura.trDisenoActivo ??
    entradaSegura.tr_diseno_activo ??
    entradaSegura.periodo_retorno_activo ??
    entradaSegura.periodoRetornoActivo ??
    qTrActivoExpediente?.tr_activo ??
    qTrActivoExpediente?.Tr ??
    qTrActivoExpediente?.TR ??
    qTrActivoExpediente?.periodoRetorno ??
    qTrActivoExpediente?.periodo_retorno ??
    qTrActivoExpediente?.periodoRetornoActivo ??
    null;

  return {
    estadoDocumental: normalizarEstadoQTrActivoDocumental(
      estadoQTrActivoExpediente
    ),
    qTrActivoDocumental: formatearValorQTrActivoDocumental(qTrActivoExpediente),
    trDisenoActivoDocumental: formatearValorQTrActivoDocumental(
      trDisenoActivoExpediente
    ),
    faltantesQTrActivoExpediente
  };
}

function construirLecturaTecnicaQTrActivo({
  estadoDocumental,
  faltantesQTrActivoExpediente
}) {
  if (
    estadoDocumental === ESTADO_QTR_NO_PUBLICADO ||
    faltantesQTrActivoExpediente.length > 0
  ) {
    return LECTURA_TECNICA_QTR_NO_PUBLICADO;
  }

  return "escenario Q-Tr activo documentado como trazabilidad sin recálculo.";
}

export function construirBloqueEscenarioQTrActivoExpediente(entrada = {}) {
  const entradaSegura = entrada && typeof entrada === "object" ? entrada : {};
  const incluirTitulo = entradaSegura.incluirTitulo !== false;

  const {
    estadoDocumental,
    qTrActivoDocumental,
    trDisenoActivoDocumental,
    faltantesQTrActivoExpediente
  } = normalizarEntradaQTrActivo(entradaSegura);

  const lineas = [];

  if (incluirTitulo) {
    lineas.push("## 5. Escenario Q-Tr activo — control de trazabilidad");
  }

  lineas.push(`Estado: ${estadoDocumental}`);
  lineas.push(
    `Lectura técnica: ${construirLecturaTecnicaQTrActivo({
      estadoDocumental,
      faltantesQTrActivoExpediente
    })}`
  );

  if (estadoDocumental !== ESTADO_QTR_NO_PUBLICADO) {
    lineas.push(`Periodo de retorno activo: ${trDisenoActivoDocumental}`);
    lineas.push(`Q-Tr activo: ${qTrActivoDocumental}`);
  }

    if (faltantesQTrActivoExpediente.length > 0) {
    lineas.push(
      `Faltantes documentales: ${faltantesQTrActivoExpediente
        .map((faltante) => formatearValorQTrActivoDocumental(faltante))
        .join(", ")}`
    );
  }

  lineas.push("");
  lineas.push(
    "¿Qué valida?: la trazabilidad del escenario hidrológico rector.",
    "¿Qué concluye?: el periodo de retorno y el Q‑Tr adoptados para el análisis.",
    "Salida del bloque: el escenario activo define las condiciones hidrológicas que alimentan la evaluación del hidrograma principal y el resto de controles del expediente."
  );

  return lineas;
}

