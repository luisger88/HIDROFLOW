import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const patronBloqueManual =
  /            "## 4\. Volumen de referencia",\r?\n            `Lluvia efectiva total: \$\{Number\.isFinite\(peTotalMm\) \? peTotalMm\.toFixed\(2\) \+ " mm" : "—"\}`,\r?\n            `Volumen esperado: \$\{volumenEsperadoM3 \? volumenEsperadoM3\.toLocaleString\("es-CO", \{ maximumFractionDigits: 0 \}\) \+ " m³" : "—"\}`,\r?\n            "Fórmula: Pe\(mm\) × Área\(km²\) × 1000\.",/;

const resumen = {
  tieneTextoExpediente: texto.includes("const textoExpediente = ["),
  usaHelperVolumenReferencia: texto.includes("...construirLineasVolumenReferenciaExpediente({"),
  pasaPeTotalMm: texto.includes("peTotalMm"),
  pasaVolumenEsperadoM3: texto.includes("volumenEsperadoM3"),
  bloqueIdentificacionPresente: texto.includes("## 1. Identificación"),
  bloqueParametrosBasePresente: texto.includes("## 2. Parámetros hidrológicos base"),
  bloqueTiempoConcentracionPresente: texto.includes("## 3. Tiempo de concentración y roles Tc"),
  bloqueSiguientePresente: texto.includes("## 5."),
  portapapelesIntacto: texto.includes("areaTexto.value = textoExpediente"),
  fallbackManualIntacto: texto.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  sinNavigatorClipboard: !texto.includes("navigator.clipboard"),
  sinWriteText: !texto.includes("writeText"),
  bloqueManualAntiguoDetectado: patronBloqueManual.test(texto)
};

assert.equal(resumen.tieneTextoExpediente, true, "Debe existir textoExpediente");
assert.equal(resumen.usaHelperVolumenReferencia, true, "Debe usarse helper delegado de Volumen de referencia");
assert.equal(resumen.pasaPeTotalMm, true, "Debe pasarse peTotalMm");
assert.equal(resumen.pasaVolumenEsperadoM3, true, "Debe pasarse volumenEsperadoM3");
assert.equal(resumen.bloqueIdentificacionPresente, true, "Debe conservarse bloque Identificación");
assert.equal(resumen.bloqueParametrosBasePresente, true, "Debe conservarse bloque Parámetros base");
assert.equal(resumen.bloqueTiempoConcentracionPresente, true, "Debe conservarse bloque Tiempo de concentración");
assert.equal(resumen.bloqueSiguientePresente, true, "Debe conservarse bloque siguiente");
assert.equal(resumen.portapapelesIntacto, true, "Debe mantenerse areaTexto.value = textoExpediente");
assert.equal(resumen.fallbackManualIntacto, true, "Debe mantenerse fallback manual con textoExpediente");
assert.equal(resumen.sinNavigatorClipboard, true, "No debe introducirse navigator.clipboard");
assert.equal(resumen.sinWriteText, true, "No debe introducirse writeText");
assert.equal(resumen.bloqueManualAntiguoDetectado, false, "No debe reaparecer el bloque manual antiguo de Volumen de referencia");

console.log("VALIDACION_OT_0159_POST_ADOPCION_VOLUMEN_REFERENCIA_OK");
console.log(JSON.stringify(resumen, null, 2));
