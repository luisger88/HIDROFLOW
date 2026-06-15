import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaSalida = path.resolve(
  "00_ADMIN/bitacora/OT-0125/OT-0125C_contexto_parche_minimo_identificacion.md"
);

function leerArchivo(ruta) {
  if (!fs.existsSync(ruta)) {
    throw new Error(`No existe el archivo requerido: ${ruta}`);
  }

  return fs.readFileSync(ruta, "utf8");
}

function extraerVentanas(texto, patron, margen = 12) {
  const lineas = texto.split(/\r?\n/);
  const ventanas = [];

  lineas.forEach((linea, indice) => {
    if (linea.includes(patron)) {
      const inicio = Math.max(0, indice - margen);
      const fin = Math.min(lineas.length - 1, indice + margen);

      ventanas.push({
        patron,
        lineaCentral: indice + 1,
        inicio: inicio + 1,
        fin: fin + 1,
        contenido: lineas
          .slice(inicio, fin + 1)
          .map((contenidoLinea, offset) => {
            const numeroLinea = inicio + offset + 1;
            const marca = numeroLinea === indice + 1 ? ">>" : "  ";
            return `${marca} ${String(numeroLinea).padStart(5, " ")} | ${contenidoLinea}`;
          })
          .join("\n")
      });
    }
  });

  return ventanas;
}

function formatearVentanas(titulo, ventanas) {
  const salida = [`## ${titulo}`, ""];

  if (ventanas.length === 0) {
    salida.push("- Sin hallazgos.");
    salida.push("");
    return salida.join("\n");
  }

  ventanas.forEach((ventana, indice) => {
    salida.push(`### Ventana ${indice + 1}`);
    salida.push("");
    salida.push(`- Patrón: \`${ventana.patron}\``);
    salida.push(`- Línea central: ${ventana.lineaCentral}`);
    salida.push(`- Rango: ${ventana.inicio}-${ventana.fin}`);
    salida.push("");
    salida.push("```jsx");
    salida.push(ventana.contenido);
    salida.push("```");
    salida.push("");
  });

  return salida.join("\n");
}

const comparador = leerArchivo(rutaComparador);

const primerasLineas = comparador
  .split(/\r?\n/)
  .slice(0, 80)
  .map((linea, indice) => `  ${String(indice + 1).padStart(5, " ")} | ${linea}`)
  .join("\n");

const ventanasTextoExpediente = extraerVentanas(comparador, "textoExpediente", 10);
const ventanasIdentificacion = extraerVentanas(comparador, "## 1. Identificación", 14);
const ventanasCopiarExpediente = extraerVentanas(comparador, "Copiar expediente", 10);
const ventanasReturn = extraerVentanas(comparador, "return (", 6);

const contenido = [
  "# OT-0125C — Contexto de parche mínimo para Identificación delegada",
  "",
  "## Objetivo",
  "",
  "Extraer contexto real de `ComparadorMultiMetodo.jsx` antes de integrar diagnósticamente `construirLineasIdentificacionExpediente(...)`.",
  "",
  "Esta auditoría no modifica el componente.",
  "",
  "## Primeras 80 líneas del componente",
  "",
  "```jsx",
  primerasLineas,
  "```",
  "",
  formatearVentanas("Ventanas alrededor de textoExpediente", ventanasTextoExpediente),
  "",
  formatearVentanas("Ventanas alrededor de ## 1. Identificación", ventanasIdentificacion),
  "",
  formatearVentanas("Ventanas alrededor de Copiar expediente", ventanasCopiarExpediente),
  "",
  formatearVentanas("Ventanas alrededor de return", ventanasReturn),
  "",
  "## Restricciones mantenidas",
  "",
  "- No se importó todavía `construirLineasIdentificacionExpediente`.",
  "- No se modificó `ComparadorMultiMetodo.jsx`.",
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
  "Contexto de parche mínimo disponible para definir OT-0125D con anclajes reales."
].join("\n");

fs.writeFileSync(rutaSalida, contenido, "utf8");

console.log("CONTEXTO_OT_0125_PARche_MINIMO_OK");
console.log(`Archivo generado: ${rutaSalida}`);
console.log(`Ventanas textoExpediente: ${ventanasTextoExpediente.length}`);
console.log(`Ventanas Identificación: ${ventanasIdentificacion.length}`);
console.log(`Ventanas Copiar expediente: ${ventanasCopiarExpediente.length}`);
console.log(`Ventanas return: ${ventanasReturn.length}`);
