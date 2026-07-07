import { crearPayloadExpedienteVacio } from "../../types/expediente.js";

import { obtenerTrazabilidadCN } from "../cn/obtenerTrazabilidadCN";

const numeroSeguro = (valor) => {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
};

const textoSeguro = (valor) =>
  valor === undefined || valor === null ? "" : String(valor);

const validarK = (valor) => {
  const numero = Number(valor);

  return Number.isFinite(numero) && numero > 0
    ? numero
    : null;
};

const validarN = (valor) => {
  const numero = Number(valor);

  return Number.isFinite(numero) && numero > 0
    ? numero
    : null;
};

const validarC = (valor) => {
  const numero = Number(valor);

  return Number.isFinite(numero) && numero >= 0
    ? numero
    : null;
};

const validarAMC = (valor) => {
  const catalogo = ["I", "II", "III"];

  return catalogo.includes(valor)
    ? valor
    : "II";
};

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

const extraerQTrActivoDesdeEscenarios = (
  contextoBase = {}
) => {

  const fuente =
    contextoBase?.q_tr_multiescenario;

  const escenarios =
    Array.isArray(fuente)
      ? fuente
      : Array.isArray(fuente?.escenarios)
      ? fuente.escenarios
      : [];

  if (!Array.isArray(escenarios) || escenarios.length === 0) {
    return null;
  }

  const trActivo =
    Number(
      extraerQTrActivo(
        contextoBase
      )
    );

  if (!Number.isFinite(trActivo)) {
    return null;
  }

  const fila =
    escenarios.find(
      (e) =>
        Number(
          e?.Tr ??
          e?.TR ??
          e?.tr ??
          e?.periodoRetorno ??
          e?.periodo_retorno
        ) === trActivo
    ) ?? null;

  if (!fila) {
    return null;
  }

  const hidrogramaSCS =
    Array.isArray(fila?.hidrogramas)
      ? fila.hidrogramas.find(
          (h) =>
            String(
              h?.metodo ??
              h?.nombre ??
              ""
            )
              .toLowerCase()
              .includes("scs")
        ) ?? null
      : null;

  return numeroSeguro(
    fila?.Q ??
    fila?.q ??
    fila?.QDiseno ??
    fila?.qDiseno ??
    fila?.caudal ??
    hidrogramaSCS?.Qp ??
    hidrogramaSCS?.Qpico ??
    hidrogramaSCS?.caudalPico
  );

};

const extraerHidrogramaQ5DesdeEscenarioActivo = (
  contextoBase = {}
) => {

  const fuente =
    contextoBase?.q_tr_multiescenario;

  const escenarios =
    Array.isArray(fuente)
      ? fuente
      : Array.isArray(fuente?.escenarios)
      ? fuente.escenarios
      : [];

  if (!Array.isArray(escenarios) || escenarios.length === 0) {
    return null;
  }

  const trActivo =
    Number(
      extraerQTrActivo(
        contextoBase
      )
    );

  if (!Number.isFinite(trActivo)) {
    return null;
  }

  const escenario =
    escenarios.find(
      (e) =>
        Number(
          e?.Tr ??
          e?.TR ??
          e?.tr ??
          e?.periodoRetorno ??
          e?.periodo_retorno
        ) === trActivo
    ) ?? null;

  if (!escenario || !Array.isArray(escenario?.hidrogramas)) {
    return null;
  }

  const hidrogramaSCS =
    escenario.hidrogramas.find(
      (h) =>
        String(
          h?.metodo ??
          h?.nombre ??
          ""
        )
          .toLowerCase()
          .includes("scs")
    ) ?? null;

  if (!hidrogramaSCS) {
    return null;
  }

  return {
  metodo:
    hidrogramaSCS?.metodo ??
    hidrogramaSCS?.nombre ??
    "SCS Unit Hydrograph",

  Qp:
    hidrogramaSCS?.Qp ??
    hidrogramaSCS?.Qpico ??
    hidrogramaSCS?.caudalPico ??
    null,

  Tp:
    hidrogramaSCS?.Tp ??
    hidrogramaSCS?.tPico ??
    hidrogramaSCS?.tiempoPico ??
    null,

  volumen:
    hidrogramaSCS?.volumen ??
    hidrogramaSCS?.volTotal ??
    hidrogramaSCS?.volumenTotal ??
    null,

  lluviaEfectivaTotalMm:
    escenario?.lluviaEfectivaTotalMm ??
    escenario?.PeTotalMm ??
    escenario?.peTotalMm ??
    null,

  Tr:
    escenario?.Tr ??
    escenario?.TR ??
    escenario?.tr ??
    null
};

};

