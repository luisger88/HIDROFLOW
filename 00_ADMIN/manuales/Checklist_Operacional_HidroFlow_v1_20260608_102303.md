# CHECKLIST OPERACIONAL HIDROFLOW v1

Fecha: 06/08/2026 10:23:03
Estado: Operativo

## 1. CHECKLIST OT — VALIDACIÓN TÉCNICA HIDROLÓGICA

```text
[ ] Build pasa con npm run build sin error
[ ] No hay errores en consola
[ ] No hay undefined en UI
[ ] No hay null visibles en resultados
[ ] No hay NaN en salidas numéricas
[ ] No hay duplicate keys en objetos JS
```

## 2. HIDROLOGÍA CRÍTICA

```text
[ ] Conservación de masa verificada
[ ] Volumen consistente Pe x Área
[ ] Q-5 sin caudales cero
[ ] Qp, Tp y Volumen presentes
[ ] Coherencia entre métodos hidrológicos
[ ] Tc dentro de rango bruto válido
[ ] Tc dentro de rango competente si aplica
```

## 3. MÉTODO RACIONAL

```text
[ ] Tabla racional presente
[ ] C válido sin null ni NaN
[ ] Q racional calculado
[ ] Tr activo consistente
[ ] Uso marcado como competente o referencial
```

## 4. CHECKLIST PR

```text
[ ] Nombre de rama correcto
[ ] Mensaje de commit claro y técnico
[ ] Solo archivos relevantes incluidos
[ ] No hay archivos basura
[ ] Diff revisado antes del PR
[ ] PR tiene título claro
[ ] PR tiene descripción completa
[ ] Tipo de cambio definido
```

## 5. CHECKLIST POST-MERGE

```text
[ ] Ejecutar Sincronizar-MainPostMerge
[ ] Rama activa main
[ ] git status --short limpio
[ ] origin/main alineado
[ ] Log incluye PR recién fusionado
[ ] Build post-merge aprobado
```

## 6. CHECKLIST VISUAL UI

```text
[ ] Índice Hidrológico sin valores rotos
[ ] Tabla Q-5 visible
[ ] Método Racional visible
[ ] No hay valores vacíos inesperados
[ ] Unidades correctas mm, m3/s, km2
```

## 7. SEÑALES DE ALERTA

Si ocurre alguna de estas señales, no cerrar la OT:

```text
[ ] undefined aparece en UI
[ ] NaN en resultados
[ ] Caudales en 0 sin justificación
[ ] Tc incoherente fuera de rango
[ ] build falla
[ ] aparece duplicate key en build
```

## 8. DECISIÓN FINAL OT

```text
SI TODO OK: cerrar OT
SI HAY ALERTAS: abrir nueva OT o continuar auditoría
```

## 9. PRINCIPIO OPERATIVO

```text
No confiar en resultados sin checklist validado.
Auditar primero.
Cambiar después.
Validar siempre.
```

## 10. RELACIÓN CON MANUAL OPERATIVO

```text
Manual Operativo: cómo operar.
Checklist Operacional: cómo validar antes de cerrar.
```

## 11. ESTADO

```text
Versión: v1
Tipo: operativo validable
Uso: obligatorio antes de cerrar OT o PRÁCTICA con impacto técnico
```
