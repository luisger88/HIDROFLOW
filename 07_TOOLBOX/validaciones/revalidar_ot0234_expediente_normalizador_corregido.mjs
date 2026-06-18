import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { execSync } from "child_process";

const rutaExpediente = "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";
const rutaHelper = "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js";
const rutaComparador = "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx";

const controlesFuente = [
  {
    id: "import_helper",
    texto: "import { construirBloqueRestriccionesAdvertenciasGeneralesExpediente }",
    descripcion: "Import del helper presente"
  },
  {
    id: "seccion_12_fuente",
    texto: "## 12. Restricciones y advertencias técnicas",
    descripcion: "Sección 12 presente en fuente"
  },
  {
    id: "marca_ot0228",
    texto: "OT-0228 — Acople mínimo helper restricciones y advertencias generales",
    descripcion: "Marca de acople OT-0228 presente"
  },
  {
    id: "llamada_helper",
    texto: "...construirBloqueRestriccionesAdvertenciasGeneralesExpediente({",
    descripcion: "Llamada al helper presente"
  },
  {
    id: "alcance_general",
    texto: "Sección general de cautela documental del expediente.",
    descripcion: "Alcance general acoplado"
  },
  {
    id: "restriccion_motor",
    texto: "El expediente no modifica el motor hidrológico.",
    descripcion: "Restricción general sobre motor presente"
  },
  {
    id: "advertencia_no_adopcion",
    texto: "Las advertencias generales no implican adopción hidrológica.",
    descripcion: "Advertencia general de no adopción presente"
  }
];

const tokensInvalidos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

const seccionesObligatorias = [
  "# Expediente hidrológico mínimo — Cuenca activa",
  "## 1. Identificación",
  "## 2. Parámetros hidrológicos base",
  "## 3. Tiempo de concentración y roles Tc",
  "## 4. Volumen de referencia",
  "## 5. Escenario Q-Tr activo — control de trazabilidad",
  "## 6. Resumen Q-5 auditado",
  "## 7. Método Racional — contraste global independiente",
  "## 8. Contraste Q-5 vs Método Racional",
  "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "## Diagnóstico temporal Q(t) no adoptivo",
  "## 10. Validación interna del expediente exportado",
  "## 11. Sello técnico de generación",
  "## 12. Restricciones y advertencias técnicas"
];

function leerArchivo(ruta) {
  if (!fs.existsSync(ruta)) return null;
  return fs.readFileSync(ruta, "utf8");
}

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function normalizarSalidaExpediente(salida) {
  if (typeof salida === "string") {
    return salida;
  }

  if (Array.isArray(salida)) {
    return salida.join("\n");
  }

  if (salida && typeof salida === "object") {
    if (typeof salida.texto === "string") {
      return salida.texto;
    }

    if (Array.isArray(salida.lineas)) {
      return salida.lineas.join("\n");
    }

    if (typeof salida.textoExpediente === "string") {
      return salida.textoExpediente;
    }

    if (typeof salida.markdown === "string") {
      return salida.markdown;
    }

    if (typeof salida.contenido === "string") {
      return salida.contenido;
    }

    if (Array.isArray(salida.secciones)) {
      return salida.secciones.join("\n");
    }
  }

  return "";
}

