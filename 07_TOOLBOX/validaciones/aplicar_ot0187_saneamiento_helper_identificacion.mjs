import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaHelper = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

let texto = fs.readFileSync(rutaHelper, "utf8");

assert.equal(
  texto.includes("export function construirLineasIdentificacionExpediente"),
  true,
  "Debe existir export function construirLineasIdentificacionExpediente."
);

assert.equal(
  texto.includes("normalizarTextoIdentificacionExpediente"),
  false,
  "No debe existir aún normalizarTextoIdentificacionExpediente para evitar duplicados."
);

const bloqueNormalizador = `function normalizarTextoIdentificacionExpediente(valor, fallback = "—") {
  if (typeof valor === "string" && valor.trim().length > 0) {
    return valor;
  }

  if (typeof valor === "number" && Number.isFinite(valor)) {
    return String(valor);
  }

  if (valor && typeof valor === "object") {
    const candidato =
      valor.nombre ??
      valor.nombreCuenca ??
      valor.id ??
      valor.codigo ??
      valor.label ??
      valor.descripcion;

    if (typeof candidato === "string" && candidato.trim().length > 0) {
      return candidato;
    }

    if (typeof candidato === "number" && Number.isFinite(candidato)) {
      return String(candidato);
    }

    return fallback;
  }

  return fallback;
}

`;

texto = texto.replace(
  "export function construirLineasIdentificacionExpediente",
  bloqueNormalizador + "export function construirLineasIdentificacionExpediente"
);

assert.equal(
  texto.includes("function normalizarTextoIdentificacionExpediente"),
  true,
  "Debe insertarse normalizarTextoIdentificacionExpediente."
);

const patronFuncion = /export function construirLineasIdentificacionExpediente[\s\S]*?\n\}/u;
const coincidenciaFuncion = texto.match(patronFuncion);

assert.notEqual(
  coincidenciaFuncion,
  null,
  "Debe localizarse construirLineasIdentificacionExpediente completa."
);

const funcionAntes = coincidenciaFuncion[0];

assert.equal(
  funcionAntes.includes("const nombreCuenca"),
  true,
  "Debe existir const nombreCuenca dentro del helper."
);

const patronNombreCuenca = /const nombreCuenca\s*=\s*[\s\S]*?;/u;

assert.equal(
  patronNombreCuenca.test(funcionAntes),
  true,
  "Debe localizarse la asignación const nombreCuenca."
);

const funcionDespues = funcionAntes.replace(
  patronNombreCuenca,
  `const nombreCuenca = normalizarTextoIdentificacionExpediente(
    contextoBase?.nombreCuenca ??
      contextoBase?.cuenca,
    "Cuenca activa"
  );`
);

assert.notEqual(
  funcionDespues,
  funcionAntes,
  "La función debe cambiar al reemplazar nombreCuenca."
);

texto = texto.replace(funcionAntes, funcionDespues);

assert.equal(
  texto.includes("const nombreCuenca = normalizarTextoIdentificacionExpediente("),
  true,
  "nombreCuenca debe usar normalizarTextoIdentificacionExpediente."
);

assert.equal(
  texto.includes("valor.nombre ??"),
  true,
  "El normalizador debe preferir valor.nombre."
);

fs.writeFileSync(rutaHelper, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0187_SANEAMIENTO_HELPER_IDENTIFICACION_OK");
