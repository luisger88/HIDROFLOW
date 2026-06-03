// src/data/matrizCompetenciaComparador.js

import {
  metodosTcCatalogo,
  metodosQCatalogo,
} from "./metodosComparadorCatalogo";

const UMBRALES = {
  areaCuencaPequenaKm2: 5,
  areaCuencaMedianaKm2: 50,
  pendienteAltaPct: 10,
  pendienteMediaPct: 3,
};

function numeroSeguro(valor, defecto = null) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : defecto;
}

function textoSeguro(valor, defecto = "") {
  if (valor === null || valor === undefined) return defecto;
  return String(valor);
}

export function construirContextoCompetencia(contexto = {}) {
  const areaKm2 = numeroSeguro(
    contexto.area_km2 ??
      contexto.areaKm2 ??
      contexto.area ??
      contexto.racional?.area_km2,
    null
  );

  const pendienteMediaPct = numeroSeguro(
    contexto.pendiente_media_pct ??
      contexto.pendienteMediaPct ??
      contexto.pendiente_pct,
    null
  );

  const longitudCauceKm = numeroSeguro(
    contexto.longitud_cauce_km ??
      contexto.longitudCauceKm ??
      contexto.longitud_km,
    null
  );

  const cn = numeroSeguro(
    contexto.CN_efectivo ??
      contexto.CN ??
      contexto.cn,
    null
  );

  const porcentajeImpermeable = numeroSeguro(
    contexto.porcentaje_impermeable ??
      contexto.impermeabilidad_pct,
    null
  );

  const tieneLluviaEfectiva = Boolean(
    contexto.lluvia_efectiva ||
      contexto.hietograma_efectivo ||
      contexto.resumenMotor?.lluvia_efectiva ||
      contexto.resumenMotor?.hidrogramas
  );

  const tieneIDF = Boolean(
    contexto.metodoIDF ||
      contexto.estacionesAdoptadas?.length ||
      contexto.idf
  );

  const nombreCuenca = textoSeguro(
    contexto.cuencaNombre ??
      contexto.nombreCuenca,
    "Cuenca activa"
  );

  return {
    nombreCuenca,
    areaKm2,
    pendienteMediaPct,
    longitudCauceKm,
    cn,
    porcentajeImpermeable,
    tieneLluviaEfectiva,
    tieneIDF,
  };
}

function evaluarMetodoRacional(ctx) {
  if (ctx.areaKm2 === null) {
    return {
      estadoCompetencia: "condicionado",
      semaforo: "amarillo",
      puntaje: 55,
      justificacion:
        "No hay área de cuenca disponible para evaluar competencia del Método Racional.",
    };
  }

  if (ctx.areaKm2 <= UMBRALES.areaCuencaPequenaKm2) {
    return {
      estadoCompetencia: "competente",
      semaforo: "verde",
      puntaje: 85,
      justificacion:
        "El área de cuenca está dentro del rango usual de aplicación del Método Racional para cuencas pequeñas.",
    };
  }

  return {
    estadoCompetencia: "referencial",
    semaforo: "amarillo",
    puntaje: 45,
    justificacion:
      "El área de cuenca supera el rango usual de aplicación principal del Método Racional. Debe usarse como contraste referencial, no como método principal.",
  };
}

function evaluarMetodoTc(metodo, ctx) {
  if (metodo.estadoImplementacion === "pendiente") {
    return {
      estadoCompetencia: "pendiente",
      semaforo: "gris",
      puntaje: 20,
      justificacion:
        "El método está registrado en el catálogo, pero su implementación numérica está pendiente.",
    };
  }

  if (ctx.areaKm2 === null) {
    return {
      estadoCompetencia: "condicionado",
      semaforo: "amarillo",
      puntaje: 50,
      justificacion:
        "No hay área de cuenca disponible. El método puede consultarse, pero la competencia no puede evaluarse completamente.",
    };
  }

  if (metodo.id === "tc_kirpich" && ctx.areaKm2 > UMBRALES.areaCuencaPequenaKm2) {
    return {
      estadoCompetencia: "referencial",
      semaforo: "amarillo",
      puntaje: 45,
      justificacion:
        "Kirpich es más representativo en cuencas pequeñas y pendientes. Para esta escala debe usarse como contraste.",
    };
  }

  if (
    metodo.id === "tc_giandotti" &&
    ctx.areaKm2 > UMBRALES.areaCuencaPequenaKm2 &&
    ctx.areaKm2 <= UMBRALES.areaCuencaMedianaKm2
  ) {
    return {
      estadoCompetencia: "competente",
      semaforo: "verde",
      puntaje: 80,
      justificacion:
        "Giandotti es razonable para cuencas medianas porque incorpora área, longitud hidráulica y cotas de la cuenca.",
    };
  }

  if (
    metodo.id === "tc_scs_ranser" &&
    ctx.cn !== null
  ) {
    return {
      estadoCompetencia: "competente",
      semaforo: "verde",
      puntaje: 78,
      justificacion:
        "SCS-Ranser es consistente con una modelación basada en SCS-CN porque existe CN disponible para la cuenca.",
    };
  }

  if (
    metodo.id === "tc_williams_hann"
  ) {
    return {
      estadoCompetencia: "condicionado",
      semaforo: "azul",
      puntaje: 70,
      justificacion:
        "Williams & Hann puede ser útil como método de respuesta hidrológica, pero debe diferenciarse si se usa como Tc, retardo o parámetro de hidrograma.",
    };
  }

  if (
    metodo.id === "tc_temez" &&
    ctx.areaKm2 <= UMBRALES.areaCuencaMedianaKm2
  ) {
    return {
      estadoCompetencia: "competente",
      semaforo: "verde",
      puntaje: 75,
      justificacion:
        "Témez es aplicable como método empírico de referencia para cuencas naturales o mixtas con información geomorfológica básica.",
    };
  }

  return {
    estadoCompetencia: "condicionado",
    semaforo: "azul",
    puntaje: 60,
    justificacion:
      "El método puede usarse para sensibilidad, pero requiere revisión técnica de escala, pendiente, longitud hidráulica e insumos disponibles.",
  };
}

