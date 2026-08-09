# OT-CODEMAP-003 — Grafo React Semantico (semantic-flow)

**Fecha**: 2026-07-28
**Estado**: Implementacion v1.2.0 creada y validada.

## Objetivo
Reconstruir rutas semanticas completas productor->callback->wrapper->setter->state->prop->consumidor->guard->salida documental usando los datos ya indexados.

## Limitacion detectada en CODEMAP-002
- `react-flow` mostraba props/callbacks sueltos sin orden ni relacion causa-efecto.
- No existia una ruta de extremo a extremo para `onContextoComparador` o `contextoComparador`.

## Entregables v1.2.0

| Archivo | Cambio |
|---|---|
| `hf-codemap.config.json` | Version 1.2.0 |
| `indexar-hidroflow.mjs` | Funcion `buildSemanticFlows(docFlows, refs)` que construye rutas ordenadas |
| `consultar-hidroflow.mjs` | Comando nuevo `semantic-flow <nombre>` |
| `out/semantic_flows.json` | 96 rutas semanticas con pasos, guards, documentOutputs |
| `out/index.json` | Campo `semanticFlows: 96` |
| `00_ADMIN/bitacora/OT-CODEMAP-003/OT-CODEMAP-003_apertura_grafo_react_semantico.md` | Esta bitacora |

## Criterio de exito

| Consulta | Resultado |
|---|---|
| `resumen` | Version 1.2.0, semanticFlows: 96 |
| `semantic-flow onContextoComparador` | Ruta con: prop_pass, wrapper(actualizarContextoComparador), state_setter(setContextoComparador), state(contextoComparador), callback_receive, 4 guards |
| `semantic-flow contextoComparador` | Ruta con: prop_pass a ComparadorMultiMetodo e IndiceHidrologico |
| `semantic-flow Q5` | Domain flow con productores, consumidores, guards Q5 |
| `semantic-flow expediente` | Flow documental con guards expediente |

## Detalles del flujo onContextoComparador

Los pasos reconstruidos muestran claramente **el bug de cableado**:

1. **HidroFlowLayout** define `actualizarContextoComparador` (useCallback wrapping `setContextoComparador`)
2. **HidroFlowLayout** pasa `onContextoComparador={actualizarContextoComparador}` a **HidroFlow** (linea 88)
3. **HidroFlow** recibe `onContextoComparador` como prop (linea 3742)
4. PERO **HidroFlow** tambien pasa `onContextoComparador={setContextoComparador}` (el setter local, NO el wrapper) a **ModHidrogramas** (linea 4320) — **BUG DOCUMENTADO**
5. **ComparadorMultiMetodo** recibe `contexto={contextoComparador}` (linea 81)
6. Guards: `tieneQ5Publicado` (linea 2101), `tieneHidrogramasPublicados` (linea 2097)

## Regla operativa
**"Antes de corregir flujos React criticos, consultar semantic-flow en HF-CODEMAP."**

## Confirmaciones
- No se toco la app funcional.
- No se hizo git add, commit ni push.
- No se instalaron dependencias.
