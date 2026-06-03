# Orden OT-0003A — Matriz método-campo calcTc(p)
## Misión HF-MISION-0001
## Auditoría Scp vs Sc — La Iguaná PC_80

## Auditor asignado

HF_AuditorPendientes con apoyo de HF_AuditorTc.

## Objetivo

Construir una matriz método-campo para la función calcTc(p) ubicada en src/services/hidroEngine.js.

## Contexto

OT-0003 detectó que calcTc(p) usa el campo:

const Sp = p.pendiente_cuenca;

y además calcula pendientes derivadas del cauce:

const So = ((p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 1000)) * 1000;
const Sf = (p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 3280.84);

Esto exige identificar, método por método, qué variable usa cada fórmula.

## Archivo objetivo principal

- src/services/hidroEngine.js

## Bloque objetivo

- export function calcTc(p)

## Mandato cerrado

El auditor debe limitarse a:

- Identificar cada método retornado por calcTc(p).
- Transcribir la fórmula observada por método.
- Identificar variables usadas por cada método.
- Clasificar la pendiente usada por cada método.
- Diferenciar Sp, So, Sf, L, A, CN y cotas.
- Reportar riesgos de unidad o ambigüedad.
- Comunicar hallazgos al HF_AuditorJefe.

## Qué buscar

- Témez
- Kirpich
- California
- Giandotti
- SCS
- Ranser
- Perez
- Montoya
- L
- A
- Sp
- So
- Sf
- CN
- Ss
- cota_mayor_cauce
- cota_menor_cauce
- longitud_cauce
- pendiente_cuenca

## Qué NO hacer

- No modificar hidroEngine.js.
- No modificar calcTc(p).
- No corregir fórmulas.
- No cambiar nombres de variables.
- No adoptar Tc.
- No asumir Scp = Sc.
- No inferir unidades sin evidencia.

## Evidencia requerida

Para cada método Tc:

- Método.
- Fórmula observada.
- Variables usadas.
- Campo de pendiente usado.
- Tipo de pendiente inferido: Scp, Sc, H/L, So, Sf, Sp o ambigua.
- Unidad esperada.
- Unidad inferida.
- Riesgo.
- Recomendación.

## Criterio de cierre

La orden OT-0003A se cierra cuando exista una matriz método-campo que responda:

1. Qué métodos usan Sp = pendiente_cuenca.
2. Qué métodos usan So o Sf calculados desde cotas y longitud.
3. Qué métodos usan CN o SCS_RETENCION_MM.
4. Qué métodos usan área A.
5. Qué métodos dependen principalmente de L.
6. Qué métodos requieren reclasificación Scp vs Sc.
7. Qué métodos presentan riesgo de unidad.
