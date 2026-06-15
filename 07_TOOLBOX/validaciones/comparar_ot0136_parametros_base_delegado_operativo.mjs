import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { construirLineasParametrosHidrologicosBaseExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0136/OT-0136B_comparacion_textual_parametros_base.md"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");

const contextoBase = {
  CN: 88,
  CN_base: 82,
  CN_efectivo: 88,
  AMC: "II"
};

const lineasDelegadas = construirLineasParametrosHidrologicosBaseExpediente({
  contextoBase
});

const lineasOperativasReferencia = [
  "## 2. Parámetros hidrológicos base",
  `CN: ${contextoBase?.CN ?? "—"}`,
  `CN base: ${contextoBase?.CN_base ?? "—"}`,
  `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`,
  `AMC: ${contextoBase?.AMC ?? "—"}`
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

assert.equal(
  Array.isArray(lineasDelegadas),
  true,
  "El bloque delegado debe retornar arreglo"
);

assert.equal(
  lineasDelegadas.length,
  5,
  "El bloque delegado debe retornar 5 líneas"
);

assert.equal(
  lineasOperativasReferencia.length,
  5,
  "El bloque operativo de referencia debe tener 5 líneas"
);

assert.equal(
  textoComparador.includes("## 2. Parámetros hidrológicos base"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar el bloque operativo de Parámetros base"
);

assert.equal(
  textoComparador.includes("construirLineasParametrosHidrologicosBaseExpediente"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar la integración diagnóstica del helper"
);

assert.equal(
  textoComparador.includes("const textoExpediente = ["),
  true,
  "ComparadorMultiMetodo.jsx debe conservar textoExpediente"
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
  "# OT-0136B — Comparación textual Parámetros base delegado vs operativo",
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
    ? "El bloque Parámetros hidrológicos base delegado queda en coincidencia textual estricta con la referencia operativa controlada."
    : "El bloque requiere revisión antes de cualquier sustitución."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log("COMPARACION_OT_0136_PARAMETROS_BASE_OK");
console.log(JSON.stringify(resumen, null, 2));
