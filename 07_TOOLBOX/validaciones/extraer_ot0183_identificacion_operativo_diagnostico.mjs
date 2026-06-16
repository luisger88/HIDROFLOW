import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0183/OT-0183B_extraccion_reforzada_identificacion_operativo_diagnostico.md"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const inicioTextoExpediente = texto.indexOf("const textoExpediente = [");

assert.notEqual(
  inicioTextoExpediente,
  -1,
  "Debe existir const textoExpediente = [."
);

const cierreTextoExpediente = texto.indexOf('].join("\\n")', inicioTextoExpediente);

assert.notEqual(
  cierreTextoExpediente,
  -1,
  "Debe encontrarse el cierre ].join(\"\\n\") del arreglo textoExpediente."
);

const segmentoTextoExpediente = texto.slice(
  inicioTextoExpediente,
  cierreTextoExpediente + '].join("\\n")'.length
);

const lineasExpediente = segmentoTextoExpediente.split(/\r?\n/u);

const indiceBloque1 = lineasExpediente.findIndex((linea) =>
  linea.includes('"## 1. Identificación"')
);

const indiceBloque2 =
  indiceBloque1 === -1
    ? -1
    : lineasExpediente.findIndex((linea, indice) =>
        indice > indiceBloque1 && linea.includes('"## 2.')
      );

const bloqueOperativo =
  indiceBloque1 === -1
    ? []
    : indiceBloque2 === -1
      ? lineasExpediente.slice(indiceBloque1, Math.min(indiceBloque1 + 40, lineasExpediente.length))
      : lineasExpediente.slice(indiceBloque1, indiceBloque2);

const textoBloqueOperativo = bloqueOperativo.join("\n");

const indiceDiagnosticoOt0125d = texto.indexOf(
  "// OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado."
);

const indiceHelperIdentificacion = texto.indexOf("construirLineasIdentificacionExpediente");

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

const tokensEncontradosOperativo = tokensSensibles.filter((token) =>
  textoBloqueOperativo.includes(token)
);

const referenciasVariablesOperativo = bloqueOperativo
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
    item.texto.includes("String(") ||
    item.texto.includes("contextoBase") ||
    item.texto.includes("estacionIdf") ||
    item.texto.includes("fuente")
  );

const resumen = {
  textoExpedienteDetectado: inicioTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  lineasSegmentoTextoExpediente: lineasExpediente.length,
  bloqueOperativoIdentificacionEncontrado: indiceBloque1 !== -1,
  indiceBloque1,
  indiceBloque2,
  lineasBloqueOperativo: bloqueOperativo.length,
  encabezadoOperativoDetectado: bloqueOperativo[0]?.trim() ?? "",
  diagnosticoOt0125dDetectado: indiceDiagnosticoOt0125d !== -1,
  diagnosticoDespuesDeTextoExpediente:
    indiceDiagnosticoOt0125d !== -1 && indiceDiagnosticoOt0125d > cierreTextoExpediente,
  helperIdentificacionDetectado: indiceHelperIdentificacion !== -1,
  tokensSensiblesEncontradosOperativo: tokensEncontradosOperativo,
  referenciasVariablesOperativo: referenciasVariablesOperativo.length,
  aptitudPreliminar:
    indiceBloque1 === -1
      ? "no evaluable: bloque operativo no localizado"
      : tokensEncontradosOperativo.length === 0
        ? "candidato representacional probable con variables de contexto"
        : "requiere revisión adicional"
};

const lineasReporte = [
  "# OT-0183B — Extracción reforzada Identificación operativo vs diagnóstico",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque operativo extraído desde textoExpediente",
  "",
  "```javascript",
  textoBloqueOperativo.length > 0
    ? textoBloqueOperativo
    : "No se localizó el bloque operativo `## 1. Identificación` dentro del arreglo textoExpediente.",
  "```",
  "",
  "## Diferenciación operativa vs diagnóstico",
  "",
  resumen.diagnosticoOt0125dDetectado
    ? "- Se detectó el diagnóstico no invasivo OT-0125D del bloque Identificación."
    : "- No se detectó el diagnóstico no invasivo OT-0125D.",
  "",
  resumen.diagnosticoDespuesDeTextoExpediente
    ? "- El diagnóstico OT-0125D aparece después del cierre del arreglo `textoExpediente`, por tanto no corresponde al bloque operativo copiado."
    : "- No se confirmó que el diagnóstico OT-0125D esté después del cierre de `textoExpediente`.",
  "",
  resumen.helperIdentificacionDetectado
    ? "- Se detecta uso o importación de `construirLineasIdentificacionExpediente(...)`."
    : "- No se detecta uso o importación de `construirLineasIdentificacionExpediente(...)`.",
  "",
  "## Lectura técnica del bloque operativo",
  "",
  tokensEncontradosOperativo.length === 0
    ? "- No se detectaron referencias textuales directas a Q-5, Qp, Tp, hidrogramas, Método Racional, Q(t) o motor hidrológico dentro del bloque operativo extraído."
    : `- Se detectaron referencias sensibles dentro del bloque operativo: ${tokensEncontradosOperativo.join(", ")}.`,
  "",
  referenciasVariablesOperativo.length === 0
    ? "- No se detectaron señales simples de variables o formateo en el bloque operativo."
    : "- Se detectaron referencias dinámicas/contextuales que deben conservarse en un eventual contrato.",
  "",
  "## Referencias dinámicas/contextuales del bloque operativo",
  "",
  referenciasVariablesOperativo.length === 0
    ? "No se detectaron referencias dinámicas/contextuales simples."
    : referenciasVariablesOperativo.map((item) => `- Línea ${item.lineaRelativa}: \`${item.texto.trim()}\``).join("\n"),
  "",
  "## Decisión preliminar",
  "",
  indiceBloque1 === -1
    ? "No avanzar todavía a contrato/helper. Primero se requiere localizar el bloque operativo por otro criterio."
    : "El bloque operativo queda diferenciado del diagnóstico y puede avanzar a contrato documental en una OT posterior, si se acepta preservar sus variables/contexto.",
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

console.log("EXTRACCION_OT_0183_IDENTIFICACION_OPERATIVO_DIAGNOSTICO_OK");
console.log(JSON.stringify(resumen, null, 2));
