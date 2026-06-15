import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { construirLineasTiempoConcentracionRolesTcExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const rutaReporte = path.resolve(
  "00_ADMIN/bitacora/OT-0147/OT-0147B_comparacion_textual_tiempo_concentracion.md"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");

const contextoReferencia = {
  Tc_final: 114.23,
  trDisenoActivoExpediente: 100
};

const lineasDelegadas =
  construirLineasTiempoConcentracionRolesTcExpediente(contextoReferencia);

const lineasOperativasReferencia = [
  "## 3. Tiempo de concentración y roles Tc",
  "Tc comparador: 114.2 min",
  "Tr global activo: 100 años",
  "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  "Roles Tc:",
  "- Tc global Índice: referencia hidrológica general.",
  "- Tc operativo Q(t): ruta interna del hidrograma.",
  "- Duración evento: 3 h para almacenamiento/regulación.",
  "- Lag / forma SCS: parámetro derivado para forma temporal.",
  "- Tc comparador: referencia especializada para coherencia Q-5."
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
  10,
  "El bloque delegado debe retornar 10 líneas"
);

assert.equal(
  lineasOperativasReferencia.length,
  10,
  "El bloque operativo de referencia debe tener 10 líneas"
);

assert.equal(
  textoComparador.includes("## 3. Tiempo de concentración y roles Tc"),
  true,
  "ComparadorMultiMetodo.jsx debe conservar el bloque operativo de Tiempo de concentración"
);

assert.equal(
  textoComparador.includes("construirLineasTiempoConcentracionRolesTcExpediente"),
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
  "# OT-0147B — Comparación textual Tiempo de concentración delegado vs operativo",
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
    ? "El bloque Tiempo de concentración delegado queda en coincidencia textual estricta con la referencia operativa controlada."
    : "El bloque requiere revisión antes de cualquier sustitución."
];

fs.writeFileSync(rutaReporte, lineasReporte.join("\n"), "utf8");

console.log("COMPARACION_OT_0147_TIEMPO_CONCENTRACION_OK");
console.log(JSON.stringify(resumen, null, 2));
