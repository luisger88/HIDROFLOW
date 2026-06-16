# OT-0184B — Trazabilidad composición bloque Identificación

## Resumen

```json
{
  "textoExpedienteDetectado": true,
  "cierreTextoExpedienteDetectado": true,
  "helperIdentificacionDetectado": true,
  "helperDentroDeTextoExpediente": true,
  "encabezadoLiteralDentroDeTextoExpediente": false,
  "encabezadoTextoDentroDeTextoExpediente": false,
  "diagnosticoOt0125dDetectado": true,
  "diagnosticoDespuesDeTextoExpediente": true,
  "areaTextoUsaTextoExpediente": true,
  "promptUsaTextoExpediente": true,
  "totalContextos": 64,
  "decisionPreliminar": "la identificación parece delegada dentro de textoExpediente por helper"
}
```

## Contextos encontrados

### Contexto 1 — patrón `construirLineasIdentificacionExpediente` línea 10

```javascript
import { setTcState } from "../agents/tcAgent";
import { calcTc, mapTcResultados } from "../services/hidroEngine";
import { seleccionarTc } from "../services/tcSelector";
import { derivarRangoCompetenteTc } from "../services/tc/derivarRangoCompetenteTc";
import adaptarExpedienteDocumental from "../services/documentos/adaptarExpedienteDocumental";
import construirExpedienteHidrologicoMinimo, {
  construirLineasIdentificacionExpediente,
  construirLineasParametrosHidrologicosBaseExpediente,
  construirLineasTiempoConcentracionRolesTcExpediente,
  construirLineasVolumenReferenciaExpediente,
  construirLineasEscenarioQTrActivoExpediente,
  construirLineasSelloTecnicoAuxiliarExpediente
} from "../services/documentos/construirExpedienteHidrologicoMinimo";
```

### Contexto 2 — patrón `construirLineasIdentificacionExpediente` línea 2089

```javascript
          const textoExpediente = [
            "# Expediente hidrológico mínimo — Cuenca activa",
            "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
            "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
            "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
            "",
            ...construirLineasIdentificacionExpediente({
              contextoBase,
              fuenteFallback: "HidroFlow",
              estacionIdfFallback: estacionIdfExpediente
            }),
            "",
            ...construirLineasParametrosHidrologicosBaseExpediente({
```

### Contexto 3 — patrón `construirLineasIdentificacionExpediente` línea 2445

```javascript
            );
          }
          // OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasIdentificacionDelegadaDiagnostico =
              construirLineasIdentificacionExpediente({
                contextoBase,
                fuenteFallback: "HidroFlow",
                estacionIdfFallback: estacionIdfExpediente
              });

            const textoIdentificacionDelegadaDiagnostico =
```

### Contexto 4 — patrón `lineasIdentificacion` línea 2444

```javascript
              errorDiagnosticoParametrosBaseDelegado
            );
          }
          // OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasIdentificacionDelegadaDiagnostico =
              construirLineasIdentificacionExpediente({
                contextoBase,
                fuenteFallback: "HidroFlow",
                estacionIdfFallback: estacionIdfExpediente
              });

```

### Contexto 5 — patrón `lineasIdentificacion` línea 2452

```javascript
                contextoBase,
                fuenteFallback: "HidroFlow",
                estacionIdfFallback: estacionIdfExpediente
              });

            const textoIdentificacionDelegadaDiagnostico =
              Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.join("\n")
                : "";

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
```

### Contexto 6 — patrón `lineasIdentificacion` línea 2453

```javascript
                fuenteFallback: "HidroFlow",
                estacionIdfFallback: estacionIdfExpediente
              });

            const textoIdentificacionDelegadaDiagnostico =
              Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.join("\n")
                : "";

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
```

### Contexto 7 — patrón `lineasIdentificacion` línea 2457

```javascript
            const textoIdentificacionDelegadaDiagnostico =
              Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.join("\n")
                : "";

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
```

### Contexto 8 — patrón `lineasIdentificacion` línea 2458

```javascript
              Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.join("\n")
                : "";

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
              delegadoContieneCuenca:
```

### Contexto 9 — patrón `Identificación` línea 2441

