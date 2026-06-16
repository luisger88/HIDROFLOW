import assert from "node:assert/strict";
import { construirLineasResumenQ5AuditadoExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js";

const residuos = ["undefined", "null", "NaN", "[object Object]"];

function validarSinResiduos(nombreCaso, texto) {
  const detectados = residuos.filter((token) => texto.includes(token));

  assert.equal(
    detectados.length,
    0,
    `${nombreCaso}: no debe contener residuos técnicos: ${detectados.join(", ")}`
  );
}

function validarEstructura(nombreCaso, lineas) {
  assert.equal(Array.isArray(lineas), true, `${nombreCaso}: debe retornar arreglo`);
  assert.equal(lineas[0], "## 6. Resumen Q-5 auditado", `${nombreCaso}: encabezado exacto`);
  assert.equal(lineas[1], "Estado general: diagnóstico no adoptivo.", `${nombreCaso}: estado general exacto`);
  assert.equal(lineas[2], "SCS Unit Hydrograph: candidato principal de referencia.", `${nombreCaso}: SCS exacto`);
  assert.equal(lineas[3], "SCS Mod.: variante ajustable.", `${nombreCaso}: SCS Mod exacto`);
  assert.equal(lineas[4], "Snyder, Williams & Hann y Clark IUH: métodos comparativos/referenciales.", `${nombreCaso}: métodos exactos`);
  assert.equal(lineas[5], "Masa y volumen: controlados frente a referencia física.", `${nombreCaso}: masa volumen exacto`);
  assert.equal(lineas[6], "Qp y Tp: sujetos a revisión temporal antes de adopción técnica.", `${nombreCaso}: Qp Tp exacto`);
  assert.equal(lineas[7], "", `${nombreCaso}: línea vacía interna`);
  assert.equal(lineas[8], "Tabla Q-5 auditada:", `${nombreCaso}: encabezado tabla exacto`);
  assert.equal(lineas.at(-1), "", `${nombreCaso}: última línea vacía`);
  assert.equal(lineas.at(-2), "", `${nombreCaso}: penúltima línea vacía`);
}

function validarCaso(nombreCaso, entrada, esperados) {
  const lineas = construirLineasResumenQ5AuditadoExpediente(entrada);
  const texto = lineas.join("\n");

  validarEstructura(nombreCaso, lineas);
  validarSinResiduos(nombreC "tabla con booleanos",
    entrada: {
      tablaQ5Markdown: [true, false, "fila válida"]
    },
    esperados: ["fila válida"]
  },
  {
    nombre: "tabla con objetos",
    entrada: {
      tablaQ5Markdown: [{ valor: 1 }, { valor: 2 }, "fila válida"]
    },
    esperados: ["fila válida"]
  },
  {
    nombre: "tabla con strings vacios",
    entrada: {
      tablaQ5Markdown: ["", "   ", "fila válida"]
    },
    esperados: ["fila válida"]
  },
  {
    nombre: "tabla con NaN",
    entrada: {
      tablaQ5Markdown: [Number.NaN, "fila válida"]
    },
    esperados: ["fila válida"]
  },
  {
    nombre: "tabla mixta",
    entrada: {
      tablaQ5Markdown: [
        "",
        null,
        undefined,
        Number.NaN,
        { valor: 1 },
        true,
        false,
        "| Método | Qp | Tp | Volumen |",
        "| SCS | 184.03 | 210 | 2654250.90 |"
      ]
    },
    esperados: [
      "| Método | Qp | Tp | Volumen |",
      "| SCS | 184.03 | 210 | 2654250.90 |"
    ]
  }
];

for (const caso of casos) {
  validarCaso(caso.nombre, caso.entrada, caso.esperados);
}

console.log("VALIDACION_OT_0175_HELPER_RESUMEN_Q5_AUDITADO_REFORZADA_OK");
