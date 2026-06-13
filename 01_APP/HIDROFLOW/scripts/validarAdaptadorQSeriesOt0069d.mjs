import adaptarQSeriesHidrogramas from "../src/services/hidrogramas/adaptarQSeriesHidrogramas.js";

const assert = (condicion, mensaje) => {
  if (!condicion) {
    throw new Error(mensaje);
  }
};

const buscar = (resultado, id) =>
  resultado.metodos.find((metodo) => metodo.metodoId === id);

const casosDirectos = [
  {
    id: "valido_objetos",
    nombre: "Serie válida con objetos",
    qSeries: [
      { tiempoMin: 0, caudalM3s: 0 },
      { tiempoMin: 10, caudalM3s: 20 },
      { tiempoMin: 20, caudalM3s: 50 },
      { tiempoMin: 30, caudalM3s: 20 },
      { tiempoMin: 40, caudalM3s: 0 },
    ],
    Qpico: 50,
    tPico: 20,
    volTotal: 1200,
    dtMin: 10,
  },
  {
    id: "valido_arreglos",
    nombre: "Serie válida con arreglos",
    series: [
      [0, 0],
      [10, 8],
      [20, 0],
    ],
    Qpico: 8,
    tPico: 10,
    volTotal: 300,
  },
  {
    id: "sin_serie",
    nombre: "Método sin serie",
    Qpico: 10,
    tPico: 15,
    volTotal: 500,
  },
  {
    id: "serie_corta",
    nombre: "Serie corta",
    qSeries: [
      { tiempoMin: 0, caudalM3s: 0 },
      { tiempoMin: 10, caudalM3s: 5 },
    ],
    Qpico: 5,
    tPico: 10,
    volTotal: 100,
  },
  {
    id: "serie_desordenada",
    nombre: "Serie desordenada",
    qSeries: [
      { tiempoMin: 20, caudalM3s: 5 },
      { tiempoMin: 10, caudalM3s: 10 },
      { tiempoMin: 30, caudalM3s: 0 },
    ],
    Qpico: 10,
    tPico: 10,
    volTotal: 200,
  },
  {
    id: "caudal_negativo",
    nombre: "Serie con caudal negativo",
    qSeries: [
      { tiempoMin: 0, caudalM3s: 0 },
      { tiempoMin: 10, caudalM3s: -1 },
      { tiempoMin: 20, caudalM3s: 0 },
    ],
    Qpico: 0,
    tPico: 0,
    volTotal: 0,
  },
  {
    id: "q_inconsistente",
    nombre: "Qpico incompatible",
    qSeries: [
      { tiempoMin: 0, caudalM3s: 0 },
      { tiempoMin: 10, caudalM3s: 8 },
      { tiempoMin: 20, caudalM3s: 0 },
    ],
    Qpico: 50,
    tPico: 10,
    volTotal: 400,
  },
  {
    id: "tp_inconsistente",
    nombre: "tPico incompatible",
    qSeries: [
      { tiempoMin: 0, caudalM3s: 0 },
      { tiempoMin: 10, caudalM3s: 12 },
      { tiempoMin: 20, caudalM3s: 0 },
    ],
    Qpico: 12,
    tPico: 30,
    volTotal: 400,
    dtMin: 5,
  },
];

const resultadoDirecto = adaptarQSeriesHidrogramas(casosDirectos, {
  fuente: "validacion_ot_0069d_directo",
});

console.log("Resumen directo:");
console.log(JSON.stringify(resultadoDirecto.resumen, null, 2));

assert(resultadoDirecto.resumen.total === 8, "Debe procesar ocho métodos en entrada directa.");
assert(resultadoDirecto.resumen.publicados === 2, "Debe publicar dos métodos válidos.");
assert(resultadoDirecto.resumen.noDisponibles === 1, "Debe detectar un método sin serie.");
assert(resultadoDirecto.resumen.parciales === 3, "Debe detectar tres métodos parciales.");
assert(resultadoDirecto.resumen.inconsistentes === 2, "Debe detectar dos métodos inconsistentes.");

