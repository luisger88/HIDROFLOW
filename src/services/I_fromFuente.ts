// src/services/I_fromFuente.ts
// ⚠️ Wrapper temporal para PR-1: devuelve I(d,Tr) en mm/h con la forma canónica.
// TODO (PR siguiente): reemplazar por el motor IDF real (estación/ponderado/fallback).

type ParamsIDF = { k: number; n: number; c: number };

// Parámetros “tipo” por TR (puedes ajustarlos si quieres).
const BASE: Record<number, ParamsIDF> = {
  2.33: { k: 55,  n: 0.94, c: 0.4 },
  5:    { k: 60,  n: 0.95, c: 0.4 },
  10:   { k: 68,  n: 0.96, c: 0.4 },
  25:   { k: 78,  n: 0.99, c: 0.4 },
  50:   { k: 86,  n: 1.00, c: 0.4 },
  100:  { k: 94,  n: 1.01, c: 0.4 }
};

function pickParams(Tr: number): ParamsIDF {
  const keys = [2.33, 5, 10, 25, 50, 100];
  const best = keys.reduce((a, b) => Math.abs(b - Tr) < Math.abs(a - Tr) ? b : a, keys[0]);
  return BASE[best];
}

// Intensidad (mm/h) para duración d_min (min) y Tr (años).
export function I_fromFuente(d_min: number, Tr: number): number {
  const d_h = Math.max(1e-6, d_min / 60);
  const { k, n, c } = pickParams(Tr);
  // i = k / (c + d)^n  (d en horas)
  return k / Math.pow(c + d_h, n);
}
