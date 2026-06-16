# OT-0185A — Registro adopción existente bloque Identificación

## Objetivo

Registrar formalmente que el bloque `## 1. Identificación` del expediente hidrológico mínimo ya se encuentra delegado dentro de `textoExpediente` mediante el helper `construirLineasIdentificacionExpediente(...)`.

## Antecedente

OT-0181 seleccionó el bloque Identificación / contexto general como candidato preferente por su bajo riesgo técnico y carácter principalmente representacional.

OT-0182 auditó el bloque y localizó inicialmente el diagnóstico no invasivo OT-0125D.

OT-0183 diferenció el diagnóstico frente al arreglo `textoExpediente` y confirmó que el encabezado literal `"## 1. Identificación"` no estaba como línea manual dentro del arreglo.

OT-0184 trazó la composición real y confirmó que la identificación aparece delegada dentro de `textoExpediente` por helper.

## Evidencia principal

Dentro de `textoExpediente` se localizó la expansión:

```javascript
...construirLineasIdentificacionExpediente({
  contextoBase,
  fuenteFallback: "HidroFlow",
  estacionIdfFallback: estacionIdfExpediente
}),
```

## Estado consolidado

El bloque `## 1. Identificación` no requiere sustitución manual.

La delegación por helper ya está presente dentro del flujo operativo de armado del expediente.

El diagnóstico OT-0125D se conserva como control no invasivo posterior al cierre del arreglo `textoExpediente`.

## Rutas funcionales verificadas en OT-0184

- `textoExpediente` existe;
- el cierre de `textoExpediente` existe;
- `construirLineasIdentificacionExpediente(...)` existe;
- el helper de identificación aparece dentro de `textoExpediente`;
- el encabezado literal `"## 1. Identificación"` no aparece como bloque manual dentro de `textoExpediente`;
- el diagnóstico OT-0125D aparece después del cierre de `textoExpediente`;
- `areaTexto.value = textoExpediente` sigue siendo la ruta de copiado;
- `window.prompt(..., textoExpediente)` sigue siendo la ruta fallback.

## Alcance

Esta OT es exclusivamente documental.

No implementa helper.

No diseña función pura.

No sustituye contenido.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica validadores existentes.

## Restricciones mantenidas

No se modifica:

- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- motor hidrológico;
- helper documental existente.

## Decisión consolidada

El bloque `## 1. Identificación` queda reconocido como bloque ya delegado por helper dentro del expediente hidrológico mínimo.

No se abre ciclo de sustitución para este bloque porque la sustitución ya está materializada.

Cualquier avance posterior debe limitarse a validar o reforzar el contrato del helper existente, no a reemplazar manualmente el bloque.

## Próximo frente recomendado

`OT-0186 — Validación aislada del helper Identificación existente`
