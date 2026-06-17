# OT-0211B — Protocolo operativo mínimo del generador documental

## Objetivo

Definir el uso controlado de `Nueva-OTDocumentalHidroFlow` dentro del flujo operativo de HidroFlow.

## Estado de la herramienta

La función `Nueva-OTDocumentalHidroFlow` quedó creada, ajustada y revalidada en el ciclo:

- OT-0207: implementación mínima;
- OT-0208: validación operativa con hallazgo;
- OT-0209: ajuste mínimo Markdown;
- OT-0210: revalidación operativa aprobada.

## Carga manual recomendada

Por ahora, la carga debe ser explícita por sesión de PowerShell:

```powershell
. "07_TOOLBOX\powershell\hidroflow-ot-generator.ps1"
```

No se modifica todavía el perfil de PowerShell.

## Uso recomendado

La función debe usarse solo para OTs documentales mínimas o aperturas/cierres controlados.

Ejemplo de uso:

```powershell
Nueva-OTDocumentalHidroFlow `
  -NumeroOT "0212" `
  -SlugOT "validacion-uso-repetible-generador-documental" `
  -TituloOT "Validación de uso repetible del generador documental" `
  -Objetivo "Validar que el generador documental puede reutilizarse de forma controlada en una OT no sensible." `
  -ProximoFrente "Pendiente de definir."
```

## Lo que la herramienta sí hace

- Crea la carpeta `00_ADMIN/bitacora/OT-XXXX`.
- Crea documento de apertura `OT-XXXXA_apertura_*.md`.
- Crea documento de cierre `OT-XXXXC_cierre_*.md`.
- Registra objetivo, alcance, restricciones y próximo frente.
- Sugiere comandos Git.

## Lo que la herramienta no hace

- No ejecuta `git add`.
- No ejecuta `git commit`.
- No ejecuta `git push`.
- No modifica motor.
- No modifica UI.
- No modifica `textoExpediente`.
- No modifica `ComparadorMultiMetodo.jsx`.
- No modifica `construirExpedienteHidrologicoMinimo.js`.
- No modifica helpers.
- No modifica validadores existentes.

## Verificaciones obligatorias después de usarla

Después de generar una OT documental, siempre ejecutar:

```powershell
git diff -- "01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx"
git diff -- "01_APP\HIDROFLOW\src\services\documentos\construirExpedienteHidrologicoMinimo.js"
git status --short
```

## Criterio de seguridad

Si aparece cualquier diff en archivos críticos de aplicación, se debe detener el flujo y revisar antes de hacer commit.

## Decisión operativa

El generador queda integrado de forma mínima al flujo de trabajo como herramienta de apoyo documental cargada manualmente.

No se automatiza su carga global.

No se automatizan commits.

No se usa todavía sobre bloques sensibles del expediente.

## Próximo frente recomendado

`OT-0212 — Validación de uso repetible del generador documental en una OT no sensible`
