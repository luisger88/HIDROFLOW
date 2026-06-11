# OT-0059A — Auditoría de estructura actual del expediente exportable

Fecha de auditoría: 2026-06-10 19:22:29

## Estado base

- Rama base: main estabilizado post OT-0058.
- Último merge post OT-0058 observado: 696f60b.
- Ciclo reciente cerrado: OT-0056 Q-Tr/expediente/sello, OT-0057 consistencia cruzada exportable y OT-0058 panel visual de consistencia cruzada.
- Alcance de OT-0059A: auditoría documental y estructural. No se modifica motor hidrológico, fórmulas, cálculo Q-Tr, cálculo Q-5, Método Racional ni consistencia cruzada.

## Tesis técnica

OT-0059A inicia la consolidación del expediente hidrológico como salida técnica verificable. El objetivo no es crear PDF, Word, mapas ni exportaciones documentales complejas, sino auditar la estructura textual/exportable existente para preparar una normalización posterior del contenido en OT-0059B.

## Archivos fuente auditados

Total de archivos JS/JSX/TS/TSX auditados bajo 01_APP\HIDROFLOW\src: 65

## Inventario de coincidencias por patrón

### Patrón: `Copiar expediente`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 1 coincidencia(s)

### Patrón: `expediente hidrológico`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 8 coincidencia(s)

### Patrón: `expediente hidrologico`

- Sin coincidencias.

### Patrón: `expediente`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 85 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx — 1 coincidencia(s)

### Patrón: `sello técnico`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 4 coincidencia(s)

### Patrón: `sello tecnico`

- Sin coincidencias.

### Patrón: `consistencia cruzada`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 3 coincidencia(s)

### Patrón: `Q-Tr`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 8 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.jsx — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\qtr\derivarEstadoQTrActivo.js — 1 coincidencia(s)

### Patrón: `Q Tr`

- Sin coincidencias.

### Patrón: `Q-5`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 37 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx — 3 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.jsx — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\qtr\derivarEstadoQTrActivo.js — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\metodosComparadorCatalogo.js — 1 coincidencia(s)

### Patrón: `Q5`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 52 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.jsx — 2 coincidencia(s)

### Patrón: `Método Racional`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 13 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\hidroEngine.js — 4 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx — 4 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\matrizCompetenciaComparador.js — 3 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.BACKUP.20260316_0317.jsx — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\clasificacionCuenca.js — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.jsx — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\metodosComparadorCatalogo.js — 1 coincidencia(s)

### Patrón: `Metodo Racional`

- Sin coincidencias.

### Patrón: `racional`

- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx — 43 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.jsx — 28 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 24 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\hidroEngine.js — 15 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.BACKUP.20260316_0317.jsx — 10 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx — 10 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\matrizCompetenciaComparador.js — 7 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\clasificacionCuenca.js — 4 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\metodosComparadorCatalogo.js — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\tcSelector.js — 1 coincidencia(s)

### Patrón: `undefined`

- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx — 15 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 6 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.jsx — 4 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.BACKUP.20260316_0317.jsx — 3 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\matrizCompetenciaComparador.js — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\pendientesAdapter.js — 2 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\clasificacionCuenca.js — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\dominio\indicesForma.ts — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\qtr\derivarEstadoQTrActivo.js — 1 coincidencia(s)

### Patrón: `null`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 48 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.jsx — 47 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx — 37 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\hidroEngine.js — 15 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx — 14 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\qtr\derivarEstadoQTrActivo.js — 14 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\matrizCompetenciaComparador.js — 13 coincidencia(s)
- 01_APP\HIDROFLOW\src\dominio\CuencaGeomorfologica.ts — 12 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\clasificacionCuenca.js — 9 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\tc\calcTc.ts — 8 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.BACKUP.20260316_0317.jsx — 7 coincidencia(s)
- 01_APP\HIDROFLOW\src\data\cuencasCatalogo.js — 6 coincidencia(s)

### Patrón: `NaN`

- 01_APP\HIDROFLOW\src\HidroFlow.BACKUP.20260316_0317.jsx — 11 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx — 10 coincidencia(s)
- 01_APP\HIDROFLOW\src\HidroFlow.jsx — 10 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\sensibilidad\compararTcVsAMC.ts — 6 coincidencia(s)
- 01_APP\HIDROFLOW\src\dominio\motorTc.ts — 6 coincidencia(s)
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\dominio\SAR.ts — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\sar\calcularSAR.ts — 1 coincidencia(s)
- 01_APP\HIDROFLOW\src\services\tcSelector.js — 1 coincidencia(s)

