# MCVD-0003 — tc_final / Tc_final

Fecha:
2026-06-29 09:39:28

## Entidad

Nombre:
tc_final / Tc_final

Tipo:
Entidad de Gobierno Hidrológico-Temporal

Estado Auditoría:
AUDITADA Y CONGELADA

Criticidad:
CRÍTICA

---

## Propósito

Representa la referencia temporal final utilizada por HidroFlow para sincronizar tiempos de concentración, hidrogramas, comparador, Q-Tr y expediente.

---

## Hipótesis Inicial

La entidad probablemente se relaciona con:

- tcAgent.js
- getTcState()
- setTcState()
- subscribeTc()
- Tc_final
- ComparadorMultiMetodo.jsx
- IndiceHidrologico.jsx
- HidroFlow.jsx

Estado:
HIPÓTESIS NO CONFIRMADA HASTA AUDITORÍA.

---

## Productor

Pendiente de auditoría.

---

## Publicadores

Pendiente de auditoría.

---

## Almacén / Agente

Pendiente de auditoría.

---

## Transporte

Pendiente de auditoría.

---

## Consumidores

Pendiente de auditoría.

---

## Visualizaciones

Pendiente de auditoría.

---

## Exportadores

Pendiente de auditoría.

---

## Contrato

Pendiente de auditoría.

---

## Riesgos Iniciales

### R1 — Tc visualizado distinto al Tc operativo

El Índice puede mostrar un Tc y los hidrogramas usar otro.

### R2 — Doble verdad entre tcAgent y cálculo local

getTcState().Tc_final puede diferir de calcTc(params) o tc_min local.

### R3 — Herencia de Tc entre cuencas

Cambio de cuenca con persistencia de Tc anterior.

### R4 — Tc de Q-Tr distinto al Tc de hidrogramas

q_tr_activo_estado.q_tr_activo.tc_min puede no coincidir con Tc_final.

### R5 — Contrato implícito del agente Tc

tcAgent puede transportar más campos que Tc_final.

---

## Estado

NO MODIFICAR HASTA COMPLETAR AUDITORÍA.

---

## Juramento de Auditoría

Si no existe MCVD de la entidad:

NO SE MODIFICA.

PRIMERO SE AUDITA.

LUEGO SE CAMBIA.

---

## Auditoría de Exportadores — Resultado Parcial

Fecha:
2026-06-29 10:21:26

## Exportadores Confirmados

### Expediente hidrológico mínimo

Archivo:
01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js

Uso:
Recibe Tc_final como parámetro documental y lo remite al bloque de tiempo de concentración.

Clasificación:
EXPORTADOR CONFIRMADO — EXPEDIENTE

---

### Bloque documental de roles Tc

Archivo:
01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js

Uso:
Renderiza Tc_final como Tc comparador.

Clasificación:
EXPORTADOR CONFIRMADO — BLOQUE DOCUMENTAL TC

---

### Payload expediente

Archivo:
01_APP/HIDROFLOW/src/services/documentos/construirPayloadExpedienteDesdeEstado.js

Uso:
Exporta tcState?.Tc_final como payload.tiempoConcentracion.tcSugeridoMinutos.

Alias documental:
tcSugeridoMinutos

Clasificación:
EXPORTADOR CONFIRMADO — PAYLOAD

---

### Markdown expediente

Archivo:
01_APP/HIDROFLOW/src/services/documentos/construirMarkdownExpedienteDesdePayload.js

Uso:
Renderiza payload.tiempoConcentracion.tcSugeridoMinutos como Tc sugerido.

Clasificación:
EXPORTADOR CONFIRMADO — MARKDOWN

---

### Narrativa Tc

Archivo:
01_APP/HIDROFLOW/src/services/documentos/narrativas/generarNarrativaTc.js

Uso:
Redacta el Tc adoptado desde tcSugeridoMinutos.

Clasificación:
EXPORTADOR / NARRADOR CONFIRMADO — NARRATIVA TC

---

## Exportadores Pendientes

- PDF
- JSON
- Excel
- Clipboard directo

Estado:
Pendiente de auditoría específica.

---

## Alias Documentales Confirmados

