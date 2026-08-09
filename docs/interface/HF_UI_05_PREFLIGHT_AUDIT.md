# HF_UI_05_PREFLIGHT_AUDIT
## Auditoría técnica previa — DrainageMapWindow

**Fecha:** 08/08/2026
**Commit base:** e1a26e2 (UI-MVP-01 congelado)
**Rama:** hf-prod-003c-persistencia-expediente
**Decisión recomendada:** APROBAR — Opción B parcial (SVG + GeoJSON cuenca real preexistente)

---

## 1. Dependencias de mapas existentes

### A. Librerías presentes en package.json

| Librería | Versión | Tipo | Relevancia para mapas |
|---|---|---|---|
| `react` | ^18.2.0 | UI runtime | Sí |
| `react-dom` | ^18.2.0 | DOM rendering | Sí |
| `recharts` | ^2.7.2 | Charts (SVG) | Reutilizable (SVG core) |
| `html2canvas` | ^1.4.1 | Captura de pantalla | No |
| `html2pdf.js` | ^0.14.0 | Exportación PDF | No |
| `express` | ^5.2.1 | Servidor proxy | No |

### B. Librerías ausentes

**Ninguna librería de mapas está instalada:**
- `leaflet` — NO instalado
- `react-leaflet` — NO instalado
- `maplibre-gl` — NO instalado
- `mapbox-gl` — NO instalado
- `ol` (OpenLayers) — NO instalado
- `deck.gl` — NO instalado
- `turf` — NO instalado
- `proj4` — NO instalado
- `d3` — NO instalado
- `topojson` — NO instalado
- `geotiff` — NO instalado
- `georaster` — NO instalado

### C. Dependencias que NO deben instalarse todavía

- `leaflet` / `react-leaflet` — Peso arquitectónico alto, requiere CSS global, introduce dependencia externa de tiles
- `proj4` — Requeriría transformación CRS, viola restricción "no transformar CRS" de esta fase
- `turf` — Operaciones geoespaciales en cliente, riesgo de calcular geometría en navegador (fuera de alcance)
- `maplibre-gl` — Dependencia pesada, requiere WebGL, overkill para MVP

---

## 2. Componentes de mapas existentes

### 2.1 OutletMiniMap (HidroFlow.jsx:609)

- **Qué muestra:** Punto de salida (outlet) + 3 estaciones EPM más cercanas + estación IDF adoptada en contexto geográfico
- **Tecnología:** SVG puro, proyección manual `toXY(lat,lon)` con dominio calculado dinámicamente
- **Datos:** Reales (ESTACIONES_EPM, coordenadas del punto de salida)
- **Reutilización para UI-05:** ALTA. Patrón de proyección `% → px` reutilizable directamente
- **Tamaño:** ~110 líneas

### 2.2 MapaAMVA (HidroFlow.jsx:3083)

- **Qué muestra:** 17 estaciones SIATA con ponderación, ríos de referencia, grid de coordenadas, leyenda
- **Tecnología:** SVG puro, proyección manual con bounds fijos del Valle de Aburrá (LAT 5.93–6.52, LON -75.82–-75.33)
- **Datos:** Reales (ESTACIONES_SIATA)
- **Reutilización para UI-05:** MEDIA. Patrón general de SVG + proyección aplicable, pero bounds son AMVA-específicos
- **Tamaño:** ~75 líneas

### 2.3 SVG en ComparadorMultiMetodo.jsx (líneas 3847–4078)

- **Qué muestra:** Hidrogramas como gráficos SVG
- **Reutilización para UI-05:** BAJA. No es mapa geoespacial

### Conclusión

HidroFlow YA tiene un lenguaje visual SVG establecido para representación espacial. DrainageMapWindow debe seguir este patrón: SVG + proyección manual + sin dependencias externas.

---

## 3. Datos espaciales reutilizables

### 3.1 GeoJSON disponible

| Archivo | CRS | Tamaño | Usable en navegador |
|---|---|---|---|
| `cuenca.geojson` | CRS84 (WGS84) | ~2 KB | **SÍ — ideal** |
| `cauce_ppal.geojson` | EPSG:32618 (UTM 18N) | ~3 KB | **NO sin conversión** |
| `streamnet.geojson` | — | 22.6 MB | NO — demasiado grande |
| `strahler.geojson` | — | 23.6 MB | NO — demasiado grande |
| `quiebres.geojson` | — | <1 MB | Posible si pequeño |
| `hack.geojson` | — | <1 MB | Posible si pequeño |

### 3.2 Ubicaciones con datos reales

| Ruta | Caso | Cuenca | Cauce |
|---|---|---|---|
| `07_TOOLBOX/hf_geo/salida/Iguana_PC80/` | Oficial | ✅ CRS84 | ✅ UTM |
| `07_TOOLBOX/caso_real_001/hf_geo/geojson/` | La Iguana | ✅ | ✅ |
| `07_TOOLBOX/caso_real_002/hf_geo/geojson/` | La Ayurá | ✅ | ✅ |
| `07_TOOLBOX/caso_real_003/hf_geo/geojson/` | Doña María | ✅ | ✅ |
| `07_TOOLBOX/caso_real_004/hf_geo/geojson/` | La Corcovada | ✅ | ✅ |
| `07_TOOLBOX/EXPEDIENTE/geojson/` | Expediente base | ✅ | ✅ |
| `07_TOOLBOX/salida_demo/hf_geo/geojson/` | Demo | ✅ | ✅ |

