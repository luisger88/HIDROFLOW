import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { pathToFileURL } from "url";

const raiz = process.cwd();

const rutaHelper = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0267/OT-0267B_validacion_aislada_helper_bloque_tiempo_concentracion_roles_tc_expediente.md";

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const frasesProhibidas = [
  "hidrogramas completos",
  "tablas Q-5",
  "caudales Q-5",
  "resultados de Método Racional",
  "balances de volumen",
  "dictámenes de plausibilidad temporal",
  "diagnóstico Q(t)",
  "conclusiones hidrológicas adoptivas",
  "advertencias globales de restricciones"
];

const lineasMinimasConTitulo = [
  "## 3. Tiempo de concentración y roles Tc",
  "Tc comparador:",
  "Tr global activo:",
  "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  "Roles Tc:",
  "- Tc global Índice: referencia hidrológica general.",
  "- Tc operativo Q(t): ruta interna del hidrograma.",
  "- Duración evento: 3 h para almacenamiento/regulación.",
  "- Lag / forma SCS: parámetro derivado para forma temporal.",
  "- Tc comparador: referencia especializada para coherencia Q-5."
];

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function contieneTodos(texto, patrones) {
  return patrones.every((patron) => texto.includes(patron));
}

function serializar(valor) {
  return JSON.stringify(valor);
}

function clonar(valor) {
  return JSON.parse(JSON.stringify(valor));
}

function textoSalida(lineas) {
  return Array.isArray(lineas) ? lineas.join("\n") : "";
}

let modulo = null;
let importOk = false;
let importError = "";

try {
  modulo = await import(pathToFileURL(rutaHelper).href);
  importOk = true;
} catch (error) {
  importError = `${error?.message || error}`;
  importOk = false;
}

const helper = modulo?.construirBloqueTiempoConcentracionRolesTcExpediente;
const helperDefault = modulo?.default;

const casos = [];

function agregarCaso(id, entrada, evaluador) {
  const entradaAntes = clonar(entrada);
  let salida = null;
  let error = "";

  try {
    salida = typeof helper === "function" ? helper(entrada) : null;
  } catch (err) {
    error = `${err?.message || err}`;
  }

  const texto = textoSalida(salida);
  const entradaDespues = clonar(entrada);

  casos.push({
    id,
    entrada,
    salida,
    texto,
    error,
    entradaAntes,
    entradaDespues,
    aprobado: evaluador({
      entrada,
      salida,
      texto,
      error,
      entradaAntes,
      entradaDespues
    })
  });
}

agregarCaso(
  "entrada_completa_con_titulo",
  {
    Tc_final: 114.23,
    trDisenoActivoExpediente: 100,
    incluirTitulo: true
  },
  ({ salida, texto, error }) =>
    error === "" &&
    Array.isArray(salida) &&
    salida.length === 10 &&
    contieneTodos(texto, [
      "## 3. Tiempo de concentración y roles Tc",
      "Tc comparador: 114.2 min",
      "Tr global activo: 100 años",
      "Roles Tc:",
      "- Tc operativo Q(t): ruta interna del hidrograma.",
      "- Tc comparador: referencia especializada para coherencia Q-5."
    ])
);

agregarCaso(
  "entrada_completa_sin_titulo",
  {
    Tc_final: 114.23,
    trDisenoActivoExpediente: 100,
    incluirTitulo: false
  },
  ({ salida, texto, error }) =>
    error === "" &&
    Array.isArray(salida) &&
    salida.length === 9 &&
    !texto.includes("## 3. Tiempo de concentración y roles Tc") &&
    contieneTodos(texto, [
      "Tc comparador: 114.2 min",
      "Tr global activo: 100 años",
      "Roles Tc:"
    ])
);

agregarCaso(
  "entrada_vacia",
  {},
  ({ salida, texto, error }) =>
    error === "" &&
    Array.isArray(salida) &&
    contieneTodos(texto, [
      "## 3. Tiempo de concentración y roles Tc",
      "Tc comparador: —",
      "Tr global activo: — años"
    ])
);

agregarCaso(
  "entrada_parcial_tc",
  {
    Tc_final: 0,
    incluirTitulo: true
  },
  ({ texto, error }) =>
    error === "" &&
    contieneTodos(texto, [
      "Tc comparador: 0.0 min",
      "Tr global activo: — años"
    ])
);

agregarCaso(
  "entrada_parcial_tr_textual",
  {
    trDisenoActivoExpediente: "  100  ",
    incluirTitulo: true
  },
  ({ texto, error }) =>
    error === "" &&
    contieneTodos(texto, [
      "Tc comparador: —",
      "Tr global activo: 100 años"
    ])
);

agregarCaso(
  "valores_null_undefined_nan_objeto",
  {
    Tc_final: { valor: 114 },
    trDisenoActivoExpediente: { valor: 100 },
    incluirTitulo: true
  },
  ({ texto, error }) =>
    error === "" &&
    contieneTodos(texto, [
      "Tc comparador: —",
      "Tr global activo: — años"
    ]) &&
    !texto.includes("[object Object]")
);

