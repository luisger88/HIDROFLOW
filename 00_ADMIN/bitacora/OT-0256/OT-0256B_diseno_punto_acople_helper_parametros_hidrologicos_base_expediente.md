# OT-0256B — Diseño punto acople helper Parámetros hidrológicos base del expediente

## Objetivo

Diseñar el punto exacto de acople del helper `construirBloqueParametrosHidrologicosBaseExpediente` dentro del expediente hidrológico mínimo.

## Antecedente

El bloque `Parámetros hidrológicos base` siguió el ciclo:

- OT-0250: selección del bloque;
- OT-0251: contrato documental;
- OT-0252: diseño del helper;
- OT-0253: implementación del helper puro;
- OT-0254: validación aislada aprobada;
- OT-0255: decisión de integración futura.

## Estado del helper

El helper ya existe y fue validado aisladamente:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueParametrosHidrologicosBaseExpediente.js
```

Helper:

```text
construirBloqueParametrosHidrologicosBaseExpediente
```

## Evidencia de validación previa

OT-0254 confirmó:

```json
{
  "validacion": "OT-0254",
  "helper": "construirBloqueParametrosHidrologicosBaseExpediente",
  "totalControles": 13,
  "controlesAprobados": 13,
  "controlesFallidos": 0,
  "casosEvaluados": 6,
  "buildAprobado": true,
  "helperValidado": true
}
```

## Archivo candidato de acople futuro

El acople futuro deberá ocurrir únicamente en:

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Import futuro requerido

El import futuro deberá agregarse junto a los imports documentales existentes:

```javascript
import { construirBloqueParametrosHidrologicosBaseExpediente } from "./construirBloqueParametrosHidrologicosBaseExpediente";
```

## Función auxiliar candidata

El acople debe seguir el patrón ya usado con Identificación.

Se recomienda que el constructor principal no llame directamente al helper, sino a una función auxiliar exportada:

```text
construirLineasParametrosHidrologicosBaseExpediente
```

Actualmente ya existe una función con ese nombre en `construirExpedienteHidrologicoMinimo.js`, por lo que el acople futuro deberá sustituir su cuerpo para delegar al helper.

## Punto funcional de sustitución recomendado

El punto recomendado de intervención futura es exclusivamente el cuerpo de:

```javascript
export function construirLineasParametrosHidrologicosBaseExpediente(entrada = {}) {
  ...
}
```

No se recomienda intervenir directamente el arreglo principal `texto` del constructor en esta fase, salvo que una validación posterior demuestre que el constructor principal no consume la función auxiliar.

## Mapeo documental futuro

La función auxiliar deberá mapear desde `entrada` o `entrada.contextoBase` hacia el helper:

```javascript
return construirBloqueParametrosHidrologicosBaseExpediente({
  CN: contextoBase?.CN,
  CN_base: contextoBase?.CN_base,
  CN_efectivo: contextoBase?.CN_efectivo,
  AMC: contextoBase?.AMC,
  incluirTitulo: true
});
```

## Fronteras seguras

La sustitución futura deberá quedar acotada entre:

```text
export function construirLineasParametrosHidrologicosBaseExpediente
```

y la siguiente función exportada:

```text
export function construirLineasTiempoConcentracionRolesTcExpediente
```

Esa frontera evita tocar Tiempo de concentración, Volumen, Q-Tr, Q-5, Método Racional y diagnóstico Q(t).

## Elementos que no deben tocarse

El acople futuro no deberá modificar:

- `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`;
- `construirExpedienteHidrologicoMinimo` como export default;
- bloque `Identificación`;
- helper `construirBloqueIdentificacionExpedienteMinimo`;
- helper `construirBloqueParametrosHidrologicosBaseExpediente`;
- `ComparadorMultiMetodo.jsx`;
- motor;
- validadores existentes;
- bloques posteriores.

## Riesgo técnico principal

El riesgo principal es que la función auxiliar `construirLineasParametrosHidrologicosBaseExpediente` exista, pero la salida real del constructor principal aún mantenga un bloque inline de `## 2. Parámetros hidrológicos base`.

Por tanto, después del acople futuro deberá existir una validación equivalente a OT-0245/OT-0247 para confirmar si la salida real del constructor principal usa el bloque delegado.

## Validaciones futuras requeridas

Después del acople futuro deberá validarse:

- import del helper presente una sola vez;
- función auxiliar delega al helper;
- `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO` sin contaminación;
- `export default` del constructor principal presente;
- salida directa de la función auxiliar con campos delegados;
- salida real del constructor principal usando campos delegados;
- ausencia de tokens inválidos;
- ausencia de términos prohibidos;
- build Vite aprobado.

## Decisión de diseño

Se aprueba como diseño de acople futuro sustituir el cuerpo de `construirLineasParametrosHidrologicosBaseExpediente` para delegar en `construirBloqueParametrosHidrologicosBaseExpediente`.

No se autoriza aplicar el acople en esta OT.

No se autoriza modificar el constructor principal en esta OT.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se acopla el helper al constructor principal.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueParametrosHidrologicosBaseExpediente.js`.

No se modifica `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifican validadores existentes.

No se modifica motor.

No se recalculan ni validan `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0257 — Implementación acople mínimo helper Parámetros hidrológicos base del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueParametrosHidrologicosBaseExpediente.js`.
- No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se acopló el helper al constructor principal.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
