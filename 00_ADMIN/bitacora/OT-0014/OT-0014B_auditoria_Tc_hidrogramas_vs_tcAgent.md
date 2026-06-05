# OT-0014B — Auditoría Tc en Hidrogramas vs tcAgent

## Objetivo

Auditar el origen del Tc mostrado en el módulo Hidrogramas y su relación con el estado global tcAgent consumido por el Índice Hidrológico.

## Evidencia auditada

En HidroFlow.jsx se identificó que el módulo Hidrogramas calcula una lista tcList mediante calcTc(params), filtrando métodos con h finito y positivo.

También se identificó que Tc_sugerido_min se calcula como la mediana simple de los valores r.min de tcList.

El Tc efectivo usado por Hidrogramas se define como:

tc_min = usarOverrideTc ? Tc_override_min : +(params?.tcMedMin ?? Tc_sugerido_min)

El panel QA de Hidrogramas muestra visualmente:

Tc: {tc_min.toFixed(1)} min

y agrega advertencia cuando qaStatus.tcWarning es verdadero.

## Criterio QA observado

qaStatus.tcWarning se activa cuando tc_min es menor que 5 min o mayor que 180 min.

Por tanto, el valor visual observado Tc: 231.5 min con advertencia es consistente con la regla tc_min > 180.

## Hallazgo

El Tc mostrado en Hidrogramas no proviene necesariamente del Tc_final publicado por el Comparador Multi-Método.

Hidrogramas usa params.tcMedMin si existe; en caso contrario usa Tc_sugerido_min como mediana simple de calcTc(params).

El Índice Hidrológico lateral consume tcAgent. La auditoría inicial mostró que tcAgent es publicado principalmente desde ComparadorMultiMetodo.jsx.

Esto explica que el Índice pueda mostrar Tc sugerido vacío o métodos válidos 0 mientras Hidrogramas muestra internamente un Tc calculado o persistido.

## Riesgo técnico

Pueden coexistir dos lecturas de Tc en la interfaz: una lectura interna de Hidrogramas basada en params.tcMedMin o mediana simple, y una lectura global del Índice basada en tcAgent publicado por el Comparador.

Esta divergencia puede confundir la interpretación técnica si no se define una fuente global de verdad o un adaptador común de estado Tc.

## Hipótesis siguiente

El valor 231.5 min observado en Hidrogramas puede estar llegando por params.tcMedMin o por persistencia previa de un método dominante. Debe auditarse dónde se asigna params.tcMedMin.

## Restricciones

- No modificar hidroEngine.js.
- No modificar fórmulas Tc.
- No cambiar Tc_final.
- No cambiar tc_min.
- No introducir setTimeout.
- No introducir console.log permanentes.
- No duplicar lógica hidrológica.

## Siguiente fase

Auditar el origen de params.tcMedMin y la persistencia del Tc medio dentro de HidroFlow.jsx, para decidir si el Índice Hidrológico debe alimentarse desde un adaptador global mínimo.

## Estado

Auditoría documental. Sin cambios funcionales.
