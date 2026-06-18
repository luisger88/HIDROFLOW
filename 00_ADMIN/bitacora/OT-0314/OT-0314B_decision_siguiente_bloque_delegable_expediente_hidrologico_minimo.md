# OT-0314B — Decisión siguiente bloque delegable del expediente hidrológico mínimo

## Propósito

Definir documentalmente el siguiente bloque del expediente hidrológico mínimo que conviene delegar mediante helper puro, manteniendo el enfoque de bajo coste, alto valor documental, bajo riesgo funcional y continuidad con la arquitectura ya validada.

Esta OT no implementa helper, no modifica código funcional y no acopla nuevos bloques.

## Antecedente inmediato

La línea del bloque `Resumen Q-5 auditado` quedó consolidada así:

- OT-0307 — Validación aislada helper bloque Resumen Q-5 auditado.
- OT-0308 — Ajuste criterio validación aislada helper resumen Q-5.
- OT-0309 — Decisión integración helper resumen Q-5.
- OT-0310 — Diseño punto acople helper resumen Q-5.
- OT-0311 — Acople mínimo helper resumen Q-5.
- OT-0312 — Validación acople helper resumen Q-5.
- OT-0313 — Revalidación salida real helper resumen Q-5.

Resultado consolidado:

- Helper diseñado.
- Helper validado.
- Acople diseñado.
- Acople aplicado.
- Acople validado.
- Salida real/exportable revalidada.
- main estabilizado.
- working tree limpio.

## Criterios de decisión

La selección del siguiente bloque delegable se realiza con base en los siguientes criterios:

| Criterio | Descripción |
|---|---|
| Bajo coste | El bloque debe poder delegarse sin reabrir motor, UI ni cálculos. |
| Alto valor documental | Debe mejorar la robustez institucional del expediente. |
| Bajo riesgo funcional | Debe reducir la probabilidad de regresión o reinterpretación técnica. |
| Continuidad arquitectónica | Debe seguir el patrón helper puro, validación aislada, decisión, acople y revalidación. |
| Trazabilidad institucional | Debe ayudar a que el expediente sea claro, defendible y no ambiguo. |
| No adopción automática | Debe reforzar que el expediente documenta resultados, pero no adopta por sí mismo decisiones hidrológicas. |

## Bloques candidatos evaluados

| Bloque candidato | Valor documental | Riesgo funcional | Coste esperado | Observación |
|---|---:|---:|---:|---|
| `## 7. Método Racional — contraste global independiente` | Alto | Medio | Medio | Puede requerir cuidado adicional para no convertir contraste en adopción o competencia principal. |
| `## 8. Contraste Q-5 vs Método Racional` | Alto | Medio | Medio | Tiene valor técnico, pero puede inducir lectura comparativa si no se blinda muy bien. |
| `## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5` | Muy alto | Medio/alto | Medio/alto | Es valioso, pero toca coherencia hidrológica sensible y conviene no abordarlo sin diseño específico. |
| `## 10. Restricciones, advertencias y no adopción automática` | Muy alto | Bajo | Bajo | Refuerza el carácter documental, no adoptivo y trazable del expediente sin recalcular ni reinterpretar. |

## Matriz corta de decisión

Escala documental: 1 bajo, 5 alto.

| Bloque candidato | Bajo coste | Alto valor | Bajo riesgo | Continuidad | Trazabilidad | Puntaje |
|---|---:|---:|---:|---:|---:|---:|
| Método Racional | 3 | 4 | 3 | 4 | 4 | 18 |
| Contraste Q-5 vs Método Racional | 3 | 4 | 3 | 4 | 4 | 18 |
| Control Pe–Área–Volumen/Q-5 | 2 | 5 | 2 | 4 | 5 | 18 |
| Restricciones, advertencias y no adopción automática | 5 | 5 | 5 | 5 | 5 | 25 |

## Decisión

Se selecciona como siguiente bloque delegable:

`## 10. Restricciones, advertencias y no adopción automática`

## Justificación Senior

El bloque `Restricciones, advertencias y no adopción automática` es el siguiente frente más prudente porque:

- No exige recalcular Tc.
- No exige recalcular Q-Tr.
- No exige recalcular Q-5.
- No exige reinterpretar hidrogramas.
- No exige seleccionar método adoptado.
- No exige emitir dictamen de suficiencia hidrológica.
- No toca el Método Racional funcionalmente.
- No toca diagnóstico Q(t).
- Refuerza la lectura institucional del expediente.
- Reduce el riesgo de que el expediente se lea como adopción automática de resultados.
- Consolida el carácter documental y trazable del producto exportable.

## Alcance de la decisión

Esta decisión habilita una OT posterior para diseñar el contrato del bloque seleccionado.

No autoriza todavía:

- Crear helper funcional.
- Acoplar el bloque.
- Modificar el constructor.
- Modificar el comparador.
- Modificar textoExpediente.
- Modificar motor.
- Recalcular variables hidrológicas.
- Cambiar criterios técnicos.
- Emitir dictamen hidrológico.

## Próximo frente recomendado

OT-0315 — Diseño contractual del bloque Restricciones, advertencias y no adopción automática del expediente

## Restricción reforzada

El siguiente frente debe mantener el patrón ya probado:

Decisión documental → diseño contractual → helper puro → validación aislada → decisión de integración → diseño de acople → acople mínimo → validación de acople → revalidación de salida real/exportable.

## Conclusión

OT-0314 define que el siguiente bloque delegable debe ser `Restricciones, advertencias y no adopción automática`, por ser el bloque de mejor relación entre bajo coste, alto valor documental, bajo riesgo funcional y utilidad institucional para el expediente hidrológico mínimo.
