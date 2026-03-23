import { InformeHidrologico } from "./generarInformeHidrologico";

export function generarResumenEjecutivoAmbiental(
  informe: InformeHidrologico
): string {

  const e = informe.estadoNormativo;

  return `
RESUMEN EJECUTIVO AMBIENTAL – HIDROFLOW

Cuenca: ${informe.cuenca}
Autoridad Ambiental: ${e.autoridadAmbiental}
Evento Normativo de Análisis: Tr = ${e.Tr_normativo} años

DESCRIPCIÓN GENERAL
El presente estudio evalúa el comportamiento hidrológico de la cuenca bajo un evento
extremo, conforme a las recomendaciones de la autoridad ambiental competente.

CRITERIO HIDROLÓGICO
El caudal generado bajo la condición post‑urbana se evalúa para garantizar la seguridad
hidráulica del sistema. No obstante, el caudal descargado hacia la fuente hídrica se
limita al régimen natural de la cuenca.

REGULACIÓN MEDIANTE SAR
${e.aplicaSAR
  ? `Se implementa un Sistema de Almacenamiento y Regulación (SAR) conforme a la Guía
Técnica GT‑AS‑004, limitando la descarga a Q_pre‑urbano.`
  : `No se requiere la implementación de un sistema SAR debido a la ausencia de
procesos de urbanización.`}

CONCLUSIÓN AMBIENTAL
La solución propuesta garantiza que la descarga no incrementa el impacto hidrológico
sobre la fuente hídrica, cumpliendo los lineamientos ambientales y técnicos vigentes.

Documento generado automáticamente por HidroFlow.
`.trim();
}