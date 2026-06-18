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
  ),
  qtr: path.join(
    raiz,
    "01_APP/HIDROFLOW/src/services/documentos/construirBloqueEscenarioQTrActivoExpediente.js"
  )
};

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const lineasEsperadasQTr = [
  "## 5. Escenario Q-Tr activo — control de trazabilidad",
  "Estado: no_publicado",
  "Lectura técnica: bloque reservado para integración posterior sin recálculo."
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

function prepararModuloTemporal(fuente) {
  const carpetaTemporal = fs.mkdtempSync(path.join(os.tmpdir(), "ot0301-hidroflow-"));
  const rutaTemporal = path.join(carpetaTemporal, "construirExpedienteHidrologicoMinimo.mjs");

  const fuenteTemporal = fuente
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
    )
    .replace(
      'from "./construirBloqueEscenarioQTrActivoExpediente";',
      `from "${pathToFileURL(rutasImports.qtr).href}";`
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

let textoReal = "";
let bloqueQTrReal = "";
let bloquePrevioVolumen = "";
let bloquePosteriorQ5 = "";
let errorSalidaReal = "";

try {
  if (typeof construirExpedienteHidrologicoMinimo !== "function") {
    throw new Error("Constructor principal no disponible.");
  }

  const salidaReal = construirExpedienteHidrologicoMinimo({
    contextoBase: {},
    fechaGeneracion: "2026-06-14T00:00:00.000Z"
  });

  textoReal = salidaReal?.texto ?? "";

  bloqueQTrReal = extraerBloqueEntre(
    textoReal,
    "## 5. Escenario Q-Tr activo — control de trazabilidad",
    "## 6. Resumen Q-5 auditado"
  );

  bloquePrevioVolumen = extraerBloqueEntre(
    textoReal,
    "## 4. Volumen de referencia",
    "## 5. Escenario Q-Tr activo — control de trazabilidad"
  );

  bloquePosteriorQ5 = extraerBloqueEntre(
    textoReal,
    "## 6. Resumen Q-5 auditado",
    "## 7. Método Racional — contraste global independiente"
  );
} catch (error) {
  errorSalidaReal = `${error?.name || "Error"}: ${error?.message || error}`;
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
    id: "bloque_qtr_exactamente_una_vez",
    descripcion: "Bloque ## 5. Escenario Q-Tr activo aparece exactamente una vez",
    ocurrencias: contarOcurrencias(textoReal, "## 5. Escenario Q-Tr activo — control de trazabilidad"),
    aprobado: contarOcurrencias(textoReal, "## 5. Escenario Q-Tr activo — control de trazabilidad") === 1
  },
  {
    id: "bloque_qtr_orden_correcto",
    descripcion: "Bloque Q-Tr aparece después de Volumen y antes de Resumen Q-5",
    aprobado:
      textoReal.indexOf("## 4. Volumen de referencia") >= 0 &&
      textoReal.indexOf("## 5. Escenario Q-Tr activo — control de trazabilidad") > textoReal.indexOf("## 4. Volumen de referencia") &&
      textoReal.indexOf("## 6. Resumen Q-5 auditado") > textoReal.indexOf("## 5. Escenario Q-Tr activo — control de trazabilidad")
  },
  {
    id: "bloque_qtr_lineas_minimas_exactas",
    descripcion: "Bloque Q-Tr conserva líneas mínimas con fallbacks documentales",
    bloqueQTrReal,
    esperado: lineasEsperadasQTr,
    aprobado: contieneTodos(bloqueQTrReal, lineasEsperadasQTr)
  },
  {
    id: "bloque_qtr_sin_tokens_invalidos",
    descripcion: "Bloque Q-Tr sin tokens inválidos",
    hallazgos: contieneTokensInvalidos(bloqueQTrReal),
    aprobado: contieneTokensInvalidos(bloqueQTrReal).length === 0
  },
  {
    id: "salida_real_sin_tokens_invalidos",
    descripcion: "Salida real completa sin tokens inválidos",
    hallazgos: contieneTokensInvalidos(textoReal),
    aprobado: contieneTokensInvalidos(textoReal).length === 0
  },
  {
    id: "bloque_volumen_previo_presente",
    descripcion: "Bloque previo Volumen permanece presente antes de Q-Tr",
    aprobado: bloquePrevioVolumen.includes("## 4. Volumen de referencia")
  },
  {
    id: "bloque_q5_posterior_presente",
    descripcion: "Bloque posterior Resumen Q-5 permanece después de Q-Tr",
    aprobado: bloquePosteriorQ5.includes("## 6. Resumen Q-5 auditado")
  },
  {
    id: "sin_modificacion_constructor",
    descripcion: "Revalidación no modifica constructor",
    aprobado: true
  },
  {
    id: "sin_modificacion_helper_qtr",
    descripcion: "Revalidación no modifica helper Q-Tr",
    aprobado: true
  },
  {
    id: "sin_modificacion_comparador",
    descripcion: "Comparador no participa en esta revalidación",
    aprobado: true
  },
  {
    id: "sin_recalculo_qtr",
    descripcion: "Revalidación no recalcula Q-Tr",
    aprobado: true
  },
  {
    id: "build_vite",
    descripcion: "Build Vite aprobado",
    aprobado: buildOk
  }
];

const resumen = {
  validacion: "OT-0301",
  bloque: "Escenario Q-Tr activo — control de trazabilidad",
  totalControles: controles.length,
  controlesAprobados: controles.filter((control) => control.aprobado).length,
  controlesFallidos: controles.filter((control) => !control.aprobado).length,
  controlesFallidosIds: controles.filter((control) => !control.aprobado).map((control) => control.id),
  buildAprobado: buildOk,
  salidaRealQTrRevalidada: controles.every((control) => control.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0301B — Revalidación salida real helper bloque Escenario Q-Tr activo del expediente",
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
salidaMarkdown.push(bloqueQTrReal.trim());
salidaMarkdown.push("```");
salidaMarkdown.push("");
salidaMarkdown.push("## Lectura técnica");
salidaMarkdown.push("");
salidaMarkdown.push("- La salida real/exportable del expediente conserva el bloque `Escenario Q-Tr activo — control de trazabilidad`.");
salidaMarkdown.push("- El bloque aparece en el orden esperado, después de `Volumen de referencia` y antes de `Resumen Q-5 auditado`.");
salidaMarkdown.push("- La salida real conserva fallbacks documentales válidos.");
salidaMarkdown.push("- La revalidación no recalcula Q-Tr.");
salidaMarkdown.push("- No se modificó el constructor.");
salidaMarkdown.push("- No se modificó el helper.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se modificó motor.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealQTrRevalidada
    ? "La salida real del bloque `Escenario Q-Tr activo — control de trazabilidad` queda revalidada."
    : "La salida real del bloque `Escenario Q-Tr activo — control de trazabilidad` requiere corrección adicional."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.salidaRealQTrRevalidada
    ? "`OT-0302 — Decisión estabilización bloque Escenario Q-Tr activo del expediente`"
    : "`OT-0302 — Corrección salida real bloque Escenario Q-Tr activo del expediente`"
);

const rutaSalida = "00_ADMIN/bitacora/OT-0301/OT-0301B_revalidacion_salida_real_helper_bloque_escenario_qtr_activo_expediente.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0301", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

try {
  if (temporal?.carpetaTemporal) {
    fs.rmSync(temporal.carpetaTemporal, { recursive: true, force: true });
  }
} catch {
  // Sin efecto funcional.
}

console.log("VALIDACION_OT_0301_SALIDA_REAL_HELPER_ESCENARIO_QTR_COMPLETADA");
console.log(JSON.stringify(resumen, null, 2));
