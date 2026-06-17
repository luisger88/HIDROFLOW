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
  "00_ADMIN/bitacora/OT-0196/OT-0196B_auditoria_trazabilidad_sello_tecnico_auxiliar.md"
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

const helperNombre = "construirLineasSelloTecnicoAuxiliarExpediente";

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

const mencionaSelloTecnico =
  segmentoTextoExpediente.includes("Sello técnico") ||
  segmentoTextoExpediente.includes("sello técnico") ||
  segmentoTextoExpediente.includes("Sello tecnico") ||
  segmentoTextoExpediente.includes("sello tecnico");

const usaHelperSelloTecnico =
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
        fuente: "Control OT-0196",
        cuenca: {
          nombre: "La Iguaná PC_80"
        }
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
  mencionaSelloTecnico,
  rutaOperativaUsaHelperSelloTecnico: usaHelperSelloTecnico,
  rutaOperativaLocalizada: rutaOperativa.length > 0,
  rutaOperativaPasaContextoBase: pasaContextoBase,
  helperExportadoEnModulo,
  helperImportable,
  lineasSalidaControlada: Array.isArray(salidaControlada) ? salidaControlada.length : 0,
  residuos,
  errorHelper,
  decisionPreliminar:
    usaHelperSelloTecnico && helperImportable && residuos.length === 0
      ? "candidato apto para validación aislada posterior"
      : "requiere revisión antes de avanzar"
};

const lineasReporte = [
  "# OT-0196B — Auditoría/trazabilidad bloque Sello técnico auxiliar",
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
  usaHelperSelloTecnico
    ? "- La ruta operativa de `textoExpediente` usa el helper `construirLineasSelloTecnicoAuxiliarExpediente(...)`."
    : "- No se confirmó uso del helper `construirLineasSelloTecnicoAuxiliarExpediente(...)` dentro de `textoExpediente`.",
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

console.log("AUDITORIA_OT_0196_TRAZABILIDAD_SELLO_TECNICO_AUXILIAR_OK");
console.log(JSON.stringify(resumen, null, 2));
