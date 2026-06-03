# Reporte OT-0005 — Normalización global de pendientes

## Estado

Abierto.

## Problema identificado

La variable pendiente_cuenca se usa sin definición de unidad ni tipo, generando inconsistencias en múltiples métodos.

## Tipos de pendiente definidos

### 1. Scp — Pendiente del cauce principal

- Definición: (Z max - Z salida) / longitud del cauce
- Unidad: adimensional (m/m)
- Fuente: perfil longitudinal

### 2. Sc — Pendiente media de cuenca

- Definición: pendiente promedio del terreno
- Unidad: porcentaje (%)
- Uso: análisis geomorfológico, NO para Tc directo

### 3. So — Pendiente del cauce

- Definición: pendiente del perfil hidráulico
- Unidad: puede expresarse en por mil o decimal

### 4. Sp — Pendiente para método

- Definición: pendiente que consume cada fórmula
- Unidad: depende del método

## Reglas obligatorias

| Método        | Pendiente a usar | Unidad requerida |
|--------------|------------------|------------------|
| Témez        | So/1000          | decimal          |
| California   | So/1000          | decimal          |
| Kirpich      | Sf               | ft/ft o decimal  |
| SCS-Ranser   | Sp               | decimal          |

## Hallazgo estructural

pendiente_cuenca = 8.43 corresponde a Sc (%) pero fue usada como Sp → error conceptual crítico.

## Impacto

Afecta múltiples métodos (Kirpich, SCS-Ranser).

## Principio de solución

Separar estrictamente las pendientes por tipo y unidad.

## Recomendación

No modificar código directamente. Diseñar capa de normalización previa al cálculo Tc.

## Estado

Pendiente implementación futura.
