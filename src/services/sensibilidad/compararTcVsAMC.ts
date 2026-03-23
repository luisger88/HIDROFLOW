import { ResultadoSensibilidadTc } from "./tiposSensibilidad";
import { ResultadoSensibilidadAMC } from "./tiposSensibilidadAMC";

/**
 * Resultado de comparación Tc vs AMC
 */
export type ComparacionTcVsAMC = {
  impactoTc_pct: number;
  impactoAMC_pct: number;
  factorDominante: "Tc" | "AMC" | "Similar";
  interpretacion: string;
};

/**
 * Compara el impacto relativo de Tc y AMC sobre el caudal pico (Qp)
 */
export function compararTcVsAMC(
  resultadosTc: ResultadoSensibilidadTc[],
  resultadosAMC: ResultadoSensibilidadAMC[]
): ComparacionTcVsAMC {

  // --- Tc ---
  const baseTc =
    resultadosTc.find(r =>
      r.escenario.toLowerCase().includes("adoptado")
    ) ?? resultadosTc[0];

  const extremosTc = resultadosTc.filter(r => r !== baseTc);
  const impactoTc_pct = Math.max(
    ...extremosTc.map(r => Math.abs((r.Qp - baseTc.Qp) / baseTc.Qp) * 100)
  );

  // --- AMC ---
  const baseAMC =
    resultadosAMC.find(r => r.amc === "II") ?? resultadosAMC[0];

  const extremosAMC = resultadosAMC.filter(r => r !== baseAMC);
  const impactoAMC_pct = Math.max(
    ...extremosAMC.map(r => Math.abs((r.Qp - baseAMC.Qp) / baseAMC.Qp) * 100)
  );

  // --- Dominancia ---
  let factorDominante: "Tc" | "AMC" | "Similar" = "Similar";
  let interpretacion = "";

  if (impactoTc_pct > impactoAMC_pct * 1.15) {
    factorDominante = "Tc";
    interpretacion =
      `La variación del tiempo de concentración genera un impacto mayor ` +
      `en el caudal pico (≈ ${impactoTc_pct.toFixed(1)} %) que la condición ` +
      `de humedad antecedente AMC (≈ ${impactoAMC_pct.toFixed(1)} %). ` +
      `Para esta cuenca, la incertidumbre geomorfológica domina el diseño.`;
  } else if (impactoAMC_pct > impactoTc_pct * 1.15) {
    factorDominante = "AMC";
    interpretacion =
      `La condición de humedad antecedente (AMC) domina el caudal pico ` +
      `(≈ ${impactoAMC_pct.toFixed(1)} %) frente a la variación del tiempo ` +
      `de concentración (≈ ${impactoTc_pct.toFixed(1)} %). ` +
      `El estado de saturación es crítico para el diseño.`;
  } else {
    interpretacion =
      `El impacto de la variación de Tc (≈ ${impactoTc_pct.toFixed(1)} %) ` +
      `y de la condición AMC (≈ ${impactoAMC_pct.toFixed(1)} %) es comparable. ` +
      `Ambos factores deben considerarse de forma conjunta en el diseño.`;
  }

  return {
    impactoTc_pct,
    impactoAMC_pct,
    factorDominante,
    interpretacion
  };
}