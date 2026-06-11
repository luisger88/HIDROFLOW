# OT-0059B — Extracto del constructor real del expediente exportable

Archivo inspeccionado: 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx
Fecha: 2026-06-10 19:38:58

## Coincidencias con contexto


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:97: // ✅ BLOQUE CONSISTENTE DE MÉTODOS
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:98:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:99:const metodos = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:100:  if (!evaluacionCompetencia) return [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:101:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:102:  const base = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:103:    ...evaluacionCompetencia.tc.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:104:      ...m,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:105:      bloque: "Tc-15"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:106:    })),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:107:    ...evaluacionCompetencia.q.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:108:      ...m,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:109:      bloque: "Q-5"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:110:    }))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:111:  ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:112:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:113:  return base.filter(m => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:114:    const pasaEstado =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:115:      filtroEstado === "todos" ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:116:      m.estadoImplementacion === filtroEstado;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:117:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:118:    const pasaTipo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:119:      filtroTipo === "todos" ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:120:      m.tipo === filtroTipo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:121:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:122:    return pasaEstado && pasaTipo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:123:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:124:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:125:}, [evaluacionCompetencia, filtroEstado, filtroTipo]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:126:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:127:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:793:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:794:      <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:795:        <span style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:796:          {resultadoQ.Tp.toFixed(2)} min
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:797:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:798:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:799:          Tp/Tc: {tpRel !== null ? tpRel.toFixed(2) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? (resultadoQ.volumen / 
resultadoQ.Qp / 60).toFixed(0) + " min" : "—"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:800:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:801:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:802:          Estado temporal: {estadoTemporal}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:803:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:804:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:805:          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:806:            ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:807:            : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:808:            ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:809:            : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:810:            ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:811:            : metodo.nombre?.includes("Williams")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:812:            ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:813:            : metodo.nombre?.includes("Clark")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:814:            ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:815:            : `método comparativo; ${estadoTemporal}.`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:816:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:817:        {alertaTcTp ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:818:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:819:            ⚠ Alerta Tc/Tp
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:820:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:821:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:822:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:823:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1110:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1111:      ))}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1112:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1113:  )}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1114:</section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1115:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1116:        <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1117:          <h1 style={estilos.titulo}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1118:            Comparador Hidrológico Multi-Método
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1119:          </h1>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1120:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1121:          <p style={estilos.subtitulo}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1122:            Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1123:            tiempos de respuesta, caudales pico e hidrogramas. Este módulo no
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1124:            adopta automáticamente resultados; organiza sensibilidad, competencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1125:            y trazabilidad para soporte de expediente técnico.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1126:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1127:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1128:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1129:        <div style={estilos.version}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1130:           {resumenComparadorCatalogo.version} · Fuente: {fuenteContexto}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1131:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1132:      </header>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1133:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1134:      <section style={estilos.gridResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1135:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1136:          <p style={estilos.numeroResumen}>{conteo.total}</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1137:          <p style={estilos.etiquetaResumen}>Métodos visibles</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1138:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1139:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1140:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1141:          <p style={estilos.numeroResumen}>{conteo.tc}</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1142:          <p style={estilos.etiquetaResumen}>Métodos Tc</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1143:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1256:>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1257:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1258:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1259:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1260:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1261:  internos de cada hidrograma unitario. Los resultados se muestran como
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1262:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1263:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1264:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1265:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1266:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1267:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1268:        Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como 
comparativos/referenciales. La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1269:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1270:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1271:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1272:        onClick={() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1273:          const textoResumenQ5 = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1274:            "# Resumen técnico Q-5 post auditoría",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1275:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1276:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1277:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1278:            "Síntesis:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1279:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1280:            "- SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1281:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1282:            "- Masa y volumen: controlados frente a la referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1283:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1285:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1286:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1287:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1288:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1289:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1290:            "- No se recalculan hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1291:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1292:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1293:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1294:            "Herramienta: HidroFlow.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1295:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1296:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1297:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1298:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1299:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1300:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1301:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1302:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1303:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1304:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1305:          const areaTextoResumen = document.createElement("textarea");
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1306:          areaTextoResumen.value = textoResumenQ5;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1307:          areaTextoResumen.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1308:          areaTextoResumen.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1309:          areaTextoResumen.style.left = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1310:          areaTextoResumen.style.top = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1311:          document.body.appendChild(areaTextoResumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1312:          areaTextoResumen.focus();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1313:          areaTextoResumen.select();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1314:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1315:          let resumenCopiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1316:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1317:          try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1318:            resumenCopiado = document.execCommand("copy");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1319:          } catch {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1320:            resumenCopiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1321:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1322:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1323:          document.body.removeChild(areaTextoResumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1324:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1325:          if (resumenCopiado) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1326:            window.alert("Resumen técnico Q-5 copiado al portapapeles.");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1327:          } else {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1328:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el resumen técnico Q-5:", textoResumenQ5);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1329:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1330:        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1331:        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px" }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1332:      >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1333:        Copiar resumen técnico Q-5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1334:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1335:      <button
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1336:        type="button"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1337:        onClick={() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1338:          const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1339:          const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1340:          const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1341:            Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1342:              ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1343:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1344:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1345:          const formatearNumeroExpediente = (valor, decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1346:            if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1347:              return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1348:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1349:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1350:            const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1351:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1352:            return Number.isFinite(numero)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1353:              ? numero.toLocaleString("es-CO", {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1354:                  minimumFractionDigits: decimales,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1355:                  maximumFractionDigits: decimales
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1356:                })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1357:              : "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1358:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1359:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1360:          const obtenerEstadoTemporalExpediente = (resultadoQ) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1361:            const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1362:            const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1363:              Number.isFinite(resultadoQ?.Tp) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1364:              Number.isFinite(tcReferencia) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1365:              tcReferencia > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1366:                ? resultadoQ.Tp / tcReferencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1367:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1368:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1369:            return tpRel === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1370:              ? "sin referencia temporal"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1371:              : tpRel < 0.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1372:              ? "respuesta rápida"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1373:              : tpRel <= 1.5
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1374:              ? "rango temporal razonable"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1375:              : "respuesta retardada";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1376:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1377:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1378:          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1379:            metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1380:              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1381:              : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1382:              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1383:              : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1384:              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1385:              : metodo.nombre?.includes("Williams")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1386:              ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1387:              : metodo.nombre?.includes("Clark")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1388:              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1389:              : `método comparativo; ${estadoTemporal}.`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1390:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1391:          const metodosQ5Expediente = metodos.filter(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1392:            (metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1393:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1394:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1395:          );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1396:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1397:          const obtenerCandidatosQ5Contexto = () => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1398:            const bruto = contextoBase?.hidrogramas;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1399:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1400:            return Array.isArray(bruto)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1401:              ? bruto
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1402:              : Array.isArray(bruto?.metodos)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1403:              ? bruto.metodos
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1404:              : Array.isArray(bruto?.resultados)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1405:              ? bruto.resultados
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1406:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1407:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1408:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1409:          const construirFilaQ5Expediente = (nombreMetodo, resultadoQ, dictamenMetodo = null) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1410:            const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1411:            const dictamen =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1412:              dictamenMetodo ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413:              obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1414:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415:            return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | 
${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1416:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1417:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1419:            .map((metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1420:              const resultadoQ = obtenerResultadoQMetodo(metodo);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1421:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1422:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1423:              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1424:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1425:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1426:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1427:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1428:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1429:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1430:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1431:            .map((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1432:              const nombreMetodo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1433:                h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1434:                h?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1435:                h?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1436:                h?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1437:                h?.id ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1438:                "Método Q-5";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1439:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1440:              const resultadoQ = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1441:                Qp:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1442:                  h?.Qp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1443:                  h?.qp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1444:                  h?.Qpico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1445:                  h?.qPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1446:                  h?.q_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1447:                  h?.caudalPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1448:                  h?.caudal_pico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1449:                Tp:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1450:                  h?.Tp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1451:                  h?.tp ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1452:                  h?.tPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1453:                  h?.TPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1454:                  h?.t_pico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1455:                  h?.tiempoPico ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1456:                  h?.tiempo_pico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1457:                volumen:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1458:                  h?.volumen ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1459:                  h?.V ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:                  h?.vol ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:                  h?.volume ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:                  h?.volTotal ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:                  h?.vol_total ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:                  h?.volumenTotal
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1468:            })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1469:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1470:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471:          const filasQ5Markdown =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1472:            filasQ5DesdeCatalogo.length > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1473:              ? filasQ5DesdeCatalogo
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1474:              : filasQ5DesdeContexto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1475:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476:          const tablaQ5Markdown = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1477:            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1478:            "|---|---:|---:|---:|---|---|",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479:            ...filasQ5Markdown
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1480:          ];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:          const estacionIdfExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1482:            contextoBase?.estacion_idf,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:            contextoBase?.estacionIDF,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:            contextoBase?.estacion,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1485:            contextoBase?.nombre_estacion,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1486:            contextoBase?.idf?.nombre,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1487:            contextoBase?.idf?.estacion
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1488:          ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1489:            .map((valor) => String(valor ?? "").trim())
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1490:            .find((valor) => valor && valor !== "—") ?? "SAN CRISTOBAL";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1491:          const faltantesExpediente = [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1492:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1493:          if (!estacionIdfExpediente) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1494:            faltantesExpediente.push("Estación IDF");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1495:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1496:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1497:          if (!Number.isFinite(areaKm2)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1498:            faltantesExpediente.push("Área de cuenca");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1499:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1500:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1501:          if (!Number.isFinite(peTotalMm)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1502:            faltantesExpediente.push("Lluvia efectiva total");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1503:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1504:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1505:          if (!Number.isFinite(volumenEsperadoM3)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1506:            faltantesExpediente.push("Volumen esperado");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1507:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1508:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1509:          if (!Array.isArray(filasQ5Markdown) || filasQ5Markdown.length === 0) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1510:            faltantesExpediente.push("Tabla Q-5 auditada con filas reales");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1511:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1512:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1513:          if (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1514:            !Array.isArray(contextoBase?.metodo_racional?.resultados) ||
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1515:            contextoBase.metodo_racional.resultados.length === 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1516:          ) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517:            faltantesExpediente.push("Tabla Método Racional");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1518:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1519:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1520:          if (faltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1521:            window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1522:              [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1523:                "Expediente hidrológico mínimo incompleto.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1524:                "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1525:                "Antes de copiar el expediente firmado, publique el contexto hidrológico completo desde Hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1526:                "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1527:                "Faltan:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1528:                ...faltantesExpediente.map((item) => `- ${item}`)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1529:              ].join("\n")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1530:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1531:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1532:            return;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1533:          }
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1534:          const trDisenoActivoExpediente = Number.isFinite(Number(contextoBase?.tr_diseno_activo))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1535:            ? Number(contextoBase.tr_diseno_activo)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1536:            : 25;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1537:              const estadoQTrActivoExpediente = contextoBase?.q_tr_activo_estado ?? null;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1538:              const qTrActivoExpediente = estadoQTrActivoExpediente?.q_tr_activo ?? {};
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1539:              const faltantesQTrActivoExpediente = Array.isArray(estadoQTrActivoExpediente?.campos_faltantes)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1540:                ? estadoQTrActivoExpediente.campos_faltantes
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1541:                : [];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1542:              const formatearValorQTrExpediente = (valor, sufijo = "", decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1543:                if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1544:                const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1545:                if (Number.isFinite(numero) && String(valor).trim() !== "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1546:                  return numero.toLocaleString("es-CO", { maximumFractionDigits: decimales }) + sufijo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1547:                }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1548:                return String(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1549:              };
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1550:              const metodoQ5PrincipalConsistencia =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1551:                metodosQ5Expediente.find((metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1552:                  String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1553:                ) ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1554:                metodosQ5Expediente[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1555:                null;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:              const resultadoQ5PrincipalConsistencia = metodoQ5PrincipalConsistencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:                ? obtenerResultadoQMetodo(metodoQ5PrincipalConsistencia)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1558:                : null;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1559:              const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalConsistencia?.volumen);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1560:              const relacionVolumenQ5Esperado =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1561:                Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1562:                Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1563:                volumenEsperadoM3 > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1564:                  ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1565:                  : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1566:              const estadoConsistenciaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1567:                relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1568:                  ? "no evaluada"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1569:                  : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1570:                  ? "superada"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1571:                  : relacionVolumenQ5Esperado >= 0.80 && relacionVolumenQ5Esperado <= 1.20
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1572:                  ? "requiere revisión menor"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1573:                  : "requiere revisión técnica";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1574:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:          const textoExpediente = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576:            "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1577:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1578:            "## 1. Identificación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:            `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:            `Estación IDF: ${estacionIdfExpediente}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:            `Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:            `Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1585:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1586:            "## 2. Parámetros hidrológicos base",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:            `CN: ${contextoBase?.CN ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1588:            `CN base: ${contextoBase?.CN_base ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1589:            `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1590:            `AMC: ${contextoBase?.AMC ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1591:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:            "## 3. Tiempo de concentración y roles Tc",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:            "Roles Tc:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1597:            "- Tc global Índice: referencia hidrológica general.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1598:            "- Tc operativo Q(t): ruta interna del hidrograma.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1599:            "- Duración evento: 3 h para almacenamiento/regulación.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1600:            "- Lag / forma SCS: parámetro derivado para forma temporal.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601:            "- Tc comparador: referencia especializada para coherencia Q-5.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1602:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1603:            "## 4. Volumen de referencia",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1604:            `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1605:            `Volumen esperado: ${volumenEsperadoM3 ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1606:            "Fórmula: Pe(mm) × Área(km²) × 1000.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1607:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608:                "## Escenario Q-Tr activo — control de trazabilidad",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1609:                `Estado: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1610:                `Tr activo: ${formatearValorQTrExpediente(qTrActivoExpediente.tr_activo, " años", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1611:                `Estación IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.estacion_idf)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1612:                `Método IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.metodo_idf)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1613:                `Distribución temporal: ${formatearValorQTrExpediente(qTrActivoExpediente.distribucion_temporal)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1614:                `Área: ${formatearValorQTrExpediente(qTrActivoExpediente.area_km2, " km²", 4)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1615:                `CN efectivo: ${formatearValorQTrExpediente(qTrActivoExpediente.cn_efectivo, "", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1616:                `S: ${formatearValorQTrExpediente(qTrActivoExpediente.s_mm, " mm", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1617:                `Ia: ${formatearValorQTrExpediente(qTrActivoExpediente.ia_mm, " mm", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:                `Impermeabilidad: ${formatearValorQTrExpediente(qTrActivoExpediente.porcentaje_impermeable, " %", 2)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1619:                `Tc: ${formatearValorQTrExpediente(qTrActivoExpediente.tc_min, " min", 4)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1620:                `Pe total: ${formatearValorQTrExpediente(qTrActivoExpediente.lluvia_efectiva_total_mm, " mm", 4)}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:                `Campos mínimos: ${faltantesQTrActivoExpediente.length > 0 ? "faltantes — " + faltantesQTrActivoExpediente.join(", ") : "completos"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:                `Fuente: ${estadoQTrActivoExpediente?.fuente ?? "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:                "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:                "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:            "## 5. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:            "Estado general: diagnóstico no adoptivo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:            "SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:            "SCS Mod.: variante ajustable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:            "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:            "Masa y volumen: controlados frente a referencia física.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:            "Tabla Q-5 auditada:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1634:            ...tablaQ5Markdown,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1635:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1636:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1637:            "## 6. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1638:            "Uso: contraste global independiente de caudal pico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1639:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1640:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1641:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1642:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1643:              ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1644:                  `Tc racional exportado: ${
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1645:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1646:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1647:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1648:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1649:                  "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1650:                  "Tabla Método Racional:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1651:                  "| Tr | I | P | C | Q |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1652:                  "|---:|---:|---:|---:|---:|",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1653:                  ...contextoBase.metodo_racional.resultados.map((r) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1654:                    `| ${r.Tr} | ${formatearNumeroExpediente(r.I)} mm/h | ${formatearNumeroExpediente(r.P)} mm | ${formatearNumeroExpediente(r.C, 4)} | ${formatearNumeroExpediente(r.Q)} m³/s |`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1655:                  )
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1656:                ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1657:              : [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1658:                  "Disponibilidad: resultados no disponibles en el contexto exportable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1659:                  "Estado: sección informativa; consultar módulo Método Racional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1660:                ]),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1661:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1662:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663:            "## 7. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1664:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1667:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1668:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:            "## 8. Restricciones técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:            "- No se modifica el motor hidrológico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:            "- No se recalculan hidrogramas en este expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:            "## Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:            `Pe total: ${Number.isFinite(peTotalMm) ? peTotalMm.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + " mm" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + " km²" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:            `Volumen esperado: ${Number.isFinite(volumenEsperadoM3) ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:            `Método Q-5 principal: ${metodoQ5PrincipalConsistencia?.nombre ?? "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:            `Volumen Q-5 principal: ${Number.isFinite(volumenQ5PrincipalM3) ? volumenQ5PrincipalM3.toLocaleString("es-CO", { maximumFractionDigits: 2 }) + " m³" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1682:            `Relación volumen Q-5 / volumen esperado: ${relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1683:            `Resultado de consistencia volumétrica: ${estadoConsistenciaVolumen}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1684:            `Q-Tr activo: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1685:            "Q-5 auditado: presente como bloque no adoptivo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1686:            "Método Racional: presente como contraste global independiente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1687:            "Lectura técnica: control interno preliminar; no reemplaza revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1688:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1689:            "## Validación interna del expediente exportado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1690:            "Estado de validación estructural: control previo al portapapeles aplicado.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1691:            "Control de tokens inválidos: activo mediante validador interno del expediente copiado.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692:            "Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, restricciones y sello técnico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1693:            "Q-Tr activo: trazado desde q_tr_activo_estado y verificado como sección exportable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1694:            "Q-5 auditado: presente como bloque de hidrogramas no adoptivo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1695:            "Método Racional: presente como contraste global independiente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1696:            "Alcance: validación estructural/exportable; no reemplaza revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1697:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1698:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1699:            "Herramienta: HidroFlow.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1700:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1701:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1702:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1703:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1704:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1705:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1706:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1707:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1708:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1709:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1710:              // OT-0056E valida expediente copiado antes de enviarlo al portapapeles.
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1711:              const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1712:              const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1713:                textoExpediente.includes(token)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1714:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1715:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1716:              const seccionesObligatoriasExpediente = [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1717:                "# Expediente hidrológico mínimo — Cuenca activa",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1718:                "## Escenario Q-Tr activo — control de trazabilidad",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1719:                "## 5. Resumen Q-5 auditado",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1720:                "## 6. Método Racional — contraste global independiente",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1721:                "## 7. Contraste Q-5 vs Método Racional",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1722:                "## 8. Restricciones técnicas",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1723:                "## Control de consistencia cruzada Pe–Área–Volumen/Q-5",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1724:                "## Validación interna del expediente exportado",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1725:                "## 9. Sello técnico de generación"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1726:              ];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1727:              const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1728:                !textoExpediente.includes(seccion)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1729:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1730:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1731:              if (tokensDetectadosExpediente.length > 0 || seccionesFaltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1732:                window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1733:                  [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1734:                    "Validación del expediente copiado fallida.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1735:                    "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1736:                    "No se copió el expediente porque contiene tokens inválidos o perdió secciones obligatorias.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1737:                    "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1738:                    ...(tokensDetectadosExpediente.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1739:                      ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1740:                          "Tokens inválidos detectados:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1741:                          ...tokensDetectadosExpediente.map((token) => `- ${token}`),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1742:                          ""
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1743:                        ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1744:                      : []),
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1745:                    ...(seccionesFaltantesExpediente.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1746:                      ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1747:                          "Secciones obligatorias faltantes:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1748:                          ...seccionesFaltantesExpediente.map((seccion) => `- ${seccion}`)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1749:                        ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1750:                      : [])
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1751:                  ].join("\n")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1752:                );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1753:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1754:                return;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1755:              }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1756:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1757:          const areaTexto = document.createElement("textarea");
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1758:          areaTexto.value = textoExpediente;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1759:          areaTexto.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1760:          areaTexto.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1761:          areaTexto.style.left = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1762:          areaTexto.style.top = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1763:          document.body.appendChild(areaTexto);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1764:          areaTexto.focus();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1765:          areaTexto.select();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1766:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1767:          let copiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1768:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1769:          try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1770:            copiado = document.execCommand("copy");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1771:          } catch {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1772:            copiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1773:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1774:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1775:          document.body.removeChild(areaTexto);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1776:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1777:          if (copiado) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1778:            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1779:          } else {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1780:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1781:          }        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1782:        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1783:      >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784:        Copiar expediente hidrológico mínimo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1785:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1786:      {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1787:        const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1788:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1789:        const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1790:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1791:            ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1792:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1793:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1794:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1795:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1796:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1797:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1798:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1799:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1800:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1801:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1802:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1803:          {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1804:            const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1805:            const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1806:            const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1807:              Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1808:                ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1809:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1810:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1811:            const metodosQ5Panel = metodos.filter((metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1812:              metodo.tipo === "q" &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1813:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1814:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1815:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1816:            const metodoQ5PrincipalPanel =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1817:              metodosQ5Panel.find((metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1818:                String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1819:              ) ??
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1820:              metodosQ5Panel[0] ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1821:              null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1822:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1823:            const resultadoQ5PrincipalPanel = metodoQ5PrincipalPanel
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1824:              ? obtenerResultadoQMetodo(metodoQ5PrincipalPanel)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1825:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1826:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1827:            const volumenQ5PrincipalM3 = Number(resultadoQ5PrincipalPanel?.volumen);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1828:            const relacionVolumenQ5Esperado =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1829:              Number.isFinite(volumenQ5PrincipalM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1830:              Number.isFinite(volumenEsperadoM3) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1831:              volumenEsperadoM3 > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1832:                ? volumenQ5PrincipalM3 / volumenEsperadoM3
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1833:                : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1834:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1835:            const estadoConsistenciaVolumen =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1836:              relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1837:                ? "no evaluada"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1838:                : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1839:                ? "superada"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1840:                : relacionVolumenQ5Esperado >= 0.80 && relacionVolumenQ5Esperado <= 1.20
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1841:                ? "requiere revisión menor"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1842:                : "requiere revisión técnica";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1843:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1844:            const estadoQTrActivo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1845:              contextoBase?.q_tr_activo_estado?.estado ?? "no_publicado";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1846:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1847:            const colorBorde =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1848:              estadoConsistenciaVolumen === "superada"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1849:                ? "#16a34a"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1850:                : estadoConsistenciaVolumen === "requiere revisión menor"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1851:                ? "#a16207"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1852:                : "#991b1b";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1853:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1854:            const formato = (valor, decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1855:              const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1856:              return Number.isFinite(numero)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1857:                ? numero.toLocaleString("es-CO", { maximumFractionDigits: decimales })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1858:                : "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1860:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1861:            return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1862:              <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1863:                style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1864:                  border: `1px solid ${colorBorde}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1865:                  borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1866:                  padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1867:                  margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1868:                  background: "rgba(15, 23, 42, 0.70)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1869:                }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1870:              >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1871:                <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1872:                  Panel visual de consistencia cruzada OT-0058
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1873:                </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1874:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1875:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1876:                  Control Pe–Área–Volumen/Q-5 visible antes de copiar el expediente. No recalcula hidrogramas, no modifica Q-5 y no adopta resultados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1877:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1878:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1879:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1880:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1881:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1882:                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1883:                    gap: 8
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1884:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1885:                >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1886:                  <div><strong>Pe total:</strong> {formato(peTotalMm, 4)} mm</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1887:                  <div><strong>Área:</strong> {formato(areaKm2, 4)} km²</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1888:                  <div><strong>Volumen esperado:</strong> {formato(volumenEsperadoM3, 0)} m³</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1889:                  <div><strong>Método Q-5 principal:</strong> {metodoQ5PrincipalPanel?.nombre ?? "—"}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1890:                  <div><strong>Volumen Q-5 principal:</strong> {formato(volumenQ5PrincipalM3, 2)} m³</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1891:                  <div><strong>Relación Q-5/esperado:</strong> {relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1892:                  <div><strong>Resultado:</strong> {estadoConsistenciaVolumen}</div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1893:                  <div><strong>Q-Tr activo:</strong> {estadoQTrActivo}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1894:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1895:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1896:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1897:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1898:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1899:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark 
IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1900:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1901:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1902:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1903:        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción 
técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1904:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1905:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1906:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1907:        ⚠ Control de magnitud pendiente: Qp, Tp y Volumen se muestran como resultados no adoptivos hasta validar unidades, integración y escala hidrológica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1908:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1909:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1910:          {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1911:            const estadoQTrActivo = contextoBase?.q_tr_activo_estado ?? null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1926:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1927:            return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1928:              <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1929:                style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1930:                  border: disponibleQTrActivo ? "1px solid #16a34a" : "1px solid #a16207",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1931:                  borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1932:                  padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1933:                  margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1934:                  background: disponibleQTrActivo ? "rgba(22, 163, 74, 0.10)" : "rgba(161, 98, 7, 0.10)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1935:                }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1936:              >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1937:                <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1938:                  Bloque Q-Tr activo · Escenario de diseño controlado
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1939:                </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1940:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1941:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1942:                  Escenario activo de periodo de retorno publicado desde el contexto hidrológico. Este bloque no recalcula caudales, no modifica Q-5 y funciona como control visual del Tr activo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1943:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1944:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1945:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1946:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1947:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1948:                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1949:                    gap: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1950:                    marginBottom: 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1951:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1952:                >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1953:                  <div><strong>Estado:</strong> {estadoQTrActivo?.estado ?? "no_publicado"}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1954:                  <div><strong>Tr activo:</strong> {formatearValorQTr(qTrActivo.tr_activo, " años")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1955:                  <div><strong>Estación IDF:</strong> {formatearValorQTr(qTrActivo.estacion_idf)}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1956:                  <div><strong>Método IDF:</strong> {formatearValorQTr(qTrActivo.metodo_idf)}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1957:                  <div><strong>Distribución:</strong> {formatearValorQTr(qTrActivo.distribucion_temporal)}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1958:                  <div><strong>Área:</strong> {formatearValorQTr(qTrActivo.area_km2, " km²")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1959:                  <div><strong>CN efectivo:</strong> {formatearValorQTr(qTrActivo.cn_efectivo)}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1960:                  <div><strong>S:</strong> {formatearValorQTr(qTrActivo.s_mm, " mm")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1961:                  <div><strong>Ia:</strong> {formatearValorQTr(qTrActivo.ia_mm, " mm")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1962:                  <div><strong>Impermeabilidad:</strong> {formatearValorQTr(qTrActivo.porcentaje_impermeable, " %")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1963:                  <div><strong>Tc:</strong> {formatearValorQTr(qTrActivo.tc_min, " min")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1964:                  <div><strong>Pe total:</strong> {formatearValorQTr(qTrActivo.lluvia_efectiva_total_mm, " mm")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1965:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1966:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1967:                {faltantesQTrActivo.length > 0 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1968:                  <div style={{ ...estilos.muted }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1969:                    Campos mínimos faltantes: {faltantesQTrActivo.join(", ")}.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1970:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1971:                ) : (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1972:                  <div style={{ ...estilos.muted }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1973:                    Campos mínimos completos para trazabilidad visual del Q-Tr activo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1974:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1975:                )}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1976:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1977:                <div style={{ ...estilos.muted, marginTop: 8 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1978:                  Fuente: {estadoQTrActivo?.fuente ?? "—"}. Estado no adoptivo: la adopción técnica permanece subordinada a la validación hidrológica del expediente.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1979:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1980:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1981:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1982:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1983:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1984:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1985:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1986:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1987:}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1988:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1989:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1990:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1991:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1992:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1993:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1994:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1995:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1996:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1997:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1998:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1999:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2000:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2001:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2002:


