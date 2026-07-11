import React from "react";
import "../../styles/orquestador.css";

import {
  getEstudioActivo
} from "../../services/orquestador/getEstudioActivo";

export default function OrquestadorInstitucional() {

  const estudio = getEstudioActivo();

  return (

    <div className="hf-orquestador">

      <div className="hf-orq-header">

        <div className="hf-orq-kicker">
          RDO
        </div>

        <div className="hf-orq-title">
          Panel Institucional
        </div>

      </div>

      {/* PUNTO DE CONTROL */}

      <section className="hf-orq-block hf-orq-mini">

        <div className="hf-orq-block-title">
          📍 Punto de Control
        </div>

        <div className="hf-orq-block-content">
          {estudio.puntoControl}
        </div>

      </section>

      {/* ESTADO */}

      <section className="hf-orq-block hf-orq-mini">

        <div className="hf-orq-block-title">
          🧭 Estado del Estudio
        </div>

        <div className="hf-orq-block-content">
          {estudio.estadoActual}
        </div>

      </section>

      {/* CONOCIMIENTO */}

      <section className="hf-orq-block hf-orq-medium">

        <div className="hf-orq-block-title">
          🧠 Conocimiento Disponible
        </div>

        <ul className="hf-orq-list">
          {estudio.conocimientoDisponible.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

      </section>

      {/* MEMORIA */}

      <section className="hf-orq-block hf-orq-small">

        <div className="hf-orq-block-title">
          🏛 Memoria Técnica Activa
        </div>

        <ul className="hf-orq-list">
          {estudio.memoriaTecnica.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

      </section>

      {/* SITUACION */}

      <section className="hf-orq-block hf-orq-medium">

        <div className="hf-orq-block-title">
          🎯 Situación Actual
        </div>

        <div className="hf-orq-status">

          <div>
            <strong>Siguiente paso</strong>
            <br />
            {estudio.situacionActual.siguientePaso}
          </div>

          <div className="hf-orq-divider"></div>

          <div>
            <strong>Generable</strong>
            <br />
            {estudio.situacionActual.generable}
          </div>

        </div>

      </section>

    </div>

  );

}