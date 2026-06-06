# OT-0037A — Apertura validación resumen técnico Q-5 copiado

## Objetivo

Abrir la validación del resumen técnico Q-5 copiado desde HidroFlow, verificando que la salida sea reproducible, completa y sin campos problemáticos.

## Problema

OT-0030 incorporó el botón Copiar resumen técnico Q-5. Después de validar el expediente hidrológico mínimo en OT-0035 y enriquecerlo con tabla Q-5 en OT-0036, corresponde validar también el resumen técnico Q-5 como salida independiente.

## Alcance

- Validar contenido copiado desde el botón Copiar resumen técnico Q-5.
- Verificar secciones y frases técnicas obligatorias.
- Detectar undefined, null, NaN o [object Object].
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
