import { TcInputs } from "../tiposTc";

/**
 * Kirpich (1940)
 * Tc en minutos
 * Aplicable a cuencas pequeñas y rurales
 */
export function tcKirpich(i: TcInputs): number | null {
  if (i.longitud_cauce_km <= 0 || i.desnivel_m <= 0) return null;

  const L_m = i.longitud_cauce_km * 1000;
  const S = i.desnivel_m / L_m;

  if (S <= 0) return null;

  // Fórmula original (minutos)
  return 0.0195 * Math.pow(L_m, 0.77) * Math.pow(S, -0.385);
}