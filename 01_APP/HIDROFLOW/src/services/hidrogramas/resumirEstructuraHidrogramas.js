const CLAVES_CONTENEDOR = ["metodos", "resultados", "items"];
const CLAVES_SERIE = ["qSeries", "series", "serie", "data", "points"];

const CLAVES_QPICO = ["Qpico", "Qp", "qp", "qPico", "q_pico", "caudalPico", "caudal_pico"];
const CLAVES_TPICO = ["tPico", "Tp", "tp", "TPico", "t_pico", "tiempoPico", "tiempo_pico"];
const CLAVES_VOLUMEN = ["volTotal", "volumen", "V", "vol", "volume", "vol_total", "volumenTotal"];

const obtenerTipo = (valor) => {
  if (Array.isArray(valor)) return "array";
  if (valor === null) return "null";
  return typeof valor;
};

const obtenerClaves = (valor) => {
  if (!valor || typeof valor !== "object" || Array.isArray(valor)) {
    return [];
  }

  return Object.keys(valor).sort();
};

const obtenerCandidatos = (hidrogramas) => {
  if (Array.isArray(hidrogramas)) {
    return {
      tipoEntrada: "array",
      contenedor: null,
      candidatos: hidrogramas,
    };
  }

  if (!hidrogramas || typeof hidrogramas !== "object") {
    return {
      tipoEntrada: obtenerTipo(hidrogramas),
      contenedor: null,
      candidatos: [],
    };
  }

  for (const clave of CLAVES_CONTENEDOR) {
    if (Array.isArray(hidrogramas?.[clave])) {
      return {
        tipoEntrada: "object",
        contenedor: clave,
        candidatos: hidrogramas[clave],
      };
    }
  }

  return {
    tipoEntrada: "object",
    contenedor: null,
    candidatos: [],
  };
};

const tieneAlgunaClave = (objeto, claves) =>
  claves.some((clave) => Object.prototype.hasOwnProperty.call(objeto ?? {}, clave));

const resumirPrimerPunto = (serie) => {
  if (!Array.isArray(serie) || serie.length === 0) {
    return {
      tipoPrimerPunto: null,
      clavesPrimerPunto: [],
    };
  }

  const primerPunto = serie[0];

  if (Array.isArray(primerPunto)) {
    return {
      tipoPrimerPunto: "array",
      clavesPrimerPunto: primerPunto.map((_, indice) => String(indice)),
    };
  }

  if (primerPunto && typeof primerPunto === "object") {
    return {
      tipoPrimerPunto: "object",
      clavesPrimerPunto: Object.keys(primerPunto).sort(),
    };
  }

  return {
    tipoPrimerPunto: obtenerTipo(primerPunto),
    clavesPrimerPunto: [],
  };
};

const resumirSeriesCandidatas = (metodo) =>
  CLAVES_SERIE
    .filter((clave) => Array.isArray(metodo?.[clave]))
    .map((clave) => {
      const serie = metodo[clave];
      const primerPunto = resumirPrimerPunto(serie);

      return {
        clave,
        esArreglo: true,
        longitud: serie.length,
        tipoPrimerPunto: primerPunto.tipoPrimerPunto,
        clavesPrimerPunto: primerPunto.clavesPrimerPunto,
      };
    });

const obtenerNombreMetodo = (metodo, indice) =>
  String(
    metodo?.metodoNombre ??
    metodo?.nombre ??
    metodo?.metodo ??
    metodo?.label ??
    metodo?.id ??
    `metodo_${indice + 1}`
  );

const obtenerIdMetodo = (metodo, indice) =>
  String(
    metodo?.metodoId ??
    metodo?.id ??
    metodo?.codigo ??
    metodo?.metodo ??
    metodo?.nombre ??
    `metodo_${indice + 1}`
  )
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const resumirMetodo = (metodo, indice) => {
  const claves = obtenerClaves(metodo);
  const posiblesSeries = resumirSeriesCandidatas(metodo);

  return {
    indice,
    tipoMetodo: obtenerTipo(metodo),
    metodoId: obtenerIdMetodo(metodo, indice),
    metodoNombre: obtenerNombreMetodo(metodo, indice),
    totalClaves: claves.length,
    claves,
    tieneSerieTemporal: posiblesSeries.length > 0,
    posiblesSeries,
    tieneQpico: tieneAlgunaClave(metodo, CLAVES_QPICO),
    tieneTPico: tieneAlgunaClave(metodo, CLAVES_TPICO),
    tieneVolTotal: tieneAlgunaClave(metodo, CLAVES_VOLUMEN),
  };
};

export const resumirEstructuraHidrogramas = (hidrogramas) => {
  const entrada = obtenerCandidatos(hidrogramas);

  const candidatos = entrada.candidatos.map(resumirMetodo);

  const resumen = {
    tipoEntrada: entrada.tipoEntrada,
    contenedor: entrada.contenedor,
    totalCandidatos: candidatos.length,
    conSerieTemporal: candidatos.filter((candidato) => candidato.tieneSerieTemporal).length,
    sinSerieTemporal: candidatos.filter((candidato) => !candidato.tieneSerieTemporal).length,
    conQpico: candidatos.filter((candidato) => candidato.tieneQpico).length,
    conTPico: candidatos.filter((candidato) => candidato.tieneTPico).length,
    conVolTotal: candidatos.filter((candidato) => candidato.tieneVolTotal).length,
  };

  return {
    ok: resumen.totalCandidatos > 0,
    resumen,
    candidatos,
  };
};

export default resumirEstructuraHidrogramas;
