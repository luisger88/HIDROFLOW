import { crearPayloadExpedienteVacio } from "../../types/expediente.js";

const numeroSeguro = (valor) => {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
};

const textoSeguro = (valor) =>
  valor === undefined || valor === null ? "" : String(valor);

const primerResultadoQ5 = (metodos = []) =>
  Array.isArray(metodos)
    ? metodos.find((metodo) =>
        String(metodo?.metodo ?? metodo?.nombre ?? "")
          .toLowerCase()
          .includes("scs unit")
      ) ?? null
    : null;

const extraerNumeroMetodo = (metodo, campos) => {
  for (const campo of campos) {
    const valor = numeroSeguro(metodo?.[campo]);
    if (valor !== null) return valor;
  }
  return null;
};

const extraerQTrActivo = (contextoBase = {}) =>
  contextoBase?.q_tr_activo?.tr_activo ??
  contextoBase?.q_tr_activo?.Tr ??
  contextoBase?.q_tr_activo?.TR ??
  contextoBase?.q_tr_activo?.periodoRetorno ??
  contextoBase?.q_tr_activo?.periodo_retorno ??
  contextoBase?.tr_diseno_activo ??
  null;

const extraerQRacionalActivo = (contextoBase = {}) => {
  const resultados = contextoBase?.metodo_racional?.resultados;
  if (!Array.isArray(resultados) || resultados.length === 0) return null;

  const trActivo = Number(extraerQTrActivo(contextoBase));
  const fila =
    resultados.find((item) => Number(item?.Tr ?? item?.TR) === trActivo) ??
    resultados[0];

  return numeroSeguro(fila?.Q ?? fila?.q ?? fila?.caudal);
};

