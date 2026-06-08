# OT-0049B — Corrección segura duplicate key area_km2

Fecha: 06/08/2026 01:12:39
Rama: ot-0049-saneamiento-quirurgico-motor-indice
Archivo intervenido: D:\HidroFlow\01_APP\HIDROFLOW\src\HidroFlow.jsx

## 1. Estado inicial
?? 00_ADMIN/bitacora/OT-0049/

## 2. Evidencia previa del bloque area_km2

  01_APP\HIDROFLOW\src\HidroFlow.jsx:2179:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3552:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    ...(previo ?? {}),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    estacion_idf: stn,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    periodos_retorno: TR_LIST,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3561:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3573:      "Quebrada La Iguaná - PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3574:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3575:    area_km2:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3576:      params?.area_km2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3577:      params?.areaKm2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3578:      params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3579:      params?.A ??


## 3. Coincidencias quirúrgicas encontradas
Coincidencias: 1

## 4. Corrección aplicada
Se eliminó la primera clave area_km2 duplicada ubicada antes de estacion_idf: stn.
Se conserva la clave area_km2 robusta que usa params?.area_km2 ?? params?.areaKm2 ?? params?.area ?? params?.A ?? null.

## 5. Evidencia posterior del bloque area_km2

  01_APP\HIDROFLOW\src\HidroFlow.jsx:2179:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3552:  onContextoComparador((previo) => ({
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    ...(previo ?? {}),
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:    estacion_idf: stn,
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    periodos_retorno: TR_LIST,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:      fuente: "calcRacional",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3560:      uso: "contraste global independiente de caudal pico",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3572:      "Quebrada La Iguaná - PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3573:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3574:    area_km2:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3575:      params?.area_km2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3576:      params?.areaKm2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3577:      params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3578:      params?.A ??


## 6. Build posterior

> hidroflow@3.2.0 build
> vite build

[36mvite v5.4.21 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 848 modules transformed.
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.41 kB[22m[1m[22m[2m │ gzip:   0.28 kB[22m
[2mdist/[22m[35massets/index-DkTXiRnO.css  [39m[1m[2m  0.23 kB[22m[1m[22m[2m │ gzip:   0.14 kB[22m
[2mdist/[22m[36massets/index-CQmKfbdh.js   [39m[1m[33m953.91 kB[39m[22m[2m │ gzip: 261.33 kB[22m

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
[32m✓ built in 2.83s[39m
Código de salida del build: 0

## 7. Estado Git posterior
 M 01_APP/HIDROFLOW/src/HidroFlow.jsx
?? 00_ADMIN/bitacora/OT-0049/
