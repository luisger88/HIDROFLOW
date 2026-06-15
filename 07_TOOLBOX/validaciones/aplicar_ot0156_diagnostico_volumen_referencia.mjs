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
  "Debe existir el import previo del helper de Tiempo de concentración para insertar Volumen de referencia de forma controlada."
);

if (!texto.includes(nombreFuncion)) {
  texto = texto.replace(
    "construirLineasTiempoConcentracionRolesTcExpediente,",
    "construirLineasTiempoConcentracionRolesTcExpediente,\n  construirLineasVolumenReferenciaExpediente,"
  );
}

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
              diagnosticoVolumenReferenciaDelegado.lineasDelsole.warn(
              "Diagnóstico Volumen de referencia delegado no invasivo no ejecutado:",
              errorDiagnosticoVolumenReferenciaDelegado
            );
          }

`;

if (!texto.includes("OT-0156 — Diagnóstico no invasivo del bloque Volumen de referencia delegado")) {
  assert.equal(
    texto.includes(marcadorSiguiente),
    true,
    "No se encontró el marcador OT-0146 para insertar diagnóstico OT-0156."
  );

  texto = texto.replace(marcadorSiguiente, bloqueDiagnostico + marcadorSiguiente);
}

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0156_DIAGNOSTICO_VOLUMEN_REFERENCIA_OK");
