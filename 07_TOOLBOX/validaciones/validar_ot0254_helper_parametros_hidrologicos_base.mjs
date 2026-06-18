import fs from "fs";
import os from "os";
import path from "path";
import { execSync } from "child_process";
import { pathToFileURL } from "url";

const raiz = process.cwd();

const rutaHelper = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueParametrosHidrologicosBaseExpediente.js"
);

const fuenteHelper = fs.readFileSync(rutaHelper, "utf8");

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function prepararModuloTemporal() {
  const carpetaTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "ot0254-hidroflow-"));
  const rutaTemporal = path.join(carpetaTemporal, "construirBloqueParametrosHidrologicosBaseExpediente.mjs");

  fs.writeFileSync(rutaTemporal, fuenteHelper, "utf8");

  return { carpetaTemporal, rutaTemporal };
}

function textoSalida(lineas) {
  return Array.isArray(lineas) ? lineas.join("\n") : "";
}

function contieneTodos(texto, patrones) {
  return patrones.every((patron) => texto.includes(patron));
}

function evaluarCaso(nombre, entrada, expectativas = {}) {
  const snapshot = JSON.stringify(entrada);
  const salida1 = construirBloqueParametrosHidrologicosBaseExpediente(entrada);
  const salida2 = construirBloqueParametrosHidrologicosBaseExpediente(entrada);
  const texto1 = textoSalida(salida1);
  const texto2 = textoSalida(salida2);

  const camposMinimos = [
    "CN:",
    "CN base:",
    "CN efectivo:",
    "AMC:"
  ];

  return {
    nombre,
    entrada,
    salida: salida1,
    texto: texto1,
    stringArray: Array.isArray(salida1) && salida1.every((linea) => typeof linea === "string"),
    deterministica: JSON.stringify(salida1) === JSON.stringify(salida2) && texto1 === texto2,
    noMutacion: JSON.stringify(entrada) === snapshot,
    contieneTitulo: texto1.includes("## 2. Parámetros hidrológicos base"),
    camposMinimosPresentes: contieneTodos(texto1, camposMinimos),
    longitud: Array.isArray(salida1) ? salida1.length : null,
    expectativasCumplidas:
      Object.entries(expectativas).every(([patron, esperado]) =>
        esperado ? texto1.includes(patron) : !texto1.includes(patron)
      )
  };
}

const temporal = prepararModuloTemporal();

let modulo = null;
let importModuloOk = false;
let importModuloError = "";

try {
  modulo = await import(pathToFileURL(temporal.rutaTemporal).href);
  importModuloOk = true;
} catch (error) {
  importModuloError = `${error?.message || error}`;
  importModuloOk = false;
}

const construirBloqueParametrosHidrologicosBaseExpediente =
  modulo?.construirBloqueParametrosHidrologicosBaseExpediente;

const helperDefault = modulo?.default;

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
  "hidrogramas",
  "Pe",
  "masa",
  "intensidades IDF",
  "caudales",
  "tiempos de concentración calculados",
  "conclusiones técnicas",
  "dictámenes de suficiencia"
];

let casos = [];

if (importModuloOk && typeof construirBloqueParametrosHidrologicosBaseExpediente === "function") {
  casos = [
    evaluarCaso(
      "entrada_completa_con_titulo",
      {
        CN: 86,
        CN_base: 80,
        CN_efectivo: 87,
        AMC: "II",
        incluirTitulo: true
      },
      {
        "## 2. Parámetros hidrológicos base": true,
        "CN: 86": true,
        "CN base: 80": true,
        "CN efectivo: 87": true,
        "AMC: II": true
      }
    ),
    evaluarCaso(
      "entrada_completa_sin_titulo",
      {
        CN: 86,
        CN_base: 80,
        CN_efectivo: 87,
        AMC: "II",
        incluirTitulo: false
      },
      {
        "## 2. Parámetros hidrológicos base": false,
        "CN: 86": true,
        "CN base: 80": true,
        "CN efectivo: 87": true,
        "AMC: II": true
      }
    ),
    evaluarCaso(
      "entrada_vacia",
      {},
      {
        "CN: —": true,
        "CN base: —": true,
        "CN efectivo: —": true,
        "AMC: —": true
      }
    ),
    evaluarCaso(
      "entrada_parcial",
      {
        CN: 86
      },
      {
        "CN: 86": true,
        "CN base: —": true,
        "CN efectivo: —": true,
        "AMC: —": true
      }
    ),
    evaluarCaso(
      "valores_null_undefined_nan_objeto",
      {
        CN: null,
        CN_base: undefined,
        CN_efectivo: Number.NaN,
        AMC: { valor: "II" }
      },
      {
        "CN: —": true,
        "CN base: —": true,
        "CN efectivo: —": true,
        "AMC: —": true
      }
    ),
    evaluarCaso(
      "cadenas_con_espacios",
      {
        CN: " 86 ",
        CN_base: " ",
        CN_efectivo: "87",
        AMC: " II "
      },
      {
        "CN: 86": true,
        "CN base: —": true,
        "CN efectivo: 87": true,
        "AMC: II": true
      }
    )
  ];
}

const textosCasos = casos.map((caso) => caso.texto).join("\n---\n");

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

