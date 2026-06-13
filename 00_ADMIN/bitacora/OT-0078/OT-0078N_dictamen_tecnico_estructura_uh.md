\# OT-0078N — Dictamen técnico de la estructura uh



\## Estado base



\- Rama: ot-007- OT-0078M cerrada en commit 924aeb8.- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.

\- Alcance: dictamen documental, sin cambios funcionales.



\## Objetivo



Emitir un dictamen técnico sobre la estructura uh identificada aguas arriba, a partir de la auditoría focal OT-0078M.



\## Evidencia relevante



\- La auditoría identificó construcción de uh mediante Array.from.

\- La construcción observada usa un índice i y una variable temporal t asociada a dt\_min y tp.

\- Se observó normalización mediante normalizarHuAM.

\- Se observó retorno de estructuras con tp, qp y uh.

\- El comparador no recibe uh publicado como qSeries reconocible.



\## Dictamen técnico preliminar



La estructura uh parece representar una estructura temporal interna de hidrograma o hidrograma unitario normalizado. Sin embargo, no puede asumirse automáticamente que uh sea qSeries publicable hasta confirmar sus unidades, escala temporal, escala de caudal y relación con Qpico, tPico y volTotal.



\## Implicación técnica



La ruta prometedora no es reconstruir Q(t), sino auditar si uh ya contiene la información temporal necesaria para publicar una serie real o normalizada bajo contrato qSeries sin recalcular hidrogramas ni alterar resultados resumen.



\## Ruta siguiente permitida



\- Auditar formato de cada elemento de uh.

\- Confirmar si uh contiene pares tiempo-caudal o solo valores normalizados.

\- Confirmar si dt\_min o una escala temporal permite construir tiempoMin sin inventar puntos.

\- Confirmar si la escala de caudal permite obtener caudalM3s real o normalizado.

\- Confirmar relación de uh con qp, tp y volTotal.



\## Rutas prohibidas



\- No asumir que uh es qSeries sin auditoría de formato y unidades.

\- No reconstruir Q(t) desde Qpico y tPico.

\- No inventar puntos tiempo-caudal.

\- No interpolar sin serie real.

\- No calcular métricas morfológicas sin qSeries publicada.



\## Decisión técnica



OT-0078N no autoriza implementación funcional. La siguiente fase debe diseñar una auditoría focal del formato y unidades de uh.



\## Siguiente fase recomendada



OT-0078O — Diseño de auditoría focal del formato y unidades de uh.



\## Criterio de salida



OT-0078N queda completa cuando exista dictamen versionado de la estructura uh, sin cambios funcionales sobre la aplicación.



