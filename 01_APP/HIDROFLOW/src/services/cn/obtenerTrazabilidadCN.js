import {
  cnIIaCNI,
  cnIIaCNIII,
  mezclaImpermeable,
  limitarNumero,
  CN_MIN,
  CN_MAX
} from "../hidroEngine";

export function obtenerTrazabilidadCN({
  amcActual,
  porcentajeImpermeable,
  cnBase
}) {

  let cnBaseNormalizado =
    Number.isFinite(Number(cnBase))
      ? Number(cnBase)
      : 75;

  cnBaseNormalizado = limitarNumero(
    cnBaseNormalizado,
    CN_MIN,
    CN_MAX
  );

  const cnAjustado =
    amcActual === "I"
      ? cnIIaCNI(cnBaseNormalizado)
      : amcActual === "III"
      ? cnIIaCNIII(cnBaseNormalizado)
      : cnBaseNormalizado;

  const cnEfectivo =
    mezclaImpermeable(
      cnAjustado,
      porcentajeImpermeable,
      98
    );

  return {
    cnBase:
      +cnBaseNormalizado.toFixed(1),

    cnAjustado:
      +cnAjustado.toFixed(1),

    cnEfectivo:
      +limitarNumero(
        cnEfectivo,
        CN_MIN,
        CN_MAX
      ).toFixed(1)
  };
}
