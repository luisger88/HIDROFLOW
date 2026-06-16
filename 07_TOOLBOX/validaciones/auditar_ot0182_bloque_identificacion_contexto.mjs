import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0182/OT-0182B_auditoria_bloque_identificacion_contexto.md"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const indiceTextoExpediente = texto.indexOf("const textoExpediente = [");

assert.notEqual(
  indiceTextoExpediente,
  -1,
  "Debe existir textoExpediente."
);

const desdeTextoExpediente = texto.slice(indiceTextoExpediente);
const lineas = desdeTextoExpediente.split(/\r?\n/u);

const patronesInicio = [
  '"## 1. Identificación"',
  '"## 1. Identificación y contexto general"',
  '"## 1. Contexto general"',
  '"## 1. Identificación del expediente"',
  "## 1. Identificación",
  "## 1. Contexto general",
  "Identificación"
];

const indiceInicio = lineas.findIndex((linea) =>
  patronesInicio.some((patron) => linea.includes(patron))
);

const indiceSiguienteBloque = indiceInicio === -1
  ? -1
  : lineas.findIndex((linea, indice) =>
      indice > indiceInicio &&
      (
        linea.includes('"## 2.') ||
        linea.includes("## 2.")
      )
    );

const bloque = indiceInicio === -1
  ? []
  : indiceSiguienteBloque === -1
    ? lineas.slice(indiceInicio, Math.min(indiceInicio + 40, lineas.length))
    : lineas.slice(indiceInicio, indiceSiguienteBloque);

const textoBloque = bloque.join("\n");

const tokensSensibles = [
  "Q-5",
  "Qp",
  "Tp",
  "hidrograma",
  "hidrogramas",
  "Método Racional",
  "Racional",
  "diagnóstico Q(t)",
  "Q(t)",
  "motor hidrológico",
  "calcular",
  "recalcular"
];

const tokensEncontrados = tokensSensibles.filter((token) =>
  textoBloque.includes(token)
);

const referenciasVariables = bloque
  .map((linea, indice) => ({
    lineaRelativa: indice + 1,
    texto: linea
  }))
  .filter((item) =>
    item.texto.includes("${") ||
    item.texto.includes("formatear") ||
    item.texto.includes("??") ||
    item.texto.includes("?.") ||
    item.texto.includes(" + ") ||
    item.texto.includes("String(")
  );

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  bloqueEncontrado: indiceInicio !== -1,
  indiceInicio,
  indiceSiguienteBloque,
  lineasBloque: bloque.length,
  encabezadoDetectado: bloque[0]?.trim() ?? "",
  tokensSensiblesEncontrados: tokensEncontrados,
  referenciasVariablesDetectadas: referenciasVariables.length,
  aptitudPreliminarHelper:
    indiceInicio === -1
      ? "no evaluable: bloque no localizado por patrones simples"
      : tokensEncontrados.length === 0
        ? "candidato representacional probable"
        : "requiere revisión adicional"
};

const lineasReporte = [
  "# OT-0182B — Auditoría bloque Identificación / contexto general",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque extraído",
  "",
  "```javascript",
  textoBloque.length > 0 ? textoBloque : "No se localizó bloque por patrones simples.",
  "```",
  "",
  "## Lectura técnica",
  "",
  indiceInicio === -1
    ? "- No se localizó un bloque `## 1. Identificación` o equivalente mediante los patrones simples definidos. Se requiere inspección o extracción reforzada antes de diseñar helper."
    : "- Se localizó un bloque candidato de identificación / contexto general dentro de `textoExpediente`.",
  "",
  tokensEncontrados.length === 0
    ? "- No se detectaron referencias textuales directas a Q-5, Qp, Tp, hidrogramas, Método Racional, Q(t) o motor hidrológico dentro del bloque extraído."
    : `- Se detectaron referencias sensibles dentro del bloque: ${tokensEncontrados.join(", ")}.`,
  "",
  referenciasVariables.length === 0
    ? "- No se detectaron señales simples de interpolación o formateo dinámico en el bloque extraído."
    : "- Se detectaron posibles referencias dinámicas o de formateo que deben revisarse antes de diseñar helper.",
  "",
  "## Referencias dinámicas detectadas",
  "",
  referenciasVariables.length === 0
    ? "No se detectaron referencias dinámicas simples."
    : referenciasVariables.map((item) => `- Línea ${item.lineaRelativa}: \`${item.texto.trim()}\``).join("\n"),
  "",
  "## Decisión preliminar",
  "",
  indiceInicio === -1
    ? "El bloque no debe avanzar todavía a contrato/helper. Se recomienda una extracción reforzada en una OT posterior."
    : tokensEncontrados.length === 0
      ? "El bloque es candidato preliminar para un ciclo posterior de contrato/diseño de helper, sujeto a extracción exacta y validación."
      : "El bloque no debe avanzar todavía a helper sin auditoría adicional.",
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

console.log("AUDITORIA_OT_0182_BLOQUE_IDENTIFICACION_CONTEXTO_OK");
console.log(JSON.stringify(resumen, null, 2));
