# OT-0216B — Auditoría documental de restricciones y advertencias del expediente

## Resumen

```json
{
  "auditoria": "OT-0216",
  "archivosRevisados": 2,
  "archivosExistentes": 2,
  "totalCoincidencias": 207,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Alcance

Esta auditoría solo localiza referencias documentales existentes relacionadas con restricciones, advertencias, notas, criterios de cautela y mensajes de no adopción.

No modifica archivos fuente.

## Archivos revisados

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — existe: true; coincidencias: 30
- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — existe: true; coincidencias: 177

## Coincidencias detectadas

### 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js

- Línea 15: patrones [Q-5]

```text
"## 6. Resumen Q-5 auditado",
```

- Línea 16: patrones [contraste, Método Racional]

```text
"## 7. Método Racional — contraste global independiente",
```

- Línea 17: patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- Línea 18: patrones [Q-5]

```text
"## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

- Línea 19: patrones [no adop, diagnóstico]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- Línea 20: patrones [validación]

```text
"## 10. Validación interna del expediente exportado",
```

- Línea 22: patrones [restric, advert]

```text
"## 12. Restricciones y advertencias técnicas"
```

- Línea 87: patrones [advert]

```text
advertencias: [],
```

- Línea 269: patrones [nota]

```text
"Nota: este helper no selecciona ni recalcula Tc.",
```

- Línea 286: patrones [Q-5]

```text
"## 6. Resumen Q-5 auditado",
```

- Línea 290: patrones [contraste, Método Racional]

```text
"## 7. Método Racional — contraste global independiente",
```

- Línea 291: patrones [contraste]

```text
"Uso: contraste global independiente de caudal pico.",
```

- Línea 294: patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- Línea 295: patrones [Q-5, Método Racional]

```text
"Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
```

- Línea 297: patrones [Q-5]

