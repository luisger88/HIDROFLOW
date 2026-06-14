// OT-0110B — Helper puro inicial del expediente hidrológico mínimo.
// Este helper NO está integrado todavía al botón de copiado.
// No modifica UI, no copia al portapapeles, no recalcula hidrogramas y no toca motor.

export const VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO =
  "expediente_hidrologico_minimo_v0_1";

export const SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO = Object.freeze([
  "# Expediente hidrológico mínimo — Cuenca activa",
  "## 1. Identificación",
  "## 2. Parámetros hidrológicos base",
  "## 3. Tiempo de concentración y roles Tc",
  "## 4. Volumen de referencia",
  "## 5. Escenario Q-Tr activo — control de trazabilidad",
  "## 6. Resumen Q-5 auditado",
  "## 7. Método Racional — contraste global independiente",
  "## 8. Contraste Q-5 vs Método Racional",
  "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "## Diagnóstico temporal Q(t) no adoptivo",
  "## 10. Validación interna del expediente exportado",
  "## 11. Sello técnico de generación",
  "## 12. Restricciones y advertencias técnicas"
]);

export const TOKENS_INVALIDOS_EXPEDIENTE_MINIMO = Object.freeze([
  "undefined",
  "null",
  "NaN",
  "[object Object]"
]);

function textoSeguro(valor, fallback = "—") {
  if (valor === null || valor === undefined || valor === "") return fallback;
  return String(valor);
}

export function formatearNumeroExpediente(valor, decimales = 2) {
  if (valor === null || valor === undefined || valor === "") return "—";

  const numero = Number(valor);

  return Number.isFinite(numero)
    ? numero.toLocaleString("es-CO", {
        maximumFractionDigits: decimales
      })
    : "—";
}

export function construirMetadataExpediente({
  contextoBase = {},
  fechaGeneracion = null,
  versionExpediente = VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
  fuente = "helper_puro_inicial"
} = {}) {
  return {
    versionExpediente,
    fuente,
    cuenca: contextoBase?.cuencaNombre ?? "Cuenca activa",
    fechaGeneracion: fechaGeneracion ?? null,
    tipoSalida: "expediente_hidrologico_minimo",
    estadoIntegracion: "helper_no_integrado"
  };
}

export function validarTextoExpedienteMinimo(
  texto,
  seccionesObligatorias = SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO
) {
  const contenido = textoSeguro(texto, "");

  const tokensDetectados = TOKENS_INVALIDOS_EXPEDIENTE_MINIMO.filter((token) =>
    contenido.includes(token)
  );

  const seccionesFaltantes = seccionesObligatorias.filter(
    (seccion) => !contenido.includes(seccion)
  );

  const errores = [
    ...tokensDetectados.map((token) => `Token inválido detectado: ${token}`),
    ...seccionesFaltantes.map((seccion) => `Sección obligatoria faltante: ${seccion}`)
  ];

  return {
    ok: errores.length === 0,
    errores,
    advertencias: [],
    tokensDetectados,
    seccionesFaltantes,
    seccionesObligatorias: [...seccionesObligatorias]
  };
}