function evaluarMetodoQ(metodo, ctx) {
  if (metodo.estadoImplementacion === "pendiente") {
    return {
      estadoCompetencia: "pendiente",
      semaforo: "gris",
      puntaje: 20,
      justificacion:
        "El método está registrado, pero su implementación numérica está pendiente.",
    };
  }

  if (metodo.id === "q_racional") {
    return evaluarMetodoRacional(ctx);
  }

  if (
    metodo.id === "q_scs_hu" &&
    ctx.cn !== null &&
    ctx.tieneLluviaEfectiva
  ) {
    return {
      estadoCompetencia: "competente",
      semaforo: "verde",
      puntaje: 88,
      justificacion:
        "SCS Unit Hydrograph es candidato principal porque hay CN y lluvia efectiva disponibles para construir respuesta lluvia-escorrentía.",
    };
  }

  if (
    metodo.id === "q_scs_hu" &&
    ctx.cn !== null
  ) {
    return {
      estadoCompetencia: "condicionado",
      semaforo: "azul",
      puntaje: 72,
      justificacion:
        "SCS Unit Hydrograph es técnicamente coherente porque existe CN, pero requiere confirmar lluvia efectiva e hidrograma de entrada.",
    };
  }

  if (
    metodo.id === "q_snyder" &&
    ctx.areaKm2 !== null &&
    ctx.areaKm2 <= UMBRALES.areaCuencaMedianaKm2
  ) {
    return {
      estadoCompetencia: "alterno",
      semaforo: "azul",
      puntaje: 68,
      justificacion:
        "Snyder puede usarse como método alterno de hidrograma unitario sintético, sujeto a justificación de coeficientes regionales.",
    };
  }

  if (metodo.id === "q_clark_iuh") {
    return {
      estadoCompetencia: "alterno",
      semaforo: "azul",
      puntaje: 66,
      justificacion:
        "Clark IUH es útil como contraste de forma de hidrograma y almacenamiento, pero requiere parámetro de almacenamiento técnicamente sustentado.",
    };
  }

  if (metodo.id === "q_williams_hann") {
    return {
      estadoCompetencia: "alterno",
      semaforo: "azul",
      puntaje: 64,
      justificacion:
        "Williams & Hann puede aportar contraste de respuesta hidrológica sintética, condicionado a consistencia geomorfológica.",
    };
  }

  return {
    estadoCompetencia: "condicionado",
    semaforo: "azul",
    puntaje: 60,
    justificacion:
      "El método requiere revisión técnica antes de considerarse para adopción.",
  };
}

export function evaluarCompetenciaMetodo(metodo, contexto = {}) {
  const ctx = construirContextoCompetencia(contexto);

  const evaluacion =
    metodo.tipo === "q"
      ? evaluarMetodoQ(metodo, ctx)
      : evaluarMetodoTc(metodo, ctx);

  return {
    ...metodo,
    contextoCompetencia: ctx,
    estadoCompetencia: evaluacion.estadoCompetencia,
    semaforo: evaluacion.semaforo,
    puntajeCompetencia: evaluacion.puntaje,
    justificacionCompetencia: evaluacion.justificacion,
  };
}

export function evaluarCompetenciaComparador(contexto = {}) {
  const metodosTcEvaluados = metodosTcCatalogo.map((metodo) =>
    evaluarCompetenciaMetodo(metodo, contexto)
  );

  const metodosQEvaluados = metodosQCatalogo.map((metodo) =>
    evaluarCompetenciaMetodo(metodo, contexto)
  );

  return {
    contexto: construirContextoCompetencia(contexto),
    tc: metodosTcEvaluados,
    q: metodosQEvaluados,
    todos: [...metodosTcEvaluados, ...metodosQEvaluados],
  };
}

export function resumirCompetenciaComparador(contexto = {}) {
  const evaluacion = evaluarCompetenciaComparador(contexto);

  const resumen = {
    total: evaluacion.todos.length,
    competente: 0,
    alterno: 0,
    condicionado: 0,
    referencial: 0,
    pendiente: 0,
    no_recomendado: 0,
  };

  evaluacion.todos.forEach((metodo) => {
    if (resumen[metodo.estadoCompetencia] !== undefined) {
      resumen[metodo.estadoCompetencia] += 1;
    }
  });

  return {
    contexto: evaluacion.contexto,
    resumen,
  };
}