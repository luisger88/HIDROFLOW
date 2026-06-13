# OT-0078J — Auditoría focal en código del cálculo de Qpico, tPico y volTotal

Fecha: 2026-06-13 00:03:07

## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- OT-0078I cerrada en commit 868a400.
- Alcance: auditoría focal de código, sin cambios funcionales.

## Objetivo

Auditar en código dónde se calculan o derivan Qpico, tPico y volTotal, y si esos valores provienen de una serie temporal Q(t), un arreglo interno, un objeto resumen o un cálculo directo sin serie persistente.

## Evidencia focal en HidroFlow.jsx


> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1:import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3:import { useState, useMemo, useCallback, useRef, useEffect } from "react";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:4:import { getTrState, subscribeTr } from "./agents/trAgent";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:5:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:6:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:7:  LineChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:8:  Line,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:9:  AreaChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:10:  Area,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:11:  BarChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:12:  Bar,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:13:  XAxis,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:14:  YAxis,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:15:  CartesianGrid,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:21:  ScatterChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:22:  Scatter,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:23:  Cell,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:24:} from "recharts";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:25:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:26:import HidrogramaResultado from "./components/HidrogramaResultado";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:27:import { getTcState, setTcState } from "./agents/tcAgent";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:28:import { derivarEstadoQTrActivo } from "./services/qtr/derivarEstadoQTrActivo";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:29:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:30:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:31:  calcCNdinamico,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:32:  derivarAMCDesdeSIATA,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:33:  calcLluviaEfectiva,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:34:  calcTc,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:35:  mapTcResultados,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:36:  cnMixto,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:37:  cnII_to_III
  01_APP\HIDROFLOW\src\HidroFlow.jsx:38:} from "./services/hidroEngine";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:39:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:40:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:41:// HIDROFLOW v3.1 — Arquitectura Senior · GT-AS-004 · EPM 2025 · SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:42:// Motor: Clark IUH · W&H · Snyder · SCS Mod. · Huff · Convolución completa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:43:// Módulos: Ponderación estaciones (IDW/Thiessen/Altitudinal/Compuesto) + SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:44:// Exportación: PDF (html2canvas+jsPDF) · Excel (SheetJS)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:45:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:46:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:47:// ─── PALETA Y CONSTANTES ─────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:48:const C = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:49:  bg:"#07090F", panel:"#0B0F1A", card:"#0F1624",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:85:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:86:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:87:// ─── MOTOR IDF ────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:88:function idfI(est,d_min,Tr){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:89:  const d_h=d_min/60;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:90:  const keys=Object.keys(est.params).map(Number).sort((a,b)=>a-b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:91:  if(est.params[String(Tr)]){const{k,n,c}=est.params[String(Tr)];return k/Math.pow(c+d_h,n);}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:92:  const lo=keys.filter(t=>t<=Tr).pop()||keys[0];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:93:  const hi=keys.filter(t=>t>=Tr)[0]||keys[keys.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:94:  if(lo===hi){const{k,n,c}=est.params[String(lo)];return k/Math.pow(c+d_h,n);}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:95:  const{k:k1,n:n1,c:c1}=est.params[String(lo)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:96:  const{k:k2,n:n2,c:c2}=est.params[String(hi)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:97:  const I1=k1/Math.pow(c1+d_h,n1),I2=k2/Math.pow(c2+d_h,n2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:98:  const f=(Math.log(Tr)-Math.log(lo))/(Math.log(hi)-Math.log(lo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:99:  return I1*Math.pow(I2/I1,f);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:100:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:101:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:102:// ─── DISTRIBUCIÓN TEMPORAL GT-AS-004 §3.3 ────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:103:// Tabla 4 — Primer Cuartil (Gallego et al., 2024)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:104:const DIST_TEMPORAL_Q1 = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:106:  {T:25,P:51.62},{T:30,P:57.39},{T:35,P:62.21},{T:40,P:66.35},{T:45,P:70.09},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:107:  {T:50,P:73.57},{T:55,P:76.79},{T:60,P:79.86},{T:65,P:82.70},{T:70,P:85.36},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:108:  {T:75,P:87.84},{T:80,P:90.11},{T:85,P:92.16},{T:90,P:93.90},{T:95,P:95.32},{T:100,P:100},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:109:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:110:// Ec.2 polinomio — GT-AS-004
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:111:function distPolyQ1(T){return 3.820399e-8*T**5-1.104784e-5*T**4+1.278006e-3*T**3-7.958462e-2*T**2+3.400981*T;}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:112:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:113:// ─── CURVAS HUFF (Quartiles I-IV) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:114:// Curvas Huff estándar (Illinois, USA) adaptadas — probabilidad 50%
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:115:// Q1: lluvia concentrada en primer 25% del tiempo (convectiva)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:116:// Q2: lluvia concentrada 25-50% del tiempo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:117:// Q3: lluvia concentrada 50-75% del tiempo  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:118:// Q4: lluvia distribuida en último 25% del tiempo (frontal)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:119:const HUFF_DATA = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:120:  Q1: [{T:0,P:0},{T:5,P:16.0},{T:10,P:33.0},{T:15,P:43.0},{T:20,P:52.0},{T:25,P:60.0},{T:30,P:66.0},{T:35,P:71.0},{T:40,P:75.5},{T:45,P:79.5},{T:50,P:83.0},{T:55,P:86.0},{T:60,P:88.5},{T:65,P:90.5},{T:70,P:92.5},{T:75,P:94.0},{T:80,P:95.5}
,{T:85,P:96.8},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:121:  Q2: [{T:0,P:0},{T:5,P:5.0},{T:10,P:10.0},{T:15,P:15.5},{T:20,P:21.5},{T:25,P:28.0},{T:30,P:38.0},{T:35,P:48.0},{T:40,P:57.0},{T:45,P:65.0},{T:50,P:72.0},{T:55,P:78.0},{T:60,P:83.0},{T:65,P:87.0},{T:70,P:90.5},{T:75,P:93.0},{T:80,P:95.0},
{T:85,P:96.7},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:122:  Q3: [{T:0,P:0},{T:5,P:4.0},{T:10,P:7.5},{T:15,P:11.5},{T:20,P:15.5},{T:25,P:19.5},{T:30,P:24.5},{T:35,P:30.0},{T:40,P:37.0},{T:45,P:46.0},{T:50,P:56.0},{T:55,P:64.0},{T:60,P:71.0},{T:65,P:77.5},{T:70,P:83.0},{T:75,P:87.0},{T:80,P:91.0},{
T:85,P:93.5},{T:90,P:95.5},{T:95,P:97.5},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:123:  Q4: [{T:0,P:0},{T:5,P:3.0},{T:10,P:5.5},{T:15,P:8.5},{T:20,P:11.5},{T:25,P:14.5},{T:30,P:18.0},{T:35,P:22.0},{T:40,P:26.5},{T:45,P:31.0},{T:50,P:36.5},{T:55,P:43.5},{T:60,P:52.0},{T:65,P:61.0},{T:70,P:70.5},{T:75,P:78.0},{T:80,P:84.5},{T
:85,P:89.5},{T:90,P:93.5},{T:95,P:97.0},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:124:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:125:// Unificar datos Huff en tabla comparativa
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:126:const HUFF_MERGED = DIST_TEMPORAL_Q1.map((r,i)=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:127:  T:r.T, EPM_Q1:r.P,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:128:  Huff_Q1:HUFF_DATA.Q1[i]?.P, Huff_Q2:HUFF_DATA.Q2[i]?.P,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:129:  Huff_Q3:HUFF_DATA.Q3[i]?.P, Huff_Q4:HUFF_DATA.Q4[i]?.P,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:130:}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:131:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:132:// Interpolación lineal en tabla de distribución
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:133:function interpDist(table, tPct){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:134:  if(tPct<=0) return 0; if(tPct>=100) return 100;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:135:  const lo=table.filter(r=>r.T<=tPct).pop()||table[0];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:136:  const hi=table.filter(r=>r.T>=tPct)[0]||table[table.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:137:  if(lo.T===hi.T) return lo.P;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:138:  return lo.P+(hi.P-lo.P)*(tPct-lo.T)/(hi.T-lo.T);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:139:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:140:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:141:// ─── GENERACIÓN DE HIETOGRAMA ─────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:142:// Método: Distribución temporal adimensional (GT-AS-004 §3.3 o Huff)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:143:// Retorna: {data:[{t,tPct,pAcum,pIncrem,iBloque}], Ptotal}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:144:function calcHietograma(est, Tr, dur_h, dt_min, distType="EPM_Q1"){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:145:  const Ptotal = idfI(est, dur_h*60, Tr) * dur_h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:146:  const steps  = Math.round(dur_h*60/dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:147:  const distTable = distType==="EPM_Q1" ? DIST_TEMPORAL_Q1
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:148:    : distType==="Huff_Q1" ? HUFF_DATA.Q1
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:149:    : distType==="Huff_Q2" ? HUFF_DATA.Q2
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:150:    : distType==="Huff_Q3" ? HUFF_DATA.Q3
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:151:    : HUFF_DATA.Q4;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:152:  const data=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:153:  for(let i=0;i<=steps;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:154:    const tPct=(i/steps)*100;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:155:    const pPct= distType==="EPM_Q1" ? distPolyQ1(tPct) : interpDist(distTable,tPct);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:156:    data.push({t:+(i*dt_min).toFixed(1), tPct:+tPct.toFixed(1), pAcum:+(pPct/100*Ptotal).toFixed(3)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:157:  }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:158:  for(let i=1;i<data.length;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:159:    data[i].pIncrem=+(data[i].pAcum-data[i-1].pAcum).toFixed(4);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:160:    data[i].iBloque=+(data[i].pIncrem/(dt_min/60)).toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:161:  }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:162:  data[0].pIncrem=0; data[0].iBloque=0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:163:  return {data, Ptotal:+Ptotal.toFixed(2), steps, dur_h, dt_min, Tr, distType};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:164:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:165:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:166:// ─── CN & PÉRDIDAS SCS ────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:167:// ── CN dinámico real (castellano) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:168:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:169:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:170:// ─── CONVOLUCIÓN NUMÉRICA COMPLETA ───────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:171:// Convolución discreta: Q(t) = Σ Pe(j)·UH(t-j)  ← núcleo del motor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:172:function convolucion(uh_ord, pe_list, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:173:  const nOut=pe_list.length+uh_ord.length+4;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:174:  const Q=new Array(nOut).fill(0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:175:  pe_list.forEach((pe,j)=>uh_ord.forEach((u,k)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:176:    if(j+k<nOut) Q[j+k]+=pe*u;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:177:  }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:178:  return Q.map((q,i)=>({t:+(i*dt_min).toFixed(2),Q:+Math.max(q,0).toFixed(6)}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:179:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:180:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:181:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// HIDROGRAMAS UNITARIOS SINTÉTICOS — 4 MÉTODOS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:184:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:185:function normalizarHUaMm(uh, areaKm2, dt_min) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:186:  const volumenObjetivo = areaKm2 * 1000;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:187:  const volumenUH = (uh || []).reduce(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:188:    (suma, q) => suma + Number(q || 0) * (dt_min * 60),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:189:    0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:190:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:191:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:192:  if (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:193:    !Number.isFinite(volumenObjetivo) ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:194:    volumenObjetivo <= 0 ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:195:    !Number.isFinite(volumenUH) ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:196:    volumenUH <= 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:197:  ) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:198:    return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:199:      uh,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:200:      qp: Math.max(...(uh || [0])),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:201:      factor: 1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:202:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:203:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:204:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:205:  const factor = volumenObjetivo / volumenUH;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:206:  const uhNormalizado = uh.map((q) => +(Number(q || 0) * factor).toFixed(7));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:207:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:208:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:209:    uh: uhNormalizado,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:210:    qp: +Math.max(...uhNormalizado).toFixed(7),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:211:    factor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:212:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:213:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:214:// ① HU SCS (Chow et al., 1994 — GT-AS-004 §3.5)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:215:function calcHUSCS(area, tc_h, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:216:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h, qp=2.08*area/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:217:  const n=Math.ceil(2.67*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:218:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:219:    const t=i*dh, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:220:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:221:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:222:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:223:  return{tp,qp:normalizado.qp,Tc:tc_h*60,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"SCS",color:C.accent2}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:224:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:225:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:226:// ② HU SCS MODIFICADO — SCS con coeficiente de pico Cp variable
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:227:// Cp estándar=2.08; Cp modificado=(0.2083·A)/tp ajustado por morfología
  01_APP\HIDROFLOW\src\HidroFlow.jsx:228:function calcHUSCS_Mod(area, tc_h, dt_min, Cp=2.08){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:229:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:230:  const qp=Cp*area/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:231:  const n=Math.ceil(3.0*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:232:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:233:    const t=i*dh, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:234:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:235:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:236:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:237:  return{tp,qp:normalizado.qp,Tc:tc_h*60,uh:normalizado.uh,Cp,factorNormalizacion:normalizado.factor,metadata:{nombre:"SCS Mod.",color:C.teal}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:238:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:239:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:240:// ③ HU SNYDER (Chow et al. 1994 — versión Ct/Cp configurable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:241:function calcHUSnyder(area_mi2, L_mi, Lca_mi, dt_min, Ct=2.0, Cp=0.62){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:242:  const tlag=Ct*Math.pow(L_mi*Lca_mi,0.3);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:243:  const tp=tlag+dt_min/60/2;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:244:  const qp=(640*Cp*area_mi2)/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:245:  const W50=770/Math.pow(qp/area_mi2,1.08);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:246:  const W75=440/Math.pow(qp/area_mi2,1.08);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:247:  const n=Math.ceil(5*(tp+tlag)/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:248:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:249:    const t=i*dt_min/60, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:250:    return +(tr<=1?qp*Math.pow(tr,2.5):qp*Math.exp(-2.0*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:251:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:252:  const areaKm2 = area_mi2 / 0.386102;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:253:  const normalizado = normalizarHUaMm(uh, areaKm2, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:254:  return{tp,qp:normalizado.qp,tlag,W50,W75,Ct,Cp,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Snyder",color:C.accent3}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:255:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:256:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:257:// ④ HU WILLIAMS & HANN (Williams & Hann, 1973)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:258:// Basado en: qp = 2.54·A^0.9·(S/1000)^0.5·CN^3/(Ia·A)  → simplificado
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:259:// Fórmula geomorfológica: qp=(A^m1·S^m2·CN^m3)·K_WH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:260:function calcHUWilliamsHann(area, L_km, S_m_km, CN, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:261:  // Williams & Hann (1973): Tc = 0.1838·L^0.8·(S+1)^0.7 / (CN^0.35·S^0.5)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:262:  const Ss = 25400/CN - 254;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:263:  const tc_h = (0.1838*Math.pow(L_km,0.8)*Math.pow(Ss+1,0.7)) / (Math.pow(CN,0.35)*Math.pow(Math.max(S_m_km,0.01),0.5)) / 60;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:264:  const tp = 0.5*(dt_min/60) + 0.6*tc_h;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:265:  // Caudal pico Williams & Hann: qp = 2.083·A/tp · κ donde κ = 1.12 (calibración W&H)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:266:  const kWH = 1.12;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:267:  const qp  = kWH * 2.083 * area / tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:268:  const n   = Math.ceil(2.8*tp/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:269:  const uh  = Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:270:    const t=i*dt_min/60, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:271:    return +(tr<=1?qp*Math.pow(tr,2.208):qp*Math.exp(-1.25*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:272:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:273:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:274:  return{tp,qp:normalizado.qp,tc_h,Tc:tc_h*60,Ss,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Williams & Hann",color:C.gold}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:275:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:276:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:277:// ④b CLARK IUH (Clark, 1945) — Hidrograma Unitario Instantáneo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:278:// IUH de Clark: u(t) = qp·exp(-t/R) para t>tp, crecida lineal hasta tp
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:279:// Parámetros: tc (tiempo concentración), R (coef. almacenamiento cuenca)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:280:// R = k_R * tc  (típico k_R = 0.5–2.0, default 1.2)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:281:function calcClarkIUH(area, tc_h, dt_min, kR=1.2){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:282:  const dh   = dt_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:283:  const R    = kR * tc_h;  // coeficiente almacenamiento
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:284:  const qp   = 2.08*area/tc_h;  // caudal pico IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:285:  const n    = Math.ceil((tc_h + 6*R)/dh) + 12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:286:  const uh   = Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:287:    const t = i*dh;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:288:    // Antes de tc: crecida lineal; después: recesión exponencial
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:289:    const u = t<=tc_h ? qp*(t/tc_h) : qp*Math.exp(-(t-tc_h)/R);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:290:    return +Math.max(u,0).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:291:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:292:  const tp   = tc_h;  // tiempo al pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:293:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:294:  return{tp,qp:normalizado.qp,tc_h,R,kR,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Clark IUH",color:C.accent4}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:295:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:296:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:297:// ─── HIDROGRAMA COMPLETO (hietograma → convolución → Q(t)) ───────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:298:function calcHidroCompleto(lluvRows, uh_struct, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:299:  const peList=lluvRows.slice(1).map(r=>r.PeIncrem).filter((v,i,a)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:300:    // Incluir todos los incrementos positivos y su contexto
  01_APP\HIDROFLOW\src\HidroFlow.jsx:301:    return v>0 || (a[i-1]>0||a[i+1]>0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:302:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:303:  const peAll = lluvRows.slice(1).map(r=>Math.max(r.PeIncrem||0,0));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:304:  const qSeries = convolucion(uh_struct.uh, peAll, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:305:  const Qpico = Math.max(...qSeries.map(r=>r.Q));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:306:  const tPico = qSeries.find(r=>r.Q>=Qpico*0.9999)?.t || 0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:307:  const volTotal = qSeries.reduce((s,r)=>s+r.Q*(dt_min*60),0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:308:  return{qSeries, Qpico:+Qpico.toFixed(6), tPico:+tPico.toFixed(2),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:309:    volTotal:+volTotal.toFixed(1), metodo:uh_struct.metadata.nombre,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:310:    color:uh_struct.metadata.color};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:311:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:312:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:313:// ─── FUNCIONES AUXILIARES ────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:314:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:315:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:316:// Volumen de almacenamiento SAR (GT-AS-004 §3.8)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:317:function calcVolSAR(qPost, qPre, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:318:  const n=Math.min(qPost.length,qPre.length);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:319:  let volAcum=0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:320:  const exc=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:321:  for(let i=0;i<n;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:322:    const diff=qPost[i].Q-(qPre[i]?.Q||0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:323:    if(diff>0) volAcum+=diff*dt_min*60;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:324:    exc.push({t:qPost[i].t, Qpost:+qPost[i].Q.toFixed(5), Qpre:+(qPre[i]?.Q||0).toFixed(5),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:325:      exceso:+Math.max(diff,0).toFixed(5), volAcum:+volAcum.toFixed(1)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:326:  }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:327:  return{excesos:exc, volTotal:+volAcum.toFixed(1)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:328:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:329:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:330:// Resumen racional
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:function calcRacional(est,area,tc_min,CN){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:332:  const S=25400/CN-254,Ia=0.2*S;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:333:  return TR_LIST.map(Tr=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:334:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:335:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:336:    const Cc=P>0?Math.min(Pe/P,1):0.3;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:337:    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:338:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:339:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:340:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:341:function buildResumenQ(params, est, dtMin, CNact) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:342:  const tcList = calcTc(params).filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:343:  const tc_h = tcList[0]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:344:  const metodos = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:345:    { nombre: 'SCS',     make: () => calcHUSCS(params.area, tc_h, dtMin) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:346:    { nombre: 'SCS Mod', make: () => calcHUSCS_Mod(params.area, tc_h, dtMin, 2.08) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:347:    { nombre: 'Snyder',  make: () => calcHUSnyder(params.area*0.386102, params.longitud_cauce*0.621371, params.longitud_cauce*0.621371*0.35, dtMin) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:348:    { nombre: 'W&H',     make: () => calcHUWilliamsHann(params.area, params.longitud_cauce, (params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce, CNact, dtMin) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:349:    { nombre: 'Clark',   make: () => calcClarkIUH(params.area, tc_h, dtMin, 1.2) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:350:  ];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:351:  return metodos.map(m => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:352:    const row = { metodo: m.nombre };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:353:    TR_LIST.forEach(Tr => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:354:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
  01_APP\HIDROFLOW\src\HidroFlow.jsx:355:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:356:      const HU   = m.make();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:357:      const H    = calcHidroCompleto(Pe, HU, dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:358:      row[Tr]    = +H.Qpico.toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:359:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:360:    return row;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:361:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:362:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:363:// ─── EXPORTACIÓN EXCEL (SheetJS) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:364:async function exportarExcel(datos){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:365:  const XLSX = await import("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").catch(()=>null);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:366:  if(!XLSX) return alert("Error cargando SheetJS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:367:  const WX = XLSX.default || XLSX;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:368:  const wb = WX.utils.book_new();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:369:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:370:  // Hoja 1: Parámetros de diseño
  01_APP\HIDROFLOW\src\HidroFlow.jsx:371:  const ws1 = WX.utils.aoa_to_sheet([
  01_APP\HIDROFLOW\src\HidroFlow.jsx:372:    ["HIDROFLOW v3.0 — GT-AS-004 · EPM 2025"],[""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:373:    ["PARÁMETROS DE CUENCA Y DISEÑO"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:374:    ["Parámetro","Valor","Unidad"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:375:    ["Cuenca",datos.nombre_cuenca,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:376:    ["Área",datos.area,"km²"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:377:    ["Perímetro",datos.perimetro,"km"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:378:    ["Longitud cauce",datos.longitud_cauce,"km"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:379:    ["Pendiente media cuenca",datos.pendiente_cuenca,"%"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:394:  WX.utils.book_append_sheet(wb,ws1,"Parámetros");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:395:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:396:  // Hoja 2: Hietograma
  01_APP\HIDROFLOW\src\HidroFlow.jsx:397:  if(datos.hiet){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:398:    const rows=[["t (min)","T (%)","P acum (mm)","P increm (mm)","i bloque (mm/h)"]];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:399:    datos.hiet.data.forEach(r=>rows.push([r.t,r.tPct,r.pAcum,r.pIncrem||0,r.iBloque||0]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:400:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hietograma");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:401:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:402:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:403:  // Hoja 3: Hidrogramas comparativos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:404:  if(datos.hidros){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:405:    const header=["t (min)",...datos.hidros.map(h=>h.metodo+" Q(m³/s)")];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:406:    const len=Math.max(...datos.hidros.map(h=>h.qSeries.length));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:407:    const rows=[header];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:408:    for(let i=0;i<len;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:409:      const row=[+(i*datos.dt_min).toFixed(2),...datos.hidros.map(h=>h.qSeries[i]?.Q||0)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:410:      rows.push(row);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:411:    }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:412:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hidrogramas");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:413:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:414:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:415:  // Hoja 4: Volumen SAR
  01_APP\HIDROFLOW\src\HidroFlow.jsx:416:  if(datos.volSAR){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:417:    const rows=[["t (min)","Q post (m³/s)","Q pre (m³/s)","Exceso (m³/s)","Vol. Acum. (m³)"]];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:418:    datos.volSAR.excesos.filter((_,i)=>i%Math.max(1,Math.floor(datos.volSAR.excesos.length/500))===0)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:419:      .forEach(r=>rows.push([r.t,r.Qpost,r.Qpre,r.exceso,r.volAcum]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:420:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Vol_SAR");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:421:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:422:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:423:  // Hoja 5: Resumen caudales
  01_APP\HIDROFLOW\src\HidroFlow.jsx:424:  if(datos.resumenQ){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:425:    const rows=[["Método","Tr=2.33a","Tr=5a","Tr=10a","Tr=25a","Tr=50a","Tr=100a"]];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:426:    datos.resumenQ.forEach(r=>rows.push([r.metodo,...TR_LIST.map(t=>r[t]||0)]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:427:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Resumen_Q");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:428:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:429:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:430:  WX.writeFile(wb,`HidroFlow_${datos.nombre_cuenca.replace(/\s/g,"_")}_${datos.Tr}a.xlsx`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:431:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:432:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:433:// ─── EXPORTACIÓN PDF (jsPDF + html2canvas) ────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:434:async function exportarPDF(refEl, datos){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:435:  try{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:436:    const [h2c, jsPDF_mod] = await Promise.all([
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:437:      import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:438:      import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:439:    ]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:440:    const html2canvas=h2c.default||h2c;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:441:    const {jsPDF}=jsPDF_mod.default||jsPDF_mod;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:442:    const canvas=await html2canvas(refEl,{scale:1.5,backgroundColor:"#07090F",useCORS:true});
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:443:    const imgData=canvas.toDataURL("image/jpeg",0.92);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:444:    const pdf=new jsPDF({orientation:"landscape",unit:"mm",format:"a3"});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:445:    const pw=pdf.internal.pageSize.getWidth();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:446:    const ph=pdf.internal.pageSize.getHeight();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:447:    const ratio=Math.min(pw/canvas.width,ph/canvas.height)*0.95;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:448:    const iw=canvas.width*ratio, ih=canvas.height*ratio;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:449:    pdf.addImage(imgData,"JPEG",(pw-iw)/2,(ph-ih)/2,iw,ih);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:450:    pdf.save(`HidroFlow_${datos.nombre_cuenca}_Tr${datos.Tr}a.pdf`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:451:  }catch(e){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:452:    console.error("PDF export error:",e);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:453:    alert("Error exportando PDF. Verifique conexión para cargar librerías.");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:454:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:455:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:456:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:457:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:458:// COMPONENTES UI
  01_APP\HIDROFLOW\src\HidroFlow.jsx:459:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:460:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:461:function Field({label,value,onChange,unit,step="0.001",type="number"}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:462:  const[f,setF]=useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:463:  return(<div style={{marginBottom:11}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:492:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:493:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:494:function Tbl({headers,rows,hiCols=[],accent=C.accent}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:495:  return(<div style={{overflowX:"auto"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:496:    <table style={{width:"100%",borderCollapse:"collapse",fontSize:10.5,fontFamily:mono}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:497:      <thead><tr>{headers.map((h,i)=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:498:        <th key={i} style={{padding:"6px 9px",background:`${C.bg}CC`,color:C.muted,textAlign:i===0?"left":"right",fontWeight:600,fontSize:9,textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:`1px solid 
${C.border}`,whiteSpace:"nowrap"}}>{h}</th>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:499:      ))}</tr></thead>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:500:      <tbody>{rows.map((row,i)=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:501:        <tr key={i} style={{background:i%2===0?"transparent":`${C.border}20`}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:502:          {Object.entries(row).map(([,v],j)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:503:            const hi=hiCols.includes(j);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:504:            return(<td key={j} style={{padding:"5px 9px",textAlign:j===0?"left":"right",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:505:              color:hi?accent:C.text,fontWeight:hi?700:400,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:506:              borderBottom:`1px solid ${C.border}18`,whiteSpace:"nowrap"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:507:              {typeof v==="number"?v.toFixed(v>9999?0:v>999?1:v>99?2:v>9?3:4):v}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:508:            </td>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:509:          })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:510:        </tr>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:511:      ))}</tbody>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:512:    </table>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:513:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:514:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:515:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:516:function BtnGroup({options,value,onChange,accent=C.accent}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:517:  return(<div style={{display:"flex",flexWrap:"wrap",gap:4}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:518:    {options.map(o=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:519:      const active=value===o.v;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:520:      return(<button key={o.v} onClick={()=>onChange(o.v)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:521:        style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${active?accent:C.border}`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:522:          cursor:"pointer",background:active?`${accent}18`:"transparent",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:523:          color:active?accent:C.muted,fontSize:10,fontFamily:mono,fontWeight:active?700:400,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:524:          transition:"all .15s"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:525:        {o.l}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:526:      </button>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:527:    })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:528:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:529:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:530:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:531:function SectionHeader({icon,title,sub,accent}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:532:  return(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:568:    {open&&<div style={{position:"absolute",top:"110%",left:0,background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,width:280,maxHeight:380,overflowY:"auto",boxShadow:"0 16px 40px #00000080",zIndex:400}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:569:      <div style={{padding:"8px 13px 6px",borderBottom:`1px solid ${C.border}`,fontSize:9,color:C.muted,fontFamily:mono}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:570:        <span style={{color:C.accent2}}>● {pdfN} PDF calibradas</span><span style={{margin:"0 8px"}}>·</span><span style={{color:C.gold}}>● {refN} de referencia</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:571:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:572:      <div style={{padding:"4px 0 2px",fontSize:9,color:C.muted,fontFamily:mono,paddingLeft:13,paddingTop:8,paddingBottom:2}}>✓ CALIBRADAS PDF EPM 2025</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:573:      {Object.entries(ESTACIONES_EPM).filter(([,v])=>v.fuente==="PDF").map(([n,v])=><StationRow key={n} name={n} est={v} sel={sel} onSel={nm=>{onSel(nm);setOpen(false)}}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:574:      <div style={{padding:"4px 0 2px",fontSize:9,color:C.muted,fontFamily:mono,paddingLeft:13,paddingTop:8,paddingBottom:2,borderTop:`1px solid ${C.border}`}}>~ REFERENCIA ESTIMADA</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:575:      {Object.entries(ESTACIONES_EPM).filter(([,v])=>v.fuente==="REF").map(([n,v])=><StationRow key={n} name={n} est={v} sel={sel} onSel={nm=>{onSel(nm);setOpen(false)}}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:576:    </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:577:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:578:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:579:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:580:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:581:// MÓDULO PARÁMETROS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:582:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:583:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:584:// ─── OUTLET MINI MAP ─────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:585:// Mini mapa SVG que muestra el punto de salida en contexto del Valle de Aburrá
  01_APP\HIDROFLOW\src\HidroFlow.jsx:586:// Se embebe dentro de la card Punto de Salida en ModParams
  01_APP\HIDROFLOW\src\HidroFlow.jsx:587:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:588:function OutletMiniMap({ lat, lon, alt, idf }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:589:  const W = 480;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:590:  const H = 165;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:591:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:592:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:593:  // 1. Estaciones EPM disponibles para contexto geográfico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:594:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:595:  const ests = Object.entries(ESTACIONES_EPM).map(([n, e]) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:596:    n,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:597:    lat: e.lat,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:598:    lon: e.lon,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:599:    alt: e.alt
  01_APP\HIDROFLOW\src\HidroFlow.jsx:600:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:601:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:602:  // Tres estaciones más cercanas al punto de salida.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:603:  // Estas estaciones son referencia geográfica, no IDF adoptada.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:604:  const cercanas = [...ests]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:605:    .sort(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:606:      (a, b) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:607:        distKm(lat, lon, a.lat, a.lon) -
  01_APP\HIDROFLOW\src\HidroFlow.jsx:608:        distKm(lat, lon, b.lat, b.lon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:609:    )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:639:        dist: distKm(lat, lon, estacionIDF.lat, estacionIDF.lon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:640:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:641:    : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:642:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:643:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:644:  // 3. Dominio del mini-mapa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:645:  // Incluye PC_80, estaciones cercanas y estación IDF adoptada.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:646:  // Esto evita que todo quede apeñuscado.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:647:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:648:  const puntosMapa = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:649:    {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:650:      n: "PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:651:      lat,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:652:      lon,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:653:      alt,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:654:      tipo: "pc"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:655:    },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:656:    ...cercanas.map((e) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:657:      ...e,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:658:      tipo: "cercana"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:659:    })),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:660:    ...(puntoIDF
  01_APP\HIDROFLOW\src\HidroFlow.jsx:661:      ? [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:662:          {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:663:            ...puntoIDF,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:664:            tipo: "idf"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:665:          }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:666:        ]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:667:      : [])
  01_APP\HIDROFLOW\src\HidroFlow.jsx:668:  ].filter(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:669:    (p) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:670:      Number.isFinite(p.lat) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:671:      Number.isFinite(p.lon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:672:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:673:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:674:  const lats = puntosMapa.map((p) => p.lat);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:675:  const lons = puntosMapa.map((p) => p.lon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:676:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:677:  const minLat = Math.min(...lats);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:678:  const maxLat = Math.max(...lats);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:679:  const minLon = Math.min(...lons);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:680:  const maxLon = Math.max(...lons);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:681:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:682:  const padLat = Math.max((maxLat - minLat) * 0.35, 0.035);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:683:  const padLon = Math.max((maxLon - minLon) * 0.35, 0.035);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:684:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:685:  const lat0 = minLat - padLat;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:686:  const lat1 = maxLat + padLat;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:687:  const lon0 = minLon - padLon;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:688:  const lon1 = maxLon + padLon;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:689:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:690:  const xMap = (lo) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:691:    `${((lo - lon0) / (lon1 - lon0)) * 100}%`;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:692:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:693:  const yMap = (la) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:694:    `${100 - ((la - lat0) / (lat1 - lat0)) * 100}%`;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:695:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:696:  // Línea conceptual PC_80 ↔ IDF adoptada
  01_APP\HIDROFLOW\src\HidroFlow.jsx:697:  const lineaIDF = puntoIDF
  01_APP\HIDROFLOW\src\HidroFlow.jsx:698:    ? {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:699:        x1: xMap(lon),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:700:        y1: yMap(lat),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:701:        x2: xMap(puntoIDF.lon),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:702:        y2: yMap(puntoIDF.lat)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:703:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:704:    : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:705:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:706:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:707:  // 4. Render
  01_APP\HIDROFLOW\src\HidroFlow.jsx:708:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:709:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:710:    <div style={{ marginTop: 12 }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:711:      {/* Encabezado técnico del mini-mapa */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:712:      <div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:713:        style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:714:          display: "flex",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:715:          flexDirection: "column",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:716:          gap: 5,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:717:          marginBottom: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:718:          fontSize: 10,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:719:          fontFamily: "monospace"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:720:        }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:721:      >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:722:        <div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:723:          style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:724:            display: "flex",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:725:            flexWrap: "wrap",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:771:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:772:          >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:773:            Referencia geográfica — estaciones cercanas:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:774:          </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:775:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:776:          {cercanas.map((e) => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:777:            <span
  01_APP\HIDROFLOW\src\HidroFlow.jsx:778:              key={`chip-${e.n}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:779:              style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:780:                padding: "2px 7px",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:781:                borderRadius: 999,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:782:                background:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:783:                  e.n === "CUCARACHO"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:784:                    ? "rgba(255,180,80,0.12)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:785:                    : `${C.accent2}12`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:786:                border:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:787:                  e.n === "CUCARACHO"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:788:                  ? "1px solid rgba(255,180,80,0.42)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:789:                  : `1px solid ${C.accent2}28`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:790:                color:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:814:          overflow: "hidden",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:815:          boxShadow: "inset 0 0 0 1px rgba(0,210,255,0.05)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:816:        }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:817:      >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:818:        {/* Grilla horizontal */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:819:        {[0, 1, 2, 3, 4].map((i) => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:820:          <div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:821:            key={`grid-h-${i}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:822:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:823:              position: "absolute",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:824:              left: 0,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:825:              right: 0,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:826:              top: `${15 + i * 18}%`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:827:              borderTop: "1px solid rgba(90,130,180,0.10)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:828:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:829:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:830:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:831:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:832:        {/* Grilla vertical */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:833:        {[0, 1, 2, 3, 4].map((i) => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:834:          <div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:835:            key={`grid-v-${i}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:836:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:837:              position: "absolute",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:838:              top: 0,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:839:              bottom: 0,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:840:              left: `${12 + i * 20}%`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:841:              borderLeft: "1px solid rgba(90,130,180,0.07)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:842:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:843:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:844:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:845:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:846:        {/* Río Medellín — referencia oriental del valle.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:847:    La subcuenca La Iguaná PC_80 se representa al occidente del río.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:920:        {/* Línea IDF–PC_80 desactivada.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:921:    La relación IDF es pluviométrica, no una conexión hidráulica.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:922:    Se evita sugerir cruce físico del Río Medellín. */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:923:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:924:        {/* Estaciones cercanas: referencia geográfica */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:925:        {cercanas.map((e) => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:926:          <div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:927:            key={`cercana-${e.n}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:928:            title={`${e.n} · ${distKm(lat, lon, e.lat, e.lon).toFixed(1)} km`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:929:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:930:              position: "absolute",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:931:              left: xMap(e.lon),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:932:              top: yMap(e.lat),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:933:              width: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:934:              height: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:935:              borderRadius: "50%",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:936:              background:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:937:                e.n === "CUCARACHO"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:938:                  ? "rgba(255, 180, 80, 0.88)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:939:                  : "rgba(105, 145, 190, 0.60)",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:940:              transform: "translate(-50%, -50%)",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:941:              boxShadow:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:942:                e.n === "CUCARACHO"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:943:                  ? "0 0 13px rgba(255,180,80,0.70)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:944:                  : "0 0 7px rgba(105,145,190,0.38)",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:945:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:946:              zIndex: 4
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1110:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1111:// ───────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1112:// Subcomponente: Card "Condición de Humedad (AMC) y Urbanización"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1113:// (versión con hooks por named import: useState/useEffect/useCallback)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1114:// ───────────────────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1115:function AMCPanel({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1116:  // Normalizaciones (evitan NaN/undefined)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1117:  const amcSel = params?.amcActual ?? "II";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    ? params.porcentajeImpermeable
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1120:    : 60; // ← unifica default con ModHidrogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1121:  const cnBase = Number.isFinite(params?.cnBase)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1122:    ? params.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1123:    : (Number.isFinite(params?.CN) ? params.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1124:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1125:  // Estado local para el slider (evita flood al arrastrar)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1126:  const [pctLive, setPctLive] = useState(pctImp);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1127:  useEffect(() => { setPctLive(pctImp); }, [pctImp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1128:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1129:  // Commit del % Impermeable (al soltar / perder foco)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1130:  const commitPct = useCallback((v) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1131:    setParams(prev => ({ ...prev, porcentajeImpermeable: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1132:    if (import.meta.env.DEV) console.log("[AMC]", "%Impermeable ->", v);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1133:  }, [setParams]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1134:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1135:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1136:    <div style={{ marginTop: 16, padding: 16, border: '1px solid #1F2F45', borderRadius: 10, background: '#0F1624' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1137:      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1138:        <h3 style={{ margin: 0, fontSize: 16 }}>Condición de Humedad (AMC) y Urbanización</h3>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1139:        <small style={{ opacity: 0.75 }}>Ajusta AMC, % Impermeable y CN II base</small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1140:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1141:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1142:      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'start' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1143:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1144:        {/* AMC I/II/III */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1145:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1146:          <label style={{ display: 'block', marginBottom: 8 }}>AMC</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1147:          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1148:            {["I", "II", "III"].map(a => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1149:              const sel = (amcSel === a);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1150:              return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1151:                <button
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1152:                  key={a}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1153:                  type="button"  // evita submit si hay <form> ancestro
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1154:                  onClick={() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1155:                    setParams(prev => ({ ...prev, amcActual: a }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1156:                    if (import.meta.env.DEV) console.log("[AMC]", "amcActual ->", a);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1157:                  }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1158:                  style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1159:                    padding: '8px 12px',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1160:                    borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1161:                    cursor: 'pointer',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1162:                    border: sel ? '1px solid #00F5A0' : '1px solid #1F2F45',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1163:                    background: sel ? '#12242A' : '#0B0F1A',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1164:                    color: '#D8E4F0'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1165:                  }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1166:                >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1167:                  AMC {a}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1168:                </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1169:              );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1178:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1179:          <label style={{ display: 'block', marginBottom: 8 }}>% Impermeable</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1180:          <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1181:            type="range" min={0} max={100} step={1}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1182:            value={pctLive}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1183:            onChange={e => setPctLive(+e.target.value)}               // solo UI mientras arrastras
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1184:            onPointerUp={() => commitPct(pctLive)}                    // commit al soltar (touch/pen)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1185:            onMouseUp={() => commitPct(pctLive)}                      // commit al soltar (mouse)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1186:            onBlur={() => commitPct(pctLive)}                         // commit al salir del control
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1187:            style={{ width: '100%' }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1188:            aria-label="% Impermeable"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1189:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1190:          <div style={{ marginTop: 8, fontFamily: 'monospace' }}>{pctLive}%</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1191:          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1192:            Pondera CN mezclando suelo permeable e impermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1193:          </small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1194:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1195:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1196:        {/* CN II base */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1197:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1198:          <label style={{ display: 'block', marginBottom: 8 }}>CN II base</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1199:          <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1200:            type="number" min={30} max={98} step={0.1}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1201:            value={cnBase}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1202:            onChange={e => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1203:              const v = +e.target.value;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1204:              setParams(prev => ({ ...prev, cnBase: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1205:              if (import.meta.env.DEV) console.log("[AMC]", "cnBase ->", v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1206:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1207:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1208:              width: '100%', padding: 8, borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1209:              border: '1px solid #1F2F45', background: '#0B0F1A', color: '#D8E4F0'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1210:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1211:            aria-label="CN II base"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1212:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1213:          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1214:            Si no defines CN II base, se usa el CN clásico (params.CN)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1215:          </small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1216:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1217:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1218:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1219:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1220:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1221:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1222:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1223:function ModParams({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1224:  // Cálculos de Tc y utilidades locales
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1225:  const tc      = useMemo(() => calcTc(params), [params]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1226:  const set     = k => v => setParams(p => ({ ...p, [k]: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1227:  const tcStats = tc.filter(r => isFinite(r.h) && r.h > 0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1228:  const tcMed   = tcStats.length ? tcStats.reduce((s, r) => s + r.h, 0) / tcStats.length : 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1229:  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1230:  // Persistir Tc medio (min) en params para otros módulos (Hietogramas, Hidrogramas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1231:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1232:    if (!isFinite(tcMed) || tcMed <= 0) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1233:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1234:    const tcMedMin = tcMed * 60; // horas → minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1235:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1236:    if (params.tcMedMin === tcMedMin) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1237:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1238:    setParams(p => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1239:     ...p,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1240:     tcMedMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1241:   }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1242: }, [tcMed, params.tcMedMin, setParams]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1243: ``
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1244:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1245:    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1246:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1247:      {/* ── Morfometría / Índices / Tc (bloque superior) ───────────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1248:      <SectionHeader
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1249:        icon="⬡"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1250:        title="Morfometría de Cuenca"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1251:        sub="Parámetros geomorfológicos · Índices · Tiempos de concentración"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1252:        accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1253:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1254:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1255:      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "start" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1256:        {/* Identificación */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1257:        <Card title="Identificación" accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1258:          <Field label="Nombre cuenca" value={params.nombre_cuenca} onChange={set("nombre_cuenca")} type="text" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1259:          <Field label="Δt cálculo"     value={params.dt}            onChange={set("dt")}             unit="min" step="0.5" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1260:          <Field label="CN (CNII)"       value={params.CN}            onChange={set("CN")}             step="1" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1261:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1262:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1263:        {/* Punto de Salida (Outlet) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1264:        <Card title="Punto de Salida (Outlet)" accent={C.teal} style={{ gridColumn: "1 / -1" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1265:          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1277:              <div>Alt: <span style={{ color: C.text }}>{+params.alt_salida || 0} msnm</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1278:              <div style={{ marginTop: 4, color: C.muted2, fontSize: 7.5 }}>Usado en: Influencia · SIATA · IDF ponderada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1279:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1280:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1281:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1282:          {/* Mini‑mapa del outlet (asegura numeric cast con +) */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1283:          <OutletMiniMap
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1284:            lat={+params.lat_salida || 6.185083}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1285:            lon={+params.lon_salida || -75.659972}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1286:            alt={+params.alt_salida || 1702}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1287:            idf={params.idf}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1288:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1289:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1290:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1291:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1292:        {/* Geometría */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1293:        <Card title="Geometría" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1294:          <Field label="Área"            value={params.area}            onChange={set("area")}            unit="km²" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1295:          <Field label="Perímetro"       value={params.perimetro}       onChange={set("perimetro")}       unit="km" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1296:          <Field label="Longitud cauce"  value={params.longitud_cauce}  onChange={set("longitud_cauce")}  unit="km" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1297:          <Field label="Longitud cuenca" value={params.longitud_cuenca} onChange={set("longitud_cuenca")} unit="km" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1307:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1308:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1309:      {/* ⬆️ Cierre del grid de Morfometría — PUNTO DE INSERCIÓN CORRECTO */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1310:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1311:      {/* ── Card AMC y Urbanización (subcomponente) ────────────────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1312:      <AMCPanel params={params} setParams={setParams} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1313:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1314:      {/* ── KPIs de forma, compacidad, pendiente y Tc promedio ─────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1315:      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1316:        {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1317:          { v: (params.perimetro / (2 * Math.sqrt(Math.PI * params.area))).toFixed(3),   l: "Índice Gravelius", s: "Kc", a: C.accent },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1318:          { v: ((params.longitud_cuenca ** 2) / params.area).toFixed(3),                 l: "Índice de Forma", s: "Rf", a: C.accent2 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1319:          { v: (params.area / (params.longitud_cuenca ** 2)).toFixed(4),                 l: "Coef. Compacidad", s: "Cc", a: C.accent3 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1320:          { v: ((params.cota_max - params.cota_min) / (params.longitud_cauce * 1000) * 1000).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1321:            l: "Pendiente cauce", s: "So ‰", a: C.gold },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1322:          { v: (tcMed * 60).toFixed(2),                                                  l: "Tc promedio", s: "min", a: C.accent4 },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1323:        ].map(({ v, l, s, a }) => <Kpi key={l} value={`${v} ${s}`} label={l} accent={a} />)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1324:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1325:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1326:      {/* ── Tabla de Tiempos de Concentración (6 métodos) ─────────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1327:      <Card title="Tiempos de Concentración — 6 Métodos" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1328:        <Tbl
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1329:          headers={["Método", "Tc (h)", "Tc (min)", "Δ vs. media (%)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1330:          rows={tc.filter(r => isFinite(r.h) && r.h > 0).map(r => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1331:            M: r.m,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1332:            H: +r.h.toFixed(4),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1333:            MIN: +r.min.toFixed(3),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1334:            DELTA: +((r.h - tcMed) / tcMed * 100).toFixed(1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1335:          }))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1336:          hiCols={[2]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1337:          accent={C.teal}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1338:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1339:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1340:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1341:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1342:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1343:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1344:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1345:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1346:// MÓDULO IDF — Curvas Intensidad-Duración-Frecuencia
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1347:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1348:function ModIDF({est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1349:  const DURS=[5,10,15,20,30,45,60,90,120,180,240,360];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1350:  const idfData=useMemo(()=>DURS.map(d=>({d,...Object.fromEntries(TR_LIST.map(T=>[`Tr${T}`,+idfI(est,d,T).toFixed(2)]))})),[est]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1351:  const curvasData=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1352:    const pts=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1353:    for(let d=5;d<=360;d+=5){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1354:      const row={d};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1355:      TR_LIST.forEach(T=>row[`Tr${T}`]=+idfI(est,d,T).toFixed(2));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1356:      pts.push(row);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1357:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1358:    return pts;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1359:  },[est]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1360:  // Comparativa 20 estaciones a d=30min, Tr=100a
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1361:  const compData=useMemo(()=>Object.entries(ESTACIONES_EPM).map(([n,e])=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1362:    est:n.length>12?n.substring(0,12)+"…":n,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1363:    I100:+idfI(e,30,100).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1364:    fuente:e.fuente,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1365:  })).sort((a,b)=>b.I100-a.I100),[]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1366:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1367:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1368:    <SectionHeader icon="⌁" title="Curvas IDF — 20 Estaciones EPM 2025" sub={`I = k/(c+d)ⁿ · d en horas · c = 0.4 · Gumbel · 2000–2023`} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1369:    <div style={{background:`${C.accent2}08`,border:`1px solid ${C.accent2}20`,borderRadius:10,padding:"10px 15px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1370:      <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1371:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.08em"}}>Estación activa · {est.fuente==="PDF"?"✓ Calibrada PDF EPM 5/11/2024":"~ Referencia estimada"}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1372:        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>{name}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1373:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1374:      <div style={{display:"flex",gap:8,flexWrap:"wrap",fontFamily:mono,fontSize:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1375:        {[["Código",est.codigo],["Lat.",est.lat.toFixed(5)],["Lon.",est.lon.toFixed(5)],["Alt.",est.alt+" msnm"],["Fuente",est.fuente]].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1376:          <div key={l} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"4px 10px"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1377:            <span style={{color:C.muted}}>{l}: </span><span style={{color:C.text,fontWeight:600}}>{v}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1378:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1379:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1380:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1381:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1382:    <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1383:      <Card title={`Curvas IDF — ${name}`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1384:        <ResponsiveContainer width="100%" height={280}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1385:          <LineChart data={curvasData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1386:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1387:            <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1388:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1389:            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" mm/h",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1390:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1391:            {TR_LIST.map((T,i)=><Line key={T} type="monotone" dataKey={`Tr${T}`} stroke={CC[i]} strokeWidth={1.8} dot={false} name={`Tr=${T}a`}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1392:          </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1393:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1394:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1395:      <Card title="Tabla IDF — Intensidades (mm/h)" accent={C.accent3}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1396:        <Tbl headers={["d(min)",...TR_LIST.map(T=>`Tr=${T}a`)]} rows={idfData.map(r=>({d:r.d,...Object.fromEntries(TR_LIST.map(T=>[T,r[`Tr${T}`]]))}))} hiCols={[6]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1397:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1398:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1399:    <Card title="Comparativa 20 Estaciones — I(d=30min, Tr=100a)" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1400:      <ResponsiveContainer width="100%" height={220}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1401:        <BarChart data={compData} margin={{left:0,right:14,top:8,bottom:44}} layout="vertical">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1402:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1403:          <XAxis type="number" tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",position:"insideBottom",offset:-8,fill:C.muted,fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1404:          <YAxis type="category" dataKey="est" tick={{fill:C.muted,fontSize:8}} width={90}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1405:          <Tooltip contentStyle={TT} formatter={v=>[v+" mm/h","I"]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1406:          <Bar dataKey="I100" radius={[0,3,3,0]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1407:            fill={C.accent3}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1408:            label={{position:"right",fill:C.muted2,fontSize:8,formatter:v=>v}}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1409:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1410:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1411:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1412:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1413:    <Card title="Parámetros k · n · c — Todos los Tr" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1414:      <Tbl headers={["Tr (años)","k","n","c","I(10min)","I(30min)","I(60min)","I(120min)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1415:        
rows={TR_LIST.map(T=>{const{k,n,c}=est.params[String(T)]||{k:0,n:1,c:0.4};return{T,k:+k.toFixed(4),n:+n.toFixed(4),c,I10:+idfI(est,10,T).toFixed(2),I30:+idfI(est,30,T).toFixed(2),I60:+idfI(est,60,T).toFixed(2),I120:+idfI(est,120,T).toFixed(2)};})}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1416:        hiCols={[4]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1417:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1418:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1419:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1420:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1421:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1422:// MÓDULO HIETOGRAMAS — Distribución temporal + Curvas Huff
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1423:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1424:function ModHietogramas({ est, name, params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1425:  const [Tr, setTr] = useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1426:  const [durH, setDurH] = useState(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1427:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1428:  // Sync dtMin when params.dt changes externally (ej: carga de datos)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1429:  useEffect(() => { if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt); }, [params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1430:  const [guardarAMCenPanel, setGuardarAMCenPanel] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1431:  const [distType, setDistType] = useState("EPM_Q1");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1432:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1433:  // Hietograma activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1434:  const hiet = useMemo(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1435:    () => calcHietograma(est, Tr, durH, dtMin, distType),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1436:    [est, Tr, durH, dtMin, distType]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1437:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1438:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1439:  // Hietogramas comparativos de todas las distribuciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1440:  const hietAll = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1441:    const types = ["EPM_Q1", "Huff_Q1", "Huff_Q2", "Huff_Q3", "Huff_Q4"];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1442:    return types.map(tp => ({ tp, data: calcHietograma(est, Tr, durH, dtMin, tp) }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1443:  }, [est, Tr, durH, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1444:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1445:  // === Día 3 (MVP) — Orquestación P → Pn → UH → Q(t) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1446:  // Vector de incrementos (mm por bloque) y Δt
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1447:  const P_mm  = hiet.data.map((r, i, a) => (i === 0 ? 0 : +(r.pAcum - a[i - 1].pAcum).toFixed(5)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1448:  const dt_min = dtMin;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1449:  const A_km2  = Number.isFinite(params?.area) ? params.area : 36.58;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1450:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1451:  // === Tc sugerido desde Panel (geomorfología) — informe amigable ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1452:  const tcList = useMemo(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1453:    () => calcTc(params).filter(r => isFinite(r.h) && r.h > 0),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1454:    [params]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1455:  ); // r.min está en minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1456:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1457:  const Tc_sugerido_min = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1458:    if (!tcList.length) return 120;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1459:    const s = [...tcList.map(r => r.min)].sort((a, b) => a - b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1460:    const mid = Math.floor(s.length / 2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1461:    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1462:  }, [tcList]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1463:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1464:  // Override opcional (para análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1465:  const [usarOverrideTc, setUsarOverrideTc] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1466:  const [Tc_override_min, setTcOverride]   = useState(Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1467:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1468:  // Tc efectivo que entra a Q(t)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1469:  const tc_min = usarOverrideTc
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1470:  ? Tc_override_min 
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1471:  : +(params?.tcMedMin ?? Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1472:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1473:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1489:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1490:  // Informe amigable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1491:  const infoTc = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1492:    if (!tcList.length) return "Sin Tc: faltan parámetros geomorfológicos.";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1493:    const etiquetas = tcList
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1494:      .map(r => `${r.m.split(" ")[0]}: ${r.min.toFixed(1)} min`)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1495:      .join(" · ");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1496:    return `Tc sugerido = mediana de ${tcList.length} métodos -> ${Tc_sugerido_min.toFixed(1)} min. [${etiquetas}]`;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1497:  }, [tcList, Tc_sugerido_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1498:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1499:  // === SCS‑CN desde Preliminares + override + AMC auto (SIATA) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1500:  const CN_panel        = Number.isFinite(params?.cnBase) ? params.cnBase : (params.CN ?? 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1501:  const AMC_panel       = params?.amcActual ?? "II"; // "I" | "II" | "III"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1502:  const pctImperv_panel = Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1503:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1504:  // Override SCS‑CN (para análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1505:  const [overrideSCS, setOverrideSCS] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1506:  const [CN_ovr, setCN_ovr]          = useState(CN_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1507:  const [AMC_ovr, setAMC_ovr]        = useState(AMC_panel);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1508:  const [pctImp_ovr, setPctImp_ovr]  = useState(pctImperv_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1509:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1510:  // Valores efectivos (panel u override)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1511:  const CN        = overrideSCS ? CN_ovr     : CN_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1512:  const AMC       = overrideSCS ? AMC_ovr    : AMC_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1513:  const pctImperv = overrideSCS ? pctImp_ovr : pctImperv_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1514:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1515:  // Chequeos amables de rango (usa '-' ASCII para evitar tofu en monospace)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1516:  const scsAviso = [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1517:  if (CN < 30 || CN > 98) scsAviso.push("CN fuera de 30-98");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1518:  if (pctImperv < 0 || pctImperv > 100) scsAviso.push("% Impermeable fuera de 0-100");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1519:  if (!["I", "II", "III"].includes(AMC)) scsAviso.push("AMC debe ser I/II/III");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1520:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1521:  // AMC automático (SIATA) — opcional
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1522:  const [usarAMCauto, setUsarAMCauto] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1561:      amcInforme: amcAuto.amcInforme || `AMC ${amcAuto.amcActual} (auto)`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1562:      amcFecha:   stamp,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1563:      amcHSref:   typeof hs_demo === "number" ? hs_demo : undefined
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1564:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1565:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1566:    // Requiere que ModHietogramas reciba setParams como prop
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1567:    setParams(prev => ({ ...prev, ...payload }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1568:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1569:}, [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1570:  guardarAMCenPanel,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1571:  usarAMCauto,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1572:  amcAuto?.amcActual,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1573:  amcAuto?.amcFuente,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1574:  amcAuto?.amcInforme,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1575:  hs_demo,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1576:  params?.amcActual,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1577:  setParams
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1578:]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1579:  /**
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1580:   * exportarPNGDesdeRef
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1581:   * @param {React.RefObject} refNodo       ref al contenedor (div) que envuelve ResponsiveContainer
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1582:   * @param {string}          nombreArchivo nombre del PNG a descargar
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1583:   */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1584:  const exportarPNGDesdeRef = async (refNodo, nombreArchivo) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1585:    // Import desde CDN — @vite-ignore evita que Vite lo resuelva como paquete local
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1586:    const moduloH2C = await import(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1587:      /* @vite-ignore */ "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1588:    );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1589:    const html2canvas = moduloH2C.default ?? moduloH2C;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1590:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1591:    if (!refNodo?.current) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1592:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1593:    const canvas = await html2canvas(refNodo.current, {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1594:      backgroundColor: "#0B0F1A", // coherente con el fondo de tu UI
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1595:      scale: 2,                   // buena resolución para reportes
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1596:      useCORS: true
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1597:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1598:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1599:    const url = canvas.toDataURL("image/png", 0.95);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1600:    const a = document.createElement("a");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1601:    a.href = url;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1602:    a.download = nombreArchivo;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1603:    a.click();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1604:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1605:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1606:  // Combinar bloques de intensidad para gráfica comparativa
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1607:  const compData = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1608:    const len = hiet.data.length;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1609:    const step = Math.max(1, Math.floor(len / 60));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1610:    return hiet.data.slice(1).filter((_, i) => i % step === 0).map((r, idx) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1611:      const obj = { t: r.t, EPM_Q1: r.iBloque };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1612:      hietAll.forEach(h => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1613:        const j = Math.min(idx * step + 1, h.data.data.length - 1);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1614:        const match = h.data.data[j];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1615:        if (match) obj[h.tp] = match.iBloque || 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1616:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1617:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1618:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1619:  }, [hiet, hietAll]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1620:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1621:  // Distribuciones adimensionales comparadas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1622:  const distMerge = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1623:    return Array.from({ length: 21 }, (_, i) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1624:      const T = i * 5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1625:      return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1626:        T,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1627:        EPM_Q1:  interpDist(DIST_TEMPORAL_Q1, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1628:        Huff_Q1: interpDist(HUFF_DATA.Q1, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1629:        Huff_Q2: interpDist(HUFF_DATA.Q2, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1630:        Huff_Q3: interpDist(HUFF_DATA.Q3, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1631:        Huff_Q4: interpDist(HUFF_DATA.Q4, T),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1632:      };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1633:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1634:  }, []);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1635:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1636:  const dispFilt = hiet.data.filter((_, i) => i % Math.max(1, Math.floor(hiet.data.length / 80)) === 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1637:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1638:  // ────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1639:  // RENDER
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1640:  // ────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1641:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1642:    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1643:      <SectionHeader
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1644:        icon="🌧"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1645:        title="Hietogramas de Diseño — Distribución Temporal"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1646:        sub="GT-AS-004 §3.3 · Curvas Huff · 5 distribuciones comparadas"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1647:        accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1648:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1649:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1650:      {/* Controles */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1651:      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1652:        <Card title="Período de Retorno" accent={C.gold}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1653:          <BtnGroup options={TR_LIST.map(t => ({ v: t, l: `${t}a` }))} value={Tr} onChange={setTr} accent={C.gold} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1654:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1655:        <Card title="Duración" accent={C.accent3}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1656:          <BtnGroup options={[1, 2, 3, 6, 12].map(h => ({ v: h, l: `${h}h` }))} value={durH} onChange={setDurH} accent={C.accent3} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1657:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1658:        <Card title="Intervalo Δt" accent={C.accent}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1659:          <BtnGroup options={[5, 10, 15, 30].map(d => ({ v: d, l: `${d}'` }))} value={dtMin} onChange={setDtMin} accent={C.accent} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1660:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1661:        <Card title="Distribución activa" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1662:          <BtnGroup
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1663:            options={[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1664:              { v: "EPM_Q1", l: "EPM Q1" }, { v: "Huff_Q1", l: "Huff Q1" },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1665:              { v: "Huff_Q2", l: "Huff Q2" }, { v: "Huff_Q3", l: "Huff Q3" }, { v: "Huff_Q4", l: "Huff Q4" },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1666:            ]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1667:            value={distType}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1668:            onChange={setDistType}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1669:            accent={C.accent2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1670:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1671:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1672:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1673:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1674:      {/* KPIs */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1675:      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1676:        <Kpi value={hiet.Ptotal + " mm"} label="P total" accent={C.accent} sub={`Tr=${Tr}a`} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1677:        <Kpi
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1678:          value={Math.max(...hiet.data.slice(1).map(r => r.iBloque || 0)).toFixed(2) + " mm/h"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1679:          label="i máxima bloque"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1680:          accent={C.accent3}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1681:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1682:        <Kpi value={(hiet.Ptotal * 0.75).toFixed(1) + " mm"} label="P en 1er quartil" accent={C.accent2} sub="~75% en primeros 25%" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1683:        <Kpi value={`${durH}h · ${dtMin}' · ${hiet.steps}bloq`} label="Configuración" accent={C.muted2} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1684:        <Kpi value={distType.replace("_", " ")} label="Distribución" accent={distType === "EPM_Q1" ? C.accent2 : C.gold} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1685:        <Kpi value={name.length > 12 ? name.substring(0, 12) + "…" : name} label="Estación IDF" accent={C.accent4} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1686:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1687:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1688:      {/* Hietograma de diseño + Parámetros SCS‑CN */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1689:      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1690:        {/* Hietograma de diseño */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1691:        <Card title={`Hietograma — ${distType} · Tr=${Tr}a · d=${durH}h · Δt=${dtMin}min`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1692:          <ResponsiveContainer width="100%" height={260}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1693:            <ComposedChart data={dispFilt.slice(1)} margin={{ left: 0, right: 8, bottom: 14, top: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1694:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1695:              <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1696:                     label={{ value: "t (min)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1697:              <YAxis yAxisId="i" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1698:                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 8 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1699:              <YAxis yAxisId="p" orientation="right" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1700:                     label={{ value: "P acum (mm)", angle: 90, position: "insideRight", fill: C.muted, fontSize: 8 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1701:              <Tooltip contentStyle={TT} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1702:              <Bar  yAxisId="i" dataKey="iBloque" fill={C.accent}  radius={[2, 2, 0, 0]} name="i bloque (mm/h)" opacity={0.85} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1703:              <Line yAxisId="p" type="monotone" dataKey="pAcum"   stroke={C.accent2} strokeWidth={2} dot={false} name="P acum (mm)" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1704:            </ComposedChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1705:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1706:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1707:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1708:        {/* Parámetros lluvia efectiva (SCS‑CN) y UH */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1709:        <Card title="Parámetros lluvia efectiva (SCS‑CN) y UH" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1710:          {/* Toggles */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1711:          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1712:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1713:              <input type="checkbox" checked={overrideSCS} onChange={e => setOverrideSCS(e.target.checked)} /> Override SCS‑CN (análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1714:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1715:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1716:              <input type="checkbox" checked={usarAMCauto} onChange={e => setUsarAMCauto(e.target.checked)} /> AMC automático (SIATA)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1717:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1765:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1766:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>% Impermeable</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1767:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1768:                <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1769:                  type="number" min={0} max={100} step={1} value={pctImp_ovr}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1770:                  onChange={e => setPctImp_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1771:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1772:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1773:              ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1774:                <Kpi value={`${pctImperv}%`} label="% Imperv" accent={C.accent} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1775:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1776:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1777:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1778:            {/* A (km²) — KPI para trazabilidad */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1779:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1780:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>A (km²)</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1781:              <Kpi value={`${A_km2}`} label="Área" accent={C.teal} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1782:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1783:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1784:            {/* Tc (min) — sugerido u override */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1806:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1807:          )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1808:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1809:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1810:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1811:      {/* ===== Hidrograma Q(t) — Usa hook useHidrograma con valores efectivos ===== */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1812:      <HidrogramaResultado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1813:        P_mm={P_mm}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1814:        dt_min={dt_min}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1815:        A_km2={A_km2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1816:        Tc_min={tc_min}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1817:        CN={CN}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1818:        AMC={AMC_eff}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1819:        pctImperv={pctImperv}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1820:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1821:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1822:      {/* Distribuciones temporales comparadas */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1823:      <Card title="Distribuciones Temporales Comparadas — Adimensional" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1824:        <div ref={refContenedorDistribuciones} style={{ width: "100%", height: 260 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1825:          <ResponsiveContainer width="100%" height="100%">
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1826:            <LineChart data={distMerge} margin={{ left: 0, right: 14, bottom: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1827:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1828:              <XAxis dataKey="T" tick={{ fill: C.muted, fontSize: 9 }}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1829:                     label={{ value: "Tiempo (%)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1830:              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1831:                     label={{ value: "P acum (%)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1832:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(1) + "%"]} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1833:              <Legend wrapperStyle={{ fontSize: 9 }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1834:              <Line type="monotone" dataKey="EPM_Q1"  stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1835:              <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1836:              <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q2" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1837:              <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q3" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1838:              <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q4" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1839:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1840:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1841:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1842:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1843:        {/* Botón Exportar PNG */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1844:        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1845:          <button
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1846:            className="btn"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1847:            onClick={() => exportarPNGDesdeRef(refContenedorDistribuciones, "Distribuciones_Adimensional.png")}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1848:          >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1849:            Exportar PNG
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1850:          </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1851:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1852:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1853:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1854:      {/* Intensidades por bloque — Comparativa Distribuciones (Tr activo) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1855:      <Card title="Intensidades por Bloque — Comparativa Distribuciones (Tr activo)" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1856:        <div ref={refContenedorIntensidades} style={{ width: "100%", height: 220 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1857:          <ResponsiveContainer width="100%" height="100%">
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1858:            <LineChart data={compData} margin={{ left: 0, right: 18, bottom: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1859:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1860:              <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1861:                     label={{ value: "t (min)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1862:              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1863:                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1864:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(2) + " mm/h"]} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1865:              <Legend wrapperStyle={{ fontSize: 9 }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1866:              <Line type="monotone" dataKey="EPM_Q1"  stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1867:              <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1868:              <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q2" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1869:              <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q3" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1870:              <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q4" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1871:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1872:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1873:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1874:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1875:        {/* Botón Exportar PNG */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1876:        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1877:          <button
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1878:            className="btn"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1879:            onClick={() => exportarPNGDesdeRef(refContenedorIntensidades, "Intensidades_Bloque.png")}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1880:          >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1881:            Exportar PNG
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1882:          </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1883:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1884:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1885:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1886:      {/* Tabla hietograma estructurada */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1887:      <Card title={`Tabla Hietograma Estructurada — ${distType} · Tr=${Tr}a · P_total=${hiet.Ptotal}mm`} accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1888:        <Tbl
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1889:          headers={["t (min)", "T (%)", "P acum (mm)", "ΔP (mm)", "i bloque (mm/h)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1890:          rows={hiet.data
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1891:            .slice(1)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1892:            .filter((_, i) => i % Math.max(1, Math.floor(hiet.steps / 40)) === 0)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1893:            .map(r => ({ t: r.t, T: r.tPct, P: r.pAcum, dP: r.pIncrem, i: r.iBloque }))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1894:          hiCols={[3, 4]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1895:          accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1896:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1897:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1898:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1899:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1900:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1901:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1902:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1903:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1904:// MÓDULO HIDROGRAMAS — 5 Métodos con convolución completa (robusto para gráficas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1905:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1906:function ModHidrogramas({ params, est, name, onContextoComparador }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1907:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1908:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1909:  // Evita crash por referencias residuales a guardarAMCenPanel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1910:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1911:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1912:  // ── Controles superiores
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1913:  const [Tr, setTr]       = useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1914:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1915:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1916:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1917:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1918:  // ── CN efectivo (CNact) con default coherente a la UI (60 % imperv.)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1919:  const CNact = useMemo(() => calcCNdinamico({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1920:    amcActual: params.amcActual ?? "II",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1965:  const hu_scsMod = useMemo(() => calcHUSCS_Mod(params.area, tc_h, dtMin, CpSCSMod), [params.area, tc_h, dtMin, CpSCSMod]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1966:  const hu_snyder = useMemo(() => calcHUSnyder(area_mi2, L_mi, L_mi * 0.35, dtMin, Ct, Cp), [area_mi2, L_mi, dtMin, Ct, Cp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1967:  const hu_wh     = useMemo(() => calcHUWilliamsHann(params.area, params.longitud_cauce, S_m_km, CNact, dtMin), [params, dtMin, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1968:  const hu_clark  = useMemo(() => calcClarkIUH(params.area, tc_h, dtMin, kR), [params.area, tc_h, dtMin, kR]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1969:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1970:  // ── Convolución (Pe * HU) → hidrogramas por método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1971:  const hidros = useMemo(() => (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1972:    [hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark].map(hu => calcHidroCompleto(lluvEfect, hu, dtMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1973:  ), [lluvEfect, hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1974:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1975:  // Hidrograma activo (SCS por defecto)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1976:  const h0 = hidros?.[0] ?? null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1977:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1978:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1979:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1980:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1981:  const nombresHidrogramas = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1982:    "SCS Unit Hydrograph",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1983:    "SCS Modificado",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1984:    "Snyder",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1985:    "Williams & Hann",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1986:    "Clark IUH",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1987:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1988:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1989:  const numeroValido = (valor) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1990:    const n = Number(valor);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1991:    return Number.isFinite(n) ? n : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1992:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1993:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1994:  const obtenerSerie = (h) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1995:  if (Array.isArray(h?.serie)) return h.serie;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1996:  if (Array.isArray(h?.hidrograma)) return h.hidrograma;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1997:  if (Array.isArray(h?.data)) return h.data;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1998:  if (Array.isArray(h?.puntos)) return h.puntos;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1999:  if (Array.isArray(h?.qt)) return h.qt;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2000:  if (Array.isArray(h?.Q_t)) return h.Q_t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2001:  if (Array.isArray(h?.valores)) return h.valores;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2002:  if (Array.isArray(h)) return h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2003:  return [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2004:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2005:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2006:  const leerQ = (punto) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2007:  if (Array.isArray(punto)) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2008:    return numeroValido(punto[1] ?? punto[0]?.q ?? punto[0]?.Q);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2009:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2010:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2011:  return numeroValido(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2012:    punto?.Q ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2013:      punto?.q ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2014:      punto?.q_m3s ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2015:      punto?.Q_m3s ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2016:      punto?.caudal ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2017:      punto?.caudal_m3s ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2018:      punto?.caudal_m3_s ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2019:      punto?.y ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2020:      punto?.valor ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2021:      punto?.value
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2022:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2023:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2024:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2025:const leerT = (punto, indice) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2026:  if (Array.isArray(punto)) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2027:    return numeroValido(punto[0]) ?? indice * dtMin;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2028:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2029:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2030:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2031:    numeroValido(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2032:      punto?.t ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2033:        punto?.T ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2034:        punto?.tiempo ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2035:        punto?.tiempo_min ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2036:        punto?.tiempoMin ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2037:        punto?.min ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2038:        punto?.x
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2039:    ) ?? indice * dtMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2040:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2041:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2042:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2043:  const calcularDesdeSerie = (h) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2044:    const serie = obtenerSerie(h);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2045:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2046:    if (!Array.isArray(serie) || serie.length === 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2047:      return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2048:        QpSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2049:        TpSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2050:        volumenSerie: null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2051:        puntos: null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2052:      };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2053:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2054:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2055:    let QpSerie = null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2056:    let TpSerie = null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2057:    let volumenSerie = 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2058:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2059:    serie.forEach((punto, indice) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2060:      const q = leerQ(punto);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2061:      const t = leerT(punto, indice);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2062:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2063:      if (q !== null && (QpSerie === null || q > QpSerie)) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2064:        QpSerie = q;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2065:        TpSerie = t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2066:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2067:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2068:      if (indice > 0) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2069:        const q0 = leerQ(serie[indice - 1]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2070:        const q1 = q;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2071:        const t0 = leerT(serie[indice - 1], indice - 1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2072:        const t1 = t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2073:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2074:        if (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2075:          q0 !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2076:          q1 !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2077:          Number.isFinite(t0) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2078:          Number.isFinite(t1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2079:        ) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2080:          volumenSerie += ((q0 + q1) / 2) * ((t1 - t0) * 60);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2081:        }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2082:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2083:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2084:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2085:    return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2086:      QpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2087:      TpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2088:      volumenSerie: volumenSerie > 0 ? volumenSerie : null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2089:      puntos: serie.length,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2090:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2091:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2092:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2093:  const hidrogramasResumen = Array.isArray(hidros)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2094:    ? hidros.map((h, i) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2095:        const calculado = calcularDesdeSerie(h);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2096:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2097:        const QpDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2098:  h?.Qpico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2099:    h?.Qp ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2100:    h?.qp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2101:    h?.q_pico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2102:    h?.caudalPico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2103:    h?.caudal_pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2104:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2105:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2106:        const TpDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2107:  h?.tPico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2108:    h?.Tp ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2109:    h?.tp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2110:    h?.t_pico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2111:    h?.tiempoPico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2112:    h?.tiempo_pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2113:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2114:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2115:        const volumenDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2116:  h?.volTotal ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2117:    h?.volumen ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2118:    h?.V ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2119:    h?.vol ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2120:    h?.volume
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2121:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2122:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2123:        return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2124:          metodo: nombresHidrogramas[i] ?? `Método ${i + 1}`,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2125:          Qp:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2126:            QpDirecto && QpDirecto > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2127:              ? QpDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2128:              : calculado.QpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2129:          Tp:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2130:            TpDirecto && TpDirecto > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2131:              ? TpDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2132:              : calculado.TpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2133:          volumen:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2134:            volumenDirecto && volumenDirecto > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2135:              ? volumenDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2136:              : calculado.volumenSerie,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2137:          puntos: calculado.puntos,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2138:        };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2139:      })
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2140:    : [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2141:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2142:    
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2143:  const valoresLluviaEfectivaMm = Array.isArray(lluvEfect)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2144:    ? lluvEfect
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2145:        .map((valor) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2146:          Number(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2147:            typeof valor === "object"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2148:              ? valor?.pe ?? valor?.Pe ?? valor?.pn ?? valor?.Pn ?? valor?.valor ?? valor?.y
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2149:              : valor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2150:          )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2151:        )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2152:        .filter((numero) => Number.isFinite(numero) && numero >= 0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2153:    : [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2154:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2155:  const sumaLluviaEfectivaMm = valoresLluviaEfectivaMm.reduce(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2156:    (suma, numero) => suma + numero,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2157:    0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2158:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2159:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2160:  const maxLluviaEfectivaMm = valoresLluviaEfectivaMm.length
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2161:    ? Math.max(...valoresLluviaEfectivaMm)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2162:    : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2163:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2164:  const lluviaEfectivaTotalMm =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2165:    maxLluviaEfectivaMm !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2166:    maxLluviaEfectivaMm > 0 &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2167:    sumaLluviaEfectivaMm / maxLluviaEfectivaMm > 3
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2168:      ? maxLluviaEfectivaMm
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2169:      : sumaLluviaEfectivaMm || null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2170:  const hidrogramasQ5Exportables = (hidros || []).map((h) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2171:    metodo: h?.metodo ?? "Método Q-5",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2172:    Qpico: h?.Qpico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2173:    tPico: h?.tPico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2174:    volTotal: h?.volTotal,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2175:    Qp: h?.Qpico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2176:    Tp: h?.tPico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2177:    volumen: h?.volTotal
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2178:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2179:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:      onContextoComparador((previo) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:        const qTrActivoPrevio = previo?.q_tr_activo_estado?.q_tr_activo ?? {};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:        const siguienteContexto = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:          ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:          fuente: "motor HidroFlow",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:          area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:          estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2188:          lluvia_efectiva: Boolean(lluvEfect),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2189:          hidrogramas: {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2190:            fuente: "ModHidrogramas",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2191:            resultados: hidrogramasQ5Exportables
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2192:          },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2193:          lluvia_efectiva_total_mm: lluviaEfectivaTotalMm,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2194:          hidrogramas_resumen: hidrogramasResumen,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2195:          hidrograma_principal: h0 ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2196:        };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2197:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2198:        // OT-0056C4 refresca Q-Tr activo con Pe total sin recalcular caudales.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2199:        return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2200:          ...siguienteContexto,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2201:          q_tr_activo_estado: previo?.q_tr_activo_estado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2202:            ? derivarEstadoQTrActivo({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2203:                ...qTrActivoPrevio,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2204:                ...siguienteContexto,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2205:                // OT-0056F preserva estacion IDF en Q-Tr activo cuando Hidrogramas refresca el contexto.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2206:                estacion_idf:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2207:                  siguienteContexto.estacion_idf ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2208:                  qTrActivoPrevio.estacion_idf ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2209:                  previo?.estacion_idf ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2210:                  previo?.estacionIDF ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2211:                  previo?.estacion ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2212:                  previo?.nombre_estacion ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2213:                  previo?.idf?.nombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2214:                  previo?.idf?.estacion ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2215:                  null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2216:                tr_diseno_activo: qTrActivoPrevio.tr_activo ?? previo?.tr_diseno_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2217:                metodo_idf: qTrActivoPrevio.metodo_idf ?? previo?.metodo_idf ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2218:                distribucion_temporal: qTrActivoPrevio.distribucion_temporal ?? previo?.distribucion_temporal ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2219:                CN_efectivo: qTrActivoPrevio.cn_efectivo ?? previo?.CN_efectivo ?? previo?.cn_efectivo ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2228:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2229:}, [onContextoComparador, hidros, h0, lluvEfect, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2230:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2231:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2232:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2233:  // Estado del hidrograma (QA) — objeto con flags para el panel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2234:const qaStatus = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2235:  const tcWarning = tc_min < 5 || tc_min > 180;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2236:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2237:  const amcWarning = params?.amcActual === "III";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2238:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2239:  // En Hidrología solo observamos estados, no persistimos ni override
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2240:  const amcPersistiendo = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2241:  const isOverride = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2242:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2243:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2244:    tcWarning,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2245:    amcWarning,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2246:    amcPersistiendo,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2247:    isOverride
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2255:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2256:  /* ──────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2257:     DEBUG TEMPORAL: inspeccionar etiquetas de método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2258:     ────────────────────────────────────────────────────────────── */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2259:  useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2260:    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas resumenQ:', (resumenQ ?? []).map(r => r.nombre ?? r.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2261:  }, [resumenQ]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2262:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2263:  useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2264:    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas hidros:', (hidros ?? []).map(h => h.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2265:  }, [hidros]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2266:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2267:  /* ──────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2268:     Parche condicional Snyder (cfs → m³/s) y copia segura: hidrosCorr
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2269:     ────────────────────────────────────────────────────────────── */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2270:  const factorCFS2M3S   = 0.028316846592;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2271:  // Política: 'auto' | 'force' | 'off'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2272:  const SNYDER_POLICY   = 'auto';
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2273:  // Umbral para 'auto' (ratio Qp(Snyder)/max(Qp otros))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2274:  const SNYDER_THRESHOLD = 12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2275:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2276:  const hidrosCorr = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2277:    const arr = (hidros ?? []).map(h => ({ ...h }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2278:    const idxSny = arr.findIndex(h => /snyder/i.test(h.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2279:    if (idxSny >= 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2280:      const h = arr[idxSny];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2281:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2282:      const qpSny = (h.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2283:      const qpOtros = Math.max(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2284:        ...arr.filter((_,i)=> i !== idxSny).map(o =>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2285:          (o.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2286:        ),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2287:        1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2288:      );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2289:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2290:      let needConvert = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2291:      if (SNYDER_POLICY === 'force')       needConvert = true;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2292:      else if (SNYDER_POLICY === 'auto')   needConvert = (qpSny > qpOtros * SNYDER_THRESHOLD);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2293:      // 'off' → no convierte
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2294:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2295:      if (needConvert) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2296:        h.qSeries = (h.qSeries ?? []).map(p => ({ ...p, Q: p.Q * factorCFS2M3S }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2297:        h.metodo  = `${h.metodo} (SI)`; // trazabilidad en la leyenda
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2298:        if (import.meta.env.DEV) console.warn('[FIX] Snyder convertido cfs→m³/s', { qpSny, qpOtros, ratio: qpSny/qpOtros });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2299:      } else if (import.meta.env.DEV) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2300:        console.log('[INFO] Snyder sin conversión', { qpSny, qpOtros, ratio: qpSny/qpOtros });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2301:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2302:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2303:    return arr;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2304:  }, [hidros]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2305:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2306:  /* ──────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2307:     Selección ROBUSTA de Williams & Hann (W&H) + fallback a series
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2308:     ────────────────────────────────────────────────────────────── */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2309:  const whAliases = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2310:    'w & hann', 'w&h', 'w & h',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2311:    'williams & hann', 'williams&hann', 'williams & h',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2312:    'wh', 'williamshann', 'w hann'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2313:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2314:  const matchWH = (s) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2315:    if (!s) return false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2316:    const t = String(s).toLowerCase().replace(/\s+/g, ' ').trim();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2317:    return whAliases.some(a => t.includes(a));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2318:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2319:  let rWH = (resumenQ ?? []).find(r => matchWH(r.nombre ?? r.metodo)) || {};
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2320:  if (!rWH.Qpico || !rWH.tpico) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2321:    const wh = (hidrosCorr ?? []).find(h => matchWH(h.metodo)); // ← usa corregidas
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2322:    if (wh?.qSeries?.length) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2323:      const pico = wh.qSeries.reduce((m, p) => (p.Q > m.Q ? p : m), { Q: 0, t: 0 });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2324:      rWH = { ...(rWH ?? {}), Qpico: rWH.Qpico ?? pico.Q, tpico: rWH.tpico ?? pico.t, nombre: rWH.nombre ?? wh.metodo };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2325:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2326:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2327:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2328:  // ── Totales de Pe
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2329:  const lePe = useMemo(() => lluvEfect.reduce((s, r) => s + (r.PeIncrem || 0), 0), [lluvEfect]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2330:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2331:  // ───────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2332:  //  FORTALECER GRÁFICAS: seriesOK, n, step, combined, noData (usa hidrosCorr)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2333:  // ───────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2334:  const seriesOK = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2335:    return (hidrosCorr ?? []).filter(h =>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2336:      Array.isArray(h?.qSeries) && h.qSeries.length > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2337:    );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2338:  }, [hidrosCorr]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2339:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2340:  const n = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2341:    const lens = seriesOK.map(h => h.qSeries.length);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2342:    return lens.length ? Math.max(...lens) : 0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2343:  }, [seriesOK]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2344:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2345:  const step = useMemo(() => (n <= 0 ? 1 : Math.max(1, Math.floor(n / 100))), [n]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2346:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2347:  const combined = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2348:    if (n <= 0) return [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2349:    const L = Math.ceil(n / step);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2350:    const out = Array.from({ length: L }, (_, i) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2351:      const idx = i * step;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2352:      const obj = { t: +((idx * dtMin) || 0).toFixed(1) };
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2353:      seriesOK.forEach(h => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2354:        obj[h.metodo] = h.qSeries[idx]?.Q ?? 0; // clave = nombre del método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2355:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2356:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2357:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2358:    return out;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2359:  }, [seriesOK, n, step, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2360:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2361:  const noData = combined.length === 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2362:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2363:  // (Opcional) diagnóstico de series en consola
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2364:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2365:    if (!import.meta.env.DEV) return;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2366:    console.log('[DEBUG] seriesOK:', seriesOK.map(h => ({ metodo: h.metodo, len: h.qSeries?.length })));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2367:    console.log('[DEBUG] combined len:', combined.length, 'n=', n, 'step=', step);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2368:  }, [seriesOK, combined, n, step]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2369:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2370:  // ── Paleta por método (si no existe arriba en tu archivo)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2371:  const methodColors = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2372:    'SCS':              '#4ECDC4',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2373:    'SCS Mod.':         '#94D82D',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2374:    'Snyder':           '#F59F00',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2375:    'Snyder (SI)':      '#F59F00',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2376:    'W & Hann':         '#845EF7',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2377:    'Williams & Hann':  '#845EF7',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2378:    'Clark IUH':        '#20C997'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2379:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2380:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2381:  // ── Render
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2382:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2393:          {'  →  '} CN efectivo: {CNact}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2394:          {'  |  '} AMC {params.amcActual ?? 'II'}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2395:          {'  |  '} % Imperv: {params.porcentajeImpermeable ?? 60}%
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2396:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2397:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2398:        {/* Mini‑resumen W&H (Qpico/tpico) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2399:        <div style={{ marginTop:8, display:'flex', gap:12, flexWrap:'wrap', fontFamily: mono, fontSize: 12, color: C.muted2 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2400:          <span style={{color:C.accent3}}>{rWH.nombre ?? 'W&H'}</span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2401:          <span>Qp = <b style={{color:C.text}}>{(rWH.Qpico ?? 0).toFixed(2)}</b> m³/s</span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2402:          <span>tp = <b style={{color:C.text}}>{(rWH.tpico ?? 0).toFixed(0)}</b> min</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2403:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2404:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2405:      
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2406:      {/* Panel QA - Estado hidrológico efectivo */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2407:      <div className="flex flex-wrap gap-4 p-3 mb-2 bg-slate-900 text-white rounded-md text-sm font-mono">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2408:       <div className={qaStatus.tcWarning ? "text-yellow-400" : "text-green-400"}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2409:         Tc operativo Hidrogramas: {tc_min.toFixed(1)} min
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2410:         {qaStatus.tcWarning && " ⚠️"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2411:         <span className="text-slate-400"> · ruta interna Q(t)</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2412:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2413:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2414:       <div className="text-slate-400">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2415:         <div style={{ marginTop: 6 }}>Roles Tc en HidroFlow:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2416:         <div>• Tc global Índice: referencia hidrológica general.</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2417:         <div>• Tc operativo Q(t): valor usado por la ruta interna del hidrograma.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2418:         <div>• Duración evento: 3 h para almacenamiento/regulación.</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2419:         <div>• Lag / forma SCS: parámetro derivado para forma temporal del hidrograma.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2420:         <div>• Tc comparador: referencia especializada para coherencia Q-5.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2421:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2422:         <div>Escenarios Tc para Q(t):</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2423:         <div>• Operativo Q(t): {tc_min.toFixed(1)} min · activo</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2424:         <div>• Índice global: {Number.isFinite(params?.tcMedMin) ? params.tcMedMin.toFixed(1) : "—"} min · referencia</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2425:         <div>• Comparador: pendiente · referencia especializada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2426:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2427:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2428:       <div className={qaStatus.amcWarning ? "text-red-400" : "text-blue-400"}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2429:         AMC: {params?.amcActual ?? "N/A"} ({params?.amcFuente ?? "Sin fuente"})
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2430:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2431:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2432:       <div className={qaStatus.amcPersistiendo ? "text-green-400" : "text-slate-400"}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2433:         Persistencia AMC: {qaStatus.amcPersistiendo ? "ON" : "OFF"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2440:       )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2441:     </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2442:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2443:      {/* ===== Gráfica Q(t) — Convolución completa (segura) ===== */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2444:      <div style={{ width:'100%', height: 380, border:'1px solid #1F2F45', borderRadius: 10, background:'#0B0F1A' }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2445:        {noData ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2446:          <div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color: C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2447:            Sin datos para graficar — verifica hietograma, CN y HU
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2448:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2449:        ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2450:          <ResponsiveContainer width="100%" height="100%">
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2451:            <LineChart data={combined} margin={{ top: 12, right: 24, bottom: 16, left: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2452:              <CartesianGrid stroke="#223" strokeDasharray="3 3" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2453:              <XAxis
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2454:                dataKey="t"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2455:                tick={{ fill:'#9AA4B2', fontSize: 11 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2456:                label={{ value:'t (min)', position:'insideBottomRight', offset:-8, fill:'#9AA4B2' }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2457:              />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2458:              <YAxis
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2459:                tick={{ fill:'#9AA4B2', fontSize: 11 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2460:                label={{ value:'Q (m³/s)', angle:-90, position:'insideLeft', offset: 10, fill:'#9AA4B2' }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2461:              />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2462:              <Tooltip wrapperStyle={{ background:'#0F1624', border:'1px solid #1F2F45' }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2463:              <Legend wrapperStyle={{ color:'#9AA4B2' }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2464:              {seriesOK.map(h => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2465:                <Line
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2466:                  key={h.metodo}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2467:                  type="monotone"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2468:                  dataKey={h.metodo}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2469:                  stroke={methodColors[h.metodo] ?? '#8884d8'}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2470:                  strokeWidth={2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2471:                  dot={false}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2472:                  isAnimationActive={false}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2473:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2474:              ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2475:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2476:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2477:        )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2478:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2479:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2480:      {/* …si tienes más controles, tarjetas por método y comparativas de HU, déjalos debajo… */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2481:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2482:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2510:  // Tc Témez para la cuenca
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2511:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2512:  const tc_h=tcList[0]?.h||0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2513:  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2514:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2515:  // Método hidrograma post-urbano seleccionable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2516:  const huPost=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2517:    if(metodoPost==="Clark") return calcClarkIUH(params.area,tc_h,dtMin,1.2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2518:    if(metodoPost==="Snyder") return calcHUSnyder(params.area*0.386102,params.longitud_cauce*0.621371,params.longitud_cauce*0.621371*0.35,dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2519:    if(metodoPost==="WH") return calcHUWilliamsHann(params.area,params.longitud_cauce,S_m_km,cnIII_post,dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2520:    return calcHUSCS(params.area,tc_h,dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2521:  },[metodoPost,params,tc_h,dtMin,cnIII_post]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2522:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2523:  const qPost=useMemo(()=>calcHidroCompleto(lluvPost,huPost,dtMin),[lluvPost,huPost,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2524:  const huPre=useMemo(()=>calcHUSCS(params.area,tc_h,dtMin),[params.area,tc_h,dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2525:  const qPre =useMemo(()=>calcHidroCompleto(lluvPre,huPre,dtMin),[lluvPre,huPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2526:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2527:  const volSAR=useMemo(()=>calcVolSAR(qPost.qSeries,qPre.qSeries,dtMin),[qPost,qPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2528:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2529:  const step=Math.max(1,Math.floor(volSAR.excesos.length/120));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2530:  const dispData=volSAR.excesos.filter((_,i)=>i%step===0).slice(0,140);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2531:  const reduccion=qPost.Qpico>0?(100*(qPost.Qpico-qPre.Qpico)/qPost.Qpico).toFixed(1):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2532:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2533:  const exportDatos={
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2534:    nombre_cuenca:params.nombre_cuenca,area:params.area,perimetro:params.perimetro,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2535:    longitud_cauce:params.longitud_cauce,pendiente_cuenca:params.pendiente_cuenca,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2536:    cota_max:params.cota_max,cota_min:params.cota_min,CN:params.CN,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2537:    tc_h,stn:name,Tr,dur_h:durH,distType,dt_min:dtMin,Ptotal:hiet.Ptotal,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2538:    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2539:    hiet,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2540:    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2541:    volSAR,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2542:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2543:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2544:  return(<div style={{display:"flex",flexDirection:"column",gap:14}} ref={reportRef}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2545:    {/* Banner normativo */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2546:    <div style={{background:`linear-gradient(135deg,${C.accent2}0A,${C.accent4}08)`,border:`1px solid ${C.accent2}25`,borderRadius:12,padding:"12px 18px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2547:      <div style={{flexShrink:0}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2548:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em"}}>Guía Técnica GT-AS-004 · §3 Diseño Hidrológico · Rev.0 · 2026-01-07</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2549:        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>Diseño de Sistemas de Almacenamiento y Regulación de Aguas Lluvias</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2550:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2551:      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginLeft:"auto"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2552:        <button onClick={()=>exportarExcel(exportDatos)} style={{padding:"6px 14px",borderRadius:7,border:`1px solid 
${C.accent2}40`,background:`${C.accent2}12`,color:C.accent2,fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700}}>⬇ Excel</button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2553:        <button onClick={()=>exportarPDF(reportRef.current,exportDatos)} style={{padding:"6px 14px",borderRadius:7,border:`1px solid 
${C.accent3}40`,background:`${C.accent3}12`,color:C.accent3,fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700}}>⬇ PDF</button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2554:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2555:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2556:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2557:    {/* Controles */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2558:    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2559:      <Card title="Categoría SAR" accent={C.accent4}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2560:        {["Menores","Intermedios","Mayores"].map(c=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2561:          <button key={c} onClick={()=>{setCatSAR(c);setTr(TrRec[c]);}} style={{display:"block",width:"100%",margin:"2px 0",padding:"4px 
8px",borderRadius:5,border:"none",cursor:"pointer",background:catSAR===c?C.accent4:`${C.accent4}12`,color:catSAR===c?C.bg:C.muted,fontSize:9,fontFamily:mono,fontWeight:catSAR===c?700:400,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2562:            {c} <span style={{opacity:.55}}>Tr={TrRec[c]}a</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2563:          </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2564:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2565:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2566:      <Card title="Tr Diseño" accent={C.gold}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2567:        <BtnGroup options={TR_LIST.map(t=>({v:t,l:`${t}a`}))} value={Tr} onChange={setTr} accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2568:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2569:      <Card title="Duración" accent={C.accent3}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2570:        <BtnGroup options={[1,2,3,6].map(h=>({v:h,l:`${h}h`}))} value={durH} onChange={setDurH} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2571:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2572:      <Card title="Δt" accent={C.accent}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2573:        <BtnGroup options={[5,10,15,30].map(d=>({v:d,l:`${d}'`}))} value={dtMin} onChange={setDtMin} accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2574:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2575:      <Card title="Dist. temporal" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2576:        <BtnGroup options={[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2577:          {v:"EPM_Q1",l:"EPM"},{v:"Huff_Q1",l:"H.Q1"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2578:          {v:"Huff_Q2",l:"H.Q2"},{v:"Huff_Q3",l:"H.Q3"},{v:"Huff_Q4",l:"H.Q4"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2579:        ]} value={distType} onChange={setDistType} accent={C.teal}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2580:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2581:      <Card title="% Sup. Impermeable" accent={C.rose}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2582:        <BtnGroup options={[20,40,60,80,100].map(s=>({v:s,l:`${s}%`}))} value={siPct} onChange={setSiPct} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2583:        <div style={{marginTop:6,fontSize:9,color:C.muted,fontFamily:mono}}>CNIII post={cnIII_post}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2584:        <div style={{marginTop:2,fontSize:9,color:C.muted,fontFamily:mono}}>Método:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2585:        <BtnGroup options={[{v:"SCS",l:"SCS"},{v:"Clark",l:"Clark"},{v:"Snyder",l:"Snyder"},{v:"WH",l:"W&H"}]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2586:          value={metodoPost} onChange={setMetodoPost} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2587:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2588:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2589:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2590:    {/* KPIs principales */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2591:    <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2592:      <Kpi value={hiet.Ptotal+" mm"} label="P total diseño" accent={C.accent} sub={`Tr=${Tr}a, d=${durH}h`}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2593:      <Kpi value={cnIII_post.toFixed(1)} label="CN post (CNIII)" accent={C.rose} sub={`SI=${siPct}%`}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2594:      <Kpi value={cnIII_pre.toFixed(1)} label="CN pre (CNIII)" accent={C.accent2} sub="Pastizales pobres"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2595:      <Kpi value={qPost.Qpico.toFixed(4)+" m³/s"} label={`Q pico POST (${metodoPost})`} accent={C.accent3}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2596:      <Kpi value={qPre.Qpico.toFixed(4)+" m³/s"} label="Q pico PRE (SCS)" accent={C.accent2}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2597:      <Kpi value={reduccion+"%"} label="Reducción pico" accent={C.gold}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2598:      <Kpi value={volSAR.volTotal.toFixed(0)+" m³"} label="V almacenamiento" accent={C.accent4}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2599:      <Kpi value={catSAR} label="Categoría SAR" accent={C.teal} sub={`Borde libre ${catSAR==="Menores"?">0.10m":catSAR==="Intermedios"?">0.25m":">0.50m"}`}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2600:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2601:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2602:    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2603:      {/* Hietograma de diseño */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2604:      <Card title={`Hietograma SAR — ${distType} · Tr=${Tr}a · d=${durH}h`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2605:        <ResponsiveContainer width="100%" height={230}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2606:          <ComposedChart data={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/50))===0)} margin={{left:0,right:8,bottom:14,top:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2607:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2608:            <XAxis dataKey="t" tick={{fill:C.muted,fontSize:8}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2609:            <YAxis yAxisId="i" tick={{fill:C.muted,fontSize:8}} label={{value:"i (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2610:            <YAxis yAxisId="p" orientation="right" tick={{fill:C.muted,fontSize:8}} label={{value:"P (mm)",angle:90,position:"insideRight",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2611:            <Tooltip contentStyle={TT}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2612:            <Bar yAxisId="i" dataKey="iBloque" fill={C.accent} radius={[2,2,0,0]} name="i (mm/h)" opacity={0.8}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2613:            <Line yAxisId="p" type="monotone" dataKey="pAcum" stroke={C.accent2} strokeWidth={2} dot={false} name="P acum (mm)"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2614:          </ComposedChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2615:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2616:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2617:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2618:      {/* Distribución temporal adimensional */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2619:      <Card title="Distribución Temporal Activa + Comparativa Huff" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2620:        <ResponsiveContainer width="100%" height={230}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2621:          <LineChart data={HUFF_MERGED} margin={{left:0,right:14,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2622:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2623:            <XAxis dataKey="T" tick={{fill:C.muted,fontSize:9}} label={{value:"Tiempo (%)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2624:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"P (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2625:            <Tooltip contentStyle={TT} formatter={v=>[v?.toFixed(1)+"%"]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2626:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2627:            <Line type="monotone" dataKey="EPM_Q1" stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2628:            <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q1"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2629:            <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q2"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2630:            <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3} strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q3"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2631:            <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4} strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q4"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2632:          </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2633:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2634:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2635:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2636:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2637:    {/* Hidrogramas POST vs PRE */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2638:    <Card title={`Hidrogramas SAR — POST (${metodoPost}, CN=${cnIII_post}) vs PRE (SCS, CN=${cnIII_pre}) · V_SAR=${volSAR.volTotal.toFixed(0)} m³`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2639:      <ResponsiveContainer width="100%" height={290}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2640:        <AreaChart data={dispData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2641:          <defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2642:            <linearGradient id="gPost" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent3} stopOpacity={0.35}/><stop offset="95%" stopColor={C.accent3} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2643:            <linearGradient id="gPre"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent2} stopOpacity={0.25}/><stop offset="95%" stopColor={C.accent2} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2644:            <linearGradient id="gVol"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold}    stopOpacity={0.20}/><stop offset="95%" stopColor={C.gold}    stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2645:          </defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2646:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2647:          <XAxis dataKey="t" tick={{fill:C.muted,fontSize:9}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2648:          <YAxis yAxisId="q" tick={{fill:C.muted,fontSize:9}} label={{value:"Q (m³/s)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2649:          <YAxis yAxisId="v" orientation="right" tick={{fill:C.muted,fontSize:9}} label={{value:"V acum (m³)",angle:90,position:"insideRight",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2650:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[nm.includes("Vol")?v.toFixed(0)+" m³":v.toFixed(5)+" m³/s",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2651:          <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2652:          <Area yAxisId="q" type="monotone" dataKey="Qpost" stroke={C.accent3} fill="url(#gPost)" strokeWidth={2.5} name={`Q post (${metodoPost})`} dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2653:          <Area yAxisId="q" type="monotone" dataKey="Qpre"  stroke={C.accent2} fill="url(#gPre)"  strokeWidth={2.5} name="Q pre (SCS)" dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2654:          <Area yAxisId="v" type="monotone" dataKey="volAcum" stroke={C.gold} fill="url(#gVol)" strokeWidth={1.5} name="Vol. SAR acum. (m³)" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2655:        </AreaChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2656:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2657:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2658:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2659:    {/* CN y clasificación */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2660:    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2661:      <Card title="CN — GT-AS-004 Tabla 5 (CNIII)" accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2662:        <Tbl headers={["Descripción","SI%","CNII","CNIII"]} rows={[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2663:          {D:"Suelo urbano 100%",S:100,II:98.0,III:+cnII_to_III(98).toFixed(2)},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2664:          {D:`Mixta (${siPct}% imp.)`,S:siPct,II:+cnII_post,III:+cnIII_post},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2665:          {D:"Natural (pastizales)",S:0,II:86,III:93.5},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2666:        ]} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2667:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2668:      <Card title="Clasificación SAR — Tabla 1 y 2" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2679:        {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2680:          ["Categoría SAR",catSAR],["Tr de diseño",`${Tr} años`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2681:          ["Duración lluvia",`${durH} h`],["Distribución",distType.replace("_"," ")],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2682:          ["P total diseño",`${hiet.Ptotal} mm`],["Método HU POST",metodoPost],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2683:          ["CN post (CNIII)",`${cnIII_post} (SI=${siPct}%)`],["CN pre (CNIII)","93.5"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2684:          ["Q pico POST",`${qPost.Qpico.toFixed(4)} m³/s`],["Q pico PRE (reg.)",`${qPre.Qpico.toFixed(4)} m³/s`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2685:          ["Reducción pico",`${reduccion}%`],["V almacenamiento",`${volSAR.volTotal.toFixed(0)} m³`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2686:        ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2687:          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.border}15`,fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2688:            <span style={{color:C.muted}}>{l}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2689:            <span style={{color:C.text,fontWeight:600}}>{v}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2690:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2691:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2692:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2693:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2694:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2695:    {/* Tabla hietograma estructurada */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2696:    <Card title={`Hietograma de Diseño SAR — Tabla Estructurada · P_total=${hiet.Ptotal}mm · Tr=${Tr}a`} accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2697:      <Tbl headers={["t (min)","T (%)","P acum (mm)","ΔP (mm)","i bloque (mm/h)","Pe post (mm)","Pe pre (mm)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2698:        rows={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/36))===0).map((r,idx)=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2699:          const rPost=lluvPost[idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPost[lluvPost.length-1];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2700:          const rPre =lluvPre [idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPre [lluvPre.length-1];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2701:          return{t:r.t,T:r.tPct,P:r.pAcum,dP:r.pIncrem,i:r.iBloque,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2702:            PePost:rPost?.Pe||0,PePre:rPre?.Pe||0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2703:        })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2704:        hiCols={[3,4]} accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2705:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2706:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2707:    {/* Nota técnica */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2708:    <div style={{background:`${C.teal}08`,border:`1px solid ${C.teal}20`,borderRadius:10,padding:"11px 15px",fontFamily:mono,fontSize:9,color:C.muted,lineHeight:1.7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2709:      <span style={{color:C.teal,fontWeight:700}}>Notas metodológicas GT-AS-004: </span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2710:      § 3.4 Pérdidas: Método SCS-CN · Condición humedad AMC III · §3.5 HU SCS: lag time=60%·Tc · §3.8 Volumen excedente=∫(Qpost−Qpre)dt · §3.9 Caudal regulado=Qpico(pre) · Distribución temporal: Primer Cuartil (Gallego et al., 2024) · 
Curvas Huff: Distribuciones Illinois-ISWS (probabilidad 50%)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2711:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2712:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2713:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2714:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2715:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2716:// MÓDULO MÉTODO RACIONAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2717:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2718:function ModRacional({params,est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2719:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2720:  const tc_min=useMemo(()=>tcList.reduce((s,r)=>s+r.min,0)/(tcList.length||1),[tcList]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2721:  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2722:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2723:    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2724:    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2725:      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2726:      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2727:      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2728:    </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2729:    <Card title="Caudales Racionales — Todos los Tr" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2730:      <ResponsiveContainer width="100%" height={240}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2731:        <BarChart data={res} margin={{left:0,right:18,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2732:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2733:          <XAxis dataKey="Tr" tick={{fill:C.muted,fontSize:10}} label={{value:"Tr (años)",position:"insideBottom",offset:-4,fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2734:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Q (m³/s)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2735:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" "+nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2736:          <Legend wrapperStyle={{fontSize:10}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2737:          <Bar dataKey="Q" fill={C.gold} radius={[3,3,0,0]} name="Q (m³/s)"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2738:          <Bar dataKey="C" fill={C.accent2} radius={[3,3,0,0]} name="Coef. C"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2739:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2740:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2741:    </Card>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2742:    <Card title="Tabla — Parámetros y Caudales Racionales" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2743:      <Tbl headers={["Tr (a)","I (mm/h)","P (mm)","Coef. C","Q (m³/s)"]} rows={res} hiCols={[4]} accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2744:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2745:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2746:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2747:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2748:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2749:// APP PRINCIPAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2750:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2751:// DATOS SIATA — Red hidrometeorológica AMVA (Excel + catálogo oficial)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2752:// Fuente: imagen Excel proporcionada + enriquecimiento SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2753:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2754:const ESTACIONES_SIATA=[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2755:  {codigo:"2701034",nombre:"MAZO",                lat:6.25702778,lon:-75.50166667,alt:2480,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:78.4,I60_obs:55.2,epm_key:"MAZO"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2756:  {codigo:"2701035",nombre:"CHORRILLOS",           lat:6.29672222,lon:-75.5033889, alt:2370,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:72.1,I60_obs:50.8,epm_key:"CHORRILLOS"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2769:  {codigo:"2701076",nombre:"NIQUIA",               lat:6.34627778,lon:-75.54586111,alt:1439,red:"SIATA",    vars:["P","T","HR","N.Cauce"],   estado:"Activa",      I30_obs:63.5,I60_obs:44.7,epm_key:"NIQUIA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2770:  {codigo:"2701122",nombre:"COPACABANA",           lat:6.33661111,lon:-75.51086111,alt:1580,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:61.2,I60_obs:43.1,epm_key:"COPACABANA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2771:  {codigo:"2701481",nombre:"PEDREGAL",             lat:6.30494444,lon:-75.57422222,alt:1622,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:59.8,I60_obs:42.1,epm_key:"PEDREGAL"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2772:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2773:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2774:// ─── SERIE TEMPORAL SIATA SIMULADA (evento convectivo realista AMVA) ─────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2775:function generarSerieSIATA(semilla=42){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2776:  const rng=s=>{const x=Math.sin(s+1)*10000;return x-Math.floor(x);};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2777:  const base=[0,0,0,0,0,0.3,0.6,1.5,4.2,9.8,16.4,24.1,19.8,13.2,8.1,4.6,2.3,1.1,0.5,0.2,0,0,0,0];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2778:  return base.map((v,i)=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2779:    t:i*15, lluvia:+(v*(0.82+rng(semilla+i)*0.36)).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2780:    humSuelo:+(0.32+rng(semilla+i+50)*0.28).toFixed(3),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2781:    nivelCauce:v>5?+(0.75+v*0.09*rng(semilla+i+100)).toFixed(3):+(0.28+rng(semilla+i+100)*0.12).toFixed(3),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2782:    temp:+(18+rng(semilla+i+200)*6).toFixed(1),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2783:  })).map((r,i,a)=>({...r,acum:+(a.slice(0,i+1).reduce((s,x)=>s+x.lluvia,0)).toFixed(2)}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2784:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2785:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2786:// ─── MOTOR DE PONDERACIÓN ─────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2787:function distKm(lat1,lon1,lat2,lon2){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2788:  const dLat=(lat2-lat1)*111.32;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2789:  const dLon=(lon2-lon1)*111.32*Math.cos((lat1+lat2)/2*Math.PI/180);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2790:  return Math.sqrt(dLat**2+dLon**2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2791:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2792:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2793:function calcIDW(ests,latC,lonC,p=2){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2794:  const rows=ests.map(e=>({...e,d:distKm(latC,lonC,e.lat,e.lon)}));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2795:  const w=rows.map(e=>1/Math.pow(Math.max(e.d,0.1),p));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2796:  const wT=w.reduce((s,x)=>s+x,0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2797:  return rows.map((e,i)=>({...e,dist:+e.d.toFixed(3),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2798:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2799:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2800:function calcThiessen(ests,latC,lonC){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2801:  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2802:  const dMx=Math.max(...d),dMn=Math.min(...d);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2803:  const w=d.map(v=>1-(v-dMn)/(dMx-dMn+0.001));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2804:  const wT=w.reduce((s,x)=>s+x,0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2805:  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2806:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2807:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2808:function calcAltitudinal(ests,altC,latC,lonC){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2809:  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2810:  const dA=ests.map(e=>Math.abs(e.alt-altC));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2811:  const dAMx=Math.max(...dA)+1;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2812:  const w=ests.map((e,i)=>(1-dA[i]/dAMx)*0.5+(1/Math.pow(Math.max(d[i],0.1),1.5))*0.5);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2813:  const wT=w.reduce((s,x)=>s+x,0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2814:  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),dAlt:+dA[i].toFixed(0),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2815:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2816:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2817:function calcCompuesto(ests,latC,lonC,altC){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2818:  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2819:  const dA=ests.map(e=>Math.abs(e.alt-altC));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2820:  const iObs=ests.map(e=>e.I30_obs||60);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2821:  const norm=arr=>{const mx=Math.max(...arr),mn=Math.min(...arr);return arr.map(v=>(v-mn)/(mx-mn+0.001));};
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2822:  const wD=norm(d).map(v=>1-v);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2823:  const wA=norm(dA).map(v=>1-v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2824:  const wI=norm(iObs);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2825:  const wR=ests.map(e=>e.red==="EPM-SIATA"?1:e.red==="SIATA"?0.85:e.red==="IDEAM-SIATA"?0.75:0.6);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2826:  const s=ests.map((_,i)=>wD[i]*0.40+wA[i]*0.25+wI[i]*0.20+wR[i]*0.15);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2827:  const sT=s.reduce((a,b)=>a+b,0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2828:  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),dAlt:+dA[i].toFixed(0),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2829:    score:+s[i].toFixed(4),pct:+(s[i]/sT*100).toFixed(2),peso:+(s[i]/sT).toFixed(5)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2830:  })).sort((a,b)=>b.score-a.score).map((e,j)=>({...e,rank:j+1,dominante:j===0}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2831:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2832:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2833:function calcIDFPond(ests,d_min,Tr){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2834:  const con=ests.filter(e=>e.epm_key&&ESTACIONES_EPM[e.epm_key]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2835:  if(!con.length) return 0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2836:  const wT=con.reduce((s,e)=>s+e.peso,0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2837:  return wT>0?con.reduce((s,e)=>s+idfI(ESTACIONES_EPM[e.epm_key],d_min,Tr)*e.peso,0)/wT:0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2838:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2839:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2840:// ─── SVG MAPA AMVA ────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2841:function MapaAMVA({ests,cLat,cLon,selIdx,onSel,showLabels=true}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2842:  const W=500,H=400;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2843:  const LAT_MIN=5.93,LAT_MAX=6.52,LON_MIN=-75.82,LON_MAX=-75.33;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2844:  const toXY=(lat,lon)=>[(lon-LON_MIN)/(LON_MAX-LON_MIN)*W,(1-(lat-LAT_MIN)/(LAT_MAX-LAT_MIN))*H];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2845:  const[cx,cy]=toXY(cLat,cLon);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2846:  const maxPct=Math.max(...ests.map(e=>e.pct||0),0.1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2847:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2848:  return(<svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,display:"block"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2849:    <defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2850:      <radialGradient id="bgGrad" cx="50%" cy="55%" r="65%">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2851:        <stop offset="0%" stopColor="#0B1820"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2852:        <stop offset="100%" stopColor="#070910"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2853:      </radialGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2854:    </defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2855:    <rect width={W} height={H} fill="url(#bgGrad)"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2856:    {/* Grid */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2857:    {[6.0,6.1,6.2,6.3,6.4,6.5].map(lat=>{const[,y]=toXY(lat,-75.5);return(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2858:      <g key={lat}><line x1={0} y1={y} x2={W} y2={y} stroke={C.border} strokeWidth={0.5} opacity={0.5}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2859:        <text x={3} y={y-2} fill={C.muted} fontSize={7} fontFamily="monospace">{lat.toFixed(1)}°</text></g>);})}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2860:    {[-75.7,-75.6,-75.5,-75.4].map(lon=>{const[x]=toXY(6.2,lon);return(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2861:      <g key={lon}><line x1={x} y1={0} x2={x} y2={H} stroke={C.border} strokeWidth={0.5} opacity={0.5}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2862:        <text x={x+2} y={H-3} fill={C.muted} fontSize={7} fontFamily="monospace">{lon}°</text></g>);})}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2863:    {/* Río Medellín */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2864:    <path d={`M ${toXY(5.96,-75.66).join(",")} Q ${toXY(6.08,-75.62).join(",")} ${toXY(6.22,-75.57).join(",")} Q ${toXY(6.34,-75.56).join(",")} ${toXY(6.47,-75.54).join(",")}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2865:      stroke="#0A3A5A" strokeWidth={3.5} fill="none" opacity={0.7}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2866:    <path d={`M ${toXY(5.96,-75.66).join(",")} Q ${toXY(6.08,-75.62).join(",")} ${toXY(6.22,-75.57).join(",")} Q ${toXY(6.34,-75.56).join(",")} ${toXY(6.47,-75.54).join(",")}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2867:      stroke={C.accent} strokeWidth={1} fill="none" opacity={0.25}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2868:    {/* Radio cuenca */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2869:    {[8,16,24].map((r,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2870:      const rPx=r/(LON_MAX-LON_MIN)*W;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2871:      return(<circle key={r} cx={cx} cy={cy} r={rPx} fill="none" stroke={C.teal} strokeWidth={0.5} strokeDasharray="4 5" opacity={0.12+i*0.04}/>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2872:    })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2873:    {/* Líneas de conexión */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2874:    {ests.map((e,i)=>{const[ex,ey]=toXY(e.lat,e.lon);const pct=e.pct||0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2875:      return(<line key={i} x1={cx} y1={cy} x2={ex} y2={ey}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2876:        stroke={i===0?C.teal:pct>10?C.accent2:C.accent}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2877:        strokeWidth={Math.max(0.3,pct/maxPct*2.2)} opacity={Math.max(0.08,pct/maxPct*0.6)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2878:        strokeDasharray={pct<4?"3 5":undefined}/>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2879:    })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2880:    {/* Estaciones */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2881:    {ests.map((e,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2882:      const[ex,ey]=toXY(e.lat,e.lon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2883:      const pct=e.pct||0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2884:      const sel=i===selIdx;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2885:      const col=e.estado==="Activa"?(i===0?C.teal:pct>12?C.accent2:pct>5?C.accent:C.muted2):C.rose;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2886:      const r=sel?9:Math.max(3.5,pct/maxPct*9);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2887:      return(<g key={i} style={{cursor:"pointer"}} onClick={()=>onSel(i)}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2888:        {sel&&<circle cx={ex} cy={ey} r={r+5} fill="none" stroke={col} strokeWidth={1.5} opacity={0.45}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2889:        {i===0&&<circle cx={ex} cy={ey} r={r+3} fill="none" stroke={C.teal} strokeWidth={1} opacity={0.35} strokeDasharray="3 3"/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2890:        <circle cx={ex} cy={ey} r={r} fill={col} opacity={sel?1:0.88}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2891:        {showLabels&&(sel||pct>6)&&<text x={ex+r+3} y={ey+4} fill={sel?col:C.muted2} fontSize={sel?8.5:7}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2892:          fontFamily="monospace" fontWeight={sel?700:400}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2893:          {e.nombre.length>16?e.nombre.substring(0,15)+"…":e.nombre}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2894:        </text>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2895:        {pct>0&&<text x={ex+r+3} y={ey+14} fill={col} fontSize={6.5} fontFamily="monospace">{pct.toFixed(1)}%</text>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2896:      </g>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2897:    })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2898:    {/* Cuenca */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2899:    <circle cx={cx} cy={cy} r={11} fill={C.gold} opacity={0.9}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2900:    <circle cx={cx} cy={cy} r={15} fill="none" stroke={C.gold} strokeWidth={1.5} opacity={0.35}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2901:    <text x={cx+17} y={cy+4} fill={C.gold} fontSize={9} fontFamily="monospace" fontWeight={700}>⊕ Cuenca</text>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2902:    {/* Leyenda */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2903:    <g transform={`translate(6,${H-72})`}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2904:      <rect width={118} height={68} rx={5} fill={`${C.panel}EE`} stroke={C.border} strokeWidth={0.5}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2905:      <text x={6} y={13} fill={C.muted} fontSize={8} fontFamily="monospace" fontWeight={700}>LEYENDA</text>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2906:      {[[C.gold,"Cuenca objetivo"],[C.teal,"Dominante"],[C.accent2,"Alta inf. (>12%)"],[C.accent,"Media inf."],[C.muted2,"Baja inf."],[C.rose,"Mantenimiento"]].map(([col,lbl],i)=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2907:        <g key={i} transform={`translate(6,${19+i*8})`}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2908:          <circle r={2.5} cx={2.5} cy={0} fill={col}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2909:          <text x={9} y={4} fill={C.muted2} fontSize={7} fontFamily="monospace">{lbl}</text>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2910:        </g>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2911:      ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2912:    </g>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2913:    <text x={W-18} y={16} fill={C.muted} fontSize={11} fontFamily="monospace">N↑</text>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2914:  </svg>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2915:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2916:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2917:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2918:// MÓDULO INFLUENCIA — Ponderación multicriterio + Escenarios
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2919:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2920:function ModInfluencia({params}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2921:  const[method,setMethod]=useState("compuesto");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2922:  const[potIDW,setPotIDW]=useState(2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2923:  const[selIdx,setSelIdx]=useState(0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2924:  const[excl,setExcl]=useState(new Set());
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2925:  const[Tr,setTr]=useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2926:  const[dMin,setDMin]=useState(30);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2927:  const[showLabels,setShowLabels]=useState(true);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2928:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2929:  // Punto de salida → fuente única de verdad para selección de estaciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2930:  const cLat=+params.lat_salida||6.185;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2931:  const cLon=+params.lon_salida||-75.660;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2932:  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2933:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2934:  const activos=useMemo(()=>ESTACIONES_SIATA.filter((_,i)=>!excl.has(i)),[excl]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2935:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2936:  const pond=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2938:    if(method==="thiessen") return calcThiessen(activos,cLat,cLon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2939:    if(method==="alt")      return calcAltitudinal(activos,cAlt,cLat,cLon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2940:    return calcCompuesto(activos,cLat,cLon,cAlt);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2941:  },[activos,method,potIDW,cLat,cLon,cAlt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2942:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2943:  // Mapear a lista completa (excluidas = pct 0)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2944:  const pesosMap=useMemo(()=>ESTACIONES_SIATA.map((_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2945:    if(excl.has(i)) return{pct:0,peso:0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2946:    const e=activos.find(a=>a.codigo===ESTACIONES_SIATA[i].codigo);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2947:    const r=e?pond.find(p=>p.codigo===e.codigo):null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2948:    return r?{pct:r.pct,peso:r.peso}:{pct:0,peso:0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2949:  }),[pond,activos,excl]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2950:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2951:  const estsConPeso=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>({...e,...pesosMap[i]})),[pesosMap]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2952:const idfPond=useMemo(()=>calcIDFPond(pond,dMin,Tr),[pond,dMin,Tr]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2953:  const idfDom=dominante?.epm_key&&ESTACIONES_EPM[dominante.epm_key]?idfI(ESTACIONES_EPM[dominante.epm_key],dMin,Tr):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2954:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2955:  // Análisis de escenarios: impacto de eliminar cada estación
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2956:  const escenarios=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2957:    const sin=ESTACIONES_SIATA.filter((_,j)=>j!==i&&!excl.has(j));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2958:    const p2=method==="idw"?calcIDW(sin,cLat,cLon,potIDW)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2959:      :method==="thiessen"?calcThiessen(sin,cLat,cLon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2960:      :method==="alt"?calcAltitudinal(sin,cAlt,cLat,cLon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2961:      :calcCompuesto(sin,cLat,cLon,cAlt);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2962:    const iSin=calcIDFPond(p2,dMin,Tr);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2963:    return{nombre:e.nombre.length>18?e.nombre.substring(0,17)+"…":e.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2964:      iSin:+iSin.toFixed(2),delta:idfPond>0?+((iSin-idfPond)/idfPond*100).toFixed(2):0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2965:  }).sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta)),[excl,method,potIDW,cLat,cLon,cAlt,dMin,Tr,idfPond]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2966:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2967:  // IDF comparativa curvas
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2968:  const idfCurvas=useMemo(()=>[5,10,15,20,30,45,60,90,120,180,240].map(d=>({d,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2969:    "IDF Ponderada":+calcIDFPond(pond,d,Tr).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2970:    "Dominante":dominante?.epm_key&&ESTACIONES_EPM[dominante.epm_key]?+idfI(ESTACIONES_EPM[dominante.epm_key],d,Tr).toFixed(2):0,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2971:    "Estación Sel.":ESTACIONES_SIATA[selIdx]?.epm_key&&ESTACIONES_EPM[ESTACIONES_SIATA[selIdx].epm_key]?+idfI(ESTACIONES_EPM[ESTACIONES_SIATA[selIdx].epm_key],d,Tr).toFixed(2):0,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2972:  })),[pond,dominante,selIdx,Tr]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2973:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2974:  const toggleExcl=i=>setExcl(s=>{const n=new Set(s);n.has(i)?n.delete(i):n.add(i);return n;});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2975:  const eSel=ESTACIONES_SIATA[selIdx];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2976:  const iSin=escenarios.find(e=>e.nombre===eSel?.nombre?.substring(0,17)+(eSel?.nombre?.length>17?"…":""));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2977:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2978:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2979:    <SectionHeader icon="⊕" title="Ponderación de Estaciones — Índice de Influencia Multicriterio" sub="IDW (p configurable) · Thiessen · Altitudinal · Compuesto 4 criterios · Análisis de escenarios · 17 estaciones SIATA" 
accent={C.teal}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2980:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2981:    {/* Controles top */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2982:    <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1.2fr 1fr 1fr",gap:10}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2983:      <Card title="Método de ponderación" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2984:        <BtnGroup options={[{v:"compuesto",l:"Compuesto"},{v:"idw",l:"IDW"},{v:"thiessen",l:"Thiessen"},{v:"alt",l:"Altitudinal"}]} value={method} onChange={setMethod} accent={C.teal}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2985:        {method==="idw"&&<div style={{marginTop:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2986:          <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:2}}>Potencia IDW (p = {potIDW})</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2987:          <input type="range" min={1} max={4} step={0.5} value={potIDW} onChange={e=>setPotIDW(+e.target.value)} style={{width:"100%",accentColor:C.teal}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2988:        </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2989:        {method==="compuesto"&&<div style={{marginTop:7,fontSize:8,color:C.muted,fontFamily:mono,lineHeight:1.7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2990:          Dist 40% · Alt 25%<br/>I obs 20% · Red 15%
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2991:        </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2992:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2993:      <Card title="Parámetros IDF" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2994:        <div style={{marginBottom:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2995:          <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:3}}>Tr (años)</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2996:          <BtnGroup options={[{v:5,l:"5a"},{v:25,l:"25a"},{v:100,l:"100a"}]} value={Tr} onChange={setTr} accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2997:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2998:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2999:          <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:3}}>Duración (min)</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3000:          <BtnGroup options={[{v:15,l:"15'"},{v:30,l:"30'"},{v:60,l:"60'"}]} value={dMin} onChange={setDMin} accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3001:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3003:      <Card title="KPIs · Influencia activa" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3004:        <div style={{display:"flex",flexDirection:"column",gap:4,fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3005:          {[["Método",method.toUpperCase()],["Estaciones activas",`${activos.length}/${ESTACIONES_SIATA.length}`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3006:            ["Dominante",dominante?.nombre?.split(" ")[0]||"—"],["I ponderada",`${idfPond.toFixed(2)} mm/h`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3007:            ["I dominante",`${idfDom.toFixed(2)} mm/h`],["Δ pond vs dom.",`${idfPond>0?((idfPond-idfDom)/idfDom*100).toFixed(1):"0"}%`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3008:          ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3009:            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",borderBottom:`1px solid ${C.border}15`}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3010:              <span style={{color:C.muted}}>{l}</span><span style={{color:C.text,fontWeight:600}}>{v}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3011:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3012:          ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3013:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3014:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3015:      <Card title="Estación seleccionada" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3016:        {eSel&&<div style={{fontFamily:mono,fontSize:9,display:"flex",flexDirection:"column",gap:3}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3017:          <div style={{color:C.accent4,fontWeight:700,fontSize:10,lineHeight:1.3}}>{eSel.nombre}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3018:          <div style={{color:C.muted}}>Código: <span style={{color:C.text}}>{eSel.codigo}</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3019:          <div style={{color:C.muted}}>Alt: <span style={{color:C.text}}>{eSel.alt} msnm</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3020:          <div style={{color:C.muted}}>Red: <span style={{color:C.text}}>{eSel.red}</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3021:          <div style={{color:C.muted}}>Dist: <span style={{color:C.text}}>{distKm(cLat,cLon,eSel.lat,eSel.lon).toFixed(2)} km</span></div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3022:          <div style={{color:C.muted}}>Influencia: <span style={{color:C.teal,fontWeight:700}}>{pesosMap[selIdx]?.pct.toFixed(2)||0}%</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3023:          <div style={{marginTop:4,display:"flex",gap:3,flexWrap:"wrap"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3024:            {eSel.vars.map(v=><span key={v} style={{padding:"1px 5px",borderRadius:8,background:`${C.accent}12`,border:`1px solid ${C.accent}20`,fontSize:7.5,color:C.accent}}>{v}</span>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3025:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3026:        </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3027:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3028:      <Card title="Escenario: sin seleccionada" accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3029:        <div style={{fontFamily:mono,fontSize:9,display:"flex",flexDirection:"column",gap:5}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3030:          <div style={{color:C.muted}}>I ponderada actual:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3031:          <div style={{color:C.accent,fontSize:14,fontWeight:800}}>{idfPond.toFixed(2)} <span style={{fontSize:9,fontWeight:400}}>mm/h</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3032:          <div style={{color:C.muted,marginTop:2}}>Sin {eSel?.nombre?.split(" ")[0]}:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3033:          <div style={{color:C.rose,fontSize:14,fontWeight:800}}>{iSin?.iSin?.toFixed(2)||"—"} <span style={{fontSize:9,fontWeight:400}}>mm/h</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3034:          {iSin&&<div style={{padding:"4px 8px",borderRadius:6,textAlign:"center",marginTop:2,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3035:            background:`${Math.abs(iSin.delta)<1?C.accent2:iSin.delta>0?C.rose:C.accent3}12`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3036:            border:`1px solid ${Math.abs(iSin.delta)<1?C.accent2:iSin.delta>0?C.rose:C.accent3}25`}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3037:            <span style={{color:Math.abs(iSin.delta)<1?C.accent2:iSin.delta>0?C.rose:C.accent3,fontWeight:700}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3038:              {iSin.delta>0?"+":""}{iSin.delta}%
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3042:          <div style={{color:C.muted,fontSize:8}}>d={dMin}min · Tr={Tr}a</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3043:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3044:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3045:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3046:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3047:    {/* Mapa + Ranking */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3048:    <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3049:      <Card title={`Mapa AMVA — ${ESTACIONES_SIATA.length} Estaciones · ${method.toUpperCase()} · ${activos.length} activas`} accent={C.teal}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3050:        style={{position:"relative"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3051:        <div style={{position:"absolute",top:36,right:14,zIndex:10}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3052:          <button onClick={()=>setShowLabels(v=>!v)} style={{padding:"3px 8px",borderRadius:5,border:`1px solid ${C.border}`,background:C.bg,color:C.muted,fontSize:8,cursor:"pointer",fontFamily:mono}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3053:            {showLabels?"Ocultar etiquetas":"Mostrar etiquetas"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3054:          </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3055:        </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3056:        <MapaAMVA ests={estsConPeso} cLat={cLat} cLon={cLon} selIdx={selIdx} onSel={setSelIdx} showLabels={showLabels}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3057:        <div style={{marginTop:6,fontSize:8,color:C.muted,fontFamily:mono,textAlign:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3058:          Clic en estación para seleccionar · Radios de referencia: 8, 16, 24 km · Río Medellín (cauce principal AMVA)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3059:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3060:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3061:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3062:      <Card title={`Ranking Influencia — ${method.toUpperCase()}`} accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3063:        <div style={{overflowY:"auto",maxHeight:395,display:"flex",flexDirection:"column",gap:3}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3064:          {pond.map((e,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3065:            const sIdx=ESTACIONES_SIATA.findIndex(s=>s.codigo===e.codigo);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3066:            const isExcl=excl.has(sIdx);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3067:            return(<div key={e.codigo} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 8px",borderRadius:7,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3068:              background:i===0?`${C.teal}0E`:i<3?`${C.accent2}06`:`${C.border}10`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3069:              border:`1px solid ${i===0?C.teal:i<3?C.accent2:C.border}${i===0?"35":"15"}`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3070:              opacity:isExcl?0.35:1,cursor:"pointer"}} onClick={()=>setSelIdx(sIdx)}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3071:              <div style={{width:19,height:19,borderRadius:"50%",background:i===0?C.teal:i<3?C.accent2:C.muted,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3072:                display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:C.bg,flexShrink:0}}>{i+1}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3073:              <div style={{flex:1,minWidth:0}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3074:                <div style={{fontSize:9.5,fontWeight:i===0?700:400,color:i===0?C.teal:C.text,fontFamily:sans,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3075:                  whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.nombre}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3076:                <div style={{height:3,background:C.border,borderRadius:2,marginTop:3}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3077:                  <div style={{height:"100%",width:`${e.pct||0}%`,background:i===0?C.teal:i<3?C.accent2:C.accent,borderRadius:2}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3078:                </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3093:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3094:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3095:    {/* Gráfica barras influencia */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3096:    <Card title={`Índice de Influencia — ${method.toUpperCase()} · Tr=${Tr}a · d=${dMin}min`} accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3097:      <ResponsiveContainer width="100%" height={220}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3098:        <BarChart data={pond.map(e=>({n:e.nombre.length>16?e.nombre.substring(0,15)+"…":e.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3099:          pct:e.pct||0,dist:e.dist,alt:e.alt}))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3100:          margin={{left:0,right:12,top:8,bottom:48}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3101:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3102:          <XAxis dataKey="n" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3103:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Influencia (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3104:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(nm==="pct"?2:0)+(nm==="pct"?"%":" km"),nm]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3105:          <Bar dataKey="pct" name="Influencia (%)" radius={[3,3,0,0]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3106:            label={{position:"top",fill:C.muted2,fontSize:7,formatter:v=>v.toFixed(1)+"%"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3107:            {pond.map((_,i)=><Cell key={i} fill={i===0?C.teal:i<3?C.accent2:C.accent} opacity={0.85}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3108:          </Bar>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3109:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3110:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3111:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3112:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3113:    {/* IDF ponderada vs referencias */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3114:    <Card title={`IDF Ponderada (${method}) vs Dominante vs Seleccionada · Tr=${Tr}a`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3115:      <ResponsiveContainer width="100%" height={240}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3116:        <LineChart data={idfCurvas} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3117:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3118:          <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3119:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3120:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(2)+" mm/h",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3121:          <Legend wrapperStyle={{fontSize:10}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3122:          <Line type="monotone" dataKey="IDF Ponderada" stroke={C.teal} strokeWidth={3} dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3123:          <Line type="monotone" dataKey="Dominante"     stroke={C.accent2} strokeWidth={2} strokeDasharray="6 2" dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3124:          <Line type="monotone" dataKey="Estación Sel." stroke={C.accent4} strokeWidth={1.8} strokeDasharray="4 4" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3125:        </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3126:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3127:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3128:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3129:    {/* Análisis de escenarios */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3130:    <Card title={`Análisis de Escenarios — Δ I(d=${dMin}min, Tr=${Tr}a) al Eliminar Cada Estación`} accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3131:      <ResponsiveContainer width="100%" height={210}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3132:        <BarChart data={escenarios} margin={{left:0,right:14,top:8,bottom:50}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3133:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3134:          <XAxis dataKey="nombre" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3135:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Δ I (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3136:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+(nm==="delta"?"%":" mm/h"),nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3137:          <ReferenceLine y={0} stroke={C.muted} strokeWidth={1}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3138:          <Bar dataKey="delta" name="Δ IDF (%)" radius={[2,2,0,0]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3139:            label={{position:"insideTop",fill:C.bg,fontSize:7,formatter:v=>(v>0?"+":"")+v+"%"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3140:            {escenarios.map((e,i)=><Cell key={i} fill={Math.abs(e.delta)>5?C.rose:Math.abs(e.delta)>2?C.gold:C.accent2}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3141:          </Bar>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3142:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3143:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3144:      <div style={{marginTop:6,fontSize:8.5,color:C.muted,fontFamily:mono,padding:"6px 10px",background:`${C.border}20`,borderRadius:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3145:        <span style={{color:C.rose}}>●</span> Δ&gt;5%: impacto alto  <span style={{color:C.gold,marginLeft:12}}>●</span> 2-5%: moderado  <span style={{color:C.accent2,marginLeft:12}}>●</span> &lt;2%: bajo — Valor positivo = la I 
ponderada sube al eliminar la estación (estación deprimía la media).
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3146:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3147:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3148:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3149:    {/* Tabla maestra */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3150:    <Card title="Tabla Maestra — Estaciones · Índices de Influencia · Métricas Completas" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3151:      <Tbl headers={["#","Estación","Código","Alt (m)","Red","Dist (km)","ΔAlt (m)","I30 obs","Estado","Variables","Influencia (%)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3152:        rows={pond.map((e,i)=>({R:e.rank||i+1,N:e.nombre,C:e.codigo,A:e.alt,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3153:          Rd:e.red,D:e.dist||0,DA:e.dAlt||0,I30:e.I30_obs,S:e.estado,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3154:          V:e.vars?.join("·")||"P",W:e.pct||0}))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3155:        hiCols={[10]} accent={C.teal}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3156:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3157:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3158:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3159:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3160:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3161:// MÓDULO SIATA — Integración + Series + Catálogo + Arquitectura
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3162:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3163:function ModSIATA({params}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3164:  const[selStn,setSelStn]=useState(0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3165:  const[subTab,setSubTab]=useState("series");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3166:  const[apiStatus,setApiStatus]=useState("idle");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3167:  const[filterVar,setFilterVar]=useState("Todas");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3168:  const[simDatos]=useState(()=>ESTACIONES_SIATA.map((_,i)=>generarSerieSIATA(42+i*7)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3169:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3170:  const e=ESTACIONES_SIATA[selStn];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3171:  const serie=simDatos[selStn];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3172:  const acumTotal=serie[serie.length-1]?.acum||0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3173:  const maxLluvia=Math.max(...serie.map(r=>r.lluvia));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3174:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3175:  // Punto de salida → fuente única de verdad
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3176:  const cLat=+params.lat_salida||6.185, cLon=+params.lon_salida||-75.660;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3177:  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3178:  const pesosVisuales=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3179:    const p=calcCompuesto(ESTACIONES_SIATA,cLat,cLon,cAlt);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3180:    return ESTACIONES_SIATA.map(e2=>p.find(x=>x.codigo===e2.codigo)||{pct:0,peso:0});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3181:  },[cLat,cLon,cAlt]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3182:  const estsConPeso=ESTACIONES_SIATA.map((e2,i)=>({...e2,...pesosVisuales[i]}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3183:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3184:  const consultarAPI=useCallback(async()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3185:    setApiStatus("loading");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3186:    try{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3187:      const r=await fetch("https://repopruebas.siata.gov.co/datos_siata/application/index.php/estaciones/getEstaciones",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3188:        {signal:AbortSignal.timeout(7000)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3189:      setApiStatus(r.ok?"ok":"error");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3190:    }catch(err){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3191:      setApiStatus(err.name==="TimeoutError"?"timeout":"cors");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3192:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3193:  },[]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3194:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3195:  const vars=["Todas","P","T","HR","Viento","N.Cauce","HumSuelo","Rad","PA"];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3196:  const filtradas=ESTACIONES_SIATA.filter(s=>filterVar==="Todas"||s.vars.includes(filterVar));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3197:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3198:  const redStats={
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3199:    total:ESTACIONES_SIATA.length,activas:ESTACIONES_SIATA.filter(s=>s.estado==="Activa").length,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3200:    epmSiata:ESTACIONES_SIATA.filter(s=>s.red==="EPM-SIATA").length,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3201:    siata:ESTACIONES_SIATA.filter(s=>s.red==="SIATA").length,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3215:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3216:  const asc=API_STATUS_CFG[apiStatus];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3217:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3218:  // Comparativa obs vs IDF teórica
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3219:  const idfComp=e?.epm_key&&ESTACIONES_EPM[e.epm_key]?
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3220:    [15,30,60].map(d=>{const iT=idfI(ESTACIONES_EPM[e.epm_key],d,25);const iO=d===15?maxLluvia*4:d===30?e.I30_obs:e.I60_obs;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3221:      return{d:`d=${d}'`,iTeor:+iT.toFixed(1),iObs:+iO.toFixed(1),ratio:+(iO/iT*100).toFixed(1)};}):[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3222:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3223:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3224:    <SectionHeader icon="🛰" title="SIATA — Sistema de Alertas Tempranas del Valle de Aburrá" sub="Integración hidrometeorológica · API repopruebas.siata.gov.co · 17 estaciones · Series temporales · Arquitectura microservicios" 
accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3225:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3226:    {/* Banner API */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3227:    <div style={{background:`${C.accent3}07`,border:`1px solid ${C.accent3}22`,borderRadius:10,padding:"10px 16px",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3228:      <div style={{flex:1,minWidth:200}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3229:        <div style={{fontSize:8,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>Repositorio de pruebas SIATA</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3230:        <div style={{fontSize:11,fontWeight:700,color:C.accent3,fontFamily:mono}}>https://repopruebas.siata.gov.co/</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3231:        <div style={{fontSize:8,color:C.muted2,fontFamily:mono,marginTop:2}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3232:          /datos_siata/application/index.php/estaciones/getEstaciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3233:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3234:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3235:      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3236:        <div style={{padding:"4px 10px",borderRadius:6,background:asc.bg,border:`1px solid ${asc.col}30`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3237:          fontSize:9,fontFamily:mono,color:asc.col,fontWeight:600}}>{asc.label}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3238:        <button onClick={consultarAPI} disabled={apiStatus==="loading"} style={{padding:"6px 14px",borderRadius:7,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3239:          border:`1px solid ${C.accent3}40`,background:`${C.accent3}10`,color:C.accent3,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3240:          fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700,opacity:apiStatus==="loading"?0.5:1}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3241:          {apiStatus==="loading"?"Consultando…":"⚡ Consultar API SIATA"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3242:        </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3243:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3244:      <div style={{fontSize:8,color:C.muted,fontFamily:mono,maxWidth:260,borderLeft:`1px solid ${C.border}`,paddingLeft:12}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3250:    <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3251:      {[[redStats.total,"Estaciones",C.accent],[redStats.activas,"Activas",C.accent2],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3252:        [redStats.epmSiata,"EPM-SIATA",C.teal],[redStats.siata,"SIATA",C.accent4],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3253:        [redStats.ideam,"IDEAM",C.muted2],[redStats.conP,"Con P(lluvia)",C.accent],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3254:        [redStats.conN,"Con N.Cauce",C.gold],[redStats.conHS,"Hum.Suelo",C.rose],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3255:      ].map(([v,l,a])=><Kpi key={l} value={v} label={l} accent={a}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3256:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3257:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3258:    {/* Sub-tabs */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3259:    <div style={{display:"flex",gap:3,borderBottom:`1px solid ${C.border}`,paddingBottom:8}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3260:      {[["series","📈 Series Temporales"],["catalogo","🗂 Catálogo"],["validacion","✓ Validación IDF"],["integracion","⚙ Modelo Hidrológico"],["arquitectura","🏗 Arquitectura"]].map(([id,l])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3261:        <button key={id} onClick={()=>setSubTab(id)} style={{padding:"5px 11px",border:"none",cursor:"pointer",borderRadius:"6px 6px 0 0",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3262:          background:subTab===id?`${C.accent3}15`:"transparent",color:subTab===id?C.accent3:C.muted,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3263:          fontSize:9.5,fontWeight:subTab===id?700:400,borderBottom:subTab===id?`2px solid ${C.accent3}`:"2px solid transparent"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3264:          {l}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3265:        </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3266:      ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3267:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3268:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3269:    {/* ── SERIES ── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3270:    {subTab==="series"&&<>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3271:      <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:12}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3272:        <Card title="Estaciones SIATA" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3273:          <div style={{marginBottom:7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3274:            <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:3}}>Filtrar variable</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3275:            <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3276:              {vars.map(v=><button key={v} onClick={()=>setFilterVar(v)} style={{padding:"2px 7px",borderRadius:6,border:`1px solid 
${filterVar===v?C.accent3:C.border}`,background:filterVar===v?`${C.accent3}15`:"transparent",color:filterVar===v?C.accent3:C.muted,fontSize:8,cursor:"pointer",fontFamily:mono}}>{v}</button>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3277:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3278:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3279:          <div style={{overflowY:"auto",maxHeight:340}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3280:            {filtradas.map(stn=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3281:              const i=ESTACIONES_SIATA.indexOf(stn);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3282:              const sel=i===selStn;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3283:              return(<button key={i} onClick={()=>setSelStn(i)} style={{display:"flex",alignItems:"center",gap:7,width:"100%",padding:"6px 
9px",background:sel?`${C.accent3}10`:"transparent",border:"none",cursor:"pointer",borderBottom:`1px solid ${C.border}12`,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3284:                <div style={{width:6,height:6,borderRadius:"50%",background:stn.estado==="Activa"?C.accent2:C.rose,flexShrink:0}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3285:                <div style={{flex:1,minWidth:0}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3286:                  <div style={{fontSize:9.5,color:sel?C.accent3:C.text,fontWeight:sel?700:400,fontFamily:sans,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{stn.nombre}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3287:                  <div style={{fontSize:7.5,color:C.muted,fontFamily:mono}}>{stn.alt}m · {stn.vars.join(", ")}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3288:                </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3289:              </button>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3290:            })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3291:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3292:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3293:        <div style={{display:"flex",flexDirection:"column",gap:10}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3294:          <div style={{background:`${C.accent3}07`,border:`1px solid ${C.accent3}1A`,borderRadius:10,padding:"9px 13px"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3297:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3298:            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3299:              <Kpi value={`${acumTotal.toFixed(1)} mm`} label="P acumulada" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3300:              <Kpi value={`${maxLluvia.toFixed(1)} mm`} label="Pico 15min" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3301:              <Kpi value={`${(maxLluvia*4).toFixed(0)} mm/h`} label="i máx estimada" accent={C.gold}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3302:              <Kpi value={`${serie.filter(r=>r.lluvia>0).length*15} min`} label="Duración evento" accent={C.teal}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3303:              <Kpi value={`${(serie.reduce((s,r)=>s+r.humSuelo,0)/serie.length).toFixed(2)}`} label="Hum.suelo media" accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3304:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3305:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3306:          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3307:            <Card title="Hum. Suelo + Nivel Cauce" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3308:              <ResponsiveContainer width="100%" height={110}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3309:                <LineChart data={serie} margin={{left:-18,right:8,top:4,bottom:4}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3310:                  <XAxis dataKey="t" hide/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3311:                  <YAxis yAxisId="h" domain={[0,0.8]} tick={{fill:C.muted,fontSize:7.5}} width={28}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3312:                  <YAxis yAxisId="n" orientation="right" tick={{fill:C.muted,fontSize:7.5}} width={28}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3313:                  <Tooltip contentStyle={{...TT,fontSize:9}} formatter={(v,nm)=>[v.toFixed(3),nm]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3314:                  <Line yAxisId="h" type="monotone" dataKey="humSuelo" stroke={C.gold} strokeWidth={2} dot={false} name="Hum.suelo"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3315:                  {e.vars.includes("N.Cauce")&&<Line yAxisId="n" type="monotone" dataKey="nivelCauce" stroke={C.rose} strokeWidth={2} dot={false} name="Nivel (m)"/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3316:                </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3317:              </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3318:            </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3319:            <Card title="Temperatura" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3320:              <ResponsiveContainer width="100%" height={110}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3321:                <LineChart data={serie} margin={{left:-18,right:8,top:4,bottom:4}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3322:                  <XAxis dataKey="t" hide/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3323:                  <YAxis tick={{fill:C.muted,fontSize:7.5}} width={28}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3324:                  <Tooltip contentStyle={{...TT,fontSize:9}} formatter={(v,nm)=>[v.toFixed(1)+"°C",nm]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3325:                  <Line type="monotone" dataKey="temp" stroke={C.accent4} strokeWidth={2} dot={false} name="T (°C)"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3326:                </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3327:              </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3328:            </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3329:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3330:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3331:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3332:      <Card title={`Evento de Lluvia SIATA — ${e.nombre} · Intervalo 15min · P_acum=${acumTotal.toFixed(1)}mm`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3333:        <ResponsiveContainer width="100%" height={260}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3334:          <ComposedChart data={serie} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3335:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3336:            <XAxis dataKey="t" tick={{fill:C.muted,fontSize:9}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3337:            <YAxis yAxisId="p" tick={{fill:C.muted,fontSize:9}} label={{value:"P (mm/15min)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3338:            <YAxis yAxisId="a" orientation="right" tick={{fill:C.muted,fontSize:9}} label={{value:"P acum (mm)",angle:90,position:"insideRight",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3339:            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(2)+" mm",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3340:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3341:            <Bar yAxisId="p" dataKey="lluvia" fill={C.accent3} radius={[2,2,0,0]} name="P 15min (mm)" opacity={0.85}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3342:            <Line yAxisId="a" type="monotone" dataKey="acum" stroke={C.accent2} strokeWidth={2.5} dot={false} name="P acumulada (mm)"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3343:          </ComposedChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3344:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3345:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3346:    </>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3347:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3348:    {/* ── CATÁLOGO ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3349:    {subTab==="catalogo"&&<>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3350:      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3351:        <Card title="Distribución por Red" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3352:          <ResponsiveContainer width="100%" height={200}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3353:            <BarChart data={["EPM-SIATA","SIATA","IDEAM-SIATA","IDEAM","EPM"].map(r=>({r,n:ESTACIONES_SIATA.filter(e=>e.red===r).length}))} margin={{left:0,right:14,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3354:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3355:              <XAxis dataKey="r" tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3356:              <YAxis tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3357:              <Tooltip contentStyle={TT}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3358:              <Bar dataKey="n" name="Estaciones" radius={[3,3,0,0]} label={{position:"top",fill:C.muted2,fontSize:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3359:                {["EPM-SIATA","SIATA","IDEAM-SIATA","IDEAM","EPM"].map((_,i)=><Cell key={i} fill={CC[i]}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3360:              </Bar>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3361:            </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3362:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3363:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3364:        <Card title="Variables monitoreadas" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3365:          <ResponsiveContainer width="100%" height={200}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3366:            <BarChart data={["P","T","HR","Viento","N.Cauce","HumSuelo","Rad","PA"].map(v=>({v,n:ESTACIONES_SIATA.filter(e=>e.vars.includes(v)).length}))} margin={{left:0,right:14,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3367:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3368:              <XAxis dataKey="v" tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3369:              <YAxis tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3370:              <Tooltip contentStyle={TT}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3371:              <Bar dataKey="n" name="Estaciones" radius={[3,3,0,0]} label={{position:"top",fill:C.muted2,fontSize:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3372:                {["P","T","HR","Viento","N.Cauce","HumSuelo","Rad","PA"].map((_,i)=><Cell key={i} fill={CC[i+4]}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3373:              </Bar>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3374:            </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3375:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3376:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3377:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3378:      <Card title="Catálogo Completo — Red Hidrometeorológica SIATA AMVA" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3379:        <Tbl headers={["#","Estación","Código","Lat","Lon","Alt (m)","Red","Variables","Estado","I30 obs (mm/h)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3380:          rows={ESTACIONES_SIATA.map((s,i)=>({N:i+1,E:s.nombre,C:s.codigo,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3381:            La:+s.lat.toFixed(5),Lo:+s.lon.toFixed(5),A:s.alt,R:s.red,V:s.vars.join("·"),S:s.estado,I30:s.I30_obs}))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3382:          hiCols={[9]} accent={C.accent4}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3383:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3384:    </>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3385:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3386:    {/* ── VALIDACIÓN IDF ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3387:    {subTab==="validacion"&&<>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3388:      <Card title="Comparativa IDF Teórica (EPM 2025) vs I Observada SIATA (Tr=25a)" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3389:        <ResponsiveContainer width="100%" height={260}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3390:          <BarChart data={ESTACIONES_SIATA.filter(s=>s.epm_key&&ESTACIONES_EPM[s.epm_key]).map(s=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3391:            n:s.nombre.length>14?s.nombre.substring(0,13)+"…":s.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3392:            iTeor30:+idfI(ESTACIONES_EPM[s.epm_key],30,25).toFixed(1),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3393:            iObs30:s.I30_obs,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3394:            ratio:+(s.I30_obs/idfI(ESTACIONES_EPM[s.epm_key],30,25)*100).toFixed(1),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3395:          }))} margin={{left:0,right:14,top:8,bottom:44}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3396:            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3397:            <XAxis dataKey="n" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3398:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3399:            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+(nm==="ratio"?"%":" mm/h"),nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3400:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3401:            <Bar dataKey="iTeor30" name="I teórica d=30min (mm/h)" fill={C.accent2} radius={[2,2,0,0]} opacity={0.8}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3402:            <Bar dataKey="iObs30"  name="I observada SIATA (mm/h)" fill={C.accent3} radius={[2,2,0,0]} opacity={0.8}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3403:          </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3404:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3405:        <div style={{marginTop:8,fontSize:8.5,color:C.muted,fontFamily:mono,padding:"5px 10px",background:`${C.border}15`,borderRadius:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3406:          ⚠ I observada SIATA = intensidad representativa del evento. Tr=25a teórica = valor esperado estadísticamente. Diferencias &gt;15% sugieren revisar calibración IDF o período de retorno real del evento.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3407:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3408:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3409:      <Card title="Tabla Validación — I obs vs I teórica · Ratio de sesgo" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3410:        <Tbl headers={["Estación","I teórica 30min (mm/h)","I obs SIATA 30min (mm/h)","Ratio obs/teórica (%)","Sesgo","I obs 60min","I teórica 60min"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3411:          rows={ESTACIONES_SIATA.filter(s=>s.epm_key&&ESTACIONES_EPM[s.epm_key]).map(s=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3412:            const iT30=+idfI(ESTACIONES_EPM[s.epm_key],30,25).toFixed(1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3413:            const iT60=+idfI(ESTACIONES_EPM[s.epm_key],60,25).toFixed(1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3414:            const ratio=+(s.I30_obs/iT30*100).toFixed(1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3415:            return{E:s.nombre,IT30:iT30,IO30:s.I30_obs,R:ratio,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3416:              S:ratio>115?"Sobreestima IDF":ratio<85?"Subestima IDF":"Consistente",IO60:s.I60_obs,IT60:iT60};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3417:          })} hiCols={[3]} accent={C.accent2}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3418:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3419:    </>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3420:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3421:    {/* ── INTEGRACIÓN MODELO ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3422:    {subTab==="integracion"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3423:      <Card title="Flujo: Evento SIATA → Q(t) Calibrado" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3424:        <div style={{fontFamily:mono,fontSize:9,display:"flex",flexDirection:"column",gap:3}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3425:          {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3431:            ["6","Aplicar pérdidas SCS con CN corregido","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3432:            ["7","Convolución con HU (SCS/Clark/Snyder)","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3433:            ["8","Comparar Q(t) con nivel observado","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3434:            ["9","Calibrar Tc, CN, kR si hay datos de nivel","⚡"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3435:            ["10","Exportar parámetros calibrados a nueva IDF","⚡"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3436:          ].map(([n,txt,s])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3437:            <div key={n} style={{display:"flex",gap:9,padding:"4px 9px",borderRadius:5,background:s==="✓"?`${C.teal}08`:`${C.gold}06`,marginBottom:1}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3438:              <span style={{color:C.teal,fontWeight:800,minWidth:18}}>{n}.</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3439:              <span style={{flex:1,color:C.muted2}}>{txt}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3440:              <span style={{color:s==="✓"?C.accent2:C.gold}}>{s}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3441:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3442:          ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3443:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3444:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3445:      <Card title="CN dinámico por Humedad del Suelo SIATA" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3446:        <div style={{fontFamily:mono,fontSize:9,marginBottom:8,color:C.muted}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3447:          Dato SIATA → AMC → CN ajustado → Pe más realista
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3448:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3449:        {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3450:          {amc:"AMC I",hs:"HS &lt; 0.25",cn:"CNII → CNI",f:"23·CN/(10+0.13·CN)⁻¹",efecto:"↓ Escorrentía (suelo seco)",col:C.accent2},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3451:          {amc:"AMC II",hs:"0.25 ≤ HS ≤ 0.45",cn:"CN = CNII",f:"Sin corrección",efecto:"Condición base",col:C.gold},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3452:          {amc:"AMC III",hs:"HS &gt; 0.45",cn:"CNII → CNIII",f:"23·CNII/(10+0.13·CNII)",efecto:"↑ Escorrentía (saturado)",col:C.rose},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3453:        ].map(r=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3454:          <div key={r.amc} style={{padding:"7px 10px",borderRadius:7,background:`${r.col}08`,border:`1px solid ${r.col}20`,marginBottom:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3455:            <div style={{color:r.col,fontWeight:700,marginBottom:3}}>{r.amc} — {r.hs}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3456:            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,fontSize:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3457:              <span style={{color:C.muted}}>Ajuste: <span style={{color:C.text}}>{r.cn}</span></span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3458:              <span style={{color:C.muted}}>Efecto: <span style={{color:r.col}}>{r.efecto}</span></span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3459:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3460:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3461:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3462:        <div style={{marginTop:6,fontSize:8,color:C.muted,background:`${C.border}20`,borderRadius:5,padding:"5px 8px"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3463:          Hum.suelo actual: <span style={{color:C.gold,fontWeight:700}}>{serie?serie[Math.floor(serie.length/2)]?.humSuelo?.toFixed(3):0}</span> → AMC 
{serie&&serie[Math.floor(serie.length/2)]?.humSuelo>0.45?"III":serie[Math.floor(serie.length/2)]?.humSuelo>0.25?"II":"I"} para estación seleccionada
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3464:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3465:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3466:    </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3467:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3468:    {/* ── ARQUITECTURA ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3469:    {subTab==="arquitectura"&&<>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3470:      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3471:        {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3472:          {n:"Nivel 1 — Consumo Directo",col:C.accent,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3473:            desc:"Consulta directa API SIATA. Requiere proxy/CORS en producción.",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3474:            eps:["/estaciones/siata","/precipitacion?lat&lon&r","/soilmoisture/siata","/streamflow/siata"]},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3475:          {n:"Nivel 2 — ETL Automatizado",col:C.accent2,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3476:            desc:"Descarga periódica CSV/JSON. HidroFlow mantiene su propio histórico SIATA.",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3477:            eps:["Scheduler: cada 15min/1h","Almacenar series temporales","Base datos estaciones","Cache de eventos extremos"]},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3478:          {n:"Nivel 3 — Microservicio Hidrológico",col:C.teal,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3479:            desc:"Pipeline completo: SIATA → filtrado → homologación → parámetros HidroFlow.",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3480:            eps:["SIATA → Filtro → Homologa","→ CN dinámico (AMC)","→ Calibración Tc/kR","→ Tormenta híbrida real"]},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3481:        ].map(({n,col,desc,eps})=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3482:          <Card key={n} title={n} accent={col}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3483:            <div style={{fontFamily:mono,fontSize:8.5,color:C.muted,marginBottom:8,lineHeight:1.5}}>{desc}</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3484:            {eps.map((ep,i)=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3485:              <div key={i} style={{padding:"4px 9px",marginBottom:3,borderRadius:5,background:`${col}09`,border:`1px solid ${col}1E`,color:col,fontSize:8}}>{ep}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3486:            ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3487:          </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3488:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3489:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3490:      <Card title="Diagrama de Flujo — SIATA + HidroFlow v3.1" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3491:        <div style={{display:"flex",gap:6,alignItems:"stretch",flexWrap:"wrap",padding:"6px 0"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3492:          {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3493:            {box:"SIATA\nGeoportal\nAPI REST",col:C.accent3,sub:"repopruebas\n.siata.gov.co"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3494:            {arr:"→"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3495:            {box:"Proxy/Backend\nNode · FastAPI\nCache + Auth",col:C.accent4,sub:"Resuelve CORS\nAutenticación"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3496:            {arr:"→"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3497:            {box:"ETL Pipeline\nFiltrar · Validar\nHomologar unidades",col:C.teal,sub:"P→mm, T→°C\nDetecta outliers"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3498:            {arr:"→"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3499:            {box:"HidroFlow\nMotor IDF · SAR\nGT-AS-004",col:C.accent2,sub:"CN dinámico\nQ(t) calibrado"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3500:            {arr:"→"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3501:            {box:"Dashboard\nPDF · Excel\nAlertas",col:C.gold,sub:"Reportes\nGestión riesgo"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3502:          ].map((item,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3503:            if(item.arr) return(<div key={i} style={{fontSize:18,color:C.muted,alignSelf:"center",padding:"0 2px"}}>{item.arr}</div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3504:            return(<div key={i} style={{flex:1,minWidth:90,textAlign:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3505:              <div style={{background:`${item.col}0F`,border:`1px solid ${item.col}28`,borderRadius:8,padding:"9px 7px",marginBottom:5}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3506:                <div style={{color:item.col,fontWeight:700,whiteSpace:"pre",fontSize:9,lineHeight:1.5,fontFamily:mono}}>{item.box}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3507:              </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3508:              <div style={{color:C.muted,fontSize:7.5,whiteSpace:"pre",lineHeight:1.4,fontFamily:mono}}>{item.sub}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3509:            </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3510:          })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3511:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3512:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3513:    </>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3514:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3515:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3516:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3519:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3520:const TABS=[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3521:  {id:"params",     label:"Parámetros",   icon:"⬡", acc:C.accent,   desc:"Morfometría · Índices · 6 Métodos Tc"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3522:  {id:"idf",        label:"IDF",          icon:"⌁", acc:C.accent3,  desc:"20 Est. EPM 2025 · I=k/(c+d)ⁿ · PDF calibradas"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3523:  {id:"hiet",       label:"Hietogramas",  icon:"🌧", acc:C.accent,   desc:"GT-AS-004 §3.3 · Curvas Huff Q1-Q4 · 5 distribuciones"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3524:  {id:"hidro",      label:"Hidrogramas",  icon:"≋", acc:C.accent2,  desc:"SCS · SCS Mod. · Snyder · Williams&Hann · Clark IUH"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3525:  {id:"racional",   label:"Racional",     icon:"◈", acc:C.gold,     desc:"Q=C·I·A/3.6 · Abstracción SCS · Todos los Tr"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3526:  {id:"sar",        label:"SAR",          icon:"◫", acc:C.accent4,  desc:"GT-AS-004 §3 · Hietograma+Convolución+Vol. · PDF/Excel"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3527:  {id:"influencia", label:"Influencia",   icon:"⊕", acc:C.teal,     desc:"IDW · Thiessen · Altitudinal · Compuesto · Escenarios · Mapa AMVA"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3528:  {id:"siata",      label:"SIATA",        icon:"🛰", acc:C.accent3,  desc:"API repopruebas.siata.gov.co · Series · Validación IDF · Arquitectura"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3529:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3530:export default function HidroFlow({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3531:  tab: tabExterno,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3532:  setTab: setTabExterno,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3533:  onContextoComparador,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3534:}) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3535:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3536:// Manejo de tabs (modo controlado / no controlado)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3537:// ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3538:const [tabInterno, setTabInterno] = useState("params");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3539:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3540:// Si viene del layout, usar ese.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3541:// Si no, usar estado interno.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3542:const tab = tabExterno ?? tabInterno;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3543:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3544:// Setter unificado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3545:const setTab = setTabExterno ?? setTabInterno;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3546:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3547:  const [params, setParams] = useState(() => getCuencaById(CUENCA_DEFAULT_ID));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3548:  const [stn, setStn] = useState("SAN CRISTOBAL");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3549:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3550:  const [trStateGlobal, setTrStateGlobal] = useState(getTrState());
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3551:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3552:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    const cancelarSuscripcionTr = subscribeTr(setTrStateGlobal);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    return cancelarSuscripcionTr;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:  }, []);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:  const cnBase = Number.isFinite(params?.cnBase)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3561:    ? params.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3564:    : 75;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3565:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3566:  const metodosTcRacional = calcTc(params).filter((r) => Number.isFinite(r?.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3567:  const tcRacionalMin =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3568:    metodosTcRacional.length > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3569:      ? metodosTcRacional.reduce((suma, metodo) => suma + Number(metodo.min || 0), 0) /
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3570:        metodosTcRacional.length
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3571:      : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3572:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3573:  const estacionRacional = ESTACIONES_EPM[stn];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3574:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3575:  const resultadosRacionalExportable =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3576:    estacionRacional &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3577:    Number.isFinite(Number(params?.area)) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3578:    Number.isFinite(Number(params?.CN)) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3579:    Number.isFinite(Number(tcRacionalMin)) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3580:    Number(tcRacionalMin) > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3581:      ? calcRacional(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3582:          estacionRacional,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3583:          Number(params.area),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3594:    distribucionTemporal: "EPM Q1",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3595:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3596:    periodos_retorno: TR_LIST,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3597:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3598:      fuente: "calcRacional",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3599:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3600:      estado: "informativo_no_adoptivo",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3601:      tc_min: Number.isFinite(Number(tcRacionalMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3602:        ? Number(Number(tcRacionalMin).toFixed(2))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3603:        : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3604:      resultados: resultadosRacionalExportable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3605:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3606:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3607:    cuencaNombre:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3608:      params?.nombreCuenca ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3609:      params?.cuencaNombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3610:      params?.nombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3611:      "Quebrada La Iguaná - PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3612:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3613:    area_km2:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3663:      porcentaje_impermeable: Number.isFinite(Number(params?.porcentajeImpermeable)) ? Number(params.porcentajeImpermeable) : 60,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3664:      tc_min: getTcState()?.Tc_final ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3665:      lluvia_efectiva_total_mm: previo?.lluvia_efectiva_total_mm ?? null
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3666:    }),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3667:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3668:    hidrogramas: previo?.hidrogramas ?? {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3669:      fuente: "pendiente",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3670:      resultados: []
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3671:    },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3672:    hidrogramas_resumen: previo?.hidrogramas_resumen ?? null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3673:    hidrograma_principal: previo?.hidrograma_principal ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3674:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3675:}, [onContextoComparador, params, stn, trStateGlobal?.Tr_activo]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3676:// Publicación base Tc para despertar el Índice Hidrológico global.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3677:// No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3678:useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3679:  const estadoTcActual = getTcState();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3680:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3681:  const agenteTieneEstado =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3682:    estadoTcActual?.Tc_final !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3683:    estadoTcActual?.Tc_final !== undefined &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3684:    estadoTcActual?.metodosTc;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3685:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3686:  const agenteTieneEstadoEspecializado =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3687:    estadoTcActual?.rangoCompetenteTc ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3693:    (r) => Number.isFinite(r.h) && Number.isFinite(r.min) && r.h > 0 && r.min > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3694:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3695:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3696:  if (!tcArrayBase.length) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3697:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3698:  const metodosTcBase = mapTcResultados(tcArrayBase);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3699:  const valoresTcBase = Object.values(metodosTcBase).filter(Number.isFinite);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3700:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3701:  if (!valoresTcBase.length) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3702:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3703:  const valoresOrdenados = [...valoresTcBase].sort((a, b) => a - b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3704:  const mitad = Math.floor(valoresOrdenados.length / 2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3705:  const tcMedianaBase =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3706:    valoresOrdenados.length % 2
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3707:      ? valoresOrdenados[mitad]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3708:      : (valoresOrdenados[mitad - 1] + valoresOrdenados[mitad]) / 2;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3709:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3710:  const tcBase =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3711:    Number.isFinite(params?.tcMedMin) && params.tcMedMin > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3712:      ? params.tcMedMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3735:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3736:}, [params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3737:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3738:  // ────────────────── Defaults AMC / %imperv / CNbase (solo si faltan) ──────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3739:useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3740:  setParams(prev => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3741:    const amc  = prev?.amcActual ?? "II"; // I | II | III
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3742:    const pct  = Number.isFinite(prev?.porcentajeImpermeable) ? prev.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3743:    const base = Number.isFinite(prev?.cnBase) ? prev.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3744:              : (Number.isFinite(prev?.CN) ? prev.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3745:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3746:    // Evita re-render si nada cambia
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3747:    if (prev?.amcActual === amc &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3748:        prev?.porcentajeImpermeable === pct &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3749:        prev?.cnBase === base) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3750:      return prev;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3751:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3752:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3753:    return { ...prev, amcActual: amc, porcentajeImpermeable: pct, cnBase: base };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3754:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3758:  const aa=TABS.find(t=>t.id===tab)?.acc||C.accent;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3759:  const pdfN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="PDF").length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3760:  const refN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="REF").length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3761:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3762:  return(<div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:sans}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3763:    <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}input::-webkit-inner-spin-button,input::-webki
t-outer-spin-button{-webkit-appearance:none}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}button{font-family:inherit}`}</style>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3764:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3765:    {/* ── HEADER ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3766:    <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:"0 16px",display:"flex",alignItems:"center",gap:8,height:52,position:"sticky",top:0,zIndex:200}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3767:      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3768:        <div style={{width:28,height:28,borderRadius:7,background:`linear-gradient(135deg,${C.accent},${C.accent4})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.bg}}>H</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3769:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3770:          <div style={{fontSize:11,fontWeight:800,letterSpacing:"-0.03em",color:C.text}}>HidroFlow</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3771:          <div style={{fontSize:7.5,color:C.muted,fontFamily:mono}}>v3.1 · EPM 2025 · GT-AS-004 · SIATA · {pdfN}+{refN} est.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3772:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3773:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3774:      <div style={{width:1,height:20,background:C.border}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3775:      <StationSel sel={stn} onSel={setStn}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3776:      <div style={{width:1,height:20,background:C.border}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3777:      <div style={{fontSize:9.5,color:C.muted,display:"flex",gap:9,fontFamily:mono}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3779:        <span>A={params.area}km²</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3780:        <span>CN={params.CN}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3781:        <span>Δt={params.dt}min</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3782:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3783:      <nav style={{display:"flex",gap:1,marginLeft:"auto",flexWrap:"wrap"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3784:        {TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3785:          style={{padding:"4px 9px",borderRadius:6,border:"none",cursor:"pointer",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3786:            background:tab===t.id?`${t.acc}15`:"transparent",color:tab===t.id?t.acc:C.muted,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3787:            fontSize:9.5,fontWeight:tab===t.id?700:500,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3788:            borderBottom:tab===t.id?`2px solid ${t.acc}`:"2px solid transparent",transition:"all .12s"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3789:          {t.icon} {t.label}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3790:        </button>))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3791:      
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3792:      <button data-id="blind-hidro" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); setTab("hidro");}}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3793:        style={{padding:"4px 9px",borderRadius:6,border:"none",cursor:"pointer",background:"transparent",color:C.muted, fontSize:9.5,fontWeight:500}}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3794:        title="Ir a Hidrogramas (SPA)">≋</button></nav>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3795:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3796:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3797:    {/* Accent bar */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3798:    <div style={{height:1.5,background:`linear-gradient(90deg,${aa}AA,${aa}22,transparent)`}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3799:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3800:    {/* ── CONTENT ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3801:    <div style={{padding:"14px 18px",maxWidth:1640,margin:"0 auto"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3802:      <div style={{marginBottom:12,display:"flex",alignItems:"center",gap:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3803:        <span style={{fontSize:18,color:aa}}>{TABS.find(t=>t.id===tab)?.icon}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3804:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3805:          <h2 style={{fontSize:14,fontWeight:800,letterSpacing:"-0.02em"}}>{TABS.find(t=>t.id===tab)?.label}</h2>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3806:          <p style={{fontSize:8.5,color:C.muted,marginTop:1,fontFamily:mono}}>{TABS.find(t=>t.id===tab)?.desc}</p>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3807:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3808:      </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3809:      {tab==="params"     &&<ModParams     params={params} setParams={setParams}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3810:      {tab==="idf"        &&<ModIDF        est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3811:      {tab === "hiet" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3812:        <ModHietogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3813:          est={est}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3814:          name={stn}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3815:          params={params}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3816:          setParams={setParams}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3817:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3818:      )}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3819:      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={stn} onContextoComparador={onContextoComparador} />}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3820:      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn} onContextoComparador={onContextoComparador}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3821:      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3822:      {tab === "Influencia" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3823:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3824:           padding: 20,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3825:           color: "#9fffe8",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3826:           fontFamily: "monospace"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3827:        }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3828:           Módulo de influencia IDF en desarrollo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3829:           <br />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3830:           Próximamente: ponderación espacial (IDW / Thiessen / altitud).
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3831:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3832:      )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3833:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3838:    <div style={{borderTop:`1px solid ${C.border}`,padding:"7px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3839:      <span style={{fontSize:8,color:C.muted,fontFamily:mono}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3840:        HidroFlow v3.1 · GT-AS-004 Rev.0 2026-01-07 · SIATA AMVA · {pdfN} est. PDF + {refN} ref. · 5 HU · IDW/Thiessen/Altitudinal/Compuesto · Huff Q1-Q4 · Clark IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3841:      </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3842:      <div style={{display:"flex",gap:10,fontFamily:mono,fontSize:8}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3843:        {[{l:stn,a:C.accent3},{l:`A=${params.area}km²`,a:C.accent},{l:`CN=${params.CN}`,a:C.accent2},{l:`Δt=${params.dt}min`,a:C.gold},{l:`17 est. SIATA`,a:C.teal}].map(({l,a})=><span key={l} style={{color:a}}>{l}</span>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3844:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3845:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3846:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3847:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3848:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3849:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3850:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3851:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3852:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3853:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3854:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3855:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3856:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3857:



## Evidencia focal en hidroEngine.js


  01_APP\HIDROFLOW\src\services\hidroEngine.js:1:/**
  01_APP\HIDROFLOW\src\services\hidroEngine.js:2: * hidroEngine.js
  01_APP\HIDROFLOW\src\services\hidroEngine.js:3: * Motor hidrológico base de HidroFlow
  01_APP\HIDROFLOW\src\services\hidroEngine.js:4: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:5: * Fase 1 de modularización:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:6: * - Extrae funciones puras CN / AMC / SCS-CN / Tc desde HidroFlow.jsx.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:7: * - No contiene componentes React.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:8: * - No renderiza interfaz.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:9: * - No depende de estilos ni de Recharts.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:10: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:11: * Regla Senior:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:12: * HidroFlow.jsx debe visualizar y orquestar.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:13: * hidroEngine.js debe calcular.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:14: */
  01_APP\HIDROFLOW\src\services\hidroEngine.js:15:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:16:// ─────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:17:// Constantes SCS-CN
  01_APP\HIDROFLOW\src\services\hidroEngine.js:18:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:19:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:20:export const SCS_RETENCION_MM = 25400;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:21:export const SCS_ABSTRACCION_LAMBDA = 0.2;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:22:export const CN_MIN = 30;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:23:export const CN_MAX = 98;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:24:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:25:export function limitarNumero(valor, min, max) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:26:  const n = Number(valor);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:27:  if (!Number.isFinite(n)) return min;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:28:  return Math.max(min, Math.min(max, n));
  01_APP\HIDROFLOW\src\services\hidroEngine.js:29:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:30:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:31:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:32:// CN dinámico / AMC / impermeabilidad
  01_APP\HIDROFLOW\src\services\hidroEngine.js:33:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:34:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:35:/**
  01_APP\HIDROFLOW\src\services\hidroEngine.js:36: * Conversión CNII → CNI.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:37: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:38: * Nota:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:39: * Esta es la fórmula actualmente implementada en HidroFlowV5.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:40: * Se conserva para no cambiar resultados hidrológicos durante la modularización.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:41: */
  01_APP\HIDROFLOW\src\services\hidroEngine.js:42:export function cnIIaCNI(cnII) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:128:    amcInforme: `${contexto}. ${informe}`
  01_APP\HIDROFLOW\src\services\hidroEngine.js:129:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:130:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:131:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:132:// ─────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:133:// Retención, abstracción y precipitación efectiva SCS-CN
  01_APP\HIDROFLOW\src\services\hidroEngine.js:134:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:135:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:136:export function calcRetencionSCS(CN) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:137:  const cn = limitarNumero(CN, CN_MIN, CN_MAX);
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:138:  const S = SCS_RETENCION_MM / cn - 254;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:139:  const Ia = SCS_ABSTRACCION_LAMBDA * S;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:140:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:141:  return {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:142:    CN: +cn.toFixed(3),
  01_APP\HIDROFLOW\src\services\hidroEngine.js:143:    S: +S.toFixed(6),
  01_APP\HIDROFLOW\src\services\hidroEngine.js:144:    Ia: +Ia.toFixed(6),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:145:    lambda: SCS_ABSTRACCION_LAMBDA
  01_APP\HIDROFLOW\src\services\hidroEngine.js:146:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:147:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:148:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:149:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:150: * Lluvia efectiva acumulada Pe(t) mediante método SCS-CN.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:151: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:152: * Entrada:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:153: * - hiet.data con pAcum
  01_APP\HIDROFLOW\src\services\hidroEngine.js:154: * - CN efectivo
  01_APP\HIDROFLOW\src\services\hidroEngine.js:155: */
  01_APP\HIDROFLOW\src\services\hidroEngine.js:156:export function calcLluviaEfectiva(hiet, CN) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:157:  const { S, Ia } = calcRetencionSCS(CN);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:158:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:159:  const rows = hiet.data.map((r) => {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:160:    const P = r.pAcum;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:161:    const Pe = P > Ia ? Math.pow(P - Ia, 2) / (P - Ia + S) : 0;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:162:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:163:    return {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:164:      ...r,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:165:      Pe: +Pe.toFixed(4),
  01_APP\HIDROFLOW\src\services\hidroEngine.js:166:      PeIncrem: 0,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:167:      S,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:168:      Ia
  01_APP\HIDROFLOW\src\services\hidroEngine.js:169:    };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:170:  });
  01_APP\HIDROFLOW\src\services\hidroEngine.js:171:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:172:  for (let i = 1; i < rows.length; i++) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:173:    rows[i].PeIncrem = +(rows[i].Pe - rows[i - 1].Pe).toFixed(5);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:177:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:178:  return rows;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:179:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:180:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:181:// ─────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:182:// Tiempo de concentración Tc
  01_APP\HIDROFLOW\src\services\hidroEngine.js:183:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:184:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:185:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:186: * Calcula los seis métodos empíricos de Tiempo de Concentración.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:187: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:188: * Retorna:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:189: * [
  01_APP\HIDROFLOW\src\services\hidroEngine.js:190: *   { m: "Témez (1978)", h: ..., min: ... },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:191: *   ...
  01_APP\HIDROFLOW\src\services\hidroEngine.js:192: * ]
  01_APP\HIDROFLOW\src\services\hidroEngine.js:193: */
  01_APP\HIDROFLOW\src\services\hidroEngine.js:194:export function calcTc(p) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:195:  const L = p.longitud_cauce;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:196:  const A = p.area;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:197:  const Sp = p.pendiente_cuenca;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:198:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:199:  const So =
  01_APP\HIDROFLOW\src\services\hidroEngine.js:200:    ((p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 1000)) * 1000;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:201:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:202:  const Lft = L * 3280.84;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:203:  const Sf =
  01_APP\HIDROFLOW\src\services\hidroEngine.js:204:    (p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 3280.84);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:205:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:206:  const Ss = SCS_RETENCION_MM / p.CN - 254;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:207:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:208:  return [
  01_APP\HIDROFLOW\src\services\hidroEngine.js:209:    {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:210:      m: "Témez (1978)",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:211:      h: 0.3 * Math.pow(L / Math.pow(So / 1000, 0.25), 0.76)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:212:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:213:    {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:214:      m: "Kirpich (1940)",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:215:      h: (0.0078 * Math.pow(Lft, 0.77) * Math.pow(Sf, -0.385)) / 60
  01_APP\HIDROFLOW\src\services\hidroEngine.js:216:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:217:    {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:218:      m: "California (1942)",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:219:      h:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:220:        (0.0195 *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:226:      h:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:227:        (4 * Math.sqrt(A) + 1.5 * L) /
  01_APP\HIDROFLOW\src\services\hidroEngine.js:228:        (0.8 * Math.sqrt(p.cota_max - p.cota_min))
  01_APP\HIDROFLOW\src\services\hidroEngine.js:229:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:230:    {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:231:      m: "SCS-Ranser (1958)",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:232:      h:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:233:        (Math.pow(L * 1000, 0.8) * Math.pow(Ss + 1, 0.7)) /
  01_APP\HIDROFLOW\src\services\hidroEngine.js:234:        (4655 * Math.pow(Sp, 0.5))
  01_APP\HIDROFLOW\src\services\hidroEngine.js:235:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:236:    {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:237:      m: "Pérez-Montg. (1985)",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:238:      h: 0.1039 * Math.pow(L, 0.7) * Math.pow(So, -0.3)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:239:    }
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:240:  ].map((r) => ({
  01_APP\HIDROFLOW\src\services\hidroEngine.js:241:    ...r,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:242:    min: +(r.h * 60).toFixed(3)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:243:  }));
  01_APP\HIDROFLOW\src\services\hidroEngine.js:244:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:245:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:246:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:247:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:248:/**
  01_APP\HIDROFLOW\src\services\hidroEngine.js:249: * Estadística básica de Tc.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:250: * Esta función no decide el Tc adoptado; solo resume.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:251: */
  01_APP\HIDROFLOW\src\services\hidroEngine.js:252:export function resumirTc(tcList) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:253:  const validos = (tcList || []).filter((r) => Number.isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:254:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:261:      min_min: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:262:      max_min: null
  01_APP\HIDROFLOW\src\services\hidroEngine.js:263:    };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:264:  }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:265:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:266:  const minutos = validos.map((r) => r.min).sort((a, b) => a - b);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:267:  const promedioMin =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:268:    minutos.reduce((s, v) => s + v, 0) / minutos.length;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:269:  const mid = Math.floor(minutos.length / 2);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:270:  const medianaMin =
  01_APP\HIDROFLOW\src\services\hidroEngine.js:271:    minutos.length % 2
  01_APP\HIDROFLOW\src\services\hidroEngine.js:272:      ? minutos[mid]
  01_APP\HIDROFLOW\src\services\hidroEngine.js:273:      : (minutos[mid - 1] + minutos[mid]) / 2;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:274:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:275:  return {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:276:    n: validos.length,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:277:    promedio_h: +(promedioMin / 60).toFixed(6),
  01_APP\HIDROFLOW\src\services\hidroEngine.js:278:    promedio_min: +promedioMin.toFixed(3),
  01_APP\HIDROFLOW\src\services\hidroEngine.js:279:    mediana_min: +medianaMin.toFixed(3),
  01_APP\HIDROFLOW\src\services\hidroEngine.js:280:    min_min: +Math.min(...minutos).toFixed(3),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:281:    max_min: +Math.max(...minutos).toFixed(3)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:282:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:283:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:284:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:285:export function mapTcResultados(tcArray) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:286:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:287:  const mapa = {};
  01_APP\HIDROFLOW\src\services\hidroEngine.js:288:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:289:  tcArray.forEach(item => {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:290:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:291:    if (item.m.includes('Kirpich')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:292:      mapa.Kirpich = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:293:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:294:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:295:    if (item.m.includes('Témez')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:296:      mapa.Temez = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:297:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:298:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:299:    if (item.m.includes('California')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:300:      mapa.California = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:301:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:302:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:303:    if (item.m.includes('Giandotti')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:304:      mapa.Giandotti = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:305:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:306:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:307:    if (item.m.includes('Pérez')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:308:      mapa.Perez = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:309:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:310:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:311:    if (item.m.includes('SCS')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:312:      mapa.SCS = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:313:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:314:  });
  01_APP\HIDROFLOW\src\services\hidroEngine.js:315:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:316:  return mapa;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:317:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:318:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:319:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:320:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:321:// Resumen técnico consolidado del motor hidrológico
  01_APP\HIDROFLOW\src\services\hidroEngine.js:322:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:323:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:324:/**
  01_APP\HIDROFLOW\src\services\hidroEngine.js:325: * resumenMotorHidrologico(params)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:326: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:327: * Consolida en un solo objeto los principales indicadores que debe leer
  01_APP\HIDROFLOW\src\services\hidroEngine.js:328: * la interfaz técnica de HidroFlow:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:329: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:330: * - Cuenca activa
  01_APP\HIDROFLOW\src\services\hidroEngine.js:331: * - IDF adoptada
  01_APP\HIDROFLOW\src\services\hidroEngine.js:332: * - CN base / CN efectivo
  01_APP\HIDROFLOW\src\services\hidroEngine.js:333: * - AMC
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:334: * - S e Ia del método SCS-CN
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:335: * - Tiempo de concentración por métodos
  01_APP\HIDROFLOW\src\services\hidroEngine.js:336: * - Resumen estadístico de Tc
  01_APP\HIDROFLOW\src\services\hidroEngine.js:337: * - Periodos de retorno activos
  01_APP\HIDROFLOW\src\services\hidroEngine.js:338: * - Criterio de competencia del Método Racional
  01_APP\HIDROFLOW\src\services\hidroEngine.js:339: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:340: * Regla Senior:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:341: * Esta función NO renderiza interfaz.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:342: * Esta función NO modifica params.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:343: * Esta función NO reemplaza los módulos existentes.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:344: * Esta función consolida resultados para lectura técnica.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:345: */
  01_APP\HIDROFLOW\src\services\hidroEngine.js:346:export function resumenMotorHidrologico(params = {}) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:347:  const geometria = params.geometria || {};
  01_APP\HIDROFLOW\src\services\hidroEngine.js:348:  const relieve = params.relieve || {};
  01_APP\HIDROFLOW\src\services\hidroEngine.js:349:  const hidrologia = params.hidrologia || {};
  01_APP\HIDROFLOW\src\services\hidroEngine.js:378:  // 2. IDF adoptada
  01_APP\HIDROFLOW\src\services\hidroEngine.js:379:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\services\hidroEngine.js:380:  const estacionesIDF =
  01_APP\HIDROFLOW\src\services\hidroEngine.js:381:    Array.isArray(idf.estaciones_influencia) &&
  01_APP\HIDROFLOW\src\services\hidroEngine.js:382:    idf.estaciones_influencia.length > 0
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:383:      ? idf.estaciones_influencia.map((e) => ({
  01_APP\HIDROFLOW\src\services\hidroEngine.js:384:          nombre: e.etiqueta || e.nombre || e.id || "Estación IDF",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:385:          peso: Number.isFinite(e.peso_pct)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:386:            ? e.peso_pct / 100
  01_APP\HIDROFLOW\src\services\hidroEngine.js:387:            : Number.isFinite(e.peso)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:388:            ? e.peso
  01_APP\HIDROFLOW\src\services\hidroEngine.js:389:            : 1,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:390:          peso_pct: Number.isFinite(e.peso_pct)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:391:            ? e.peso_pct
  01_APP\HIDROFLOW\src\services\hidroEngine.js:392:            : Number.isFinite(e.peso)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:393:            ? e.peso <= 1
  01_APP\HIDROFLOW\src\services\hidroEngine.js:394:              ? e.peso * 100
  01_APP\HIDROFLOW\src\services\hidroEngine.js:395:              : e.peso
  01_APP\HIDROFLOW\src\services\hidroEngine.js:396:            : 100,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:397:          rol: e.rol || "estacion_idf_adoptada",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:453:    amcActual,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:454:    porcentajeImpermeable,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:455:    cnBase: CNbase
  01_APP\HIDROFLOW\src\services\hidroEngine.js:456:  });
  01_APP\HIDROFLOW\src\services\hidroEngine.js:457:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:458:  const retencion = calcRetencionSCS(CNefectivo);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:459:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:460:  const resumenCN = {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:461:    CN_base: CNbase,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:462:    CN_condicion_base:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:463:      hidrologia.CN_condicion_base ||
  01_APP\HIDROFLOW\src\services\hidroEngine.js:464:      "CNII",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:465:    CN_efectivo: CNefectivo,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:466:    amc: amcActual,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:467:    porcentaje_impermeable: porcentajeImpermeable,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:468:    S_mm: retencion.S,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:469:    Ia_mm: retencion.Ia,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:470:    lambda: retencion.lambda,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:471:    metodo: "SCS-CN",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:472:    observacion:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:473:      "CN efectivo calculado con ajuste AMC e impermeabilidad cuando existan insumos dinámicos."
  01_APP\HIDROFLOW\src\services\hidroEngine.js:474:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:475:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:476:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:477:  // 4. Tiempo de concentración Tc
  01_APP\HIDROFLOW\src\services\hidroEngine.js:478:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\services\hidroEngine.js:479:  const paramsTc = {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:480:    area: areaKm2,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:481:    longitud_cauce:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:482:      geometria.longitud_cauce_km ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:483:      params.longitud_cauce,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:484:    pendiente_cuenca:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:485:      params.pendiente_cuenca ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:486:      pendienteMediaPct,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:487:    cota_mayor_cauce:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:488:      relieve.cota_mayor_cauce_msnm ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:489:      relieve.cota_max_msnm ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:490:      params.cota_mayor_cauce ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:491:      params.cota_max,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:555:  const periodosRetorno =
  01_APP\HIDROFLOW\src\services\hidroEngine.js:556:    Array.isArray(hidrologia.periodos_retorno) &&
  01_APP\HIDROFLOW\src\services\hidroEngine.js:557:    hidrologia.periodos_retorno.length > 0
  01_APP\HIDROFLOW\src\services\hidroEngine.js:558:      ? hidrologia.periodos_retorno
  01_APP\HIDROFLOW\src\services\hidroEngine.js:559:      : Array.isArray(hidrologia.periodos_retorno_anios)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:560:      ? hidrologia.periodos_retorno_anios.map((tr) => ({
  01_APP\HIDROFLOW\src\services\hidroEngine.js:561:          tr,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:562:          etiqueta: `Tr ${tr} años`,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:563:          tipo: tr === 2.33 ? "evento_medio_anual" : "diseno",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:564:          activo: true
  01_APP\HIDROFLOW\src\services\hidroEngine.js:565:        }))
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:566:      : [2.33, 5, 10, 25, 50, 100].map((tr) => ({
  01_APP\HIDROFLOW\src\services\hidroEngine.js:567:          tr,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:568:          etiqueta: `Tr ${tr} años`,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:569:          tipo: tr === 2.33 ? "evento_medio_anual" : "diseno",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:570:          activo: true
  01_APP\HIDROFLOW\src\services\hidroEngine.js:571:        }));
  01_APP\HIDROFLOW\src\services\hidroEngine.js:572:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:573:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\services\hidroEngine.js:574:  // 6. Método Racional
  01_APP\HIDROFLOW\src\services\hidroEngine.js:575:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\services\hidroEngine.js:576:  const umbralRacionalKm2 = 5;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:577:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:578:  const racionalCompetente =
  01_APP\HIDROFLOW\src\services\hidroEngine.js:579:    Number.isFinite(areaKm2) &&
  01_APP\HIDROFLOW\src\services\hidroEngine.js:580:    areaKm2 <= umbralRacionalKm2;



## Verificación en ComparadorMultiMetodo.jsx


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:142:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:143:// OT-0070D — Diagnóstico qSeries interno y silencioso
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:144:const diagnosticoQSeries = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:145:  try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:146:    return adaptarQSeriesHidrogramas(contextoBase?.hidrogramas, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:147:      fuente: "ComparadorMultiMetodo.contextoBase.hidrogramas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:148:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:149:  } catch (errorQSeries) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:150:    console.warn("Diagnóstico qSeries no invasivo no ejecutado:", errorQSeries);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:151:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:152:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:153:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:154:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:155:        total: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:156:        publicados: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:161:      metodos: [],
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:162:      error: String(errorQSeries?.message ?? errorQSeries)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:163:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:164:  }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:165:}, [contextoBase?.hidrogramas]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:166:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:167:// OT-0074F — Resumen estructural interno y silencioso de hidrogramas
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:168:const resumenEstructuraHidrogramas = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:169:  try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:170:    return resumirEstructuraHidrogramas(contextoBase?.hidrogramas);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:171:  } catch (errorResumenHidrogramas) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:172:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:173:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:174:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:175:        tipoEntrada: "error",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:176:        contenedor: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:177:        totalCandidatos: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:178:        conSerieTemporal: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:179:        sinSerieTemporal: 0,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:180:        conQpico: 0,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:181:        conTPico: 0,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:182:        conVolTotal: 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:183:      },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:184:      candidatos: [],
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:185:      error: String(errorResumenHidrogramas?.message ?? errorResumenHidrogramas)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:186:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:187:  }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:188:}, [contextoBase?.hidrogramas]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:189:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:190:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:191:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:192:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:193:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:194:  const estilos = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:195:    pagina: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:196:      minHeight: "100vh",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:197:      padding: "22px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:198:      background:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:600:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:601:  return extraerNumero(match);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:602:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:603:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:604:const obtenerResultadoQMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:605:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:606:    String(valor ?? "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:607:      .toLowerCase()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:608:      .normalize("NFD")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:609:      .replace(/[\u0300-\u036f]/g, "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:610:      .replace(/[^a-z0-9]/g, "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:611:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:612:  const extraerNumero = (objeto, claves = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:613:    for (const clave of claves) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:614:      const valor = objeto?.[clave];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:620:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:621:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:622:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:623:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:624:  const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:625:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:626:  if (!bruto) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:627:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:628:      Qp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:629:      Tp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:630:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:631:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:632:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:633:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:634:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:666:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:667:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:668:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:669:  return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:670:    Qp: extraerNumero(match, ["Qp", "qp", "Qpico", "qPico", "q_pico", "caudalPico", "caudal_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:671:    Tp: extraerNumero(match, ["Tp", "tp", "tPico", "TPico", "t_pico", "tiempoPico", "tiempo_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:672:    volumen: extraerNumero(match, ["volumen", "V", "vol", "volume", "volTotal", "vol_total", "volumenTotal"]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:673:    disponible: true,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:674:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:675:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:676:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:677:  const obtenerAuditoriaPendienteMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:678:    if (metodo.tipo !== "tc") return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:679:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:680:    return obtenerAuditoriaPendienteTc(metodo.id);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:681:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:682:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:697:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:698:  // OT-0067 — Adaptador de coherencia hidrológica (encapsulado)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:699:const clasificarCoherencia = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:700:  // OT-0067 — Adaptador de coherencia hidrológica
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:701:  const tpRaw = metodo?.tPico ?? metodo?.tp ?? metodo?.Tp;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:702:  const tp = Number(String(tpRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:703:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:704:  const tcRaw = contextoBase?.tc_global ?? contextoBase?.tc ?? contextoBase?.tcMin ?? 0;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:705:  const tc = Number(String(tcRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:706:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:707:  const nombre = String(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:708:    metodo?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:709:    metodo?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:710:    metodo?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:711:    ""
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:922:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:923:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:924:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:925:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:926:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:927:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:928:    if (!Number.isFinite(resultadoQ.Qp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:929:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:930:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:931:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:932:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:933:      <span style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:934:        {resultadoQ.Qp.toFixed(2)} m³/s
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:935:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:936:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:942:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:943:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:944:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:945:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:946:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:947:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:948:    if (!Number.isFinite(resultadoQ.Tp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:949:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:950:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:951:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:952:    const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:953:    const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:954:      Number.isFinite(tcReferencia) && tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:955:        ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:956:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1006:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1007:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1008:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1009:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1010:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1011:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1012:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1013:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1014:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1015:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1016:    const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1017:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1018:    const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1019:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1020:        ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1485:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1486:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1487:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1488:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1489:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1490:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1491:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1492:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1493:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1494:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1495:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. 
La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1496:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1497:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:          const obtenerCandidatosQ5Contexto = () => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:              ? bruto
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:              : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:              ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:              : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:              ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1634:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1635:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1643:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1644:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1645:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1646:            .map((metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1647:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1648:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1649:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1650:              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1651:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1652:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1653:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1654:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1655:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1656:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1657:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:              const resultadoQ = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:                Qp:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:                  h?.Qp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:                  h?.qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:                  h?.Qpico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:                  h?.qPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:                  h?.q_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:                  h?.caudalPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:                  h?.caudal_pico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:                Tp:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:                  h?.Tp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:                  h?.tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:                  h?.tPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:                  h?.TPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:                  h?.t_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1682:                  h?.tiempoPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1683:                  h?.tiempo_pico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1684:                volumen:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1685:                  h?.volumen ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1686:                  h?.V ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1687:                  h?.vol ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1688:                  h?.volume ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1689:                  h?.volTotal ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1690:                  h?.vol_total ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1691:                  h?.volumenTotal
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1693:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1694:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1695:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1696:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1697:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1698:          const filasQ5Markdown =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1699:            filasQ5DesdeCatalogo.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1780:                ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1781:                metodosQ5Expediente[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1782:                null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1783:              const resultadoQ5PrincipalConsistencia = metodoQ5PrincipalConsistencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784:                ? obtenerResultadoQMetodo(metodoQ5PrincipalConsistencia)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1785:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1786:              const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalConsistencia?.volumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1787:              const relacionVolumenQ5Esperado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1788:                Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1789:                Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1790:                volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1791:                  ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1792:                  : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1793:              const estadoConsistenciaVolumen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1794:                relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2105:              metodosQ5Panel[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2106:              null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2107:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2108:            const resultadoQ5PrincipalPanel = metodoQ5PrincipalPanel
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2109:              ? obtenerResultadoQMetodo(metodoQ5PrincipalPanel)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2110:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2111:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2112:            const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalPanel?.volumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2113:            const relacionVolumenQ5Esperado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2114:              Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2115:              Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2116:              volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2117:                ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2118:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2119:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2328:            >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2329:              <strong>Dictamen operativo:</strong> las series Q(t) no están publicadas para los métodos evaluados. No procede calcular métricas morfológicas de forma hasta publicar qSeries reales o normalizadas por 
método.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2330:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2331:            {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2332:              const resumenEstructural = resumenEstructuraHidrogramas?.resumen ?? {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2333:                tipoEntrada: "no_disponible",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2334:                contenedor: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2335:                totalCandidatos: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2336:                conSerieTemporal: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2337:                sinSerieTemporal: 0,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2338:                conQpico: 0,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2339:                conTPico: 0,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2340:                conVolTotal: 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2341:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2342:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2343:              return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2344:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2345:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2346:                    marginTop: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2347:                    padding: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2348:                    borderRadius: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2349:                    border: "1px solid rgba(148, 163, 184, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2350:                    background: "rgba(15, 23, 42, 0.35)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2365:                    <div><strong>Contenedor:</strong> {String(resumenEstructural.contenedor ?? "—")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2366:                    <div><strong>Candidatos:</strong> {resumenEstructural.totalCandidatos ?? 0}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2367:                    <div><strong>Con serie:</strong> {resumenEstructural.conSerieTemporal ?? 0}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2368:                    <div><strong>Sin serie:</strong> {resumenEstructural.sinSerieTemporal ?? 0}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2369:                    <div><strong>Con Qpico:</strong> {resumenEstructural.conQpico ?? 0}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2370:                    <div><strong>Con tPico:</strong> {resumenEstructural.conTPico ?? 0}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2371:                    <div><strong>Con volTotal:</strong> {resumenEstructural.conVolTotal ?? 0}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2372:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2373:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2374:                  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2375:                    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2376:                      marginTop: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2377:                      padding: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2378:                      borderRadius: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2379:                      border: "1px solid rgba(148, 163, 184, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2380:                      background: "rgba(15, 23, 42, 0.35)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2381:                    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2382:                  >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2383:                    <strong>Dictamen de serie temporal:</strong> el objeto hidrogramas contiene resultados resumen para los 5 métodos evaluados, incluyendo Qpico, tPico y volTotal, pero no publica una serie 
temporal Q(t) reconocible. No procede calcular métricas morfológicas de forma hasta disponer de qSeries reales o normalizadas por método.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2384:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2385:                  <div style={{ ...estilos.muted, marginTop: 8 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2386:                    Este bloque no muestra series crudas, no lista arrays completos y no calcula métricas morfológicas.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2387:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2388:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2389:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2390:            })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2391:            <div style={{ ...estilos.muted, marginTop: 10 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2392:              Este panel no muestra qSeries cruda y no modifica Qp, Tp, Volumen ni Q(t).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2393:            </div>



## Lectura preliminar

Esta auditoría busca establecer si Qpico, tPico y volTotal se calculan desde una serie Q(t) disponible antes del resumen, o si el flujo actual solo conserva valores resumen sin serie persistente.

## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No modificar ComparadorMultiMetodo.jsx.
- No recalcular hidrogramas.
- No reconstruir Q(t) desde Qpico y tPico.
- No inventar puntos tiempo-caudal.
- No calcular métricas morfológicas.

## Criterio de salida

OT-0078J queda completa cuando exista auditoría focal versionada del cálculo de Qpico, tPico y volTotal, sin cambios funcionales sobre la aplicación.
