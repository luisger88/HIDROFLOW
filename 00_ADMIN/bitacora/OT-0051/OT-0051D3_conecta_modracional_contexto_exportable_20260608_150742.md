# OT-0051D3 — Conexión segura ModRacional al contexto exportable

Fecha: 06/08/2026 15:07:42
Rama: ot-0051-alineacion-runtime-verdad-geomorfologica-motor

## 1. Objetivo

Conectar la instancia JSX de ModRacional con onContextoComparador para permitir que los resultados racionales calculados se publiquen al contexto consumido por el Índice Hidrológico.

## 2. Conteo de coincidencias

Coincidencias objetivo sin onContextoComparador: 1
Coincidencias ya corregidas: 0

## 3. Cambio aplicado

Línea modificada: 3763

Antes:
```jsx
      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn}/>}
```

Después:
```jsx
      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn} onContextoComparador={onContextoComparador}/>}
```

## 4. Diff quirúrgico

diff --git a/01_APP/HIDROFLOW/src/HidroFlow.jsx b/01_APP/HIDROFLOW/src/HidroFlow.jsx
index 62a1f5a..8586c97 100644
--- a/01_APP/HIDROFLOW/src/HidroFlow.jsx
+++ b/01_APP/HIDROFLOW/src/HidroFlow.jsx
@@ -3760,7 +3760,7 @@ useEffect(() => {
         />
       )}
       {tab==="hidro"      &&<ModHidrogramas params={params} est={est} name={name} onContextoComparador={onContextoComparador} />}
-      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn}/>}
+      {tab==="racional"   &&<ModRacional   params={params} est={est} name={stn} onContextoComparador={onContextoComparador}/>}
       {tab==="sar"        &&<ModSAR        params={params} est={est} name={stn}/>}
       {tab === "Influencia" && (
         <div style={{

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
[2mdist/[22m[36massets/index-D2KV7iTC.js   [39m[1m[33m953.93 kB[39m[22m[2m │ gzip: 261.33 kB[22m

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
[32m✓ built in 2.81s[39m

Código de salida build: 0

## 6. Estado Git final
 M 01_APP/HIDROFLOW/src/HidroFlow.jsx
?? 00_ADMIN/bitacora/OT-0051/
