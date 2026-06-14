\# OT-0090D — Estrategia multi-cuenca para aprendizaje hidrológico e hidráulico



\## Contexto



Después de OT-0090C, HidroFlow cuenta con criterios preliminares de plausibilidad temporal Q(t) para La Iguaná PC\_80.



El siguiente paso estratégico es evitar que cada cuenca futura se revise manualmente desde cero.



La plataforma debe aprender patrones técnicos comparables entre cuencas, eventos, hietogramas, CN, Tc, qSeries, forma temporal, riesgo temporal y resultados exportables.



\## Tesis técnica



HidroFlow debe evolucionar desde el diagnóstico individual de una cuenca hacia una matriz de aprendizaje multi-cuenca.



El objetivo no es adoptar automáticamente métodos, sino acumular criterio técnico estructurado para orientar futuras decisiones hidrológicas e hidráulicas.



\## Referencias técnicas



HEC-HMS establece que la calibración lluvia-escorrentía requiere series temporales de lluvia y caudal del mismo evento, cobertura espacial adecuada de lluvia, comparación de volúmenes y duración de lluvia suficiente frente al tiempo de concentración.



Este principio se adopta como base conceptual para que HidroFlow articule eventos SIATA, CN dinámico, Tc, hietogramas y respuesta Q(t).



\## Variables mínimas por cuenca



Cada cuenca evaluada debe conservar al menos:



\- Nombre de cuenca.

\- Punto de control.

\- Área.

\- Longitud hidráulica.

\- Pendiente del cauce principal.

\- Pendiente media de cuenca.

\- Cotas máxima y mínima.

\- CN base.

\- CN ajustado por AMC/SIATA.

\- Fuente de lluvia o hietograma.

\- Tiempo de concentración por métodos.

\- qSeries por método.

\- Qp.

\- tPico.

\- Duración efectiva.

\- Ascenso.

\- Receso.

\- W50.

\- W25.

\- Asimetría.

\- Forma temporal.

\- Riesgo temporal.

\- Síntesis ejecutiva.

\- Observaciones de plausibilidad.

\- Restricción de no adopción.



\## Lectura estratégica



La Iguaná PC\_80 funciona como primera cuenca patrón.



En esta cuenca:



\- SCS y SCS Mod. presentan orden temporal plausible preliminar.

\- Snyder y Clark IUH presentan respuestas prolongadas con receso dominante.

\- Williams \& Hann presenta concentración abrupta y asimetría extrema.



Estas lecturas deben conservarse como criterios comparables, no como adopción automática.



\## Relación con SIATA



SIATA debe usarse como fuente futura para:



\- lluvia observada,

\- humedad antecedente,

\- ajuste de CN por AMC,

\- validación de eventos,

\- comparación contra respuesta simulada.



SIATA no debe usarse para forzar caudales ni para romper conservación interna de masa.



\## Relación con Módulo Hidráulica



El futuro Módulo Hidráulica no debe recibir solo un Qp aislado.



Debe recibir un paquete hidrológico compuesto por:



\- hidrograma Q(t),

\- Qp,

\- tPico,

\- volumen,

\- duración efectiva,

\- forma temporal,

\- riesgo temporal,

\- nivel de plausibilidad,

\- advertencias de no adopción.



\## Criterio de escalamiento



Antes de construir el Módulo Hidráulica, HidroFlow debe poder comparar varias cuencas y reconocer patrones de:



\- respuesta rápida,

\- respuesta persistente,

\- recesión prolongada,

\- concentración abrupta,

\- sensibilidad a CN,

\- sensibilidad a Tc,

\- sensibilidad a hietograma,

\- coherencia con eventos observados.



\## Restricciones



Esta estrategia no adopta método.



No levanta el estado global No coherente.



No recalcula Q(t).



No modifica el motor hidrológico.



No sustituye calibración con datos observados.



No convierte una cuenca patrón en regla universal.



\## Dictamen



El siguiente crecimiento de HidroFlow debe orientarse a una matriz multi-cuenca de aprendizaje hidrológico e hidráulico.



La finalidad es reducir revisión manual futura, conservar experticia y preparar el Módulo Hidráulica con entradas hidrológicas más defendibles.

