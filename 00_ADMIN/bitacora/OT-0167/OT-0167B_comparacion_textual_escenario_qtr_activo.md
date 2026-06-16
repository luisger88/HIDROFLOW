# OT-0167B — Comparación textual Escenario Q-Tr activo delegado vs operativo

## Resumen

```json
{
  "lineasDelegadas": 16,
  "lineasOperativas": 16,
  "coincidenciasEstrictas": 16,
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
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: publicado
Tr activo: 100.00 años
Estación IDF: San Cristóbal
Método IDF: IDF ponderada
Distribución temporal: SCS Tipo II
Área: 46.8516 km²
CN efectivo: 86.12
S: 40.93 mm
Ia: 8.19 mm
Impermeabilidad: 12.00 %
Tc: 114.2345 min
Pe total: 56.6543 mm
Campos mínimos: completos
Fuente: qtr-activo
Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.
```

## Bloque operativo de referencia

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado: publicado
Tr activo: 100.00 años
Estación IDF: San Cristóbal
Método IDF: IDF ponderada
Distribución temporal: SCS Tipo II
Área: 46.8516 km²
CN efectivo: 86.12
S: 40.93 mm
Ia: 8.19 mm
Impermeabilidad: 12.00 %
Tc: 114.2345 min
Pe total: 56.6543 mm
Campos mínimos: completos
Fuente: qtr-activo
Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.
```

## Comparación línea a línea

| Línea | Delegada | Operativa | Resultado |
|---:|---|---|---|
| 1 | `## 5. Escenario Q-Tr activo — control de trazabilidad` | `## 5. Escenario Q-Tr activo — control de trazabilidad` | Sin diferencia |
| 2 | `Estado: publicado` | `Estado: publicado` | Sin diferencia |
| 3 | `Tr activo: 100.00 años` | `Tr activo: 100.00 años` | Sin diferencia |
| 4 | `Estación IDF: San Cristóbal` | `Estación IDF: San Cristóbal` | Sin diferencia |
| 5 | `Método IDF: IDF ponderada` | `Método IDF: IDF ponderada` | Sin diferencia |
| 6 | `Distribución temporal: SCS Tipo II` | `Distribución temporal: SCS Tipo II` | Sin diferencia |
| 7 | `Área: 46.8516 km²` | `Área: 46.8516 km²` | Sin diferencia |
| 8 | `CN efectivo: 86.12` | `CN efectivo: 86.12` | Sin diferencia |
| 9 | `S: 40.93 mm` | `S: 40.93 mm` | Sin diferencia |
| 10 | `Ia: 8.19 mm` | `Ia: 8.19 mm` | Sin diferencia |
| 11 | `Impermeabilidad: 12.00 %` | `Impermeabilidad: 12.00 %` | Sin diferencia |
| 12 | `Tc: 114.2345 min` | `Tc: 114.2345 min` | Sin diferencia |
| 13 | `Pe total: 56.6543 mm` | `Pe total: 56.6543 mm` | Sin diferencia |
| 14 | `Campos mínimos: completos` | `Campos mínimos: completos` | Sin diferencia |
| 15 | `Fuente: qtr-activo` | `Fuente: qtr-activo` | Sin diferencia |
| 16 | `Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.` | `Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.` | Sin diferencia |

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

El bloque Escenario Q-Tr activo delegado queda en coincidencia textual estricta con la referencia operativa controlada.