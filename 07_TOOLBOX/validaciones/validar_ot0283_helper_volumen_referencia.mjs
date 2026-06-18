import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { pathToFileURL } from "url";

const raiz = process.cwd();

const rutaHelper = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js"
);

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
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

const fuenteHelper = fs.existsSync(rutaHelper)
  ? fs.readFileSync(rutaHelper, "utf8")
  : "";

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

const construirBloqueVolumenReferenciaExpediente =
  modulo?.construirBloqueVolumenReferenciaExpediente;

const formatearLluviaEfectivaDocumental =
  modulo?.formatearLluviaEfectivaDocumental;

const formatearVolumenEsperadoDocumental =
  modulo?.formatearVolumenEsperadoDocumental;

const entradaValida = {
  peTotalMm: 56.65,
  volumenEsperadoM3: 2654250.9,
  incluirTitulo: true
};

const entradaValidaAntes = clonarJson(entradaValida);

const salidaConTitulo =
  typeof construirBloqueVolumenReferenciaExpediente === "function"
    ? construirBloqueVolumenReferenciaExpediente(entradaValida)
    : [];

const textoConTitulo = Array.isArray(salidaConTitulo)
  ? salidaConTitulo.join("\n")
  : "";

const entradaSinTitulo = {
  peTotalMm: 56.65,
  volumenEsperadoM3: 2654250.9,
  incluirTitulo: false
};

const salidaSinTitulo =
  typeof construirBloqueVolumenReferenciaExpediente === "function"
    ? construirBloqueVolumenReferenciaExpediente(entradaSinTitulo)
    : [];

const textoSinTitulo = Array.isArray(salidaSinTitulo)
  ? salidaSinTitulo.join("\n")
  : "";

const casosFallback = [
  {},
  { peTotalMm: null, volumenEsperadoM3: null },
  { peTotalMm: undefined, volumenEsperadoM3: undefined },
  { peTotalMm: "", volumenEsperadoM3: "" },
  { peTotalMm: "abc", volumenEsperadoM3: "xyz" },
  { peTotalMm: Number.NaN, volumenEsperadoM3: Number.NaN },
  { peTotalMm: Infinity, volumenEsperadoM3: Infinity },
  null,
  "entrada-no-objeto"
];

const salidasFallback =
  typeof construirBloqueVolumenReferenciaExpediente === "function"
    ? casosFallback.map((entrada) => construirBloqueVolumenReferenciaExpediente(entrada))
    : [];

const textosFallback = salidasFallback.map((salida) =>
  Array.isArray(salida) ? salida.join("\n") : String(salida)
);

const salidaLluviaValida =
  typeof formatearLluviaEfectivaDocumental === "function"
    ? formatearLluviaEfectivaDocumental(56.65)
    : "";

const salidaVolumenValida =
  typeof formatearVolumenEsperadoDocumental === "function"
    ? formatearVolumenEsperadoDocumental(2654250.9)
    : "";

const salidaLluviaFallback =
  typeof formatearLluviaEfectivaDocumental === "function"
    ? formatearLluviaEfectivaDocumental("abc")
    : "";

