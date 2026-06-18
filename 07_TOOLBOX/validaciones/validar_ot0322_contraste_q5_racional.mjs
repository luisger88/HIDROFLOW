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

const marcadorQ5 = "## 6. Resumen Q-5 auditado";
const marcadorRacional = "## 7. Método Racional — contraste global independiente";
const marcadorContraste = "## 8. Contraste Q-5 vs Método Racional";
const marcadorControlVolumen = "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5";

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
    path.join(os.tmpdir(), "hidroflow-ot0322-contraste-documentos-")
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
    fuente: "contexto de cuenca OT-0322"
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
  metodos: [
    { metodo: "SCS", qp: 184.03 },
    { metodo: "Snyder", qp: 124.65 },
    { metodo: "Clark IUH", qp: 94.28 },
    { metodo: "Williams & Hann", qp: 518.09 }
  ],
  fechaGeneracion: "OT-0322"
});

const texto = normalizarSalidaExpediente(salida);
const bloqueQ5 = extraerBloque(texto, marcadorQ5, marcadorRacional);
const bloqueRacional = extraerBloque(texto, marcadorRacional, marcadorContraste);
const bloqueContraste = extraerBloque(texto, marcadorContraste, marcadorControlVolumen);

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
    id: "bloque_contraste_presente",
    aprobado: texto.includes(marcadorContraste)
  },
  {
    id: "bloque_contraste_unico",
    ocurrencias: contar(texto, marcadorContraste),
    aprobado: contar(texto, marcadorContraste) === 1
  },
  {
    id: "bloque_contraste_extraible",
    bloqueContraste,
    aprobado: bloqueContraste.length > 0
  },
  {
    id: "bloque_contraste_despues_metodo_racional",
    indiceRacional: texto.indexOf(marcadorRacional),
    indiceContraste: texto.indexOf(marcadorContraste),
    aprobado:
      texto.indexOf(marcadorRacional) >= 0 &&
      texto.indexOf(marcadorContraste) > texto.indexOf(marcadorRacional)
  },
  {
    id: "bloque_contraste_antes_control_volumen",
    indiceContraste: texto.indexOf(marcadorContraste),
    indiceControlVolumen: texto.indexOf(marcadorControlVolumen),
    aprobado:
      texto.indexOf(marcadorContraste) >= 0 &&
      texto.indexOf(marcadorControlVolumen) > texto.indexOf(marcadorContraste)
  },
  {
    id: "contraste_declara_complementarios_no_equivalentes",
    bloqueContraste,
    aprobado:
      bloqueContraste.toLowerCase().includes("complementarios") &&
      bloqueContraste.toLowerCase().includes("no equivalentes")
  },
  {
    id: "contraste_no_incrusta_tabla_racional",
    bloqueContraste,
    aprobado:
      !bloqueContraste.includes("Tabla Método Racional") &&
      !bloqueContraste.includes("| Tr | I | P | C | Q |")
  },
  {
    id: "contraste_no_incrusta_resumen_q5",
    bloqueContraste,
    aprobado:
      !bloqueContraste.includes("## 6. Resumen Q-5 auditado") &&
      !bloqueContraste.includes("Tabla Q-5 auditada")
  },
  {
    id: "bloques_q5_racional_contraste_separados",
    aprobado:
      bloqueQ5.length > 0 &&
      bloqueRacional.length > 0 &&
      bloqueContraste.length > 0
  },
  {
    id: "bloque_contraste_sin_tokens_invalidos",
    hallazgos: tokensEn(bloqueContraste),
    aprobado: tokensEn(bloqueContraste).length === 0
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    hallazgos: tokensEn(texto),
    aprobado: tokensEn(texto).length === 0
  },
  {
    id: "constructor_sin_modificacion_en_ot0322",
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
  validacion: "OT-0322",
  bloque: "Contraste Q-5 vs Método Racional",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles
    .filter((control) => !control.aprobado)
    .map((control) => control.id),
  salidaRealContrasteQ5RacionalRevalidada: controles.every((control) => control.aprobado),
  buildAprobado: buildOk,
  recalculaQ5: false,
  recalculaMetodoRacional: false,
  seleccionaMetodoAdoptado: false,
  modificaMotor: false,
  modificaUI: false
};

const salidaMarkdown = [
  "# OT-0322B — Revalidación salida real Contraste Q-5 vs Método Racional",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque Contraste Q-5 vs Método Racional extraído de salida real",
  "",
  "```text",
  bloqueContraste,
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

if (resumen.salidaRealContrasteQ5RacionalRevalidada) {
  salidaMarkdown.push("- La salida real/exportable conserva el bloque `Contraste Q-5 vs Método Racional`.");
  salidaMarkdown.push("- El bloque se mantiene separado de `Resumen Q-5 auditado` y de `Método Racional`.");
  salidaMarkdown.push("- El bloque declara que Q-5 y Método Racional son complementarios, pero no equivalentes.");
  salidaMarkdown.push("- El bloque no incrusta tablas de Q-5 ni Método Racional.");
  salidaMarkdown.push("- No se recalcula Q-5.");
  salidaMarkdown.push("- No se recalcula Método Racional.");
  salidaMarkdown.push("- No se selecciona método adoptado.");
  salidaMarkdown.push("- No se modificó código funcional en OT-0322.");
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
  resumen.salidaRealContrasteQ5RacionalRevalidada
    ? "La salida real/exportable del bloque `Contraste Q-5 vs Método Racional` queda revalidada desde main en el alcance de OT-0322."
    : "La salida real/exportable del bloque `Contraste Q-5 vs Método Racional` requiere revisión antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealContrasteQ5RacionalRevalidada
    ? "`OT-0323 — Revalidación salida real Control de consistencia cruzada Pe–Área–Volumen/Q-5`"
    : "`OT-0323 — Corrección salida real Contraste Q-5 vs Método Racional`"
);

fs.mkdirSync("00_ADMIN/bitacora/OT-0322", { recursive: true });
fs.writeFileSync(
  "00_ADMIN/bitacora/OT-0322/OT-0322B_revalidacion_salida_real_contraste_q5_vs_metodo_racional.md",
  salidaMarkdown.join("\n"),
  "utf8"
);

console.log("VALIDACION_OT_0322_CONTRASTE_Q5_RACIONAL_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
