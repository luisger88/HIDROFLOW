# OT-0049B — Corrección quirúrgica duplicate key area_km2

Fecha: 06/08/2026 01:04:57
Rama: ot-0049-saneamiento-quirurgico-motor-indice
Archivo intervenido: D:\HidroFlow\01_APP\HIDROFLOW\src\HidroFlow.jsx

## 1. Estado inicial
?? 00_ADMIN/bitacora/OT-0049/

## 2. Evidencia previa area_km2

  01_APP\HIDROFLOW\src\HidroFlow.jsx:182:// ═══════════════════════════════════════════════════════════════════════════════
  01_APP\HIDROFLOW\src\HidroFlow.jsx:183:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:184:function normalizarHUaMm(uh, areaKm2, dt_min) {
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:185:  const volumenObjetivo = areaKm2 * 1000;
  01_APP\HIDROFLOW\src\HidroFlow.jsx:186:  const volumenUH = (uh || []).reduce(
  01_APP\HIDROFLOW\src\HidroFlow.jsx:187:    (suma, q) => suma + Number(q || 0) * (dt_min * 60),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:188:    0
  01_APP\HIDROFLOW\src\HidroFlow.jsx:189:  );
  01_APP\HIDROFLOW\src\HidroFlow.jsx:249:    return +(tr<=1?qp*Math.pow(tr,2.5):qp*Math.exp(-2.0*(tr-1))).toFixed(7);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:250:  });
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:251:  const areaKm2 = area_mi2 / 0.386102;
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:252:  const normalizado = normalizarHUaMm(uh, areaKm2, dt_min);
  01_APP\HIDROFLOW\src\HidroFlow.jsx:253:  return{tp,qp:normalizado.qp,tlag,W50,W75,Ct,Cp,uh:normalizado.uh,factorNormalizacion:normalizado.factor,metadata:{nombre:"Snyder",color:C.accent3}};
  01_APP\HIDROFLOW\src\HidroFlow.jsx:254:}
  01_APP\HIDROFLOW\src\HidroFlow.jsx:255:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:256:// ④ HU WILLIAMS & HANN (Williams & Hann, 1973)
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2180:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2181:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:2182:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2183:    estacion_idf: name ?? null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2184:    lluvia_efectiva: Boolean(lluvEfect),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2185:    hidrogramas: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:2186:      fuente: "ModHidrogramas",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3553:    ...(previo ?? {}),
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3554:    fuente: "motor HidroFlow",
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3555:    area_km2: Number.isFinite(Number(params?.area)) ? Number(params.area) : null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3556:    estacion_idf: stn,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3557:    tr_diseno_activo: trStateGlobal?.Tr_activo ?? 25,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3558:    periodos_retorno: TR_LIST,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3559:    metodo_racional: {
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3573:      "Quebrada La Iguaná - PC_80",
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3574:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3575:    area_km2:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3576:      params?.area_km2 ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3577:      params?.areaKm2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3578:      params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3579:      params?.A ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3580:      null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3581:
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3669:        8.43,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3670:      area:
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3671:        params?.area_km2 ??
> 01_APP\HIDROFLOW\src\HidroFlow.jsx:3672:        params?.areaKm2 ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3673:        params?.area ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3674:        params?.A ??
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3675:        null,
  01_APP\HIDROFLOW\src\HidroFlow.jsx:3676:      CN: params?.CN ?? params?.cnBase ?? null,


## 3. Coincidencias quirúrgicas encontradas
Coincidencias: 0

ABORTADO: se esperaba exactamente 1 coincidencia quirúrgica. No se modificó el archivo.
