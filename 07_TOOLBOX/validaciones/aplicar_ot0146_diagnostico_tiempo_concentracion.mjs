import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

const nombreFuncion = "construirLineasTiempoConcentracionRolesTcExpediente";

assert.equal(
  texto.includes("construirLineasParametrosHidrologicosBaseExpediente"),
  true,
  "Debe existir el import previo de parámetros base para insertar el helper de tiempo de concentración."
);

if (!texto.includes(nombreFuncion)) {
  texto = texto.replace(
    "construirLineasParametrosHidrologicosBaseExpediente,",
    "construirLineasParametrosHidrologicosBaseExpediente,\n  construirLineasTiempoConcentracionRolesTcExpediente,"
  );
}

const marcadorSiguiente =
  "          // OT-0135 — Diagnóstico no invasivo del bloque Parámetros hidrológicos base delegado.";

const bloqueDiagnostico = `          // OT-0146 — Diagnóstico no invasivo del bloque Tiempo de concentración y roles Tc delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasTiempoConcentracionDelegadasDiagnostico =
              construirLineasTiempoConcentracionRolesTcExpediente({
                Tc_final,
                trDisenoActivoExpediente
              });

            const textoTiempoConcentracionDelegadoDiagnostico =
              Array.isArray(lineasTiempoConcentracionDelegadasDiagnostico)
                ? lineasTiempoConcentracionDelegadasDiagnostico.join("\\n")
                : "";

            const diagnosticoTiempoConcentracionDelegado = {
              lineasDelegadas: Array.isArray(lineasTiempoConcentracionDelegadasDiagnostico)
                ? lineasTiempoConcentracionDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoTiempoConcentracionDelegadoDiagnostico.includes("## 3. Tiempo de concentración y roles Tc"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 3. Tiempo de concentración y roles Tc"),
              delegadoContieneTcComparador:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tc comparador:"),
              operativoContieneTcComparador:
                textoExpediente.includes("Tc comparador:"),
              delegadoContieneTrGlobal:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Tr global activo:"),
              operativoContieneTrGlobal:
                textoExpediente.includes("Tr global activo:"),
              delegadoContieneRoles:
                textoTiempoConcentracionDelegadoDiagnostico.includes("Roles Tc:"),
              operativoContieneRoles:
                textoExpediente.includes("Roles Tc:")
            };

            if (
              diagnosticoTiempoConcentracionDelegado.lineasDelegadas !== 10 ||
              !diagnosticoTiempoConcentracionDelegado.contieneEncabezadoDelegado ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneEncabezado ||
              !diagnosticoTiempoConcentracionDelegado.delegadoContieneTcComparador ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneTcComparador ||
              !diagnosticoTiempoConcentracionDelegado.delegadoContieneTrGlobal ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneTrGlobal ||
              !diagnosticoTiempoConcentracionDelegado.delegadoContieneRoles ||
              !diagnosticoTiempoConcentracionDelegado.operativoContieneRoles
            ) {
              console.warn(
                "Diagnóstico Tiempo de concentración delegado no invasivo:",
                diagnosticoTiempoConcentracionDelegado
              );
            }
          } catch (errorDiagnosticoTiempoConcentracionDelegado) {
            console.warn(
              "Diagnóstico Tiempo de concentración delegado no invasivo no ejecutado:",
              errorDiagnosticoTiempoConcentracionDelegado
            );
          }

`;

if (!texto.includes("OT-0146 — Diagnóstico no invasivo del bloque Tiempo de concentración y roles Tc delegado")) {
  assert.equal(
    texto.includes(marcadorSiguiente),
    true,
    "No se encontró el marcador OT-0135 para insertar diagnóstico OT-0146."
  );

  texto = texto.replace(marcadorSiguiente, bloqueDiagnostico + marcadorSiguiente);
}

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0146_DIAGNOSTICO_TIEMPO_CONCENTRACION_OK");
