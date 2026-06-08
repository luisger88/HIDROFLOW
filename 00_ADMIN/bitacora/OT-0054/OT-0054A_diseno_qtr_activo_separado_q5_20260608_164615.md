# OT-0054A — Diseño Q-Tr activo separado del Bloque Q-5

Fecha: 06/08/2026 16:46:15
Rama: ot-0054-diseno-qtr-activo-separado-q5

## 1. Propósito

Diseñar la separación arquitectónica entre el Bloque Q-5 existente y un futuro Bloque Q-Tr activo dependiente del Tr global seleccionado por el usuario.

La OT no implementa recálculo ni modifica fórmulas. Su alcance es definir contrato, responsabilidades, criterios de no confusión visual y reglas de evolución.

## 2. Contexto inmediato

OT-0051 integró Método Racional con Índice Hidrológico, permitiendo que C y Q racional respondan al Tr global activo.

OT-0052A dejó en radar la reactividad pendiente de IDF, SCS-CN y distribución temporal.

OT-0053A auditó la trazabilidad Tr–Tc–Qp–Tp–Volumen y concluyó que Qp/Tp/Volumen se mantienen actualmente como Bloque Q-5 explícito, no como recálculo automático por Tr activo.

## 3. Problema arquitectónico

El usuario puede cambiar Tr global activo en el Índice Hidrológico. Ese cambio ya impacta el Método Racional, pero no debe implicar automáticamente que el Bloque Q-5 cambie de significado.

Si HidroFlow mezcla Q-5 y Q-Tr activo en una misma tabla sin rótulo explícito, se genera ambigüedad técnica:

```text
¿Qp/Tp/Volumen pertenecen al escenario Q-5?
¿Qp/Tp/Volumen pertenecen al Tr global activo?
¿El volumen sigue controlado contra masa Pe–Área?
¿La tabla sigue siendo comparador Q-5 o comparador Q-Tr?
```

## 4. Decisión de separación

Se define separación obligatoria:

```text
Bloque Q-5:
- Mantiene significado actual.
- Representa escenario Q-5 estabilizado.
- Conserva trazabilidad de masa Pe–Área–Volumen ya validada.
- No cambia silenciosamente al cambiar Tr global activo.

Bloque Q-Tr activo:
- Será un bloque nuevo o vista nueva.
- Dependerá explícitamente del Tr global activo.
- Deberá mostrar Tr usado, estación IDF, distribución temporal, Pe, Tc, Qp, Tp y Volumen.
- No reemplaza Q-5.
- Debe declararse como escenario dinámico.
```

## 5. Contrato conceptual Q-Tr activo

El futuro Bloque Q-Tr activo deberá publicar un objeto separado, por ejemplo:

```text
q_tr_activo: {
  fuente: 'motor HidroFlow',
  tipo: 'escenario_tr_activo',
  tr_activo: number,
  estacion_idf: string,
  distribucion_temporal: string,
  area_km2: number,
  cn_efectivo: number,
  amc: string,
  lluvia_total_mm: number,
  lluvia_efectiva_total_mm: number,
  tc_min: number,
  resultados: [
    { metodo: string, Qp: number, Tp: number, volumen: number, estado: string }
  ],
  volumen_esperado_m3: number,
  relacion_volumen: number,
  actualizado_en: string
}
```

## 6. Reglas visuales

```text
1. La tabla Q-5 conservará título explícito: Bloque Q-5.
2. El nuevo bloque deberá titularse: Bloque Q-Tr activo.
3. Q-Tr activo debe mostrar el Tr global activo de forma visible.
4. Q-Tr activo debe mostrar advertencia si IDF, distribución temporal, SCS-CN o Pe no están completamente publicados.
5. Q-Tr activo debe mostrar relación de volumen si existe integración completa.
6. Q-Tr activo no debe reemplazar ni ocultar Q-5.
7. El expediente debe distinguir ambos bloques si ambos existen.
```

## 7. Dependencias previas

Antes de implementar Q-Tr activo, HidroFlow debe estabilizar:

```text
1. Publicación reactiva de estación IDF hacia Índice y contexto.
2. Publicación reactiva de distribución temporal.
3. Publicación de S, Ia, impermeabilidad y Pe.
4. Definición de Tc usado para Q-Tr activo.
5. Confirmación de conservación de masa para cada Tr activo.
```

## 8. Criterio de no intervención

OT-0054A no modifica código. Cualquier implementación posterior debe hacerse mediante adaptador o bloque nuevo, no mediante mutación silenciosa del Bloque Q-5.

## 9. Decisión

```text
Se aprueba conceptualmente diseñar Q-Tr activo como bloque separado.
Se prohíbe alterar el significado actual del Bloque Q-5.
La implementación queda condicionada a resolver primero la reactividad IDF/SCS-CN/Distribución temporal o a declarar explícitamente sus datos fuente.
```

## 10. Estado Git final

?? 00_ADMIN/bitacora/OT-0054/