```text
"## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

- Línea 300: patrones [no adop, diagnóstico]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- Línea 305: patrones [restric, no adop, diagnóstico]

```text
"Restricción: diagnóstico no adoptivo; no selecciona método ni levanta No coherente.",
```

- Línea 307: patrones [validación]

```text
"## 10. Validación interna del expediente exportado",
```

- Línea 308: patrones [validación]

```text
"Estado de validación estructural: helper puro inicial con control de secciones y tokens inválidos.",
```

- Línea 317: patrones [restric, advert]

```text
"## 12. Restricciones y advertencias técnicas",
```

- Línea 328: patrones [advert]

```text
const advertencias = [
```

- Línea 337: patrones [advert]

```text
advertencias,
```

- Línea 418: patrones [nota, no implica]

```text
"Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
```

- Línea 424: patrones [Q-5]

```text
"- Tc comparador: referencia especializada para coherencia Q-5."
```

- Línea 561: patrones [no adop, validación, Q-5]

```text
"Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."
```

- Línea 594: patrones [Q-5]

```text
: ["sin tabla Q-5 disponible"];
```

- Línea 597: patrones [Q-5]

```text
"## 6. Resumen Q-5 auditado",
```

- Línea 598: patrones [no adop, diagnóstico]

```text
"Estado general: diagnóstico no adoptivo.",
```

- Línea 601: patrones [referencial]

```text
"Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
```

- Línea 605: patrones [Q-5]

```text
"Tabla Q-5 auditada:",
```

### 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx

- Línea 41: patrones [auditor]

```text
obtenerAuditoriaPendienteTc,
```

- Línea 42: patrones [auditor, criterio]

```text
obtenerCriterioPendientesAuditoria,
```

- Línea 43: patrones [auditor]

```text
} from "../data/auditoriaPendientesTc";
```

- Línea 135: patrones [Q-5]

```text
bloque: "Q-5"
```

- Línea 162: patrones [diagnóstico]

```text
// OT-0070D — Diagnóstico qSeries interno y silencioso
```

- Línea 169: patrones [diagnóstico]

```text
console.warn("Diagnóstico qSeries no invasivo no ejecutado:", errorQSeries);
```

- Línea 209: patrones [diagnóstico]

```text
// OT-0082D — Diagnóstico interno controlado de métricas morfológicas Q(t).
```

- Línea 298: patrones [diagnóstico]

```text
// OT-0084C — Filas de dictamen diagnóstico de forma Q(t).
```

- Línea 299: patrones [no adop]

```text
// Clasificación no adoptiva basada únicamente en métricas morfológicas ya calculadas.
```

- Línea 321: patrones [no adop, diagnóstico]

```text
comentario: dictamen?.comentario ?? "Diagnóstico no adoptivo.",
```

- Línea 327: patrones [no adop]

```text
// OT-0085C — Filas de riesgo temporal Q(t) no adoptivo.
```

- Línea 358: patrones [no adop, diagnóstico]

```text
comentario: riesgoTemporal?.comentario ?? "Diagnóstico comparativo no adoptivo.",
```

- Línea 366: patrones [no adop]

```text
// OT-0086C — Síntesis ejecutiva temporal Q(t) no adoptiva.
```

- Línea 384: patrones [advert]

```text
advertencia:
```

- Línea 385: patrones [no adop]

```text
"Síntesis diagnóstica no adoptiva; no selecciona método ni levanta No coherente.",
```

- Línea 392: patrones [no adop]

```text
// Solo lectura: no recalcula, no adopta método y no modifica Q(t).
```

- Línea 630: patrones [nota]

```text
nota: {
```

- Línea 886: patrones [auditor]

```text
const obtenerAuditoriaPendienteMetodo = (metodo) => {
```

- Línea 889: patrones [auditor]

```text
return obtenerAuditoriaPendienteTc(metodo.id);
```

- Línea 947: patrones [referencial]

```text
return { etiqueta: "Referencial", color: "#f59e0b" };
```

- Línea 971: patrones [referencial]

```text
} else if (resumenCoherencia.includes("Referencial")) {
```

- Línea 973: patrones [advert]

```text
etiqueta: "Con advertencias",
```

- Línea 1102: patrones [auditor]

```text
const auditoriaPendiente = obtenerAuditoriaPendienteMetodo(metodo);
```

- Línea 1104: patrones [auditor]

```text
if (!auditoriaPendiente) {
```

- Línea 1111: patrones [auditor]

```text
{auditoriaPendiente.pendienteEsperada}
```

- Línea 1122: patrones [auditor]

```text
{auditoriaPendiente.descripcionPendiente}
```

- Línea 1191: patrones [Q-5]

```text
Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")
```

- Línea 1196: patrones [referencial]

```text
? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
```

- Línea 1200: patrones [contraste]

```text
? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
```

- Línea 1456: patrones [criterio]

```text
Criterio actual basado en Scp mientras se incorpora Sc de cuenca.
```

- Línea 1477: patrones [advert]

```text
{conceptoCuenca.advertencias.length > 0 && (
```

- Línea 1485: patrones [advert]

```text
{conceptoCuenca.advertencias.map((advertencia, index) => (
```

- Línea 1487: patrones [advert]

```text
key={`advertencia-cuenca-${index}`}
```

- Línea 1495: patrones [advert]

```text
⚠ {advertencia}
```

- Línea 1508: patrones [Q-5]

```text
Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,
```

- Línea 1652: patrones [criterio]

```text
selección final requiere criterio técnico explícito.
```

- Línea 1659: patrones [referencial]

```text
Cada método se clasifica como principal, alterno, referencial,
```

- Línea 1668: patrones [advert]

```text
advertencias y justificación de adopción o descarte.
```

- Línea 1673: patrones [nota]

```text
<div style={estilos.nota}>
```

- Línea 1674: patrones [nota]

```text
<strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
```

- Línea 1676: patrones [no adop]

```text
hidrogramas, no recalcula CN, no reemplaza el motor hidrológico y no adopta
```

- Línea 1677: patrones [criterio]

```text
automáticamente ningún método. La adopción final requiere criterio técnico,
```

- Línea 1693: patrones [auditor]

```text
<strong>Auditoría hidrológica pendiente:</strong> los valores de Tc, Tp,
```

- Línea 1704: patrones [no adop, referencial, auditor, Q-5, diagnóstico]

```text
Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. La masa y el volumen están controlados frente a la referencia física; Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica. Estado general: diagnóstico no adoptivo.
```

- Línea 1710: patrones [auditor, Q-5]

```text
"# Resumen técnico Q-5 post auditoría",
```

- Línea 1712: patrones [no adop, diagnóstico]

```text
"Estado general: diagnóstico no adoptivo.",
```

- Línea 1717: patrones [referencial]

```text
"- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
```

- Línea 1720: patrones [contraste, Q-5, Método Racional]

```text
"- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",
```

- Línea 1722: patrones [restric]

```text
"Restricciones:",
```

- Línea 1737: patrones [no adop, diagnóstico]

```text
"Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
```

- Línea 1738: patrones [restric, criterio]

```text
"Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
```

- Línea 1762: patrones [Q-5]

```text
window.alert("Resumen técnico Q-5 copiado al portapapeles.");
```

- Línea 1764: patrones [Q-5]

```text
window.prompt("No fue posible copiar automáticamente. Copie manualmente el resumen técnico Q-5:", textoResumenQ5);
```

- Línea 1769: patrones [Q-5]

```text
Copiar resumen técnico Q-5
```

- Línea 1820: patrones [referencial]

```text
? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
```

- Línea 1824: patrones [contraste]

```text
? `contraste hidrológico; volumen en escala; ${estadoTemporal}; revisar efecto de almacenamiento.`
```

- Línea 1851: patrones [Q-5]

```text
return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volumen)} m³ | ${estadoTemporal} | ${dictamen} |`;
```

- Línea 1859: patrones [Q-5]

```text
const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");
```

- Línea 1874: patrones [Q-5]

```text
"Método Q-5";
```

- Línea 1946: patrones [Q-5]

```text
faltantesExpediente.push("Tabla Q-5 auditada con filas reales");
```

- Línea 1953: patrones [Método Racional]

```text
faltantesExpediente.push("Tabla Método Racional");
```

- Línea 2011: patrones [no adop, diagnóstico]

```text
// OT-0087C — Sección exportable de diagnóstico temporal Q(t) no adoptivo.
```

- Línea 2019: patrones [diagnóstico]

```text
// OT-0113B — Diagnóstico no invasivo del helper puro del expediente.
```

- Línea 2038: patrones [diagnóstico]

```text
"Diagnóstico helper expediente no invasivo:",
```

- Línea 2044: patrones [diagnóstico]

```text
"Diagnóstico helper expediente no invasivo no ejecutado:",
```

- Línea 2054: patrones [Q-5]

```text
"## 6. Resumen Q-5 auditado",
```

- Línea 2055: patrones [no adop, diagnóstico]

```text
"Estado general: diagnóstico no adoptivo.",
```

- Línea 2058: patrones [referencial]

```text
"Snyder, Williams &amp; Hann y Clark IUH: métodos comparativos/referenciales.",
```

- Línea 2062: patrones [Q-5]

```text
"Tabla Q-5 auditada:",
```

- Línea 2077: patrones [Q-5, diagnóstico]

```text
console.warn("[expediente] Brecha diagnóstico Resumen Q-5 auditado delegado vs operativo", {
```

- Línea 2085: patrones [advert]

```text
"Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
```

- Línea 2086: patrones [no adop]

```text
"Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
```

- Línea 2087: patrones [criterio]

```text
"Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
```

- Línea 2119: patrones [contraste, Método Racional]

```text
"## 7. Método Racional — contraste global independiente",
```

- Línea 2120: patrones [contraste]

```text
"Uso: contraste global independiente de caudal pico.",
```

- Línea 2121: patrones [Q-5]

```text
"Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",
```

- Línea 2122: patrones [no adop, criterio]

```text
"Criterio técnico: no adoptivo principal para esta cuenca sin revisión de competencia, duración Tc y alcance normativo.",
```

- Línea 2132: patrones [Método Racional]

```text
"Tabla Método Racional:",
```

- Línea 2141: patrones [Método Racional]

```text
"Estado: sección informativa; consultar módulo Método Racional."
```

- Línea 2145: patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- Línea 2146: patrones [Q-5]

```text
"Q-5: bloque de hidrogramas auditados. Evalúa Q(t), Qp, Tp, Volumen, estado temporal y dictamen por método.",
```

- Línea 2147: patrones [contraste, Método Racional]

```text
"Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",
```

- Línea 2148: patrones [Q-5, Método Racional]

```text
"Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
```

- Línea 2149: patrones [criterio]

```text
"Criterio de adopción: ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.",
```

- Línea 2151: patrones [Q-5]

```text
"## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

- Línea 2155: patrones [Q-5]

```text
`Método Q-5 principal: ${metodoQ5PrincipalConsistencia?.nombre ?? "—"}`,
```

- Línea 2156: patrones [Q-5]

```text
`Volumen Q-5 principal: ${Number.isFinite(volumenQ5PrincipalM3) ? volumenQ5PrincipalM3.toLocaleString("es-CO", { maximumFractionDigits: 2 }) + " m³" : "—"}`,
```

- Línea 2157: patrones [Q-5]

```text
`Relación volumen Q-5 / volumen esperado: ${relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}`,
```

- Línea 2160: patrones [no adop, Q-5]

```text
"Q-5 auditado: presente como bloque no adoptivo.",
```

- Línea 2161: patrones [contraste, Método Racional]

```text
"Método Racional: presente como contraste global independiente.",
```

- Línea 2165: patrones [no adop, diagnóstico]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- Línea 2167: patrones [diagnóstico]

```text
"No fue posible construir la sección de diagnóstico temporal Q(t).",
```

- Línea 2169: patrones [restric, no adop, diagnóstico]

```text
"Restricción: diagnóstico no adoptivo; no selecciona método ni levanta No coherente."
```

- Línea 2172: patrones [validación]

```text
"## 10. Validación interna del expediente exportado",
```

- Línea 2173: patrones [validación]

```text
"Estado de validación estructural: control previo al portapapeles aplicado.",
```

- Línea 2175: patrones [restric, contraste, Q-5, Método Racional, diagnóstico]

```text
"Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, diagnóstico temporal Q(t), restricciones y sello técnico.",
```

- Línea 2177: patrones [no adop, Q-5]

```text
"Q-5 auditado: presente como bloque de hidrogramas no adoptivo.",
```

- Línea 2178: patrones [contraste, Método Racional]

```text
"Método Racional: presente como contraste global independiente.",
```

- Línea 2179: patrones [validación]

```text
"Alcance: validación estructural/exportable; no reemplaza revisión hidrológica profesional.",
```

- Línea 2194: patrones [no adop, diagnóstico]

```text
"Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
```

- Línea 2195: patrones [restric, criterio]

```text
"Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional.",
```

- Línea 2197: patrones [restric, advert]

```text
"## 12. Restricciones y advertencias técnicas",
```

- Línea 2205: patrones [diagnóstico]

```text
// OT-0166 — Diagnóstico no invasivo del bloque Escenario Q-Tr activo delegado.
```

- Línea 2246: patrones [no adop, validación, Q-5]

```text
textoEscenarioQTrActivoDelegadoDiagnostico.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."),
```

- Línea 2248: patrones [no adop, validación, Q-5]

```text
textoExpediente.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.")
```

- Línea 2267: patrones [diagnóstico]

```text
"Diagnóstico Escenario Q-Tr activo delegado no invasivo:",
```

- Línea 2273: patrones [diagnóstico]

```text
"Diagnóstico Escenario Q-Tr activo delegado no invasivo no ejecutado:",
```

- Línea 2278: patrones [diagnóstico]

```text
// OT-0156 — Diagnóstico no invasivo del bloque Volumen de referencia delegado.
```

- Línea 2326: patrones [diagnóstico]

```text
"Diagnóstico Volumen de referencia delegado no invasivo:",
```

- Línea 2332: patrones [diagnóstico]

```text
"Diagnóstico Volumen de referencia delegado no invasivo no ejecutado:",
```

- Línea 2337: patrones [diagnóstico]

```text
// OT-0146 — Diagnóstico no invasivo del bloque Tiempo de concentración y roles Tc delegado.
```

- Línea 2385: patrones [diagnóstico]

```text
"Diagnóstico Tiempo de concentración delegado no invasivo:",
```

- Línea 2391: patrones [diagnóstico]

```text
"Diagnóstico Tiempo de concentración delegado no invasivo no ejecutado:",
```

- Línea 2396: patrones [diagnóstico]

```text
// OT-0135 — Diagnóstico no invasivo del bloque Parámetros hidrológicos base delegado.
```

- Línea 2431: patrones [diagnóstico]

```text
"Diagnóstico Parámetros hidrológicos base delegado no invasivo:",
```

- Línea 2437: patrones [diagnóstico]

```text
"Diagnóstico Parámetros hidrológicos base delegado no invasivo no ejecutado:",
```

- Línea 2441: patrones [diagnóstico]

```text
// OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado.
```

- Línea 2478: patrones [diagnóstico]

```text
"Diagnóstico Identificación delegada no invasivo:",
```

- Línea 2484: patrones [diagnóstico]

```text
"Diagnóstico Identificación delegada no invasivo no ejecutado:",
```

- Línea 2496: patrones [Q-5]

```text
"## 6. Resumen Q-5 auditado",
```

- Línea 2497: patrones [contraste, Método Racional]

```text
"## 7. Método Racional — contraste global independiente",
```

- Línea 2498: patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- Línea 2499: patrones [Q-5]

```text
"## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

- Línea 2500: patrones [no adop, diagnóstico]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- Línea 2501: patrones [validación]

```text
"## 10. Validación interna del expediente exportado",
```

- Línea 2503: patrones [restric, advert]

```text
"## 12. Restricciones y advertencias técnicas"
```

- Línea 2561: patrones [diagnóstico]

```text
console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
```

- Línea 2564: patrones [diagnóstico]

```text
console.warn("Diagnóstico documental no invasivo no ejecutado:", errorDiagnosticoDocumental);
```

- Línea 2576: patrones [Q-5]

```text
"## 6. Resumen Q-5 auditado",
```

- Línea 2577: patrones [contraste, Método Racional]

```text
"## 7. Método Racional — contraste global independiente",
```

- Línea 2578: patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- Línea 2579: patrones [Q-5]

```text
"## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

- Línea 2580: patrones [no adop, diagnóstico]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- Línea 2581: patrones [validación]

```text
"## 10. Validación interna del expediente exportado",
```

- Línea 2583: patrones [restric, advert]

```text
"## 12. Restricciones y advertencias técnicas"
```

- Línea 2589: patrones [validación, diagnóstico]

```text
// OT-0088C — Validación textual estricta de diagnóstico temporal Q(t).
```

- Línea 2600: patrones [validación]

```text
"Validación del expediente copiado fallida.",
```

- Línea 2602: patrones [validación, diagnóstico]

```text
"No se copió el expediente porque contiene tokens inválidos, perdió secciones obligatorias o falló la validación del diagnóstico temporal Q(t).",
```

- Línea 2620: patrones [diagnóstico]

```text
"Diagnóstico temporal Q(t) inválido:",
```

- Línea 2627: patrones [advert]

```text
...(validacionDiagnosticoTemporalQt.advertenciasFaltantes.length > 0
```

- Línea 2629: patrones [advert]

```text
"Advertencias temporales faltantes:",
```

- Línea 2630: patrones [advert]

```text
...validacionDiagnosticoTemporalQt.advertenciasFaltantes.map((item) => `- ${item}`)
```

- Línea 2635: patrones [diagnóstico]

```text
"Tokens inválidos en diagnóstico temporal:",
```

- Línea 2714: patrones [diagnóstico]

```text
Diagnóstico documental (lectura auxiliar)
```

- Línea 2719: patrones [advert]

```text
{diagnostico?.ok ? "OK" : "Con advertencias"}
```

- Línea 2808: patrones [no adop, Q-5]

```text
Control Pe–Área–Volumen/Q-5 visible antes de copiar el expediente. No recalcula hidrogramas, no modifica Q-5 y no adopta resultados.
```

- Línea 2821: patrones [Q-5]

```text
<div><strong>Método Q-5 principal:</strong> {metodoQ5PrincipalPanel?.nombre ?? "—"}</div>
```

- Línea 2822: patrones [Q-5]

```text
<div><strong>Volumen Q-5 principal:</strong> {formato(volumenQ5PrincipalM3, 2)} m³</div>
```

- Línea 2823: patrones [Q-5]

```text
<div><strong>Relación Q-5/esperado:</strong> {relacionVolumenQ5Esperado !== null ? relacionVolumenQ5Esperado.toFixed(3) + "x" : "—"}</div>
```

- Línea 2831: patrones [referencial]

```text
Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos comparativos/referenciales hasta justificación técnica.
```

- Línea 2835: patrones [validación]

```text
Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.
```

- Línea 2839: patrones [no adop]

```text
⚠ Control de magnitud pendiente: Qp, Tp y Volumen se muestran como resultados no adoptivos hasta validar unidades, integración y escala hidrológica.
```

- Línea 2874: patrones [Q-5]

```text
Escenario activo de periodo de retorno publicado desde el contexto hidrológico. Este bloque no recalcula caudales, no modifica Q-5 y funciona como control visual del Tr activo.
```

- Línea 2910: patrones [no adop, validación]

```text
Fuente: {estadoQTrActivo?.fuente ?? "—"}. Estado no adoptivo: la adopción técnica permanece subordinada a la validación hidrológica del expediente.
```

- Línea 2945: patrones [diagnóstico]

```text
Panel diagnóstico qSeries
```

- Línea 2949: patrones [diagnóstico]

```text
Lectura no invasiva de disponibilidad de series Q(t). Las métricas morfológicas se evalúan solo como diagnóstico agregado y no se exponen en detalle.
```

- Línea 2961: patrones [diagnóstico]

```text
<strong>Diagnóstico morfológico Q(t):</strong>{" "}
```

- Línea 2982: patrones [no adop]

```text
{/* OT-0083C — Tabla compacta no adoptiva de métricas morfológicas Q(t). */}
```

- Línea 2995: patrones [no adop]

```text
exposición compacta no adoptiva basada exclusivamente en qSeries validadas.
```

- Línea 3106: patrones [no implica]

```text
Lectura diagnóstica: las métricas se calculan desde qSeries reales validadas. No implican adopción hidrológica, no levantan el estado global No coherente y no reemplazan el dictamen técnico del expediente.
```

- Línea 3119: patrones [diagnóstico]

```text
<strong>Dictamen diagnóstico de forma Q(t):</strong>{" "}
```

- Línea 3120: patrones [no adop]

```text
clasificación preliminar no adoptiva basada en métricas morfológicas.
```

- Línea 3204: patrones [no adop, diagnóstico]

```text
Este dictamen clasifica la forma temporal Q(t) como diagnóstico preliminar. No adopta métodos, no modifica caudales, no levanta el estado global No coherente y no reemplaza revisión hidrológica profesional.
```

- Línea 3218: patrones [no adop]

```text
lectura comparativa no adoptiva de factores temporales dominantes.
```

- Línea 3315: patrones [no adop, diagnóstico]

```text
lectura agrupada de riesgos temporales. Diagnóstico no adoptivo.
```

- Línea 3353: patrones [advert]

```text
{sintesisRiesgoTemporalQt.advertencia ??
```

- Línea 3354: patrones [no adop]

```text
"Síntesis diagnóstica no adoptiva; no selecciona método ni levanta No coherente."}
```

- Línea 3377: patrones [diagnóstico]

```text
? "las series Q(t) están publicadas y reconocidas por el diagnóstico estructural. Las métricas morfológicas permanecen bloqueadas hasta una OT posterior de análisis de forma."
```

- Línea 3415: patrones [no adop, diagnóstico]

```text
lectura estructurada de cuenca patrón para comparación futura. Diagnóstico no adoptivo.
```

- Línea 3485: patrones [no adop]

```text
comparación visual no adoptiva desde matriz patrón.
```

- Línea 3574: patrones [no adop, diagnóstico]

```text
indican pico más temprano. Diagnóstico visual no adoptivo.
```

- Línea 3605: patrones [no adop]

```text
lectura visual no adoptiva desde matriz patrón.
```

- Línea 3740: patrones [no adop]

```text
síntesis textual no adoptiva desde matriz patrón.
```

- Línea 3754: patrones [advert]

```text
{lecturaComparativaMatrizPatron.advertencia ??
```

- Línea 3755: patrones [no adop]

```text
"Lectura comparativa no adoptiva; no selecciona ni descarta métodos."}
```

- Línea 3768: patrones [criterio]

```text
: "sin criterio hidráulico definido."}
```

- Línea 3825: patrones [Q-5]

```text
{renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
```

## Lectura técnica

- La auditoría identificó referencias existentes relacionadas con restricciones, advertencias, notas, criterios o mensajes de cautela.
- La auditoría no implementa cambios.
- La auditoría no modifica `textoExpediente`.
- La auditoría no modifica `ComparadorMultiMetodo.jsx`.
- La auditoría no modifica `construirExpedienteHidrologicoMinimo.js`.

## Decisión

Cualquier consolidación o ajuste posterior debe realizarse en una OT independiente, después de revisar esta evidencia.

## Próximo frente recomendado

`OT-0217 — Decisión sobre consolidación documental de restricciones y advertencias del expediente`