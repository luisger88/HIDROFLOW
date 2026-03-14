// src/dominio/calcHietograma.ts
import { HietogramaOut, ParametrosCuenca } from "./tipos";
import { I_fromFuente } from "../services/I_fromFuente"; // AJUSTA RUTA EN EL PASO C
import {
  EPM_Q1_CUM,
  HUFF_Q1_CUM,
  HUFF_Q2_CUM,
  HUFF_Q3_CUM,
  HUFF_Q4_CUM
} from "../services/hietogramaMotor"; // ya lo creaste

function assertDtDivide(d_min: number, dt_min: number) {
  if (d_min % dt_min !== 0) {
    // Validación coherente con la idea de “Control/Δt” (HMS avisa cuando el intervalo no es adecuado) [1](https://areametro-my.sharepoint.com/personal/luis_montoya_metropol_gov_co/Documents/Archivos%20de%20chat%20de%20Microsoft%C2%A0Copilot/GT-AS-004GuiaSistemasAlmacenamientoRegulacionAguasLluvias_RevA.pdf)
    throw new Error(`Δt=${dt_min} no divide d=${d_min}. Cambia Δt o usa un chip de duración válido.`);
  }
}

function pickCurve(dist: HietogramaOut['distribucion']): number[] {
  switch (dist) {
    case "EPM_Q1":  return EPM_Q1_CUM;  // Curva oficial (GT‑AS‑004, Tabla 4) [1](https://areametro-my.sharepoint.com/personal/luis_montoya_metropol_gov_co/Documents/Archivos%20de%20chat%20de%20Microsoft%C2%A0Copilot/GT-AS-004GuiaSistemasAlmacenamientoRegulacionAguasLluvias_RevA.pdf)
    case "Huff_Q1": return HUFF_Q1_CUM;
    case "Huff_Q2": return HUFF_Q2_CUM;
    case "Huff_Q3": return HUFF_Q3_CUM;
    case "Huff_Q4": return HUFF_Q4_CUM;
    default:        return EPM_Q1_CUM;
  }
}

/** Interpola una curva 0..100% a nSteps+1 valores (incluye 0 y 100). */
function interpAcumPercent(curvePct: number[], nSteps: number): number[] {
  const M = curvePct.length - 1;
  if (M <= 0) return Array.from({ length: nSteps + 1 }, (_, i) => (i / nSteps) * 100);

  const out: number[] = [];
  for (let i = 0; i <= nSteps; i++) {
    const t = (i / nSteps) * M;
    const i0 = Math.floor(t);
    const i1 = Math.min(M, i0 + 1);
    const frac = t - i0;
    const y0 = curvePct[i0], y1 = curvePct[i1];
    out.push(y0 + (y1 - y0) * frac);
  }
  out[0] = 0; out[out.length - 1] = 100;
  return out;
}

function construirSerie(
  Pacum_pct: number[],
  P_total_mm: number,
  dt_min: number
): { t_min: number; dP_mm: number; I_mm_h: number; P_acum_mm: number }[] {

  const Pacum_mm = Pacum_pct.map(p => (p / 100) * P_total_mm);

  const serie = Pacum_mm.map((P_acum, i) => {
    const t_min = i * dt_min;
    const dP_mm = i === 0 ? 0 : +(Pacum_mm[i] - Pacum_mm[i - 1]).toFixed(5);
    const I_mm_h = i === 0 ? 0 : +(dP_mm / (dt_min / 60)).toFixed(5);
    return { t_min, dP_mm, I_mm_h, P_acum_mm: +P_acum.toFixed(5) };
  });

  // Normalización estricta: Σ dP = P_total  (ajuste del último bloque)
  const suma = serie.reduce((acc, s) => acc + s.dP_mm, 0);
  const diff = +(P_total_mm - suma).toFixed(5);
  if (Math.abs(diff) > 1e-4) {
    const last = serie.length - 1;
    serie[last].dP_mm = +(serie[last].dP_mm + diff).toFixed(5);
    serie[last].I_mm_h = +(serie[last].dP_mm / (dt_min / 60)).toFixed(5);
    let acc = 0;
    for (let i = 0; i < serie.length; i++) {
      acc += serie[i].dP_mm;
      serie[i].P_acum_mm = +acc.toFixed(5);
    }
  }
  return serie;
}

export function calcHietograma(
  _p: ParametrosCuenca,
  d_min: number,
  dt_min: number,
  Tr: number,
  distribucion: HietogramaOut["distribucion"] = "EPM_Q1"
): HietogramaOut {

  assertDtDivide(d_min, dt_min);

  // 1) Intensidad (mm/h) desde Fuente IDF Global (Día 1)
  const I_ref = I_fromFuente(d_min, Tr);

  // 2) Precipitación total (mm)
  const P_total = I_ref * (d_min / 60);

  // 3) Interpolación acumulada a nSteps
  const nSteps = Math.round(d_min / dt_min);
  const Pacum_pct = interpAcumPercent(pickCurve(distribucion), nSteps);

  // 4) Serie por bloques + normalización
  const serie = construirSerie(Pacum_pct, P_total, dt_min);

  // 5) Trazabilidad (chips)
  const trazabilidad = {
    fuente: "Ponderado" as const,             // si tu store tiene el detalle, cámbialo dinámicamente
    etiqueta: "IDF Ponderada (IDW/Thiessen)",
    // Nota HMS: SCS‑UH suele usar lag≈0.6·Tc; aquí solo mostramos sustitución IDF/ponderado. [1](https://areametro-my.sharepoint.com/personal/luis_montoya_metropol_gov_co/Documents/Archivos%20de%20chat%20de%20Microsoft%C2%A0Copilot/GT-AS-004GuiaSistemasAlmacenamientoRegulacionAguasLluvias_RevA.pdf)
    sustitucion: "I(d,Tr)=k/(c+d_h)^n | I_pond=Σ(Ii·Wi)"
  };

  return {
    d_min,
    dt_min,
    Tr,
    P_total_mm: +P_total.toFixed(3),
    I_ref_mm_h: +I_ref.toFixed(3),
    distribucion,
    serie,
    trazabilidad
  };
}