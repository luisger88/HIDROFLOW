import React from "react";
import { getEstudioActivo } from "../../services/orquestador/getEstudioActivo";

export default function OrquestadorInstitucional() {

  const estudio = getEstudioActivo();

  return (
    <div className="hf-orquestador">

      <div className="hf-orq-titulo">
        Orquestador Institucional
      </div>

      <div className="hf-orq-grid">

        <section className="hf-orq-card">
          <h4>📍 Punto de Control</h4>
          <p>{estudio.puntoControl}</p>
        </section>

        <section className="hf-orq-card">
          <h4>🧭 Estado del Estudio</h4>
          <p>{estudio.estadoActual}</p>
        </section>

        <section className="hf-orq-card">
          <h4>🧠 ¿Qué sabe HidroFlow?</h4>
          <p>{estudio.conocimientoDisponible}</p>
        </section>

        <section className="hf-orq-card">
          <h4>⚙ ¿Qué hará HidroFlow ahora?</h4>
          <p>{estudio.siguientePaso}</p>
        </section>

        <section className="hf-orq-card">
          <h4>📄 ¿Qué puedo generar?</h4>
          <p>{estudio.generable}</p>
        </section>

      </div>

    </div>
  );
}
