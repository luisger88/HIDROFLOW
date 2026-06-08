# OT-0051F — Conecta contexto al Índice Hidrológico

Fecha: 06/08/2026 15:26:54
Rama: ot-0051-alineacion-runtime-verdad-geomorfologica-motor

## 1. Hallazgo

HidroFlowLayout mantiene contextoComparador y lo pasa al ComparadorMultiMetodo, pero IndiceHidrologico no lo recibía. Además, el bloque visual de área y pendiente usaba props directas sin fallback hacia contexto.

## 2. Conteo layout

Instancias IndiceHidrologico sin contexto: 1

## 3. Cambio layout

Antes:
```jsx
        <IndiceHidrologico
```

Después:
```jsx
        <IndiceHidrologico contexto={contextoComparador}
```

## 4. Fallbacks agregados en IndiceHidrologico

```jsx

  const areaIndice =
    numeroIndicePositivo(contexto?.area_km2) ??
    numeroIndicePositivo(area_km2);

  const pendienteIndice =
    numeroIndicePositivo(contexto?.pendiente_media_pct) ??
    numeroIndicePositivo(pendiente_media_pct);
```

## 5. Cambios visuales área/pendiente

Cambios visuales aplicados: 2

## 6. Diff quirúrgico

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
diff --git a/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx b/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
index 7866896..cb9c3e1 100644
--- a/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
+++ b/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
@@ -486,6 +486,14 @@ const rangoTcAgente =
   const qRacionalTrIndice =
     numeroIndicePositivo(resultadoRacionalTrIndice?.Q);
   return (
+
+  const areaIndice =
+    numeroIndicePositivo(contexto?.area_km2) ??
+    numeroIndicePositivo(area_km2);
+
+  const pendienteIndice =
+    numeroIndicePositivo(contexto?.pendiente_media_pct) ??
+    numeroIndicePositivo(pendiente_media_pct);
     <aside style={estilos.panel}>
       <h2 style={estilos.titulo}>Índice Hidrológico de la Cuenca</h2>
 
@@ -509,14 +517,14 @@ const rangoTcAgente =
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
 
diff --git a/01_APP/HIDROFLOW/src/layouts/HidroFlowLayout.jsx b/01_APP/HIDROFLOW/src/layouts/HidroFlowLayout.jsx
index dc831bb..97b775f 100644
--- a/01_APP/HIDROFLOW/src/layouts/HidroFlowLayout.jsx
+++ b/01_APP/HIDROFLOW/src/layouts/HidroFlowLayout.jsx
@@ -56,7 +56,7 @@ export default function HidroFlowLayout() {
   return (
     <div style={estilos.contenedor}>
       <aside style={estilos.lateral}>
-        <IndiceHidrologico
+        <IndiceHidrologico contexto={contextoComparador}
           tabActiva={tabActiva}
           tab={tabActiva}
           setTab={setTabActiva}

## 7. Build posterior


> hidroflow@3.2.0 build
> vite build

[36mvite v5.4.21 [32mbuilding for production...[36m[39m
transforming...
[32m✓[39m 5 modules transformed.
x Build failed in 66ms
error during build:
[vite:esbuild] Transform failed with 1 error:
D:/HidroFlow/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx:490:2: ERROR: Unexpected "const"
file: D:/HidroFlow/01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx:490:2

Unexpected "const"
488|    return (
489|  
490|    const areaIndice =
   |    ^
491|      numeroIndicePositivo(contexto?.area_km2) ??
492|      numeroIndicePositivo(area_km2);

    at failureErrorWithLog (D:\HidroFlow\01_APP\HIDROFLOW\node_modules\vite\node_modules\esbuild\lib\main.js:1472:15)
    at D:\HidroFlow\01_APP\HIDROFLOW\node_modules\vite\node_modules\esbuild\lib\main.js:755:50
    at responseCallbacks.<computed> (D:\HidroFlow\01_APP\HIDROFLOW\node_modules\vite\node_modules\esbuild\lib\main.js:622:9)
    at handleIncomingPacket (D:\HidroFlow\01_APP\HIDROFLOW\node_modules\vite\node_modules\esbuild\lib\main.js:677:12)
    at Socket.readFromStdout (D:\HidroFlow\01_APP\HIDROFLOW\node_modules\vite\node_modules\esbuild\lib\main.js:600:7)
    at Socket.emit (node:events:509:28)
    at addChunk (node:internal/streams/readable:563:12)
    at readableAddChunkPushByteMode (node:internal/streams/readable:514:3)
    at Readable.push (node:internal/streams/readable:394:5)
    at Pipe.onStreamRead (node:internal/stream_base_commons:189:23)

Código de salida build: 1

## 8. Estado Git final
 M 01_APP/HIDROFLOW/src/HidroFlow.jsx
 M 01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx
 M 01_APP/HIDROFLOW/src/layouts/HidroFlowLayout.jsx
?? 00_ADMIN/bitacora/OT-0051/
