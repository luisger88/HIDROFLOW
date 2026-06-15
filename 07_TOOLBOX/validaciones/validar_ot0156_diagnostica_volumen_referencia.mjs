import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("construirLineasVolumenReferenciaExpediente"),
  true,
  "Comparador debe importar o usar construirLineasVolumenReferenciaExpediente"
);

assert.equal(
  texto.includes("OT-0156 — Diagnóstico no invasivo del bloque Volumen de referencia delegado"),
  true,
  "Debe existir diagnóstico OT-0156"
);

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse textoExpediente"
);

assert.equal(
  texto.includes("## 4. Volumen de referencia"),
  true,
  "Debe conservarse bloque operativo de Volumen de referencia"
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
  texto.includes("areaTexto.value = textoVolumenReferenciaDelegadoDiagnostico"),
  false,
  "El texto delegado no debe sustituir el texto copiado"
);

console.log("VALIDACION_OT_0156_DIAGNOSTICA_VOLUMEN_REFERENCIA_OK");
