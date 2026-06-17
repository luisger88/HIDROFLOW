import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rutaComparador = path.resolve("01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx");
const rutaModulo = path.resolve("01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js");
const rutaReporte = path.resolve("00_ADMIN/bitacora/OT-0203/OT-0203B_comparacion_helper_roles_tc_ruta_operativa.md");

const helperNombre = "construirLineasTiempoConcentracionRolesTcExpediente";

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

const lineasSegmento = segmentoTextoExpediente.split(/\r?\n/u);

const indiceRutaHelper = lineasSegmento.findIndex((linea) =>
  linea.includes(`...${helperNombre}({`)
);

assert.notEqual(
  indiceRutaHelper,
  -1,
  "Debe localizarse la expansión operativa del helper roles Tc."
);

const indiceFinRutaHelper = lineasSegmento.findIndex((linea, indice) =>
  indice > indiceRutaHelper && linea.includes("}),")
);

assert.notEqual(
  indiceFinRutaHelper,
  -1,
  "Debe localizarse el cierre de la expansión del helper roles Tc."
);

const rutaOperativaFiltrada = lineasSegmento
  .slice(indiceRutaHelper, indiceFinRutaHelper + 1)
  .join("\n");

const rutaOperativaUsaHelper =
  rutaOperativaFiltrada.includes(`...${helperNombre}({`);

const rutaOperativaPasaTcFinal =
  rutaOperativaFiltrada.includes("Tc_final");

const rutaOperativaPasaTrDisenoActivo =
  rutaOperativaFiltrada.includes("trDisenoActivoExpediente");

assert.equal(rutaOperativaUsaHelper, true, "La ruta operativa debe usar el helper roles Tc.");
assert.equal(rutaOperativaPasaTcFinal, true, "La ruta operativa debe pasar Tc_final.");
assert.equal(rutaOperativaPasaTrDisenoActivo, true, "La ruta operativa debe pasar trDisenoActivoExpediente.");

const modulo = await import(pathToFileURL(rutaModulo).href);
const helper = modulo[helperNombre];

assert.equal(
  typeof helper,
  "function",
  "Debe exportarse construirLineasTiempoConcentracionRolesTcExpediente como función."
);

const lineasHelper = helper({
  Tc_final: 114.23,
  trDisenoActivoExpediente: 100
});

assert.equal(Array.isArray(lineasHelper), true, "El helper debe retornar arreglo.");
assert.equal(lineasHelper.every((linea) => typeof linea === "string"), true, "Todas las líneas deben ser texto.");

const textoHelper = lineasHelper.join("\n");

const etiquetasEsperadas = [
  "## 3. Tiempo de concentración y roles Tc",
  "Tc comparador:",
  "Tr global activo:",
  "Roles Tc:"
];

const residuosProhibidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const etiquetasFaltantes = etiquetasEsperadas.filter((etiqueta) =>
  !textoHelper.includes(etiqueta)
);

const residuos = residuosProhibidos.filter((token) =>
  textoHelper.includes(token)
);

assert.deepEqual(etiquetasFaltantes, [], "El helper debe conservar encabezado y etiquetas mínimas.");
assert.deepEqual(residuos, [], "El helper no debe emitir residuos prohibidos.");

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  rutaOperativaUsaHelperRolesTc: rutaOperativaUsaHelper,
  rutaOperativaPasaTcFinal,
  rutaOperativaPasaTrDisenoActivo,
  helperExportado: typeof helper === "function",
  lineasHelper: lineasHelper.length,
  etiquetasFaltantes,
  residuos,
  comparacionControladaAprobada:
    rutaOperativaUsaHelper &&
    rutaOperativaPasaTcFinal &&
    rutaOperativaPasaTrDisenoActivo &&
    etiquetasFaltantes.length === 0 &&
    residuos.length === 0
};

const lineasReporte = [
  "# OT-0203B — Comparación helper roles Tc vs ruta operativa",
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
  "- La ruta operativa de `textoExpediente` usa la expansión del helper `construirLineasTiempoConcentracionRolesTcExpediente(...)`.",
  "- La ruta operativa pasa `Tc_final` al helper.",
  "- La ruta operativa pasa `trDisenoActivoExpediente` al helper.",
  "- El helper conserva el encabezado `## 3. Tiempo de concentración y roles Tc` y las etiquetas mínimas esperadas.",
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

console.log("COMPARACION_OT_0203_HELPER_ROLES_TC_RUTA_OPERATIVA_OK");
console.log(JSON.stringify(resumen, null, 2));
