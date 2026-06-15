import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("construirLineasTiempoConcentracionRolesTcExpediente"),
  true,
  "Comparador debe importar o usar construirLineasTiempoConcentracionRolesTcExpediente"
);

assert.equal(
  texto.includes("OT-0146 — Diagnóstico no invasivo del bloque Tiempo de concentración y roles Tc delegado"),
  true,
  "Debe existir diagnóstico OT-0146"
);

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse textoExpediente"
);

assert.equal(
  texto.includes("## 3. Tiempo de concentración y roles Tc"),
  true,
  "Debe conservarse bloque operativo de Tiempo de concentración"
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
  texto.includes("areaTexto.value = textoTiempoConcentracionDelegadoDiagnostico"),
  false,
  "El texto delegado no debe sustituir el texto copiado"
);

console.log("VALIDACION_OT_0146_DIAGNOSTICA_TIEMPO_CONCENTRACION_OK");
