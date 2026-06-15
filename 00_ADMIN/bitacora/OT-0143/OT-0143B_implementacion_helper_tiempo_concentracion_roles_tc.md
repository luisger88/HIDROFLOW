# OT-0143B — Implementación helper puro Tiempo de concentración y roles Tc

## Cambio aplicado

Se implementó en el helper documental la función:

```javascript
construirLineasTiempoConcentracionRolesTcExpediente(...)
```

Ubicación:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Comportamiento

La función retorna el bloque:

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: <valor | —>
Tr global activo: <valor | —> años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Reglas mantenidas

- No recalcula Tc.
- No infiere Tc.
- No deriva roles.
- No reinterpreta competencia.
- No genera advertencias nuevas.
- No consulta motor.
- No modifica estado.
- No toca DOM.
- No usa portapapeles.

## Restricciones mantenidas

No se modificó:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
