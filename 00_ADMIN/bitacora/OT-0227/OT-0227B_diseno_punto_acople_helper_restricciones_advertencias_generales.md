# OT-0227B — Diseño punto de acople helper restricciones y advertencias generales al expediente

## Objetivo

Diseñar el punto mínimo y auditable de acople del helper `construirBloqueRestriccionesAdvertenciasGeneralesExpediente` al expediente hidrológico mínimo, sin implementar todavía.

## Antecedente

El ciclo del helper quedó cerrado así:

- OT-0220: contrato del bloque;
- OT-0221: diseño del helper;
- OT-0222: implementación pura;
- OT-0223: validación aislada con hallazgo;
- OT-0224: ajuste del criterio del validador;
- OT-0225: revalidación aislada aprobada;
- OT-0226: decisión de no integrar todavía y diseñar primero el punto de acople.

## Helper disponible

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js
```

Función exportada:

```javascript
construirBloqueRestriccionesAdvertenciasGeneralesExpediente
```

## Archivo candidato de acople futuro

El único archivo candidato para integración futura es:

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

No se debe tocar `ComparadorMultiMetodo.jsx` para esta integración.

No se debe tocar `textoExpediente` directamente.

## Punto único de acople propuesto

El acople futuro debe ubicarse en la zona documental general de restricciones y advertencias del expediente.

El punto lógico es la sección existente o candidata:

```text
## 12. Restricciones y advertencias técnicas
```

La integración futura debe limitarse a insertar las líneas generadas por el helper dentro de esa sección general o inmediatamente asociadas a ella.

No debe insertarse dentro de:

- Resumen Q-5 auditado;
- Método Racional;
- Contraste Q-5 vs Método Racional;
- Control Pe–Área–Volumen/Q-5;
- Diagnóstico temporal Q(t);
- Validación interna del expediente exportado.

## Import futuro propuesto

En una OT posterior, si se implementa, el archivo de expediente podría importar el helper así:

```javascript
import { construirBloqueRestriccionesAdvertenciasGeneralesExpediente } from "./construirBloqueRestriccionesAdvertenciasGeneralesExpediente";
```

La ruta exacta debe confirmarse en la OT de implementación según el estilo real de imports del archivo.

## Entradas futuras permitidas

El acople futuro solo podrá pasar al helper:

- `advertenciasGenerales`;
- `restriccionesGenerales`;
- `alcanceGeneral`;
- `incluirTitulo`.

## Entradas futuras prohibidas

El acople no podrá pasar:

- tablas Q-5;
- resultados del Método Racional;
- series Q(t);
- resultados de hidrogramas;
- volúmenes hidrológicos;
- Pe;
- Q-Tr;
- masa hidrológica;
- objetos internos del motor;
- dictámenes de adopción;
- selección de método o caudal.

## Textos por defecto candidatos

Si no existen entradas externas seguras, el acople futuro podrá usar textos generales por defecto como:

### Restricciones generales

- El expediente no modifica el motor hidrológico.
- El expediente no recalcula resultados.
- El bloque tiene alcance documental e interpretativo general.

### Advertencias generales

- Las advertencias generales no implican adopción hidrológica.
- Los resultados sensibles deben revisarse en sus bloques específicos.
- Este bloque no sustituye la validación técnica especializada.

## Criterio de no contaminación

El acople futuro debe garantizar que el bloque generado no incluya términos o contenidos asociados a:

- Q-5;
- Método Racional;
- Q(t);
- Volumen;
- Q-Tr;
- Pe;
- masa;
- hidrogramas;
- caudales;
- adopciones o validaciones afirmativas.

## Validaciones futuras requeridas

Antes de integrar en `main`, una OT posterior deberá validar:

- que el expediente conserva todas sus secciones obligatorias;
- que no aparecen `undefined`, `null`, `NaN` ni `[object Object]`;
- que el bloque general aparece una sola vez;
- que no duplica advertencias existentes;
- que no introduce términos sensibles prohibidos;
- que no modifica Q-5, Método Racional, Q(t), Volumen, Q-Tr, Pe ni masa;
- que `ComparadorMultiMetodo.jsx` permanece sin cambios.

## Riesgo controlado

La integración futura tocaría `construirExpedienteHidrologicoMinimo.js`, por lo que debe hacerse como cambio mínimo, único y auditable.

No debe mezclarse con refactorizaciones, cambios de formato global, cambios de orden de secciones ni ajustes a bloques sensibles.

## Decisión operativa

Se aprueba únicamente el diseño del punto de acople.

No se implementa ningún cambio en esta OT.

No se modifica `textoExpediente`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica el helper.

No se toca motor.

No se toca Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0228 — Implementación acople mínimo helper restricciones y advertencias generales al expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó el helper.
- No se integró el helper.
- No se consolidó contenido.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