const extraerQRacionalActivo = (contextoBase = {}) => {

  const resultados =
    contextoBase?.metodo_racional?.resultados;

  if (
    !Array.isArray(resultados) ||
    resultados.length === 0
  ) {
    return null;
  }

  const trActivo =
    Number(
      extraerQTrActivo(
        contextoBase
      )
    );

  const fila =
    resultados.find(
      (item) =>
        Number(
          item?.Tr ??
          item?.TR
        ) === trActivo
    ) ?? resultados[0];

  return numeroSeguro(
    fila?.Q ??
    fila?.q ??
    fila?.caudal
  );

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

  const q5DesdeEscenarioActivo =
  extraerHidrogramaQ5DesdeEscenarioActivo(
    contextoBase
  );

const q5 =
  q5DesdeEscenarioActivo ??
  primerResultadoQ5(
    metodos
  );

  const areaKm2 = numeroSeguro(contextoBase?.area_km2);

const peTotalMm =
  numeroSeguro(
    q5DesdeEscenarioActivo?.lluviaEfectivaTotalMm
  ) ??
  numeroSeguro(
    contextoBase?.lluvia_efectiva_total_mm
  );

const volumenEsperado =
  areaKm2 !== null && peTotalMm !== null
    ? areaKm2 * peTotalMm * 1000
    : null;

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

  const trazabilidadCN =
  obtenerTrazabilidadCN({
    amcActual:
      contextoBase?.amcActual ??
      contextoBase?.amc ??
      "II",

    porcentajeImpermeable:
      contextoBase?.porcentajeImpermeable ??
      contextoBase?.porcentaje_impermeable ??
      0,

    cnBase:
      contextoBase?.cnBase ??
      contextoBase?.CN ??
      null
  });

  const advertencias = [];

const cnAjustadoAudit =
  Number(trazabilidadCN?.cnAjustado);

const cnEfectivoAudit =
  Number(trazabilidadCN?.cnEfectivo);

if (
  Number.isFinite(cnEfectivoAudit) &&
  Number.isFinite(cnAjustadoAudit) &&
  cnEfectivoAudit < cnAjustadoAudit
) {
  advertencias.push({
    codigo: "CN-001",
    mensaje:
      "CN efectivo es menor que CN ajustado (incoherencia hidrológica detectada).",
    nivel: "CRITICO"
  });
}

const metodoIDFAudit =
  textoSeguro(contextoBase?.metodoIDF);

const kAudit =
  validarK(contextoBase?.idf?.k);

const nAudit =
  validarN(contextoBase?.idf?.n);

const cAudit =
  validarC(contextoBase?.idf?.c);

if (
  metodoIDFAudit === "EPM" &&
  (
    kAudit === null ||
    nAudit === null ||
    cAudit === null
  )
) {
  advertencias.push({
    codigo: "IDF-001",
    mensaje:
      "Parámetros de subcontrato IDF incompletos para método EPM.",
    nivel: "CRITICO"
  });
}

  payload.lluviaYAbstraccion = {   
    estacionIDF: textoSeguro(
  contextoBase?.estacion_idf
),
    metodoIDF: textoSeguro(
  contextoBase?.metodoIDF
),
    parametrosIDF: {
  k: validarK(contextoBase?.idf?.k),
  n: validarN(contextoBase?.idf?.n),
  c: validarC(contextoBase?.idf?.c)
},

condicionAMC: validarAMC(
  contextoBase?.amcActual ??
  contextoBase?.amc
),

cnBase: numeroSeguro(
  trazabilidadCN?.cnBase
),

cnAjustado: numeroSeguro(
  trazabilidadCN?.cnAjustado
),

cnEfectivo: numeroSeguro(
  trazabilidadCN?.cnEfectivo
),

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
    caudalDisenoM3s:

  numeroSeguro(
    contextoBase?.q_tr_activo?.Q ??
    contextoBase?.q_tr_activo?.q ??
    contextoBase?.q_tr_activo?.caudal
  )

  ??

  extraerQTrActivoDesdeEscenarios(
    contextoBase
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

  console.log(
  "AUDITORIA_TR_ACTIVO",
  extraerQTrActivo(contextoBase)
);

console.log(
  "AUDITORIA_QTR_MULTIESCENARIO",
  contextoBase?.q_tr_multiescenario
);

console.log(
  "AUDITORIA_ESCENARIO_QTR",
  payload?.escenarioQTrActivo
);

console.log(
  "AUDITORIA_PRIMER_Q5",
  q5
);

console.log(
  "AUDITORIA_METODOS_Q5",
  metodos
);

console.table([
  {
    escenario: "MCVD-0007A",
    k: payload?.lluviaYAbstraccion?.parametrosIDF?.k,
    intensidad: payload?.lluviaYAbstraccion?.intensidadMmH,
    pe: payload?.lluviaYAbstraccion?.peTotalMm,
    qTr: payload?.escenarioQTrActivo?.caudalDisenoM3s,
    qp: payload?.hidrografiaQ5?.caudalPicoM3s,
    volumen: payload?.hidrografiaQ5?.volumenIntegradoM3
  }
]);

payload.advertencias = advertencias;

return payload;
}

