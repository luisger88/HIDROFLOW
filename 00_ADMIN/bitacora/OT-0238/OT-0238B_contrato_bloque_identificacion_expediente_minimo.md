# OT-0238B — Contrato bloque Identificación del expediente hidrológico mínimo

## Objetivo

Definir el contrato documental del bloque `Identificación` del expediente hidrológico mínimo.

## Antecedente

OT-0237 seleccionó el bloque Identificación del expediente como siguiente frente documental de bajo riesgo.

La selección se realizó después del cierre consolidado del bloque de restricciones y advertencias generales en OT-0236.

El objetivo es fortalecer la trazabilidad institucional del expediente sin tocar cálculos hidrológicos ni bloques sensibles.

## Alcance del bloque

El bloque Identificación debe aportar información descriptiva y trazable sobre el expediente generado.

Debe ubicarse conceptualmente en la sección:

```text
## 1. Identificación
```

Este bloque no calcula, no adopta, no valida hidrológicamente y no modifica resultados técnicos.

## Campos permitidos

El bloque podrá contener, de forma segura, campos como:

- nombre de la cuenca activa;
- identificador interno de cuenca, si existe;
- versión del expediente;
- tipo de salida documental;
- fecha de generación;
- fuente o modo de generación;
- estado documental del expediente;
- nota de alcance documental;
- referencia a que el expediente es generado por helper/exportador documental.

## Campos opcionales

Podrán considerarse como opcionales:

- responsable o módulo generador, si existe como dato textual seguro;
- código interno de escenario, si ya viene disponible como texto;
- nombre de punto de control, si ya viene disponible como texto;
- observación documental no técnica.

## Campos prohibidos

El bloque no debe incluir ni inferir:

- Q-5;
- Q-Tr;
- Método Racional;
- Q(t);
- Volumen;
- Pe;
- masa hidrológica;
- caudales;
- intensidades IDF;
- coeficientes hidrológicos;
- tiempos de concentración calculados;
- dictámenes de adopción;
- validaciones técnicas hidrológicas;
- conclusiones sobre suficiencia hidráulica o hidrológica.

## Reglas de contenido

El bloque debe cumplir estas reglas:

- ser puramente documental;
- usar textos seguros y explícitos;
- no inventar datos ausentes;
- usar marcador `—` cuando un campo no esté disponible;
- no introducir `undefined`, `null`, `NaN` ni `[object Object]`;
- no duplicar información sensible de otros bloques;
- no sustituir el sello técnico ni las restricciones generales.

## Entradas futuras sugeridas

Un helper futuro podría recibir un objeto con campos como:

```javascript
{
  cuenca: string,
  identificadorCuenca: string,
  versionExpediente: string,
  tipoSalida: string,
  fechaGeneracion: string,
  fuente: string,
  estadoDocumental: string,
  alcanceDocumental: string,
  incluirTitulo: boolean
}
```

## Salida futura esperada

La salida futura esperada debe ser un arreglo de líneas de texto:

```javascript
string[]
```

El helper no debe devolver objetos complejos para insertar directamente en el expediente.

## Título esperado

Si `incluirTitulo` es verdadero, el bloque podrá emitir:

```text
## 1. Identificación
```

Si `incluirTitulo` es falso, deberá emitir solo líneas internas del bloque.

## Criterios de validación futura

Una validación futura deberá comprobar:

- que la salida sea `string[]`;
- que sea determinística;
- que no contenga `undefined`, `null`, `NaN` ni `[object Object]`;
- que no contenga términos sensibles hidrológicos prohibidos;
- que incluya campos documentales mínimos;
- que respete `incluirTitulo`;
- que no modifique motor, UI, comparador ni expediente operativo durante la validación aislada.

## Decisión contractual

Se aprueba el contrato del bloque Identificación como bloque documental de bajo riesgo.

Este contrato habilita una OT posterior de diseño de helper, pero no implementa todavía ningún helper ni integración.

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0239 — Diseño helper bloque Identificación del expediente hidrológico mínimo`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
