\# OT-0108C — Brechas del expediente como producto exportable principal



\## Contexto



OT-0108 busca fortalecer el expediente hidrológico mínimo como producto exportable principal de HidroFlow.



Después de OT-0108B, se confirmó que el expediente ya existe como salida funcional robusta dentro de `ComparadorMultiMetodo.jsx`, pero todavía presenta brechas para consolidarse como producto exportable principal.



\## Objetivo



Identificar las brechas principales que separan el expediente actual de un producto exportable principal, trazable y defendible.



\## Matriz de brechas



| Brecha | Impacto | Prioridad | Ruta futura | Riesgo si se ignora |

|---|---|---:|---|---|

| Construcción textual acoplada a `ComparadorMultiMetodo.jsx` | Dificulta mantenimiento, prueba y reutilización del expediente | Alta | Extraer helper puro de construcción documental | El expediente seguirá creciendo dentro de UI y será más costoso de auditar |

| Falta de helper puro del expediente | Impide validar el expediente como producto independiente | Alta | Crear `construirExpedienteHidrologicoMinimo.js` | Dependencia excesiva del componente visual |

| Salida principal por portapapeles | Limita uso institucional y trazabilidad externa | Alta | Preparar exportación Markdown/archivo en fase posterior | El expediente sigue siendo una copia manual, no un producto exportable formal |

| Falta de versión explícita del producto | Dificulta control de cambios y soporte documental | Media | Agregar versión del expediente en sello técnico | No queda clara la evolución del formato |

| Falta de tabla de contenidos formal | Reduce legibilidad como documento largo | Media | Incorporar índice textual si se mantiene formato Markdown | El expediente puede volverse denso o difícil de revisar |

| Gráficas no integradas como anexos exportables | Pierde valor visual técnico en salida formal | Media | Diseñar anexos visuales en una OT posterior | Las gráficas quedan solo en UI y no acompañan el expediente |

| Matriz patrón no aparece como sección formal | Desaprovecha un producto maduro como referencia trazable | Media | Evaluar anexo de matriz patrón no adoptiva | La matriz queda aislada del expediente |

| Validadores internos no están resumidos como bloque de control independiente | La calidad del expediente queda poco visible para revisión externa | Media | Crear sección “Controles internos aplicados” | El usuario final no ve claramente qué controles pasaron |

| No existe formato institucional externo | Limita uso como soporte formal | Alta futura | Diseñar exportación Word/PDF/Markdown descargable | El producto no alcanza madurez institucional |

| No hay separación formal entre plantilla, datos y copiado | Dificulta escalar el expediente | Alta | Separar plantilla documental de mecanismo de salida | Mayor riesgo de regresiones al añadir secciones |



\## Brechas prioritarias



Las tres brechas más importantes son:



1\. Extraer la construcción del expediente a un helper puro.

2\. Separar plantilla, datos y mecanismo de copiado.

3\. Preparar una ruta futura de exportación a archivo.



\## Producto mínimo fortalecible



Antes de pensar en Word/PDF, el paso técnico más prudente es:



```text

helper puro del expediente

