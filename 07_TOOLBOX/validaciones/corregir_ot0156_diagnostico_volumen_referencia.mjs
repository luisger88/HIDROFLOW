import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

const nombreFuncion = "construirLineasVolumenReferenciaExpediente";

assert.equal(
  texto.includes("construirLineasTiempoConcentracionRolesTcExpediente"),
  true,
  "Debe existir el helper de Tiempo de concentración para ubicar el import de Volumen."
);

if (!texto.includes(nombreFuncion)) {
  texto = texto.replace(
    "construirLineasTiempoConcentracionRolesTcExpediente,",
    "construirLineasTiempoConcentracionRolesTcExpediente,\n  construirLineasVolumenReferenciaExpediente,"
  );
}

const marcadorInicio =
  "          // OT-0156 — Diagnóstico no invasivo del bloque Volumen de referencia delegado.";

const marcadorSiguiente =
  "          // OT-0146 — Diagnóstico no invasivo del bloque Tiempo de concentración y roles Tc delegado.";

const bloqueDiagnostico = `          // OT-0156 — Diagnóstico no invasivo del bloque Volumen de referencia delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasVolumenReferenciaDelegadasDiagnostico =
              construirLineasVolumenReferenciaExpediente({
                peTotalMm,
                volumenEsperadoM3
              });

            const textoVolumenReferenciaDelegadoDiagnostico =
              Array.isArray(lineasVolumenReferenciaDelegadasDiagnostico)
                ? lineasVolumenReferenciaDelegadasDiagnostico.join("\\n")
                : "";

            const diagnosticoVolumenReferenciaDelegado = {
              lineasDelegadas: Array.isArray(lineasVolumenReferenciaDelegadasDiagnostico)
                ? lineasVolumenReferenciaDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoVolumenReferenciaDelegadoDiagnostico.includes("## 4. Volumen de referencia"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 4. Volumen de referencia"),
              delegadoContieneLluvia:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Lluvia efectiva total:"),
              operativoContieneLluvia:
                textoExpediente.includes("Lluvia efectiva total:"),
              delegadoContieneVolumen:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Volumen esperado:"),
              operativoContieneVolumen:
                textoExpediente.includes("Volumen esperado:"),
              delegadoContieneFormula:
                textoVolumenReferenciaDelegadoDiagnostico.includes("Fórmula: Pe(mm) × Área(km²) × 1000."),
              operativoContieneFormula:
                textoExpediente.includes("Fórmula: Pe(mm) × Área(km²) × 1000.")
            };

            if (
              diagnosticoVolumenReferenciaDelegado.lineasDelegadas !== 4 ||
              !diagnosticoVolumenReferenciaDelegado.contieneEncabezadoDelegado ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneEncabezado ||
              !diagnosticoVolumenReferenciaDelegado.delegadoContieneLluvia ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneLluvia ||
              !diagnosticoVolumenReferenciaDelegado.delegadoContieneVolumen ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneVolumen ||
              !diagnosticoVolumenReferenciaDelegado.delegadoContieneFormula ||
              !diagnosticoVolumenReferenciaDelegado.operativoContieneFormula
            ) {
              console.warn(
                "Diagnóstico Volumen de referencia delegado no invasivo:",
                diagnosticoVolumenReferenciaDelegado
              );
            }
          } catch (errorDiagnosticoVolumenReferenciaDelegado) {
            console.warn(
              "Diagnóstico Volumen de referencia delegado no invasivo no ejecutado:",
              errorDiagnosticoVolumenReferenciaDelegado
            );
          }

`;

if (texto.includes(marcadorInicio)) {
  const inicio = texto.indexOf(marcadorInicio);
  const fin = texto.indexOf(marcadorSiguiente, inicio);

  assert.notEqual(
    fin,
    -1,
    "No se encontró el marcador OT-0146 después del bloque OT-0156."
  );

  texto = texto.slice(0, inicio) + bloqueDiagnostico + texto.slice(fin);
} else {
  assert.equal(
    texto.includes(marcadorSiguiente),
    true,
    "No se encontró el marcador OT-0146 para insertar diagnóstico OT-0156."
  );

  texto = texto.replace(marcadorSiguiente, bloqueDiagnostico + marcadorSiguiente);
}

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("CORRECCION_OT_0156_DIAGNOSTICO_VOLUMEN_REFERENCIA_OK");
