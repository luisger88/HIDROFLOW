import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaHelper = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

let texto = fs.readFileSync(rutaHelper, "utf8");

assert.equal(
  texto.includes("export function construirLineasResumenQ5AuditadoExpediente"),
  true,
  "Debe existir la función construirLineasResumenQ5AuditadoExpediente."
);

const textoOriginal = texto;

texto = texto.replace(/\\n\s*$/u, "");

if (!texto.endsWith("\n")) {
  texto += "\n";
}

assert.equal(
  texto.includes("\\n\n"),
  false,
  "No debe quedar literal \\n antes del final del archivo."
);

fs.writeFileSync(rutaHelper, texto, "utf8");

console.log("CORRECCION_OT_0174_HELPER_RESUMEN_Q5_AUDITADO_OK");
console.log(JSON.stringify({
  cambioAplicado: texto !== textoOriginal,
  funcionPresente: texto.includes("export function construirLineasResumenQ5AuditadoExpediente"),
  sinLiteralFinalBackslashN: !/\\n\s*$/u.test(texto)
}, null, 2));
