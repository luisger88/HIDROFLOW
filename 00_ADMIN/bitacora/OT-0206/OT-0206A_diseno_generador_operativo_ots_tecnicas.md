# OT-0206A — Diseño del generador operativo de OTs técnicas

## Objetivo

Diseñar un generador operativo seguro para crear OTs técnicas repetibles dentro de HidroFlow, reduciendo la dependencia de bloques largos pegados manualmente en consola.

## Antecedente

OT-0205 definió la necesidad de detener la progresión mecánica bloque por bloque y abrir una fase de automatización operativa controlada.

La motivación principal es reducir errores derivados de:

- here-strings incompletos;
- modo de continuación `>>`;
- archivos parciales;
- recuperación manual;
- repetición excesiva de comandos;
- ciclos auditoría-validación-comparación demasiado manuales.

## Alcance

Esta OT es exclusivamente documental y de diseño.

No implementa todavía el generador.

No crea funciones PowerShell operativas.

No modifica scripts existentes.

No modifica código de aplicación.

No modifica helpers.

No modifica validadores existentes.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No toca Q-5 operativo.

No toca Método Racional.

No toca diagnóstico Q(t).

No toca motor hidrológico.

## Problema operativo a resolver

El flujo actual exige construir manualmente documentos, validadores, cierres, comandos Git y verificaciones de diff para cada OT.

Aunque el método es seguro, su ejecución manual genera fricción y errores de pegado.

El generador debe convertir ese patrón en una operación controlada, parametrizable y auditable.

## Principio de diseño

El generador no debe modificar código funcional ni tomar decisiones técnicas por sí mismo.

Debe limitarse a crear estructura documental, scripts de validación y comandos seguros según una plantilla explícita aprobada.

## Entradas mínimas del generador

| Entrada | Descripción | Ejemplo |
|---|---|---|
| `NumeroOT` | Identificador de la OT | `0207` |
| `SlugOT` | Nombre corto para rama y archivos | `auditoria-volumen-referencia` |
| `TipoOT` | Tipo de operación | `documental`, `auditoria`, `validacion`, `comparacion`, `consolidacion` |
| `TituloOT` | Título humano de la OT | `Auditoría bloque Volumen de referencia` |
| `BloqueObjetivo` | Helper, bloque o componente auditado | `construirLineasVolumenReferenciaExpediente` |
| `Restricciones` | Lista de archivos o sistemas que no deben tocarse | `textoExpediente`, `motor`, `Q-5` |

## Salidas esperadas del generador

El generador debe poder producir:

```text
00_ADMIN/bitacora/OT-XXXX/OT-XXXXA_apertura_*.md
00_ADMIN/bitacora/OT-XXXX/OT-XXXXB_evidencia_*.md
00_ADMIN/bitacora/OT-XXXX/OT-XXXXC_cierre_*.md
07_TOOLBOX/validaciones/*.mjs cuando aplique
comandos Git seguros para add/commit/push
```

## Tipos de OT contemplados

| Tipo | Descripción | Genera script |
|---|---|---|
| `documental` | Solo crea apertura o decisión documental | No |
| `auditoria` | Revisa existencia, rutas y exportaciones sin modificar código | Sí |
| `validacion` | Ejecuta casos controlados sobre helper o función | Sí |
| `comparacion` | Compara salida aislada contra ruta operativa | Sí |
| `consolidacion` | Registra cierre de ciclo | No |

## Controles obligatorios

Todo flujo generado debe incluir:

- verificación de rama actual;
- creación controlada de carpetas;
- escritura de archivos mediante arreglos o plantillas seguras;
- ejecución explícita de validadores cuando aplique;
- verificación de diffs críticos;
- `git status --short` antes y después;
- prohibición de tocar motor o UI salvo OT de implementación explícita.

## Diffs críticos estándar

Para OTs del expediente hidrológico mínimo, el generador debe verificar por defecto:

```powershell
git diff -- "01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"
git diff -- "01_APP\HIDROFLOW\src\services\documentos\construirExpedienteHidrologicoMinimo.js"
```

## Comportamiento esperado del generador

El generador debe trabajar con pasos pequeños y verificables.

Debe evitar bloques excesivamente largos en consola.

Debe preferir plantillas, arreglos PowerShell o archivos temporales controlados antes que here-strings extensos pegados manualmente.

Debe dejar siempre trazabilidad clara de qué creó, qué ejecutó y qué no modificó.

## Relación con agentes IA

El generador será la base operativa para agentes documentales y técnicos futuros.

Los agentes podrán preparar contenido, pero el generador debe imponer estructura, restricciones y verificaciones.

Ningún agente debe tener permiso implícito para modificar motor, UI, `textoExpediente`, helpers o flujo de copiado sin una OT explícita de implementación.

## Relación con módulo Hidráulica

Antes de ampliar a Hidráulica, conviene validar este patrón en Hidrología.

El módulo Hidráulica requerirá agentes para revisar geometría, secciones, cotas, pendientes, condiciones de borde, coherencia hidráulica y reportes.

Por tanto, el generador debe diseñarse como herramienta transversal, no como solución exclusiva del expediente hidrológico.

## Decisión de diseño

Se diseña un generador operativo de OTs técnicas basado en plantillas, parámetros explícitos, restricciones fuertes y verificaciones de diff.

No se implementa todavía en esta OT.

La siguiente OT podrá implementar una versión mínima documental del generador, sin tocar motor ni expediente operativo.

## Próximo frente recomendado

`OT-0207 — Implementación mínima del generador documental de OTs`
