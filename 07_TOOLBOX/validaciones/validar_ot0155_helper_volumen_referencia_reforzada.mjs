import assert from "node:assert/strict";
import { construirLineasVolumenReferenciaExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

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
  assert.equal(lineas.length, 4, `${nombreCaso}: debe retornar 4 líneas`);
  assert.equal(lineas[0], "## 4. Volumen de referencia", `${nombreCaso}: encabezado exacto`);
  assert.equal(lineas[3], "Fórmula: Pe(mm) × Área(km²) × 1000.", `${nombreCaso}: fórmula literal`);
}

function validarCaso(nombreCaso, entrada, esperados) {
  const lineas = construirLineasVolumenReferenciaExpediente(entrada);
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
    nombre: "pe cero",
    entrada: {
      peTotalMm: 0,
      volumenEsperadoM3: 2654251
    },
    esperados: [
      "Lluvia efectiva total: 0.00 mm",
      "Volumen esperado: 2.654.251 m³"
    ]
  },
  {
    nombre: "pe vacio",
    entrada: {
      peTotalMm: "",
      volumenEsperadoM3: 2654251
    },
    esperados: [
      "Lluvia efectiva total: —",
      "Volumen esperado: 2.654.251 m³"
    ]
  },
  {
    nombre: "pe string numerico",
    entrada: {
      peTotalMm: "56.65",
      volumenEsperadoM3: 2654251
    },
    esperados: [
      "Lluvia efectiva total: 56.65 mm",
      "Volumen esperado: 2.654.251 m³"
    ]
  },
  {
    nombre: "pe null",
    entrada: {
      peTotalMm: null,
      volumenEsperadoM3: 2654251
    },
    esperados: [
      "Lluvia efectiva total: —",
      "Volumen esperado: 2.654.251 m³"
    ]
  },
  {
    nombre: "pe objeto",
    entrada: {
      peTotalMm: { 
    esperados: [
      "Lluvia efectiva total: 56.65 mm",
      "Volumen esperado: —"
    ]
  },
  {
    nombre: "entrada vacia",
    entrada: {},
    esperados: [
      "Lluvia efectiva total: —",
      "Volumen esperado: —"
    ]
  }
];

for (const caso of casos) {
  validarCaso(caso.nombre, caso.entrada, caso.esperados);
}

console.log("VALIDACION_OT_0155_HELPER_VOLUMEN_REFERENCIA_REFORZADA_OK");
