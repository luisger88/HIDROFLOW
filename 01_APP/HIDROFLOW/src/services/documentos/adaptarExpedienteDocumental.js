const TOKENS_INVALIDOS_EXPEDIENTE = ["undefined", "null", "NaN", "[object Object]"];

const SECCIONES_OBLIGATORIAS_EXPEDIENTE = [
  "## 1. Identificación",
  "## 2. Parámetros base",
  "## 3. Contexto Tc / Tr / roles hidrológicos",
  "## 4. Volumen de referencia",
  "## 5. Escenario Q-Tr activo",
  "## 6. Resumen Q-5 auditado",
  "## 7. Método Racional",
  "## 8. Contraste Q-5 vs Método Racional",
  "## 9. Control de consistencia cruzada",
  "## 10. Validación interna",
  "## 11. Sello técnico",
  "## 12. Restricciones y advertencias"
];

const MAPA_TIPOS_SECCION = [
  ["método racional", "metodo_racional"],
  ["control de consistencia", "consistencia"],
  ["consistencia cruzada", "consistencia"],
  ["contraste q-5", "contraste"],
  ["contraste", "contraste"],
  ["identificación", "identificacion"],
  ["parámetros", "parametros"],
  ["contexto tc", "contexto_tc_tr"],
  ["q-tr", "trazabilidad_qtr"],
  ["q-5", "tabla_q5"],
  ["volumen", "volumen"],
  ["validación", "validacion"],
  ["sello", "sello"],
  ["restricciones", "restricciones"]
];

const normalizarTexto = (valor) => (typeof valor === "string" ? valor : "");

const extraerTitulo = (texto) => {
  const lineaTitulo = texto
    .split(/\r?\n/)
    .find((linea) => linea.trim().startsWith("# "));

  return lineaTitulo ? lineaTitulo.replace(/^#\s+/, "").trim() : "";
};

const extraerEstadoTecnico = (texto) => {
  const lineaEstado = texto
    .split(/\r?\n/)
    .find((linea) => linea.toLowerCase().includes("estado técnico del expediente:"));

  if (!lineaEstado) {
    return "";
  }

  return lineaEstado
    .replace(/^[-*\s]*/, "")
    .replace(/^estado técnico del expediente:\s*/i, "")
    .trim();
};

const derivarTipoSeccion = (titulo) => {
  const tituloNormalizado = normalizarTexto(titulo).toLowerCase();
  const coincidencia = MAPA_TIPOS_SECCION.find(([fragmento]) =>
    tituloNormalizado.includes(fragmento)
  );

  return coincidencia ? coincidencia[1] : "seccion";
};

const separarSecciones = (texto) => {
  const lineas = texto.split(/\r?\n/);
  const secciones = [];
  let seccionActual = null;

  lineas.forEach((linea) => {
    const encabezado = linea.match(/^##\s+(.+)$/);

    if (encabezado) {
      if (seccionActual) {
        secciones.push({
          ...seccionActual,
          contenido: seccionActual.contenido.join("\n").trim()
        });
      }

      const tituloCompleto = encabezado[1].trim();
      const numero = tituloCompleto.match(/^(\d+)\./)?.[1] ?? null;
      const titulo = tituloCompleto.replace(/^\d+\.\s*/, "").trim();

      seccionActual = {
        numero,
        titulo,
        tituloCompleto,
        tipo: derivarTipoSeccion(tituloCompleto),
        origen: tituloCompleto,
        contenido: []
      };

      return;
    }

    if (seccionActual) {
      seccionActual.contenido.push(linea);
    }
  });

  if (seccionActual) {
    secciones.push({
      ...seccionActual,
      contenido: seccionActual.contenido.join("\n").trim()
    });
  }

  return secciones;
};

const extraerRestricciones = (secciones) => {
  const seccionRestricciones = secciones.find((seccion) => seccion.tipo === "restricciones");

  if (!seccionRestricciones) {
    return [];
  }

  return seccionRestricciones.contenido
    .split(/\r?\n/)
    .map((linea) => linea.trim())
    .filter((linea) => linea.startsWith("- "))
    .map((linea) => linea.replace(/^-\s*/, ""));
};

export function adaptarExpedienteDocumental(textoExpediente, metadatosDocumento = {}) {
  const errores = [];
  const advertencias = [];

  if (typeof textoExpediente !== "string") {
    errores.push("ENTRADA_NO_STRING");

    return {
      ok: false,
      errores,
      advertencias,
      titulo: "",
      estadoTecnico: "",
      resumen: "",
      secciones: [],
      restricciones: [],
      trazabilidad: {
        fuenteExpediente: metadatosDocumento?.fuenteExpediente ?? "textoExpediente",
        origenPlantilla: metadatosDocumento?.origenPlantilla ?? "OT-0060",
        ...metadatosDocumento
      }
    };
  }

  const texto = normalizarTexto(textoExpediente).trim();

  if (!texto) {
    errores.push("ENTRADA_VACIA");
  }

  const tokensDetectados = TOKENS_INVALIDOS_EXPEDIENTE.filter((token) => texto.includes(token));

  if (tokensDetectados.length > 0) {
    errores.push("TOKENS_INVALIDOS");
    advertencias.push(`Tokens inválidos detectados: ${tokensDetectados.join(", ")}`);
  }

  const titulo = extraerTitulo(texto);
  const estadoTecnico = extraerEstadoTecnico(texto);
  const secciones = separarSecciones(texto);
  const restricciones = extraerRestricciones(secciones);

  if (!titulo) {
    errores.push("SIN_TITULO");
  }

  if (!estadoTecnico) {
    errores.push("SIN_ESTADO_TECNICO");
  }

  if (restricciones.length === 0) {
    errores.push("SIN_RESTRICCIONES");
  }

  if (!secciones.some((seccion) => seccion.tipo === "sello")) {
    errores.push("SIN_SELLO_TECNICO");
  }

  const seccionesFaltantes = SECCIONES_OBLIGATORIAS_EXPEDIENTE.filter((seccion) =>
    !texto.includes(seccion)
  );

  if (seccionesFaltantes.length > 0) {
    errores.push("SECCIONES_INCOMPLETAS");
    advertencias.push(`Secciones faltantes: ${seccionesFaltantes.join(", ")}`);
  }

  return {
    ok: errores.length === 0,
    errores,
    advertencias,
    titulo,
    estadoTecnico,
    resumen: secciones.find((seccion) => seccion.tipo === "resumen")?.contenido ?? "",
    secciones,
    restricciones,
    trazabilidad: {
      fuenteExpediente: metadatosDocumento?.fuenteExpediente ?? "textoExpediente",
      origenPlantilla: metadatosDocumento?.origenPlantilla ?? "OT-0060",
      ...metadatosDocumento
    }
  };
}

export default adaptarExpedienteDocumental;
