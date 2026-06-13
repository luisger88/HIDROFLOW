# OT-0075B — Auditoría de ubicación visual del resumen estructural de hidrogramas

Fecha: 2026-06-12 21:47:21

## Estado base

- Rama: ot-0075-exposicion-controlada-resumen-estructural-hidrogramas.
- OT-0075A cerrada en commit 585c5c2.
- Main base: 6c9c1bf, posterior a OT-0074.
- Alcance: auditoría de ubicación visual, sin cambios funcionales.

## Objetivo

Auditar la ubicación visual más segura para exponer de forma controlada el resumen estructural de hidrogramas, sin duplicar el panel qSeries, sin invadir el Bloque Q-5 y sin mostrar series crudas.

## Archivo auditado

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx

## Patrones auditados


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:139:  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:140:  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:141:}), [metodos]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:142:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:143:// OT-0070D — Diagnóstico qSeries interno y silencioso
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:144:const diagnosticoQSeries = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:145:  try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:146:    return adaptarQSeriesHidrogramas(contextoBase?.hidrogramas, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:147:      fuente: "ComparadorMultiMetodo.contextoBase.hidrogramas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:148:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:149:  } catch (errorQSeries) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:150:    console.warn("Diagnóstico qSeries no invasivo no ejecutado:", errorQSeries);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:151:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:152:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:153:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:154:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:155:        total: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:156:        publicados: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:163:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:164:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:165:}, [contextoBase?.hidrogramas]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:166:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:167:// OT-0074F — Resumen estructural interno y silencioso de hidrogramas
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:168:const resumenEstructuraHidrogramas = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:169:  try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:170:    return resumirEstructuraHidrogramas(contextoBase?.hidrogramas);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:171:  } catch (errorResumenHidrogramas) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:172:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:173:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:174:      resumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:175:        tipoEntrada: "error",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:176:        contenedor: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:177:        totalCandidatos: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:178:        conSerieTemporal: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:179:        sinSerieTemporal: 0,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:180:        conQpico: 0,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:181:        conTPico: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:182:        conVolTotal: 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:183:      },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:184:      candidatos: [],
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:185:      error: String(errorResumenHidrogramas?.message ?? errorResumenHidrogramas)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:186:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:187:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:188:}, [contextoBase?.hidrogramas]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:189:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:190:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:191:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:192:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:193:  
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:623:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:624:  const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:625:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:626:  if (!bruto) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:627:    return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:628:      Qp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:629:      Tp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:630:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:631:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:632:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:633:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:634:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:635:  const candidatos = Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:636:    ? bruto
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:637:    : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:638:    ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:639:    : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:640:    ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:641:    : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:642:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:657:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:658:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:659:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:660:  if (!match) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:661:    return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:662:      Qp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:663:      Tp: null,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:664:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:665:      disponible: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:666:    };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:667:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:668:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:669:  return {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:670:    Qp: extraerNumero(match, ["Qp", "qp", "Qpico", "qPico", "q_pico", "caudalPico", "caudal_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:671:    Tp: extraerNumero(match, ["Tp", "tp", "tPico", "TPico", "t_pico", "tiempoPico", "tiempo_pico"]),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:672:    volumen: extraerNumero(match, ["volumen", "V", "vol", "volume", "volTotal", "vol_total", "volumenTotal"]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:673:    disponible: true,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:674:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:675:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:676:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:677:  const obtenerAuditoriaPendienteMetodo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:678:    if (metodo.tipo !== "tc") return null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:679:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:680:    return obtenerAuditoriaPendienteTc(metodo.id);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:681:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:682:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:683:  const renderVariablesSalida = (variablesSalida = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:684:    if (!Array.isArray(variablesSalida) || variablesSalida.length === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:696:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:697:  
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:698:  // OT-0067 — Adaptador de coherencia hidrológica (encapsulado)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:699:const clasificarCoherencia = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:700:  // OT-0067 — Adaptador de coherencia hidrológica
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:701:  const tpRaw = metodo?.tPico ?? metodo?.tp ?? metodo?.Tp;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:702:  const tp = Number(String(tpRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:703:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:704:  const tcRaw = contextoBase?.tc_global ?? contextoBase?.tc ?? contextoBase?.tcMin ?? 0;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:705:  const tc = Number(String(tcRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:706:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:707:  const nombre = String(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:708:    metodo?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:709:    metodo?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:710:    metodo?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:711:    ""
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:712:  ).toLowerCase();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:713:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:714:  // Regla explícita de seguridad por método crítico identificado en OT-0067
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:715:  if (nombre.includes("williams") || nombre.includes("hann")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:716:    return { etiqueta: "No coherente", color: "#dc2626" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:717:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:718:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:719:  if (!Number.isFinite(tp) || !Number.isFinite(tc) || tc === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:720:    return { etiqueta: "No evaluado", color: "#64748b" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:721:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:722:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:723:  const relacion = tp / tc;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:724:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:725:  if (relacion < 0.20) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:726:    return { etiqueta: "No coherente", color: "#dc2626" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:727:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:728:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:729:  if (nombre.includes("scs")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:730:    return { etiqueta: "Principal", color: "#16a34a" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:731:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:732:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:733:  if (nombre.includes("snyder")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:734:    return { etiqueta: "Coherente", color: "#22c55e" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:735:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:798:    padding: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:799:    margin: "10px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:800:    background: "rgba(15,23,42,0.5)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:801:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:802:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:803:  <strong>Estado global del modelo:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:804:  <span
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:805:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:806:      padding: "2px 8px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:807:      borderRadius: 6,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:808:      background: estadoGlobal.color,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:809:      color: "#fff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:810:      marginLeft: 6,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:811:      fontSize: "12px"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:812:    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:813:  >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:814:    {estadoGlobal.etiqueta}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:815:  </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:816:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:817:  <div style={{ fontSize: "12px", opacity: 0.7, marginTop: 4 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:818:    Evaluación basada en coherencia Tc–Tp–Qp–Volumen.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:819:  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:820:</section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:821:        <h2 style={estilos.bloqueTitulo}>{titulo}</h2>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:822:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:823:        <div style={estilos.tablaWrap}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:824:          <table style={estilos.tabla}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:825:            <thead>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:826:              <tr>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:827:                <th style={estilos.th}>Método</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:828:                <th style={estilos.th}>Estado</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:829:                <th style={estilos.th}>Competencia</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:830:                <th style={estilos.th}>Escala</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:831:                <th style={estilos.th}>Requiere</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:832:                <th style={estilos.th}>Salida</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:833:                <th style={estilos.th}>Tc calculado (min)</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:834:                <th style={estilos.th}>Pendiente auditada</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:835:                <th style={estilos.th}>Qp</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:836:                <th style={estilos.th}>Tp</th>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:837:                <th style={estilos.th}>Volumen</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:838:                <th style={estilos.th}>Observación técnica</th>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:839:              </tr>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:840:            </thead>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:841:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:842:            <tbody>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:843:              {datos.map((metodo) => (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:844:                <tr key={metodo.id}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:845:                  <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:846:                    <div style={estilos.nombreMetodo}>{metodo.nombre}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:847:                    <div style={{ color: "#88a7bd", marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:848:                      {metodo.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:849:                    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:921:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:922:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:923:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:924:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:925:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:926:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:927:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:928:    if (!Number.isFinite(resultadoQ.Qp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:929:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:930:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:931:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:932:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:933:      <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:934:        {resultadoQ.Qp.toFixed(2)} m³/s
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:935:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:936:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:937:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:938:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:939:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:940:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:941:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:942:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:943:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:944:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:945:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:946:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:947:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:948:    if (!Number.isFinite(resultadoQ.Tp)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:949:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:950:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:951:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:952:    const tcReferencia = Number(Tc_final);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:953:    const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:954:      Number.isFinite(tcReferencia) && tcReferencia > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:955:        ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:956:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:957:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:958:    const alertaTcTp =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:959:      tpRel !== null && (tpRel < 0.5 || tpRel > 1.5);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:960:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:961:    const estadoTemporal =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:962:      tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:963:        ? "sin referencia temporal"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:964:        : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:965:        ? "respuesta rápida"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:966:        : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:967:        ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:968:        : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:969:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:970:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:971:      <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:972:        <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:973:          {resultadoQ.Tp.toFixed(2)} min
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:974:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:975:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:976:          Tp/Tc: {tpRel !== null ? tpRel.toFixed(2) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? (resultadoQ.volumen / resultadoQ.Qp / 
60).toFixed(0) + " min" : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:977:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:978:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:979:          Estado temporal: {estadoTemporal}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:980:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:981:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:982:          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:983:            ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:984:            : metodo.nombre?.includes("SCS Mod")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:985:            ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:986:            : metodo.nombre?.includes("Snyder")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:987:            ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:988:            : metodo.nombre?.includes("Williams")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:989:            ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:990:            : metodo.nombre?.includes("Clark")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:991:            ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:992:            : `método comparativo; ${estadoTemporal}.`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:993:        </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:994:        {alertaTcTp ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:995:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:996:            ⚠ Alerta Tc/Tp
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:997:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:998:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:999:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1000:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1001:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1002:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1003:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1004:<td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1005:  {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1006:    if (metodo.tipo !== "q") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1007:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1008:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1009:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1010:    const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1011:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1012:    if (!Number.isFinite(resultadoQ.volumen)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1013:      return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1014:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1015:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1016:    const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1017:    const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1018:    const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1019:      Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1020:        ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1021:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1022:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1023:    const relacionVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1024:      volumenEsperadoM3 && volumenEsperadoM3 > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1025:        ? resultadoQ.volumen / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1026:        : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1027:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1028:    const estadoEscalaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1029:      relacionVolumen === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1030:        ? null
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1031:        : relacionVolumen <= 2
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1032:        ? "escala razonable"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1033:        : relacionVolumen <= 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1034:        ? "revisar escala"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1035:        : "fuera de escala";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1036:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1037:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1038:      <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1039:        <span style={estilos.chip}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1040:          {resultadoQ.volumen.toFixed(2)}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1041:        </span>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1042:        {estadoEscalaVolumen ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1043:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1044:            {estadoEscalaVolumen} · {relacionVolumen.toFixed(1)}x
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1045:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1046:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1047:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1048:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1049:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1050:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1051:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1052:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1053:                  <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1054:                   <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1055:                     style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1056:                     borderLeft: "3px solid rgba(34, 211, 238, 0.75)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:        </article>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:      </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:      <div style={estilos.nota}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:  <strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:  HidroFlow a partir de los hidrogramas calculados. El comparador no recalcula
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:  hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:  automáticamente ningún método. La adopción final requiere criterio técnico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:  competencia hidrológica y trazabilidad explícita.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1472:<div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1473:  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1474:    marginTop: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:    border: "1px solid rgba(239, 68, 68, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:    background: "rgba(127, 29, 29, 0.18)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:    borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479:    color: "#fecaca",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1480:    fontSize: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:    lineHeight: 1.5,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1482:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1485:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1486:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1487:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1488:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1489:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1490:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1491:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1492:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1493:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1494:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1495:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. 
La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1496:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1497:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1498:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1499:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1500:          const textoResumenQ5 = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1501:            "# Resumen técnico Q-5 post auditoría",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1502:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1503:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1504:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1505:            "Síntesis:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1506:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1507:            "- SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1508:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1509:            "- Masa y volumen: controlados frente a la referencia física.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1510:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1511:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1512:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1513:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1514:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1515:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1516:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517:            "- No se recalculan hidrogramas.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1518:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1519:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1520:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1521:            "Herramienta: HidroFlow.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1522:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1523:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1524:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1525:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1526:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1527:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1528:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1529:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1530:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1562:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1563:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1564:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1565:          const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1566:          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1567:          const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1568:            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1569:              ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1570:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1571:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1572:          const formatearNumeroExpediente = (valor, decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1573:            if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1574:              return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1577:            const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1578:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:            return Number.isFinite(numero)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:              : "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1585:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1586:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:          const obtenerEstadoTemporalExpediente = (resultadoQ) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1588:            const tcReferencia = Number(Tc_final);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1589:            const tpRel =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1590:              Number.isFinite(resultadoQ?.Tp) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1591:              Number.isFinite(tcReferencia) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:              tcReferencia > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:                ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:            return tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:              ? "sin referencia temporal"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:              : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:              ? "respuesta rápida"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:              : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:              ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:              : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            metodo.nombre?.includes("SCS Unit")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:              : metodo.nombre?.includes("SCS Mod")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:              : metodo.nombre?.includes("Snyder")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1611:              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1612:              : metodo.nombre?.includes("Williams")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1613:              ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1614:              : metodo.nombre?.includes("Clark")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1615:              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1616:              : `método comparativo; ${estadoTemporal}.`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1617:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:          const metodosQ5Expediente = metodos.filter(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1619:            (metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1620:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:          const obtenerCandidatosQ5Contexto = () => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1637:            const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1638:            const dictamen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1639:              dictamenMetodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1640:              obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1641:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1642:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | 
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663:                h?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1664:                h?.id ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665:                "Método Q-5";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:              const resultadoQ = {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:                Qp:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:                  h?.Qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:                  h?.qp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:                  h?.Qpico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:                  h?.qPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:                  h?.q_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:                  h?.caudalPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:                  h?.caudal_pico,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:                Tp:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:                  h?.Tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:                  h?.tp ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:                  h?.tPico ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:                  h?.TPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:                  h?.t_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1682:                  h?.tiempoPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1683:                  h?.tiempo_pico,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1684:                volumen:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1685:                  h?.volumen ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1686:                  h?.V ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1687:                  h?.vol ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1688:                  h?.volume ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1689:                  h?.volTotal ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1690:                  h?.vol_total ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1691:                  h?.volumenTotal
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1693:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1694:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1695:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1696:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1697:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1698:          const filasQ5Markdown =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1699:            filasQ5DesdeCatalogo.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1700:              ? filasQ5DesdeCatalogo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1701:              : filasQ5DesdeContexto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1702:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1703:          const tablaQ5Markdown = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1704:            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1705:            "|---|---:|---:|---:|---|---|",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1706:            ...filasQ5Markdown
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1707:          ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1708:          const estacionIdfExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1709:            contextoBase?.estacion_idf,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1710:            contextoBase?.estacionIDF,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1711:            contextoBase?.estacion,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1712:            contextoBase?.nombre_estacion,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1713:            contextoBase?.idf?.nombre,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1714:            contextoBase?.idf?.estacion
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1715:          ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1716:            .map((valor) => String(valor ?? "").trim())
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1727:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1728:          if (!Number.isFinite(peTotalMm)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1729:            faltantesExpediente.push("Lluvia efectiva total");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1730:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1731:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1732:          if (!Number.isFinite(volumenEsperadoM3)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1733:            faltantesExpediente.push("Volumen esperado");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1734:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1735:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1736:          if (!Array.isArray(filasQ5Markdown) || filasQ5Markdown.length === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1737:            faltantesExpediente.push("Tabla Q-5 auditada con filas reales");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1738:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1739:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1740:          if (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1741:            !Array.isArray(contextoBase?.metodo_racional?.resultados) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1742:            contextoBase.metodo_racional.resultados.length === 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1743:          ) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1744:            faltantesExpediente.push("Tabla Método Racional");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1745:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1779:                  String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1780:                ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1781:                metodosQ5Expediente[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1782:                null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1783:              const resultadoQ5PrincipalConsistencia = metodoQ5PrincipalConsistencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784:                ? obtenerResultadoQMetodo(metodoQ5PrincipalConsistencia)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1785:                : null;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1786:              const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalConsistencia?.volumen);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1787:              const relacionVolumenQ5Esperado =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1788:                Number.isFinite(volumenQ5PrincipalM3) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1789:                Number.isFinite(volumenEsperadoM3) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1790:                volumenEsperadoM3 > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1791:                  ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1792:                  : null;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1793:              const estadoConsistenciaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1794:                relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1795:                  ? "no evaluada"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1796:                  : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1797:                  ? "superada"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1798:                  : relacionVolumenQ5Esperado >= 0.80 && relacionVolumenQ5Esperado <= 1.20
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1799:                  ? "requiere revisión menor"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1800:                  : "requiere revisión técnica";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1801:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1802:          const textoExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1803:            "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1804:            "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1805:            "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1806:            "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1807:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1808:            "## 1. Identificación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1809:            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1810:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1828:            "- Tc operativo Q(t): ruta interna del hidrograma.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1829:            "- Duración evento: 3 h para almacenamiento/regulación.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1830:            "- Lag / forma SCS: parámetro derivado para forma temporal.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1831:            "- Tc comparador: referencia especializada para coherencia Q-5.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1832:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1833:            "## 4. Volumen de referencia",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1834:            `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1835:            `Volumen esperado: ${volumenEsperadoM3 ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1836:            "Fórmula: Pe(mm) × Área(km²) × 1000.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1837:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1838:                "## 5. Escenario Q-Tr activo — control de trazabilidad",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1839:                `Estado: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1840:                `Tr activo: ${formatearValorQTrExpediente(qTrActivoExpediente.tr_activo, " años", 2)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1841:                `Estación IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.estacion_idf)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1842:                `Método IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.metodo_idf)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1843:                `Distribución temporal: ${formatearValorQTrExpediente(qTrActivoExpediente.distribucion_temporal)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1844:                `Área: ${formatearValorQTrExpediente(qTrActivoExpediente.area_km2, " km²", 4)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1845:                `CN efectivo: ${formatearValorQTrExpediente(qTrActivoExpediente.cn_efectivo, "", 2)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1846:                `S: ${formatearValorQTrExpediente(qTrActivoExpediente.s_mm, " mm", 2)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1847:                `Ia: ${formatearValorQTrExpediente(qTrActivoExpediente.ia_mm, " mm", 2)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1855:            "## 6. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1856:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1857:            "SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1858:            "SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1859:            "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1860:            "Masa y volumen: controlados frente a referencia física.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1861:            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1862:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1863:            "Tabla Q-5 auditada:",
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1889:                  "Estado: sección informativa; consultar módulo Método Racional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1890:                ]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1891:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1892:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1893:            "## 8. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1894:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1895:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1896:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1897:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1898:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1899:            "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1900:            `Pe total: ${Number.isFinite(peTotalMm) ? peTotalMm.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + " mm" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1901:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + " km²" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1902:            `Volumen esperado: ${Number.isFinite(volumenEsperadoM3) ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1903:            `Método Q-5 principal: ${metodoQ5PrincipalConsistencia?.nombre ?? "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1904:            `Volumen Q-5 principal: ${Number.isFinite(volumenQ5PrincipalM3) ? volumenQ5PrincipalM3.toLocaleString("es-CO", { maximumFractionDigits: 2 }) + " m³" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1905:            `Relación volumen Q-5 / volumen esperado: ${relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1906:            `Resultado de consistencia volumétrica: ${estadoConsistenciaVolumen}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1907:            `Q-Tr activo: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1908:            "Q-5 auditado: presente como bloque no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1909:            "Método Racional: presente como contraste global independiente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1910:            "Lectura técnica: control interno preliminar; no reemplaza revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1911:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1912:            "## 10. Validación interna del expediente exportado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1913:            "Estado de validación estructural: control previo al portapapeles aplicado.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1914:            "Control de tokens inválidos: activo mediante validador interno del expediente copiado.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1915:            "Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, restricciones y sello técnico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1916:            "Q-Tr activo: trazado desde q_tr_activo_estado y verificado como sección exportable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1917:            "Q-5 auditado: presente como bloque de hidrogramas no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1918:            "Método Racional: presente como contraste global independiente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1932:            "## 12. Restricciones y advertencias técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1933:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1934:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1935:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1936:            "- No se recalculan hidrogramas en este expediente.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1937:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1938:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1939:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1940:          try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1941:            const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1942:              fuenteExpediente: "ComparadorMultiMetodo.textoExpediente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1943:              origenPlantilla: "OT-0064",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1944:              cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1945:            });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1946:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1947:            if (!diagnosticoDocumentalExpediente.ok) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1948:              console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1949:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1961:                "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1962:                "## 5. Escenario Q-Tr activo — control de trazabilidad",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1963:                "## 6. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1964:                "## 7. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1965:                "## 8. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1966:                "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1967:                "## 10. Validación interna del expediente exportado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1968:                "## 11. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1969:                "## 12. Restricciones y advertencias técnicas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1970:              ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1971:              const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1972:                !textoExpediente.includes(seccion)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1973:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1974:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1975:              if (tokensDetectadosExpediente.length > 0 || seccionesFaltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1976:                window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1977:                  [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1978:                    "Validación del expediente copiado fallida.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2028:        Copiar expediente hidrológico mínimo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2029:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2030:      {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2031:        const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2032:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2033:        const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2034:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2035:            ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2036:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2037:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2038:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2039:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2040:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2041:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2042:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2043:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2044:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2045:      {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2046:  try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2047:    const diagnostico = adaptarExpedienteDocumental(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2048:      "Expediente hidrológico mínimo",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2049:      {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2050:        fuenteExpediente: "ComparadorMultiMetodo.render",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2051:        origenPlantilla: "OT-0066",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2052:        cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2086:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2087:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2088:          {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2089:            const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2090:            const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2091:            const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2092:              Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2093:                ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2094:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2095:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2096:            const metodosQ5Panel = metodos.filter((metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2097:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2098:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2099:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2100:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2101:            const metodoQ5PrincipalPanel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2102:              metodosQ5Panel.find((metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2103:                String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2104:              ) ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2105:              metodosQ5Panel[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2106:              null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2107:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2108:            const resultadoQ5PrincipalPanel = metodoQ5PrincipalPanel
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2109:              ? obtenerResultadoQMetodo(metodoQ5PrincipalPanel)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2110:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2111:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2112:            const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalPanel?.volumen);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2113:            const relacionVolumenQ5Esperado =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2114:              Number.isFinite(volumenQ5PrincipalM3) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2115:              Number.isFinite(volumenEsperadoM3) &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2116:              volumenEsperadoM3 > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2117:                ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2118:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2119:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2120:            const estadoConsistenciaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2121:              relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2122:                ? "no evaluada"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2123:                : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2124:                ? "superada"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2125:                : relacionVolumenQ5Esperado >= 0.80 && relacionVolumenQ5Esperado <= 1.20
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2126:                ? "requiere revisión menor"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2127:                : "requiere revisión técnica";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2128:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2129:            const estadoQTrActivo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2130:              contextoBase?.q_tr_activo_estado?.estado ?? "no_publicado";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2131:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2132:            const colorBorde =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2133:              estadoConsistenciaVolumen === "superada"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2134:                ? "#16a34a"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2135:                : estadoConsistenciaVolumen === "requiere revisión menor"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2136:                ? "#a16207"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2137:                : "#991b1b";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2138:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2139:            const formato = (valor, decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2140:              const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2141:              return Number.isFinite(numero)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2142:                ? numero.toLocaleString("es-CO", { maximumFractionDigits: decimales })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2143:                : "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2144:            };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2145:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2146:            return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2147:              <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2156:                <h3 style={{ margin: "0 0 8px 0" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2157:                  Panel visual de consistencia cruzada OT-0058
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2158:                </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2159:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2160:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2161:                  Control Pe–Área–Volumen/Q-5 visible antes de copiar el expediente. No recalcula hidrogramas, no modifica Q-5 y no adopta resultados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2162:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2163:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2164:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2165:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2166:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2167:                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2168:                    gap: 8
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2169:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2170:                >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2171:                  <div><strong>Pe total:</strong> {formato(peTotalMm, 4)} mm</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2172:                  <div><strong>Área:</strong> {formato(areaKm2, 4)} km²</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2173:                  <div><strong>Volumen esperado:</strong> {formato(volumenEsperadoM3, 0)} m³</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2174:                  <div><strong>Método Q-5 principal:</strong> {metodoQ5PrincipalPanel?.nombre ?? "—"}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2175:                  <div><strong>Volumen Q-5 principal:</strong> {formato(volumenQ5PrincipalM3, 2)} m³</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2176:                  <div><strong>Relación Q-5/esperado:</strong> {relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2177:                  <div><strong>Resultado:</strong> {estadoConsistenciaVolumen}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2178:                  <div><strong>Q-Tr activo:</strong> {estadoQTrActivo}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2179:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2180:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2181:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2182:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2183:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2184:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como 
métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2185:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2186:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2187:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2188:        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2189:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2190:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2191:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2192:        ⚠ Control de magnitud pendiente: Qp, Tp y Volumen se muestran como resultados no adoptivos hasta validar unidades, integración y escala hidrológica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2193:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2194:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2195:          {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2196:            const estadoQTrActivo = contextoBase?.q_tr_activo_estado ?? null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2197:            const qTrActivo = estadoQTrActivo?.q_tr_activo ?? {};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2198:            const faltantesQTrActivo = Array.isArray(estadoQTrActivo?.campos_faltantes)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2199:              ? estadoQTrActivo.campos_faltantes
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2200:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2201:            const disponibleQTrActivo = estadoQTrActivo?.disponible === true;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2202:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2203:            const formatearValorQTr = (valor, sufijo = "") => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2204:              if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2265:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2266:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2267:          })()}
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2279:          resumenQSeries.inconsistentes > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2280:            ? { etiqueta: "Inconsistente", color: "#dc2626" }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2281:            : resumenQSeries.publicados > 0 && (resumenQSeries.parciales > 0 || resumenQSeries.noDisponibles > 0)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2282:            ? { etiqueta: "Parcial", color: "#f59e0b" }
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2331:            <div style={{ ...estilos.muted, marginTop: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2332:              Este panel no muestra qSeries cruda y no modifica Qp, Tp, Volumen ni Q(t).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2333:            </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2334:          </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2335:        );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2336:      })()}
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2337:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2338:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2339:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2340:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2341:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2342:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2343:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2344:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2345:



## Lectura preliminar

La ubicación candidata debe estar dentro del panel qSeries existente o inmediatamente asociada a él, como ampliación controlada de diagnóstico estructural. No debe crearse un panel grande adicional ni ubicarse dentro de la tabla Q-5.

La exposición futura debe limitarse a conteos agregados de resumenEstructuraHidrogramas.resumen.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0075B.
- No modificar HidroFlow.jsx.
- No modificar hidroEngine.js.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No calcular De, W50, W25, pendientes ni asimetría.
- No modificar flujo de copiado.

## Criterio de salida

OT-0075B queda completa cuando exista auditoría versionada de ubicación visual del resumen estructural, sin cambios funcionales sobre la aplicación.
