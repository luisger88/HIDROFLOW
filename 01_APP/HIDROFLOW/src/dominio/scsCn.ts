// src/dominio/scsCn.ts
/**
 * Lluvia efectiva según método SCS-CN
 * Convierte P(t) → Pn(t)
 */

export type AMC = "I" | "II" | "III";

export interface EntradaSCS {
  precipitacion: number[]; // mm por Δt
  CN: number;              // Curve Number base (AMC II)
  AMC: AMC;                // I, II o III
  pctImpermeable: number;  // 0–100 %
}

export interface SalidaSCS {
  Pn: number[];            // mm efectivos por Δt
  perdidas: number[];      // mm perdidos por Δt
  S: number;               // mm
  Ia: number;              // mm
}

/**
 * Ajusta CN según AMC (TR-55)
 */
function ajustarCN(CN2: number, AMC: AMC): number {
  if (AMC === "I") {
    return CN2 / (2.281 - 0.01281 * CN2);
  }
  if (AMC === "III") {
    return CN2 / (0.427 + 0.00573 * CN2);
  }
  return CN2; // AMC II
}

/**
 * Calcula lluvia efectiva acumulada
 */
export function scsCN({
  precipitacion,
  CN,
  AMC,
  pctImpermeable,
}: EntradaSCS): SalidaSCS {

  // 1) Ajuste de CN por AMC
  const CN_adj = ajustarCN(CN, AMC);

  // 2) Retención potencial
  const S = (25400 / CN_adj) - 254; // mm
  const Ia = 0.2 * S;

  let Pacum = 0;
  let PnAcumPrev = 0;

  const Pn: number[] = [];
  const perdidas: number[] = [];

  for (let i = 0; i < precipitacion.length; i++) {
    Pacum += precipitacion[i];

    let PnAcum = 0;
    if (Pacum > Ia) {
      PnAcum = Math.pow(Pacum - Ia, 2) / (Pacum - Ia + S);
    }

    const dPn = Math.max(0, PnAcum - PnAcumPrev);
    const dP = precipitacion[i];

    // 3) Ajuste por impermeable
    const dPnFinal = dPn + (pctImpermeable / 100) * dP;
    const dLoss = dP - dPnFinal;

    Pn.push(+dPnFinal.toFixed(5));
    perdidas.push(+dLoss.toFixed(5));

    PnAcumPrev = PnAcum;
  }

  return { Pn, perdidas, S, Ia };
}
