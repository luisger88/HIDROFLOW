\# OT-0120B — Matriz contractual del bloque Identificación delegado



\## Contexto



OT-0120 define el contrato del bloque `## 1. Identificación` antes de implementar una delegación parcial al helper.



Este bloque fue seleccionado en OT-0119 como el siguiente candidato documental no crítico.



\## Objetivo



Formalizar una matriz contractual de campos, líneas, fallbacks y riesgos del bloque Identificación.



\## Matriz contractual



| Línea documental | Campo fuente permitido | Fallback | Riesgo | Observación |

|---|---|---|---:|---|

| `## 1. Identificación` | constante documental | obligatorio | Bajo | Encabezado contractual del bloque |

| `Cuenca:` | `contextoBase.cuencaNombre` | `Cuenca activa` | Bajo | No debe inferir otro nombre |

| `Área:` | `contextoBase.area\_km2` | `—` | Bajo | Solo formatear si es numérico finito |

| `Fuente de contexto:` | `contextoBase.fuente` | `HidroFlow` | Bajo | Descriptivo |

| `Estación IDF:` | `estacion\_idf`, `estacionIDF`, `estacion`, `nombre\_estacion`, `idf.nombre`, `idf.estacion` | `SAN CRISTOBAL` | Bajo-medio | Debe tomar primer valor disponible seguro |

| `Pendiente media:` | `contextoBase.pendiente\_media\_pct` | `—` | Bajo-medio | Solo formatear si es numérico finito |

| `Longitud cauce principal:` | `contextoBase.longitud\_cauce\_km` | `—` | Bajo-medio | Solo formatear si es numérico finito |



\## Reglas de formato



\- El área debe expresarse en km².

\- La pendiente debe expresarse en %.

\- La longitud debe expresarse en km.

\- Los valores numéricos solo deben formatearse si son finitos.

\- Si no hay dato seguro, usar fallback.

\- No se deben emitir tokens inválidos.



\## Tokens prohibidos



El bloque no puede emitir:



```text

undefined

null

NaN

\[object Object]

