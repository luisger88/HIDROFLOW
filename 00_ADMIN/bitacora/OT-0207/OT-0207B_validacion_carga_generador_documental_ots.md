# OT-0207B — Validación de carga generador documental de OTs

## Resumen

```json
{
  "scriptExiste": true,
  "funcionDisponible": true,
  "tipoComando": "Function",
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false
}
```

## Resultado

La función `Nueva-OTDocumentalHidroFlow` fue cargada correctamente desde `07_TOOLBOX/powershell/hidroflow-ot-generator.ps1`.

## Alcance

La validación solo comprueba existencia del script y disponibilidad de la función.

No se generó una OT de prueba para evitar archivos auxiliares innecesarios.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `textoExpediente`.
- No se tocó motor hidrológico.
