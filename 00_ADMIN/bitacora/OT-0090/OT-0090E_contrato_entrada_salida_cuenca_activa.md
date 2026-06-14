\# OT-0090E — Contrato entrada-salida de cuenca activa



\## Contexto



Después de OT-0090D, HidroFlow cuenta con una estrategia multi-cuenca para aprendizaje hidrológico e hidráulico.



Antes de escalar a varias cuencas, se define el contrato entrada-salida de la cuenca activa, usando La Iguaná PC\_80 como cuenca patrón.



\## Tesis técnica



El usuario no debe construir manualmente todo el flujo.



El usuario debe aportar coordenadas o punto de control, y el sistema debe construir el paquete técnico necesario para análisis hidrológico, expediente y futura hidráulica.



\## Entrada mínima del usuario



\- Coordenadas del punto de control.

\- Sistema de referencia.

\- Nombre del proyecto.

\- Conjunto de periodos de retorno Tr a evaluar.

\- Tipo de salida requerida: diagnóstico, expediente o preparación hidráulica.



\## Entrada técnica del sistema



\- DEM / MDT hidrológicamente corregido.

\- Red hídrica.

\- Catálogo de estaciones IDF.

\- Datos SIATA disponibles.

\- Cobertura / uso del suelo.

\- CN base.

\- Parámetros morfométricos existentes.

\- Configuración de hietogramas.



\## Procesos esperados



\### 1. Geomorfología



\- Snap del punto de control a red hídrica.

\- Delimitación de cuenca.

\- Extracción de eje principal.

\- Cálculo de área, perímetro, longitud hidráulica, cotas y pendientes.

\- Perfil longitudinal Z–M.

\- Índices de forma y drenaje.



\### 2. Hidrología



\- Selección o ponderación de estación IDF.

\- Generación de hietograma por Tr.

\- Ajuste de CN por AMC/SIATA cuando exista información.

\- Cálculo de lluvia efectiva Pe.

\- Cálculo y comparación de Tc.

\- Generación de hidrogramas Q(t).

\- Control de volumen Pe–Área–Q(t).

\- Diagnóstico temporal Q(t).



\### 3. Diagnóstico temporal



\- Métricas morfológicas Q(t).

\- Dictamen de forma.

\- Riesgo temporal.

\- Síntesis ejecutiva.

\- Plausibilidad temporal por velocidad efectiva.

\- Advertencia de no adopción.



\### 4. Preparación hidráulica futura



El Módulo Hidráulica no debe recibir solo un Qp.



Debe recibir:



\- hidrograma Q(t),

\- Qp,

\- tPico,

\- volumen,

\- duración efectiva,

\- forma temporal,

\- riesgo temporal,

\- nivel de plausibilidad,

\- advertencias técnicas.



\## Índices faltantes a ordenar



\- Índice de Gravelius.

\- Factor de forma.

\- Relación de elongación.

\- Relación de relieve.

\- Densidad de drenaje.

\- Orden máximo Strahler.

\- Relación de bifurcación.

\- Curva hipsométrica.

\- Integral hipsométrica.

\- Sensibilidad CN.

\- Sensibilidad Tc.

\- Error de pico frente a evento observado.

\- Error de tiempo al pico.

\- Error de volumen.

\- NSE / RMSE / PBIAS cuando haya series observadas.



\## Gráficas requeridas



\- Mapa de cuenca y punto de control.

\- Mapa de red hídrica y eje principal.

\- Perfil longitudinal Z–M.

\- Curva hipsométrica.

\- IDF / hietograma.

\- Lluvia bruta vs lluvia efectiva.

\- Hidrogramas Q(t) comparados.

\- Qp vs tPico.

\- Volumen por método.

\- Ascenso vs receso.

\- Asimetría por método.

\- Riesgo temporal por método.

\- Sensibilidad CN/Tc.

\- Simulado vs observado SIATA cuando existan datos.



\## Relación con Tr



Las coordenadas no producen automáticamente el Tr.



Las coordenadas producen la cuenca, el punto de control y el contexto físico.



Los Tr son escenarios de diseño que el sistema debe recibir, configurar o proponer según reglas institucionales.



\## Dictamen



HidroFlow debe operar como plataforma de contrato técnico:



coordenadas → cuenca → morfometría → hidrología por Tr → diagnóstico temporal → expediente → paquete hidráulico futuro.



La Iguaná PC\_80 queda como primera cuenca patrón para validar este contrato.

