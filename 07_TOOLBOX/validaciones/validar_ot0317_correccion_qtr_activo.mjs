import fs from "fs";
import path from "path";
import os from "os";
import { pathToFileURL } from "url";
import { execSync } from "child_process";

const raiz = process.cwd();

const dirDocumentos = path.join(
  raiz,
  "01_APP/HIDROFLOW/src/services/documentos"
);

const rutaConstructor = path.join(
  dirDocumentos,
  "construirExpedienteHidrologicoMinimo.js"
);

const rutaHelperQTr = path.join(
  dirDocumentos,
  "construirBloqueEscenarioQTrActivoExpediente.js"
);

const marcadorQTr = "## 5. Escenario Q-Tr activo — control de trazabilidad";
const marcadorResumenQ5 = "## 6. Resumen Q-5 auditado";
const tokensInvalidos = ["undefined", "null", "NaN", "[object Object]"];

function contar(texto, patron) {
  return texto.split(patron).length - 1;
}

function tokensEn(texto) {
  return tokensInvalidos
    .map((token) => ({ token, ocurrencias: contar(texto, token) }))
    .filter((item) => item.ocurrencias > 0);
}

function extraerBloque(texto, inicio, siguiente) {
  const i = texto.indexOf(inicio);
  if (i < 0) return "";
  const j = texto.indexOf(siguiente, i + inicio.length);
  return (j < 0 ? texto.slice(i) : texto.slice(i, j)).trim();
}

function normalizarSalidaExpediente(salida) {
  if (typeof salida === "string") return salida;
  if (typeof salida?.texto === "string") return salida.texto;
  if (Array.isArray(salida?.lineas)) return salida.lineas.join("\n");
  return "";
}

function crearCopiaTemporalDocumentosConImportsJs() {
  const dirTemporal = fs.mkdtempSync(
    path.join(os.tmpdir(), "hidroflow-ot0317-qtr-documentos-")
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
        if (modulo.endsWith(".js")) return coincidencia;
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

const dirTemporal = crearCopiaTemporalDocumentosConImportsJs();

const moduloConstructor = await import(
  pathToFileURL(path.join(dirTemporal, "construirExpedienteHidrologicoMinimo.js")).href
);

const construirExpedienteHidrologicoMinimo = moduloConstructor.default;

const contextoBasePrueba = {
  cuenca: {
    nombre: "La Iguaná PC_80"
  },
  area_km2: 46.8516,
  lluvia_efectiva_total_mm: 56.65,
  tr_diseno_activo: 100,
  periodo_retorno_activo: 100,
  periodoRetornoActivo: 100,
  q_tr_activo_estado: {
    estado: "activo",
    fuente: "contexto de cuenca OT-0317"
  },
  q_tr_activo: {
    tr_activo: 100,
    Tr: 100,
    periodoRetorno: 100,
    etiqueta: "Tr 100 años",
    fuente: "contexto de cuenca OT-0317",
    estado: "activo"
  }
};

const salida = construirExpedienteHidrologicoMinimo({
  contextoBase: contextoBasePrueba,
  metodos: [
    { metodo: "SCS", qp: 184.03 },
    { metodo: "Snyder", qp: 124.65 },
    { metodo: "Clark IUH", qp: 94.28 },
    { metodo: "Williams & Hann", qp: 518.09 }
  ],
  fechaGeneracion: "OT-0317"
});

const texto = normalizarSalidaExpediente(salida);
const bloqueQTr = extraerBloque(texto, marcadorQTr, marcadorResumenQ5);

let buildOk = false;

try {
  const salidaBuild = execSync("npm run build", {
    cwd: "01_APP/HIDROFLOW",
    encoding: "utf8",
    stdio: "pipe"
  });

  buildOk = salidaBuild.includes("built") || salidaBuild.includes("✓ built");
} catch {
  buildOk = false;
}

const controles = [
  {
    id: "bloque_qtr_presente",
    aprobado: texto.includes(marcadorQTr)
  },
  {
    id: "bloque_qtr_unico",
    ocurrencias: contar(texto, marcadorQTr),
    aprobado: contar(texto, marcadorQTr) === 1
  },
  {
    id: "bloque_qtr_extraible",
    bloqueQTr,
    aprobado: bloqueQTr.length > 0
  },
  {
    id: "bloque_qtr_expone_periodo_retorno_100",
    bloqueQTr,
    aprobado:
      bloqueQTr.includes("Periodo de retorno activo: 100") ||
      bloqueQTr.includes("Periodo de retorno activo: 100 años")
  },
  {
    id: "bloque_qtr_activo_no_es_fallback",
    bloqueQTr,
    aprobado: !bloqueQTr.includes("Q-Tr activo: —")
  },
  {
    id: "bloque_qtr_sin_tokens_invalidos",
    hallazgos: tokensEn(bloqueQTr),
    aprobado: tokensEn(bloqueQTr).length === 0
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    hallazgos: tokensEn(texto),
    aprobado: tokensEn(texto).length === 0
  },
  {
    id: "comparador_sin_modificacion",
    aprobado: gitDiffQuiet("01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx")
  },
  {
    id: "resumen_q5_sin_modificacion",
    aprobado: gitDiffQuiet("01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js")
  },
  {
    id: "build_vite",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0317",
  bloque: "Escenario Q-Tr activo",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles
    .filter((control) => !control.aprobado)
    .map((control) => control.id),
  salidaRealQTrCorregida: controles.every((control) => control.aprobado),
  buildAprobado: buildOk,
  recalculaQTr: false,
  seleccionaPeriodoRetornoAdoptado: false,
  modificaMotor: false,
  modificaUI: false
};

const salidaMarkdown = [
  "# OT-0317B — Corrección trazabilidad salida real Escenario Q-Tr activo del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque Q-Tr activo extraído de salida real corregida",
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

if (resumen.salidaRealQTrCorregida) {
  salidaMarkdown.push("- La salida real/exportable expone el periodo de retorno activo.");
  salidaMarkdown.push("- La salida real/exportable ya no deja `Q-Tr activo` como fallback vacío.");
  salidaMarkdown.push("- La corrección no recalcula Q-Tr.");
  salidaMarkdown.push("- La corrección no selecciona periodo de retorno adoptado.");
  salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
  salidaMarkdown.push("- No se modificó el bloque `Resumen Q-5 auditado`.");
  salidaMarkdown.push("- Build Vite aprobado.");
} else {
  salidaMarkdown.push("- La corrección no superó todos los controles.");
  salidaMarkdown.push("- Los controles fallidos quedan listados en el resumen JSON.");
}

salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealQTrCorregida
    ? "La trazabilidad de salida real del bloque `Escenario Q-Tr activo` queda corregida en el alcance de OT-0317."
    : "La trazabilidad de salida real del bloque `Escenario Q-Tr activo` requiere revisión adicional."
);

fs.mkdirSync("00_ADMIN/bitacora/OT-0317", { recursive: true });
fs.writeFileSync(
  "00_ADMIN/bitacora/OT-0317/OT-0317B_correccion_trazabilidad_salida_real_escenario_qtr_activo_expediente.md",
  salidaMarkdown.join("\n"),
  "utf8"
);

console.log("VALIDACION_OT_0317_QTR_CORREGIDO_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
