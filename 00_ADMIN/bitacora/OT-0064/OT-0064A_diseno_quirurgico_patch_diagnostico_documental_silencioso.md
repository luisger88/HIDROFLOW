# OT-0064A — Diseño quirúrgico del patch funcional de diagnóstico documental silencioso

Fecha: 2026-06-10 22:46:18

## Estado base

- Rama: ot-0064-integracion-interna-silenciosa-diagnostico-documental.
- Rama creada desde main limpio post OT-0063.
- Main base: 42c1bb4, estabilizado post PR #94.
- OT-0063 dejó auditado y diseñado el diagnóstico documental no invasivo.
- Working tree inicial limpio.

## Objetivo

Diseñar el patch funcional mínimo para integrar internamente el diagnóstico documental silencioso, sin aplicar todavía cambios funcionales sobre ComparadorMultiMetodo.jsx.

## Servicio candidato

Servicio puro existente:

01_APP/HIDROFLOW/src/services/documentos/adaptarExpedienteDocumental.js

Función candidata:

adaptarExpedienteDocumental(textoExpediente, metadatosDocumento)

## Import futuro propuesto

El import futuro, si se autoriza OT-0064B, deberá agregarse en ComparadorMultiMetodo.jsx como import de servicio puro.

Forma conceptual:

import adaptarExpedienteDocumental from '../services/documentos/adaptarExpedienteDocumental';

El import no debe introducir React adicional, estado global, motor hidrológico ni dependencias de exportación.

## Punto exacto futuro de ejecución

El diagnóstico futuro deberá ejecutarse inmediatamente después de:

const textoExpediente = [...].join('\\n');

y antes de la validación existente de tokens inválidos y secciones obligatorias.

## Comportamiento permitido

El diagnóstico interno podrá:

- Ejecutar adaptarExpedienteDocumental sobre textoExpediente.
- Recibir metadatos mínimos de trazabilidad.
- Emitir console.warn si el diagnóstico falla.
- Mantenerse no bloqueante.
- No modificar textoExpediente.
- No modificar el flujo de copiado.

## Comportamiento prohibido

- No bloquear el copiado si el diagnóstico documental falla.
- No agregar window.alert nuevo.
- No agregar window.prompt nuevo.
- No reemplazar tokensInvalidosExpediente.
- No reemplazar seccionesObligatoriasExpediente.
- No cambiar texto copiado al portapapeles.
- No crear UI visible.
- No generar PDF.
- No generar Word.
- No generar mapas.
- No tocar hidroEngine.js.
- No recalcular Q-Tr, Q-5 ni Método Racional.

## Pseudopatch futuro

const diagnosticoDocumental = adaptarExpedienteDocumental(textoExpediente, {
  fuenteExpediente: 'ComparadorMultiMetodo.textoExpediente',
  origenPlantilla: 'OT-0064',
  cuencaActiva: contextoBase?.cuencaNombre ?? 'Cuenca activa'
});

if (!diagnosticoDocumental.ok) {
  console.warn('Diagnóstico documental no invasivo:', diagnosticoDocumental);
}

Este pseudopatch no debe bloquear ni modificar el flujo existente.

## Validaciones requeridas para OT-0064B

- Confirmar import del adaptador.
- Confirmar llamada posterior a textoExpediente.
- Confirmar ausencia de modificación del texto copiado.
- Confirmar ausencia de nuevas alertas o prompts.
- Confirmar ausencia de cambios en tokensInvalidosExpediente.
- Confirmar ausencia de cambios en seccionesObligatoriasExpediente.
- Confirmar ausencia de referencias a hidroEngine.js.
- Confirmar ausencia de PDF, Word, mapas y exportaciones complejas.
- Confirmar build Vite.

## Decisión técnica

OT-0064A no implementa el patch funcional. Solo define su diseño quirúrgico. La implementación mínima queda reservada para OT-0064B.

## Criterio de salida

OT-0064A queda completa cuando exista el diseño quirúrgico versionado del patch funcional de diagnóstico documental silencioso, sin cambios funcionales sobre la aplicación.
