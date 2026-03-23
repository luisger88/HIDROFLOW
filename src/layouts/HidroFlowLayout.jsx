import React, { useState } from "react";
import HidroFlow from "../HidroFlow";
import IndiceHidrologico from "../components/IndiceHidrologico";

export default function HidroFlowLayout() {
  // Control de pestañas (se pasa al índice)
  const [tab, setTab] = useState("hiet");

  // Contexto mínimo (puedes enriquecerlo luego)
  const contextoHidrologico = {
    area_km2: 2.83,                 // ejemplo, luego lo conectas a params
    estacionesAdoptadas: [
      { nombre: "San Antonio de Prado", peso: 0.65 },
      { nombre: "Itagüí", peso: 0.35 }
    ],
    metodoIDF: "EPM",
    distribucionTemporal: "EPM Q1",
    CN: 88.0,
    C: 0.75
  };

  return (
    <div style={{ display: "flex", gap: 16 }}>
      {/* Índice Hidrológico */}
      <div style={{ width: 360 }}>
        <IndiceHidrologico
          gotoTab={setTab}
          contexto={contextoHidrologico}
        />
      </div>

      {/* Aplicación principal */}
      <div style={{ flex: 1 }}>
        <HidroFlow tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}
