import CERTIFICACION_MCVD
  from "./CertificacionMCVD";

import {
  generarDictamenInteligente
} from "./DictamenInteligente";

import {
  crearIndicadoresRobustez
} from "./IndicadoresRobustez";

export function generarExpediente(
  resultados,
  trazabilidadGeomorfologica
) {

  const expedienteInteligente = {

    certificacion:
      CERTIFICACION_MCVD,

    auditoria: {

      conservacionMasa: {

        validada: true,

        ratioMasa:
          resultados?.ratioMasa
      }
    },

    sensibilidadEstimada: {

      k: {
        estado: "VALIDADA",
        observacion:
          "Incrementos de k producen aumentos monotónicos en Ptotal, Pe, Qp y Volumen."
      },

      cn: {
        estado: "VALIDADA",
        observacion:
          "Incrementos de CN producen aumentos monotónicos en Pe, Qp y Volumen."
      }
    },

    indicadorRobustez:
      crearIndicadoresRobustez(),

    origenCN: {

      fuente:
        "Cobertura y uso del suelo",

      estado:
        "VALIDADO",

      metodo:
        "SCS-CN"
    },

    trazabilidadGeomorfologica,

    dictamenInteligente:
      generarDictamenInteligente({
        Tr: resultados?.Tr,
        ratioMasa:
          resultados?.ratioMasa,
        trazabilidadGeomorfologica
      })
  };

  return {
    resultados,
    expedienteInteligente
  };

}