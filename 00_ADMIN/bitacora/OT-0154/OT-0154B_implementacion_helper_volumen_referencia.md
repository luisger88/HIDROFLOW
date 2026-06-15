# OT-0154B — Implementación helper puro Volumen de referencia

## Cambio aplicado

Se implementó en el helper documental la función:

```javascript
construirLineasVolumenReferenciaExpediente(...)
```

Ubicación:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Comportamiento

La función retorna el bloque:

```text
## 4. Volumen de referencia
Lluvia efectiva total: <valor | —>
Volumen esperado: <valor | —>
Fórmula: Pe(mm) × Área(km²) × 1000.
```

## Reglas mantenidas

- No calcula volumen.
- No recalcula Pe.
- No recalcula área.
- No infiere masa.
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