- Tc_final
- tcState?.Tc_final
- tcSugeridoMinutos
- tiempoConcentracion.tcSugeridoMinutos
- Tc sugerido
- Tc comparador
- Tiempo de concentración

---

## Estado de Auditoría

Estado:
AUDITORÍA AVANZADA


---

## Auditoría Activa Inicial — Resultado

Fecha:
2026-06-29 10:23:03

## Almacén / Agente

Estado:
CONFIRMADO

Archivo:
01_APP/HIDROFLOW/src/agents/tcAgent.js

Contrato base observado:

{
  Tc_final,
  metodosTc,
  contextoTc
}

Funciones confirmadas:

- setTcState(data)
- getTcState()
- subscribeTc(listener)

Rol:
El agente mantiene estado reactivo global para Tc. No calcula Tc_final; almacena, fusiona y notifica el estado recibido.

Clasificación:
ALMACÉN GLOBAL REACTIVO

---

## Productor Confirmado

Archivo:
01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx

Cadena de producción:

p
↓
calcTc(p)
↓
tcArray
↓
mapTcResultados(tcArray)
↓
metodosTc
↓
contextoTc
↓
seleccionarTc("hidrograma", metodosTc, contextoTc)
↓
Tc_final

Función decisora:
seleccionarTc("hidrograma", metodosTc, contextoTc)

Clasificación:
PRODUCTOR REAL ACTIVO CONFIRMADO

---

## Publicador Confirmado

Archivo:
01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx

Publicación hacia agente:

setTcState({
  Tc_final,
  metodosTc,
  contextoTc,
  metodosTcCompetentes,
  rangoCompetenteTc
});

Clasificación:
PUBLICADOR ACTIVO HACIA tcAgent

---

## Contrato Base del Agente

{
  Tc_final,
  metodosTc,
  contextoTc
}

Origen:
01_APP/HIDROFLOW/src/agents/tcAgent.js

---

## Contrato Efectivo Publicado

{
  Tc_final,
  metodosTc,
  contextoTc,
  metodosTcCompetentes,
  rangoCompetenteTc
}

Origen:
01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx

Observación:
El agente Tc inicia con contrato base, pero acepta contrato ampliado porque setTcState fusiona el estado previo con el objeto recibido.

---

## Consumidores Confirmados

### ComparadorMultiMetodo.jsx

Uso confirmado:

const tcReferencia = Number(Tc_final);

Aplicación:

- Relación Tp/Tc
- Estado temporal Q-5
- Dictamen Q-5

Clasificación:
CONSUMIDOR INTERNO CONFIRMADO

---

## Visualizaciones Confirmadas

Visualización derivada:

- Tp/Tc
- Estado temporal
- Dictamen Q-5

Fuente:
Tc_final como referencia temporal.

Clasificación:
VISUALIZACIÓN DERIVADA CONFIRMADA

---

## Relación con MCVD-0002

Entidad relacionada:
q_tr_activo_estado

Riesgo:
q_tr_activo_estado.q_tr_activo.tc_min puede divergir de Tc_final si no se gobierna la sincronización.

Control:
Todo cambio sobre Tc_final debe revisar impacto sobre MCVD-0002.

---

## Estado Parcial Actual

Estado:
AUDITORÍA AVANZADA

Pendiente:

- Auditar lógica decisora interna de tcSelector.js.
- Confirmar PDF / JSON / Excel / Clipboard directo.
- Confirmar consumidores adicionales por getTcState / subscribeTc.
- Congelar contrato final.



---

---

## Auditoría del Decisor — tcSelector.js

Fecha:
2026-06-29 10:39:46

## Archivo auditado

01_APP/HIDROFLOW/src/services/tcSelector.js

## Función decisora

seleccionarTc(modo, metodosTc, contexto = {})

Clasificación:
DECISOR OFICIAL DE Tc_final

---

## Rol dentro de MCVD-0003

tcSelector.js no almacena, no publica, no visualiza y no exporta Tc_final.

Su función es decidir el valor de Tc_final a partir de:

- modo
- metodosTc
- contexto

---

## Entradas

### modo

Modos confirmados:

- Qp
- hidrograma
- volumen
- default

### metodosTc

Campos usados por el decisor:

- Kirpich
- Temez
- Giandotti
- California
- Perez
- WilliamsHann

