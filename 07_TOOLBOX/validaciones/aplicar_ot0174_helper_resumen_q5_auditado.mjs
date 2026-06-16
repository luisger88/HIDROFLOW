import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaHelper = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

let texto = fs.readFileSync(rutaHelper, "utf8");

const nombreFuncion = "export function construirLineasResumenQ5AuditadoExpediente";

assert.equal(
  texto.includes(nombreFuncion),
  false,
  "La función construirLineasResumenQ5AuditadoExpediente ya existe. No se debe duplicar."
);

const funcion = `

export function construirLineasResumenQ5AuditadoExpediente(entrada = {}) {
  const entradaSegura = entrada && typeof entrada === "object" ? entrada : {};

  const { tablaQ5Markdown = [] } = entradaSegura;

  const normalizarLinea = (valor) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "string") {
      return valor;
    }

    if (typeof valor === "number" && Number.isFinite(valor)) {
      return String(valor);
    }

    return "—";
  };

  const tabla = Array.isArray(tablaQ5Markdown)
    ? tablaQ5Markdown
        .map((linea) => normalizarLinea(linea))
        .filter((linea) => linea.trim().length > 0)
    : [];

  const lineasTabla = tabla.length > 0
    ? tabla
    : ["sin tabla Q-5 disponible"];

  return [
    "## 6. Resumen Q-5 auditado",
    "Estado general: diagnóstico no adoptivo.",
    "SCS Unit Hydrograph: candidato principal de referencia.",
    "SCS Mod.: variante ajustable.",
    "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
    "Masa y volumen: controlados frente a referencia física.",
    "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
    "",
    "Tabla Q-5 auditada:",
    ...lineasTabla,
    "",
    ""
  ];
}
`;

texto = texto.trimEnd() + funcion + "\\n";

fs.writeFileSync(rutaHelper, texto, "utf8");

console.log("APLICACION_OT_0174_HELPER_RESUMEN_Q5_AUDITADO_OK");
