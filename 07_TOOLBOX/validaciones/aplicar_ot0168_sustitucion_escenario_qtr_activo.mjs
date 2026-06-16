import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("construirLineasEscenarioQTrActivoExpediente"),
  true,
  "Debe existir el import/uso de construirLineasEscenarioQTrActivoExpediente."
);

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

assert.equal(
  texto.includes(bloqueManual),
  true,
  "Debe existir el bloque manual operativo exacto ## 5 para sustituir."
);

const bloqueDelegado = [
  '                ...construirLineasEscenarioQTrActivoExpediente({',
  '                  estadoQTrActivoExpediente,',
  '                  qTrActivoExpediente,',
  '                  faltantesQTrActivoExpediente,',
  '                  formatearValorQTrExpediente',
  '                }),'
].join("\n");

texto = texto.replace(bloqueManual, bloqueDelegado);

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0168_SUSTITUCION_ESCENARIO_QTR_ACTIVO_OK");
