import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const patronManual =
  /            "## 4\. Volumen de referencia",\r?\n            `Lluvia efectiva total: \$\{Number\.isFinite\(peTotalMm\) \? peTotalMm\.toFixed\(2\) \+ " mm" : "—"\}`,\r?\n            `Volumen esperado: \$\{volumenEsperadoM3 \? volumenEsperadoM3\.toLocaleString\("es-CO", \{ maximumFractionDigits: 0 \}\) \+ " m³" : "—"\}`,\r?\n            "Fórmula: Pe\(mm\) × Área\(km²\) × 1000\.",/;

assert.equal(texto.includes("const textoExpediente = ["), true, "Debe mantenerse textoExpediente");

assert.equal(
  texto.includes("...construirLineasVolumenReferenciaExpediente({"),
  true,
  "El bloque Volumen de referencia debe usar expansión delegada"
);

assert.equal(texto.includes("peTotalMm"), true, "La sustitución delegada debe pasar peTotalMm");
assert.equal(texto.includes("volumenEsperadoM3"), true, "La sustitución delegada debe pasar volumenEsperadoM3");

assert.equal(
  patronManual.test(texto),
  false,
  "No debe reaparecer el bloque manual antiguo de Volumen de referencia"
);

assert.equal(texto.includes("areaTexto.value = textoExpediente"), true, "El portapapeles debe seguir usando textoExpediente");

assert.equal(
  texto.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  true,
  "El fallback manual debe seguir usando textoExpediente"
);

assert.equal(texto.includes("navigator.clipboard"), false, "No debe introducirse navigator.clipboard");
assert.equal(texto.includes("writeText"), false, "No debe introducirse writeText");

assert.equal(texto.includes("## 1. Identificación"), true, "Debe conservarse bloque Identificación");
assert.equal(texto.includes("## 2. Parámetros hidrológicos base"), true, "Debe conservarse bloque Parámetros base");
assert.equal(texto.includes("## 3. Tiempo de concentración y roles Tc"), true, "Debe conservarse bloque Tiempo de concentración");

console.log("VALIDACION_OT_0158_SUSTITUCION_VOLUMEN_REFERENCIA_OK");
