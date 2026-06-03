# Misión HF-MISION-0001
## Auditoría Tc–Tp–Qp–Volumen La Iguaná PC_80

## Estado

Abierta.

## Contexto

El Comparador Hidrológico Multi-Método de HidroFlow ya muestra resultados reales del motor:

- Tc calculado por método.
- Qp.
- Tp.
- Volumen.
- Semáforo de competencia.
- Justificación automática.
- Contexto hidrológico activo.
- Scp cauce principal.
- Concepto técnico de cuenca.

Sin embargo, se observan valores altos o sensibles en Tc, Qp, Tp y Volumen.

## Valores críticos observados

Tc:

- Témez ≈ 231.51 min.
- Kirpich ≈ 134.52 min.
- Giandotti ≈ 105.07 min.
- SCS-Ranser ≈ 122.02 min.

Q-5:

- SCS Unit Hydrograph: Qp ≈ 1419.77 m³/s, Tp ≈ 210 min.
- Snyder: Qp ≈ 54015.75 m³/s, Tp ≈ 405 min.
- Clark IUH: Qp ≈ 1198.36 m³/s, Tp ≈ 300 min.
- Williams & Hann: Qp ≈ 3012.77 m³/s, Tp ≈ 20 min.

## Alerta principal

No adoptar ningún resultado hasta verificar:

- Coherencia Tc vs Tp.
- Unidad de Qpico.
- Unidad e integración de volTotal.
- Paso temporal dtMin.
- Campos internos qSeries, Qpico, tPico, volTotal.
- Relación con CN, Pe y área.
- Pendiente usada por cada método.

## Órdenes a auditores auxiliares

### HF_AuditorTc

Buscar calcTc(params). Reportar fórmula, insumos, pendiente, unidades y resultado por método.

### HF_AuditorHidrogramas

Buscar calcHidroCompleto y estructura de hidrogramas. Reportar qSeries, Qpico, tPico, volTotal, dtMin y método.

### HF_AuditorPendientes

Auditar Scp, Sc, H/L y pendientes segmentadas por quiebres críticos del perfil longitudinal.

### HF_AuditorUnidades

Revisar conversiones mm, m, km², minutos, segundos, intensidad y caudal.

### HF_AuditorCN

Auditar CN base, CN ajustado, CN efectivo, S, Ia, Pe y volumen esperado Pe x área.

### HF_AuditorIntegrador

Cruzar hallazgos y preparar matriz final Tc–Tp–Qp–Volumen.

## Criterio de cierre

La misión solo se cierra cuando el Auditor Jefe pueda responder:

1. Qué Tc usa cada método.
2. Qué Tp reporta cada hidrograma.
3. Si Tc y Tp son comparables.
4. Si Qp está en unidades correctas.
5. Si Volumen es coherente con Pe x área.
6. Si Snyder es error, sensibilidad o método no competente.
7. Si Williams & Hann Tp = 20 min es parámetro interno o tiempo al pico físico.
8. Qué método queda solo como referencial.
9. Qué resultados pueden pasar a fase de adopción.
10. Qué cambios, si alguno, se autorizan.

## Regla de seguridad

No modificar HidroFlow.jsx durante la misión, salvo autorización expresa del Auditor Jefe.
