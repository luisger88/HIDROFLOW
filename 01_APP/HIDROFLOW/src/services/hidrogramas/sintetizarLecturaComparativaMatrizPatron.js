// OT-0095B — Helper puro para sintetizar lectura comparativa textual desde matriz patrón.
// No recalcula hidrogramas, no modifica Q(t), no adopta ni descarta métodos y no toca motor.

function textoSeguro(valor, fallback = "—") {
  const texto = String(valor ?? "").trim();
  return texto || fallback;
}

function esAlertaFuerte(fila = {}) {
  const plausibilidad = String(fila?.plausibilidadTemporal ?? "").toLowerCase();
  const riesgo = String(fila?.riesgoTemporal ?? "").toLowerCase();
  const forma = String(fila?.formaTemporal ?? "").toLowerCase();

  return (
    plausibilidad.includes("alerta") ||
    riesgo.includes("concentración abrupta") ||
    forma.includes("abrupta")
  );
}

function esPlausiblePreliminar(fila = {}) {
  return String(fila?.plausibilidadTemporal ?? "")
    .toLowerCase()
    .includes("plausible");
}

function esProlongadaOAtenuada(fila = {}) {
  const plausibilidad = String(fila?.plausibilidadTemporal ?? "").toLowerCase();
  const forma = String(fila?.formaTemporal ?? "").toLowerCase();
  const riesgo = String(fila?.riesgoTemporal ?? "").toLowerCase();

  return (
    plausibilidad.includes("prolongada") ||
    plausibilidad.includes("atenuada") ||
    plausibilidad.includes("recesiva") ||
    forma.includes("prolongada") ||
    riesgo.includes("recesión prolongada")
  );
}

function listarMetodos(filas = []) {
  const nombres = filas.map((fila) => textoSeguro(fila?.metodo)).filter(Boolean);

  if (nombres.length === 0) return "—";
  if (nombres.length === 1) return nombres[0];
  if (nombres.length === 2) return nombres.join(" y ");

  return `${nombres.slice(0, -1).join(", ")} y ${nombres.at(-1)}`;
}

function verboPorCantidad(filas = [], singular = "", plural = "") {
  return filas.length === 1 ? singular : plural;
}

export default function sintetizarLecturaComparativaMatrizPatron(matriz = {}) {
  const diagnosticoQt = Array.isArray(matriz?.diagnosticoQt)
    ? matriz.diagnosticoQt
    : [];

  if (diagnosticoQt.length === 0) {
    return {
      ok: false,
      frases: [
        "No hay diagnóstico Q(t) suficiente para generar lectura comparativa de matriz patrón."
      ],
      advertencia:
        "Lectura comparativa no adoptiva; no selecciona ni descarta métodos."
    };
  }

  const alertasFuertes = diagnosticoQt.filter(esAlertaFuerte);
  const plausibles = diagnosticoQt.filter(esPlausiblePreliminar);
  const prolongadas = diagnosticoQt.filter(esProlongadaOAtenuada);

  const frases = [];

  if (alertasFuertes.length > 0) {
    frases.push(
      `${listarMetodos(alertasFuertes)} ${verboPorCantidad(alertasFuertes, "presenta", "presentan")} la mayor alerta temporal por concentración abrupta o asimetría extrema.`
    );
  }

  if (plausibles.length > 0) {
    frases.push(
      `${listarMetodos(plausibles)} ${verboPorCantidad(plausibles, "se mantiene", "se mantienen")} como respuesta temporalmente plausible preliminar.`
    );
  }

  if (prolongadas.length > 0) {
    frases.push(
      `${listarMetodos(prolongadas)} ${verboPorCantidad(prolongadas, "muestra", "muestran")} comportamiento prolongado, atenuado o con recesión dominante.`
    );
  }

  frases.push(
    "Esta lectura compara patrones temporales de la matriz patrón; no adopta ni descarta métodos automáticamente."
  );

  return {
    ok: true,
    frases,
    resumen: {
      totalMetodos: diagnosticoQt.length,
      alertasFuertes: alertasFuertes.map((fila) => textoSeguro(fila?.metodo)),
      plausibles: plausibles.map((fila) => textoSeguro(fila?.metodo)),
      prolongadas: prolongadas.map((fila) => textoSeguro(fila?.metodo))
    },
    advertencia:
      "Lectura comparativa no adoptiva; no recalcula hidrogramas, no modifica Q(t), no selecciona método y no levanta No coherente."
  };
}

