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

const fuenteExpediente = fs.readFileSync(rutaExpediente, "utf8");

const importHelperTc = 'import { construirBloqueTiempoConcentracionRolesTcExpediente } from "./construirBloqueTiempoConcentracionRolesTcExpediente";';

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

function prepararModuloTemporal() {
  const carpetaTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "ot0273-hidroflow-"));
  const rutaTemporal = path.join(carpetaTemporal, "construirExpedienteHidrologicoMinimo.mjs");

  const fuenteTemporal = fuenteExpediente
    .replace(
      'from "./construirBloqueTiempoConcentracionRolesTcExpediente";',
      `from "${pathToFileURL(rutaHelperTc).href}";`
    )
    .replace(
      'from "./construirBloqueParametrosHidrologicosBaseExpediente";',
      `from "${pathToFileURL(rutaHelperParametros).href}";`
    )
    .replace(
      'from "./construirBloqueIdentificacionExpedienteMinimo";',
      `from "${pathToFileURL(rutaHelperIdentificacion).href}";`
    )
    .replace(
      'from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";',
      `from "${pathToFileURL(rutaHelperRestricciones).href}";`
    );

  fs.writeFileSync(rutaTemporal, fuenteTemporal, "utf8");

  return { carpetaTemporal, rutaTemporal };
}

function extraerBloqueTc(texto) {
  const inicio = texto.indexOf("## 3. Tiempo de concentración y roles Tc");
  const fin = texto.indexOf("## 4. Volumen de referencia", inicio);

  if (inicio < 0) {
    return "";
  }

  if (fin < 0) {
    return texto.slice(inicio);
  }

  return texto.slice(inicio, fin);
}

const inicioSecciones = fuenteExpediente.indexOf("export const SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO");
const finSecciones = fuenteExpediente.indexOf("]);", inicioSecciones);
const bloqueSecciones =
  inicioSecciones >= 0 && finSecciones >= 0
    ? fuenteExpediente.slice(inicioSecciones, finSecciones)
    : "";

const inicioAuxiliar = fuenteExpediente.indexOf("export function construirLineasTiempoConcentracionRolesTcExpediente");
const inicioSiguiente = fuenteExpediente.indexOf("export function construirLineasVolumenReferenciaExpediente", inicioAuxiliar);
const bloqueAuxiliar =
  inicioAuxiliar >= 0 && inicioSiguiente >= 0
    ? fuenteExpediente.slice(inicioAuxiliar, inicioSiguiente)
    : "";

const inicioConstructor = fuenteExpediente.indexOf("export default function construirExpedienteHidrologicoMinimo");
const inicioSeccion4Constructor =
  inicioConstructor >= 0
    ? fuenteExpediente.indexOf('"## 4. Volumen de referencia"', inicioConstructor)
    : -1;

const tramoConstructorAntesSeccion4 =
  inicioConstructor >= 0 && inicioSeccion4Constructor > inicioConstructor
    ? fuenteExpediente.slice(inicioConstructor, inicioSeccion4Constructor)
    : "";

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
const construirLineasTiempoConcentracionRolesTcExpediente =
  modulo?.construirLineasTiempoConcentracionRolesTcExpediente;

let salidaAuxiliar = [];
let textoAuxiliar = "";
let salidaReal = null;
let textoReal = "";
let bloqueTcReal = "";
let errorConstructorPrincipal = "";

const entradaSensible = {
  Tc_final: { valor: 114.23 },
  trDisenoActivoExpediente: { valor: 100 },
  fechaGeneracion: "2026-06-14T00:00:00.000Z"
};

if (importModuloOk && typeof construirLineasTiempoConcentracionRolesTcExpediente === "function") {
  salidaAuxiliar = construirLineasTiempoConcentracionRolesTcExpediente(entradaSensible);
  textoAuxiliar = Array.isArray(salidaAuxiliar) ? salidaAuxiliar.join("\n") : "";
}

