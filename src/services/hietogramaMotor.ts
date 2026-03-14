// src/services/hietogramaMotor.ts
// Curva adimensional acumulada (0..100 %) por tiempo (%)

// EPM · Primer Cuartil (acumulada 0..100 %)
export const EPM_Q1_CUM: number[] = [
  0.00, 17.45, 26.64, 35.74, 44.18, 51.62, 57.39, 62.21, 66.35, 70.09,
  73.57, 76.79, 79.86, 82.70, 85.36, 87.84, 90.11, 92.16, 93.90, 95.32, 100.00
];

// Huff (genéricas) por cuartil
export const HUFF_Q1_CUM = [0, 5, 12, 20, 30, 41, 53, 66, 79, 90, 100];
export const HUFF_Q2_CUM = [0, 3, 8, 15, 24, 36, 50, 66, 82, 92, 100];
export const HUFF_Q3_CUM = [0, 2, 6, 12, 20, 32, 48, 66, 84, 94, 100];
export const HUFF_Q4_CUM = [0, 1, 4, 9, 16, 28, 44, 64, 84, 95, 100];