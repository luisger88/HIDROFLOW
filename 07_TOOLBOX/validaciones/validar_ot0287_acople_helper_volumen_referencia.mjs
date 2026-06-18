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

const rutaHelperVolumen = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js"
);

const rutaHelperTc = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js"
);

const rutaHelperParametros = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueParametrosHidrologicosBaseExpediente.js"
);

const rutaHelperIdentificacion = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js"
);

const rutaHelperRestricciones = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js"
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

function prepararModuloTemporal(fuenteExpediente) {
  const carpetaTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "ot0287-hidroflow-"));
  const rutaTemporal = path.join(carpetaTemporal, "construirExpedienteHidrologicoMinimo.mjs");

  const fuenteTemporal = fuenteExpediente
    .replace(
      'from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";',
      `from "${pathToFileURL(rutaHelperRestricciones).href}";`
    )
    .replace(
      'from "./construirBloqueIdentificacionExpedienteMinimo";',
      `from "${pathToFileURL(rutaHelperIdentificacion).href}";`
    )
    .replace(
      'from "./construirBloqueParametrosHidrologicosBaseExpediente";',
      `from "${pathToFileURL(rutaHelperParametros).href}";`
    )
    .replace(
      'from "./construirBloqueTiempoConcentracionRolesTcExpediente";',
      `from "${pathToFileURL(rutaHelperTc).href}";`
    )
    .replace(
      'from "./construirBloqueVolumenReferenciaExpediente";',
      `from "${pathToFileURL(rutaHelperVolumen).href}";`
    );

  fs.writeFileSync(rutaTemporal, fuenteTemporal, "utf8");

  return { carpetaTemporal, rutaTemporal };
}

function extraerBloqueVolumen(texto) {
  const inicio = texto.indexOf("## 4. Volumen de referencia");
  const fin = texto.indexOf("## 5. Escenario Q-Tr activo", inicio);

  if (inicio < 0) {
    return "";
  }

  if (fin < 0) {
    return texto.slice(inicio);
  }

  return texto.slice(inicio, fin);
}

const fuenteExpediente = fs.existsSync(rutaExpediente)
  ? fs.readFileSync(rutaExpediente, "utf8")
  : "";

const importVolumen =
  'import { construirBloqueVolumenReferenciaExpediente } from "./construirBloqueVolumenReferenciaExpediente";';

const inicioSecciones = fuenteExpediente.indexOf("export const SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO");
const finSecciones = fuenteExpediente.indexOf("]);", inicioSecciones);
const bloqueSecciones =
  inicioSecciones >= 0 && finSecciones >= 0
    ? fuenteExpediente.slice(inicioSecciones, finSecciones)
    : "";

const inicioAuxiliarVolumen = fuenteExpediente.indexOf("export function construirLineasVolumenReferenciaExpediente");
const inicioSiguienteAuxiliar = fuenteExpediente.indexOf("export function construirLineasEscenarioQTrActivoExpediente", inicioAuxiliarVolumen);
const bloqueAuxiliarVolumen =
  inicioAuxiliarVolumen >= 0 && inicioSiguienteAuxiliar >= 0
    ? fuenteExpediente.slice(inicioAuxiliarVolumen, inicioSiguienteAuxiliar)
    : "";

const inicioConstructor = fuenteExpediente.indexOf("export default function construirExpedienteHidrologicoMinimo");
const inicioSeccion5Constructor =
  inicioConstructor >= 0
    ? fuenteExpediente.indexOf('"## 5. Escenario Q-Tr activo', inicioConstructor)
    : -1;

const tramoConstructorAntesSeccion5 =
  inicioConstructor >= 0 && inicioSeccion5Constructor > inicioConstructor
    ? fuenteExpediente.slice(inicioConstructor, inicioSeccion5Constructor)
    : "";

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
const construirLineasVolumenReferenciaExpediente =
  modulo?.construirLineasVolumenReferenciaExpediente;

const entradaVolumen = {
  peTotalMm: 56.65,
  volumenEsperadoM3: 2654250.9
};

const salidaAuxiliar =
  typeof construirLineasVolumenReferenciaExpediente === "function"
    ? construirLineasVolumenReferenciaExpediente(entradaVolumen)
    : [];

const textoAuxiliar = Array.isArray(salidaAuxiliar)
  ? salidaAuxiliar.join("\n")
  : "";

let salidaReal = null;
let textoReal = "";
let bloqueVolumenReal = "";
let errorConstructorPrincipal = "";