export default function construirPayloadExpedienteDesdeEstado({
  contextoBase = {},
  metodos = [],
  filasMorfologiaQt = [],
  filasDictamenFormaQt = [],
  filasRiesgoTemporalQt = [],
  sintesisRiesgoTemporalQt = "",
  tcState = {},
  autorTecnico = "Luis German Montoya Mejía",
  fechaGeneracion = "",
  idSimulacion = ""
} = {}) {
  const payload = crearPayloadExpedienteVacio();

  const q5 = primerResultadoQ5(metodos);

  const areaKm2 = numeroSeguro(contextoBase?.area_km2);
  const peTotalMm = numeroSeguro(contextoBase?.lluvia_efectiva_total_mm);
  const volumenEsperado =
    areaKm2 !== null && peTotalMm !== null ? areaKm2 * peTotalMm * 1000 : null;

  const volumenQ5 = q5
    ? extraerNumeroMetodo(q5, [
        "volumen",
        "volTotal",
        "volumenTotal",
        "volTotalM3",
        "V",
        "vol"
      ])
    : null;

  const ratio =
    volumenEsperado && volumenQ5 !== null ? volumenQ5 / volumenEsperado : null;

  payload.idSimulacion = textoSeguro(idSimulacion);
  payload.fechaGeneracion = textoSeguro(fechaGeneracion);
  payload.autorTecnico = textoSeguro(autorTecnico);

  payload.cuenca = {
    nombre:
      textoSeguro(contextoBase?.cuenca?.nombre) ||
      textoSeguro(contextoBase?.cuencaActiva?.nombre),
    puntoSalida: {
      id:
        textoSeguro(contextoBase?.cuenca?.id) ||
        textoSeguro(contextoBase?.cuencaActiva?.id),
      lat: numeroSeguro(contextoBase?.cuenca?.lat ?? contextoBase?.lat),
      lon: numeroSeguro(contextoBase?.cuenca?.lon ?? contextoBase?.lon)
    },
    cotaSalidaMsnm: numeroSeguro(
      contextoBase?.cuenca?.cota_salida ?? contextoBase?.cota_salida_msnm
    ),
    cotaAltaMsnm: numeroSeguro(
      contextoBase?.cuenca?.cota_alta ?? contextoBase?.cota_alta_msnm
    )
  };

  payload.geomorfometria = {
    areaKm2,
    longitudCauceKm: numeroSeguro(
      contextoBase?.longitud_cauce_km ?? contextoBase?.longitud_cauce
    ),
    desnivelM: numeroSeguro(contextoBase?.desnivel_m ?? contextoBase?.desnivel),
    pendienteCaucePorcentaje: numeroSeguro(
      contextoBase?.pendiente_media_pct ??
        contextoBase?.pendiente_cauce_pct ??
        contextoBase?.pendiente
    )
  };

  payload.lluviaYAbstraccion = {
    estacionActiva: textoSeguro(
      contextoBase?.estacion_idf ?? contextoBase?.estacionActiva
    ),
    parametrosIDF: {
      k: numeroSeguro(contextoBase?.idf?.k),
      n: numeroSeguro(contextoBase?.idf?.n),
      c: numeroSeguro(contextoBase?.idf?.c)
    },
    condicionAMC: textoSeguro(contextoBase?.amcActual ?? contextoBase?.amc),
    cnBase: numeroSeguro(contextoBase?.cnBase),
    cnAjustado: numeroSeguro(contextoBase?.cnAjustado),
    cnEfectivo: numeroSeguro(contextoBase?.cnEfectivo),
    peTotalMm
  };

  payload.tiempoConcentracion = {
    tcSugeridoMinutos: numeroSeguro(tcState?.Tc_final ?? contextoBase?.tc_global),
    metodoPonderacion: "seleccionarTc(hidrograma)",
    metodosValidos: Array.isArray(tcState?.metodosTc) ? tcState.metodosTc : [],
    metodosExcluidos: ["SCS-Ranser"]
  };

  payload.escenarioQTrActivo = {
    periodoRetornoTrAnios: numeroSeguro(extraerQTrActivo(contextoBase)),
    estado: textoSeguro(contextoBase?.q_tr_activo_estado?.estado),
    caudalDisenoM3s: numeroSeguro(
      contextoBase?.q_tr_activo?.Q ??
        contextoBase?.q_tr_activo?.q ??
        contextoBase?.q_tr_activo?.caudal
    )
  };



  payload.hidrografiaQ5 = {
    metodoPrincipal: textoSeguro(q5?.metodo ?? q5?.nombre) || "SCS Unit Hydrograph",
    caudalPicoM3s: q5
      ? extraerNumeroMetodo(q5, ["Qp", "qp", "Qpico", "qPico", "caudalPico"])
      : null,
    tiempoPicoMinutos: q5
      ? extraerNumeroMetodo(q5, ["Tp", "tp", "tPico", "TPico", "tiempoPico"])
      : null,
    volumenIntegradoM3: volumenQ5,
    metodosComparados: Array.isArray(metodos) ? metodos : [],
   
    qTrMultiEscenario:
      contextoBase?.q_tr_multiescenario ?? null

  };

  payload.contrasteRacional = {
    caudalPicoM3s: extraerQRacionalActivo(contextoBase),
    esAdoptivo: false
  };

  payload.controlConsistencia = {
    volumenEsperadoTeoricoM3: volumenEsperado,
    volumenIntegradoQ5M3: volumenQ5,
    ratioVolumetrico: ratio,
    estadoConsistencia:
      ratio !== null && Math.abs(ratio - 1) <= 0.01
        ? "consistente"
        : "requiere_revision"
  };

  payload.diagnosticoQt = {
    filasMorfologicas: Array.isArray(filasMorfologiaQt) ? filasMorfologiaQt : [],
    filasForma: Array.isArray(filasDictamenFormaQt) ? filasDictamenFormaQt : [],
    filasRiesgo: Array.isArray(filasRiesgoTemporalQt)
      ? filasRiesgoTemporalQt
      : [],
    sintesisRiesgo: textoSeguro(sintesisRiesgoTemporalQt),
    esAdoptivo: false
  };

  return payload;
}

