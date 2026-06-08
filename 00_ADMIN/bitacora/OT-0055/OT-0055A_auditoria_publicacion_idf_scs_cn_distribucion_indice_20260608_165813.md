# OT-0055A — Auditoría publicación IDF, SCS-CN y distribución temporal al Índice

Fecha: 06/08/2026 16:58:13
Rama: ot-0055-publicacion-runtime-idf-scs-cn-distribucion-indice

## 1. Propósito

Auditar qué datos IDF, estaciones, distribución temporal y SCS-CN existen en runtime, cuáles se publican al contextoComparador y cuáles consume el Índice Hidrológico.

No se modifica código en esta auditoría.

## 2. Cableado contextoComparador


  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:1:import React, { useState } from "react";
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:2:import IndiceHidrologico from "../components/IndiceHidrologico";
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:3:import HidroFlow from "../HidroFlow";
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:4:import ComparadorMultiMetodo from "../components/ComparadorMultiMetodo";
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:5:
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:6:export default function HidroFlowLayout() {
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:7:  const [tabActiva, setTabActiva] = useState("params");
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:8:  const [contextoComparador, setContextoComparador] = useState(null);
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:9:
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:10:  const estilos = {
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:11:    contenedor: {
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:12:      minHeight: "100vh",
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:13:      width: "100vw",
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:14:      display: "flex",
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:15:      flexDirection: "row",
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:16:      alignItems: "stretch",
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:41:
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:42:  const renderContenidoPrincipal = () => {
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:43:    if (tabActiva === "comparador") {
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:44:     return <ComparadorMultiMetodo contexto={contextoComparador} />;
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:45:    }
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:46:
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:47:    return (
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:48:      <HidroFlow
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:49:        tab={tabActiva}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:50:        setTab={setTabActiva}
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:51:        onContextoComparador={setContextoComparador}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:52:      />
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:53:    );
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:54:  };
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:55:
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:56:  return (
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:57:    <div style={estilos.contenedor}>
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:58:      <aside style={estilos.lateral}>
> 01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:59:        <IndiceHidrologico contexto={contextoComparador}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:60:          tabActiva={tabActiva}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:61:          tab={tabActiva}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:62:          setTab={setTabActiva}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:63:          setTabActiva={setTabActiva}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:64:          cambiarTab={setTabActiva}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:65:          navegarA={setTabActiva}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:66:          goToTab={setTabActiva}
  01_APP\HIDROFLOW\src\layouts\HidroFlowLayout.jsx:67:        />


## 3. Publicaciones actuales desde HidroFlow.jsx


  01_APP\HIDROFLOW\src\HidroFlow.jsx:28:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:29:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:30:  calcCNdinamico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:31:  derivarAMCDesdeSIATA,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:32:  calcLluviaEfectiva,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:33:  calcTc,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:34:  mapTcResultados,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:35:  cnMixto,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:36:  cnII_to_III
  01_APP\HIDROFLOW\src\HidroFlow.jsx:37:} from "./services/hidroEngine";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:38:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:39:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:40:// HIDROFLOW v3.1 — Arquitectura Senior · GT-AS-004 · EPM 2025 · SIATA
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:41:// Motor: Clark IUH · W&H · Snyder · SCS Mod. · Huff · Convolución completa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:42:// Módulos: Ponderación estaciones (IDW/Thiessen/Altitudinal/Compuesto) + SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:43:// Exportación: PDF (html2canvas+jsPDF) · Excel (SheetJS)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:44:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:45:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:46:// ─── PALETA Y CONSTANTES ─────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:47:const C = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:48:  bg:"#07090F", panel:"#0B0F1A", card:"#0F1624",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:49:  border:"#18253A", border2:"#1F2F45",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:79:  "CUCARACHO":          {codigo:"2701114",lat:6.28380556,lon:-75.60791667,alt:1830,fuente:"REF",params:{"2.33":{k:53.17,n:0.938,c:0.4},"5":{k:62.57,n:0.947,c:0.4},"10":{k:70.20,n:0.953,c:0.4},"25":{k:79.82,n:0.959,c:0.4},"50":{k:86.95,n:0.963,c:0.4},"100":{k:94.01,n:0.965,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:80:  "ASTILLERO":          {codigo:"2701115",lat:6.24908333,lon:-75.68061111,alt:2420,fuente:"REF",params:{"2.33":{k:57.02,n:0.910,c:0.4},"5":{k:65.14,n:0.898,c:0.4},"10":{k:71.73,n:0.890,c:0.4},"25":{k:80.03,n:0.882,c:0.4},"50":{k:86.18,n:0.877,c:0.4},"100":{k:92.27,n:0.873,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:81:  "COPACABANA":         {codigo:"2701122",lat:6.33661111,lon:-75.51086111,alt:1580,fuente:"REF",params:{"2.33":{k:45.83,n:0.921,c:0.4},"5":{k:52.77,n:0.917,c:0.4},"10":{k:58.43,n:0.914,c:0.4},"25":{k:65.57,n:0.911,c:0.4},"50":{k:70.87,n:0.909,c:0.4},"100":{k:76.13,n:0.908,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:82:  "PEDREGAL":           {codigo:"2701481",lat:6.30494444,lon:-75.57422222,alt:1622,fuente:"REF",params:{"2.33":{k:44.00,n:0.927,c:0.4},"5":{k:55.58,n:0.936,c:0.4},"10":{k:65.02,n:0.942,c:0.4},"25":{k:76.93,n:0.947,c:0.4},"50":{k:85.77,n:0.950,c:0.4},"100":{k:94.54,n:0.952,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:83:  "GERONA":             {codigo:"2701485",lat:6.23338889,lon:-75.55375000,alt:1649,fuente:"REF",params:{"2.33":{k:46.0,n:0.940,c:0.4},"5":{k:53.5,n:0.940,c:0.4},"10":{k:59.5,n:0.940,c:0.4},"25":{k:67.0,n:0.940,c:0.4},"50":{k:72.0,n:0.940,c:0.4},"100":{k:75.0,n:0.940,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:84:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:85:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:86:// ─── MOTOR IDF ────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:87:function idfI(est,d_min,Tr){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:88:  const d_h=d_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:89:  const keys=Object.keys(est.params).map(Number).sort((a,b)=>a-b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:90:  if(est.params[String(Tr)]){const{k,n,c}=est.params[String(Tr)];return k/Math.pow(c+d_h,n);}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:123:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:124:// Unificar datos Huff en tabla comparativa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:125:const HUFF_MERGED = DIST_TEMPORAL_Q1.map((r,i)=>({
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:126:  T:r.T, EPM_Q1:r.P,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:127:  Huff_Q1:HUFF_DATA.Q1[i]?.P, Huff_Q2:HUFF_DATA.Q2[i]?.P,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:128:  Huff_Q3:HUFF_DATA.Q3[i]?.P, Huff_Q4:HUFF_DATA.Q4[i]?.P,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:129:}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:130:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:131:// Interpolación lineal en tabla de distribución
  01_APP\HIDROFLOW\src\HidroFlow.jsx:132:function interpDist(table, tPct){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:133:  if(tPct<=0) return 0; if(tPct>=100) return 100;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:134:  const lo=table.filter(r=>r.T<=tPct).pop()||table[0];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:135:  const hi=table.filter(r=>r.T>=tPct)[0]||table[table.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:136:  if(lo.T===hi.T) return lo.P;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:140:// ─── GENERACIÓN DE HIETOGRAMA ─────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:141:// Método: Distribución temporal adimensional (GT-AS-004 §3.3 o Huff)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:142:// Retorna: {data:[{t,tPct,pAcum,pIncrem,iBloque}], Ptotal}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:143:function calcHietograma(est, Tr, dur_h, dt_min, distType="EPM_Q1"){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:144:  const Ptotal = idfI(est, dur_h*60, Tr) * dur_h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:145:  const steps  = Math.round(dur_h*60/dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:146:  const distTable = distType==="EPM_Q1" ? DIST_TEMPORAL_Q1
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:147:    : distType==="Huff_Q1" ? HUFF_DATA.Q1
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:148:    : distType==="Huff_Q2" ? HUFF_DATA.Q2
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:149:    : distType==="Huff_Q3" ? HUFF_DATA.Q3
  01_APP\HIDROFLOW\src\HidroFlow.jsx:150:    : HUFF_DATA.Q4;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:151:  const data=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:152:  for(let i=0;i<=steps;i++){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:153:    const tPct=(i/steps)*100;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:154:    const pPct= distType==="EPM_Q1" ? distPolyQ1(tPct) : interpDist(distTable,tPct);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:155:    data.push({t:+(i*dt_min).toFixed(1), tPct:+tPct.toFixed(1), pAcum:+(pPct/100*Ptotal).toFixed(3)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:156:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:157:  for(let i=1;i<data.length;i++){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:158:    data[i].pIncrem=+(data[i].pAcum-data[i-1].pAcum).toFixed(4);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:159:    data[i].iBloque=+(data[i].pIncrem/(dt_min/60)).toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:160:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:161:  data[0].pIncrem=0; data[0].iBloque=0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:162:  return {data, Ptotal:+Ptotal.toFixed(2), steps, dur_h, dt_min, Tr, distType};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:163:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:164:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:165:// ─── CN & PÉRDIDAS SCS ────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:166:// ── CN dinámico real (castellano) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:167:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:168:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:169:// ─── CONVOLUCIÓN NUMÉRICA COMPLETA ───────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:170:// Convolución discreta: Q(t) = Σ Pe(j)·UH(t-j)  ← núcleo del motor
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:171:function convolucion(uh_ord, pe_list, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:172:  const nOut=pe_list.length+uh_ord.length+4;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:173:  const Q=new Array(nOut).fill(0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:174:  pe_list.forEach((pe,j)=>uh_ord.forEach((u,k)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:175:    if(j+k<nOut) Q[j+k]+=pe*u;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:176:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:177:  return Q.map((q,i)=>({t:+(i*dt_min).toFixed(2),Q:+Math.max(q,0).toFixed(6)}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:178:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:179:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:180:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:181:// HIDROGRAMAS UNITARIOS SINTÉTICOS — 4 MÉTODOS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:210:    factor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:211:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:212:}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:213:// ① HU SCS (Chow et al., 1994 — GT-AS-004 §3.5)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:214:function calcHUSCS(area, tc_h, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:215:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h, qp=2.08*area/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:216:  const n=Math.ceil(2.67*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:217:  const uh=Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:218:    const t=i*dh, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:219:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:220:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:221:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:222:  return{tp,qp:normalizado.qp,Tc:tc_h*60,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"SCS",color:C.accent2}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:223:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:224:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:225:// ② HU SCS MODIFICADO — SCS con coeficiente de pico Cp variable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:226:// Cp estándar=2.08; Cp modificado=(0.2083·A)/tp ajustado por morfología
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:227:function calcHUSCS_Mod(area, tc_h, dt_min, Cp=2.08){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:228:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:229:  const qp=Cp*area/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:230:  const n=Math.ceil(3.0*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:231:  const uh=Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:232:    const t=i*dh, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:233:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:234:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:235:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:236:  return{tp,qp:normalizado.qp,Tc:tc_h*60,uh:normalizado.uh,Cp,factorNormalizacion:normalizado.factor,metadata:{nombre:"SCS Mod.",color:C.teal}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:237:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:238:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:239:// ③ HU SNYDER (Chow et al. 1994 — versión Ct/Cp configurable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:240:function calcHUSnyder(area_mi2, L_mi, Lca_mi, dt_min, Ct=2.0, Cp=0.62){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:241:  const tlag=Ct*Math.pow(L_mi*Lca_mi,0.3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:242:  const tp=tlag+dt_min/60/2;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:243:  const qp=(640*Cp*area_mi2)/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:244:  const W50=770/Math.pow(qp/area_mi2,1.08);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:295:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:296:// ─── HIDROGRAMA COMPLETO (hietograma → convolución → Q(t)) ───────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:297:function calcHidroCompleto(lluvRows, uh_struct, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:298:  const peList=lluvRows.slice(1).map(r=>r.PeIncrem).filter((v,i,a)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:299:    // Incluir todos los incrementos positivos y su contexto
  01_APP\HIDROFLOW\src\HidroFlow.jsx:300:    return v>0 || (a[i-1]>0||a[i+1]>0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:301:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:302:  const peAll = lluvRows.slice(1).map(r=>Math.max(r.PeIncrem||0,0));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:303:  const qSeries = convolucion(uh_struct.uh, peAll, dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:304:  const Qpico = Math.max(...qSeries.map(r=>r.Q));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:305:  const tPico = qSeries.find(r=>r.Q>=Qpico*0.9999)?.t || 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:306:  const volTotal = qSeries.reduce((s,r)=>s+r.Q*(dt_min*60),0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:307:  return{qSeries, Qpico:+Qpico.toFixed(6), tPico:+tPico.toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:308:    volTotal:+volTotal.toFixed(1), metodo:uh_struct.metadata.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:309:    color:uh_struct.metadata.color};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:310:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:311:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:  const S=25400/CN-254,Ia=0.2*S;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:332:  return TR_LIST.map(Tr=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:333:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:334:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:335:    const Cc=P>0?Math.min(Pe/P,1):0.3;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:336:    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:337:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:338:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:339:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:340:function buildResumenQ(params, est, dtMin, CNact) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:341:  const tcList = calcTc(params).filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:342:  const tc_h = tcList[0]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:343:  const metodos = [
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:344:    { nombre: 'SCS',     make: () => calcHUSCS(params.area, tc_h, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:345:    { nombre: 'SCS Mod', make: () => calcHUSCS_Mod(params.area, tc_h, dtMin, 2.08) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:346:    { nombre: 'Snyder',  make: () => calcHUSnyder(params.area*0.386102, params.longitud_cauce*0.621371, params.longitud_cauce*0.621371*0.35, dtMin) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:347:    { nombre: 'W&H',     make: () => calcHUWilliamsHann(params.area, params.longitud_cauce, (params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce, CNact, dtMin) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:348:    { nombre: 'Clark',   make: () => calcClarkIUH(params.area, tc_h, dtMin, 1.2) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:349:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:350:  return metodos.map(m => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:351:    const row = { metodo: m.nombre };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:352:    TR_LIST.forEach(Tr => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:353:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:354:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:355:      const HU   = m.make();
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:356:      const H    = calcHidroCompleto(Pe, HU, dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:357:      row[Tr]    = +H.Qpico.toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:358:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:359:    return row;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:360:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:361:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:362:// ─── EXPORTACIÓN EXCEL (SheetJS) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:363:async function exportarExcel(datos){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:364:  const XLSX = await import("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").catch(()=>null);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:373:    ["Parámetro","Valor","Unidad"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:374:    ["Cuenca",datos.nombre_cuenca,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:375:    ["Área",datos.area,"km²"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:376:    ["Perímetro",datos.perimetro,"km"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:377:    ["Longitud cauce",datos.longitud_cauce,"km"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:378:    ["Pendiente media cuenca",datos.pendiente_cuenca,"%"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:379:    ["Cota máxima",datos.cota_max,"msnm"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:380:    ["Cota mínima",datos.cota_min,"msnm"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:381:    ["CN (CNII)",datos.CN,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:382:    ["Tc (Témez)",datos.tc_h*60,"min"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:383:    ["Estación IDF",datos.stn,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:384:    ["Tr de diseño",datos.Tr,"años"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:385:    ["Duración lluvia",datos.dur_h,"h"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:386:    ["Distribución temporal",datos.distType,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:387:    ["Δt cálculo",datos.dt_min,"min"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:388:    ["P total diseño",datos.Ptotal,"mm"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:389:    ["CN post-urbano (CNIII)",datos.cnPost,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:390:    ["CN pre-urbano (CNIII)",datos.cnPre,""],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:391:    ["% Superficie impermeable",datos.siPct,"%"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:392:  ]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:393:  WX.utils.book_append_sheet(wb,ws1,"Parámetros");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:394:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:395:  // Hoja 2: Hietograma
  01_APP\HIDROFLOW\src\HidroFlow.jsx:396:  if(datos.hiet){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:397:    const rows=[["t (min)","T (%)","P acum (mm)","P increm (mm)","i bloque (mm/h)"]];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:398:    datos.hiet.data.forEach(r=>rows.push([r.t,r.tPct,r.pAcum,r.pIncrem||0,r.iBloque||0]));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:399:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hietograma");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:400:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:401:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:402:  // Hoja 3: Hidrogramas comparativos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:403:  if(datos.hidros){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:404:    const header=["t (min)",...datos.hidros.map(h=>h.metodo+" Q(m³/s)")];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:405:    const len=Math.max(...datos.hidros.map(h=>h.qSeries.length));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:406:    const rows=[header];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:407:    for(let i=0;i<len;i++){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:408:      const row=[+(i*datos.dt_min).toFixed(2),...datos.hidros.map(h=>h.qSeries[i]?.Q||0)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:409:      rows.push(row);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:410:    }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:411:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hidrogramas");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:412:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:413:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:414:  // Hoja 4: Volumen SAR
  01_APP\HIDROFLOW\src\HidroFlow.jsx:415:  if(datos.volSAR){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:416:    const rows=[["t (min)","Q post (m³/s)","Q pre (m³/s)","Exceso (m³/s)","Vol. Acum. (m³)"]];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:417:    datos.volSAR.excesos.filter((_,i)=>i%Math.max(1,Math.floor(datos.volSAR.excesos.length/500))===0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:418:      .forEach(r=>rows.push([r.t,r.Qpost,r.Qpre,r.exceso,r.volAcum]));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:419:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Vol_SAR");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:420:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:421:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:422:  // Hoja 5: Resumen caudales
  01_APP\HIDROFLOW\src\HidroFlow.jsx:423:  if(datos.resumenQ){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:424:    const rows=[["Método","Tr=2.33a","Tr=5a","Tr=10a","Tr=25a","Tr=50a","Tr=100a"]];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:425:    datos.resumenQ.forEach(r=>rows.push([r.metodo,...TR_LIST.map(t=>r[t]||0)]));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:426:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Resumen_Q");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:427:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:428:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:429:  WX.writeFile(wb,`HidroFlow_${datos.nombre_cuenca.replace(/\s/g,"_")}_${datos.Tr}a.xlsx`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:430:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:431:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:432:// ─── EXPORTACIÓN PDF (jsPDF + html2canvas) ────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:433:async function exportarPDF(refEl, datos){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:434:  try{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:439:    const html2canvas=h2c.default||h2c;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:440:    const {jsPDF}=jsPDF_mod.default||jsPDF_mod;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:441:    const canvas=await html2canvas(refEl,{scale:1.5,backgroundColor:"#07090F",useCORS:true});
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:442:    const imgData=canvas.toDataURL("image/jpeg",0.92);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:443:    const pdf=new jsPDF({orientation:"landscape",unit:"mm",format:"a3"});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:444:    const pw=pdf.internal.pageSize.getWidth();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:445:    const ph=pdf.internal.pageSize.getHeight();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:446:    const ratio=Math.min(pw/canvas.width,ph/canvas.height)*0.95;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:447:    const iw=canvas.width*ratio, ih=canvas.height*ratio;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:448:    pdf.addImage(imgData,"JPEG",(pw-iw)/2,(ph-ih)/2,iw,ih);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:449:    pdf.save(`HidroFlow_${datos.nombre_cuenca}_Tr${datos.Tr}a.pdf`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:450:  }catch(e){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:451:    console.error("PDF export error:",e);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:452:    alert("Error exportando PDF. Verifique conexión para cargar librerías.");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:453:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:454:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:455:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:456:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:457:// COMPONENTES UI
  01_APP\HIDROFLOW\src\HidroFlow.jsx:458:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:459:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:460:function Field({label,value,onChange,unit,step="0.001",type="number"}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:461:  const[f,setF]=useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:462:  return(<div style={{marginBottom:11}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:463:    <label style={{display:"block",fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:mono}}>{label}</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:464:    <div style={{display:"flex",gap:8,alignItems:"center"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:465:      <input type={type} step={step} value={value}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:466:        onChange={e=>onChange(type==="number"?parseFloat(e.target.value)||0:e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:467:        onFocus={()=>setF(true)} onBlur={()=>setF(false)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:468:        style={{flex:1,background:C.bg,border:`1px solid ${f?C.accent:C.border}`,borderRadius:6,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:469:          color:C.text,padding:"6px 10px",fontSize:13,outline:"none",fontFamily:mono,transition:"border-color .2s"}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:470:      {unit&&<span style={{fontSize:10,color:C.muted,minWidth:40,fontFamily:mono}}>{unit}</span>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:471:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:472:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:473:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:474:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:476:  return(<div id={id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",...style}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:477:    {title&&<div style={{padding:"9px 15px",borderBottom:`1px solid ${C.border}`,background:`linear-gradient(90deg,${accent}12,transparent)`,display:"flex",alignItems:"center",gap:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:478:      <div style={{width:3,height:14,background:accent,borderRadius:2}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:479:      <span style={{fontSize:10,fontWeight:700,color:accent,textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:mono}}>{title}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:480:    </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:481:    <div style={{padding:15}}>{children}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:482:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:483:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:484:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:485:function Kpi({value,label,accent=C.accent,sub}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:486:  return(<div style={{background:`${accent}0C`,border:`1px solid ${accent}22`,borderRadius:10,padding:"10px 13px",textAlign:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:487:    <div style={{fontSize:16,fontWeight:800,color:accent,fontFamily:mono,lineHeight:1.1}}>{value}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:488:    {sub&&<div style={{fontSize:9,color:`${accent}80`,fontFamily:mono,marginTop:2}}>{sub}</div>}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:489:    <div style={{fontSize:9,color:C.muted,marginTop:4,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:490:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:491:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:492:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:493:function Tbl({headers,rows,hiCols=[],accent=C.accent}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:494:  return(<div style={{overflowX:"auto"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:495:    <table style={{width:"100%",borderCollapse:"collapse",fontSize:10.5,fontFamily:mono}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:496:      <thead><tr>{headers.map((h,i)=>(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:497:        <th key={i} style={{padding:"6px 9px",background:`${C.bg}CC`,color:C.muted,textAlign:i===0?"left":"right",fontWeight:600,fontSize:9,textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{h}</th>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:498:      ))}</tr></thead>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:499:      <tbody>{rows.map((row,i)=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:500:        <tr key={i} style={{background:i%2===0?"transparent":`${C.border}20`}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:501:          {Object.entries(row).map(([,v],j)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:502:            const hi=hiCols.includes(j);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:503:            return(<td key={j} style={{padding:"5px 9px",textAlign:j===0?"left":"right",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:504:              color:hi?accent:C.text,fontWeight:hi?700:400,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:505:              borderBottom:`1px solid ${C.border}18`,whiteSpace:"nowrap"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:506:              {typeof v==="number"?v.toFixed(v>9999?0:v>999?1:v>99?2:v>9?3:4):v}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:507:            </td>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:508:          })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:509:        </tr>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:510:      ))}</tbody>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:511:    </table>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:512:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:513:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:514:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:537:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:538:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:539:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:540:function StationRow({name,est,sel,onSel}){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:541:  const act=name===sel;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:542:  return(<button onClick={()=>onSel(name)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"7px 13px",background:act?`${C.accent}10`:"transparent",border:"none",cursor:"pointer",borderBottom:`1px solid ${C.border}18`,transition:"background .15s"}}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:543:    onMouseEnter={ev=>ev.currentTarget.style.background=`${C.accent}08`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:544:    onMouseLeave={ev=>ev.currentTarget.style.background=act?`${C.accent}10`:"transparent"}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:545:    <div style={{width:5,height:5,borderRadius:"50%",background:act?C.accent:est.fuente==="PDF"?C.accent2:C.gold,flexShrink:0}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:546:    <div style={{textAlign:"left"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:547:      <div style={{fontSize:11,color:act?C.accent:C.text,fontWeight:act?700:400,fontFamily:sans}}>{name}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:548:      <div style={{fontSize:9,color:C.muted,fontFamily:mono}}>{est.codigo!=="——"?est.codigo+" · ":""}{est.alt} msnm</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:549:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:550:  </button>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:551:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:552:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:553:function StationSel({sel,onSel}){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:554:  const[open,setOpen]=useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:555:  const e=ESTACIONES_EPM[sel];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:556:  const pdfN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="PDF").length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:557:  const refN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="REF").length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:558:  return(<div style={{position:"relative",zIndex:300}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:559:    <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:9,background:C.card,border:`1px solid ${open?C.accent:C.border}`,borderRadius:10,padding:"6px 12px",cursor:"pointer",color:C.text,fontFamily:sans,fontSize:12,transition:"all .2s",minWidth:240}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:560:      <div style={{width:7,height:7,borderRadius:"50%",background:e.fuente==="PDF"?C.accent2:C.gold,flexShrink:0}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:561:      <div style={{flex:1,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:562:        <div style={{fontSize:11,fontWeight:700}}>{sel}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:563:        <div style={{fontSize:9,color:C.muted,fontFamily:mono}}>{e.alt} msnm · {e.fuente==="PDF"?"✓ PDF":"~ Ref"}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:564:      </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:565:      <span style={{color:C.muted,fontSize:9}}>{open?"▲":"▼"}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:566:    </button>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:567:    {open&&<div style={{position:"absolute",top:"110%",left:0,background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,width:280,maxHeight:380,overflowY:"auto",boxShadow:"0 16px 40px #00000080",zIndex:400}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:568:      <div style={{padding:"8px 13px 6px",borderBottom:`1px solid ${C.border}`,fontSize:9,color:C.muted,fontFamily:mono}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:569:        <span style={{color:C.accent2}}>● {pdfN} PDF calibradas</span><span style={{margin:"0 8px"}}>·</span><span style={{color:C.gold}}>● {refN} de referencia</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:570:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:571:      <div style={{padding:"4px 0 2px",fontSize:9,color:C.muted,fontFamily:mono,paddingLeft:13,paddingTop:8,paddingBottom:2}}>✓ CALIBRADAS PDF EPM 2025</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:572:      {Object.entries(ESTACIONES_EPM).filter(([,v])=>v.fuente==="PDF").map(([n,v])=><StationRow key={n} name={n} est={v} sel={sel} onSel={nm=>{onSel(nm);setOpen(false)}}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:573:      <div style={{padding:"4px 0 2px",fontSize:9,color:C.muted,fontFamily:mono,paddingLeft:13,paddingTop:8,paddingBottom:2,borderTop:`1px solid ${C.border}`}}>~ REFERENCIA ESTIMADA</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:574:      {Object.entries(ESTACIONES_EPM).filter(([,v])=>v.fuente==="REF").map(([n,v])=><StationRow key={n} name={n} est={v} sel={sel} onSel={nm=>{onSel(nm);setOpen(false)}}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:575:    </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:576:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:577:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:578:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:579:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:580:// MÓDULO PARÁMETROS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:581:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:582:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:642:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:643:  // 3. Dominio del mini-mapa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:644:  // Incluye PC_80, estaciones cercanas y estación IDF adoptada.
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:645:  // Esto evita que todo quede apeñuscado.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:646:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:647:  const puntosMapa = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:648:    {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:649:      n: "PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:650:      lat,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:651:      lon,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:652:      alt,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:653:      tipo: "pc"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1108:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1109:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1110:// ───────────────────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1111:// Subcomponente: Card "Condición de Humedad (AMC) y Urbanización"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1112:// (versión con hooks por named import: useState/useEffect/useCallback)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1113:// ───────────────────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1114:function AMCPanel({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1115:  // Normalizaciones (evitan NaN/undefined)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1116:  const amcSel = params?.amcActual ?? "II";
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1117:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:    ? params.porcentajeImpermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    : 60; // ← unifica default con ModHidrogramas
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1120:  const cnBase = Number.isFinite(params?.cnBase)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1121:    ? params.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1122:    : (Number.isFinite(params?.CN) ? params.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1123:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1124:  // Estado local para el slider (evita flood al arrastrar)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1125:  const [pctLive, setPctLive] = useState(pctImp);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1126:  useEffect(() => { setPctLive(pctImp); }, [pctImp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1127:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1128:  // Commit del % Impermeable (al soltar / perder foco)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1129:  const commitPct = useCallback((v) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1130:    setParams(prev => ({ ...prev, porcentajeImpermeable: v }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1131:    if (import.meta.env.DEV) console.log("[AMC]", "%Impermeable ->", v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1132:  }, [setParams]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1133:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1134:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1135:    <div style={{ marginTop: 16, padding: 16, border: '1px solid #1F2F45', borderRadius: 10, background: '#0F1624' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1136:      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1137:        <h3 style={{ margin: 0, fontSize: 16 }}>Condición de Humedad (AMC) y Urbanización</h3>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1138:        <small style={{ opacity: 0.75 }}>Ajusta AMC, % Impermeable y CN II base</small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1139:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1140:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1141:      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'start' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1142:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1143:        {/* AMC I/II/III */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1144:        <div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1145:          <label style={{ display: 'block', marginBottom: 8 }}>AMC</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1146:          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1147:            {["I", "II", "III"].map(a => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1148:              const sel = (amcSel === a);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1149:              return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1150:                <button
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1151:                  key={a}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1152:                  type="button"  // evita submit si hay <form> ancestro
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1153:                  onClick={() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1154:                    setParams(prev => ({ ...prev, amcActual: a }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1155:                    if (import.meta.env.DEV) console.log("[AMC]", "amcActual ->", a);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1156:                  }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1157:                  style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1158:                    padding: '8px 12px',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1159:                    borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1160:                    cursor: 'pointer',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1161:                    border: sel ? '1px solid #00F5A0' : '1px solid #1F2F45',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1162:                    background: sel ? '#12242A' : '#0B0F1A',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1163:                    color: '#D8E4F0'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1164:                  }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1165:                >
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1166:                  AMC {a}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1167:                </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1168:              );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1169:            })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1170:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1171:          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1172:            I (seco) · II (normal) · III (húmedo/saturado)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1173:          </small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1174:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1175:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1176:        {/* % Impermeable (commit al soltar / blur) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1177:        <div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1178:          <label style={{ display: 'block', marginBottom: 8 }}>% Impermeable</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1179:          <input
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1180:            type="range" min={0} max={100} step={1}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1181:            value={pctLive}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1182:            onChange={e => setPctLive(+e.target.value)}               // solo UI mientras arrastras
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1183:            onPointerUp={() => commitPct(pctLive)}                    // commit al soltar (touch/pen)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1184:            onMouseUp={() => commitPct(pctLive)}                      // commit al soltar (mouse)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1185:            onBlur={() => commitPct(pctLive)}                         // commit al salir del control
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1186:            style={{ width: '100%' }}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1187:            aria-label="% Impermeable"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1188:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1189:          <div style={{ marginTop: 8, fontFamily: 'monospace' }}>{pctLive}%</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1190:          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1191:            Pondera CN mezclando suelo permeable e impermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1192:          </small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1193:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1194:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1195:        {/* CN II base */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1196:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1197:          <label style={{ display: 'block', marginBottom: 8 }}>CN II base</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1198:          <input
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1199:            type="number" min={30} max={98} step={0.1}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1200:            value={cnBase}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1201:            onChange={e => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1202:              const v = +e.target.value;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1203:              setParams(prev => ({ ...prev, cnBase: v }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1204:              if (import.meta.env.DEV) console.log("[AMC]", "cnBase ->", v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1205:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1206:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1207:              width: '100%', padding: 8, borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1208:              border: '1px solid #1F2F45', background: '#0B0F1A', color: '#D8E4F0'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1209:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1210:            aria-label="CN II base"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1211:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1212:          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1226:  const tcStats = tc.filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1227:  const tcMed   = tcStats.length ? tcStats.reduce((s, r) => s + r.h, 0) / tcStats.length : 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1228:  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1229:  // Persistir Tc medio (min) en params para otros módulos (Hietogramas, Hidrogramas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1230:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1231:    if (!isFinite(tcMed) || tcMed <= 0) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1232:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1233:    const tcMedMin = tcMed * 60; // horas → minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1234:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1235:    if (params.tcMedMin === tcMedMin) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1236:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1237:    setParams(p => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1243:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1244:    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1245:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1246:      {/* ── Morfometría / Índices / Tc (bloque superior) ───────────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1247:      <SectionHeader
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1248:        icon="⬡"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1249:        title="Morfometría de Cuenca"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1250:        sub="Parámetros geomorfológicos · Índices · Tiempos de concentración"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1251:        accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1252:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1253:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1254:      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "start" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1255:        {/* Identificación */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1256:        <Card title="Identificación" accent={C.accent}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1257:          <Field label="Nombre cuenca" value={params.nombre_cuenca} onChange={set("nombre_cuenca")} type="text" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1258:          <Field label="Δt cálculo"     value={params.dt}            onChange={set("dt")}             unit="min" step="0.5" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1259:          <Field label="CN (CNII)"       value={params.CN}            onChange={set("CN")}             step="1" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1260:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1261:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1262:        {/* Punto de Salida (Outlet) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1263:        <Card title="Punto de Salida (Outlet)" accent={C.teal} style={{ gridColumn: "1 / -1" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1264:          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1265:            <Field label="Latitud salida"  value={params.lat_salida} onChange={set("lat_salida")} unit="°N" step="0.00001" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1291:        {/* Geometría */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1292:        <Card title="Geometría" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1293:          <Field label="Área"            value={params.area}            onChange={set("area")}            unit="km²" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1294:          <Field label="Perímetro"       value={params.perimetro}       onChange={set("perimetro")}       unit="km" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1295:          <Field label="Longitud cauce"  value={params.longitud_cauce}  onChange={set("longitud_cauce")}  unit="km" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1296:          <Field label="Longitud cuenca" value={params.longitud_cuenca} onChange={set("longitud_cuenca")} unit="km" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1297:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1298:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1299:        {/* Cotas y Pendientes */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1300:        <Card title="Cotas y Pendientes" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1301:          <Field label="Cota máxima"       value={params.cota_max}          onChange={set("cota_max")}          unit="msnm" step="1" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1302:          <Field label="Cota mínima"       value={params.cota_min}          onChange={set("cota_min")}          unit="msnm" step="1" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1303:          <Field label="Cota mayor cauce"  value={params.cota_mayor_cauce}  onChange={set("cota_mayor_cauce")}  unit="msnm" step="1" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1304:          <Field label="Cota menor cauce"  value={params.cota_menor_cauce}  onChange={set("cota_menor_cauce")}  unit="msnm" step="1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1305:          <Field label="Pendiente media"   value={params.pendiente_cuenca}  onChange={set("pendiente_cuenca")}  unit="%" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1306:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1307:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1308:      {/* ⬆️ Cierre del grid de Morfometría — PUNTO DE INSERCIÓN CORRECTO */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1309:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1310:      {/* ── Card AMC y Urbanización (subcomponente) ────────────────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1311:      <AMCPanel params={params} setParams={setParams} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1312:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1313:      {/* ── KPIs de forma, compacidad, pendiente y Tc promedio ─────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1314:      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1315:        {[
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1316:          { v: (params.perimetro / (2 * Math.sqrt(Math.PI * params.area))).toFixed(3),   l: "Índice Gravelius", s: "Kc", a: C.accent },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1317:          { v: ((params.longitud_cuenca ** 2) / params.area).toFixed(3),                 l: "Índice de Forma", s: "Rf", a: C.accent2 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1318:          { v: (params.area / (params.longitud_cuenca ** 2)).toFixed(4),                 l: "Coef. Compacidad", s: "Cc", a: C.accent3 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1319:          { v: ((params.cota_max - params.cota_min) / (params.longitud_cauce * 1000) * 1000).toFixed(2),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1320:            l: "Pendiente cauce", s: "So ‰", a: C.gold },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1321:          { v: (tcMed * 60).toFixed(2),                                                  l: "Tc promedio", s: "min", a: C.accent4 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1322:        ].map(({ v, l, s, a }) => <Kpi key={l} value={`${v} ${s}`} label={l} accent={a} />)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1323:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1324:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1325:      {/* ── Tabla de Tiempos de Concentración (6 métodos) ─────────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1326:      <Card title="Tiempos de Concentración — 6 Métodos" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1327:        <Tbl
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1328:          headers={["Método", "Tc (h)", "Tc (min)", "Δ vs. media (%)"]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1344:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1345:// MÓDULO IDF — Curvas Intensidad-Duración-Frecuencia
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1346:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1347:function ModIDF({est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1348:  const DURS=[5,10,15,20,30,45,60,90,120,180,240,360];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1349:  const idfData=useMemo(()=>DURS.map(d=>({d,...Object.fromEntries(TR_LIST.map(T=>[`Tr${T}`,+idfI(est,d,T).toFixed(2)]))})),[est]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1350:  const curvasData=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1351:    const pts=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1352:    for(let d=5;d<=360;d+=5){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1353:      const row={d};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1354:      TR_LIST.forEach(T=>row[`Tr${T}`]=+idfI(est,d,T).toFixed(2));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1355:      pts.push(row);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1367:    <SectionHeader icon="⌁" title="Curvas IDF — 20 Estaciones EPM 2025" sub={`I = k/(c+d)ⁿ · d en horas · c = 0.4 · Gumbel · 2000–2023`} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1368:    <div style={{background:`${C.accent2}08`,border:`1px solid ${C.accent2}20`,borderRadius:10,padding:"10px 15px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1369:      <div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1370:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.08em"}}>Estación activa · {est.fuente==="PDF"?"✓ Calibrada PDF EPM 5/11/2024":"~ Referencia estimada"}</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1371:        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>{name}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1372:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1373:      <div style={{display:"flex",gap:8,flexWrap:"wrap",fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1374:        {[["Código",est.codigo],["Lat.",est.lat.toFixed(5)],["Lon.",est.lon.toFixed(5)],["Alt.",est.alt+" msnm"],["Fuente",est.fuente]].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1375:          <div key={l} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"4px 10px"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1376:            <span style={{color:C.muted}}>{l}: </span><span style={{color:C.text,fontWeight:600}}>{v}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1377:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1378:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1379:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1380:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1381:    <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1382:      <Card title={`Curvas IDF — ${name}`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1383:        <ResponsiveContainer width="100%" height={280}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1384:          <LineChart data={curvasData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1385:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1386:            <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1387:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1388:            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" mm/h",nm]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1389:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1390:            {TR_LIST.map((T,i)=><Line key={T} type="monotone" dataKey={`Tr${T}`} stroke={CC[i]} strokeWidth={1.8} dot={false} name={`Tr=${T}a`}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1391:          </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1392:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1393:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1394:      <Card title="Tabla IDF — Intensidades (mm/h)" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1395:        <Tbl headers={["d(min)",...TR_LIST.map(T=>`Tr=${T}a`)]} rows={idfData.map(r=>({d:r.d,...Object.fromEntries(TR_LIST.map(T=>[T,r[`Tr${T}`]]))}))} hiCols={[6]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1396:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1397:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1398:    <Card title="Comparativa 20 Estaciones — I(d=30min, Tr=100a)" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1399:      <ResponsiveContainer width="100%" height={220}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1400:        <BarChart data={compData} margin={{left:0,right:14,top:8,bottom:44}} layout="vertical">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1401:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1402:          <XAxis type="number" tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",position:"insideBottom",offset:-8,fill:C.muted,fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1403:          <YAxis type="category" dataKey="est" tick={{fill:C.muted,fontSize:8}} width={90}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1404:          <Tooltip contentStyle={TT} formatter={v=>[v+" mm/h","I"]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1405:          <Bar dataKey="I100" radius={[0,3,3,0]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1406:            fill={C.accent3}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1407:            label={{position:"right",fill:C.muted2,fontSize:8,formatter:v=>v}}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1408:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1409:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1410:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1411:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1420:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1421:// MÓDULO HIETOGRAMAS — Distribución temporal + Curvas Huff
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1422:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1423:function ModHietogramas({ est, name, params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1424:  const [Tr, setTr] = useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1425:  const [durH, setDurH] = useState(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1426:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1427:  // Sync dtMin when params.dt changes externally (ej: carga de datos)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1428:  useEffect(() => { if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt); }, [params.dt]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1429:  const [guardarAMCenPanel, setGuardarAMCenPanel] = useState(false);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1430:  const [distType, setDistType] = useState("EPM_Q1");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1431:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1432:  // Hietograma activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1433:  const hiet = useMemo(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1434:    () => calcHietograma(est, Tr, durH, dtMin, distType),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1435:    [est, Tr, durH, dtMin, distType]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1436:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1437:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1438:  // Hietogramas comparativos de todas las distribuciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1439:  const hietAll = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1440:    const types = ["EPM_Q1", "Huff_Q1", "Huff_Q2", "Huff_Q3", "Huff_Q4"];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1441:    return types.map(tp => ({ tp, data: calcHietograma(est, Tr, durH, dtMin, tp) }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1442:  }, [est, Tr, durH, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1443:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1444:  // === Día 3 (MVP) — Orquestación P → Pn → UH → Q(t) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1445:  // Vector de incrementos (mm por bloque) y Δt
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1446:  const P_mm  = hiet.data.map((r, i, a) => (i === 0 ? 0 : +(r.pAcum - a[i - 1].pAcum).toFixed(5)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1447:  const dt_min = dtMin;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1448:  const A_km2  = Number.isFinite(params?.area) ? params.area : 36.58;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1449:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1477:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1478:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1479:    tcWarning: tcBajo || tcAlto,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1480:    amcWarning: !params?.amcFuente,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1481:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1482:    // En Hidrología no hay persistencia ni override de UI
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1483:    amcPersistiendo: false,
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1495:    return `Tc sugerido = mediana de ${tcList.length} métodos -> ${Tc_sugerido_min.toFixed(1)} min. [${etiquetas}]`;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1496:  }, [tcList, Tc_sugerido_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1497:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1498:  // === SCS‑CN desde Preliminares + override + AMC auto (SIATA) ===
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1499:  const CN_panel        = Number.isFinite(params?.cnBase) ? params.cnBase : (params.CN ?? 75);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1500:  const AMC_panel       = params?.amcActual ?? "II"; // "I" | "II" | "III"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1501:  const pctImperv_panel = Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1502:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1503:  // Override SCS‑CN (para análisis)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1504:  const [overrideSCS, setOverrideSCS] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1505:  const [CN_ovr, setCN_ovr]          = useState(CN_panel);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1506:  const [AMC_ovr, setAMC_ovr]        = useState(AMC_panel);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1507:  const [pctImp_ovr, setPctImp_ovr]  = useState(pctImperv_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1508:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1509:  // Valores efectivos (panel u override)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1510:  const CN        = overrideSCS ? CN_ovr     : CN_panel;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1511:  const AMC       = overrideSCS ? AMC_ovr    : AMC_panel;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1512:  const pctImperv = overrideSCS ? pctImp_ovr : pctImperv_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1513:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1514:  // Chequeos amables de rango (usa '-' ASCII para evitar tofu en monospace)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1515:  const scsAviso = [];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1516:  if (CN < 30 || CN > 98) scsAviso.push("CN fuera de 30-98");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1517:  if (pctImperv < 0 || pctImperv > 100) scsAviso.push("% Impermeable fuera de 0-100");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1518:  if (!["I", "II", "III"].includes(AMC)) scsAviso.push("AMC debe ser I/II/III");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1519:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1520:  // AMC automático (SIATA) — opcional
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1521:  const [usarAMCauto, setUsarAMCauto] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1522:  const [hs_demo, setHsDemo]          = useState(0.38); // 0–1; aquí demo. Luego lo tomas de SIATA.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1523:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1524:  const amcAuto = useMemo(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1525:    () => (usarAMCauto ? derivarAMCDesdeSIATA(hs_demo) : null),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1526:    [usarAMCauto, hs_demo]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1527:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1528:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1529:  // AMC efectivo: si AMC auto está activo y no hay override SCS, usamos el derivado
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1530:  const AMC_eff = (usarAMCauto && !overrideSCS && amcAuto?.amcActual) ? amcAuto.amcActual : AMC;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1531:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1532:  // Informe amigable AMC
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1533:  const infoAMC = (usarAMCauto && amcAuto)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1534:    ? `${amcAuto.amcInforme} (Fuente: ${amcAuto.amcFuente})`
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1535:    : `AMC desde panel: ${AMC_panel}`;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1536:  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1537:  // Toggle para decidir si persistimos AMC auto en el panel (opt-in)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1538:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1539:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1540:   // Persistir AMC auto en el panel (Preliminares) cuando el toggle está activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1541:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1542:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1543:  // ── Exportar PNG para gráficas del módulo (vía CDN, sin instalar) ─────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1544:  // Refs: contenedores de las dos gráficas a exportar (Distribuciones e Intensidades)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1545:  const refContenedorDistribuciones = useRef(null);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1546:  const refContenedorIntensidades   = useRef(null);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1547:  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1548:  // Persistir AMC auto en el panel (Preliminares) SOLO si el toggle está activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1549:useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1550:  if (!guardarAMCenPanel) return;                 // opt-in: solo si el usuario lo decide
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1551:  if (usarAMCauto && amcAuto?.amcActual) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1552:    // Evita escrituras innecesarias si no cambió
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1553:    if (params?.amcActual === amcAuto.amcActual) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1554:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1555:    // Auditoría útil para reportes y Preliminares
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1556:    const stamp = new Date().toISOString();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1557:    const payload = {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1558:      amcActual:  amcAuto.amcActual,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1559:      amcFuente:  amcAuto.amcFuente || "SIATA",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1560:      amcInforme: amcAuto.amcInforme || `AMC ${amcAuto.amcActual} (auto)`,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1561:      amcFecha:   stamp,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1562:      amcHSref:   typeof hs_demo === "number" ? hs_demo : undefined
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1563:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1564:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1565:    // Requiere que ModHietogramas reciba setParams como prop
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1566:    setParams(prev => ({ ...prev, ...payload }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1567:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1568:}, [
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1569:  guardarAMCenPanel,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1570:  usarAMCauto,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1571:  amcAuto?.amcActual,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1572:  amcAuto?.amcFuente,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1573:  amcAuto?.amcInforme,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1574:  hs_demo,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1575:  params?.amcActual,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1576:  setParams
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1577:]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1578:  /**
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1579:   * exportarPNGDesdeRef
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1580:   * @param {React.RefObject} refNodo       ref al contenedor (div) que envuelve ResponsiveContainer
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1581:   * @param {string}          nombreArchivo nombre del PNG a descargar
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1582:   */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1583:  const exportarPNGDesdeRef = async (refNodo, nombreArchivo) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1607:    const len = hiet.data.length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1608:    const step = Math.max(1, Math.floor(len / 60));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1609:    return hiet.data.slice(1).filter((_, i) => i % step === 0).map((r, idx) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1610:      const obj = { t: r.t, EPM_Q1: r.iBloque };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1611:      hietAll.forEach(h => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1612:        const j = Math.min(idx * step + 1, h.data.data.length - 1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1613:        const match = h.data.data[j];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1614:        if (match) obj[h.tp] = match.iBloque || 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1615:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1616:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1617:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1618:  }, [hiet, hietAll]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1623:      const T = i * 5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1624:      return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1625:        T,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1626:        EPM_Q1:  interpDist(DIST_TEMPORAL_Q1, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1627:        Huff_Q1: interpDist(HUFF_DATA.Q1, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1628:        Huff_Q2: interpDist(HUFF_DATA.Q2, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1629:        Huff_Q3: interpDist(HUFF_DATA.Q3, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1630:        Huff_Q4: interpDist(HUFF_DATA.Q4, T),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1631:      };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1632:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1633:  }, []);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1634:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1635:  const dispFilt = hiet.data.filter((_, i) => i % Math.max(1, Math.floor(hiet.data.length / 80)) === 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1636:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1637:  // ────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1638:  // RENDER
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1647:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1648:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1649:      {/* Controles */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1650:      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1651:        <Card title="Período de Retorno" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1652:          <BtnGroup options={TR_LIST.map(t => ({ v: t, l: `${t}a` }))} value={Tr} onChange={setTr} accent={C.gold} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1653:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1654:        <Card title="Duración" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1655:          <BtnGroup options={[1, 2, 3, 6, 12].map(h => ({ v: h, l: `${h}h` }))} value={durH} onChange={setDurH} accent={C.accent3} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1656:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1657:        <Card title="Intervalo Δt" accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1658:          <BtnGroup options={[5, 10, 15, 30].map(d => ({ v: d, l: `${d}'` }))} value={dtMin} onChange={setDtMin} accent={C.accent} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1659:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1660:        <Card title="Distribución activa" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1661:          <BtnGroup
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1662:            options={[
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1663:              { v: "EPM_Q1", l: "EPM Q1" }, { v: "Huff_Q1", l: "Huff Q1" },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1664:              { v: "Huff_Q2", l: "Huff Q2" }, { v: "Huff_Q3", l: "Huff Q3" }, { v: "Huff_Q4", l: "Huff Q4" },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1665:            ]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1666:            value={distType}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1667:            onChange={setDistType}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1668:            accent={C.accent2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1669:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1670:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1671:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1672:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1673:      {/* KPIs */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1674:      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1675:        <Kpi value={hiet.Ptotal + " mm"} label="P total" accent={C.accent} sub={`Tr=${Tr}a`} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1676:        <Kpi
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1677:          value={Math.max(...hiet.data.slice(1).map(r => r.iBloque || 0)).toFixed(2) + " mm/h"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1678:          label="i máxima bloque"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1679:          accent={C.accent3}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1680:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1681:        <Kpi value={(hiet.Ptotal * 0.75).toFixed(1) + " mm"} label="P en 1er quartil" accent={C.accent2} sub="~75% en primeros 25%" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1682:        <Kpi value={`${durH}h · ${dtMin}' · ${hiet.steps}bloq`} label="Configuración" accent={C.muted2} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1683:        <Kpi value={distType.replace("_", " ")} label="Distribución" accent={distType === "EPM_Q1" ? C.accent2 : C.gold} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1684:        <Kpi value={name.length > 12 ? name.substring(0, 12) + "…" : name} label="Estación IDF" accent={C.accent4} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1685:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1686:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1687:      {/* Hietograma de diseño + Parámetros SCS‑CN */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1688:      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1689:        {/* Hietograma de diseño */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1690:        <Card title={`Hietograma — ${distType} · Tr=${Tr}a · d=${durH}h · Δt=${dtMin}min`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1691:          <ResponsiveContainer width="100%" height={260}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1692:            <ComposedChart data={dispFilt.slice(1)} margin={{ left: 0, right: 8, bottom: 14, top: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1693:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1694:              <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1695:                     label={{ value: "t (min)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1696:              <YAxis yAxisId="i" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1697:                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 8 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1698:              <YAxis yAxisId="p" orientation="right" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1699:                     label={{ value: "P acum (mm)", angle: 90, position: "insideRight", fill: C.muted, fontSize: 8 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1700:              <Tooltip contentStyle={TT} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1701:              <Bar  yAxisId="i" dataKey="iBloque" fill={C.accent}  radius={[2, 2, 0, 0]} name="i bloque (mm/h)" opacity={0.85} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1702:              <Line yAxisId="p" type="monotone" dataKey="pAcum"   stroke={C.accent2} strokeWidth={2} dot={false} name="P acum (mm)" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1703:            </ComposedChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1704:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1705:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1706:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1707:        {/* Parámetros lluvia efectiva (SCS‑CN) y UH */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1708:        <Card title="Parámetros lluvia efectiva (SCS‑CN) y UH" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1709:          {/* Toggles */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1710:          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1711:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1712:              <input type="checkbox" checked={overrideSCS} onChange={e => setOverrideSCS(e.target.checked)} /> Override SCS‑CN (análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1713:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1714:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1715:              <input type="checkbox" checked={usarAMCauto} onChange={e => setUsarAMCauto(e.target.checked)} /> AMC automático (SIATA)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1716:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1717:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1718:              <input type="checkbox" checked={usarOverrideTc} onChange={e => setUsarOverrideTc(e.target.checked)} /> Override Tc
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1719:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1720:            <label style={{ fontFamily:'monospace', fontSize:11, color:C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1721:              <input
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1722:               type="checkbox"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1723:               checked={guardarAMCenPanel}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1724:               onChange={e => setGuardarAMCenPanel(e.target.checked)}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1725:             /> Guardar AMC auto en panel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1726:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1727:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1728:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1729:          {/* Solo‑lectura u.Override */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1730:          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1731:            {/* CN */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1732:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1733:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>CN (CNII)</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1734:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1735:                <input
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1736:                  type="number" min={30} max={98} step={0.1} value={CN_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1737:                  onChange={e => setCN_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1738:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1739:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1740:              ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1741:                <Kpi value={CN.toFixed(1)} label="CN" accent={C.accent2} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1742:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1743:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1744:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1745:            {/* AMC */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1746:            <div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1747:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>AMC</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1748:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1749:                <select
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1750:                  value={AMC_ovr}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1751:                  onChange={e => setAMC_ovr(e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1752:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1753:                >
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1754:                  <option value="I">AMC I</option>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1755:                  <option value="II">AMC II</option>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1756:                  <option value="III">AMC III</option>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1757:                </select>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1758:              ) : (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1759:                <Kpi value={AMC_eff} label="AMC" accent={C.gold} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1760:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1761:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1762:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1763:            {/* % Impermeable */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1764:            <div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1765:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>% Impermeable</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1766:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1767:                <input
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1768:                  type="number" min={0} max={100} step={1} value={pctImp_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1769:                  onChange={e => setPctImp_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1770:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1771:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1772:              ) : (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1773:                <Kpi value={`${pctImperv}%`} label="% Imperv" accent={C.accent} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1774:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1775:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1776:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1777:            {/* A (km²) — KPI para trazabilidad */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1778:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1779:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>A (km²)</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1780:              <Kpi value={`${A_km2}`} label="Área" accent={C.teal} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1781:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1785:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>Tc (min)</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1786:              {usarOverrideTc ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1787:                <input
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1788:                  type="number" min={1} step={1} value={Tc_override_min}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1789:                  onChange={e => setTcOverride(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1790:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1791:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1792:              ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1793:                <Kpi value={`${tc_min.toFixed(1)}`} label="Tc sugerido" accent={C.accent4} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1794:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1795:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1796:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1797:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1798:          {/* Informes */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1799:          <div style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 11, color: scsAviso.length ? C.rose : C.muted }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1800:            {infoTc}{scsAviso.length ? ` · Aviso: ${scsAviso.join(" · ")}` : ""}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1801:          </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1802:          {usarAMCauto && amcAuto && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1803:            <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 11, color: C.muted2 }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1804:              {infoAMC}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1805:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1806:          )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1807:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1808:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1809:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1810:      {/* ===== Hidrograma Q(t) — Usa hook useHidrograma con valores efectivos ===== */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1811:      <HidrogramaResultado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1812:        P_mm={P_mm}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1814:        A_km2={A_km2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1815:        Tc_min={tc_min}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1816:        CN={CN}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1817:        AMC={AMC_eff}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1818:        pctImperv={pctImperv}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1819:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1820:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1821:      {/* Distribuciones temporales comparadas */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1822:      <Card title="Distribuciones Temporales Comparadas — Adimensional" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1823:        <div ref={refContenedorDistribuciones} style={{ width: "100%", height: 260 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1824:          <ResponsiveContainer width="100%" height="100%">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1825:            <LineChart data={distMerge} margin={{ left: 0, right: 14, bottom: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1826:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1829:              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1830:                     label={{ value: "P acum (%)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1831:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(1) + "%"]} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1832:              <Legend wrapperStyle={{ fontSize: 9 }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1833:              <Line type="monotone" dataKey="EPM_Q1"  stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1834:              <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1835:              <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q2" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1836:              <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q3" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1837:              <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q4" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1838:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1839:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1840:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1841:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1842:        {/* Botón Exportar PNG */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1843:        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1844:          <button
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1845:            className="btn"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1846:            onClick={() => exportarPNGDesdeRef(refContenedorDistribuciones, "Distribuciones_Adimensional.png")}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1847:          >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1848:            Exportar PNG
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1849:          </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1850:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1851:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1852:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1853:      {/* Intensidades por bloque — Comparativa Distribuciones (Tr activo) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1861:              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1862:                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1863:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(2) + " mm/h"]} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1864:              <Legend wrapperStyle={{ fontSize: 9 }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1865:              <Line type="monotone" dataKey="EPM_Q1"  stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1866:              <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1867:              <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q2" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1868:              <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q3" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1869:              <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q4" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1870:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1871:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1872:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1873:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1874:        {/* Botón Exportar PNG */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1875:        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1876:          <button
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1877:            className="btn"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1878:            onClick={() => exportarPNGDesdeRef(refContenedorIntensidades, "Intensidades_Bloque.png")}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1879:          >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1880:            Exportar PNG
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1881:          </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1882:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1883:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1884:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1885:      {/* Tabla hietograma estructurada */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1886:      <Card title={`Tabla Hietograma Estructurada — ${distType} · Tr=${Tr}a · P_total=${hiet.Ptotal}mm`} accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1887:        <Tbl
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1888:          headers={["t (min)", "T (%)", "P acum (mm)", "ΔP (mm)", "i bloque (mm/h)"]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1889:          rows={hiet.data
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1890:            .slice(1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1891:            .filter((_, i) => i % Math.max(1, Math.floor(hiet.steps / 40)) === 0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1892:            .map(r => ({ t: r.t, T: r.tPct, P: r.pAcum, dP: r.pIncrem, i: r.iBloque }))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1893:          hiCols={[3, 4]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1894:          accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1902:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1903:// MÓDULO HIDROGRAMAS — 5 Métodos con convolución completa (robusto para gráficas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1904:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1905:function ModHidrogramas({ params, est, name, onContextoComparador }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1906:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1907:  // --- DEBUG: blindaje temporal ---
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1908:  // Evita crash por referencias residuales a guardarAMCenPanel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1909:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1910:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1911:  // ── Controles superiores
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1912:  const [Tr, setTr]       = useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1913:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1914:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1915:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1916:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1917:  // ── CN efectivo (CNact) con default coherente a la UI (60 % imperv.)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1918:  const CNact = useMemo(() => calcCNdinamico({
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1919:    amcActual: params.amcActual ?? "II",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1920:    porcentajeImpermeable: params.porcentajeImpermeable ?? 60,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1921:    cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1922:  }), [params.amcActual, params.porcentajeImpermeable, params.cnBase, params.CN]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1923:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1924:  // Verificación temporal (quitar cuando termines la prueba)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1925:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1926:    if (import.meta.env.DEV) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1927:      console.log('[HIDRO]', 'CNact ->', CNact, {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1928:        amc: params.amcActual,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1929:        pImp: params.porcentajeImpermeable,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1930:        cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1931:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1932:    }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1933:  }, [CNact, params.amcActual, params.porcentajeImpermeable, params.cnBase, params.CN]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1934:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1935:  // Sincroniza Δt si cambiaste en Parámetros
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1936:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1937:    if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1938:  }, [params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1939:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1940:  // ── Parámetros HU
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1941:  const [tcSrc, setTcSrc] = useState(0);       // índice del Tc activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1942:  const [kR, setKR]       = useState(1.2);     // Clark
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1943:  const [Ct, setCt]       = useState(2.0);     // Snyder
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1944:  const [Cp, setCp]       = useState(0.62);    // Snyder
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1945:  const [CpSCSMod, setCpSCSMod] = useState(2.08); // SCS Mod
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1946:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1947:  // ── Tc, unidades y pendiente
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1948:  const tcList = useMemo(() => calcTc(params).filter(r => isFinite(r.h) && r.h > 0), [params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1949:  const tc_h   = tcList[tcSrc]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1950:  const tc_min = tc_h * 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1951:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1952:  const area_mi2 = params.area * 0.386102;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1953:  const L_mi     = params.longitud_cauce * 0.621371;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1954:  const S_m_km   = (params.cota_mayor_cauce - params.cota_menor_cauce) / params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1955:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1956:  // ── Hietograma (Tr, 3 h de evento, dtMin, EPM_Q1)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1957:  const hiet = useMemo(() => calcHietograma(est, Tr, 3, dtMin, "EPM_Q1"), [est, Tr, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1958:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1959:  // ── Lluvia efectiva con CN efectivo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1960:  const lluvEfect = useMemo(() => calcLluviaEfectiva(hiet, CNact), [hiet, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1961:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1962:  // ── Unidades Hidrológicas (5 métodos)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1963:  const hu_scs    = useMemo(() => calcHUSCS(params.area, tc_h, dtMin), [params.area, tc_h, dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1964:  const hu_scsMod = useMemo(() => calcHUSCS_Mod(params.area, tc_h, dtMin, CpSCSMod), [params.area, tc_h, dtMin, CpSCSMod]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1965:  const hu_snyder = useMemo(() => calcHUSnyder(area_mi2, L_mi, L_mi * 0.35, dtMin, Ct, Cp), [area_mi2, L_mi, dtMin, Ct, Cp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1966:  const hu_wh     = useMemo(() => calcHUWilliamsHann(params.area, params.longitud_cauce, S_m_km, CNact, dtMin), [params, dtMin, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1967:  const hu_clark  = useMemo(() => calcClarkIUH(params.area, tc_h, dtMin, kR), [params.area, tc_h, dtMin, kR]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1968:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1969:  // ── Convolución (Pe * HU) → hidrogramas por método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1970:  const hidros = useMemo(() => (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1971:    [hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark].map(hu => calcHidroCompleto(lluvEfect, hu, dtMin))
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1972:  ), [lluvEfect, hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1973:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1974:  // Hidrograma activo (SCS por defecto)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1975:  const h0 = hidros?.[0] ?? null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1976:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1977:  useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1978:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1979:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1980:  const nombresHidrogramas = [
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1981:    "SCS Unit Hydrograph",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1982:    "SCS Modificado",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1983:    "Snyder",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1984:    "Williams & Hann",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1985:    "Clark IUH",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1986:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1987:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1988:  const numeroValido = (valor) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1989:    const n = Number(valor);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1990:    return Number.isFinite(n) ? n : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2143:    ? lluvEfect
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2144:        .map((valor) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2145:          Number(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2146:            typeof valor === "object"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2147:              ? valor?.pe ?? valor?.Pe ?? valor?.pn ?? valor?.Pn ?? valor?.valor ?? valor?.y
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2148:              : valor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2149:          )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2150:        )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2151:        .filter((numero) => Number.isFinite(numero) && numero >= 0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2152:    : [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2153:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2154:  const sumaLluviaEfectivaMm = valoresLluviaEfectivaMm.reduce(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2155:    (suma, numero) => suma + numero,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2176:    volumen: h?.volTotal
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2177:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2178:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2179:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:      resultados: hidrogramasQ5Exportables
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2188:    },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2189:    lluvia_efectiva_total_mm: lluviaEfectivaTotalMm,
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2200:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2201:  const amcWarning = params?.amcActual === "III";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2202:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2203:  // En Hidrología solo observamos estados, no persistimos ni override
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2204:  const amcPersistiendo = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2205:  const isOverride = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2206:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2207:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2208:    tcWarning,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2209:    amcWarning,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2210:    amcPersistiendo,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2211:    isOverride
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2212:  };
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2213:}, [tc_min, params?.amcActual]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2214:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2215:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2216: 
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2217:  // ── Resumen rápido (si ya usas buildResumenQ, úsalo)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2218:  const resumenQ = useMemo(() => buildResumenQ(params, est, dtMin, CNact), [params, est, dtMin, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2219:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2220:  /* ──────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2221:     DEBUG TEMPORAL: inspeccionar etiquetas de método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2222:     ────────────────────────────────────────────────────────────── */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2223:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2224:    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas resumenQ:', (resumenQ ?? []).map(r => r.nombre ?? r.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2225:  }, [resumenQ]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2226:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2227:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2228:    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas hidros:', (hidros ?? []).map(h => h.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2229:  }, [hidros]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2289:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2290:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2291:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2292:  // ── Totales de Pe
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2293:  const lePe = useMemo(() => lluvEfect.reduce((s, r) => s + (r.PeIncrem || 0), 0), [lluvEfect]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2294:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2295:  // ───────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2296:  //  FORTALECER GRÁFICAS: seriesOK, n, step, combined, noData (usa hidrosCorr)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2297:  // ───────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2298:  const seriesOK = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2299:    return (hidrosCorr ?? []).filter(h =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2300:      Array.isArray(h?.qSeries) && h.qSeries.length > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2301:    );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2333:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2334:  // ── Paleta por método (si no existe arriba en tu archivo)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2335:  const methodColors = {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2336:    'SCS':              '#4ECDC4',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2337:    'SCS Mod.':         '#94D82D',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2338:    'Snyder':           '#F59F00',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2339:    'Snyder (SI)':      '#F59F00',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2340:    'W & Hann':         '#845EF7',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2341:    'Williams & Hann':  '#845EF7',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2342:    'Clark IUH':        '#20C997'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2343:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2344:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2345:  // ── Render
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2346:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2347:    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2348:      {/* Encabezado Lluvia Efectiva */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2349:      <Card title={`Lluvia Efectiva — CN=${CNact} → Pe total = ${lePe.toFixed(2)} mm`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2350:        {/* CHIP de trazabilidad */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2351:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2352:          display:'inline-block', margin:'8px 0', padding:'6px 10px',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2353:          border:'1px solid rgba(255,255,255,0.15)', borderRadius:8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2354:          fontFamily:'monospace', fontSize:12, opacity:0.9
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2355:        }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2356:          CN base: {Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2357:          {'  →  '} CN efectivo: {CNact}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2358:          {'  |  '} AMC {params.amcActual ?? 'II'}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2359:          {'  |  '} % Imperv: {params.porcentajeImpermeable ?? 60}%
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2360:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2361:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2362:        {/* Mini‑resumen W&H (Qpico/tpico) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2363:        <div style={{ marginTop:8, display:'flex', gap:12, flexWrap:'wrap', fontFamily: mono, fontSize: 12, color: C.muted2 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2364:          <span style={{color:C.accent3}}>{rWH.nombre ?? 'W&H'}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2365:          <span>Qp = <b style={{color:C.text}}>{(rWH.Qpico ?? 0).toFixed(2)}</b> m³/s</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2366:          <span>tp = <b style={{color:C.text}}>{(rWH.tpico ?? 0).toFixed(0)}</b> min</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2367:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2368:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2369:      
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2370:      {/* Panel QA - Estado hidrológico efectivo */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2371:      <div className="flex flex-wrap gap-4 p-3 mb-2 bg-slate-900 text-white rounded-md text-sm font-mono">
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2372:       <div className={qaStatus.tcWarning ? "text-yellow-400" : "text-green-400"}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2373:         Tc operativo Hidrogramas: {tc_min.toFixed(1)} min
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2374:         {qaStatus.tcWarning && " ⚠️"}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2375:         <span className="text-slate-400"> · ruta interna Q(t)</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2376:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2377:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2378:       <div className="text-slate-400">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2379:         <div style={{ marginTop: 6 }}>Roles Tc en HidroFlow:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2380:         <div>• Tc global Índice: referencia hidrológica general.</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2381:         <div>• Tc operativo Q(t): valor usado por la ruta interna del hidrograma.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2382:         <div>• Duración evento: 3 h para almacenamiento/regulación.</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2383:         <div>• Lag / forma SCS: parámetro derivado para forma temporal del hidrograma.</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2384:         <div>• Tc comparador: referencia especializada para coherencia Q-5.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2385:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2386:         <div>Escenarios Tc para Q(t):</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2387:         <div>• Operativo Q(t): {tc_min.toFixed(1)} min · activo</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2388:         <div>• Índice global: {Number.isFinite(params?.tcMedMin) ? params.tcMedMin.toFixed(1) : "—"} min · referencia</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2389:         <div>• Comparador: pendiente · referencia especializada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2390:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2391:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2392:       <div className={qaStatus.amcWarning ? "text-red-400" : "text-blue-400"}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2393:         AMC: {params?.amcActual ?? "N/A"} ({params?.amcFuente ?? "Sin fuente"})
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2394:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2395:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2396:       <div className={qaStatus.amcPersistiendo ? "text-green-400" : "text-slate-400"}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2397:         Persistencia AMC: {qaStatus.amcPersistiendo ? "ON" : "OFF"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2398:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2399:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2400:       {qaStatus.isOverride && (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2401:         <span className="bg-orange-600 px-2 rounded text-black">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2402:           Tc MANUAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2403:         </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2404:       )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2405:     </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2406:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2407:      {/* ===== Gráfica Q(t) — Convolución completa (segura) ===== */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2408:      <div style={{ width:'100%', height: 380, border:'1px solid #1F2F45', borderRadius: 10, background:'#0B0F1A' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2409:        {noData ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2423:                tick={{ fill:'#9AA4B2', fontSize: 11 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2424:                label={{ value:'Q (m³/s)', angle:-90, position:'insideLeft', offset: 10, fill:'#9AA4B2' }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2425:              />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2426:              <Tooltip wrapperStyle={{ background:'#0F1624', border:'1px solid #1F2F45' }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2427:              <Legend wrapperStyle={{ color:'#9AA4B2' }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2428:              {seriesOK.map(h => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2429:                <Line
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2430:                  key={h.metodo}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2431:                  type="monotone"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2432:                  dataKey={h.metodo}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2433:                  stroke={methodColors[h.metodo] ?? '#8884d8'}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2434:                  strokeWidth={2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2435:                  dot={false}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2436:                  isAnimationActive={false}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2437:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2438:              ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2439:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2449:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2450:// MÓDULO SAR — GT-AS-004 §3 Almacenamiento y Regulación (COMPLETO)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2451:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2452:function ModSAR({params,est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2453:  const [Tr,setTr]=useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2454:  const [durH,setDurH]=useState(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2455:  const [dtMin,setDtMin]=useState(()=>+params.dt||5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2456:  useEffect(()=>{ if(params.dt&&+params.dt!==dtMin) setDtMin(+params.dt); },[params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2457:  const [siPct,setSiPct]=useState(80);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2458:  const [catSAR,setCatSAR]=useState("Intermedios");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2459:  const [distType,setDistType]=useState("EPM_Q1");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2460:  const [metodoPost,setMetodoPost]=useState("SCS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2461:  const reportRef=useRef();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2462:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2463:  const TrRec={Menores:2.33,Intermedios:5,Mayores:25};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2464:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2465:  const cnII_post  = +Math.min(cnMixto(siPct),98).toFixed(1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2466:  const cnIII_post = +cnII_to_III(cnII_post).toFixed(2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2467:  const cnIII_pre  = 93.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2468:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2469:  // Hietograma de diseño
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2470:  const hiet=useMemo(()=>calcHietograma(est,Tr,durH,dtMin,distType),[est,Tr,durH,dtMin,distType]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2471:  const lluvPost=useMemo(()=>calcLluviaEfectiva(hiet,cnIII_post),[hiet,cnIII_post]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2472:  const lluvPre =useMemo(()=>calcLluviaEfectiva(hiet,cnIII_pre),[hiet]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2473:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2474:  // Tc Témez para la cuenca
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2475:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2476:  const tc_h=tcList[0]?.h||0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2477:  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2478:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2479:  // Método hidrograma post-urbano seleccionable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2480:  const huPost=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2481:    if(metodoPost==="Clark") return calcClarkIUH(params.area,tc_h,dtMin,1.2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2482:    if(metodoPost==="Snyder") return calcHUSnyder(params.area*0.386102,params.longitud_cauce*0.621371,params.longitud_cauce*0.621371*0.35,dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2483:    if(metodoPost==="WH") return calcHUWilliamsHann(params.area,params.longitud_cauce,S_m_km,cnIII_post,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2484:    return calcHUSCS(params.area,tc_h,dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2485:  },[metodoPost,params,tc_h,dtMin,cnIII_post]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2486:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2487:  const qPost=useMemo(()=>calcHidroCompleto(lluvPost,huPost,dtMin),[lluvPost,huPost,dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2488:  const huPre=useMemo(()=>calcHUSCS(params.area,tc_h,dtMin),[params.area,tc_h,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2489:  const qPre =useMemo(()=>calcHidroCompleto(lluvPre,huPre,dtMin),[lluvPre,huPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2490:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2491:  const volSAR=useMemo(()=>calcVolSAR(qPost.qSeries,qPre.qSeries,dtMin),[qPost,qPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2492:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2493:  const step=Math.max(1,Math.floor(volSAR.excesos.length/120));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2494:  const dispData=volSAR.excesos.filter((_,i)=>i%step===0).slice(0,140);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2495:  const reduccion=qPost.Qpico>0?(100*(qPost.Qpico-qPre.Qpico)/qPost.Qpico).toFixed(1):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2496:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2497:  const exportDatos={
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2498:    nombre_cuenca:params.nombre_cuenca,area:params.area,perimetro:params.perimetro,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2499:    longitud_cauce:params.longitud_cauce,pendiente_cuenca:params.pendiente_cuenca,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2500:    cota_max:params.cota_max,cota_min:params.cota_min,CN:params.CN,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2501:    tc_h,stn:name,Tr,dur_h:durH,distType,dt_min:dtMin,Ptotal:hiet.Ptotal,
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2512:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em"}}>Guía Técnica GT-AS-004 · §3 Diseño Hidrológico · Rev.0 · 2026-01-07</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2513:        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>Diseño de Sistemas de Almacenamiento y Regulación de Aguas Lluvias</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2514:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2515:      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginLeft:"auto"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2516:        <button onClick={()=>exportarExcel(exportDatos)} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${C.accent2}40`,background:`${C.accent2}12`,color:C.accent2,fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700}}>⬇ Excel</button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2517:        <button onClick={()=>exportarPDF(reportRef.current,exportDatos)} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${C.accent3}40`,background:`${C.accent3}12`,color:C.accent3,fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700}}>⬇ PDF</button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2518:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2519:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2520:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2521:    {/* Controles */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2522:    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2523:      <Card title="Categoría SAR" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2524:        {["Menores","Intermedios","Mayores"].map(c=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2525:          <button key={c} onClick={()=>{setCatSAR(c);setTr(TrRec[c]);}} style={{display:"block",width:"100%",margin:"2px 0",padding:"4px 8px",borderRadius:5,border:"none",cursor:"pointer",background:catSAR===c?C.accent4:`${C.accent4}12`,color:catSAR===c?C.bg:C.muted,fontSize:9,fontFamily:mono,fontWeight:catSAR===c?700:400,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2526:            {c} <span style={{opacity:.55}}>Tr={TrRec[c]}a</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2527:          </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2528:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2529:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2530:      <Card title="Tr Diseño" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2538:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2539:      <Card title="Dist. temporal" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2540:        <BtnGroup options={[
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2541:          {v:"EPM_Q1",l:"EPM"},{v:"Huff_Q1",l:"H.Q1"},


## 4. Consumo actual en IndiceHidrologico.jsx


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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:36:  const {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:37:    tabActiva = "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:38:    area_km2 = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:39:    estacionesAdoptadas = [],
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:40:    metodoIDF = "—",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:41:    distribucionTemporal = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:42:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:43:    // SCS-CN / motor
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:44:    CN = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:45:    CN_base = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:46:    CN_efectivo = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:47:    AMC = "II",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:48:    S_mm = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:49:    Ia_mm = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:50:    porcentaje_impermeable = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:51:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:52:    // Racional
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:53:    C = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:54:    racional = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:55:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:56:    // Cuenca
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:57:    cuencaNombre = "Cuenca activa",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:58:    puntoControl = "PC",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:74:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:75:    // Resumen completo futuro
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:76:    resumenMotor = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:77:  } = contexto || {};
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:78:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:79:  const tabActual = tabActivaProp || tabActiva || tab || "params";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:80:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:81:  const normalizarTab = (valor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:82:    if (!valor) return "";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:83:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:84:    const texto = String(valor).trim().toLowerCase();
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:85:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:201:    return "Tr —";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:202:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:203:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:204:  const estaciones = Array.isArray(estacionesAdoptadas)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:205:    ? estacionesAdoptadas
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:206:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:207:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:208:  const referenciasPendientes = Array.isArray(referenciaIDFPendiente)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:209:    ? referenciaIDFPendiente
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:210:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:211:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:212:  const metodosTc = Array.isArray(tc_metodos)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:213:    ? tc_metodos
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:423:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:424:  const trActivoIndice = Number(
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:425:    trStateIndice?.Tr_activo ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:426:      contexto?.tr_diseno_activo ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:427:      25
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:428:  );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:429:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:430:  const seleccionarTrIndice = (trValor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:431:    const trNumerico = Number(trValor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:432:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:433:    if (!Number.isFinite(trNumerico)) {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:434:      return;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:453:    return numero !== null && numero > 0 ? numero : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:454:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:455:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:456:  const racionalContextoIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:457:    contexto?.metodo_racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:458:    contexto?.racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:459:    contexto?.racional_exportable ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:460:    racional ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:461:    null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:462:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:463:  const resultadosRacionalIndice = Array.isArray(racionalContextoIndice?.resultados)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:464:    ? racionalContextoIndice.resultados
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:465:    : Array.isArray(racionalContextoIndice?.tabla)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:466:    ? racionalContextoIndice.tabla
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:467:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:468:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:469:  const trActivoNormalizadoIndice = numeroIndiceSeguro(trActivoIndice) ?? 25;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:470:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:471:  const resultadoRacionalTrIndice = resultadosRacionalIndice.find((fila) =>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:472:    Math.abs(Number(fila?.Tr) - trActivoNormalizadoIndice) < 0.001
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:473:  );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:474:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:475:  const areaRacionalIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:476:    numeroIndicePositivo(racionalContextoIndice?.area_km2) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:477:    numeroIndicePositivo(contexto?.area_km2) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:478:    numeroIndicePositivo(contexto?.area) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:479:    numeroIndicePositivo(contexto?.cuenca?.area_km2) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:480:    numeroIndicePositivo(area_km2);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:481:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:482:  const coeficienteRacionalTrIndice =
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:483:    numeroIndicePositivo(resultadoRacionalTrIndice?.C) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:484:    numeroIndicePositivo(C);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:485:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:486:  const qRacionalTrIndice =
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:487:    numeroIndicePositivo(resultadoRacionalTrIndice?.Q);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:488:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:489:  const areaIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:490:    numeroIndicePositivo(contexto?.area_km2) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:491:    numeroIndicePositivo(area_km2);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:492:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:493:  const pendienteIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:494:    numeroIndicePositivo(contexto?.pendiente_media_pct) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:495:    numeroIndicePositivo(pendiente_media_pct);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:496:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:497:  return (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:498:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:499:    <aside style={estilos.panel}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:500:      <h2 style={estilos.titulo}>Índice Hidrológico de la Cuenca</h2>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:501:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:502:      <p style={estilos.subtitulo}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:540:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:541:      {/* 1. IDF */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:542:      <section style={estiloTarjeta("idf")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:543:        <h3 style={estilos.cardTitle}>① Lluvia de diseño IDF</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:544:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:545:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:546:          <span style={estilos.label}>Método adoptado</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:547:          <span style={estilos.value}>{metodoIDF}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:548:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:549:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:550:        <p style={estilos.muted}>Estaciones con influencia operativa:</p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:551:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:552:        {estaciones.length > 0 ? (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:553:          <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:554:            {estaciones.map((e, i) => (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:555:              <span
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:604:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:605:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:606:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:607:      {/* 2. Distribución temporal */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:608:      <section style={estiloTarjeta("hietogramas")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:609:        <h3 style={estilos.cardTitle}>② Distribución temporal</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:610:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:611:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:612:          <span style={estilos.label}>Curva adoptada</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:613:          <span style={estilos.value}>{distribucionTemporal}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:614:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:615:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:616:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:617:          Define la concentración temporal de la lluvia y controla el pico de
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:618:          caudal.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:619:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:620:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:621:        <button style={estiloBoton("hietogramas")} onClick={() => goToTab("hiet")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:622:          Analizar distribución temporal
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:623:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:624:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:625:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:626:      {/* 3. Lluvia efectiva */}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:627:      <section style={estiloTarjeta("hidrogramas")}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:628:        <h3 style={estilos.cardTitle}>③ Lluvia efectiva SCS-CN</h3>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:629:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:630:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:631:          <span style={estilos.label}>CN base</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:632:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:633:            {CN_base !== null && CN_base !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:634:              ? formatNumero(CN_base, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:635:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:636:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:637:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:638:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:639:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:640:          <span style={estilos.label}>CN efectivo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:641:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:642:            {CN_efectivo !== null && CN_efectivo !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:643:              ? formatNumero(CN_efectivo, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:644:              : CN !== null && CN !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:645:              ? formatNumero(CN, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:646:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:647:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:648:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:649:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:650:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:651:          <span style={estilos.label}>AMC</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:652:          <span style={estilos.value}>{AMC || "II"}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:653:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:654:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:655:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:656:          <span style={estilos.label}>S</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:657:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:658:            {S_mm !== null && S_mm !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:659:              ? `${formatNumero(S_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:660:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:661:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:662:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:663:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:664:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:665:          <span style={estilos.label}>Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:666:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:667:            {Ia_mm !== null && Ia_mm !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:668:              ? `${formatNumero(Ia_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:669:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:670:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:671:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:672:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:673:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:674:          <span style={estilos.label}>Impermeabilidad</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:675:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:676:            {porcentaje_impermeable !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:677:            porcentaje_impermeable !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:678:              ? `${formatNumero(porcentaje_impermeable, 1)} %`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:679:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:680:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:681:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:682:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:683:        <p style={estilos.muted}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:684:          Parámetros leídos desde el resumen oficial del motor SCS-CN.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:685:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:686:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:687:        <div style={estilos.chipRow}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:688:          <span style={estilos.chip}>SCS-CN</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:689:          <span style={estilos.chip}>AMC/SIATA</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:690:          <span style={estilos.chip}>S · Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:691:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:692:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:693:        <button style={estiloBoton("hidrogramas")} onClick={() => goToTab("hidro")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:694:          Ver lluvia efectiva Pe(t)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:695:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:696:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:697:


## 5. Valores esperados desde runtime visual

```text
Estación IDF visible: SAN CRISTOBAL
CN base visible: 88
CN efectivo visible: 88
AMC visible: II
Impermeabilidad visible en módulo central: 60 %
Distribución temporal esperada por defecto: EPM_Q1
Pendientes en Índice: método IDF, estaciones, curva temporal, S, Ia, impermeabilidad.
```

## 6. Criterio de decisión

Si los datos ya existen en HidroFlow.jsx pero no se publican al contextoComparador, OT-0055B deberá publicar contexto. Si se publican pero el Índice no los consume, OT-0055B deberá corregir consumo. Si no existen como estructura exportable, se diseñará adaptador mínimo.

## 7. Estado Git final

?? 00_ADMIN/bitacora/OT-0055/
