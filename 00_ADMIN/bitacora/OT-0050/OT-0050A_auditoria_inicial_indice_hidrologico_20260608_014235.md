# OT-0050A — Auditoría inicial Índice Hidrológico

Fecha: 06/08/2026 01:42:35
Rama: ot-0050-auditoria-quirurgica-indice-hidrologico

## 1. Estado Git inicial
?? 00_ADMIN/bitacora/OT-0050/

## 2. Log reciente
16f32fe Merge pull request #59 from luisger88/ot-0049-saneamiento-quirurgico-motor-indice
82316a2 fix(motor): elimina duplicate key area_km2 en contexto
19df8ee Merge pull request #58 from luisger88/practica-001i-estructura-documental-base
95d14ca docs(documentacion): crea estructura documental base HidroFlow
2ce216c Merge pull request #57 from luisger88/practica-001h-radar-documentacion-usuario-software
5a0710f docs(documentacion): registra radar guias usuario y software
dfac405 Merge pull request #56 from luisger88/practica-001g-plantillas-portables-base
fabce02 docs(arquitectura): agrega plantillas portables base

## 3. Archivos foco OT-0050
01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
01_APP/HIDROFLOW/src/HidroFlow.jsx
01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx
01_APP/HIDROFLOW/src/agents/tcAgent.js
01_APP/HIDROFLOW/src/agents/trAgent.js

## 4. Índice Hidrológico — búsqueda de contexto, estados y valores sensibles

> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:1:import React, { useState, useEffect } from "react";
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:2:import { getTcState, subscribeTc } from "../agents/tcAgent";
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:3:import { getTrState, setTrState, subscribeTr } from "../agents/trAgent";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:4:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:5:export default function IndiceHidrologico({
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:6:  goToTab: goToTabProp,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:7:  contexto,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:8:  tabActiva: tabActivaProp = "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:9:  tab = "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:10:  setTab,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:11:  setTabActiva,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:12:  cambiarTab,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:13:  navegarA,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:14:}) {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:15:  // --- Estado reactivo del Agente Tc ---
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:16:  const [tcState, setTcStateLocal] = useState(getTcState());
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:17:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:18:  useEffect(() => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:19:    const unsubscribe = subscribeTc(setTcStateLocal);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:20:    return () => unsubscribe();
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:21:  }, []);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:22:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:23:  const valoresTcAgente = Object.values(tcState?.metodosTc || {})
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:24:  .map((valor) => Number(valor))
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:25:  .filter((valor) => Number.isFinite(valor) && valor > 0);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:26:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:27:const rangoTcAgente =
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:28:  valoresTcAgente.length > 0
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:29:    ? {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:30:        min: Math.min(...valoresTcAgente),
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:31:        max: Math.max(...valoresTcAgente),
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:32:      }
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:33:    : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:34:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:35:  // -------------------------------------
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:36:  const {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:37:    tabActiva = "params",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:38:    area_km2 = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:39:    estacionesAdoptadas = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:40:    metodoIDF = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:41:    distribucionTemporal = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:42:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:43:    // SCS-CN / motor
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:44:    CN = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:45:    CN_base = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:46:    CN_efectivo = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:47:    AMC = "II",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:48:    S_mm = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:49:    Ia_mm = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:50:    porcentaje_impermeable = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:51:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:52:    // Racional
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:53:    C = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:54:    racional = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:55:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:56:    // Cuenca
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:57:    cuencaNombre = "Cuenca activa",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:58:    puntoControl = "PC",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:59:    pendiente_media_pct = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:60:    estadoTecnico = "En validación",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:61:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:62:    // IDF futura
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:63:    referenciaIDFPendiente = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:64:    ponderacionIDFPendiente = false,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:65:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:66:    // Tc
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:67:    tc = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:68:    tc_sugerido_min = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:69:    tc_metodos = [],
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:70:    tc_resumen = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:71:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:72:    // Periodos de retorno
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:73:    periodos_retorno = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:74:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:75:    // Resumen completo futuro
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:76:    resumenMotor = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:77:  } = contexto || {};
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:78:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:79:  const tabActual = tabActivaProp || tabActiva || tab || "params";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:80:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:81:  const normalizarTab = (valor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:82:    if (!valor) return "";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:83:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:111:      scs_cn: "hidrogramas",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:112:      scs: "hidrogramas",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:113:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:114:      racional: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:115:      metodo_racional: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:116:      método_racional: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:117:      racional_qp: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:118:      tc: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:119:      tiempo_concentracion: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:120:      tiempo_concentración: "racional",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:121:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:122:      resultados: "resultados",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:123:      resultado: "resultados",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:124:      export: "export",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:125:      exportar: "export",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:126:      influencia: "influencia",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:175:    goToTab(destino);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:176:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:177:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:178:  const formatNumero = (valor, decimales = 2) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:179:    if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:180:    const n = Number(valor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:181:    if (!Number.isFinite(n)) return String(valor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:182:    return n.toLocaleString("es-CO", {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:183:      minimumFractionDigits: decimales,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:184:      maximumFractionDigits: decimales,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:185:    });
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:196:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:197:  const formatTR = (p) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:198:    if (p?.etiqueta) return p.etiqueta;
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:199:    if (p?.tr !== undefined) return `Tr ${p.tr} años`;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:200:    if (typeof p === "number") return `Tr ${p} años`;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:201:    return "Tr —";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:202:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:203:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:204:  const estaciones = Array.isArray(estacionesAdoptadas)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:205:    ? estacionesAdoptadas
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:215:    ? tc.metodos
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:216:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:217:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:218:  const resumenTc = tc_resumen || tc?.resumen || null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:219:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:220:  const periodos = Array.isArray(periodos_retorno)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:221:    ? periodos_retorno
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:222:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:223:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:224:  const estilos = {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:412:    };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:413:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:414:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:415:  const [trStateIndice, setTrStateIndice] = useState(getTrState());
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:416:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:417:  useEffect(() => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:418:    const cancelarSuscripcionTr = subscribeTr(setTrStateIndice);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:419:    return cancelarSuscripcionTr;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:420:  }, []);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:421:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:422:  const periodosTrIndice = periodos.length > 0 ? periodos : [2.33, 5, 10, 25, 50, 100];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:423:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:424:  const trActivoIndice = Number(
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:425:    trStateIndice?.Tr_activo ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:426:      contexto?.tr_diseno_activo ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:427:      25
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:428:  );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:429:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:430:  const seleccionarTrIndice = (trValor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:431:    const trNumerico = Number(trValor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:432:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:434:      return;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:435:    }
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:436:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:437:    setTrState({
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:438:      Tr_activo: trNumerico,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:439:      fuente: "IndiceHidrologico"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:440:    });
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:441:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:442:  const numeroIndiceSeguro = (valor) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:443:    if (valor === null || valor === undefined || valor === "") {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:444:      return null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:445:    }
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:446:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:447:    const numero = Number(valor);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:448:    return Number.isFinite(numero) ? numero : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:449:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:450:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:451:  const numeroIndicePositivo = (valor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:452:    const numero = numeroIndiceSeguro(valor);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:453:    return numero !== null && numero > 0 ? numero : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:454:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:455:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:456:  const racionalContextoIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:457:    contexto?.metodo_racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:458:    contexto?.racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:459:    contexto?.racional_exportable ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:460:    racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:461:    null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:462:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:463:  const resultadosRacionalIndice = Array.isArray(racionalContextoIndice?.resultados)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:464:    ? racionalContextoIndice.resultados
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:465:    : Array.isArray(racionalContextoIndice?.tabla)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:466:    ? racionalContextoIndice.tabla
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:467:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:468:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:469:  const trActivoNormalizadoIndice = numeroIndiceSeguro(trActivoIndice) ?? 25;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:470:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:471:  const resultadoRacionalTrIndice = resultadosRacionalIndice.find((fila) =>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:472:    Math.abs(Number(fila?.Tr) - trActivoNormalizadoIndice) < 0.001
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:473:  );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:474:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:475:  const areaRacionalIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:476:    numeroIndicePositivo(racionalContextoIndice?.area_km2) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:477:    numeroIndicePositivo(contexto?.area_km2) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:478:    numeroIndicePositivo(contexto?.area) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:479:    numeroIndicePositivo(contexto?.cuenca?.area_km2) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:480:    numeroIndicePositivo(area_km2);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:481:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:482:  const coeficienteRacionalTrIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:483:    numeroIndicePositivo(resultadoRacionalTrIndice?.C) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:484:    numeroIndicePositivo(C);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:485:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:486:  const qRacionalTrIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:487:    numeroIndicePositivo(resultadoRacionalTrIndice?.Q);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:488:  return (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:489:    <aside style={estilos.panel}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:490:      <h2 style={estilos.titulo}>Índice Hidrológico de la Cuenca</h2>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:491:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:492:      <p style={estilos.subtitulo}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:493:        Panel lector · La Iguaná PC_80 · Motor HidroFlow
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:509:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:510:          <span style={estilos.label}>Área</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:511:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:512:            {formatNumero(area_km2, 4)} km²
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:513:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:514:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:515:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:516:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:517:          <span style={estilos.label}>Pendiente media</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:518:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:519:            {formatNumero(pendiente_media_pct, 2)} %
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:520:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:521:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:522:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:523:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:524:          <span style={{ ...estilos.chip, ...estilos.chipOk }}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:525:            Geometría validada
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:620:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:621:          <span style={estilos.label}>CN base</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:622:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:623:            {CN_base !== null && CN_base !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:624:              ? formatNumero(CN_base, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:625:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:626:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:627:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:628:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:629:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:630:          <span style={estilos.label}>CN efectivo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:631:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:632:            {CN_efectivo !== null && CN_efectivo !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:633:              ? formatNumero(CN_efectivo, 1)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:634:              : CN !== null && CN !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:635:              ? formatNumero(CN, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:636:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:637:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:638:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:639:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:640:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:641:          <span style={estilos.label}>AMC</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:645:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:646:          <span style={estilos.label}>S</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:647:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:648:            {S_mm !== null && S_mm !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:649:              ? `${formatNumero(S_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:650:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:651:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:652:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:653:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:654:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:655:          <span style={estilos.label}>Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:656:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:657:            {Ia_mm !== null && Ia_mm !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:658:              ? `${formatNumero(Ia_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:659:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:660:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:661:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:662:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:663:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:664:          <span style={estilos.label}>Impermeabilidad</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:665:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:666:            {porcentaje_impermeable !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:667:            porcentaje_impermeable !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:668:              ? `${formatNumero(porcentaje_impermeable, 1)} %`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:669:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:670:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:671:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:672:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:673:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:674:          Parámetros leídos desde el resumen oficial del motor SCS-CN.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:686:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:687:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:688:      {/* 4. Tiempo de concentración */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:689:<section style={estiloTarjeta("racional")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:690:  <h3 style={estilos.cardTitle}>④ Tiempo de concentración Tc</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:691:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:692:  <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:693:    <span style={estilos.label}>Tc sugerido</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:694:    <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:695:      {tcState?.Tc_final !== null && tcState?.Tc_final !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:696:        ? `${formatNumero(tcState.Tc_final, 1)} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:697:        : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:698:    </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:699:  </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:700:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:701:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:702:          <span style={estilos.label}>Métodos válidos</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:711:  <span style={estilos.label}>Rango bruto Tc</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:712:  <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:713:    {rangoTcAgente
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:714:      ? `${formatNumero(rangoTcAgente.min, 1)}–${formatNumero(
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:715:          rangoTcAgente.max,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:716:          1
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:717:        )} min`
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:718:      : resumenTc?.min_min !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:719:        resumenTc?.min_min !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:720:        resumenTc?.max_min !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:721:        resumenTc?.max_min !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:722:      ? `${formatNumero(resumenTc.min_min, 1)}–${formatNumero(
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:723:          resumenTc.max_min,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:724:          1
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:725:        )} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:726:      : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:727:  </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:728:</div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:730:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:731:          <span style={estilos.label}>Rango competente Tc</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:732:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:733:            {tcState?.rangoCompetenteTc
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:734:              ? formatNumero(tcState.rangoCompetenteTc.min, 1) + "–" +
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:735:                formatNumero(tcState.rangoCompetenteTc.max, 1) + " min"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:736:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:737:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:738:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:739:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:740:        {tcState?.Tc_final !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:741:          tcState?.Tc_final !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:742:          tcState?.rangoCompetenteTc?.min !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:743:          tcState?.rangoCompetenteTc?.max !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:744:          tcState.rangoCompetenteTc.max > tcState.rangoCompetenteTc.min &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:745:          (tcState.Tc_final - tcState.rangoCompetenteTc.min) /
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:746:            (tcState.rangoCompetenteTc.max - tcState.rangoCompetenteTc.min) <= 0.15 ? (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:747:          <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:748:            ⚠ Advertencia técnica: el Tc sugerido está cerca del borde inferior del rango competente. Se recomienda revisar sensibilidad con escenario rápido, sugerido y lento antes de adoptarlo como valor único robusto.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:749:          </p>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:750:        ) : null}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:751:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:752:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:753:          El Tc sugerido corresponde al resumen estadístico del motor. El Tc
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:754:          adoptado definitivo queda pendiente de criterio técnico.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:755:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:756:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:773:          )}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:774:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:775:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:776:        <button style={estiloBoton("racional")} onClick={() => goToTab("racional")}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:777:          >
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:778:        Analizar Tc
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:779:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:780:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:781:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:782:      {/* 5. Periodos de retorno */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:783:      <section style={estiloTarjeta("racional")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:784:        <h3 style={estilos.cardTitle}>⑤ Periodos de retorno</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:785:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:786:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:787:          {periodosTrIndice.map((trValor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:788:            const activoTr = Number(trValor) === trActivoIndice;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:789:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:872:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:873:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:874:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:875:      {/* 7. Método racional */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:876:      <section style={estiloTarjeta("racional")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:877:        <h3 style={estilos.cardTitle}>⑦ Método racional</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:878:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:879:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:880:          <span style={estilos.label}>Uso recomendado</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:881:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:882:            {racional?.uso_recomendado || "Solo contraste referencial"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:883:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:884:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:885:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:886:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:887:          <span style={estilos.label}>Criterio área</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:888:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:889:            A ≤ {racional?.umbral_competencia_km2 ?? 5} km²
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:890:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:891:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:892:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:893:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:894:          <span style={estilos.label}>Área cuenca</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:895:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:896:            {areaRacionalIndice !== null ? formatNumero(areaRacionalIndice, 4) : "—"} km²
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:897:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:898:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:899:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:900:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:901:          <span style={estilos.label}>Competencia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:902:          <span
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:903:            style={{
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:904:              ...estilos.value,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:905:              color:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:906:                racional?.competencia === "alta" ? "#9fffe8" : "#ffd166",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:907:            }}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:908:          >
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:909:            {racional?.competencia === "alta"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:910:              ? "Alta"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:911:              : "Baja / no principal"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:912:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:913:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:914:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:915:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:916:          <span style={estilos.label}>Coeficiente C</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:917:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:918:            {coeficienteRacionalTrIndice !== null ? formatNumero(coeficienteRacionalTrIndice, 4) : "Pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:919:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:920:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:921:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:922:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:923:          <span style={estilos.label}>Tr global activo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:924:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:927:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:928:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:929:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:930:          <span style={estilos.label}>Q racional Tr activo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:931:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:932:            {qRacionalTrIndice !== null ? `${formatNumero(qRacionalTrIndice, 2)} m³/s` : "Pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:933:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:934:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:935:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:936:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:937:          Para La Iguaná PC_80, el Método Racional se conserva como contraste
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:938:          referencial. El cálculo de C en función del CN queda en radar para el
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:939:          motor hidrológico.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:940:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:941:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:942:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:943:          <span style={{ ...estilos.chip, ...estilos.chipWarn }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:944:            {coeficienteRacionalTrIndice !== null ? `C Tr ${trActivoIndice}a = ${formatNumero(coeficienteRacionalTrIndice, 4)}` : "C = f(CN) · pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:945:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:946:          <span style={estilos.chip}>Contraste</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:947:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:948:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:949:        <button style={estilos.button} onClick={() => goToTab("racional")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:950:          Ver método racional
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:951:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:952:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:953:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:954:      {/* 8. Resultados / Comparador Multi-Método */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:955:      <section style={estiloTarjeta("comparador")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:956:        <h3 style={estilos.cardTitle}>⑧ Resultados característicos</h3>


## 5. Índice Hidrológico — búsqueda de visualización y etiquetas críticas

  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:1:import React, { useState, useEffect } from "react";
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:2:import { getTcState, subscribeTc } from "../agents/tcAgent";
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:3:import { getTrState, setTrState, subscribeTr } from "../agents/trAgent";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:4:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:5:export default function IndiceHidrologico({
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:6:  goToTab: goToTabProp,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:7:  contexto,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:8:  tabActiva: tabActivaProp = "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:13:  navegarA,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:14:}) {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:15:  // --- Estado reactivo del Agente Tc ---
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:16:  const [tcState, setTcStateLocal] = useState(getTcState());
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:17:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:18:  useEffect(() => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:19:    const unsubscribe = subscribeTc(setTcStateLocal);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:20:    return () => unsubscribe();
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:21:  }, []);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:22:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:23:  const valoresTcAgente = Object.values(tcState?.metodosTc || {})
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:24:  .map((valor) => Number(valor))
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:25:  .filter((valor) => Number.isFinite(valor) && valor > 0);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:26:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:27:const rangoTcAgente =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:28:  valoresTcAgente.length > 0
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:29:    ? {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:30:        min: Math.min(...valoresTcAgente),
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:31:        max: Math.max(...valoresTcAgente),
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:32:      }
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:33:    : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:34:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:35:  // -------------------------------------
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:36:  const {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:38:    area_km2 = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:39:    estacionesAdoptadas = [],
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:40:    metodoIDF = "—",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:41:    distribucionTemporal = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:42:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:43:    // SCS-CN / motor
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:44:    CN = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:45:    CN_base = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:46:    CN_efectivo = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:47:    AMC = "II",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:48:    S_mm = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:49:    Ia_mm = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:50:    porcentaje_impermeable = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:51:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:52:    // Racional
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:53:    C = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:54:    racional = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:55:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:56:    // Cuenca
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:57:    cuencaNombre = "Cuenca activa",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:58:    puntoControl = "PC",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:59:    pendiente_media_pct = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:60:    estadoTecnico = "En validación",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:61:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:62:    // IDF futura
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:63:    referenciaIDFPendiente = [],
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:64:    ponderacionIDFPendiente = false,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:65:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:66:    // Tc
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:67:    tc = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:68:    tc_sugerido_min = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:69:    tc_metodos = [],
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:70:    tc_resumen = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:71:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:72:    // Periodos de retorno
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:73:    periodos_retorno = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:74:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:75:    // Resumen completo futuro
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:82:    if (!valor) return "";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:83:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:84:    const texto = String(valor).trim().toLowerCase();
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:85:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:86:    const alias = {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:87:      params: "params",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:88:      parametros: "params",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:89:      parámetros: "params",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:90:      parametro: "params",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:91:      parámetro: "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:92:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:93:      idf: "idf",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:94:      curvas_idf: "idf",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:95:      lluvia_diseno: "idf",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:96:      lluvia_diseño: "idf",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:97:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:98:      hiet: "hietogramas",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:99:      hieto: "hietogramas",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:100:      hietograma: "hietogramas",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:101:      hietogramas: "hietogramas",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:102:      distribucion_temporal: "hietogramas",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:103:      distribución_temporal: "hietogramas",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:104:      temporal: "hietogramas",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:105:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:106:      hidro: "hidrogramas",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:107:      hidrograma: "hidrogramas",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:108:      hidrogramas: "hidrogramas",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:109:      hidrograma_unitario: "hidrogramas",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:110:      lluvia_efectiva: "hidrogramas",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:111:      scs_cn: "hidrogramas",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:112:      scs: "hidrogramas",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:113:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:114:      racional: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:115:      metodo_racional: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:116:      método_racional: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:117:      racional_qp: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:118:      tc: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:119:      tiempo_concentracion: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:120:      tiempo_concentración: "racional",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:121:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:122:      resultados: "resultados",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:123:      resultado: "resultados",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:124:      export: "export",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:125:      exportar: "export",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:126:      influencia: "influencia",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:127:      influencia_idf: "influencia",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:128:      ponderacion: "influencia",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:129:      ponderación: "influencia",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:130:    };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:131:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:132:    return alias[texto] || texto;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:154:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:155:    return [
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:156:      "rounded-2xl border p-3 transition-all duration-200",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:157:      activo
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:158:        ? "border-cyan-300 bg-cyan-950/80 shadow-[0_0_0_1px_rgba(34,211,238,0.45),0_0_18px_rgba(34,211,238,0.16)]"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:159:        : "border-cyan-900/70 bg-slate-950/70",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:160:    ].join(" ");
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:161:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:165:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:166:    return [
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:167:      "w-full rounded-lg border px-3 py-2 text-left text-xs font-bold transition-all duration-200",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:168:      activo
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:169:        ? "border-cyan-300 bg-cyan-400/20 text-cyan-50 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:170:        : "border-cyan-800 bg-cyan-950/40 text-cyan-100 hover:border-cyan-400 hover:bg-cyan-900/60",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:171:    ].join(" ");
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:172:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:179:    if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:180:    const n = Number(valor);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:181:    if (!Number.isFinite(n)) return String(valor);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:182:    return n.toLocaleString("es-CO", {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:183:      minimumFractionDigits: decimales,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:184:      maximumFractionDigits: decimales,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:185:    });
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:186:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:187:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:195:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:196:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:197:  const formatTR = (p) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:198:    if (p?.etiqueta) return p.etiqueta;
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:199:    if (p?.tr !== undefined) return `Tr ${p.tr} años`;
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:200:    if (typeof p === "number") return `Tr ${p} años`;
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:201:    return "Tr —";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:202:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:203:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:204:  const estaciones = Array.isArray(estacionesAdoptadas)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:205:    ? estacionesAdoptadas
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:206:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:207:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:208:  const referenciasPendientes = Array.isArray(referenciaIDFPendiente)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:209:    ? referenciaIDFPendiente
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:210:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:211:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:212:  const metodosTc = Array.isArray(tc_metodos)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:213:    ? tc_metodos
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:214:    : Array.isArray(tc?.metodos)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:215:    ? tc.metodos
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:216:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:217:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:218:  const resumenTc = tc_resumen || tc?.resumen || null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:219:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:220:  const periodos = Array.isArray(periodos_retorno)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:221:    ? periodos_retorno
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:222:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:223:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:273:      fontSize: "11px",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:274:      fontWeight: 900,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:275:      textTransform: "uppercase",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:276:      letterSpacing: "0.06em",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:277:      display: "flex",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:278:      alignItems: "center",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:279:      gap: "6px",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:280:    },
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:413:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:414:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:415:  const [trStateIndice, setTrStateIndice] = useState(getTrState());
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:416:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:417:  useEffect(() => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:418:    const cancelarSuscripcionTr = subscribeTr(setTrStateIndice);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:419:    return cancelarSuscripcionTr;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:420:  }, []);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:421:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:422:  const periodosTrIndice = periodos.length > 0 ? periodos : [2.33, 5, 10, 25, 50, 100];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:423:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:424:  const trActivoIndice = Number(
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:425:    trStateIndice?.Tr_activo ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:426:      contexto?.tr_diseno_activo ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:427:      25
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:428:  );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:429:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:430:  const seleccionarTrIndice = (trValor) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:431:    const trNumerico = Number(trValor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:432:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:433:    if (!Number.isFinite(trNumerico)) {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:434:      return;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:435:    }
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:436:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:437:    setTrState({
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:438:      Tr_activo: trNumerico,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:439:      fuente: "IndiceHidrologico"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:440:    });
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:441:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:442:  const numeroIndiceSeguro = (valor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:443:    if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:454:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:455:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:456:  const racionalContextoIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:457:    contexto?.metodo_racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:458:    contexto?.racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:459:    contexto?.racional_exportable ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:460:    racional ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:461:    null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:462:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:463:  const resultadosRacionalIndice = Array.isArray(racionalContextoIndice?.resultados)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:464:    ? racionalContextoIndice.resultados
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:465:    : Array.isArray(racionalContextoIndice?.tabla)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:466:    ? racionalContextoIndice.tabla
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:467:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:468:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:469:  const trActivoNormalizadoIndice = numeroIndiceSeguro(trActivoIndice) ?? 25;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:470:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:471:  const resultadoRacionalTrIndice = resultadosRacionalIndice.find((fila) =>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:472:    Math.abs(Number(fila?.Tr) - trActivoNormalizadoIndice) < 0.001
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:473:  );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:474:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:475:  const areaRacionalIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:476:    numeroIndicePositivo(racionalContextoIndice?.area_km2) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:477:    numeroIndicePositivo(contexto?.area_km2) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:478:    numeroIndicePositivo(contexto?.area) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:479:    numeroIndicePositivo(contexto?.cuenca?.area_km2) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:480:    numeroIndicePositivo(area_km2);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:481:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:482:  const coeficienteRacionalTrIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:483:    numeroIndicePositivo(resultadoRacionalTrIndice?.C) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:484:    numeroIndicePositivo(C);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:485:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:486:  const qRacionalTrIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:487:    numeroIndicePositivo(resultadoRacionalTrIndice?.Q);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:488:  return (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:489:    <aside style={estilos.panel}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:490:      <h2 style={estilos.titulo}>Índice Hidrológico de la Cuenca</h2>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:491:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:492:      <p style={estilos.subtitulo}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:493:        Panel lector · La Iguaná PC_80 · Motor HidroFlow
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:494:      </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:495:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:496:      {/* 0. Cuenca activa */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:497:      <section style={estiloTarjeta("params")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:498:        <h3 style={estilos.cardTitle}>● Cuenca activa</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:499:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:500:        <p style={estilos.texto}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:501:          <strong>{cuencaNombre}</strong>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:502:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:503:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:504:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:505:          <span style={estilos.label}>Punto de control</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:506:          <span style={estilos.value}>{puntoControl}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:507:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:508:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:509:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:510:          <span style={estilos.label}>Área</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:511:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:512:            {formatNumero(area_km2, 4)} km²
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:513:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:514:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:515:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:516:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:517:          <span style={estilos.label}>Pendiente media</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:518:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:519:            {formatNumero(pendiente_media_pct, 2)} %
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:520:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:521:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:522:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:523:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:524:          <span style={{ ...estilos.chip, ...estilos.chipOk }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:525:            Geometría validada
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:526:          </span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:527:          <span style={estilos.chip}>{estadoTecnico}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:528:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:529:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:530:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:531:      {/* 1. IDF */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:532:      <section style={estiloTarjeta("idf")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:533:        <h3 style={estilos.cardTitle}>① Lluvia de diseño IDF</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:534:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:535:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:536:          <span style={estilos.label}>Método adoptado</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:537:          <span style={estilos.value}>{metodoIDF}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:538:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:539:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:540:        <p style={estilos.muted}>Estaciones con influencia operativa:</p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:541:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:542:        {estaciones.length > 0 ? (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:555:        )}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:556:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:557:        {ponderacionIDFPendiente && (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:558:          <>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:559:            <div style={estilos.separator} />
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:560:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:561:            <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:562:              Ponderación IDF multiestación pendiente de cálculo formal.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:563:            </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:564:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:565:            <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:566:              <span style={{ ...estilos.chip, ...estilos.chipWarn }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:567:                IDW / Thiessen / altitud · pendiente
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:568:              </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:569:            </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:570:          </>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:571:        )}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:572:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:573:        {referenciasPendientes.length > 0 && (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:574:          <>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:575:            <div style={estilos.separator} />
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:576:            <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:577:              Referencias externas registradas, no operativas:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:578:            </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:579:            <div style={estilos.chipRow}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:580:              {referenciasPendientes.map((ref, i) => (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:581:                <span
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:582:                  key={`${ref.nombre || ref.id || "ref"}-${i}`}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:583:                  style={{ ...estilos.chip, ...estilos.chipWarn }}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:584:                >
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:585:                  {ref.nombre || ref.id} · no operativa
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:590:        )}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:591:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:592:        <button style={estiloBoton("idf")} onClick={() => goToTab("idf")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:593:          Ver curvas IDF
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:594:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:595:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:596:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:597:      {/* 2. Distribución temporal */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:598:      <section style={estiloTarjeta("hietogramas")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:599:        <h3 style={estilos.cardTitle}>② Distribución temporal</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:600:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:601:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:602:          <span style={estilos.label}>Curva adoptada</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:603:          <span style={estilos.value}>{distribucionTemporal}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:604:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:605:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:606:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:607:          Define la concentración temporal de la lluvia y controla el pico de
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:608:          caudal.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:609:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:610:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:611:        <button style={estiloBoton("hietogramas")} onClick={() => goToTab("hiet")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:612:          Analizar distribución temporal
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:613:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:614:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:615:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:616:      {/* 3. Lluvia efectiva */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:617:      <section style={estiloTarjeta("hidrogramas")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:618:        <h3 style={estilos.cardTitle}>③ Lluvia efectiva SCS-CN</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:619:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:620:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:621:          <span style={estilos.label}>CN base</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:622:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:623:            {CN_base !== null && CN_base !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:624:              ? formatNumero(CN_base, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:625:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:626:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:627:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:628:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:629:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:630:          <span style={estilos.label}>CN efectivo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:631:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:632:            {CN_efectivo !== null && CN_efectivo !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:633:              ? formatNumero(CN_efectivo, 1)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:634:              : CN !== null && CN !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:635:              ? formatNumero(CN, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:636:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:637:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:638:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:639:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:640:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:672:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:673:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:674:          Parámetros leídos desde el resumen oficial del motor SCS-CN.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:675:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:676:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:677:        <div style={estilos.chipRow}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:678:          <span style={estilos.chip}>SCS-CN</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:679:          <span style={estilos.chip}>AMC/SIATA</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:680:          <span style={estilos.chip}>S · Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:681:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:682:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:683:        <button style={estiloBoton("hidrogramas")} onClick={() => goToTab("hidro")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:684:          Ver lluvia efectiva Pe(t)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:685:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:686:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:687:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:688:      {/* 4. Tiempo de concentración */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:689:<section style={estiloTarjeta("racional")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:690:  <h3 style={estilos.cardTitle}>④ Tiempo de concentración Tc</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:691:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:692:  <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:693:    <span style={estilos.label}>Tc sugerido</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:694:    <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:695:      {tcState?.Tc_final !== null && tcState?.Tc_final !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:696:        ? `${formatNumero(tcState.Tc_final, 1)} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:697:        : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:698:    </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:699:  </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:700:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:701:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:702:          <span style={estilos.label}>Métodos válidos</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:703:<span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:704:  {valoresTcAgente.length > 0
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:705:    ? valoresTcAgente.length
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:706:    : resumenTc?.n ?? metodosTc?.length ?? "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:707:</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:708:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:709:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:710:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:711:  <span style={estilos.label}>Rango bruto Tc</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:712:  <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:713:    {rangoTcAgente
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:714:      ? `${formatNumero(rangoTcAgente.min, 1)}–${formatNumero(
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:715:          rangoTcAgente.max,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:716:          1
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:717:        )} min`
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:718:      : resumenTc?.min_min !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:719:        resumenTc?.min_min !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:720:        resumenTc?.max_min !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:721:        resumenTc?.max_min !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:722:      ? `${formatNumero(resumenTc.min_min, 1)}–${formatNumero(
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:723:          resumenTc.max_min,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:724:          1
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:725:        )} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:726:      : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:727:  </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:728:</div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:729:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:730:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:731:          <span style={estilos.label}>Rango competente Tc</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:732:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:733:            {tcState?.rangoCompetenteTc
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:734:              ? formatNumero(tcState.rangoCompetenteTc.min, 1) + "–" +
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:735:                formatNumero(tcState.rangoCompetenteTc.max, 1) + " min"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:736:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:737:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:738:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:739:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:740:        {tcState?.Tc_final !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:741:          tcState?.Tc_final !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:742:          tcState?.rangoCompetenteTc?.min !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:743:          tcState?.rangoCompetenteTc?.max !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:744:          tcState.rangoCompetenteTc.max > tcState.rangoCompetenteTc.min &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:745:          (tcState.Tc_final - tcState.rangoCompetenteTc.min) /
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:746:            (tcState.rangoCompetenteTc.max - tcState.rangoCompetenteTc.min) <= 0.15 ? (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:747:          <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:748:            ⚠ Advertencia técnica: el Tc sugerido está cerca del borde inferior del rango competente. Se recomienda revisar sensibilidad con escenario rápido, sugerido y lento antes de adoptarlo como valor único robusto.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:749:          </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:750:        ) : null}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:751:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:752:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:753:          El Tc sugerido corresponde al resumen estadístico del motor. El Tc
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:754:          adoptado definitivo queda pendiente de criterio técnico.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:755:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:756:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:757:        <div style={estilos.chipRow}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:758:          {metodosTc.length > 0 ? (
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:759:            metodosTc.map((m, i) => (
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:760:              <span key={`${m.m || "tc"}-${i}`} style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:761:                {m.m?.replace(" (", " · ").replace(")", "") || "Tc"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:762:              </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:763:            ))
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:764:          ) : (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:765:            <>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:766:              <span style={estilos.chip}>Témez</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:774:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:775:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:776:        <button style={estiloBoton("racional")} onClick={() => goToTab("racional")}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:777:          >
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:778:        Analizar Tc
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:779:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:780:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:781:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:782:      {/* 5. Periodos de retorno */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:783:      <section style={estiloTarjeta("racional")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:784:        <h3 style={estilos.cardTitle}>⑤ Periodos de retorno</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:785:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:786:        <div style={estilos.chipRow}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:787:          {periodosTrIndice.map((trValor) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:788:            const activoTr = Number(trValor) === trActivoIndice;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:789:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:790:            return (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:791:              <button
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:792:                key={`tr-global-${trValor}`}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:793:                type="button"
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:794:                onClick={() => seleccionarTrIndice(trValor)}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:795:                title={`Activar Tr ${trValor} años`}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:796:                aria-pressed={activoTr}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:797:                style={{
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:798:                  ...estilos.chip,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:799:                  ...(activoTr ? estilos.chipOk : {}),
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:800:                  cursor: "pointer",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:801:                  border: activoTr
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:802:                    ? "1px solid rgba(34, 211, 238, 0.95)"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:803:                    : estilos.chip.border,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:804:                  background: activoTr
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:805:                    ? "rgba(34, 211, 238, 0.32)"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:806:                    : estilos.chip.background,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:807:                  boxShadow: activoTr
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:808:                    ? "0 0 0 1px rgba(34, 211, 238, 0.60), 0 0 14px rgba(34, 211, 238, 0.30)"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:809:                    : "none",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:810:                  transform: activoTr ? "translateY(-1px)" : "none",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:811:                  transition: "background 120ms ease, border 120ms ease, box-shadow 120ms ease, transform 120ms ease"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:812:                }}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:813:              >
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:814:                Tr {trValor} años
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:815:              </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:816:            );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:817:          })}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:818:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:819:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:820:        <p style={{ ...estilos.muted, marginTop: 8 }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:821:          Tr global activo: <strong style={{ color: "#67e8f9" }}>{trActivoIndice} años</strong>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:822:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:823:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:824:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:825:          Escenarios activos para cálculo hidrológico.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:826:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:829:          {periodos.length > 0 ? (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:830:            periodos.map((p, i) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:831:              const tr = p?.tr ?? p;
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:832:              const esBase = Number(tr) === 2.33;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:833:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:834:              return (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:835:                <span
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:836:                  key={`tr-${tr}-${i}`}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:837:                  style={{
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:838:                    ...estilos.chip,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:839:                    ...(esBase ? estilos.chipOk : {}),
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:840:                  }}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:841:                >
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:842:                  {formatTR(p)}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:843:                </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:844:              );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:845:            })
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:846:          ) : (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:847:            <>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:848:              <span style={{ ...estilos.chip, ...estilos.chipOk }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:849:                Tr 2.33 años
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:850:              </span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:851:              <span style={estilos.chip}>Tr 5 años</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:852:              <span style={estilos.chip}>Tr 10 años</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:853:              <span style={estilos.chip}>Tr 25 años</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:854:              <span style={estilos.chip}>Tr 50 años</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:855:              <span style={estilos.chip}>Tr 100 años</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:856:            </>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:857:          )}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:858:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:859:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:860:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:861:      {/* 6. Hidrograma */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:862:      <section style={estiloTarjeta("hidrogramas")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:863:        <h3 style={estilos.cardTitle}>⑥ Hidrograma Q(t)</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:864:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:865:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:866:          Compara la respuesta hidrológica por métodos SCS, Snyder, Clark,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:867:          Williams & Hann y otros módulos activos.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:868:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:869:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:870:        <button style={estilos.button} onClick={() => goToTab("hidro")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:871:          Ver hidrogramas
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:872:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:873:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:874:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:875:      {/* 7. Método racional */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:876:      <section style={estiloTarjeta("racional")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:877:        <h3 style={estilos.cardTitle}>⑦ Método racional</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:878:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:879:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:880:          <span style={estilos.label}>Uso recomendado</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:881:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:882:            {racional?.uso_recomendado || "Solo contraste referencial"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:883:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:884:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:885:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:886:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:887:          <span style={estilos.label}>Criterio área</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:888:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:889:            A ≤ {racional?.umbral_competencia_km2 ?? 5} km²
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:890:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:891:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:892:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:893:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:894:          <span style={estilos.label}>Área cuenca</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:895:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:896:            {areaRacionalIndice !== null ? formatNumero(areaRacionalIndice, 4) : "—"} km²
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:897:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:898:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:899:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:900:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:901:          <span style={estilos.label}>Competencia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:904:              ...estilos.value,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:905:              color:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:906:                racional?.competencia === "alta" ? "#9fffe8" : "#ffd166",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:907:            }}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:908:          >
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:909:            {racional?.competencia === "alta"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:910:              ? "Alta"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:911:              : "Baja / no principal"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:912:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:913:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:914:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:916:          <span style={estilos.label}>Coeficiente C</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:917:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:918:            {coeficienteRacionalTrIndice !== null ? formatNumero(coeficienteRacionalTrIndice, 4) : "Pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:919:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:920:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:921:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:922:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:923:          <span style={estilos.label}>Tr global activo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:924:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:925:            {trActivoIndice} años
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:926:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:927:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:928:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:929:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:930:          <span style={estilos.label}>Q racional Tr activo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:931:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:932:            {qRacionalTrIndice !== null ? `${formatNumero(qRacionalTrIndice, 2)} m³/s` : "Pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:933:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:934:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:935:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:936:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:937:          Para La Iguaná PC_80, el Método Racional se conserva como contraste
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:938:          referencial. El cálculo de C en función del CN queda en radar para el
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:939:          motor hidrológico.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:940:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:941:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:942:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:943:          <span style={{ ...estilos.chip, ...estilos.chipWarn }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:944:            {coeficienteRacionalTrIndice !== null ? `C Tr ${trActivoIndice}a = ${formatNumero(coeficienteRacionalTrIndice, 4)}` : "C = f(CN) · pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:945:          </span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:946:          <span style={estilos.chip}>Contraste</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:947:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:948:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:949:        <button style={estilos.button} onClick={() => goToTab("racional")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:950:          Ver método racional
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:951:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:952:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:953:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:954:      {/* 8. Resultados / Comparador Multi-Método */}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:955:      <section style={estiloTarjeta("comparador")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:956:        <h3 style={estilos.cardTitle}>⑧ Resultados característicos</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:957:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:958:       <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:959:         Comparador Hidrológico Multi-Método en construcción técnica. Integra matriz
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:960:         Tc-15 / Q-5, competencia de métodos, trazabilidad y soporte para adopción
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:961:         hidrológica defendible.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:962:       </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:963:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:964:       <button
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:965:         style={estiloBoton("comparador")}
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:966:         onClick={() => goToTab("comparador")}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:967:  >
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:968:          Abrir comparador multi-método
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:969:       </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:970:     </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:971:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:972:      {/* 9. Export */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:973:      <section style={estiloTarjeta("export")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:974:        <h3 style={estilos.cardTitle}>⑨ Export técnico</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:975:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:976:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:977:          Exportación de tablas, gráficos y soportes técnicos.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:978:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:979:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:980:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:981:          <button style={estilos.smallButton} onClick={() => goToTab("export")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:982:            Exportar CSV


## 6. HidroFlow.jsx — publicación hacia Índice / contexto vivo

  01_APP\HIDROFLOW\src\HidroFlow.jsx:1:import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3:import { useState, useMemo, useCallback, useRef, useEffect } from "react";
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:4:import { getTrState, subscribeTr } from "./agents/trAgent";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:5:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:6:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:7:  LineChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:8:  Line,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:9:  AreaChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:10:  Area,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:24:} from "recharts";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:25:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:26:import HidrogramaResultado from "./components/HidrogramaResultado";
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:27:import { getTcState, setTcState } from "./agents/tcAgent";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:28:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:29:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:30:  calcCNdinamico,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:31:  derivarAMCDesdeSIATA,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:32:  calcLluviaEfectiva,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:33:  calcTc,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:296:// ─── HIDROGRAMA COMPLETO (hietograma → convolución → Q(t)) ───────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:297:function calcHidroCompleto(lluvRows, uh_struct, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:298:  const peList=lluvRows.slice(1).map(r=>r.PeIncrem).filter((v,i,a)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:299:    // Incluir todos los incrementos positivos y su contexto
  01_APP\HIDROFLOW\src\HidroFlow.jsx:300:    return v>0 || (a[i-1]>0||a[i+1]>0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:301:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:302:  const peAll = lluvRows.slice(1).map(r=>Math.max(r.PeIncrem||0,0));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:303:  const qSeries = convolucion(uh_struct.uh, peAll, dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:304:  const Qpico = Math.max(...qSeries.map(r=>r.Q));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:305:  const tPico = qSeries.find(r=>r.Q>=Qpico*0.9999)?.t || 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:326:  return{excesos:exc, volTotal:+volAcum.toFixed(1)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:327:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:328:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:329:// Resumen racional
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:330:function calcRacional(est,area,tc_min,CN){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:  const S=25400/CN-254,Ia=0.2*S;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:332:  return TR_LIST.map(Tr=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:333:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:334:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:335:    const Cc=P>0?Math.min(Pe/P,1):0.3;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:336:    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:581:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:582:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:583:// ─── OUTLET MINI MAP ─────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:584:// Mini mapa SVG que muestra el punto de salida en contexto del Valle de Aburrá
  01_APP\HIDROFLOW\src\HidroFlow.jsx:585:// Se embebe dentro de la card Punto de Salida en ModParams
  01_APP\HIDROFLOW\src\HidroFlow.jsx:586:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:587:function OutletMiniMap({ lat, lon, alt, idf }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:588:  const W = 480;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:589:  const H = 165;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:590:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:591:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:592:  // 1. Estaciones EPM disponibles para contexto geográfico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:593:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:594:  const ests = Object.entries(ESTACIONES_EPM).map(([n, e]) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:595:    n,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:596:    lat: e.lat,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:597:    lon: e.lon,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:598:    alt: e.alt
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1902:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1903:// MÓDULO HIDROGRAMAS — 5 Métodos con convolución completa (robusto para gráficas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1904:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1905:function ModHidrogramas({ params, est, name, onContextoComparador }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1906:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1907:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1908:  // Evita crash por referencias residuales a guardarAMCenPanel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1909:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1910:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1911:  // ── Controles superiores
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1975:  const h0 = hidros?.[0] ?? null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1976:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1977:  useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1978:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1979:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1980:  const nombresHidrogramas = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1981:    "SCS Unit Hydrograph",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1982:    "SCS Modificado",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1983:    "Snyder",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1984:    "Williams & Hann",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2176:    volumen: h?.volTotal
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2177:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2178:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2179:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:      resultados: hidrogramasQ5Exportables
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2188:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2190:    hidrogramas_resumen: hidrogramasResumen,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2191:    hidrograma_principal: h0 ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2192:  }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2193:}, [onContextoComparador, hidros, h0, lluvEfect, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2194:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2195:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2196:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2197:  // Estado del hidrograma (QA) — objeto con flags para el panel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2198:const qaStatus = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2199:  const tcWarning = tc_min < 5 || tc_min > 180;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2677:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2678:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2679:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2680:// MÓDULO MÉTODO RACIONAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2681:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2682:function ModRacional({params,est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2683:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2684:  const tc_min=useMemo(()=>tcList.reduce((s,r)=>s+r.min,0)/(tcList.length||1),[tcList]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2685:  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2686:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2687:    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2688:    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2689:      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2690:      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2691:      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2692:    </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2693:    <Card title="Caudales Racionales — Todos los Tr" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2694:      <ResponsiveContainer width="100%" height={240}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2695:        <BarChart data={res} margin={{left:0,right:18,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2696:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2697:          <XAxis dataKey="Tr" tick={{fill:C.muted,fontSize:10}} label={{value:"Tr (años)",position:"insideBottom",offset:-4,fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2698:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Q (m³/s)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2699:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" "+nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2703:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2704:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2705:    </Card>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2706:    <Card title="Tabla — Parámetros y Caudales Racionales" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2707:      <Tbl headers={["Tr (a)","I (mm/h)","P (mm)","Coef. C","Q (m³/s)"]} rows={res} hiCols={[4]} accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2708:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2709:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2710:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2711:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2712:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3486:  {id:"idf",        label:"IDF",          icon:"⌁", acc:C.accent3,  desc:"20 Est. EPM 2025 · I=k/(c+d)ⁿ · PDF calibradas"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3487:  {id:"hiet",       label:"Hietogramas",  icon:"🌧", acc:C.accent,   desc:"GT-AS-004 §3.3 · Curvas Huff Q1-Q4 · 5 distribuciones"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3488:  {id:"hidro",      label:"Hidrogramas",  icon:"≋", acc:C.accent2,  desc:"SCS · SCS Mod. · Snyder · Williams&Hann · Clark IUH"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3489:  {id:"racional",   label:"Racional",     icon:"◈", acc:C.gold,     desc:"Q=C·I·A/3.6 · Abstracción SCS · Todos los Tr"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3490:  {id:"sar",        label:"SAR",          icon:"◫", acc:C.accent4,  desc:"GT-AS-004 §3 · Hietograma+Convolución+Vol. · PDF/Excel"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3491:  {id:"influencia", label:"Influencia",   icon:"⊕", acc:C.teal,     desc:"IDW · Thiessen · Altitudinal · Compuesto · Escenarios · Mapa AMVA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3492:  {id:"siata",      label:"SIATA",        icon:"🛰", acc:C.accent3,  desc:"API repopruebas.siata.gov.co · Series · Validación IDF · Arquitectura"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3493:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3494:export default function HidroFlow({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3495:  tab: tabExterno,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3496:  setTab: setTabExterno,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3497:  onContextoComparador,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3498:}) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3499:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3500:// Manejo de tabs (modo controlado / no controlado)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3501:// ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3502:const [tabInterno, setTabInterno] = useState("params");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3503:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3511:  const [params, setParams] = useState(() => getCuencaById(CUENCA_DEFAULT_ID));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3512:  const [stn, setStn] = useState("SAN CRISTOBAL");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3513:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3514:  const [trStateGlobal, setTrStateGlobal] = useState(getTrState());
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3515:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3516:  useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3517:    const cancelarSuscripcionTr = subscribeTr(setTrStateGlobal);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3518:    return cancelarSuscripcionTr;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3519:  }, []);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3520:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3521:useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3522:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3523:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3524:  const cnBase = Number.isFinite(params?.cnBase)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3525:    ? params.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3526:    : Number.isFinite(params?.CN)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3527:    ? params.CN
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3528:    : 75;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3529:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3530:  const metodosTcRacional = calcTc(params).filter((r) => Number.isFinite(r?.h) && r.h > 0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3531:  const tcRacionalMin =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3532:    metodosTcRacional.length > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3533:      ? metodosTcRacional.reduce((suma, metodo) => suma + Number(metodo.min || 0), 0) /
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3534:        metodosTcRacional.length
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3535:      : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3536:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3537:  const estacionRacional = ESTACIONES_EPM[stn];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3538:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3539:  const resultadosRacionalExportable =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3540:    estacionRacional &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3541:    Number.isFinite(Number(params?.area)) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3542:    Number.isFinite(Number(params?.CN)) &&
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3543:    Number.isFinite(Number(tcRacionalMin)) &&
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3544:    Number(tcRacionalMin) > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3545:      ? calcRacional(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3546:          estacionRacional,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3547:          Number(params.area),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3548:          Number(tcRacionalMin),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3549:          Number(params.CN)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3550:        )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3551:      : [];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3552:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    fuente: "motor HidroFlow",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:    estacion_idf: stn,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    periodos_retorno: TR_LIST,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    metodo_racional: {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3561:      estado: "informativo_no_adoptivo",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3562:      tc_min: Number.isFinite(Number(tcRacionalMin))
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3563:        ? Number(Number(tcRacionalMin).toFixed(2))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3564:        : null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3565:      resultados: resultadosRacionalExportable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3566:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3567:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3568:    cuencaNombre:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3569:      params?.nombreCuenca ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3570:      params?.cuencaNombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3571:      params?.nombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3572:      "Quebrada La Iguaná - PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3573:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3574:    area_km2:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3575:      params?.area_km2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3576:      params?.areaKm2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3577:      params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3578:      params?.A ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3579:      null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3580:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3581:    pendiente_media_pct:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3615:    hidrogramas_resumen: previo?.hidrogramas_resumen ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3616:    hidrograma_principal: previo?.hidrograma_principal ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3617:  }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3618:}, [onContextoComparador, params, stn, trStateGlobal?.Tr_activo]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3619:// Publicación base Tc para despertar el Índice Hidrológico global.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3620:// No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3621:useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3622:  const estadoTcActual = getTcState();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3623:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3624:  const agenteTieneEstado =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3625:    estadoTcActual?.Tc_final !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3626:    estadoTcActual?.Tc_final !== undefined &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3627:    estadoTcActual?.metodosTc;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3628:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3655:      ? params.tcMedMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3656:      : tcMedianaBase;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3657:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3658:  setTcState({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3659:    Tc_final: tcBase,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3660:    metodosTc: metodosTcBase,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3661:    contextoTc: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3662:      pendiente:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3663:        params?.pendiente_media_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3664:        params?.pendienteMediaPct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3665:        params?.pendiente_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3666:        params?.S_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3667:        params?.pendiente ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3668:        8.43,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3669:      area:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3670:        params?.area_km2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3671:        params?.areaKm2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3672:        params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3673:        params?.A ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3674:        null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3675:      CN: params?.CN ?? params?.cnBase ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3676:      fuente: "hidroflow_base"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3759:          setParams={setParams}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3760:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3761:      )}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3762:      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={name} onContextoComparador={onContextoComparador} />}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3763:      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3764:      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3765:      {tab === "Influencia" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3766:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3767:           padding: 20,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3768:           color: "#9fffe8",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3769:           fontFamily: "monospace"


## 7. ComparadorMultiMetodo — campos consumidos por Índice y expediente

  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1:import React, { useEffect, useMemo, useState } from "react";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:3:import { setTcState } from "../agents/tcAgent";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:4:import { calcTc, mapTcResultados } from "../services/hidroEngine";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:5:import { seleccionarTc } from "../services/tcSelector";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:6:import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:  resumenComparadorCatalogo,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:20:  obtenerCriterioPendientesAuditoria,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:21:} from "../data/auditoriaPendientesTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:22:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:23:export default function ComparadorMultiMetodo({ contexto = null }) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:24:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:25:  const [filtroEstado, setFiltroEstado] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:26:  const [filtroTipo, setFiltroTipo] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:27:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:28:  // ✅ CONTEXTO BASE
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:29:const contextoBase = contexto || {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:30:  cuencaNombre: "Quebrada La Iguaná - PC_80",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:31:  area_km2: 46.8516,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:32:  pendiente_media_pct: 8.43,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:33:  CN: 88,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:34:  lluvia_efectiva: true
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:35:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:36:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:37:const fuenteContexto = contexto ? "motor HidroFlow" : "contexto base";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:39:// ✅ DEFINICIÓN REAL DE p
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:40:const p = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:41:  longitud_cauce: 15.524,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:42:  area: contextoBase.area_km2,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:43:  pendiente_cuenca: contextoBase.pendiente_media_pct,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:44:  cota_mayor_cauce: 2819.27,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:45:  cota_menor_cauce: 1511.36,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:46:  cota_max: 2819.27,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:47:  cota_min: 1511.36,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:48:  CN: contextoBase.CN
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:49:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:50:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:51:// ✅ EJECUTAR MOTOR
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:52:const tcArray = calcTc(p);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:53:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:54:// ✅ MAPEAR RESULTADOS
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:56:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:57:// ✅ CONTEXTO HIDROLÓGICO
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:58:const contextoTc = {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:59:  pendiente: contextoBase.pendiente_media_pct,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:60:  area: contextoBase.area_km2,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:61:  CN: contextoBase.CN,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:62:  urbanizacion: 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:63:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:64:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:65:const evaluacionCompetencia = useMemo(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:66:  return evaluarCompetenciaComparador(contextoBase);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:67:}, [contextoBase]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:68:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:69:const conceptoCuenca = useMemo(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:70:  return conceptuarCuenca(contextoBase);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:71:}, [contextoBase]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:72:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:73:// ✅ Tc FINAL
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:74:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:75:const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:76:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:77:const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:80:);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:81:// ✅ Publicar Tc en el agente DESPUÉS del render
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:82:useEffect(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83:  if (Tc_final !== null && Tc_final !== undefined) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:84:    setTcState({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:85:      Tc_final,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:86:      metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:87:      contextoTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:88:      metodosTcCompetentes,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:89:      rangoCompetenteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:90:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:493:        Number(valor.r) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:494:        Number(valor.value) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:495:        Number(valor.min) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:496:        null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:497:      );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:498:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:499:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:500:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:501:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:502:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:503:  const bruto = contextoBase?.tc_metodos;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:504:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:505:  if (!bruto) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:506:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:507:  let candidatos = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:508:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:509:  if (Array.isArray(bruto)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:510:    candidatos = bruto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:511:  } else if (Array.isArray(bruto?.metodos)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:540:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:541:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:542:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:543:  if (!match) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:544:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:545:  return extraerNumero(match);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:546:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:547:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:548:const obtenerResultadoQMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:549:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:562:      }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:563:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:564:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:565:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:566:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:567:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:568:  const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:569:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:570:  if (!bruto) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:571:    return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:572:      Qp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:573:      Tp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:574:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:575:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:576:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:577:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:578:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:579:  const candidatos = Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:580:    ? bruto
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:603:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:604:  if (!match) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:605:    return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:606:      Qp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:607:      Tp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:608:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:609:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:610:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:611:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:612:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:613:  return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:614:    Qp: extraerNumero(match, ["Qp", "qp", "Qpico", "qPico", "q_pico", "caudalPico", "caudal_pico"]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:619:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:620:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:621:  const obtenerAuditoriaPendienteMetodo = (metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:622:    if (metodo.tipo !== "tc") return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:623:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:624:    return obtenerAuditoriaPendienteTc(metodo.id);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:625:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:626:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:627:  const renderVariablesSalida = (variablesSalida = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:628:    if (!Array.isArray(variablesSalida) || variablesSalida.length === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:776:    const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:777:      Number.isFinite(tcReferencia) && tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:778:        ? resultadoQ.Tp / tcReferencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:779:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:780:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:781:    const alertaTcTp =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:782:      tpRel !== null && (tpRel < 0.5 || tpRel > 1.5);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:783:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:784:    const estadoTemporal =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:785:      tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:786:        ? "sin referencia temporal"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:787:        : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:788:        ? "respuesta rápida"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:789:        : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:790:        ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:791:        : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:796:          {resultadoQ.Tp.toFixed(2)} min
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:797:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:798:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:799:          Tp/Tc: {tpRel !== null ? tpRel.toFixed(2) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? (resultadoQ.volumen / resultadoQ.Qp / 60).toFixed(0) + " min" : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:800:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:801:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:802:          Estado temporal: {estadoTemporal}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:803:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:804:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:805:          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:818:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:819:            ⚠ Alerta Tc/Tp
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:820:          </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:821:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:822:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:823:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:824:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:825:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:826:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:827:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:836:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:837:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:838:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:839:    const areaKm2 = Number(contextoBase?.area_km2);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:840:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:841:    const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:842:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:843:        ? areaKm2 * peTotalMm * 1000
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:844:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:845:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:846:    const relacionVolumen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:847:      volumenEsperadoM3 && volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:848:        ? resultadoQ.volumen / volumenEsperadoM3
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:849:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:850:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:851:    const estadoEscalaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:852:      relacionVolumen === null
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:853:        ? null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:854:        : relacionVolumen <= 2
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:855:        ? "escala razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:856:        : relacionVolumen <= 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:857:        ? "revisar escala"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:858:        : "fuera de escala";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:859:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:866:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:867:            {estadoEscalaVolumen} · {relacionVolumen.toFixed(1)}x
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:868:          </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:869:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:870:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:871:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:872:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:873:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:874:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:875:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:963:  >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:964:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:965:      <strong>Cuenca:</strong>{" "}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:966:      {contextoBase?.cuencaNombre ?? "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:967:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:968:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:969:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:970:      <strong>Área:</strong>{" "}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:971:      {Number.isFinite(contextoBase?.area_km2)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:972:        ? `${contextoBase.area_km2.toFixed(4)} km²`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:973:        : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:974:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:975:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:976:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:977:      <strong>Scp cauce principal:</strong>{" "}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:978:      {Number.isFinite(contextoBase?.pendiente_media_pct)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:979:        ? `${contextoBase.pendiente_media_pct} %`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:980:        : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:981:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:982:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:983:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:984:      <strong>Longitud cauce:</strong>{" "}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:985:      {Number.isFinite(contextoBase?.longitud_cauce_km)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:986:        ? `${contextoBase.longitud_cauce_km} km`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:987:        : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:988:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:989:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:990:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:991:      <strong>CN:</strong>{" "}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:992:      {Number.isFinite(contextoBase?.CN)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:993:        ? contextoBase.CN
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:994:        : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:995:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:996:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:997:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:998:      <strong>CN base:</strong>{" "}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:999:      {Number.isFinite(contextoBase?.CN_base)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1000:        ? contextoBase.CN_base
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1001:        : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1002:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1003:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1004:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1005:      <strong>CN efectivo:</strong>{" "}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1006:      {Number.isFinite(contextoBase?.CN_efectivo)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1007:        ? contextoBase.CN_efectivo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1008:        : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1009:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1010:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1011:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1012:      <strong>AMC:</strong>{" "}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1013:      {contextoBase?.AMC ?? "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1014:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1015:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1016:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1017:      <strong>Fuente:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1018:      <span style={{ color: "#22c55e", fontWeight: 800 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1019:        {fuenteContexto}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1122:            Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1123:            tiempos de respuesta, caudales pico e hidrogramas. Este módulo no
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1124:            adopta automáticamente resultados; organiza sensibilidad, competencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1125:            y trazabilidad para soporte de expediente técnico.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1126:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1127:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1128:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1129:        <div style={estilos.version}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1130:           {resumenComparadorCatalogo.version} · Fuente: {fuenteContexto}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1131:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1281:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1282:            "- Masa y volumen: controlados frente a la referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1283:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1285:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1286:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1287:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1288:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1289:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1290:            "- No se recalculan hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1292:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1293:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1294:            "Herramienta: HidroFlow.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1295:            "Tipo de salida: Expediente hidrológico mínimo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1296:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1297:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1298:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1299:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1300:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1301:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1302:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1303:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1304:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1305:          const areaTextoResumen = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1306:          areaTextoResumen.value = textoResumenQ5;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1335:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1336:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1337:        onClick={() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1338:          const areaKm2 = Number(contextoBase?.area_km2);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1339:          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1340:          const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1341:            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1342:              ? areaKm2 * peTotalMm * 1000
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1343:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1344:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1345:          const formatearNumeroExpediente = (valor, decimales = 2) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1346:            if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1347:              return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1348:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1349:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1350:            const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1351:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1352:            return Number.isFinite(numero)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1357:              : "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1358:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1359:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1360:          const obtenerEstadoTemporalExpediente = (resultadoQ) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1361:            const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1362:            const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1363:              Number.isFinite(resultadoQ?.Tp) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1364:              Number.isFinite(tcReferencia) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1365:              tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1366:                ? resultadoQ.Tp / tcReferencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1367:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1368:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1369:            return tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1370:              ? "sin referencia temporal"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1371:              : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1372:              ? "respuesta rápida"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1373:              : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1374:              ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1375:              : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1376:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1377:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1378:          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1379:            metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1380:              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1381:              : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1382:              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1383:              : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1384:              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1388:              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1389:              : `método comparativo; ${estadoTemporal}.`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1390:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1391:          const metodosQ5Expediente = metodos.filter(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1392:            (metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1393:              metodo.tipo === "q" &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1394:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1395:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1396:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1397:          const obtenerCandidatosQ5Contexto = () => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1398:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1399:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1400:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1401:              ? bruto
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1402:              : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1403:              ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1404:              : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1406:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1407:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1408:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1409:          const construirFilaQ5Expediente = (nombreMetodo, resultadoQ, dictamenMetodo = null) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1410:            const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1411:            const dictamen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1412:              dictamenMetodo ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413:              obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1414:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1416:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1417:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1419:            .map((metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1420:              const resultadoQ = obtenerResultadoQMetodo(metodo);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1421:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1422:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1423:              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1424:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1425:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1426:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1427:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1428:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1429:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1430:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1431:            .map((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1432:              const nombreMetodo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1433:                h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1434:                h?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1435:                h?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1436:                h?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:                  h?.volumenTotal
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:          const filasQ5Markdown =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1472:            filasQ5DesdeCatalogo.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1473:              ? filasQ5DesdeCatalogo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1478:            "|---|---:|---:|---:|---|---|",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479:            ...filasQ5Markdown
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1480:          ];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:          const estacionIdfExpediente = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1482:            contextoBase?.estacion_idf,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:            contextoBase?.estacionIDF,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:            contextoBase?.estacion,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1485:            contextoBase?.nombre_estacion,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1486:            contextoBase?.idf?.nombre,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1487:            contextoBase?.idf?.estacion
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1488:          ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1489:            .map((valor) => String(valor ?? "").trim())
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1490:            .find((valor) => valor && valor !== "—") ?? "SAN CRISTOBAL";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1491:          const faltantesExpediente = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1492:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1493:          if (!estacionIdfExpediente) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1494:            faltantesExpediente.push("Estación IDF");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1495:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1496:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1497:          if (!Number.isFinite(areaKm2)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1498:            faltantesExpediente.push("Área de cuenca");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1499:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1500:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1501:          if (!Number.isFinite(peTotalMm)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1502:            faltantesExpediente.push("Lluvia efectiva total");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1503:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1504:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1505:          if (!Number.isFinite(volumenEsperadoM3)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1506:            faltantesExpediente.push("Volumen esperado");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1507:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1508:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1509:          if (!Array.isArray(filasQ5Markdown) || filasQ5Markdown.length === 0) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1510:            faltantesExpediente.push("Tabla Q-5 auditada con filas reales");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1511:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1512:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1513:          if (
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1514:            !Array.isArray(contextoBase?.metodo_racional?.resultados) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1515:            contextoBase.metodo_racional.resultados.length === 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1516:          ) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517:            faltantesExpediente.push("Tabla Método Racional");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1518:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1519:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1520:          if (faltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1521:            window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1522:              [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1523:                "Expediente hidrológico mínimo incompleto.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1524:                "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1525:                "Antes de copiar el expediente firmado, publique el contexto hidrológico completo desde Hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1526:                "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1527:                "Faltan:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1528:                ...faltantesExpediente.map((item) => `- ${item}`)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1529:              ].join("\n")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1530:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1531:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1532:            return;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1533:          }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1534:          const trDisenoActivoExpediente = Number.isFinite(Number(contextoBase?.tr_diseno_activo))
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1535:            ? Number(contextoBase.tr_diseno_activo)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1536:            : 25;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1537:          const textoExpediente = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1538:            "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1539:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1540:            "## 1. Identificación",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1541:            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1542:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1543:            `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1544:            `Estación IDF: ${estacionIdfExpediente}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1545:            `Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1546:            `Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1547:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1548:            "## 2. Parámetros hidrológicos base",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1549:            `CN: ${contextoBase?.CN ?? "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1550:            `CN base: ${contextoBase?.CN_base ?? "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1551:            `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1552:            `AMC: ${contextoBase?.AMC ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1553:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1554:            "## 3. Tiempo de concentración y roles Tc",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1555:            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1558:            "Roles Tc:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1559:            "- Tc global Índice: referencia hidrológica general.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1560:            "- Tc operativo Q(t): ruta interna del hidrograma.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1561:            "- Duración evento: 3 h para almacenamiento/regulación.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1562:            "- Lag / forma SCS: parámetro derivado para forma temporal.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:            ...tablaQ5Markdown,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:            "## 6. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:            "Uso: contraste global independiente de caudal pico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1585:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1586:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1588:              ? [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1589:                  `Tc racional exportado: ${
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1590:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1591:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:                  "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:                  "Tabla Método Racional:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:                  "| Tr | I | P | C | Q |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:                  "|---:|---:|---:|---:|---:|",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:                  ...contextoBase.metodo_racional.resultados.map((r) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:                    `| ${r.Tr} | ${formatearNumeroExpediente(r.I)} mm/h | ${formatearNumeroExpediente(r.P)} mm | ${formatearNumeroExpediente(r.C, 4)} | ${formatearNumeroExpediente(r.Q)} m³/s |`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:                  )
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:                ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:              : [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:                  "Disponibilidad: resultados no disponibles en el contexto exportable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:                  "Estado: sección informativa; consultar módulo Método Racional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:                ]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:            "## 7. Contraste Q-5 vs Método Racional",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1611:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1612:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1613:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1614:            "## 8. Restricciones técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1615:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1616:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1617:            "- No se modifica el motor hidrológico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:            "- No se recalculan hidrogramas en este expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1619:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1620:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:            "Herramienta: HidroFlow.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:            "Tipo de salida: Expediente hidrológico mínimo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:          const areaTexto = document.createElement("textarea");
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1634:          areaTexto.value = textoExpediente;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1635:          areaTexto.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1636:          areaTexto.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1637:          areaTexto.style.left = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1638:          areaTexto.style.top = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1639:          document.body.appendChild(areaTexto);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1640:          areaTexto.focus();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1651:          document.body.removeChild(areaTexto);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1652:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1653:          if (copiado) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1654:            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1655:          } else {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1656:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1657:          }        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1658:        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1659:      >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1660:        Copiar expediente hidrológico mínimo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1661:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1662:      {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663:        const areaKm2 = Number(contextoBase?.area_km2);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1664:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665:        const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:            ? areaKm2 * peTotalMm * 1000
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:          </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:


## 8. Agente Tc — estado global

  01_APP\HIDROFLOW\src\agents\tcAgent.js:2:// AGENTE Tc con notificación reactiva
  01_APP\HIDROFLOW\src\agents\tcAgent.js:3:// ============================================================
  01_APP\HIDROFLOW\src\agents\tcAgent.js:4:
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:5:let TcState = {
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:6:  Tc_final: null,
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:7:  metodosTc: null,
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:8:  contextoTc: null
  01_APP\HIDROFLOW\src\agents\tcAgent.js:9:};
  01_APP\HIDROFLOW\src\agents\tcAgent.js:10:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:11:let listeners = [];
  01_APP\HIDROFLOW\src\agents\tcAgent.js:12:
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:13:export function setTcState(data) {
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:14:  TcState = { ...TcState, ...data };
  01_APP\HIDROFLOW\src\agents\tcAgent.js:15:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:16:  // 🔥 notifica a todos los componentes
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:17:  listeners.forEach(fn => fn(TcState));
  01_APP\HIDROFLOW\src\agents\tcAgent.js:18:}
  01_APP\HIDROFLOW\src\agents\tcAgent.js:19:
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:20:export function getTcState() {
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:21:  return TcState;
  01_APP\HIDROFLOW\src\agents\tcAgent.js:22:}
  01_APP\HIDROFLOW\src\agents\tcAgent.js:23:
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:24:export function subscribeTc(listener) {
  01_APP\HIDROFLOW\src\agents\tcAgent.js:25:  listeners.push(listener);
  01_APP\HIDROFLOW\src\agents\tcAgent.js:26:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:27:  return () => {
  01_APP\HIDROFLOW\src\agents\tcAgent.js:28:    listeners = listeners.filter(l => l !== listener);
  01_APP\HIDROFLOW\src\agents\tcAgent.js:29:  };
  01_APP\HIDROFLOW\src\agents\tcAgent.js:30:}


## 9. Agente Tr — estado global

> 01_APP\HIDROFLOW\src\agents\trAgent.js:1:let trState = {
> 01_APP\HIDROFLOW\src\agents\trAgent.js:2:  Tr_activo: 25,
  01_APP\HIDROFLOW\src\agents\trAgent.js:3:  fuente: "default",
> 01_APP\HIDROFLOW\src\agents\trAgent.js:4:  actualizado_en: null
  01_APP\HIDROFLOW\src\agents\trAgent.js:5:};
  01_APP\HIDROFLOW\src\agents\trAgent.js:6:
  01_APP\HIDROFLOW\src\agents\trAgent.js:7:const suscriptores = new Set();
  01_APP\HIDROFLOW\src\agents\trAgent.js:8:
> 01_APP\HIDROFLOW\src\agents\trAgent.js:9:export function getTrState() {
> 01_APP\HIDROFLOW\src\agents\trAgent.js:10:  return trState;
  01_APP\HIDROFLOW\src\agents\trAgent.js:11:}
  01_APP\HIDROFLOW\src\agents\trAgent.js:12:
> 01_APP\HIDROFLOW\src\agents\trAgent.js:13:export function setTrState(parcial = {}) {
> 01_APP\HIDROFLOW\src\agents\trAgent.js:14:  trState = {
> 01_APP\HIDROFLOW\src\agents\trAgent.js:15:    ...trState,
  01_APP\HIDROFLOW\src\agents\trAgent.js:16:    ...parcial,
  01_APP\HIDROFLOW\src\agents\trAgent.js:17:    actualizado_en: new Date().toISOString()
  01_APP\HIDROFLOW\src\agents\trAgent.js:18:  };
  01_APP\HIDROFLOW\src\agents\trAgent.js:19:
> 01_APP\HIDROFLOW\src\agents\trAgent.js:20:  suscriptores.forEach((fn) => fn(trState));
  01_APP\HIDROFLOW\src\agents\trAgent.js:21:}
  01_APP\HIDROFLOW\src\agents\trAgent.js:22:
> 01_APP\HIDROFLOW\src\agents\trAgent.js:23:export function subscribeTr(fn) {
  01_APP\HIDROFLOW\src\agents\trAgent.js:24:  if (typeof fn !== "function") {
  01_APP\HIDROFLOW\src\agents\trAgent.js:25:    return () => {};
  01_APP\HIDROFLOW\src\agents\trAgent.js:26:  }
  01_APP\HIDROFLOW\src\agents\trAgent.js:27:
  01_APP\HIDROFLOW\src\agents\trAgent.js:28:  suscriptores.add(fn);
> 01_APP\HIDROFLOW\src\agents\trAgent.js:29:  fn(trState);
  01_APP\HIDROFLOW\src\agents\trAgent.js:30:
  01_APP\HIDROFLOW\src\agents\trAgent.js:31:  return () => {
  01_APP\HIDROFLOW\src\agents\trAgent.js:32:    suscriptores.delete(fn);
  01_APP\HIDROFLOW\src\agents\trAgent.js:33:  };
  01_APP\HIDROFLOW\src\agents\trAgent.js:34:}


## 10. Búsqueda global controlada de valores problemáticos en componentes principales

  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:21:  }, []);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:22:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:23:  const valoresTcAgente = Object.values(tcState?.metodosTc || {})
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:24:  .map((valor) => Number(valor))
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:25:  .filter((valor) => Number.isFinite(valor) && valor > 0);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:26:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:27:const rangoTcAgente =
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:31:        max: Math.max(...valoresTcAgente),
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:32:      }
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:33:    : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:34:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:35:  // -------------------------------------
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:36:  const {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:37:    tabActiva = "params",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:38:    area_km2 = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:39:    estacionesAdoptadas = [],
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:40:    metodoIDF = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:41:    distribucionTemporal = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:42:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:43:    // SCS-CN / motor
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:44:    CN = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:45:    CN_base = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:46:    CN_efectivo = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:47:    AMC = "II",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:48:    S_mm = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:49:    Ia_mm = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:50:    porcentaje_impermeable = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:51:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:52:    // Racional
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:53:    C = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:54:    racional = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:55:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:56:    // Cuenca
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:57:    cuencaNombre = "Cuenca activa",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:58:    puntoControl = "PC",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:59:    pendiente_media_pct = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:60:    estadoTecnico = "En validación",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:61:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:62:    // IDF futura
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:63:    referenciaIDFPendiente = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:65:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:66:    // Tc
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:67:    tc = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:68:    tc_sugerido_min = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:69:    tc_metodos = [],
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:70:    tc_resumen = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:71:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:72:    // Periodos de retorno
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:73:    periodos_retorno = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:74:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:75:    // Resumen completo futuro
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:76:    resumenMotor = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:77:  } = contexto || {};
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:78:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:79:  const tabActual = tabActivaProp || tabActiva || tab || "params";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:80:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:113:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:114:      racional: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:115:      metodo_racional: "racional",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:116:      método_racional: "racional",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:117:      racional_qp: "racional",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:118:      tc: "racional",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:119:      tiempo_concentracion: "racional",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:120:      tiempo_concentración: "racional",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:177:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:178:  const formatNumero = (valor, decimales = 2) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:179:    if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:180:    const n = Number(valor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:181:    if (!Number.isFinite(n)) return String(valor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:182:    return n.toLocaleString("es-CO", {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:183:      minimumFractionDigits: decimales,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:197:  const formatTR = (p) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:198:    if (p?.etiqueta) return p.etiqueta;
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:199:    if (p?.tr !== undefined) return `Tr ${p.tr} años`;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:200:    if (typeof p === "number") return `Tr ${p} años`;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:201:    return "Tr —";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:202:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:203:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:210:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:211:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:212:  const metodosTc = Array.isArray(tc_metodos)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:213:    ? tc_metodos
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:214:    : Array.isArray(tc?.metodos)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:215:    ? tc.metodos
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:216:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:217:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:218:  const resumenTc = tc_resumen || tc?.resumen || null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:219:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:220:  const periodos = Array.isArray(periodos_retorno)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:221:    ? periodos_retorno
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:222:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:441:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:442:  const numeroIndiceSeguro = (valor) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:443:    if (valor === null || valor === undefined || valor === "") {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:444:      return null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:445:    }
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:446:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:447:    const numero = Number(valor);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:448:    return Number.isFinite(numero) ? numero : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:449:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:450:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:451:  const numeroIndicePositivo = (valor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:452:    const numero = numeroIndiceSeguro(valor);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:453:    return numero !== null && numero > 0 ? numero : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:454:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:455:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:456:  const racionalContextoIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:457:    contexto?.metodo_racional ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:458:    contexto?.racional ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:459:    contexto?.racional_exportable ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:460:    racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:461:    null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:462:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:463:  const resultadosRacionalIndice = Array.isArray(racionalContextoIndice?.resultados)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:464:    ? racionalContextoIndice.resultados
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:465:    : Array.isArray(racionalContextoIndice?.tabla)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:534:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:535:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:536:          <span style={estilos.label}>Método adoptado</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:537:          <span style={estilos.value}>{metodoIDF}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:538:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:539:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:540:        <p style={estilos.muted}>Estaciones con influencia operativa:</p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:541:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:621:          <span style={estilos.label}>CN base</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:622:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:623:            {CN_base !== null && CN_base !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:624:              ? formatNumero(CN_base, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:625:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:626:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:627:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:630:          <span style={estilos.label}>CN efectivo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:631:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:632:            {CN_efectivo !== null && CN_efectivo !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:633:              ? formatNumero(CN_efectivo, 1)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:634:              : CN !== null && CN !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:635:              ? formatNumero(CN, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:636:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:637:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:638:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:646:          <span style={estilos.label}>S</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:647:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:648:            {S_mm !== null && S_mm !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:649:              ? `${formatNumero(S_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:650:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:651:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:652:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:655:          <span style={estilos.label}>Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:656:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:657:            {Ia_mm !== null && Ia_mm !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:658:              ? `${formatNumero(Ia_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:659:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:660:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:661:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:664:          <span style={estilos.label}>Impermeabilidad</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:665:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:666:            {porcentaje_impermeable !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:667:            porcentaje_impermeable !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:668:              ? `${formatNumero(porcentaje_impermeable, 1)} %`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:669:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:670:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:671:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:693:    <span style={estilos.label}>Tc sugerido</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:694:    <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:695:      {tcState?.Tc_final !== null && tcState?.Tc_final !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:696:        ? `${formatNumero(tcState.Tc_final, 1)} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:697:        : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:698:    </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:699:  </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:700:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:701:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:702:          <span style={estilos.label}>Métodos válidos</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:703:<span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:704:  {valoresTcAgente.length > 0
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:705:    ? valoresTcAgente.length
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:706:    : resumenTc?.n ?? metodosTc?.length ?? "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:707:</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:708:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:709:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:710:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:716:          1
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:717:        )} min`
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:718:      : resumenTc?.min_min !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:719:        resumenTc?.min_min !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:720:        resumenTc?.max_min !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:721:        resumenTc?.max_min !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:722:      ? `${formatNumero(resumenTc.min_min, 1)}–${formatNumero(
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:723:          resumenTc.max_min,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:724:          1
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:725:        )} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:738:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:739:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:740:        {tcState?.Tc_final !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:741:          tcState?.Tc_final !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:742:          tcState?.rangoCompetenteTc?.min !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:743:          tcState?.rangoCompetenteTc?.max !== undefined &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:744:          tcState.rangoCompetenteTc.max > tcState.rangoCompetenteTc.min &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:745:          (tcState.Tc_final - tcState.rangoCompetenteTc.min) /
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:746:            (tcState.rangoCompetenteTc.max - tcState.rangoCompetenteTc.min) <= 0.15 ? (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:747:          <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:748:            ⚠ Advertencia técnica: el Tc sugerido está cerca del borde inferior del rango competente. Se recomienda revisar sensibilidad con escenario rápido, sugerido y lento antes de adoptarlo como valor único robusto.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:749:          </p>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:750:        ) : null}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:751:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:752:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:753:          El Tc sugerido corresponde al resumen estadístico del motor. El Tc
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:754:          adoptado definitivo queda pendiente de criterio técnico.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:756:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:757:        <div style={estilos.chipRow}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:758:          {metodosTc.length > 0 ? (
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:759:            metodosTc.map((m, i) => (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:760:              <span key={`${m.m || "tc"}-${i}`} style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:761:                {m.m?.replace(" (", " · ").replace(")", "") || "Tc"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:762:              </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:763:            ))
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:864:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:865:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:866:          Compara la respuesta hidrológica por métodos SCS, Snyder, Clark,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:867:          Williams & Hann y otros módulos activos.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:868:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:869:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:870:        <button style={estilos.button} onClick={() => goToTab("hidro")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:873:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:874:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:875:      {/* 7. Método racional */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:876:      <section style={estiloTarjeta("racional")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:877:        <h3 style={estilos.cardTitle}>⑦ Método racional</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:878:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:879:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:880:          <span style={estilos.label}>Uso recomendado</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:881:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:894:          <span style={estilos.label}>Área cuenca</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:895:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:896:            {areaRacionalIndice !== null ? formatNumero(areaRacionalIndice, 4) : "—"} km²
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:897:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:898:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:899:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:900:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:916:          <span style={estilos.label}>Coeficiente C</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:917:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:918:            {coeficienteRacionalTrIndice !== null ? formatNumero(coeficienteRacionalTrIndice, 4) : "Pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:919:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:920:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:921:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:922:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:930:          <span style={estilos.label}>Q racional Tr activo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:931:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:932:            {qRacionalTrIndice !== null ? `${formatNumero(qRacionalTrIndice, 2)} m³/s` : "Pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:933:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:934:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:935:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:936:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:937:          Para La Iguaná PC_80, el Método Racional se conserva como contraste
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:938:          referencial. El cálculo de C en función del CN queda en radar para el
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:939:          motor hidrológico.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:940:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:941:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:942:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:943:          <span style={{ ...estilos.chip, ...estilos.chipWarn }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:944:            {coeficienteRacionalTrIndice !== null ? `C Tr ${trActivoIndice}a = ${formatNumero(coeficienteRacionalTrIndice, 4)}` : "C = f(CN) · pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:945:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:946:          <span style={estilos.chip}>Contraste</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:947:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:948:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:949:        <button style={estilos.button} onClick={() => goToTab("racional")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:950:          Ver método racional
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:951:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:952:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:953:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:954:      {/* 8. Resultados / Comparador Multi-Método */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:955:      <section style={estiloTarjeta("comparador")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:956:        <h3 style={estilos.cardTitle}>⑧ Resultados característicos</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:957:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:958:       <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:959:         Comparador Hidrológico Multi-Método en construcción técnica. Integra matriz
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:960:         Tc-15 / Q-5, competencia de métodos, trazabilidad y soporte para adopción
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:961:         hidrológica defendible.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:962:       </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:963:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:964:       <button
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:966:         onClick={() => goToTab("comparador")}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:967:  >
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:968:          Abrir comparador multi-método
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:969:       </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:970:     </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:971:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:972:      {/* 9. Export */}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:  resumenComparadorCatalogo,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:10:} from "../data/metodosComparadorCatalogo";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:11:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:12:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:13:  evaluarCompetenciaComparador,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:14:} from "../data/matrizCompetenciaComparador";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:21:} from "../data/auditoriaPendientesTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:22:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:23:export default function ComparadorMultiMetodo({ contexto = null }) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:24:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:25:  const [filtroEstado, setFiltroEstado] = useState("todos");
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:26:  const [filtroTipo, setFiltroTipo] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:27:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:28:  // ✅ CONTEXTO BASE
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:29:const contextoBase = contexto || {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:30:  cuencaNombre: "Quebrada La Iguaná - PC_80",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:53:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:54:// ✅ MAPEAR RESULTADOS
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:55:const metodosTc = mapTcResultados(tcArray);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:56:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:57:// ✅ CONTEXTO HIDROLÓGICO
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:58:const contextoTc = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:59:  pendiente: contextoBase.pendiente_media_pct,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:73:// ✅ Tc FINAL
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:74:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:75:const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:76:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:77:const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:78:  metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:79:  evaluacionCompetencia?.tc
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:80:);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:81:// ✅ Publicar Tc en el agente DESPUÉS del render
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:82:useEffect(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83:  if (Tc_final !== null && Tc_final !== undefined) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:84:    setTcState({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:85:      Tc_final,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:86:      metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:87:      contextoTc,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:88:      metodosTcCompetentes,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:89:      rangoCompetenteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:90:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:91:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:92:}, [Tc_final]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:95:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:96:  // ✅ Y SOLO AQUÍ VA EL RETURN
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:97: // ✅ BLOQUE CONSISTENTE DE MÉTODOS
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:98:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:99:const metodos = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:100:  if (!evaluacionCompetencia) return [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:101:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:102:  const base = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:103:    ...evaluacionCompetencia.tc.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:113:  return base.filter(m => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:114:    const pasaEstado =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:115:      filtroEstado === "todos" ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:116:      m.estadoImplementacion === filtroEstado;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:117:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:118:    const pasaTipo =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:119:      filtroTipo === "todos" ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:120:      m.tipo === filtroTipo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:121:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:122:    return pasaEstado && pasaTipo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:123:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:127:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:128:const conteo = useMemo(() => ({
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:129:  total: metodos.length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:130:  tc: metodos.filter(m => m.tipo === "tc").length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:131:  q: metodos.filter(m => m.tipo === "q").length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:132:  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:133:  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:134:}), [metodos]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:135:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:136:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:137:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:138:  const estilos = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:285:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:286:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:287:    nombreMetodo: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:288:      color: "#ffffff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:289:      fontWeight: 900,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:290:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:291:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:446:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:447:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:448:  const renderSemaforo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:449:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:450:      <div style={estilos.semaforoWrap}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:451:        <span style={estiloSemaforo(metodo.semaforo)} />
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:452:        <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:453:          {metodo.estadoCompetencia || "sin evaluar"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:454:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:455:        <span style={estilos.puntaje}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:456:          {metodo.puntajeCompetencia ?? "—"} / 100
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:457:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:458:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:459:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:460:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:472:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:473:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:474:  const obtenerTcMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:475:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:476:    String(valor ?? "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:477:      .toLowerCase()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:478:      .normalize("NFD")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:494:        Number(valor.value) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:495:        Number(valor.min) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:496:        null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:497:      );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:498:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:499:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:500:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:501:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:502:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:503:  const bruto = contextoBase?.tc_metodos;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:504:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:505:  if (!bruto) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:506:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:507:  let candidatos = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:508:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:509:  if (Array.isArray(bruto)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:510:    candidatos = bruto;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:511:  } else if (Array.isArray(bruto?.metodos)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:512:    candidatos = bruto.metodos;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:513:  } else if (Array.isArray(bruto?.resultados)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:514:    candidatos = bruto.resultados;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:515:  } else if (Array.isArray(bruto?.items)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:516:    candidatos = bruto.items;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:522:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:523:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:524:  const nombreCatalogo = normalizarTexto(metodo.nombre);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:525:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:526:  const match = candidatos.find((m) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:527:    const nombreDato = normalizarTexto(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:528:      m?.nombre ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:529:        m?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:530:        m?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:531:        m?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:532:        m?.m ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:533:        m?.id ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:541:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:542:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:543:  if (!match) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:544:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:545:  return extraerNumero(match);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:546:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:547:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:548:const obtenerResultadoQMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:549:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:550:    String(valor ?? "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:551:      .toLowerCase()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:552:      .normalize("NFD")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:563:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:564:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:565:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:566:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:567:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:568:  const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:569:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:570:  if (!bruto) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:571:    return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:572:      Qp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:573:      Tp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:574:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:575:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:576:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:577:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:578:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:579:  const candidatos = Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:580:    ? bruto
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:581:    : Array.isArray(bruto?.metodos)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:582:    ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:583:    : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:584:    ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:585:    : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:586:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:587:  const nombreCatalogo = normalizarTexto(metodo.nombre);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:588:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:589:  const match = candidatos.find((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:590:    const nombreDato = normalizarTexto(
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:591:      h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:592:        h?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:593:        h?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:594:        h?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:595:        h?.id
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:604:  if (!match) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:605:    return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:606:      Qp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:607:      Tp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:608:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:609:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:610:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:611:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:612:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:619:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:620:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:621:  const obtenerAuditoriaPendienteMetodo = (metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:622:    if (metodo.tipo !== "tc") return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:623:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:624:    return obtenerAuditoriaPendienteTc(metodo.id);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:625:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:626:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:627:  const renderVariablesSalida = (variablesSalida = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:628:    if (!Array.isArray(variablesSalida) || variablesSalida.length === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:638:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:639:  const renderTabla = (titulo, tipo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:640:    const datos = metodos.filter((metodo) => metodo.tipo === tipo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:641:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:642:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:643:      <section style={estilos.bloque}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:644:        <h2 style={estilos.bloqueTitulo}>{titulo}</h2>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:648:            <thead>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:649:              <tr>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:650:                <th style={estilos.th}>Método</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:651:                <th style={estilos.th}>Estado</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:652:                <th style={estilos.th}>Competencia</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:653:                <th style={estilos.th}>Escala</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:654:                <th style={estilos.th}>Requiere</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:664:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:665:            <tbody>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:666:              {datos.map((metodo) => (
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:667:                <tr key={metodo.id}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:668:                  <td style={estilos.td}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:669:                    <div style={estilos.nombreMetodo}>{metodo.nombre}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:670:                    <div style={{ color: "#88a7bd", marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:671:                      {metodo.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:672:                    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:673:                  </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:674:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:675:                  <td style={estilos.td}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:676:                    <span style={estiloChipEstado(metodo.estadoImplementacion)}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:677:                      {metodo.estadoImplementacion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:678:                    </span>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:679:                    <span style={estilos.chip}>{metodo.bloque}</span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:680:                  </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:681:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:682:                  <td style={estilos.td}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:683:                    {renderSemaforo(metodo)}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:684:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:685:                   <div style={{ marginTop: "6px", color: "#88a7bd" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:686:                     Catálogo: {metodo.competencia}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:687:                   </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:688:                  </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:689:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:690:                  <td style={estilos.td}>{metodo.escala}</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:691:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:692:                  <td style={estilos.td}>{renderRequiere(metodo.requiere)}</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:693:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:694:                  <td style={estilos.td}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:695:                    {renderVariablesSalida(metodo.variablesSalida)}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:696:                  </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:697:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:698:                  <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:699:                    {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:700:                      const tcValor = obtenerTcMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:701:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:702:                      if (!Number.isFinite(tcValor)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:703:                        return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:704:                    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:714:                 <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:715:  {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:716:    const auditoriaPendiente = obtenerAuditoriaPendienteMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:717:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:718:    if (!auditoriaPendiente) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:719:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:720:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:743:                 <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:744:  {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:745:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:746:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:747:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:748:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:749:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:750:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:751:    if (!Number.isFinite(resultadoQ.Qp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:752:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:753:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:763:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:764:  {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:765:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:766:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:767:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:768:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:769:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:770:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:771:    if (!Number.isFinite(resultadoQ.Tp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:772:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:773:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:777:      Number.isFinite(tcReferencia) && tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:778:        ? resultadoQ.Tp / tcReferencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:779:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:780:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:781:    const alertaTcTp =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:782:      tpRel !== null && (tpRel < 0.5 || tpRel > 1.5);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:783:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:784:    const estadoTemporal =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:785:      tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:786:        ? "sin referencia temporal"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:787:        : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:788:        ? "respuesta rápida"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:789:        : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:797:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:798:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:799:          Tp/Tc: {tpRel !== null ? tpRel.toFixed(2) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? (resultadoQ.volumen / resultadoQ.Qp / 60).toFixed(0) + " min" : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:800:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:801:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:802:          Estado temporal: {estadoTemporal}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:803:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:804:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:805:          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:806:            ? `candidato principal; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:807:            : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:808:            ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:809:            : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:810:            ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:811:            : metodo.nombre?.includes("Williams")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:812:            ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:813:            : metodo.nombre?.includes("Clark")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:814:            ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:815:            : `método comparativo; ${estadoTemporal}.`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:816:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:817:        {alertaTcTp ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:818:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:819:            ⚠ Alerta Tc/Tp
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:820:          </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:821:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:822:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:823:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:824:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:825:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:827:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:828:  {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:829:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:830:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:831:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:832:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:833:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:834:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:835:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:836:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:837:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:842:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:843:        ? areaKm2 * peTotalMm * 1000
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:844:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:845:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:846:    const relacionVolumen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:847:      volumenEsperadoM3 && volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:848:        ? resultadoQ.volumen / volumenEsperadoM3
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:849:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:850:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:851:    const estadoEscalaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:852:      relacionVolumen === null
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:853:        ? null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:854:        : relacionVolumen <= 2
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:855:        ? "escala razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:856:        : relacionVolumen <= 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:857:        ? "revisar escala"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:867:            {estadoEscalaVolumen} · {relacionVolumen.toFixed(1)}x
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:868:          </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:869:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:870:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:871:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:872:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:873:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:896:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:897:                    <strong style={{ color: "#ffffff" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:898:                      {metodo.justificacionCompetencia || metodo.observacion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:899:                    </strong>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:900:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:901:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:902:                  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:907:                    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:908:  >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:909:                    <strong>Catálogo técnico:</strong> {metodo.observacion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:910:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:911:                </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:912:                </tr>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:913:              ))}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:916:                <tr>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:917:                  <td style={estilos.td} colSpan={12}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:918:                    No hay métodos para el filtro seleccionado.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:919:                  </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:920:                </tr>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:921:              )}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:922:            </tbody>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1116:        <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1117:          <h1 style={estilos.titulo}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1118:            Comparador Hidrológico Multi-Método
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1119:          </h1>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1120:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1121:          <p style={estilos.subtitulo}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1122:            Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1135:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1136:          <p style={estilos.numeroResumen}>{conteo.total}</p>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1137:          <p style={estilos.etiquetaResumen}>Métodos visibles</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1138:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1139:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1140:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1141:          <p style={estilos.numeroResumen}>{conteo.tc}</p>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1142:          <p style={estilos.etiquetaResumen}>Métodos Tc</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1143:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1144:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1145:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1146:          <p style={estilos.numeroResumen}>{conteo.q}</p>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1147:          <p style={estilos.etiquetaResumen}>Métodos Q</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1148:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1149:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1150:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1151:          <p style={estilos.numeroResumen}>{conteo.activos}</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1162:        <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1163:          type="button"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1164:          style={estiloBotonFiltro(filtroEstado === "todos")}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1165:          onClick={() => setFiltroEstado("todos")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1166:        >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1167:          Todos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1168:        </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1169:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1170:        <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1171:          type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1186:        <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1187:          type="button"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1188:          style={estiloBotonFiltro(filtroTipo === "todos")}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1189:          onClick={() => setFiltroTipo("todos")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1190:        >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1191:          Tc + Q
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1192:        </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1193:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1213:          <h3 style={estilos.matrizTitulo}>Regla de adopción</h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1214:          <p style={estilos.matrizTexto}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1215:            Muchos métodos para sensibilidad; pocos métodos para adopción. La
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1216:            selección final requiere criterio técnico explícito.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1217:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1218:        </article>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1219:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1221:          <h3 style={estilos.matrizTitulo}>Competencia</h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1222:          <p style={estilos.matrizTexto}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1223:            Cada método se clasifica como principal, alterno, referencial,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1224:            condicionado o pendiente según escala, insumos y finalidad.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1225:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1226:        </article>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1227:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1229:          <h3 style={estilos.matrizTitulo}>Trazabilidad</h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1230:          <p style={estilos.matrizTexto}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1231:            El comparador debe conservar insumos, supuestos, método, resultado,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1232:            advertencias y justificación de adopción o descarte.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1233:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1234:        </article>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1235:      </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1239:  HidroFlow a partir de los hidrogramas calculados. El comparador no recalcula
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1240:  hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1241:  automáticamente ningún método. La adopción final requiere criterio técnico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1242:  competencia hidrológica y trazabilidad explícita.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1243:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1244:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1245:<div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1279:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1280:            "- SCS Mod.: variante ajustable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1281:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1282:            "- Masa y volumen: controlados frente a la referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1283:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1285:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1286:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1287:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1288:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1300:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1301:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1302:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1303:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1304:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1305:          const areaTextoResumen = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1306:          areaTextoResumen.value = textoResumenQ5;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1341:            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1342:              ? areaKm2 * peTotalMm * 1000
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1343:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1344:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1345:          const formatearNumeroExpediente = (valor, decimales = 2) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1346:            if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1347:              return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1348:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1349:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1350:            const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1365:              tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1366:                ? resultadoQ.Tp / tcReferencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1367:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1368:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1369:            return tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1370:              ? "sin referencia temporal"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1371:              : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1372:              ? "respuesta rápida"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1373:              : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1376:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1377:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1378:          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1379:            metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1380:              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1381:              : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1382:              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1383:              : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1384:              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1385:              : metodo.nombre?.includes("Williams")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1386:              ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1387:              : metodo.nombre?.includes("Clark")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1388:              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1389:              : `método comparativo; ${estadoTemporal}.`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1390:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1391:          const metodosQ5Expediente = metodos.filter(
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1392:            (metodo) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1393:              metodo.tipo === "q" &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1394:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1395:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1396:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1397:          const obtenerCandidatosQ5Contexto = () => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1398:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1400:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1401:              ? bruto
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1402:              : Array.isArray(bruto?.metodos)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1403:              ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1404:              : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1405:              ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1406:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1407:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1408:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1409:          const construirFilaQ5Expediente = (nombreMetodo, resultadoQ, dictamenMetodo = null) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1410:            const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1411:            const dictamen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1412:              dictamenMetodo ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413:              obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1414:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1416:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1417:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418:          const filasQ5DesdeCatalogo = metodosQ5Expediente
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1419:            .map((metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1420:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1421:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1422:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1423:              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1424:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1425:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1426:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1427:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1428:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1429:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1430:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1431:            .map((h) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1432:              const nombreMetodo =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1433:                h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1434:                h?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1435:                h?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1436:                h?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1437:                h?.id ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1438:                "Método Q-5";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1439:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1440:              const resultadoQ = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1441:                Qp:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1442:                  h?.Qp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:          const filasQ5Markdown =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:          const tablaQ5Markdown = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1478:            "|---|---:|---:|---:|---|---|",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479:            ...filasQ5Markdown
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1480:          ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:          const estacionIdfExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1512:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1513:          if (
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1514:            !Array.isArray(contextoBase?.metodo_racional?.resultados) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1515:            contextoBase.metodo_racional.resultados.length === 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1516:          ) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517:            faltantesExpediente.push("Tabla Método Racional");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1518:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1519:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1520:          if (faltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1521:            window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1553:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1554:            "## 3. Tiempo de concentración y roles Tc",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1555:            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1558:            "Roles Tc:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1559:            "- Tc global Índice: referencia hidrológica general.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1572:            "SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1573:            "SCS Mod.: variante ajustable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1574:            "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:            "Masa y volumen: controlados frente a referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576:            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1577:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1578:            "Tabla Q-5 auditada:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:            "## 6. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:            "Uso: contraste global independiente de caudal pico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1585:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1586:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1588:              ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1589:                  `Tc racional exportado: ${
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1590:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1591:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:                  "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:                  "Tabla Método Racional:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:                  "| Tr | I | P | C | Q |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:                  "|---:|---:|---:|---:|---:|",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:                  ...contextoBase.metodo_racional.resultados.map((r) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:                    `| ${r.Tr} | ${formatearNumeroExpediente(r.I)} mm/h | ${formatearNumeroExpediente(r.P)} mm | ${formatearNumeroExpediente(r.C, 4)} | ${formatearNumeroExpediente(r.Q)} m³/s |`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:                  )
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:                ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:              : [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:                  "Disponibilidad: resultados no disponibles en el contexto exportable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:                  "Estado: sección informativa; consultar módulo Método Racional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:                ]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:            "## 7. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1611:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1612:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1613:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1614:            "## 8. Restricciones técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1615:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1616:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:          const areaTexto = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1634:          areaTexto.value = textoExpediente;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:            ? areaKm2 * peTotalMm * 1000
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:          </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1682:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1683:        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:139:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:140:// ─── GENERACIÓN DE HIETOGRAMA ─────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:141:// Método: Distribución temporal adimensional (GT-AS-004 §3.3 o Huff)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:142:// Retorna: {data:[{t,tPct,pAcum,pIncrem,iBloque}], Ptotal}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:143:function calcHietograma(est, Tr, dur_h, dt_min, distType="EPM_Q1"){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:144:  const Ptotal = idfI(est, dur_h*60, Tr) * dur_h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:145:  const steps  = Math.round(dur_h*60/dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:179:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:180:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:181:// HIDROGRAMAS UNITARIOS SINTÉTICOS — 4 MÉTODOS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:184:function normalizarHUaMm(uh, areaKm2, dt_min) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:185:  const volumenObjetivo = areaKm2 * 1000;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:297:function calcHidroCompleto(lluvRows, uh_struct, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:298:  const peList=lluvRows.slice(1).map(r=>r.PeIncrem).filter((v,i,a)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:299:    // Incluir todos los incrementos positivos y su contexto
  01_APP\HIDROFLOW\src\HidroFlow.jsx:300:    return v>0 || (a[i-1]>0||a[i+1]>0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:301:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:302:  const peAll = lluvRows.slice(1).map(r=>Math.max(r.PeIncrem||0,0));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:303:  const qSeries = convolucion(uh_struct.uh, peAll, dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:306:  const volTotal = qSeries.reduce((s,r)=>s+r.Q*(dt_min*60),0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:307:  return{qSeries, Qpico:+Qpico.toFixed(6), tPico:+tPico.toFixed(2),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:308:    volTotal:+volTotal.toFixed(1), metodo:uh_struct.metadata.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:309:    color:uh_struct.metadata.color};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:310:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:311:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:312:// ─── FUNCIONES AUXILIARES ────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:341:  const tcList = calcTc(params).filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:342:  const tc_h = tcList[0]?.h || 0.5;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:343:  const metodos = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:344:    { nombre: 'SCS',     make: () => calcHUSCS(params.area, tc_h, dtMin) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:345:    { nombre: 'SCS Mod', make: () => calcHUSCS_Mod(params.area, tc_h, dtMin, 2.08) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:346:    { nombre: 'Snyder',  make: () => calcHUSnyder(params.area*0.386102, params.longitud_cauce*0.621371, params.longitud_cauce*0.621371*0.35, dtMin) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:347:    { nombre: 'W&H',     make: () => calcHUWilliamsHann(params.area, params.longitud_cauce, (params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce, CNact, dtMin) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:348:    { nombre: 'Clark',   make: () => calcClarkIUH(params.area, tc_h, dtMin, 1.2) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:349:  ];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:350:  return metodos.map(m => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:351:    const row = { metodo: m.nombre };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:352:    TR_LIST.forEach(Tr => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:353:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
  01_APP\HIDROFLOW\src\HidroFlow.jsx:354:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:355:      const HU   = m.make();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:362:// ─── EXPORTACIÓN EXCEL (SheetJS) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:363:async function exportarExcel(datos){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:364:  const XLSX = await import("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").catch(()=>null);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:365:  if(!XLSX) return alert("Error cargando SheetJS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:366:  const WX = XLSX.default || XLSX;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:367:  const wb = WX.utils.book_new();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:368:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:402:  // Hoja 3: Hidrogramas comparativos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:403:  if(datos.hidros){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:404:    const header=["t (min)",...datos.hidros.map(h=>h.metodo+" Q(m³/s)")];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:405:    const len=Math.max(...datos.hidros.map(h=>h.qSeries.length));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:406:    const rows=[header];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:407:    for(let i=0;i<len;i++){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:408:      const row=[+(i*datos.dt_min).toFixed(2),...datos.hidros.map(h=>h.qSeries[i]?.Q||0)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:422:  // Hoja 5: Resumen caudales
  01_APP\HIDROFLOW\src\HidroFlow.jsx:423:  if(datos.resumenQ){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:424:    const rows=[["Método","Tr=2.33a","Tr=5a","Tr=10a","Tr=25a","Tr=50a","Tr=100a"]];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:425:    datos.resumenQ.forEach(r=>rows.push([r.metodo,...TR_LIST.map(t=>r[t]||0)]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:426:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Resumen_Q");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:427:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:428:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:429:  WX.writeFile(wb,`HidroFlow_${datos.nombre_cuenca.replace(/\s/g,"_")}_${datos.Tr}a.xlsx`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:622:    "San Cristóbal";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:623:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:624:  const idfMetodo =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:625:    idf?.metodo_adoptado ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:626:    "EPM";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:627:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:628:  const estacionIDF =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:629:    ESTACIONES_EPM[idfAdoptadaNombre] ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:638:        dist: distKm(lat, lon, estacionIDF.lat, estacionIDF.lon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:639:      }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:640:    : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:641:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:642:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:643:  // 3. Dominio del mini-mapa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:644:  // Incluye PC_80, estaciones cercanas y estación IDF adoptada.
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:645:  // Esto evita que todo quede apeñuscado.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:646:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:647:  const puntosMapa = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:648:    {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:649:      n: "PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:701:        y2: yMap(puntoIDF.lat)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:702:      }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:703:    : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:704:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:705:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:706:  // 4. Render
  01_APP\HIDROFLOW\src\HidroFlow.jsx:707:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:737:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:738:          >
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:739:            ◆ IDF adoptada: {idfAdoptadaLabel} · Método {idfMetodo}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:740:          </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:741:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:742:          {puntoIDF && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:743:            <span
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1113:// ───────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1114:function AMCPanel({ params, setParams }) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1115:  // Normalizaciones (evitan NaN/undefined)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1116:  const amcSel = params?.amcActual ?? "II";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1117:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:    ? params.porcentajeImpermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    : 60; // ← unifica default con ModHidrogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1129:  const commitPct = useCallback((v) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1130:    setParams(prev => ({ ...prev, porcentajeImpermeable: v }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1131:    if (import.meta.env.DEV) console.log("[AMC]", "%Impermeable ->", v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1132:  }, [setParams]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1133:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1134:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1135:    <div style={{ marginTop: 16, padding: 16, border: '1px solid #1F2F45', borderRadius: 10, background: '#0F1624' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1153:                  onClick={() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1154:                    setParams(prev => ({ ...prev, amcActual: a }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1155:                    if (import.meta.env.DEV) console.log("[AMC]", "amcActual ->", a);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1156:                  }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1157:                  style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1158:                    padding: '8px 12px',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1159:                    borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1202:              const v = +e.target.value;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1203:              setParams(prev => ({ ...prev, cnBase: v }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1204:              if (import.meta.env.DEV) console.log("[AMC]", "cnBase ->", v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1205:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1206:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1207:              width: '100%', padding: 8, borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1208:              border: '1px solid #1F2F45', background: '#0B0F1A', color: '#D8E4F0'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1323:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1324:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1325:      {/* ── Tabla de Tiempos de Concentración (6 métodos) ─────────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1326:      <Card title="Tiempos de Concentración — 6 Métodos" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1327:        <Tbl
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1328:          headers={["Método", "Tc (h)", "Tc (min)", "Δ vs. media (%)"]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1329:          rows={tc.filter(r => isFinite(r.h) && r.h > 0).map(r => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1330:            M: r.m,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1331:            H: +r.h.toFixed(4),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1332:            MIN: +r.min.toFixed(3),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1410:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1411:    </Card>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1412:    <Card title="Parámetros k · n · c — Todos los Tr" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1413:      <Tbl headers={["Tr (años)","k","n","c","I(10min)","I(30min)","I(60min)","I(120min)"]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1414:        rows={TR_LIST.map(T=>{const{k,n,c}=est.params[String(T)]||{k:0,n:1,c:0.4};return{T,k:+k.toFixed(4),n:+n.toFixed(4),c,I10:+idfI(est,10,T).toFixed(2),I30:+idfI(est,30,T).toFixed(2),I60:+idfI(est,60,T).toFixed(2),I120:+idfI(est,120,T).toFixed(2)};})}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1415:        hiCols={[4]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1416:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1493:      .map(r => `${r.m.split(" ")[0]}: ${r.min.toFixed(1)} min`)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1494:      .join(" · ");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1495:    return `Tc sugerido = mediana de ${tcList.length} métodos -> ${Tc_sugerido_min.toFixed(1)} min. [${etiquetas}]`;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1496:  }, [tcList, Tc_sugerido_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1497:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1498:  // === SCS‑CN desde Preliminares + override + AMC auto (SIATA) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1499:  const CN_panel        = Number.isFinite(params?.cnBase) ? params.cnBase : (params.CN ?? 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1523:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1524:  const amcAuto = useMemo(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1525:    () => (usarAMCauto ? derivarAMCDesdeSIATA(hs_demo) : null),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1526:    [usarAMCauto, hs_demo]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1527:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1528:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1529:  // AMC efectivo: si AMC auto está activo y no hay override SCS, usamos el derivado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1543:  // ── Exportar PNG para gráficas del módulo (vía CDN, sin instalar) ─────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1544:  // Refs: contenedores de las dos gráficas a exportar (Distribuciones e Intensidades)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1545:  const refContenedorDistribuciones = useRef(null);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1546:  const refContenedorIntensidades   = useRef(null);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1547:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1548:  // Persistir AMC auto en el panel (Preliminares) SOLO si el toggle está activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1549:useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1550:  if (!guardarAMCenPanel) return;                 // opt-in: solo si el usuario lo decide
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1560:      amcInforme: amcAuto.amcInforme || `AMC ${amcAuto.amcActual} (auto)`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1561:      amcFecha:   stamp,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1562:      amcHSref:   typeof hs_demo === "number" ? hs_demo : undefined
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1563:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1564:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1565:    // Requiere que ModHietogramas reciba setParams como prop
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1566:    setParams(prev => ({ ...prev, ...payload }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1901:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1902:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1903:// MÓDULO HIDROGRAMAS — 5 Métodos con convolución completa (robusto para gráficas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1904:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1905:function ModHidrogramas({ params, est, name, onContextoComparador }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1906:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1907:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1925:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1926:    if (import.meta.env.DEV) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1927:      console.log('[HIDRO]', 'CNact ->', CNact, {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1928:        amc: params.amcActual,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1929:        pImp: params.porcentajeImpermeable,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1930:        cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1931:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1960:  const lluvEfect = useMemo(() => calcLluviaEfectiva(hiet, CNact), [hiet, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1961:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1962:  // ── Unidades Hidrológicas (5 métodos)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1963:  const hu_scs    = useMemo(() => calcHUSCS(params.area, tc_h, dtMin), [params.area, tc_h, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1964:  const hu_scsMod = useMemo(() => calcHUSCS_Mod(params.area, tc_h, dtMin, CpSCSMod), [params.area, tc_h, dtMin, CpSCSMod]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1965:  const hu_snyder = useMemo(() => calcHUSnyder(area_mi2, L_mi, L_mi * 0.35, dtMin, Ct, Cp), [area_mi2, L_mi, dtMin, Ct, Cp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1966:  const hu_wh     = useMemo(() => calcHUWilliamsHann(params.area, params.longitud_cauce, S_m_km, CNact, dtMin), [params, dtMin, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1967:  const hu_clark  = useMemo(() => calcClarkIUH(params.area, tc_h, dtMin, kR), [params.area, tc_h, dtMin, kR]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1968:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1969:  // ── Convolución (Pe * HU) → hidrogramas por método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1970:  const hidros = useMemo(() => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1971:    [hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark].map(hu => calcHidroCompleto(lluvEfect, hu, dtMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1972:  ), [lluvEfect, hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1973:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1974:  // Hidrograma activo (SCS por defecto)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1975:  const h0 = hidros?.[0] ?? null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1976:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1977:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1978:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1979:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1988:  const numeroValido = (valor) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1989:    const n = Number(valor);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1990:    return Number.isFinite(n) ? n : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1991:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1992:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1993:  const obtenerSerie = (h) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1994:  if (Array.isArray(h?.serie)) return h.serie;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2045:    if (!Array.isArray(serie) || serie.length === 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2046:      return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2047:        QpSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2048:        TpSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2049:        volumenSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2050:        puntos: null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2051:      };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2052:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2053:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2054:    let QpSerie = null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2055:    let TpSerie = null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2056:    let volumenSerie = 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2057:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2058:    serie.forEach((punto, indice) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2059:      const q = leerQ(punto);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2060:      const t = leerT(punto, indice);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2061:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2062:      if (q !== null && (QpSerie === null || q > QpSerie)) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2063:        QpSerie = q;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2064:        TpSerie = t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2065:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2066:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2072:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2073:        if (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2074:          q0 !== null &&
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2075:          q1 !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2076:          Number.isFinite(t0) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2077:          Number.isFinite(t1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2078:        ) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2079:          volumenSerie += ((q0 + q1) / 2) * ((t1 - t0) * 60);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2085:      QpSerie,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2086:      TpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2087:      volumenSerie: volumenSerie > 0 ? volumenSerie : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2088:      puntos: serie.length,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2089:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2090:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2091:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2121:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2122:        return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2123:          metodo: nombresHidrogramas[i] ?? `Método ${i + 1}`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2124:          Qp:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2125:            QpDirecto && QpDirecto > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2126:              ? QpDirecto
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2127:              : calculado.QpSerie,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2159:  const maxLluviaEfectivaMm = valoresLluviaEfectivaMm.length
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2160:    ? Math.max(...valoresLluviaEfectivaMm)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2161:    : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2162:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2163:  const lluviaEfectivaTotalMm =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2164:    maxLluviaEfectivaMm !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2165:    maxLluviaEfectivaMm > 0 &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2166:    sumaLluviaEfectivaMm / maxLluviaEfectivaMm > 3
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2167:      ? maxLluviaEfectivaMm
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2168:      : sumaLluviaEfectivaMm || null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2169:  const hidrogramasQ5Exportables = (hidros || []).map((h) => ({
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2170:    metodo: h?.metodo ?? "Método Q-5",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2171:    Qpico: h?.Qpico,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2172:    tPico: h?.tPico,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2173:    volTotal: h?.volTotal,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2174:    Qp: h?.Qpico,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:      resultados: hidrogramasQ5Exportables
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2189:    lluvia_efectiva_total_mm: lluviaEfectivaTotalMm,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2190:    hidrogramas_resumen: hidrogramasResumen,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2191:    hidrograma_principal: h0 ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2192:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2193:}, [onContextoComparador, hidros, h0, lluvEfect, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2194:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2195:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2219:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2220:  /* ──────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2221:     DEBUG TEMPORAL: inspeccionar etiquetas de método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2222:     ────────────────────────────────────────────────────────────── */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2223:  useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2224:    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas resumenQ:', (resumenQ ?? []).map(r => r.nombre ?? r.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2225:  }, [resumenQ]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2226:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2227:  useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2228:    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas hidros:', (hidros ?? []).map(h => h.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2229:  }, [hidros]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2230:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2231:  /* ──────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2232:     Parche condicional Snyder (cfs → m³/s) y copia segura: hidrosCorr
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2240:  const hidrosCorr = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2241:    const arr = (hidros ?? []).map(h => ({ ...h }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2242:    const idxSny = arr.findIndex(h => /snyder/i.test(h.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2243:    if (idxSny >= 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2244:      const h = arr[idxSny];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2245:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2246:      const qpSny = (h.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2259:      if (needConvert) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2260:        h.qSeries = (h.qSeries ?? []).map(p => ({ ...p, Q: p.Q * factorCFS2M3S }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2261:        h.metodo  = `${h.metodo} (SI)`; // trazabilidad en la leyenda
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2262:        if (import.meta.env.DEV) console.warn('[FIX] Snyder convertido cfs→m³/s', { qpSny, qpOtros, ratio: qpSny/qpOtros });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2263:      } else if (import.meta.env.DEV) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2264:        console.log('[INFO] Snyder sin conversión', { qpSny, qpOtros, ratio: qpSny/qpOtros });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2265:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2266:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2267:    return arr;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2268:  }, [hidros]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2281:    return whAliases.some(a => t.includes(a));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2282:  };
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2283:  let rWH = (resumenQ ?? []).find(r => matchWH(r.nombre ?? r.metodo)) || {};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2284:  if (!rWH.Qpico || !rWH.tpico) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2285:    const wh = (hidrosCorr ?? []).find(h => matchWH(h.metodo)); // ← usa corregidas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2286:    if (wh?.qSeries?.length) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2287:      const pico = wh.qSeries.reduce((m, p) => (p.Q > m.Q ? p : m), { Q: 0, t: 0 });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2288:      rWH = { ...(rWH ?? {}), Qpico: rWH.Qpico ?? pico.Q, tpico: rWH.tpico ?? pico.t, nombre: rWH.nombre ?? wh.metodo };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2289:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2290:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2291:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2292:  // ── Totales de Pe
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2316:      const obj = { t: +((idx * dtMin) || 0).toFixed(1) };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2317:      seriesOK.forEach(h => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2318:        obj[h.metodo] = h.qSeries[idx]?.Q ?? 0; // clave = nombre del método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2319:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2320:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2321:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2322:    return out;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2328:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2329:    if (!import.meta.env.DEV) return;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2330:    console.log('[DEBUG] seriesOK:', seriesOK.map(h => ({ metodo: h.metodo, len: h.qSeries?.length })));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2331:    console.log('[DEBUG] combined len:', combined.length, 'n=', n, 'step=', step);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2332:  }, [seriesOK, combined, n, step]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2333:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2334:  // ── Paleta por método (si no existe arriba en tu archivo)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2335:  const methodColors = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2336:    'SCS':              '#4ECDC4',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2337:    'SCS Mod.':         '#94D82D',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2338:    'Snyder':           '#F59F00',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2428:              {seriesOK.map(h => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2429:                <Line
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2430:                  key={h.metodo}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2431:                  type="monotone"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2432:                  dataKey={h.metodo}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2433:                  stroke={methodColors[h.metodo] ?? '#8884d8'}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2434:                  strokeWidth={2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2435:                  dot={false}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2436:                  isAnimationActive={false}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2437:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2442:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2443:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2444:      {/* …si tienes más controles, tarjetas por método y comparativas de HU, déjalos debajo… */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2445:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2446:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2447:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2448:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2458:  const [catSAR,setCatSAR]=useState("Intermedios");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2459:  const [distType,setDistType]=useState("EPM_Q1");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2460:  const [metodoPost,setMetodoPost]=useState("SCS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2461:  const reportRef=useRef();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2462:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2463:  const TrRec={Menores:2.33,Intermedios:5,Mayores:25};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2464:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2477:  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2478:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2479:  // Método hidrograma post-urbano seleccionable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2480:  const huPost=useMemo(()=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2481:    if(metodoPost==="Clark") return calcClarkIUH(params.area,tc_h,dtMin,1.2);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2482:    if(metodoPost==="Snyder") return calcHUSnyder(params.area*0.386102,params.longitud_cauce*0.621371,params.longitud_cauce*0.621371*0.35,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2483:    if(metodoPost==="WH") return calcHUWilliamsHann(params.area,params.longitud_cauce,S_m_km,cnIII_post,dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2484:    return calcHUSCS(params.area,tc_h,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2485:  },[metodoPost,params,tc_h,dtMin,cnIII_post]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2486:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2487:  const qPost=useMemo(()=>calcHidroCompleto(lluvPost,huPost,dtMin),[lluvPost,huPost,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2488:  const huPre=useMemo(()=>calcHUSCS(params.area,tc_h,dtMin),[params.area,tc_h,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2489:  const qPre =useMemo(()=>calcHidroCompleto(lluvPre,huPre,dtMin),[lluvPre,huPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2502:    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2503:    hiet,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2504:    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2505:    volSAR,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2506:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2507:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2508:  return(<div style={{display:"flex",flexDirection:"column",gap:14}} ref={reportRef}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2546:        <BtnGroup options={[20,40,60,80,100].map(s=>({v:s,l:`${s}%`}))} value={siPct} onChange={setSiPct} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2547:        <div style={{marginTop:6,fontSize:9,color:C.muted,fontFamily:mono}}>CNIII post={cnIII_post}</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2548:        <div style={{marginTop:2,fontSize:9,color:C.muted,fontFamily:mono}}>Método:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2549:        <BtnGroup options={[{v:"SCS",l:"SCS"},{v:"Clark",l:"Clark"},{v:"Snyder",l:"Snyder"},{v:"WH",l:"W&H"}]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2550:          value={metodoPost} onChange={setMetodoPost} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2551:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2552:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2553:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2554:    {/* KPIs principales */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2557:      <Kpi value={cnIII_post.toFixed(1)} label="CN post (CNIII)" accent={C.rose} sub={`SI=${siPct}%`}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2558:      <Kpi value={cnIII_pre.toFixed(1)} label="CN pre (CNIII)" accent={C.accent2} sub="Pastizales pobres"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2559:      <Kpi value={qPost.Qpico.toFixed(4)+" m³/s"} label={`Q pico POST (${metodoPost})`} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2560:      <Kpi value={qPre.Qpico.toFixed(4)+" m³/s"} label="Q pico PRE (SCS)" accent={C.accent2}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2561:      <Kpi value={reduccion+"%"} label="Reducción pico" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2562:      <Kpi value={volSAR.volTotal.toFixed(0)+" m³"} label="V almacenamiento" accent={C.accent4}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2563:      <Kpi value={catSAR} label="Categoría SAR" accent={C.teal} sub={`Borde libre ${catSAR==="Menores"?">0.10m":catSAR==="Intermedios"?">0.25m":">0.50m"}`}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2600:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2601:    {/* Hidrogramas POST vs PRE */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2602:    <Card title={`Hidrogramas SAR — POST (${metodoPost}, CN=${cnIII_post}) vs PRE (SCS, CN=${cnIII_pre}) · V_SAR=${volSAR.volTotal.toFixed(0)} m³`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2603:      <ResponsiveContainer width="100%" height={290}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2604:        <AreaChart data={dispData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2605:          <defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2606:            <linearGradient id="gPost" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent3} stopOpacity={0.35}/><stop offset="95%" stopColor={C.accent3} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2614:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[nm.includes("Vol")?v.toFixed(0)+" m³":v.toFixed(5)+" m³/s",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2615:          <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2616:          <Area yAxisId="q" type="monotone" dataKey="Qpost" stroke={C.accent3} fill="url(#gPost)" strokeWidth={2.5} name={`Q post (${metodoPost})`} dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2617:          <Area yAxisId="q" type="monotone" dataKey="Qpre"  stroke={C.accent2} fill="url(#gPre)"  strokeWidth={2.5} name="Q pre (SCS)" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2618:          <Area yAxisId="v" type="monotone" dataKey="volAcum" stroke={C.gold} fill="url(#gVol)" strokeWidth={1.5} name="Vol. SAR acum. (m³)" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2619:        </AreaChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2620:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2644:          ["Categoría SAR",catSAR],["Tr de diseño",`${Tr} años`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2645:          ["Duración lluvia",`${durH} h`],["Distribución",distType.replace("_"," ")],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2646:          ["P total diseño",`${hiet.Ptotal} mm`],["Método HU POST",metodoPost],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2647:          ["CN post (CNIII)",`${cnIII_post} (SI=${siPct}%)`],["CN pre (CNIII)","93.5"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2648:          ["Q pico POST",`${qPost.Qpico.toFixed(4)} m³/s`],["Q pico PRE (reg.)",`${qPre.Qpico.toFixed(4)} m³/s`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2649:          ["Reducción pico",`${reduccion}%`],["V almacenamiento",`${volSAR.volTotal.toFixed(0)} m³`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2650:        ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2671:    {/* Nota técnica */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2672:    <div style={{background:`${C.teal}08`,border:`1px solid ${C.teal}20`,borderRadius:10,padding:"11px 15px",fontFamily:mono,fontSize:9,color:C.muted,lineHeight:1.7}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2673:      <span style={{color:C.teal,fontWeight:700}}>Notas metodológicas GT-AS-004: </span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2674:      § 3.4 Pérdidas: Método SCS-CN · Condición humedad AMC III · §3.5 HU SCS: lag time=60%·Tc · §3.8 Volumen excedente=∫(Qpost−Qpre)dt · §3.9 Caudal regulado=Qpico(pre) · Distribución temporal: Primer Cuartil (Gallego et al., 2024) · Curvas Huff: Distribuciones Illinois-ISWS (probabilidad 50%)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2675:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2676:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2677:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2678:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2679:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2680:// MÓDULO MÉTODO RACIONAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2681:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2682:function ModRacional({params,est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2683:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2684:  const tc_min=useMemo(()=>tcList.reduce((s,r)=>s+r.min,0)/(tcList.length||1),[tcList]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2685:  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2686:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2687:    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2688:    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2689:      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2690:      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2691:      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2692:    </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2693:    <Card title="Caudales Racionales — Todos los Tr" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2694:      <ResponsiveContainer width="100%" height={240}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2695:        <BarChart data={res} margin={{left:0,right:18,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2696:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2697:          <XAxis dataKey="Tr" tick={{fill:C.muted,fontSize:10}} label={{value:"Tr (años)",position:"insideBottom",offset:-4,fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2724:  {codigo:"2701045",nombre:"VILLA HERMOSA PLANTA", lat:6.25697222,lon:-75.54752778,alt:1690,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:58.7,I60_obs:41.2,epm_key:"VILLA HERMOSA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2725:  {codigo:"2701046",nombre:"SAN CRISTOBAL",        lat:6.28138889,lon:-75.63627778,alt:1890,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:67.9,I60_obs:47.8,epm_key:"SAN CRISTOBAL"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2726:  {codigo:"2701053",nombre:"ALTO SAN ANDRES",      lat:6.42943954,lon:-75.43994360,alt:2240,red:"SIATA",    vars:["P","T"],                  estado:"Mantenimiento",I30_obs:74.3,I60_obs:52.1,epm_key:null},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2727:  {codigo:"2308023",nombre:"PALMAS LAS",           lat:6.15225492,lon:-75.53550040,alt:2550,red:"IDEAM-SIATA",vars:["P","T","HR","Viento","Rad"],estado:"Activa",   I30_obs:91.2,I60_obs:64.1,epm_key:"PALMAS"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2728:  {codigo:"2308024",nombre:"VASCONIA",             lat:6.20425000,lon:-75.48047220,alt:2537,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:82.6,I60_obs:58.0,epm_key:"VASCONIA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2729:  {codigo:"2308027",nombre:"RIONEGRO LA MACARENA", lat:6.15669120,lon:-75.48040720,alt:2131,red:"IDEAM",    vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:60.4,I60_obs:42.5,epm_key:"MACARENA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2730:  {codigo:"2701517",nombre:"MEDELLIN",             lat:6.25296809,lon:-75.56863300,alt:1491,red:"EPM-SIATA",vars:["P","T","HR","Viento","Rad","PA"],estado:"Activa",I30_obs:62.8,I60_obs:44.2,epm_key:"MEDELLIN"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2731:  {codigo:"2701093",nombre:"AYURA",                lat:6.16569444,lon:-75.56591667,alt:1750,red:"EPM-SIATA",vars:["P","T","HR","HumSuelo"],  estado:"Activa",      I30_obs:68.1,I60_obs:47.9,epm_key:"AYURA"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2732:  {codigo:"2308760",nombre:"RN-1B REBOSE BOMB PA", lat:6.09249561,lon:-75.49029020,alt:2167,red:"EPM",      vars:["P","N.Cauce"],           estado:"Activa",      I30_obs:75.9,I60_obs:53.5,epm_key:null},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2733:  {codigo:"2701076",nombre:"NIQUIA",               lat:6.34627778,lon:-75.54586111,alt:1439,red:"SIATA",    vars:["P","T","HR","N.Cauce"],   estado:"Activa",      I30_obs:63.5,I60_obs:44.7,epm_key:"NIQUIA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2734:  {codigo:"2701122",nombre:"COPACABANA",           lat:6.33661111,lon:-75.51086111,alt:1580,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:61.2,I60_obs:43.1,epm_key:"COPACABANA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2735:  {codigo:"2701481",nombre:"PEDREGAL",             lat:6.30494444,lon:-75.57422222,alt:1622,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:59.8,I60_obs:42.1,epm_key:"PEDREGAL"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2736:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2792:  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),dAlt:+dA[i].toFixed(0),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2793:    score:+s[i].toFixed(4),pct:+(s[i]/sT*100).toFixed(2),peso:+(s[i]/sT).toFixed(5)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2794:  })).sort((a,b)=>b.score-a.score).map((e,j)=>({...e,rank:j+1,dominante:j===0}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2795:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2796:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2797:function calcIDFPond(ests,d_min,Tr){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2798:  const con=ests.filter(e=>e.epm_key&&ESTACIONES_EPM[e.epm_key]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2840:        stroke={i===0?C.teal:pct>10?C.accent2:C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2841:        strokeWidth={Math.max(0.3,pct/maxPct*2.2)} opacity={Math.max(0.08,pct/maxPct*0.6)}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2842:        strokeDasharray={pct<4?"3 5":undefined}/>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2843:    })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2844:    {/* Estaciones */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2845:    {ests.map((e,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2846:      const[ex,ey]=toXY(e.lat,e.lon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2868:      <rect width={118} height={68} rx={5} fill={`${C.panel}EE`} stroke={C.border} strokeWidth={0.5}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2869:      <text x={6} y={13} fill={C.muted} fontSize={8} fontFamily="monospace" fontWeight={700}>LEYENDA</text>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2870:      {[[C.gold,"Cuenca objetivo"],[C.teal,"Dominante"],[C.accent2,"Alta inf. (>12%)"],[C.accent,"Media inf."],[C.muted2,"Baja inf."],[C.rose,"Mantenimiento"]].map(([col,lbl],i)=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2871:        <g key={i} transform={`translate(6,${19+i*8})`}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2872:          <circle r={2.5} cx={2.5} cy={0} fill={col}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2873:          <text x={9} y={4} fill={C.muted2} fontSize={7} fontFamily="monospace">{lbl}</text>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2874:        </g>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2909:    if(excl.has(i)) return{pct:0,peso:0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2910:    const e=activos.find(a=>a.codigo===ESTACIONES_SIATA[i].codigo);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2911:    const r=e?pond.find(p=>p.codigo===e.codigo):null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2912:    return r?{pct:r.pct,peso:r.peso}:{pct:0,peso:0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2913:  }),[pond,activos,excl]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2914:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2915:  const estsConPeso=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>({...e,...pesosMap[i]})),[pesosMap]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2916:const idfPond=useMemo(()=>calcIDFPond(pond,dMin,Tr),[pond,dMin,Tr]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2917:  const idfDom=dominante?.epm_key&&ESTACIONES_EPM[dominante.epm_key]?idfI(ESTACIONES_EPM[dominante.epm_key],dMin,Tr):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2918:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2919:  // Análisis de escenarios: impacto de eliminar cada estación
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2920:  const escenarios=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2921:    const sin=ESTACIONES_SIATA.filter((_,j)=>j!==i&&!excl.has(j));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2932:  const idfCurvas=useMemo(()=>[5,10,15,20,30,45,60,90,120,180,240].map(d=>({d,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2933:    "IDF Ponderada":+calcIDFPond(pond,d,Tr).toFixed(2),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2934:    "Dominante":dominante?.epm_key&&ESTACIONES_EPM[dominante.epm_key]?+idfI(ESTACIONES_EPM[dominante.epm_key],d,Tr).toFixed(2):0,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2935:    "Estación Sel.":ESTACIONES_SIATA[selIdx]?.epm_key&&ESTACIONES_EPM[ESTACIONES_SIATA[selIdx].epm_key]?+idfI(ESTACIONES_EPM[ESTACIONES_SIATA[selIdx].epm_key],d,Tr).toFixed(2):0,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2936:  })),[pond,dominante,selIdx,Tr]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2937:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2938:  const toggleExcl=i=>setExcl(s=>{const n=new Set(s);n.has(i)?n.delete(i):n.add(i);return n;});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2939:  const eSel=ESTACIONES_SIATA[selIdx];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2940:  const iSin=escenarios.find(e=>e.nombre===eSel?.nombre?.substring(0,17)+(eSel?.nombre?.length>17?"…":""));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2945:    {/* Controles top */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2946:    <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1.2fr 1fr 1fr",gap:10}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2947:      <Card title="Método de ponderación" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2948:        <BtnGroup options={[{v:"compuesto",l:"Compuesto"},{v:"idw",l:"IDW"},{v:"thiessen",l:"Thiessen"},{v:"alt",l:"Altitudinal"}]} value={method} onChange={setMethod} accent={C.teal}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2949:        {method==="idw"&&<div style={{marginTop:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2950:          <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:2}}>Potencia IDW (p = {potIDW})</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2951:          <input type="range" min={1} max={4} step={0.5} value={potIDW} onChange={e=>setPotIDW(+e.target.value)} style={{width:"100%",accentColor:C.teal}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2967:      <Card title="KPIs · Influencia activa" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2968:        <div style={{display:"flex",flexDirection:"column",gap:4,fontFamily:mono,fontSize:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2969:          {[["Método",method.toUpperCase()],["Estaciones activas",`${activos.length}/${ESTACIONES_SIATA.length}`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2970:            ["Dominante",dominante?.nombre?.split(" ")[0]||"—"],["I ponderada",`${idfPond.toFixed(2)} mm/h`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2971:            ["I dominante",`${idfDom.toFixed(2)} mm/h`],["Δ pond vs dom.",`${idfPond>0?((idfPond-idfDom)/idfDom*100).toFixed(1):"0"}%`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2972:          ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2973:            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",borderBottom:`1px solid ${C.border}15`}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2974:              <span style={{color:C.muted}}>{l}</span><span style={{color:C.text,fontWeight:600}}>{v}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2975:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3076:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3077:    {/* IDF ponderada vs referencias */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3078:    <Card title={`IDF Ponderada (${method}) vs Dominante vs Seleccionada · Tr=${Tr}a`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3079:      <ResponsiveContainer width="100%" height={240}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3080:        <LineChart data={idfCurvas} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3081:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3082:          <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3085:          <Legend wrapperStyle={{fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3086:          <Line type="monotone" dataKey="IDF Ponderada" stroke={C.teal} strokeWidth={3} dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3087:          <Line type="monotone" dataKey="Dominante"     stroke={C.accent2} strokeWidth={2} strokeDasharray="6 2" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3088:          <Line type="monotone" dataKey="Estación Sel." stroke={C.accent4} strokeWidth={1.8} strokeDasharray="4 4" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3089:        </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3090:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3091:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3483:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3484:const TABS=[
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3485:  {id:"params",     label:"Parámetros",   icon:"⬡", acc:C.accent,   desc:"Morfometría · Índices · 6 Métodos Tc"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3486:  {id:"idf",        label:"IDF",          icon:"⌁", acc:C.accent3,  desc:"20 Est. EPM 2025 · I=k/(c+d)ⁿ · PDF calibradas"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3487:  {id:"hiet",       label:"Hietogramas",  icon:"🌧", acc:C.accent,   desc:"GT-AS-004 §3.3 · Curvas Huff Q1-Q4 · 5 distribuciones"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3488:  {id:"hidro",      label:"Hidrogramas",  icon:"≋", acc:C.accent2,  desc:"SCS · SCS Mod. · Snyder · Williams&Hann · Clark IUH"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3489:  {id:"racional",   label:"Racional",     icon:"◈", acc:C.gold,     desc:"Q=C·I·A/3.6 · Abstracción SCS · Todos los Tr"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3490:  {id:"sar",        label:"SAR",          icon:"◫", acc:C.accent4,  desc:"GT-AS-004 §3 · Hietograma+Convolución+Vol. · PDF/Excel"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3491:  {id:"influencia", label:"Influencia",   icon:"⊕", acc:C.teal,     desc:"IDW · Thiessen · Altitudinal · Compuesto · Escenarios · Mapa AMVA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3492:  {id:"siata",      label:"SIATA",        icon:"🛰", acc:C.accent3,  desc:"API repopruebas.siata.gov.co · Series · Validación IDF · Arquitectura"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3493:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3528:    : 75;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3529:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3530:  const metodosTcRacional = calcTc(params).filter((r) => Number.isFinite(r?.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3531:  const tcRacionalMin =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3532:    metodosTcRacional.length > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3533:      ? metodosTcRacional.reduce((suma, metodo) => suma + Number(metodo.min || 0), 0) /
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3534:        metodosTcRacional.length
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3535:      : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3536:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3537:  const estacionRacional = ESTACIONES_EPM[stn];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3538:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3539:  const resultadosRacionalExportable =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    periodos_retorno: TR_LIST,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3561:      estado: "informativo_no_adoptivo",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3562:      tc_min: Number.isFinite(Number(tcRacionalMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3563:        ? Number(Number(tcRacionalMin).toFixed(2))
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3564:        : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3565:      resultados: resultadosRacionalExportable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3566:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3567:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3568:    cuencaNombre:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3577:      params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3578:      params?.A ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3579:      null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3580:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3581:    pendiente_media_pct:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3582:  params?.pendiente_media_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3583:  params?.pendienteMediaPct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3605:    AMC: params?.AMC ?? params?.amcActual ?? params?.amc ?? "II",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3606:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3607:    tc_metodos: calcTc(params),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3608:    
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3609:    lluvia_efectiva: previo?.lluvia_efectiva ?? false,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3610:    lluvia_efectiva_total_mm: previo?.lluvia_efectiva_total_mm ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3611:    hidrogramas: previo?.hidrogramas ?? {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3612:      fuente: "pendiente",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3613:      resultados: []
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3614:    },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3615:    hidrogramas_resumen: previo?.hidrogramas_resumen ?? null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3616:    hidrograma_principal: previo?.hidrograma_principal ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3617:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3618:}, [onContextoComparador, params, stn, trStateGlobal?.Tr_activo]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3619:// Publicación base Tc para despertar el Índice Hidrológico global.
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3620:// No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3621:useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3622:  const estadoTcActual = getTcState();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3623:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3624:  const agenteTieneEstado =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3625:    estadoTcActual?.Tc_final !== null &&
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3626:    estadoTcActual?.Tc_final !== undefined &&
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3627:    estadoTcActual?.metodosTc;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3628:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3629:  const agenteTieneEstadoEspecializado =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3630:    estadoTcActual?.rangoCompetenteTc ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3631:    estadoTcActual?.metodosTcCompetentes;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3632:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3633:  if (agenteTieneEstado || agenteTieneEstadoEspecializado) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3634:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3635:  const tcArrayBase = calcTc(params).filter(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3639:  if (!tcArrayBase.length) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3640:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3641:  const metodosTcBase = mapTcResultados(tcArrayBase);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3642:  const valoresTcBase = Object.values(metodosTcBase).filter(Number.isFinite);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3643:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3644:  if (!valoresTcBase.length) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3645:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3646:  const valoresOrdenados = [...valoresTcBase].sort((a, b) => a - b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3658:  setTcState({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3659:    Tc_final: tcBase,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3660:    metodosTc: metodosTcBase,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3661:    contextoTc: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3662:      pendiente:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3663:        params?.pendiente_media_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3664:        params?.pendienteMediaPct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3672:        params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3673:        params?.A ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3674:        null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3675:      CN: params?.CN ?? params?.cnBase ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3676:      fuente: "hidroflow_base"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3677:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3678:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3679:}, [params]);


## 11. Build base antes de cambios

> hidroflow@3.2.0 build
> vite build

[36mvite v5.4.21 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 848 modules transformed.
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.41 kB[22m[1m[22m[2m │ gzip:   0.28 kB[22m
[2mdist/[22m[35massets/index-DkTXiRnO.css  [39m[1m[2m  0.23 kB[22m[1m[22m[2m │ gzip:   0.14 kB[22m
[2mdist/[22m[36massets/index-CQmKfbdh.js   [39m[1m[33m953.91 kB[39m[22m[2m │ gzip: 261.33 kB[22m

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
[32m✓ built in 2.85s[39m

Codigo build base: 0

## 12. Estado Git final de auditoría
?? 00_ADMIN/bitacora/OT-0050/
