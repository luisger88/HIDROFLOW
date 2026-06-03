// src/data/clasificacionCuenca.js

export const UMBRALES_CUENCA = {
  area: {
    micro: { min: 0, max: 1 },
    pequena: { min: 1, max: 5 },
    menor: { min: 5, max: 25 },
    mediana: { min: 25, max: 100 },
    grande: { min: 100, max: 500 },
    muyGrande: { min: 500, max: Infinity },
  },

  pendiente: {
    baja: { min: 0, max: 3 },
    media: { min: 3, max: 8 },
    alta: { min: 8, max: 15 },
    muyAlta: { min: 15, max: Infinity },
  },
};

function numeroSeguro(valor, defecto = null) {
  if (valor === null || valor === undefined || valor === "") {
    return defecto;
  }

  const n = Number(valor);
  return Number.isFinite(n) ? n : defecto;
}

export function clasificarAreaCuenca(areaKm2) {
  const area = numeroSeguro(areaKm2);

  if (area === null) {
    return {
      clase: "sin_dato",
      etiqueta: "Área no disponible",
      descripcion:
        "No se dispone de área para clasificar la escala hidrológica de la cuenca.",
    };
  }

  if (area < 1) {
    return {
      clase: "microcuenca",
      etiqueta: "Microcuenca",
      descripcion:
        "Área menor a 1 km². Respuesta rápida y alta sensibilidad a uso del suelo, pendiente e impermeabilidad.",
    };
  }

  if (area < 5) {
    return {
      clase: "pequena",
      etiqueta: "Cuenca pequeña",
      descripcion:
        "Área entre 1 y 5 km². Métodos simplificados como el racional pueden ser competentes si los demás supuestos son válidos.",
    };
  }

  if (area < 25) {
    return {
      clase: "menor",
      etiqueta: "Cuenca menor",
      descripcion:
        "Área entre 5 y 25 km². Requiere contrastar métodos empíricos con modelos lluvia-escorrentía.",
    };
  }

  if (area < 100) {
    return {
      clase: "mediana",
      etiqueta: "Cuenca mediana",
      descripcion:
        "Área entre 25 y 100 km². Es recomendable usar modelos lluvia-escorrentía e hidrogramas; el método racional debe tratarse con cautela o como contraste.",
    };
  }

  if (area < 500) {
    return {
      clase: "grande",
      etiqueta: "Cuenca grande",
      descripcion:
        "Área entre 100 y 500 km². La respuesta hidrológica requiere modelación distribuida, regionalización o análisis hidrológico más robusto.",
    };
  }

  return {
    clase: "muy_grande",
    etiqueta: "Cuenca muy grande",
    descripcion:
      "Área mayor o igual a 500 km². Requiere análisis hidrológico avanzado, series observadas, regionalización o modelación hidrológica especializada.",
  };
}

export function clasificarPendienteCuenca(pendientePct) {
  const pendiente = numeroSeguro(pendientePct);

  if (pendiente === null) {
    return {
      clase: "sin_dato",
      etiqueta: "Pendiente no disponible",
      descripcion:
        "No se dispone de pendiente media para clasificar la respuesta geomorfológica.",
    };
  }

  if (pendiente < 3) {
    return {
      clase: "baja",
      etiqueta: "Pendiente baja",
      descripcion:
        "Pendiente media menor a 3 %. Respuesta más lenta, con mayor peso potencial del almacenamiento y la infiltración.",
    };
  }

  if (pendiente < 8) {
    return {
      clase: "media",
      etiqueta: "Pendiente media",
      descripcion:
        "Pendiente media entre 3 % y 8 %. Respuesta intermedia; requiere evaluar longitud hidráulica, cobertura y CN.",
    };
  }

  if (pendiente < 15) {
    return {
      clase: "alta",
      etiqueta: "Pendiente alta",
      descripcion:
        "Pendiente media entre 8 % y 15 %. Respuesta rápida; los métodos de Tc sensibles a pendiente deben revisarse con cuidado.",
    };
  }

  return {
    clase: "muy_alta",
    etiqueta: "Pendiente muy alta",
    descripcion:
      "Pendiente media mayor o igual a 15 %. Respuesta muy rápida; alta sensibilidad a rugosidad, cauce principal y abstracciones.",
  };
}

export function clasificarFormaCuenca(indices = {}) {
  const kc = numeroSeguro(indices.Kc ?? indices.kc ?? indices.compacidad);
  const ff = numeroSeguro(indices.Ff ?? indices.ff ?? indices.factorForma);
  const rc = numeroSeguro(indices.Rc ?? indices.rc ?? indices.circularidad);

  if (kc === null && ff === null && rc === null) {
    return {
      clase: "pendiente",
      etiqueta: "Forma pendiente de cálculo",
      descripcion:
        "La forma de la cuenca requiere índices geomorfológicos como Kc, Ff, Rc o relación de elongación. No se adopta una forma sin cálculo formal.",
    };
  }

  if ((kc !== null && kc <= 1.35) || (ff !== null && ff >= 0.45) || (rc !== null && rc >= 0.5)) {
    return {
      clase: "compacta",
      etiqueta: "Cuenca compacta",
      descripcion:
        "La geometría sugiere mayor sincronización de aportes y potencial de hidrograma más concentrado.",
    };
  }

  if ((kc !== null && kc > 1.35) || (ff !== null && ff < 0.45) || (rc !== null && rc < 0.5)) {
    return {
      clase: "alargada",
      etiqueta: "Cuenca alargada",
      descripcion:
        "La geometría sugiere respuesta más distribuida y menor sincronización relativa de aportes.",
    };
  }

  return {
    clase: "mixta",
    etiqueta: "Forma mixta o intermedia",
    descripcion:
      "Los índices geomorfológicos no permiten una clasificación única; se recomienda análisis complementario.",
  };
}

export function conceptuarCuenca(contexto = {}) {
  const areaKm2 =
    contexto.area_km2 ??
    contexto.areaKm2 ??
    contexto.area ??
    contexto.racional?.area_km2 ??
    null;

  const pendientePct =
    contexto.pendiente_media_pct ??
    contexto.pendienteMediaPct ??
    contexto.pendiente_pct ??
    null;

  const area = clasificarAreaCuenca(areaKm2);
  const pendiente = clasificarPendienteCuenca(pendientePct);
  const forma = clasificarFormaCuenca(contexto.indicesForma ?? contexto);

  const advertencias = [];

  if (area.clase === "mediana" || area.clase === "grande" || area.clase === "muy_grande") {
    advertencias.push(
      "El Método Racional no debe adoptarse automáticamente como método principal; debe mantenerse como contraste o referencia."
    );
  }

  if (pendiente.clase === "alta" || pendiente.clase === "muy_alta") {
    advertencias.push(
      "La pendiente alta puede reducir el tiempo de respuesta; se recomienda comparar varios métodos de Tc y revisar consistencia geomorfológica."
    );
  }

  if (forma.clase === "pendiente") {
    advertencias.push(
      "La forma de la cuenca queda pendiente de cálculo geomorfológico formal; no se debe inferir sin Kc, Ff, Rc o índice equivalente."
    );
  }

  return {
    area,
    pendiente,
    forma,
    advertencias,
  };
}