### 3.3 Qué es reutilizable y cómo

| Dato | Reutilizable | Evidencia | Método |
|---|---|---|---|
| **Cuenca (polígono)** | **SÍ** | Real, precalculada por HF-GEO | SVG `<path>` desde coordenadas WGS84 |
| **Cauce principal** | Parcial | Real pero en UTM | Requiere conversión o excluir |
| **Red hídrica (streamnet)** | NO | Real pero 22 MB | Excluir por tamaño |
| **Jerarquía Strahler** | NO | Real pero 23 MB | Excluir por tamaño |
| **Outlet** | SÍ (coordenadas) | Del contrato de cuenca | Punto SVG desde params |
| **Punto aportado** | SÍ (coordenadas) | Ingresado por usuario | Punto SVG desde SpatialSearchBox |

---

## 4. Evaluación de opciones técnicas

### Opción A — SVG placeholder puro

**Descripción:** Esquema SVG sin datos reales. Texto: "Visor pendiente de conexión a datos reales."

| Criterio | Evaluación |
|---|---|
| Dependencias nuevas | 0 |
| Cumple disciplina actual | SÍ (mismo patrón que OutletMiniMap) |
| Riesgo | Muy bajo |
| Muestra evidencia real | NO — es placeholder |
| Tiempo estimado | 30 min |
| Reutiliza patrones existentes | SÍ |
| Decisión | **Demasiado conservador. Hay datos reales disponibles.** |

### Opción B — GeoJSON cuenca real + SVG

**Descripción:** SVGs usando geometría real del polígono de cuenca desde `cuenca.geojson` (CRS84, ~2 KB). Punto de outlet y punto aportado como círculos SVG. Cauce principal condicionado a conversión CRS o excluido.

| Criterio | Evaluación |
|---|---|
| Dependencias nuevas | 0 |
| Cumple disciplina actual | SÍ |
| Riesgo | Bajo-Medio (necesita parseo de GeoJSON) |
| Muestra evidencia real | SÍ (cuenca HF-GEO) |
| Tiempo estimado | 1-2 h |
| Datos fuente | `cuenca.geojson` — real, trazable, pequeño |
| Decisión | **RECOMENDADO** |

### Opción C — Leaflet / MapLibre / OpenLayers

| Librería | Beneficio | Coste | Riesgo |
|---|---|---|---|
| **Leaflet + react-leaflet** | Pan/zoom, tiles, capas | ~40 KB gzipped, CSS global | Dependencia externa, tiles OSM/SIATA |
| **MapLibre GL** | WebGL, vectores, rendimiento | ~200 KB, WebGL requerido | Complejidad alta, overkill |
| **OpenLayers** | GeoJSON nativo, proyecciones | ~150 KB | Complejidad alta, API verbosa |

**Decisión para las tres: BLOQUEADO hasta V2.1.** Introducir librería de mapas rompe la disciplina de 0 dependencias y debe hacerse con aprobación Senior + evaluación de impacto en build/bundle.

---

## 5. Alcance PERMITIDO para UI-05 v1

### Elementos visuales

| Elemento | Permitido | Fuente | Método |
|---|---|---|---|
| Punto aportado (usuario) | **SÍ** | `params.lat_salida, lon_salida` | Círculo SVG + tooltip |
| Outlet candidato real | **SÍ** | `ContratoCuenca.json` o params | Círculo SVG + etiqueta |
| Cuenca (polígono real) | **SÍ** | `cuenca.geojson` (CRS84, precalculado) | SVG `<path>` desde parseo de coordenadas |
| Cauce principal | **CONDICIONADO** | `cauce_ppal.geojson` (UTM) | **NO sin conversión CRS** |
| Área preliminar | **SÍ** | metadata del contrato | Texto superpuesto (ej: "50.76 km²") |
| Red hídrica completa | **NO** | 22 MB GeoJSON | Inviable en navegador |
| Knickpoints | **NO** | Requiere procesamiento | Fuera de alcance |
| Label "Demo UI" | **SÍ** | — | Si no hay cuenca disponible |

### Reglas de evidencia

1. Toda geometría mostrada debe tener fuente explícita: archivo, caso, fecha.
2. No fabricar coordenadas. No inventar cuencas.
3. No recalcular geometría en el navegador.
4. Si el dato real no está disponible → mostrar placeholder explícito.
5. HF propone, el ingeniero confirma.

### Fuente de datos para UI-05 v1

