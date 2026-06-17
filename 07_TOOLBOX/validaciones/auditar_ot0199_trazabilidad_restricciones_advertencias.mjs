import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaModulo = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0199/OT-0199B_auditoria_trazabilidad_restricciones_advertencias.md"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");
const textoModulo = fs.readFileSync(rutaModulo, "utf8");

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

const terminosBloque = [
  "Restricciones",
  "restricciones",
  "Advertencias técnicas",
  "advertencias técnicas",
  "Advertencias tecnicas",
  "advertencias tecnicas",
  "Advertencia técnica",
  "advertencia técnica",
  "Advertencia tecnica",
  "advertencia tecnica",
  "Limitaciones",
  "limitaciones"
];

const mencionesTextoExpediente = terminosBloque.filter((termino) =>
  segmentoTextoExpediente.includes(termino)
);

const helperCandidatosBase = [
  "construirLineasRestriccionesAdvertenciasTecnicasExpediente",
  "construirLineasRestriccionesTecnicasExpediente",
  "construirLineasAdvertenciasTecnicasExpediente",
  "construirLineasRestriccionesExpediente",
  "construirLineasLimitacionesExpediente"
];

const helpersExportadosDetectados = Array.from(
  textoModulo.matchAll(/export function (construirLineas\w*(Restric|Advert|Limit)\w*Expediente)/gu)
).map((coincidencia) => coincidencia[1]);

const helperCandidatos = Array.from(
  new Set([...helperCandidatosBase, ...helpersExportadosDetectados])
);

const lineasSegmento = segmentoTextoExpediente.split(/\r?\n/u);

const rutasHelper = helperCandidatos.map((helperNombre) => {
  const indiceRutaHelper = lineasSegmento.findIndex((linea) =>
    linea.includes(`...${helperNombre}({`)
  );

  const indiceFinRutaHelper =
    indiceRutaHelper === -1
      ? -1
      : lineasSegmento.findIndex((linea, indice) =>
          indice > indiceRutaHelper && linea.includes("}),")
        );

  const rutaOperativa =
    indiceRutaHelper === -1 || indiceFinRutaHelper === -1
      ? ""
      : lineasSegmento.slice(indiceRutaHelper, indiceFinRutaHelper + 1).join("\n");

  return {
    helperNombre,
    rutaOperativaLocalizada: rutaOperativa.length > 0,
    rutaOperativa,
    pasaContextoBase: rutaOperativa.includes("contextoBase"),
    exportadoEnModulo: textoModulo.includes(`export function ${helperNombre}`)
  };
});

const rutasOperativasLocalizadas = rutasHelper.filter((item) => item.rutaOperativaLocalizada);
const helpersExportados = rutasHelper.filter((item) => item.exportadoEnModulo);

let helperEjecutado = "";
let helperImportable = false;
let salidaControlada = [];
let errorHelper = "";
let residuos = [];

const residuosProhibidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

try {
  const modulo = await import(pathToFileURL(rutaModulo).href);

  const helperPreferente =
    rutasOperativasLocalizadas[0]?.helperNombre ??
    helpersExportados[0]?.helperNombre ??
    "";

  if (helperPreferente.length > 0) {
    helperEjecutado = helperPreferente;

    const helper = modulo[helperPreferente];

    helperImportable = typeof helper === "function";

    if (helperImportable) {
      const resultado = helper({
        contextoBase: {
          fuente: "Control OT-0199",
          restricciones: [
            "Control textual de restricciones",
            "Control textual de advertencias técnicas"
          ],
          advertenciasTecnicas: [
            "Advertencia técnica controlada"
          ]
        }
      });

      salidaControlada = Array.isArray(resultado)
        ? resultado
        : [`SALIDA_NO_ARREGLO: ${String(resultado)}`];

      const textoSalida = salidaControlada.join("\n");

      residuos = residuosProhibidos.filter((token) =>
        textoSalida.includes(token)
      );
    }
  }
} catch (error) {
  errorHelper = error instanceof Error ? error.message : String(error);
}

const textoSalidaControlada = Array.isArray(salidaControlada)
  ? salidaControlada.join("\n")
  : String(salidaControlada);

