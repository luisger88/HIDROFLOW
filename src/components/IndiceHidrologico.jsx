import React from "react";
import { focusByHeading } from "../utils/focusSection";

/**
 * Índice Hidrológico
 * Componente guía conceptual y de navegación
 * NO ejecuta cálculos hidrológicos
 * NO modifica estados del motor
 */
export default function IndiceHidrologico({
  gotoTab,
  contexto
}) {
  const {
    area_km2,
    estacionesAdoptadas = [],
    metodoIDF = "—",
    distribucionTemporal = "—",
    CN = null,
    C = null
  } = contexto || {};

  const esCuencaPequena = area_km2 != null && area_km2 < 25;

  return (
    <div className="card indice-hidrologico" style={{ padding: 16 }}>
      <h3>Índice Hidrológico de la Cuenca</h3>

      {/* ① Lluvia de diseño */}
      <section>
        <h4>① Lluvia de diseño (IDF)</h4>
        <p>
          Método IDF adoptado: <b>{metodoIDF}</b>
        </p>

        {estacionesAdoptadas.length > 0 && (
          <>
            <p>Estaciones con influencia:</p>
            <ul>
              {estacionesAdoptadas.map((e, i) => (
                <li key={i}>
                  {e.nombre} — {Math.round(e.peso * 100)} %
                </li>
              ))}
            </ul>
          </>
        )}

        <button
          onClick={() => {
            gotoTab("idf");
            focusByHeading("IDF");
          }}
        >
          Ver curvas IDF
        </button>
      </section>

      {/* ② Distribución temporal */}
      <section>
        <h4>② Distribución temporal (Huff / EPM)</h4>
        <p>
          Curva adoptada: <b>{distribucionTemporal}</b>
        </p>
        <p>
          Define la concentración temporal de la lluvia
          y controla el pico de caudal.
        </p>
        <button
          onClick={() => {
            gotoTab("hiet");
            focusByHeading("Distribución");
          }}
        >
          Analizar distribución temporal
        </button>
      </section>

      {/* ③ Lluvia efectiva */}
      <section>
        <h4>③ Lluvia efectiva (SCS‑CN)</h4>
        <p>
          Número de Curva (CN):{" "}
          <b>{CN != null ? CN.toFixed(1) : "—"}</b>
        </p>
        <p>
          Controla el volumen de escorrentía efectiva.
        </p>
        <button
          onClick={() => {
            gotoTab("hiet");
            focusByHeading("Lluvia efectiva");
          }}
        >
          Ver lluvia efectiva Pe(t)
        </button>
      </section>

      {/* ④ Tiempo de concentración */}
      <section>
        <h4>④ Tiempo de concentración (Tc)</h4>
        <p>
          Controla el tiempo al pico (Tp)
          y la atenuación del hidrograma.
        </p>
        <button
          onClick={() => {
            gotoTab("params");
            focusByHeading("Tiempo de concentración");
          }}
        >
          Analizar Tc
        </button>
      </section>

      {/* ⑤ Hidrogramas */}
      <section>
        <h4>⑤ Hidrograma Q(t)</h4>
        <p>
          Comparación entre métodos (SCS, Snyder, Clark, etc.).
        </p>
        <button
          onClick={() => {
            gotoTab("hidro");
            focusByHeading("Hidrograma");
          }}
        >
          Ver hidrogramas
        </button>
      </section>

      {/* ⑥ Método Racional */}
      <section>
        <h4>⑥ Método Racional</h4>

        {esCuencaPequena ? (
          <p>
            Aplicable (cuenca pequeña, A = {area_km2} km²).
          </p>
        ) : (
          <p>
            Uso referencial (cuenca mayor).
          </p>
        )}

        <p>
          Coeficiente de escorrentía C (derivado de CN):{" "}
          <b>{C != null ? C.toFixed(2) : "—"}</b>
        </p>

        <p>
          Caudales adoptados para Tr =
          2.33, 5, 10, 25, 50, 100
          (opción 500 años).
        </p>

        <button
          onClick={() => {
            gotoTab("racional");
            focusByHeading("Método Racional");
          }}
        >
          Ver método racional
        </button>
      </section>

      {/* ⑦ Resultados */}
      <section>
        <h4>⑦ Resultados característicos</h4>
        <p>
          Qp, Tp y Volumen por método.
        </p>
        <button
          onClick={() => {
            gotoTab("hidro");
            focusByHeading("Resultados");
          }}
        >
          Comparar resultados
        </button>
      </section>

      {/* ⑧ Export */}
      <section>
        <h4>⑧ Export técnico</h4>
        <button onClick={() => gotoTab("export-csv")}>
          Exportar CSV
        </button>
        <button onClick={() => gotoTab("export-png")}>
          Exportar PNG
        </button>
        <button onClick={() => gotoTab("export-pdf")}>
          Exportar PDF
        </button>
      </section>
    </div>
  );
}