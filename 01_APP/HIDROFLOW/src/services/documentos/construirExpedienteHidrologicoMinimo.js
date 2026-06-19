import { construirBloqueRestriccionesAdvertenciasGeneralesExpediente } from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";
import { construirBloqueIdentificacionExpedienteMinimo } from "./construirBloqueIdentificacionExpedienteMinimo";
import { construirBloqueParametrosHidrologicosBaseExpediente } from "./construirBloqueParametrosHidrologicosBaseExpediente";
import { construirBloqueTiempoConcentracionRolesTcExpediente } from "./construirBloqueTiempoConcentracionRolesTcExpediente";
import { construirBloqueVolumenReferenciaExpediente } from "./construirBloqueVolumenReferenciaExpediente";
import { construirBloqueEscenarioQTrActivoExpediente } from "./construirBloqueEscenarioQTrActivoExpediente";
import { construirBloqueResumenQ5AuditadoExpediente } from "./construirBloqueResumenQ5AuditadoExpediente";
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

function normalizarTextoIdentificacionExpediente(valor, fallback = "—") {
  if (typeof valor === "string" && valor.trim().length > 0) {
    return valor;
  }

  if (typeof valor === "number" && Number.isFinite(valor)) {
    return String(valor);
  }

  if (valor && typeof valor === "object") {
    const candidato =
      valor.nombre ??
      valor.nombreCuenca ??
      valor.id ??
      valor.codigo ??
      valor.label ??
      valor.descripcion;

    if (typeof candidato === "string" && candidato.trim().length > 0) {
      return candidato;
    }

    if (typeof candidato === "number" && Number.isFinite(candidato)) {
      return String(candidato);
    }

    return fallback;
  }

  return fallback;
}