const hayRutaOperativa = rutasOperativasLocalizadas.length > 0;
const hayHelperExportado = helpersExportados.length > 0;

const decisionPreliminar =
  hayRutaOperativa && helperImportable && residuos.length === 0
    ? "candidato apto para validación aislada posterior"
    : hayRutaOperativa
      ? "requiere revisión del helper antes de avanzar"
      : mencionesTextoExpediente.length > 0
        ? "existe mención textual, pero requiere trazabilidad manual más precisa"
        : "requiere revisión antes de avanzar";

const resumen = {
  textoExpedienteDetectado: indiceTextoExpediente !== -1,
  cierreTextoExpedienteDetectado: cierreTextoExpediente !== -1,
  mencionesTextoExpediente,
  cantidadMencionesTextoExpediente: mencionesTextoExpediente.length,
  rutasOperativasLocalizadas: rutasOperativasLocalizadas.map((item) => ({
    helperNombre: item.helperNombre,
    pasaContextoBase: item.pasaContextoBase
  })),
  helpersExportados: helpersExportados.map((item) => item.helperNombre),
  helperEjecutado,
  helperImportable,
  lineasSalidaControlada: Array.isArray(salidaControlada) ? salidaControlada.length : 0,
  residuos,
  errorHelper,
  decisionPreliminar
};

const bloquesRutaOperativa =
  rutasOperativasLocalizadas.length > 0
    ? rutasOperativasLocalizadas.flatMap((item) => [
        `### ${item.helperNombre}`,
        "",
        "```javascript",
        item.rutaOperativa,
        "```",
        ""
      ])
    : [
        "No se localizó ruta operativa de helper candidato dentro de `textoExpediente`.",
        ""
      ];

const lineasReporte = [
  "# OT-0199B — Auditoría/trazabilidad bloque Restricciones o advertencias técnicas",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Menciones textuales detectadas en textoExpediente",
  "",
  mencionesTextoExpediente.length > 0
    ? mencionesTextoExpediente.map((termino) => `- ${termino}`).join("\n")
    : "No se detectaron menciones textuales directas a restricciones o advertencias técnicas dentro de `textoExpediente`.",
  "",
  "## Rutas operativas detectadas",
  "",
  ...bloquesRutaOperativa,
  "## Helpers candidatos exportados",
  "",
  helpersExportados.length > 0
    ? helpersExportados.map((item) => `- ${item.helperNombre}`).join("\n")
    : "No se detectaron helpers candidatos exportados con los nombres auditados.",
  "",
  "## Salida controlada del helper candidato",
  "",
  "```text",
  textoSalidaControlada.length > 0
    ? textoSalidaControlada
    : "No se obtuvo salida controlada de helper candidato.",
  "```",
  "",
  "## Lectura técnica",
  "",
  hayRutaOperativa
    ? "- Se localizó al menos una ruta operativa candidata dentro de `textoExpediente`."
    : "- No se localizó ruta operativa de helper candidato dentro de `textoExpediente`.",
  "",
  hayHelperExportado
    ? "- Se detectó al menos un helper candidato exportado en `construirExpedienteHidrologicoMinimo.js`."
    : "- No se detectó helper candidato exportado con los nombres auditados.",
  "",
  helperImportable
    ? "- El helper candidato ejecutado se importa correctamente como función."
    : "- No se ejecutó helper candidato importable.",
  "",
  residuos.length === 0
    ? "- No se detectaron residuos `undefined`, `null`, `NaN` ni `[object Object]` en la salida controlada disponible."
    : `- Se detectaron residuos en la salida controlada: ${residuos.join(", ")}.`,
  "",
  errorHelper.length === 0
    ? "- No se registró error al ejecutar el helper candidato."
    : `- Error al ejecutar helper candidato: ${errorHelper}.`,
  "",
  "## Decisión preliminar",
  "",
  decisionPreliminar,
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

console.log("AUDITORIA_OT_0199_TRAZABILIDAD_RESTRICCIONES_ADVERTENCIAS_OK");
console.log(JSON.stringify(resumen, null, 2));
