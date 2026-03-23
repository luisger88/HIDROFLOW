import { TcInputs } from "../tiposTc";

/**
 * Giandotti
 * Tc en minutos
 * Integra área, longitud y relieve
 */
export function tcGiandotti(i: TcInputs): number | null {
  if (
    i.area_km2 <= 0 ||
    i.longitud_cauce_km <= 0 ||
    i.desnivel_m <= 0
  ) return null;

  const A = i.area_km2;
  const L = i.longitud_cauce_km;
  const H = i.desnivel_m;

  return ((4 * Math.sqrt(A) + 1.5 * L) / Math.sqrt(H)) * 60;
}