```javascript
          } catch (errorDiagnosticoParametrosBaseDelegado) {
            console.warn(
              "Diagnóstico Parámetros hidrológicos base delegado no invasivo no ejecutado:",
              errorDiagnosticoParametrosBaseDelegado
            );
          }
          // OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasIdentificacionDelegadaDiagnostico =
              construirLineasIdentificacionExpediente({
                contextoBase,
                fuenteFallback: "HidroFlow",
```

### Contexto 10 — patrón `Identificación` línea 2461

```javascript

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
              delegadoContieneCuenca:
                textoIdentificacionDelegadaDiagnostico.includes("Cuenca:"),
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
```

### Contexto 11 — patrón `Identificación` línea 2463

```javascript
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
              delegadoContieneCuenca:
                textoIdentificacionDelegadaDiagnostico.includes("Cuenca:"),
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
            };

```

### Contexto 12 — patrón `Identificación` línea 2478

```javascript
              !diagnosticoIdentificacionDelegada.contieneEncabezadoDelegado ||
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
              !diagnosticoIdentificacionDelegada.delegadoContieneCuenca ||
              !diagnosticoIdentificacionDelegada.operativoContieneCuenca
            ) {
              console.warn(
                "Diagnóstico Identificación delegada no invasivo:",
                diagnosticoIdentificacionDelegada
              );
            }
          } catch (errorDiagnosticoIdentificacionDelegada) {
            console.warn(
              "Diagnóstico Identificación delegada no invasivo no ejecutado:",
```

### Contexto 13 — patrón `Identificación` línea 2484

```javascript
                "Diagnóstico Identificación delegada no invasivo:",
                diagnosticoIdentificacionDelegada
              );
            }
          } catch (errorDiagnosticoIdentificacionDelegada) {
            console.warn(
              "Diagnóstico Identificación delegada no invasivo no ejecutado:",
              errorDiagnosticoIdentificacionDelegada
            );
          }
  // OT-0114B — Comparación runtime no invasiva helper vs textoExpediente.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
```

### Contexto 14 — patrón `textoExpediente` línea 2020

```javascript
            filasDictamenFormaQt,
            filasRiesgoTemporalQt,
            sintesisRiesgoTemporalQt
          });

          // OT-0113B — Diagnóstico no invasivo del helper puro del expediente.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          let diagnosticoHelperExpediente = null;

          try {
            diagnosticoHelperExpediente = construirExpedienteHidrologicoMinimo({
              contextoBase,
              Tc_final,
```

### Contexto 15 — patrón `textoExpediente` línea 2083

```javascript
            console.warn("[expediente] Brecha diagnóstico Resumen Q-5 auditado delegado vs operativo", {
              delegado: lineasResumenQ5AuditadoDelegadoDiagnostico,
              operativo: lineasResumenQ5AuditadoOperativoDiagnostico
            });
          }

          const textoExpediente = [
            "# Expediente hidrológico mínimo — Cuenca activa",
            "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
            "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
            "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
            "",
            ...construirLineasIdentificacionExpediente({
```

### Contexto 16 — patrón `textoExpediente` línea 2206

```javascript
            "- No se modifica el motor hidrológico.",
            "- No se recalculan hidrogramas en este expediente.",
            "- No se alteran Qp, Tp, Volumen ni Q(t).",
            "",
          ].join("\n");
          // OT-0166 — Diagnóstico no invasivo del bloque Escenario Q-Tr activo delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasEscenarioQTrActivoDelegadasDiagnostico =
              construirLineasEscenarioQTrActivoExpediente({
                estadoQTrActivoExpediente,
                qTrActivoExpediente,
                faltantesQTrActivoExpediente,
```

### Contexto 17 — patrón `textoExpediente` línea 2228

```javascript
              lineasDelegadas: Array.isArray(lineasEscenarioQTrActivoDelegadasDiagnostico)
                ? lineasEscenarioQTrActivoDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
              delegadoContieneEstado:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Estado:"),
              operativoContieneEstado:
                textoExpediente.includes("Estado:"),
              delegadoContieneTrActivo:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Tr activo:"),
```

### Contexto 18 — patrón `textoExpediente` línea 2232

