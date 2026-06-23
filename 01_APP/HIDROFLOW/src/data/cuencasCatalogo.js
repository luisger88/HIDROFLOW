/**
 * cuencasCatalogo.js
 * Catalogo tecnico de cuencas HidroFlow
 *
 * Este archivo desacopla los parametros de cuenca del componente HidroFlow.jsx.
 * No ejecuta calculos. Solo centraliza datos base validados.
 *
 * Actualizacion tecnica:
 * - Se mantiene compatibilidad con campos planos existentes.
 * - Se incorpora estructura profesional por bloques:
 *   estado, salida, geometria, relieve, idf e hidrologia.
 * - Para La Iguana PC_80 se reemplaza Tr = 2 anios por Tr = 2.33 anios
 *   en los calculos hidrologicos.
 */

export const CUENCAS_CATALOGO = {
  san_antonio_prado: {
    id: "san_antonio_prado",
    etiqueta: "SAN ANTONIO DE PRADO",
    nombre_cuenca: "Cuenca San Antonio",

    // ------------------------------------------------------------
    // CAMPOS PLANOS LEGADOS - mantener por compatibilidad temporal
    // ------------------------------------------------------------
    area: 2.83,
    perimetro: 12.04,
    longitud_cauce: 5.26,
    longitud_cuenca: 4.65,
    longitud_divisoria: 5.28,

    cota_max: 2950,
    cota_min: 1702.7,
    cota_mayor_cauce: 2762.5,
    cota_menor_cauce: 1702.7,

    lat_salida: 6.18508333,
    lon_salida: -75.65997222,
    alt_salida: 1702,

    CN: 88,
    dt_min: 5,

    fuente: "Parametros originales app HidroFlow",
    estado: "base_demo_operativa",

    // ------------------------------------------------------------
    // ESTRUCTURA PROFESIONAL NUEVA
    // ------------------------------------------------------------
    estado_tecnico: {
      cuencaActiva: false,
      validacionGeomorfologica: "base_demo_operativa",
      validacionHidrologica: "base_demo_operativa",
      fuente: "Parametros originales app HidroFlow",
      observacion:
        "Registro base de demostracion conservado para compatibilidad de la app HidroFlow."
    },

    salida: {
      lat: 6.18508333,
      lon: -75.65997222,
      cota_msnm: 1702,
      descripcion: "Punto de salida de la cuenca San Antonio de Prado"
    },

    geometria: {
      area_km2: 2.83,
      perimetro_km: 12.04,
      longitud_cauce_km: 5.26,
      longitud_cuenca_km: 4.65,
      longitud_divisoria_km: 5.28
    },

    relieve: {
      cota_max_msnm: 2950,
      cota_min_msnm: 1702.7,
      cota_mayor_cauce_msnm: 2762.5,
      cota_menor_cauce_msnm: 1702.7,
      desnivel_m: 1247.3,
      pendiente_media_pct: null,
      metodo_pendiente: "Pendiente media no recalculada en esta actualizacion."
    },

    idf: {
      estacion_id: null,
      estacion_nombre: null,
      metodo_asociacion: "no_definido",
      distancia_km: null,
      peso_idw: null,
      peso_thiessen: null,
      estado: "pendiente_validacion",
      observacion:
        "La estacion IDF debe mostrarse separada de la cuenca activa."
    },

    hidrologia: {
      punto_calculo: "salida_cuenca",
      CN: 88,
      dt_min: 5,
      estado: "base_demo_operativa",

      periodos_retorno_anios: [2.33, 5, 10, 25, 50, 100],

      periodos_retorno: [
        {
          tr: 2.33,
          etiqueta: "Tr 2.33 años",
          tipo: "evento_medio_anual",
          activo: true
        },
        {
          tr: 5,
          etiqueta: "Tr 5 años",
          tipo: "diseno",
          activo: true
        },
        {
          tr: 10,
          etiqueta: "Tr 10 años",
          tipo: "diseno",
          activo: true
        },
        {
          tr: 25,
          etiqueta: "Tr 25 años",
          tipo: "diseno",
          activo: true
        },
        {
          tr: 50,
          etiqueta: "Tr 50 años",
          tipo: "diseno",
          activo: true
        },
        {
          tr: 100,
          etiqueta: "Tr 100 años",
          tipo: "diseno",
          activo: true
        }
      ],

      observacion:
        "Se adopta Tr 2.33 años como periodo base para calculos hidrologicos."
    }
  },

  iguana_pc80: {
    id: "iguana_pc80",
    etiqueta: "QUEBRADA LA IGUANA - PC_80",
    nombre_cuenca: "Quebrada La Iguana - PC_80",
    nombre_completo: "Quebrada La Iguana - PC_80",
    punto_control: "PC_80",

    // ------------------------------------------------------------
    // CAMPOS PLANOS LEGADOS - compatibilidad temporal con HidroFlow.jsx
    // ------------------------------------------------------------
    // Estos campos se mantienen mientras HidroFlow.jsx migra gradualmente
    // hacia la estructura profesional por bloques: geometria, relieve,
    // hidrologia e idf.

    area: 46.8516,
    perimetro: 47.59,
    longitud_cauce: 15.524,
    longitud_cuenca: 15.515,
    longitud_divisoria: 47.59,

    cota_max: 2819.27,
    cota_min: 1511.36,
    cota_mayor_cauce: 2819.27,
    cota_menor_cauce: 1511.36,

    // HidroFlow.jsx todavía lee pendiente_cuenca para:
    // 1. Mostrar "Pendiente media" en el módulo Parámetros.
    // 2. Calcular el método SCS-Ranser dentro de calcTc().
    pendiente_cuenca: 8.43,

    // Alias técnico para paneles nuevos y trazabilidad.
    pendiente_media: 8.43,

    longitud_red: 127.1283,
    densidad_drenaje: 2.7134,
    kc_compacidad: 1.9468,
    kf_forma: 0.1946,

    tramos_qc: 4,
    quiebres_qc: 3,

    lat_salida: 6.271785117145225,
    lon_salida: -75.59408755595547,
    alt_salida: 1511.36,

    // CN base en condición CNII.
    CN: 88,
    cnBase: 88,

    // HidroFlow.jsx lee params.dt para Δt cálculo.
    dt: 5,

    // Alias técnico nuevo.
    dt_min: 5,

    fuente: "HidroFlow Modulo 1 Geomorfologia - Parametros Geomorf Iguana",
    estado: "validado_geomorfologia_pendiente_hidrologia",

    // ------------------------------------------------------------
    // ESTRUCTURA PROFESIONAL NUEVA HIDROFLOW APP
    // ------------------------------------------------------------
    estado_tecnico: {
      cuencaActiva: true,
      validacionGeomorfologica: "validada",
      validacionHidrologica: "pendiente_simulacion",
      fuente: "HidroFlow Modulo 1 Geomorfologia - Parametros Geomorf Iguana",
      observacion:
        "Cuenca La Iguana PC_80 cargada con coordenadas, cotas y parametros geomorfologicos validados desde Modulo 1. Pendiente hidrologica lista para simulacion en app."
    },

    salida: {
      lat: 6.271785117145225,
      lon: -75.59408755595547,
      cota_msnm: 1511.36,
      descripcion: "Punto de control y salida hidrologica PC_80"
    },

    geometria: {
      area_km2: 46.8516,
      perimetro_km: 47.59,
      longitud_cauce_km: 15.524,
      longitud_cuenca_km: 15.515,
      longitud_divisoria_km: 47.59,
      longitud_red_km: 127.1283,
      densidad_drenaje_km_km2: 2.7134,
      kc_compacidad: 1.9468,
      kf_forma: 0.1946
    },

    relieve: {
      cota_max_msnm: 2819.27,
      cota_min_msnm: 1511.36,
      cota_mayor_cauce_msnm: 2819.27,
      cota_menor_cauce_msnm: 1511.36,
      desnivel_m: 1307.91,
      pendiente_media_pct: 8.43,
      metodo_pendiente:
        "Pendiente media calculada a partir del desnivel entre cota maxima y cota de salida sobre la longitud del cauce principal."
    },

    geomorfologia: {
      tramos_qc: 4,
      quiebres_qc: 3,
      estado: "validada_modulo_1",
      observacion:
        "Parametros derivados del Modulo 1 de Geomorfologia de HidroFlow."
    },

    idf: {
      metodo_adoptado: "EPM",
      estacion_id: "SAN_CRISTOBAL",
      estacion_nombre: "SAN CRISTOBAL",
      estacion_label: "San Cristóbal",
      peso_operativo_pct: 100,
      estado: "validada_para_calculo",

      estaciones_influencia: [
        {
          id: "SAN_CRISTOBAL",
          nombre: "SAN CRISTOBAL",
          etiqueta: "San Cristóbal",
          fuente: "EPM",
          peso_pct: 100,
          rol: "estacion_idf_adoptada",
          estado: "activa_en_catalogo_epm"
        }
      ],

      referencias_externas_pendientes: [
        {
          id: "MIGUEL_DE_AGUINAGA",
          nombre: "Miguel de Aguinaga",
          rol: "referencia_pluviometrica_pendiente",
          estado: "no_disponible_en_ESTACIONES_EPM",
          observacion:
            "No se usa en calculo IDF hasta incorporar coordenadas, codigo, altitud y parametros k-n-c por periodo de retorno."
        }
      ],

      observacion:
        "Para La Iguana PC_80 se adopta San Cristobal como estacion IDF operativa. Miguel de Aguinaga queda registrada solo como referencia pendiente de incorporacion, no participa en calculos."
    },

    hidrologia: {
      punto_calculo: "PC_80",
      CN: 88,
      dt_min: 5,
      estado: "pendiente_simulacion",
      
      precipitacion_efectiva_scs: {
        metodo: "SCS-CN",
        descripcion:
          "Calculo de precipitacion efectiva mediante metodo de infiltracion del SCS, usando Numero de Curva CN ajustado por cobertura, uso del suelo y condicion antecedente de humedad.",
        CN_base: 88,
        fuente_CN:
          "Cobertura y usos del suelo integrados al parametro CN de la cuenca.",
        humedad_antecedente: {
          fuente: "SIATA",
          variable: "AMC",
          estado: "pendiente_integracion_dinamica",
          criterio:
            "El CN base debe ajustarse segun condicion antecedente de humedad AMC derivada de informacion SIATA."
        },
        parametros_scs: {
          unidad: "mm",
          abstraccion_inicial_lambda: 0.2,
          formula_S: "S = (25400 / CN) - 254",
          formula_Ia: "Ia = lambda * S",
          formula_Pe:
            "Pe = ((P - Ia)^2) / (P - Ia + S), si P > Ia; en caso contrario Pe = 0"
        },
        estado: "regla_definida_pendiente_motor_calculo"
      },

      tiempo_concentracion: {
        simbolo: "Tc",
        unidad: "min",
        estado: "pendiente_regla_operativa_final",
        metodos_disponibles: [
          {
            id: "tc_cn",
            nombre: "Tc = f(CN)",
            tipo: "hidrologico",
            descripcion:
              "Estimacion de tiempo de concentracion condicionada por Numero de Curva, cobertura, uso del suelo y humedad antecedente."
          },
          {
            id: "tc_geometrico",
            nombre: "Tc = f(parametros geometricos)",
            tipo: "geomorfologico",
            descripcion:
              "Estimacion de tiempo de concentracion a partir de longitud hidraulica, pendiente, desnivel y parametros geometricos de la cuenca."
          }
        ],
        regla_seleccion_preliminar: {
          criterio_base:
            "Usar Tc geometrico como valor rector inicial cuando exista eje principal, longitud de cauce, cotas y pendiente media validadas por Modulo 1.",
          criterio_ajuste:
            "Usar Tc = f(CN) como contraste hidrologico y ajuste por cobertura, uso del suelo y condicion antecedente de humedad SIATA.",
          criterio_alerta:
            "Si la diferencia relativa entre Tc geometrico y Tc_CN supera el 25 %, marcar revision tecnica antes de adoptar el Tc definitivo.",
          criterio_adopcion:
            "Adoptar Tc definitivo solo despues de comparar consistencia fisica, respuesta hidrologica esperada y sensibilidad del hidrograma Q(t)."
        },
        observacion:
          "Para La Iguana PC_80, el Tc no debe seleccionarse automaticamente por un unico metodo. Debe existir comparacion entre metodo geometrico y metodo condicionado por CN/AMC."
      },

      // Nota HidroFlow:
      // Para calculos hidrologicos se usa Tr = 2.33 anios como periodo base,
      // en reemplazo de Tr = 2 anios, por corresponder al evento medio anual.
      periodos_retorno_anios: [2.33, 5, 10, 25, 50, 100],

      periodos_retorno: [
        {
          tr: 2.33,
          etiqueta: "Tr 2.33 años",
          tipo: "evento_medio_anual",
          activo: true
        },
        {
          tr: 5,
          etiqueta: "Tr 5 años",
          tipo: "diseno",
          activo: true
        },
        {
          tr: 10,
          etiqueta: "Tr 10 años",
          tipo: "diseno",
          activo: true
        },
        {
          tr: 25,
          etiqueta: "Tr 25 años",
          tipo: "diseno",
          activo: true
        },
        {
          tr: 50,
          etiqueta: "Tr 50 años",
          tipo: "diseno",
          activo: true
        },
        {
          tr: 100,
          etiqueta: "Tr 100 años",
          tipo: "diseno",
          activo: true
        }
      ],

      observacion:
        "Para los calculos hidrologicos se adopta Tr 2.33 años como periodo base, en reemplazo de Tr 2 años."
    }
  }
};

export const CUENCA_DEFAULT_ID = "san_antonio_prado";

export function getCuencaById(id) {
  return CUENCAS_CATALOGO[id] || CUENCAS_CATALOGO[CUENCA_DEFAULT_ID];
}

export function listarCuencas() {
  return Object.values(CUENCAS_CATALOGO).map((cuenca) => ({
    id: cuenca.id,
    etiqueta: cuenca.etiqueta,
    nombre_cuenca: cuenca.nombre_cuenca,
    estado: cuenca.estado,
    estado_tecnico: cuenca.estado_tecnico?.validacionGeomorfologica || cuenca.estado
  }));
}