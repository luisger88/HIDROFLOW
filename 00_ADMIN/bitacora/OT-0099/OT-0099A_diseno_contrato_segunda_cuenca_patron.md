\# OT-0099A — Diseño de contrato mínimo para segunda cuenca patrón



\## Contexto



OT-0099 se abre después del cierre de OT-0098, donde se dejó registrado el estado consolidado de la tarjeta matriz patrón La Iguaná PC\_80.



Entre OT-0091 y OT-0098 HidroFlow consolidó un bloque completo:



\- matriz patrón como dato estructurado,

\- tarjeta visual,

\- gráfica Qp–tPico,

\- gráfica de velocidad efectiva,

\- lectura comparativa textual,

\- validación de consistencia,

\- control de densidad visual,

\- registro consolidado del bloque.



El siguiente crecimiento lógico no debe ser seguir agregando información a la tarjeta de La Iguaná PC\_80, sino preparar el contrato mínimo para una futura segunda cuenca patrón.



\## Objetivo



Definir el contrato mínimo que debe cumplir una segunda cuenca patrón para poder compararse contra La Iguaná PC\_80.



Esta OT no implementa una segunda cuenca.



Esta OT no inventa datos.



Esta OT no simula resultados.



\## Tesis técnica



La comparación multi-cuenca solo es defendible si ambas cuencas tienen una estructura mínima equivalente.



La segunda cuenca patrón debe entregar campos comparables de:



\- identificación,

\- morfometría,

\- tiempos de concentración,

\- lluvia efectiva,

\- escenario de referencia,

\- diagnóstico Q(t),

\- forma temporal,

\- riesgo temporal,

\- plausibilidad,

\- restricciones,

\- salida hidráulica futura.



\## Contrato mínimo propuesto



Una futura segunda cuenca patrón debe contener, como mínimo:



\### 1. Identificación



\- id,

\- nombre de cuenca,

\- punto de control,

\- estado,

\- uso diagnóstico.



\### 2. Morfometría



\- área en km²,

\- longitud hidráulica en km,

\- perímetro,

\- cotas máxima y mínima,

\- desnivel,

\- pendiente del cauce,

\- pendiente media de cuenca,

\- fuente de datos.



\### 3. Tiempo de concentración



\- Tc sugerido,

\- número de métodos válidos,

\- rango bruto,

\- rango competente,

\- estado adoptivo o no adoptivo.



\### 4. Lluvia y escorrentía



\- lluvia efectiva total,

\- volumen esperado,

\- relación de masa Pe–Área–Volumen,

\- estado de consistencia.



\### 5. Escenario de referencia



\- nombre del escenario,

\- periodo de retorno,

\- volumen asociado,

\- estado diagnóstico.



\### 6. Diagnóstico Q(t)



Por cada método:



\- método,

\- estado de serie,

\- Qp,

\- tPico,

\- duración efectiva,

\- ascenso,

\- receso,

\- W50,

\- W25,

\- asimetría,

\- forma temporal,

\- alerta de forma,

\- severidad,

\- riesgo temporal,

\- nivel de riesgo,

\- factor dominante,

\- velocidad efectiva al tPico,

\- velocidad efectiva de ascenso,

\- plausibilidad temporal.



\### 7. Síntesis temporal



\- métodos con riesgo alto,

\- métodos con riesgo medio,

\- métodos con riesgo bajo,

\- métodos no determinados,

\- lectura textual.



\### 8. Salida hidráulica futura



\- requiere hidrograma completo,

\- no usar solo Qp,

\- incluir volumen,

\- incluir tPico,

\- incluir duración efectiva,

\- incluir riesgo temporal,

\- estado no adoptivo.



\### 9. Restricciones



Debe declarar explícitamente:



\- no adopta automáticamente ningún método,

\- no descarta automáticamente ningún método,

\- no levanta No coherente,

\- no reemplaza revisión hidrológica profesional,

\- no recalcula Q(t),

\- no interpola series,

\- no modifica Qp, tPico, volumen ni métricas existentes,

\- debe validarse antes de comparación institucional.



\## Reglas de no invención



Si una futura cuenca no tiene datos completos, HidroFlow debe marcar el campo como ausente o no determinado.



No se deben fabricar:



\- Qp,

\- tPico,

\- volumen,

\- métricas morfológicas Q(t),

\- velocidades efectivas,

\- plausibilidad temporal,

\- riesgo temporal,

\- lectura comparativa.



\## Comparación permitida



La comparación contra La Iguaná PC\_80 solo debe activarse si la segunda cuenca tiene:



\- identificación completa,

\- morfometría mínima,

\- al menos un escenario hidrológico,

\- diagnóstico Q(t) con series válidas,

\- métricas temporales suficientes,

\- restricciones no adoptivas explícitas.



\## Comparación no permitida



No debe compararse una segunda cuenca si solo tiene:



\- coordenadas,

\- área,

\- Qp aislado,

\- un único valor de Tc,

\- resultados sin qSeries,

\- resultados sin volumen,

\- resultados sin trazabilidad.



\## Fuera de alcance



Durante OT-0099 no se debe:



\- implementar una segunda cuenca,

\- inventar datos,

\- modificar la matriz de La Iguaná PC\_80,

\- modificar el motor hidrológico,

\- modificar el expediente,

\- recalcular hidrogramas,

\- adoptar métodos,

\- descartar métodos automáticamente,

\- levantar No coherente,

\- implementar hidráulica.



\## Dictamen inicial



OT-0099 debe preparar el contrato mínimo para comparación futura multi-cuenca, manteniendo a La Iguaná PC\_80 como primera cuenca patrón y evitando cualquier simulación o invención de datos.