### contexto

Campos usados por el ajuste de condiciones:

- pendiente
- area
- CN
- urbanizacion

---

## Agregador multimétodo

Función:

calcularTcRef(metodos)

Pesos confirmados:

- Kirpich: 0.25
- Temez: 0.25
- Giandotti: 0.20
- California: 0.10
- Perez: 0.10
- WilliamsHann: 0.10

Método excluido explícitamente:

- SCS-Ranser

Regla:

Tc_ref_base = promedio ponderado de métodos competentes disponibles.

Si no hay pesos operativos:

Tc_ref_base = null

---

## Ajuste por condiciones de cuenca

Función:

ajustarTcPorCondiciones(Tc, contexto)

Reglas confirmadas:

- pendiente > 8 => factor *= 0.85
- urbanizacion > 0.5 => factor *= 0.8
- CN > 85 => factor *= 0.9
- area > 30 => factor *= 1.1

Salida:

Tc_ref = Tc_ref_base * factor

---

## Salida por modo

- Qp => Tc_min = metodosTc.Kirpich
- hidrograma => Tc_ref ajustado
- volumen => Tc_max = metodosTc.Temez
- default => Tc_ref ajustado

En el flujo activo de HidroFlow:

Tc_final = seleccionarTc("hidrograma", metodosTc, contextoTc)

Por tanto:

Tc_final = Tc_ref ajustado por condiciones de cuenca.

---

## Contrato del decisor

Entrada:

{
  modo,
  metodosTc,
  contexto
}

Salida:

Number | null

---

## Riesgos del decisor

### R1 — Cambio de pesos

Modificar pesos altera Tc_ref_base y por tanto Tc_final.

### R2 — Inclusión o exclusión de métodos

SCS-Ranser está excluido explícitamente. Cambiar esta regla altera Tc_final.

### R3 — Cambio de umbrales contextuales

Los umbrales de pendiente, urbanización, CN y área modifican el factor de ajuste.

### R4 — Fallback silencioso

Modos no reconocidos retornan Tc_ref.

### R5 — Dependencia de claves específicas

Tc_min depende de Kirpich y Tc_max depende de Temez.

### R6 — Divergencia con MCVD-0002

q_tr_activo_estado.q_tr_activo.tc_min puede divergir de Tc_final si no se gobierna la sincronización.

---

## Estado del decisor

CONFIRMADO


---

## Consumidores Adicionales Confirmados

Fecha:
2026-06-29 10:39:46

## HidroFlow.jsx

Archivo:

01_APP/HIDROFLOW/src/HidroFlow.jsx

Clasificación:
CONSUMIDOR Y PUBLICADOR BASE CONDICIONAL

Usos confirmados:

- Importa getTcState y setTcState desde tcAgent.
- Usa getTcState()?.Tc_final para poblar tc_min en contexto hidrológico.
- Usa getTcState()?.Tc_final dentro de derivarEstadoQTrActivo.
- Ejecuta una publicación base de Tc mediante setTcState cuando el agente no tiene estado especializado.

Contrato publicado por fallback base:

{
  Tc_final: tcBase,
  metodosTc: metodosTcBase,
  contextoTc: {
    pendiente,
    area,
    CN,
    fuente: "hidroflow_base"
  }
}

Rol:
HidroFlow.jsx puede actuar como publicador base inicial de Tc_final, pero no reemplaza el estado especializado publicado por ComparadorMultiMetodo cuando este ya existe.

Riesgo:
Doble fuente potencial si el fallback base y el comparador especializado no se gobiernan correctamente.

Control:
El flujo base verifica estado existente del agente antes de publicar.

---

## IndiceHidrologico.jsx

Archivo:

01_APP/HIDROFLOW/src/components/IndiceHidrologico.jsx

Clasificación:
CONSUMIDOR REACTIVO Y VISUALIZADOR PRINCIPAL

Usos confirmados:

- Importa getTcState y subscribeTc desde tcAgent.
- Inicializa estado local con getTcState().
- Se suscribe a cambios mediante subscribeTc(setTcStateLocal).
- Visualiza Tc sugerido desde tcState.Tc_final.
- Visualiza rango bruto Tc desde tcState.metodosTc.
- Visualiza rango competente Tc desde tcState.rangoCompetenteTc.
- Evalúa advertencia técnica cuando Tc_final está cerca del borde inferior del rango competente.

