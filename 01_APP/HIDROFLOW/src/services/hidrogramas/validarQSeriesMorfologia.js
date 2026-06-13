// OT-0082B — Validador puro de qSeries para métricas morfológicas.
// No calcula métricas de forma. Solo determina elegibilidad estructural.

export default function validarQSeriesMorfologia(qSeries) {
  if (!Array.isArray(qSeries)) {
    return {
      ok: false,
      motivo: "qSeries no es un array",
      totalPuntos: 0,
      qMax: null,
      tMin: null,
      tMax: null
    };
  }

  if (qSeries.length === 0) {
    return {
      ok: false,
      motivo: "qSeries está vacía",
      totalPuntos: 0,
      qMax: null,
      tMin: null,
      tMax: null
    };
  }

  let tAnterior = null;
  let qMax = 0;
  let tMin = null;
  let tMax = null;

  for (let i = 0; i < qSeries.length; i += 1) {
    const punto = qSeries[i];

    if (!punto || typeof punto !== "object") {
      return {
        ok: false,
        motivo: `Punto inválido en índice ${i}`,
        totalPuntos: qSeries.length,
        qMax: null,
        tMin: null,
        tMax: null
      };
    }

    const t = Number(punto.t);
    const Q = Number(punto.Q);

    if (!Number.isFinite(t) || !Number.isFinite(Q)) {
      return {
        ok: false,
        motivo: `Tiempo o caudal no finito en índice ${i}`,
        totalPuntos: qSeries.length,
        qMax: null,
        tMin: null,
        tMax: null
      };
    }

    if (Q < 0) {
      return {
        ok: false,
        motivo: `Caudal negativo en índice ${i}`,
        totalPuntos: qSeries.length,
        qMax: null,
        tMin: null,
        tMax: null
      };
    }

    if (tAnterior !== null && t < tAnterior) {
      return {
        ok: false,
        motivo: `Tiempo decreciente en índice ${i}`,
        totalPuntos: qSeries.length,
        qMax: null,
        tMin: null,
        tMax: null
      };
    }

    if (tMin === null) tMin = t;
    tMax = t;
    qMax = Math.max(qMax, Q);
    tAnterior = t;
  }

  if (!(qMax > 0)) {
    return {
      ok: false,
      motivo: "qSeries no contiene caudales positivos",
      totalPuntos: qSeries.length,
      qMax,
      tMin,
      tMax
    };
  }

  return {
    ok: true,
    motivo: null,
    totalPuntos: qSeries.length,
    qMax,
    tMin,
    tMax
  };
}