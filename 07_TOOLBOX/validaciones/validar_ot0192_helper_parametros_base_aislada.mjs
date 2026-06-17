import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rutaModulo = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0192/OT-0192B_validacion_aislada_helper_parametros_base.md"
);

const modulo = await import(pathToFileURL(rutaModulo).href);

const { construirLineasParametrosHidrologicosBaseExpediente } = modulo;

assert.equal(
  typeof construirLineasParametrosHidrologicosBaseExpediente,
  "function",
  "Debe exportarse construirLineasParametrosHidrologicosBaseExpediente como función."
);

const casos = [
  {
    nombre: "contexto vacío",
    entrada: {
      contextoBase: {}
    }
  },
  {
    nombre: "contexto con parámetros numéricos simples",
    entrada: {
      contextoBase: {
        cn: 82,
        cnBase: 79,
        cnEfectivo: 86,
        amc: "II"
      }
    }
  },
  {
    nombre: "contexto con variantes de nombres",
    entrada: {
      contextoBase: {
        CN: 83,
        cn_base: 80,
        cn_efectivo: 87,
        AMC: "III"
      }
    }
  },
  {
    nombre: "contexto con valores nulos controlados",
    entrada: {
      contextoBase: {
        cn: null,
        cnBase: null,
        cnEfectivo: null,
        amc: null
      }
    }
  },
  {
    nombre: "contexto con objetos candidatos",
    entrada: {
      contextoBase: {
        cn: { valor: 82 },
        cnBase: { valor: 79 },
        cnEfectivo: { valor: 86 },
        amc: { nombre: "II" }
      }
    }
  }
];

const residuosProhibidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const etiquetasEsperadas = [
  "## 2. Parámetros hidrológicos base",
  "CN:",
  "CN base:",
  "CN efectivo:",
  "AMC:"
];

const resultados = casos.map((caso) => {
  const lineas = construirLineasParametrosHidrologicosBaseExpediente(caso.entrada);

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

  const etiquetasFaltantes = etiquetasEsperadas.filter((etiqueta) =>
    !texto.includes(etiqueta)
  );

  const residuos = residuosProhibidos.filter((token) =>
    texto.includes(token)
  );

  return {
    nombre: caso.nombre,
    lineas: lineas.length,
    etiquetasFaltantes,
    residuos,
    validacionEstructural:
      Array.isArray(lineas) &&
      lineas.every((linea) => typeof linea === "string") &&
      etiquetasFaltantes.length === 0,
    validacionResiduos: residuos.length === 0,
    salida: lineas
  };
});

const casosConResiduos = resultados.filter((item) => item.residuos.length > 0);
const casosConEtiquetasFaltantes = resultados.filter((item) => item.etiquetasFaltantes.length > 0);

const resumen = {
  helperExportado: typeof construirLineasParametrosHidrologicosBaseExpediente === "function",
  casosValidados: resultados.length,
  todosRetornanArregloTexto: resultados.every((item) => item.validacionEstructural),
  validacionEtiquetasAprobada: casosConEtiquetasFaltantes.length === 0,
  validacionResiduosAprobada: casosConResiduos.length === 0,
  casosConEtiquetasFaltantes: casosConEtiquetasFaltantes.map((item) => ({
    nombre: item.nombre,
    etiquetasFaltantes: item.etiquetasFaltantes
  })),
  casosConResiduos: casosConResiduos.map((item) => ({
    nombre: item.nombre,
    residuos: item.residuos
  })),
  validacionAisladaAprobada:
    casosConEtiquetasFaltantes.length === 0 &&
    casosConResiduos.length === 0
};

const lineasReporte = [
  "# OT-0192B — Validación aislada helper Parámetros hidrológicos base",
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
    ? "La validación aislada del helper Parámetros hidrológicos base fue aprobada."
    : "La validación aislada del helper Parámetros hidrológicos base detectó hallazgos y no debe considerarse aprobada.",
  "",
  "## Hallazgos",
  "",
  casosConEtiquetasFaltantes.length === 0
    ? "- No se detectaron etiquetas faltantes."
    : casosConEtiquetasFaltantes.map((item) => `- Caso \`${item.nombre}\`: etiquetas faltantes ${item.etiquetasFaltantes.join(", ")}.`).join("\n"),
  "",
  casosConResiduos.length === 0
    ? "- No se detectaron residuos prohibidos."
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
        etiquetasFaltantes: resultado.etiquetasFaltantes,
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
  "- Se valida la presencia del encabezado `## 2. Parámetros hidrológicos base` y de las etiquetas `CN:`, `CN base:`, `CN efectivo:` y `AMC:`.",
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
    ? "El helper puede avanzar a comparación controlada contra ruta operativa."
    : "No avanzar todavía a comparación controlada. Primero debe abrirse una OT específica de saneamiento o ajuste del helper Parámetros hidrológicos base."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log(
  resumen.validacionAisladaAprobada
    ? "VALIDACION_OT_0192_HELPER_PARAMETROS_BASE_AISLADA_OK"
    : "HALLAZGO_OT_0192_HELPER_PARAMETROS_BASE_AISLADA"
);

console.log(JSON.stringify(resumen, null, 2));
