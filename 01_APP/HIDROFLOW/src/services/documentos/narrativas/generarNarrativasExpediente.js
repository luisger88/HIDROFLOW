import { generarResumenEjecutivo } from "./generarResumenEjecutivo";
import { generarNarrativaConsistencia } from "./generarNarrativaConsistencia";
import { generarNarrativaCN } from "./generarNarrativaCN";
import { generarNarrativaIDF } from "./generarNarrativaIDF";
import { generarNarrativaTc } from "./generarNarrativaTc";
import { generarNarrativaQTr } from "./generarNarrativaQTr";
import { generarNarrativaQ5 } from "./generarNarrativaQ5";
import { generarDiagnosticoHidrologico } from "./generarDiagnosticoHidrologico";
import { generarJustificacionTecnica } from "./generarJustificacionTecnica";
import { generarInterpretacionFisicaCuenca } from "./generarInterpretacionFisicaCuenca";

export function generarNarrativasExpediente(payload = {}, contratoCuenca = null) {
  return {
    resumenEjecutivo: generarResumenEjecutivo(payload, contratoCuenca),
    diagnosticoHidrologico: generarDiagnosticoHidrologico(payload, contratoCuenca),
    justificacionTecnica: generarJustificacionTecnica(payload, contratoCuenca),
    interpretacionFisica: generarInterpretacionFisicaCuenca(payload, contratoCuenca),
    consistencia: generarNarrativaConsistencia(payload),
    cn: generarNarrativaCN(payload),
    idf: generarNarrativaIDF(payload),
    tc: generarNarrativaTc(payload),
    qtr: generarNarrativaQTr(payload),
    q5: generarNarrativaQ5(payload)
  };
}

export default generarNarrativasExpediente;
