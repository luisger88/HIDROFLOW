# OT-0239B — Diseño helper bloque Identificación del expediente hidrológico mínimo

## Objetivo

Diseñar el helper futuro del bloque `Identificación` del expediente hidrológico mínimo, sin implementarlo todavía.

## Antecedente

OT-0238 aprobó el contrato documental del bloque Identificación del expediente hidrológico mínimo.

El contrato definió que el bloque debe ser puramente documental, de bajo riesgo y sin contaminación hidrológica.

## Archivo candidato futuro

El helper futuro podría ubicarse en:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueIdentificacionExpedienteMinimo.js
```

Esta OT no crea todavía el archivo.

## Nombre de función candidata

La función exportada candidata será:

```javascript
construirBloqueIdentificacionExpedienteMinimo
```

## Firma candidata

La firma futura propuesta es:

```javascript
export function construirBloqueIdentificacionExpedienteMinimo({
  cuenca = "Cuenca activa",
  identificadorCuenca = "—",
  versionExpediente = "—",
  tipoSalida = "expediente_hidrologico_minimo",
  fechaGeneracion = "—",
  fuente = "—",
  estadoDocumental = "Borrador documental",
  alcanceDocumental = "Bloque documental de identificación del expediente.",
  incluirTitulo = true
} = {})
```

## Salida esperada

El helper debe devolver exclusivamente:

```javascript
string[]
```

No debe devolver objetos complejos, metadatos anidados ni estructuras no textuales para insertar directamente en el expediente.

## Estructura textual candidata

Si `incluirTitulo` es verdadero, la primera línea debe ser:

```text
## 1. Identificación
```

Las líneas internas candidatas son:

```text
- Cuenca activa: <valor>
- Identificador interno de cuenca: <valor>
- Versión del expediente: <valor>
- Tipo de salida documental: <valor>
- Fecha de generación: <valor>
- Fuente o modo de generación: <valor>
- Estado documental: <valor>
- Alcance documental: <valor>
```

## Reglas internas de seguridad

El helper debe aplicar reglas defensivas:

- convertir valores ausentes a `—`;
- evitar `undefined`, `null`, `NaN` y `[object Object]`;
- no serializar objetos complejos;
- no inferir valores no recibidos;
- no incorporar resultados hidrológicos;
- no generar dictámenes técnicos;
- no modificar datos de entrada;
- producir salida determinística para la misma entrada.

## Campos permitidos

El helper podrá emitir únicamente campos documentales:

- cuenca;
- identificador interno de cuenca;
- versión del expediente;
- tipo de salida documental;
- fecha de generación;
- fuente o modo de generación;
- estado documental;
- alcance documental.

## Campos y términos prohibidos

El helper no debe emitir ni recibir como parte de su contrato principal:

- Q-5;
- Q-Tr;
- Método Racional;
- Q(t);
- Volumen;
- Pe;
- masa;
- caudal;
- caudales;
- intensidad IDF;
- coeficiente hidrológico;
- tiempo de concentración calculado;
- adopción técnica;
- validación hidrológica;
- suficiencia hidráulica;
- suficiencia hidrológica.

## Helper interno sugerido

La implementación futura podría usar una función interna pura:

```javascript
function textoSeguroIdentificacion(valor, fallback = "—")
```

Regla:

- si el valor es `null`, `undefined`, cadena vacía, objeto o arreglo, devolver fallback;
- si el valor es número finito o texto, convertir a `String(valor)`;
- si el valor no es seguro, devolver fallback.

## Validación futura esperada

Una validación aislada futura deberá comprobar:

- salida `string[]`;
- determinismo;
- respeto de `incluirTitulo`;
- presencia de campos mínimos;
- ausencia de `undefined`, `null`, `NaN` y `[object Object]`;
- ausencia de términos hidrológicos prohibidos;
- comportamiento seguro ante entrada vacía;
- comportamiento seguro ante objetos, arreglos y valores no textuales;
- no modificación de expediente operativo;
- no modificación de motor;
- no modificación de comparador.

## Casos de prueba futuros sugeridos

La validación futura debería cubrir al menos:

1. entrada vacía;
2. entrada completa válida;
3. `incluirTitulo: true`;
4. `incluirTitulo: false`;
5. campos `null`, `undefined`, vacíos y objetos;
6. intento de términos hidrológicos prohibidos;
7. determinismo doble ejecución.

## Decisión de diseño

Se aprueba el diseño del helper `construirBloqueIdentificacionExpedienteMinimo` como pieza futura, pura, documental y de bajo riesgo.

Esta OT no implementa el helper ni lo integra al expediente.

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se crea archivo helper.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0240 — Implementación helper bloque Identificación del expediente hidrológico mínimo`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
