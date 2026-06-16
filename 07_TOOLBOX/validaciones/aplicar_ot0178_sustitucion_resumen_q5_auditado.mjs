import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

const nombreHelper = "construirLineasResumenQ5AuditadoExpediente";

assert.equal(
  texto.includes(nombreHelper),
  true,
  "Debe existir import/uso previo del helper."
);

assert.equal(
  texto.includes("lineasResumenQ5AuditadoDelegadoDiagnostico"),
  true,
  "Debe existir integración diagnóstica previa."
);

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe existir textoExpediente."
);

assert.equal(
  texto.includes('"## 6. Resumen Q-5 auditado"'),
  true,
  "Debe existir el bloque manual operativo Resumen Q-5 auditado antes de sustituir."
);

assert.equal(
  texto.includes("...tablaQ5Markdown"),
  true,
  "Debe existir tablaQ5Markdown."
);

assert.equal(
  texto.includes("...construirLineasResumenQ5AuditadoExpediente({"),
  false,
  "El bloque ## 6 no debe estar ya sustituido."
);

const indiceTextoExpediente = texto.indexOf("const textoExpediente = [");

assert.notEqual(
  indiceTextoExpediente,
  -1,
  "Debe localizarse textoExpediente."
);

const antesTextoExpediente = texto.slice(0, indiceTextoExpediente);
const desdeTextoExpediente = texto.slice(indiceTextoExpediente);

const lineas = desdeTextoExpediente.split(/\r?\n/u);

const indiceInicioBloque = lineas.findIndex((linea) =>
  linea.includes('"## 6. Resumen Q-5 auditado"')
);

assert.notEqual(
  indiceInicioBloque,
  -1,
  "Debe encontrarse el inicio del bloque ## 6 dentro de textoExpediente."
);

const indiceTabla = lineas.findIndex((linea, indice) =>
  indice > indiceInicioBloque && linea.includes('"Tabla Q-5 auditada:"')
);

assert.notEqual(
  indiceTabla,
  -1,
  "Debe encontrarse la línea Tabla Q-5 auditada dentro del bloque ## 6."
);

const indiceSpreadTabla = lineas.findIndex((linea, indice) =>
  indice > indiceTabla && linea.includes("...tablaQ5Markdown")
);

assert.notEqual(
  indiceSpreadTabla,
  -1,
  "Debe encontrarse ...tablaQ5Markdown dentro del bloque ## 6."
);

let indiceFinBloque = indiceSpreadTabla + 1;

while (
  indiceFinBloque < lineas.length &&
  lineas[indiceFinBloque].trim().match(/^"",?$/u)
) {
  indiceFinBloque += 1;
}

assert.equal(
  indiceFinBloque > indiceSpreadTabla + 1,
  true,
  "Deben existir líneas vacías finales después de ...tablaQ5Markdown."
);

const indentMatch = lineas[indiceInicioBloque].match(/^(\s*)/u);
const indent = indentMatch ? indentMatch[1] : "";

const bloqueDelegado = [
  `${indent}...construirLineasResumenQ5AuditadoExpediente({`,
  `${indent}  tablaQ5Markdown`,
  `${indent}}),`
];

const lineasActualizadas = [
  ...lineas.slice(0, indiceInicioBloque),
  ...bloqueDelegado,
  ...lineas.slice(indiceFinBloque)
];

texto = antesTextoExpediente + lineasActualizadas.join("\n");

const desdeTextoActualizado = texto.slice(texto.indexOf("const textoExpediente = ["));

assert.equal(
  desdeTextoActualizado.includes("...construirLineasResumenQ5AuditadoExpediente({"),
  true,
  "Debe quedar el bloque ## 6 sustituido por expansión del helper dentro de textoExpediente."
);

const bloqueManualCompletoAunPresente =
  desdeTextoActualizado.includes('"Estado general: diagnóstico no adoptivo."') &&
  desdeTextoActualizado.includes('"SCS Unit Hydrograph: candidato principal de referencia."') &&
  desdeTextoActualizado.includes('"SCS Mod.: variante ajustable."') &&
  desdeTextoActualizado.includes('"Tabla Q-5 auditada:"') &&
  desdeTextoActualizado.includes("...tablaQ5Markdown");

assert.equal(
  bloqueManualCompletoAunPresente,
  false,
  "No debe quedar el bloque manual completo ## 6 dentro de textoExpediente."
);

assert.equal(
  texto.includes("lineasResumenQ5AuditadoDelegadoDiagnostico"),
  true,
  "Debe conservarse diagnóstico no invasivo."
);

assert.equal(
  texto.includes("lineasResumenQ5AuditadoOperativoDiagnostico"),
  true,
  "Debe conservarse referencia diagnóstica operativa."
);

assert.equal(
  texto.includes("areaTexto.value = textoExpediente"),
  true,
  "El portapapeles debe seguir usando textoExpediente."
);

assert.equal(
  texto.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  true,
  "El fallback manual debe seguir usando textoExpediente."
);

assert.equal(
  texto.includes("navigator.clipboard"),
  false,
  "No debe introducirse navigator.clipboard."
);

assert.equal(
  texto.includes("writeText"),
  false,
  "No debe introducirse writeText."
);

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0178_SUSTITUCION_RESUMEN_Q5_AUDITADO_OK");
console.log(JSON.stringify({
  indiceInicioBloque,
  indiceTabla,
  indiceSpreadTabla,
  indiceFinBloque,
  lineasSustituidas: indiceFinBloque - indiceInicioBloque,
  delegadoPresente: texto.includes("...construirLineasResumenQ5AuditadoExpediente({"),
  textoExpedientePresente: texto.includes("const textoExpediente = ["),
  portapapelesIntacto: texto.includes("areaTexto.value = textoExpediente")
}, null, 2));
