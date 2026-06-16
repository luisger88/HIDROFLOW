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

export function construirLineasIdentificacionExpediente(entrada = {}) {
  const contextoBase =
    entrada?.contextoBase && typeof entrada.contextoBase === "object"
      ? entrada.contextoBase
      : entrada;

  const fuenteFallback =
    textoSeguro(entrada?.fuenteFallback, "") || "HidroFlow";

  const estacionIdfFallback =
    textoSeguro(entrada?.estacionIdfFallback, "") || "SAN CRISTOBAL";

  const nombreCuenca =
    textoSeguro(contextoBase?.cuencaNombre, "") ||
    textoSeguro(contextoBase?.nombreCuenca, "") ||
    textoSeguro(contextoBase?.cuenca, "") ||
    textoSeguro(contextoBase?.cuencaActiva?.nombre, "") ||
    "Cuenca activa";

  const areaKm2 =
    Number.isFinite(Number(contextoBase?.area_km2))
      ? Number(contextoBase.area_km2)
      : Number.isFinite(Number(contextoBase?.areaKm2))
      ? Number(contextoBase.areaKm2)
      : Number.isFinite(Number(contextoBase?.cuencaActiva?.areaKm2))
      ? Number(contextoBase.cuencaActiva.areaKm2)
      : null;

  const pendienteMediaPct =
    Number.isFinite(Number(contextoBase?.pendiente_media_pct))
      ? Number(contextoBase.pendiente_media_pct)
      : Number.isFinite(Number(contextoBase?.pendienteMediaPct))
      ? Number(contextoBase.pendienteMediaPct)
      : Number.isFinite(Number(contextoBase?.cuencaActiva?.pendienteMediaPct))
      ? Number(contextoBase.cuencaActiva.pendienteMediaPct)
      : null;

  const longitudCauceKm =
    Number.isFinite(Number(contextoBase?.longitud_cauce_km))
      ? Number(contextoBase.longitud_cauce_km)
      : Number.isFinite(Number(contextoBase?.longitudCaucePrincipalKm))
      ? Number(contextoBase.longitudCaucePrincipalKm)
      : Number.isFinite(Number(contextoBase?.cuencaActiva?.longitudCaucePrincipalKm))
      ? Number(contextoBase.cuencaActiva.longitudCaucePrincipalKm)
      : null;

  const estacionIdf =
    textoSeguro(contextoBase?.estacion_idf, "") ||
    textoSeguro(contextoBase?.estacionIDF, "") ||
    textoSeguro(contextoBase?.estacionIdf, "") ||
    textoSeguro(contextoBase?.estacion, "") ||
    textoSeguro(contextoBase?.nombre_estacion, "") ||
    textoSeguro(contextoBase?.idf?.nombre, "") ||
    textoSeguro(contextoBase?.idf?.estacion, "") ||
    estacionIdfFallback;

  const fuenteContexto =
    textoSeguro(contextoBase?.fuente, "") ||
    textoSeguro(contextoBase?.fuenteContexto, "") ||
    fuenteFallback;

  return [
    "## 1. Identificación",
    `Cuenca: ${textoSeguro(nombreCuenca, "Cuenca activa")}`,
    `Área: ${
      Number.isFinite(areaKm2)
        ? areaKm2.toFixed(4) + " km²"
        : "—"
    }`,
    `Fuente de contexto: ${textoSeguro(fuenteContexto, fuenteFallback)}`,
    `Estación IDF: ${textoSeguro(estacionIdf, estacionIdfFallback)}`,
    `Pendiente media: ${
      Number.isFinite(pendienteMediaPct)
        ? pendienteMediaPct.toFixed(2) + " %"
        : "—"
    }`,
    `Longitud cauce principal: ${
      Number.isFinite(longitudCauceKm)
        ? longitudCauceKm.toFixed(3) + " km"
        : "—"
    }`
  ];
}

