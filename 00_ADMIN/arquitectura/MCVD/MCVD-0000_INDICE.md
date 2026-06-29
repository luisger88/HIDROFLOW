# MCVD-0000 — Índice Maestro de Gestión de Identidad de Datos

Fecha de actualización:
2026-06-29 10:54:25

## Juramento de Auditoría

Si no existe MCVD de la entidad:

NO SE MODIFICA.  
PRIMERO SE AUDITA.  
LUEGO SE CAMBIA.

---

## Estado General GID

La Gestión de Identidad de Datos — GID — establece que toda entidad crítica de HidroFlow debe poseer un Mapa de Ciclo de Vida de Datos — MCVD — antes de ser modificada.

El código implementa la entidad.  
El MCVD gobierna la entidad.

---

## Inventario MCVD

| Código | Entidad | Criticidad | Estado |
|---|---|---:|---|
| MCVD-0001 | qSeries | Alta | Auditada Parcial |
| MCVD-0002 | q_tr_activo_estado | Crítica | Auditada y Congelada |
| MCVD-0003 | tc_final / Tc_final | Crítica | Auditada y Congelada |
| MCVD-0004 | CN_efectivo | Crítica | Pendiente |
| MCVD-0005 | lluvia_efectiva_total_mm | Crítica | Pendiente |
| MCVD-0006 | hidrograma_principal | Alta | Pendiente |
| MCVD-0007 | q_tr_multiescenario | Crítica | Pendiente |
| MCVD-0008 | expediente | Crítica | Pendiente |

---

## Métricas GID

MCVD Auditados y Congelados:
2

MCVD Auditados Parcialmente:
1

MCVD En Apertura:
0

MCVD En Auditoría Avanzada:
0

MCVD Pendientes:
5

Total MCVD:
8

---

## Entidad Patrón

MCVD-0002 — q_tr_activo_estado — queda adoptado como entidad patrón para futuras auditorías GID.

---

## Regla Operativa

Antes de cualquier OT que modifique datos críticos:

1. Identificar entidad.
2. Verificar existencia de MCVD.
3. Auditar productor.
4. Auditar contrato.
5. Auditar consumidores.
6. Auditar visualizadores.
7. Auditar exportadores.
8. Evaluar impacto.
9. Autorizar cambio.

Sin MCVD:

CAMBIO NO AUTORIZADO.




