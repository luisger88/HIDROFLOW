import { construirLineasResumenQ5AuditadoExpediente } from "../services/documentos/construirExpedienteHidrologicoMinimo.js";
import React, { useEffect, useMemo, useState } from "react";

import { setTcState } from "../agents/tcAgent";
import { calcTc, mapTcResultados } from "../services/hidroEngine";
import { seleccionarTc } from "../services/tcSelector";
import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
import adaptarExpedienteDocumental from "../services/documentos/adaptarExpedienteDocumental";
import construirExpedienteHidrologicoMinimo, {
  construirLineasIdentificacionExpediente,
  construirLineasParametrosHidrologicosBaseExpediente,
  construirLineasTiempoConcentracionRolesTcExpediente,
  construirLineasVolumenReferenciaExpediente,
  construirLineasEscenarioQTrActivoExpediente,
  construirLineasSelloTecnicoAuxiliarExpediente
} from "../services/documentos/construirExpedienteHidrologicoMinimo";
import adaptarQSeriesHidrogramas from "../services/hidrogramas/adaptarQSeriesHidrogramas";
import resumirEstructuraHidrogramas from "../services/hidrogramas/resumirEstructuraHidrogramas";
import calcularMetricasMorfologiaQt from "../services/hidrogramas/calcularMetricasMorfologiaQt";
import clasificarFormaQt from "../services/hidrogramas/clasificarFormaQt";
import evaluarRiesgoTemporalQt from "../services/hidrogramas/evaluarRiesgoTemporalQt";
import sintetizarRiesgoTemporalQt from "../services/hidrogramas/sintetizarRiesgoTemporalQt";
import construirSeccionDiagnosticoTemporalQt from "../services/hidrogramas/construirSeccionDiagnosticoTemporalQt";
import validarSeccionDiagnosticoTemporalQt from "../services/hidrogramas/validarSeccionDiagnosticoTemporalQt";
import construirPayloadExpedienteDesdeEstado from "../services/documentos/construirPayloadExpedienteDesdeEstado.js";
import construirDescargaMarkdownExpedienteDesdePayload from "../services/documentos/construirDescargaMarkdownExpedienteDesdePayload.js";
import descargarArchivoMarkdownEnNavegador from "../services/documentos/descargarArchivoMarkdownEnNavegador.js";
import prepararGraficaQpTPicoMatrizPatron from "../services/hidrogramas/prepararGraficaQpTPicoMatrizPatron";
import prepararGraficaVelocidadEfectivaMatrizPatron from "../services/hidrogramas/prepararGraficaVelocidadEfectivaMatrizPatron";
import sintetizarLecturaComparativaMatrizPatron from "../services/hidrogramas/sintetizarLecturaComparativaMatrizPatron";

import {
  resumenComparadorCatalogo,
} from "../data/metodosComparadorCatalogo";

import {
  evaluarCompetenciaComparador,
} from "../data/matrizCompetenciaComparador";
import { CUENCAS_CATALOGO } from "../data/cuencasCatalogo";

import { conceptuarCuenca } from "../data/clasificacionCuenca";
import matrizPatronLaIguanaPC80 from "../data/matrizPatronLaIguanaPC80";

import {
  obtenerAuditoriaPendienteTc,
  obtenerCriterioPendientesAuditoria,
} from "../data/auditoriaPendientesTc";

import {
  formatTc,
  formatQ,
  formatArea,
  formatVolumen,
  formatPendiente,
  formatCN
} from "../utils/formatters";

export default function ComparadorMultiMetodo({ contexto = null }) {
  let bloqueoAdopcion = false;
  // ✅ OT-0067E — utilidades de bloqueo (GLOBAL COMPONENTE)



  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  // ✅ CONTEXTO BASE
const contextoBase = contexto || {
  cuencaNombre: "Sin caso activo",
  area_km2: null,
  pendiente_media_pct: null,
  CN: null,
  lluvia_efectiva: false
};

const fuenteContexto = contexto ? "motor HidroFlow" : "contexto base";
const cuencaActiva = {
  nombre:
    contextoBase?.casoActivo?.cuenca?.nombre ??
    contextoBase?.cuencaNombre,

  area_km2:
    contextoBase?.casoActivo?.cuenca?.area_km2 ??
    contextoBase?.area_km2,

  longitud_cauce_km:
    contextoBase?.casoActivo?.cuenca?.longitud_cauce_km ??
    contextoBase?.longitud_cauce_km,

  pendiente_media_pct:
    contextoBase?.casoActivo?.cuenca?.pendiente_media_pct ??
    contextoBase?.pendiente_media_pct
};
const hidrologiaActiva = {
  CN:
    contextoBase?.casoActivo?.hidrologia?.CN ??
    contextoBase?.CN,

  CN_base:
    contextoBase?.casoActivo?.hidrologia?.CN_base ??
    contextoBase?.CN_base ??
    contextoBase?.CN,

  CN_efectivo:
    contextoBase?.casoActivo?.hidrologia?.CN_efectivo ??
    contextoBase?.CN_efectivo ??
    contextoBase?.cn_efectivo ??
    contextoBase?.CN,

  AMC:
    contextoBase?.casoActivo?.hidrologia?.AMC ??
    contextoBase?.AMC ??
    contextoBase?.amcActual ??
    contextoBase?.amc,

  S_mm:
    contextoBase?.casoActivo?.hidrologia?.S_mm ??
    contextoBase?.S_mm ??
    contextoBase?.s_mm,

  Ia_mm:
    contextoBase?.casoActivo?.hidrologia?.Ia_mm ??
    contextoBase?.Ia_mm ??
    contextoBase?.ia_mm,

  porcentaje_impermeable:
    contextoBase?.casoActivo?.hidrologia?.porcentaje_impermeable ??
    contextoBase?.porcentaje_impermeable,

  tc_min:
    contextoBase?.casoActivo?.hidrologia?.tc_min ??
    contextoBase?.q_tr_activo_estado?.q_tr_activo?.tc_min ??
    contextoBase?.q_tr_activo_estado?.tc_min ??
    contextoBase?.tc_min,

  tc_metodos:
    contextoBase?.casoActivo?.hidrologia?.tc_metodos ??
    contextoBase?.tc_metodos ??
    []
};

// ✅ DEFINICIÓN REAL DE p
const p = {
  longitud_cauce: 15.524,
  area: cuencaActiva.area_km2,
  pendiente_cuenca: cuencaActiva.pendiente_media_pct,
  cota_mayor_cauce: 2819.27,
  cota_menor_cauce: 1511.36,
  cota_max: 2819.27,
  cota_min: 1511.36,
  CN: hidrologiaActiva.CN
};

// ✅ EJECUTAR MOTOR
const tcArray = calcTc(p);

// ✅ MAPEAR RESULTADOS
const metodosTc = mapTcResultados(tcArray);

// ✅ CONTEXTO HIDROLÓGICO
const contextoTc = {
  pendiente: cuencaActiva.pendiente_media_pct,
  area: cuencaActiva.area_km2,
  CN: hidrologiaActiva.CN,
  urbanizacion: 0.5
};

const evaluacionCompetencia = useMemo(() => {
  return evaluarCompetenciaComparador(contextoBase);
}, [contextoBase]);

const conceptoCuenca = useMemo(() => {
  return conceptuarCuenca(contextoBase);
}, [contextoBase]);

// ✅ Tc FINAL

const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);

const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
  metodosTc,
  evaluacionCompetencia?.tc
);
// ✅ Publicar Tc en el agente DESPUÉS del render
useEffect(() => {
  if (Tc_final !== null && Tc_final !== undefined) {
    setTcState({
      Tc_final,
      metodosTc,
      contextoTc,
      metodosTcCompetentes,
      rangoCompetenteTc,
    });
  }
}, [Tc_final]);



  // ✅ Y SOLO AQUÍ VA EL RETURN
 // ✅ BLOQUE CONSISTENTE DE MÉTODOS

const metodos = useMemo(() => {
  if (!evaluacionCompetencia) return [];

  const base = [
    ...evaluacionCompetencia.tc.map(m => ({
      ...m,
      bloque: "Tc-15"
    })),
    ...evaluacionCompetencia.q.map(m => ({
      ...m,
      bloque: "Q-5"
    }))
  ];

  return base.filter(m => {
    const pasaEstado =
      filtroEstado === "todos" ||
      m.estadoImplementacion === filtroEstado;

    const pasaTipo =
      filtroTipo === "todos" ||
      m.tipo === filtroTipo;

    return pasaEstado && pasaTipo;
  });

}, [evaluacionCompetencia, filtroEstado, filtroTipo]);


const conteo = useMemo(() => ({
  total: metodos.length,
  tc: metodos.filter(m => m.tipo === "tc").length,
  q: metodos.filter(m => m.tipo === "q").length,
  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
}), [metodos]);

// OT-0070D — Diagnóstico qSeries interno y silencioso
const diagnosticoQSeries = useMemo(() => {
  try {
    return adaptarQSeriesHidrogramas(contextoBase?.hidrogramas, {
      fuente: "ComparadorMultiMetodo.contextoBase.hidrogramas"
    });
  } catch (errorQSeries) {
    console.warn("Diagnóstico qSeries no invasivo no ejecutado:", errorQSeries);

    return {
      ok: false,
      resumen: {
        total: 0,
        publicados: 0,
        parciales: 0,
        noDisponibles: 0,
        inconsistentes: 0
      },
      metodos: [],
      error: String(errorQSeries?.message ?? errorQSeries)
    };
  }
}, [contextoBase?.hidrogramas]);

// OT-0074F — Resumen estructural interno y silencioso de hidrogramas
const resumenEstructuraHidrogramas = useMemo(() => {
  try {
    return resumirEstructuraHidrogramas(contextoBase?.hidrogramas);
  } catch (errorResumenHidrogramas) {
    return {
      ok: false,
      resumen: {
        tipoEntrada: "error",
        contenedor: null,
        totalCandidatos: 0,
        conSerieTemporal: 0,
        sinSerieTemporal: 0,
        conQpico: 0,
        conTPico: 0,
        conVolTotal: 0
      },
      candidatos: [],
      error: String(errorResumenHidrogramas?.message ?? errorResumenHidrogramas)
    };
  }
}, [contextoBase?.hidrogramas]);

// OT-0082D — Diagnóstico interno controlado de métricas morfológicas Q(t).
// Calcula elegibilidad agregada sobre qSeries publicadas, sin mostrar métricas detalladas.
const diagnosticoMorfologiaQt = useMemo(() => {
  try {
    const bruto = contextoBase?.hidrogramas;

    const candidatos = Array.isArray(bruto)
      ? bruto
      : Array.isArray(bruto?.resultados)
      ? bruto.resultados
      : Array.isArray(bruto?.metodos)
      ? bruto.metodos
      : [];

    const evaluaciones = candidatos.map((candidato) =>
      calcularMetricasMorfologiaQt(candidato?.qSeries)
    );

    const aptas = evaluaciones.filter((evaluacion) => evaluacion?.ok).length;
    const noAptas = evaluaciones.length - aptas;

    return {
      ok: true,
      total: evaluaciones.length,
      aptas,
      noAptas,
      evaluaciones
    };
  } catch (errorMorfologiaQt) {
    return {
      ok: false,
      total: 0,
      aptas: 0,
      noAptas: 0,
      evaluaciones: [],
      error: String(errorMorfologiaQt?.message ?? errorMorfologiaQt)
    };
  }
}, [contextoBase?.hidrogramas]);

// OT-0083B — Filas tabulares controladas de métricas morfológicas Q(t).
// Prepara datos para exposición diagnóstica, sin adoptar métodos ni levantar bloqueos.
const filasMorfologiaQt = useMemo(() => {
  try {
    const bruto = contextoBase?.hidrogramas;

    const candidatos = Array.isArray(bruto)
      ? bruto
      : Array.isArray(bruto?.resultados)
      ? bruto.resultados
      : Array.isArray(bruto?.metodos)
      ? bruto.metodos
      : [];

    const evaluaciones = Array.isArray(diagnosticoMorfologiaQt?.evaluaciones)
      ? diagnosticoMorfologiaQt.evaluaciones
      : [];

    return candidatos.map((candidato, indice) => {
      const evaluacion = evaluaciones[indice] ?? {};

      return {
        metodo: candidato?.metodo ?? candidato?.nombre ?? `Método ${indice + 1}`,
        estado: evaluacion?.ok ? "Apta" : "No apta",
        motivo: evaluacion?.motivo ?? null,
        Qp: Number.isFinite(Number(evaluacion?.Qp)) ? Number(evaluacion.Qp) : null,
        tPico: Number.isFinite(Number(evaluacion?.tPico)) ? Number(evaluacion.tPico) : null,
        duracionEfectivaMin: Number.isFinite(Number(evaluacion?.duracionEfectivaMin))
          ? Number(evaluacion.duracionEfectivaMin)
          : null,
        tiempoAscensoMin: Number.isFinite(Number(evaluacion?.tiempoAscensoMin))
          ? Number(evaluacion.tiempoAscensoMin)
          : null,
        tiempoRecesoMin: Number.isFinite(Number(evaluacion?.tiempoRecesoMin))
          ? Number(evaluacion.tiempoRecesoMin)
          : null,
        W50Min: Number.isFinite(Number(evaluacion?.W50Min)) ? Number(evaluacion.W50Min) : null,
        W25Min: Number.isFinite(Number(evaluacion?.W25Min)) ? Number(evaluacion.W25Min) : null,
        asimetriaAscensoReceso: Number.isFinite(Number(evaluacion?.asimetriaAscensoReceso))
          ? Number(evaluacion.asimetriaAscensoReceso)
          : null
      };
    });
  } catch (errorFilasMorfologiaQt) {
    console.warn("Filas morfológicas Q(t) no generadas:", errorFilasMorfologiaQt);
    return [];
  }
}, [contextoBase?.hidrogramas, diagnosticoMorfologiaQt]);

// OT-0084C — Filas de dictamen diagnóstico de forma Q(t).
// Clasificación no adoptiva basada únicamente en métricas morfológicas ya calculadas.
const filasDictamenFormaQt = useMemo(() => {
  if (!Array.isArray(filasMorfologiaQt)) return [];

  return filasMorfologiaQt.map((fila) => {
    const dictamen = clasificarFormaQt({
      duracionEfectivaMin: fila?.duracionEfectivaMin,
      tiempoAscensoMin: fila?.tiempoAscensoMin,
      tiempoRecesoMin: fila?.tiempoRecesoMin,
      W50Min: fila?.W50Min,
      W25Min: fila?.W25Min,
      asimetriaAscensoReceso: fila?.asimetriaAscensoReceso,
      Qp: fila?.Qp,
      tPico: fila?.tPico
    });

    return {
      metodo: fila?.metodo ?? "Método Q(t)",
      estadoMetrico: fila?.estado ?? "No apta",
      forma: dictamen?.forma ?? "No clasificable",
      alerta: dictamen?.alerta ?? "Sin dictamen",
      severidad: dictamen?.severidad ?? "No determinada",
      comentario: dictamen?.comentario ?? "Diagnóstico no adoptivo.",
      banderas: Array.isArray(dictamen?.banderas) ? dictamen.banderas : []
    };
  });
}, [filasMorfologiaQt]);

// OT-0085C — Filas de riesgo temporal Q(t) no adoptivo.
// Lectura comparativa basada en el dictamen de forma y métricas morfológicas ya calculadas.
const filasRiesgoTemporalQt = useMemo(() => {
  if (!Array.isArray(filasDictamenFormaQt)) return [];

  return filasDictamenFormaQt.map((filaDictamen) => {
    const filaMorfologia =
      Array.isArray(filasMorfologiaQt)
        ? filasMorfologiaQt.find((fila) => fila?.metodo === filaDictamen?.metodo)
        : null;

    const riesgoTemporal = evaluarRiesgoTemporalQt({
      forma: filaDictamen?.forma,
      alerta: filaDictamen?.alerta,
      severidad: filaDictamen?.severidad,
      banderas: filaDictamen?.banderas,
      duracionEfectivaMin: filaMorfologia?.duracionEfectivaMin,
      tiempoAscensoMin: filaMorfologia?.tiempoAscensoMin,
      tiempoRecesoMin: filaMorfologia?.tiempoRecesoMin,
      W50Min: filaMorfologia?.W50Min,
      W25Min: filaMorfologia?.W25Min,
      asimetriaAscensoReceso: filaMorfologia?.asimetriaAscensoReceso,
      Qp: filaMorfologia?.Qp,
      tPico: filaMorfologia?.tPico
    });

    return {
      metodo: filaDictamen?.metodo ?? "Método Q(t)",
      riesgo: riesgoTemporal?.riesgo ?? "No determinado",
      nivel: riesgoTemporal?.nivel ?? "No determinado",
      factorDominante: riesgoTemporal?.factorDominante ?? "Sin factor dominante",
      comentario: riesgoTemporal?.comentario ?? "Diagnóstico comparativo no adoptivo.",
      banderasRiesgo: Array.isArray(riesgoTemporal?.banderasRiesgo)
        ? riesgoTemporal.banderasRiesgo
        : []
    };
  });
}, [filasDictamenFormaQt, filasMorfologiaQt]);

