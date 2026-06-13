# OT-0074A — Auditoría de origen real de series Q(t)

Fecha: 2026-06-12 20:56:14

## Estado base

- Rama: ot-0074-publicacion-real-qseries-metodo.
- Rama creada desde main limpio post OT-0073.
- Main base: ab1cc83, merge post PR #103.
- OT-0073 dejó dictamen operativo: qSeries no disponibles para los 5 métodos evaluados.
- Working tree inicial limpio.

## Objetivo

Auditar el origen real de las series Q(t) en motor, contexto y componentes, para determinar dónde deben publicarse qSeries reales por método sin recalcular hidrogramas ni alterar resultados existentes.

## Archivos y rutas auditadas

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx
- 01_APP\HIDROFLOW\src\HidroFlow.jsx
- 01_APP\HIDROFLOW\src\services\hidroEngine.js
- 01_APP\HIDROFLOW\src\services\hidrogramas

## Preguntas de auditoría

- Dónde se generan las curvas Q(t).
- Si existen series internas antes de llegar al comparador.
- Si existen campos qSeries, series, serie, data o points.
- Si existen pares tiempo-caudal bajo otros nombres.
- Si contextoBase?.hidrogramas transporta solo resumen o también serie temporal.
- Dónde puede publicarse qSeries sin recalcular ni tocar hidroEngine.js.

