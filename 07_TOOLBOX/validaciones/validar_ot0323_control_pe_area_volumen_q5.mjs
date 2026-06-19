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

const marcadorContraste = "## 8. Contraste Q-5 vs Método Racional";
const marcadorControlVolumen = "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5";
const marcadorDiagnosticoTemporal = "## Diagnóstico temporal Q(t) no adoptivo";

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
    path.join(os.tmpdir(), "hidroflow-ot0323-control-volumen-documentos-")
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
  q_tr_activo_estado: {
    estado: "activo",
    fuente: "contexto de cuenca OT-0323"
  },
  q_tr_activo: {
    tr_activo: 100,
    etiqueta: "Tr 100 años"
  },
  metodo_racional: {
    resultados: [
      {
        Tr: 100,
        I: 88.12,
        P: 74.35,
        C: 0.62,
        Q: 711.42
      }
    ]
  }
};

const salida = construirExpedienteHidrologicoMinimo({
  contextoBase: contextoBasePrueba,
  peTotalMm: 56.65,
  volumenEsperadoM3: 2654250.9,
  metodos: [
    {
      metodo: "SCS Unit Hydrograph",
      nombre: "SCS Unit Hydrograph",
      Qp: 184.03,
      Tp: 210,
      volumen: 2654250.9
    },
    {
      metodo: "Snyder",
      nombre: "Snyder",
      Qp: 124.65,
      Tp: 405,
      volumen: 2654250.9
    },
    {
      metodo: "Clark IUH",
      nombre: "Clark IUH",
      Qp: 94.28,
      Tp: 300,
      volumen: 2654250.9
    },
    {
      metodo: "Williams & Hann",
      nombre: "Williams & Hann",
      Qp: 518.09,
      Tp: 20,
      volumen: 2654250.9
    }
  ],
  fechaGeneracion: "OT-0323"
});

const texto = normalizarSalidaExpediente(salida);
const bloqueContraste = extraerBloque(texto, marcadorContraste, marcadorControlVolumen);
const bloqueControl = extraerBloque(texto, marcadorControlVolumen, marcadorDiagnosticoTemporal);

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
    id: "constructor_existe",
    aprobado: fs.existsSync(rutaConstructor)
  },
  {
    id: "bloque_control_presente",
    aprobado: texto.includes(marcadorControlVolumen)
  },
  {
    id: "bloque_control_unico",
    ocurrencias: contar(texto, marcadorControlVolumen),
    aprobado: contar(texto, marcadorControlVolumen) === 1
  },
  {
    id: "bloque_control_extraible",
    bloqueControl,
    aprobado: bloqueControl.length > 0
  },
  {
    id: "bloque_control_despues_contraste_q5_racional",
    indiceContraste: texto.indexOf(marcadorContraste),
    indiceControl: texto.indexOf(marcadorControlVolumen),
    aprobado:
      texto.indexOf(marcadorContraste) >= 0 &&
      texto.indexOf(marcadorControlVolumen) > texto.indexOf(marcadorContraste)
  },
  {
    id: "bloque_control_antes_diagnostico_temporal",
    indiceControl: texto.indexOf(marcadorControlVolumen),
    indiceDiagnostico: texto.indexOf(marcadorDiagnosticoTemporal),
    aprobado:
      texto.indexOf(marcadorControlVolumen) >= 0 &&
      texto.indexOf(marcadorDiagnosticoTemporal) > texto.indexOf(marcadorControlVolumen)
  },
  {
    id: "bloque_control_expone_lectura_control_interno",
    bloqueControl,
    aprobado:
      bloqueControl.toLowerCase().includes("control") &&
      (
        bloqueControl.toLowerCase().includes("preliminar") ||
        bloqueControl.toLowerCase().includes("consistencia") ||
        bloqueControl.toLowerCase().includes("pendiente")
      )
  },
  {
    id: "bloque_control_expone_pe_area_volumen",
    descripcion:
      "El bloque debe exponer explícitamente Pe, Área y Volumen esperado si esos datos están disponibles.",
    bloqueControl,
    aprobado:
      bloqueControl.includes("Pe") &&
      bloqueControl.includes("Área") &&
      bloqueControl.includes("Volumen esperado")
  },
  {
    id: "bloque_control_expone_q5_principal",
    descripcion:
      "El bloque debe exponer Método Q-5 principal, Volumen Q-5 principal y relación Q-5/esperado si esos datos están disponibles.",
    bloqueControl,
    aprobado:
      bloqueControl.includes("Método Q-5 principal") &&
      bloqueControl.includes("Volumen Q-5 principal") &&
      (
        bloqueControl.includes("Relación volumen Q-5 / volumen esperado") ||
        bloqueControl.includes("Relación Q-5/esperado")
      )
  },
  {
    id: "bloque_control_expone_qtr_activo",
    descripcion:
      "El bloque debe conservar referencia al Q-Tr activo como parte del control cruzado.",
    bloqueControl,
    aprobado:
      bloqueControl.includes("Q-Tr activo") ||
      bloqueControl.includes("QTr activo")
  },
  {
    id: "bloque_control_no_incrusta_contraste",
    bloqueControl,
    aprobado:
      !bloqueControl.includes("## 8. Contraste Q-5 vs Método Racional")
  },
  {
    id: "bloque_control_sin_tokens_invalidos",
    hallazgos: tokensEn(bloqueControl),
    aprobado: tokensEn(bloqueControl).length === 0
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    hallazgos: tokensEn(texto),
    aprobado: tokensEn(texto).length === 0
  },
  {
    id: "constructor_sin_modificacion_en_ot0323",
    aprobado: gitDiffQuiet("01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js")
  },
  {
    id: "comparador_sin_modificacion",
    aprobado: gitDiffQuiet("01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx")
  },
  {
    id: "qtr_sin_modificacion",
    aprobado: gitDiffQuiet("01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js")
  },
  {
    id: "q5_sin_modificacion",
    aprobado: gitDiffQuiet("01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js")
  },
  {
    id: "build_vite",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0323",
  bloque: "Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles
    .filter((control) => !control.aprobado)
    .map((control) => control.id),
  salidaRealControlPeAreaVolumenQ5Revalidada: controles.every((control) => control.aprobado),
  buildAprobado: buildOk,
  recalculaVolumen: false,
  recalculaQ5: false,
  seleccionaMetodoAdoptado: false,
  modificaMotor: false,
  modificaUI: false
};

