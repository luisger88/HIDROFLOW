import { obtenerTrazabilidadCN } from "./obtenerTrazabilidadCN";

export function validarTrazabilidadCN() {

  const resultado =
    obtenerTrazabilidadCN({
      amcActual: "II",
      porcentajeImpermeable: 60,
      cnBase: 88
    });

  console.log(
  "[CN_TRAZABILIDAD_JSON]",
  JSON.stringify(
    resultado,
    null,
    2
  )
);

  return resultado;
}
