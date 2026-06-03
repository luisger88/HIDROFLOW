# Bitácora HF-MISION-0001
## Auditoría Tc–Tp–Qp–Volumen La Iguaná PC_80

## Estado general

Abierta.

## Propósito

Registrar de forma cronológica, trazable y auditable los hallazgos, decisiones, evidencias y próximos pasos de la auditoría hidrológica seria del Comparador Multi-Método de HidroFlow.

## Contexto técnico inicial

El Comparador Hidrológico Multi-Método ya se encuentra operativo con:

- Catálogo Tc-15 / Q-5.
- Matriz de competencia.
- Semáforo por método.
- Justificación automática.
- Contexto hidrológico activo desde motor HidroFlow.
- Scp cauce principal visible.
- Concepto técnico de cuenca.
- Tc calculado leído del motor.
- Qp, Tp y Volumen leídos desde hidrogramas del motor.
- Nota técnica de no adopción automática.
- Auditoría de pendientes Tc visible mediante columna “Pendiente auditada”.

## Advertencia general

Los resultados actuales se consideran datos calculados por el motor, no valores adoptados.

Ningún Tc, Qp, Tp o Volumen debe adoptarse hasta cerrar auditoría de coherencia.

---

# Registro cronológico

## 2026-05-30 — Registro 0001 — Apertura formal de misión

### Responsable

HF_AuditorJefe

### Evento

Se abre formalmente la misión HF-MISION-0001 para auditar la coherencia Tc–Tp–Qp–Volumen en La Iguaná PC_80.

### Evidencia

El comparador muestra valores reales provenientes del motor HidroFlow.

### Estado

Abierto.

### Severidad inicial

Alta.

### Observación

Los valores de Tc, Qp, Tp y Volumen presentan dispersión significativa y requieren auditoría antes de adopción técnica.

---

## 2026-05-30 — Registro 0002 — Valores Tc observados

### Responsable

HF_AuditorTc

### Hallazgo

Se observan valores de tiempo de concentración calculados por el motor:

- Témez ≈ 231.51 min.
- Kirpich ≈ 134.52 min.
- Giandotti ≈ 105.07 min.
- SCS-Ranser ≈ 122.02 min.

### Riesgo

Los valores son altos o sensibles para interpretación hidrológica y deben revisarse contra:

- Longitud hidráulica.
- Desnivel.
- Scp.
- Sc.
- Unidades.
- Fórmula aplicada por método.

### Estado

Pendiente de auditoría detallada.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0003 — Valores Q-5 observados

### Responsable

HF_AuditorHidrogramas

### Hallazgo

Se observan valores reales del bloque Q-5:

- SCS Unit Hydrograph: Qp ≈ 1419.77 m³/s, Tp ≈ 210 min.
- Snyder: Qp ≈ 54015.75 m³/s, Tp ≈ 405 min.
- Clark IUH: Qp ≈ 1198.36 m³/s, Tp ≈ 300 min.
- Williams & Hann: Qp ≈ 3012.77 m³/s, Tp ≈ 20 min.

### Riesgo

Snyder presenta Qp extremadamente alto frente a los demás métodos.

Williams & Hann presenta Tp = 20 min, potencialmente inconsistente frente a Tc ≈ 231.5 min si ambos valores se interpretan como equivalentes.

### Estado

Pendiente de auditoría.

### Severidad

Crítica para adopción.

---

## 2026-05-30 — Registro 0004 — Estructura de hidrogramas detectada

### Responsable

HF_AuditorHidrogramas

### Hallazgo

La estructura real detectada en el motor para hidrogramas contiene campos:

- qSeries.
- Qpico.
- tPico.
- volTotal.
- metodo.

### Evidencia

Los campos fueron observados mediante inspección temporal en consola durante la validación del comparador.

### Decisión

Se ajustó la lectura del comparador para tomar Qp, Tp y Volumen desde:

- Qpico.
- tPico.
- volTotal.

### Estado

Validado visualmente.

### Severidad

