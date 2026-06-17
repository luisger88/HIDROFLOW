# OT-0220B — Contrato del bloque restricciones y advertencias generales del expediente

## Objetivo

Definir el contrato documental de un bloque acotado de restricciones y advertencias generales del expediente hidrológico mínimo.

## Antecedente

OT-0216 auditó restricciones, advertencias, notas, criterios de cautela y mensajes de no adopción existentes.

OT-0217 decidió no consolidar directamente la evidencia.

OT-0218 clasificó documentalmente la evidencia detectada.

OT-0219 decidió que solo una familia acotada puede ser candidata a bloque documental futuro.

## Alcance del bloque

El bloque deberá contener únicamente restricciones y advertencias generales de carácter documental e institucional.

Debe servir como sección de cautela técnica general del expediente, sin recalcular, adoptar, seleccionar o modificar resultados hidrológicos.

## Familias incluidas

El bloque puede tomar como base documental únicamente:

- restricciones y advertencias técnicas generales;
- notas y aclaraciones documentales generales;
- mensajes generales de alcance no funcional;
- recordatorios de no modificación del motor;
- recordatorios de no recálculo automático;
- advertencias de uso documental o interpretativo.

## Familias excluidas

El bloque debe excluir explícitamente:

- Q-5;
- Método Racional;
- diagnóstico temporal Q(t);
- Volumen;
- Q-Tr;
- Pe;
- masa hidrológica;
- mensajes no adoptivos asociados a métodos específicos;
- criterios de validación hidrológica especializada;
- criterios de auditoría que requieren contexto técnico propio;
- cualquier selección de método o caudal.

## Entradas permitidas

El futuro helper o bloque podrá recibir:

- lista de advertencias generales;
- lista de restricciones documentales generales;
- estado de no modificación del motor;
- estado de no recálculo automático;
- texto de alcance general del expediente.

No podrá recibir ni procesar:

- tablas Q-5;
- resultados de Método Racional;
- series Q(t);
- volúmenes hidrológicos;
- datos de Pe;
- caudales Q-Tr;
- objetos internos del motor.

## Salida esperada

La salida futura del bloque deberá ser una lista textual o sección Markdown con advertencias generales del expediente.

La salida no debe contener cálculos, tablas hidrológicas, selección de método ni dictámenes técnicos nuevos.

## Redacción permitida

El bloque podrá usar redacciones como:

- El expediente no modifica el motor hidrológico.
- El expediente no recalcula hidrogramas.
- Las secciones documentales no sustituyen la validación técnica especializada.
- Los resultados sensibles deben revisarse en sus bloques específicos.
- Las advertencias generales no implican adopción hidrológica.

## Redacción prohibida

El bloque no debe afirmar:

- que Q-5 queda validado;
- que Método Racional queda adoptado;
- que diagnóstico Q(t) define selección de método;
- que Volumen, Pe o masa quedan aprobados;
- que Q-Tr queda seleccionado;
- que una advertencia general sustituye auditoría especializada.

## Ubicación documental futura

Si se implementa posteriormente, el bloque deberá ubicarse como sección general de restricciones y advertencias del expediente.

No deberá insertarse dentro de bloques Q-5, Método Racional, Q(t), Volumen ni Q-Tr.

## Criterio de implementación futura

Antes de implementar, debe existir una OT independiente que diseñe un helper puro o una función documental mínima.

La implementación futura deberá probarse de forma aislada antes de cualquier integración al expediente operativo.

## Decisión operativa

Se aprueba únicamente el contrato documental del bloque.

No se implementa ningún cambio en esta OT.

No se modifica `textoExpediente`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se toca motor.

No se toca Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0221 — Diseño helper bloque restricciones y advertencias generales del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers.
- No se modificaron validadores existentes.
- No se implementó el bloque.
- No se consolidó contenido.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
