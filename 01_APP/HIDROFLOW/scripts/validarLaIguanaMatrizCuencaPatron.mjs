// OT-0102B — Validación cruzada La Iguaná PC_80 vs validador de completitud.
// Esta prueba NO modifica la matriz y NO relaja el validador.
// Si la matriz no pasa, se reportan brechas; no se corrigen automáticamente.

import matrizPatronLaIguanaPC80 from "../src/data/matrizPatronLaIguanaPC80.js";
import validarCompletitudMatrizCuencaPatron from "../src/services/hidrogramas/validarCompletitudMatrizCuencaPatron.js";

const resultado = validarCompletitudMatrizCuencaPatron(matrizPatronLaIguanaPC80);

const resumen = {
  ok: resultado.ok,
  comparable: resultado.comparable,
  errores: Array.isArray(resultado.errores) ? resultado.errores.length : 0,
  advertencias: Array.isArray(resultado.advertencias) ? resultado.advertencias.length : 0,
  camposCriticosCompletos: resultado.resumen?.camposCriticosCompletos ?? null,
  cuenca: resultado.resumen?.cuenca ?? null,
  puntoControl: resultado.resumen?.puntoControl ?? null,
  metodosQt: resultado.resumen?.metodosQt ?? null,
  restricciones: resultado.resumen?.restricciones ?? null
};

console.log("OT-0102B — Validación cruzada La Iguaná PC_80 vs validador");
console.log(JSON.stringify(resumen, null, 2));

if (Array.isArray(resultado.errores) && resultado.errores.length > 0) {
  console.log("ERRORES DETECTADOS:");
  resultado.errores.forEach((error, indice) => {
    console.log(`${indice + 1}. ${error}`);
  });
}

if (Array.isArray(resultado.advertencias) && resultado.advertencias.length > 0) {
  console.log("ADVERTENCIAS DETECTADAS:");
  resultado.advertencias.forEach((advertencia, indice) => {
    console.log(`${indice + 1}. ${advertencia}`);
  });
}

if (resultado.comparable === true && resultado.ok === true) {
  console.log(
    "VALIDACIÓN APROBADA: La Iguaná PC_80 cumple el contrato mínimo de matriz comparable."
  );
  process.exit(0);
}

console.error(
  "VALIDACIÓN NO APROBADA: La Iguaná PC_80 no cumple todavía el contrato mínimo. Documentar brechas antes de corregir."
);

process.exit(1);