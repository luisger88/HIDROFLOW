import assert from "node:assert/strict";
import { construirLineasIdentificacionExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const residuosTecnicos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

function unirLineas(lineas) {
  return lineas.join("\n");
}

function assertSinResiduosTecnicos(nombreCaso, texto) {
  for (const residuo of residuosTecnicos) {
    assert.equal(
      texto.includes(residuo),
      false,
      `${nombreCaso}: no debe contener residuo técnico ${residuo}`
    );
  }
}

function assertLineaContiene(nombreCaso, texto, fragmento) {
  assert.equal(
    texto.includes(fragmento),
    true,
    `${nombreCaso}: debe contener ${fragmento}`
  );
}

function validarCaso(nombreCaso, contexto, expectativas) {
  const lineas = construirLineasIdentificacionExpediente(contexto);
  const texto = unirLineas(lineas);

  assert.equal(
    Array.isArray(lineas),
    true,
    `${nombreCaso}: la función debe retornar un arreglo`
  );

  assert.equal(
    lineas.length,
    7,
    `${nombreCaso}: la función debe retornar exactamente 7 líneas`
  );

  assert.equal(
    lineas[0],
    "## 1. Identificación",
    `${nombreCaso}: la primera línea debe ser el encabezado documental esperado`
  );

  assertLineaContiene(nombreCaso, texto, "Cuenca");
  assertLineaContiene(nombreCaso, texto, "Área");
  assertLineaContiene(nombreCaso, texto, "Fuente de contexto");
  assertLineaContiene(nombreCaso, texto, "Estación IDF");
  assertLineaContiene(nombreCaso, texto, "Pendiente media");
  assertLineaContiene(nombreCaso, texto, "Longitud cauce principal");

  for (const fragmento of expectativas.fragmentosObligatorios) {
    assertLineaContiene(nombreCaso, texto, fragmento);
  }

  assertSinResiduosTecnicos(nombreCaso, texto);

  console.log(`OK ${nombreCaso}`);
  console.log(texto);
  console.log("");
}

const contextoCompleto = {
  cuenca: "La Iguaná PC_80",
  nombreCuenca: "La Iguaná PC_80",
  cuencaActiva: {
    nombre: "La Iguaná PC_80",
    areaKm2: 46.8516,
    pendienteMediaPct: 8.43,
    longitudCaucePrincipalKm: 15.524
  },
  areaKm2: 46.8516,
  fuenteContexto: "HidroFlow",
  estacionIdf: "SAN CRISTOBAL",
  estacionIDF: "SAN CRISTOBAL",
  pendienteMediaPct: 8.43,
  longitudCaucePrincipalKm: 15.524
};

const contextoFallback = {};

validarCaso(
  "contexto completo",
  contextoCompleto,
  {
    fragmentosObligatorios: [
      "La Iguaná PC_80",
      "46.8516",
      "HidroFlow",
      "SAN CRISTOBAL",
      "8.43",
      "15.524"
    ]
  }
);

validarCaso(
  "contexto fallback",
  contextoFallback,
  {
    fragmentosObligatorios: [
      "Cuenca activa",
      "—",
      "HidroFlow",
      "SAN CRISTOBAL"
    ]
  }
);

console.log("VALIDACION_OT_0124_IDENTIFICACION_OK");
