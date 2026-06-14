// OT-0085B — Helper puro de riesgo temporal Q(t).
// Recibe métricas y dictamen de forma ya calculados.
// No recibe qSeries cruda, no reconstruye Q(t), no interpola y no adopta métodos.

function numeroFinito(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function listaBanderas(banderas) {
  return Array.isArray(banderas) ? banderas.filter(Boolean) : [];
}

function tieneBandera(banderas, nombre) {
  return listaBanderas(banderas).includes(nombre);
}

function construirRespuesta({
  ok = true,
  riesgo = "No determinado",
  nivel = "No determinado",
  factorDominante = "Sin factor dominante",
  comentario = "Diagnóstico comparativo no adoptivo.",
  banderasRiesgo = []
}) {
  return {
    ok,
    riesgo,
    nivel,
    factorDominante,
    comentario,
    banderasRiesgo
  };
}

export default function evaluarRiesgoTemporalQt(entrada = {}) {
  const forma = String(entrada?.forma ?? "");
  const alerta = String(entrada?.alerta ?? "");
  const severidad = String(entrada?.severidad ?? "");
  const banderas = listaBanderas(entrada?.banderas);

  const duracionEfectivaMin = numeroFinito(entrada?.duracionEfectivaMin);
  const tiempoAscensoMin = numeroFinito(entrada?.tiempoAscensoMin);
  const tiempoRecesoMin = numeroFinito(entrada?.tiempoRecesoMin);
  const W50Min = numeroFinito(entrada?.W50Min);
  const W25Min = numeroFinito(entrada?.W25Min);
  const asimetriaAscensoReceso = numeroFinito(entrada?.asimetriaAscensoReceso);
  const Qp = numeroFinito(entrada?.Qp);
  const tPico = numeroFinito(entrada?.tPico);

  if (!forma || !alerta || !severidad) {
    return construirRespuesta({
      ok: false,
      riesgo: "No clasificable",
      nivel: "No determinado",
      factorDominante: "Dictamen de forma insuficiente",
      comentario:
        "No existe dictamen de forma suficiente para evaluar riesgo temporal. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo: ["dictamen_forma_insuficiente"]
    });
  }

  const recesoDominante = tieneBandera(banderas, "receso_dominante");
  const recesoMuyDominante = tieneBandera(banderas, "receso_muy_dominante");
  const recesoExtremo = tieneBandera(banderas, "receso_extremo");
  const ascensoAbrupto = tieneBandera(banderas, "ascenso_abrupto");
  const duracionProlongada = tieneBandera(banderas, "duracion_prolongada");
  const persistenciaAlta = tieneBandera(banderas, "persistencia_alta");
  const nucleoAncho = tieneBandera(banderas, "nucleo_ancho");
  const picoTemprano = tieneBandera(banderas, "pico_temprano");

  const banderasRiesgo = [];

  if (recesoExtremo) banderasRiesgo.push("riesgo_asimetria_extrema");
  if (recesoMuyDominante || duracionProlongada) banderasRiesgo.push("riesgo_recesion_prolongada");
  if (ascensoAbrupto) banderasRiesgo.push("riesgo_ascenso_abrupto");
  if (picoTemprano) banderasRiesgo.push("riesgo_pico_temprano");
  if (persistenciaAlta || nucleoAncho) banderasRiesgo.push("riesgo_persistencia_temporal");

  if (recesoExtremo && ascensoAbrupto) {
    return construirRespuesta({
      riesgo: "Asimetría extrema con concentración abrupta",
      nivel: "Alto",
      factorDominante: "Receso extremo y ascenso abrupto",
      comentario:
        "La forma temporal combina ascenso muy corto con receso extremo. Este riesgo es comparativo y no adopta método ni levanta el estado global No coherente.",
      banderasRiesgo
    });
  }

  if (recesoMuyDominante && duracionProlongada) {
    return construirRespuesta({
      riesgo: "Recesión prolongada dominante",
      nivel: "Alto",
      factorDominante: "Duración efectiva alta y receso dominante",
      comentario:
        "La respuesta temporal se prolonga por una recesión dominante. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo
    });
  }

  if (recesoExtremo) {
    return construirRespuesta({
      riesgo: "Asimetría extrema",
      nivel: "Alto",
      factorDominante: "Relación receso/ascenso extrema",
      comentario:
        "La asimetría temporal alcanza un nivel extremo bajo los criterios preliminares. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo
    });
  }

  if (recesoMuyDominante) {
    return construirRespuesta({
      riesgo: "Recesión muy dominante",
      nivel: "Alto",
      factorDominante: "Receso muy superior al ascenso",
      comentario:
        "El tiempo de receso domina ampliamente la respuesta temporal. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo
    });
  }

  if (ascensoAbrupto && picoTemprano) {
    return construirRespuesta({
      riesgo: "Pico temprano con ascenso abrupto",
      nivel: "Medio",
      factorDominante: "Concentración temprana de la respuesta",
      comentario:
        "La respuesta concentra el ascenso y el pico en una fase temprana. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo
    });
  }

  if (duracionProlongada) {
    return construirRespuesta({
      riesgo: "Duración efectiva prolongada",
      nivel: "Medio",
      factorDominante: "Extensión temporal del hidrograma",
      comentario:
        "La duración efectiva sugiere persistencia temporal relevante. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo
    });
  }

  if (persistenciaAlta || nucleoAncho) {
    return construirRespuesta({
      riesgo: "Persistencia temporal significativa",
      nivel: "Medio",
      factorDominante: "Anchos W50/W25 relevantes",
      comentario:
        "Los anchos temporales sugieren permanencia de caudales significativos. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo
    });
  }

  if (recesoDominante) {
    return construirRespuesta({
      riesgo: "Receso dominante moderado",
      nivel: "Medio",
      factorDominante: "Receso mayor que ascenso",
      comentario:
        "La recesión domina la forma temporal, sin alcanzar umbrales extremos. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo
    });
  }

  if (
    severidad === "Baja" &&
    asimetriaAscensoReceso !== null &&
    asimetriaAscensoReceso < 3 &&
    duracionEfectivaMin !== null &&
    Qp !== null &&
    tPico !== null
  ) {
    return construirRespuesta({
      riesgo: "Riesgo temporal bajo",
      nivel: "Bajo",
      factorDominante: "Sin alerta temporal dominante",
      comentario:
        "No se identifica un factor temporal dominante bajo los criterios preliminares. Diagnóstico comparativo no adoptivo.",
      banderasRiesgo
    });
  }

  return construirRespuesta({
    riesgo: "Riesgo temporal moderado no específico",
    nivel: severidad === "Alta" ? "Alto" : severidad === "Media" ? "Medio" : "Bajo",
    factorDominante: alerta || "Forma temporal sin factor dominante",
    comentario:
      "El riesgo temporal se deriva del dictamen de forma disponible. Diagnóstico comparativo no adoptivo.",
    banderasRiesgo
  });
}