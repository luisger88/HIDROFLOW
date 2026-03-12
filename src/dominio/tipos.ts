export interface ParametrosCuenca {
  nombre: string;

  // Geomorfología base (SI)
  area_km2: number;             // A
  perimetro_km: number;         // P
  L_cauce_km: number;           // Longitud de cauce principal
  L_cuenca_km: number;          // Longitud característica de cuenca (eje mayor)
  cota_max_m: number;
  cota_min_m: number;
  cota_mayor_cauce_m: number;
  cota_menor_cauce_m: number;
  pendiente_media_pct: number;  // Sp (%)

  // Red de drenaje (opcional)
  L_red_km?: number;            // Longitud total de drenaje → densidad de drenaje Dd

  // Segmentos TR‑55 (opcional)
  sheet_len_m?: number;
  shallow_len_m?: number;
  channel_len_m?: number;
  n_sheet?: number;
  n_shallow?: number;
  n_channel?: number;

  // Hidrológicos (opcionales)
  CN_II?: number;
  dt_min?: number;

  // Localización del outlet
  lat_salida: number;
  lon_salida: number;
  alt_salida: number;
}

export interface IndicesForma {
  Rf: number;   // factor de forma = A / L_cuenca^2
  Kc: number;   // compacidad de Gravelius = P / (2*sqrt(pi*A))
  Dd?: number;  // densidad de drenaje = L_red / A
  So: number;   // pendiente del cauce (m/m)
  Sp: number;   // pendiente media de cuenca (adim.)
}

export interface TcResultado {
  metodo: string;
  tc_h: number;      // horas
  tc_min: number;    // minutos
  notas?: string;
  soporte?: Record<string, number>;
}

export interface HietogramaOut {
  d_min: number;
  dt_min: number;
  Tr: number;
  P_total_mm: number;
  I_ref_mm_h: number;
  distribucion: 'EPM_Q1'|'Huff_Q1'|'Huff_Q2'|'Huff_Q3'|'Huff_Q4';
  serie: { t_min: number; dP_mm: number; I_mm_h: number; P_acum_mm: number }[];
  trazabilidad: {
    fuente: 'Estacion' | 'Ponderado' | 'Fallback';
    etiqueta: string;     // Estación {id} | Ponderado (IDW/Thiessen)
    sustitucion: string;  // "I = k/(c+d_h)^n" o "Σ(Ii·Wi)"
  };
}
