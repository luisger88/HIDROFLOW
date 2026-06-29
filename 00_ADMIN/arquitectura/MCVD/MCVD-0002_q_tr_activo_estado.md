# MCVD-0002 — q_tr_activo_estado

Fecha:
2026-06-29 09:39:28

## Entidad

Nombre:
q_tr_activo_estado

Tipo:
Entidad de Gobierno Hidrológico

Estado Auditoría:
AUDITADA Y CONGELADA

Criticidad:
CRÍTICA

---

## Propósito

Representa el escenario hidrológico activo consolidado.

No calcula caudales.

No modifica Q-5.

No ejecuta cálculos hidráulicos.

No toca hidroEngine.

No toca tcSelector.

Su responsabilidad es consolidar, validar y transportar la identidad del escenario Q-Tr activo para consumo por comparadores, expedientes, payloads y procesos de exportación.

---

## Productor Oficial

Archivo:

01_APP/HIDROFLOW/src/services/qtr/derivarEstadoQTrActivo.js

Función:

derivarEstadoQTrActivo(contexto = {})

Tipo:

Adaptador puro Q-Tr activo.

---

## Contrato Externo

Campos:

- fuente
- tipo
- estado
- disponible
- campos_faltantes
- q_tr_activo

Estructura lógica:

{
  fuente,
  tipo,
  estado,
  disponible,
  campos_faltantes,
  q_tr_activo
}

---

## Contrato Interno

Entidad interna:

q_tr_activo

Campos:

- tr_activo
- estacion_idf
- metodo_idf
- distribucion_temporal
- area_km2
- cn_base
- cn_efectivo
- amc
- s_mm
- ia_mm
- porcentaje_impermeable
- tc_min
- lluvia_efectiva_total_mm

Estructura lógica:

q_tr_activo {
  tr_activo,
  estacion_idf,
  metodo_idf,
  distribucion_temporal,
  area_km2,
  cn_base,
  cn_efectivo,
  amc,
  s_mm,
  ia_mm,
  porcentaje_impermeable,
  tc_min,
  lluvia_efectiva_total_mm
}

---

## Campos Mínimos Obligatorios

Definidos por CAMPOS_MINIMOS_QTR_ACTIVO:

- tr_activo
- estacion_idf
- metodo_idf
- distribucion_temporal
- area_km2
- cn_efectivo
- s_mm
- ia_mm
- porcentaje_impermeable
- tc_min
- lluvia_efectiva_total_mm

---

## Estados Operacionales

- disponible
- incompleto

---

## Regla de Disponibilidad

disponible = camposFaltantes.length === 0

---

## Publicadores Confirmados

Archivo:

01_APP/HIDROFLOW/src/HidroFlow.jsx

Puntos confirmados:

- Inicialización del contexto.
- Actualización del contexto hidrológico.
- Publicación hacia contextoBase.
- Republicación durante actualización de escenario.
- Preservación y refresco controlado del estado Q-Tr activo.

---

## Flujo de Transporte

derivarEstadoQTrActivo()
        ↓
q_tr_activo_estado
        ↓
HidroFlow.jsx
        ↓
contextoBase
        ↓
ComparadorMultiMetodo
        ↓
Expediente Hidrológico
        ↓
Payload Expediente
        ↓
Exportaciones

---

## Consumidores Confirmados

- 01_APP/HIDROFLOW/src/HidroFlow.jsx
- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx
- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
- 01_APP/HIDROFLOW/src/services/documentos/construirPayloadExpedienteDesdeEstado.js

---

## Visualizaciones Confirmadas

- Comparador MultiMétodo
- Estado Q-Tr
- Tc asociado al escenario activo
- Narrativas Q-Tr
- Validación visual de estado disponible / incompleto

---

## Exportadores Confirmados

- ComparadorMultiMetodo.jsx
- construirExpedienteHidrologicoMinimo.js
- construirPayloadExpedienteDesdeEstado.js

---

## Exportadores Secundarios Pendientes de Exhaustividad

- Markdown
- Clipboard
- PDF
- JSON
- Excel

Estado:
No confirmados como exportadores directos hasta auditoría específica.

---

## Riesgos

### R1 — Desincronización Tr

Tr activo distinto al Q-Tr mostrado.

Impacto:
Expediente inconsistente.

### R2 — Desincronización Tc

Tc visualizado distinto al Tc transportado por q_tr_activo_estado.

Impacto:
Resultado no reproducible.

### R3 — Desincronización CN

CN efectivo mostrado distinto al CN efectivo transportado.

Impacto:
Pérdida de trazabilidad lluvia–escorrentía.

### R4 — Verdad múltiple

Tr activo almacenado en más de una entidad sin gobierno.

Impacto:
Corrupción silenciosa.

### R5 — Herencia entre cuencas

Cambio de cuenca con persistencia de q_tr_activo_estado anterior.

Impacto:
Contaminación de contexto.

### R6 — Rotura de contrato

Modificación de campos sin actualizar consumidores.

Impacto:
Comparador, expediente y payload pueden quedar inconsistentes.

---

## Impacto de Cambio

Nivel:
MUY ALTO

Toda modificación requiere:

- Auditoría de contrato.
- Auditoría de consumidores.
- Auditoría de visualizadores.
- Auditoría de exportadores.
- Actualización de MCVD-0002.
- Actualización de MCVD-0000.

---

## Validación de Exhaustividad

Visualizaciones:
CONFIRMADAS PRINCIPALES

Exportadores:
CONFIRMADOS PRINCIPALES

Consumidores ocultos:
NO DETECTADOS EN AUDITORÍA ACTUAL

Estado final:
AUDITADA Y CONGELADA

---

## Juramento de Auditoría

Si no existe MCVD de la entidad:

NO SE MODIFICA.

PRIMERO SE AUDITA.

LUEGO SE CAMBIA.
