# Reporte OT-0005-B — Implementación del adaptador

## Estado

Implementado.

## Componente creado

src\services\pendientesAdapter.js

## Funcionalidad

Transforma pendientes antes de entrar al motor:

- Sc (%) → Sc/100
- So (‰) → So/1000
- Sf → directa

## Integración esperada

Antes de calcTc(p):

import { normalizarPendiente } from './pendientesAdapter';

p.Sp = normalizarPendiente(metodo, datos);

## Beneficio

- Corrige SCS-Ranser sin tocar motor
- Permite control de unidades
- Mantiene trazabilidad

## Riesgo

Bajo si se aplica antes de cada cálculo Tc.

## Estado

Listo para integración en flujo real.
