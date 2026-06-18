# OT-0269B — Diseño punto de acople helper Tiempo de concentración y roles Tc del expediente

## Objetivo

Diseñar el punto de acople seguro del helper `construirBloqueTiempoConcentracionRolesTcExpediente` dentro del constructor del expediente hidrológico mínimo.

## Antecedente

OT-0264 definió el contrato documental del bloque `Tiempo de concentración y roles Tc`.

OT-0265 diseñó el helper puro documental.

OT-0266 implementó el helper como archivo funcional independiente.

OT-0267 validó aisladamente el helper.

OT-0268 aprobó avanzar al diseño del punto de acople, sin autorizar aún la implementación.

## Archivo funcional futuro a modificar

```text
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
```

## Helper a acoplar

```text
construirBloqueTiempoConcentracionRolesTcExpediente
```

Archivo del helper:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js
```

## Cadena técnica objetivo

La cadena futura deberá ser:

```text
construirExpedienteHidrologicoMinimo
↓
construirLineasTiempoConcentracionRolesTcExpediente
↓
construirBloqueTiempoConcentracionRolesTcExpediente
```

## Import futuro propuesto

Se propone agregar en `construirExpedienteHidrologicoMinimo.js`:

```javascript
import { construirBloqueTiempoConcentracionRolesTcExpediente } from "./construirBloqueTiempoConcentracionRolesTcExpediente";
```

## Función auxiliar candidata

La función auxiliar existente:

```text
construirLineasTiempoConcentracionRolesTcExpediente
```

deberá delegar al helper validado.

## Cuerpo futuro propuesto de la función auxiliar

```javascript
export function construirLineasTiempoConcentracionRolesTcExpediente(entrada = {}) {
  return construirBloqueTiempoConcentracionRolesTcExpediente({
    Tc_final: entrada?.Tc_final,
    trDisenoActivoExpediente: entrada?.trDisenoActivoExpediente,
    incluirTitulo: true
  });
}
```

## Punto de sustitución futuro

La sustitución futura deberá quedar acotada exclusivamente al cuerpo de:

```text
export function construirLineasTiempoConcentracionRolesTcExpediente
```

hasta antes de:

```text
export function construirLineasVolumenReferenciaExpediente
```

## Regla sobre el arreglo principal `texto`

En la OT de acople mínimo no se deberá intervenir directamente el arreglo principal `texto`.

La razón es mantener el mismo patrón prudente usado antes:

```text
Primero delegar función auxiliar.
Luego validar si la salida real consume esa función auxiliar.
Solo si hay hallazgo, corregir salida real en una OT posterior.
```

## Datos de entrada permitidos

La función auxiliar deberá pasar únicamente:

- `Tc_final`;
- `trDisenoActivoExpediente`;
- `incluirTitulo: true`.

No deberá pasar hidrogramas, Q-5, Método Racional, Volumen ni diagnóstico Q(t).

## Validación futura esperada

Después del acople mínimo se deberá validar:

- import único del helper;
- función auxiliar delegada;
- salida directa de la función auxiliar;
- salida real del constructor principal;
- ausencia de tokens inválidos;
- no contaminación de `SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO`;
- build aprobado.

## Riesgo esperado

Es posible que el arreglo principal `texto` aún conserve un bloque inline para `## 3. Tiempo de concentración y roles Tc`.

Si ocurre, la validación posterior deberá documentar el hallazgo sin corregirlo en la misma OT.

## Cortafuegos técnico

El acople futuro no deberá:

- recalcular `Tc`;
- modificar `Tc_final`;
- seleccionar `Tc` adoptado;
- evaluar competencia hidrológica;
- emitir dictamen hidrológico;
- modificar motor;
- modificar `ComparadorMultiMetodo.jsx`;
- tocar Volumen;
- tocar Q-Tr;
- tocar Q-5;
- tocar Método Racional;
- tocar diagnóstico Q(t).

## Decisión de diseño

Se aprueba diseñar el acople futuro mediante delegación de la función auxiliar `construirLineasTiempoConcentracionRolesTcExpediente` hacia el helper `construirBloqueTiempoConcentracionRolesTcExpediente`.

No se autoriza implementar el acople en esta OT.

## Próximo frente recomendado

`OT-0270 — Implementación acople mínimo helper Tiempo de concentración y roles Tc del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueTiempoConcentracionRolesTcExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se acopla helper en esta OT.

No se recalcula ni valida `Tc`.

No se modifica `Tc_final`.

No se selecciona `Tc` adoptado.

No se emite dictamen hidrológico.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueTiempoConcentracionRolesTcExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se acopló el helper.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
