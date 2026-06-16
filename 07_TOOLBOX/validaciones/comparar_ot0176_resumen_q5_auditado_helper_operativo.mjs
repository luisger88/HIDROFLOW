import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { construirLineasResumenQ5AuditadoExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0176/OT-0176B_comparacion_helper_resumen_q5_auditado_operativo.md"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");

const tablaQ5MarkdownReferencia = [
  "| Método | Qp | Tp | Volumen |",
  "|---|---:|---:|---:|",
  "| SCS | 184.03 | 210 | 2654250.90 |"
];

const lineasDelegadas = construirLineasResumenQ5AuditadoExpediente({
  tablaQ5Markdown: tablaQ5MarkdownReferencia
});

const lineasOperativasReferencia = [
  "## 6. Resumen Q-5 auditado",
  "Estado general: diagnóstico no adoptivo.",
  "SCS Unit Hydrograph: candidato principal de referencia.",
  "SCS Mod.: variante ajustable.",
  "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  "Masa y volumen: controlados frente a referencia física.",
  "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  "",
  "Tabla Q-5 auditada:",
  ...tablaQ5MarkdownReferencia,
  "",
  ""
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
assert.equal(lineasDelegadas.length, lineasOperativasReferencia.length, "El bloque delegado debe tener la misma cantidad de líneas que la referencia");

assert.equal(
  textoComparador.includes("## 6. Resumen Q-5 auditado"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar el bloque operativo Resumen Q-5 auditado"
);

assert.equal(
  textoComparador.includes("...tablaQ5Markdown"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar tablaQ5Markdown operativo"
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

assert.equal(diferenciasEstrictas.length, 0, "El bloque delegado debe coincidir estrictamente con la referencia operativa controlada");

const lineasReporte = [
  "# OT-0176B — Comparación helper Resumen Q-5 auditado vs operativo",
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
    ? "- El helper coincide estrictamente con la referencia operativa controlada."
    : "- El helper no coincide estrictamente con la referencia operativa controlada.",
  "",
  "## Restricciones mantenidas",
  "",
  "- No se modificó `ComparadorMultiMetodo.jsx`.",
  "- No se reemplazó `textoExpediente`.",
  "- No se modificó botón.",
  "- No se modificó portapapeles.",
  "- No se tocó Q-5 operativo.",
  "- No se tocó Método Racional.",
  "- No se tocó diagnóstico Q(t).",
  "- No se tocó motor hidrológico.",
  "",
  "## Conclusión",
  "",
  diferenciasEstrictas.length === 0
    ? "El helper Resumen Q-5 auditado queda en coincidencia textual estricta con la referencia operativa controlada."
    : "El helper requiere revisión antes de cualquier integración diagnóstica."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log("COMPARACION_OT_0176_RESUMEN_Q5_AUDITADO_OK");
console.log(JSON.stringify(resumen, null, 2));