### Patrón: `[object Object]`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx — 1 coincidencia(s)

## Evidencia focalizada de líneas candidatas

Se listan coincidencias limitadas para evitar salida masiva. Esta evidencia orienta la intervención posterior, pero no constituye modificación funcional.

### Evidencia para patrón: `Copiar expediente`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784 — `Copiar expediente hidrológico mínimo`

### Evidencia para patrón: `expediente hidrológico`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1295 — `"Tipo de salida: Expediente hidrológico mínimo.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1523 — `"Expediente hidrológico mínimo incompleto.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576 — `"# Expediente hidrológico mínimo — Cuenca activa",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1700 — `"Tipo de salida: Expediente hidrológico mínimo.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1717 — `"# Expediente hidrológico mínimo — Cuenca activa",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1778 — `window.alert("Expediente hidrológico mínimo copiado al portapapeles.");`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1780 — `window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784 — `Copiar expediente hidrológico mínimo`

### Evidencia para patrón: `expediente hidrologico`

- Sin evidencia focalizada.

### Evidencia para patrón: `expediente`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:1050 — `y trazabilidad para soporte de expediente técnico.`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1125 — `y trazabilidad para soporte de expediente técnico.`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1295 — `"Tipo de salida: Expediente hidrológico mínimo.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1300 — ``Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1345 — `const formatearNumeroExpediente = (valor, decimales = 2) => {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1360 — `const obtenerEstadoTemporalExpediente = (resultadoQ) => {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1378 — `const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1391 — `const metodosQ5Expediente = metodos.filter(`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1409 — `const construirFilaQ5Expediente = (nombreMetodo, resultadoQ, dictamenMetodo = null) => {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1410 — `const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413 — `obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415 — `return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volu...`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418 — `const filasQ5DesdeCatalogo = metodosQ5Expediente`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1421 — `const estadoTemporal = obtenerEstadoTemporalExpediente(resultadoQ);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1422 — `const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1425 — `return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467 — `return construirFilaQ5Expediente(nombreMetodo, resultadoQ);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1481 — `const estacionIdfExpediente = [`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1491 — `const faltantesExpediente = [];`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1493 — `if (!estacionIdfExpediente) {`

### Evidencia para patrón: `sello técnico`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1293 — `"## 9. Sello técnico de generación",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692 — `"Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, restricciones y sello técnico.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1698 — `"## 9. Sello técnico de generación",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1725 — `"## 9. Sello técnico de generación"`

### Evidencia para patrón: `sello tecnico`

- Sin evidencia focalizada.

### Evidencia para patrón: `consistencia cruzada`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1676 — `"## Control de consistencia cruzada Pe–Área–Volumen/Q-5",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1723 — `"## Control de consistencia cruzada Pe–Área–Volumen/Q-5",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1872 — `Panel visual de consistencia cruzada OT-0058`

### Evidencia para patrón: `Q-Tr`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1608 — `"## Escenario Q-Tr activo — control de trazabilidad",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1684 — ``Q-Tr activo: ${estadoQTrActivoExpediente?.estado ?? "no_publicado"}`,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692 — `"Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, restricciones y sello técnico.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1693 — `"Q-Tr activo: trazado desde q_tr_activo_estado y verificado como sección exportable.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1718 — `"## Escenario Q-Tr activo — control de trazabilidad",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1893 — `<div><strong>Q-Tr activo:</strong> {estadoQTrActivo}</div>`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1938 — `Bloque Q-Tr activo · Escenario de diseño controlado`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1973 — `Campos mínimos completos para trazabilidad visual del Q-Tr activo.`
- 01_APP\HIDROFLOW\src\services\qtr\derivarEstadoQTrActivo.js:1 — `// Adaptador puro Q-Tr activo.`
- 01_APP\HIDROFLOW\src\HidroFlow.jsx:2198 — `// OT-0056C4 refresca Q-Tr activo con Pe total sin recalcular caudales.`
- 01_APP\HIDROFLOW\src\HidroFlow.jsx:2205 — `// OT-0056F preserva estacion IDF en Q-Tr activo cuando Hidrogramas refresca el contexto.`

### Evidencia para patrón: `Q Tr`

- Sin evidencia focalizada.

