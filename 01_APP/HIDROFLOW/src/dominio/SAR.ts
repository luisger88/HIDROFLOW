/**
 * Estados hidrológicos evaluados por el módulo SAR
 */
export type EstadoSAR = "PRE_URBANO" | "POST_URBANO";

/**
 * Resultado hidrológico por estado
 */
export type HidrogramaSAR = {
  estado: EstadoSAR;
  CN_efectivo: number;
  Qp: number;                      // Caudal pico (l/s o m3/s)
  Qserie: { t: number; Q: number }[];
};

/**
 * Resultado final del análisis SAR
 * (GT-AS-004)
 */
export type ResultadoSAR = {
  Q_regulado: number;              // Qp PRE-URBANO
  Q_entrada: number;               // Qp POST-URBANO
  V_excedente: number;             // Volumen SAR requerido
  estadoGobernante: EstadoSAR;     // Siempre PRE_URBANO para Qd
  clasificacionCuenca: "RURAL" | "URBANA" | "MIXTA";
  cumplimientoGTAS004: boolean;
};