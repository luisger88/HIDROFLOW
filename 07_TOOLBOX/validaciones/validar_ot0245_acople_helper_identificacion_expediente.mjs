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

const rutaHelperRestricciones = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js"
);

const rutaHelperIdentificacion = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js"
);

const fuente = fs.readFileSync(rutaExpediente, "utf8");

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function extraerBloqueSeccionesObligatorias(texto) {
  const inicio = texto.indexOf("export const SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO");
  const fin = texto.indexOf("]);", inicio);

  if (inicio < 0 || fin < 0) {
    return "";
  }

  return texto.slice(inicio, fin + 3);
}

function extraerFuncionIdentificacion(texto) {
  const inicio = texto.indexOf("export function construirLineasIdentificacionExpediente");
  const fin = texto.indexOf("export function construirLineasSelloTecnicoAuxiliarExpediente", inicio);

  if (inicio < 0 || fin < 0) {
    return "";
  }

  return texto.slice(inicio, fin);
}

function prepararModuloTemporal() {
  const importRestriccionesOriginal =
    'from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";';
  const importIdentificacionOriginal =
    'from "./construirBloqueIdentificacionExpedienteMinimo";';

  const importRestriccionesTemporal =
    `from "${pathToFileURL(rutaHelperRestricciones).href}";`;
  const importIdentificacionTemporal =
    `from "${pathToFileURL(rutaHelperIdentificacion).href}";`;

  let fuenteTemporal = fuente
    .replace(importRestriccionesOriginal, importRestriccionesTemporal)
    .replace(importIdentificacionOriginal, importIdentificacionTemporal);

  const carpetaTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "ot0245-hidroflow-"));
  const rutaTemporal = path.join(carpetaTemporal, "construirExpedienteHidrologicoMinimo.mjs");

  fs.writeFileSync(rutaTemporal, fuenteTemporal, "utf8");

  return { carpetaTemporal, rutaTemporal };
}

const bloqueSecciones = extraerBloqueSeccionesObligatorias(fuente);
const funcionIdentificacion = extraerFuncionIdentificacion(fuente);

const importHelper =
  'import { construirBloqueIdentificacionExpedienteMinimo } from "./construirBloqueIdentificacionExpedienteMinimo";';

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const camposDelegadosIdentificacion = [
  "- Cuenca activa:",
  "- Identificador interno de cuenca:",
  "- Versión del expediente:",
  "- Tipo de salida documental:",
  "- Fecha de generación:",
  "- Fuente o modo de generación:",
  "- Estado documental:",
  "- Alcance documental:"
];

const terminosSensiblesBloqueIdentificacion = [
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
  "suficiencia hidráulica",
  "suficiencia hidrológica"
];

let modulo = null;
let importModuloOk = false;
let importModuloError = "";

const temporal = prepararModuloTemporal();

try {
  modulo = await import(pathToFileURL(temporal.rutaTemporal).href);
  importModuloOk = true;
} catch (error) {
  importModuloError = `${error?.message || error}`;
  importModuloOk = false;
}

const construirExpedienteHidrologicoMinimo = modulo?.default;
const construirLineasIdentificacionExpediente =
  modulo?.construirLineasIdentificacionExpediente;

const contextoPrueba = {
  contextoBase: {
    nombreCuenca: "La Iguaná PC_80",
    identificadorCuenca: "PC_80",
    CN: 86,
    CN_base: 86,
    CN_efectivo: 87,
    AMC: "II",
    area_km2: 46.8516,
    lluvia_efectiva_total_mm: 56.65,
    fuente: "VALIDACION_OT_0245"
  },
  fechaGeneracion: "VALIDACION_OT_0245"
};

let lineasIdentificacion = [];
let textoIdentificacion = "";
let salidaExpediente = null;
let textoExpediente = "";
let bloqueIdentificacionSalida = "";

if (importModuloOk && typeof construirLineasIdentificacionExpediente === "function") {
  lineasIdentificacion = construirLineasIdentificacionExpediente(contextoPrueba);
  textoIdentificacion = Array.isArray(lineasIdentificacion)
    ? lineasIdentificacion.join("\n")
    : "";
}

