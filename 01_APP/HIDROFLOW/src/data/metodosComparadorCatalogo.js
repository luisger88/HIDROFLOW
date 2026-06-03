// src/data/metodosComparadorCatalogo.js

export const metodosTcCatalogo = [
  {
    id: "tc_temez",
    nombre: "Témez",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "activo",
    competencia: "principal_condicionada",
    escala: "cuencas naturales y mixtas",
    descripcion:
      "Método empírico ampliamente usado para estimar tiempo de concentración en cuencas naturales o rurales con información geomorfológica básica.",
    requiere: ["longitud_cauce_km", "pendiente_media_m_m"],
    observacion:
      "Debe validarse contra la escala de cuenca y pendiente. No adoptar automáticamente si queda fuera del rango físico esperado.",
  },
  {
    id: "tc_kirpich",
    nombre: "Kirpich",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "activo",
    competencia: "referencial",
    escala: "cuencas pequeñas y pendientes",
    descripcion:
      "Fórmula clásica para cuencas pequeñas con respuesta rápida y pendientes marcadas.",
    requiere: ["longitud_cauce_m", "desnivel_m"],
    observacion:
      "Para cuencas urbanas o de mayor tamaño debe usarse como contraste, no como único criterio.",
  },
  {
    id: "tc_california",
    nombre: "California Culverts",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "activo",
    competencia: "referencial",
    escala: "drenaje vial y alcantarillas",
    descripcion:
      "Método usado en contextos de drenaje vial para estimar tiempos de concentración asociados a cauces o drenajes definidos.",
    requiere: ["longitud_cauce_m", "desnivel_m"],
    observacion:
      "Útil como contraste en obras de paso; debe revisarse su pertinencia para cuencas mayores.",
  },
  {
    id: "tc_giandotti",
    nombre: "Giandotti",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "activo",
    competencia: "principal_condicionada",
    escala: "cuencas medianas",
    descripcion:
      "Método geomorfológico que incorpora área, longitud hidráulica y cotas medias o extremas de la cuenca.",
    requiere: ["area_km2", "longitud_cauce_km", "cota_media_m", "cota_salida_m"],
    observacion:
      "Suele ser más estable en cuencas medianas que fórmulas muy rápidas como Kirpich.",
  },
  {
    id: "tc_scs_ranser",
    nombre: "SCS-Ranser",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "activo",
    competencia: "principal_condicionada",
    escala: "cuencas con enfoque SCS-CN",
    descripcion:
      "Método asociado a la respuesta hidrológica tipo SCS, útil cuando el modelo lluvia-escorrentía usa CN y abstracciones iniciales.",
    requiere: ["longitud_cauce_m", "pendiente_media_m_m", "cn"],
    observacion:
      "Debe analizarse junto con CN, AMC, impermeabilidad y abstracción inicial.",
  },
  {
    id: "tc_perez_montoya",
    nombre: "Pérez-Montoya",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "activo",
    competencia: "referencial_local",
    escala: "contexto regional",
    descripcion:
      "Método usado como referencia regional o local para contrastar el tiempo de concentración estimado.",
    requiere: ["area_km2", "longitud_cauce_km", "pendiente_media_m_m"],
    observacion:
      "Debe documentarse su procedencia y aplicabilidad regional antes de adoptarlo.",
  },
  {
    id: "tc_williams_hann",
    nombre: "Williams & Hann",
    grupo: "Tiempo de respuesta",
    tipo: "tc",
    estadoImplementacion: "activo",
    competencia: "hidrograma_respuesta",
    escala: "modelos de hidrograma",
    descripcion:
      "Método de respuesta hidrológica asociado al cálculo de hidrogramas y tiempo al pico.",
    requiere: ["area_km2", "longitud_cauce_km", "pendiente_media_m_m"],
    observacion:
      "Debe diferenciarse si se usa como Tc, tiempo de retardo o parámetro interno de hidrograma.",
  },
  {
    id: "tc_kerby_hathaway",
    nombre: "Kerby-Hathaway",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "pendiente",
    competencia: "flujo_laminar_inicial",
    escala: "cuencas pequeñas",
    descripcion:
      "Método orientado al flujo superficial inicial antes de la concentración en cauce.",
    requiere: ["longitud_flujo_superficial_m", "pendiente_m_m", "rugosidad_superficial"],
    observacion:
      "Útil para descomponer Tc en flujo superficial y flujo canalizado.",
  },
  {
    id: "tc_nrcs_lag",
    nombre: "NRCS Lag",
    grupo: "Tiempo de retardo",
    tipo: "tc",
    estadoImplementacion: "pendiente",
    competencia: "hidrograma_scs",
    escala: "modelación SCS",
    descripcion:
      "Estimación de tiempo de retardo usada en modelos NRCS/SCS para construir hidrogramas unitarios.",
    requiere: ["longitud_hidraulica_m", "pendiente_media_m_m", "cn"],
    observacion:
      "Debe reportarse como tiempo de retardo o convertirse explícitamente a Tc si se usa esa equivalencia.",
  },
  {
    id: "tc_ventura",
    nombre: "Ventura",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "pendiente",
    competencia: "referencial",
    escala: "cuencas naturales",
    descripcion:
      "Método empírico usado para estimar Tc con variables geométricas generales de cuenca.",
    requiere: ["area_km2", "pendiente_media_m_m"],
    observacion:
      "Debe calibrarse o compararse con métodos geomorfológicos principales.",
  },
  {
    id: "tc_passini",
    nombre: "Passini",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "pendiente",
    competencia: "referencial",
    escala: "cuencas naturales",
    descripcion:
      "Método empírico clásico para estimar tiempos de concentración en función de área, longitud y pendiente.",
    requiere: ["area_km2", "longitud_cauce_km", "pendiente_media_m_m"],
    observacion:
      "Debe usarse dentro de una matriz de sensibilidad, no como valor automático.",
  },
  {
    id: "tc_bransby_williams",
    nombre: "Bransby-Williams",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "pendiente",
    competencia: "referencial",
    escala: "cuencas rurales",
    descripcion:
      "Método empírico para estimar Tc en función de longitud, área y pendiente.",
    requiere: ["area_km2", "longitud_cauce_km", "pendiente_media_m_m"],
    observacion:
      "Puede servir para contraste frente a métodos más usados en Colombia.",
  },
  {
    id: "tc_faa",
    nombre: "FAA",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "pendiente",
    competencia: "urbano_referencial",
    escala: "drenaje urbano o infraestructura",
    descripcion:
      "Método usado en análisis de drenaje asociado a infraestructura y áreas urbanizadas.",
    requiere: ["longitud_flujo_m", "pendiente_m_m", "coeficiente_escorrentia"],
    observacion:
      "Su aplicación debe condicionarse al grado de urbanización y al tipo de drenaje.",
  },
  {
    id: "tc_izzard",
    nombre: "Izzard",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "pendiente",
    competencia: "flujo_superficial",
    escala: "superficies urbanas o pavimentadas",
    descripcion:
      "Método orientado al flujo superficial sobre planos o superficies con rugosidad definida.",
    requiere: ["longitud_flujo_m", "pendiente_m_m", "intensidad_mm_h", "rugosidad"],
    observacion:
      "No debe mezclarse sin control con métodos de cauce principal.",
  },
  {
    id: "tc_onda_cinematica_manning",
    nombre: "Onda cinemática / Manning",
    grupo: "Tiempo de concentración",
    tipo: "tc",
    estadoImplementacion: "pendiente",
    competencia: "fisico_hidraulico",
    escala: "flujo superficial o canalizado",
    descripcion:
      "Estimación basada en propagación hidráulica simplificada mediante velocidad de flujo y longitud hidráulica.",
    requiere: ["longitud_tramo_m", "radio_hidraulico_m", "pendiente_m_m", "n_manning"],
    observacion:
      "Debe separarse por tramos si se usa para ruta hidráulica o flujo canalizado.",
  },
];

