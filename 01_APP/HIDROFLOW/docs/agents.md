# Agentes HidroFlow

Este documento describe los agentes técnicos implementados en HidroFlow para
apoyar la verificación hidrológica y normativa de los estudios.

---

## 1. Agente Hidrológico

**Propósito**

Verificar la coherencia técnica del estudio hidrológico generado por HidroFlow.
Este agente actúa como un verificador experto y no modifica resultados.

**Funciones principales**
- Evaluar coherencia entre parámetros morfométricos, lluvia, pérdidas y caudales.
- Emitir mensajes técnicos y advertencias.
- Apoyar el control de calidad del estudio.

**Limitaciones**
- No recalcula caudales.
- No modifica parámetros.
- No optimiza resultados.

**Entradas esperadas**
- Parámetros de cuenca.
- Información de lluvia (Tc, IDF, hietograma).
- Pérdidas hidrológicas (C, CN, AMC).
- Caudales por período de retorno.

**Salidas**
- Estado de coherencia.
- Mensajes técnicos.
- Alertas (si aplica).

---

## 2. Agente Normativo

**Propósito**

Verificar que el contenido del informe cumpla con los criterios normativos y
discursivos exigidos por la autoridad ambiental.

**Funciones principales**
- Validar citación normativa básica.
- Detectar lenguaje prescriptivo o riesgoso.
- Apoyar la preparación de documentos para radicación.

**Fuente de conocimiento**
- Dataset normativo `hidroflow_normativo_ollama.jsonl`.

**Limitaciones**
- No interpreta la norma.
- No reemplaza criterio legal.
- No genera obligaciones nuevas.

**Entradas esperadas**
- Tipo de permiso.
- Textos del informe (justificación, metodología, selección de caudal).

**Salidas**
- Cumplimiento normativo.
- Observaciones.
- Alertas (si aplica).

---

## 3. Integración en HidroFlow

Los agentes son consumidos por el núcleo de HidroFlow como verificadores
independientes. No forman parte del motor de cálculo ni del módulo SIG.

Este diseño permite:
- Separación clara de responsabilidades.
- Auditoría técnica y normativa.
- Escalabilidad del sistema.