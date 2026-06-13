import resumirEstructuraHidrogramas from "../src/services/hidrogramas/resumirEstructuraHidrogramas.js";

const assert = (condicion, mensaje) => {
  if (!condicion) {
    throw new Error(mensaje);
  }
};

const hidrogramasDirectos = [
  {
    id: "scs",
    nombre: "SCS Unit Hydrograph",
    qSeries: [
      { tiempoMin: 0, caudalM3s: 0 },
      { tiempoMin: 10, caudalM3s: 5 },
      { tiempoMin: 20, caudalM3s: 0 },
    ],
    Qpico: 5,
    tPico: 10,
    volTotal: 100,
  },
  {
    id: "snyder",
    nombre: "Snyder",
    Qpico: 4,
    tPico: 15,
    volTotal: 80,
  },
  {
    id: "clark",
    nombre: "Clark IUH",
    data: [
      [0, 0],
      [10, 3],
      [20, 0],
    ],
    Qpico: 3,
    tPico: 10,
    volTotal: 60,
  },
];

const resumenDirecto = resumirEstructuraHidrogramas(hidrogramasDirectos);

console.log("Resumen directo:");
console.log(JSON.stringify(resumenDirecto.resumen, null, 2));

assert(resumenDirecto.ok === true, "La entrada directa debe ser válida.");
assert(resumenDirecto.resumen.tipoEntrada === "array", "Debe detectar entrada array.");
assert(resumenDirecto.resumen.totalCandidatos === 3, "Debe detectar tres candidatos.");
assert(resumenDirecto.resumen.conSerieTemporal === 2, "Debe detectar dos candidatos con serie temporal.");
assert(resumenDirecto.resumen.sinSerieTemporal === 1, "Debe detectar un candidato sin serie temporal.");
assert(resumenDirecto.resumen.conQpico === 3, "Debe detectar Qpico en tres candidatos.");
assert(resumenDirecto.resumen.conTPico === 3, "Debe detectar tPico en tres candidatos.");
assert(resumenDirecto.resumen.conVolTotal === 3, "Debe detectar volTotal en tres candidatos.");

const scs = resumenDirecto.candidatos.find((candidato) => candidato.metodoId === "scs");
assert(scs.tieneSerieTemporal === true, "SCS debe tener serie temporal.");
assert(scs.posiblesSeries[0].clave === "qSeries", "SCS debe reportar qSeries.");
assert(scs.posiblesSeries[0].longitud === 3, "SCS debe reportar longitud 3.");
assert(scs.posiblesSeries[0].clavesPrimerPunto.includes("tiempoMin"), "SCS debe resumir claves del primer punto.");

const clark = resumenDirecto.candidatos.find((candidato) => candidato.metodoId === "clark");
assert(clark.posiblesSeries[0].clave === "data", "Clark debe detectar data.");
assert(clark.posiblesSeries[0].tipoPrimerPunto === "array", "Clark debe detectar primer punto tipo array.");
assert(clark.posiblesSeries[0].clavesPrimerPunto.includes("0"), "Clark debe resumir índice 0 del primer punto.");
assert(clark.posiblesSeries[0].clavesPrimerPunto.includes("1"), "Clark debe resumir índice 1 del primer punto.");

const resumenMetodos = resumirEstructuraHidrogramas({
  metodos: [
    {
      id: "wrapper_metodos",
      nombre: "Wrapper métodos",
      points: [
        { t: 0, q: 0 },
        { t: 5, q: 2 },
        { t: 10, q: 0 },
      ],
      qPico: 2,
      tiempoPico: 5,
      volumenTotal: 30,
    },
  ],
});

console.log("Resumen wrapper metodos:");
console.log(JSON.stringify(resumenMetodos.resumen, null, 2));

assert(resumenMetodos.resumen.tipoEntrada === "object", "Wrapper metodos debe ser object.");
assert(resumenMetodos.resumen.contenedor === "metodos", "Debe detectar contenedor metodos.");
assert(resumenMetodos.resumen.totalCandidatos === 1, "Debe detectar un candidato en metodos.");
assert(resumenMetodos.resumen.conSerieTemporal === 1, "Debe detectar serie temporal en points.");
assert(resumenMetodos.candidatos[0].posiblesSeries[0].clave === "points", "Debe detectar points.");
assert(resumenMetodos.candidatos[0].tieneQpico === true, "Debe detectar qPico alias.");
assert(resumenMetodos.candidatos[0].tieneTPico === true, "Debe detectar tiempoPico alias.");
assert(resumenMetodos.candidatos[0].tieneVolTotal === true, "Debe detectar volumenTotal alias.");

const resumenResultados = resumirEstructuraHidrogramas({
  resultados: [
    {
      codigo: "wrapper_resultados",
      metodo: "Wrapper resultados",
      serie: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
      ],
      caudalPico: 1,
      Tp: 1,
      volumen: 10,
    },
  ],
});

console.log("Resumen wrapper resultados:");
console.log(JSON.stringify(resumenResultados.resumen, null, 2));

assert(resumenResultados.resumen.contenedor === "resultados", "Debe detectar contenedor resultados.");
assert(resumenResultados.candidatos[0].posiblesSeries[0].clave === "serie", "Debe detectar serie.");
assert(resumenResultados.candidatos[0].metodoId === "wrapper_resultados", "Debe normalizar id desde codigo.");

const resumenVacio = resumirEstructuraHidrogramas(null);

console.log("Resumen vacío:");
console.log(JSON.stringify(resumenVacio.resumen, null, 2));

assert(resumenVacio.ok === false, "Entrada null no debe producir candidatos.");
assert(resumenVacio.resumen.totalCandidatos === 0, "Entrada null debe tener cero candidatos.");

console.log("OT-0074D OK: resumen estructural de hidrogramas validado.");
