# OT-0176B — Comparación helper Resumen Q-5 auditado vs operativo

## Resumen

```json
{
  "lineasDelegadas": 14,
  "lineasOperativas": 14,
  "coincidenciasEstrictas": 14,
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
## 6. Resumen Q-5 auditado
Estado general: diagnóstico no adoptivo.
SCS Unit Hydrograph: candidato principal de referencia.
SCS Mod.: variante ajustable.
Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.
Masa y volumen: controlados frente a referencia física.
Qp y Tp: sujetos a revisión temporal antes de adopción técnica.

Tabla Q-5 auditada:
| Método | Qp | Tp | Volumen |
|---|---:|---:|---:|
| SCS | 184.03 | 210 | 2654250.90 |


```

## Bloque operativo de referencia

```text
## 6. Resumen Q-5 auditado
Estado general: diagnóstico no adoptivo.
SCS Unit Hydrograph: candidato principal de referencia.
SCS Mod.: variante ajustable.
Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.
Masa y volumen: controlados frente a referencia física.
Qp y Tp: sujetos a revisión temporal antes de adopción técnica.

Tabla Q-5 auditada:
| Método | Qp | Tp | Volumen |
|---|---:|---:|---:|
| SCS | 184.03 | 210 | 2654250.90 |


```

## Comparación línea a línea

| Línea | Delegada | Operativa | Resultado |
|---:|---|---|---|
| 1 | `## 6. Resumen Q-5 auditado` | `## 6. Resumen Q-5 auditado` | Sin diferencia |
| 2 | `Estado general: diagnóstico no adoptivo.` | `Estado general: diagnóstico no adoptivo.` | Sin diferencia |
| 3 | `SCS Unit Hydrograph: candidato principal de referencia.` | `SCS Unit Hydrograph: candidato principal de referencia.` | Sin diferencia |
| 4 | `SCS Mod.: variante ajustable.` | `SCS Mod.: variante ajustable.` | Sin diferencia |
| 5 | `Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.` | `Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.` | Sin diferencia |
| 6 | `Masa y volumen: controlados frente a referencia física.` | `Masa y volumen: controlados frente a referencia física.` | Sin diferencia |
| 7 | `Qp y Tp: sujetos a revisión temporal antes de adopción técnica.` | `Qp y Tp: sujetos a revisión temporal antes de adopción técnica.` | Sin diferencia |
| 8 | `` | `` | Sin diferencia |
| 9 | `Tabla Q-5 auditada:` | `Tabla Q-5 auditada:` | Sin diferencia |
| 10 | `| Método | Qp | Tp | Volumen |` | `| Método | Qp | Tp | Volumen |` | Sin diferencia |
| 11 | `|---|---:|---:|---:|` | `|---|---:|---:|---:|` | Sin diferencia |
| 12 | `| SCS | 184.03 | 210 | 2654250.90 |` | `| SCS | 184.03 | 210 | 2654250.90 |` | Sin diferencia |
| 13 | `` | `` | Sin diferencia |
| 14 | `` | `` | Sin diferencia |

## Lectura técnica

- El helper coincide estrictamente con la referencia operativa controlada.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se reemplazó `textoExpediente`.
- No se modificó botón.
- No se modificó portapapeles.
- No se tocó Q-5 operativo.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocó motor hidrológico.

## Conclusión

El helper Resumen Q-5 auditado queda en coincidencia textual estricta con la referencia operativa controlada.