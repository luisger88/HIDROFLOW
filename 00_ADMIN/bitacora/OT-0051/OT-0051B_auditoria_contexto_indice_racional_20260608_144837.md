# OT-0051B — Auditoría quirúrgica contexto Índice/Racional

Fecha: 06/08/2026 14:48:37
Rama: ot-0051-alineacion-runtime-verdad-geomorfologica-motor

## 1. Hallazgo visual

El módulo Racional central muestra C y Q por Tr, pero el Índice lateral mantiene C y Q racional como Pendiente. La vista central de Parámetros muestra área y pendiente, pero el lateral Cuenca Activa muestra área y pendiente vacías.

## 2. Estado Git inicial

?? 00_ADMIN/bitacora/OT-0051/

## 3. HidroFlow.jsx — publicación de contexto/racional


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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:41:// Motor: Clark IUH · W&H · Snyder · SCS Mod. · Huff · Convolución completa
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:337:  });
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:      resultados: hidrogramasQ5Exportables
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2188:    },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2189:    lluvia_efectiva_total_mm: lluviaEfectivaTotalMm,
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2700:          <Legend wrapperStyle={{fontSize:10}}/>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2713:// APP PRINCIPAL
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3504:// Si viene del layout, usar ese.
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3581:    pendiente_media_pct:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3582:  params?.pendiente_media_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3583:  params?.pendienteMediaPct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3584:  params?.pendiente_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3585:  params?.S_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3586:  params?.pendiente_media ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3587:  params?.pendienteMedia ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3588:  params?.pendiente ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3589:  params?.slope_pct ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3610:    lluvia_efectiva_total_mm: previo?.lluvia_efectiva_total_mm ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3611:    hidrogramas: previo?.hidrogramas ?? {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3612:      fuente: "pendiente",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3613:      resultados: []
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3614:    },
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3648:  const tcMedianaBase =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3660:    metodosTc: metodosTcBase,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3661:    contextoTc: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3662:      pendiente:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3663:        params?.pendiente_media_pct ??
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3677:    }
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3770:        }}>