```javascript
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
              delegadoContieneEstado:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Estado:"),
              operativoContieneEstado:
                textoExpediente.includes("Estado:"),
              delegadoContieneTrActivo:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Tr activo:"),
              operativoContieneTrActivo:
                textoExpediente.includes("Tr activo:"),
              delegadoContieneCamposMinimos:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Campos mínimos:"),
```

### Contexto 19 — patrón `textoExpediente` línea 2236

```javascript
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Estado:"),
              operativoContieneEstado:
                textoExpediente.includes("Estado:"),
              delegadoContieneTrActivo:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Tr activo:"),
              operativoContieneTrActivo:
                textoExpediente.includes("Tr activo:"),
              delegadoContieneCamposMinimos:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Campos mínimos:"),
              operativoContieneCamposMinimos:
                textoExpediente.includes("Campos mínimos:"),
              delegadoContieneFuente:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Fuente:"),
```

### Contexto 20 — patrón `textoExpediente` línea 2240

```javascript
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Tr activo:"),
              operativoContieneTrActivo:
                textoExpediente.includes("Tr activo:"),
              delegadoContieneCamposMinimos:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Campos mínimos:"),
              operativoContieneCamposMinimos:
                textoExpediente.includes("Campos mínimos:"),
              delegadoContieneFuente:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Fuente:"),
              operativoContieneFuente:
                textoExpediente.includes("Fuente:"),
              delegadoContieneLecturaTecnica:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."),
```

### Contexto 21 — patrón `textoExpediente` línea 2244

```javascript
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Campos mínimos:"),
              operativoContieneCamposMinimos:
                textoExpediente.includes("Campos mínimos:"),
              delegadoContieneFuente:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Fuente:"),
              operativoContieneFuente:
                textoExpediente.includes("Fuente:"),
              delegadoContieneLecturaTecnica:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."),
              operativoContieneLecturaTecnica:
                textoExpediente.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.")
            };

```

### Contexto 22 — patrón `textoExpediente` línea 2248

```javascript
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Fuente:"),
              operativoContieneFuente:
                textoExpediente.includes("Fuente:"),
              delegadoContieneLecturaTecnica:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."),
              operativoContieneLecturaTecnica:
                textoExpediente.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.")
            };

            if (
              diagnosticoEscenarioQTrActivoDelegado.lineasDelegadas !== 16 ||
              !diagnosticoEscenarioQTrActivoDelegado.contieneEncabezadoDelegado ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneEncabezado ||
```

### Contexto 23 — patrón `textoExpediente` línea 2279

```javascript
              "Diagnóstico Escenario Q-Tr activo delegado no invasivo no ejecutado:",
              errorDiagnosticoEscenarioQTrActivoDelegado
            );
          }

          // OT-0156 — Diagnóstico no invasivo del bloque Volumen de referencia delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasVolumenReferenciaDelegadasDiagnostico =
              construirLineasVolumenReferenciaExpediente({
                peTotalMm,
                volumenEsperadoM3
              });
```

### Contexto 24 — patrón `textoExpediente` línea 2299

```javascript
              lineasDelegadas: Array.isArray(lineasVolumenReferenciaDelegadasDiagnostico)
                ? lineasVolumenReferenciaDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoVolumenReferenciaDelegadoDiagnostico.includes("## 4. Volumen de referencia"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 4. Volumen de referencia"),
              delegadoContieneLluvia:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Lluvia efectiva total:"),
              operativoContieneLluvia:
                textoExpediente.includes("Lluvia efectiva total:"),
              delegadoContieneVolumen:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Volumen esperado:"),
```

### Contexto 25 — patrón `textoExpediente` línea 2303

```javascript
                textoVolumenReferenciaDelegadoDiagnostico.includes("## 4. Volumen de referencia"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 4. Volumen de referencia"),
              delegadoContieneLluvia:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Lluvia efectiva total:"),
              operativoContieneLluvia:
                textoExpediente.includes("Lluvia efectiva total:"),
              delegadoContieneVolumen:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Volumen esperado:"),
              operativoContieneVolumen:
                textoExpediente.includes("Volumen esperado:"),
              delegadoContieneFormula:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Fórmula: Pe(mm) × Área(km²) × 1000."),
```