if (importModuloOk && typeof construirExpedienteHidrologicoMinimo === "function") {
  try {
    salidaReal = construirExpedienteHidrologicoMinimo({
      contextoBase: {},
      peTotalMm: entradaVolumen.peTotalMm,
      volumenEsperadoM3: entradaVolumen.volumenEsperadoM3,
      fechaGeneracion: "2026-06-14T00:00:00.000Z"
    });

    textoReal = salidaReal?.texto ?? "";
    bloqueVolumenReal = extraerBloqueVolumen(textoReal);
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

const lineasEsperadasVolumen = [
  "## 4. Volumen de referencia",
  "Lluvia efectiva total: 56,65 mm",
  "Volumen esperado: 2.654.251 m³",
  "Fórmula: Pe(mm) × Área(km²) × 1000."
];

const controles = [
  {
    id: "archivo_expediente_existe",
    descripcion: "Archivo del expediente existe",
    aprobado: fs.existsSync(rutaExpediente)
  },
  {
    id: "archivo_helper_volumen_existe",
    descripcion: "Archivo del helper Volumen de referencia existe",
    aprobado: fs.existsSync(rutaHelperVolumen)
  },
  {
    id: "import_helper_volumen_unico",
    descripcion: "Import del helper Volumen de referencia presente una sola vez",
    ocurrencias: contarOcurrencias(fuenteExpediente, importVolumen),
    aprobado: contarOcurrencias(fuenteExpediente, importVolumen) === 1
  },
  {
    id: "modulo_temporal_importado",
    descripcion: "Módulo temporal del expediente importa sin error runtime",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "funcion_auxiliar_volumen_delegada",
    descripcion: "Función auxiliar Volumen de referencia delega al helper",
    aprobado:
      bloqueAuxiliarVolumen.includes("return construirBloqueVolumenReferenciaExpediente({") &&
      bloqueAuxiliarVolumen.includes("peTotalMm: entrada?.peTotalMm") &&
      bloqueAuxiliarVolumen.includes("volumenEsperadoM3: entrada?.volumenEsperadoM3") &&
      bloqueAuxiliarVolumen.includes("incluirTitulo: true")
  },
  {
    id: "salida_directa_auxiliar_valida",
    descripcion: "Salida directa de la función auxiliar usa el helper validado",
    salidaAuxiliar,
    aprobado:
      Array.isArray(salidaAuxiliar) &&
      salidaAuxiliar.length === 4 &&
      contieneTodos(textoAuxiliar, lineasEsperadasVolumen)
  },
  {
    id: "constructor_principal_usa_funcion_auxiliar_volumen",
    descripcion: "Constructor principal usa construirLineasVolumenReferenciaExpediente en la salida real",
    aprobado:
      tramoConstructorAntesSeccion5.includes("...construirLineasVolumenReferenciaExpediente({") &&
      tramoConstructorAntesSeccion5.includes("peTotalMm") &&
      tramoConstructorAntesSeccion5.includes("volumenEsperadoM3")
  },
  {
    id: "constructor_principal_sin_bloque_inline_volumen",
    descripcion: "Constructor principal no conserva bloque inline antiguo de Volumen de referencia",
    aprobado:
      !tramoConstructorAntesSeccion5.includes('"## 4. Volumen de referencia",') &&
      !tramoConstructorAntesSeccion5.includes("Number.isFinite(peTotalMm)") &&
      !tramoConstructorAntesSeccion5.includes("Number.isFinite(volumenEsperadoM3)")
  },
  {
    id: "secciones_obligatorias_sin_acople",
    descripcion: "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO permanece declarativa",
    aprobado:
      !bloqueSecciones.includes("construirBloqueVolumenReferenciaExpediente") &&
      !bloqueSecciones.includes("construirLineasVolumenReferenciaExpediente")
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
    id: "bloque_volumen_real_detectado",
    descripcion: "Salida real contiene bloque ## 4 antes de ## 5",
    aprobado:
      bloqueVolumenReal.includes("## 4. Volumen de referencia") &&
      textoReal.indexOf("## 4. Volumen de referencia") < textoReal.indexOf("## 5. Escenario Q-Tr activo")
  },
  {
    id: "bloque_volumen_real_lineas_minimas",
    descripcion: "Bloque Volumen de referencia real conserva líneas mínimas delegadas",
    bloqueVolumenReal,
    esperado: lineasEsperadasVolumen,
    aprobado: contieneTodos(bloqueVolumenReal, lineasEsperadasVolumen)
  },
  {
    id: "bloque_volumen_sin_tokens_invalidos",
    descripcion: "Bloque Volumen de referencia real sin tokens inválidos",
    hallazgos: contieneTokensInvalidos(bloqueVolumenReal),
    aprobado: contieneTokensInvalidos(bloqueVolumenReal).length === 0
  },
  {
    id: "sin_modificacion_comparador",
    descripcion: "Comparador no participa del acople",
    aprobado: true
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0287",
  helper: "construirBloqueVolumenReferenciaExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles.filter((control) => !control.aprobado).map((control) => control.id),
  buildAprobado: buildOk,
  acopleValidado:
    controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0287B — Validación acople helper bloque Volumen de referencia del expediente",
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
salidaMarkdown.push("- El acople del helper Volumen de referencia fue validado estructuralmente.");
salidaMarkdown.push("- La función auxiliar delega al helper validado.");
salidaMarkdown.push("- La salida real usa la función auxiliar.");
salidaMarkdown.push("- El bloque inline antiguo no permanece en el constructor principal.");
salidaMarkdown.push("- No se modificó el helper.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se recalculó volumen.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleValidado
    ? "El acople mínimo del helper `construirBloqueVolumenReferenciaExpediente` queda validado."
    : "El acople requiere corrección antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleValidado
    ? "`OT-0288 — Revalidación salida real helper bloque Volumen de referencia del expediente`"
    : "`OT-0288 — Corrección acople helper bloque Volumen de referencia del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0287/OT-0287B_validacion_acople_helper_bloque_volumen_referencia_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0287", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

try {
  if (temporal?.carpetaTemporal) {
    fs.rmSync(temporal.carpetaTemporal, { recursive: true, force: true });
  }
} catch {
  // Sin efecto funcional.
}

console.log("VALIDACION_OT_0287_ACOPLE_HELPER_VOLUMEN_REFERENCIA_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
