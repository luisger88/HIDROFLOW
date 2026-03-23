import { InformeHidrologico } from "./generarInformeHidrologico";
import css from "./plantillas/informeHidrologico.css?inline";

/* =========================================================
 * FUNCIONES AUXILIARES – INTÉRPRETE NORMATIVO
 * ========================================================= */

function renderResumenEjecutivoAmbiental(informe: InformeHidrologico): string {
  if (informe.modoInforme !== "AUDITORIA_AMBIENTAL") return "";

  const e = informe.estadoNormativo;

  return `
<h2>Resumen Ejecutivo Ambiental</h2>

<p>
El presente estudio hidrológico evalúa el comportamiento de la cuenca bajo un evento
normativo de análisis con período de retorno <strong>Tr = ${e.Tr_normativo} años</strong>,
conforme a las recomendaciones de la autoridad ambiental competente (${e.autoridadAmbiental}).
</p>

<p>
Aunque el caudal generado por la condición post-urbana alcanza valores elevados,
la implementación de un sistema de almacenamiento y regulación (SAR) permite limitar
la descarga hacia la fuente hídrica al régimen natural de la cuenca, evitando impactos
hidrológicos aguas abajo y garantizando el cumplimiento normativo.
</p>
`;
}

function renderMarcoNormativo(informe: InformeHidrologico): string {
  const e = informe.estadoNormativo;

  return `
<h2>Marco Normativo Aplicable</h2>

<p>
El estudio se desarrolla conforme a la normatividad técnica y ambiental vigente,
considerando lineamientos de autoridades ambientales y guías técnicas de drenaje urbano.
</p>

<h3>Autoridad Ambiental</h3>
<p>
La autoridad ambiental competente (${e.autoridadAmbiental}) recomienda evaluar
las obras que descargan a fuentes hídricas bajo eventos extremos, adoptando
períodos de retorno del orden de <strong>Tr = ${e.Tr_normativo} años</strong>.
</p>

<h3>Guía Técnica GT-AS-004 (EPM)</h3>
<p>
La Guía Técnica GT-AS-004 establece criterios para comparar condiciones pre y post
urbanas y regular el caudal descargado hacia la fuente hídrica al régimen natural,
mediante sistemas de almacenamiento y regulación (SAR).
</p>
`;
}

function renderResumenCaudalDiseno(informe: InformeHidrologico): string {
  const e = informe.estadoNormativo;
  const sar = informe.SAR;

  return `
<h2>Resumen Normativo del Caudal de Diseño</h2>

<h3>Caudal Pico Generado – Condición Post-Urbana</h3>
<p>
Evaluado para Tr = ${e.Tr_normativo} años. Este caudal se utiliza para verificación
de seguridad hidráulica y no corresponde al caudal de descarga.
</p>

<h3>Caudal de Referencia – Condición Pre-Urbana</h3>
<p>
Representa el régimen hidrológico natural de la cuenca para el mismo período de retorno.
</p>

<h3>Caudal Adoptado de Descarga (SAR)</h3>
<pre>
Q_adoptado = Q_pre-urbano = ${sar.Q_regulado.toFixed(2)}
</pre>

<p>
Este criterio garantiza la no alteración del régimen natural de la fuente hídrica.
</p>
`;
}

function renderJustificacionSAR(informe: InformeHidrologico): string {
  const e = informe.estadoNormativo;
  const sar = informe.SAR;

  if (!e.aplicaSAR) {
    return `
<h2>Evaluación de Aplicabilidad del SAR</h2>
<p>
La cuenca no presenta procesos de urbanización que requieran regulación hidrológica,
por lo cual no se implementa un sistema SAR.
</p>
`;
  }

  return `
<h2>Justificación Normativa del Sistema SAR</h2>

<p>
El evento normativo de análisis corresponde a Tr = ${e.Tr_normativo} años.
De acuerdo con la GT-AS-004, el caudal descargado debe corresponder a la
condición pre-urbana.
</p>

<pre>
Q_descarga = Q_pre-urbano = ${sar.Q_regulado.toFixed(2)}
</pre>
`;
}

function renderChecklistAMVA(informe: InformeHidrologico): string {
  if (informe.modoInforme !== "AUDITORIA_AMBIENTAL") return "";

  return `
<h2>Checklist de Cumplimiento Ambiental (AMVA)</h2>

<ul>
  <li>✔ Evaluación hidrológica con Tr = ${informe.estadoNormativo.Tr_normativo} años</li>
  <li>✔ Diferenciación explícita entre caudal generado y caudal descargado</li>
  <li>✔ Comparación condición pre-urbana vs post-urbana</li>
  <li>✔ Implementación de sistema SAR conforme a GT-AS-004</li>
  <li>✔ Limitación del caudal descargado al régimen natural</li>
  <li>✔ Análisis de evento extremo sin incremento del impacto aguas abajo</li>
</ul>
`;
}

function renderAnexoNormativo(): string {
  return `
<h2>Anexo Normativo Automático</h2>

<ul>
  <li>Autoridades Ambientales: AMVA, Corantioquia, Cornare</li>
  <li>Guía Técnica GT-AS-004 – EPM</li>
  <li>Principio aplicado: Tr elevado para análisis, caudal natural para descarga</li>
</ul>

<p>
Este anexo se genera automáticamente como parte del rol de HidroFlow como
intérprete normativo hidrológico.
</p>
`;
}

/* =========================================================
 * RENDER PRINCIPAL DEL INFORME
 * ========================================================= */

export function renderInformeHTML(
  informe: InformeHidrologico
): string {

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>${informe.titulo}</title>
  <style>${css}</style>
</head>

<body>

<h1>${informe.titulo}</h1>
<p><strong>Cuenca:</strong> ${informe.cuenca}</p>
<p><strong>Fecha:</strong> ${informe.fecha}</p>

<p>${informe.resumen}</p>

${renderResumenEjecutivoAmbiental(informe)}

${renderMarcoNormativo(informe)}

${renderResumenCaudalDiseno(informe)}

${renderJustificacionSAR(informe)}

<h2>Conclusión Técnica</h2>
<p>${informe.conclusion}</p>

${renderChecklistAMVA(informe)}

${renderAnexoNormativo()}

</body>
</html>
`;
}