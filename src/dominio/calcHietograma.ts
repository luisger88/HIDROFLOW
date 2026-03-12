import { HietogramaOut, ParametrosCuenca } from "./tipos";
// Día 1: servicio existente en tu base
import { I_fromFuente } from "../services/I_fromFuente";

function assertDtDivide(d_min: number, dt_min: number) {
  if (d_min % dt_min !== 0) {
    throw new Error(`Δt=${dt_min} no divide la duración d=${d_min}. Ajusta Δt o d para que d/Δt sea entero.`);
  }
}

/** Construcción de distribución acumulada (%) con nSteps intervalos.
 *  NOTA: por ahora es uniforme; TODO: wire con tus tablas EPM_Q1/Huff reales.
 */
function construirDistribucionAcum(nSteps: number): number[] {
  return Array.from({ length: nSteps + 1 }, (_, i) => (i / nSteps) * 100);
}

export function calcHietograma(
  p: ParametrosCuenca,
  d_min: number,
  dt_min: number,
  Tr: number,
  distribucion: HietogramaOut["distribucion"] = "EPM_Q1"
): HietogramaOut {
  assertDtDivide(d_min, dt_min);

  // 1) Intensidad de referencia (mm/h) desde la Fuente IDF Global (Día 1)
  const I_ref = I_fromFuente(d_min, Tr);

  // 2) Lluvia total (mm)
  const P_total = I_ref * (d_min / 60);

  // 3) Distribución acumulada (0..100%) y series
  const nSteps = d_min / dt_min;
  const Ppct = construirDistribucionAcum(nSteps); // TODO: reemplazar por EPM_Q1/Huff reales
  const Pacum = Ppct.map(pct => (pct / 100) * P_total);

  const serie = Array.from({ length: nSteps + 1 }, (_, i) => {
    const t = i * dt_min;
    const P_acum_mm = +(Pacum[i]).toFixed(4);
    const dP_mm = i === 0 ? 0 : +(Pacum[i] - Pacum[i - 1]).toFixed(4);
    const I_mm_h = i === 0 ? 0 : +(dP_mm / (dt_min / 60)).toFixed(3);
    return { t_min: t, dP_mm, I_mm_h, P_acum_mm };
  });

  // 4) Trazabilidad: ajusta según tu store de fuente
  const trazabilidad = {
    fuente: "Ponderado" as const,
    etiqueta: "IDF Ponderada (IDW/Thiessen)",
    sustitucion: "I_pond = Σ(Ii·Wi)",
  };

  return {
    d_min,
    dt_min,
    Tr,
    P_total_mm: +P_total.toFixed(3),
    I_ref_mm_h: +I_ref.toFixed(3),
    distribucion,
    serie,
    trazabilidad,
  };
}
