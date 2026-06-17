# OT-0209A — Ajuste mínimo del generador documental por bloque Markdown

## Objetivo

Corregir de forma mínima el generador documental `Nueva-OTDocumentalHidroFlow` para evitar corrupción de formato Markdown en el documento de cierre generado.

## Antecedente

OT-0208 validó operativamente el generador documental y detectó un hallazgo controlado en el cierre generado.

El cierre presentó corrupción de formato en el bloque Markdown asociado a la ruta de evidencia.

El patrón observado fue compatible con uso de triple backtick dentro de strings PowerShell con comillas dobles.

## Alcance

Esta OT solo ajusta el generador documental mínimo.

No modifica motor.

No modifica UI.

No modifica `textoExpediente`.

No modifica `ComparadorMultiMetodo.jsx`.

No modifica `construirExpedienteHidrologicoMinimo.js`.

No modifica helpers.

No modifica validadores existentes.

No modifica Q-5 operativo.

No modifica Método Racional.

No modifica diagnóstico Q(t).

## Archivo objetivo

```text
07_TOOLBOX/powershell/hidroflow-ot-generator.ps1
```

## Ajuste previsto

Reemplazar las líneas de bloque Markdown con triple backtick escritas como strings de comillas dobles por strings de comillas simples dentro del arreglo `$lineasC`.

## Criterio de validación

La validación debe confirmar:

- que el generador carga correctamente;
- que `Nueva-OTDocumentalHidroFlow` sigue disponible;
- que una generación sandbox produce cierre con bloque Markdown legible;
- que no quedan residuos de formato como `` `       ext ``;
- que la prueba sandbox se elimina después de validar;
- que no hay diff en archivos críticos de aplicación.
