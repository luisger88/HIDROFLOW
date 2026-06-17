import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaModulo = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0188/OT-0188B_comparacion_helper_identificacion_ruta_operativa.md"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");

const indiceTextoExpediente = textoComparador.indexOf("const textoExpediente = [");

assert.notEqual(
  indiceTextoExpediente,
  -1,
  "Debe existir const textoExpediente = [."
);

const cierreTextoExpediente = textoComparador.indexOf(
  '].join("\\n")',
  indiceTextoExpediente
);

assert.notEqual(
  cierreTextoExpediente,
  -1,
  "Debe existir cierre ].join(\"\\n\") de textoExpediente."
);

const segmentoTextoExpediente = textoComparador.slice(
  indiceTextoExpediente,
  cierreTextoExpediente + '].join("\\n")'.length
);

const usaHelperIdentificacion =
  segmentoTextoExpediente.includes("...construirLineasIdentificacionExpediente({");

const pasaContextoBase =
  segmentoTextoExpediente.includes("contextoBase");

const conservaFuenteFallback =
  segmentoTextoExpediente.includes('fuenteFallback: "HidroFlow"');

const conservaEstacionIdfFallback =
  segmentoTextoExpediente.includes("estacionIdfFallback: estacionIdfExpediente");

assert.equal(
  usaHelperIdentificacion,
  true,
  "La ruta operativa debe expandir construirLineasIdentificacionExpediente dentro de textoExpediente."
);

assert.equal(
  pasaContextoBase,
  true,
  "La ruta operativa debe pasar contextoBase al helper."
);

assert.equal(
  conservaFuenteFallback,
  true,
  "La ruta operativa debe conservar fuenteFallback: \"HidroFlow\"."
);

assert.equal(
  conservaEstacionIdfFallback,
  true,
  "La ruta operativa debe conservar estacionIdfFallback: estacionIdfExpediente."
);

const modulo = await import(pathToFileURL(rutaModulo).href);

const { construirLineasIdentificacionExpediente } = modulo;

assert.equal(
  typeof construirLineasIdentificacionExpediente,
  "function",
  "Debe exportarse construirLineasIdentificacionExpediente como función."
);

const contextoBaseControl = {
  cuenca: {
    nombre: "La Iguaná PC_80"
  },
  fuente: "Control OT-0188"
};

const estacionIdfExpedienteControl = "IDF_CONTROL";

const lineasHelper = construirLineasIdentificacionExpediente({
  contextoBase: contextoBaseControl,
  fuenteFallback: "HidroFlow",
  estacionIdfFallback: estacionIdfExpedienteControl
});

assert.equal(
  Array.isArray(lineasHelper),
  true,
  "El helper debe retornar arreglo."
);

assert.equal(
  lineasHelper.every((linea) => typeof linea === "string"),
  true,
  "Todas las líneas del helper deben ser texto."
);

const textoHelper = lineasHelper.join("\n");

const residuosProhibidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const residuos = residuosProhibidos.filter((token) =>
  textoHelper.includes(token)
);

assert.deepEqual(
  residuos,
  [],
  "El helper saneado no debe emitir residuos prohibidos."
);

assert.equal(
  textoHelper.includes("## 1. Identificación"),
  true,
  "El helper debe emitir encabezado ## 1. Identificación."
);

assert.equal(
  textoHelper.includes("Cuenca: La Iguaná PC_80"),
  true,
  "El helper saneado debe resolver cuenca objeto a La Iguaná PC_80."
);

assert.equal(
  textoHelper.includes("Cuenca: [object Object]"),
  false,
  "El helper saneado no debe emitir Cuenca: [object Object]."
);

const lineasSegmentoExpediente = segmentoTextoExpediente.split(/\r?\n/u);

const indiceRutaHelper = lineasSegmentoExpediente.findIndex((linea) =>
  linea.includes("...construirLineasIdentificacionExpediente({")
);

assert.notEqual(
  indiceRutaHelper,
  -1,
  "Debe localizarse la expansión operativa del helper Identificación."
);

const indiceFinRutaHelper = lineasSegmentoExpediente.findIndex((linea, indice) =>
  indice > indiceRutaHelper && linea.includes("}),")
);

assert.notEqual(
  indiceFinRutaHelper,
  -1,
  "Debe localizarse el cierre de la expansión del helper Identificación."
);

const rutaOperativaFiltrada = lineasSegmentoExpediente
  .slice(indiceRutaHelper, indiceFinRutaHelper + 1)
  .join("\n");

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  rutaOperativaUsaHelperIdentificacion: usaHelperIdentificacion,
  rutaOperativaPasaContextoBase: pasaContextoBase,
  rutaOperativaConservaFuenteFallback: conservaFuenteFallback,
  rutaOperativaConservaEstacionIdfFallback: conservaEstacionIdfFallback,
  helperExportado: typeof construirLineasIdentificacionExpediente === "function",
  lineasHelper: lineasHelper.length,
  helperContieneEncabezado: textoHelper.includes("## 1. Identificación"),
  helperContieneCuencaObjetoSaneada: textoHelper.includes("Cuenca: La Iguaná PC_80"),
  residuos,
  comparacionControladaAprobada:
    residuos.length === 0 &&
    usaHelperIdentificacion &&
    pasaContextoBase &&
    conservaFuenteFallback &&
    conservaEstacionIdfFallback
};

const lineasReporte = [
  "# OT-0188B — Comparación helper Identificación vs ruta operativa",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Ruta operativa detectada en textoExpediente",
  "",
  "```javascript",
  rutaOperativaFiltrada,
  "```",
  "",
  "## Salida controlada del helper saneado",
  "",
  "```text",
  textoHelper,
  "```",
  "",
  "## Lectura técnica",
  "",
  "- La ruta operativa de `textoExpediente` usa la expansión del helper `construirLineasIdentificacionExpediente(...)`.",
  "- La ruta operativa conserva `contextoBase`, `fuenteFallback: \"HidroFlow\"` y `estacionIdfFallback: estacionIdfExpediente`.",
  "- El helper saneado resuelve `contextoBase.cuenca` como objeto usando una representación textual competente.",
  "- No se detectaron residuos `undefined`, `null`, `NaN` ni `[object Object]` en la salida controlada.",
  "",
  "## Restricciones mantenidas",
  "",
  "- No se modificó `ComparadorMultiMetodo.jsx`.",
  "- No se modificó `construirExpedienteHidrologicoMinimo.js`.",
  "- No se modificó `textoExpediente`.",
  "- No se modificó botón de copiado.",
  "- No se modificó portapapeles.",
  "- No se tocó Q-5 operativo.",
  "- No se tocó Método Racional.",
  "- No se tocó diagnóstico Q(t).",
  "- No se tocó motor hidrológico."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log("COMPARACION_OT_0188_HELPER_IDENTIFICACION_RUTA_OPERATIVA_OK");
console.log(JSON.stringify(resumen, null, 2));