assert(buscar(resultadoDirecto, "valido_objetos").estadoPublicacion === "publicado", "valido_objetos debe ser publicado.");
assert(buscar(resultadoDirecto, "valido_arreglos").estadoPublicacion === "publicado", "valido_arreglos debe ser publicado.");
assert(buscar(resultadoDirecto, "sin_serie").estadoPublicacion === "no_disponible", "sin_serie debe ser no_disponible.");
assert(buscar(resultadoDirecto, "serie_corta").estadoPublicacion === "parcial", "serie_corta debe ser parcial.");
assert(buscar(resultadoDirecto, "serie_desordenada").estadoPublicacion === "parcial", "serie_desordenada debe ser parcial.");
assert(buscar(resultadoDirecto, "caudal_negativo").estadoPublicacion === "parcial", "caudal_negativo debe ser parcial.");
assert(buscar(resultadoDirecto, "q_inconsistente").estadoPublicacion === "inconsistente", "q_inconsistente debe ser inconsistente.");
assert(buscar(resultadoDirecto, "tp_inconsistente").estadoPublicacion === "inconsistente", "tp_inconsistente debe ser inconsistente.");

assert(buscar(resultadoDirecto, "valido_objetos").dtMin === 10, "Debe respetar dtMin reportado.");
assert(buscar(resultadoDirecto, "valido_arreglos").dtMin === 10, "Debe inferir dtMin de serie válida con arreglos.");
assert(buscar(resultadoDirecto, "valido_arreglos").qSeries[1].tiempoMin === 10, "Debe normalizar tiempoMin desde arreglo.");
assert(buscar(resultadoDirecto, "valido_arreglos").qSeries[1].caudalM3s === 8, "Debe normalizar caudalM3s desde arreglo.");

const resultadoMetodos = adaptarQSeriesHidrogramas(
  {
    metodos: [
      {
        id: "wrapper_metodos",
        nombre: "Wrapper metodos",
        data: [
          { x: 0, y: 0 },
          { x: 5, y: 4 },
          { x: 10, y: 0 },
        ],
        Qpico: 4,
        tPico: 5,
      },
    ],
  },
  {
    fuente: "validacion_ot_0069d_metodos",
  }
);

console.log("Resumen wrapper metodos:");
console.log(JSON.stringify(resultadoMetodos.resumen, null, 2));

assert(resultadoMetodos.resumen.total === 1, "Wrapper metodos debe procesar un método.");
assert(resultadoMetodos.resumen.publicados === 1, "Wrapper metodos debe publicar el método.");
assert(resultadoMetodos.metodos[0].qSeries[1].tiempoMin === 5, "Wrapper metodos debe leer x como tiempo.");
assert(resultadoMetodos.metodos[0].qSeries[1].caudalM3s === 4, "Wrapper metodos debe leer y como caudal.");

const resultadoResultados = adaptarQSeriesHidrogramas(
  {
    resultados: [
      {
        codigo: "wrapper_resultados",
        metodo: "Wrapper resultados",
        points: [
          { t: 0, q: 0 },
          { t: 15, q: 9 },
          { t: 30, q: 0 },
        ],
        qPico: 9,
        tiempoPico: 15,
      },
    ],
  },
  {
    fuente: "validacion_ot_0069d_resultados",
  }
);

console.log("Resumen wrapper resultados:");
console.log(JSON.stringify(resultadoResultados.resumen, null, 2));

assert(resultadoResultados.resumen.total === 1, "Wrapper resultados debe procesar un método.");
assert(resultadoResultados.resumen.publicados === 1, "Wrapper resultados debe publicar el método.");
assert(resultadoResultados.metodos[0].metodoId === "wrapper_resultados", "Debe normalizar id desde codigo.");
assert(resultadoResultados.metodos[0].Qpico === 9, "Debe leer qPico como Qpico.");
assert(resultadoResultados.metodos[0].tPico === 15, "Debe leer tiempoPico como tPico.");

console.log("OT-0069D OK: validación contractual extendida aprobada.");
