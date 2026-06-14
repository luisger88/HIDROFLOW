\# OT-0093E — Cierre técnico de gráfica Qp–tPico desde matriz patrón



\## Contexto



OT-0093 se abrió después del cierre de OT-0092, donde la matriz patrón La Iguaná PC\_80 quedó expuesta visualmente dentro del Panel diagnóstico qSeries.



El propósito de OT-0093 fue convertir esa matriz patrón en una primera lectura gráfica comparativa, usando la relación Qp–tPico como indicador visual de magnitud y oportunidad temporal del pico.



\## Secuencia ejecutada



\### OT-0093A — Diseño documental



Se documentó el diseño de una gráfica comparativa Qp–tPico basada exclusivamente en la matriz patrón La Iguaná PC\_80.



La gráfica se definió como visual, compacta, no adoptiva y sin recálculo hidrológico.



\### OT-0093B — Helper puro



Se creó el helper:



```js

src/services/hidrogramas/prepararGraficaQpTPicoMatrizPatron.js

