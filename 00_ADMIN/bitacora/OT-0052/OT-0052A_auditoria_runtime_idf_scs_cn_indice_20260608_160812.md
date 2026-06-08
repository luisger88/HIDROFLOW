# OT-0052A — Auditoría runtime IDF, SCS-CN y distribución temporal en Índice Hidrológico

Fecha: 06/08/2026 16:08:12
Rama: ot-0052-alineacion-runtime-idf-scs-cn-indice

## 1. Hallazgo visual

Después de OT-0051, el Índice Hidrológico muestra correctamente área, pendiente, Tr activo, C racional y Q racional. Permanecen incompletos IDF, estaciones operativas, distribución temporal, S, Ia e impermeabilidad.

## 2. Cableado vivo de contexto en layout


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


## 3. Publicación de contexto desde HidroFlow.jsx


  01_APP\HIDROFLOW\src\HidroFlow.jsx:28:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:29:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:30:  calcCNdinamico,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:31:  derivarAMCDesdeSIATA,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:32:  calcLluviaEfectiva,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:33:  calcTc,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:34:  mapTcResultados,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:35:  cnMixto,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:36:  cnII_to_III
  01_APP\HIDROFLOW\src\HidroFlow.jsx:37:} from "./services/hidroEngine";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:38:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:39:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:40:// HIDROFLOW v3.1 — Arquitectura Senior · GT-AS-004 · EPM 2025 · SIATA
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:41:// Motor: Clark IUH · W&H · Snyder · SCS Mod. · Huff · Convolución completa
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:42:// Módulos: Ponderación estaciones (IDW/Thiessen/Altitudinal/Compuesto) + SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:43:// Exportación: PDF (html2canvas+jsPDF) · Excel (SheetJS)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:44:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:45:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:46:// ─── PALETA Y CONSTANTES ─────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:47:const C = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:48:  bg:"#07090F", panel:"#0B0F1A", card:"#0F1624",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:49:  border:"#18253A", border2:"#1F2F45",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:50:  accent:"#00C8FF",  accent2:"#00F5A0",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:59:const sans="'IBM Plex Sans',system-ui,sans-serif";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:60:const TT={background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:11,fontFamily:mono};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:61:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:62:// ─── ESTACIONES EPM 2025 ──────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:63:const ESTACIONES_EPM = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:64:  "AYURA":              {codigo:"2701093",lat:6.16569444,lon:-75.56591667,alt:1750,fuente:"PDF",params:{"2.33":{k:45.2947,n:0.9370,c:0.4},"5":{k:54.8433,n:0.9612,c:0.4},"10":{k:62.6277,n:0.9763,c:0.4},"25":{k:72.4701,n:0.9914,c:0.4},"50":{k:79.7758,n:1.0005,c:0.4},"100":{k:87.0304,n:1.0082,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:65:  "CALDAS":             {codigo:"2701036",lat:6.05300000,lon:-75.62775000,alt:1930,fuente:"PDF",params:{"2.33":{k:55.1908,n:0.9454,c:0.4},"5":{k:63.5724,n:0.9302,c:0.4},"10":{k:70.3848,n:0.9207,c:0.4},"25":{k:78.9803,n:0.9113,c:0.4},"50":{k:85.3502,n:0.9056,c:0.4},"100":{k:91.6695,n:0.9007,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:66:  "CHORRILLOS":         {codigo:"——",lat:6.270,lon:-75.590,alt:1900,fuente:"PDF",params:{"2.33":{k:51.4450,n:0.9544,c:0.4},"5":{k:59.8108,n:0.9572,c:0.4},"10":{k:66.6249,n:0.9591,c:0.4},"25":{k:75.2346,n:0.9611,c:0.4},"50":{k:81.6221,n:0.9624,c:0.4},"100":{k:87.9625,n:0.9634,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:67:  "FABRICATO":          {codigo:"2701037",lat:6.36188883,lon:-75.60018886,alt:2422,fuente:"PDF",params:{"2.33":{k:53.5837,n:0.9169,c:0.4},"5":{k:65.5265,n:0.9126,c:0.4},"10":{k:75.2345,n:0.9100,c:0.4},"25":{k:87.4850,n:0.9075,c:0.4},"50":{k:96.5654,n:0.9060,c:0.4},"100":{k:105.5740,n:0.9048,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:68:  "LA FE PANTANILLO":   {codigo:"——",lat:6.120,lon:-75.480,alt:2160,fuente:"PDF",params:{"2.33":{k:59.6585,n:0.9200,c:0.4},"5":{k:74.6544,n:0.8890,c:0.4},"10":{k:86.8003,n:0.8724,c:0.4},"25":{k:102.1002,n:0.8575,c:0.4},"50":{k:113.4298,n:0.8493,c:0.4},"100":{k:124.6638,n:0.8426,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:69:  "MACARENA":           {codigo:"——",lat:6.240,lon:-75.580,alt:1560,fuente:"PDF",params:{"2.33":{k:42.9075,n:0.9375,c:0.4},"5":{k:50.4677,n:0.9511,c:0.4},"10":{k:56.6358,n:0.9599,c:0.4},"25":{k:64.4390,n:0.9690,c:0.4},"50":{k:70.2337,n:0.9746,c:0.4},"100":{k:75.9893,n:0.9794,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:70:  "MAZO":               {codigo:"2701034",lat:6.25702778,lon:-75.50166667,alt:2480,fuente:"PDF",params:{"2.33":{k:50.3668,n:0.9348,c:0.4},"5":{k:58.7672,n:0.9217,c:0.4},"10":{k:65.6019,n:0.9137,c:0.4},"25":{k:74.2314,n:0.9059,c:0.4},"50":{k:80.6304,n:0.9012,c:0.4},"100":{k:86.9798,n:0.8972,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:71:  "MEDELLIN":           {codigo:"2701517",lat:6.25296809,lon:-75.56863300,alt:1491,fuente:"PDF",params:{"2.33":{k:46.4859,n:0.9644,c:0.4},"5":{k:55.1623,n:0.9767,c:0.4},"10":{k:62.2186,n:0.9843,c:0.4},"25":{k:71.1259,n:0.9918,c:0.4},"50":{k:77.7297,n:0.9962,c:0.4},"100":{k:84.2820,n:1.0000,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:83:  "GERONA":             {codigo:"2701485",lat:6.23338889,lon:-75.55375000,alt:1649,fuente:"REF",params:{"2.33":{k:46.0,n:0.940,c:0.4},"5":{k:53.5,n:0.940,c:0.4},"10":{k:59.5,n:0.940,c:0.4},"25":{k:67.0,n:0.940,c:0.4},"50":{k:72.0,n:0.940,c:0.4},"100":{k:75.0,n:0.940,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:84:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:85:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:86:// ─── MOTOR IDF ────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:87:function idfI(est,d_min,Tr){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:88:  const d_h=d_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:89:  const keys=Object.keys(est.params).map(Number).sort((a,b)=>a-b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:90:  if(est.params[String(Tr)]){const{k,n,c}=est.params[String(Tr)];return k/Math.pow(c+d_h,n);}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:91:  const lo=keys.filter(t=>t<=Tr).pop()||keys[0];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:92:  const hi=keys.filter(t=>t>=Tr)[0]||keys[keys.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:93:  if(lo===hi){const{k,n,c}=est.params[String(lo)];return k/Math.pow(c+d_h,n);}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:94:  const{k:k1,n:n1,c:c1}=est.params[String(lo)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:95:  const{k:k2,n:n2,c:c2}=est.params[String(hi)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:109:// Ec.2 polinomio — GT-AS-004
  01_APP\HIDROFLOW\src\HidroFlow.jsx:110:function distPolyQ1(T){return 3.820399e-8*T**5-1.104784e-5*T**4+1.278006e-3*T**3-7.958462e-2*T**2+3.400981*T;}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:111:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:112:// ─── CURVAS HUFF (Quartiles I-IV) ─────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:113:// Curvas Huff estándar (Illinois, USA) adaptadas — probabilidad 50%
  01_APP\HIDROFLOW\src\HidroFlow.jsx:114:// Q1: lluvia concentrada en primer 25% del tiempo (convectiva)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:115:// Q2: lluvia concentrada 25-50% del tiempo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:116:// Q3: lluvia concentrada 50-75% del tiempo  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:117:// Q4: lluvia distribuida en último 25% del tiempo (frontal)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:118:const HUFF_DATA = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:119:  Q1: [{T:0,P:0},{T:5,P:16.0},{T:10,P:33.0},{T:15,P:43.0},{T:20,P:52.0},{T:25,P:60.0},{T:30,P:66.0},{T:35,P:71.0},{T:40,P:75.5},{T:45,P:79.5},{T:50,P:83.0},{T:55,P:86.0},{T:60,P:88.5},{T:65,P:90.5},{T:70,P:92.5},{T:75,P:94.0},{T:80,P:95.5},{T:85,P:96.8},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:120:  Q2: [{T:0,P:0},{T:5,P:5.0},{T:10,P:10.0},{T:15,P:15.5},{T:20,P:21.5},{T:25,P:28.0},{T:30,P:38.0},{T:35,P:48.0},{T:40,P:57.0},{T:45,P:65.0},{T:50,P:72.0},{T:55,P:78.0},{T:60,P:83.0},{T:65,P:87.0},{T:70,P:90.5},{T:75,P:93.0},{T:80,P:95.0},{T:85,P:96.7},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:121:  Q3: [{T:0,P:0},{T:5,P:4.0},{T:10,P:7.5},{T:15,P:11.5},{T:20,P:15.5},{T:25,P:19.5},{T:30,P:24.5},{T:35,P:30.0},{T:40,P:37.0},{T:45,P:46.0},{T:50,P:56.0},{T:55,P:64.0},{T:60,P:71.0},{T:65,P:77.5},{T:70,P:83.0},{T:75,P:87.0},{T:80,P:91.0},{T:85,P:93.5},{T:90,P:95.5},{T:95,P:97.5},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:122:  Q4: [{T:0,P:0},{T:5,P:3.0},{T:10,P:5.5},{T:15,P:8.5},{T:20,P:11.5},{T:25,P:14.5},{T:30,P:18.0},{T:35,P:22.0},{T:40,P:26.5},{T:45,P:31.0},{T:50,P:36.5},{T:55,P:43.5},{T:60,P:52.0},{T:65,P:61.0},{T:70,P:70.5},{T:75,P:78.0},{T:80,P:84.5},{T:85,P:89.5},{T:90,P:93.5},{T:95,P:97.0},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:123:};
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:124:// Unificar datos Huff en tabla comparativa
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:125:const HUFF_MERGED = DIST_TEMPORAL_Q1.map((r,i)=>({
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:138:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:139:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:140:// ─── GENERACIÓN DE HIETOGRAMA ─────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:141:// Método: Distribución temporal adimensional (GT-AS-004 §3.3 o Huff)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:142:// Retorna: {data:[{t,tPct,pAcum,pIncrem,iBloque}], Ptotal}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:143:function calcHietograma(est, Tr, dur_h, dt_min, distType="EPM_Q1"){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:144:  const Ptotal = idfI(est, dur_h*60, Tr) * dur_h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:145:  const steps  = Math.round(dur_h*60/dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:146:  const distTable = distType==="EPM_Q1" ? DIST_TEMPORAL_Q1
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:147:    : distType==="Huff_Q1" ? HUFF_DATA.Q1
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:148:    : distType==="Huff_Q2" ? HUFF_DATA.Q2
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:149:    : distType==="Huff_Q3" ? HUFF_DATA.Q3
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:150:    : HUFF_DATA.Q4;
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:165:// ─── CN & PÉRDIDAS SCS ────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:166:// ── CN dinámico real (castellano) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:167:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:168:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:169:// ─── CONVOLUCIÓN NUMÉRICA COMPLETA ───────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:170:// Convolución discreta: Q(t) = Σ Pe(j)·UH(t-j)  ← núcleo del motor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:330:function calcRacional(est,area,tc_min,CN){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:  const S=25400/CN-254,Ia=0.2*S;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:332:  return TR_LIST.map(Tr=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:333:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:334:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:335:    const Cc=P>0?Math.min(Pe/P,1):0.3;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:336:    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:337:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:338:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:339:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:340:function buildResumenQ(params, est, dtMin, CNact) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:341:  const tcList = calcTc(params).filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:350:  return metodos.map(m => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:351:    const row = { metodo: m.nombre };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:352:    TR_LIST.forEach(Tr => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:353:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
  01_APP\HIDROFLOW\src\HidroFlow.jsx:354:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:355:      const HU   = m.make();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:356:      const H    = calcHidroCompleto(Pe, HU, dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:357:      row[Tr]    = +H.Qpico.toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:358:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:359:    return row;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:360:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:361:}
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:393:  WX.utils.book_append_sheet(wb,ws1,"Parámetros");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:394:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:395:  // Hoja 2: Hietograma
  01_APP\HIDROFLOW\src\HidroFlow.jsx:396:  if(datos.hiet){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:397:    const rows=[["t (min)","T (%)","P acum (mm)","P increm (mm)","i bloque (mm/h)"]];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:398:    datos.hiet.data.forEach(r=>rows.push([r.t,r.tPct,r.pAcum,r.pIncrem||0,r.iBloque||0]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:399:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hietograma");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:552:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:553:function StationSel({sel,onSel}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:554:  const[open,setOpen]=useState(false);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:555:  const e=ESTACIONES_EPM[sel];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:556:  const pdfN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="PDF").length;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:557:  const refN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="REF").length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:558:  return(<div style={{position:"relative",zIndex:300}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:559:    <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:9,background:C.card,border:`1px solid ${open?C.accent:C.border}`,borderRadius:10,padding:"6px 12px",cursor:"pointer",color:C.text,fontFamily:sans,fontSize:12,transition:"all .2s",minWidth:240}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:560:      <div style={{width:7,height:7,borderRadius:"50%",background:e.fuente==="PDF"?C.accent2:C.gold,flexShrink:0}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:561:      <div style={{flex:1,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:562:        <div style={{fontSize:11,fontWeight:700}}>{sel}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:563:        <div style={{fontSize:9,color:C.muted,fontFamily:mono}}>{e.alt} msnm · {e.fuente==="PDF"?"✓ PDF":"~ Ref"}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:564:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:565:      <span style={{color:C.muted,fontSize:9}}>{open?"▲":"▼"}</span>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:584:// Mini mapa SVG que muestra el punto de salida en contexto del Valle de Aburrá
  01_APP\HIDROFLOW\src\HidroFlow.jsx:585:// Se embebe dentro de la card Punto de Salida en ModParams
  01_APP\HIDROFLOW\src\HidroFlow.jsx:586:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:587:function OutletMiniMap({ lat, lon, alt, idf }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:588:  const W = 480;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:589:  const H = 165;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:590:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:591:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:592:  // 1. Estaciones EPM disponibles para contexto geográfico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:593:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:594:  const ests = Object.entries(ESTACIONES_EPM).map(([n, e]) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:595:    n,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:596:    lat: e.lat,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:597:    lon: e.lon,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:598:    alt: e.alt
  01_APP\HIDROFLOW\src\HidroFlow.jsx:599:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:600:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:601:  // Tres estaciones más cercanas al punto de salida.
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:602:  // Estas estaciones son referencia geográfica, no IDF adoptada.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:603:  const cercanas = [...ests]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:604:    .sort(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:605:      (a, b) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:606:        distKm(lat, lon, a.lat, a.lon) -
  01_APP\HIDROFLOW\src\HidroFlow.jsx:607:        distKm(lat, lon, b.lat, b.lon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:608:    )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:609:    .slice(0, 3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:610:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:611:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:612:  // 2. Estación IDF adoptada desde cuencasCatalogo.js
  01_APP\HIDROFLOW\src\HidroFlow.jsx:613:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:614:  const idfAdoptadaNombre =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:615:    idf?.estacion_nombre ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:616:    idf?.estacion_id?.replaceAll("_", " ") ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:617:    "SAN CRISTOBAL";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:618:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:619:  const idfAdoptadaLabel =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:620:    idf?.estacion_label ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:621:    idf?.estacion_nombre ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:622:    "San Cristóbal";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:623:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:624:  const idfMetodo =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:625:    idf?.metodo_adoptado ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:626:    "EPM";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:627:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:628:  const estacionIDF =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:629:    ESTACIONES_EPM[idfAdoptadaNombre] ||
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:630:    ESTACIONES_EPM["SAN CRISTOBAL"];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:631:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:632:  const puntoIDF = estacionIDF
  01_APP\HIDROFLOW\src\HidroFlow.jsx:633:    ? {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:634:        n: idfAdoptadaLabel,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:635:        lat: estacionIDF.lat,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:636:        lon: estacionIDF.lon,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:637:        alt: estacionIDF.alt,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:638:        dist: distKm(lat, lon, estacionIDF.lat, estacionIDF.lon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:639:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:640:    : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:641:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:642:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:643:  // 3. Dominio del mini-mapa
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:644:  // Incluye PC_80, estaciones cercanas y estación IDF adoptada.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:645:  // Esto evita que todo quede apeñuscado.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:646:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:647:  const puntosMapa = [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:648:    {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:649:      n: "PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:650:      lat,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:651:      lon,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:652:      alt,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:656:      ...e,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:657:      tipo: "cercana"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:658:    })),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:659:    ...(puntoIDF
  01_APP\HIDROFLOW\src\HidroFlow.jsx:660:      ? [
  01_APP\HIDROFLOW\src\HidroFlow.jsx:661:          {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:662:            ...puntoIDF,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:663:            tipo: "idf"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:664:          }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:665:        ]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:666:      : [])
  01_APP\HIDROFLOW\src\HidroFlow.jsx:667:  ].filter(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:668:    (p) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:669:      Number.isFinite(p.lat) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:670:      Number.isFinite(p.lon)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:671:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:692:  const yMap = (la) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:693:    `${100 - ((la - lat0) / (lat1 - lat0)) * 100}%`;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:694:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:695:  // Línea conceptual PC_80 ↔ IDF adoptada
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:696:  const lineaIDF = puntoIDF
  01_APP\HIDROFLOW\src\HidroFlow.jsx:697:    ? {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:698:        x1: xMap(lon),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:699:        y1: yMap(lat),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:700:        x2: xMap(puntoIDF.lon),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:701:        y2: yMap(puntoIDF.lat)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:702:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:703:    : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:704:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:705:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:706:  // 4. Render
  01_APP\HIDROFLOW\src\HidroFlow.jsx:707:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:708:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:709:    <div style={{ marginTop: 12 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:736:              border: "1px solid rgba(255,209,102,0.38)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:737:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:738:          >
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:739:            ◆ IDF adoptada: {idfAdoptadaLabel} · Método {idfMetodo}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:740:          </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:741:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:742:          {puntoIDF && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:743:            <span
  01_APP\HIDROFLOW\src\HidroFlow.jsx:744:              style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:745:                color: C.muted2,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:746:                fontWeight: 700,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:747:                padding: "3px 7px",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:748:                borderRadius: 999,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:749:                background: "rgba(120,160,210,0.08)",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:750:                border: "1px solid rgba(120,160,210,0.18)"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:751:              }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:752:            >
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:753:              Distancia IDF–PC_80: {puntoIDF.dist.toFixed(1)} km
  01_APP\HIDROFLOW\src\HidroFlow.jsx:754:            </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:755:          )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:756:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:757:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:758:        <div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:759:          style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:760:            display: "flex",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:761:            flexWrap: "wrap",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:769:              fontWeight: 700
  01_APP\HIDROFLOW\src\HidroFlow.jsx:770:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:771:          >
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:772:            Referencia geográfica — estaciones cercanas:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:773:          </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:774:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:775:          {cercanas.map((e) => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:776:            <span
  01_APP\HIDROFLOW\src\HidroFlow.jsx:777:              key={`chip-${e.n}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:778:              style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:779:                padding: "2px 7px",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:780:                borderRadius: 999,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:916:  Occidente del Río Medellín · Subcuenca La Iguaná PC_80
  01_APP\HIDROFLOW\src\HidroFlow.jsx:917:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:918:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:919:        {/* Línea IDF–PC_80 desactivada.
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:920:    La relación IDF es pluviométrica, no una conexión hidráulica.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:921:    Se evita sugerir cruce físico del Río Medellín. */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:922:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:923:        {/* Estaciones cercanas: referencia geográfica */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:924:        {cercanas.map((e) => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:925:          <div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:926:            key={`cercana-${e.n}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:927:            title={`${e.n} · ${distKm(lat, lon, e.lat, e.lon).toFixed(1)} km`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:928:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:929:              position: "absolute",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:930:              left: xMap(e.lon),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:931:              top: yMap(e.lat),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:947:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:948:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:949:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:950:        {/* Estación IDF adoptada: San Cristóbal */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:951:        {puntoIDF && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:952:          <>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:953:            <div
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:954:              title={`${puntoIDF.n} · IDF adoptada · ${puntoIDF.dist.toFixed(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:955:                1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:956:              )} km`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:957:              style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:958:                position: "absolute",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:959:                left: "27%",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:960:                top: "47%",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:961:                width: 18,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:962:                height: 18,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:988:                padding: "2px 7px"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:989:              }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:990:            >
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:991:              SAN CRISTÓBAL · IDF
  01_APP\HIDROFLOW\src\HidroFlow.jsx:992:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:993:          </>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:994:        )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:995:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:996:        {/* Punto de control / salida PC_80 */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:997:        <>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:998:          <div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:999:            title={`PC_80 · salida · ${lat.toFixed(6)}, ${lon.toFixed(6)}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1093:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1094:        <span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1095:          <span style={{ color: "#ffd166", fontWeight: 900 }}>◆</span>{" "}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1096:          IDF adoptada
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1097:        </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1098:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1099:        <span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1100:          <span style={{ color: "rgba(105,145,190,0.85)", fontWeight: 900 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1101:            ●
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1102:          </span>{" "}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1103:          estaciones cercanas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1104:        </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1105:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1106:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1107:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1108:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1109:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1110:// ───────────────────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1111:// Subcomponente: Card "Condición de Humedad (AMC) y Urbanización"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1112:// (versión con hooks por named import: useState/useEffect/useCallback)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1113:// ───────────────────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1114:function AMCPanel({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1115:  // Normalizaciones (evitan NaN/undefined)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1116:  const amcSel = params?.amcActual ?? "II";
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1117:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:    ? params.porcentajeImpermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    : 60; // ← unifica default con ModHidrogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1120:  const cnBase = Number.isFinite(params?.cnBase)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1121:    ? params.cnBase
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1152:                  type="button"  // evita submit si hay <form> ancestro
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1180:            type="range" min={0} max={100} step={1}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1181:            value={pctLive}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1182:            onChange={e => setPctLive(+e.target.value)}               // solo UI mientras arrastras
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1183:            onPointerUp={() => commitPct(pctLive)}                    // commit al soltar (touch/pen)
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1199:            type="number" min={30} max={98} step={0.1}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1201:            onChange={e => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1202:              const v = +e.target.value;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1203:              setParams(prev => ({ ...prev, cnBase: v }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1204:              if (import.meta.env.DEV) console.log("[AMC]", "cnBase ->", v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1205:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1206:            style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1207:              width: '100%', padding: 8, borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1208:              border: '1px solid #1F2F45', background: '#0B0F1A', color: '#D8E4F0'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1209:            }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1210:            aria-label="CN II base"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1211:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1212:          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1274:              <div>Lat: <span style={{ color: C.text }}>{(+params.lat_salida || 0).toFixed(6)}°</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1275:              <div>Lon: <span style={{ color: C.text }}>{(+params.lon_salida || 0).toFixed(6)}°</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1276:              <div>Alt: <span style={{ color: C.text }}>{+params.alt_salida || 0} msnm</span></div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1277:              <div style={{ marginTop: 4, color: C.muted2, fontSize: 7.5 }}>Usado en: Influencia · SIATA · IDF ponderada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1278:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1279:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1280:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1281:          {/* Mini‑mapa del outlet (asegura numeric cast con +) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1282:          <OutletMiniMap
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1283:            lat={+params.lat_salida || 6.185083}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1284:            lon={+params.lon_salida || -75.659972}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1285:            alt={+params.alt_salida || 1702}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1286:            idf={params.idf}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1287:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1288:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1289:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1290:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1291:        {/* Geometría */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1292:        <Card title="Geometría" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1293:          <Field label="Área"            value={params.area}            onChange={set("area")}            unit="km²" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1294:          <Field label="Perímetro"       value={params.perimetro}       onChange={set("perimetro")}       unit="km" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1307:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1308:      {/* ⬆️ Cierre del grid de Morfometría — PUNTO DE INSERCIÓN CORRECTO */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1309:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1310:      {/* ── Card AMC y Urbanización (subcomponente) ────────────────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1311:      <AMCPanel params={params} setParams={setParams} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1312:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1313:      {/* ── KPIs de forma, compacidad, pendiente y Tc promedio ─────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1314:      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1315:        {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1316:          { v: (params.perimetro / (2 * Math.sqrt(Math.PI * params.area))).toFixed(3),   l: "Índice Gravelius", s: "Kc", a: C.accent },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1317:          { v: ((params.longitud_cuenca ** 2) / params.area).toFixed(3),                 l: "Índice de Forma", s: "Rf", a: C.accent2 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1318:          { v: (params.area / (params.longitud_cuenca ** 2)).toFixed(4),                 l: "Coef. Compacidad", s: "Cc", a: C.accent3 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1319:          { v: ((params.cota_max - params.cota_min) / (params.longitud_cauce * 1000) * 1000).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1342:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1343:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1344:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1345:// MÓDULO IDF — Curvas Intensidad-Duración-Frecuencia
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1346:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1347:function ModIDF({est,name}){
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1359:  // Comparativa 20 estaciones a d=30min, Tr=100a
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1360:  const compData=useMemo(()=>Object.entries(ESTACIONES_EPM).map(([n,e])=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1361:    est:n.length>12?n.substring(0,12)+"…":n,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1362:    I100:+idfI(e,30,100).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1363:    fuente:e.fuente,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1364:  })).sort((a,b)=>b.I100-a.I100),[]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1365:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1366:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1367:    <SectionHeader icon="⌁" title="Curvas IDF — 20 Estaciones EPM 2025" sub={`I = k/(c+d)ⁿ · d en horas · c = 0.4 · Gumbel · 2000–2023`} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1368:    <div style={{background:`${C.accent2}08`,border:`1px solid ${C.accent2}20`,borderRadius:10,padding:"10px 15px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1369:      <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1370:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.08em"}}>Estación activa · {est.fuente==="PDF"?"✓ Calibrada PDF EPM 5/11/2024":"~ Referencia estimada"}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1371:        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>{name}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1372:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1373:      <div style={{display:"flex",gap:8,flexWrap:"wrap",fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1374:        {[["Código",est.codigo],["Lat.",est.lat.toFixed(5)],["Lon.",est.lon.toFixed(5)],["Alt.",est.alt+" msnm"],["Fuente",est.fuente]].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1375:          <div key={l} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"4px 10px"}}>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1389:            <Legend wrapperStyle={{fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1390:            {TR_LIST.map((T,i)=><Line key={T} type="monotone" dataKey={`Tr${T}`} stroke={CC[i]} strokeWidth={1.8} dot={false} name={`Tr=${T}a`}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1391:          </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1392:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1393:      </Card>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1394:      <Card title="Tabla IDF — Intensidades (mm/h)" accent={C.accent3}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1395:        <Tbl headers={["d(min)",...TR_LIST.map(T=>`Tr=${T}a`)]} rows={idfData.map(r=>({d:r.d,...Object.fromEntries(TR_LIST.map(T=>[T,r[`Tr${T}`]]))}))} hiCols={[6]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1396:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1397:    </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1398:    <Card title="Comparativa 20 Estaciones — I(d=30min, Tr=100a)" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1399:      <ResponsiveContainer width="100%" height={220}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1400:        <BarChart data={compData} margin={{left:0,right:14,top:8,bottom:44}} layout="vertical">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1401:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1402:          <XAxis type="number" tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",position:"insideBottom",offset:-8,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1403:          <YAxis type="category" dataKey="est" tick={{fill:C.muted,fontSize:8}} width={90}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1404:          <Tooltip contentStyle={TT} formatter={v=>[v+" mm/h","I"]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1405:          <Bar dataKey="I100" radius={[0,3,3,0]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1406:            fill={C.accent3}
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1421:// MÓDULO HIETOGRAMAS — Distribución temporal + Curvas Huff
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1422:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1423:function ModHietogramas({ est, name, params, setParams }) {
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1441:    return types.map(tp => ({ tp, data: calcHietograma(est, Tr, durH, dtMin, tp) }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1442:  }, [est, Tr, durH, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1443:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1444:  // === Día 3 (MVP) — Orquestación P → Pn → UH → Q(t) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1445:  // Vector de incrementos (mm por bloque) y Δt
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1446:  const P_mm  = hiet.data.map((r, i, a) => (i === 0 ? 0 : +(r.pAcum - a[i - 1].pAcum).toFixed(5)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1447:  const dt_min = dtMin;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1448:  const A_km2  = Number.isFinite(params?.area) ? params.area : 36.58;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1477:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1478:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1479:    tcWarning: tcBajo || tcAlto,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1480:    amcWarning: !params?.amcFuente,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1481:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1482:    // En Hidrología no hay persistencia ni override de UI
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1499:  const CN_panel        = Number.isFinite(params?.cnBase) ? params.cnBase : (params.CN ?? 75);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1500:  const AMC_panel       = params?.amcActual ?? "II"; // "I" | "II" | "III"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1501:  const pctImperv_panel = Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1502:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1503:  // Override SCS‑CN (para análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1504:  const [overrideSCS, setOverrideSCS] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1505:  const [CN_ovr, setCN_ovr]          = useState(CN_panel);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1506:  const [AMC_ovr, setAMC_ovr]        = useState(AMC_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1507:  const [pctImp_ovr, setPctImp_ovr]  = useState(pctImperv_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1508:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1509:  // Valores efectivos (panel u override)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1510:  const CN        = overrideSCS ? CN_ovr     : CN_panel;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1511:  const AMC       = overrideSCS ? AMC_ovr    : AMC_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1512:  const pctImperv = overrideSCS ? pctImp_ovr : pctImperv_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1513:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1514:  // Chequeos amables de rango (usa '-' ASCII para evitar tofu en monospace)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1515:  const scsAviso = [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1516:  if (CN < 30 || CN > 98) scsAviso.push("CN fuera de 30-98");
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1642:      <SectionHeader
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1643:        icon="🌧"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1644:        title="Hietogramas de Diseño — Distribución Temporal"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1645:        sub="GT-AS-004 §3.3 · Curvas Huff · 5 distribuciones comparadas"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1646:        accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1647:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1648:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1649:      {/* Controles */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1650:      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1651:        <Card title="Período de Retorno" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1652:          <BtnGroup options={TR_LIST.map(t => ({ v: t, l: `${t}a` }))} value={Tr} onChange={setTr} accent={C.gold} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1653:        </Card>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1674:      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1675:        <Kpi value={hiet.Ptotal + " mm"} label="P total" accent={C.accent} sub={`Tr=${Tr}a`} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1680:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1681:        <Kpi value={(hiet.Ptotal * 0.75).toFixed(1) + " mm"} label="P en 1er quartil" accent={C.accent2} sub="~75% en primeros 25%" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1682:        <Kpi value={`${durH}h · ${dtMin}' · ${hiet.steps}bloq`} label="Configuración" accent={C.muted2} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1683:        <Kpi value={distType.replace("_", " ")} label="Distribución" accent={distType === "EPM_Q1" ? C.accent2 : C.gold} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1684:        <Kpi value={name.length > 12 ? name.substring(0, 12) + "…" : name} label="Estación IDF" accent={C.accent4} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1685:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1686:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1687:      {/* Hietograma de diseño + Parámetros SCS‑CN */}
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1712:              <input type="checkbox" checked={overrideSCS} onChange={e => setOverrideSCS(e.target.checked)} /> Override SCS‑CN (análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1713:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1714:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1715:              <input type="checkbox" checked={usarAMCauto} onChange={e => setUsarAMCauto(e.target.checked)} /> AMC automático (SIATA)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1716:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1717:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1718:              <input type="checkbox" checked={usarOverrideTc} onChange={e => setUsarOverrideTc(e.target.checked)} /> Override Tc
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1719:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1720:            <label style={{ fontFamily:'monospace', fontSize:11, color:C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1721:              <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1722:               type="checkbox"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1723:               checked={guardarAMCenPanel}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1724:               onChange={e => setGuardarAMCenPanel(e.target.checked)}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1725:             /> Guardar AMC auto en panel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1726:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1727:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1728:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1729:          {/* Solo‑lectura u.Override */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1730:          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1731:            {/* CN */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1732:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1733:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>CN (CNII)</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1742:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1743:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1744:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1745:            {/* AMC */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1746:            <div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1747:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>AMC</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1748:              {overrideSCS ? (
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1766:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1767:                <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1768:                  type="number" min={0} max={100} step={1} value={pctImp_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1769:                  onChange={e => setPctImp_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1770:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1771:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1772:              ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1773:                <Kpi value={`${pctImperv}%`} label="% Imperv" accent={C.accent} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1799:          <div style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 11, color: scsAviso.length ? C.rose : C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1800:            {infoTc}{scsAviso.length ? ` · Aviso: ${scsAviso.join(" · ")}` : ""}
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1818:        pctImperv={pctImperv}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1819:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1820:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1821:      {/* Distribuciones temporales comparadas */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1822:      <Card title="Distribuciones Temporales Comparadas — Adimensional" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1823:        <div ref={refContenedorDistribuciones} style={{ width: "100%", height: 260 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1824:          <ResponsiveContainer width="100%" height="100%">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1825:            <LineChart data={distMerge} margin={{ left: 0, right: 14, bottom: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1830:                     label={{ value: "P acum (%)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1831:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(1) + "%"]} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1832:              <Legend wrapperStyle={{ fontSize: 9 }} />
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1845:            className="btn"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1862:                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1863:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(2) + " mm/h"]} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1864:              <Legend wrapperStyle={{ fontSize: 9 }} />
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1877:            className="btn"
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1911:  // ── Controles superiores
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1912:  const [Tr, setTr]       = useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1913:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1914:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1915:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1916:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1917:  // ── CN efectivo (CNact) con default coherente a la UI (60 % imperv.)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1918:  const CNact = useMemo(() => calcCNdinamico({
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1919:    amcActual: params.amcActual ?? "II",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1920:    porcentajeImpermeable: params.porcentajeImpermeable ?? 60,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1921:    cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1922:  }), [params.amcActual, params.porcentajeImpermeable, params.cnBase, params.CN]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1923:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1924:  // Verificación temporal (quitar cuando termines la prueba)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1925:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1926:    if (import.meta.env.DEV) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1927:      console.log('[HIDRO]', 'CNact ->', CNact, {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1928:        amc: params.amcActual,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1929:        pImp: params.porcentajeImpermeable,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1930:        cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75)
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1953:  const L_mi     = params.longitud_cauce * 0.621371;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1954:  const S_m_km   = (params.cota_mayor_cauce - params.cota_menor_cauce) / params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1955:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1956:  // ── Hietograma (Tr, 3 h de evento, dtMin, EPM_Q1)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1957:  const hiet = useMemo(() => calcHietograma(est, Tr, 3, dtMin, "EPM_Q1"), [est, Tr, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1958:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1959:  // ── Lluvia efectiva con CN efectivo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1960:  const lluvEfect = useMemo(() => calcLluviaEfectiva(hiet, CNact), [hiet, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1961:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1962:  // ── Unidades Hidrológicas (5 métodos)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1963:  const hu_scs    = useMemo(() => calcHUSCS(params.area, tc_h, dtMin), [params.area, tc_h, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1964:  const hu_scsMod = useMemo(() => calcHUSCS_Mod(params.area, tc_h, dtMin, CpSCSMod), [params.area, tc_h, dtMin, CpSCSMod]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1965:  const hu_snyder = useMemo(() => calcHUSnyder(area_mi2, L_mi, L_mi * 0.35, dtMin, Ct, Cp), [area_mi2, L_mi, dtMin, Ct, Cp]);
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1985:    "Clark IUH",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1986:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2176:    volumen: h?.volTotal
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2177:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2178:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2179:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2203:  // En Hidrología solo observamos estados, no persistimos ni override
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2221:     DEBUG TEMPORAL: inspeccionar etiquetas de método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2355:        }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2356:          CN base: {Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75)}
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2389:         <div>• Comparador: pendiente · referencia especializada</div>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2401:         <span className="bg-orange-600 px-2 rounded text-black">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2402:           Tc MANUAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2403:         </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2404:       )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2405:     </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2456:  useEffect(()=>{ if(params.dt&&+params.dt!==dtMin) setDtMin(+params.dt); },[params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2457:  const [siPct,setSiPct]=useState(80);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2458:  const [catSAR,setCatSAR]=useState("Intermedios");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2459:  const [distType,setDistType]=useState("EPM_Q1");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2460:  const [metodoPost,setMetodoPost]=useState("SCS");
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2471:  const lluvPost=useMemo(()=>calcLluviaEfectiva(hiet,cnIII_post),[hiet,cnIII_post]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2472:  const lluvPre =useMemo(()=>calcLluviaEfectiva(hiet,cnIII_pre),[hiet]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2473:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2474:  // Tc Témez para la cuenca
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2475:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2476:  const tc_h=tcList[0]?.h||0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2477:  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2478:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2498:    nombre_cuenca:params.nombre_cuenca,area:params.area,perimetro:params.perimetro,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2499:    longitud_cauce:params.longitud_cauce,pendiente_cuenca:params.pendiente_cuenca,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2500:    cota_max:params.cota_max,cota_min:params.cota_min,CN:params.CN,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2501:    tc_h,stn:name,Tr,dur_h:durH,distType,dt_min:dtMin,Ptotal:hiet.Ptotal,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2502:    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2503:    hiet,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2504:    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2505:    volSAR,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2506:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2507:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2508:  return(<div style={{display:"flex",flexDirection:"column",gap:14}} ref={reportRef}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2509:    {/* Banner normativo */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2538:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2539:      <Card title="Dist. temporal" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2540:        <BtnGroup options={[
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2541:          {v:"EPM_Q1",l:"EPM"},{v:"Huff_Q1",l:"H.Q1"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2542:          {v:"Huff_Q2",l:"H.Q2"},{v:"Huff_Q3",l:"H.Q3"},{v:"Huff_Q4",l:"H.Q4"}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2543:        ]} value={distType} onChange={setDistType} accent={C.teal}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2544:      </Card>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2545:      <Card title="% Sup. Impermeable" accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2546:        <BtnGroup options={[20,40,60,80,100].map(s=>({v:s,l:`${s}%`}))} value={siPct} onChange={setSiPct} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2547:        <div style={{marginTop:6,fontSize:9,color:C.muted,fontFamily:mono}}>CNIII post={cnIII_post}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2548:        <div style={{marginTop:2,fontSize:9,color:C.muted,fontFamily:mono}}>Método:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2549:        <BtnGroup options={[{v:"SCS",l:"SCS"},{v:"Clark",l:"Clark"},{v:"Snyder",l:"Snyder"},{v:"WH",l:"W&H"}]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2550:          value={metodoPost} onChange={setMetodoPost} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2551:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2552:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2553:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2565:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2566:    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2567:      {/* Hietograma de diseño */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2568:      <Card title={`Hietograma SAR — ${distType} · Tr=${Tr}a · d=${durH}h`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2569:        <ResponsiveContainer width="100%" height={230}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2570:          <ComposedChart data={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/50))===0)} margin={{left:0,right:8,bottom:14,top:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2571:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2572:            <XAxis dataKey="t" tick={{fill:C.muted,fontSize:8}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2573:            <YAxis yAxisId="i" tick={{fill:C.muted,fontSize:8}} label={{value:"i (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2574:            <YAxis yAxisId="p" orientation="right" tick={{fill:C.muted,fontSize:8}} label={{value:"P (mm)",angle:90,position:"insideRight",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2575:            <Tooltip contentStyle={TT}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2576:            <Bar yAxisId="i" dataKey="iBloque" fill={C.accent} radius={[2,2,0,0]} name="i (mm/h)" opacity={0.8}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2580:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2581:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2582:      {/* Distribución temporal adimensional */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2583:      <Card title="Distribución Temporal Activa + Comparativa Huff" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2584:        <ResponsiveContainer width="100%" height={230}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2585:          <LineChart data={HUFF_MERGED} margin={{left:0,right:14,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2586:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2587:            <XAxis dataKey="T" tick={{fill:C.muted,fontSize:9}} label={{value:"Tiempo (%)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2588:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"P (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2589:            <Tooltip contentStyle={TT} formatter={v=>[v?.toFixed(1)+"%"]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2590:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2591:            <Line type="monotone" dataKey="EPM_Q1" stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2592:            <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q1"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2593:            <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q2"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2594:            <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3} strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q3"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2595:            <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4} strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q4"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2596:          </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2597:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2598:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2599:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2600:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2601:    {/* Hidrogramas POST vs PRE */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2602:    <Card title={`Hidrogramas SAR — POST (${metodoPost}, CN=${cnIII_post}) vs PRE (SCS, CN=${cnIII_pre}) · V_SAR=${volSAR.volTotal.toFixed(0)} m³`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2603:      <ResponsiveContainer width="100%" height={290}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2642:      <Card title="Resumen SAR — GT-AS-004 §3" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2643:        {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2644:          ["Categoría SAR",catSAR],["Tr de diseño",`${Tr} años`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2645:          ["Duración lluvia",`${durH} h`],["Distribución",distType.replace("_"," ")],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2646:          ["P total diseño",`${hiet.Ptotal} mm`],["Método HU POST",metodoPost],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2647:          ["CN post (CNIII)",`${cnIII_post} (SI=${siPct}%)`],["CN pre (CNIII)","93.5"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2648:          ["Q pico POST",`${qPost.Qpico.toFixed(4)} m³/s`],["Q pico PRE (reg.)",`${qPre.Qpico.toFixed(4)} m³/s`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2649:          ["Reducción pico",`${reduccion}%`],["V almacenamiento",`${volSAR.volTotal.toFixed(0)} m³`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2650:        ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2651:          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.border}15`,fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2652:            <span style={{color:C.muted}}>{l}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2653:            <span style={{color:C.text,fontWeight:600}}>{v}</span>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2682:function ModRacional({params,est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2715:// DATOS SIATA — Red hidrometeorológica AMVA (Excel + catálogo oficial)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2716:// Fuente: imagen Excel proporcionada + enriquecimiento SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2717:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2718:const ESTACIONES_SIATA=[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2719:  {codigo:"2701034",nombre:"MAZO",                lat:6.25702778,lon:-75.50166667,alt:2480,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:78.4,I60_obs:55.2,epm_key:"MAZO"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2720:  {codigo:"2701035",nombre:"CHORRILLOS",           lat:6.29672222,lon:-75.5033889, alt:2370,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:72.1,I60_obs:50.8,epm_key:"CHORRILLOS"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2721:  {codigo:"2701036",nombre:"CALDAS",               lat:6.05300000,lon:-75.62775000,alt:1930,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:65.3,I60_obs:46.1,epm_key:"CALDAS"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2722:  {codigo:"2701037",nombre:"FABRICATO",            lat:6.36188883,lon:-75.60018886,alt:2422,red:"EPM-SIATA",vars:["P","T","HR","N.Cauce"],   estado:"Activa",      I30_obs:88.5,I60_obs:62.3,epm_key:"FABRICATO"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2723:  {codigo:"2701038",nombre:"SAN ANTONIO DE PRADO", lat:6.18508333,lon:-75.65997222,alt:2000,red:"EPM-SIATA",vars:["P","T","HR","HumSuelo"], estado:"Activa",      I30_obs:70.2,I60_obs:49.4,epm_key:"SAN ANTONIO DE PRADO"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2724:  {codigo:"2701045",nombre:"VILLA HERMOSA PLANTA", lat:6.25697222,lon:-75.54752778,alt:1690,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:58.7,I60_obs:41.2,epm_key:"VILLA HERMOSA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2725:  {codigo:"2701046",nombre:"SAN CRISTOBAL",        lat:6.28138889,lon:-75.63627778,alt:1890,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:67.9,I60_obs:47.8,epm_key:"SAN CRISTOBAL"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2726:  {codigo:"2701053",nombre:"ALTO SAN ANDRES",      lat:6.42943954,lon:-75.43994360,alt:2240,red:"SIATA",    vars:["P","T"],                  estado:"Mantenimiento",I30_obs:74.3,I60_obs:52.1,epm_key:null},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2794:  })).sort((a,b)=>b.score-a.score).map((e,j)=>({...e,rank:j+1,dominante:j===0}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2795:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2796:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2797:function calcIDFPond(ests,d_min,Tr){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2798:  const con=ests.filter(e=>e.epm_key&&ESTACIONES_EPM[e.epm_key]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2799:  if(!con.length) return 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2800:  const wT=con.reduce((s,e)=>s+e.peso,0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2801:  return wT>0?con.reduce((s,e)=>s+idfI(ESTACIONES_EPM[e.epm_key],d_min,Tr)*e.peso,0)/wT:0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2802:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2803:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2804:// ─── SVG MAPA AMVA ────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2805:function MapaAMVA({ests,cLat,cLon,selIdx,onSel,showLabels=true}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2806:  const W=500,H=400;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2807:  const LAT_MIN=5.93,LAT_MAX=6.52,LON_MIN=-75.82,LON_MAX=-75.33;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2808:  const toXY=(lat,lon)=>[(lon-LON_MIN)/(LON_MAX-LON_MIN)*W,(1-(lat-LAT_MIN)/(LAT_MAX-LAT_MIN))*H];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2809:  const[cx,cy]=toXY(cLat,cLon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2841:        strokeWidth={Math.max(0.3,pct/maxPct*2.2)} opacity={Math.max(0.08,pct/maxPct*0.6)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2842:        strokeDasharray={pct<4?"3 5":undefined}/>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2843:    })}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2844:    {/* Estaciones */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2845:    {ests.map((e,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2846:      const[ex,ey]=toXY(e.lat,e.lon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2847:      const pct=e.pct||0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2848:      const sel=i===selIdx;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2849:      const col=e.estado==="Activa"?(i===0?C.teal:pct>12?C.accent2:pct>5?C.accent:C.muted2):C.rose;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2850:      const r=sel?9:Math.max(3.5,pct/maxPct*9);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2851:      return(<g key={i} style={{cursor:"pointer"}} onClick={()=>onSel(i)}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2852:        {sel&&<circle cx={ex} cy={ey} r={r+5} fill="none" stroke={col} strokeWidth={1.5} opacity={0.45}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2890:  const[dMin,setDMin]=useState(30);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2891:  const[showLabels,setShowLabels]=useState(true);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2892:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2893:  // Punto de salida → fuente única de verdad para selección de estaciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2894:  const cLat=+params.lat_salida||6.185;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2895:  const cLon=+params.lon_salida||-75.660;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2896:  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2897:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2898:  const activos=useMemo(()=>ESTACIONES_SIATA.filter((_,i)=>!excl.has(i)),[excl]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2899:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2900:  const pond=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2901:    if(method==="idw")      return calcIDW(activos,cLat,cLon,potIDW);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2902:    if(method==="thiessen") return calcThiessen(activos,cLat,cLon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2903:    if(method==="alt")      return calcAltitudinal(activos,cAlt,cLat,cLon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2904:    return calcCompuesto(activos,cLat,cLon,cAlt);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2905:  },[activos,method,potIDW,cLat,cLon,cAlt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2906:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2907:  // Mapear a lista completa (excluidas = pct 0)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2908:  const pesosMap=useMemo(()=>ESTACIONES_SIATA.map((_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2909:    if(excl.has(i)) return{pct:0,peso:0};
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2910:    const e=activos.find(a=>a.codigo===ESTACIONES_SIATA[i].codigo);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2911:    const r=e?pond.find(p=>p.codigo===e.codigo):null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2912:    return r?{pct:r.pct,peso:r.peso}:{pct:0,peso:0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2913:  }),[pond,activos,excl]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2914:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2915:  const estsConPeso=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>({...e,...pesosMap[i]})),[pesosMap]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2916:const idfPond=useMemo(()=>calcIDFPond(pond,dMin,Tr),[pond,dMin,Tr]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2917:  const idfDom=dominante?.epm_key&&ESTACIONES_EPM[dominante.epm_key]?idfI(ESTACIONES_EPM[dominante.epm_key],dMin,Tr):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2918:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2919:  // Análisis de escenarios: impacto de eliminar cada estación
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2920:  const escenarios=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>{


## 4. Consumo en IndiceHidrologico.jsx


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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:47:    AMC = "II",
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:651:          <span style={estilos.label}>AMC</span>
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:689:          <span style={estilos.chip}>AMC/SIATA</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:690:          <span style={estilos.chip}>S · Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:691:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:692:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:693:        <button style={estiloBoton("hidrogramas")} onClick={() => goToTab("hidro")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:694:          Ver lluvia efectiva Pe(t)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:695:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:696:      </section>


## 5. Valores visuales esperados

```text
CN base esperado: 88
CN efectivo esperado: 88
AMC esperado: II
S, Ia e impermeabilidad no deben aparecer como — si el motor los tiene disponibles.
IDF y estaciones no deben aparecer como — si existe contexto de estación SAN CRISTOBAL y método IDF operativo.
Distribución temporal no debe aparecer como — si el motor usa EPM/Huff o curva activa.
```

## 6. Estado Git final

?? 00_ADMIN/bitacora/OT-0052/

## 7. Radar vivo posterior a validación visual

Observación Senior posterior a OT-0051:

```text
El Índice Hidrológico ya muestra correctamente área, pendiente, Tr activo, C racional y Q racional después de OT-0051.
Sin embargo, persiste una brecha de reactividad y publicación de contexto:
1. La caja Cuenca activa / geometría validada solo se activa de forma completa al reiniciar localhost.
2. Al cambiar estación IDF, el Índice no refleja dinámicamente resultados asociados.
3. Permanecen pendientes en el panel lateral: método IDF adoptado, estaciones operativas, curva temporal, S, Ia e impermeabilidad.
4. La vista central sí evidencia estación seleccionada y contexto IDF, por lo que la brecha probable está en publicación/consumo reactivo hacia IndiceHidrologico.
```

Decisión:

```text
No se corrige en caliente sin auditoría adicional.
OT-0052 queda como frente vivo de arquitectura/desarrollo para alinear reactividad IDF, SCS-CN y distribución temporal en el Índice.
La siguiente acción debe auditar el cambio de estación, la propagación de estado y las dependencias de publicación hacia contextoComparador.
```

