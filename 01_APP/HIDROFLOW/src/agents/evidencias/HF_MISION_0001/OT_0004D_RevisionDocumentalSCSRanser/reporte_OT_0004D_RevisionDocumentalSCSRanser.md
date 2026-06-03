# Reporte OT-0004D — Revisión documental específica SCS-Ranser

## Estado

Abierto.

## Resumen ejecutivo

Pendiente de diligenciar.

## Evidencias revisadas

- OT-0004A Validación numérica.
- OT-0004B Impacto numérico por unidad.
- Código calcTc(p).

## Hallazgos

### Hallazgo 1

- Método: SCS-Ranser
- Archivo:
- Líneas:
- Fórmula observada:
- Unidad esperada de Sp:
- Unidad usada:
- Diferencia:
- Impacto:
- Riesgo:
- Severidad:

## Matriz preliminar SCS-Ranser

| Elemento | Implementación actual | Unidad esperada por auditar | Riesgo |
|---|---|---|---|
| L*1000 | Conversión km → m | m | Bajo |
| Ss | Función de CN | mm | Bajo |
| Sp | pendiente_cuenca | % o decimal | Crítico |
| Tc actual | ≈ 122.02 min | Pendiente de validar | Alto |
| Tc con Sp decimal | ≈ 1220 min | Referencia auditoría | Crítico |

## Conclusión preliminar

Pendiente.

## Recomendación

Pendiente.

## Requiere cambio de código

No determinado.

---

## Dictamen final — HF_AuditorJefe

### Método evaluado

SCS-Ranser (1958)

### Resultado de auditoría

Completado.

### Síntesis técnica

Se verificó que la variable pendiente_cuenca utilizada como Sp en el método SCS-Ranser proviene del catálogo de cuencas, donde es definida como valor numérico = 8.43.

El análisis de la evidencia confirma que:

- pendiente_cuenca corresponde a pendiente media expresada en porcentaje (%).
- Es utilizada directamente en el motor como variable Sp:

  const Sp = p.pendiente_cuenca;

- No se realiza conversión a pendiente adimensional.

### Inconsistencia identificada

La formulación SCS-Ranser requiere pendiente adimensional (m/m o ft/ft), mientras el motor utiliza una pendiente en porcentaje (%).

Esto genera una inconsistencia dimensional entre los datos de entrada y la formulación aplicada.

### Evidencia numérica

- Sp = 8.43      → Tc ≈ 122.02 min
- Sp = 0.0843    → Tc ≈ 1220 min

Relación aproximada: 10 veces.

### Clasificación del problema

Tipo: Error de diseño en la interfaz entre datos y modelo.

No es un error de fórmula ni de datos, sino de uso de variable sin normalización de unidad.

### Impacto

Crítico. El tiempo de concentración calculado mediante SCS-Ranser puede variar un orden de magnitud dependiendo de la interpretación de Sp.

### Estado de adopción

SCS-Ranser:

- Calculado por motor: Sí
- Auditado: Sí
- Dimensionalmente coherente: No
- Adoptable: No

### Decisión

El método SCS-Ranser queda clasificado como NO ADOPTABLE en el estado actual del motor HidroFlow.

### Condición para futura adopción

Requiere:

- Definir formalmente la unidad de pendiente_cuenca.
- Separar pendiente media (%) de pendiente hidrológica.
- Convertir explícitamente a pendiente adimensional antes de usar en fórmulas.

### Lineamiento para corrección futura

Cualquier corrección deberá cumplir:

- Cambio mínimo y localizado
- Total trazabilidad
- Validación numérica comparativa
- Auditoría posterior obligatoria

### Conclusión del Auditor Jefe

La inconsistencia detectada en SCS-Ranser confirma un problema estructural de acople entre datos y modelo. Mientras no se normalice la unidad de pendiente, el método no puede ser utilizado para toma de decisiones hidrológicas.

### Cierre de orden

OT-0004D se declara CERRADA con hallazgo crítico documentado.
