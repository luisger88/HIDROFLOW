import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("construirLineasEscenarioQTrActivoExpediente"),
  true,
  "Comparador debe importar o usar construirLineasEscenarioQTrActivoExpediente"
);

assert.equal(
  texto.includes("OT-0166 — Diagnóstico no invasivo del bloque Escenario Q-Tr activo delegado"),
  true,
  "Debe existir diagnóstico OT-0166"
);

assert.equal(
  texto.includes("diagnosticoEscenarioQTrActivoDelegado.lineasDelegadas !== 16"),
  true,
  "El diagnóstico debe validar 16 líneas delegadas"
);

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse textoExpediente"
);

assert.equal(
  texto.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
  true,
  "Debe conservarse bloque operativo Escenario Q-Tr activo"
);

assert.equal(
  texto.includes("areaTexto.value = textoExpediente"),
  true,
  "El portapapeles debe seguir usando textoExpediente"
);

assert.equal(
  texto.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  true,
  "Fallback manual debe seguir usando textoExpediente"
);

assert.equal(
  texto.includes("navigator.clipboard"),
  false,
  "No debe introducir navigator.clipboard"
);

assert.equal(
  texto.includes("writeText"),
  false,
  "No debe introducir writeText"
);

assert.equal(
  texto.includes("areaTexto.value = textoEscenarioQTrActivoDelegadoDiagnostico"),
  false,
  "El texto delegado no debe sustituir el texto copiado"
);

console.log("VALIDACION_OT_0166_DIAGNOSTICA_ESCENARIO_QTR_ACTIVO_OK");
