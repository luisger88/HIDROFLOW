import { generarResumenEjecutivo } from "./generarResumenEjecutivo";
import { generarNarrativaConsistencia } from "./generarNarrativaConsistencia";
import { generarNarrativaCN } from "./generarNarrativaCN";
import { generarNarrativaIDF } from "./generarNarrativaIDF";
import { generarNarrativaTc } from "./generarNarrativaTc";
import { generarNarrativaQTr } from "./generarNarrativaQTr";
import { generarNarrativaQ5 } from "./generarNarrativaQ5";

export function generarNarrativasExpediente(payload = {}) {
  return {
    resumenEjecutivo: generarResumenEjecutivo(payload),
    consistencia: generarNarrativaConsistencia(payload),
    cn: generarNarrativaCN(payload),
    idf: generarNarrativaIDF(payload),
    tc: generarNarrativaTc(payload),
    qtr: generarNarrativaQTr(payload),
    q5: generarNarrativaQ5(payload)
  };
}

export default generarNarrativasExpediente;
