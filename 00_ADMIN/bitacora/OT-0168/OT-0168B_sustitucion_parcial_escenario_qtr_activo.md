# OT-0168B — Sustitución parcial del bloque Escenario Q-Tr activo

## Cambio aplicado

Se sustituyeron únicamente las líneas manuales del bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` dentro de `textoExpediente` por:

```javascript
...construirLineasEscenarioQTrActivoExpediente({
  estadoQTrActivoExpediente,
  qTrActivoExpediente,
  faltantesQTrActivoExpediente,
  formatearValorQTrExpediente
}),
```

## Alcance del cambio

La sustitución se limitó al bloque Escenario Q-Tr activo.

No se modificó:

- bloque `## 1. Identificación`;
- bloque `## 2. Parámetros hidrológicos base`;
- bloque `## 3. Tiempo de concentración y roles Tc`;
- bloque `## 4. Volumen de referencia`;
- bloques posteriores;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Nota técnica

La sustitución se habilitó porque OT-0167 confirmó coincidencia textual estricta 16/16 entre bloque delegado y referencia operativa controlada.
