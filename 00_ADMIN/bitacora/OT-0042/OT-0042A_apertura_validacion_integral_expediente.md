# OT-0042A — Apertura validación integral expediente hidrológico mínimo

## Objetivo

Abrir la validación integral del expediente hidrológico mínimo después de la incorporación de Q-5 auditado, Método Racional exportable y contraste Q-5 vs Método Racional.

## Problema

El expediente hidrológico mínimo ya contiene múltiples secciones técnicas reproducibles. Antes de seguir agregando contenido, debe certificarse que la salida copiada sea completa, coherente y limpia.

## Alcance

Validar que el expediente copiado contenga:

- identificación de cuenca;
- parámetros hidrológicos base;
- tiempo de concentración y roles Tc;
- volumen de referencia;
- resumen Q-5 auditado;
- tabla Q-5 auditada;
- sección Método Racional;
- tabla Método Racional;
- contraste Q-5 vs Método Racional;
- restricciones técnicas.

También validar ausencia de:

- undefined;
- null;
- NaN;
- [object Object];
- marcadores temporales;
- funciones o comandos de validación copiados accidentalmente.

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
