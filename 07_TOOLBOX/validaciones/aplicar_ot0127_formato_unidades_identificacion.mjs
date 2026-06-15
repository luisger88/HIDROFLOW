import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaHelper = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

let texto = fs.readFileSync(rutaHelper, "utf8");

const reemplazos = [
  {
    nombre: "Área con unidad km²",
    patron: /`Área: \$\{\s*Number\.isFinite\(areaKm2\)\s*\?\s*areaKm2\.toFixed\(4\)\s*:\s*"—"\s*\}`/,
    reemplazo: '`Área: ${\n      Number.isFinite(areaKm2)\n        ? areaKm2.toFixed(4) + " km²"\n        : "—"\n    }`'
  },
  {
    nombre: "Pendiente media con unidad %",
    patron: /`Pendiente media: \$\{\s*Number\.isFinite\(pendienteMediaPct\)\s*\?\s*pendienteMediaPct\.toFixed\(2\)\s*:\s*"—"\s*\}`/,
    reemplazo: '`Pendiente media: ${\n      Number.isFinite(pendienteMediaPct)\n        ? pendienteMediaPct.toFixed(2) + " %"\n        : "—"\n    }`'
  },
  {
    nombre: "Longitud cauce principal con unidad km",
    patron: /`Longitud cauce principal: \$\{\s*Number\.isFinite\(longitudCauceKm\)\s*\?\s*longitudCauceKm\.toFixed\(3\)\s*:\s*"—"\s*\}`/,
    reemplazo: '`Longitud cauce principal: ${\n      Number.isFinite(longitudCauceKm)\n        ? longitudCauceKm.toFixed(3) + " km"\n        : "—"\n    }`'
  }
];

for (const reemplazo of reemplazos) {
  assert.equal(
    reemplazo.patron.test(texto),
    true,
    `No se encontró patrón esperado para: ${reemplazo.nombre}`
  );

  texto = texto.replace(reemplazo.patron, reemplazo.reemplazo);
}

fs.writeFileSync(rutaHelper, texto, "utf8");

console.log("APLICACION_OT_0127_UNIDADES_IDENTIFICACION_OK");
