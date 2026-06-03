import { InformeHidrologico } from "./generarInformeHidrologico";

/**
 * Exporta un CSV técnico completo del estudio hidrológico
 * Incluye hietograma (insumo HEC-HMS), resultados y SAR
 */
export function exportarInformeCSV(
  informe: InformeHidrologico
): void {

  const filas: string[] = [];

  /* =====================================================
   * METADATA
   * ===================================================== */
  filas.push("# METADATA");
  filas.push(`Cuenca,${informe.cuenca}`);
  filas.push(`Fecha,${informe.fecha}`);
  filas.push(`Titulo,${informe.titulo}`);
  filas.push("");

  /* =====================================================
   * PARAMETROS DE CUENCA
   * ===================================================== */
  filas.push("# PARAMETROS_CUENCA");
  filas.push("Parametro,Valor");
  filas.push(`Area_km2,${informe.parametros.area_km2}`);
  filas.push(`CN_efectivo,${informe.parametros.CN_efectivo}`);
  filas.push(`Tc_adoptado_min,${informe.parametros.Tc_adoptado_min}`);
  filas.push("");

  /* =====================================================
   * HIETOGRAMA (INSUMO PARA HEC-HMS)
   * ===================================================== */
  if ((informe as any).hietograma?.length) {
    filas.push("# HIETOGRAMA");
    filas.push("Tiempo_min,Precipitacion_mm,Precipitacion_acum_mm");

    (informe as any).hietograma.forEach((p: any) => {
      filas.push(
        `${p.tiempo_min},${p.p_mm},${p.p_acum_mm}`
      );
    });

    filas.push("");
  }

  /* =====================================================
   * RESULTADOS BASE
   * ===================================================== */
  filas.push("# RESULTADOS_BASE");
  filas.push("Parametro,Valor");
  filas.push(`Qp,${informe.resultadosBase.Qp}`);
  filas.push(`Tp,${informe.resultadosBase.Tp}`);
  filas.push(`Volumen,${informe.resultadosBase.Volumen}`);
  filas.push("");

  /* =====================================================
   * SENSIBILIDAD TC
   * ===================================================== */
  filas.push("# SENSIBILIDAD_TC");
  filas.push("Escenario,Tc_min,Qp");

  informe.sensibilidadTc.forEach(r => {
    filas.push(`${r.escenario},${r.tc_min},${r.Qp}`);
  });

  filas.push("");

  /* =====================================================
   * SENSIBILIDAD AMC
   * ===================================================== */
  filas.push("# SENSIBILIDAD_AMC");
  filas.push("Escenario,AMC,Qp");

  informe.sensibilidadAMC.forEach(r => {
    filas.push(`${r.escenario},${r.amc},${r.Qp}`);
  });

  filas.push("");

  /* =====================================================
   * SAR (GT-AS-004)
   * ===================================================== */
  filas.push("# SAR_GT_AS_004");
  filas.push("Parametro,Valor");
  filas.push(`Q_regulado_pre_urbano,${informe.SAR.Q_regulado}`);
  filas.push(`Q_entrada_post_urbano,${informe.SAR.Q_entrada}`);
  filas.push(`Volumen_excedente_SAR,${informe.SAR.V_excedente}`);
  filas.push("");

  /* =====================================================
   * GENERACION DEL ARCHIVO
   * ===================================================== */
  const csv = filas.join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `HidroFlow_${informe.cuenca}_Informe.csv`;
  link.click();

  URL.revokeObjectURL(url);
}