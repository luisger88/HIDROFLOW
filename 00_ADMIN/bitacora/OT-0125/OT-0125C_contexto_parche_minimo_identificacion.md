# OT-0125C — Contexto de parche mínimo para Identificación delegada

## Objetivo

Extraer contexto real de `ComparadorMultiMetodo.jsx` antes de integrar diagnósticamente `construirLineasIdentificacionExpediente(...)`.

Esta auditoría no modifica el componente.

## Primeras 80 líneas del componente

```jsx
      1 | import React, { useEffect, useMemo, useState } from "react";
      2 | 
      3 | import { setTcState } from "../agents/tcAgent";
      4 | import { calcTc, mapTcResultados } from "../services/hidroEngine";
      5 | import { seleccionarTc } from "../services/tcSelector";
      6 | import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
      7 | import adaptarExpedienteDocumental from "../services/documentos/adaptarExpedienteDocumental";
      8 | import construirExpedienteHidrologicoMinimo, {
      9 |   construirLineasSelloTecnicoAuxiliarExpediente
     10 | } from "../services/documentos/construirExpedienteHidrologicoMinimo";
     11 | import adaptarQSeriesHidrogramas from "../services/hidrogramas/adaptarQSeriesHidrogramas";
     12 | import resumirEstructuraHidrogramas from "../services/hidrogramas/resumirEstructuraHidrogramas";
     13 | import calcularMetricasMorfologiaQt from "../services/hidrogramas/calcularMetricasMorfologiaQt";
     14 | import clasificarFormaQt from "../services/hidrogramas/clasificarFormaQt";
     15 | import evaluarRiesgoTemporalQt from "../services/hidrogramas/evaluarRiesgoTemporalQt";
     16 | import sintetizarRiesgoTemporalQt from "../services/hidrogramas/sintetizarRiesgoTemporalQt";
     17 | import construirSeccionDiagnosticoTemporalQt from "../services/hidrogramas/construirSeccionDiagnosticoTemporalQt";
     18 | import validarSeccionDiagnosticoTemporalQt from "../services/hidrogramas/validarSeccionDiagnosticoTemporalQt";
     19 | import prepararGraficaQpTPicoMatrizPatron from "../services/hidrogramas/prepararGraficaQpTPicoMatrizPatron";
     20 | import prepararGraficaVelocidadEfectivaMatrizPatron from "../services/hidrogramas/prepararGraficaVelocidadEfectivaMatrizPatron";
     21 | import sintetizarLecturaComparativaMatrizPatron from "../services/hidrogramas/sintetizarLecturaComparativaMatrizPatron";
     22 | 
     23 | import {
     24 |   resumenComparadorCatalogo,
     25 | } from "../data/metodosComparadorCatalogo";
     26 | 
     27 | import {
     28 |   evaluarCompetenciaComparador,
     29 | } from "../data/matrizCompetenciaComparador";
     30 | 
     31 | import { conceptuarCuenca } from "../data/clasificacionCuenca";
     32 | import matrizPatronLaIguanaPC80 from "../data/matrizPatronLaIguanaPC80";
     33 | 
     34 | import {
     35 |   obtenerAuditoriaPendienteTc,
     36 |   obtenerCriterioPendientesAuditoria,
     37 | } from "../data/auditoriaPendientesTc";
     38 | 
     39 | export default function ComparadorMultiMetodo({ contexto = null }) {
     40 |   let bloqueoAdopcion = false;
     41 |   // ✅ OT-0067E — utilidades de bloqueo (GLOBAL COMPONENTE)
     42 | 
     43 | 
     44 | 
     45 |   const [filtroEstado, setFiltroEstado] = useState("todos");
     46 |   const [filtroTipo, setFiltroTipo] = useState("todos");
     47 | 
     48 |   // ✅ CONTEXTO BASE
     49 | const contextoBase = contexto || {
     50 |   cuencaNombre: "Quebrada La Iguaná - PC_80",
     51 |   area_km2: 46.8516,
     52 |   pendiente_media_pct: 8.43,
     53 |   CN: 88,
     54 |   lluvia_efectiva: true
     55 | };
     56 | 
     57 | const fuenteContexto = contexto ? "motor HidroFlow" : "contexto base";
     58 | 
     59 | // ✅ DEFINICIÓN REAL DE p
     60 | const p = {
     61 |   longitud_cauce: 15.524,
     62 |   area: contextoBase.area_km2,
     63 |   pendiente_cuenca: contextoBase.pendiente_media_pct,
     64 |   cota_mayor_cauce: 2819.27,
     65 |   cota_menor_cauce: 1511.36,
     66 |   cota_max: 2819.27,
     67 |   cota_min: 1511.36,
     68 |   CN: contextoBase.CN
     69 | };
     70 | 
     71 | // ✅ EJECUTAR MOTOR
     72 | const tcArray = calcTc(p);
     73 | 
     74 | // ✅ MAPEAR RESULTADOS
     75 | const metodosTc = mapTcResultados(tcArray);
     76 | 
     77 | // ✅ CONTEXTO HIDROLÓGICO
     78 | const contextoTc = {
     79 |   pendiente: contextoBase.pendiente_media_pct,
     80 |   area: contextoBase.area_km2,
```

