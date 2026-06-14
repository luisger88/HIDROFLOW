// OT-0111B — Validación aislada del helper puro del expediente hidrológico mínimo.
// Este script NO toca UI, NO toca ComparadorMultiMetodo.jsx, NO copia al portapapeles
// y NO usa el resultado como adopción hidrológica.

import construirExpedienteHidrologicoMinimo, {
  SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO,
  TOKENS_INVALIDOS_EXPEDIENTE_MINIMO,
  VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
  validarTextoExpedienteMinimo
} from "../src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const contextoMinimoSeguro = {
  cuencaNombre: "Contexto mínimo seguro OT-0111",
  area_km2: 46.8516,
  pendiente_media_pct: 8.43,
  longitud_cauce_km: 15.524,
  CN: 88,
  CN_base: 86,
  CN_efectivo: 88,
  AMC: "II",
  fuente: "script_validacion_aislada_ot_0111",
  estacion_idf: "SAN CRISTOBAL",
  lluvia_efectiva_total_mm: 56.65,
  hidrogramas: [],
  metodo_racional: {
    resultados: []
  },
  tr_diseno_activo: 5,
  q_tr_activo_estado: {
    estado: "validacion_aislada_no_operativa",
    q_tr_activo: {},
    campos_faltantes: [],
    fuente: "script_validacion_aislada_ot_0111"
  }
};

const resultado = construirExpedienteHidrologicoMinimo({
  contextoBase: contextoMinimoSeguro,
  Tc_final: 114.2,
  metodos: [],
  filasMorfologiaQt: [],
  filasDictamenFormaQt: [],
  filasRiesgoTemporalQt: [],
  sintesisRiesgoTemporalQt: null,
  fechaGeneracion: "OT-0111-validacion-aislada",
  versionExpediente: VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO
});

const errores = [];

function verificar(condicion, mensaje) {
  if (!condicion) errores.push(mensaje);
}

verificar(resultado && typeof resultado === "object", "El helper no retornó un objeto.");
verificar(typeof resultado.ok === "boolean", "El campo ok no es booleano.");
verificar(typeof resultado.texto === "string", "El campo texto no es string.");
verificar(resultado.texto.length > 0, "El texto generado está vacío.");
verificar(Array.isArray(resultado.errores), "El campo errores no es arreglo.");
verificar(Array.isArray(resultado.advertencias), "El campo advertencias no es arreglo.");
verificar(Array.isArray(resultado.secciones), "El campo secciones no es arreglo.");
verificar(resultado.secciones.length > 0, "El arreglo secciones está vacío.");
verificar(resultado.metadata && typeof resultado.metadata === "object", "metadata no existe.");
verificar(
  resultado.metadata?.versionExpediente === VERSION_EXPEDIENTE_HIDROLOGICO_MINIMO,
  "La versión del expediente no coincide con la constante exportada."
);
verificar(
  resultado.metadata?.estadoIntegracion === "helper_no_integrado",
  "metadata.estadoIntegracion no indica helper_no_integrado."
);

const validacionTexto = validarTextoExpedienteMinimo(resultado.texto);

verificar(validacionTexto.ok === true, "La validación textual mínima no fue aprobada.");
verificar(
  Array.isArray(validacionTexto.tokensDetectados) &&
    validacionTexto.tokensDetectados.length === 0,
  "Se detectaron tokens inválidos en el texto."
);
verificar(
  Array.isArray(validacionTexto.seccionesFaltantes) &&
    validacionTexto.seccionesFaltantes.length === 0,
  "Faltan secciones obligatorias en el texto."
);

SECCIONES_OBLIGATORIAS_EXPEDIENTE_MINIMO.forEach((seccion) => {
  verificar(
    resultado.texto.includes(seccion),
    `El texto no contiene la sección obligatoria: ${seccion}`
  );
});

TOKENS_INVALIDOS_EXPEDIENTE_MINIMO.forEach((token) => {
  verificar(
    !resultado.texto.includes(token),
    `El texto contiene token inválido: ${token}`
  );
});

verificar(
  resultado.texto.includes("No reemplaza el expediente operativo actual"),
  "El texto no declara que no reemplaza el expediente operativo actual."
);

verificar(
  resultado.texto.includes("No copia al portapapeles"),
  "El texto no declara que no copia al portapapeles."
);

verificar(
  resultado.texto.includes("Herramienta: HidroFlow."),
  "El texto no contiene sello técnico de herramienta."
);

verificar(
  resultado.advertencias.some((advertencia) =>
    String(advertencia).includes("Helper puro inicial no integrado")
  ),
  "No se encontró la advertencia esperada de helper no integrado."
);

const resumen = {
  ok: resultado.ok,
  errores: resultado.errores.length,
  advertencias: resultado.advertencias.length,
  secciones: resultado.secciones.length,
  tokensDetectados: validacionTexto.tokensDetectados.length,
  seccionesFaltantes: validacionTexto.seccionesFaltantes.length,
  versionExpediente: resultado.metadata?.versionExpediente,
  estadoIntegracion: resultado.metadata?.estadoIntegracion,
  longitudTexto: resultado.texto.length
};

console.log("OT-0111B — Validación aislada helper expediente hidrológico mínimo");
console.log(JSON.stringify(resumen, null, 2));

if (errores.length > 0) {
  console.error("VALIDACIÓN FALLIDA:");
  errores.forEach((error, indice) => {
    console.error(`${indice + 1}. ${error}`);
  });
  process.exit(1);
}

console.log(
  "VALIDACIÓN APROBADA: helper puro inicial del expediente ejecuta aislado correctamente."
);