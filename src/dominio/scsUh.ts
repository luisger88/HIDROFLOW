// src/dominio/scsUh.ts

/**
 * Hidrograma Unitario SCS (triangular, MVP) y convolución Q(t)
 * - T_lag = 0.6 * Tc
 * - D = Δt (duración del exceso por bloque)
 * - Tp = T_lag + D/2
 * - Tb = 2.67 * Tp
 * - qp se ajusta por conservación de volumen (1 mm en A km²)
 *
 * Salidas:
 *   - UH: arreglo de ordinadas (m³/s por mm)
 *   - Q:  Q(t) = Pn(mm) * UH (convolución discreta, m³/s)
 */

export type UHParams = {
  A_km2: number;   // Área de cuenca [km²]
  Tc_min: number;  // Tiempo de concentración [min]
  dt_min: number;  // Δt de cálculo [min]
};

export type UHTriangular = {
  UH: number[];    // Ordinadas del hidrograma unitario [m³/s por mm]
  Tp_min: number;  // Tiempo al pico [min]
  Tb_min: number;  // Tiempo de base [min]
  qp_m3s_mm: number; // Ordinada pico del UH [m³/s por mm]
};

/**
 * Construye un UH SCS triangular (m³/s por mm) discretizado a Δt.
 */
export function buildSCS_UH({ A_km2, Tc_min, dt_min }: UHParams): UHTriangular {
  if (A_km2 <= 0) throw new Error("Área A_km2 debe ser > 0");
  if (Tc_min <= 0) throw new Error("Tc_min debe ser > 0");
  if (dt_min <= 0) throw new Error("dt_min debe ser > 0");

  const Tlag = 0.6 * Tc_min;   // [min]
  const D = dt_min;            // [min]
  const Tp = Tlag + D / 2;     // [min]
  const Tb = 2.67 * Tp;        // [min]

  // Volumen de 1 mm sobre A (m³)
  const A_m2 = A_km2 * 1e6;        // [m²]
  const V_1mm = A_m2 * 1e-3;       // [m³] (1 mm = 1e-3 m)
  // Área del triángulo (qp * Tb/2) * 60 [s/min] = V_1mm  => qp = 2*V_1mm / (Tb*60)
  const qp = (2 * V_1mm) / (Tb * 60); // [m³/s por mm]

  // Discretización a Δt
  const n = Math.ceil(Tb / dt_min) + 1;
  const UH: number[] = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const t = i * dt_min;
    let val = 0;
    if (t <= Tp) {
      // subida lineal: 0 -> qp
      val = qp * (t / Tp);
    } else if (t <= Tb) {
      // bajada lineal: qp -> 0
      val = qp * ((Tb - t) / (Tb - Tp));
    } else {
      val = 0;
    }
    UH[i] = +val.toFixed(6);
  }

  // Ajuste fino de masa por trapezoidal (garantizar área = 1 mm):

  // Volumen del UH en "m³ por mm" debería ser V_1mm.
  // En discretización, el "área" (integral) ≈ sum((UH[i] + UH[i-1])/2 * Δt_min*60).
  const dt_s = dt_min * 60;
  let integ = 0;
  for (let i = 1; i < UH.length; i++) {
    const trap = 0.5 * (UH[i] + UH[i - 1]) * dt_s; // [m³ por mm]
    integ += trap;
  }
  if (integ > 0) {
    const corr = V_1mm / integ;
    for (let i = 0; i < UH.length; i++) UH[i] = +(UH[i] * corr).toFixed(6);
  }

  return {
    UH,
    Tp_min: +Tp.toFixed(2),
    Tb_min: +Tb.toFixed(2),
    qp_m3s_mm: +UH[Math.round(Tp / dt_min)].toFixed(6),
  };
}

/**
 * Convolución discreta: Q(t) = Pn(mm) * UH(m³/s/mm) → m³/s
 * - Pn: lluvia efectiva por bloque [mm]
 * - UH: ordinadas del UH [m³/s por mm]
 * Devuelve Q con longitud Pn.length + UH.length - 1
 */
export function convolvePnToQ(Pn_mm: number[], UH_m3s_per_mm: number[]): number[] {
  const n = Pn_mm.length;
  const m = UH_m3s_per_mm.length;
  const out = new Array(n + m - 1).fill(0);

  for (let i = 0; i < n; i++) {
    const p = Pn_mm[i];
    if (p === 0) continue;
    for (let j = 0; j < m; j++) {
      out[i + j] += p * UH_m3s_per_mm[j];
    }
  }
  // Redondeo amable
  for (let k = 0; k < out.length; k++) out[k] = +out[k].toFixed(6);
  return out;
}

/**
 * KPIs básicos del hidrograma Q(t):
 * - Qp: caudal pico (m³/s)
 * - Tp_idx: índice del pico
 * - Volumen total: integral discreta ≈ sum(Q)*Δt_s (m³) [si deseas reportarlo]
 */
export function kpisQ(Q_m3s: number[], dt_min: number) {
  let Qp = -Infinity;
  let Tp_idx = 0;
  for (let i = 0; i < Q_m3s.length; i++) {
    if (Q_m3s[i] > Qp) {
      Qp = Q_m3s[i];
      Tp_idx = i;
    }
  }
  const dt_s = dt_min * 60;
  const Vol_m3 = Q_m3s.reduce((a, b) => a + b, 0) * dt_s;
  return { Qp_m3s: +Qp.toFixed(3), Tp_idx, Vol_m3: +Vol_m3.toFixed(1) };
}