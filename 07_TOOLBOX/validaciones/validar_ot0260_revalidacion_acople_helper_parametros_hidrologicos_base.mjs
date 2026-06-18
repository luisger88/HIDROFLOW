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

const fuenteExpediente = fs.readFileSync(rutaExpediente, "utf8");

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function prepararModuloTemporal() {
  const carpetaTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "ot0260-hidroflow-"));
  const rutaTemporal = path.join(carpetaTemporal, "construirExpedienteHidrologicoMinimo.mjs");

  const urlHelperParametros = pathToFileURL(rutaHelperParametros).href;
  const urlHelperIdentificacion = pathToFileURL(rutaHelperIdentificacion).href;
  const urlHelperRestricciones = pathToFileURL(rutaHelperRestricciones).href;

  const fuenteTemporal = fuenteExpediente
    .replace(
      'from "./construirBloqueParametrosHidrologicosBaseExpediente";',
      `from "${urlHelperParametros}";`
    )
    .replace(
      'from "./construirBloqueIdentificacionExpedienteMinimo";',
      `from "${urlHelperIdentificacion}";`
    )
    .replace(
      'from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";',
      `from "${urlHelperRestricciones}";`
    );

  fs.writeFileSync(rutaTemporal, fuenteTemporal, "utf8");

  return { carpetaTemporal, rutaTemporal };
}

function textoSalida(lineas) {
  return Array.isArray(lineas) ? lineas.join("\n") : "";
}

function contieneTodos(texto, patrones) {
  return patrones.every((patron) => texto.includes(patron));
}

