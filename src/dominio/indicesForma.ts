import { ParametrosCuenca, IndicesForma } from "./tipos";

export function calcIndicesForma(p: ParametrosCuenca): IndicesForma {
  const A  = Math.max(1e-6, p.area_km2);                 // km²
  const P  = Math.max(1e-6, p.perimetro_km);             // km
  const Lc = Math.max(1e-6, p.L_cuenca_km || p.L_cauce_km); // km

  // Factor de forma
  const Rf = A / (Lc * Lc);

  // Compacidad de Gravelius
  const Kc = P / (2 * Math.sqrt(Math.PI * A));

  // Densidad de drenaje (si se dispone de L_red)
  const Dd = p.L_red_km && p.L_red_km > 0 ? p.L_red_km / A : undefined;

  // Pendiente del cauce principal (m/m)
  const deltaZ = p.cota_mayor_cauce_m - p.cota_menor_cauce_m;
  const So = (Lc > 0) ? (deltaZ / (Lc * 1000)) : 0;

  // Pendiente media de cuenca (adimensional)
  const Sp = Math.max(0, p.pendiente_media_pct / 100);

  return { Rf, Kc, Dd, So, Sp };
}
