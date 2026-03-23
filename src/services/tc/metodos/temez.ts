import { TcInputs } from "../tiposTc";

/**
 * Témez
 * Tc en minutos
 * Muy usado en España y LATAM
 */
export function tcTemez(i: TcInputs): number | null {
  if (i.longitud_cauce_km <= 0 || i.pendiente_cauce_pct <= 0) return null;

  const L_km = i.longitud_cauce_km;
  const S = i.pendiente_cauce_pct / 100;

  return (0.3 * Math.pow(L_km, 0.76) * Math.pow(S, -0.19)) * 60;
}
