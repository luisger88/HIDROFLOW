# Reporte OT-0006-B — Intervalo defendible de Tc

## Estado

Cerrado.

## Objetivo

Definir un intervalo técnico de Tc basado en métodos hidrológicamente competentes.

## Caso de estudio

La Iguaná PC_80

---

## Métodos considerados

| Método   | Tc (min) | Rol |
|----------|----------|-----|
| Kirpich  | 85.14 | Límite inferior (rápido) |
| Témez    | 231.51 | Límite superior (integrado) |


## Intervalo de Tc

150 Tc ∈ [85.14 , 231.51] 150


## Interpretación física

- Kirpich captura la respuesta rápida del sistema (alta pendiente).
- Témez captura la respuesta integrada de la cuenca (almacenamientos, retardos).


## Tc adoptado (criterio técnico)

Valor de referencia adoptado:

150 Tc_{ref} ≈ 150 \text{ min} 150


## Justificación

- Balance entre respuesta hidráulica y almacenamiento.
- Coherente con pendiente alta y urbanización parcial.
- Evita subestimación (Kirpich puro) y sobreestimación (Témez puro).


## Criterio de uso

| Escenario | Tc recomendado |
|----------|----------------|
| Diseño conservador | 231.51 |
| Evaluación rápida | 85.14 |
| Modelación base | 150 |


## Principio técnico

El tiempo de concentración no es un valor único, sino un rango dependiente del método y del comportamiento hidrológico de la cuenca.


## Conclusión

El sistema HidroFlow debe trabajar con intervalo de Tc y no con un único valor absoluto.


## Estado final del módulo Tc

✔ Métodos auditados
✔ Unidades corregidas
✔ Competencia definida
✔ Intervalo físico establecido
✔ Sistema validado
