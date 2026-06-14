// OT-0087B — Helper puro para construir sección exportable de diagnóstico temporal Q(t).
// No recibe qSeries cruda, no recalcula métricas, no reconstruye Q(t), no interpola y no adopta métodos.

function textoSeguro(valor, fallback = "—") {
  const texto = String(valor ?? "").trim();
  return texto || fallback;
}

function numeroSeguro(valor, decimales = 2, unidad = "") {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) return "—";

  return `${numero.toLocaleString("es-CO", {
    maximumFractionDigits: decimales
  })}${unidad}`;
}

function listaLineas(items = []) {
  return Array.isArray(items) && items.length > 0
    ? items.map((item) => `- ${item}`).join("\n")
    : "- Sin información disponible.";
}

function buscarPorMetodo(filas = [], metodo) {
  return Array.isArray(filas)
    ? filas.find((fila) => fila?.metodo === metodo) ?? null
    : null;
}

export default function construirSeccionDiagnosticoTemporalQt({
  filasMorfologiaQt = [],
  filasDictamenFormaQt = [],
  filasRiesgoTemporalQt = [],
  sintesisRiesgoTemporalQt = null
} = {}) {
  const tieneMorfologia = Array.isArray(filasMorfologiaQt) && filasMorfologiaQt.length > 0;
  const tieneForma = Array.isArray(filasDictamenFormaQt) && filasDictamenFormaQt.length > 0;
  const tieneRiesgo = Array.isArray(filasRiesgoTemporalQt) && filasRiesgoTemporalQt.length > 0;
  const tieneSintesis =
    sintesisRiesgoTemporalQt &&
    Array.isArray(sintesisRiesgoTemporalQt?.resumen) &&
    sintesisRiesgoTemporalQt.resumen.length > 0;

  if (!tieneMorfologia && !tieneForma && !tieneRiesgo && !tieneSintesis) {
    return {
      ok: false,
      texto: [
        "## Diagnóstico temporal Q(t) no adoptivo",
        "",
        "No hay información temporal suficiente para construir la sección exportable.",
        "",
        "Restricción: esta sección no reconstruye Q(t), no interpola, no adopta métodos y no levanta el estado global No coherente."
      ].join("\n"),
      advertencias: [
        "Diagnóstico temporal no adoptivo.",
        "No hay filas temporales suficientes.",
        "No selecciona método.",
        "No levanta No coherente."
      ]
    };
  }

  const resumenSintesis = tieneSintesis
    ? sintesisRiesgoTemporalQt.resumen
    : ["No hay síntesis ejecutiva temporal disponible."];

  const niveles = sintesisRiesgoTemporalQt?.niveles ?? {
    alto: 0,
    medio: 0,
    bajo: 0,
    noDeterminado: 0
  };

  const metodos = Array.from(
    new Set([
      ...filasMorfologiaQt.map((fila) => fila?.metodo).filter(Boolean),
      ...filasDictamenFormaQt.map((fila) => fila?.metodo).filter(Boolean),
      ...filasRiesgoTemporalQt.map((fila) => fila?.metodo).filter(Boolean)
    ])
  );

  const lecturaPorMetodo = metodos.map((metodo) => {
    const morfologia = buscarPorMetodo(filasMorfologiaQt, metodo);
    const forma = buscarPorMetodo(filasDictamenFormaQt, metodo);
    const riesgo = buscarPorMetodo(filasRiesgoTemporalQt, metodo);

    return [
      `### ${textoSeguro(metodo, "Método Q(t)")}`,
      "",
      `- Estado métrico: ${textoSeguro(morfologia?.estado)}.`,
      `- Qp desde qSeries: ${numeroSeguro(morfologia?.Qp, 2, " m³/s")}.`,
      `- tPico desde qSeries: ${numeroSeguro(morfologia?.tPico, 2, " min")}.`,
      `- Duración efectiva De: ${numeroSeguro(morfologia?.duracionEfectivaMin, 2, " min")}.`,
      `- Ascenso: ${numeroSeguro(morfologia?.tiempoAscensoMin, 2, " min")}.`,
      `- Receso: ${numeroSeguro(morfologia?.tiempoRecesoMin, 2, " min")}.`,
      `- W50 observado: ${numeroSeguro(morfologia?.W50Min, 2, " min")}.`,
      `- W25 observado: ${numeroSeguro(morfologia?.W25Min, 2, " min")}.`,
      `- Asimetría receso/ascenso: ${numeroSeguro(morfologia?.asimetriaAscensoReceso, 3)}.`,
      `- Forma temporal: ${textoSeguro(forma?.forma)}.`,
      `- Alerta de forma: ${textoSeguro(forma?.alerta)}.`,
      `- Severidad de forma: ${textoSeguro(forma?.severidad)}.`,
      `- Riesgo temporal: ${textoSeguro(riesgo?.riesgo)}.`,
      `- Nivel de riesgo: ${textoSeguro(riesgo?.nivel)}.`,
      `- Factor dominante: ${textoSeguro(riesgo?.factorDominante)}.`,
      "",
      "Lectura: diagnóstico temporal no adoptivo; no constituye selección de método ni decisión hidráulica final."
    ].join("\n");
  });

  const texto = [
    "## Diagnóstico temporal Q(t) no adoptivo",
    "",
    "### Alcance",
    "",
    "Esta sección consolida métricas morfológicas, dictamen de forma, riesgo temporal y síntesis ejecutiva derivados de qSeries reales publicadas y validadas.",
    "",
    "La sección es diagnóstica y no adoptiva. No selecciona método, no modifica caudales, no reconstruye Q(t), no interpola y no levanta el estado global No coherente.",
    "",
    "### Síntesis ejecutiva temporal",
    "",
    `- Riesgo alto: ${Number(niveles?.alto ?? 0)}.`,
    `- Riesgo medio: ${Number(niveles?.medio ?? 0)}.`,
    `- Riesgo bajo: ${Number(niveles?.bajo ?? 0)}.`,
    `- No determinado: ${Number(niveles?.noDeterminado ?? 0)}.`,
    "",
    listaLineas(resumenSintesis),
    "",
    "### Lectura temporal por método",
    "",
    lecturaPorMetodo.length > 0
      ? lecturaPorMetodo.join("\n\n")
      : "No hay lectura temporal por método disponible.",
    "",
    "### Restricciones de interpretación",
    "",
    "- Diagnóstico temporal no adoptivo.",
    "- No selecciona automáticamente ningún método.",
    "- No levanta el estado global No coherente.",
    "- No reemplaza revisión hidrológica profesional.",
    "- No modifica Qp, Tp, Volumen ni Q(t).",
    "- No usa qSeries cruda en la construcción textual de esta sección.",
    "- No reconstruye Q(t) ni interpola series.",
    "",
    "### Dictamen",
    "",
    "La información anterior permite consolidar una lectura temporal ejecutiva y trazable, pero no constituye adopción hidrológica ni decisión hidráulica final."
  ].join("\n");

  return {
    ok: true,
    texto,
    advertencias: [
      "Diagnóstico temporal no adoptivo.",
      "No selecciona método.",
      "No levanta No coherente.",
      "No reemplaza revisión hidrológica profesional."
    ]
  };
}