### Contexto 26 — patrón `textoExpediente` línea 2307

```javascript
                textoVolumenReferenciaDelegadoDiagnostico.includes("Lluvia efectiva total:"),
              operativoContieneLluvia:
                textoExpediente.includes("Lluvia efectiva total:"),
              delegadoContieneVolumen:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Volumen esperado:"),
              operativoContieneVolumen:
                textoExpediente.includes("Volumen esperado:"),
              delegadoContieneFormula:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Fórmula: Pe(mm) × Área(km²) × 1000."),
              operativoContieneFormula:
                textoExpediente.includes("Fórmula: Pe(mm) × Área(km²) × 1000.")
            };

```

### Contexto 27 — patrón `textoExpediente` línea 2311

```javascript
                textoVolumenReferenciaDelegadoDiagnostico.includes("Volumen esperado:"),
              operativoContieneVolumen:
                textoExpediente.includes("Volumen esperado:"),
              delegadoContieneFormula:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Fórmula: Pe(mm) × Área(km²) × 1000."),
              operativoContieneFormula:
                textoExpediente.includes("Fórmula: Pe(mm) × Área(km²) × 1000.")
            };

            if (
              diagnosticoVolumenReferenciaDelegado.lineasDelegadas !== 4 ||
              !diagnosticoVolumenReferenciaDelegado.contieneEncabezadoDelegado ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneEncabezado ||
```

### Contexto 28 — patrón `textoExpediente` línea 2338

```javascript
              "Diagnóstico Volumen de referencia delegado no invasivo no ejecutado:",
              errorDiagnosticoVolumenReferenciaDelegado
            );
          }

          // OT-0146 — Diagnóstico no invasivo del bloque Tiempo de concentración y roles Tc delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasTiempoConcentracionDelegadasDiagnostico =
              construirLineasTiempoConcentracionRolesTcExpediente({
                Tc_final,
                trDisenoActivoExpediente
              });
```

### Contexto 29 — patrón `textoExpediente` línea 2358

```javascript
              lineasDelegadas: Array.isArray(lineasTiempoConcentracionDelegadasDiagnostico)
                ? lineasTiempoConcentracionDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoTiempoConcentracionDelegadoDiagnostico.includes("## 3. Tiempo de concentración y roles Tc"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 3. Tiempo de concentración y roles Tc"),
              delegadoContieneTcComparador:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tc comparador:"),
              operativoContieneTcComparador:
                textoExpediente.includes("Tc comparador:"),
              delegadoContieneTrGlobal:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tr global activo:"),
```

### Contexto 30 — patrón `textoExpediente` línea 2362

```javascript
                textoTiempoConcentracionDelegadoDiagnostico.includes("## 3. Tiempo de concentración y roles Tc"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 3. Tiempo de concentración y roles Tc"),
              delegadoContieneTcComparador:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tc comparador:"),
              operativoContieneTcComparador:
                textoExpediente.includes("Tc comparador:"),
              delegadoContieneTrGlobal:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tr global activo:"),
              operativoContieneTrGlobal:
                textoExpediente.includes("Tr global activo:"),
              delegadoContieneRoles:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Roles Tc:"),
```

### Contexto 31 — patrón `textoExpediente` línea 2366

```javascript
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tc comparador:"),
              operativoContieneTcComparador:
                textoExpediente.includes("Tc comparador:"),
              delegadoContieneTrGlobal:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tr global activo:"),
              operativoContieneTrGlobal:
                textoExpediente.includes("Tr global activo:"),
              delegadoContieneRoles:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Roles Tc:"),
              operativoContieneRoles:
                textoExpediente.includes("Roles Tc:")
            };

```

### Contexto 32 — patrón `textoExpediente` línea 2370

```javascript
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tr global activo:"),
              operativoContieneTrGlobal:
                textoExpediente.includes("Tr global activo:"),
              delegadoContieneRoles:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Roles Tc:"),
              operativoContieneRoles:
                textoExpediente.includes("Roles Tc:")
            };

            if (
              diagnosticoTiempoConcentracionDelegado.lineasDelegadas !== 10 ||
              !diagnosticoTiempoConcentracionDelegado.contieneEncabezadoDelegado ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneEncabezado ||
```

