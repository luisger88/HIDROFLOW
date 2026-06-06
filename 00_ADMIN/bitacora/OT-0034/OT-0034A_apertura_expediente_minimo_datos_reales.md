# OT-0034A — Apertura poblar expediente mínimo con datos reales

## Objetivo

Abrir el frente para poblar el expediente hidrológico mínimo con datos reales disponibles de la cuenca activa y del contexto hidrológico de HidroFlow.

## Problema

OT-0033 incorporó el botón para copiar el expediente hidrológico mínimo, pero la salida debe validarse y enriquecerse para evitar campos vacíos, genéricos o insuficientes.

## Tesis

El expediente mínimo debe consolidar datos reales ya disponibles en HidroFlow, sin recalcular ni modificar el motor.

## Alcance

- Publicar estación IDF en el contexto del Comparador.
- Incluir pendiente media y longitud de cauce cuando estén disponibles.
- Enriquecer el texto copiado del expediente mínimo.
- Mantener intactos Qp, Tp, Volumen y Q(t).

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
