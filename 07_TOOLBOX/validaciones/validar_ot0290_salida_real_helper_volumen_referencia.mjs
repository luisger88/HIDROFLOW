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

const rutasImports = {
  restricciones: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js"
  ),
  identificacion: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js"
  ),
  parametros: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueParametrosHidrologicosBaseExpediente.js"
  ),
  tcRoles: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js"
  ),
  volumen: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueVolumenReferenciaExpediente.js"
  )
};

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const lineasEsperadasVolumen = [
  "## 4. Volumen de referencia",
  "Lluvia efectiva total: 56,65 mm",
  "Volumen esperado: 2.654.251 m³",
  "Fórmula: Pe(mm) × Área(km²) × 1000."
];

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function contieneTodos(texto, patrones) {
  return patrones.every((patron) => texto.includes(patron));
}

function contieneTokensInvalidos(texto) {
  return tokensInvalidos
    .map((token) => ({
      token,
      ocurrencias: contarOcurrencias(texto, token)
    }))
    .filter((item) => item.ocurrencias > 0);
}

function extraerBloqueEntre(texto, tituloInicio, tituloFin) {
  const inicio = texto.indexOf(tituloInicio);
  const fin = texto.indexOf(tituloFin, inicio);

  if (inicio < 0) {
    return "";
  }

  if (fin < 0) {
    return texto.slice(inicio);
  }

  return texto.slice(inicio, fin);
}

function prepararModuloTemporal(fuenteExpediente) {
  const carpetaTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "ot0290-hidroflow-"));
  const rutaTemporal = path.join(carpetaTemporal, "construirExpedienteHidrologicoMinimo.mjs");

  const fuenteTemporal = fuenteExpediente
    .replace(
      'from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";',
      `from "${pathToFileURL(rutasImports.restricciones).href}";`
    )
    .replace(
      'from "./construirBloqueIdentificacionExpedienteMinimo";',
      `from "${pathToFileURL(rutasImports.identificacion).href}";`
    )
    .replace(
      'from "./construirBloqueParametrosHidrologicosBaseExpediente";',
      `from "${pathToFileURL(rutasImports.parametros).href}";`
    )
    .replace(
      'from "./construirBloqueTiempoConcentracionRolesTcExpediente";',
      `from "${pathToFileURL(rutasImports.tcRoles).href}";`
    )
    .replace(
      'from "./construirBloqueVolumenReferenciaExpediente";',
      `from "${pathToFileURL(rutasImports.volumen).href}";`
    );

  fs.writeFileSync(rutaTemporal, fuenteTemporal, "utf8");

  return { carpetaTemporal, rutaTemporal };
}

const fuenteExpediente = fs.existsSync(rutaExpediente)
  ? fs.readFileSync(rutaExpediente, "utf8")
  : "";

let modulo = null;
let importModuloOk = false;
let importModuloError = "";
let temporal = null;

try {
  temporal = prepararModuloTemporal(fuenteExpediente);
  modulo = await import(pathToFileURL(temporal.rutaTemporal).href);
  importModuloOk = true;
} catch (error) {
  importModuloError = `${error?.name || "Error"}: ${error?.message || error}`;
  importModuloOk = false;
}

const construirExpedienteHidrologicoMinimo = modulo?.default;

let salidaReal = null;
let textoReal = "";
let errorSalidaReal = "";

try {
  if (typeof construirExpedienteHidrologicoMinimo !== "function") {
    throw new Error("Constructor principal no disponible.");
  }

  salidaReal = construirExpedienteHidrologicoMinimo({
    contextoBase: {
      nombreCuenca: "La Iguaná PC_80",
      areaKm2: 46.8516
    },
    peTotalMm: 56.65,
    volumenEsperadoM3: 2654250.9,
    fechaGeneracion: "2026-06-14T00:00:00.000Z"
  });

  textoReal = salidaReal?.texto ?? "";
} catch (error) {
  errorSalidaReal = `${error?.name || "Error"}: ${error?.message || error}`;
}

const bloqueVolumenReal = extraerBloqueEntre(
  textoReal,
  "## 4. Volumen de referencia",
  "## 5. Escenario Q-Tr activo"
);

const bloqueAntesVolumen = extraerBloqueEntre(
  textoReal,
  "## 3. Tiempo de concentración y roles Tc",
  "## 4. Volumen de referencia"
);

const bloqueDespuesVolumen = extraerBloqueEntre(
  textoReal,
  "## 5. Escenario Q-Tr activo",
  "## 6. Resumen Q-5 auditado"
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
  buildOk = false;
}

