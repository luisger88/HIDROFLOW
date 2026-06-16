import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

const nombreHelper = "construirLineasResumenQ5AuditadoExpediente";
const importStandalone =
  'import { construirLineasResumenQ5AuditadoExpediente } from "../services/documentos/construirExpedienteHidrologicoMinimo.js";\n';

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe existir textoExpediente."
);

assert.equal(
  texto.includes("## 6. Resumen Q-5 auditado"),
  true,
  "Debe existir el bloque operativo ## 6."
);

assert.equal(
  texto.includes("...tablaQ5Markdown"),
  true,
  "Debe existir tablaQ5Markdown operativo."
);

const marcadorDiagnostico = "lineasResumenQ5AuditadoDelegadoDiagnostico";

assert.equal(
  texto.includes(marcadorDiagnostico),
  false,
  "La integración diagnóstica Resumen Q-5 auditado ya existe. No duplicar."
);

if (!texto.includes(nombreHelper)) {
  texto = importStandalone + texto;
}

const patronTextoExpediente = /^(\s*)const textoExpediente = \[/m;
const coincidenciaTextoExpediente = texto.match(patronTextoExpediente);

assert.notEqual(
  coincidenciaTextoExpediente,
  null,
  "Debe encontrarse la línea const textoExpediente = [ con indentación flexible."
);

const indent = coincidenciaTextoExpediente[1];
const lineaTextoExpediente = `${indent}const textoExpediente = [`;

const bloqueDiagnostico = `${indent}const lineasResumenQ5AuditadoDelegadoDiagnostico =
${indent}  construirLineasResumenQ5AuditadoExpediente({
${indent}    tablaQ5Markdown
${indent}  });

${indent}const lineasResumenQ5AuditadoOperativoDiagnostico = [
${indent}  "## 6. Resumen Q-5 auditado",
${indent}  "Estado general: diagnóstico no adoptivo.",
${indent}  "SCS Unit Hydrograph: candidato principal de referencia.",
${indent}  "SCS Mod.: variante ajustable.",
${indent}  "Snyder, Williams &amp; Hann y Clark IUH: métodos comparativos/referenciales.",
${indent}  "Masa y volumen: controlados frente a referencia física.",
${indent}  "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
${indent}  "",
${indent}  "Tabla Q-5 auditada:",
${indent}  ...tablaQ5Markdown,
${indent}  "",
${indent}  ""
${indent}];

${indent}const hayBrechaResumenQ5AuditadoDiagnostico =
${indent}  lineasResumenQ5AuditadoDelegadoDiagnostico.length !==
${indent}    lineasResumenQ5AuditadoOperativoDiagnostico.length ||
${indent}  lineasResumenQ5AuditadoDelegadoDiagnostico.some(
${indent}    (linea, indice) =>
${indent}      linea !== lineasResumenQ5AuditadoOperativoDiagnostico[indice]
${indent}  );

${indent}if (hayBrechaResumenQ5AuditadoDiagnostico) {
${indent}  console.warn("[expediente] Brecha diagnóstico Resumen Q-5 auditado delegado vs operativo", {
${indent}    delegado: lineasResumenQ5AuditadoDelegadoDiagnostico,
${indent}    operativo: lineasResumenQ5AuditadoOperativoDiagnostico
${indent}  });
${indent}}

`;

texto = texto.replace(lineaTextoExpediente, bloqueDiagnostico + lineaTextoExpediente);

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0177_DIAGNOSTICA_RESUMEN_Q5_AUDITADO_OK");
console.log(JSON.stringify({
  importHelperPresente: texto.includes(nombreHelper),
  diagnosticoPresente: texto.includes(marcadorDiagnostico),
  textoExpedientePresente: texto.includes("const textoExpediente = [")
}, null, 2));
