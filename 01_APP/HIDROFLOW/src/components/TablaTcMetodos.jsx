import React from "react";

/**
 * Tabla de métodos de Tiempo de Concentración (Tc)
 * Estilo HEC-HMS: comparación + Tc adoptado
 */
export default function TablaTcMetodos({ tiempoConcentracion }) {
  if (!tiempoConcentracion?.metodos) return null;

  const { metodos, tc_adoptado_min } = tiempoConcentracion;

  // Convertir objeto a filas válidas
  const filas = Object.entries(metodos)
    .filter(([, v]) => typeof v === "number" && v > 0)
    .map(([k, v]) => ({
      metodo: k.replace("_min", "").replaceAll("_", " "),
      tc: v
    }));

  if (filas.length === 0) return null;

  const tcMin = Math.min(...filas.map(f => f.tc));
  const tcMax = Math.max(...filas.map(f => f.tc));

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h4>Tiempo de concentración — Métodos comparados</h4>

      <table className="tabla-tc">
        <thead>
          <tr>
            <th>Método</th>
            <th>Tc (min)</th>
            <th>Observación</th>
          </tr>
        </thead>

        <tbody>
          {filas.map(f => {
            let obs = "";

            if (Math.abs(f.tc - tc_adoptado_min) < 0.5) {
              obs = "✔ Adoptado";
            } else if (f.tc === tcMin) {
              obs = "↓ Más bajo";
            } else if (f.tc === tcMax) {
              obs = "↑ Más alto";
            }

            return (
              <tr
                key={f.metodo}
                style={
                  obs.includes("Adoptado")
                    ? { background: "rgba(79,209,197,0.15)" }
                    : {}
                }
              >
                <td>{f.metodo}</td>
                <td style={{ textAlign: "right" }}>
                  {f.tc.toFixed(1)}
                </td>
                <td>{obs}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p style={{ fontSize: 12, opacity: 0.7 }}>
        Tc adoptado = <b>{tc_adoptado_min.toFixed(1)} min</b>
      </p>
    </div>
  );
}