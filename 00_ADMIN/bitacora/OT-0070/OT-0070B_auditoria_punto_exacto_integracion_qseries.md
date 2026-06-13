# OT-0070B — Auditoría quirúrgica del punto exacto de integración qSeries

Fecha: 2026-06-12 19:28:57

## Estado base

- Rama: ot-0070-integracion-no-invasiva-adaptador-qseries.
- OT-0070A cerrada en commit 09e84f0.
- Main base: 7173ee7, post OT-0069.
- Alcance: auditoría focal sin cambios funcionales.

## Objetivo

Identificar el punto exacto y seguro para integrar el adaptador qSeries en ComparadorMultiMetodo.jsx como diagnóstico no invasivo de disponibilidad, sin modificar la lectura actual de Qp, Tp, Volumen ni Q(t).

## Archivo auditado

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx

## Patrones auditados


> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1:import React, { useEffect, useMemo, useState } from "react";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:3:import { setTcState } from "../agents/tcAgent";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:4:import { calcTc, mapTcResultados } from "../services/hidroEngine";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:5:import { seleccionarTc } from "../services/tcSelector";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:6:import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:import adaptarExpedienteDocumental from "../services/documentos/adaptarExpedienteDocumental";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:10:  resumenComparadorCatalogo,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:11:} from "../data/metodosComparadorCatalogo";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:65:  area: contextoBase.area_km2,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:66:  CN: contextoBase.CN,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:67:  urbanizacion: 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:68:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:69:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:70:const evaluacionCompetencia = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:71:  return evaluarCompetenciaComparador(contextoBase);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:72:}, [contextoBase]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:73:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:74:const conceptoCuenca = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:75:  return conceptuarCuenca(contextoBase);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:76:}, [contextoBase]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:77:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:78:// ✅ Tc FINAL
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:79:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:80:const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:81:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:82:const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83:  metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:84:  evaluacionCompetencia?.tc
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:99:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:100:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:101:  // ✅ Y SOLO AQUÍ VA EL RETURN
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:102: // ✅ BLOQUE CONSISTENTE DE MÉTODOS
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:103:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:104:const metodos = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:105:  if (!evaluacionCompetencia) return [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:106:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:107:  const base = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:108:    ...evaluacionCompetencia.tc.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:109:      ...m,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:110:      bloque: "Tc-15"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:111:    })),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:112:    ...evaluacionCompetencia.q.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:113:      ...m,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:114:      bloque: "Q-5"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:128:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:129:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:130:}, [evaluacionCompetencia, filtroEstado, filtroTipo]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:131:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:132:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:133:const conteo = useMemo(() => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:134:  total: metodos.length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:135:  tc: metodos.filter(m => m.tipo === "tc").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:136:  q: metodos.filter(m => m.tipo === "q").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:137:  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:138:  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:139:}), [metodos]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:140:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:141:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:142:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:143:  const estilos = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:548:  if (!match) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:549:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:550:  return extraerNumero(match);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:551:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:552:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:553:const obtenerResultadoQMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:554:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:555:    String(valor ?? "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:556:      .toLowerCase()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:557:      .normalize("NFD")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:558:      .replace(/[\u0300-\u036f]/g, "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:559:      .replace(/[^a-z0-9]/g, "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:560:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:561:  const extraerNumero = (objeto, claves = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:562:    for (const clave of claves) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:563:      const valor = objeto?.[clave];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:568:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:569:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:570:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:571:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:572:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:573:  const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:574:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:575:  if (!bruto) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:576:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:577:      Qp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:578:      Tp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:579:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:580:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:581:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:582:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:583:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:639:        {item}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:640:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:641:    ));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:642:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:643:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:644:  const renderTabla = (titulo, tipo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:645:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:646:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:647:  // OT-0067 — Adaptador de coherencia hidrológica (encapsulado)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:648:const clasificarCoherencia = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:649:  // OT-0067 — Adaptador de coherencia hidrológica
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:650:  const tpRaw = metodo?.tPico ?? metodo?.tp ?? metodo?.Tp;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:651:  const tp = Number(String(tpRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:652:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:653:  const tcRaw = contextoBase?.tc_global ?? contextoBase?.tc ?? contextoBase?.tcMin ?? 0;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:654:  const tc = Number(String(tcRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:688:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:689:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:690:  return { etiqueta: "Evaluar", color: "#64748b" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:691:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:692:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:693:const datos = metodos.filter((metodo) => metodo.tipo === tipo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:694:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:695:// OT-0067C — Evaluación global de coherencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:696:const resumenCoherencia = metodos.map((m) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:697:  const r = clasificarCoherencia(m);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:698:  return r?.etiqueta ?? "No evaluado";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:699:});
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:700:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:701:let estadoGlobal = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:702:  etiqueta: "Evaluar",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:703:  color: "#64748b"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:747:    padding: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:748:    margin: "10px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:749:    background: "rgba(15,23,42,0.5)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:750:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:751:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:752:  <strong>Estado global del modelo:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:753:  <span
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:754:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:755:      padding: "2px 8px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:756:      borderRadius: 6,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:757:      background: estadoGlobal.color,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:758:      color: "#fff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:759:      marginLeft: 6,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:760:      fontSize: "12px"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:761:    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:762:  >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:870:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:871:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:872:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:873:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:874:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:875:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:876:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:877:    if (!Number.isFinite(resultadoQ.Qp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:878:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:879:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:880:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:881:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:882:      <span style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:883:        {resultadoQ.Qp.toFixed(2)} m³/s
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:884:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:885:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:890:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:891:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:892:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:893:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:894:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:895:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:896:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:897:    if (!Number.isFinite(resultadoQ.Tp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:898:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:899:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:900:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:901:    const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:902:    const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:903:      Number.isFinite(tcReferencia) && tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:904:        ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:905:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:954:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:955:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:956:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:957:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:958:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:959:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:960:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:961:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:962:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:963:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:964:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:965:    const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:966:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:967:    const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:968:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:969:        ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1428:    color: "#fecaca",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1429:    fontSize: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1430:    lineHeight: 1.5,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1431:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1432:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1433:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1434:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1435:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1436:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1437:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1438:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1439:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1440:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1441:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1442:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1443:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1444:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. 
La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1445:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1446:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1447:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1448:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1449:          const textoResumenQ5 = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1450:            "# Resumen técnico Q-5 post auditoría",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1451:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1452:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1453:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1454:            "Síntesis:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1455:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1456:            "- SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1457:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1458:            "- Masa y volumen: controlados frente a la referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1459:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:            "- No se recalculan hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1569:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1570:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1571:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1572:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1573:          const obtenerCandidatosQ5Contexto = () => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1574:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1577:              ? bruto
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1578:              : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:              ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:              : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:              ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1591:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | 
${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:            .map((metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1728:                  String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1729:                ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1730:                metodosQ5Expediente[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1731:                null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1732:              const resultadoQ5PrincipalConsistencia = metodoQ5PrincipalConsistencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1733:                ? obtenerResultadoQMetodo(metodoQ5PrincipalConsistencia)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1734:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1735:              const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalConsistencia?.volumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1736:              const relacionVolumenQ5Esperado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1737:                Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1738:                Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1739:                volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1740:                  ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1741:                  : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1742:              const estadoConsistenciaVolumen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1743:                relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1813:            ...tablaQ5Markdown,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1814:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1815:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1816:            "## 7. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1817:            "Uso: contraste global independiente de caudal pico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1818:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1819:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1820:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1821:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1822:              ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1823:                  `Tc racional exportado: ${
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1824:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1825:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1826:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1827:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1828:                  "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2053:              ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2054:              metodosQ5Panel[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2055:              null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2056:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2057:            const resultadoQ5PrincipalPanel = metodoQ5PrincipalPanel
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2058:              ? obtenerResultadoQMetodo(metodoQ5PrincipalPanel)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2059:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2060:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2061:            const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalPanel?.volumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2062:            const relacionVolumenQ5Esperado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2063:              Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2064:              Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2065:              volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2066:                ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2067:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2068:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2213:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2214:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2215:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2216:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2217:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2218:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2219:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2220:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2221:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2222:



## Lectura preliminar

La integración futura debe ser auxiliar y no invasiva. El punto candidato es cercano al uso actual de contextoBase?.hidrogramas y antes de la presentación del Bloque Q-5, como diagnóstico de disponibilidad qSeries.

No debe reemplazar obtenerResultadoQMetodo ni modificar la tabla existente de Qp, Tp o volumen.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0070B.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No calcular De, W50, W25, pendientes ni asimetría.
- No generar PDF, Word ni mapas.

## Criterio de salida

OT-0070B queda completa cuando exista una auditoría versionada del punto exacto de integración qSeries, sin cambios funcionales sobre la aplicación.
