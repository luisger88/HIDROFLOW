# OT-0151A — Apertura contrato documental Volumen de referencia

## Objetivo

Definir el contrato documental del bloque `## 4. Volumen de referencia` antes de cualquier helper, integración diagnóstica o sustitución.

## Antecedente

OT-0150 auditó el bloque `## 4. Volumen de referencia` y lo clasificó como técnicamente sensible.

OT-0150C saneó documentalmente la auditoría para dejar una base limpia.

## Bloque auditado

```text
## 4. Volumen de referencia
Lluvia efectiva total
Volumen esperado
Fórmula Pe(mm) × Área(km²) × 1000
```

## Alcance

Esta OT solo define contrato documental.

No implementa helper.

No modifica `ComparadorMultiMetodo.jsx`.

No sustituye `textoExpediente`.

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

## Regla técnica principal

- No calcular volumen.
- No recalcular lluvia efectiva.
- No recalcular área.
- No recalcular masa.
- No inferir Q-5.
- No consultar motor.
- Solo representar valores ya presentes o fallback documental.
