import adaptarQSeriesHidrogramas from "../src/services/hidrogramas/adaptarQSeriesHidrogramas.js";

const assert = (condicion, mensaje) => {
  if (!condicion) {
    throw new Error(mensaje);
  }
};

const hidrogramasPrueba = [
  {
    id: "scs",
    nombre: "SCS Unit Hydrograph",
    qSeries: [
      { tiempoMin: 0, caudalM3s: 0 },
      { tiempoMin: 10, caudalM3s: 12 },
      { tiempoMin: 20, caudalM3s: 30 },
      { tiempoMin: 30, caudalM3s: 12 },
      { tiempoMin: 40, caudalM3s: 0 },
    ],
    Qpico: 30,
    tPico: 20,
    volTotal: 1000,
  },
  {
    id: "sin_serie",
    nombre: "Método sin serie",
    Qpico: 10,
    tPico: 15,
    volTotal: 500,
  },
  {
    id: "inconsistente",
    nombre: "Serie inconsistente",
    qSeries: [
      [0, 0],
      [10, 5],
      [20, 8],
      [30, 0],
    ],
    Qpico: 50,
    tPico: 10,
    volTotal: 800,
  },
];

const resultado = adaptarQSeriesHidrogramas(hidrogramasPrueba, {
  fuente: "validacion_ot_0069c",
});

console.log(JSON.stringify(resultado.resumen, null, 2));

assert(resultado.resumen.total === 3, "Debe procesar tres métodos.");
assert(resultado.resumen.publicados === 1, "Debe publicar un método válido.");
assert(resultado.resumen.noDisponibles === 1, "Debe detectar un método sin serie.");
assert(resultado.resumen.inconsistentes === 1, "Debe detectar una serie inconsistente.");
assert(resultado.metodos[0].qSeries[2].tiempoMin === 20, "Debe conservar tiempoMin normalizado.");
assert(resultado.metodos[0].qSeries[2].caudalM3s === 30, "Debe conservar caudalM3s normalizado.");

console.log("OT-0069C OK: adaptador qSeries validado.");
