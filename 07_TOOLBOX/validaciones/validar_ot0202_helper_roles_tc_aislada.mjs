import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rutaModulo = path.resolve("01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js");
const rutaReporte = path.resolve("00_ADMIN/bitacora/OT-0202/OT-0202B_validacion_aislada_helper_roles_tc.md");
const helperNombre = "construirLineasTiempoConcentracionRolesTcExpediente";

const residuosProhibidos = ["undefined", "null", "NaN", "[object Object]"];

const etiquetasEsperadas = [
  "## 3. Tiempo de concentración y roles Tc",
  "Tc comparador:",
  "Tr global activo:",
  "Roles Tc:"
];

const casos = [
  {
    nombre: "valores operativos controlados",
    entrada: {
      Tc_final: 114.23,
      trDisenoActivoExpediente: 100
    }
  },
  {
    nombre: "valores enteros simples",
    entrada: {
      Tc_final: 75,
      trDisenoActivoExpediente: 50
    }
  },
  {
    nombre: "valores ausentes",
    entrada: {}
  },
  {
    nombre: "valores nulos controlados",
    entrada: {
      Tc_final: null,
      trDisenoActivoExpediente: null
    }
  },
  {
    nombre: "valores objeto candidatos",
    entrada: {
      Tc_final: { valor: 114.23 },
      trDisenoActivoExpediente: { valor: 100 }
    }
  }
];

let helperExportado = false;
let errorGeneral = "";
let resultados = [];

try {
  const modulo = await import(pathToFileURL(rutaModulo).href);
  const helper = modulo[helperNombre];

  helperExportado = typeof helper === "function";

  if (helperExportado) {
    resultados = casos.map((caso) => {
      let lineas = [];
      let errorCaso = "";

      try {
        const resultado = helper(caso.entrada);

        lineas = Array.isArray(resultado)
          ? resultado
          : [`SALIDA_NO_ARREGLO: ${String(resultado)}`];
      } catch (error) {
        errorCaso = error instanceof Error ? error.message : String(error);
        lineas = [];
      }

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
        retornaArregloTexto:
          Array.isArray(lineas) && lineas.every((linea) => typeof linea === "string"),
        etiquetasFaltantes,
        residuos,
        errorCaso,
        salida: lineas
      };
    });
  }
} catch (error) {
  errorGeneral = error instanceof Error ? error.message : String(error);
}

const casosConEtiquetasFaltantes = resultados.filter((item) => item.etiquetasFaltantes.length > 0);
const casosConResiduos = resultados.filter((item) => item.residuos.length > 0);
const casosConError = resultados.filter((item) => item.errorCaso.length > 0);

const resumen = {
  helperExportado,
  casosValidados: resultados.length,
  todosRetornanArregloTexto: resultados.every((item) => item.retornaArregloTexto),
  validacionEtiquetasAprobada: casosConEtiquetasFaltantes.length === 0,
  validacionResiduosAprobada: casosConResiduos.length === 0,
  validacionErroresAprobada: casosConError.length === 0 && errorGeneral.length === 0,
  casosConEtiquetasFaltantes: casosConEtiquetasFaltantes.map((item) => ({
    nombre: item.nombre,
    etiquetasFaltantes: item.etiquetasFaltantes
  })),
  casosConResiduos: casosConResiduos.map((item) => ({
    nombre: item.nombre,
    residuos: item.residuos
  })),
  casosConError: casosConError.map((item) => ({
    nombre: item.nombre,
    errorCaso: item.errorCaso
  })),
  errorGeneral,
  validacionAisladaAprobada:
    helperExportado &&
    resultados.length === casos.length &&
    casosConEtiquetasFaltantes.length === 0 &&
    casosConResiduos.length === 0 &&
    casosConError.length === 0 &&
    errorGeneral.length === 0
};

const lineasReporte = [
  "# OT-0202B — Validación aislada helper Tiempo de concentración y roles Tc",
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
    ? "La validación aislada del helper Tiempo de concentración y roles Tc fue aprobada."
    : "La validación aislada del helper Tiempo de concentración y roles Tc detectó hallazgos y no debe considerarse aprobada.",
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
  casosConError.length === 0 && errorGeneral.length === 0
    ? "- No se detectaron errores de ejecución."
    : "- Se detectó al menos un error de ejecución.",
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
        retornaArregloTexto: resultado.retornaArregloTexto,
        etiquetasFaltantes: resultado.etiquetasFaltantes,
        residuos: resultado.residuos,
        errorCaso: resultado.errorCaso
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
  "- El helper se evalúa en aislamiento, sin tocar ruta operativa.",
  "- Se valida encabezado, etiquetas mínimas y ausencia de residuos textuales.",
  "- Esta OT no corrige ni sustituye contenido.",
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
    : "No avanzar todavía a comparación controlada. Primero debe abrirse una OT específica de saneamiento o ajuste del helper si el hallazgo lo amerita."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log(
  resumen.validacionAisladaAprobada
    ? "VALIDACION_OT_0202_HELPER_ROLES_TC_AISLADA_OK"
    : "HALLAZGO_OT_0202_HELPER_ROLES_TC_AISLADA"
);

console.log(JSON.stringify(resumen, null, 2));
