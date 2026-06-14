// OT-0091 — Matriz patrón La Iguaná PC_80.
// Consolidación operativa de resultados actuales para comparación futura.
// No adopta método, no recalcula hidrogramas y no levanta el estado global No coherente.

export const matrizPatronLaIguanaPC80 = Object.freeze({
  id: "la_iguana_pc80",
  cuenca: {
    nombre: "La Iguaná PC_80",
    puntoControl: "PC_80",
    estado: "cuenca_patron",
    uso: "diagnostico_hidrologico_no_adoptivo"
  },

  morfometria: {
    areaKm2: 46.8516,
    perimetroKm: 47.59,
    longitudHidraulicaKm: 15.524,
    cotaMaxMsnm: 2819.27,
    cotaMinMsnm: 1511.36,
    desnivelM: 1307.91,
    pendienteCaucePct: 8.425,
    pendienteMediaCuencaPct: 8.43,
    fuente: "cuencasCatalogo / consolidado HidroFlow"
  },

  tiemposConcentracion: {
    tcSugeridoMin: 114.2,
    metodosValidos: 6,
    rangoBrutoMin: 11.2,
    rangoBrutoMax: 231.5,
    rangoCompetenteMin: 105.1,
    rangoCompetenteMax: 231.5,
    estado: "diagnostico_no_adoptivo"
  },

  lluviaEscorrentia: {
    lluviaEfectivaTotalMm: 56.65,
    volumenEsperadoM3: 2654251,
    relacionMasaPeAreaVolumen: 1.0,
    estado: "masa_consistente"
  },

  escenarioReferencia: {
    nombre: "Q-5",
    periodoRetornoAnios: 5,
    volumenQ5M3: 2654250.9,
    estado: "diagnostico_no_adoptivo"
  },

  diagnosticoQt: [
    {
      metodo: "SCS",
      estadoSerie: "Apta",
      QpM3s: 184.03,
      tPicoMin: 210,
      duracionEfectivaMin: 605,
      ascensoMin: 205,
      recesoMin: 400,
      W50Min: 215,
      W25Min: 320,
      asimetriaRecesoAscenso: 1.951,
      formaTemporal: "Forma persistente",
      alertaForma: "Ancho temporal significativo",
      severidadForma: "Media",
      riesgoTemporal: "Persistencia temporal significativa",
      nivelRiesgo: "Medio",
      factorDominante: "Anchos W50/W25 relevantes",
      velocidadEfectivaTPicoKmh: 4.44,
      velocidadEfectivaAscensoKmh: 4.54,
      plausibilidadTemporal: "Temporalmente plausible preliminar"
    },
    {
      metodo: "SCS Mod.",
      estadoSerie: "Apta",
      QpM3s: 181.02,
      tPicoMin: 210,
      duracionEfectivaMin: 650,
      ascensoMin: 205,
      recesoMin: 445,
      W50Min: 215,
      W25Min: 320,
      asimetriaRecesoAscenso: 2.171,
      formaTemporal: "Forma persistente",
      alertaForma: "Ancho temporal significativo",
      severidadForma: "Media",
      riesgoTemporal: "Persistencia temporal significativa",
      nivelRiesgo: "Medio",
      factorDominante: "Anchos W50/W25 relevantes",
      velocidadEfectivaTPicoKmh: 4.44,
      velocidadEfectivaAscensoKmh: 4.54,
      plausibilidadTemporal: "Temporalmente plausible preliminar"
    },
    {
      metodo: "Snyder",
      estadoSerie: "Apta",
      QpM3s: 124.65,
      tPicoMin: 405,
      duracionEfectivaMin: 3565,
      ascensoMin: 400,
      recesoMin: 3165,
      W50Min: 285,
      W25Min: 465,
      asimetriaRecesoAscenso: 7.913,
      formaTemporal: "Forma prolongada con receso dominante",
      alertaForma: "Recesión extensa",
      severidadForma: "Alta",
      riesgoTemporal: "Recesión prolongada dominante",
      nivelRiesgo: "Alto",
      factorDominante: "Duración efectiva alta y receso dominante",
      velocidadEfectivaTPicoKmh: 2.3,
      velocidadEfectivaAscensoKmh: 2.33,
      plausibilidadTemporal: "Respuesta prolongada / recesiva"
    },
    {
      metodo: "Williams & Hann",
      estadoSerie: "Apta",
      QpM3s: 518.09,
      tPicoMin: 20,
      duracionEfectivaMin: 215,
      ascensoMin: 15,
      recesoMin: 200,
      W50Min: 55,
      W25Min: 170,
      asimetriaRecesoAscenso: 13.333,
      formaTemporal: "Forma abrupta altamente asimétrica",
      alertaForma: "Ascenso muy corto y receso extremo",
      severidadForma: "Alta",
      riesgoTemporal: "Asimetría extrema con concentración abrupta",
      nivelRiesgo: "Alto",
      factorDominante: "Receso extremo y ascenso abrupto",
      velocidadEfectivaTPicoKmh: 46.57,
      velocidadEfectivaAscensoKmh: 62.1,
      plausibilidadTemporal: "Alerta fuerte por concentración abrupta"
    },
    {
      metodo: "Clark IUH",
      estadoSerie: "Apta",
      QpM3s: 94.28,
      tPicoMin: 300,
      duracionEfectivaMin: 2125,
      ascensoMin: 295,
      recesoMin: 1830,
      W50Min: 380,
      W25Min: 625,
      asimetriaRecesoAscenso: 6.203,
      formaTemporal: "Forma prolongada con receso dominante",
      alertaForma: "Recesión extensa",
      severidadForma: "Alta",
      riesgoTemporal: "Recesión prolongada dominante",
      nivelRiesgo: "Alto",
      factorDominante: "Duración efectiva alta y receso dominante",
      velocidadEfectivaTPicoKmh: 3.1,
      velocidadEfectivaAscensoKmh: 3.16,
      plausibilidadTemporal: "Respuesta atenuada / prolongada"
    }
  ],

  sintesisTemporal: {
    riesgoAlto: ["Snyder", "Williams & Hann", "Clark IUH"],
    riesgoMedio: ["SCS", "SCS Mod."],
    riesgoBajo: [],
    noDeterminado: [],
    lectura: [
      "SCS y SCS Mod. presentan orden temporal plausible preliminar.",
      "Snyder y Clark IUH presentan respuestas prolongadas con receso dominante.",
      "Williams & Hann presenta concentración abrupta y asimetría extrema."
    ]
  },

  salidaHidraulicaFutura: {
    requiereHidrogramaCompleto: true,
    noUsarSoloQp: true,
    incluirVolumen: true,
    incluirTPico: true,
    incluirDuracionEfectiva: true,
    incluirRiesgoTemporal: true,
    estado: "paquete_hidrologico_no_adoptivo"
  },

  restricciones: [
    "No adopta automáticamente ningún método.",
    "No descarta automáticamente ningún método.",
    "No levanta el estado global No coherente.",
    "No reemplaza revisión hidrológica profesional.",
    "No recalcula Q(t).",
    "No interpola series.",
    "No modifica Qp, tPico, volumen ni métricas existentes.",
    "Debe validarse con más cuencas antes de convertirse en regla general."
  ]
});

export default matrizPatronLaIguanaPC80;