## Evidencia en ComparadorMultiMetodo.jsx


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:4:import { calcTc, mapTcResultados } from "../services/hidroEngine";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:5:import { seleccionarTc } from "../services/tcSelector";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:6:import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:import adaptarExpedienteDocumental from "../services/documentos/adaptarExpedienteDocumental";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import adaptarQSeriesHidrogramas from "../services/hidrogramas/adaptarQSeriesHidrogramas";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:10:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:11:  resumenComparadorCatalogo,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:12:} from "../data/metodosComparadorCatalogo";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:13:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:14:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:15:  evaluarCompetenciaComparador,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:16:} from "../data/matrizCompetenciaComparador";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:17:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:18:import { conceptuarCuenca } from "../data/clasificacionCuenca";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:19:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:20:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:21:  obtenerAuditoriaPendienteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:22:  obtenerCriterioPendientesAuditoria,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:23:} from "../data/auditoriaPendientesTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:24:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:25:export default function ComparadorMultiMetodo({ contexto = null }) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:26:  let bloqueoAdopcion = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:27:  // ✅ OT-0067E — utilidades de bloqueo (GLOBAL COMPONENTE)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:28:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:29:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:30:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:31:  const [filtroEstado, setFiltroEstado] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:32:  const [filtroTipo, setFiltroTipo] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:33:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:138:  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:139:  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:140:}), [metodos]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:141:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:142:// OT-0070D — Diagnóstico qSeries interno y silencioso
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:143:const diagnosticoQSeries = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:144:  try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:145:    return adaptarQSeriesHidrogramas(contextoBase?.hidrogramas, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:146:      fuente: "ComparadorMultiMetodo.contextoBase.hidrogramas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:147:    });
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:148:  } catch (errorQSeries) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:149:    console.warn("Diagnóstico qSeries no invasivo no ejecutado:", errorQSeries);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:150:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:151:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:152:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:153:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:154:        total: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:155:        publicados: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:156:        parciales: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:157:        noDisponibles: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:158:        inconsistentes: 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:159:      },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:160:      metodos: [],
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:161:      error: String(errorQSeries?.message ?? errorQSeries)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:162:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:163:  }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:164:}, [contextoBase?.hidrogramas]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:165:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:166:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:167:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:168:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:169:  const estilos = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:170:    pagina: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:171:      minHeight: "100vh",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:172:      padding: "22px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:173:      background:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:174:        "linear-gradient(180deg, #020617 0%, #050b14 45%, #030712 100%)",
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:595:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:596:    return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:597:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:598:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:599:  const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:600:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:601:  if (!bruto) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:602:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:603:      Qp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:604:      Tp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:605:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:606:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:607:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:608:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:609:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:641:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:642:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:643:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:644:  return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:645:    Qp: extraerNumero(match, ["Qp", "qp", "Qpico", "qPico", "q_pico", "caudalPico", "caudal_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:646:    Tp: extraerNumero(match, ["Tp", "tp", "tPico", "TPico", "t_pico", "tiempoPico", "tiempo_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:647:    volumen: extraerNumero(match, ["volumen", "V", "vol", "volume", "volTotal", "vol_total", "volumenTotal"]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:648:    disponible: true,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:649:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:650:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:651:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:652:  const obtenerAuditoriaPendienteMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:653:    if (metodo.tipo !== "tc") return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:654:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:655:    return obtenerAuditoriaPendienteTc(metodo.id);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:656:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:657:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:666:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:667:    ));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:668:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:669:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:670:  const renderTabla = (titulo, tipo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:671:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:672:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:673:  // OT-0067 — Adaptador de coherencia hidrológica (encapsulado)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:674:const clasificarCoherencia = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:675:  // OT-0067 — Adaptador de coherencia hidrológica
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:676:  const tpRaw = metodo?.tPico ?? metodo?.tp ?? metodo?.Tp;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:677:  const tp = Number(String(tpRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:678:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:679:  const tcRaw = contextoBase?.tc_global ?? contextoBase?.tc ?? contextoBase?.tcMin ?? 0;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:680:  const tc = Number(String(tcRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:681:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:682:  const nombre = String(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:683:    metodo?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:684:    metodo?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:685:    metodo?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:686:    ""
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1458:>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1459:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. 
La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1472:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1473:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1474:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:          const textoResumenQ5 = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:            "# Resumen técnico Q-5 post auditoría",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:            "",
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:          const obtenerCandidatosQ5Contexto = () => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:              ? bruto
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:              : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:              ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:              : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:              ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1642:              const resultadoQ = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1643:                Qp:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1644:                  h?.Qp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1645:                  h?.qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1646:                  h?.Qpico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1647:                  h?.qPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1648:                  h?.q_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1649:                  h?.caudalPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1650:                  h?.caudal_pico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1651:                Tp:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1652:                  h?.Tp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1653:                  h?.tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1654:                  h?.tPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1655:                  h?.TPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1656:                  h?.t_pico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1657:                  h?.tiempoPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1658:                  h?.tiempo_pico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1659:                volumen:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1660:                  h?.volumen ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1661:                  h?.V ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1662:                  h?.vol ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663:                  h?.volume ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1664:                  h?.volTotal ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665:                  h?.vol_total ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666:                  h?.volumenTotal
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:          const filasQ5Markdown =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:            filasQ5DesdeCatalogo.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:              ? filasQ5DesdeCatalogo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:              : filasQ5DesdeContexto;
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2241:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2242:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2243:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2244:            {(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2245:        const resumenQSeries = diagnosticoQSeries?.resumen ?? {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2246:          total: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2247:          publicados: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2248:          parciales: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2249:          noDisponibles: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2250:          inconsistentes: 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2251:        };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2252:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2253:        const estadoQSeries =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2254:          resumenQSeries.inconsistentes > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2255:            ? { etiqueta: "Inconsistente", color: "#dc2626" }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2256:            : resumenQSeries.publicados > 0 && (resumenQSeries.parciales > 0 || resumenQSeries.noDisponibles > 0)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2257:            ? { etiqueta: "Parcial", color: "#f59e0b" }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2258:            : resumenQSeries.publicados > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2259:            ? { etiqueta: "Disponible", color: "#16a34a" }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2260:            : { etiqueta: "No disponible", color: "#64748b" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2261:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2262:        return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2263:          <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2264:            style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2265:              border: `1px solid ${estadoQSeries.color}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2266:              borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2267:              padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2268:              margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2269:              background: "rgba(15, 23, 42, 0.55)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2270:            }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2271:          >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2272:            <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2273:              Panel diagnóstico qSeries
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2274:            </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2275:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2276:            <div style={{ ...estilos.muted, marginBottom: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2277:              Lectura no invasiva de disponibilidad de series Q(t). No calcula De, W50, W25, pendientes ni asimetría.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2278:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2279:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2280:            <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2281:              style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2282:                display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2283:                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2284:                gap: 8
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2285:              }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2286:            >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2287:              <div><strong>Estado:</strong> <span style={{ color: estadoQSeries.color }}>{estadoQSeries.etiqueta}</span></div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2288:              <div><strong>Total:</strong> {resumenQSeries.total}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2289:              <div><strong>Publicados:</strong> {resumenQSeries.publicados}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2290:              <div><strong>Parciales:</strong> {resumenQSeries.parciales}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2291:              <div><strong>No disponibles:</strong> {resumenQSeries.noDisponibles}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2292:              <div><strong>Inconsistentes:</strong> {resumenQSeries.inconsistentes}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2293:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2294:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2295:            <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2296:              style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2297:                marginTop: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2298:                padding: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2299:                borderRadius: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2300:                border: "1px solid rgba(148, 163, 184, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2301:                background: "rgba(15, 23, 42, 0.45)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2302:              }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2303:            >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2304:              <strong>Dictamen operativo:</strong> las series Q(t) no están publicadas para los métodos evaluados. No procede calcular métricas morfológicas de forma hasta publicar qSeries reales o normalizadas por 
método.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2305:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2306:            <div style={{ ...estilos.muted, marginTop: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2307:              Este panel no muestra qSeries cruda y no modifica Qp, Tp, Volumen ni Q(t).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2308:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2309:          </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2310:        );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2311:      })()}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2312:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2313:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2314:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2315:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2316:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2317:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2318:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2319:



## Evidencia en HidroFlow.jsx


> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1:import { CUENCA_DEFAULT_ID, getCuencaById } from "./data/cuencasCatalogo";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3:import { useState, useMemo, useCallback, useRef, useEffect } from "react";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:4:import { getTrState, subscribeTr } from "./agents/trAgent";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:5:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:6:import {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:7:  LineChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:8:  Line,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:9:  AreaChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:10:  Area,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:11:  BarChart,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:38:} from "./services/hidroEngine";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:39:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:40:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:41:// HIDROFLOW v3.1 — Arquitectura Senior · GT-AS-004 · EPM 2025 · SIATA
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:42:// Motor: Clark IUH · W&H · Snyder · SCS Mod. · Huff · Convolución completa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:43:// Módulos: Ponderación estaciones (IDW/Thiessen/Altitudinal/Compuesto) + SIATA
  01_APP\HIDROFLOW\src\HidroFlow.jsx:44:// Exportación: PDF (html2canvas+jsPDF) · Excel (SheetJS)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:45:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:46:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:47:// ─── PALETA Y CONSTANTES ─────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:48:const C = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:49:  bg:"#07090F", panel:"#0B0F1A", card:"#0F1624",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:50:  border:"#18253A", border2:"#1F2F45",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:51:  accent:"#00C8FF",  accent2:"#00F5A0",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:52:  accent3:"#FF5E3A", accent4:"#9B59FF",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:115:// Q1: lluvia concentrada en primer 25% del tiempo (convectiva)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:116:// Q2: lluvia concentrada 25-50% del tiempo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:117:// Q3: lluvia concentrada 50-75% del tiempo  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:118:// Q4: lluvia distribuida en último 25% del tiempo (frontal)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:119:const HUFF_DATA = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:120:  Q1: [{T:0,P:0},{T:5,P:16.0},{T:10,P:33.0},{T:15,P:43.0},{T:20,P:52.0},{T:25,P:60.0},{T:30,P:66.0},{T:35,P:71.0},{T:40,P:75.5},{T:45,P:79.5},{T:50,P:83.0},{T:55,P:86.0},{T:60,P:88.5},{T:65,P:90.5},{T:70,P:92.5},{T:75,P:94.0},{T:80,P:95.5}
,{T:85,P:96.8},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:121:  Q2: [{T:0,P:0},{T:5,P:5.0},{T:10,P:10.0},{T:15,P:15.5},{T:20,P:21.5},{T:25,P:28.0},{T:30,P:38.0},{T:35,P:48.0},{T:40,P:57.0},{T:45,P:65.0},{T:50,P:72.0},{T:55,P:78.0},{T:60,P:83.0},{T:65,P:87.0},{T:70,P:90.5},{T:75,P:93.0},{T:80,P:95.0},
{T:85,P:96.7},{T:90,P:97.8},{T:95,P:98.8},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:122:  Q3: [{T:0,P:0},{T:5,P:4.0},{T:10,P:7.5},{T:15,P:11.5},{T:20,P:15.5},{T:25,P:19.5},{T:30,P:24.5},{T:35,P:30.0},{T:40,P:37.0},{T:45,P:46.0},{T:50,P:56.0},{T:55,P:64.0},{T:60,P:71.0},{T:65,P:77.5},{T:70,P:83.0},{T:75,P:87.0},{T:80,P:91.0},{
T:85,P:93.5},{T:90,P:95.5},{T:95,P:97.5},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:123:  Q4: [{T:0,P:0},{T:5,P:3.0},{T:10,P:5.5},{T:15,P:8.5},{T:20,P:11.5},{T:25,P:14.5},{T:30,P:18.0},{T:35,P:22.0},{T:40,P:26.5},{T:45,P:31.0},{T:50,P:36.5},{T:55,P:43.5},{T:60,P:52.0},{T:65,P:61.0},{T:70,P:70.5},{T:75,P:78.0},{T:80,P:84.5},{T
:85,P:89.5},{T:90,P:93.5},{T:95,P:97.0},{T:100,P:100}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:124:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:125:// Unificar datos Huff en tabla comparativa
  01_APP\HIDROFLOW\src\HidroFlow.jsx:126:const HUFF_MERGED = DIST_TEMPORAL_Q1.map((r,i)=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:127:  T:r.T, EPM_Q1:r.P,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:128:  Huff_Q1:HUFF_DATA.Q1[i]?.P, Huff_Q2:HUFF_DATA.Q2[i]?.P,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:129:  Huff_Q3:HUFF_DATA.Q3[i]?.P, Huff_Q4:HUFF_DATA.Q4[i]?.P,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:130:}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:131:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:132:// Interpolación lineal en tabla de distribución
  01_APP\HIDROFLOW\src\HidroFlow.jsx:133:function interpDist(table, tPct){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:134:  if(tPct<=0) return 0; if(tPct>=100) return 100;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:135:  const lo=table.filter(r=>r.T<=tPct).pop()||table[0];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:136:  const hi=table.filter(r=>r.T>=tPct)[0]||table[table.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:137:  if(lo.T===hi.T) return lo.P;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:138:  return lo.P+(hi.P-lo.P)*(tPct-lo.T)/(hi.T-lo.T);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:139:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:140:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:141:// ─── GENERACIÓN DE HIETOGRAMA ─────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:142:// Método: Distribución temporal adimensional (GT-AS-004 §3.3 o Huff)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:143:// Retorna: {data:[{t,tPct,pAcum,pIncrem,iBloque}], Ptotal}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:144:function calcHietograma(est, Tr, dur_h, dt_min, distType="EPM_Q1"){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:145:  const Ptotal = idfI(est, dur_h*60, Tr) * dur_h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:146:  const steps  = Math.round(dur_h*60/dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:147:  const distTable = distType==="EPM_Q1" ? DIST_TEMPORAL_Q1
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:148:    : distType==="Huff_Q1" ? HUFF_DATA.Q1
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:149:    : distType==="Huff_Q2" ? HUFF_DATA.Q2
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:150:    : distType==="Huff_Q3" ? HUFF_DATA.Q3
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:151:    : HUFF_DATA.Q4;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:152:  const data=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:153:  for(let i=0;i<=steps;i++){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:154:    const tPct=(i/steps)*100;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:155:    const pPct= distType==="EPM_Q1" ? distPolyQ1(tPct) : interpDist(distTable,tPct);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:156:    data.push({t:+(i*dt_min).toFixed(1), tPct:+tPct.toFixed(1), pAcum:+(pPct/100*Ptotal).toFixed(3)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:157:  }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:158:  for(let i=1;i<data.length;i++){
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:159:    data[i].pIncrem=+(data[i].pAcum-data[i-1].pAcum).toFixed(4);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:160:    data[i].iBloque=+(data[i].pIncrem/(dt_min/60)).toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:161:  }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:162:  data[0].pIncrem=0; data[0].iBloque=0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:163:  return {data, Ptotal:+Ptotal.toFixed(2), steps, dur_h, dt_min, Tr, distType};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:164:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:165:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:166:// ─── CN & PÉRDIDAS SCS ────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:167:// ── CN dinámico real (castellano) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:168:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:169:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:170:// ─── CONVOLUCIÓN NUMÉRICA COMPLETA ───────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:171:// Convolución discreta: Q(t) = Σ Pe(j)·UH(t-j)  ← núcleo del motor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:172:function convolucion(uh_ord, pe_list, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:173:  const nOut=pe_list.length+uh_ord.length+4;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:174:  const Q=new Array(nOut).fill(0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:175:  pe_list.forEach((pe,j)=>uh_ord.forEach((u,k)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:176:    if(j+k<nOut) Q[j+k]+=pe*u;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:178:  return Q.map((q,i)=>({t:+(i*dt_min).toFixed(2),Q:+Math.max(q,0).toFixed(6)}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:179:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:180:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:181:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// HIDROGRAMAS UNITARIOS SINTÉTICOS — 4 MÉTODOS
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:184:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:185:function normalizarHUaMm(uh, areaKm2, dt_min) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:186:  const volumenObjetivo = areaKm2 * 1000;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:187:  const volumenUH = (uh || []).reduce(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:188:    (suma, q) => suma + Number(q || 0) * (dt_min * 60),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:189:    0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:190:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:191:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:192:  if (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:210:    qp: +Math.max(...uhNormalizado).toFixed(7),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:211:    factor
  01_APP\HIDROFLOW\src\HidroFlow.jsx:212:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:213:}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:214:// ① HU SCS (Chow et al., 1994 — GT-AS-004 §3.5)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:215:function calcHUSCS(area, tc_h, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:216:  const dh=dt_min/60, tp=0.5*dh+0.6*tc_h, qp=2.08*area/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:217:  const n=Math.ceil(2.67*tp/dh)+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:218:  const uh=Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:219:    const t=i*dh, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:220:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:233:    const t=i*dh, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:234:    return +( tr<=1 ? qp*Math.pow(tr,2.208) : qp*Math.exp(-1.3*(tr-1)) ).toFixed(7);
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:246:  const W75=440/Math.pow(qp/area_mi2,1.08);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:247:  const n=Math.ceil(5*(tp+tlag)/(dt_min/60))+12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:248:  const uh=Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:249:    const t=i*dt_min/60, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:250:    return +(tr<=1?qp*Math.pow(tr,2.5):qp*Math.exp(-2.0*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:251:  });
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:270:    const t=i*dt_min/60, tr=t/tp;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:271:    return +(tr<=1?qp*Math.pow(tr,2.208):qp*Math.exp(-1.25*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:272:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:273:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:274:  return{tp,qp:normalizado.qp,tc_h,Tc:tc_h*60,Ss,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Williams & Hann",color:C.gold}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:275:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:276:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:277:// ④b CLARK IUH (Clark, 1945) — Hidrograma Unitario Instantáneo
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:278:// IUH de Clark: u(t) = qp·exp(-t/R) para t>tp, crecida lineal hasta tp
  01_APP\HIDROFLOW\src\HidroFlow.jsx:279:// Parámetros: tc (tiempo concentración), R (coef. almacenamiento cuenca)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:280:// R = k_R * tc  (típico k_R = 0.5–2.0, default 1.2)
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:281:function calcClarkIUH(area, tc_h, dt_min, kR=1.2){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:282:  const dh   = dt_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:283:  const R    = kR * tc_h;  // coeficiente almacenamiento
  01_APP\HIDROFLOW\src\HidroFlow.jsx:284:  const qp   = 2.08*area/tc_h;  // caudal pico IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:285:  const n    = Math.ceil((tc_h + 6*R)/dh) + 12;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:286:  const uh   = Array.from({length:n},(_,i)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:287:    const t = i*dh;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:288:    // Antes de tc: crecida lineal; después: recesión exponencial
  01_APP\HIDROFLOW\src\HidroFlow.jsx:289:    const u = t<=tc_h ? qp*(t/tc_h) : qp*Math.exp(-(t-tc_h)/R);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:290:    return +Math.max(u,0).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:291:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:292:  const tp   = tc_h;  // tiempo al pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:293:  const normalizado = normalizarHUaMm(uh, area, dt_min);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:294:  return{tp,qp:normalizado.qp,tc_h,R,kR,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Clark IUH",color:C.accent4}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:295:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:296:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:297:// ─── HIDROGRAMA COMPLETO (hietograma → convolución → Q(t)) ───────────────────
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:310:    color:uh_struct.metadata.color};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:311:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:312:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:313:// ─── FUNCIONES AUXILIARES ────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:314:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:315:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:316:// Volumen de almacenamiento SAR (GT-AS-004 §3.8)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:317:function calcVolSAR(qPost, qPre, dt_min){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:318:  const n=Math.min(qPost.length,qPre.length);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:319:  let volAcum=0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:320:  const exc=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:323:    if(diff>0) volAcum+=diff*dt_min*60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:324:    exc.push({t:qPost[i].t, Qpost:+qPost[i].Q.toFixed(5), Qpre:+(qPre[i]?.Q||0).toFixed(5),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:325:      exceso:+Math.max(diff,0).toFixed(5), volAcum:+volAcum.toFixed(1)});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:326:  }
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:327:  return{excesos:exc, volTotal:+volAcum.toFixed(1)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:328:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:329:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:330:// Resumen racional
  01_APP\HIDROFLOW\src\HidroFlow.jsx:331:function calcRacional(est,area,tc_min,CN){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:332:  const S=25400/CN-254,Ia=0.2*S;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:333:  return TR_LIST.map(Tr=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:334:    const I=idfI(est,tc_min,Tr),P=I*tc_min/60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:335:    const Pe=P>Ia?Math.pow(P-Ia,2)/(P-Ia+S):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:336:    const Cc=P>0?Math.min(Pe/P,1):0.3;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:337:    return{Tr,I:+I.toFixed(2),P:+P.toFixed(2),C:+Cc.toFixed(4),Q:+((Cc*I*area)/3.6).toFixed(3)};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:341:function buildResumenQ(params, est, dtMin, CNact) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:342:  const tcList = calcTc(params).filter(r => isFinite(r.h) && r.h > 0);
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:354:      const hiet = calcHietograma(est, Tr, 3, dtMin, 'EPM_Q1');
  01_APP\HIDROFLOW\src\HidroFlow.jsx:355:      const Pe   = calcLluviaEfectiva(hiet, CNact);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:356:      const HU   = m.make();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:357:      const H    = calcHidroCompleto(Pe, HU, dtMin);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:358:      row[Tr]    = +H.Qpico.toFixed(3);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:359:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:360:    return row;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:361:  });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:362:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:363:// ─── EXPORTACIÓN EXCEL (SheetJS) ─────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:364:async function exportarExcel(datos){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:365:  const XLSX = await import("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js").catch(()=>null);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:366:  if(!XLSX) return alert("Error cargando SheetJS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:367:  const WX = XLSX.default || XLSX;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:368:  const wb = WX.utils.book_new();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:395:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:396:  // Hoja 2: Hietograma
  01_APP\HIDROFLOW\src\HidroFlow.jsx:397:  if(datos.hiet){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:398:    const rows=[["t (min)","T (%)","P acum (mm)","P increm (mm)","i bloque (mm/h)"]];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:399:    datos.hiet.data.forEach(r=>rows.push([r.t,r.tPct,r.pAcum,r.pIncrem||0,r.iBloque||0]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:400:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Hietograma");
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:417:    const rows=[["t (min)","Q post (m³/s)","Q pre (m³/s)","Exceso (m³/s)","Vol. Acum. (m³)"]];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:418:    datos.volSAR.excesos.filter((_,i)=>i%Math.max(1,Math.floor(datos.volSAR.excesos.length/500))===0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:419:      .forEach(r=>rows.push([r.t,r.Qpost,r.Qpre,r.exceso,r.volAcum]));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:420:    WX.utils.book_append_sheet(wb,WX.utils.aoa_to_sheet(rows),"Vol_SAR");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:421:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:422:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:439:    ]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:440:    const html2canvas=h2c.default||h2c;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:441:    const {jsPDF}=jsPDF_mod.default||jsPDF_mod;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:442:    const canvas=await html2canvas(refEl,{scale:1.5,backgroundColor:"#07090F",useCORS:true});
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:443:    const imgData=canvas.toDataURL("image/jpeg",0.92);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:444:    const pdf=new jsPDF({orientation:"landscape",unit:"mm",format:"a3"});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:445:    const pw=pdf.internal.pageSize.getWidth();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:446:    const ph=pdf.internal.pageSize.getHeight();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:447:    const ratio=Math.min(pw/canvas.width,ph/canvas.height)*0.95;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:448:    const iw=canvas.width*ratio, ih=canvas.height*ratio;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:449:    pdf.addImage(imgData,"JPEG",(pw-iw)/2,(ph-ih)/2,iw,ih);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:450:    pdf.save(`HidroFlow_${datos.nombre_cuenca}_Tr${datos.Tr}a.pdf`);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:451:  }catch(e){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:452:    console.error("PDF export error:",e);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:453:    alert("Error exportando PDF. Verifique conexión para cargar librerías.");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:454:  }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:455:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:456:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:457:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:458:// COMPONENTES UI
  01_APP\HIDROFLOW\src\HidroFlow.jsx:459:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1116:  // Normalizaciones (evitan NaN/undefined)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1117:  const amcSel = params?.amcActual ?? "II";
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1118:  const pctImp = Number.isFinite(params?.porcentajeImpermeable)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1119:    ? params.porcentajeImpermeable
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1120:    : 60; // ← unifica default con ModHidrogramas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1121:  const cnBase = Number.isFinite(params?.cnBase)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1122:    ? params.cnBase
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1123:    : (Number.isFinite(params?.CN) ? params.CN : 75);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1124:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1125:  // Estado local para el slider (evita flood al arrastrar)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1126:  const [pctLive, setPctLive] = useState(pctImp);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1127:  useEffect(() => { setPctLive(pctImp); }, [pctImp]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1128:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1129:  // Commit del % Impermeable (al soltar / perder foco)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1130:  const commitPct = useCallback((v) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1226:  const set     = k => v => setParams(p => ({ ...p, [k]: v }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1227:  const tcStats = tc.filter(r => isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1228:  const tcMed   = tcStats.length ? tcStats.reduce((s, r) => s + r.h, 0) / tcStats.length : 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1229:  
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1230:  // Persistir Tc medio (min) en params para otros módulos (Hietogramas, Hidrogramas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1231:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1232:    if (!isFinite(tcMed) || tcMed <= 0) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1233:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1234:    const tcMedMin = tcMed * 60; // horas → minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1235:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1236:    if (params.tcMedMin === tcMedMin) return;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1237:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1238:    setParams(p => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1239:     ...p,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1240:     tcMedMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1346:// MÓDULO IDF — Curvas Intensidad-Duración-Frecuencia
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1347:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1348:function ModIDF({est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1349:  const DURS=[5,10,15,20,30,45,60,90,120,180,240,360];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1350:  const idfData=useMemo(()=>DURS.map(d=>({d,...Object.fromEntries(TR_LIST.map(T=>[`Tr${T}`,+idfI(est,d,T).toFixed(2)]))})),[est]);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1351:  const curvasData=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1352:    const pts=[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1353:    for(let d=5;d<=360;d+=5){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1354:      const row={d};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1355:      TR_LIST.forEach(T=>row[`Tr${T}`]=+idfI(est,d,T).toFixed(2));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1356:      pts.push(row);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1357:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1358:    return pts;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1359:  },[est]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1360:  // Comparativa 20 estaciones a d=30min, Tr=100a
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1361:  const compData=useMemo(()=>Object.entries(ESTACIONES_EPM).map(([n,e])=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1362:    est:n.length>12?n.substring(0,12)+"…":n,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1363:    I100:+idfI(e,30,100).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1364:    fuente:e.fuente,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1365:  })).sort((a,b)=>b.I100-a.I100),[]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1366:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1367:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1368:    <SectionHeader icon="⌁" title="Curvas IDF — 20 Estaciones EPM 2025" sub={`I = k/(c+d)ⁿ · d en horas · c = 0.4 · Gumbel · 2000–2023`} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1369:    <div style={{background:`${C.accent2}08`,border:`1px solid ${C.accent2}20`,borderRadius:10,padding:"10px 15px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1370:      <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1371:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.08em"}}>Estación activa · {est.fuente==="PDF"?"✓ Calibrada PDF EPM 5/11/2024":"~ Referencia estimada"}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1381:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1382:    <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1383:      <Card title={`Curvas IDF — ${name}`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1384:        <ResponsiveContainer width="100%" height={280}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1385:          <LineChart data={curvasData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1386:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1387:            <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1388:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1389:            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" mm/h",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1390:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1391:            {TR_LIST.map((T,i)=><Line key={T} type="monotone" dataKey={`Tr${T}`} stroke={CC[i]} strokeWidth={1.8} dot={false} name={`Tr=${T}a`}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1392:          </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1393:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1394:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1395:      <Card title="Tabla IDF — Intensidades (mm/h)" accent={C.accent3}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1396:        <Tbl headers={["d(min)",...TR_LIST.map(T=>`Tr=${T}a`)]} rows={idfData.map(r=>({d:r.d,...Object.fromEntries(TR_LIST.map(T=>[T,r[`Tr${T}`]]))}))} hiCols={[6]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1397:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1398:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1399:    <Card title="Comparativa 20 Estaciones — I(d=30min, Tr=100a)" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1400:      <ResponsiveContainer width="100%" height={220}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1401:        <BarChart data={compData} margin={{left:0,right:14,top:8,bottom:44}} layout="vertical">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1402:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1403:          <XAxis type="number" tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",position:"insideBottom",offset:-8,fill:C.muted,fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1404:          <YAxis type="category" dataKey="est" tick={{fill:C.muted,fontSize:8}} width={90}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1405:          <Tooltip contentStyle={TT} formatter={v=>[v+" mm/h","I"]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1406:          <Bar dataKey="I100" radius={[0,3,3,0]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1407:            fill={C.accent3}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1408:            label={{position:"right",fill:C.muted2,fontSize:8,formatter:v=>v}}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1409:          />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1410:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1411:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1412:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1413:    <Card title="Parámetros k · n · c — Todos los Tr" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1414:      <Tbl headers={["Tr (años)","k","n","c","I(10min)","I(30min)","I(60min)","I(120min)"]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1415:        
rows={TR_LIST.map(T=>{const{k,n,c}=est.params[String(T)]||{k:0,n:1,c:0.4};return{T,k:+k.toFixed(4),n:+n.toFixed(4),c,I10:+idfI(est,10,T).toFixed(2),I30:+idfI(est,30,T).toFixed(2),I60:+idfI(est,60,T).toFixed(2),I120:+idfI(est,120,T).toFixed(2)};})}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1416:        hiCols={[4]} accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1438:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1439:  // Hietogramas comparativos de todas las distribuciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1440:  const hietAll = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1441:    const types = ["EPM_Q1", "Huff_Q1", "Huff_Q2", "Huff_Q3", "Huff_Q4"];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1442:    return types.map(tp => ({ tp, data: calcHietograma(est, Tr, durH, dtMin, tp) }));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1443:  }, [est, Tr, durH, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1444:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1445:  // === Día 3 (MVP) — Orquestación P → Pn → UH → Q(t) ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1446:  // Vector de incrementos (mm por bloque) y Δt
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1447:  const P_mm  = hiet.data.map((r, i, a) => (i === 0 ? 0 : +(r.pAcum - a[i - 1].pAcum).toFixed(5)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1448:  const dt_min = dtMin;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1449:  const A_km2  = Number.isFinite(params?.area) ? params.area : 36.58;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1450:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1451:  // === Tc sugerido desde Panel (geomorfología) — informe amigable ===
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1452:  const tcList = useMemo(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1453:    () => calcTc(params).filter(r => isFinite(r.h) && r.h > 0),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1454:    [params]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1455:  ); // r.min está en minutos
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1456:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1457:  const Tc_sugerido_min = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1495:      .join(" · ");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1496:    return `Tc sugerido = mediana de ${tcList.length} métodos -> ${Tc_sugerido_min.toFixed(1)} min. [${etiquetas}]`;
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1524:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1525:  const amcAuto = useMemo(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1526:    () => (usarAMCauto ? derivarAMCDesdeSIATA(hs_demo) : null),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1527:    [usarAMCauto, hs_demo]
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1528:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1529:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1530:  // AMC efectivo: si AMC auto está activo y no hay override SCS, usamos el derivado
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1531:  const AMC_eff = (usarAMCauto && !overrideSCS && amcAuto?.amcActual) ? amcAuto.amcActual : AMC;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1532:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1533:  // Informe amigable AMC
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1534:  const infoAMC = (usarAMCauto && amcAuto)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1535:    ? `${amcAuto.amcInforme} (Fuente: ${amcAuto.amcFuente})`
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1536:    : `AMC desde panel: ${AMC_panel}`;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1537:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1538:  // Toggle para decidir si persistimos AMC auto en el panel (opt-in)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1539:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1540:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1541:   // Persistir AMC auto en el panel (Preliminares) cuando el toggle está activo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1595:      scale: 2,                   // buena resolución para reportes
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1596:      useCORS: true
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1597:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1598:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1599:    const url = canvas.toDataURL("image/png", 0.95);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1600:    const a = document.createElement("a");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1601:    a.href = url;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1602:    a.download = nombreArchivo;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1603:    a.click();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1604:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1605:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1606:  // Combinar bloques de intensidad para gráfica comparativa
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1607:  const compData = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1608:    const len = hiet.data.length;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1609:    const step = Math.max(1, Math.floor(len / 60));
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1610:    return hiet.data.slice(1).filter((_, i) => i % step === 0).map((r, idx) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1611:      const obj = { t: r.t, EPM_Q1: r.iBloque };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1612:      hietAll.forEach(h => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1613:        const j = Math.min(idx * step + 1, h.data.data.length - 1);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1614:        const match = h.data.data[j];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1615:        if (match) obj[h.tp] = match.iBloque || 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1616:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1617:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1618:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1619:  }, [hiet, hietAll]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1620:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1621:  // Distribuciones adimensionales comparadas
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1622:  const distMerge = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1623:    return Array.from({ length: 21 }, (_, i) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1624:      const T = i * 5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1625:      return {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1626:        T,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1627:        EPM_Q1:  interpDist(DIST_TEMPORAL_Q1, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1628:        Huff_Q1: interpDist(HUFF_DATA.Q1, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1629:        Huff_Q2: interpDist(HUFF_DATA.Q2, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1630:        Huff_Q3: interpDist(HUFF_DATA.Q3, T),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1631:        Huff_Q4: interpDist(HUFF_DATA.Q4, T),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1632:      };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1633:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1634:  }, []);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1635:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1636:  const dispFilt = hiet.data.filter((_, i) => i % Math.max(1, Math.floor(hiet.data.length / 80)) === 0);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1637:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1638:  // ────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1639:  // RENDER
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1640:  // ────────────────────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1641:  return (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1642:    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1643:      <SectionHeader
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1644:        icon="🌧"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1645:        title="Hietogramas de Diseño — Distribución Temporal"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1646:        sub="GT-AS-004 §3.3 · Curvas Huff · 5 distribuciones comparadas"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1674:      {/* KPIs */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1675:      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 9 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1676:        <Kpi value={hiet.Ptotal + " mm"} label="P total" accent={C.accent} sub={`Tr=${Tr}a`} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1677:        <Kpi
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1678:          value={Math.max(...hiet.data.slice(1).map(r => r.iBloque || 0)).toFixed(2) + " mm/h"}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1679:          label="i máxima bloque"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1680:          accent={C.accent3}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1681:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1682:        <Kpi value={(hiet.Ptotal * 0.75).toFixed(1) + " mm"} label="P en 1er quartil" accent={C.accent2} sub="~75% en primeros 25%" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1683:        <Kpi value={`${durH}h · ${dtMin}' · ${hiet.steps}bloq`} label="Configuración" accent={C.muted2} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1684:        <Kpi value={distType.replace("_", " ")} label="Distribución" accent={distType === "EPM_Q1" ? C.accent2 : C.gold} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1685:        <Kpi value={name.length > 12 ? name.substring(0, 12) + "…" : name} label="Estación IDF" accent={C.accent4} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1686:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1687:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1688:      {/* Hietograma de diseño + Parámetros SCS‑CN */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1689:      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1690:        {/* Hietograma de diseño */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1691:        <Card title={`Hietograma — ${distType} · Tr=${Tr}a · d=${durH}h · Δt=${dtMin}min`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1692:          <ResponsiveContainer width="100%" height={260}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1693:            <ComposedChart data={dispFilt.slice(1)} margin={{ left: 0, right: 8, bottom: 14, top: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1694:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1695:              <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1696:                     label={{ value: "t (min)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1697:              <YAxis yAxisId="i" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1698:                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 8 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1699:              <YAxis yAxisId="p" orientation="right" tick={{ fill: C.muted, fontSize: 8 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1700:                     label={{ value: "P acum (mm)", angle: 90, position: "insideRight", fill: C.muted, fontSize: 8 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1701:              <Tooltip contentStyle={TT} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1702:              <Bar  yAxisId="i" dataKey="iBloque" fill={C.accent}  radius={[2, 2, 0, 0]} name="i bloque (mm/h)" opacity={0.85} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1703:              <Line yAxisId="p" type="monotone" dataKey="pAcum"   stroke={C.accent2} strokeWidth={2} dot={false} name="P acum (mm)" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1704:            </ComposedChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1705:          </ResponsiveContainer>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1718:            <label style={{ fontFamily: 'monospace', fontSize: 11, color: C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1719:              <input type="checkbox" checked={usarOverrideTc} onChange={e => setUsarOverrideTc(e.target.checked)} /> Override Tc
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1720:            </label>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1721:            <label style={{ fontFamily:'monospace', fontSize:11, color:C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1722:              <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1723:               type="checkbox"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1731:          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1732:            {/* CN */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1733:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1734:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>CN (CNII)</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1735:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1736:                <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1737:                  type="number" min={30} max={98} step={0.1} value={CN_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1738:                  onChange={e => setCN_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1739:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1740:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1741:              ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1742:                <Kpi value={CN.toFixed(1)} label="CN" accent={C.accent2} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1743:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1744:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1745:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1746:            {/* AMC */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1747:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1748:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>AMC</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1749:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1750:                <select
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1751:                  value={AMC_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1752:                  onChange={e => setAMC_ovr(e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1753:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1754:                >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1755:                  <option value="I">AMC I</option>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1756:                  <option value="II">AMC II</option>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1757:                  <option value="III">AMC III</option>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1758:                </select>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1759:              ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1763:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1764:            {/* % Impermeable */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1765:            <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1766:              <label style={{ display: 'block', marginBottom: 6, fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>% Impermeable</label>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1767:              {overrideSCS ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1768:                <input
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1769:                  type="number" min={0} max={100} step={1} value={pctImp_ovr}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1770:                  onChange={e => setPctImp_ovr(+e.target.value)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1771:                  style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${C.border}`, background: C.bg, color: C.text }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1772:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1773:              ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1774:                <Kpi value={`${pctImperv}%`} label="% Imperv" accent={C.accent} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1775:              )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1776:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1777:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1796:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1797:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1798:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1799:          {/* Informes */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1800:          <div style={{ marginTop: 10, fontFamily: 'monospace', fontSize: 11, color: scsAviso.length ? C.rose : C.muted }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1801:            {infoTc}{scsAviso.length ? ` · Aviso: ${scsAviso.join(" · ")}` : ""}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1802:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1803:          {usarAMCauto && amcAuto && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1804:            <div style={{ marginTop: 6, fontFamily: 'monospace', fontSize: 11, color: C.muted2 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1805:              {infoAMC}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1806:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1807:          )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1808:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1809:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1810:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1811:      {/* ===== Hidrograma Q(t) — Usa hook useHidrograma con valores efectivos ===== */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1822:      {/* Distribuciones temporales comparadas */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1823:      <Card title="Distribuciones Temporales Comparadas — Adimensional" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1824:        <div ref={refContenedorDistribuciones} style={{ width: "100%", height: 260 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1825:          <ResponsiveContainer width="100%" height="100%">
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1826:            <LineChart data={distMerge} margin={{ left: 0, right: 14, bottom: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1827:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1828:              <XAxis dataKey="T" tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1829:                     label={{ value: "Tiempo (%)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1830:              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1831:                     label={{ value: "P acum (%)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1832:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(1) + "%"]} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1833:              <Legend wrapperStyle={{ fontSize: 9 }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1834:              <Line type="monotone" dataKey="EPM_Q1"  stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1835:              <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1836:              <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q2" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1837:              <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q3" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1838:              <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4}  strokeWidth={1.8} strokeDasharray="6 2" dot={false} name="Huff Q4" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1839:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1840:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1841:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1842:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1843:        {/* Botón Exportar PNG */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1844:        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1845:          <button
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1846:            className="btn"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1847:            onClick={() => exportarPNGDesdeRef(refContenedorDistribuciones, "Distribuciones_Adimensional.png")}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1848:          >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1854:      {/* Intensidades por bloque — Comparativa Distribuciones (Tr activo) */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1855:      <Card title="Intensidades por Bloque — Comparativa Distribuciones (Tr activo)" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1856:        <div ref={refContenedorIntensidades} style={{ width: "100%", height: 220 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1857:          <ResponsiveContainer width="100%" height="100%">
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1858:            <LineChart data={compData} margin={{ left: 0, right: 18, bottom: 14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1859:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1860:              <XAxis dataKey="t" tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1861:                     label={{ value: "t (min)", position: "insideBottom", offset: -6, fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1862:              <YAxis tick={{ fill: C.muted, fontSize: 9 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1863:                     label={{ value: "i (mm/h)", angle: -90, position: "insideLeft", fill: C.muted, fontSize: 9 }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1864:              <Tooltip contentStyle={TT} formatter={v => [Number(v).toFixed(2) + " mm/h"]} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1865:              <Legend wrapperStyle={{ fontSize: 9 }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1866:              <Line type="monotone" dataKey="EPM_Q1"  stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1867:              <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q1" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1868:              <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q2" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1869:              <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q3" />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1870:              <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4}  strokeWidth={1.5} strokeDasharray="5 2" dot={false} name="Huff Q4" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1871:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1872:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1873:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1874:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1875:        {/* Botón Exportar PNG */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1876:        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1877:          <button
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1878:            className="btn"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1879:            onClick={() => exportarPNGDesdeRef(refContenedorIntensidades, "Intensidades_Bloque.png")}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1880:          >
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1886:      {/* Tabla hietograma estructurada */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1887:      <Card title={`Tabla Hietograma Estructurada — ${distType} · Tr=${Tr}a · P_total=${hiet.Ptotal}mm`} accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1888:        <Tbl
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1889:          headers={["t (min)", "T (%)", "P acum (mm)", "ΔP (mm)", "i bloque (mm/h)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1890:          rows={hiet.data
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1891:            .slice(1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1892:            .filter((_, i) => i % Math.max(1, Math.floor(hiet.steps / 40)) === 0)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1893:            .map(r => ({ t: r.t, T: r.tPct, P: r.pAcum, dP: r.pIncrem, i: r.iBloque }))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1894:          hiCols={[3, 4]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1895:          accent={C.accent}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1896:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1897:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1898:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1899:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1900:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1901:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1902:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1903:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1904:// MÓDULO HIDROGRAMAS — 5 Métodos con convolución completa (robusto para gráficas)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1905:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1906:function ModHidrogramas({ params, est, name, onContextoComparador }) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1907:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1908:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1909:  // Evita crash por referencias residuales a guardarAMCenPanel
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1910:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1911:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1912:  // ── Controles superiores
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1913:  const [Tr, setTr]       = useState(25);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1914:  const [dtMin, setDtMin] = useState(() => +params.dt || 5);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1915:  // --- DEBUG: blindaje temporal ---
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1916:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1939:  }, [params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1940:
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1951:  const tc_min = tc_h * 60;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1952:  
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1953:  const area_mi2 = params.area * 0.386102;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1954:  const L_mi     = params.longitud_cauce * 0.621371;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1955:  const S_m_km   = (params.cota_mayor_cauce - params.cota_menor_cauce) / params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1956:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1960:  // ── Lluvia efectiva con CN efectivo
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1961:  const lluvEfect = useMemo(() => calcLluviaEfectiva(hiet, CNact), [hiet, CNact]);
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1991:    return Number.isFinite(n) ? n : null;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1992:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1993:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1994:  const obtenerSerie = (h) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1995:  if (Array.isArray(h?.serie)) return h.serie;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1996:  if (Array.isArray(h?.hidrograma)) return h.hidrograma;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:1997:  if (Array.isArray(h?.data)) return h.data;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1998:  if (Array.isArray(h?.puntos)) return h.puntos;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:1999:  if (Array.isArray(h?.qt)) return h.qt;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2000:  if (Array.isArray(h?.Q_t)) return h.Q_t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2001:  if (Array.isArray(h?.valores)) return h.valores;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2002:  if (Array.isArray(h)) return h;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2003:  return [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2004:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2005:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2006:  const leerQ = (punto) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2007:  if (Array.isArray(punto)) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2039:    ) ?? indice * dtMin
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2040:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2041:};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2042:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2043:  const calcularDesdeSerie = (h) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2044:    const serie = obtenerSerie(h);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2045:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2046:    if (!Array.isArray(serie) || serie.length === 0) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2047:      return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2048:        QpSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2049:        TpSerie: null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2050:        volumenSerie: null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2051:        puntos: null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2052:      };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2053:    }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2054:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2055:    let QpSerie = null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2056:    let TpSerie = null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2057:    let volumenSerie = 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2058:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2059:    serie.forEach((punto, indice) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2060:      const q = leerQ(punto);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2061:      const t = leerT(punto, indice);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2062:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2063:      if (q !== null && (QpSerie === null || q > QpSerie)) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2064:        QpSerie = q;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2065:        TpSerie = t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2066:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2067:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2068:      if (indice > 0) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2069:        const q0 = leerQ(serie[indice - 1]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2070:        const q1 = q;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2071:        const t0 = leerT(serie[indice - 1], indice - 1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2072:        const t1 = t;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2073:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2074:        if (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2075:          q0 !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2076:          q1 !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2077:          Number.isFinite(t0) &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2078:          Number.isFinite(t1)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2079:        ) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2080:          volumenSerie += ((q0 + q1) / 2) * ((t1 - t0) * 60);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2081:        }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2082:      }
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2083:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2084:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2085:    return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2086:      QpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2087:      TpSerie,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2088:      volumenSerie: volumenSerie > 0 ? volumenSerie : null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2089:      puntos: serie.length,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2090:    };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2091:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2092:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2093:  const hidrogramasResumen = Array.isArray(hidros)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2094:    ? hidros.map((h, i) => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2095:        const calculado = calcularDesdeSerie(h);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2096:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2097:        const QpDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2098:  h?.Qpico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2099:    h?.Qp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2100:    h?.qp ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2101:    h?.q_pico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2102:    h?.caudalPico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2103:    h?.caudal_pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2104:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2105:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2106:        const TpDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2107:  h?.tPico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2108:    h?.Tp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2109:    h?.tp ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2110:    h?.t_pico ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2111:    h?.tiempoPico ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2112:    h?.tiempo_pico
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2113:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2114:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2115:        const volumenDirecto = numeroValido(
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2116:  h?.volTotal ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2117:    h?.volumen ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2118:    h?.V ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2119:    h?.vol ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2120:    h?.volume
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2121:);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2122:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2123:        return {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2124:          metodo: nombresHidrogramas[i] ?? `Método ${i + 1}`,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2125:          Qp:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2126:            QpDirecto && QpDirecto > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2127:              ? QpDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2128:              : calculado.QpSerie,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2129:          Tp:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2130:            TpDirecto && TpDirecto > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2131:              ? TpDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2132:              : calculado.TpSerie,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2133:          volumen:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2134:            volumenDirecto && volumenDirecto > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2135:              ? volumenDirecto
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2136:              : calculado.volumenSerie,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2137:          puntos: calculado.puntos,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2138:        };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2139:      })
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2140:    : [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2141:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2142:    
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2143:  const valoresLluviaEfectivaMm = Array.isArray(lluvEfect)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2144:    ? lluvEfect
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2145:        .map((valor) =>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2146:          Number(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2166:    maxLluviaEfectivaMm > 0 &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2167:    sumaLluviaEfectivaMm / maxLluviaEfectivaMm > 3
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2168:      ? maxLluviaEfectivaMm
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2169:      : sumaLluviaEfectivaMm || null;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2170:  const hidrogramasQ5Exportables = (hidros || []).map((h) => ({
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2171:    metodo: h?.metodo ?? "Método Q-5",
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:        const siguienteContexto = {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:          ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:          fuente: "motor HidroFlow",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:          area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2198:        // OT-0056C4 refresca Q-Tr activo con Pe total sin recalcular caudales.
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2210:                  previo?.estacionIDF ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2211:                  previo?.estacion ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2212:                  previo?.nombre_estacion ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2213:                  previo?.idf?.nombre ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2214:                  previo?.idf?.estacion ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2215:                  null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2264:    if (import.meta.env.DEV) console.log('[HIDRO] etiquetas hidros:', (hidros ?? []).map(h => h.metodo));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2265:  }, [hidros]);
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2317:    return whAliases.some(a => t.includes(a));
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2329:  const lePe = useMemo(() => lluvEfect.reduce((s, r) => s + (r.PeIncrem || 0), 0), [lluvEfect]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2330:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2331:  // ───────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2332:  //  FORTALECER GRÁFICAS: seriesOK, n, step, combined, noData (usa hidrosCorr)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2333:  // ───────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2334:  const seriesOK = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2335:    return (hidrosCorr ?? []).filter(h =>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2336:      Array.isArray(h?.qSeries) && h.qSeries.length > 0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2337:    );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2338:  }, [hidrosCorr]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2339:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2340:  const n = useMemo(() => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2341:    const lens = seriesOK.map(h => h.qSeries.length);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2342:    return lens.length ? Math.max(...lens) : 0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2343:  }, [seriesOK]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2344:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2345:  const step = useMemo(() => (n <= 0 ? 1 : Math.max(1, Math.floor(n / 100))), [n]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2346:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2347:  const combined = useMemo(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2348:    if (n <= 0) return [];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2349:    const L = Math.ceil(n / step);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2350:    const out = Array.from({ length: L }, (_, i) => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2351:      const idx = i * step;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2352:      const obj = { t: +((idx * dtMin) || 0).toFixed(1) };
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2353:      seriesOK.forEach(h => {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2354:        obj[h.metodo] = h.qSeries[idx]?.Q ?? 0; // clave = nombre del método
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2355:      });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2356:      return obj;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2357:    });
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2358:    return out;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2359:  }, [seriesOK, n, step, dtMin]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2360:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2361:  const noData = combined.length === 0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2362:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2363:  // (Opcional) diagnóstico de series en consola
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2364:  useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2365:    if (!import.meta.env.DEV) return;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2366:    console.log('[DEBUG] seriesOK:', seriesOK.map(h => ({ metodo: h.metodo, len: h.qSeries?.length })));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2367:    console.log('[DEBUG] combined len:', combined.length, 'n=', n, 'step=', step);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2368:  }, [seriesOK, combined, n, step]);
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2383:    <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2384:      {/* Encabezado Lluvia Efectiva */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2385:      <Card title={`Lluvia Efectiva — CN=${CNact} → Pe total = ${lePe.toFixed(2)} mm`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2386:        {/* CHIP de trazabilidad */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2387:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2388:          display:'inline-block', margin:'8px 0', padding:'6px 10px',
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2394:          {'  |  '} AMC {params.amcActual ?? 'II'}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2395:          {'  |  '} % Imperv: {params.porcentajeImpermeable ?? 60}%
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2411:         <span className="text-slate-400"> · ruta interna Q(t)</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2412:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2413:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2414:       <div className="text-slate-400">
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2415:         <div style={{ marginTop: 6 }}>Roles Tc en HidroFlow:</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2416:         <div>• Tc global Índice: referencia hidrológica general.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2417:         <div>• Tc operativo Q(t): valor usado por la ruta interna del hidrograma.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2418:         <div>• Duración evento: 3 h para almacenamiento/regulación.</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2419:         <div>• Lag / forma SCS: parámetro derivado para forma temporal del hidrograma.</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2420:         <div>• Tc comparador: referencia especializada para coherencia Q-5.</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2421:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2422:         <div>Escenarios Tc para Q(t):</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2423:         <div>• Operativo Q(t): {tc_min.toFixed(1)} min · activo</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2424:         <div>• Índice global: {Number.isFinite(params?.tcMedMin) ? params.tcMedMin.toFixed(1) : "—"} min · referencia</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2425:         <div>• Comparador: pendiente · referencia especializada</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2426:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2427:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2428:       <div className={qaStatus.amcWarning ? "text-red-400" : "text-blue-400"}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2429:         AMC: {params?.amcActual ?? "N/A"} ({params?.amcFuente ?? "Sin fuente"})
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2430:       </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2441:     </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2442:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2443:      {/* ===== Gráfica Q(t) — Convolución completa (segura) ===== */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2444:      <div style={{ width:'100%', height: 380, border:'1px solid #1F2F45', borderRadius: 10, background:'#0B0F1A' }}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2445:        {noData ? (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2446:          <div style={{height:'100%', display:'flex', alignItems:'center', justifyContent:'center', color: C.muted }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2447:            Sin datos para graficar — verifica hietograma, CN y HU
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2448:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2449:        ) : (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2450:          <ResponsiveContainer width="100%" height="100%">
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2451:            <LineChart data={combined} margin={{ top: 12, right: 24, bottom: 16, left: 8 }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2452:              <CartesianGrid stroke="#223" strokeDasharray="3 3" />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2453:              <XAxis
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2454:                dataKey="t"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2455:                tick={{ fill:'#9AA4B2', fontSize: 11 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2456:                label={{ value:'t (min)', position:'insideBottomRight', offset:-8, fill:'#9AA4B2' }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2457:              />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2458:              <YAxis
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2459:                tick={{ fill:'#9AA4B2', fontSize: 11 }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2460:                label={{ value:'Q (m³/s)', angle:-90, position:'insideLeft', offset: 10, fill:'#9AA4B2' }}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2461:              />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2462:              <Tooltip wrapperStyle={{ background:'#0F1624', border:'1px solid #1F2F45' }} />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2463:              <Legend wrapperStyle={{ color:'#9AA4B2' }} />
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2464:              {seriesOK.map(h => (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2465:                <Line
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2466:                  key={h.metodo}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2467:                  type="monotone"
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2468:                  dataKey={h.metodo}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2469:                  stroke={methodColors[h.metodo] ?? '#8884d8'}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2470:                  strokeWidth={2}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2471:                  dot={false}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2472:                  isAnimationActive={false}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2473:                />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2474:              ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2475:            </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2476:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2477:        )}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2478:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2492:  useEffect(()=>{ if(params.dt&&+params.dt!==dtMin) setDtMin(+params.dt); },[params.dt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2493:  const [siPct,setSiPct]=useState(80);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2494:  const [catSAR,setCatSAR]=useState("Intermedios");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2495:  const [distType,setDistType]=useState("EPM_Q1");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2496:  const [metodoPost,setMetodoPost]=useState("SCS");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2497:  const reportRef=useRef();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2498:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2499:  const TrRec={Menores:2.33,Intermedios:5,Mayores:25};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2500:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2501:  const cnII_post  = +Math.min(cnMixto(siPct),98).toFixed(1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2502:  const cnIII_post = +cnII_to_III(cnII_post).toFixed(2);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2503:  const cnIII_pre  = 93.5;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2504:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2505:  // Hietograma de diseño
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2506:  const hiet=useMemo(()=>calcHietograma(est,Tr,durH,dtMin,distType),[est,Tr,durH,dtMin,distType]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2513:  const S_m_km=(params.cota_mayor_cauce-params.cota_menor_cauce)/params.longitud_cauce;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2514:
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2530:  const dispData=volSAR.excesos.filter((_,i)=>i%step===0).slice(0,140);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2531:  const reduccion=qPost.Qpico>0?(100*(qPost.Qpico-qPre.Qpico)/qPost.Qpico).toFixed(1):0;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2532:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2533:  const exportDatos={
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2534:    nombre_cuenca:params.nombre_cuenca,area:params.area,perimetro:params.perimetro,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2535:    longitud_cauce:params.longitud_cauce,pendiente_cuenca:params.pendiente_cuenca,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2536:    cota_max:params.cota_max,cota_min:params.cota_min,CN:params.CN,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2537:    tc_h,stn:name,Tr,dur_h:durH,distType,dt_min:dtMin,Ptotal:hiet.Ptotal,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2538:    cnPost:cnIII_post,cnPre:cnIII_pre,siPct,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2539:    hiet,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2540:    hidros:[{...qPost,metodo:metodoPost+" POST"},{...qPre,metodo:"SCS PRE"}],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2541:    volSAR,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2542:  };
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2543:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2544:  return(<div style={{display:"flex",flexDirection:"column",gap:14}} ref={reportRef}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2545:    {/* Banner normativo */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2546:    <div style={{background:`linear-gradient(135deg,${C.accent2}0A,${C.accent4}08)`,border:`1px solid ${C.accent2}25`,borderRadius:12,padding:"12px 18px",display:"flex",gap:18,flexWrap:"wrap",alignItems:"center"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2547:      <div style={{flexShrink:0}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2548:        <div style={{fontSize:9,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em"}}>Guía Técnica GT-AS-004 · §3 Diseño Hidrológico · Rev.0 · 2026-01-07</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2549:        <div style={{fontSize:14,fontWeight:800,color:C.accent2}}>Diseño de Sistemas de Almacenamiento y Regulación de Aguas Lluvias</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2550:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2581:      <Card title="% Sup. Impermeable" accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2582:        <BtnGroup options={[20,40,60,80,100].map(s=>({v:s,l:`${s}%`}))} value={siPct} onChange={setSiPct} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2583:        <div style={{marginTop:6,fontSize:9,color:C.muted,fontFamily:mono}}>CNIII post={cnIII_post}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2584:        <div style={{marginTop:2,fontSize:9,color:C.muted,fontFamily:mono}}>Método:</div>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2585:        <BtnGroup options={[{v:"SCS",l:"SCS"},{v:"Clark",l:"Clark"},{v:"Snyder",l:"Snyder"},{v:"WH",l:"W&H"}]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2586:          value={metodoPost} onChange={setMetodoPost} accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2587:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2588:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2589:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2590:    {/* KPIs principales */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2591:    <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2592:      <Kpi value={hiet.Ptotal+" mm"} label="P total diseño" accent={C.accent} sub={`Tr=${Tr}a, d=${durH}h`}/>
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
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2603:      {/* Hietograma de diseño */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2604:      <Card title={`Hietograma SAR — ${distType} · Tr=${Tr}a · d=${durH}h`} accent={C.accent}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2605:        <ResponsiveContainer width="100%" height={230}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2606:          <ComposedChart data={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/50))===0)} margin={{left:0,right:8,bottom:14,top:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2607:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2608:            <XAxis dataKey="t" tick={{fill:C.muted,fontSize:8}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2609:            <YAxis yAxisId="i" tick={{fill:C.muted,fontSize:8}} label={{value:"i (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2610:            <YAxis yAxisId="p" orientation="right" tick={{fill:C.muted,fontSize:8}} label={{value:"P (mm)",angle:90,position:"insideRight",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2611:            <Tooltip contentStyle={TT}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2612:            <Bar yAxisId="i" dataKey="iBloque" fill={C.accent} radius={[2,2,0,0]} name="i (mm/h)" opacity={0.8}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2613:            <Line yAxisId="p" type="monotone" dataKey="pAcum" stroke={C.accent2} strokeWidth={2} dot={false} name="P acum (mm)"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2614:          </ComposedChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2615:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2616:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2617:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2618:      {/* Distribución temporal adimensional */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2619:      <Card title="Distribución Temporal Activa + Comparativa Huff" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2620:        <ResponsiveContainer width="100%" height={230}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2621:          <LineChart data={HUFF_MERGED} margin={{left:0,right:14,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2622:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2623:            <XAxis dataKey="T" tick={{fill:C.muted,fontSize:9}} label={{value:"Tiempo (%)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2624:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"P (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2625:            <Tooltip contentStyle={TT} formatter={v=>[v?.toFixed(1)+"%"]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2626:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2627:            <Line type="monotone" dataKey="EPM_Q1" stroke={C.accent2} strokeWidth={2.5} dot={false} name="EPM Q1 (GT-AS-004)"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2628:            <Line type="monotone" dataKey="Huff_Q1" stroke={C.accent}  strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q1"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2629:            <Line type="monotone" dataKey="Huff_Q2" stroke={C.gold}    strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q2"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2630:            <Line type="monotone" dataKey="Huff_Q3" stroke={C.accent3} strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q3"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2631:            <Line type="monotone" dataKey="Huff_Q4" stroke={C.accent4} strokeWidth={1.2} strokeDasharray="5 3" dot={false} name="Huff Q4"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2632:          </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2633:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2634:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2635:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2636:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2637:    {/* Hidrogramas POST vs PRE */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2638:    <Card title={`Hidrogramas SAR — POST (${metodoPost}, CN=${cnIII_post}) vs PRE (SCS, CN=${cnIII_pre}) · V_SAR=${volSAR.volTotal.toFixed(0)} m³`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2639:      <ResponsiveContainer width="100%" height={290}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2640:        <AreaChart data={dispData} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2641:          <defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2642:            <linearGradient id="gPost" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent3} stopOpacity={0.35}/><stop offset="95%" stopColor={C.accent3} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2643:            <linearGradient id="gPre"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.accent2} stopOpacity={0.25}/><stop offset="95%" stopColor={C.accent2} stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2644:            <linearGradient id="gVol"  x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={C.gold}    stopOpacity={0.20}/><stop offset="95%" stopColor={C.gold}    stopOpacity={0}/></linearGradient>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2645:          </defs>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2646:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2647:          <XAxis dataKey="t" tick={{fill:C.muted,fontSize:9}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2648:          <YAxis yAxisId="q" tick={{fill:C.muted,fontSize:9}} label={{value:"Q (m³/s)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2649:          <YAxis yAxisId="v" orientation="right" tick={{fill:C.muted,fontSize:9}} label={{value:"V acum (m³)",angle:90,position:"insideRight",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2650:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[nm.includes("Vol")?v.toFixed(0)+" m³":v.toFixed(5)+" m³/s",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2651:          <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2652:          <Area yAxisId="q" type="monotone" dataKey="Qpost" stroke={C.accent3} fill="url(#gPost)" strokeWidth={2.5} name={`Q post (${metodoPost})`} dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2653:          <Area yAxisId="q" type="monotone" dataKey="Qpre"  stroke={C.accent2} fill="url(#gPre)"  strokeWidth={2.5} name="Q pre (SCS)" dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2654:          <Area yAxisId="v" type="monotone" dataKey="volAcum" stroke={C.gold} fill="url(#gVol)" strokeWidth={1.5} name="Vol. SAR acum. (m³)" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2655:        </AreaChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2656:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2657:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2658:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2659:    {/* CN y clasificación */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2660:    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2661:      <Card title="CN — GT-AS-004 Tabla 5 (CNIII)" accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2662:        <Tbl headers={["Descripción","SI%","CNII","CNIII"]} rows={[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2663:          {D:"Suelo urbano 100%",S:100,II:98.0,III:+cnII_to_III(98).toFixed(2)},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2664:          {D:`Mixta (${siPct}% imp.)`,S:siPct,II:+cnII_post,III:+cnIII_post},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2680:          ["Categoría SAR",catSAR],["Tr de diseño",`${Tr} años`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2681:          ["Duración lluvia",`${durH} h`],["Distribución",distType.replace("_"," ")],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2682:          ["P total diseño",`${hiet.Ptotal} mm`],["Método HU POST",metodoPost],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2683:          ["CN post (CNIII)",`${cnIII_post} (SI=${siPct}%)`],["CN pre (CNIII)","93.5"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2684:          ["Q pico POST",`${qPost.Qpico.toFixed(4)} m³/s`],["Q pico PRE (reg.)",`${qPre.Qpico.toFixed(4)} m³/s`],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2685:          ["Reducción pico",`${reduccion}%`],["V almacenamiento",`${volSAR.volTotal.toFixed(0)} m³`],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2686:        ].map(([l,v])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2687:          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${C.border}15`,fontFamily:mono,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2688:            <span style={{color:C.muted}}>{l}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2689:            <span style={{color:C.text,fontWeight:600}}>{v}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2690:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2691:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2692:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2693:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2694:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2695:    {/* Tabla hietograma estructurada */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2696:    <Card title={`Hietograma de Diseño SAR — Tabla Estructurada · P_total=${hiet.Ptotal}mm · Tr=${Tr}a`} accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2697:      <Tbl headers={["t (min)","T (%)","P acum (mm)","ΔP (mm)","i bloque (mm/h)","Pe post (mm)","Pe pre (mm)"]}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2698:        rows={hiet.data.slice(1).filter((_,i)=>i%Math.max(1,Math.floor(hiet.steps/36))===0).map((r,idx)=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2699:          const rPost=lluvPost[idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPost[lluvPost.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2700:          const rPre =lluvPre [idx*Math.max(1,Math.floor(hiet.steps/36))+1]||lluvPre [lluvPre.length-1];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2701:          return{t:r.t,T:r.tPct,P:r.pAcum,dP:r.pIncrem,i:r.iBloque,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2702:            PePost:rPost?.Pe||0,PePre:rPre?.Pe||0};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2703:        })}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2704:        hiCols={[3,4]} accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2705:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2706:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2707:    {/* Nota técnica */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2708:    <div style={{background:`${C.teal}08`,border:`1px solid ${C.teal}20`,borderRadius:10,padding:"11px 15px",fontFamily:mono,fontSize:9,color:C.muted,lineHeight:1.7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2709:      <span style={{color:C.teal,fontWeight:700}}>Notas metodológicas GT-AS-004: </span>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2710:      § 3.4 Pérdidas: Método SCS-CN · Condición humedad AMC III · §3.5 HU SCS: lag time=60%·Tc · §3.8 Volumen excedente=∫(Qpost−Qpre)dt · §3.9 Caudal regulado=Qpico(pre) · Distribución temporal: Primer Cuartil (Gallego et al., 2024) · 
Curvas Huff: Distribuciones Illinois-ISWS (probabilidad 50%)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2711:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2712:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2713:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2714:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2715:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2716:// MÓDULO MÉTODO RACIONAL
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2717:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2718:function ModRacional({params,est,name}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2719:  const tcList=useMemo(()=>calcTc(params).filter(r=>isFinite(r.h)&&r.h>0),[params]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2720:  const tc_min=useMemo(()=>tcList.reduce((s,r)=>s+r.min,0)/(tcList.length||1),[tcList]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2721:  const res=useMemo(()=>calcRacional(est,params.area,tc_min,params.CN),[est,params,tc_min]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2722:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2723:    <SectionHeader icon="◈" title="Método Racional — Q = C·I·A / 3.6" sub="Abstracción SCS · Tc promedio · Comparativa de períodos de retorno" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2724:    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2725:      <Kpi value={tc_min.toFixed(2)+" min"} label="Tc promedio (6 métodos)" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2726:      <Kpi value={res.find(r=>r.Tr===25)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=25a" accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2727:      <Kpi value={res.find(r=>r.Tr===100)?.Q.toFixed(3)+" m³/s"} label="Q pico Tr=100a" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2728:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2729:    <Card title="Caudales Racionales — Todos los Tr" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2730:      <ResponsiveContainer width="100%" height={240}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2731:        <BarChart data={res} margin={{left:0,right:18,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2732:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2733:          <XAxis dataKey="Tr" tick={{fill:C.muted,fontSize:10}} label={{value:"Tr (años)",position:"insideBottom",offset:-4,fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2734:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Q (m³/s)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:10}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2735:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+" "+nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2736:          <Legend wrapperStyle={{fontSize:10}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2737:          <Bar dataKey="Q" fill={C.gold} radius={[3,3,0,0]} name="Q (m³/s)"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2738:          <Bar dataKey="C" fill={C.accent2} radius={[3,3,0,0]} name="Coef. C"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2739:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2740:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2741:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2742:    <Card title="Tabla — Parámetros y Caudales Racionales" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2743:      <Tbl headers={["Tr (a)","I (mm/h)","P (mm)","Coef. C","Q (m³/s)"]} rows={res} hiCols={[4]} accent={C.gold}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2744:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2745:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2746:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2747:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2748:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2770:  {codigo:"2701122",nombre:"COPACABANA",           lat:6.33661111,lon:-75.51086111,alt:1580,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:61.2,I60_obs:43.1,epm_key:"COPACABANA"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2771:  {codigo:"2701481",nombre:"PEDREGAL",             lat:6.30494444,lon:-75.57422222,alt:1622,red:"SIATA",    vars:["P","T","HR"],             estado:"Activa",      I30_obs:59.8,I60_obs:42.1,epm_key:"PEDREGAL"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2772:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2773:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2774:// ─── SERIE TEMPORAL SIATA SIMULADA (evento convectivo realista AMVA) ─────────
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2775:function generarSerieSIATA(semilla=42){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2776:  const rng=s=>{const x=Math.sin(s+1)*10000;return x-Math.floor(x);};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2777:  const base=[0,0,0,0,0,0.3,0.6,1.5,4.2,9.8,16.4,24.1,19.8,13.2,8.1,4.6,2.3,1.1,0.5,0.2,0,0,0,0];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2778:  return base.map((v,i)=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2779:    t:i*15, lluvia:+(v*(0.82+rng(semilla+i)*0.36)).toFixed(2),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2780:    humSuelo:+(0.32+rng(semilla+i+50)*0.28).toFixed(3),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2781:    nivelCauce:v>5?+(0.75+v*0.09*rng(semilla+i+100)).toFixed(3):+(0.28+rng(semilla+i+100)*0.12).toFixed(3),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2782:    temp:+(18+rng(semilla+i+200)*6).toFixed(1),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2783:  })).map((r,i,a)=>({...r,acum:+(a.slice(0,i+1).reduce((s,x)=>s+x.lluvia,0)).toFixed(2)}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2784:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2785:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3094:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3095:    {/* Gráfica barras influencia */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3096:    <Card title={`Índice de Influencia — ${method.toUpperCase()} · Tr=${Tr}a · d=${dMin}min`} accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3097:      <ResponsiveContainer width="100%" height={220}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3098:        <BarChart data={pond.map(e=>({n:e.nombre.length>16?e.nombre.substring(0,15)+"…":e.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3099:          pct:e.pct||0,dist:e.dist,alt:e.alt}))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3100:          margin={{left:0,right:12,top:8,bottom:48}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3101:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3102:          <XAxis dataKey="n" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3103:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Influencia (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3104:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(nm==="pct"?2:0)+(nm==="pct"?"%":" km"),nm]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3105:          <Bar dataKey="pct" name="Influencia (%)" radius={[3,3,0,0]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3106:            label={{position:"top",fill:C.muted2,fontSize:7,formatter:v=>v.toFixed(1)+"%"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3107:            {pond.map((_,i)=><Cell key={i} fill={i===0?C.teal:i<3?C.accent2:C.accent} opacity={0.85}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3108:          </Bar>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3109:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3110:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3111:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3112:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3113:    {/* IDF ponderada vs referencias */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3114:    <Card title={`IDF Ponderada (${method}) vs Dominante vs Seleccionada · Tr=${Tr}a`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3115:      <ResponsiveContainer width="100%" height={240}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3116:        <LineChart data={idfCurvas} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3117:          <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3118:          <XAxis dataKey="d" tick={{fill:C.muted,fontSize:9}} label={{value:"Duración (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3119:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3120:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(2)+" mm/h",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3121:          <Legend wrapperStyle={{fontSize:10}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3122:          <Line type="monotone" dataKey="IDF Ponderada" stroke={C.teal} strokeWidth={3} dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3123:          <Line type="monotone" dataKey="Dominante"     stroke={C.accent2} strokeWidth={2} strokeDasharray="6 2" dot={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3124:          <Line type="monotone" dataKey="Estación Sel." stroke={C.accent4} strokeWidth={1.8} strokeDasharray="4 4" dot={false}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3125:        </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3126:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3127:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3128:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3129:    {/* Análisis de escenarios */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3130:    <Card title={`Análisis de Escenarios — Δ I(d=${dMin}min, Tr=${Tr}a) al Eliminar Cada Estación`} accent={C.rose}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3131:      <ResponsiveContainer width="100%" height={210}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3132:        <BarChart data={escenarios} margin={{left:0,right:14,top:8,bottom:50}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3133:          <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3134:          <XAxis dataKey="nombre" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3135:          <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"Δ I (%)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3136:          <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+(nm==="delta"?"%":" mm/h"),nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3137:          <ReferenceLine y={0} stroke={C.muted} strokeWidth={1}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3138:          <Bar dataKey="delta" name="Δ IDF (%)" radius={[2,2,0,0]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3139:            label={{position:"insideTop",fill:C.bg,fontSize:7,formatter:v=>(v>0?"+":"")+v+"%"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3140:            {escenarios.map((e,i)=><Cell key={i} fill={Math.abs(e.delta)>5?C.rose:Math.abs(e.delta)>2?C.gold:C.accent2}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3141:          </Bar>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3142:        </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3143:      </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3144:      <div style={{marginTop:6,fontSize:8.5,color:C.muted,fontFamily:mono,padding:"6px 10px",background:`${C.border}20`,borderRadius:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3145:        <span style={{color:C.rose}}>●</span> Δ&gt;5%: impacto alto  <span style={{color:C.gold,marginLeft:12}}>●</span> 2-5%: moderado  <span style={{color:C.accent2,marginLeft:12}}>●</span> &lt;2%: bajo — Valor positivo = la I 
ponderada sube al eliminar la estación (estación deprimía la media).
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3146:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3147:    </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3148:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3157:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3158:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3159:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3160:// ═══════════════════════════════════════════════════════════════════════════════
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3161:// MÓDULO SIATA — Integración + Series + Catálogo + Arquitectura
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3162:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3163:function ModSIATA({params}){
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3164:  const[selStn,setSelStn]=useState(0);
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3165:  const[subTab,setSubTab]=useState("series");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3166:  const[apiStatus,setApiStatus]=useState("idle");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3167:  const[filterVar,setFilterVar]=useState("Todas");
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3168:  const[simDatos]=useState(()=>ESTACIONES_SIATA.map((_,i)=>generarSerieSIATA(42+i*7)));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3169:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3170:  const e=ESTACIONES_SIATA[selStn];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3171:  const serie=simDatos[selStn];
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3172:  const acumTotal=serie[serie.length-1]?.acum||0;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3173:  const maxLluvia=Math.max(...serie.map(r=>r.lluvia));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3174:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3175:  // Punto de salida → fuente única de verdad
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3176:  const cLat=+params.lat_salida||6.185, cLon=+params.lon_salida||-75.660;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3177:  const cAlt=+params.alt_salida||((params.cota_max+params.cota_min)/2)||2326;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3178:  const pesosVisuales=useMemo(()=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3179:    const p=calcCompuesto(ESTACIONES_SIATA,cLat,cLon,cAlt);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3180:    return ESTACIONES_SIATA.map(e2=>p.find(x=>x.codigo===e2.codigo)||{pct:0,peso:0});
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3181:  },[cLat,cLon,cAlt]);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3182:  const estsConPeso=ESTACIONES_SIATA.map((e2,i)=>({...e2,...pesosVisuales[i]}));
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3183:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3220:    [15,30,60].map(d=>{const iT=idfI(ESTACIONES_EPM[e.epm_key],d,25);const iO=d===15?maxLluvia*4:d===30?e.I30_obs:e.I60_obs;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3221:      return{d:`d=${d}'`,iTeor:+iT.toFixed(1),iObs:+iO.toFixed(1),ratio:+(iO/iT*100).toFixed(1)};}):[];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3222:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3223:  return(<div style={{display:"flex",flexDirection:"column",gap:14}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3224:    <SectionHeader icon="🛰" title="SIATA — Sistema de Alertas Tempranas del Valle de Aburrá" sub="Integración hidrometeorológica · API repopruebas.siata.gov.co · 17 estaciones · Series temporales · Arquitectura microservicios" 
accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3225:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3226:    {/* Banner API */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3227:    <div style={{background:`${C.accent3}07`,border:`1px solid ${C.accent3}22`,borderRadius:10,padding:"10px 16px",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3228:      <div style={{flex:1,minWidth:200}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3229:        <div style={{fontSize:8,color:C.muted,fontFamily:mono,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>Repositorio de pruebas SIATA</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3230:        <div style={{fontSize:11,fontWeight:700,color:C.accent3,fontFamily:mono}}>https://repopruebas.siata.gov.co/</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3231:        <div style={{fontSize:8,color:C.muted2,fontFamily:mono,marginTop:2}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3232:          /datos_siata/application/index.php/estaciones/getEstaciones
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3233:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3234:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3256:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3257:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3258:    {/* Sub-tabs */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3259:    <div style={{display:"flex",gap:3,borderBottom:`1px solid ${C.border}`,paddingBottom:8}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3260:      {[["series","📈 Series Temporales"],["catalogo","🗂 Catálogo"],["validacion","✓ Validación IDF"],["integracion","⚙ Modelo Hidrológico"],["arquitectura","🏗 Arquitectura"]].map(([id,l])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3261:        <button key={id} onClick={()=>setSubTab(id)} style={{padding:"5px 11px",border:"none",cursor:"pointer",borderRadius:"6px 6px 0 0",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3262:          background:subTab===id?`${C.accent3}15`:"transparent",color:subTab===id?C.accent3:C.muted,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3263:          fontSize:9.5,fontWeight:subTab===id?700:400,borderBottom:subTab===id?`2px solid ${C.accent3}`:"2px solid transparent"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3264:          {l}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3265:        </button>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3266:      ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3267:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3268:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3269:    {/* ── SERIES ── */}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3270:    {subTab==="series"&&<>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3271:      <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:12}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3272:        <Card title="Estaciones SIATA" accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3273:          <div style={{marginBottom:7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3274:            <div style={{fontSize:8,color:C.muted,fontFamily:mono,marginBottom:3}}>Filtrar variable</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3275:            <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3276:              {vars.map(v=><button key={v} onClick={()=>setFilterVar(v)} style={{padding:"2px 7px",borderRadius:6,border:`1px solid 
${filterVar===v?C.accent3:C.border}`,background:filterVar===v?`${C.accent3}15`:"transparent",color:filterVar===v?C.accent3:C.muted,fontSize:8,cursor:"pointer",fontFamily:mono}}>{v}</button>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3277:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3278:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3279:          <div style={{overflowY:"auto",maxHeight:340}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3280:            {filtradas.map(stn=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3298:            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:7}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3299:              <Kpi value={`${acumTotal.toFixed(1)} mm`} label="P acumulada" accent={C.accent}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3300:              <Kpi value={`${maxLluvia.toFixed(1)} mm`} label="Pico 15min" accent={C.accent3}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3301:              <Kpi value={`${(maxLluvia*4).toFixed(0)} mm/h`} label="i máx estimada" accent={C.gold}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3302:              <Kpi value={`${serie.filter(r=>r.lluvia>0).length*15} min`} label="Duración evento" accent={C.teal}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3303:              <Kpi value={`${(serie.reduce((s,r)=>s+r.humSuelo,0)/serie.length).toFixed(2)}`} label="Hum.suelo media" accent={C.rose}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3304:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3305:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3306:          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3307:            <Card title="Hum. Suelo + Nivel Cauce" accent={C.gold}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3308:              <ResponsiveContainer width="100%" height={110}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3309:                <LineChart data={serie} margin={{left:-18,right:8,top:4,bottom:4}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3310:                  <XAxis dataKey="t" hide/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3311:                  <YAxis yAxisId="h" domain={[0,0.8]} tick={{fill:C.muted,fontSize:7.5}} width={28}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3312:                  <YAxis yAxisId="n" orientation="right" tick={{fill:C.muted,fontSize:7.5}} width={28}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3313:                  <Tooltip contentStyle={{...TT,fontSize:9}} formatter={(v,nm)=>[v.toFixed(3),nm]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3314:                  <Line yAxisId="h" type="monotone" dataKey="humSuelo" stroke={C.gold} strokeWidth={2} dot={false} name="Hum.suelo"/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3315:                  {e.vars.includes("N.Cauce")&&<Line yAxisId="n" type="monotone" dataKey="nivelCauce" stroke={C.rose} strokeWidth={2} dot={false} name="Nivel (m)"/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3316:                </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3317:              </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3318:            </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3319:            <Card title="Temperatura" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3320:              <ResponsiveContainer width="100%" height={110}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3321:                <LineChart data={serie} margin={{left:-18,right:8,top:4,bottom:4}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3322:                  <XAxis dataKey="t" hide/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3323:                  <YAxis tick={{fill:C.muted,fontSize:7.5}} width={28}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3324:                  <Tooltip contentStyle={{...TT,fontSize:9}} formatter={(v,nm)=>[v.toFixed(1)+"°C",nm]}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3325:                  <Line type="monotone" dataKey="temp" stroke={C.accent4} strokeWidth={2} dot={false} name="T (°C)"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3326:                </LineChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3327:              </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3328:            </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3329:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3330:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3331:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3332:      <Card title={`Evento de Lluvia SIATA — ${e.nombre} · Intervalo 15min · P_acum=${acumTotal.toFixed(1)}mm`} accent={C.accent3}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3333:        <ResponsiveContainer width="100%" height={260}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3334:          <ComposedChart data={serie} margin={{left:0,right:18,top:8,bottom:14}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3335:            <CartesianGrid strokeDasharray="3 3" stroke={C.border}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3336:            <XAxis dataKey="t" tick={{fill:C.muted,fontSize:9}} label={{value:"t (min)",position:"insideBottom",offset:-6,fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3337:            <YAxis yAxisId="p" tick={{fill:C.muted,fontSize:9}} label={{value:"P (mm/15min)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3338:            <YAxis yAxisId="a" orientation="right" tick={{fill:C.muted,fontSize:9}} label={{value:"P acum (mm)",angle:90,position:"insideRight",fill:C.muted,fontSize:8}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3339:            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v.toFixed(2)+" mm",nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3340:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3341:            <Bar yAxisId="p" dataKey="lluvia" fill={C.accent3} radius={[2,2,0,0]} name="P 15min (mm)" opacity={0.85}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3342:            <Line yAxisId="a" type="monotone" dataKey="acum" stroke={C.accent2} strokeWidth={2.5} dot={false} name="P acumulada (mm)"/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3343:          </ComposedChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3344:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3345:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3346:    </>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3347:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3348:    {/* ── CATÁLOGO ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3349:    {subTab==="catalogo"&&<>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3350:      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3351:        <Card title="Distribución por Red" accent={C.teal}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3352:          <ResponsiveContainer width="100%" height={200}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3353:            <BarChart data={["EPM-SIATA","SIATA","IDEAM-SIATA","IDEAM","EPM"].map(r=>({r,n:ESTACIONES_SIATA.filter(e=>e.red===r).length}))} margin={{left:0,right:14,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3354:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3355:              <XAxis dataKey="r" tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3356:              <YAxis tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3357:              <Tooltip contentStyle={TT}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3358:              <Bar dataKey="n" name="Estaciones" radius={[3,3,0,0]} label={{position:"top",fill:C.muted2,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3359:                {["EPM-SIATA","SIATA","IDEAM-SIATA","IDEAM","EPM"].map((_,i)=><Cell key={i} fill={CC[i]}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3360:              </Bar>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3361:            </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3362:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3363:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3364:        <Card title="Variables monitoreadas" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3365:          <ResponsiveContainer width="100%" height={200}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3366:            <BarChart data={["P","T","HR","Viento","N.Cauce","HumSuelo","Rad","PA"].map(v=>({v,n:ESTACIONES_SIATA.filter(e=>e.vars.includes(v)).length}))} margin={{left:0,right:14,top:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3367:              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3368:              <XAxis dataKey="v" tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3369:              <YAxis tick={{fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3370:              <Tooltip contentStyle={TT}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3371:              <Bar dataKey="n" name="Estaciones" radius={[3,3,0,0]} label={{position:"top",fill:C.muted2,fontSize:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3372:                {["P","T","HR","Viento","N.Cauce","HumSuelo","Rad","PA"].map((_,i)=><Cell key={i} fill={CC[i+4]}/>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3373:              </Bar>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3374:            </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3375:          </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3376:        </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3377:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3378:      <Card title="Catálogo Completo — Red Hidrometeorológica SIATA AMVA" accent={C.accent4}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3379:        <Tbl headers={["#","Estación","Código","Lat","Lon","Alt (m)","Red","Variables","Estado","I30 obs (mm/h)"]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3380:          rows={ESTACIONES_SIATA.map((s,i)=>({N:i+1,E:s.nombre,C:s.codigo,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3381:            La:+s.lat.toFixed(5),Lo:+s.lon.toFixed(5),A:s.alt,R:s.red,V:s.vars.join("·"),S:s.estado,I30:s.I30_obs}))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3386:    {/* ── VALIDACIÓN IDF ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3387:    {subTab==="validacion"&&<>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3388:      <Card title="Comparativa IDF Teórica (EPM 2025) vs I Observada SIATA (Tr=25a)" accent={C.accent2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3389:        <ResponsiveContainer width="100%" height={260}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3390:          <BarChart data={ESTACIONES_SIATA.filter(s=>s.epm_key&&ESTACIONES_EPM[s.epm_key]).map(s=>({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3391:            n:s.nombre.length>14?s.nombre.substring(0,13)+"…":s.nombre,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3392:            iTeor30:+idfI(ESTACIONES_EPM[s.epm_key],30,25).toFixed(1),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3393:            iObs30:s.I30_obs,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3394:            ratio:+(s.I30_obs/idfI(ESTACIONES_EPM[s.epm_key],30,25)*100).toFixed(1),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3395:          }))} margin={{left:0,right:14,top:8,bottom:44}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3396:            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3397:            <XAxis dataKey="n" tick={{fill:C.muted,fontSize:7.5}} angle={-35} textAnchor="end" interval={0}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3398:            <YAxis tick={{fill:C.muted,fontSize:9}} label={{value:"I (mm/h)",angle:-90,position:"insideLeft",fill:C.muted,fontSize:9}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3399:            <Tooltip contentStyle={TT} formatter={(v,nm)=>[v+(nm==="ratio"?"%":" mm/h"),nm]}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3400:            <Legend wrapperStyle={{fontSize:9}}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3401:            <Bar dataKey="iTeor30" name="I teórica d=30min (mm/h)" fill={C.accent2} radius={[2,2,0,0]} opacity={0.8}/>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3402:            <Bar dataKey="iObs30"  name="I observada SIATA (mm/h)" fill={C.accent3} radius={[2,2,0,0]} opacity={0.8}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3403:          </BarChart>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3404:        </ResponsiveContainer>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3405:        <div style={{marginTop:8,fontSize:8.5,color:C.muted,fontFamily:mono,padding:"5px 10px",background:`${C.border}15`,borderRadius:6}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3406:          ⚠ I observada SIATA = intensidad representativa del evento. Tr=25a teórica = valor esperado estadísticamente. Diferencias &gt;15% sugieren revisar calibración IDF o período de retorno real del evento.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3407:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3408:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3409:      <Card title="Tabla Validación — I obs vs I teórica · Ratio de sesgo" accent={C.muted2}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3410:        <Tbl headers={["Estación","I teórica 30min (mm/h)","I obs SIATA 30min (mm/h)","Ratio obs/teórica (%)","Sesgo","I obs 60min","I teórica 60min"]}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3411:          rows={ESTACIONES_SIATA.filter(s=>s.epm_key&&ESTACIONES_EPM[s.epm_key]).map(s=>{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3412:            const iT30=+idfI(ESTACIONES_EPM[s.epm_key],30,25).toFixed(1);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3427:            ["2","Extraer P(t) de pluviómetros cercanos (15min)","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3428:            ["3","Leer humedad de suelo → AMC I/II/III","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3429:            ["4","Calcular CN dinámico según AMC observada","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3430:            ["5","Generar hietograma real con datos SIATA","✓"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3431:            ["6","Aplicar pérdidas SCS con CN corregido","✓"],
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3432:            ["7","Convolución con HU (SCS/Clark/Snyder)","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3433:            ["8","Comparar Q(t) con nivel observado","✓"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3434:            ["9","Calibrar Tc, CN, kR si hay datos de nivel","⚡"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3435:            ["10","Exportar parámetros calibrados a nueva IDF","⚡"],
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3436:          ].map(([n,txt,s])=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3437:            <div key={n} style={{display:"flex",gap:9,padding:"4px 9px",borderRadius:5,background:s==="✓"?`${C.teal}08`:`${C.gold}06`,marginBottom:1}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3438:              <span style={{color:C.teal,fontWeight:800,minWidth:18}}>{n}.</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3439:              <span style={{flex:1,color:C.muted2}}>{txt}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3440:              <span style={{color:s==="✓"?C.accent2:C.gold}}>{s}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3441:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3442:          ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3459:            </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3460:          </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3461:        ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3462:        <div style={{marginTop:6,fontSize:8,color:C.muted,background:`${C.border}20`,borderRadius:5,padding:"5px 8px"}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3463:          Hum.suelo actual: <span style={{color:C.gold,fontWeight:700}}>{serie?serie[Math.floor(serie.length/2)]?.humSuelo?.toFixed(3):0}</span> → AMC 
{serie&&serie[Math.floor(serie.length/2)]?.humSuelo>0.45?"III":serie[Math.floor(serie.length/2)]?.humSuelo>0.25?"II":"I"} para estación seleccionada
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3464:        </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3465:      </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3466:    </div>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3467:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3468:    {/* ── ARQUITECTURA ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3469:    {subTab==="arquitectura"&&<>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3470:      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3471:        {[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3472:          {n:"Nivel 1 — Consumo Directo",col:C.accent,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3473:            desc:"Consulta directa API SIATA. Requiere proxy/CORS en producción.",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3474:            eps:["/estaciones/siata","/precipitacion?lat&lon&r","/soilmoisture/siata","/streamflow/siata"]},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3475:          {n:"Nivel 2 — ETL Automatizado",col:C.accent2,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3476:            desc:"Descarga periódica CSV/JSON. HidroFlow mantiene su propio histórico SIATA.",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3477:            eps:["Scheduler: cada 15min/1h","Almacenar series temporales","Base datos estaciones","Cache de eventos extremos"]},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3478:          {n:"Nivel 3 — Microservicio Hidrológico",col:C.teal,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3479:            desc:"Pipeline completo: SIATA → filtrado → homologación → parámetros HidroFlow.",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3480:            eps:["SIATA → Filtro → Homologa","→ CN dinámico (AMC)","→ Calibración Tc/kR","→ Tormenta híbrida real"]},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3481:        ].map(({n,col,desc,eps})=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3482:          <Card key={n} title={n} accent={col}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3483:            <div style={{fontFamily:mono,fontSize:8.5,color:C.muted,marginBottom:8,lineHeight:1.5}}>{desc}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3484:            {eps.map((ep,i)=>(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3485:              <div key={i} style={{padding:"4px 9px",marginBottom:3,borderRadius:5,background:`${col}09`,border:`1px solid ${col}1E`,color:col,fontSize:8}}>{ep}</div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3486:            ))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3487:          </Card>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3520:const TABS=[
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3521:  {id:"params",     label:"Parámetros",   icon:"⬡", acc:C.accent,   desc:"Morfometría · Índices · 6 Métodos Tc"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3522:  {id:"idf",        label:"IDF",          icon:"⌁", acc:C.accent3,  desc:"20 Est. EPM 2025 · I=k/(c+d)ⁿ · PDF calibradas"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3523:  {id:"hiet",       label:"Hietogramas",  icon:"🌧", acc:C.accent,   desc:"GT-AS-004 §3.3 · Curvas Huff Q1-Q4 · 5 distribuciones"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3524:  {id:"hidro",      label:"Hidrogramas",  icon:"≋", acc:C.accent2,  desc:"SCS · SCS Mod. · Snyder · Williams&Hann · Clark IUH"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3525:  {id:"racional",   label:"Racional",     icon:"◈", acc:C.gold,     desc:"Q=C·I·A/3.6 · Abstracción SCS · Todos los Tr"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3526:  {id:"sar",        label:"SAR",          icon:"◫", acc:C.accent4,  desc:"GT-AS-004 §3 · Hietograma+Convolución+Vol. · PDF/Excel"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3527:  {id:"influencia", label:"Influencia",   icon:"⊕", acc:C.teal,     desc:"IDW · Thiessen · Altitudinal · Compuesto · Escenarios · Mapa AMVA"},
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3528:  {id:"siata",      label:"SIATA",        icon:"🛰", acc:C.accent3,  desc:"API repopruebas.siata.gov.co · Series · Validación IDF · Arquitectura"},
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3529:];
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3530:export default function HidroFlow({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3531:  tab: tabExterno,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3532:  setTab: setTabExterno,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3533:  onContextoComparador,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3534:}) {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3535:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3536:// Manejo de tabs (modo controlado / no controlado)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3537:// ------------------------------------------------------------
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3538:const [tabInterno, setTabInterno] = useState("params");
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3664:      tc_min: getTcState()?.Tc_final ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3665:      lluvia_efectiva_total_mm: previo?.lluvia_efectiva_total_mm ?? null
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
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3677:// No reemplaza el estado especializado publicado por ComparadorMultiMetodo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3678:useEffect(() => {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3679:  const estadoTcActual = getTcState();
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3680:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3681:  const agenteTieneEstado =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3682:    estadoTcActual?.Tc_final !== null &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3683:    estadoTcActual?.Tc_final !== undefined &&
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3684:    estadoTcActual?.metodosTc;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3685:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3686:  const agenteTieneEstadoEspecializado =
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3687:    estadoTcActual?.rangoCompetenteTc ||
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3788:            borderBottom:tab===t.id?`2px solid ${t.acc}`:"2px solid transparent",transition:"all .12s"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3789:          {t.icon} {t.label}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3790:        </button>))}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3791:      
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3792:      <button data-id="blind-hidro" onClick={(e)=>{e.preventDefault(); e.stopPropagation(); setTab("hidro");}}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3793:        style={{padding:"4px 9px",borderRadius:6,border:"none",cursor:"pointer",background:"transparent",color:C.muted, fontSize:9.5,fontWeight:500}}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3794:        title="Ir a Hidrogramas (SPA)">≋</button></nav>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3795:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3796:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3797:    {/* Accent bar */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3798:    <div style={{height:1.5,background:`linear-gradient(90deg,${aa}AA,${aa}22,transparent)`}}/>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3799:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3800:    {/* ── CONTENT ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3801:    <div style={{padding:"14px 18px",maxWidth:1640,margin:"0 auto"}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3802:      <div style={{marginBottom:12,display:"flex",alignItems:"center",gap:9}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3803:        <span style={{fontSize:18,color:aa}}>{TABS.find(t=>t.id===tab)?.icon}</span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3804:        <div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3815:          params={params}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3816:          setParams={setParams}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3817:        />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3818:      )}
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3819:      {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={stn} onContextoComparador={onContextoComparador} />}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3820:      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn} onContextoComparador={onContextoComparador}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3821:      {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3822:      {tab === "Influencia" && (
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3823:        <div style={{
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3824:           padding: 20,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3825:           color: "#9fffe8",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3826:           fontFamily: "monospace"
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3827:        }}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3828:           Módulo de influencia IDF en desarrollo.
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3829:           <br />
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3836:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3837:    {/* ── FOOTER ── */}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3838:    <div style={{borderTop:`1px solid ${C.border}`,padding:"7px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:20}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3839:      <span style={{fontSize:8,color:C.muted,fontFamily:mono}}>
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3840:        HidroFlow v3.1 · GT-AS-004 Rev.0 2026-01-07 · SIATA AMVA · {pdfN} est. PDF + {refN} ref. · 5 HU · IDW/Thiessen/Altitudinal/Compuesto · Huff Q1-Q4 · Clark IUH
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3841:      </span>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3842:      <div style={{display:"flex",gap:10,fontFamily:mono,fontSize:8}}>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3843:        {[{l:stn,a:C.accent3},{l:`A=${params.area}km²`,a:C.accent},{l:`CN=${params.CN}`,a:C.accent2},{l:`Δt=${params.dt}min`,a:C.gold},{l:`17 est. SIATA`,a:C.teal}].map(({l,a})=><span key={l} style={{color:a}}>{l}</span>)}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3844:      </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3845:    </div>
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3846:  </div>);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3847:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3848:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3849:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3850:



## Evidencia en hidroEngine.js


  01_APP\HIDROFLOW\src\services\hidroEngine.js:1:/**
  01_APP\HIDROFLOW\src\services\hidroEngine.js:2: * hidroEngine.js
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:3: * Motor hidrológico base de HidroFlow
  01_APP\HIDROFLOW\src\services\hidroEngine.js:4: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:5: * Fase 1 de modularización:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:6: * - Extrae funciones puras CN / AMC / SCS-CN / Tc desde HidroFlow.jsx.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:7: * - No contiene componentes React.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:8: * - No renderiza interfaz.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:9: * - No depende de estilos ni de Recharts.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:10: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:11: * Regla Senior:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:12: * HidroFlow.jsx debe visualizar y orquestar.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:13: * hidroEngine.js debe calcular.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:14: */
  01_APP\HIDROFLOW\src\services\hidroEngine.js:15:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:16:// ─────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:17:// Constantes SCS-CN
  01_APP\HIDROFLOW\src\services\hidroEngine.js:18:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:19:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:20:export const SCS_RETENCION_MM = 25400;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:21:export const SCS_ABSTRACCION_LAMBDA = 0.2;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:22:export const CN_MIN = 30;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:23:export const CN_MAX = 98;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:24:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:25:export function limitarNumero(valor, min, max) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:26:  const n = Number(valor);
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:27:  if (!Number.isFinite(n)) return min;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:28:  return Math.max(min, Math.min(max, n));
  01_APP\HIDROFLOW\src\services\hidroEngine.js:29:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:30:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:31:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:32:// CN dinámico / AMC / impermeabilidad
  01_APP\HIDROFLOW\src\services\hidroEngine.js:33:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:34:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:35:/**
  01_APP\HIDROFLOW\src\services\hidroEngine.js:36: * Conversión CNII → CNI.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:37: *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:38: * Nota:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:39: * Esta es la fórmula actualmente implementada en HidroFlowV5.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:40: * Se conserva para no cambiar resultados hidrológicos durante la modularización.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:41: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:42:export function cnIIaCNI(cnII) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:43:  return cnII > 0 ? (4.2 * cnII) / (10 + 0.058 * cnII) : cnII;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:44:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:45:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:46:/**
  01_APP\HIDROFLOW\src\services\hidroEngine.js:47: * Conversión CNII → CNIII.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:48: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:49:export function cnIIaCNIII(cnII) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:50:  return cnII > 0 ? (23 * cnII) / (10 + 0.13 * cnII) : cnII;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:51:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:52:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:53:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:54: * Alias temporal por compatibilidad con módulos existentes.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:55: * Mantener mientras se limpian referencias antiguas.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:56: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:57:export function cnII_to_III(cnII) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:58:  return cnIIaCNIII(cnII);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:59:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:60:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:61:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:62: * CN mixto por urbanización.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:63: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:64:export function cnMixto(SI) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:65:  return 0.12 * SI + 86;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:66:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:67:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:68:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:69: * Mezcla explícita entre superficie permeable e impermeable.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:70: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:71:export function mezclaImpermeable(cnPermeable, porcentajeImp, cnImperv = 98) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:72:  const w = limitarNumero(porcentajeImp, 0, 100) / 100;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:73:  return cnPermeable * (1 - w) + cnImperv * w;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:74:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:75:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:76:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:77: * CN dinámico efectivo.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:78: *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:79: * Entradas:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:80: * - amcActual: "I", "II" o "III"
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:81: * - porcentajeImpermeable: 0 a 100
  01_APP\HIDROFLOW\src\services\hidroEngine.js:82: * - cnBase: CNII base
  01_APP\HIDROFLOW\src\services\hidroEngine.js:83: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:84:export function calcCNdinamico({ amcActual, porcentajeImpermeable, cnBase }) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:85:  let cnPermeable_CNII = Number.isFinite(cnBase) ? +cnBase : 75;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:86:  cnPermeable_CNII = limitarNumero(cnPermeable_CNII, CN_MIN, CN_MAX);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:87:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:88:  let cnAjustado =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:89:    amcActual === "I"
  01_APP\HIDROFLOW\src\services\hidroEngine.js:90:      ? cnIIaCNI(cnPermeable_CNII)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:91:      : amcActual === "III"
  01_APP\HIDROFLOW\src\services\hidroEngine.js:92:      ? cnIIaCNIII(cnPermeable_CNII)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:93:      : cnPermeable_CNII;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:94:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:95:  const cnEfectivo = mezclaImpermeable(
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:96:    cnAjustado,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:97:    porcentajeImpermeable,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:98:    98
  01_APP\HIDROFLOW\src\services\hidroEngine.js:99:  );
  01_APP\HIDROFLOW\src\services\hidroEngine.js:100:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:101:  return +limitarNumero(cnEfectivo, CN_MIN, CN_MAX).toFixed(1);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:102:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:103:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:104:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:105: * Deriva condición AMC desde humedad de suelo SIATA.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:106: *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:107: * Nota:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:108: * Se conserva la lógica HidroFlowV5.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:109: * Luego se puede profesionalizar el texto del informe sin cambiar cálculo.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:110: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:111:export function derivarAMCDesdeSIATA(humedadSuelo) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:112:  const hs = Number.isFinite(humedadSuelo) ? +humedadSuelo : 0.35;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:113:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:114:  const amcActual = hs < 0.25 ? "I" : hs > 0.45 ? "III" : "II";
  01_APP\HIDROFLOW\src\services\hidroEngine.js:115:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:116:  const informe =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:117:    amcActual === "I"
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:118:      ? "El suelo está sequito. Absorbe más agua. Esperamos menos escorrentía."
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:119:      : amcActual === "II"
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:120:      ? "El suelo está normal. Ni muy seco ni saturado. Comportamiento intermedio."
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:121:      : "El suelo está mojadito/saturado. Absorbe menos. Aumenta la escorrentía.";
  01_APP\HIDROFLOW\src\services\hidroEngine.js:122:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:123:  const contexto = `HS≈${hs.toFixed(2)} → AMC ${amcActual}`;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:124:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:125:  return {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:126:    amcActual,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:127:    amcFuente: "SIATA",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:128:    amcInforme: `${contexto}. ${informe}`
  01_APP\HIDROFLOW\src\services\hidroEngine.js:129:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:130:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:131:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:132:// ─────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:133:// Retención, abstracción y precipitación efectiva SCS-CN
  01_APP\HIDROFLOW\src\services\hidroEngine.js:134:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:135:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:136:export function calcRetencionSCS(CN) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:137:  const cn = limitarNumero(CN, CN_MIN, CN_MAX);
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:138:  const S = SCS_RETENCION_MM / cn - 254;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:139:  const Ia = SCS_ABSTRACCION_LAMBDA * S;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:140:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:141:  return {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:142:    CN: +cn.toFixed(3),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:143:    S: +S.toFixed(6),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:144:    Ia: +Ia.toFixed(6),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:145:    lambda: SCS_ABSTRACCION_LAMBDA
  01_APP\HIDROFLOW\src\services\hidroEngine.js:146:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:147:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:148:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:149:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:150: * Lluvia efectiva acumulada Pe(t) mediante método SCS-CN.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:151: *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:152: * Entrada:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:153: * - hiet.data con pAcum
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:154: * - CN efectivo
  01_APP\HIDROFLOW\src\services\hidroEngine.js:155: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:156:export function calcLluviaEfectiva(hiet, CN) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:157:  const { S, Ia } = calcRetencionSCS(CN);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:158:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:159:  const rows = hiet.data.map((r) => {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:160:    const P = r.pAcum;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:161:    const Pe = P > Ia ? Math.pow(P - Ia, 2) / (P - Ia + S) : 0;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:162:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:163:    return {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:164:      ...r,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:165:      Pe: +Pe.toFixed(4),
  01_APP\HIDROFLOW\src\services\hidroEngine.js:166:      PeIncrem: 0,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:167:      S,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:168:      Ia
  01_APP\HIDROFLOW\src\services\hidroEngine.js:169:    };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:170:  });
  01_APP\HIDROFLOW\src\services\hidroEngine.js:171:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:172:  for (let i = 1; i < rows.length; i++) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:173:    rows[i].PeIncrem = +(rows[i].Pe - rows[i - 1].Pe).toFixed(5);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:174:  }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:175:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:176:  rows[0].PeIncrem = 0;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:177:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:178:  return rows;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:179:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:180:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:181:// ─────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:182:// Tiempo de concentración Tc
  01_APP\HIDROFLOW\src\services\hidroEngine.js:183:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:184:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:185:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:186: * Calcula los seis métodos empíricos de Tiempo de Concentración.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:187: *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:188: * Retorna:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:189: * [
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:190: *   { m: "Témez (1978)", h: ..., min: ... },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:191: *   ...
  01_APP\HIDROFLOW\src\services\hidroEngine.js:192: * ]
  01_APP\HIDROFLOW\src\services\hidroEngine.js:193: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:194:export function calcTc(p) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:195:  const L = p.longitud_cauce;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:196:  const A = p.area;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:197:  const Sp = p.pendiente_cuenca;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:198:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:199:  const So =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:200:    ((p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 1000)) * 1000;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:201:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:202:  const Lft = L * 3280.84;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:203:  const Sf =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:204:    (p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 3280.84);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:205:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:206:  const Ss = SCS_RETENCION_MM / p.CN - 254;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:207:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:208:  return [
  01_APP\HIDROFLOW\src\services\hidroEngine.js:209:    {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:210:      m: "Témez (1978)",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:211:      h: 0.3 * Math.pow(L / Math.pow(So / 1000, 0.25), 0.76)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:212:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:213:    {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:214:      m: "Kirpich (1940)",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:215:      h: (0.0078 * Math.pow(Lft, 0.77) * Math.pow(Sf, -0.385)) / 60
  01_APP\HIDROFLOW\src\services\hidroEngine.js:216:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:217:    {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:218:      m: "California (1942)",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:219:      h:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:220:        (0.0195 *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:221:          Math.pow(L * 1000, 0.77) *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:222:          Math.pow(So / 1000, -0.385)) / 60
  01_APP\HIDROFLOW\src\services\hidroEngine.js:223:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:224:    {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:225:      m: "Giandotti (1934)",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:226:      h:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:227:        (4 * Math.sqrt(A) + 1.5 * L) /
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:228:        (0.8 * Math.sqrt(p.cota_max - p.cota_min))
  01_APP\HIDROFLOW\src\services\hidroEngine.js:229:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:230:    {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:231:      m: "SCS-Ranser (1958)",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:232:      h:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:233:        (Math.pow(L * 1000, 0.8) * Math.pow(Ss + 1, 0.7)) /
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:234:        (4655 * Math.pow(Sp, 0.5))
  01_APP\HIDROFLOW\src\services\hidroEngine.js:235:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:236:    {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:237:      m: "Pérez-Montg. (1985)",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:238:      h: 0.1039 * Math.pow(L, 0.7) * Math.pow(So, -0.3)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:239:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:240:  ].map((r) => ({
  01_APP\HIDROFLOW\src\services\hidroEngine.js:241:    ...r,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:242:    min: +(r.h * 60).toFixed(3)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:243:  }));
  01_APP\HIDROFLOW\src\services\hidroEngine.js:244:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:245:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:246:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:247:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:248:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:249: * Estadística básica de Tc.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:250: * Esta función no decide el Tc adoptado; solo resume.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:251: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:252:export function resumirTc(tcList) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:253:  const validos = (tcList || []).filter((r) => Number.isFinite(r.h) && r.h > 0);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:254:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:255:  if (!validos.length) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:256:    return {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:257:      n: 0,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:258:      promedio_h: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:259:      promedio_min: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:260:      mediana_min: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:261:      min_min: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:262:      max_min: null
  01_APP\HIDROFLOW\src\services\hidroEngine.js:263:    };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:264:  }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:265:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:266:  const minutos = validos.map((r) => r.min).sort((a, b) => a - b);
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:267:  const promedioMin =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:268:    minutos.reduce((s, v) => s + v, 0) / minutos.length;
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:269:  const mid = Math.floor(minutos.length / 2);
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:270:  const medianaMin =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:271:    minutos.length % 2
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:272:      ? minutos[mid]
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:273:      : (minutos[mid - 1] + minutos[mid]) / 2;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:274:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:275:  return {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:276:    n: validos.length,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:277:    promedio_h: +(promedioMin / 60).toFixed(6),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:278:    promedio_min: +promedioMin.toFixed(3),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:279:    mediana_min: +medianaMin.toFixed(3),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:280:    min_min: +Math.min(...minutos).toFixed(3),
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:281:    max_min: +Math.max(...minutos).toFixed(3)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:282:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:283:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:284:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:285:export function mapTcResultados(tcArray) {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:286:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:287:  const mapa = {};
  01_APP\HIDROFLOW\src\services\hidroEngine.js:288:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:289:  tcArray.forEach(item => {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:290:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:291:    if (item.m.includes('Kirpich')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:292:      mapa.Kirpich = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:293:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:294:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:295:    if (item.m.includes('Témez')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:296:      mapa.Temez = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:297:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:298:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:299:    if (item.m.includes('California')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:300:      mapa.California = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:301:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:302:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:303:    if (item.m.includes('Giandotti')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:304:      mapa.Giandotti = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:305:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:306:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:307:    if (item.m.includes('Pérez')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:308:      mapa.Perez = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:309:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:310:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:311:    if (item.m.includes('SCS')) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:312:      mapa.SCS = item.min;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:313:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:314:  });
  01_APP\HIDROFLOW\src\services\hidroEngine.js:315:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:316:  return mapa;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:317:}
  01_APP\HIDROFLOW\src\services\hidroEngine.js:318:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:319:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:320:// ─────────────────────────────────────────────────────────────
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:321:// Resumen técnico consolidado del motor hidrológico
  01_APP\HIDROFLOW\src\services\hidroEngine.js:322:// ─────────────────────────────────────────────────────────────
  01_APP\HIDROFLOW\src\services\hidroEngine.js:323:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:324:/**
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:325: * resumenMotorHidrologico(params)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:326: *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:327: * Consolida en un solo objeto los principales indicadores que debe leer
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:328: * la interfaz técnica de HidroFlow:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:329: *
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:330: * - Cuenca activa
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:331: * - IDF adoptada
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:332: * - CN base / CN efectivo
  01_APP\HIDROFLOW\src\services\hidroEngine.js:333: * - AMC
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:334: * - S e Ia del método SCS-CN
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:335: * - Tiempo de concentración por métodos
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:336: * - Resumen estadístico de Tc
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:337: * - Periodos de retorno activos
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:338: * - Criterio de competencia del Método Racional
  01_APP\HIDROFLOW\src\services\hidroEngine.js:339: *
  01_APP\HIDROFLOW\src\services\hidroEngine.js:340: * Regla Senior:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:341: * Esta función NO renderiza interfaz.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:342: * Esta función NO modifica params.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:343: * Esta función NO reemplaza los módulos existentes.
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:344: * Esta función consolida resultados para lectura técnica.
  01_APP\HIDROFLOW\src\services\hidroEngine.js:345: */
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:346:export function resumenMotorHidrologico(params = {}) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:347:  const geometria = params.geometria || {};
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:348:  const relieve = params.relieve || {};
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:349:  const hidrologia = params.hidrologia || {};
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:350:  const idf = params.idf || {};
  01_APP\HIDROFLOW\src\services\hidroEngine.js:351:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:352:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:353:  // 1. Identificación de cuenca
  01_APP\HIDROFLOW\src\services\hidroEngine.js:354:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:355:  const nombreCuenca =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:356:    params.nombre_completo ||
  01_APP\HIDROFLOW\src\services\hidroEngine.js:357:    params.nombre_cuenca ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:358:    params.etiqueta ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:359:    "Cuenca activa";
  01_APP\HIDROFLOW\src\services\hidroEngine.js:360:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:361:  const puntoControl =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:362:    params.punto_control ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:363:    hidrologia.punto_calculo ||
  01_APP\HIDROFLOW\src\services\hidroEngine.js:364:    "PC";
  01_APP\HIDROFLOW\src\services\hidroEngine.js:365:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:366:  const areaKm2 =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:367:    geometria.area_km2 ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:368:    params.area ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:369:    null;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:370:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:371:  const pendienteMediaPct =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:372:    relieve.pendiente_media_pct ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:373:    params.pendiente_media ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:374:    params.pendiente_cuenca ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:375:    null;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:376:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:377:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:378:  // 2. IDF adoptada
  01_APP\HIDROFLOW\src\services\hidroEngine.js:379:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:380:  const estacionesIDF =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:381:    Array.isArray(idf.estaciones_influencia) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:382:    idf.estaciones_influencia.length > 0
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:383:      ? idf.estaciones_influencia.map((e) => ({
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:384:          nombre: e.etiqueta || e.nombre || e.id || "Estación IDF",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:385:          peso: Number.isFinite(e.peso_pct)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:386:            ? e.peso_pct / 100
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:387:            : Number.isFinite(e.peso)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:388:            ? e.peso
  01_APP\HIDROFLOW\src\services\hidroEngine.js:389:            : 1,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:390:          peso_pct: Number.isFinite(e.peso_pct)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:391:            ? e.peso_pct
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:392:            : Number.isFinite(e.peso)
  01_APP\HIDROFLOW\src\services\hidroEngine.js:393:            ? e.peso <= 1
  01_APP\HIDROFLOW\src\services\hidroEngine.js:394:              ? e.peso * 100
  01_APP\HIDROFLOW\src\services\hidroEngine.js:395:              : e.peso
  01_APP\HIDROFLOW\src\services\hidroEngine.js:396:            : 100,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:397:          rol: e.rol || "estacion_idf_adoptada",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:398:          estado: e.estado || "activa"
  01_APP\HIDROFLOW\src\services\hidroEngine.js:399:        }))
  01_APP\HIDROFLOW\src\services\hidroEngine.js:400:      : [
  01_APP\HIDROFLOW\src\services\hidroEngine.js:401:          {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:402:            nombre:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:403:              idf.estacion_label ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:404:              idf.estacion_nombre ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:405:              "San Cristóbal",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:406:            peso: Number.isFinite(idf.peso_operativo_pct)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:407:              ? idf.peso_operativo_pct / 100
  01_APP\HIDROFLOW\src\services\hidroEngine.js:408:              : 1,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:409:            peso_pct: Number.isFinite(idf.peso_operativo_pct)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:410:              ? idf.peso_operativo_pct
  01_APP\HIDROFLOW\src\services\hidroEngine.js:411:              : 100,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:412:            rol: "estacion_idf_adoptada",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:413:            estado: idf.estado || "activa"
  01_APP\HIDROFLOW\src\services\hidroEngine.js:414:          }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:415:        ];
  01_APP\HIDROFLOW\src\services\hidroEngine.js:416:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:417:  const resumenIDF = {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:418:    metodo_adoptado: idf.metodo_adoptado || "EPM",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:419:    estacion_principal:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:420:      idf.estacion_label ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:421:      idf.estacion_nombre ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:422:      estacionesIDF?.[0]?.nombre ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:423:      "San Cristóbal",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:424:    estaciones: estacionesIDF,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:425:    ponderacion_formal_pendiente: true,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:426:    observacion:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:427:      "La ponderación IDF multies­tación queda pendiente de cálculo formal. Solo deben participar estaciones disponibles y parametrizadas."
  01_APP\HIDROFLOW\src\services\hidroEngine.js:428:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:429:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:430:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:431:  // 3. CN base, AMC y CN efectivo
  01_APP\HIDROFLOW\src\services\hidroEngine.js:432:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:433:  const CNbase =
  01_APP\HIDROFLOW\src\services\hidroEngine.js:434:    hidrologia.CN_base ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:435:    hidrologia.CN ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:436:    params.cnBase ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:437:    params.CN ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:438:    75;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:439:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:440:  const amcActual =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:441:    params.amcActual ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:442:    hidrologia.amcActual ||
  01_APP\HIDROFLOW\src\services\hidroEngine.js:443:    "II";
  01_APP\HIDROFLOW\src\services\hidroEngine.js:444:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:445:  const porcentajeImpermeable =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:446:    Number.isFinite(params.porcentajeImpermeable)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:447:      ? params.porcentajeImpermeable
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:448:      : Number.isFinite(hidrologia.porcentajeImpermeable)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:449:      ? hidrologia.porcentajeImpermeable
  01_APP\HIDROFLOW\src\services\hidroEngine.js:450:      : 0;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:451:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:452:  const CNefectivo = calcCNdinamico({
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:453:    amcActual,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:454:    porcentajeImpermeable,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:455:    cnBase: CNbase
  01_APP\HIDROFLOW\src\services\hidroEngine.js:456:  });
  01_APP\HIDROFLOW\src\services\hidroEngine.js:457:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:458:  const retencion = calcRetencionSCS(CNefectivo);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:459:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:460:  const resumenCN = {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:461:    CN_base: CNbase,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:462:    CN_condicion_base:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:463:      hidrologia.CN_condicion_base ||
  01_APP\HIDROFLOW\src\services\hidroEngine.js:464:      "CNII",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:465:    CN_efectivo: CNefectivo,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:466:    amc: amcActual,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:467:    porcentaje_impermeable: porcentajeImpermeable,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:468:    S_mm: retencion.S,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:469:    Ia_mm: retencion.Ia,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:470:    lambda: retencion.lambda,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:471:    metodo: "SCS-CN",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:472:    observacion:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:473:      "CN efectivo calculado con ajuste AMC e impermeabilidad cuando existan insumos dinámicos."
  01_APP\HIDROFLOW\src\services\hidroEngine.js:474:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:475:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:476:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:477:  // 4. Tiempo de concentración Tc
  01_APP\HIDROFLOW\src\services\hidroEngine.js:478:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:479:  const paramsTc = {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:480:    area: areaKm2,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:481:    longitud_cauce:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:482:      geometria.longitud_cauce_km ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:483:      params.longitud_cauce,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:484:    pendiente_cuenca:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:485:      params.pendiente_cuenca ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:486:      pendienteMediaPct,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:487:    cota_mayor_cauce:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:488:      relieve.cota_mayor_cauce_msnm ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:489:      relieve.cota_max_msnm ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:490:      params.cota_mayor_cauce ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:491:      params.cota_max,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:492:    cota_menor_cauce:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:493:      relieve.cota_menor_cauce_msnm ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:494:      relieve.cota_min_msnm ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:495:      params.cota_menor_cauce ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:496:      params.cota_min,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:497:    cota_max:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:498:      relieve.cota_max_msnm ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:499:      params.cota_max,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:500:    cota_min:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:501:      relieve.cota_min_msnm ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:502:      params.cota_min,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:503:    CN: CNefectivo
  01_APP\HIDROFLOW\src\services\hidroEngine.js:504:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:505:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:506:  let tcMetodos = [];
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:507:  let tcResumen = {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:508:    n: 0,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:509:    promedio_h: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:510:    promedio_min: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:511:    mediana_min: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:512:    min_min: null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:513:    max_min: null
  01_APP\HIDROFLOW\src\services\hidroEngine.js:514:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:515:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:516:  const tieneInsumosTc =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:517:    Number.isFinite(paramsTc.area) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:518:    Number.isFinite(paramsTc.longitud_cauce) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:519:    Number.isFinite(paramsTc.pendiente_cuenca) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:520:    Number.isFinite(paramsTc.cota_mayor_cauce) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:521:    Number.isFinite(paramsTc.cota_menor_cauce) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:522:    Number.isFinite(paramsTc.cota_max) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:523:    Number.isFinite(paramsTc.cota_min) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:524:    Number.isFinite(paramsTc.CN);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:525:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:526:  if (tieneInsumosTc) {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:527:    tcMetodos = calcTc(paramsTc).filter(
  01_APP\HIDROFLOW\src\services\hidroEngine.js:528:      (r) =>
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:529:        Number.isFinite(r.h) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:530:        Number.isFinite(r.min) &&
  01_APP\HIDROFLOW\src\services\hidroEngine.js:531:        r.h > 0 &&
  01_APP\HIDROFLOW\src\services\hidroEngine.js:532:        r.min > 0
  01_APP\HIDROFLOW\src\services\hidroEngine.js:533:    );
  01_APP\HIDROFLOW\src\services\hidroEngine.js:534:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:535:    tcResumen = resumirTc(tcMetodos);
  01_APP\HIDROFLOW\src\services\hidroEngine.js:536:  }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:537:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:538:  const resumenTc = {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:539:    estado: tieneInsumosTc
  01_APP\HIDROFLOW\src\services\hidroEngine.js:540:      ? "calculado"
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:541:      : "insumos_incompletos",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:542:    metodos: tcMetodos,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:543:    resumen: tcResumen,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:544:    tc_sugerido_min:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:545:      tcResumen.mediana_min ??
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:546:      tcResumen.promedio_min ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:547:      null,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:548:    criterio_sugerido:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:549:      "Se reportan métodos empíricos y resumen estadístico. El Tc adoptado definitivo debe definirse por criterio técnico y sensibilidad hidrológica."
  01_APP\HIDROFLOW\src\services\hidroEngine.js:550:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:551:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:552:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:553:  // 5. Periodos de retorno
  01_APP\HIDROFLOW\src\services\hidroEngine.js:554:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:555:  const periodosRetorno =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:556:    Array.isArray(hidrologia.periodos_retorno) &&
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:557:    hidrologia.periodos_retorno.length > 0
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:558:      ? hidrologia.periodos_retorno
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:559:      : Array.isArray(hidrologia.periodos_retorno_anios)
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:560:      ? hidrologia.periodos_retorno_anios.map((tr) => ({
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:561:          tr,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:562:          etiqueta: `Tr ${tr} años`,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:563:          tipo: tr === 2.33 ? "evento_medio_anual" : "diseno",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:564:          activo: true
  01_APP\HIDROFLOW\src\services\hidroEngine.js:565:        }))
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:566:      : [2.33, 5, 10, 25, 50, 100].map((tr) => ({
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:567:          tr,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:568:          etiqueta: `Tr ${tr} años`,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:569:          tipo: tr === 2.33 ? "evento_medio_anual" : "diseno",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:570:          activo: true
  01_APP\HIDROFLOW\src\services\hidroEngine.js:571:        }));
  01_APP\HIDROFLOW\src\services\hidroEngine.js:572:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:573:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:574:  // 6. Método Racional
  01_APP\HIDROFLOW\src\services\hidroEngine.js:575:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:576:  const umbralRacionalKm2 = 5;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:577:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:578:  const racionalCompetente =
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:579:    Number.isFinite(areaKm2) &&
  01_APP\HIDROFLOW\src\services\hidroEngine.js:580:    areaKm2 <= umbralRacionalKm2;
  01_APP\HIDROFLOW\src\services\hidroEngine.js:581:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:582:  const resumenRacional = {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:583:    area_km2: areaKm2,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:584:    umbral_competencia_km2: umbralRacionalKm2,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:585:    uso_recomendado: racionalCompetente
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:586:      ? "Método competente para cuenca menor"
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:587:      : "Solo contraste referencial",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:588:    competencia: racionalCompetente
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:589:      ? "alta"
  01_APP\HIDROFLOW\src\services\hidroEngine.js:590:      : "baja_no_principal",
  01_APP\HIDROFLOW\src\services\hidroEngine.js:591:    C:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:592:      hidrologia.coeficiente_escorrentia ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:593:      params.C_racional ??
  01_APP\HIDROFLOW\src\services\hidroEngine.js:594:      null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:595:    c_en_funcion_cn: {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:596:      estado: "pendiente_motor",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:597:      criterio:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:598:        "Mantener en radar el cálculo del coeficiente C como función del Número de Curva CN."
  01_APP\HIDROFLOW\src\services\hidroEngine.js:599:    },
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:600:    observacion: racionalCompetente
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:601:      ? "El área de la cuenca está dentro del rango usual de aplicación referencial del Método Racional."
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:602:      : "Para esta cuenca, por área mayor a 5 km², el Método Racional no se adopta como método principal. Se conserva como contraste."
  01_APP\HIDROFLOW\src\services\hidroEngine.js:603:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:604:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:605:  // ------------------------------------------------------------
  01_APP\HIDROFLOW\src\services\hidroEngine.js:606:  // 7. Salida consolidada
  01_APP\HIDROFLOW\src\services\hidroEngine.js:607:  // ------------------------------------------------------------
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:608:  return {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:609:    cuenca: {
  01_APP\HIDROFLOW\src\services\hidroEngine.js:610:      id: params.id || null,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:611:      nombre: nombreCuenca,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:612:      punto_control: puntoControl,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:613:      area_km2: areaKm2,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:614:      pendiente_media_pct: pendienteMediaPct,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:615:      estado_tecnico:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:616:        params.estado_tecnico?.validacionGeomorfologica ||
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:617:        params.estado ||
  01_APP\HIDROFLOW\src\services\hidroEngine.js:618:        "en_validacion"
  01_APP\HIDROFLOW\src\services\hidroEngine.js:619:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:620:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:621:    idf: resumenIDF,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:622:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:623:    cn: resumenCN,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:624:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:625:    tc: resumenTc,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:626:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:627:    periodos_retorno: periodosRetorno,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:628:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:629:    racional: resumenRacional,
  01_APP\HIDROFLOW\src\services\hidroEngine.js:630:
  01_APP\HIDROFLOW\src\services\hidroEngine.js:631:    flags: {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:632:      ponderacion_idf_formal_pendiente: true,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:633:      c_racional_en_funcion_cn_pendiente: true,
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:634:      tc_adoptado_pendiente: true
  01_APP\HIDROFLOW\src\services\hidroEngine.js:635:    },
  01_APP\HIDROFLOW\src\services\hidroEngine.js:636:
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:637:    trazabilidad: {
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:638:      fuente: "resumenMotorHidrologico",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:639:      motor: "hidroEngine.js",
> 01_APP\HIDROFLOW\src\services\hidroEngine.js:640:      estado: "resumen_consolidado"
  01_APP\HIDROFLOW\src\services\hidroEngine.js:641:    }
  01_APP\HIDROFLOW\src\services\hidroEngine.js:642:  };
  01_APP\HIDROFLOW\src\services\hidroEngine.js:643:}



