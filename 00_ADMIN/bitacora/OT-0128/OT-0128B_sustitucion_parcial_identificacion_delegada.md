# OT-0128B — Sustitución parcial controlada del bloque Identificación

## Cambio aplicado

Se sustituyeron únicamente las 7 líneas manuales del bloque `## 1. Identificación` dentro de `textoExpediente` por una expansión del bloque delegado:

```javascript
...construirLineasIdentificacionExpediente({
  contextoBase,
  fuenteFallback: "HidroFlow",
  estacionIdfFallback: estacionIdfExpediente
}),
```

## Alcance del cambio

La sustitución se limitó al bloque Identificación.

No se modificó:

- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Nota técnica

El bloque delegado ya había sido validado en OT-0127 con coincidencia estricta frente al bloque operativo de referencia.