## Ventanas alrededor de textoExpediente

### Ventana 1

- Patrón: `textoExpediente`
- Línea central: 2014
- Rango: 2004-2024

```jsx
    2004 | 
    2005 |           // OT-0087C — Sección exportable de diagnóstico temporal Q(t) no adoptivo.
    2006 |           const seccionDiagnosticoTemporalQt = construirSeccionDiagnosticoTemporalQt({
    2007 |             filasMorfologiaQt,
    2008 |             filasDictamenFormaQt,
    2009 |             filasRiesgoTemporalQt,
    2010 |             sintesisRiesgoTemporalQt
    2011 |           });
    2012 | 
    2013 |           // OT-0113B — Diagnóstico no invasivo del helper puro del expediente.
>>  2014 |           // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
    2015 |           let diagnosticoHelperExpediente = null;
    2016 | 
    2017 |           try {
    2018 |             diagnosticoHelperExpediente = construirExpedienteHidrologicoMinimo({
    2019 |               contextoBase,
    2020 |               Tc_final,
    2021 |               metodos,
    2022 |               filasMorfologiaQt,
    2023 |               filasDictamenFormaQt,
    2024 |               filasRiesgoTemporalQt,
```

### Ventana 2

- Patrón: `textoExpediente`
- Línea central: 2042
- Rango: 2032-2052

```jsx
    2032 |                 "Diagnóstico helper expediente no invasivo:",
    2033 |                 diagnosticoHelperExpediente
    2034 |               );
    2035 |             }
    2036 |           } catch (errorDiagnosticoHelperExpediente) {
    2037 |             console.warn(
    2038 |               "Diagnóstico helper expediente no invasivo no ejecutado:",
    2039 |               errorDiagnosticoHelperExpediente
    2040 |             );
    2041 |           }
>>  2042 |           const textoExpediente = [
    2043 |             "# Expediente hidrológico mínimo — Cuenca activa",
    2044 |             "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
    2045 |             "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
    2046 |             "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
    2047 |             "",
    2048 |             "## 1. Identificación",
    2049 |             `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
    2050 |             `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
    2051 |             `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
    2052 |             `Estación IDF: ${estacionIdfExpediente}`,
```

### Ventana 3

- Patrón: `textoExpediente`
- Línea central: 2193
- Rango: 2183-2203

```jsx
    2183 |             "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional.",
    2184 |             "",
    2185 |             "## 12. Restricciones y advertencias técnicas",
    2186 |             "- No se usaron caudales externos como fundamento.",
    2187 |             "- No se usó SIATA para justificar caudales.",
    2188 |             "- No se modifica el motor hidrológico.",
    2189 |             "- No se recalculan hidrogramas en este expediente.",
    2190 |             "- No se alteran Qp, Tp, Volumen ni Q(t).",
    2191 |             "",
    2192 |           ].join("\n");