Visualizaciones confirmadas:

- Tc sugerido
- Métodos válidos
- Rango bruto Tc
- Rango competente Tc
- Advertencia técnica por cercanía al borde inferior del rango competente

Rol:
IndiceHidrologico.jsx es el visualizador reactivo principal del estado Tc publicado en tcAgent.

Riesgo:
Si Tc_final o rangoCompetenteTc no están sincronizados, el índice puede mostrar una lectura técnica distinta a la usada por el comparador o el expediente.

Control:
Todo cambio en contrato de tcAgent debe validar IndiceHidrologico.jsx.

---

## ComparadorMultiMetodo.jsx

Archivo:

01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx

Clasificación:
PRODUCTOR, PUBLICADOR, CONSUMIDOR INTERNO Y EXPORTADOR OPERATIVO

Usos confirmados:

- Calcula Tc_final mediante seleccionarTc("hidrograma", metodosTc, contextoTc).
- Publica Tc_final en tcAgent mediante setTcState.
- Consume Tc_final internamente como tcReferencia para Tp/Tc.
- Usa Tc_final en estado temporal Q-5.
- Usa Tc_final en dictamen Q-5.
- Envía Tc_final a construirExpedienteHidrologicoMinimo.
- Envía Tc_final a construirLineasTiempoConcentracionRolesTcExpediente.
- Envía Tc_final dentro de tcState al payload documental.
- Participa en descarga Markdown y fallback de portapapeles.

Rol:
ComparadorMultiMetodo.jsx es el nodo central activo de producción, publicación, consumo y exportación operacional de Tc_final.

---

## Servicios documentales

Clasificación:
EXPORTADORES CONFIRMADOS

Archivos confirmados:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
- 01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js
- 01_APP/HIDROFLOW/src/services/documentos/construirPayloadExpedienteDesdeEstado.js
- 01_APP/HIDROFLOW/src/services/documentos/construirMarkdownExpedienteDesdePayload.js
- 01_APP/HIDROFLOW/src/services/documentos/narrativas/generarNarrativaTc.js
- 01_APP/HIDROFLOW/src/services/documentos/narrativas/generarNarrativasExpediente.js

Alias documentales confirmados:

- Tc_final
- tcState?.Tc_final
- tcSugeridoMinutos
- tiempoConcentracion.tcSugeridoMinutos
- Tc sugerido
- Tc comparador
- Tiempo de concentración

---

## Estado de consumidores

Estado:
CONSUMIDORES PRINCIPALES CONFIRMADOS

Pendientes:

- Confirmar o descartar exportación PDF directa.
- Confirmar o descartar JSON directo.
- Confirmar o descartar Excel directo.
- Confirmar si el portapapeles usa textoExpediente con Tc_final ya embebido o si existe escritura directa adicional.


---

## Auditoría Final de Exportadores Directos

Fecha:
2026-06-29 10:47:45

## Resultado

La auditoría final confirma exportadores documentales principales de Tc_final y descarta, con la evidencia actual, exportadores directos PDF, Excel y JSON para el contrato MCVD-0003.

---

## Exportadores Confirmados

### Expediente

Archivos:

- 01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js
- 01_APP/HIDROFLOW/src/services/documentos/construirBloqueTiempoConcentracionRolesTcExpediente.js

Contrato exportado:

- Tc_final
- Tc comparador

Clasificación:
EXPORTADOR DOCUMENTAL DIRECTO CONFIRMADO

---

### Payload

Archivo:

01_APP/HIDROFLOW/src/services/documentos/construirPayloadExpedienteDesdeEstado.js

Contrato exportado:

- tcState?.Tc_final
- tiempoConcentracion.tcSugeridoMinutos
- metodoPonderacion
- metodosValidos
- metodosExcluidos

Clasificación:
EXPORTADOR PAYLOAD CONFIRMADO

---

### Markdown

Archivos:

