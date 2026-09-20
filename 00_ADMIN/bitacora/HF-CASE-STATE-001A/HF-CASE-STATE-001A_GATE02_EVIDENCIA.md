# HF-CASE-STATE-001A — GATE 2 — EVIDENCIA DEL SNAP D-03 (E2)

- **OT:** OT-HF-003-CSTATE-001A
- **Incremento:** E2
- **Fecha UTC:** 2026-09-20T19:55
- **Rama:** `ot-hf-003-cstate-001a` (`3886ccf4547972b42d8ac052b14e2f9d60a4ee99`)

---

## 1. Cadena de custodia (hashes)

| Elemento | SHA-256 |
|---|---|
| MDT `DEM_Copernicus_GLO30_Aburra.tif` | `1b12e9db53af9474407ecbcad846a6fa16e35fdb0aad53d81529c025e22b0800` |
| Inmutable `caso_activo.json` (antes/después) | `76af14f62c3aff8f4656f0c6dd51a4c37d9a310fdb169718c763dfb2f06ee522` |
| Inmutable `OT-HF-003.hfproj` (antes/después) | `87f3943bc3b49dd4ececc48e04c8ffb874abd7676e65a8f74238a7bba43b7841` |
| Inmutable `HF_EXPEDIENTE_001.json` (antes/después) | `5f6d84888327f824758033fe3abfd05d647864664a9206dbb105c9bf914ed6db` |
| Contrato C-03 `contrato_snap_D03.json` | `e84331acf4700ead49fb87845da86d45a28d805ed402e154e9a946cd6f9cf803` |
| Script `ejecutar_gate02_d03.py` | `04c26f956a1343cb5ab53e9a16e8d0887fd93ad8a0c711d0f09c77a9f45c518c` |
| Script `contraste_snap.py` | `01543a7f2561f36056fb1cabacf4393ff2063d6679325fa0a7ab4aa2e6aef37f` |

Los tres inmutables resultaron **idénticos antes y después** de la ejecución
(valores de base capturados en E1 y re-verificados al cierre del GATE 2).

## 2. Evidencia numérica (fuente: `snap_registro_D03.json`)

- Punto original (EPSG:32618): x=434284.806, y=693285.656 → fila 1027, col 946.
- Snap: fila 1028, col 946; distancia **32.307 m** (traza 30.0 m).
- Elevación original 1518.766 msnm; snapped 1517.117 msnm.
- Acumulación 55 024 celdas; segmento 24; umbral 500.
- Continuidad: 2078 celdas, todas en red, 0 fuera; no llega a borde.
- Divisoria: punto dentro de cuenca snap = `true`.
- Candidatos: 34 (300 m); más cercano (1027,945) @ 19.82 m NO elegido (cuenca sin el punto).

## 3. Evidencia gráfica

- `verificacion_D03.png` (1650×1500, RGBA, PNG válido): puntos original/snap, segmento candidato, red en ±10 km, traza del flujo, escala, norte, CRS y clasificación. Inspeccionada visualmente.
- `verificacion_D03.kml` (1.57 MB, 1055 Placemarks) y `verificacion_D03.geojson` (3 features) para visualización en SIG gratuitos.

## 4. Evidencia de reproducibilidad

- `stdout_gate02.txt` (1317 B) y `stderr_gate02.txt` (0 B) — bitácora cruda del run (EXIT 0).
- `contraste_snap_D03.json` — validación cruzada de watershed (candidato cercano vs elegido).
- `manifiesto_gate02.json` — inventario completo con bytes y SHA-256 de los 14 artefactos.
- `REGISTRO_HASHES_GATE02.json` — hashes de MDT, inmutables, artefactos y scripts.

## 5. Integridad de los artefactos

Se validaron programáticamente los 14 archivos de salida (JSON/GeoJSON parseables,
KML/XML bien formado, PNG válido con dimensiones correctas). Consistencia
verificada entre el registro y las geometrías: el punto snap del GeoJSON
corresponde a la célula (1028, 946) y la distancia registrada coincide con la
euclidiana entre ambos puntos en EPSG:32618.

---

Firma: Agente Build (Big Pickle). Evidencia cerrada e íntegra.