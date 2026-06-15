# OT-0142A — Apertura diseño función pura Tiempo de concentración y roles Tc

## Objetivo

Diseñar la función pura futura del bloque `## 3. Tiempo de concentración y roles Tc`, sin implementarla todavía.

## Antecedente

OT-0140 definió el contrato documental preliminar del bloque.

OT-0141 extrajo la forma exacta del bloque operativo desde `ComparadorMultiMetodo.jsx`.

La extracción exacta confirmó las líneas operativas actuales:

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador
Tr global activo
Nota Tr
Roles Tc
Tc global Índice
Tc operativo Q(t)
Duración evento
Lag / forma SCS
Tc comparador como referencia Q-5
```

## Alcance

Esta OT solo diseña la función pura.

No implementa helper.

No modifica `ComparadorMultiMetodo.jsx`.

No sustituye `textoExpediente`.

No integra nada en UI.

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

## Regla técnica principal

- No recalcular Tc.
- No inferir Tc.
- No derivar roles.
- No reinterpretar competencia.
- No generar advertencias nuevas.
- Solo representar valores ya presentes en el contexto operativo.
