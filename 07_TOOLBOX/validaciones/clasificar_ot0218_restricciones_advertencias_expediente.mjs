import fs from "fs";
import path from "path";

const objetivos = [
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js",
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
];

const categorias = [
  {
    id: "restricciones_advertencias",
    nombre: "Restricciones y advertencias técnicas",
    patrones: ["restric", "advert", "cautela", "limit"]
  },
  {
    id: "notas_aclaraciones",
    nombre: "Notas y aclaraciones documentales",
    patrones: ["nota", "no implica"]
  },
  {
    id: "no_adopcion_no_competencia",
    nombre: "Mensajes no adoptivos o no competentes",
    patrones: ["no adop", "no competente", "no selecciona", "no recalcula", "no modifica", "no levanta"]
  },
  {
    id: "validacion_auditoria_criterio",
    nombre: "Validación, auditoría y criterios",
    patrones: ["validación", "auditor", "criterio"]
  },
  {
    id: "q5_racional_qt",
    nombre: "Referencias Q-5, Método Racional y diagnóstico Q(t)",
    patrones: ["Q-5", "Método Racional", "diagnóstico", "Q(t)"]
  },
  {
    id: "contraste_referencial",
    nombre: "Contraste, referencia y lectura comparativa",
    patrones: ["contraste", "referencial", "complementarios", "comparativo"]
  },
  {
    id: "volumen_qtr_pe",
    nombre: "Referencias a Volumen, Q-Tr, Pe o masa hidrológica",
    patrones: ["volumen", "Q-Tr", "Pe", "masa"]
  }
];

const patronGlobal = [
  "restric",
  "advert",
  "nota",
  "cautela",
  "no adop",
  "no competente",
  "referencial",
  "contraste",
  "validación",
  "auditor",
  "criterio",
  "limit",
  "no implica",
  "no selecciona",
  "no recalcula",
  "no modifica",
  "Q-5",
  "Método Racional",
  "diagnóstico",
  "Q(t)",
  "volumen",
  "Q-Tr",
  "Pe",
  "masa"
];

function incluyePatron(texto, patron) {
  return texto.toLowerCase().includes(patron.toLowerCase());
}

function patronesDetectados(texto, patrones) {
  return patrones.filter((patron) => incluyePatron(texto, patron));
}

const coincidencias = [];
const archivos = [];

for (const archivo of objetivos) {
  if (!fs.existsSync(archivo)) {
    archivos.push({ archivo, existe: false, totalCoincidencias: 0 });
    continue;
  }

  const contenido = fs.readFileSync(archivo, "utf8");
  const lineas = contenido.split(/\r?\n/);
  let totalArchivo = 0;

  lineas.forEach((linea, idx) => {
    const detectadosGlobal = patronesDetectados(linea, patronGlobal);

    if (!detectadosGlobal.length) {
      return;
    }

    totalArchivo += 1;

    const categoriasDetectadas = categorias
      .filter((categoria) => patronesDetectados(linea, categoria.patrones).length > 0)
      .map((categoria) => categoria.id);

    coincidencias.push({
      archivo,
      linea: idx + 1,
      patrones: detectadosGlobal,
      categorias: categoriasDetectadas.length ? categoriasDetectadas : ["sin_categoria_especifica"],
      texto: linea.trim()
    });
  });

  archivos.push({ archivo, existe: true, totalCoincidencias: totalArchivo });
}

const resumenCategorias = {};

for (const categoria of categorias) {
  resumenCategorias[categoria.id] = {
    nombre: categoria.nombre,
    total: coincidencias.filter((item) => item.categorias.includes(categoria.id)).length
  };
}

resumenCategorias.sin_categoria_especifica = {
  nombre: "Sin categoría específica",
  total: coincidencias.filter((item) => item.categorias.includes("sin_categoria_especifica")).length
};

