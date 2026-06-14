// OT-0094B — Helper puro para preparar gráfica de velocidad efectiva desde matriz patrón.
// No recalcula hidrogramas, no modifica Q(t), no adopta método y no toca motor.

function numeroFinito(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function textoSeguro(valor, fallback = "—") {
  const texto = String(valor ?? "").trim();
  return texto || fallback;
}

function colorPorNivelRiesgo(nivelRiesgo) {
  if (nivelRiesgo === "Alto") return "#f87171";
  if (nivelRiesgo === "Medio") return "#facc15";
  if (nivelRiesgo === "Bajo") return "#86efac";
  return "#cbd5e1";
}

function categoriaPlausibilidad(plausibilidad = "") {
  const texto = String(plausibilidad).toLowerCase();

  if (texto.includes("alerta")) return "alerta_fuerte";
  if (texto.includes("plausible")) return "plausible_preliminar";
  if (texto.includes("prolongada") || texto.includes("atenuada") || texto.includes("recesiva")) {
    return "prolongada_o_atenuada";
  }

  return "no_determinada";
}

export default function prepararGraficaVelocidadEfectivaMatrizPatron(matriz = {}) {
  const diagnosticoQt = Array.isArray(matriz?.diagnosticoQt)
    ? matriz.diagnosticoQt
    : [];

  const barras = diagnosticoQt
    .map((fila) => {
      const velocidadTPico = numeroFinito(fila?.velocidadEfectivaTPicoKmh);
      const velocidadAscenso = numeroFinito(fila?.velocidadEfectivaAscensoKmh);

      if (velocidadTPico === null && velocidadAscenso === null) return null;

      return {
        metodo: textoSeguro(fila?.metodo),
        velocidadTPicoKmh: velocidadTPico,
        velocidadAscensoKmh: velocidadAscenso,
        nivelRiesgo: textoSeguro(fila?.nivelRiesgo),
        riesgoTemporal: textoSeguro(fila?.riesgoTemporal),
        plausibilidadTemporal: textoSeguro(fila?.plausibilidadTemporal),
        categoriaPlausibilidad: categoriaPlausibilidad(fila?.plausibilidadTemporal),
        color: colorPorNivelRiesgo(fila?.nivelRiesgo)
      };
    })
    .filter(Boolean);

  const velocidades = barras.flatMap((barra) =>
    [barra.velocidadTPicoKmh, barra.velocidadAscensoKmh].filter((valor) =>
      Number.isFinite(Number(valor))
    )
  );

  const maxVelocidad = velocidades.length > 0 ? Math.max(...velocidades) : 0;

  return {
    ok: barras.length > 0,
    titulo: "Velocidad efectiva — Matriz patrón La Iguaná PC_80",
    ejes: {
      x: "Velocidad efectiva (km/h)",
      y: "Método"
    },
    barras,
    dominio: {
      maxVelocidad,
      maxVelocidadGrafico: maxVelocidad > 0 ? maxVelocidad * 1.12 : 1
    },
    referencia: {
      velocidadCaminataKmh: 5,
      lectura:
        "La referencia de 5 km/h es un control pedagógico de orden de magnitud, no una fórmula hidrológica."
    },
    advertencia:
      "Gráfica diagnóstica no adoptiva; no recalcula hidrogramas, no modifica Q(t), no selecciona método y no levanta No coherente."
  };
}