### Evidencia para patrón: `Q-5`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:95 — `bloque: "Q-5"`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:1047 — `Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:1192 — `{renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:109 — `bloque: "Q-5"`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:805 — `Dictamen Q-5: {metodo.nombre?.includes("SCS Unit")`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1122 — `Catálogo técnico Tc-15 / Q-5 para comparar tiempos de concentración,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1268 — `Resumen ejecutivo Q-5 post auditoría: SCS Unit Hydrograph queda como candidato principal de referencia; SCS Mod. como variante ajustable; Snyder, Williams & Hann y Clark IUH como comparativos/referenciales. La masa y el ...`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1274 — `"# Resumen técnico Q-5 post auditoría",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284 — `"- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1326 — `window.alert("Resumen técnico Q-5 copiado al portapapeles.");`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1328 — `window.prompt("No fue posible copiar automáticamente. Copie manualmente el resumen técnico Q-5:", textoResumenQ5);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1333 — `Copiar resumen técnico Q-5`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1415 — `return `| ${String(nombreMetodo ?? "Método Q-5").replaceAll("|", "/")} | ${formatearNumeroExpediente(resultadoQ?.Qp)} m³/s | ${formatearNumeroExpediente(resultadoQ?.Tp)} min | ${formatearNumeroExpediente(resultadoQ?.volu...`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1423 — `const nombreMetodo = String(metodo.nombre ?? "Método Q-5").replaceAll("|", "/");`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1438 — `"Método Q-5";`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1510 — `faltantesExpediente.push("Tabla Q-5 auditada con filas reales");`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1601 — `"- Tc comparador: referencia especializada para coherencia Q-5.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1623 — `"Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1625 — `"## 5. Resumen Q-5 auditado",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1633 — `"Tabla Q-5 auditada:",`

### Evidencia para patrón: `Q5`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1273 — `const textoResumenQ5 = [`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1306 — `areaTextoResumen.value = textoResumenQ5;`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1328 — `window.prompt("No fue posible copiar automáticamente. Copie manualmente el resumen técnico Q-5:", textoResumenQ5);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1378 — `const obtenerDictamenQ5Expediente = (metodo, estadoTemporal) =>`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1391 — `const metodosQ5Expediente = metodos.filter(`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1397 — `const obtenerCandidatosQ5Contexto = () => {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1409 — `const construirFilaQ5Expediente = (nombreMetodo, resultadoQ, dictamenMetodo = null) => {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1413 — `obtenerDictamenQ5Expediente({ nombre: nombreMetodo }, estadoTemporal);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1418 — `const filasQ5DesdeCatalogo = metodosQ5Expediente`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1422 — `const dictamen = obtenerDictamenQ5Expediente(metodo, estadoTemporal);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1425 — `return construirFilaQ5Expediente(nombreMetodo, resultadoQ, dictamen);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1429 — `const filasQ5DesdeContexto = obtenerCandidatosQ5Contexto()`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1467 — `return construirFilaQ5Expediente(nombreMetodo, resultadoQ);`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1471 — `const filasQ5Markdown =`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1472 — `filasQ5DesdeCatalogo.length > 0`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1473 — `? filasQ5DesdeCatalogo`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1474 — `: filasQ5DesdeContexto;`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1476 — `const tablaQ5Markdown = [`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1479 — `...filasQ5Markdown`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1509 — `if (!Array.isArray(filasQ5Markdown) || filasQ5Markdown.length === 0) {`

### Evidencia para patrón: `Método Racional`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284 — `"- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517 — `faltantesExpediente.push("Tabla Método Racional");`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1637 — `"## 6. Método Racional — contraste global independiente",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1650 — `"Tabla Método Racional:",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1659 — `"Estado: sección informativa; consultar módulo Método Racional."`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663 — `"## 7. Contraste Q-5 vs Método Racional",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665 — `"Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666 — `"Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1686 — `"Método Racional: presente como contraste global independiente.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692 — `"Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, restricciones y sello técnico.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1695 — `"Método Racional: presente como contraste global independiente.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1720 — `"## 6. Método Racional — contraste global independiente",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1721 — `"## 7. Contraste Q-5 vs Método Racional",`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:885 — `{/* 7. Método racional */}`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:887 — `<h3 style={estilos.cardTitle}>⑦ Método racional</h3>`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:947 — `Para La Iguaná PC_80, el Método Racional se conserva como contraste`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:960 — `Ver método racional`
- 01_APP\HIDROFLOW\src\data\clasificacionCuenca.js:74 — `"Área entre 25 y 100 km². Es recomendable usar modelos lluvia-escorrentía e hidrogramas; el método racional debe tratarse con cautela o como contraste.",`
- 01_APP\HIDROFLOW\src\data\clasificacionCuenca.js:204 — `"El Método Racional no debe adoptarse automáticamente como método principal; debe mantenerse como contraste o referencia."`
- 01_APP\HIDROFLOW\src\data\matrizCompetenciaComparador.js:99 — `"No hay área de cuenca disponible para evaluar competencia del Método Racional.",`

