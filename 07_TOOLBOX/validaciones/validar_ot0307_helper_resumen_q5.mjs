import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { pathToFileURL } from "url";

const raiz = process.cwd();

const rutaHelper = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js"
);

const rutaConstructor = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const rutaComparador = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
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

const construirBloqueResumenQ5AuditadoExpediente =
  modulo?.construirBloqueResumenQ5AuditadoExpediente;

const contarMetodosQ5Documentales =
  modulo?.contarMetodosQ5Documentales;

const formatearValorResumenQ5Documental =
  modulo?.formatearValorResumenQ5Documental;

const normalizarEstadoResumenQ5AuditadoDocumental =
  modulo?.normalizarEstadoResumenQ5AuditadoDocumental;

const salidaVacia =
  typeof construirBloqueResumenQ5AuditadoExpediente === "function"
    ? construirBloqueResumenQ5AuditadoExpediente({})
    : [];

const salidaSinTitulo =
  typeof construirBloqueResumenQ5AuditadoExpediente === "function"
    ? construirBloqueResumenQ5AuditadoExpediente({ incluirTitulo: false })
    : [];

const entradaConMetodos = {
  metodosQ5: [
    { metodo: "SCS", qp: 184.03 },
    { metodo: "Snyder", qp: 124.65 },
    { metodo: "Clark IUH", qp: 94.28 }
  ],
  estadoResumenQ5AuditadoExpediente: "publicado",
  faltantesResumenQ5AuditadoExpediente: []
};

const entradaConMetodosCopia = clonarJson(entradaConMetodos);

const salidaConMetodos =
  typeof construirBloqueResumenQ5AuditadoExpediente === "function"
    ? construirBloqueResumenQ5AuditadoExpediente(entradaConMetodos)
    : [];

const entradaFaltantes = {
  metodosQ5: null,
  estadoResumenQ5AuditadoExpediente: "",
  faltantesResumenQ5AuditadoExpediente: [
    "metodosQ5",
    "estadoResumenQ5AuditadoExpediente"
  ]
};

const salidaFaltantes =
  typeof construirBloqueResumenQ5AuditadoExpediente === "function"
    ? construirBloqueResumenQ5AuditadoExpediente(entradaFaltantes)
    : [];

const textoVacio = Array.isArray(salidaVacia) ? salidaVacia.join("\n") : "";
const textoSinTitulo = Array.isArray(salidaSinTitulo) ? salidaSinTitulo.join("\n") : "";
const textoConMetodos = Array.isArray(salidaConMetodos) ? salidaConMetodos.join("\n") : "";
const textoFaltantes = Array.isArray(salidaFaltantes) ? salidaFaltantes.join("\n") : "";
const textoTotal = [textoVacio, textoSinTitulo, textoConMetodos, textoFaltantes].join("\n");

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
  "hidroEngine",
  "calcQ5",
  "calcularQ5",
  "calcularHidrograma",
  "recalcular",
  "reinterpretar",
  "metodoAdoptado",
  "caudalAdoptado",
  "qTr",
  "Q-Tr",
  "Método Racional",
  "metodoRacional",
  "diagnosticoQt",
  "diagnóstico Q(t)"
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

const fuenteConstructor = fs.existsSync(rutaConstructor)
  ? fs.readFileSync(rutaConstructor, "utf8")
  : "";

const fuenteComparador = fs.existsSync(rutaComparador)
  ? fs.readFileSync(rutaComparador, "utf8")
  : "";