async function cargarConstructorExpedienteConImportResuelto() {
  const fuenteOriginal = leerArchivo(rutaExpediente);

  if (!fuenteOriginal) {
    throw new Error("No existe el archivo de expediente.");
  }

  const helperUrl = pathToFileURL(path.resolve(rutaHelper)).href;

  const fuenteAjustada = fuenteOriginal.replace(
    'import { construirBloqueRestriccionesAdvertenciasGeneralesExpediente } from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";',
    `import { construirBloqueRestriccionesAdvertenciasGeneralesExpediente } from "${helperUrl}";`
  );

  const moduloUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(fuenteAjustada)}`;
  const modulo = await import(moduloUrl);

  if (typeof modulo.default !== "function") {
    throw new Error("El módulo de expediente no exporta función default.");
  }

  return modulo.default;
}

const expedienteFuente = leerArchivo(rutaExpediente);
const helper = leerArchivo(rutaHelper);
const comparador = leerArchivo(rutaComparador);

const resultados = [];

resultados.push({
  id: "archivo_expediente",
  aprobado: Boolean(expedienteFuente),
  detalle: expedienteFuente ? "Archivo de expediente existe" : "Archivo de expediente no existe"
});

if (expedienteFuente) {
  for (const control of controlesFuente) {
    const ocurrencias = contarOcurrencias(expedienteFuente, control.texto);

    resultados.push({
      id: control.id,
      descripcion: control.descripcion,
      ocurrencias,
      aprobado: ocurrencias >= 1
    });
  }

  const ocurrenciasBloqueFuente = contarOcurrencias(
    expedienteFuente,
    "OT-0228 — Acople mínimo helper restricciones y advertencias generales"
  );

  resultados.push({
    id: "bloque_unico_ot0228_fuente",
    descripcion: "Bloque OT-0228 aparece una sola vez en fuente",
    ocurrencias: ocurrenciasBloqueFuente,
    aprobado: ocurrenciasBloqueFuente === 1
  });
}

let salidaCruda = null;
let salidaTexto = "";
let salidaGeneradaOk = false;
let errorSalida = "";

try {
  const construirExpedienteHidrologicoMinimo = await cargarConstructorExpedienteConImportResuelto();

  salidaCruda = construirExpedienteHidrologicoMinimo({
    contextoBase: {},
    fechaGeneracion: "VALIDACION_OT_0234"
  });

  salidaTexto = normalizarSalidaExpediente(salidaCruda);
  salidaGeneradaOk = salidaTexto.length > 0;
} catch (error) {
  salidaCruda = null;
  salidaTexto = "";
  salidaGeneradaOk = false;
  errorSalida = error?.message ?? String(error);
}

resultados.push({
  id: "salida_documental_generada",
  descripcion: "Salida documental generada desde construirExpedienteHidrologicoMinimo",
  aprobado: salidaGeneradaOk,
  longitud: salidaTexto.length,
  rutaTextoUsada: salidaCruda && typeof salidaCruda === "object" && typeof salidaCruda.texto === "string" ? "salida.texto" : "otra",
  error: errorSalida
});

resultados.push({
  id: "salida_ok_true",
  descripcion: "La salida reporta ok=true",
  aprobado: Boolean(salidaCruda && typeof salidaCruda === "object" && salidaCruda.ok === true),
  valor: salidaCruda && typeof salidaCruda === "object" ? salidaCruda.ok : null
});

resultados.push({
  id: "salida_errores_vacia",
  descripcion: "La salida no reporta errores internos",
  aprobado: Boolean(salidaCruda && typeof salidaCruda === "object" && Array.isArray(salidaCruda.errores) && salidaCruda.errores.length === 0),
  longitudErrores: salidaCruda && typeof salidaCruda === "object" && Array.isArray(salidaCruda.errores) ? salidaCruda.errores.length : null
});

for (const seccion of seccionesObligatorias) {
  const ocurrenciasTexto = contarOcurrencias(salidaTexto, seccion);
  const ocurrenciasSecciones = salidaCruda && typeof salidaCruda === "object" && Array.isArray(salidaCruda.secciones)
    ? salidaCruda.secciones.filter((item) => item === seccion).length
    : 0;

  resultados.push({
    id: `seccion_obligatoria_${seccion}`,
    descripcion: `Sección obligatoria: ${seccion}`,
    ocurrenciasTexto,
    ocurrenciasSecciones,
    aprobado: ocurrenciasTexto >= 1 || ocurrenciasSecciones >= 1
  });
}

for (const token of tokensInvalidos) {
  const ocurrencias = contarOcurrencias(salidaTexto, token);

  resultados.push({
    id: `token_salida_${token}`,
    descripcion: `Token inválido ${token} en salida.texto`,
    ocurrencias,
    aprobado: ocurrencias === 0
  });
}

const ocurrenciasBloqueSalida = contarOcurrencias(
  salidaTexto,
  "Las advertencias generales no implican adopción hidrológica."
);

resultados.push({
  id: "bloque_general_en_salida",
  descripcion: "Bloque general de restricciones/advertencias aparece una vez en salida.texto",
  ocurrencias: ocurrenciasBloqueSalida,
  aprobado: ocurrenciasBloqueSalida === 1
});

resultados.push({
  id: "archivo_helper",
  aprobado: Boolean(helper),
  detalle: helper ? "Helper existe" : "Helper no existe"
});

resultados.push({
  id: "archivo_comparador",
  aprobado: Boolean(comparador),
  detalle: comparador ? "Comparador existe" : "Comparador no existe"
});

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

resultados.push({
  id: "build_vite",
  descripcion: "Build Vite",
  aprobado: buildOk
});

const resumen = {
  validacion: "OT-0234",
  normalizadorCorregidoDesde: "OT-0233",
  archivoExpediente: rutaExpediente,
  archivoHelper: rutaHelper,
  archivoComparador: rutaComparador,
  totalControles: resultados.length,
  controlesAprobados: resultados.filter((r) => r.aprobado).length,
  controlesFallidos: resultados.filter((r) => !r.aprobado).length,
  revalidacionExpedienteAprobada: resultados.every((r) => r.aprobado),
  textoEvaluadoDesde: "salida.texto",
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salidaMarkdown = [
  "# OT-0234B — Revalidación expediente con normalizador corregido",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Criterio aplicado",
  "",
  "La salida documental se extrajo desde `salida.texto`, conforme a la auditoría OT-0232 y al ajuste del normalizador OT-0233.",
  "",
  "## Controles evaluados",
  ""
];

for (const resultado of resultados) {
  salidaMarkdown.push(`### ${resultado.id}`);
  salidaMarkdown.push("");
  salidaMarkdown.push("```json");
  salidaMarkdown.push(JSON.stringify(resultado, null, 2));
  salidaMarkdown.push("```");
  salidaMarkdown.push("");
}