export function construirLineasSelloTecnicoAuxiliarExpediente({
  metadata = {},
  versionExpediente = metadata?.versionExpediente ?? VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
  estadoIntegracion = metadata?.estadoIntegracion ?? "helper_no_integrado",
  tipoSalida = metadata?.tipoSalida ?? "expediente_hidrologico_minimo"
} = {}) {
  return [
    `Versión auxiliar helper expediente: ${textoSeguro(versionExpediente, "no integrada")}.`,
    `Estado auxiliar helper expediente: ${textoSeguro(estadoIntegracion, "no informado")}.`,
    `Tipo auxiliar helper expediente: ${textoSeguro(tipoSalida, "expediente_hidrologico_minimo")}.`
  ];
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

export function construirLineasParametrosHidrologicosBaseExpediente(entrada = {}) {
  const contextoBase =
    entrada?.contextoBase && typeof entrada.contextoBase === "object"
      ? entrada.contextoBase
      : entrada;

  const valorDocumental = (valor) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "number" && !Number.isFinite(valor)) {
      return "—";
    }

    if (typeof valor === "object") {
      return "—";
    }

    const textoValor = String(valor).trim();

    return textoValor.length > 0 ? textoValor : "—";
  };

  return [
    "## 2. Parámetros hidrológicos base",
    `CN: ${valorDocumental(contextoBase?.CN)}`,
    `CN base: ${valorDocumental(contextoBase?.CN_base)}`,
    `CN efectivo: ${valorDocumental(contextoBase?.CN_efectivo)}`,
    `AMC: ${valorDocumental(contextoBase?.AMC)}`
  ];
}
export function construirLineasTiempoConcentracionRolesTcExpediente(entrada = {}) {
  const formatearTc = (valor) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "string" && valor.trim().length === 0) {
      return "—";
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) {
      return "—";
    }

    return `${numero.toFixed(1)} min`;
  };

  const valorDocumental = (valor) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "number" && !Number.isFinite(valor)) {
      return "—";
    }

    if (typeof valor === "object") {
      return "—";
    }

    const textoValor = String(valor).trim();

    return textoValor.length > 0 ? textoValor : "—";
  };

  const trGlobalActivo = valorDocumental(entrada?.trDisenoActivoExpediente);

  return [
    "## 3. Tiempo de concentración y roles Tc",
    `Tc comparador: ${formatearTc(entrada?.Tc_final)}`,
    `Tr global activo: ${trGlobalActivo} años`,
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    "Roles Tc:",
    "- Tc global Índice: referencia hidrológica general.",
    "- Tc operativo Q(t): ruta interna del hidrograma.",
    "- Duración evento: 3 h para almacenamiento/regulación.",
    "- Lag / forma SCS: parámetro derivado para forma temporal.",
    "- Tc comparador: referencia especializada para coherencia Q-5."
  ];
}
export function construirLineasVolumenReferenciaExpediente(entrada = {}) {
  const formatearLluviaEfectiva = (valor) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "string" && valor.trim().length === 0) {
      return "—";
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) {
      return "—";
    }

    return `${numero.toFixed(2)} mm`;
  };

  const formatearVolumenEsperado = (valor) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "string" && valor.trim().length === 0) {
      return "—";
    }

    if (typeof valor === "object") {
      return "—";
    }

    const numero = Number(valor);

    if (!Number.isFinite(numero)) {
      return "—";
    }

    return `${numero.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³`;
  };

  return [
    "## 4. Volumen de referencia",
    `Lluvia efectiva total: ${formatearLluviaEfectiva(entrada?.peTotalMm)}`,
    `Volumen esperado: ${formatearVolumenEsperado(entrada?.volumenEsperadoM3)}`,
    "Fórmula: Pe(mm) × Área(km²) × 1000."
  ];
}