>>  2193 |           // OT-0114B — Comparación runtime no invasiva helper vs textoExpediente.
    2194 |           // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
    2195 |           try {
    2196 |             const textoHelperExpediente = diagnosticoHelperExpediente?.texto ?? "";
    2197 | 
    2198 |             const marcadoresRuntimeExpediente = [
    2199 |               "# Expediente hidrológico mínimo — Cuenca activa",
    2200 |               "## 5. Escenario Q-Tr activo — control de trazabilidad",
    2201 |               "## 6. Resumen Q-5 auditado",
    2202 |               "## 7. Método Racional — contraste global independiente",
    2203 |               "## 8. Contraste Q-5 vs Método Racional",
```

### Ventana 4

- Patrón: `textoExpediente`
- Línea central: 2194
- Rango: 2184-2204

```jsx
    2184 |             "",
    2185 |             "## 12. Restricciones y advertencias técnicas",
    2186 |             "- No se usaron caudales externos como fundamento.",
    2187 |             "- No se usó SIATA para justificar caudales.",
    2188 |             "- No se modifica el motor hidrológico.",
    2189 |             "- No se recalculan hidrogramas en este expediente.",
    2190 |             "- No se alteran Qp, Tp, Volumen ni Q(t).",
    2191 |             "",
    2192 |           ].join("\n");
    2193 |           // OT-0114B — Comparación runtime no invasiva helper vs textoExpediente.
>>  2194 |           // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
    2195 |           try {
    2196 |             const textoHelperExpediente = diagnosticoHelperExpediente?.texto ?? "";
    2197 | 
    2198 |             const marcadoresRuntimeExpediente = [
    2199 |               "# Expediente hidrológico mínimo — Cuenca activa",
    2200 |               "## 5. Escenario Q-Tr activo — control de trazabilidad",
    2201 |               "## 6. Resumen Q-5 auditado",
    2202 |               "## 7. Método Racional — contraste global independiente",
    2203 |               "## 8. Contraste Q-5 vs Método Racional",
    2204 |               "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
```

### Ventana 5

- Patrón: `textoExpediente`
- Línea central: 2223
- Rango: 2213-2233

```jsx
    2213 |               "null",
    2214 |               "NaN",
    2215 |               "[object Object]"
    2216 |             ];
    2217 | 
    2218 |             const marcadoresFaltantesEnHelper = marcadoresRuntimeExpediente.filter(
    2219 |               (marcador) => !textoHelperExpediente.includes(marcador)
    2220 |             );
    2221 | 
    2222 |             const marcadoresFaltantesEnOperativo = marcadoresRuntimeExpediente.filter(
>>  2223 |               (marcador) => !textoExpediente.includes(marcador)
    2224 |             );
    2225 | 
    2226 |             const tokensHelper = tokensInvalidosRuntimeExpediente.filter((token) =>
    2227 |               textoHelperExpediente.includes(token)
    2228 |             );
    2229 | 
    2230 |             const tokensOperativo = tokensInvalidosRuntimeExpediente.filter((token) =>
    2231 |               textoExpediente.includes(token)
    2232 |             );
    2233 | 
```

### Ventana 6

- Patrón: `textoExpediente`
- Línea central: 2231
- Rango: 2221-2241

```jsx
    2221 | 
    2222 |             const marcadoresFaltantesEnOperativo = marcadoresRuntimeExpediente.filter(
    2223 |               (marcador) => !textoExpediente.includes(marcador)
    2224 |             );
    2225 | 
    2226 |             const tokensHelper = tokensInvalidosRuntimeExpediente.filter((token) =>
    2227 |               textoHelperExpediente.includes(token)
    2228 |             );
    2229 | 
    2230 |             const tokensOperativo = tokensInvalidosRuntimeExpediente.filter((token) =>
>>  2231 |               textoExpediente.includes(token)
    2232 |             );
    2233 | 
    2234 |             const brechasRuntimeExpediente = [
    2235 |               ...marcadoresFaltantesEnHelper.map(
    2236 |                 (marcador) => `Helper sin marcador: ${marcador}`
    2237 |               ),
    2238 |               ...marcadoresFaltantesEnOperativo.map(
    2239 |                 (marcador) => `Operativo sin marcador: ${marcador}`
    2240 |               ),
    2241 |               ...tokensHelper.map((token) => `Helper con token inválido: ${token}`),
```

### Ventana 7

- Patrón: `textoExpediente`
- Línea central: 2249
- Rango: 2239-2259

```jsx
    2239 |                 (marcador) => `Operativo sin marcador: ${marcador}`
    2240 |               ),
    2241 |               ...tokensHelper.map((token) => `Helper con token inválido: ${token}`),
    2242 |               ...tokensOperativo.map((token) => `Operativo con token inválido: ${token}`)
    2243 |             ];
    2244 | 
    2245 |             if (brechasRuntimeExpediente.length > 0) {
    2246 |               console.warn("Comparación runtime helper vs expediente operativo:", {
    2247 |                 brechas: brechasRuntimeExpediente,
    2248 |                 longitudHelper: textoHelperExpediente.length,
>>  2249 |                 longitudOperativo: textoExpediente.length
    2250 |               });
    2251 |             }
    2252 |           } catch (errorComparacionRuntimeExpediente) {
    2253 |             console.warn(
    2254 |               "Comparación runtime helper vs expediente operativo no ejecutada:",
    2255 |               errorComparacionRuntimeExpediente
    2256 |             );
    2257 |           }
    2258 |           try {
    2259 |             const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
```

### Ventana 8

- Patrón: `textoExpediente`
- Línea central: 2259
- Rango: 2249-2269

```jsx
    2249 |                 longitudOperativo: textoExpediente.length
    2250 |               });
    2251 |             }
    2252 |           } catch (errorComparacionRuntimeExpediente) {
    2253 |             console.warn(
    2254 |               "Comparación runtime helper vs expediente operativo no ejecutada:",
    2255 |               errorComparacionRuntimeExpediente
    2256 |             );
    2257 |           }
    2258 |           try {
>>  2259 |             const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
    2260 |               fuenteExpediente: "ComparadorMultiMetodo.textoExpediente",
    2261 |               origenPlantilla: "OT-0064",
    2262 |               cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
    2263 |             });
    2264 | 
    2265 |             if (!diagnosticoDocumentalExpediente.ok) {
    2266 |               console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
    2267 |             }
    2268 |           } catch (errorDiagnosticoDocumental) {
    2269 |             console.warn("Diagnóstico documental no invasivo no ejecutado:", errorDiagnosticoDocumental);
```

### Ventana 9

- Patrón: `textoExpediente`
- Línea central: 2260
- Rango: 2250-2270

```jsx
    2250 |               });
    2251 |             }
    2252 |           } catch (errorComparacionRuntimeExpediente) {
    2253 |             console.warn(
    2254 |               "Comparación runtime helper vs expediente operativo no ejecutada:",
    2255 |               errorComparacionRuntimeExpediente
    2256 |             );
    2257 |           }
    2258 |           try {
    2259 |             const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
>>  2260 |               fuenteExpediente: "ComparadorMultiMetodo.textoExpediente",
    2261 |               origenPlantilla: "OT-0064",
    2262 |               cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
    2263 |             });
    2264 | 
    2265 |             if (!diagnosticoDocumentalExpediente.ok) {
    2266 |               console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
    2267 |             }
    2268 |           } catch (errorDiagnosticoDocumental) {
    2269 |             console.warn("Diagnóstico documental no invasivo no ejecutado:", errorDiagnosticoDocumental);
    2270 |           }
