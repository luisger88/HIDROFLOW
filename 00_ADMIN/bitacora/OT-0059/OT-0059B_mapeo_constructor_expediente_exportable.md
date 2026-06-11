# OT-0059B — Mapeo quirúrgico del constructor del expediente exportable

Fecha de mapeo: 2026-06-10 19:29:27

## Estado base

- Rama de trabajo: ot-0059-expediente-salida-tecnica-verificable.
- OT-0059A cerrada en commit edec72c.
- Archivo dominante identificado por auditoría: $RutaComparador.
- Alcance de este paso: mapeo focalizado. No modifica JSX, motor hidrológico, fórmulas, Q-Tr, Q-5 ni Método Racional.

## Archivo inspeccionado


## Orden técnico objetivo para normalización posterior

La normalización funcional de OT-0059B debe llevar el texto exportable del expediente al siguiente orden técnico, sin recalcular valores ni alterar motores:

1. Identificación de cuenca activa.
2. Parámetros base y contexto hidrológico.
3. Lluvia de diseño y lluvia efectiva.
4. Tiempo de concentración y competencia metodológica.
5. Tabla Q-Tr.
6. Hidrogramas Q-5.
7. Método Racional como contraste no principal.
8. Contraste Q-5 vs Método Racional.
9. Consistencia cruzada del expediente.
10. Sello técnico.
11. Advertencias, restricciones y alcance.

## Criterios de intervención para el siguiente paso

- Intervenir preferiblemente un único punto constructor del texto exportable.
- No duplicar lógica.
- No tocar hidroEngine.js.
- No alterar objetos de cálculo, fórmulas ni resultados.
- No abrir PDF, Word, mapas ni exportaciones complejas.
- Evitar dependencia de archivos BACKUP.

## Salida esperada

Este mapeo deja preparado el cambio funcional controlado de OT-0059B: normalizar el orden del texto técnico/exportable del expediente desde el constructor real identificado en ComparadorMultiMetodo.jsx.

