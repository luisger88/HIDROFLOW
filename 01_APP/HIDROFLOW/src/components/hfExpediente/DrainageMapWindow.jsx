import React, { useState, useEffect, useMemo } from "react";

const C = {
  teal: "#14b8a6",
  cyan: "#22d3ee",
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
  const [poligono, setPoligono] = useState(null);
  const [cauce, setCauce] = useState(null);
  const [estadoCuenca, setEstadoCuenca] = useState("cargando");
  const [estadoCauce, setEstadoCauce] = useState("cargando");
  const [error, setError] = useState(null);
  const [sourceCase, setSourceCase] = useState(null);
  const [fuenteCRS, setFuenteCRS] = useState(null);
  const [area, setArea] = useState(null);

  useEffect(() => {
    let cancel = false;

    async function cargarCuenca() {
      try {
        const resp = await fetch("/geojson/cuenca.geojson");
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (cancel) return;

        const crsProp = data.crs?.properties?.name || "desconocido";
        if (!fuenteCRS) setFuenteCRS(crsProp);

        let coords = null;
        if (data.type === "FeatureCollection" && data.features?.length) {
          const geom = data.features[0].geometry;
          if (geom?.type === "Polygon") coords = geom.coordinates;
          else if (geom?.type === "MultiPolygon") coords = geom.coordinates;
        } else if (data.type === "Polygon") {
          coords = data.coordinates;
        }

        if (!coords || !coords.length) {
          setPoligono(null);
          setEstadoCuenca("sin_geometria");
          return;
        }
        setPoligono(coords);
        setEstadoCuenca("listo");
      } catch (e) {
        if (cancel) return;
        setEstadoCuenca("error_carga");
        setError(e.message);
      }
    }

    async function cargarCauce() {
      try {
        const resp = await fetch("/geojson/cauce_ppal_crs84.geojson");
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        if (cancel) return;

        let coords = null;
        if (data.type === "FeatureCollection" && data.features?.length) {
          const geom = data.features[0].geometry;
          if (geom?.type === "LineString") coords = geom.coordinates;
        } else if (data.type === "LineString") {
          coords = data.coordinates;
        }

        if (!coords || !coords.length) {
          setCauce(null);
          setEstadoCauce("sin_geometria");
          return;
        }
        setCauce(coords);
        setEstadoCauce("listo");
      } catch {
        if (cancel) return;
        setEstadoCauce("error_carga");
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
          setEstadoCuenca("listo");
          setFuenteCRS(crsProp);
        } else {
          setEstadoCuenca("sin_geometria");
        }
      } catch {
        setEstadoCuenca("sin_geometria");
      }
      setEstadoCauce("placeholder");
    } else {
      cargarCuenca();
      cargarCauce();
    }

    return () => { cancel = true; };
  }, [geojson, caseName, puntoAportado, outlet, sourceCase, fuenteCRS]);

  useEffect(() => {
    if (areaReferencia) setArea(areaReferencia);
    else if (areaPreliminar) setArea(areaPreliminar);
    if (fuente) setSourceCase(fuente);
    else if (caseName) setSourceCase(caseName);
    if (crs) setFuenteCRS(crs);
  }, [areaReferencia, areaPreliminar, fuente, caseName, crs]);

  const boundingBox = useMemo(() => {
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;

    if (poligono) {
      const ring = Array.isArray(poligono[0][0]) ? poligono[0] : poligono[0];
      for (const [lon, lat] of ring) {
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
    }
    if (cauce) {
      for (const [lon, lat] of cauce) {
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
    }
    if (outlet?.lon && outlet?.lat) {
      const { lon, lat } = outlet;
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }

    if (!isFinite(minLon)) return null;

    const padLon = Math.max((maxLon - minLon) * 0.15, 0.005);
    const padLat = Math.max((maxLat - minLat) * 0.15, 0.005);
    return {
      minLon: minLon - padLon, maxLon: maxLon + padLon,
      minLat: minLat - padLat, maxLat: maxLat + padLat,
    };
  }, [poligono, cauce, outlet]);

  const project = (lon, lat) => {
    if (!boundingBox) return null;
    const W = 600, H = 460, pad = 20, iW = W - 2 * pad, iH = H - 2 * pad;
    const { minLon, maxLon, minLat, maxLat } = boundingBox;
    const x = pad + ((lon - minLon) / (maxLon - minLon)) * iW;
    const y = H - (pad + ((lat - minLat) / (maxLat - minLat)) * iH);
    return { x, y };
  };

  const svgPoints = useMemo(() => {
    if (!poligono || !boundingBox) return null;
    const ring = Array.isArray(poligono[0][0]) ? poligono[0] : poligono[0];
    return ring
      .map(([lon, lat]) => {
        const p = project(lon, lat);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ");
  }, [poligono, boundingBox]);

  const caucePoints = useMemo(() => {
    if (!cauce || !boundingBox) return null;
    return cauce
      .map(([lon, lat]) => {
        const p = project(lon, lat);
        return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
      })
      .join(" ");
  }, [cauce, boundingBox]);

  const outletSVG = useMemo(() => {
    if (!outlet?.lon || !outlet?.lat || !boundingBox) return null;
    return project(outlet.lon, outlet.lat);
  }, [outlet, boundingBox]);

  const puntoSVG = useMemo(() => {
    if (!puntoAportado?.lon || !puntoAportado?.lat || !boundingBox) return null;
    return project(puntoAportado.lon, puntoAportado.lat);
  }, [puntoAportado, boundingBox]);

  const estadoLabelCuenca = {
    cargando: { text: "Cargando...", color: C.muted },
    listo: { text: "Disponible", color: C.accent3 },
    sin_geometria: { text: "No encontrada", color: C.accent2 },
    error_carga: { text: "Error al cargar", color: C.rose },
  }[estadoCuenca] || { text: "Pendiente", color: C.muted2 };

  const estadoLabelCauce = {
    cargando: { text: "Cargando...", color: C.muted },
    listo: { text: "Disponible", color: C.accent3 },
    sin_geometria: { text: "No encontrado", color: C.accent2 },
    error_carga: { text: "Error al cargar", color: C.rose },
    placeholder: { text: "Pendiente", color: C.muted2 },
  }[estadoCauce] || { text: "Pendiente", color: C.muted2 };

  const outletLabel = outlet?.lon && outlet?.lat ? "Disponible" : "Pendiente";
  const outletColor = outlet?.lon && outlet?.lat ? C.accent3 : C.muted2;

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
          ["Fuente", `HF-GEO`],
          ["Caso", caseLabel],
          ["CRS", crsLabel],
          ["Cuenca", estadoLabelCuenca.text],
          ["Cauce principal", estadoLabelCauce.text],
          ["Outlet", outletLabel],
          ["Área", areaLabel],
          ["Motor", "No ejecutado desde este visor"],
          ["Punto aportado", "Pendiente"],
        ].map(([l, v]) => (
          <div key={l} style={{
            background: C.bg, borderRadius: 5, padding: "5px 7px",
            border: `1px solid ${C.border}50`,
          }}>
            <div style={{ color: C.muted, fontSize: 8, marginBottom: 2 }}>{l}</div>
            <div style={{
              color: l === "Cuenca" ? estadoLabelCuenca.color
                : l === "Cauce principal" ? estadoLabelCauce.color
                : l === "Outlet" ? outletColor
                : C.text,
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

            {caucePoints && (
              <polyline
                points={caucePoints}
                fill="none"
                stroke={C.cyan}
                strokeWidth={2}
                strokeOpacity={0.9}
              />
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

            <g transform="translate(12, 414)">
              <rect width={212} height={38} rx={4} fill={`${C.card}DD`} stroke={C.border} strokeWidth={0.5} />
              <rect x={5} y={6} width={16} height={10} rx={2} fill={`${C.teal}30`} stroke={C.teal} strokeWidth={1} />
              <text x={24} y={14} fill={C.muted2} fontSize={6.5} fontFamily={mono}>Cuenca</text>
              {caucePoints && (
                <>
                  <line x1={70} y1={11} x2={90} y2={11} stroke={C.cyan} strokeWidth={2} />
                  <text x={93} y={14} fill={C.muted2} fontSize={6.5} fontFamily={mono}>Cauce</text>
                </>
              )}
              {outletSVG && (
                <>
                  <circle cx={caucePoints ? 140 : 80} cy={11} r={3.5} fill={C.gold} />
                  <text x={caucePoints ? 147 : 87} y={14} fill={C.muted2} fontSize={6.5} fontFamily={mono}>Outlet</text>
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
              {estadoCuenca === "cargando" || estadoCauce === "cargando" ? "⏳" : "⚠"}
            </div>
            <div>
              {estadoCuenca === "cargando"
                ? "Cargando geometría desde HF-GEO..."
                : "Geometría no cargada en UI. No se fabrica evidencia."}
            </div>
            {error && (
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
        <span><span style={{color:C.cyan}}>──</span> Cauce principal</span>
        <span><span style={{color:C.gold}}>◎</span> Outlet</span>
        <span><span style={{color:C.muted}}>■</span> Punto aportado</span>
        <span><span style={{color:C.muted}}>⚠</span> Red hídr. / Est. (no cargadas)</span>
      </div>

      <div style={{ marginTop: 8, fontSize: 7.5, color: C.muted2, textAlign: "center" }}>
        Fuente: HF-GEO · Caso La Iguaná PC_80 · {new Date().toISOString().split("T")[0]} · HF propone, el ingeniero confirma.
      </div>
    </div>
  );
}
