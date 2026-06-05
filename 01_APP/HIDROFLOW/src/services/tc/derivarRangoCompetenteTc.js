const MAPA_ID_CATALOGO_A_METODOS_TC = {
  tc_kirpich: "Kirpich",
  tc_temez: "Temez",
  tc_california: "California",
  tc_giandotti: "Giandotti",
  tc_perez_montoya: "Perez",
  tc_scs_ranser: "SCS",
};

/**
 * Deriva el rango competente de Tc a partir de:
 * - metodosTc: valores numéricos ya calculados por el motor.
 * - evaluacionCompetenciaTc: métodos Tc evaluados por matrizCompetenciaComparador.js.
 *
 * Regla Senior:
 * - No recalcula Tc.
 * - No modifica metodosTc.
 * - No modifica evaluacionCompetenciaTc.
 * - No introduce umbrales manuales.
 * - Solo cruza valores existentes con criterios existentes.
 */
export function derivarRangoCompetenteTc(
  metodosTc = {},
  evaluacionCompetenciaTc = []
) {
  const metodosEvaluados = Array.isArray(evaluacionCompetenciaTc)
    ? evaluacionCompetenciaTc
    : [];

  const metodosTcCompetentes = metodosEvaluados
    .filter((metodo) => metodo?.estadoCompetencia === "competente")
    .map((metodo) => {
      const claveTc = MAPA_ID_CATALOGO_A_METODOS_TC[metodo.id];
      const valor = Number(claveTc ? metodosTc?.[claveTc] : null);

      if (!claveTc || !Number.isFinite(valor) || valor <= 0) {
        return null;
      }

      return {
        id: metodo.id,
        claveTc,
        nombre: metodo.nombre,
        valor,
        estadoCompetencia: metodo.estadoCompetencia,
        semaforo: metodo.semaforo,
        puntajeCompetencia: metodo.puntajeCompetencia,
        justificacionCompetencia: metodo.justificacionCompetencia,
      };
    })
    .filter(Boolean);

  if (metodosTcCompetentes.length === 0) {
    return {
      metodosTcCompetentes: [],
      rangoCompetenteTc: null,
    };
  }

  const valores = metodosTcCompetentes.map((metodo) => metodo.valor);

  return {
    metodosTcCompetentes,
    rangoCompetenteTc: {
      min: Math.min(...valores),
      max: Math.max(...valores),
      n: valores.length,
    },
  };
}

export { MAPA_ID_CATALOGO_A_METODOS_TC };
