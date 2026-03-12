import { ParametrosCuenca, TcResultado } from "./tipos";
import { calcIndicesForma } from "./indicesForma";

const toMin = (h: number) => h * 60;
const round2 = (v: number) => Math.round(v * 100) / 100;

// ===== 6 MÉTODOS YA PRESENTES EN TU CÓDIGO (formalizados) =====
export function tc_Temez(p: ParametrosCuenca): TcResultado {
  const L = p.L_cauce_km;
  const { So } = calcIndicesForma(p);
  const h = 0.3 * Math.pow(L / Math.pow(Math.max(So,1e-5), 0.25), 0.76);
  return { metodo: "Témez (1978)", tc_h: h, tc_min: round2(toMin(h)), soporte: { L, So } };
}

export function tc_Kirpich(p: ParametrosCuenca): TcResultado {
  const Lft = p.L_cauce_km * 3280.84;
  const Sf  = (p.cota_mayor_cauce_m - p.cota_menor_cauce_m) / (p.L_cauce_km * 3280.84);
  const h   = 0.0078 * Math.pow(Lft, 0.77) * Math.pow(Math.max(Sf,1e-5), -0.385) / 60;
  return { metodo: "Kirpich (1940)", tc_h: h, tc_min: round2(toMin(h)), soporte: { Lft, Sf } };
}

export function tc_California(p: ParametrosCuenca): TcResultado {
  const Lm = p.L_cauce_km * 1000;
  const { So } = calcIndicesForma(p);
  const h = 0.0195 * Math.pow(Lm, 0.77) * Math.pow(Math.max(So,1e-5), -0.385) / 60;
  return { metodo: "California (1942)", tc_h: h, tc_min: round2(toMin(h)), soporte: { Lm, So } };
}

export function tc_Giandotti(p: ParametrosCuenca): TcResultado {
  const A = p.area_km2, L = p.L_cauce_km;
  const delta = p.cota_max_m - p.cota_min_m;
  const h = (4 * Math.sqrt(A) + 1.5 * L) / (0.8 * Math.sqrt(Math.max(delta,1e-6)));
  return { metodo: "Giandotti (1934)", tc_h: h, tc_min: round2(toMin(h)), soporte: { A, L, delta } };
}

export function tc_SCS_Ranser(p: ParametrosCuenca): TcResultado {
  const Lm = p.L_cauce_km * 1000;
  const CN = Math.max(30, Math.min(98, p.CN_II ?? 75));
  const Ss = (25400 / CN) - 254; // mm
  const { Sp } = calcIndicesForma(p);
  const h = Math.pow(Lm, 0.8) * Math.pow(Ss + 1, 0.7) / (4655 * Math.pow(Math.max(Sp,1e-4), 0.5));
  return { metodo: "SCS-Ranser (1958)", tc_h: h, tc_min: round2(toMin(h)), soporte: { Lm, Ss, Sp } };
}

export function tc_PerezMontgomery(p: ParametrosCuenca): TcResultado {
  const L = p.L_cauce_km; const { So } = calcIndicesForma(p);
  const h = 0.1039 * Math.pow(L, 0.7) * Math.pow(Math.max(So,1e-5), -0.3);
  return { metodo: "Pérez–Montgomery (1985)", tc_h: h, tc_min: round2(toMin(h)), soporte: { L, So } };
}

// ===== “SLOTS” PARA 6–9 MÉTODOS ADICIONALES (TODO/por calibrar) =====
export function tc_TR55_segmentado(p: ParametrosCuenca): TcResultado {
  return { metodo: "NRCS TR-55 (segmentado)", tc_h: NaN, tc_min: NaN, notas: "TODO: sumar sheet+shallow+channel con límites de aplicabilidad" };
}
export function tc_KerbyHathaway(p: ParametrosCuenca): TcResultado {
  return { metodo: "Kerby-Hathaway (overland)", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };
}
export function tc_BransbyWilliams(p: ParametrosCuenca): TcResultado {
  return { metodo: "Bransby-Williams", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };
}
export function tc_Izzard(p: ParametrosCuenca): TcResultado {
  return { metodo: "Izzard", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };
}
export function tc_JohnstoneCross(p: ParametrosCuenca): TcResultado {
  return { metodo: "Johnstone-Cross", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };
}
export function tc_Ventura(p: ParametrosCuenca): TcResultado {
  return { metodo: "Ventura (local)", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };
}

// ===== API =====
export function calcTcTodos(p: ParametrosCuenca): TcResultado[] {
  return [
    tc_Temez(p), tc_Kirpich(p), tc_California(p), tc_Giandotti(p),
    tc_SCS_Ranser(p), tc_PerezMontgomery(p),
    tc_TR55_segmentado(p), tc_KerbyHathaway(p), tc_BransbyWilliams(p),
    tc_Izzard(p), tc_JohnstoneCross(p), tc_Ventura(p),
  ];
}

export function sugerirMetodoTc(p: ParametrosCuenca): { metodo: string; motivo: string } {
  const { Rf, Kc, Dd, So, Sp } = calcIndicesForma(p);

  if (So > 0.02 && Sp > 0.03) {
    return { metodo: "Kirpich (1940)", motivo: "Cauce escarpado (So>2%) y cuenca pendiente (Sp>3%)" };
  }
  if ((Rf < 0.3 && Kc > 1.7) || (Dd && Dd > 2.5)) {
    return { metodo: "California (1942)", motivo: "Cuenca alargada/compacidad alta o drenaje denso" };
  }
  if (p.sheet_len_m && p.shallow_len_m && p.channel_len_m) {
    return { metodo: "NRCS TR-55 (segmentado)", motivo: "Se dispone de segmentos (overland/shallow/channel)" };
  }
  return { metodo: "Témez (1978)", motivo: "Condición estándar; método robusto para cuencas medias" };
}

export function calcTcSeleccion(p: ParametrosCuenca, metodo: string): TcResultado {
  const res = calcTcTodos(p).find(t => t.metodo.toLowerCase() === metodo.toLowerCase());
  if (!res) throw new Error(`Método Tc no reconocido: ${metodo}`);
  return res;
}