Media.

---

## 2026-05-30 — Registro 0005 — Diferenciación Scp y Sc

### Responsable

HF_AuditorPendientes

### Hallazgo

Se definió convención técnica:

- Scp = pendiente del cauce principal hasta PC_80.
- Sc = pendiente media superficial de la cuenca.

### Decisión

No se deben mezclar Scp y Sc ni etiquetar ambas como “pendiente media”.

### Evidencia

Se creó archivo:

src/data/auditoriaPendientesTc.js

y se agregó criterio explícito de auditoría de pendientes.

### Estado

Integrado al comparador mediante columna “Pendiente auditada”.

### Severidad

Alta para interpretación de Tc.

---

## 2026-05-30 — Registro 0006 — Auditoría hidrológica pendiente visible

### Responsable

HF_AuditorJefe

### Hallazgo

Se agregó advertencia visible en el comparador:

“Los valores de Tc, Tp, Qp y Volumen requieren revisión de coherencia antes de adopción técnica.”

### Decisión

La interfaz debe mantener explícito que los resultados son lectura del motor y no valores adoptados.

### Estado

Validado visualmente.

### Severidad

Alta.

---

# Órdenes activas a auditores auxiliares

## Orden OT-0001 — HF_AuditorTc

### Mandato

Inspeccionar calcTc(params) y reportar:

- Fórmula por método.
- Insumos usados.
- Pendiente usada.
- Unidades.
- Resultado.
- Riesgo.

### Estado

Pendiente.

---

## Orden OT-0002 — HF_AuditorHidrogramas

### Mandato

Inspeccionar calcHidroCompleto y reportar:

- Cómo se calcula qSeries.
- Cómo se calcula Qpico.
- Cómo se calcula tPico.
- Cómo se calcula volTotal.
- Qué dtMin usa.
- Qué unidades maneja.

### Estado

Pendiente.

---

## Orden OT-0003 — HF_AuditorPendientes

### Mandato

Auditar relación entre:

- Scp global.
- Scp segmentada por quiebres críticos.
- Sc de cuenca.
- H/L.
- Pendiente interna por fórmula.

### Estado

Pendiente.

---

## Orden OT-0004 — HF_AuditorUnidades

### Mandato

Auditar conversiones:

- km² a m².
- mm a m.
- min a s.
- pendiente decimal vs porcentaje.
- intensidad mm/h.
- volumen m³.

### Estado

Pendiente.

---

## Orden OT-0005 — HF_AuditorCN

### Mandato

Auditar:

- CN base.
- CN ajustado por AMC.
- CN efectivo.
- S.
- Ia.
- Pe.
- Volumen esperado Pe x área.
- Diferencia contra volTotal.

### Estado

Pendiente.

---

## Orden OT-0006 — HF_AuditorIntegrador

### Mandato

Cruzar hallazgos de todos los auditores y preparar matriz de coherencia final.

### Estado

Pendiente.

---

# Criterio de cierre de misión

La misión se cerrará únicamente cuando el HF_AuditorJefe pueda emitir concepto sobre:

1. Qué Tc usa cada método.
2. Qué pendiente usa cada método.
3. Qué Tp representa cada hidrograma.
4. Si Tc y Tp son comparables.
5. Si Qp está en unidades correctas.
6. Si Volumen coincide con Pe x área.
7. Si Snyder es error, sensibilidad o método no competente.
8. Si Williams & Hann Tp = 20 min es parámetro interno o tiempo al pico físico.
9. Qué métodos quedan como principales, alternos o referenciales.
10. Qué cambios mínimos, si alguno, quedan autorizados.

---

# Estado actual de adopción

No adoptado.

Todos los resultados permanecen en estado:

Calculado por motor HidroFlow, pendiente de auditoría.

---

## 2026-05-30 — Registro 0007 — Activación OT-0001 HF_AuditorTc

### Responsable

HF_AuditorJefe

### Evento

Se activa la orden OT-0001 para el auditor auxiliar HF_AuditorTc.

