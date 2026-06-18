# OT-0311B — Acople mínimo helper bloque Resumen Q-5 auditado del expediente

## Objetivo

Acoplar de forma mínima y quirúrgica el helper puro `construirBloqueResumenQ5AuditadoExpediente` al constructor del expediente hidrológico mínimo.

## Antecedente

OT-0310 diseñó el punto de acople futuro del helper `construirBloqueResumenQ5AuditadoExpediente`.

## Archivo funcional modificado

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Helper acoplado

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueResumenQ5AuditadoExpediente.js
```

## Cambios aplicados

Se agregó import único del helper:

```javascript
import { construirBloqueResumenQ5AuditadoExpediente } from "./construirBloqueResumenQ5AuditadoExpediente";
```

Se sustituyó la función auxiliar preexistente por una delegación al helper:

```javascript
export function construirLineasResumenQ5AuditadoExpediente(entrada = {}) {
  return construirBloqueResumenQ5AuditadoExpediente({
    metodosQ5: entrada?.metodosQ5 ?? entrada?.metodos,
    estadoResumenQ5AuditadoExpediente: entrada?.estadoResumenQ5AuditadoExpediente,
    faltantesResumenQ5AuditadoExpediente: entrada?.faltantesResumenQ5AuditadoExpediente,
    incluirTitulo: true
  });
}
```

## Nota de compatibilidad

La delegación acepta `entrada?.metodosQ5` y conserva compatibilidad documental con `entrada?.metodos` como fuente preexistente.

Esto evita recalcular Q-5 y evita modificar llamadas existentes más allá de la delegación mínima.

## Alcance técnico

No se modificó el helper `construirBloqueResumenQ5AuditadoExpediente.js`.

No se modificó `ComparadorMultiMetodo.jsx`.

No se modificó motor.

No se recalculó Q-5.

No se reinterpretaron resultados Q-5.

No se seleccionó método Q-5 adoptado.

No se seleccionó caudal Q-5 adoptado.

No se tocó Q-Tr.

No se tocó Método Racional.

No se tocó diagnóstico Q(t).

## Validación en esta OT

Se ejecuta build de producción como control de sintaxis/proyecto.

La validación formal del acople queda reservada para OT-0312.

## Próximo frente recomendado

`OT-0312 — Validación acople helper bloque Resumen Q-5 auditado del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirBloqueResumenQ5AuditadoExpediente.js`.
- No se modificaron helpers existentes fuera del constructor.
- No se modificaron validadores existentes.
- No se recalculó `Tc`.
- No se recalculó Q-Tr.
- No se recalculó Q-5.
- No se reinterpretaron resultados Q-5.
- No se seleccionó método Q-5 adoptado.
- No se seleccionó caudal Q-5 adoptado.
- No se recalculó volumen.
- No se emitió dictamen hidrológico.
- No se tocaron Q-Tr funcionalmente, Q-5 funcionalmente, Método Racional ni diagnóstico Q(t).

## Nota de recuperación pre-commit

Durante el acople mínimo se detectaron intentos iniciales de sustitución parcial de la función auxiliar `construirLineasResumenQ5AuditadoExpediente`, que dejaban sintaxis inválida en el constructor.

La recuperación se realizó antes de commit mediante:

- restauración de `construirExpedienteHidrologicoMinimo.js` desde HEAD;
- reescritura del script de acople para sustituir la función auxiliar desde su inicio hasta el siguiente export o fin de archivo;
- reaplicación del acople con controles defensivos;
- validación posterior mediante build.

La versión final conserva:

- import único del helper;
- función auxiliar delegada limpia;
- uso de la función auxiliar en la salida real;
- sin duplicación del archivo;
- sin patrón inválido `}) {`;
- sin modificación del helper;
- sin modificación del comparador;
- sin modificación del motor.

