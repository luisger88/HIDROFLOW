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
  return filas.map((fila) => textoSeguro(fila?.metodo)).join(", ");
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
      `${listarMetodos(alertasFuertes)} presenta(n) la mayor alerta temporal por concentración abrupta o asimetría extrema.`
    );
  }

  if (plausibles.length > 0) {
    frases.push(
      `${listarMetodos(plausibles)} se mantiene(n) como respuesta temporalmente plausible preliminar.`
    );
  }

  if (prolongadas.length > 0) {
    frases.push(
      `${listarMetodos(prolongadas)} muestra(n) comportamiento prolongado, atenuado o con recesión dominante.`
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
