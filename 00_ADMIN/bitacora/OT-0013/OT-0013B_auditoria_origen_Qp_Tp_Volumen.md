# OT-0013B — Auditoría origen Qp, Tp y Volumen

## Objetivo

Auditar en modo solo lectura cómo el Comparador Hidrológico Multi-Método obtiene Qp, Tp y Volumen para el bloque Q-5.

## Evidencia auditada

En ComparadorMultiMetodo.jsx se identificó que los resultados Q se leen desde contextoBase?.hidrogramas.

El comparador no recalcula hidrogramas. Busca candidatos en bruto, bruto.metodos o bruto.resultados.

Para asociar un resultado al método del catálogo, normaliza el nombre del método y lo compara contra metodo, nombre, label, name o id del objeto de hidrograma.

## Campos extraídos actualmente

Qp se extrae desde: Qp, qp, q_pico, caudalPico, caudal_pico.

Tp se extrae desde: Tp, tp, t_pico, tiempoPico, tiempo_pico.

Volumen se extrae desde: volumen, V, vol, volume.

## Hallazgo técnico

El propio texto del comparador menciona como pendientes de auditoría los campos Qpico, volTotal, dtMin y parámetros internos de cada hidrograma unitario.

Sin embargo, el adaptador de lectura auditado no contempla explícitamente Qpico, tPico ni volTotal dentro de los nombres alternativos usados para extraer Qp, Tp y Volumen.

## Riesgo

Si el motor HidroFlow entrega los resultados con nombres como Qpico, tPico o volTotal, el comparador puede mostrar valores no disponibles o incompletos aunque el motor sí los haya calculado.

## Dictamen

Antes de modificar código, se debe confirmar la estructura real de contextoBase.hidrogramas o del objeto de salida del motor. La siguiente fase debe auditar la fuente real de hidrogramas y sus campos efectivos.

## Estado

Auditoría documental. Sin cambios funcionales.
