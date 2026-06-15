# OT-0133B — Implementación de función pura Parámetros hidrológicos base

## Cambio aplicado

Se implementó en el helper documental la función:

```javascript
construirLineasParametrosHidrologicosBaseExpediente(...)
```

Ubicación:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Comportamiento

La función retorna 5 líneas:

```text
## 2. Parámetros hidrológicos base
CN: <valor | —>
CN base: <valor | —>
CN efectivo: <valor | —>
AMC: <valor | —>
```

## Reglas mantenidas

- No recalcula.
- No infiere.
- No deriva.
- No consulta motor.
- No modifica estado.
- No toca DOM.
- No usa portapapeles.
- Solo representa valores presentes o fallback `—`.

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
