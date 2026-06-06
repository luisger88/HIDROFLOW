# OT-0040A — Apertura publicación Método Racional al contexto exportable

## Objetivo

Abrir el frente para publicar los resultados reales del Método Racional al contexto exportable de HidroFlow, de forma que el expediente hidrológico mínimo pueda incluir una tabla racional real.

## Problema

OT-0039 integró el Método Racional como contraste global independiente dentro del expediente mínimo, pero solo como sección informativa.

La auditoría confirmó que calcRacional y ModRacional existen en HidroFlow.jsx y que los resultados racionales se calculan en el módulo Racional, pero no están disponibles todavía en el scope del ComparadorMultiMetodo ni del expediente.

## Tesis

El expediente debe consumir resultados reales publicados desde la ruta original del Método Racional, sin duplicar fórmulas ni recalcular de forma paralela dentro del Comparador.

## Alcance inicial

- Auditar el flujo actual de ModRacional.
- Identificar dónde publicar resultados racionales al contexto.
- Publicar tabla racional al contexto exportable si es seguro.
- Preparar consumo posterior en el expediente.
- No duplicar calcRacional.
- No modificar fórmulas.

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
