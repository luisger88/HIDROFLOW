# OT-0021A — Apertura semáforo escala Volumen Q-5

## Objetivo

Abrir el frente de clasificación visual de escala para los volúmenes mostrados en el bloque Q-5 del Comparador Hidrológico Multi-Método.

## Problema

OT-0020 incorporó una referencia física preliminar de volumen esperado basada en Pe(mm) × Área(km²) × 1000.

Sin embargo, los volúmenes individuales de cada método Q-5 todavía no muestran una clasificación relativa frente a esa referencia.

## Tesis

Cada volumen Q-5 debe poder leerse frente a una escala física preliminar, sin alterar el cálculo original.

## Criterio inicial

Relación = Volumen método / Volumen esperado

- Relación <= 2: escala razonable.
- 2 < Relación <= 10: revisar escala.
- Relación > 10: fuera de escala.

## Alcance

- Mostrar clasificación visual junto al volumen de cada método Q-5.
- Mantener Qp, Tp, Volumen y Q(t) intactos.
- No modificar motor hidrológico.
- No modificar fórmulas.

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
