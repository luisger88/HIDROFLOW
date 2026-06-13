# OT-0076B — Auditoría de ubicación del dictamen de ausencia de serie temporal

Fecha: 2026-06-12 22:15:54

## Estado base

- Rama: ot-0076-dictamen-ausencia-serie-temporal-hidrogramas.
- OT-0076A cerrada en commit 80dffdc.
- Main base: eebad90, posterior a OT-0075.
- Alcance: auditoría de ubicación, sin cambios funcionales.

## Objetivo

Auditar la ubicación segura para incorporar un dictamen de ausencia de serie temporal publicada, dentro del panel existente y sin duplicar bloques visuales.

## Archivo auditado

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx

## Patrones auditados


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:171:  } catch (errorResumenHidrogramas) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:172:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:173:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:174:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:175:        tipoEntrada: "error",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:176:        contenedor: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:177:        totalCandidatos: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:178:        conSerieTemporal: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:179:        sinSerieTemporal: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:180:        conQpico: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:181:        conTPico: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:182:        conVolTotal: 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:183:      },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:184:      candidatos: [],
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:185:      error: String(errorResumenHidrogramas?.message ?? errorResumenHidrogramas)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:186:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:187:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:188:}, [contextoBase?.hidrogramas]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:599:  if (!match) return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:600:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:601:  return extraerNumero(match);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:602:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:603:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:604:const obtenerResultadoQMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:605:  const normalizarTexto = (valor) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:606:    String(valor ?? "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:607:      .toLowerCase()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:608:      .normalize("NFD")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:609:      .replace(/[\u0300-\u036f]/g, "")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:610:      .replace(/[^a-z0-9]/g, "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:611:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:612:  const extraerNumero = (objeto, claves = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:613:    for (const clave of claves) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:614:      const valor = objeto?.[clave];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:615:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:616:      if (Number.isFinite(Number(valor))) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:921:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:922:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:923:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:924:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:925:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:926:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:927:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:928:    if (!Number.isFinite(resultadoQ.Qp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:929:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:930:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:931:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:932:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:933:      <span style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:934:        {resultadoQ.Qp.toFixed(2)} m³/s
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:935:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:936:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:937:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:938:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:941:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:942:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:943:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:944:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:945:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:946:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:947:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:948:    if (!Number.isFinite(resultadoQ.Tp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:949:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:950:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:951:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:952:    const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:953:    const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:954:      Number.isFinite(tcReferencia) && tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:955:        ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:956:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:957:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:958:    const alertaTcTp =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1005:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1006:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1007:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1008:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1009:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1010:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1011:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1012:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1013:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1014:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1015:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1016:    const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1017:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1018:    const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1019:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1020:        ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1021:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1022:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1506:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1507:            "- SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1508:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1509:            "- Masa y volumen: controlados frente a la referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1510:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1511:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1512:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1513:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1514:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1515:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1516:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517:            "- No se recalculan hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1518:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1519:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1520:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1521:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1522:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1523:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1642:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | 
${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1643:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1644:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1645:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1646:            .map((metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1647:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1648:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1649:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1650:              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1651:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1652:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1653:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1654:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1655:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1656:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1657:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1658:            .map((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1659:              const nombreMetodo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1779:                  String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1780:                ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1781:                metodosQ5Expediente[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1782:                null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1783:              const resultadoQ5PrincipalConsistencia = metodoQ5PrincipalConsistencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784:                ? obtenerResultadoQMetodo(metodoQ5PrincipalConsistencia)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1785:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1786:              const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalConsistencia?.volumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1787:              const relacionVolumenQ5Esperado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1788:                Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1789:                Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1790:                volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1791:                  ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1792:                  : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1793:              const estadoConsistenciaVolumen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1794:                relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1795:                  ? "no evaluada"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1796:                  : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1864:            ...tablaQ5Markdown,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1865:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1866:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1867:            "## 7. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1868:            "Uso: contraste global independiente de caudal pico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1869:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1870:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1871:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1872:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1873:              ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1874:                  `Tc racional exportado: ${
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1875:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1876:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1877:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1878:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1879:                  "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1880:                  "Tabla Método Racional:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1881:                  "| Tr | I | P | C | Q |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2104:              ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2105:              metodosQ5Panel[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2106:              null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2107:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2108:            const resultadoQ5PrincipalPanel = metodoQ5PrincipalPanel
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2109:              ? obtenerResultadoQMetodo(metodoQ5PrincipalPanel)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2110:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2111:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2112:            const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalPanel?.volumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2113:            const relacionVolumenQ5Esperado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2114:              Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2115:              Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2116:              volumenEsperadoM3 > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2117:                ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2118:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2119:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2120:            const estadoConsistenciaVolumen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2121:              relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2293:              margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2294:              background: "rgba(15, 23, 42, 0.55)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2295:            }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2296:          >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2297:            <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2298:              Panel diagnóstico qSeries
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2299:            </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2300:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2301:            <div style={{ ...estilos.muted, marginBottom: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2302:              Lectura no invasiva de disponibilidad de series Q(t). No calcula De, W50, W25, pendientes ni asimetría.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2303:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2304:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2305:            <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2306:              style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2307:                display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2308:                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2309:                gap: 8
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2310:              }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2311:            >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2312:              <div><strong>Estado:</strong> <span style={{ color: estadoQSeries.color }}>{estadoQSeries.etiqueta}</span></div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2313:              <div><strong>Total:</strong> {resumenQSeries.total}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2314:              <div><strong>Publicados:</strong> {resumenQSeries.publicados}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2324:                borderRadius: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2325:                border: "1px solid rgba(148, 163, 184, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2326:                background: "rgba(15, 23, 42, 0.45)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2327:              }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2328:            >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2329:              <strong>Dictamen operativo:</strong> las series Q(t) no están publicadas para los métodos evaluados. No procede calcular métricas morfológicas de forma hasta publicar qSeries reales o normalizadas por 
método.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2330:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2331:            {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2332:              const resumenEstructural = resumenEstructuraHidrogramas?.resumen ?? {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2333:                tipoEntrada: "no_disponible",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2334:                contenedor: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2335:                totalCandidatos: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2336:                conSerieTemporal: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2337:                sinSerieTemporal: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2338:                conQpico: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2339:                conTPico: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2340:                conVolTotal: 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2341:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2342:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2343:              return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2344:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2345:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2346:                    marginTop: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2348:                    borderRadius: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2349:                    border: "1px solid rgba(148, 163, 184, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2350:                    background: "rgba(15, 23, 42, 0.35)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2351:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2352:                >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2353:                  <strong>Resumen estructural de hidrogramas:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2354:                  lectura agregada del objeto hidrogramas disponible en contexto.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2355:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2356:                  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2357:                    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2358:                      display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2359:                      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2360:                      gap: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2361:                      marginTop: 8
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2362:                    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2363:                  >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2364:                    <div><strong>Tipo entrada:</strong> {String(resumenEstructural.tipoEntrada ?? "—")}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2365:                    <div><strong>Contenedor:</strong> {String(resumenEstructural.contenedor ?? "—")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2366:                    <div><strong>Candidatos:</strong> {resumenEstructural.totalCandidatos ?? 0}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2367:                    <div><strong>Con serie:</strong> {resumenEstructural.conSerieTemporal ?? 0}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2368:                    <div><strong>Sin serie:</strong> {resumenEstructural.sinSerieTemporal ?? 0}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2369:                    <div><strong>Con Qpico:</strong> {resumenEstructural.conQpico ?? 0}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2370:                    <div><strong>Con tPico:</strong> {resumenEstructural.conTPico ?? 0}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2371:                    <div><strong>Con volTotal:</strong> {resumenEstructural.conVolTotal ?? 0}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2372:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2373:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2374:                  <div style={{ ...estilos.muted, marginTop: 8 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2375:                    Este bloque no muestra series crudas, no lista arrays completos y no calcula métricas morfológicas.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2376:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2377:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2378:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2379:            })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2380:            <div style={{ ...estilos.muted, marginTop: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2381:              Este panel no muestra qSeries cruda y no modifica Qp, Tp, Volumen ni Q(t).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2382:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2383:          </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2384:        );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2385:      })()}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2386:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2387:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2388:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2389:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2390:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2391:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2392:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2393:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2394:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2395:



## Lectura preliminar

El dictamen de ausencia de serie temporal debe incorporarse dentro del bloque Resumen estructural de hidrogramas o inmediatamente después de sus conteos, sin crear un nuevo panel y sin duplicar el dictamen qSeries existente.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0076B.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No calcular De, W50, W25, pendientes ni asimetría.
- No modificar flujo de copiado.

## Criterio de salida

OT-0076B queda completa cuando exista auditoría versionada de ubicación del dictamen de ausencia de serie temporal, sin cambios funcionales sobre la aplicación.