export const metodosQCatalogo = [
  {
    id: "q_scs_hu",
    nombre: "SCS Unit Hydrograph",
    grupo: "Caudal / Hidrograma",
    tipo: "q",
    estadoImplementacion: "activo",
    competencia: "principal",
    escala: "cuencas con lluvia efectiva SCS-CN",
    descripcion:
      "Construye hidrograma a partir de lluvia efectiva y parámetros de respuesta de la cuenca.",
    requiere: ["lluvia_efectiva", "tc", "area_km2", "tr"],
    variablesSalida: ["Qp", "Tp", "Tb", "volumen", "hidrograma"],
    observacion:
      "Candidato principal cuando el modelo SCS-CN está bien parametrizado.",
  },
  {
    id: "q_snyder",
    nombre: "Snyder",
    grupo: "Caudal / Hidrograma",
    tipo: "q",
    estadoImplementacion: "activo",
    competencia: "alterno",
    escala: "cuencas medianas",
    descripcion:
      "Método de hidrograma unitario sintético para estimar respuesta de cuenca.",
    requiere: ["area_km2", "longitud_cauce_km", "longitud_centroide_km", "coeficientes_snyder"],
    variablesSalida: ["Qp", "Tp", "hidrograma"],
    observacion:
      "Debe calibrarse o justificarse mediante coeficientes regionales si se adopta.",
  },
  {
    id: "q_clark_iuh",
    nombre: "Clark IUH",
    grupo: "Caudal / Hidrograma",
    tipo: "q",
    estadoImplementacion: "activo",
    competencia: "alterno",
    escala: "cuencas con almacenamiento distribuido",
    descripcion:
      "Modelo de hidrograma unitario instantáneo que combina traslación y almacenamiento.",
    requiere: ["tc", "coeficiente_almacenamiento", "lluvia_efectiva"],
    variablesSalida: ["Qp", "Tp", "hidrograma"],
    observacion:
      "Útil para comparar forma del hidrograma y efecto del almacenamiento.",
  },
  {
    id: "q_williams_hann",
    nombre: "Williams & Hann",
    grupo: "Caudal / Hidrograma",
    tipo: "q",
    estadoImplementacion: "activo",
    competencia: "alterno",
    escala: "respuesta hidrológica sintética",
    descripcion:
      "Método de respuesta hidrológica usado como contraste de hidrograma y caudal pico.",
    requiere: ["area_km2", "tc", "lluvia_efectiva"],
    variablesSalida: ["Qp", "Tp", "hidrograma"],
    observacion:
      "Debe verificarse que los parámetros sean consistentes con la geomorfología de la cuenca.",
  },
  {
    id: "q_racional",
    nombre: "Método Racional",
    grupo: "Caudal pico",
    tipo: "q",
    estadoImplementacion: "activo",
    competencia: "referencial_pc80",
    escala: "cuencas pequeñas",
    descripcion:
      "Calcula caudal pico como función de coeficiente de escorrentía, intensidad IDF y área.",
    requiere: ["coeficiente_c", "intensidad_idf", "area_km2", "tr"],
    variablesSalida: ["Qp"],
    observacion:
      "Para La Iguaná PC_80 debe mantenerse como contraste referencial, no como método principal.",
  },
];

export const resumenComparadorCatalogo = {
  version: "Tc-15_Q-5_v1",
  nombre: "Comparador Hidrológico Multi-Método",
  descripcion:
    "Catálogo técnico para comparar tiempos de concentración, tiempos de respuesta, caudales pico e hidrogramas sin adoptar automáticamente un resultado.",
  reglaAdopcion:
    "Muchos métodos para sensibilidad; pocos métodos para adopción; criterio técnico explícito para competencia.",
  totalMetodosTc: metodosTcCatalogo.length,
  totalMetodosQ: metodosQCatalogo.length,
};

export function obtenerMetodoTcPorId(id) {
  return metodosTcCatalogo.find((metodo) => metodo.id === id) || null;
}

export function obtenerMetodoQPorId(id) {
  return metodosQCatalogo.find((metodo) => metodo.id === id) || null;
}

export function obtenerMetodosPorEstado(estado) {
  return {
    tc: metodosTcCatalogo.filter(
      (metodo) => metodo.estadoImplementacion === estado
    ),
    q: metodosQCatalogo.filter(
      (metodo) => metodo.estadoImplementacion === estado
    ),
  };
}

export function obtenerMetodosActivos() {
  return obtenerMetodosPorEstado("activo");
}