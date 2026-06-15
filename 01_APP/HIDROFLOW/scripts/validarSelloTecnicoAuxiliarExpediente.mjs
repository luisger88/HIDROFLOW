// OT-0117B — Validación reforzada del sello técnico auxiliar delegado al helper.
// Este script NO toca UI, NO modifica ComparadorMultiMetodo.jsx,
// NO copia al portapapeles y NO reemplaza textoExpediente.

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

const metadataControlada = {
  versionExpediente: VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
  estadoIntegracion: "helper_no_integrado",
  tipoSalida: "expediente_hidrologico_minimo"
};

const lineas = construirLineasSelloTecnicoAuxiliarExpediente({
  metadata: metadataControlada
});

const textoSello = Array.isArray(lineas) ? lineas.join("\n") : "";

const fuenteComparador = fs.existsSync(rutaComparador)
  ? fs.readFileSync(rutaComparador, "utf8")
  : "";

const errores = [];

function verificar(condicion, mensaje) {
  if (!condicion) errores.push(mensaje);
}

verificar(Array.isArray(lineas), "La función de sello técnico no retornó un arreglo.");
verificar(lineas.length === 3, "El sello técnico auxiliar no contiene exactamente 3 líneas.");
verificar(typeof textoSello === "string" && textoSello.length > 0, "El texto del sello auxiliar está vacío.");

verificar(
  textoSello.includes("Versión auxiliar helper expediente:"),
  "Falta la línea de versión auxiliar del helper."
);

verificar(
  textoSello.includes("Estado auxiliar helper expediente:"),
  "Falta la línea de estado auxiliar del helper."
);

verificar(
  textoSello.includes("Tipo auxiliar helper expediente:"),
  "Falta la línea de tipo auxiliar del helper."
);

verificar(
  textoSello.includes(VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO),
  "La versión del expediente no aparece en el sello auxiliar."
);

verificar(
  textoSello.includes("helper_no_integrado"),
  "El estado de integración esperado no aparece en el sello auxiliar."
);

verificar(
  textoSello.includes("expediente_hidrologico_minimo"),
  "El tipo de salida esperado no aparece en el sello auxiliar."
);

const tokensDetectadosSello = TOKENS_INVALIDOS_EXPEDIENTE_MINIMO.filter((token) =>
  textoSello.includes(token)
);

verificar(
  tokensDetectadosSello.length === 0,
  "El sello auxiliar contiene tokens inválidos."
);

verificar(
  fuenteComparador.length > 0,
  "No se pudo leer src/components/ComparadorMultiMetodo.jsx."
);

verificar(
  fuenteComparador.includes("construirLineasSelloTecnicoAuxiliarExpediente"),
  "ComparadorMultiMetodo.jsx no referencia construirLineasSelloTecnicoAuxiliarExpediente."
);

verificar(
  fuenteComparador.includes("## 11. Sello técnico de generación"),
  "ComparadorMultiMetodo.jsx no contiene el bloque ## 11. Sello técnico de generación."
);

verificar(
  fuenteComparador.includes("diagnosticoHelperExpediente?.metadata"),
  "ComparadorMultiMetodo.jsx no usa metadata del diagnóstico helper."
);

verificar(
  fuenteComparador.includes("textoExpediente"),
  "ComparadorMultiMetodo.jsx no conserva referencia a textoExpediente."
);

verificar(
  fuenteComparador.includes("document.execCommand(\"copy\")") ||
    fuenteComparador.includes("document.execCommand('copy')"),
  "No se encontró el mecanismo existente document.execCommand copy."
);

const resumen = {
  ok: errores.length === 0,
  lineasSello: Array.isArray(lineas) ? lineas.length : null,
  tokensDetectadosSello: tokensDetectadosSello.length,
  versionExpediente: metadataControlada.versionExpediente,
  estadoIntegracion: metadataControlada.estadoIntegracion,
  tipoSalida: metadataControlada.tipoSalida,
  comparador: {
    contieneFuncionAuxiliar: fuenteComparador.includes(
      "construirLineasSelloTecnicoAuxiliarExpediente"
    ),
    contieneBloqueSello: fuenteComparador.includes(
      "## 11. Sello técnico de generación"
    ),
    usaMetadataHelper: fuenteComparador.includes(
      "diagnosticoHelperExpediente?.metadata"
    ),
    conservaTextoExpediente: fuenteComparador.includes("textoExpediente")
  }
};

console.log("OT-0117B — Validación reforzada sello técnico auxiliar delegado");
console.log(JSON.stringify(resumen, null, 2));

if (errores.length > 0) {
  console.error("VALIDACIÓN FALLIDA:");
  errores.forEach((error, indice) => {
    console.error(`${indice + 1}. ${error}`);
  });
  process.exit(1);
}

console.log(
  "VALIDACIÓN APROBADA: sello técnico auxiliar delegado al helper completo y sin tokens inválidos."
);