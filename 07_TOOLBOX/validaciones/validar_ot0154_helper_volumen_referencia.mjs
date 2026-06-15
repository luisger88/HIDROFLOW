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
    assert.equal(texto.includes(esperado), true, `${nombreCaso}: debe incluir ${esperado}`);
  }

  console.log(`OK ${nombreCaso}`);
  console.log(texto);
}

validarCaso(
  "contexto completo",
  {
    peTotalMm: 56.65,
    volumenEsperadoM3: 2654251
  },
  [
    "Lluvia efectiva total: 56.65 mm",
    "Volumen esperado: 2.654.251 m³"
  ]
);

validarCaso(
  "contexto fallback",
  {},
  [
    "Lluvia efectiva total: —",
    "Volumen esperado: —"
  ]
);

validarCaso(
  "lluvia no finita",
  {
    peTotalMm: Number.NaN,
    volumenEsperadoM3: 2654251
  },
  [
    "Lluvia efectiva total: —",
    "Volumen esperado: 2.654.251 m³"
  ]
);

validarCaso(
  "volumen vacio",
  {
    peTotalMm: 56.65,
    volumenEsperadoM3: ""
  },
  [
    "Lluvia efectiva total: 56.65 mm",
    "Volumen esperado: —"
  ]
);

validarCaso(
  "volumen objeto",
  {
    peTotalMm: 56.65,
    volumenEsperadoM3: { valor: 2654251 }
  },
  [
    "Lluvia efectiva total: 56.65 mm",
    "Volumen esperado: —"
  ]
);

console.log("VALIDACION_OT_0154_HELPER_VOLUMEN_REFERENCIA_OK");
