# OT-0140A — Apertura contrato documental Tiempo de concentración y roles Tc

## Objetivo

Definir el contrato documental del bloque `## 3. Tiempo de concentración y roles Tc` antes de cualquier helper, integración diagnóstica o sustitución.

## Antecedente

OT-0139 seleccionó y auditó el bloque `## 3. Tiempo de concentración y roles Tc` como siguiente candidato documental.

La auditoría confirmó que el bloque contiene campos técnicamente sensibles asociados al tiempo de concentración y roles Tc.

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

- No recalcular Tc.
- No inferir Tc.
- No derivar roles.
- No reinterpretar competencia.
- No generar advertencias nuevas.
- Solo representar valores ya presentes en el contexto operativo.
