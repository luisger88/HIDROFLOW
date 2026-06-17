# OT-0205A — Automatización segura del ciclo auditor-validación-comparación

## Objetivo

Definir el cambio de enfoque operativo para evitar continuar ejecutando manualmente, bloque por bloque, el ciclo auditoría-validación-comparación-consolidación del expediente hidrológico mínimo.

## Motivo

Durante el fortalecimiento del expediente hidrológico mínimo se consolidaron correctamente los bloques:

- `## 1. Identificación`;
- `## 2. Parámetros hidrológicos base`;
- `## 3. Tiempo de concentración y roles Tc`.

El método aplicado fue técnicamente seguro, pero operacionalmente costoso.

La ejecución manual mediante bloques largos de consola generó riesgos repetidos:

- here-strings incompletos;
- modo de continuación `>>`;
- archivos parciales;
- necesidad de recuperación manual;
- repetición excesiva de comandos;
- sensación de bucle operativo.

## Lectura Senior

La trazabilidad técnica no está equivocada.

La separación entre auditoría, validación aislada, comparación controlada y consolidación es correcta.

El problema está en la ejecución manual y repetitiva del patrón.

Por tanto, antes de avanzar a bloques más sensibles como Volumen, Q-Tr, Q-5, Método Racional o diagnóstico Q(t), se debe definir una estrategia de automatización segura.

## Alcance

Esta OT es exclusivamente documental y de decisión operativa.

No implementa automatización todavía.

No modifica código operativo.

No modifica helpers.

No modifica validadores existentes.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No toca Q-5 operativo.

No toca Método Racional.

No toca diagnóstico Q(t).

No toca motor hidrológico.

## Estado consolidado previo

| Bloque | Estado | Ciclo aplicado |
|---|---|---|
| Identificación | Cerrado | auditoría, validación, comparación, consolidación |
| Parámetros hidrológicos base | Cerrado | auditoría, validación, comparación, consolidación |
| Tiempo de concentración y roles Tc | Cerrado | auditoría, validación, comparación, consolidación |

## Bloques pendientes sensibles

| Bloque real integrado | Sensibilidad | Motivo |
|---|---|---|
| `construirLineasVolumenReferenciaExpediente(...)` | Alta | conecta Pe y volumen esperado |
| `construirLineasEscenarioQTrActivoExpediente(...)` | Alta | conecta escenario Q-Tr y caudal activo |
| `construirLineasResumenQ5AuditadoExpediente(...)` | Alta | conecta directamente Q-5 auditado |
| Bloques literales Método Racional | Alta | contraste técnico independiente |
| Diagnóstico temporal Q(t) | Alta | forma temporal, hidrogramas y lectura no adoptiva |

## Decisión operativa

No continuar inmediatamente con el siguiente helper sensible.

Antes de avanzar a Volumen, Q-Tr o Q-5, se decide abrir una fase de automatización operativa controlada.

La automatización debe reducir la dependencia de bloques largos pegados en consola y preparar una lógica reutilizable para agentes auditores/validadores.

## Patrón a automatizar

El patrón repetido que debe automatizarse es:

```text
1. Crear carpeta de OT.
2. Crear documento de apertura.
3. Crear script auditor o validador.
4. Ejecutar script.
5. Generar documento de evidencia.
6. Crear cierre.
7. Verificar diffs críticos.
8. Preparar commit y push.
```

## Agentes candidatos

Se identifican los siguientes agentes operativos futuros:

| Agente | Función | Estado |
|---|---|---|
| Agente Inventariador | Detectar bloques reales, helpers y rutas operativas | Candidato |
| Agente Auditor | Revisar trazabilidad de un bloque sin modificar código | Candidato |
| Agente Validador Aislado | Ejecutar casos controlados sobre un helper | Candidato |
| Agente Comparador | Comparar helper validado contra ruta operativa | Candidato |
| Agente Consolidador | Crear cierre documental de ciclo por bloque | Candidato |
| Agente Supervisor | Evitar avanzar a bloques sensibles sin decisión explícita | Candidato |

## Principio de seguridad

Ningún agente debe modificar motor, UI, `textoExpediente`, helpers o flujo de copiado sin una OT explícita de implementación.

Los agentes iniciales deben operar como generadores documentales y validadores externos.

## Relación con módulo Hidráulica

La experiencia adquirida en el expediente hidrológico mínimo debe servir como base metodológica para el futuro módulo Hidráulica.

En Hidráulica se requerirán agentes más fuertes para revisar geometría, secciones, cotas, pendientes, condiciones de borde, coherencia hidráulica y reportes técnicos.

Por tanto, conviene consolidar primero una arquitectura de agentes segura en Hidrología antes de ampliarla a Hidráulica.

## Decisión

Se detiene la progresión mecánica bloque por bloque.

Se prioriza diseñar una automatización segura del ciclo auditor-validación-comparación.

No se entra todavía a Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0206 — Diseño del generador operativo de OTs técnicas`
