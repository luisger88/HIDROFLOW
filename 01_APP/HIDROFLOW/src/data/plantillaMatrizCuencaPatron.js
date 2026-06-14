// OT-0099B — Plantilla controlada de matriz de cuenca patrón.
// Esta plantilla NO representa una cuenca real.
// No contiene datos inventados.
// No debe importarse en UI ni usarse para comparación directa.
// Sirve únicamente como contrato estructural para futuras cuencas patrón.

export const plantillaMatrizCuencaPatron = Object.freeze({
  id: null,

  cuenca: {
    nombre: null,
    puntoControl: null,
    estado: "plantilla_no_operativa",
    uso: "contrato_estructural_no_comparable"
  },

  morfometria: {
    areaKm2: null,
    perimetroKm: null,
    longitudHidraulicaKm: null,
    cotaMaxMsnm: null,
    cotaMinMsnm: null,
    desnivelM: null,
    pendienteCaucePct: null,
    pendienteMediaCuencaPct: null,
    fuente: null
  },

  tiemposConcentracion: {
    tcSugeridoMin: null,
    metodosValidos: null,
    rangoBrutoMin: null,
    rangoBrutoMax: null,
    rangoCompetenteMin: null,
    rangoCompetenteMax: null,
    estado: "no_determinado"
  },

  lluviaEscorrentia: {
    lluviaEfectivaTotalMm: null,
    volumenEsperadoM3: null,
    relacionMasaPeAreaVolumen: null,
    estado: "no_determinado"
  },

  escenarioReferencia: {
    nombre: null,
    periodoRetornoAnios: null,
    volumenQ5M3: null,
    estado: "no_determinado"
  },

  diagnosticoQt: [
    {
      metodo: null,
      estadoSerie: "no_determinado",
      QpM3s: null,
      tPicoMin: null,
      duracionEfectivaMin: null,
      ascensoMin: null,
      recesoMin: null,
      W50Min: null,
      W25Min: null,
      asimetriaRecesoAscenso: null,
      formaTemporal: null,
      alertaForma: null,
      severidadForma: null,
      riesgoTemporal: null,
      nivelRiesgo: null,
      factorDominante: null,
      velocidadEfectivaTPicoKmh: null,
      velocidadEfectivaAscensoKmh: null,
      plausibilidadTemporal: null
    }
  ],

  sintesisTemporal: {
    riesgoAlto: [],
    riesgoMedio: [],
    riesgoBajo: [],
    noDeterminado: [],
    lectura: []
  },

  salidaHidraulicaFutura: {
    requiereHidrogramaCompleto: true,
    noUsarSoloQp: true,
    incluirVolumen: true,
    incluirTPico: true,
    incluirDuracionEfectiva: true,
    incluirRiesgoTemporal: true,
    estado: "plantilla_no_adoptiva"
  },

  restricciones: [
    "Esta plantilla no representa una cuenca real.",
    "No contiene datos hidrológicos inventados.",
    "No debe usarse para comparación directa.",
    "No adopta automáticamente ningún método.",
    "No descarta automáticamente ningún método.",
    "No levanta el estado global No coherente.",
    "No reemplaza revisión hidrológica profesional.",
    "Debe completarse únicamente con datos reales, trazables y validados."
  ]
});

export default plantillaMatrizCuencaPatron;