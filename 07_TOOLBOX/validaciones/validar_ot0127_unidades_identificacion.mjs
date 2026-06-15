import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { construirLineasIdentificacionExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const textoComparador = fs.readFileSync(rutaComparador, "utf8");

const contextoBase = {
  cuencaNombre: "Quebrada La Iguaná - PC_80",
  area_km2: 46.8516,
  pendiente_media_pct: 8.43,
  longitud_cauce_km: 15.524,
  fuente: "HidroFlow"
};

const lineas = construirLineasIdentificacionExpediente({
  contextoBase,
  fuenteFallback: "HidroFlow",
  estacionIdfFallback: "SAN CRISTOBAL"
});

const texto = lineas.join("\n");

assert.equal(Array.isArray(lineas), true, "Debe retornar arreglo");
assert.equal(lineas.length, 7, "Debe retornar 7 líneas");
assert.equal(lineas[0], "## 1. Identificación", "Debe conservar encabezado");

assert.equal(
  texto.includes("Área: 46.8516 km²"),
  true,
  "Debe incluir área con km²"
);

assert.equal(
  texto.includes("Pendiente media: 8.43 %"),
  true,
  "Debe incluir pendiente con %"
);

assert.equal(
  texto.includes("Longitud cauce principal: 15.524 km"),
  true,
  "Debe incluir longitud con km"
);

for (const token of ["undefined", "null", "NaN", "[object Object]"]) {
  assert.equal(
    texto.includes(token),
    false,
    `No debe incluir ${token}`
  );
}

assert.equal(
  textoComparador.includes("areaTexto.value = textoExpediente"),
  true,
  "El portapapeles debe seguir usando textoExpediente"
);

assert.equal(
  textoComparador.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  true,
  "El fallback manual debe seguir usando textoExpediente"
);

console.log("VALIDACION_OT_0127_UNIDADES_IDENTIFICACION_OK");
console.log(texto);
