# OT-0218B — Clasificación documental de restricciones y advertencias del expediente

## Resumen

```json
{
  "auditoriaBase": "OT-0216",
  "clasificacion": "OT-0218",
  "archivosRevisados": 2,
  "archivosExistentes": 2,
  "totalCoincidenciasClasificadas": 757,
  "categorias": {
    "restricciones_advertencias": {
      "nombre": "Restricciones y advertencias técnicas",
      "total": 28
    },
    "notas_aclaraciones": {
      "nombre": "Notas y aclaraciones documentales",
      "total": 6
    },
    "no_adopcion_no_competencia": {
      "nombre": "Mensajes no adoptivos o no competentes",
      "total": 66
    },
    "validacion_auditoria_criterio": {
      "nombre": "Validación, auditoría y criterios",
      "total": 37
    },
    "q5_racional_qt": {
      "nombre": "Referencias Q-5, Método Racional y diagnóstico Q(t)",
      "total": 140
    },
    "contraste_referencial": {
      "nombre": "Contraste, referencia y lectura comparativa",
      "total": 34
    },
    "volumen_qtr_pe": {
      "nombre": "Referencias a Volumen, Q-Tr, Pe o masa hidrológica",
      "total": 619
    },
    "sin_categoria_especifica": {
      "nombre": "Sin categoría específica",
      "total": 0
    }
  },
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Alcance

Esta clasificación organiza documentalmente la evidencia detectada en OT-0216.

No consolida textos.

No modifica archivos fuente.

No modifica `textoExpediente`, `ComparadorMultiMetodo.jsx` ni `construirExpedienteHidrologicoMinimo.js`.

## Archivos revisados

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — existe: true; coincidencias: 167
- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — existe: true; coincidencias: 590

## Clasificación por categorías

### Restricciones y advertencias técnicas

Total de coincidencias clasificadas: 28

Muestras representativas:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 22; patrones [restric, advert]

```text
"## 12. Restricciones y advertencias técnicas"
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 87; patrones [advert]

```text
advertencias: [],
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 305; patrones [restric, no adop, no selecciona, diagnóstico]

```text
"Restricción: diagnóstico no adoptivo; no selecciona método ni levanta No coherente.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 317; patrones [restric, advert]

