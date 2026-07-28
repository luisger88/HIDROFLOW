# OT-CODEMAP-004 — Cierre técnico

## Resultado

Se depuró el alcance de HF-CODEMAP y se incorporó ranking semántico para priorizar rutas activas frente a backups, copias, generados e históricos.

## Limitación corregida

En HF-CODEMAP v1.2.0 semantic-flow podía mostrar rutas útiles junto con ruido de backups, copias, validaciones históricas y sub_flow genéricos.

En HF-CODEMAP v1.3.0 se agregó clasificación activa de archivos, activeRank, activeClass, semanticScore y modo --active.

## Resultado del indexador

- Versión: 1.3.0
- Archivos escaneados: 260
- Símbolos detectados: 5172
- Referencias cruzadas: 41406
- Guards detectados: 48
- React flows: 284
- Props flows: 2618
- State links: 88
- Semantic flows: 96
- Active files: 145
- Runtime active: 6
- Runtime support: 132
- Historical files: 1
- Backup files: 114
- Generated files: 0

## Consultas validadas

- resumen
- semantic-flow Q5
- semantic-flow Q5 --active
- semantic-flow onContextoComparador --active
- semantic-flow contextoComparador --active
- ruido Q5
- archivo BACKUP
- archivo ComparadorMultiMetodo

## Hallazgos útiles inmediatos

- semantic-flow Q5 --active prioriza archivos activos de runtime.
- Los archivos BACKUP quedan clasificados como backup y degradados por ranking.
- ComparadorMultiMetodo activo queda priorizado frente a ComparadorMultiMetodo.BACKUP.
- El flujo activo conserva guards Q-5 como tieneQ5Publicado y tieneHidrogramasPublicados.
- El modo --active reduce ruido operativo para decisiones de cambio.

## Observación

El comando ruido Q5 reporta sin ruido significativo para el flujo activo, lo cual indica que el filtro activo ya excluye o degrada el ruido más relevante.

## Regla operativa

Antes de intervenir un flujo crítico, consultar primero:

node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow <nombre> --active

Ejemplos:

node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow Q5 --active
node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow onContextoComparador --active
node .\07_TOOLBOX\codemap\consultar-hidroflow.mjs semantic-flow contextoComparador --active

## Estado

OT-CODEMAP-004 queda lista para commit selectivo.
