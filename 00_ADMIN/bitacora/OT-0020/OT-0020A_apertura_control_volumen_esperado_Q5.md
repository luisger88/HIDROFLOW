# OT-0020A — Apertura control volumen esperado Q-5

## Objetivo

Abrir el control físico preliminar entre el volumen esperado por lluvia efectiva y los volúmenes mostrados en el bloque Q-5.

## Problema

Q-5 muestra volúmenes de hidrogramas que pueden ser difíciles de interpretar sin una referencia física de escala.

## Tesis

Antes de adoptar o interpretar volúmenes de Q-5, HidroFlow debe mostrar una referencia preliminar de volumen esperado basada en lluvia efectiva y área de cuenca.

## Control preliminar

Volumen esperado aproximado:

Pe(mm) × Área(km²) × 1000

Este control no reemplaza la integración formal del hidrograma, pero sirve como referencia de escala.

## Restricciones

- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp.
- No alterar Tp.
- No alterar Volumen.
- No alterar Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
