import React from "react";
import "../../styles/orquestador.css";

import {
  getEstudioActivo
} from "../../services/orquestador/getEstudioActivo";

import {
  getContratoCuencaState
} from "../../agents/contratoCuencaAgent";

import { ExpedienteStatusPanel } from "../hfExpediente";

export default function OrquestadorInstitucional() {

  const estudio = getEstudioActivo();
  const contrato = getContratoCuencaState();

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

                  {/* GOBERNANZA */}

      <section className="hf-orq-block hf-orq-small">

        <div className="hf-orq-block-title">
          🏛 Gobernanza
        </div>

        <div className="hf-orq-block-content">

          <strong>Fase</strong>
          <br />
          {estudio.faseActual}

          <br />
          <br />

          <strong>Certificación</strong>
          <br />
          {estudio.estadoCertificacion}

          <br />
          <br />

          <strong>OI vigentes</strong>

          <ul className="hf-orq-list">
            {estudio.oiVigentes.map((oi) => (
              <li key={oi}>{oi}</li>
            ))}
          </ul>

          <strong>Riesgos</strong>

          <ul className="hf-orq-list">
            {estudio.riesgos.map((riesgo) => (
              <li key={riesgo}>{riesgo}</li>
            ))}
          </ul>

          <strong>Validaciones pendientes</strong>

          <ul className="hf-orq-list">
            {estudio.validacionesPendientes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

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

      {/* EXPEDIENTE HIDROLOGICO */}

      <ExpedienteStatusPanel />

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