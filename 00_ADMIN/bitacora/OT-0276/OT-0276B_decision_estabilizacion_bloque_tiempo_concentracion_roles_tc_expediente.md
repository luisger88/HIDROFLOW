# OT-0276B — Decisión estabilización bloque Tiempo de concentración y roles Tc del expediente

## Objetivo

Documentar la decisión de estabilizar el bloque `Tiempo de concentración y roles Tc` del expediente hidrológico mínimo.

## Antecedente

El bloque fue trabajado mediante una secuencia controlada de OTs:

- OT-0264: contrato documental del bloque.
- OT-0265: diseño del helper puro documental.
- OT-0266: implementación del helper independiente.
- OT-0267: validación aislada del helper.
- OT-0268: decisión de integración.
- OT-0269: diseño del punto de acople.
- OT-0270: acople mínimo mediante función auxiliar.
- OT-0271: validación del acople auxiliar y detección de salida real no conectada.
- OT-0272: corrección de salida real.
- OT-0273: revalidación y detección de error runtime.
- OT-0274: corrección runtime de `trDisenoActivoExpediente`.
- OT-0275: revalidación runtime limpia.

## Evidencia principal

OT-0275 cerró con revalidación aprobada:

```json
{
  "validacion": "OT-0275",
  "helper": "construirBloqueTiempoConcentracionRolesTcExpediente",
  "totalControles": 18,
  "controlesAprobados": 18,
  "controlesFallidos": 0,
  "controlesFallidosIds": [],
  "buildAprobado": true,
  "runtimeCorregido": true,
  "acopleAuxiliarValidado": true,
  "acopleSalidaRealValidado": true,
  "requiereCorreccionSalidaReal": false,
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Estado estabilizado del bloque

Queda estabilizada la cadena:

```text
construirExpedienteHidrologicoMinimo
↓
trDisenoActivoExpedienteDocumental
↓
construirLineasTiempoConcentracionRolesTcExpediente
↓
construirBloqueTiempoConcentracionRolesTcExpediente
```

## Condiciones verificadas

La revalidación confirmó:

- import único del helper;
- firma del constructor con `trDisenoActivoExpediente = null`;
- variable `trDisenoActivoExpedienteDocumental` declarada una sola vez;
- salida real pasando `trDisenoActivoExpedienteDocumental` a la función auxiliar;
- función auxiliar delegada al helper;
- salida directa auxiliar válida;
- salida real válida;
- constructor principal sin error runtime;
- constructor principal generando salida documental;
- bloque `## 3. Tiempo de concentración y roles Tc` presente antes de `## 4. Volumen de referencia`;
- bloque inline antiguo eliminado;
- bloque Tc sin tokens inválidos;
- build Vite aprobado.

## Decisión

Se declara estabilizado el bloque `Tiempo de concentración y roles Tc` dentro del expediente hidrológico mínimo.

Esta estabilización es documental y de acople técnico.

No equivale a selección de Tc adoptado.

No equivale a dictamen hidrológico.

No modifica criterios de competencia hidrológica.

No recalcula Tc.

No modifica motor.

## Alcance mantenido

No se implementa ningún cambio funcional en esta OT.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueTiempoConcentracionRolesTcExpediente.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se recalcula `Tc`.

No se modifica `Tc_final`.

No se selecciona `Tc` adoptado.

No se emite dictamen hidrológico.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0277 — Selección siguiente bloque documental del expediente hidrológico mínimo`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueTiempoConcentracionRolesTcExpediente.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
