# OT-0046G2 — Diagnóstico de valores hidrológicos dinámicos en cero

## Estado previo

OT-0046F cerró el desbloqueo funcional de copia Q-5.

Commit:
d1e1dc1 fix(expediente): desbloquea copia Q5 desde payload canonico

OT-0046G1 cerró la normalización de identificación documental.

Commit:
103796d fix(expediente): normaliza identificacion en payload documental

## Resultado actual

El Expediente Inteligente ya copia y el resumen ejecutivo muestra:

- Cuenca: POST_OK
- Área: 46,8516 km²

## Problema pendiente

El expediente sigue exportando valores hidrológicos dinámicos en cero:

- Pe total: 0 mm
- Q-Tr: 0 m³/s
- Qp Q-5: 0 m³/s
- Tp Q-5: 0 min
- Volumen Q-5: 0 m³
- Diagnóstico Q(t): 0 filas

## Diagnóstico valor por valor

| Valor exportado | Ruta fuente esperada | Ruta que lee el payload | Causa probable | Clasificación |
|---|---|---|---|---|
| Pe total: 0 mm | `contextoBase.lluvia_efectiva_total_mm` publicado desde `HidroFlow.jsx` | `numeroSeguro(contextoBase?.lluvia_efectiva_total_mm)` en `construirPayloadExpedienteDesdeEstado.js` | El motor produjo lluvia efectiva total en cero. El dato existe, pero llega como cero. | Dato no calculado / fuente en cero |
| Q-Tr: 0 m³/s | `contextoBase.q_tr_activo_estado.q_tr_activo.Q` | `contextoBase?.q_tr_activo?.Q` y luego fallback a `q_tr_multiescenario` | El valor real esperado está anidado en `q_tr_activo_estado.q_tr_activo`, pero el payload intenta leer primero una ruta plana. Además, el fallback multiescenario también llega en cero. | Clave incompatible + fuente en cero |
| Qp Q-5: 0 m³/s | `contextoBase.hidrogramas.resultados[].Qp` / `Qpico` | `primerResultadoQ5(metodos)` y `extraerNumeroMetodo(q5, ["Qp", "qp", "Qpico", ...])` | `metodosQ5Payload` llega al expediente, pero sus valores fuente están en cero. | Dato no calculado / fuente en cero |
| Tp Q-5: 0 min | `contextoBase.hidrogramas.resultados[].Tp` / `tPico` | `extraerNumeroMetodo(q5, ["Tp", "tp", "tPico", ...])` | Misma cadena de Q-5; el valor fuente llega en cero. | Dato no calculado / fuente en cero |
| Volumen Q-5: 0 m³ | `contextoBase.hidrogramas.resultados[].volumen` / `volTotal` | `extraerNumeroMetodo(q5, ["volumen", "volTotal", ...])` | Misma cadena de Q-5; el volumen fuente llega en cero. | Dato no calculado / fuente en cero |
| Diagnóstico Q(t): 0 filas | `contextoBase.hidrogramas.resultados[].qSeries` | `calcularMetricasMorfologiaQt(candidato?.qSeries)` | `qSeries` existe o puede existir, pero todos los valores de Q están en cero; el diagnóstico no genera métricas efectivas. | Requiere qSeries con Q(t) no nulo |

## Localización de pérdidas

### Pe total

Archivo:
`01_APP/HIDROFLOW/src/services/documentos/construirPayloadExpedienteDesdeEstado.js`

Naturaleza:
lectura documental correcta; fuente en cero.

### Q-Tr

Archivo:
`01_APP/HIDROFLOW/src/services/documentos/construirPayloadExpedienteDesdeEstado.js`

Naturaleza:
clave incompatible. El constructor documental intenta leer `contextoBase.q_tr_activo.Q`, pero la estructura disponible está anidada como `contextoBase.q_tr_activo_estado.q_tr_activo.Q`.

### Q-5

Archivo:
`01_APP/HIDROFLOW/src/services/documentos/construirPayloadExpedienteDesdeEstado.js`

Naturaleza:
lectura documental correcta; fuente en cero.

### Diagnóstico Q(t)

Archivo:
`01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx`

Naturaleza:
la métrica temporal requiere `qSeries` con caudales no nulos. Si Q(t) está plano en cero, el diagnóstico retorna 0 filas.

## Dictamen

El problema principal de Pe, Q-5 y Q(t) está en el estado fuente generado desde el motor hidrológico, no en el constructor documental.

La excepción documental inmediata es Q-Tr, donde existe una incompatibilidad de ruta:

- ruta que lee el constructor: `contextoBase.q_tr_activo.Q`
- ruta disponible esperada: `contextoBase.q_tr_activo_estado.q_tr_activo.Q`

## Decisión

OT-0046G2 se cierra como diagnóstico.

No se modifica código en esta sub-OT.

## Siguiente sub-OT recomendada

OT-0046G2A — Normalización documental de Q-Tr activo anidado.

Objetivo:
Agregar fallback documental para que el constructor del expediente pueda leer `contextoBase.q_tr_activo_estado.q_tr_activo.Q` antes de caer a escenarios multiescenario.

## Pendiente posterior

OT-0046G2B — Auditoría del motor de lluvia efectiva e hidrogramas en cero.

Objetivo:
Rastrear por qué `lluvEfect`, Q-5 y Q(t) se generan en cero.
