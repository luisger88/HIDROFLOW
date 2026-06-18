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
    id: "seccion_12",
    texto: "## 12. Restricciones y advertencias técnicas",
    descripcion: "Sección 12 presente"
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
  if (Array.isArray(salida)) return salida.join("\n");
  if (typeof salida === "string") return salida;
  return String(salida ?? "");
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

  const ocurrenciasBloque = contarOcurrencias(
    expedienteFuente,
    "OT-0228 — Acople mínimo helper restricciones y advertencias generales"
  );

  resultados.push({
    id: "bloque_unico_ot0228",
    descripcion: "Bloque OT-0228 aparece una sola vez en fuente",
    ocurrencias: ocurrenciasBloque,
    aprobado: ocurrenciasBloque === 1
  });
}

let salidaDocumental = "";
let salidaGeneradaOk = false;
let errorSalida = "";

try {
  const construirExpedienteHidrologicoMinimo = await cargarConstructorExpedienteConImportResuelto();

  salidaDocumental = normalizarSalidaExpediente(
    construirExpedienteHidrologicoMinimo({
      contextoBase: {},
      fechaGeneracion: "VALIDACION_OT_0231"
    })
  );

  salidaGeneradaOk = salidaDocumental.length > 0;
} catch (error) {
  salidaDocumental = "";
  salidaGeneradaOk = false;
  errorSalida = error?.message ?? String(error);
}

resultados.push({
  id: "salida_documental_generada",
  descripcion: "Salida documental generada desde construirExpedienteHidrologicoMinimo",
  aprobado: salidaGeneradaOk,
  longitud: salidaDocumental.length,
  error: errorSalida
});

for (const seccion of seccionesObligatorias) {
  const ocurrencias = contarOcurrencias(salidaDocumental, seccion);

  resultados.push({
    id: `seccion_salida_${seccion}`,
    descripcion: `Sección obligatoria en salida: ${seccion}`,
    ocurrencias,
    aprobado: ocurrencias >= 1
  });
}

for (const token of tokensInvalidos) {
  const ocurrencias = contarOcurrencias(salidaDocumental, token);

  resultados.push({
    id: `token_salida_${token}`,
    descripcion: `Token inválido ${token} en salida documental generada`,
    ocurrencias,
    aprobado: ocurrencias === 0
  });
}

const ocurrenciasBloqueSalida = contarOcurrencias(
  salidaDocumental,
  "Las advertencias generales no implican adopción hidrológica."
);

resultados.push({
  id: "bloque_general_en_salida",
  descripcion: "Bloque general de restricciones/advertencias aparece en salida documental",
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
  validacion: "OT-0231",
  criterioAjustadoDesde: "OT-0230",
  archivoExpediente: rutaExpediente,
  archivoHelper: rutaHelper,
  archivoComparador: rutaComparador,
  totalControles: resultados.length,
  controlesAprobados: resultados.filter((r) => r.aprobado).length,
  controlesFallidos: resultados.filter((r) => !r.aprobado).length,
  revalidacionExpedienteAprobada: resultados.every((r) => r.aprobado),
  tokensEvaluadosSobre: "salida_documental_generada",
  cargaNodeEsm: "import relativo resuelto en memoria sin modificar fuente",
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salida = [
  "# OT-0231B — Revalidación expediente con criterio ajustado de tokens inválidos",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Criterio aplicado",
  "",
  "Los tokens inválidos se evaluaron sobre la salida documental generada por `construirExpedienteHidrologicoMinimo`, no sobre el código fuente completo.",
  "",
  "Para ejecutar la revalidación en Node ESM sin modificar el código fuente, el import relativo sin extensión del helper se resolvió en memoria mediante URL `file://`.",
  "",
  "## Controles evaluados",
  ""
];

for (const resultado of resultados) {
  salida.push(`### ${resultado.id}`);
  salida.push("");
  salida.push("```json");
  salida.push(JSON.stringify(resultado, null, 2));
  salida.push("```");
  salida.push("");
}

salida.push("## Build");
salida.push("");
salida.push(buildOk ? "Build aprobado." : "Build fallido.");
salida.push("");
salida.push("## Lectura técnica");
salida.push("");
salida.push("- La revalidación se ejecutó con el criterio ajustado de OT-0230.");
salida.push("- No se modificó el expediente operativo.");
salida.push("- No se modificó el helper.");
salida.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salida.push("- No se tocaron bloques sensibles.");
salida.push("");
salida.push("## Decisión");
salida.push("");
salida.push(
  resumen.revalidacionExpedienteAprobada
    ? "El expediente queda revalidado con el bloque general de restricciones y advertencias acoplado bajo el criterio ajustado."
    : "El expediente no debe considerarse estabilizado hasta corregir los hallazgos detectados."
);
salida.push("");
salida.push("## Próximo frente recomendado");
salida.push("");
salida.push("`OT-0232 — Decisión sobre estabilización del bloque restricciones y advertencias generales`");

const rutaSalida = "00_ADMIN/bitacora/OT-0231/OT-0231B_revalidacion_expediente_criterio_ajustado_tokens.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0231", { recursive: true });
fs.writeFileSync(rutaSalida, salida.join("\n"), "utf8");

console.log("REVALIDACION_OT_0231_EXPEDIENTE_CRITERIO_AJUSTADO_OK");
console.log(JSON.stringify(resumen, null, 2));
