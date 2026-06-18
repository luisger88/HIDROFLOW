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

const rutaValidadorOt0312 = path.join(
  raiz,
  "07_TOOLBOX/validaciones/validar_ot0312_acople_resumen_q5.mjs"
);

const dirDocumentos = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos"
);

const marcadorBloqueResumenQ5 = "## 6. Resumen Q-5 auditado";
const marcadorBloqueSiguiente = "## 7. Método Racional — contraste global independiente";

const tokensInvalidos = ["undefined", "null", "NaN", "[object Object]"];

const patronesRecalculoQ5 = [
  "calcularQ5",
  "calcQ5",
  "calcularHidrograma",
  "metodoAdoptado",
  "caudalAdoptado",
  "seleccionarMetodo",
  "seleccionarCaudal"
];

const importHelper =
  'import { construirBloqueResumenQ5AuditadoExpediente } from "./construirBloqueResumenQ5AuditadoExpediente";';

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
    path.join(os.tmpdir(), "hidroflow-ot0313-documentos-")
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

function extraerBloque(texto, inicio, siguiente) {
  const i = texto.indexOf(inicio);
  if (i < 0) {
    return "";
  }

  const j = texto.indexOf(siguiente, i + inicio.length);
  if (j < 0) {
    return texto.slice(i).trim();
  }

  return texto.slice(i, j).trim();
}

