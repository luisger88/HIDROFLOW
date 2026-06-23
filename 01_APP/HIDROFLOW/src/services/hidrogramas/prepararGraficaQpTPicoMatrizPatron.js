// OT-0093B — Helper puro para preparar gráfica Qp–tPico desde matriz patrón.
// No recalcula hidrogramas, no modifica Q(t), no adopta método y no toca motor.

function numeroFinito(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function colorPorNivelRiesgo(nivelRiesgo) {
  if (nivelRiesgo === "Alto") return "#f87171";
  if (nivelRiesgo === "Medio") return "#facc15";
  if (nivelRiesgo === "Bajo") return "#86efac";
  return "#cbd5e1";
}

function normalizarTexto(valor, fallback = "—") {
  const texto = String(valor ?? "").trim();
  return texto || fallback;
}

export default function prepararGraficaQpTPicoMatrizPatron(matriz = {}) {
  const diagnosticoQt = Array.isArray(matriz?.diagnosticoQt)
    ? matriz.diagnosticoQt
    : [];

  const puntos = diagnosticoQt
    .map((fila) => {
      const qPico = numeroFinito(fila?.QpM3s);
      const tPico = numeroFinito(fila?.tPicoMin);

      if (qPico === null || tPico === null) return null;

      return {
        metodo: normalizarTexto(fila?.metodo),
        xTPicoMin: tPico,
        yQpM3s: qPico,
        nivelRiesgo: normalizarTexto(fila?.nivelRiesgo),
        riesgoTemporal: normalizarTexto(fila?.riesgoTemporal),
        plausibilidadTemporal: normalizarTexto(fila?.plausibilidadTemporal),
        color: colorPorNivelRiesgo(fila?.nivelRiesgo)
      };
    })
    .filter(Boolean);

  const valoresX = puntos.map((punto) => punto.xTPicoMin);
  const valoresY = puntos.map((punto) => punto.yQpM3s);

  const maxX = valoresX.length > 0 ? Math.max(...valoresX) : 0;
  const maxY = valoresY.length > 0 ? Math.max(...valoresY) : 0;

  return {
    ok: puntos.length > 0,
    titulo: "Qp vs tPico — Matriz patrón de referencia",
    ejes: {
      x: "tPico (min)",
      y: "Qp (m³/s)"
    },
    puntos,
    dominio: {
      maxX,
      maxY,
      maxXGrafico: maxX > 0 ? maxX * 1.08 : 1,
      maxYGrafico: maxY > 0 ? maxY * 1.08 : 1
    },
    advertencia:
      "Gráfica diagnóstica no adoptiva; no recalcula hidrogramas, no modifica Q(t), no selecciona método y no levanta No coherente."
  };
}
