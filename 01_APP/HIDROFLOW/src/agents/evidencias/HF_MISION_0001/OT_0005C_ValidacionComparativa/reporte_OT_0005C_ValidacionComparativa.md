# Reporte OT-0005-C — Validación comparativa del adaptador

## Estado

Completado.

## Objetivo

Comparar resultados de Tc antes y después de la normalización de pendientes.

## Caso de estudio

La Iguaná PC_80

---

## 1. SCS-Ranser

| Escenario | Sp usada | Tc (min) |
|-----------|----------|----------|
| Antes     | 8.43     | 122.02 |
| Después   | 0.0843   | 1220.24 |

### Resultado

- Relación ≈ 10x
- El valor corregido es físicamente coherente.

---

## 2. Kirpich

| Escenario | Sf usada | Tc (min) |
|-----------|----------|----------|
| Antes     | mixta m/ft | 134.52 |
| Corregido | ft/ft coherente | 85.14 |

### Resultado

- Relación ≈ 1.58x
- Se elimina inconsistencia dimensional.

## Uso del intervalo Tc

El intervalo de Tc definido no representa incertidumbre,
sino diferentes escalas de respuesta del sistema hidrológico.

Se establecen tres niveles operativos:

- Tc_min (Kirpich): respuesta hidráulica rápida → usado en cálculo de caudal pico.
- Tc_ref: respuesta integrada → usado en modelación de hidrogramas.
- Tc_max (Témez): respuesta global → usado en análisis conservador.

El sistema HidroFlow no debe usar un Tc único, sino adaptar el Tc según el proceso evaluado.

---

## Conclusión global

- El adaptador corrige errores estructurales de unidad.
- SCS-Ranser recupera comportamiento esperado.
- Kirpich mejora coherencia dimensional.

## Dictamen técnico

El sistema con adaptador activo es dimensionalmente consistente.

## Estado de métodos

| Método      | Antes | Después | Estado |
|-------------|-------|--------|--------|
| SCS-Ranser  | ❌    | ✅     | Adoptable con adaptador |
| Kirpich     | ❌    | ✅     | Condicionado |
| Témez       | ✅    | ✅     | Adoptable |

## Conclusión final

La arquitectura basada en adaptador permite corregir el sistema sin modificar el motor.

El modelo HidroFlow queda validado bajo control de unidades.