### Contexto 33 — patrón `textoExpediente` línea 2397

```javascript
              "Diagnóstico Tiempo de concentración delegado no invasivo no ejecutado:",
              errorDiagnosticoTiempoConcentracionDelegado
            );
          }

          // OT-0135 — Diagnóstico no invasivo del bloque Parámetros hidrológicos base delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasParametrosBaseDelegadasDiagnostico =
              construirLineasParametrosHidrologicosBaseExpediente({
                contextoBase
              });

```

### Contexto 34 — patrón `textoExpediente` línea 2416

```javascript
              lineasDelegadas: Array.isArray(lineasParametrosBaseDelegadasDiagnostico)
                ? lineasParametrosBaseDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoParametrosBaseDelegadoDiagnostico.includes("## 2. Parámetros hidrológicos base"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 2. Parámetros hidrológicos base"),
              delegadoContieneCN:
                textoParametrosBaseDelegadoDiagnostico.includes("CN:"),
              operativoContieneCN:
                textoExpediente.includes("CN:")
            };

```

### Contexto 35 — patrón `textoExpediente` línea 2420

```javascript
                textoParametrosBaseDelegadoDiagnostico.includes("## 2. Parámetros hidrológicos base"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 2. Parámetros hidrológicos base"),
              delegadoContieneCN:
                textoParametrosBaseDelegadoDiagnostico.includes("CN:"),
              operativoContieneCN:
                textoExpediente.includes("CN:")
            };

            if (
              diagnosticoParametrosBaseDelegado.lineasDelegadas !== 5 ||
              !diagnosticoParametrosBaseDelegado.contieneEncabezadoDelegado ||
              !diagnosticoParametrosBaseDelegado.operativoContieneEncabezado ||
```

### Contexto 36 — patrón `textoExpediente` línea 2442

```javascript
            console.warn(
              "Diagnóstico Parámetros hidrológicos base delegado no invasivo no ejecutado:",
              errorDiagnosticoParametrosBaseDelegado
            );
          }
          // OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasIdentificacionDelegadaDiagnostico =
              construirLineasIdentificacionExpediente({
                contextoBase,
                fuenteFallback: "HidroFlow",
                estacionIdfFallback: estacionIdfExpediente
```

### Contexto 37 — patrón `textoExpediente` línea 2463

```javascript
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
              delegadoContieneCuenca:
                textoIdentificacionDelegadaDiagnostico.includes("Cuenca:"),
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
            };

```

### Contexto 38 — patrón `textoExpediente` línea 2467

```javascript
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
              delegadoContieneCuenca:
                textoIdentificacionDelegadaDiagnostico.includes("Cuenca:"),
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
            };

            if (
              diagnosticoIdentificacionDelegada.lineasDelegadas !== 7 ||
              !diagnosticoIdentificacionDelegada.contieneEncabezadoDelegado ||
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
```

### Contexto 39 — patrón `textoExpediente` línea 2488

```javascript
          } catch (errorDiagnosticoIdentificacionDelegada) {
            console.warn(
              "Diagnóstico Identificación delegada no invasivo no ejecutado:",
              errorDiagnosticoIdentificacionDelegada
            );
          }
  // OT-0114B — Comparación runtime no invasiva helper vs textoExpediente.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const textoHelperExpediente = diagnosticoHelperExpediente?.texto ?? "";

            const marcadoresRuntimeExpediente = [
              "# Expediente hidrológico mínimo — Cuenca activa",
```

### Contexto 40 — patrón `textoExpediente` línea 2489

```javascript
            console.warn(
              "Diagnóstico Identificación delegada no invasivo no ejecutado:",
              errorDiagnosticoIdentificacionDelegada
            );
          }
  // OT-0114B — Comparación runtime no invasiva helper vs textoExpediente.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const textoHelperExpediente = diagnosticoHelperExpediente?.texto ?? "";

            const marcadoresRuntimeExpediente = [
              "# Expediente hidrológico mínimo — Cuenca activa",
              "## 5. Escenario Q-Tr activo — control de trazabilidad",
```

### Contexto 41 — patrón `textoExpediente` línea 2518

