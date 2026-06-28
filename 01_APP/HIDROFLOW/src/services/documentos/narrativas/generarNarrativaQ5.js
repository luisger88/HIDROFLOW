const texto = (v) =>
  v === undefined || v === null || v === ""
    ? "NO DETECTADO"
    : String(v);

const numero = (v, decimales = 2) => {
  const n = Number(v);

  return Number.isFinite(n)
    ? n.toLocaleString(
        "es-CO",
        {
          maximumFractionDigits: decimales
        }
      )
    : "NO DETECTADO";
};

export function generarNarrativaQ5(
  payload = {}
) {

  const q5 =
    payload?.hidrografiaQ5 ?? {};

  return `
Trazabilidad Q-5:

El hidrograma principal resume la respuesta temporal de la cuenca frente al evento de diseño evaluado.

El método principal adoptado corresponde a ${texto(q5?.metodoPrincipal)}.

El caudal pico (Qp) obtenido corresponde a ${numero(q5?.caudalPicoM3s, 2)} m³/s.

El tiempo al pico (Tp) corresponde a ${numero(q5?.tiempoPicoMinutos, 0)} minutos.

El volumen integrado asociado al hidrograma corresponde a ${numero(q5?.volumenIntegradoM3, 2)} m³.

Estos resultados permiten caracterizar la magnitud, duración y volumen de la creciente simulada para el escenario analizado.
  `.trim();

}
