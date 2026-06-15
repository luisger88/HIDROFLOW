import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse el arreglo textoExpediente"
);

assert.equal(
  texto.includes("...construirLineasIdentificacionExpediente({"),
  true,
  "El bloque Identificación debe usar expansión delegada"
);

assert.equal(
  texto.includes("contextoBase,"),
  true,
  "La sustitución delegada debe pasar contextoBase"
);

assert.equal(
  texto.includes('fuenteFallback: "HidroFlow"'),
  true,
  "La sustitución delegada debe conservar fuenteFallback"
);

assert.equal(
  texto.includes("estacionIdfFallback: estacionIdfExpediente"),
  true,
  "La sustitución delegada debe pasar estacionIdfExpediente como fallback"
);

assert.equal(
  texto.includes("areaTexto.value = textoExpediente"),
  true,
  "El portapapeles debe seguir usando textoExpediente"
);

assert.equal(
  texto.includes("window.prompt(\"No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:\", textoExpediente)"),
  true,
  "El fallback manual debe seguir usando textoExpediente"
);

assert.equal(
  texto.includes("navigator.clipboard"),
  false,
  "No debe introducirse navigator.clipboard"
);

assert.equal(
  texto.includes("writeText"),
  false,
  "No debe introducirse writeText"
);

assert.equal(
  texto.includes('`Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`'),
  false,
  "La línea manual de Área ya no debe estar en textoExpediente"
);

assert.equal(
  texto.includes('`Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`'),
  false,
  "La línea manual de Pendiente media ya no debe estar en textoExpediente"
);

assert.equal(
  texto.includes('`Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`'),
  false,
  "La línea manual de Longitud cauce principal ya no debe estar en textoExpediente"
);

console.log("VALIDACION_OT_0128_SUSTITUCION_IDENTIFICACION_OK");