### Objetivo

Inspeccionar calcTc(params), sus usos, estructura de salida, métodos calculados, unidades y relación con el Comparador Multi-Método.

### Archivos objetivo

- src/HidroFlow.jsx
- src/hidroEngine.js

### Estado

Abierto.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0008 — Fuente operativa probable de calcTc localizada

### Responsable

HF_AuditorTc

### Evento

Se localizó la fuente operativa probable de calcTc en src/services/hidroEngine.js, línea aproximada 1594.

### Evidencia

Archivo generado:

src/agents/evidencias/HF_MISION_0001/OT_0001_AuditorTc/evidencia_fuente_operativa_calcTc_hidroEngine.txt

### Hallazgo principal

La función export function calcTc(p) usa:

- L = p.longitud_cauce
- A = p.area
- Sp = p.pendiente_cuenca

### Riesgo

El campo p.pendiente_cuenca debe auditarse porque puede estar funcionando como Sc, Scp o alias histórico. No debe asumirse equivalencia entre pendiente de cuenca y pendiente del cauce principal.

### Estado

Pendiente auditoría de significado del campo pendiente_cuenca.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0009 — Motor modular alterno Tc detectado

### Responsable

HF_AuditorTc

### Evento

Se detectó una segunda implementación de calcTc en src/services/tc/calcTc.ts.

### Evidencia

Archivo generado:

src/agents/evidencias/HF_MISION_0001/OT_0001_AuditorTc/evidencia_fuente_modular_calcTc_ts.txt

### Riesgo

Puede existir duplicidad entre motor operativo y motor modular. Debe clasificarse antes de cualquier refactor o cambio.

### Estado

Pendiente clasificación.

### Severidad

Media.

---

## 2026-05-30 — Registro 0010 — Activación OT-0003 HF_AuditorPendientes

### Responsable

HF_AuditorJefe

### Evento

Se activa la orden OT-0003 para auditar el significado real del campo pendiente_cuenca.

### Objetivo

Determinar si pendiente_cuenca representa Sc, Scp, H/L o un alias histórico ambiguo.

### Archivos objetivo

- src/data/cuencasCatalogo.js
- src/services/hidroEngine.js
- src/components/ComparadorMultiMetodo.jsx
- src/data/auditoriaPendientesTc.js
- src/data/clasificacionCuenca.js

### Estado

Abierto.

### Severidad

Alta.

### Regla

No modificar código. Solo buscar, identificar, analizar y reportar.

---

## 2026-05-30 — Registro 0011 — Hallazgo OT-0003 pendiente_cuenca ambigua

### Responsable

HF_AuditorPendientes

### Evento

Se detectó que el campo pendiente_cuenca = 8.43 aparece en cuencasCatalogo.js y es consumido por calcTc como Sp.

### Evidencia

- src/data/cuencasCatalogo.js: pendiente_cuenca: 8.43
- src/services/hidroEngine.js: const Sp = p.pendiente_cuenca
- src/services/hidroEngine.js: calcTc también calcula So y Sf desde cotas y longitud de cauce.

### Hallazgo

pendiente_cuenca es un alias ambiguo. Puede estar representando Sc, Scp o un campo heredado usado por compatibilidad.

### Riesgo

Alto. La ambigüedad puede afectar interpretación de Tc y la defensa técnica del expediente.

### Decisión

No modificar código. Se requiere matriz método-campo para identificar qué pendiente usa cada método de calcTc.

### Estado

Pendiente matriz método-campo calcTc.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0012 — Activación OT-0003A Matriz método-campo calcTc(p)

### Responsable

HF_AuditorJefe

### Evento

Se activa la subtarea OT-0003A para construir matriz método-campo de calcTc(p).

### Objetivo

Identificar método por método qué variables usa calcTc(p), especialmente Sp, So, Sf, L, A, CN y cotas.

### Archivo objetivo

- src/services/hidroEngine.js

### Bloque objetivo

- export function calcTc(p)

### Estado

Abierto.

