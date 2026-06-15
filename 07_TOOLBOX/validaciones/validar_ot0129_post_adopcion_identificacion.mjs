import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const tieneTextoExpediente = texto.includes("const textoExpediente = [");
const usaBloqueDelegado = texto.includes("...construirLineasIdentificacionExpediente({");
const pasaContextoBase = texto.includes("contextoBase,");
const pasaFuenteFallback = texto.includes('fuenteFallback: "HidroFlow"');
const pasaEstacionFallback = texto.includes("estacionIdfFallback: estacionIdfExpediente");

const portapapelesIntacto = texto.includes("areaTexto.value = textoExpediente");

const fallbackManualIntacto = texto.includes(
  "window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"
);

const sinNavigatorClipboard = !texto.includes("navigator.clipboard");
const sinWriteText = !texto.includes("writeText");

const lineasManualesAntiguas = [
  '`Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`',
  '`Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`',
  '`Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`'
];

const lineasManualesDetectadas = lineasManualesAntiguas.filter((linea) =>
  texto.includes(linea)
);

assert.equal(tieneTextoExpediente, true, "Debe existir const textoExpediente = [");
assert.equal(usaBloqueDelegado, true, "Debe usarse construirLineasIdentificacionExpediente como bloque delegado");
assert.equal(pasaContextoBase, true, "Debe pasarse contextoBase al helper delegado");
assert.equal(pasaFuenteFallback, true, "Debe conservarse fuenteFallback HidroFlow");
assert.equal(pasaEstacionFallback, true, "Debe pasarse estacionIdfExpediente como fallback");
assert.equal(portapapelesIntacto, true, "El portapapeles debe seguir usando textoExpediente");
assert.equal(fallbackManualIntacto, true, "El fallback manual debe seguir usando textoExpediente");
assert.equal(sinNavigatorClipboard, true, "No debe introducirse navigator.clipboard");
assert.equal(sinWriteText, true, "No debe introducirse writeText");
assert.equal(lineasManualesDetectadas.length, 0, "No deben reaparecer las líneas manuales antiguas del bloque Identificación");

const resumen = {
  tieneTextoExpediente,
  usaBloqueDelegado,
  pasaContextoBase,
  pasaFuenteFallback,
  pasaEstacionFallback,
  portapapelesIntacto,
  fallbackManualIntacto,
  sinNavigatorClipboard,
  sinWriteText,
  lineasManualesDetectadas
};

console.log("VALIDACION_OT_0129_POST_ADOPCION_IDENTIFICACION_OK");
console.log(JSON.stringify(resumen, null, 2));