- 01_APP/HIDROFLOW/src/services/documentos/construirMarkdownExpedienteDesdePayload.js
- 01_APP/HIDROFLOW/src/services/documentos/construirDescargaMarkdownExpedienteDesdePayload.js
- 01_APP/HIDROFLOW/src/services/documentos/descargarArchivoMarkdownEnNavegador.js

Contrato exportado:

- payload.tiempoConcentracion.tcSugeridoMinutos
- Tc sugerido

Clasificación:
EXPORTADOR MARKDOWN CONFIRMADO

---

### Narrativa

Archivos:

- 01_APP/HIDROFLOW/src/services/documentos/narrativas/generarNarrativaTc.js
- 01_APP/HIDROFLOW/src/services/documentos/narrativas/generarNarrativasExpediente.js

Contrato exportado:

- tiempoConcentracion.tcSugeridoMinutos
- Tc adoptado

Clasificación:
NARRADOR DOCUMENTAL CONFIRMADO

---

## Clipboard

Evidencia:

ComparadorMultiMetodo.jsx usa textoExpediente como contenido operativo y lo asigna a textarea para fallback de copiado.

Clasificación:
CLIPBOARD FALLBACK CONFIRMADO

Observación:
No se confirma en esta auditoría una escritura directa de Tc_final mediante navigator.clipboard. El Tc viaja embebido en textoExpediente.

---

## PDF

Evidencia:

HidroFlow.jsx contiene exportarPDF(refEl, datos) basado en captura visual con html2canvas y jsPDF.

Clasificación:
PDF DIRECTO DE Tc_final NO CONFIRMADO

Observación:
PDF puede capturar visualmente la UI si refEl contiene información Tc, pero no se confirma contrato directo Tc_final / tcSugeridoMinutos hacia PDF.

---

## Excel

Evidencia:

HidroFlow.jsx contiene exportarExcel(datos), pero la fila detectada usa:

Tc (Témez) = datos.tc_h * 60

Clasificación:
EXCEL DIRECTO DE Tc_final NO CONFIRMADO

Observación:
El Excel auditado no exporta Tc_final como entidad MCVD-0003; exporta una referencia distinta asociada a datos.tc_h.

---

## JSON

Evidencia:

Los usos detectados de JSON.stringify corresponden a trazabilidad CN y no a Tc_final.

Clasificación:
JSON DIRECTO DE Tc_final NO CONFIRMADO

---

## Archivos excluidos del MCVD activo

Archivo:

01_APP/HIDROFLOW/src/HidroFlow - copia.jsx

Clasificación:
COPIA / NO OPERATIVO / NO USAR COMO FUENTE MCVD ACTIVA

Motivo:
Es una copia histórica y no debe gobernar el contrato vivo de MCVD-0003.

---

## Estado final de exportadores

Estado:
EXPORTADORES PRINCIPALES CONFIRMADOS

Pendientes residuales:
NINGUNO BLOQUEANTE PARA CONGELACIÓN
---

## Cierre de Auditoría MCVD-0003

Fecha:
2026-06-29 10:48:54

Estado final:
AUDITADA Y CONGELADA

## Contrato Final Gobernado

### Contrato base del agente

{
  Tc_final,
  metodosTc,
  contextoTc
}

### Contrato efectivo publicado por ComparadorMultiMetodo

{
  Tc_final,
  metodosTc,
  contextoTc,
  metodosTcCompetentes,
  rangoCompetenteTc
}

### Contrato base publicado por HidroFlow

{
  Tc_final,
  metodosTc,
  contextoTc
}

### Contrato documental

{
  tiempoConcentracion: {
    tcSugeridoMinutos,
    metodoPonderacion,
    metodosValidos,
    metodosExcluidos
  }
}

### Contrato del decisor

Entrada:

{
  modo,
  metodosTc,
  contexto
}

Salida:

Number | null

---

## Entidades relacionadas

- MCVD-0002 q_tr_activo_estado
- q_tr_multiescenario
- expediente
- hidrogramas Q(t)

---

## Regla de modificación

Todo cambio futuro sobre Tc_final, seleccionarTc, tcAgent, IndiceHidrologico, ComparadorMultiMetodo o exportadores documentales debe declarar:

MCVD afectado:
MCVD-0003

Estado:
Entidad congelada

Acción requerida:
Auditoría de impacto antes de modificar.