export default function construirExpedienteHidrologicoMinimo({
  contextoBase = {},
  Tc_final = null,
  metodos = [],
  filasMorfologiaQt = [],
  filasDictamenFormaQt = [],
  filasRiesgoTemporalQt = [],
  sintesisRiesgoTemporalQt = null,
  fechaGeneracion = null,
  versionExpediente = VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO
} = {}) {
  const metadata = construirMetadataExpediente({
    contextoBase,
    fechaGeneracion,
    versionExpediente
  });

  const areaKm2 = Number(contextoBase?.area_km2);
  const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);

  const volumenEsperadoM3 =
    Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
      ? areaKm2 * peTotalMm * 1000
      : null;

  const texto = [
    "# Expediente hidrológico mínimo — Cuenca activa",
    "Estado técnico del expediente: BORRADOR GENERADO POR HELPER PURO INICIAL.",
    "Lectura técnica: este helper aún no reemplaza el expediente operativo construido en ComparadorMultiMetodo.jsx.",
    "Alcance: contrato inicial de construcción documental; no copia al portapapeles, no modifica UI y no recalcula resultados.",
    "",
    "## 1. Identificación",
    `Cuenca: ${metadata.cuenca}`,
    `Área: ${Number.isFinite(areaKm2) ? formatearNumeroExpediente(areaKm2, 4) + " km²" : "—"}`,
    `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
    "",
    "## 2. Parámetros hidrológicos base",
    `CN: ${textoSeguro(contextoBase?.CN)}`,
    `CN base: ${textoSeguro(contextoBase?.CN_base)}`,
    `CN efectivo: ${textoSeguro(contextoBase?.CN_efectivo)}`,
    `AMC: ${textoSeguro(contextoBase?.AMC)}`,
    "",
    "## 3. Tiempo de concentración y roles Tc",
    `Tc comparador: ${
      Tc_final !== null && Tc_final !== undefined
        ? formatearNumeroExpediente(Tc_final, 1) + " min"
        : "—"
    }`,
    "Nota: este helper no selecciona ni recalcula Tc.",
    "",
    "## 4. Volumen de referencia",
    `Lluvia efectiva total: ${
      Number.isFinite(peTotalMm) ? formatearNumeroExpediente(peTotalMm, 2) + " mm" : "—"
    }`,
    `Volumen esperado: ${
      Number.isFinite(volumenEsperadoM3)
        ? formatearNumeroExpediente(volumenEsperadoM3, 0) + " m³"
        : "—"
    }`,
    "Fórmula: Pe(mm) × Área(km²) × 1000.",
    "",
    "## 5. Escenario Q-Tr activo — control de trazabilidad",
    `Estado: ${contextoBase?.q_tr_activo_estado?.estado ?? "no_publicado"}`,
    "Lectura técnica: bloque reservado para integración posterior sin recálculo.",
    "",
    "## 6. Resumen Q-5 auditado",
    `Métodos recibidos: ${Array.isArray(metodos) ? metodos.length : 0}`,
    "Estado: sección contractual inicial del helper puro.",
    "",
    "## 7. Método Racional — contraste global independiente",
    "Uso: contraste global independiente de caudal pico.",
    "Estado: sección contractual inicial del helper puro.",
    "",
    "## 8. Contraste Q-5 vs Método Racional",
    "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
    "",
    "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
    "Estado: pendiente de integración completa con datos derivados del expediente operativo.",
    "",
    "## Diagnóstico temporal Q(t) no adoptivo",
    `Filas morfológicas recibidas: ${Array.isArray(filasMorfologiaQt) ? filasMorfologiaQt.length : 0}`,
    `Filas de forma recibidas: ${Array.isArray(filasDictamenFormaQt) ? filasDictamenFormaQt.length : 0}`,
    `Filas de riesgo recibidas: ${Array.isArray(filasRiesgoTemporalQt) ? filasRiesgoTemporalQt.length : 0}`,
    `Síntesis de riesgo temporal: ${sintesisRiesgoTemporalQt ? "recibida" : "no recibida"}`,
    "Restricción: diagnóstico no adoptivo; no selecciona método ni levanta No coherente.",
    "",
    "## 10. Validación interna del expediente exportado",
    "Estado de validación estructural: helper puro inicial con control de secciones y tokens inválidos.",
    "",
    "## 11. Sello técnico de generación",
    "Herramienta: HidroFlow.",
    "Tipo de salida: Expediente hidrológico mínimo.",
    `Versión del expediente: ${versionExpediente}`,
    `Fecha de generación: ${fechaGeneracion ?? "—"}`,
    "Alcance: helper puro inicial no integrado al botón de copiado.",
    "",
    "## 12. Restricciones y advertencias técnicas",
    "- No modifica el motor hidrológico.",
    "- No recalcula hidrogramas.",
    "- No altera Qp, tPico, Volumen ni Q(t).",
    "- No copia al portapapeles.",
    "- No reemplaza el expediente operativo actual.",
    ""
  ].join("\n");

  const validacion = validarTextoExpedienteMinimo(texto);

  const advertencias = [
    "Helper puro inicial no integrado al botón.",
    "El texto generado es contractual/base y no reemplaza todavía el expediente operativo actual."
  ];

  return {
    ok: validacion.ok,
    texto,
    errores: validacion.errores,
    advertencias,
    secciones: [...SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO],
    metadata
  };
}