// OT-0086C — Síntesis ejecutiva temporal Q(t) no adoptiva.
// Resume riesgos temporales ya evaluados, sin seleccionar método ni levantar bloqueos.
const sintesisRiesgoTemporalQt = useMemo(() => {
  try {
    return sintetizarRiesgoTemporalQt(filasRiesgoTemporalQt);
  } catch (errorSintesisRiesgoTemporalQt) {
    return {
      ok: false,
      resumen: [
        "No fue posible generar la síntesis ejecutiva temporal Q(t)."
      ],
      niveles: {
        alto: 0,
        medio: 0,
        bajo: 0,
        noDeterminado: 0
      },
      riesgos: {},
      advertencia:
        "Síntesis diagnóstica no adoptiva; no selecciona método ni levanta No coherente.",
      error: String(errorSintesisRiesgoTemporalQt?.message ?? errorSintesisRiesgoTemporalQt)
    };
  }
}, [filasRiesgoTemporalQt]);

// OT-0092B — Lectura visual controlada de matriz patrón La Iguaná PC_80.
// Solo lectura: no recalcula, no adopta método y no modifica Q(t).
const matrizPatronVisual = null;
const diagnosticoMatrizPatronQt = Array.isArray(matrizPatronVisual?.diagnosticoQt)
  ? matrizPatronVisual.diagnosticoQt
  : [];
