import {
  AMC,
  EscenarioAMC,
  ResultadoSensibilidadAMC
} from "./index";

/**
 * Motor de sensibilidad hidrológica respecto a AMC
 * Tc y UH constantes, solo varía Pe(t) vía CN / AMC
 */
export function calcSensibilidadAMC({
  escenarios,
  calcCNefectivo,
  calcUH,
  convolucion,
  PeSeriePorAMC,
  dt_min
}: {
  escenarios: EscenarioAMC[];
  calcCNefectivo: (amc: AMC) => number;
  calcUH: () => { t: number; q: number }[];
  convolucion: (
    uh: { t: number; q: number }[],
    pe: number[],
    dt_min: number
  ) => { t: number; Q: number }[];
  PeSeriePorAMC: Record<AMC, number[]>;
  dt_min: number;
}): ResultadoSensibilidadAMC[] {

  return escenarios.map((esc) => {
    // 1️⃣ CN efectivo según AMC
    const CNef = calcCNefectivo(esc.amc);

    // 2️⃣ UH constante (Tc fijo)
    const UH = calcUH();

    // 3️⃣ Lluvia efectiva correspondiente al AMC
    const PeSerie = PeSeriePorAMC[esc.amc];

    // 4️⃣ Convolución
    const Qserie = convolucion(UH, PeSerie, dt_min);

    // 5️⃣ Métricas hidrológicas
    let Qp = 0;
    let Tp = 0;

    Qserie.forEach((p) => {
      if (p.Q > Qp) {
        Qp = p.Q;
        Tp = p.t;
      }
    });

    return {
      escenario: esc.descripcion,
      amc: esc.amc,
      CN_efectivo: CNef,
      Qp,
      Tp,
      Qserie
    };
  });
}