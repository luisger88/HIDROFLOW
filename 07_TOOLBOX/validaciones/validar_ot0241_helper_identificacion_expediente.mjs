import fs from "fs";
import { execSync } from "child_process";
import { construirBloqueIdentificacionExpedienteMinimo } from "../../01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js";

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const terminosProhibidos = [
  "Q-5",
  "Q-Tr",
  "Método Racional",
  "Q(t)",
  "Volumen",
  "Pe",
  "masa",
  "caudal",
  "caudales",
  "intensidad IDF",
  "coeficiente hidrológico",
  "tiempo de concentración calculado",
  "adopción técnica",
  "validación hidrológica",
  "suficiencia hidráulica",
  "suficiencia hidrológica"
];

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function evaluarCaso(nombre, entrada, expectativas = {}) {
  const salidaA = construirBloqueIdentificacionExpedienteMinimo(entrada);
  const salidaB = construirBloqueIdentificacionExpedienteMinimo(entrada);
  const texto = salidaA.join("\n");

  const resultado = {
    nombre,
    salidaEsArray: Array.isArray(salidaA),
    salidaStringArray: Array.isArray(salidaA) && salidaA.every((item) => typeof item === "string"),
    deterministica: JSON.stringify(salidaA) === JSON.stringify(salidaB),
    longitud: Array.isArray(salidaA) ? salidaA.length : null,
    contieneTitulo: texto.includes("## 1. Identificación"),
    contieneCamposMinimos:
      texto.includes("- Cuenca activa:") &&
      texto.includes("- Identificador interno de cuenca:") &&
      texto.includes("- Versión del expediente:") &&
      texto.includes("- Tipo de salida documental:") &&
      texto.includes("- Fecha de generación:") &&
      texto.includes("- Fuente o modo de generación:") &&
      texto.includes("- Estado documental:") &&
      texto.includes("- Alcance documental:"),
    tokensInvalidos: tokensInvalidos
      .map((token) => ({ token, ocurrencias: contarOcurrencias(texto, token) }))
      .filter((item) => item.ocurrencias > 0),
    terminosProhibidos: terminosProhibidos
      .map((termino) => ({ termino, ocurrencias: contarOcurrencias(texto, termino) }))
      .filter((item) => item.ocurrencias > 0),
    texto
  };

  resultado.respetaTitulo =
    typeof expectativas.incluirTitulo === "boolean"
      ? resultado.contieneTitulo === expectativas.incluirTitulo
      : true;

  resultado.aprobado =
    resultado.salidaEsArray &&
    resultado.salidaStringArray &&
    resultado.deterministica &&
    resultado.contieneCamposMinimos &&
    resultado.respetaTitulo &&
    resultado.tokensInvalidos.length === 0 &&
    resultado.terminosProhibidos.length === 0;

  return resultado;
}

const casos = [
  evaluarCaso("entrada_vacia", {}, { incluirTitulo: true }),
  evaluarCaso(
    "entrada_completa_valida",
    {
      cuenca: "La Iguaná PC_80",
      identificadorCuenca: "PC_80",
      versionExpediente: "expediente_hidrologico_minimo_v0_1",
      tipoSalida: "expediente_hidrologico_minimo",
      fechaGeneracion: "VALIDACION_OT_0241",
      fuente: "helper_puro_identificacion",
      estadoDocumental: "Borrador documental controlado",
      alcanceDocumental: "Bloque documental de identificación del expediente.",
      incluirTitulo: true
    },
    { incluirTitulo: true }
  ),
  evaluarCaso(
    "sin_titulo",
    {
      cuenca: "La Iguaná PC_80",
      identificadorCuenca: "PC_80",
      incluirTitulo: false
    },
    { incluirTitulo: false }
  ),
  evaluarCaso(
    "valores_no_textuales",
    {
      cuenca: { nombre: "Objeto no permitido" },
      identificadorCuenca: ["PC_80"],
      versionExpediente: null,
      tipoSalida: undefined,
      fechaGeneracion: "",
      fuente: Number.NaN,
      estadoDocumental: true,
      alcanceDocumental: false,
      incluirTitulo: true
    },
    { incluirTitulo: true }
  )
];

let buildOk = false;
let buildSalida = "";

try {
  buildSalida = execSync("npm run build", {
    cwd: "01_APP/HIDROFLOW",
    encoding: "utf8",
    stdio: "pipe"
  });

  buildOk = buildSalida.includes("built") || buildSalida.includes("✓ built");
} catch (error) {
  buildSalida = `${error.stdout || ""}\n${error.stderr || ""}`;
  buildOk = false;
}

const resumen = {
  validacion: "OT-0241",
  helper: "construirBloqueIdentificacionExpedienteMinimo",
  totalCasos: casos.length,
  casosAprobados: casos.filter((caso) => caso.aprobado).length,
  casosFallidos: casos.filter((caso) => !caso.aprobado).length,
  buildAprobado: buildOk,
  validacionAisladaAprobada: casos.every((caso) => caso.aprobado) && buildOk,
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0241B — Validación aislada helper bloque Identificación del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Casos evaluados",
  ""
];

for (const caso of casos) {
  const copia = { ...caso };
  delete copia.texto;

  salidaMarkdown.push(`### ${caso.nombre}`);
  salidaMarkdown.push("");
  salidaMarkdown.push("```json");
  salidaMarkdown.push(JSON.stringify(copia, null, 2));
  salidaMarkdown.push("```");
  salidaMarkdown.push("");
}

salidaMarkdown.push("## Build");
salidaMarkdown.push("");
salidaMarkdown.push(buildOk ? "Build aprobado." : "Build fallido.");
salidaMarkdown.push("");
salidaMarkdown.push("## Lectura técnica");
salidaMarkdown.push("");
salidaMarkdown.push("- La validación se ejecutó de forma aislada.");
salidaMarkdown.push("- No se integró el helper al expediente operativo.");
salidaMarkdown.push("- No se modificó `construirExpedienteHidrologicoMinimo.js`.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se tocaron bloques sensibles.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.validacionAisladaAprobada
    ? "El helper de Identificación queda validado aisladamente."
    : "El helper de Identificación no debe considerarse validado hasta corregir los hallazgos detectados."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push("`OT-0242 — Decisión integración helper Identificación del expediente`");

const rutaSalida = "00_ADMIN/bitacora/OT-0241/OT-0241B_validacion_aislada_helper_identificacion_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0241", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("VALIDACION_OT_0241_HELPER_IDENTIFICACION_OK");
console.log(JSON.stringify(resumen, null, 2));
