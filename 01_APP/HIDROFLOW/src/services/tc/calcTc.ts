import { TcInputs, TcResultados } from "./tiposTc";

import { tcKirpich } from "./metodos/kirpich";
import { tcTemez } from "./metodos/temez";
import { tcGiandotti } from "./metodos/giandotti";
import { tcScsLag } from "./metodos/scsLag";

/**
 * Motor de cálculo de Tiempo de Concentración
 * Estilo HEC-HMS: calcula TODOS los métodos
 */
export function calcTc(inputs: TcInputs): TcResultados {
  return {
    kirpich_min: tcKirpich(inputs),
    temez_min: tcTemez(inputs),
    giandotti_min: tcGiandotti(inputs),
    scs_lag_min: tcScsLag(inputs),

    // Stubs listos
    kerby_hathaway_min: null,
    izzard_min: null,
    nrcs_velocity_min: null,
    california_min: null,
    faa_min: null,
    dooge_min: null,
    ventura_min: null,
    user_defined_min: inputs.tc_user_defined_min ?? null,
  };
}