salidaMarkdown.push("## Build");
salidaMarkdown.push("");
salidaMarkdown.push(buildOk ? "Build aprobado." : "Build fallido.");
salidaMarkdown.push("");
salidaMarkdown.push("## Lectura técnica");
salidaMarkdown.push("");
salidaMarkdown.push("- La revalidación se ejecutó con el normalizador corregido.");
salidaMarkdown.push("- El texto documental se evaluó desde `salida.texto`.");
salidaMarkdown.push("- No se modificó el expediente operativo.");
salidaMarkdown.push("- No se modificó el helper.");
salidaMarkdown.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salidaMarkdown.push("- No se tocaron bloques sensibles.");
salidaMarkdown.push("");
salidaMarkdown.push("## Decisión");
salidaMarkdown.push("");
salidaMarkdown.push(
  resumen.revalidacionExpedienteAprobada
    ? "El expediente queda revalidado con el bloque general de restricciones y advertencias acoplado bajo el normalizador corregido."
    : "El expediente no debe considerarse estabilizado hasta corregir los hallazgos detectados."
);
salidaMarkdown.push("");
salidaMarkdown.push("## Próximo frente recomendado");
salidaMarkdown.push("");
salidaMarkdown.push("`OT-0235 — Decisión sobre estabilización del bloque restricciones y advertencias generales`");

const rutaSalida = "00_ADMIN/bitacora/OT-0234/OT-0234B_revalidacion_expediente_normalizador_corregido.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0234", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("REVALIDACION_OT_0234_EXPEDIENTE_NORMALIZADOR_CORREGIDO_OK");
console.log(JSON.stringify(resumen, null, 2));
