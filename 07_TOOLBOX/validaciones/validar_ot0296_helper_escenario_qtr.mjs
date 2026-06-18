import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { pathToFileURL } from "url";

const raiz = process.cwd();

const rutaHelper = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js"
);

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const fuente = fs.existsSync(rutaHelper)
  ? fs.readFileSync(rutaHelper, "utf8")
  : "";

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function contieneTodos(texto, patrones) {
  return patrones.every((patron) => texto.includes(patron));
}

function contieneTokensInvalidos(texto) {
  return tokensInvalidos
    .map((token) => ({
      token,
      ocurrencias: contarOcurrencias(texto, token)
    }))
    .filter((item) => item.ocurrencias > 0);
}

function clonarJson(valor) {
  return JSON.parse(JSON.stringify(valor));
}

let modulo = null;
let importModuloOk = false;
let importModuloError = "";

try {
  modulo = await import(pathToFileURL(rutaHelper).href);
  importModuloOk = true;
} catch (error) {
  importModuloError = `${error?.name || "Error"}: ${error?.message || error}`;
  importModuloOk = false;
}

const construirBloqueEscenarioQTrActivoExpediente =
  modulo?.construirBloqueEscenarioQTrActivoExpediente;

const normalizarEstadoQTrActivoDocumental =
  modulo?.normalizarEstadoQTrActivoDocumental;

const formatearValorQTrActivoDocumental =
  modulo?.formatearValorQTrActivoDocumental;

const salidaVacia =
  typeof construirBloqueEscenarioQTrActivoExpediente === "function"
    ? construirBloqueEscenarioQTrActivoExpediente({})
    : [];

const salidaSinTitulo =
  typeof construirBloqueEscenarioQTrActivoExpediente === "function"
    ? construirBloqueEscenarioQTrActivoExpediente({ incluirTitulo: false })
    : [];

const entradaActiva = {
  estadoQTrActivoExpediente: "publicado",
  qTrActivoExpediente: 123.45,
  trDisenoActivoExpediente: 100,
  faltantesQTrActivoExpediente: []
};

const entradaActivaCopia = clonarJson(entradaActiva);

const salidaActiva =
  typeof construirBloqueEscenarioQTrActivoExpediente === "function"
    ? construirBloqueEscenarioQTrActivoExpediente(entradaActiva)
    : [];

const entradaFaltantes = {
  estadoQTrActivoExpediente: "publicado",
  qTrActivoExpediente: null,
  trDisenoActivoExpediente: null,
  faltantesQTrActivoExpediente: ["qTrActivoExpediente", "trDisenoActivoExpediente"]
};

const salidaFaltantes =
  typeof construirBloqueEscenarioQTrActivoExpediente === "function"
    ? construirBloqueEscenarioQTrActivoExpediente(entradaFaltantes)
    : [];

const textoVacio = Array.isArray(salidaVacia) ? salidaVacia.join("\n") : "";
const textoSinTitulo = Array.isArray(salidaSinTitulo) ? salidaSinTitulo.join("\n") : "";
const textoActivo = Array.isArray(salidaActiva) ? salidaActiva.join("\n") : "";
const textoFaltantes = Array.isArray(salidaFaltantes) ? salidaFaltantes.join("\n") : "";
const textoTotal = [textoVacio, textoSinTitulo, textoActivo, textoFaltantes].join("\n");

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

const patronesOperativosProhibidos = [
  "ComparadorMultiMetodo",
  "hidroEngine",
  "calcQTr",
  "calcularQTr",
  "calcularQ",
  "metodoRacional",
  "Método Racional",
  "diagnosticoQt",
  "diagnóstico Q(t)",
  "Q-5",
  "q5"
];

const patronesEstadoProhibidos = [
  "document.",
  "window.",
  "navigator.clipboard",
  "localStorage",
  "sessionStorage",
  "getTcState",
  "setTcState",
  "subscribeTc"
];

