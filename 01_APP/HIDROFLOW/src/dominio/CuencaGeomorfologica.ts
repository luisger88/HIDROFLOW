/**
 * Contrato geomorfológico maestro de la cuenca
 * Equivalente al Basin Model de HEC-HMS
 * ESTE ARCHIVO DEFINE SOLO TIPOS (NO CÓDIGO EJECUTABLE)
 */

export type CuencaGeomorfologica = {
  id: string;
  nombre: string;

  sistema_referencia?: string;

  geometria: {
    area_km2: number;
    perimetro_km?: number;
    centroide?: [number, number];
    coef_compacidad?: number;
    coef_elongacion?: number;
  };

  drenaje: {
    longitud_cauce_principal_km: number;
    longitud_total_drenaje_km?: number;
    orden_strahler?: number;
    densidad_drenaje_km_km2?: number;
    pendiente_cauce_pct?: number;
  };

  relieve: {
    cota_min_m: number;
    cota_max_m: number;
    desnivel_m: number;
    pendiente_media_cuenca_pct?: number;
    hipsometria?: number[];
  };

  tiempo_concentracion: {
    /**
     * Resultados Tc por todos los métodos disponibles
     * (calculados por calcTc)
     */
    metodos: {
      kirpich_min?: number | null;
      california_min?: number | null;
      temez_min?: number | null;
      giandotti_min?: number | null;
      scs_lag_min?: number | null;
      kerby_hathaway_min?: number | null;
      izzard_min?: number | null;
      nrcs_velocity_min?: number | null;
      faa_min?: number | null;
      dooge_min?: number | null;
      ventura_min?: number | null;
      user_defined_min?: number | null;
    };

    /**
     * Tiempo de concentración adoptado (min)
     */
    tc_adoptado_min: number;

    /**
     * Criterio de adopción del Tc (auditable)
     */
    criterio_adopcion?: string;
  };

  uso_suelo: {
    porcentaje_impermeable: number;
    cn_base: number;
    cn_ponderado?: number;
    cn_efectivo?: number;
  };

  salida: {
    lat: number;
    lon: number;
  };
};