```

### Ventana 10

- Patrón: `textoExpediente`
- Línea central: 2275
- Rango: 2265-2285

```jsx
    2265 |             if (!diagnosticoDocumentalExpediente.ok) {
    2266 |               console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
    2267 |             }
    2268 |           } catch (errorDiagnosticoDocumental) {
    2269 |             console.warn("Diagnóstico documental no invasivo no ejecutado:", errorDiagnosticoDocumental);
    2270 |           }
    2271 | 
    2272 |               // OT-0056E valida expediente copiado antes de enviarlo al portapapeles.
    2273 |               const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
    2274 |               const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
>>  2275 |                 textoExpediente.includes(token)
    2276 |               );
    2277 | 
    2278 |               const seccionesObligatoriasExpediente = [
    2279 |                 "# Expediente hidrológico mínimo — Cuenca activa",
    2280 |                 "## 5. Escenario Q-Tr activo — control de trazabilidad",
    2281 |                 "## 6. Resumen Q-5 auditado",
    2282 |                 "## 7. Método Racional — contraste global independiente",
    2283 |                 "## 8. Contraste Q-5 vs Método Racional",
    2284 |                 "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
    2285 |                 "## Diagnóstico temporal Q(t) no adoptivo",
```

### Ventana 11

- Patrón: `textoExpediente`
- Línea central: 2291
- Rango: 2281-2301

```jsx
    2281 |                 "## 6. Resumen Q-5 auditado",
    2282 |                 "## 7. Método Racional — contraste global independiente",
    2283 |                 "## 8. Contraste Q-5 vs Método Racional",
    2284 |                 "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
    2285 |                 "## Diagnóstico temporal Q(t) no adoptivo",
    2286 |                 "## 10. Validación interna del expediente exportado",
    2287 |                 "## 11. Sello técnico de generación",
    2288 |                 "## 12. Restricciones y advertencias técnicas"
    2289 |               ];
    2290 |               const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
>>  2291 |                 !textoExpediente.includes(seccion)
    2292 |               );
    2293 | 
    2294 |               // OT-0088C — Validación textual estricta de diagnóstico temporal Q(t).
    2295 |               const validacionDiagnosticoTemporalQt =
    2296 |                 validarSeccionDiagnosticoTemporalQt(textoExpediente);
    2297 | 
    2298 |               if (
    2299 |                 tokensDetectadosExpediente.length > 0 ||
    2300 |                 seccionesFaltantesExpediente.length > 0 ||
    2301 |                 !validacionDiagnosticoTemporalQt.ok
```

### Ventana 12

- Patrón: `textoExpediente`
- Línea central: 2296
- Rango: 2286-2306

```jsx
    2286 |                 "## 10. Validación interna del expediente exportado",
    2287 |                 "## 11. Sello técnico de generación",
    2288 |                 "## 12. Restricciones y advertencias técnicas"
    2289 |               ];
    2290 |               const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
    2291 |                 !textoExpediente.includes(seccion)
    2292 |               );
    2293 | 
    2294 |               // OT-0088C — Validación textual estricta de diagnóstico temporal Q(t).
    2295 |               const validacionDiagnosticoTemporalQt =