## 4. IndiceHidrologico.jsx — consumo lateral de área, pendiente y racional


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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:35:  // -------------------------------------
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:36:  const {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:37:    tabActiva = "params",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:38:    area_km2 = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:39:    estacionesAdoptadas = [],
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:40:    metodoIDF = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:41:    distribucionTemporal = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:42:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:43:    // SCS-CN / motor
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:44:    CN = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:45:    CN_base = null,
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:175:    goToTab(destino);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:176:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:177:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:178:  const formatNumero = (valor, decimales = 2) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:179:    if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:180:    const n = Number(valor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:181:    if (!Number.isFinite(n)) return String(valor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:182:    return n.toLocaleString("es-CO", {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:183:      minimumFractionDigits: decimales,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:184:      maximumFractionDigits: decimales,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:185:    });
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:421:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:422:  const periodosTrIndice = periodos.length > 0 ? periodos : [2.33, 5, 10, 25, 50, 100];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:423:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:424:  const trActivoIndice = Number(
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:425:    trStateIndice?.Tr_activo ??
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:426:      contexto?.tr_diseno_activo ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:427:      25
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:428:  );
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:429:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:430:  const seleccionarTrIndice = (trValor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:431:    const trNumerico = Number(trValor);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:432:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:433:    if (!Number.isFinite(trNumerico)) {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:435:    }
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:436:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:437:    setTrState({
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:438:      Tr_activo: trNumerico,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:439:      fuente: "IndiceHidrologico"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:440:    });
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:441:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:442:  const numeroIndiceSeguro = (valor) => {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:443:    if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:444:      return null;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:445:    }
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
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:469:  const trActivoNormalizadoIndice = numeroIndiceSeguro(trActivoIndice) ?? 25;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:470:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:471:  const resultadoRacionalTrIndice = resultadosRacionalIndice.find((fila) =>
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
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:482:  const coeficienteRacionalTrIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:483:    numeroIndicePositivo(resultadoRacionalTrIndice?.C) ??
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:484:    numeroIndicePositivo(C);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:485:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:486:  const qRacionalTrIndice =
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:487:    numeroIndicePositivo(resultadoRacionalTrIndice?.Q);
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:488:  return (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:489:    <aside style={estilos.panel}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:490:      <h2 style={estilos.titulo}>Índice Hidrológico de la Cuenca</h2>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:491:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:492:      <p style={estilos.subtitulo}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:493:        Panel lector · La Iguaná PC_80 · Motor HidroFlow
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:494:      </p>
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:526:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:621:          <span style={estilos.label}>CN base</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:622:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:623:            {CN_base !== null && CN_base !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:624:              ? formatNumero(CN_base, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:625:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:626:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:627:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:628:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:629:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:630:          <span style={estilos.label}>CN efectivo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:631:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:632:            {CN_efectivo !== null && CN_efectivo !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:633:              ? formatNumero(CN_efectivo, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:634:              : CN !== null && CN !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:635:              ? formatNumero(CN, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:636:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:637:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:638:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:639:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:640:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:641:          <span style={estilos.label}>AMC</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:642:          <span style={estilos.value}>{AMC || "II"}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:646:          <span style={estilos.label}>S</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:647:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:648:            {S_mm !== null && S_mm !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:649:              ? `${formatNumero(S_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:650:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:651:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:652:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:653:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:654:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:655:          <span style={estilos.label}>Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:656:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:657:            {Ia_mm !== null && Ia_mm !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:658:              ? `${formatNumero(Ia_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:659:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:660:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:661:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:662:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:663:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:664:          <span style={estilos.label}>Impermeabilidad</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:665:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:666:            {porcentaje_impermeable !== null &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:667:            porcentaje_impermeable !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:668:              ? `${formatNumero(porcentaje_impermeable, 1)} %`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:669:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:670:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:671:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:672:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:673:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:674:          Parámetros leídos desde el resumen oficial del motor SCS-CN.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:675:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:693:    <span style={estilos.label}>Tc sugerido</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:694:    <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:695:      {tcState?.Tc_final !== null && tcState?.Tc_final !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:696:        ? `${formatNumero(tcState.Tc_final, 1)} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:697:        : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:698:    </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:699:  </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:700:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:701:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:702:          <span style={estilos.label}>Métodos válidos</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:703:<span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:711:  <span style={estilos.label}>Rango bruto Tc</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:712:  <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:713:    {rangoTcAgente
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:714:      ? `${formatNumero(rangoTcAgente.min, 1)}–${formatNumero(
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:715:          rangoTcAgente.max,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:716:          1
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:717:        )} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:718:      : resumenTc?.min_min !== null &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:719:        resumenTc?.min_min !== undefined &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:720:        resumenTc?.max_min !== null &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:721:        resumenTc?.max_min !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:722:      ? `${formatNumero(resumenTc.min_min, 1)}–${formatNumero(
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:723:          resumenTc.max_min,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:724:          1
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:725:        )} min`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:726:      : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:727:  </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:728:</div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:729:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:731:          <span style={estilos.label}>Rango competente Tc</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:732:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:733:            {tcState?.rangoCompetenteTc
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:734:              ? formatNumero(tcState.rangoCompetenteTc.min, 1) + "–" +
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:735:                formatNumero(tcState.rangoCompetenteTc.max, 1) + " min"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:736:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:737:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:738:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:739:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:740:        {tcState?.Tc_final !== null &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:741:          tcState?.Tc_final !== undefined &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:742:          tcState?.rangoCompetenteTc?.min !== undefined &&
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:785:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:786:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:787:          {periodosTrIndice.map((trValor) => {
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:788:            const activoTr = Number(trValor) === trActivoIndice;
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:789:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:790:            return (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:791:              <button
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:792:                key={`tr-global-${trValor}`}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:793:                type="button"
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:794:                onClick={() => seleccionarTrIndice(trValor)}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:795:                title={`Activar Tr ${trValor} años`}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:818:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:819:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:820:        <p style={{ ...estilos.muted, marginTop: 8 }}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:821:          Tr global activo: <strong style={{ color: "#67e8f9" }}>{trActivoIndice} años</strong>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:822:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:823:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:824:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:825:          Escenarios activos para cálculo hidrológico.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:826:        </p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:827:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:828:        <div style={estilos.chipRow}>
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:903:            style={{
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:913:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:914:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:915:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:916:          <span style={estilos.label}>Coeficiente C</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:917:          <span style={estilos.value}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:918:            {coeficienteRacionalTrIndice !== null ? formatNumero(coeficienteRacionalTrIndice, 4) : "Pendiente"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:919:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:920:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:921:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:922:        <div style={estilos.dato}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:923:          <span style={estilos.label}>Tr global activo</span>
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:937:          Para La Iguaná PC_80, el Método Racional se conserva como contraste
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:938:          referencial. El cálculo de C en función del CN queda en radar para el
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:939:          motor hidrológico.
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:951:        </button>


## 5. ComparadorMultiMetodo.jsx — contexto correcto ya recibido


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:3:import { setTcState } from "../agents/tcAgent";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:4:import { calcTc, mapTcResultados } from "../services/hidroEngine";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:5:import { seleccionarTc } from "../services/tcSelector";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:6:import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:  resumenComparadorCatalogo,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:27:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:28:  // ✅ CONTEXTO BASE
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:29:const contextoBase = contexto || {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:30:  cuencaNombre: "Quebrada La Iguaná - PC_80",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:31:  area_km2: 46.8516,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:32:  pendiente_media_pct: 8.43,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:33:  CN: 88,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:34:  lluvia_efectiva: true
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:35:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:36:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:37:const fuenteContexto = contexto ? "motor HidroFlow" : "contexto base";
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:54:// ✅ MAPEAR RESULTADOS
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:55:const metodosTc = mapTcResultados(tcArray);
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:501:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:502:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:503:  const bruto = contextoBase?.tc_metodos;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:504:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:505:  if (!bruto) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:506:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:507:  let candidatos = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:508:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:511:  } else if (Array.isArray(bruto?.metodos)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:512:    candidatos = bruto.metodos;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:513:  } else if (Array.isArray(bruto?.resultados)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:514:    candidatos = bruto.resultados;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:515:  } else if (Array.isArray(bruto?.items)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:516:    candidatos = bruto.items;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:517:  } else if (typeof bruto === "object") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:518:    candidatos = Object.entries(bruto).map(([clave, valor]) => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:519:      clave,
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:581:    : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:582:    ? bruto.metodos
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:583:    : Array.isArray(bruto?.resultados)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:584:    ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:585:    : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:586:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:587:  const nombreCatalogo = normalizarTexto(metodo.nombre);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:588:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:589:  const match = candidatos.find((h) => {
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:833:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:834:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:835:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:836:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:837:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:838:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:839:    const areaKm2 = Number(contextoBase?.area_km2);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:840:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1122:            Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1123:            tiempos de respuesta, caudales pico e hidrogramas. Este módulo no
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1124:            adopta automáticamente resultados; organiza sensibilidad, competencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1125:            y trazabilidad para soporte de expediente técnico.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1126:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1127:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1128:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1129:        <div style={estilos.version}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1236:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1237:      <div style={estilos.nota}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1238:  <strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1239:  HidroFlow a partir de los hidrogramas calculados. El comparador no recalcula
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1240:  hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1241:  automáticamente ningún método. La adopción final requiere criterio técnico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1242:  competencia hidrológica y trazabilidad explícita.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1243:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1255:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1256:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1257:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1258:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1259:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1260:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1261:  internos de cada hidrograma unitario. Los resultados se muestran como
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1290:            "- No se recalculan hidrogramas.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1291:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1292:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1293:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1294:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1295:            "Tipo de salida: Expediente hidrológico mínimo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1296:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1297:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1298:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1299:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1300:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1301:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1336:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1337:        onClick={() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1338:          const areaKm2 = Number(contextoBase?.area_km2);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1339:          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1340:          const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1341:            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1342:              ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1343:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1344:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1345:          const formatearNumeroExpediente = (valor, decimales = 2) => {
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1404:              : Array.isArray(bruto?.resultados)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1405:              ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1406:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1407:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1408:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1409:          const construirFilaQ5Expediente = (nombreMetodo, resultadoQ, dictamenMetodo = null) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1410:            const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413:              obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1414:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1416:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1417:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1419:            .map((metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1420:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1428:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1429:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1430:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1431:            .map((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1432:              const nombreMetodo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1433:                h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1434:                h?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1435:                h?.label ??
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:          const tablaQ5Markdown = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1514:            !Array.isArray(contextoBase?.metodo_racional?.resultados) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1515:            contextoBase.metodo_racional.resultados.length === 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1516:          ) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517:            faltantesExpediente.push("Tabla Método Racional");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1518:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1519:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1520:          if (faltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1521:            window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1522:              [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1532:            return;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1533:          }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1534:          const trDisenoActivoExpediente = Number.isFinite(Number(contextoBase?.tr_diseno_activo))
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1535:            ? Number(contextoBase.tr_diseno_activo)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1536:            : 25;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1537:          const textoExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1538:            "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1539:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1540:            "## 1. Identificación",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1541:            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1542:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1555:            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:                    `| ${r.Tr} | ${formatearNumeroExpediente(r.I)} mm/h | ${formatearNumeroExpediente(r.P)} mm | ${formatearNumeroExpediente(r.C, 4)} | ${formatearNumeroExpediente(r.Q)} m³/s |`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:                  )
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:                ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:              : [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:                  "Disponibilidad: resultados no disponibles en el contexto exportable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:                  "Estado: sección informativa; consultar módulo Método Racional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:                ]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:            "## 7. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1611:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1661:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1662:      {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663:        const areaKm2 = Number(contextoBase?.area_km2);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1664:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
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


## 6. Valores esperados desde runtime visual

```text
area_km2 esperado: 46.8516
pendiente_media_pct esperada: 8.43
Tr activo esperado: 25
C racional Tr 25 esperado: 0.5716
Q racional Tr 25 esperado: 262.76 m3/s
```

## 7. Decisión pendiente

Si la auditoría confirma que HidroFlow.jsx calcula el racional pero no lo publica en contexto consumible por IndiceHidrologico.jsx, se aplicará un cambio mínimo de publicación de contexto, sin tocar fórmulas.

## 8. Estado Git final

?? 00_ADMIN/bitacora/OT-0051/
