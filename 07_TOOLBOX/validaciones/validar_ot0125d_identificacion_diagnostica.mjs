import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("construirLineasIdentificacionExpediente"),
  true,
  "ComparadorMultiMetodo.jsx debe importar o usar construirLineasIdentificacionExpediente"
);

assert.equal(
  texto.includes("OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado"),
  true,
  "Debe existir el bloque diagnóstico OT-0125D"
);

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse el armado operativo de textoExpediente"
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
  texto.includes("areaTexto.value = textoIdentificacionDelegadaDiagnostico"),
  false,
  "El texto delegado no debe sustituir el texto copiado"
);

assert.equal(
  texto.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoIdentificacionDelegadaDiagnostico)"),
  false,
  "El texto delegado no debe sustituir el fallback manual"
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
  "El bloque operativo de Identificación debe permanecer presente"
);

console.log("VALIDACION_OT_0125D_IDENTIFICACION_DIAGNOSTICA_OK");