const salida = [
  "# OT-0218B — Clasificación documental de restricciones y advertencias del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify({
    auditoriaBase: "OT-0216",
    clasificacion: "OT-0218",
    archivosRevisados: archivos.length,
    archivosExistentes: archivos.filter((a) => a.existe).length,
    totalCoincidenciasClasificadas: coincidencias.length,
    categorias: resumenCategorias,
    modificaCodigoAplicacion: false,
    modificaMotor: false,
    modificaTextoExpediente: false
  }, null, 2),
  "```",
  "",
  "## Alcance",
  "",
  "Esta clasificación organiza documentalmente la evidencia detectada en OT-0216.",
  "",
  "No consolida textos.",
  "",
  "No modifica archivos fuente.",
  "",
  "No modifica `textoExpediente`, `ComparadorMultiMetodo.jsx` ni `construirExpedienteHidrologicoMinimo.js`.",
  "",
  "## Archivos revisados",
  "",
  ...archivos.map((archivo) => `- ${archivo.archivo} — existe: ${archivo.existe}; coincidencias: ${archivo.totalCoincidencias}`),
  "",
  "## Clasificación por categorías",
  ""
];

for (const categoria of categorias) {
  const items = coincidencias.filter((item) => item.categorias.includes(categoria.id));

  salida.push(`### ${categoria.nombre}`);
  salida.push("");
  salida.push(`Total de coincidencias clasificadas: ${items.length}`);
  salida.push("");

  const muestras = items.slice(0, 12);

  if (!muestras.length) {
    salida.push("No se identificaron coincidencias para esta categoría.");
    salida.push("");
    continue;
  }

  salida.push("Muestras representativas:");
  salida.push("");

  for (const item of muestras) {
    salida.push(`- ${item.archivo} — línea ${item.linea}; patrones [${item.patrones.join(", ")}]`);
    salida.push("");
    salida.push("```text");
    salida.push(item.texto);
    salida.push("```");
    salida.push("");
  }

  if (items.length > muestras.length) {
    salida.push(`Se omitieron ${items.length - muestras.length} coincidencias adicionales de esta categoría para mantener la evidencia controlada.`);
    salida.push("");
  }
}

const sinCategoria = coincidencias.filter((item) => item.categorias.includes("sin_categoria_especifica"));

salida.push("### Sin categoría específica");
salida.push("");
salida.push(`Total: ${sinCategoria.length}`);
salida.push("");

if (sinCategoria.length) {
  for (const item of sinCategoria.slice(0, 12)) {
    salida.push(`- ${item.archivo} — línea ${item.linea}; patrones [${item.patrones.join(", ")}]`);
    salida.push("");
    salida.push("```text");
    salida.push(item.texto);
    salida.push("```");
    salida.push("");
  }
}

salida.push("## Lectura técnica");
salida.push("");
salida.push("- La evidencia de OT-0216 no debe consolidarse directamente sin una decisión posterior.");
salida.push("- Las referencias detectadas mezclan restricciones, advertencias, notas, mensajes no adoptivos, validaciones y referencias a bloques sensibles.");
salida.push("- La clasificación permite separar el análisis antes de cualquier eventual consolidación.");
salida.push("");
salida.push("## Decisión");
salida.push("");
salida.push("Cualquier consolidación o ajuste posterior debe realizarse en una OT independiente.");
salida.push("");
salida.push("## Próximo frente recomendado");
salida.push("");
salida.push("`OT-0219 — Decisión sobre bloque de restricciones y advertencias clasificadas`");

const rutaSalida = "00_ADMIN/bitacora/OT-0218/OT-0218B_clasificacion_documental_restricciones_advertencias_expediente.md";

fs.mkdirSync(path.dirname(rutaSalida), { recursive: true });
fs.writeFileSync(rutaSalida, salida.join("\n"), "utf8");

console.log("CLASIFICACION_OT_0218_RESTRICCIONES_ADVERTENCIAS_OK");
console.log(JSON.stringify({
  archivosRevisados: archivos.length,
  archivosExistentes: archivos.filter((a) => a.existe).length,
  totalCoincidenciasClasificadas: coincidencias.length,
  categorias: resumenCategorias,
  salida: rutaSalida
}, null, 2));
