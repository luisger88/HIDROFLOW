// src/hooks/useHidrograma.ts
import React from "react";
import { scsCN, AMC } from "../dominio/scsCn";
import { buildSCS_UH, convolvePnToQ, kpisQ } from "../dominio/scsUh";

export type EntradasHidro = {
  // Lluvia
  P_mm: number[];    // P(t) en mm por bloque Δt (del hietograma)
  dt_min: number;    // Δt (min)

  // Cuenca
  A_km2: number;     // Área (km²)
  Tc_min: number;    // Tc (min)

  // SCS-CN
  CN: number;        // CN AMC II
  AMC: AMC;          // "I" | "II" | "III"
  pctImperv: number; // 0–100 %
};

export function useHidrograma(entradas: EntradasHidro) {
  const { P_mm, dt_min, A_km2, Tc_min, CN, AMC, pctImperv } = entradas;

  return React.useMemo(() => {
    if (!P_mm?.length || !dt_min || !A_km2 || !Tc_min) {
      return {
        ok: false,
        Pn_mm: [],
        UH_m3s_per_mm: [],
        Q_m3s: [],
        kpis: { Qp_m3s: 0, Tp_idx: 0, Vol_m3: 0 },
        meta: { Tp_min: 0, Tb_min: 0, qp_m3s_mm: 0 }
      };
    }

    // 1) Lluvia efectiva
    const { Pn, S, Ia } = scsCN({
      precipitacion: P_mm,
      CN,
      AMC,
      pctImpermeable: pctImperv
    });

    // 2) UH SCS
    const { UH, Tp_min, Tb_min, qp_m3s_mm } = buildSCS_UH({
      A_km2,
      Tc_min,
      dt_min
    });

    // 3) Convolución Q(t)
    const Q = convolvePnToQ(Pn, UH);

    // 4) KPIs
    const kpis = kpisQ(Q, dt_min);

    return {
      ok: true,
      Pn_mm: Pn,
      UH_m3s_per_mm: UH,
      Q_m3s: Q,
      kpis,
      meta: { Tp_min, Tb_min, qp_m3s_mm, S, Ia }
    };
  }, [P_mm, dt_min, A_km2, Tc_min, CN, AMC, pctImperv]);
}