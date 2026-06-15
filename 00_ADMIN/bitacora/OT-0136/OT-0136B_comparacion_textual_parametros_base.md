# OT-0136B — Comparación textual Parámetros base delegado vs operativo

## Resumen

```json
{
  "lineasDelegadas": 5,
  "lineasOperativas": 5,
  "coincidenciasEstrictas": 5,
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
## 2. Parámetros hidrológicos base
CN: 88
CN base: 82
CN efectivo: 88
AMC: II
```

## Bloque operativo de referencia

```text
## 2. Parámetros hidrológicos base
CN: 88
CN base: 82
CN efectivo: 88
AMC: II
```

## Comparación línea a línea

| Línea | Delegada | Operativa | Resultado |
|---:|---|---|---|
| 1 | `## 2. Parámetros hidrológicos base` | `## 2. Parámetros hidrológicos base` | Sin diferencia |
| 2 | `CN: 88` | `CN: 88` | Sin diferencia |
| 3 | `CN base: 82` | `CN base: 82` | Sin diferencia |
| 4 | `CN efectivo: 88` | `CN efectivo: 88` | Sin diferencia |
| 5 | `AMC: II` | `AMC: II` | Sin diferencia |

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

El bloque Parámetros hidrológicos base delegado queda en coincidencia textual estricta con la referencia operativa controlada.