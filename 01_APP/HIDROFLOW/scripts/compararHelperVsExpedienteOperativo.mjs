// OT-0112B — Comparación controlada helper vs expediente operativo.
// Este script NO toca UI, NO modifica ComparadorMultiMetodo.jsx,
// NO copia al portapapeles y NO reemplaza el expediente operativo.

import fs from "node:fs";
import path from "node:path";

import construirExpedienteHidrologicoMinimo, {
  SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO,
  TOKENS_INVALIDOS_EXPEDIENTE_MINIMO,
  VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
  validarTextoExpedienteMinimo
} from "../src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaComparador = path.resolve(
  process.cwd(),
  "src/components/ComparadorMultiMetodo.jsx"
);

const contextoMinimoSeguro = {
  cuencaNombre: "Contexto mínimo seguro OT-0112",
  area_km2: 46.8516,
  pendiente_media_pct: 8.43,
  longitud_cauce_km: 15.524,
  CN: 88,
  CN_base: 86,
  CN_efectivo: 88,
  AMC: "II",
  fuente: "script_comparacion_controlada_ot_0112",
  estacion_idf: "SAN CRISTOBAL",
  lluvia_efectiva_total_mm: 56.65,
  hidrogramas: [],
  metodo_racional: {
    resultados: []
  },
  tr_diseno_activo: 5,
  q_tr_activo_estado: {
    estado: "comparacion_controlada_no_operativa",
    q_tr_activo: {},
    campos_faltantes: [],
    fuente: "script_comparacion_controlada_ot_0112"
  }
};

const resultadoHelper = construirExpedienteHidrologicoMinimo({
  contextoBase: contextoMinimoSeguro,
  Tc_final: 114.2,
  metodos: [],
  filasMorfologiaQt: [],
  filasDictamenFormaQt: [],
  filasRiesgoTemporalQt: [],
  sintesisRiesgoTemporalQt: null,
  fechaGeneracion: "OT-0112-comparacion-controlada",
  versionExpediente: VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO
});

const textoHelper = resultadoHelper?.texto ?? "";
const validacionHelper = validarTextoExpedienteMinimo(textoHelper);

const fuenteOperativa = fs.existsSync(rutaComparador)
  ? fs.readFileSync(rutaComparador, "utf8")
  : "";

const marcadoresOperativos = [
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
  "## 12. Restricciones y advertencias técnicas",
  "Copiar expediente hidrológico mínimo",
  "adaptarExpedienteDocumental",
  "validarSeccionDiagnosticoTemporalQt",
  "tokensInvalidosExpediente",
  "seccionesObligatoriasExpediente"
];

const marcadoresEncontrados = marcadoresOperativos.filter((marcador) =>
  fuenteOperativa.includes(marcador)
);

const marcadoresFaltantes = marcadoresOperativos.filter(
  (marcador) => !fuenteOperativa.includes(marcador)
);

const seccionesHelperFaltantesEnOperativo =
  SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO.filter(
    (seccion) => !fuenteOperativa.includes(seccion)
  );

const seccionesOperativoFaltantesEnHelper =
  marcadoresOperativos
    .filter((marcador) => marcador.startsWith("#"))
    .filter((marcador) => !textoHelper.includes(marcador));

const tokensInvalidosHelper = TOKENS_INVALIDOS_EXPEDIENTE_MINIMO.filter(
  (token) => textoHelper.includes(token)
);

const brechas = [];

if (!resultadoHelper || typeof resultadoHelper !== "object") {
  brechas.push("El helper no retornó un objeto.");
}

if (resultadoHelper?.ok !== true) {
  brechas.push("El helper no retornó ok=true.");
}

if (!validacionHelper.ok) {
  brechas.push("La validación textual del helper no fue aprobada.");
}

if (tokensInvalidosHelper.length > 0) {
  brechas.push("El texto del helper contiene tokens inválidos.");
}

if (!fuenteOperativa) {
  brechas.push("No se pudo leer ComparadorMultiMetodo.jsx.");
}

if (marcadoresFaltantes.length > 0) {
  brechas.push("El expediente operativo no contiene todos los marcadores esperados.");
}

if (seccionesHelperFaltantesEnOperativo.length > 0) {
  brechas.push("Hay secciones obligatorias del helper no visibles en la fuente operativa.");
}

if (seccionesOperativoFaltantesEnHelper.length > 0) {
  brechas.push("Hay secciones operativas no presentes en el texto generado por el helper.");
}

const resumen = {
  ok: brechas.length === 0,
  helper: {
    ok: resultadoHelper?.ok ?? false,
    longitudTexto: textoHelper.length,
    errores: Array.isArray(resultadoHelper?.errores)
      ? resultadoHelper.errores.length
      : null,
    advertencias: Array.isArray(resultadoHelper?.advertencias)
      ? resultadoHelper.advertencias.length
      : null,
    secciones: Array.isArray(resultadoHelper?.secciones)
      ? resultadoHelper.secciones.length
      : null,
    tokensInvalidos: tokensInvalidosHelper.length,
    seccionesFaltantes: validacionHelper.seccionesFaltantes.length,
    versionExpediente: resultadoHelper?.metadata?.versionExpediente ?? null,
    estadoIntegracion: resultadoHelper?.metadata?.estadoIntegracion ?? null
  },
  operativo: {
    archivo: "src/components/ComparadorMultiMetodo.jsx",
    marcadoresEsperados: marcadoresOperativos.length,
    marcadoresEncontrados: marcadoresEncontrados.length,
    marcadoresFaltantes: marcadoresFaltantes.length
  },
  brechas: {
    total: brechas.length,
    items: brechas,
    marcadoresFaltantes,
    seccionesHelperFaltantesEnOperativo,
    seccionesOperativoFaltantesEnHelper
  }
};

console.log("OT-0112B — Comparación controlada helper vs expediente operativo");
console.log(JSON.stringify(resumen, null, 2));

if (brechas.length > 0) {
  console.error("COMPARACIÓN CONTROLADA CON BRECHAS:");
  brechas.forEach((brecha, indice) => {
    console.error(`${indice + 1}. ${brecha}`);
  });
  process.exit(1);
}

console.log(
  "COMPARACIÓN APROBADA: el helper y el expediente operativo comparten la estructura documental mínima esperada."
);