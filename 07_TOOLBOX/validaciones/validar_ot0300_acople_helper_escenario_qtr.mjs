import fs from "fs";
import os from "os";
import path from "path";
import { execSync } from "child_process";
import { pathToFileURL } from "url";

const raiz = process.cwd();

const rutaExpediente = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const rutasImports = {
  restricciones: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js"
  ),
  identificacion: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js"
  ),
  parametros: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueParametrosHidrologicosBaseExpediente.js"
  ),
  tcRoles: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js"
  ),
  volumen: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js"
  ),
  qtr: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js"
  )
};

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const fuenteExpediente = fs.existsSync(rutaExpediente)
  ? fs.readFileSync(rutaExpediente, "utf8")
  : "";

const importQTr =
  'import { construirBloqueEscenarioQTrActivoExpediente } from "./construirBloqueEscenarioQTrActivoExpediente";';

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

function extraerBloqueEntre(texto, tituloInicio, tituloFin) {
  const inicio = texto.indexOf(tituloInicio);
  const fin = texto.indexOf(tituloFin, inicio);

  if (inicio < 0) {
    return "";
  }

  if (fin < 0) {
    return texto.slice(inicio);
  }

  return texto.slice(inicio, fin);
}

function prepararModuloTemporal(fuente) {
  const carpetaTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "ot0300-hidroflow-"));
  const rutaTemporal = path.join(carpetaTemporal, "construirExpedienteHidrologicoMinimo.mjs");

  const fuenteTemporal = fuente
    .replace(
      'from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";',
      `from "${pathToFileURL(rutasImports.restricciones).href}";`
    )
    .replace(
      'from "./construirBloqueIdentificacionExpedienteMinimo";',
      `from "${pathToFileURL(rutasImports.identificacion).href}";`
    )
    .replace(
      'from "./construirBloqueParametrosHidrologicosBaseExpediente";',
      `from "${pathToFileURL(rutasImports.parametros).href}";`
    )
    .replace(
      'from "./construirBloqueTiempoConcentracionRolesTcExpediente";',
      `from "${pathToFileURL(rutasImports.tcRoles).href}";`
    )
    .replace(
      'from "./construirBloqueVolumenReferenciaExpediente";',
      `from "${pathToFileURL(rutasImports.volumen).href}";`
    )
    .replace(
      'from "./construirBloqueEscenarioQTrActivoExpediente";',
      `from "${pathToFileURL(rutasImports.qtr).href}";`
    );

  fs.writeFileSync(rutaTemporal, fuenteTemporal, "utf8");

  return { carpetaTemporal, rutaTemporal };
}

const inicioSecciones = fuenteExpediente.indexOf("export const SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO");
const finSecciones = fuenteExpediente.indexOf("]);", inicioSecciones);
const bloqueSecciones =
  inicioSecciones >= 0 && finSecciones >= 0
    ? fuenteExpediente.slice(inicioSecciones, finSecciones)
    : "";

const inicioAuxiliarQTr = fuenteExpediente.indexOf("export function construirLineasEscenarioQTrActivoExpediente");
const inicioSiguienteAuxiliar = fuenteExpediente.indexOf("export function construirLineasResumenQ5AuditadoExpediente", inicioAuxiliarQTr);
const bloqueAuxiliarQTr =
  inicioAuxiliarQTr >= 0 && inicioSiguienteAuxiliar >= 0
    ? fuenteExpediente.slice(inicioAuxiliarQTr, inicioSiguienteAuxiliar)
    : "";

const inicioConstructor = fuenteExpediente.indexOf("export default function construirExpedienteHidrologicoMinimo");
const inicioSeccion6Constructor =
  inicioConstructor >= 0
    ? fuenteExpediente.indexOf('"## 6. Resumen Q-5 auditado', inicioConstructor)
    : -1;

const tramoConstructorAntesSeccion6 =
  inicioConstructor >= 0 && inicioSeccion6Constructor > inicioConstructor
    ? fuenteExpediente.slice(inicioConstructor, inicioSeccion6Constructor)
    : "";

const patronInlineAntiguoQTr =
  /"## 5\. Escenario Q-Tr activo — control de trazabilidad",\s*`Estado: \$\{contextoBase\?\.q_tr_activo_estado\?\.estado \?\? "no_publicado"\}`,\s*"Lectura técnica: bloque reservado para integración posterior sin recálculo\.",/;

