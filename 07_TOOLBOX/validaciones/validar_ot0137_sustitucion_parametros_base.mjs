import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse el arreglo textoExpediente"
);

assert.equal(
  texto.includes("...construirLineasParametrosHidrologicosBaseExpediente({"),
  true,
  "El bloque Parámetros base debe usar expansión delegada"
);

assert.equal(
  texto.includes("contextoBase"),
  true,
  "La sustitución delegada debe pasar contextoBase"
);

assert.equal(
  texto.includes("areaTexto.value = textoExpediente"),
  true,
  "El portapapeles debe seguir usando textoExpediente"
);

assert.equal(
  texto.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  true,
  "El fallback manual debe seguir usando textoExpediente"
);

assert.equal(
  texto.includes("navigator.clipboard"),
  false,
  "No debe introducirse navigator.clipboard"
);

assert.equal(
  texto.includes("writeText"),
  false,
  "No debe introducirse writeText"
);

const lineasManualesAntiguas = [
  '`CN: ${contextoBase?.CN ?? "—"}`',
  '`CN base: ${contextoBase?.CN_base ?? "—"}`',
  '`CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`',
  '`AMC: ${contextoBase?.AMC ?? "—"}`'
];

const manualesDetectadas = lineasManualesAntiguas.filter((linea) =>
  texto.includes(linea)
);

assert.equal(
  manualesDetectadas.length,
  0,
  `No deben reaparecer líneas manuales antiguas: ${manualesDetectadas.join(", ")}`
);

assert.equal(
  texto.includes("## 1. Identificación"),
  true,
  "Debe conservarse el bloque Identificación"
);

assert.equal(
  texto.includes("## 3. Tiempo de concentración"),
  true,
  "Debe conservarse el bloque siguiente de Tiempo de concentración"
);

console.log("VALIDACION_OT_0137_SUSTITUCION_PARAMETROS_BASE_OK");
