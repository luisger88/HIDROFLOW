import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaHelper = path.resolve(
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js"
);

const textoOriginal = fs.readFileSync(rutaHelper, "utf8");

const reemplazos = [
  {
    nombre: "Área con unidad km²",
    antes: `    \`Área: ${
      Number.isFinite(areaKm2)
        ? areaKm2.toFixed(4)
        : "—"
    }\`,`,
    despues: `    \`Área: ${
      Number.isFinite(areaKm2)
        ? areaKm2.toFixed(4) + " km²"
        : "—"
    }\`,`
  },
  {
    nombre: "Pendiente media con unidad %",
    antes: `    \`Pendiente media: ${
      Number.isFinite(pendienteMediaPct)
        ? pendienteMediaPct.toFixed(2)
        : "—"
    }\`,`,
    despues: `    \`Pendiente media: ${
      Number.isFinite(pendienteMediaPct)
        ? pendienteMediaPct.toFixed(2) + " %"
        : "—"
    }\`,`
  },
  {
    nombre: "Longitud cauce principal con unidad km",
    antes: `    \`Longitud cauce principal: ${
      Number.isFinite(longitudCauceKm)
        ? longitudCauceKm.toFixed(3)
        : "—"
    }\``,
    despues: `    \`Longitud cauce principal: ${
      Number.isFinite(longitudCauceKm)
        ? longitudCauceKm.toFixed(3) + " km"
        : "—"
    }\``
  }
];

let textoActualizado = textoOriginal;

for (const reemplazo of reemplazos) {
  assert.equal(
    textoActualizado.includes(reemplazo.antes),
    true,
    `No se encontró el bloque esperado para reemplazar: ${reemplazo.nombre}`
  );

  textoActualizado = textoActualizado.replace(reemplazo.antes, reemplazo.despues);
}

fs.writeFileSync(rutaHelper, textoActualizado, "utf8");

console.log("APLICACION_OT_0127_UNIDADES_IDENTIFICACION_OK");
