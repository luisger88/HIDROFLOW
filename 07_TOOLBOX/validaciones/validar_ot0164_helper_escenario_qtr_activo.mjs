import assert from "node:assert/strict";
import { construirLineasEscenarioQTrActivoExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const residuos = ["undefined", "null", "NaN", "[object Object]"];

const formatearValorQTrExpediente = (valor, unidad = "", decimales) => {
  if (valor === undefined || valor === null) {
    return "—";
  }

  if (typeof valor === "string" && valor.trim().length === 0) {
    return "—";
  }

  if (typeof valor === "object") {
    return "—";
  }

  const numero = Number(valor);

  if (Number.isFinite(numero) && typeof decimales === "number") {
    return `${numero.toFixed(decimales)}${unidad}`;
  }

  if (Number.isFinite(numero) && typeof valor === "number") {
    return `${numero}${unidad}`;
  }

  if (typeof valor === "string") {
    return valor;
  }

  return "—";
};

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
  assert.equal(lineas.length, 16, `${nombreCaso}: debe retornar 16 líneas`);
  assert.equal(lineas[0], "## 5. Escenario Q-Tr activo — control de trazabilidad", `${nombreCaso}: encabezado exacto`);
  assert.equal(
    lineas[15],
    "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.",
    `${nombreCaso}: lectura técnica literal`
  );
}

function validarCaso(nombreCaso, entrada, esperados) {
  const lineas = construirLineasEscenarioQTrActivoExpediente(entrada);
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
    estadoQTrActivoExpediente: {
      estado: "publicado",
      fuente: "qtr-activo"
    },
    qTrActivoExpediente: {
      tr_activo: 100,
      estacion_idf: "San Cristóbal",
      metodo_idf: "IDF ponderada",
      distribucion_temporal: "SCS Tipo II",
      area_km2: 46.8516,
      cn_efectivo: 86.12,
      s_mm: 40.93,
      ia_mm: 8.19,
      porcentaje_impermeable: 12,
      tc_min: 114.2345,
      lluvia_efectiva_total_mm: 56.6543
    },
    faltantesQTrActivoExpediente: [],
    formatearValorQTrExpediente
  },
  [
    "Estado: publicado",
    "Tr activo: 100.00 años",
    "Estación IDF: San Cristóbal",
    "Área: 46.8516 km²",
    "CN efectivo: 86.12",
    "Tc: 114.2345 min",
    "Pe total: 56.6543 mm",
    "Campos mínimos: completos",
    "Fuente: qtr-activo"
  ]
);

validarCaso(
  "fallback general",
  {},
  [
    "Estado: no_publicado",
    "Tr activo: —",
    "Estación IDF: —",
    "Área: —",
    "Campos mínimos: completos",
    "Fuente: —"
  ]
);

validarCaso(
  "faltantes",
  {
    estadoQTrActivoExpediente: {
      estado: "no_publicado"
    },
    qTrActivoExpediente: {},
    faltantesQTrActivoExpediente: ["tr_activo", "estacion_idf"],
    formatearValorQTrExpediente
  },
  [
    "Estado: no_publicado",
    "Campos mínimos: faltantes — tr_activo, estacion_idf",
    "Fuente: —"
  ]
);

validarCaso(
  "sin formateador externo",
  {
    estadoQTrActivoExpediente: {
      estado: "publicado",
      fuente: "fallback-local"
    },
    qTrActivoExpediente: {
      tr_activo: 100,
      area_km2: 46.8516,
      tc_min: 114.2345
    },
    faltantesQTrActivoExpediente: []
  },
  [
    "Estado: publicado",
    "Tr activo: 100.00 años",
    "Área: 46.8516 km²",
    "Tc: 114.2345 min",
    "Campos mínimos: completos",
    "Fuente: fallback-local"
  ]
);

validarCaso(
  "objetos no serializables",
  {
    estadoQTrActivoExpediente: {
      estado: { valor: "publicado" },
      fuente: { valor: "x" }
    },
    qTrActivoExpediente: {
      tr_activo: { valor: 100 },
      estacion_idf: { valor: "San Cristóbal" }
    },
    faltantesQTrActivoExpediente: [{ campo: "tr_activo" }],
    formatearValorQTrExpediente
  },
  [
    "Estado: no_publicado",
    "Tr activo: —",
    "Estación IDF: —",
    "Campos mínimos: completos",
    "Fuente: —"
  ]
);

console.log("VALIDACION_OT_0164_HELPER_ESCENARIO_QTR_ACTIVO_OK");
