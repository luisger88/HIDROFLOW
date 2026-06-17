import { construirBloqueRestriccionesAdvertenciasGeneralesExpediente } from "../../01_APP/HIDROFLOW/src/services/documentos/construirBloqueRestriccionesAdvertenciasGeneralesExpediente.js";

function contieneTokenInvalido(lineas) {
  const texto = lineas.join("\n");
  return (
    texto.includes("undefined") ||
    texto.includes("null") ||
    texto.includes("NaN") ||
    texto.includes("[object Object]")
  );
}

function contieneSensibles(lineas) {
  const texto = lineas.join("\n").toLowerCase();
  const sensibles = [
    "q-5",
    "método racional",
    "metodo racional",
    "diagnóstico q(t)",
    "diagnostico q(t)",
    "q(t)",
    "volumen",
    "q-tr",
    "pe",
    "masa",
    "hidrograma",
    "hidrogramas",
    "caudal",
    "caudales",
    "adoptado",
    "adopción",
    "adopcion",
    "validado",
    "aprobado",
    "seleccionado"
  ];

  return sensibles.filter((termino) => texto.includes(termino));
}

function esArregloTexto(lineas) {
  return Array.isArray(lineas) && lineas.every((item) => typeof item === "string");
}

const casos = [
  {
    nombre: "entrada vacia",
    entrada: {},
    esperaTitulo: true
  },
  {
    nombre: "listas generales validas",
    entrada: {
      advertenciasGenerales: [
        "Usar este expediente como apoyo documental.",
        "Revisar resultados sensibles en sus secciones específicas."
      ],
      restriccionesGenerales: [
        "No modifica el motor hidrológico.",
        "No recalcula resultados."
      ],
      alcanceGeneral: "Bloque documental general del expediente.",
      incluirTitulo: true
    },
    esperaTitulo: true
  },
  {
    nombre: "filtrado de terminos sensibles",
    entrada: {
      advertenciasGenerales: [
        "Advertencia general válida.",
        "Q-5 queda validado.",
        "Método Racional queda adoptado.",
        "Volumen aprobado."
      ],
      restriccionesGenerales: [
        "Restricción general válida.",
        "Q-Tr seleccionado.",
        "Pe y masa aprobadas."
      ],
      alcanceGeneral: "Alcance con Q-5 sensible.",
      incluirTitulo: true
    },
    esperaTitulo: true
  },
  {
    nombre: "sin titulo",
    entrada: {
      advertenciasGenerales: ["Advertencia documental general."],
      restriccionesGenerales: ["Restricción documental general."],
      alcanceGeneral: "Alcance general.",
      incluirTitulo: false
    },
    esperaTitulo: false
  },
  {
    nombre: "entradas no arreglo",
    entrada: {
      advertenciasGenerales: "advertencia textual no arreglo",
      restriccionesGenerales: { texto: "restriccion no arreglo" },
      alcanceGeneral: "Alcance general.",
      incluirTitulo: true
    },
    esperaTitulo: true
  }
];

const resultados = casos.map((caso) => {
  const salida1 = construirBloqueRestriccionesAdvertenciasGeneralesExpediente(caso.entrada);
  const salida2 = construirBloqueRestriccionesAdvertenciasGeneralesExpediente(caso.entrada);

  const deterministica = JSON.stringify(salida1) === JSON.stringify(salida2);
  const arregloTexto = esArregloTexto(salida1);
  const tokensInvalidos = contieneTokenInvalido(salida1);
  const sensibles = contieneSensibles(salida1);
  const contieneTitulo = salida1.includes("## Restricciones y advertencias generales del expediente");

  return {
    nombre: caso.nombre,
    arregloTexto,
    deterministica,
    tokensInvalidos,
    sensibles,
    cumpleTitulo: caso.esperaTitulo ? contieneTitulo : !contieneTitulo,
    lineas: salida1.length,
    aprobado:
      arregloTexto &&
      deterministica &&
      !tokensInvalidos &&
      sensibles.length === 0 &&
      (caso.esperaTitulo ? contieneTitulo : !contieneTitulo)
  };
});

const resumen = {
  validacion: "OT-0223",
  helper: "construirBloqueRestriccionesAdvertenciasGeneralesExpediente",
  casos: resultados.length,
  casosAprobados: resultados.filter((r) => r.aprobado).length,
  casosFallidos: resultados.filter((r) => !r.aprobado).length,
  validacionAisladaAprobada: resultados.every((r) => r.aprobado),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false
};

const salida = [
  "# OT-0223B — Validación aislada helper restricciones y advertencias generales del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify(resumen, null, 2),
  "```",
  "",
  "## Casos evaluados",
  ""
];

for (const resultado of resultados) {
  salida.push(`### ${resultado.nombre}`);
  salida.push("");
  salida.push("```json");
  salida.push(JSON.stringify(resultado, null, 2));
  salida.push("```");
  salida.push("");
}

salida.push("## Lectura técnica");
salida.push("");
salida.push("- La validación se ejecutó de forma aislada.");
salida.push("- No se integró el helper al expediente operativo.");
salida.push("- No se modificó `textoExpediente`.");
salida.push("- No se modificó `ComparadorMultiMetodo.jsx`.");
salida.push("- No se modificó `construirExpedienteHidrologicoMinimo.js`.");
salida.push("");
salida.push("## Decisión");
salida.push("");
salida.push(
  resumen.validacionAisladaAprobada
    ? "El helper queda validado de forma aislada para uso documental general futuro."
    : "El helper no debe integrarse hasta corregir los hallazgos detectados."
);
salida.push("");
salida.push("## Próximo frente recomendado");
salida.push("");
salida.push("`OT-0224 — Decisión de integración del helper restricciones y advertencias generales al expediente`");

const rutaSalida = "00_ADMIN/bitacora/OT-0223/OT-0223B_validacion_aislada_helper_restricciones_advertencias_generales_expediente.md";

await import("fs").then((fs) => {
  fs.mkdirSync("00_ADMIN/bitacora/OT-0223", { recursive: true });
  fs.writeFileSync(rutaSalida, salida.join("\n"), "utf8");
});

console.log("VALIDACION_OT_0223_HELPER_RESTRICCIONES_ADVERTENCIAS_OK");
console.log(JSON.stringify(resumen, null, 2));
