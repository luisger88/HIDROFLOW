function textoSeguroIdentificacion(valor, fallback = "—") {
  if (valor === null || valor === undefined) {
    return fallback;
  }

  if (typeof valor === "string") {
    const texto = valor.trim();
    return texto.length > 0 ? texto : fallback;
  }

  if (typeof valor === "number") {
    return Number.isFinite(valor) ? String(valor) : fallback;
  }

  if (typeof valor === "boolean") {
    return String(valor);
  }

  return fallback;
}

export function construirBloqueIdentificacionExpedienteMinimo({
  cuenca = "Cuenca activa",
  identificadorCuenca = "—",
  versionExpediente = "—",
  tipoSalida = "expediente_hidrologico_minimo",
  fechaGeneracion = "—",
  fuente = "—",
  estadoDocumental = "Borrador documental",
  alcanceDocumental = "Bloque documental de identificación del expediente.",
  incluirTitulo = true
} = {}) {
  const lineas = [];

  if (incluirTitulo) {
    lineas.push("## 1. Identificación");
  }

  lineas.push(
    `- Cuenca activa: ${textoSeguroIdentificacion(cuenca)}`,
    `- Identificador interno de cuenca: ${textoSeguroIdentificacion(identificadorCuenca)}`,
    `- Versión del expediente: ${textoSeguroIdentificacion(versionExpediente)}`,
    `- Tipo de salida documental: ${textoSeguroIdentificacion(tipoSalida)}`,
    `- Fecha de generación: ${textoSeguroIdentificacion(fechaGeneracion)}`,
    `- Fuente o modo de generación: ${textoSeguroIdentificacion(fuente)}`,
    `- Estado documental: ${textoSeguroIdentificacion(estadoDocumental)}`,
    `- Alcance documental: ${textoSeguroIdentificacion(alcanceDocumental)}`,
    ""
  );

  return lineas;
}

export default construirBloqueIdentificacionExpedienteMinimo;
