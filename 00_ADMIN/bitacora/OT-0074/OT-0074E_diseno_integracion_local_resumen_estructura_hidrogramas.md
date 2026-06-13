# OT-0074E — Diseño de integración local controlada del resumen estructural de hidrogramas

Fecha: 2026-06-12 21:18:01

## Estado base

- Rama: ot-0074-publicacion-real-qseries-metodo.
- OT-0074A cerrada en commit eb8f82b.
- OT-0074B cerrada en commit caa8bfd.
- OT-0074C cerrada en commit 4e7ac9a.
- OT-0074D cerrada en commit 28a1da6.
- Helper disponible: resumirEstructuraHidrogramas.js.
- Validación local OT-0074D aprobada.
- Alcance: diseño documental de integración local controlada.

## Objetivo

Diseñar una integración local controlada del helper resumirEstructuraHidrogramas sobre contextoBase?.hidrogramas para obtener un resumen estructural de hidrogramas en runtime, sin modificar el motor, sin recalcular hidrogramas y sin exponer series Q(t) crudas.

## Diseño de integración futura

- Importar resumirEstructuraHidrogramas.
- Ejecutarlo sobre contextoBase?.hidrogramas.
- Derivar un objeto interno resumenEstructuraHidrogramas.
- Mantener el resultado como diagnóstico interno.
- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No calcular métricas morfológicas.
- No reemplazar diagnosticoQSeries.
- No reemplazar obtenerResultadoQMetodo.
- No afectar Qp, Tp, Volumen ni Q(t).

## Información permitida

- tipoEntrada.
- contenedor.
- totalCandidatos.
- conSerieTemporal.
- sinSerieTemporal.
- conQpico.
- conTPico.
- conVolTotal.
- lista resumida de candidatos.
- claves de primer nivel.
- nombres de campos de serie detectados.
- longitud de series si existen.
- claves del primer punto.

## Información prohibida

- No mostrar qSeries cruda.
- No mostrar arrays completos.
- No imprimir series completas en consola.
- No persistir puntos tiempo-caudal.
- No calcular De.
- No calcular W50.
- No calcular W25.
- No calcular pendientes relativas.
- No calcular asimetría subida/recesión.
- No inferir forma Q(t) sin serie temporal publicada.

## Punto futuro de integración

El punto futuro más seguro es dentro de ComparadorMultiMetodo.jsx, cerca de diagnosticoQSeries, usando useMemo sobre contextoBase?.hidrogramas.

## Siguiente fase recomendada

OT-0074F — Integración interna silenciosa del resumen estructural de hidrogramas.

## Criterio de salida

OT-0074E queda completa cuando exista diseño versionado de integración local controlada del resumen estructural de hidrogramas, sin cambios funcionales sobre la aplicación.
