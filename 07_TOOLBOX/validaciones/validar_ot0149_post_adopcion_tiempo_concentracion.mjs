import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const patronBloqueManual =
  /[ \t]*"## 3\. Tiempo de concentración y roles Tc",\s*`Tc comparador: \$\{Tc_final !== null && Tc_final !== undefined \? Number\(Tc_final\)\.toFixed\(1\) \+ " min" : "—"\}`,\s*`Tr global activo: \$\{trDisenoActivoExpediente\} años`,\s*"Nota Tr: estado global visual\/exportable; no implica recálculo automático hasta propagación hidrológica controlada\.",\s*"Roles Tc:",\s*"- Tc global Índice: referencia hidrológica general\.",\s*"- Tc operativo Q\(t\): ruta interna del hidrograma\.",\s*"- Duración evento: 3 h para almacenamiento\/regulación\.",\s*"- Lag \/ forma SCS: parámetro derivado para forma temporal\.",\s*"- Tc comparador: referencia especializada para coherencia Q-5\.",/s;

const resumen = {
  tieneTextoExpediente: texto.includes("const textoExpediente = ["),
  usaHelperTiempoConcentracion: texto.includes("...construirLineasTiempoConcentracionRolesTcExpediente({"),
  pasaTcFinal: texto.includes("Tc_final"),
  pasaTrDisenoActivoExpediente: texto.includes("trDisenoActivoExpediente"),
  bloqueIdentificacionPresente: texto.includes("## 1. Identificación"),
  bloqueParametrosBasePresente: texto.includes("## 2. Parámetros hidrológicos base"),
  bloqueSiguientePresente: texto.includes("## 4."),
  portapapelesIntacto: texto.includes("areaTexto.value = textoExpediente"),
  fallbackManualIntacto: texto.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  sinNavigatorClipboard: !texto.includes("navigator.clipboard"),
  sinWriteText: !texto.includes("writeText"),
  bloqueManualAntiguoDetectado: patronBloqueManual.test(texto)
};

assert.equal(resumen.tieneTextoExpediente, true, "Debe existir textoExpediente");
assert.equal(resumen.usaHelperTiempoConcentracion, true, "Debe usarse helper delegado de Tiempo de concentración");
assert.equal(resumen.pasaTcFinal, true, "Debe pasarse Tc_final");
assert.equal(resumen.pasaTrDisenoActivoExpediente, true, "Debe pasarse trDisenoActivoExpediente");
assert.equal(resumen.bloqueIdentificacionPresente, true, "Debe conservarse bloque Identificación");
assert.equal(resumen.bloqueParametrosBasePresente, true, "Debe conservarse bloque Parámetros base");
assert.equal(resumen.bloqueSiguientePresente, true, "Debe conservarse bloque siguiente");
assert.equal(resumen.portapapelesIntacto, true, "Debe mantenerse areaTexto.value = textoExpediente");
assert.equal(resumen.fallbackManualIntacto, true, "Debe mantenerse fallback manual con textoExpediente");
assert.equal(resumen.sinNavigatorClipboard, true, "No debe introducirse navigator.clipboard");
assert.equal(resumen.sinWriteText, true, "No debe introducirse writeText");
assert.equal(resumen.bloqueManualAntiguoDetectado, false, "No debe reaparecer el bloque manual antiguo");

console.log("VALIDACION_OT_0149_POST_ADOPCION_TIEMPO_CONCENTRACION_OK");
console.log(JSON.stringify(resumen, null, 2));
