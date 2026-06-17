# OT-0207A — Implementación mínima del generador documental de OTs

## Objetivo

Implementar una versión mínima, segura y documental del generador operativo de OTs técnicas definido en OT-0206.

## Antecedente

OT-0205 definió la necesidad de automatizar el ciclo auditor-validación-comparación.

OT-0206 diseñó el generador operativo de OTs técnicas como herramienta basada en plantillas, parámetros explícitos, restricciones fuertes y verificaciones de diff.

## Alcance

Esta OT implementa solo una herramienta documental mínima.

No implementa agentes autónomos.

No implementa auditorías automáticas.

No implementa validaciones automáticas.

No implementa comparaciones automáticas.

No ejecuta commits automáticos.

No modifica código de aplicación.

No modifica helpers.

No modifica validadores existentes.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

## Herramienta candidata

Se propone crear:

```text
07_TOOLBOX/powershell/hidroflow-ot-generator.ps1
```

## Función mínima

La función mínima será:

```powershell
Nueva-OTDocumentalHidroFlow
```

## Responsabilidad de la función

La función debe:

- crear la carpeta `00_ADMIN/bitacora/OT-XXXX`;
- crear un documento `OT-XXXXA_apertura_*.md`;
- crear un documento `OT-XXXXC_cierre_*.md`;
- registrar objetivo, alcance, restricciones y próximo frente;
- imprimir comandos Git sugeridos;
- no ejecutar `git add`, `git commit` ni `git push` automáticamente.

## Restricciones de seguridad

La función no debe modificar:

- motor hidrológico;
- UI;
- `textoExpediente`;
- `ComparadorMultiMetodo.jsx`;
- `construirExpedienteHidrologicoMinimo.js`;
- helpers;
- validadores existentes;
- botón de copiado;
- portapapeles;
- Q-5 operativo;
- Método Racional;
- diagnóstico Q(t).

## Criterio de validación

La validación de esta OT debe confirmar:

- que el script PowerShell existe;
- que la función `Nueva-OTDocumentalHidroFlow` queda disponible al dot-source;
- que el script se puede cargar sin error de sintaxis;
- que no hay diff en archivos críticos de aplicación.

## Próximo frente recomendado

`OT-0208 — Validación aislada del generador documental de OTs`
