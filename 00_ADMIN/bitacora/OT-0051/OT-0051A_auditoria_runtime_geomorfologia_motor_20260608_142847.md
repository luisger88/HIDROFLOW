# OT-0051A — Auditoría runtime geomorfología hacia motor HidroFlow

Fecha: 06/08/2026 14:28:47
Rama: ot-0051-alineacion-runtime-verdad-geomorfologica-motor

## 1. Propósito

Auditar cómo la verdad geomorfológica real y mapeada llega actualmente al runtime de HidroFlow: cuenca activa, motor, Tc, Tr, Qp, Tp, estaciones, Índice, Comparador y Expediente.

## 2. Estado Git inicial

?? 00_ADMIN/bitacora/OT-0051/

## 3. Archivos runtime candidatos


00_ADMIN/bitacora/OT-0014/OT-0014B_auditoria_Tc_hidrogramas_vs_tcAgent.md
00_ADMIN/bitacora/OT-0014/OT-0014D_auditoria_tcAgent_estado_global_Tc.md
00_ADMIN/bitacora/OT-0039/OT-0039A_apertura_metodo_racional_en_expediente.md
00_ADMIN/bitacora/OT-0039/OT-0039C_cierre_metodo_racional_en_expediente.md
00_ADMIN/bitacora/OT-0040/OT-0040A_apertura_racional_contexto_exportable.md
00_ADMIN/bitacora/OT-0040/OT-0040C_cierre_racional_contexto_exportable.md
00_ADMIN/bitacora/OT-0041/OT-0041A_apertura_contraste_Q5_Racional_expediente.md
00_ADMIN/bitacora/OT-0041/OT-0041C_cierre_contraste_Q5_Racional_expediente.md
00_ADMIN/manuales/Checklist_Operacional_HidroFlow_v1_20260608_100435.md
00_ADMIN/manuales/Checklist_Operacional_HidroFlow_v1_20260608_102303.md
01_APP/HIDROFLOW/src/HidroFlow.jsx
01_APP/HIDROFLOW/src/agents/evidencias/HF_MISION_0001/OT_0001_AuditorTc/evidencia_fuente_operativa_calcTc_hidroEngine.txt
01_APP/HIDROFLOW/src/agents/evidencias/HF_MISION_0001/OT_0003A_MatrizMetodoCampoTc/evidencia_bloque_calcTc_hidroEngine.txt
01_APP/HIDROFLOW/src/agents/evidencias/HF_MISION_0001/evidencia_estructura_ComparadorMultiMetodo.txt
01_APP/HIDROFLOW/src/agents/tcAgent.js
01_APP/HIDROFLOW/src/agents/trAgent.js
01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx
01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
01_APP/HIDROFLOW/src/data/cuencasCatalogo.js
01_APP/HIDROFLOW/src/services/hidroEngine.js
01_APP/HIDROFLOW/src/services/tcSelector.js


