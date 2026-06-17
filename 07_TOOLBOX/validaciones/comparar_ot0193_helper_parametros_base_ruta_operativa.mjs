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
  "00_ADMIN/bitacora/OT-0193/OT-0193B_comparacion_helper_parametros_base_ruta_operativa.md"
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

const helperNombre = "construirLineasParametrosHidrologicosBaseExpediente";

const lineasSegmentoExpediente = segmentoTextoExpediente.split(/\r?\n/u);

const indiceRutaHelper = lineasSegmentoExpediente.findIndex((linea) =>
  linea.includes(`...${helperNombre}({`)
);

assert.notEqual(
  indiceRutaHelper,
  -1,
  "Debe localizarse la expansión operativa del helper Parámetros base."
);

const indiceFinRutaHelper = lineasSegmentoExpediente.findIndex((linea, indice) =>
  indice > indiceRutaHelper && linea.includes("}),")
);

assert.notEqual(
  indiceFinRutaHelper,
  -1,
  "Debe localizarse el cierre de la expansión del helper Parámetros base."
);

const rutaOperativaFiltrada = lineasSegmentoExpediente
  .slice(indiceRutaHelper, indiceFinRutaHelper + 1)
  .join("\n");

const rutaOperativaUsaHelper =
  rutaOperativaFiltrada.includes(`...${helperNombre}({`);

const rutaOperativaPasaContextoBase =
  rutaOperativaFiltrada.includes("contextoBase");

assert.equal(
  rutaOperativaUsaHelper,
  true,
  "La ruta operativa debe usar el helper Parámetros base."
);

assert.equal(
  rutaOperativaPasaContextoBase,
  true,
  "La ruta operativa debe pasar contextoBase."
);

const modulo = await import(pathToFileURL(rutaModulo).href);

const { construirLineasParametrosHidrologicosBaseExpediente } = modulo;

assert.equal(
  typeof construirLineasParametrosHidrologicosBaseExpediente,
  "function",
  "Debe exportarse construirLineasParametrosHidrologicosBaseExpediente como función."
);

const lineasHelper = construirLineasParametrosHidrologicosBaseExpediente({
  contextoBase: {
    CN: 83,
    cn_base: 80,
    cn_efectivo: 87,
    AMC: "III",
    fuente: "Control OT-0193"
  }
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

const etiquetasEsperadas = [
  "## 2. Parámetros hidrológicos base",
  "CN:",
  "CN base:",
  "CN efectivo:",
  "AMC:"
];

const etiquetasFaltantes = etiquetasEsperadas.filter((etiqueta) =>
  !textoHelper.includes(etiqueta)
);

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
  etiquetasFaltantes,
  [],
  "El helper debe conservar encabezado y etiquetas mínimas."
);

assert.deepEqual(
  residuos,
  [],
  "El helper no debe emitir residuos prohibidos."
);

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  rutaOperativaUsaHelperParametrosBase: rutaOperativaUsaHelper,
  rutaOperativaPasaContextoBase,
  helperExportado: typeof construirLineasParametrosHidrologicosBaseExpediente === "function",
  lineasHelper: lineasHelper.length,
  etiquetasFaltantes,
  residuos,
  comparacionControladaAprobada:
    rutaOperativaUsaHelper &&
    rutaOperativaPasaContextoBase &&
    etiquetasFaltantes.length === 0 &&
    residuos.length === 0
};

const lineasReporte = [
  "# OT-0193B — Comparación helper Parámetros base vs ruta operativa",
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
  "## Salida controlada del helper validado",
  "",
  "```text",
  textoHelper,
  "```",
  "",
  "## Lectura técnica",
  "",
  "- La ruta operativa de `textoExpediente` usa la expansión del helper `construirLineasParametrosHidrologicosBaseExpediente(...)`.",
  "- La ruta operativa pasa `contextoBase` al helper.",
  "- El helper conserva el encabezado `## 2. Parámetros hidrológicos base` y las etiquetas mínimas esperadas.",
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

console.log("COMPARACION_OT_0193_HELPER_PARAMETROS_BASE_RUTA_OPERATIVA_OK");
console.log(JSON.stringify(resumen, null, 2));
