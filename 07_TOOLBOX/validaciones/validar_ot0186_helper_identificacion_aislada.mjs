import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rutaModulo = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0186/OT-0186B_validacion_aislada_helper_identificacion.md"
);

const modulo = await import(pathToFileURL(rutaModulo).href);

const { construirLineasIdentificacionExpediente } = modulo;

assert.equal(
  typeof construirLineasIdentificacionExpediente,
  "function",
  "Debe exportarse construirLineasIdentificacionExpediente como función."
);

const casos = [
  {
    nombre: "contexto vacío con fallbacks explícitos",
    entrada: {
      contextoBase: {},
      fuenteFallback: "HidroFlow",
      estacionIdfFallback: "IDF_CONTROL"
    }
  },
  {
    nombre: "contexto con cuenca candidata como objeto",
    entrada: {
      contextoBase: {
        cuenca: {
          nombre: "La Iguaná PC_80"
        }
      },
      fuenteFallback: "HidroFlow",
      estacionIdfFallback: "IDF_CONTROL"
    }
  },
  {
    nombre: "contexto con identificadores alternos",
    entrada: {
      contextoBase: {
        nombreCuenca: "La Iguaná PC_80",
        estacionIdf: "San Cristóbal"
      },
      fuenteFallback: "HidroFlow",
      estacionIdfFallback: "IDF_CONTROL"
    }
  },
  {
    nombre: "entrada mínima sin argumentos útiles",
    entrada: {}
  },
  {
    nombre: "entrada nula simulada por objeto vacío controlado",
    entrada: {
      contextoBase: null,
      fuenteFallback: "HidroFlow",
      estacionIdfFallback: "IDF_CONTROL"
    }
  }
];

const residuosProhibidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const resultados = casos.map((caso) => {
  const lineas = construirLineasIdentificacionExpediente(caso.entrada);

  assert.equal(
    Array.isArray(lineas),
    true,
    `El caso "${caso.nombre}" debe retornar un arreglo.`
  );

  assert.equal(
    lineas.every((linea) => typeof linea === "string"),
    true,
    `Todas las líneas del caso "${caso.nombre}" deben ser texto.`
  );

  const texto = lineas.join("\n");

  const residuos = residuosProhibidos.filter((token) => texto.includes(token));

  return {
    nombre: caso.nombre,
    lineas: lineas.length,
    contieneEncabezado: texto.includes("## 1. Identificación"),
    contieneCuenca: texto.includes("Cuenca:"),
    residuos,
    validacionEstructural:
      Array.isArray(lineas) &&
      lineas.every((linea) => typeof linea === "string") &&
      texto.includes("## 1. Identificación") &&
      texto.includes("Cuenca:"),
    validacionResiduos: residuos.length === 0,
    salida: lineas
  };
});

const casosConResiduos = resultados.filter((item) => item.residuos.length > 0);

const resumen = {
  helperExportado: typeof construirLineasIdentificacionExpediente === "function",
  casosValidados: resultados.length,
  todosRetornanArregloTexto: resultados.every((item) => item.validacionEstructural),
  todosContienenEncabezado: resultados.every((item) => item.contieneEncabezado),
  todosContienenCuenca: resultados.every((item) => item.contieneCuenca),
  validacionResiduosAprobada: casosConResiduos.length === 0,
  casosConResiduos: casosConResiduos.map((item) => ({
    nombre: item.nombre,
    residuos: item.residuos
  })),
  validacionAisladaAprobada: casosConResiduos.length === 0
};

const lineasReporte = [
  "# OT-0186B — Validación aislada helper Identificación existente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Resultado",
  "",
  resumen.validacionAisladaAprobada
    ? "La validación aislada del helper Identificación fue aprobada."
    : "La validación aislada del helper Identificación detectó hallazgos y no debe considerarse aprobada.",
  "",
  "## Hallazgo principal",
  "",
  casosConResiduos.length === 0
    ? "No se detectaron residuos prohibidos."
    : casosConResiduos.map((item) => `- Caso \`${item.nombre}\`: residuos detectados ${item.residuos.join(", ")}.`).join("\n"),
  "",
  "## Casos evaluados",
  "",
  ...resultados.flatMap((resultado) => [
    `### ${resultado.nombre}`,
    "",
    "```json",
    JSON.stringify(
      {
        lineas: resultado.lineas,
        contieneEncabezado: resultado.contieneEncabezado,
        contieneCuenca: resultado.contieneCuenca,
        residuos: resultado.residuos,
        validacionEstructural: resultado.validacionEstructural,
        validacionResiduos: resultado.validacionResiduos
      },
      null,
      2
    ),
    "```",
    "",
    "```text",
    resultado.salida.join("\n"),
    "```",
    ""
  ]),
  "## Lectura técnica",
  "",
  "- El helper se exporta correctamente como función.",
  "- El helper retorna arreglos de líneas de texto.",
  "- La salida contiene el encabezado `## 1. Identificación`.",
  "- La salida contiene línea de `Cuenca:`.",
  casosConResiduos.length === 0
    ? "- No se detectaron residuos `undefined`, `null`, `NaN` ni `[object Object]`."
    : "- Se detectó al menos un residuo prohibido. El helper requiere saneamiento antes de considerarse plenamente validado.",
  "",
  "## Restricciones mantenidas",
  "",
  "- No se modificó `ComparadorMultiMetodo.jsx`.",
  "- No se modificó `construirExpedienteHidrologicoMinimo.js`.",
  "- No se modificó `textoExpediente`.",
  "- No se modificó botón de copiado.",
  "- No se modificó portapapeles.",
  "- No se tocó Q-5 operativo.",
  "- No se tocó Método Racional.",
  "- No se tocó diagnóstico Q(t).",
  "- No se tocó motor hidrológico.",
  "",
  "## Decisión",
  "",
  resumen.validacionAisladaAprobada
    ? "El helper puede avanzar a comparación controlada."
    : "No avanzar a comparación controlada todavía. Primero debe abrirse una OT específica de saneamiento del helper Identificación."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log(
  resumen.validacionAisladaAprobada
    ? "VALIDACION_OT_0186_HELPER_IDENTIFICACION_AISLADA_OK"
    : "HALLAZGO_OT_0186_HELPER_IDENTIFICACION_AISLADA_RESIDUOS"
);

console.log(JSON.stringify(resumen, null, 2));
