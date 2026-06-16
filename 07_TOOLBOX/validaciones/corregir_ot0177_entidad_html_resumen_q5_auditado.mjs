import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

const erroneo = "Snyder, Williams &amp;amp; Hann y Clark IUH: métodos comparativos/referenciales.";
const correcto = "Snyder, Williams &amp; Hann y Clark IUH: métodos comparativos/referenciales.";

assert.equal(
  texto.includes("lineasResumenQ5AuditadoDelegadoDiagnostico"),
  true,
  "Debe existir integración diagnóstica Resumen Q-5 auditado."
);

assert.equal(
  texto.includes(erroneo),
  true,
  "Debe existir la entidad HTML duplicada &amp;amp; para corregirla."
);

texto = texto.replace(erroneo, correcto);

assert.equal(
  texto.includes(erroneo),
  false,
  "No debe quedar &amp;amp; en el diagnóstico Resumen Q-5 auditado."
);

assert.equal(
  texto.includes(correcto),
  true,
  "Debe quedar la línea corregida con &amp;."
);

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("CORRECCION_OT_0177_ENTIDAD_HTML_RESUMEN_Q5_AUDITADO_OK");
