# OT-0049A — Auditoría inicial saneamiento quirúrgico motor e índice

Fecha: 06/08/2026 00:59:41
Rama: ot-0049-saneamiento-quirurgico-motor-indice

## 1. Estado Git inicial
?? 00_ADMIN/bitacora/OT-0049/

## 2. Log reciente
19df8ee Merge pull request #58 from luisger88/practica-001i-estructura-documental-base
95d14ca docs(documentacion): crea estructura documental base HidroFlow
2ce216c Merge pull request #57 from luisger88/practica-001h-radar-documentacion-usuario-software
5a0710f docs(documentacion): registra radar guias usuario y software
dfac405 Merge pull request #56 from luisger88/practica-001g-plantillas-portables-base
fabce02 docs(arquitectura): agrega plantillas portables base
4f116bf Merge pull request #55 from luisger88/practica-001f-configuracion-portable-manifiesto
9b2612c docs(arquitectura): define configuracion portable y manifiesto

## 3. Búsqueda duplicate key area_km2 / areaKm2

  01_APP\HIDROFLOW\src\HidroFlow.jsx:179:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:180:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:181:// HIDROGRAMAS UNITARIOS SINTÉTICOS — 4 MÉTODOS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:184:function normalizarHUaMm(uh, areaKm2, dt_min) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:185:  const volumenObjetivo = areaKm2 * 1000;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:186:  const volumenUH = (uh || []).reduce(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:187:    (suma, q) => suma + Number(q || 0) * (dt_min * 60),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:188:    0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:189:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:190:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:191:  if (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:192:    !Number.isFinite(volumenObjetivo) ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:193:    volumenObjetivo <= 0 ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:246:  const n=Math.ceil(5*(tp+tlag)/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:247:  const uh=Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:248:    const t=i*dt_min/60, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:249:    return +(tr<=1?qp*Math.pow(tr,2.5):qp*Math.exp(-2.0*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:250:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:251:  const areaKm2 = area_mi2 / 0.386102;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:252:  const normalizado = normalizarHUaMm(uh, areaKm2, dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:253:  return{tp,qp:normalizado.qp,tlag,W50,W75,Ct,Cp,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Snyder",color:C.accent3}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:254:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:255:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:256:// ④ HU WILLIAMS & HANN (Williams & Hann, 1973)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:257:// Basado en: qp = 2.54·A^0.9·(S/1000)^0.5·CN^3/(Ia·A)  → simplificado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:258:// Fórmula geomorfológica: qp=(A^m1·S^m2·CN^m3)·K_WH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:259:function calcHUWilliamsHann(area, L_km, S_m_km, CN, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:260:  // Williams & Hann (1973): Tc = 0.1838·L^0.8·(S+1)^0.7 / (CN^0.35·S^0.5)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2177:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2178:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2179:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:      resultados: hidrogramasQ5Exportables
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2188:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2189:    lluvia_efectiva_total_mm: lluviaEfectivaTotalMm,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2190:    hidrogramas_resumen: hidrogramasResumen,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3550:        )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3551:      : [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3552:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    estacion_idf: stn,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    periodos_retorno: TR_LIST,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3561:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3562:      estado: "informativo_no_adoptivo",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3563:      tc_min: Number.isFinite(Number(tcRacionalMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3570:      params?.nombreCuenca ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3571:      params?.cuencaNombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3572:      params?.nombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3573:      "Quebrada La Iguaná - PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3574:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3575:    area_km2:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3576:      params?.area_km2 ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3577:      params?.areaKm2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3578:      params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3579:      params?.A ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3580:      null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3581:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3582:    pendiente_media_pct:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3583:  params?.pendiente_media_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3584:  params?.pendienteMediaPct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3585:  params?.pendiente_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3666:        params?.pendiente_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3667:        params?.S_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3668:        params?.pendiente ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3669:        8.43,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3670:      area:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3671:        params?.area_km2 ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3672:        params?.areaKm2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3673:        params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3674:        params?.A ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3675:        null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3676:      CN: params?.CN ?? params?.cnBase ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3677:      fuente: "hidroflow_base"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3678:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3679:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3680:}, [params]);


## 4. Búsqueda de objetos de contexto en HidroFlow.jsx

> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1:import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3:import { useState, useMemo, useCallback, useRef, useEffect } from "react";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:4:import { getTrState, subscribeTr } from "./agents/trAgent";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:5:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:6:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:7:  LineChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:61:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:62:// ─── ESTACIONES EPM 2025 ──────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:63:const ESTACIONES_EPM = {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:64:  "AYURA":              {codigo:"2701093",lat:6.16569444,lon:-75.56591667,alt:1750,fuente:"PDF",params:{"2.33":{k:45.2947,n:0.9370,c:0.4},"5":{k:54.8433,n:0.9612,c:0.4},"10":{k:62.6277,n:0.9763,c:0.4},"25":{k:72.4701,n:0.9914,c:0.4},"50":{k:79.7758,n:1.0005,c:0.4},"100":{k:87.0304,n:1.0082,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:65:  "CALDAS":             {codigo:"2701036",lat:6.05300000,lon:-75.62775000,alt:1930,fuente:"PDF",params:{"2.33":{k:55.1908,n:0.9454,c:0.4},"5":{k:63.5724,n:0.9302,c:0.4},"10":{k:70.3848,n:0.9207,c:0.4},"25":{k:78.9803,n:0.9113,c:0.4},"50":{k:85.3502,n:0.9056,c:0.4},"100":{k:91.6695,n:0.9007,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:66:  "CHORRILLOS":         {codigo:"——",lat:6.270,lon:-75.590,alt:1900,fuente:"PDF",params:{"2.33":{k:51.4450,n:0.9544,c:0.4},"5":{k:59.8108,n:0.9572,c:0.4},"10":{k:66.6249,n:0.9591,c:0.4},"25":{k:75.2346,n:0.9611,c:0.4},"50":{k:81.6221,n:0.9624,c:0.4},"100":{k:87.9625,n:0.9634,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:67:  "FABRICATO":          {codigo:"2701037",lat:6.36188883,lon:-75.60018886,alt:2422,fuente:"PDF",params:{"2.33":{k:53.5837,n:0.9169,c:0.4},"5":{k:65.5265,n:0.9126,c:0.4},"10":{k:75.2345,n:0.9100,c:0.4},"25":{k:87.4850,n:0.9075,c:0.4},"50":{k:96.5654,n:0.9060,c:0.4},"100":{k:105.5740,n:0.9048,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:68:  "LA FE PANTANILLO":   {codigo:"——",lat:6.120,lon:-75.480,alt:2160,fuente:"PDF",params:{"2.33":{k:59.6585,n:0.9200,c:0.4},"5":{k:74.6544,n:0.8890,c:0.4},"10":{k:86.8003,n:0.8724,c:0.4},"25":{k:102.1002,n:0.8575,c:0.4},"50":{k:113.4298,n:0.8493,c:0.4},"100":{k:124.6638,n:0.8426,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:69:  "MACARENA":           {codigo:"——",lat:6.240,lon:-75.580,alt:1560,fuente:"PDF",params:{"2.33":{k:42.9075,n:0.9375,c:0.4},"5":{k:50.4677,n:0.9511,c:0.4},"10":{k:56.6358,n:0.9599,c:0.4},"25":{k:64.4390,n:0.9690,c:0.4},"50":{k:70.2337,n:0.9746,c:0.4},"100":{k:75.9893,n:0.9794,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:70:  "MAZO":               {codigo:"2701034",lat:6.25702778,lon:-75.50166667,alt:2480,fuente:"PDF",params:{"2.33":{k:50.3668,n:0.9348,c:0.4},"5":{k:58.7672,n:0.9217,c:0.4},"10":{k:65.6019,n:0.9137,c:0.4},"25":{k:74.2314,n:0.9059,c:0.4},"50":{k:80.6304,n:0.9012,c:0.4},"100":{k:86.9798,n:0.8972,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:71:  "MEDELLIN":           {codigo:"2701517",lat:6.25296809,lon:-75.56863300,alt:1491,fuente:"PDF",params:{"2.33":{k:46.4859,n:0.9644,c:0.4},"5":{k:55.1623,n:0.9767,c:0.4},"10":{k:62.2186,n:0.9843,c:0.4},"25":{k:71.1259,n:0.9918,c:0.4},"50":{k:77.7297,n:0.9962,c:0.4},"100":{k:84.2820,n:1.0000,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:72:  "PALMAS":             {codigo:"——",lat:6.160,lon:-75.500,alt:2450,fuente:"PDF",params:{"2.33":{k:54.6168,n:0.9451,c:0.4},"5":{k:67.7088,n:0.9687,c:0.4},"10":{k:78.3823,n:0.9828,c:0.4},"25":{k:91.8790,n:0.9965,c:0.4},"50":{k:101.8968,n:1.0046,c:0.4},"100":{k:111.8448,n:1.0113,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:73:  "SAN ANDRES":         {codigo:"2701056",lat:6.37361111,lon:-75.44808333,alt:1350,fuente:"PDF",params:{"2.33":{k:50.8286,n:0.8765,c:0.4},"5":{k:61.0429,n:0.8568,c:0.4},"10":{k:69.3246,n:0.8452,c:0.4},"25":{k:79.7593,n:0.8341,c:0.4},"50":{k:87.4859,n:0.8277,c:0.4},"100":{k:95.1470,n:0.8224,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:74:  "SAN ANTONIO DE PRADO":{codigo:"2701038",lat:6.18508333,lon:-75.65997222,alt:2000,fuente:"PDF",params:{"2.33":{k:54.0898,n:0.9012,c:0.4},"5":{k:63.3234,n:0.8946,c:0.4},"10":{k:70.8343,n:0.8905,c:0.4},"25":{k:80.3161,n:0.8864,c:0.4},"50":{k:87.3459,n:0.8840,c:0.4},"100":{k:94.3211,n:0.8819,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:75:  "SAN CRISTOBAL":      {codigo:"2701046",lat:6.28138889,lon:-75.63627778,alt:1890,fuente:"PDF",params:{"2.33":{k:53.8109,n:0.9272,c:0.4},"5":{k:62.6125,n:0.9396,c:0.4},"10":{k:69.7680,n:0.9476,c:0.4},"25":{k:78.7968,n:0.9556,c:0.4},"50":{k:85.4885,n:0.9606,c:0.4},"100":{k:92.1268,n:0.9648,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:76:  "VASCONIA":           {codigo:"——",lat:6.310,lon:-75.560,alt:1520,fuente:"PDF",params:{"2.33":{k:57.5136,n:0.9119,c:0.4},"5":{k:68.9288,n:0.8969,c:0.4},"10":{k:78.2177,n:0.8881,c:0.4},"25":{k:89.9474,n:0.8797,c:0.4},"50":{k:98.6460,n:0.8748,c:0.4},"100":{k:107.2780,n:0.8708,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:77:  "VILLA HERMOSA":      {codigo:"2701045",lat:6.25697222,lon:-75.54752778,alt:1690,fuente:"PDF",params:{"2.33":{k:44.7082,n:0.9447,c:0.4},"5":{k:51.3948,n:0.9485,c:0.4},"10":{k:56.8290,n:0.9509,c:0.4},"25":{k:63.6847,n:0.9533,c:0.4},"50":{k:68.7650,n:0.9548,c:0.4},"100":{k:73.8041,n:0.9560,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:78:  "NIQUIA":             {codigo:"2701076",lat:6.34627778,lon:-75.54586111,alt:1439,fuente:"REF",params:{"2.33":{k:52.08,n:0.938,c:0.4},"5":{k:60.70,n:0.948,c:0.4},"10":{k:67.74,n:0.955,c:0.4},"25":{k:76.62,n:0.961,c:0.4},"50":{k:83.22,n:0.966,c:0.4},"100":{k:89.77,n:0.969,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:79:  "CUCARACHO":          {codigo:"2701114",lat:6.28380556,lon:-75.60791667,alt:1830,fuente:"REF",params:{"2.33":{k:53.17,n:0.938,c:0.4},"5":{k:62.57,n:0.947,c:0.4},"10":{k:70.20,n:0.953,c:0.4},"25":{k:79.82,n:0.959,c:0.4},"50":{k:86.95,n:0.963,c:0.4},"100":{k:94.01,n:0.965,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:80:  "ASTILLERO":          {codigo:"2701115",lat:6.24908333,lon:-75.68061111,alt:2420,fuente:"REF",params:{"2.33":{k:57.02,n:0.910,c:0.4},"5":{k:65.14,n:0.898,c:0.4},"10":{k:71.73,n:0.890,c:0.4},"25":{k:80.03,n:0.882,c:0.4},"50":{k:86.18,n:0.877,c:0.4},"100":{k:92.27,n:0.873,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:81:  "COPACABANA":         {codigo:"2701122",lat:6.33661111,lon:-75.51086111,alt:1580,fuente:"REF",params:{"2.33":{k:45.83,n:0.921,c:0.4},"5":{k:52.77,n:0.917,c:0.4},"10":{k:58.43,n:0.914,c:0.4},"25":{k:65.57,n:0.911,c:0.4},"50":{k:70.87,n:0.909,c:0.4},"100":{k:76.13,n:0.908,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:82:  "PEDREGAL":           {codigo:"2701481",lat:6.30494444,lon:-75.57422222,alt:1622,fuente:"REF",params:{"2.33":{k:44.00,n:0.927,c:0.4},"5":{k:55.58,n:0.936,c:0.4},"10":{k:65.02,n:0.942,c:0.4},"25":{k:76.93,n:0.947,c:0.4},"50":{k:85.77,n:0.950,c:0.4},"100":{k:94.54,n:0.952,c:0.4}}},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:83:  "GERONA":             {codigo:"2701485",lat:6.23338889,lon:-75.55375000,alt:1649,fuente:"REF",params:{"2.33":{k:46.0,n:0.940,c:0.4},"5":{k:53.5,n:0.940,c:0.4},"10":{k:59.5,n:0.940,c:0.4},"25":{k:67.0,n:0.940,c:0.4},"50":{k:72.0,n:0.940,c:0.4},"100":{k:75.0,n:0.940,c:0.4}}},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:84:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:85:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:86:// ─── MOTOR IDF ────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:87:function idfI(est,d_min,Tr){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:88:  const d_h=d_min/60;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:89:  const keys=Object.keys(est.params).map(Number).sort((a,b)=>a-b);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:90:  if(est.params[String(Tr)]){const{k,n,c}=est.params[String(Tr)];return k/Math.pow(c+d_h,n);}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:91:  const lo=keys.filter(t=>t<=Tr).pop()||keys[0];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:92:  const hi=keys.filter(t=>t>=Tr)[0]||keys[keys.length-1];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:93:  if(lo===hi){const{k,n,c}=est.params[String(lo)];return k/Math.pow(c+d_h,n);}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:94:  const{k:k1,n:n1,c:c1}=est.params[String(lo)];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:95:  const{k:k2,n:n2,c:c2}=est.params[String(hi)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:96:  const I1=k1/Math.pow(c1+d_h,n1),I2=k2/Math.pow(c2+d_h,n2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:97:  const f=(Math.log(Tr)-Math.log(lo))/(Math.log(hi)-Math.log(lo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:98:  return I1*Math.pow(I2/I1,f);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:99:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:100:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:101:// ─── DISTRIBUCIÓN TEMPORAL GT-AS-004 §3.3 ────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:181:// HIDROGRAMAS UNITARIOS SINTÉTICOS — 4 MÉTODOS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:184:function normalizarHUaMm(uh, areaKm2, dt_min) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:185:  const volumenObjetivo = areaKm2 * 1000;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:186:  const volumenUH = (uh || []).reduce(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:187:    (suma, q) => suma + Number(q || 0) * (dt_min * 60),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:188:    0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:189:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:190:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:191:  if (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:248:    const t=i*dt_min/60, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:249:    return +(tr<=1?qp*Math.pow(tr,2.5):qp*Math.exp(-2.0*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:250:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:251:  const areaKm2 = area_mi2 / 0.386102;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:252:  const normalizado = normalizarHUaMm(uh, areaKm2, dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:253:  return{tp,qp:normalizado.qp,tlag,W50,W75,Ct,Cp,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Snyder",color:C.accent3}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:254:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:255:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:256:// ④ HU WILLIAMS & HANN (Williams & Hann, 1973)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:257:// Basado en: qp = 2.54·A^0.9·(S/1000)^0.5·CN^3/(Ia·A)  → simplificado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:258:// Fórmula geomorfológica: qp=(A^m1·S^m2·CN^m3)·K_WH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:275:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:276:// ④b CLARK IUH (Clark, 1945) — Hidrograma Unitario Instantáneo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:277:// IUH de Clark: u(t) = qp·exp(-t/R) para t>tp, crecida lineal hasta tp
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:278:// Parámetros: tc (tiempo concentración), R (coef. almacenamiento cuenca)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:279:// R = k_R * tc  (típico k_R = 0.5–2.0, default 1.2)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:280:function calcClarkIUH(area, tc_h, dt_min, kR=1.2){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:281:  const dh   = dt_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:282:  const R    = kR * tc_h;  // coeficiente almacenamiento
  01_APP\HIDROFLOW\src\HidroFlow.jsx:283:  const qp   = 2.08*area/tc_h;  // caudal pico IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:284:  const n    = Math.ceil((tc_h + 6*R)/dh) + 12;
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:337:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:338:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:339:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:340:function buildResumenQ(params, est, dtMin, CNact) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:341:  const tcList = calcTc(params).filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:342:  const tc_h = tcList[0]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:343:  const metodos = [
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:344:    { nombre: 'SCS',     make: () => calcHUSCS(params.area, tc_h, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:345:    { nombre: 'SCS Mod', make: () => calcHUSCS_Mod(params.area, tc_h, dtMin, 2.08) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:346:    { nombre: 'Snyder',  make: () => calcHUSnyder(params.area*0.386102, params.longitud_cauce*0.621371, params.longitud_cauce*0.621371*0.35, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:347:    { nombre: 'W&H',     make: () => calcHUWilliamsHann(params.area, params.longitud_cauce, (params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce, CNact, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:348:    { nombre: 'Clark',   make: () => calcClarkIUH(params.area, tc_h, dtMin, 1.2) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:349:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:350:  return metodos.map(m => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:351:    const row = { metodo: m.nombre };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:352:    TR_LIST.forEach(Tr => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:353:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
  01_APP\HIDROFLOW\src\HidroFlow.jsx:354:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:369:  // Hoja 1: Parámetros de diseño
  01_APP\HIDROFLOW\src\HidroFlow.jsx:370:  const ws1 = WX.utils.aoa_to_sheet([
  01_APP\HIDROFLOW\src\HidroFlow.jsx:371:    ["HIDROFLOW v3.0 — GT-AS-004 · EPM 2025"],[""],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:372:    ["PARÁMETROS DE CUENCA Y DISEÑO"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:373:    ["Parámetro","Valor","Unidad"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:374:    ["Cuenca",datos.nombre_cuenca,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:375:    ["Área",datos.area,"km²"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:376:    ["Perímetro",datos.perimetro,"km"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:377:    ["Longitud cauce",datos.longitud_cauce,"km"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:378:    ["Pendiente media cuenca",datos.pendiente_cuenca,"%"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:379:    ["Cota máxima",datos.cota_max,"msnm"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:380:    ["Cota mínima",datos.cota_min,"msnm"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:381:    ["CN (CNII)",datos.CN,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:382:    ["Tc (Témez)",datos.tc_h*60,"min"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:383:    ["Estación IDF",datos.stn,""],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:384:    ["Tr de diseño",datos.Tr,"años"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:426:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Resumen_Q");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:427:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:428:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:429:  WX.writeFile(wb,`HidroFlow_${datos.nombre_cuenca.replace(/\s/g,"_")}_${datos.Tr}a.xlsx`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:430:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:431:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:432:// ─── EXPORTACIÓN PDF (jsPDF + html2canvas) ────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:433:async function exportarPDF(refEl, datos){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:434:  try{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:435:    const [h2c, jsPDF_mod] = await Promise.all([
  01_APP\HIDROFLOW\src\HidroFlow.jsx:446:    const ratio=Math.min(pw/canvas.width,ph/canvas.height)*0.95;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:447:    const iw=canvas.width*ratio, ih=canvas.height*ratio;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:448:    pdf.addImage(imgData,"JPEG",(pw-iw)/2,(ph-ih)/2,iw,ih);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:449:    pdf.save(`HidroFlow_${datos.nombre_cuenca}_Tr${datos.Tr}a.pdf`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:450:  }catch(e){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:451:    console.error("PDF export error:",e);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:452:    alert("Error exportando PDF. Verifique conexión para cargar librerías.");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:453:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:454:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:455:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:581:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:582:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:583:// ─── OUTLET MINI MAP ─────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:584:// Mini mapa SVG que muestra el punto de salida en contexto del Valle de Aburrá
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:585:// Se embebe dentro de la card Punto de Salida en ModParams
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:609:    .slice(0, 3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:610:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:611:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:612:  // 2. Estación IDF adoptada desde cuencasCatalogo.js
  01_APP\HIDROFLOW\src\HidroFlow.jsx:613:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:614:  const idfAdoptadaNombre =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:615:    idf?.estacion_nombre ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:616:    idf?.estacion_id?.replaceAll("_", " ") ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:617:    "SAN CRISTOBAL";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:618:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:843:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:844:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:845:        {/* Río Medellín — referencia oriental del valle.
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:846:    La subcuenca La Iguaná PC_80 se representa al occidente del río.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:847:    Este trazo es conceptual: no representa conectividad hidráulica ni cruce del cauce. */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:848:<div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:849:  style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:850:    position: "absolute",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:851:    right: "16%",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:852:    top: "8%",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:880:  Río Medellín
  01_APP\HIDROFLOW\src\HidroFlow.jsx:881:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:882:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:883:{/* Banda occidental conceptual de la subcuenca La Iguaná PC_80.
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:884:    Ayuda a leer que PC_80 y la subcuenca quedan al occidente del Río Medellín. */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:885:<div
  01_APP\HIDROFLOW\src\HidroFlow.jsx:886:  style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:887:    position: "absolute",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:888:    left: "8%",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:889:    top: "14%",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:890:    width: "60%",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:913:    whiteSpace: "nowrap"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:914:  }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:915:>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:916:  Occidente del Río Medellín · Subcuenca La Iguaná PC_80
  01_APP\HIDROFLOW\src\HidroFlow.jsx:917:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:918:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:919:        {/* Línea IDF–PC_80 desactivada.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:920:    La relación IDF es pluviométrica, no una conexión hidráulica.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:921:    Se evita sugerir cruce físico del Río Medellín. */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:922:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1111:// Subcomponente: Card "Condición de Humedad (AMC) y Urbanización"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1112:// (versión con hooks por named import: useState/useEffect/useCallback)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1113:// ───────────────────────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1114:function AMCPanel({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1115:  // Normalizaciones (evitan NaN/undefined)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1116:  const amcSel = params?.amcActual ?? "II";
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1117:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:    ? params.porcentajeImpermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    : 60; // ← unifica default con ModHidrogramas
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1120:  const cnBase = Number.isFinite(params?.cnBase)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1121:    ? params.cnBase
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1122:    : (Number.isFinite(params?.CN) ? params.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1123:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1124:  // Estado local para el slider (evita flood al arrastrar)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1125:  const [pctLive, setPctLive] = useState(pctImp);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1126:  useEffect(() => { setPctLive(pctImp); }, [pctImp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1127:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1128:  // Commit del % Impermeable (al soltar / perder foco)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1129:  const commitPct = useCallback((v) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1130:    setParams(prev => ({ ...prev, porcentajeImpermeable: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1131:    if (import.meta.env.DEV) console.log("[AMC]", "%Impermeable ->", v);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1132:  }, [setParams]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1133:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1134:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1135:    <div style={{ marginTop: 16, padding: 16, border: '1px solid #1F2F45', borderRadius: 10, background: '#0F1624' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1136:      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1137:        <h3 style={{ margin: 0, fontSize: 16 }}>Condición de Humedad (AMC) y Urbanización</h3>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1138:        <small style={{ opacity: 0.75 }}>Ajusta AMC, % Impermeable y CN II base</small>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1211:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1212:          <small style={{ display: 'block', marginTop: 8, opacity: 0.75 }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1213:            Si no defines CN II base, se usa el CN clásico (params.CN)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1214:          </small>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1215:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1216:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1217:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1218:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1219:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1220:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1221:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1222:function ModParams({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1223:  // Cálculos de Tc y utilidades locales
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1224:  const tc      = useMemo(() => calcTc(params), [params]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1225:  const set     = k => v => setParams(p => ({ ...p, [k]: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1226:  const tcStats = tc.filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1227:  const tcMed   = tcStats.length ? tcStats.reduce((s, r) => s + r.h, 0) / tcStats.length : 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1228:  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1229:  // Persistir Tc medio (min) en params para otros módulos (Hietogramas, Hidrogramas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1230:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1231:    if (!isFinite(tcMed) || tcMed <= 0) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1232:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1233:    const tcMedMin = tcMed * 60; // horas → minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1234:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1235:    if (params.tcMedMin === tcMedMin) return;
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1249:        title="Morfometría de Cuenca"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1250:        sub="Parámetros geomorfológicos · Índices · Tiempos de concentración"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1251:        accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1252:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1253:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1254:      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "start" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1255:        {/* Identificación */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1256:        <Card title="Identificación" accent={C.accent}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1257:          <Field label="Nombre cuenca" value={params.nombre_cuenca} onChange={set("nombre_cuenca")} type="text" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1258:          <Field label="Δt cálculo"     value={params.dt}            onChange={set("dt")}             unit="min" step="0.5" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1259:          <Field label="CN (CNII)"       value={params.CN}            onChange={set("CN")}             step="1" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1260:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1261:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1262:        {/* Punto de Salida (Outlet) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1263:        <Card title="Punto de Salida (Outlet)" accent={C.teal} style={{ gridColumn: "1 / -1" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1264:          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 10, alignItems: "end" }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1265:            <Field label="Latitud salida"  value={params.lat_salida} onChange={set("lat_salida")} unit="°N" step="0.00001" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1266:            <Field label="Longitud salida" value={params.lon_salida} onChange={set("lon_salida")} unit="°W" step="0.00001" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1267:            <Field label="Cota salida"     value={params.alt_salida} onChange={set("alt_salida")} unit="msnm" step="1" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1268:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1269:            <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1270:              fontFamily: mono, fontSize: 8, color: C.muted, padding: "6px 10px", borderRadius: 8,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1271:              background: `${C.teal}0A`, border: `1px solid ${C.teal}25`, lineHeight: 2
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1272:            }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1273:              <div style={{ color: C.teal, fontWeight: 700, marginBottom: 3 }}>⊕ Punto de salida activo</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1274:              <div>Lat: <span style={{ color: C.text }}>{(+params.lat_salida || 0).toFixed(6)}°</span></div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1275:              <div>Lon: <span style={{ color: C.text }}>{(+params.lon_salida || 0).toFixed(6)}°</span></div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1276:              <div>Alt: <span style={{ color: C.text }}>{+params.alt_salida || 0} msnm</span></div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1277:              <div style={{ marginTop: 4, color: C.muted2, fontSize: 7.5 }}>Usado en: Influencia · SIATA · IDF ponderada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1278:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1279:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1280:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1281:          {/* Mini‑mapa del outlet (asegura numeric cast con +) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1282:          <OutletMiniMap
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1283:            lat={+params.lat_salida || 6.185083}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1284:            lon={+params.lon_salida || -75.659972}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1285:            alt={+params.alt_salida || 1702}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1286:            idf={params.idf}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1287:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1288:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1289:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1290:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1291:        {/* Geometría */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1292:        <Card title="Geometría" accent={C.accent2}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1293:          <Field label="Área"            value={params.area}            onChange={set("area")}            unit="km²" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1294:          <Field label="Perímetro"       value={params.perimetro}       onChange={set("perimetro")}       unit="km" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1295:          <Field label="Longitud cauce"  value={params.longitud_cauce}  onChange={set("longitud_cauce")}  unit="km" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1296:          <Field label="Longitud cuenca" value={params.longitud_cuenca} onChange={set("longitud_cuenca")} unit="km" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1297:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1298:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1299:        {/* Cotas y Pendientes */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1300:        <Card title="Cotas y Pendientes" accent={C.accent3}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1301:          <Field label="Cota máxima"       value={params.cota_max}          onChange={set("cota_max")}          unit="msnm" step="1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1302:          <Field label="Cota mínima"       value={params.cota_min}          onChange={set("cota_min")}          unit="msnm" step="1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1303:          <Field label="Cota mayor cauce"  value={params.cota_mayor_cauce}  onChange={set("cota_mayor_cauce")}  unit="msnm" step="1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1304:          <Field label="Cota menor cauce"  value={params.cota_menor_cauce}  onChange={set("cota_menor_cauce")}  unit="msnm" step="1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1305:          <Field label="Pendiente media"   value={params.pendiente_cuenca}  onChange={set("pendiente_cuenca")}  unit="%" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1306:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1307:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1308:      {/* ⬆️ Cierre del grid de Morfometría — PUNTO DE INSERCIÓN CORRECTO */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1309:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1310:      {/* ── Card AMC y Urbanización (subcomponente) ────────────────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1311:      <AMCPanel params={params} setParams={setParams} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1312:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1313:      {/* ── KPIs de forma, compacidad, pendiente y Tc promedio ─────────────────── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1314:      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1315:        {[
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1316:          { v: (params.perimetro / (2 * Math.sqrt(Math.PI * params.area))).toFixed(3),   l: "Índice Gravelius", s: "Kc", a: C.accent },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1317:          { v: ((params.longitud_cuenca ** 2) / params.area).toFixed(3),                 l: "Índice de Forma", s: "Rf", a: C.accent2 },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1318:          { v: (params.area / (params.longitud_cuenca ** 2)).toFixed(4),                 l: "Coef. Compacidad", s: "Cc", a: C.accent3 },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1319:          { v: ((params.cota_max - params.cota_min) / (params.longitud_cauce * 1000) * 1000).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1320:            l: "Pendiente cauce", s: "So ‰", a: C.gold },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1321:          { v: (tcMed * 60).toFixed(2),                                                  l: "Tc promedio", s: "min", a: C.accent4 },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1322:        ].map(({ v, l, s, a }) => <Kpi key={l} value={`${v} ${s}`} label={l} accent={a} />)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1323:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1324:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1325:      {/* ── Tabla de Tiempos de Concentración (6 métodos) ─────────────────────── */}
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1421:// MÓDULO HIETOGRAMAS — Distribución temporal + Curvas Huff
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1422:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1423:function ModHietogramas({ est, name, params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1424:  const [Tr, setTr] = useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1425:  const [durH, setDurH] = useState(3);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1426:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1427:  // Sync dtMin when params.dt changes externally (ej: carga de datos)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1428:  useEffect(() => { if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt); }, [params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1429:  const [guardarAMCenPanel, setGuardarAMCenPanel] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1430:  const [distType, setDistType] = useState("EPM_Q1");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1431:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1432:  // Hietograma activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1433:  const hiet = useMemo(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1434:    () => calcHietograma(est, Tr, durH, dtMin, distType),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1445:  // Vector de incrementos (mm por bloque) y Δt
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1446:  const P_mm  = hiet.data.map((r, i, a) => (i === 0 ? 0 : +(r.pAcum - a[i - 1].pAcum).toFixed(5)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1447:  const dt_min = dtMin;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1448:  const A_km2  = Number.isFinite(params?.area) ? params.area : 36.58;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1449:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1450:  // === Tc sugerido desde Panel (geomorfología) — informe amigable ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1451:  const tcList = useMemo(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1452:    () => calcTc(params).filter(r => isFinite(r.h) && r.h > 0),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1453:    [params]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1454:  ); // r.min está en minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1455:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1456:  const Tc_sugerido_min = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1457:    if (!tcList.length) return 120;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1458:    const s = [...tcList.map(r => r.min)].sort((a, b) => a - b);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1459:    const mid = Math.floor(s.length / 2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1467:  // Tc efectivo que entra a Q(t)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1468:  const tc_min = usarOverrideTc
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1469:  ? Tc_override_min 
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1470:  : +(params?.tcMedMin ?? Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1471:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1472:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1473:  // ✅ QA hidrológico (solo observación, no modifica nada)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1474:const qaHidro = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1475:  const tcBajo = tc_min < 5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1476:  const tcAlto = tc_min > 180;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1477:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1478:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1479:    tcWarning: tcBajo || tcAlto,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1480:    amcWarning: !params?.amcFuente,
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1496:  }, [tcList, Tc_sugerido_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1497:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1498:  // === SCS‑CN desde Preliminares + override + AMC auto (SIATA) ===
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1499:  const CN_panel        = Number.isFinite(params?.cnBase) ? params.cnBase : (params.CN ?? 75);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1500:  const AMC_panel       = params?.amcActual ?? "II"; // "I" | "II" | "III"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1501:  const pctImperv_panel = Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1502:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1503:  // Override SCS‑CN (para análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1504:  const [overrideSCS, setOverrideSCS] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1505:  const [CN_ovr, setCN_ovr]          = useState(CN_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1506:  const [AMC_ovr, setAMC_ovr]        = useState(AMC_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1507:  const [pctImp_ovr, setPctImp_ovr]  = useState(pctImperv_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1550:  if (!guardarAMCenPanel) return;                 // opt-in: solo si el usuario lo decide
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1551:  if (usarAMCauto && amcAuto?.amcActual) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1552:    // Evita escrituras innecesarias si no cambió
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1553:    if (params?.amcActual === amcAuto.amcActual) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1554:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1555:    // Auditoría útil para reportes y Preliminares
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1556:    const stamp = new Date().toISOString();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1557:    const payload = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1558:      amcActual:  amcAuto.amcActual,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1559:      amcFuente:  amcAuto.amcFuente || "SIATA",
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1575:  params?.amcActual,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1576:  setParams
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1577:]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1578:  /**
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1579:   * exportarPNGDesdeRef
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1580:   * @param {React.RefObject} refNodo       ref al contenedor (div) que envuelve ResponsiveContainer
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1581:   * @param {string}          nombreArchivo nombre del PNG a descargar
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1582:   */
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1912:  const [Tr, setTr]       = useState(25);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1913:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1914:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1915:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1916:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1917:  // ── CN efectivo (CNact) con default coherente a la UI (60 % imperv.)
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1937:    if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1938:  }, [params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1939:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1940:  // ── Parámetros HU
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1941:  const [tcSrc, setTcSrc] = useState(0);       // índice del Tc activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1942:  const [kR, setKR]       = useState(1.2);     // Clark
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1943:  const [Ct, setCt]       = useState(2.0);     // Snyder
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1944:  const [Cp, setCp]       = useState(0.62);    // Snyder
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1945:  const [CpSCSMod, setCpSCSMod] = useState(2.08); // SCS Mod
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1946:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1947:  // ── Tc, unidades y pendiente
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1948:  const tcList = useMemo(() => calcTc(params).filter(r => isFinite(r.h) && r.h > 0), [params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1949:  const tc_h   = tcList[tcSrc]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1950:  const tc_min = tc_h * 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1951:  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1952:  const area_mi2 = params.area * 0.386102;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1953:  const L_mi     = params.longitud_cauce * 0.621371;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1954:  const S_m_km   = (params.cota_mayor_cauce - params.cota_menor_cauce) / params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1955:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1956:  // ── Hietograma (Tr, 3 h de evento, dtMin, EPM_Q1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1957:  const hiet = useMemo(() => calcHietograma(est, Tr, 3, dtMin, "EPM_Q1"), [est, Tr, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1958:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1959:  // ── Lluvia efectiva con CN efectivo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1960:  const lluvEfect = useMemo(() => calcLluviaEfectiva(hiet, CNact), [hiet, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1961:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1962:  // ── Unidades Hidrológicas (5 métodos)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1963:  const hu_scs    = useMemo(() => calcHUSCS(params.area, tc_h, dtMin), [params.area, tc_h, dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1964:  const hu_scsMod = useMemo(() => calcHUSCS_Mod(params.area, tc_h, dtMin, CpSCSMod), [params.area, tc_h, dtMin, CpSCSMod]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1965:  const hu_snyder = useMemo(() => calcHUSnyder(area_mi2, L_mi, L_mi * 0.35, dtMin, Ct, Cp), [area_mi2, L_mi, dtMin, Ct, Cp]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1966:  const hu_wh     = useMemo(() => calcHUWilliamsHann(params.area, params.longitud_cauce, S_m_km, CNact, dtMin), [params, dtMin, CNact]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1967:  const hu_clark  = useMemo(() => calcClarkIUH(params.area, tc_h, dtMin, kR), [params.area, tc_h, dtMin, kR]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1968:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1969:  // ── Convolución (Pe * HU) → hidrogramas por método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1970:  const hidros = useMemo(() => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1971:    [hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark].map(hu => calcHidroCompleto(lluvEfect, hu, dtMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1972:  ), [lluvEfect, hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1973:
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2200:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2201:  const amcWarning = params?.amcActual === "III";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2202:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2203:  // En Hidrología solo observamos estados, no persistimos ni override
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2204:  const amcPersistiendo = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2205:  const isOverride = false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2206:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2207:  return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2210:    amcPersistiendo,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2211:    isOverride
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2212:  };
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2213:}, [tc_min, params?.amcActual]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2214:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2215:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2216: 
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2217:  // ── Resumen rápido (si ya usas buildResumenQ, úsalo)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2218:  const resumenQ = useMemo(() => buildResumenQ(params, est, dtMin, CNact), [params, est, dtMin, CNact]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2219:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2220:  /* ──────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2221:     DEBUG TEMPORAL: inspeccionar etiquetas de método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2222:     ────────────────────────────────────────────────────────────── */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2223:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2224:    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas resumenQ:', (resumenQ ?? []).map(r => r.nombre ?? r.metodo));
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2385:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2386:         <div>Escenarios Tc para Q(t):</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2387:         <div>• Operativo Q(t): {tc_min.toFixed(1)} min · activo</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2388:         <div>• Índice global: {Number.isFinite(params?.tcMedMin) ? params.tcMedMin.toFixed(1) : "—"} min · referencia</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2389:         <div>• Comparador: pendiente · referencia especializada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2390:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2391:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2392:       <div className={qaStatus.amcWarning ? "text-red-400" : "text-blue-400"}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2393:         AMC: {params?.amcActual ?? "N/A"} ({params?.amcFuente ?? "Sin fuente"})
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2394:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2395:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2396:       <div className={qaStatus.amcPersistiendo ? "text-green-400" : "text-slate-400"}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2397:         Persistencia AMC: {qaStatus.amcPersistiendo ? "ON" : "OFF"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2398:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2399:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2449:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2450:// MÓDULO SAR — GT-AS-004 §3 Almacenamiento y Regulación (COMPLETO)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2451:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2452:function ModSAR({params,est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2453:  const [Tr,setTr]=useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2454:  const [durH,setDurH]=useState(3);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2455:  const [dtMin,setDtMin]=useState(()=>+params.dt||5);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2456:  useEffect(()=>{ if(params.dt&&+params.dt!==dtMin) setDtMin(+params.dt); },[params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2457:  const [siPct,setSiPct]=useState(80);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2458:  const [catSAR,setCatSAR]=useState("Intermedios");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2459:  const [distType,setDistType]=useState("EPM_Q1");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2460:  const [metodoPost,setMetodoPost]=useState("SCS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2461:  const reportRef=useRef();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2462:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2471:  const lluvPost=useMemo(()=>calcLluviaEfectiva(hiet,cnIII_post),[hiet,cnIII_post]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2472:  const lluvPre =useMemo(()=>calcLluviaEfectiva(hiet,cnIII_pre),[hiet]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2473:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2474:  // Tc Témez para la cuenca
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2475:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2476:  const tc_h=tcList[0]?.h||0.5;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2477:  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2478:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2479:  // Método hidrograma post-urbano seleccionable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2480:  const huPost=useMemo(()=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2481:    if(metodoPost==="Clark") return calcClarkIUH(params.area,tc_h,dtMin,1.2);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2482:    if(metodoPost==="Snyder") return calcHUSnyder(params.area*0.386102,params.longitud_cauce*0.621371,params.longitud_cauce*0.621371*0.35,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2483:    if(metodoPost==="WH") return calcHUWilliamsHann(params.area,params.longitud_cauce,S_m_km,cnIII_post,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2484:    return calcHUSCS(params.area,tc_h,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2485:  },[metodoPost,params,tc_h,dtMin,cnIII_post]);
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2500:    cota_max:params.cota_max,cota_min:params.cota_min,CN:params.CN,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2501:    tc_h,stn:name,Tr,dur_h:durH,distType,dt_min:dtMin,Ptotal:hiet.Ptotal,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2502:    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2503:    hiet,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2504:    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2505:    volSAR,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2506:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2679:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2680:// MÓDULO MÉTODO RACIONAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2681:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2682:function ModRacional({params,est,name}){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2683:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2684:  const tc_min=useMemo(()=>tcList.reduce((s,r)=>s+r.min,0)/(tcList.length||1),[tcList]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2685:  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2686:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2687:    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2688:    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2689:      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2690:      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2691:      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2829:      stroke="#0A3A5A" strokeWidth={3.5} fill="none" opacity={0.7}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2830:    <path d={`M ${toXY(5.96,-75.66).join(",")} Q ${toXY(6.08,-75.62).join(",")} ${toXY(6.22,-75.57).join(",")} Q ${toXY(6.34,-75.56).join(",")} ${toXY(6.47,-75.54).join(",")}`}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2831:      stroke={C.accent} strokeWidth={1} fill="none" opacity={0.25}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2832:    {/* Radio cuenca */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2833:    {[8,16,24].map((r,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2834:      const rPx=r/(LON_MAX-LON_MIN)*W;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2835:      return(<circle key={r} cx={cx} cy={cy} r={rPx} fill="none" stroke={C.teal} strokeWidth={0.5} strokeDasharray="4 5" opacity={0.12+i*0.04}/>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2836:    })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2837:    {/* Líneas de conexión */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2838:    {ests.map((e,i)=>{const[ex,ey]=toXY(e.lat,e.lon);const pct=e.pct||0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2859:        {pct>0&&<text x={ex+r+3} y={ey+14} fill={col} fontSize={6.5} fontFamily="monospace">{pct.toFixed(1)}%</text>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2860:      </g>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2861:    })}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2862:    {/* Cuenca */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2863:    <circle cx={cx} cy={cy} r={11} fill={C.gold} opacity={0.9}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2864:    <circle cx={cx} cy={cy} r={15} fill="none" stroke={C.gold} strokeWidth={1.5} opacity={0.35}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2865:    <text x={cx+17} y={cy+4} fill={C.gold} fontSize={9} fontFamily="monospace" fontWeight={700}>⊕ Cuenca</text>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2866:    {/* Leyenda */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2867:    <g transform={`translate(6,${H-72})`}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2868:      <rect width={118} height={68} rx={5} fill={`${C.panel}EE`} stroke={C.border} strokeWidth={0.5}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2869:      <text x={6} y={13} fill={C.muted} fontSize={8} fontFamily="monospace" fontWeight={700}>LEYENDA</text>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2870:      {[[C.gold,"Cuenca objetivo"],[C.teal,"Dominante"],[C.accent2,"Alta inf. (>12%)"],[C.accent,"Media inf."],[C.muted2,"Baja inf."],[C.rose,"Mantenimiento"]].map(([col,lbl],i)=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2871:        <g key={i} transform={`translate(6,${19+i*8})`}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2872:          <circle r={2.5} cx={2.5} cy={0} fill={col}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2873:          <text x={9} y={4} fill={C.muted2} fontSize={7} fontFamily="monospace">{lbl}</text>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2874:        </g>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2875:      ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2876:    </g>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2881:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2882:// MÓDULO INFLUENCIA — Ponderación multicriterio + Escenarios
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2883:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2884:function ModInfluencia({params}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2885:  const[method,setMethod]=useState("compuesto");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2886:  const[potIDW,setPotIDW]=useState(2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2887:  const[selIdx,setSelIdx]=useState(0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2888:  const[excl,setExcl]=useState(new Set());
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2889:  const[Tr,setTr]=useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2890:  const[dMin,setDMin]=useState(30);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2891:  const[showLabels,setShowLabels]=useState(true);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2892:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2893:  // Punto de salida → fuente única de verdad para selección de estaciones
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2894:  const cLat=+params.lat_salida||6.185;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2895:  const cLon=+params.lon_salida||-75.660;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2896:  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2897:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2898:  const activos=useMemo(()=>ESTACIONES_SIATA.filter((_,i)=>!excl.has(i)),[excl]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2899:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2900:  const pond=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2901:    if(method==="idw")      return calcIDW(activos,cLat,cLon,potIDW);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2902:    if(method==="thiessen") return calcThiessen(activos,cLat,cLon);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3124:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3125:// MÓDULO SIATA — Integración + Series + Catálogo + Arquitectura
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3126:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3127:function ModSIATA({params}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3128:  const[selStn,setSelStn]=useState(0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3129:  const[subTab,setSubTab]=useState("series");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3130:  const[apiStatus,setApiStatus]=useState("idle");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3131:  const[filterVar,setFilterVar]=useState("Todas");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3132:  const[simDatos]=useState(()=>ESTACIONES_SIATA.map((_,i)=>generarSerieSIATA(42+i*7)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3133:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3137:  const maxLluvia=Math.max(...serie.map(r=>r.lluvia));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3138:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3139:  // Punto de salida → fuente única de verdad
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3140:  const cLat=+params.lat_salida||6.185, cLon=+params.lon_salida||-75.660;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3141:  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3142:  const pesosVisuales=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3143:    const p=calcCompuesto(ESTACIONES_SIATA,cLat,cLon,cAlt);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3144:    return ESTACIONES_SIATA.map(e2=>p.find(x=>x.codigo===e2.codigo)||{pct:0,peso:0});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3145:  },[cLat,cLon,cAlt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3146:  const estsConPeso=ESTACIONES_SIATA.map((e2,i)=>({...e2,...pesosVisuales[i]}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3147:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3482:// APP PRINCIPAL v3.1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3483:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3484:const TABS=[
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3485:  {id:"params",     label:"Parámetros",   icon:"⬡", acc:C.accent,   desc:"Morfometría · Índices · 6 Métodos Tc"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3486:  {id:"idf",        label:"IDF",          icon:"⌁", acc:C.accent3,  desc:"20 Est. EPM 2025 · I=k/(c+d)ⁿ · PDF calibradas"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3487:  {id:"hiet",       label:"Hietogramas",  icon:"🌧", acc:C.accent,   desc:"GT-AS-004 §3.3 · Curvas Huff Q1-Q4 · 5 distribuciones"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3488:  {id:"hidro",      label:"Hidrogramas",  icon:"≋", acc:C.accent2,  desc:"SCS · SCS Mod. · Snyder · Williams&Hann · Clark IUH"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3489:  {id:"racional",   label:"Racional",     icon:"◈", acc:C.gold,     desc:"Q=C·I·A/3.6 · Abstracción SCS · Todos los Tr"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3490:  {id:"sar",        label:"SAR",          icon:"◫", acc:C.accent4,  desc:"GT-AS-004 §3 · Hietograma+Convolución+Vol. · PDF/Excel"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3491:  {id:"influencia", label:"Influencia",   icon:"⊕", acc:C.teal,     desc:"IDW · Thiessen · Altitudinal · Compuesto · Escenarios · Mapa AMVA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3494:export default function HidroFlow({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3495:  tab: tabExterno,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3496:  setTab: setTabExterno,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3497:  onContextoComparador,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3498:}) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3499:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3500:// Manejo de tabs (modo controlado / no controlado)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3501:// ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3502:const [tabInterno, setTabInterno] = useState("params");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3503:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3504:// Si viene del layout, usar ese.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3505:// Si no, usar estado interno.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3506:const tab = tabExterno ?? tabInterno;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3507:
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3519:  }, []);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3520:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3521:useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3522:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3523:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3524:  const cnBase = Number.isFinite(params?.cnBase)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3525:    ? params.cnBase
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3526:    : Number.isFinite(params?.CN)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3527:    ? params.CN
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3528:    : 75;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3529:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3530:  const metodosTcRacional = calcTc(params).filter((r) => Number.isFinite(r?.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3531:  const tcRacionalMin =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3532:    metodosTcRacional.length > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3533:      ? metodosTcRacional.reduce((suma, metodo) => suma + Number(metodo.min || 0), 0) /
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3534:        metodosTcRacional.length
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3535:      : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3536:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3538:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3539:  const resultadosRacionalExportable =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3540:    estacionRacional &&
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3541:    Number.isFinite(Number(params?.area)) &&
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3542:    Number.isFinite(Number(params?.CN)) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3543:    Number.isFinite(Number(tcRacionalMin)) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3544:    Number(tcRacionalMin) > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3545:      ? calcRacional(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3546:          estacionRacional,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3547:          Number(params.area),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3548:          Number(tcRacionalMin),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3549:          Number(params.CN)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3550:        )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3551:      : [];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3552:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    estacion_idf: stn,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    periodos_retorno: TR_LIST,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3561:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3566:      resultados: resultadosRacionalExportable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3567:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3568:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3569:    cuencaNombre:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3570:      params?.nombreCuenca ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3571:      params?.cuencaNombre ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3572:      params?.nombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3573:      "Quebrada La Iguaná - PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3574:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3575:    area_km2:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3576:      params?.area_km2 ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3577:      params?.areaKm2 ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3578:      params?.area ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3579:      params?.A ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3580:      null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3581:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3582:    pendiente_media_pct:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3583:  params?.pendiente_media_pct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3584:  params?.pendienteMediaPct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3585:  params?.pendiente_pct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3586:  params?.S_pct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3587:  params?.pendiente_media ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3588:  params?.pendienteMedia ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3589:  params?.pendiente ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3590:  params?.slope_pct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3591:  params?.slopePct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3592:  8.43,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3593:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3594:    longitud_cauce_km:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3595:  params?.longitud_cauce_km ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3596:  params?.longitudCauceKm ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3597:  params?.longitud_km ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3598:  params?.L ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3599:  params?.longitudCauce ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3600:  params?.longitud_cauce ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3601:  15.524,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3602:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3603:    CN: cnBase,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3604:    CN_base: params?.cnBase ?? params?.CN ?? cnBase,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3605:    CN_efectivo: params?.CN_efectivo ?? params?.cnEfectivo ?? cnBase,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3606:    AMC: params?.AMC ?? params?.amcActual ?? params?.amc ?? "II",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3607:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3608:    tc_metodos: calcTc(params),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3609:    
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3610:    lluvia_efectiva: previo?.lluvia_efectiva ?? false,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3611:    lluvia_efectiva_total_mm: previo?.lluvia_efectiva_total_mm ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3612:    hidrogramas: previo?.hidrogramas ?? {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3613:      fuente: "pendiente",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3614:      resultados: []
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3616:    hidrogramas_resumen: previo?.hidrogramas_resumen ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3617:    hidrograma_principal: previo?.hidrograma_principal ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3618:  }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3619:}, [onContextoComparador, params, stn, trStateGlobal?.Tr_activo]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3620:// Publicación base Tc para despertar el Índice Hidrológico global.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3621:// No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3622:useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3623:  const estadoTcActual = getTcState();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3624:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3625:  const agenteTieneEstado =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3633:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3634:  if (agenteTieneEstado || agenteTieneEstadoEspecializado) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3635:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3636:  const tcArrayBase = calcTc(params).filter(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3637:    (r) => Number.isFinite(r.h) && Number.isFinite(r.min) && r.h > 0 && r.min > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3638:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3639:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3640:  if (!tcArrayBase.length) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3641:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3642:  const metodosTcBase = mapTcResultados(tcArrayBase);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3652:      : (valoresOrdenados[mitad - 1] + valoresOrdenados[mitad]) / 2;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3653:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3654:  const tcBase =
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3655:    Number.isFinite(params?.tcMedMin) && params.tcMedMin > 0
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3656:      ? params.tcMedMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3657:      : tcMedianaBase;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3658:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3659:  setTcState({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3660:    Tc_final: tcBase,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3661:    metodosTc: metodosTcBase,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3662:    contextoTc: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3663:      pendiente:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3664:        params?.pendiente_media_pct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3665:        params?.pendienteMediaPct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3666:        params?.pendiente_pct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3667:        params?.S_pct ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3668:        params?.pendiente ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3669:        8.43,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3670:      area:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3671:        params?.area_km2 ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3672:        params?.areaKm2 ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3673:        params?.area ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3674:        params?.A ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3675:        null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3676:      CN: params?.CN ?? params?.cnBase ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3677:      fuente: "hidroflow_base"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3678:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3679:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3680:}, [params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3681:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3682:  // ────────────────── Defaults AMC / %imperv / CNbase (solo si faltan) ──────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3683:useEffect(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3684:  setParams(prev => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3685:    const amc  = prev?.amcActual ?? "II"; // I | II | III
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3686:    const pct  = Number.isFinite(prev?.porcentajeImpermeable) ? prev.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3687:    const base = Number.isFinite(prev?.cnBase) ? prev.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3688:              : (Number.isFinite(prev?.CN) ? prev.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3689:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3690:    // Evita re-render si nada cambia
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3719:      <StationSel sel={stn} onSel={setStn}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3720:      <div style={{width:1,height:20,background:C.border}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3721:      <div style={{fontSize:9.5,color:C.muted,display:"flex",gap:9,fontFamily:mono}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3722:        <span style={{color:C.text,fontWeight:600,fontFamily:sans}}>{params.nombre_cuenca}</span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3723:        <span>A={params.area}km²</span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3724:        <span>CN={params.CN}</span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3725:        <span>Δt={params.dt}min</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3726:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3727:      <nav style={{display:"flex",gap:1,marginLeft:"auto",flexWrap:"wrap"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3728:        {TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3729:          style={{padding:"4px 9px",borderRadius:6,border:"none",cursor:"pointer",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3730:            background:tab===t.id?`${t.acc}15`:"transparent",color:tab===t.id?t.acc:C.muted,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3731:            fontSize:9.5,fontWeight:tab===t.id?700:500,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3750:          <p style={{fontSize:8.5,color:C.muted,marginTop:1,fontFamily:mono}}>{TABS.find(t=>t.id===tab)?.desc}</p>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3751:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3752:      </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3753:      {tab==="params"     &&<ModParams     params={params} setParams={setParams}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3754:      {tab==="idf"        &&<ModIDF        est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3755:      {tab === "hiet" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3756:        <ModHietogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3757:          est={est}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3758:          name={stn}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3759:          params={params}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3760:          setParams={setParams}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3761:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3762:      )}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3763:      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={name} onContextoComparador={onContextoComparador} />}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3764:      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn}/>}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3765:      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3766:      {tab === "Influencia" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3767:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3768:           padding: 20,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3769:           color: "#9fffe8",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3770:           fontFamily: "monospace"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3771:        }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3775:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3776:      )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3777:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3778:      {tab==="siata"      &&<ModSIATA      params={params}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3779:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3780:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3781:    {/* ── FOOTER ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3782:    <div style={{borderTop:`1px solid ${C.border}`,padding:"7px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3783:      <span style={{fontSize:8,color:C.muted,fontFamily:mono}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3784:        HidroFlow v3.1 · GT-AS-004 Rev.0 2026-01-07 · SIATA AMVA · {pdfN} est. PDF + {refN} ref. · 5 HU · IDW/Thiessen/Altitudinal/Compuesto · Huff Q1-Q4 · Clark IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3785:      </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3786:      <div style={{display:"flex",gap:10,fontFamily:mono,fontSize:8}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3787:        {[{l:stn,a:C.accent3},{l:`A=${params.area}km²`,a:C.accent},{l:`CN=${params.CN}`,a:C.accent2},{l:`Δt=${params.dt}min`,a:C.gold},{l:`17 est. SIATA`,a:C.teal}].map(({l,a})=><span key={l} style={{color:a}}>{l}</span>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3788:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3789:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3790:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3791:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3792:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3793:


## 5. Búsqueda en Índice Hidrológico

  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:1:import React, { useState, useEffect } from "react";
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:18:  useEffect(() => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:19:    const unsubscribe = subscribeTc(setTcStateLocal);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:20:    return () => unsubscribe();
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:52:    // Racional
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:53:    C = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:54:    racional = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:55:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:56:    // Cuenca
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:57:    cuencaNombre = "Cuenca activa",
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:176:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:177:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:178:  const formatNumero = (valor, decimales = 2) => {
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:438:      Tr_activo: trNumerico,
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:451:  const numeroIndicePositivo = (valor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:452:    const numero = numeroIndiceSeguro(valor);
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:453:    return numero !== null && numero > 0 ? numero : null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:454:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:455:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:456:  const racionalContextoIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:457:    contexto?.metodo_racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:458:    contexto?.racional ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:459:    contexto?.racional_exportable ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:460:    racional ??
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:471:  const resultadoRacionalTrIndice = resultadosRacionalIndice.find((fila) =>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:472:    Math.abs(Number(fila?.Tr) - trActivoNormalizadoIndice) < 0.001
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:473:  );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:474:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:475:  const areaRacionalIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:476:    numeroIndicePositivo(racionalContextoIndice?.area_km2) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:477:    numeroIndicePositivo(contexto?.area_km2) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:478:    numeroIndicePositivo(contexto?.area) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:479:    numeroIndicePositivo(contexto?.cuenca?.area_km2) ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:480:    numeroIndicePositivo(area_km2);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:481:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:482:  const coeficienteRacionalTrIndice =
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:483:    numeroIndicePositivo(resultadoRacionalTrIndice?.C) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:484:    numeroIndicePositivo(C);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:485:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:486:  const qRacionalTrIndice =
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:487:    numeroIndicePositivo(resultadoRacionalTrIndice?.Q);
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:505:          <span style={estilos.label}>Punto de control</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:506:          <span style={estilos.value}>{puntoControl}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:507:        </div>
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:620:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:621:          <span style={estilos.label}>CN base</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:622:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:623:            {CN_base !== null && CN_base !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:624:              ? formatNumero(CN_base, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:625:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:626:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:627:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:628:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:629:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:630:          <span style={estilos.label}>CN efectivo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:631:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:632:            {CN_efectivo !== null && CN_efectivo !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:633:              ? formatNumero(CN_efectivo, 1)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:634:              : CN !== null && CN !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:635:              ? formatNumero(CN, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:636:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:637:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:638:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:639:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:640:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:645:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:646:          <span style={estilos.label}>S</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:647:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:648:            {S_mm !== null && S_mm !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:649:              ? `${formatNumero(S_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:650:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:651:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:652:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:653:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:654:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:655:          <span style={estilos.label}>Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:656:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:657:            {Ia_mm !== null && Ia_mm !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:658:              ? `${formatNumero(Ia_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:659:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:660:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:661:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:662:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:663:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:664:          <span style={estilos.label}>Impermeabilidad</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:665:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:666:            {porcentaje_impermeable !== null &&
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:667:            porcentaje_impermeable !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:668:              ? `${formatNumero(porcentaje_impermeable, 1)} %`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:669:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:670:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:671:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:672:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:673:        <p style={estilos.muted}>
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:715:          rangoTcAgente.max,
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:726:      : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:727:  </span>
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:902:          <span
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:929:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:930:          <span style={estilos.label}>Q racional Tr activo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:931:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:932:            {qRacionalTrIndice !== null ? `${formatNumero(qRacionalTrIndice, 2)} m³/s` : "Pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:933:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:934:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:935:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:936:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:937:          Para La Iguaná PC_80, el Método Racional se conserva como contraste
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:938:          referencial. El cálculo de C en función del CN queda en radar para el
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:941:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:942:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:943:          <span style={{ ...estilos.chip, ...estilos.chipWarn }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:944:            {coeficienteRacionalTrIndice !== null ? `C Tr ${trActivoIndice}a = ${formatNumero(coeficienteRacionalTrIndice, 4)}` : "C = f(CN) · pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:945:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:946:          <span style={estilos.chip}>Contraste</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:947:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:948:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:949:        <button style={estilos.button} onClick={() => goToTab("racional")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:950:          Ver método racional


## 6. Búsqueda en ComparadorMultiMetodo

  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1:import React, { useEffect, useMemo, useState } from "react";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:3:import { setTcState } from "../agents/tcAgent";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:4:import { calcTc, mapTcResultados } from "../services/hidroEngine";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:5:import { seleccionarTc } from "../services/tcSelector";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:6:import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:  resumenComparadorCatalogo,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:13:  evaluarCompetenciaComparador,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:14:} from "../data/matrizCompetenciaComparador";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:15:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:16:import { conceptuarCuenca } from "../data/clasificacionCuenca";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:17:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:18:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:19:  obtenerAuditoriaPendienteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:20:  obtenerCriterioPendientesAuditoria,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:21:} from "../data/auditoriaPendientesTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:22:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:23:export default function ComparadorMultiMetodo({ contexto = null }) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:24:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:25:  const [filtroEstado, setFiltroEstado] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:26:  const [filtroTipo, setFiltroTipo] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:27:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:28:  // ✅ CONTEXTO BASE
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:29:const contextoBase = contexto || {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:30:  cuencaNombre: "Quebrada La Iguaná - PC_80",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:31:  area_km2: 46.8516,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:32:  pendiente_media_pct: 8.43,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:33:  CN: 88,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:34:  lluvia_efectiva: true
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:35:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:36:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:37:const fuenteContexto = contexto ? "motor HidroFlow" : "contexto base";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:38:
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:55:const metodosTc = mapTcResultados(tcArray);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:56:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:57:// ✅ CONTEXTO HIDROLÓGICO
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:58:const contextoTc = {
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:69:const conceptoCuenca = useMemo(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:70:  return conceptuarCuenca(contextoBase);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:71:}, [contextoBase]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:72:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:73:// ✅ Tc FINAL
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:74:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:75:const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:76:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:77:const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:78:  metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:79:  evaluacionCompetencia?.tc
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:80:);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:81:// ✅ Publicar Tc en el agente DESPUÉS del render
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:82:useEffect(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83:  if (Tc_final !== null && Tc_final !== undefined) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:84:    setTcState({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:85:      Tc_final,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:86:      metodosTc,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:87:      contextoTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:88:      metodosTcCompetentes,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:89:      rangoCompetenteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:90:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:91:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:92:}, [Tc_final]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:93:
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:842:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:843:        ? areaKm2 * peTotalMm * 1000
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:929:  return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:930:    <main style={estilos.pagina}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:931:      <header style={estilos.encabezado}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:932:        {/* CONTEXTO HIDROLÓGICO ACTIVO */}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:933:<section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:934:  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:935:    border: "1px solid rgba(34, 211, 238, 0.25)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:936:    background: "rgba(15, 23, 42, 0.65)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:937:    borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:938:    padding: "12px 14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:949:      marginBottom: "6px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:950:    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:951:  >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:952:    Contexto hidrológico activo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:953:  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:954:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:955:  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:956:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:957:      display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:958:      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:962:    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:963:  >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:964:    <div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:965:      <strong>Cuenca:</strong>{" "}
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1019:        {fuenteContexto}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1020:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1021:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1022:  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1023:</section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1024:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1025:{/* CONCEPTO TÉCNICO DE CUENCA */}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1026:<section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1027:  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1028:    border: "1px solid rgba(34, 211, 238, 0.22)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1029:    background: "rgba(8, 47, 73, 0.28)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1030:    borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1031:    padding: "12px 14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1042:      marginBottom: "8px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1043:    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1044:  >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1045:    Concepto técnico de cuenca
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1046:  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1047:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1048:  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1049:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1050:      display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1051:      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1057:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1058:      <strong>Escala por área:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1059:      <span style={{ color: "#22c55e", fontWeight: 800 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1060:        {conceptoCuenca.area.etiqueta}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1061:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1062:      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1063:        {conceptoCuenca.area.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1064:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1065:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1066:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1067:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1068:      <strong>Clasificación por pendiente:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1069:      <div style={{ color: "#ffe7a3", marginTop: "4px", lineHeight: 1.45 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1070:        Criterio actual basado en Scp mientras se incorpora Sc de cuenca.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1071:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1072:      <span style={{ color: "#38bdf8", fontWeight: 800 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1073:        {conceptoCuenca.pendiente.etiqueta}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1074:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1075:      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1076:        {conceptoCuenca.pendiente.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1077:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1078:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1079:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1080:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1081:      <strong>Forma hidrológica:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1082:      <span style={{ color: "#facc15", fontWeight: 800 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1083:        {conceptoCuenca.forma.etiqueta}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1084:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1085:      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1086:        {conceptoCuenca.forma.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1087:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1088:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1089:  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1090:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1091:  {conceptoCuenca.advertencias.length > 0 && (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1092:    <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1093:      style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1094:        marginTop: "10px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1095:        borderTop: "1px solid rgba(34, 211, 238, 0.18)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1096:        paddingTop: "8px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1097:      }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1098:    >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1099:      {conceptoCuenca.advertencias.map((advertencia, index) => (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1100:        <div
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1101:          key={`advertencia-cuenca-${index}`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1102:          style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1103:            color: "#ffe7a3",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1104:            fontSize: "11px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1105:            marginTop: "4px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1106:            lineHeight: 1.45,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1107:          }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1127:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1128:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1129:        <div style={estilos.version}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1130:           {resumenComparadorCatalogo.version} · Fuente: {fuenteContexto}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1131:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1132:      </header>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1133:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1134:      <section style={estilos.gridResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1135:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1136:          <p style={estilos.numeroResumen}>{conteo.total}</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1293:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1294:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1295:            "Tipo de salida: Expediente hidrológico mínimo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1296:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1297:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1298:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1299:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1300:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1301:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1302:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1303:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1304:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1305:          const areaTextoResumen = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1306:          areaTextoResumen.value = textoResumenQ5;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1307:          areaTextoResumen.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1308:          areaTextoResumen.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1335:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1336:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1337:        onClick={() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1338:          const areaKm2 = Number(contextoBase?.area_km2);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1339:          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1340:          const volumenEsperadoM3 =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1341:            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1342:              ? areaKm2 * peTotalMm * 1000
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1343:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1344:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1345:          const formatearNumeroExpediente = (valor, decimales = 2) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1346:            if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1347:              return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1348:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1349:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1350:            const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1351:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1352:            return Number.isFinite(numero)
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1394:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1395:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1396:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1397:          const obtenerCandidatosQ5Contexto = () => {
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1410:            const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1411:            const dictamen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1412:              dictamenMetodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413:              obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1414:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1426:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1427:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1428:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1429:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1430:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1431:            .map((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1432:              const nombreMetodo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1433:                h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1434:                h?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1435:                h?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:          const filasQ5Markdown =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1472:            filasQ5DesdeCatalogo.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1473:              ? filasQ5DesdeCatalogo
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1474:              : filasQ5DesdeContexto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:          const tablaQ5Markdown = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1478:            "|---|---:|---:|---:|---|---|",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479:            ...filasQ5Markdown
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1480:          ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:          const estacionIdfExpediente = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1482:            contextoBase?.estacion_idf,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:            contextoBase?.estacionIDF,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:            contextoBase?.estacion,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1485:            contextoBase?.nombre_estacion,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1486:            contextoBase?.idf?.nombre,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1487:            contextoBase?.idf?.estacion
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1488:          ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1489:            .map((valor) => String(valor ?? "").trim())
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1490:            .find((valor) => valor && valor !== "—") ?? "SAN CRISTOBAL";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1491:          const faltantesExpediente = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1492:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1493:          if (!estacionIdfExpediente) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1494:            faltantesExpediente.push("Estación IDF");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1495:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1496:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1497:          if (!Number.isFinite(areaKm2)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1498:            faltantesExpediente.push("Área de cuenca");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1499:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1500:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1501:          if (!Number.isFinite(peTotalMm)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1502:            faltantesExpediente.push("Lluvia efectiva total");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1503:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1504:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1511:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1512:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1513:          if (
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1514:            !Array.isArray(contextoBase?.metodo_racional?.resultados) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1515:            contextoBase.metodo_racional.resultados.length === 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1516:          ) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517:            faltantesExpediente.push("Tabla Método Racional");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1518:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1519:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1520:          if (faltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1521:            window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1522:              [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1523:                "Expediente hidrológico mínimo incompleto.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1524:                "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1525:                "Antes de copiar el expediente firmado, publique el contexto hidrológico completo desde Hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1526:                "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1527:                "Faltan:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1528:                ...faltantesExpediente.map((item) => `- ${item}`)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1529:              ].join("\n")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1530:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1531:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1532:            return;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1533:          }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1534:          const trDisenoActivoExpediente = Number.isFinite(Number(contextoBase?.tr_diseno_activo))
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1535:            ? Number(contextoBase.tr_diseno_activo)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1536:            : 25;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1537:          const textoExpediente = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1538:            "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1539:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1540:            "## 1. Identificación",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1541:            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1542:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1543:            `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1544:            `Estación IDF: ${estacionIdfExpediente}`,
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1558:            "Roles Tc:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1559:            "- Tc global Índice: referencia hidrológica general.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1560:            "- Tc operativo Q(t): ruta interna del hidrograma.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1561:            "- Duración evento: 3 h para almacenamiento/regulación.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:            "## 6. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:            "Uso: contraste global independiente de caudal pico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1585:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1586:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:            contextoBase.metodo_racional.resultados.length > 0
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:                  ...contextoBase.metodo_racional.resultados.map((r) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:                    `| ${r.Tr} | ${formatearNumeroExpediente(r.I)} mm/h | ${formatearNumeroExpediente(r.P)} mm | ${formatearNumeroExpediente(r.C, 4)} | ${formatearNumeroExpediente(r.Q)} m³/s |`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:                  )
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:                ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:              : [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:                  "Disponibilidad: resultados no disponibles en el contexto exportable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:                  "Estado: sección informativa; consultar módulo Método Racional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:                ]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:            "## 7. Contraste Q-5 vs Método Racional",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1611:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1612:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1613:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1614:            "## 8. Restricciones técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1615:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1616:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1617:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:            "- No se recalculan hidrogramas en este expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:            "Tipo de salida: Expediente hidrológico mínimo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:          const areaTexto = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1634:          areaTexto.value = textoExpediente;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1635:          areaTexto.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1636:          areaTexto.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1660:        Copiar expediente hidrológico mínimo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1661:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1662:      {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663:        const areaKm2 = Number(contextoBase?.area_km2);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1664:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665:        const volumenEsperadoM3 =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:            ? areaKm2 * peTotalMm * 1000
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:          </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:


## 7. Búsqueda en agentes Tc/Tr

  01_APP\HIDROFLOW\src\agents\tcAgent.js:3:// ============================================================
  01_APP\HIDROFLOW\src\agents\tcAgent.js:4:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:5:let TcState = {
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:6:  Tc_final: null,
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:7:  metodosTc: null,
> 01_APP\HIDROFLOW\src\agents\tcAgent.js:8:  contextoTc: null
  01_APP\HIDROFLOW\src\agents\tcAgent.js:9:};
  01_APP\HIDROFLOW\src\agents\tcAgent.js:10:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:11:let listeners = [];
  01_APP\HIDROFLOW\src\agents\tcAgent.js:12:
  01_APP\HIDROFLOW\src\agents\tcAgent.js:13:export function setTcState(data) {
  01_APP\HIDROFLOW\src\agents\tcAgent.js:14:  TcState = { ...TcState, ...data };


  01_APP\HIDROFLOW\src\agents\trAgent.js:1:let trState = {
  01_APP\HIDROFLOW\src\agents\trAgent.js:2:  Tr_activo: 25,
  01_APP\HIDROFLOW\src\agents\trAgent.js:3:  fuente: "default",
> 01_APP\HIDROFLOW\src\agents\trAgent.js:4:  actualizado_en: null
  01_APP\HIDROFLOW\src\agents\trAgent.js:5:};
  01_APP\HIDROFLOW\src\agents\trAgent.js:6:
  01_APP\HIDROFLOW\src\agents\trAgent.js:7:const suscriptores = new Set();
  01_APP\HIDROFLOW\src\agents\trAgent.js:8:
  01_APP\HIDROFLOW\src\agents\trAgent.js:9:export function getTrState() {
  01_APP\HIDROFLOW\src\agents\trAgent.js:10:  return trState;


## 8. Resultado build actual antes de cambios

> hidroflow@3.2.0 build
> vite build

[36mvite v5.4.21 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 848 modules transformed.
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.41 kB[22m[1m[22m[2m │ gzip:   0.28 kB[22m
[2mdist/[22m[35massets/index-DkTXiRnO.css  [39m[1m[2m  0.23 kB[22m[1m[22m[2m │ gzip:   0.14 kB[22m
[2mdist/[22m[36massets/index-gx_3B3uw.js   [39m[1m[33m953.98 kB[39m[22m[2m │ gzip: 261.34 kB[22m
[32m✓ built in 2.81s[39m

## 9. Estado Git final de auditoría
?? 00_ADMIN/bitacora/OT-0049/
