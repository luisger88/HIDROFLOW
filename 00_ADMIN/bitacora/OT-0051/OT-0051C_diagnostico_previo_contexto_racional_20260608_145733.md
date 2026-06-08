# OT-0051C — Diagnóstico quirúrgico previo contexto racional

Fecha: 06/08/2026 14:57:33
Rama: ot-0051-alineacion-runtime-verdad-geomorfologica-motor

## 1. Propósito

Confirmar si la brecha del Índice lateral se debe a dependencia incompleta del useEffect, forma de resultados racionales o ausencia de contexto actualizado.

## 2. Bloque resultadosRacionalExportable en HidroFlow.jsx

3528:     : 75;
3529: 
3530:   const metodosTcRacional = calcTc(params).filter((r) => Number.isFinite(r?.h) && r.h > 0);
3531:   const tcRacionalMin =
3532:     metodosTcRacional.length > 0
3533:       ? metodosTcRacional.reduce((suma, metodo) => suma + Number(metodo.min || 0), 0) /
3534:         metodosTcRacional.length
3535:       : null;
3536: 
3537:   const estacionRacional = ESTACIONES_EPM[stn];
3538: 
3539:   const resultadosRacionalExportable =
3540:     estacionRacional &&
3541:     Number.isFinite(Number(params?.area)) &&
3542:     Number.isFinite(Number(params?.CN)) &&
3543:     Number.isFinite(Number(tcRacionalMin)) &&
3544:     Number(tcRacionalMin) > 0
3545:       ? calcRacional(
3546:           estacionRacional,
3547:           Number(params.area),
3548:           Number(tcRacionalMin),
3549:           Number(params.CN)
3550:         )
3551:       : [];
3552:   onContextoComparador((previo) => ({
3553:     ...(previo ?? {}),
3554:     fuente: "motor HidroFlow",
3555:     estacion_idf: stn,
3556:     tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
3557:     periodos_retorno: TR_LIST,
3558:     metodo_racional: {
3559:       fuente: "calcRacional",
3560:       uso: "contraste global independiente de caudal pico",
3561:       estado: "informativo_no_adoptivo",
3562:       tc_min: Number.isFinite(Number(tcRacionalMin))
3563:         ? Number(Number(tcRacionalMin).toFixed(2))
3564:         : null,
3565:       resultados: resultadosRacionalExportable
3566:     },
3567: 
3568:     cuencaNombre:
3569:       params?.nombreCuenca ??
3570:       params?.cuencaNombre ??
3571:       params?.nombre ??
3572:       "Quebrada La Iguaná - PC_80",
3573: 
3574:     area_km2:
3575:       params?.area_km2 ??
3576:       params?.areaKm2 ??
3577:       params?.area ??
3578:       params?.A ??
3579:       null,
3580: 
3581:     pendiente_media_pct:
3582:   params?.pendiente_media_pct ??
3583:   params?.pendienteMediaPct ??
3584:   params?.pendiente_pct ??
3585:   params?.S_pct ??
3586:   params?.pendiente_media ??
3587:   params?.pendienteMedia ??
3588:   params?.pendiente ??
3589:   params?.slope_pct ??
3590:   params?.slopePct ??
3591:   8.43,
3592: 
3593:     longitud_cauce_km:
3594:   params?.longitud_cauce_km ??
3595:   params?.longitudCauceKm ??
3596:   params?.longitud_km ??
3597:   params?.L ??
3598:   params?.longitudCauce ??
3599:   params?.longitud_cauce ??
3600:   15.524,
3601: 
3602:     CN: cnBase,
3603:     CN_base: params?.cnBase ?? params?.CN ?? cnBase,
3604:     CN_efectivo: params?.CN_efectivo ?? params?.cnEfectivo ?? cnBase,
3605:     AMC: params?.AMC ?? params?.amcActual ?? params?.amc ?? "II",
3606: 
3607:     tc_metodos: calcTc(params),
3608:     
3609:     lluvia_efectiva: previo?.lluvia_efectiva ?? false,
3610:     lluvia_efectiva_total_mm: previo?.lluvia_efectiva_total_mm ?? null,
3611:     hidrogramas: previo?.hidrogramas ?? {
3612:       fuente: "pendiente",
3613:       resultados: []
3614:     },
3615:     hidrogramas_resumen: previo?.hidrogramas_resumen ?? null,
3616:     hidrograma_principal: previo?.hidrograma_principal ?? null,
3617:   }));
3618: }, [onContextoComparador, params, stn, trStateGlobal?.Tr_activo]);
3619: // Publicación base Tc para despertar el Índice Hidrológico global.
3620: // No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
3621: useEffect(() => {
3622:   const estadoTcActual = getTcState();

## 3. Instancias de IndiceHidrologico en HidroFlow.jsx


  01_APP\HIDROFLOW\src\HidroFlow.jsx:1901:
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1913:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1974:  // Hidrograma activo (SCS por defecto)
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2175:    Tp: h?.tPico,
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2201:  const amcWarning = params?.amcActual === "III";
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3505:// Si no, usar estado interno.
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3548:          Number(tcRacionalMin),
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3626:    estadoTcActual?.Tc_final !== undefined &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3758:          params={params}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3759:          setParams={setParams}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3760:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3761:      )}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3762:      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={name} onContextoComparador={onContextoComparador} />}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3763:      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3764:      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3765:      {tab === "Influencia" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3766:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3767:           padding: 20,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3768:           color: "#9fffe8",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3769:           fontFamily: "monospace"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3770:        }}>


## 4. Forma esperada por IndiceHidrologico

450: 
451:   const numeroIndicePositivo = (valor) => {
452:     const numero = numeroIndiceSeguro(valor);
453:     return numero !== null && numero > 0 ? numero : null;
454:   };
455: 
456:   const racionalContextoIndice =
457:     contexto?.metodo_racional ??
458:     contexto?.racional ??
459:     contexto?.racional_exportable ??
460:     racional ??
461:     null;
462: 
463:   const resultadosRacionalIndice = Array.isArray(racionalContextoIndice?.resultados)
464:     ? racionalContextoIndice.resultados
465:     : Array.isArray(racionalContextoIndice?.tabla)
466:     ? racionalContextoIndice.tabla
467:     : [];
468: 
469:   const trActivoNormalizadoIndice = numeroIndiceSeguro(trActivoIndice) ?? 25;
470: 
471:   const resultadoRacionalTrIndice = resultadosRacionalIndice.find((fila) =>
472:     Math.abs(Number(fila?.Tr) - trActivoNormalizadoIndice) < 0.001
473:   );
474: 
475:   const areaRacionalIndice =
476:     numeroIndicePositivo(racionalContextoIndice?.area_km2) ??
477:     numeroIndicePositivo(contexto?.area_km2) ??
478:     numeroIndicePositivo(contexto?.area) ??
479:     numeroIndicePositivo(contexto?.cuenca?.area_km2) ??
480:     numeroIndicePositivo(area_km2);
481: 
482:   const coeficienteRacionalTrIndice =
483:     numeroIndicePositivo(resultadoRacionalTrIndice?.C) ??
484:     numeroIndicePositivo(C);
485: 
486:   const qRacionalTrIndice =
487:     numeroIndicePositivo(resultadoRacionalTrIndice?.Q);
488:   return (
489:     <aside style={estilos.panel}>
490:       <h2 style={estilos.titulo}>Índice Hidrológico de la Cuenca</h2>

## 5. Estado Git final

?? 00_ADMIN/bitacora/OT-0051/
