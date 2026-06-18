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
    entradaSegura.periodoRetornoActivo ??
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

  return lineas;
}
