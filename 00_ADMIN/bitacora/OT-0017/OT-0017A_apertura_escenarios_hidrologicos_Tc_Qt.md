# OT-0017A — Apertura escenarios hidrológicos Tc para Q(t)

## Objetivo

Abrir el frente de escenarios hidrológicos Tc para Q(t), separando explícitamente las rutas Tc visibles en HidroFlow sin sobrescribir silenciosamente la física del módulo Hidrogramas.

## Problema

HidroFlow ya muestra rutas Tc diferenciadas:

- Tc global del Índice Hidrológico.
- Tc operativo de Hidrogramas asociado a la ruta interna Q(t).
- Tc especializado del Comparador Multi-Método.

Estas rutas no deben confundirse ni forzarse automáticamente entre sí.

## Tesis

La conciliación matemática real debe manejarse mediante escenarios explícitos, no mediante un toggle que reemplace el Tc operativo de Hidrogramas sin trazabilidad.

## Alcance inicial

- Definir escenarios Tc para análisis Q(t).
- Mantener intacto el cálculo operativo actual.
- Preparar comparación futura de Qp, Tp, Volumen y forma del hidrograma.
- Evitar carga espacial adicional hasta cerrar la arquitectura de escenarios.

## Escenarios candidatos

- Escenario operativo Hidrogramas.
- Escenario Tc global Índice.
- Escenario Tc especializado Comparador.

## Restricciones

- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No forzar Tc global sobre Hidrogramas.
- No alterar Qp, Tp, Volumen ni Q(t) en esta fase.
- No introducir setTimeout.
- No introducir console.log permanentes.

## Decisión inicial

No se implementará un toggle de sobrescritura directa del Tc operativo.

La estrategia será construir escenarios explícitos y trazables para análisis comparativo.

## Estado

Apertura documental. Sin cambios funcionales.
