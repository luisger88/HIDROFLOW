// src/data/auditoriaPendientesTc.js

export const auditoriaPendientesTc = [
  {
    idMetodo: "tc_temez",
    metodo: "Témez",
    pendienteEsperada: "Scp_global",
    descripcionPendiente:
      "Debe usar pendiente longitudinal representativa del cauce principal hasta PC_80.",
    auditoria:
      "Verificar si calcTc usa longitud hidráulica efectiva y desnivel total del eje principal validado. Revisar sensibilidad frente a pendientes segmentadas por quiebres críticos.",
    riesgo:
      "Si usa una pendiente demasiado baja, Tc puede crecer de forma importante.",
  },
  {
    idMetodo: "tc_kirpich",
    metodo: "Kirpich",
    pendienteEsperada: "Scp / H-L",
    descripcionPendiente:
      "Usualmente depende de longitud del cauce y desnivel longitudinal equivalente.",
    auditoria:
      "Verificar si la pendiente se calcula como desnivel total / longitud hidráulica. Revisar si el método está usando metros, kilómetros o porcentaje.",
    riesgo:
      "Muy sensible a longitud y desnivel. Puede subestimar o sobreestimar Tc si las unidades no están controladas.",
  },
  {
    idMetodo: "tc_california",
    metodo: "California Culverts",
    pendienteEsperada: "Scp_global_o_H_L",
    descripcionPendiente:
      "Debe estar asociada al desnivel y longitud del cauce o drenaje principal.",
    auditoria:
      "Verificar si usa H/L, pendiente decimal o porcentaje. Confirmar que no use pendiente media de cuenca Sc.",
    riesgo:
      "Puede ser inaplicable o solo referencial para cuencas medianas si se usa fuera de su contexto vial.",
  },
  {
    idMetodo: "tc_giandotti",
    metodo: "Giandotti",
    pendienteEsperada: "desnivel_geomorfologico",
    descripcionPendiente:
      "No necesariamente usa Scp directa; puede usar diferencias de cota, área y longitud.",
    auditoria:
      "Verificar si la fórmula interna usa cota media, cota de salida, cota máxima o desnivel equivalente.",
    riesgo:
      "Confundir cota media con cota máxima puede alterar el Tc de forma significativa.",
  },
  {
    idMetodo: "tc_scs_ranser",
    metodo: "SCS-Ranser",
    pendienteEsperada: "Scp_o_Sc_según_formulación",
    descripcionPendiente:
       "Debe verificarse si la formulación usa Scp del cauce principal, Sc de cuenca o una pendiente hidrológica equivalente. No deben mezclarse sin declarar el criterio.",
    auditoria:
      "Verificar si usa pendiente del cauce principal, pendiente de cuenca o pendiente equivalente. Confirmar consistencia con CN efectivo y AMC.",
    riesgo:
      "Puede mezclar sensibilidad de CN con pendiente si no se documentan los insumos.",
  },
  {
    idMetodo: "tc_perez_montoya",
    metodo: "Pérez-Montoya",
    pendienteEsperada: "Scp_Sc_o_pendiente_regional",
    descripcionPendiente:
       "Debe documentarse si usa Scp del cauce, Sc de cuenca o una pendiente regional/equivalente propia de la formulación.",
    auditoria:
      "Revisar fórmula interna y procedencia regional antes de usarlo para adopción.",
    riesgo:
      "Sin trazabilidad regional puede quedar solo como contraste.",
  },
  {
    idMetodo: "tc_williams_hann",
    metodo: "Williams & Hann",
    pendienteEsperada: "parametro_respuesta_no_equivalente_directo",
    descripcionPendiente:
      "Puede usar parámetros de respuesta del hidrograma que no son equivalentes directamente a Scp o Sc.",
    auditoria:
      "Auditar si el método usa Tc, lag, tPico o pendiente interna. No comparar Tp con Tc sin verificar el significado del campo.",
    riesgo:
      "Caso crítico actual: Tp = 20 min frente a Tc ≈ 231.5 min. Requiere auditoría conceptual.",
  },
  ];
  export const criterioPendientesAuditoria = {
  Scp: {
    nombre: "Scp",
    etiqueta: "Pendiente del cauce principal",
    descripcion:
      "Pendiente longitudinal del cauce principal hasta PC_80. Debe derivarse del eje principal validado, longitud hidráulica efectiva y desnivel del perfil longitudinal.",
    uso:
      "Tiempo de concentración, tránsito hidráulico, velocidad de respuesta del cauce y métodos dependientes de longitud/desnivel.",
  },

  Sc: {
    nombre: "Sc",
    etiqueta: "Pendiente media de la cuenca",
    descripcion:
      "Pendiente media superficial de la cuenca. Debe derivarse del modelo de terreno o del análisis geomorfológico de la cuenca completa.",
    uso:
      "Concepto geomorfológico, respuesta superficial, clasificación de cuenca, susceptibilidad a escorrentía y soporte contextual para métodos hidrológicos.",
  },

  regla:
    "No mezclar Scp y Sc. Si un método usa pendiente del cauce, debe reportarse como Scp. Si usa pendiente media de la cuenca, debe reportarse como Sc. Si se usa una como aproximación de la otra, debe declararse como criterio provisional.",
};

export function obtenerAuditoriaPendienteTc(idMetodo) {
  return auditoriaPendientesTc.find((item) => item.idMetodo === idMetodo) || null;
}

export function obtenerCriterioPendientesAuditoria() {
  return criterioPendientesAuditoria;
}