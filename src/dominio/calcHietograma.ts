feat/d2-huff-epm-distribucion
/**
 * Cálculo de hietograma con interpolación EPM_Q1 y Huff
 * Integra normalización para asegurar que Σ dP = P_total
 */

interface DatosHietograma {
    P_total: number; // Precipitación total (mm)
    duracion: number; // Duración (minutos)
    metodo: 'EPM_Q1' | 'Huff';
    posicion_pico?: number; // Posición relativa del pico (0-1)
}

interface ResultadoHietograma {
    tiempo: number[]; // Minutos
    precipitacion: number[]; // mm
    precipitacion_acumulada: number[]; // mm
}

/**
 * Interpola valores entre dos puntos
 */
function interpolar(x0: number, y0: number, x1: number, y1: number, x: number): number {
    return y0 + ((x - x0) / (x1 - x0)) * (y1 - y1);
}

/**
 * Calcula hietograma con método EPM_Q1
 */
function hietogramaEPM_Q1(datos: DatosHietograma): number[] {
    const { P_total, duracion } = datos;
    const pasos = Math.ceil(duracion / 5);
    const incremento = duracion / pasos;
    
    const dP: number[] = [];
    for (let i = 0; i < pasos; i++) {
        const t_rel = (i * incremento) / duracion;
        // Fórmula EPM_Q1: distribución típica CENICAFÉ
        const valor = P_total * Math.exp(-2 * (1 - t_rel) ** 2) / pasos;
        dP.push(valor);
    }
    
    return normalizar(dP, P_total);
}

/**
 * Calcula hietograma con método Huff
 */
function hietogramaHuff(datos: DatosHietograma): number[] {
    const { P_total, duracion, posicion_pico = 0.4 } = datos;
    const pasos = Math.ceil(duracion / 5);
    const incremento = duracion / pasos;
    
    const dP: number[] = [];
    for (let i = 0; i < pasos; i++) {
        const t_rel = (i * incremento) / duracion;
        // Curva Huff asimétrica
        let valor: number;
        if (t_rel <= posicion_pico) {
            valor = P_total * (t_rel / posicion_pico) ** 1.5 / pasos;
        } else {
            valor = P_total * ((1 - t_rel) / (1 - posicion_pico)) ** 0.8 / pasos;
        }
        dP.push(valor);
    }
    
    return normalizar(dP, P_total);
}

/**
 * Normaliza incrementos para garantizar Σ dP = P_total
 */
function normalizar(dP: number[], P_total: number): number[] {
    const suma = dP.reduce((a, b) => a + b, 0);
    const factor = P_total / suma;
    return dP.map(val => val * factor);
}

/**
 * Calcula hietograma completo
 */
export function calcHietograma(datos: DatosHietograma): ResultadoHietograma {
    const dP = datos.metodo === 'EPM_Q1' 
        ? hietogramaEPM_Q1(datos) 
        : hietogramaHuff(datos);
    
    const pasos = dP.length;
    const incremento = datos.duracion / pasos;
    
    const tiempo = Array.from({ length: pasos }, (_, i) => i * incremento);
    const acumulada = dP.reduce((acc, val) => [...acc, (acc[acc.length - 1] || 0) + val], [] as number[]);
    
    return {
        tiempo,
        precipitacion: dP,
        precipitacion_acumulada: acumulada
    };
}// touch 2026-03-12T18:14:47
=======
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
main
