import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaHelper = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const rutaSalida = path.resolve(
  "00_ADMIN/bitacora/OT-0125/OT-0125B_auditoria_anclajes_comparador_identificacion.md"
);

function leerArchivo(ruta) {
  if (!fs.existsSync(ruta)) {
    throw new Error(`No existe el archivo requerido: ${ruta}`);
  }

  return fs.readFileSync(ruta, "utf8");
}

function contarCoincidenciasLiteral(texto, literal) {
  return texto.split(literal).length - 1;
}

function buscarLineas(texto, patrones) {
  const lineas = texto.split(/\r?\n/);

  return patrones.map((patron) => {
    const hallazgos = [];

    lineas.forEach((linea, indice) => {
      if (linea.includes(patron)) {
        hallazgos.push({
          linea: indice + 1,
          texto: linea.trim()
        });
      }
    });

    return {
      patron,
      hallazgos
    };
  });
}

const comparador = leerArchivo(rutaComparador);
const helper = leerArchivo(rutaHelper);

const patronesComparador = [
  "textoExpediente",
  "## 1. Identificación",
  "Identificación",
  "navigator.clipboard",
  "writeText",
  "Copiar expediente",
  "construirLineasIdentificacionExpediente",
  "construirExpedienteHidrologicoMinimo"
];

const patronesHelper = [
  "export function construirLineasIdentificacionExpediente",
  "construirLineasIdentificacionExpediente",
  "## 1. Identificación"
];

const hallazgosComparador = buscarLineas(comparador, patronesComparador);
const hallazgosHelper = buscarLineas(helper, patronesHelper);

const resumen = {
  comparadorExiste: fs.existsSync(rutaComparador),
  helperExiste: fs.existsSync(rutaHelper),
  comparadorTieneTextoExpediente: comparador.includes("textoExpediente"),
  comparadorTieneBloqueIdentificacion: comparador.includes("## 1. Identificación"),
  comparadorYaImportaFuncionIdentificacion: comparador.includes("construirLineasIdentificacionExpediente"),
  helperExportaFuncionIdentificacion: helper.includes("export function construirLineasIdentificacionExpediente"),
  ocurrenciasTextoExpediente: contarCoincidenciasLiteral(comparador, "textoExpediente"),
  ocurrenciasBloqueIdentificacion: contarCoincidenciasLiteral(comparador, "## 1. Identificación"),
  ocurrenciasNavigatorClipboard: contarCoincidenciasLiteral(comparador, "navigator.clipboard"),
  ocurrenciasWriteText: contarCoincidenciasLiteral(comparador, "writeText")
};

function formatearHallazgos(titulo, hallazgos) {
  const lineas = [`## ${titulo}`, ""];

  for (const item of hallazgos) {
    lineas.push(`### Patrón: \`${item.patron}\``);
    lineas.push("");

    if (item.hallazgos.length === 0) {
      lineas.push("- Sin hallazgos.");
      lineas.push("");
      continue;
    }

    for (const hallazgo of item.hallazgos) {
      lineas.push(`- Línea ${hallazgo.linea}: \`${hallazgo.texto}\``);
    }

    lineas.push("");
  }

  return lineas.join("\n");
}

const contenido = [
  "# OT-0125B — Auditoría de anclajes para integración diagnóstica Identificación delegada",
  "",
  "## Resumen automático",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Interpretación",
  "",
  "- Esta auditoría no modifica `ComparadorMultiMetodo.jsx`.",
  "- Esta auditoría no integra todavía la función delegada.",
  "- Esta auditoría identifica anclajes reales antes de cualquier parche.",
  "- La integración solo debe hacerse si los anclajes son claros y el diff queda limitado.",
  "",
  formatearHallazgos("Hallazgos en ComparadorMultiMetodo.jsx", hallazgosComparador),
  "",
  formatearHallazgos("Hallazgos en helper documental", hallazgosHelper),
  "",
  "## Restricciones mantenidas",
  "",
  "- No se reemplazó `textoExpediente`.",
  "- No se modificó botón.",
  "- No se modificó portapapeles.",
  "- No se tocó Q-5.",
  "- No se tocó Método Racional.",
  "- No se tocó diagnóstico Q(t).",
  "- No se tocó motor hidrológico.",
  "",
  "## Resultado",
  "",
  "Auditoría de anclajes completada para decidir integración diagnóstica mínima en OT-0125C."
].join("\n");

fs.writeFileSync(rutaSalida, contenido, "utf8");

console.log("AUDITORIA_OT_0125_ANCLAJES_OK");
console.log(JSON.stringify(resumen, null, 2));