const sintesisMatrizPatron = matrizPatronVisual?.sintesisTemporal ?? {};
const salidaHidraulicaMatrizPatron = matrizPatronVisual?.salidaHidraulicaFutura ?? {};
const graficaQpTPicoMatrizPatron = prepararGraficaQpTPicoMatrizPatron(matrizPatronVisual);
const graficaVelocidadEfectivaMatrizPatron = prepararGraficaVelocidadEfectivaMatrizPatron(matrizPatronVisual);
const lecturaComparativaMatrizPatron = sintetizarLecturaComparativaMatrizPatron(matrizPatronVisual);
  
  const estilos = {
    pagina: {
      minHeight: "100vh",
      padding: "22px",
      background:
        "linear-gradient(180deg, #020617 0%, #050b14 45%, #030712 100%)",
      color: "#dff8ff",
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },

    encabezado: {
      display: "flex",
      justifyContent: "space-between",
      gap: "18px",
      alignItems: "flex-start",
      marginBottom: "18px",
      borderBottom: "1px solid rgba(0, 210, 255, 0.20)",
      paddingBottom: "14px",
    },

    titulo: {
      margin: 0,
      color: "#ffffff",
      fontSize: "22px",
      fontWeight: 900,
      letterSpacing: "0.01em",
    },

    subtitulo: {
      margin: "6px 0 0 0",
      color: "#8fb7d4",
      fontSize: "12px",
      maxWidth: "900px",
      lineHeight: 1.5,
    },

    version: {
      padding: "7px 10px",
      borderRadius: "999px",
      border: "1px solid rgba(34, 211, 238, 0.35)",
      background: "rgba(34, 211, 238, 0.08)",
      color: "#bff8ff",
      fontSize: "11px",
      fontWeight: 800,
      whiteSpace: "nowrap",
    },

    gridResumen: {
      display: "grid",
      gridTemplateColumns: "repeat(5, minmax(120px, 1fr))",
      gap: "10px",
      marginBottom: "16px",
    },

    tarjetaResumen: {
      border: "1px solid rgba(0, 210, 255, 0.18)",
      background:
        "linear-gradient(180deg, rgba(12, 30, 50, 0.92), rgba(7, 18, 32, 0.92))",
      borderRadius: "14px",
      padding: "12px",
      boxShadow: "0 8px 22px rgba(0,0,0,0.18)",
    },

    numeroResumen: {
      margin: 0,
      color: "#00e5ff",
      fontSize: "22px",
      fontWeight: 900,
    },

    etiquetaResumen: {
      margin: "3px 0 0 0",
      color: "#88a7bd",
      fontSize: "10px",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      fontWeight: 800,
    },

    controles: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "16px",
    },

    botonFiltro: {
      border: "1px solid rgba(0, 210, 255, 0.24)",
      background: "rgba(0, 210, 255, 0.07)",
      color: "#dff8ff",
      borderRadius: "999px",
      padding: "7px 11px",
      cursor: "pointer",
      fontSize: "11px",
      fontWeight: 800,
    },

    botonFiltroActivo: {
      border: "1px solid rgba(34, 211, 238, 0.95)",
      background: "rgba(34, 211, 238, 0.20)",
      color: "#ffffff",
      boxShadow: "0 0 0 1px rgba(34, 211, 238, 0.25)",
    },

    bloque: {
      marginTop: "18px",
    },

    bloqueTitulo: {
      margin: "0 0 10px 0",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: 900,
    },

    tablaWrap: {
      overflowX: "auto",
      border: "1px solid rgba(0, 210, 255, 0.16)",
      borderRadius: "14px",
      background: "rgba(5, 12, 24, 0.72)",
    },

    tabla: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "1180px",
    },

    th: {
      padding: "10px",
      color: "#7dd3fc",
      fontSize: "10px",
      textAlign: "left",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      borderBottom: "1px solid rgba(0, 210, 255, 0.14)",
      background: "rgba(15, 23, 42, 0.70)",
    },

    td: {
      padding: "10px",
      color: "#dff8ff",
      fontSize: "11px",
      verticalAlign: "top",
      borderBottom: "1px solid rgba(125, 170, 205, 0.09)",
      lineHeight: 1.45,
    },

    nombreMetodo: {
      color: "#ffffff",
      fontWeight: 900,
    },

    chip: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "999px",
      padding: "3px 7px",
      fontSize: "10px",
      fontWeight: 800,
      border: "1px solid rgba(0, 210, 255, 0.28)",
      background: "rgba(0, 210, 255, 0.10)",
      color: "#bff8ff",
      marginRight: "5px",
      marginBottom: "5px",
      whiteSpace: "nowrap",
    },

    chipActivo: {
      border: "1px solid rgba(0, 230, 184, 0.38)",
      background: "rgba(0, 230, 184, 0.12)",
      color: "#9fffe8",
    },

    chipPendiente: {
      border: "1px solid rgba(255, 209, 102, 0.38)",
      background: "rgba(255, 209, 102, 0.12)",
      color: "#ffd166",
    },

    semaforoWrap: {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      flexWrap: "wrap",
    },

    semaforoPunto: {
      width: "10px",
      height: "10px",
      borderRadius: "999px",
      display: "inline-block",
      boxShadow: "0 0 10px rgba(255,255,255,0.25)",
    },

    semaforoVerde: {
      background: "#22c55e",
      boxShadow: "0 0 10px rgba(34,197,94,0.75)",
    },

    semaforoAmarillo: {
      background: "#facc15",
      boxShadow: "0 0 10px rgba(250,204,21,0.75)",
    },

    semaforoAzul: {
      background: "#38bdf8",
      boxShadow: "0 0 10px rgba(56,189,248,0.75)",
    },

    semaforoGris: {
      background: "#94a3b8",
      boxShadow: "0 0 10px rgba(148,163,184,0.55)",
    },

    semaforoRojo: {
      background: "#ef4444",
      boxShadow: "0 0 10px rgba(239,68,68,0.75)",
    },

    puntaje: {
      color: "#ffffff",
      fontSize: "10px",
      fontWeight: 900,
    },

    nota: {
      marginTop: "14px",
      border: "1px solid rgba(255, 209, 102, 0.24)",
      background: "rgba(255, 209, 102, 0.08)",
      borderRadius: "14px",
      padding: "12px",
      color: "#ffe7a3",
      fontSize: "12px",
      lineHeight: 1.5,
    },

    matriz: {
      marginTop: "16px",
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
      gap: "10px",
    },

    matrizCard: {
      border: "1px solid rgba(0, 210, 255, 0.16)",
      background:
        "linear-gradient(180deg, rgba(12, 30, 50, 0.82), rgba(7, 18, 32, 0.82))",
      borderRadius: "14px",
      padding: "12px",
    },

    matrizTitulo: {
      margin: "0 0 6px 0",
      color: "#00e5ff",
      fontSize: "12px",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },

    matrizTexto: {
      margin: 0,
      color: "#a9c6d8",
      fontSize: "11px",
      lineHeight: 1.5,
    },
  };

  const estiloBotonFiltro = (activo) => {
    return activo
      ? { ...estilos.botonFiltro, ...estilos.botonFiltroActivo }
      : estilos.botonFiltro;
  };

  const estiloChipEstado = (estado) => {
    if (estado === "activo") {
      return { ...estilos.chip, ...estilos.chipActivo };
    }

    if (estado === "pendiente") {
      return { ...estilos.chip, ...estilos.chipPendiente };
    }

    return estilos.chip;
  };

  const estiloSemaforo = (semaforo) => {
    const base = estilos.semaforoPunto;

    if (semaforo === "verde") {
      return { ...base, ...estilos.semaforoVerde };
    }

    if (semaforo === "amarillo") {
      return { ...base, ...estilos.semaforoAmarillo };
    }

    if (semaforo === "azul") {
      return { ...base, ...estilos.semaforoAzul };
    }

    if (semaforo === "rojo") {
      return { ...base, ...estilos.semaforoRojo };
    }

    return { ...base, ...estilos.semaforoGris };
  };

  const renderSemaforo = (metodo) => {
    return (
      <div style={estilos.semaforoWrap}>
        <span style={estiloSemaforo(metodo.semaforo)} />
        <span style={estilos.chip}>
          {metodo.estadoCompetencia || "sin evaluar"}
        </span>
        <span style={estilos.puntaje}>
          {metodo.puntajeCompetencia ?? "—"} / 100
        </span>
      </div>
    );
  };

  const renderRequiere = (requiere = []) => {
    if (!Array.isArray(requiere) || requiere.length === 0) {
      return <span style={estilos.chip}>sin requisitos definidos</span>;
    }

    return requiere.map((item) => (
      <span key={item} style={estilos.chip}>
        {item}
      </span>
    ));
  };

  const obtenerTcMetodo = (metodo) => {
  const normalizarTexto = (valor) =>
    String(valor ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

  const extraerNumero = (valor) => {
    if (Number.isFinite(Number(valor))) return Number(valor);

    if (valor && typeof valor === "object") {
      return (
        Number(valor.tc) ||
        Number(valor.tc_min) ||
        Number(valor.Tc) ||
        Number(valor.TC) ||
        Number(valor.valor) ||
        Number(valor.resultado) ||
        Number(valor.r) ||
        Number(valor.value) ||
        Number(valor.min) ||
        null
      );
    }

    return null;
  };

  const bruto = hidrologiaActiva.tc_metodos;

  if (!bruto) return null;

  let candidatos = [];

  if (Array.isArray(bruto)) {
    candidatos = bruto;
  } else if (Array.isArray(bruto?.metodos)) {
    candidatos = bruto.metodos;
  } else if (Array.isArray(bruto?.resultados)) {
    candidatos = bruto.resultados;
  } else if (Array.isArray(bruto?.items)) {
    candidatos = bruto.items;
  } else if (typeof bruto === "object") {
    candidatos = Object.entries(bruto).map(([clave, valor]) => ({
      clave,
      ...(valor && typeof valor === "object" ? valor : { valor }),
    }));
  }

  const nombreCatalogo = normalizarTexto(metodo.nombre);

  const match = candidatos.find((m) => {
    const nombreDato = normalizarTexto(
      m?.nombre ??
        m?.metodo ??
        m?.label ??
        m?.name ??
        m?.m ??
        m?.id ??
        m?.clave
    );

    return (
      nombreDato.includes(nombreCatalogo) ||
      nombreCatalogo.includes(nombreDato)
    );
  });

  if (!match) return null;

  return extraerNumero(match);
};

const obtenerResultadoQMetodo = (metodo) => {
  const normalizarTexto = (valor) =>
    String(valor ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

  const extraerNumero = (objeto, claves = []) => {
    for (const clave of claves) {
      const valor = objeto?.[clave];

      if (Number.isFinite(Number(valor))) {
        return Number(valor);
      }
    }

    return null;
  };

  const bruto = contextoBase?.hidrogramas;

  if (!bruto) {
    return {
      Qp: null,
      Tp: null,
      volumen: null,
      disponible: false,
    };
  }

  const candidatos = Array.isArray(bruto)
    ? bruto
    : Array.isArray(bruto?.metodos)
    ? bruto.metodos
    : Array.isArray(bruto?.resultados)
    ? bruto.resultados
    : bruto && typeof bruto === "object"
    ? Object.entries(bruto)
        .filter(([, v]) => v && typeof v === "object")
        .map(([clave, valor]) => ({
          ...valor,
          metodo: valor?.metodo ?? valor?.nombre ?? clave,
          nombre: valor?.nombre ?? valor?.metodo ?? clave,
        }))
    : [];

  const nombreCatalogo = normalizarTexto(metodo.nombre);

  const match = candidatos.find((h) => {
    const nombreDato = normalizarTexto(
      h?.metodo ??
        h?.nombre ??
        h?.label ??
        h?.name ??
        h?.id
    );

    return (
      nombreDato.includes(nombreCatalogo) ||
      nombreCatalogo.includes(nombreDato)
    );
  });

  if (!match) {
    return {
      Qp: null,
      Tp: null,
      volumen: null,
      disponible: false,
    };
  }

  return {
    Qp: extraerNumero(match, ["Qp", "qp", "Qpico", "qPico", "q_pico", "caudalPico", "caudal_pico"]),
    Tp: extraerNumero(match, ["Tp", "tp", "tPico", "TPico", "t_pico", "tiempoPico", "tiempo_pico"]),
    volumen: extraerNumero(match, ["volumen", "V", "vol", "volume", "volTotal", "vol_total", "volumenTotal"]),
    disponible: true,
  };
};

  const obtenerAuditoriaPendienteMetodo = (metodo) => {
    if (metodo.tipo !== "tc") return null;

    return obtenerAuditoriaPendienteTc(metodo.id);
  };

  const renderVariablesSalida = (variablesSalida = []) => {
    if (!Array.isArray(variablesSalida) || variablesSalida.length === 0) {
      return <span style={estilos.chip}>Tc / Tr</span>;
    }

    return variablesSalida.map((item) => (
      <span key={item} style={estilos.chip}>
        {item}
      </span>
    ));
  };

  const renderTabla = (titulo, tipo) => {


  // OT-0067 — Adaptador de coherencia hidrológica (encapsulado)
const clasificarCoherencia = (metodo) => {
  // OT-0067 — Adaptador de coherencia hidrológica
  const tpRaw = metodo?.tPico ?? metodo?.tp ?? metodo?.Tp;
  const tp = Number(String(tpRaw ?? "").replace(/[^\d.]/g, ""));

  const tcRaw = contextoBase?.tc_global ?? contextoBase?.tc ?? contextoBase?.tcMin ?? 0;
  const tc = Number(String(tcRaw ?? "").replace(/[^\d.]/g, ""));

  const nombre = String(
    metodo?.nombre ??
    metodo?.metodo ??
    metodo?.label ??
    ""
  ).toLowerCase();

  // Regla explícita de seguridad por método crítico identificado en OT-0067
  if (nombre.includes("williams") || nombre.includes("hann")) {
    return { etiqueta: "No coherente", color: "#dc2626" };
  }

  if (!Number.isFinite(tp) || !Number.isFinite(tc) || tc === 0) {
    return { etiqueta: "No evaluado", color: "#64748b" };
  }

  const relacion = tp / tc;

  if (relacion < 0.20) {
    return { etiqueta: "No coherente", color: "#dc2626" };
  }

  if (nombre.includes("scs")) {
    return { etiqueta: "Principal", color: "#16a34a" };
  }

  if (nombre.includes("snyder")) {
    return { etiqueta: "Coherente", color: "#22c55e" };
  }

  if (nombre.includes("clark")) {
    return { etiqueta: "Referencial", color: "#f59e0b" };
  }

  return { etiqueta: "Evaluar", color: "#64748b" };
};

const datos = metodos.filter((metodo) => metodo.tipo === tipo);

// OT-0067C — Evaluación global de coherencia
const resumenCoherencia = metodos.map((m) => {
  const r = clasificarCoherencia(m);
  return r?.etiqueta ?? "No evaluado";
});

let estadoGlobal = {
  etiqueta: "Evaluar",
  color: "#64748b"
};

if (resumenCoherencia.includes("No coherente")) {
  estadoGlobal = {
    etiqueta: "No coherente",
    color: "#dc2626"
  };
} else if (resumenCoherencia.includes("Referencial")) {
  estadoGlobal = {
    etiqueta: "Con advertencias",
    color: "#f59e0b"
  };
} else if (
  resumenCoherencia.length > 0 &&
  resumenCoherencia.every((x) => x === "Principal" || x === "Coherente")
) {
  estadoGlobal = {
    etiqueta: "Coherente",
    color: "#16a34a"
  };
}

const bloqueoAdopcionLocal = estadoGlobal.etiqueta === "No coherente";
bloqueoAdopcion = bloqueoAdopcionLocal;


// ✅ OT-0067E — utilidades de bloqueo seguras
const aplicarBloqueo = (baseStyle = {}) => ({
  ...baseStyle,
  opacity: bloqueoAdopcion ? 0.5 : 1,
  cursor: bloqueoAdopcion ? "not-allowed" : "pointer"
});

const handleClickSeguro = (accion) => () => {
  if (!bloqueoAdopcion) accion();
};

    return (
      <section style={estilos.bloque}>
        <section
  style={{
    border: `1px solid ${estadoGlobal.color}`,
    borderRadius: 12,
    padding: 10,
    margin: "10px 0",
    background: "rgba(15,23,42,0.5)"
  }}
>
  <strong>Estado global del modelo:</strong>{" "}
  <span
    style={{
      padding: "2px 8px",
      borderRadius: 6,
      background: estadoGlobal.color,
      color: "#fff",
      marginLeft: 6,
      fontSize: "12px"
    }}
  >
    {estadoGlobal.etiqueta}
  </span>

  <div style={{ fontSize: "12px", opacity: 0.7, marginTop: 4 }}>
    Evaluación basada en coherencia Tc–Tp–Qp–Volumen.
  </div>
</section>
        <h2 style={estilos.bloqueTitulo}>{titulo}</h2>

        <div style={estilos.tablaWrap}>
          <table style={estilos.tabla}>
            <thead>
              <tr>
                <th style={estilos.th}>Método</th>
                <th style={estilos.th}>Estado</th>
                <th style={estilos.th}>Competencia</th>
                <th style={estilos.th}>Escala</th>
                <th style={estilos.th}>Requiere</th>
                <th style={estilos.th}>Salida</th>
                <th style={estilos.th}>Tc calculado (min)</th>
                <th style={estilos.th}>Pendiente auditada</th>
                <th style={estilos.th}>Qp</th>
                <th style={estilos.th}>Tp</th>
                <th style={estilos.th}>Volumen</th>
                <th style={estilos.th}>Observación técnica</th>
              </tr>
            </thead>

            <tbody>
              {datos.map((metodo) => (
                <tr key={metodo.id}>
                  <td style={estilos.td}>
                    <div style={estilos.nombreMetodo}>{metodo.nombre}</div>
                    <div style={{ color: "#88a7bd", marginTop: "4px" }}>
                      {metodo.descripcion}
                    </div>
                  </td>

                  <td style={estilos.td}>
                    <span style={estiloChipEstado(metodo.estadoImplementacion)}>
                      {metodo.estadoImplementacion}
                    </span>
                    <span style={estilos.chip}>{metodo.bloque}</span>
                  </td>

                  <td style={estilos.td}>
                    {renderSemaforo(metodo)}

                   <div style={{ marginTop: "6px", color: "#88a7bd" }}>
                     Catálogo: {metodo.competencia}
                   </div>
                  </td>

                  <td style={estilos.td}>{metodo.escala}</td>

                  <td style={estilos.td}>{renderRequiere(metodo.requiere)}</td>

                  <td style={estilos.td}>
                    {renderVariablesSalida(metodo.variablesSalida)}
                  </td>

                  <td style={estilos.td}>
                    {(() => {
                      const tcValor = obtenerTcMetodo(metodo);

                      if (!Number.isFinite(tcValor)) {
                        return <span style={estilos.chip}>—</span>;
                    }

                      return (
                        <span style={estilos.chip}>
                          {formatTc(tcValor)} min
                        </span>
                      );
                    })()}
                 </td>

                 <td style={estilos.td}>
  {(() => {
    const auditoriaPendiente = obtenerAuditoriaPendienteMetodo(metodo);

    if (!auditoriaPendiente) {
      return <span style={estilos.chip}>—</span>;
    }

    return (
      <div>
        <span style={estilos.chip}>
          {auditoriaPendiente.pendienteEsperada}
        </span>

        <div
          style={{
            marginTop: "6px",
            color: "#88a7bd",
            fontSize: "10px",
            lineHeight: 1.45,
          }}
        >
          {auditoriaPendiente.descripcionPendiente}
        </div>
      </div>
    );
  })()}
</td>

                 <td style={estilos.td}>
  {(() => {
    if (metodo.tipo !== "q") {
      return <span style={estilos.chip}>—</span>;
    }

    const resultadoQ = obtenerResultadoQMetodo(metodo);

    if (!Number.isFinite(resultadoQ.Qp)) {
      return <span style={estilos.chip}>—</span>;
    }

    return (
      <span style={estilos.chip}>
        {formatQ(resultadoQ.Qp)} m³/s
      </span>
    );
  })()}
</td>

<td style={estilos.td}>
  {(() => {
    if (metodo.tipo !== "q") {
      return <span style={estilos.chip}>—</span>;
    }

    const resultadoQ = obtenerResultadoQMetodo(metodo);

    if (!Number.isFinite(resultadoQ.Tp)) {
      return <span style={estilos.chip}>—</span>;
    }

    const tcReferencia = Number(Tc_final);
    const tpRel =
      Number.isFinite(tcReferencia) && tcReferencia > 0
        ? resultadoQ.Tp / tcReferencia
        : null;

    const alertaTcTp =
      tpRel !== null && (tpRel < 0.5 || tpRel > 1.5);

    const estadoTemporal =
      tpRel === null
        ? "sin referencia temporal"
        : tpRel < 0.5
        ? "respuesta rápida"
        : tpRel <= 1.5
        ? "rango temporal razonable"
        : "respuesta retardada";

    return (
      <div>
        <span style={estilos.chip}>
          {formatTc(resultadoQ.Tp)} min
        </span>
        <div style={{ ...estilos.muted, marginTop: "4px" }}>
          Tp/Tc: {tpRel !== null ? formatTc(tpRel) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? formatTc(resultadoQ.volumen / resultadoQ.Qp / 60) + " min" : "—"}
        </div>
        <div style={{ ...estilos.muted, marginTop: "4px" }}>
          Estado temporal: {estadoTemporal}
        </div>
        <div style={{ ...estilos.muted, marginTop: "4px" }}>
          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
            ? `candidato principal; volumen en escala; ${estadoTemporal}.`
            : metodo.nombre?.includes("SCS Mod")
            ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
            : metodo.nombre?.includes("Snyder")
            ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
            : metodo.nombre?.includes("Williams")
            ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
            : metodo.nombre?.includes("Clark")
            ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
            : `método comparativo; ${estadoTemporal}.`}
        </div>
        {alertaTcTp ? (
          <div style={{ ...estilos.muted, marginTop: "4px" }}>
            ⚠ Alerta Tc/Tp
          </div>
        ) : null}
      </div>
    );
  })()}
</td>

<td style={estilos.td}>
  {(() => {
    if (metodo.tipo !== "q") {
      return <span style={estilos.chip}>—</span>;
    }

    const resultadoQ = obtenerResultadoQMetodo(metodo);

    if (!Number.isFinite(resultadoQ.volumen)) {
      return <span style={estilos.chip}>—</span>;
    }

    const areaKm2 = Number(
  contextoBase?.casoActivo?.cuenca?.area_km2 ??
  contextoBase?.area_km2
);
    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
    const volumenEsperadoM3 =
      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
        ? areaKm2 * peTotalMm * 1000
        : null;

    const relacionVolumen =
      volumenEsperadoM3 && volumenEsperadoM3 > 0
        ? resultadoQ.volumen / volumenEsperadoM3
        : null;

    const estadoEscalaVolumen =
      relacionVolumen === null
        ? null
        : relacionVolumen <= 2
        ? "escala razonable"
        : relacionVolumen <= 10
        ? "revisar escala"
        : "fuera de escala";

    return (
      <div>
        <span style={estilos.chip}>
          {formatVolumen(resultadoQ.volumen)}
        </span>
        {estadoEscalaVolumen ? (
          <div style={{ ...estilos.muted, marginTop: "4px" }}>
            {estadoEscalaVolumen} · {formatTc(relacionVolumen)}x
          </div>
        ) : null}
      </div>
    );
  })()}
</td>


                  <td style={estilos.td}>
                   <div
                     style={{
                     borderLeft: "3px solid rgba(34, 211, 238, 0.75)",
                     paddingLeft: "8px",
                     marginBottom: "8px",
                  }}
  >
                  <div
                    style={{
                      color: "#7dd3fc",
                      fontSize: "9px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "4px",
                    }}
    >
                      Justificación automática
                    </div>

                    <strong style={{ color: "#ffffff" }}>
                      {metodo.justificacionCompetencia || metodo.observacion}
                    </strong>
                  </div>

                  <div
                     style={{
                      color: "#88a7bd",
                      fontSize: "10px",
                      lineHeight: 1.45,
                    }}
  >
                    <strong>Catálogo técnico:</strong> {metodo.observacion}
                  </div>
                </td>
                </tr>
              ))}

              {datos.length === 0 && (
                <tr>
                  <td style={estilos.td} colSpan={12}>
                    No hay métodos para el filtro seleccionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

  return (
    <main style={estilos.pagina}>
      <header style={estilos.encabezado}>
        {/* CONTEXTO HIDROLÓGICO ACTIVO */}
<section
  style={{
    border: "1px solid rgba(34, 211, 238, 0.25)",
    background: "rgba(15, 23, 42, 0.65)",
    borderRadius: "14px",
    padding: "12px 14px",
    marginBottom: "14px",
  }}
>
  <div
    style={{
      fontSize: "11px",
      color: "#7dd3fc",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: "6px",
    }}
  >
    Contexto hidrológico activo
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "8px 14px",
      fontSize: "12px",
      color: "#dff8ff",
    }}
  >
    <div>
      <strong>Cuenca:</strong>{" "}
      {
  contextoBase?.casoActivo?.cuenca?.nombre ??
  contextoBase?.cuencaNombre ??
  "—"
}
    </div>

    <div>
      <strong>Área:</strong>{" "}
      {Number.isFinite(contextoBase?.area_km2)
        ? `${formatArea(cuencaActiva.area_km2)} km²`
        : "—"}
    </div>

    <div>
      <strong>Scp cauce principal:</strong>{" "}
      {Number.isFinite(contextoBase?.pendiente_media_pct)
        ? `${formatPendiente(cuencaActiva.pendiente_media_pct)} %`
        : "—"}
    </div>

    <div>
      <strong>Longitud cauce:</strong>{" "}
      {Number.isFinite(
  contextoBase?.casoActivo?.cuenca?.longitud_cauce_km ??
  contextoBase?.longitud_cauce_km
)
        ? `${cuencaActiva.longitud_cauce_km} km`
        : "—"}
    </div>

    <div>
      <strong>CN:</strong>{" "}
      {Number.isFinite(hidrologiaActiva.CN)
        ? formatCN(hidrologiaActiva.CN)
        : "—"}
    </div>

    <div>
      <strong>CN base:</strong>{" "}
      {Number.isFinite(hidrologiaActiva.CN_base)
        ? formatCN(hidrologiaActiva.CN_base)
        : "—"}
    </div>

    <div>
      <strong>CN efectivo:</strong>{" "}
      {Number.isFinite(hidrologiaActiva.CN_efectivo)
        ? formatCN(hidrologiaActiva.CN_efectivo)
        : "—"}
    </div>

    <div>
      <strong>AMC:</strong>{" "}
      {hidrologiaActiva.AMC ?? "—"}
    </div>

    <div>
      <strong>Fuente:</strong>{" "}
      <span style={{ color: "#22c55e", fontWeight: 800 }}>
        {fuenteContexto}
      </span>
    </div>
  </div>
</section>

{/* CONCEPTO TÉCNICO DE CUENCA */}
<section
  style={{
    border: "1px solid rgba(34, 211, 238, 0.22)",
    background: "rgba(8, 47, 73, 0.28)",
    borderRadius: "14px",
    padding: "12px 14px",
    marginBottom: "14px",
  }}
>
  <div
    style={{
      fontSize: "11px",
      color: "#7dd3fc",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: "8px",
    }}
  >
    Concepto técnico de cuenca
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
      gap: "10px",
      fontSize: "12px",
      color: "#dff8ff",
    }}
  >
    <div>
      <strong>Escala por área:</strong>{" "}
      <span style={{ color: "#22c55e", fontWeight: 800 }}>
        {conceptoCuenca.area.etiqueta}
      </span>
      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
        {conceptoCuenca.area.descripcion}
      </div>
    </div>

    <div>
      <strong>Clasificación por pendiente:</strong>{" "}
      <div style={{ color: "#ffe7a3", marginTop: "4px", lineHeight: 1.45 }}>
        Criterio actual basado en Scp mientras se incorpora Sc de cuenca.
      </div>
      <span style={{ color: "#38bdf8", fontWeight: 800 }}>
        {conceptoCuenca.pendiente.etiqueta}
      </span>
      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
        {conceptoCuenca.pendiente.descripcion}
      </div>
    </div>

    <div>
      <strong>Forma hidrológica:</strong>{" "}
      <span style={{ color: "#facc15", fontWeight: 800 }}>
        {conceptoCuenca.forma.etiqueta}
      </span>
      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
        {conceptoCuenca.forma.descripcion}
      </div>
    </div>
  </div>

  {conceptoCuenca.advertencias.length > 0 && (
    <div
      style={{
        marginTop: "10px",
        borderTop: "1px solid rgba(34, 211, 238, 0.18)",
        paddingTop: "8px",
      }}
    >
      {conceptoCuenca.advertencias.map((advertencia, index) => (
        <div
          key={`advertencia-cuenca-${index}`}
          style={{
            color: "#ffe7a3",
            fontSize: "11px",
            marginTop: "4px",
            lineHeight: 1.45,
          }}
        >
          ⚠ {advertencia}
        </div>
      ))}
    </div>
  )}
</section>

        <div>
          <h1 style={estilos.titulo}>
            Comparador Hidrológico Multi-Método
          </h1>

          <p style={estilos.subtitulo}>
            Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
            tiempos de respuesta, caudales pico e hidrogramas. Este módulo no
            adopta automáticamente resultados; organiza sensibilidad, competencia
            y trazabilidad para soporte de expediente técnico.
          </p>
        </div>

        <div style={estilos.version}>
           {resumenComparadorCatalogo.version} · Fuente: {fuenteContexto}
        </div>
      </header>

      <section style={estilos.gridResumen}>
        <div style={estilos.tarjetaResumen}>
          <p style={estilos.numeroResumen}>{conteo.total}</p>
          <p style={estilos.etiquetaResumen}>Métodos visibles</p>
        </div>

        <div style={estilos.tarjetaResumen}>
          <p style={estilos.numeroResumen}>{conteo.tc}</p>
          <p style={estilos.etiquetaResumen}>Métodos Tc</p>
        </div>

        <div style={estilos.tarjetaResumen}>
          <p style={estilos.numeroResumen}>{conteo.q}</p>
          <p style={estilos.etiquetaResumen}>Métodos Q</p>
        </div>

        <div style={estilos.tarjetaResumen}>
          <p style={estilos.numeroResumen}>{conteo.activos}</p>
          <p style={estilos.etiquetaResumen}>Activos</p>
        </div>

        <div style={estilos.tarjetaResumen}>
          <p style={estilos.numeroResumen}>{conteo.pendientes}</p>
          <p style={estilos.etiquetaResumen}>Pendientes</p>
        </div>
      </section>

      <section style={estilos.controles}>

  <button
    type="button"
    style={{
      ...estiloBotonFiltro(filtroEstado === "todos"),
      opacity: bloqueoAdopcion ? 0.5 : 1,
      cursor: bloqueoAdopcion ? "not-allowed" : "pointer"
    }}
    onClick={() => {
      if (!bloqueoAdopcion) setFiltroEstado("todos");
    }}
    disabled={bloqueoAdopcion}
    title={bloqueoAdopcion ? "Bloqueado por incoherencia hidrológica" : ""}
  >
    Todos
  </button>

  <button
    type="button"
    style={{
      ...estiloBotonFiltro(filtroEstado === "activo"),
      opacity: bloqueoAdopcion ? 0.5 : 1,
      cursor: bloqueoAdopcion ? "not-allowed" : "pointer"
    }}
    onClick={() => {
      if (!bloqueoAdopcion) setFiltroEstado("activo");
    }}
    disabled={bloqueoAdopcion}
    title={bloqueoAdopcion ? "Bloqueado por incoherencia hidrológica" : ""}
  >
    Activos
  </button>

  <button
    type="button"
    style={{
      ...estiloBotonFiltro(filtroEstado === "pendiente"),
      opacity: bloqueoAdopcion ? 0.5 : 1,
      cursor: bloqueoAdopcion ? "not-allowed" : "pointer"
    }}
    onClick={() => {
      if (!bloqueoAdopcion) setFiltroEstado("pendiente");
    }}
    disabled={bloqueoAdopcion}
    title={bloqueoAdopcion ? "Bloqueado por incoherencia hidrológica" : ""}
  >
    Pendientes
  </button>

  <button
    type="button"
    style={{
      ...estiloBotonFiltro(filtroTipo === "todos"),
      opacity: bloqueoAdopcion ? 0.5 : 1,
      cursor: bloqueoAdopcion ? "not-allowed" : "pointer"
    }}
    onClick={() => {
      if (!bloqueoAdopcion) setFiltroTipo("todos");
    }}
    disabled={bloqueoAdopcion}
    title={bloqueoAdopcion ? "Bloqueado por incoherencia hidrológica" : ""}
  >
    Tc + Q
  </button>

  <button
    type="button"
    style={{
      ...estiloBotonFiltro(filtroTipo === "tc"),
      opacity: bloqueoAdopcion ? 0.5 : 1,
      cursor: bloqueoAdopcion ? "not-allowed" : "pointer"
    }}
    onClick={() => {
      if (!bloqueoAdopcion) setFiltroTipo("tc");
    }}
    disabled={bloqueoAdopcion}
    title={bloqueoAdopcion ? "Bloqueado por incoherencia hidrológica" : ""}
  >
    Solo Tc
  </button>

  <button
    type="button"
    style={{
      ...estiloBotonFiltro(filtroTipo === "q"),
      opacity: bloqueoAdopcion ? 0.5 : 1,
      cursor: bloqueoAdopcion ? "not-allowed" : "pointer"
    }}
    onClick={() => {
      if (!bloqueoAdopcion) setFiltroTipo("q");
    }}
    disabled={bloqueoAdopcion}
    title={bloqueoAdopcion ? "Bloqueado por incoherencia hidrológica" : ""}
  >
    Solo Q
  </button>

</section>

      <section style={estilos.matriz}>
        <article style={estilos.matrizCard}>
          <h3 style={estilos.matrizTitulo}>Regla de adopción</h3>
          <p style={estilos.matrizTexto}>
            Muchos métodos para sensibilidad; pocos métodos para adopción. La
            selección final requiere criterio técnico explícito.
          </p>
        </article>

        <article style={estilos.matrizCard}>
          <h3 style={estilos.matrizTitulo}>Competencia</h3>
          <p style={estilos.matrizTexto}>
            Cada método se clasifica como principal, alterno, referencial,
            condicionado o pendiente según escala, insumos y finalidad.
          </p>
        </article>

        <article style={estilos.matrizCard}>
          <h3 style={estilos.matrizTitulo}>Trazabilidad</h3>
          <p style={estilos.matrizTexto}>
            El comparador debe conservar insumos, supuestos, método, resultado,
            advertencias y justificación de adopción o descarte.
          </p>
        </article>
      </section>

      <div style={estilos.nota}>
  <strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
  HidroFlow a partir de los hidrogramas calculados. El comparador no recalcula
  hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
  automáticamente ningún método. La adopción final requiere criterio técnico,
  competencia hidrológica y trazabilidad explícita.
</div>

<div
  style={{
    marginTop: "12px",
    border: "1px solid rgba(239, 68, 68, 0.35)",
    background: "rgba(127, 29, 29, 0.18)",
    borderRadius: "14px",
    padding: "12px",
    color: "#fecaca",
    fontSize: "12px",
    lineHeight: 1.5,
  }}
>
  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
  En particular, debe verificarse la relación Tc vs Tp, las unidades de
  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  internos de cada hidrograma unitario. Los resultados se muestran como
  lectura del motor HidroFlow, no como valores adoptados.
</div>

      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}

      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
      </div>
      <button
        type="button"
        onClick={() => {
          const textoResumenQ5 = [
            "# Resumen técnico Q-5 post auditoría",
            "",
            "Estado general: diagnóstico no adoptivo.",
            "",
            "Síntesis:",
            "- SCS Unit Hydrograph: candidato principal de referencia.",
            "- SCS Mod.: variante ajustable.",
            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
            "- Masa y volumen: controlados frente a la referencia física.",
            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
            "",
            "Restricciones:",
            "- No se usaron caudales externos como fundamento.",
            "- No se usó SIATA para justificar caudales.",
            "- No se modifica el motor hidrológico.",
            "- No se recalculan hidrogramas.",
            "- No se alteran Qp, Tp, Volumen ni Q(t).",
            "",
            "## 9. Sello técnico de generación",
            "Herramienta: HidroFlow.",
            "Tipo de salida: Expediente hidrológico mínimo.",
            `Cuenca activa: ${
  contextoBase?.casoActivo?.cuenca?.nombre ??
  contextoBase?.cuencaNombre ??
  "Cuenca activa"
}.`,
            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
          ].join("\n");

          const areaTextoResumen = document.createElement("textarea");
          areaTextoResumen.value = textoResumenQ5;
          areaTextoResumen.setAttribute("readonly", "");
          areaTextoResumen.style.position = "fixed";
          areaTextoResumen.style.left = "-9999px";
          areaTextoResumen.style.top = "-9999px";
          document.body.appendChild(areaTextoResumen);
          areaTextoResumen.focus();
          areaTextoResumen.select();

          let resumenCopiado = false;

          try {
            resumenCopiado = document.execCommand("copy");
          } catch {
            resumenCopiado = false;
          }

          document.body.removeChild(areaTextoResumen);

          if (resumenCopiado) {
            window.alert("Resumen técnico Q-5 copiado al portapapeles.");
          } else {
            window.prompt("No fue posible copiar automáticamente. Copie manualmente el resumen técnico Q-5:", textoResumenQ5);
          }
        }}
        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px" }}
      >
        Copiar resumen técnico Q-5
      </button>
      <button
        type="button"
        onClick={async () => {
          const areaKm2 = Number(
  contextoBase?.casoActivo?.cuenca?.area_km2 ??
  contextoBase?.area_km2
);
          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
          const volumenEsperadoM3 =
            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
              ? areaKm2 * peTotalMm * 1000
              : null;

          const formatearNumeroExpediente = (valor, decimales = 2) => {
            if (valor === null || valor === undefined || valor === "") {
              return "—";
            }

            const numero = Number(valor);

            return Number.isFinite(numero)
              ? numero.toLocaleString("es-CO", {
                  minimumFractionDigits: decimales,
                  maximumFractionDigits: decimales
                })
              : "—";
          };

          const obtenerEstadoTemporalExpediente = (resultadoQ) => {
            const tcReferencia = Number(Tc_final);
            const tpRel =
              Number.isFinite(resultadoQ?.Tp) &&
              Number.isFinite(tcReferencia) &&
              tcReferencia > 0
                ? resultadoQ.Tp / tcReferencia
                : null;

            return tpRel === null
              ? "sin referencia temporal"
              : tpRel < 0.5
              ? "respuesta rápida"
              : tpRel <= 1.5
              ? "rango temporal razonable"
              : "respuesta retardada";
          };

          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
            metodo.nombre?.includes("SCS Unit")
              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
              : metodo.nombre?.includes("SCS Mod")
              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
              : metodo.nombre?.includes("Snyder")
              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
              : metodo.nombre?.includes("Williams")
              ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
              : metodo.nombre?.includes("Clark")
              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
              : `método comparativo; ${estadoTemporal}.`;

          const metodosQ5Expediente = metodos.filter(
            (metodo) =>
              metodo.tipo === "q" &&
              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
          );

          const obtenerMetodosQ5Validos = () => {
            const filtroNumericoQ5 = (m) =>
              Number.isFinite(Number(m.Qp)) &&
              Number.isFinite(Number(m.Tp)) &&
              Number.isFinite(Number(m.volumen));

            const desdeCatalogo = metodosQ5Expediente
              .map((metodo) => {
                const resultadoQ = obtenerResultadoQMetodo(metodo);
                return {
                  metodo: metodo?.nombre ?? metodo?.metodo ?? "Método Q-5",
                  Qp: resultadoQ?.Qp,
                  Tp: resultadoQ?.Tp,
                  volumen: resultadoQ?.volumen,
                  _catalogo: metodo
                };
              })
              .filter(filtroNumericoQ5);

            if (desdeCatalogo.length > 0) {
              return desdeCatalogo;
            }

            const fuentes = [
              contextoBase?.hidrogramas_resumen,
              contextoBase?.hidrogramas?.resultados,
              contextoBase?.hidrogramas
            ];

            for (const fuente of fuentes) {
              const candidatos = Array.isArray(fuente)
                ? fuente
                : fuente && typeof fuente === "object"
                ? Object.entries(fuente)
                    .filter(([, v]) => v && typeof v === "object")
                    .map(([clave, valor]) => ({
                      ...valor,
                      metodo: valor?.metodo ?? valor?.nombre ?? clave,
                    }))
                : [];

              const resultados = candidatos
                .map((h) => ({
                  metodo:
                    h?.metodo ??
                    h?.nombre ??
                    h?.label ??
                    h?.name ??
                    h?.clave ??
                    "Método Q-5",
                  Qp:
                    h?.Qp ?? h?.qp ?? h?.Qpico ?? h?.qPico ?? h?.q_pico ?? h?.caudalPico ?? h?.caudal_pico,
                  Tp:
                    h?.Tp ?? h?.tp ?? h?.tPico ?? h?.TPico ?? h?.t_pico ?? h?.tiempoPico ?? h?.tiempo_pico,
                  volumen:
                    h?.volumen ?? h?.V ?? h?.vol ?? h?.volume ?? h?.volTotal ?? h?.vol_total ?? h?.volumenTotal
                }))
                .filter(filtroNumericoQ5);

              if (resultados.length > 0) {
                return resultados;
              }
            }

            return [];
          };

          const obtenerCandidatosQ5Contexto = () => {
            const bruto = contextoBase?.hidrogramas;

            return Array.isArray(bruto)
              ? bruto
              : Array.isArray(bruto?.metodos)
              ? bruto.metodos
    : Array.isArray(bruto?.resultados)
      ? bruto.resultados
      : bruto && typeof bruto === "object"
      ? Object.entries(bruto)
          .filter(([, v]) => v && typeof v === "object")
          .map(([clave, valor]) => ({
            ...valor,
            metodo: valor?.metodo ?? valor?.nombre ?? clave,
            nombre: valor?.nombre ?? valor?.metodo ?? clave,
          }))
      : [];
          };

          const construirFilaQ5Expediente = (nombreMetodo, resultadoQ, dictamenMetodo = null) => {
            const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
            const dictamen =
              dictamenMetodo ??
              obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);

            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
          };

          const metodosQ5ValidosParaExpediente = obtenerMetodosQ5Validos();

          const filasQ5Markdown = metodosQ5ValidosParaExpediente
            .map((m) =>
              construirFilaQ5Expediente(
                String(m.metodo ?? "Método Q-5").replaceAll("|", "/"),
                { Qp: m.Qp, Tp: m.Tp, volumen: m.volumen },
                m._catalogo
                  ? obtenerDictamenQ5Expediente(m._catalogo, obtenerEstadoTemporalExpediente({ Qp: m.Qp, Tp: m.Tp, volumen: m.volumen }))
                  : null
              )
            );

          const tablaQ5Markdown = [
            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
            "|---|---:|---:|---:|---|---|",
            ...filasQ5Markdown
          ];
          const estacionIdfExpediente = [
            contextoBase?.estacion_idf,
            contextoBase?.estacionIDF,
            contextoBase?.estacion,
            contextoBase?.nombre_estacion,
            contextoBase?.idf?.nombre,
            contextoBase?.idf?.estacion
          ]
            .map((valor) => String(valor ?? "").trim())
            .find((valor) => valor && valor !== "—") ?? "SAN CRISTOBAL";
          const faltantesExpediente = [];

          if (!estacionIdfExpediente) {
            faltantesExpediente.push("Estación IDF");
          }

          if (!Number.isFinite(areaKm2)) {
            faltantesExpediente.push("Área de cuenca");
          }

          if (!Number.isFinite(peTotalMm)) {
            faltantesExpediente.push("Lluvia efectiva total");
          }

          if (!Number.isFinite(volumenEsperadoM3)) {
            faltantesExpediente.push("Volumen esperado");
          }

          const tieneQ5Publicado =
  Array.isArray(filasQ5Markdown) &&
  filasQ5Markdown.length > 0;

const tieneHidrogramasPublicados =
  Array.isArray(contextoBase?.hidrogramas?.resultados) &&
  contextoBase.hidrogramas.resultados.length > 0;

if (!tieneQ5Publicado && !tieneHidrogramasPublicados) {
  faltantesExpediente.push(
    "Tabla Q-5 auditada con filas reales"
  );
}

          const tieneRacionalPublicado =
  Array.isArray(contextoBase?.metodo_racional?.resultados) &&
  contextoBase.metodo_racional.resultados.length > 0;

// OT-MASTER-008
// No bloquear expediente por ausencia de publicación
// automática del módulo racional.

if (!tieneRacionalPublicado) {
  console.warn(
    "[OT-MASTER-008]",
    "Método Racional no publicado. Se mantiene expediente operativo."
  );
}

          if (faltantesExpediente.length > 0) {
            window.alert(
              [
                "Expediente hidrológico mínimo incompleto.",
                "",
                "Antes de copiar el expediente firmado, publique el contexto hidrológico completo desde Hidrogramas.",
                "",
                "Faltan:",
                ...faltantesExpediente.map((item) => `- ${item}`)
              ].join("\n")
            );

            return;
          }
          const trDisenoActivoExpediente = Number.isFinite(Number(contextoBase?.tr_diseno_activo))
            ? Number(contextoBase.tr_diseno_activo)
            : 25;
              const estadoQTrActivoExpediente = contextoBase?.q_tr_activo_estado ?? null;
              const qTrActivoExpediente = estadoQTrActivoExpediente?.q_tr_activo ?? {};
              const faltantesQTrActivoExpediente = Array.isArray(estadoQTrActivoExpediente?.campos_faltantes)
                ? estadoQTrActivoExpediente.campos_faltantes
                : [];
              const formatearValorQTrExpediente = (valor, sufijo = "", decimales = 2) => {
                if (valor === null || valor === undefined || valor === "") return "—";
                const numero = Number(valor);
                if (Number.isFinite(numero) && String(valor).trim() !== "") {
                  return numero.toLocaleString("es-CO", { maximumFractionDigits: decimales }) + sufijo;
                }
                return String(valor);
              };
              const metodoQ5PrincipalConsistencia =
                metodosQ5Expediente.find((metodo) =>
                  String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
                ) ??
                metodosQ5Expediente[0] ??
                null;
              const resultadoQ5PrincipalConsistencia = metodoQ5PrincipalConsistencia
                ? obtenerResultadoQMetodo(metodoQ5PrincipalConsistencia)
                : null;
              const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalConsistencia?.volumen);
              const relacionVolumenQ5Esperado =
                Number.isFinite(volumenQ5PrincipalM3) &&
                Number.isFinite(volumenEsperadoM3) &&
                volumenEsperadoM3 > 0
                  ? volumenQ5PrincipalM3 / volumenEsperadoM3
                  : null;
              const estadoConsistenciaVolumen =
                relacionVolumenQ5Esperado === null
                  ? "no evaluada"
                  : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
                  ? "superada"
                  : relacionVolumenQ5Esperado >= 0.80 && relacionVolumenQ5Esperado <= 1.20
                  ? "requiere revisión menor"
                  : "requiere revisión técnica";

          // OT-0087C — Sección exportable de diagnóstico temporal Q(t) no adoptivo.
          const seccionDiagnosticoTemporalQt = construirSeccionDiagnosticoTemporalQt({
            filasMorfologiaQt,
            filasDictamenFormaQt,
            filasRiesgoTemporalQt,
            sintesisRiesgoTemporalQt
          });

          // OT-0113B — Diagnóstico no invasivo del helper puro del expediente.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          let diagnosticoHelperExpediente = null;

          try {
            diagnosticoHelperExpediente = construirExpedienteHidrologicoMinimo({
              contextoBase,
              Tc_final,
              metodos,
              filasMorfologiaQt,
              filasDictamenFormaQt,
              filasRiesgoTemporalQt,
              sintesisRiesgoTemporalQt,
              fechaGeneracion: new Date().toLocaleString("es-CO"),
              versionExpediente: "expediente_hidrologico_minimo_v0_1"
            });

            if (!diagnosticoHelperExpediente?.ok) {
              console.warn(
                "Diagnóstico helper expediente no invasivo:",
                diagnosticoHelperExpediente
              );
            }
          } catch (errorDiagnosticoHelperExpediente) {
            console.warn(
              "Diagnóstico helper expediente no invasivo no ejecutado:",
              errorDiagnosticoHelperExpediente
            );
          }
          const lineasResumenQ5AuditadoDelegadoDiagnostico =
            construirLineasResumenQ5AuditadoExpediente({
              tablaQ5Markdown
            });

          const lineasResumenQ5AuditadoOperativoDiagnostico = [
            "## 6. Resumen Q-5 auditado",
            "Estado general: diagnóstico no adoptivo.",
            "SCS Unit Hydrograph: candidato principal de referencia.",
            "SCS Mod.: variante ajustable.",
            "Snyder, Williams &amp; Hann y Clark IUH: métodos comparativos/referenciales.",
            "Masa y volumen: controlados frente a referencia física.",
            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
            "",
            "Tabla Q-5 auditada:",
            ...tablaQ5Markdown,
            "",
            ""
          ];

          const hayBrechaResumenQ5AuditadoDiagnostico =
            lineasResumenQ5AuditadoDelegadoDiagnostico.length !==
              lineasResumenQ5AuditadoOperativoDiagnostico.length ||
            lineasResumenQ5AuditadoDelegadoDiagnostico.some(
              (linea, indice) =>
                linea !== lineasResumenQ5AuditadoOperativoDiagnostico[indice]
            );

          if (hayBrechaResumenQ5AuditadoDiagnostico) {
            console.warn("[expediente] Brecha diagnóstico Resumen Q-5 auditado delegado vs operativo", {
              delegado: lineasResumenQ5AuditadoDelegadoDiagnostico,
              operativo: lineasResumenQ5AuditadoOperativoDiagnostico
            });
          }

          const textoExpediente = [
            "# Expediente hidrológico mínimo — Cuenca activa",
            "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
            "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
            "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
            "",
            ...construirLineasIdentificacionExpediente({
              contextoBase,
              fuenteFallback: "HidroFlow",
              estacionIdfFallback: estacionIdfExpediente
            }),
            "",
            ...construirLineasParametrosHidrologicosBaseExpediente({
              contextoBase
            }),
            "",
            ...construirLineasTiempoConcentracionRolesTcExpediente({
              Tc_final,
              trDisenoActivoExpediente
            }),
            "",
            ...construirLineasVolumenReferenciaExpediente({
              peTotalMm,
              volumenEsperadoM3
            }),
            "",
                ...construirLineasEscenarioQTrActivoExpediente({
                  estadoQTrActivoExpediente,
                  qTrActivoExpediente,
                  faltantesQTrActivoExpediente,
                  formatearValorQTrExpediente
                }),
                "",
            ...construirLineasResumenQ5AuditadoExpediente({
              tablaQ5Markdown
            }),
            "## 7. Método Racional — contraste global independiente",
            "Uso: contraste global independiente de caudal pico.",
            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
            contextoBase.metodo_racional.resultados.length > 0
              ? [
                  `Tc racional exportado: ${
                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
                      ? formatTc(contextoBase.metodo_racional.tc_min) + " min"
                      : "—"
                  }`,
                  "",
                  "Tabla Método Racional:",
                  "| Tr | I | P | C | Q |",
                  "|---:|---:|---:|---:|---:|",
                  ...contextoBase.metodo_racional.resultados.map((r) =>
                    `| ${r.Tr} | ${formatearNumeroExpediente(r.I)} mm/h | ${formatearNumeroExpediente(r.P)} mm | ${formatearNumeroExpediente(r.C, 4)} | ${formatearNumeroExpediente(r.Q)} m³/s |`
                  )
                ]
              : [
                  "Disponibilidad: resultados no disponibles en el contexto exportable.",
                  "Estado: sección informativa; consultar módulo Método Racional."
                ]),
            "",
            "",
            "## 8. Contraste Q-5 vs Método Racional",
            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
            "",
            "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
            `Pe total: ${Number.isFinite(peTotalMm) ? peTotalMm.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + " mm" : "—"}`,
            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + " km²" : "—"}`,
            `Volumen esperado: ${Number.isFinite(volumenEsperadoM3) ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
            `Método Q-5 principal: ${metodoQ5PrincipalConsistencia?.nombre ?? "—"}`,
            `Volumen Q-5 principal: ${Number.isFinite(volumenQ5PrincipalM3) ? volumenQ5PrincipalM3.toLocaleString("es-CO", { maximumFractionDigits: 2 }) + " m³" : "—"}`,
            `Relación volumen Q-5 / volumen esperado: ${relacionVolumenQ5Esperado !== null ? formatTc(relacionVolumenQ5Esperado) + "x" : "—"}`,
            `Resultado de consistencia volumétrica: ${estadoConsistenciaVolumen}`,
            `Q-Tr activo: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
            "Q-5 auditado: presente como bloque no adoptivo.",
            "Método Racional: presente como contraste global independiente.",
            "Lectura técnica: control interno preliminar; no reemplaza revisión hidrológica profesional.",
            "",
            seccionDiagnosticoTemporalQt?.texto ?? [
              "## Diagnóstico temporal Q(t) no adoptivo",
              "",
              "No fue posible construir la sección de diagnóstico temporal Q(t).",
              "",
              "Restricción: diagnóstico no adoptivo; no selecciona método ni levanta No coherente."
            ].join("\n"),
            "",
            "## 10. Validación interna del expediente exportado",
            "Estado de validación estructural: control previo al portapapeles aplicado.",
            "Control de tokens inválidos: activo mediante validador interno del expediente copiado.",
            "Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, diagnóstico temporal Q(t), restricciones y sello técnico.",
            "Q-Tr activo: trazado desde q_tr_activo_estado y verificado como sección exportable.",
            "Q-5 auditado: presente como bloque de hidrogramas no adoptivo.",
            "Método Racional: presente como contraste global independiente.",
            "Alcance: validación estructural/exportable; no reemplaza revisión hidrológica profesional.",
            "",
            "## 11. Sello técnico de generación",
            "Herramienta: HidroFlow.",
            "Tipo de salida: Expediente hidrológico mínimo.",
            ...(diagnosticoHelperExpediente?.metadata
              ? construirLineasSelloTecnicoAuxiliarExpediente({
                  metadata: diagnosticoHelperExpediente.metadata
                })
              : ["Versión auxiliar helper expediente: no integrada."]),
            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional.",
            "",
            "## 12. Restricciones y advertencias técnicas",
            "- No se usaron caudales externos como fundamento.",
            "- No se usó SIATA para justificar caudales.",
            "- No se modifica el motor hidrológico.",
            "- No se recalculan hidrogramas en este expediente.",
            "- No se alteran Qp, Tp, Volumen ni Q(t).",
            "",
          ].join("\n");
          // OT-0166 — Diagnóstico no invasivo del bloque Escenario Q-Tr activo delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasEscenarioQTrActivoDelegadasDiagnostico =
              construirLineasEscenarioQTrActivoExpediente({
                estadoQTrActivoExpediente,
                qTrActivoExpediente,
                faltantesQTrActivoExpediente,
                formatearValorQTrExpediente
              });

            const textoEscenarioQTrActivoDelegadoDiagnostico =
              Array.isArray(lineasEscenarioQTrActivoDelegadasDiagnostico)
                ? lineasEscenarioQTrActivoDelegadasDiagnostico.join("\n")
                : "";

            const diagnosticoEscenarioQTrActivoDelegado = {
              lineasDelegadas: Array.isArray(lineasEscenarioQTrActivoDelegadasDiagnostico)
                ? lineasEscenarioQTrActivoDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
              delegadoContieneEstado:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Estado:"),
              operativoContieneEstado:
                textoExpediente.includes("Estado:"),
              delegadoContieneTrActivo:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Tr activo:"),
              operativoContieneTrActivo:
                textoExpediente.includes("Tr activo:"),
              delegadoContieneCamposMinimos:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Campos mínimos:"),
              operativoContieneCamposMinimos:
                textoExpediente.includes("Campos mínimos:"),
              delegadoContieneFuente:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Fuente:"),
              operativoContieneFuente:
                textoExpediente.includes("Fuente:"),
              delegadoContieneLecturaTecnica:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."),
              operativoContieneLecturaTecnica:
                textoExpediente.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.")
            };

            if (
              diagnosticoEscenarioQTrActivoDelegado.lineasDelegadas !== 16 ||
              !diagnosticoEscenarioQTrActivoDelegado.contieneEncabezadoDelegado ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneEncabezado ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneEstado ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneEstado ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneTrActivo ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneTrActivo ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneCamposMinimos ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneCamposMinimos ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneFuente ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneFuente ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneLecturaTecnica ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneLecturaTecnica
            ) {
              console.warn(
                "Diagnóstico Escenario Q-Tr activo delegado no invasivo:",
                diagnosticoEscenarioQTrActivoDelegado
              );
            }
          } catch (errorDiagnosticoEscenarioQTrActivoDelegado) {
            console.warn(
              "Diagnóstico Escenario Q-Tr activo delegado no invasivo no ejecutado:",
              errorDiagnosticoEscenarioQTrActivoDelegado
            );
          }

          // OT-0156 — Diagnóstico no invasivo del bloque Volumen de referencia delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasVolumenReferenciaDelegadasDiagnostico =
              construirLineasVolumenReferenciaExpediente({
                peTotalMm,
                volumenEsperadoM3
              });

            const textoVolumenReferenciaDelegadoDiagnostico =
              Array.isArray(lineasVolumenReferenciaDelegadasDiagnostico)
                ? lineasVolumenReferenciaDelegadasDiagnostico.join("\n")
                : "";

            const diagnosticoVolumenReferenciaDelegado = {
              lineasDelegadas: Array.isArray(lineasVolumenReferenciaDelegadasDiagnostico)
                ? lineasVolumenReferenciaDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoVolumenReferenciaDelegadoDiagnostico.includes("## 4. Volumen de referencia"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 4. Volumen de referencia"),
              delegadoContieneLluvia:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Lluvia efectiva total:"),
              operativoContieneLluvia:
                textoExpediente.includes("Lluvia efectiva total:"),
              delegadoContieneVolumen:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Volumen esperado:"),
              operativoContieneVolumen:
                textoExpediente.includes("Volumen esperado:"),
              delegadoContieneFormula:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Fórmula: Pe(mm) × Área(km²) × 1000."),
              operativoContieneFormula:
                textoExpediente.includes("Fórmula: Pe(mm) × Área(km²) × 1000.")
            };

            if (
              diagnosticoVolumenReferenciaDelegado.lineasDelegadas !== 4 ||
              !diagnosticoVolumenReferenciaDelegado.contieneEncabezadoDelegado ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneEncabezado ||
              !diagnosticoVolumenReferenciaDelegado.delegadoContieneLluvia ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneLluvia ||
              !diagnosticoVolumenReferenciaDelegado.delegadoContieneVolumen ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneVolumen ||
              !diagnosticoVolumenReferenciaDelegado.delegadoContieneFormula ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneFormula
            ) {
              console.warn(
                "Diagnóstico Volumen de referencia delegado no invasivo:",
                diagnosticoVolumenReferenciaDelegado
              );
            }
          } catch (errorDiagnosticoVolumenReferenciaDelegado) {
            console.warn(
              "Diagnóstico Volumen de referencia delegado no invasivo no ejecutado:",
              errorDiagnosticoVolumenReferenciaDelegado
            );
          }

          // OT-0146 — Diagnóstico no invasivo del bloque Tiempo de concentración y roles Tc delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasTiempoConcentracionDelegadasDiagnostico =
              construirLineasTiempoConcentracionRolesTcExpediente({
                Tc_final,
                trDisenoActivoExpediente
              });

            const textoTiempoConcentracionDelegadoDiagnostico =
              Array.isArray(lineasTiempoConcentracionDelegadasDiagnostico)
                ? lineasTiempoConcentracionDelegadasDiagnostico.join("\n")
                : "";

            const diagnosticoTiempoConcentracionDelegado = {
              lineasDelegadas: Array.isArray(lineasTiempoConcentracionDelegadasDiagnostico)
                ? lineasTiempoConcentracionDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoTiempoConcentracionDelegadoDiagnostico.includes("## 3. Tiempo de concentración y roles Tc"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 3. Tiempo de concentración y roles Tc"),
              delegadoContieneTcComparador:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tc comparador:"),
              operativoContieneTcComparador:
                textoExpediente.includes("Tc comparador:"),
              delegadoContieneTrGlobal:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tr global activo:"),
              operativoContieneTrGlobal:
                textoExpediente.includes("Tr global activo:"),
              delegadoContieneRoles:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Roles Tc:"),
              operativoContieneRoles:
                textoExpediente.includes("Roles Tc:")
            };

            if (
              diagnosticoTiempoConcentracionDelegado.lineasDelegadas !== 10 ||
              !diagnosticoTiempoConcentracionDelegado.contieneEncabezadoDelegado ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneEncabezado ||
              !diagnosticoTiempoConcentracionDelegado.delegadoContieneTcComparador ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneTcComparador ||
              !diagnosticoTiempoConcentracionDelegado.delegadoContieneTrGlobal ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneTrGlobal ||
              !diagnosticoTiempoConcentracionDelegado.delegadoContieneRoles ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneRoles
            ) {
              console.warn(
                "Diagnóstico Tiempo de concentración delegado no invasivo:",
                diagnosticoTiempoConcentracionDelegado
              );
            }
          } catch (errorDiagnosticoTiempoConcentracionDelegado) {
            console.warn(
              "Diagnóstico Tiempo de concentración delegado no invasivo no ejecutado:",
              errorDiagnosticoTiempoConcentracionDelegado
            );
          }

          // OT-0135 — Diagnóstico no invasivo del bloque Parámetros hidrológicos base delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasParametrosBaseDelegadasDiagnostico =
              construirLineasParametrosHidrologicosBaseExpediente({
                contextoBase
              });

            const textoParametrosBaseDelegadoDiagnostico =
              Array.isArray(lineasParametrosBaseDelegadasDiagnostico)
                ? lineasParametrosBaseDelegadasDiagnostico.join("\n")
                : "";

            const diagnosticoParametrosBaseDelegado = {
              lineasDelegadas: Array.isArray(lineasParametrosBaseDelegadasDiagnostico)
                ? lineasParametrosBaseDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoParametrosBaseDelegadoDiagnostico.includes("## 2. Parámetros hidrológicos base"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 2. Parámetros hidrológicos base"),
              delegadoContieneCN:
                textoParametrosBaseDelegadoDiagnostico.includes("CN:"),
              operativoContieneCN:
                textoExpediente.includes("CN:")
            };

            if (
              diagnosticoParametrosBaseDelegado.lineasDelegadas !== 5 ||
              !diagnosticoParametrosBaseDelegado.contieneEncabezadoDelegado ||
              !diagnosticoParametrosBaseDelegado.operativoContieneEncabezado ||
              !diagnosticoParametrosBaseDelegado.delegadoContieneCN ||
              !diagnosticoParametrosBaseDelegado.operativoContieneCN
            ) {
              console.warn(
                "Diagnóstico Parámetros hidrológicos base delegado no invasivo:",
                diagnosticoParametrosBaseDelegado
              );
            }
          } catch (errorDiagnosticoParametrosBaseDelegado) {
            console.warn(
              "Diagnóstico Parámetros hidrológicos base delegado no invasivo no ejecutado:",
              errorDiagnosticoParametrosBaseDelegado
            );
          }
          // OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasIdentificacionDelegadaDiagnostico =
              construirLineasIdentificacionExpediente({
                contextoBase,
                fuenteFallback: "HidroFlow",
                estacionIdfFallback: estacionIdfExpediente
              });

            const textoIdentificacionDelegadaDiagnostico =
              Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.join("\n")
                : "";

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
              delegadoContieneCuenca:
                textoIdentificacionDelegadaDiagnostico.includes("Cuenca:"),
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
            };

            if (
              diagnosticoIdentificacionDelegada.lineasDelegadas !== 7 ||
              !diagnosticoIdentificacionDelegada.contieneEncabezadoDelegado ||
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
              !diagnosticoIdentificacionDelegada.delegadoContieneCuenca ||
              !diagnosticoIdentificacionDelegada.operativoContieneCuenca
            ) {
              console.warn(
                "Diagnóstico Identificación delegada no invasivo:",
                diagnosticoIdentificacionDelegada
              );
            }
          } catch (errorDiagnosticoIdentificacionDelegada) {
            console.warn(
              "Diagnóstico Identificación delegada no invasivo no ejecutado:",
              errorDiagnosticoIdentificacionDelegada
            );
          }
  // OT-0114B — Comparación runtime no invasiva helper vs textoExpediente.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const textoHelperExpediente = diagnosticoHelperExpediente?.texto ?? "";

            const marcadoresRuntimeExpediente = [
              "# Expediente hidrológico mínimo — Cuenca activa",
              "## 5. Escenario Q-Tr activo — control de trazabilidad",
              "## 6. Resumen Q-5 auditado",
              "## 7. Método Racional — contraste global independiente",
              "## 8. Contraste Q-5 vs Método Racional",
              "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
              "## Diagnóstico temporal Q(t) no adoptivo",
              "## 10. Validación interna del expediente exportado",
              "## 11. Sello técnico de generación",
              "## 12. Restricciones y advertencias técnicas"
            ];

            const tokensInvalidosRuntimeExpediente = [
              "undefined",
              "null",
              "NaN",
              "[object Object]"
            ];

            const marcadoresFaltantesEnHelper = marcadoresRuntimeExpediente.filter(
              (marcador) => !textoHelperExpediente.includes(marcador)
            );

            const marcadoresFaltantesEnOperativo = marcadoresRuntimeExpediente.filter(
              (marcador) => !textoExpediente.includes(marcador)
            );

            const tokensHelper = tokensInvalidosRuntimeExpediente.filter((token) =>
              textoHelperExpediente.includes(token)
            );

            const tokensOperativo = tokensInvalidosRuntimeExpediente.filter((token) =>
              textoExpediente.includes(token)
            );

            const brechasRuntimeExpediente = [
              ...marcadoresFaltantesEnHelper.map(
                (marcador) => `Helper sin marcador: ${marcador}`
              ),
              ...marcadoresFaltantesEnOperativo.map(
                (marcador) => `Operativo sin marcador: ${marcador}`
              ),
              ...tokensHelper.map((token) => `Helper con token inválido: ${token}`),
              ...tokensOperativo.map((token) => `Operativo con token inválido: ${token}`)
            ];

            if (brechasRuntimeExpediente.length > 0) {
              console.warn("Comparación runtime helper vs expediente operativo:", {
                brechas: brechasRuntimeExpediente,
                longitudHelper: textoHelperExpediente.length,
                longitudOperativo: textoExpediente.length
              });
            }
          } catch (errorComparacionRuntimeExpediente) {
            console.warn(
              "Comparación runtime helper vs expediente operativo no ejecutada:",
              errorComparacionRuntimeExpediente
            );
          }
          try {
            const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
              fuenteExpediente: "ComparadorMultiMetodo.textoExpediente",
              origenPlantilla: "OT-0064",
              cuencaActiva: contextoBase?.casoActivo?.cuenca?.nombre ??
contextoBase?.cuencaNombre ??
"Cuenca activa"
            });

            if (!diagnosticoDocumentalExpediente.ok) {
              console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
            }
          } catch (errorDiagnosticoDocumental) {
            console.warn("Diagnóstico documental no invasivo no ejecutado:", errorDiagnosticoDocumental);
          }

              // OT-0056E valida expediente copiado antes de enviarlo al portapapeles.
              const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
              const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
                textoExpediente.includes(token)
              );

              const seccionesObligatoriasExpediente = [
                "# Expediente hidrológico mínimo — Cuenca activa",
                "## 5. Escenario Q-Tr activo — control de trazabilidad",
                "## 6. Resumen Q-5 auditado",
                "## 7. Método Racional — contraste global independiente",
                "## 8. Contraste Q-5 vs Método Racional",
                "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
                "## Diagnóstico temporal Q(t) no adoptivo",
                "## 10. Validación interna del expediente exportado",
                "## 11. Sello técnico de generación",
                "## 12. Restricciones y advertencias técnicas"
              ];
              const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
                !textoExpediente.includes(seccion)
              );

              // OT-0088C — Validación textual estricta de diagnóstico temporal Q(t).
              const validacionDiagnosticoTemporalQt =
                validarSeccionDiagnosticoTemporalQt(textoExpediente);

              if (
                tokensDetectadosExpediente.length > 0 ||
                seccionesFaltantesExpediente.length > 0 ||
                !validacionDiagnosticoTemporalQt.ok
              ) {
                window.alert(
                  [
                    "Validación del expediente copiado fallida.",
                    "",
                    "No se copió el expediente porque contiene tokens inválidos, perdió secciones obligatorias o falló la validación del diagnóstico temporal Q(t).",
                    "",
                    ...(tokensDetectadosExpediente.length > 0
                      ? [
                          "Tokens inválidos detectados:",
                          ...tokensDetectadosExpediente.map((token) => `- ${token}`),
                          ""
                        ]
                      : []),
                    ...(seccionesFaltantesExpediente.length > 0
                      ? [
                          "Secciones obligatorias faltantes:",
                          ...seccionesFaltantesExpediente.map((seccion) => `- ${seccion}`),
                          ""
                        ]
                      : []),
                    ...(!validacionDiagnosticoTemporalQt.ok
                      ? [
                          "Diagnóstico temporal Q(t) inválido:",
                          ...(validacionDiagnosticoTemporalQt.faltantes.length > 0
                            ? [
                                "Subsecciones temporales faltantes:",
                                ...validacionDiagnosticoTemporalQt.faltantes.map((item) => `- ${item}`)
                              ]
                            : []),
                          ...(validacionDiagnosticoTemporalQt.advertenciasFaltantes.length > 0
                            ? [
                                "Advertencias temporales faltantes:",
                                ...validacionDiagnosticoTemporalQt.advertenciasFaltantes.map((item) => `- ${item}`)
                              ]
                            : []),
                          ...(validacionDiagnosticoTemporalQt.tokensInvalidos.length > 0
                            ? [
                                "Tokens inválidos en diagnóstico temporal:",
                                ...validacionDiagnosticoTemporalQt.tokensInvalidos.map((item) => `- ${item}`)
                              ]
                            : [])
                        ]
                      : [])
                  ].join("\n")
                );

                return;
              }


          const metodosQ5Payload = obtenerMetodosQ5Validos().map(({ metodo, Qp, Tp, volumen }) => ({
            metodo,
            Qp,
            Tp,
            volumen
          }));
          const sintesisRiesgoTemporalQtPayload =
            Array.isArray(sintesisRiesgoTemporalQt?.resumen)
              ? sintesisRiesgoTemporalQt.resumen.join(" ")
              : typeof sintesisRiesgoTemporalQt === "string"
              ? sintesisRiesgoTemporalQt
              : sintesisRiesgoTemporalQt?.advertencia ??
                "Síntesis diagnóstica no adoptiva.";

          const cuencaCatalogoPayload = CUENCAS_CATALOGO?.iguana_pc80 ?? {};
          const salidaCatalogoPayload = cuencaCatalogoPayload?.salida ?? {};
          const relieveCatalogoPayload = cuencaCatalogoPayload?.relieve ?? {};
          const geometriaCatalogoPayload = cuencaCatalogoPayload?.geometria ?? {};


          const contextoBasePayload = {
            ...contextoBase,
            cuenca: {
              ...(contextoBase?.cuenca ?? {}),
              nombre:
                contextoBase?.cuenca?.nombre ??
                contextoBase?.cuencaNombre ??
                contextoBase?.nombreCuenca ??
                cuencaCatalogoPayload?.nombre_cuenca ??
                cuencaCatalogoPayload?.nombre_completo,
              id:
                contextoBase?.cuenca?.id ??
                contextoBase?.cuencaId ??
                contextoBase?.identificadorCuenca ??
                cuencaCatalogoPayload?.punto_control ??
                cuencaCatalogoPayload?.hidrologia?.punto_calculo ??
                cuencaCatalogoPayload?.id,
              lat:
                contextoBase?.cuenca?.lat ??
                contextoBase?.lat ??
                contextoBase?.lat_salida ??
                salidaCatalogoPayload?.lat ??
                cuencaCatalogoPayload?.lat_salida,
              lon:
                contextoBase?.cuenca?.lon ??
                contextoBase?.lon ??
                contextoBase?.lon_salida ??
                salidaCatalogoPayload?.lon ??
                cuencaCatalogoPayload?.lon_salida,
              cota_salida:
                contextoBase?.cuenca?.cota_salida ??
                contextoBase?.cota_salida_msnm ??
                contextoBase?.cota_menor_cauce ??
                contextoBase?.cota_min ??
                salidaCatalogoPayload?.cota_msnm ??
                relieveCatalogoPayload?.cota_menor_cauce_msnm ??
                cuencaCatalogoPayload?.cota_menor_cauce,
              cota_alta:
                contextoBase?.cuenca?.cota_alta ??
                contextoBase?.cota_alta_msnm ??
                contextoBase?.cota_mayor_cauce ??
                contextoBase?.cota_max ??
                relieveCatalogoPayload?.cota_mayor_cauce_msnm ??
                relieveCatalogoPayload?.cota_max_msnm ??
                cuencaCatalogoPayload?.cota_mayor_cauce ??
                cuencaCatalogoPayload?.cota_max
            },
            longitud_cauce_km:
              contextoBase?.casoActivo?.cuenca?.longitud_cauce_km ??
contextoBase?.longitud_cauce_km ??
              contextoBase?.longitud_cauce ??
              geometriaCatalogoPayload?.longitud_cauce_km ??
              cuencaCatalogoPayload?.longitud_cauce,
            desnivel_m:
              contextoBase?.desnivel_m ??
              relieveCatalogoPayload?.desnivel_m ??
              (Number.isFinite(Number(contextoBase?.cota_mayor_cauce)) &&
              Number.isFinite(Number(contextoBase?.cota_menor_cauce))
                ? Number(contextoBase.cota_mayor_cauce) -
                  Number(contextoBase.cota_menor_cauce)
                : undefined),
            cnBase: contextoBase?.cnBase ?? hidrologiaActiva.CN_base ?? hidrologiaActiva.CN,
            cnEfectivo: contextoBase?.cnEfectivo ?? hidrologiaActiva.CN_efectivo,
            idf: contextoBase?.idf ?? {
  k: null,
  n: null,
  c: null
},

hidrogramas: {
  resultados: metodosQ5Payload
},

            amcActual: hidrologiaActiva.AMC ?? hidrologiaActiva.AMC,
            tr_diseno_activo: trDisenoActivoExpediente,
            q_tr_activo_estado: estadoQTrActivoExpediente
          };


          const payloadExpedienteMarkdown = construirPayloadExpedienteDesdeEstado({
  contextoBase: contextoBasePayload,
  metodos: metodosQ5Payload,
  filasMorfologiaQt,
  filasDictamenFormaQt,
  filasRiesgoTemporalQt,
  sintesisRiesgoTemporalQt: sintesisRiesgoTemporalQtPayload,
  tcState: {
    Tc_final,
    metodosTc
  },
  fechaGeneracion: new Date().toLocaleString("es-CO"),
  idSimulacion:
    contextoBasePayload?.cuenca?.id ??
    contextoBasePayload?.identificadorCuenca ??
    "expediente_hidrologico_minimo"
});

try {
  console.log(
    "HF-PROD-003C POST EJECUTANDOSE",
    payloadExpedienteMarkdown
  );

  const respuestaPersistencia = await fetch(
    "http://localhost:4000/api/proyecto/activo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        expediente: payloadExpedienteMarkdown
      })
    }
  );

  console.log(
    "HF-PROD-003C STATUS",
    respuestaPersistencia.status
  );

  const resultadoPersistencia =
    await respuestaPersistencia.json();

  console.log(
    "HF-PROD-003C RESPUESTA",
    resultadoPersistencia
  );

} catch (error) {

  console.error(
    "HF-PROD-003C - Error persistiendo expediente:",
    error
  );

}

const descargaMarkdownExpediente =
  construirDescargaMarkdownExpedienteDesdePayload(
    payloadExpedienteMarkdown
  );

          const resultadoDescargaMarkdown = descargarArchivoMarkdownEnNavegador(
            descargaMarkdownExpediente
          );

          if (resultadoDescargaMarkdown?.ejecutado) {
            window.alert("Expediente hidrológico mínimo descargado en Markdown.");
            return;
          }
          const areaTexto = document.createElement("textarea");
          areaTexto.value = textoExpediente;
          areaTexto.setAttribute("readonly", "");
          areaTexto.style.position = "fixed";
          areaTexto.style.left = "-9999px";
          areaTexto.style.top = "-9999px";
          document.body.appendChild(areaTexto);
          areaTexto.focus();
          areaTexto.select();

          let copiado = false;

          try {
            copiado = document.execCommand("copy");
          } catch {
            copiado = false;
          }

          document.body.removeChild(areaTexto);

          if (copiado) {
            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
          } else {
            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
          }        }}
        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
      >
        Copiar expediente hidrológico mínimo
      </button>
      {(() => {
        const areaKm2 = Number(
  contextoBase?.casoActivo?.cuenca?.area_km2 ??
  contextoBase?.area_km2
);
        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
        const volumenEsperadoM3 =
          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
            ? areaKm2 * peTotalMm * 1000
            : null;

        return volumenEsperadoM3 ? (
          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
            {" "}({formatVolumen(peTotalMm)} mm × {formatArea(areaKm2)} km² × 1000).
          </div>
        ) : null;
      })()}
      {(() => {
  try {
    const diagnostico = adaptarExpedienteDocumental(
      "Expediente hidrológico mínimo",
      {
        fuenteExpediente: "ComparadorMultiMetodo.render",
        origenPlantilla: "OT-0066",
        cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
      }
    );

    return (
      <section
        style={{
          border: "1px solid #334155",
          borderRadius: 12,
          padding: 12,
          margin: "12px 0",
          background: "rgba(15, 23, 42, 0.6)"
        }}
      >
        <h3 style={{ margin: "0 0 8px 0" }}>
          Diagnóstico documental (lectura auxiliar)
        </h3>

        <div style={{ fontSize: "13px", marginBottom: 6 }}>
          <strong>Estado:</strong>{" "}
          {diagnostico?.ok ? "OK" : "Con advertencias"}
        </div>

        <div style={{ fontSize: "12px", opacity: 0.7 }}>
          No controla el copiado. No modifica el expediente.
        </div>
      </section>
    );

  } catch {
    return null;
  }
})()}


      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
          {(() => {
            const areaKm2 = Number(
  contextoBase?.casoActivo?.cuenca?.area_km2 ??
  contextoBase?.area_km2
);
            const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
            const volumenEsperadoM3 =
              Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
                ? areaKm2 * peTotalMm * 1000
                : null;

            const metodosQ5Panel = metodos.filter((metodo) =>
              metodo.tipo === "q" &&
              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
            );

            const metodoQ5PrincipalPanel =
              metodosQ5Panel.find((metodo) =>
                String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
              ) ??
              metodosQ5Panel[0] ??
              null;

            const resultadoQ5PrincipalPanel = metodoQ5PrincipalPanel
              ? obtenerResultadoQMetodo(metodoQ5PrincipalPanel)
              : null;

            const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalPanel?.volumen);
            const relacionVolumenQ5Esperado =
              Number.isFinite(volumenQ5PrincipalM3) &&
              Number.isFinite(volumenEsperadoM3) &&
              volumenEsperadoM3 > 0
                ? volumenQ5PrincipalM3 / volumenEsperadoM3
                : null;

            const estadoConsistenciaVolumen =
              relacionVolumenQ5Esperado === null
                ? "no evaluada"
                : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
                ? "superada"
                : relacionVolumenQ5Esperado >= 0.80 && relacionVolumenQ5Esperado <= 1.20
                ? "requiere revisión menor"
                : "requiere revisión técnica";

            const estadoQTrActivo =
              contextoBase?.q_tr_activo_estado?.estado ?? "no_publicado";

            const colorBorde =
              estadoConsistenciaVolumen === "superada"
                ? "#16a34a"
                : estadoConsistenciaVolumen === "requiere revisión menor"
                ? "#a16207"
                : "#991b1b";

            const formato = (valor, decimales = 2) => {
              const numero = Number(valor);
              return Number.isFinite(numero)
                ? numero.toLocaleString("es-CO", { maximumFractionDigits: decimales })
                : "—";
            };

            return (
              <section
                style={{
                  border: `1px solid ${colorBorde}`,
                  borderRadius: 12,
                  padding: 12,
                  margin: "12px 0",
                  background: "rgba(15, 23, 42, 0.70)"
                }}
              >
                <h3 style={{ margin: "0 0 8px 0" }}>
                  Panel visual de consistencia cruzada OT-0058
                </h3>

                <div style={{ ...estilos.muted, marginBottom: 10 }}>
  Control Pe–Área–Volumen/Q-5 visible antes de copiar el expediente. No recalcula hidrogramas, no modifica Q-5 y no adopta resultados.
</div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                    gap: 8
                  }}
                >
                  <div><strong>Pe total:</strong> {formatVolumen(peTotalMm)} mm</div>

<div><strong>Área:</strong> {formatArea(areaKm2)} km²</div>

<div><strong>Volumen esperado:</strong> {formatVolumen(volumenEsperadoM3)} m³</div>

<div><strong>Volumen Q-5 principal:</strong> {formatVolumen(volumenQ5PrincipalM3)} m³</div>
                  <div>
<strong>Relación Q-5/esperado:</strong>
{
  relacionVolumenQ5Esperado !== null
    ? formatTc(relacionVolumenQ5Esperado) + "x"
    : "—"
}
</div>
                  <div><strong>Resultado:</strong> {estadoConsistenciaVolumen}</div>
                  <div><strong>Q-Tr activo:</strong> {estadoQTrActivo}</div>
                </div>
              </section>
            );
          })()}

        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
      </div>

      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.
      </div>

      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
        ⚠ Control de magnitud pendiente: Qp, Tp y Volumen se muestran como resultados no adoptivos hasta validar unidades, integración y escala hidrológica.
      </div>

          {(() => {
            const estadoQTrActivo = contextoBase?.q_tr_activo_estado ?? null;
            const qTrActivo = estadoQTrActivo?.q_tr_activo ?? {};
            const faltantesQTrActivo = Array.isArray(estadoQTrActivo?.campos_faltantes)
              ? estadoQTrActivo.campos_faltantes
              : [];
            const disponibleQTrActivo = estadoQTrActivo?.disponible === true;

            const formatearValorQTr = (valor, sufijo = "") => {
              if (valor === null || valor === undefined || valor === "") return "—";
              const numero = Number(valor);
              if (Number.isFinite(numero) && String(valor).trim() !== "") {
                return numero.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + sufijo;
              }
              return String(valor);
            };

            return (
              <section
                style={{
                  border: disponibleQTrActivo ? "1px solid #16a34a" : "1px solid #a16207",
                  borderRadius: 12,
                  padding: 12,
                  margin: "12px 0",
                  background: disponibleQTrActivo ? "rgba(22, 163, 74, 0.10)" : "rgba(161, 98, 7, 0.10)"
                }}
              >
                <h3 style={{ margin: "0 0 8px 0" }}>
                  Bloque Q-Tr activo · Escenario de diseño controlado
                </h3>

                <div style={{ ...estilos.muted, marginBottom: 10 }}>
                  Escenario activo de periodo de retorno publicado desde el contexto hidrológico. Este bloque no recalcula caudales, no modifica Q-5 y funciona como control visual del Tr activo.
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 8,
                    marginBottom: 10
                  }}
                >
                  <div><strong>Estado:</strong> {estadoQTrActivo?.estado ?? "no_publicado"}</div>
                  <div><strong>Tr activo:</strong> {formatearValorQTr(qTrActivo.tr_activo, " años")}</div>
                  <div><strong>Estación IDF:</strong> {formatearValorQTr(qTrActivo.estacion_idf)}</div>
                  <div><strong>Método IDF:</strong> {formatearValorQTr(qTrActivo.metodo_idf)}</div>
                  <div><strong>Distribución:</strong> {formatearValorQTr(qTrActivo.distribucion_temporal)}</div>
                  <div><strong>Área:</strong> {formatearValorQTr(qTrActivo.area_km2, " km²")}</div>
                  <div><strong>CN efectivo:</strong> {formatearValorQTr(qTrActivo.cn_efectivo)}</div>
                  <div><strong>S:</strong> {formatearValorQTr(qTrActivo.s_mm, " mm")}</div>
                  <div><strong>Ia:</strong> {formatearValorQTr(qTrActivo.ia_mm, " mm")}</div>
                  <div><strong>Impermeabilidad:</strong> {formatearValorQTr(qTrActivo.porcentaje_impermeable, " %")}</div>
                  <div><strong>Tc:</strong> {formatearValorQTr(qTrActivo.tc_min, " min")}</div>
                  <div><strong>Pe total:</strong> {formatearValorQTr(qTrActivo.lluvia_efectiva_total_mm, " mm")}</div>
                </div>

                {faltantesQTrActivo.length > 0 ? (
                  <div style={{ ...estilos.muted }}>
                    Campos mínimos faltantes: {faltantesQTrActivo.join(", ")}.
                  </div>
                ) : (
                  <div style={{ ...estilos.muted }}>
                    Campos mínimos completos para trazabilidad visual del Q-Tr activo.
                  </div>
                )}

                <div style={{ ...estilos.muted, marginTop: 8 }}>
                  Fuente: {estadoQTrActivo?.fuente ?? "—"}. Estado no adoptivo: la adopción técnica permanece subordinada a la validación hidrológica del expediente.
                </div>
              </section>
            );
          })()}

            {(() => {
        const resumenQSeries = diagnosticoQSeries?.resumen ?? {
          total: 0,
          publicados: 0,
          parciales: 0,
          noDisponibles: 0,
          inconsistentes: 0
        };

        const estadoQSeries =
          resumenQSeries.inconsistentes > 0
            ? { etiqueta: "Inconsistente", color: "#dc2626" }
            : resumenQSeries.publicados > 0 && (resumenQSeries.parciales > 0 || resumenQSeries.noDisponibles > 0)
            ? { etiqueta: "Parcial", color: "#f59e0b" }
            : resumenQSeries.publicados > 0
            ? { etiqueta: "Disponible", color: "#16a34a" }
            : { etiqueta: "No disponible", color: "#64748b" };

        return (
          <section
            style={{
              border: `1px solid ${estadoQSeries.color}`,
              borderRadius: 12,
              padding: 12,
              margin: "12px 0",
              background: "rgba(15, 23, 42, 0.55)"
            }}
          >
            <h3 style={{ margin: "0 0 8px 0" }}>
              Panel diagnóstico qSeries
            </h3>

            <div style={{ ...estilos.muted, marginBottom: 10 }}>
  Lectura no invasiva de disponibilidad de series Q(t). Las métricas morfológicas se evalúan solo como diagnóstico agregado y no se exponen en detalle.
</div>

<div
  style={{
    marginBottom: 10,
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid rgba(34, 197, 94, 0.35)",
    background: "rgba(15, 23, 42, 0.35)"
  }}
>
  <strong>Diagnóstico morfológico Q(t):</strong>{" "}
  {diagnosticoMorfologiaQt?.ok
    ? `series aptas ${diagnosticoMorfologiaQt.aptas}/${diagnosticoMorfologiaQt.total}; no aptas ${diagnosticoMorfologiaQt.noAptas}. No se muestran métricas detalladas ni se adopta ningún método.`
    : "no disponible. No se calculan métricas morfológicas."}
</div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 8
              }}
            >
              <div><strong>Estado:</strong> <span style={{ color: estadoQSeries.color }}>{estadoQSeries.etiqueta}</span></div>
              <div><strong>Total:</strong> {resumenQSeries.total}</div>
              <div><strong>Publicados:</strong> {resumenQSeries.publicados}</div>
              <div><strong>Parciales:</strong> {resumenQSeries.parciales}</div>
              <div><strong>No disponibles:</strong> {resumenQSeries.noDisponibles}</div>
              <div><strong>Inconsistentes:</strong> {resumenQSeries.inconsistentes}</div>
            </div>

            {/* OT-0083C — Tabla compacta no adoptiva de métricas morfológicas Q(t). */}
            {Array.isArray(filasMorfologiaQt) && filasMorfologiaQt.length > 0 && (
              <div
                style={{
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid rgba(34, 197, 94, 0.35)",
                  background: "rgba(15, 23, 42, 0.35)",
                  overflowX: "auto"
                }}
              >
                <strong>Tabla diagnóstica morfológica Q(t):</strong>{" "}
                exposición compacta no adoptiva basada exclusivamente en qSeries validadas.

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: 10,
                    fontSize: 12
                  }}
                >
                  <thead>
                    <tr>
                      {[
                        "Método",
                        "Estado",
                        "Qp",
                        "tPico",
                        "De",
                        "Ascenso",
                        "Receso",
                        "W50",
                        "W25",
                        "Asim."
                      ].map((encabezado) => (
                        <th
                          key={encabezado}
                          style={{
                            textAlign: "left",
                            padding: "6px 8px",
                            borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
                            color: "#bae6fd",
                            whiteSpace: "nowrap"
                          }}
                        >
                          {encabezado}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filasMorfologiaQt.map((fila, indice) => {
                      const formatear = (valor, decimales = 2, unidad = "") =>
                        Number.isFinite(Number(valor))
                          ? `${Number(valor).toLocaleString("es-CO", {
                              maximumFractionDigits: decimales
                            })}${unidad}`
                          : "—";

                      return (
                        <tr key={`${fila.metodo}-${indice}`}>
                          <td
                            style={{
                              padding: "6px 8px",
                              borderBottom: "1px solid rgba(51, 65, 85, 0.55)",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {fila.metodo}
                          </td>

                          <td
                            style={{
                              padding: "6px 8px",
                              borderBottom: "1px solid rgba(51, 65, 85, 0.55)",
                              color: fila.estado === "Apta" ? "#86efac" : "#fca5a5",
                              fontWeight: 700,
                              whiteSpace: "nowrap"
                            }}
                          >
                            {fila.estado}
                          </td>

                          <td style={{ padding: "6px 8px", borderBottom: "1px solid rgba(51, 65, 85, 0.55)" }}>
                            {formatear(fila.Qp, 2, " m³/s")}
                          </td>

                          <td style={{ padding: "6px 8px", borderBottom: "1px solid rgba(51, 65, 85, 0.55)" }}>
                            {formatear(fila.tPico, 2, " min")}
                          </td>

                          <td style={{ padding: "6px 8px", borderBottom: "1px solid rgba(51, 65, 85, 0.55)" }}>
                            {formatear(fila.duracionEfectivaMin, 2, " min")}
                          </td>

                          <td style={{ padding: "6px 8px", borderBottom: "1px solid rgba(51, 65, 85, 0.55)" }}>
                            {formatear(fila.tiempoAscensoMin, 2, " min")}
                          </td>

                          <td style={{ padding: "6px 8px", borderBottom: "1px solid rgba(51, 65, 85, 0.55)" }}>
                            {formatear(fila.tiempoRecesoMin, 2, " min")}
                          </td>

                          <td style={{ padding: "6px 8px", borderBottom: "1px solid rgba(51, 65, 85, 0.55)" }}>
                            {formatear(fila.W50Min, 2, " min")}
                          </td>

                          <td style={{ padding: "6px 8px", borderBottom: "1px solid rgba(51, 65, 85, 0.55)" }}>
                            {formatear(fila.W25Min, 2, " min")}
                          </td>

                          <td style={{ padding: "6px 8px", borderBottom: "1px solid rgba(51, 65, 85, 0.55)" }}>
                            {formatear(fila.asimetriaAscensoReceso, 3, "")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div style={{ ...estilos.muted, marginTop: 8 }}>
                  Lectura diagnóstica: las métricas se calculan desde qSeries reales validadas. No implican adopción hidrológica, no levantan el estado global No coherente y no reemplazan el dictamen técnico del expediente.
                </div>
                {Array.isArray(filasDictamenFormaQt) && filasDictamenFormaQt.length > 0 && (
                  <div
                    style={{
                      marginTop: 10,
                      padding: 10,
                      borderRadius: 8,
                      border: "1px solid rgba(251, 191, 36, 0.35)",
                      background: "rgba(15, 23, 42, 0.35)",
                      overflowX: "auto"
                    }}
                  >
                    <strong>Dictamen diagnóstico de forma Q(t):</strong>{" "}
                    clasificación preliminar no adoptiva basada en métricas morfológicas.

                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: 10,
                        fontSize: 12
                      }}
                    >
                      <thead>
                        <tr>
                          {["Método", "Forma", "Alerta", "Severidad"].map((encabezado) => (
                            <th
                              key={encabezado}
                              style={{
                                textAlign: "left",
                                padding: "6px 8px",
                                borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
                                color: "#fde68a",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {encabezado}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {filasDictamenFormaQt.map((fila, indice) => (
                          <tr key={`${fila.metodo}-dictamen-${indice}`}>
                            <td
                              style={{
                                padding: "6px 8px",
                                borderBottom: "1px solid rgba(51, 65, 85, 0.55)",
                                whiteSpace: "nowrap"
                              }}
                            >
                              {fila.metodo}
                            </td>

                            <td
                              style={{
                                padding: "6px 8px",
                                borderBottom: "1px solid rgba(51, 65, 85, 0.55)"
                              }}
                            >
                              {fila.forma}
                            </td>

                            <td
                              style={{
                                padding: "6px 8px",
                                borderBottom: "1px solid rgba(51, 65, 85, 0.55)"
                              }}
                            >
                              {fila.alerta}
                            </td>

                            <td
                              style={{
                                padding: "6px 8px",
                                borderBottom: "1px solid rgba(51, 65, 85, 0.55)",
                                color:
                                  fila.severidad === "Alta"
                                    ? "#fca5a5"
                                    : fila.severidad === "Media"
                                    ? "#fde68a"
                                    : fila.severidad === "Baja"
                                    ? "#86efac"
                                    : "#cbd5e1",
                                fontWeight: 700,
                                whiteSpace: "nowrap"
                              }}
                            >
                              {fila.severidad}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div style={{ ...estilos.muted, marginTop: 8 }}>
                      Este dictamen clasifica la forma temporal Q(t) como diagnóstico preliminar. No adopta métodos, no modifica caudales, no levanta el estado global No coherente y no reemplaza revisión hidrológica profesional.
                    </div>
                    {Array.isArray(filasRiesgoTemporalQt) && filasRiesgoTemporalQt.length > 0 && (
                      <div
                        style={{
                          marginTop: 10,
                          padding: 10,
                          borderRadius: 8,
                          border: "1px solid rgba(248, 113, 113, 0.35)",
                          background: "rgba(15, 23, 42, 0.35)",
                          overflowX: "auto"
                        }}
                      >
                        <strong>Riesgo temporal Q(t):</strong>{" "}
                        lectura comparativa no adoptiva de factores temporales dominantes.

                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: 10,
                            fontSize: 12
                          }}
                        >
                          <thead>
                            <tr>
                              {["Método", "Riesgo", "Nivel", "Factor dominante"].map((encabezado) => (
                                <th
                                  key={encabezado}
                                  style={{
                                    textAlign: "left",
                                    padding: "6px 8px",
                                    borderBottom: "1px solid rgba(148, 163, 184, 0.35)",
                                    color: "#fecaca",
                                    whiteSpace: "nowrap"
                                  }}
                                >
                                  {encabezado}
                                </th>
                              ))}
                            </tr>
                          </thead>

                          <tbody>
                            {filasRiesgoTemporalQt.map((fila, indice) => (
                              <tr key={`${fila.metodo}-riesgo-${indice}`}>
                                <td
                                  style={{
                                    padding: "6px 8px",
                                    borderBottom: "1px solid rgba(51, 65, 85, 0.55)",
                                    whiteSpace: "nowrap"
                                  }}
                                >
                                  {fila.metodo}
                                </td>

                                <td
                                  style={{
                                    padding: "6px 8px",
                                    borderBottom: "1px solid rgba(51, 65, 85, 0.55)"
                                  }}
                                >
                                  {fila.riesgo}
                                </td>

                                <td
                                  style={{
                                    padding: "6px 8px",
                                    borderBottom: "1px solid rgba(51, 65, 85, 0.55)",
                                    color:
                                      fila.nivel === "Alto"
                                        ? "#fca5a5"
                                        : fila.nivel === "Medio"
                                        ? "#fde68a"
                                        : fila.nivel === "Bajo"
                                        ? "#86efac"
                                        : "#cbd5e1",
                                    fontWeight: 700,
                                    whiteSpace: "nowrap"
                                  }}
                                >
                                  {fila.nivel}
                                </td>

                                <td
                                  style={{
                                    padding: "6px 8px",
                                    borderBottom: "1px solid rgba(51, 65, 85, 0.55)"
                                  }}
                                >
                                  {fila.factorDominante}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div style={{ ...estilos.muted, marginTop: 8 }}>
                          Esta lectura compara riesgos temporales derivados de la forma Q(t). No selecciona método, no modifica caudales, no levanta el estado global No coherente y no reemplaza revisión hidrológica profesional.
                        </div>
                        {sintesisRiesgoTemporalQt?.ok && Array.isArray(sintesisRiesgoTemporalQt.resumen) && (
                          <div
                            style={{
                              marginTop: 10,
                              padding: 10,
                              borderRadius: 8,
                              border: "1px solid rgba(56, 189, 248, 0.35)",
                              background: "rgba(15, 23, 42, 0.35)"
                            }}
                          >
                            <strong>Síntesis ejecutiva temporal Q(t):</strong>{" "}
                            lectura agrupada de riesgos temporales. Diagnóstico no adoptivo.

                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                                gap: 8,
                                marginTop: 10,
                                marginBottom: 10
                              }}
                            >
                              <div>
                                <strong>Riesgo alto:</strong>{" "}
                                {sintesisRiesgoTemporalQt.niveles?.alto ?? 0}
                              </div>
                              <div>
                                <strong>Riesgo medio:</strong>{" "}
                                {sintesisRiesgoTemporalQt.niveles?.medio ?? 0}
                              </div>
                              <div>
                                <strong>Riesgo bajo:</strong>{" "}
                                {sintesisRiesgoTemporalQt.niveles?.bajo ?? 0}
                              </div>
                              <div>
                                <strong>No determinado:</strong>{" "}
                                {sintesisRiesgoTemporalQt.niveles?.noDeterminado ?? 0}
                              </div>
                            </div>

                            <ul style={{ margin: "8px 0 0 18px", padding: 0 }}>
                              {sintesisRiesgoTemporalQt.resumen.map((item, indice) => (
                                <li key={`sintesis-riesgo-temporal-${indice}`} style={{ marginBottom: 4 }}>
                                  {item}
                                </li>
                              ))}
                            </ul>

                            <div style={{ ...estilos.muted, marginTop: 8 }}>
                              {sintesisRiesgoTemporalQt.advertencia ??
                                "Síntesis diagnóstica no adoptiva; no selecciona método ni levanta No coherente."}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

            <div
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 8,
                border: "1px solid rgba(148, 163, 184, 0.35)",
                background: "rgba(15, 23, 42, 0.45)"
              }}
            >
              <strong>Dictamen operativo:</strong>{" "}
{(resumenEstructuraHidrogramas?.resumen?.conSerieTemporal ?? 0) > 0
  ? "las series Q(t) están publicadas y reconocidas por el diagnóstico estructural. Las métricas morfológicas permanecen bloqueadas hasta una OT posterior de análisis de forma."
  : "las series Q(t) no están publicadas para los métodos evaluados. No procede calcular métricas morfológicas de forma hasta publicar qSeries reales o normalizadas por método."}
            </div>
            {(() => {
              const resumenEstructural = resumenEstructuraHidrogramas?.resumen ?? {
                tipoEntrada: "no_disponible",
                contenedor: null,
                totalCandidatos: 0,
                conSerieTemporal: 0,
                sinSerieTemporal: 0,
                conQpico: 0,
                conTPico: 0,
                conVolTotal: 0
              };

              return (
                <div
                  style={{
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 8,
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    background: "rgba(15, 23, 42, 0.35)"
                  }}
                >
                  {matrizPatronVisual && (
                    <div
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid rgba(168, 85, 247, 0.35)",
                        background: "rgba(15, 23, 42, 0.35)",
                        overflowX: "auto"
                      }}
                    >
                      <strong>Matriz patrón de referencia:</strong>{" "}
                      lectura estructurada de cuenca patrón para comparación futura. Diagnóstico no adoptivo.

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                          gap: 8,
                          marginTop: 10
                        }}
                      >
                        <div>
                          <strong>Cuenca:</strong>{" "}
                          {matrizPatronVisual?.cuenca?.nombre ?? "Cuenca patrón de referencia"}
                        </div>

                        <div>
                          <strong>Área:</strong>{" "}
                          {Number(matrizPatronVisual?.morfometria?.areaKm2).toLocaleString("es-CO", {
                            maximumFractionDigits: 4
                          })}{" "}
                          km²
                        </div>

                        <div>
                          <strong>Longitud hidráulica:</strong>{" "}
                          {Number(matrizPatronVisual?.morfometria?.longitudHidraulicaKm).toLocaleString("es-CO", {
                            maximumFractionDigits: 3
                          })}{" "}
                          km
                        </div>

                        <div>
                          <strong>Tc sugerido:</strong>{" "}
                          {Number(matrizPatronVisual?.tiemposConcentracion?.tcSugeridoMin).toLocaleString("es-CO", {
                            maximumFractionDigits: 1
                          })}{" "}
                          min
                        </div>

                        <div>
                          <strong>Métodos patrón:</strong>{" "}
                          {diagnosticoMatrizPatronQt.length}
                        </div>
                      </div>
                      {graficaQpTPicoMatrizPatron?.ok && (() => {
                        const anchoSvg = 560;
                        const altoSvg = 260;
                        const margen = { izquierda: 54, derecha: 24, arriba: 24, abajo: 46 };
                        const anchoPlot = anchoSvg - margen.izquierda - margen.derecha;
                        const altoPlot = altoSvg - margen.arriba - margen.abajo;
                        const maxX = graficaQpTPicoMatrizPatron.dominio?.maxXGrafico || 1;
                        const maxY = graficaQpTPicoMatrizPatron.dominio?.maxYGrafico || 1;

                        const escalarX = (valor) =>
                          margen.izquierda + (Number(valor) / maxX) * anchoPlot;

                        const escalarY = (valor) =>
                          margen.arriba + altoPlot - (Number(valor) / maxY) * altoPlot;

                        return (
                          <div
                            style={{
                              marginTop: 12,
                              padding: 10,
                              borderRadius: 8,
                              border: "1px solid rgba(99, 102, 241, 0.35)",
                              background: "rgba(2, 6, 23, 0.28)"
                            }}
                          >
                            <strong>Gráfica Qp–tPico:</strong>{" "}
                            comparación visual no adoptiva desde matriz patrón.

                            <div style={{ overflowX: "auto", marginTop: 8 }}>
                              <svg
                                width={anchoSvg}
                                height={altoSvg}
                                role="img"
                                aria-label="Gráfica Qp contra tPico desde matriz patrón de referencia"
                              >
                                <line
                                  x1={margen.izquierda}
                                  y1={margen.arriba}
                                  x2={margen.izquierda}
                                  y2={margen.arriba + altoPlot}
                                  stroke="rgba(226, 232, 240, 0.55)"
                                  strokeWidth="1"
                                />
                                <line
                                  x1={margen.izquierda}
                                  y1={margen.arriba + altoPlot}
                                  x2={margen.izquierda + anchoPlot}
                                  y2={margen.arriba + altoPlot}
                                  stroke="rgba(226, 232, 240, 0.55)"
                                  strokeWidth="1"
                                />

                                <text
                                  x={margen.izquierda + anchoPlot / 2}
                                  y={altoSvg - 10}
                                  textAnchor="middle"
                                  fill="#cbd5e1"
                                  fontSize="11"
                                >
                                  tPico (min)
                                </text>

                                <text
                                  x="14"
                                  y={margen.arriba + altoPlot / 2}
                                  transform={`rotate(-90 14 ${margen.arriba + altoPlot / 2})`}
                                  textAnchor="middle"
                                  fill="#cbd5e1"
                                  fontSize="11"
                                >
                                  Qp (m³/s)
                                </text>

                                {graficaQpTPicoMatrizPatron.puntos.map((punto) => {
                                  const x = escalarX(punto.xTPicoMin);
                                  const y = escalarY(punto.yQpM3s);

                                  return (
                                    <g key={`qp-tpico-${punto.metodo}`}>
                                      <circle
                                        cx={x}
                                        cy={y}
                                        r="6"
                                        fill={punto.color}
                                        stroke="rgba(255, 255, 255, 0.75)"
                                        strokeWidth="1"
                                      />
                                      <text
                                        x={x + 8}
                                        y={y - 8}
                                        fill="#e5e7eb"
                                        fontSize="11"
                                      >
                                        {punto.metodo}
                                      </text>
                                      <text
                                        x={x + 8}
                                        y={y + 7}
                                        fill="#94a3b8"
                                        fontSize="10"
                                      >
                                        {`${punto.yQpM3s.toLocaleString("es-CO", {
                                          maximumFractionDigits: 0
                                        })} m³/s · ${punto.xTPicoMin.toLocaleString("es-CO", {
                                          maximumFractionDigits: 0
                                        })} min`}
                                      </text>
                                    </g>
                                  );
                                })}
                              </svg>
                            </div>

                            <div style={{ ...estilos.muted, marginTop: 8 }}>
                              Lectura: puntos hacia arriba indican mayor Qp; puntos hacia la izquierda
                              indican pico más temprano. Diagnóstico visual no adoptivo.
                            </div>
                          </div>
                        );
                      })()}

                      {graficaVelocidadEfectivaMatrizPatron?.ok && (() => {
                        const anchoSvg = 560;
                        const altoSvg = 260;
                        const margen = { izquierda: 128, derecha: 28, arriba: 24, abajo: 34 };
                        const anchoPlot = anchoSvg - margen.izquierda - margen.derecha;
                        const altoFila = 32;
                        const maxVelocidad =
                          graficaVelocidadEfectivaMatrizPatron.dominio?.maxVelocidadGrafico || 1;

                        const escalarAncho = (valor) =>
                          (Number(valor) / maxVelocidad) * anchoPlot;

                        const yFila = (indice) => margen.arriba + indice * altoFila;

                        return (
                          <div
                            style={{
                              marginTop: 12,
                              padding: 10,
                              borderRadius: 8,
                              border: "1px solid rgba(34, 197, 94, 0.35)",
                              background: "rgba(2, 6, 23, 0.28)"
                            }}
                          >
                            <strong>Velocidad efectiva y plausibilidad temporal:</strong>{" "}
                            lectura visual no adoptiva desde matriz patrón.

                            <div style={{ overflowX: "auto", marginTop: 8 }}>
                              <svg
                                width={anchoSvg}
                                height={altoSvg}
                                role="img"
                                aria-label="Gráfica de velocidad efectiva desde matriz patrón de referencia"
                              >
                                <line
                                  x1={margen.izquierda}
                                  y1={margen.arriba - 8}
                                  x2={margen.izquierda}
                                  y2={altoSvg - margen.abajo}
                                  stroke="rgba(226, 232, 240, 0.45)"
                                  strokeWidth="1"
                                />

                                <line
                                  x1={margen.izquierda}
                                  y1={altoSvg - margen.abajo}
                                  x2={margen.izquierda + anchoPlot}
                                  y2={altoSvg - margen.abajo}
                                  stroke="rgba(226, 232, 240, 0.45)"
                                  strokeWidth="1"
                                />

                                <line
                                  x1={margen.izquierda + escalarAncho(graficaVelocidadEfectivaMatrizPatron.referencia?.velocidadCaminataKmh ?? 5)}
                                  y1={margen.arriba - 8}
                                  x2={margen.izquierda + escalarAncho(graficaVelocidadEfectivaMatrizPatron.referencia?.velocidadCaminataKmh ?? 5)}
                                  y2={altoSvg - margen.abajo}
                                  stroke="rgba(125, 211, 252, 0.75)"
                                  strokeWidth="1"
                                  strokeDasharray="4 4"
                                />

                                <text
                                  x={margen.izquierda + escalarAncho(graficaVelocidadEfectivaMatrizPatron.referencia?.velocidadCaminataKmh ?? 5) + 6}
                                  y={margen.arriba + 4}
                                  fill="#7dd3fc"
                                  fontSize="10"
                                >
                                  ref. 5 km/h
                                </text>

                                {graficaVelocidadEfectivaMatrizPatron.barras.map((barra, indice) => {
                                  const y = yFila(indice);
                                  const anchoTPico = escalarAncho(barra.velocidadTPicoKmh ?? 0);
                                  const anchoAscenso = escalarAncho(barra.velocidadAscensoKmh ?? 0);

                                  return (
                                    <g key={`velocidad-efectiva-${barra.metodo}`}>
                                      <text
                                        x={8}
                                        y={y + 15}
                                        fill="#e5e7eb"
                                        fontSize="11"
                                      >
                                        {barra.metodo}
                                      </text>

                                      <rect
                                        x={margen.izquierda}
                                        y={y}
                                        width={anchoTPico}
                                        height="10"
                                        rx="3"
                                        fill={barra.color}
                                      />

                                      <rect
                                        x={margen.izquierda}
                                        y={y + 14}
                                        width={anchoAscenso}
                                        height="8"
                                        rx="3"
                                        fill="rgba(148, 163, 184, 0.75)"
                                      />

                                      <text
                                        x={margen.izquierda + Math.max(anchoTPico, anchoAscenso) + 8}
                                        y={y + 10}
                                        fill="#cbd5e1"
                                        fontSize="10"
                                      >
                                        {`${Number(barra.velocidadTPicoKmh ?? 0).toLocaleString("es-CO", {
                                          maximumFractionDigits: 1
                                        })} / ${Number(barra.velocidadAscensoKmh ?? 0).toLocaleString("es-CO", {
                                          maximumFractionDigits: 1
                                        })} km/h`}
                                      </text>

                                      <text
                                        x={margen.izquierda + Math.max(anchoTPico, anchoAscenso) + 8}
                                        y={y + 23}
                                        fill="#94a3b8"
                                        fontSize="9"
                                      >
                                        {barra.plausibilidadTemporal}
                                      </text>
                                    </g>
                                  );
                                })}

                                <text
                                  x={margen.izquierda + anchoPlot / 2}
                                  y={altoSvg - 8}
                                  textAnchor="middle"
                                  fill="#cbd5e1"
                                  fontSize="11"
                                >
                                  Velocidad efectiva (km/h): tPico / ascenso
                                </text>
                              </svg>
                            </div>

                            <div style={{ ...estilos.muted, marginTop: 8 }}>
                              Lectura: velocidades altas indican respuesta temporal muy concentrada.
                              La referencia de 5 km/h es pedagógica y no representa una fórmula hidrológica.
                            </div>
                          </div>
                        );
                      })()}
                      {lecturaComparativaMatrizPatron?.ok && Array.isArray(lecturaComparativaMatrizPatron.frases) && (
                        <div
                          style={{
                            marginTop: 12,
                            padding: 10,
                            borderRadius: 8,
                            border: "1px solid rgba(251, 191, 36, 0.35)",
                            background: "rgba(2, 6, 23, 0.28)"
                          }}
                        >
                          <strong>Lectura comparativa automática:</strong>{" "}
                          síntesis textual no adoptiva desde matriz patrón.

                          <ul style={{ margin: "8px 0 0 18px", padding: 0 }}>
                            {lecturaComparativaMatrizPatron.frases.map((frase, indice) => (
                              <li
                                key={`lectura-comparativa-matriz-${indice}`}
                                style={{ marginBottom: 4 }}
                              >
                                {frase}
                              </li>
                            ))}
                          </ul>

                          <div style={{ ...estilos.muted, marginTop: 8 }}>
                            {lecturaComparativaMatrizPatron.advertencia ??
                              "Lectura comparativa no adoptiva; no selecciona ni descarta métodos."}
                          </div>
                        </div>
                      )}
                      <div style={{ ...estilos.muted, marginTop: 8 }}>
                        Riesgo alto: {(sintesisMatrizPatron.riesgoAlto ?? []).join(", ") || "—"}.{" "}
                        Riesgo medio: {(sintesisMatrizPatron.riesgoMedio ?? []).join(", ") || "—"}.
                      </div>

                      <div style={{ ...estilos.muted, marginTop: 8 }}>
                        Salida hidráulica futura:{" "}
                        {salidaHidraulicaMatrizPatron?.requiereHidrogramaCompleto
                          ? "requiere hidrograma completo; no usar solo Qp."
                          : "sin criterio hidráulico definido."}
                      </div>

                      <div style={{ ...estilos.muted, marginTop: 8 }}>
                        Esta matriz patrón es una lectura estática de referencia. No recalcula hidrogramas,
                        no selecciona método, no modifica Q(t), no levanta el estado global No coherente y
                        no reemplaza revisión hidrológica profesional.
                      </div>
                    </div>
                  )}
                  <strong>Resumen estructural de hidrogramas:</strong>{" "}
                  lectura agregada del objeto hidrogramas disponible en contexto.

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: 8,
                      marginTop: 8
                    }}
                  >
                    <div><strong>Tipo entrada:</strong> {String(resumenEstructural.tipoEntrada ?? "—")}</div>
                    <div><strong>Contenedor:</strong> {String(resumenEstructural.contenedor ?? "—")}</div>
                    <div><strong>Candidatos:</strong> {resumenEstructural.totalCandidatos ?? 0}</div>
                    <div><strong>Con serie:</strong> {resumenEstructural.conSerieTemporal ?? 0}</div>
                    <div><strong>Sin serie:</strong> {resumenEstructural.sinSerieTemporal ?? 0}</div>
                    <div><strong>Con Qpico:</strong> {resumenEstructural.conQpico ?? 0}</div>
                    <div><strong>Con tPico:</strong> {resumenEstructural.conTPico ?? 0}</div>
                    <div><strong>Con volTotal:</strong> {resumenEstructural.conVolTotal ?? 0}</div>
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      padding: 10,
                      borderRadius: 8,
                      border: "1px solid rgba(148, 163, 184, 0.35)",
                      background: "rgba(15, 23, 42, 0.35)"
                    }}
                  >
                    <strong>Dictamen de serie temporal:</strong>{" "}
{(resumenEstructural?.conSerieTemporal ?? 0) > 0
  ? "el objeto hidrogramas contiene resultados resumen y series temporales Q(t) reconocibles para los métodos evaluados. La publicación de qSeries está activa y validada estructuralmente; las métricas morfológicas permanecen bloqueadas hasta una OT posterior."
  : "el objeto hidrogramas contiene resultados resumen para los 5 métodos evaluados, incluyendo Qpico, tPico y volTotal, pero no publica una serie temporal Q(t) reconocible. No procede calcular métricas morfológicas de forma hasta disponer de qSeries reales o normalizadas por método."}
                  </div>
                  <div style={{ ...estilos.muted, marginTop: 8 }}>
                    Este bloque no muestra series crudas, no lista arrays completos y no calcula métricas morfológicas.
                  </div>
                </div>
              );
            })()}
            <div style={{ ...estilos.muted, marginTop: 10 }}>
              Este panel no muestra qSeries cruda y no modifica Qp, Tp, Volumen ni Q(t).
            </div>
          </section>
        );
      })()}
      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
    </main>
  );
}