>>  2296 |                 validarSeccionDiagnosticoTemporalQt(textoExpediente);
    2297 | 
    2298 |               if (
    2299 |                 tokensDetectadosExpediente.length > 0 ||
    2300 |                 seccionesFaltantesExpediente.length > 0 ||
    2301 |                 !validacionDiagnosticoTemporalQt.ok
    2302 |               ) {
    2303 |                 window.alert(
    2304 |                   [
    2305 |                     "Validación del expediente copiado fallida.",
    2306 |                     "",
```

### Ventana 13

- Patrón: `textoExpediente`
- Línea central: 2354
- Rango: 2344-2364

```jsx
    2344 |                         ]
    2345 |                       : [])
    2346 |                   ].join("\n")
    2347 |                 );
    2348 | 
    2349 |                 return;
    2350 |               }
    2351 | 
    2352 |                
    2353 |           const areaTexto = document.createElement("textarea");
>>  2354 |           areaTexto.value = textoExpediente;
    2355 |           areaTexto.setAttribute("readonly", "");
    2356 |           areaTexto.style.position = "fixed";
    2357 |           areaTexto.style.left = "-9999px";
    2358 |           areaTexto.style.top = "-9999px";
    2359 |           document.body.appendChild(areaTexto);
    2360 |           areaTexto.focus();
    2361 |           areaTexto.select();
    2362 | 
    2363 |           let copiado = false;
    2364 | 
