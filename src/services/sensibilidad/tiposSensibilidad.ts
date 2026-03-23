/**
 * Escenario de sensibilidad para Tc
 */
export type EscenarioTc = {
  id: string;            // ej: "tc_bajo", "tc_base", "tc_alto"
  tc_min: number;
  descripcion: string;
};

/**
 * Resultado hidrológico por escenario
 */
export type ResultadoSensibilidadTc = {
  escenario: string;
  tc_min: number;
  Qp: number;
  Tp: number;
  Qserie: { t: number; Q: number }[];
};