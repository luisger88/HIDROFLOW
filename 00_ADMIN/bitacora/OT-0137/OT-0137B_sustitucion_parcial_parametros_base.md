# OT-0137B — Sustitución parcial del bloque Parámetros hidrológicos base

## Cambio aplicado

Se sustituyeron únicamente las líneas manuales del bloque `## 2. Parámetros hidrológicos base` dentro de `textoExpediente` por:

```javascript
...construirLineasParametrosHidrologicosBaseExpediente({
  contextoBase
}),
```

## Alcance del cambio

La sustitución se limitó al bloque Parámetros hidrológicos base.

No se modificó:

- bloque `## 1. Identificación`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Nota técnica

La sustitución se habilitó porque OT-0136 confirmó coincidencia textual estricta 5/5 entre bloque delegado y referencia operativa controlada.
