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

const rutaHelperQTr = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js"
);

const rutaComparador = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const dirDocumentos = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos"
);

const marcadorQTr = "## 5. Escenario Q-Tr activo — control de trazabilidad";
const marcadorResumenQ5 = "## 6. Resumen Q-5 auditado";

const tokensInvalidos = ["undefined", "null", "NaN", "[object Object]"];

const importHelperQTr =
  'import { construirBloqueEscenarioQTrActivoExpediente } from "./construirBloqueEscenarioQTrActivoExpediente";';

function leer(ruta) {
  return fs.existsSync(ruta) ? fs.readFileSync(ruta, "utf8") : "";
}

function contar(texto, patron) {
  return texto.split(patron).length - 1;
}

function tokensEn(texto) {
  return tokensInvalidos
    .map((token) => ({ token, ocurrencias: contar(texto, token) }))
    .filter((item) => item.ocurrencias > 0);
}

function contieneAlguno(texto, patrones) {
  return patrones.some((patron) => texto.includes(patron));
}

function contieneTodos(texto, patrones) {
  return patrones.every((patron) => texto.includes(patron));
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
    path.join(os.tmpdir(), "hidroflow-ot0316-qtr-documentos-")
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

const fuenteConstructor = leer(rutaConstructor);
const fuenteHelperQTr = leer(rutaHelperQTr);
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

const contextoBasePrueba = {
  cuenca: {
    nombre: "La Iguaná PC_80"
  },
  area_km2: 46.8516,
  lluvia_efectiva_total_mm: 56.65,

  // Claves redundantes intencionales para verificar que el constructor/helper
  // puedan leer trazabilidad Q-Tr desde contexto de cuenca sin recalcular.
  tr_diseno_activo: 100,
  periodo_retorno_activo: 100,
  periodoRetornoActivo: 100,

  q_tr_activo_estado: {
    estado: "activo",
    fuente: "contexto de cuenca OT-0316"
  },

  q_tr_activo: {
    Tr: 100,
    periodoRetorno: 100,
    etiqueta: "Tr 100 años",
    fuente: "contexto de cuenca OT-0316",
    estado: "activo"
  }
};

const salidaExpediente =
  typeof construirExpedienteHidrologicoMinimo === "function"
    ? construirExpedienteHidrologicoMinimo({
        contextoBase: contextoBasePrueba,
        metodos: [
          { metodo: "SCS", qp: 184.03 },
          { metodo: "Snyder", qp: 124.65 },
          { metodo: "Clark IUH", qp: 94.28 },
          { metodo: "Williams & Hann", qp: 518.09 }
        ],
        fechaGeneracion: "OT-0316"
      })
    : null;

const textoExpediente = normalizarSalidaExpediente(salidaExpediente);
const bloqueQTr = extraerBloque(textoExpediente, marcadorQTr, marcadorResumenQ5);

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
    id: "helper_qtr_existe",
    descripcion: "Helper Escenario Q-Tr activo existe",
    aprobado: fs.existsSync(rutaHelperQTr)
  },
  {
    id: "constructor_importa_helper_qtr",
    descripcion: "Constructor importa el helper Escenario Q-Tr activo",
    ocurrencias: contar(fuenteConstructor, importHelperQTr),
    aprobado: contar(fuenteConstructor, importHelperQTr) === 1
  },
  {
    id: "constructor_usa_lineas_qtr",
    descripcion: "Constructor usa construirLineasEscenarioQTrActivoExpediente en la salida real",
    aprobado:
      fuenteConstructor.includes("...construirLineasEscenarioQTrActivoExpediente({") &&
      fuenteConstructor.includes("qTrActivoExpediente") &&
      fuenteConstructor.includes("trDisenoActivoExpediente")
  },
  {
    id: "constructor_importa_en_copia_temporal_esm",
    descripcion: "Constructor importa correctamente en copia temporal ESM con imports relativos normalizados a .js",
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
    id: "salida_real_contiene_bloque_qtr",
    descripcion: "La salida real contiene el bloque Escenario Q-Tr activo",
    aprobado: textoExpediente.includes(marcadorQTr)
  },
  {
    id: "salida_real_qtr_unico",
    descripcion: "El bloque Escenario Q-Tr activo aparece una sola vez",
    ocurrencias: contar(textoExpediente, marcadorQTr),
    aprobado: contar(textoExpediente, marcadorQTr) === 1
  },
  {
    id: "bloque_qtr_extraible",
    descripcion: "El bloque Q-Tr puede extraerse entre sección 5 y sección 6",
    bloqueQTr,
    aprobado: bloqueQTr.length > 0
  },
  {
    id: "bloque_qtr_antes_resumen_q5",
    descripcion: "El bloque Q-Tr activo queda antes del bloque Resumen Q-5 auditado",
    indiceQTr: textoExpediente.indexOf(marcadorQTr),
    indiceResumenQ5: textoExpediente.indexOf(marcadorResumenQ5),
    aprobado:
      textoExpediente.indexOf(marcadorQTr) >= 0 &&
      textoExpediente.indexOf(marcadorResumenQ5) > textoExpediente.indexOf(marcadorQTr)
  },
  {
    id: "bloque_qtr_contiene_estado_o_trazabilidad",
    descripcion: "El bloque Q-Tr contiene señales documentales de estado o trazabilidad",
    aprobado: contieneAlguno(bloqueQTr.toLowerCase(), [
      "estado",
      "activo",
      "trazabilidad",
      "q-tr"
    ])
  },
  {
    id: "bloque_qtr_contiene_periodo_retorno_prueba",
    descripcion: "El bloque Q-Tr debe reflejar explícitamente el valor de periodo de retorno de prueba cuando el contexto lo expone",
    valorEsperado: "100",
    bloqueQTr,
    aprobado: contieneAlguno(bloqueQTr, [
      "100",
      "Tr 100",
      "100 años"
    ])
  },
  {
    id: "bloque_qtr_sin_tokens_invalidos",
    descripcion: "El bloque Q-Tr no contiene tokens inválidos",
    hallazgos: tokensEn(bloqueQTr),
    aprobado: tokensEn(bloqueQTr).length === 0
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    descripcion: "La salida real completa no contiene tokens inválidos",
    hallazgos: tokensEn(textoExpediente),
    aprobado: tokensEn(textoExpediente).length === 0
  },
  {
    id: "helper_qtr_conserva_exportacion",
    descripcion: "Helper Q-Tr conserva exportación esperada",
    aprobado: fuenteHelperQTr.includes("export function construirBloqueEscenarioQTrActivoExpediente")
  },
  {
    id: "constructor_sin_modificacion_git_en_ot0316",
    descripcion: "Constructor no fue modificado en OT-0316",
    aprobado: gitDiffQuiet(
      "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
    )
  },
  {
    id: "helper_qtr_sin_modificacion_git_en_ot0316",
    descripcion: "Helper Q-Tr no fue modificado en OT-0316",
    aprobado: gitDiffQuiet(
      "01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js"
    )
  },
  {
    id: "comparador_sin_modificacion_git_en_ot0316",
    descripcion: "ComparadorMultiMetodo.jsx no fue modificado en OT-0316",
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
  validacion: "OT-0316",
  bloque: "Escenario Q-Tr activo",
  foco: "salida real/exportable del expediente hidrológico mínimo",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles
    .filter((control) => !control.aprobado)
    .map((control) => control.id),
  buildAprobado: buildOk,
  salidaRealQTrRevalidada: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  recalculaQTr: false,
  seleccionaPeriodoRetornoAdoptado: false
};

