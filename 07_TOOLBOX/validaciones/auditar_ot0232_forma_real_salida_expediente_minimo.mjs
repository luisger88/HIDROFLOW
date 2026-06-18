import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const rutaExpediente = "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";
const rutaHelper = "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js";

function leerArchivo(ruta) {
  if (!fs.existsSync(ruta)) return null;
  return fs.readFileSync(ruta, "utf8");
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

function resumirValor(valor) {
  const tipo = Array.isArray(valor) ? "array" : typeof valor;

  const resumen = {
    tipo,
    esArray: Array.isArray(valor),
    esNull: valor === null,
    keys: valor && typeof valor === "object" && !Array.isArray(valor) ? Object.keys(valor) : [],
    longitudArray: Array.isArray(valor) ? valor.length : null,
    longitudString: typeof valor === "string" ? valor.length : null,
    vistaString: String(valor).slice(0, 300)
  };

  if (valor && typeof valor === "object" && !Array.isArray(valor)) {
    resumen.detalleKeys = {};

    for (const key of Object.keys(valor)) {
      const interno = valor[key];
      resumen.detalleKeys[key] = {
        tipo: Array.isArray(interno) ? "array" : typeof interno,
        esArray: Array.isArray(interno),
        longitudArray: Array.isArray(interno) ? interno.length : null,
        longitudString: typeof interno === "string" ? interno.length : null,
        vistaString: String(interno).slice(0, 200)
      };
    }
  }

  return resumen;
}

const construirExpedienteHidrologicoMinimo = await cargarConstructorExpedienteConImportResuelto();

const salida = construirExpedienteHidrologicoMinimo({
  contextoBase: {},
  fechaGeneracion: "AUDITORIA_OT_0232"
});

const resumen = {
  auditoria: "OT-0232",
  objetivo: "forma_real_salida_construirExpedienteHidrologicoMinimo",
  archivoExpediente: rutaExpediente,
  archivoHelper: rutaHelper,
  formaSalida: resumirValor(salida),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const candidatosTexto = [];

if (typeof salida === "string") {
  candidatosTexto.push({
    ruta: "salida",
    tipo: "string",
    longitud: salida.length,
    contieneTituloExpediente: salida.includes("# Expediente hidrológico mínimo")
  });
}

if (Array.isArray(salida)) {
  const texto = salida.join("\n");

  candidatosTexto.push({
    ruta: "salida.join('\\n')",
    tipo: "array",
    longitud: texto.length,
    contieneTituloExpediente: texto.includes("# Expediente hidrológico mínimo")
  });
}

if (salida && typeof salida === "object" && !Array.isArray(salida)) {
  for (const key of Object.keys(salida)) {
    const valor = salida[key];

    if (typeof valor === "string") {
      candidatosTexto.push({
        ruta: `salida.${key}`,
        tipo: "string",
        longitud: valor.length,
        contieneTituloExpediente: valor.includes("# Expediente hidrológico mínimo")
      });
    }

    if (Array.isArray(valor)) {
      const texto = valor.join("\n");

      candidatosTexto.push({
        ruta: `salida.${key}.join('\\n')`,
        tipo: "array",
        longitud: texto.length,
        contieneTituloExpediente: texto.includes("# Expediente hidrológico mínimo")
      });
    }
  }
}

resumen.candidatosTexto = candidatosTexto;

const salidaMarkdown = [
  "# OT-0232B — Auditoría forma real salida construirExpedienteHidrologicoMinimo",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Lectura técnica",
  "",
  "- Esta auditoría no modifica código funcional.",
  "- La finalidad es identificar la ruta correcta para extraer el texto documental exportable.",
  "- No se modifica expediente, helper, acople ni comparador.",
  "",
  "## Próximo frente recomendado",
  "",
  "`OT-0233 — Ajuste normalizador salida documental expediente mínimo`"
];

const rutaSalida = "00_ADMIN/bitacora/OT-0232/OT-0232B_auditoria_forma_real_salida_expediente_minimo.md";

fs.mkdirSync("00_ADMIN/bitacora/OT-0232", { recursive: true });
fs.writeFileSync(rutaSalida, salidaMarkdown.join("\n"), "utf8");

console.log("AUDITORIA_OT_0232_FORMA_REAL_SALIDA_EXPEDIENTE_OK");
console.log(JSON.stringify(resumen, null, 2));
