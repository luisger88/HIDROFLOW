# OT-0046G2B — Auditoría del estado fuente q_tr_activo_estado y lluvia efectiva/hidrogramas en cero

## Estado previo

OT-0046G2 cerró el diagnóstico de valores hidrológicos dinámicos en cero.

Commit:
fdc7460 docs(expediente): diagnostica ceros hidrologicos dinamicos

OT-0046G2A cerró la normalización documental del Q-Tr activo anidado.

Commits:
936a3df fix(expediente): normaliza Q-Tr activo anidado
95e69f5 docs(expediente): registra apertura G2A Q-Tr anidado

## Problema actual

El Expediente Inteligente ya copia y lee correctamente identidad, área y ruta documental Q-Tr anidada, pero sigue exportando:

- Pe total: 0 mm
- Q-Tr: 0 m³/s
- Qp Q-5: 0 m³/s
- Tp Q-5: 0 min
- Volumen Q-5: 0 m³
- Diagnóstico Q(t): 0 filas

## Diagnóstico previo

OT-0046G2 concluyó que el problema principal ya no está en el constructor documental, sino en el estado fuente generado por HidroFlow.jsx.

Hipótesis principal:
- lluvEfect llega en cero o con incrementos no efectivos.
- hidrogramasQ5Exportables deriva Qp, Tp y volumen desde hidros, pero hidros se construye sobre lluvia efectiva cero.
- q_tr_activo_estado arrastra Q-Tr en cero porque su fuente hidrológica activa está en cero.

## Objetivo

Auditar el estado fuente, sin modificar código, para determinar dónde se origina el cero:

1. calcHietograma
2. calcLluviaEfectiva
3. lluvEfect
4. lluviaEfectivaTotalMm
5. hidros
6. hidrogramasQ5Exportables
7. hidrogramasResumen
8. qTrMultiEscenario
9. q_tr_activo_estado

## Restricciones

No modificar fórmulas hidrológicas.
No modificar motor Hidrogramas.
No recalcular Q-5.
No maquillar ceros.
No relajar guards.
No agregar console.log permanente.
No mezclar con HF-PROD, HF-ARQ, GOV ni contrato cuenca.

## Criterio de éxito

La OT debe producir un diagnóstico verificable que indique si el cero nace en:

- lluvia bruta / hietograma;
- lluvia efectiva SCS-CN;
- convolución Q(t);
- publicación del contexto;
- derivación q_tr_activo_estado;
- normalización documental posterior.

## Resultado esperado

Un mapa de cadena de datos:

hietograma → lluvia efectiva → hidrogramas → hidrogramas exportables → q_tr_activo_estado → expediente.
