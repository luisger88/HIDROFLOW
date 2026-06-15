# OT-0148B — Sustitución parcial del bloque Tiempo de concentración y roles Tc

## Cambio aplicado

Se sustituyeron únicamente las líneas manuales del bloque `## 3. Tiempo de concentración y roles Tc` dentro de `textoExpediente` por:

```javascript
...construirLineasTiempoConcentracionRolesTcExpediente({
  Tc_final,
  trDisenoActivoExpediente
}),
```

## Alcance del cambio

La sustitución se limitó al bloque Tiempo de concentración y roles Tc.

No se modificó:

- bloque `## 1. Identificación`;
- bloque `## 2. Parámetros hidrológicos base`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.

## Nota técnica

La sustitución se habilitó porque OT-0147 confirmó coincidencia textual estricta 10/10 entre bloque delegado y referencia operativa controlada.
