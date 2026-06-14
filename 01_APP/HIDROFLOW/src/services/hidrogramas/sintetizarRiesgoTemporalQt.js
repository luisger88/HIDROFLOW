// OT-0086B — Helper puro de síntesis ejecutiva temporal Q(t).
// Recibe filas de riesgo temporal ya evaluadas.
// No recibe qSeries cruda, no recalcula métricas, no reconstruye Q(t), no interpola y no adopta métodos.

function normalizarTexto(valor) {
  return String(valor ?? "").trim();
}

function agruparPorNivel(filas) {
  return filas.reduce(
    (grupos, fila) => {
      const nivel = normalizarTexto(fila?.nivel);

      if (nivel === "Alto") grupos.alto.push(fila);
      else if (nivel === "Medio") grupos.medio.push(fila);
      else if (nivel === "Bajo") grupos.bajo.push(fila);
      else grupos.noDeterminado.push(fila);

      return grupos;
    },
    {
      alto: [],
      medio: [],
      bajo: [],
      noDeterminado: []
    }
  );
}

function agruparPorRiesgo(filas) {
  return filas.reduce((grupos, fila) => {
    const riesgo = normalizarTexto(fila?.riesgo) || "Riesgo no determinado";

    if (!grupos[riesgo]) grupos[riesgo] = [];
    grupos[riesgo].push(fila);

    return grupos;
  }, {});
}

function nombresMetodos(filas) {
  return filas
    .map((fila) => normalizarTexto(fila?.metodo))
    .filter(Boolean)
    .join(", ");
}

function construirRespuesta({
  ok = true,
  resumen = [],
  niveles = {
    alto: 0,
    medio: 0,
    bajo: 0,
    noDeterminado: 0
  },
  riesgos = {},
  advertencia = "Síntesis diagnóstica no adoptiva.",
  metodoCritico = null
}) {
  return {
    ok,
    resumen,
    niveles,
    riesgos,
    advertencia,
    metodoCritico
  };
}

export default function sintetizarRiesgoTemporalQt(filasRiesgoTemporalQt = []) {
  if (!Array.isArray(filasRiesgoTemporalQt)) {
    return construirRespuesta({
      ok: false,
      resumen: [
        "No fue posible generar síntesis ejecutiva temporal porque la entrada no es una lista de riesgos."
      ],
      advertencia:
        "Síntesis diagnóstica no adoptiva; no selecciona método ni levanta No coherente."
    });
  }

  const filasValidas = filasRiesgoTemporalQt.filter((fila) =>
    Boolean(normalizarTexto(fila?.metodo))
  );

  if (filasValidas.length === 0) {
    return construirRespuesta({
      ok: false,
      resumen: [
        "No hay filas de riesgo temporal disponibles para síntesis ejecutiva."
      ],
      advertencia:
        "Síntesis diagnóstica no adoptiva; no selecciona método ni levanta No coherente."
    });
  }

  const gruposNivel = agruparPorNivel(filasValidas);
  const gruposRiesgo = agruparPorRiesgo(filasValidas);

  const resumen = [];

  if (gruposNivel.alto.length > 0) {
    resumen.push(
      `Riesgo temporal alto: ${nombresMetodos(gruposNivel.alto)}.`
    );
  }

  if (gruposNivel.medio.length > 0) {
    resumen.push(
      `Riesgo temporal medio: ${nombresMetodos(gruposNivel.medio)}.`
    );
  }

  if (gruposNivel.bajo.length > 0) {
    resumen.push(
      `Riesgo temporal bajo: ${nombresMetodos(gruposNivel.bajo)}.`
    );
  }

  Object.entries(gruposRiesgo).forEach(([riesgo, filas]) => {
    if (!riesgo || filas.length === 0) return;

    const metodos = nombresMetodos(filas);
    const nivelDominante = normalizarTexto(filas[0]?.nivel) || "nivel no determinado";

    resumen.push(
      `${riesgo}: ${metodos} (${nivelDominante}).`
    );
  });

  const altoConFactores = gruposNivel.alto.map((fila) => ({
    metodo: normalizarTexto(fila?.metodo),
    riesgo: normalizarTexto(fila?.riesgo),
    factorDominante: normalizarTexto(fila?.factorDominante)
  }));

  const metodoCritico =
    altoConFactores.length === 1
      ? altoConFactores[0]
      : null;

  if (metodoCritico) {
    resumen.push(
      `Método con riesgo alto singular: ${metodoCritico.metodo}, asociado a ${metodoCritico.factorDominante || metodoCritico.riesgo}.`
    );
  }

  if (resumen.length === 0) {
    resumen.push(
      "No se identificaron agrupaciones ejecutivas dominantes bajo los criterios disponibles."
    );
  }

  return construirRespuesta({
    ok: true,
    resumen,
    niveles: {
      alto: gruposNivel.alto.length,
      medio: gruposNivel.medio.length,
      bajo: gruposNivel.bajo.length,
      noDeterminado: gruposNivel.noDeterminado.length
    },
    riesgos: Object.fromEntries(
      Object.entries(gruposRiesgo).map(([riesgo, filas]) => [
        riesgo,
        filas.map((fila) => normalizarTexto(fila?.metodo)).filter(Boolean)
      ])
    ),
    advertencia:
      "Síntesis diagnóstica no adoptiva; no selecciona método, no modifica caudales y no levanta el estado global No coherente.",
    metodoCritico
  });
}