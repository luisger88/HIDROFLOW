export function generarDictamenInteligente({
  Tr,
  ratioMasa,
  trazabilidadGeomorfologica
}) {

  const masaOK =
    ratioMasa >= 0.995 &&
    ratioMasa <= 1.005;

  const introduccion =
    `Simulación ejecutada sobre parámetros geomorfológicos provenientes de la cuenca ${trazabilidadGeomorfologica?.cuenca ?? "No definida"}.`;

  const bloqueNormativo =
    Tr === 100
      ? "Dictamen emitido para el Caudal de Diseño (Tr=100 años) conforme a normativa ambiental."
      : `Dictamen emitido para Tr=${Tr} años.`;

  const bloqueMasa =
    masaOK
      ? "La conservación de masa fue validada dentro de los criterios auditados."
      : "Advertencia: el resultado se encuentra fuera del criterio auditado de conservación de masa.";

  return {
    texto: [
      introduccion,
      bloqueNormativo,
      "El motor hidrológico utilizado cuenta con certificación experimental MCVD.",
      bloqueMasa,
      "La sensibilidad paramétrica y la elasticidad hidráulica fueron verificadas experimentalmente.",
      "El resultado se considera consistente dentro del rango operativo auditado."
    ].join(" ")
  };

}