import assert from "node:assert/strict";
import { construirLineasTiempoConcentracionRolesTcExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const residuos = ["undefined", "null", "NaN", "[object Object]"];

function validarSinResiduos(nombreCaso, texto) {
  const detectados = residuos.filter((token) => texto.includes(token));

  assert.equal(
    detectados.length,
    0,
    `${nombreCaso} no debe contener residuos técnicos: ${detectados.join(", ")}`
  );
}

function validarEstructura(nombreCaso, lineas) {
  assert.equal(Array.isArray(lineas), true, `${nombreCaso}: debe retornar arreglo`);
  assert.equal(lineas.length, 10, `${nombreCaso}: debe retornar 10 líneas`);
  assert.equal(lineas[0], "## 3. Tiempo de concentración y roles Tc", `${nombreCaso}: debe conservar encabezado`);
  assert.equal(lineas[3], "Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.", `${nombreCaso}: debe conservar nota Tr`);
  assert.equal(lineas[4], "Roles Tc:", `${nombreCaso}: debe conservar Roles Tc`);
  assert.equal(lineas[5], "- Tc global Índice: referencia hidrológica general.", `${nombreCaso}: debe conservar rol Tc global Índice`);
  assert.equal(lineas[6], "- Tc operativo Q(t): ruta interna del hidrograma.", `${nombreCaso}: debe conservar rol Tc operativo`);
  assert.equal(lineas[7], "- Duración evento: 3 h para almacenamiento/regulación.", `${nombreCaso}: debe conservar duración evento`);
  assert.equal(lineas[8], "- Lag / forma SCS: parámetro derivado para forma temporal.", `${nombreCaso}: debe conservar lag SCS`);
  assert.equal(lineas[9], "- Tc comparador: referencia especializada para coherencia Q-5.", `${nombreCaso}: debe conservar rol Tc comparador`);
}

function validarCasoCompleto() {
  const lineas = construirLineasTiempoConcentracionRolesTcExpediente({
    Tc_final: 114.23,
    trDisenoActivoExpediente: 100
  });

  const texto = lineas.join("\n");

  validarEstructura("contexto completo", lineas);
  validarSinResiduos("contexto completo", texto);

  assert.equal(texto.includes("Tc comparador: 114.2 min"), true, "Debe formatear Tc con una cifra decimal");
  assert.equal(texto.includes("Tr global activo: 100 años"), true, "Debe representar Tr global activo");

  console.log("OK contexto completo");
  console.log(texto);
}

function validarCasoFallback() {
  const lineas = construirLineasTiempoConcentracionRolesTcExpediente({});

  const texto = lineas.join("\n");

  validarEstructura("contexto fallback", lineas);
  validarSinResiduos("contexto fallback", texto);

  assert.equal(texto.includes("Tc comparador: —"), true, "Debe aplicar fallback Tc");
  assert.equal(texto.includes("Tr global activo: — años"), true, "Debe aplicar fallback Tr");

  console.log("OK contexto fallback");
  console.log(texto);
}

function validarCasoNoFinito() {
  const lineas = construirLineasTiempoConcentracionRolesTcExpediente({
    Tc_final: Number.NaN,
    trDisenoActivoExpediente: null
  });

  const texto = lineas.join("\n");

  validarEstructura("contexto no finito", lineas);
  validarSinResiduos("contexto no finito", texto);

  assert.equal(texto.includes("Tc comparador: —"), true, "Debe aplicar fallback Tc no finito");
  assert.equal(texto.includes("Tr global activo: — años"), true, "Debe aplicar fallback Tr null");

  console.log("OK contexto no finito");
  console.log(texto);
}

validarCasoCompleto();
validarCasoFallback();
validarCasoNoFinito();

console.log("VALIDACION_OT_0143_HELPER_TIEMPO_CONCENTRACION_OK");
