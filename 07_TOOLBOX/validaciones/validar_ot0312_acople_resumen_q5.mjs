import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import { pathToFileURL } from "url";

const raiz = process.cwd();

const rutaConstructor = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const rutaHelper = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js"
);

const rutaComparador = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const dirDocumentos = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos"
);

const importHelper =
  'import { construirBloqueResumenQ5AuditadoExpediente } from "./construirBloqueResumenQ5AuditadoExpediente";';

const bloqueInlineAntiguo =
  '`Métodos recibidos: ${Array.isArray(metodos) ? metodos.length : 0}`';

const tokensInvalidos = ["undefined", "null", "NaN", "[object Object]"];

function leer(ruta) {
  return fs.existsSync(ruta) ? fs.readFileSync(ruta, "utf8") : "";
}

function contar(texto, patron) {
  return texto.split(patron).length - 1;
}

function contieneTodos(texto, patrones) {
  return patrones.every((patron) => texto.includes(patron));
}

function tokensEn(texto) {
  return tokensInvalidos
    .map((token) => ({ token, ocurrencias: contar(texto, token) }))
    .filter((item) => item.ocurrencias > 0);
}

function gitDiffQuiet(rutaRelativa) {
  try {
    execSync(`git diff --quiet -- "${rutaRelativa}"`, {
      cwd: raiz,
      stdio: "pipe"
    });
    return true;
  } catch {
    return false;
  }
}

function crearCopiaTemporalDocumentosConImportsJs() {
  const dirTemporal = fs.mkdtempSync(
    path.join(os.tmpdir(), "hidroflow-ot0312-documentos-")
  );

  const archivos = fs
    .readdirSync(dirDocumentos)
    .filter((archivo) => archivo.endsWith(".js"));

  for (const archivo of archivos) {
    const origen = path.join(dirDocumentos, archivo);
    const destino = path.join(dirTemporal, archivo);

    let contenido = fs.readFileSync(origen, "utf8");

    contenido = contenido.replace(
      /from\s+["']\.\/([^"']+)["']/g,
      (coincidencia, modulo) => {
        if (modulo.endsWith(".js")) {
          return coincidencia;
        }

        const candidato = path.join(dirDocumentos, `${modulo}.js`);
        if (fs.existsSync(candidato)) {
          return coincidencia.replace(`./${modulo}`, `./${modulo}.js`);
        }

        return coincidencia;
      }
    );

    fs.writeFileSync(destino, contenido, "utf8");
  }

  return dirTemporal;
}

const fuenteConstructor = leer(rutaConstructor);
const fuenteHelper = leer(rutaHelper);
const fuenteComparador = leer(rutaComparador);

let moduloConstructor = null;
let moduloConstructorOk = false;
let moduloConstructorError = "";
let dirTemporalImport = "";

try {
  dirTemporalImport = crearCopiaTemporalDocumentosConImportsJs();
  const rutaConstructorTemporal = path.join(
    dirTemporalImport,
    "construirExpedienteHidrologicoMinimo.js"
  );

  moduloConstructor = await import(pathToFileURL(rutaConstructorTemporal).href);
  moduloConstructorOk = true;
} catch (error) {
  moduloConstructorError = `${error?.name || "Error"}: ${error?.message || error}`;
}

const construirExpedienteHidrologicoMinimo = moduloConstructor?.default;
const construirLineasResumenQ5AuditadoExpediente =
  moduloConstructor?.construirLineasResumenQ5AuditadoExpediente;

const metodosPrueba = [
  { metodo: "SCS", qp: 184.03 },
  { metodo: "Snyder", qp: 124.65 },
  { metodo: "Clark IUH", qp: 94.28 }
];

const salidaLineasResumen =
  typeof construirLineasResumenQ5AuditadoExpediente === "function"
    ? construirLineasResumenQ5AuditadoExpediente({
        metodosQ5: metodosPrueba,
        estadoResumenQ5AuditadoExpediente:
          "sección contractual inicial del helper puro"
      })
    : [];

const textoLineasResumen = Array.isArray(salidaLineasResumen)
  ? salidaLineasResumen.join("\n")
  : "";

const salidaExpediente =
  typeof construirExpedienteHidrologicoMinimo === "function"
    ? construirExpedienteHidrologicoMinimo({
        contextoBase: {
          area_km2: 46.8516,
          lluvia_efectiva_total_mm: 56.65
        },
        metodos: metodosPrueba,
        fechaGeneracion: "OT-0312"
      })
    : null;

const textoExpediente = salidaExpediente?.texto ?? "";

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
}

