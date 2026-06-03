import { EscenarioTc, ResultadoSensibilidadTc } from "./tiposSensibilidad";

/**
 * Motor de sensibilidad hidrológica respecto al Tc
 *
 * @param escenarios Lista de escenarios Tc
 * @param calcUH Función que genera UH dado un Tc
 * @param convolucion Función de convolución Pe(t) * UH
 * @param PeSerie Lluvia efectiva incremental
 * @param dt_min Paso temporal (min)
 */
export function calcSensibilidadTc({
  escenarios,
  calcUH,
  convolucion,
  PeSerie,
  dt_min
}: {
  escenarios: EscenarioTc[];
  calcUH: (tc_min: number) => { t: number; q: number }[];
  convolucion: (
    uh: { t: number; q: number }[],
    pe: number[],
    dt_min: number
  ) => { t: number; Q: number }[];
  PeSerie: number[];
  dt_min: number;
}): ResultadoSensibilidadTc[] {

  return escenarios.map(esc => {
    // 1️⃣ UH recalculado solo cambiando Tc
    const UH = calcUH(esc.tc_min);

    // 2️⃣ Convolución Pe(t) * UH
    const Qserie = convolucion(UH, PeSerie, dt_min);

    // 3️⃣ Métricas clave
    let Qp = 0;
    let Tp = 0;

    Qserie.forEach(p => {
      if (p.Q > Qp) {
        Qp = p.Q;
        Tp = p.t;
      }
    });

    return {
      escenario: esc.descripcion,
      tc_min: esc.tc_min,
      Qp,
      Tp,
      Qserie
    };
  });
}