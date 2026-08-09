import React, { useState } from "react";

const C = {
  teal: "#14b8a6",
  text: "#e2e8f0",
  muted: "#64748b",
  muted2: "#475569",
  bg: "#0f172a",
  card: "#1e293b",
  border: "#334155",
  accent2: "#f59e0b",
};

export default function SpatialSearchBox() {
  const [tipoEntrada, setTipoEntrada] = useState("latlon");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [este, setEste] = useState("");
  const [norte, setNorte] = useState("");
  const [crs, setCrs] = useState("EPSG:4326");
  const [tipoPunto, setTipoPunto] = useState("desconocido");
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [estadoPunto, setEstadoPunto] = useState("");

  const limpiar = () => {
    setLat(""); setLon(""); setEste(""); setNorte("");
    setCrs("EPSG:4326"); setTipoPunto("desconocido");
    setMostrarResumen(false); setEstadoPunto("");
  };

  const ubicar = () => {
    const punto = tipoEntrada === "latlon"
      ? `(${lat || "?"}, ${lon || "?"})`
      : `E=${este || "?"} N=${norte || "?"}`;
    setEstadoPunto(`Punto recibido: ${punto} | CRS: ${crs} | Tipo: ${tipoPunto}`);
    setMostrarResumen(true);
  };

  const usarAproximado = () => {
    setEstadoPunto("El punto queda marcado como aproximado. Falta validar CRS, red hídrica y outlet.");
  };

  const campo = (label, val, setter, placeholder) => (
    <div style={{ marginBottom: 8 }}>
      <label style={{ fontSize: 10, color: C.muted, display: "block", marginBottom: 2 }}>{label}</label>
      <input
        type="text"
        value={val}
        onChange={(e) => setter(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", padding: "4px 8px", fontSize: 11,
          background: C.bg, color: C.text, border: `1px solid ${C.border}`,
          borderRadius: 4, boxSizing: "border-box",
        }}
      />
    </div>
  );

  const btnStyle = (activo) => ({
    padding: "4px 10px", fontSize: 10, fontWeight: 600,
    background: activo ? C.teal : C.card, color: activo ? "#000" : C.muted,
    border: `1px solid ${activo ? C.teal : C.border}`, borderRadius: 4,
    cursor: "pointer", marginRight: 4, marginBottom: 4,
  });

  return (
    <div style={{
      marginTop: 12, padding: 14, background: C.card, borderRadius: 8,
      border: `1px solid ${C.border}`,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.accent2, marginBottom: 10 }}>
        📍 UBICAR PUNTO
      </div>

      {/* Tipo de entrada */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 10, color: C.muted, display: "block", marginBottom: 4 }}>Tipo de entrada</label>
        {["latlon", "estenorte"].map((t) => (
          <button key={t} style={btnStyle(tipoEntrada === t)} onClick={() => setTipoEntrada(t)}>
            {t === "latlon" ? "Lat / Lon" : "Este / Norte"}
          </button>
        ))}
      </div>

      {/* Campos de coordenadas */}
      {tipoEntrada === "latlon" ? (
        <>
          {campo("Latitud (°)", lat, setLat, "6.274260")}
          {campo("Longitud (°)", lon, setLon, "-75.597869")}
        </>
      ) : (
        <>
          {campo("Este", este, setEste, "831741.85")}
          {campo("Norte", norte, setNorte, "1185811.04")}
        </>
      )}

      {/* CRS */}
      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 10, color: C.muted, display: "block", marginBottom: 4 }}>CRS</label>
        <select
          value={crs}
          onChange={(e) => setCrs(e.target.value)}
          style={{
            width: "100%", padding: "4px 8px", fontSize: 11,
            background: C.bg, color: C.text, border: `1px solid ${C.border}`,
            borderRadius: 4,
          }}
        >
          <option>EPSG:4326</option>
          <option>EPSG:3116</option>
          <option>MAGNA_BOGOTA</option>
          <option>CTM12</option>
          <option>OTRO / DESCONOCIDO</option>
        </select>
      </div>

      {/* Tipo de punto */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 10, color: C.muted, display: "block", marginBottom: 4 }}>Tipo de punto</label>
        <select
          value={tipoPunto}
          onChange={(e) => setTipoPunto(e.target.value)}
          style={{
            width: "100%", padding: "4px 8px", fontSize: 11,
            background: C.bg, color: C.text, border: `1px solid ${C.border}`,
            borderRadius: 4,
          }}
        >
          <option value="obra">Obra</option>
          <option value="visita">Visita</option>
          <option value="camara">Camara</option>
          <option value="puente">Puente</option>
          <option value="descarga">Descarga</option>
          <option value="control">Punto de control</option>
          <option value="outlet">Outlet</option>
          <option value="desconocido">Desconocido</option>
        </select>
      </div>

      {/* Botones */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button onClick={ubicar} style={{
          padding: "5px 14px", fontSize: 11, fontWeight: 600,
          background: C.teal, color: "#000", border: "none", borderRadius: 4, cursor: "pointer",
        }}>
          UBICAR PUNTO
        </button>
        <button onClick={limpiar} style={{
          padding: "5px 14px", fontSize: 11, fontWeight: 600,
          background: C.card, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 4, cursor: "pointer",
        }}>
          LIMPIAR
        </button>
        <button onClick={usarAproximado} style={{
          padding: "5px 14px", fontSize: 11, fontWeight: 600,
          background: "#1e3a5f", color: "#60a5fa", border: "none", borderRadius: 4, cursor: "pointer",
        }}>
          USAR COMO PUNTO APROXIMADO
        </button>
      </div>

      {/* Resumen */}
      {mostrarResumen && (
        <div style={{
          marginTop: 10, padding: 10, background: C.bg, borderRadius: 6,
          border: `1px solid ${C.border}`, fontSize: 10, color: C.muted,
        }}>
          <div style={{ fontWeight: 600, color: C.text, marginBottom: 4 }}>📋 Resumen</div>
          <div>{estadoPunto}</div>
          <div style={{ marginTop: 4, color: C.accent2, fontSize: 9 }}>
            Pendiente de validacion espacial. No se ha verificado red hidrica ni outlet.
          </div>
        </div>
      )}
    </div>
  );
}