```javascript

            const marcadoresFaltantesEnHelper = marcadoresRuntimeExpediente.filter(
              (marcador) => !textoHelperExpediente.includes(marcador)
            );

            const marcadoresFaltantesEnOperativo = marcadoresRuntimeExpediente.filter(
              (marcador) => !textoExpediente.includes(marcador)
            );

            const tokensHelper = tokensInvalidosRuntimeExpediente.filter((token) =>
              textoHelperExpediente.includes(token)
            );

```

### Contexto 42 — patrón `textoExpediente` línea 2526

```javascript

            const tokensHelper = tokensInvalidosRuntimeExpediente.filter((token) =>
              textoHelperExpediente.includes(token)
            );

            const tokensOperativo = tokensInvalidosRuntimeExpediente.filter((token) =>
              textoExpediente.includes(token)
            );

            const brechasRuntimeExpediente = [
              ...marcadoresFaltantesEnHelper.map(
                (marcador) => `Helper sin marcador: ${marcador}`
              ),
```

### Contexto 43 — patrón `textoExpediente` línea 2544

```javascript
            ];

            if (brechasRuntimeExpediente.length > 0) {
              console.warn("Comparación runtime helper vs expediente operativo:", {
                brechas: brechasRuntimeExpediente,
                longitudHelper: textoHelperExpediente.length,
                longitudOperativo: textoExpediente.length
              });
            }
          } catch (errorComparacionRuntimeExpediente) {
            console.warn(
              "Comparación runtime helper vs expediente operativo no ejecutada:",
              errorComparacionRuntimeExpediente
```

### Contexto 44 — patrón `textoExpediente` línea 2554

```javascript
            console.warn(
              "Comparación runtime helper vs expediente operativo no ejecutada:",
              errorComparacionRuntimeExpediente
            );
          }
          try {
            const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
              fuenteExpediente: "ComparadorMultiMetodo.textoExpediente",
              origenPlantilla: "OT-0064",
              cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
            });

            if (!diagnosticoDocumentalExpediente.ok) {
```

### Contexto 45 — patrón `textoExpediente` línea 2555

```javascript
              "Comparación runtime helper vs expediente operativo no ejecutada:",
              errorComparacionRuntimeExpediente
            );
          }
          try {
            const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
              fuenteExpediente: "ComparadorMultiMetodo.textoExpediente",
              origenPlantilla: "OT-0064",
              cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
            });

            if (!diagnosticoDocumentalExpediente.ok) {
              console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
```

### Contexto 46 — patrón `textoExpediente` línea 2570

```javascript
            console.warn("Diagnóstico documental no invasivo no ejecutado:", errorDiagnosticoDocumental);
          }

              // OT-0056E valida expediente copiado antes de enviarlo al portapapeles.
              const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
              const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
                textoExpediente.includes(token)
              );

              const seccionesObligatoriasExpediente = [
                "# Expediente hidrológico mínimo — Cuenca activa",
                "## 5. Escenario Q-Tr activo — control de trazabilidad",
                "## 6. Resumen Q-5 auditado",
```

### Contexto 47 — patrón `textoExpediente` línea 2586

```javascript
                "## Diagnóstico temporal Q(t) no adoptivo",
                "## 10. Validación interna del expediente exportado",
                "## 11. Sello técnico de generación",
                "## 12. Restricciones y advertencias técnicas"
              ];
              const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
                !textoExpediente.includes(seccion)
              );

              // OT-0088C — Validación textual estricta de diagnóstico temporal Q(t).
              const validacionDiagnosticoTemporalQt =
                validarSeccionDiagnosticoTemporalQt(textoExpediente);

```

### Contexto 48 — patrón `textoExpediente` línea 2591

```javascript
              const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
                !textoExpediente.includes(seccion)
              );

              // OT-0088C — Validación textual estricta de diagnóstico temporal Q(t).
              const validacionDiagnosticoTemporalQt =
                validarSeccionDiagnosticoTemporalQt(textoExpediente);

              if (
                tokensDetectadosExpediente.length > 0 ||
                seccionesFaltantesExpediente.length > 0 ||
                !validacionDiagnosticoTemporalQt.ok
              ) {
```

### Contexto 49 — patrón `textoExpediente` línea 2649