export function construirLineasIdentificacionExpediente(entrada = {}) {
  const contextoBase =
    entrada?.contextoBase && typeof entrada.contextoBase === "object"
      ? entrada.contextoBase
      : entrada;

  const fechaGeneracion = entrada?.fechaGeneracion ?? "—";

  return construirBloqueIdentificacionExpedienteMinimo({
    cuenca:
      contextoBase?.cuenca?.nombre ??
      contextoBase?.cuencaActiva?.nombre ??
      contextoBase?.nombreCuenca ??
      "Cuenca activa",
    identificadorCuenca:
      contextoBase?.cuenca?.id ??
      contextoBase?.cuencaActiva?.id ??
      contextoBase?.identificadorCuenca ??
      "—",
    versionExpediente: VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
    tipoSalida: "expediente_hidrologico_minimo",
    fechaGeneracion,
    fuente: "construirExpedienteHidrologicoMinimo",
    estadoDocumental: "Borrador documental controlado",
    alcanceDocumental: "Bloque documental de identificación del expediente.",
    incluirTitulo: true
  });
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

function formatearValorRacionalExpediente(valor, unidad = "", decimales = 2) {
  if (valor === undefined || valor === null || valor === "") {
    return "—";
  }

  const numero = Number(valor);

  if (Number.isFinite(numero) && String(valor).trim() !== "") {
    return `${numero.toLocaleString("es-CO", {
      maximumFractionDigits: decimales
    })}${unidad}`;
  }

  const texto = String(valor).replaceAll("|", "/").trim();
  return texto.length > 0 ? texto : "—";
}

function construirLineasTablaMetodoRacionalExpediente(resultados = []) {
  if (!Array.isArray(resultados) || resultados.length === 0) {
    return ["Tabla Método Racional: no disponible en contexto."];
  }

  return [
    "Tabla Método Racional:",
    "| Tr | I | P | C | Q |",
    "|---:|---:|---:|---:|---:|",
    ...resultados.map((fila) => {
      return `| ${formatearValorRacionalExpediente(fila?.Tr)} | ${formatearValorRacionalExpediente(fila?.I, " mm/h")} | ${formatearValorRacionalExpediente(fila?.P, " mm")} | ${formatearValorRacionalExpediente(fila?.C, "", 4)} | ${formatearValorRacionalExpediente(fila?.Q, " m³/s")} |`;
    })
  ];
}

export default function construirExpedienteHidrologicoMinimo({
  peTotalMm: peTotalMmEntradaDocumental = null,
  volumenEsperadoM3: volumenEsperadoM3EntradaDocumental = null,  contextoBase = {},
  Tc_final = null,
  trDisenoActivoExpediente = null,
  metodos = [],
  filasMorfologiaQt = [],
  filasDictamenFormaQt = [],
  filasRiesgoTemporalQt = [],
  sintesisRiesgoTemporalQt = null,
  fechaGeneracion = null,
  versionExpediente = VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
  autorTecnico = null,
  tipoAuxiliar = "expediente_hidrologico_minimo"
} = {}) {
  const metadata = construirMetadataExpediente({
    contextoBase,
    fechaGeneracion,
    versionExpediente
  });

  const autorTecnicoSelloDocumental =
    autorTecnico ??
    contextoBase?.autorTecnico ??
    contextoBase?.responsableTecnico ??
    contextoBase?.profesionalResponsable ??
    "—";

  const tipoAuxiliarSelloDocumental =
    tipoAuxiliar ??
    metadata?.tipoSalida ??
    "expediente_hidrologico_minimo";

  const areaKm2 = Number(contextoBase?.area_km2);
  const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);

  const volumenEsperadoM3 =
    Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
      ? areaKm2 * peTotalMm * 1000
      : null;
  const trDisenoActivoExpedienteDocumental =
    trDisenoActivoExpediente ??
    contextoBase?.trDisenoActivoExpediente ??
    contextoBase?.trDisenoActivo ??
    contextoBase?.tr_diseno_activo ??
    contextoBase?.periodo_retorno_activo ??
    contextoBase?.periodoRetornoActivo ??
    contextoBase?.Tr ??
    contextoBase?.TR ??
    contextoBase?.periodoRetorno ??
    contextoBase?.periodo_retorno ??
    contextoBase?.periodoRetornoAnos ??
    contextoBase?.periodoRetornoAnios ??
    null;

  const peTotalMmBloqueVolumenReferenciaDocumental =
    Number.isFinite(Number(peTotalMmEntradaDocumental))
      ? Number(peTotalMmEntradaDocumental)
      : peTotalMm;

  const volumenEsperadoM3BloqueVolumenReferenciaDocumental =
    Number.isFinite(Number(volumenEsperadoM3EntradaDocumental))
      ? Number(volumenEsperadoM3EntradaDocumental)
      : volumenEsperadoM3;

  const metodoQ5PrincipalControlDocumental = Array.isArray(metodos)
    ? metodos.find((metodo) =>
        Number.isFinite(Number(metodo?.volumen)) ||
        Number.isFinite(Number(metodo?.volTotal)) ||
        Number.isFinite(Number(metodo?.volumenTotal)) ||
        Number.isFinite(Number(metodo?.volTotalM3))
      )
    : null;

  const volumenQ5PrincipalControlDocumental =
    Number(metodoQ5PrincipalControlDocumental?.volumen) ||
    Number(metodoQ5PrincipalControlDocumental?.volTotal) ||
    Number(metodoQ5PrincipalControlDocumental?.volumenTotal) ||
    Number(metodoQ5PrincipalControlDocumental?.volTotalM3);

  const relacionVolumenQ5EsperadoControlDocumental =
    Number.isFinite(Number(volumenQ5PrincipalControlDocumental)) &&
    Number.isFinite(Number(volumenEsperadoM3BloqueVolumenReferenciaDocumental)) &&
    Number(volumenEsperadoM3BloqueVolumenReferenciaDocumental) !== 0
      ? Number(volumenQ5PrincipalControlDocumental) /
        Number(volumenEsperadoM3BloqueVolumenReferenciaDocumental)
      : null;

  const resultadoConsistenciaVolumetricaControlDocumental =
    Number.isFinite(Number(relacionVolumenQ5EsperadoControlDocumental))
      ? "relación volumétrica documentada para control interno preliminar"
      : "relación volumétrica no disponible en contexto";

  const qTrActivoControlDocumental =
    contextoBase?.q_tr_activo?.etiqueta ??
    contextoBase?.q_tr_activo?.label ??
    contextoBase?.q_tr_activo?.tr_activo ??
    contextoBase?.q_tr_activo?.Tr ??
    contextoBase?.q_tr_activo?.TR ??
    contextoBase?.q_tr_activo?.periodoRetorno ??
    contextoBase?.q_tr_activo?.periodo_retorno ??
    trDisenoActivoExpedienteDocumental ??
    null;

  const texto = [
    "# Expediente hidrológico mínimo — Cuenca activa",
    "Estado técnico del expediente: BORRADOR GENERADO POR HELPER PURO INICIAL.",
    "Lectura técnica: este helper aún no reemplaza el expediente operativo construido en ComparadorMultiMetodo.jsx.",
    "Alcance: contrato inicial de construcción documental; no copia al portapapeles, no modifica UI y no recalcula resultados.",
    "",
    ...construirLineasIdentificacionExpediente({
      contextoBase,
      fechaGeneracion
    }),
    "",
    ...construirLineasParametrosHidrologicosBaseExpediente({
      contextoBase
    }),
    "",
    ...construirLineasTiempoConcentracionRolesTcExpediente({
      Tc_final,
      trDisenoActivoExpediente: trDisenoActivoExpedienteDocumental
    }),
    "",
    ...construirLineasVolumenReferenciaExpediente({
      peTotalMm: peTotalMmBloqueVolumenReferenciaDocumental,
      volumenEsperadoM3: volumenEsperadoM3BloqueVolumenReferenciaDocumental
    }),
    "",
    ...construirLineasEscenarioQTrActivoExpediente({
      estadoQTrActivoExpediente: contextoBase?.q_tr_activo_estado?.estado,
      qTrActivoExpediente: contextoBase?.q_tr_activo,
      faltantesQTrActivoExpediente: contextoBase?.q_tr_activo_faltantes,
      trDisenoActivoExpediente: trDisenoActivoExpedienteDocumental
    }),
    "",
    ...construirLineasResumenQ5AuditadoExpediente({
      metodosQ5: metodos,
      estadoResumenQ5AuditadoExpediente: "sección contractual inicial del helper puro"
    }),
    "",
    "## 7. Método Racional — contraste global independiente",
    "Uso: contraste global independiente de caudal pico.",
    "Carácter: no adoptivo principal; requiere revisión técnica antes de adopción.",
    "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
    "",
    ...construirLineasTablaMetodoRacionalExpediente(
      contextoBase?.metodo_racional?.resultados
    ),
    "",
    "## 8. Contraste Q-5 vs Método Racional",
    "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
    "",
    "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
    "Lectura técnica: control interno preliminar de consistencia volumétrica; no recalcula volumen, no recalcula Q-5 y no selecciona método adoptado.",
    `Pe total: ${formatearValorRacionalExpediente(peTotalMmBloqueVolumenReferenciaDocumental, " mm")}`,
    `Área: ${formatearValorRacionalExpediente(areaKm2, " km²", 4)}`,
    `Volumen esperado: ${formatearValorRacionalExpediente(volumenEsperadoM3BloqueVolumenReferenciaDocumental, " m³")}`,
    `Método Q-5 principal: ${metodoQ5PrincipalControlDocumental?.metodo ?? metodoQ5PrincipalControlDocumental?.nombre ?? "—"}`,
    `Volumen Q-5 principal: ${formatearValorRacionalExpediente(volumenQ5PrincipalControlDocumental, " m³")}`,
    `Relación volumen Q-5 / volumen esperado: ${formatearValorRacionalExpediente(relacionVolumenQ5EsperadoControlDocumental, "", 4)}`,
    `Resultado de consistencia volumétrica: ${resultadoConsistenciaVolumetricaControlDocumental}`,
    `Q-Tr activo: ${formatearValorRacionalExpediente(qTrActivoControlDocumental)}`,
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
    `Autor técnico: ${textoSeguro(autorTecnicoSelloDocumental, "—")}.`,
    "Tipo de salida: Expediente hidrológico mínimo.",
    `Tipo auxiliar: ${textoSeguro(tipoAuxiliarSelloDocumental, "expediente_hidrologico_minimo")}.`,
    `Versión del expediente: ${versionExpediente}`,
    `Fecha de generación: ${fechaGeneracion ?? "—"}`,
    "Alcance: helper puro inicial no integrado al botón de copiado.",
    "",
    "## 12. Restricciones y advertencias técnicas",
// OT-0228 — Acople mínimo helper restricciones y advertencias generales.
...construirBloqueRestriccionesAdvertenciasGeneralesExpediente({
  restriccionesGenerales: [
    "El expediente no modifica el motor hidrológico.",
    "El expediente no recalcula resultados.",
    "El bloque tiene alcance documental e interpretativo general."
  ],
  advertenciasGenerales: [
    "Las advertencias generales no implican adopción hidrológica.",
    "Los resultados sensibles deben revisarse en sus bloques específicos.",
    "Este bloque no sustituye la validación técnica especializada."
  ],
  alcanceGeneral: "Sección general de cautela documental del expediente.",
  incluirTitulo: false
}),
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

  return construirBloqueParametrosHidrologicosBaseExpediente({
    CN: contextoBase?.CN,
    CN_base: contextoBase?.CN_base,
    CN_efectivo: contextoBase?.CN_efectivo,
    AMC: contextoBase?.AMC,
    incluirTitulo: true
  });
}
export function construirLineasTiempoConcentracionRolesTcExpediente(entrada = {}) {
  return construirBloqueTiempoConcentracionRolesTcExpediente({
    Tc_final: entrada?.Tc_final,
    trDisenoActivoExpediente: entrada?.trDisenoActivoExpediente,
    incluirTitulo: true
  });
}
export function construirLineasVolumenReferenciaExpediente(entrada = {}) {
  return construirBloqueVolumenReferenciaExpediente({
    peTotalMm: entrada?.peTotalMm,
    volumenEsperadoM3: entrada?.volumenEsperadoM3,
    incluirTitulo: true
  });
}

export function construirLineasEscenarioQTrActivoExpediente(entrada = {}) {
  return construirBloqueEscenarioQTrActivoExpediente({
    estadoQTrActivoExpediente: entrada?.estadoQTrActivoExpediente,
    qTrActivoExpediente: entrada?.qTrActivoExpediente,
    faltantesQTrActivoExpediente: entrada?.faltantesQTrActivoExpediente,
    trDisenoActivoExpediente: entrada?.trDisenoActivoExpediente,
    incluirTitulo: true
  });
}
export function construirLineasResumenQ5AuditadoExpediente(entrada = {}) {
  return construirBloqueResumenQ5AuditadoExpediente({
    metodosQ5: entrada?.metodosQ5 ?? entrada?.metodos,
    estadoResumenQ5AuditadoExpediente: entrada?.estadoResumenQ5AuditadoExpediente,
    faltantesResumenQ5AuditadoExpediente: entrada?.faltantesResumenQ5AuditadoExpediente,
    incluirTitulo: true
  });
}

