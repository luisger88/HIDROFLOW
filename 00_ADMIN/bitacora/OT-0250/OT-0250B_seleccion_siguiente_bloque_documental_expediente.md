# OT-0250B — Selección siguiente bloque documental del expediente

## Objetivo

Seleccionar el siguiente bloque documental del expediente hidrológico mínimo después del cierre consolidado del bloque `Identificación`.

## Antecedente

El bloque `Identificación` quedó cerrado mediante el ciclo:

- OT-0237: selección del bloque Identificación;
- OT-0238: contrato documental;
- OT-0239: diseño del helper;
- OT-0240: implementación del helper puro;
- OT-0241: validación aislada;
- OT-0242: decisión de integración;
- OT-0243: diseño del punto de acople;
- OT-0244: implementación del acople mínimo;
- OT-0245: validación con hallazgo;
- OT-0246: corrección en salida real;
- OT-0247: revalidación aprobada;
- OT-0248: decisión de estabilización;
- OT-0249: registro consolidado de cierre.

## Estado de partida

El bloque `Identificación` queda consolidado como componente documental estabilizado del expediente hidrológico mínimo.

La cadena técnica estabilizada es:

```text
construirBloqueIdentificacionExpedienteMinimo
↓
construirLineasIdentificacionExpediente
↓
construirExpedienteHidrologicoMinimo
↓
salida real del expediente hidrológico mínimo
```

## Bloque candidato natural

El siguiente bloque documental recomendado es:

```text
## 2. Parámetros hidrológicos base
```

## Justificación

La selección del bloque `Parámetros hidrológicos base` es el siguiente paso natural porque sucede directamente al bloque `Identificación` dentro de la estructura obligatoria del expediente.

Este bloque permite continuar el proceso de delegación documental de forma secuencial, sin saltar todavía a bloques hidrológicos sensibles como Volumen, Q-Tr, Q-5, Método Racional o diagnóstico Q(t).

La selección no implica implementación, modificación funcional ni validación de valores hidrológicos.

## Alcance recomendado del próximo contrato

El futuro contrato del bloque `Parámetros hidrológicos base` deberá definir únicamente campos documentales y reglas de salida segura.

El contrato deberá evaluar con cuidado si los campos del bloque son puramente descriptivos o si contienen valores que requieren trazabilidad hidrológica.

No se debe asumir todavía ningún helper, acople o sustitución funcional.

## Riesgos controlados

- Evita saltar directamente a Volumen, Q-Tr, Q-5, Método Racional o diagnóstico Q(t).
- Mantiene avance secuencial del expediente.
- Conserva el patrón exitoso aplicado al bloque Identificación.
- Permite separar selección, contrato, diseño, implementación, validación y estabilización.

## Decisión

Se selecciona el bloque `Parámetros hidrológicos base` como siguiente bloque documental del expediente hidrológico mínimo.

La siguiente OT deberá ser documental y contractual, no funcional.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifican validadores existentes.

No se modifica motor.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0251 — Contrato bloque Parámetros hidrológicos base del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
