# OT-0158B — Sustitución parcial del bloque Volumen de referencia

## Cambio aplicado

Se sustituyeron únicamente las líneas manuales del bloque `## 4. Volumen de referencia` dentro de `textoExpediente` por:

```javascript
...construirLineasVolumenReferenciaExpediente({
  peTotalMm,
  volumenEsperadoM3
}),
```

## Alcance del cambio

La sustitución se limitó al bloque Volumen de referencia.

No se modificó:

- bloque `## 1. Identificación`;
- bloque `## 2. Parámetros hidrológicos base`;
- bloque `## 3. Tiempo de concentración y roles Tc`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Nota técnica

La sustitución se habilitó porque OT-0157 confirmó coincidencia textual estricta 4/4 entre bloque delegado y referencia operativa controlada.