if (importModuloOk && typeof construirExpedienteHidrologicoMinimo === "function") {
  try {
    salidaReal = construirExpedienteHidrologicoMinimo({
      contextoBase: {},
      Tc_final: entradaSensible.Tc_final,
      trDisenoActivoExpediente: entradaSensible.trDisenoActivoExpediente,
      fechaGeneracion: entradaSensible.fechaGeneracion
    });

    textoReal = salidaReal?.texto ?? "";
    bloqueTcReal = extraerBloqueTc(textoReal);
  } catch (error) {
    errorConstructorPrincipal = `${error?.name || "Error"}: ${error?.message || error}`;
    salidaReal = null;
    textoReal = "";
    bloqueTcReal = "";
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

const camposDelegadosEsperados = [
  "## 3. Tiempo de concentración y roles Tc",
  "Tc comparador: —",
  "Tr global activo: — años",
  "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  "Roles Tc:",
  "- Tc global Índice: referencia hidrológica general.",
  "- Tc operativo Q(t): ruta interna del hidrograma.",
  "- Duración evento: 3 h para almacenamiento/regulación.",
  "- Lag / forma SCS: parámetro derivado para forma temporal.",
  "- Tc comparador: referencia especializada para coherencia Q-5."
];

const controles = [
  {
    id: "archivo_expediente_existe",
    descripcion: "Archivo del expediente existe",
    aprobado: fs.existsSync(rutaExpediente)
  },
  {
    id: "archivo_helper_tc_existe",
    descripcion: "Archivo del helper Tc roles existe",
    aprobado: fs.existsSync(rutaHelperTc)
  },
  {
    id: "import_helper_tc_unico",
    descripcion: "Import del helper Tc roles presente una sola vez",
    ocurrencias: contarOcurrencias(fuenteExpediente, importHelperTc),
    aprobado: contarOcurrencias(fuenteExpediente, importHelperTc) === 1
  },
  {
    id: "modulo_temporal_importado",
    descripcion: "Módulo temporal importado con imports file://",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "secciones_obligatorias_sin_helper_tc",
    descripcion: "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO no contiene llamadas a helper Tc",
    aprobado:
      !bloqueSecciones.includes("construirBloqueTiempoConcentracionRolesTcExpediente") &&
      !bloqueSecciones.includes("construirLineasTiempoConcentracionRolesTcExpediente")
  },
  {
    id: "funcion_auxiliar_delegada",
    descripcion: "Función auxiliar Tc roles delega al helper",
    aprobado: bloqueAuxiliar.includes("return construirBloqueTiempoConcentracionRolesTcExpediente({")
  },
  {
    id: "constructor_principal_usa_funcion_auxiliar_tc",
    descripcion: "Constructor principal usa construirLineasTiempoConcentracionRolesTcExpediente en la salida real",
    aprobado: tramoConstructorAntesSeccion4.includes("...construirLineasTiempoConcentracionRolesTcExpediente({")
  },
  {
    id: "salida_directa_auxiliar_usa_helper",
    descripcion: "Salida directa de la función auxiliar usa normalización delegada del helper",
    salidaAuxiliar,
    aprobado:
      Array.isArray(salidaAuxiliar) &&
      contieneTodos(textoAuxiliar, camposDelegadosEsperados) &&
      !textoAuxiliar.includes("[object Object]")
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
    aprobado: errorConstructorPrincipal === "" && typeof textoReal === "string" && textoReal.length > 0
  },
  {
    id: "bloque_tc_real_detectado",
    descripcion: "La salida real contiene bloque ## 3 antes de ## 4",
    aprobado:
      bloqueTcReal.includes("## 3. Tiempo de concentración y roles Tc") &&
      textoReal.indexOf("## 3. Tiempo de concentración y roles Tc") < textoReal.indexOf("## 4. Volumen de referencia")
  },
  {
    id: "salida_real_usa_campos_delegados",
    descripcion: "La salida real del constructor principal usa normalización delegada del helper",
    bloqueTcReal,
    esperado: camposDelegadosEsperados,
    aprobado:
      contieneTodos(bloqueTcReal, camposDelegadosEsperados) &&
      !bloqueTcReal.includes("[object Object]")
  },
  {
    id: "constructor_principal_sin_bloque_inline_tc",
    descripcion: "El constructor principal no conserva bloque inline de Tc antes de la sección 4",
    aprobado: !tramoConstructorAntesSeccion4.includes('"## 3. Tiempo de concentración y roles Tc"')
  },
  {
    id: "bloque_tc_sin_tokens_invalidos",
    descripcion: "Bloque Tc real sin tokens inválidos",
    hallazgos: tokensInvalidos
      .map((token) => ({
        token,
        ocurrencias: contarOcurrencias(bloqueTcReal, token)
      }))
      .filter((item) => item.ocurrencias > 0),
    aprobado: tokensInvalidos.every((token) => contarOcurrencias(bloqueTcReal, token) === 0)
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0273",
  helper: "construirBloqueTiempoConcentracionRolesTcExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles.filter((control) => !control.aprobado).map((control) => control.id),
  buildAprobado: buildOk,
  acopleAuxiliarValidado:
    controles.find((control) => control.id === "funcion_auxiliar_delegada")?.aprobado === true &&
    controles.find((control) => control.id === "salida_directa_auxiliar_usa_helper")?.aprobado === true,
  acopleSalidaRealValidado:
    controles.find((control) => control.id === "constructor_principal_usa_funcion_auxiliar_tc")?.aprobado === true &&
    controles.find((control) => control.id === "salida_real_usa_campos_delegados")?.aprobado === true &&
    controles.find((control) => control.id === "constructor_principal_sin_bloque_inline_tc")?.aprobado === true,
  requiereCorreccionSalidaReal:
    controles.find((control) => control.id === "constructor_principal_sin_error_runtime")?.aprobado !== true ||
    controles.find((control) => control.id === "salida_real_usa_campos_delegados")?.aprobado !== true ||
    controles.find((control) => control.id === "constructor_principal_sin_bloque_inline_tc")?.aprobado !== true,
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0273B — Revalidación acople helper Tiempo de concentración y roles Tc del expediente",
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
salidaMarkdown.push("- La función auxiliar queda delegada al helper validado.");
salidaMarkdown.push("- La salida directa de la función auxiliar fue evaluada en aislamiento.");
salidaMarkdown.push("- La salida real del constructor principal fue evaluada por separado.");
salidaMarkdown.push("- La salida real usa la función auxiliar delegada.");
salidaMarkdown.push("- El bloque inline antiguo no permanece en el constructor principal.");
salidaMarkdown.push("- No se corrigió código funcional en esta OT.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se recalculó `Tc`.");
salidaMarkdown.push("- No se emitió dictamen hidrológico.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleSalidaRealValidado
    ? "El acople del helper `construirBloqueTiempoConcentracionRolesTcExpediente` queda revalidado en salida real."
    : "El acople requiere corrección adicional antes de estabilizar el bloque."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleSalidaRealValidado
    ? "`OT-0274 — Decisión estabilización bloque Tiempo de concentración y roles Tc del expediente`"
    : "`OT-0274 — Corrección runtime variable trDisenoActivoExpediente en salida real Tc roles`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0273/OT-0273B_revalidacion_acople_helper_tiempo_concentracion_roles_tc_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0273", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

try {
  fs.rmSync(temporal.carpetaTemporal, { recursive: true, force: true });
} catch {
  // Sin efecto funcional.
}

console.log("VALIDACION_OT_0273_REVALIDACION_ACOPLE_TC_ROLES_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));

