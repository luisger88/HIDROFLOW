import { CuencaGeomorfologica } from "../../dominio/CuencaGeomorfologica";
import { ResultadoSAR } from "../../dominio/SAR";

import {
  ResultadoSensibilidadTc,
  ResultadoSensibilidadAMC,
  ComparacionTcVsAMC
} from "../sensibilidad";

/**
 * Informe Hidrológico – HidroFlow
 * Plataforma de Ingeniería Hidrológica (Intérprete Normativo)
 */
export type InformeHidrologico = {
  titulo: string;
  fecha: string;
  cuenca: string;

  resumen: string;

  parametros: {
    area_km2: number;
    CN_efectivo: number;
    Tc_adoptado_min: number;
  };

  resultadosBase: {
    Qp: number;
    Tp: number;
    Volumen: number;
  };

  sensibilidadTc: ResultadoSensibilidadTc[];
  sensibilidadAMC: ResultadoSensibilidadAMC[];

  comparacion: ComparacionTcVsAMC;

  SAR: ResultadoSAR;

  conclusion: string;
  conclusionSAR: string;

  /* ==============================
   * ESTADO NORMATIVO DEL PROYECTO
   * ============================== */
  estadoNormativo: {
    Tr_normativo: number;
    autoridadAmbiental: "AMVA" | "Corantioquia" | "Cornare";
    clasificacionCuenca: "RURAL" | "URBANA" | "MIXTA";
    existeUrbanizacion: boolean;
    aplicaSAR: boolean;
  };

  /* ==============================
   * MODO DEL INFORME
   * ============================== */
  modoInforme: "NORMAL" | "AUDITORIA_AMBIENTAL";

  /* ==============================
   * EXTENSIONES
   * ============================== */
  hietograma?: {
    tiempo_min: number;
    p_mm: number;
    p_acum_mm: number;
  }[];

  graficos?: {
    hidrogramaPNG?: string;
    sensibilidadTcPNG?: string;
    sensibilidadAmcPNG?: string;
    mapaCuencaPNG?: string;
  };
};

/**
 * Generador del Informe Hidrológico
 * (el informe se valida y se auto-explica)
 */
export function generarInformeHidrologico(
  informe: InformeHidrologico
): InformeHidrologico {

  if (!informe.cuenca) {
    throw new Error("InformeHidrologico: nombre de cuenca no definido.");
  }

  if (informe.estadoNormativo.aplicaSAR && !informe.SAR) {
    throw new Error(
      "InformeHidrologico: aplica SAR pero no se suministró información SAR."
    );
  }

  return informe;
}