function normalizarSalidaExpediente(salida) {
  if (typeof salida === "string") {
    return salida;
  }

  if (typeof salida?.texto === "string") {
    return salida.texto;
  }

  if (Array.isArray(salida?.lineas)) {
    return salida.lineas.join("\n");
  }

  return "";
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

const metodosQ5Prueba = [
  {
    metodo: "SCS",
    qp: 184.03,
    tp: 210,
    volumen: 2654250.9
  },
  {
    metodo: "Snyder",
    qp: 124.65,
    tp: 405,
    volumen: 2654250.9
  },
  {
    metodo: "Clark IUH",
    qp: 94.28,
    tp: 300,
    volumen: 2654250.9
  },
  {
    metodo: "Williams & Hann",
    qp: 518.09,
    tp: 20,
    volumen: 2654250.9
  }
];

const salidaExpediente =
  typeof construirExpedienteHidrologicoMinimo === "function"
    ? construirExpedienteHidrologicoMinimo({
        contextoBase: {
          area_km2: 46.8516,
          lluvia_efectiva_total_mm: 56.65
        },
        metodos: metodosQ5Prueba,
        fechaGeneracion: "OT-0313"
      })
    : null;

const textoExpediente = normalizarSalidaExpediente(salidaExpediente);
const bloqueResumenQ5 = extraerBloque(
  textoExpediente,
  marcadorBloqueResumenQ5,
  marcadorBloqueSiguiente
);

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

const controles = [
  {
    id: "constructor_existe",
    descripcion: "Constructor del expediente existe",
    aprobado: fs.existsSync(rutaConstructor)
  },
  {
    id: "helper_resumen_q5_existe",
    descripcion: "Helper Resumen Q-5 auditado existe",
    aprobado: fs.existsSync(rutaHelper)
  },
  {
    id: "validador_ot0312_existe",
    descripcion: "Validador OT-0312 existe como antecedente inmediato",
    aprobado: fs.existsSync(rutaValidadorOt0312)
  },
  {
    id: "constructor_importa_helper_una_vez",
    descripcion: "Constructor conserva import único del helper Resumen Q-5 auditado",
    ocurrencias: contar(fuenteConstructor, importHelper),
    aprobado: contar(fuenteConstructor, importHelper) === 1
  },
  {
    id: "constructor_exporta_funcion_delegada_una_vez",
    descripcion: "Constructor conserva función delegada única para Resumen Q-5 auditado",
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
    id: "constructor_importa_en_copia_temporal_esm",
    descripcion:
      "Constructor importa correctamente en copia temporal ESM con imports relativos normalizados a .js",
    directorioTemporal: dirTemporalImport,
    error: moduloConstructorError,
    aprobado: moduloConstructorOk
  },
  {
    id: "constructor_default_disponible",
    descripcion: "Constructor principal del expediente está disponible",
    aprobado: typeof construirExpedienteHidrologicoMinimo === "function"
  },
  {
    id: "salida_real_generada",
    descripcion: "La salida real/exportable del expediente fue generada como texto",
    longitudTexto: textoExpediente.length,
    aprobado: typeof textoExpediente === "string" && textoExpediente.length > 0
  },
  {
    id: "salida_real_contiene_bloque_resumen_q5",
    descripcion: "La salida real contiene el bloque Resumen Q-5 auditado",
    aprobado: textoExpediente.includes(marcadorBloqueResumenQ5)
  },
  {
    id: "salida_real_resumen_q5_unico",
    descripcion: "El bloque Resumen Q-5 auditado aparece una sola vez en la salida real",
    ocurrencias: contar(textoExpediente, marcadorBloqueResumenQ5),
    aprobado: contar(textoExpediente, marcadorBloqueResumenQ5) === 1
  },
  {
    id: "bloque_resumen_q5_extraible",
    descripcion: "El bloque Resumen Q-5 auditado puede extraerse entre sección 6 y sección 7",
    bloqueResumenQ5,
    aprobado: bloqueResumenQ5.length > 0
  },
  {
    id: "bloque_resumen_q5_contenido_documental_esperado",
    descripcion: "El bloque Resumen Q-5 auditado contiene contenido documental esperado",
    aprobado: contieneTodos(bloqueResumenQ5, [
      marcadorBloqueResumenQ5,
      "Métodos recibidos: 4",
      "Estado: sección contractual inicial del helper puro"
    ])
  },
  {
    id: "bloque_resumen_q5_sin_duplicidad_interna",
    descripcion: "El bloque Resumen Q-5 auditado no duplica encabezado ni contador documental",
    ocurrenciasTitulo: contar(bloqueResumenQ5, marcadorBloqueResumenQ5),
    ocurrenciasMetodosRecibidos: contar(bloqueResumenQ5, "Métodos recibidos:"),
    aprobado:
      contar(bloqueResumenQ5, marcadorBloqueResumenQ5) === 1 &&
      contar(bloqueResumenQ5, "Métodos recibidos:") === 1
  },
  {
    id: "bloque_resumen_q5_antes_de_metodo_racional",
    descripcion: "El bloque Resumen Q-5 auditado se ubica antes del bloque Método Racional",
    indiceResumenQ5: textoExpediente.indexOf(marcadorBloqueResumenQ5),
    indiceMetodoRacional: textoExpediente.indexOf(marcadorBloqueSiguiente),
    aprobado:
      textoExpediente.indexOf(marcadorBloqueResumenQ5) >= 0 &&
      textoExpediente.indexOf(marcadorBloqueSiguiente) > textoExpediente.indexOf(marcadorBloqueResumenQ5)
  },
  {
    id: "bloque_resumen_q5_sin_tokens_invalidos",
    descripcion: "El bloque Resumen Q-5 auditado no contiene tokens inválidos",
    hallazgos: tokensEn(bloqueResumenQ5),
    aprobado: tokensEn(bloqueResumenQ5).length === 0
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    descripcion: "La salida real/exportable completa no contiene tokens inválidos",
    hallazgos: tokensEn(textoExpediente),
    aprobado: tokensEn(textoExpediente).length === 0
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
    id: "helper_conserva_exportaciones",
    descripcion: "Helper Resumen Q-5 auditado conserva exportaciones esperadas",
    aprobado:
      fuenteHelper.includes("export function construirBloqueResumenQ5AuditadoExpediente") &&
      fuenteHelper.includes("export function contarMetodosQ5Documentales") &&
      fuenteHelper.includes("export function formatearValorResumenQ5Documental") &&
      fuenteHelper.includes("export function normalizarEstadoResumenQ5AuditadoDocumental")
  },
  {
    id: "constructor_sin_modificacion_git_en_ot0313",
    descripcion: "Constructor no fue modificado en OT-0313",
    aprobado: gitDiffQuiet(
      "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
    )
  },
  {
    id: "helper_sin_modificacion_git_en_ot0313",
    descripcion: "Helper Resumen Q-5 auditado no fue modificado en OT-0313",
    aprobado: gitDiffQuiet(
      "01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js"
    )
  },
  {
    id: "comparador_sin_modificacion_git_en_ot0313",
    descripcion: "ComparadorMultiMetodo.jsx no fue modificado en OT-0313",
    aprobado: gitDiffQuiet(
      "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
    )
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0313",
  bloque: "Resumen Q-5 auditado",
  foco: "salida real/exportable del expediente hidrológico mínimo",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles
    .filter((control) => !control.aprobado)
    .map((control) => control.id),
  buildAprobado: buildOk,
  salidaRealResumenQ5Revalidada: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false,
  recalculaQ5: false,
  reinterpretaResultadosQ5: false
};

const salidaMarkdown = [
  "# OT-0313B — Revalidación salida real helper bloque Resumen Q-5 auditado del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque Resumen Q-5 auditado extraído de salida real",
  "",
  "```text",
  bloqueResumenQ5,
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

if (resumen.salidaRealResumenQ5Revalidada) {
  salidaMarkdown.push("- La salida real/exportable del expediente hidrológico mínimo conserva el bloque `## 6. Resumen Q-5 auditado`.");
  salidaMarkdown.push("- El bloque aparece una sola vez.");
  salidaMarkdown.push("- El bloque queda ubicado antes de `## 7. Método Racional — contraste global independiente`.");
  salidaMarkdown.push("- El bloque documenta la cantidad de métodos recibidos sin recalcular Q-5.");
  salidaMarkdown.push("- El bloque conserva el estado documental esperado.");
  salidaMarkdown.push("- La salida real no presenta tokens inválidos.");
  salidaMarkdown.push("- La revalidación runtime se realizó sobre copia temporal ESM con imports relativos normalizados a `.js`, sin modificar aplicación.");
  salidaMarkdown.push("- El build Vite fue aprobado.");
  salidaMarkdown.push("- No se modificó el constructor en esta OT.");
  salidaMarkdown.push("- No se modificó el helper en esta OT.");
  salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx` en esta OT.");
  salidaMarkdown.push("- No se modificó motor.");
  salidaMarkdown.push("- No se recalculó Q-5.");
  salidaMarkdown.push("- No se reinterpretaron resultados Q-5.");
} else {
  salidaMarkdown.push("- La revalidación detectó controles fallidos que deben corregirse antes de avanzar.");
  salidaMarkdown.push("- Los controles fallidos quedan listados en el resumen JSON.");
  salidaMarkdown.push("- No se aplicó corrección funcional en esta OT.");
}

salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealResumenQ5Revalidada
    ? "La salida real/exportable del expediente hidrológico mínimo queda revalidada para el bloque `Resumen Q-5 auditado` en el alcance de OT-0313."
    : "La salida real/exportable requiere corrección antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealResumenQ5Revalidada
    ? "`OT-0314 — Decisión siguiente bloque delegable del expediente hidrológico mínimo`"
    : "`OT-0314 — Corrección salida real bloque Resumen Q-5 auditado del expediente`"
);

const rutaSalida =
  "00_ADMIN/bitacora/OT-0313/OT-0313B_revalidacion_salida_real_helper_bloque_resumen_q5_auditado_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0313", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("REVALIDACION_OT_0313_SALIDA_REAL_RESUMEN_Q5_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
