import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rutaComparador = path.resolve(
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
);

let texto = fs.readFileSync(rutaComparador, "utf8");

const nombreHelper = "construirLineasResumenQ5AuditadoExpediente";
const importStandalone = `import { construirLineasResumenQ5AuditadoExpediente } from "../services/documentos/construirExpedienteHidrologicoMinimo.js";\n`;

assert.equal(
  texto.includes("const textoExpediente = ["),
  true,
  "Debe existir textoExpediente."
);

assert.equal(
  texto.includes("## 6. Resumen Q-5 auditado"),
  true,
  "Debe existir el bloque operativo ## 6."
);

assert.equal(
  texto.includes("...tablaQ5Markdown"),
  true,
  "Debe existir tablaQ5Markdown operativo."
);

const marcadorDiagnostico = "lineasResumenQ5AuditadoDelegadoDiagnostico";

assert.equal(
  texto.includes(marcadorDiagnostico),
  false,
  "La integración diagnóstica Resumen Q-5 auditado ya existe. No duplicar."
);

if (!texto.includes(nombreHelper)) {
  texto = importStandalone + texto;
}

const patronTextoExpediente = "            const textoExpediente = [";

assert.equal(
  texto.includes(patronTextoExpediente),
  true,
  "Debe encontrarse el punto de inserción antes de textoExpediente."
);

const bloqueDiagnostico = `            const lineasResumenQ5AuditadoDelegadoDiagnostico =
              construirLineasResumenQ5AuditadoExpediente({
                tablaQ5Markdown
              });

            const lineasResumenQ5AuditadoOperativoDiagnostico = [
              "## 6. Resumen Q-5 auditado",
              "Estado general: diagnóstico no adoptivo.",
              "SCS Unit Hydrograph: candidato principal de referencia.",
              "SCS Mod.: variante ajustable.",
              "Snyder, Williams &amp; Hann y Clark IUH: métodos comparativos/referenciales.",
              "Masa y volumen: controlados frente a referencia física.",
              "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.",
              "",
              "Tabla Q-5 auditada:",
              ...tablaQ5Markdown,
              "",
              ""
            ];

            const hayBrechaResumenQ5AuditadoDiagnostico =
              lineasResumenQ5AuditadoDelegadoDiagnostico.length !==
                lineasResumenQ5AuditadoOperativoDiagnostico.length ||
              lineasResumenQ5AuditadoDelegadoDiagnostico.some(
                (linea, indice) =>
                  linea !== lineasResumenQ5AuditadoOperativoDiagnostico[indice]
              );

            if (hayBrechaResumenQ5AuditadoDiagnostico) {
              console.warn("[expediente] Brecha diagnóstico Resumen Q-5 auditado delegado vs operativo", {
                delegado: lineasResumenQ5AuditadoDelegadoDiagnostico,
                operativo: lineasResumenQ5AuditadoOperativoDiagnostico
              });
            }

`;

texto = texto.replace(
  patronTextoExpediente,
  bloqueDiagnostico + patronTextoExpediente
);

fs.writeFileSync(rutaComparador, texto.trimEnd() + "\n", "utf8");

console.log("APLICACION_OT_0177_DIAGNOSTICA_RESUMEN_Q5_AUDITADO_OK");
