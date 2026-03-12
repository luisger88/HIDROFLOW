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
