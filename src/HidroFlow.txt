
// ═══════════════════════════════════════════════════════════════════════════════
// HIDROFLOW v3.1 — Arquitectura Senior · GT-AS-004 · EPM 2025 · SIATA
// Motor: Clark IUH · W&H · Snyder · SCS Mod. · Huff · Convolución completa
// Módulos: Ponderación estaciones (IDW/Thiessen/Altitudinal/Compuesto) + SIATA
// Exportación: PDF (html2canvas+jsPDF) · Excel (SheetJS)
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, ComposedChart, ScatterChart, Scatter, Cell,
} from "recharts";
import HidrogramaResultado from "./components/HidrogramaResultado";

// ─── PALETA Y CONSTANTES ─────────────────────────────────────────────────────
const C = {
  bg:"#07090F", panel:"#0B0F1A", card:"#0F1624",
  border:"#18253A", border2:"#1F2F45",
  accent:"#00C8FF",  accent2:"#00F5A0",
  accent3:"#FF5E3A", accent4:"#9B59FF",
  gold:"#F5C518",    rose:"#FF3D7F",
  teal:"#0ECFBB",    lime:"#7CFC00",
  text:"#D8E4F0",    muted:"#48607E",  muted2:"#7A94B2",
};
const CC=[C.accent,C.accent2,C.accent3,C.accent4,C.gold,C.rose,C.teal,C.lime,"#38BDF8","#FB923C","#34D399","#F472B6","#60A5FA","#FBBF24","#A3E635","#E879F9","#22D3EE","#FB7185","#818CF8","#4ADE80"];
const TR_LIST=[2.33,5,10,25,50,100];
const mono="'DM Mono','Fira Code',monospace";
const sans="'IBM Plex Sans',system-ui,sans-serif";
const TT={background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,color:C.text,fontSize:11,fontFamily:mono};

// ─── ESTACIONES EPM 2025 ──────────────────────────────────────────────────────
const ESTACIONES_EPM = {
  "AYURA":              {codigo:"2701093",lat:6.16569444,lon:-75.56591667,alt:1750,fuente:"PDF",params:{"2.33":{k:45.2947,n:0.9370,c:0.4},"5":{k:54.8433,n:0.9612,c:0.4},"10":{k:62.6277,n:0.9763,c:0.4},"25":{k:72.4701,n:0.9914,c:0.4},"50":{k:79.7758,n:1.0005,c:0.4},"100":{k:87.0304,n:1.0082,c:0.4}}},
  "CALDAS":             {codigo:"2701036",lat:6.05300000,lon:-75.62775000,alt:1930,fuente:"PDF",params:{"2.33":{k:55.1908,n:0.9454,c:0.4},"5":{k:63.5724,n:0.9302,c:0.4},"10":{k:70.3848,n:0.9207,c:0.4},"25":{k:78.9803,n:0.9113,c:0.4},"50":{k:85.3502,n:0.9056,c:0.4},"100":{k:91.6695,n:0.9007,c:0.4}}},
  "CHORRILLOS":         {codigo:"——",lat:6.270,lon:-75.590,alt:1900,fuente:"PDF",params:{"2.33":{k:51.4450,n:0.9544,c:0.4},"5":{k:59.8108,n:0.9572,c:0.4},"10":{k:66.6249,n:0.9591,c:0.4},"25":{k:75.2346,n:0.9611,c:0.4},"50":{k:81.6221,n:0.9624,c:0.4},"100":{k:87.9625,n:0.9634,c:0.4}}},
  "FABRICATO":          {codigo:"2701037",lat:6.36188883,lon:-75.60018886,alt:2422,fuente:"PDF",params:{"2.33":{k:53.5837,n:0.9169,c:0.4},"5":{k:65.5265,n:0.9126,c:0.4},"10":{k:75.2345,n:0.9100,c:0.4},"25":{k:87.4850,n:0.9075,c:0.4},"50":{k:96.5654,n:0.9060,c:0.4},"100":{k:105.5740,n:0.9048,c:0.4}}},
  "LA FE PANTANILLO":   {codigo:"——",lat:6.120,lon:-75.480,alt:2160,fuente:"PDF",params:{"2.33":{k:59.6585,n:0.9200,c:0.4},"5":{k:74.6544,n:0.8890,c:0.4},"10":{k:86.8003,n:0.8724,c:0.4},"25":{k:102.1002,n:0.8575,c:0.4},"50":{k:113.4298,n:0.8493,c:0.4},"100":{k:124.6638,n:0.8426,c:0.4}}},
  "MACARENA":           {codigo:"——",lat:6.240,lon:-75.580,alt:1560,fuente:"PDF",params:{"2.33":{k:42.9075,n:0.9375,c:0.4},"5":{k:50.4677,n:0.9511,c:0.4},"10":{k:56.6358,n:0.9599,c:0.4},"25":{k:64.4390,n:0.9690,c:0.4},"50":{k:70.2337,n:0.9746,c:0.4},"100":{k:75.9893,n:0.9794,c:0.4}}},
  "MAZO":               {codigo:"2701034",lat:6.25702778,lon:-75.50166667,alt:2480,fuente:"PDF",params:{"2.33":{k:50.3668,n:0.9348,c:0.4},"5":{k:58.7672,n:0.9217,c:0.4},"10":{k:65.6019,n:0.9137,c:0.4},"25":{k:74.2314,n:0.9059,c:0.4},"50":{k:80.6304,n:0.9012,c:0.4},"100":{k:86.9798,n:0.8972,c:0.4}}},
  "MEDELLIN":           {codigo:"2701517",lat:6.25296809,lon:-75.56863300,alt:1491,fuente:"PDF",params:{"2.33":{k:46.4859,n:0.9644,c:0.4},"5":{k:55.1623,n:0.9767,c:0.4},"10":{k:62.2186,n:0.9843,c:0.4},"25":{k:71.1259,n:0.9918,c:0.4},"50":{k:77.7297,n:0.9962,c:0.4},"100":{k:84.2820,n:1.0000,c:0.4}}},
  "PALMAS":             {codigo:"——",lat:6.160,lon:-75.500,alt:2450,fuente:"PDF",params:{"2.33":{k:54.6168,n:0.9451,c:0.4},"5":{k:67.7088,n:0.9687,c:0.4},"10":{k:78.3823,n:0.9828,c:0.4},"25":{k:91.8790,n:0.9965,c:0.4},"50":{k:101.8968,n:1.0046,c:0.4},"100":{k:111.8448,n:1.0113,c:0.4}}},
  "SAN ANDRES":         {codigo:"2701056",lat:6.37361111,lon:-75.44808333,alt:1350,fuente:"PDF",params:{"2.33":{k:50.8286,n:0.8765,c:0.4},"5":{k:61.0429,n:0.8568,c:0.4},"10":{k:69.3246,n:0.8452,c:0.4},"25":{k:79.7593,n:0.8341,c:0.4},"50":{k:87.4859,n:0.8277,c:0.4},"100":{k:95.1470,n:0.8224,c:0.4}}},
  "SAN ANTONIO DE PRADO":{codigo:"2701038",lat:6.18508333,lon:-75.65997222,alt:2000,fuente:"PDF",params:{"2.33":{k:54.0898,n:0.9012,c:0.4},"5":{k:63.3234,n:0.8946,c:0.4},"10":{k:70.8343,n:0.8905,c:0.4},"25":{k:80.3161,n:0.8864,c:0.4},"50":{k:87.3459,n:0.8840,c:0.4},"100":{k:94.3211,n:0.8819,c:0.4}}},
  "SAN CRISTOBAL":      {codigo:"2701046",lat:6.28138889,lon:-75.63627778,alt:1890,fuente:"PDF",params:{"2.33":{k:53.8109,n:0.9272,c:0.4},"5":{k:62.6125,n:0.9396,c:0.4},"10":{k:69.7680,n:0.9476,c:0.4},"25":{k:78.7968,n:0.9556,c:0.4},"50":{k:85.4885,n:0.9606,c:0.4},"100":{k:92.1268,n:0.9648,c:0.4}}},
  "VASCONIA":           {codigo:"——",lat:6.310,lon:-75.560,alt:1520,fuente:"PDF",params:{"2.33":{k:57.5136,n:0.9119,c:0.4},"5":{k:68.9288,n:0.8969,c:0.4},"10":{k:78.2177,n:0.8881,c:0.4},"25":{k:89.9474,n:0.8797,c:0.4},"50":{k:98.6460,n:0.8748,c:0.4},"100":{k:107.2780,n:0.8708,c:0.4}}},
  "VILLA HERMOSA":      {codigo:"2701045",lat:6.25697222,lon:-75.54752778,alt:1690,fuente:"PDF",params:{"2.33":{k:44.7082,n:0.9447,c:0.4},"5":{k:51.3948,n:0.9485,c:0.4},"10":{k:56.8290,n:0.9509,c:0.4},"25":{k:63.6847,n:0.9533,c:0.4},"50":{k:68.7650,n:0.9548,c:0.4},"100":{k:73.8041,n:0.9560,c:0.4}}},
  "NIQUIA":             {codigo:"2701076",lat:6.34627778,lon:-75.54586111,alt:1439,fuente:"REF",params:{"2.33":{k:52.08,n:0.938,c:0.4},"5":{k:60.70,n:0.948,c:0.4},"10":{k:67.74,n:0.955,c:0.4},"25":{k:76.62,n:0.961,c:0.4},"50":{k:83.22,n:0.966,c:0.4},"100":{k:89.77,n:0.969,c:0.4}}},
  "CUCARACHO":          {codigo:"2701114",lat:6.28380556,lon:-75.60791667,alt:1830,fuente:"REF",params:{"2.33":{k:53.17,n:0.938,c:0.4},"5":{k:62.57,n:0.947,c:0.4},"10":{k:70.20,n:0.953,c:0.4},"25":{k:79.82,n:0.959,c:0.4},"50":{k:86.95,n:0.963,c:0.4},"100":{k:94.01,n:0.965,c:0.4}}},
  "ASTILLERO":          {codigo:"2701115",lat:6.24908333,lon:-75.68061111,alt:2420,fuente:"REF",params:{"2.33":{k:57.02,n:0.910,c:0.4},"5":{k:65.14,n:0.898,c:0.4},"10":{k:71.73,n:0.890,c:0.4},"25":{k:80.03,n:0.882,c:0.4},"50":{k:86.18,n:0.877,c:0.4},"100":{k:92.27,n:0.873,c:0.4}}},
  "COPACABANA":         {codigo:"2701122",lat:6.33661111,lon:-75.51086111,alt:1580,fuente:"REF",params:{"2.33":{k:45.83,n:0.921,c:0.4},"5":{k:52.77,n:0.917,c:0.4},"10":{k:58.43,n:0.914,c:0.4},"25":{k:65.57,n:0.911,c:0.4},"50":{k:70.87,n:0.909,c:0.4},"100":{k:76.13,n:0.908,c:0.4}}},
  "PEDREGAL":           {codigo:"2701481",lat:6.30494444,lon:-75.57422222,alt:1622,fuente:"REF",params:{"2.33":{k:44.00,n:0.927,c:0.4},"5":{k:55.58,n:0.936,c:0.4},"10":{k:65.02,n:0.942,c:0.4},"25":{k:76.93,n:0.947,c:0.4},"50":{k:85.77,n:0.950,c:0.4},"100":{k:94.54,n:0.952,c:0.4}}},
  "GERONA":             {codigo:"2701485",lat:6.23338889,lon:-75.55375000,alt:1649,fuente:"REF",params:{"2.33":{k:46.0,n:0.940,c:0.4},"5":{k:53.5,n:0.940,c:0.4},"10":{k:59.5,n:0.940,c:0.4},"25":{k:67.0,n:0.940,c:0.4},"50":{k:72.0,n:0.940,c:0.4},"100":{k:75.0,n:0.940,c:0.4}}},
};

// ─── MOTOR IDF ────────────────────────────────────────────────────────────────
function idfI(est,d_min,Tr){
  const d_h=d_min/60;
  const keys=Object.keys(est.params).map(Number).sort((a,b)=>a-b);
  if(est.params[String(Tr)]){const{k,n,c}=est.params[String(Tr)];return k/Math.pow(c+d_h,n);}
  const lo=keys.filter(t=>t<=Tr).pop()||keys[0];
  const hi=keys.filter(t=>t>=Tr)[0]||keys[keys.length-1];
  if(lo===hi){const{k,n,c}=est.params[String(lo)];return k/Math.pow(c+d_h,n);}
  const{k:k1,n:n1,c:c1}=est.params[String(lo)];
  const{k:k2,n:n2,c:c2}=est.params[String(hi)];
  const I1=k1/Math.pow(c1+d_h,n1),I2=k2/Math.pow(c2+d_h,n2);
  const f=(Math.log(Tr)-Math.log(lo))/(Math.log(hi)-Math.log(lo));
  return I1*Math.pow(I2/I1,f);
}

// ─── DISTRIBUCIÓN TEMPORAL GT-AS-004 §3.3 ────────────────────────────────────
// Tabla 4 — Primer Cuartil (Gallego et al., 2024)
const DIST_TEMPORAL_Q1 = [
  {T:0,P:0},{T:5,P:17.45},{T:10,P:26.64},{T:15,P:35.74},{T:20,P:44.18},
  {T:25,P:51.62},{T:30,P:57.39},{T:35,P:62.21},{T:40,P:66.35},{T:45,P:70.09},
  {T:50,P:73.57},{T:55,P:76.79},{T:60,P:79.86},{T:65,P:82.70},{T:70,P:85.36},
  {T:75,P:87.84},{T:80,P:90.11},{T:85,P:92.16},{T:90,P:93.90},{T:95,P:95.32},{T:100,P:100},
];
// Ec.2 polinomio — GT-AS-004
function distPolyQ1(T){return 3.820399e-8*T**5-1.104784e-5*T**4+1.278006e-3*T**3-7.958462e-2*T**2+3.400981*T;}

