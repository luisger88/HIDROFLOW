# OT-0359 — Nueva OT desde main limpio

## Estado

EN APERTURA

## Fecha

2026-06-29 12:26:42

## Contexto base

La nueva OT se abre desde main limpio, después del cierre e integración de:

- PR #387 — GID / MCVD-0002 y MCVD-0003
- PR #388 — OT-0358 / Validación integral del expediente exportable

## Estado de partida

- main local/remoto estabilizado.
- Build post-merge aprobado.
- Working tree limpio.
- GID operativo con MCVD-0002 y MCVD-0003 auditadas y congeladas.

## Objetivo

POR DEFINIR.

## Alcance inicial

POR DEFINIR.

## Fuera de alcance

- No modificar motor hidrológico sin auditoría previa.
- No modificar entidades críticas sin revisar MCVD.
- No tocar entidades GID congeladas sin auditoría de impacto.

## Relación GID

Entidades ya congeladas:

- MCVD-0002 — q_tr_activo_estado
- MCVD-0003 — tc_final / Tc_final

Regla vigente:

NO SE MODIFICA.
PRIMERO SE AUDITA.
LUEGO SE CAMBIA.

## Criterio de cierre

POR DEFINIR.

## Validación mínima esperada

- 
pm run build aprobado.
- git status --short limpio.
- PR fusionado a main.
- Sincronizar-MainPostMerge ejecutado después del merge.

