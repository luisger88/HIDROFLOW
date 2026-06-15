# OT-0139B — Auditoría del bloque Tiempo de concentración y roles Tc

## Resumen

```json
{
  "bloqueEncontrado": true,
  "lineaInicio": 2060,
  "lineaFinAntesDeBloque4": 2070,
  "lineasAuditadas": 11,
  "totalEncabezados": 1,
  "totalDocumentales": 4,
  "totalSensibles": 6,
  "totalSeparadores": 0,
  "comparadorModificado": false,
  "decisionPreliminar": "No delegar completo todavía. Conviene definir contrato documental y separar campos sensibles antes de implementar helper."
}
```

## Bloque auditado

El bloque auditado corresponde a:

```text
## 3. Tiempo de concentración y roles Tc
```

La auditoría localizó el bloque dentro de `ComparadorMultiMetodo.jsx`, desde la línea 2060 hasta antes del bloque `## 4.`.

## Clasificación general

| Tipo | Cantidad |
|---|---:|
| Encabezados documentales | 1 |
| Líneas documentales / contextuales | 4 |
| Líneas técnicamente sensibles | 6 |
| Separadores | 0 |

## Lectura técnica

- El bloque contiene campos técnicamente sensibles asociados al tiempo de concentración y roles Tc.
- La sensibilidad se relaciona con valores y criterios como `Tc`, tiempo de concentración, comparador, roles, rangos, competencia, advertencias y expresiones en minutos.
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

Abrir una OT posterior para definir el contrato documental del bloque `## 3. Tiempo de concentración y roles Tc`, separando campos puramente documentales de campos hidrológicamente sensibles.