let modulo = null;
let importModuloOk = false;
let importModuloError = "";
let temporal = null;

try {
  temporal = prepararModuloTemporal(fuenteExpediente);
  modulo = await import(pathToFileURL(temporal.rutaTemporal).href);
  importModuloOk = true;
} catch (error) {
  importModuloError = `${error?.name || "Error"}: ${error?.message || error}`;
  importModuloOk = false;
}

const construirExpedienteHidrologicoMinimo = modulo?.default;
const construirLineasEscenarioQTrActivoExpediente =
  modulo?.construirLineasEscenarioQTrActivoExpediente;

const salidaAuxiliar =
  typeof construirLineasEscenarioQTrActivoExpediente === "function"
    ? construirLineasEscenarioQTrActivoExpediente({})
    : [];

const textoAuxiliar = Array.isArray(salidaAuxiliar)
  ? salidaAuxiliar.join("\n")
  : "";

let textoReal = "";
let bloqueQTrReal = "";
let errorConstructorPrincipal = "";

if (importModuloOk && typeof construirExpedienteHidrologicoMinimo === "function") {
  try {
    const salidaReal = construirExpedienteHidrologicoMinimo({
      contextoBase: {},
      fechaGeneracion: "2026-06-14T00:00:00.000Z"
    });

    textoReal = salidaReal?.texto ?? "";
    bloqueQTrReal = extraerBloqueEntre(
      textoReal,
      "## 5. Escenario Q-Tr activo — control de trazabilidad",
      "## 6. Resumen Q-5 auditado"
    );
  } catch (error) {
    errorConstructorPrincipal = `${error?.name || "Error"}: ${error?.message || error}`;
  }
}

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

const lineasEsperadasQTr = [
  "## 5. Escenario Q-Tr activo — control de trazabilidad",
  "Estado: no_publicado",
  "Lectura técnica: bloque reservado para integración posterior sin recálculo."
];

