# OT-0013A — Apertura auditoría Tc–Tp–Qp–Volumen

## Objetivo

Abrir la auditoría hidrológica de coherencia entre Tc, Tp, Qp y Volumen en el Comparador Hidrológico Multi-Método.

## Tesis

Los resultados de hidrogramas no deben adoptarse solo porque el motor los calcula. Deben auditarse frente a coherencia temporal, unidades, volumen, caudal pico y relación física con el Tc utilizado.

## Alcance inicial

- Auditar cómo se muestran Tc, Tp, Qp y Volumen.
- Identificar de dónde vienen los valores del motor.
- Verificar si las unidades son explícitas.
- Revisar coherencia Tc vs Tp.
- Revisar coherencia Qp vs Volumen.
- Mantener el comparador en modo no adoptivo.

## Restricciones

- No modificar hidroEngine.js sin auditoría previa.
- No modificar fórmulas.
- No cambiar resultados del motor.
- No cambiar Tc_final.
- No introducir constantes manuales.
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
