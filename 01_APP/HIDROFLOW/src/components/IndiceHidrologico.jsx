import React, { useState, useEffect } from "react";
import { getTcState, subscribeTc } from "../agents/tcAgent";

export default function IndiceHidrologico({
  goToTab: goToTabProp,
  contexto,
  tabActiva: tabActivaProp = "params",
  tab = "params",
  setTab,
  setTabActiva,
  cambiarTab,
  navegarA,
}) {
  // --- Estado reactivo del Agente Tc ---
  const [tcState, setTcStateLocal] = useState(getTcState());

  useEffect(() => {
    const unsubscribe = subscribeTc(setTcStateLocal);
    return () => unsubscribe();
  }, []);

  const valoresTcAgente = Object.values(tcState?.metodosTc || {})
  .map((valor) => Number(valor))
  .filter((valor) => Number.isFinite(valor) && valor > 0);

const rangoTcAgente =
  valoresTcAgente.length > 0
    ? {
        min: Math.min(...valoresTcAgente),
        max: Math.max(...valoresTcAgente),
      }
    : null;

  // -------------------------------------
  const {
    tabActiva = "params",
    area_km2 = null,
    estacionesAdoptadas = [],
    metodoIDF = "—",
    distribucionTemporal = "—",

    // SCS-CN / motor
    CN = null,
    CN_base = null,
    CN_efectivo = null,
    AMC = "II",
    S_mm = null,
    Ia_mm = null,
    porcentaje_impermeable = null,

    // Racional
    C = null,
    racional = null,

    // Cuenca
    cuencaNombre = "Cuenca activa",
    puntoControl = "PC",
    pendiente_media_pct = null,
    estadoTecnico = "En validación",

    // IDF futura
    referenciaIDFPendiente = [],
    ponderacionIDFPendiente = false,

    // Tc
    tc = null,
    tc_sugerido_min = null,
    tc_metodos = [],
    tc_resumen = null,

    // Periodos de retorno
    periodos_retorno = [],

    // Resumen completo futuro
    resumenMotor = null,
  } = contexto || {};

  const tabActual = tabActivaProp || tabActiva || tab || "params";

  const normalizarTab = (valor) => {
    if (!valor) return "";

    const texto = String(valor).trim().toLowerCase();

    const alias = {
      params: "params",
      parametros: "params",
      parámetros: "params",
      parametro: "params",
      parámetro: "params",

      idf: "idf",
      curvas_idf: "idf",
      lluvia_diseno: "idf",
      lluvia_diseño: "idf",

      hiet: "hietogramas",
      hieto: "hietogramas",
      hietograma: "hietogramas",
      hietogramas: "hietogramas",
      distribucion_temporal: "hietogramas",
      distribución_temporal: "hietogramas",
      temporal: "hietogramas",

      hidro: "hidrogramas",
      hidrograma: "hidrogramas",
      hidrogramas: "hidrogramas",
      hidrograma_unitario: "hidrogramas",
      lluvia_efectiva: "hidrogramas",
      scs_cn: "hidrogramas",
      scs: "hidrogramas",

      racional: "racional",
      metodo_racional: "racional",
      método_racional: "racional",
      racional_qp: "racional",
      tc: "racional",
      tiempo_concentracion: "racional",
      tiempo_concentración: "racional",

      resultados: "resultados",
      resultado: "resultados",
      export: "export",
      exportar: "export",
      influencia: "influencia",
      influencia_idf: "influencia",
      ponderacion: "influencia",
      ponderación: "influencia",
    };

    return alias[texto] || texto;
  };

  const esActivo = (clave) => {
    return normalizarTab(tabActual) === normalizarTab(clave);
  };

  const goToTab = (destino) => {
    const cambiar =
      goToTabProp ||
      setTab ||
      setTabActiva ||
      cambiarTab ||
      navegarA;

    if (typeof cambiar === "function") {
      cambiar(destino);
    }
  };

  const claseTarjeta = (clave) => {
    const activo = esActivo(clave);

    return [
      "rounded-2xl border p-3 transition-all duration-200",
      activo
        ? "border-cyan-300 bg-cyan-950/80 shadow-[0_0_0_1px_rgba(34,211,238,0.45),0_0_18px_rgba(34,211,238,0.16)]"
        : "border-cyan-900/70 bg-slate-950/70",
    ].join(" ");
  };

  const claseBoton = (clave) => {
    const activo = esActivo(clave);

    return [
      "w-full rounded-lg border px-3 py-2 text-left text-xs font-bold transition-all duration-200",
      activo
        ? "border-cyan-300 bg-cyan-400/20 text-cyan-50 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
        : "border-cyan-800 bg-cyan-950/40 text-cyan-100 hover:border-cyan-400 hover:bg-cyan-900/60",
    ].join(" ");
  };

  const irA = (destino) => {
    goToTab(destino);
  };

  const formatNumero = (valor, decimales = 2) => {
    if (valor === null || valor === undefined || valor === "") return "—";
    const n = Number(valor);
    if (!Number.isFinite(n)) return String(valor);
    return n.toLocaleString("es-CO", {
      minimumFractionDigits: decimales,
      maximumFractionDigits: decimales,
    });
  };

  const formatPeso = (peso) => {
    const n = Number(peso);
    if (!Number.isFinite(n)) return "—";

    // Acepta peso en escala 0-1 o 0-100.
    const pct = n <= 1 ? n * 100 : n;
    return `${Math.round(pct)} %`;
  };

  const formatTR = (p) => {
    if (p?.etiqueta) return p.etiqueta;
    if (p?.tr !== undefined) return `Tr ${p.tr} años`;
    if (typeof p === "number") return `Tr ${p} años`;
    return "Tr —";
  };

  const estaciones = Array.isArray(estacionesAdoptadas)
    ? estacionesAdoptadas
    : [];

  const referenciasPendientes = Array.isArray(referenciaIDFPendiente)
    ? referenciaIDFPendiente
    : [];

  const metodosTc = Array.isArray(tc_metodos)
    ? tc_metodos
    : Array.isArray(tc?.metodos)
    ? tc.metodos
    : [];

  const resumenTc = tc_resumen || tc?.resumen || null;

  const periodos = Array.isArray(periodos_retorno)
    ? periodos_retorno
    : [];

  const estilos = {
    panel: {
      width: "250px",
      minWidth: "250px",
      maxWidth: "250px",
      height: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
      padding: "12px",
      boxSizing: "border-box",
      background:
        "linear-gradient(180deg, #07111f 0%, #050b14 48%, #03070d 100%)",
      color: "#dff8ff",
      borderRight: "1px solid rgba(0, 210, 255, 0.22)",
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: "12px",
      lineHeight: 1.35,
    },

    titulo: {
      margin: "0 0 8px 0",
      color: "#ffffff",
      fontSize: "15px",
      fontWeight: 900,
      letterSpacing: "0.01em",
      lineHeight: 1.15,
    },

    subtitulo: {
      margin: "0 0 12px 0",
      color: "#7fa8c5",
      fontSize: "10px",
      fontFamily: "monospace",
    },

    card: {
      marginBottom: "10px",
      padding: "10px",
      borderRadius: "12px",
      background:
        "linear-gradient(180deg, rgba(12, 30, 50, 0.92), rgba(7, 18, 32, 0.92))",
      border: "1px solid rgba(0, 210, 255, 0.16)",
      boxShadow: "0 8px 22px rgba(0,0,0,0.18)",
    },

    cardTitle: {
      margin: "0 0 7px 0",
      color: "#00e5ff",
      fontSize: "11px",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },

    texto: {
      margin: "4px 0",
      color: "#dff8ff",
      fontSize: "11px",
    },

    muted: {
      color: "#88a7bd",
      fontSize: "10px",
    },

    dato: {
      display: "flex",
      justifyContent: "space-between",
      gap: "8px",
      margin: "5px 0",
      paddingBottom: "4px",
      borderBottom: "1px dashed rgba(125, 170, 205, 0.12)",
    },

    label: {
      color: "#89a9bf",
      fontSize: "10px",
    },

    value: {
      color: "#ffffff",
      fontWeight: 800,
      fontSize: "10.5px",
      textAlign: "right",
    },

    chipRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "5px",
      marginTop: "6px",
    },

    chip: {
      display: "inline-flex",
      alignItems: "center",
      padding: "3px 7px",
      borderRadius: "999px",
      background: "rgba(0, 210, 255, 0.10)",
      border: "1px solid rgba(0, 210, 255, 0.26)",
      color: "#bff8ff",
      fontSize: "10px",
      fontWeight: 700,
      whiteSpace: "nowrap",
    },

    chipOk: {
      background: "rgba(0, 230, 184, 0.12)",
      border: "1px solid rgba(0, 230, 184, 0.34)",
      color: "#9fffe8",
    },

    chipWarn: {
      background: "rgba(255, 209, 102, 0.12)",
      border: "1px solid rgba(255, 209, 102, 0.36)",
      color: "#ffd166",
    },

    chipDanger: {
      background: "rgba(255, 95, 95, 0.10)",
      border: "1px solid rgba(255, 95, 95, 0.30)",
      color: "#ffb0b0",
    },

    button: {
      width: "100%",
      marginTop: "7px",
      padding: "6px 8px",
      borderRadius: "8px",
      border: "1px solid rgba(0, 210, 255, 0.26)",
      background: "rgba(0, 210, 255, 0.08)",
      color: "#dff8ff",
      fontSize: "10px",
      fontWeight: 800,
      cursor: "pointer",
      textAlign: "left",
    },

    smallButton: {
      marginTop: "6px",
      padding: "5px 7px",
      borderRadius: "7px",
      border: "1px solid rgba(130, 170, 205, 0.20)",
      background: "rgba(255,255,255,0.035)",
      color: "#cceeff",
      fontSize: "10px",
      fontWeight: 700,
      cursor: "pointer",
    },

    separator: {
      margin: "10px 0",
      height: "1px",
      background:
        "linear-gradient(90deg, rgba(0,210,255,0), rgba(0,210,255,0.35), rgba(0,210,255,0))",
    },
  };

  const estiloTarjeta = (clave) => {
    const activo = esActivo(clave);

    return {
      ...estilos.card,
      border: activo ? "1px solid rgba(34, 211, 238, 0.95)" : estilos.card.border,
      background: activo
        ? "linear-gradient(180deg, rgba(8, 47, 73, 0.98), rgba(2, 22, 36, 0.98))"
        : estilos.card.background,
      boxShadow: activo
        ? "0 0 0 1px rgba(34, 211, 238, 0.35), 0 0 18px rgba(34, 211, 238, 0.16)"
        : estilos.card.boxShadow,
    };
  };

  const estiloBoton = (clave) => {
    const activo = esActivo(clave);

    return {
      ...estilos.button,
      border: activo ? "1px solid rgba(34, 211, 238, 0.95)" : estilos.button.border,
      background: activo ? "rgba(34, 211, 238, 0.18)" : estilos.button.background,
      color: activo ? "#ecfeff" : estilos.button.color,
      boxShadow: activo
        ? "0 0 0 1px rgba(34, 211, 238, 0.35)"
        : estilos.button.boxShadow,
    };
  };

  return (
    <aside style={estilos.panel}>
      <h2 style={estilos.titulo}>Índice Hidrológico de la Cuenca</h2>

      <p style={estilos.subtitulo}>
        Panel lector · La Iguaná PC_80 · Motor HidroFlow
      </p>

      {/* 0. Cuenca activa */}
      <section style={estiloTarjeta("params")}>
        <h3 style={estilos.cardTitle}>● Cuenca activa</h3>

        <p style={estilos.texto}>
          <strong>{cuencaNombre}</strong>
        </p>

        <div style={estilos.dato}>
          <span style={estilos.label}>Punto de control</span>
          <span style={estilos.value}>{puntoControl}</span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Área</span>
          <span style={estilos.value}>
            {formatNumero(area_km2, 4)} km²
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Pendiente media</span>
          <span style={estilos.value}>
            {formatNumero(pendiente_media_pct, 2)} %
          </span>
        </div>

        <div style={estilos.chipRow}>
          <span style={{ ...estilos.chip, ...estilos.chipOk }}>
            Geometría validada
          </span>
          <span style={estilos.chip}>{estadoTecnico}</span>
        </div>
      </section>

      {/* 1. IDF */}
      <section style={estiloTarjeta("idf")}>
        <h3 style={estilos.cardTitle}>① Lluvia de diseño IDF</h3>

        <div style={estilos.dato}>
          <span style={estilos.label}>Método adoptado</span>
          <span style={estilos.value}>{metodoIDF}</span>
        </div>

        <p style={estilos.muted}>Estaciones con influencia operativa:</p>

        {estaciones.length > 0 ? (
          <div style={estilos.chipRow}>
            {estaciones.map((e, i) => (
              <span
                key={`${e.nombre || "estacion"}-${i}`}
                style={{ ...estilos.chip, ...estilos.chipOk }}
              >
                {e.nombre || "Estación"} · {formatPeso(e.peso)}
              </span>
            ))}
          </div>
        ) : (
          <p style={estilos.texto}>—</p>
        )}

        {ponderacionIDFPendiente && (
          <>
            <div style={estilos.separator} />

            <p style={estilos.muted}>
              Ponderación IDF multiestación pendiente de cálculo formal.
            </p>

            <div style={estilos.chipRow}>
              <span style={{ ...estilos.chip, ...estilos.chipWarn }}>
                IDW / Thiessen / altitud · pendiente
              </span>
            </div>
          </>
        )}

        {referenciasPendientes.length > 0 && (
          <>
            <div style={estilos.separator} />
            <p style={estilos.muted}>
              Referencias externas registradas, no operativas:
            </p>
            <div style={estilos.chipRow}>
              {referenciasPendientes.map((ref, i) => (
                <span
                  key={`${ref.nombre || ref.id || "ref"}-${i}`}
                  style={{ ...estilos.chip, ...estilos.chipWarn }}
                >
                  {ref.nombre || ref.id} · no operativa
                </span>
              ))}
            </div>
          </>
        )}

        <button style={estiloBoton("idf")} onClick={() => goToTab("idf")}>
          Ver curvas IDF
        </button>
      </section>

      {/* 2. Distribución temporal */}
      <section style={estiloTarjeta("hietogramas")}>
        <h3 style={estilos.cardTitle}>② Distribución temporal</h3>

        <div style={estilos.dato}>
          <span style={estilos.label}>Curva adoptada</span>
          <span style={estilos.value}>{distribucionTemporal}</span>
        </div>

        <p style={estilos.muted}>
          Define la concentración temporal de la lluvia y controla el pico de
          caudal.
        </p>

        <button style={estiloBoton("hietogramas")} onClick={() => goToTab("hiet")}>
          Analizar distribución temporal
        </button>
      </section>

      {/* 3. Lluvia efectiva */}
      <section style={estiloTarjeta("hidrogramas")}>
        <h3 style={estilos.cardTitle}>③ Lluvia efectiva SCS-CN</h3>

        <div style={estilos.dato}>
          <span style={estilos.label}>CN base</span>
          <span style={estilos.value}>
            {CN_base !== null && CN_base !== undefined
              ? formatNumero(CN_base, 1)
              : "—"}
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>CN efectivo</span>
          <span style={estilos.value}>
            {CN_efectivo !== null && CN_efectivo !== undefined
              ? formatNumero(CN_efectivo, 1)
              : CN !== null && CN !== undefined
              ? formatNumero(CN, 1)
              : "—"}
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>AMC</span>
          <span style={estilos.value}>{AMC || "II"}</span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>S</span>
          <span style={estilos.value}>
            {S_mm !== null && S_mm !== undefined
              ? `${formatNumero(S_mm, 2)} mm`
              : "—"}
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Ia</span>
          <span style={estilos.value}>
            {Ia_mm !== null && Ia_mm !== undefined
              ? `${formatNumero(Ia_mm, 2)} mm`
              : "—"}
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Impermeabilidad</span>
          <span style={estilos.value}>
            {porcentaje_impermeable !== null &&
            porcentaje_impermeable !== undefined
              ? `${formatNumero(porcentaje_impermeable, 1)} %`
              : "—"}
          </span>
        </div>

        <p style={estilos.muted}>
          Parámetros leídos desde el resumen oficial del motor SCS-CN.
        </p>

        <div style={estilos.chipRow}>
          <span style={estilos.chip}>SCS-CN</span>
          <span style={estilos.chip}>AMC/SIATA</span>
          <span style={estilos.chip}>S · Ia</span>
        </div>

        <button style={estiloBoton("hidrogramas")} onClick={() => goToTab("hidro")}>
          Ver lluvia efectiva Pe(t)
        </button>
      </section>

      {/* 4. Tiempo de concentración */}
<section style={estiloTarjeta("racional")}>
  <h3 style={estilos.cardTitle}>④ Tiempo de concentración Tc</h3>

  <div style={estilos.dato}>
    <span style={estilos.label}>Tc sugerido</span>
    <span style={estilos.value}>
      {tcState?.Tc_final !== null && tcState?.Tc_final !== undefined
        ? `${formatNumero(tcState.Tc_final, 1)} min`
        : "—"}
    </span>
  </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Métodos válidos</span>
<span style={estilos.value}>
  {valoresTcAgente.length > 0
    ? valoresTcAgente.length
    : resumenTc?.n ?? metodosTc?.length ?? "—"}
</span>
        </div>

        <div style={estilos.dato}>
  <span style={estilos.label}>Rango bruto Tc</span>
  <span style={estilos.value}>
    {rangoTcAgente
      ? `${formatNumero(rangoTcAgente.min, 1)}–${formatNumero(
          rangoTcAgente.max,
          1
        )} min`
      : resumenTc?.min_min !== null &&
        resumenTc?.min_min !== undefined &&
        resumenTc?.max_min !== null &&
        resumenTc?.max_min !== undefined
      ? `${formatNumero(resumenTc.min_min, 1)}–${formatNumero(
          resumenTc.max_min,
          1
        )} min`
      : "—"}
  </span>
</div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Rango competente Tc</span>
          <span style={estilos.value}>
            {tcState?.rangoCompetenteTc
              ? formatNumero(tcState.rangoCompetenteTc.min, 1) + "–" +
                formatNumero(tcState.rangoCompetenteTc.max, 1) + " min"
              : "—"}
          </span>
        </div>

        {tcState?.Tc_final !== null &&
          tcState?.Tc_final !== undefined &&
          tcState?.rangoCompetenteTc?.min !== undefined &&
          tcState?.rangoCompetenteTc?.max !== undefined &&
          tcState.rangoCompetenteTc.max > tcState.rangoCompetenteTc.min &&
          (tcState.Tc_final - tcState.rangoCompetenteTc.min) /
            (tcState.rangoCompetenteTc.max - tcState.rangoCompetenteTc.min) <= 0.15 ? (
          <p style={estilos.muted}>
            ⚠ Advertencia técnica: el Tc sugerido está cerca del borde inferior del rango competente. Se recomienda revisar sensibilidad con escenario rápido, sugerido y lento antes de adoptarlo como valor único robusto.
          </p>
        ) : null}

        <p style={estilos.muted}>
          El Tc sugerido corresponde al resumen estadístico del motor. El Tc
          adoptado definitivo queda pendiente de criterio técnico.
        </p>

        <div style={estilos.chipRow}>
          {metodosTc.length > 0 ? (
            metodosTc.map((m, i) => (
              <span key={`${m.m || "tc"}-${i}`} style={estilos.chip}>
                {m.m?.replace(" (", " · ").replace(")", "") || "Tc"}
              </span>
            ))
          ) : (
            <>
              <span style={estilos.chip}>Témez</span>
              <span style={estilos.chip}>Kirpich</span>
              <span style={estilos.chip}>California</span>
              <span style={estilos.chip}>Giandotti</span>
              <span style={estilos.chip}>SCS-Ranser</span>
              <span style={estilos.chip}>Pérez-Montg.</span>
            </>
          )}
        </div>

        <button style={estiloBoton("racional")} onClick={() => goToTab("racional")}
          >
        Analizar Tc
        </button>
      </section>

      {/* 5. Periodos de retorno */}
      <section style={estiloTarjeta("racional")}>
        <h3 style={estilos.cardTitle}>⑤ Periodos de retorno</h3>

        <p style={estilos.muted}>
          Escenarios activos para cálculo hidrológico.
        </p>

        <div style={estilos.chipRow}>
          {periodos.length > 0 ? (
            periodos.map((p, i) => {
              const tr = p?.tr ?? p;
              const esBase = Number(tr) === 2.33;

              return (
                <span
                  key={`tr-${tr}-${i}`}
                  style={{
                    ...estilos.chip,
                    ...(esBase ? estilos.chipOk : {}),
                  }}
                >
                  {formatTR(p)}
                </span>
              );
            })
          ) : (
            <>
              <span style={{ ...estilos.chip, ...estilos.chipOk }}>
                Tr 2.33 años
              </span>
              <span style={estilos.chip}>Tr 5 años</span>
              <span style={estilos.chip}>Tr 10 años</span>
              <span style={estilos.chip}>Tr 25 años</span>
              <span style={estilos.chip}>Tr 50 años</span>
              <span style={estilos.chip}>Tr 100 años</span>
            </>
          )}
        </div>
      </section>

      {/* 6. Hidrograma */}
      <section style={estiloTarjeta("hidrogramas")}>
        <h3 style={estilos.cardTitle}>⑥ Hidrograma Q(t)</h3>

        <p style={estilos.muted}>
          Compara la respuesta hidrológica por métodos SCS, Snyder, Clark,
          Williams & Hann y otros módulos activos.
        </p>

        <button style={estilos.button} onClick={() => goToTab("hidro")}>
          Ver hidrogramas
        </button>
      </section>

      {/* 7. Método racional */}
      <section style={estiloTarjeta("racional")}>
        <h3 style={estilos.cardTitle}>⑦ Método racional</h3>

        <div style={estilos.dato}>
          <span style={estilos.label}>Uso recomendado</span>
          <span style={estilos.value}>
            {racional?.uso_recomendado || "Solo contraste referencial"}
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Criterio área</span>
          <span style={estilos.value}>
            A ≤ {racional?.umbral_competencia_km2 ?? 5} km²
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Área cuenca</span>
          <span style={estilos.value}>
            {formatNumero(racional?.area_km2 ?? area_km2, 4)} km²
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Competencia</span>
          <span
            style={{
              ...estilos.value,
              color:
                racional?.competencia === "alta" ? "#9fffe8" : "#ffd166",
            }}
          >
            {racional?.competencia === "alta"
              ? "Alta"
              : "Baja / no principal"}
          </span>
        </div>

        <div style={estilos.dato}>
          <span style={estilos.label}>Coeficiente C</span>
          <span style={estilos.value}>
            {C !== null && C !== undefined ? formatNumero(C, 2) : "Pendiente"}
          </span>
        </div>

        <p style={estilos.muted}>
          Para La Iguaná PC_80, el Método Racional se conserva como contraste
          referencial. El cálculo de C en función del CN queda en radar para el
          motor hidrológico.
        </p>

        <div style={estilos.chipRow}>
          <span style={{ ...estilos.chip, ...estilos.chipWarn }}>
            C = f(CN) · pendiente
          </span>
          <span style={estilos.chip}>Contraste</span>
        </div>

        <button style={estilos.button} onClick={() => goToTab("racional")}>
          Ver método racional
        </button>
      </section>

      {/* 8. Resultados / Comparador Multi-Método */}
      <section style={estiloTarjeta("comparador")}>
        <h3 style={estilos.cardTitle}>⑧ Resultados característicos</h3>

       <p style={estilos.muted}>
         Comparador Hidrológico Multi-Método en construcción técnica. Integra matriz
         Tc-15 / Q-5, competencia de métodos, trazabilidad y soporte para adopción
         hidrológica defendible.
       </p>

       <button
         style={estiloBoton("comparador")}
         onClick={() => goToTab("comparador")}
  >
          Abrir comparador multi-método
       </button>
     </section>

      {/* 9. Export */}
      <section style={estiloTarjeta("export")}>
        <h3 style={estilos.cardTitle}>⑨ Export técnico</h3>

        <p style={estilos.muted}>
          Exportación de tablas, gráficos y soportes técnicos.
        </p>

        <div style={estilos.chipRow}>
          <button style={estilos.smallButton} onClick={() => goToTab("export")}>
            Exportar CSV
          </button>
          <button style={estilos.smallButton} onClick={() => goToTab("export")}>
            Exportar PNG
          </button>
          <button style={estilos.smallButton} onClick={() => goToTab("export")}>
            Exportar PDF
          </button>
        </div>
      </section>
    </aside>
  );
}
