/**
 * Tipo explícito de Condición de Humedad Antecedente (AMC)
 */
export type AMC = "I" | "II" | "III";

/**
 * Escenario de sensibilidad AMC
 */
export type EscenarioAMC = {
  id: string;
  amc: AMC;
  descripcion: string;
};

/**
 * Resultado hidrológico por escenario AMC
 */
export type ResultadoSensibilidadAMC = {
  escenario: string;
  amc: AMC;
  CN_efectivo: number;
  Qp: number;
  Tp: number;
  Qserie: { t: number; Q: number }[];
};