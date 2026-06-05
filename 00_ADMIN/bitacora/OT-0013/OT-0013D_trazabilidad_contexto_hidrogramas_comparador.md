# OT-0013D — Trazabilidad contextoBase.hidrogramas hacia ComparadorMultiMetodo

## Objetivo

Auditar cómo llega contextoBase.hidrogramas al Comparador Hidrológico Multi-Método y verificar si la estructura entregada está alineada con el adaptador de lectura de Qp, Tp y Volumen.

## Cadena trazada

La cadena real auditada es:

HidroFlow.jsx -> onContextoComparador(...) -> contextoComparador -> HidroFlowLayout.jsx -> ComparadorMultiMetodo contexto={contextoComparador} -> contextoBase?.hidrogramas.

## Evidencia en HidroFlowLayout.jsx

HidroFlowLayout.jsx mantiene contextoComparador mediante useState(null) y entrega ese contexto al comparador mediante ComparadorMultiMetodo contexto={contextoComparador}.

HidroFlow recibe onContextoComparador={setContextoComparador}, por lo que HidroFlow.jsx es la fuente real del contexto que consume el comparador.

## Evidencia en HidroFlow.jsx

Se identificaron dos momentos relevantes:

1. Una inicialización de contexto donde se envían datos base, tc_metodos: calcTc(params), lluvia_efectiva: false, hidrogramas: [] e hidrograma_principal: null.

2. Una actualización posterior desde ModHidrogramas, donde se construye hidrogramasResumen y se envía mediante onContextoComparador((previo) => ({ ...previo, fuente: motor HidroFlow, lluvia_efectiva, hidrogramas: hidrogramasResumen, hidrograma_principal })).

## Normalización observada

ModHidrogramas calcula o extrae los campos de cada hidrograma y retorna objetos normalizados con:

- metodo
- Qp
- Tp
- volumen
- puntos

Para Qp se intenta leer valor directo desde Qpico, Qp, qp, q_pico, caudalPico o caudal_pico. Si no existe, se calcula desde la serie.

Para Tp se intenta leer valor directo desde tPico, Tp, tp, t_pico, tiempoPico o tiempo_pico. Si no existe, se calcula desde la serie.

Para volumen se intenta leer valor directo desde volTotal, volumen, V, vol o volume. Si no existe, se calcula integrando la serie.

## Relación con OT-0013B y OT-0013C

OT-0013B identificó que el comparador extrae Qp, Tp y volumen.

OT-0013C identificó que módulos como useHidrograma.ts y scsUh.ts usan campos internos como Qp_m3s, Tp_idx y Vol_m3.

OT-0013D aclara que HidroFlow.jsx actúa como capa de normalización antes de entregar hidrogramas al comparador.

## Dictamen

El adaptador actual de ComparadorMultiMetodo.jsx está alineado con la estructura normalizada que recibe desde HidroFlow.jsx: Qp, Tp y volumen.

No se recomienda modificar todavía el adaptador del comparador para leer Qp_m3s, Tp_idx o Vol_m3, porque esos campos no llegan necesariamente de forma directa al comparador en el flujo vivo auditado.

La siguiente fase debe auditar la coherencia física de los valores ya normalizados: relación Tc vs Tp, unidades de Qp, integración de volumen y consistencia con la serie Q(t).

## Estado

Auditoría documental. Sin cambios funcionales.
