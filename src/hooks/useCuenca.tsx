import React from "react";

export type ParametrosCuenca = {
  nombre?: string;
  area_km2?: number;
  perimetro_km?: number;
  L_cauce_km?: number;
  L_cuenca_km?: number;
  cota_max_m?: number;
  cota_min_m?: number;
  cota_mayor_cauce_m?: number;
  cota_menor_cauce_m?: number;
  pendiente_media_pct?: number;
  L_red_km?: number;
  sheet_len_m?: number;
  shallow_len_m?: number;
  channel_len_m?: number;
  n_sheet?: number;
  n_shallow?: number;
  n_channel?: number;
  lat_salida?: number;
  lon_salida?: number;
  alt_salida?: number;
};

type CuencaState = {
  nombreCuenca: string;
  setNombreCuenca: (s: string) => void;
  params: ParametrosCuenca;
  setParams: (p: ParametrosCuenca) => void;
  setPartial: (p: Partial<ParametrosCuenca>) => void;
};

// ✅ UNA sola llamada
const CuencaCtx = React.createContext<CuencaState | null>(null);

export function useCuenca(): CuencaState {
  const ctx = React.useContext(CuencaCtx);
  if (!ctx) {
    throw new Error("useCuenca debe usarse bajo <CuencaProvider>");
  }
  return ctx;
}

export function CuencaProvider({ children }: { children: React.ReactNode }) {
  const [nombreCuenca, setNombreCuenca] = React.useState<string>("");
  const [params, setParams] = React.useState<ParametrosCuenca>({});

  const setPartial = (p: Partial<ParametrosCuenca>) =>
    setParams(prev => ({ ...prev, ...p }));

  return (
    <CuencaCtx.Provider
      value={{ nombreCuenca, setNombreCuenca, params, setParams, setPartial }}
    >
      {children}
    </CuencaCtx.Provider>
  );
}