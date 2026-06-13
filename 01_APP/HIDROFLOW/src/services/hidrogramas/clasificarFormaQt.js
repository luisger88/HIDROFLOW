// OT-0084B — Helper puro de clasificación diagnóstica de forma Q(t).
// Recibe métricas morfológicas ya calculadas.
// No recibe qSeries cruda, no recalcula Q(t), no interpola y no adopta métodos.

function numeroFinito(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function construirRespuesta({
  ok = true,
  forma = "No clasificable",
  alerta = "Sin dictamen",
  severidad = "No determinada",
  comentario = "Diagnóstico no adoptivo.",
  banderas = []
}) {
  return {
    ok,
    forma,
    alerta,
    severidad,
    comentario,
    banderas
  };
}

export default function clasificarFormaQt(metricas = {}) {
  const duracionEfectivaMin = numeroFinito(metricas?.duracionEfectivaMin);
  const tiempoAscensoMin = numeroFinito(metricas?.tiempoAscensoMin);
  const tiempoRecesoMin = numeroFinito(metricas?.tiempoRecesoMin);
  const W50Min = numeroFinito(metricas?.W50Min);
  const W25Min = numeroFinito(metricas?.W25Min);
  const asimetriaAscensoReceso = numeroFinito(metricas?.asimetriaAscensoReceso);
  const Qp = numeroFinito(metricas?.Qp);
  const tPico = numeroFinito(metricas?.tPico);

  const camposMinimos = [
    duracionEfectivaMin,
    tiempoAscensoMin,
    tiempoRecesoMin,
    asimetriaAscensoReceso,
    Qp,
    tPico
  ];

  if (camposMinimos.some((valor) => valor === null)) {
    return construirRespuesta({
      ok: false,
      forma: "No clasificable",
      alerta: "Métricas insuficientes",
      severidad: "No determinada",
      comentario:
        "No hay métricas morfológicas suficientes para clasificar la forma Q(t). Diagnóstico no adoptivo.",
      banderas: ["metricas_insuficientes"]
    });
  }

  if (
    duracionEfectivaMin <= 0 ||
    tiempoAscensoMin < 0 ||
    tiempoRecesoMin < 0 ||
    Qp <= 0 ||
    tPico < 0
  ) {
    return construirRespuesta({
      ok: false,
      forma: "No clasificable",
      alerta: "Métricas no físicas",
      severidad: "Alta",
      comentario:
        "Las métricas disponibles no cumplen condiciones físicas mínimas para clasificar la forma Q(t). Diagnóstico no adoptivo.",
      banderas: ["metricas_no_fisicas"]
    });
  }

  const banderas = [];

  const recesoDominante = asimetriaAscensoReceso >= 3;
  const recesoMuyDominante = asimetriaAscensoReceso >= 6;
  const recesoExtremo = asimetriaAscensoReceso >= 10;

  const ascensoAbrupto =
    tiempoAscensoMin > 0 &&
    duracionEfectivaMin > 0 &&
    tiempoAscensoMin / duracionEfectivaMin <= 0.12;

  const duracionProlongada =
    duracionEfectivaMin >= 1000 ||
    (tiempoRecesoMin >= 800 && asimetriaAscensoReceso >= 4);

  const persistenciaAlta =
    W25Min !== null &&
    duracionEfectivaMin > 0 &&
    W25Min / duracionEfectivaMin >= 0.25;

  const nucleoAncho =
    W50Min !== null &&
    duracionEfectivaMin > 0 &&
    W50Min / duracionEfectivaMin >= 0.15;

  const picoTemprano =
    tPico >= 0 &&
    duracionEfectivaMin > 0 &&
    tPico / duracionEfectivaMin <= 0.15;

  if (recesoDominante) banderas.push("receso_dominante");
  if (recesoMuyDominante) banderas.push("receso_muy_dominante");
  if (recesoExtremo) banderas.push("receso_extremo");
  if (ascensoAbrupto) banderas.push("ascenso_abrupto");
  if (duracionProlongada) banderas.push("duracion_prolongada");
  if (persistenciaAlta) banderas.push("persistencia_alta");
  if (nucleoAncho) banderas.push("nucleo_ancho");
  if (picoTemprano) banderas.push("pico_temprano");

  if (recesoExtremo && ascensoAbrupto) {
    return construirRespuesta({
      forma: "Forma abrupta altamente asimétrica",
      alerta: "Ascenso muy corto y receso extremo",
      severidad: "Alta",
      comentario:
        "La forma Q(t) presenta ascenso muy corto frente a una recesión dominante extrema. Diagnóstico no adoptivo; requiere interpretación hidrológica posterior.",
      banderas
    });
  }

  if (recesoMuyDominante && duracionProlongada) {
    return construirRespuesta({
      forma: "Forma prolongada con receso dominante",
      alerta: "Recesión extensa",
      severidad: "Alta",
      comentario:
        "La duración efectiva y la relación receso/ascenso indican una respuesta prolongada dominada por la recesión. Diagnóstico no adoptivo.",
      banderas
    });
  }

  if (recesoMuyDominante) {
    return construirRespuesta({
      forma: "Forma altamente asimétrica",
      alerta: "Receso muy dominante",
      severidad: "Alta",
      comentario:
        "El receso supera ampliamente el tiempo de ascenso. La forma temporal debe interpretarse con cautela antes de cualquier decisión técnica. Diagnóstico no adoptivo.",
      banderas
    });
  }

  if (duracionProlongada) {
    return construirRespuesta({
      forma: "Forma prolongada",
      alerta: "Duración efectiva alta",
      severidad: "Media",
      comentario:
        "La duración efectiva del hidrograma es alta frente al tiempo de respuesta principal. Diagnóstico no adoptivo.",
      banderas
    });
  }

  if (ascensoAbrupto && picoTemprano) {
    return construirRespuesta({
      forma: "Forma abrupta",
      alerta: "Pico temprano",
      severidad: "Media",
      comentario:
        "El hidrograma concentra la respuesta en un ascenso relativamente corto y un pico temprano. Diagnóstico no adoptivo.",
      banderas
    });
  }

  if (recesoDominante) {
    return construirRespuesta({
      forma: "Forma recesiva",
      alerta: "Receso dominante",
      severidad: "Media",
      comentario:
        "El receso domina sobre el ascenso, aunque sin alcanzar umbrales extremos. Diagnóstico no adoptivo.",
      banderas
    });
  }

  if (nucleoAncho || persistenciaAlta) {
    return construirRespuesta({
      forma: "Forma persistente",
      alerta: "Ancho temporal significativo",
      severidad: "Media",
      comentario:
        "Los anchos W50 o W25 sugieren persistencia temporal de caudales significativos. Diagnóstico no adoptivo.",
      banderas
    });
  }

  return construirRespuesta({
    forma: "Forma moderada",
    alerta: "Sin alerta morfológica dominante",
    severidad: "Baja",
    comentario:
      "Las métricas no evidencian una alerta morfológica dominante bajo los criterios preliminares. Diagnóstico no adoptivo.",
    banderas
  });
}