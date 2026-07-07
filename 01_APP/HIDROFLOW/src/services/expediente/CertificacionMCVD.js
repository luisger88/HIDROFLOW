export const CERTIFICACION_MCVD = {
  programa: "MCVD",
  version: "0010",
  isCertified: true,
  estado: "CERTIFICADO",

  validaciones: {
    conservacionMasa: true,
    sensibilidadK: true,
    sensibilidadCN: true,
    elasticidadMultiTr: true,
    perturbacionesCombinadas: true
  }
};

export default CERTIFICACION_MCVD;