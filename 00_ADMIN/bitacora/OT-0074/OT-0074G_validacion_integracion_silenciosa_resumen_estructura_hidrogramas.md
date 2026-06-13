# OT-0074G — Validación focal de integración silenciosa del resumen estructural de hidrogramas

Fecha: 2026-06-12 21:28:36

## Estado base

- Rama: ot-0074-publicacion-real-qseries-metodo.
- OT-0074A cerrada en commit eb8f82b.
- OT-0074B cerrada en commit caa8bfd.
- OT-0074C cerrada en commit 4e7ac9a.
- OT-0074D cerrada en commit 28a1da6.
- OT-0074E cerrada en commit 4e44d09.
- OT-0074F cerrada en commit c6f21c2.
- Alcance: validación focal documental y build.

## Objetivo

Validar que la integración interna de resumenEstructuraHidrogramas quedó silenciosa, no invasiva y sin efectos sobre UI productiva, motor, resultados hidrológicos o métricas morfológicas.

## Validaciones esperadas

- Existe import de resumirEstructuraHidrogramas.
- Existe resumenEstructuraHidrogramas.
- resumenEstructuraHidrogramas usa useMemo.
- resumenEstructuraHidrogramas usa contextoBase?.hidrogramas.
- Se conserva diagnosticoQSeries.
- Se conserva obtenerResultadoQMetodo.
- No se agrega UI visible nueva asociada al resumen estructural.
- No se muestra qSeries cruda.
- No se calculan De, W50, W25, pendientes ni asimetría.

## Evidencia focal en ComparadorMultiMetodo.jsx


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:import adaptarExpedienteDocumental from "../services/documentos/adaptarExpedienteDocumental";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import adaptarQSeriesHidrogramas from "../services/hidrogramas/adaptarQSeriesHidrogramas";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:import resumirEstructuraHidrogramas from "../services/hidrogramas/resumirEstructuraHidrogramas";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:10:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:11:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:12:  resumenComparadorCatalogo,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:13:} from "../data/metodosComparadorCatalogo";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:14:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:15:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:16:  evaluarCompetenciaComparador,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:17:} from "../data/matrizCompetenciaComparador";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:142:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:143:// OT-0070D — Diagnóstico qSeries interno y silencioso
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:144:const diagnosticoQSeries = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:145:  try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:146:    return adaptarQSeriesHidrogramas(contextoBase?.hidrogramas, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:147:      fuente: "ComparadorMultiMetodo.contextoBase.hidrogramas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:148:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:149:  } catch (errorQSeries) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:150:    console.warn("Diagnóstico qSeries no invasivo no ejecutado:", errorQSeries);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:151:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:152:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:153:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:154:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:163:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:164:  }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:165:}, [contextoBase?.hidrogramas]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:166:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:167:// OT-0074F — Resumen estructural interno y silencioso de hidrogramas
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:168:const resumenEstructuraHidrogramas = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:169:  try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:170:    return resumirEstructuraHidrogramas(contextoBase?.hidrogramas);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:171:  } catch (errorResumenHidrogramas) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:172:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:173:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:174:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:175:        tipoEntrada: "error",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:176:        contenedor: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:177:        totalCandidatos: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:178:        conSerieTemporal: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:186:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:187:  }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:188:}, [contextoBase?.hidrogramas]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:189:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:190:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:191:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:192:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:193:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:194:  const estilos = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:195:    pagina: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:196:      minHeight: "100vh",
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:622:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:623:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:624:  const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:625:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:626:  if (!bruto) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:627:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:628:      Qp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:629:      Tp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:630:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:631:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:632:    };
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:          const obtenerCandidatosQ5Contexto = () => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:              ? bruto
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:              : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:              ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:              : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:              ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:              : [];
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2268:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2269:            {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2270:        const resumenQSeries = diagnosticoQSeries?.resumen ?? {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2271:          total: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2272:          publicados: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2273:          parciales: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2274:          noDisponibles: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2275:          inconsistentes: 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2276:        };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2277:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2278:        const estadoQSeries =
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



## Restricciones

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No reemplazar obtenerResultadoQMetodo.
- No reemplazar diagnosticoQSeries.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No calcular De, W50, W25, pendientes ni asimetría.
- No agregar UI visible nueva para resumen estructural.

## Criterio de salida

OT-0074G queda completa cuando exista validación focal versionada, build Vite aprobado y working tree limpio.

## Resultado de validación

- Import de resumirEstructuraHidrogramas confirmado.
- resumenEstructuraHidrogramas confirmado.
- Integración con useMemo confirmada.
- Uso de contextoBase?.hidrogramas confirmado.
- diagnosticoQSeries se conserva.
- obtenerResultadoQMetodo se conserva.
- No se modificó HidroFlow.jsx.
- No se modificó hidroEngine.js.
- No se modificó resumirEstructuraHidrogramas.js.
- No se incorporó cálculo morfológico operativo.
- Build Vite aprobado.
