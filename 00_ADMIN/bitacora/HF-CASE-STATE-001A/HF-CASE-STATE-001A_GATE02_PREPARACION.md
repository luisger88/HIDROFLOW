# HF-CASE-STATE-001A — GATE 2 — PUNTO D-03 (PREPARACIÓN, SIN EJECUTAR)

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E1
- **Estado:** **PREPARADO, NO EJECUTADO** (prohibido ejecutar el snap en E1)
- **Fecha UTC:** 2026-09-20
- **Rama:** `ot-hf-003-cstate-001a`

---

## 1. Objetivo del GATE 2

Reproducir, bajo contrato, el snap del punto hidrológico **D-03** sobre la red
de drenaje acumulada del MDT operativo, clasificar la distancia resultante con
la regla gobernada (C-03) y emitir PASS / PASS_CONDICIONAL / FAIL documentado.
En E1 solo se PREPARA: comando, rutas, artefactos, criterios, rollback y
checklist. **Ningún comando de este documento se ejecuta en E1.**

## 2. Comando futuro de reproducción (PROPUESTA, no ejecutado)

```
python 07_TOOLBOX/hf_geo/cli.py --caso iguana_pc80 \
  --dir_temp <HF_GEO_DIR_TEMP> \
  --parametros parametros.json        # quebrada local D-03 (sustituye caso_real_001)
  --snap-contrato 07_TOOLBOX/hf_geo/config/contrato_snap_D03.json
```

La ruta exacta de invocación (exposición CLI o llamada directa a
`mod_04_snap`) se decide en el incremento que ejecute GATE 2; el contrato de
snap (C-03) es la fuente de verdad de la regla, no el ejecutable.

## 3. Entradas (rutas y artefactos esperados)

| Entrada | Ruta | Verificación |
|---|---|---|
| Punto D-03 | contrato `07_TOOLBOX/hf_geo/config/contrato_snap_D03.json` | `lat 6.271785117145225`, `lon -75.59408755595547`, `cota 1511.36` |
| MDT operativo | `01_DEM_HIDRO/00_BASE/DEM_Copernicus_GLO30_Aburra.tif` | SHA-256 `1B12E9DB53AF9474407ECBCAD846A6FA16E35FDB0AAD53D81529C025E22B0800`; tamaño 24 891 532 B; resolución 30 m |
| Red de drenaje (flujo acumulado) | salida temporal de M01/AcumFlow (>umbral) | reconstruible; umbral `500` celdas |
| CRS operativo | EPSG:32618 | reproyección verificada desde EPSG:4326 |
| Contrato de snap | `07_TOOLBOX/hf_geo/contrato_snap_d03.py` + `config/contrato_snap_D03.json` | `validar_contrato_snap(...)` sin errores |

## 4. Ruta de salida aislada

`HF_GEO_DIR_TEMP` explícito (no rutas rígidas legadas) y, si procede,
`datos_gobernados/HF_SNAP_D03_001.json`. La salida NO toca
`caso_activo.json`, `OT-HF-003.hfproj` ni `HF_EXPEDIENTE_001.json`.

## 5. Umbral de red

`umbral_acumulacion_celdas = 500` (valor gobernado del artefacto
`parametros.json` de la cuenca; `red_hidrografica.umbral_acumulacion_celdas`).
Cualquier cambio de umbral en GATE 2 exige acta.

## 6. Contrato de snap y resolución de la ambigüedad (C-03)

| Tolerancia | Clasificación |
|---|---|
| 30 m | tolerancia primaria = 1 celda de resolución (30 m) |
| 200 m | tolerancia legada hardcodeada en `mod_04_snap.py`; **descartada** como límite canónico |
| 128–136 m | distancias históricas observadas; solo admitidas bajo **excepción profesional documentada (acta)** |

Prohibición vigente: el snap **no puede** seleccionar automáticamente un
outlet distinto del punto D-03.

## 7. Criterios PASS / FAIL del GATE 2

| ID | Regla | Veredicto |
|---|---|---|
| PF-01 | `0 ≤ distancia ≤ 30 m` | **PASS** |
| PF-02 | `30 m < distancia ≤ 136 m` **con acta profesional** | **PASS_CONDICIONAL** |
| PF-03 | `distancia > 136 m` **o sin acta** | **FAIL** |

Implementación de clasificación: `contrato_snap_d03.clasificar_distancia()`.

## 8. Artefactos esperados del GATE 2

1. `HF_SNAP_D03_001.json` — resultado del snap: distancia, fila/columna,
   elevación, segmento, `outlet_retenido: true`.
2. Clasificación del veredicto (PF-01/02/03) y acta si procede PF-02.
3. Hash de verificación del MDT usado.
4. Referencia al contrato C-03 versión utilizada.

## 9. Rollback

- Rama aislada (GATE 2 se ejecuta en rama propia sobre esta base).
- No se modifican artefactos históricos ni el estado del caso; la única
  escritura es la salida aislada del §4.
- Si el veredicto es FAIL, se registra motivo, se bloquea la adopción del
  snap y se deja constancia sin mutar nada.

## 10. Checklist profesional previo a la ejecución de GATE 2

- [ ] Existe contrato C-03 validado (`validar_contrato_snap` sin errores).
- [ ] MDT presente y hash coincide con `1B12E9DB53AF9474407ECBCAD846A6FA16E35FDB0AAD53D81529C025E22B0800`.
- [ ] `HF_GEO_DIR_TEMP` explícito y fuera de rutas históricas.
- [ ] Umbral de red = 500 confirmado en el `parametros.json` de la cuenca.
- [ ] Sin `outlet_adoptado` ajeno al punto D-03 en la salida aislada.
- [ ] Verificación de reproyección EPSG:4326 → EPSG:32618 documentada.
- [ ] Se imprime el veredicto PF-01/02/03 y la distancia exacta.
- [ ] No se sobrescribe `HF_EXPEDIENTE_001.json` ni el estado del caso.

---

Firma: Agente Build (Big Pickle). Preparación de GATE 2 completada; ejecución
diferida a incremento posterior.