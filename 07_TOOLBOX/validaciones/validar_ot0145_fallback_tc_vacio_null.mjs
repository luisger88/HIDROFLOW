import assert from "node:assert/strict";
import { construirLineasTiempoConcentracionRolesTcExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const residuos = ["undefined", "null", "NaN", "[object Object]"];

function textoCaso(entrada) {
  return construirLineasTiempoConcentracionRolesTcExpediente(entrada).join("\n");
}

function validarSinResiduos(nombreCaso, texto) {
  const detectados = residuos.filter((token) => texto.includes(token));

  assert.equal(
    detectados.length,
    0,
    `${nombreCaso}: no debe contener residuos técnicos: ${detectados.join(", ")}`
  );
}

function validarCaso(caso) {
  const texto = textoCaso(caso.entrada);

  assert.equal(
    texto.includes(caso.esperado),
    true,
    `${caso.nombre}: debe incluir ${caso.esperado}`
  );

  validarSinResiduos(caso.nombre, texto);

  console.log(`OK ${caso.nombre}`);
  console.log(texto);
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
    nombre: "Tc string numerico conserva formato",
    entrada: {
      Tc_final: "114.23",
      trDisenoActivoExpediente: 100
    },
    esperado: "Tc comparador: 114.2 min"
  },
  {
    nombre: "Tc NaN fallback",
    entrada: {
      Tc_final: Number.NaN,
      trDisenoActivoExpediente: 100
    },
    esperado: "Tc comparador: —"
  },
  {
    nombre: "Tc vacio fallback",
    entrada: {
      Tc_final: "",
      trDisenoActivoExpediente: 100
    },
    esperado: "Tc comparador: —"
  },
  {
    nombre: "Tc espacios fallback",
    entrada: {
      Tc_final: "   ",
      trDisenoActivoExpediente: 100
    },
    esperado: "Tc comparador: —"
  },
  {
    nombre: "Tc null fallback",
    entrada: {
      Tc_final: null,
      trDisenoActivoExpediente: 100
    },
    esperado: "Tc comparador: —"
  },
  {
    nombre: "Tc undefined fallback",
    entrada: {
      trDisenoActivoExpediente: 100
    },
    esperado: "Tc comparador: —"
  },
  {
    nombre: "Tr vacio conserva fallback",
    entrada: {
      Tc_final: 114.23,
      trDisenoActivoExpediente: ""
    },
    esperado: "Tr global activo: — años"
  },
  {
    nombre: "Tr null conserva fallback",
    entrada: {
      Tc_final: 114.23,
      trDisenoActivoExpediente: null
    },
    esperado: "Tr global activo: — años"
  },
  {
    nombre: "Tr objeto conserva fallback",
    entrada: {
      Tc_final: 114.23,
      trDisenoActivoExpediente: { valor: 100 }
    },
    esperado: "Tr global activo: — años"
  }
];

for (const caso of casos) {
  validarCaso(caso);
}

console.log("VALIDACION_OT_0145_FALLBACK_TC_VACIO_NULL_OK");