function extraerBloqueParametros(texto) {
  const inicio = texto.indexOf("## 2. Parámetros hidrológicos base");
  const fin = texto.indexOf("## 3. Tiempo de concentración y roles Tc", inicio);

  if (inicio < 0) {
    return "";
  }

  if (fin < 0) {
    return texto.slice(inicio);
  }

  return texto.slice(inicio, fin);
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

const construirExpedienteHidrologicoMinimo = modulo?.default;
const construirLineasParametrosHidrologicosBaseExpediente =
  modulo?.construirLineasParametrosHidrologicosBaseExpediente;

const contextoBaseSensible = {
  CN: { valor: 86 },
  CN_base: { valor: 80 },
  CN_efectivo: { valor: 87 },
  AMC: { valor: "II" }
};

let salidaDirecta = [];
let salidaReal = null;
let textoReal = "";
let bloqueParametrosReal = "";

if (importModuloOk && typeof construirLineasParametrosHidrologicosBaseExpediente === "function") {
  salidaDirecta = construirLineasParametrosHidrologicosBaseExpediente({
    contextoBase: contextoBaseSensible
  });
}

if (importModuloOk && typeof construirExpedienteHidrologicoMinimo === "function") {
  salidaReal = construirExpedienteHidrologicoMinimo({
    contextoBase: contextoBaseSensible,
    fechaGeneracion: "2026-06-14T00:00:00.000Z"
  });

  textoReal = salidaReal?.texto ?? "";
  bloqueParametrosReal = extraerBloqueParametros(textoReal);
}

const textoDirecto = textoSalida(salidaDirecta);

const camposDelegadosEsperados = [
  "CN: —",
  "CN base: —",
  "CN efectivo: —",
  "AMC: —"
];

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const terminosSensiblesProhibidosEnBloque = [
  "Q-5",
  "Q-Tr",
  "Método Racional",
  "Q(t)",
  "Volumen",
  "hidrogramas",
  "Pe",
  "masa",
  "caudales"
];

const importHelper = 'import { construirBloqueParametrosHidrologicosBaseExpediente } from "./construirBloqueParametrosHidrologicosBaseExpediente";';

const inicioSecciones = fuenteExpediente.indexOf("export const SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO");
const finSecciones = fuenteExpediente.indexOf("]);", inicioSecciones);
const bloqueSecciones =
  inicioSecciones >= 0 && finSecciones >= 0
    ? fuenteExpediente.slice(inicioSecciones, finSecciones)
    : "";

const inicioAuxiliar = fuenteExpediente.indexOf("export function construirLineasParametrosHidrologicosBaseExpediente");
const inicioSiguiente = fuenteExpediente.indexOf("export function construirLineasTiempoConcentracionRolesTcExpediente", inicioAuxiliar);
const bloqueAuxiliar =
  inicioAuxiliar >= 0 && inicioSiguiente >= 0
    ? fuenteExpediente.slice(inicioAuxiliar, inicioSiguiente)
    : "";

const inicioConstructor = fuenteExpediente.indexOf("export default function construirExpedienteHidrologicoMinimo");
const inicioSeccion3Constructor =
  inicioConstructor >= 0
    ? fuenteExpediente.indexOf('"## 3. Tiempo de concentración y roles Tc"', inicioConstructor)
    : -1;

const tramoConstructorAntesSeccion3 =
  inicioConstructor >= 0 && inicioSeccion3Constructor > inicioConstructor
    ? fuenteExpediente.slice(inicioConstructor, inicioSeccion3Constructor)
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
    id: "archivo_expediente_existe",
    descripcion: "Archivo del expediente existe",
    aprobado: fs.existsSync(rutaExpediente)
  },
  {
    id: "archivo_helper_parametros_existe",
    descripcion: "Archivo del helper de parámetros base existe",
    aprobado: fs.existsSync(rutaHelperParametros)
  },
  {
    id: "import_helper_parametros_unico",
    descripcion: "Import del helper de parámetros base presente una sola vez",
    ocurrencias: contarOcurrencias(fuenteExpediente, importHelper),
    aprobado: contarOcurrencias(fuenteExpediente, importHelper) === 1
  },
  {
    id: "modulo_temporal_importado",
    descripcion: "El módulo temporal pudo importarse en Node ESM con imports file://",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "secciones_obligatorias_sin_helper",
    descripcion: "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO no contiene llamadas a helper",
    aprobado:
      !bloqueSecciones.includes("construirBloqueParametrosHidrologicosBaseExpediente") &&
      !bloqueSecciones.includes("construirLineasParametrosHidrologicosBaseExpediente")
  },
  {
    id: "export_default_presente",
    descripcion: "export default del constructor principal presente",
    aprobado: fuenteExpediente.includes("export default function construirExpedienteHidrologicoMinimo")
  },
  {
    id: "funcion_auxiliar_delegada",
    descripcion: "construirLineasParametrosHidrologicosBaseExpediente delega al helper",
    aprobado: bloqueAuxiliar.includes("return construirBloqueParametrosHidrologicosBaseExpediente({")
  },
  {
    id: "constructor_principal_usa_funcion_auxiliar",
    descripcion: "El constructor principal usa construirLineasParametrosHidrologicosBaseExpediente en la salida real",
    aprobado: tramoConstructorAntesSeccion3.includes("...construirLineasParametrosHidrologicosBaseExpediente({")
  },
  {
    id: "salida_directa_auxiliar_string_array",
    descripcion: "La salida directa de la función auxiliar devuelve string[]",
    longitud: Array.isArray(salidaDirecta) ? salidaDirecta.length : null,
    aprobado: Array.isArray(salidaDirecta) && salidaDirecta.every((linea) => typeof linea === "string")
  },
  {
    id: "salida_directa_usa_helper",
    descripcion: "La salida directa de la función auxiliar usa normalización delegada del helper",
    salida: salidaDirecta,
    aprobado: contieneTodos(textoDirecto, camposDelegadosEsperados)
  },
  {
    id: "constructor_principal_genera_salida",
    descripcion: "El constructor principal genera salida documental",
    longitud: typeof textoReal === "string" ? textoReal.length : null,
    aprobado: typeof textoReal === "string" && textoReal.length > 0
  },
  {
    id: "bloque_parametros_real_detectado",
    descripcion: "La salida real contiene bloque ## 2 antes de ## 3",
    aprobado:
      bloqueParametrosReal.includes("## 2. Parámetros hidrológicos base") &&
      textoReal.indexOf("## 2. Parámetros hidrológicos base") < textoReal.indexOf("## 3. Tiempo de concentración y roles Tc")
  },
  {
    id: "salida_real_usa_campos_delegados",
    descripcion: "La salida real del constructor principal usa normalización delegada del helper",
    bloqueParametrosReal,
    esperado: camposDelegadosEsperados,
    aprobado:
      contieneTodos(bloqueParametrosReal, camposDelegadosEsperados) &&
      !bloqueParametrosReal.includes("[object Object]")
  },
  {
    id: "constructor_principal_sin_bloque_inline_parametros",
    descripcion: "El constructor principal no conserva bloque inline de parámetros base antes de la sección 3",
    aprobado: !tramoConstructorAntesSeccion3.includes('"## 2. Parámetros hidrológicos base"')
  },
  {
    id: "bloque_parametros_sin_tokens_invalidos",
    descripcion: "Bloque Parámetros hidrológicos base sin tokens inválidos",
    hallazgos: tokensInvalidos
      .map((token) => ({
        token,
        ocurrencias: contarOcurrencias(bloqueParametrosReal, token)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: tokensInvalidos.every((token) => contarOcurrencias(bloqueParametrosReal, token) === 0)
  },
  {
    id: "bloque_parametros_sin_terminos_sensibles",
    descripcion: "Bloque Parámetros hidrológicos base sin términos sensibles ajenos al bloque",
    hallazgos: terminosSensiblesProhibidosEnBloque
      .map((termino) => ({
        termino,
        ocurrencias: contarOcurrencias(bloqueParametrosReal, termino)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: terminosSensiblesProhibidosEnBloque.every((termino) => contarOcurrencias(bloqueParametrosReal, termino) === 0)
  },
  {
    id: "build_vite",
    descripcion: "Build Vite",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0260",
  helper: "construirBloqueParametrosHidrologicosBaseExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  buildAprobado: buildOk,
  acopleAuxiliarValidado:
    controles.find((control) => control.id === "funcion_auxiliar_delegada")?.aprobado === true &&
    controles.find((control) => control.id === "salida_directa_usa_helper")?.aprobado === true,
  acopleSalidaRealValidado:
    controles.find((control) => control.id === "salida_real_usa_campos_delegados")?.aprobado === true &&
    controles.find((control) => control.id === "constructor_principal_sin_bloque_inline_parametros")?.aprobado === true &&
    controles.find((control) => control.id === "constructor_principal_usa_funcion_auxiliar")?.aprobado === true,
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0260B — Revalidación acople helper Parámetros hidrológicos base del expediente",
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
salidaMarkdown.push("- La revalidación revisó fuente, import, función auxiliar, salida directa y salida real del constructor principal.");
salidaMarkdown.push("- La salida real se evaluó con valores objeto para confirmar que la normalización proviene del helper delegado.");
salidaMarkdown.push("- No se modificó código funcional durante esta revalidación.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se recalcularon ni validaron hidrológicamente `CN`, `CN base`, `CN efectivo` ni `AMC`.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleSalidaRealValidado
    ? "El acople del helper de Parámetros hidrológicos base queda revalidado en salida real."
    : "El acople del helper de Parámetros hidrológicos base requiere nueva corrección antes de estabilizarse."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleSalidaRealValidado
    ? "`OT-0261 — Decisión estabilización bloque Parámetros hidrológicos base del expediente`"
    : "`OT-0261 — Corrección acople helper Parámetros hidrológicos base del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0260/OT-0260B_revalidacion_acople_helper_parametros_hidrologicos_base_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0260", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

try {
  fs.rmSync(temporal.carpetaTemporal, { recursive: true, force: true });
} catch {
  // Sin efecto funcional.
}

console.log("REVALIDACION_OT_0260_ACOPLE_PARAMETROS_BASE_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