if (importModuloOk && typeof construirExpedienteHidrologicoMinimo === "function") {
  salidaExpediente = construirExpedienteHidrologicoMinimo({
    contextoBase: contextoPrueba.contextoBase,
    fechaGeneracion: "VALIDACION_OT_0245"
  });

  textoExpediente =
    typeof salidaExpediente === "string"
      ? salidaExpediente
      : typeof salidaExpediente?.texto === "string"
      ? salidaExpediente.texto
      : "";

  const indiceIdentificacion = textoExpediente.indexOf("## 1. Identificación");
  const indiceParametros = textoExpediente.indexOf("## 2. Parámetros hidrológicos base");

  bloqueIdentificacionSalida =
    indiceIdentificacion >= 0 && indiceParametros > indiceIdentificacion
      ? textoExpediente.slice(indiceIdentificacion, indiceParametros)
      : "";
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

const controles = [
  {
    id: "archivo_expediente",
    descripcion: "Archivo de expediente existe",
    aprobado: fs.existsSync(rutaExpediente)
  },
  {
    id: "import_helper_identificacion_unico",
    descripcion: "Import del helper de Identificación presente una sola vez",
    ocurrencias: contarOcurrencias(fuente, importHelper),
    aprobado: contarOcurrencias(fuente, importHelper) === 1
  },
  {
    id: "modulo_temporal_importado",
    descripcion: "El módulo temporal pudo importarse en Node ESM con imports file://",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "secciones_obligatorias_sin_helper",
    descripcion: "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO no contiene llamada al helper",
    aprobado:
      bloqueSecciones.length > 0 &&
      !bloqueSecciones.includes("construirBloqueIdentificacionExpedienteMinimo")
  },
  {
    id: "secciones_obligatorias_con_identificacion",
    descripcion: "Sección obligatoria ## 1. Identificación permanece como título",
    aprobado: bloqueSecciones.includes('"## 1. Identificación"')
  },
  {
    id: "secciones_obligatorias_con_parametros",
    descripcion: "Sección obligatoria ## 2. Parámetros hidrológicos base permanece como título",
    aprobado: bloqueSecciones.includes('"## 2. Parámetros hidrológicos base"')
  },
  {
    id: "funcion_identificacion_delegada",
    descripcion: "construirLineasIdentificacionExpediente llama al helper de Identificación",
    aprobado:
      funcionIdentificacion.includes("return construirBloqueIdentificacionExpedienteMinimo({") &&
      funcionIdentificacion.includes("incluirTitulo: true")
  },
  {
    id: "export_default_presente",
    descripcion: "export default del constructor principal presente",
    aprobado: fuente.includes("export default function construirExpedienteHidrologicoMinimo")
  },
  {
    id: "lineas_identificacion_array",
    descripcion: "construirLineasIdentificacionExpediente devuelve string[]",
    aprobado:
      Array.isArray(lineasIdentificacion) &&
      lineasIdentificacion.every((linea) => typeof linea === "string"),
    longitud: Array.isArray(lineasIdentificacion) ? lineasIdentificacion.length : null
  },
  {
    id: "lineas_identificacion_campos_delegados",
    descripcion: "La función delegada contiene campos mínimos del helper",
    faltantes: camposDelegadosIdentificacion.filter(
      (campo) => !textoIdentificacion.includes(campo)
    ),
    aprobado: camposDelegadosIdentificacion.every((campo) =>
      textoIdentificacion.includes(campo)
    )
  },
  {
    id: "salida_expediente_generada",
    descripcion: "El constructor principal genera salida documental",
    longitud: textoExpediente.length,
    aprobado: textoExpediente.length > 0
  },
  {
    id: "salida_expediente_bloque_identificacion_detectado",
    descripcion: "La salida real contiene bloque ## 1. Identificación antes de ## 2",
    aprobado: bloqueIdentificacionSalida.length > 0
  },
  {
    id: "salida_expediente_usa_campos_delegados",
    descripcion: "La salida real del expediente usa campos delegados del helper de Identificación",
    faltantes: camposDelegadosIdentificacion.filter(
      (campo) => !bloqueIdentificacionSalida.includes(campo)
    ),
    aprobado: camposDelegadosIdentificacion.every((campo) =>
      bloqueIdentificacionSalida.includes(campo)
    )
  },
  {
    id: "bloque_identificacion_sin_tokens_invalidos",
    descripcion: "Bloque Identificación sin tokens inválidos",
    hallazgos: tokensInvalidos
      .map((token) => ({
        token,
        ocurrencias: contarOcurrencias(bloqueIdentificacionSalida, token)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: tokensInvalidos.every(
      (token) => contarOcurrencias(bloqueIdentificacionSalida, token) === 0
    )
  },
  {
    id: "bloque_identificacion_sin_terminos_sensibles",
    descripcion: "Bloque Identificación sin términos hidrológicos sensibles prohibidos",
    hallazgos: terminosSensiblesBloqueIdentificacion
      .map((termino) => ({
        termino,
        ocurrencias: contarOcurrencias(bloqueIdentificacionSalida, termino)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: terminosSensiblesBloqueIdentificacion.every(
      (termino) => contarOcurrencias(bloqueIdentificacionSalida, termino) === 0
    )
  },
  {
    id: "build_vite",
    descripcion: "Build Vite",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0245",
  helper: "construirBloqueIdentificacionExpedienteMinimo",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  buildAprobado: buildOk,
  acopleValidado: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0245B — Validación acople helper Identificación del expediente",
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
salidaMarkdown.push("- La validación revisó fuente, función delegada, salida directa del helper y salida real del expediente.");
salidaMarkdown.push("- Para ejecutar en Node ESM, la validación generó una copia temporal del módulo con imports `file://`.");
salidaMarkdown.push("- No se modificó código funcional durante la validación.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se tocaron bloques sensibles.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleValidado
    ? "El acople del helper de Identificación queda validado."
    : "El acople del helper de Identificación requiere corrección antes de estabilizarse."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleValidado
    ? "`OT-0246 — Decisión estabilización acople helper Identificación del expediente`"
    : "`OT-0246 — Corrección acople helper Identificación del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0245/OT-0245B_validacion_acople_helper_identificacion_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0245", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

try {
  fs.rmSync(temporal.carpetaTemporal, { recursive: true, force: true });
} catch {
  // Sin efecto funcional.
}

console.log("VALIDACION_OT_0245_ACOPLE_IDENTIFICACION_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
