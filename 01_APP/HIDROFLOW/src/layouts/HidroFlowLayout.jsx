import React, { useState } from "react";
import IndiceHidrologico from "../components/IndiceHidrologico";
import HidroFlow from "../HidroFlow";
import ComparadorMultiMetodo from "../components/ComparadorMultiMetodo";

export default function HidroFlowLayout() {
  const [tabActiva, setTabActiva] = useState("params");
  const [contextoComparador, setContextoComparador] = useState(null);

  const estilos = {
    contenedor: {
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      background: "#020617",
      overflow: "hidden",
    },

    lateral: {
      width: "280px",
      minWidth: "280px",
      maxWidth: "280px",
      height: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
      background: "#020617",
      borderRight: "1px solid rgba(0, 210, 255, 0.22)",
      flexShrink: 0,
    },

    principal: {
      flex: 1,
      minWidth: 0,
      height: "100vh",
      overflow: "auto",
      background: "#020617",
    },
  };

  const renderContenidoPrincipal = () => {
    if (tabActiva === "comparador") {
     return <ComparadorMultiMetodo contexto={contextoComparador} />;
    }

    return (
      <HidroFlow
        tab={tabActiva}
        setTab={setTabActiva}
        onContextoComparador={setContextoComparador}
      />
    );
  };

  return (
    <div style={estilos.contenedor}>
      <aside style={estilos.lateral}>
        <IndiceHidrologico
          tabActiva={tabActiva}
          tab={tabActiva}
          setTab={setTabActiva}
          setTabActiva={setTabActiva}
          cambiarTab={setTabActiva}
          navegarA={setTabActiva}
          goToTab={setTabActiva}
        />
      </aside>

      <main style={estilos.principal}>{renderContenidoPrincipal()}</main>
    </div>
  );
}
