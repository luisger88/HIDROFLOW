# OT-0046G2B — Auditoría del estado fuente q_tr_activo_estado y lluvia efectiva/hidrogramas en cero

## Estado previo

OT-0046G2A cerró la normalización documental del Q-Tr activo anidado.

Commits relevantes:

- fdc7460 docs(expediente): diagnostica ceros hidrologicos dinamicos
- 936a3df fix(expediente): normaliza Q-Tr activo anidado
- 95e69f5 docs(expediente): registra apertura G2A Q-Tr anidado

## Objetivo

Auditar por qué el estado fuente hidrológico sigue llegando en cero al Expediente Inteligente.

## Cadena auditada

hietograma -> lluvia efectiva -> hidrogramas -> hidrogramas exportables -> q_tr_activo_estado -> expediente

## Diagnóstico secuencial

### 1. Hietograma

Origen:

- calcHietograma(est, Tr=25, 3h, dtMin, "EPM_Q1")

Resultado esperado:

- Serie de precipitación acumulada hiet.data.

### 2. CN dinámico

Origen:

- calcCNdinamico({ amc: "II", pctImp: 60, cnBase: 75 })

Resultado estimado:

- CNact aproximado a 75.

### 3. Lluvia efectiva

Origen:

- calcLluviaEfectiva(hiet, CNact)

Fórmula SCS-CN:

- S = 25400 / CNact - 254
- Ia = 0.2 * S
- Pe = P > Ia ? (P - Ia)^2 / (P - Ia + S) : 0

Dictamen:

Si P no supera Ia, entonces Pe = 0 para todas las filas.

Con CNact aproximado a 75:

- S aproximado = 84,67 mm
- Ia aproximado = 16,93 mm

Primer punto donde aparece el cero:

- calcLluviaEfectiva
- condición P > Ia

### 4. Hidrogramas

Origen:

- calcHidroCompleto(lluvEfect, hu, dtMin)

Si PeIncrem es todo cero:

- qSeries.Q = 0
- Qpico = 0
- tPico = 0
- volTotal = 0

### 5. Hidrogramas exportables

Origen:

- hidrogramasQ5Exportables

Resultado:

- Qpico, tPico y volTotal se propagan en cero si qSeries está en cero.

### 6. q_tr_activo_estado

Origen:

- derivación posterior del estado Q-Tr activo.

Resultado:

- hereda valores cero si la fuente hidrológica activa está en cero.

### 7. Expediente

Origen:

- construirPayloadExpedienteDesdeEstado.js

Resultado visible:

- Pe total: 0 mm
- Q-Tr: 0 m3/s
- Qp: 0 m3/s
- Tp: 0 min
- Volumen integrado: 0 m3
- Diagnóstico Q(t): 0 filas

## Hallazgo secundario documental

numeroSeguro(null) convierte null en 0, porque:

- Number(null) = 0
- Number.isFinite(0) = true

Esto puede enmascarar ausencia de dato como cero.

## Dictamen

El cero principal nace en la lluvia efectiva, no en el constructor documental.

La causa probable es que la precipitación acumulada P no supera la abstracción inicial Ia.

## Decisión

OT-0046G2B se cierra como diagnóstico.

No se modifica código en esta sub-OT.

## Próximas sub-OT recomendadas

### OT-0046G2B1 — Corrección documental de numeroSeguro(null)

Objetivo:

Evitar que valores null o undefined se exporten como 0.

Cambio conceptual:

const numeroSeguro = (valor) => {
  if (valor === null || valor === undefined) return null;
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
};

### OT-0046G2B2 — Auditoría hidrológica de lluvia efectiva cero

Objetivo:

Auditar por qué P <= Ia en todo el hietograma y por qué lluvEfect no genera PeIncrem > 0.

Restricción:

No modificar fórmulas ni recalcular sin diagnóstico.
