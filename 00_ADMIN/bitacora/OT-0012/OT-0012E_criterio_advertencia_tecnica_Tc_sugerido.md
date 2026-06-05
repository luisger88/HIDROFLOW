# OT-0012E — Criterio de advertencia técnica para Tc sugerido

## Objetivo

Definir documentalmente el criterio técnico para advertir que el Tc sugerido, aunque trazable y ubicado dentro del rango competente, puede requerir análisis de sensibilidad cuando se encuentre cerca del borde inferior del rango competente.

## Base auditada

- Tc sugerido reconstruido: 114.216 min
- Rango competente OT-0011: 105.1–231.5 min
- Posición: dentro del rango competente
- Condición crítica: cercanía al borde inferior

## Criterio propuesto

Cuando el Tc sugerido se ubique dentro del rango competente pero próximo al límite inferior, HidroFlow no debe presentarlo como valor único robusto sin advertencia técnica.

La advertencia debe indicar que el Tc sugerido es trazable, pero que por seguridad hidrológica se recomienda revisar sensibilidad con escenarios rápido, sugerido y lento.

## Escenarios de sensibilidad recomendados

- Tc rápido competente: 105.1 min
- Tc sugerido: 114.2 min
- Tc lento o volumétrico: 231.5 min

## Regla de implementación futura

La advertencia debe ser informativa y no debe modificar Tc_final, rangos, motor hidrológico, fórmulas ni selector Tc.

## Dictamen

La mejora recomendada para una fase posterior es visual/documental: mostrar una advertencia técnica cuando el Tc sugerido esté cerca del borde inferior competente. No se recomienda modificar el cálculo en esta etapa.

## Estado

Criterio documental. Sin cambios funcionales.
