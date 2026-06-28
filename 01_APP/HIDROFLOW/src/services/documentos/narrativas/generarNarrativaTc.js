const texto = (v) =>
  v === undefined || v === null || v === ""
    ? "NO DETECTADO"
    : String(v);

export function generarNarrativaTc(
  payload = {}
) {

  const tc =
    payload?.tiempoConcentracion ?? {};

  return `
Trazabilidad Tc:

El tiempo de concentración (Tc) representa el tiempo requerido para que la escorrentía generada en el punto hidrológicamente más alejado alcance la salida de la cuenca.

El Tc adoptado para el escenario evaluado corresponde a ${texto(tc?.tcSugeridoMinutos)} minutos.

El método de ponderación utilizado corresponde a ${texto(tc?.metodoPonderacion)}.

Los métodos excluidos del cálculo final fueron ${(tc?.metodosExcluidos ?? []).join(", ") || "NO DETECTADO"}.

El Tc adoptado controla la duración crítica de la lluvia de diseño y condiciona la respuesta temporal del hidrograma Q(t).
  `.trim();

}