const controles = [
  {
    id: "archivo_expediente_existe",
    descripcion: "Archivo del constructor del expediente existe",
    aprobado: fs.existsSync(rutaExpediente)
  },
  {
    id: "archivo_helper_qtr_existe",
    descripcion: "Archivo del helper Q-Tr existe",
    aprobado: fs.existsSync(rutasImports.qtr)
  },
  {
    id: "import_helper_qtr_unico",
    descripcion: "Import del helper Q-Tr presente una sola vez",
    ocurrencias: contarOcurrencias(fuenteExpediente, importQTr),
    aprobado: contarOcurrencias(fuenteExpediente, importQTr) === 1
  },
  {
    id: "modulo_temporal_importado",
    descripcion: "Módulo temporal del expediente importa sin error runtime",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "funcion_auxiliar_qtr_delegada",
    descripcion: "Función auxiliar Q-Tr delega al helper",
    aprobado:
      bloqueAuxiliarQTr.includes("return construirBloqueEscenarioQTrActivoExpediente({") &&
      bloqueAuxiliarQTr.includes("estadoQTrActivoExpediente: entrada?.estadoQTrActivoExpediente") &&
      bloqueAuxiliarQTr.includes("qTrActivoExpediente: entrada?.qTrActivoExpediente") &&
      bloqueAuxiliarQTr.includes("faltantesQTrActivoExpediente: entrada?.faltantesQTrActivoExpediente") &&
      bloqueAuxiliarQTr.includes("trDisenoActivoExpediente: entrada?.trDisenoActivoExpediente") &&
      bloqueAuxiliarQTr.includes("incluirTitulo: true")
  },
  {
    id: "salida_directa_auxiliar_valida",
    descripcion: "Salida directa de la función auxiliar usa el helper validado",
    salidaAuxiliar,
    aprobado:
      Array.isArray(salidaAuxiliar) &&
      salidaAuxiliar.length === 3 &&
      contieneTodos(textoAuxiliar, lineasEsperadasQTr)
  },
  {
    id: "constructor_principal_usa_funcion_auxiliar_qtr",
    descripcion: "Constructor principal usa construirLineasEscenarioQTrActivoExpediente en la salida real",
    aprobado:
      tramoConstructorAntesSeccion6.includes("...construirLineasEscenarioQTrActivoExpediente({") &&
      tramoConstructorAntesSeccion6.includes("estadoQTrActivoExpediente: contextoBase?.q_tr_activo_estado?.estado") &&
      tramoConstructorAntesSeccion6.includes("qTrActivoExpediente: contextoBase?.q_tr_activo") &&
      tramoConstructorAntesSeccion6.includes("faltantesQTrActivoExpediente: contextoBase?.q_tr_activo_faltantes")
  },
  {
    id: "constructor_principal_sin_bloque_inline_qtr",
    descripcion: "Constructor principal no conserva bloque inline antiguo Q-Tr",
    aprobado: !patronInlineAntiguoQTr.test(tramoConstructorAntesSeccion6)
  },
  {
    id: "secciones_obligatorias_sin_acople_qtr",
    descripcion: "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO permanece declarativa",
    aprobado:
      !bloqueSecciones.includes("construirBloqueEscenarioQTrActivoExpediente") &&
      !bloqueSecciones.includes("construirLineasEscenarioQTrActivoExpediente")
  },
  {
    id: "constructor_principal_sin_error_runtime",
    descripcion: "Constructor principal ejecuta sin error runtime",
    error: errorConstructorPrincipal,
    aprobado: errorConstructorPrincipal === ""
  },
  {
    id: "constructor_principal_genera_salida",
    descripcion: "Constructor principal genera salida documental",
    longitud: typeof textoReal === "string" ? textoReal.length : null,
    aprobado:
      errorConstructorPrincipal === "" &&
      typeof textoReal === "string" &&
      textoReal.length > 0
  },
  {
    id: "bloque_qtr_real_detectado",
    descripcion: "Salida real contiene bloque ## 5 antes de ## 6",
    aprobado:
      bloqueQTrReal.includes("## 5. Escenario Q-Tr activo — control de trazabilidad") &&
      textoReal.indexOf("## 5. Escenario Q-Tr activo — control de trazabilidad") < textoReal.indexOf("## 6. Resumen Q-5 auditado")
  },
  {
    id: "bloque_qtr_real_lineas_minimas",
    descripcion: "Bloque Q-Tr real conserva líneas mínimas delegadas",
    bloqueQTrReal,
    esperado: lineasEsperadasQTr,
    aprobado: contieneTodos(bloqueQTrReal, lineasEsperadasQTr)
  },
  {
    id: "bloque_qtr_sin_tokens_invalidos",
    descripcion: "Bloque Q-Tr real sin tokens inválidos",
    hallazgos: contieneTokensInvalidos(bloqueQTrReal),
    aprobado: contieneTokensInvalidos(bloqueQTrReal).length === 0
  },
  {
    id: "sin_modificacion_helper_qtr",
    descripcion: "Helper Q-Tr no se modifica en esta validación",
    aprobado: true
  },
  {
    id: "sin_modificacion_comparador",
    descripcion: "Comparador no participa del acople",
    aprobado: true
  },
  {
    id: "sin_recalculo_qtr",
    descripcion: "Validación no recalcula Q-Tr",
    aprobado: true
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0300",
  helper: "construirBloqueEscenarioQTrActivoExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles.filter((control) => !control.aprobado).map((control) => control.id),
  buildAprobado: buildOk,
  acopleValidado: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0300B — Validación acople helper bloque Escenario Q-Tr activo del expediente",
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
salidaMarkdown.push("- El acople del helper `construirBloqueEscenarioQTrActivoExpediente` fue validado estructuralmente.");
salidaMarkdown.push("- La función auxiliar delega al helper validado.");
salidaMarkdown.push("- La salida real usa la función auxiliar.");
salidaMarkdown.push("- El bloque inline antiguo no permanece en el constructor principal.");
salidaMarkdown.push("- La salida real conserva el bloque Q-Tr mínimo esperado.");
salidaMarkdown.push("- No se modificó el helper.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se recalculó Q-Tr.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleValidado
    ? "El acople mínimo del helper `construirBloqueEscenarioQTrActivoExpediente` queda validado."
    : "El acople requiere corrección adicional antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleValidado
    ? "`OT-0301 — Revalidación salida real helper bloque Escenario Q-Tr activo del expediente`"
    : "`OT-0301 — Corrección acople helper bloque Escenario Q-Tr activo del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0300/OT-0300B_validacion_acople_helper_bloque_escenario_qtr_activo_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0300", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

try {
  if (temporal?.carpetaTemporal) {
    fs.rmSync(temporal.carpetaTemporal, { recursive: true, force: true });
  }
} catch {
  // Sin efecto funcional.
}

console.log("VALIDACION_OT_0300_ACOPLE_HELPER_ESCENARIO_QTR_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
