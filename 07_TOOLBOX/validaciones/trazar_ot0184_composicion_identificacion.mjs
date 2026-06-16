import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0184/OT-0184B_trazabilidad_composicion_identificacion.md"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const patrones = [
  "construirLineasIdentificacionExpediente",
  "lineasIdentificacion",
  "Identificación",
  "textoExpediente",
  "OT-0125D",
  "textoIdentificacionDelegadaDiagnostico",
  "diagnosticoIdentificacionDelegada",
  "areaTexto.value = textoExpediente",
  "window.prompt"
];

function obtenerContextos(textoFuente, patron, radio = 6) {
  const lineas = textoFuente.split(/\r?\n/u);
  const indices = [];

  lineas.forEach((linea, indice) => {
    if (linea.includes(patron)) {
      indices.push(indice);
    }
  });

  return indices.map((indice) => {
    const inicio = Math.max(0, indice - radio);
    const fin = Math.min(lineas.length, indice + radio + 1);

    return {
      patron,
      linea: indice + 1,
      contexto: lineas.slice(inicio, fin).join("\n")
    };
  });
}

const contextos = patrones.flatMap((patron) =>
  obtenerContextos(texto, patron)
);

const indiceTextoExpediente = texto.indexOf("const textoExpediente = [");

const cierreTextoExpediente =
  indiceTextoExpediente === -1
    ? -1
    : texto.indexOf('].join("\\n")', indiceTextoExpediente);

const segmentoTextoExpediente =
  indiceTextoExpediente === -1 || cierreTextoExpediente === -1
    ? ""
    : texto.slice(
        indiceTextoExpediente,
        cierreTextoExpediente + '].join("\\n")'.length
      );

const indiceDiagnosticoOt0125d = texto.indexOf(
  "// OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado."
);

const indiceHelperIdentificacion = texto.indexOf(
  "construirLineasIdentificacionExpediente"
);

const indiceAreaTexto = texto.indexOf("areaTexto.value = textoExpediente");

const indicePrompt = texto.indexOf(
  'window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente)'
);

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  helperIdentificacionDetectado: indiceHelperIdentificacion !== -1,
  helperDentroDeTextoExpediente:
    segmentoTextoExpediente.includes("construirLineasIdentificacionExpediente"),
  encabezadoLiteralDentroDeTextoExpediente:
    segmentoTextoExpediente.includes('"## 1. Identificación"'),
  encabezadoTextoDentroDeTextoExpediente:
    segmentoTextoExpediente.includes("## 1. Identificación"),
  diagnosticoOt0125dDetectado: indiceDiagnosticoOt0125d !== -1,
  diagnosticoDespuesDeTextoExpediente:
    cierreTextoExpediente !== -1 &&
    indiceDiagnosticoOt0125d !== -1 &&
    indiceDiagnosticoOt0125d > cierreTextoExpediente,
  areaTextoUsaTextoExpediente: indiceAreaTexto !== -1,
  promptUsaTextoExpediente: indicePrompt !== -1,
  totalContextos: contextos.length,
  decisionPreliminar:
    segmentoTextoExpediente.includes("construirLineasIdentificacionExpediente")
      ? "la identificación parece delegada dentro de textoExpediente por helper"
      : segmentoTextoExpediente.includes("## 1. Identificación")
        ? "la identificación aparece como texto dentro de textoExpediente"
        : "la ruta operativa aún no queda localizada dentro del segmento literal textoExpediente"
};

const lineasReporte = [
  "# OT-0184B — Trazabilidad composición bloque Identificación",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Contextos encontrados",
  "",
  ...contextos.flatMap((item, indice) => [
    `### Contexto ${indice + 1} — patrón \`${item.patron}\` línea ${item.linea}`,
    "",
    "```javascript",
    item.contexto,
    "```",
    ""
  ]),
  "## Lectura preliminar",
  "",
  resumen.helperDentroDeTextoExpediente
    ? "- El helper de identificación aparece dentro del segmento `textoExpediente`."
    : "- El helper de identificación no aparece dentro del segmento literal `textoExpediente`.",
  "",
  resumen.encabezadoLiteralDentroDeTextoExpediente
    ? "- El encabezado literal `\"## 1. Identificación\"` aparece dentro del segmento `textoExpediente`."
    : "- El encabezado literal `\"## 1. Identificación\"` no aparece dentro del segmento `textoExpediente`.",
  "",
  resumen.encabezadoTextoDentroDeTextoExpediente
    ? "- El texto `## 1. Identificación` aparece dentro del segmento `textoExpediente`."
    : "- El texto `## 1. Identificación` no aparece dentro del segmento `textoExpediente`.",
  "",
  resumen.diagnosticoDespuesDeTextoExpediente
    ? "- El diagnóstico OT-0125D aparece después del cierre de `textoExpediente`."
    : "- No se confirmó que el diagnóstico OT-0125D aparezca después del cierre de `textoExpediente`.",
  "",
  resumen.areaTextoUsaTextoExpediente
    ? "- El copiado sigue usando `areaTexto.value = textoExpediente`."
    : "- No se localizó `areaTexto.value = textoExpediente`.",
  "",
  resumen.promptUsaTextoExpediente
    ? "- El fallback manual sigue usando `window.prompt(..., textoExpediente)`."
    : "- No se localizó el fallback manual esperado con `textoExpediente`.",
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

console.log("TRAZABILIDAD_OT_0184_COMPOSICION_IDENTIFICACION_OK");
console.log(JSON.stringify(resumen, null, 2));
