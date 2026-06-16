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
  "Debe mantenerse textoExpediente"
);

assert.equal(
  texto.includes("...construirLineasEscenarioQTrActivoExpediente({"),
  true,
  "El bloque Escenario Q-Tr activo debe usar expansión delegada"
);

assert.equal(
  texto.includes("estadoQTrActivoExpediente"),
  true,
  "La sustitución delegada debe pasar estadoQTrActivoExpediente"
);

assert.equal(
  texto.includes("qTrActivoExpediente"),
  true,
  "La sustitución delegada debe pasar qTrActivoExpediente"
);

assert.equal(
  texto.includes("faltantesQTrActivoExpediente"),
  true,
  "La sustitución delegada debe pasar faltantesQTrActivoExpediente"
);

assert.equal(
  texto.includes("formatearValorQTrExpediente"),
  true,
  "La sustitución delegada debe pasar formatearValorQTrExpediente"
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

assert.equal(
  texto.includes("## 1. Identificación"),
  true,
  "Debe conservarse bloque Identificación"
);

assert.equal(
  texto.includes("## 2. Parámetros hidrológicos base"),
  true,
  "Debe conservarse bloque Parámetros base"
);

assert.equal(
  texto.includes("## 3. Tiempo de concentración y roles Tc"),
  true,
  "Debe conservarse bloque Tiempo de concentración"
);

assert.equal(
  texto.includes("## 4. Volumen de referencia"),
  true,
  "Debe conservarse bloque Volumen de referencia"
);

console.log("VALIDACION_OT_0168_SUSTITUCION_ESCENARIO_QTR_ACTIVO_OK");
