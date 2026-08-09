# OT-0046G2B2B — Auditoría de publicación de hidros positivos hacia contextoBase/metodosQ5Payload

## Estado previo

OT-0046G2B2A diagnosticó runtime positivo de lluvia efectiva e hidrogramas.

Commit:
d37c214 docs(expediente): diagnostica runtime positivo de lluvia e hidrogramas

## Hallazgo principal

La instrumentación temporal demostró que el motor calcula valores positivos:

- Pe total runtime mayor que cero.
- Área params real: 46,8516 km².
- Estación IDF activa.
- Hidrogramas con Qp, Tp y volumen positivos.

## Problema actual

El expediente sigue recibiendo valores nulos o cero en:

- metodosComparados[].Qp
- metodosComparados[].Tp
- metodosComparados[].volumen
- hidrografiaQ5.caudalPicoM3s
- hidrografiaQ5.tiempoPicoMinutos
- hidrografiaQ5.volumenIntegradoM3

## Hipótesis

El problema no está en el motor hidrológico, sino en la publicación o transferencia:

hidros runtime positivos
→ hidrogramasQ5Exportables
→ contextoBase.hidrogramas
→ obtenerMetodosQ5Validos / metodosQ5Payload
→ construirPayloadExpedienteDesdeEstado
→ expediente

## Objetivo

Auditar dónde se pierden Qp, Tp y volumen entre los hidrogramas positivos de runtime y el payload del expediente.

## Restricciones

No modificar fórmulas hidrológicas.
No modificar motor Hidrogramas.
No recalcular Q-5.
No maquillar ceros.
No relajar guards.
No agregar instrumentación permanente.
No mezclar con HF-PROD, HF-ARQ, GOV ni contrato cuenca.

## Criterio de éxito

Identificar con precisión si la pérdida ocurre en:

1. hidrogramasQ5Exportables;
2. onContextoComparador / contextoBase;
3. obtenerMetodosQ5Validos;
4. metodosQ5Payload;
5. construirPayloadExpedienteDesdeEstado.
