# Reporte OT-0004D-A — Origen de pendiente_cuenca

## Estado

Abierto.

## Objetivo

Identificar la fuente, cálculo y unidad de pendiente_cuenca.

## Evidencia generada

- evidencia_origen_pendiente_cuenca.txt

## Hallazgos

### Hallazgo 1 — Origen y unidad de pendiente_cuenca

- Archivo:
src/data/cuencasCatalogo.js

- Tipo:
Catálogo (valor definido directamente en datos base)

- Valor encontrado:
pendiente_cuenca = 8.43

- Unidad detectada:
Porcentaje (%) inferido a partir del valor y coherencia geomorfológica de la cuenca

- Uso en motor:
Se asigna directamente como variable Sp en el cálculo del método SCS-Ranser:
const Sp = p.pendiente_cuenca;

- Evidencia adicional:
En el mismo archivo se identifica:
pendiente_media = 8.43

Y comentarios que indican que:
pendiente_cuenca es usada para mostrar “pendiente media” y alimentar el método SCS-Ranser.

- Problema identificado:
pendiente_cuenca representa una pendiente media expresada en porcentaje (%), pero es utilizada directamente en la fórmula SCS-Ranser sin conversión a pendiente adimensional.

- Diferencia conceptual:
SCS-Ranser requiere pendiente adimensional (m/m o ft/ft), equivalente a:
0.0843

pero el motor usa:
8.43

- Impacto en Tc:
El uso incorrecto de unidad genera diferencias aproximadas de un orden de magnitud:

Sp = 8.43   → Tc ≈ 122.02 min
Sp = 0.0843 → Tc ≈ 1220 min

Relación ≈ 10 veces.

- Riesgo:
Crítico. El resultado de SCS-Ranser depende directamente de Sp con exponente negativo, amplificando el error.

- Severidad:
Crítica.

- Conclusión preliminar:
pendiente_cuenca NO es una pendiente hidrológica coherente para uso directo en fórmulas, sino una pendiente media en porcentaje (%). Su uso actual introduce una inconsistencia dimensional significativa en SCS-Ranser.


- Archivo:
- Tipo: (catálogo / cálculo / entrada)
- Valor encontrado:
- Unidad detectada:
- Uso en motor:
- Riesgo:

## Análisis

La variable pendiente_cuenca es un dato de catálogo que representa la pendiente media de la cuenca en porcentaje (%). Sin embargo, es utilizada directamente en la formulación SCS-Ranser como si fuera una pendiente adimensional.

Esta inconsistencia no proviene de los datos ni de la fórmula, sino del acople incorrecto entre ambos.

El problema corresponde a un error de diseño en la interfaz variable–método.

## Conclusión preliminar

pendiente_cuenca no puede ser utilizada directamente como Sp en SCS-Ranser sin conversión.

El método SCS-Ranser queda marcado como no adoptable hasta que se normalice la unidad de pendiente utilizada en el motor.

## Riesgo

Crítico. Error de orden ≈10x en Tc.

## Recomendación

No modificar código en esta etapa.

Se recomienda:
- Documentar explícitamente la unidad de pendiente_cuenca.
- Separar pendiente_media (%) de pendientes hidrológicas (adimensionales).
- Evaluar posteriormente conversión controlada (% → decimal) bajo un parche mínimo trazable.

## Requiere cambio de código

Pendiente de decisión del HF_AuditorJefe.
