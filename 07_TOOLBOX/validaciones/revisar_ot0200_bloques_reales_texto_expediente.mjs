import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0200/OT-0200B_revision_estructural_bloques_texto_expediente.md"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");

const indiceTextoExpediente = textoComparador.indexOf("const textoExpediente = [");

const cierreTextoExpediente =
  indiceTextoExpediente === -1
    ? -1
    : textoComparador.indexOf('].join("\\n")', indiceTextoExpediente);

const segmentoTextoExpediente =
  indiceTextoExpediente === -1 || cierreTextoExpediente === -1
    ? ""
    : textoComparador.slice(
        indiceTextoExpediente,
        cierreTextoExpediente + '].join("\\n")'.length
      );

const lineasSegmento = segmentoTextoExpediente.split(/\r?\n/u);

const helperRegex = /\.\.\.(construirLineas[A-Za-z0-9_]+Expediente)\s*\(\s*\{/u;

const helpers = [];

lineasSegmento.forEach((linea, indice) => {
  const coincidencia = linea.match(helperRegex);

  if (!coincidencia) {
    return;
  }

  const helperNombre = coincidencia[1];

  const indiceFin = lineasSegmento.findIndex((lineaCierre, indiceCierre) =>
    indiceCierre > indice && lineaCierre.includes("}),")
  );

  const rutaOperativa =
    indiceFin === -1
      ? linea
      : lineasSegmento.slice(indice, indiceFin + 1).join("\n");

  helpers.push({
    helperNombre,
    lineaInicio: indice + 1,
    lineaFin: indiceFin === -1 ? null : indiceFin + 1,
    pasaContextoBase: rutaOperativa.includes("contextoBase"),
    rutaOperativa
  });
});

const encabezados = [];

lineasSegmento.forEach((linea, indice) => {
  const coincidencias = Array.from(
    linea.matchAll(/["'`](#{1,3}\s+[^"'`]+)["'`]/gu)
  );

  coincidencias.forEach((coincidencia) => {
    encabezados.push({
      linea: indice + 1,
      encabezado: coincidencia[1].trim()
    });
  });
});

const helpersUnicos = Array.from(
  new Map(helpers.map((item) => [item.helperNombre, item])).values()
);

const encabezadosUnicos = Array.from(
  new Map(encabezados.map((item) => [item.encabezado, item])).values()
);

const terminosSensibles = [
  "q5",
  "q_5",
  "racional",
  "hidrogram",
  "diagnostico",
  "diagnóstico",
  "volumen",
  "caudal",
  "qt"
];

const candidatosPrudentes = helpersUnicos
  .filter((item) => {
    const nombre = item.helperNombre.toLowerCase();
    return !terminosSensibles.some((termino) => nombre.includes(termino));
  })
  .map((item) => item.helperNombre);

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  totalLineasSegmento: lineasSegmento.length,
  totalHelpersDetectados: helpersUnicos.length,
  totalEncabezadosLiteralesDetectados: encabezadosUnicos.length,
  helpersDetectados: helpersUnicos.map((item) => ({
    helperNombre: item.helperNombre,
    pasaContextoBase: item.pasaContextoBase,
    lineaInicio: item.lineaInicio,
    lineaFin: item.lineaFin
  })),
  encabezadosLiteralesDetectados: encabezadosUnicos,
  candidatosPrudentes,
  decisionPreliminar:
    helpersUnicos.length > 0
      ? "usar inventario real para seleccionar siguiente bloque integrado"
      : "requiere revisión manual adicional de textoExpediente"
};

const bloquesHelpers =
  helpersUnicos.length > 0
    ? helpersUnicos.flatMap((item) => [
        `### ${item.helperNombre}`,
        "",
        "```javascript",
        item.rutaOperativa,
        "```",
        ""
      ])
    : [
        "No se detectaron helpers expandidos dentro de `textoExpediente`.",
        ""
      ];

const bloquesEncabezados =
  encabezadosUnicos.length > 0
    ? encabezadosUnicos.map((item) => `- Línea ${item.linea}: ${item.encabezado}`)
    : ["No se detectaron encabezados literales `## ...` dentro de `textoExpediente`."];

const lineasReporte = [
  "# OT-0200B — Revisión estructural de bloques reales dentro de textoExpediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Helpers expandidos dentro de textoExpediente",
  "",
  ...bloquesHelpers,
  "## Encabezados literales detectados",
  "",
  ...bloquesEncabezados,
  "",
  "## Candidatos prudentes derivados del inventario",
  "",
  candidatosPrudentes.length > 0
    ? candidatosPrudentes.map((item) => `- ${item}`).join("\n")
    : "No se identificaron candidatos prudentes automáticos.",
  "",
  "## Lectura técnica",
  "",
  "- La revisión se limita al segmento `textoExpediente` dentro de `ComparadorMultiMetodo.jsx`.",
  "- No se modificó ningún archivo operativo.",
  "- El inventario debe usarse como base para seleccionar el próximo bloque, evitando candidatos no integrados.",
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
  "- No se tocó motor hidrológico."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log("REVISION_OT_0200_BLOQUES_REALES_TEXTO_EXPEDIENTE_OK");
console.log(JSON.stringify(resumen, null, 2));
