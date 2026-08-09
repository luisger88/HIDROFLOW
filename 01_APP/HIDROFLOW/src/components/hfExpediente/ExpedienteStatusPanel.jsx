import React from "react";

const ESTILOS = {
  block: {
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
    color: "#f59e0b",
    marginBottom: 8,
    letterSpacing: "0.02em",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 11,
    padding: "3px 0",
    color: "#94a3b8",
  },
  label: {
    color: "#94a3b8",
  },
  badge: {
    fontSize: 10,
    fontWeight: 600,
    padding: "1px 6px",
    borderRadius: 3,
  },
};

function badgeStyle(estado) {
  const mapa = {
    "Pendiente": { bg: "#334155", color: "#94a3b8" },
    "Propuesto": { bg: "#1e3a5f", color: "#60a5fa" },
    "Confirmado": { bg: "#14532d", color: "#4ade80" },
    "Bloqueado": { bg: "#7f1d1d", color: "#fca5a5" },
    "En análisis": { bg: "#334155", color: "#94a3b8" },
    "Parcial": { bg: "#713f12", color: "#fbbf24" },
    "Activo": { bg: "#14532d", color: "#4ade80" },
    "No requerido": { bg: "#334155", color: "#94a3b8" },
  };
  return mapa[estado] || { bg: "#334155", color: "#94a3b8" };
}

export default function ExpedienteStatusPanel() {
  return (
    <section className="hf-orq-block hf-orq-medium" style={ESTILOS.block}>
      <div className="hf-orq-block-title" style={ESTILOS.title}>
        📋 Expediente Hidrológico
      </div>

      <div style={ESTILOS.row}>
        <span style={ESTILOS.label}>Estado expediente</span>
        <span style={{ ...ESTILOS.badge, ...badgeStyle("En análisis") }}>En análisis</span>
      </div>

      <div style={ESTILOS.row}>
        <span style={ESTILOS.label}>Outlet</span>
        <span style={{ ...ESTILOS.badge, ...badgeStyle("Pendiente") }}>Pendiente</span>
      </div>

      <div style={ESTILOS.row}>
        <span style={ESTILOS.label}>Cartografía</span>
        <span style={{ ...ESTILOS.badge, ...badgeStyle("Pendiente") }}>Pendiente</span>
      </div>

      <div style={ESTILOS.row}>
        <span style={ESTILOS.label}>Evidencia</span>
        <span style={{ ...ESTILOS.badge, ...badgeStyle("Parcial") }}>Parcial</span>
      </div>

      <div style={ESTILOS.row}>
        <span style={ESTILOS.label}>SIATA</span>
        <span style={{ ...ESTILOS.badge, ...badgeStyle("No requerido") }}>No requerido</span>
      </div>

      <div style={ESTILOS.row}>
        <span style={ESTILOS.label}>C05</span>
        <span style={{ ...ESTILOS.badge, ...badgeStyle("Activo") }}>Activo</span>
      </div>
    </section>
  );
}
