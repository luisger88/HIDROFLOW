import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

const texto = fs.readFileSync(rutaComparador, "utf8");

const patronBloqueManual =
  /[ \t]*"## 3\. Tiempo de concentración y roles Tc",\s*`Tc comparador: \$\{Tc_final !== null && Tc_final !== undefined \? Number\(Tc_final\)\.toFixed\(1\) \+ " min" : "—"\}`,\s*`Tr global activo: \$\{trDisenoActivoExpediente\} años`,\s*"Nota Tr: estado global visual\/exportable; no implica recálculo automático hasta propagación hidrológica controlada\.",\s*"Roles Tc:",\s*"- Tc global Índice: referencia hidrológica general\.",\s*"- Tc operativo Q\(t\): ruta interna del hidrograma\.",\s*"- Duración evento: 3 h para almacenamiento\/regulación\.",\s*"- Lag \/ forma SCS: parámetro derivado para forma temporal\.",\s*"- Tc comparador: referencia especializada para coherencia Q-5\.",/s;

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe mantenerse textoExpediente"
);

assert.equal(
  texto.includes("...construirLineasTiempoConcentracionRolesTcExpediente({"),
  true,
  "El bloque Tiempo de concentración debe usar expansión delegada"
);

assert.equal(
  texto.includes("Tc_final"),
  true,
  "La sustitución delegada debe pasar Tc_final"
);

assert.equal(
  texto.includes("trDisenoActivoExpediente"),
  true,
  "La sustitución delegada debe pasar trDisenoActivoExpediente"
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
  patronBloqueManual.test(texto),
  false,
  "No debe reaparecer el bloque manual antiguo de Tiempo de concentración"
);

assert.equal(
  texto.includes("## 1. Identificación"),
  true,
  "Debe conservarse bloque Identificación"
);

assert.equal(
  texto.includes("## 2. Parámetros hidrológicos base"),
  true,
  "Debe conservarse bloque Parámetros base"
);

assert.equal(
  texto.includes("## 4."),
  true,
  "Debe conservarse bloque siguiente"
);

console.log("VALIDACION_OT_0148_SUSTITUCION_TIEMPO_CONCENTRACION_OK");
