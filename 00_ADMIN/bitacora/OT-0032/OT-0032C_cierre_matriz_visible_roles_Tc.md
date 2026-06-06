# OT-0032C — Cierre matriz visible de roles Tc

## Objetivo

Cerrar la OT-0032 consolidando la matriz visible de roles Tc en HidroFlow.

## Resultado práctico

Se incorporó en Hidrogramas una matriz visible que diferencia los principales roles Tc:

- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): valor usado por la ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal del hidrograma.
- Tc comparador: referencia especializada para coherencia Q-5.

## Decisión técnica

La matriz es informativa.

No se modifica el motor.

No se recalculan hidrogramas.

No se alteran Qp, Tp, Volumen ni Q(t).

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

## Nota operativa

El primer intento de inserción no ubicó el marcador visual exacto. Se aplicó posteriormente un commit correctivo que insertó la matriz de roles Tc de forma robusta.

## Dictamen

OT-0032 traduce la clasificación conceptual de OT-0031 a una lectura visible para el usuario, reduciendo la confusión entre Tc, duración de evento, lag SCS, Tc operativo Q(t) y Tc especializado del Comparador.

## Estado

OT-0032 lista para PR.
