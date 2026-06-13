const CLAVES_SERIE = ["qSeries", "series", "serie", "data", "points"];
const CLAVES_TIEMPO = ["tiempoMin", "t", "tiempo", "min", "minuto", "tMin", "x"];
const CLAVES_CAUDAL = ["caudalM3s", "q", "Q", "caudal", "y", "valor"];

const CLAVES_QPICO = ["Qpico", "Qp", "qp", "qPico", "q_pico", "caudalPico", "caudal_pico"];
const CLAVES_TPICO = ["tPico", "Tp", "tp", "TPico", "t_pico", "tiempoPico", "tiempo_pico"];
const CLAVES_VOLUMEN = ["volTotal", "volumen", "V", "vol", "volume", "vol_total", "volumenTotal"];
const CLAVES_DTM = ["dtMin", "dt", "pasoMin", "deltaT", "intervaloMin"];

const extraerNumero = (valor) => {
  if (Number.isFinite(Number(valor))) {
    return Number(valor);
  }

  if (typeof valor === "string") {
    const limpio = valor.replace(/[^\d.-]/g, "").trim();
    if (!limpio) return null;

    const numero = Number(limpio);
    return Number.isFinite(numero) ? numero : null;
  }

  return null;
};

const extraerPrimeroNumerico = (objeto, claves) => {
  for (const clave of claves) {
    const numero = extraerNumero(objeto?.[clave]);
    if (Number.isFinite(numero)) {
      return numero;
    }
  }

  return null;
};

const extraerSerieCruda = (objeto) => {
  for (const clave of CLAVES_SERIE) {
    const valor = objeto?.[clave];
    if (Array.isArray(valor)) {
      return valor;
    }
  }

  return null;
};

const extraerNombreMetodo = (objeto, indice) =>
  String(
    objeto?.metodoNombre ??
    objeto?.nombre ??
    objeto?.metodo ??
    objeto?.label ??
    objeto?.id ??
    `metodo_${indice + 1}`
  );

const extraerIdMetodo = (objeto, indice) =>
  String(
    objeto?.metodoId ??
    objeto?.id ??
    objeto?.codigo ??
    objeto?.metodo ??
    objeto?.nombre ??
    `metodo_${indice + 1}`
  )
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const normalizarPunto = (punto) => {
  if (Array.isArray(punto) && punto.length >= 2) {
    const tiempoMin = extraerNumero(punto[0]);
    const caudalM3s = extraerNumero(punto[1]);

    if (Number.isFinite(tiempoMin) && Number.isFinite(caudalM3s)) {
      return { tiempoMin, caudalM3s };
    }

    return null;
  }

  if (!punto || typeof punto !== "object") {
    return null;
  }

  const tiempoMin = extraerPrimeroNumerico(punto, CLAVES_TIEMPO);
  const caudalM3s = extraerPrimeroNumerico(punto, CLAVES_CAUDAL);

  if (!Number.isFinite(tiempoMin) || !Number.isFinite(caudalM3s)) {
    return null;
  }

  return { tiempoMin, caudalM3s };
};

const inferirDtMin = (qSeries) => {
  if (!Array.isArray(qSeries) || qSeries.length < 2) return null;

  const deltas = [];
  for (let i = 1; i < qSeries.length; i += 1) {
    const delta = qSeries[i].tiempoMin - qSeries[i - 1].tiempoMin;
    if (Number.isFinite(delta) && delta > 0) {
      deltas.push(delta);
    }
  }

  if (deltas.length === 0) return null;

  deltas.sort((a, b) => a - b);
  const mitad = Math.floor(deltas.length / 2);

  return deltas.length % 2 === 0
    ? (deltas[mitad - 1] + deltas[mitad]) / 2
    : deltas[mitad];
};

const estaOrdenadaAscendente = (qSeries) =>
  qSeries.every((punto, indice) =>
    indice === 0 || punto.tiempoMin >= qSeries[indice - 1].tiempoMin
  );

const obtenerPicoSerie = (qSeries) => {
  if (!Array.isArray(qSeries) || qSeries.length === 0) {
    return { qMax: null, tMax: null };
  }

  let pico = qSeries[0];

  for (const punto of qSeries) {
    if (punto.caudalM3s > pico.caudalM3s) {
      pico = punto;
    }
  }

  return {
    qMax: pico.caudalM3s,
    tMax: pico.tiempoMin,
  };
};

