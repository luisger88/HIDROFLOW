# OT-0130B — Auditoría del bloque Parámetros hidrológicos base

## Resumen

```json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2055,
  "lineaFinAntesDeBloque3": 2060,
  "lineasAuditadas": 6,
  "totalEncabezados": 1,
  "totalDocumentales": 1,
  "totalSensibles": 4,
  "totalSeparadores": 0,
  "comparadorModificado": false,
  "decisionPreliminar": "No delegar completo todavía. Conviene definir contrato documental y separar campos sensibles antes de implementar helper."
}
```

## Bloque auditado

```jsx
 2055 |             "## 2. Parámetros hidrológicos base",
 2056 |             `CN: ${contextoBase?.CN ?? "—"}`,
 2057 |             `CN base: ${contextoBase?.CN_base ?? "—"}`,
 2058 |             `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`,
 2059 |             `AMC: ${contextoBase?.AMC ?? "—"}`,
 2060 |             "",
```

## Clasificación línea a línea

| Línea | Clasificación | Contenido |
|---:|---|---|
| 2055 | encabezado documental | `"## 2. Parámetros hidrológicos base",` |
| 2056 | técnicamente sensible | `` `CN: ${contextoBase?.CN ?? "—"}`, `` |
| 2057 | técnicamente sensible | `` `CN base: ${contextoBase?.CN_base ?? "—"}`, `` |
| 2058 | técnicamente sensible | `` `CN efectivo: ${contextoBase?.CN_efectivo ?? "—"}`, `` |
| 2059 | técnicamente sensible | `` `AMC: ${contextoBase?.AMC ?? "—"}`, `` |
| 2060 | documental / contextual | `"",` |

## Lectura técnica

- El bloque contiene campos hidrológicamente sensibles.
- Los campos sensibles identificados son `CN`, `CN base`, `CN efectivo` y `AMC`.
- No conviene delegar el bloque completo sin contrato documental previo.

## Decisión preliminar

No delegar completo todavía. Conviene definir contrato documental y separar campos sensibles antes de implementar helper.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se sustituyó `textoExpediente`.
- No se modificó botón.
- No se modificó portapapeles.
- No se tocó Q-5.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocaron validadores finales.
- No se tocó motor hidrológico.

## Siguiente paso recomendado

Abrir una OT posterior para definir el contrato documental del bloque `## 2. Parámetros hidrológicos base`, separando campos puramente documentales de campos hidrológicamente sensibles.
