import assert from "node:assert/strict";
import { construirLineasEscenarioQTrActivoExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

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

const formateadorIdentidad = (valor, unidad = "", decimales) => {
  if (valor === undefined || valor === null) return "—";
  if (typeof valor === "number" && Number.isFinite(valor) && typeof decimales === "number") {
    return `${valor.toFixed(decimales)}${unidad}`;
  }
  if (typeof valor === "number" && Number.isFinite(valor)) {
    return `${valor}${unidad}`;
  }
  if (typeof valor === "string" && valor.trim().length > 0) return valor;
  return "—";
};

co {
      formatearValorQTrExpediente: () => null,
      qTrActivoExpediente: {
        tr_activo: 100
      }
    },
    esperados: [
      "Tr activo: —"
    ]
  },
  {
    nombre: "formateador devuelve undefined",
    entrada: {
      formatearValorQTrExpediente: () => undefined,
      qTrActivoExpediente: {
        tr_activo: 100
      }
    },
    esperados: [
      "Tr activo: —"
    ]
  },
  {
    nombre: "formateador devuelve objeto",
    entrada: {
      formatearValorQTrExpediente: () => ({ valor: 100 }),
      qTrActivoExpediente: {
        tr_activo: 100
      }
    },
    esperados: [
      "Tr activo: —"
    ]
  },
  {
    nombre: "estado y fuente vacios",
    entrada: {
      estadoQTrActivoExpediente: {
        estado: "",
        fuente: ""
      }
    },
    esperados: [
      "Estado: no_publicado",
      "Fuente: —"
    ]
  },
  {
    nombre: "faltantes mixtos",
    entrada: {
      faltantesQTrActivoExpediente: ["", "tr_activo", null, { campo: "x" }, "estacion_idf"]
    },
    esperados: [
      "Campos mínimos: faltantes — tr_activo, estacion_idf"
    ]
  },
  {
    nombre: "valores cero",
    entrada: {
      qTrActivoExpediente: {
        tr_activo: 0,
        area_km2: 0,
        cn_efectivo: 0,
        s_mm: 0,
        ia_mm: 0,
        porcentaje_impermeable: 0,
        tc_min: 0,
        lluvia_efectiva_total_mm: 0
      },
      formatearValorQTrExpediente: formateadorIdentidad
    },
    esperados: [
      "Tr activo: 0.00 años",
      "Área: 0.0000 km²",
      "CN efectivo: 0.00",
      "S: 0.00 mm",
      "Ia: 0.00 mm",
      "Impermeabilidad: 0.00 %",
      "Tc: 0.0000 min",
      "Pe total: 0.0000 mm"
    ]
  },
  {
    nombre: "strings numericos",
    entrada: {
      qTrActivoExpediente: {
        tr_activo: "100",
        area_km2: "46.8516",
        tc_min: "114.2345"
      }
    },
    esperados: [
      "Tr activo: 100.00 años",
      "Área: 46.8516 km²",
      "Tc: 114.2345 min"
    ]
  },
  {
    nombre: "valores NaN",
    entrada: {
      qTrActivoExpediente: {
        tr_activo: Number.NaN,
        area_km2: Number.NaN,
        tc_min: Number.NaN
      },
      formatearValorQTrExpediente: formateadorIdentidad
    },
    esperados: [
      "Tr activo: —",
      "Área: —",
      "Tc: —"
    ]
  }
];

for (const caso of casos) {
  validarCaso(caso.nombre, caso.entrada, caso.esperados);
}

console.log("VALIDACION_OT_0165_HELPER_ESCENARIO_QTR_ACTIVO_REFORZADA_OK");