```text
"## 12. Restricciones y advertencias técnicas",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 328; patrones [advert]

```text
const advertencias = [
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 337; patrones [advert]

```text
advertencias,
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 384; patrones [advert]

```text
advertencia:
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 973; patrones [advert]

```text
etiqueta: "Con advertencias",
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1477; patrones [advert]

```text
{conceptoCuenca.advertencias.length > 0 && (
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1485; patrones [advert]

```text
{conceptoCuenca.advertencias.map((advertencia, index) => (
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1487; patrones [advert]

```text
key={`advertencia-cuenca-${index}`}
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1495; patrones [advert]

```text
⚠ {advertencia}
```

Se omitieron 16 coincidencias adicionales de esta categoría para mantener la evidencia controlada.

### Notas y aclaraciones documentales

Total de coincidencias clasificadas: 6

Muestras representativas:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 269; patrones [nota, no selecciona, Pe]

```text
"Nota: este helper no selecciona ni recalcula Tc.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 418; patrones [nota, no implica]

```text
"Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.",
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 630; patrones [nota]

```text
nota: {
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1673; patrones [nota]

```text
<div style={estilos.nota}>
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1674; patrones [nota, volumen]

```text
<strong>Nota técnica:</strong> Qp, Tp y Volumen son leídos desde el motor
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 3106; patrones [no implica, Pe]

```text
Lectura diagnóstica: las métricas se calculan desde qSeries reales validadas. No implican adopción hidrológica, no levantan el estado global No coherente y no reemplazan el dictamen técnico del expediente.
```

### Mensajes no adoptivos o no competentes

Total de coincidencias clasificadas: 66

Muestras representativas:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 3; patrones [no recalcula, no modifica, Pe]

```text
// No modifica UI, no copia al portapapeles, no recalcula hidrogramas y no toca motor.
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 19; patrones [no adop, diagnóstico, Q(t)]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 250; patrones [no recalcula, no modifica, Pe]

```text
"Alcance: contrato inicial de construcción documental; no copia al portapapeles, no modifica UI y no recalcula resultados.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 269; patrones [nota, no selecciona, Pe]

```text
"Nota: este helper no selecciona ni recalcula Tc.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 300; patrones [no adop, diagnóstico, Q(t)]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 305; patrones [restric, no adop, no selecciona, diagnóstico]

```text
"Restricción: diagnóstico no adoptivo; no selecciona método ni levanta No coherente.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 318; patrones [no modifica]

```text
"- No modifica el motor hidrológico.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 319; patrones [no recalcula]

```text
"- No recalcula hidrogramas.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 561; patrones [no adop, validación, no recalcula, no modifica, Q-5, Pe]

```text
"Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 598; patrones [no adop, diagnóstico]

```text
"Estado general: diagnóstico no adoptivo.",
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 299; patrones [no adop]

```text
// Clasificación no adoptiva basada únicamente en métricas morfológicas ya calculadas.
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 321; patrones [no adop, diagnóstico]

```text
comentario: dictamen?.comentario ?? "Diagnóstico no adoptivo.",
```

Se omitieron 54 coincidencias adicionales de esta categoría para mantener la evidencia controlada.

### Validación, auditoría y criterios

Total de coincidencias clasificadas: 37

Muestras representativas:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 20; patrones [validación, Pe]

```text
"## 10. Validación interna del expediente exportado",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 307; patrones [validación, Pe]

```text
"## 10. Validación interna del expediente exportado",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 308; patrones [validación, Pe]

```text
"Estado de validación estructural: helper puro inicial con control de secciones y tokens inválidos.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 561; patrones [no adop, validación, no recalcula, no modifica, Q-5, Pe]

```text
"Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 41; patrones [auditor, Pe]

```text
obtenerAuditoriaPendienteTc,
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 42; patrones [auditor, criterio, Pe]

```text
obtenerCriterioPendientesAuditoria,
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 43; patrones [auditor, Pe]

```text
} from "../data/auditoriaPendientesTc";
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 886; patrones [auditor, Pe]

```text
const obtenerAuditoriaPendienteMetodo = (metodo) => {
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 889; patrones [auditor, Pe]

```text
return obtenerAuditoriaPendienteTc(metodo.id);
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1102; patrones [auditor, Pe]

```text
const auditoriaPendiente = obtenerAuditoriaPendienteMetodo(metodo);
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1104; patrones [auditor, Pe]

```text
if (!auditoriaPendiente) {
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1111; patrones [auditor, Pe]

```text
{auditoriaPendiente.pendienteEsperada}
```

Se omitieron 25 coincidencias adicionales de esta categoría para mantener la evidencia controlada.

### Referencias Q-5, Método Racional y diagnóstico Q(t)

Total de coincidencias clasificadas: 140

Muestras representativas:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 15; patrones [Q-5]

```text
"## 6. Resumen Q-5 auditado",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 16; patrones [contraste, Método Racional, Pe]

```text
"## 7. Método Racional — contraste global independiente",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 17; patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 18; patrones [Q-5, volumen, Pe]

```text
"## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 19; patrones [no adop, diagnóstico, Q(t)]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 286; patrones [Q-5]

```text
"## 6. Resumen Q-5 auditado",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 290; patrones [contraste, Método Racional, Pe]

```text
"## 7. Método Racional — contraste global independiente",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 294; patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 295; patrones [Q-5, Método Racional, Pe]

```text
"Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 297; patrones [Q-5, volumen, Pe]

```text
"## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 300; patrones [no adop, diagnóstico, Q(t)]

```text
"## Diagnóstico temporal Q(t) no adoptivo",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 305; patrones [restric, no adop, no selecciona, diagnóstico]

```text
"Restricción: diagnóstico no adoptivo; no selecciona método ni levanta No coherente.",
```

Se omitieron 128 coincidencias adicionales de esta categoría para mantener la evidencia controlada.

### Contraste, referencia y lectura comparativa

Total de coincidencias clasificadas: 34

Muestras representativas:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 16; patrones [contraste, Método Racional, Pe]

```text
"## 7. Método Racional — contraste global independiente",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 17; patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 290; patrones [contraste, Método Racional, Pe]

```text
"## 7. Método Racional — contraste global independiente",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 291; patrones [contraste, Pe]

```text
"Uso: contraste global independiente de caudal pico.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 294; patrones [contraste, Q-5, Método Racional]

```text
"## 8. Contraste Q-5 vs Método Racional",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 295; patrones [Q-5, Método Racional, Pe]

```text
"Lectura técnica: Q-5 y Método Racional son complementarios, pero no equivalentes.",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 601; patrones [referencial]

```text
"Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.",
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 358; patrones [no adop, diagnóstico]

```text
comentario: riesgoTemporal?.comentario ?? "Diagnóstico comparativo no adoptivo.",
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 947; patrones [referencial]

```text
return { etiqueta: "Referencial", color: "#f59e0b" };
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 971; patrones [referencial]

```text
} else if (resumenCoherencia.includes("Referencial")) {
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1196; patrones [referencial, volumen]

```text
? `comparativo/referencial; volumen en escala; ${estadoTemporal}; requiere justificación técnica.`
```

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx — línea 1198; patrones [volumen]

```text
? `comparativo sensible; volumen en escala; ${estadoTemporal}; revisar concentración del pico.`
```

Se omitieron 22 coincidencias adicionales de esta categoría para mantener la evidencia controlada.

### Referencias a Volumen, Q-Tr, Pe o masa hidrológica

Total de coincidencias clasificadas: 619

Muestras representativas:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 1; patrones [Pe]

```text
// OT-0110B — Helper puro inicial del expediente hidrológico mínimo.
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 2; patrones [Pe]

```text
// Este helper NO está integrado todavía al botón de copiado.
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 3; patrones [no recalcula, no modifica, Pe]

```text
// No modifica UI, no copia al portapapeles, no recalcula hidrogramas y no toca motor.
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 5; patrones [Pe]

```text
export const VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO =
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 6; patrones [Pe]

```text
"expediente_hidrologico_minimo_v0_1";
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 8; patrones [Pe]

```text
export const SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO = Object.freeze([
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 9; patrones [Pe]

```text
"# Expediente hidrológico mínimo — Cuenca activa",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 13; patrones [volumen]

```text
"## 4. Volumen de referencia",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 14; patrones [Q-Tr]

```text
"## 5. Escenario Q-Tr activo — control de trazabilidad",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 16; patrones [contraste, Método Racional, Pe]

```text
"## 7. Método Racional — contraste global independiente",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 18; patrones [Q-5, volumen, Pe]

```text
"## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js — línea 20; patrones [validación, Pe]

```text
"## 10. Validación interna del expediente exportado",
```

Se omitieron 607 coincidencias adicionales de esta categoría para mantener la evidencia controlada.

### Sin categoría específica

Total: 0

## Lectura técnica

- La evidencia de OT-0216 no debe consolidarse directamente sin una decisión posterior.
- Las referencias detectadas mezclan restricciones, advertencias, notas, mensajes no adoptivos, validaciones y referencias a bloques sensibles.
- La clasificación permite separar el análisis antes de cualquier eventual consolidación.

## Decisión

Cualquier consolidación o ajuste posterior debe realizarse en una OT independiente.

## Próximo frente recomendado

`OT-0219 — Decisión sobre bloque de restricciones y advertencias clasificadas`