# OT-0051F2 — Corrige ubicación de fallbacks en Índice Hidrológico

Fecha: 06/08/2026 15:30:36
Rama: ot-0051-alineacion-runtime-verdad-geomorfologica-motor

## 1. Hallazgo

El build falló porque areaIndice y pendienteIndice quedaron insertados después de return (, dentro del JSX. Se corrige moviendo esas constantes antes del return.

## 2. Bloque detectado

```jsx
  const areaIndice =
    numeroIndicePositivo(contexto?.area_km2) ??
    numeroIndicePositivo(area_km2);

  const pendienteIndice =
    numeroIndicePositivo(contexto?.pendiente_media_pct) ??
    numeroIndicePositivo(pendiente_media_pct);
```

## 3. Bloque reubicado antes de return

```jsx

  const areaIndice =
    numeroIndicePositivo(contexto?.area_km2) ??
    numeroIndicePositivo(area_km2);

  const pendienteIndice =
    numeroIndicePositivo(contexto?.pendiente_media_pct) ??
    numeroIndicePositivo(pendiente_media_pct);

```

## 4. Diff IndiceHidrologico

diff --git a/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx b/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
index 7866896..4e298cd 100644
--- a/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
+++ b/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
@@ -485,7 +485,17 @@ const rangoTcAgente =
 
   const qRacionalTrIndice =
     numeroIndicePositivo(resultadoRacionalTrIndice?.Q);
+
+  const areaIndice =
+    numeroIndicePositivo(contexto?.area_km2) ??
+    numeroIndicePositivo(area_km2);
+
+  const pendienteIndice =
+    numeroIndicePositivo(contexto?.pendiente_media_pct) ??
+    numeroIndicePositivo(pendiente_media_pct);
+
   return (
+
     <aside style={estilos.panel}>
       <h2 style={estilos.titulo}>Índice Hidrológico de la Cuenca</h2>
 
@@ -509,14 +519,14 @@ const rangoTcAgente =
         <div style={estilos.dato}>
           <span style={estilos.label}>Área</span>
           <span style={estilos.value}>
-            {formatNumero(area_km2, 4)} km²
+            {formatNumero(areaIndice, 4)} km²
           </span>
         </div>
 
         <div style={estilos.dato}>
           <span style={estilos.label}>Pendiente media</span>
           <span style={estilos.value}>
-            {formatNumero(pendiente_media_pct, 2)} %
+            {formatNumero(pendienteIndice, 2)} %
           </span>
         </div>
 

## 5. Build posterior


> hidroflow@3.2.0 build
> vite build

[36mvite v5.4.21 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 848 modules transformed.
rendering chunks...
computing gzip size...
[2mdist/[22m[32mindex.html                 [39m[1m[2m  0.41 kB[22m[1m[22m[2m │ gzip:   0.28 kB[22m
[2mdist/[22m[35massets/index-DkTXiRnO.css  [39m[1m[2m  0.23 kB[22m[1m[22m[2m │ gzip:   0.14 kB[22m
[2mdist/[22m[36massets/index-C5G1Ghzp.js   [39m[1m[33m954.03 kB[39m[22m[2m │ gzip: 261.37 kB[22m

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
[32m✓ built in 2.76s[39m

Código de salida build: 0

## 6. Estado Git final
 M 01_APP/HIDROFLOW/src/HidroFlow.jsx
 M 01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
 M 01_APP/HIDROFLOW/src/layouts/HidroFlowLayout.jsx
?? 00_ADMIN/bitacora/OT-0051/
