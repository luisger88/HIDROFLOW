# OT-0035A — Apertura validación del expediente copiado

## Objetivo

Abrir la validación del expediente hidrológico mínimo copiado desde HidroFlow, verificando que la salida contenga datos reales, estructura completa y ausencia de campos críticos vacíos.

## Problema

OT-0034 enriqueció el expediente hidrológico mínimo con datos reales disponibles. Ahora debe validarse el contenido copiado para asegurar que sea útil como evidencia técnica reproducible.

## Alcance

- Capturar el contenido copiado desde el botón Copiar expediente hidrológico mínimo.
- Verificar secciones obligatorias.
- Detectar campos críticos vacíos, null, undefined, NaN o marcadores no resueltos.
- No modificar cálculos.
- No modificar motor.

## Restricciones

- No usar caudales externos como fundamento.
- No usar SIATA para justificar caudales.
- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp, Tp, Volumen ni Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
