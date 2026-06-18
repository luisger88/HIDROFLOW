# OT-0252B — Diseño helper bloque Parámetros hidrológicos base del expediente

## Objetivo

Diseñar el helper puro del bloque `Parámetros hidrológicos base` del expediente hidrológico mínimo.

## Antecedente contractual

OT-0251 aprobó el contrato documental del bloque `Parámetros hidrológicos base`.

El contrato definió que el bloque es documental y que no debe recalcular, corregir ni validar hidrológicamente `CN`, `CN base`, `CN efectivo` ni `AMC`.

## Nombre candidato del helper

El helper candidato será:

```text
construirBloqueParametrosHidrologicosBaseExpediente
```

## Archivo candidato futuro

El archivo funcional futuro, si se implementa en una OT posterior, será:

```text
01_APP/HIDROFLOW/src/services/documentos/construirBloqueParametrosHidrologicosBaseExpediente.js
```

## Firma candidata

La firma candidata será:

```javascript
export function construirBloqueParametrosHidrologicosBaseExpediente({
  CN = "—",
  CN_base = "—",
  CN_efectivo = "—",
  AMC = "—",
  incluirTitulo = true
} = {}) {
  // retorna string[]
}
```

## Naturaleza del helper

El helper será puro, documental y determinístico.

No deberá consultar estado global.

No deberá leer archivos.

No deberá modificar objetos de entrada.

No deberá recalcular parámetros hidrológicos.

No deberá decidir competencia técnica de los valores.

## Entradas permitidas

El helper podrá recibir únicamente:

- `CN`;
- `CN_base`;
- `CN_efectivo`;
- `AMC`;
- `incluirTitulo`.

## Equivalentes documentales futuros

En una integración posterior podrán mapearse equivalentes documentales explícitos desde `contextoBase`, por ejemplo:

- `contextoBase?.CN` hacia `CN`;
- `contextoBase?.CN_base` hacia `CN_base`;
- `contextoBase?.CN_efectivo` hacia `CN_efectivo`;
- `contextoBase?.AMC` hacia `AMC`.

Ese mapeo no se implementa en esta OT.

## Entradas prohibidas

El helper no deberá recibir:

- Q-5;
- Q-Tr;
- Método Racional;
- Q(t);
- Volumen;
- hidrogramas;
- Pe;
- masa;
- intensidades IDF;
- caudales;
- tiempos de concentración calculados;
- conclusiones técnicas;
- dictámenes de suficiencia.

## Salida esperada

Con `incluirTitulo = true`, la salida conceptual será:

```text
## 2. Parámetros hidrológicos base
CN: <valor o —>
CN base: <valor o —>
CN efectivo: <valor o —>
AMC: <valor o —>
```

Con `incluirTitulo = false`, la salida conceptual será:

```text
CN: <valor o —>
CN base: <valor o —>
CN efectivo: <valor o —>
AMC: <valor o —>
```

## Reglas internas diseñadas

El helper deberá aplicar una normalización documental segura:

- si el valor es `undefined`, usar `—`;
- si el valor es `null`, usar `—`;
- si el valor es cadena vacía, usar `—`;
- si el valor numérico no es finito, usar `—`;
- si el valor es objeto, usar `—`;
- si el valor es cadena o número válido, representarlo como texto;
- no convertir ausencias en cero;
- no inferir valores faltantes;
- no alterar precisión numérica desde el helper, salvo conversión documental directa a texto.

## Orden documental estable

El orden de salida deberá ser siempre:

```text
1. Título opcional
2. CN
3. CN base
4. CN efectivo
5. AMC
```

## Criterio de no recálculo

El helper no calcula CN.

El helper no calcula CN base.

El helper no calcula CN efectivo.

El helper no deriva AMC.

El helper no audita valores hidrológicos.

El helper solo representa documentalmente valores recibidos.

## Validaciones futuras de implementación

La OT de implementación o validación posterior deberá comprobar:

- salida `string[]`;
- título incluido cuando `incluirTitulo = true`;
- título omitido cuando `incluirTitulo = false`;
- presencia de campos mínimos;
- ausencia de `undefined`, `null`, `NaN` y `[object Object]`;
- ausencia de términos prohibidos ajenos al bloque;
- entrada vacía segura;
- objetos parciales seguros;
- determinismo;
- no mutación de entrada;
- no aparición de Q-5, Q-Tr, Método Racional, Q(t), Volumen, Pe, masa, hidrogramas ni caudales.

## Diseño de pruebas futuras

Las pruebas futuras deberán cubrir como mínimo:

- entrada completa;
- entrada vacía;
- entrada parcial;
- valores `null`;
- valores `undefined`;
- valores `NaN`;
- valores objeto;
- `incluirTitulo = true`;
- `incluirTitulo = false`;
- verificación de no mutación.

## Decisión de diseño

Se aprueba el diseño del helper puro `construirBloqueParametrosHidrologicosBaseExpediente` como base para una implementación posterior.

No se autoriza implementación en esta OT.

No se autoriza modificación del expediente operativo en esta OT.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se crea archivo funcional nuevo.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifican validadores existentes.

No se modifica motor.

No se recalculan ni validan `CN`, `CN base`, `CN efectivo` ni `AMC`.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0253 — Implementación helper bloque Parámetros hidrológicos base del expediente`

## Restricciones mantenidas

- No se modificó motor.
- No se modificó UI.
- No se modificó `textoExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `construirBloqueIdentificacionExpedienteMinimo.js`.
- No se modificaron helpers existentes.
- No se modificaron validadores existentes.
- No se tocó el acople de restricciones y advertencias.
- No se implementó helper nuevo.
- No se creó archivo funcional nuevo.
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
