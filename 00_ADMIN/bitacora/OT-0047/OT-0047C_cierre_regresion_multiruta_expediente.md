# OT-0047C — Cierre regresión multi-ruta del expediente firmado

## Objetivo

Cerrar la OT-0047 consolidando la regresión multi-ruta del expediente hidrológico mínimo firmado.

## Resultado práctico

Se validó que el expediente firmado conserva su integridad bajo rutas reales de navegación con contexto completo y que bloquea la copia cuando el contexto hidrológico está incompleto.

## Rutas evaluadas

### R1 — Hidrogramas → Comparador

Resultado: OK.

La validación vreg47 confirmó:

- Estación IDF: SAN CRISTOBAL.
- Lluvia efectiva total: 56.65 mm.
- Volumen esperado: 2.654.251 m³.
- Tabla Q-5 con 4 filas.
- Sin Qp cero evidente.
- Tabla Método Racional presente.
- Sello técnico presente.
- Sin undefined, null, NaN ni [object Object].

### R2 — Comparador directo sin contexto completo

Resultado: bloqueado correctamente.

La guardia del expediente impide copiar una salida firmada incompleta y muestra alerta indicando faltantes, entre ellos:

- Lluvia efectiva total.
- Volumen esperado.
- Tabla Q-5 auditada con filas reales.

### R3 — Hidrogramas → Racional → Comparador

Resultado: OK.

Se corrigió la preservación del contexto Q-5 al navegar por rutas intermedias, evitando que Racional borrara los hidrogramas ya publicados.

La validación confirmó:

- Estación IDF poblada.
- Lluvia efectiva poblada.
- Volumen esperado poblado.
- Q-5 con 4 filas.
- Sin Qp cero evidente.
- Racional presente.
- Sello técnico presente.

### R4 — Cambio de estación IDF

Resultado: OK.

La validación confirmó que el expediente mantiene campos críticos poblados después de la ruta de cambio de estación IDF.

### R5 — Cambio Tr activo

Resultado: no ejecutable en esta OT.

La auditoría confirmó que los Tr del Índice Hidrológico son chips visuales y no controles funcionales de estado global.

En HidroFlow existen Tr locales por módulo mediante BtnGroup y setTr, pero no existe todavía un Tr global de diseño controlado desde el Índice.

Por tanto, R5 queda diferida a una OT posterior dedicada a estado global Tr.

## Correcciones aplicadas

- Se agregó guardia para bloquear la copia de expedientes incompletos.
- Se preservó Q-5 al navegar rutas, evitando pérdida de contexto al pasar por Racional.
- Se validó que rutas completas sí permiten copia del expediente firmado.
- Se validó que rutas incompletas no exportan expediente parcial.

## Decisión técnica

No se implementa Tr global en OT-0047.

La activación real de Tr desde el Índice queda propuesta para OT-0048 — Estado global Tr de diseño.

## Restricciones respetadas

- No se usaron caudales externos como fundamento.
- No se usó SIATA para justificar caudales.
- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se alteró Q(t).
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Dictamen

OT-0047 certifica que el expediente hidrológico mínimo firmado es robusto bajo rutas reales con contexto completo y que se protege contra exportaciones parciales cuando falta contexto hidrológico.

El expediente ya no solo se genera: también se defiende frente a uso incompleto.

## Estado

OT-0047 lista para PR.
