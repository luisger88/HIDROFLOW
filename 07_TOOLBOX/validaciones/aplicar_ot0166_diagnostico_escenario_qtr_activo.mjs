import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

const nombreFuncion = "construirLineasEscenarioQTrActivoExpediente";

assert.equal(
  texto.includes("construirLineasVolumenReferenciaExpediente"),
  true,
  "Debe existir el import previo del helper Volumen de referencia para insertar Q-Tr de forma controlada."
);

if (!texto.includes(nombreFuncion)) {
  texto = texto.replace(
    "construirLineasVolumenReferenciaExpediente,",
    "construirLineasVolumenReferenciaExpediente,\n  construirLineasEscenarioQTrActivoExpediente,"
  );
}

const marcadorInsercion =
  "          // OT-0156 — Diagnóstico no invasivo del bloque Volumen de referencia delegado.";

const bloqueDiagnostico = `          // OT-0166 — Diagnóstico no invasivo del bloque Escenario Q-Tr activo delegado.
          // No reemplaza textoExpediente, no modifica el botón y no cambia portapapeles.
          try {
            const lineasEscenarioQTrActivoDelegadasDiagnostico =
              construirLineasEscenarioQTrActivoExpediente({
                estadoQTrActivoExpediente,
                qTrActivoExpediente,
                faltantesQTrActivoExpediente,
                formatearValorQTrExpediente
              });

            const textoEscenarioQTrActivoDelegadoDiagnostico =
              Array.isArray(lineasEscenarioQTrActivoDelegadasDiagnostico)
                ? lineasEscenarioQTrActivoDelegadasDiagnostico.join("\\n")
                : "";

            const diagnosticoEscenarioQTrActivoDelegado = {
              lineasDelegadas: Array.isArray(lineasEscenarioQTrActivoDelegadasDiagnostico)
                ? lineasEscenarioQTrActivoDelegadasDiagnostico.length
                : 0,
              contieneEncabezadoDelegado:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
              operativoContieneEncabezado:
                textoExpediente.includes("## 5. Escenario Q-Tr activo — control de trazabilidad"),
              delegadoContieneEstado:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Estado:"),
              operativoContieneEstado:
                textoExpediente.includes("Estado:"),
              delegadoContieneTrActivo:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Tr activo:"),
              operativoContieneTrActivo:
                textoExpediente.includes("Tr activo:"),
              delegadoContieneCamposMinimos:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Campos mínimos:"),
              operativoContieneCamposMinimos:
                textoExpediente.includes("Campos mínimos:"),
              delegadoContieneFuente:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Fuente:"),
              operativoContieneFuente:
                textoExpediente.includes("Fuente:"),
              delegadoContieneLecturaTecnica:
                textoEscenarioQTrActivoDelegadoDiagnostico.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente."),
              operativoContieneLecturaTecnica:
                textoExpediente.includes("Lectura técnica: bloque no adoptivo; no recalcula caudales, no modifica Q-5 y queda subordinado a validación hidrológica del expediente.")
            };

            if (
              diagnosticoEscenarioQTrActivoDelegado.lineasDelegadas !== 16 ||
              !diagnosticoEscenarioQTrActivoDelegado.contieneEncabezadoDelegado ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneEncabezado ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneEstado ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneEstado ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneTrActivo ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneTrActivo ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneCamposMinimos ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneCamposMinimos ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneFuente ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneFuente ||
              !diagnosticoEscenarioQTrActivoDelegado.delegadoContieneLecturaTecnica ||
              !diagnosticoEscenarioQTrActivoDelegado.operativoContieneLecturaTecnica
            ) {
              console.warn(
                "Diagnóstico Escenario Q-Tr activo delegado no invasivo:",
                diagnosticoEscenarioQTrActivoDelegado
              );
            }
          } catch (errorDiagnosticoEscenarioQTrActivoDelegado) {
            console.warn(
              "Diagnóstico Escenario Q-Tr activo delegado no invasivo no ejecutado:",
              errorDiagnosticoEscenarioQTrActivoDelegado
            );
          }

`;

if (!texto.includes("OT-0166 — Diagnóstico no invasivo del bloque Escenario Q-Tr activo delegado")) {
  assert.equal(
    texto.includes(marcadorInsercion),
    true,
    "No se encontró marcador OT-0156 para insertar diagnóstico OT-0166."
  );

  texto = texto.replace(marcadorInsercion, bloqueDiagnostico + marcadorInsercion);
}

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0166_DIAGNOSTICO_ESCENARIO_QTR_ACTIVO_OK");
