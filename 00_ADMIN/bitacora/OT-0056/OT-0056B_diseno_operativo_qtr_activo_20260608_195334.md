# OT-0056B — Diseño operativo del Bloque Q-Tr activo

Fecha: 06/08/2026 19:53:34
Rama: ot-0056-diseno-activacion-controlada-qtr-activo

## 1. Propósito

Diseñar la activación controlada del Bloque Q-Tr activo como bloque separado del Bloque Q-5.

Esta OT no implementa cálculo ni modifica fórmulas. Su alcance es definir contrato operativo, dependencia de datos, reglas visuales, criterios de activación y restricciones de seguridad técnica.

## 2. Antecedentes

OT-0054A definió que Q-Tr activo debe ser un bloque separado y no debe reemplazar Q-5.

OT-0055C1 a OT-0055C5 completaron la publicación runtime del Índice Hidrológico básico:

- Método IDF: EPM.
- Estación IDF: SAN CRISTOBAL · 100 %.
- Distribución temporal: EPM Q1.
- S: 34,64 mm.
- Ia: 6,93 mm.
- Impermeabilidad: 60,0 %.

OT-0056A selló documentalmente la completitud runtime básica del Índice Hidrológico.

## 3. Problema que resuelve Q-Tr activo

Actualmente HidroFlow muestra un Bloque Q-5 estabilizado y trazado por conservación de masa.

El usuario también puede seleccionar un Tr global activo en el Índice Hidrológico.

El Método Racional ya responde al Tr global activo, pero los hidrogramas Qp/Tp/Volumen existentes no deben cambiar silenciosamente al cambiar Tr.

Por tanto, si se desea observar hidrogramas dependientes del Tr global activo, debe nacer un bloque nuevo:

- Bloque Q-Tr activo.

## 4. Separación obligatoria

Bloque Q-5:

- Mantiene significado actual.
- Permanece como escenario Q-5 explícito.
- Conserva trazabilidad de masa ya validada.
- No cambia silenciosamente con Tr global activo.
- Sigue siendo referencia comparativa estable.

Bloque Q-Tr activo:

- Depende explícitamente del Tr global activo.
- Debe mostrar Tr usado.
- Debe mostrar estación IDF usada.
- Debe mostrar distribución temporal usada.
- Debe mostrar CN, S, Ia, impermeabilidad y lluvia efectiva.
- Debe mostrar Tc usado.
- Debe calcular o presentar Qp, Tp y Volumen por método.
- Debe mostrar control de masa.
- No reemplaza Q-5.

## 5. Contrato operativo propuesto

El futuro contexto exportable debe publicar un objeto separado:

q_tr_activo:
- fuente: motor HidroFlow
- tipo: escenario_tr_activo
- estado: disponible | incompleto | pendiente
- tr_activo: número
- estacion_idf: texto
- metodo_idf: texto
- distribucion_temporal: texto
- area_km2: número
- cn_base: número
- cn_efectivo: número
- amc: texto
- s_mm: número
- ia_mm: número
- porcentaje_impermeable: número
- lluvia_total_mm: número
- lluvia_efectiva_total_mm: número
- tc_min: número
- resultados: arreglo de resultados por método
- volumen_esperado_m3: número
- relacion_volumen: número
- actualizado_en: fecha

Cada resultado por método debe incluir:

- metodo
- Qp
- Tp
- volumen
- relacion_volumen
- estado
- advertencias

## 6. Criterio de activación controlada

Q-Tr activo solo debe declararse disponible si existen estos campos mínimos:

- tr_activo
- estacion_idf
- metodo_idf
- distribucion_temporal
- area_km2
- cn_efectivo
- s_mm
- ia_mm
- porcentaje_impermeable
- tc_min
- lluvia_efectiva_total_mm

Si falta alguno, Q-Tr activo debe mostrarse como incompleto y no debe presentar Qp/Tp/Volumen como definitivos.

## 7. Regla visual

El bloque debe titularse explícitamente:

Bloque Q-Tr activo

Y debe incluir una nota visible:

Escenario dinámico dependiente del Tr global activo. No reemplaza el Bloque Q-5.

## 8. Regla de no intervención

Esta OT no modifica:

- hidroEngine
- tcSelector
- Q-5
- fórmulas de caudal
- fórmulas de hidrogramas
- conservación de masa
- resultados existentes del Comparador

## 9. Ruta de implementación posterior

Implementación recomendada en micro-OT posteriores:

- OT-0056C1: crear adaptador puro derivarContextoQTrActivo.
- OT-0056C2: publicar estado q_tr_activo incompleto/completo sin calcular caudales.
- OT-0056C3: renderizar bloque visual Q-Tr activo vacío/controlado.
- OT-0056C4: conectar lluvia efectiva Tr activo solo si el contexto mínimo está completo.
- OT-0056C5: calcular resultados Q-Tr activo sin tocar Q-5.
- OT-0056C6: validar conservación de masa del escenario Q-Tr activo.

## 10. Decisión Senior

Se aprueba avanzar hacia Q-Tr activo solo bajo separación estricta frente a Q-5.

Q-Tr activo será un bloque nuevo, explícito, trazable y condicionado a completitud de contexto.

No se permite recalcular Q-5 silenciosamente.

## 11. Estado Git al cierre


