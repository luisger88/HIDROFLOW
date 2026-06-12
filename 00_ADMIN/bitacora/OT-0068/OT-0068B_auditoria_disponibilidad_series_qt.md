# OT-0068B — Auditoría de disponibilidad real de series Q(t)

Fecha: 2026-06-12 18:02:44

## Estado base

- Rama: ot-0068-coherencia-fisica-forma-qt.
- OT-0068A cerrada en commit 71dbbdb.
- Alcance: auditoría documental/código, sin cambios funcionales.

## Objetivo

Identificar la disponibilidad real de series Q(t), campos de hidrograma y estructura temporal requerida para calcular métricas de forma como De, W50, W25, Tp/Tc, asimetría y pendientes relativas.

## Archivos auditados

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx
- 01_APP\HIDROFLOW\src\HidroFlow.jsx

## Patrones auditados en ComparadorMultiMetodo.jsx


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:10:  resumenComparadorCatalogo,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:11:} from "../data/metodosComparadorCatalogo";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:12:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:13:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:14:  evaluarCompetenciaComparador,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:15:} from "../data/matrizCompetenciaComparador";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:58:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:59:// ✅ MAPEAR RESULTADOS
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:60:const metodosTc = mapTcResultados(tcArray);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:61:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:62:// ✅ CONTEXTO HIDROLÓGICO
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:63:const contextoTc = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:64:  pendiente: contextoBase.pendiente_media_pct,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:78:// ✅ Tc FINAL
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:79:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:80:const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:81:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:82:const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83:  metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:84:  evaluacionCompetencia?.tc
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:85:);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:86:// ✅ Publicar Tc en el agente DESPUÉS del render
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:87:useEffect(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:89:    setTcState({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:90:      Tc_final,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:91:      metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:92:      contextoTc,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:93:      metodosTcCompetentes,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:94:      rangoCompetenteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:95:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:96:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:97:}, [Tc_final]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:102: // ✅ BLOQUE CONSISTENTE DE MÉTODOS
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:103:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:104:const metodos = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:105:  if (!evaluacionCompetencia) return [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:106:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:107:  const base = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:108:    ...evaluacionCompetencia.tc.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:132:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:133:const conteo = useMemo(() => ({
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:134:  total: metodos.length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:135:  tc: metodos.filter(m => m.tipo === "tc").length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:136:  q: metodos.filter(m => m.tipo === "q").length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:137:  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:138:  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:139:}), [metodos]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:140:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:141:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:142:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:143:  const estilos = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:506:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:507:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:508:  const bruto = contextoBase?.tc_metodos;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:509:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:510:  if (!bruto) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:511:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:512:  let candidatos = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:514:  if (Array.isArray(bruto)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:515:    candidatos = bruto;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:516:  } else if (Array.isArray(bruto?.metodos)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:517:    candidatos = bruto.metodos;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:518:  } else if (Array.isArray(bruto?.resultados)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:519:    candidatos = bruto.resultados;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:520:  } else if (Array.isArray(bruto?.items)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:521:    candidatos = bruto.items;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:571:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:572:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:573:  const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:574:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:575:  if (!bruto) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:576:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:577:      Qp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:584:  const candidatos = Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:585:    ? bruto
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:586:    : Array.isArray(bruto?.metodos)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:587:    ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:588:    : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:589:    ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:590:    : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:591:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:617:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:618:  return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:619:    Qp: extraerNumero(match, ["Qp", "qp", "Qpico", "qPico", "q_pico", "caudalPico", "caudal_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:620:    Tp: extraerNumero(match, ["Tp", "tp", "tPico", "TPico", "t_pico", "tiempoPico", "tiempo_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:621:    volumen: extraerNumero(match, ["volumen", "V", "vol", "volume", "volTotal", "vol_total", "volumenTotal"]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:622:    disponible: true,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:623:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:624:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:625:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:642:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:643:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:644:  const renderTabla = (titulo, tipo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:645:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:646:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:647:  // OT-0067 — Adaptador de coherencia hidrológica (encapsulado)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:648:const clasificarCoherencia = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:649:  // OT-0067 — Adaptador de coherencia hidrológica
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:650:  const tpRaw = metodo?.tPico ?? metodo?.tp ?? metodo?.Tp;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:651:  const tp = Number(String(tpRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:652:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:653:  const tcRaw = contextoBase?.tc_global ?? contextoBase?.tc ?? contextoBase?.tcMin ?? 0;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:654:  const tc = Number(String(tcRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:662:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:663:  // Regla explícita de seguridad por método crítico identificado en OT-0067
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:664:  if (nombre.includes("williams") || nombre.includes("hann")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:665:    return { etiqueta: "No coherente", color: "#dc2626" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:666:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:667:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:668:  if (!Number.isFinite(tp) || !Number.isFinite(tc) || tc === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:676:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:677:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:678:  if (nombre.includes("scs")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:679:    return { etiqueta: "Principal", color: "#16a34a" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:680:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:681:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:682:  if (nombre.includes("snyder")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:683:    return { etiqueta: "Coherente", color: "#22c55e" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:684:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:685:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:686:  if (nombre.includes("clark")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:687:    return { etiqueta: "Referencial", color: "#f59e0b" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:688:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:689:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:690:  return { etiqueta: "Evaluar", color: "#64748b" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:691:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:692:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:693:const datos = metodos.filter((metodo) => metodo.tipo === tipo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:694:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:695:// OT-0067C — Evaluación global de coherencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:696:const resumenCoherencia = metodos.map((m) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:697:  const r = clasificarCoherencia(m);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:698:  return r?.etiqueta ?? "No evaluado";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:699:});
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:700:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:929:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:930:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:931:          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:932:            ? `candidato principal; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:933:            : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:934:            ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:935:            : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:936:            ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:937:            : metodo.nombre?.includes("Williams")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:938:            ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:939:            : metodo.nombre?.includes("Clark")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:940:            ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:941:            : `método comparativo; ${estadoTemporal}.`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:942:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:943:        {alertaTcTp ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1246:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1247:          <p style={estilos.subtitulo}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1248:            Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1249:            tiempos de respuesta, caudales pico e hidrogramas. Este módulo no
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1250:            adopta automáticamente resultados; organiza sensibilidad, competencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1251:            y trazabilidad para soporte de expediente técnico.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1252:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1253:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413:      <div style={estilos.nota}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1414:  <strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415:  HidroFlow a partir de los hidrogramas calculados. El comparador no recalcula
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1416:  hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1417:  automáticamente ningún método. La adopción final requiere criterio técnico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418:  competencia hidrológica y trazabilidad explícita.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1419:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1420:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1434:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1435:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1436:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1437:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1438:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1439:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1440:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1441:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1442:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1443:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1444:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como 
comparativos/referenciales. La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1445:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1446:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1447:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1448:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1453:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1454:            "Síntesis:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1455:            "- SCS Unit Hydrograph: candidato principal de referencia.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1456:            "- SCS Mod.: variante ajustable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1457:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1458:            "- Masa y volumen: controlados frente a la referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1459:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:            "Restricciones:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:            "- No se usaron caudales externos como fundamento.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:            "- No se modifica el motor hidrológico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:            "- No se recalculan hidrogramas.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1553:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1554:          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1555:            metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:              : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1558:              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1559:              : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1560:              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1561:              : metodo.nombre?.includes("Williams")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1562:              ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1563:              : metodo.nombre?.includes("Clark")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1564:              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1565:              : `método comparativo; ${estadoTemporal}.`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1566:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1567:          const metodosQ5Expediente = metodos.filter(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1568:            (metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1569:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1570:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1571:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1572:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1573:          const obtenerCandidatosQ5Contexto = () => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1574:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1577:              ? bruto
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1578:              : Array.isArray(bruto?.metodos)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:              ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:              : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:              ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:            .map((metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:                  h?.Qp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1619:                  h?.qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1620:                  h?.Qpico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:                  h?.qPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:                  h?.q_pico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:                  h?.caudalPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:                  h?.caudal_pico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:                Tp:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:                  h?.Tp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:                  h?.tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:                  h?.tPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:                  h?.TPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:                  h?.t_pico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:                  h?.tiempoPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:                  h?.tiempo_pico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:                volumen:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1634:                  h?.volumen ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1635:                  h?.V ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1636:                  h?.vol ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1637:                  h?.volume ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1638:                  h?.volTotal ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1639:                  h?.vol_total ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1640:                  h?.volumenTotal
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1641:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1642:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1699:                "Expediente hidrológico mínimo incompleto.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1700:                "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1701:                "Antes de copiar el expediente firmado, publique el contexto hidrológico completo desde Hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1702:                "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1703:                "Faltan:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1704:                ...faltantesExpediente.map((item) => `- ${item}`)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1705:              ].join("\n")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1711:            ? Number(contextoBase.tr_diseno_activo)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1712:            : 25;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1713:              const estadoQTrActivoExpediente = contextoBase?.q_tr_activo_estado ?? null;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1714:              const qTrActivoExpediente = estadoQTrActivoExpediente?.q_tr_activo ?? {};
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1715:              const faltantesQTrActivoExpediente = Array.isArray(estadoQTrActivoExpediente?.campos_faltantes)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1716:                ? estadoQTrActivoExpediente.campos_faltantes
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1717:                : [];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1718:              const formatearValorQTrExpediente = (valor, sufijo = "", decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1719:                if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1720:                const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1721:                if (Number.isFinite(numero) && String(valor).trim() !== "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1722:                  return numero.toLocaleString("es-CO", { maximumFractionDigits: decimales }) + sufijo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1725:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1726:              const metodoQ5PrincipalConsistencia =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1727:                metodosQ5Expediente.find((metodo) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1728:                  String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1729:                ) ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1730:                metodosQ5Expediente[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1731:                null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1732:              const resultadoQ5PrincipalConsistencia = metodoQ5PrincipalConsistencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1733:                ? obtenerResultadoQMetodo(metodoQ5PrincipalConsistencia)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1734:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1769:            `AMC: ${contextoBase?.AMC ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1770:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1771:            "## 3. Tiempo de concentración y roles Tc",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1772:            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1773:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1774:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1775:            "Roles Tc:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1776:            "- Tc global Índice: referencia hidrológica general.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1777:            "- Tc operativo Q(t): ruta interna del hidrograma.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1778:            "- Duración evento: 3 h para almacenamiento/regulación.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1779:            "- Lag / forma SCS: parámetro derivado para forma temporal.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1780:            "- Tc comparador: referencia especializada para coherencia Q-5.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1781:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1782:            "## 4. Volumen de referencia",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1783:            `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1786:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1787:                "## 5. Escenario Q-Tr activo — control de trazabilidad",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1788:                `Estado: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1789:                `Tr activo: ${formatearValorQTrExpediente(qTrActivoExpediente.tr_activo, " años", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1790:                `Estación IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.estacion_idf)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1791:                `Método IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.metodo_idf)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1792:                `Distribución temporal: ${formatearValorQTrExpediente(qTrActivoExpediente.distribucion_temporal)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1793:                `Área: ${formatearValorQTrExpediente(qTrActivoExpediente.area_km2, " km²", 4)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1794:                `CN efectivo: ${formatearValorQTrExpediente(qTrActivoExpediente.cn_efectivo, "", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1795:                `S: ${formatearValorQTrExpediente(qTrActivoExpediente.s_mm, " mm", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1796:                `Ia: ${formatearValorQTrExpediente(qTrActivoExpediente.ia_mm, " mm", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1797:                `Impermeabilidad: ${formatearValorQTrExpediente(qTrActivoExpediente.porcentaje_impermeable, " %", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1798:                `Tc: ${formatearValorQTrExpediente(qTrActivoExpediente.tc_min, " min", 4)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1799:                `Pe total: ${formatearValorQTrExpediente(qTrActivoExpediente.lluvia_efectiva_total_mm, " mm", 4)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1800:                `Campos mínimos: ${faltantesQTrActivoExpediente.length > 0 ? "faltantes — " + faltantesQTrActivoExpediente.join(", ") : "completos"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1801:                `Fuente: ${estadoQTrActivoExpediente?.fuente ?? "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1802:                "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1803:                "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1804:            "## 6. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1805:            "Estado general: diagnóstico no adoptivo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1806:            "SCS Unit Hydrograph: candidato principal de referencia.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1807:            "SCS Mod.: variante ajustable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1808:            "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1809:            "Masa y volumen: controlados frente a referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1810:            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1811:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1812:            "Tabla Q-5 auditada:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1815:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1816:            "## 7. Método Racional — contraste global independiente",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1817:            "Uso: contraste global independiente de caudal pico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1818:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1819:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1820:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1821:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1822:              ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1841:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1842:            "## 8. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1843:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1844:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1845:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1846:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1847:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1848:            "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1854:            `Relación volumen Q-5 / volumen esperado: ${relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1855:            `Resultado de consistencia volumétrica: ${estadoConsistenciaVolumen}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1856:            `Q-Tr activo: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1857:            "Q-5 auditado: presente como bloque no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1858:            "Método Racional: presente como contraste global independiente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1859:            "Lectura técnica: control interno preliminar; no reemplaza revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1860:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1864:            "Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, restricciones y sello técnico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1865:            "Q-Tr activo: trazado desde q_tr_activo_estado y verificado como sección exportable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1866:            "Q-5 auditado: presente como bloque de hidrogramas no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1867:            "Método Racional: presente como contraste global independiente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1868:            "Alcance: validación estructural/exportable; no reemplaza revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1869:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1870:            "## 11. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1880:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1881:            "## 12. Restricciones y advertencias técnicas",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1882:            "- No se usaron caudales externos como fundamento.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1883:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1884:            "- No se modifica el motor hidrológico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1885:            "- No se recalculan hidrogramas en este expediente.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1886:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1887:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1888:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1889:          try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1890:            const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2043:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2044:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2045:            const metodosQ5Panel = metodos.filter((metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2046:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2047:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2048:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2049:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2050:            const metodoQ5PrincipalPanel =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2051:              metodosQ5Panel.find((metodo) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2052:                String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2053:              ) ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2054:              metodosQ5Panel[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2055:              null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2056:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2057:            const resultadoQ5PrincipalPanel = metodoQ5PrincipalPanel
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2058:              ? obtenerResultadoQMetodo(metodoQ5PrincipalPanel)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2076:                : "requiere revisión técnica";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2077:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2078:            const estadoQTrActivo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2079:              contextoBase?.q_tr_activo_estado?.estado ?? "no_publicado";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2080:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2081:            const colorBorde =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2082:              estadoConsistenciaVolumen === "superada"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2108:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2109:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2110:                  Control Pe–Área–Volumen/Q-5 visible antes de copiar el expediente. No recalcula hidrogramas, no modifica Q-5 y no adopta resultados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2111:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2112:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2113:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2114:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2125:                  <div><strong>Relación Q-5/esperado:</strong> {relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2126:                  <div><strong>Resultado:</strong> {estadoConsistenciaVolumen}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2127:                  <div><strong>Q-Tr activo:</strong> {estadoQTrActivo}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2128:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2129:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2130:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2131:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2132:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2133:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark 
IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2134:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2135:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2136:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2137:        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción 
técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2143:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2144:          {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2145:            const estadoQTrActivo = contextoBase?.q_tr_activo_estado ?? null;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2146:            const qTrActivo = estadoQTrActivo?.q_tr_activo ?? {};
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2147:            const faltantesQTrActivo = Array.isArray(estadoQTrActivo?.campos_faltantes)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2148:              ? estadoQTrActivo.campos_faltantes
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2149:              : [];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2150:            const disponibleQTrActivo = estadoQTrActivo?.disponible === true;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2151:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2152:            const formatearValorQTr = (valor, sufijo = "") => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2153:              if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2154:              const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2155:              if (Number.isFinite(numero) && String(valor).trim() !== "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2156:                return numero.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + sufijo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2162:              <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2163:                style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2164:                  border: disponibleQTrActivo ? "1px solid #16a34a" : "1px solid #a16207",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2165:                  borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2166:                  padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2167:                  margin: "12px 0",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2168:                  background: disponibleQTrActivo ? "rgba(22, 163, 74, 0.10)" : "rgba(161, 98, 7, 0.10)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2169:                }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2170:              >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2171:                <h3 style={{ margin: "0 0 8px 0" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2172:                  Bloque Q-Tr activo · Escenario de diseño controlado
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2174:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2175:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2176:                  Escenario activo de periodo de retorno publicado desde el contexto hidrológico. Este bloque no recalcula caudales, no modifica Q-5 y funciona como control visual del Tr activo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2177:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2178:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2179:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2180:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2185:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2186:                >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2187:                  <div><strong>Estado:</strong> {estadoQTrActivo?.estado ?? "no_publicado"}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2188:                  <div><strong>Tr activo:</strong> {formatearValorQTr(qTrActivo.tr_activo, " años")}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2189:                  <div><strong>Estación IDF:</strong> {formatearValorQTr(qTrActivo.estacion_idf)}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2190:                  <div><strong>Método IDF:</strong> {formatearValorQTr(qTrActivo.metodo_idf)}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2191:                  <div><strong>Distribución:</strong> {formatearValorQTr(qTrActivo.distribucion_temporal)}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2192:                  <div><strong>Área:</strong> {formatearValorQTr(qTrActivo.area_km2, " km²")}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2193:                  <div><strong>CN efectivo:</strong> {formatearValorQTr(qTrActivo.cn_efectivo)}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2194:                  <div><strong>S:</strong> {formatearValorQTr(qTrActivo.s_mm, " mm")}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2195:                  <div><strong>Ia:</strong> {formatearValorQTr(qTrActivo.ia_mm, " mm")}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2196:                  <div><strong>Impermeabilidad:</strong> {formatearValorQTr(qTrActivo.porcentaje_impermeable, " %")}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2197:                  <div><strong>Tc:</strong> {formatearValorQTr(qTrActivo.tc_min, " min")}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2198:                  <div><strong>Pe total:</strong> {formatearValorQTr(qTrActivo.lluvia_efectiva_total_mm, " mm")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2199:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2200:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2201:                {faltantesQTrActivo.length > 0 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2202:                  <div style={{ ...estilos.muted }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2203:                    Campos mínimos faltantes: {faltantesQTrActivo.join(", ")}.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2204:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2205:                ) : (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2206:                  <div style={{ ...estilos.muted }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2207:                    Campos mínimos completos para trazabilidad visual del Q-Tr activo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2210:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2211:                <div style={{ ...estilos.muted, marginTop: 8 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2212:                  Fuente: {estadoQTrActivo?.fuente ?? "—"}. Estado no adoptivo: la adopción técnica permanece subordinada a la validación hidrológica del expediente.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2213:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2214:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2215:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2216:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2217:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2218:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2219:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2220:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2221:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2222:



## Patrones auditados en HidroFlow.jsx


  01_APP\HIDROFLOW\src\HidroFlow.jsx:40:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:41:// HIDROFLOW v3.1 — Arquitectura Senior · GT-AS-004 · EPM 2025 · SIATA
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:42:// Motor: Clark IUH · W&H · Snyder · SCS Mod. · Huff · Convolución completa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:43:// Módulos: Ponderación estaciones (IDW/Thiessen/Altitudinal/Compuesto) + SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:44:// Exportación: PDF (html2canvas+jsPDF) · Excel (SheetJS)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:45:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:46:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:113:// ─── CURVAS HUFF (Quartiles I-IV) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:114:// Curvas Huff estándar (Illinois, USA) adaptadas — probabilidad 50%
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:115:// Q1: lluvia concentrada en primer 25% del tiempo (convectiva)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:116:// Q2: lluvia concentrada 25-50% del tiempo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:117:// Q3: lluvia concentrada 50-75% del tiempo  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:118:// Q4: lluvia distribuida en último 25% del tiempo (frontal)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:119:const HUFF_DATA = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:120:  Q1: [{T:0,P:0},{T:5,P:16.0},{T:10,P:33.0},{T:15,P:43.0},{T:20,P:52.0},{T:25,P:60.0},{T:30,P:66.0},{T:35,P:71.0},{T:40,P:75.5},{T:45,P:79.5},{T:50,P:83.0},{T:55,P:86.0},{T:60,P:88.5},{T:65,P:90.5},{T:70,P:92.5},{T:75,P
:94.0},{T:80,P:95.5},{T:85,P:96.8},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:121:  Q2: [{T:0,P:0},{T:5,P:5.0},{T:10,P:10.0},{T:15,P:15.5},{T:20,P:21.5},{T:25,P:28.0},{T:30,P:38.0},{T:35,P:48.0},{T:40,P:57.0},{T:45,P:65.0},{T:50,P:72.0},{T:55,P:78.0},{T:60,P:83.0},{T:65,P:87.0},{T:70,P:90.5},{T:75,P:
93.0},{T:80,P:95.0},{T:85,P:96.7},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:122:  Q3: [{T:0,P:0},{T:5,P:4.0},{T:10,P:7.5},{T:15,P:11.5},{T:20,P:15.5},{T:25,P:19.5},{T:30,P:24.5},{T:35,P:30.0},{T:40,P:37.0},{T:45,P:46.0},{T:50,P:56.0},{T:55,P:64.0},{T:60,P:71.0},{T:65,P:77.5},{T:70,P:83.0},{T:75,P:8
7.0},{T:80,P:91.0},{T:85,P:93.5},{T:90,P:95.5},{T:95,P:97.5},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:164:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:165:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:166:// ─── CN & PÉRDIDAS SCS ────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:167:// ── CN dinámico real (castellano) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:168:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:169:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:170:// ─── CONVOLUCIÓN NUMÉRICA COMPLETA ───────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:171:// Convolución discreta: Q(t) = Σ Pe(j)·UH(t-j)  ← núcleo del motor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:172:function convolucion(uh_ord, pe_list, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:173:  const nOut=pe_list.length+uh_ord.length+4;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:174:  const Q=new Array(nOut).fill(0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:175:  pe_list.forEach((pe,j)=>uh_ord.forEach((u,k)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:180:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:181:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// HIDROGRAMAS UNITARIOS SINTÉTICOS — 4 MÉTODOS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:184:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:185:function normalizarHUaMm(uh, areaKm2, dt_min) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:186:  const volumenObjetivo = areaKm2 * 1000;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:212:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:213:}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:214:// ① HU SCS (Chow et al., 1994 — GT-AS-004 §3.5)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:215:function calcHUSCS(area, tc_h, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:216:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h, qp=2.08*area/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:217:  const n=Math.ceil(2.67*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:218:  const uh=Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:219:    const t=i*dh, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:221:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:222:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:223:  return{tp,qp:normalizado.qp,Tc:tc_h*60,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"SCS",color:C.accent2}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:224:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:225:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:226:// ② HU SCS MODIFICADO — SCS con coeficiente de pico Cp variable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:227:// Cp estándar=2.08; Cp modificado=(0.2083·A)/tp ajustado por morfología
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:228:function calcHUSCS_Mod(area, tc_h, dt_min, Cp=2.08){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:229:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:230:  const qp=Cp*area/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:231:  const n=Math.ceil(3.0*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:232:  const uh=Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:235:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:236:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:237:  return{tp,qp:normalizado.qp,Tc:tc_h*60,uh:normalizado.uh,Cp,factorNormalizacion:normalizado.factor,metadata:{nombre:"SCS Mod.",color:C.teal}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:238:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:239:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:240:// ③ HU SNYDER (Chow et al. 1994 — versión Ct/Cp configurable)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:241:function calcHUSnyder(area_mi2, L_mi, Lca_mi, dt_min, Ct=2.0, Cp=0.62){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:242:  const tlag=Ct*Math.pow(L_mi*Lca_mi,0.3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:243:  const tp=tlag+dt_min/60/2;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:244:  const qp=(640*Cp*area_mi2)/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:245:  const W50=770/Math.pow(qp/area_mi2,1.08);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:252:  const areaKm2 = area_mi2 / 0.386102;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:253:  const normalizado = normalizarHUaMm(uh, areaKm2, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:254:  return{tp,qp:normalizado.qp,tlag,W50,W75,Ct,Cp,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Snyder",color:C.accent3}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:255:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:256:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:257:// ④ HU WILLIAMS & HANN (Williams & Hann, 1973)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:258:// Basado en: qp = 2.54·A^0.9·(S/1000)^0.5·CN^3/(Ia·A)  → simplificado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:259:// Fórmula geomorfológica: qp=(A^m1·S^m2·CN^m3)·K_WH
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:260:function calcHUWilliamsHann(area, L_km, S_m_km, CN, dt_min){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:261:  // Williams & Hann (1973): Tc = 0.1838·L^0.8·(S+1)^0.7 / (CN^0.35·S^0.5)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:262:  const Ss = 25400/CN - 254;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:263:  const tc_h = (0.1838*Math.pow(L_km,0.8)*Math.pow(Ss+1,0.7)) / (Math.pow(CN,0.35)*Math.pow(Math.max(S_m_km,0.01),0.5)) / 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:264:  const tp = 0.5*(dt_min/60) + 0.6*tc_h;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:265:  // Caudal pico Williams & Hann: qp = 2.083·A/tp · κ donde κ = 1.12 (calibración W&H)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:266:  const kWH = 1.12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:267:  const qp  = kWH * 2.083 * area / tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:268:  const n   = Math.ceil(2.8*tp/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:269:  const uh  = Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:272:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:273:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:274:  return{tp,qp:normalizado.qp,tc_h,Tc:tc_h*60,Ss,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Williams & Hann",color:C.gold}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:275:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:276:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:277:// ④b CLARK IUH (Clark, 1945) — Hidrograma Unitario Instantáneo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:278:// IUH de Clark: u(t) = qp·exp(-t/R) para t>tp, crecida lineal hasta tp
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:279:// Parámetros: tc (tiempo concentración), R (coef. almacenamiento cuenca)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:280:// R = k_R * tc  (típico k_R = 0.5–2.0, default 1.2)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:281:function calcClarkIUH(area, tc_h, dt_min, kR=1.2){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:282:  const dh   = dt_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:283:  const R    = kR * tc_h;  // coeficiente almacenamiento
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:284:  const qp   = 2.08*area/tc_h;  // caudal pico IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:285:  const n    = Math.ceil((tc_h + 6*R)/dh) + 12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:286:  const uh   = Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:287:    const t = i*dh;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:288:    // Antes de tc: crecida lineal; después: recesión exponencial
  01_APP\HIDROFLOW\src\HidroFlow.jsx:290:    return +Math.max(u,0).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:291:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:292:  const tp   = tc_h;  // tiempo al pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:293:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:294:  return{tp,qp:normalizado.qp,tc_h,R,kR,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Clark IUH",color:C.accent4}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:295:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:296:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:297:// ─── HIDROGRAMA COMPLETO (hietograma → convolución → Q(t)) ───────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:298:function calcHidroCompleto(lluvRows, uh_struct, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:299:  const peList=lluvRows.slice(1).map(r=>r.PeIncrem).filter((v,i,a)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:300:    // Incluir todos los incrementos positivos y su contexto
  01_APP\HIDROFLOW\src\HidroFlow.jsx:301:    return v>0 || (a[i-1]>0||a[i+1]>0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:302:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:303:  const peAll = lluvRows.slice(1).map(r=>Math.max(r.PeIncrem||0,0));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:304:  const qSeries = convolucion(uh_struct.uh, peAll, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:305:  const Qpico = Math.max(...qSeries.map(r=>r.Q));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:306:  const tPico = qSeries.find(r=>r.Q>=Qpico*0.9999)?.t || 0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:307:  const volTotal = qSeries.reduce((s,r)=>s+r.Q*(dt_min*60),0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:308:  return{qSeries, Qpico:+Qpico.toFixed(6), tPico:+tPico.toFixed(2),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:309:    volTotal:+volTotal.toFixed(1), metodo:uh_struct.metadata.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:310:    color:uh_struct.metadata.color};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:311:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:312:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:313:// ─── FUNCIONES AUXILIARES ────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:325:      exceso:+Math.max(diff,0).toFixed(5), volAcum:+volAcum.toFixed(1)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:326:  }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:327:  return{excesos:exc, volTotal:+volAcum.toFixed(1)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:328:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:329:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:330:// Resumen racional
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:function calcRacional(est,area,tc_min,CN){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:343:  const tc_h = tcList[0]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:344:  const metodos = [
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:345:    { nombre: 'SCS',     make: () => calcHUSCS(params.area, tc_h, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:346:    { nombre: 'SCS Mod', make: () => calcHUSCS_Mod(params.area, tc_h, dtMin, 2.08) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:347:    { nombre: 'Snyder',  make: () => calcHUSnyder(params.area*0.386102, params.longitud_cauce*0.621371, params.longitud_cauce*0.621371*0.35, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:348:    { nombre: 'W&H',     make: () => calcHUWilliamsHann(params.area, params.longitud_cauce, (params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce, CNact, dtMin) },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:349:    { nombre: 'Clark',   make: () => calcClarkIUH(params.area, tc_h, dtMin, 1.2) },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:350:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:351:  return metodos.map(m => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:352:    const row = { metodo: m.nombre };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:353:    TR_LIST.forEach(Tr => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:356:      const HU   = m.make();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:357:      const H    = calcHidroCompleto(Pe, HU, dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:358:      row[Tr]    = +H.Qpico.toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:359:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:360:    return row;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:361:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:362:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:401:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:402:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:403:  // Hoja 3: Hidrogramas comparativos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:404:  if(datos.hidros){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:405:    const header=["t (min)",...datos.hidros.map(h=>h.metodo+" Q(m³/s)")];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:406:    const len=Math.max(...datos.hidros.map(h=>h.qSeries.length));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:407:    const rows=[header];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:408:    for(let i=0;i<len;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:409:      const row=[+(i*datos.dt_min).toFixed(2),...datos.hidros.map(h=>h.qSeries[i]?.Q||0)];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:410:      rows.push(row);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:411:    }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:412:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hidrogramas");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:413:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:414:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:415:  // Hoja 4: Volumen SAR
  01_APP\HIDROFLOW\src\HidroFlow.jsx:416:  if(datos.volSAR){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:421:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:422:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:423:  // Hoja 5: Resumen caudales
  01_APP\HIDROFLOW\src\HidroFlow.jsx:424:  if(datos.resumenQ){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:425:    const rows=[["Método","Tr=2.33a","Tr=5a","Tr=10a","Tr=25a","Tr=50a","Tr=100a"]];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:426:    datos.resumenQ.forEach(r=>rows.push([r.metodo,...TR_LIST.map(t=>r[t]||0)]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:427:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Resumen_Q");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    ? params.porcentajeImpermeable
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1120:    : 60; // ← unifica default con ModHidrogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1121:  const cnBase = Number.isFinite(params?.cnBase)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1122:    ? params.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1123:    : (Number.isFinite(params?.CN) ? params.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1124:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1228:  const tcMed   = tcStats.length ? tcStats.reduce((s, r) => s + r.h, 0) / tcStats.length : 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1229:  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1230:  // Persistir Tc medio (min) en params para otros módulos (Hietogramas, Hidrogramas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1231:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1232:    if (!isFinite(tcMed) || tcMed <= 0) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1233:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1234:    const tcMedMin = tcMed * 60; // horas → minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1249:        icon="⬡"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1250:        title="Morfometría de Cuenca"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1251:        sub="Parámetros geomorfológicos · Índices · Tiempos de concentración"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1252:        accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1253:      />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1254:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1255:      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, alignItems: "start" }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1324:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1325:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1326:      {/* ── Tabla de Tiempos de Concentración (6 métodos) ─────────────────────── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1327:      <Card title="Tiempos de Concentración — 6 Métodos" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1328:        <Tbl
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1329:          headers={["Método", "Tc (h)", "Tc (min)", "Δ vs. media (%)"]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1330:          rows={tc.filter(r => isFinite(r.h) && r.h > 0).map(r => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1331:            M: r.m,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1443:  }, [est, Tr, durH, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1444:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1445:  // === Día 3 (MVP) — Orquestación P → Pn → UH → Q(t) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1446:  // Vector de incrementos (mm por bloque) y Δt
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1447:  const P_mm  = hiet.data.map((r, i, a) => (i === 0 ? 0 : +(r.pAcum - a[i - 1].pAcum).toFixed(5)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1448:  const dt_min = dtMin;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1449:  const A_km2  = Number.isFinite(params?.area) ? params.area : 36.58;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1466:  const [Tc_override_min, setTcOverride]   = useState(Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1467:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1468:  // Tc efectivo que entra a Q(t)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1469:  const tc_min = usarOverrideTc
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1470:  ? Tc_override_min 
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1471:  : +(params?.tcMedMin ?? Tc_sugerido_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1472:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1497:  }, [tcList, Tc_sugerido_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1498:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1499:  // === SCS‑CN desde Preliminares + override + AMC auto (SIATA) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1500:  const CN_panel        = Number.isFinite(params?.cnBase) ? params.cnBase : (params.CN ?? 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1501:  const AMC_panel       = params?.amcActual ?? "II"; // "I" | "II" | "III"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1502:  const pctImperv_panel = Number.isFinite(params?.porcentajeImpermeable) ? params.porcentajeImpermeable : 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1503:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1504:  // Override SCS‑CN (para análisis)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1505:  const [overrideSCS, setOverrideSCS] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1506:  const [CN_ovr, setCN_ovr]          = useState(CN_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1507:  const [AMC_ovr, setAMC_ovr]        = useState(AMC_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1508:  const [pctImp_ovr, setPctImp_ovr]  = useState(pctImperv_panel);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1509:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1510:  // Valores efectivos (panel u override)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1511:  const CN        = overrideSCS ? CN_ovr     : CN_panel;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1512:  const AMC       = overrideSCS ? AMC_ovr    : AMC_panel;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1513:  const pctImperv = overrideSCS ? pctImp_ovr : pctImperv_panel;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1514:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1515:  // Chequeos amables de rango (usa '-' ASCII para evitar tofu en monospace)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1516:  const scsAviso = [];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1517:  if (CN < 30 || CN > 98) scsAviso.push("CN fuera de 30-98");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1518:  if (pctImperv < 0 || pctImperv > 100) scsAviso.push("% Impermeable fuera de 0-100");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1519:  if (!["I", "II", "III"].includes(AMC)) scsAviso.push("AMC debe ser I/II/III");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1520:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1521:  // AMC automático (SIATA) — opcional
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1522:  const [usarAMCauto, setUsarAMCauto] = useState(false);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1523:  const [hs_demo, setHsDemo]          = useState(0.38); // 0–1; aquí demo. Luego lo tomas de SIATA.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1528:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1529:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1530:  // AMC efectivo: si AMC auto está activo y no hay override SCS, usamos el derivado
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1531:  const AMC_eff = (usarAMCauto && !overrideSCS && amcAuto?.amcActual) ? amcAuto.amcActual : AMC;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1532:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1533:  // Informe amigable AMC
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1534:  const infoAMC = (usarAMCauto && amcAuto)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1535:    ? `${amcAuto.amcInforme} (Fuente: ${amcAuto.amcFuente})`
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1686:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1687:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1688:      {/* Hietograma de diseño + Parámetros SCS‑CN */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1689:      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1690:        {/* Hietograma de diseño */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1691:        <Card title={`Hietograma — ${distType} · Tr=${Tr}a · d=${durH}h · Δt=${dtMin}min`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1692:          <ResponsiveContainer width="100%" height={260}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1706:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1707:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1708:        {/* Parámetros lluvia efectiva (SCS‑CN) y UH */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1709:        <Card title="Parámetros lluvia efectiva (SCS‑CN) y UH" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1710:          {/* Toggles */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1711:          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1712:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1713:              <input type="checkbox" checked={overrideSCS} onChange={e => setOverrideSCS(e.target.checked)} /> Override SCS‑CN (análisis)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1714:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1715:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1716:              <input type="checkbox" checked={usarAMCauto} onChange={e => setUsarAMCauto(e.target.checked)} /> AMC automático (SIATA)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1717:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1733:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1734:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>CN (CNII)</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1735:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1736:                <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1737:                  type="number" min={30} max={98} step={0.1} value={CN_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1738:                  onChange={e => setCN_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1739:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1747:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1748:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>AMC</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1749:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1750:                <select
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1751:                  value={AMC_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1752:                  onChange={e => setAMC_ovr(e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1753:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1765:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1766:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>% Impermeable</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1767:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1768:                <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1769:                  type="number" min={0} max={100} step={1} value={pctImp_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1770:                  onChange={e => setPctImp_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1771:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1798:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1799:          {/* Informes */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1800:          <div style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 11, color: scsAviso.length ? C.rose : C.muted }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1801:            {infoTc}{scsAviso.length ? ` · Aviso: ${scsAviso.join(" · ")}` : ""}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1802:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1803:          {usarAMCauto && amcAuto && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1804:            <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 11, color: C.muted2 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1805:              {infoAMC}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1809:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1810:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1811:      {/* ===== Hidrograma Q(t) — Usa hook useHidrograma con valores efectivos ===== */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1812:      <HidrogramaResultado
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1813:        P_mm={P_mm}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1814:        dt_min={dt_min}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1815:        A_km2={A_km2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1827:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1828:              <XAxis dataKey="T" tick={{ fill: C.muted, fontSize: 9 }}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1829:                     label={{ value: "Tiempo (%)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1830:              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1831:                     label={{ value: "P acum (%)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1832:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(1) + "%"]} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1833:              <Legend wrapperStyle={{ fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1902:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1903:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1904:// MÓDULO HIDROGRAMAS — 5 Métodos con convolución completa (robusto para gráficas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1905:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1906:function ModHidrogramas({ params, est, name, onContextoComparador }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1907:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1908:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1909:  // Evita crash por referencias residuales a guardarAMCenPanel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1910:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1941:  // ── Parámetros HU
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1942:  const [tcSrc, setTcSrc] = useState(0);       // índice del Tc activo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1943:  const [kR, setKR]       = useState(1.2);     // Clark
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1944:  const [Ct, setCt]       = useState(2.0);     // Snyder
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1945:  const [Cp, setCp]       = useState(0.62);    // Snyder
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1946:  const [CpSCSMod, setCpSCSMod] = useState(2.08); // SCS Mod
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1947:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1948:  // ── Tc, unidades y pendiente
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1949:  const tcList = useMemo(() => calcTc(params).filter(r => isFinite(r.h) && r.h > 0), [params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1950:  const tc_h   = tcList[tcSrc]?.h || 0.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1962:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1963:  // ── Unidades Hidrológicas (5 métodos)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1964:  const hu_scs    = useMemo(() => calcHUSCS(params.area, tc_h, dtMin), [params.area, tc_h, dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1965:  const hu_scsMod = useMemo(() => calcHUSCS_Mod(params.area, tc_h, dtMin, CpSCSMod), [params.area, tc_h, dtMin, CpSCSMod]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1966:  const hu_snyder = useMemo(() => calcHUSnyder(area_mi2, L_mi, L_mi * 0.35, dtMin, Ct, Cp), [area_mi2, L_mi, dtMin, Ct, Cp]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1967:  const hu_wh     = useMemo(() => calcHUWilliamsHann(params.area, params.longitud_cauce, S_m_km, CNact, dtMin), [params, dtMin, CNact]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1968:  const hu_clark  = useMemo(() => calcClarkIUH(params.area, tc_h, dtMin, kR), [params.area, tc_h, dtMin, kR]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1969:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1970:  // ── Convolución (Pe * HU) → hidrogramas por método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1971:  const hidros = useMemo(() => (
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1972:    [hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark].map(hu => calcHidroCompleto(lluvEfect, hu, dtMin))
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1973:  ), [lluvEfect, hu_scs, hu_scsMod, hu_snyder, hu_wh, hu_clark, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1974:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1975:  // Hidrograma activo (SCS por defecto)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1976:  const h0 = hidros?.[0] ?? null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1977:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1978:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1979:  if (typeof onContextoComparador !== "function") return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1980:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1981:  const nombresHidrogramas = [
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1982:    "SCS Unit Hydrograph",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1983:    "SCS Modificado",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1984:    "Snyder",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1985:    "Williams & Hann",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1986:    "Clark IUH",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1987:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1988:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1989:  const numeroValido = (valor) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1990:    const n = Number(valor);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2014:      punto?.q_m3s ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2015:      punto?.Q_m3s ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2016:      punto?.caudal ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2017:      punto?.caudal_m3s ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2018:      punto?.caudal_m3_s ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2019:      punto?.y ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2020:      punto?.valor ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2021:      punto?.value
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2022:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2032:      punto?.t ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2033:        punto?.T ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2034:        punto?.tiempo ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2035:        punto?.tiempo_min ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2036:        punto?.tiempoMin ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2037:        punto?.min ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2038:        punto?.x
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2039:    ) ?? indice * dtMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2040:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2091:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2092:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2093:  const hidrogramasResumen = Array.isArray(hidros)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2094:    ? hidros.map((h, i) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2095:        const calculado = calcularDesdeSerie(h);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2096:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2097:        const QpDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2098:  h?.Qpico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2099:    h?.Qp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2100:    h?.qp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2101:    h?.q_pico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2102:    h?.caudalPico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2103:    h?.caudal_pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2104:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2105:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2106:        const TpDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2107:  h?.tPico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2108:    h?.Tp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2109:    h?.tp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2110:    h?.t_pico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2111:    h?.tiempoPico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2112:    h?.tiempo_pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2113:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2114:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2115:        const volumenDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2116:  h?.volTotal ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2117:    h?.volumen ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2118:    h?.V ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2119:    h?.vol ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2120:    h?.volume
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2122:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2123:        return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2124:          metodo: nombresHidrogramas[i] ?? `Método ${i + 1}`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2125:          Qp:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2126:            QpDirecto && QpDirecto > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2127:              ? QpDirecto
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2128:              : calculado.QpSerie,
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2187:          estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2188:          lluvia_efectiva: Boolean(lluvEfect),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2189:          hidrogramas: {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2190:            fuente: "ModHidrogramas",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2191:            resultados: hidrogramasQ5Exportables
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2192:          },
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2193:          lluvia_efectiva_total_mm: lluviaEfectivaTotalMm,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2194:          hidrogramas_resumen: hidrogramasResumen,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2195:          hidrograma_principal: h0 ?? null,
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2266:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2267:  /* ──────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2268:     Parche condicional Snyder (cfs → m³/s) y copia segura: hidrosCorr
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2269:     ────────────────────────────────────────────────────────────── */
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2270:  const factorCFS2M3S   = 0.028316846592;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2271:  // Política: 'auto' | 'force' | 'off'
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2272:  const SNYDER_POLICY   = 'auto';
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2273:  // Umbral para 'auto' (ratio Qp(Snyder)/max(Qp otros))
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2274:  const SNYDER_THRESHOLD = 12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2275:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2276:  const hidrosCorr = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2277:    const arr = (hidros ?? []).map(h => ({ ...h }));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2278:    const idxSny = arr.findIndex(h => /snyder/i.test(h.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2279:    if (idxSny >= 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2280:      const h = arr[idxSny];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2281:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2282:      const qpSny = (h.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2283:      const qpOtros = Math.max(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2284:        ...arr.filter((_,i)=> i !== idxSny).map(o =>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2285:          (o.qSeries ?? []).reduce((m,p)=> (p.Q > m ? p.Q : m), 0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2286:        ),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2287:        1
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2288:      );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2289:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2290:      let needConvert = false;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2291:      if (SNYDER_POLICY === 'force')       needConvert = true;
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2310:    'w & hann', 'w&h', 'w & h',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2311:    'williams & hann', 'williams&hann', 'williams & h',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2312:    'wh', 'williamshann', 'w hann'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2313:  ];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2314:  const matchWH = (s) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2315:    if (!s) return false;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2316:    const t = String(s).toLowerCase().replace(/\s+/g, ' ').trim();
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2334:  const seriesOK = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2335:    return (hidrosCorr ?? []).filter(h =>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2336:      Array.isArray(h?.qSeries) && h.qSeries.length > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2337:    );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2338:  }, [hidrosCorr]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2339:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2340:  const n = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2341:    const lens = seriesOK.map(h => h.qSeries.length);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2342:    return lens.length ? Math.max(...lens) : 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2343:  }, [seriesOK]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2344:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2345:  const step = useMemo(() => (n <= 0 ? 1 : Math.max(1, Math.floor(n / 100))), [n]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2352:      const obj = { t: +((idx * dtMin) || 0).toFixed(1) };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2353:      seriesOK.forEach(h => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2354:        obj[h.metodo] = h.qSeries[idx]?.Q ?? 0; // clave = nombre del método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2355:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2356:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2357:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2358:    return out;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2364:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2365:    if (!import.meta.env.DEV) return;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2366:    console.log('[DEBUG] seriesOK:', seriesOK.map(h => ({ metodo: h.metodo, len: h.qSeries?.length })));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2367:    console.log('[DEBUG] combined len:', combined.length, 'n=', n, 'step=', step);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2368:  }, [seriesOK, combined, n, step]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2369:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2370:  // ── Paleta por método (si no existe arriba en tu archivo)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2371:  const methodColors = {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2372:    'SCS':              '#4ECDC4',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2373:    'SCS Mod.':         '#94D82D',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2374:    'Snyder':           '#F59F00',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2375:    'Snyder (SI)':      '#F59F00',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2376:    'W & Hann':         '#845EF7',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2377:    'Williams & Hann':  '#845EF7',
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2378:    'Clark IUH':        '#20C997'
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2379:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2380:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2381:  // ── Render
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2382:  return (
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2411:         <span className="text-slate-400"> · ruta interna Q(t)</span>
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2422:         <div>Escenarios Tc para Q(t):</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2423:         <div>• Operativo Q(t): {tc_min.toFixed(1)} min · activo</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2424:         <div>• Índice global: {Number.isFinite(params?.tcMedMin) ? params.tcMedMin.toFixed(1) : "—"} min · referencia</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2425:         <div>• Comparador: pendiente · referencia especializada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2426:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2427:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2441:     </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2442:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2443:      {/* ===== Gráfica Q(t) — Convolución completa (segura) ===== */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2444:      <div style={{ width:'100%', height: 380, border:'1px solid #1F2F45', borderRadius: 10, background:'#0B0F1A' }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2445:        {noData ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2446:          <div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color: C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2447:            Sin datos para graficar — verifica hietograma, CN y HU
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2494:  const [catSAR,setCatSAR]=useState("Intermedios");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2495:  const [distType,setDistType]=useState("EPM_Q1");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2496:  const [metodoPost,setMetodoPost]=useState("SCS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2497:  const reportRef=useRef();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2498:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2499:  const TrRec={Menores:2.33,Intermedios:5,Mayores:25};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2500:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2515:  // Método hidrograma post-urbano seleccionable
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2516:  const huPost=useMemo(()=>{
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2517:    if(metodoPost==="Clark") return calcClarkIUH(params.area,tc_h,dtMin,1.2);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2518:    if(metodoPost==="Snyder") return calcHUSnyder(params.area*0.386102,params.longitud_cauce*0.621371,params.longitud_cauce*0.621371*0.35,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2519:    if(metodoPost==="WH") return calcHUWilliamsHann(params.area,params.longitud_cauce,S_m_km,cnIII_post,dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2520:    return calcHUSCS(params.area,tc_h,dtMin);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2521:  },[metodoPost,params,tc_h,dtMin,cnIII_post]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2522:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2523:  const qPost=useMemo(()=>calcHidroCompleto(lluvPost,huPost,dtMin),[lluvPost,huPost,dtMin]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2524:  const huPre=useMemo(()=>calcHUSCS(params.area,tc_h,dtMin),[params.area,tc_h,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2525:  const qPre =useMemo(()=>calcHidroCompleto(lluvPre,huPre,dtMin),[lluvPre,huPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2526:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2527:  const volSAR=useMemo(()=>calcVolSAR(qPost.qSeries,qPre.qSeries,dtMin),[qPost,qPre,dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2528:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2529:  const step=Math.max(1,Math.floor(volSAR.excesos.length/120));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2530:  const dispData=volSAR.excesos.filter((_,i)=>i%step===0).slice(0,140);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2531:  const reduccion=qPost.Qpico>0?(100*(qPost.Qpico-qPre.Qpico)/qPost.Qpico).toFixed(1):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2532:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2533:  const exportDatos={
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2534:    nombre_cuenca:params.nombre_cuenca,area:params.area,perimetro:params.perimetro,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2535:    longitud_cauce:params.longitud_cauce,pendiente_cuenca:params.pendiente_cuenca,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2538:    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2539:    hiet,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2540:    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2541:    volSAR,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2542:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2543:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2544:  return(<div style={{display:"flex",flexDirection:"column",gap:14}} ref={reportRef}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2583:        <div style={{marginTop:6,fontSize:9,color:C.muted,fontFamily:mono}}>CNIII post={cnIII_post}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2584:        <div style={{marginTop:2,fontSize:9,color:C.muted,fontFamily:mono}}>Método:</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2585:        <BtnGroup options={[{v:"SCS",l:"SCS"},{v:"Clark",l:"Clark"},{v:"Snyder",l:"Snyder"},{v:"WH",l:"W&H"}]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2586:          value={metodoPost} onChange={setMetodoPost} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2587:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2588:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2589:
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2621:          <LineChart data={HUFF_MERGED} margin={{left:0,right:14,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2622:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2623:            <XAxis dataKey="T" tick={{fill:C.muted,fontSize:9}} label={{value:"Tiempo (%)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2624:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"P (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2625:            <Tooltip contentStyle={TT} formatter={v=>[v?.toFixed(1)+"%"]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2626:            <Legend wrapperStyle={{fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2627:            <Line type="monotone" dataKey="EPM_Q1" stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2635:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2636:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2637:    {/* Hidrogramas POST vs PRE */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2638:    <Card title={`Hidrogramas SAR — POST (${metodoPost}, CN=${cnIII_post}) vs PRE (SCS, CN=${cnIII_pre}) · V_SAR=${volSAR.volTotal.toFixed(0)} m³`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2639:      <ResponsiveContainer width="100%" height={290}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2640:        <AreaChart data={dispData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2641:          <defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2642:            <linearGradient id="gPost" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent3} stopOpacity={0.35}/><stop offset="95%" stopColor={C.accent3} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2651:          <Legend wrapperStyle={{fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2652:          <Area yAxisId="q" type="monotone" dataKey="Qpost" stroke={C.accent3} fill="url(#gPost)" strokeWidth={2.5} name={`Q post (${metodoPost})`} dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2653:          <Area yAxisId="q" type="monotone" dataKey="Qpre"  stroke={C.accent2} fill="url(#gPre)"  strokeWidth={2.5} name="Q pre (SCS)" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2654:          <Area yAxisId="v" type="monotone" dataKey="volAcum" stroke={C.gold} fill="url(#gVol)" strokeWidth={1.5} name="Vol. SAR acum. (m³)" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2655:        </AreaChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2656:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2657:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2682:          ["P total diseño",`${hiet.Ptotal} mm`],["Método HU POST",metodoPost],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2683:          ["CN post (CNIII)",`${cnIII_post} (SI=${siPct}%)`],["CN pre (CNIII)","93.5"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2684:          ["Q pico POST",`${qPost.Qpico.toFixed(4)} m³/s`],["Q pico PRE (reg.)",`${qPre.Qpico.toFixed(4)} m³/s`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2685:          ["Reducción pico",`${reduccion}%`],["V almacenamiento",`${volSAR.volTotal.toFixed(0)} m³`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2686:        ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2687:          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.border}15`,fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2688:            <span style={{color:C.muted}}>{l}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2689:            <span style={{color:C.text,fontWeight:600}}>{v}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2708:    <div style={{background:`${C.teal}08`,border:`1px solid ${C.teal}20`,borderRadius:10,padding:"11px 15px",fontFamily:mono,fontSize:9,color:C.muted,lineHeight:1.7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2709:      <span style={{color:C.teal,fontWeight:700}}>Notas metodológicas GT-AS-004: </span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2710:      § 3.4 Pérdidas: Método SCS-CN · Condición humedad AMC III · §3.5 HU SCS: lag time=60%·Tc · §3.8 Volumen excedente=∫(Qpost−Qpre)dt · §3.9 Caudal regulado=Qpico(pre) · Distribución temporal: Primer Cuartil 
(Gallego et al., 2024) · Curvas Huff: Distribuciones Illinois-ISWS (probabilidad 50%)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2711:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2712:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2713:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2714:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2721:  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2722:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2723:    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2724:    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2725:      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2726:      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2727:      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2728:    </div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2729:    <Card title="Caudales Racionales — Todos los Tr" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2730:      <ResponsiveContainer width="100%" height={240}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2731:        <BarChart data={res} margin={{left:0,right:18,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2732:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2733:          <XAxis dataKey="Tr" tick={{fill:C.muted,fontSize:10}} label={{value:"Tr (años)",position:"insideBottom",offset:-4,fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2740:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2741:    </Card>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2742:    <Card title="Tabla — Parámetros y Caudales Racionales" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2743:      <Tbl headers={["Tr (a)","I (mm/h)","P (mm)","Coef. C","Q (m³/s)"]} rows={res} hiCols={[4]} accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2744:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2745:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2746:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3421:    {/* ── INTEGRACIÓN MODELO ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3422:    {subTab==="integracion"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3423:      <Card title="Flujo: Evento SIATA → Q(t) Calibrado" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3424:        <div style={{fontFamily:mono,fontSize:9,display:"flex",flexDirection:"column",gap:3}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3425:          {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3426:            ["1","Detectar evento SIATA (inicio/fin lluvia)","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3427:            ["2","Extraer P(t) de pluviómetros cercanos (15min)","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3429:            ["4","Calcular CN dinámico según AMC observada","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3430:            ["5","Generar hietograma real con datos SIATA","✓"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3431:            ["6","Aplicar pérdidas SCS con CN corregido","✓"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3432:            ["7","Convolución con HU (SCS/Clark/Snyder)","✓"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3433:            ["8","Comparar Q(t) con nivel observado","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3434:            ["9","Calibrar Tc, CN, kR si hay datos de nivel","⚡"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3435:            ["10","Exportar parámetros calibrados a nueva IDF","⚡"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3436:          ].map(([n,txt,s])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3437:            <div key={n} style={{display:"flex",gap:9,padding:"4px 9px",borderRadius:5,background:s==="✓"?`${C.teal}08`:`${C.gold}06`,marginBottom:1}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3497:            {box:"ETL Pipeline\nFiltrar · Validar\nHomologar unidades",col:C.teal,sub:"P→mm, T→°C\nDetecta outliers"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3498:            {arr:"→"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3499:            {box:"HidroFlow\nMotor IDF · SAR\nGT-AS-004",col:C.accent2,sub:"CN dinámico\nQ(t) calibrado"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3500:            {arr:"→"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3501:            {box:"Dashboard\nPDF · Excel\nAlertas",col:C.gold,sub:"Reportes\nGestión riesgo"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3502:          ].map((item,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3503:            if(item.arr) return(<div key={i} style={{fontSize:18,color:C.muted,alignSelf:"center",padding:"0 2px"}}>{item.arr}</div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3522:  {id:"idf",        label:"IDF",          icon:"⌁", acc:C.accent3,  desc:"20 Est. EPM 2025 · I=k/(c+d)ⁿ · PDF calibradas"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3523:  {id:"hiet",       label:"Hietogramas",  icon:"🌧", acc:C.accent,   desc:"GT-AS-004 §3.3 · Curvas Huff Q1-Q4 · 5 distribuciones"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3524:  {id:"hidro",      label:"Hidrogramas",  icon:"≋", acc:C.accent2,  desc:"SCS · SCS Mod. · Snyder · Williams&Hann · Clark IUH"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3525:  {id:"racional",   label:"Racional",     icon:"◈", acc:C.gold,     desc:"Q=C·I·A/3.6 · Abstracción SCS · Todos los Tr"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3526:  {id:"sar",        label:"SAR",          icon:"◫", acc:C.accent4,  desc:"GT-AS-004 §3 · Hietograma+Convolución+Vol. · PDF/Excel"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3527:  {id:"influencia", label:"Influencia",   icon:"⊕", acc:C.teal,     desc:"IDW · Thiessen · Altitudinal · Compuesto · Escenarios · Mapa AMVA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3528:  {id:"siata",      label:"SIATA",        icon:"🛰", acc:C.accent3,  desc:"API repopruebas.siata.gov.co · Series · Validación IDF · Arquitectura"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3529:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3597:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3598:      fuente: "calcRacional",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3599:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3600:      estado: "informativo_no_adoptivo",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3601:      tc_min: Number.isFinite(Number(tcRacionalMin))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3602:        ? Number(Number(tcRacionalMin).toFixed(2))
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3603:        : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3666:    }),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3667:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3668:    hidrogramas: previo?.hidrogramas ?? {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3669:      fuente: "pendiente",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3670:      resultados: []
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3671:    },
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3672:    hidrogramas_resumen: previo?.hidrogramas_resumen ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3673:    hidrograma_principal: previo?.hidrograma_principal ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3674:  }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3675:}, [onContextoComparador, params, stn, trStateGlobal?.Tr_activo]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3676:// Publicación base Tc para despertar el Índice Hidrológico global.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3792:      <button data-id="blind-hidro" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); setTab("hidro");}}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3793:        style={{padding:"4px 9px",borderRadius:6,border:"none",cursor:"pointer",background:"transparent",color:C.muted, fontSize:9.5,fontWeight:500}}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3794:        title="Ir a Hidrogramas (SPA)">≋</button></nav>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3795:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3796:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3797:    {/* Accent bar */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3798:    <div style={{height:1.5,background:`linear-gradient(90deg,${aa}AA,${aa}22,transparent)`}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3817:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3818:      )}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3819:      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={stn} onContextoComparador={onContextoComparador} />}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3820:      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn} onContextoComparador={onContextoComparador}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3821:      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3822:      {tab === "Influencia" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3823:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3838:    <div style={{borderTop:`1px solid ${C.border}`,padding:"7px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3839:      <span style={{fontSize:8,color:C.muted,fontFamily:mono}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3840:        HidroFlow v3.1 · GT-AS-004 Rev.0 2026-01-07 · SIATA AMVA · {pdfN} est. PDF + {refN} ref. · 5 HU · IDW/Thiessen/Altitudinal/Compuesto · Huff Q1-Q4 · Clark IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3841:      </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3842:      <div style={{display:"flex",gap:10,fontFamily:mono,fontSize:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3843:        {[{l:stn,a:C.accent3},{l:`A=${params.area}km²`,a:C.accent},{l:`CN=${params.CN}`,a:C.accent2},{l:`Δt=${params.dt}min`,a:C.gold},{l:`17 est. SIATA`,a:C.teal}].map(({l,a})=><span key={l} 
style={{color:a}}>{l}</span>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3844:      </div>



## Lectura preliminar

Esta auditoría busca confirmar si cada método dispone de serie temporal completa Q(t) o solamente de valores resumen como Qpico, tPico y volTotal. Sin esa confirmación no se deben calcular métricas de forma.

## Restricciones

- No modificar hidroEngine.js.
- No modificar ComparadorMultiMetodo.jsx.
- No modificar HidroFlow.jsx.
- No recalcular Q-Tr.
- No recalcular Q-5.
- No alterar Qp, Tp, Volumen ni Q(t).
- No generar PDF, Word ni mapas.

## Criterio de salida

OT-0068B queda completa cuando exista una auditoría versionada de la disponibilidad real de series Q(t), campos de hidrograma y estructura temporal requerida para métricas de forma.
