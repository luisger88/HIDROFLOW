import assert from "node:assert/strict";
import { construirLineasParametrosHidrologicosBaseExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const residuos = ["undefined", "null", "NaN", "[object Object]"];

function validarSinResiduos(nombreCaso, texto) {
  const detectados = residuos.filter((token) => texto.includes(token));

  assert.equal(
    detectados.length,
    0,
    `${nombreCaso}: no debe contener residuos técnicos: ${detectados.join(", ")}`
  );
}

function validarEstructura(nombreCaso, lineas) {
  assert.equal(Array.isArray(lineas), true, `${nombreCaso}: debe retornar arreglo`);
  assert.equal(lineas.length, 5, `${nombreCaso}: debe retornar 5 líneas`);
  assert.equal(
    lineas[0],
    "## 2. Parámetros hidrológicos base",
    `${nombreCaso}: debe conservar encabezado`
  );
}

function validarTexto(nombreCaso, entrada, esperados) {
  const lineas = construirLineasParametrosHidrologicosBaseExpediente(entrada);
  const texto = lineas.join("\n");

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

const casos = [
  {
    nombre: "CN cero",
    entrada: {
      contextoBase: {
        CN: 0,
        CN_base: 82,
        CN_efectivo: 88,
        AMC: "II"
      }
    },
    esperados: ["CN: 0", "CN base: 82", "CN efectivo: 88", "AMC: II"]
  },
  {
    nombre: "CN vacio",
    entrada: {
      contextoBase: {
        CN: "",
        CN_base: 82,
        CN_efectivo: 88,
        AMC: "II"
      }
    },
    esperados: ["CN: —", "CN base: 82", "CN efectivo: 88", "AMC: II"]
  },
  {
    nombre: "CN NaN",
    entrada: {
      contextoBase: {
        CN: Number.NaN,
        CN_base: 82,
        CN_efectivo: 88,
        AMC: "II"
      }
    },
    esperados: ["CN: —", "CN base: 82", "CN efectivo: 88", "AMC: II"]
  },
  {
    nombre: "CN_base null",
    entrada: {
      contextoBase: {
        CN: 88,
        CN_base: null,
        CN_efectivo: 88,
        AMC: "II"
      }
    },
    esperados: ["CN: 88", "CN base: —", "CN efectivo: 88", "AMC: II"]
  },
  {
    nombre: "CN_efectivo objeto",
    entrada: {
      contextoBase: {
        CN: 88,
        CN_base: 82,
        CN_efectivo: { valor: 88 },
        AMC: "II"
      }
    },
    esperados: ["CN: 88", "CN base: 82", "CN efectivo: —", "AMC: II"]
  },
  {
    nombre: "AMC vacio",
    entrada: {
      contextoBase: {
        CN: 88,
        CN_base: 82,
        CN_efectivo: 88,
        AMC: ""
      }
    },
    esperados: ["CN: 88", "CN base: 82", "CN efectivo: 88", "AMC: —"]
  },
  {
    nombre: "AMC III",
    entrada: {
      contextoBase: {
        CN: 90,
        CN_base: 84,
        CN_efectivo: 91,
        AMC: "III"
      }
    },
    esperados: ["CN: 90", "CN base: 84", "CN efectivo: 91", "AMC: III"]
  },
  {
    nombre: "contextoBase ausente",
    entrada: {},
    esperados: ["CN: —", "CN base: —", "CN efectivo: —", "AMC: —"]
  },
  {
    nombre: "contexto directo",
    entrada: {
      CN: 91,
      CN_base: 85,
      CN_efectivo: 92,
      AMC: "I"
    },
    esperados: ["CN: 91", "CN base: 85", "CN efectivo: 92", "AMC: I"]
  }
];

for (const caso of casos) {
  validarTexto(caso.nombre, caso.entrada, caso.esperados);
}

console.log("VALIDACION_OT_0134_HELPER_PARAMETROS_BASE_REFORZADA_OK");
