# OT-0161A — Apertura contrato documental Escenario Q-Tr activo

## Objetivo

Definir el contrato documental del bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` antes de cualquier helper, integración diagnóstica o sustitución.

## Antecedente

OT-0160 auditó el bloque `## 5. Escenario Q-Tr activo — control de trazabilidad` y lo clasificó como técnicamente sensible / dependiente de estado.

OT-0160C saneó documentalmente la auditoría para dejar una base limpia.

## Bloque auditado

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado
Tr activo
Estación IDF
Método IDF
Distribución temporal
Área
CN efectivo
S
Ia
Impermeabilidad
Tc
Pe total
Campos mínimos
Fuente
Lectura técnica
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

- No recalcular Q.
- No inferir Tr.
- No recalcular área.
- No recalcular CN.
- No recalcular S ni Ia.
- No recalcular Pe.
- No modificar `estadoQTrActivoExpediente`.
- No consultar motor.
- Solo representar valores ya presentes o fallback documental.