### Severidad

Alta.

### Regla

No modificar código. Solo buscar, identificar, analizar y reportar.

---

## 2026-05-30 — Registro 0013 — Matriz método-campo calcTc(p) completada

### Responsable

HF_AuditorPendientes con apoyo de HF_AuditorTc

### Evento

Se construyó matriz método-campo para calcTc(p) a partir de evidencia focalizada en src/services/hidroEngine.js.

### Hallazgo principal

calcTc(p) no usa una única pendiente. Témez, Kirpich, California y Pérez-Montg. usan pendientes derivadas del cauce mediante cotas y longitud; Giandotti usa desnivel geomorfológico; SCS-Ranser usa directamente Sp = p.pendiente_cuenca.

### Riesgo

SCS-Ranser queda como método crítico para la auditoría Scp vs Sc porque depende directamente de pendiente_cuenca.

### Decisión

No modificar fórmulas. Mantener pendiente_cuenca como alias ambiguo hasta confirmar si representa Scp o Sc.

### Estado

Matriz método-campo preliminar completada.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0014 — Activación OT-0004 HF_AuditorUnidades

### Responsable

HF_AuditorJefe

### Evento

Se activa OT-0004 para auditar unidades dentro de calcTc(p).

### Objetivo

Verificar unidades y conversiones de So, Sf, Sp, L, Lft, A, cotas, CN y Ss.

### Archivo objetivo

- src/services/hidroEngine.js

### Bloque objetivo

- export function calcTc(p)

### Estado

Abierto.

### Severidad

Alta.

### Regla

No modificar código. Solo buscar, identificar, analizar y reportar.

---

## 2026-05-30 — Registro 0015 — Hallazgos preliminares OT-0004 unidades calcTc(p)

### Responsable

HF_AuditorUnidades

### Evento

Se registran hallazgos preliminares de unidades para calcTc(p).

### Hallazgos principales

- So parece calcularse como pendiente por mil y So/1000 devuelve pendiente decimal.
- Kirpich presenta riesgo de unidad porque Sf divide desnivel aparentemente en metros por longitud en pies.
- SCS-Ranser usa Sp = pendiente_cuenca directamente.
- Pérez-Montg. usa So directamente, a diferencia de Témez y California que usan So/1000.

### Riesgo

Alto. Las unidades de pendiente y longitud pueden explicar parte de los Tc altos o sensibles.

### Decisión

No modificar fórmulas. Se requiere validación numérica de unidades con valores reales de La Iguaná PC_80.

### Estado

Pendiente validación numérica So, Sf, Sp, L, cotas, CN y Ss.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0016 — Validación numérica OT-0004A unidades La Iguaná PC_80

### Responsable

HF_AuditorUnidades

### Evento

Se ejecuta validación numérica preliminar de unidades para calcTc(p) con valores de La Iguaná PC_80.

### Valores base

- L = 15.524 km
- desnivel = 1307.91 m
- Sp = 8.43
- CN = 88

### Hallazgos preliminares

- So = 84.250837
- So/1000 = 0.084251
- Lft = 50931.76 ft
- Sf actual código = 0.02567965
- Sf coherente ft/ft = 0.08425084
- Ss = 34.636364 mm

### Riesgo

Kirpich puede estar usando Sf con mezcla m/ft si el numerador de cota permanece en metros y el denominador está en pies.

### Estado

Pendiente revisión documental de unidad esperada para Kirpich, SCS-Ranser y Pérez-Montg.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0017 — OT-0004B Impacto numérico por unidad en Tc

### Responsable

HF_AuditorUnidades

### Evento

Se ejecuta análisis de impacto numérico por unidad para Kirpich, SCS-Ranser y Pérez-Montg. usando valores reales de La Iguaná PC_80.

### Valores clave

- So/1000 = 0.084251
- Sf actual código = 0.02568
- Sf coherente ft/ft = 0.084251
- Sp porcentaje = 8.43
- Sp decimal = 0.0843
- Ss = 34.636364 mm