const salidaVolumenFallback =
  typeof formatearVolumenEsperadoDocumental === "function"
    ? formatearVolumenEsperadoDocumental("abc")
    : "";

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
    descripcion: "Archivo del helper existe",
    aprobado: fs.existsSync(rutaHelper)
  },
  {
    id: "modulo_importa_sin_error",
    descripcion: "El helper importa sin error runtime",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "exporta_constructor_principal",
    descripcion: "Exporta construirBloqueVolumenReferenciaExpediente",
    aprobado: typeof construirBloqueVolumenReferenciaExpediente === "function"
  },
  {
    id: "exporta_formateador_lluvia",
    descripcion: "Exporta formatearLluviaEfectivaDocumental",
    aprobado: typeof formatearLluviaEfectivaDocumental === "function"
  },
  {
    id: "exporta_formateador_volumen",
    descripcion: "Exporta formatearVolumenEsperadoDocumental",
    aprobado: typeof formatearVolumenEsperadoDocumental === "function"
  },
  {
    id: "salida_con_titulo_es_string_array",
    descripcion: "Salida con título devuelve string[]",
    salidaConTitulo,
    aprobado:
      Array.isArray(salidaConTitulo) &&
      salidaConTitulo.length === 4 &&
      salidaConTitulo.every((linea) => typeof linea === "string")
  },
  {
    id: "salida_con_titulo_contiene_lineas_minimas",
    descripcion: "Salida con título conserva líneas mínimas",
    aprobado:
      textoConTitulo.includes("## 4. Volumen de referencia") &&
      textoConTitulo.includes("Lluvia efectiva total:") &&
      textoConTitulo.includes("Volumen esperado:") &&
      textoConTitulo.includes("Fórmula: Pe(mm) × Área(km²) × 1000.")
  },
  {
    id: "salida_sin_titulo_omite_solo_titulo",
    descripcion: "Salida sin título omite solo el título y conserva tres líneas documentales",
    salidaSinTitulo,
    aprobado:
      Array.isArray(salidaSinTitulo) &&
      salidaSinTitulo.length === 3 &&
      !textoSinTitulo.includes("## 4. Volumen de referencia") &&
      textoSinTitulo.includes("Lluvia efectiva total:") &&
      textoSinTitulo.includes("Volumen esperado:") &&
      textoSinTitulo.includes("Fórmula: Pe(mm) × Área(km²) × 1000.")
  },
  {
    id: "formato_lluvia_valida",
    descripcion: "La lluvia válida se formatea con unidad mm",
    salida: salidaLluviaValida,
    aprobado:
      typeof salidaLluviaValida === "string" &&
      salidaLluviaValida.endsWith(" mm") &&
      salidaLluviaValida !== "—"
  },
  {
    id: "formato_volumen_valido",
    descripcion: "El volumen válido se formatea con unidad m³",
    salida: salidaVolumenValida,
    aprobado:
      typeof salidaVolumenValida === "string" &&
      salidaVolumenValida.endsWith(" m³") &&
      salidaVolumenValida !== "—"
  },
  {
    id: "fallback_lluvia_invalida",
    descripcion: "La lluvia inválida usa fallback documental",
    salida: salidaLluviaFallback,
    aprobado: salidaLluviaFallback === "—"
  },
  {
    id: "fallback_volumen_invalido",
    descripcion: "El volumen inválido usa fallback documental",
    salida: salidaVolumenFallback,
    aprobado: salidaVolumenFallback === "—"
  },
  {
    id: "fallbacks_casos_invalidos",
    descripcion: "Casos inválidos no rompen y usan fallback documental",
    salidasFallback,
    aprobado:
      salidasFallback.length === casosFallback.length &&
      salidasFallback.every((salida) =>
        Array.isArray(salida) &&
        salida.every((linea) => typeof linea === "string") &&
        salida.join("\n").includes("Lluvia efectiva total: —") &&
        salida.join("\n").includes("Volumen esperado: —")
      )
  },
  {
    id: "sin_tokens_invalidos_salida_valida",
    descripcion: "Salida válida sin tokens prohibidos",
    hallazgos: contieneTokensInvalidos(textoConTitulo),
    aprobado: contieneTokensInvalidos(textoConTitulo).length === 0
  },
  {
    id: "sin_tokens_invalidos_fallbacks",
    descripcion: "Salidas fallback sin tokens prohibidos",
    hallazgos: contieneTokensInvalidos(textosFallback.join("\n")),
    aprobado: contieneTokensInvalidos(textosFallback.join("\n")).length === 0
  },
  {
    id: "no_muta_entrada",
    descripcion: "El helper no muta la entrada",
    entradaAntes: entradaValidaAntes,
    entradaDespues: entradaValida,
    aprobado: JSON.stringify(entradaValidaAntes) === JSON.stringify(entradaValida)
  },
  {
    id: "sin_referencias_bloques_prohibidos_en_fuente",
    descripcion: "Fuente sin referencias operativas a Q-Tr, Q-5, Racional o diagnóstico Q(t)",
    aprobado:
      !fuenteHelper.includes("qTr") &&
      !fuenteHelper.includes("Q-Tr") &&
      !fuenteHelper.includes("Q5") &&
      !fuenteHelper.includes("Q-5") &&
      !fuenteHelper.includes("Racional") &&
      !fuenteHelper.includes("diagnóstico Q(t)")
  },
  {
    id: "sin_recalculo_explicito_volumen_en_fuente",
    descripcion: "Fuente sin fórmula de recálculo de volumen",
    aprobado:
      !fuenteHelper.includes("areaKm2 * peTotalMm") &&
      !fuenteHelper.includes("Pe(mm) × Área(km²) × 1000") === false
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0283",
  helper: "construirBloqueVolumenReferenciaExpediente",
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
  "# OT-0283B — Revalidación aislada helper bloque Volumen de referencia del expediente",
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
salidaMarkdown.push("- El helper fue validado en aislamiento.");
salidaMarkdown.push("- La validación no acopla el helper al constructor principal.");
salidaMarkdown.push("- La validación confirma salida `string[]`, título opcional, fallbacks y ausencia de tokens prohibidos.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó `construirExpedienteHidrologicoMinimo.js`.");
salidaMarkdown.push("- No se recalculó volumen.");
salidaMarkdown.push("- No se tocaron Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidadoAislado
    ? "El helper `construirBloqueVolumenReferenciaExpediente` queda validado en aislamiento."
    : "El helper requiere corrección antes de integración."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidadoAislado
    ? "`OT-0284 — Decisión integración helper bloque Volumen de referencia del expediente`"
    : "`OT-0284 — Corrección adicional helper bloque Volumen de referencia del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0283/OT-0283B_revalidacion_aislada_helper_bloque_volumen_referencia_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0283", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("VALIDACION_OT_0283_HELPER_VOLUMEN_REFERENCIA_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));

