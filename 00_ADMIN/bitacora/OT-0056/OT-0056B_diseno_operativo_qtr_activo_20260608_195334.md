# OT-0056C2 — Publica estado Q-Tr activo

Fecha: 06/08/2026 21:06:36
Rama: ot-0056c2-publica-estado-qtr-activo

## 1. Propósito

Publicar en contextoComparador el estado derivado q_tr_activo_estado usando el adaptador puro derivarEstadoQTrActivo.

Esta OT no calcula Qp, Tp ni Volumen.

## 2. Cambios aplicados

- Se importa derivarEstadoQTrActivo en HidroFlow.jsx.
- Se publica q_tr_activo_estado dentro del contexto base.
- El estado publicado incluye disponible, campos_faltantes y q_tr_activo base.

## 3. Ubicación de integración

El estado q_tr_activo_estado se publica después de lluvia_efectiva_total_mm y antes del bloque hidrogramas.

Esto mantiene Q-Tr activo separado del Bloque Q-5.

## 4. Restricciones preservadas

No se modifica:

- Q-5
- hidroEngine
- tcSelector
- fórmulas de caudal
- fórmulas de hidrogramas
- UI del Comparador
- Índice Hidrológico

## 5. Validación

Build aprobado con Vite.

Código de salida build: 0.

## 6. Decisión Senior

Q-Tr activo queda publicado como estado derivado y auditable, todavía sin cálculo ni visualización dedicada.

El siguiente paso podrá renderizar un bloque visual Q-Tr activo incompleto/controlado, sin tocar Q-5.

## 7. Estado Git al cierre

 M 01_APP/HIDROFLOW/src/HidroFlow.jsx