const patronesRecalculoQ5 = [
  "calcularQ5",
  "calcQ5",
  "calcularHidrograma",
  "metodoAdoptado",
  "caudalAdoptado",
  "seleccionarMetodo",
  "seleccionarCaudal"
];

const controles = [
  {
    id: "constructor_existe",
    descripcion: "Constructor del expediente existe",
    aprobado: fs.existsSync(rutaConstructor)
  },
  {
    id: "helper_existe",
    descripcion: "Helper Resumen Q-5 auditado existe",
    aprobado: fs.existsSync(rutaHelper)
  },
  {
    id: "comparador_existe",
    descripcion: "Comparador existe para control de no modificación en esta OT",
    aprobado: fs.existsSync(rutaComparador)
  },
  {
    id: "import_helper_unico",
    descripcion: "Import del helper Resumen Q-5 aparece una sola vez en el constructor",
    ocurrencias: contar(fuenteConstructor, importHelper),
    aprobado: contar(fuenteConstructor, importHelper) === 1
  },
  {
    id: "funcion_auxiliar_unica",
    descripcion: "Función auxiliar construirLineasResumenQ5AuditadoExpediente aparece una sola vez",
    ocurrencias: contar(
      fuenteConstructor,
      "export function construirLineasResumenQ5AuditadoExpediente"
    ),
    aprobado:
      contar(
        fuenteConstructor,
        "export function construirLineasResumenQ5AuditadoExpediente"
      ) === 1
  },
  {
    id: "funcion_auxiliar_delega_helper",
    descripcion: "Función auxiliar delega al helper Resumen Q-5 auditado",
    aprobado:
      fuenteConstructor.includes("return construirBloqueResumenQ5AuditadoExpediente({") &&
      fuenteConstructor.includes("metodosQ5: entrada?.metodosQ5 ?? entrada?.metodos") &&
      fuenteConstructor.includes("incluirTitulo: true")
  },
  {
    id: "salida_real_usa_funcion_auxiliar",
    descripcion: "Salida real del constructor usa la función auxiliar delegada",
    aprobado:
      fuenteConstructor.includes("...construirLineasResumenQ5AuditadoExpediente({") &&
      fuenteConstructor.includes("metodosQ5: metodos") &&
      fuenteConstructor.includes(
        'estadoResumenQ5AuditadoExpediente: "sección contractual inicial del helper puro"'
      )
  },
  {
    id: "bloque_inline_antiguo_ausente",
    descripcion: "Bloque inline antiguo de Resumen Q-5 ya no está presente",
    ocurrencias: contar(fuenteConstructor, bloqueInlineAntiguo),
    aprobado: contar(fuenteConstructor, bloqueInlineAntiguo) === 0
  },
  {
    id: "modulo_constructor_importa_sin_error_en_copia_temporal_esm",
    descripcion:
      "Constructor importa sin error en copia temporal de validación con imports relativos normalizados a .js; no modifica aplicación",
    directorioTemporal: dirTemporalImport,
    error: moduloConstructorError,
    aprobado: moduloConstructorOk
  },
  {
    id: "exporta_funcion_auxiliar",
    descripcion: "Constructor exporta función auxiliar Resumen Q-5 auditado",
    aprobado: typeof construirLineasResumenQ5AuditadoExpediente === "function"
  },
  {
    id: "funcion_auxiliar_devuelve_lineas_validas",
    descripcion: "Función auxiliar devuelve líneas válidas del bloque Resumen Q-5 auditado",
    salidaLineasResumen,
    aprobado:
      Array.isArray(salidaLineasResumen) &&
      contieneTodos(textoLineasResumen, [
        "## 6. Resumen Q-5 auditado",
        "Métodos recibidos: 3",
        "Estado: sección contractual inicial del helper puro"
      ])
  },
  {
    id: "salida_real_contiene_bloque_resumen_q5",
    descripcion: "Salida real/exportable contiene bloque Resumen Q-5 auditado",
    aprobado:
      typeof textoExpediente === "string" &&
      contieneTodos(textoExpediente, [
        "## 6. Resumen Q-5 auditado",
        "Métodos recibidos: 3",
        "Estado: sección contractual inicial del helper puro"
      ])
  },
  {
    id: "salida_real_resumen_q5_unico",
    descripcion: "Bloque Resumen Q-5 aparece una sola vez en salida real",
    ocurrencias: contar(textoExpediente, "## 6. Resumen Q-5 auditado"),
    aprobado: contar(textoExpediente, "## 6. Resumen Q-5 auditado") === 1
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    descripcion: "Salida real sin tokens inválidos",
    hallazgos: tokensEn(textoExpediente),
    aprobado: tokensEn(textoExpediente).length === 0
  },
  {
    id: "helper_conserva_exportaciones",
    descripcion: "Helper conserva exportaciones esperadas",
    aprobado:
      fuenteHelper.includes("export function construirBloqueResumenQ5AuditadoExpediente") &&
      fuenteHelper.includes("export function contarMetodosQ5Documentales") &&
      fuenteHelper.includes("export function formatearValorResumenQ5Documental") &&
      fuenteHelper.includes("export function normalizarEstadoResumenQ5AuditadoDocumental")
  },
  {
    id: "constructor_sin_modificacion_git_en_ot0312",
    descripcion: "Constructor no fue modificado en OT-0312",
    aprobado: gitDiffQuiet(
      "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
    )
  },
  {
    id: "helper_sin_modificacion_git_en_ot0312",
    descripcion: "Helper Resumen Q-5 auditado no fue modificado en OT-0312",
    aprobado: gitDiffQuiet(
      "01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js"
    )
  },
  {
    id: "comparador_sin_modificacion_git_en_ot0312",
    descripcion:
      "ComparadorMultiMetodo.jsx no fue modificado en OT-0312; puede contener acoples previos sin ser hallazgo de esta validación",
    aprobado: gitDiffQuiet(
      "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
    )
  },
  {
    id: "constructor_sin_recalculo_q5",
    descripcion: "Constructor no contiene patrones operativos de recálculo/adopción Q-5",
    hallazgos: patronesRecalculoQ5.filter((patron) =>
      fuenteConstructor.includes(patron)
    ),
    aprobado: patronesRecalculoQ5.every((patron) => !fuenteConstructor.includes(patron))
  },
  {
    id: "secciones_obligatorias_no_contaminadas",
    descripcion: "SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO permanece declarativa",
    aprobado:
      fuenteConstructor.includes('"## 6. Resumen Q-5 auditado"') &&
      !fuenteConstructor.includes("SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO = construir")
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0312",
  bloque: "Resumen Q-5 auditado",
  helper: "construirBloqueResumenQ5AuditadoExpediente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles
    .filter((control) => !control.aprobado)
    .map((control) => control.id),
  buildAprobado: buildOk,
  acopleResumenQ5Validado: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0312B — Validación acople helper bloque Resumen Q-5 auditado del expediente",
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

if (resumen.acopleResumenQ5Validado) {
  salidaMarkdown.push("- El helper `construirBloqueResumenQ5AuditadoExpediente` está acoplado al constructor mediante función auxiliar delegada.");
  salidaMarkdown.push("- El bloque inline antiguo `Resumen Q-5 auditado` fue sustituido.");
  salidaMarkdown.push("- La salida real/exportable conserva el bloque `## 6. Resumen Q-5 auditado`.");
  salidaMarkdown.push("- La salida real documenta la cantidad de métodos recibidos sin recalcular Q-5.");
  salidaMarkdown.push("- La validación runtime se realizó sobre copia temporal ESM con imports relativos normalizados a `.js`, sin modificar aplicación.");
  salidaMarkdown.push("- El build Vite fue aprobado.");
  salidaMarkdown.push("- No se modificó el constructor en esta OT.");
  salidaMarkdown.push("- No se modificó el helper en esta OT.");
  salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx` en esta OT.");
  salidaMarkdown.push("- No se modificó motor.");
  salidaMarkdown.push("- No se recalculó Q-5.");
  salidaMarkdown.push("- No se reinterpretaron resultados Q-5.");
} else {
  salidaMarkdown.push("- La validación detectó controles fallidos que deben corregirse antes de avanzar.");
  salidaMarkdown.push("- Los controles fallidos quedan listados en el resumen JSON.");
  salidaMarkdown.push("- No se aplicó corrección funcional en esta OT.");
}

salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleResumenQ5Validado
    ? "El acople del helper `construirBloqueResumenQ5AuditadoExpediente` queda validado estructural y funcionalmente en el alcance de OT-0312."
    : "El acople requiere corrección antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.acopleResumenQ5Validado
    ? "`OT-0313 — Revalidación salida real helper bloque Resumen Q-5 auditado del expediente`"
    : "`OT-0313 — Corrección acople helper bloque Resumen Q-5 auditado del expediente`"
);

const rutaSalida =
  "00_ADMIN/bitacora/OT-0312/OT-0312B_validacion_acople_helper_bloque_resumen_q5_auditado_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0312", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("VALIDACION_OT_0312_ACOPLE_RESUMEN_Q5_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
