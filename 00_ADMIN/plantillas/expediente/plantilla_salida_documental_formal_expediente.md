# Plantilla de salida documental formal — Expediente hidrológico

> Plantilla conceptual.
> No genera PDF, Word, mapas ni anexos.
> No recalcula resultados.
> Fuente técnica primaria: expediente exportable validado en `textoExpediente`.

---

# 1. Portada técnica

**Título del documento:** Expediente hidrológico mínimo
**Herramienta:** HidroFlow
**Tipo de salida:** Documento técnico formal derivado del expediente exportable
**Cuenca activa:** [CUENCA_ACTIVA]
**Fecha de generación:** [FECHA_GENERACION]
**Estado técnico:** CONSISTENTE CON ADVERTENCIAS

---

# 2. Resumen ejecutivo

[RESUMEN_EJECUTIVO]

El expediente corresponde a una salida técnica verificable basada en resultados internos de HidroFlow. La información se presenta como diagnóstico reproducible no adoptivo, sujeto a revisión hidrológica profesional.

---

# 3. Identificación de la cuenca

- **Cuenca:** [CUENCA_ACTIVA]
- **Área:** [AREA_KM2] km²
- **Estación IDF:** [ESTACION_IDF]
- **Periodo de retorno activo:** [TR_ACTIVO] años
- **Fuente del escenario:** [FUENTE_ESCENARIO]

---

# 4. Parámetros hidrológicos base

- **CN efectivo:** [CN_EFECTIVO]
- **S:** [S_MM] mm
- **Ia:** [IA_MM] mm
- **Lluvia efectiva total:** [PE_TOTAL_MM] mm
- **Tiempo de concentración:** [TC_MIN] min

---

# 5. Contexto Tc / Tr / roles hidrológicos

[CONTEXTO_TC_TR]

Debe conservarse la distinción entre:

- Tc global del Índice Hidrológico.
- Tc operativo de Q(t).
- Duración del evento.
- Parámetros de forma temporal.
- Tr global activo como estado visual/exportable.

---

# 6. Volumen de referencia

- **Lluvia efectiva total:** [PE_TOTAL_MM] mm
- **Área:** [AREA_KM2] km²
- **Volumen esperado:** [VOLUMEN_ESPERADO_M3] m³

Fórmula de referencia:

Pe(mm) × Área(km²) × 1000

---

# 7. Escenario Q-Tr activo

[ESCENARIO_QTR_ACTIVO]

Este bloque documenta el escenario de periodo de retorno activo como control de trazabilidad. No recalcula caudales, no modifica Q-5 y no constituye adopción técnica final.

---

# 8. Resumen Q-5 auditado

[TABLA_Q5_AUDITADA]

Lectura técnica:

- SCS Unit Hydrograph: candidato principal de referencia.
- SCS Mod.: variante ajustable.
- Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.
- Qp y Tp permanecen sujetos a revisión temporal antes de adopción técnica.

---

# 9. Método Racional como contraste global independiente

[TABLA_METODO_RACIONAL]

El Método Racional se presenta como contraste global independiente de caudal pico. No pertenece al bloque Q-5 de hidrogramas y no debe adoptarse como método principal para la cuenca sin revisión de competencia, duración Tc y alcance normativo.

---

# 10. Contraste Q-5 vs Método Racional

[CONTRASTE_Q5_RACIONAL]

Q-5 y Método Racional son complementarios, pero no equivalentes. Ningún resultado debe adoptarse automáticamente sin revisión de competencia metodológica, escala de cuenca, duración Tc y alcance normativo.

---

# 11. Control de consistencia cruzada

[CONTROL_CONSISTENCIA_CRUZADA]

Debe incluir, como mínimo:

- Pe total.
- Área.
- Volumen esperado.
- Método Q-5 principal.
- Volumen Q-5 principal.
- Relación volumen Q-5 / volumen esperado.
- Resultado de consistencia volumétrica.
- Estado Q-Tr activo.

---

# 12. Validación interna del expediente

[VALIDACION_INTERNA]

La validación interna debe confirmar:

- Estructura exportable presente.
- Tokens inválidos ausentes.
- Secciones obligatorias presentes.
- Q-Tr activo presente.
- Q-5 auditado presente.
- Método Racional presente.
- Consistencia cruzada presente.
- Sello técnico presente.
- Restricciones presentes.

---

# 13. Sello técnico de generación

**Herramienta:** HidroFlow
**Tipo de salida:** Expediente hidrológico mínimo
**Cuenca activa:** [CUENCA_ACTIVA]
**Fecha de generación:** [FECHA_GENERACION]
**Estado técnico:** CONSISTENTE CON ADVERTENCIAS
**Alcance:** Diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.

---

# 14. Restricciones y advertencias técnicas

- No usar como valor adoptivo final sin revisión profesional.
- No se usaron caudales externos como fundamento.
- No se usó SIATA para justificar caudales.
- No se modifica el motor hidrológico.
- No se recalculan hidrogramas.
- No se alteran Qp, Tp, Volumen ni Q(t).
- No se reemplaza el criterio profesional.
- No constituye documento normativo final sin revisión y firma responsable.

---

# 15. Trazabilidad

**Fuente primaria:** `textoExpediente` en `ComparadorMultiMetodo.jsx`
**Línea estratégica de origen:** OT-0059
**Línea documental:** OT-0060
**Tipo de plantilla:** textual formal, no exportadora
**Estado de automatización:** pendiente para fases posteriores

---
