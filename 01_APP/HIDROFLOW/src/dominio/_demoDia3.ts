// src/dominio/_demoDia3.ts
import { scsCN } from "./scsCn";
import { buildSCS_UH, convolvePnToQ, kpisQ } from "./scsUh";

// 1) P(t) (mm) por Δt=5 min, ejemplo sencillo
const P = [0, 0, 3, 6, 4, 1, 0, 0]; // mm por bloque
const dt = 5;                       // min
const A  = 36.58;                   // km² (La Iguaná)
const Tc = 120;                     // min (ejemplo)

// 2) Lluvia efectiva con SCS-CN
const { Pn, perdidas, S, Ia } = scsCN({
  precipitacion: P,
  CN: 78,
  AMC: "III",
  pctImpermeable: 10,
});

// 3) UH SCS y Q(t)
const { UH, Tp_min, Tb_min, qp_m3s_mm } = buildSCS_UH({ A_km2: A, Tc_min: Tc, dt_min: dt });
const Q = convolvePnToQ(Pn, UH);
const kpis = kpisQ(Q, dt);

// 4) Mostrar resultados
console.log("P (mm):    ", P);
console.log("Pn (mm):   ", Pn);
console.log("Perdidas:  ", perdidas);
console.log("S (mm):    ", S.toFixed(2), " | Ia (mm):", Ia.toFixed(2));
console.log("UH(m3/s/mm) pico:", qp_m3s_mm, " | Tp(min):", Tp_min, " | Tb(min):", Tb_min);
console.log("Q (m3/s):  ", Q);
console.log("KPIs Q:    ", kpis);