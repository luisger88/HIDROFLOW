# OT-0056C1 — Adaptador puro Q-Tr activo

Fecha: 06/08/2026 20:25:42
Rama: ot-0056c1-adaptador-puro-qtr-activo

## 1. Propósito

Crear un adaptador puro para derivar el estado de completitud del futuro Bloque Q-Tr activo a partir del contexto runtime ya disponible.

Esta OT no calcula caudales, no renderiza UI y no modifica el motor hidrológico.

## 2. Archivo creado

01_APP/HIDROFLOW/src/services/qtr/derivarEstadoQTrActivo.js

## 3. Responsabilidad del adaptador

El adaptador evalúa si existen los campos mínimos requeridos para declarar un escenario Q-Tr activo como disponible.

Campos mínimos evaluados:

- tr_activo
- estacion_idf
- metodo_idf
- distribucion_temporal
- area_km2
- cn_efectivo
- s_mm
- ia_mm
- porcentaje_impermeable
- tc_min
- lluvia_efectiva_total_mm

## 4. Salida esperada

El adaptador retorna:

- fuente
- tipo
- estado
- disponible
- campos_faltantes
- q_tr_activo

## 5. Restricciones preservadas

No se modifica:

- hidroEngine
- tcSelector
- Q-5
- fórmulas de caudal
- fórmulas de hidrogramas
- Comparador
- Índice Hidrológico

## 6. Validación

Build aprobado con Vite.

El adaptador compila como archivo nuevo independiente.

## 7. Decisión Senior

Q-Tr activo inicia como estado derivado y auditable, no como cálculo hidráulico/hidrológico activo.

El siguiente paso podrá publicar este estado al contexto o renderizar un bloque visual incompleto/controlado, sin tocar Q-5.

## 8. Estado Git al cierre

?? 01_APP/HIDROFLOW/src/services/qtr/