// ─── CURVAS HUFF (Quartiles I-IV) ─────────────────────────────────────────────
// Curvas Huff estándar (Illinois, USA) adaptadas — probabilidad 50%
// Q1: lluvia concentrada en primer 25% del tiempo (convectiva)
// Q2: lluvia concentrada 25-50% del tiempo
// Q3: lluvia concentrada 50-75% del tiempo  
// Q4: lluvia distribuida en último 25% del tiempo (frontal)
const HUFF_DATA = {
  Q1: [{T:0,P:0},{T:5,P:16.0},{T:10,P:33.0},{T:15,P:43.0},{T:20,P:52.0},{T:25,P:60.0},{T:30,P:66.0},{T:35,P:71.0},{T:40,P:75.5},{T:45,P:79.5},{T:50,P:83.0},{T:55,P:86.0},{T:60,P:88.5},{T:65,P:90.5},{T:70,P:92.5},{T:75,P:94.0},{T:80,P:95.5},{T:85,P:96.8},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  Q2: [{T:0,P:0},{T:5,P:5.0},{T:10,P:10.0},{T:15,P:15.5},{T:20,P:21.5},{T:25,P:28.0},{T:30,P:38.0},{T:35,P:48.0},{T:40,P:57.0},{T:45,P:65.0},{T:50,P:72.0},{T:55,P:78.0},{T:60,P:83.0},{T:65,P:87.0},{T:70,P:90.5},{T:75,P:93.0},{T:80,P:95.0},{T:85,P:96.7},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  Q3: [{T:0,P:0},{T:5,P:4.0},{T:10,P:7.5},{T:15,P:11.5},{T:20,P:15.5},{T:25,P:19.5},{T:30,P:24.5},{T:35,P:30.0},{T:40,P:37.0},{T:45,P:46.0},{T:50,P:56.0},{T:55,P:64.0},{T:60,P:71.0},{T:65,P:77.5},{T:70,P:83.0},{T:75,P:87.0},{T:80,P:91.0},{T:85,P:93.5},{T:90,P:95.5},{T:95,P:97.5},{T:100,P:100}],
  Q4: [{T:0,P:0},{T:5,P:3.0},{T:10,P:5.5},{T:15,P:8.5},{T:20,P:11.5},{T:25,P:14.5},{T:30,P:18.0},{T:35,P:22.0},{T:40,P:26.5},{T:45,P:31.0},{T:50,P:36.5},{T:55,P:43.5},{T:60,P:52.0},{T:65,P:61.0},{T:70,P:70.5},{T:75,P:78.0},{T:80,P:84.5},{T:85,P:89.5},{T:90,P:93.5},{T:95,P:97.0},{T:100,P:100}],
};
// Unificar datos Huff en tabla comparativa
const HUFF_MERGED = DIST_TEMPORAL_Q1.map((r,i)=>({
  T:r.T, EPM_Q1:r.P,
  Huff_Q1:HUFF_DATA.Q1[i]?.P, Huff_Q2:HUFF_DATA.Q2[i]?.P,
  Huff_Q3:HUFF_DATA.Q3[i]?.P, Huff_Q4:HUFF_DATA.Q4[i]?.P,
}));

// Interpolación lineal en tabla de distribución
function interpDist(table, tPct){
  if(tPct<=0) return 0; if(tPct>=100) return 100;
  const lo=table.filter(r=>r.T<=tPct).pop()||table[0];
  const hi=table.filter(r=>r.T>=tPct)[0]||table[table.length-1];
  if(lo.T===hi.T) return lo.P;
  return lo.P+(hi.P-lo.P)*(tPct-lo.T)/(hi.T-lo.T);
}

// ─── GENERACIÓN DE HIETOGRAMA ─────────────────────────────────────────────────
// Método: Distribución temporal adimensional (GT-AS-004 §3.3 o Huff)
// Retorna: {data:[{t,tPct,pAcum,pIncrem,iBloque}], Ptotal}
function calcHietograma(est, Tr, dur_h, dt_min, distType="EPM_Q1"){
  const Ptotal = idfI(est, dur_h*60, Tr) * dur_h;
  const steps  = Math.round(dur_h*60/dt_min);
  const distTable = distType==="EPM_Q1" ? DIST_TEMPORAL_Q1
    : distType==="Huff_Q1" ? HUFF_DATA.Q1
    : distType==="Huff_Q2" ? HUFF_DATA.Q2
    : distType==="Huff_Q3" ? HUFF_DATA.Q3
    : HUFF_DATA.Q4;
  const data=[];
  for(let i=0;i<=steps;i++){
    const tPct=(i/steps)*100;
    const pPct= distType==="EPM_Q1" ? distPolyQ1(tPct) : interpDist(distTable,tPct);
    data.push({t:+(i*dt_min).toFixed(1), tPct:+tPct.toFixed(1), pAcum:+(pPct/100*Ptotal).toFixed(3)});
  }
  for(let i=1;i<data.length;i++){
    data[i].pIncrem=+(data[i].pAcum-data[i-1].pAcum).toFixed(4);
    data[i].iBloque=+(data[i].pIncrem/(dt_min/60)).toFixed(3);
  }
  data[0].pIncrem=0; data[0].iBloque=0;
  return {data, Ptotal:+Ptotal.toFixed(2), steps, dur_h, dt_min, Tr, distType};
}

// ─── CN & PÉRDIDAS SCS ────────────────────────────────────────────────────────
// ── CN dinámico real (castellano) ─────────────────────────────────────────────
function cnIIaCNI(cnII){ return (cnII>0 ? (4.2*cnII)/(10+0.058*cnII) : cnII); }
function cnIIaCNIII(cnII){ return (cnII>0 ? (23*cnII)/(10+0.13*cnII) : cnII); }
function mezclaImpermeable(cnPermeable, porcentajeImp, cnImperv=98){
  const w = Math.max(0, Math.min(100, porcentajeImp))/100; 
  return cnPermeable*(1-w) + cnImperv*w;
}
function calcCNdinamico({ amcActual, porcentajeImpermeable, cnBase }){
  let cnPermeable_CNII = Number.isFinite(cnBase) ? +cnBase : 75;
  cnPermeable_CNII = Math.max(30, Math.min(98, cnPermeable_CNII));
  let cnAjustado = amcActual==="I" ? cnIIaCNI(cnPermeable_CNII)
                  : amcActual==="III" ? cnIIaCNIII(cnPermeable_CNII)
                  : cnPermeable_CNII; // AMC II
  const cnEfectivo = mezclaImpermeable(cnAjustado, porcentajeImpermeable, 98);
  return +Math.max(30, Math.min(98, cnEfectivo)).toFixed(1);
}
// Derivar AMC desde SIATA con informe contextualizado
function derivarAMCDesdeSIATA(humedadSuelo){
  const hs = Number.isFinite(humedadSuelo) ? +humedadSuelo : 0.35; // fallback
  const amcActual = hs < 0.25 ? "I" : hs > 0.45 ? "III" : "II";
  const informe = amcActual==="I"
    ? "El suelo está sequito. Absorbe más agua. Esperamos menos escorrentía."
    : amcActual==="II"
    ? "El suelo está normal. Ni muy seco ni saturado. Comportamiento intermedio."
    : "El suelo está mojadito/saturado. Absorbe menos. Aumenta la escorrentía.";
  const contexto = `HS≈${hs.toFixed(2)} → AMC ${amcActual}`;
  return { amcActual, amcFuente: "SIATA", amcInforme: `${contexto}. ${informe}` };
}
function cnMixto(SI){return 0.12*SI+86;}
function cnII_to_III(cnII){return 23*cnII/(10+0.13*cnII);}

// Lluvia efectiva Pe(t) acumulada — método SCS CN
function calcLluviaEfectiva(hiet, CN){
  const S=25400/CN-254, Ia=0.2*S;
  const rows=hiet.data.map(r=>{
    const P=r.pAcum;
    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
    return{...r, Pe:+Pe.toFixed(4), PeIncrem:0, S, Ia};
  });
  for(let i=1;i<rows.length;i++) rows[i].PeIncrem=+(rows[i].Pe-rows[i-1].Pe).toFixed(5);
  rows[0].PeIncrem=0;
  return rows;
}

// ─── CONVOLUCIÓN NUMÉRICA COMPLETA ───────────────────────────────────────────
// Convolución discreta: Q(t) = Σ Pe(j)·UH(t-j)  ← núcleo del motor
function convolucion(uh_ord, pe_list, dt_min){
  const nOut=pe_list.length+uh_ord.length+4;
  const Q=new Array(nOut).fill(0);
  pe_list.forEach((pe,j)=>uh_ord.forEach((u,k)=>{
    if(j+k<nOut) Q[j+k]+=pe*u;
  }));
  return Q.map((q,i)=>({t:+(i*dt_min).toFixed(2),Q:+Math.max(q,0).toFixed(6)}));
}

// ═══════════════════════════════════════════════════════════════════════════════
// HIDROGRAMAS UNITARIOS SINTÉTICOS — 4 MÉTODOS
// ═══════════════════════════════════════════════════════════════════════════════

// ① HU SCS (Chow et al., 1994 — GT-AS-004 §3.5)
function calcHUSCS(area, tc_h, dt_min){
  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h, qp=2.08*area/tp;
  const n=Math.ceil(2.67*tp/dh)+12;
  const uh=Array.from({length:n},(_,i)=>{
    const t=i*dh, tr=t/tp;
    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  });
  return{tp,qp,Tc:tc_h*60,uh,metadata:{nombre:"SCS",color:C.accent2}};
}

// ② HU SCS MODIFICADO — SCS con coeficiente de pico Cp variable
// Cp estándar=2.08; Cp modificado=(0.2083·A)/tp ajustado por morfología
function calcHUSCS_Mod(area, tc_h, dt_min, Cp=2.08){
  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h;
  const qp=Cp*area/tp;
  const n=Math.ceil(3.0*tp/dh)+12;
  const uh=Array.from({length:n},(_,i)=>{
    const t=i*dh, tr=t/tp;
    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
  });
  return{tp,qp,Tc:tc_h*60,uh,Cp,metadata:{nombre:"SCS Mod.",color:C.teal}};
}

// ③ HU SNYDER (Chow et al. 1994 — versión Ct/Cp configurable)
function calcHUSnyder(area_mi2, L_mi, Lca_mi, dt_min, Ct=2.0, Cp=0.62){
  const tlag=Ct*Math.pow(L_mi*Lca_mi,0.3);
  const tp=tlag+dt_min/60/2;
  const qp=(640*Cp*area_mi2)/tp;
  const W50=770/Math.pow(qp/area_mi2,1.08);
  const W75=440/Math.pow(qp/area_mi2,1.08);
  const n=Math.ceil(5*(tp+tlag)/(dt_min/60))+12;
  const uh=Array.from({length:n},(_,i)=>{
    const t=i*dt_min/60, tr=t/tp;
    return +(tr<=1?qp*Math.pow(tr,2.5):qp*Math.exp(-2.0*(tr-1))).toFixed(7);
  });
  return{tp,qp,tlag,W50,W75,Ct,Cp,uh,metadata:{nombre:"Snyder",color:C.accent3}};
}

// ④ HU WILLIAMS & HANN (Williams & Hann, 1973)
// Basado en: qp = 2.54·A^0.9·(S/1000)^0.5·CN^3/(Ia·A)  → simplificado
// Fórmula geomorfológica: qp=(A^m1·S^m2·CN^m3)·K_WH
function calcHUWilliamsHann(area, L_km, S_m_km, CN, dt_min){
  // Williams & Hann (1973): Tc = 0.1838·L^0.8·(S+1)^0.7 / (CN^0.35·S^0.5)
  const Ss = 25400/CN - 254;
  const tc_h = (0.1838*Math.pow(L_km,0.8)*Math.pow(Ss+1,0.7)) / (Math.pow(CN,0.35)*Math.pow(Math.max(S_m_km,0.01),0.5)) / 60;
  const tp = 0.5*(dt_min/60) + 0.6*tc_h;
  // Caudal pico Williams & Hann: qp = 2.083·A/tp · κ donde κ = 1.12 (calibración W&H)
  const kWH = 1.12;
  const qp  = kWH * 2.083 * area / tp;
  const n   = Math.ceil(2.8*tp/(dt_min/60))+12;
  const uh  = Array.from({length:n},(_,i)=>{
    const t=i*dt_min/60, tr=t/tp;
    return +(tr<=1?qp*Math.pow(tr,2.208):qp*Math.exp(-1.25*(tr-1))).toFixed(7);
  });
  return{tp,qp,tc_h,Tc:tc_h*60,Ss,uh,metadata:{nombre:"Williams & Hann",color:C.gold}};
}

// ④b CLARK IUH (Clark, 1945) — Hidrograma Unitario Instantáneo
// IUH de Clark: u(t) = qp·exp(-t/R) para t>tp, crecida lineal hasta tp
// Parámetros: tc (tiempo concentración), R (coef. almacenamiento cuenca)
// R = k_R * tc  (típico k_R = 0.5–2.0, default 1.2)
function calcClarkIUH(area, tc_h, dt_min, kR=1.2){
  const dh   = dt_min/60;
  const R    = kR * tc_h;  // coeficiente almacenamiento
  const qp   = 2.08*area/tc_h;  // caudal pico IUH
  const n    = Math.ceil((tc_h + 6*R)/dh) + 12;
  const uh   = Array.from({length:n},(_,i)=>{
    const t = i*dh;
    // Antes de tc: crecida lineal; después: recesión exponencial
    const u = t<=tc_h ? qp*(t/tc_h) : qp*Math.exp(-(t-tc_h)/R);
    return +Math.max(u,0).toFixed(7);
  });
  const tp   = tc_h;  // tiempo al pico
  return{tp,qp,tc_h,R,kR,uh,metadata:{nombre:"Clark IUH",color:C.accent4}};
}

// ─── HIDROGRAMA COMPLETO (hietograma → convolución → Q(t)) ───────────────────
function calcHidroCompleto(lluvRows, uh_struct, dt_min){
  const peList=lluvRows.slice(1).map(r=>r.PeIncrem).filter((v,i,a)=>{
    // Incluir todos los incrementos positivos y su contexto
    return v>0 || (a[i-1]>0||a[i+1]>0);
  });
  const peAll = lluvRows.slice(1).map(r=>Math.max(r.PeIncrem||0,0));
  const qSeries = convolucion(uh_struct.uh, peAll, dt_min);
  const Qpico = Math.max(...qSeries.map(r=>r.Q));
  const tPico = qSeries.find(r=>r.Q>=Qpico*0.9999)?.t || 0;
  const volTotal = qSeries.reduce((s,r)=>s+r.Q*(dt_min*60),0);
  return{qSeries, Qpico:+Qpico.toFixed(6), tPico:+tPico.toFixed(2),
    volTotal:+volTotal.toFixed(1), metodo:uh_struct.metadata.nombre,
    color:uh_struct.metadata.color};
}

// ─── FUNCIONES AUXILIARES ────────────────────────────────────────────────────
function calcTc(p){
  const L=p.longitud_cauce,A=p.area,Sp=p.pendiente_cuenca;
  const So=(p.cota_mayor_cauce-p.cota_menor_cauce)/(L*1000)*1000;
  const Lft=L*3280.84,Sf=(p.cota_mayor_cauce-p.cota_menor_cauce)/(L*3280.84);
  const Ss=25400/p.CN-254;
  return[
    {m:"Témez (1978)",h:0.3*Math.pow(L/Math.pow(So/1000,0.25),0.76)},
    {m:"Kirpich (1940)",h:0.0078*Math.pow(Lft,0.77)*Math.pow(Sf,-0.385)/60},
    {m:"California (1942)",h:0.0195*Math.pow(L*1000,0.77)*Math.pow(So/1000,-0.385)/60},
    {m:"Giandotti (1934)",h:(4*Math.sqrt(A)+1.5*L)/(0.8*Math.sqrt(p.cota_max-p.cota_min))},
    {m:"SCS-Ranser (1958)",h:Math.pow(L*1000,0.8)*Math.pow(Ss+1,0.7)/(4655*Math.pow(Sp,0.5))},
    {m:"Pérez-Montg. (1985)",h:0.1039*Math.pow(L,0.7)*Math.pow(So,-0.3)},
  ].map(r=>({...r,min:+(r.h*60).toFixed(3)}));
}

// Volumen de almacenamiento SAR (GT-AS-004 §3.8)
function calcVolSAR(qPost, qPre, dt_min){
  const n=Math.min(qPost.length,qPre.length);
  let volAcum=0;
  const exc=[];
  for(let i=0;i<n;i++){
    const diff=qPost[i].Q-(qPre[i]?.Q||0);
    if(diff>0) volAcum+=diff*dt_min*60;
    exc.push({t:qPost[i].t, Qpost:+qPost[i].Q.toFixed(5), Qpre:+(qPre[i]?.Q||0).toFixed(5),
      exceso:+Math.max(diff,0).toFixed(5), volAcum:+volAcum.toFixed(1)});
  }
  return{excesos:exc, volTotal:+volAcum.toFixed(1)};
}

// Resumen racional
function calcRacional(est,area,tc_min,CN){
  const S=25400/CN-254,Ia=0.2*S;
  return TR_LIST.map(Tr=>{
    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
    const Cc=P>0?Math.min(Pe/P,1):0.3;
    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  });
}

function buildResumenQ(params, est, dtMin, CNact) {
  const tcList = calcTc(params).filter(r => isFinite(r.h) && r.h > 0);
  const tc_h = tcList[0]?.h || 0.5;
  const metodos = [
    { nombre: 'SCS',     make: () => calcHUSCS(params.area, tc_h, dtMin) },
    { nombre: 'SCS Mod', make: () => calcHUSCS_Mod(params.area, tc_h, dtMin, 2.08) },
    { nombre: 'Snyder',  make: () => calcHUSnyder(params.area*0.386102, params.longitud_cauce*0.621371, params.longitud_cauce*0.621371*0.35, dtMin) },
    { nombre: 'W&H',     make: () => calcHUWilliamsHann(params.area, params.longitud_cauce, (params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce, CNact, dtMin) },
    { nombre: 'Clark',   make: () => calcClarkIUH(params.area, tc_h, dtMin, 1.2) },
  ];
  return metodos.map(m => {
    const row = { metodo: m.nombre };
    TR_LIST.forEach(Tr => {
      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
      const Pe   = calcLluviaEfectiva(hiet, CNact);
      const HU   = m.make();
      const H    = calcHidroCompleto(Pe, HU, dtMin);
      row[Tr]    = +H.Qpico.toFixed(3);
    });
    return row;
  });
}
// ─── EXPORTACIÓN EXCEL (SheetJS) ─────────────────────────────────────────────
async function exportarExcel(datos){
  const XLSX = await import("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").catch(()=>null);
  if(!XLSX) return alert("Error cargando SheetJS");
  const WX = XLSX.default || XLSX;
  const wb = WX.utils.book_new();

  // Hoja 1: Parámetros de diseño
  const ws1 = WX.utils.aoa_to_sheet([
    ["HIDROFLOW v3.0 — GT-AS-004 · EPM 2025"],[""],
    ["PARÁMETROS DE CUENCA Y DISEÑO"],
    ["Parámetro","Valor","Unidad"],
    ["Cuenca",datos.nombre_cuenca,""],
    ["Área",datos.area,"km²"],
    ["Perímetro",datos.perimetro,"km"],
    ["Longitud cauce",datos.longitud_cauce,"km"],
    ["Pendiente media cuenca",datos.pendiente_cuenca,"%"],
    ["Cota máxima",datos.cota_max,"msnm"],
    ["Cota mínima",datos.cota_min,"msnm"],
    ["CN (CNII)",datos.CN,""],
    ["Tc (Témez)",datos.tc_h*60,"min"],
    ["Estación IDF",datos.stn,""],
    ["Tr de diseño",datos.Tr,"años"],
    ["Duración lluvia",datos.dur_h,"h"],
    ["Distribución temporal",datos.distType,""],
    ["Δt cálculo",datos.dt_min,"min"],
    ["P total diseño",datos.Ptotal,"mm"],
    ["CN post-urbano (CNIII)",datos.cnPost,""],
    ["CN pre-urbano (CNIII)",datos.cnPre,""],
    ["% Superficie impermeable",datos.siPct,"%"],
  ]);
  WX.utils.book_append_sheet(wb,ws1,"Parámetros");

  // Hoja 2: Hietograma
  if(datos.hiet){
    const rows=[["t (min)","T (%)","P acum (mm)","P increm (mm)","i bloque (mm/h)"]];
    datos.hiet.data.forEach(r=>rows.push([r.t,r.tPct,r.pAcum,r.pIncrem||0,r.iBloque||0]));
    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hietograma");
  }

  // Hoja 3: Hidrogramas comparativos
  if(datos.hidros){
    const header=["t (min)",...datos.hidros.map(h=>h.metodo+" Q(m³/s)")];
    const len=Math.max(...datos.hidros.map(h=>h.qSeries.length));
    const rows=[header];
    for(let i=0;i<len;i++){
      const row=[+(i*datos.dt_min).toFixed(2),...datos.hidros.map(h=>h.qSeries[i]?.Q||0)];
      rows.push(row);
    }
    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hidrogramas");
  }

  // Hoja 4: Volumen SAR
  if(datos.volSAR){
    const rows=[["t (min)","Q post (m³/s)","Q pre (m³/s)","Exceso (m³/s)","Vol. Acum. (m³)"]];
    datos.volSAR.excesos.filter((_,i)=>i%Math.max(1,Math.floor(datos.volSAR.excesos.length/500))===0)
      .forEach(r=>rows.push([r.t,r.Qpost,r.Qpre,r.exceso,r.volAcum]));
    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Vol_SAR");
  }

  // Hoja 5: Resumen caudales
  if(datos.resumenQ){
    const rows=[["Método","Tr=2.33a","Tr=5a","Tr=10a","Tr=25a","Tr=50a","Tr=100a"]];
    datos.resumenQ.forEach(r=>rows.push([r.metodo,...TR_LIST.map(t=>r[t]||0)]));
    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Resumen_Q");
  }

  WX.writeFile(wb,`HidroFlow_${datos.nombre_cuenca.replace(/\s/g,"_")}_${datos.Tr}a.xlsx`);
}

// ─── EXPORTACIÓN PDF (jsPDF + html2canvas) ────────────────────────────────────
async function exportarPDF(refEl, datos){
  try{
    const [h2c, jsPDF_mod] = await Promise.all([
      import("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
      import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
    ]);
    const html2canvas=h2c.default||h2c;
    const {jsPDF}=jsPDF_mod.default||jsPDF_mod;
    const canvas=await html2canvas(refEl,{scale:1.5,backgroundColor:"#07090F",useCORS:true});
    const imgData=canvas.toDataURL("image/jpeg",0.92);
    const pdf=new jsPDF({orientation:"landscape",unit:"mm",format:"a3"});
    const pw=pdf.internal.pageSize.getWidth();
    const ph=pdf.internal.pageSize.getHeight();
    const ratio=Math.min(pw/canvas.width,ph/canvas.height)*0.95;
    const iw=canvas.width*ratio, ih=canvas.height*ratio;
    pdf.addImage(imgData,"JPEG",(pw-iw)/2,(ph-ih)/2,iw,ih);
    pdf.save(`HidroFlow_${datos.nombre_cuenca}_Tr${datos.Tr}a.pdf`);
  }catch(e){
    console.error("PDF export error:",e);
    alert("Error exportando PDF. Verifique conexión para cargar librerías.");
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTES UI
// ═══════════════════════════════════════════════════════════════════════════════

function Field({label,value,onChange,unit,step="0.001",type="number"}){
  const[f,setF]=useState(false);
  return(<div style={{marginBottom:11}}>
    <label style={{display:"block",fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:mono}}>{label}</label>
    <div style={{display:"flex",gap:8,alignItems:"center"}}>
      <input type={type} step={step} value={value}
        onChange={e=>onChange(type==="number"?parseFloat(e.target.value)||0:e.target.value)}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)}
        style={{flex:1,background:C.bg,border:`1px solid ${f?C.accent:C.border}`,borderRadius:6,
          color:C.text,padding:"6px 10px",fontSize:13,outline:"none",fontFamily:mono,transition:"border-color .2s"}}/>
      {unit&&<span style={{fontSize:10,color:C.muted,minWidth:40,fontFamily:mono}}>{unit}</span>}
    </div>
  </div>);
}

function Card({title,accent=C.accent,children,style={},id}){
  return(<div id={id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",...style}}>
    {title&&<div style={{padding:"9px 15px",borderBottom:`1px solid ${C.border}`,background:`linear-gradient(90deg,${accent}12,transparent)`,display:"flex",alignItems:"center",gap:8}}>
      <div style={{width:3,height:14,background:accent,borderRadius:2}}/>
      <span style={{fontSize:10,fontWeight:700,color:accent,textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:mono}}>{title}</span>
    </div>}
    <div style={{padding:15}}>{children}</div>
  </div>);
}

function Kpi({value,label,accent=C.accent,sub}){
  return(<div style={{background:`${accent}0C`,border:`1px solid ${accent}22`,borderRadius:10,padding:"10px 13px",textAlign:"center"}}>
    <div style={{fontSize:16,fontWeight:800,color:accent,fontFamily:mono,lineHeight:1.1}}>{value}</div>
    {sub&&<div style={{fontSize:9,color:`${accent}80`,fontFamily:mono,marginTop:2}}>{sub}</div>}
    <div style={{fontSize:9,color:C.muted,marginTop:4,textTransform:"uppercase",letterSpacing:"0.07em"}}>{label}</div>
  </div>);
}

function Tbl({headers,rows,hiCols=[],accent=C.accent}){
  return(<div style={{overflowX:"auto"}}>
    <table style={{width:"100%",borderCollapse:"collapse",fontSize:10.5,fontFamily:mono}}>
      <thead><tr>{headers.map((h,i)=>(
        <th key={i} style={{padding:"6px 9px",background:`${C.bg}CC`,color:C.muted,textAlign:i===0?"left":"right",fontWeight:600,fontSize:9,textTransform:"uppercase",letterSpacing:"0.07em",borderBottom:`1px solid ${C.border}`,whiteSpace:"nowrap"}}>{h}</th>
      ))}</tr></thead>
      <tbody>{rows.map((row,i)=>(
        <tr key={i} style={{background:i%2===0?"transparent":`${C.border}20`}}>
          {Object.entries(row).map(([,v],j)=>{
            const hi=hiCols.includes(j);
            return(<td key={j} style={{padding:"5px 9px",textAlign:j===0?"left":"right",
              color:hi?accent:C.text,fontWeight:hi?700:400,
              borderBottom:`1px solid ${C.border}18`,whiteSpace:"nowrap"}}>
              {typeof v==="number"?v.toFixed(v>9999?0:v>999?1:v>99?2:v>9?3:4):v}
            </td>);
          })}
        </tr>
      ))}</tbody>
    </table>
  </div>);
}

function BtnGroup({options,value,onChange,accent=C.accent}){
  return(<div style={{display:"flex",flexWrap:"wrap",gap:4}}>
    {options.map(o=>{
      const active=value===o.v;
      return(<button key={o.v} onClick={()=>onChange(o.v)}
        style={{padding:"4px 10px",borderRadius:6,border:`1px solid ${active?accent:C.border}`,
          cursor:"pointer",background:active?`${accent}18`:"transparent",
          color:active?accent:C.muted,fontSize:10,fontFamily:mono,fontWeight:active?700:400,
          transition:"all .15s"}}>
        {o.l}
      </button>);
    })}
  </div>);
}

function SectionHeader({icon,title,sub,accent}){
  return(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>
    <div style={{width:36,height:36,borderRadius:9,background:`${accent}15`,border:`1px solid ${accent}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
    <div>
      <div style={{fontSize:15,fontWeight:800,color:C.text,letterSpacing:"-0.02em"}}>{title}</div>
      {sub&&<div style={{fontSize:9,color:C.muted,marginTop:1,fontFamily:mono}}>{sub}</div>}
    </div>
  </div>);
}

function StationRow({name,est,sel,onSel}){
  const act=name===sel;
  return(<button onClick={()=>onSel(name)} style={{display:"flex",alignItems:"center",gap:9,width:"100%",padding:"7px 13px",background:act?`${C.accent}10`:"transparent",border:"none",cursor:"pointer",borderBottom:`1px solid ${C.border}18`,transition:"background .15s"}}
    onMouseEnter={ev=>ev.currentTarget.style.background=`${C.accent}08`}
    onMouseLeave={ev=>ev.currentTarget.style.background=act?`${C.accent}10`:"transparent"}>
    <div style={{width:5,height:5,borderRadius:"50%",background:act?C.accent:est.fuente==="PDF"?C.accent2:C.gold,flexShrink:0}}/>
    <div style={{textAlign:"left"}}>
      <div style={{fontSize:11,color:act?C.accent:C.text,fontWeight:act?700:400,fontFamily:sans}}>{name}</div>
      <div style={{fontSize:9,color:C.muted,fontFamily:mono}}>{est.codigo!=="——"?est.codigo+" · ":""}{est.alt} msnm</div>
    </div>
  </button>);
}

function StationSel({sel,onSel}){
  const[open,setOpen]=useState(false);
  const e=ESTACIONES_EPM[sel];
  const pdfN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="PDF").length;
  const refN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="REF").length;
  return(<div style={{position:"relative",zIndex:300}}>
    <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:9,background:C.card,border:`1px solid ${open?C.accent:C.border}`,borderRadius:10,padding:"6px 12px",cursor:"pointer",color:C.text,fontFamily:sans,fontSize:12,transition:"all .2s",minWidth:240}}>
      <div style={{width:7,height:7,borderRadius:"50%",background:e.fuente==="PDF"?C.accent2:C.gold,flexShrink:0}}/>
      <div style={{flex:1,textAlign:"left"}}>
        <div style={{fontSize:11,fontWeight:700}}>{sel}</div>
        <div style={{fontSize:9,color:C.muted,fontFamily:mono}}>{e.alt} msnm · {e.fuente==="PDF"?"✓ PDF":"~ Ref"}</div>
      </div>
      <span style={{color:C.muted,fontSize:9}}>{open?"▲":"▼"}</span>
    </button>
    {open&&<div style={{position:"absolute",top:"110%",left:0,background:C.panel,border:`1px solid ${C.border}`,borderRadius:10,width:280,maxHeight:380,overflowY:"auto",boxShadow:"0 16px 40px #00000080",zIndex:400}}>
      <div style={{padding:"8px 13px 6px",borderBottom:`1px solid ${C.border}`,fontSize:9,color:C.muted,fontFamily:mono}}>
        <span style={{color:C.accent2}}>● {pdfN} PDF calibradas</span><span style={{margin:"0 8px"}}>·</span><span style={{color:C.gold}}>● {refN} de referencia</span>
      </div>
      <div style={{padding:"4px 0 2px",fontSize:9,color:C.muted,fontFamily:mono,paddingLeft:13,paddingTop:8,paddingBottom:2}}>✓ CALIBRADAS PDF EPM 2025</div>
      {Object.entries(ESTACIONES_EPM).filter(([,v])=>v.fuente==="PDF").map(([n,v])=><StationRow key={n} name={n} est={v} sel={sel} onSel={nm=>{onSel(nm);setOpen(false)}}/>)}
      <div style={{padding:"4px 0 2px",fontSize:9,color:C.muted,fontFamily:mono,paddingLeft:13,paddingTop:8,paddingBottom:2,borderTop:`1px solid ${C.border}`}}>~ REFERENCIA ESTIMADA</div>
      {Object.entries(ESTACIONES_EPM).filter(([,v])=>v.fuente==="REF").map(([n,v])=><StationRow key={n} name={n} est={v} sel={sel} onSel={nm=>{onSel(nm);setOpen(false)}}/>)}
    </div>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MÓDULO PARÁMETROS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── OUTLET MINI MAP ─────────────────────────────────────────────────────────
// Mini mapa SVG que muestra el punto de salida en contexto del Valle de Aburrá
// Se embebe dentro de la card Punto de Salida en ModParams
function OutletMiniMap({lat,lon,alt}){
  const W=480,H=120;
  const LAT_MIN=5.93,LAT_MAX=6.52,LON_MIN=-75.82,LON_MAX=-75.33;
  const toXY=(la,lo)=>[(lo-LON_MIN)/(LON_MAX-LON_MIN)*W,(1-(la-LAT_MIN)/(LAT_MAX-LAT_MIN))*H];
  const[ox,oy]=toXY(lat,lon);
  // Estaciones EPM para contexto
  const ests=Object.entries(ESTACIONES_EPM).map(([n,e])=>({n,lat:e.lat,lon:e.lon,alt:e.alt}));
  // Estaciones más cercanas (top 3)
  const cercanas=[...ests].sort((a,b)=>distKm(lat,lon,a.lat,a.lon)-distKm(lat,lon,b.lat,b.lon)).slice(0,3);

  return(<div style={{marginTop:12}}>
    <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:5,display:"flex",gap:12,alignItems:"center"}}>
      <span style={{color:C.teal,fontWeight:700}}>▸ Contexto geográfico — Valle de Aburrá</span>
      {cercanas.map(e=>(
        <span key={e.n} style={{padding:"1px 7px",borderRadius:10,background:`${C.accent2}12`,border:`1px solid ${C.accent2}22`,color:C.accent2}}>
          {e.n} · {distKm(lat,lon,e.lat,e.lon).toFixed(1)}km
        </span>
      ))}
    </div>
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{background:C.bg,borderRadius:8,border:`1px solid ${C.teal}30`,display:"block"}}>
      {/* Grid tenue */}
      {[6.0,6.1,6.2,6.3,6.4].map(la=>{const[,y]=toXY(la,-75.5);return(
        <g key={la}><line x1={0} y1={y} x2={W} y2={y} stroke={C.border} strokeWidth={0.4} opacity={0.4}/>
          <text x={3} y={y-2} fill={C.muted} fontSize={6} fontFamily="monospace">{la.toFixed(1)}°</text></g>);})}
      {/* Río Medellín */}
      <path d={`M ${toXY(5.97,-75.65).join(",")} Q ${toXY(6.1,-75.61).join(",")} ${toXY(6.22,-75.57).join(",")} Q ${toXY(6.34,-75.56).join(",")} ${toXY(6.47,-75.54).join(",")}`}
        stroke="#1A4A6B" strokeWidth={3} fill="none" opacity={0.8}/>
      <path d={`M ${toXY(5.97,-75.65).join(",")} Q ${toXY(6.1,-75.61).join(",")} ${toXY(6.22,-75.57).join(",")} Q ${toXY(6.34,-75.56).join(",")} ${toXY(6.47,-75.54).join(",")}`}
        stroke={C.accent} strokeWidth={0.8} fill="none" opacity={0.2}/>
      {/* Todas las estaciones EPM como puntos de fondo */}
      {ests.map((e,i)=>{const[ex,ey]=toXY(e.lat,e.lon);const cerca=cercanas.find(c=>c.n===e.n);
        return(<g key={i}>
          {cerca&&<line x1={ox} y1={oy} x2={ex} y2={ey} stroke={C.teal} strokeWidth={0.8} opacity={0.35} strokeDasharray="3 4"/>}
          <circle cx={ex} cy={ey} r={cerca?4:2.5} fill={cerca?C.accent2:C.muted} opacity={cerca?0.9:0.45}/>
          {cerca&&<text x={ex+5} y={ey+4} fill={C.accent2} fontSize={6.5} fontFamily="monospace">{e.n.length>12?e.n.substring(0,11)+"…":e.n}</text>}
        </g>);
      })}
      {/* Punto de salida */}
      <circle cx={ox} cy={oy} r={10} fill={C.teal} opacity={0.2}/>
      <circle cx={ox} cy={oy} r={6}  fill={C.teal} opacity={0.9}/>
      <circle cx={ox} cy={oy} r={10} fill="none" stroke={C.teal} strokeWidth={1.5} opacity={0.5} strokeDasharray="3 3"/>
      {/* Coordenadas del outlet */}
      <text x={ox+13} y={oy-2} fill={C.teal} fontSize={7.5} fontFamily="monospace" fontWeight="700">⊕ SALIDA</text>
      <text x={ox+13} y={oy+8} fill={C.muted2} fontSize={6.5} fontFamily="monospace">{lat.toFixed(5)}°, {lon.toFixed(5)}°</text>
      <text x={ox+13} y={oy+17} fill={C.muted} fontSize={6.5} fontFamily="monospace">{alt} msnm</text>
      {/* Norte */}
      <text x={W-16} y={14} fill={C.muted} fontSize={10} fontFamily="monospace">N↑</text>
      {/* Label río */}
      <text x={42} y={toXY(6.22,-75.59)[1]+3} fill="#1A6A9B" fontSize={7} fontFamily="monospace">Río Medellín</text>
    </svg>
  </div>);
}

// ───────────────────────────────────────────────────────────────────────────────
// Subcomponente: Card "Condición de Humedad (AMC) y Urbanización"
// (versión con hooks por named import: useState/useEffect/useCallback)
// ───────────────────────────────────────────────────────────────────────────────
function AMCPanel({ params, setParams }) {
  // Normalizaciones (evitan NaN/undefined)
  const amcSel = params?.amcActual ?? "II";
  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
    ? params.porcentajeImpermeable
    : 60; // ← unifica default con ModHidrogramas
  const cnBase = Number.isFinite(params?.cnBase)
    ? params.cnBase
    : (Number.isFinite(params?.CN) ? params.CN : 75);

  // Estado local para el slider (evita flood al arrastrar)
  const [pctLive, setPctLive] = useState(pctImp);
  useEffect(() => { setPctLive(pctImp); }, [pctImp]);

  // Commit del % Impermeable (al soltar / perder foco)
  const commitPct = useCallback((v) => {
    setParams(prev => ({ ...prev, porcentajeImpermeable: v }));
    if (import.meta.env.DEV) console.log("[AMC]", "%Impermeable ->", v);
  }, [setParams]);

  return (
    <div style={{ marginTop: 16, padding: 16, border: '1px solid #1F2F45', borderRadius: 10, background: '#0F1624' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>Condición de Humedad (AMC) y Urbanización</h3>
        <small style={{ opacity: 0.75 }}>Ajusta AMC, % Impermeable y CN II base</small>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, alignItems: 'start' }}>

        {/* AMC I/II/III */}
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>AMC</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {["I", "II", "III"].map(a => {
              const sel = (amcSel === a);
              return (
                <button
                  key={a}
                  type="button"  // evita submit si hay <form> ancestro
                  onClick={() => {
                    setParams(prev => ({ ...prev, amcActual: a }));
                    if (import.meta.env.DEV) console.log("[AMC]", "amcActual ->", a);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    border: sel ? '1px solid #00F5A0' : '1px solid #1F2F45',
                    background: sel ? '#12242A' : '#0B0F1A',
                    color: '#D8E4F0'
                  }}
                >
                  AMC {a}
                </button>
              );
            })}
          </div>
          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
            I (seco) · II (normal) · III (húmedo/saturado)
          </small>
        </div>

        {/* % Impermeable (commit al soltar / blur) */}
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>% Impermeable</label>
          <input
            type="range" min={0} max={100} step={1}
            value={pctLive}
            onChange={e => setPctLive(+e.target.value)}               // solo UI mientras arrastras
            onPointerUp={() => commitPct(pctLive)}                    // commit al soltar (touch/pen)
            onMouseUp={() => commitPct(pctLive)}                      // commit al soltar (mouse)
            onBlur={() => commitPct(pctLive)}                         // commit al salir del control
            style={{ width: '100%' }}
            aria-label="% Impermeable"
          />
          <div style={{ marginTop: 8, fontFamily: 'monospace' }}>{pctLive}%</div>
          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
            Pondera CN mezclando suelo permeable e impermeable
          </small>
        </div>

        {/* CN II base */}
        <div>
          <label style={{ display: 'block', marginBottom: 8 }}>CN II base</label>
          <input
            type="number" min={30} max={98} step={0.1}
            value={cnBase}
            onChange={e => {
              const v = +e.target.value;
              setParams(prev => ({ ...prev, cnBase: v }));
              if (import.meta.env.DEV) console.log("[AMC]", "cnBase ->", v);
            }}
            style={{
              width: '100%', padding: 8, borderRadius: 8,
              border: '1px solid #1F2F45', background: '#0B0F1A', color: '#D8E4F0'
            }}
            aria-label="CN II base"
          />
          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
            Si no defines CN II base, se usa el CN clásico (params.CN)
          </small>
        </div>

      </div>
    </div>
  );
}

function ModParams({ params, setParams }) {
  // Cálculos de Tc y utilidades locales
  const tc      = useMemo(() => calcTc(params), [params]);
  const set     = k => v => setParams(p => ({ ...p, [k]: v }));
  const tcStats = tc.filter(r => isFinite(r.h) && r.h > 0);
  const tcMed   = tcStats.length ? tcStats.reduce((s, r) => s + r.h, 0) / tcStats.length : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── Morfometría / Índices / Tc (bloque superior) ───────────────────────── */}
      <SectionHeader
        icon="⬡"
        title="Morfometría de Cuenca"
        sub="Parámetros geomorfológicos · Índices · Tiempos de concentración"
        accent={C.accent}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "start" }}>
        {/* Identificación */}
        <Card title="Identificación" accent={C.accent}>
          <Field label="Nombre cuenca" value={params.nombre_cuenca} onChange={set("nombre_cuenca")} type="text" />
          <Field label="Δt cálculo"     value={params.dt}            onChange={set("dt")}             unit="min" step="0.5" />
          <Field label="CN (CNII)"       value={params.CN}            onChange={set("CN")}             step="1" />
        </Card>

        {/* Punto de Salida (Outlet) */}
        <Card title="Punto de Salida (Outlet)" accent={C.teal} style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
            <Field label="Latitud salida"  value={params.lat_salida} onChange={set("lat_salida")} unit="°N" step="0.00001" />
            <Field label="Longitud salida" value={params.lon_salida} onChange={set("lon_salida")} unit="°W" step="0.00001" />
            <Field label="Cota salida"     value={params.alt_salida} onChange={set("alt_salida")} unit="msnm" step="1" />

            <div style={{
              fontFamily: mono, fontSize: 8, color: C.muted, padding: "6px 10px", borderRadius: 8,
              background: `${C.teal}0A`, border: `1px solid ${C.teal}25`, lineHeight: 2
            }}>
              <div style={{ color: C.teal, fontWeight: 700, marginBottom: 3 }}>⊕ Punto de salida activo</div>
              <div>Lat: <span style={{ color: C.text }}>{(+params.lat_salida || 0).toFixed(6)}°</span></div>
              <div>Lon: <span style={{ color: C.text }}>{(+params.lon_salida || 0).toFixed(6)}°</span></div>
              <div>Alt: <span style={{ color: C.text }}>{+params.alt_salida || 0} msnm</span></div>
              <div style={{ marginTop: 4, color: C.muted2, fontSize: 7.5 }}>Usado en: Influencia · SIATA · IDF ponderada</div>
            </div>
          </div>

          {/* Mini‑mapa del outlet (asegura numeric cast con +) */}
          <OutletMiniMap
            lat={+params.lat_salida || 6.185083}
            lon={+params.lon_salida || -75.659972}
            alt={+params.alt_salida || 1702}
          />
        </Card>

        {/* Geometría */}
        <Card title="Geometría" accent={C.accent2}>
          <Field label="Área"            value={params.area}            onChange={set("area")}            unit="km²" />
          <Field label="Perímetro"       value={params.perimetro}       onChange={set("perimetro")}       unit="km" />
          <Field label="Longitud cauce"  value={params.longitud_cauce}  onChange={set("longitud_cauce")}  unit="km" />
          <Field label="Longitud cuenca" value={params.longitud_cuenca} onChange={set("longitud_cuenca")} unit="km" />
        </Card>

        {/* Cotas y Pendientes */}
        <Card title="Cotas y Pendientes" accent={C.accent3}>
          <Field label="Cota máxima"       value={params.cota_max}          onChange={set("cota_max")}          unit="msnm" step="1" />
          <Field label="Cota mínima"       value={params.cota_min}          onChange={set("cota_min")}          unit="msnm" step="1" />
          <Field label="Cota mayor cauce"  value={params.cota_mayor_cauce}  onChange={set("cota_mayor_cauce")}  unit="msnm" step="1" />
          <Field label="Cota menor cauce"  value={params.cota_menor_cauce}  onChange={set("cota_menor_cauce")}  unit="msnm" step="1" />
          <Field label="Pendiente media"   value={params.pendiente_cuenca}  onChange={set("pendiente_cuenca")}  unit="%" />
        </Card>
      </div>
      {/* ⬆️ Cierre del grid de Morfometría — PUNTO DE INSERCIÓN CORRECTO */}

      {/* ── Card AMC y Urbanización (subcomponente) ────────────────────────────── */}
      <AMCPanel params={params} setParams={setParams} />

      {/* ── KPIs de forma, compacidad, pendiente y Tc promedio ─────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 9 }}>
        {[
          { v: (params.perimetro / (2 * Math.sqrt(Math.PI * params.area))).toFixed(3),   l: "Índice Gravelius", s: "Kc", a: C.accent },
          { v: ((params.longitud_cuenca ** 2) / params.area).toFixed(3),                 l: "Índice de Forma", s: "Rf", a: C.accent2 },
          { v: (params.area / (params.longitud_cuenca ** 2)).toFixed(4),                 l: "Coef. Compacidad", s: "Cc", a: C.accent3 },
          { v: ((params.cota_max - params.cota_min) / (params.longitud_cauce * 1000) * 1000).toFixed(2),
            l: "Pendiente cauce", s: "So ‰", a: C.gold },
          { v: (tcMed * 60).toFixed(2),                                                  l: "Tc promedio", s: "min", a: C.accent4 },
        ].map(({ v, l, s, a }) => <Kpi key={l} value={`${v} ${s}`} label={l} accent={a} />)}
      </div>

      {/* ── Tabla de Tiempos de Concentración (6 métodos) ─────────────────────── */}
      <Card title="Tiempos de Concentración — 6 Métodos" accent={C.teal}>
        <Tbl
          headers={["Método", "Tc (h)", "Tc (min)", "Δ vs. media (%)"]}
          rows={tc.filter(r => isFinite(r.h) && r.h > 0).map(r => ({
            M: r.m,
            H: +r.h.toFixed(4),
            MIN: +r.min.toFixed(3),
            DELTA: +((r.h - tcMed) / tcMed * 100).toFixed(1)
          }))}
          hiCols={[2]}
          accent={C.teal}
        />
      </Card>

    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MÓDULO IDF — Curvas Intensidad-Duración-Frecuencia
// ═══════════════════════════════════════════════════════════════════════════════
function ModIDF({est,name}){
  const DURS=[5,10,15,20,30,45,60,90,120,180,240,360];
  const idfData=useMemo(()=>DURS.map(d=>({d,...Object.fromEntries(TR_LIST.map(T=>[`Tr${T}`,+idfI(est,d,T).toFixed(2)]))})),[est]);
  const curvasData=useMemo(()=>{
    const pts=[];
    for(let d=5;d<=360;d+=5){
      const row={d};
      TR_LIST.forEach(T=>row[`Tr${T}`]=+idfI(est,d,T).toFixed(2));
      pts.push(row);
    }
    return pts;
  },[est]);
  // Comparativa 20 estaciones a d=30min, Tr=100a
  const compData=useMemo(()=>Object.entries(ESTACIONES_EPM).map(([n,e])=>({
    est:n.length>12?n.substring(0,12)+"…":n,
    I100:+idfI(e,30,100).toFixed(2),
    fuente:e.fuente,
  })).sort((a,b)=>b.I100-a.I100),[]);

  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <SectionHeader icon="⌁" title="Curvas IDF — 20 Estaciones EPM 2025" sub={`I = k/(c+d)ⁿ · d en horas · c = 0.4 · Gumbel · 2000–2023`} accent={C.accent3}/>
    <div style={{background:`${C.accent2}08`,border:`1px solid ${C.accent2}20`,borderRadius:10,padding:"10px 15px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
      <div>
        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.08em"}}>Estación activa · {est.fuente==="PDF"?"✓ Calibrada PDF EPM 5/11/2024":"~ Referencia estimada"}</div>
        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>{name}</div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",fontFamily:mono,fontSize:9}}>
        {[["Código",est.codigo],["Lat.",est.lat.toFixed(5)],["Lon.",est.lon.toFixed(5)],["Alt.",est.alt+" msnm"],["Fuente",est.fuente]].map(([l,v])=>(
          <div key={l} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,padding:"4px 10px"}}>
            <span style={{color:C.muted}}>{l}: </span><span style={{color:C.text,fontWeight:600}}>{v}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14}}>
      <Card title={`Curvas IDF — ${name}`} accent={C.accent3}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={curvasData} margin={{left:0,right:18,top:8,bottom:14}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" mm/h",nm]}/>
            <Legend wrapperStyle={{fontSize:9}}/>
            {TR_LIST.map((T,i)=><Line key={T} type="monotone" dataKey={`Tr${T}`} stroke={CC[i]} strokeWidth={1.8} dot={false} name={`Tr=${T}a`}/>)}
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Tabla IDF — Intensidades (mm/h)" accent={C.accent3}>
        <Tbl headers={["d(min)",...TR_LIST.map(T=>`Tr=${T}a`)]} rows={idfData.map(r=>({d:r.d,...Object.fromEntries(TR_LIST.map(T=>[T,r[`Tr${T}`]]))}))} hiCols={[6]} accent={C.accent3}/>
      </Card>
    </div>
    <Card title="Comparativa 20 Estaciones — I(d=30min, Tr=100a)" accent={C.gold}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={compData} margin={{left:0,right:14,top:8,bottom:44}} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
          <XAxis type="number" tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",position:"insideBottom",offset:-8,fill:C.muted,fontSize:9}}/>
          <YAxis type="category" dataKey="est" tick={{fill:C.muted,fontSize:8}} width={90}/>
          <Tooltip contentStyle={TT} formatter={v=>[v+" mm/h","I"]}/>
          <Bar dataKey="I100" radius={[0,3,3,0]}
            fill={C.accent3}
            label={{position:"right",fill:C.muted2,fontSize:8,formatter:v=>v}}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="Parámetros k · n · c — Todos los Tr" accent={C.muted2}>
      <Tbl headers={["Tr (años)","k","n","c","I(10min)","I(30min)","I(60min)","I(120min)"]}
        rows={TR_LIST.map(T=>{const{k,n,c}=est.params[String(T)]||{k:0,n:1,c:0.4};return{T,k:+k.toFixed(4),n:+n.toFixed(4),c,I10:+idfI(est,10,T).toFixed(2),I30:+idfI(est,30,T).toFixed(2),I60:+idfI(est,60,T).toFixed(2),I120:+idfI(est,120,T).toFixed(2)};})}
        hiCols={[4]} accent={C.accent3}/>
    </Card>
  </div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MÓDULO HIETOGRAMAS — Distribución temporal + Curvas Huff
// ═══════════════════════════════════════════════════════════════════════════════
function ModHietogramas({ est, name, params }) {
  const [Tr, setTr] = useState(25);
  const [durH, setDurH] = useState(3);
  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  // Sync dtMin when params.dt changes externally (ej: carga de datos)
  useEffect(() => { if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt); }, [params.dt]);

  const [distType, setDistType] = useState("EPM_Q1");

  // Hietograma activo
  const hiet = useMemo(
    () => calcHietograma(est, Tr, durH, dtMin, distType),
    [est, Tr, durH, dtMin, distType]
  );

  // Hietogramas comparativos de todas las distribuciones
  const hietAll = useMemo(() => {
    const types = ["EPM_Q1", "Huff_Q1", "Huff_Q2", "Huff_Q3", "Huff_Q4"];
    return types.map(tp => ({ tp, data: calcHietograma(est, Tr, durH, dtMin, tp) }));
  }, [est, Tr, durH, dtMin]);

  // === Día 3 (MVP) — Orquestación P → Pn → UH → Q(t) ===
  // Vector de incrementos (mm por bloque) y Δt
  const P_mm  = hiet.data.map((r, i, a) => (i === 0 ? 0 : +(r.pAcum - a[i - 1].pAcum).toFixed(5)));
  const dt_min = dtMin;
  const A_km2  = Number.isFinite(params?.area) ? params.area : 36.58;

  // === Tc sugerido desde Panel (geomorfología) — informe amigable ===
  const tcList = useMemo(
    () => calcTc(params).filter(r => isFinite(r.h) && r.h > 0),
    [params]
  ); // r.min está en minutos

  const Tc_sugerido_min = useMemo(() => {
    if (!tcList.length) return 120;
    const s = [...tcList.map(r => r.min)].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  }, [tcList]);

  // Override opcional (para análisis)
  const [usarOverrideTc, setUsarOverrideTc] = useState(false);
  const [Tc_override_min, setTcOverride]   = useState(Tc_sugerido_min);

  // Tc efectivo que entra a Q(t)
  const Tc_min = usarOverrideTc ? Tc_override_min : Tc_sugerido_min;

  // Informe amigable
  const infoTc = useMemo(() => {
    if (!tcList.length) return "Sin Tc: faltan parámetros geomorfológicos.";
    const etiquetas = tcList
      .map(r => `${r.m.split(" ")[0]}: ${r.min.toFixed(1)} min`)
      .join(" · ");
    return `Tc sugerido = mediana de ${tcList.length} métodos -> ${Tc_sugerido_min.toFixed(1)} min. [${etiquetas}]`;
  }, [tcList, Tc_sugerido_min]);

  // === SCS‑CN desde Preliminares + override + AMC auto (SIATA) ===
  const CN_panel        = Number.isFinite(params?.cnBase) ? params.cnBase : (params.CN ?? 75);
  const AMC_panel       = params?.amcActual ?? "II"; // "I" | "II" | "III"
  const pctImperv_panel = Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60;

  // Override SCS‑CN (para análisis)
  const [overrideSCS, setOverrideSCS] = useState(false);
  const [CN_ovr, setCN_ovr]          = useState(CN_panel);
  const [AMC_ovr, setAMC_ovr]        = useState(AMC_panel);
  const [pctImp_ovr, setPctImp_ovr]  = useState(pctImperv_panel);

  // Valores efectivos (panel u override)
  const CN        = overrideSCS ? CN_ovr     : CN_panel;
  const AMC       = overrideSCS ? AMC_ovr    : AMC_panel;
  const pctImperv = overrideSCS ? pctImp_ovr : pctImperv_panel;

  // Chequeos amables de rango (usa '-' ASCII para evitar tofu en monospace)
  const scsAviso = [];
  if (CN < 30 || CN > 98) scsAviso.push("CN fuera de 30-98");
  if (pctImperv < 0 || pctImperv > 100) scsAviso.push("% Impermeable fuera de 0-100");
  if (!["I", "II", "III"].includes(AMC)) scsAviso.push("AMC debe ser I/II/III");

  // AMC automático (SIATA) — opcional
  const [usarAMCauto, setUsarAMCauto] = useState(false);
  const [hs_demo, setHsDemo]          = useState(0.38); // 0–1; aquí demo. Luego lo tomas de SIATA.

  const amcAuto = useMemo(
    () => (usarAMCauto ? derivarAMCDesdeSIATA(hs_demo) : null),
    [usarAMCauto, hs_demo]
  );

  // AMC efectivo: si AMC auto está activo y no hay override SCS, usamos el derivado
  const AMC_eff = (usarAMCauto && !overrideSCS && amcAuto?.amcActual) ? amcAuto.amcActual : AMC;

  // Informe amigable AMC
  const infoAMC = (usarAMCauto && amcAuto)
    ? `${amcAuto.amcInforme} (Fuente: ${amcAuto.amcFuente})`
    : `AMC desde panel: ${AMC_panel}`;
  
  // Toggle para decidir si persistimos AMC auto en el panel (opt-in)
const [guardarAMCenPanel, setGuardarAMCenPanel] = useState(true); // por defecto: ON (puedes iniciar en false si prefieres)

   // Persistir AMC auto en el panel (Preliminares) cuando el toggle está activo
useEffect(() => {
  if (usarAMCauto && amcAuto?.amcActual && params?.amcActual !== amcAuto.amcActual) {
    // Requiere que ModHietogramas reciba setParams como prop desde el padre
    setParams(prev => ({ ...prev, amcActual: amcAuto.amcActual }));
  }
}, [usarAMCauto, amcAuto?.amcActual, params?.amcActual, setParams]);

  // ── Exportar PNG para gráficas del módulo (vía CDN, sin instalar) ─────────────
  // Refs: contenedores de las dos gráficas a exportar (Distribuciones e Intensidades)
  const refContenedorDistribuciones = useRef(null);
  const refContenedorIntensidades   = useRef(null);
  
  // Persistir AMC auto en el panel (Preliminares) SOLO si el toggle está activo
useEffect(() => {
  if (!guardarAMCenPanel) return;                 // opt-in: solo si el usuario lo decide
  if (usarAMCauto && amcAuto?.amcActual) {
    // Evita escrituras innecesarias si no cambió
    if (params?.amcActual === amcAuto.amcActual) return;

    // Auditoría útil para reportes y Preliminares
    const stamp = new Date().toISOString();
    const payload = {
      amcActual:  amcAuto.amcActual,
      amcFuente:  amcAuto.amcFuente || "SIATA",
      amcInforme: amcAuto.amcInforme || `AMC ${amcAuto.amcActual} (auto)`,
      amcFecha:   stamp,
      amcHSref:   typeof hs_demo === "number" ? hs_demo : undefined
    };

    // Requiere que ModHietogramas reciba setParams como prop
    setParams(prev => ({ ...prev, ...payload }));
  }
}, [
  guardarAMCenPanel,
  usarAMCauto,
  amcAuto?.amcActual,
  amcAuto?.amcFuente,
  amcAuto?.amcInforme,
  hs_demo,
  params?.amcActual,
  setParams
]);
  /**
   * exportarPNGDesdeRef
   * @param {React.RefObject} refNodo       ref al contenedor (div) que envuelve ResponsiveContainer
   * @param {string}          nombreArchivo nombre del PNG a descargar
   */
  const exportarPNGDesdeRef = async (refNodo, nombreArchivo) => {
    // Import desde CDN — @vite-ignore evita que Vite lo resuelva como paquete local
    const moduloH2C = await import(
      /* @vite-ignore */ "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
    );
    const html2canvas = moduloH2C.default ?? moduloH2C;

    if (!refNodo?.current) return;

    const canvas = await html2canvas(refNodo.current, {
      backgroundColor: "#0B0F1A", // coherente con el fondo de tu UI
      scale: 2,                   // buena resolución para reportes
      useCORS: true
    });

    const url = canvas.toDataURL("image/png", 0.95);
    const a = document.createElement("a");
    a.href = url;
    a.download = nombreArchivo;
    a.click();
  };

  // Combinar bloques de intensidad para gráfica comparativa
  const compData = useMemo(() => {
    const len = hiet.data.length;
    const step = Math.max(1, Math.floor(len / 60));
    return hiet.data.slice(1).filter((_, i) => i % step === 0).map((r, idx) => {
      const obj = { t: r.t, EPM_Q1: r.iBloque };
      hietAll.forEach(h => {
        const j = Math.min(idx * step + 1, h.data.data.length - 1);
        const match = h.data.data[j];
        if (match) obj[h.tp] = match.iBloque || 0;
      });
      return obj;
    });
  }, [hiet, hietAll]);

  // Distribuciones adimensionales comparadas
  const distMerge = useMemo(() => {
    return Array.from({ length: 21 }, (_, i) => {
      const T = i * 5;
      return {
        T,
        EPM_Q1:  interpDist(DIST_TEMPORAL_Q1, T),
        Huff_Q1: interpDist(HUFF_DATA.Q1, T),
        Huff_Q2: interpDist(HUFF_DATA.Q2, T),
        Huff_Q3: interpDist(HUFF_DATA.Q3, T),
        Huff_Q4: interpDist(HUFF_DATA.Q4, T),
      };
    });
  }, []);

  const dispFilt = hiet.data.filter((_, i) => i % Math.max(1, Math.floor(hiet.data.length / 80)) === 0);

  // ────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionHeader
        icon="🌧"
        title="Hietogramas de Diseño — Distribución Temporal"
        sub="GT-AS-004 §3.3 · Curvas Huff · 5 distribuciones comparadas"
        accent={C.accent}
      />

      {/* Controles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
        <Card title="Período de Retorno" accent={C.gold}>
          <BtnGroup options={TR_LIST.map(t => ({ v: t, l: `${t}a` }))} value={Tr} onChange={setTr} accent={C.gold} />
        </Card>
        <Card title="Duración" accent={C.accent3}>
          <BtnGroup options={[1, 2, 3, 6, 12].map(h => ({ v: h, l: `${h}h` }))} value={durH} onChange={setDurH} accent={C.accent3} />
        </Card>
        <Card title="Intervalo Δt" accent={C.accent}>
          <BtnGroup options={[5, 10, 15, 30].map(d => ({ v: d, l: `${d}'` }))} value={dtMin} onChange={setDtMin} accent={C.accent} />
        </Card>
        <Card title="Distribución activa" accent={C.accent2}>
          <BtnGroup
            options={[
              { v: "EPM_Q1", l: "EPM Q1" }, { v: "Huff_Q1", l: "Huff Q1" },
              { v: "Huff_Q2", l: "Huff Q2" }, { v: "Huff_Q3", l: "Huff Q3" }, { v: "Huff_Q4", l: "Huff Q4" },
            ]}
            value={distType}
            onChange={setDistType}
            accent={C.accent2}
          />
        </Card>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 9 }}>
        <Kpi value={hiet.Ptotal + " mm"} label="P total" accent={C.accent} sub={`Tr=${Tr}a`} />
        <Kpi
          value={Math.max(...hiet.data.slice(1).map(r => r.iBloque || 0)).toFixed(2) + " mm/h"}
          label="i máxima bloque"
          accent={C.accent3}
        />
        <Kpi value={(hiet.Ptotal * 0.75).toFixed(1) + " mm"} label="P en 1er quartil" accent={C.accent2} sub="~75% en primeros 25%" />
        <Kpi value={`${durH}h · ${dtMin}' · ${hiet.steps}bloq`} label="Configuración" accent={C.muted2} />
        <Kpi value={distType.replace("_", " ")} label="Distribución" accent={distType === "EPM_Q1" ? C.accent2 : C.gold} />
        <Kpi value={name.length > 12 ? name.substring(0, 12) + "…" : name} label="Estación IDF" accent={C.accent4} />
      </div>

      {/* Hietograma de diseño + Parámetros SCS‑CN */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Hietograma de diseño */}
        <Card title={`Hietograma — ${distType} · Tr=${Tr}a · d=${durH}h · Δt=${dtMin}min`} accent={C.accent}>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={dispFilt.slice(1)} margin={{ left: 0, right: 8, bottom: 14, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 8 }}
                     label={{ value: "t (min)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
              <YAxis yAxisId="i" tick={{ fill: C.muted, fontSize: 8 }}
                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 8 }} />
              <YAxis yAxisId="p" orientation="right" tick={{ fill: C.muted, fontSize: 8 }}
                     label={{ value: "P acum (mm)", angle: 90, position: "insideRight", fill: C.muted, fontSize: 8 }} />
              <Tooltip contentStyle={TT} />
              <Bar  yAxisId="i" dataKey="iBloque" fill={C.accent}  radius={[2, 2, 0, 0]} name="i bloque (mm/h)" opacity={0.85} />
              <Line yAxisId="p" type="monotone" dataKey="pAcum"   stroke={C.accent2} strokeWidth={2} dot={false} name="P acum (mm)" />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        {/* Parámetros lluvia efectiva (SCS‑CN) y UH */}
        <Card title="Parámetros lluvia efectiva (SCS‑CN) y UH" accent={C.accent4}>
          {/* Toggles */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
              <input type="checkbox" checked={overrideSCS} onChange={e => setOverrideSCS(e.target.checked)} /> Override SCS‑CN (análisis)
            </label>
            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
              <input type="checkbox" checked={usarAMCauto} onChange={e => setUsarAMCauto(e.target.checked)} /> AMC automático (SIATA)
            </label>
            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
              <input type="checkbox" checked={usarOverrideTc} onChange={e => setUsarOverrideTc(e.target.checked)} /> Override Tc
            </label>
            <label style={{ fontFamily:'monospace', fontSize:11, color:C.muted }}>
              <input
               type="checkbox"
               checked={guardarAMCenPanel}
               onChange={e => setGuardarAMCenPanel(e.target.checked)}
             /> Guardar AMC auto en panel
            </label>
          </div>

          {/* Solo‑lectura u.Override */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {/* CN */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>CN (CNII)</label>
              {overrideSCS ? (
                <input
                  type="number" min={30} max={98} step={0.1} value={CN_ovr}
                  onChange={e => setCN_ovr(+e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
                />
              ) : (
                <Kpi value={CN.toFixed(1)} label="CN" accent={C.accent2} />
              )}
            </div>

            {/* AMC */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>AMC</label>
              {overrideSCS ? (
                <select
                  value={AMC_ovr}
                  onChange={e => setAMC_ovr(e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
                >
                  <option value="I">AMC I</option>
                  <option value="II">AMC II</option>
                  <option value="III">AMC III</option>
                </select>
              ) : (
                <Kpi value={AMC_eff} label="AMC" accent={C.gold} />
              )}
            </div>

            {/* % Impermeable */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>% Impermeable</label>
              {overrideSCS ? (
                <input
                  type="number" min={0} max={100} step={1} value={pctImp_ovr}
                  onChange={e => setPctImp_ovr(+e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
                />
              ) : (
                <Kpi value={`${pctImperv}%`} label="% Imperv" accent={C.accent} />
              )}
            </div>

            {/* A (km²) — KPI para trazabilidad */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>A (km²)</label>
              <Kpi value={`${A_km2}`} label="Área" accent={C.teal} />
            </div>

            {/* Tc (min) — sugerido u override */}
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>Tc (min)</label>
              {usarOverrideTc ? (
                <input
                  type="number" min={1} step={1} value={Tc_override_min}
                  onChange={e => setTcOverride(+e.target.value)}
                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
                />
              ) : (
                <Kpi value={`${Tc_min.toFixed(1)}`} label="Tc sugerido" accent={C.accent4} />
              )}
            </div>
          </div>

          {/* Informes */}
          <div style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 11, color: scsAviso.length ? C.rose : C.muted }}>
            {infoTc}{scsAviso.length ? ` · Aviso: ${scsAviso.join(" · ")}` : ""}
          </div>
          {usarAMCauto && amcAuto && (
            <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 11, color: C.muted2 }}>
              {infoAMC}
            </div>
          )}
        </Card>
      </div>

      {/* ===== Hidrograma Q(t) — Usa hook useHidrograma con valores efectivos ===== */}
      <HidrogramaResultado
        P_mm={P_mm}
        dt_min={dt_min}
        A_km2={A_km2}
        Tc_min={Tc_min}
        CN={CN}
        AMC={AMC_eff}
        pctImperv={pctImperv}
      />

      {/* Distribuciones temporales comparadas */}
      <Card title="Distribuciones Temporales Comparadas — Adimensional" accent={C.accent4}>
        <div ref={refContenedorDistribuciones} style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={distMerge} margin={{ left: 0, right: 14, bottom: 14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="T" tick={{ fill: C.muted, fontSize: 9 }}
                     label={{ value: "Tiempo (%)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
                     label={{ value: "P acum (%)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(1) + "%"]} />
              <Legend wrapperStyle={{ fontSize: 9 }} />
              <Line type="monotone" dataKey="EPM_Q1"  stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)" />
              <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q1" />
              <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q2" />
              <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q3" />
              <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q4" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Botón Exportar PNG */}
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button
            className="btn"
            onClick={() => exportarPNGDesdeRef(refContenedorDistribuciones, "Distribuciones_Adimensional.png")}
          >
            Exportar PNG
          </button>
        </div>
      </Card>

      {/* Intensidades por bloque — Comparativa Distribuciones (Tr activo) */}
      <Card title="Intensidades por Bloque — Comparativa Distribuciones (Tr activo)" accent={C.accent3}>
        <div ref={refContenedorIntensidades} style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={compData} margin={{ left: 0, right: 18, bottom: 14 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 9 }}
                     label={{ value: "t (min)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(2) + " mm/h"]} />
              <Legend wrapperStyle={{ fontSize: 9 }} />
              <Line type="monotone" dataKey="EPM_Q1"  stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1" />
              <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q1" />
              <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q2" />
              <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q3" />
              <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q4" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Botón Exportar PNG */}
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <button
            className="btn"
            onClick={() => exportarPNGDesdeRef(refContenedorIntensidades, "Intensidades_Bloque.png")}
          >
            Exportar PNG
          </button>
        </div>
      </Card>

      {/* Tabla hietograma estructurada */}
      <Card title={`Tabla Hietograma Estructurada — ${distType} · Tr=${Tr}a · P_total=${hiet.Ptotal}mm`} accent={C.muted2}>
        <Tbl
          headers={["t (min)", "T (%)", "P acum (mm)", "ΔP (mm)", "i bloque (mm/h)"]}
          rows={hiet.data
            .slice(1)
            .filter((_, i) => i % Math.max(1, Math.floor(hiet.steps / 40)) === 0)
            .map(r => ({ t: r.t, T: r.tPct, P: r.pAcum, dP: r.pIncrem, i: r.iBloque }))}
          hiCols={[3, 4]}
          accent={C.accent}
        />
      </Card>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════════
// MÓDULO HIDROGRAMAS — 5 Métodos con convolución completa (robusto para gráficas)
// ═══════════════════════════════════════════════════════════════════════════════
function ModHidrogramas({ params, est, name }) {
  // ── Controles superiores
  const [Tr, setTr]       = useState(25);
  const [dtMin, setDtMin] = useState(() => +params.dt || 5);

  // ── CN efectivo (CNact) con default coherente a la UI (60 % imperv.)
  const CNact = useMemo(() => calcCNdinamico({
    amcActual: params.amcActual ?? "II",
    porcentajeImpermeable: params.porcentajeImpermeable ?? 60,
    cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75),
  }), [params.amcActual, params.porcentajeImpermeable, params.cnBase, params.CN]);

  // Verificación temporal (quitar cuando termines la prueba)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[HIDRO]', 'CNact ->', CNact, {
        amc: params.amcActual,
        pImp: params.porcentajeImpermeable,
        cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75)
      });
    }
  }, [CNact, params.amcActual, params.porcentajeImpermeable, params.cnBase, params.CN]);

  // Sincroniza Δt si cambiaste en Parámetros
  useEffect(() => {
    if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt);
  }, [params.dt]);

  // ── Parámetros HU
  const [tcSrc, setTcSrc] = useState(0);       // índice del Tc activo
  const [kR, setKR]       = useState(1.2);     // Clark
  const [Ct, setCt]       = useState(2.0);     // Snyder
  const [Cp, setCp]       = useState(0.62);    // Snyder
  const [CpSCSMod, setCpSCSMod] = useState(2.08); // SCS Mod

  // ── Tc, unidades y pendiente
  const tcList = useMemo(() => calcTc(params).filter(r => isFinite(r.h) && r.h > 0), [params]);
  const tc_h   = tcList[tcSrc]?.h || 0.5;

  const area_mi2 = params.area * 0.386102;
  const L_mi     = params.longitud_cauce * 0.621371;
  const S_m_km   = (params.cota_mayor_cauce - params.cota_menor_cauce) / params.longitud_cauce;

  // ── Hietograma (Tr, 3 h de evento, dtMin, EPM_Q1)
  const hiet = useMemo(() => calcHietograma(est, Tr, 3, dtMin, "EPM_Q1"), [est, Tr, dtMin]);

  // ── Lluvia efectiva con CN efectivo
  const lluvEfect = useMemo(() => calcLluviaEfectiva(hiet, CNact), [hiet, CNact]);

  // ── Unidades Hidrológicas (5 métodos)
  const hu_scs    = useMemo(() => calcHUSCS(params.area, tc_h, dtMin), [params.area, tc_h, dtMin]);
  const hu_scsMod = useMemo(() => calcHUSCS_Mod(params.area, tc_h, dtMin, CpSCSMod), [params.area, tc_h, dtMin, CpSCSMod]);
  const hu_snyder = useMemo(() => calcHUSnyder(area_mi2, L_mi, L_mi * 0.35, dtMin, Ct, Cp), [area_mi2, L_mi, dtMin, Ct, Cp]);
  const hu_wh     = useMemo(() => calcHUWilliamsHann(params.area, params.longitud_cauce, S_m_km, CNact, dtMin), [params, dtMin, CNact]);
  const hu_clark  = useMemo(() => calcClarkIUH(params.area, tc_h, dtMin, kR), [params.area, tc_h, dtMin, kR]);

  // ── Convolución (Pe * HU) → hidrogramas por método
  const hidros = useMemo(() => (
    [hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark].map(hu => calcHidroCompleto(lluvEfect, hu, dtMin))
  ), [lluvEfect, hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark, dtMin]);

  // ── Resumen rápido (si ya usas buildResumenQ, úsalo)
  const resumenQ = useMemo(() => buildResumenQ(params, est, dtMin, CNact), [params, est, dtMin, CNact]);

  /* ──────────────────────────────────────────────────────────────
     DEBUG TEMPORAL: inspeccionar etiquetas de método
     ────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas resumenQ:', (resumenQ ?? []).map(r => r.nombre ?? r.metodo));
  }, [resumenQ]);

  useEffect(() => {
    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas hidros:', (hidros ?? []).map(h => h.metodo));
  }, [hidros]);

  /* ──────────────────────────────────────────────────────────────
     Parche condicional Snyder (cfs → m³/s) y copia segura: hidrosCorr
     ────────────────────────────────────────────────────────────── */
  const factorCFS2M3S   = 0.028316846592;
  // Política: 'auto' | 'force' | 'off'
  const SNYDER_POLICY   = 'auto';
  // Umbral para 'auto' (ratio Qp(Snyder)/max(Qp otros))
  const SNYDER_THRESHOLD = 12;

  const hidrosCorr = useMemo(() => {
    const arr = (hidros ?? []).map(h => ({ ...h }));
    const idxSny = arr.findIndex(h => /snyder/i.test(h.metodo));
    if (idxSny >= 0) {
      const h = arr[idxSny];

      const qpSny = (h.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0);
      const qpOtros = Math.max(
        ...arr.filter((_,i)=> i !== idxSny).map(o =>
          (o.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0)
        ),
        1
      );

      let needConvert = false;
      if (SNYDER_POLICY === 'force')       needConvert = true;
      else if (SNYDER_POLICY === 'auto')   needConvert = (qpSny > qpOtros * SNYDER_THRESHOLD);
      // 'off' → no convierte

      if (needConvert) {
        h.qSeries = (h.qSeries ?? []).map(p => ({ ...p, Q: p.Q * factorCFS2M3S }));
        h.metodo  = `${h.metodo} (SI)`; // trazabilidad en la leyenda
        if (import.meta.env.DEV) console.warn('[FIX] Snyder convertido cfs→m³/s', { qpSny, qpOtros, ratio: qpSny/qpOtros });
      } else if (import.meta.env.DEV) {
        console.log('[INFO] Snyder sin conversión', { qpSny, qpOtros, ratio: qpSny/qpOtros });
      }
    }
    return arr;
  }, [hidros]);

  /* ──────────────────────────────────────────────────────────────
     Selección ROBUSTA de Williams & Hann (W&H) + fallback a series
     ────────────────────────────────────────────────────────────── */
  const whAliases = [
    'w & hann', 'w&h', 'w & h',
    'williams & hann', 'williams&hann', 'williams & h',
    'wh', 'williamshann', 'w hann'
  ];
  const matchWH = (s) => {
    if (!s) return false;
    const t = String(s).toLowerCase().replace(/\s+/g, ' ').trim();
    return whAliases.some(a => t.includes(a));
  };
  let rWH = (resumenQ ?? []).find(r => matchWH(r.nombre ?? r.metodo)) || {};
  if (!rWH.Qpico || !rWH.tpico) {
    const wh = (hidrosCorr ?? []).find(h => matchWH(h.metodo)); // ← usa corregidas
    if (wh?.qSeries?.length) {
      const pico = wh.qSeries.reduce((m, p) => (p.Q > m.Q ? p : m), { Q: 0, t: 0 });
      rWH = { ...(rWH ?? {}), Qpico: rWH.Qpico ?? pico.Q, tpico: rWH.tpico ?? pico.t, nombre: rWH.nombre ?? wh.metodo };
    }
  }

  // ── Totales de Pe
  const lePe = useMemo(() => lluvEfect.reduce((s, r) => s + (r.PeIncrem || 0), 0), [lluvEfect]);

  // ───────────────────────────────────────────────────────────────
  //  FORTALECER GRÁFICAS: seriesOK, n, step, combined, noData (usa hidrosCorr)
  // ───────────────────────────────────────────────────────────────
  const seriesOK = useMemo(() => {
    return (hidrosCorr ?? []).filter(h =>
      Array.isArray(h?.qSeries) && h.qSeries.length > 0
    );
  }, [hidrosCorr]);

  const n = useMemo(() => {
    const lens = seriesOK.map(h => h.qSeries.length);
    return lens.length ? Math.max(...lens) : 0;
  }, [seriesOK]);

  const step = useMemo(() => (n <= 0 ? 1 : Math.max(1, Math.floor(n / 100))), [n]);

  const combined = useMemo(() => {
    if (n <= 0) return [];
    const L = Math.ceil(n / step);
    const out = Array.from({ length: L }, (_, i) => {
      const idx = i * step;
      const obj = { t: +((idx * dtMin) || 0).toFixed(1) };
      seriesOK.forEach(h => {
        obj[h.metodo] = h.qSeries[idx]?.Q ?? 0; // clave = nombre del método
      });
      return obj;
    });
    return out;
  }, [seriesOK, n, step, dtMin]);

  const noData = combined.length === 0;

  // (Opcional) diagnóstico de series en consola
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    console.log('[DEBUG] seriesOK:', seriesOK.map(h => ({ metodo: h.metodo, len: h.qSeries?.length })));
    console.log('[DEBUG] combined len:', combined.length, 'n=', n, 'step=', step);
  }, [seriesOK, combined, n, step]);

  // ── Paleta por método (si no existe arriba en tu archivo)
  const methodColors = {
    'SCS':              '#4ECDC4',
    'SCS Mod.':         '#94D82D',
    'Snyder':           '#F59F00',
    'Snyder (SI)':      '#F59F00',
    'W & Hann':         '#845EF7',
    'Williams & Hann':  '#845EF7',
    'Clark IUH':        '#20C997'
  };

  // ── Render
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
      {/* Encabezado Lluvia Efectiva */}
      <Card title={`Lluvia Efectiva — CN=${CNact} → Pe total = ${lePe.toFixed(2)} mm`} accent={C.accent}>
        {/* CHIP de trazabilidad */}
        <div style={{
          display:'inline-block', margin:'8px 0', padding:'6px 10px',
          border:'1px solid rgba(255,255,255,0.15)', borderRadius:8,
          fontFamily:'monospace', fontSize:12, opacity:0.9
        }}>
          CN base: {Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75)}
          {'  →  '} CN efectivo: {CNact}
          {'  |  '} AMC {params.amcActual ?? 'II'}
          {'  |  '} % Imperv: {params.porcentajeImpermeable ?? 60}%
        </div>

        {/* Mini‑resumen W&H (Qpico/tpico) */}
        <div style={{ marginTop:8, display:'flex', gap:12, flexWrap:'wrap', fontFamily: mono, fontSize: 12, color: C.muted2 }}>
          <span style={{color:C.accent3}}>{rWH.nombre ?? 'W&H'}</span>
          <span>Qp = <b style={{color:C.text}}>{(rWH.Qpico ?? 0).toFixed(2)}</b> m³/s</span>
          <span>tp = <b style={{color:C.text}}>{(rWH.tpico ?? 0).toFixed(0)}</b> min</span>
        </div>
      </Card>

      {/* ===== Gráfica Q(t) — Convolución completa (segura) ===== */}
      <div style={{ width:'100%', height: 380, border:'1px solid #1F2F45', borderRadius: 10, background:'#0B0F1A' }}>
        {noData ? (
          <div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color: C.muted }}>
            Sin datos para graficar — verifica hietograma, CN y HU
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combined} margin={{ top: 12, right: 24, bottom: 16, left: 8 }}>
              <CartesianGrid stroke="#223" strokeDasharray="3 3" />
              <XAxis
                dataKey="t"
                tick={{ fill:'#9AA4B2', fontSize: 11 }}
                label={{ value:'t (min)', position:'insideBottomRight', offset:-8, fill:'#9AA4B2' }}
              />
              <YAxis
                tick={{ fill:'#9AA4B2', fontSize: 11 }}
                label={{ value:'Q (m³/s)', angle:-90, position:'insideLeft', offset: 10, fill:'#9AA4B2' }}
              />
              <Tooltip wrapperStyle={{ background:'#0F1624', border:'1px solid #1F2F45' }} />
              <Legend wrapperStyle={{ color:'#9AA4B2' }} />
              {seriesOK.map(h => (
                <Line
                  key={h.metodo}
                  type="monotone"
                  dataKey={h.metodo}
                  stroke={methodColors[h.metodo] ?? '#8884d8'}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* …si tienes más controles, tarjetas por método y comparativas de HU, déjalos debajo… */}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MÓDULO SAR — GT-AS-004 §3 Almacenamiento y Regulación (COMPLETO)
// ═══════════════════════════════════════════════════════════════════════════════
function ModSAR({params,est,name}){
  const [Tr,setTr]=useState(25);
  const [durH,setDurH]=useState(3);
  const [dtMin,setDtMin]=useState(()=>+params.dt||5);
  useEffect(()=>{ if(params.dt&&+params.dt!==dtMin) setDtMin(+params.dt); },[params.dt]);
  const [siPct,setSiPct]=useState(80);
  const [catSAR,setCatSAR]=useState("Intermedios");
  const [distType,setDistType]=useState("EPM_Q1");
  const [metodoPost,setMetodoPost]=useState("SCS");
  const reportRef=useRef();

  const TrRec={Menores:2.33,Intermedios:5,Mayores:25};

  const cnII_post  = +Math.min(cnMixto(siPct),98).toFixed(1);
  const cnIII_post = +cnII_to_III(cnII_post).toFixed(2);
  const cnIII_pre  = 93.5;

  // Hietograma de diseño
  const hiet=useMemo(()=>calcHietograma(est,Tr,durH,dtMin,distType),[est,Tr,durH,dtMin,distType]);
  const lluvPost=useMemo(()=>calcLluviaEfectiva(hiet,cnIII_post),[hiet,cnIII_post]);
  const lluvPre =useMemo(()=>calcLluviaEfectiva(hiet,cnIII_pre),[hiet]);

  // Tc Témez para la cuenca
  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  const tc_h=tcList[0]?.h||0.5;
  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;

  // Método hidrograma post-urbano seleccionable
  const huPost=useMemo(()=>{
    if(metodoPost==="Clark") return calcClarkIUH(params.area,tc_h,dtMin,1.2);
    if(metodoPost==="Snyder") return calcHUSnyder(params.area*0.386102,params.longitud_cauce*0.621371,params.longitud_cauce*0.621371*0.35,dtMin);
    if(metodoPost==="WH") return calcHUWilliamsHann(params.area,params.longitud_cauce,S_m_km,cnIII_post,dtMin);
    return calcHUSCS(params.area,tc_h,dtMin);
  },[metodoPost,params,tc_h,dtMin,cnIII_post]);

  const qPost=useMemo(()=>calcHidroCompleto(lluvPost,huPost,dtMin),[lluvPost,huPost,dtMin]);
  const huPre=useMemo(()=>calcHUSCS(params.area,tc_h,dtMin),[params.area,tc_h,dtMin]);
  const qPre =useMemo(()=>calcHidroCompleto(lluvPre,huPre,dtMin),[lluvPre,huPre,dtMin]);

  const volSAR=useMemo(()=>calcVolSAR(qPost.qSeries,qPre.qSeries,dtMin),[qPost,qPre,dtMin]);

  const step=Math.max(1,Math.floor(volSAR.excesos.length/120));
  const dispData=volSAR.excesos.filter((_,i)=>i%step===0).slice(0,140);
  const reduccion=qPost.Qpico>0?(100*(qPost.Qpico-qPre.Qpico)/qPost.Qpico).toFixed(1):0;

  const exportDatos={
    nombre_cuenca:params.nombre_cuenca,area:params.area,perimetro:params.perimetro,
    longitud_cauce:params.longitud_cauce,pendiente_cuenca:params.pendiente_cuenca,
    cota_max:params.cota_max,cota_min:params.cota_min,CN:params.CN,
    tc_h,stn:name,Tr,dur_h:durH,distType,dt_min:dtMin,Ptotal:hiet.Ptotal,
    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
    hiet,
    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
    volSAR,
  };

  return(<div style={{display:"flex",flexDirection:"column",gap:14}} ref={reportRef}>
    {/* Banner normativo */}
    <div style={{background:`linear-gradient(135deg,${C.accent2}0A,${C.accent4}08)`,border:`1px solid ${C.accent2}25`,borderRadius:12,padding:"12px 18px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
      <div style={{flexShrink:0}}>
        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em"}}>Guía Técnica GT-AS-004 · §3 Diseño Hidrológico · Rev.0 · 2026-01-07</div>
        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>Diseño de Sistemas de Almacenamiento y Regulación de Aguas Lluvias</div>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginLeft:"auto"}}>
        <button onClick={()=>exportarExcel(exportDatos)} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${C.accent2}40`,background:`${C.accent2}12`,color:C.accent2,fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700}}>⬇ Excel</button>
        <button onClick={()=>exportarPDF(reportRef.current,exportDatos)} style={{padding:"6px 14px",borderRadius:7,border:`1px solid ${C.accent3}40`,background:`${C.accent3}12`,color:C.accent3,fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700}}>⬇ PDF</button>
      </div>
    </div>

    {/* Controles */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}}>
      <Card title="Categoría SAR" accent={C.accent4}>
        {["Menores","Intermedios","Mayores"].map(c=>(
          <button key={c} onClick={()=>{setCatSAR(c);setTr(TrRec[c]);}} style={{display:"block",width:"100%",margin:"2px 0",padding:"4px 8px",borderRadius:5,border:"none",cursor:"pointer",background:catSAR===c?C.accent4:`${C.accent4}12`,color:catSAR===c?C.bg:C.muted,fontSize:9,fontFamily:mono,fontWeight:catSAR===c?700:400,textAlign:"left"}}>
            {c} <span style={{opacity:.55}}>Tr={TrRec[c]}a</span>
          </button>
        ))}
      </Card>
      <Card title="Tr Diseño" accent={C.gold}>
        <BtnGroup options={TR_LIST.map(t=>({v:t,l:`${t}a`}))} value={Tr} onChange={setTr} accent={C.gold}/>
      </Card>
      <Card title="Duración" accent={C.accent3}>
        <BtnGroup options={[1,2,3,6].map(h=>({v:h,l:`${h}h`}))} value={durH} onChange={setDurH} accent={C.accent3}/>
      </Card>
      <Card title="Δt" accent={C.accent}>
        <BtnGroup options={[5,10,15,30].map(d=>({v:d,l:`${d}'`}))} value={dtMin} onChange={setDtMin} accent={C.accent}/>
      </Card>
      <Card title="Dist. temporal" accent={C.teal}>
        <BtnGroup options={[
          {v:"EPM_Q1",l:"EPM"},{v:"Huff_Q1",l:"H.Q1"},
          {v:"Huff_Q2",l:"H.Q2"},{v:"Huff_Q3",l:"H.Q3"},{v:"Huff_Q4",l:"H.Q4"}
        ]} value={distType} onChange={setDistType} accent={C.teal}/>
      </Card>
      <Card title="% Sup. Impermeable" accent={C.rose}>
        <BtnGroup options={[20,40,60,80,100].map(s=>({v:s,l:`${s}%`}))} value={siPct} onChange={setSiPct} accent={C.rose}/>
        <div style={{marginTop:6,fontSize:9,color:C.muted,fontFamily:mono}}>CNIII post={cnIII_post}</div>
        <div style={{marginTop:2,fontSize:9,color:C.muted,fontFamily:mono}}>Método:</div>
        <BtnGroup options={[{v:"SCS",l:"SCS"},{v:"Clark",l:"Clark"},{v:"Snyder",l:"Snyder"},{v:"WH",l:"W&H"}]}
          value={metodoPost} onChange={setMetodoPost} accent={C.rose}/>
      </Card>
    </div>

    {/* KPIs principales */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
      <Kpi value={hiet.Ptotal+" mm"} label="P total diseño" accent={C.accent} sub={`Tr=${Tr}a, d=${durH}h`}/>
      <Kpi value={cnIII_post.toFixed(1)} label="CN post (CNIII)" accent={C.rose} sub={`SI=${siPct}%`}/>
      <Kpi value={cnIII_pre.toFixed(1)} label="CN pre (CNIII)" accent={C.accent2} sub="Pastizales pobres"/>
      <Kpi value={qPost.Qpico.toFixed(4)+" m³/s"} label={`Q pico POST (${metodoPost})`} accent={C.accent3}/>
      <Kpi value={qPre.Qpico.toFixed(4)+" m³/s"} label="Q pico PRE (SCS)" accent={C.accent2}/>
      <Kpi value={reduccion+"%"} label="Reducción pico" accent={C.gold}/>
      <Kpi value={volSAR.volTotal.toFixed(0)+" m³"} label="V almacenamiento" accent={C.accent4}/>
      <Kpi value={catSAR} label="Categoría SAR" accent={C.teal} sub={`Borde libre ${catSAR==="Menores"?">0.10m":catSAR==="Intermedios"?">0.25m":">0.50m"}`}/>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {/* Hietograma de diseño */}
      <Card title={`Hietograma SAR — ${distType} · Tr=${Tr}a · d=${durH}h`} accent={C.accent}>
        <ResponsiveContainer width="100%" height={230}>
          <ComposedChart data={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/50))===0)} margin={{left:0,right:8,bottom:14,top:6}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="t" tick={{fill:C.muted,fontSize:8}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="i" tick={{fill:C.muted,fontSize:8}} label={{value:"i (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:8}}/>
            <YAxis yAxisId="p" orientation="right" tick={{fill:C.muted,fontSize:8}} label={{value:"P (mm)",angle:90,position:"insideRight",fill:C.muted,fontSize:8}}/>
            <Tooltip contentStyle={TT}/>
            <Bar yAxisId="i" dataKey="iBloque" fill={C.accent} radius={[2,2,0,0]} name="i (mm/h)" opacity={0.8}/>
            <Line yAxisId="p" type="monotone" dataKey="pAcum" stroke={C.accent2} strokeWidth={2} dot={false} name="P acum (mm)"/>
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Distribución temporal adimensional */}
      <Card title="Distribución Temporal Activa + Comparativa Huff" accent={C.accent2}>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart data={HUFF_MERGED} margin={{left:0,right:14,bottom:14}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="T" tick={{fill:C.muted,fontSize:9}} label={{value:"Tiempo (%)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"P (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
            <Tooltip contentStyle={TT} formatter={v=>[v?.toFixed(1)+"%"]}/>
            <Legend wrapperStyle={{fontSize:9}}/>
            <Line type="monotone" dataKey="EPM_Q1" stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)"/>
            <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q1"/>
            <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q2"/>
            <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3} strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q3"/>
            <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4} strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q4"/>
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>

    {/* Hidrogramas POST vs PRE */}
    <Card title={`Hidrogramas SAR — POST (${metodoPost}, CN=${cnIII_post}) vs PRE (SCS, CN=${cnIII_pre}) · V_SAR=${volSAR.volTotal.toFixed(0)} m³`} accent={C.accent3}>
      <ResponsiveContainer width="100%" height={290}>
        <AreaChart data={dispData} margin={{left:0,right:18,top:8,bottom:14}}>
          <defs>
            <linearGradient id="gPost" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent3} stopOpacity={0.35}/><stop offset="95%" stopColor={C.accent3} stopOpacity={0}/></linearGradient>
            <linearGradient id="gPre"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent2} stopOpacity={0.25}/><stop offset="95%" stopColor={C.accent2} stopOpacity={0}/></linearGradient>
            <linearGradient id="gVol"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold}    stopOpacity={0.20}/><stop offset="95%" stopColor={C.gold}    stopOpacity={0}/></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
          <XAxis dataKey="t" tick={{fill:C.muted,fontSize:9}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:10}}/>
          <YAxis yAxisId="q" tick={{fill:C.muted,fontSize:9}} label={{value:"Q (m³/s)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:10}}/>
          <YAxis yAxisId="v" orientation="right" tick={{fill:C.muted,fontSize:9}} label={{value:"V acum (m³)",angle:90,position:"insideRight",fill:C.muted,fontSize:9}}/>
          <Tooltip contentStyle={TT} formatter={(v,nm)=>[nm.includes("Vol")?v.toFixed(0)+" m³":v.toFixed(5)+" m³/s",nm]}/>
          <Legend wrapperStyle={{fontSize:9}}/>
          <Area yAxisId="q" type="monotone" dataKey="Qpost" stroke={C.accent3} fill="url(#gPost)" strokeWidth={2.5} name={`Q post (${metodoPost})`} dot={false}/>
          <Area yAxisId="q" type="monotone" dataKey="Qpre"  stroke={C.accent2} fill="url(#gPre)"  strokeWidth={2.5} name="Q pre (SCS)" dot={false}/>
          <Area yAxisId="v" type="monotone" dataKey="volAcum" stroke={C.gold} fill="url(#gVol)" strokeWidth={1.5} name="Vol. SAR acum. (m³)" dot={false}/>
        </AreaChart>
      </ResponsiveContainer>
    </Card>

    {/* CN y clasificación */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
      <Card title="CN — GT-AS-004 Tabla 5 (CNIII)" accent={C.rose}>
        <Tbl headers={["Descripción","SI%","CNII","CNIII"]} rows={[
          {D:"Suelo urbano 100%",S:100,II:98.0,III:+cnII_to_III(98).toFixed(2)},
          {D:`Mixta (${siPct}% imp.)`,S:siPct,II:+cnII_post,III:+cnIII_post},
          {D:"Natural (pastizales)",S:0,II:86,III:93.5},
        ]} accent={C.rose}/>
      </Card>
      <Card title="Clasificación SAR — Tabla 1 y 2" accent={C.accent4}>
        <Tbl headers={["Categoría","Área (ha)","Tr (a)","Borde libre"]} rows={[
          {C:"Menores",A:"< 0.2",T:2.33,B:"≥ 0.10 m"},
          {C:"Intermedios",A:"0.2–5.0",T:5,B:"≥ 0.25 m"},
          {C:"Mayores",A:"> 5.0",T:">25",B:"≥ 0.50 m"},
        ]} accent={C.accent4}/>
        <div style={{marginTop:8,background:C.bg,borderRadius:6,padding:"6px 10px",fontFamily:mono,fontSize:9}}>
          <span style={{color:C.accent4,fontWeight:700}}>Activo: </span><span style={{color:C.text}}>{catSAR} · Tr={Tr}a</span>
        </div>
      </Card>
      <Card title="Resumen SAR — GT-AS-004 §3" accent={C.gold}>
        {[
          ["Categoría SAR",catSAR],["Tr de diseño",`${Tr} años`],
          ["Duración lluvia",`${durH} h`],["Distribución",distType.replace("_"," ")],
          ["P total diseño",`${hiet.Ptotal} mm`],["Método HU POST",metodoPost],
          ["CN post (CNIII)",`${cnIII_post} (SI=${siPct}%)`],["CN pre (CNIII)","93.5"],
          ["Q pico POST",`${qPost.Qpico.toFixed(4)} m³/s`],["Q pico PRE (reg.)",`${qPre.Qpico.toFixed(4)} m³/s`],
          ["Reducción pico",`${reduccion}%`],["V almacenamiento",`${volSAR.volTotal.toFixed(0)} m³`],
        ].map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.border}15`,fontFamily:mono,fontSize:9}}>
            <span style={{color:C.muted}}>{l}</span>
            <span style={{color:C.text,fontWeight:600}}>{v}</span>
          </div>
        ))}
      </Card>
    </div>

    {/* Tabla hietograma estructurada */}
    <Card title={`Hietograma de Diseño SAR — Tabla Estructurada · P_total=${hiet.Ptotal}mm · Tr=${Tr}a`} accent={C.muted2}>
      <Tbl headers={["t (min)","T (%)","P acum (mm)","ΔP (mm)","i bloque (mm/h)","Pe post (mm)","Pe pre (mm)"]}
        rows={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/36))===0).map((r,idx)=>{
          const rPost=lluvPost[idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPost[lluvPost.length-1];
          const rPre =lluvPre [idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPre [lluvPre.length-1];
          return{t:r.t,T:r.tPct,P:r.pAcum,dP:r.pIncrem,i:r.iBloque,
            PePost:rPost?.Pe||0,PePre:rPre?.Pe||0};
        })}
        hiCols={[3,4]} accent={C.accent}/>
    </Card>

    {/* Nota técnica */}
    <div style={{background:`${C.teal}08`,border:`1px solid ${C.teal}20`,borderRadius:10,padding:"11px 15px",fontFamily:mono,fontSize:9,color:C.muted,lineHeight:1.7}}>
      <span style={{color:C.teal,fontWeight:700}}>Notas metodológicas GT-AS-004: </span>
      § 3.4 Pérdidas: Método SCS-CN · Condición humedad AMC III · §3.5 HU SCS: lag time=60%·Tc · §3.8 Volumen excedente=∫(Qpost−Qpre)dt · §3.9 Caudal regulado=Qpico(pre) · Distribución temporal: Primer Cuartil (Gallego et al., 2024) · Curvas Huff: Distribuciones Illinois-ISWS (probabilidad 50%)
    </div>
  </div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MÓDULO MÉTODO RACIONAL
// ═══════════════════════════════════════════════════════════════════════════════
function ModRacional({params,est,name}){
  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  const tc_min=useMemo(()=>tcList.reduce((s,r)=>s+r.min,0)/(tcList.length||1),[tcList]);
  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
    </div>
    <Card title="Caudales Racionales — Todos los Tr" accent={C.gold}>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={res} margin={{left:0,right:18,top:8}}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
          <XAxis dataKey="Tr" tick={{fill:C.muted,fontSize:10}} label={{value:"Tr (años)",position:"insideBottom",offset:-4,fill:C.muted,fontSize:10}}/>
          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Q (m³/s)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:10}}/>
          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" "+nm]}/>
          <Legend wrapperStyle={{fontSize:10}}/>
          <Bar dataKey="Q" fill={C.gold} radius={[3,3,0,0]} name="Q (m³/s)"/>
          <Bar dataKey="C" fill={C.accent2} radius={[3,3,0,0]} name="Coef. C"/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
    <Card title="Tabla — Parámetros y Caudales Racionales" accent={C.gold}>
      <Tbl headers={["Tr (a)","I (mm/h)","P (mm)","Coef. C","Q (m³/s)"]} rows={res} hiCols={[4]} accent={C.gold}/>
    </Card>
  </div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════
// DATOS SIATA — Red hidrometeorológica AMVA (Excel + catálogo oficial)
// Fuente: imagen Excel proporcionada + enriquecimiento SIATA
// ═══════════════════════════════════════════════════════════════════════════════
const ESTACIONES_SIATA=[
  {codigo:"2701034",nombre:"MAZO",                lat:6.25702778,lon:-75.50166667,alt:2480,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:78.4,I60_obs:55.2,epm_key:"MAZO"},
  {codigo:"2701035",nombre:"CHORRILLOS",           lat:6.29672222,lon:-75.5033889, alt:2370,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:72.1,I60_obs:50.8,epm_key:"CHORRILLOS"},
  {codigo:"2701036",nombre:"CALDAS",               lat:6.05300000,lon:-75.62775000,alt:1930,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:65.3,I60_obs:46.1,epm_key:"CALDAS"},
  {codigo:"2701037",nombre:"FABRICATO",            lat:6.36188883,lon:-75.60018886,alt:2422,red:"EPM-SIATA",vars:["P","T","HR","N.Cauce"],   estado:"Activa",      I30_obs:88.5,I60_obs:62.3,epm_key:"FABRICATO"},
  {codigo:"2701038",nombre:"SAN ANTONIO DE PRADO", lat:6.18508333,lon:-75.65997222,alt:2000,red:"EPM-SIATA",vars:["P","T","HR","HumSuelo"], estado:"Activa",      I30_obs:70.2,I60_obs:49.4,epm_key:"SAN ANTONIO DE PRADO"},
  {codigo:"2701045",nombre:"VILLA HERMOSA PLANTA", lat:6.25697222,lon:-75.54752778,alt:1690,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:58.7,I60_obs:41.2,epm_key:"VILLA HERMOSA"},
  {codigo:"2701046",nombre:"SAN CRISTOBAL",        lat:6.28138889,lon:-75.63627778,alt:1890,red:"EPM-SIATA",vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:67.9,I60_obs:47.8,epm_key:"SAN CRISTOBAL"},
  {codigo:"2701053",nombre:"ALTO SAN ANDRES",      lat:6.42943954,lon:-75.43994360,alt:2240,red:"SIATA",    vars:["P","T"],                  estado:"Mantenimiento",I30_obs:74.3,I60_obs:52.1,epm_key:null},
  {codigo:"2308023",nombre:"PALMAS LAS",           lat:6.15225492,lon:-75.53550040,alt:2550,red:"IDEAM-SIATA",vars:["P","T","HR","Viento","Rad"],estado:"Activa",   I30_obs:91.2,I60_obs:64.1,epm_key:"PALMAS"},
  {codigo:"2308024",nombre:"VASCONIA",             lat:6.20425000,lon:-75.48047220,alt:2537,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:82.6,I60_obs:58.0,epm_key:"VASCONIA"},
  {codigo:"2308027",nombre:"RIONEGRO LA MACARENA", lat:6.15669120,lon:-75.48040720,alt:2131,red:"IDEAM",    vars:["P","T","HR","Viento"],    estado:"Activa",      I30_obs:60.4,I60_obs:42.5,epm_key:"MACARENA"},
  {codigo:"2701517",nombre:"MEDELLIN",             lat:6.25296809,lon:-75.56863300,alt:1491,red:"EPM-SIATA",vars:["P","T","HR","Viento","Rad","PA"],estado:"Activa",I30_obs:62.8,I60_obs:44.2,epm_key:"MEDELLIN"},
  {codigo:"2701093",nombre:"AYURA",                lat:6.16569444,lon:-75.56591667,alt:1750,red:"EPM-SIATA",vars:["P","T","HR","HumSuelo"],  estado:"Activa",      I30_obs:68.1,I60_obs:47.9,epm_key:"AYURA"},
  {codigo:"2308760",nombre:"RN-1B REBOSE BOMB PA", lat:6.09249561,lon:-75.49029020,alt:2167,red:"EPM",      vars:["P","N.Cauce"],           estado:"Activa",      I30_obs:75.9,I60_obs:53.5,epm_key:null},
  {codigo:"2701076",nombre:"NIQUIA",               lat:6.34627778,lon:-75.54586111,alt:1439,red:"SIATA",    vars:["P","T","HR","N.Cauce"],   estado:"Activa",      I30_obs:63.5,I60_obs:44.7,epm_key:"NIQUIA"},
  {codigo:"2701122",nombre:"COPACABANA",           lat:6.33661111,lon:-75.51086111,alt:1580,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:61.2,I60_obs:43.1,epm_key:"COPACABANA"},
  {codigo:"2701481",nombre:"PEDREGAL",             lat:6.30494444,lon:-75.57422222,alt:1622,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:59.8,I60_obs:42.1,epm_key:"PEDREGAL"},
];

// ─── SERIE TEMPORAL SIATA SIMULADA (evento convectivo realista AMVA) ─────────
function generarSerieSIATA(semilla=42){
  const rng=s=>{const x=Math.sin(s+1)*10000;return x-Math.floor(x);};
  const base=[0,0,0,0,0,0.3,0.6,1.5,4.2,9.8,16.4,24.1,19.8,13.2,8.1,4.6,2.3,1.1,0.5,0.2,0,0,0,0];
  return base.map((v,i)=>({
    t:i*15, lluvia:+(v*(0.82+rng(semilla+i)*0.36)).toFixed(2),
    humSuelo:+(0.32+rng(semilla+i+50)*0.28).toFixed(3),
    nivelCauce:v>5?+(0.75+v*0.09*rng(semilla+i+100)).toFixed(3):+(0.28+rng(semilla+i+100)*0.12).toFixed(3),
    temp:+(18+rng(semilla+i+200)*6).toFixed(1),
  })).map((r,i,a)=>({...r,acum:+(a.slice(0,i+1).reduce((s,x)=>s+x.lluvia,0)).toFixed(2)}));
}

// ─── MOTOR DE PONDERACIÓN ─────────────────────────────────────────────────────
function distKm(lat1,lon1,lat2,lon2){
  const dLat=(lat2-lat1)*111.32;
  const dLon=(lon2-lon1)*111.32*Math.cos((lat1+lat2)/2*Math.PI/180);
  return Math.sqrt(dLat**2+dLon**2);
}

function calcIDW(ests,latC,lonC,p=2){
  const rows=ests.map(e=>({...e,d:distKm(latC,lonC,e.lat,e.lon)}));
  const w=rows.map(e=>1/Math.pow(Math.max(e.d,0.1),p));
  const wT=w.reduce((s,x)=>s+x,0);
  return rows.map((e,i)=>({...e,dist:+e.d.toFixed(3),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
}

function calcThiessen(ests,latC,lonC){
  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
  const dMx=Math.max(...d),dMn=Math.min(...d);
  const w=d.map(v=>1-(v-dMn)/(dMx-dMn+0.001));
  const wT=w.reduce((s,x)=>s+x,0);
  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
}

function calcAltitudinal(ests,altC,latC,lonC){
  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
  const dA=ests.map(e=>Math.abs(e.alt-altC));
  const dAMx=Math.max(...dA)+1;
  const w=ests.map((e,i)=>(1-dA[i]/dAMx)*0.5+(1/Math.pow(Math.max(d[i],0.1),1.5))*0.5);
  const wT=w.reduce((s,x)=>s+x,0);
  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),dAlt:+dA[i].toFixed(0),pct:+(w[i]/wT*100).toFixed(2),peso:+(w[i]/wT).toFixed(5)}));
}

function calcCompuesto(ests,latC,lonC,altC){
  const d=ests.map(e=>distKm(latC,lonC,e.lat,e.lon));
  const dA=ests.map(e=>Math.abs(e.alt-altC));
  const iObs=ests.map(e=>e.I30_obs||60);
  const norm=arr=>{const mx=Math.max(...arr),mn=Math.min(...arr);return arr.map(v=>(v-mn)/(mx-mn+0.001));};
  const wD=norm(d).map(v=>1-v);
  const wA=norm(dA).map(v=>1-v);
  const wI=norm(iObs);
  const wR=ests.map(e=>e.red==="EPM-SIATA"?1:e.red==="SIATA"?0.85:e.red==="IDEAM-SIATA"?0.75:0.6);
  const s=ests.map((_,i)=>wD[i]*0.40+wA[i]*0.25+wI[i]*0.20+wR[i]*0.15);
  const sT=s.reduce((a,b)=>a+b,0);
  return ests.map((e,i)=>({...e,dist:+d[i].toFixed(3),dAlt:+dA[i].toFixed(0),
    score:+s[i].toFixed(4),pct:+(s[i]/sT*100).toFixed(2),peso:+(s[i]/sT).toFixed(5)
  })).sort((a,b)=>b.score-a.score).map((e,j)=>({...e,rank:j+1,dominante:j===0}));
}

function calcIDFPond(ests,d_min,Tr){
  const con=ests.filter(e=>e.epm_key&&ESTACIONES_EPM[e.epm_key]);
  if(!con.length) return 0;
  const wT=con.reduce((s,e)=>s+e.peso,0);
  return wT>0?con.reduce((s,e)=>s+idfI(ESTACIONES_EPM[e.epm_key],d_min,Tr)*e.peso,0)/wT:0;
}

// ─── SVG MAPA AMVA ────────────────────────────────────────────────────────────
function MapaAMVA({ests,cLat,cLon,selIdx,onSel,showLabels=true}){
  const W=500,H=400;
  const LAT_MIN=5.93,LAT_MAX=6.52,LON_MIN=-75.82,LON_MAX=-75.33;
  const toXY=(lat,lon)=>[(lon-LON_MIN)/(LON_MAX-LON_MIN)*W,(1-(lat-LAT_MIN)/(LAT_MAX-LAT_MIN))*H];
  const[cx,cy]=toXY(cLat,cLon);
  const maxPct=Math.max(...ests.map(e=>e.pct||0),0.1);

  return(<svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{background:C.bg,borderRadius:8,border:`1px solid ${C.border}`,display:"block"}}>
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="55%" r="65%">
        <stop offset="0%" stopColor="#0B1820"/>
        <stop offset="100%" stopColor="#070910"/>
      </radialGradient>
    </defs>
    <rect width={W} height={H} fill="url(#bgGrad)"/>
    {/* Grid */}
    {[6.0,6.1,6.2,6.3,6.4,6.5].map(lat=>{const[,y]=toXY(lat,-75.5);return(
      <g key={lat}><line x1={0} y1={y} x2={W} y2={y} stroke={C.border} strokeWidth={0.5} opacity={0.5}/>
        <text x={3} y={y-2} fill={C.muted} fontSize={7} fontFamily="monospace">{lat.toFixed(1)}°</text></g>);})}
    {[-75.7,-75.6,-75.5,-75.4].map(lon=>{const[x]=toXY(6.2,lon);return(
      <g key={lon}><line x1={x} y1={0} x2={x} y2={H} stroke={C.border} strokeWidth={0.5} opacity={0.5}/>
        <text x={x+2} y={H-3} fill={C.muted} fontSize={7} fontFamily="monospace">{lon}°</text></g>);})}
    {/* Río Medellín */}
    <path d={`M ${toXY(5.96,-75.66).join(",")} Q ${toXY(6.08,-75.62).join(",")} ${toXY(6.22,-75.57).join(",")} Q ${toXY(6.34,-75.56).join(",")} ${toXY(6.47,-75.54).join(",")}`}
      stroke="#0A3A5A" strokeWidth={3.5} fill="none" opacity={0.7}/>
    <path d={`M ${toXY(5.96,-75.66).join(",")} Q ${toXY(6.08,-75.62).join(",")} ${toXY(6.22,-75.57).join(",")} Q ${toXY(6.34,-75.56).join(",")} ${toXY(6.47,-75.54).join(",")}`}
      stroke={C.accent} strokeWidth={1} fill="none" opacity={0.25}/>
    {/* Radio cuenca */}
    {[8,16,24].map((r,i)=>{
      const rPx=r/(LON_MAX-LON_MIN)*W;
      return(<circle key={r} cx={cx} cy={cy} r={rPx} fill="none" stroke={C.teal} strokeWidth={0.5} strokeDasharray="4 5" opacity={0.12+i*0.04}/>);
    })}
    {/* Líneas de conexión */}
    {ests.map((e,i)=>{const[ex,ey]=toXY(e.lat,e.lon);const pct=e.pct||0;
      return(<line key={i} x1={cx} y1={cy} x2={ex} y2={ey}
        stroke={i===0?C.teal:pct>10?C.accent2:C.accent}
        strokeWidth={Math.max(0.3,pct/maxPct*2.2)} opacity={Math.max(0.08,pct/maxPct*0.6)}
        strokeDasharray={pct<4?"3 5":undefined}/>);
    })}
    {/* Estaciones */}
    {ests.map((e,i)=>{
      const[ex,ey]=toXY(e.lat,e.lon);
      const pct=e.pct||0;
      const sel=i===selIdx;
      const col=e.estado==="Activa"?(i===0?C.teal:pct>12?C.accent2:pct>5?C.accent:C.muted2):C.rose;
      const r=sel?9:Math.max(3.5,pct/maxPct*9);
      return(<g key={i} style={{cursor:"pointer"}} onClick={()=>onSel(i)}>
        {sel&&<circle cx={ex} cy={ey} r={r+5} fill="none" stroke={col} strokeWidth={1.5} opacity={0.45}/>}
        {i===0&&<circle cx={ex} cy={ey} r={r+3} fill="none" stroke={C.teal} strokeWidth={1} opacity={0.35} strokeDasharray="3 3"/>}
        <circle cx={ex} cy={ey} r={r} fill={col} opacity={sel?1:0.88}/>
        {showLabels&&(sel||pct>6)&&<text x={ex+r+3} y={ey+4} fill={sel?col:C.muted2} fontSize={sel?8.5:7}
          fontFamily="monospace" fontWeight={sel?700:400}>
          {e.nombre.length>16?e.nombre.substring(0,15)+"…":e.nombre}
        </text>}
        {pct>0&&<text x={ex+r+3} y={ey+14} fill={col} fontSize={6.5} fontFamily="monospace">{pct.toFixed(1)}%</text>}
      </g>);
    })}
    {/* Cuenca */}
    <circle cx={cx} cy={cy} r={11} fill={C.gold} opacity={0.9}/>
    <circle cx={cx} cy={cy} r={15} fill="none" stroke={C.gold} strokeWidth={1.5} opacity={0.35}/>
    <text x={cx+17} y={cy+4} fill={C.gold} fontSize={9} fontFamily="monospace" fontWeight={700}>⊕ Cuenca</text>
    {/* Leyenda */}
    <g transform={`translate(6,${H-72})`}>
      <rect width={118} height={68} rx={5} fill={`${C.panel}EE`} stroke={C.border} strokeWidth={0.5}/>
      <text x={6} y={13} fill={C.muted} fontSize={8} fontFamily="monospace" fontWeight={700}>LEYENDA</text>
      {[[C.gold,"Cuenca objetivo"],[C.teal,"Dominante"],[C.accent2,"Alta inf. (>12%)"],[C.accent,"Media inf."],[C.muted2,"Baja inf."],[C.rose,"Mantenimiento"]].map(([col,lbl],i)=>(
        <g key={i} transform={`translate(6,${19+i*8})`}>
          <circle r={2.5} cx={2.5} cy={0} fill={col}/>
          <text x={9} y={4} fill={C.muted2} fontSize={7} fontFamily="monospace">{lbl}</text>
        </g>
      ))}
    </g>
    <text x={W-18} y={16} fill={C.muted} fontSize={11} fontFamily="monospace">N↑</text>
  </svg>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MÓDULO INFLUENCIA — Ponderación multicriterio + Escenarios
// ═══════════════════════════════════════════════════════════════════════════════
function ModInfluencia({params}){
  const[method,setMethod]=useState("compuesto");
  const[potIDW,setPotIDW]=useState(2);
  const[selIdx,setSelIdx]=useState(0);
  const[excl,setExcl]=useState(new Set());
  const[Tr,setTr]=useState(25);
  const[dMin,setDMin]=useState(30);
  const[showLabels,setShowLabels]=useState(true);

  // Punto de salida → fuente única de verdad para selección de estaciones
  const cLat=+params.lat_salida||6.185;
  const cLon=+params.lon_salida||-75.660;
  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;

  const activos=useMemo(()=>ESTACIONES_SIATA.filter((_,i)=>!excl.has(i)),[excl]);

  const pond=useMemo(()=>{
    if(method==="idw")      return calcIDW(activos,cLat,cLon,potIDW);
    if(method==="thiessen") return calcThiessen(activos,cLat,cLon);
    if(method==="alt")      return calcAltitudinal(activos,cAlt,cLat,cLon);
    return calcCompuesto(activos,cLat,cLon,cAlt);
  },[activos,method,potIDW,cLat,cLon,cAlt]);

  // Mapear a lista completa (excluidas = pct 0)
  const pesosMap=useMemo(()=>ESTACIONES_SIATA.map((_,i)=>{
    if(excl.has(i)) return{pct:0,peso:0};
    const e=activos.find(a=>a.codigo===ESTACIONES_SIATA[i].codigo);
    const r=e?pond.find(p=>p.codigo===e.codigo):null;
    return r?{pct:r.pct,peso:r.peso}:{pct:0,peso:0};
  }),[pond,activos,excl]);

  const estsConPeso=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>({...e,...pesosMap[i]})),[pesosMap]);
  const dominante=pond[0];
  const idfPond=useMemo(()=>calcIDFPond(pond,dMin,Tr),[pond,dMin,Tr]);
  const idfDom=dominante?.epm_key&&ESTACIONES_EPM[dominante.epm_key]?idfI(ESTACIONES_EPM[dominante.epm_key],dMin,Tr):0;

  // Análisis de escenarios: impacto de eliminar cada estación
  const escenarios=useMemo(()=>ESTACIONES_SIATA.map((e,i)=>{
    const sin=ESTACIONES_SIATA.filter((_,j)=>j!==i&&!excl.has(j));
    const p2=method==="idw"?calcIDW(sin,cLat,cLon,potIDW)
      :method==="thiessen"?calcThiessen(sin,cLat,cLon)
      :method==="alt"?calcAltitudinal(sin,cAlt,cLat,cLon)
      :calcCompuesto(sin,cLat,cLon,cAlt);
    const iSin=calcIDFPond(p2,dMin,Tr);
    return{nombre:e.nombre.length>18?e.nombre.substring(0,17)+"…":e.nombre,
      iSin:+iSin.toFixed(2),delta:idfPond>0?+((iSin-idfPond)/idfPond*100).toFixed(2):0};
  }).sort((a,b)=>Math.abs(b.delta)-Math.abs(a.delta)),[excl,method,potIDW,cLat,cLon,cAlt,dMin,Tr,idfPond]);

  // IDF comparativa curvas
  const idfCurvas=useMemo(()=>[5,10,15,20,30,45,60,90,120,180,240].map(d=>({d,
    "IDF Ponderada":+calcIDFPond(pond,d,Tr).toFixed(2),
    "Dominante":dominante?.epm_key&&ESTACIONES_EPM[dominante.epm_key]?+idfI(ESTACIONES_EPM[dominante.epm_key],d,Tr).toFixed(2):0,
    "Estación Sel.":ESTACIONES_SIATA[selIdx]?.epm_key&&ESTACIONES_EPM[ESTACIONES_SIATA[selIdx].epm_key]?+idfI(ESTACIONES_EPM[ESTACIONES_SIATA[selIdx].epm_key],d,Tr).toFixed(2):0,
  })),[pond,dominante,selIdx,Tr]);

  const toggleExcl=i=>setExcl(s=>{const n=new Set(s);n.has(i)?n.delete(i):n.add(i);return n;});
  const eSel=ESTACIONES_SIATA[selIdx];
  const iSin=escenarios.find(e=>e.nombre===eSel?.nombre?.substring(0,17)+(eSel?.nombre?.length>17?"…":""));

  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <SectionHeader icon="⊕" title="Ponderación de Estaciones — Índice de Influencia Multicriterio" sub="IDW (p configurable) · Thiessen · Altitudinal · Compuesto 4 criterios · Análisis de escenarios · 17 estaciones SIATA" accent={C.teal}/>

    {/* Controles top */}
    <div style={{display:"grid",gridTemplateColumns:"1.2fr 1fr 1.2fr 1fr 1fr",gap:10}}>
      <Card title="Método de ponderación" accent={C.teal}>
        <BtnGroup options={[{v:"compuesto",l:"Compuesto"},{v:"idw",l:"IDW"},{v:"thiessen",l:"Thiessen"},{v:"alt",l:"Altitudinal"}]} value={method} onChange={setMethod} accent={C.teal}/>
        {method==="idw"&&<div style={{marginTop:8}}>
          <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:2}}>Potencia IDW (p = {potIDW})</div>
          <input type="range" min={1} max={4} step={0.5} value={potIDW} onChange={e=>setPotIDW(+e.target.value)} style={{width:"100%",accentColor:C.teal}}/>
        </div>}
        {method==="compuesto"&&<div style={{marginTop:7,fontSize:8,color:C.muted,fontFamily:mono,lineHeight:1.7}}>
          Dist 40% · Alt 25%<br/>I obs 20% · Red 15%
        </div>}
      </Card>
      <Card title="Parámetros IDF" accent={C.gold}>
        <div style={{marginBottom:6}}>
          <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:3}}>Tr (años)</div>
          <BtnGroup options={[{v:5,l:"5a"},{v:25,l:"25a"},{v:100,l:"100a"}]} value={Tr} onChange={setTr} accent={C.gold}/>
        </div>
        <div>
          <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:3}}>Duración (min)</div>
          <BtnGroup options={[{v:15,l:"15'"},{v:30,l:"30'"},{v:60,l:"60'"}]} value={dMin} onChange={setDMin} accent={C.gold}/>
        </div>
      </Card>
      <Card title="KPIs · Influencia activa" accent={C.accent2}>
        <div style={{display:"flex",flexDirection:"column",gap:4,fontFamily:mono,fontSize:9}}>
          {[["Método",method.toUpperCase()],["Estaciones activas",`${activos.length}/${ESTACIONES_SIATA.length}`],
            ["Dominante",dominante?.nombre?.split(" ")[0]||"—"],["I ponderada",`${idfPond.toFixed(2)} mm/h`],
            ["I dominante",`${idfDom.toFixed(2)} mm/h`],["Δ pond vs dom.",`${idfPond>0?((idfPond-idfDom)/idfDom*100).toFixed(1):"0"}%`],
          ].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",borderBottom:`1px solid ${C.border}15`}}>
              <span style={{color:C.muted}}>{l}</span><span style={{color:C.text,fontWeight:600}}>{v}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Estación seleccionada" accent={C.accent4}>
        {eSel&&<div style={{fontFamily:mono,fontSize:9,display:"flex",flexDirection:"column",gap:3}}>
          <div style={{color:C.accent4,fontWeight:700,fontSize:10,lineHeight:1.3}}>{eSel.nombre}</div>
          <div style={{color:C.muted}}>Código: <span style={{color:C.text}}>{eSel.codigo}</span></div>
          <div style={{color:C.muted}}>Alt: <span style={{color:C.text}}>{eSel.alt} msnm</span></div>
          <div style={{color:C.muted}}>Red: <span style={{color:C.text}}>{eSel.red}</span></div>
          <div style={{color:C.muted}}>Dist: <span style={{color:C.text}}>{distKm(cLat,cLon,eSel.lat,eSel.lon).toFixed(2)} km</span></div>
          <div style={{color:C.muted}}>Influencia: <span style={{color:C.teal,fontWeight:700}}>{pesosMap[selIdx]?.pct.toFixed(2)||0}%</span></div>
          <div style={{marginTop:4,display:"flex",gap:3,flexWrap:"wrap"}}>
            {eSel.vars.map(v=><span key={v} style={{padding:"1px 5px",borderRadius:8,background:`${C.accent}12`,border:`1px solid ${C.accent}20`,fontSize:7.5,color:C.accent}}>{v}</span>)}
          </div>
        </div>}
      </Card>
      <Card title="Escenario: sin seleccionada" accent={C.rose}>
        <div style={{fontFamily:mono,fontSize:9,display:"flex",flexDirection:"column",gap:5}}>
          <div style={{color:C.muted}}>I ponderada actual:</div>
          <div style={{color:C.accent,fontSize:14,fontWeight:800}}>{idfPond.toFixed(2)} <span style={{fontSize:9,fontWeight:400}}>mm/h</span></div>
          <div style={{color:C.muted,marginTop:2}}>Sin {eSel?.nombre?.split(" ")[0]}:</div>
          <div style={{color:C.rose,fontSize:14,fontWeight:800}}>{iSin?.iSin?.toFixed(2)||"—"} <span style={{fontSize:9,fontWeight:400}}>mm/h</span></div>
          {iSin&&<div style={{padding:"4px 8px",borderRadius:6,textAlign:"center",marginTop:2,
            background:`${Math.abs(iSin.delta)<1?C.accent2:iSin.delta>0?C.rose:C.accent3}12`,
            border:`1px solid ${Math.abs(iSin.delta)<1?C.accent2:iSin.delta>0?C.rose:C.accent3}25`}}>
            <span style={{color:Math.abs(iSin.delta)<1?C.accent2:iSin.delta>0?C.rose:C.accent3,fontWeight:700}}>
              {iSin.delta>0?"+":""}{iSin.delta}%
            </span>
            <span style={{color:C.muted,fontSize:8,marginLeft:5}}>{Math.abs(iSin.delta)<1?"Impacto bajo":Math.abs(iSin.delta)<5?"Impacto moderado":"Impacto alto"}</span>
          </div>}
          <div style={{color:C.muted,fontSize:8}}>d={dMin}min · Tr={Tr}a</div>
        </div>
      </Card>
    </div>

    {/* Mapa + Ranking */}
    <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:14}}>
      <Card title={`Mapa AMVA — ${ESTACIONES_SIATA.length} Estaciones · ${method.toUpperCase()} · ${activos.length} activas`} accent={C.teal}
        style={{position:"relative"}}>
        <div style={{position:"absolute",top:36,right:14,zIndex:10}}>
          <button onClick={()=>setShowLabels(v=>!v)} style={{padding:"3px 8px",borderRadius:5,border:`1px solid ${C.border}`,background:C.bg,color:C.muted,fontSize:8,cursor:"pointer",fontFamily:mono}}>
            {showLabels?"Ocultar etiquetas":"Mostrar etiquetas"}
          </button>
        </div>
        <MapaAMVA ests={estsConPeso} cLat={cLat} cLon={cLon} selIdx={selIdx} onSel={setSelIdx} showLabels={showLabels}/>
        <div style={{marginTop:6,fontSize:8,color:C.muted,fontFamily:mono,textAlign:"center"}}>
          Clic en estación para seleccionar · Radios de referencia: 8, 16, 24 km · Río Medellín (cauce principal AMVA)
        </div>
      </Card>

      <Card title={`Ranking Influencia — ${method.toUpperCase()}`} accent={C.teal}>
        <div style={{overflowY:"auto",maxHeight:395,display:"flex",flexDirection:"column",gap:3}}>
          {pond.map((e,i)=>{
            const sIdx=ESTACIONES_SIATA.findIndex(s=>s.codigo===e.codigo);
            const isExcl=excl.has(sIdx);
            return(<div key={e.codigo} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 8px",borderRadius:7,
              background:i===0?`${C.teal}0E`:i<3?`${C.accent2}06`:`${C.border}10`,
              border:`1px solid ${i===0?C.teal:i<3?C.accent2:C.border}${i===0?"35":"15"}`,
              opacity:isExcl?0.35:1,cursor:"pointer"}} onClick={()=>setSelIdx(sIdx)}>
              <div style={{width:19,height:19,borderRadius:"50%",background:i===0?C.teal:i<3?C.accent2:C.muted,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:C.bg,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:9.5,fontWeight:i===0?700:400,color:i===0?C.teal:C.text,fontFamily:sans,
                  whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{e.nombre}</div>
                <div style={{height:3,background:C.border,borderRadius:2,marginTop:3}}>
                  <div style={{height:"100%",width:`${e.pct||0}%`,background:i===0?C.teal:i<3?C.accent2:C.accent,borderRadius:2}}/>
                </div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{fontSize:11,fontWeight:700,color:i===0?C.teal:C.muted2,fontFamily:mono}}>{(e.pct||0).toFixed(1)}%</div>
                <div style={{fontSize:7.5,color:C.muted,fontFamily:mono}}>{e.dist||0} km</div>
              </div>
              <button onClick={ev=>{ev.stopPropagation();toggleExcl(sIdx);}} style={{padding:"2px 6px",borderRadius:4,
                border:`1px solid ${isExcl?C.accent2:C.border}`,background:"transparent",
                color:isExcl?C.accent2:C.muted,fontSize:8,cursor:"pointer",fontFamily:mono,flexShrink:0}}>
                {isExcl?"+ incl":"× excl"}
              </button>
            </div>);
          })}
        </div>
      </Card>
    </div>

    {/* Gráfica barras influencia */}
    <Card title={`Índice de Influencia — ${method.toUpperCase()} · Tr=${Tr}a · d=${dMin}min`} accent={C.accent2}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={pond.map(e=>({n:e.nombre.length>16?e.nombre.substring(0,15)+"…":e.nombre,
          pct:e.pct||0,dist:e.dist,alt:e.alt}))}
          margin={{left:0,right:12,top:8,bottom:48}}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
          <XAxis dataKey="n" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Influencia (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(nm==="pct"?2:0)+(nm==="pct"?"%":" km"),nm]}/>
          <Bar dataKey="pct" name="Influencia (%)" radius={[3,3,0,0]}
            label={{position:"top",fill:C.muted2,fontSize:7,formatter:v=>v.toFixed(1)+"%"}}>
            {pond.map((_,i)=><Cell key={i} fill={i===0?C.teal:i<3?C.accent2:C.accent} opacity={0.85}/>)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>

    {/* IDF ponderada vs referencias */}
    <Card title={`IDF Ponderada (${method}) vs Dominante vs Seleccionada · Tr=${Tr}a`} accent={C.accent3}>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={idfCurvas} margin={{left:0,right:18,top:8,bottom:14}}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
          <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(2)+" mm/h",nm]}/>
          <Legend wrapperStyle={{fontSize:10}}/>
          <Line type="monotone" dataKey="IDF Ponderada" stroke={C.teal} strokeWidth={3} dot={false}/>
          <Line type="monotone" dataKey="Dominante"     stroke={C.accent2} strokeWidth={2} strokeDasharray="6 2" dot={false}/>
          <Line type="monotone" dataKey="Estación Sel." stroke={C.accent4} strokeWidth={1.8} strokeDasharray="4 4" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </Card>

    {/* Análisis de escenarios */}
    <Card title={`Análisis de Escenarios — Δ I(d=${dMin}min, Tr=${Tr}a) al Eliminar Cada Estación`} accent={C.rose}>
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={escenarios} margin={{left:0,right:14,top:8,bottom:50}}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
          <XAxis dataKey="nombre" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Δ I (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+(nm==="delta"?"%":" mm/h"),nm]}/>
          <ReferenceLine y={0} stroke={C.muted} strokeWidth={1}/>
          <Bar dataKey="delta" name="Δ IDF (%)" radius={[2,2,0,0]}
            label={{position:"insideTop",fill:C.bg,fontSize:7,formatter:v=>(v>0?"+":"")+v+"%"}}>
            {escenarios.map((e,i)=><Cell key={i} fill={Math.abs(e.delta)>5?C.rose:Math.abs(e.delta)>2?C.gold:C.accent2}/>)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{marginTop:6,fontSize:8.5,color:C.muted,fontFamily:mono,padding:"6px 10px",background:`${C.border}20`,borderRadius:6}}>
        <span style={{color:C.rose}}>●</span> Δ&gt;5%: impacto alto  <span style={{color:C.gold,marginLeft:12}}>●</span> 2-5%: moderado  <span style={{color:C.accent2,marginLeft:12}}>●</span> &lt;2%: bajo — Valor positivo = la I ponderada sube al eliminar la estación (estación deprimía la media).
      </div>
    </Card>

    {/* Tabla maestra */}
    <Card title="Tabla Maestra — Estaciones · Índices de Influencia · Métricas Completas" accent={C.muted2}>
      <Tbl headers={["#","Estación","Código","Alt (m)","Red","Dist (km)","ΔAlt (m)","I30 obs","Estado","Variables","Influencia (%)"]}
        rows={pond.map((e,i)=>({R:e.rank||i+1,N:e.nombre,C:e.codigo,A:e.alt,
          Rd:e.red,D:e.dist||0,DA:e.dAlt||0,I30:e.I30_obs,S:e.estado,
          V:e.vars?.join("·")||"P",W:e.pct||0}))}
        hiCols={[10]} accent={C.teal}/>
    </Card>
  </div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// MÓDULO SIATA — Integración + Series + Catálogo + Arquitectura
// ═══════════════════════════════════════════════════════════════════════════════
function ModSIATA({params}){
  const[selStn,setSelStn]=useState(0);
  const[subTab,setSubTab]=useState("series");
  const[apiStatus,setApiStatus]=useState("idle");
  const[filterVar,setFilterVar]=useState("Todas");
  const[simDatos]=useState(()=>ESTACIONES_SIATA.map((_,i)=>generarSerieSIATA(42+i*7)));

  const e=ESTACIONES_SIATA[selStn];
  const serie=simDatos[selStn];
  const acumTotal=serie[serie.length-1]?.acum||0;
  const maxLluvia=Math.max(...serie.map(r=>r.lluvia));

  // Punto de salida → fuente única de verdad
  const cLat=+params.lat_salida||6.185, cLon=+params.lon_salida||-75.660;
  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  const pesosVisuales=useMemo(()=>{
    const p=calcCompuesto(ESTACIONES_SIATA,cLat,cLon,cAlt);
    return ESTACIONES_SIATA.map(e2=>p.find(x=>x.codigo===e2.codigo)||{pct:0,peso:0});
  },[cLat,cLon,cAlt]);
  const estsConPeso=ESTACIONES_SIATA.map((e2,i)=>({...e2,...pesosVisuales[i]}));

  const consultarAPI=useCallback(async()=>{
    setApiStatus("loading");
    try{
      const r=await fetch("https://repopruebas.siata.gov.co/datos_siata/application/index.php/estaciones/getEstaciones",
        {signal:AbortSignal.timeout(7000)});
      setApiStatus(r.ok?"ok":"error");
    }catch(err){
      setApiStatus(err.name==="TimeoutError"?"timeout":"cors");
    }
  },[]);

  const vars=["Todas","P","T","HR","Viento","N.Cauce","HumSuelo","Rad","PA"];
  const filtradas=ESTACIONES_SIATA.filter(s=>filterVar==="Todas"||s.vars.includes(filterVar));

  const redStats={
    total:ESTACIONES_SIATA.length,activas:ESTACIONES_SIATA.filter(s=>s.estado==="Activa").length,
    epmSiata:ESTACIONES_SIATA.filter(s=>s.red==="EPM-SIATA").length,
    siata:ESTACIONES_SIATA.filter(s=>s.red==="SIATA").length,
    ideam:ESTACIONES_SIATA.filter(s=>s.red.includes("IDEAM")).length,
    conP:ESTACIONES_SIATA.filter(s=>s.vars.includes("P")).length,
    conN:ESTACIONES_SIATA.filter(s=>s.vars.includes("N.Cauce")).length,
    conHS:ESTACIONES_SIATA.filter(s=>s.vars.includes("HumSuelo")).length,
  };

  const API_STATUS_CFG={
    idle:{col:C.muted,bg:C.border,label:"⬤ Sin consultar"},
    loading:{col:C.gold,bg:`${C.gold}15`,label:"⟳ Consultando…"},
    ok:{col:C.accent2,bg:`${C.accent2}12`,label:"✓ API Respondió OK"},
    cors:{col:C.gold,bg:`${C.gold}10`,label:"⚠ CORS (esperado en browser)"},
    timeout:{col:C.rose,bg:`${C.rose}10`,label:"⏱ Timeout (red/VPN)"},
    error:{col:C.rose,bg:`${C.rose}12`,label:"✗ Error de conexión"},
  };
  const asc=API_STATUS_CFG[apiStatus];

  // Comparativa obs vs IDF teórica
  const idfComp=e?.epm_key&&ESTACIONES_EPM[e.epm_key]?
    [15,30,60].map(d=>{const iT=idfI(ESTACIONES_EPM[e.epm_key],d,25);const iO=d===15?maxLluvia*4:d===30?e.I30_obs:e.I60_obs;
      return{d:`d=${d}'`,iTeor:+iT.toFixed(1),iObs:+iO.toFixed(1),ratio:+(iO/iT*100).toFixed(1)};}):[];

  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
    <SectionHeader icon="🛰" title="SIATA — Sistema de Alertas Tempranas del Valle de Aburrá" sub="Integración hidrometeorológica · API repopruebas.siata.gov.co · 17 estaciones · Series temporales · Arquitectura microservicios" accent={C.accent3}/>

    {/* Banner API */}
    <div style={{background:`${C.accent3}07`,border:`1px solid ${C.accent3}22`,borderRadius:10,padding:"10px 16px",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
      <div style={{flex:1,minWidth:200}}>
        <div style={{fontSize:8,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>Repositorio de pruebas SIATA</div>
        <div style={{fontSize:11,fontWeight:700,color:C.accent3,fontFamily:mono}}>https://repopruebas.siata.gov.co/</div>
        <div style={{fontSize:8,color:C.muted2,fontFamily:mono,marginTop:2}}>
          /datos_siata/application/index.php/estaciones/getEstaciones
        </div>
      </div>
      <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{padding:"4px 10px",borderRadius:6,background:asc.bg,border:`1px solid ${asc.col}30`,
          fontSize:9,fontFamily:mono,color:asc.col,fontWeight:600}}>{asc.label}</div>
        <button onClick={consultarAPI} disabled={apiStatus==="loading"} style={{padding:"6px 14px",borderRadius:7,
          border:`1px solid ${C.accent3}40`,background:`${C.accent3}10`,color:C.accent3,
          fontSize:10,cursor:"pointer",fontFamily:mono,fontWeight:700,opacity:apiStatus==="loading"?0.5:1}}>
          {apiStatus==="loading"?"Consultando…":"⚡ Consultar API SIATA"}
        </button>
      </div>
      <div style={{fontSize:8,color:C.muted,fontFamily:mono,maxWidth:260,borderLeft:`1px solid ${C.border}`,paddingLeft:12}}>
        CORS es normal desde el browser. En producción: proxy FastAPI/Node que consume la API SIATA y la sirve a tu frontend sin restricciones.
      </div>
    </div>

    {/* KPIs red */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
      {[[redStats.total,"Estaciones",C.accent],[redStats.activas,"Activas",C.accent2],
        [redStats.epmSiata,"EPM-SIATA",C.teal],[redStats.siata,"SIATA",C.accent4],
        [redStats.ideam,"IDEAM",C.muted2],[redStats.conP,"Con P(lluvia)",C.accent],
        [redStats.conN,"Con N.Cauce",C.gold],[redStats.conHS,"Hum.Suelo",C.rose],
      ].map(([v,l,a])=><Kpi key={l} value={v} label={l} accent={a}/>)}
    </div>

    {/* Sub-tabs */}
    <div style={{display:"flex",gap:3,borderBottom:`1px solid ${C.border}`,paddingBottom:8}}>
      {[["series","📈 Series Temporales"],["catalogo","🗂 Catálogo"],["validacion","✓ Validación IDF"],["integracion","⚙ Modelo Hidrológico"],["arquitectura","🏗 Arquitectura"]].map(([id,l])=>(
        <button key={id} onClick={()=>setSubTab(id)} style={{padding:"5px 11px",border:"none",cursor:"pointer",borderRadius:"6px 6px 0 0",
          background:subTab===id?`${C.accent3}15`:"transparent",color:subTab===id?C.accent3:C.muted,
          fontSize:9.5,fontWeight:subTab===id?700:400,borderBottom:subTab===id?`2px solid ${C.accent3}`:"2px solid transparent"}}>
          {l}
        </button>
      ))}
    </div>

    {/* ── SERIES ── */}
    {subTab==="series"&&<>
      <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:12}}>
        <Card title="Estaciones SIATA" accent={C.accent3}>
          <div style={{marginBottom:7}}>
            <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:3}}>Filtrar variable</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
              {vars.map(v=><button key={v} onClick={()=>setFilterVar(v)} style={{padding:"2px 7px",borderRadius:6,border:`1px solid ${filterVar===v?C.accent3:C.border}`,background:filterVar===v?`${C.accent3}15`:"transparent",color:filterVar===v?C.accent3:C.muted,fontSize:8,cursor:"pointer",fontFamily:mono}}>{v}</button>)}
            </div>
          </div>
          <div style={{overflowY:"auto",maxHeight:340}}>
            {filtradas.map(stn=>{
              const i=ESTACIONES_SIATA.indexOf(stn);
              const sel=i===selStn;
              return(<button key={i} onClick={()=>setSelStn(i)} style={{display:"flex",alignItems:"center",gap:7,width:"100%",padding:"6px 9px",background:sel?`${C.accent3}10`:"transparent",border:"none",cursor:"pointer",borderBottom:`1px solid ${C.border}12`,textAlign:"left"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:stn.estado==="Activa"?C.accent2:C.rose,flexShrink:0}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:9.5,color:sel?C.accent3:C.text,fontWeight:sel?700:400,fontFamily:sans,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{stn.nombre}</div>
                  <div style={{fontSize:7.5,color:C.muted,fontFamily:mono}}>{stn.alt}m · {stn.vars.join(", ")}</div>
                </div>
              </button>);
            })}
          </div>
        </Card>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{background:`${C.accent3}07`,border:`1px solid ${C.accent3}1A`,borderRadius:10,padding:"9px 13px"}}>
            <div style={{fontSize:10,fontWeight:700,color:C.accent3,fontFamily:mono,marginBottom:7}}>
              {e.nombre} · {e.codigo} · {e.alt} msnm · {e.red} · {e.estado}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7}}>
              <Kpi value={`${acumTotal.toFixed(1)} mm`} label="P acumulada" accent={C.accent}/>
              <Kpi value={`${maxLluvia.toFixed(1)} mm`} label="Pico 15min" accent={C.accent3}/>
              <Kpi value={`${(maxLluvia*4).toFixed(0)} mm/h`} label="i máx estimada" accent={C.gold}/>
              <Kpi value={`${serie.filter(r=>r.lluvia>0).length*15} min`} label="Duración evento" accent={C.teal}/>
              <Kpi value={`${(serie.reduce((s,r)=>s+r.humSuelo,0)/serie.length).toFixed(2)}`} label="Hum.suelo media" accent={C.rose}/>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Card title="Hum. Suelo + Nivel Cauce" accent={C.gold}>
              <ResponsiveContainer width="100%" height={110}>
                <LineChart data={serie} margin={{left:-18,right:8,top:4,bottom:4}}>
                  <XAxis dataKey="t" hide/>
                  <YAxis yAxisId="h" domain={[0,0.8]} tick={{fill:C.muted,fontSize:7.5}} width={28}/>
                  <YAxis yAxisId="n" orientation="right" tick={{fill:C.muted,fontSize:7.5}} width={28}/>
                  <Tooltip contentStyle={{...TT,fontSize:9}} formatter={(v,nm)=>[v.toFixed(3),nm]}/>
                  <Line yAxisId="h" type="monotone" dataKey="humSuelo" stroke={C.gold} strokeWidth={2} dot={false} name="Hum.suelo"/>
                  {e.vars.includes("N.Cauce")&&<Line yAxisId="n" type="monotone" dataKey="nivelCauce" stroke={C.rose} strokeWidth={2} dot={false} name="Nivel (m)"/>}
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Temperatura" accent={C.muted2}>
              <ResponsiveContainer width="100%" height={110}>
                <LineChart data={serie} margin={{left:-18,right:8,top:4,bottom:4}}>
                  <XAxis dataKey="t" hide/>
                  <YAxis tick={{fill:C.muted,fontSize:7.5}} width={28}/>
                  <Tooltip contentStyle={{...TT,fontSize:9}} formatter={(v,nm)=>[v.toFixed(1)+"°C",nm]}/>
                  <Line type="monotone" dataKey="temp" stroke={C.accent4} strokeWidth={2} dot={false} name="T (°C)"/>
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
      <Card title={`Evento de Lluvia SIATA — ${e.nombre} · Intervalo 15min · P_acum=${acumTotal.toFixed(1)}mm`} accent={C.accent3}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={serie} margin={{left:0,right:18,top:8,bottom:14}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
            <XAxis dataKey="t" tick={{fill:C.muted,fontSize:9}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
            <YAxis yAxisId="p" tick={{fill:C.muted,fontSize:9}} label={{value:"P (mm/15min)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:8}}/>
            <YAxis yAxisId="a" orientation="right" tick={{fill:C.muted,fontSize:9}} label={{value:"P acum (mm)",angle:90,position:"insideRight",fill:C.muted,fontSize:8}}/>
            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(2)+" mm",nm]}/>
            <Legend wrapperStyle={{fontSize:9}}/>
            <Bar yAxisId="p" dataKey="lluvia" fill={C.accent3} radius={[2,2,0,0]} name="P 15min (mm)" opacity={0.85}/>
            <Line yAxisId="a" type="monotone" dataKey="acum" stroke={C.accent2} strokeWidth={2.5} dot={false} name="P acumulada (mm)"/>
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
    </>}

    {/* ── CATÁLOGO ── */}
    {subTab==="catalogo"&&<>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <Card title="Distribución por Red" accent={C.teal}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={["EPM-SIATA","SIATA","IDEAM-SIATA","IDEAM","EPM"].map(r=>({r,n:ESTACIONES_SIATA.filter(e=>e.red===r).length}))} margin={{left:0,right:14,top:8}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="r" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip contentStyle={TT}/>
              <Bar dataKey="n" name="Estaciones" radius={[3,3,0,0]} label={{position:"top",fill:C.muted2,fontSize:9}}>
                {["EPM-SIATA","SIATA","IDEAM-SIATA","IDEAM","EPM"].map((_,i)=><Cell key={i} fill={CC[i]}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Variables monitoreadas" accent={C.accent2}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={["P","T","HR","Viento","N.Cauce","HumSuelo","Rad","PA"].map(v=>({v,n:ESTACIONES_SIATA.filter(e=>e.vars.includes(v)).length}))} margin={{left:0,right:14,top:8}}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
              <XAxis dataKey="v" tick={{fill:C.muted,fontSize:9}}/>
              <YAxis tick={{fill:C.muted,fontSize:9}}/>
              <Tooltip contentStyle={TT}/>
              <Bar dataKey="n" name="Estaciones" radius={[3,3,0,0]} label={{position:"top",fill:C.muted2,fontSize:9}}>
                {["P","T","HR","Viento","N.Cauce","HumSuelo","Rad","PA"].map((_,i)=><Cell key={i} fill={CC[i+4]}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      <Card title="Catálogo Completo — Red Hidrometeorológica SIATA AMVA" accent={C.accent4}>
        <Tbl headers={["#","Estación","Código","Lat","Lon","Alt (m)","Red","Variables","Estado","I30 obs (mm/h)"]}
          rows={ESTACIONES_SIATA.map((s,i)=>({N:i+1,E:s.nombre,C:s.codigo,
            La:+s.lat.toFixed(5),Lo:+s.lon.toFixed(5),A:s.alt,R:s.red,V:s.vars.join("·"),S:s.estado,I30:s.I30_obs}))}
          hiCols={[9]} accent={C.accent4}/>
      </Card>
    </>}

    {/* ── VALIDACIÓN IDF ── */}
    {subTab==="validacion"&&<>
      <Card title="Comparativa IDF Teórica (EPM 2025) vs I Observada SIATA (Tr=25a)" accent={C.accent2}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ESTACIONES_SIATA.filter(s=>s.epm_key&&ESTACIONES_EPM[s.epm_key]).map(s=>({
            n:s.nombre.length>14?s.nombre.substring(0,13)+"…":s.nombre,
            iTeor30:+idfI(ESTACIONES_EPM[s.epm_key],30,25).toFixed(1),
            iObs30:s.I30_obs,
            ratio:+(s.I30_obs/idfI(ESTACIONES_EPM[s.epm_key],30,25)*100).toFixed(1),
          }))} margin={{left:0,right:14,top:8,bottom:44}}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
            <XAxis dataKey="n" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+(nm==="ratio"?"%":" mm/h"),nm]}/>
            <Legend wrapperStyle={{fontSize:9}}/>
            <Bar dataKey="iTeor30" name="I teórica d=30min (mm/h)" fill={C.accent2} radius={[2,2,0,0]} opacity={0.8}/>
            <Bar dataKey="iObs30"  name="I observada SIATA (mm/h)" fill={C.accent3} radius={[2,2,0,0]} opacity={0.8}/>
          </BarChart>
        </ResponsiveContainer>
        <div style={{marginTop:8,fontSize:8.5,color:C.muted,fontFamily:mono,padding:"5px 10px",background:`${C.border}15`,borderRadius:6}}>
          ⚠ I observada SIATA = intensidad representativa del evento. Tr=25a teórica = valor esperado estadísticamente. Diferencias &gt;15% sugieren revisar calibración IDF o período de retorno real del evento.
        </div>
      </Card>
      <Card title="Tabla Validación — I obs vs I teórica · Ratio de sesgo" accent={C.muted2}>
        <Tbl headers={["Estación","I teórica 30min (mm/h)","I obs SIATA 30min (mm/h)","Ratio obs/teórica (%)","Sesgo","I obs 60min","I teórica 60min"]}
          rows={ESTACIONES_SIATA.filter(s=>s.epm_key&&ESTACIONES_EPM[s.epm_key]).map(s=>{
            const iT30=+idfI(ESTACIONES_EPM[s.epm_key],30,25).toFixed(1);
            const iT60=+idfI(ESTACIONES_EPM[s.epm_key],60,25).toFixed(1);
            const ratio=+(s.I30_obs/iT30*100).toFixed(1);
            return{E:s.nombre,IT30:iT30,IO30:s.I30_obs,R:ratio,
              S:ratio>115?"Sobreestima IDF":ratio<85?"Subestima IDF":"Consistente",IO60:s.I60_obs,IT60:iT60};
          })} hiCols={[3]} accent={C.accent2}/>
      </Card>
    </>}

    {/* ── INTEGRACIÓN MODELO ── */}
    {subTab==="integracion"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card title="Flujo: Evento SIATA → Q(t) Calibrado" accent={C.teal}>
        <div style={{fontFamily:mono,fontSize:9,display:"flex",flexDirection:"column",gap:3}}>
          {[
            ["1","Detectar evento SIATA (inicio/fin lluvia)","✓"],
            ["2","Extraer P(t) de pluviómetros cercanos (15min)","✓"],
            ["3","Leer humedad de suelo → AMC I/II/III","✓"],
            ["4","Calcular CN dinámico según AMC observada","✓"],
            ["5","Generar hietograma real con datos SIATA","✓"],
            ["6","Aplicar pérdidas SCS con CN corregido","✓"],
            ["7","Convolución con HU (SCS/Clark/Snyder)","✓"],
            ["8","Comparar Q(t) con nivel observado","✓"],
            ["9","Calibrar Tc, CN, kR si hay datos de nivel","⚡"],
            ["10","Exportar parámetros calibrados a nueva IDF","⚡"],
          ].map(([n,txt,s])=>(
            <div key={n} style={{display:"flex",gap:9,padding:"4px 9px",borderRadius:5,background:s==="✓"?`${C.teal}08`:`${C.gold}06`,marginBottom:1}}>
              <span style={{color:C.teal,fontWeight:800,minWidth:18}}>{n}.</span>
              <span style={{flex:1,color:C.muted2}}>{txt}</span>
              <span style={{color:s==="✓"?C.accent2:C.gold}}>{s}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card title="CN dinámico por Humedad del Suelo SIATA" accent={C.gold}>
        <div style={{fontFamily:mono,fontSize:9,marginBottom:8,color:C.muted}}>
          Dato SIATA → AMC → CN ajustado → Pe más realista
        </div>
        {[
          {amc:"AMC I",hs:"HS &lt; 0.25",cn:"CNII → CNI",f:"23·CN/(10+0.13·CN)⁻¹",efecto:"↓ Escorrentía (suelo seco)",col:C.accent2},
          {amc:"AMC II",hs:"0.25 ≤ HS ≤ 0.45",cn:"CN = CNII",f:"Sin corrección",efecto:"Condición base",col:C.gold},
          {amc:"AMC III",hs:"HS &gt; 0.45",cn:"CNII → CNIII",f:"23·CNII/(10+0.13·CNII)",efecto:"↑ Escorrentía (saturado)",col:C.rose},
        ].map(r=>(
          <div key={r.amc} style={{padding:"7px 10px",borderRadius:7,background:`${r.col}08`,border:`1px solid ${r.col}20`,marginBottom:6}}>
            <div style={{color:r.col,fontWeight:700,marginBottom:3}}>{r.amc} — {r.hs}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4,fontSize:8}}>
              <span style={{color:C.muted}}>Ajuste: <span style={{color:C.text}}>{r.cn}</span></span>
              <span style={{color:C.muted}}>Efecto: <span style={{color:r.col}}>{r.efecto}</span></span>
            </div>
          </div>
        ))}
        <div style={{marginTop:6,fontSize:8,color:C.muted,background:`${C.border}20`,borderRadius:5,padding:"5px 8px"}}>
          Hum.suelo actual: <span style={{color:C.gold,fontWeight:700}}>{serie?serie[Math.floor(serie.length/2)]?.humSuelo?.toFixed(3):0}</span> → AMC {serie&&serie[Math.floor(serie.length/2)]?.humSuelo>0.45?"III":serie[Math.floor(serie.length/2)]?.humSuelo>0.25?"II":"I"} para estación seleccionada
        </div>
      </Card>
    </div>}

    {/* ── ARQUITECTURA ── */}
    {subTab==="arquitectura"&&<>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {[
          {n:"Nivel 1 — Consumo Directo",col:C.accent,
            desc:"Consulta directa API SIATA. Requiere proxy/CORS en producción.",
            eps:["/estaciones/siata","/precipitacion?lat&lon&r","/soilmoisture/siata","/streamflow/siata"]},
          {n:"Nivel 2 — ETL Automatizado",col:C.accent2,
            desc:"Descarga periódica CSV/JSON. HidroFlow mantiene su propio histórico SIATA.",
            eps:["Scheduler: cada 15min/1h","Almacenar series temporales","Base datos estaciones","Cache de eventos extremos"]},
          {n:"Nivel 3 — Microservicio Hidrológico",col:C.teal,
            desc:"Pipeline completo: SIATA → filtrado → homologación → parámetros HidroFlow.",
            eps:["SIATA → Filtro → Homologa","→ CN dinámico (AMC)","→ Calibración Tc/kR","→ Tormenta híbrida real"]},
        ].map(({n,col,desc,eps})=>(
          <Card key={n} title={n} accent={col}>
            <div style={{fontFamily:mono,fontSize:8.5,color:C.muted,marginBottom:8,lineHeight:1.5}}>{desc}</div>
            {eps.map((ep,i)=>(
              <div key={i} style={{padding:"4px 9px",marginBottom:3,borderRadius:5,background:`${col}09`,border:`1px solid ${col}1E`,color:col,fontSize:8}}>{ep}</div>
            ))}
          </Card>
        ))}
      </div>
      <Card title="Diagrama de Flujo — SIATA + HidroFlow v3.1" accent={C.accent4}>
        <div style={{display:"flex",gap:6,alignItems:"stretch",flexWrap:"wrap",padding:"6px 0"}}>
          {[
            {box:"SIATA\nGeoportal\nAPI REST",col:C.accent3,sub:"repopruebas\n.siata.gov.co"},
            {arr:"→"},
            {box:"Proxy/Backend\nNode · FastAPI\nCache + Auth",col:C.accent4,sub:"Resuelve CORS\nAutenticación"},
            {arr:"→"},
            {box:"ETL Pipeline\nFiltrar · Validar\nHomologar unidades",col:C.teal,sub:"P→mm, T→°C\nDetecta outliers"},
            {arr:"→"},
            {box:"HidroFlow\nMotor IDF · SAR\nGT-AS-004",col:C.accent2,sub:"CN dinámico\nQ(t) calibrado"},
            {arr:"→"},
            {box:"Dashboard\nPDF · Excel\nAlertas",col:C.gold,sub:"Reportes\nGestión riesgo"},
          ].map((item,i)=>{
            if(item.arr) return(<div key={i} style={{fontSize:18,color:C.muted,alignSelf:"center",padding:"0 2px"}}>{item.arr}</div>);
            return(<div key={i} style={{flex:1,minWidth:90,textAlign:"center"}}>
              <div style={{background:`${item.col}0F`,border:`1px solid ${item.col}28`,borderRadius:8,padding:"9px 7px",marginBottom:5}}>
                <div style={{color:item.col,fontWeight:700,whiteSpace:"pre",fontSize:9,lineHeight:1.5,fontFamily:mono}}>{item.box}</div>
              </div>
              <div style={{color:C.muted,fontSize:7.5,whiteSpace:"pre",lineHeight:1.4,fontFamily:mono}}>{item.sub}</div>
            </div>);
          })}
        </div>
      </Card>
    </>}
  </div>);
}

// ═══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPAL v3.1
// ═══════════════════════════════════════════════════════════════════════════════
const D0={nombre_cuenca:"Cuenca San Antonio",area:2.83,perimetro:12.04,longitud_cauce:5.26,longitud_cuenca:4.65,longitud_divisoria:5.28,cota_max:2950,cota_min:1702.7,cota_mayor_cauce:2762.5,cota_menor_cauce:1702.7,pendiente_cuenca:26.823656,CN:88,dt:5,
  lat_salida:6.18508333,lon_salida:-75.65997222,alt_salida:1702};

const TABS=[
  {id:"params",     label:"Parámetros",   icon:"⬡", acc:C.accent,   desc:"Morfometría · Índices · 6 Métodos Tc"},
  {id:"idf",        label:"IDF",          icon:"⌁", acc:C.accent3,  desc:"20 Est. EPM 2025 · I=k/(c+d)ⁿ · PDF calibradas"},
  {id:"hiet",       label:"Hietogramas",  icon:"🌧", acc:C.accent,   desc:"GT-AS-004 §3.3 · Curvas Huff Q1-Q4 · 5 distribuciones"},
  {id:"hidro",      label:"Hidrogramas",  icon:"≋", acc:C.accent2,  desc:"SCS · SCS Mod. · Snyder · Williams&Hann · Clark IUH"},
  {id:"racional",   label:"Racional",     icon:"◈", acc:C.gold,     desc:"Q=C·I·A/3.6 · Abstracción SCS · Todos los Tr"},
  {id:"sar",        label:"SAR",          icon:"◫", acc:C.accent4,  desc:"GT-AS-004 §3 · Hietograma+Convolución+Vol. · PDF/Excel"},
  {id:"influencia", label:"Influencia",   icon:"⊕", acc:C.teal,     desc:"IDW · Thiessen · Altitudinal · Compuesto · Escenarios · Mapa AMVA"},
  {id:"siata",      label:"SIATA",        icon:"🛰", acc:C.accent3,  desc:"API repopruebas.siata.gov.co · Series · Validación IDF · Arquitectura"},
];

export default function HidroFlow(){
  const[tab,setTab]=useState("params");
  const[params,setParams]=useState(D0);
  const[stn,setStn]=useState("SAN ANTONIO DE PRADO");
  // ────────────────── Defaults AMC / %imperv / CNbase (solo si faltan) ──────────────────
useEffect(() => {
  setParams(prev => {
    const amc  = prev?.amcActual ?? "II"; // I | II | III
    const pct  = Number.isFinite(prev?.porcentajeImpermeable) ? prev.porcentajeImpermeable : 60;
    const base = Number.isFinite(prev?.cnBase) ? prev.cnBase
              : (Number.isFinite(prev?.CN) ? prev.CN : 75);

    // Evita re-render si nada cambia
    if (prev?.amcActual === amc &&
        prev?.porcentajeImpermeable === pct &&
        prev?.cnBase === base) {
      return prev;
    }

    return { ...prev, amcActual: amc, porcentajeImpermeable: pct, cnBase: base };
  });
}, []); // Solo al montar
``
  const est=ESTACIONES_EPM[stn];
  const aa=TABS.find(t=>t.id===tab)?.acc||C.accent;
  const pdfN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="PDF").length;
  const refN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="REF").length;

  return(<div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:sans}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:3px}button{font-family:inherit}`}</style>

    {/* ── HEADER ── */}
    <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:"0 16px",display:"flex",alignItems:"center",gap:8,height:52,position:"sticky",top:0,zIndex:200}}>
      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
        <div style={{width:28,height:28,borderRadius:7,background:`linear-gradient(135deg,${C.accent},${C.accent4})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:C.bg}}>H</div>
        <div>
          <div style={{fontSize:11,fontWeight:800,letterSpacing:"-0.03em",color:C.text}}>HidroFlow</div>
          <div style={{fontSize:7.5,color:C.muted,fontFamily:mono}}>v3.1 · EPM 2025 · GT-AS-004 · SIATA · {pdfN}+{refN} est.</div>
        </div>
      </div>
      <div style={{width:1,height:20,background:C.border}}/>
      <StationSel sel={stn} onSel={setStn}/>
      <div style={{width:1,height:20,background:C.border}}/>
      <div style={{fontSize:9.5,color:C.muted,display:"flex",gap:9,fontFamily:mono}}>
        <span style={{color:C.text,fontWeight:600,fontFamily:sans}}>{params.nombre_cuenca}</span>
        <span>A={params.area}km²</span>
        <span>CN={params.CN}</span>
        <span>Δt={params.dt}min</span>
      </div>
      <nav style={{display:"flex",gap:1,marginLeft:"auto",flexWrap:"wrap"}}>
        {TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)}
          style={{padding:"4px 9px",borderRadius:6,border:"none",cursor:"pointer",
            background:tab===t.id?`${t.acc}15`:"transparent",color:tab===t.id?t.acc:C.muted,
            fontSize:9.5,fontWeight:tab===t.id?700:500,
            borderBottom:tab===t.id?`2px solid ${t.acc}`:"2px solid transparent",transition:"all .12s"}}>
          {t.icon} {t.label}
        </button>))}
      
      <button data-id="blind-hidro" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); setTab("hidro");}}
        style={{padding:"4px 9px",borderRadius:6,border:"none",cursor:"pointer",background:"transparent",color:C.muted, fontSize:9.5,fontWeight:500}}
        title="Ir a Hidrogramas (SPA)">≋</button></nav>
    </div>

    {/* Accent bar */}
    <div style={{height:1.5,background:`linear-gradient(90deg,${aa}AA,${aa}22,transparent)`}}/>

    {/* ── CONTENT ── */}
    <div style={{padding:"14px 18px",maxWidth:1640,margin:"0 auto"}}>
      <div style={{marginBottom:12,display:"flex",alignItems:"center",gap:9}}>
        <span style={{fontSize:18,color:aa}}>{TABS.find(t=>t.id===tab)?.icon}</span>
        <div>
          <h2 style={{fontSize:14,fontWeight:800,letterSpacing:"-0.02em"}}>{TABS.find(t=>t.id===tab)?.label}</h2>
          <p style={{fontSize:8.5,color:C.muted,marginTop:1,fontFamily:mono}}>{TABS.find(t=>t.id===tab)?.desc}</p>
        </div>
      </div>
      {tab==="params"     &&<ModParams     params={params} setParams={setParams}/>}
      {tab==="idf"        &&<ModIDF        est={est} name={stn}/>}
      {tab==="hiet"       &&<ModHietogramas est={est} name={stn} params={params}/>}
      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={stn}/>}
      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn}/>}
      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
      {tab==="influencia" &&<ModInfluencia params={params}/>}
      {tab==="siata"      &&<ModSIATA      params={params}/>}
    </div>

    {/* ── FOOTER ── */}
    <div style={{borderTop:`1px solid ${C.border}`,padding:"7px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
      <span style={{fontSize:8,color:C.muted,fontFamily:mono}}>
        HidroFlow v3.1 · GT-AS-004 Rev.0 2026-01-07 · SIATA AMVA · {pdfN} est. PDF + {refN} ref. · 5 HU · IDW/Thiessen/Altitudinal/Compuesto · Huff Q1-Q4 · Clark IUH
      </span>
      <div style={{display:"flex",gap:10,fontFamily:mono,fontSize:8}}>
        {[{l:stn,a:C.accent3},{l:`A=${params.area}km²`,a:C.accent},{l:`CN=${params.CN}`,a:C.accent2},{l:`Δt=${params.dt}min`,a:C.gold},{l:`17 est. SIATA`,a:C.teal}].map(({l,a})=><span key={l} style={{color:a}}>{l}</span>)}
      </div>
    </div>
  </div>);
}
