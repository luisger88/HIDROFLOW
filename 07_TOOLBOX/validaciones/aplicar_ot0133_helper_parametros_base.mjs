import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaHelper = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

let texto = fs.readFileSync(rutaHelper, "utf8");

const nombreFuncion = "construirLineasParametrosHidrologicosBaseExpediente";

assert.equal(
  texto.includes(`export function ${nombreFuncion}`),
  false,
  "La función ya existe; no se debe duplicar."
);

const bloqueFuncion = `

export function construirLineasParametrosHidrologicosBaseExpediente(entrada = {}) {
  const contextoBase =
    entrada?.contextoBase && typeof entrada.contextoBase === "object"
      ? entrada.contextoBase
      : entrada;

  const valorDocumental = (valor) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "number" && !Number.isFinite(valor)) {
      return "—";
    }

    if (typeof valor === "object") {
      return "—";
    }

    const textoValor = String(valor).trim();

    return textoValor.length > 0 ? textoValor : "—";
  };

  return [
    "## 2. Parámetros hidrológicos base",
    \`CN: \${valorDocumental(contextoBase?.CN)}\`,
    \`CN base: \${valorDocumental(contextoBase?.CN_base)}\`,
    \`CN efectivo: \${valorDocumental(contextoBase?.CN_efectivo)}\`,
    \`AMC: \${valorDocumental(contextoBase?.AMC)}\`
  ];
}
`;

texto = texto.TrimEnd ? texto : texto;
texto = texto.replace(/\s*$/u, "");
texto = `${texto}${bloqueFuncion}\n`;

fs.writeFileSync(rutaHelper, texto, "utf8");

console.log("APLICACION_OT_0133_HELPER_PARAMETROS_BASE_OK");
