\# OT-0123B — Mapa de trazabilidad del expediente



\## Objetivo



Identificar el origen exacto de cada dato requerido por el contrato documental maestro.



No se modifica código.



No se crean helpers.



No se crean exportadores.



Solo se documenta trazabilidad.



\---



\## Ruta madre



```text

CUENCA

↓

IDF

↓

LLUVIA

↓

CN

↓

Tc

↓

HIDROGRAMAS

↓

Q-Tr

↓

EXPEDIENTE

```



\---



\## Estado inicial



| Bloque | Existe | Origen identificado | Publicado en expediente |

|----------|----------|----------|----------|

| Cuenca | Sí | cuencasCatalogo.js | EXPEDIENTE.cuenca |

| IDF | Sí | calcIDFPond / IDF EPM | EXPEDIENTE.lluvia |

| Lluvia | Sí | Hietograma / lluvia diseño | EXPEDIENTE.lluvia |

| CN | Sí | SCS-CN | EXPEDIENTE.abstraccion |

| Tc | Sí | tcSelector / tcAgent | EXPEDIENTE.tiempoConcentracion |

| Hidrogramas | Sí | Hidrogramas Q(t) | EXPEDIENTE.hidrogramas |

| Q-Tr | Sí | Comparador hidrológico | EXPEDIENTE.caudalesTr |



\---



\## Regla



Cada fila deberá responder:



```text

Qué dato existe.



Dónde nace.



Cómo se llama.



Quién lo consume.



En qué sección del expediente termina.

```