### Hallazgos principales

- Kirpich cambia de 134.519 min a 85.139 min si Sf se interpreta como ft/ft coherente.
- SCS-Ranser cambia de 122.024 min a 1220.242 min si Sp se interpreta como decimal.
- Pérez-Montg. cambia según use So directo, decimal o porcentaje.

### Decisión

No modificar fórmulas. Mantener resultados como calculados por motor y pendientes de auditoría documental.

### Estado

Pendiente decisión del HF_AuditorJefe sobre órdenes específicas por método.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0018 — Dictamen preliminar HF_AuditorJefe sobre impacto de unidades en Tc

### Responsable

HF_AuditorJefe

### Evento

Se revisa el impacto numérico de unidades generado en OT-0004B para Kirpich, SCS-Ranser y Pérez-Montg.

### Hallazgos principales

- Kirpich muestra impacto significativo por la diferencia entre Sf actual del código y Sf coherente ft/ft.
- Kirpich pasa aproximadamente de 134.52 min a 85.14 min si se usa Sf coherente ft/ft.
- SCS-Ranser muestra sensibilidad crítica: Sp = 8.43 produce aproximadamente 122.02 min, mientras Sp = 0.0843 produciría aproximadamente 1220.24 min.
- Pérez-Montg. cambia de forma importante según So se use directo, decimal o porcentaje.

### Dictamen preliminar

Los resultados Tc actuales no deben adoptarse todavía. Kirpich, SCS-Ranser y Pérez-Montg. requieren revisión documental específica de unidades antes de cualquier corrección o adopción.

### Decisión

No modificar fórmulas en esta etapa. Mantener resultados como calculados por motor y continuar auditoría documental por método.

### Próxima acción autorizada

Abrir revisión documental específica para Kirpich, SCS-Ranser y Pérez-Montg., iniciando por Kirpich debido al hallazgo de posible mezcla m/ft en Sf.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0019 — Activación OT-0004C Revisión documental Kirpich

### Responsable

HF_AuditorJefe

### Evento

Se activa OT-0004C para revisión documental específica del método Kirpich.

### Objetivo

Confirmar la unidad esperada para Sf en la fórmula Kirpich y evaluar si la implementación actual mezcla desnivel en metros con longitud en pies.

### Evidencia previa

- Sf actual código = 0.02567965
- Sf coherente ft/ft = 0.08425084
- Tc Kirpich actual aproximado = 134.52 min
- Tc Kirpich con Sf coherente aproximado = 85.14 min

### Decisión

No modificar código. Primero completar revisión documental.

### Estado

Abierto.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0020 — Hallazgo documental Kirpich OT-0004C

### Responsable

HF_AuditorUnidades con apoyo de HF_AuditorTc

### Evento

Se registra revisión documental preliminar del método Kirpich.

### Hallazgo principal

La fórmula Kirpich con coeficiente 0.0078 requiere longitud en pies y pendiente adimensional coherente, usualmente ft/ft. En HidroFlow, Lft está en pies, pero Sf parece calcularse como desnivel en metros dividido por longitud en pies.

### Evidencia numérica

- Sf actual código = 0.02567965
- Sf coherente ft/ft = 0.08425084
- Tc Kirpich actual aproximado = 134.52 min
- Tc Kirpich con Sf coherente aproximado = 85.14 min
- Diferencia aproximada = 49.38 min

### Riesgo

Crítico para adopción de Kirpich.

### Decisión

No modificar código todavía. Kirpich queda como método calculado por motor, pero no adoptable hasta decisión del HF_AuditorJefe.

### Próxima acción

El HF_AuditorJefe debe decidir si se autoriza un parche mínimo para corregir Sf o si se mantiene Kirpich solo como referencia auditada.

### Severidad

Crítica.

---

## 2026-05-30 — Registro 0021 — Activación OT-0004D Revisión documental SCS-Ranser

### Responsable

HF_AuditorJefe

### Evento

Se activa OT-0004D para revisión documental del método SCS-Ranser.

