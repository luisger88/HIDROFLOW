import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { construirLineasEscenarioQTrActivoExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0167/OT-0167B_comparacion_textual_escenario_qtr_activo.md"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");

const formatearValorQTrExpediente = (valor, unidad = "", decimales) => {
  if (valor === undefined || valor === null) return "—";
  if (typeof valor === "string" && valor.trim().length === 0) return "—";
  if (typeof valor === "object") return "—";

  const numero = Number(valor);

  if (Number.isFinite(numero) && typeof decimales === "number") {
    return `${numero.toFixed(decimales)}${unidad}`;
  }

  if (Number.isFinite(numero) && typeof valor === "number") {
    return `${numero}${unidad}`;
  }

  if (typeof valor === "string") {
    return valor;
  }

  return "—";
};

const contextoReferencia = {
  estadoQTrActivoExpediente: {
    estado: "publicado",
    fuente: "qtr-activo"
  },
  qTrActivoExpediente: {
    tr_activo: 100,
    estacion_idf: "San Cristóbal",
    metodo_idf: "IDF ponderada",
    distribucion_temporal: "SCS Tipo II",
    area_km2: 46.8516,
    cn_efectivo: 86.12,
    s_mm: 40.93,
    ia_mm: 8.19,
    porcentaje_impermeable: 12,
    tc_min: 114.2345,
    lluvia_efectiva_total_mm: 56.6543
  },
  faltantesQTrActivoExpediente: [],
  formatearValorQTrExpediente
};

const lineasDelegadas =
  construirLineasEscenarioQTrActivoExpediente(contextoReferencia);

const lineasOperativasReferencia = [
  "## 5. Escenario Q-Tr activo — control de trazabilidad",
  "Estado: publicado",
  "Tr activo: 100.00 años",
  "Estación IDF: San Cristóbal",
  "Método IDF: IDF ponderada",
  "Distribución temporal: SCS Tipo II",
  "Área: 46.8516 km²",
  "CN efectivo: 86.12",
  "S: 40.93 mm",
  "Ia: 8.19 mm",
  "Impermeabilidad: 12.00 %",
  "Tc: 114.2345 min",
  "Pe total: 56.6543 mm",
  "Campos mínimos: completos",
  "Fuente: qtr-activo",
  "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."
];

const residuosTecnicos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

function compararLinea(indice, delegada, operativa) {
  const igualEstricta = delegada === operativa;

  return {
    linea: indice + 1,
    delegada,
    operativa,
    igualEstricta,
    diferencia: igualEstricta ? "Sin diferencia" : "Diferencia textual"
  };
}

assert.equal(Array.isArray(lineasDelegadas), true, "El bloque delegado debe retornar arreglo");
assert.equal(lineasDelegadas.length, 16, "El bloque delegado debe retornar 16 líneas");
assert.equal(lineasOperativasReferencia.length, 16, "El bloque operativo de referencia debe tener 16 líneas");

assert.equal(
  textoComparador.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar el bloque operativo Escenario Q-Tr activo"
);

assert.equal(
  textoComparador.includes("construirLineasEscenarioQTrActivoExpediente"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar la integración diagnóstica del helper"
);

assert.equal(
  textoComparador.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse textoExpediente"
);

assert.equal(
  textoComparador.includes("areaTexto.value = textoExpediente"),
  true,
  "El portapapeles debe seguir usando textoExpediente"
);

assert.equal(
  textoComparador.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  true,
  "El fallback manual debe seguir usando textoExpediente"
);

assert.equal(
  textoComparador.includes("navigator.clipboard"),
  false,
  "No debe introducirse navigator.clipboard"
);

assert.equal(
  textoComparador.includes("writeText"),
  false,
  "No debe introducirse writeText"
);

const textoDelegado = lineasDelegadas.join("\n");
const textoOperativo = lineasOperativasReferencia.join("\n");

const residuosDelegado = residuosTecnicos.filter((token) =>
  textoDelegado.includes(token)
);

const residuosOperativo = residuosTecnicos.filter((token) =>
  textoOperativo.includes(token)
);

assert.equal(residuosDelegado.length, 0, "El bloque delegado no debe contener residuos técnicos");
assert.equal(residuosOperativo.length, 0, "El bloque operativo de referencia no debe contener residuos técnicos");

const comparacion = lineasDelegadas.map((lineaDelegada, indice) =>
  compararLinea(indice, lineaDelegada, lineasOperativasReferencia[indice])
);

const diferenciasEstrictas = comparacion.filter((item) => !item.igualEstricta);

const resumen = {
  lineasDelegadas: lineasDelegadas.length,
  lineasOperativas: lineasOperativasReferencia.length,
  coincidenciasEstrictas: comparacion.filter((item) => item.igualEstricta).length,
  diferenciasEstrictas: diferenciasEstrictas.length,
  residuosDelegado,
  residuosOperativo,
  textoExpedienteNoSustituido: textoComparador.includes("const textoExpediente = ["),
  portapapelesSigueUsandoTextoExpediente: textoComparador.includes("areaTexto.value = textoExpediente"),
  fallbackManualSigueUsandoTextoExpediente: textoComparador.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)")
};

const lineasReporte = [
  "# OT-0167B — Comparación textual Escenario Q-Tr activo delegado vs operativo",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Bloque delegado",
  "",
  "```text",
  textoDelegado,
  "```",
  "",
  "## Bloque operativo de referencia",
  "",
  "```text",
  textoOperativo,
  "```",
  "",
  "## Comparación línea a línea",
  "",
  "| Línea | Delegada | Operativa | Resultado |",
  "|---:|---|---|---|",
  ...comparacion.map((item) =>
    `| ${item.linea} | \`${item.delegada}\` | \`${item.operativa}\` | ${item.diferencia} |`
  ),
  "",
  "## Lectura técnica",
  "",
  diferenciasEstrictas.length === 0
    ? "- El bloque delegado coincide estrictamente con el bloque operativo de referencia."
    : "- El bloque delegado no coincide estrictamente con el bloque operativo de referencia.",
  "",
  "## Restricciones mantenidas",
  "",
  "- No se modificó `ComparadorMultiMetodo.jsx`.",
  "- No se reemplazó `textoExpediente`.",
  "- No se modificó botón.",
  "- No se modificó portapapeles.",
  "- No se tocó Q-5.",
  "- No se tocó Método Racional.",
  "- No se tocó diagnóstico Q(t).",
  "- No se tocó motor hidrológico.",
  "",
  "## Conclusión",
  "",
  diferenciasEstrictas.length === 0
    ? "El bloque Escenario Q-Tr activo delegado queda en coincidencia textual estricta con la referencia operativa controlada."
    : "El bloque requiere revisión antes de cualquier sustitución."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log("COMPARACION_OT_0167_ESCENARIO_QTR_ACTIVO_OK");
console.log(JSON.stringify(resumen, null, 2));
