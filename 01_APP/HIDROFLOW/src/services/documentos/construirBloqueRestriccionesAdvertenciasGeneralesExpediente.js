// OT-0222 — Helper puro documental.
// Construye un bloque acotado de restricciones y advertencias generales del expediente.
// No consulta motor, no recalcula, no modifica UI y no integra textoExpediente.

const TERMINOS_SENSIBLES = [
  "q-5",
  "método racional",
  "metodo racional",
  "diagnóstico q(t)",
  "diagnostico q(t)",
  "q(t)",
  "volumen",
  "q-tr",
  "pe",
  "masa",
  "hidrograma",
  "hidrogramas",
  "caudal",
  "caudales",
  "adoptado",
  "adopción",
  "adopcion",
  "validado",
  "aprobado",
  "seleccionado"
];

function normalizarTextoGeneral(valor) {
  if (typeof valor !== "string") {
    return "";
  }

  return valor
    .replace(/\s+/g, " ")
    .trim();
}

function contieneTerminoSensible(texto) {
  const base = normalizarTextoGeneral(texto).toLowerCase();

  if (!base) {
    return false;
  }

  return TERMINOS_SENSIBLES.some((termino) => base.includes(termino));
}

function limpiarListaGeneral(lista) {
  if (!Array.isArray(lista)) {
    return [];
  }

  return lista
    .map((item) => normalizarTextoGeneral(item))
    .filter((item) => item.length > 0)
    .filter((item) => !contieneTerminoSensible(item));
}

function agregarLista(lineas, titulo, elementos, textoVacio) {
  lineas.push(`### ${titulo}`);
  lineas.push("");

  if (!elementos.length) {
    lineas.push(`- ${textoVacio}`);
    lineas.push("");
    return;
  }

  elementos.forEach((elemento) => {
    lineas.push(`- ${elemento}`);
  });

  lineas.push("");
}

export function construirBloqueRestriccionesAdvertenciasGeneralesExpediente({
  advertenciasGenerales = [],
  restriccionesGenerales = [],
  alcanceGeneral = "",
  incluirTitulo = true
} = {}) {
  const lineas = [];

  const advertencias = limpiarListaGeneral(advertenciasGenerales);
  const restricciones = limpiarListaGeneral(restriccionesGenerales);
  const alcance = normalizarTextoGeneral(alcanceGeneral);

  if (incluirTitulo) {
    lineas.push("## Restricciones y advertencias generales del expediente");
    lineas.push("");
  }

  if (alcance && !contieneTerminoSensible(alcance)) {
    lineas.push(alcance);
    lineas.push("");
  } else {
    lineas.push("Este bloque tiene alcance documental e interpretativo general.");
    lineas.push("");
  }

  agregarLista(
    lineas,
    "Restricciones generales",
    restricciones,
    "No se suministraron restricciones generales específicas."
  );

  agregarLista(
    lineas,
    "Advertencias generales",
    advertencias,
    "No se suministraron advertencias generales específicas."
  );

  lineas.push("### Nota de alcance");
  lineas.push("");
  lineas.push("- El expediente no modifica el motor hidrológico.");
  lineas.push("- El expediente no recalcula resultados.");
  lineas.push("- Las advertencias generales no implican adopción hidrológica.");
  lineas.push("- Los resultados sensibles deben revisarse en sus bloques específicos.");
  lineas.push("- Este bloque no sustituye la validación técnica especializada.");

  return lineas;
}
