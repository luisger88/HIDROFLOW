export const VERSION_CONTRATO_EXPEDIENTE_HIDROLOGICO = "HF_EXPEDIENTE_PAYLOAD_V1";

export const crearPayloadExpedienteVacio = () => ({
  versionContrato: VERSION_CONTRATO_EXPEDIENTE_HIDROLOGICO,

  cuenca: {
    nombre: "",
    puntoSalida: { id: "", lat: null, lon: null },
    cotaSalidaMsnm: null,
    cotaAltaMsnm: null
  },

  geomorfometria: {
    areaKm2: null,
    longitudCauceKm: null,
    desnivelM: null,
    pendienteCaucePorcentaje: null
  },

  lluviaYAbstraccion: {
    // @deprecated Usar estacionIDF
    estacionActiva: "",
    estacionIDF: "",
    parametrosIDF: { k: null, n: null, c: null },
    condicionAMC: "",
    cnBase: null,
    cnAjustado: null,
    cnEfectivo: null,
    peTotalMm: null
  },

  tiempoConcentracion: {
    tcSugeridoMinutos: null,
    metodoPonderacion: "",
    metodosValidos: [],
    metodosExcluidos: []
  },

  escenarioQTrActivo: {
    periodoRetornoTrAnios: null,
    estado: "",
    caudalDisenoM3s: null
  },

  hidrografiaQ5: {
    metodoPrincipal: "SCS Unit Hydrograph",
    caudalPicoM3s: null,
    tiempoPicoMinutos: null,
    volumenIntegradoM3: null,
    metodosComparados: []
  },

  contrasteRacional: {
    caudalPicoM3s: null,
    esAdoptivo: false
  },

  controlConsistencia: {
    volumenEsperadoTeoricoM3: null,
    volumenIntegradoQ5M3: null,
    ratioVolumetrico: null,
    estadoConsistencia: ""
  },

  diagnosticoQt: {
    filasMorfologicas: [],
    filasForma: [],
    filasRiesgo: [],
    sintesisRiesgo: "",
    esAdoptivo: false
  }
});
