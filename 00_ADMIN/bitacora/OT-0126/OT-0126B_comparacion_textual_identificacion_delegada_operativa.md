# OT-0126B — Comparación textual Identificación delegada vs operativa

## Resumen

```json
{
  "lineasDelegadas": 7,
  "lineasOperativas": 7,
  "coincidenciasEstrictas": 4,
  "diferenciasEstrictas": 3,
  "diferenciasTextualesFuertes": 0,
  "residuosDelegado": [],
  "residuosOperativo": [],
  "textoExpedienteNoSustituido": true,
  "portapapelesSigueUsandoTextoExpediente": true,
  "fallbackManualSigueUsandoTextoExpediente": true
}
```

## Bloque delegado

```text
## 1. Identificación
Cuenca: Quebrada La Iguaná - PC_80
Área: 46.8516
Fuente de contexto: HidroFlow
Estación IDF: SAN CRISTOBAL
Pendiente media: 8.43
Longitud cauce principal: 15.524
```

## Bloque operativo de referencia

```text
## 1. Identificación
Cuenca: Quebrada La Iguaná - PC_80
Área: 46.8516 km²
Fuente de contexto: HidroFlow
Estación IDF: SAN CRISTOBAL
Pendiente media: 8.43 %
Longitud cauce principal: 15.524 km
```

## Comparación línea a línea

| Línea | Delegada | Operativa | Resultado |
|---:|---|---|---|
| 1 | `## 1. Identificación` | `## 1. Identificación` | Sin diferencia |
| 2 | `Cuenca: Quebrada La Iguaná - PC_80` | `Cuenca: Quebrada La Iguaná - PC_80` | Sin diferencia |
| 3 | `Área: 46.8516` | `Área: 46.8516 km²` | Diferencia de unidades/formato |
| 4 | `Fuente de contexto: HidroFlow` | `Fuente de contexto: HidroFlow` | Sin diferencia |
| 5 | `Estación IDF: SAN CRISTOBAL` | `Estación IDF: SAN CRISTOBAL` | Sin diferencia |
| 6 | `Pendiente media: 8.43` | `Pendiente media: 8.43 %` | Diferencia de unidades/formato |
| 7 | `Longitud cauce principal: 15.524` | `Longitud cauce principal: 15.524 km` | Diferencia de unidades/formato |

## Lectura técnica

- El bloque delegado no coincide estrictamente con el bloque operativo de referencia.
- Las diferencias detectadas son compatibles con formato/unidades, no con pérdida de contenido esencial.

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

La comparación queda documentada para decidir, en una OT posterior, si procede ajustar el helper o adoptar parcialmente el bloque delegado.