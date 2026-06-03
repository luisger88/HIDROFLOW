# Orden OT-0003 — HF_AuditorPendientes
## Misión HF-MISION-0001
## Auditoría Scp vs Sc — La Iguaná PC_80

## Auditor asignado

HF_AuditorPendientes

## Objetivo

Auditar el significado real de pendiente_cuenca y diferenciarlo de Scp y Sc.

## Contexto

HF_AuditorTc localizó en src/services/hidroEngine.js:

const Sp = p.pendiente_cuenca;

Ese campo alimenta calcTc(p), por lo tanto debe auditarse si representa:

- Scp: pendiente del cauce principal hasta PC_80.
- Sc: pendiente media superficial de la cuenca.
- H/L: desnivel sobre longitud hidráulica.
- Alias histórico ambiguo.

## Archivos objetivo iniciales

- src/data/cuencasCatalogo.js
- src/services/hidroEngine.js
- src/components/ComparadorMultiMetodo.jsx
- src/data/auditoriaPendientesTc.js
- src/data/clasificacionCuenca.js

## Mandato cerrado

El auditor debe limitarse a:

- Buscar campos relacionados con pendiente.
- Identificar nombres usados en catálogo y motor.
- Determinar si pendiente_cuenca corresponde a Sc, Scp o alias.
- Relacionar el valor 8.43 % con su origen.
- Comunicar hallazgos al HF_AuditorJefe.

## Qué buscar

- pendiente_cuenca
- pendiente_media
- pendiente_media_pct
- pendienteMedia
- pendiente_pct
- pendiente
- Scp
- Sc
- longitud_cauce
- cota_mayor_cauce
- cota_menor_cauce
- desnivel
- slope

## Qué NO hacer

- No modificar código.
- No renombrar variables.
- No cambiar cálculos.
- No reemplazar pendiente_cuenca.
- No asumir que Scp = Sc.
- No adoptar pendiente sin evidencia.

## Evidencia requerida

Para cada hallazgo:

- Archivo.
- Línea aproximada.
- Campo.
- Valor.
- Significado probable.
- Riesgo.
- Relación con Tc.
- Recomendación.

## Criterio de cierre

La orden OT-0003 se cierra cuando el auditor pueda responder:

1. Qué representa pendiente_cuenca.
2. Si 8.43 % corresponde a Scp o Sc.
3. Qué campo debería alimentar métodos Tc.
4. Qué campo debería alimentar concepto geomorfológico de cuenca.
5. Qué riesgo existe en la nomenclatura actual.