```javascript

                return;
              }

               
          const areaTexto = document.createElement("textarea");
          areaTexto.value = textoExpediente;
          areaTexto.setAttribute("readonly", "");
          areaTexto.style.position = "fixed";
          areaTexto.style.left = "-9999px";
          areaTexto.style.top = "-9999px";
          document.body.appendChild(areaTexto);
          areaTexto.focus();
```

### Contexto 50 — patrón `textoExpediente` línea 2671

```javascript

          document.body.removeChild(areaTexto);

          if (copiado) {
            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
          } else {
            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
          }        }}
        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
      >
        Copiar expediente hidrológico mínimo
      </button>
      {(() => {
```

### Contexto 51 — patrón `OT-0125D` línea 2441

```javascript
          } catch (errorDiagnosticoParametrosBaseDelegado) {
            console.warn(
              "Diagnóstico Parámetros hidrológicos base delegado no invasivo no ejecutado:",
              errorDiagnosticoParametrosBaseDelegado
            );
          }
          // OT-0125D — Diagnóstico no invasivo del bloque Identificación delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasIdentificacionDelegadaDiagnostico =
              construirLineasIdentificacionExpediente({
                contextoBase,
                fuenteFallback: "HidroFlow",
```

### Contexto 52 — patrón `textoIdentificacionDelegadaDiagnostico` línea 2451

```javascript
              construirLineasIdentificacionExpediente({
                contextoBase,
                fuenteFallback: "HidroFlow",
                estacionIdfFallback: estacionIdfExpediente
              });

            const textoIdentificacionDelegadaDiagnostico =
              Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.join("\n")
                : "";

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
```

### Contexto 53 — patrón `textoIdentificacionDelegadaDiagnostico` línea 2461

```javascript

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
              delegadoContieneCuenca:
                textoIdentificacionDelegadaDiagnostico.includes("Cuenca:"),
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
```

### Contexto 54 — patrón `textoIdentificacionDelegadaDiagnostico` línea 2465

```javascript
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 1. Identificación"),
              delegadoContieneCuenca:
                textoIdentificacionDelegadaDiagnostico.includes("Cuenca:"),
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
            };

            if (
              diagnosticoIdentificacionDelegada.lineasDelegadas !== 7 ||
```

### Contexto 55 — patrón `diagnosticoIdentificacionDelegada` línea 2456

```javascript

            const textoIdentificacionDelegadaDiagnostico =
              Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.join("\n")
                : "";

            const diagnosticoIdentificacionDelegada = {
              lineasDelegadas: Array.isArray(lineasIdentificacionDelegadaDiagnostico)
                ? lineasIdentificacionDelegadaDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoIdentificacionDelegadaDiagnostico.includes("## 1. Identificación"),
              operativoContieneEncabezado:
```

### Contexto 56 — patrón `diagnosticoIdentificacionDelegada` línea 2471

```javascript
                textoIdentificacionDelegadaDiagnostico.includes("Cuenca:"),
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
            };

            if (
              diagnosticoIdentificacionDelegada.lineasDelegadas !== 7 ||
              !diagnosticoIdentificacionDelegada.contieneEncabezadoDelegado ||
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
              !diagnosticoIdentificacionDelegada.delegadoContieneCuenca ||
              !diagnosticoIdentificacionDelegada.operativoContieneCuenca
            ) {
              console.warn(
```

### Contexto 57 — patrón `diagnosticoIdentificacionDelegada` línea 2472

```javascript
              operativoContieneCuenca:
                textoExpediente.includes("Cuenca:")
            };

            if (
              diagnosticoIdentificacionDelegada.lineasDelegadas !== 7 ||
              !diagnosticoIdentificacionDelegada.contieneEncabezadoDelegado ||
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
              !diagnosticoIdentificacionDelegada.delegadoContieneCuenca ||
              !diagnosticoIdentificacionDelegada.operativoContieneCuenca
            ) {
              console.warn(
                "Diagnóstico Identificación delegada no invasivo:",
```

### Contexto 58 — patrón `diagnosticoIdentificacionDelegada` línea 2473