```

### Ventana 14

- Patrón: `textoExpediente`
- Línea central: 2376
- Rango: 2366-2386

```jsx
    2366 |             copiado = document.execCommand("copy");
    2367 |           } catch {
    2368 |             copiado = false;
    2369 |           }
    2370 | 
    2371 |           document.body.removeChild(areaTexto);
    2372 | 
    2373 |           if (copiado) {
    2374 |             window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
    2375 |           } else {
>>  2376 |             window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
    2377 |           }        }}
    2378 |         style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
    2379 |       >
    2380 |         Copiar expediente hidrológico mínimo
    2381 |       </button>
    2382 |       {(() => {
    2383 |         const areaKm2 = Number(contextoBase?.area_km2);
    2384 |         const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
    2385 |         const volumenEsperadoM3 =
    2386 |           Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
```


## Ventanas alrededor de ## 1. Identificación

### Ventana 1

- Patrón: `## 1. Identificación`
- Línea central: 2048
- Rango: 2034-2062

```jsx
    2034 |               );
    2035 |             }
    2036 |           } catch (errorDiagnosticoHelperExpediente) {
    2037 |             console.warn(
    2038 |               "Diagnóstico helper expediente no invasivo no ejecutado:",
    2039 |               errorDiagnosticoHelperExpediente
    2040 |             );
    2041 |           }
    2042 |           const textoExpediente = [
    2043 |             "# Expediente hidrológico mínimo — Cuenca activa",
    2044 |             "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
    2045 |             "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
    2046 |             "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
    2047 |             "",
>>  2048 |             "## 1. Identificación",
    2049 |             `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
    2050 |             `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
    2051 |             `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
    2052 |             `Estación IDF: ${estacionIdfExpediente}`,
    2053 |             `Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`,
    2054 |             `Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`,
    2055 |             "",
    2056 |             "## 2. Parámetros hidrológicos base",
    2057 |             `CN: ${contextoBase?.CN ?? "—"}`,
    2058 |             `CN base: ${contextoBase?.CN_base ?? "—"}`,
    2059 |             `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`,
    2060 |             `AMC: ${contextoBase?.AMC ?? "—"}`,
    2061 |             "",
    2062 |             "## 3. Tiempo de concentración y roles Tc",
```


## Ventanas alrededor de Copiar expediente

### Ventana 1

- Patrón: `Copiar expediente`
- Línea central: 2380
- Rango: 2370-2390

```jsx
    2370 | 
    2371 |           document.body.removeChild(areaTexto);
    2372 | 
    2373 |           if (copiado) {
    2374 |             window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
    2375 |           } else {
    2376 |             window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
    2377 |           }        }}
    2378 |         style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
    2379 |       >
>>  2380 |         Copiar expediente hidrológico mínimo
    2381 |       </button>
    2382 |       {(() => {
    2383 |         const areaKm2 = Number(contextoBase?.area_km2);
    2384 |         const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
    2385 |         const volumenEsperadoM3 =
    2386 |           Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
    2387 |             ? areaKm2 * peTotalMm * 1000
    2388 |             : null;
    2389 | 
    2390 |         return volumenEsperadoM3 ? (
```


## Ventanas alrededor de return

### Ventana 1

- Patrón: `return (`
- Línea central: 708
- Rango: 702-714

```jsx
     702 |     }
     703 | 
     704 |     return { ...base, ...estilos.semaforoGris };
     705 |   };
     706 | 
     707 |   const renderSemaforo = (metodo) => {
>>   708 |     return (
     709 |       <div style={estilos.semaforoWrap}>
     710 |         <span style={estiloSemaforo(metodo.semaforo)} />
     711 |         <span style={estilos.chip}>
     712 |           {metodo.estadoCompetencia || "sin evaluar"}
     713 |         </span>
     714 |         <span style={estilos.puntaje}>
```

### Ventana 2

- Patrón: `return (`
- Línea central: 745
- Rango: 739-751

```jsx
     739 |       .replace(/[^a-z0-9]/g, "");
     740 | 
     741 |   const extraerNumero = (valor) => {
     742 |     if (Number.isFinite(Number(valor))) return Number(valor);
     743 | 
     744 |     if (valor && typeof valor === "object") {
>>   745 |       return (
     746 |         Number(valor.tc) ||
     747 |         Number(valor.tc_min) ||
     748 |         Number(valor.Tc) ||
     749 |         Number(valor.TC) ||
     750 |         Number(valor.valor) ||
     751 |         Number(valor.resultado) ||
```

### Ventana 3

- Patrón: `return (`
- Línea central: 796
- Rango: 790-802

```jsx
     790 |         m?.name ??
     791 |         m?.m ??
     792 |         m?.id ??
     793 |         m?.clave
     794 |     );
     795 | 
>>   796 |     return (
     797 |       nombreDato.includes(nombreCatalogo) ||
     798 |       nombreCatalogo.includes(nombreDato)
     799 |     );
     800 |   });
     801 | 
     802 |   if (!match) return null;
```

### Ventana 4

- Patrón: `return (`
- Línea central: 857
- Rango: 851-863

```jsx
     851 |         h?.nombre ??
     852 |         h?.label ??
     853 |         h?.name ??
     854 |         h?.id
     855 |     );
     856 | 
>>   857 |     return (
     858 |       nombreDato.includes(nombreCatalogo) ||
     859 |       nombreCatalogo.includes(nombreDato)
     860 |     );
     861 |   });
     862 | 
     863 |   if (!match) {
```

### Ventana 5

- Patrón: `return (`
- Línea central: 995
- Rango: 989-1001

```jsx
     989 | });
     990 | 
     991 | const handleClickSeguro = (accion) => () => {
     992 |   if (!bloqueoAdopcion) accion();
     993 | };
     994 | 
>>   995 |     return (
     996 |       <section style={estilos.bloque}>
     997 |         <section
     998 |   style={{
     999 |     border: `1px solid ${estadoGlobal.color}`,
    1000 |     borderRadius: 12,
    1001 |     padding: 10,
```

### Ventana 6

- Patrón: `return (`
- Línea central: 1086
- Rango: 1080-1092

```jsx
    1080 |                       const tcValor = obtenerTcMetodo(metodo);
    1081 | 
    1082 |                       if (!Number.isFinite(tcValor)) {
    1083 |                         return <span style={estilos.chip}>—</span>;
    1084 |                     }
    1085 | 
>>  1086 |                       return (
    1087 |                         <span style={estilos.chip}>
    1088 |                           {tcValor.toFixed(2)} min
    1089 |                         </span>
    1090 |                       );
    1091 |                     })()}
    1092 |                  </td>
```

### Ventana 7

- Patrón: `return (`
- Línea central: 1102
- Rango: 1096-1108

```jsx
    1096 |     const auditoriaPendiente = obtenerAuditoriaPendienteMetodo(metodo);
    1097 | 
    1098 |     if (!auditoriaPendiente) {
    1099 |       return <span style={estilos.chip}>—</span>;
    1100 |     }
    1101 | 
>>  1102 |     return (
    1103 |       <div>
    1104 |         <span style={estilos.chip}>
    1105 |           {auditoriaPendiente.pendienteEsperada}
    1106 |         </span>
    1107 | 
    1108 |         <div
```

### Ventana 8

- Patrón: `return (`
- Línea central: 1135
- Rango: 1129-1141

```jsx
    1129 |     const resultadoQ = obtenerResultadoQMetodo(metodo);
    1130 | 
    1131 |     if (!Number.isFinite(resultadoQ.Qp)) {
    1132 |       return <span style={estilos.chip}>—</span>;
    1133 |     }
    1134 | 
>>  1135 |     return (
    1136 |       <span style={estilos.chip}>
    1137 |         {resultadoQ.Qp.toFixed(2)} m³/s
    1138 |       </span>
    1139 |     );
    1140 |   })()}
    1141 | </td>
```

### Ventana 9

- Patrón: `return (`
- Línea central: 1173
- Rango: 1167-1179

```jsx
    1167 |         : tpRel < 0.5
    1168 |         ? "respuesta rápida"
    1169 |         : tpRel <= 1.5
    1170 |         ? "rango temporal razonable"
    1171 |         : "respuesta retardada";
    1172 | 
>>  1173 |     return (
    1174 |       <div>
    1175 |         <span style={estilos.chip}>
    1176 |           {resultadoQ.Tp.toFixed(2)} min
    1177 |         </span>
    1178 |         <div style={{ ...estilos.muted, marginTop: "4px" }}>
    1179 |           Tp/Tc: {tpRel !== null ? tpRel.toFixed(2) + "x" : "—"} · Dur. eq.: {Number.isFinite(resultadoQ.volumen) && Number.isFinite(resultadoQ.Qp) && resultadoQ.Qp > 0 ? (resultadoQ.volumen / resultadoQ.Qp / 60).toFixed(0) + " min" : "—"}
```

### Ventana 10

- Patrón: `return (`
- Línea central: 1240
- Rango: 1234-1246

```jsx
    1234 |         : relacionVolumen <= 2
    1235 |         ? "escala razonable"
    1236 |         : relacionVolumen <= 10
    1237 |         ? "revisar escala"
    1238 |         : "fuera de escala";
    1239 | 
>>  1240 |     return (
    1241 |       <div>
    1242 |         <span style={estilos.chip}>
    1243 |           {resultadoQ.volumen.toFixed(2)}
    1244 |         </span>
    1245 |         {estadoEscalaVolumen ? (
    1246 |           <div style={{ ...estilos.muted, marginTop: "4px" }}>
```

### Ventana 11

- Patrón: `return (`
- Línea central: 1309
- Rango: 1303-1315

```jsx
    1303 |           </table>
    1304 |         </div>
    1305 |       </section>
    1306 |     );
    1307 |   };
    1308 | 
>>  1309 |   return (
    1310 |     <main style={estilos.pagina}>
    1311 |       <header style={estilos.encabezado}>
    1312 |         {/* CONTEXTO HIDROLÓGICO ACTIVO */}
    1313 | <section
    1314 |   style={{
    1315 |     border: "1px solid rgba(34, 211, 238, 0.25)",
```

### Ventana 12

- Patrón: `return (`
- Línea central: 2408
- Rango: 2402-2414

```jsx
    2402 |         fuenteExpediente: "ComparadorMultiMetodo.render",
    2403 |         origenPlantilla: "OT-0066",
    2404 |         cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
    2405 |       }
    2406 |     );
    2407 | 
>>  2408 |     return (
    2409 |       <section
    2410 |         style={{
    2411 |           border: "1px solid #334155",
    2412 |           borderRadius: 12,
    2413 |           padding: 12,
    2414 |           margin: "12px 0",
```

### Ventana 13

- Patrón: `return (`
- Línea central: 2498
- Rango: 2492-2504

```jsx
    2492 |               const numero = Number(valor);
    2493 |               return Number.isFinite(numero)
    2494 |                 ? numero.toLocaleString("es-CO", { maximumFractionDigits: decimales })
    2495 |                 : "—";
    2496 |             };
    2497 | 
>>  2498 |             return (
    2499 |               <section
    2500 |                 style={{
    2501 |                   border: `1px solid ${colorBorde}`,
    2502 |                   borderRadius: 12,
    2503 |                   padding: 12,
    2504 |                   margin: "12px 0",
```

### Ventana 14

- Patrón: `return (`
- Línea central: 2564
- Rango: 2558-2570

```jsx
    2558 |               if (Number.isFinite(numero) && String(valor).trim() !== "") {
    2559 |                 return numero.toLocaleString("es-CO", { maximumFractionDigits: 4 }) + sufijo;
    2560 |               }
    2561 |               return String(valor);
    2562 |             };
    2563 | 
>>  2564 |             return (
    2565 |               <section
    2566 |                 style={{
    2567 |                   border: disponibleQTrActivo ? "1px solid #16a34a" : "1px solid #a16207",
    2568 |                   borderRadius: 12,
    2569 |                   padding: 12,
    2570 |                   margin: "12px 0",
```

### Ventana 15

- Patrón: `return (`
- Línea central: 2639
- Rango: 2633-2645

```jsx
    2633 |             : resumenQSeries.publicados > 0 && (resumenQSeries.parciales > 0 || resumenQSeries.noDisponibles > 0)
    2634 |             ? { etiqueta: "Parcial", color: "#f59e0b" }
    2635 |             : resumenQSeries.publicados > 0
    2636 |             ? { etiqueta: "Disponible", color: "#16a34a" }
    2637 |             : { etiqueta: "No disponible", color: "#64748b" };
    2638 | 
>>  2639 |         return (
    2640 |           <section
    2641 |             style={{
    2642 |               border: `1px solid ${estadoQSeries.color}`,
    2643 |               borderRadius: 12,
    2644 |               padding: 12,
    2645 |               margin: "12px 0",
```

### Ventana 16

- Patrón: `return (`
- Línea central: 2749
- Rango: 2743-2755

```jsx
    2743 |                         Number.isFinite(Number(valor))
    2744 |                           ? `${Number(valor).toLocaleString("es-CO", {
    2745 |                               maximumFractionDigits: decimales
    2746 |                             })}${unidad}`
    2747 |                           : "—";
    2748 | 
>>  2749 |                       return (
    2750 |                         <tr key={`${fila.metodo}-${indice}`}>
    2751 |                           <td
    2752 |                             style={{
    2753 |                               padding: "6px 8px",
    2754 |                               borderBottom: "1px solid rgba(51, 65, 85, 0.55)",
    2755 |                               whiteSpace: "nowrap"
```

### Ventana 17

- Patrón: `return (`
- Línea central: 3097
- Rango: 3091-3103

```jsx
    3091 |                 sinSerieTemporal: 0,
    3092 |                 conQpico: 0,
    3093 |                 conTPico: 0,
    3094 |                 conVolTotal: 0
    3095 |               };
    3096 | 
>>  3097 |               return (
    3098 |                 <div
    3099 |                   style={{
    3100 |                     marginTop: 10,
    3101 |                     padding: 10,
    3102 |                     borderRadius: 8,
    3103 |                     border: "1px solid rgba(148, 163, 184, 0.35)",
```

### Ventana 18

- Patrón: `return (`
- Línea central: 3179
- Rango: 3173-3185

```jsx
    3173 |                         const escalarX = (valor) =>
    3174 |                           margen.izquierda + (Number(valor) / maxX) * anchoPlot;
    3175 | 
    3176 |                         const escalarY = (valor) =>
    3177 |                           margen.arriba + altoPlot - (Number(valor) / maxY) * altoPlot;
    3178 | 
>>  3179 |                         return (
    3180 |                           <div
    3181 |                             style={{
    3182 |                               marginTop: 12,
    3183 |                               padding: 10,
    3184 |                               borderRadius: 8,
    3185 |                               border: "1px solid rgba(99, 102, 241, 0.35)",
```

### Ventana 19

- Patrón: `return (`
- Línea central: 3241
- Rango: 3235-3247

```jsx
    3235 |                                 </text>
    3236 | 
    3237 |                                 {graficaQpTPicoMatrizPatron.puntos.map((punto) => {
    3238 |                                   const x = escalarX(punto.xTPicoMin);
    3239 |                                   const y = escalarY(punto.yQpM3s);
    3240 | 
>>  3241 |                                   return (
    3242 |                                     <g key={`qp-tpico-${punto.metodo}`}>
    3243 |                                       <circle
    3244 |                                         cx={x}
    3245 |                                         cy={y}
    3246 |                                         r="6"
    3247 |                                         fill={punto.color}
```

### Ventana 20

- Patrón: `return (`
- Línea central: 3299
- Rango: 3293-3305

```jsx
    3293 | 
    3294 |                         const escalarAncho = (valor) =>
    3295 |                           (Number(valor) / maxVelocidad) * anchoPlot;
    3296 | 
    3297 |                         const yFila = (indice) => margen.arriba + indice * altoFila;
    3298 | 
>>  3299 |                         return (
    3300 |                           <div
    3301 |                             style={{
    3302 |                               marginTop: 12,
    3303 |                               padding: 10,
    3304 |                               borderRadius: 8,
    3305 |                               border: "1px solid rgba(34, 197, 94, 0.35)",
```

### Ventana 21

- Patrón: `return (`
- Línea central: 3361
- Rango: 3355-3367

```jsx
    3355 | 
    3356 |                                 {graficaVelocidadEfectivaMatrizPatron.barras.map((barra, indice) => {
    3357 |                                   const y = yFila(indice);
    3358 |                                   const anchoTPico = escalarAncho(barra.velocidadTPicoKmh ?? 0);
    3359 |                                   const anchoAscenso = escalarAncho(barra.velocidadAscensoKmh ?? 0);
    3360 | 
>>  3361 |                                   return (
    3362 |                                     <g key={`velocidad-efectiva-${barra.metodo}`}>
    3363 |                                       <text
    3364 |                                         x={8}
    3365 |                                         y={y + 15}
    3366 |                                         fill="#e5e7eb"
    3367 |                                         fontSize="11"
```


## Restricciones mantenidas

- No se importó todavía `construirLineasIdentificacionExpediente`.
- No se modificó `ComparadorMultiMetodo.jsx`.
- No se reemplazó `textoExpediente`.
- No se modificó botón.
- No se modificó portapapeles.
- No se tocó Q-5.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocó motor hidrológico.

## Resultado

Contexto de parche mínimo disponible para definir OT-0125D con anclajes reales.