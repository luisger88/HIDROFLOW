const fs = require("fs");
const path = require("path");

const rutaExpediente = path.join(
  process.cwd(),
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

if (!fs.existsSync(rutaExpediente)) {
  throw new Error(`No existe el constructor del expediente: ${rutaExpediente}`);
}

let fuente = fs.readFileSync(rutaExpediente, "utf8");

const importHelper =
  'import { construirBloqueResumenQ5AuditadoExpediente } from "./construirBloqueResumenQ5AuditadoExpediente";';

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function insertarImportUnico(texto) {
  if (texto.includes(importHelper)) {
    return texto;
  }

  const lineas = texto.split(/\r?\n/);
  let ultimoImport = -1;

  for (let i = 0; i < lineas.length; i += 1) {
    if (/^\s*import\s+/.test(lineas[i])) {
      ultimoImport = i;
    }
  }

  if (ultimoImport < 0) {
    throw new Error("No se encontró bloque de imports para insertar el helper Resumen Q-5.");
  }

  lineas.splice(ultimoImport + 1, 0, importHelper);
  return lineas.join("\n");
}

function reemplazarBloqueInlineResumenQ5(texto) {
  const bloqueInline = `    "## 6. Resumen Q-5 auditado",
    \`Métodos recibidos: \${Array.isArray(metodos) ? metodos.length : 0}\`,
    "Estado: sección contractual inicial del helper puro.",`;

  const bloqueDelegado = `    ...construirLineasResumenQ5AuditadoExpediente({
      metodosQ5: metodos,
      estadoResumenQ5AuditadoExpediente: "sección contractual inicial del helper puro"
    }),`;

  if (!texto.includes(bloqueInline)) {
    throw new Error("No se encontró el bloque inline exacto de Resumen Q-5 para sustituir.");
  }

  return texto.replace(bloqueInline, bloqueDelegado);
}

function reemplazarFuncionResumenQ5HastaSiguienteExportOFin(texto) {
  const nombreFuncion = "export function construirLineasResumenQ5AuditadoExpediente";
  const inicio = texto.indexOf(nombreFuncion);

  if (inicio < 0) {
    throw new Error("No se encontró construirLineasResumenQ5AuditadoExpediente.");
  }

  const siguienteExportFuncion = texto.indexOf("\nexport function ", inicio + 1);
  const siguienteExportDefault = texto.indexOf("\nexport default function ", inicio + 1);

  const candidatos = [siguienteExportFuncion, siguienteExportDefault]
    .filter((indice) => indice > inicio)
    .sort((a, b) => a - b);

  const fin = candidatos.length > 0 ? candidatos[0] : texto.length;

  const funcionDelegada = `export function construirLineasResumenQ5AuditadoExpediente(entrada = {}) {
  return construirBloqueResumenQ5AuditadoExpediente({
    metodosQ5: entrada?.metodosQ5 ?? entrada?.metodos,
    estadoResumenQ5AuditadoExpediente: entrada?.estadoResumenQ5AuditadoExpediente,
    faltantesResumenQ5AuditadoExpediente: entrada?.faltantesResumenQ5AuditadoExpediente,
    incluirTitulo: true
  });
}
`;

  return `${texto.slice(0, inicio)}${funcionDelegada}${texto.slice(fin)}`;
}

fuente = insertarImportUnico(fuente);
fuente = reemplazarBloqueInlineResumenQ5(fuente);
fuente = reemplazarFuncionResumenQ5HastaSiguienteExportOFin(fuente);

const ocurrenciasImport = contarOcurrencias(fuente, importHelper);
const ocurrenciasFuncion = contarOcurrencias(
  fuente,
  "export function construirLineasResumenQ5AuditadoExpediente"
);
const ocurrenciasHelper = contarOcurrencias(
  fuente,
  "construirBloqueResumenQ5AuditadoExpediente"
);
const ocurrenciasVersion = contarOcurrencias(
  fuente,
  "export const VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO"
);
const ocurrenciasBloqueInlineAntiguo = contarOcurrencias(
  fuente,
  `    "## 6. Resumen Q-5 auditado",
    \`Métodos recibidos: \${Array.isArray(metodos) ? metodos.length : 0}\`,
    "Estado: sección contractual inicial del helper puro.",`
);

if (ocurrenciasImport !== 1) {
  throw new Error(`Import del helper Resumen Q-5 no quedó único. Ocurrencias: ${ocurrenciasImport}`);
}

if (ocurrenciasFuncion !== 1) {
  throw new Error(`Función auxiliar Resumen Q-5 no quedó única. Ocurrencias: ${ocurrenciasFuncion}`);
}

if (ocurrenciasHelper < 3) {
  throw new Error(`El helper no parece estar importado y usado. Ocurrencias: ${ocurrenciasHelper}`);
}

if (ocurrenciasVersion !== 1) {
  throw new Error(`Posible duplicación del archivo detectada. VERSION aparece ${ocurrenciasVersion} veces.`);
}

if (ocurrenciasBloqueInlineAntiguo !== 0) {
  throw new Error(`El bloque inline antiguo sigue presente. Ocurrencias: ${ocurrenciasBloqueInlineAntiguo}`);
}

if (fuente.includes("}import {")) {
  throw new Error("Patrón inválido detectado: }import {");
}

if (fuente.includes("}) {\n  const entradaSegura")) {
  throw new Error("Patrón inválido detectado: }) { const entradaSegura");
}

fs.writeFileSync(rutaExpediente, fuente, "utf8");

console.log("ACOPLE_OT_0311_RESUMEN_Q5_COMPLETADO_SEGURO");
console.log(JSON.stringify({
  rutaExpediente,
  ocurrenciasImport,
  ocurrenciasFuncion,
  ocurrenciasHelper,
  ocurrenciasVersion,
  ocurrenciasBloqueInlineAntiguo
}, null, 2));
