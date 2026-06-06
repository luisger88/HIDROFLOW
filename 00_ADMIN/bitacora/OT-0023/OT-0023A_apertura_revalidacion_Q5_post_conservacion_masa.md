# OT-0023A — Apertura revalidación Q-5 post conservación de masa

## Objetivo

Revalidar el bloque Q-5 después de la corrección de conservación de masa aplicada en OT-0022.

## Problema

OT-0022 corrigió la escala de masa de los hidrogramas unitarios, pero todavía debe revisarse cómo quedaron las magnitudes Qp, Tp, Volumen, alertas Tc/Tp, semáforo de escala y observaciones técnicas.

## Tesis

Después de corregir conservación de masa, HidroFlow debe reclasificar la lectura técnica de Q-5. No todos los métodos deben presentarse como equivalentes o adoptivos.

## Marco de lectura

La guía GT-AS-004 prioriza la generación de hidrogramas mediante SCS para almacenamiento/regulación y permite metodologías alternativas solo con justificación. Por tanto, Q-5 debe distinguir entre método principal, variantes y métodos comparativos.

## Alcance inicial

- Revalidar visualmente Qp, Tp y Volumen post-normalización.
- Verificar que el volumen quede cercano a la referencia Pe × Área × 1000.
- Revisar alertas Tc/Tp persistentes.
- Revisar observaciones técnicas por método.
- Proponer clasificación inicial de métodos Q-5.

## Restricciones

- No usar caudales externos como fundamento de corrección.
- No usar SIATA para justificar caudales.
- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp.
- No alterar Tp.
- No alterar Volumen.
- No alterar Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