## 4. Búsqueda acotada en src sobre parámetros geomorfológicos


  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:3:// HIDROFLOW v3.1 — Arquitectura Senior · GT-AS-004 · EPM 2025 · SIATA
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:4:// Motor: Clark IUH · W&H · Snyder · SCS Mod. · Huff · Convolución completa
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:5:// Módulos: Ponderación estaciones (IDW/Thiessen/Altitudinal/Compuesto) + SIATA
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:6:// Exportación: PDF (html2canvas+jsPDF) · Excel (SheetJS)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:7:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:8:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:9:import { useState, useMemo, useCallback, useRef, useEffect } from "react";
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:10:import {
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:11:  LineChart, Line, AreaChart, Area, BarChart, Bar,
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:12:  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:13:  ResponsiveContainer, ReferenceLine, ComposedChart, ScatterChart, Scatter, Cell,
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:14:} from "recharts";
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:15:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:30:const TT={background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:11,fontFamily:mono};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:31:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:32:// ─── ESTACIONES EPM 2025 ──────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:33:const ESTACIONES_EPM = {
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:34:  "AYURA":              {codigo:"2701093",lat:6.16569444,lon:-75.56591667,alt:1750,fuente:"PDF",params:{"2.33":{k:45.2947,n:0.9370,c:0.4},"5":{k:54.8433,n:0.9612,c:0.4},"10":{k:62.6277,n:0.9763,c:0.4},"25":{k:72.4701,n:0.9914,c:0.4},"50":{k:79.7758,n:1.0005,c:0.4},"100":{k:87.0304,n:1.0082,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:35:  "CALDAS":             {codigo:"2701036",lat:6.05300000,lon:-75.62775000,alt:1930,fuente:"PDF",params:{"2.33":{k:55.1908,n:0.9454,c:0.4},"5":{k:63.5724,n:0.9302,c:0.4},"10":{k:70.3848,n:0.9207,c:0.4},"25":{k:78.9803,n:0.9113,c:0.4},"50":{k:85.3502,n:0.9056,c:0.4},"100":{k:91.6695,n:0.9007,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:36:  "CHORRILLOS":         {codigo:"——",lat:6.270,lon:-75.590,alt:1900,fuente:"PDF",params:{"2.33":{k:51.4450,n:0.9544,c:0.4},"5":{k:59.8108,n:0.9572,c:0.4},"10":{k:66.6249,n:0.9591,c:0.4},"25":{k:75.2346,n:0.9611,c:0.4},"50":{k:81.6221,n:0.9624,c:0.4},"100":{k:87.9625,n:0.9634,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:37:  "FABRICATO":          {codigo:"2701037",lat:6.36188883,lon:-75.60018886,alt:2422,fuente:"PDF",params:{"2.33":{k:53.5837,n:0.9169,c:0.4},"5":{k:65.5265,n:0.9126,c:0.4},"10":{k:75.2345,n:0.9100,c:0.4},"25":{k:87.4850,n:0.9075,c:0.4},"50":{k:96.5654,n:0.9060,c:0.4},"100":{k:105.5740,n:0.9048,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:54:};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:55:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:56:// ─── MOTOR IDF ────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:57:function idfI(est,d_min,Tr){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:58:  const d_h=d_min/60;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:59:  const keys=Object.keys(est.params).map(Number).sort((a,b)=>a-b);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:60:  if(est.params[String(Tr)]){const{k,n,c}=est.params[String(Tr)];return k/Math.pow(c+d_h,n);}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:61:  const lo=keys.filter(t=>t<=Tr).pop()||keys[0];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:78:];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:79:// Ec.2 polinomio — GT-AS-004
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:80:function distPolyQ1(T){return 3.820399e-8*T**5-1.104784e-5*T**4+1.278006e-3*T**3-7.958462e-2*T**2+3.400981*T;}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:81:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:82:// ─── CURVAS HUFF (Quartiles I-IV) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:83:// Curvas Huff estándar (Illinois, USA) adaptadas — probabilidad 50%
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:84:// Q1: lluvia concentrada en primer 25% del tiempo (convectiva)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:100:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:101:// Interpolación lineal en tabla de distribución
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:102:function interpDist(table, tPct){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:103:  if(tPct<=0) return 0; if(tPct>=100) return 100;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:104:  const lo=table.filter(r=>r.T<=tPct).pop()||table[0];
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:105:  const hi=table.filter(r=>r.T>=tPct)[0]||table[table.length-1];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:106:  if(lo.T===hi.T) return lo.P;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:107:  return lo.P+(hi.P-lo.P)*(tPct-lo.T)/(hi.T-lo.T);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:108:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:109:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:110:// ─── GENERACIÓN DE HIETOGRAMA ─────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:111:// Método: Distribución temporal adimensional (GT-AS-004 §3.3 o Huff)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:112:// Retorna: {data:[{t,tPct,pAcum,pIncrem,iBloque}], Ptotal}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:113:function calcHietograma(est, Tr, dur_h, dt_min, distType="EPM_Q1"){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:114:  const Ptotal = idfI(est, dur_h*60, Tr) * dur_h;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:115:  const steps  = Math.round(dur_h*60/dt_min);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:116:  const distTable = distType==="EPM_Q1" ? DIST_TEMPORAL_Q1
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:117:    : distType==="Huff_Q1" ? HUFF_DATA.Q1
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:118:    : distType==="Huff_Q2" ? HUFF_DATA.Q2
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:121:  const data=[];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:122:  for(let i=0;i<=steps;i++){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:123:    const tPct=(i/steps)*100;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:124:    const pPct= distType==="EPM_Q1" ? distPolyQ1(tPct) : interpDist(distTable,tPct);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:125:    data.push({t:+(i*dt_min).toFixed(1), tPct:+tPct.toFixed(1), pAcum:+(pPct/100*Ptotal).toFixed(3)});
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:126:  }
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:127:  for(let i=1;i<data.length;i++){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:128:    data[i].pIncrem=+(data[i].pAcum-data[i-1].pAcum).toFixed(4);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:129:    data[i].iBloque=+(data[i].pIncrem/(dt_min/60)).toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:133:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:134:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:135:// ─── CN & PÉRDIDAS SCS ────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:136:// ── CN dinámico real (castellano) ─────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:137:function cnIIaCNI(cnII){ return (cnII>0 ? (4.2*cnII)/(10+0.058*cnII) : cnII); }
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:138:function cnIIaCNIII(cnII){ return (cnII>0 ? (23*cnII)/(10+0.13*cnII) : cnII); }
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:139:function mezclaImpermeable(cnPermeable, porcentajeImp, cnImperv=98){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:140:  const w = Math.max(0, Math.min(100, porcentajeImp))/100; 
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:141:  return cnPermeable*(1-w) + cnImperv*w;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:142:}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:143:function calcCNdinamico({ amcActual, porcentajeImpermeable, cnBase }){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:144:  let cnPermeable_CNII = Number.isFinite(cnBase) ? +cnBase : 75;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:145:  cnPermeable_CNII = Math.max(30, Math.min(98, cnPermeable_CNII));
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:146:  let cnAjustado = amcActual==="I" ? cnIIaCNI(cnPermeable_CNII)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:147:                  : amcActual==="III" ? cnIIaCNIII(cnPermeable_CNII)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:148:                  : cnPermeable_CNII; // AMC II
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:149:  const cnEfectivo = mezclaImpermeable(cnAjustado, porcentajeImpermeable, 98);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:150:  return +Math.max(30, Math.min(98, cnEfectivo)).toFixed(1);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:151:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:152:// Derivar AMC desde SIATA con informe contextualizado
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:153:function derivarAMCDesdeSIATA(humedadSuelo){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:154:  const hs = Number.isFinite(humedadSuelo) ? +humedadSuelo : 0.35; // fallback
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:162:  return { amcActual, amcFuente: "SIATA", amcInforme: `${contexto}. ${informe}` };
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:163:}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:164:function cnMixto(SI){return 0.12*SI+86;}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:165:function cnII_to_III(cnII){return 23*cnII/(10+0.13*cnII);}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:166:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:167:// Lluvia efectiva Pe(t) acumulada — método SCS CN
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:168:function calcLluviaEfectiva(hiet, CN){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:169:  const S=25400/CN-254, Ia=0.2*S;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:170:  const rows=hiet.data.map(r=>{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:171:    const P=r.pAcum;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:172:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:173:    return{...r, Pe:+Pe.toFixed(4), PeIncrem:0, S, Ia};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:194:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:195:// ① HU SCS (Chow et al., 1994 — GT-AS-004 §3.5)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:196:function calcHUSCS(area, tc_h, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:197:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h, qp=2.08*area/tp;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:198:  const n=Math.ceil(2.67*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:199:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:200:    const t=i*dh, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:201:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:202:  });
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:203:  return{tp,qp,Tc:tc_h*60,uh,metadata:{nombre:"SCS",color:C.accent2}};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:204:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:205:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:206:// ② HU SCS MODIFICADO — SCS con coeficiente de pico Cp variable
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:207:// Cp estándar=2.08; Cp modificado=(0.2083·A)/tp ajustado por morfología
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:208:function calcHUSCS_Mod(area, tc_h, dt_min, Cp=2.08){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:209:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:210:  const qp=Cp*area/tp;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:211:  const n=Math.ceil(3.0*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:212:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:213:    const t=i*dh, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:214:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:215:  });
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:216:  return{tp,qp,Tc:tc_h*60,uh,Cp,metadata:{nombre:"SCS Mod.",color:C.teal}};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:217:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:218:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:219:// ③ HU SNYDER (Chow et al. 1994 — versión Ct/Cp configurable)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:220:function calcHUSnyder(area_mi2, L_mi, Lca_mi, dt_min, Ct=2.0, Cp=0.62){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:221:  const tlag=Ct*Math.pow(L_mi*Lca_mi,0.3);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:222:  const tp=tlag+dt_min/60/2;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:223:  const qp=(640*Cp*area_mi2)/tp;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:224:  const W50=770/Math.pow(qp/area_mi2,1.08);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:225:  const W75=440/Math.pow(qp/area_mi2,1.08);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:226:  const n=Math.ceil(5*(tp+tlag)/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:227:  const uh=Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:228:    const t=i*dt_min/60, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:229:    return +(tr<=1?qp*Math.pow(tr,2.5):qp*Math.exp(-2.0*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:230:  });
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:231:  return{tp,qp,tlag,W50,W75,Ct,Cp,uh,metadata:{nombre:"Snyder",color:C.accent3}};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:232:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:233:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:234:// ④ HU WILLIAMS & HANN (Williams & Hann, 1973)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:235:// Basado en: qp = 2.54·A^0.9·(S/1000)^0.5·CN^3/(Ia·A)  → simplificado
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:236:// Fórmula geomorfológica: qp=(A^m1·S^m2·CN^m3)·K_WH
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:237:function calcHUWilliamsHann(area, L_km, S_m_km, CN, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:238:  // Williams & Hann (1973): Tc = 0.1838·L^0.8·(S+1)^0.7 / (CN^0.35·S^0.5)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:239:  const Ss = 25400/CN - 254;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:240:  const tc_h = (0.1838*Math.pow(L_km,0.8)*Math.pow(Ss+1,0.7)) / (Math.pow(CN,0.35)*Math.pow(Math.max(S_m_km,0.01),0.5)) / 60;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:241:  const tp = 0.5*(dt_min/60) + 0.6*tc_h;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:242:  // Caudal pico Williams & Hann: qp = 2.083·A/tp · κ donde κ = 1.12 (calibración W&H)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:243:  const kWH = 1.12;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:244:  const qp  = kWH * 2.083 * area / tp;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:245:  const n   = Math.ceil(2.8*tp/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:246:  const uh  = Array.from({length:n},(_,i)=>{
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:247:    const t=i*dt_min/60, tr=t/tp;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:248:    return +(tr<=1?qp*Math.pow(tr,2.208):qp*Math.exp(-1.25*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:249:  });
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:250:  return{tp,qp,tc_h,Tc:tc_h*60,Ss,uh,metadata:{nombre:"Williams & Hann",color:C.gold}};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:251:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:252:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:253:// ④b CLARK IUH (Clark, 1945) — Hidrograma Unitario Instantáneo
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:254:// IUH de Clark: u(t) = qp·exp(-t/R) para t>tp, crecida lineal hasta tp
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:255:// Parámetros: tc (tiempo concentración), R (coef. almacenamiento cuenca)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:256:// R = k_R * tc  (típico k_R = 0.5–2.0, default 1.2)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:257:function calcClarkIUH(area, tc_h, dt_min, kR=1.2){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:258:  const dh   = dt_min/60;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:259:  const R    = kR * tc_h;  // coeficiente almacenamiento
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:260:  const qp   = 2.08*area/tc_h;  // caudal pico IUH
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:261:  const n    = Math.ceil((tc_h + 6*R)/dh) + 12;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:262:  const uh   = Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:263:    const t = i*dh;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:264:    // Antes de tc: crecida lineal; después: recesión exponencial
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:265:    const u = t<=tc_h ? qp*(t/tc_h) : qp*Math.exp(-(t-tc_h)/R);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:266:    return +Math.max(u,0).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:267:  });
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:268:  const tp   = tc_h;  // tiempo al pico
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:269:  return{tp,qp,tc_h,R,kR,uh,metadata:{nombre:"Clark IUH",color:C.accent4}};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:270:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:271:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:272:// ─── HIDROGRAMA COMPLETO (hietograma → convolución → Q(t)) ───────────────────
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:273:function calcHidroCompleto(lluvRows, uh_struct, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:278:  const peAll = lluvRows.slice(1).map(r=>Math.max(r.PeIncrem||0,0));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:279:  const qSeries = convolucion(uh_struct.uh, peAll, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:280:  const Qpico = Math.max(...qSeries.map(r=>r.Q));
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:281:  const tPico = qSeries.find(r=>r.Q>=Qpico*0.9999)?.t || 0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:282:  const volTotal = qSeries.reduce((s,r)=>s+r.Q*(dt_min*60),0);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:283:  return{qSeries, Qpico:+Qpico.toFixed(6), tPico:+tPico.toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:284:    volTotal:+volTotal.toFixed(1), metodo:uh_struct.metadata.nombre,
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:285:    color:uh_struct.metadata.color};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:286:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:287:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:288:// ─── FUNCIONES AUXILIARES ────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:289:function calcTc(p){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:290:  const L=p.longitud_cauce,A=p.area,Sp=p.pendiente_cuenca;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:291:  const So=(p.cota_mayor_cauce-p.cota_menor_cauce)/(L*1000)*1000;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:292:  const Lft=L*3280.84,Sf=(p.cota_mayor_cauce-p.cota_menor_cauce)/(L*3280.84);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:293:  const Ss=25400/p.CN-254;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:294:  return[
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:295:    {m:"Témez (1978)",h:0.3*Math.pow(L/Math.pow(So/1000,0.25),0.76)},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:296:    {m:"Kirpich (1940)",h:0.0078*Math.pow(Lft,0.77)*Math.pow(Sf,-0.385)/60},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:297:    {m:"California (1942)",h:0.0195*Math.pow(L*1000,0.77)*Math.pow(So/1000,-0.385)/60},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:302:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:303:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:304:// Volumen de almacenamiento SAR (GT-AS-004 §3.8)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:305:function calcVolSAR(qPost, qPre, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:306:  const n=Math.min(qPost.length,qPre.length);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:307:  let volAcum=0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:308:  const exc=[];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:309:  for(let i=0;i<n;i++){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:310:    const diff=qPost[i].Q-(qPre[i]?.Q||0);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:311:    if(diff>0) volAcum+=diff*dt_min*60;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:312:    exc.push({t:qPost[i].t, Qpost:+qPost[i].Q.toFixed(5), Qpre:+(qPre[i]?.Q||0).toFixed(5),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:313:      exceso:+Math.max(diff,0).toFixed(5), volAcum:+volAcum.toFixed(1)});
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:314:  }
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:315:  return{excesos:exc, volTotal:+volAcum.toFixed(1)};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:316:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:317:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:318:// Resumen racional
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:319:function calcRacional(est,area,tc_min,CN){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:320:  const S=25400/CN-254,Ia=0.2*S;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:321:  return TR_LIST.map(Tr=>{
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:322:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:323:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:324:    const Cc=P>0?Math.min(Pe/P,1):0.3;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:325:    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:326:  });
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:327:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:328:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:329:function buildResumenQ(params, est, dtMin, CNact) {
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:330:  const tcList = calcTc(params).filter(r => isFinite(r.h) && r.h > 0);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:331:  const tc_h = tcList[0]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:332:  const metodos = [
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:333:    { nombre: 'SCS',     make: () => calcHUSCS(params.area, tc_h, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:334:    { nombre: 'SCS Mod', make: () => calcHUSCS_Mod(params.area, tc_h, dtMin, 2.08) },
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:335:    { nombre: 'Snyder',  make: () => calcHUSnyder(params.area*0.386102, params.longitud_cauce*0.621371, params.longitud_cauce*0.621371*0.35, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:336:    { nombre: 'W&H',     make: () => calcHUWilliamsHann(params.area, params.longitud_cauce, (params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce, CNact, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:337:    { nombre: 'Clark',   make: () => calcClarkIUH(params.area, tc_h, dtMin, 1.2) },
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:338:  ];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:339:  return metodos.map(m => {
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:340:    const row = { metodo: m.nombre };
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:341:    TR_LIST.forEach(Tr => {
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:342:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:343:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:344:      const HU   = m.make();
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:345:      const H    = calcHidroCompleto(Pe, HU, dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:346:      row[Tr]    = +H.Qpico.toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:347:    });
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:348:    return row;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:349:  });
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:350:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:351:// ─── EXPORTACIÓN EXCEL (SheetJS) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:352:async function exportarExcel(datos){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:353:  const XLSX = await import("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").catch(()=>null);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:354:  if(!XLSX) return alert("Error cargando SheetJS");
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:355:  const WX = XLSX.default || XLSX;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:356:  const wb = WX.utils.book_new();
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:357:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:362:    ["Parámetro","Valor","Unidad"],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:363:    ["Cuenca",datos.nombre_cuenca,""],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:364:    ["Área",datos.area,"km²"],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:365:    ["Perímetro",datos.perimetro,"km"],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:366:    ["Longitud cauce",datos.longitud_cauce,"km"],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:367:    ["Pendiente media cuenca",datos.pendiente_cuenca,"%"],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:368:    ["Cota máxima",datos.cota_max,"msnm"],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:369:    ["Cota mínima",datos.cota_min,"msnm"],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:370:    ["CN (CNII)",datos.CN,""],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:371:    ["Tc (Témez)",datos.tc_h*60,"min"],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:372:    ["Estación IDF",datos.stn,""],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:373:    ["Tr de diseño",datos.Tr,"años"],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:374:    ["Duración lluvia",datos.dur_h,"h"],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:375:    ["Distribución temporal",datos.distType,""],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:376:    ["Δt cálculo",datos.dt_min,"min"],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:377:    ["P total diseño",datos.Ptotal,"mm"],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:378:    ["CN post-urbano (CNIII)",datos.cnPost,""],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:379:    ["CN pre-urbano (CNIII)",datos.cnPre,""],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:380:    ["% Superficie impermeable",datos.siPct,"%"],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:381:  ]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:382:  WX.utils.book_append_sheet(wb,ws1,"Parámetros");
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:383:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:385:  if(datos.hiet){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:386:    const rows=[["t (min)","T (%)","P acum (mm)","P increm (mm)","i bloque (mm/h)"]];
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:387:    datos.hiet.data.forEach(r=>rows.push([r.t,r.tPct,r.pAcum,r.pIncrem||0,r.iBloque||0]));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:388:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hietograma");
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:389:  }
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:390:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:391:  // Hoja 3: Hidrogramas comparativos
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:401:  }
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:402:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:403:  // Hoja 4: Volumen SAR
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:404:  if(datos.volSAR){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:405:    const rows=[["t (min)","Q post (m³/s)","Q pre (m³/s)","Exceso (m³/s)","Vol. Acum. (m³)"]];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:406:    datos.volSAR.excesos.filter((_,i)=>i%Math.max(1,Math.floor(datos.volSAR.excesos.length/500))===0)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:407:      .forEach(r=>rows.push([r.t,r.Qpost,r.Qpre,r.exceso,r.volAcum]));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:408:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Vol_SAR");
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:409:  }
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:410:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:411:  // Hoja 5: Resumen caudales
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:423:  try{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:424:    const [h2c, jsPDF_mod] = await Promise.all([
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:425:      import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:426:      import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:427:    ]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:428:    const html2canvas=h2c.default||h2c;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:429:    const {jsPDF}=jsPDF_mod.default||jsPDF_mod;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:430:    const canvas=await html2canvas(refEl,{scale:1.5,backgroundColor:"#07090F",useCORS:true});
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:437:    pdf.addImage(imgData,"JPEG",(pw-iw)/2,(ph-ih)/2,iw,ih);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:438:    pdf.save(`HidroFlow_${datos.nombre_cuenca}_Tr${datos.Tr}a.pdf`);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:439:  }catch(e){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:440:    console.error("PDF export error:",e);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:441:    alert("Error exportando PDF. Verifique conexión para cargar librerías.");
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:442:  }
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:443:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:542:function StationSel({sel,onSel}){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:543:  const[open,setOpen]=useState(false);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:544:  const e=ESTACIONES_EPM[sel];
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:545:  const pdfN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="PDF").length;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:546:  const refN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="REF").length;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:547:  return(<div style={{position:"relative",zIndex:300}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:548:    <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:9,background:C.card,border:`1px solid ${open?C.accent:C.border}`,borderRadius:10,padding:"6px 12px",cursor:"pointer",color:C.text,fontFamily:sans,fontSize:12,transition:"all .2s",minWidth:240}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:549:      <div style={{width:7,height:7,borderRadius:"50%",background:e.fuente==="PDF"?C.accent2:C.gold,flexShrink:0}}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:550:      <div style={{flex:1,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:559:      </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:560:      <div style={{padding:"4px 0 2px",fontSize:9,color:C.muted,fontFamily:mono,paddingLeft:13,paddingTop:8,paddingBottom:2}}>✓ CALIBRADAS PDF EPM 2025</div>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:561:      {Object.entries(ESTACIONES_EPM).filter(([,v])=>v.fuente==="PDF").map(([n,v])=><StationRow key={n} name={n} est={v} sel={sel} onSel={nm=>{onSel(nm);setOpen(false)}}/>)}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:562:      <div style={{padding:"4px 0 2px",fontSize:9,color:C.muted,fontFamily:mono,paddingLeft:13,paddingTop:8,paddingBottom:2,borderTop:`1px solid ${C.border}`}}>~ REFERENCIA ESTIMADA</div>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:563:      {Object.entries(ESTACIONES_EPM).filter(([,v])=>v.fuente==="REF").map(([n,v])=><StationRow key={n} name={n} est={v} sel={sel} onSel={nm=>{onSel(nm);setOpen(false)}}/>)}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:564:    </div>}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:565:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:566:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:567:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:578:  const toXY=(la,lo)=>[(lo-LON_MIN)/(LON_MAX-LON_MIN)*W,(1-(la-LAT_MIN)/(LAT_MAX-LAT_MIN))*H];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:579:  const[ox,oy]=toXY(lat,lon);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:580:  // Estaciones EPM para contexto
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:581:  const ests=Object.entries(ESTACIONES_EPM).map(([n,e])=>({n,lat:e.lat,lon:e.lon,alt:e.alt}));
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:582:  // Estaciones más cercanas (top 3)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:583:  const cercanas=[...ests].sort((a,b)=>distKm(lat,lon,a.lat,a.lon)-distKm(lat,lon,b.lat,b.lon)).slice(0,3);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:584:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:585:  return(<div style={{marginTop:12}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:586:    <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:5,display:"flex",gap:12,alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:602:      <path d={`M ${toXY(5.97,-75.65).join(",")} Q ${toXY(6.1,-75.61).join(",")} ${toXY(6.22,-75.57).join(",")} Q ${toXY(6.34,-75.56).join(",")} ${toXY(6.47,-75.54).join(",")}`}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:603:        stroke={C.accent} strokeWidth={0.8} fill="none" opacity={0.2}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:604:      {/* Todas las estaciones EPM como puntos de fondo */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:605:      {ests.map((e,i)=>{const[ex,ey]=toXY(e.lat,e.lon);const cerca=cercanas.find(c=>c.n===e.n);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:606:        return(<g key={i}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:607:          {cerca&&<line x1={ox} y1={oy} x2={ex} y2={ey} stroke={C.teal} strokeWidth={0.8} opacity={0.35} strokeDasharray="3 4"/>}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:608:          <circle cx={ex} cy={ey} r={cerca?4:2.5} fill={cerca?C.accent2:C.muted} opacity={cerca?0.9:0.45}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:626:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:627:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:628:function ModParams({ params, setParams }) {
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:629:  const tc = useMemo(() => calcTc(params), [params]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:630:  const set = k => v => setParams(p => ({ ...p, [k]: v }));
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:631:  const tcStats = tc.filter(r => isFinite(r.h) && r.h > 0);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:632:  const tcMed = tcStats.length ? tcStats.reduce((s, r) => s + r.h, 0) / tcStats.length : 0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:633:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:634: return (
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:635:    <div style={{display:"flex",flexDirection:"column",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:636:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:637:      {/* ── Morfometría / Índices / Tc (tu bloque existente) ───────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:638:      <SectionHeader
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:639:        icon="⬡"
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:640:        title="Morfometría de Cuenca"
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:641:        sub="Parámetros geomorfológicos · Índices · Tiempos de concentración"
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:647:          <Field label="Nombre cuenca" value={params.nombre_cuenca} onChange={set("nombre_cuenca")} type="text"/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:648:          <Field label="Δt cálculo"     value={params.dt}            onChange={set("dt")}             unit="min" step="0.5"/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:649:          <Field label="CN (CNII)"       value={params.CN}            onChange={set("CN")}             step="1"/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:650:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:651:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:652:        {/* … tus otras cards de Geometría / Cotas / etc. … */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:653:      </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:654:      {/* ⬆️ Cierre del grid de Morfometría — PUNTO DE INSERCIÓN CORRECTO */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:655:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:656:      {/* ───────────────── Condición de Humedad (AMC) y Urbanización ────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:658:        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:659:          <h3 style={{margin:0, fontSize:16}}>Condición de Humedad (AMC) y Urbanización</h3>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:660:          <small style={{opacity:0.75}}>Ajusta AMC, % Impermeable y CN II base</small>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:661:        </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:662:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:663:        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, alignItems:'start'}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:664:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:670:                <button
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:671:                  key={a}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:672:                  onClick={() => setParams(prev => ({...prev, amcActual: a}))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:673:                  style={{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:674:                    padding:'8px 12px', borderRadius:8, cursor:'pointer',
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:675:                    border: (params?.amcActual===a ? '1px solid #00F5A0' : '1px solid #1F2F45'),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:676:                    background: (params?.amcActual===a ? '#12242A' : '#0B0F1A'),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:693:              type="range" min={0} max={100} step={1}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:694:              value={Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:695:              onChange={e => setParams(prev => ({...prev, porcentajeImpermeable: +e.target.value}))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:696:              style={{width:'100%'}}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:697:            />
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:698:            <div style={{marginTop:8, fontFamily:'monospace'}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:699:              {Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60}%
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:700:            </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:701:            <small style={{display:'block', marginTop:8, opacity:0.75}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:702:              Pondera CN mezclando suelo permeable e impermeable
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:703:            </small>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:704:          </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:705:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:706:          {/* CN II base */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:707:          <div>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:708:            <label style={{display:'block', marginBottom:8}}>CN II base</label>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:709:            <input
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:710:              type="number" min={30} max={98} step={0.1}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:711:              value={Number.isFinite(params?.cnBase) ? params.cnBase
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:712:                    : (Number.isFinite(params?.CN) ? params.CN : 75)}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:713:              onChange={e => setParams(prev => ({...prev, cnBase: +e.target.value}))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:714:              style={{width:'100%', padding:8, borderRadius:8, border:'1px solid #1F2F45', background:'#0B0F1A', color:'#D8E4F0'}}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:715:            />
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:716:            <small style={{display:'block', marginTop:8, opacity:0.75}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:717:              Si no defines CN II base, se usa el CN clásico (params.CN)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:718:            </small>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:719:          </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:720:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:721:        </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:722:      </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:723:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:724:      {/* ── KPIs / Tc (tu bloque existente) ─────────────────────────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:725:      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:9}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:726:        {[
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:727:          {v:(params.perimetro/(2*Math.sqrt(Math.PI*params.area))).toFixed(3),l:"Índice Gravelius",s:"Kc",a:C.accent},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:728:          {v:((params.longitud_cuenca**2)/params.area).toFixed(3),l:"Índice de Forma",s:"Rf",a:C.accent2},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:729:          {v:(params.area/(params.longitud_cuenca**2)).toFixed(4),l:"Coef. Compacidad",s:"Cc",a:C.accent3},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:730:          {v:((params.cota_max-params.cota_min)/(params.longitud_cauce*1000)*1000).toFixed(2),l:"Pendiente cauce",s:"So ‰",a:C.gold},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:731:          {v:(tcMed*60).toFixed(2),l:"Tc promedio",s:"min",a:C.accent4},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:732:        ].map(({v,l,s,a}) => <Kpi key={l} value={`${v} ${s}`} label={l} accent={a}/>)}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:733:      </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:734:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:735:      <Card title="Tiempos de Concentración — 6 Métodos" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:736:        <Tbl
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:737:          headers={["Método","Tc (h)","Tc (min)","Δ vs. media (%)"]}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:738:          rows={tc.filter(r=>isFinite(r.h)&&r.h>0).map(r=>({
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:739:            M:r.m, H:+r.h.toFixed(4),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:740:            MIN:+r.min.toFixed(3),
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:741:            DELTA:+((r.h-tcMed)/tcMed*100).toFixed(1)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:742:          }))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:743:          hiCols={[2]}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:744:          accent={C.teal}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:745:        />
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:753:  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:754:    <h3 style={{margin:0, fontSize:16}}>Condición de Humedad (AMC) y Urbanización</h3>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:755:    <small style={{opacity:0.75}}>Ajusta AMC, % Impermeable y CN II base</small>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:756:  </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:757:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:758:  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16, alignItems:'start'}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:759:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:765:          <button
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:766:            key={a}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:767:            onClick={() => setParams(prev => ({...prev, amcActual: a}))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:768:            style={{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:769:              padding:'8px 12px', borderRadius:8, cursor:'pointer',
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:770:              border: (params?.amcActual===a ? '1px solid #00F5A0' : '1px solid #1F2F45'),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:771:              background: (params?.amcActual===a ? '#12242A' : '#0B0F1A'),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:788:        type="range" min={0} max={100} step={1}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:789:        value={Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:790:        onChange={e => setParams(prev => ({...prev, porcentajeImpermeable: +e.target.value}))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:791:        style={{width:'100%'}}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:792:      />
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:793:      <div style={{marginTop:8, fontFamily:'monospace'}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:794:        {Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60}%
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:795:      </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:796:      <small style={{display:'block', marginTop:8, opacity:0.75}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:797:        Pondera CN mezclando suelo permeable e impermeable
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:798:      </small>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:799:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:800:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:801:    {/* CN II base */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:802:    <div>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:803:      <label style={{display:'block', marginBottom:8}}>CN II base</label>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:804:      <input
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:805:        type="number" min={30} max={98} step={0.1}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:806:        value={
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:807:          Number.isFinite(params?.cnBase) ? params.cnBase
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:808:          : (Number.isFinite(params?.CN) ? params.CN : 75)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:809:        }
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:810:        onChange={e => setParams(prev => ({...prev, cnBase: +e.target.value}))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:811:        style={{width:'100%', padding:8, borderRadius:8, border:'1px solid #1F2F45', background:'#0B0F1A', color:'#D8E4F0'}}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:812:      />
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:813:      <small style={{display:'block', marginTop:8, opacity:0.75}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:814:        Si no defines CN II base, se usa el CN clásico (params.CN)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:815:      </small>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:816:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:817:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:818:  </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:819:</div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:820:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:821:// MÓDULO IDF — Curvas Intensidad-Duración-Frecuencia
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:822:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:823:function ModIDF({est,name}){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:824:  const DURS=[5,10,15,20,30,45,60,90,120,180,240,360];
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:825:  const idfData=useMemo(()=>DURS.map(d=>({d,...Object.fromEntries(TR_LIST.map(T=>[`Tr${T}`,+idfI(est,d,T).toFixed(2)]))})),[est]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:826:  const curvasData=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:827:    const pts=[];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:828:    for(let d=5;d<=360;d+=5){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:829:      const row={d};
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:830:      TR_LIST.forEach(T=>row[`Tr${T}`]=+idfI(est,d,T).toFixed(2));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:831:      pts.push(row);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:832:    }
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:833:    return pts;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:834:  },[est]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:835:  // Comparativa 20 estaciones a d=30min, Tr=100a
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:836:  const compData=useMemo(()=>Object.entries(ESTACIONES_EPM).map(([n,e])=>({
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:837:    est:n.length>12?n.substring(0,12)+"…":n,
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:838:    I100:+idfI(e,30,100).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:839:    fuente:e.fuente,
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:840:  })).sort((a,b)=>b.I100-a.I100),[]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:841:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:842:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:843:    <SectionHeader icon="⌁" title="Curvas IDF — 20 Estaciones EPM 2025" sub={`I = k/(c+d)ⁿ · d en horas · c = 0.4 · Gumbel · 2000–2023`} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:844:    <div style={{background:`${C.accent2}08`,border:`1px solid ${C.accent2}20`,borderRadius:10,padding:"10px 15px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:845:      <div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:846:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.08em"}}>Estación activa · {est.fuente==="PDF"?"✓ Calibrada PDF EPM 5/11/2024":"~ Referencia estimada"}</div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:847:        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>{name}</div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:856:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:857:    <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:858:      <Card title={`Curvas IDF — ${name}`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:859:        <ResponsiveContainer width="100%" height={280}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:860:          <LineChart data={curvasData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:861:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:862:            <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:868:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:869:      </Card>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:870:      <Card title="Tabla IDF — Intensidades (mm/h)" accent={C.accent3}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:871:        <Tbl headers={["d(min)",...TR_LIST.map(T=>`Tr=${T}a`)]} rows={idfData.map(r=>({d:r.d,...Object.fromEntries(TR_LIST.map(T=>[T,r[`Tr${T}`]]))}))} hiCols={[6]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:872:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:873:    </div>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:874:    <Card title="Comparativa 20 Estaciones — I(d=30min, Tr=100a)" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:875:      <ResponsiveContainer width="100%" height={220}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:876:        <BarChart data={compData} margin={{left:0,right:14,top:8,bottom:44}} layout="vertical">
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:877:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:878:          <XAxis type="number" tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",position:"insideBottom",offset:-8,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:888:    <Card title="Parámetros k · n · c — Todos los Tr" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:889:      <Tbl headers={["Tr (años)","k","n","c","I(10min)","I(30min)","I(60min)","I(120min)"]}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:890:        rows={TR_LIST.map(T=>{const{k,n,c}=est.params[String(T)]||{k:0,n:1,c:0.4};return{T,k:+k.toFixed(4),n:+n.toFixed(4),c,I10:+idfI(est,10,T).toFixed(2),I30:+idfI(est,30,T).toFixed(2),I60:+idfI(est,60,T).toFixed(2),I120:+idfI(est,120,T).toFixed(2)};})}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:891:        hiCols={[4]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:892:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:893:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:894:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:910:  const hietAll=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:911:    const types=["EPM_Q1","Huff_Q1","Huff_Q2","Huff_Q3","Huff_Q4"];
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:912:    return types.map(tp=>({tp, data:calcHietograma(est,Tr,durH,dtMin,tp)}));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:913:  },[est,Tr,durH,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:914:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:915:  // Combinar bloques de intensidad para gráfica comparativa
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:916:  const compData=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:919:      const obj={t:r.t, EPM:r.iBloque};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:920:      hietAll.forEach(h=>{
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:921:        const match=h.data.data[Math.min(idx*Math.max(1,Math.floor(len/60))+1,h.data.data.length-1)];
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:922:        if(match) obj[h.tp]=match.iBloque||0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:923:      });
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:924:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:925:    });
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:926:  },[hiet,hietAll]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:971:      <Kpi value={`${durH}h · ${dtMin}' · ${hiet.steps}bloq`} label="Configuración" accent={C.muted2}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:972:      <Kpi value={distType.replace("_"," ")} label="Distribución" accent={distType==="EPM_Q1"?C.accent2:C.gold}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:973:      <Kpi value={name.length>12?name.substring(0,12)+"…":name} label="Estación IDF" accent={C.accent4}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:974:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:975:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:976:    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:977:      {/* Hietograma de diseño */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1032:        headers={["t (min)","T (%)","P acum (mm)","ΔP (mm)","i bloque (mm/h)"]}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1033:        rows={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/40))===0).map(r=>({
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1034:          t:r.t, T:r.tPct, P:r.pAcum, dP:r.pIncrem, i:r.iBloque
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1035:        }))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1036:        hiCols={[3,4]} accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1037:      />
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1038:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1046:  const [Tr,setTr]=useState(25);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1047:  const [dtMin,setDtMin]=useState(()=>+params.dt||5);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1048:  const CNact = useMemo(() => calcCNdinamico({
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1049:  amcActual: params.amcActual ?? "II",
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1050:  porcentajeImpermeable: params.porcentajeImpermeable ?? 80,
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1051:  cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1052:}), [params.amcActual, params.porcentajeImpermeable, params.cnBase, params.CN]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1053:  
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1054:  useEffect(()=>{ if(params.dt&&+params.dt!==dtMin) setDtMin(+params.dt); },[params.dt]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1055:  const [tcSrc,setTcSrc]=useState(0); // índice en lista de métodos Tc
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1056:  const [kR,setKR]=useState(1.2);    // Clark kR
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1057:  const [Ct,setCt]=useState(2.0);    // Snyder Ct
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1058:  const [Cp,setCp]=useState(0.62);   // Snyder Cp
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1059:  const [CpSCSMod,setCpSCSMod]=useState(2.08); // SCS Mod Cp
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1060:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1061:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1062:  const tc_h=tcList[tcSrc]?.h||0.5;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1063:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1064:  const area_mi2=params.area*0.386102;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1065:  const L_mi=params.longitud_cauce*0.621371;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1066:  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1067:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1068:  // Hietograma para este Tr+dt
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1069:  const hiet=useMemo(()=>calcHietograma(est,Tr,3,dtMin,"EPM_Q1"),[est,Tr,dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1070:  const lluvEfect=useMemo(()=>calcLluviaEfectiva(hiet, CNact),[hiet, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1071:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1072:  // Construir los 5 HU
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1073:  const hu_scs    =useMemo(()=>calcHUSCS(params.area,tc_h,dtMin),[params.area,tc_h,dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1074:  const hu_scsMod =useMemo(()=>calcHUSCS_Mod(params.area,tc_h,dtMin,CpSCSMod),[params.area,tc_h,dtMin,CpSCSMod]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1075:  const hu_snyder =useMemo(()=>calcHUSnyder(area_mi2,L_mi,L_mi*0.35,dtMin,Ct,Cp),[area_mi2,L_mi,dtMin,Ct,Cp]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1076:  const hu_wh     =useMemo(()=>calcHUWilliamsHann(params.area,params.longitud_cauce,S_m_km,CNact,dtMin),[params, dtMin, CNact]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1077:  const hu_clark  =useMemo(()=>calcClarkIUH(params.area,tc_h,dtMin,kR),[params.area,tc_h,dtMin,kR]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1078:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1079:  // Hidrogramas completos (convolución)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1080:  const hidros=useMemo(()=>[hu_scs,hu_scsMod,hu_snyder,hu_wh,hu_clark].map(hu=>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1081:    calcHidroCompleto(lluvEfect,hu,dtMin)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1103:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1104:  const lePe=lluvEfect.reduce((s,r)=>s+(r.PeIncrem||0),0);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1105:  const resumenQ = useMemo(() => buildResumenQ(params, est, dtMin, CNact), [params, est, dtMin, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1106:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1107:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1108:    <SectionHeader icon="≋" title="Hidrogramas Unitarios Sintéticos — 5 Métodos" sub="SCS · SCS Mod. · Snyder · Williams & Hann · Clark IUH · Convolución completa" accent={C.accent2}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1109:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1116:        <BtnGroup options={[5,10,15,30].map(d=>({v:d,l:`${d}'`}))} value={dtMin} onChange={setDtMin} accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1117:      </Card>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1118:      <Card title="Método Tc activo" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1119:        <div style={{display:"flex",flexDirection:"column",gap:3}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1120:          {tcList.slice(0,6).map((r,i)=>(
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1121:            <button key={i} onClick={()=>setTcSrc(i)} style={{padding:"3px 8px",borderRadius:5,border:`1px solid ${i===tcSrc?C.accent3:C.border}`,cursor:"pointer",background:i===tcSrc?`${C.accent3}18`:"transparent",color:i===tcSrc?C.accent3:C.muted,fontSize:8,fontFamily:mono,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1122:              {r.m.split("(")[0].trim()} → {r.min.toFixed(1)}min
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1123:            </button>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1124:          ))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1125:        </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1134:          <div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1135:            <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:2}}>Cp SCS Mod.</div>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1136:            <input type="number" step="0.01" min="1.0" max="3.0" value={CpSCSMod} onChange={e=>setCpSCSMod(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1137:              style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:5,color:C.text,padding:"4px 6px",fontSize:11,fontFamily:mono}}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1138:          </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1139:        </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1140:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1143:          <div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1144:            <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:2}}>Ct</div>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1145:            <input type="number" step="0.1" min="0.3" max="6.0" value={Ct} onChange={e=>setCt(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1146:              style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:5,color:C.text,padding:"4px 6px",fontSize:11,fontFamily:mono}}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1147:          </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1148:          <div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1149:            <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:2}}>Cp</div>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1150:            <input type="number" step="0.01" min="0.3" max="1.0" value={Cp} onChange={e=>setCp(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1151:              style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:5,color:C.text,padding:"4px 6px",fontSize:11,fontFamily:mono}}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1152:          </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1153:        </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1154:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1157:    {/* KPIs */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1158:    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1159:      {hidros.map((h,i)=><Kpi key={h.metodo} value={h.Qpico.toFixed(4)+" m³/s"} label={h.metodo} accent={CC[i]} sub={`tp=${h.tPico}min`}/>)}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1160:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1161:    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1162:      <Kpi value={`${tc_h.toFixed(3)}h / ${(tc_h*60).toFixed(1)}min`} label={`Tc activo (${tcList[tcSrc]?.m?.split("(")[0]||""})`} accent={C.teal}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1163:      <Kpi value={`${lePe.toFixed(2)} mm`} label="Pe total efectiva" accent={C.accent2}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1164:      <Kpi value={`${hiet.Ptotal} mm`} label="P total bruta" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1165:      <Kpi value={`${(lePe/hiet.Ptotal*100).toFixed(1)}%`} label="Abstracción SCS" accent={C.rose} sub="Escorrentía directa"/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1166:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1198:    {/* Tabla comparativa */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1199:    <Card title="Tabla Comparativa — Parámetros de HU" accent={C.muted2}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1200:      <Tbl headers={["Método","tp (h)","qp (m³/s/mm)","Tc (min)","Q pico diseño (m³/s)","t al pico (min)","Vol. Escorrentía (m³)"]}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1201:        rows={[
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1202:          {m:"SCS",tp:+hu_scs.tp.toFixed(3),qp:+hu_scs.qp.toFixed(4),tc:(tc_h*60).toFixed(1),Qp:hidros[0].Qpico,tp2:hidros[0].tPico,V:+hidros[0].volTotal.toFixed(0)},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1203:          {m:"SCS Mod.",tp:+hu_scsMod.tp.toFixed(3),qp:+hu_scsMod.qp.toFixed(4),tc:(tc_h*60).toFixed(1),Qp:hidros[1].Qpico,tp2:hidros[1].tPico,V:+hidros[1].volTotal.toFixed(0)},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1204:          {m:"Snyder",tp:+hu_snyder.tp.toFixed(3),qp:+hu_snyder.qp.toFixed(4),tc:(hu_snyder.tp*60).toFixed(1),Qp:hidros[2].Qpico,tp2:hidros[2].tPico,V:+hidros[2].volTotal.toFixed(0)},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1205:          {m:"W & Hann",tp:+hu_wh.tp.toFixed(3),qp:+hu_wh.qp.toFixed(4),tc:+hu_wh.Tc.toFixed(1),Qp:hidros[3].Qpico,tp2:hidros[3].tPico,V:+hidros[3].volTotal.toFixed(0)},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1206:          {m:"Clark IUH",tp:+hu_clark.tp.toFixed(3),qp:+hu_clark.qp.toFixed(4),tc:(hu_clark.tc_h*60).toFixed(1),Qp:hidros[4].Qpico,tp2:hidros[4].tPico,V:+hidros[4].volTotal.toFixed(0)},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1207:        ]} hiCols={[3]} accent={C.accent2}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1208:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1209:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1210:    {/* Lluvia efectiva Pe */}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1211:    <Card title={`Lluvia Efectiva — CN=${CNact} → Pe total = ${lePe.toFixed(2)} mm`} accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1212:      <ResponsiveContainer width="100%" height={200}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1213:        <AreaChart data={lluvEfect.filter((_,i)=>i%Math.max(1,Math.floor(lluvEfect.length/80))===0)} margin={{left:0,right:14,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1214:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1215:          <XAxis dataKey="t" tick={{fill:C.muted,fontSize:9}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1216:          <YAxis tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1217:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(3)+" mm",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1218:          <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1219:          <Area type="monotone" dataKey="pAcum" stroke={C.accent} fill={`${C.accent}18`} strokeWidth={1.5} dot={false} name="P total (mm)"/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1220:          <Area type="monotone" dataKey="Pe" stroke={C.rose} fill={`${C.rose}22`} strokeWidth={2.5} dot={false} name="Pe efectiva (mm)"/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1221:        </AreaChart>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1222:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1223:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1224:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1225:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1234:  useEffect(()=>{ if(params.dt&&+params.dt!==dtMin) setDtMin(+params.dt); },[params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1235:  const [siPct,setSiPct]=useState(80);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1236:  const [catSAR,setCatSAR]=useState("Intermedios");
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1237:  const [distType,setDistType]=useState("EPM_Q1");
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1238:  const [metodoPost,setMetodoPost]=useState("SCS");
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1239:  const reportRef=useRef();
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1240:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1241:  const TrRec={Menores:2.33,Intermedios:5,Mayores:25};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1242:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1243:  const cnII_post  = +Math.min(cnMixto(siPct),98).toFixed(1);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1244:  const cnIII_post = +cnII_to_III(cnII_post).toFixed(2);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1245:  const cnIII_pre  = 93.5;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1246:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1247:  // Hietograma de diseño
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1248:  const hiet=useMemo(()=>calcHietograma(est,Tr,durH,dtMin,distType),[est,Tr,durH,dtMin,distType]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1249:  const lluvPost=useMemo(()=>calcLluviaEfectiva(hiet,cnIII_post),[hiet,cnIII_post]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1250:  const lluvPre =useMemo(()=>calcLluviaEfectiva(hiet,cnIII_pre),[hiet]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1251:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1252:  // Tc Témez para la cuenca
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1253:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1254:  const tc_h=tcList[0]?.h||0.5;
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1255:  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1256:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1257:  // Método hidrograma post-urbano seleccionable
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1258:  const huPost=useMemo(()=>{
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1259:    if(metodoPost==="Clark") return calcClarkIUH(params.area,tc_h,dtMin,1.2);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1260:    if(metodoPost==="Snyder") return calcHUSnyder(params.area*0.386102,params.longitud_cauce*0.621371,params.longitud_cauce*0.621371*0.35,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1261:    if(metodoPost==="WH") return calcHUWilliamsHann(params.area,params.longitud_cauce,S_m_km,cnIII_post,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1262:    return calcHUSCS(params.area,tc_h,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1263:  },[metodoPost,params,tc_h,dtMin,cnIII_post]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1264:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1265:  const qPost=useMemo(()=>calcHidroCompleto(lluvPost,huPost,dtMin),[lluvPost,huPost,dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1266:  const huPre=useMemo(()=>calcHUSCS(params.area,tc_h,dtMin),[params.area,tc_h,dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1267:  const qPre =useMemo(()=>calcHidroCompleto(lluvPre,huPre,dtMin),[lluvPre,huPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1268:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1269:  const volSAR=useMemo(()=>calcVolSAR(qPost.qSeries,qPre.qSeries,dtMin),[qPost,qPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1270:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1271:  const step=Math.max(1,Math.floor(volSAR.excesos.length/120));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1272:  const dispData=volSAR.excesos.filter((_,i)=>i%step===0).slice(0,140);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1273:  const reduccion=qPost.Qpico>0?(100*(qPost.Qpico-qPre.Qpico)/qPost.Qpico).toFixed(1):0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1274:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1275:  const exportDatos={
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1276:    nombre_cuenca:params.nombre_cuenca,area:params.area,perimetro:params.perimetro,
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1277:    longitud_cauce:params.longitud_cauce,pendiente_cuenca:params.pendiente_cuenca,
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1278:    cota_max:params.cota_max,cota_min:params.cota_min,CN:params.CN,
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1279:    tc_h,stn:name,Tr,dur_h:durH,distType,dt_min:dtMin,Ptotal:hiet.Ptotal,
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1280:    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1281:    hiet,
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1282:    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1283:    volSAR,
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1284:  };
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1285:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1286:  return(<div style={{display:"flex",flexDirection:"column",gap:14}} ref={reportRef}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1288:    <div style={{background:`linear-gradient(135deg,${C.accent2}0A,${C.accent4}08)`,border:`1px solid ${C.accent2}25`,borderRadius:12,padding:"12px 18px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1289:      <div style={{flexShrink:0}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1290:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em"}}>Guía Técnica GT-AS-004 · §3 Diseño Hidrológico · Rev.0 · 2026-01-07</div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1291:        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>Diseño de Sistemas de Almacenamiento y Regulación de Aguas Lluvias</div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1292:      </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1293:      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginLeft:"auto"}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1294:        <button onClick={()=>exportarExcel(exportDatos)} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${C.accent2}40`,background:`${C.accent2}12`,color:C.accent2,fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700}}>⬇ Excel</button>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1301:      <Card title="Categoría SAR" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1302:        {["Menores","Intermedios","Mayores"].map(c=>(
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1303:          <button key={c} onClick={()=>{setCatSAR(c);setTr(TrRec[c]);}} style={{display:"block",width:"100%",margin:"2px 0",padding:"4px 8px",borderRadius:5,border:"none",cursor:"pointer",background:catSAR===c?C.accent4:`${C.accent4}12`,color:catSAR===c?C.bg:C.muted,fontSize:9,fontFamily:mono,fontWeight:catSAR===c?700:400,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1304:            {c} <span style={{opacity:.55}}>Tr={TrRec[c]}a</span>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1305:          </button>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1306:        ))}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1307:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1323:      <Card title="% Sup. Impermeable" accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1324:        <BtnGroup options={[20,40,60,80,100].map(s=>({v:s,l:`${s}%`}))} value={siPct} onChange={setSiPct} accent={C.rose}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1325:        <div style={{marginTop:6,fontSize:9,color:C.muted,fontFamily:mono}}>CNIII post={cnIII_post}</div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1326:        <div style={{marginTop:2,fontSize:9,color:C.muted,fontFamily:mono}}>Método:</div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1327:        <BtnGroup options={[{v:"SCS",l:"SCS"},{v:"Clark",l:"Clark"},{v:"Snyder",l:"Snyder"},{v:"WH",l:"W&H"}]}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1328:          value={metodoPost} onChange={setMetodoPost} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1329:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1333:    <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1334:      <Kpi value={hiet.Ptotal+" mm"} label="P total diseño" accent={C.accent} sub={`Tr=${Tr}a, d=${durH}h`}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1335:      <Kpi value={cnIII_post.toFixed(1)} label="CN post (CNIII)" accent={C.rose} sub={`SI=${siPct}%`}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1336:      <Kpi value={cnIII_pre.toFixed(1)} label="CN pre (CNIII)" accent={C.accent2} sub="Pastizales pobres"/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1337:      <Kpi value={qPost.Qpico.toFixed(4)+" m³/s"} label={`Q pico POST (${metodoPost})`} accent={C.accent3}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1338:      <Kpi value={qPre.Qpico.toFixed(4)+" m³/s"} label="Q pico PRE (SCS)" accent={C.accent2}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1339:      <Kpi value={reduccion+"%"} label="Reducción pico" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1340:      <Kpi value={volSAR.volTotal.toFixed(0)+" m³"} label="V almacenamiento" accent={C.accent4}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1341:      <Kpi value={catSAR} label="Categoría SAR" accent={C.teal} sub={`Borde libre ${catSAR==="Menores"?">0.10m":catSAR==="Intermedios"?">0.25m":">0.50m"}`}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1342:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1378:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1379:    {/* Hidrogramas POST vs PRE */}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1380:    <Card title={`Hidrogramas SAR — POST (${metodoPost}, CN=${cnIII_post}) vs PRE (SCS, CN=${cnIII_pre}) · V_SAR=${volSAR.volTotal.toFixed(0)} m³`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1381:      <ResponsiveContainer width="100%" height={290}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1382:        <AreaChart data={dispData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1383:          <defs>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1384:            <linearGradient id="gPost" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent3} stopOpacity={0.35}/><stop offset="95%" stopColor={C.accent3} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1385:            <linearGradient id="gPre"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent2} stopOpacity={0.25}/><stop offset="95%" stopColor={C.accent2} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1386:            <linearGradient id="gVol"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold}    stopOpacity={0.20}/><stop offset="95%" stopColor={C.gold}    stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1392:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[nm.includes("Vol")?v.toFixed(0)+" m³":v.toFixed(5)+" m³/s",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1393:          <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1394:          <Area yAxisId="q" type="monotone" dataKey="Qpost" stroke={C.accent3} fill="url(#gPost)" strokeWidth={2.5} name={`Q post (${metodoPost})`} dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1395:          <Area yAxisId="q" type="monotone" dataKey="Qpre"  stroke={C.accent2} fill="url(#gPre)"  strokeWidth={2.5} name="Q pre (SCS)" dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1396:          <Area yAxisId="v" type="monotone" dataKey="volAcum" stroke={C.gold} fill="url(#gVol)" strokeWidth={1.5} name="Vol. SAR acum. (m³)" dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1397:        </AreaChart>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1398:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1399:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1400:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1401:    {/* CN y clasificación */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1402:    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1403:      <Card title="CN — GT-AS-004 Tabla 5 (CNIII)" accent={C.rose}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1404:        <Tbl headers={["Descripción","SI%","CNII","CNIII"]} rows={[
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1405:          {D:"Suelo urbano 100%",S:100,II:98.0,III:+cnII_to_III(98).toFixed(2)},
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1406:          {D:`Mixta (${siPct}% imp.)`,S:siPct,II:+cnII_post,III:+cnIII_post},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1407:          {D:"Natural (pastizales)",S:0,II:86,III:93.5},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1408:        ]} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1409:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1410:      <Card title="Clasificación SAR — Tabla 1 y 2" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1423:          ["Duración lluvia",`${durH} h`],["Distribución",distType.replace("_"," ")],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1424:          ["P total diseño",`${hiet.Ptotal} mm`],["Método HU POST",metodoPost],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1425:          ["CN post (CNIII)",`${cnIII_post} (SI=${siPct}%)`],["CN pre (CNIII)","93.5"],
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1426:          ["Q pico POST",`${qPost.Qpico.toFixed(4)} m³/s`],["Q pico PRE (reg.)",`${qPre.Qpico.toFixed(4)} m³/s`],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1427:          ["Reducción pico",`${reduccion}%`],["V almacenamiento",`${volSAR.volTotal.toFixed(0)} m³`],
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1428:        ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1429:          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.border}15`,fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1430:            <span style={{color:C.muted}}>{l}</span>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1441:          const rPost=lluvPost[idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPost[lluvPost.length-1];
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1442:          const rPre =lluvPre [idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPre [lluvPre.length-1];
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1443:          return{t:r.t,T:r.tPct,P:r.pAcum,dP:r.pIncrem,i:r.iBloque,
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1444:            PePost:rPost?.Pe||0,PePre:rPre?.Pe||0};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1445:        })}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1446:        hiCols={[3,4]} accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1447:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1448:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1449:    {/* Nota técnica */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1450:    <div style={{background:`${C.teal}08`,border:`1px solid ${C.teal}20`,borderRadius:10,padding:"11px 15px",fontFamily:mono,fontSize:9,color:C.muted,lineHeight:1.7}}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1451:      <span style={{color:C.teal,fontWeight:700}}>Notas metodológicas GT-AS-004: </span>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1452:      § 3.4 Pérdidas: Método SCS-CN · Condición humedad AMC III · §3.5 HU SCS: lag time=60%·Tc · §3.8 Volumen excedente=∫(Qpost−Qpre)dt · §3.9 Caudal regulado=Qpico(pre) · Distribución temporal: Primer Cuartil (Gallego et al., 2024) · Curvas Huff: Distribuciones Illinois-ISWS (probabilidad 50%)
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1453:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1454:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1455:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1456:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1459:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1460:function ModRacional({params,est,name}){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1461:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1462:  const tc_min=useMemo(()=>tcList.reduce((s,r)=>s+r.min,0)/(tcList.length||1),[tcList]);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1463:  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1464:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1465:    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1466:    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1467:      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1468:      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1469:      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1470:    </div>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1471:    <Card title="Caudales Racionales — Todos los Tr" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1494:// Fuente: imagen Excel proporcionada + enriquecimiento SIATA
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1495:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1496:const ESTACIONES_SIATA=[
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1497:  {codigo:"2701034",nombre:"MAZO",                lat:6.25702778,lon:-75.50166667,alt:2480,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:78.4,I60_obs:55.2,epm_key:"MAZO"},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1498:  {codigo:"2701035",nombre:"CHORRILLOS",           lat:6.29672222,lon:-75.5033889, alt:2370,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:72.1,I60_obs:50.8,epm_key:"CHORRILLOS"},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1499:  {codigo:"2701036",nombre:"CALDAS",               lat:6.05300000,lon:-75.62775000,alt:1930,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:65.3,I60_obs:46.1,epm_key:"CALDAS"},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1500:  {codigo:"2701037",nombre:"FABRICATO",            lat:6.36188883,lon:-75.60018886,alt:2422,red:"EPM-SIATA",vars:["P","T","HR","N.Cauce"],   estado:"Activa",      I30_obs:88.5,I60_obs:62.3,epm_key:"FABRICATO"},
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1533:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1534:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1535:function calcIDW(ests,latC,lonC,p=2){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1536:  const rows=ests.map(e=>({...e,d:distKm(latC,lonC,e.lat,e.lon)}));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1537:  const w=rows.map(e=>1/Math.pow(Math.max(e.d,0.1),p));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1538:  const wT=w.reduce((s,x)=>s+x,0);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1539:  return rows.map((e,i)=>({...e,dist:+e.d.toFixed(3),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1540:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1541:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1542:function calcThiessen(ests,latC,lonC){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1543:  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1544:  const dMx=Math.max(...d),dMn=Math.min(...d);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1545:  const w=d.map(v=>1-(v-dMn)/(dMx-dMn+0.001));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1546:  const wT=w.reduce((s,x)=>s+x,0);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1547:  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1548:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1549:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1550:function calcAltitudinal(ests,altC,latC,lonC){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1551:  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1552:  const dA=ests.map(e=>Math.abs(e.alt-altC));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1553:  const dAMx=Math.max(...dA)+1;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1554:  const w=ests.map((e,i)=>(1-dA[i]/dAMx)*0.5+(1/Math.pow(Math.max(d[i],0.1),1.5))*0.5);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1555:  const wT=w.reduce((s,x)=>s+x,0);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1556:  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),dAlt:+dA[i].toFixed(0),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1557:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1558:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1559:function calcCompuesto(ests,latC,lonC,altC){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1560:  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1561:  const dA=ests.map(e=>Math.abs(e.alt-altC));
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1562:  const iObs=ests.map(e=>e.I30_obs||60);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1563:  const norm=arr=>{const mx=Math.max(...arr),mn=Math.min(...arr);return arr.map(v=>(v-mn)/(mx-mn+0.001));};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1564:  const wD=norm(d).map(v=>1-v);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1565:  const wA=norm(dA).map(v=>1-v);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1573:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1574:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1575:function calcIDFPond(ests,d_min,Tr){
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1576:  const con=ests.filter(e=>e.epm_key&&ESTACIONES_EPM[e.epm_key]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1577:  if(!con.length) return 0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1578:  const wT=con.reduce((s,e)=>s+e.peso,0);
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1579:  return wT>0?con.reduce((s,e)=>s+idfI(ESTACIONES_EPM[e.epm_key],d_min,Tr)*e.peso,0)/wT:0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1580:}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1581:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1582:// ─── SVG MAPA AMVA ────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1583:function MapaAMVA({ests,cLat,cLon,selIdx,onSel,showLabels=true}){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1620:        strokeDasharray={pct<4?"3 5":undefined}/>);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1621:    })}
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1622:    {/* Estaciones */}
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1623:    {ests.map((e,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1624:      const[ex,ey]=toXY(e.lat,e.lon);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1625:      const pct=e.pct||0;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1626:      const sel=i===selIdx;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1662:function ModInfluencia({params}){
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1663:  const[method,setMethod]=useState("compuesto");
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1664:  const[potIDW,setPotIDW]=useState(2);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1665:  const[selIdx,setSelIdx]=useState(0);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1666:  const[excl,setExcl]=useState(new Set());
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1667:  const[Tr,setTr]=useState(25);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1668:  const[dMin,setDMin]=useState(30);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1669:  const[showLabels,setShowLabels]=useState(true);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1670:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1671:  // Punto de salida → fuente única de verdad para selección de estaciones
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1672:  const cLat=+params.lat_salida||6.185;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1673:  const cLon=+params.lon_salida||-75.660;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1674:  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1675:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1676:  const activos=useMemo(()=>ESTACIONES_SIATA.filter((_,i)=>!excl.has(i)),[excl]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1677:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1678:  const pond=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1679:    if(method==="idw")      return calcIDW(activos,cLat,cLon,potIDW);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1680:    if(method==="thiessen") return calcThiessen(activos,cLat,cLon);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1684:
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1685:  // Mapear a lista completa (excluidas = pct 0)
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1686:  const pesosMap=useMemo(()=>ESTACIONES_SIATA.map((_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1687:    if(excl.has(i)) return{pct:0,peso:0};
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1688:    const e=activos.find(a=>a.codigo===ESTACIONES_SIATA[i].codigo);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1689:    const r=e?pond.find(p=>p.codigo===e.codigo):null;
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1690:    return r?{pct:r.pct,peso:r.peso}:{pct:0,peso:0};
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1691:  }),[pond,activos,excl]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1692:
> 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1693:  const estsConPeso=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>({...e,...pesosMap[i]})),[pesosMap]);
  01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1694:  const dominante=pond[0];


## 5. Valores reales esperados desde PRÁCTICA-002B

```text
nombre_cuenca = Iguana
area_km2 = 46.851602999999642
perimetro_km = 47.590000000022350
longitud_cauce_km = 15.524027406751557
longitud_perfil_km = 15.515000000000818
longitud_red_km = 127.128278741639463
densidad_drenaje_km_km2 = 2.713424314246845
cota_salida_msnm = 1511.358032226562500
cota_cabecera_msnm = 2819.270507812500000
desnivel_m = 1307.912475585937500
pendiente_media_pct = 8.429986951890871
kc_compacidad = 1.946755941500344
kf_forma = 0.194634979985145
n_tramos_qc = 4
n_quiebres = 3
```

## 6. Criterio de decisión

Si los valores reales ya están alineados en runtime, OT-0051 no debe modificar motor. Si hay diferencias o hardcodes incompletos, se propondrá un adaptador mínimo.

## 7. Estado Git final

?? 00_ADMIN/bitacora/OT-0051/
