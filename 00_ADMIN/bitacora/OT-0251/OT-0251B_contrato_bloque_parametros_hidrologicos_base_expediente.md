# OT-0251B — Contrato bloque Parámetros hidrológicos base del expediente

## Objetivo

Definir el contrato documental del bloque `Parámetros hidrológicos base` del expediente hidrológico mínimo.

## Antecedente

OT-0250 seleccionó el bloque:

```text
## 2. Parámetros hidrológicos base
```

como siguiente bloque documental después del cierre consolidado del bloque `Identificación`.

## Naturaleza del bloque

El bloque `Parámetros hidrológicos base` contiene campos hidrológicos de contexto que deben tratarse como datos documentales de entrada/salida, no como resultados recalculados por el helper.

Este contrato no valida la corrección hidrológica de los valores.

Este contrato solo define cómo deben representarse documentalmente los campos base de forma segura, determinística y trazable.

## Campos candidatos del bloque

El bloque podrá incluir, como mínimo, los siguientes campos documentales:

- Número de Curva (`CN`).
- Número de Curva base (`CN base`).
- Número de Curva efectivo (`CN efectivo`).
- Condición antecedente de humedad (`AMC`).

## Campos opcionales futuros

Podrán evaluarse posteriormente, sin incorporarlos automáticamente en este contrato:

- Fuente de los parámetros base.
- Estado de disponibilidad de cada parámetro.
- Advertencia documental si un parámetro falta.
- Marcador de no recálculo.
- Marcador de trazabilidad hacia contexto base.

## Reglas contractuales

El futuro helper del bloque deberá cumplir:

- devolver siempre `string[]`;
- conservar el título `## 2. Parámetros hidrológicos base` cuando `incluirTitulo` sea verdadero;
- no recalcular `CN`, `CN base`, `CN efectivo` ni `AMC`;
- no inferir valores faltantes;
- no convertir ausencia de datos en cero;
- no emitir `undefined`, `null`, `NaN` ni `[object Object]`;
- representar valores ausentes mediante `—`;
- mantener orden documental estable;
- mantener salida determinística para la misma entrada;
- aceptar entrada vacía de forma segura;
- aceptar objetos parciales sin fallar;
- no modificar objetos de entrada.

## Entradas permitidas

El futuro helper podrá recibir únicamente datos documentales relacionados con parámetros base:

- `CN`;
- `CN_base`;
- `CN_efectivo`;
- `AMC`;
- equivalentes documentales explícitos si ya existen en el contexto base.

## Entradas prohibidas

No deberá recibir, ni directa ni indirectamente:

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

## Salida documental esperada

La salida documental mínima esperada será conceptualmente:

```text
## 2. Parámetros hidrológicos base
CN: <valor o —>
CN base: <valor o —>
CN efectivo: <valor o —>
AMC: <valor o —>
```

## Validaciones futuras mínimas

Una validación posterior del helper deberá comprobar:

- salida `string[]`;
- título presente cuando `incluirTitulo` sea verdadero;
- campos mínimos presentes;
- ausencia de `undefined`, `null`, `NaN` y `[object Object]`;
- ausencia de términos prohibidos ajenos al bloque;
- comportamiento seguro ante entrada vacía;
- comportamiento seguro ante objetos parciales;
- determinismo;
- no mutación de entrada;
- build aprobado si llega a integrarse al flujo de aplicación.

## Criterio de no recálculo

El bloque `Parámetros hidrológicos base` es documental.

No selecciona, recalcula, corrige ni valida hidrológicamente los parámetros.

Cualquier revisión hidrológica de `CN`, `CN base`, `CN efectivo` o `AMC` deberá abrir una OT específica de auditoría o validación técnica.

## Decisión contractual

Se aprueba el contrato documental del bloque `Parámetros hidrológicos base` como base para diseñar un helper puro en una OT posterior.

No se autoriza implementación en esta OT.

No se autoriza modificación del expediente operativo en esta OT.

## Alcance mantenido

No se implementa ningún cambio funcional.

No se modifica `construirExpedienteHidrologicoMinimo.js`.

No se modifica `construirBloqueIdentificacionExpedienteMinimo.js`.

No se modifica `ComparadorMultiMetodo.jsx`.

No se modifican validadores existentes.

No se modifica motor.

No se tocan Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).

## Próximo frente recomendado

`OT-0252 — Diseño helper bloque Parámetros hidrológicos base del expediente`

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
- No se tocaron Volumen, Q-Tr, Q-5, Método Racional ni diagnóstico Q(t).
