# OT-0014G — Cierre técnico Índice Hidrológico global

## Objetivo

Cerrar técnicamente la OT-0014, consolidando la auditoría, diseño, implementación y validación del despertar del Índice Hidrológico global.

## Alcance ejecutado

- OT-0014A: apertura y auditoría inicial del Índice Hidrológico global.
- OT-0014B: auditoría del Tc mostrado en Hidrogramas frente a tcAgent.
- OT-0014C: auditoría del origen de params.tcMedMin.
- OT-0014D: auditoría de tcAgent como estado global Tc.
- OT-0014E: diseño de publicación base Tc para despertar el Índice.
- OT-0014F: implementación de publicación base Tc desde HidroFlow.jsx.
- Tooling operativo: creación de utilidades PowerShell permanentes para reducir dependencia del chat.
- Git hygiene: .gitignore actualizado para ignorar inventarios locales.

## Resultado técnico

El Índice Hidrológico global ya puede despertar fuera del Comparador Multi-Método mediante una publicación base Tc desde HidroFlow.jsx hacia tcAgent.

La publicación base no reemplaza el estado especializado del Comparador, porque primero revisa el estado actual de tcAgent.

## Validación visual

Se validó visualmente que el Índice Hidrológico muestra Tc, métodos válidos y rango bruto en Parámetros e Hidrogramas.

También se validó que el Comparador conserva el estado especializado con Tc sugerido, rango bruto, rango competente y advertencia técnica.

## Hallazgo pendiente

Persisten rutas distintas de lectura Tc:

- Tc base global publicado desde HidroFlow.jsx.
- Tc interno de Hidrogramas basado en params.tcMedMin o tc_min.
- Tc especializado del Comparador basado en seleccionarTc y tcAgent enriquecido.

Esta divergencia queda identificada para una OT posterior de conciliación de Tc, no se corrige dentro de OT-0014.

## Restricciones respetadas

- No se modificó hidroEngine.js.
- No se modificaron fórmulas Tc.
- No se cambió params.tcMedMin.
- No se cambió el Tc_final especializado del Comparador.
- No se introdujeron setTimeout.
- No se introdujeron console.log permanentes.
- No se eliminó trazabilidad histórica.

## Tooling incorporado

Se creó:

07_TOOLBOX/powershell/hidroflow-git-tools.ps1

con funciones para:

- Ver-EstadoHidroFlow
- Confirmar-Bitacora
- Confirmar-CambioFuncional
- Nueva-Bitacora

Además, se actualizó .gitignore para excluir inventarios locales:

10_LOGS/inventario_hidroflow_*.txt

## Dictamen

OT-0014 cumple su objetivo: despertar el Índice Hidrológico global y reducir la dependencia operativa del chat mediante herramientas PowerShell versionadas.

## Estado

OT-0014 lista para PR.
