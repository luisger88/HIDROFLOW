/**
 * Entradas geomorfológicas para cálculo de Tc
 * Derivadas de SIG
 */
export type TcInputs = {
  area_km2: number;
  longitud_cauce_km: number;
  pendiente_cauce_pct: number;
  desnivel_m: number;

  cn?: number;
  porcentaje_impermeable?: number;

  tc_user_defined_min?: number;
};

/**
 * Resultados Tc por método
 */
export type TcResultados = {
  [metodo: string]: number | null;
};