const controles = [
  {
    id: "archivo_helper_existe",
    descripcion: "El archivo del helper existe",
    aprobado: fs.existsSync(rutaHelper)
  },
  {
    id: "modulo_importable",
    descripcion: "El helper pudo importarse como módulo temporal ESM",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "export_named_presente",
    descripcion: "Export nombrado del helper presente",
    aprobado: typeof construirBloqueParametrosHidrologicosBaseExpediente === "function"
  },
  {
    id: "export_default_presente",
    descripcion: "Export default del helper presente",
    aprobado: typeof helperDefault === "function"
  },
  {
    id: "casos_generan_string_array",
    descripcion: "Todos los casos devuelven string[]",
    fallidos: casos.filter((caso) => !caso.stringArray).map((caso) => caso.nombre),
    aprobado: casos.length > 0 && casos.every((caso) => caso.stringArray)
  },
  {
    id: "titulo_opcional",
    descripcion: "El título se incluye u omite según incluirTitulo",
    aprobado:
      casos.find((caso) => caso.nombre === "entrada_completa_con_titulo")?.contieneTitulo === true &&
      casos.find((caso) => caso.nombre === "entrada_completa_sin_titulo")?.contieneTitulo === false
  },
  {
    id: "campos_minimos_presentes",
    descripcion: "Todos los casos contienen campos mínimos",
    fallidos: casos.filter((caso) => !caso.camposMinimosPresentes).map((caso) => caso.nombre),
    aprobado: casos.length > 0 && casos.every((caso) => caso.camposMinimosPresentes)
  },
  {
    id: "expectativas_de_normalizacion",
    descripcion: "Todos los casos cumplen las expectativas documentales definidas",
    fallidos: casos.filter((caso) => !caso.expectativasCumplidas).map((caso) => caso.nombre),
    aprobado: casos.length > 0 && casos.every((caso) => caso.expectativasCumplidas)
  },
  {
    id: "sin_tokens_invalidos",
    descripcion: "La salida no contiene tokens inválidos",
    hallazgos: tokensInvalidos
      .map((token) => ({
        token,
        ocurrencias: contarOcurrencias(textosCasos, token)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: tokensInvalidos.every((token) => contarOcurrencias(textosCasos, token) === 0)
  },
  {
    id: "sin_terminos_prohibidos",
    descripcion: "La salida no contiene términos prohibidos ajenos al bloque",
    hallazgos: terminosProhibidos
      .map((termino) => ({
        termino,
        ocurrencias: contarOcurrencias(textosCasos, termino)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: terminosProhibidos.every((termino) => contarOcurrencias(textosCasos, termino) === 0)
  },
  {
    id: "determinismo",
    descripcion: "Todos los casos son determinísticos",
    fallidos: casos.filter((caso) => !caso.deterministica).map((caso) => caso.nombre),
    aprobado: casos.length > 0 && casos.every((caso) => caso.deterministica)
  },
  {
    id: "no_mutacion",
    descripcion: "El helper no muta las entradas",
    fallidos: casos.filter((caso) => !caso.noMutacion).map((caso) => caso.nombre),
    aprobado: casos.length > 0 && casos.every((caso) => caso.noMutacion)
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0254",
  helper: "construirBloqueParametrosHidrologicosBaseExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  casosEvaluados: casos.length,
  buildAprobado: buildOk,
  helperValidado: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0254B — Validación aislada helper Parámetros hidrológicos base del expediente",
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
  salidaMarkdown.push(`### ${caso.nombre}`);
  salidaMarkdown.push("");
  salidaMarkdown.push("```json");
  salidaMarkdown.push(JSON.stringify({
    nombre: caso.nombre,
    salida: caso.salida,
    stringArray: caso.stringArray,
    deterministica: caso.deterministica,
    noMutacion: caso.noMutacion,
    contieneTitulo: caso.contieneTitulo,
    camposMinimosPresentes: caso.camposMinimosPresentes,
    expectativasCumplidas: caso.expectativasCumplidas,
    longitud: caso.longitud
  }, null, 2));
  salidaMarkdown.push("```");
  salidaMarkdown.push("");
}

salidaMarkdown.push("## Controles evaluados");
salidaMarkdown.push("");

for (const control of controles) {
  salidaMarkdown.push(`### ${control.id}`);
  salidaMarkdown.push("");
  salidaMarkdown.push("```json");
  salidaMarkdown.push(JSON.stringify(control, null, 2));
  salidaMarkdown.push("```");
  salidaMarkdown.push("");
}

salidaMarkdown.push("## Lectura técnica");
salidaMarkdown.push("");
salidaMarkdown.push("- La validación importó el helper de forma aislada mediante una copia temporal ESM.");
salidaMarkdown.push("- La validación comprobó salida `string[]`, título opcional, campos mínimos, normalización documental, determinismo y no mutación.");
salidaMarkdown.push("- No se acopló el helper al constructor principal.");
salidaMarkdown.push("- No se modificó `construirExpedienteHidrologicoMinimo.js`.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se recalcularon ni validaron hidrológicamente `CN`, `CN base`, `CN efectivo` ni `AMC`.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidado
    ? "El helper `construirBloqueParametrosHidrologicosBaseExpediente` queda validado de forma aislada."
    : "El helper `construirBloqueParametrosHidrologicosBaseExpediente` requiere corrección antes de integrarse."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidado
    ? "`OT-0255 — Decisión integración helper Parámetros hidrológicos base del expediente`"
    : "`OT-0255 — Corrección helper Parámetros hidrológicos base del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0254/OT-0254B_validacion_aislada_helper_parametros_hidrologicos_base_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0254", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

try {
  fs.rmSync(temporal.carpetaTemporal, { recursive: true, force: true });
} catch {
  // Sin efecto funcional.
}

console.log("VALIDACION_OT_0254_HELPER_PARAMETROS_BASE_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
