# PRÁCTICA-002C — Mapeo de columnas reales a contrato canónico del motor

Fecha: 06/08/2026 14:01:44
Rama: practica-002c-mapeo-columnas-reales-contrato-canonico-motor

## 1. Propósito

Mapear las columnas reales leídas en PRÁCTICA-002B hacia nombres canónicos consumibles por el motor HidroFlow, sin repetir inventarios, sin releer el CSV y sin crear aún una plantilla canónica.

Esta práctica transforma la materia prima geomorfológica documentada en un contrato conceptual mínimo motor-consumidor.

## 2. Fuente oficial usada

La fuente oficial para este mapeo es:

```text
PRÁCTICA-002B_lectura_parametros_geomorfologicos_reales_20260608_131415.md
```

No se usan inventarios V1/V2/V4 como fuente principal. Esos inventarios quedan como respaldo histórico y evidencia secundaria.

## 3. Columnas reales de entrada

```text
OID_
NOMBRE
AREA_KM2
PERIM_KM
LONG_CAUC_KM
LONG_PERF_KM
LONG_RED_KM
DENS_DREN
Z_SALIDA
Z_CABECERA
DESNIVEL_M
PEND_MED_PCT
KC_COMPAC
KF_FORMA
N_TRAMOS_QC
N_QUIEBRES
```

## 4. Mapeo mínimo hacia contrato canónico

```text
OID_           -> id_origen
NOMBRE         -> nombre_cuenca
AREA_KM2       -> area_km2
PERIM_KM       -> perimetro_km
LONG_CAUC_KM   -> longitud_cauce_km
LONG_PERF_KM   -> longitud_perfil_km
LONG_RED_KM    -> longitud_red_km
DENS_DREN      -> densidad_drenaje_km_km2
Z_SALIDA       -> cota_salida_msnm
Z_CABECERA     -> cota_cabecera_msnm
DESNIVEL_M     -> desnivel_m
PEND_MED_PCT   -> pendiente_media_pct
KC_COMPAC      -> kc_compacidad
KF_FORMA       -> kf_forma
N_TRAMOS_QC    -> n_tramos_qc
N_QUIEBRES     -> n_quiebres
```

## 5. Obligatoriedad inicial

Campos obligatorios para el motor o para validación mínima:

```text
nombre_cuenca
area_km2
longitud_cauce_km
longitud_perfil_km
cota_salida_msnm
cota_cabecera_msnm
desnivel_m
pendiente_media_pct
```

Campos complementarios útiles para diagnóstico, forma, drenaje y expediente:

```text
id_origen
perimetro_km
longitud_red_km
densidad_drenaje_km_km2
kc_compacidad
kf_forma
n_tramos_qc
n_quiebres
```

## 6. Consumidores previstos

```text
area_km2 -> SCS-CN, Método Racional, volumen esperado, expediente
longitud_cauce_km -> métodos Tc, expediente
longitud_perfil_km -> control geomorfológico, expediente
cota_salida_msnm -> desnivel, trazabilidad de cuenca
cota_cabecera_msnm -> desnivel, trazabilidad de cuenca
desnivel_m -> pendiente, métodos Tc, control geomorfológico
pendiente_media_pct -> métodos Tc, Índice Hidrológico, expediente
densidad_drenaje_km_km2 -> diagnóstico geomorfológico
kc_compacidad -> diagnóstico de forma
kf_forma -> diagnóstico de forma
n_tramos_qc -> auditoría geomorfológica
n_quiebres -> auditoría geomorfológica
```

## 7. Validaciones mínimas por campo

```text
area_km2 > 0
longitud_cauce_km > 0
longitud_perfil_km > 0
longitud_red_km >= longitud_cauce_km
cota_cabecera_msnm > cota_salida_msnm
desnivel_m > 0
pendiente_media_pct > 0
n_tramos_qc >= 0
n_quiebres >= 0
No hay null en campos obligatorios
No hay NaN
Separador decimal colombiano debe normalizarse antes de consumo por motor
```

## 8. Decisión

El contrato canónico del motor debe derivarse de las columnas reales documentadas en PRÁCTICA-002B. Esta práctica establece el mapeo mínimo y evita repetir auditorías o inventarios.

La siguiente práctica, si procede, debe crear el artefacto canónico o sus fitness functions, usando este mapeo como base.

## 9. Estado Git final

?? "00_ADMIN/bitacora/PRACTICA-002/PR\303\201CTICA-002C_mapeo_columnas_reales_contrato_canonico_motor.md"
