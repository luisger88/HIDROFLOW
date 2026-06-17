# OT-0200B — Revisión estructural de bloques reales dentro de textoExpediente

## Resumen

```json
{
  "textoExpedienteDetectado": true,
  "cierreTextoExpedienteDetectado": true,
  "totalLineasSegmento": 88,
  "totalHelpersDetectados": 6,
  "totalEncabezadosLiteralesDetectados": 5,
  "helpersDetectados": [
    {
      "helperNombre": "construirLineasIdentificacionExpediente",
      "pasaContextoBase": true,
      "lineaInicio": 7,
      "lineaFin": 11
    },
    {
      "helperNombre": "construirLineasParametrosHidrologicosBaseExpediente",
      "pasaContextoBase": true,
      "lineaInicio": 13,
      "lineaFin": 15
    },
    {
      "helperNombre": "construirLineasTiempoConcentracionRolesTcExpediente",
      "pasaContextoBase": false,
      "lineaInicio": 17,
      "lineaFin": 20
    },
    {
      "helperNombre": "construirLineasVolumenReferenciaExpediente",
      "pasaContextoBase": false,
      "lineaInicio": 22,
      "lineaFin": 25
    },
    {
      "helperNombre": "construirLineasEscenarioQTrActivoExpediente",
      "pasaContextoBase": false,
      "lineaInicio": 27,
      "lineaFin": 32
    },
    {
      "helperNombre": "construirLineasResumenQ5AuditadoExpediente",
      "pasaContextoBase": false,
      "lineaInicio": 34,
      "lineaFin": 36
    }
  ],
  "encabezadosLiteralesDetectados": [
    {
      "linea": 2,
      "encabezado": "# Expediente hidrológico mínimo — Cuenca activa"
    },
    {
      "linea": 37,
      "encabezado": "## 7. Método Racional — contraste global independiente"
    },
    {
      "linea": 63,
      "encabezado": "## 8. Contraste Q-5 vs Método Racional"
    },
    {
      "linea": 69,
      "encabezado": "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5"
    },
    {
      "linea": 83,
      "encabezado": "## Diagnóstico temporal Q(t) no adoptivo"
    }
  ],
  "candidatosPrudentes": [
    "construirLineasIdentificacionExpediente",
    "construirLineasParametrosHidrologicosBaseExpediente",
    "construirLineasTiempoConcentracionRolesTcExpediente"
  ],
  "decisionPreliminar": "usar inventario real para seleccionar siguiente bloque integrado"
}
```

## Helpers expandidos dentro de textoExpediente

### construirLineasIdentificacionExpediente

```javascript
            ...construirLineasIdentificacionExpediente({
              contextoBase,
              fuenteFallback: "HidroFlow",
              estacionIdfFallback: estacionIdfExpediente
            }),
```

### construirLineasParametrosHidrologicosBaseExpediente

```javascript
            ...construirLineasParametrosHidrologicosBaseExpediente({
              contextoBase
            }),
```

### construirLineasTiempoConcentracionRolesTcExpediente

```javascript
            ...construirLineasTiempoConcentracionRolesTcExpediente({
              Tc_final,
              trDisenoActivoExpediente
            }),
```

### construirLineasVolumenReferenciaExpediente

```javascript
            ...construirLineasVolumenReferenciaExpediente({
              peTotalMm,
              volumenEsperadoM3
            }),
```

### construirLineasEscenarioQTrActivoExpediente

```javascript
                ...construirLineasEscenarioQTrActivoExpediente({
                  estadoQTrActivoExpediente,
                  qTrActivoExpediente,
                  faltantesQTrActivoExpediente,
                  formatearValorQTrExpediente
                }),
```

### construirLineasResumenQ5AuditadoExpediente

```javascript
            ...construirLineasResumenQ5AuditadoExpediente({
              tablaQ5Markdown
            }),
```

## Encabezados literales detectados

- Línea 2: # Expediente hidrológico mínimo — Cuenca activa
- Línea 37: ## 7. Método Racional — contraste global independiente
- Línea 63: ## 8. Contraste Q-5 vs Método Racional
- Línea 69: ## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5
- Línea 83: ## Diagnóstico temporal Q(t) no adoptivo

## Candidatos prudentes derivados del inventario

- construirLineasIdentificacionExpediente
- construirLineasParametrosHidrologicosBaseExpediente
- construirLineasTiempoConcentracionRolesTcExpediente

## Lectura técnica

- La revisión se limita al segmento `textoExpediente` dentro de `ComparadorMultiMetodo.jsx`.
- No se modificó ningún archivo operativo.
- El inventario debe usarse como base para seleccionar el próximo bloque, evitando candidatos no integrados.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `textoExpediente`.
- No se modificó botón de copiado.
- No se modificó portapapeles.
- No se tocó Q-5 operativo.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocó motor hidrológico.