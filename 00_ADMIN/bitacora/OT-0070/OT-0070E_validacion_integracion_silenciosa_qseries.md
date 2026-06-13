# OT-0070E — Validación focal de integración silenciosa qSeries

Fecha: 2026-06-12 19:37:10

## Estado base

- Rama: ot-0070-integracion-no-invasiva-adaptador-qseries.
- OT-0070A cerrada en commit 09e84f0.
- OT-0070B cerrada en commit 37da422.
- OT-0070C cerrada en commit 8ee179d.
- OT-0070D cerrada en commit adb9df3.
- Build Vite aprobado en OT-0070D.

## Objetivo

Validar que la integración interna qSeries quedó silenciosa, no invasiva y sin efectos sobre UI, motor, Qp, Tp, Volumen, Q(t) o métricas morfológicas.

## Evidencia focal en ComparadorMultiMetodo.jsx


> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1:import React, { useEffect, useMemo, useState } from "react";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:3:import { setTcState } from "../agents/tcAgent";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:4:import { calcTc, mapTcResultados } from "../services/hidroEngine";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:5:import { seleccionarTc } from "../services/tcSelector";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:6:import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:7:import adaptarExpedienteDocumental from "../services/documentos/adaptarExpedienteDocumental";
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:8:import adaptarQSeriesHidrogramas from "../services/hidrogramas/adaptarQSeriesHidrogramas";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:9:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:10:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:11:  resumenComparadorCatalogo,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:12:} from "../data/metodosComparadorCatalogo";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:13:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:14:import {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:15:  evaluarCompetenciaComparador,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:16:} from "../data/matrizCompetenciaComparador";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:23:} from "../data/auditoriaPendientesTc";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:24:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:25:export default function ComparadorMultiMetodo({ contexto = null }) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:26:  let bloqueoAdopcion = false;
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:27:  // ✅ OT-0067E — utilidades de bloqueo (GLOBAL COMPONENTE)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:28:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:29:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:30:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:31:  const [filtroEstado, setFiltroEstado] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:32:  const [filtroTipo, setFiltroTipo] = useState("todos");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:33:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:34:  // ✅ CONTEXTO BASE
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:35:const contextoBase = contexto || {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:43:const fuenteContexto = contexto ? "motor HidroFlow" : "contexto base";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:44:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:45:// ✅ DEFINICIÓN REAL DE p
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:46:const p = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:47:  longitud_cauce: 15.524,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:48:  area: contextoBase.area_km2,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:49:  pendiente_cuenca: contextoBase.pendiente_media_pct,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:50:  cota_mayor_cauce: 2819.27,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:51:  cota_menor_cauce: 1511.36,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:52:  cota_max: 2819.27,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:53:  cota_min: 1511.36,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:69:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:70:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:71:const evaluacionCompetencia = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:72:  return evaluarCompetenciaComparador(contextoBase);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:73:}, [contextoBase]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:74:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:75:const conceptoCuenca = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:76:  return conceptuarCuenca(contextoBase);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:77:}, [contextoBase]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:78:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:79:// ✅ Tc FINAL
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:80:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:81:const Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:82:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83:const { metodosTcCompetentes, rangoCompetenteTc } = derivarRangoCompetenteTc(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:84:  metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:85:  evaluacionCompetencia?.tc
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:86:);
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:87:// ✅ Publicar Tc en el agente DESPUÉS del render
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:88:useEffect(() => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:89:  if (Tc_final !== null && Tc_final !== undefined) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:90:    setTcState({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:91:      Tc_final,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:92:      metodosTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:93:      contextoTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:94:      metodosTcCompetentes,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:95:      rangoCompetenteTc,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:96:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:97:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:101:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:102:  // ✅ Y SOLO AQUÍ VA EL RETURN
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:103: // ✅ BLOQUE CONSISTENTE DE MÉTODOS
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:104:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:105:const metodos = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:106:  if (!evaluacionCompetencia) return [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:107:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:108:  const base = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:109:    ...evaluacionCompetencia.tc.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:110:      ...m,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:111:      bloque: "Tc-15"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:112:    })),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:113:    ...evaluacionCompetencia.q.map(m => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:132:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:133:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:134:const conteo = useMemo(() => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:135:  total: metodos.length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:136:  tc: metodos.filter(m => m.tipo === "tc").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:137:  q: metodos.filter(m => m.tipo === "q").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:138:  activos: metodos.filter(m => m.estadoImplementacion === "activo").length,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:139:  pendientes: metodos.filter(m => m.estadoImplementacion === "pendiente").length
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:140:}), [metodos]);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:141:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:142:// OT-0070D — Diagnóstico qSeries interno y silencioso
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:143:const diagnosticoQSeries = useMemo(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:144:  try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:145:    return adaptarQSeriesHidrogramas(contextoBase?.hidrogramas, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:146:      fuente: "ComparadorMultiMetodo.contextoBase.hidrogramas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:147:    });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:148:  } catch (errorQSeries) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:149:    console.warn("Diagnóstico qSeries no invasivo no ejecutado:", errorQSeries);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:150:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:151:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:152:      ok: false,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:153:      resumen: {
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:174:        "linear-gradient(180deg, #020617 0%, #050b14 45%, #030712 100%)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:175:      color: "#dff8ff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:176:      fontFamily:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:177:        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:178:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:179:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:180:    encabezado: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:181:      display: "flex",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:182:      justifyContent: "space-between",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:184:      alignItems: "flex-start",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:185:      marginBottom: "18px",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:186:      borderBottom: "1px solid rgba(0, 210, 255, 0.20)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:187:      paddingBottom: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:188:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:189:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:190:    titulo: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:191:      margin: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:192:      color: "#ffffff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:193:      fontSize: "22px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:194:      fontWeight: 900,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:206:    version: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:207:      padding: "7px 10px",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:208:      borderRadius: "999px",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:209:      border: "1px solid rgba(34, 211, 238, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:210:      background: "rgba(34, 211, 238, 0.08)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:211:      color: "#bff8ff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:212:      fontSize: "11px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:213:      fontWeight: 800,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:214:      whiteSpace: "nowrap",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:215:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:216:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:217:    gridResumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:223:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:224:    tarjetaResumen: {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:225:      border: "1px solid rgba(0, 210, 255, 0.18)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:226:      background:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:227:        "linear-gradient(180deg, rgba(12, 30, 50, 0.92), rgba(7, 18, 32, 0.92))",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:228:      borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:229:      padding: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:230:      boxShadow: "0 8px 22px rgba(0,0,0,0.18)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:231:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:232:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:233:    numeroResumen: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:234:      margin: 0,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:235:      color: "#00e5ff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:236:      fontSize: "22px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:255:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:256:    botonFiltro: {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:257:      border: "1px solid rgba(0, 210, 255, 0.24)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:258:      background: "rgba(0, 210, 255, 0.07)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:259:      color: "#dff8ff",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:260:      borderRadius: "999px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:261:      padding: "7px 11px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:262:      cursor: "pointer",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:263:      fontSize: "11px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:264:      fontWeight: 800,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:265:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:266:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:267:    botonFiltroActivo: {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:268:      border: "1px solid rgba(34, 211, 238, 0.95)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:269:      background: "rgba(34, 211, 238, 0.20)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:270:      color: "#ffffff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:271:      boxShadow: "0 0 0 1px rgba(34, 211, 238, 0.25)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:272:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:273:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:274:    bloque: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:275:      marginTop: "18px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:276:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:285:    tablaWrap: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:286:      overflowX: "auto",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:287:      border: "1px solid rgba(0, 210, 255, 0.16)",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:288:      borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:289:      background: "rgba(5, 12, 24, 0.72)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:290:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:291:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:292:    tabla: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:293:      width: "100%",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:294:      borderCollapse: "collapse",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:295:      minWidth: "1180px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:296:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:297:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:298:    th: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:299:      padding: "10px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:300:      color: "#7dd3fc",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:301:      fontSize: "10px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:302:      textAlign: "left",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:303:      textTransform: "uppercase",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:304:      letterSpacing: "0.06em",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:305:      borderBottom: "1px solid rgba(0, 210, 255, 0.14)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:306:      background: "rgba(15, 23, 42, 0.70)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:307:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:308:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:309:    td: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:310:      padding: "10px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:311:      color: "#dff8ff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:312:      fontSize: "11px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:313:      verticalAlign: "top",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:314:      borderBottom: "1px solid rgba(125, 170, 205, 0.09)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:315:      lineHeight: 1.45,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:316:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:317:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:318:    nombreMetodo: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:319:      color: "#ffffff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:320:      fontWeight: 900,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:321:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:322:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:324:      display: "inline-flex",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:325:      alignItems: "center",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:326:      borderRadius: "999px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:327:      padding: "3px 7px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:328:      fontSize: "10px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:329:      fontWeight: 800,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:330:      border: "1px solid rgba(0, 210, 255, 0.28)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:331:      background: "rgba(0, 210, 255, 0.10)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:332:      color: "#bff8ff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:333:      marginRight: "5px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:334:      marginBottom: "5px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:335:      whiteSpace: "nowrap",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:336:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:337:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:338:    chipActivo: {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:339:      border: "1px solid rgba(0, 230, 184, 0.38)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:340:      background: "rgba(0, 230, 184, 0.12)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:341:      color: "#9fffe8",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:342:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:343:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:344:    chipPendiente: {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:345:      border: "1px solid rgba(255, 209, 102, 0.38)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:346:      background: "rgba(255, 209, 102, 0.12)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:347:      color: "#ffd166",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:348:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:349:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:350:    semaforoWrap: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:351:      display: "flex",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:352:      alignItems: "center",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:353:      gap: "7px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:358:      width: "10px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:359:      height: "10px",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:360:      borderRadius: "999px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:361:      display: "inline-block",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:362:      boxShadow: "0 0 10px rgba(255,255,255,0.25)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:363:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:364:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:365:    semaforoVerde: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:366:      background: "#22c55e",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:367:      boxShadow: "0 0 10px rgba(34,197,94,0.75)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:368:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:369:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:370:    semaforoAmarillo: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:371:      background: "#facc15",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:372:      boxShadow: "0 0 10px rgba(250,204,21,0.75)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:373:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:396:    nota: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:397:      marginTop: "14px",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:398:      border: "1px solid rgba(255, 209, 102, 0.24)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:399:      background: "rgba(255, 209, 102, 0.08)",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:400:      borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:401:      padding: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:402:      color: "#ffe7a3",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:403:      fontSize: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:404:      lineHeight: 1.5,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:405:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:406:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:407:    matriz: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:408:      marginTop: "16px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:413:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:414:    matrizCard: {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:415:      border: "1px solid rgba(0, 210, 255, 0.16)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:416:      background:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:417:        "linear-gradient(180deg, rgba(12, 30, 50, 0.82), rgba(7, 18, 32, 0.82))",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:418:      borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:419:      padding: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:420:    },
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:421:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:422:    matrizTitulo: {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:423:      margin: "0 0 6px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:424:      color: "#00e5ff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:425:      fontSize: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:426:      fontWeight: 900,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:458:    const base = estilos.semaforoPunto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:459:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:460:    if (semaforo === "verde") {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:461:      return { ...base, ...estilos.semaforoVerde };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:462:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:463:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:464:    if (semaforo === "amarillo") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:465:      return { ...base, ...estilos.semaforoAmarillo };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:466:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:467:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:468:    if (semaforo === "azul") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:469:      return { ...base, ...estilos.semaforoAzul };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:477:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:478:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:479:  const renderSemaforo = (metodo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:480:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:481:      <div style={estilos.semaforoWrap}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:482:        <span style={estiloSemaforo(metodo.semaforo)} />
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:483:        <span style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:484:          {metodo.estadoCompetencia || "sin evaluar"}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:485:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:486:        <span style={estilos.puntaje}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:487:          {metodo.puntajeCompetencia ?? "—"} / 100
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:491:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:492:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:493:  const renderRequiere = (requiere = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:494:    if (!Array.isArray(requiere) || requiere.length === 0) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:495:      return <span style={estilos.chip}>sin requisitos definidos</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:496:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:497:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:498:    return requiere.map((item) => (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:499:      <span key={item} style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:500:        {item}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:501:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:502:    ));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:503:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:567:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:568:    return (
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:569:      nombreDato.includes(nombreCatalogo) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:570:      nombreCatalogo.includes(nombreDato)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:571:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:572:  });
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:628:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:629:    return (
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:630:      nombreDato.includes(nombreCatalogo) ||
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:631:      nombreCatalogo.includes(nombreDato)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:632:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:633:  });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:634:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:635:  if (!match) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:636:    return {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:637:      Qp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:638:      Tp: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:639:      volumen: null,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:656:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:657:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:658:  const renderVariablesSalida = (variablesSalida = []) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:659:    if (!Array.isArray(variablesSalida) || variablesSalida.length === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:660:      return <span style={estilos.chip}>Tc / Tr</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:661:    }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:662:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:663:    return variablesSalida.map((item) => (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:664:      <span key={item} style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:665:        {item}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:666:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:668:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:669:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:670:  const renderTabla = (titulo, tipo) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:671:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:672:  
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:673:  // OT-0067 — Adaptador de coherencia hidrológica (encapsulado)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:674:const clasificarCoherencia = (metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:675:  // OT-0067 — Adaptador de coherencia hidrológica
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:676:  const tpRaw = metodo?.tPico ?? metodo?.tp ?? metodo?.Tp;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:677:  const tp = Number(String(tpRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:678:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:679:  const tcRaw = contextoBase?.tc_global ?? contextoBase?.tc ?? contextoBase?.tcMin ?? 0;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:680:  const tc = Number(String(tcRaw ?? "").replace(/[^\d.]/g, ""));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:681:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:682:  const nombre = String(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:683:    metodo?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:687:  ).toLowerCase();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:688:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:689:  // Regla explícita de seguridad por método crítico identificado en OT-0067
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:690:  if (nombre.includes("williams") || nombre.includes("hann")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:691:    return { etiqueta: "No coherente", color: "#dc2626" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:692:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:693:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:694:  if (!Number.isFinite(tp) || !Number.isFinite(tc) || tc === 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:695:    return { etiqueta: "No evaluado", color: "#64748b" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:696:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:697:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:698:  const relacion = tp / tc;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:702:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:703:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:704:  if (nombre.includes("scs")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:705:    return { etiqueta: "Principal", color: "#16a34a" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:706:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:707:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:708:  if (nombre.includes("snyder")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:709:    return { etiqueta: "Coherente", color: "#22c55e" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:710:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:711:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:712:  if (nombre.includes("clark")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:713:    return { etiqueta: "Referencial", color: "#f59e0b" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:714:  }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:715:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:716:  return { etiqueta: "Evaluar", color: "#64748b" };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:717:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:718:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:719:const datos = metodos.filter((metodo) => metodo.tipo === tipo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:720:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:721:// OT-0067C — Evaluación global de coherencia
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:722:const resumenCoherencia = metodos.map((m) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:723:  const r = clasificarCoherencia(m);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:724:  return r?.etiqueta ?? "No evaluado";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:725:});
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:726:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:727:let estadoGlobal = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:728:  etiqueta: "Evaluar",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:729:  color: "#64748b"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:730:};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:731:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:732:if (resumenCoherencia.includes("No coherente")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:733:  estadoGlobal = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:734:    etiqueta: "No coherente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:735:    color: "#dc2626"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:736:  };
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:737:} else if (resumenCoherencia.includes("Referencial")) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:738:  estadoGlobal = {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:739:    etiqueta: "Con advertencias",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:740:    color: "#f59e0b"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:741:  };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:742:} else if (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:743:  resumenCoherencia.length > 0 &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:744:  resumenCoherencia.every((x) => x === "Principal" || x === "Coherente")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:745:) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:754:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:755:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:756:// ✅ OT-0067E — utilidades de bloqueo seguras
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:757:const aplicarBloqueo = (baseStyle = {}) => ({
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:758:  ...baseStyle,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:759:  opacity: bloqueoAdopcion ? 0.5 : 1,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:760:  cursor: bloqueoAdopcion ? "not-allowed" : "pointer"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:761:});
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:762:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:763:const handleClickSeguro = (accion) => () => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:764:  if (!bloqueoAdopcion) accion();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:769:        <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:770:  style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:771:    border: `1px solid ${estadoGlobal.color}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:772:    borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:773:    padding: 10,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:774:    margin: "10px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:775:    background: "rgba(15,23,42,0.5)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:776:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:777:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:778:  <strong>Estado global del modelo:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:779:  <span
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:780:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:781:      padding: "2px 8px",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:782:      borderRadius: 6,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:783:      background: estadoGlobal.color,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:784:      color: "#fff",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:785:      marginLeft: 6,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:786:      fontSize: "12px"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:787:    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:788:  >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:789:    {estadoGlobal.etiqueta}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:790:  </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:821:                    <div style={estilos.nombreMetodo}>{metodo.nombre}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:822:                    <div style={{ color: "#88a7bd", marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:823:                      {metodo.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:824:                    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:825:                  </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:826:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:827:                  <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:828:                    <span style={estiloChipEstado(metodo.estadoImplementacion)}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:829:                      {metodo.estadoImplementacion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:830:                    </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:831:                    <span style={estilos.chip}>{metodo.bloque}</span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:833:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:834:                  <td style={estilos.td}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:835:                    {renderSemaforo(metodo)}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:836:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:837:                   <div style={{ marginTop: "6px", color: "#88a7bd" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:838:                     Catálogo: {metodo.competencia}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:839:                   </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:840:                  </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:841:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:842:                  <td style={estilos.td}>{metodo.escala}</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:843:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:844:                  <td style={estilos.td}>{renderRequiere(metodo.requiere)}</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:845:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:846:                  <td style={estilos.td}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:847:                    {renderVariablesSalida(metodo.variablesSalida)}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:848:                  </td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:849:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:850:                  <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:851:                    {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:852:                      const tcValor = obtenerTcMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:853:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:854:                      if (!Number.isFinite(tcValor)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:855:                        return <span style={estilos.chip}>—</span>;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:886:          }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:887:        >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:888:          {auditoriaPendiente.descripcionPendiente}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:889:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:890:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:891:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:892:  })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:893:</td>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:894:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:895:                 <td style={estilos.td}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:896:  {(() => {
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:955:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:956:        <div style={{ ...estilos.muted, marginTop: "4px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:957:          Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:958:            ? `candidato principal; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:959:            : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:960:            ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:961:            : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:962:            ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:963:            : metodo.nombre?.includes("Williams")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:964:            ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:965:            : metodo.nombre?.includes("Clark")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:966:            ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:967:            : `método comparativo; ${estadoTemporal}.`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:968:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:969:        {alertaTcTp ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:970:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:971:            ⚠ Alerta Tc/Tp
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:972:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:973:        ) : null}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:974:      </div>
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1008:        : relacionVolumen <= 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1009:        ? "revisar escala"
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1010:        : "fuera de escala";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1011:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1012:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1013:      <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1014:        <span style={estilos.chip}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1015:          {resultadoQ.volumen.toFixed(2)}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1016:        </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1017:        {estadoEscalaVolumen ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1018:          <div style={{ ...estilos.muted, marginTop: "4px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1029:                   <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1030:                     style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1031:                     borderLeft: "3px solid rgba(34, 211, 238, 0.75)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1032:                     paddingLeft: "8px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1033:                     marginBottom: "8px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1034:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1035:  >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1036:                  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1037:                    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1038:                      color: "#7dd3fc",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1039:                      fontSize: "9px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1081:  return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1082:    <main style={estilos.pagina}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1083:      <header style={estilos.encabezado}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1084:        {/* CONTEXTO HIDROLÓGICO ACTIVO */}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1085:<section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1086:  style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1087:    border: "1px solid rgba(34, 211, 238, 0.25)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1088:    background: "rgba(15, 23, 42, 0.65)",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1089:    borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1090:    padding: "12px 14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1091:    marginBottom: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1092:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1093:>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1094:  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1095:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1096:      fontSize: "11px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1097:      color: "#7dd3fc",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1175:</section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1176:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1177:{/* CONCEPTO TÉCNICO DE CUENCA */}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1178:<section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1179:  style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1180:    border: "1px solid rgba(34, 211, 238, 0.22)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1181:    background: "rgba(8, 47, 73, 0.28)",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1182:    borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1183:    padding: "12px 14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1184:    marginBottom: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1185:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1186:>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1187:  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1188:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1189:      fontSize: "11px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1190:      color: "#7dd3fc",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1195:    }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1196:  >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1197:    Concepto técnico de cuenca
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1198:  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1199:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1200:  <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1201:    style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1202:      display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1203:      gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1204:      gap: "10px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1205:      fontSize: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1213:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1214:      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1215:        {conceptoCuenca.area.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1216:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1217:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1218:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1219:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1220:      <strong>Clasificación por pendiente:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1221:      <div style={{ color: "#ffe7a3", marginTop: "4px", lineHeight: 1.45 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1222:        Criterio actual basado en Scp mientras se incorpora Sc de cuenca.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1223:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1224:      <span style={{ color: "#38bdf8", fontWeight: 800 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1225:        {conceptoCuenca.pendiente.etiqueta}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1226:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1227:      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1228:        {conceptoCuenca.pendiente.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1229:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1230:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1231:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1232:    <div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1233:      <strong>Forma hidrológica:</strong>{" "}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1234:      <span style={{ color: "#facc15", fontWeight: 800 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1235:        {conceptoCuenca.forma.etiqueta}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1236:      </span>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1237:      <div style={{ color: "#88a7bd", marginTop: "4px", lineHeight: 1.45 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1238:        {conceptoCuenca.forma.descripcion}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1239:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1240:    </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1241:  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1242:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1243:  {conceptoCuenca.advertencias.length > 0 && (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1244:    <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1245:      style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1246:        marginTop: "10px",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1247:        borderTop: "1px solid rgba(34, 211, 238, 0.18)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1248:        paddingTop: "8px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1249:      }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1250:    >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1251:      {conceptoCuenca.advertencias.map((advertencia, index) => (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1252:        <div
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1253:          key={`advertencia-cuenca-${index}`}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1254:          style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1255:            color: "#ffe7a3",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1256:            fontSize: "11px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1257:            marginTop: "4px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1258:            lineHeight: 1.45,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1259:          }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1260:        >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1261:          ⚠ {advertencia}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1272:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1273:          <p style={estilos.subtitulo}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1274:            Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1275:            tiempos de respuesta, caudales pico e hidrogramas. Este módulo no
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1276:            adopta automáticamente resultados; organiza sensibilidad, competencia
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1277:            y trazabilidad para soporte de expediente técnico.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1278:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1279:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1280:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1281:        <div style={estilos.version}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1282:           {resumenComparadorCatalogo.version} · Fuente: {fuenteContexto}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1283:        </div>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284:      </header>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1285:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1286:      <section style={estilos.gridResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1287:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1288:          <p style={estilos.numeroResumen}>{conteo.total}</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1289:          <p style={estilos.etiquetaResumen}>Métodos visibles</p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1290:        </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1291:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1292:        <div style={estilos.tarjetaResumen}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413:      <section style={estilos.matriz}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1414:        <article style={estilos.matrizCard}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415:          <h3 style={estilos.matrizTitulo}>Regla de adopción</h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1416:          <p style={estilos.matrizTexto}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1417:            Muchos métodos para sensibilidad; pocos métodos para adopción. La
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418:            selección final requiere criterio técnico explícito.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1419:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1420:        </article>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1421:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1422:        <article style={estilos.matrizCard}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1423:          <h3 style={estilos.matrizTitulo}>Competencia</h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1431:          <h3 style={estilos.matrizTitulo}>Trazabilidad</h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1432:          <p style={estilos.matrizTexto}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1433:            El comparador debe conservar insumos, supuestos, método, resultado,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1434:            advertencias y justificación de adopción o descarte.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1435:          </p>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1436:        </article>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1437:      </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1438:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1439:      <div style={estilos.nota}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1440:  <strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1441:  HidroFlow a partir de los hidrogramas calculados. El comparador no recalcula
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1442:  hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1443:  automáticamente ningún método. La adopción final requiere criterio técnico,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1444:  competencia hidrológica y trazabilidad explícita.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1445:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1446:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1447:<div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1448:  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1449:    marginTop: "12px",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1450:    border: "1px solid rgba(239, 68, 68, 0.35)",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1451:    background: "rgba(127, 29, 29, 0.18)",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1452:    borderRadius: "14px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1453:    padding: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1454:    color: "#fecaca",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1455:    fontSize: "12px",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1456:    lineHeight: 1.5,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1457:  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1458:>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1459:  <strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1460:  Qp y Volumen requieren revisión de coherencia antes de adopción técnica.
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1461:  En particular, debe verificarse la relación Tc vs Tp, las unidades de
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1462:  Qpico, la integración de volTotal, el paso temporal dtMin y los parámetros
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1463:  internos de cada hidrograma unitario. Los resultados se muestran como
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1464:  lectura del motor HidroFlow, no como valores adoptados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1465:</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1466:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467:      {renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481:            "- SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1482:            "- SCS Mod.: variante ajustable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1483:            "- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1484:            "- Masa y volumen: controlados frente a la referencia física.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1485:            "- Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1486:            "- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1487:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1488:            "Restricciones:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1489:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1490:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1491:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1492:            "- No se recalculan hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1493:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1494:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1495:            "## 9. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1496:            "Herramienta: HidroFlow.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1497:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1498:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1499:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1500:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1501:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1502:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1503:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1504:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1505:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1506:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1507:          const areaTextoResumen = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1508:          areaTextoResumen.value = textoResumenQ5;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1509:          areaTextoResumen.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1510:          areaTextoResumen.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1511:          areaTextoResumen.style.left = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1512:          areaTextoResumen.style.top = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1545:              : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1546:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1547:          const formatearNumeroExpediente = (valor, decimales = 2) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1548:            if (valor === null || valor === undefined || valor === "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1549:              return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1550:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1551:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1552:            const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1553:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1554:            return Number.isFinite(numero)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1555:              ? numero.toLocaleString("es-CO", {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1556:                  minimumFractionDigits: decimales,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1557:                  maximumFractionDigits: decimales
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1558:                })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1559:              : "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1560:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1561:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1562:          const obtenerEstadoTemporalExpediente = (resultadoQ) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1563:            const tcReferencia = Number(Tc_final);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1564:            const tpRel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1565:              Number.isFinite(resultadoQ?.Tp) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:          const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:            metodo.nombre?.includes("SCS Unit")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:              ? `candidato principal; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:              : metodo.nombre?.includes("SCS Mod")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:              ? `variante ajustable; volumen en escala; ${estadoTemporal}.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1585:              : metodo.nombre?.includes("Snyder")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1586:              ? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:              : metodo.nombre?.includes("Williams")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1588:              ? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1589:              : metodo.nombre?.includes("Clark")
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1590:              ? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1591:              : `método comparativo; ${estadoTemporal}.`;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1592:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593:          const metodosQ5Expediente = metodos.filter(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1594:            (metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1595:              metodo.tipo === "q" &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1596:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1618:          };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1619:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1620:          const filasQ5DesdeCatalogo = metodosQ5Expediente
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1621:            .map((metodo) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1622:              const resultadoQ = obtenerResultadoQMetodo(metodo);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623:              const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1624:              const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625:              const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1626:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1627:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1628:            })
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1629:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1630:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1631:          const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1632:            .filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633:            .map((h) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1634:              const nombreMetodo =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1635:                h?.metodo ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1636:                h?.nombre ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1637:                h?.label ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1638:                h?.name ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1639:                h?.id ??
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1640:                "Método Q-5";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1669:              return construirFilaQ5Expediente(nombreMetodo, resultadoQ);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1670:            })
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1671:            .filter((fila) => !fila.includes("| — m³/s |"));
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1672:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1673:          const filasQ5Markdown =
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1674:            filasQ5DesdeCatalogo.length > 0
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1675:              ? filasQ5DesdeCatalogo
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676:              : filasQ5DesdeContexto;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1677:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1678:          const tablaQ5Markdown = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1679:            "| Método | Qp | Tp | Volumen | Estado temporal | Dictamen |",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1680:            "|---|---:|---:|---:|---|---|",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1681:            ...filasQ5Markdown
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1682:          ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1683:          const estacionIdfExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1684:            contextoBase?.estacion_idf,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1698:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1699:          if (!Number.isFinite(areaKm2)) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1700:            faltantesExpediente.push("Área de cuenca");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1701:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1702:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1703:          if (!Number.isFinite(peTotalMm)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1704:            faltantesExpediente.push("Lluvia efectiva total");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1705:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1706:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1707:          if (!Number.isFinite(volumenEsperadoM3)) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1708:            faltantesExpediente.push("Volumen esperado");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1725:                "Expediente hidrológico mínimo incompleto.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1726:                "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1727:                "Antes de copiar el expediente firmado, publique el contexto hidrológico completo desde Hidrogramas.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1728:                "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1729:                "Faltan:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1730:                ...faltantesExpediente.map((item) => `- ${item}`)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1731:              ].join("\n")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1732:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1733:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1734:            return;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1735:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1742:                ? estadoQTrActivoExpediente.campos_faltantes
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1743:                : [];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1744:              const formatearValorQTrExpediente = (valor, sufijo = "", decimales = 2) => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1745:                if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1746:                const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1747:                if (Number.isFinite(numero) && String(valor).trim() !== "") {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1748:                  return numero.toLocaleString("es-CO", { maximumFractionDigits: decimales }) + sufijo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1749:                }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1750:                return String(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1751:              };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1752:              const metodoQ5PrincipalConsistencia =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1753:                metodosQ5Expediente.find((metodo) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1754:                  String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1777:          const textoExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1778:            "# Expediente hidrológico mínimo — Cuenca activa",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1779:            "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1780:            "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1781:            "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1782:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1783:            "## 1. Identificación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784:            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1785:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1786:            `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1787:            `Estación IDF: ${estacionIdfExpediente}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1788:            `Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1789:            `Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1790:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1791:            "## 2. Parámetros hidrológicos base",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1792:            `CN: ${contextoBase?.CN ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1793:            `CN base: ${contextoBase?.CN_base ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1794:            `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1795:            `AMC: ${contextoBase?.AMC ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1796:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1797:            "## 3. Tiempo de concentración y roles Tc",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1798:            `Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1799:            `Tr global activo: ${trDisenoActivoExpediente} años`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1800:            "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1801:            "Roles Tc:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1802:            "- Tc global Índice: referencia hidrológica general.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1803:            "- Tc operativo Q(t): ruta interna del hidrograma.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1804:            "- Duración evento: 3 h para almacenamiento/regulación.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1805:            "- Lag / forma SCS: parámetro derivado para forma temporal.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1806:            "- Tc comparador: referencia especializada para coherencia Q-5.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1807:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1808:            "## 4. Volumen de referencia",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1809:            `Lluvia efectiva total: ${Number.isFinite(peTotalMm) ? peTotalMm.toFixed(2) + " mm" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1810:            `Volumen esperado: ${volumenEsperadoM3 ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1811:            "Fórmula: Pe(mm) × Área(km²) × 1000.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1812:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1813:                "## 5. Escenario Q-Tr activo — control de trazabilidad",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1814:                `Estado: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1815:                `Tr activo: ${formatearValorQTrExpediente(qTrActivoExpediente.tr_activo, " años", 2)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1816:                `Estación IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.estacion_idf)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1817:                `Método IDF: ${formatearValorQTrExpediente(qTrActivoExpediente.metodo_idf)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1818:                `Distribución temporal: ${formatearValorQTrExpediente(qTrActivoExpediente.distribucion_temporal)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1819:                `Área: ${formatearValorQTrExpediente(qTrActivoExpediente.area_km2, " km²", 4)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1820:                `CN efectivo: ${formatearValorQTrExpediente(qTrActivoExpediente.cn_efectivo, "", 2)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1821:                `S: ${formatearValorQTrExpediente(qTrActivoExpediente.s_mm, " mm", 2)}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1826:                `Campos mínimos: ${faltantesQTrActivoExpediente.length > 0 ? "faltantes — " + faltantesQTrActivoExpediente.join(", ") : "completos"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1827:                `Fuente: ${estadoQTrActivoExpediente?.fuente ?? "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1828:                "Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1829:                "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1830:            "## 6. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1831:            "Estado general: diagnóstico no adoptivo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1832:            "SCS Unit Hydrograph: candidato principal de referencia.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1833:            "SCS Mod.: variante ajustable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1834:            "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1835:            "Masa y volumen: controlados frente a referencia física.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1836:            "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1837:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1838:            "Tabla Q-5 auditada:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1839:            ...tablaQ5Markdown,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1840:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1841:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1842:            "## 7. Método Racional — contraste global independiente",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1843:            "Uso: contraste global independiente de caudal pico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1844:            "Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1845:            "Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1846:            ...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1847:            contextoBase.metodo_racional.resultados.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1848:              ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1849:                  `Tc racional exportado: ${
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1850:                    Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1851:                      ? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1852:                      : "—"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1853:                  }`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1867:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1868:            "## 8. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1869:            "Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1870:            "Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1871:            "Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1872:            "Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1873:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1874:            "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1875:            `Pe total: ${Number.isFinite(peTotalMm) ? peTotalMm.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + " mm" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1876:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + " km²" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1877:            `Volumen esperado: ${Number.isFinite(volumenEsperadoM3) ? volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 }) + " m³" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1878:            `Método Q-5 principal: ${metodoQ5PrincipalConsistencia?.nombre ?? "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1879:            `Volumen Q-5 principal: ${Number.isFinite(volumenQ5PrincipalM3) ? volumenQ5PrincipalM3.toLocaleString("es-CO", { maximumFractionDigits: 2 }) + " m³" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1880:            `Relación volumen Q-5 / volumen esperado: ${relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1881:            `Resultado de consistencia volumétrica: ${estadoConsistenciaVolumen}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1882:            `Q-Tr activo: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1883:            "Q-5 auditado: presente como bloque no adoptivo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1884:            "Método Racional: presente como contraste global independiente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1885:            "Lectura técnica: control interno preliminar; no reemplaza revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1886:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1887:            "## 10. Validación interna del expediente exportado",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1888:            "Estado de validación estructural: control previo al portapapeles aplicado.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1889:            "Control de tokens inválidos: activo mediante validador interno del expediente copiado.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1890:            "Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, restricciones y sello técnico.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1891:            "Q-Tr activo: trazado desde q_tr_activo_estado y verificado como sección exportable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1892:            "Q-5 auditado: presente como bloque de hidrogramas no adoptivo.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1893:            "Método Racional: presente como contraste global independiente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1894:            "Alcance: validación estructural/exportable; no reemplaza revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1895:            "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1896:            "## 11. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1897:            "Herramienta: HidroFlow.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1898:            "Tipo de salida: Expediente hidrológico mínimo.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1899:            `Cuenca activa: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}.`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1900:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1901:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1902:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1903:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1904:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1905:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1906:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1907:            "## 12. Restricciones y advertencias técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1908:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1909:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1910:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1911:            "- No se recalculan hidrogramas en este expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1912:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1913:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1927:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1928:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1929:              // OT-0056E valida expediente copiado antes de enviarlo al portapapeles.
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1930:              const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1931:              const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1932:                textoExpediente.includes(token)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1933:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1934:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1935:              const seccionesObligatoriasExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1936:                "# Expediente hidrológico mínimo — Cuenca activa",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1937:                "## 5. Escenario Q-Tr activo — control de trazabilidad",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1938:                "## 6. Resumen Q-5 auditado",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1939:                "## 7. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1940:                "## 8. Contraste Q-5 vs Método Racional",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1941:                "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1942:                "## 10. Validación interna del expediente exportado",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1943:                "## 11. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1944:                "## 12. Restricciones y advertencias técnicas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1945:              ];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1946:              const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1947:                !textoExpediente.includes(seccion)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1948:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1949:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1950:              if (tokensDetectadosExpediente.length > 0 || seccionesFaltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1951:                window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1952:                  [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1953:                    "Validación del expediente copiado fallida.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1954:                    "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1955:                    "No se copió el expediente porque contiene tokens inválidos o perdió secciones obligatorias.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1956:                    "",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1957:                    ...(tokensDetectadosExpediente.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1958:                      ? [
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1959:                          "Tokens inválidos detectados:",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1960:                          ...tokensDetectadosExpediente.map((token) => `- ${token}`),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1961:                          ""
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1962:                        ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1963:                      : []),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1964:                    ...(seccionesFaltantesExpediente.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1965:                      ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1966:                          "Secciones obligatorias faltantes:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1967:                          ...seccionesFaltantesExpediente.map((seccion) => `- ${seccion}`)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1968:                        ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2013:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2014:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2015:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2016:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2017:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2018:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2019:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2020:      {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2021:  try {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2022:    const diagnostico = adaptarExpedienteDocumental(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2023:      "Expediente hidrológico mínimo",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2024:      {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2025:        fuenteExpediente: "ComparadorMultiMetodo.render",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2026:        origenPlantilla: "OT-0066",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2027:        cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2028:      }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2029:    );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2030:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2031:    return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2032:      <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2033:        style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2034:          border: "1px solid #334155",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2035:          borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2036:          padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2037:          margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2038:          background: "rgba(15, 23, 42, 0.6)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2039:        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2040:      >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2041:        <h3 style={{ margin: "0 0 8px 0" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2042:          Diagnóstico documental (lectura auxiliar)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2043:        </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2071:            const metodosQ5Panel = metodos.filter((metodo) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2072:              metodo.tipo === "q" &&
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2073:              !String(metodo.nombre ?? "").toLowerCase().includes("racional")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2074:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2075:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2076:            const metodoQ5PrincipalPanel =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2077:              metodosQ5Panel.find((metodo) =>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2078:                String(metodo?.nombre ?? "").toLowerCase().includes("scs unit")
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
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2105:              contextoBase?.q_tr_activo_estado?.estado ?? "no_publicado";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2106:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2107:            const colorBorde =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2108:              estadoConsistenciaVolumen === "superada"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2109:                ? "#16a34a"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2110:                : estadoConsistenciaVolumen === "requiere revisión menor"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2111:                ? "#a16207"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2112:                : "#991b1b";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2113:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2114:            const formato = (valor, decimales = 2) => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2115:              const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2116:              return Number.isFinite(numero)
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2117:                ? numero.toLocaleString("es-CO", { maximumFractionDigits: decimales })
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2118:                : "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2119:            };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2120:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2121:            return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2122:              <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2123:                style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2124:                  border: `1px solid ${colorBorde}`,
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2125:                  borderRadius: 12,
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2136:                  Control Pe–Área–Volumen/Q-5 visible antes de copiar el expediente. No recalcula hidrogramas, no modifica Q-5 y no adopta resultados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2137:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2138:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2139:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2140:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2141:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2142:                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2143:                    gap: 8
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2144:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2157:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2158:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2159:        Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como 
métodos comparativos/referenciales hasta justificación técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2160:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2161:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2162:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2163:        Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2164:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2165:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2166:      <div style={{ ...estilos.muted, marginBottom: "10px" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2167:        ⚠ Control de magnitud pendiente: Qp, Tp y Volumen se muestran como resultados no adoptivos hasta validar unidades, integración y escala hidrológica.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2168:      </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2169:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2170:          {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2171:            const estadoQTrActivo = contextoBase?.q_tr_activo_estado ?? null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2172:            const qTrActivo = estadoQTrActivo?.q_tr_activo ?? {};
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2173:            const faltantesQTrActivo = Array.isArray(estadoQTrActivo?.campos_faltantes)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2174:              ? estadoQTrActivo.campos_faltantes
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2175:              : [];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2177:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2178:            const formatearValorQTr = (valor, sufijo = "") => {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2179:              if (valor === null || valor === undefined || valor === "") return "—";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2180:              const numero = Number(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2181:              if (Number.isFinite(numero) && String(valor).trim() !== "") {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2182:                return numero.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + sufijo;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2183:              }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2184:              return String(valor);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2185:            };
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2186:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2187:            return (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2188:              <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2189:                style={{
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2190:                  border: disponibleQTrActivo ? "1px solid #16a34a" : "1px solid #a16207",
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2191:                  borderRadius: 12,
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
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2202:                  Escenario activo de periodo de retorno publicado desde el contexto hidrológico. Este bloque no recalcula caudales, no modifica Q-5 y funciona como control visual del Tr activo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2203:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2204:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2205:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2206:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2207:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2208:                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2209:                    gap: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2210:                    marginBottom: 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2231:                ) : (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2232:                  <div style={{ ...estilos.muted }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2233:                    Campos mínimos completos para trazabilidad visual del Q-Tr activo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2234:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2235:                )}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2236:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2237:                <div style={{ ...estilos.muted, marginTop: 8 }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2238:                  Fuente: {estadoQTrActivo?.fuente ?? "—"}. Estado no adoptivo: la adopción técnica permanece subordinada a la validación hidrológica del expediente.
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



## Validaciones esperadas

- Existe import de adaptarQSeriesHidrogramas.
- Existe diagnosticoQSeries.
- diagnosticoQSeries usa useMemo.
- diagnosticoQSeries usa contextoBase?.hidrogramas.
- Se conserva obtenerResultadoQMetodo.
- No se agregan métricas W50, W25, De, pendientes ni asimetría.
- No se observa UI visible nueva asociada al diagnóstico qSeries.

## Restricciones confirmadas

- No modificar hidroEngine.js.
- No modificar HidroFlow.jsx.
- No recalcular hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No calcular De, W50, W25, pendientes ni asimetría.

## Criterio de salida

OT-0070E queda completa cuando exista una validación focal versionada de la integración silenciosa qSeries, sin cambios funcionales adicionales.
