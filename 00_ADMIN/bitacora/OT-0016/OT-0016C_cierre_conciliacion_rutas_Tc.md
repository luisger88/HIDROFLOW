# OT-0016C — Cierre conciliación de rutas Tc

## Objetivo

Cerrar la OT-0016 consolidando la conciliación visual y técnica de las rutas Tc visibles en HidroFlow.

## Resultado práctico

Se identificaron y etiquetaron explícitamente las rutas Tc activas:

- Tc global del Índice Hidrológico.
- Tc operativo de Hidrogramas.
- Tc especializado del Comparador Multi-Método.

En Hidrogramas, el valor se muestra ahora como Tc operativo Hidrogramas y se aclara que corresponde a la ruta interna Q(t).

## Decisión técnica

No se implementa un toggle para forzar el Tc global sobre Hidrogramas.

La razón es que modificar el Tc operativo de Hidrogramas puede alterar Qp, Tp, Volumen y la forma del hidrograma Q(t).

## Estrategia futura

La conciliación matemática real debe hacerse mediante escenarios explícitos, no mediante sobrescritura silenciosa.

Escenarios recomendados:

- Escenario operativo Hidrogramas.
- Escenario Tc global Índice.
- Escenario Tc especializado Comparador.

Cada escenario debe comparar Qp, Tp, Volumen y forma Q(t).

## Restricciones respetadas

- No se modificó hidroEngine.js.
- No se modificaron fórmulas hidrológicas.
- No se eliminó la ruta interna Q(t).
- No se introdujo setTimeout.
- No se introdujeron console.log permanentes.
- No se ocultó la discrepancia Tc.

## Dictamen

OT-0016 entrega un resultado práctico: la discrepancia Tc deja de parecer un error visual y queda expresada como rutas técnicas diferenciadas.

La consolidación matemática queda para una OT posterior de escenarios hidrológicos.

## Estado

OT-0016 lista para PR.
