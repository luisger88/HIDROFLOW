// OT-0101B — Validación cruzada plantilla vs validador de completitud.
// Éxito esperado: la plantilla estructural NO debe ser comparable.

import plantillaMatrizCuencaPatron from "../src/data/plantillaMatrizCuencaPatron.js";
import validarCompletitudMatrizCuencaPatron from "../src/services/hidrogramas/validarCompletitudMatrizCuencaPatron.js";

const resultado = validarCompletitudMatrizCuencaPatron(plantillaMatrizCuencaPatron);

const resumen = {
  ok: resultado.ok,
  comparable: resultado.comparable,
  errores: Array.isArray(resultado.errores) ? resultado.errores.length : 0,
  advertencias: Array.isArray(resultado.advertencias) ? resultado.advertencias.length : 0,
  camposCriticosCompletos: resultado.resumen?.camposCriticosCompletos ?? null
};

console.log("OT-0101B — Validación cruzada plantilla vs validador");
console.log(JSON.stringify(resumen, null, 2));

if (resultado.comparable === true || resultado.ok === true) {
  console.error(
    "ERROR: La plantilla estructural fue marcada como comparable. Esto no debe ocurrir."
  );
  process.exit(1);
}

if (!Array.isArray(resultado.errores) || resultado.errores.length === 0) {
  console.error(
    "ERROR: La plantilla no produjo errores críticos. Esto indica que el validador no está bloqueando campos faltantes."
  );
  process.exit(1);
}

console.log(
  "VALIDACIÓN APROBADA: la plantilla estructural no operativa fue bloqueada correctamente."
);