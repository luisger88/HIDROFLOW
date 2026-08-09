# OT-0046G2 — Diagnóstico de valores hidrológicos dinámicos en cero

## Estado previo

OT-0046F cerró el desbloqueo funcional de copia Q-5.

Commit:
d1e1dc1 fix(expediente): desbloquea copia Q5 desde payload canonico

OT-0046G1 cerró la normalización de identificación documental.

Commit:
103796d fix(expediente): normaliza identificacion en payload documental

## Resultado actual

El Expediente Inteligente ya copia y el resumen ejecutivo muestra:

- Cuenca: POST_OK
- Área: 46,8516 km²

## Problema pendiente

El expediente sigue exportando valores hidrológicos dinámicos en cero:

- Pe total: 0 mm
- Q-Tr: 0 m³/s
- Qp Q-5: 0 m³/s
- Tp Q-5: 0 min
- Volumen Q-5: 0 m³
- Diagnóstico Q(t): 0 filas

## Objetivo

Diagnosticar el origen real de los ceros hidrológicos dinámicos, separando:

1. valores realmente no calculados por el motor;
2. valores existentes pero no transportados al payload;
3. valores transportados con nombre de clave incompatible;
4. valores dependientes de q_tr_multiescenario o qSeries ausentes.

## Restricciones

No modificar fórmulas hidrológicas.
No recalcular Q-5.
No maquillar ceros.
No relajar guards de completitud.
No alterar ModHidrogramas salvo evidencia estricta.
No agregar logs permanentes.
No mezclar con HF-PROD, HF-ARQ, GOV ni contrato cuenca.

## Archivos candidatos para auditoría

- 01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx
- 01_APP/HIDROFLOW/src/HidroFlow.jsx
- 01_APP/HIDROFLOW/src/services/documentos/construirPayloadExpedienteDesdeEstado.js
- 01_APP/HIDROFLOW/src/services/documentos/construirDescargaMarkdownExpedienteDesdePayload.js

## Criterio de éxito

La OT-0046G2 debe producir un diagnóstico verificable que indique, para cada valor en cero, si:

- el valor no existe en el estado fuente;
- el valor existe pero no llega al payload;
- el valor llega al payload pero el constructor documental lee otra ruta;
- el valor requiere una OT posterior de cálculo/publicación real.