### Contexto

SCS-Ranser mostró sensibilidad crítica a la unidad de Sp.

### Evidencia previa

- Sp = 8.43 → Tc ≈ 122.02 min
- Sp = 0.0843 → Tc ≈ 1220.24 min

### Riesgo

Crítico por posible interpretación incorrecta de pendiente.

### Decisión

No modificar código. Proceder con auditoría documental.

### Estado

Abierto.

### Severidad

Crítica.

---

## 2026-05-30 — Registro 0022 — Activación OT-0004D-A Origen pendiente_cuenca

### Responsable

HF_AuditorJefe

### Evento

Se activa rastreo del origen de pendiente_cuenca.

### Objetivo

Determinar unidad, origen y posibles transformaciones de pendiente_cuenca.

### Riesgo

Crítico para SCS-Ranser.

### Estado

En análisis.

### Severidad

Crítica.

---

## 2026-05-30 — Registro 0023 — Cierre OT-0004D SCS-Ranser

### Responsable

HF_AuditorJefe

### Evento

Se cierra auditoría documental del método SCS-Ranser.

### Hallazgo final

pendiente_cuenca (8.43) corresponde a porcentaje (%) pero es usada como pendiente adimensional en la fórmula.

### Impacto

Diferencias del orden de 10x en Tc.

### Decisión

SCS-Ranser queda como método NO ADOPTABLE en el estado actual del motor.

### Estado

Cerrado.

### Severidad

Crítica.

---

## 2026-05-30 — Registro 0024 — Activación OT-0005 Normalización de pendientes

### Responsable

HF_AuditorJefe

### Evento

Se abre OT-0005 para normalización global de pendientes.

### Contexto

Inconsistencias detectadas en Kirpich y SCS-Ranser.

### Objetivo

Definir modelo unificado de pendientes hidrológicas.

### Estado

Abierto.

### Severidad

Crítica.

---

## 2026-05-30 — Registro 0025 — OT-0005-A Adaptador de pendientes

### Responsable

HF_AuditorJefe

### Evento

Se define diseño de adaptador de pendientes para normalización previa al motor.

### Principio

Separar entrada de datos y motor mediante capa de transformación.

### Beneficio

Permite corregir inconsistencias sin modificar hidroEngine.js.

### Estado

En diseño.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0026 — Implementación OT-0005-B

### Responsable

HF_AuditorJefe

### Evento

Se implementa adaptador real de pendientes previo al motor.

### Archivo

src/services/pendientesAdapter.js

### Resultado

Se establece capa de normalización antes de calcTc().

### Impacto

Permite corregir inconsistencia de unidades sin modificar hidroEngine.js.

### Estado

Implementado.

### Severidad

Alta (resolución estructural).

---

## 2026-05-30 — Registro 0027 — Validación OT-0005-C

### Responsable

HF_AuditorJefe

### Evento

Se realiza validación comparativa antes vs después del adaptador.

### Resultado

SCS-Ranser corregido (~10x diferencia).

Kirpich mejora coherencia (~1.6x diferencia).

### Dictamen

El sistema es consistente con adaptador activo.

### Estado

Validado.

### Severidad

Resuelta.

---

## 2026-05-30 — Registro 0028 — OT-0006 Competencia de métodos

### Responsable

HF_AuditorJefe

### Evento

Se establece clasificación de competencia de métodos de Tc.

### Resultado

Se identifica que no todos los métodos son aplicables.

### Impacto

Evita uso incorrecto de fórmulas.

### Estado

En análisis.

### Severidad

Alta.

---

## 2026-05-30 — Registro 0029 — OT-0006-B Intervalo de Tc

### Responsable

HF_AuditorJefe

### Evento

Se define intervalo técnico defendible de Tc basado en métodos competentes.

### Resultado

Tc definido como rango [85.14 , 231.51].

### Decisión

Adoptar Tc como intervalo y no como valor único.

### Estado

Cerrado.

### Severidad

Resuelta.
