import assert from "node:assert/strict";
import { construirLineasTiempoConcentracionRolesTcExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

function textoCaso(entrada) {
  return construirLineasTiempoConcentracionRolesTcExpediente(entrada).join("\n");
}

const casos = [
  {
    nombre: "Tc cero conserva cero",
    entrada: {
      Tc_final: 0,
      trDisenoActivoExpediente: 100
    },
    esperado: "Tc comparador: 0.0 min"
  },
  {
    nombre  esperado: "Tc comparador: —"
  }
];

for (const caso of casos) {
  const texto = textoCaso(caso.entrada);

  assert.equal(
    texto.includes(caso.esperado),
    true,
    `${caso.nombre}: debe incluir ${caso.esperado}`
  );

  assert.equal(
    texto.includes("undefined"),
    false,
    `${caso.nombre}: no debe emitir undefined`
  );

  assert.equal(
    texto.includes("null"),
    false,
    `${caso.nombre}: no debe emitir null`
  );

  assert.equal(
    texto.includes("NaN"),
    false,
    `${caso.nombre}: no debe emitir NaN`
  );

  assert.equal(
    texto.includes("[object Object]"),
    false,
    `${caso.nombre}: no debe emitir [object Object]`
  );

  console.log(`OK ${caso.nombre}`);
  console.log(texto);
}

console.log("VALIDACION_OT_0145_FALLBACK_TC_VACIO_NULL_OK");
