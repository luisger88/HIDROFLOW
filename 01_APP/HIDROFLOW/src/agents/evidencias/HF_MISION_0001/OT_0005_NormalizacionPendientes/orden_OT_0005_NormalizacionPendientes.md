# Orden OT-0005 — Normalización global de pendientes

## Misión HF-MISION-0001

## Objetivo

Establecer un modelo unificado, explícito y trazable de pendientes para uso en todos los métodos de tiempo de concentración.

## Contexto

Las auditorías OT-0004C (Kirpich) y OT-0004D (SCS-Ranser) revelaron inconsistencias estructurales en el uso de pendientes.

Problemas detectados:

- Uso de pendiente media (%) como pendiente hidrológica.
- Falta de conversión a unidades adimensionales.
- Ambigüedad en variable pendiente_cuenca.

## Mandato cerrado

- Definir tipos de pendiente hidrológica.
- Establecer unidades obligatorias.
- Proponer modelo de variables.
- Definir reglas de uso por método.
- No modificar código en esta etapa.

## Tipos de pendiente a definir

- Scp: pendiente del cauce principal (hidráulica)
- Sc: pendiente media de cuenca
- So: pendiente del cauce (perfil longitudinal)
- Sp: pendiente usada por método específico

## Principio obligatorio

Ningún método podrá usar pendientes sin unidad explícita y conversión definida.

## Criterio de cierre

OT-0005 se cierra cuando:

1. Exista definición formal de pendientes.
2. Sean asignadas unidades explícitas.
3. Se establezca relación entre variables.
4. Se definan reglas por método.
