import assert from "node:assert/strict";
import { construirLineasParametrosHidrologicosBaseExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const residuos = ["undefined", "null", "NaN", "[object Object]"];

function textoDe(lineas) {
  return lineas.join("\n");
}

function validarEstructura(nombreCaso, lineas) {
  assert.equal(Array.isArray(lineas), true, `${nombreCaso}: debe retornar arreglo`);
  assert.equal(lineas.length, 5, `${nombreCaso}: debe retornar 5 líneas`);
  assert.equal(lineas[0], "## 2. Parámetros hidrológicos base", `${nombreCaso}: debe conservar encabezado`);
}

function validarSinResiduos(nombreCaso, texto) {
  const detectados = residuos.filter((token) => texto.includes(token));

  assert.equal(
    detectados.length,
    0,
    `${nombreCaso}: no debe contener residuos técnicos: ${detectados.join(", ")}`
  );
}

function validarTexto(nombreCaso, entrada, esperados) {
  const lineas = construirLineasParametrosHidrologicosBaseExpediente(entrada);
  const texto = textoDe(lineas);

  validarEstructura(nombreCaso, lineas);
  validarSinResiduos(nombreCaso, texto);

  for (const esperado of esperados) {
    assert.equal(
      texto.includes(esperado),
      true,
      `${nombreCaso}: debe incluir ${esperado}`
    );
  }

  console.log(`OK ${nombreCaso}`);
  console.log(texto);
}

validarTexto(
  "CN cero",
  {
    contextoBase: {
      CN: 0,
      CN_base: 82,
      CN_efectivo: 88,
      AMC: "II"
    }
  },
  [
    "CN: 0",
    "CN base: 82",
    "CN efectivo: 88",
    "AMC: II"
  ]
);

validarTexto(
  "CN vacio",
  {
    contextoBase: {
      CN: "",
      CN_base: 82,
      CN_efectivo: 88,
      AMC: "II"
    }
  },
  [
    "CN: —",
    "CN base: 82",
    "CN efectivo: 88",
    "AMC: II"
  ]
);

validarTexto(
  "CN NaN",
  {
    contextoBase: {
      CN: Number.NaN,
      CN_base: 82,
      CN_efectivo: 88,
      AMC: "II"
    }
  },
  [
    "CN: —",
    "CN base: 82",
    "CN efectivo: 88",
    "AMC: II"
  ]
);

validarTexto(
  "CN_base null",
  {
    contextoBase: {
      CN: 88,
      CN_base: null,
      CN_efectivo: 88,
      AMC: "II"
    }
  },
  [
    "CN: 88",
    "CN base: —",
    "CN efectivo: 88",
    "AMC: II"
  ]
);
  "contexto directo",
  {
    CN: 91,
    CN_base: 85,
    CN_efectivo: 92,
    AMC: "I"
  },
  [
    "CN: 91",
    "CN base: 85",
    "CN efectivo: 92",
    "AMC: I"
  ]
);

console.log("VALIDACION_OT_0134_HELPER_PARAMETROS_BASE_REFORZADA_OK");
