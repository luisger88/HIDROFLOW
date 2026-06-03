/**
 * hidroEngine.js
 * Motor hidrológico base de HidroFlow
 *
 * Fase 1 de modularización:
 * - Extrae funciones puras CN / AMC / SCS-CN / Tc desde HidroFlow.jsx.
 * - No contiene componentes React.
 * - No renderiza interfaz.
 * - No depende de estilos ni de Recharts.
 *
 * Regla Senior:
 * HidroFlow.jsx debe visualizar y orquestar.
 * hidroEngine.js debe calcular.
 */

// ─────────────────────────────────────────────────────────────
// Constantes SCS-CN
// ─────────────────────────────────────────────────────────────

export const SCS_RETENCION_MM = 25400;
export const SCS_ABSTRACCION_LAMBDA = 0.2;
export const CN_MIN = 30;
export const CN_MAX = 98;

export function limitarNumero(valor, min, max) {
  const n = Number(valor);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

// ─────────────────────────────────────────────────────────────
// CN dinámico / AMC / impermeabilidad
// ─────────────────────────────────────────────────────────────

/**
 * Conversión CNII → CNI.
 *
 * Nota:
 * Esta es la fórmula actualmente implementada en HidroFlowV5.
 * Se conserva para no cambiar resultados hidrológicos durante la modularización.
 */
export function cnIIaCNI(cnII) {
  return cnII > 0 ? (4.2 * cnII) / (10 + 0.058 * cnII) : cnII;
}

/**
 * Conversión CNII → CNIII.
 */
export function cnIIaCNIII(cnII) {
  return cnII > 0 ? (23 * cnII) / (10 + 0.13 * cnII) : cnII;
}

/**
 * Alias temporal por compatibilidad con módulos existentes.
 * Mantener mientras se limpian referencias antiguas.
 */
export function cnII_to_III(cnII) {
  return cnIIaCNIII(cnII);
}

/**
 * CN mixto por urbanización.
 */
export function cnMixto(SI) {
  return 0.12 * SI + 86;
}

/**
 * Mezcla explícita entre superficie permeable e impermeable.
 */
export function mezclaImpermeable(cnPermeable, porcentajeImp, cnImperv = 98) {
  const w = limitarNumero(porcentajeImp, 0, 100) / 100;
  return cnPermeable * (1 - w) + cnImperv * w;
}

/**
 * CN dinámico efectivo.
 *
 * Entradas:
 * - amcActual: "I", "II" o "III"
 * - porcentajeImpermeable: 0 a 100
 * - cnBase: CNII base
 */
export function calcCNdinamico({ amcActual, porcentajeImpermeable, cnBase }) {
  let cnPermeable_CNII = Number.isFinite(cnBase) ? +cnBase : 75;
  cnPermeable_CNII = limitarNumero(cnPermeable_CNII, CN_MIN, CN_MAX);

  let cnAjustado =
    amcActual === "I"
      ? cnIIaCNI(cnPermeable_CNII)
      : amcActual === "III"
      ? cnIIaCNIII(cnPermeable_CNII)
      : cnPermeable_CNII;

  const cnEfectivo = mezclaImpermeable(
    cnAjustado,
    porcentajeImpermeable,
    98
  );

  return +limitarNumero(cnEfectivo, CN_MIN, CN_MAX).toFixed(1);
}

/**
 * Deriva condición AMC desde humedad de suelo SIATA.
 *
 * Nota:
 * Se conserva la lógica HidroFlowV5.
 * Luego se puede profesionalizar el texto del informe sin cambiar cálculo.
 */
export function derivarAMCDesdeSIATA(humedadSuelo) {
  const hs = Number.isFinite(humedadSuelo) ? +humedadSuelo : 0.35;

  const amcActual = hs < 0.25 ? "I" : hs > 0.45 ? "III" : "II";

  const informe =
    amcActual === "I"
      ? "El suelo está sequito. Absorbe más agua. Esperamos menos escorrentía."
      : amcActual === "II"
      ? "El suelo está normal. Ni muy seco ni saturado. Comportamiento intermedio."
      : "El suelo está mojadito/saturado. Absorbe menos. Aumenta la escorrentía.";

  const contexto = `HS≈${hs.toFixed(2)} → AMC ${amcActual}`;

  return {
    amcActual,
    amcFuente: "SIATA",
    amcInforme: `${contexto}. ${informe}`
  };
}

// ─────────────────────────────────────────────────────────────
// Retención, abstracción y precipitación efectiva SCS-CN
// ─────────────────────────────────────────────────────────────

export function calcRetencionSCS(CN) {
  const cn = limitarNumero(CN, CN_MIN, CN_MAX);
  const S = SCS_RETENCION_MM / cn - 254;
  const Ia = SCS_ABSTRACCION_LAMBDA * S;

  return {
    CN: +cn.toFixed(3),
    S: +S.toFixed(6),
    Ia: +Ia.toFixed(6),
    lambda: SCS_ABSTRACCION_LAMBDA
  };
}

/**
 * Lluvia efectiva acumulada Pe(t) mediante método SCS-CN.
 *
 * Entrada:
 * - hiet.data con pAcum
 * - CN efectivo
 */
export function calcLluviaEfectiva(hiet, CN) {
  const { S, Ia } = calcRetencionSCS(CN);

  const rows = hiet.data.map((r) => {
    const P = r.pAcum;
    const Pe = P > Ia ? Math.pow(P - Ia, 2) / (P - Ia + S) : 0;

    return {
      ...r,
      Pe: +Pe.toFixed(4),
      PeIncrem: 0,
      S,
      Ia
    };
  });

  for (let i = 1; i < rows.length; i++) {
    rows[i].PeIncrem = +(rows[i].Pe - rows[i - 1].Pe).toFixed(5);
  }

  rows[0].PeIncrem = 0;

  return rows;
}

// ─────────────────────────────────────────────────────────────
// Tiempo de concentración Tc
// ─────────────────────────────────────────────────────────────

/**
 * Calcula los seis métodos empíricos de Tiempo de Concentración.
 *
 * Retorna:
 * [
 *   { m: "Témez (1978)", h: ..., min: ... },
 *   ...
 * ]
 */
export function calcTc(p) {
  const L = p.longitud_cauce;
  const A = p.area;
  const Sp = p.pendiente_cuenca;

  const So =
    ((p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 1000)) * 1000;

  const Lft = L * 3280.84;
  const Sf =
    (p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 3280.84);

  const Ss = SCS_RETENCION_MM / p.CN - 254;

  return [
    {
      m: "Témez (1978)",
      h: 0.3 * Math.pow(L / Math.pow(So / 1000, 0.25), 0.76)
    },
    {
      m: "Kirpich (1940)",
      h: (0.0078 * Math.pow(Lft, 0.77) * Math.pow(Sf, -0.385)) / 60
    },
    {
      m: "California (1942)",
      h:
        (0.0195 *
          Math.pow(L * 1000, 0.77) *
          Math.pow(So / 1000, -0.385)) / 60
    },
    {
      m: "Giandotti (1934)",
      h:
        (4 * Math.sqrt(A) + 1.5 * L) /
        (0.8 * Math.sqrt(p.cota_max - p.cota_min))
    },
    {
      m: "SCS-Ranser (1958)",
      h:
        (Math.pow(L * 1000, 0.8) * Math.pow(Ss + 1, 0.7)) /
        (4655 * Math.pow(Sp, 0.5))
    },
    {
      m: "Pérez-Montg. (1985)",
      h: 0.1039 * Math.pow(L, 0.7) * Math.pow(So, -0.3)
    }
  ].map((r) => ({
    ...r,
    min: +(r.h * 60).toFixed(3)
  }));
}



/**
 * Estadística básica de Tc.
 * Esta función no decide el Tc adoptado; solo resume.
 */
export function resumirTc(tcList) {
  const validos = (tcList || []).filter((r) => Number.isFinite(r.h) && r.h > 0);

  if (!validos.length) {
    return {
      n: 0,
      promedio_h: null,
      promedio_min: null,
      mediana_min: null,
      min_min: null,
      max_min: null
    };
  }

  const minutos = validos.map((r) => r.min).sort((a, b) => a - b);
  const promedioMin =
    minutos.reduce((s, v) => s + v, 0) / minutos.length;
  const mid = Math.floor(minutos.length / 2);
  const medianaMin =
    minutos.length % 2
      ? minutos[mid]
      : (minutos[mid - 1] + minutos[mid]) / 2;

  return {
    n: validos.length,
    promedio_h: +(promedioMin / 60).toFixed(6),
    promedio_min: +promedioMin.toFixed(3),
    mediana_min: +medianaMin.toFixed(3),
    min_min: +Math.min(...minutos).toFixed(3),
    max_min: +Math.max(...minutos).toFixed(3)
  };
}

export function mapTcResultados(tcArray) {

  const mapa = {};

  tcArray.forEach(item => {

    if (item.m.includes('Kirpich')) {
      mapa.Kirpich = item.min;
    }

    if (item.m.includes('Témez')) {
      mapa.Temez = item.min;
    }

    if (item.m.includes('California')) {
      mapa.California = item.min;
    }

    if (item.m.includes('Giandotti')) {
      mapa.Giandotti = item.min;
    }

    if (item.m.includes('Pérez')) {
      mapa.Perez = item.min;
    }

    if (item.m.includes('SCS')) {
      mapa.SCS = item.min;
    }
  });

  return mapa;
}


// ─────────────────────────────────────────────────────────────
// Resumen técnico consolidado del motor hidrológico
// ─────────────────────────────────────────────────────────────

/**
 * resumenMotorHidrologico(params)
 *
 * Consolida en un solo objeto los principales indicadores que debe leer
 * la interfaz técnica de HidroFlow:
 *
 * - Cuenca activa
 * - IDF adoptada
 * - CN base / CN efectivo
 * - AMC
 * - S e Ia del método SCS-CN
 * - Tiempo de concentración por métodos
 * - Resumen estadístico de Tc
 * - Periodos de retorno activos
 * - Criterio de competencia del Método Racional
 *
 * Regla Senior:
 * Esta función NO renderiza interfaz.
 * Esta función NO modifica params.
 * Esta función NO reemplaza los módulos existentes.
 * Esta función consolida resultados para lectura técnica.
 */
export function resumenMotorHidrologico(params = {}) {
  const geometria = params.geometria || {};
  const relieve = params.relieve || {};
  const hidrologia = params.hidrologia || {};
  const idf = params.idf || {};

  // ------------------------------------------------------------
  // 1. Identificación de cuenca
  // ------------------------------------------------------------
  const nombreCuenca =
    params.nombre_completo ||
    params.nombre_cuenca ||
    params.etiqueta ||
    "Cuenca activa";

  const puntoControl =
    params.punto_control ||
    hidrologia.punto_calculo ||
    "PC";

  const areaKm2 =
    geometria.area_km2 ??
    params.area ??
    null;

  const pendienteMediaPct =
    relieve.pendiente_media_pct ??
    params.pendiente_media ??
    params.pendiente_cuenca ??
    null;

  // ------------------------------------------------------------
  // 2. IDF adoptada
  // ------------------------------------------------------------
  const estacionesIDF =
    Array.isArray(idf.estaciones_influencia) &&
    idf.estaciones_influencia.length > 0
      ? idf.estaciones_influencia.map((e) => ({
          nombre: e.etiqueta || e.nombre || e.id || "Estación IDF",
          peso: Number.isFinite(e.peso_pct)
            ? e.peso_pct / 100
            : Number.isFinite(e.peso)
            ? e.peso
            : 1,
          peso_pct: Number.isFinite(e.peso_pct)
            ? e.peso_pct
            : Number.isFinite(e.peso)
            ? e.peso <= 1
              ? e.peso * 100
              : e.peso
            : 100,
          rol: e.rol || "estacion_idf_adoptada",
          estado: e.estado || "activa"
        }))
      : [
          {
            nombre:
              idf.estacion_label ||
              idf.estacion_nombre ||
              "San Cristóbal",
            peso: Number.isFinite(idf.peso_operativo_pct)
              ? idf.peso_operativo_pct / 100
              : 1,
            peso_pct: Number.isFinite(idf.peso_operativo_pct)
              ? idf.peso_operativo_pct
              : 100,
            rol: "estacion_idf_adoptada",
            estado: idf.estado || "activa"
          }
        ];

  const resumenIDF = {
    metodo_adoptado: idf.metodo_adoptado || "EPM",
    estacion_principal:
      idf.estacion_label ||
      idf.estacion_nombre ||
      estacionesIDF?.[0]?.nombre ||
      "San Cristóbal",
    estaciones: estacionesIDF,
    ponderacion_formal_pendiente: true,
    observacion:
      "La ponderación IDF multies­tación queda pendiente de cálculo formal. Solo deben participar estaciones disponibles y parametrizadas."
  };

  // ------------------------------------------------------------
  // 3. CN base, AMC y CN efectivo
  // ------------------------------------------------------------
  const CNbase =
    hidrologia.CN_base ??
    hidrologia.CN ??
    params.cnBase ??
    params.CN ??
    75;

  const amcActual =
    params.amcActual ||
    hidrologia.amcActual ||
    "II";

  const porcentajeImpermeable =
    Number.isFinite(params.porcentajeImpermeable)
      ? params.porcentajeImpermeable
      : Number.isFinite(hidrologia.porcentajeImpermeable)
      ? hidrologia.porcentajeImpermeable
      : 0;

  const CNefectivo = calcCNdinamico({
    amcActual,
    porcentajeImpermeable,
    cnBase: CNbase
  });

  const retencion = calcRetencionSCS(CNefectivo);

  const resumenCN = {
    CN_base: CNbase,
    CN_condicion_base:
      hidrologia.CN_condicion_base ||
      "CNII",
    CN_efectivo: CNefectivo,
    amc: amcActual,
    porcentaje_impermeable: porcentajeImpermeable,
    S_mm: retencion.S,
    Ia_mm: retencion.Ia,
    lambda: retencion.lambda,
    metodo: "SCS-CN",
    observacion:
      "CN efectivo calculado con ajuste AMC e impermeabilidad cuando existan insumos dinámicos."
  };

  // ------------------------------------------------------------
  // 4. Tiempo de concentración Tc
  // ------------------------------------------------------------
  const paramsTc = {
    area: areaKm2,
    longitud_cauce:
      geometria.longitud_cauce_km ??
      params.longitud_cauce,
    pendiente_cuenca:
      params.pendiente_cuenca ??
      pendienteMediaPct,
    cota_mayor_cauce:
      relieve.cota_mayor_cauce_msnm ??
      relieve.cota_max_msnm ??
      params.cota_mayor_cauce ??
      params.cota_max,
    cota_menor_cauce:
      relieve.cota_menor_cauce_msnm ??
      relieve.cota_min_msnm ??
      params.cota_menor_cauce ??
      params.cota_min,
    cota_max:
      relieve.cota_max_msnm ??
      params.cota_max,
    cota_min:
      relieve.cota_min_msnm ??
      params.cota_min,
    CN: CNefectivo
  };

  let tcMetodos = [];
  let tcResumen = {
    n: 0,
    promedio_h: null,
    promedio_min: null,
    mediana_min: null,
    min_min: null,
    max_min: null
  };

  const tieneInsumosTc =
    Number.isFinite(paramsTc.area) &&
    Number.isFinite(paramsTc.longitud_cauce) &&
    Number.isFinite(paramsTc.pendiente_cuenca) &&
    Number.isFinite(paramsTc.cota_mayor_cauce) &&
    Number.isFinite(paramsTc.cota_menor_cauce) &&
    Number.isFinite(paramsTc.cota_max) &&
    Number.isFinite(paramsTc.cota_min) &&
    Number.isFinite(paramsTc.CN);

  if (tieneInsumosTc) {
    tcMetodos = calcTc(paramsTc).filter(
      (r) =>
        Number.isFinite(r.h) &&
        Number.isFinite(r.min) &&
        r.h > 0 &&
        r.min > 0
    );

    tcResumen = resumirTc(tcMetodos);
  }

  const resumenTc = {
    estado: tieneInsumosTc
      ? "calculado"
      : "insumos_incompletos",
    metodos: tcMetodos,
    resumen: tcResumen,
    tc_sugerido_min:
      tcResumen.mediana_min ??
      tcResumen.promedio_min ??
      null,
    criterio_sugerido:
      "Se reportan métodos empíricos y resumen estadístico. El Tc adoptado definitivo debe definirse por criterio técnico y sensibilidad hidrológica."
  };

  // ------------------------------------------------------------
  // 5. Periodos de retorno
  // ------------------------------------------------------------
  const periodosRetorno =
    Array.isArray(hidrologia.periodos_retorno) &&
    hidrologia.periodos_retorno.length > 0
      ? hidrologia.periodos_retorno
      : Array.isArray(hidrologia.periodos_retorno_anios)
      ? hidrologia.periodos_retorno_anios.map((tr) => ({
          tr,
          etiqueta: `Tr ${tr} años`,
          tipo: tr === 2.33 ? "evento_medio_anual" : "diseno",
          activo: true
        }))
      : [2.33, 5, 10, 25, 50, 100].map((tr) => ({
          tr,
          etiqueta: `Tr ${tr} años`,
          tipo: tr === 2.33 ? "evento_medio_anual" : "diseno",
          activo: true
        }));

  // ------------------------------------------------------------
  // 6. Método Racional
  // ------------------------------------------------------------
  const umbralRacionalKm2 = 5;

  const racionalCompetente =
    Number.isFinite(areaKm2) &&
    areaKm2 <= umbralRacionalKm2;

  const resumenRacional = {
    area_km2: areaKm2,
    umbral_competencia_km2: umbralRacionalKm2,
    uso_recomendado: racionalCompetente
      ? "Método competente para cuenca menor"
      : "Solo contraste referencial",
    competencia: racionalCompetente
      ? "alta"
      : "baja_no_principal",
    C:
      hidrologia.coeficiente_escorrentia ??
      params.C_racional ??
      null,
    c_en_funcion_cn: {
      estado: "pendiente_motor",
      criterio:
        "Mantener en radar el cálculo del coeficiente C como función del Número de Curva CN."
    },
    observacion: racionalCompetente
      ? "El área de la cuenca está dentro del rango usual de aplicación referencial del Método Racional."
      : "Para esta cuenca, por área mayor a 5 km², el Método Racional no se adopta como método principal. Se conserva como contraste."
  };

  // ------------------------------------------------------------
  // 7. Salida consolidada
  // ------------------------------------------------------------
  return {
    cuenca: {
      id: params.id || null,
      nombre: nombreCuenca,
      punto_control: puntoControl,
      area_km2: areaKm2,
      pendiente_media_pct: pendienteMediaPct,
      estado_tecnico:
        params.estado_tecnico?.validacionGeomorfologica ||
        params.estado ||
        "en_validacion"
    },

    idf: resumenIDF,

    cn: resumenCN,

    tc: resumenTc,

    periodos_retorno: periodosRetorno,

    racional: resumenRacional,

    flags: {
      ponderacion_idf_formal_pendiente: true,
      c_racional_en_funcion_cn_pendiente: true,
      tc_adoptado_pendiente: true
    },

    trazabilidad: {
      fuente: "resumenMotorHidrologico",
      motor: "hidroEngine.js",
      estado: "resumen_consolidado"
    }
  };
}