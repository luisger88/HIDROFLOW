# OT-0055B — Diagnóstico quirúrgico contexto IDF/SCS-CN/Distribución

Fecha: 06/08/2026 17:01:46
Rama: ot-0055-publicacion-runtime-idf-scs-cn-distribucion-indice

## 1. Propósito

Localizar el bloque exacto de publicación de contextoComparador en HidroFlow.jsx y los campos exactos que consume IndiceHidrologico.jsx para aplicar una corrección mínima en OT-0055B.

## 2. Bloque publicación contexto base en HidroFlow.jsx

3520: 
3521: useEffect(() => {
3522:   if (typeof onContextoComparador !== "function") return;
3523: 
3524:   const cnBase = Number.isFinite(params?.cnBase)
3525:     ? params.cnBase
3526:     : Number.isFinite(params?.CN)
3527:     ? params.CN
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

## 3. Bloque publicación desde ModHidrogramas en HidroFlow.jsx

2168:       : sumaLluviaEfectivaMm || null;
2169:   const hidrogramasQ5Exportables = (hidros || []).map((h) => ({
2170:     metodo: h?.metodo ?? "Método Q-5",
2171:     Qpico: h?.Qpico,
2172:     tPico: h?.tPico,
2173:     volTotal: h?.volTotal,
2174:     Qp: h?.Qpico,
2175:     Tp: h?.tPico,
2176:     volumen: h?.volTotal
2177:   }));
2178: 
2179:   onContextoComparador((previo) => ({
2180:     ...(previo ?? {}),
2181:     fuente: "motor HidroFlow",
2182:     area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
2183:     estacion_idf: name ?? null,
2184:     lluvia_efectiva: Boolean(lluvEfect),
2185:     hidrogramas: {
2186:       fuente: "ModHidrogramas",
2187:       resultados: hidrogramasQ5Exportables
2188:     },
2189:     lluvia_efectiva_total_mm: lluviaEfectivaTotalMm,
2190:     hidrogramas_resumen: hidrogramasResumen,
2191:     hidrograma_principal: h0 ?? null,
2192:   }));
2193: }, [onContextoComparador, hidros, h0, lluvEfect, dtMin]);
2194:   
2195:   

## 4. Props esperadas por IndiceHidrologico.jsx

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

## 5. Visualización IDF/SCS-CN/Distribución en Índice


  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:37:    tabActiva = "params",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:38:    area_km2 = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:39:    estacionesAdoptadas = [],
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:40:    metodoIDF = "—",
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:41:    distribucionTemporal = "—",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:42:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:43:    // SCS-CN / motor
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:44:    CN = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:45:    CN_base = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:46:    CN_efectivo = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:47:    AMC = "II",
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:48:    S_mm = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:49:    Ia_mm = null,
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:50:    porcentaje_impermeable = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:51:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:52:    // Racional
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:53:    C = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:54:    racional = null,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:55:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:202:  };
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:203:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:204:  const estaciones = Array.isArray(estacionesAdoptadas)
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:205:    ? estacionesAdoptadas
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:206:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:207:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:208:  const referenciasPendientes = Array.isArray(referenciaIDFPendiente)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:209:    ? referenciaIDFPendiente
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:210:    : [];
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:525:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:526:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:527:          <span style={estilos.label}>Pendiente media</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:528:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:529:            {formatNumero(pendienteIndice, 2)} %
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:530:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:531:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:532:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:544:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:545:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:546:          <span style={estilos.label}>Método adoptado</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:547:          <span style={estilos.value}>{metodoIDF}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:548:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:549:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:550:        <p style={estilos.muted}>Estaciones con influencia operativa:</p>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:551:
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:552:        {estaciones.length > 0 ? (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:553:          <div style={estilos.chipRow}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:554:            {estaciones.map((e, i) => (
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:555:              <span
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:556:                key={`${e.nombre || "estacion"}-${i}`}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:557:                style={{ ...estilos.chip, ...estilos.chipOk }}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:558:              >
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:559:                {e.nombre || "Estación"} · {formatPeso(e.peso)}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:610:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:611:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:612:          <span style={estilos.label}>Curva adoptada</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:613:          <span style={estilos.value}>{distribucionTemporal}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:614:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:615:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:616:        <p style={estilos.muted}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:617:          Define la concentración temporal de la lluvia y controla el pico de
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:618:          caudal.
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:629:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:630:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:631:          <span style={estilos.label}>CN base</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:632:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:633:            {CN_base !== null && CN_base !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:634:              ? formatNumero(CN_base, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:635:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:636:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:638:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:639:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:640:          <span style={estilos.label}>CN efectivo</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:641:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:642:            {CN_efectivo !== null && CN_efectivo !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:643:              ? formatNumero(CN_efectivo, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:644:              : CN !== null && CN !== undefined
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:645:              ? formatNumero(CN, 1)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:649:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:650:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:651:          <span style={estilos.label}>AMC</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:652:          <span style={estilos.value}>{AMC || "II"}</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:653:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:654:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:655:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:656:          <span style={estilos.label}>S</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:657:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:658:            {S_mm !== null && S_mm !== undefined
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:659:              ? `${formatNumero(S_mm, 2)} mm`
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:660:              : "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:661:          </span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:662:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:663:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:664:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:665:          <span style={estilos.label}>Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:666:          <span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:667:            {Ia_mm !== null && Ia_mm !== undefined
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
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:687:        <div style={estilos.chipRow}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:688:          <span style={estilos.chip}>SCS-CN</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:689:          <span style={estilos.chip}>AMC/SIATA</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:690:          <span style={estilos.chip}>S · Ia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:691:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:692:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:693:        <button style={estiloBoton("hidrogramas")} onClick={() => goToTab("hidro")}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:694:          Ver lluvia efectiva Pe(t)
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:695:        </button>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:710:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:711:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:712:          <span style={estilos.label}>Métodos válidos</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:713:<span style={estilos.value}>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:714:  {valoresTcAgente.length > 0
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:715:    ? valoresTcAgente.length
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:716:    : resumenTc?.n ?? metodosTc?.length ?? "—"}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:717:</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:776:              <span style={estilos.chip}>Témez</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:777:              <span style={estilos.chip}>Kirpich</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:778:              <span style={estilos.chip}>California</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:779:              <span style={estilos.chip}>Giandotti</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:780:              <span style={estilos.chip}>SCS-Ranser</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:781:              <span style={estilos.chip}>Pérez-Montg.</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:782:            </>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:783:          )}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:859:                Tr 2.33 años
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:860:              </span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:861:              <span style={estilos.chip}>Tr 5 años</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:862:              <span style={estilos.chip}>Tr 10 años</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:863:              <span style={estilos.chip}>Tr 25 años</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:864:              <span style={estilos.chip}>Tr 50 años</span>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:865:              <span style={estilos.chip}>Tr 100 años</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:866:            </>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:867:          )}
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:868:        </div>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:869:      </section>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:870:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:909:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:910:        <div style={estilos.dato}>
> 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:911:          <span style={estilos.label}>Competencia</span>
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:912:          <span
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:913:            style={{
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:914:              ...estilos.value,
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:915:              color:
  01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:916:                racional?.competencia === "alta" ? "#9fffe8" : "#ffd166",


## 6. Estado Git final

?? 00_ADMIN/bitacora/OT-0055/
