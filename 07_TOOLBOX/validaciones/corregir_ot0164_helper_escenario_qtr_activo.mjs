import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaHelper = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

let texto = fs.readFileSync(rutaHelper, "utf8");

const marcadorInicio = "export function construirLineasEscenarioQTrActivoExpediente";

const inicio = texto.indexOf(marcadorInicio);

assert.notEqual(
  inicio,
  -1,
  "Debe existir la función construirLineasEscenarioQTrActivoExpediente para corregirla."
);

const prefijo = texto.slice(0, inicio).trimEnd();

const funcionCorregida = `
export function construirLineasEscenarioQTrActivoExpediente(entrada = {}) {
  const entradaSegura = entrada && typeof entrada === "object" ? entrada : {};

  const {
    estadoQTrActivoExpediente = {},
    qTrActivoExpediente = {},
    faltantesQTrActivoExpediente = [],
    formatearValorQTrExpediente
  } = entradaSegura;

  const normalizarTexto = (valor, fallback = "—") => {
    if (valor === undefined || valor === null) {
      return fallback;
    }

    if (typeof valor === "string" && valor.trim().length === 0) {
      return fallback;
    }

    if (typeof valor === "object") {
      return fallback;
    }

    return String(valor);
  };

  const formatearValorSeguro = (valor, unidad = "", decimales) => {
    if (valor === undefined || valor === null) {
      return "—";
    }

    if (typeof valor === "string" && valor.trim().length === 0) {
      return "—";
    }

    if (typeof valor === "object") {
      return "—";
    }

    const numero = Number(valor);

    if (Number.isFinite(numero) && typeof decimales === "number") {
      return \`\${numero.toFixed(decimales)}\${unidad}\`;
    }

    if (Number.isFinite(numero) && typeof valor === "number") {
      return \`\${numero}\${unidad}\`;
    }

    if (typeof valor === "string") {
      return valor;
    }

    return "—";
  };

  const formatear = (valor, unidad = "", decimales) => {
    if (typeof formatearValorQTrExpediente === "function") {
      const formateado = formatearValorQTrExpediente(valor, unidad, decimales);
      return normalizarTexto(formateado);
    }

    return formatearValorSeguro(valor, unidad, decimales);
  };

  const faltantes = Array.isArray(faltantesQTrActivoExpediente)
    ? faltantesQTrActivoExpediente.filter((item) => normalizarTexto(item, "").length > 0)
    : [];

  return [
    "## 5. Escenario Q-Tr activo — control de trazabilidad",
    \`Estado: \${normalizarTexto(estadoQTrActivoExpediente?.estado, "no_publicado")}\`,
    \`Tr activo: \${formatear(qTrActivoExpediente?.tr_activo, " años", 2)}\`,
    \`Estación IDF: \${formatear(qTrActivoExpediente?.estacion_idf)}\`,
    \`Método IDF: \${formatear(qTrActivoExpediente?.metodo_idf)}\`,
    \`Distribución temporal: \${formatear(qTrActivoExpediente?.distribucion_temporal)}\`,
    \`Área: \${formatear(qTrActivoExpediente?.area_km2, " km²", 4)}\`,
    \`CN efectivo: \${formatear(qTrActivoExpediente?.cn_efectivo, "", 2)}\`,
    \`S: \${formatear(qTrActivoExpediente?.s_mm, " mm", 2)}\`,
    \`Ia: \${formatear(qTrActivoExpediente?.ia_mm, " mm", 2)}\`,
    \`Impermeabilidad: \${formatear(qTrActivoExpediente?.porcentaje_impermeable, " %", 2)}\`,
    \`Tc: \${formatear(qTrActivoExpediente?.tc_min, " min", 4)}\`,
    \`Pe total: \${formatear(qTrActivoExpediente?.lluvia_efectiva_total_mm, " mm", 4)}\`,
    \`Campos mínimos: \${faltantes.length > 0 ? "faltantes — " + faltantes.join(", ") : "completos"}\`,
    \`Fuente: \${normalizarTexto(estadoQTrActivoExpediente?.fuente)}\`,
    "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."
  ];
}
`;

fs.writeFileSync(rutaHelper, `${prefijo}\n\n${funcionCorregida.trim()}\n`, "utf8");

console.log("CORRECCION_OT_0164_HELPER_ESCENARIO_QTR_ACTIVO_OK");