### Evidencia para patrón: `Metodo Racional`

- Sin evidencia focalizada.

### Evidencia para patrón: `racional`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1284 — `"- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1394 — `!String(metodo.nombre ?? "").toLowerCase().includes("racional")`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1430 — `.filter((h) => !String(h?.metodo ?? h?.nombre ?? h?.label ?? h?.name ?? "").toLowerCase().includes("racional"))`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1514 — `!Array.isArray(contextoBase?.metodo_racional?.resultados) ||`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1515 — `contextoBase.metodo_racional.resultados.length === 0`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1517 — `faltantesExpediente.push("Tabla Método Racional");`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1637 — `"## 6. Método Racional — contraste global independiente",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1641 — `...(Array.isArray(contextoBase?.metodo_racional?.resultados) &&`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1642 — `contextoBase.metodo_racional.resultados.length > 0`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1644 — ``Tc racional exportado: ${`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1645 — `Number.isFinite(Number(contextoBase?.metodo_racional?.tc_min))`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1646 — `? Number(contextoBase.metodo_racional.tc_min).toFixed(2) + " min"`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1650 — `"Tabla Método Racional:",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1653 — `...contextoBase.metodo_racional.resultados.map((r) =>`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1659 — `"Estado: sección informativa; consultar módulo Método Racional."`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1663 — `"## 7. Contraste Q-5 vs Método Racional",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1665 — `"Método Racional: contraste global independiente de caudal pico basado en intensidad, coeficiente C, área y Tc.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1666 — `"Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1686 — `"Método Racional: presente como contraste global independiente.",`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1692 — `"Secciones obligatorias controladas: Q-Tr activo, Q-5 auditado, Método Racional, contraste, restricciones y sello técnico.",`

### Evidencia para patrón: `undefined`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:71 — `if (Tc_final !== null && Tc_final !== undefined) {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83 — `if (Tc_final !== null && Tc_final !== undefined) {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1346 — `if (valor === null || valor === undefined || valor === "") {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1543 — `if (valor === null || valor === undefined || valor === "") return "—";`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1593 — ``Tc comparador: ${Tc_final !== null && Tc_final !== undefined ? Number(Tc_final).toFixed(1) + " min" : "—"}`,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1711 — `const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1919 — `if (valor === null || valor === undefined || valor === "") return "—";`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:179 — `if (valor === null || valor === undefined || valor === "") return "—";`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:199 — `if (p?.tr !== undefined) return `Tr ${p.tr} años`;`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:443 — `if (valor === null || valor === undefined || valor === "") {`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:633 — `{CN_base !== null && CN_base !== undefined`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:642 — `{CN_efectivo !== null && CN_efectivo !== undefined`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:644 — `: CN !== null && CN !== undefined`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:658 — `{S_mm !== null && S_mm !== undefined`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:667 — `{Ia_mm !== null && Ia_mm !== undefined`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:677 — `porcentaje_impermeable !== undefined`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:705 — `{tcState?.Tc_final !== null && tcState?.Tc_final !== undefined`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:729 — `resumenTc?.min_min !== undefined &&`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:731 — `resumenTc?.max_min !== undefined`
- 01_APP\HIDROFLOW\src\components\IndiceHidrologico.jsx:751 — `tcState?.Tc_final !== undefined &&`

### Evidencia para patrón: `null`

