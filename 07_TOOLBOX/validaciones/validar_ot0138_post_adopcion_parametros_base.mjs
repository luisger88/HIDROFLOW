import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const lineasManualesAntiguas = [
  '`CN: ${contextoBase?.CN ?? "—"}`',
  '`CN base: ${contextoBase?.CN_base ?? "—"}`',
  '`CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`',
  '`AMC: ${contextoBase?.AMC ?? "—"}`'
];

const manualesDetectadas = lineasManualesAntiguas.filter((linea) =>
  texto.includes(linea)
);

const resumen = {
  tieneTextoExpediente: texto.includes("const textoExpediente = ["),
  usaHelperParametrosBase: texto.includes("...construirLineasParametrosHidrologicosBaseExpediente({"),
  pasaContextoBase: texto.includes("contextoBase"),
  bloqueIdentificacionPresente: texto.includes("## 1. Identificación"),
  bloqueParametrosBasePresente: texto.includes("## 2. Parámetros hidrológicos base"),
  bloqueTiempoConcentracionPresente: texto.includes("## 3. Tiempo de concentración"),
  portapapelesIntacto: texto.includes("areaTexto.value = textoExpediente"),
  fallbackManualIntacto: texto.includes(
    "window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"
  ),
  sinNavigatorClipboard: !texto.includes("navigator.clipboard"),
  sinWriteText: !texto.includes("writeText"),
  manualesDetectadas
};

assert.equal(resumen.tieneTextoExpediente, true, "Debe existir textoExpediente");
assert.equal(resumen.usaHelperParametrosBase, true, "Debe usarse helper delegado de Parámetros base");
assert.equal(resumen.pasaContextoBase, true, "Debe pasarse contextoBase");
assert.equal(resumen.bloqueIdentificacionPresente, true, "Debe conservarse bloque Identificación");
assert.equal(resumen.bloqueParametrosBasePresente, true, "Debe conservarse encabezado Parámetros base");
assert.equal(resumen.bloqueTiempoConcentracionPresente, true, "Debe conservarse bloque Tiempo de concentración");
assert.equal(resumen.portapapelesIntacto, true, "Debe mantenerse areaTexto.value = textoExpediente");
assert.equal(resumen.fallbackManualIntacto, true, "Debe mantenerse fallback manual con textoExpediente");
assert.equal(resumen.sinNavigatorClipboard, true, "No debe introducirse navigator.clipboard");
assert.equal(resumen.sinWriteText, true, "No debe introducirse writeText");
assert.equal(
  resumen.manualesDetectadas.length,
  0,
  `No deben reaparecer líneas manuales antiguas: ${resumen.manualesDetectadas.join(", ")}`
);

console.log("VALIDACION_OT_0138_POST_ADOPCION_PARAMETROS_BASE_OK");
console.log(JSON.stringify(resumen, null, 2));
