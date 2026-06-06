# OT-0043A — Apertura control de completitud numérica del expediente

## Objetivo

Abrir el control de completitud numérica del expediente hidrológico mínimo después de la validación integral estructural realizada en OT-0042.

## Problema

OT-0042 certificó que el expediente está completo en estructura, coherente y libre de valores problemáticos como undefined, null, NaN y [object Object].

Sin embargo, algunos campos pueden estar presentes pero no contener valores útiles, por ejemplo campos con guion largo (—) o valores cero no representativos.

## Tesis

Un expediente técnico reproducible no solo debe estar bien estructurado; también debe contener valores numéricos útiles en sus campos críticos.

## Alcance

Validar completitud numérica de:

- área;
- pendiente media;
- longitud de cauce principal;
- CN, CN base, CN efectivo;
- Tc comparador;
- lluvia efectiva total;
- volumen esperado;
- tabla Q-5;
- tabla Método Racional.

## Restricciones

- No usar caudales externos como fundamento.
- No usar SIATA para justificar caudales.
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
