import React from "react";

const C = {
  teal: "#14b8a6", text: "#e2e8f0", muted: "#64748b", bg: "#0f172a",
  card: "#1e293b", border: "#334155", accent2: "#f59e0b", amber: "#f59e0b",
  green: "#22c55e",
};

const badge = (texto, color) => (
  <span style={{
    fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 3,
    background: color || "#334155", color: "#94a3b8",
  }}>{texto}</span>
);

const sectionTitle = (icono, texto) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: C.accent2, marginBottom: 6, marginTop: 12 }}>
    {icono} {texto}
  </div>
);

const row = (label, valor) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}` }}>
    <span style={{ fontSize: 10, color: C.muted }}>{label}</span>
    <span style={{ fontSize: 10, color: C.muted }}>{valor}</span>
  </div>
);

export default function InfluenceStationsWindow() {
  return (
    <div style={{
      marginTop: 12, padding: 14, background: C.card, borderRadius: 8,
      border: `1px solid ${C.border}`,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.teal, marginBottom: 2 }}>
        🛰️ MAPA DE ESTACIONES DE INFLUENCIA
      </div>
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 8 }}>
        Evidencia visual espacial de estaciones, outlet y fuentes hidrometeorologicas.
      </div>

      {/* Aviso */}
      <div style={{
        padding: 8, background: `${C.amber}15`, border: `1px solid ${C.amber}40`,
        borderRadius: 4, fontSize: 9, color: C.amber, marginBottom: 10,
      }}>
        ⚠️ Demo UI — pendiente de conexion a datos reales. No representa estaciones consultadas.
      </div>

      {/* Visor cartografico */}
      {sectionTitle("🗺️", "Visor cartografico")}
      <div style={{
        height: 120, background: C.bg, borderRadius: 6, border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 6,
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%", border: `2px dashed ${C.muted}`,
        }}></div>
        <div style={{ fontSize: 10, color: C.muted, textAlign: "center" }}>
          Visor cartografico pendiente.<br />
          ░ Área de influencia &nbsp; ■ Outlet &nbsp; ● Estacion
        </div>
      </div>

      {/* Outlet */}
      {sectionTitle("🎯", "Estado del outlet")}
      {row("Outlet confirmado", badge("No"))}
      {row("Estado", "Pendiente de validacion espacial")}
      <div style={{ fontSize: 9, color: C.muted, marginTop: 2, fontStyle: "italic" }}>
        La influencia hidrometeorologica definitiva debe asociarse al outlet confirmado.
      </div>

      {/* Estacion adoptada */}
      {sectionTitle("📡", "Estacion adoptada")}
      {row("Estacion adoptada", badge("Pendiente"))}
      {row("Fuente", badge("Pendiente"))}
      {row("Estado", "No evaluado")}
      <div style={{ fontSize: 9, color: C.muted, marginTop: 2, fontStyle: "italic" }}>
        La estacion adoptada actual de HidroFlow no se modifica desde este panel.
      </div>

      {/* Estaciones candidatas */}
      {sectionTitle("📊", "Estaciones candidatas")}
      <table style={{ width: "100%", fontSize: 10, color: C.muted, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            <th style={{ textAlign: "left", padding: 4 }}>Estacion</th>
            <th style={{ textAlign: "left", padding: 4 }}>Distancia</th>
            <th style={{ textAlign: "left", padding: 4 }}>Fuente</th>
            <th style={{ textAlign: "left", padding: 4 }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: `1px solid ${C.border}` }}>
            <td style={{ padding: 4 }}>Pendiente</td>
            <td style={{ padding: 4 }}>Pendiente</td>
            <td style={{ padding: 4 }}>Pendiente</td>
            <td style={{ padding: 4 }}>{badge("No consultado")}</td>
          </tr>
        </tbody>
      </table>

      {/* Fuentes disponibles */}
      {sectionTitle("📂", "Fuentes disponibles")}
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>
        Fuentes posibles: EPM · SIATA · Usuario · Institucional · Otra
      </div>
      {row("Estado", "Pendiente de conexion")}
      <div style={{ fontSize: 9, color: C.muted, marginTop: 2, fontStyle: "italic" }}>
        La existencia de una fuente posible no implica que haya sido consultada.
      </div>

      {/* SIATA Proxy */}
      {sectionTitle("🔌", "SIATA Proxy")}
      {row("Estado", badge("No verificado"))}
      {row("URL esperada", "http://localhost:4000")}
      <div style={{ fontSize: 9, color: C.muted, marginTop: 4 }}>
        Comando: node .\proxy\express-server.js
      </div>
      <button
        onClick={() => alert("Verificacion real pendiente. Este MVP no consulta el proxy todavia.")}
        style={{
          marginTop: 8, padding: "5px 14px", fontSize: 10, fontWeight: 600,
          background: C.green, color: "#000", border: "none", borderRadius: 4, cursor: "pointer",
        }}
      >
        VERIFICAR SIATA PROXY
      </button>
    </div>
  );
}
