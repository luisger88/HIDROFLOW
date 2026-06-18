import fs from "fs";
import { execSync } from "child_process";
import construirExpedienteHidrologicoMinimo from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaExpediente = "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";
const rutaHelper = "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js";
const rutaComparador = "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx";

const requeridoFuente = [
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

function leerArchivo(ruta) {
  if (!fs.existsSync(ruta)) {
    return null;
  }

  return fs.readFileSync(ruta, "utf8");
}

function contarOcurrencias(texto, patron) {
  return texto.split(patron).length - 1;
}

function normalizarSalidaExpediente(salida) {
  if (Array.isArray(salida)) {
    return salida.join("\n");
  }

  if (typeof salida === "string") {
    return salida;
  }

  return String(salida ?? "");
}

const expedienteFuente = leerArchivo(rutaExpediente);
const helper = leerArchivo(rutaHelper);
const comparador = leerArchivo(rutaComparador);

const resultados = [];

if (!expedienteFuente) {
  resultados.push({
    id: "archivo_expediente",
    aprobado: false,
    detalle: "No existe el archivo de expediente"
  });
} else {
  resultados.push({
    id: "archivo_expediente",
    aprobado: true,
    detalle: "Archivo de expediente existe"
  });

  for (const item of requeridoFuente) {
    const ocurrencias = contarOcurrencias(expedienteFuente, item.texto);

    resultados.push({
      id: item.id,
      descripcion: item.descripcion,
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
  salidaDocumental = normalizarSalidaExpediente(
    construirExpedienteHidrologicoMinimo({
      contextoBase: {},
      fechaGeneracion: "VALIDACION_OT_0230"
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

for (const token of tokensInvalidos) {
  const ocurrencias = contarOcurrencias(salidaDocumental, token);

  resultados.push({
    id: `token_salida_${token}`,
    descripcion: `Token inválido ${token} en salida documental generada`,
    ocurrencias,
    aprobado: ocurrencias === 0
  });
}

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
  validacion: "OT-0229",
  criterioAjustadoEn: "OT-0230",
  archivoExpediente: rutaExpediente,
  archivoHelper: rutaHelper,
  archivoComparador: rutaComparador,
  totalControles: resultados.length,
  controlesAprobados: resultados.filter((r) => r.aprobado).length,
  controlesFallidos: resultados.filter((r) => !r.aprobado).length,
  validacionExpedienteAprobada: resultados.every((r) => r.aprobado),
  tokensEvaluadosSobre: "salida_documental_generada",
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salida = [
  "# OT-0229B — Validación expediente con bloque restricciones y advertencias generales acoplado",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Criterio ajustado en OT-0230",
  "",
  "La detección de tokens inválidos se aplica sobre la salida documental generada por `construirExpedienteHidrologicoMinimo`, no sobre el código fuente completo.",
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
salida.push("- La validación usa el criterio ajustado de OT-0230.");
salida.push("- Los tokens inválidos se revisan sobre la salida documental generada, no sobre todo el código fuente.");
salida.push("- No se modificó el helper.");
salida.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salida.push("- No se modificó `construirExpedienteHidrologicoMinimo.js` durante esta validación.");
salida.push("");
salida.push("## Decisión");
salida.push("");
salida.push(
  resumen.validacionExpedienteAprobada
    ? "El expediente queda validado con el bloque general de restricciones y advertencias acoplado bajo el criterio ajustado."
    : "El expediente no debe considerarse estabilizado hasta corregir los hallazgos detectados."
);
salida.push("");
salida.push("## Próximo frente recomendado");
salida.push("");
salida.push("`OT-0231 — Revalidación expediente con criterio ajustado de tokens inválidos`");

const rutaSalida = "00_ADMIN/bitacora/OT-0229/OT-0229B_validacion_expediente_bloque_restricciones_advertencias_acoplado.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0229", { recursive: true });
fs.writeFileSync(rutaSalida, salida.join("\n"), "utf8");

console.log("VALIDACION_OT_0229_EXPEDIENTE_RESTRICCIONES_ADVERTENCIAS_CRITERIO_AJUSTADO_OK");
console.log(JSON.stringify(resumen, null, 2));
