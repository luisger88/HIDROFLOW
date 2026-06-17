import fs from "fs";
import path from "path";

const objetivos = [
  "01_APP/HIDROFLOW/src/services/documentos/construirExpedienteHidrologicoMinimo.js",
  "01_APP/HIDROFLOW/src/components/ComparadorMultiMetodo.jsx"
];

const patrones = [
  "restric",
  "advert",
  "nota",
  "cautela",
  "no adop",
  "no competente",
  "referencial",
  "contraste",
  "validación",
  "auditor",
  "criterio",
  "limit",
  "no implica",
  "sin modificar",
  "Q-5",
  "Método Racional",
  "diagnóstico"
];

const resultados = [];

for (const archivo of objetivos) {
  if (!fs.existsSync(archivo)) {
    resultados.push({
      archivo,
      existe: false,
      totalCoincidencias: 0,
      coincidencias: []
    });
    continue;
  }

  const contenido = fs.readFileSync(archivo, "utf8");
  const lineas = contenido.split(/\r?\n/);
  const coincidencias = [];

  lineas.forEach((linea, idx) => {
    const normalizada = linea.toLowerCase();

    const patronesDetectados = patrones.filter((patron) =>
      normalizada.includes(patron.toLowerCase())
    );

    if (patronesDetectados.length > 0) {
      coincidencias.push({
        linea: idx + 1,
        patrones: patronesDetectados,
        texto: linea.trim()
      });
    }
  });

  resultados.push({
    archivo,
    existe: true,
    totalCoincidencias: coincidencias.length,
    coincidencias
  });
}

const resumen = {
  auditoria: "OT-0216",
  objetivo: "Auditoría documental de restricciones y advertencias del expediente",
  archivosRevisados: resultados.length,
  archivosExistentes: resultados.filter((r) => r.existe).length,
  totalCoincidencias: resultados.reduce((acc, r) => acc + (r.totalCoincidencias || 0), 0),
  modificaCodigoAplicacion: false,
  modificaMotor: false,
  modificaTextoExpediente: false,
  resultados
};

const salida = [
  "# OT-0216B — Auditoría documental de restricciones y advertencias del expediente",
  "",
  "## Resumen",
  "",
  "```json",
  JSON.stringify({
    auditoria: resumen.auditoria,
    archivosRevisados: resumen.archivosRevisados,
    archivosExistentes: resumen.archivosExistentes,
    totalCoincidencias: resumen.totalCoincidencias,
    modificaCodigoAplicacion: resumen.modificaCodigoAplicacion,
    modificaMotor: resumen.modificaMotor,
    modificaTextoExpediente: resumen.modificaTextoExpediente
  }, null, 2),
  "```",
  "",
  "## Alcance",
  "",
  "Esta auditoría solo localiza referencias documentales existentes relacionadas con restricciones, advertencias, notas, criterios de cautela y mensajes de no adopción.",
  "",
  "No modifica archivos fuente.",
  "",
  "## Archivos revisados",
  "",
  ...resultados.map((r) => `- ${r.archivo} — existe: ${r.existe}; coincidencias: ${r.totalCoincidencias || 0}`),
  "",
  "## Coincidencias detectadas",
  ""
];

for (const resultado of resultados) {
  salida.push(`### ${resultado.archivo}`);
  salida.push("");

  if (!resultado.existe) {
    salida.push("Archivo no encontrado.");
    salida.push("");
    continue;
  }

  if (!resultado.coincidencias.length) {
    salida.push("No se detectaron coincidencias con los patrones definidos.");
    salida.push("");
    continue;
  }

  for (const item of resultado.coincidencias) {
    salida.push(`- Línea ${item.linea}: patrones [${item.patrones.join(", ")}]`);
    salida.push("");
    salida.push("```text");
    salida.push(item.texto);
    salida.push("```");
    salida.push("");
  }
}

salida.push("## Lectura técnica");
salida.push("");
salida.push("- La auditoría identificó referencias existentes relacionadas con restricciones, advertencias, notas, criterios o mensajes de cautela.");
salida.push("- La auditoría no implementa cambios.");
salida.push("- La auditoría no modifica `textoExpediente`.");
salida.push("- La auditoría no modifica `ComparadorMultiMetodo.jsx`.");
salida.push("- La auditoría no modifica `construirExpedienteHidrologicoMinimo.js`.");
salida.push("");
salida.push("## Decisión");
salida.push("");
salida.push("Cualquier consolidación o ajuste posterior debe realizarse en una OT independiente, después de revisar esta evidencia.");
salida.push("");
salida.push("## Próximo frente recomendado");
salida.push("");
salida.push("`OT-0217 — Decisión sobre consolidación documental de restricciones y advertencias del expediente`");

const rutaSalida = "00_ADMIN/bitacora/OT-0216/OT-0216B_auditoria_documental_restricciones_advertencias_expediente.md";
fs.mkdirSync(path.dirname(rutaSalida), { recursive: true });
fs.writeFileSync(rutaSalida, salida.join("\n"), "utf8");

console.log("AUDITORIA_OT_0216_RESTRICCIONES_ADVERTENCIAS_OK");
console.log(JSON.stringify({
  archivosRevisados: resumen.archivosRevisados,
  archivosExistentes: resumen.archivosExistentes,
  totalCoincidencias: resumen.totalCoincidencias,
  salida: rutaSalida
}, null, 2));
