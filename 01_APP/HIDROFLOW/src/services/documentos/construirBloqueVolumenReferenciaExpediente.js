// OT-0280 — Helper puro documental del bloque Volumen de referencia.
// No modifica motor.
// No recalcula volumen.
// No consulta bloques hidrologicos externos ni modulos comparativos.
// No accede a DOM, portapapeles ni estado global.

const FALLBACK_DOCUMENTAL = "—";

function esValorAusente(valor) {
  return valor === undefined || valor === null;
}

function normalizarNumeroDocumental(valor) {
  if (esValorAusente(valor)) {
    return null;
  }

  if (typeof valor === "string" && valor.trim().length === 0) {
    return null;
  }

  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return null;
  }

  return numero;
}

function formatearNumeroDocumental(valor, opciones = {}) {
  const numero = normalizarNumeroDocumental(valor);

  if (numero === null) {
    return FALLBACK_DOCUMENTAL;
  }

  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2
  } = opciones;

  return numero.toLocaleString("es-CO", {
    minimumFractionDigits,
    maximumFractionDigits
  });
}

export function formatearLluviaEfectivaDocumental(valor) {
  const numero = normalizarNumeroDocumental(valor);

  if (numero === null) {
    return FALLBACK_DOCUMENTAL;
  }

  return `${formatearNumeroDocumental(numero, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })} mm`;
}

export function formatearVolumenEsperadoDocumental(valor) {
  const numero = normalizarNumeroDocumental(valor);

  if (numero === null) {
    return FALLBACK_DOCUMENTAL;
  }

  return `${formatearNumeroDocumental(numero, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })} m³`;
}

export function construirBloqueVolumenReferenciaExpediente(entrada = {}) {
  const entradaSegura =
    entrada && typeof entrada === "object"
      ? entrada
      : {};

  const {
    peTotalMm,
    volumenEsperadoM3,
    incluirTitulo = true
  } = entradaSegura;

  const lineas = [];

  if (incluirTitulo) {
    lineas.push("## 4. Volumen de referencia");
  }

  lineas.push(`Lluvia efectiva total: ${formatearLluviaEfectivaDocumental(peTotalMm)}`);
  lineas.push(`Volumen esperado: ${formatearVolumenEsperadoDocumental(volumenEsperadoM3)}`);
  lineas.push("Fórmula: Pe(mm) × Área(km²) × 1000.");

  return lineas;
}

