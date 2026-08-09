import React, { useState, useCallback } from "react";
import IndiceHidrologico from "../components/IndiceHidrologico";
import HidroFlow from "../HidroFlow";
import ComparadorMultiMetodo from "../components/ComparadorMultiMetodo";
import OrquestadorInstitucional from "../components/orquestador/OrquestadorInstitucional";

export default function HidroFlowLayout() {
  const [tabActiva, setTabActiva] = useState("params");
  const [contextoComparador, setContextoComparador] = useState(null);

  const actualizarContextoComparador = useCallback((nuevoOResolvedor) => {
    setContextoComparador((previo) => {
      const resuelto =
        typeof nuevoOResolvedor === "function"
          ? nuevoOResolvedor(previo)
          : nuevoOResolvedor;

      const hidrogramasNuevoTieneDatos =
        resuelto?.hidrogramas?.resultados?.length > 0;

      const resumenNuevoTieneDatos =
        resuelto?.hidrogramas_resumen?.length > 0;

      const hidrogramasPrevioTieneDatos =
        previo?.hidrogramas?.resultados?.length > 0;

      const resumenPrevioTieneDatos =
        previo?.hidrogramas_resumen?.length > 0;

      return {
        ...(previo ?? {}),
        ...(resuelto ?? {}),
        hidrogramas: hidrogramasNuevoTieneDatos
          ? resuelto.hidrogramas
          : hidrogramasPrevioTieneDatos
          ? previo.hidrogramas
          : resuelto?.hidrogramas ?? previo?.hidrogramas ?? null,
        hidrogramas_resumen: resumenNuevoTieneDatos
          ? resuelto.hidrogramas_resumen
          : resumenPrevioTieneDatos
          ? previo.hidrogramas_resumen
          : resuelto?.hidrogramas_resumen ?? previo?.hidrogramas_resumen ?? null
      };
    });
  }, []);

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
      width: "320px",
minWidth: "320px",
maxWidth: "320px",
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
        onContextoComparador={actualizarContextoComparador}
        contextoComparador={contextoComparador}
      />
    );
  };

  return (
    <div style={estilos.contenedor}>
      <aside style={estilos.lateral}>
        <OrquestadorInstitucional />

        <IndiceHidrologico contexto={contextoComparador}
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

