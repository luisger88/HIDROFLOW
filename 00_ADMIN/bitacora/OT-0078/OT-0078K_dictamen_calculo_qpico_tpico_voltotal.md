
## Estado base

- Rama: ot-0078-auditoria-aguas-arriba-calculo-resumen-hidrogramas.
- OT-0078J cerrada en commit 1d7497f.
- Alcance: dictamen documental, sin cambios funcionales.

## Dictamen técnico

La auditoría OT-0078J evidencia que Qpico, tPico y volTotal se derivan aguas arriba del comparador. Existen indicios de estructuras internas de hidrograma, como arreglos o componentes tipo uh, pero esas estructuras no llegan publicadas al comparador como qSeries reconocible.

El problema operativo no debe resolverse reconstruyendo Q(t) desde Qpico, tPico o volTotal. La ruta válida es auditar y, si procede, publicar la estructura temporal real existente aguas arriba bajo contrato qSeries.

## Ruta siguiente permitida

- Auditar específicamente la estructura uh o equivalente.
- Determinar formato, unidades y significado hidrológico.
- Verificar si puede normalizarse a qSeries sin recalcular ni alterar resultados.

## Prohibiciones

- No reconstruir Q(t) desde Qpico y tPico.
- No inventar puntos tiempo-caudal.
- No interpolar sin serie real.
- No calcular métricas morfológicas sin qSeries publicada.
- No modificar hidroEngine.js sin auditoría focal previa.

## Criterio de salida

OT-0078K queda completa cuando exista dictamen versionado del cálculo de Qpico, tPico y volTotal, sin cambios funcionales sobre la aplicación.
