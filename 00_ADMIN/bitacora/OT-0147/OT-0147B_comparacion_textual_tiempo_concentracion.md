# OT-0147B — Comparación textual Tiempo de concentración delegado vs operativo

## Resumen

```json
{
  "lineasDelegadas": 10,
  "lineasOperativas": 10,
  "coincidenciasEstrictas": 10,
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
## 3. Tiempo de concentración y roles Tc
Tc comparador: 114.2 min
Tr global activo: 100 años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Bloque operativo de referencia

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: 114.2 min
Tr global activo: 100 años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Comparación línea a línea

| Línea | Delegada | Operativa | Resultado |
|---:|---|---|---|
| 1 | `## 3. Tiempo de concentración y roles Tc` | `## 3. Tiempo de concentración y roles Tc` | Sin diferencia |
| 2 | `Tc comparador: 114.2 min` | `Tc comparador: 114.2 min` | Sin diferencia |
| 3 | `Tr global activo: 100 años` | `Tr global activo: 100 años` | Sin diferencia |
| 4 | `Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.` | `Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.` | Sin diferencia |
| 5 | `Roles Tc:` | `Roles Tc:` | Sin diferencia |
| 6 | `- Tc global Índice: referencia hidrológica general.` | `- Tc global Índice: referencia hidrológica general.` | Sin diferencia |
| 7 | `- Tc operativo Q(t): ruta interna del hidrograma.` | `- Tc operativo Q(t): ruta interna del hidrograma.` | Sin diferencia |
| 8 | `- Duración evento: 3 h para almacenamiento/regulación.` | `- Duración evento: 3 h para almacenamiento/regulación.` | Sin diferencia |
| 9 | `- Lag / forma SCS: parámetro derivado para forma temporal.` | `- Lag / forma SCS: parámetro derivado para forma temporal.` | Sin diferencia |
| 10 | `- Tc comparador: referencia especializada para coherencia Q-5.` | `- Tc comparador: referencia especializada para coherencia Q-5.` | Sin diferencia |

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

El bloque Tiempo de concentración delegado queda en coincidencia textual estricta con la referencia operativa controlada.