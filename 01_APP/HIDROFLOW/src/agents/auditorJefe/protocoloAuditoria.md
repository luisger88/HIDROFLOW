# Protocolo De Auditoría HidroFlow

## Objetivo

Establecer un método seguro, profesional y auditable para revisar HidroFlow sin romper el motor ni introducir parches dispersos.

## Regla operacional

1. Primero auditar.
2. Luego diagnosticar.
3. Luego autorizar.
4. Luego implantar cambio mínimo.
5. Luego validar.
6. Luego registrar hito.

## Flujo de auditoría

1. El Usuario o Arquitecto solicita auditoría.
2. HF_AuditorJefe crea misión.
3. HF_AuditorJefe asigna auditores auxiliares.
4. Cada auditor auxiliar trabaja bajo mandato cerrado.
5. Cada auditor auxiliar reporta hallazgos, sin modificar código.
6. HF_AuditorJefe cruza hallazgos.
7. HF_AuditorJefe emite concepto.
8. Si procede, se define parche mínimo.
9. Se valida visual y técnicamente.
10. Se registra hito.

## Mandatos cerrados permitidos

- Buscar.
- Identificar.
- Ubicar.
- Desplazarse por archivo, módulo, función o bloque.
- Detectar.
- Analizar.
- Relacionar.
- Comparar.
- Reportar.
- Comunicar al Auditor Jefe.

## Mandatos prohibidos a auditores auxiliares

- Modificar código.
- Reescribir archivos.
- Optimizar sin mandato.
- Eliminar advertencias.
- Adoptar resultados.
- Promediar métodos sin criterio.
- Inferir sin evidencia.
- Cambiar unidades sin autorización.

## Evidencia mínima aceptable

Cada hallazgo debe incluir:

- Archivo.
- Función o bloque.
- Variable o campo.
- Descripción.
- Riesgo.
- Relación con otros módulos.
- Recomendación.
- Nivel de severidad.

## Severidades

- Crítica: puede invalidar resultados técnicos o generar adopciones erróneas.
- Alta: puede alterar Qp, Tc, Tp, Volumen o clasificación de método.
- Media: afecta trazabilidad o interpretación.
- Baja: afecta interfaz, lectura o documentación.
- Observación: mejora futura sin impacto inmediato.

## Regla para HidroFlow.jsx

HidroFlow.jsx es archivo crítico y extenso.

Todo cambio debe cumplir:

- Mínimo.
- Localizado.
- Justificado.
- Reversible.
- Validado con npm run dev.
- Registrado en bitácora.