```javascript
                textoExpediente.includes("Cuenca:")
            };

            if (
              diagnosticoIdentificacionDelegada.lineasDelegadas !== 7 ||
              !diagnosticoIdentificacionDelegada.contieneEncabezadoDelegado ||
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
              !diagnosticoIdentificacionDelegada.delegadoContieneCuenca ||
              !diagnosticoIdentificacionDelegada.operativoContieneCuenca
            ) {
              console.warn(
                "Diagnóstico Identificación delegada no invasivo:",
                diagnosticoIdentificacionDelegada
```

### Contexto 59 — patrón `diagnosticoIdentificacionDelegada` línea 2474

```javascript
            };

            if (
              diagnosticoIdentificacionDelegada.lineasDelegadas !== 7 ||
              !diagnosticoIdentificacionDelegada.contieneEncabezadoDelegado ||
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
              !diagnosticoIdentificacionDelegada.delegadoContieneCuenca ||
              !diagnosticoIdentificacionDelegada.operativoContieneCuenca
            ) {
              console.warn(
                "Diagnóstico Identificación delegada no invasivo:",
                diagnosticoIdentificacionDelegada
              );
```

### Contexto 60 — patrón `diagnosticoIdentificacionDelegada` línea 2475

```javascript

            if (
              diagnosticoIdentificacionDelegada.lineasDelegadas !== 7 ||
              !diagnosticoIdentificacionDelegada.contieneEncabezadoDelegado ||
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
              !diagnosticoIdentificacionDelegada.delegadoContieneCuenca ||
              !diagnosticoIdentificacionDelegada.operativoContieneCuenca
            ) {
              console.warn(
                "Diagnóstico Identificación delegada no invasivo:",
                diagnosticoIdentificacionDelegada
              );
            }
```

### Contexto 61 — patrón `diagnosticoIdentificacionDelegada` línea 2479

```javascript
              !diagnosticoIdentificacionDelegada.operativoContieneEncabezado ||
              !diagnosticoIdentificacionDelegada.delegadoContieneCuenca ||
              !diagnosticoIdentificacionDelegada.operativoContieneCuenca
            ) {
              console.warn(
                "Diagnóstico Identificación delegada no invasivo:",
                diagnosticoIdentificacionDelegada
              );
            }
          } catch (errorDiagnosticoIdentificacionDelegada) {
            console.warn(
              "Diagnóstico Identificación delegada no invasivo no ejecutado:",
              errorDiagnosticoIdentificacionDelegada
```

### Contexto 62 — patrón `areaTexto.value = textoExpediente` línea 2649

```javascript

                return;
              }

               
          const areaTexto = document.createElement("textarea");
          areaTexto.value = textoExpediente;
          areaTexto.setAttribute("readonly", "");
          areaTexto.style.position = "fixed";
          areaTexto.style.left = "-9999px";
          areaTexto.style.top = "-9999px";
          document.body.appendChild(areaTexto);
          areaTexto.focus();
```

### Contexto 63 — patrón `window.prompt` línea 1764

```javascript

          document.body.removeChild(areaTextoResumen);

          if (resumenCopiado) {
            window.alert("Resumen técnico Q-5 copiado al portapapeles.");
          } else {
            window.prompt("No fue posible copiar automáticamente. Copie manualmente el resumen técnico Q-5:", textoResumenQ5);
          }
        }}
        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px" }}
      >
        Copiar resumen técnico Q-5
      </button>
```

### Contexto 64 — patrón `window.prompt` línea 2671

```javascript

          document.body.removeChild(areaTexto);

          if (copiado) {
            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
          } else {
            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
          }        }}
        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
      >
        Copiar expediente hidrológico mínimo
      </button>
      {(() => {
```

## Lectura preliminar

- El helper de identificación aparece dentro del segmento `textoExpediente`.

- El encabezado literal `"## 1. Identificación"` no aparece dentro del segmento `textoExpediente`.

- El texto `## 1. Identificación` no aparece dentro del segmento `textoExpediente`.

- El diagnóstico OT-0125D aparece después del cierre de `textoExpediente`.

- El copiado sigue usando `areaTexto.value = textoExpediente`.

- El fallback manual sigue usando `window.prompt(..., textoExpediente)`.

## Decisión preliminar

la identificación parece delegada dentro de textoExpediente por helper

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