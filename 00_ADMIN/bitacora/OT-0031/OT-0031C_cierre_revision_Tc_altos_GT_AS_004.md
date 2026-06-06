# OT-0031C — Cierre revisión Tc altos frente a GT-AS-004

## Objetivo

Cerrar la OT-0031 consolidando la revisión conceptual de los tiempos de concentración altos frente al marco metodológico de GT-AS-004.

## Resultado

Se clasificaron las principales rutas Tc visibles en HidroFlow:

- Tc-IDF / caudal pico.
- Tc-Q(t) operativo.
- Lag / forma SCS.
- Duración de evento 3 h.
- Tc especializado del Comparador.
- Tc de métodos alternativos.

## Marco técnico

GT-AS-004 diferencia usos hidrológicos que no deben confundirse:

- generación de hidrogramas mediante SCS;
- volumen de almacenamiento/regulación asociado a hidrogramas post y pre/natural;
- evento de 3 horas para almacenamiento/regulación;
- caudal pico de elementos hidráulicos asociado a duración equivalente al Tc o criterio normativo aplicable;
- metodologías alternativas sujetas a justificación técnica.

## Decisión técnica

No se corrigen los Tc altos en esta OT.

La acción correcta fue clasificar los Tc según su rol hidrológico antes de modificar cualquier cálculo.

## Restricciones respetadas

- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se alteró Qp.
- No se alteró Tp.
- No se alteró Volumen.
- No se alteró Q(t).
- No se usaron caudales externos como fundamento.
- No se usó SIATA para justificar caudales.
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.

## Dictamen

OT-0031 reduce el ruido conceptual asociado a Tc altos: HidroFlow debe distinguir entre Tc de intensidad/caudal pico, Tc operativo de Q(t), lag SCS, duración de evento para almacenamiento y Tc especializado/comparativo.

Esta clasificación queda como base para futuras decisiones funcionales o visuales sobre tiempos hidrológicos.

## Estado

OT-0031 lista para PR.