const salidaMarkdown = [
  "# OT-0316B — Revalidación salida real Escenario Q-Tr activo del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque Escenario Q-Tr activo extraído de salida real",
  "",
  "```text",
  bloqueQTr,
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

if (resumen.salidaRealQTrRevalidada) {
  salidaMarkdown.push("- La salida real/exportable conserva el bloque `## 5. Escenario Q-Tr activo — control de trazabilidad`.");
  salidaMarkdown.push("- El bloque aparece una sola vez.");
  salidaMarkdown.push("- El bloque queda antes del bloque `## 6. Resumen Q-5 auditado`.");
  salidaMarkdown.push("- El bloque contiene señales documentales de estado o trazabilidad Q-Tr.");
  salidaMarkdown.push("- La salida no contiene tokens inválidos.");
  salidaMarkdown.push("- La revalidación no recalcula Q-Tr.");
  salidaMarkdown.push("- La revalidación no selecciona periodo de retorno adoptado.");
  salidaMarkdown.push("- No se modificó constructor, helper Q-Tr ni comparador.");
  salidaMarkdown.push("- El build Vite fue aprobado.");
} else {
  salidaMarkdown.push("- La revalidación detectó controles fallidos que deben corregirse antes de avanzar.");
  salidaMarkdown.push("- Los controles fallidos quedan listados en el resumen JSON.");
  salidaMarkdown.push("- No se aplicó corrección funcional en esta OT.");
}

salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealQTrRevalidada
    ? "La salida real/exportable del expediente queda revalidada para el bloque `Escenario Q-Tr activo` en el alcance de OT-0316."
    : "La salida real/exportable requiere revisión antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealQTrRevalidada
    ? "`OT-0317 — Revalidación salida real Método Racional como contraste global independiente`"
    : "`OT-0317 — Corrección trazabilidad salida real Escenario Q-Tr activo del expediente`"
);

const rutaSalida =
  "00_ADMIN/bitacora/OT-0316/OT-0316B_revalidacion_salida_real_escenario_qtr_activo_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0316", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("REVALIDACION_OT_0316_SALIDA_REAL_QTR_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));

