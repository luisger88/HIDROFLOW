import assert from "node:assert/strict";
import { construirLineasParametrosHidrologicosBaseExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const residuos = ["undefined", "null", "NaN", "[object Object]"];

function validarSinResiduos(nombreCaso, texto) {
  const detectados = residuos.filter((token) => texto.includes(token));

  assert.equal(
    detectados.length,
    0,
    `${nombreCaso} no debe contener residuos técnicos: ${detectados.join(", ")}`
  );
}

function validarCasoCompleto() {
  const lineas = construirLineasParametrosHidrologicosBaseExpediente({
    contextoBase: {
      CN: 88,
      CN_base: 82,
      CN_efectivo: 88,
      AMC: "II"
    }
  });

  const texto = lineas.join("\n");

  assert.equal(Array.isArray(lineas), true, "Debe retornar arreglo");
  assert.equal(lineas.length, 5, "Debe retornar 5 líneas");
  assert.equal(lineas[0], "## 2. Parámetros hidrológicos base", "Debe conservar encabezado");
  assert.equal(texto.includes("CN: 88"), true, "Debe incluir CN");
  assert.equal(texto.includes("CN base: 82"), true, "Debe incluir CN base");
  assert.equal(texto.includes("CN efectivo: 88"), true, "Debe incluir CN efectivo");
  assert.equal(texto.includes("AMC: II"), true, "Debe incluir AMC");

  validarSinResiduos("contexto completo", texto);

  console.log("OK contexto completo");
  console.log(texto);
}

function validarCasoFallback() {
  const lineas = construirLineasParametrosHidrologicosBaseExpediente({});

  const texto = lineas.join("\n");

  assert.equal(Array.isArray(lineas), true, "Debe retornar arreglo");
  assert.equal(lineas.length, 5, "Debe retornar 5 líneas");
  assert.equal(lineas[0], "## 2. Parámetros hidrológicos base", "Debe conservar encabezado");
  assert.equal(texto.includes("CN: —"), true, "Debe aplicar fallback CN");
  assert.equal(texto.includes("CN base: —"), true, "Debe aplicar fallback CN base");
  assert.equal(texto.includes("CN efectivo: —"), true, "Debe aplicar fallback CN efectivo");
  assert.equal(texto.includes("AMC: —"), true, "Debe aplicar fallback AMC");

  validarSinResiduos("contexto fallback", texto);

  console.log("OK contexto fallback");
  console.log(texto);
}

function validarContextoDirecto() {
  const lineas = construirLineasParametrosHidrologicosBaseExpediente({
    CN: 90,
    CN_base: 84,
    CN_efectivo: 91,
    AMC: "III"
  });

  const texto = lineas.join("\n");

  assert.equal(texto.includes("CN: 90"), true, "Debe aceptar contexto directo CN");
  assert.equal(texto.includes("CN base: 84"), true, "Debe aceptar contexto directo CN base");
  assert.equal(texto.includes("CN efectivo: 91"), true, "Debe aceptar contexto directo CN efectivo");
  assert.equal(texto.includes("AMC: III"), true, "Debe aceptar contexto directo AMC");

  validarSinResiduos("contexto directo", texto);

  console.log("OK contexto directo");
  console.log(texto);
}

validarCasoCompleto();
validarCasoFallback();
validarContextoDirecto();

console.log("VALIDACION_OT_0133_HELPER_PARAMETROS_BASE_OK");
