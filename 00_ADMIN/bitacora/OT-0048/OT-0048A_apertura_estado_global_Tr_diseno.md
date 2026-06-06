# OT-0048A — Apertura estado global Tr de diseño

## Objetivo

Abrir el frente para convertir los periodos de retorno Tr del Índice Hidrológico en controles reales conectados a un estado global de diseño.

## Problema

OT-0047 confirmó que la ruta R5 — Cambio Tr activo — no era ejecutable porque los Tr del Índice Hidrológico son chips visuales y no controles funcionales.

La auditoría mostró que existen estados Tr locales en distintos módulos de HidroFlow, pero no un Tr global compartido.

## Tesis

HidroFlow debe disponer de un Tr global de diseño que pueda:

- mostrarse como activo en el Índice Hidrológico;
- cambiarse mediante clic en los botones Tr;
- propagarse a Hidrogramas;
- propagarse a Método Racional;
- publicarse al contexto exportable;
- aparecer en el expediente hidrológico mínimo;
- habilitar la regresión R5 como ruta funcional real.

## Alcance inicial

- Auditar estados Tr locales.
- Auditar props disponibles entre HidroFlow e IndiceHidrologico.
- Auditar publicación de contexto exportable.
- Diseñar integración mínima de Tr global.
- No modificar fórmulas.
- No alterar Qp, Tp, Volumen ni Q(t) sin validación posterior.

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

Apertura documental y auditoría. Sin cambios funcionales.
