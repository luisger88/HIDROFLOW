# OT-0051E — Auditoría cableado Índice Hidrológico

Fecha: 06/08/2026 15:17:16
Rama: ot-0051-alineacion-runtime-verdad-geomorfologica-motor

## 1. Hallazgo visual

Después de conectar ModRacional con onContextoComparador, el módulo central Racional sigue mostrando C y Q por Tr, pero el Índice lateral mantiene área, C y Q racional como pendientes. Se audita si IndiceHidrologico recibe contextoComparador o si usa props antiguas vacías.

## 2. Instancias de IndiceHidrologico en HidroFlow.jsx


## 3. Estado contextoComparador en HidroFlow.jsx


  01_APP\HIDROFLOW\src\HidroFlow.jsx:1:import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3:import { useState, useMemo, useCallback, useRef, useEffect } from "react";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:4:import { getTrState, subscribeTr } from "./agents/trAgent";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:5:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:6:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:7:  LineChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:8:  Line,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:9:  AreaChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:10:  Area,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:11:  BarChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:458:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:459:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:460:function Field({label,value,onChange,unit,step="0.001",type="number"}){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:461:  const[f,setF]=useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:462:  return(<div style={{marginBottom:11}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:463:    <label style={{display:"block",fontSize:10,color:C.muted,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.1em",fontFamily:mono}}>{label}</label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:464:    <div style={{display:"flex",gap:8,alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:465:      <input type={type} step={step} value={value}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:466:        onChange={e=>onChange(type==="number"?parseFloat(e.target.value)||0:e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:467:        onFocus={()=>setF(true)} onBlur={()=>setF(false)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:468:        style={{flex:1,background:C.bg,border:`1px solid ${f?C.accent:C.border}`,borderRadius:6,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:469:          color:C.text,padding:"6px 10px",fontSize:13,outline:"none",fontFamily:mono,transition:"border-color .2s"}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:551:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:552:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:553:function StationSel({sel,onSel}){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:554:  const[open,setOpen]=useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:555:  const e=ESTACIONES_EPM[sel];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:556:  const pdfN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="PDF").length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:557:  const refN=Object.values(ESTACIONES_EPM).filter(s=>s.fuente==="REF").length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:558:  return(<div style={{position:"relative",zIndex:300}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:559:    <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:9,background:C.card,border:`1px solid ${open?C.accent:C.border}`,borderRadius:10,padding:"6px 12px",cursor:"pointer",color:C.text,fontFamily:sans,fontSize:12,transition:"all .2s",minWidth:240}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:560:      <div style={{width:7,height:7,borderRadius:"50%",background:e.fuente==="PDF"?C.accent2:C.gold,flexShrink:0}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:561:      <div style={{flex:1,textAlign:"left"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:562:        <div style={{fontSize:11,fontWeight:700}}>{sel}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1109:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1110:// ───────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1111:// Subcomponente: Card "Condición de Humedad (AMC) y Urbanización"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1112:// (versión con hooks por named import: useState/useEffect/useCallback)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1113:// ───────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1114:function AMCPanel({ params, setParams }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1115:  // Normalizaciones (evitan NaN/undefined)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1116:  const amcSel = params?.amcActual ?? "II";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1117:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:    ? params.porcentajeImpermeable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    : 60; // ← unifica default con ModHidrogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1120:  const cnBase = Number.isFinite(params?.cnBase)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1122:    : (Number.isFinite(params?.CN) ? params.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1123:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1124:  // Estado local para el slider (evita flood al arrastrar)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1125:  const [pctLive, setPctLive] = useState(pctImp);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1126:  useEffect(() => { setPctLive(pctImp); }, [pctImp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1127:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1128:  // Commit del % Impermeable (al soltar / perder foco)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1129:  const commitPct = useCallback((v) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1130:    setParams(prev => ({ ...prev, porcentajeImpermeable: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1131:    if (import.meta.env.DEV) console.log("[AMC]", "%Impermeable ->", v);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1132:  }, [setParams]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1133:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1421:// MÓDULO HIETOGRAMAS — Distribución temporal + Curvas Huff
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1422:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1423:function ModHietogramas({ est, name, params, setParams }) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1424:  const [Tr, setTr] = useState(25);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1425:  const [durH, setDurH] = useState(3);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1426:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1427:  // Sync dtMin when params.dt changes externally (ej: carga de datos)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1428:  useEffect(() => { if (params.dt && +params.dt !== dtMin) setDtMin(+params.dt); }, [params.dt]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1429:  const [guardarAMCenPanel, setGuardarAMCenPanel] = useState(false);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1430:  const [distType, setDistType] = useState("EPM_Q1");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1431:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1432:  // Hietograma activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1433:  const hiet = useMemo(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1434:    () => calcHietograma(est, Tr, durH, dtMin, distType),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1435:    [est, Tr, durH, dtMin, distType]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1436:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1437:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1438:  // Hietogramas comparativos de todas las distribuciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1461:  }, [tcList]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1462:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1463:  // Override opcional (para análisis)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1464:  const [usarOverrideTc, setUsarOverrideTc] = useState(false);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1465:  const [Tc_override_min, setTcOverride]   = useState(Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1466:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1467:  // Tc efectivo que entra a Q(t)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1468:  const tc_min = usarOverrideTc
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1469:  ? Tc_override_min 
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1470:  : +(params?.tcMedMin ?? Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1471:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1472:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1473:  // ✅ QA hidrológico (solo observación, no modifica nada)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1501:  const pctImperv_panel = Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1502:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1503:  // Override SCS‑CN (para análisis)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1504:  const [overrideSCS, setOverrideSCS] = useState(false);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1505:  const [CN_ovr, setCN_ovr]          = useState(CN_panel);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1506:  const [AMC_ovr, setAMC_ovr]        = useState(AMC_panel);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1507:  const [pctImp_ovr, setPctImp_ovr]  = useState(pctImperv_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1508:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1509:  // Valores efectivos (panel u override)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1510:  const CN        = overrideSCS ? CN_ovr     : CN_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1511:  const AMC       = overrideSCS ? AMC_ovr    : AMC_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1512:  const pctImperv = overrideSCS ? pctImp_ovr : pctImperv_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1513:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1514:  // Chequeos amables de rango (usa '-' ASCII para evitar tofu en monospace)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1515:  const scsAviso = [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1518:  if (!["I", "II", "III"].includes(AMC)) scsAviso.push("AMC debe ser I/II/III");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1519:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1520:  // AMC automático (SIATA) — opcional
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1521:  const [usarAMCauto, setUsarAMCauto] = useState(false);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1522:  const [hs_demo, setHsDemo]          = useState(0.38); // 0–1; aquí demo. Luego lo tomas de SIATA.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1523:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1524:  const amcAuto = useMemo(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1525:    () => (usarAMCauto ? derivarAMCDesdeSIATA(hs_demo) : null),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1526:    [usarAMCauto, hs_demo]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1527:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1528:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1529:  // AMC efectivo: si AMC auto está activo y no hay override SCS, usamos el derivado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1530:  const AMC_eff = (usarAMCauto && !overrideSCS && amcAuto?.amcActual) ? amcAuto.amcActual : AMC;
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1912:  const [Tr, setTr]       = useState(25);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1913:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1914:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1915:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1916:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1917:  // ── CN efectivo (CNact) con default coherente a la UI (60 % imperv.)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1918:  const CNact = useMemo(() => calcCNdinamico({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1919:    amcActual: params.amcActual ?? "II",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1920:    porcentajeImpermeable: params.porcentajeImpermeable ?? 60,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1921:    cnBase: Number.isFinite(params.cnBase) ? params.cnBase : (params.CN ?? 75),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1938:  }, [params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1939:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1940:  // ── Parámetros HU
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1941:  const [tcSrc, setTcSrc] = useState(0);       // índice del Tc activo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1942:  const [kR, setKR]       = useState(1.2);     // Clark
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1943:  const [Ct, setCt]       = useState(2.0);     // Snyder
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1944:  const [Cp, setCp]       = useState(0.62);    // Snyder
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1945:  const [CpSCSMod, setCpSCSMod] = useState(2.08); // SCS Mod
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1946:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1947:  // ── Tc, unidades y pendiente
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1948:  const tcList = useMemo(() => calcTc(params).filter(r => isFinite(r.h) && r.h > 0), [params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1949:  const tc_h   = tcList[tcSrc]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1950:  const tc_min = tc_h * 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1951:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1952:  const area_mi2 = params.area * 0.386102;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1953:  const L_mi     = params.longitud_cauce * 0.621371;
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:      resultados: hidrogramasQ5Exportables
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2201:  const amcWarning = params?.amcActual === "III";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2450:// MÓDULO SAR — GT-AS-004 §3 Almacenamiento y Regulación (COMPLETO)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2451:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2452:function ModSAR({params,est,name}){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2453:  const [Tr,setTr]=useState(25);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2454:  const [durH,setDurH]=useState(3);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2455:  const [dtMin,setDtMin]=useState(()=>+params.dt||5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2456:  useEffect(()=>{ if(params.dt&&+params.dt!==dtMin) setDtMin(+params.dt); },[params.dt]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2457:  const [siPct,setSiPct]=useState(80);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2458:  const [catSAR,setCatSAR]=useState("Intermedios");
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2882:// MÓDULO INFLUENCIA — Ponderación multicriterio + Escenarios
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2883:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2884:function ModInfluencia({params}){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2885:  const[method,setMethod]=useState("compuesto");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2886:  const[potIDW,setPotIDW]=useState(2);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2887:  const[selIdx,setSelIdx]=useState(0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2888:  const[excl,setExcl]=useState(new Set());
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2889:  const[Tr,setTr]=useState(25);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2890:  const[dMin,setDMin]=useState(30);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2891:  const[showLabels,setShowLabels]=useState(true);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2892:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2893:  // Punto de salida → fuente única de verdad para selección de estaciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2894:  const cLat=+params.lat_salida||6.185;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2895:  const cLon=+params.lon_salida||-75.660;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2896:  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2897:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2898:  const activos=useMemo(()=>ESTACIONES_SIATA.filter((_,i)=>!excl.has(i)),[excl]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2899:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3125:// MÓDULO SIATA — Integración + Series + Catálogo + Arquitectura
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3126:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3127:function ModSIATA({params}){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3128:  const[selStn,setSelStn]=useState(0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3129:  const[subTab,setSubTab]=useState("series");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3130:  const[apiStatus,setApiStatus]=useState("idle");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3131:  const[filterVar,setFilterVar]=useState("Todas");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3132:  const[simDatos]=useState(()=>ESTACIONES_SIATA.map((_,i)=>generarSerieSIATA(42+i*7)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3133:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3134:  const e=ESTACIONES_SIATA[selStn];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3135:  const serie=simDatos[selStn];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3136:  const acumTotal=serie[serie.length-1]?.acum||0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3137:  const maxLluvia=Math.max(...serie.map(r=>r.lluvia));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3138:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3139:  // Punto de salida → fuente única de verdad
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3140:  const cLat=+params.lat_salida||6.185, cLon=+params.lon_salida||-75.660;
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3512:  const [stn, setStn] = useState("SAN CRISTOBAL");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3513:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3514:  const [trStateGlobal, setTrStateGlobal] = useState(getTrState());
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3515:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3516:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3517:    const cancelarSuscripcionTr = subscribeTr(setTrStateGlobal);
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3530:  const metodosTcRacional = calcTc(params).filter((r) => Number.isFinite(r?.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3549:          Number(params.CN)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3550:        )
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3551:      : [];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3552:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    fuente: "motor HidroFlow",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:    estacion_idf: stn,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    periodos_retorno: TR_LIST,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      uso: "contraste global independiente de caudal pico",
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3625:    estadoTcActual?.Tc_final !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3626:    estadoTcActual?.Tc_final !== undefined &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3759:          setParams={setParams}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3760:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3761:      )}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3762:      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={name} onContextoComparador={onContextoComparador} />}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3763:      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn} onContextoComparador={onContextoComparador}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3764:      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3765:      {tab === "Influencia" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3766:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3767:           padding: 20,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3768:           color: "#9fffe8",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3769:           fontFamily: "monospace"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3770:        }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3771:           Módulo de influencia IDF en desarrollo.


## 4. Props recibidas por IndiceHidrologico

1: import React, { useState, useEffect } from "react";
2: import { getTcState, subscribeTc } from "../agents/tcAgent";
3: import { getTrState, setTrState, subscribeTr } from "../agents/trAgent";
4: 
5: export default function IndiceHidrologico({
6:   goToTab: goToTabProp,
7:   contexto,
8:   tabActiva: tabActivaProp = "params",
9:   tab = "params",
10:   setTab,
11:   setTabActiva,
12:   cambiarTab,
13:   navegarA,
14: }) {
15:   // --- Estado reactivo del Agente Tc ---
16:   const [tcState, setTcStateLocal] = useState(getTcState());
17: 
18:   useEffect(() => {
19:     const unsubscribe = subscribeTc(setTcStateLocal);
20:     return () => unsubscribe();
21:   }, []);
22: 
23:   const valoresTcAgente = Object.values(tcState?.metodosTc || {})
24:   .map((valor) => Number(valor))
25:   .filter((valor) => Number.isFinite(valor) && valor > 0);
26: 
27: const rangoTcAgente =
28:   valoresTcAgente.length > 0
29:     ? {
30:         min: Math.min(...valoresTcAgente),
31:         max: Math.max(...valoresTcAgente),
32:       }
33:     : null;
34: 
35:   // -------------------------------------
36:   const {
37:     tabActiva = "params",
38:     area_km2 = null,
39:     estacionesAdoptadas = [],
40:     metodoIDF = "—",
41:     distribucionTemporal = "—",
42: 
43:     // SCS-CN / motor
44:     CN = null,
45:     CN_base = null,
46:     CN_efectivo = null,
47:     AMC = "II",
48:     S_mm = null,
49:     Ia_mm = null,
50:     porcentaje_impermeable = null,
51: 
52:     // Racional
53:     C = null,
54:     racional = null,
55: 
56:     // Cuenca
57:     cuencaNombre = "Cuenca activa",
58:     puntoControl = "PC",
59:     pendiente_media_pct = null,
60:     estadoTecnico = "En validación",
61: 
62:     // IDF futura
63:     referenciaIDFPendiente = [],
64:     ponderacionIDFPendiente = false,
65: 
66:     // Tc
67:     tc = null,
68:     tc_sugerido_min = null,
69:     tc_metodos = [],
70:     tc_resumen = null,
71: 
72:     // Periodos de retorno
73:     periodos_retorno = [],
74: 
75:     // Resumen completo futuro
76:     resumenMotor = null,
77:   } = contexto || {};
78: 
79:   const tabActual = tabActivaProp || tabActiva || tab || "params";
80: 
81:   const normalizarTab = (valor) => {
82:     if (!valor) return "";
83: 
84:     const texto = String(valor).trim().toLowerCase();
85: 
86:     const alias = {
87:       params: "params",
88:       parametros: "params",
89:       parámetros: "params",
90:       parametro: "params",

## 5. Uso visual de área y pendiente en IndiceHidrologico

500:         <p style={estilos.texto}>
501:           <strong>{cuencaNombre}</strong>
502:         </p>
503: 
504:         <div style={estilos.dato}>
505:           <span style={estilos.label}>Punto de control</span>
506:           <span style={estilos.value}>{puntoControl}</span>
507:         </div>
508: 
509:         <div style={estilos.dato}>
510:           <span style={estilos.label}>Área</span>
511:           <span style={estilos.value}>
512:             {formatNumero(area_km2, 4)} km²
513:           </span>
514:         </div>
515: 
516:         <div style={estilos.dato}>
517:           <span style={estilos.label}>Pendiente media</span>
518:           <span style={estilos.value}>
519:             {formatNumero(pendiente_media_pct, 2)} %
520:           </span>
521:         </div>
522: 
523:         <div style={estilos.chipRow}>
524:           <span style={{ ...estilos.chip, ...estilos.chipOk }}>
525:             Geometría validada

## 6. Uso visual de racional en IndiceHidrologico

900:         <div style={estilos.dato}>
901:           <span style={estilos.label}>Competencia</span>
902:           <span
903:             style={{
904:               ...estilos.value,
905:               color:
906:                 racional?.competencia === "alta" ? "#9fffe8" : "#ffd166",
907:             }}
908:           >
909:             {racional?.competencia === "alta"
910:               ? "Alta"
911:               : "Baja / no principal"}
912:           </span>
913:         </div>
914: 
915:         <div style={estilos.dato}>
916:           <span style={estilos.label}>Coeficiente C</span>
917:           <span style={estilos.value}>
918:             {coeficienteRacionalTrIndice !== null ? formatNumero(coeficienteRacionalTrIndice, 4) : "Pendiente"}
919:           </span>
920:         </div>
921: 
922:         <div style={estilos.dato}>
923:           <span style={estilos.label}>Tr global activo</span>
924:           <span style={estilos.value}>
925:             {trActivoIndice} años
926:           </span>
927:         </div>
928: 
929:         <div style={estilos.dato}>
930:           <span style={estilos.label}>Q racional Tr activo</span>
931:           <span style={estilos.value}>
932:             {qRacionalTrIndice !== null ? `${formatNumero(qRacionalTrIndice, 2)} m³/s` : "Pendiente"}
933:           </span>
934:         </div>
935: 
936:         <p style={estilos.muted}>
937:           Para La Iguaná PC_80, el Método Racional se conserva como contraste
938:           referencial. El cálculo de C en función del CN queda en radar para el
939:           motor hidrológico.
940:         </p>
941: 
942:         <div style={estilos.chipRow}>
943:           <span style={{ ...estilos.chip, ...estilos.chipWarn }}>
944:             {coeficienteRacionalTrIndice !== null ? `C Tr ${trActivoIndice}a = ${formatNumero(coeficienteRacionalTrIndice, 4)}` : "C = f(CN) · pendiente"}
945:           </span>

## 7. Diff actual pendiente

diff --git a/01_APP/HIDROFLOW/src/HidroFlow.jsx b/01_APP/HIDROFLOW/src/HidroFlow.jsx
index 62a1f5a..8586c97 100644
--- a/01_APP/HIDROFLOW/src/HidroFlow.jsx
+++ b/01_APP/HIDROFLOW/src/HidroFlow.jsx
@@ -3760,7 +3760,7 @@ useEffect(() => {
         />
       )}
       {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={name} onContextoComparador={onContextoComparador} />}
-      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn}/>}
+      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn} onContextoComparador={onContextoComparador}/>}
       {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
       {tab === "Influencia" && (
         <div style={{

## 8. Estado Git final

 M 01_APP/HIDROFLOW/src/HidroFlow.jsx
?? 00_ADMIN/bitacora/OT-0051/
