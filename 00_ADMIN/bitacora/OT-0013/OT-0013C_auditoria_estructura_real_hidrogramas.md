# OT-0013C — Auditoría estructura real de hidrogramas

## Objetivo

Auditar la estructura real de los campos de hidrograma producidos o consumidos por módulos vivos de HidroFlow, sin modificar código funcional.

## Archivos auditados

- 01_APP/HIDROFLOW/src/hooks/useHidrograma.ts
- 01_APP/HIDROFLOW/src/dominio/scsUh.ts
- 01_APP/HIDROFLOW/src/dominio/SAR.ts
- 01_APP/HIDROFLOW/src/components/HidrogramaResultado.tsx

## Hallazgos

En hidroEngine.js no se encontraron campos directos Qpico, tPico, volTotal, qSeries, dtMin, hidrograma, hidrogramas, Qp, Tp ni volumen.

En useHidrograma.ts se identificó estructura kpis con Qp_m3s, Tp_idx y Vol_m3, además de meta con Tp_min, Tb_min, qp_m3s_mm, S e Ia.

En scsUh.ts se documenta el Hidrograma Unitario SCS y la convolución Q(t). La función de KPIs retorna Qp_m3s, Tp_idx y Vol_m3.

En HidrogramaResultado.tsx se muestra Qp desde kpis.Qp_m3s y Tp como kpis.Tp_idx multiplicado por dt_min. También se muestra Tp_UH desde meta.Tp_min y qp_UH desde meta.qp_m3s_mm.

En SAR.ts existe una estructura separada con Qp, Q_regulado, Q_entrada y V_excedente, asociada a almacenamiento/regulación.

## Comparación con el adaptador del comparador

ComparadorMultiMetodo.jsx extrae actualmente Qp desde Qp, qp, q_pico, caudalPico y caudal_pico.

También extrae Tp desde Tp, tp, t_pico, tiempoPico y tiempo_pico.

Volumen se extrae desde volumen, V, vol y volume.

Sin embargo, el flujo vivo auditado en useHidrograma.ts y scsUh.ts usa nombres Qp_m3s, Tp_idx y Vol_m3, los cuales no están contemplados explícitamente en el adaptador actual del comparador.

## Riesgo técnico

Si contextoBase.hidrogramas recibe objetos derivados del flujo useHidrograma/scsUh, el comparador puede no leer correctamente Qp, Tp o Volumen aunque existan valores calculados.

Para Tp, el riesgo es mayor porque el valor visible en HidrogramaResultado.tsx se deriva como Tp_idx * dt_min. El comparador no contempla actualmente esa conversión.

## Dictamen

Antes de modificar el adaptador, debe auditarse cómo llega contextoBase.hidrogramas al ComparadorMultiMetodo.jsx y si recibe objetos con campos Qp_m3s, Tp_idx, Vol_m3, dt_min o si recibe otra estructura ya normalizada.

La siguiente fase debe trazar la conexión entre useHidrograma, HidrogramaResultado, el estado/contexto de HidroFlow y ComparadorMultiMetodo.jsx.

## Estado

Auditoría documental. Sin cambios funcionales.
