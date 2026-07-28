# OT-CODEMAP-001 — Apertura: Indice Estructural CLI HF-CODEMAP v1.0.0

**Fecha**: 2026-07-27
**Estado**: Implementacion inicial creada y validada.

## Objetivo
Crear una herramienta CLI funcional (`HF-CODEMAP`) que indexa el codigo de HidroFlow y permite consultar productores, consumidores, flujos, guards, impacto, aliases, archivos y flujos documentales sin abrir archivos manualmente.

## Entregables

| Archivo | Estado | Descripcion |
|---|---|---|
| `07_TOOLBOX/codemap/hf-codemap.config.json` | Creado | Configuracion de scan, dominios, aliases, guards |
| `07_TOOLBOX/codemap/indexar-hidroflow.mjs` | Creado | Indexador puro ESM sin dependencias |
| `07_TOOLBOX/codemap/consultar-hidroflow.mjs` | Creado | CLI de consultas con 12 comandos |
| `07_TOOLBOX/codemap/out/files.json` | Generado | 259 archivos indexados |
| `07_TOOLBOX/codemap/out/symbols.json` | Generado | 5028 simbolos (variables, funciones, clases) |
| `07_TOOLBOX/codemap/out/references.json` | Generado | 40828 referencias cruzadas |
| `07_TOOLBOX/codemap/out/guards.json` | Generado | 48 guards detectados |
| `07_TOOLBOX/codemap/out/aliases.json` | Generado | 3 familias de aliases (Qp, Tp, volumen) |
| `07_TOOLBOX/codemap/out/flows.json` | Generado | 8 flujos por dominio |
| `07_TOOLBOX/codemap/out/impact.json` | Generado | 3693 entradas de impacto |
| `07_TOOLBOX/codemap/out/react_flows.json` | Generado | 281 hooks React detectados |
| `07_TOOLBOX/codemap/out/document_flows.json` | Generado | 1 flujo documental (Expediente) |
| `07_TOOLBOX/codemap/out/index.json` | Generado | Indice consolidado |
| `00_ADMIN/bitacora/OT-CODEMAP-001/OT-CODEMAP-001_apertura_indice_estructural_cli.md` | Este archivo | Bitacora |

## Dominios iniciales
Q5, QTr, CN, IDF, Tc, Racional, Expediente, Contexto

## Consultas soportadas
```
resumen                  — Totales y version
variable <nombre>        — Definicion y referencias de un simbolo
productor <nombre>       — Productores que contienen el termino
consumidor <nombre>      — Consumidores que referencian el simbolo
flujo <dominio>          — Productores, consumidores y guards por dominio
guard <texto>            — Guards que coinciden con el texto
impacto <nombre>         — Impacto de modificar un simbolo
alias <nombre>           — Familias de aliases (Qp, Tp, volumen)
archivo <texto>          — Archivos que coinciden con el texto
buscar <texto>           — Busqueda global (simbolos, refs, guards, flujos)
react-flow <texto>       — Hooks React (useState, useEffect, useMemo, useCallback)
document-flow <texto>    — Flujo documental del expediente
```

## Validacion de consultas

| Consulta | Resultado |
|---|---|
| `resumen` | 259 files, 5028 symbols, 40828 refs, 48 guards, 8 flows |
| `flujo Q5` | Productores y consumidores Q5 con guards |
| `variable hidrogramasQ5Exportables` | Definicion en HidroFlow.jsx:2342 con 5 referencias |
| `guard tieneQ5Publicado` | 4 guards Q5_table detectados |
| `impacto filtroNumericoQ5` | 3 refs directas, 5 guards impactados, flujos Q5+QTr |
| `alias Qp` | Canonico: Qp, Aliases: qp, Qpico, qPico, q_pico, caudalPico, caudal_pico |
| `document-flow expediente` | Payload fields, markdown fields, 45 guards |
| `react-flow onContextoComparador` | 0 (limitacion V1: props no capturados como hooks) |

## Limitaciones conocidas V1
- Props de componentes (`onContextoComparador`) no se capturan como hooks
- El parser es regex-based, no AST. Para V2 se recomienda usar Tree-sitter o Babel
- Las referencias usan coincidencia exacta de tokens (sin resolucion de scope)

## Regla operativa
**"Antes de tocar codigo critico, consultar HF-CODEMAP."**

Ejemplo de flujo real validado:
```
hidros → hidrogramasQ5Exportables → onContextoComparador
→ contextoComparador → contextoBase → obtenerMetodosQ5Validos
→ filasQ5Markdown → construirPayloadExpedienteDesdeEstado → expediente
```

## Confirmaciones
- No se toco la app funcional (HidroFlow.jsx, ComparadorMultiMetodo.jsx, layouts).
- No se hizo git add, commit ni push.
- No se instalaron dependencias externas.
- Node.js puro ESM, solo fs, path, crypto.
