// OT-0118B — Validación contractual del sello técnico delegado.
// Este script congela el contrato del bloque auxiliar de sello técnico.
// No toca UI, no modifica textoExpediente, no copia al portapapeles y no amplía funcionalidad.

import fs from "node:fs";
import path from "node:path";

import {
  construirLineasSelloTecnicoAuxiliarExpediente,
  TOKENS_INVALIDOS_EXPEDIENTE_MINIMO,
  VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO
} from "../src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaComparador = path.resolve(
  process.cwd(),
  "src/components/ComparadorMultiMetodo.jsx"
);

const metadataCompleta = {
  versionExpediente: VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
  estadoIntegracion: "helper_no_integrado",
  tipoSalida: "expediente_hidrologico_minimo"
};

const lineasContrato = construirLineasSelloTecnicoAuxiliarExpediente({
  metadata: metadataCompleta
});

const lineasFallback = construirLineasSelloTecnicoAuxiliarExpediente({});

const textoContrato = Array.isArray(lineasContrato) ? lineasContrato.join("\n") : "";
const textoFallback = Array.isArray(lineasFallback) ? lineasFallback.join("\n") : "";

const fuenteComparador = fs.existsSync(rutaComparador)
  ? fs.readFileSync(rutaComparador, "utf8")
  : "";

const errores = [];

function verificar(condicion, mensaje) {
  if (!condicion) errores.push(mensaje);
}

function contieneTokensInvalidos(texto) {
  return TOKENS_INVALIDOS_EXPEDIENTE_MINIMO.filter((token) =>
    String(texto ?? "").includes(token)
  );
}

verificar(
  typeof construirLineasSelloTecnicoAuxiliarExpediente === "function",
  "La función construirLineasSelloTecnicoAuxiliarExpediente no existe."
);

verificar(
  Array.isArray(lineasContrato),
  "La función no devuelve un arreglo con metadata completa."
);

verificar(
  Array.isArray(lineasFallback),
  "La función no devuelve un arreglo con metadata fallback."
);

verificar(
  lineasContrato.length === 3,
  "El contrato exige exactamente 3 líneas con metadata completa."
);

verificar(
  lineasFallback.length === 3,
  "El contrato exige exactamente 3 líneas con metadata fallback."
);

const prefijosObligatorios = [
  "Versión auxiliar helper expediente:",
  "Estado auxiliar helper expediente:",
  "Tipo auxiliar helper expediente:"
];

prefijosObligatorios.forEach((prefijo) => {
  verificar(
    lineasContrato.some((linea) => String(linea).startsWith(prefijo)),
    `Falta prefijo obligatorio con metadata completa: ${prefijo}`
  );

  verificar(
    lineasFallback.some((linea) => String(linea).startsWith(prefijo)),
    `Falta prefijo obligatorio con metadata fallback: ${prefijo}`
  );
});

verificar(
  textoContrato.includes(VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO),
  "La versión contractual no aparece con metadata completa."
);

verificar(
  textoContrato.includes("helper_no_integrado"),
  "El estado contractual helper_no_integrado no aparece con metadata completa."
);

verificar(
  textoContrato.includes("expediente_hidrologico_minimo"),
  "El tipo contractual expediente_hidrologico_minimo no aparece con metadata completa."
);

verificar(
  textoFallback.includes("no integrada"),
  "El fallback de versión no integrada no aparece."
);

verificar(
  textoFallback.includes("no informado"),
  "El fallback de estado no informado no aparece."
);

verificar(
  textoFallback.includes("expediente_hidrologico_minimo"),
  "El fallback de tipo de salida no aparece."
);

const tokensContrato = contieneTokensInvalidos(textoContrato);
const tokensFallback = contieneTokensInvalidos(textoFallback);

verificar(tokensContrato.length === 0, "El contrato completo contiene tokens inválidos.");
verificar(tokensFallback.length === 0, "El contrato fallback contiene tokens inválidos.");

verificar(
  fuenteComparador.includes("construirLineasSelloTecnicoAuxiliarExpediente"),
  "ComparadorMultiMetodo.jsx no consume la función auxiliar del sello técnico."
);

verificar(
  fuenteComparador.includes("diagnosticoHelperExpediente?.metadata"),
  "ComparadorMultiMetodo.jsx no consume metadata del diagnóstico helper."
);

verificar(
  fuenteComparador.includes("textoExpediente"),
  "ComparadorMultiMetodo.jsx no conserva textoExpediente como fuente operativa."
);

verificar(
  fuenteComparador.includes("## 11. Sello técnico de generación"),
  "ComparadorMultiMetodo.jsx no conserva el bloque ## 11. Sello técnico de generación."
);

verificar(
  fuenteComparador.includes("document.execCommand(\"copy\")") ||
    fuenteComparador.includes("document.execCommand('copy')"),
  "No se encontró el mecanismo de copiado existente document.execCommand."
);

const resumen = {
  ok: errores.length === 0,
  contrato: {
    lineasMetadataCompleta: Array.isArray(lineasContrato) ? lineasContrato.length : null,
    lineasFallback: Array.isArray(lineasFallback) ? lineasFallback.length : null,
    prefijosObligatorios: prefijosObligatorios.length,
    tokensContrato: tokensContrato.length,
    tokensFallback: tokensFallback.length,
    versionExpediente: VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO
  },
  comparador: {
    consumeFuncionAuxiliar: fuenteComparador.includes(
      "construirLineasSelloTecnicoAuxiliarExpediente"
    ),
    consumeMetadataHelper: fuenteComparador.includes(
      "diagnosticoHelperExpediente?.metadata"
    ),
    conservaTextoExpediente: fuenteComparador.includes("textoExpediente"),
    conservaBloqueSello: fuenteComparador.includes(
      "## 11. Sello técnico de generación"
    )
  }
};

console.log("OT-0118B — Validación contractual sello técnico delegado");
console.log(JSON.stringify(resumen, null, 2));

if (errores.length > 0) {
  console.error("VALIDACIÓN CONTRACTUAL FALLIDA:");
  errores.forEach((error, indice) => {
    console.error(`${indice + 1}. ${error}`);
  });
  process.exit(1);
}

console.log(
  "VALIDACIÓN CONTRACTUAL APROBADA: sello técnico delegado cumple contrato estable."
);
``
