# OT-0012B — Auditoría de origen del Tc sugerido

## Objetivo

Auditar de dónde sale exactamente el Tc sugerido mostrado por HidroFlow, actualmente cercano a 114,2 min.

Esta auditoría no modifica código. Su finalidad es identificar la cadena de cálculo y los criterios que producen Tc_final.

## Estado de entrada

- Rama: ot-0012-seguridad-hidrologica-tc-sugerido
- OT-0012A abierta con commit f02c387.
- Working tree limpio antes de iniciar OT-0012B.

## Evidencia auditada

Archivo revisado:

- 01_APP/HIDROFLOW/src/services/tcSelector.js

En ComparadorMultiMetodo.jsx ya se había confirmado que Tc_final se obtiene mediante:

seleccionarTc("hidrograma", metodosTc, contextoTc)

En tcSelector.js se confirmó que el modo hidrograma retorna Tc_ref.

## Cadena de cálculo identificada

metodosTc -> calcularTcRef(metodosTc) -> ajustarTcPorCondiciones(Tc_ref_base, contextoTc) -> seleccionarTc("hidrograma") -> Tc_final

## Función calcularTcRef

calcularTcRef usa un promedio ponderado con los siguientes pesos:

- Kirpich: 0.25
- Temez: 0.25
- Giandotti: 0.20
- California: 0.10
- Perez: 0.10
- WilliamsHann: 0.10

La función suma solo los métodos disponibles y divide por la suma de pesos disponibles.

## Función ajustarTcPorCondiciones

El ajuste aplica factores según condiciones de cuenca:

- pendiente mayor que 8: factor por 0.85
- urbanizacion mayor que 0.5: factor por 0.8
- CN mayor que 85: factor por 0.9
- area mayor que 30: factor por 1.1

Para La Iguaná PC_80, con pendiente 8.43, CN 88, area 46.8516 y urbanizacion 0.5, el factor efectivo observado es:

0.85 * 0.9 * 1.1 = 0.8415

Por tanto, si Tc_final es aproximadamente 114.2 min, Tc_ref_base sería aproximadamente:

114.2 / 0.8415 = 135.7 min

## Hallazgo crítico

El comentario del archivo tcSelector.js indica que calcularTcRef es un agregador multimétodo de solo métodos competentes.

Sin embargo, los pesos actuales incluyen métodos como Kirpich, California y Perez, y excluyen SCS-Ranser con el comentario de que no es competente.

Después de OT-0011, la matriz de competencia indica que SCS-Ranser puede ser competente cuando existe CN disponible, mientras que Kirpich queda como referencial para cuencas mayores a 5 km2.

Por tanto, existe una posible inconsistencia entre la lógica histórica de tcSelector.js y la matriz de competencia técnica consolidada en OT-0011.

## Implicación para creciente súbita

Para creciente súbita, no basta con que Tc_final esté dentro del rango competente.

Debe evaluarse si Tc_final representa una condición suficientemente segura de respuesta rápida.

Un Tc demasiado alto puede suavizar el hidrograma, reducir intensidad crítica y subestimar respuesta súbita.

Un Tc demasiado bajo puede ser excesivamente conservador si proviene de métodos no competentes o fuera de escala.

El Tc sugerido de 114.2 min está dentro del rango competente 105.1-231.5 min, pero debe evaluarse si su origen ponderado-ajustado es compatible con un criterio de seguridad hidrológica.

## Dictamen preliminar

El Tc sugerido no proviene directamente de un único método competente.

Proviene de un promedio ponderado histórico ajustado por condiciones de cuenca.

Este origen debe revisarse frente a la matriz de competencia vigente y frente al objetivo de seguridad ante creciente súbita.

## Reglas de no intervención

En esta fase no se modifica:

- hidroEngine.js
- tcSelector.js
- tcAgent.js
- Tc_final
- mapTcResultados
- formulas Tc
- rangos visuales

## Próximos pasos

1. Reconstruir numéricamente Tc_ref_base con los valores reales de metodosTc.
2. Comparar Tc_final con el rango competente.
3. Evaluar si Tc_final es suficientemente conservador para creciente súbita.
4. Proponer, si procede, una advertencia técnica o escenario de sensibilidad, sin cambiar todavía el selector.

## Estado

Documento de auditoría de origen. Sin cambios funcionales aplicados.
