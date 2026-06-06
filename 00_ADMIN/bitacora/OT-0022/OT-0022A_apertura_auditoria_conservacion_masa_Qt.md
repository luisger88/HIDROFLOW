# OT-0022A — Apertura auditoría conservación de masa Q(t)

## Objetivo

Abrir la auditoría matemática interna de conservación de masa en los hidrogramas Q(t) usados por el bloque Q-5.

## Problema

OT-0020 incorporó una referencia física de volumen esperado y OT-0021 agregó un semáforo de escala. Los resultados muestran que algunos métodos Q-5 presentan volúmenes muy superiores al volumen esperado por lluvia efectiva y área.

## Tesis

Si el volumen integrado del hidrograma Q(t) supera ampliamente el volumen esperado Pe(mm) × Área(km²) × 1000, existe una falla interna de escala, unidades, integración, normalización o parametrización.

## Alcance inicial

- Auditar calcularDesdeSerie.
- Auditar lectura de Q y tiempo.
- Auditar integración de volumenSerie.
- Auditar generación de hidros, lluvia efectiva y dt.
- Auditar si la serie Q(t) conserva masa antes de interpretar Qp, Tp o Volumen.

## Restricciones

- No usar caudales externos como fundamento de corrección.
- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp.
- No alterar Tp.
- No alterar Volumen.
- No alterar Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Nota sobre SIATA

SIATA podrá usarse posteriormente para calibración y validación de lluvia/eventos, pero no para justificar violaciones internas de conservación de masa.

## Estado

Apertura documental. Sin cambios funcionales.
