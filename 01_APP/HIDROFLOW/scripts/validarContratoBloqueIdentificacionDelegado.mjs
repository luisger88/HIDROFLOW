// OT-0121B — Validación contractual documental del bloque Identificación delegado.
// Este script NO modifica código funcional, NO toca UI, NO toca portapapeles
// y NO implementa todavía una función auxiliar del helper.

import fs from "node:fs";
import path from "node:path";

const raiz = path.resolve(process.cwd(), "../..");

const rutasContrato = [
  "00_ADMIN/bitacora/OT-0120/OT-0120A_diseno_contrato_bloque_identificacion_delegado.md",
  "00_ADMIN/bitacora/OT-0120/OT-0120B_matriz_contrato_bloque_identificacion.md",
  "00_ADMIN/bitacora/OT-0120/OT-0120C_cierre_contrato_bloque_identificacion_delegado.md",
  "00_ADMIN/bitacora/OT-0121/OT-0121B_complemento_contrato_identificacion_campos_restricciones.md"
];

const rutaComparador = path.resolve(
  process.cwd(),
  "src/components/ComparadorMultiMetodo.jsx"
);

function leerArchivoRelativo(rutaRelativa) {
  const rutaAbsoluta = path.resolve(raiz, rutaRelativa);
  return fs.existsSync(rutaAbsoluta) ? fs.readFileSync(rutaAbsoluta, "utf8") : "";
}

const contenidosContrato = rutasContrato.map((ruta) => ({
  ruta,
  contenido: leerArchivoRelativo(ruta)
}));

const textoContrato = contenidosContrato
  .map((item) => `\n--- ${item.ruta} ---\n${item.contenido}`)
  .join("\n");

const fuenteComparador = fs.existsSync(rutaComparador)
  ? fs.readFileSync(rutaComparador, "utf8")
  : "";

const errores = [];

function verificar(condicion, mensaje) {
  if (!condicion) errores.push(mensaje);
}

const artefactosFaltantes = contenidosContrato
  .filter((item) => !item.contenido)
  .map((item) => item.ruta);

verificar(
  artefactosFaltantes.length === 0,
  `Faltan artefactos contractuales: ${artefactosFaltantes.join(", ")}`
);

const lineasObligatorias = [
  "## 1. Identificación",
  "Cuenca:",
  "Área:",
  "Fuente de contexto:",
  "Estación IDF:",
  "Pendiente media:",
  "Longitud cauce principal:"
];

lineasObligatorias.forEach((linea) => {
  verificar(
    textoContrato.includes(linea),
    `El contrato no menciona la línea obligatoria: ${linea}`
  );
});

const camposPermitidos = [
  "cuencaNombre",
  "area_km2",
  "fuente",
  "estacion_idf",
  "estacionIDF",
  "estacion",
  "nombre_estacion",
  "idf.nombre",
  "idf.estacion",
  "pendiente_media_pct",
  "longitud_cauce_km"
];

camposPermitidos.forEach((campo) => {
  verificar(
    textoContrato.includes(campo),
    `El contrato no menciona el campo permitido: ${campo}`
  );
});

const camposProhibidos = [
  "hidrogramas",
  "metodo_racional",
  "q_tr_activo_estado",
  "resultados Q-5",
  "filasMorfologiaQt",
  "filasDictamenFormaQt",
  "filasRiesgoTemporalQt",
  "sintesisRiesgoTemporalQt",
  "validadores finales",
  "portapapeles"
];

camposProhibidos.forEach((campo) => {
  verificar(
    textoContrato.includes(campo),
    `El contrato no menciona el campo o alcance prohibido: ${campo}`
  );
});

const tokensProhibidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

tokensProhibidos.forEach((token) => {
  verificar(
    textoContrato.includes(token),
    `El contrato no menciona el token prohibido: ${token}`
  );
});

const fallbacksEsperados = [
  "Cuenca activa",
  "—",
  "HidroFlow",
  "SAN CRISTOBAL"
];

fallbacksEsperados.forEach((fallback) => {
  verificar(
    textoContrato.includes(fallback),
    `El contrato no menciona el fallback esperado: ${fallback}`
  );
});

const seccionesSensibles = [
  "Q-5",
  "Método Racional",
  "diagnóstico Q(t)",
  "diagnóstico temporal Q(t)",
  "validadores finales",
  "portapapeles"
];

seccionesSensibles.forEach((item) => {
  verificar(
    textoContrato.includes(item),
    `El contrato no deja restricción explícita sobre: ${item}`
  );
});

verificar(
  fuenteComparador.includes("## 1. Identificación"),
  "ComparadorMultiMetodo.jsx no conserva el bloque operativo ## 1. Identificación."
);

verificar(
  fuenteComparador.includes("textoExpediente"),
  "ComparadorMultiMetodo.jsx no conserva referencia a textoExpediente."
);

verificar(
  fuenteComparador.includes("document.execCommand(\"copy\")") ||
    fuenteComparador.includes("document.execCommand('copy')"),
  "No se encontró el mecanismo de copiado existente document.execCommand."
);

const resumen = {
  ok: errores.length === 0,
  artefactos: {
    esperados: rutasContrato.length,
    faltantes: artefactosFaltantes.length
  },
  contrato: {
    lineasObligatorias: lineasObligatorias.length,
    camposPermitidos: camposPermitidos.length,
    camposProhibidos: camposProhibidos.length,
    tokensProhibidos: tokensProhibidos.length,
    fallbacksEsperados: fallbacksEsperados.length,
    restriccionesSensibles: seccionesSensibles.length
  },
  comparador: {
    conservaBloqueIdentificacion: fuenteComparador.includes("## 1. Identificación"),
    conservaTextoExpediente: fuenteComparador.includes("textoExpediente"),
    conservaCopiado: fuenteComparador.includes("document.execCommand(\"copy\")") ||
      fuenteComparador.includes("document.execCommand('copy')")
  }
};

console.log("OT-0121B — Validación contractual bloque Identificación delegado");
console.log(JSON.stringify(resumen, null, 2));

if (errores.length > 0) {
  console.error("VALIDACIÓN CONTRACTUAL FALLIDA:");
  errores.forEach((error, indice) => {
    console.error(`${indice + 1}. ${error}`);
  });
  process.exit(1);
}

console.log(
  "VALIDACIÓN CONTRACTUAL APROBADA: contrato del bloque Identificación completo y sin ampliación funcional."
);

