# OT-0164B — Implementación helper puro Escenario Q-Tr activo

## Cambio aplicado

Se implementó en el helper documental la función:

```javascript
construirLineasEscenarioQTrActivoExpediente(...)
```

Ubicación:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Comportamiento

La función retorna el bloque:

```text
## 5. Escenario Q-Tr activo — control de trazabilidad
Estado
Tr activo
Estación IDF
Método IDF
Distribución temporal
Área
CN efectivo
S
Ia
Impermeabilidad
Tc
Pe total
Campos mínimos
Fuente
Lectura técnica
```

## Reglas mantenidas

- No recalcula Q.
- No infiere Tr.
- No recalcula área.
- No recalcula CN.
- No recalcula S ni Ia.
- No recalcula Pe.
- No modifica `estadoQTrActivoExpediente`.
- No modifica `qTrActivoExpediente`.
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
