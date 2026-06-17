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
  "00_ADMIN/bitacora/OT-0191/OT-0191B_auditoria_trazabilidad_parametros_base.md"
);

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

const helperNombre = "construirLineasParametrosHidrologicosBaseExpediente";

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

const encabezadoLiteralDentroTextoExpediente =
  segmentoTextoExpediente.includes("## 2. Parámetros hidrológicos base");

const usaHelperParametrosBase =
  segmentoTextoExpediente.includes(`...${helperNombre}({`);

const pasaContextoBase =
  rutaOperativa.includes("contextoBase");

const helperExportadoEnModulo =
  textoModulo.includes(`export function ${helperNombre}`);

let helperImportable = false;
let salidaControlada = [];
let errorHelper = "";
let residuos = [];

const residuosProhibidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

try {
  const modulo = await import(pathToFileURL(rutaModulo).href);
  const helper = modulo[helperNombre];

  helperImportable = typeof helper === "function";

  if (helperImportable) {
    const resultado = helper({
      contextoBase: {
        areaKm2: 46.8516,
        area: 46.8516,
        pendienteMedia: 8.43,
        pendienteMediaPct: 8.43,
        longitudCaucePrincipalKm: 15.524,
        longitudCaucePrincipal: 15.524,
        fuente: "Control OT-0191"
      }
    });

    salidaControlada = Array.isArray(resultado)
      ? resultado
      : [`SALIDA_NO_ARREGLO: ${String(resultado)}`];

    const textoSalida = salidaControlada.join("\n");

    residuos = residuosProhibidos.filter((token) =>
      textoSalida.includes(token)
    );
  }
} catch (error) {
  errorHelper = error instanceof Error ? error.message : String(error);
}

const textoSalidaControlada = Array.isArray(salidaControlada)
  ? salidaControlada.join("\n")
  : String(salidaControlada);

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  encabezadoLiteralDentroTextoExpediente,
  rutaOperativaUsaHelperParametrosBase: usaHelperParametrosBase,
  rutaOperativaLocalizada: rutaOperativa.length > 0,
  rutaOperativaPasaContextoBase: pasaContextoBase,
  helperExportadoEnModulo,
  helperImportable,
  lineasSalidaControlada: Array.isArray(salidaControlada) ? salidaControlada.length : 0,
  residuos,
  errorHelper,
  decisionPreliminar:
    usaHelperParametrosBase && helperImportable && residuos.length === 0
      ? "candidato apto para validación aislada posterior"
      : "requiere revisión antes de avanzar"
};

const lineasReporte = [
  "# OT-0191B — Auditoría/trazabilidad bloque Parámetros hidrológicos base",
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
  usaHelperParametrosBase
    ? "- La ruta operativa de `textoExpediente` usa el helper `construirLineasParametrosHidrologicosBaseExpediente(...)`."
    : "- No se confirmó uso del helper `construirLineasParametrosHidrologicosBaseExpediente(...)` dentro de `textoExpediente`.",
  "",
  pasaContextoBase
    ? "- La ruta operativa pasa `contextoBase` al helper."
    : "- No se confirmó que la ruta operativa pase `contextoBase` al helper.",
  "",
  helperImportable
    ? "- El helper se importa correctamente como función."
    : "- El helper no pudo importarse como función.",
  "",
  residuos.length === 0
    ? "- No se detectaron residuos `undefined`, `null`, `NaN` ni `[object Object]` en la salida controlada."
    : `- Se detectaron residuos en la salida controlada: ${residuos.join(", ")}.`,
  "",
  errorHelper.length === 0
    ? "- No se registró error al ejecutar el helper en escenario controlado."
    : `- Error al ejecutar helper en escenario controlado: ${errorHelper}.`,
  "",
  "## Decisión preliminar",
  "",
  resumen.decisionPreliminar,
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

console.log("AUDITORIA_OT_0191_TRAZABILIDAD_PARAMETROS_BASE_OK");
console.log(JSON.stringify(resumen, null, 2));
