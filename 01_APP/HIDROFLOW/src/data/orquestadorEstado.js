import { CONTRATO_CUENCA_V1 } from "./contratoCuenca";

export const ORQUESTADOR_ESTADO = {

  contratoCuenca: CONTRATO_CUENCA_V1,

  puntoControl: "La Iguaná PC_80",

  estadoActual: "OT-GOV-002C abierta",

  faseActual: "Apertura",

  responsable: "Ingeniería Hidrológica",

  estadoCertificacion: "Pendiente",

  conocimientoDisponible: [
    "Formulación inicial"
  ],

  memoriaTecnica: [
    "OT-GOV-002C · Apertura"
  ],

  oiVigentes: [
    "OI-0031",
    "OI-0035"
  ],

  riesgos: [
    "Hipótesis no validada",
    "Sin certificación técnica"
  ],

  validacionesPendientes: [
    "Línea base",
    "Hipótesis",
    "Build"
  ],

  situacionActual: {
    siguientePaso: "Formular hipótesis",
    generable: "OT-GOV-002C_APERTURA.md"
  }

};
