# OT-0174B — Implementación helper puro Resumen Q-5 auditado

## Cambio aplicado

Se implementó en el helper documental la función:

```javascript
construirLineasResumenQ5AuditadoExpediente(...)
```

Ubicación:

`01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js`

## Comportamiento

La función retorna el bloque:

```text
## 6. Resumen Q-5 auditado
Estado general: diagnóstico no adoptivo.
SCS Unit Hydrograph: candidato principal de referencia.
SCS Mod.: variante ajustable.
Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.
Masa y volumen: controlados frente a referencia física.
Qp y Tp: sujetos a revisión temporal antes de adopción técnica.

Tabla Q-5 auditada:
<tablaQ5Markdown | sin tabla Q-5 disponible>
```

## Reglas mantenidas

- No recalcula Q-5.
- No modifica Qp.
- No modifica Tp.
- No modifica volumen.
- No modifica hidrogramas.
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
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
