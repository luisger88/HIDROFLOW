import React, { useState, useEffect, useMemo } from "react";

const C = {
  teal: "#14b8a6",
  text: "#e2e8f0",
  muted: "#64748b",
  muted2: "#475569",
  bg: "#0f172a",
  card: "#1e293b",
  border: "#334155",
  accent2: "#f59e0b",
  gold: "#eab308",
  rose: "#f43f5e",
  accent3: "#22c55e",
};

const mono = `"SF Mono","Cascadia Code","Consolas",monospace`;

export default function DrainageMapWindow({
  caseName,
  geojson,
  puntoAportado,
  outlet,
  fuente,
  crs,
  areaReferencia,
  areaPreliminar,
}) {
  const [estado, setEstado] = useState("cargando");
  const [error, setError] = useState(null);
  const [poligono, setPoligono] = useState(null);
  const [sourceCase, setSourceCase] = useState(null);
  const [fuenteCRS, setFuenteCRS] = useState(null);
  const [area, setArea] = useState(null);

  useEffect(() => {
    let cancel = false;

    async function cargar() {
      try {
        const resp = await fetch("/geojson/cuenca.geojson");
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (cancel) return;

        const crsProp = data.crs?.properties?.name || "desconocido";
        const esWGS84 = crsProp.includes("CRS84") || crsProp.includes("4326");

        let coords = null;
        if (data.type === "FeatureCollection" && data.features?.length) {
          const geom = data.features[0].geometry;
          if (geom?.type === "Polygon") {
            coords = geom.coordinates;
          } else if (geom?.type === "MultiPolygon") {
            coords = geom.coordinates;
          }
        } else if (data.type === "Polygon") {
          coords = data.coordinates;
        }

        if (!coords || !coords.length) {
          setPoligono(null);
          setEstado("sin_geometria");
          setFuenteCRS(crsProp);
          return;
        }

        setPoligono(coords);
        setEstado("listo");
        setFuenteCRS(crsProp);
        if (sourceCase) setSourceCase(sourceCase);
        if (!esWGS84) {
          setError("El CRS del GeoJSON no es WGS84/CRS84. Se muestra geometría sin transformación de coordenadas.");
        }
      } catch (e) {
        if (cancel) return;
        setEstado("error_carga");
        setError(e.message);
      }
    }

    if (geojson) {
      try {
        const data = typeof geojson === "string" ? JSON.parse(geojson) : geojson;
        const crsProp = data.crs?.properties?.name || "desconocido";
        let coords = null;
        if (data.type === "FeatureCollection" && data.features?.length) {
          coords = data.features[0].geometry?.coordinates;
        } else if (data.type === "Polygon") {
          coords = data.coordinates;
        }
        if (coords?.length) {
          setPoligono(coords);
          setEstado("listo");
          setFuenteCRS(crsProp);
        } else {
          setEstado("sin_geometria");
        }
      } catch {
        setEstado("sin_geometria");
      }
    } else {
      cargar();
    }

    return () => { cancel = true; };
  }, [geojson, caseName, puntoAportado, outlet, sourceCase]);

  useEffect(() => {
    if (areaReferencia) setArea(areaReferencia);
    else if (areaPreliminar) setArea(areaPreliminar);
    if (fuente) setSourceCase(fuente);
    else if (caseName) setSourceCase(caseName);
    if (crs) setFuenteCRS(crs);
  }, [areaReferencia, areaPreliminar, fuente, caseName, crs]);

  const boundingBox = useMemo(() => {
    if (!poligono) return null;
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    const ring = Array.isArray(poligono[0][0]) ? poligono[0] : poligono[0];
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    const padLon = Math.max((maxLon - minLon) * 0.15, 0.005);
    const padLat = Math.max((maxLat - minLat) * 0.15, 0.005);
    return {
      minLon: minLon - padLon, maxLon: maxLon + padLon,
      minLat: minLat - padLat, maxLat: maxLat + padLat,
    };
  }, [poligono]);

  const svgPoints = useMemo(() => {
    if (!poligono || !boundingBox) return null;
    const W = 600, H = 460, pad = 20, iW = W - 2 * pad, iH = H - 2 * pad;
    const { minLon, maxLon, minLat, maxLat } = boundingBox;
    const ring = Array.isArray(poligono[0][0]) ? poligono[0] : poligono[0];
    return ring
      .map(([lon, lat]) => {
        const x = pad + ((lon - minLon) / (maxLon - minLon)) * iW;
        const y = H - (pad + ((lat - minLat) / (maxLat - minLat)) * iH);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  }, [poligono, boundingBox]);

  const outletSVG = useMemo(() => {
    if (!outlet || !boundingBox) return null;
    const W = 600, H = 460, pad = 20, iW = W - 2 * pad, iH = H - 2 * pad;
    const { minLon, maxLon, minLat, maxLat } = boundingBox;
    const x = pad + ((outlet.lon - minLon) / (maxLon - minLon)) * iW;
    const y = H - (pad + ((outlet.lat - minLat) / (maxLat - minLat)) * iH);
    return { x, y };
  }, [outlet, boundingBox]);

  const puntoSVG = useMemo(() => {
    if (!puntoAportado || !boundingBox) return null;
    const W = 600, H = 460, pad = 20, iW = W - 2 * pad, iH = H - 2 * pad;
    const { minLon, maxLon, minLat, maxLat } = boundingBox;
    const x = pad + ((puntoAportado.lon - minLon) / (maxLon - minLon)) * iW;
    const y = H - (pad + ((puntoAportado.lat - minLat) / (maxLat - minLat)) * iH);
    return { x, y };
  }, [puntoAportado, boundingBox]);

  const estadoLabel = {
    cargando: { text: "Cargando...", color: C.muted },
    listo: { text: "Geometría disponible", color: C.accent3 },
    sin_geometria: { text: "Geometría no encontrada en GeoJSON", color: C.accent2 },
    error_carga: { text: "Error al cargar geometría", color: C.rose },
    placeholder: { text: "Pendiente de conexión real", color: C.muted2 },
  }[estado] || { text: "Desconocido", color: C.muted };

  const caseLabel = sourceCase || caseName || "No especificado";
  const crsLabel = fuenteCRS || crs || "Pendiente";
  const areaLabel = area ? `${area} km²` : "Pendiente";

  return (
    <div style={{
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 8,
      padding: 14, fontFamily: mono, fontSize: 10, color: C.text,
      marginTop: 10,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
        VISOR DE CUENCA Y DRENAJE
      </div>
      <div style={{ color: C.muted, fontSize: 9, marginBottom: 10 }}>
        Evidencia espacial de referencia del expediente.
      </div>

      <div style={{
        background: "#0b1820", border: `1px solid ${C.border}`, borderRadius: 6,
        padding: "6px 10px", marginBottom: 10, fontSize: 8.5, color: C.muted2,
      }}>
        Visor de referencia — no es mapa navegable. No ejecuta cálculos.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[
          ["Fuente", `HF-GEO / cuenca.geojson`],
          ["Caso", caseLabel],
          ["CRS", crsLabel],
          ["Geometría", estadoLabel.text],
          ["Área", areaLabel],
          ["Motor", "No ejecutado desde este visor"],
        ].map(([l, v]) => (
          <div key={l} style={{
            background: C.bg, borderRadius: 5, padding: "5px 7px",
            border: `1px solid ${C.border}50`,
          }}>
            <div style={{ color: C.muted, fontSize: 8, marginBottom: 2 }}>{l}</div>
            <div style={{
              color: l === "Geometría" ? estadoLabel.color : C.text,
              fontWeight: 600, fontSize: 9.5,
            }}>{v}</div>
          </div>
        ))}
      </div>

      {error && (
        <div style={{
          marginBottom: 10, padding: "6px 10px", borderRadius: 5,
          background: `${C.rose}18`, border: `1px solid ${C.rose}30`,
          fontSize: 8.5, color: C.rose,
        }}>
          {error}
        </div>
      )}

      <div style={{
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: 6,
        overflow: "hidden", position: "relative",
      }}>
        {svgPoints ? (
          <svg viewBox="0 0 600 460" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <radialGradient id="bgGradDrain" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="#0B1820" />
                <stop offset="100%" stopColor="#070910" />
              </radialGradient>
            </defs>
            <rect width={600} height={460} fill="url(#bgGradDrain)" />

            {boundingBox && (
              <>
                {[0, 0.25, 0.5, 0.75, 1].map(f => {
                  const lon = boundingBox.minLon + (boundingBox.maxLon - boundingBox.minLon) * f;
                  const x = 20 + ((lon - boundingBox.minLon) / (boundingBox.maxLon - boundingBox.minLon)) * 560;
                  return (
                    <g key={`v${f}`}>
                      <line x1={x} y1={20} x2={x} y2={440} stroke={C.border} strokeWidth={0.3} opacity={0.4} />
                      <text x={x + 2} y={435} fill={C.muted2} fontSize={7} fontFamily={mono} opacity={0.7}>
                        {lon.toFixed(4)}°
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            <polygon
              points={svgPoints}
              fill={`${C.teal}18`}
              stroke={C.teal}
              strokeWidth={2}
              strokeOpacity={0.8}
            />

            {outletSVG && (
              <>
                <circle cx={outletSVG.x} cy={outletSVG.y} r={8} fill={C.gold} opacity={0.9} />
                <circle cx={outletSVG.x} cy={outletSVG.y} r={12} fill="none" stroke={C.gold} strokeWidth={1.5} opacity={0.4} />
                <text x={outletSVG.x + 14} y={outletSVG.y + 4} fill={C.gold} fontSize={9} fontFamily={mono} fontWeight={700}>
                  Outlet
                </text>
              </>
            )}

            {puntoSVG && !outletSVG && (
              <>
                <circle cx={puntoSVG.x} cy={puntoSVG.y} r={7} fill={C.rose} opacity={0.9} />
                <circle cx={puntoSVG.x} cy={puntoSVG.y} r={11} fill="none" stroke={C.rose} strokeWidth={1.5} opacity={0.35} />
                <text x={puntoSVG.x + 13} y={puntoSVG.y + 4} fill={C.rose} fontSize={9} fontFamily={mono} fontWeight={700}>
                  Punto
                </text>
              </>
            )}

            <g transform="translate(12, 420)">
              <rect width={155} height={32} rx={4} fill={`${C.card}DD`} stroke={C.border} strokeWidth={0.5} />
              <rect x={5} y={6} width={18} height={12} rx={2} fill={`${C.teal}30`} stroke={C.teal} strokeWidth={1} />
              <text x={27} y={15} fill={C.muted2} fontSize={7} fontFamily={mono}>Cuenca</text>
              {outletSVG && (
                <>
                  <circle cx={78} cy={12} r={4} fill={C.gold} />
                  <text x={85} y={15} fill={C.muted2} fontSize={7} fontFamily={mono}>Outlet</text>
                </>
              )}
            </g>
          </svg>
        ) : (
          <div style={{
            padding: "50px 20px", textAlign: "center", color: C.muted2,
            fontSize: 10,
          }}>
            <div style={{ fontSize: 32, marginBottom: 10, opacity: 0.35 }}>
              {estado === "cargando" ? "⏳" : "⚠"}
            </div>
            <div>
              {estado === "cargando"
                ? "Cargando geometría desde HF-GEO..."
                : "Geometría no cargada en UI. No se fabrica evidencia."}
            </div>
            {estado === "error_carga" && error && (
              <div style={{ marginTop: 6, color: C.rose }}>{error}</div>
            )}
          </div>
        )}
      </div>

      <div style={{
        marginTop: 10, padding: "6px 8px", borderRadius: 5,
        background: `${C.muted}10`, border: `1px solid ${C.border}50`,
        fontSize: 8, color: C.muted2,
        display: "flex", flexWrap: "wrap", gap: 12,
      }}>
        <span><span style={{color:C.teal}}>░</span> Cuenca</span>
        <span><span style={{color:C.gold}}>◎</span> Outlet</span>
        <span><span style={{color:C.rose}}>■</span> Punto aportado</span>
        <span><span style={{color:C.muted}}>──</span> Red hídrica</span>
        <span><span style={{color:C.muted}}>⚠</span> Pendiente de conexión</span>
      </div>

      <div style={{ marginTop: 8, fontSize: 7.5, color: C.muted2, textAlign: "center" }}>
        Fuente: HF-GEO · Caso La Iguaná PC_80 · {new Date().toISOString().split("T")[0]} · HF propone, el ingeniero confirma.
      </div>
    </div>
  );
}
