# OT-CODEMAP-004 — Depuracion de Alcance y Ranking Semantico

**Fecha**: 2026-07-28
**Estado**: Implementacion v1.3.0 creada y validada.

## Objetivo
Filtrar ruido (backups, copias, validaciones historicas) y priorizar archivos runtime activos en los resultados de semantic-flow.

## Limitacion detectada en CODEMAP-003
- `semantic-flow Q5` mostraba resultados de archivos BACKUP, copias y validaciones historicas.
- Sin ranking de relevancia.
- Sin filtro de archivos activos.

## Criterios de clasificacion

| Clase | Regla | Rank |
|---|---|---|
| `runtime_active` | `01_APP/HIDROFLOW/src/HidroFlow.jsx`, layouts, components | +100 |
| `runtime_support` | services, agents, data, scripts | +70 |
| `tool_active` | codemap CLI | +40 |
| `documentation` | docs | +20 |
| `historical` | bitacora, validaciones | -50 |
| `backup` | BACKUP, copia, .bak, .old, LEGACY | -100 |
| `generated` | codemap/out | -200 |

## Criterios de exclusion (excludePathPatterns)
- `BACKUP`, `backup`, `Backup`, `copia`, `Copia`
- `.bak`, `.old`, `OLD`, `LEGACY`
- `.pre`, `pre005`
- `00_ADMIN/HF-ARQ`, `00_ADMIN/HF-PROD`, `00_ADMIN/bitacora`
- `07_TOOLBOX/validaciones`, `07_TOOLBOX/codemap/out`

## Conteos
- 260 files total
- 145 activos (6 runtime_active + 132 runtime_support + 7 tool_active)
- 114 backup
- 1 historical

## Comandos nuevos
- `semantic-flow <n> --active` — filtra steps con semanticScore >= 40
- `ruido <n>` — muestra elementos degradados/excluidos

## Regla operativa
**"Antes de intervenir un flujo, consultar semantic-flow --active."**