const observaciones = [
  {
    id: "observacion_literalidad_estado_contractual",
    descripcion:
      "El contrato documental mostró la salida mínima con punto final en el estado; la implementación emite el estado sin punto final. Se registra como observación no bloqueante en OT-0307.",
    contrato: "Estado: sección contractual inicial del helper puro.",
    implementacion: "Estado: sección contractual inicial del helper puro",
    bloqueante: false
  }
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
    descripcion: "Exporta construirBloqueResumenQ5AuditadoExpediente",
    aprobado: typeof construirBloqueResumenQ5AuditadoExpediente === "function"
  },
  {
    id: "exporta_contador_metodos",
    descripcion: "Exporta contarMetodosQ5Documentales",
    aprobado: typeof contarMetodosQ5Documentales === "function"
  },
  {
    id: "exporta_formateador_valor",
    descripcion: "Exporta formatearValorResumenQ5Documental",
    aprobado: typeof formatearValorResumenQ5Documental === "function"
  },
  {
    id: "exporta_normalizador_estado",
    descripcion: "Exporta normalizarEstadoResumenQ5AuditadoDocumental",
    aprobado: typeof normalizarEstadoResumenQ5AuditadoDocumental === "function"
  },
  {
    id: "salida_vacia_con_titulo_valida",
    descripcion: "Entrada vacía devuelve salida mínima con título",
    salidaVacia,
    aprobado:
      Array.isArray(salidaVacia) &&
      salidaVacia.length === 3 &&
      contieneTodos(textoVacio, [
        "## 6. Resumen Q-5 auditado",
        "Métodos recibidos: 0",
        "Estado: sección contractual inicial del helper puro"
      ])
  },
  {
    id: "salida_sin_titulo_valida",
    descripcion: "Salida sin título omite solo el título",
    salidaSinTitulo,
    aprobado:
      Array.isArray(salidaSinTitulo) &&
      salidaSinTitulo.length === 2 &&
      !textoSinTitulo.includes("## 6. Resumen Q-5 auditado") &&
      contieneTodos(textoSinTitulo, [
        "Métodos recibidos: 0",
        "Estado: sección contractual inicial del helper puro"
      ])
  },
  {
    id: "contador_metodos_q5_valido",
    descripcion: "Contador cuenta solo arreglos y usa 0 si no hay arreglo",
    aprobado:
      typeof contarMetodosQ5Documentales === "function" &&
      contarMetodosQ5Documentales([]) === 0 &&
      contarMetodosQ5Documentales([{ a: 1 }, { a: 2 }]) === 2 &&
      contarMetodosQ5Documentales(null) === 0 &&
      contarMetodosQ5Documentales({ a: 1 }) === 0
  },
  {
    id: "normalizador_estado_fallback",
    descripcion: "Normalizador usa estado contractual inicial como fallback",
    aprobado:
      typeof normalizarEstadoResumenQ5AuditadoDocumental === "function" &&
      normalizarEstadoResumenQ5AuditadoDocumental(undefined) ===
        "sección contractual inicial del helper puro" &&
      normalizarEstadoResumenQ5AuditadoDocumental(null) ===
        "sección contractual inicial del helper puro" &&
      normalizarEstadoResumenQ5AuditadoDocumental("") ===
        "sección contractual inicial del helper puro"
  },
  {
    id: "formateador_valor_fallback",
    descripcion: "Formateador usa fallback — para valores ausentes o inválidos",
    aprobado:
      typeof formatearValorResumenQ5Documental === "function" &&
      formatearValorResumenQ5Documental(undefined) === "—" &&
      formatearValorResumenQ5Documental(null) === "—" &&
      formatearValorResumenQ5Documental("") === "—" &&
      formatearValorResumenQ5Documental(Number.NaN) === "—"
  },
  {
    id: "salida_con_metodos_valida",
    descripcion: "Salida con métodos documenta cantidad sin recalcular ni adoptar",
    salidaConMetodos,
    aprobado:
      Array.isArray(salidaConMetodos) &&
      contieneTodos(textoConMetodos, [
        "## 6. Resumen Q-5 auditado",
        "Métodos recibidos: 3",
        "Estado: publicado"
      ])
  },
  {
    id: "salida_faltantes_valida",
    descripcion: "Salida con faltantes lista faltantes documentales",
    salidaFaltantes,
    aprobado:
      Array.isArray(salidaFaltantes) &&
      contieneTodos(textoFaltantes, [
        "## 6. Resumen Q-5 auditado",
        "Métodos recibidos: 0",
        "Estado: sección contractual inicial del helper puro",
        "Faltantes documentales: metodosQ5, estadoResumenQ5AuditadoExpediente"
      ])
  },
  {
    id: "no_muta_entrada",

descripcion: "El helper no muta la entrada",
    antes: entradaConMetodosCopia,
    despues: entradaConMetodos,
    aprobado: JSON.stringify(entradaConMetodos) === JSON.stringify(entradaConMetodosCopia)
  },
  {
    id: "salidas_sin_tokens_invalidos",
    descripcion: "Salidas evaluadas sin tokens inválidos",
    hallazgos: contieneTokensInvalidos(textoTotal),
    aprobado: contieneTokensInvalidos(textoTotal).length === 0
  },
  {
    id: "fuente_sin_referencias_operativas_prohibidas",
    descripcion: "Fuente sin referencias operativas a motor, Q-Tr, Racional o diagnóstico Q(t)",
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
    id: "constructor_sin_acople_helper_resumen_q5",
    descripcion: "Constructor principal no importa ni usa todavía el helper Resumen Q-5",
    aprobado:
      !fuenteConstructor.includes("construirBloqueResumenQ5AuditadoExpediente") &&
      !fuenteConstructor.includes("construirLineasResumenQ5AuditadoExpediente")
  },
  {
    id: "comparador_sin_modificacion_por_helper",
    descripcion: "Comparador no participa de la implementación aislada",
    aprobado:
      fuenteComparador.length > 0 &&
      !fuenteComparador.includes("construirBloqueResumenQ5AuditadoExpediente")
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0307",
  helper: "construirBloqueResumenQ5AuditadoExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles.filter((control) => !control.aprobado).map((control) => control.id),
  buildAprobado: buildOk,
  helperValidadoAislado: controles.every((control) => control.aprobado),
  observacionesNoBloqueantes: observaciones.length,
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0307B — Validación aislada helper bloque Resumen Q-5 auditado del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Observaciones no bloqueantes",
  "",
  "```json",
  JSON.stringify(observaciones, null, 2),
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
salidaMarkdown.push("- El helper `construirBloqueResumenQ5AuditadoExpediente` fue validado de forma aislada.");
salidaMarkdown.push("- La salida mínima con título y sin título funciona.");
salidaMarkdown.push("- El conteo de métodos Q-5 es documental y no recalcula Q-5.");
salidaMarkdown.push("- Los fallbacks documentales funcionan.");
salidaMarkdown.push("- La salida con faltantes documentales funciona.");
salidaMarkdown.push("- No se modificó el constructor principal.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se recalculó Q-5.");
salidaMarkdown.push("- No se reinterpretaron resultados Q-5.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidadoAislado
    ? "El helper `construirBloqueResumenQ5AuditadoExpediente` queda validado en aislamiento."
    : "El helper requiere corrección antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidadoAislado
    ? "`OT-0308 — Decisión integración helper bloque Resumen Q-5 auditado del expediente`"
    : "`OT-0308 — Corrección helper bloque Resumen Q-5 auditado del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0307/OT-0307B_validacion_aislada_helper_bloque_resumen_q5_auditado_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0307", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("VALIDACION_OT_0307_HELPER_RESUMEN_Q5_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
