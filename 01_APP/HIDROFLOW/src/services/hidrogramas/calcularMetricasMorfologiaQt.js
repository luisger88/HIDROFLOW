// OT-0082C — Helper puro de métricas morfológicas preliminares Q(t).
// Calcula métricas solo sobre qSeries real validada.
// No interpola, no reconstruye Q(t), no usa Qpico/tPico/volTotal como sustitutos.

import validarQSeriesMorfologia from "./validarQSeriesMorfologia";

function buscarPrimerIndiceSobreUmbral(qSeries, umbral) {
  return qSeries.findIndex((punto) => Number(punto?.Q) >= umbral);
}

function buscarUltimoIndiceSobreUmbral(qSeries, umbral) {
  for (let i = qSeries.length - 1; i >= 0; i -= 1) {
    if (Number(qSeries[i]?.Q) >= umbral) return i;
  }

  return -1;
}

function buscarIndicePico(qSeries) {
  let indicePico = -1;
  let qMax = -Infinity;

  for (let i = 0; i < qSeries.length; i += 1) {
    const Q = Number(qSeries[i]?.Q);

    if (Number.isFinite(Q) && Q > qMax) {
      qMax = Q;
      indicePico = i;
    }
  }

  return indicePico;
}

export default function calcularMetricasMorfologiaQt(qSeries) {
  const validacion = validarQSeriesMorfologia(qSeries);

  if (!validacion.ok) {
    return {
      ok: false,
      motivo: validacion.motivo,
      validacion,
      Qp: null,
      tPico: null,
      duracionEfectivaMin: null,
      tiempoAscensoMin: null,
      tiempoRecesoMin: null,
      W50Min: null,
      W25Min: null,
      pendienteAscenso: null,
      pendienteReceso: null,
      asimetriaAscensoReceso: null
    };
  }

  const indicePico = buscarIndicePico(qSeries);

  if (indicePico < 0) {
    return {
      ok: false,
      motivo: "No fue posible identificar el pico de qSeries",
      validacion,
      Qp: null,
      tPico: null,
      duracionEfectivaMin: null,
      tiempoAscensoMin: null,
      tiempoRecesoMin: null,
      W50Min: null,
      W25Min: null,
      pendienteAscenso: null,
      pendienteReceso: null,
      asimetriaAscensoReceso: null
    };
  }

  const puntoPico = qSeries[indicePico];
  const Qp = Number(puntoPico.Q);
  const tPico = Number(puntoPico.t);

  const indiceInicioEfectivo = qSeries.findIndex((punto) => Number(punto?.Q) > 0);
  const indiceFinEfectivo = (() => {
    for (let i = qSeries.length - 1; i >= 0; i -= 1) {
      if (Number(qSeries[i]?.Q) > 0) return i;
    }

    return -1;
  })();

  if (indiceInicioEfectivo < 0 || indiceFinEfectivo < 0) {
    return {
      ok: false,
      motivo: "No se identificó tramo efectivo con caudales positivos",
      validacion,
      Qp,
      tPico,
      duracionEfectivaMin: null,
      tiempoAscensoMin: null,
      tiempoRecesoMin: null,
      W50Min: null,
      W25Min: null,
      pendienteAscenso: null,
      pendienteReceso: null,
      asimetriaAscensoReceso: null
    };
  }

  const tInicio = Number(qSeries[indiceInicioEfectivo].t);
  const tFin = Number(qSeries[indiceFinEfectivo].t);

  const duracionEfectivaMin = +(tFin - tInicio).toFixed(6);
  const tiempoAscensoMin = +(tPico - tInicio).toFixed(6);
  const tiempoRecesoMin = +(tFin - tPico).toFixed(6);

  const umbral50 = Qp * 0.5;
  const umbral25 = Qp * 0.25;

  const i50Inicio = buscarPrimerIndiceSobreUmbral(qSeries, umbral50);
  const i50Fin = buscarUltimoIndiceSobreUmbral(qSeries, umbral50);

  const i25Inicio = buscarPrimerIndiceSobreUmbral(qSeries, umbral25);
  const i25Fin = buscarUltimoIndiceSobreUmbral(qSeries, umbral25);

  const W50Min =
    i50Inicio >= 0 && i50Fin >= 0 && i50Fin >= i50Inicio
      ? +(Number(qSeries[i50Fin].t) - Number(qSeries[i50Inicio].t)).toFixed(6)
      : null;

  const W25Min =
    i25Inicio >= 0 && i25Fin >= 0 && i25Fin >= i25Inicio
      ? +(Number(qSeries[i25Fin].t) - Number(qSeries[i25Inicio].t)).toFixed(6)
      : null;

  const pendienteAscenso =
    tiempoAscensoMin > 0
      ? +(Qp / tiempoAscensoMin).toFixed(9)
      : null;

  const pendienteReceso =
    tiempoRecesoMin > 0
      ? +(Qp / tiempoRecesoMin).toFixed(9)
      : null;

  const asimetriaAscensoReceso =
    tiempoAscensoMin > 0 && tiempoRecesoMin > 0
      ? +(tiempoRecesoMin / tiempoAscensoMin).toFixed(9)
      : null;

  return {
    ok: true,
    motivo: null,
    validacion,
    Qp: +Qp.toFixed(6),
    tPico: +tPico.toFixed(6),
    duracionEfectivaMin,
    tiempoAscensoMin,
    tiempoRecesoMin,
    W50Min,
    W25Min,
    pendienteAscenso,
    pendienteReceso,
    asimetriaAscensoReceso
  };
}