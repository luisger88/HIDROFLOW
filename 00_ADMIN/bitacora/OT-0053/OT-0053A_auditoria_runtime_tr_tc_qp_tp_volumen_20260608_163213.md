# OT-0053A — Auditoría runtime Tr–Tc–Qp–Tp–Volumen

Fecha: 06/08/2026 16:32:13
Rama: ot-0053-trazabilidad-runtime-tr-tc-qp-tp-volumen

## 1. Propósito

Auditar la trazabilidad runtime entre Tr global activo, Tc, Qp, Tp, Volumen, Comparador, Índice y Expediente, sin modificar fórmulas ni motor.

## 2. Estado Git inicial

?? 00_ADMIN/bitacora/OT-0053/

## 3. Estado global Tr


> 01_APP\HIDROFLOW\src\agents\trAgent.js:1:let trState = {
> 01_APP\HIDROFLOW\src\agents\trAgent.js:2:  Tr_activo: 25,
  01_APP\HIDROFLOW\src\agents\trAgent.js:3:  fuente: "default",
  01_APP\HIDROFLOW\src\agents\trAgent.js:4:  actualizado_en: null
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:1:import React, { useState, useEffect } from "react";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:2:import { getTcState, subscribeTc } from "../agents/tcAgent";
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:3:import { getTrState, setTrState, subscribeTr } from "../agents/trAgent";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:4:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:5:export default function IndiceHidrologico({
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:6:  goToTab: goToTabProp,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:7:  contexto,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:8:  tabActiva: tabActivaProp = "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:9:  tab = "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:70:    tc_resumen = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:71:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:72:    // Periodos de retorno
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:73:    periodos_retorno = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:74:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:75:    // Resumen completo futuro
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:76:    resumenMotor = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:77:  } = contexto || {};
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:78:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:79:  const tabActual = tabActivaProp || tabActiva || tab || "params";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:217:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:218:  const resumenTc = tc_resumen || tc?.resumen || null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:219:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:220:  const periodos = Array.isArray(periodos_retorno)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:221:    ? periodos_retorno
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:222:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:223:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:224:  const estilos = {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:225:    panel: {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:226:      width: "250px",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:227:      minWidth: "250px",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:412:    };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:413:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:414:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:415:  const [trStateIndice, setTrStateIndice] = useState(getTrState());
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:416:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:417:  useEffect(() => {
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:443:    if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:444:      return null;
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:54:  text:"#D8E4F0",    muted:"#48607E",  muted2:"#7A94B2",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:55:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:56:const CC=[C.accent,C.accent2,C.accent3,C.accent4,C.gold,C.rose,C.teal,C.lime,"#38BDF8","#FB923C","#34D399","#F472B6","#60A5FA","#FBBF24","#A3E635","#E879F9","#22D3EE","#FB7185","#818CF8","#4ADE80"];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:57:const TR_LIST=[2.33,5,10,25,50,100];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:58:const mono="'DM Mono','Fira Code',monospace";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:59:const sans="'IBM Plex Sans',system-ui,sans-serif";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:60:const TT={background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:11,fontFamily:mono};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:61:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:62:// ─── ESTACIONES EPM 2025 ──────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:63:const ESTACIONES_EPM = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:329:// Resumen racional
  01_APP\HIDROFLOW\src\HidroFlow.jsx:330:function calcRacional(est,area,tc_min,CN){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:  const S=25400/CN-254,Ia=0.2*S;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:332:  return TR_LIST.map(Tr=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:333:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:334:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:335:    const Cc=P>0?Math.min(Pe/P,1):0.3;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:336:    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:337:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:338:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:349:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:350:  return metodos.map(m => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:351:    const row = { metodo: m.nombre };
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:352:    TR_LIST.forEach(Tr => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:353:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
  01_APP\HIDROFLOW\src\HidroFlow.jsx:354:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:355:      const HU   = m.make();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:356:      const H    = calcHidroCompleto(Pe, HU, dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:357:      row[Tr]    = +H.Qpico.toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:358:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:422:  // Hoja 5: Resumen caudales
  01_APP\HIDROFLOW\src\HidroFlow.jsx:423:  if(datos.resumenQ){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:424:    const rows=[["Método","Tr=2.33a","Tr=5a","Tr=10a","Tr=25a","Tr=50a","Tr=100a"]];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:425:    datos.resumenQ.forEach(r=>rows.push([r.metodo,...TR_LIST.map(t=>r[t]||0)]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:426:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Resumen_Q");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:427:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:428:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:429:  WX.writeFile(wb,`HidroFlow_${datos.nombre_cuenca.replace(/\s/g,"_")}_${datos.Tr}a.xlsx`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:430:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:431:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1346:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1347:function ModIDF({est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1348:  const DURS=[5,10,15,20,30,45,60,90,120,180,240,360];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1349:  const idfData=useMemo(()=>DURS.map(d=>({d,...Object.fromEntries(TR_LIST.map(T=>[`Tr${T}`,+idfI(est,d,T).toFixed(2)]))})),[est]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1350:  const curvasData=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1351:    const pts=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1352:    for(let d=5;d<=360;d+=5){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1353:      const row={d};
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1354:      TR_LIST.forEach(T=>row[`Tr${T}`]=+idfI(est,d,T).toFixed(2));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1355:      pts.push(row);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1356:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1357:    return pts;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1358:  },[est]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1359:  // Comparativa 20 estaciones a d=30min, Tr=100a
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1360:  const compData=useMemo(()=>Object.entries(ESTACIONES_EPM).map(([n,e])=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1387:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1388:            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" mm/h",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1389:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1390:            {TR_LIST.map((T,i)=><Line key={T} type="monotone" dataKey={`Tr${T}`} stroke={CC[i]} strokeWidth={1.8} dot={false} name={`Tr=${T}a`}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1391:          </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1392:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1393:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1394:      <Card title="Tabla IDF — Intensidades (mm/h)" accent={C.accent3}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1395:        <Tbl headers={["d(min)",...TR_LIST.map(T=>`Tr=${T}a`)]} rows={idfData.map(r=>({d:r.d,...Object.fromEntries(TR_LIST.map(T=>[T,r[`Tr${T}`]]))}))} hiCols={[6]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1396:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1397:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1398:    <Card title="Comparativa 20 Estaciones — I(d=30min, Tr=100a)" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1399:      <ResponsiveContainer width="100%" height={220}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1400:        <BarChart data={compData} margin={{left:0,right:14,top:8,bottom:44}} layout="vertical">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1401:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1411:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1412:    <Card title="Parámetros k · n · c — Todos los Tr" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1413:      <Tbl headers={["Tr (años)","k","n","c","I(10min)","I(30min)","I(60min)","I(120min)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1414:        rows={TR_LIST.map(T=>{const{k,n,c}=est.params[String(T)]||{k:0,n:1,c:0.4};return{T,k:+k.toFixed(4),n:+n.toFixed(4),c,I10:+idfI(est,10,T).toFixed(2),I30:+idfI(est,30,T).toFixed(2),I60:+idfI(est,60,T).toFixed(2),I120:+idfI(est,120,T).toFixed(2)};})}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1415:        hiCols={[4]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1416:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1417:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1418:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1419:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1420:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1649:      {/* Controles */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1650:      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1651:        <Card title="Período de Retorno" accent={C.gold}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1652:          <BtnGroup options={TR_LIST.map(t => ({ v: t, l: `${t}a` }))} value={Tr} onChange={setTr} accent={C.gold} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1653:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1654:        <Card title="Duración" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1655:          <BtnGroup options={[1, 2, 3, 6, 12].map(h => ({ v: h, l: `${h}h` }))} value={durH} onChange={setDurH} accent={C.accent3} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1656:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1657:        <Card title="Intervalo Δt" accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1658:          <BtnGroup options={[5, 10, 15, 30].map(d => ({ v: d, l: `${d}'` }))} value={dtMin} onChange={setDtMin} accent={C.accent} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2528:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2529:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2530:      <Card title="Tr Diseño" accent={C.gold}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2531:        <BtnGroup options={TR_LIST.map(t=>({v:t,l:`${t}a`}))} value={Tr} onChange={setTr} accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2532:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2533:      <Card title="Duración" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2534:        <BtnGroup options={[1,2,3,6].map(h=>({v:h,l:`${h}h`}))} value={durH} onChange={setDurH} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2535:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2536:      <Card title="Δt" accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2537:        <BtnGroup options={[5,10,15,30].map(d=>({v:d,l:`${d}'`}))} value={dtMin} onChange={setDtMin} accent={C.accent}/>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3522:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3523:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    fuente: "motor HidroFlow",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:    estacion_idf: stn,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    periodos_retorno: TR_LIST,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3561:      estado: "informativo_no_adoptivo",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3562:      tc_min: Number.isFinite(Number(tcRacionalMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3563:        ? Number(Number(tcRacionalMin).toFixed(2))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3615:    hidrogramas_resumen: previo?.hidrogramas_resumen ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3616:    hidrograma_principal: previo?.hidrograma_principal ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3617:  }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3618:}, [onContextoComparador, params, stn, trStateGlobal?.Tr_activo]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3619:// Publicación base Tc para despertar el Índice Hidrológico global.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3620:// No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3621:useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3622:  const estadoTcActual = getTcState();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3623:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3624:  const agenteTieneEstado =


## 4. Estado global Tc


  01_APP\HIDROFLOW\src\agents\tcAgent.js:3:// ============================================================
  01_APP\HIDROFLOW\src\agents\tcAgent.js:4:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:5:let TcState = {
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:6:  Tc_final: null,
  01_APP\HIDROFLOW\src\agents\tcAgent.js:7:  metodosTc: null,
  01_APP\HIDROFLOW\src\agents\tcAgent.js:8:  contextoTc: null
  01_APP\HIDROFLOW\src\agents\tcAgent.js:9:};
  01_APP\HIDROFLOW\src\agents\tcAgent.js:10:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:11:let listeners = [];
  01_APP\HIDROFLOW\src\agents\tcAgent.js:12:
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:13:export function setTcState(data) {
  01_APP\HIDROFLOW\src\agents\tcAgent.js:14:  TcState = { ...TcState, ...data };
  01_APP\HIDROFLOW\src\agents\tcAgent.js:15:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:16:  // 🔥 notifica a todos los componentes
  01_APP\HIDROFLOW\src\agents\tcAgent.js:17:  listeners.forEach(fn => fn(TcState));
  01_APP\HIDROFLOW\src\agents\tcAgent.js:18:}
  01_APP\HIDROFLOW\src\agents\tcAgent.js:19:
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:20:export function getTcState() {
  01_APP\HIDROFLOW\src\agents\tcAgent.js:21:  return TcState;
  01_APP\HIDROFLOW\src\agents\tcAgent.js:22:}
  01_APP\HIDROFLOW\src\agents\tcAgent.js:23:
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:24:export function subscribeTc(listener) {
  01_APP\HIDROFLOW\src\agents\tcAgent.js:25:  listeners.push(listener);
  01_APP\HIDROFLOW\src\agents\tcAgent.js:26:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:27:  return () => {
  01_APP\HIDROFLOW\src\agents\tcAgent.js:28:    listeners = listeners.filter(l => l !== listener);
  01_APP\HIDROFLOW\src\agents\tcAgent.js:29:  };
  01_APP\HIDROFLOW\src\agents\tcAgent.js:30:}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:1:import React, { useState, useEffect } from "react";
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:2:import { getTcState, subscribeTc } from "../agents/tcAgent";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:3:import { getTrState, setTrState, subscribeTr } from "../agents/trAgent";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:4:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:5:export default function IndiceHidrologico({
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:6:  goToTab: goToTabProp,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:7:  contexto,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:8:  tabActiva: tabActivaProp = "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:13:  navegarA,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:14:}) {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:15:  // --- Estado reactivo del Agente Tc ---
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:16:  const [tcState, setTcStateLocal] = useState(getTcState());
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:17:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:18:  useEffect(() => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:19:    const unsubscribe = subscribeTc(setTcStateLocal);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:20:    return () => unsubscribe();
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:21:  }, []);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:22:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:23:  const valoresTcAgente = Object.values(tcState?.metodosTc || {})
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:24:  .map((valor) => Number(valor))
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:25:  .filter((valor) => Number.isFinite(valor) && valor > 0);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:65:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:66:    // Tc
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:67:    tc = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:68:    tc_sugerido_min = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:69:    tc_metodos = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:70:    tc_resumen = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:71:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:72:    // Periodos de retorno
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:73:    periodos_retorno = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:74:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:75:    // Resumen completo futuro
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:209:    ? referenciaIDFPendiente
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:210:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:211:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:212:  const metodosTc = Array.isArray(tc_metodos)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:213:    ? tc_metodos
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:214:    : Array.isArray(tc?.metodos)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:215:    ? tc.metodos
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:216:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:217:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:218:  const resumenTc = tc_resumen || tc?.resumen || null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:219:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:702:  <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:703:    <span style={estilos.label}>Tc sugerido</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:704:    <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:705:      {tcState?.Tc_final !== null && tcState?.Tc_final !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:706:        ? `${formatNumero(tcState.Tc_final, 1)} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:707:        : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:708:    </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:709:  </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:710:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:711:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:712:          <span style={estilos.label}>Métodos válidos</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:740:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:741:          <span style={estilos.label}>Rango competente Tc</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:742:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:743:            {tcState?.rangoCompetenteTc
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:744:              ? formatNumero(tcState.rangoCompetenteTc.min, 1) + "–" +
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:745:                formatNumero(tcState.rangoCompetenteTc.max, 1) + " min"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:746:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:747:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:748:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:749:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:750:        {tcState?.Tc_final !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:751:          tcState?.Tc_final !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:752:          tcState?.rangoCompetenteTc?.min !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:753:          tcState?.rangoCompetenteTc?.max !== undefined &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:754:          tcState.rangoCompetenteTc.max > tcState.rangoCompetenteTc.min &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:755:          (tcState.Tc_final - tcState.rangoCompetenteTc.min) /
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:756:            (tcState.rangoCompetenteTc.max - tcState.rangoCompetenteTc.min) <= 0.15 ? (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:757:          <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:758:            ⚠ Advertencia técnica: el Tc sugerido está cerca del borde inferior del rango competente. Se recomienda revisar sensibilidad con escenario rápido, sugerido y lento antes de adoptarlo como valor único robusto.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:759:          </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:760:        ) : null}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:761:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:762:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1:import React, { useEffect, useMemo, useState } from "react";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:3:import { setTcState } from "../agents/tcAgent";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:4:import { calcTc, mapTcResultados } from "../services/hidroEngine";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:5:import { seleccionarTc } from "../services/tcSelector";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:6:import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:  resumenComparadorCatalogo,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:10:} from "../data/metodosComparadorCatalogo";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:11:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:12:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:52:const tcArray = calcTc(p);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:53:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:54:// ✅ MAPEAR RESULTADOS
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:55:const metodosTc = mapTcResultados(tcArray);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:56:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:57:// ✅ CONTEXTO HIDROLÓGICO
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:58:const contextoTc = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:59:  pendiente: contextoBase.pendiente_media_pct,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:60:  area: contextoBase.area_km2,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:61:  CN: contextoBase.CN,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:72:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:73:// ✅ Tc FINAL
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:74:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:75:const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:76:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:77:const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:78:  metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:79:  evaluacionCompetencia?.tc
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:80:);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:81:// ✅ Publicar Tc en el agente DESPUÉS del render
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:82:useEffect(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83:  if (Tc_final !== null && Tc_final !== undefined) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:84:    setTcState({
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:85:      Tc_final,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:86:      metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:87:      contextoTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:88:      metodosTcCompetentes,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:89:      rangoCompetenteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:90:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:91:  }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:92:}, [Tc_final]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:93:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:94:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:95:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:96:  // ✅ Y SOLO AQUÍ VA EL RETURN
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:97: // ✅ BLOQUE CONSISTENTE DE MÉTODOS
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:98:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:485:    if (valor && typeof valor === "object") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:486:      return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:487:        Number(valor.tc) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:488:        Number(valor.tc_min) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:489:        Number(valor.Tc) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:490:        Number(valor.TC) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:491:        Number(valor.valor) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:492:        Number(valor.resultado) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:493:        Number(valor.r) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:494:        Number(valor.value) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:500:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:501:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:502:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:503:  const bruto = contextoBase?.tc_metodos;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:504:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:505:  if (!bruto) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:506:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:507:  let candidatos = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:508:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:509:  if (Array.isArray(bruto)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:772:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:773:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:774:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:775:    const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:776:    const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:777:      Number.isFinite(tcReferencia) && tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:778:        ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:779:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:780:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:781:    const alertaTcTp =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1358:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1359:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1360:          const obtenerEstadoTemporalExpediente = (resultadoQ) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1361:            const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1362:            const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1363:              Number.isFinite(resultadoQ?.Tp) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1364:              Number.isFinite(tcReferencia) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1365:              tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1366:                ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1367:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1552:            `AMC: ${contextoBase?.AMC ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1553:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1554:            "## 3. Tiempo de concentración y roles Tc",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1555:            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1558:            "Roles Tc:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1559:            "- Tc global Índice: referencia hidrológica general.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1560:            "- Tc operativo Q(t): ruta interna del hidrograma.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1561:            "- Duración evento: 3 h para almacenamiento/regulación.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1588:              ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1589:                  `Tc racional exportado: ${
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1590:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1591:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:                  "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:                  "Tabla Método Racional:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:                  "| Tr | I | P | C | Q |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:                  "|---:|---:|---:|---:|---:|",
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:34:  mapTcResultados,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:35:  cnMixto,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:36:  cnII_to_III
  01_APP\HIDROFLOW\src\HidroFlow.jsx:37:} from "./services/hidroEngine";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:38:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:39:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:40:// HIDROFLOW v3.1 — Arquitectura Senior · GT-AS-004 · EPM 2025 · SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:327:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:328:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:329:// Resumen racional
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:330:function calcRacional(est,area,tc_min,CN){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:  const S=25400/CN-254,Ia=0.2*S;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:332:  return TR_LIST.map(Tr=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:333:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:334:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:335:    const Cc=P>0?Math.min(Pe/P,1):0.3;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:336:    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:337:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:338:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:339:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1453:    [params]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1454:  ); // r.min está en minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1455:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1456:  const Tc_sugerido_min = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1457:    if (!tcList.length) return 120;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1458:    const s = [...tcList.map(r => r.min)].sort((a, b) => a - b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1459:    const mid = Math.floor(s.length / 2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1460:    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1461:  }, [tcList]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1462:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1463:  // Override opcional (para análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1464:  const [usarOverrideTc, setUsarOverrideTc] = useState(false);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1465:  const [Tc_override_min, setTcOverride]   = useState(Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1466:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1467:  // Tc efectivo que entra a Q(t)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1468:  const tc_min = usarOverrideTc
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1469:  ? Tc_override_min 
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1470:  : +(params?.tcMedMin ?? Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1471:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1472:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1473:  // ✅ QA hidrológico (solo observación, no modifica nada)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1474:const qaHidro = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1475:  const tcBajo = tc_min < 5;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1476:  const tcAlto = tc_min > 180;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1477:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1478:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1479:    tcWarning: tcBajo || tcAlto,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1480:    amcWarning: !params?.amcFuente,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1481:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1482:    // En Hidrología no hay persistencia ni override de UI
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1483:    amcPersistiendo: false,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1484:    isOverride: false
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1485:  };
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1486:}, [tc_min, params?.amcFuente]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1487:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1488:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1489:  // Informe amigable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1490:  const infoTc = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1491:    if (!tcList.length) return "Sin Tc: faltan parámetros geomorfológicos.";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1492:    const etiquetas = tcList
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1493:      .map(r => `${r.m.split(" ")[0]}: ${r.min.toFixed(1)} min`)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1494:      .join(" · ");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1495:    return `Tc sugerido = mediana de ${tcList.length} métodos -> ${Tc_sugerido_min.toFixed(1)} min. [${etiquetas}]`;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1496:  }, [tcList, Tc_sugerido_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1497:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1498:  // === SCS‑CN desde Preliminares + override + AMC auto (SIATA) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1499:  const CN_panel        = Number.isFinite(params?.cnBase) ? params.cnBase : (params.CN ?? 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1500:  const AMC_panel       = params?.amcActual ?? "II"; // "I" | "II" | "III"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1501:  const pctImperv_panel = Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1502:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1790:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1791:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1792:              ) : (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1793:                <Kpi value={`${tc_min.toFixed(1)}`} label="Tc sugerido" accent={C.accent4} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1794:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1795:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1796:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1797:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1798:          {/* Informes */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1799:          <div style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 11, color: scsAviso.length ? C.rose : C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1812:        P_mm={P_mm}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1813:        dt_min={dt_min}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1814:        A_km2={A_km2}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1815:        Tc_min={tc_min}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1816:        CN={CN}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1817:        AMC={AMC_eff}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1818:        pctImperv={pctImperv}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1819:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1820:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1821:      {/* Distribuciones temporales comparadas */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1947:  // ── Tc, unidades y pendiente
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1948:  const tcList = useMemo(() => calcTc(params).filter(r => isFinite(r.h) && r.h > 0), [params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1949:  const tc_h   = tcList[tcSrc]?.h || 0.5;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1950:  const tc_min = tc_h * 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1951:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1952:  const area_mi2 = params.area * 0.386102;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1953:  const L_mi     = params.longitud_cauce * 0.621371;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1954:  const S_m_km   = (params.cota_mayor_cauce - params.cota_menor_cauce) / params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1955:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1956:  // ── Hietograma (Tr, 3 h de evento, dtMin, EPM_Q1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2196:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2197:  // Estado del hidrograma (QA) — objeto con flags para el panel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2198:const qaStatus = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2199:  const tcWarning = tc_min < 5 || tc_min > 180;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2200:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2201:  const amcWarning = params?.amcActual === "III";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2202:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2203:  // En Hidrología solo observamos estados, no persistimos ni override
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2204:  const amcPersistiendo = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2205:  const isOverride = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2210:    amcPersistiendo,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2211:    isOverride
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2212:  };
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2213:}, [tc_min, params?.amcActual]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2214:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2215:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2216: 
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2217:  // ── Resumen rápido (si ya usas buildResumenQ, úsalo)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2218:  const resumenQ = useMemo(() => buildResumenQ(params, est, dtMin, CNact), [params, est, dtMin, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2219:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2370:      {/* Panel QA - Estado hidrológico efectivo */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2371:      <div className="flex flex-wrap gap-4 p-3 mb-2 bg-slate-900 text-white rounded-md text-sm font-mono">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2372:       <div className={qaStatus.tcWarning ? "text-yellow-400" : "text-green-400"}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2373:         Tc operativo Hidrogramas: {tc_min.toFixed(1)} min
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2374:         {qaStatus.tcWarning && " ⚠️"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2375:         <span className="text-slate-400"> · ruta interna Q(t)</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2376:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2377:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2378:       <div className="text-slate-400">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2379:         <div style={{ marginTop: 6 }}>Roles Tc en HidroFlow:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2384:         <div>• Tc comparador: referencia especializada para coherencia Q-5.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2385:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2386:         <div>Escenarios Tc para Q(t):</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2387:         <div>• Operativo Q(t): {tc_min.toFixed(1)} min · activo</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2388:         <div>• Índice global: {Number.isFinite(params?.tcMedMin) ? params.tcMedMin.toFixed(1) : "—"} min · referencia</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2389:         <div>• Comparador: pendiente · referencia especializada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2390:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2391:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2392:       <div className={qaStatus.amcWarning ? "text-red-400" : "text-blue-400"}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2393:         AMC: {params?.amcActual ?? "N/A"} ({params?.amcFuente ?? "Sin fuente"})
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2681:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2682:function ModRacional({params,est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2683:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2684:  const tc_min=useMemo(()=>tcList.reduce((s,r)=>s+r.min,0)/(tcList.length||1),[tcList]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2685:  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2686:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2687:    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2688:    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2689:      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2690:      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2691:      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2692:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2693:    <Card title="Caudales Racionales — Todos los Tr" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2694:      <ResponsiveContainer width="100%" height={240}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2695:        <BarChart data={res} margin={{left:0,right:18,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3561:      estado: "informativo_no_adoptivo",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3562:      tc_min: Number.isFinite(Number(tcRacionalMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3563:        ? Number(Number(tcRacionalMin).toFixed(2))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3564:        : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3565:      resultados: resultadosRacionalExportable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3566:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3567:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3568:    cuencaNombre:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3604:    CN_efectivo: params?.CN_efectivo ?? params?.cnEfectivo ?? cnBase,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3605:    AMC: params?.AMC ?? params?.amcActual ?? params?.amc ?? "II",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3606:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3607:    tc_metodos: calcTc(params),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3608:    
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3609:    lluvia_efectiva: previo?.lluvia_efectiva ?? false,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3610:    lluvia_efectiva_total_mm: previo?.lluvia_efectiva_total_mm ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3611:    hidrogramas: previo?.hidrogramas ?? {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3612:      fuente: "pendiente",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3613:      resultados: []
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3619:// Publicación base Tc para despertar el Índice Hidrológico global.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3620:// No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3621:useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3622:  const estadoTcActual = getTcState();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3623:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3624:  const agenteTieneEstado =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3625:    estadoTcActual?.Tc_final !== null &&
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3626:    estadoTcActual?.Tc_final !== undefined &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3627:    estadoTcActual?.metodosTc;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3628:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3629:  const agenteTieneEstadoEspecializado =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3630:    estadoTcActual?.rangoCompetenteTc ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3631:    estadoTcActual?.metodosTcCompetentes;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3632:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3633:  if (agenteTieneEstado || agenteTieneEstadoEspecializado) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3634:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3635:  const tcArrayBase = calcTc(params).filter(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3636:    (r) => Number.isFinite(r.h) && Number.isFinite(r.min) && r.h > 0 && r.min > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3638:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3639:  if (!tcArrayBase.length) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3640:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3641:  const metodosTcBase = mapTcResultados(tcArrayBase);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3642:  const valoresTcBase = Object.values(metodosTcBase).filter(Number.isFinite);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3643:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3644:  if (!valoresTcBase.length) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3645:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3646:  const valoresOrdenados = [...valoresTcBase].sort((a, b) => a - b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3647:  const mitad = Math.floor(valoresOrdenados.length / 2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3655:      ? params.tcMedMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3656:      : tcMedianaBase;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3657:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3658:  setTcState({
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3659:    Tc_final: tcBase,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3660:    metodosTc: metodosTcBase,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3661:    contextoTc: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3662:      pendiente:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3663:        params?.pendiente_media_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3664:        params?.pendienteMediaPct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3665:        params?.pendiente_pct ??
  01_APP\HIDROFLOW\src\services\tcSelector.js:84:// 3. Selector final inteligente (OT-0007-A)
  01_APP\HIDROFLOW\src\services\tcSelector.js:85:// ============================================================
  01_APP\HIDROFLOW\src\services\tcSelector.js:86:
> 01_APP\HIDROFLOW\src\services\tcSelector.js:87:export function seleccionarTc(modo, metodosTc, contexto = {}) {
  01_APP\HIDROFLOW\src\services\tcSelector.js:88:
  01_APP\HIDROFLOW\src\services\tcSelector.js:89:  // 🔹 Límites físicos
> 01_APP\HIDROFLOW\src\services\tcSelector.js:90:  const Tc_min = metodosTc.Kirpich ?? null;
  01_APP\HIDROFLOW\src\services\tcSelector.js:91:  const Tc_max = metodosTc.Temez ?? null;
  01_APP\HIDROFLOW\src\services\tcSelector.js:92:
  01_APP\HIDROFLOW\src\services\tcSelector.js:93:  // 🔥 Tc dinámico real
  01_APP\HIDROFLOW\src\services\tcSelector.js:94:  const Tc_ref_base = calcularTcRef(metodosTc);
  01_APP\HIDROFLOW\src\services\tcSelector.js:95:  const Tc_ref = ajustarTcPorCondiciones(Tc_ref_base, contexto);
  01_APP\HIDROFLOW\src\services\tcSelector.js:96:
  01_APP\HIDROFLOW\src\services\tcSelector.js:97:  switch (modo) {
  01_APP\HIDROFLOW\src\services\tcSelector.js:98:
  01_APP\HIDROFLOW\src\services\tcSelector.js:99:    case 'Qp':           // Caudal pico (Racional)
> 01_APP\HIDROFLOW\src\services\tcSelector.js:100:      return Tc_min;
  01_APP\HIDROFLOW\src\services\tcSelector.js:101:
  01_APP\HIDROFLOW\src\services\tcSelector.js:102:    case 'hidrograma':   // UH, SCS, Snyder, Clark
  01_APP\HIDROFLOW\src\services\tcSelector.js:103:      return Tc_ref;
  01_APP\HIDROFLOW\src\services\tcSelector.js:104:
  01_APP\HIDROFLOW\src\services\tcSelector.js:105:    case 'volumen':      // análisis conservador
  01_APP\HIDROFLOW\src\services\tcSelector.js:106:      return Tc_max;


## 5. Qp, Tp y Volumen en Hidrogramas


  01_APP\HIDROFLOW\src\HidroFlow.jsx:107:  {T:75,P:87.84},{T:80,P:90.11},{T:85,P:92.16},{T:90,P:93.90},{T:95,P:95.32},{T:100,P:100},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:108:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:109:// Ec.2 polinomio — GT-AS-004
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:110:function distPolyQ1(T){return 3.820399e-8*T**5-1.104784e-5*T**4+1.278006e-3*T**3-7.958462e-2*T**2+3.400981*T;}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:111:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:112:// ─── CURVAS HUFF (Quartiles I-IV) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:113:// Curvas Huff estándar (Illinois, USA) adaptadas — probabilidad 50%
  01_APP\HIDROFLOW\src\HidroFlow.jsx:114:// Q1: lluvia concentrada en primer 25% del tiempo (convectiva)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:115:// Q2: lluvia concentrada 25-50% del tiempo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:116:// Q3: lluvia concentrada 50-75% del tiempo  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:117:// Q4: lluvia distribuida en último 25% del tiempo (frontal)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:129:}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:130:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:131:// Interpolación lineal en tabla de distribución
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:132:function interpDist(table, tPct){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:133:  if(tPct<=0) return 0; if(tPct>=100) return 100;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:134:  const lo=table.filter(r=>r.T<=tPct).pop()||table[0];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:135:  const hi=table.filter(r=>r.T>=tPct)[0]||table[table.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:136:  if(lo.T===hi.T) return lo.P;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:137:  return lo.P+(hi.P-lo.P)*(tPct-lo.T)/(hi.T-lo.T);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:138:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:139:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:140:// ─── GENERACIÓN DE HIETOGRAMA ─────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:141:// Método: Distribución temporal adimensional (GT-AS-004 §3.3 o Huff)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:142:// Retorna: {data:[{t,tPct,pAcum,pIncrem,iBloque}], Ptotal}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:143:function calcHietograma(est, Tr, dur_h, dt_min, distType="EPM_Q1"){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:144:  const Ptotal = idfI(est, dur_h*60, Tr) * dur_h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:145:  const steps  = Math.round(dur_h*60/dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:146:  const distTable = distType==="EPM_Q1" ? DIST_TEMPORAL_Q1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:147:    : distType==="Huff_Q1" ? HUFF_DATA.Q1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:148:    : distType==="Huff_Q2" ? HUFF_DATA.Q2
  01_APP\HIDROFLOW\src\HidroFlow.jsx:149:    : distType==="Huff_Q3" ? HUFF_DATA.Q3
  01_APP\HIDROFLOW\src\HidroFlow.jsx:150:    : HUFF_DATA.Q4;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:151:  const data=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:152:  for(let i=0;i<=steps;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:153:    const tPct=(i/steps)*100;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:154:    const pPct= distType==="EPM_Q1" ? distPolyQ1(tPct) : interpDist(distTable,tPct);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:155:    data.push({t:+(i*dt_min).toFixed(1), tPct:+tPct.toFixed(1), pAcum:+(pPct/100*Ptotal).toFixed(3)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:156:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:157:  for(let i=1;i<data.length;i++){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:158:    data[i].pIncrem=+(data[i].pAcum-data[i-1].pAcum).toFixed(4);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:159:    data[i].iBloque=+(data[i].pIncrem/(dt_min/60)).toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:160:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:161:  data[0].pIncrem=0; data[0].iBloque=0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:162:  return {data, Ptotal:+Ptotal.toFixed(2), steps, dur_h, dt_min, Tr, distType};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:184:function normalizarHUaMm(uh, areaKm2, dt_min) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:185:  const volumenObjetivo = areaKm2 * 1000;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:186:  const volumenUH = (uh || []).reduce(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:187:    (suma, q) => suma + Number(q || 0) * (dt_min * 60),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:188:    0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:189:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:190:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:191:  if (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:192:    !Number.isFinite(volumenObjetivo) ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:193:    volumenObjetivo <= 0 ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:194:    !Number.isFinite(volumenUH) ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:195:    volumenUH <= 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:196:  ) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:197:    return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:198:      uh,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:199:      qp: Math.max(...(uh || [0])),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:200:      factor: 1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:201:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:202:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:203:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:204:  const factor = volumenObjetivo / volumenUH;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:205:  const uhNormalizado = uh.map((q) => +(Number(q || 0) * factor).toFixed(7));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:206:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:207:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:208:    uh: uhNormalizado,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:209:    qp: +Math.max(...uhNormalizado).toFixed(7),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:210:    factor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:211:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:212:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:213:// ① HU SCS (Chow et al., 1994 — GT-AS-004 §3.5)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:214:function calcHUSCS(area, tc_h, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:215:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h, qp=2.08*area/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:216:  const n=Math.ceil(2.67*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:217:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:218:    const t=i*dh, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:219:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:220:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:221:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:222:  return{tp,qp:normalizado.qp,Tc:tc_h*60,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"SCS",color:C.accent2}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:223:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:224:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:225:// ② HU SCS MODIFICADO — SCS con coeficiente de pico Cp variable
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:226:// Cp estándar=2.08; Cp modificado=(0.2083·A)/tp ajustado por morfología
  01_APP\HIDROFLOW\src\HidroFlow.jsx:227:function calcHUSCS_Mod(area, tc_h, dt_min, Cp=2.08){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:228:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:229:  const qp=Cp*area/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:230:  const n=Math.ceil(3.0*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:231:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:232:    const t=i*dh, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:233:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:234:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:235:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:236:  return{tp,qp:normalizado.qp,Tc:tc_h*60,uh:normalizado.uh,Cp,factorNormalizacion:normalizado.factor,metadata:{nombre:"SCS Mod.",color:C.teal}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:237:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:238:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:239:// ③ HU SNYDER (Chow et al. 1994 — versión Ct/Cp configurable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:240:function calcHUSnyder(area_mi2, L_mi, Lca_mi, dt_min, Ct=2.0, Cp=0.62){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:241:  const tlag=Ct*Math.pow(L_mi*Lca_mi,0.3);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:242:  const tp=tlag+dt_min/60/2;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:243:  const qp=(640*Cp*area_mi2)/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:244:  const W50=770/Math.pow(qp/area_mi2,1.08);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:245:  const W75=440/Math.pow(qp/area_mi2,1.08);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:246:  const n=Math.ceil(5*(tp+tlag)/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:247:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:248:    const t=i*dt_min/60, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:249:    return +(tr<=1?qp*Math.pow(tr,2.5):qp*Math.exp(-2.0*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:250:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:251:  const areaKm2 = area_mi2 / 0.386102;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:252:  const normalizado = normalizarHUaMm(uh, areaKm2, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:253:  return{tp,qp:normalizado.qp,tlag,W50,W75,Ct,Cp,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Snyder",color:C.accent3}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:254:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:255:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:256:// ④ HU WILLIAMS & HANN (Williams & Hann, 1973)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:257:// Basado en: qp = 2.54·A^0.9·(S/1000)^0.5·CN^3/(Ia·A)  → simplificado
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:258:// Fórmula geomorfológica: qp=(A^m1·S^m2·CN^m3)·K_WH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:259:function calcHUWilliamsHann(area, L_km, S_m_km, CN, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:260:  // Williams & Hann (1973): Tc = 0.1838·L^0.8·(S+1)^0.7 / (CN^0.35·S^0.5)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:261:  const Ss = 25400/CN - 254;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:262:  const tc_h = (0.1838*Math.pow(L_km,0.8)*Math.pow(Ss+1,0.7)) / (Math.pow(CN,0.35)*Math.pow(Math.max(S_m_km,0.01),0.5)) / 60;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:263:  const tp = 0.5*(dt_min/60) + 0.6*tc_h;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:264:  // Caudal pico Williams & Hann: qp = 2.083·A/tp · κ donde κ = 1.12 (calibración W&H)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:265:  const kWH = 1.12;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:266:  const qp  = kWH * 2.083 * area / tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:267:  const n   = Math.ceil(2.8*tp/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:268:  const uh  = Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:269:    const t=i*dt_min/60, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:270:    return +(tr<=1?qp*Math.pow(tr,2.208):qp*Math.exp(-1.25*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:271:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:272:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:273:  return{tp,qp:normalizado.qp,tc_h,Tc:tc_h*60,Ss,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Williams & Hann",color:C.gold}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:274:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:275:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:276:// ④b CLARK IUH (Clark, 1945) — Hidrograma Unitario Instantáneo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:277:// IUH de Clark: u(t) = qp·exp(-t/R) para t>tp, crecida lineal hasta tp
  01_APP\HIDROFLOW\src\HidroFlow.jsx:278:// Parámetros: tc (tiempo concentración), R (coef. almacenamiento cuenca)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:279:// R = k_R * tc  (típico k_R = 0.5–2.0, default 1.2)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:280:function calcClarkIUH(area, tc_h, dt_min, kR=1.2){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:281:  const dh   = dt_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:282:  const R    = kR * tc_h;  // coeficiente almacenamiento
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:283:  const qp   = 2.08*area/tc_h;  // caudal pico IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:284:  const n    = Math.ceil((tc_h + 6*R)/dh) + 12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:285:  const uh   = Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:286:    const t = i*dh;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:287:    // Antes de tc: crecida lineal; después: recesión exponencial
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:288:    const u = t<=tc_h ? qp*(t/tc_h) : qp*Math.exp(-(t-tc_h)/R);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:289:    return +Math.max(u,0).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:290:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:291:  const tp   = tc_h;  // tiempo al pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:292:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:293:  return{tp,qp:normalizado.qp,tc_h,R,kR,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Clark IUH",color:C.accent4}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:294:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:295:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:296:// ─── HIDROGRAMA COMPLETO (hietograma → convolución → Q(t)) ───────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:297:function calcHidroCompleto(lluvRows, uh_struct, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:298:  const peList=lluvRows.slice(1).map(r=>r.PeIncrem).filter((v,i,a)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:299:    // Incluir todos los incrementos positivos y su contexto
  01_APP\HIDROFLOW\src\HidroFlow.jsx:300:    return v>0 || (a[i-1]>0||a[i+1]>0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:301:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:302:  const peAll = lluvRows.slice(1).map(r=>Math.max(r.PeIncrem||0,0));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:303:  const qSeries = convolucion(uh_struct.uh, peAll, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:304:  const Qpico = Math.max(...qSeries.map(r=>r.Q));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:305:  const tPico = qSeries.find(r=>r.Q>=Qpico*0.9999)?.t || 0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:306:  const volTotal = qSeries.reduce((s,r)=>s+r.Q*(dt_min*60),0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:307:  return{qSeries, Qpico:+Qpico.toFixed(6), tPico:+tPico.toFixed(2),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:308:    volTotal:+volTotal.toFixed(1), metodo:uh_struct.metadata.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:309:    color:uh_struct.metadata.color};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:310:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:311:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:312:// ─── FUNCIONES AUXILIARES ────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:313:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:314:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:315:// Volumen de almacenamiento SAR (GT-AS-004 §3.8)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:316:function calcVolSAR(qPost, qPre, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:317:  const n=Math.min(qPost.length,qPre.length);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:318:  let volAcum=0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:319:  const exc=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:320:  for(let i=0;i<n;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:321:    const diff=qPost[i].Q-(qPre[i]?.Q||0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:322:    if(diff>0) volAcum+=diff*dt_min*60;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:323:    exc.push({t:qPost[i].t, Qpost:+qPost[i].Q.toFixed(5), Qpre:+(qPre[i]?.Q||0).toFixed(5),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:324:      exceso:+Math.max(diff,0).toFixed(5), volAcum:+volAcum.toFixed(1)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:325:  }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:326:  return{excesos:exc, volTotal:+volAcum.toFixed(1)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:327:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:328:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:329:// Resumen racional
  01_APP\HIDROFLOW\src\HidroFlow.jsx:330:function calcRacional(est,area,tc_min,CN){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:  const S=25400/CN-254,Ia=0.2*S;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:332:  return TR_LIST.map(Tr=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:333:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:353:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
  01_APP\HIDROFLOW\src\HidroFlow.jsx:354:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:355:      const HU   = m.make();
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:356:      const H    = calcHidroCompleto(Pe, HU, dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:357:      row[Tr]    = +H.Qpico.toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:358:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:359:    return row;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:360:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:361:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:362:// ─── EXPORTACIÓN EXCEL (SheetJS) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:363:async function exportarExcel(datos){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:364:  const XLSX = await import("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").catch(()=>null);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:365:  if(!XLSX) return alert("Error cargando SheetJS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:366:  const WX = XLSX.default || XLSX;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:367:  const wb = WX.utils.book_new();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:368:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:369:  // Hoja 1: Parámetros de diseño
  01_APP\HIDROFLOW\src\HidroFlow.jsx:370:  const ws1 = WX.utils.aoa_to_sheet([
  01_APP\HIDROFLOW\src\HidroFlow.jsx:371:    ["HIDROFLOW v3.0 — GT-AS-004 · EPM 2025"],[""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:395:  // Hoja 2: Hietograma
  01_APP\HIDROFLOW\src\HidroFlow.jsx:396:  if(datos.hiet){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:397:    const rows=[["t (min)","T (%)","P acum (mm)","P increm (mm)","i bloque (mm/h)"]];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:398:    datos.hiet.data.forEach(r=>rows.push([r.t,r.tPct,r.pAcum,r.pIncrem||0,r.iBloque||0]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:399:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hietograma");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:400:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:401:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:402:  // Hoja 3: Hidrogramas comparativos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:403:  if(datos.hidros){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:404:    const header=["t (min)",...datos.hidros.map(h=>h.metodo+" Q(m³/s)")];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:405:    const len=Math.max(...datos.hidros.map(h=>h.qSeries.length));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:406:    const rows=[header];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:407:    for(let i=0;i<len;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:408:      const row=[+(i*datos.dt_min).toFixed(2),...datos.hidros.map(h=>h.qSeries[i]?.Q||0)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:409:      rows.push(row);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:410:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:411:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hidrogramas");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:412:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:413:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:414:  // Hoja 4: Volumen SAR
  01_APP\HIDROFLOW\src\HidroFlow.jsx:415:  if(datos.volSAR){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:416:    const rows=[["t (min)","Q post (m³/s)","Q pre (m³/s)","Exceso (m³/s)","Vol. Acum. (m³)"]];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:417:    datos.volSAR.excesos.filter((_,i)=>i%Math.max(1,Math.floor(datos.volSAR.excesos.length/500))===0)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:418:      .forEach(r=>rows.push([r.t,r.Qpost,r.Qpre,r.exceso,r.volAcum]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:419:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Vol_SAR");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:420:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:421:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:422:  // Hoja 5: Resumen caudales
  01_APP\HIDROFLOW\src\HidroFlow.jsx:423:  if(datos.resumenQ){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:424:    const rows=[["Método","Tr=2.33a","Tr=5a","Tr=10a","Tr=25a","Tr=50a","Tr=100a"]];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:425:    datos.resumenQ.forEach(r=>rows.push([r.metodo,...TR_LIST.map(t=>r[t]||0)]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:433:async function exportarPDF(refEl, datos){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:434:  try{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:435:    const [h2c, jsPDF_mod] = await Promise.all([
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:436:      import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:437:      import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:438:    ]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:439:    const html2canvas=h2c.default||h2c;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:440:    const {jsPDF}=jsPDF_mod.default||jsPDF_mod;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:441:    const canvas=await html2canvas(refEl,{scale:1.5,backgroundColor:"#07090F",useCORS:true});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:442:    const imgData=canvas.toDataURL("image/jpeg",0.92);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:443:    const pdf=new jsPDF({orientation:"landscape",unit:"mm",format:"a3"});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:444:    const pw=pdf.internal.pageSize.getWidth();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1111:// Subcomponente: Card "Condición de Humedad (AMC) y Urbanización"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1112:// (versión con hooks por named import: useState/useEffect/useCallback)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1113:// ───────────────────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1114:function AMCPanel({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1115:  // Normalizaciones (evitan NaN/undefined)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1116:  const amcSel = params?.amcActual ?? "II";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1117:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:    ? params.porcentajeImpermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    : 60; // ← unifica default con ModHidrogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1120:  const cnBase = Number.isFinite(params?.cnBase)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1121:    ? params.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1122:    : (Number.isFinite(params?.CN) ? params.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1123:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1124:  // Estado local para el slider (evita flood al arrastrar)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1125:  const [pctLive, setPctLive] = useState(pctImp);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1126:  useEffect(() => { setPctLive(pctImp); }, [pctImp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1127:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1128:  // Commit del % Impermeable (al soltar / perder foco)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1129:  const commitPct = useCallback((v) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1130:    setParams(prev => ({ ...prev, porcentajeImpermeable: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1131:    if (import.meta.env.DEV) console.log("[AMC]", "%Impermeable ->", v);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1132:  }, [setParams]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1133:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1134:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1135:    <div style={{ marginTop: 16, padding: 16, border: '1px solid #1F2F45', borderRadius: 10, background: '#0F1624' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1136:      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1137:        <h3 style={{ margin: 0, fontSize: 16 }}>Condición de Humedad (AMC) y Urbanización</h3>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1138:        <small style={{ opacity: 0.75 }}>Ajusta AMC, % Impermeable y CN II base</small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1139:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1151:                  key={a}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1152:                  type="button"  // evita submit si hay <form> ancestro
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1153:                  onClick={() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1154:                    setParams(prev => ({ ...prev, amcActual: a }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1155:                    if (import.meta.env.DEV) console.log("[AMC]", "amcActual ->", a);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1156:                  }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1157:                  style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1158:                    padding: '8px 12px',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1159:                    borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1160:                    cursor: 'pointer',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1161:                    border: sel ? '1px solid #00F5A0' : '1px solid #1F2F45',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1179:          <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1180:            type="range" min={0} max={100} step={1}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1181:            value={pctLive}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1182:            onChange={e => setPctLive(+e.target.value)}               // solo UI mientras arrastras
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1183:            onPointerUp={() => commitPct(pctLive)}                    // commit al soltar (touch/pen)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1184:            onMouseUp={() => commitPct(pctLive)}                      // commit al soltar (mouse)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1185:            onBlur={() => commitPct(pctLive)}                         // commit al salir del control
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1186:            style={{ width: '100%' }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1187:            aria-label="% Impermeable"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1188:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1189:          <div style={{ marginTop: 8, fontFamily: 'monospace' }}>{pctLive}%</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1190:          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1191:            Pondera CN mezclando suelo permeable e impermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1192:          </small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1200:            value={cnBase}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1201:            onChange={e => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1202:              const v = +e.target.value;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1203:              setParams(prev => ({ ...prev, cnBase: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1204:              if (import.meta.env.DEV) console.log("[AMC]", "cnBase ->", v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1205:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1206:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1207:              width: '100%', padding: 8, borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1208:              border: '1px solid #1F2F45', background: '#0B0F1A', color: '#D8E4F0'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1209:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1210:            aria-label="CN II base"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1219:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1220:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1221:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1222:function ModParams({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1223:  // Cálculos de Tc y utilidades locales
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1224:  const tc      = useMemo(() => calcTc(params), [params]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1225:  const set     = k => v => setParams(p => ({ ...p, [k]: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1226:  const tcStats = tc.filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1227:  const tcMed   = tcStats.length ? tcStats.reduce((s, r) => s + r.h, 0) / tcStats.length : 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1228:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1229:  // Persistir Tc medio (min) en params para otros módulos (Hietogramas, Hidrogramas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1230:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1231:    if (!isFinite(tcMed) || tcMed <= 0) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1232:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1234:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1235:    if (params.tcMedMin === tcMedMin) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1236:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1237:    setParams(p => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1238:     ...p,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1239:     tcMedMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1240:   }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1241: }, [tcMed, params.tcMedMin, setParams]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1242: ``
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1243:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1244:    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1245:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1246:      {/* ── Morfometría / Índices / Tc (bloque superior) ───────────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1247:      <SectionHeader
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1248:        icon="⬡"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1308:      {/* ⬆️ Cierre del grid de Morfometría — PUNTO DE INSERCIÓN CORRECTO */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1309:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1310:      {/* ── Card AMC y Urbanización (subcomponente) ────────────────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1311:      <AMCPanel params={params} setParams={setParams} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1312:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1313:      {/* ── KPIs de forma, compacidad, pendiente y Tc promedio ─────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1314:      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1315:        {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1316:          { v: (params.perimetro / (2 * Math.sqrt(Math.PI * params.area))).toFixed(3),   l: "Índice Gravelius", s: "Kc", a: C.accent },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1317:          { v: ((params.longitud_cuenca ** 2) / params.area).toFixed(3),                 l: "Índice de Forma", s: "Rf", a: C.accent2 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1318:          { v: (params.area / (params.longitud_cuenca ** 2)).toFixed(4),                 l: "Coef. Compacidad", s: "Cc", a: C.accent3 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1420:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1421:// MÓDULO HIETOGRAMAS — Distribución temporal + Curvas Huff
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1422:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1423:function ModHietogramas({ est, name, params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1424:  const [Tr, setTr] = useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1425:  const [durH, setDurH] = useState(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1426:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1427:  // Sync dtMin when params.dt changes externally (ej: carga de datos)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1428:  useEffect(() => { if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt); }, [params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1429:  const [guardarAMCenPanel, setGuardarAMCenPanel] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1430:  const [distType, setDistType] = useState("EPM_Q1");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1438:  // Hietogramas comparativos de todas las distribuciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1439:  const hietAll = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1440:    const types = ["EPM_Q1", "Huff_Q1", "Huff_Q2", "Huff_Q3", "Huff_Q4"];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1441:    return types.map(tp => ({ tp, data: calcHietograma(est, Tr, durH, dtMin, tp) }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1442:  }, [est, Tr, durH, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1443:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1444:  // === Día 3 (MVP) — Orquestación P → Pn → UH → Q(t) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1445:  // Vector de incrementos (mm por bloque) y Δt
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1446:  const P_mm  = hiet.data.map((r, i, a) => (i === 0 ? 0 : +(r.pAcum - a[i - 1].pAcum).toFixed(5)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1447:  const dt_min = dtMin;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1448:  const A_km2  = Number.isFinite(params?.area) ? params.area : 36.58;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1504:  const [overrideSCS, setOverrideSCS] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1505:  const [CN_ovr, setCN_ovr]          = useState(CN_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1506:  const [AMC_ovr, setAMC_ovr]        = useState(AMC_panel);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1507:  const [pctImp_ovr, setPctImp_ovr]  = useState(pctImperv_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1508:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1509:  // Valores efectivos (panel u override)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1510:  const CN        = overrideSCS ? CN_ovr     : CN_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1511:  const AMC       = overrideSCS ? AMC_ovr    : AMC_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1512:  const pctImperv = overrideSCS ? pctImp_ovr : pctImperv_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1513:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1514:  // Chequeos amables de rango (usa '-' ASCII para evitar tofu en monospace)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1562:      amcHSref:   typeof hs_demo === "number" ? hs_demo : undefined
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1563:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1564:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1565:    // Requiere que ModHietogramas reciba setParams como prop
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1566:    setParams(prev => ({ ...prev, ...payload }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1567:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1568:}, [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1569:  guardarAMCenPanel,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1570:  usarAMCauto,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1571:  amcAuto?.amcActual,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1572:  amcAuto?.amcFuente,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1573:  amcAuto?.amcInforme,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1574:  hs_demo,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1575:  params?.amcActual,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1576:  setParams
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1577:]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1578:  /**
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1579:   * exportarPNGDesdeRef
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1580:   * @param {React.RefObject} refNodo       ref al contenedor (div) que envuelve ResponsiveContainer
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1581:   * @param {string}          nombreArchivo nombre del PNG a descargar
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1582:   */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1583:  const exportarPNGDesdeRef = async (refNodo, nombreArchivo) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1584:    // Import desde CDN — @vite-ignore evita que Vite lo resuelva como paquete local
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1585:    const moduloH2C = await import(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1586:      /* @vite-ignore */ "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1587:    );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1588:    const html2canvas = moduloH2C.default ?? moduloH2C;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1589:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1590:    if (!refNodo?.current) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1591:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1592:    const canvas = await html2canvas(refNodo.current, {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1593:      backgroundColor: "#0B0F1A", // coherente con el fondo de tu UI
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1611:      hietAll.forEach(h => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1612:        const j = Math.min(idx * step + 1, h.data.data.length - 1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1613:        const match = h.data.data[j];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1614:        if (match) obj[h.tp] = match.iBloque || 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1615:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1616:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1617:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1618:  }, [hiet, hietAll]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1619:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1620:  // Distribuciones adimensionales comparadas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1621:  const distMerge = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1766:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1767:                <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1768:                  type="number" min={0} max={100} step={1} value={pctImp_ovr}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1769:                  onChange={e => setPctImp_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1770:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1771:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1772:              ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1773:                <Kpi value={`${pctImperv}%`} label="% Imperv" accent={C.accent} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1774:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1775:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1776:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1889:          rows={hiet.data
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1890:            .slice(1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1891:            .filter((_, i) => i % Math.max(1, Math.floor(hiet.steps / 40)) === 0)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1892:            .map(r => ({ t: r.t, T: r.tPct, P: r.pAcum, dP: r.pIncrem, i: r.iBloque }))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1893:          hiCols={[3, 4]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1894:          accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1895:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1896:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1897:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1898:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1899:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1968:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1969:  // ── Convolución (Pe * HU) → hidrogramas por método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1970:  const hidros = useMemo(() => (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1971:    [hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark].map(hu => calcHidroCompleto(lluvEfect, hu, dtMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1972:  ), [lluvEfect, hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1973:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1974:  // Hidrograma activo (SCS por defecto)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1975:  const h0 = hidros?.[0] ?? null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1976:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1977:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1978:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2044:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2045:    if (!Array.isArray(serie) || serie.length === 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2046:      return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2047:        QpSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2048:        TpSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2049:        volumenSerie: null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2050:        puntos: null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2051:      };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2052:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2053:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2054:    let QpSerie = null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2055:    let TpSerie = null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2056:    let volumenSerie = 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2057:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2058:    serie.forEach((punto, indice) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2059:      const q = leerQ(punto);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2060:      const t = leerT(punto, indice);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2061:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2062:      if (q !== null && (QpSerie === null || q > QpSerie)) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2063:        QpSerie = q;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2064:        TpSerie = t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2065:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2066:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2067:      if (indice > 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2068:        const q0 = leerQ(serie[indice - 1]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2069:        const q1 = q;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2070:        const t0 = leerT(serie[indice - 1], indice - 1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2071:        const t1 = t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2076:          Number.isFinite(t0) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2077:          Number.isFinite(t1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2078:        ) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2079:          volumenSerie += ((q0 + q1) / 2) * ((t1 - t0) * 60);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2080:        }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2081:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2082:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2083:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2084:    return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2085:      QpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2086:      TpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2087:      volumenSerie: volumenSerie > 0 ? volumenSerie : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2088:      puntos: serie.length,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2089:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2090:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2091:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2092:  const hidrogramasResumen = Array.isArray(hidros)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2093:    ? hidros.map((h, i) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2094:        const calculado = calcularDesdeSerie(h);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2095:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2096:        const QpDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2097:  h?.Qpico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2098:    h?.Qp ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2099:    h?.qp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2100:    h?.q_pico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2101:    h?.caudalPico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2102:    h?.caudal_pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2103:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2104:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2105:        const TpDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2106:  h?.tPico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2107:    h?.Tp ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2108:    h?.tp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2109:    h?.t_pico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2110:    h?.tiempoPico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2111:    h?.tiempo_pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2112:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2113:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2114:        const volumenDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2115:  h?.volTotal ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2116:    h?.volumen ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2117:    h?.V ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2118:    h?.vol ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2119:    h?.volume
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2120:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2121:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2122:        return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2123:          metodo: nombresHidrogramas[i] ?? `Método ${i + 1}`,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2124:          Qp:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2125:            QpDirecto && QpDirecto > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2126:              ? QpDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2127:              : calculado.QpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2128:          Tp:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2129:            TpDirecto && TpDirecto > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2130:              ? TpDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2131:              : calculado.TpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2132:          volumen:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2133:            volumenDirecto && volumenDirecto > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2134:              ? volumenDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2135:              : calculado.volumenSerie,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2136:          puntos: calculado.puntos,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2137:        };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2138:      })
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2139:    : [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2140:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2141:    
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2142:  const valoresLluviaEfectivaMm = Array.isArray(lluvEfect)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2166:    sumaLluviaEfectivaMm / maxLluviaEfectivaMm > 3
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2167:      ? maxLluviaEfectivaMm
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2168:      : sumaLluviaEfectivaMm || null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2169:  const hidrogramasQ5Exportables = (hidros || []).map((h) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2170:    metodo: h?.metodo ?? "Método Q-5",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2171:    Qpico: h?.Qpico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2172:    tPico: h?.tPico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2173:    volTotal: h?.volTotal,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2174:    Qp: h?.Qpico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2175:    Tp: h?.tPico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2176:    volumen: h?.volTotal
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2177:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2178:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2179:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:      resultados: hidrogramasQ5Exportables
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2188:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2189:    lluvia_efectiva_total_mm: lluviaEfectivaTotalMm,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2190:    hidrogramas_resumen: hidrogramasResumen,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2191:    hidrograma_principal: h0 ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2192:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2193:}, [onContextoComparador, hidros, h0, lluvEfect, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2194:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2195:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2196:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2197:  // Estado del hidrograma (QA) — objeto con flags para el panel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2198:const qaStatus = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2234:  const factorCFS2M3S   = 0.028316846592;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2235:  // Política: 'auto' | 'force' | 'off'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2236:  const SNYDER_POLICY   = 'auto';
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2237:  // Umbral para 'auto' (ratio Qp(Snyder)/max(Qp otros))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2238:  const SNYDER_THRESHOLD = 12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2239:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2240:  const hidrosCorr = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2241:    const arr = (hidros ?? []).map(h => ({ ...h }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2242:    const idxSny = arr.findIndex(h => /snyder/i.test(h.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2243:    if (idxSny >= 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2244:      const h = arr[idxSny];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2245:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2246:      const qpSny = (h.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2247:      const qpOtros = Math.max(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2248:        ...arr.filter((_,i)=> i !== idxSny).map(o =>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2249:          (o.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2250:        ),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2251:        1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2252:      );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2253:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2254:      let needConvert = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2255:      if (SNYDER_POLICY === 'force')       needConvert = true;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2256:      else if (SNYDER_POLICY === 'auto')   needConvert = (qpSny > qpOtros * SNYDER_THRESHOLD);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2257:      // 'off' → no convierte
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2258:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2259:      if (needConvert) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2260:        h.qSeries = (h.qSeries ?? []).map(p => ({ ...p, Q: p.Q * factorCFS2M3S }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2261:        h.metodo  = `${h.metodo} (SI)`; // trazabilidad en la leyenda
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2262:        if (import.meta.env.DEV) console.warn('[FIX] Snyder convertido cfs→m³/s', { qpSny, qpOtros, ratio: qpSny/qpOtros });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2263:      } else if (import.meta.env.DEV) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2264:        console.log('[INFO] Snyder sin conversión', { qpSny, qpOtros, ratio: qpSny/qpOtros });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2265:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2266:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2267:    return arr;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2268:  }, [hidros]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2269:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2270:  /* ──────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2271:     Selección ROBUSTA de Williams & Hann (W&H) + fallback a series
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2281:    return whAliases.some(a => t.includes(a));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2282:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2283:  let rWH = (resumenQ ?? []).find(r => matchWH(r.nombre ?? r.metodo)) || {};
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2284:  if (!rWH.Qpico || !rWH.tpico) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2285:    const wh = (hidrosCorr ?? []).find(h => matchWH(h.metodo)); // ← usa corregidas
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2286:    if (wh?.qSeries?.length) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2287:      const pico = wh.qSeries.reduce((m, p) => (p.Q > m.Q ? p : m), { Q: 0, t: 0 });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2288:      rWH = { ...(rWH ?? {}), Qpico: rWH.Qpico ?? pico.Q, tpico: rWH.tpico ?? pico.t, nombre: rWH.nombre ?? wh.metodo };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2289:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2290:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2291:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2292:  // ── Totales de Pe
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2293:  const lePe = useMemo(() => lluvEfect.reduce((s, r) => s + (r.PeIncrem || 0), 0), [lluvEfect]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2294:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2295:  // ───────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2297:  // ───────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2298:  const seriesOK = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2299:    return (hidrosCorr ?? []).filter(h =>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2300:      Array.isArray(h?.qSeries) && h.qSeries.length > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2301:    );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2302:  }, [hidrosCorr]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2303:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2304:  const n = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2305:    const lens = seriesOK.map(h => h.qSeries.length);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2306:    return lens.length ? Math.max(...lens) : 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2307:  }, [seriesOK]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2308:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2309:  const step = useMemo(() => (n <= 0 ? 1 : Math.max(1, Math.floor(n / 100))), [n]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2310:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2311:  const combined = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2312:    if (n <= 0) return [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2315:      const idx = i * step;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2316:      const obj = { t: +((idx * dtMin) || 0).toFixed(1) };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2317:      seriesOK.forEach(h => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2318:        obj[h.metodo] = h.qSeries[idx]?.Q ?? 0; // clave = nombre del método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2319:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2320:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2321:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2322:    return out;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2323:  }, [seriesOK, n, step, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2324:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2325:  const noData = combined.length === 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2327:  // (Opcional) diagnóstico de series en consola
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2328:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2329:    if (!import.meta.env.DEV) return;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2330:    console.log('[DEBUG] seriesOK:', seriesOK.map(h => ({ metodo: h.metodo, len: h.qSeries?.length })));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2331:    console.log('[DEBUG] combined len:', combined.length, 'n=', n, 'step=', step);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2332:  }, [seriesOK, combined, n, step]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2333:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2334:  // ── Paleta por método (si no existe arriba en tu archivo)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2335:  const methodColors = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2336:    'SCS':              '#4ECDC4',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2337:    'SCS Mod.':         '#94D82D',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2359:          {'  |  '} % Imperv: {params.porcentajeImpermeable ?? 60}%
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2360:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2361:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2362:        {/* Mini‑resumen W&H (Qpico/tpico) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2363:        <div style={{ marginTop:8, display:'flex', gap:12, flexWrap:'wrap', fontFamily: mono, fontSize: 12, color: C.muted2 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2364:          <span style={{color:C.accent3}}>{rWH.nombre ?? 'W&H'}</span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2365:          <span>Qp = <b style={{color:C.text}}>{(rWH.Qpico ?? 0).toFixed(2)}</b> m³/s</span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2366:          <span>tp = <b style={{color:C.text}}>{(rWH.tpico ?? 0).toFixed(0)}</b> min</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2367:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2368:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2369:      
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2370:      {/* Panel QA - Estado hidrológico efectivo */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2371:      <div className="flex flex-wrap gap-4 p-3 mb-2 bg-slate-900 text-white rounded-md text-sm font-mono">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2372:       <div className={qaStatus.tcWarning ? "text-yellow-400" : "text-green-400"}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2373:         Tc operativo Hidrogramas: {tc_min.toFixed(1)} min
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2484:    return calcHUSCS(params.area,tc_h,dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2485:  },[metodoPost,params,tc_h,dtMin,cnIII_post]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2486:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2487:  const qPost=useMemo(()=>calcHidroCompleto(lluvPost,huPost,dtMin),[lluvPost,huPost,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2488:  const huPre=useMemo(()=>calcHUSCS(params.area,tc_h,dtMin),[params.area,tc_h,dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2489:  const qPre =useMemo(()=>calcHidroCompleto(lluvPre,huPre,dtMin),[lluvPre,huPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2490:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2491:  const volSAR=useMemo(()=>calcVolSAR(qPost.qSeries,qPre.qSeries,dtMin),[qPost,qPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2492:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2493:  const step=Math.max(1,Math.floor(volSAR.excesos.length/120));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2494:  const dispData=volSAR.excesos.filter((_,i)=>i%step===0).slice(0,140);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2495:  const reduccion=qPost.Qpico>0?(100*(qPost.Qpico-qPre.Qpico)/qPost.Qpico).toFixed(1):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2496:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2497:  const exportDatos={
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2498:    nombre_cuenca:params.nombre_cuenca,area:params.area,perimetro:params.perimetro,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2499:    longitud_cauce:params.longitud_cauce,pendiente_cuenca:params.pendiente_cuenca,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2500:    cota_max:params.cota_max,cota_min:params.cota_min,CN:params.CN,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2501:    tc_h,stn:name,Tr,dur_h:durH,distType,dt_min:dtMin,Ptotal:hiet.Ptotal,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2502:    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2503:    hiet,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2504:    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2505:    volSAR,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2506:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2507:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2508:  return(<div style={{display:"flex",flexDirection:"column",gap:14}} ref={reportRef}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2509:    {/* Banner normativo */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2510:    <div style={{background:`linear-gradient(135deg,${C.accent2}0A,${C.accent4}08)`,border:`1px solid ${C.accent2}25`,borderRadius:12,padding:"12px 18px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2511:      <div style={{flexShrink:0}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2556:      <Kpi value={hiet.Ptotal+" mm"} label="P total diseño" accent={C.accent} sub={`Tr=${Tr}a, d=${durH}h`}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2557:      <Kpi value={cnIII_post.toFixed(1)} label="CN post (CNIII)" accent={C.rose} sub={`SI=${siPct}%`}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2558:      <Kpi value={cnIII_pre.toFixed(1)} label="CN pre (CNIII)" accent={C.accent2} sub="Pastizales pobres"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2559:      <Kpi value={qPost.Qpico.toFixed(4)+" m³/s"} label={`Q pico POST (${metodoPost})`} accent={C.accent3}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2560:      <Kpi value={qPre.Qpico.toFixed(4)+" m³/s"} label="Q pico PRE (SCS)" accent={C.accent2}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2561:      <Kpi value={reduccion+"%"} label="Reducción pico" accent={C.gold}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2562:      <Kpi value={volSAR.volTotal.toFixed(0)+" m³"} label="V almacenamiento" accent={C.accent4}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2563:      <Kpi value={catSAR} label="Categoría SAR" accent={C.teal} sub={`Borde libre ${catSAR==="Menores"?">0.10m":catSAR==="Intermedios"?">0.25m":">0.50m"}`}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2564:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2565:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2566:    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2567:      {/* Hietograma de diseño */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2568:      <Card title={`Hietograma SAR — ${distType} · Tr=${Tr}a · d=${durH}h`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2569:        <ResponsiveContainer width="100%" height={230}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2599:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2600:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2601:    {/* Hidrogramas POST vs PRE */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2602:    <Card title={`Hidrogramas SAR — POST (${metodoPost}, CN=${cnIII_post}) vs PRE (SCS, CN=${cnIII_pre}) · V_SAR=${volSAR.volTotal.toFixed(0)} m³`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2603:      <ResponsiveContainer width="100%" height={290}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2604:        <AreaChart data={dispData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2605:          <defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2606:            <linearGradient id="gPost" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent3} stopOpacity={0.35}/><stop offset="95%" stopColor={C.accent3} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2607:            <linearGradient id="gPre"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent2} stopOpacity={0.25}/><stop offset="95%" stopColor={C.accent2} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2608:            <linearGradient id="gVol"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold}    stopOpacity={0.20}/><stop offset="95%" stopColor={C.gold}    stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2609:          </defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2613:          <YAxis yAxisId="v" orientation="right" tick={{fill:C.muted,fontSize:9}} label={{value:"V acum (m³)",angle:90,position:"insideRight",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2614:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[nm.includes("Vol")?v.toFixed(0)+" m³":v.toFixed(5)+" m³/s",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2615:          <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2616:          <Area yAxisId="q" type="monotone" dataKey="Qpost" stroke={C.accent3} fill="url(#gPost)" strokeWidth={2.5} name={`Q post (${metodoPost})`} dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2617:          <Area yAxisId="q" type="monotone" dataKey="Qpre"  stroke={C.accent2} fill="url(#gPre)"  strokeWidth={2.5} name="Q pre (SCS)" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2618:          <Area yAxisId="v" type="monotone" dataKey="volAcum" stroke={C.gold} fill="url(#gVol)" strokeWidth={1.5} name="Vol. SAR acum. (m³)" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2619:        </AreaChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2620:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2621:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2622:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2623:    {/* CN y clasificación */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2624:    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2645:          ["Duración lluvia",`${durH} h`],["Distribución",distType.replace("_"," ")],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2646:          ["P total diseño",`${hiet.Ptotal} mm`],["Método HU POST",metodoPost],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2647:          ["CN post (CNIII)",`${cnIII_post} (SI=${siPct}%)`],["CN pre (CNIII)","93.5"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2648:          ["Q pico POST",`${qPost.Qpico.toFixed(4)} m³/s`],["Q pico PRE (reg.)",`${qPre.Qpico.toFixed(4)} m³/s`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2649:          ["Reducción pico",`${reduccion}%`],["V almacenamiento",`${volSAR.volTotal.toFixed(0)} m³`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2650:        ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2651:          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.border}15`,fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2652:            <span style={{color:C.muted}}>{l}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2653:            <span style={{color:C.text,fontWeight:600}}>{v}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2654:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2655:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2656:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2662:        rows={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/36))===0).map((r,idx)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2663:          const rPost=lluvPost[idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPost[lluvPost.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2664:          const rPre =lluvPre [idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPre [lluvPre.length-1];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2665:          return{t:r.t,T:r.tPct,P:r.pAcum,dP:r.pIncrem,i:r.iBloque,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2666:            PePost:rPost?.Pe||0,PePre:rPre?.Pe||0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2667:        })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2668:        hiCols={[3,4]} accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2669:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2670:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2671:    {/* Nota técnica */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2672:    <div style={{background:`${C.teal}08`,border:`1px solid ${C.teal}20`,borderRadius:10,padding:"11px 15px",fontFamily:mono,fontSize:9,color:C.muted,lineHeight:1.7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2673:      <span style={{color:C.teal,fontWeight:700}}>Notas metodológicas GT-AS-004: </span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2674:      § 3.4 Pérdidas: Método SCS-CN · Condición humedad AMC III · §3.5 HU SCS: lag time=60%·Tc · §3.8 Volumen excedente=∫(Qpost−Qpre)dt · §3.9 Caudal regulado=Qpico(pre) · Distribución temporal: Primer Cuartil (Gallego et al., 2024) · Curvas Huff: Distribuciones Illinois-ISWS (probabilidad 50%)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2675:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2676:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2677:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2678:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2679:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2680:// MÓDULO MÉTODO RACIONAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2681:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2883:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2884:function ModInfluencia({params}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2885:  const[method,setMethod]=useState("compuesto");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2886:  const[potIDW,setPotIDW]=useState(2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2887:  const[selIdx,setSelIdx]=useState(0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2888:  const[excl,setExcl]=useState(new Set());
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2889:  const[Tr,setTr]=useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2890:  const[dMin,setDMin]=useState(30);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2891:  const[showLabels,setShowLabels]=useState(true);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2892:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2893:  // Punto de salida → fuente única de verdad para selección de estaciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2948:        <BtnGroup options={[{v:"compuesto",l:"Compuesto"},{v:"idw",l:"IDW"},{v:"thiessen",l:"Thiessen"},{v:"alt",l:"Altitudinal"}]} value={method} onChange={setMethod} accent={C.teal}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2949:        {method==="idw"&&<div style={{marginTop:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2950:          <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:2}}>Potencia IDW (p = {potIDW})</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2951:          <input type="range" min={1} max={4} step={0.5} value={potIDW} onChange={e=>setPotIDW(+e.target.value)} style={{width:"100%",accentColor:C.teal}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2952:        </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2953:        {method==="compuesto"&&<div style={{marginTop:7,fontSize:8,color:C.muted,fontFamily:mono,lineHeight:1.7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2954:          Dist 40% · Alt 25%<br/>I obs 20% · Red 15%
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2955:        </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2956:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2957:      <Card title="Parámetros IDF" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2958:        <div style={{marginBottom:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3148:  const consultarAPI=useCallback(async()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3149:    setApiStatus("loading");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3150:    try{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3151:      const r=await fetch("https://repopruebas.siata.gov.co/datos_siata/application/index.php/estaciones/getEstaciones",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3152:        {signal:AbortSignal.timeout(7000)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3153:      setApiStatus(r.ok?"ok":"error");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3154:    }catch(err){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3155:      setApiStatus(err.name==="TimeoutError"?"timeout":"cors");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3156:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3157:  },[]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3158:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3191:    <div style={{background:`${C.accent3}07`,border:`1px solid ${C.accent3}22`,borderRadius:10,padding:"10px 16px",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3192:      <div style={{flex:1,minWidth:200}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3193:        <div style={{fontSize:8,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>Repositorio de pruebas SIATA</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3194:        <div style={{fontSize:11,fontWeight:700,color:C.accent3,fontFamily:mono}}>https://repopruebas.siata.gov.co/</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3195:        <div style={{fontSize:8,color:C.muted2,fontFamily:mono,marginTop:2}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3196:          /datos_siata/application/index.php/estaciones/getEstaciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3197:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3198:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3199:      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3200:        <div style={{padding:"4px 10px",borderRadius:6,background:asc.bg,border:`1px solid ${asc.col}30`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3201:          fontSize:9,fontFamily:mono,color:asc.col,fontWeight:600}}>{asc.label}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3508:// Setter unificado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3509:const setTab = setTabExterno ?? setTabInterno;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3510:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3511:  const [params, setParams] = useState(() => getCuencaById(CUENCA_DEFAULT_ID));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3512:  const [stn, setStn] = useState("SAN CRISTOBAL");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3513:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3514:  const [trStateGlobal, setTrStateGlobal] = useState(getTrState());
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3515:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3516:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3517:    const cancelarSuscripcionTr = subscribeTr(setTrStateGlobal);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3518:    return cancelarSuscripcionTr;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3612:      fuente: "pendiente",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3613:      resultados: []
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3614:    },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3615:    hidrogramas_resumen: previo?.hidrogramas_resumen ?? null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3616:    hidrograma_principal: previo?.hidrograma_principal ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3617:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3618:}, [onContextoComparador, params, stn, trStateGlobal?.Tr_activo]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3619:// Publicación base Tc para despertar el Índice Hidrológico global.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3620:// No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3621:useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3622:  const estadoTcActual = getTcState();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3623:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3680:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3681:  // ────────────────── Defaults AMC / %imperv / CNbase (solo si faltan) ──────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3682:useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3683:  setParams(prev => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3684:    const amc  = prev?.amcActual ?? "II"; // I | II | III
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3685:    const pct  = Number.isFinite(prev?.porcentajeImpermeable) ? prev.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3686:    const base = Number.isFinite(prev?.cnBase) ? prev.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3687:              : (Number.isFinite(prev?.CN) ? prev.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3688:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3689:    // Evita re-render si nada cambia
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3690:    if (prev?.amcActual === amc &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3703:  const refN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="REF").length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3704:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3705:  return(<div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:sans}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3706:    <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}button{font-family:inherit}`}</style>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3707:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3708:    {/* ── HEADER ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3709:    <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:"0 16px",display:"flex",alignItems:"center",gap:8,height:52,position:"sticky",top:0,zIndex:200}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3710:      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3711:        <div style={{width:28,height:28,borderRadius:7,background:`linear-gradient(135deg,${C.accent},${C.accent4})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.bg}}>H</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3712:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3713:          <div style={{fontSize:11,fontWeight:800,letterSpacing:"-0.03em",color:C.text}}>HidroFlow</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3749:          <p style={{fontSize:8.5,color:C.muted,marginTop:1,fontFamily:mono}}>{TABS.find(t=>t.id===tab)?.desc}</p>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3750:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3751:      </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3752:      {tab==="params"     &&<ModParams     params={params} setParams={setParams}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3753:      {tab==="idf"        &&<ModIDF        est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3754:      {tab === "hiet" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3755:        <ModHietogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3756:          est={est}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3757:          name={stn}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3758:          params={params}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3759:          setParams={setParams}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3760:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3761:      )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3762:      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={name} onContextoComparador={onContextoComparador} />}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3763:      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn} onContextoComparador={onContextoComparador}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3764:      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3765:      {tab === "Influencia" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3766:        <div style={{
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:581:    : Array.isArray(bruto?.metodos)
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:614:    Qp: extraerNumero(match, ["Qp", "qp", "Qpico", "qPico", "q_pico", "caudalPico", "caudal_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:615:    Tp: extraerNumero(match, ["Tp", "tp", "tPico", "TPico", "t_pico", "tiempoPico", "tiempo_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:616:    volumen: extraerNumero(match, ["volumen", "V", "vol", "volume", "volTotal", "vol_total", "volumenTotal"]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:617:    disponible: true,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:618:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:619:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:620:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:621:  const obtenerAuditoriaPendienteMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:622:    if (metodo.tipo !== "tc") return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:623:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:655:                <th style={estilos.th}>Salida</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:656:                <th style={estilos.th}>Tc calculado (min)</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:657:                <th style={estilos.th}>Pendiente auditada</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:658:                <th style={estilos.th}>Qp</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:659:                <th style={estilos.th}>Tp</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:660:                <th style={estilos.th}>Volumen</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:661:                <th style={estilos.th}>Observación técnica</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:662:              </tr>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:663:            </thead>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:664:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:665:            <tbody>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:666:              {datos.map((metodo) => (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:667:                <tr key={metodo.id}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:748:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:749:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:750:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:751:    if (!Number.isFinite(resultadoQ.Qp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:752:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:753:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:754:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:755:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:756:      <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:757:        {resultadoQ.Qp.toFixed(2)} m³/s
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:758:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:759:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:760:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:761:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:762:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:763:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:764:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:768:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:769:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:770:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:771:    if (!Number.isFinite(resultadoQ.Tp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:772:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:773:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:774:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:775:    const tcReferencia = Number(Tc_final);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:776:    const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:777:      Number.isFinite(tcReferencia) && tcReferencia > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:778:        ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:779:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:780:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:781:    const alertaTcTp =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:782:      tpRel !== null && (tpRel < 0.5 || tpRel > 1.5);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:783:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:784:    const estadoTemporal =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:785:      tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:786:        ? "sin referencia temporal"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:787:        : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:788:        ? "respuesta rápida"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:789:        : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:790:        ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:791:        : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:792:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:793:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:794:      <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:795:        <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:796:          {resultadoQ.Tp.toFixed(2)} min
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:797:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:798:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:799:          Tp/Tc: {tpRel !== null ? tpRel.toFixed(2) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? (resultadoQ.volumen / resultadoQ.Qp / 60).toFixed(0) + " min" : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:800:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:801:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:802:          Estado temporal: {estadoTemporal}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:803:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:804:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:805:          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:806:            ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:807:            : metodo.nombre?.includes("SCS Mod")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:808:            ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:809:            : metodo.nombre?.includes("Snyder")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:810:            ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:811:            : metodo.nombre?.includes("Williams")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:812:            ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:813:            : metodo.nombre?.includes("Clark")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:814:            ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:815:            : `método comparativo; ${estadoTemporal}.`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:816:        </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:817:        {alertaTcTp ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:818:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:819:            ⚠ Alerta Tc/Tp
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:820:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:821:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:822:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:823:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:824:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:825:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:826:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:832:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:833:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:834:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:835:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:836:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:837:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:838:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:839:    const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:840:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:841:    const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:842:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:843:        ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:844:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:845:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:846:    const relacionVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:847:      volumenEsperadoM3 && volumenEsperadoM3 > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:848:        ? resultadoQ.volumen / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:849:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:850:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:851:    const estadoEscalaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:852:      relacionVolumen === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:853:        ? null
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:854:        : relacionVolumen <= 2
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:855:        ? "escala razonable"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:856:        : relacionVolumen <= 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:857:        ? "revisar escala"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:858:        : "fuera de escala";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:859:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:860:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:861:      <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:862:        <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:863:          {resultadoQ.volumen.toFixed(2)}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:864:        </span>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:865:        {estadoEscalaVolumen ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:866:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:867:            {estadoEscalaVolumen} · {relacionVolumen.toFixed(1)}x
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:868:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:869:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:870:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:871:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:872:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:873:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:874:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1235:      </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1236:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1237:      <div style={estilos.nota}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1238:  <strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1239:  HidroFlow a partir de los hidrogramas calculados. El comparador no recalcula
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1240:  hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1241:  automáticamente ningún método. La adopción final requiere criterio técnico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1242:  competencia hidrológica y trazabilidad explícita.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1243:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1244:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1245:<div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1254:    lineHeight: 1.5,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1255:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1256:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1257:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1258:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1259:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1260:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1261:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1262:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1263:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1264:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1265:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1266:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1267:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1268:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1269:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1270:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1271:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1272:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1273:          const textoResumenQ5 = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1274:            "# Resumen técnico Q-5 post auditoría",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1275:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1279:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1280:            "- SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1281:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1282:            "- Masa y volumen: controlados frente a la referencia física.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1283:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1285:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1286:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1287:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1288:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1289:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1290:            "- No se recalculan hidrogramas.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1291:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1292:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1293:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1294:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1295:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1296:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1297:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1298:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1337:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1338:          const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1339:          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1340:          const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1341:            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1342:              ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1343:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1344:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1345:          const formatearNumeroExpediente = (valor, decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1346:            if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1347:              return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1359:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1360:          const obtenerEstadoTemporalExpediente = (resultadoQ) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1361:            const tcReferencia = Number(Tc_final);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1362:            const tpRel =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1363:              Number.isFinite(resultadoQ?.Tp) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1364:              Number.isFinite(tcReferencia) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1365:              tcReferencia > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1366:                ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1367:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1368:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1369:            return tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1370:              ? "sin referencia temporal"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1371:              : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1372:              ? "respuesta rápida"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1373:              : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1374:              ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1375:              : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1376:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1377:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1378:          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1379:            metodo.nombre?.includes("SCS Unit")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1380:              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1381:              : metodo.nombre?.includes("SCS Mod")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1382:              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1383:              : metodo.nombre?.includes("Snyder")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1384:              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1385:              : metodo.nombre?.includes("Williams")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1386:              ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1387:              : metodo.nombre?.includes("Clark")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1388:              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1389:              : `método comparativo; ${estadoTemporal}.`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1390:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1391:          const metodosQ5Expediente = metodos.filter(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1392:            (metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1393:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1394:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1395:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1412:              dictamenMetodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413:              obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1414:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1416:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1417:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1419:            .map((metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1420:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1421:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1422:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1438:                "Método Q-5";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1439:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1440:              const resultadoQ = {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1441:                Qp:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1442:                  h?.Qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1443:                  h?.qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1444:                  h?.Qpico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1445:                  h?.qPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1446:                  h?.q_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1447:                  h?.caudalPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1448:                  h?.caudal_pico,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1449:                Tp:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1450:                  h?.Tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1451:                  h?.tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1452:                  h?.tPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1453:                  h?.TPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1454:                  h?.t_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1455:                  h?.tiempoPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1456:                  h?.tiempo_pico,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1457:                volumen:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1458:                  h?.volumen ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1459:                  h?.V ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:                  h?.vol ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:                  h?.volume ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:                  h?.volTotal ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:                  h?.vol_total ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:                  h?.volumenTotal
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:          const filasQ5Markdown =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1474:              : filasQ5DesdeContexto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:          const tablaQ5Markdown = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1478:            "|---|---:|---:|---:|---|---|",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479:            ...filasQ5Markdown
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1480:          ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:          const estacionIdfExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1482:            contextoBase?.estacion_idf,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:            contextoBase?.estacionIDF,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:            contextoBase?.estacion,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1502:            faltantesExpediente.push("Lluvia efectiva total");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1503:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1504:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1505:          if (!Number.isFinite(volumenEsperadoM3)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1506:            faltantesExpediente.push("Volumen esperado");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1507:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1508:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1509:          if (!Array.isArray(filasQ5Markdown) || filasQ5Markdown.length === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1510:            faltantesExpediente.push("Tabla Q-5 auditada con filas reales");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1511:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1512:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1513:          if (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1562:            "- Lag / forma SCS: parámetro derivado para forma temporal.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1563:            "- Tc comparador: referencia especializada para coherencia Q-5.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1564:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1565:            "## 4. Volumen de referencia",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1566:            `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1567:            `Volumen esperado: ${volumenEsperadoM3 ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1568:            "Fórmula: Pe(mm) × Área(km²) × 1000.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1569:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1570:            "## 5. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1571:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1572:            "SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1573:            "SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1574:            "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:            "Masa y volumen: controlados frente a referencia física.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576:            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1577:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1578:            "Tabla Q-5 auditada:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:            ...tablaQ5Markdown,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:            "## 6. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:            "Uso: contraste global independiente de caudal pico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:            "## 7. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1611:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1612:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1613:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1614:            "## 8. Restricciones técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1615:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1616:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1617:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:            "- No se recalculan hidrogramas en este expediente.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1619:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1620:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1662:      {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663:        const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1664:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665:        const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:            ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1682:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1683:        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1684:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1685:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1686:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1687:        ⚠ Control de magnitud pendiente: Qp, Tp y Volumen se muestran como resultados no adoptivos hasta validar unidades, integración y escala hidrológica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1688:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1689:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1690:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1691:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1693:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1694:


## 6. Consumo en Comparador y Expediente


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1:import React, { useEffect, useMemo, useState } from "react";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:3:import { setTcState } from "../agents/tcAgent";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:4:import { calcTc, mapTcResultados } from "../services/hidroEngine";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:5:import { seleccionarTc } from "../services/tcSelector";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:6:import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:  resumenComparadorCatalogo,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:10:} from "../data/metodosComparadorCatalogo";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:11:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:12:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:13:  evaluarCompetenciaComparador,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:14:} from "../data/matrizCompetenciaComparador";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:16:import { conceptuarCuenca } from "../data/clasificacionCuenca";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:17:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:18:import {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:19:  obtenerAuditoriaPendienteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:20:  obtenerCriterioPendientesAuditoria,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:21:} from "../data/auditoriaPendientesTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:22:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:23:export default function ComparadorMultiMetodo({ contexto = null }) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:24:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:25:  const [filtroEstado, setFiltroEstado] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:26:  const [filtroTipo, setFiltroTipo] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:27:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:28:  // ✅ CONTEXTO BASE
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:29:const contextoBase = contexto || {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:49:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:50:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:51:// ✅ EJECUTAR MOTOR
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:52:const tcArray = calcTc(p);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:53:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:54:// ✅ MAPEAR RESULTADOS
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:55:const metodosTc = mapTcResultados(tcArray);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:56:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:57:// ✅ CONTEXTO HIDROLÓGICO
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:58:const contextoTc = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:59:  pendiente: contextoBase.pendiente_media_pct,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:60:  area: contextoBase.area_km2,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:61:  CN: contextoBase.CN,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:62:  urbanizacion: 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:63:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:64:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:65:const evaluacionCompetencia = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:66:  return evaluarCompetenciaComparador(contextoBase);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:70:  return conceptuarCuenca(contextoBase);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:71:}, [contextoBase]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:72:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:73:// ✅ Tc FINAL
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:74:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:75:const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:76:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:77:const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:78:  metodosTc,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:79:  evaluacionCompetencia?.tc
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:80:);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:81:// ✅ Publicar Tc en el agente DESPUÉS del render
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:82:useEffect(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83:  if (Tc_final !== null && Tc_final !== undefined) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:84:    setTcState({
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:85:      Tc_final,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:86:      metodosTc,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:87:      contextoTc,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:88:      metodosTcCompetentes,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:89:      rangoCompetenteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:90:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:91:  }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:92:}, [Tc_final]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:93:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:94:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:95:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:96:  // ✅ Y SOLO AQUÍ VA EL RETURN
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:97: // ✅ BLOQUE CONSISTENTE DE MÉTODOS
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:98:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:99:const metodos = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:100:  if (!evaluacionCompetencia) return [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:101:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:102:  const base = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:103:    ...evaluacionCompetencia.tc.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:104:      ...m,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:105:      bloque: "Tc-15"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:106:    })),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:107:    ...evaluacionCompetencia.q.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:108:      ...m,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:109:      bloque: "Q-5"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:110:    }))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:111:  ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:112:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:113:  return base.filter(m => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:127:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:128:const conteo = useMemo(() => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:129:  total: metodos.length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:130:  tc: metodos.filter(m => m.tipo === "tc").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:131:  q: metodos.filter(m => m.tipo === "q").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:132:  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:133:  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:134:}), [metodos]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:135:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:136:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:137:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:138:  const estilos = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:471:    ));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:472:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:473:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:474:  const obtenerTcMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:475:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:476:    String(valor ?? "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:477:      .toLowerCase()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:478:      .normalize("NFD")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:479:      .replace(/[\u0300-\u036f]/g, "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:480:      .replace(/[^a-z0-9]/g, "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:481:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:482:  const extraerNumero = (valor) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:484:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:485:    if (valor && typeof valor === "object") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:486:      return (
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:487:        Number(valor.tc) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:488:        Number(valor.tc_min) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:489:        Number(valor.Tc) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:490:        Number(valor.TC) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:491:        Number(valor.valor) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:492:        Number(valor.resultado) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:493:        Number(valor.r) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:494:        Number(valor.value) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:495:        Number(valor.min) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:496:        null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:497:      );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:498:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:500:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:501:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:502:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:503:  const bruto = contextoBase?.tc_metodos;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:504:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:505:  if (!bruto) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:506:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:507:  let candidatos = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:508:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:509:  if (Array.isArray(bruto)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:510:    candidatos = bruto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:511:  } else if (Array.isArray(bruto?.metodos)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:523:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:524:  const nombreCatalogo = normalizarTexto(metodo.nombre);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:525:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:526:  const match = candidatos.find((m) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:527:    const nombreDato = normalizarTexto(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:528:      m?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:529:        m?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:530:        m?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:531:        m?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:532:        m?.m ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:533:        m?.id ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:534:        m?.clave
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:540:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:541:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:542:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:543:  if (!match) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:544:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:545:  return extraerNumero(match);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:546:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:547:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:548:const obtenerResultadoQMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:549:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:550:    String(valor ?? "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:551:      .toLowerCase()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:552:      .normalize("NFD")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:553:      .replace(/[\u0300-\u036f]/g, "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:565:    return null;
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:581:    : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:582:    ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:586:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:587:  const nombreCatalogo = normalizarTexto(metodo.nombre);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:588:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:589:  const match = candidatos.find((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:590:    const nombreDato = normalizarTexto(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:591:      h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:592:        h?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:593:        h?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:594:        h?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:595:        h?.id
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:596:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:597:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:601:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:602:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:603:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:604:  if (!match) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:605:    return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:606:      Qp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:607:      Tp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:608:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:609:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:610:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:611:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:612:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:613:  return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:614:    Qp: extraerNumero(match, ["Qp", "qp", "Qpico", "qPico", "q_pico", "caudalPico", "caudal_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:615:    Tp: extraerNumero(match, ["Tp", "tp", "tPico", "TPico", "t_pico", "tiempoPico", "tiempo_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:616:    volumen: extraerNumero(match, ["volumen", "V", "vol", "volume", "volTotal", "vol_total", "volumenTotal"]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:617:    disponible: true,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:618:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:619:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:620:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:621:  const obtenerAuditoriaPendienteMetodo = (metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:622:    if (metodo.tipo !== "tc") return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:623:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:624:    return obtenerAuditoriaPendienteTc(metodo.id);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:625:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:626:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:627:  const renderVariablesSalida = (variablesSalida = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:628:    if (!Array.isArray(variablesSalida) || variablesSalida.length === 0) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:629:      return <span style={estilos.chip}>Tc / Tr</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:630:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:631:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:632:    return variablesSalida.map((item) => (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:633:      <span key={item} style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:634:        {item}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:635:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:636:    ));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:637:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:653:                <th style={estilos.th}>Escala</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:654:                <th style={estilos.th}>Requiere</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:655:                <th style={estilos.th}>Salida</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:656:                <th style={estilos.th}>Tc calculado (min)</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:657:                <th style={estilos.th}>Pendiente auditada</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:658:                <th style={estilos.th}>Qp</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:659:                <th style={estilos.th}>Tp</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:660:                <th style={estilos.th}>Volumen</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:661:                <th style={estilos.th}>Observación técnica</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:662:              </tr>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:663:            </thead>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:664:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:665:            <tbody>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:666:              {datos.map((metodo) => (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:667:                <tr key={metodo.id}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:668:                  <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:697:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:698:                  <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:699:                    {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:700:                      const tcValor = obtenerTcMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:701:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:702:                      if (!Number.isFinite(tcValor)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:703:                        return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:704:                    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:705:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:706:                      return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:707:                        <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:708:                          {tcValor.toFixed(2)} min
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:709:                        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:710:                      );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:711:                    })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:712:                 </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:713:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:714:                 <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:715:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:716:    const auditoriaPendiente = obtenerAuditoriaPendienteMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:748:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:749:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:750:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:751:    if (!Number.isFinite(resultadoQ.Qp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:752:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:753:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:754:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:755:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:756:      <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:757:        {resultadoQ.Qp.toFixed(2)} m³/s
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:758:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:759:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:760:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:761:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:762:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:763:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:764:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:765:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:768:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:769:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:770:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:771:    if (!Number.isFinite(resultadoQ.Tp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:772:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:773:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:774:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:775:    const tcReferencia = Number(Tc_final);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:776:    const tpRel =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:777:      Number.isFinite(tcReferencia) && tcReferencia > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:778:        ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:779:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:780:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:781:    const alertaTcTp =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:782:      tpRel !== null && (tpRel < 0.5 || tpRel > 1.5);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:783:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:784:    const estadoTemporal =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:785:      tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:786:        ? "sin referencia temporal"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:787:        : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:788:        ? "respuesta rápida"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:789:        : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:790:        ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:791:        : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:792:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:793:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:794:      <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:795:        <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:796:          {resultadoQ.Tp.toFixed(2)} min
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:797:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:798:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:799:          Tp/Tc: {tpRel !== null ? tpRel.toFixed(2) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? (resultadoQ.volumen / resultadoQ.Qp / 60).toFixed(0) + " min" : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:800:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:801:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:802:          Estado temporal: {estadoTemporal}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:803:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:804:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:805:          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:806:            ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:807:            : metodo.nombre?.includes("SCS Mod")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:808:            ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:809:            : metodo.nombre?.includes("Snyder")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:810:            ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:811:            : metodo.nombre?.includes("Williams")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:812:            ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:813:            : metodo.nombre?.includes("Clark")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:814:            ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:815:            : `método comparativo; ${estadoTemporal}.`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:816:        </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:817:        {alertaTcTp ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:818:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:819:            ⚠ Alerta Tc/Tp
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:820:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:821:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:822:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:823:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:824:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:825:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:826:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:827:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:832:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:833:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:834:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:835:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:836:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:837:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:838:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:839:    const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:840:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:841:    const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:842:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:843:        ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:844:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:845:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:846:    const relacionVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:847:      volumenEsperadoM3 && volumenEsperadoM3 > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:848:        ? resultadoQ.volumen / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:849:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:850:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:851:    const estadoEscalaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:852:      relacionVolumen === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:853:        ? null
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:854:        : relacionVolumen <= 2
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:855:        ? "escala razonable"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:856:        : relacionVolumen <= 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:857:        ? "revisar escala"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:858:        : "fuera de escala";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:859:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:860:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:861:      <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:862:        <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:863:          {resultadoQ.volumen.toFixed(2)}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:864:        </span>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:865:        {estadoEscalaVolumen ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:866:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:867:            {estadoEscalaVolumen} · {relacionVolumen.toFixed(1)}x
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:868:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:869:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:870:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:871:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:872:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:873:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:874:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:875:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1119:          </h1>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1120:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1121:          <p style={estilos.subtitulo}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1122:            Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1123:            tiempos de respuesta, caudales pico e hidrogramas. Este módulo no
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1124:            adopta automáticamente resultados; organiza sensibilidad, competencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1125:            y trazabilidad para soporte de expediente técnico.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1126:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1127:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1128:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1129:        <div style={estilos.version}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1130:           {resumenComparadorCatalogo.version} · Fuente: {fuenteContexto}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1131:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1132:      </header>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1133:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1138:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1139:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1140:        <div style={estilos.tarjetaResumen}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1141:          <p style={estilos.numeroResumen}>{conteo.tc}</p>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1142:          <p style={estilos.etiquetaResumen}>Métodos Tc</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1143:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1144:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1145:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1146:          <p style={estilos.numeroResumen}>{conteo.q}</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1147:          <p style={estilos.etiquetaResumen}>Métodos Q</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1148:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1149:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1150:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1188:          style={estiloBotonFiltro(filtroTipo === "todos")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1189:          onClick={() => setFiltroTipo("todos")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1190:        >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1191:          Tc + Q
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1192:        </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1193:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1194:        <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1195:          type="button"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1196:          style={estiloBotonFiltro(filtroTipo === "tc")}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1197:          onClick={() => setFiltroTipo("tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1198:        >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1199:          Solo Tc
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1200:        </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1201:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1202:        <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1203:          type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1204:          style={estiloBotonFiltro(filtroTipo === "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1205:          onClick={() => setFiltroTipo("q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1206:        >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1207:          Solo Q
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1235:      </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1236:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1237:      <div style={estilos.nota}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1238:  <strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1239:  HidroFlow a partir de los hidrogramas calculados. El comparador no recalcula
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1240:  hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1241:  automáticamente ningún método. La adopción final requiere criterio técnico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1242:  competencia hidrológica y trazabilidad explícita.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1243:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1244:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1245:<div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1246:  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1247:    marginTop: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1248:    border: "1px solid rgba(239, 68, 68, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1254:    lineHeight: 1.5,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1255:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1256:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1257:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1258:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1259:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1260:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1261:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1262:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1263:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1264:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1265:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1266:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1267:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1268:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1269:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1270:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1271:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1272:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1273:          const textoResumenQ5 = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1274:            "# Resumen técnico Q-5 post auditoría",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1275:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1276:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1279:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1280:            "- SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1281:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1282:            "- Masa y volumen: controlados frente a la referencia física.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1283:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1285:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1286:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1287:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1288:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1289:            "- No se modifica el motor hidrológico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1290:            "- No se recalculan hidrogramas.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1291:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1292:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1293:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1294:            "Herramienta: HidroFlow.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1295:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1296:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1297:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1298:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1299:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1300:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1301:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1302:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1303:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1304:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1305:          const areaTextoResumen = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1306:          areaTextoResumen.value = textoResumenQ5;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1307:          areaTextoResumen.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1308:          areaTextoResumen.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1309:          areaTextoResumen.style.left = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1310:          areaTextoResumen.style.top = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1316:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1317:          try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1318:            resumenCopiado = document.execCommand("copy");
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1319:          } catch {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1320:            resumenCopiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1321:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1322:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1323:          document.body.removeChild(areaTextoResumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1324:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1325:          if (resumenCopiado) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1326:            window.alert("Resumen técnico Q-5 copiado al portapapeles.");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1327:          } else {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1337:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1338:          const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1339:          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1340:          const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1341:            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1342:              ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1343:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1344:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1345:          const formatearNumeroExpediente = (valor, decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1346:            if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1347:              return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1348:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1349:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1350:            const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1351:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1352:            return Number.isFinite(numero)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1353:              ? numero.toLocaleString("es-CO", {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1357:              : "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1358:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1359:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1360:          const obtenerEstadoTemporalExpediente = (resultadoQ) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1361:            const tcReferencia = Number(Tc_final);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1362:            const tpRel =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1363:              Number.isFinite(resultadoQ?.Tp) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1364:              Number.isFinite(tcReferencia) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1365:              tcReferencia > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1366:                ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1367:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1368:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1369:            return tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1370:              ? "sin referencia temporal"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1371:              : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1372:              ? "respuesta rápida"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1373:              : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1374:              ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1375:              : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1376:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1377:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1378:          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1379:            metodo.nombre?.includes("SCS Unit")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1380:              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1381:              : metodo.nombre?.includes("SCS Mod")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1382:              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1383:              : metodo.nombre?.includes("Snyder")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1384:              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1385:              : metodo.nombre?.includes("Williams")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1386:              ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1387:              : metodo.nombre?.includes("Clark")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1388:              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1389:              : `método comparativo; ${estadoTemporal}.`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1390:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1391:          const metodosQ5Expediente = metodos.filter(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1392:            (metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1393:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1394:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1405:              ? bruto.resultados
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1430:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1431:            .map((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1432:              const nombreMetodo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1433:                h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1438:                "Método Q-5";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1439:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1440:              const resultadoQ = {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1441:                Qp:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1442:                  h?.Qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1443:                  h?.qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1444:                  h?.Qpico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1445:                  h?.qPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1446:                  h?.q_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1447:                  h?.caudalPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1448:                  h?.caudal_pico,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1449:                Tp:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1450:                  h?.Tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1451:                  h?.tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1452:                  h?.tPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1453:                  h?.TPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1454:                  h?.t_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1455:                  h?.tiempoPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1456:                  h?.tiempo_pico,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1457:                volumen:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1458:                  h?.volumen ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1459:                  h?.V ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:                  h?.vol ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:                  h?.volume ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:                  h?.volTotal ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:                  h?.vol_total ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:                  h?.volumenTotal
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:          const filasQ5Markdown =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1472:            filasQ5DesdeCatalogo.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1473:              ? filasQ5DesdeCatalogo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1474:              : filasQ5DesdeContexto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:          const tablaQ5Markdown = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1478:            "|---|---:|---:|---:|---|---|",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479:            ...filasQ5Markdown
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1480:          ];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:          const estacionIdfExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1482:            contextoBase?.estacion_idf,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:            contextoBase?.estacionIDF,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:            contextoBase?.estacion,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1485:            contextoBase?.nombre_estacion,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1486:            contextoBase?.idf?.nombre,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1487:            contextoBase?.idf?.estacion
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1505:          if (!Number.isFinite(volumenEsperadoM3)) {
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1535:            ? Number(contextoBase.tr_diseno_activo)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1536:            : 25;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1537:          const textoExpediente = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1538:            "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1539:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1540:            "## 1. Identificación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1541:            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1542:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1543:            `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1544:            `Estación IDF: ${estacionIdfExpediente}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1545:            `Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1546:            `Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1547:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1548:            "## 2. Parámetros hidrológicos base",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1549:            `CN: ${contextoBase?.CN ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1550:            `CN base: ${contextoBase?.CN_base ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1551:            `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1552:            `AMC: ${contextoBase?.AMC ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1553:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1554:            "## 3. Tiempo de concentración y roles Tc",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1555:            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1558:            "Roles Tc:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1559:            "- Tc global Índice: referencia hidrológica general.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1560:            "- Tc operativo Q(t): ruta interna del hidrograma.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1561:            "- Duración evento: 3 h para almacenamiento/regulación.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1562:            "- Lag / forma SCS: parámetro derivado para forma temporal.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1563:            "- Tc comparador: referencia especializada para coherencia Q-5.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1564:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1565:            "## 4. Volumen de referencia",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1566:            `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1567:            `Volumen esperado: ${volumenEsperadoM3 ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1568:            "Fórmula: Pe(mm) × Área(km²) × 1000.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1569:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1570:            "## 5. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1571:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1572:            "SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1573:            "SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1574:            "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:            "Masa y volumen: controlados frente a referencia física.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576:            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1577:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1578:            "Tabla Q-5 auditada:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:            ...tablaQ5Markdown,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:            "## 6. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:            "Uso: contraste global independiente de caudal pico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1585:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1586:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1588:              ? [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1589:                  `Tc racional exportado: ${
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1590:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1591:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:                  "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:                  "Tabla Método Racional:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:                  "| Tr | I | P | C | Q |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:                  "|---:|---:|---:|---:|---:|",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:                  ...contextoBase.metodo_racional.resultados.map((r) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:                    `| ${r.Tr} | ${formatearNumeroExpediente(r.I)} mm/h | ${formatearNumeroExpediente(r.P)} mm | ${formatearNumeroExpediente(r.C, 4)} | ${formatearNumeroExpediente(r.Q)} m³/s |`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:                  )
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:                ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:              : [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:                  "Disponibilidad: resultados no disponibles en el contexto exportable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:                  "Estado: sección informativa; consultar módulo Método Racional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:                ]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:            "## 7. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1611:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1612:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1613:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1614:            "## 8. Restricciones técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1615:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1616:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1617:            "- No se modifica el motor hidrológico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:            "- No se recalculan hidrogramas en este expediente.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1619:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1620:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:            "Herramienta: HidroFlow.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1641:          areaTexto.select();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1642:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1644:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1645:          try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1646:            copiado = document.execCommand("copy");
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1647:          } catch {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1648:            copiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1649:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1650:
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663:        const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1664:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665:        const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:            ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1682:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1683:        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1684:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1685:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1686:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1687:        ⚠ Control de magnitud pendiente: Qp, Tp y Volumen se muestran como resultados no adoptivos hasta validar unidades, integración y escala hidrológica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1688:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1689:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1690:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1691:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1693:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1694:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1695:


## 7. Valores runtime observados de referencia

```text
Tr activo validado recientemente: 100 años
Método Racional Tr 100: C = 0.6144, Q = 327.67 m3/s
Área cuenca: 46.8516 km2
Pendiente media: 8.43 %
Comparador Q-5 visible con SCS Unit Hydrograph: Qp 184.03 m3/s, Tp 210.00 min, Volumen 2,654,250.90 m3
Volumen esperado de referencia: 2,654,251 m3
```

## 8. Criterio de decisión

Si Tr, Tc, Qp, Tp y Volumen ya están trazados de forma consistente en contexto, Comparador e Índice, OT-0053 no debe tocar motor. Si hay brecha de publicación o lectura, se propondrá cambio mínimo de contexto.

## 9. Estado Git final

?? 00_ADMIN/bitacora/OT-0053/

## 10. Conclusión Senior

La auditoría confirma que la cadena Tr–Tc–Qp–Tp–Volumen existe, pero con roles diferenciados:

```text
1. Tr global activo:
   - Se gestiona desde trAgent.
   - Se actualiza desde IndiceHidrologico.
   - Se publica como tr_diseno_activo en contexto.
   - Ya alimenta correctamente el Método Racional.

2. Tc:
   - Se publica mediante tcAgent.
   - El Comparador calcula Tc_final con seleccionarTc.
   - El Índice consume Tc_final y rangoCompetenteTc cuando están disponibles.

3. Qp, Tp y Volumen:
   - Se calculan desde hidrogramas Q(t).
   - Se publican como hidrogramasQ5Exportables / hidrogramas_resumen.
   - El Comparador los presenta como Bloque Q-5.
   - El Volumen se controla contra referencia física de masa.

4. Alcance actual:
   - Tr global activo es trazable visual/exportable.
   - Qp/Tp/Volumen siguen correspondiendo al bloque Q-5, no a un recálculo automático por Tr activo.
   - Esta separación es aceptable mientras el rótulo Q-5 permanezca explícito.
```

## 11. Decisión

```text
No se modifica motor en OT-0053A.
No se recalculan Qp/Tp/Volumen por Tr activo en esta OT.
No se toca hidroEngine, tcSelector ni fórmulas.
Se conserva la separación técnica: Método Racional responde al Tr global activo; Qp/Tp/Volumen se mantienen como bloque Q-5 explícito.
```

## 12. Radar posterior

```text
Evaluar en una OT posterior si HidroFlow debe incorporar un bloque Q-Tr activo dinámico, separado del bloque Q-5.
Si se implementa, debe hacerse como bloque nuevo o selector explícito, no alterando silenciosamente el significado actual de Q-5.
También queda en radar revisar dependencia de setTcState en ComparadorMultiMetodo para evitar estados Tc parcialmente obsoletos si cambia el contexto Tc sin cambiar Tc_final.
```

