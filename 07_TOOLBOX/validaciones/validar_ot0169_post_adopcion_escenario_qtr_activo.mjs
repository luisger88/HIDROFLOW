import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const lineasManual = [
  '                "## 5. Escenario Q-Tr activo — control de trazabilidad",',
  '                `Estado: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,',
  '                `Tr activo: ${formatearValorQTrExpediente(qTrActivoExpediente.tr_activo, " años", 2)}`,',
  '                `Estación IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.estacion_idf)}`,',
  '                `Método IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.metodo_idf)}`,',
  '                `Distribución temporal: ${formatearValorQTrExpediente(qTrActivoExpediente.distribucion_temporal)}`,',
  '                `Área: ${formatearValorQTrExpediente(qTrActivoExpediente.area_km2, " km²", 4)}`,',
  '                `CN efectivo: ${formatearValorQTrExpediente(qTrActivoExpediente.cn_efectivo, "", 2)}`,',
  '                `S: ${formatearValorQTrExpediente(qTrActivoExpediente.s_mm, " mm", 2)}`,',
  '                `Ia: ${formatearValorQTrExpediente(qTrActivoExpediente.ia_mm, " mm", 2)}`,',
  '                `Impermeabilidad: ${formatearValorQTrExpediente(qTrActivoExpediente.porcentaje_impermeable, " %", 2)}`,',
  '                `Tc: ${formatearValorQTrExpediente(qTrActivoExpediente.tc_min, " min", 4)}`,',
  '                `Pe total: ${formatearValorQTrExpediente(qTrActivoExpediente.lluvia_efectiva_total_mm, " mm", 4)}`,',
  '                `Campos mínimos: ${faltantesQTrActivoExpediente.length > 0 ? "faltantes — " + faltantesQTrActivoExpediente.join(", ") : "completos"}`,',
  '                `Fuente: ${estadoQTrActivoExpediente?.fuente ?? "—"}`,',
  '                "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.",'
];

const bloqueManual = lineasManual.join("\n");

const resumen = {
  tieneTextoExpediente: texto.includes("const textoExpediente = ["),
  usaHelperEscenarioQTrActivo: texto.includes("...construirLineasEscenarioQTrActivoExpediente({"),
  pasaEstadoQTrActivo: texto.includes("estadoQTrActivoExpediente"),
  pasaQTrActivo: texto.includes("qTrActivoExpediente"),
  pasaFaltantesQTrActivo: texto.includes("faltantesQ

assert.equal(resumen.tieneTextoExpediente, true, "Debe existir textoExpediente");
assert.equal(resumen.usaHelperEscenarioQTrActivo, true, "Debe usarse helper delegado de Escenario Q-Tr activo");
assert.equal(resumen.pasaEstadoQTrActivo, true, "Debe pasarse estadoQTrActivoExpediente");
assert.equal(resumen.pasaQTrActivo, true, "Debe pasarse qTrActivoExpediente");
assert.equal(resumen.pasaFaltantesQTrActivo, true, "Debe pasarse faltantesQTrActivoExpediente");
assert.equal(resumen.pasaFormateadorQTr, true, "Debe pasarse formatearValorQTrExpediente");
assert.equal(resumen.bloqueManualAntiguoDetectado, false, "No debe reaparecer el bloque manual antiguo de Escenario Q-Tr activo");
assert.equal(resumen.bloqueIdentificacionPresente, true, "Debe conservarse bloque Identificación");
assert.equal(resumen.bloqueParametrosBasePresente, true, "Debe conservarse bloque Parámetros base");
assert.equal(resumen.bloqueTiempoConcentracionPresente, true, "Debe conservarse bloque Tiempo de concentración");
assert.equal(resumen.bloqueVolumenReferenciaPresente, true, "Debe conservarse bloque Volumen de referencia");
assert.equal(resumen.bloqueSiguientePresente, true, "Debe conservarse bloque siguiente");
assert.equal(resumen.portapapelesIntacto, true, "Debe mantenerse areaTexto.value = textoExpediente");
assert.equal(resumen.fallbackManualIntacto, true, "Debe mantenerse fallback manual con textoExpediente");
assert.equal(resumen.sinNavigatorClipboard, true, "No debe introducirse navigator.clipboard");
assert.equal(resumen.sinWriteText, true, "No debe introducirse writeText");

console.log("VALIDACION_OT_0169_POST_ADOPCION_ESCENARIO_QTR_ACTIVO_OK");
console.log(JSON.stringify(resumen, null, 2));
