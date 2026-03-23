/**
 * Mensaje interpretativo de sensibilidad hidrológica
 */
export type InterpretacionSensibilidad = {
  titulo: string;
  mensaje: string;
  impacto_Qp_pct?: number;
  impacto_Tp_min?: number;
  recomendacion?: string;
};