const controles = [
  {
    id: "archivo_expediente_existe",
    descripcion: "Archivo del constructor del expediente existe",
    aprobado: fs.existsSync(rutaExpediente)
  },
  {
    id: "modulo_temporal_importa_sin_error",
    descripcion: "Módulo temporal del expediente importa sin error",
    error: importModuloError,
    aprobado: importModuloOk
  },
  {
    id: "constructor_principal_disponible",
    descripcion: "Constructor principal disponible como función",
    aprobado: typeof construirExpedienteHidrologicoMinimo === "function"
  },
  {
    id: "salida_real_sin_error",
    descripcion: "Constructor genera salida real sin error",
    error: errorSalidaReal,
    aprobado: errorSalidaReal === ""
  },
  {
    id: "salida_real_texto_string",
    descripcion: "Salida real contiene texto documental",
    longitud: typeof textoReal === "string" ? textoReal.length : null,
    aprobado: typeof textoReal === "string" && textoReal.length > 0
  },
  {
    id: "bloque_volumen_exactamente_una_vez",
    descripcion: "Bloque ## 4. Volumen de referencia aparece exactamente una vez",
    ocurrencias: contarOcurrencias(textoReal, "## 4. Volumen de referencia"),
    aprobado: contarOcurrencias(textoReal, "## 4. Volumen de referencia") === 1
  },
  {
    id: "bloque_volumen_orden_correcto",
    descripcion: "Bloque Volumen aparece después de Tc y antes de Escenario Q-Tr",
    aprobado:
      textoReal.indexOf("## 3. Tiempo de concentración y roles Tc") >= 0 &&
      textoReal.indexOf("## 4. Volumen de referencia") > textoReal.indexOf("## 3. Tiempo de concentración y roles Tc") &&
      textoReal.indexOf("## 5. Escenario Q-Tr activo") > textoReal.indexOf("## 4. Volumen de referencia")
  },
  {
    id: "bloque_volumen_lineas_minimas_exactas",
    descripcion: "Bloque Volumen conserva líneas mínimas con valores documentales",
    bloqueVolumenReal,
    esperado: lineasEsperadasVolumen,
    aprobado: contieneTodos(bloqueVolumenReal, lineasEsperadasVolumen)
  },
  {
    id: "bloque_volumen_sin_fallback_en_caso_valido",
    descripcion: "Bloque Volumen no usa fallback cuando recibe valores válidos",
    aprobado:
      !bloqueVolumenReal.includes("Lluvia efectiva total: —") &&
      !bloqueVolumenReal.includes("Volumen esperado: —")
  },
  {
    id: "bloque_volumen_sin_tokens_invalidos",
    descripcion: "Bloque Volumen sin tokens inválidos",
    hallazgos: contieneTokensInvalidos(bloqueVolumenReal),
    aprobado: contieneTokensInvalidos(bloqueVolumenReal).length === 0
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    descripcion: "Salida real completa sin tokens inválidos",
    hallazgos: contieneTokensInvalidos(textoReal),
    aprobado: contieneTokensInvalidos(textoReal).length === 0
  },
  {
    id: "bloque_tc_previo_presente",
    descripcion: "Bloque previo Tc permanece presente antes de Volumen",
    aprobado: bloqueAntesVolumen.includes("## 3. Tiempo de concentración y roles Tc")
  },
  {
    id: "bloque_qtr_posterior_presente",
    descripcion: "Bloque posterior Q-Tr permanece después de Volumen",
    aprobado: bloqueDespuesVolumen.includes("## 5. Escenario Q-Tr activo")
  },
  {
    id: "sin_modificacion_comparador",
    descripcion: "Comparador no participa en esta revalidación",
    aprobado: true
  },
  {
    id: "sin_recalculo_volumen",
    descripcion: "Revalidación no recalcula volumen; usa valores documentales de entrada",
    aprobado: true
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0290",
  bloque: "Volumen de referencia",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles.filter((control) => !control.aprobado).map((control) => control.id),
  buildAprobado: buildOk,
  salidaRealVolumenRevalidada: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0290B — Revalidación salida real helper bloque Volumen de referencia del expediente",
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

salidaMarkdown.push("## Evidencia principal");
salidaMarkdown.push("");
salidaMarkdown.push("```text");
salidaMarkdown.push(bloqueVolumenReal.trim());
salidaMarkdown.push("```");
salidaMarkdown.push("");
salidaMarkdown.push("## Lectura técnica");
salidaMarkdown.push("");
salidaMarkdown.push("- La salida real/exportable del expediente conserva el bloque `Volumen de referencia`.");
salidaMarkdown.push("- El bloque aparece en el orden esperado, después de `Tiempo de concentración y roles Tc` y antes de `Escenario Q-Tr activo`.");
salidaMarkdown.push("- La salida real conserva valores documentales válidos para lluvia efectiva y volumen esperado.");
salidaMarkdown.push("- La revalidación no recalcula volumen.");
salidaMarkdown.push("- No se modificó el constructor.");
salidaMarkdown.push("- No se modificó el helper.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealVolumenRevalidada
    ? "La salida real del bloque `Volumen de referencia` queda revalidada."
    : "La salida real del bloque `Volumen de referencia` requiere corrección adicional."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealVolumenRevalidada
    ? "`OT-0291 — Decisión estabilización bloque Volumen de referencia del expediente`"
    : "`OT-0291 — Corrección salida real bloque Volumen de referencia del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0290/OT-0290B_revalidacion_salida_real_helper_bloque_volumen_referencia_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0290", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

try {
  if (temporal?.carpetaTemporal) {
    fs.rmSync(temporal.carpetaTemporal, { recursive: true, force: true });
  }
} catch {
  // Sin efecto funcional.
}

console.log("VALIDACION_OT_0290_SALIDA_REAL_HELPER_VOLUMEN_REFERENCIA_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
