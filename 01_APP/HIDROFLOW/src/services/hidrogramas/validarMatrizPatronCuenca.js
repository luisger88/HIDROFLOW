// OT-0091B — Helper puro para validar matriz patrón de cuenca.
// No recalcula hidrogramas, no adopta método y no modifica el motor.

function numeroFinito(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

function calcularVelocidadKmh(longitudKm, tiempoMin) {
  const L = numeroFinito(longitudKm);
  const t = numeroFinito(tiempoMin);

  if (L === null || t === null || t <= 0) return null;

  return L / (t / 60);
}

function diferenciaRelativa(a, b) {
  const x = numeroFinito(a);
  const y = numeroFinito(b);

  if (x === null || y === null || y === 0) return null;

  return Math.abs(x - y) / Math.abs(y);
}

export default function validarMatrizPatronCuenca(matriz = {}) {
  const errores = [];
  const advertencias = [];

  if (!matriz?.id) errores.push("Falta id de matriz.");
  if (!matriz?.cuenca?.nombre) errores.push("Falta nombre de cuenca.");
  if (!matriz?.cuenca?.puntoControl) errores.push("Falta punto de control.");

  const longitudHidraulicaKm = numeroFinito(matriz?.morfometria?.longitudHidraulicaKm);

  if (longitudHidraulicaKm === null || longitudHidraulicaKm <= 0) {
    errores.push("Longitud hidráulica inválida o ausente.");
  }

  if (!Array.isArray(matriz?.diagnosticoQt) || matriz.diagnosticoQt.length === 0) {
    errores.push("Falta diagnóstico Q(t).");
  }

  const diagnosticoQt = Array.isArray(matriz?.diagnosticoQt) ? matriz.diagnosticoQt : [];

  diagnosticoQt.forEach((fila, indice) => {
    const prefijo = `diagnosticoQt[${indice}]`;

    if (!fila?.metodo) errores.push(`${prefijo}: falta método.`);
    if (numeroFinito(fila?.QpM3s) === null) errores.push(`${prefijo}: falta QpM3s.`);
    if (numeroFinito(fila?.tPicoMin) === null) errores.push(`${prefijo}: falta tPicoMin.`);
    if (numeroFinito(fila?.duracionEfectivaMin) === null) errores.push(`${prefijo}: falta duracionEfectivaMin.`);
    if (!fila?.formaTemporal) errores.push(`${prefijo}: falta formaTemporal.`);
    if (!fila?.riesgoTemporal) errores.push(`${prefijo}: falta riesgoTemporal.`);
    if (!fila?.plausibilidadTemporal) errores.push(`${prefijo}: falta plausibilidadTemporal.`);

    if (longitudHidraulicaKm !== null) {
      const velocidadTPicoCalculada = calcularVelocidadKmh(longitudHidraulicaKm, fila?.tPicoMin);
      const velocidadAscensoCalculada = calcularVelocidadKmh(longitudHidraulicaKm, fila?.ascensoMin);

      const diferenciaTPico = diferenciaRelativa(fila?.velocidadEfectivaTPicoKmh, velocidadTPicoCalculada);
      const diferenciaAscenso = diferenciaRelativa(fila?.velocidadEfectivaAscensoKmh, velocidadAscensoCalculada);

      if (diferenciaTPico !== null && diferenciaTPico > 0.02) {
        advertencias.push(`${prefijo}: velocidad efectiva tPico difiere más de 2%.`);
      }

      if (diferenciaAscenso !== null && diferenciaAscenso > 0.02) {
        advertencias.push(`${prefijo}: velocidad efectiva ascenso difiere más de 2%.`);
      }
    }
  });

  if (!Array.isArray(matriz?.restricciones) || matriz.restricciones.length === 0) {
    errores.push("Faltan restricciones no adoptivas.");
  }

  const textoRestricciones = Array.isArray(matriz?.restricciones)
    ? matriz.restricciones.join(" ")
    : "";

  ["No adopta", "No levanta", "No reemplaza"].forEach((frase) => {
    if (!textoRestricciones.includes(frase)) {
      advertencias.push(`Restricción no adoptiva posiblemente faltante: ${frase}`);
    }
  });

  return {
    ok: errores.length === 0,
    errores,
    advertencias,
    resumen: {
      metodos: diagnosticoQt.length,
      longitudHidraulicaKm,
      restricciones: Array.isArray(matriz?.restricciones) ? matriz.restricciones.length : 0
    }
  };
}