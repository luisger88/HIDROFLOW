# OT-0046F — Desbloqueo funcional de copia expediente Q-5

## Resultado

El botón "Copiar expediente hidrológico mínimo" dejó de bloquear por:

- Tabla Q-5 auditada con filas reales

## Cambios aplicados

- Se unificó la obtención de métodos Q-5 válidos mediante helper local.
- `filasQ5Markdown` y `metodosQ5Payload` ahora comparten fuente canónica.
- Se mantiene filtro estricto Qp/Tp/volumen numéricos.
- No se relajó `tieneHidrogramasPublicados`.
- No se agregaron `console.log`.
- `npm run build` aprobado.

## Estado técnico

Aprobado funcionalmente.

## Limitación detectada

El expediente se copia, pero aún exporta valores hidrológicos incompletos:

- Cuenca: NO DETECTADO
- Pe total: 0 mm
- Q-Tr: 0 m³/s
- Qp/Tp/Volumen Q-5: 0
- Diagnóstico Q(t): 0 filas

## Próxima OT recomendada

OT-0046G — Consolidación de verdad hidrológica exportada en Expediente Inteligente.

Objetivo:
Transportar valores reales de cuenca, área, Pe, Q-Tr, Qp, Tp, volumen Q-5 y diagnóstico Q(t) al expediente copiado.
