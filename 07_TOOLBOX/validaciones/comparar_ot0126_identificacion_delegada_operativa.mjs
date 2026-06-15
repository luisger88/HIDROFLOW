import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { construirLineasIdentificacionExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0126/OT-0126B_comparacion_textual_identificacion_delegada_operativa.md"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");

const contextoBase = {
  cuencaNombre: "Quebrada La Iguaná - PC_80",
  area_km2: 46.8516,
  pendiente_media_pct: 8.43,
  longitud_cauce_km: 15.524,
  fuente: "HidroFlow"
};

const estacionIdfExpediente = "SAN CRISTOBAL";

const lineasDelegadas = construirLineasIdentificacionExpediente({
  contextoBase,
  fuenteFallback: "HidroFlow",
  estacionIdfFallback: estacionIdfExpediente
});

const areaKm2 = Number(contextoBase?.area_km2);

const lineasOperativasReferencia = [
  "## 1. Identificación",
  `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
  `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
  `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
  `Estación IDF: ${estacionIdfExpediente}`,
  `Pendiente media: ${
    Number.isFinite(Number(contextoBase?.pendiente_media_pct))
      ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %"
      : "—"
  }`,
  `Longitud cauce principal: ${
    Number.isFinite(Number(contextoBase?.longitud_cauce_km))
      ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km"
      : "—"
  }`
];

const residuosTecnicos = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

function normalizarTexto(texto) {
  return String(texto)
    .replace(/\s+/g, " ")
    .trim();
}

function sinUnidadesBasicas(texto) {
  return normalizarTexto(texto)
    .replace(/ km²/g, "")
    .replace(/ %/g, "")
    .replace(/ km/g, "");
}

function compararLinea(indice, delegada, operativa) {
  const igualEstricta = delegada === operativa;
  const igualSinUnidades = sinUnidadesBasicas(delegada) === sinUnidadesBasicas(operativa);

  return {
    linea: indice + 1,
    delegada,
    operativa,
    igualEstricta,
    igualSinUnidades,
    diferencia: igualEstricta
      ? "Sin diferencia"
      : igualSinUnidades
      ? "Diferencia de unidades/formato"
      : "Diferencia textual"
  };
}

assert.equal(
  Array.isArray(lineasDelegadas),
  true,
  "El bloque delegado debe retornar arreglo"
);

assert.equal(
  lineasDelegadas.length,
  7,
  "El bloque delegado debe retornar 7 líneas"
);

assert.equal(
  lineasOperativasReferencia.length,
  7,
  "El bloque operativo de referencia debe tener 7 líneas"
);

assert.equal(
  lineasDelegadas[0],
  "## 1. Identificación",
  "El bloque delegado debe conservar el encabezado"
);

assert.equal(
  lineasOperativasReferencia[0],
  "## 1. Identificación",
  "El bloque operativo debe conservar el encabezado"
);

assert.equal(
  textoComparador.includes("## 1. Identificación"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar el bloque operativo de Identificación"
);

assert.equal(
  textoComparador.includes("construirLineasIdentificacionExpediente"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar la integración diagnóstica delegada"
);

assert.equal(
  textoComparador.includes("const textoExpediente = ["),
  true,
  "ComparadorMultiMetodo.jsx debe conservar el armado operativo de textoExpediente"
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

const textoDelegado = lineasDelegadas.join("\n");
const textoOperativo = lineasOperativasReferencia.join("\n");

const residuosDelegado = residuosTecnicos.filter((token) =>
  textoDelegado.includes(token)
);

const residuosOperativo = residuosTecnicos.filter((token) =>
  textoOperativo.includes(token)
);

assert.equal(
  residuosDelegado.length,
  0,
  "El bloque delegado no debe contener residuos técnicos"
);

assert.equal(
  residuosOperativo.length,
  0,
  "El bloque operativo de referencia no debe contener residuos técnicos"
);

const comparacion = lineasDelegadas.map((lineaDelegada, indice) =>
  compararLinea(indice, lineaDelegada, lineasOperativasReferencia[indice])
);

const diferenciasEstrictas = comparacion.filter((item) => !item.igualEstricta);

const diferenciasTextualesFuertes = comparacion.filter(
  (item) => !item.igualEstricta && !item.igualSinUnidades
);

const resumen = {
  lineasDelegadas: lineasDelegadas.length,
  lineasOperativas: lineasOperativasReferencia.length,
  coincidenciasEstrictas: comparacion.filter((item) => item.igualEstricta).length,
  diferenciasEstrictas: diferenciasEstrictas.length,
  diferenciasTextualesFuertes: diferenciasTextualesFuertes.length,
  residuosDelegado,
  residuosOperativo,
  textoExpedienteNoSustituido: textoComparador.includes("const textoExpediente = ["),
  portapapelesSigueUsandoTextoExpediente: textoComparador.includes("areaTexto.value = textoExpediente"),
  fallbackManualSigueUsandoTextoExpediente: textoComparador.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)")
};

const lineasReporte = [
  "# OT-0126B — Comparación textual Identificación delegada vs operativa",
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
  diferenciasTextualesFuertes.length === 0
    ? "- Las diferencias detectadas son compatibles con formato/unidades, no con pérdida de contenido esencial."
    : "- Existen diferencias textuales fuertes que requieren revisión antes de cualquier sustitución.",
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
  "La comparación queda documentada para decidir, en una OT posterior, si procede ajustar el helper o adoptar parcialmente el bloque delegado."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log("COMPARACION_OT_0126_IDENTIFICACION_OK");
console.log(JSON.stringify(resumen, null, 2));