export function construirLineasEscenarioQTrActivoExpediente(entrada = {}) {
  const entradaSegura = entrada && typeof entrada === "object" ? entrada : {};

  const {
    estadoQTrActivoExpediente = {},
    qTrActivoExpediente = {},
    faltantesQTrActivoExpediente = [],
    formatearValorQTrExpediente
  } = entradaSegura;

  const normalizarTexto = (valor, fallback = "—") => {
    if (valor === undefined || valor === null) {
      return fallback;
    }

    if (typeof valor === "string" && valor.trim().length === 0) {
      return fallback;
    }

    if (typeof valor === "object") {
      return fallback;
    }

    return String(valor);
  };

  const formatearValorSeguro = (valor, unidad = "", decimales) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "string" && valor.trim().length === 0) {
      return "—";
    }

    if (typeof valor === "object") {
      return "—";
    }

    const numero = Number(valor);

    if (Number.isFinite(numero) && typeof decimales === "number") {
      return `${numero.toFixed(decimales)}${unidad}`;
    }

    if (Number.isFinite(numero) && typeof valor === "number") {
      return `${numero}${unidad}`;
    }

    if (typeof valor === "string") {
      return valor;
    }

    return "—";
  };

  const formatear = (valor, unidad = "", decimales) => {
    if (typeof formatearValorQTrExpediente === "function") {
      const formateado = formatearValorQTrExpediente(valor, unidad, decimales);
      return normalizarTexto(formateado);
    }

    return formatearValorSeguro(valor, unidad, decimales);
  };

  const faltantes = Array.isArray(faltantesQTrActivoExpediente)
    ? faltantesQTrActivoExpediente.filter((item) => normalizarTexto(item, "").length > 0)
    : [];

  return [
    "## 5. Escenario Q-Tr activo — control de trazabilidad",
    `Estado: ${normalizarTexto(estadoQTrActivoExpediente?.estado, "no_publicado")}`,
    `Tr activo: ${formatear(qTrActivoExpediente?.tr_activo, " años", 2)}`,
    `Estación IDF: ${formatear(qTrActivoExpediente?.estacion_idf)}`,
    `Método IDF: ${formatear(qTrActivoExpediente?.metodo_idf)}`,
    `Distribución temporal: ${formatear(qTrActivoExpediente?.distribucion_temporal)}`,
    `Área: ${formatear(qTrActivoExpediente?.area_km2, " km²", 4)}`,
    `CN efectivo: ${formatear(qTrActivoExpediente?.cn_efectivo, "", 2)}`,
    `S: ${formatear(qTrActivoExpediente?.s_mm, " mm", 2)}`,
    `Ia: ${formatear(qTrActivoExpediente?.ia_mm, " mm", 2)}`,
    `Impermeabilidad: ${formatear(qTrActivoExpediente?.porcentaje_impermeable, " %", 2)}`,
    `Tc: ${formatear(qTrActivoExpediente?.tc_min, " min", 4)}`,
    `Pe total: ${formatear(qTrActivoExpediente?.lluvia_efectiva_total_mm, " mm", 4)}`,
    `Campos mínimos: ${faltantes.length > 0 ? "faltantes — " + faltantes.join(", ") : "completos"}`,
    `Fuente: ${normalizarTexto(estadoQTrActivoExpediente?.fuente)}`,
    "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."
  ];
}

export function construirLineasResumenQ5AuditadoExpediente(entrada = {}) {
  const entradaSegura = entrada && typeof entrada === "object" ? entrada : {};

  const { tablaQ5Markdown = [] } = entradaSegura;

  const normalizarLinea = (valor) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "string") {
      return valor;
    }

    if (typeof valor === "number" && Number.isFinite(valor)) {
      return String(valor);
    }

    return "—";
  };

  const tabla = Array.isArray(tablaQ5Markdown)
    ? tablaQ5Markdown
        .map((linea) => normalizarLinea(linea))
        .filter((linea) => linea.trim().length > 0)
    : [];

  const lineasTabla = tabla.length > 0
    ? tabla
    : ["sin tabla Q-5 disponible"];

  return [
    "## 6. Resumen Q-5 auditado",
    "Estado general: diagnóstico no adoptivo.",
    "SCS Unit Hydrograph: candidato principal de referencia.",
    "SCS Mod.: variante ajustable.",
    "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
    "Masa y volumen: controlados frente a referencia física.",
    "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
    "",
    "Tabla Q-5 auditada:",
    ...lineasTabla,
    "",
    ""
  ];
}
