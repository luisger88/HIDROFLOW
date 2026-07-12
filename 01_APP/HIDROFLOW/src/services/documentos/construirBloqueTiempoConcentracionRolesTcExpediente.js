import { formatTc } from "../../utils/formatters";

function formatearTcDocumental(valor) {
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

  if (!Number.isFinite(numero)) {
    return "—";
  }

  return `${formatTc(numero)} min`;
}

function normalizarTrDocumental(valor) {
  if (valor === undefined || valor === null) {
    return "—";
  }

  if (typeof valor === "string") {
    const texto = valor.trim();
    return texto.length > 0 ? texto : "—";
  }

  if (typeof valor === "number") {
    return Number.isFinite(valor) ? String(valor) : "—";
  }

  return "—";
}

export function construirBloqueTiempoConcentracionRolesTcExpediente({
  Tc_final = null,
  trDisenoActivoExpediente = null,
  incluirTitulo = true
} = {}) {
  const lineas = [];

  if (incluirTitulo) {
    lineas.push("## 3. Tiempo de concentración y roles Tc");
  }

  lineas.push(
    `Tc comparador: ${formatearTcDocumental(Tc_final)}`,
    `Tr global activo: ${normalizarTrDocumental(trDisenoActivoExpediente)} años`,
    "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
    "Roles Tc:",
    "- Tc global Índice: referencia hidrológica general.",
    "- Tc operativo Q(t): ruta interna del hidrograma.",
    "- Duración evento: 3 h para almacenamiento/regulación.",
    "- Lag / forma SCS: parámetro derivado para forma temporal.",
    "- Tc comparador: referencia especializada para coherencia Q-5.",
"",
"¿Qué valida?: la velocidad de respuesta hidrológica de la cuenca.",
"¿Qué concluye?: el Tc adoptado como referencia temporal del escenario.",
"Salida del bloque: el Tc establecido permite interpretar la respuesta temporal de la cuenca y constituye la referencia para evaluar el volumen esperado y los resultados hidrológicos posteriores."
);

  return lineas;
}

export default construirBloqueTiempoConcentracionRolesTcExpediente;
