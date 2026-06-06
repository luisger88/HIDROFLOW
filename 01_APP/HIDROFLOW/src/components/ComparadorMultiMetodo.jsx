import React, { useEffect, useMemo, useState } from "react";

import { setTcState } from "../agents/tcAgent";
import { calcTc, mapTcResultados } from "../services/hidroEngine";
import { seleccionarTc } from "../services/tcSelector";
import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";

import {
  resumenComparadorCatalogo,
} from "../data/metodosComparadorCatalogo";

import {
  evaluarCompetenciaComparador,
} from "../data/matrizCompetenciaComparador";

import { conceptuarCuenca } from "../data/clasificacionCuenca";

import {
  obtenerAuditoriaPendienteTc,
  obtenerCriterioPendientesAuditoria,
} from "../data/auditoriaPendientesTc";

export default function ComparadorMultiMetodo({ contexto = null }) {

  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");

  // ✅ CONTEXTO BASE
const contextoBase = contexto || {
  cuencaNombre: "Quebrada La Iguaná - PC_80",
  area_km2: 46.8516,
  pendiente_media_pct: 8.43,
  CN: 88,
  lluvia_efectiva: true
};

const fuenteContexto = contexto ? "motor HidroFlow" : "contexto base";

// ✅ DEFINICIÓN REAL DE p
const p = {
  longitud_cauce: 15.524,
  area: contextoBase.area_km2,
  pendiente_cuenca: contextoBase.pendiente_media_pct,
  cota_mayor_cauce: 2819.27,
  cota_menor_cauce: 1511.36,
  cota_max: 2819.27,
  cota_min: 1511.36,
  CN: contextoBase.CN
};

// ✅ EJECUTAR MOTOR
const tcArray = calcTc(p);

// ✅ MAPEAR RESULTADOS
const metodosTc = mapTcResultados(tcArray);

// ✅ CONTEXTO HIDROLÓGICO
const contextoTc = {
  pendiente: contextoBase.pendiente_media_pct,
  area: contextoBase.area_km2,
  CN: contextoBase.CN,
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

  const bruto = contextoBase?.tc_metodos;

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
    Qp: extraerNumero(match, ["Qp", "qp", "q_pico", "caudalPico", "caudal_pico"]),
    Tp: extraerNumero(match, ["Tp", "tp", "t_pico", "tiempoPico", "tiempo_pico"]),
    volumen: extraerNumero(match, ["volumen", "V", "vol", "volume"]),
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
    const datos = metodos.filter((metodo) => metodo.tipo === tipo);

    return (
      <section style={estilos.bloque}>
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
                          {tcValor.toFixed(2)} min
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
        {resultadoQ.Qp.toFixed(2)} m³/s
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
          {resultadoQ.Tp.toFixed(2)} min
        </span>
        <div style={{ ...estilos.muted, marginTop: "4px" }}>
          Tp/Tc: {tpRel !== null ? tpRel.toFixed(2) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? (resultadoQ.volumen / resultadoQ.Qp / 60).toFixed(0) + " min" : "—"}
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

    const areaKm2 = Number(contextoBase?.area_km2);
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
          {resultadoQ.volumen.toFixed(2)}
        </span>
        {estadoEscalaVolumen ? (
          <div style={{ ...estilos.muted, marginTop: "4px" }}>
            {estadoEscalaVolumen} · {relacionVolumen.toFixed(1)}x
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
      {contextoBase?.cuencaNombre ?? "—"}
    </div>

    <div>
      <strong>Área:</strong>{" "}
      {Number.isFinite(contextoBase?.area_km2)
        ? `${contextoBase.area_km2.toFixed(4)} km²`
        : "—"}
    </div>

    <div>
      <strong>Scp cauce principal:</strong>{" "}
      {Number.isFinite(contextoBase?.pendiente_media_pct)
        ? `${contextoBase.pendiente_media_pct} %`
        : "—"}
    </div>

    <div>
      <strong>Longitud cauce:</strong>{" "}
      {Number.isFinite(contextoBase?.longitud_cauce_km)
        ? `${contextoBase.longitud_cauce_km} km`
        : "—"}
    </div>

    <div>
      <strong>CN:</strong>{" "}
      {Number.isFinite(contextoBase?.CN)
        ? contextoBase.CN
        : "—"}
    </div>

    <div>
      <strong>CN base:</strong>{" "}
      {Number.isFinite(contextoBase?.CN_base)
        ? contextoBase.CN_base
        : "—"}
    </div>

    <div>
      <strong>CN efectivo:</strong>{" "}
      {Number.isFinite(contextoBase?.CN_efectivo)
        ? contextoBase.CN_efectivo
        : "—"}
    </div>

    <div>
      <strong>AMC:</strong>{" "}
      {contextoBase?.AMC ?? "—"}
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
          style={estiloBotonFiltro(filtroEstado === "todos")}
          onClick={() => setFiltroEstado("todos")}
        >
          Todos
        </button>

        <button
          type="button"
          style={estiloBotonFiltro(filtroEstado === "activo")}
          onClick={() => setFiltroEstado("activo")}
        >
          Activos
        </button>

        <button
          type="button"
          style={estiloBotonFiltro(filtroEstado === "pendiente")}
          onClick={() => setFiltroEstado("pendiente")}
        >
          Pendientes
        </button>

        <button
          type="button"
          style={estiloBotonFiltro(filtroTipo === "todos")}
          onClick={() => setFiltroTipo("todos")}
        >
          Tc + Q
        </button>

        <button
          type="button"
          style={estiloBotonFiltro(filtroTipo === "tc")}
          onClick={() => setFiltroTipo("tc")}
        >
          Solo Tc
        </button>

        <button
          type="button"
          style={estiloBotonFiltro(filtroTipo === "q")}
          onClick={() => setFiltroTipo("q")}
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
            "- No se alteran Qp, Tp, Volumen ni Q(t)."
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
        onClick={() => {
          const areaKm2 = Number(contextoBase?.area_km2);
          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
          const volumenEsperadoM3 =
            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
              ? areaKm2 * peTotalMm * 1000
              : null;

          const formatearNumeroExpediente = (valor, decimales = 2) =>
            Number.isFinite(Number(valor))
              ? Number(valor).toLocaleString("es-CO", {
                  minimumFractionDigits: decimales,
                  maximumFractionDigits: decimales
                })
              : "—";

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

          const metodosQ5Expediente = metodos.filter((metodo) => metodo.tipo === "q");

          const tablaQ5Markdown = [
            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
            "|---|---:|---:|---:|---|---|",
            ...metodosQ5Expediente.map((metodo) => {
              const resultadoQ = obtenerResultadoQMetodo(metodo);
              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");

              return `| ${nombreMetodo} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
            })
          ];
          const textoExpediente = [
            "# Expediente hidrológico mínimo — Cuenca activa",
            "",
            "## 1. Identificación",
            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
            `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
            `Estación IDF: ${contextoBase?.estacion_idf ?? contextoBase?.estacionIDF ?? "—"}`,
            `Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`,
            `Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`,
            "",
            "## 2. Parámetros hidrológicos base",
            `CN: ${contextoBase?.CN ?? "—"}`,
            `CN base: ${contextoBase?.CN_base ?? "—"}`,
            `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`,
            `AMC: ${contextoBase?.AMC ?? "—"}`,
            "",
            "## 3. Tiempo de concentración y roles Tc",
            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
            "Roles Tc:",
            "- Tc global Índice: referencia hidrológica general.",
            "- Tc operativo Q(t): ruta interna del hidrograma.",
            "- Duración evento: 3 h para almacenamiento/regulación.",
            "- Lag / forma SCS: parámetro derivado para forma temporal.",
            "- Tc comparador: referencia especializada para coherencia Q-5.",
            "",
            "## 4. Volumen de referencia",
            `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
            `Volumen esperado: ${volumenEsperadoM3 ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
            "Fórmula: Pe(mm) × Área(km²) × 1000.",
            "",
            "## 5. Resumen Q-5 auditado",
            "Estado general: diagnóstico no adoptivo.",
            "SCS Unit Hydrograph: candidato principal de referencia.",
            "SCS Mod.: variante ajustable.",
            "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
            "Masa y volumen: controlados frente a referencia física.",
            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
            "",
            "Tabla Q-5 auditada:",
            ...tablaQ5Markdown,
            "",
            "",
            "## 6. Método Racional — contraste global independiente",
            "Uso: contraste global independiente de caudal pico.",
            "Disponibilidad: resultados consultables en el módulo Método Racional.",
            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
            "",
            "## 7. Restricciones técnicas",
            "- No se usaron caudales externos como fundamento.",
            "- No se usó SIATA para justificar caudales.",
            "- No se modifica el motor hidrológico.",
            "- No se recalculan hidrogramas en este expediente.",
            "- No se alteran Qp, Tp, Volumen ni Q(t)."
          ].join("\n");

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
        const areaKm2 = Number(contextoBase?.area_km2);
        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
        const volumenEsperadoM3 =
          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
            ? areaKm2 * peTotalMm * 1000
            : null;

        return volumenEsperadoM3 ? (
          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
          </div>
        ) : null;
      })()}

      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
      </div>

      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.
      </div>

      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
        ⚠ Control de magnitud pendiente: Qp, Tp y Volumen se muestran como resultados no adoptivos hasta validar unidades, integración y escala hidrológica.
      </div>

      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
    </main>
  );
}