agregarCaso(
  "tc_nan_tr_infinito",
  {
    Tc_final: Number.NaN,
    trDisenoActivoExpediente: Number.POSITIVE_INFINITY,
    incluirTitulo: true
  },
  ({ texto, error }) =>
    error === "" &&
    contieneTodos(texto, [
      "Tc comparador: —",
      "Tr global activo: — años"
    ])
);

agregarCaso(
  "cadenas_vacias",
  {
    Tc_final: "   ",
    trDisenoActivoExpediente: "   ",
    incluirTitulo: true
  },
  ({ texto, error }) =>
    error === "" &&
    contieneTodos(texto, [
      "Tc comparador: —",
      "Tr global activo: — años"
    ])
);

const salidas = casos.map((caso) => caso.texto).join("\n\n");

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
    id: "import_helper_ok",
    descripcion: "Import ESM del helper aprobado",
    error: importError,
    aprobado: importOk
  },
  {
    id: "export_nominal_presente",
    descripcion: "Export nominal presente",
    aprobado: typeof helper === "function"
  },
  {
    id: "export_default_presente",
    descripcion: "Export default presente",
    aprobado: typeof helperDefault === "function"
  },
  {
    id: "export_default_equivale_nominal",
    descripcion: "Export default equivale al export nominal",
    aprobado: typeof helper === "function" && helperDefault === helper
  },
  {
    id: "casos_aprobados",
    descripcion: "Todos los casos funcionales aislados aprobados",
    totalCasos: casos.length,
    casosAprobados: casos.filter((caso) => caso.aprobado).length,
    casosFallidos: casos.filter((caso) => !caso.aprobado).map((caso) => caso.id),
    aprobado: casos.every((caso) => caso.aprobado)
  },
  {
    id: "salida_siempre_string_array",
    descripcion: "Todas las salidas son string[]",
    aprobado: casos.every(
      (caso) =>
        Array.isArray(caso.salida) &&
        caso.salida.every((linea) => typeof linea === "string")
    )
  },
  {
    id: "campos_minimos_presentes",
    descripcion: "La salida con título contiene los campos mínimos",
    aprobado: contieneTodos(
      casos.find((caso) => caso.id === "entrada_completa_con_titulo")?.texto ?? "",
      lineasMinimasConTitulo
    )
  },
  {
    id: "sin_tokens_invalidos",
    descripcion: "Las salidas no contienen tokens inválidos",
    hallazgos: tokensInvalidos
      .map((token) => ({
        token,
        ocurrencias: contarOcurrencias(salidas, token)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: tokensInvalidos.every((token) => contarOcurrencias(salidas, token) === 0)
  },
  {
    id: "sin_frases_prohibidas",
    descripcion: "Las salidas no contienen frases prohibidas",
    hallazgos: frasesProhibidas
      .map((frase) => ({
        frase,
        ocurrencias: contarOcurrencias(salidas, frase)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: frasesProhibidas.every((frase) => contarOcurrencias(salidas, frase) === 0)
  },
  {
    id: "no_muta_entradas",
    descripcion: "El helper no muta entradas",
    aprobado: casos.every((caso) => serializar(caso.entradaAntes) === serializar(caso.entradaDespues))
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0267",
  helper: "construirBloqueTiempoConcentracionRolesTcExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  totalCasos: casos.length,
  casosAprobados: casos.filter((caso) => caso.aprobado).length,
  casosFallidos: casos.filter((caso) => !caso.aprobado).map((caso) => caso.id),
  buildAprobado: buildOk,
  helperValidado: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0267B — Validación aislada helper bloque Tiempo de concentración y roles Tc del expediente",
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

salidaMarkdown.push("## Casos evaluados");
salidaMarkdown.push("");

for (const caso of casos) {
  salidaMarkdown.push(`### ${caso.id}`);
  salidaMarkdown.push("");
  salidaMarkdown.push("```json");
  salidaMarkdown.push(
    JSON.stringify(
      {
        id: caso.id,
        aprobado: caso.aprobado,
        entrada: caso.entrada,
        salida: caso.salida,
        error: caso.error
      },
      null,
      2
    )
  );
  salidaMarkdown.push("```");
  salidaMarkdown.push("");
}

salidaMarkdown.push("## Lectura técnica");
salidaMarkdown.push("");
salidaMarkdown.push("- La validación se ejecutó de forma aislada sobre el helper puro.");
salidaMarkdown.push("- No se acopló el helper al constructor principal.");
salidaMarkdown.push("- No se modificó `construirExpedienteHidrologicoMinimo.js`.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se recalculó `Tc`.");
salidaMarkdown.push("- No se emitió dictamen hidrológico.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidado
    ? "El helper `construirBloqueTiempoConcentracionRolesTcExpediente` queda validado aisladamente."
    : "El helper requiere corrección antes de avanzar a decisión de integración."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.helperValidado
    ? "`OT-0268 — Decisión integración helper bloque Tiempo de concentración y roles Tc del expediente`"
    : "`OT-0268 — Corrección helper bloque Tiempo de concentración y roles Tc del expediente`"
);

fs.mkdirSync("00_ADMIN/bitacora/OT-0267", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("VALIDACION_OT_0267_HELPER_TC_ROLES_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
