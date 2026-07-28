# OT-CODEMAP-002 — Props, Callbacks y State-Flows React

**Fecha**: 2026-07-28
**Estado**: Implementacion v1.1.0 corregida y revalidada.

## Objetivo
Detectar props/callbacks React y flujos de estado que el parser v1.0.0 no capturaba, especialmente `onContextoComparador` y `contextoComparador`.

## Limitacion v1.0.0
- `variable onContextoComparador` respondia "no encontrada".
- Props de componentes no se indexaban.
- Callbacks `onX` no se clasificaban.
- Setters de `useState` no se relacionaban con callbacks.
- Solo se detectaban hooks React basicos (useState, useEffect, etc.).

## Entregables v1.1.0

| Archivo | Cambio |
|---|---|
| `indexar-hidroflow.mjs` | Nueva matriz `props_flows.json`. Deteccion de `function X({ prop })`, JSX `<Component prop={value} />`, `useState` state links, `useCallback` wrappers |
| `consultar-hidroflow.mjs` | Comandos nuevos: `prop`, `callback`, `state-flow`. Comando `variable` extendido para fallback a props. `react-flow` extendido con props relacionados |
| `props_flows.json` | 2087 registros de props recibidas/pasadas/callbacks/state-setters/edges |
| `react_flows.json` | Enriquecido con `propsReceived`, `propsPassed`, `callbacksReceived`, `callbacksPassed`, `stateLinks`, `componentEdges` |

## Correcciones aplicadas
- **Regex multi-linea**: `RE_COMPONENT_DEF` y `RE_ARROW_COMPONENT` ahora usan `gm` flags con `matchAll()` para capturar funciones con props en multiples lineas.
- **Exclusion de directorios**: cambiado de substring (`rel.includes(d)`) a segmento exacto (`rel.split("/").includes(d)`) para evitar que `"out"` excluyera `"layouts"` (que contiene "out" como substring).
- **Deteccion de destructured props**: `extractDestructuredProps` extrae nombres de `{ tab: tabExterno, setTab: setTabExterno, onContextoComparador }`.

## Criterio de exito

| Consulta | Resultado |
|---|---|
| `resumen` | 260 files, 5098 symbols, 40916 refs, 2087 propsFlows, 88 stateLinks |
| `variable onContextoComparador` | Detectado como callback_prop en HidroFlow y ModHidrogramas |
| `prop onContextoComparador` | 2 matches: parent->ModHidrogramas, parent->HidroFlow |
| `callback onContextoComparador` | Callback React recibido por ambos componentes |
| `state-flow contextoComparador` | Estado+setter en HidroFlow.jsx:3769 y HidroFlowLayout.jsx:9. `actualizarContextoComparador` envuelve `setContextoComparador` |
| `react-flow onContextoComparador` | Props/callbacks relacionados (2 registros) |
| `buscar actualizarContextoComparador` | Simbolo, 5 referencias, 1 props flow |

## Regla operativa
**"Antes de tocar flujo React, consultar prop/callback/state-flow en HF-CODEMAP."**

Ejemplo de flujo real validado:
```
HidroFlowLayout
  state: [contextoComparador, setContextoComparador] = useState(null)
  useCallback: actualizarContextoComparador = (nuevo) => setContextoComparador(merge)
  passes: onContextoComparador={actualizarContextoComparador} to HidroFlow

HidroFlow
  receives: onContextoComparador (prop/callback)
  passes: onContextoComparador={onContextoComparador} to ModHidrogramas

ComparadorMultiMetodo
  receives: contexto={contextoComparador}
  uses: contextoBase.hidrogramas.resultados -> obtenerMetodosQ5Validos -> expediente
```

## Confirmaciones
- No se toco la app funcional.
- No se hizo git add, commit ni push.
- No se instalaron dependencias.
- Node.js puro ESM.