const evaluarEstadoPublicacion = ({ qSeries, Qpico, tPico, dtMin }) => {
  if (!Array.isArray(qSeries) || qSeries.length === 0) {
    return {
      estadoPublicacion: "no_disponible",
      advertencias: ["No existe qSeries temporal para el método."],
    };
  }

  const advertencias = [];

  if (qSeries.length < 3) {
    advertencias.push("qSeries tiene menos de tres puntos.");
  }

  if (!estaOrdenadaAscendente(qSeries)) {
    advertencias.push("qSeries no está ordenada ascendentemente en tiempoMin.");
  }

  if (qSeries.some((p) => p.caudalM3s < 0)) {
    advertencias.push("qSeries contiene caudales negativos.");
  }

  const { qMax, tMax } = obtenerPicoSerie(qSeries);

  if (Number.isFinite(Qpico) && Number.isFinite(qMax)) {
    const toleranciaQ = Math.max(Math.abs(Qpico) * 0.05, 0.01);
    if (Math.abs(qMax - Qpico) > toleranciaQ) {
      advertencias.push("El máximo de qSeries no es compatible con Qpico.");
    }
  }

  if (Number.isFinite(tPico) && Number.isFinite(tMax)) {
    const toleranciaT = Math.max(Number.isFinite(dtMin) ? dtMin : 1, 1);
    if (Math.abs(tMax - tPico) > toleranciaT) {
      advertencias.push("El tiempo del máximo de qSeries no es compatible con tPico.");
    }
  }

  if (advertencias.some((x) => x.includes("compatible"))) {
    return { estadoPublicacion: "inconsistente", advertencias };
  }

  if (advertencias.length > 0) {
    return { estadoPublicacion: "parcial", advertencias };
  }

  return { estadoPublicacion: "publicado", advertencias: [] };
};

const normalizarEntradaHidrogramas = (hidrogramas) => {
  if (Array.isArray(hidrogramas)) return hidrogramas;

  if (Array.isArray(hidrogramas?.metodos)) return hidrogramas.metodos;
  if (Array.isArray(hidrogramas?.resultados)) return hidrogramas.resultados;
  if (Array.isArray(hidrogramas?.items)) return hidrogramas.items;

  return [];
};

export const adaptarQSeriesHidrogramas = (hidrogramas, opciones = {}) => {
  const fuente = opciones.fuente ?? "motor_hidroflow";
  const candidatos = normalizarEntradaHidrogramas(hidrogramas);

  const metodos = candidatos.map((metodo, indice) => {
    const serieCruda = extraerSerieCruda(metodo);
    const qSeries = Array.isArray(serieCruda)
      ? serieCruda.map(normalizarPunto).filter(Boolean)
      : [];

    const Qpico = extraerPrimeroNumerico(metodo, CLAVES_QPICO);
    const tPico = extraerPrimeroNumerico(metodo, CLAVES_TPICO);
    const volTotal = extraerPrimeroNumerico(metodo, CLAVES_VOLUMEN);
    const dtReportado = extraerPrimeroNumerico(metodo, CLAVES_DTM);
    const dtMin = Number.isFinite(dtReportado) ? dtReportado : inferirDtMin(qSeries);

    const evaluacion = evaluarEstadoPublicacion({
      qSeries,
      Qpico,
      tPico,
      dtMin,
    });

    return {
      metodoId: extraerIdMetodo(metodo, indice),
      metodoNombre: extraerNombreMetodo(metodo, indice),
      tipo: "q",
      qSeries,
      Qpico,
      tPico,
      volTotal,
      dtMin,
      fuente,
      estadoPublicacion: evaluacion.estadoPublicacion,
      advertencias: evaluacion.advertencias,
    };
  });

  const resumen = {
    total: metodos.length,
    publicados: metodos.filter((m) => m.estadoPublicacion === "publicado").length,
    parciales: metodos.filter((m) => m.estadoPublicacion === "parcial").length,
    noDisponibles: metodos.filter((m) => m.estadoPublicacion === "no_disponible").length,
    inconsistentes: metodos.filter((m) => m.estadoPublicacion === "inconsistente").length,
  };

  return {
    ok: resumen.total > 0 && resumen.publicados > 0,
    resumen,
    metodos,
  };
};

export default adaptarQSeriesHidrogramas;
