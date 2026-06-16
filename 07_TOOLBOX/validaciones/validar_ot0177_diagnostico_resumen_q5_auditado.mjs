import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("construirLineasResumenQ5AuditadoExpediente"),
  true,
  "Debe importarse/usarse construirLineasResumenQ5AuditadoExpediente."
);

assert.equal(
  texto.includes("lineasResumenQ5AuditadoDelegadoDiagnostico"),
  true,
  "Debe existir bloque delegado diagnóstico."
);

assert.equal(
  texto.includes("lineasResumenQ5AuditadoOperativoDiagnostico"),
  true,
  "Debe existir bloque operativo diagnóstico."
);

assert.equal(
  texto.includes("hayBrechaResumenQ5AuditadoDiagnostico"),
  true,
  "Debe existir comparación de brecha diagnóstica."
);

assert.equal(
  texto.includes('console.warn("[expediente] Brecha diagnóstico Resumen Q-5 auditado delegado vs operativo"'),
  true,
  "Debe existir console.warn diagnóstico."
);

assert.equal(
  texto.includes("Snyder, Williams &amp;amp; Hann y Clark IUH: métodos comparativos/referenciales."),
  false,
  "No debe quedar &amp;amp; en Resumen Q-5 auditado."
);

assert.equal(
  texto.includes("Snyder, Williams &amp; Hann y Clark IUH: métodos comparativos/referenciales."),
  true,
  "Debe conservarse la entidad correcta &amp;."
);

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse textoExpediente."
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

assert.equal(
  texto.includes("...construirLineasResumenQ5AuditadoExpediente({"),
  false,
  "No debe sustituirse el bloque operativo por expansión del helper."
);

assert.equal(
  texto.includes('"## 6. Resumen Q-5 auditado"'),
  true,
  "Debe conservarse encabezado operativo."
);

assert.equal(
  texto.includes("...tablaQ5Markdown"),
  true,
  "Debe conservarse tablaQ5Markdown operativo."
);

console.log("VALIDACION_OT_0177_DIAGNOSTICA_RESUMEN_Q5_AUDITADO_OK");
