import assert from "node:assert/strict";
import { construirLineasTiempoConcentracionRolesTcExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

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
  assert.equal(lineas.length, 10, `${nombreCaso}: debe retornar 10 líneas`);
  assert.equal(lineas[0], "## 3. Tiempo de concentración y roles Tc", `${nombreCaso}: encabezado exacto`);
  assert.equal(
    lineas[3],
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    `${nombreCaso}: nota Tr literal`
  );
  assert.equal(lineas[4], "Roles Tc:", `${nombreCaso}: roles Tc literal`);
  assert.equal(lineas[5], "- Tc global Índice: referencia hidrológica general.", `${nombreCaso}: rol índice literal`);
  assert.equal(lineas[6], "- Tc operativo Q(t): ruta interna del hidrograma.", `${nombreCaso}: rol Qt literal`);
  assert.equal(lineas[7], "- Duración evento: 3 h para almacenamiento/regulación.", `${nombreCaso}: duración literal`);
  assert.equal(lineas[8], "- Lag / forma SCS: parámetro derivado para forma temporal.", `${nombreCaso}: lag literal`);
  assert.equal(lineas[9], "- Tc comparador: referencia especializada para coherencia Q-5.", `${nombreCaso}: comparador literal`);
}

function validarCaso(nombreCaso, entrada, esperados) {
  const lineas = construirLineasTiempoConcentracionRolesTcExpediente(entrada);
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
    nombre: "Tc cero",
    entrada: {
      Tc_final: 0,
      trDisenoActivoExpediente: 100
    },
    esperados: [
      "Tc comparador: 0.0 min",
      "Tr global activo: 100 años"
    ]
  },
  {
    nombre: "Tc vacio",
    entrada: {
      Tc_final: "",
      trDisenoActivoExpediente: 100
    },
    esperados: [
      "Tc comparador: 0.0 min",
      "Tr global activo: 100 años"
    ]
  },
  {
    nombre: "Tc NaN",
    entrada: {
      Tc_final: Number.NaN,
      trDisenoActivoExpediente: 100
    },
    esperados: [
      "Tc comparador: —",
      "Tr global activo: 100 años"
    ]
  },
  {
    nombre: "Tc null",
    entrada: {
      Tc_final: null,
      trDisenoActivoExpediente: 100
    },
    esperados: [
      "Tc comparador: 0.0 min",
      "Tr global activo: 100 años"
    ]
  },
  {
    nombre: "Tc string numerico",
    entrada: {
      Tc_final: "114.23",
      trDisenoActivoExpediente: 100
    },
    esperados: [
      "Tc comparador: 114.2 min",
      "Tr global activo: 100 años"
    ]
  },
  {
    nombre: "Tr vacio",
    entrada: {
      Tc_final: 114.23,
      trDisenoActivoExpediente: ""
    },
    esperados: [
      "Tc comparador: 114.2 min",
      "Tr global activo: — años"
    ]
  },
  {
    nombre: "Tr null",
    entrada: {
      Tc_final: 114.23,
      trDisenoActivoExpediente: null
    },
    esperados: [
      "Tc comparador: 114.2 min",
      "Tr global activo: — años"
    ]
  },
  {
    nombre: "Tr objeto",
    entrada: {
      Tc_final: 114.23,
      trDisenoActivoExpediente: { valor: 100 }
    },
    esperados: [
      "Tc comparador: 114.2 min",
      "Tr global activo: — años"
    ]
  },
  {
    nombre: "entrada vacia",
    entrada: {},
    esperados: [
      "Tc comparador: —",
      "Tr global activo: — años"
    ]
  }
];

for (const caso of casos) {
  validarCaso(caso.nombre, caso.entrada, caso.esperados);
}

console.log("VALIDACION_OT_0144_HELPER_TIEMPO_CONCENTRACION_REFORZADA_OK");
