# OT-0315B — Diseño contractual del bloque Restricciones, advertencias y no adopción automática del expediente

## Propósito

Definir el contrato documental del futuro helper puro del bloque `Restricciones, advertencias y no adopción automática` del expediente hidrológico mínimo.

Esta OT no implementa helper, no modifica código funcional y no acopla nuevos bloques.

## Antecedente inmediato

OT-0314 seleccionó como siguiente bloque delegable:

`## 10. Restricciones, advertencias y no adopción automática`

La selección se fundamentó en bajo coste, alto valor documental, bajo riesgo funcional, continuidad arquitectónica y utilidad institucional.

## Nombre candidato del helper

Se define como nombre candidato:

`construirBloqueRestriccionesAdvertenciasGeneralesExpediente`

## Ubicación futura sugerida

Ruta candidata futura:

`01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js`

Esta ruta se propone solo como contrato documental. OT-0315 no crea el archivo.

## Firma candidata

Firma candidata futura:

`export function construirBloqueRestriccionesAdvertenciasGeneralesExpediente(entrada = {})`

## Entradas esperadas

La entrada candidata será un objeto documental opcional.

Campos candidatos:

| Campo | Tipo esperado | Obligatorio | Uso documental |
|---|---|---:|---|
| `restricciones` | `string[]` | No | Lista explícita de restricciones documentales. |
| `advertencias` | `string[]` | No | Lista explícita de advertencias técnicas o institucionales. |
| `criteriosNoAdopcion` | `string[]` | No | Razones por las cuales el expediente no adopta automáticamente resultados. |
| `incluirTitulo` | `boolean` | No | Permite incluir u omitir el encabezado del bloque. Valor por defecto esperado: `true`. |

## Salida esperada

La función futura debe devolver siempre un arreglo de líneas `string[]`.

No debe devolver:

- `null`.
- `undefined`.
- Objetos crudos.
- Números sueltos.
- Texto concatenado como único bloque si el patrón del expediente requiere líneas.

## Encabezado contractual

Cuando `incluirTitulo` sea `true`, la primera línea debe ser:

`## 10. Restricciones, advertencias y no adopción automática`

## Líneas mínimas obligatorias

El bloque futuro debe producir como mínimo estas líneas documentales:

- `## 10. Restricciones, advertencias y no adopción automática`.
- `Restricción: este expediente no adopta automáticamente un método hidrológico.`
- `Advertencia: los resultados deben interpretarse dentro del marco técnico y normativo aplicable.`
- `No adopción automática: la selección de método, caudal o criterio final requiere decisión técnica competente.`

## Reglas documentales

El bloque debe:

- Mantener lenguaje documental, no imperativo.
- Evitar afirmar suficiencia hidrológica.
- Evitar seleccionar método adoptado.
- Evitar seleccionar caudal adoptado.
- Evitar convertir contrastes en conclusiones automáticas.
- Preservar el carácter exportable del expediente.
- Ser estable ante entradas vacías.
- Ser estable ante entradas incompletas.
- Mantener salida limpia sin tokens inválidos.

## Restricciones de no adopción

El helper futuro no podrá:

- Adoptar Tc.
- Adoptar Q-Tr.
- Adoptar Q-5.
- Adoptar Método Racional.
- Adoptar caudal de diseño.
- Adoptar periodo de retorno.
- Emitir dictamen de suficiencia hidrológica.
- Declarar cumplimiento normativo por sí mismo.
- Reemplazar revisión técnica competente.

## Prohibiciones funcionales

El helper futuro no debe:

- Recalcular Tc.
- Recalcular Q-Tr.
- Recalcular Q-5.
- Recalcular hidrogramas.
- Recalcular CN.
- Recalcular AMC.
- Recalcular volumen.
- Modificar Pe.
- Modificar área.
- Modificar fórmulas.
- Leer estado global.
- Llamar motor hidrológico.
- Depender de UI.
- Depender de `ComparadorMultiMetodo.jsx`.

## Tokens prohibidos en salida

La salida documental futura no debe contener:

- `undefined`.
- `null`.
- `NaN`.
- `[object Object]`.

## Comportamiento ante entradas vacías

Si no se entregan restricciones, advertencias o criterios de no adopción, el helper futuro debe devolver un bloque mínimo contractual estable.

No debe fallar por ausencia de campos opcionales.

## Comportamiento ante entradas personalizadas

Si se entregan listas documentales, el helper futuro podrá incorporarlas como líneas adicionales, siempre que no contradigan las restricciones de no adopción automática.

## Criterios de validación futura

La futura validación aislada deberá comprobar como mínimo:

- El helper existe.
- El helper exporta la función esperada.
- La salida es `string[]`.
- La salida incluye el encabezado esperado.
- La salida incluye las líneas mínimas obligatorias.
- La salida no contiene tokens prohibidos.
- La salida es estable con entrada vacía.
- La salida es estable con entrada parcial.
- La salida no recalcula variables hidrológicas.
- La salida no adopta método ni caudal.
- La salida no emite dictamen de suficiencia hidrológica.

## Criterios de acople futuro

Un acople futuro solo podrá considerarse después de:

- Crear helper puro en una OT explícita.
- Validarlo de forma aislada.
- Decidir documentalmente su integración.
- Diseñar el punto de acople.
- Acoplarlo de forma mínima.
- Validar el acople.
- Revalidar la salida real/exportable.

## Decisión contractual

Se aprueba como contrato documental para el futuro helper puro del bloque `Restricciones, advertencias y no adopción automática` el conjunto de nombre, firma, entradas, salida, líneas mínimas, restricciones, prohibiciones y criterios de validación descritos en este documento.

## Próximo frente recomendado

OT-0316 — Helper puro bloque Restricciones, advertencias y no adopción automática del expediente

## Conclusión

OT-0315 deja definido el contrato del futuro helper puro sin crear código funcional. Cualquier implementación posterior debe realizarse en una OT explícita.