**Caso de prueba oficial:** La Iguana PC_80 (-75.5852, 6.2624), área 50.76 km²
- Cuenca: `07_TOOLBOX/hf_geo/salida/Iguana_PC80/` o `07_TOOLBOX/EXPEDIENTE/geojson/cuenca.geojson`
- Outlet: `07_TOOLBOX/hf_geo/salida/Iguana_PC80/ContratoCuenca.json`
- Parámetros: `07_TOOLBOX/hf_geo/salida/Iguana_PC80/parametros.json`

El componente DEBE recibir estos datos por props (no fetch directo a archivos en producción), pero para MVP puede leerse desde una referencia estática al caso de prueba.

---

## 6. Alcance PROHIBIDO para UI-05

| Acción | Estado |
|---|---|
| Instalar librerías sin aprobación Senior | **PROHIBIDO** |
| Consultar servicios externos (SIATA, OSM, etc.) | **PROHIBIDO** |
| Usar datos ficticios como evidencia | **PROHIBIDO** |
| Calcular outlet | **PROHIBIDO** |
| Delimitar cuenca real en navegador | **PROHIBIDO** |
| Transformar CRS (proj4 o manual) | **PROHIBIDO** |
| Hacer snap de punto a red hídrica | **PROHIBIDO** |
| Modificar motor (hf_geo, hf_hydro) | **PROHIBIDO** |
| Modificar agentes | **PROHIBIDO** |
| Modificar fórmulas (Tc, Qp, SCS) | **PROHIBIDO** |
| Crear hfExpedienteState | **PROHIBIDO** |
| Crear provider global | **PROHIBIDO** |
| Crear hfConfig | **PROHIBIDO** |
| Abrir V2.1 | **PROHIBIDO** |
| Tocar Learning Log | **PROHIBIDO** |

---

## 7. Recomendación final

### Decisión: **APROBAR — Opción B parcial**

UI-05 DrainageMapWindow puede construirse AHORA como visor SVG que muestre:

1. **Polígono real de cuenca** desde `cuenca.geojson` (CRS84, precalculado por HF-GEO)
2. **Punto de outlet** desde el contrato de cuenca o params
3. **Punto aportado** desde params (ingresado por SpatialSearchBox / usuario)
4. **Área y metadata** superpuesta
5. **Etiqueta de fuente de datos**

**Excluir de esta fase:**
- Cauce principal (requiere conversión UTM→WGS84 o esperar que HF-GEO lo exporte en WGS84)
- Red hídrica (22 MB inviable)
- Controles de pan/zoom (SVG viewBox con scroll nativo es suficiente)

### Justificación

| Criterio | Evaluación |
|---|---|
| Menor riesgo | Sigue patrón OutletMiniMap/MapaAMVA ya probado |
| Coherencia con UI-MVP-01 | Mismo enfoque: componente aislado, props, sin dependencias |
| 0 dependencias nuevas | SÍ — usa SVG puro de React |
| Build sin tocar motor | SÍ — solo añade 1 componente en hfExpediente/ |
| Muestra evidencia real | SÍ — cuenca precalculada por HF-GEO del caso oficial |
| Trazable | SÍ — fuente: `07_TOOLBOX/hf_geo/salida/Iguana_PC80/` |
| Tiempo estimado | 1-2 horas |

### Integración sugerida

```
src/components/hfExpediente/DrainageMapWindow.jsx  (+export en index.js)
```

Integrar en `HidroFlow.jsx` > `ModParams` junto a OutletMiniMap, o como componente independiente en pestaña "Mapa" o sección dedicada.

### Riesgos identificados

| Riesgo | Mitigación |
|---|---|
| `cuenca.geojson` no está en WGS84 en todos los casos | Verificar CRS antes de parsear. Si no es WGS84, mostrar placeholder. |
| Parseo de GeoJSON produce UI bloqueante para polígonos grandes | `cuenca.geojson` es <2 KB. Riesgo mínimo. |
| Usuario espera mapa interactivo (pan/zoom) | Label explícito: "Visor de referencia — no es mapa navegable" |
| cauce_ppal en UTM causa confusión | No incluir cauce hasta que HF-GEO exporte en WGS84 (solicitar feature V2.1) |

### Prerrequisito para UI-06 (siguiente iteración de visor)

Solicitar a HF-GEO que exporte `cauce_ppal.geojson` en CRS84 (WGS84) además del formato UTM actual. Esto permitiría incluir cauce principal sin instalar proj4.

---

## 8. Checkpoint — Antes de iniciar código

- [x] UI-MVP-01 congelado en `e1a26e2`
- [x] Build OK (`npm run build` — 908 módulos, 4.27s)
- [x] Working tree residual: 11 archivos A, 0 B/C/E
- [x] Motor, agentes, fórmulas: limpios
- [x] Dependencias: 0 nuevas
- [x] Datos reales disponibles: `cuenca.geojson` en WGS84
- [x] Patrón SVG existente: OutletMiniMap + MapaAMVA como referencia

---

**Auditor completada. UI-05 está autorizado como SVG visor con polígono real de cuenca. No requiere instalación, no modifica motor, no crea deuda arquitectónica.**
