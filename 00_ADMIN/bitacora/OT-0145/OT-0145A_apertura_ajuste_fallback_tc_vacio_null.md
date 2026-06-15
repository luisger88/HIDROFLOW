# OT-0145A — Apertura ajuste fallback Tc vacío/null

## Objetivo

Ajustar el helper `construirLineasTiempoConcentracionRolesTcExpediente(...)` para que `Tc_final` vacío o nulo no se represente como `0.0 min`.

## Antecedente

OT-0144 validó de forma reforzada el helper y documentó que:

```text
Tc_final: ""   → 0.0 min
Tc_final: null → 0.0 min
```

Este comportamiento ocurre porque en JavaScript `Number("")` y `Number(null)` producen `0`.

## Decisión técnica

Para un bloque hidrológico sensible, un `Tc` vacío o nulo debe representarse como fallback documental `—`, no como `0.0 min`.

## Alcance

Esta OT modifica únicamente el helper documental.

No modifica `ComparadorMultiMetodo.jsx`.

No integra en UI.

No sustituye `textoExpediente`.

## Restricciones

No se modifica:

- `ComparadorMultiMetodo.jsx`;
- `textoExpediente`;
- botón de copiado;
- portapapeles;
- Q-5;
- Método Racional;
- diagnóstico Q(t);
- validadores finales;
- motor hidrológico.
