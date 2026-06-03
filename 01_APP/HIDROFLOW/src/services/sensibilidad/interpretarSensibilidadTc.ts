import { ResultadoSensibilidadTc } from "./tiposSensibilidad";
import { InterpretacionSensibilidad } from "./interpretarTipos";

/**
 * Interpreta los resultados de sensibilidad de Tc
 * Convierte números en criterio ingenieril
 */
export function interpretarSensibilidadTc(
  resultados: ResultadoSensibilidadTc[]
): InterpretacionSensibilidad[] {

  if (resultados.length < 2) return [];

  // Escenario base (asumimos que existe uno con descripción "Tc adoptado")
  const base = resultados.find(r =>
    r.escenario.toLowerCase().includes("adoptado")
  ) ?? resultados[0];

  const interpretaciones: InterpretacionSensibilidad[] = [];

  resultados.forEach(r => {
    if (r === base) return;

    const deltaQp_pct = ((r.Qp - base.Qp) / base.Qp) * 100;
    const deltaTp_min = r.Tp - base.Tp;

    let mensaje = "";
    let recomendacion = "";

    if (r.tc_min < base.tc_min) {
      mensaje =
        `Reducir el Tc de ${base.tc_min.toFixed(0)} a ${r.tc_min.toFixed(0)} min ` +
        `incrementa el caudal pico en ${deltaQp_pct.toFixed(1)} % ` +
        `y adelanta el tiempo al pico en ${Math.abs(deltaTp_min).toFixed(1)} min.`;

      recomendacion =
        "Escenario conservador para diseño hidráulico, incrementa exigencia estructural.";
    } else {
      mensaje =
        `Aumentar el Tc de ${base.tc_min.toFixed(0)} a ${r.tc_min.toFixed(0)} min ` +
        `reduce el caudal pico en ${Math.abs(deltaQp_pct).toFixed(1)} % ` +
        `y retrasa el tiempo al pico en ${deltaTp_min.toFixed(1)} min.`;

      recomendacion =
        "Escenario atenuado, útil para análisis de laminación o control aguas arriba.";
    }

    interpretaciones.push({
      titulo: `Sensibilidad Tc — ${r.escenario}`,
      mensaje,
      impacto_Qp_pct: deltaQp_pct,
      impacto_Tp_min: deltaTp_min,
      recomendacion
    });
  });

  return interpretaciones;
}