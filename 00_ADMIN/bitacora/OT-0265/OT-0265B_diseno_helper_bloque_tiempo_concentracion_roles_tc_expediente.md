# OT-0265B — Diseño helper bloque Tiempo de concentración y roles Tc del expediente

## Objetivo

Diseñar el helper documental del bloque `Tiempo de concentración y roles Tc` del expediente hidrológico mínimo.

## Antecedente

OT-0264 definió el contrato documental del bloque `Tiempo de concentración y roles Tc` con alcance estrictamente representativo y no adoptivo.

El contrato prohíbe recalcular `Tc`, seleccionar un `Tc` adoptado, evaluar competencia hidrológica o emitir dictamen de suficiencia.

## Nombre propuesto del helper

```text
construirBloqueTiempoConcentracionRolesTcExpediente
```

## Archivo candidato futuro

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js
```

## Tipo de helper

Helper puro documental.

No debe depender de React.

No debe modificar entradas.

No debe leer estado global.

No debe llamar motor.

No debe recalcular valores hidrológicos.

## Firma propuesta

```javascript
export function construirBloqueTiempoConcentracionRolesTcExpediente({
  Tc_final = null,
  trDisenoActivoExpediente = null,
  incluirTitulo = true
} = {}) {
  ...
}
```

## Export propuesto

El helper deberá exponer:

```javascript
export function construirBloqueTiempoConcentracionRolesTcExpediente(...)
export default construirBloqueTiempoConcentracionRolesTcExpediente
```

## Entradas permitidas

El helper solo podrá recibir:

- `Tc_final`;
- `trDisenoActivoExpediente`;
- `incluirTitulo`.

No deberá recibir hidrogramas, Q-5, Método Racional, Volumen ni diagnóstico Q(t).

## Salida esperada

El helper deberá devolver siempre `string[]`.

Con `incluirTitulo = true`, la salida mínima será:

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: <valor o —>
Tr global activo: <valor o —> años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

Con `incluirTitulo = false`, deberá omitir únicamente el título `## 3. Tiempo de concentración y roles Tc`.

## Normalizadores internos propuestos

Se propone diseñar dos normalizadores internos no exportados:

```text
formatearTcDocumental(valor)
normalizarTrDocumental(valor)
```

## Reglas de normalización de Tc

`formatearTcDocumental(valor)` deberá cumplir:

- `undefined` → `—`;
- `null` → `—`;
- cadena vacía → `—`;
- objeto → `—`;
- número no finito → `—`;
- número finito → `<valor con 1 decimal> min`.

Ejemplos esperados:

```text
114.23 → 114.2 min
0 → 0.0 min
null → —
{ valor: 114 } → —
```

## Reglas de normalización de Tr

`normalizarTrDocumental(valor)` deberá cumplir:

- `undefined` → `—`;
- `null` → `—`;
- cadena vacía → `—`;
- objeto → `—`;
- número finito → texto del número;
- cadena no vacía → texto recortado.

La línea documental deberá mantener el sufijo `años`:

```text
Tr global activo: <valor o —> años
```

## Roles textuales fijos

El helper deberá conservar roles fijos:

```text
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Términos sensibles permitidos

Los términos sensibles solo podrán aparecer en roles fijos ya autorizados por contrato:

- `Q(t)` solo en `Tc operativo Q(t)`;
- `Q-5` solo en `Tc comparador: referencia especializada para coherencia Q-5`;
- `Lag / forma SCS` solo como descripción documental de rol.

## Términos y contenidos prohibidos

El helper no deberá generar:

- hidrogramas completos;
- tablas Q-5;
- caudales Q-5;
- resultados de Método Racional;
- balances de volumen;
- dictámenes de plausibilidad temporal;
- diagnóstico Q(t);
- conclusiones hidrológicas adoptivas;
- advertencias globales de restricciones.

## Criterio de éxito futuro

El helper futuro deberá cumplir:

- salida `string[]`;
- título opcional controlado por `incluirTitulo`;
- campos mínimos presentes;
- normalización segura de `Tc_final`;
- normalización segura de `trDisenoActivoExpediente`;
- ausencia de `undefined`, `null`, `NaN` y `[object Object]`;
- determinismo;
- no mutación de entrada;
- no recálculo de `Tc`;
- no dictamen hidrológico.

## Validación futura recomendada

Después de implementar el helper, una OT posterior deberá validar casos como:

- entrada completa con título;
- entrada completa sin título;
- entrada vacía;
- entrada parcial;
- valores `null`, `undefined`, `NaN` y objeto;
- cadenas con espacios;
- número finito de `Tc_final`;
- `trDisenoActivoExpediente` numérico y textual.

## Alcance frente al constructor principal

Este diseño no autoriza acople.

El acople futuro deberá decidirse en una OT separada después de implementación y validación aislada.

## Decisión de diseño

Se aprueba el diseño del helper `construirBloqueTiempoConcentracionRolesTcExpediente` como helper puro documental, representativo y no adoptivo.

## Próximo frente recomendado

`OT-0266 — Implementación helper bloque Tiempo de concentración y roles Tc del expediente`

## Alcance mantenido

No se implementa ningún cambio funcional.

No se crea el archivo funcional del helper.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifica motor.

No se implementa helper en esta OT.

No se acopla helper en esta OT.

No se recalcula ni valida `Tc`.

No se recalculan ni validan `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se recalculó `Tc`.
- No se emitió dictamen hidrológico.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
