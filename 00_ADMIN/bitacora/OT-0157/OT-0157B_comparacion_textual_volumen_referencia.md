# OT-0157B — Comparación textual Volumen de referencia delegado vs operativo

## Resumen

```json
{
  "lineasDelegadas": 4,
  "lineasOperativas": 4,
  "coincidenciasEstrictas": 4,
  "diferenciasEstrictas": 0,
  "residuosDelegado": [],
  "residuosOperativo": [],
  "textoExpedienteNoSustituido": true,
  "portapapelesSigueUsandoTextoExpediente": true,
  "fallbackManualSigueUsandoTextoExpediente": true
}
```

## Bloque delegado

```text
## 4. Volumen de referencia
Lluvia efectiva total: 56.65 mm
Volumen esperado: 2.654.251 m³
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Bloque operativo de referencia

```text
## 4. Volumen de referencia
Lluvia efectiva total: 56.65 mm
Volumen esperado: 2.654.251 m³
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Comparación línea a línea

| Línea | Delegada | Operativa | Resultado |
|---:|---|---|---|
| 1 | `## 4. Volumen de referencia` | `## 4. Volumen de referencia` | Sin diferencia |
| 2 | `Lluvia efectiva total: 56.65 mm` | `Lluvia efectiva total: 56.65 mm` | Sin diferencia |
| 3 | `Volumen esperado: 2.654.251 m³` | `Volumen esperado: 2.654.251 m³` | Sin diferencia |
| 4 | `Fórmula: Pe(mm) × Área(km²) × 1000.` | `Fórmula: Pe(mm) × Área(km²) × 1000.` | Sin diferencia |

## Lectura técnica

- El bloque delegado coincide estrictamente con el bloque operativo de referencia.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se reemplazó `textoExpediente`.
- No se modificó botón.
- No se modificó portapapeles.
- No se tocó Q-5.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocó motor hidrológico.

## Conclusión

El bloque Volumen de referencia delegado queda en coincidencia textual estricta con la referencia operativa controlada.