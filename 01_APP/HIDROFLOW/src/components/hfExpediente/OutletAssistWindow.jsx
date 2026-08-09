import React, { useState } from "react";

const C = {
  teal: "#14b8a6",
  text: "#e2e8f0",
  muted: "#64748b",
  bg: "#0f172a",
  card: "#1e293b",
  border: "#334155",
  accent2: "#f59e0b",
  red: "#ef4444",
  green: "#22c55e",
  amber: "#f59e0b",
};

const badge = (texto) => (
  <span style={{
    fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 3,
    background: "#334155", color: "#94a3b8",
  }}>{texto}</span>
);

const row = (label, valor, nota) => (
  <div style={{ padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 10, color: C.muted }}>{label}</span>
      <span style={{ fontSize: 10, color: C.muted }}>{valor}</span>
    </div>
    {nota && <div style={{ fontSize: 9, color: C.muted, marginTop: 2, fontStyle: "italic" }}>{nota}</div>}
  </div>
);

const sectionTitle = (icono, texto) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: C.accent2, marginBottom: 6, marginTop: 14 }}>
    {icono} {texto}
  </div>
);

export default function OutletAssistWindow() {
  const [mensaje, setMensaje] = useState("");

  const btn = (texto, color, msg) => (
    <button
      onClick={() => setMensaje(msg)}
      style={{
        padding: "5px 12px", fontSize: 10, fontWeight: 600,
        background: color, color: color === C.card ? C.muted : "#000",
        border: color === C.card ? `1px solid ${C.border}` : "none",
        borderRadius: 4, cursor: "pointer", marginRight: 6, marginBottom: 4,
      }}
    >
      {texto}
    </button>
  );

  return (
    <div style={{
      marginTop: 12, padding: 14, background: C.card, borderRadius: 8,
      border: `1px solid ${C.border}`,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.teal, marginBottom: 2 }}>
        🎯 VALIDACIÓN ASISTIDA DEL OUTLET
      </div>
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 8 }}>
        HF propone. El ingeniero confirma.
      </div>

      {/* Aviso de demo */}
      <div style={{
        padding: 8, background: `${C.amber}15`, border: `1px solid ${C.amber}40`,
        borderRadius: 4, fontSize: 9, color: C.amber, marginBottom: 10,
      }}>
        ⚠️ Demo UI — pendiente de conexión al motor. No representa resultados hidrológicos reales.
      </div>

      {/* Bloque 1: Punto aportado */}
      {sectionTitle("📍", "Punto aportado por el usuario")}
      {row("Tipo de punto", badge("Pendiente"))}
      {row("Coordenada recibida", badge("Pendiente"))}
      {row("CRS", badge("Pendiente"))}
      {row("Estado", "Punto recibido / pendiente de validación espacial",
        "La coordenada aportada todavía no equivale a outlet confirmado.")}

      {/* Bloque 2: Outlet candidato */}
      {sectionTitle("🔍", "Outlet candidato")}
      {row("Outlet candidato", badge("Pendiente"))}
      {row("Distancia punto-outlet", badge("Pendiente"))}
      {row("Red hídrica", badge("Pendiente"), "HF todavía no ha consultado red hídrica ni ha propuesto outlet real.")}

      {/* Bloque 3: Cuenca preliminar */}
      {sectionTitle("🗺️", "Cuenca preliminar")}
      {row("Área preliminar", badge("Pendiente"))}
      {row("Área de referencia", badge("Pendiente"))}
      {row("Diferencia", badge("Pendiente"))}
      {row("Alerta", badge("Sin evaluar"), "No existe delimitación preliminar conectada al motor.")}

      {/* Bloque 4: Control de aportes intermedios */}
      {sectionTitle("🌊", "Control de aportes intermedios")}
      {row("Tributarios entre obra y outlet", badge("No evaluado"))}
      {row("Confluencias relevantes", badge("No evaluado"))}
      {row("Estado", "Pendiente de análisis espacial",
        "Un punto aguas abajo sólo puede confirmarse si no incorpora aportes intermedios no considerados o si el expediente lo justifica y el ingeniero lo confirma.")}

      {/* Bloque 5: Decisión profesional */}
      {sectionTitle("✅", "Decisión profesional")}
      <div style={{ marginTop: 8 }}>
        {btn("CONFIRMAR OUTLET", C.green, "Confirmación no ejecutada. Este MVP no valida outlet real todavía.")}
        {btn("AJUSTAR OUTLET", C.card, "Ajuste pendiente de mapa, red hídrica y candidatos reales.")}
        {btn("RECHAZAR", C.red, "Rechazo visual no persistido. No se modifica el expediente.")}
      </div>

      {mensaje && (
        <div style={{
          marginTop: 10, padding: 8, background: C.bg, borderRadius: 4,
          border: `1px solid ${C.border}`, fontSize: 10, color: C.muted,
        }}>
          {mensaje}
        </div>
      )}
    </div>
  );
}
