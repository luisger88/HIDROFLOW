import { obtenerTrazabilidadCN }
from "./obtenerTrazabilidadCN";

const resultado =
  obtenerTrazabilidadCN({
    amcActual: "II",
    porcentajeImpermeable: 60,
    cnBase: 88
  });

console.log(
  "[CN_TRAZABILIDAD_PRUEBA]",
  JSON.stringify(
    resultado,
    null,
    2
  )
);
