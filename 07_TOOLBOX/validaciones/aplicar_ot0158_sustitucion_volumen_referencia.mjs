import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("construirLineasVolumenReferenciaExpediente"),
  true,
  "Debe existir el import/uso de construirLineasVolumenReferenciaExpediente"
);

const patronManual =
  /            "## 4\. Volumen de referencia",\r?\n            `Lluvia efectiva total: \$\{Number\.isFinite\(peTotalMm\) \? peTotalMm\.toFixed\(2\) \+ " mm" : "—"\}`,\r?\n            `Volumen esperado: \$\{volumenEsperadoM3 \? volumenEsperadoM3\.toLocaleString\("es-CO", \{ maximumFractionDigits: 0 \}\) \+ " m³" : "—"\}`,\r?\n            "Fórmula: Pe\(mm\) × Área\(km²\) × 1000\.",/;

const coincidencias = texto.match(patronManual);

assert.notEqual(
  coincidencias,
  null,
  "Debe existir el bloque manual operativo ## 4 para sustituir"
);

assert.equal(
  (texto.match(patronManual) || []).length,
  1,
  "Debe existir exactamente un bloque manual operativo ## 4"
);

const bloqueDelegado = `            ...construirLineasVolumenReferenciaExpediente({
              peTotalMm,
              volumenEsperadoM3
            }),`;

texto = texto.replace(patronManual, bloqueDelegado);

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0158_SUSTITUCION_VOLUMEN_REFERENCIA_OK");
