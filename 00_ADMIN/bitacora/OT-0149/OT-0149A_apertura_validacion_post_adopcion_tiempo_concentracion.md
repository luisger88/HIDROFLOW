# OT-0149A — Apertura validación post-adopción Tiempo de concentración y roles Tc

## Objetivo

Validar que, después de OT-0148, el expediente operativo mantiene correctamente adoptado el bloque `## 3. Tiempo de concentración y roles Tc` desde el helper delegado.

## Antecedente

OT-0148 sustituyó parcialmente las líneas manuales del bloque `## 3. Tiempo de concentración y roles Tc` dentro de `textoExpediente` por:

```javascript
...construirLineasTiempoConcentracionRolesTcExpediente({
  Tc_final,
  trDisenoActivoExpediente
}),
```

## Alcance

Esta OT solo valida post-adopción.

No sustituye nuevos bloques.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `textoExpediente`.

## Restricciones

No se modifica:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
