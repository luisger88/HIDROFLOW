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

const marcadorRacional = "## 7. Método Racional — contraste global independiente";
const marcadorContraste = "## 8. Contraste Q-5 vs Método Racional";
const marcadorQ5 = "## 6. Resumen Q-5 auditado";

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
    path.join(os.tmpdir(), "hidroflow-ot0321-racional-documentos-")
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
    fuente: "contexto de cuenca OT-0321"
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
  fechaGeneracion: "OT-0321"
});

const texto = normalizarSalidaExpediente(salida);
const bloqueRacional = extraerBloque(texto, marcadorRacional, marcadorContraste);
const bloqueQ5 = extraerBloque(texto, marcadorQ5, marcadorRacional);

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
    id: "bloque_racional_presente",
    aprobado: texto.includes(marcadorRacional)
  },
  {
    id: "bloque_racional_unico",
    ocurrencias: contar(texto, marcadorRacional),
    aprobado: contar(texto, marcadorRacional) === 1
  },
  {
    id: "bloque_racional_extraible",
    bloqueRacional,
    aprobado: bloqueRacional.length > 0
  },
  {
    id: "bloque_racional_despues_q5",
    indiceQ5: texto.indexOf(marcadorQ5),
    indiceRacional: texto.indexOf(marcadorRacional),
    aprobado:
      texto.indexOf(marcadorQ5) >= 0 &&
      texto.indexOf(marcadorRacional) > texto.indexOf(marcadorQ5)
  },
  {
    id: "bloque_racional_antes_contraste",
    indiceRacional: texto.indexOf(marcadorRacional),
    indiceContraste: texto.indexOf(marcadorContraste),
    aprobado:
      texto.indexOf(marcadorRacional) >= 0 &&
      texto.indexOf(marcadorContraste) > texto.indexOf(marcadorRacional)
  },
  {
    id: "bloque_racional_separado_de_q5",
    bloqueQ5,
    aprobado:
      bloqueQ5.length > 0 &&
      !bloqueQ5.includes("Método Racional — contraste global independiente") &&
      !bloqueQ5.includes("Tabla Método Racional")
  },
  {
    id: "bloque_racional_declara_contraste_independiente",
    bloqueRacional,
    aprobado:
      bloqueRacional.includes("contraste global independiente") ||
      bloqueRacional.includes("Contraste global independiente")
  },
  {
    id: "bloque_racional_no_adoptivo",
    bloqueRacional,
    aprobado:
      bloqueRacional.toLowerCase().includes("no adopt") ||
      bloqueRacional.toLowerCase().includes("no pertenece") ||
      bloqueRacional.toLowerCase().includes("sin revisión")
  },
  {
    id: "bloque_racional_expone_tabla_si_hay_resultados",
    descripcion:
      "Si contextoBase.metodo_racional.resultados contiene datos, el bloque racional debe exponer tabla racional.",
    bloqueRacional,
    aprobado:
      bloqueRacional.includes("Tabla Método Racional") &&
      bloqueRacional.includes("| Tr | I | P | C | Q |") &&
      bloqueRacional.includes("100") &&
      bloqueRacional.includes("711")
  },
  {
    id: "bloque_racional_sin_tokens_invalidos",
    hallazgos: tokensEn(bloqueRacional),
    aprobado: tokensEn(bloqueRacional).length === 0
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    hallazgos: tokensEn(texto),
    aprobado: tokensEn(texto).length === 0
  },
  {
    id: "constructor_sin_modificacion_en_ot0321",
    descripcion: "OT-0321 es revalidación desde main; no debe modificar el constructor.",
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
  validacion: "OT-0321",
  bloque: "Método Racional — contraste global independiente",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles
    .filter((control) => !control.aprobado)
    .map((control) => control.id),
  salidaRealMetodoRacionalRevalidada: controles.every((control) => control.aprobado),
  buildAprobado: buildOk,
  recalculaMetodoRacional: false,
  seleccionaMetodoRacionalAdoptado: false,
  modificaMotor: false,
  modificaUI: false
};

const salidaMarkdown = [
  "# OT-0321B — Revalidación salida real Método Racional corregido como contraste global independiente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque Método Racional extraído de salida real revalidada",
  "",
  "```text",
  bloqueRacional,
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

if (resumen.salidaRealMetodoRacionalRevalidada) {
  salidaMarkdown.push("- La salida real/exportable conserva el bloque `Método Racional — contraste global independiente`.");
  salidaMarkdown.push("- El bloque está separado del bloque `Resumen Q-5 auditado`.");
  salidaMarkdown.push("- El bloque mantiene lectura no adoptiva.");
  salidaMarkdown.push("- Si hay resultados racionales en contexto, la tabla racional se expone.");
  salidaMarkdown.push("- No se recalcula Método Racional.");
  salidaMarkdown.push("- No se selecciona Método Racional como adoptado.");
  salidaMarkdown.push("- No se modificó código funcional en OT-0321.");
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
  resumen.salidaRealMetodoRacionalRevalidada
    ? "La salida real/exportable del bloque `Método Racional — contraste global independiente` queda revalidada desde main en el alcance de OT-0321."
    : "La salida real/exportable del bloque `Método Racional — contraste global independiente` requiere revisión antes de avanzar."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealMetodoRacionalRevalidada
    ? "`OT-0322 — Revalidación salida real Contraste Q-5 vs Método Racional`"
    : "`OT-0322 — Revisión adicional Método Racional corregido`"
);

fs.mkdirSync("00_ADMIN/bitacora/OT-0321", { recursive: true });
fs.writeFileSync(
  "00_ADMIN/bitacora/OT-0321/OT-0321B_revalidacion_salida_real_metodo_racional_corregido_expediente.md",
  salidaMarkdown.join("\n"),
  "utf8"
);

console.log("VALIDACION_OT_0321_METODO_RACIONAL_REVALIDADO_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
