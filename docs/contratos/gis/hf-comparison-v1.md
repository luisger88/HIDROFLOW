# Contrato de Comparación Espacial HidroFlow — hf.comparison.v1

- **Esquema:** `hf.comparison.v1` (schema_version 1.0)
- **OT:** OT-HF-SIG-002 — Contratos Transversales de Ingeniería SIG v1
- **Caso de ejemplo (piloto):** `HF_CASE/iguana_pc80`
- **Rama de ejecución:** `ot-hf-sig-002-contratos-ingenieria-sig`
- **Fecha UTC:** 2026-09-20

---

## 1. Misión

Gobernar la **comparación espacial** entre una red/producto computacional y
referencias externas. Distingue rigurosamente qué referencia es medible con qué
método, y prohíbe fabricar precisión numérica sobre evidencia que no la admite
(pantallazos, imágenes no digitalizadas).

**Esta versión no ejecuta comparaciones espaciales.** Define el contrato que las
futuras ejecuciones respetarán.

## 2. Schema id

- `schema`: `hf.comparison.v1`
- `schema_version`: `1.0`

## 3. Tipos de referencia

| Tipo | Descripción | Medibilidad |
|---|---|---|
| `DIGITAL_MEDIBLE` | Referencia digital con CRS y geometría (GeoJSON, GPKG, SHP) | métricas espaciales válidas |
| `VISUAL_NO_DIGITALIZADA` | Imagen / ortofoto / pantallazo sin geometría vectorial | solo inspección cualitativa; **prohibida métrica numérica** |
| `INSTITUCIONAL` | Capas o catastro institucional (MapGIS, SIATA) con autoridad | métricas solo si el CRS y el datum están declarados y verificados |
| `COMPUTACIONAL` | Resultado de otro motor/algoritmo reproducible | métricas válidas con registro de parámetros |

## 4. Métricas permitidas (cuando la fuente lo admita)

- `distancia` (m, entre geometrías o puntos)
- `desplazamiento_lateral` (m, cauce vs referencia)
- `hausdorff` (m, distancia de Hausdorff entre curvas)
- `iou` (intersección sobre unión de regiones)
- `longitud_coincidente` (m/% de longitud que coincide)
- `orientacion` (ángulo relativo)
- `continuidad` (celdas/segmentos continuos)
- `correspondencia_por_segmento` (emparejamiento segmento a segmento)
- `cobertura` (fracción de la referencia cubierta)
- `topologia` (conectividad, cruces, orden de confluencia)

## 5. Reglas

1. **Prohibir precisión numérica falsa sobre pantallazos**: una imagen no
   digitalizada no produce distancia, Hausdorff ni IoU.
2. Toda métrica debe declarar: método, CRS de cálculo, resolución, umbral y versión.
3. Una referencia institucional sin CRS/datum verificado no produce métricas
   cuantitativas concluyentes.
4. El contraste externo se registra con evidencia y pasa a `hf.network.v1`
   (`EXTERNALLY_CONTRASTED`).
5. La comparación nunca sustituye la decisión profesional (`hf.spatial-decision.v1`).

## 6. Estados

- `PLANIFICADA` — comparación proyectada con método declarado.
- `EJECUTADA` — métricas calculadas y registradas.
- `RECHAZADA` — método no admisible para la fuente (ej. métrica sobre pantallazo).
- `NO_APTA_EVIDENCIA` — se descarta evidencia por calidad (ej. FAIL_ORIENTATION).

## 7. Evidencia

- `contraste_snap_D03.json` (contraste E2 del snap de D-03).
- `HF-CASE-STATE-001A_GATE02_*` (uso cualitativo de MapGIS/ortofoto).
- MapGIS (`fgdb/GPKG institucional`) y ortofoto AMVA: verificación **visual**,
  prohibida como fuente de métrica adoptiva.

## 8. Validaciones

1. La fuente de cada métrica está clasificada en uno de los 4 tipos.
2. Métricas cuantitativas solo sobre `DIGITAL_MEDIBLE`, `INSTITUCIONAL`
   verificado o `COMPUTACIONAL`.
3. Toda métrica registra método + CRS + resolución + umbral + versión.
4. Evidencia `FAIL_ORIENTATION` se excluye de toda métrica.

## 9. Veredictos

| Condición | Veredicto |
|---|---|
| Métrica cuantitativa con método y fuente admisibles | **PASS** |
| Comparación cualitativa documentada, sin métricas | **CONDICIONAL** |
| Métrica fabricada sobre pantallazo o imagen no digitalizada | **FAIL** |
| Comparación con fuente sin CRS/datum verificado | **FAIL** |

## 10. Bloqueos

- Métrica falsa sobre pantallazo bloquea esa evidencia.
- El ascenso a competencia territorial exige contraste `EXTERNALLY_CONTRASTED`.
- FAIL_ORIENTATION entra a la comparación → bloqueada.

## 11. Responsabilidades profesionales

- Elegir el método de comparación proporcional a la fuente.
- Registrar el error declarado, no el error deseado.
- Declarar expresamente cuando una comparación es solo visual.

## 12. Consumidores

- `hf.geo-qa.v1` (check `desplazamiento`, `correspondencia territorial`).
- `hf.network.v1` (transición a competencia).
- `hf.uncertainty.v1` (correspondencia externa y sensibilidad).
- HF-CARTO (resultado de contraste para render contextual).

## 13. Responsabilidades prohibidas

- Calcular distancias sobre pantallazos u ortofotos no digitalizadas.
- Presentar coincidencia visual como coincidencia métrica.
- Omitir el CRS/umbral del cálculo en el registro de métricas.

## 14. Relación con hf.case.v1

El caso preserva las referencias institucionales como clase C
(`references/source-manifest.json`) y no adopta salidas por contraste visual.
`hf.comparison.v1` da las reglas para que un futuro contraste, si se ejecuta,
se registre de forma coherente con `hf.network.v1` y
`hf.spatial-decision.v1`.

## 15. Ejemplo del caso iguana_pc80

- MapGIS y ortofoto AMVA: `VISUAL_NO_DIGITALIZADA` / `INSTITUCIONAL` con uso
  restringido a verificación visual (prohibida adopción automática del outlet).
- `contraste_snap_D03.json`: contraste computacional registrado en E2.
- Evidencia `verificacion_D03.png`: `FAIL_ORIENTATION`, excluida de métrica.
- No se ejecutaron comparaciones espaciales nuevas en esta OT.