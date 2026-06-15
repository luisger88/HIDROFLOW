import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { construirLineasIdentificacionExpediente } 46.8516 km²"), true, "Debe incluir área con km²");
assert.equal(texto.includes("Pendiente media: 8.43 %"), true, "Debe incluir pendiente con %");
assert.equal(texto.includes("Longitud cauce principal: 15.524 km"), true, "Debe incluir longitud con km");
assert.equal(texto.includes("undefined"), false, "No debe incluir undefined");
assert.equal(texto.includes("null"), false, "No debe incluir null");
assert.equal(texto.includes("NaN"), false, "No debe incluir NaN");
assert.equal(texto.includes("[object Object]"), false, "No debe incluir [object Object]");

assert.equal(
  textoComparador.includes("areaTexto.value = textoExpediente"),
  true,
  "El portapapeles debe seguir usando textoExpediente"
);

assert.equal(
  textoComparador.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  true,
  "El fallback manual debe seguir usando textoExpediente"
);

console.log("VALIDACION_OT_0127_UNIDADES_IDENTIFICACION_OK");
console.log(texto);
