# OT-0232B — Auditoría forma real salida construirExpedienteHidrologicoMinimo

## Resumen

```json
{
  "auditoria": "OT-0232",
  "objetivo": "forma_real_salida_construirExpedienteHidrologicoMinimo",
  "archivoExpediente": "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js",
  "archivoHelper": "01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js",
  "formaSalida": {
    "tipo": "object",
    "esArray": false,
    "esNull": false,
    "keys": [
      "ok",
      "texto",
      "errores",
      "advertencias",
      "secciones",
      "metadata"
    ],
    "longitudArray": null,
    "longitudString": null,
    "vistaString": "[object Object]",
    "detalleKeys": {
      "ok": {
        "tipo": "boolean",
        "esArray": false,
        "longitudArray": null,
        "longitudString": null,
        "vistaString": "true"
      },
      "texto": {
        "tipo": "string",
        "esArray": false,
        "longitudArray": null,
        "longitudString": 2868,
        "vistaString": "# Expediente hidrológico mínimo — Cuenca activa\nEstado técnico del expediente: BORRADOR GENERADO POR HELPER PURO INICIAL.\nLectura técnica: este helper aún no reemplaza el expediente operativo construi"
      },
      "errores": {
        "tipo": "array",
        "esArray": true,
        "longitudArray": 0,
        "longitudString": null,
        "vistaString": ""
      },
      "advertencias": {
        "tipo": "array",
        "esArray": true,
        "longitudArray": 2,
        "longitudString": null,
        "vistaString": "Helper puro inicial no integrado al botón.,El texto generado es contractual/base y no reemplaza todavía el expediente operativo actual."
      },
      "secciones": {
        "tipo": "array",
        "esArray": true,
        "longitudArray": 14,
        "longitudString": null,
        "vistaString": "# Expediente hidrológico mínimo — Cuenca activa,## 1. Identificación,## 2. Parámetros hidrológicos base,## 3. Tiempo de concentración y roles Tc,## 4. Volumen de referencia,## 5. Escenario Q-Tr activo"
      },
      "metadata": {
        "tipo": "object",
        "esArray": false,
        "longitudArray": null,
        "longitudString": null,
        "vistaString": "[object Object]"
      }
    }
  },
  "modificaCodigoAplicacion": false,
  "modificaMotor": false,
  "modificaTextoExpediente": false,
  "candidatosTexto": [
    {
      "ruta": "salida.texto",
      "tipo": "string",
      "longitud": 2868,
      "contieneTituloExpediente": true
    },
    {
      "ruta": "salida.errores.join('\\n')",
      "tipo": "array",
      "longitud": 0,
      "contieneTituloExpediente": false
    },
    {
      "ruta": "salida.advertencias.join('\\n')",
      "tipo": "array",
      "longitud": 135,
      "contieneTituloExpediente": false
    },
    {
      "ruta": "salida.secciones.join('\\n')",
      "tipo": "array",
      "longitud": 577,
      "contieneTituloExpediente": true
    }
  ]
}
```

## Lectura técnica

- Esta auditoría no modifica código funcional.
- La finalidad es identificar la ruta correcta para extraer el texto documental exportable.
- No se modifica expediente, helper, acople ni comparador.

## Próximo frente recomendado

`OT-0233 — Ajuste normalizador salida documental expediente mínimo`