const salidaMarkdown = [
  "# OT-0323B — Revalidación salida real Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque Control Pe–Área–Volumen/Q-5 extraído de salida real",
  "",
  "```text",
  bloqueControl,
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

if (resumen.salidaRealControlPeAreaVolumenQ5Revalidada) {
  salidaMarkdown.push("- La salida real/exportable conserva el bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5`.");
  salidaMarkdown.push("- El bloque expone Pe, Área, Volumen esperado, Método Q-5 principal, Volumen Q-5 principal, relación Q-5/esperado y Q-Tr activo.");
  salidaMarkdown.push("- El bloque mantiene lectura de control interno preliminar.");
  salidaMarkdown.push("- No se recalcula volumen.");
  salidaMarkdown.push("- No se recalcula Q-5.");
  salidaMarkdown.push("- No se selecciona método adoptado.");
  salidaMarkdown.push("- No se modificó código funcional en OT-0323.");
  salidaMarkdown.push("- Build Vite aprobado.");
} else {
  salidaMarkdown.push("- La revalidación detectó controles fallidos que deben revisarse antes de avanzar.");
  salidaMarkdown.push("- Los controles fallidos quedan listados en el resumen JSON.");
  salidaMarkdown.push("- No se aplicó corrección funcional en esta OT.");
}

salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealControlPeAreaVolumenQ5Revalidada
    ? "La salida real/exportable del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5` queda revalidada desde main en el alcance de OT-0323."
    : "La salida real/exportable del bloque `Control de consistencia cruzada Pe–Área–Volumen/Q-5` requiere revisión antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealControlPeAreaVolumenQ5Revalidada
    ? "`OT-0324 — Revalidación salida real Diagnóstico temporal Q(t) no adoptivo`"
    : "`OT-0324 — Corrección salida real Control Pe–Área–Volumen/Q-5`"
);

fs.mkdirSync("00_ADMIN/bitacora/OT-0323", { recursive: true });
fs.writeFileSync(
  "00_ADMIN/bitacora/OT-0323/OT-0323B_revalidacion_salida_real_control_pe_area_volumen_q5.md",
  salidaMarkdown.join("\n"),
  "utf8"
);

console.log("VALIDACION_OT_0323_CONTROL_PE_AREA_VOLUMEN_Q5_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