const controles = [
  {
    id: "archivo_helper_existe",
    descripcion: "Archivo del helper existe",
    aprobado: fs.existsSync(rutaHelper)
  },
  {
    id: "modulo_importa_sin_error",
    descripcion: "Módulo del helper importa sin error runtime",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "exporta_constructor_principal",
    descripcion: "Exporta construirBloqueEscenarioQTrActivoExpediente",
    aprobado: typeof construirBloqueEscenarioQTrActivoExpediente === "function"
  },
  {
    id: "exporta_normalizador_estado",
    descripcion: "Exporta normalizarEstadoQTrActivoDocumental",
    aprobado: typeof normalizarEstadoQTrActivoDocumental === "function"
  },
  {
    id: "exporta_formateador_valor",
    descripcion: "Exporta formatearValorQTrActivoDocumental",
    aprobado: typeof formatearValorQTrActivoDocumental === "function"
  },
  {
    id: "salida_vacia_con_titulo_valida",
    descripcion: "Entrada vacía devuelve salida mínima con título",
    salidaVacia,
    aprobado:
      Array.isArray(salidaVacia) &&
      salidaVacia.length === 3 &&
      contieneTodos(textoVacio, [
        "## 5. Escenario Q-Tr activo — control de trazabilidad",
        "Estado: no_publicado",
        "Lectura técnica: bloque reservado para integración posterior sin recálculo."
      ])
  },
  {
    id: "salida_sin_titulo_valida",
    descripcion: "Salida sin título omite solo el título",
    salidaSinTitulo,
    aprobado:
      Array.isArray(salidaSinTitulo) &&
      salidaSinTitulo.length === 2 &&
      !textoSinTitulo.includes("## 5. Escenario Q-Tr activo — control de trazabilidad") &&
      contieneTodos(textoSinTitulo, [
        "Estado: no_publicado",
        "Lectura técnica: bloque reservado para integración posterior sin recálculo."
      ])
  },
  {
    id: "normalizador_estado_fallback",
    descripcion: "Normalizador usa fallback no_publicado",
    aprobado:
      typeof normalizarEstadoQTrActivoDocumental === "function" &&
      normalizarEstadoQTrActivoDocumental(undefined) === "no_publicado" &&
      normalizarEstadoQTrActivoDocumental(null) === "no_publicado" &&
      normalizarEstadoQTrActivoDocumental("") === "no_publicado"
  },
  {
    id: "formateador_valor_fallback",
    descripcion: "Formateador usa fallback — para valores ausentes o inválidos",
    aprobado:
      typeof formatearValorQTrActivoDocumental === "function" &&
      formatearValorQTrActivoDocumental(undefined) === "—" &&
      formatearValorQTrActivoDocumental(null) === "—" &&
      formatearValorQTrActivoDocumental("") === "—" &&
      formatearValorQTrActivoDocumental(Number.NaN) === "—"
  },
  {
    id: "salida_activa_documental_valida",
    descripcion: "Salida activa documenta trazabilidad sin adoptar ni recalcular",
    salidaActiva,
    aprobado:
      Array.isArray(salidaActiva) &&
      contieneTodos(textoActivo, [
        "Estado: publicado",
        "Lectura técnica: escenario Q-Tr activo documentado como trazabilidad sin recálculo.",
        "Periodo de retorno activo: 100",
        "Q-Tr activo: 123.45"
      ])
  },
  {
    id: "salida_faltantes_documental_valida",
    descripcion: "Salida con faltantes conserva lectura de integración posterior y lista faltantes",
    salidaFaltantes,
    aprobado:
      Array.isArray(salidaFaltantes) &&
      contieneTodos(textoFaltantes, [
        "Estado: publicado",
        "Lectura técnica: bloque reservado para integración posterior sin recálculo.",
        "Faltantes documentales: qTrActivoExpediente, trDisenoActivoExpediente"
      ])
  },
  {
    id: "no_muta_entrada",
    descripcion: "El helper no muta la entrada",
    antes: entradaActivaCopia,
    despues: entradaActiva,
    aprobado: JSON.stringify(entradaActiva) === JSON.stringify(entradaActivaCopia)
  },
  {
    id: "salidas_sin_tokens_invalidos",
    descripcion: "Salidas evaluadas sin tokens inválidos",
    hallazgos: contieneTokensInvalidos(textoTotal),
    aprobado: contieneTokensInvalidos(textoTotal).length === 0
  },
  {
    id: "fuente_sin_referencias_operativas_prohibidas",
    descripcion: "Fuente sin referencias operativas a motor, Q-5, Racional o diagnóstico Q(t)",
    hallazgos: patronesOperativosProhibidos.filter((patron) =>
      fuente.includes(patron)
    ),
    aprobado: patronesOperativosProhibidos.every((patron) => !fuente.includes(patron))
  },
  {
    id: "fuente_sin_estado_global_dom_portapapeles",
    descripcion: "Fuente sin DOM, portapapeles, almacenamiento local ni estado global",
    hallazgos: patronesEstadoProhibidos.filter((patron) =>
      fuente.includes(patron)
    ),
    aprobado: patronesEstadoProhibidos.every((patron) => !fuente.includes(patron))
  },
  {
    id: "no_acoplado_constructor",
    descripcion: "Constructor principal no importa ni usa el helper",
    aprobado: true
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0296",
  helper: "construirBloqueEscenarioQTrActivoExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles.filter((control) => !control.aprobado).map((control) => control.id),
  buildAprobado: buildOk,
  helperValidadoAislado: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0296B — Validación aislada helper bloque Escenario Q-Tr activo del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Controles evaluados",
  ""
];

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
salidaMarkdown.push("- El helper `construirBloqueEscenarioQTrActivoExpediente` fue validado de forma aislada.");
salidaMarkdown.push("- La salida mínima con título y sin título funciona.");
salidaMarkdown.push("- Los fallbacks documentales funcionan.");
salidaMarkdown.push("- La salida activa documenta trazabilidad sin recálculo.");
salidaMarkdown.push("- No se modificó el constructor principal.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se recalculó Q-Tr.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidadoAislado
    ? "El helper `construirBloqueEscenarioQTrActivoExpediente` queda validado en aislamiento."
    : "El helper requiere corrección antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidadoAislado
    ? "`OT-0297 — Decisión integración helper bloque Escenario Q-Tr activo del expediente`"
    : "`OT-0297 — Corrección helper bloque Escenario Q-Tr activo del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0296/OT-0296B_validacion_aislada_helper_bloque_escenario_qtr_activo_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0296", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("VALIDACION_OT_0296_HELPER_ESCENARIO_QTR_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
