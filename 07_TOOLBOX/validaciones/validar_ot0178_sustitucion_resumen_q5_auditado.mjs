import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const indiceTextoExpediente = texto.indexOf("const textoExpediente = [");

assert.notEqual(
  indiceTextoExpediente,
  -1,
  "Debe existir textoExpediente."
);

const desdeTextoExpediente = texto.slice(indiceTextoExpediente);

assert.equal(
  desdeTextoExpediente.includes("...construirLineasResumenQ5AuditadoExpediente({"),
  true,
  "textoExpediente debe usar expansión del helper para Resumen Q-5 auditado."
);

assert.equal(
  desdeTextoExpediente.includes("tablaQ5Markdown"),
  true,
  "La sustitución debe pasar tablaQ5Markdown."
);

const bloqueManualCompletoAunPresente =
  desdeTextoExpediente.includes('"Estado general: diagnóstico no adoptivo."') &&
  desdeTextoExpediente.includes('"SCS Unit Hydrograph: candidato principal de referencia."') &&
  desdeTextoExpediente.includes('"SCS Mod.: variante ajustable."') &&
  desdeTextoExpediente.includes('"Tabla Q-5 auditada:"') &&
  desdeTextoExpediente.includes("...tablaQ5Markdown");

assert.equal(
  bloqueManualCompletoAunPresente,
  false,
  "Dentro de textoExpediente no debe quedar el bloque manual completo ## 6."
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
  texto.includes("hayBrechaResumenQ5AuditadoDiagnostico"),
  true,
  "Debe conservarse comparación diagnóstica."
);

assert.equal(
  texto.includes('console.warn("[expediente] Brecha diagnóstico Resumen Q-5 auditado delegado vs operativo"'),
  true,
  "Debe conservarse console.warn diagnóstico."
);

assert.equal(
  texto.includes("## 1. Identificación"),
  true,
  "Debe conservarse bloque ## 1."
);

assert.equal(
  texto.includes("## 2. Parámetros hidrológicos base"),
  true,
  "Debe conservarse bloque ## 2."
);

assert.equal(
  texto.includes("## 3. Tiempo de concentración y roles Tc"),
  true,
  "Debe conservarse bloque ## 3."
);

assert.equal(
  texto.includes("## 4. Volumen de referencia"),
  true,
  "Debe conservarse bloque ## 4."
);

assert.equal(
  texto.includes("## 5. Escenario Q-Tr activo"),
  true,
  "Debe conservarse bloque ## 5."
);

assert.equal(
  texto.includes("## 7."),
  true,
  "Debe conservarse bloque posterior ## 7."
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

console.log("VALIDACION_OT_0178_SUSTITUCION_RESUMEN_Q5_AUDITADO_OK");
