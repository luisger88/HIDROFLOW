import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rutaComparador = path.resolve("01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx");
const rutaModulo = path.resolve("01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js");
const rutaReporte = path.resolve("00_ADMIN/bitacora/OT-0201/OT-0201B_auditoria_trazabilidad_tiempo_concentracion_roles_tc.md");

const helperNombre = "construirLineasTiempoConcentracionRolesTcExpediente";

const textoComparador = fs.readFileSync(rutaComparador, "utf8");
const textoModulo = fs.readFileSync(rutaModulo, "utf8");

const indiceTextoExpediente = textoComparador.indexOf("const textoExpediente = [");
const cierreTextoExpediente =
  indiceTextoExpediente === -1
    ? -1
    : textoComparador.indexOf('].join("\\n")', indiceTextoExpediente);

const segmentoTextoExpediente =
  indiceTextoExpediente === -1 || cierreTextoExpediente === -1
    ? ""
    : textoComparador.slice(
        indiceTextoExpediente,
        cierreTextoExpediente + '].join("\\n")'.length
      );

const lineasSegmento = segmentoTextoExpediente.split(/\r?\n/u);

const indiceRutaHelper = lineasSegmento.findIndex((linea) =>
  linea.includes(`...${helperNombre}({`)
);

const indiceFinRutaHelper =
  indiceRutaHelper === -1
    ? -1
    : lineasSegmento.findIndex((linea, indice) =>
        indice > indiceRutaHelper && linea.includes("}),")
      );

const rutaOperativa =
  indiceRutaHelper === -1 || indiceFinRutaHelper === -1
    ? ""
    : lineasSegmento.slice(indiceRutaHelper, indiceFinRutaHelper + 1).join("\n");

const rutaOperativaUsaHelper = rutaOperativa.includes(`...${helperNombre}({`);
const rutaOperativaUsaTcFinal = rutaOperativa.includes("Tc_final");
const rutaOperativaUsaTrDisenoActivo = rutaOperativa.includes("trDisenoActivoExpediente");
const helperExportadoEnModulo = textoModulo.includes(`export function ${helperNombre}`);

let helperImportable = false;
let salidaControlada = [];
let errorHelper = "";
let residuos = [];

const residuosProhibidos = ["undefined", "null", "NaN", "[object Object]"];

try {
  const modulo = await import(pathToFileURL(rutaModulo).href);
  const helper = modulo[helperNombre];

  helperImportable = typeof helper === "function";

  if (helperImportable) {
    const resultado = helper({
      Tc_final: 114.23,
      trDisenoActivoExpediente: 100
    });

    salidaControlada = Array.isArray(resultado)
      ? resultado
      : [`SALIDA_NO_ARREGLO: ${String(resultado)}`];

    const textoSalida = salidaControlada.join("\n");

    residuos = residuosProhibidos.filter((token) => textoSalida.includes(token));
  }
} catch (error) {
  errorHelper = error instanceof Error ? error.message : String(error);
}

const textoSalidaControlada = Array.isArray(salidaControlada)
  ? salidaControlada.join("\n")
  : String(salidaControlada);

const decisionPreliminar =
  rutaOperativaUsaHelper &&
  helperImportable &&
  residuos.length === 0
    ? "candidato apto para validación aislada posterior"
    : "requiere revisión antes de avanzar";

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  rutaOperativaLocalizada: rutaOperativa.length > 0,
  rutaOperativaUsaHelperTiempoConcentracionRolesTc: rutaOperativaUsaHelper,
  rutaOperativaUsaTcFinal,
  rutaOperativaUsaTrDisenoActivo,
  helperExportadoEnModulo,
  helperImportable,
  lineasSalidaControlada: salidaControlada.length,
  residuos,
  errorHelper,
  decisionPreliminar
};

const lineasReporte = [
  "# OT-0201B — Auditoría/trazabilidad bloque Tiempo de concentración y roles Tc",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Ruta operativa detectada en textoExpediente",
  "",
  rutaOperativa.length > 0
    ? "```javascript"
    : "No se localizó ruta operativa del helper dentro de `textoExpediente`.",
  ...(rutaOperativa.length > 0 ? [rutaOperativa, "```"] : []),
  "",
  "## Salida controlada del helper",
  "",
  "```text",
  textoSalidaControlada.length > 0
    ? textoSalidaControlada
    : "No se obtuvo salida controlada del helper.",
  "```",
  "",
  "## Lectura técnica",
  "",
  rutaOperativaUsaHelper
    ? "- La ruta operativa de `textoExpediente` usa el helper `construirLineasTiempoConcentracionRolesTcExpediente(...)`."
    : "- No se confirmó uso del helper dentro de `textoExpediente`.",
  rutaOperativaUsaTcFinal
    ? "- La ruta operativa pasa `Tc_final` al helper."
    : "- No se confirmó que la ruta operativa pase `Tc_final` al helper.",
  rutaOperativaUsaTrDisenoActivo
    ? "- La ruta operativa pasa `trDisenoActivoExpediente` al helper."
    : "- No se confirmó que la ruta operativa pase `trDisenoActivoExpediente` al helper.",
  helperImportable
    ? "- El helper se importa correctamente como función."
    : "- El helper no pudo importarse como función.",
  residuos.length === 0
    ? "- No se detectaron residuos `undefined`, `null`, `NaN` ni `[object Object]` en la salida controlada."
    : `- Se detectaron residuos en la salida controlada: ${residuos.join(", ")}.`,
  errorHelper.length === 0
    ? "- No se registró error al ejecutar el helper en escenario controlado."
    : `- Error al ejecutar helper en escenario controlado: ${errorHelper}.`,
  "",
  "## Decisión preliminar",
  "",
  decisionPreliminar,
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

console.log("AUDITORIA_OT_0201_TRAZABILIDAD_TIEMPO_CONCENTRACION_ROLES_TC_OK");
console.log(JSON.stringify(resumen, null, 2));