- 01_APP\HIDROFLOW\src\agents\tcAgent.js:6 — `Tc_final: null,`
- 01_APP\HIDROFLOW\src\agents\tcAgent.js:7 — `metodosTc: null,`
- 01_APP\HIDROFLOW\src\agents\tcAgent.js:8 — `contextoTc: null`
- 01_APP\HIDROFLOW\src\agents\trAgent.js:4 — `actualizado_en: null`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:22 — `export default function ComparadorMultiMetodo({ contexto = null }) {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:71 — `if (Tc_final !== null && Tc_final !== undefined) {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:493 — `null`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:497 — `return null;`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:502 — `if (!bruto) return null;`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:540 — `if (!match) return null;`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:562 — `return null;`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:569 — `Qp: null,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:570 — `Tp: null,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:571 — `volumen: null,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:603 — `Qp: null,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:604 — `Tp: null,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:605 — `volumen: null,`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.BACKUP_antes_restaurar.jsx:619 — `if (metodo.tipo !== "tc") return null;`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:23 — `export default function ComparadorMultiMetodo({ contexto = null }) {`
- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:83 — `if (Tc_final !== null && Tc_final !== undefined) {`

### Evidencia para patrón: `NaN`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1711 — `const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];`
- 01_APP\HIDROFLOW\src\dominio\motorTc.ts:53 — `return { metodo: "NRCS TR-55 (segmentado)", tc_h: NaN, tc_min: NaN, notas: "TODO: sumar sheet+shallow+channel con límites de aplicabilidad" };`
- 01_APP\HIDROFLOW\src\dominio\motorTc.ts:56 — `return { metodo: "Kerby-Hathaway (overland)", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };`
- 01_APP\HIDROFLOW\src\dominio\motorTc.ts:59 — `return { metodo: "Bransby-Williams", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };`
- 01_APP\HIDROFLOW\src\dominio\motorTc.ts:62 — `return { metodo: "Izzard", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };`
- 01_APP\HIDROFLOW\src\dominio\motorTc.ts:65 — `return { metodo: "Johnstone-Cross", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };`
- 01_APP\HIDROFLOW\src\dominio\motorTc.ts:68 — `return { metodo: "Ventura (local)", tc_h: NaN, tc_min: NaN, notas: "TODO: calibrar" };`
- 01_APP\HIDROFLOW\src\dominio\SAR.ts:24 — `estadoGobernante: EstadoSAR; // Siempre PRE_URBANO para Qd`
- 01_APP\HIDROFLOW\src\services\sar\calcularSAR.ts:41 — `estadoGobernante: "PRE_URBANO",`
- 01_APP\HIDROFLOW\src\services\sensibilidad\compararTcVsAMC.ts:10 — `factorDominante: "Tc" | "AMC" | "Similar";`
- 01_APP\HIDROFLOW\src\services\sensibilidad\compararTcVsAMC.ts:42 — `// --- Dominancia ---`
- 01_APP\HIDROFLOW\src\services\sensibilidad\compararTcVsAMC.ts:43 — `let factorDominante: "Tc" | "AMC" | "Similar" = "Similar";`
- 01_APP\HIDROFLOW\src\services\sensibilidad\compararTcVsAMC.ts:47 — `factorDominante = "Tc";`
- 01_APP\HIDROFLOW\src\services\sensibilidad\compararTcVsAMC.ts:54 — `factorDominante = "AMC";`
- 01_APP\HIDROFLOW\src\services\sensibilidad\compararTcVsAMC.ts:70 — `factorDominante,`
- 01_APP\HIDROFLOW\src\services\tcSelector.js:30 — `if (valor && !isNaN(valor)) {`
- 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1572 — `})).sort((a,b)=>b.score-a.score).map((e,j)=>({...e,rank:j+1,dominante:j===0}));`
- 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1648 — `{[[C.gold,"Cuenca objetivo"],[C.teal,"Dominante"],[C.accent2,"Alta inf. (>12%)"],[C.accent,"Media inf."],[C.muted2,"Baja inf."],[C.rose,"Mantenimiento"]].map(([col,lbl],i)=>(`
- 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1694 — `const dominante=pond[0];`
- 01_APP\HIDROFLOW\src\HidroFlow - copia.jsx:1696 — `const idfDom=dominante?.epm_key&&ESTACIONES_EPM[dominante.epm_key]?idfI(ESTACIONES_EPM[dominante.epm_key],dMin,Tr):0;`

### Evidencia para patrón: `[object Object]`

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1711 — `const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];`

## Lectura técnica preliminar

La auditoría OT-0059A debe permitir confirmar la ubicación real de la construcción textual/exportable del expediente hidrológico mínimo y sus bloques asociados: Q-Tr, Q-5, Método Racional, contraste Q-5 vs Racional, consistencia cruzada, panel visual y sello técnico.

## Restricciones de intervención

- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar cálculo de lluvia efectiva, Q-Tr, Q-5 ni Método Racional.
- No abrir generación PDF, Word, mapas ni exportaciones documentales complejas en OT-0059.
- La intervención posterior debe limitarse a orden, claridad, trazabilidad textual y estado técnico del expediente.

## Criterio de salida de OT-0059A

OT-0059A se considera completa cuando quede documentado el inventario de archivos, patrones y líneas candidatas que soportan la estructura actual del expediente exportable, dejando preparada la normalización técnica de OT-0059B.

