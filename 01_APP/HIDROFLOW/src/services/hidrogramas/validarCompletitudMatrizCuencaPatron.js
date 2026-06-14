// OT-0100B — Helper puro para validar completitud de matriz de cuenca patrón.
// No compara cuencas, no inventa datos, no recalcula hidrogramas y no toca motor.

function textoValido(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function numeroFinito(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function arregloConContenido(valor) {
  return Array.isArray(valor) && valor.length > 0;
}

function incluirRestriccion(textoRestricciones, fragmento) {
  return textoRestricciones.toLowerCase().includes(fragmento.toLowerCase());
}

function validarCampoTexto(objeto, ruta, etiqueta, errores) {
  const valor = ruta.reduce((actual, clave) => actual?.[clave], objeto);
  if (!textoValido(valor)) errores.push(`Falta ${etiqueta}.`);
}

function validarCampoNumero(objeto, ruta, etiqueta, errores) {
  const valor = ruta.reduce((actual, clave) => actual?.[clave], objeto);
  if (numeroFinito(valor) === null) errores.push(`Falta valor numérico válido para ${etiqueta}.`);
}

export default function validarCompletitudMatrizCuencaPatron(matriz = {}) {
  const errores = [];
  const advertencias = [];

  validarCampoTexto(matriz, ["id"], "id de matriz", errores);
  validarCampoTexto(matriz, ["cuenca", "nombre"], "nombre de cuenca", errores);
  validarCampoTexto(matriz, ["cuenca", "puntoControl"], "punto de control", errores);
  validarCampoTexto(matriz, ["cuenca", "estado"], "estado de cuenca", errores);
  validarCampoTexto(matriz, ["cuenca", "uso"], "uso diagnóstico", errores);

  validarCampoNumero(matriz, ["morfometria", "areaKm2"], "área de cuenca", errores);
  validarCampoNumero(matriz, ["morfometria", "longitudHidraulicaKm"], "longitud hidráulica", errores);
  validarCampoNumero(matriz, ["morfometria", "cotaMaxMsnm"], "cota máxima", errores);
  validarCampoNumero(matriz, ["morfometria", "cotaMinMsnm"], "cota mínima", errores);
  validarCampoNumero(matriz, ["morfometria", "desnivelM"], "desnivel", errores);
  validarCampoNumero(matriz, ["morfometria", "pendienteCaucePct"], "pendiente del cauce", errores);
  validarCampoNumero(matriz, ["morfometria", "pendienteMediaCuencaPct"], "pendiente media de cuenca", errores);
  validarCampoTexto(matriz, ["morfometria", "fuente"], "fuente morfométrica", errores);

  validarCampoNumero(matriz, ["tiemposConcentracion", "tcSugeridoMin"], "Tc sugerido", errores);
  validarCampoNumero(matriz, ["tiemposConcentracion", "metodosValidos"], "métodos válidos Tc", errores);
  validarCampoNumero(matriz, ["tiemposConcentracion", "rangoBrutoMin"], "rango bruto mínimo Tc", errores);
  validarCampoNumero(matriz, ["tiemposConcentracion", "rangoBrutoMax"], "rango bruto máximo Tc", errores);
  validarCampoNumero(matriz, ["tiemposConcentracion", "rangoCompetenteMin"], "rango competente mínimo Tc", errores);
  validarCampoNumero(matriz, ["tiemposConcentracion", "rangoCompetenteMax"], "rango competente máximo Tc", errores);
  validarCampoTexto(matriz, ["tiemposConcentracion", "estado"], "estado Tc", errores);

  validarCampoNumero(matriz, ["lluviaEscorrentia", "lluviaEfectivaTotalMm"], "lluvia efectiva total", errores);
  validarCampoNumero(matriz, ["lluviaEscorrentia", "volumenEsperadoM3"], "volumen esperado", errores);
  validarCampoNumero(matriz, ["lluviaEscorrentia", "relacionMasaPeAreaVolumen"], "relación masa Pe–Área–Volumen", errores);
  validarCampoTexto(matriz, ["lluviaEscorrentia", "estado"], "estado lluvia-escorrentía", errores);

  validarCampoTexto(matriz, ["escenarioReferencia", "nombre"], "nombre de escenario de referencia", errores);
  validarCampoNumero(matriz, ["escenarioReferencia", "periodoRetornoAnios"], "periodo de retorno", errores);
  validarCampoTexto(matriz, ["escenarioReferencia", "estado"], "estado de escenario de referencia", errores);

  const diagnosticoQt = Array.isArray(matriz?.diagnosticoQt) ? matriz.diagnosticoQt : [];

  if (!arregloConContenido(diagnosticoQt)) {
    errores.push("Falta diagnóstico Q(t) con al menos una fila.");
  }

  diagnosticoQt.forEach((fila, indice) => {
    const prefijo = `diagnosticoQt[${indice}]`;

    if (!textoValido(fila?.metodo)) errores.push(`${prefijo}: falta método.`);
    if (!textoValido(fila?.estadoSerie)) errores.push(`${prefijo}: falta estado de serie.`);
    if (numeroFinito(fila?.QpM3s) === null) errores.push(`${prefijo}: falta QpM3s.`);
    if (numeroFinito(fila?.tPicoMin) === null) errores.push(`${prefijo}: falta tPicoMin.`);
    if (numeroFinito(fila?.duracionEfectivaMin) === null) errores.push(`${prefijo}: falta duración efectiva.`);
    if (numeroFinito(fila?.ascensoMin) === null) errores.push(`${prefijo}: falta ascenso.`);
    if (numeroFinito(fila?.recesoMin) === null) errores.push(`${prefijo}: falta receso.`);
    if (!textoValido(fila?.formaTemporal)) errores.push(`${prefijo}: falta forma temporal.`);
    if (!textoValido(fila?.riesgoTemporal)) errores.push(`${prefijo}: falta riesgo temporal.`);
    if (!textoValido(fila?.nivelRiesgo)) errores.push(`${prefijo}: falta nivel de riesgo.`);
    if (numeroFinito(fila?.velocidadEfectivaTPicoKmh) === null) errores.push(`${prefijo}: falta velocidad efectiva tPico.`);
    if (numeroFinito(fila?.velocidadEfectivaAscensoKmh) === null) errores.push(`${prefijo}: falta velocidad efectiva ascenso.`);
    if (!textoValido(fila?.plausibilidadTemporal)) errores.push(`${prefijo}: falta plausibilidad temporal.`);
  });

  if (!Array.isArray(matriz?.restricciones) || matriz.restricciones.length === 0) {
    errores.push("Faltan restricciones no adoptivas.");
  }

  const textoRestricciones = Array.isArray(matriz?.restricciones)
    ? matriz.restricciones.join(" ")
    : "";

  [
    "No adopta",
    "No descarta",
    "No levanta",
    "No reemplaza"
  ].forEach((fragmento) => {
    if (!incluirRestriccion(textoRestricciones, fragmento)) {
      advertencias.push(`Restricción no adoptiva posiblemente faltante: ${fragmento}`);
    }
  });

  const comparable = errores.length === 0;

  return {
    ok: comparable,
    comparable,
    errores,
    advertencias,
    resumen: {
      id: matriz?.id ?? null,
      cuenca: matriz?.cuenca?.nombre ?? null,
      puntoControl: matriz?.cuenca?.puntoControl ?? null,
      metodosQt: diagnosticoQt.length,
      restricciones: Array.isArray(matriz?.restricciones) ? matriz.restricciones.length : 0,
      camposCriticosCompletos: comparable
    }
  };
}