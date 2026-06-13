# OT-0071B — Auditoría de ubicación visual exacta del panel qSeries

Fecha: 2026-06-12 19:48:21

## Estado base

- Rama: ot-0071-panel-diagnostico-qseries-no-invasivo.
- OT-0071A cerrada en commit ff31cc8.
- Main base: ae87cfd, posterior a OT-0070.
- Alcance: auditoría visual sin cambios funcionales.

## Objetivo

Identificar la ubicación visual exacta y segura para un panel diagnóstico qSeries no invasivo, usando diagnosticoQSeries.resumen y sin alterar tabla Q-5, flujo de copiado, motor ni resultados hidrológicos.

## Archivo auditado

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx

## Patrones auditados


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:137:  q: metodos.filter(m => m.tipo === "q").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:138:  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:139:  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:140:}), [metodos]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:141:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:142:// OT-0070D — Diagnóstico qSeries interno y silencioso
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:143:const diagnosticoQSeries = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:144:  try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:145:    return adaptarQSeriesHidrogramas(contextoBase?.hidrogramas, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:146:      fuente: "ComparadorMultiMetodo.contextoBase.hidrogramas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:147:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:148:  } catch (errorQSeries) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:149:    console.warn("Diagnóstico qSeries no invasivo no ejecutado:", errorQSeries);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:150:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:151:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:152:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:153:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:154:        total: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:155:        publicados: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:573:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:574:  if (!match) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:575:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:576:  return extraerNumero(match);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:577:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:578:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:579:const obtenerResultadoQMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:580:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:581:    String(valor ?? "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:582:      .toLowerCase()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:583:      .normalize("NFD")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:584:      .replace(/[\u0300-\u036f]/g, "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:585:      .replace(/[^a-z0-9]/g, "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:586:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:587:  const extraerNumero = (objeto, claves = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:588:    for (const clave of claves) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:589:      const valor = objeto?.[clave];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:590:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:591:      if (Number.isFinite(Number(valor))) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:772:    borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:773:    padding: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:774:    margin: "10px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:775:    background: "rgba(15,23,42,0.5)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:776:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:777:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:778:  <strong>Estado global del modelo:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:779:  <span
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:780:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:781:      padding: "2px 8px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:782:      borderRadius: 6,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:783:      background: estadoGlobal.color,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:784:      color: "#fff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:785:      marginLeft: 6,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:786:      fontSize: "12px"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:787:    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:788:  >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:789:    {estadoGlobal.etiqueta}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:790:  </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:895:                 <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:896:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:897:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:898:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:899:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:900:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:901:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:902:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:903:    if (!Number.isFinite(resultadoQ.Qp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:904:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:905:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:906:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:907:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:908:      <span style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:909:        {resultadoQ.Qp.toFixed(2)} m³/s
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:910:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:911:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:912:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:913:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:915:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:916:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:917:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:918:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:919:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:920:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:921:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:922:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:923:    if (!Number.isFinite(resultadoQ.Tp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:924:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:925:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:926:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:927:    const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:928:    const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:929:      Number.isFinite(tcReferencia) && tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:930:        ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:931:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:932:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:933:    const alertaTcTp =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:979:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:980:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:981:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:982:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:983:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:984:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:985:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:986:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:987:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:988:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:989:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:990:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:991:    const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:992:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:993:    const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:994:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:995:        ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:996:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:997:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1453:    padding: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1454:    color: "#fecaca",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1455:    fontSize: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1456:    lineHeight: 1.5,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1457:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1458:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1459:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. 
La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1472:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1473:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1474:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:          const textoResumenQ5 = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:            "# Resumen técnico Q-5 post auditoría",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1478:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1480:            "Síntesis:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1482:            "- SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:            "- Masa y volumen: controlados frente a la referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1485:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1486:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1487:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1488:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1489:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1490:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1491:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1492:            "- No se recalculan hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1493:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1494:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1495:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1496:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1497:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1498:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1616:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1617:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | 
${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1619:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1620:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:            .map((metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:            .map((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1634:              const nombreMetodo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1753:                metodosQ5Expediente.find((metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1754:                  String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1755:                ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1756:                metodosQ5Expediente[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1757:                null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1758:              const resultadoQ5PrincipalConsistencia = metodoQ5PrincipalConsistencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1759:                ? obtenerResultadoQMetodo(metodoQ5PrincipalConsistencia)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1760:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1761:              const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalConsistencia?.volumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1762:              const relacionVolumenQ5Esperado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1763:                Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1764:                Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1765:                volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1766:                  ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1767:                  : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1768:              const estadoConsistenciaVolumen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1769:                relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1770:                  ? "no evaluada"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1771:                  : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1838:            "Tabla Q-5 auditada:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1839:            ...tablaQ5Markdown,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1840:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1841:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1842:            "## 7. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1843:            "Uso: contraste global independiente de caudal pico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1844:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1845:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1846:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1847:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1848:              ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1849:                  `Tc racional exportado: ${
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1850:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1851:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1852:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1853:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1854:                  "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1855:                  "Tabla Método Racional:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1856:                  "| Tr | I | P | C | Q |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1917:              fuenteExpediente: "ComparadorMultiMetodo.textoExpediente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1918:              origenPlantilla: "OT-0064",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1919:              cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1920:            });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1921:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1922:            if (!diagnosticoDocumentalExpediente.ok) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1923:              console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1924:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1925:          } catch (errorDiagnosticoDocumental) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1926:            console.warn("Diagnóstico documental no invasivo no ejecutado:", errorDiagnosticoDocumental);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1927:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1928:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1929:              // OT-0056E valida expediente copiado antes de enviarlo al portapapeles.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1930:              const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1931:              const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1932:                textoExpediente.includes(token)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1933:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1934:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1935:              const seccionesObligatoriasExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1936:                "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1937:                "## 5. Escenario Q-Tr activo — control de trazabilidad",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1938:                "## 6. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1997:            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1998:          } else {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1999:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2000:          }        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2001:        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2002:      >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2003:        Copiar expediente hidrológico mínimo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2004:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2005:      {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2006:        const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2007:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2008:        const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2009:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2010:            ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2011:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2012:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2013:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2014:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2015:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2036:          padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2037:          margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2038:          background: "rgba(15, 23, 42, 0.6)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2039:        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2040:      >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2041:        <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2042:          Diagnóstico documental (lectura auxiliar)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2043:        </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2044:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2045:        <div style={{ fontSize: "13px", marginBottom: 6 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2046:          <strong>Estado:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2047:          {diagnostico?.ok ? "OK" : "Con advertencias"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2048:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2049:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2050:        <div style={{ fontSize: "12px", opacity: 0.7 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2051:          No controla el copiado. No modifica el expediente.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2052:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2053:      </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2054:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2078:                String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2079:              ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2080:              metodosQ5Panel[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2081:              null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2082:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2083:            const resultadoQ5PrincipalPanel = metodoQ5PrincipalPanel
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2084:              ? obtenerResultadoQMetodo(metodoQ5PrincipalPanel)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2085:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2086:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2087:            const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalPanel?.volumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2088:            const relacionVolumenQ5Esperado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2089:              Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2090:              Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2091:              volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2092:                ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2093:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2094:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2095:            const estadoConsistenciaVolumen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2096:              relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2126:                  padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2127:                  margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2128:                  background: "rgba(15, 23, 42, 0.70)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2129:                }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2130:              >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2131:                <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2132:                  Panel visual de consistencia cruzada OT-0058
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2133:                </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2134:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2135:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2136:                  Control Pe–Área–Volumen/Q-5 visible antes de copiar el expediente. No recalcula hidrogramas, no modifica Q-5 y no adopta resultados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2137:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2138:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2139:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2140:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2141:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2142:                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2143:                    gap: 8
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2144:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2192:                  padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2193:                  margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2194:                  background: disponibleQTrActivo ? "rgba(22, 163, 74, 0.10)" : "rgba(161, 98, 7, 0.10)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2195:                }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2196:              >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2197:                <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2198:                  Bloque Q-Tr activo · Escenario de diseño controlado
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2199:                </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2200:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2201:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2202:                  Escenario activo de periodo de retorno publicado desde el contexto hidrológico. Este bloque no recalcula caudales, no modifica Q-5 y funciona como control visual del Tr activo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2203:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2204:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2205:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2206:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2207:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2208:                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2209:                    gap: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2210:                    marginBottom: 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2238:                  Fuente: {estadoQTrActivo?.fuente ?? "—"}. Estado no adoptivo: la adopción técnica permanece subordinada a la validación hidrológica del expediente.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2239:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2240:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2241:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2242:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2243:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2244:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2245:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2246:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2247:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2248:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2249:



## Lectura preliminar

La ubicación futura candidata debe estar cerca del Bloque Q-5, preferiblemente antes de renderTabla del bloque Q-5 o junto a la nota/resumen Q-5, como lectura diagnóstica auxiliar. No debe reemplazar la tabla Q-5 ni modificar la lógica obtenerResultadoQMetodo.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0071B.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No calcular De, W50, W25, pendientes ni asimetría.
- No mostrar qSeries cruda.
- No modificar flujo de copiado.

## Criterio de salida

OT-0071B queda completa cuando exista auditoría versionada de ubicación visual del panel qSeries, sin cambios funcionales sobre la aplicación.
