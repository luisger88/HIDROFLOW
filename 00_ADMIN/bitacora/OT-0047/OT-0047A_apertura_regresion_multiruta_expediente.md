# OT-0047A — Apertura regresión multi-ruta del expediente firmado

## Objetivo

Abrir la regresión multi-ruta del expediente hidrológico mínimo firmado, verificando que la salida conserve completitud global bajo diferentes rutas reales de navegación.

## Problema

OT-0046 certificó que el expediente firmado conserva completitud global bajo una ruta real validada. Sin embargo, el usuario puede llegar al expediente desde rutas distintas dentro de HidroFlow.

## Tesis

Un producto técnico reproducible debe conservar su integridad no solo en una ruta ideal, sino bajo rutas reales de navegación.

## Alcance

Validar el expediente firmado en varias rutas:

- Refrescar → Hidrogramas → Comparador → copiar expediente.
- Refrescar → Comparador directo → copiar expediente.
- Hidrogramas → Racional → Comparador → copiar expediente.
- Cambiar estación IDF → Comparador → copiar expediente.
- Cambiar Tr activo → Comparador → copiar expediente.

## Criterios de aceptación

En cada ruta el expediente debe conservar:

- Estación IDF poblada.
- Lluvia efectiva total poblada.
- Volumen esperado poblado.
- Tabla Q-5 con filas reales.
- Tabla Método Racional.
- Contraste Q-5 vs Método Racional.
- Sello técnico de generación.
- Ausencia de undefined, null, NaN y [object Object].

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
