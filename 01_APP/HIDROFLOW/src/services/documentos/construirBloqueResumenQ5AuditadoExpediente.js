const FALLBACK_TEXTO_RESUMEN_Q5 = "—";
const ESTADO_RESUMEN_Q5_INICIAL =
  "sección contractual inicial del helper puro";

export function contarMetodosQ5Documentales(metodosQ5) {
  return Array.isArray(metodosQ5) ? metodosQ5.length : 0;
}

export function formatearValorResumenQ5Documental(valor) {
  if (valor === undefined || valor === null) {
    return FALLBACK_TEXTO_RESUMEN_Q5;
  }

  if (typeof valor === "string") {
    const valorLimpio = valor.trim();
    return valorLimpio.length > 0 ? valorLimpio : FALLBACK_TEXTO_RESUMEN_Q5;
  }

  if (typeof valor === "number") {
    return Number.isFinite(valor) ? String(valor) : FALLBACK_TEXTO_RESUMEN_Q5;
  }

  if (typeof valor === "boolean") {
    return valor ? "sí" : "no";
  }

  return FALLBACK_TEXTO_RESUMEN_Q5;
}

export function normalizarEstadoResumenQ5AuditadoDocumental(valor) {
  if (valor === undefined || valor === null) {
    return ESTADO_RESUMEN_Q5_INICIAL;
  }

  if (typeof valor === "string") {
    const valorLimpio = valor.trim();
    return valorLimpio.length > 0 ? valorLimpio : ESTADO_RESUMEN_Q5_INICIAL;
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
      undefined;

    return normalizarEstadoResumenQ5AuditadoDocumental(estado);
  }

  return ESTADO_RESUMEN_Q5_INICIAL;
}

function normalizarEntradaResumenQ5(entrada = {}) {
  const entradaSegura = entrada && typeof entrada === "object" ? entrada : {};

  const metodosQ5 = Array.isArray(entradaSegura.metodosQ5)
    ? [...entradaSegura.metodosQ5]
    : [];

  const faltantesResumenQ5AuditadoExpediente = Array.isArray(
    entradaSegura.faltantesResumenQ5AuditadoExpediente
  )
    ? [...entradaSegura.faltantesResumenQ5AuditadoExpediente]
    : [];

  return {
    metodosQ5,
    cantidadMetodosQ5: contarMetodosQ5Documentales(metodosQ5),
    estadoResumenQ5AuditadoExpediente:
      normalizarEstadoResumenQ5AuditadoDocumental(
        entradaSegura.estadoResumenQ5AuditadoExpediente
      ),
    faltantesResumenQ5AuditadoExpediente
  };
}

export function construirBloqueResumenQ5AuditadoExpediente(entrada = {}) {
  const entradaSegura = entrada && typeof entrada === "object" ? entrada : {};
  const incluirTitulo = entradaSegura.incluirTitulo !== false;

  const {
    cantidadMetodosQ5,
    estadoResumenQ5AuditadoExpediente,
    faltantesResumenQ5AuditadoExpediente
  } = normalizarEntradaResumenQ5(entradaSegura);

  const lineas = [];

  if (incluirTitulo) {
    lineas.push("## 6. Resumen Q-5 auditado");
  }

  lineas.push(`Métodos recibidos: ${cantidadMetodosQ5}`);
  lineas.push(`Estado: ${estadoResumenQ5AuditadoExpediente}`);

  if (faltantesResumenQ5AuditadoExpediente.length > 0) {
    lineas.push(
      `Faltantes documentales: ${faltantesResumenQ5AuditadoExpediente
        .map((faltante) => formatearValorResumenQ5Documental(faltante))
        .join(", ")}`
    );
  }

  return lineas;
}
