\# OT-0097C — Decisión de no intervención funcional inmediata sobre tarjeta matriz patrón



\## Contexto



Después de OT-0097B, se confirmó que la tarjeta matriz patrón La Iguaná PC\_80 está funcionalmente ordenada, pero presenta densidad visual creciente.



La tarjeta integra actualmente:



\- datos compactos,

\- gráfica Qp–tPico,

\- gráfica de velocidad efectiva,

\- lectura comparativa automática,

\- resumen de riesgos,

\- salida hidráulica futura,

\- advertencia no adoptiva.



\## Hallazgo



La densidad visual existe, pero no se identificó una ruptura estructural ni un problema funcional que obligue a modificar código de inmediato.



\## Decisión



No se implementan colapsables en esta OT.



No se compacta la tarjeta en esta OT.



No se modifica la UI en esta OT.



La tarjeta se conserva como está, manteniendo su orden técnico actual.



\## Justificación



Implementar colapsables o reorganizaciones visuales sin una revisión visual más amplia podría introducir complejidad innecesaria.



El estado actual es aceptable como lectura técnica completa, aunque se reconoce que una futura mejora podría separar lectura primaria y detalle expandido.



\## Reserva futura



Una futura OT podría evaluar:



\- subbloques colapsables,

\- modo compacto / modo detalle,

\- separación de resumen ejecutivo y detalle técnico,

\- reducción de advertencias repetidas,

\- mejora de jerarquía visual.



\## Restricciones mantenidas



Esta decisión no modifica:



\- `hidroEngine.js`,

\- `calcHidroCompleto`,

\- hidrogramas,

\- Q(t),

\- matriz patrón,

\- expediente,

\- adopción o descarte de métodos,

\- estado global No coherente.



\## Dictamen



OT-0097C deja explícito que la tarjeta matriz patrón no requiere intervención funcional inmediata.



La mejora visual queda reservada para una futura OT si se confirma necesidad mediante revisión visual directa.

