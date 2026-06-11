import adaptarExpedienteDocumental from "../src/services/documentos/adaptarExpedienteDocumental.js";

const textoExpedienteValido = [
  "# Expediente hidrológico mínimo — Cuenca activa",
  "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
  "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
  "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
  "",
  "## 1. Identificación",
  "Cuenca: La Iguaná PC_80",
  "",
  "## 2. Parámetros base",
  "Área: 46.8516 km²",
  "",
  "## 3. Contexto Tc / Tr / roles hidrológicos",
  "Tc comparador: 114.2 min",
  "",
  "## 4. Volumen de referencia",
  "Volumen esperado: 2654251 m³",
  "",
  "## 5. Escenario Q-Tr activo — control de trazabilidad",
  "Estado: publicado",
  "",
  "## 6. Resumen Q-5 auditado",
  "Tabla Q-5 auditada:",
  "| Método | Qp | Tp | Volumen | Estado | Dictamen |",
  "|---|---:|---:|---:|---|---|",
  "| SCS Unit Hydrograph | 184.03 m³/s | 210 min | 2654250.90 m³ | consistente | candidato principal |",
  "",
  "## 7. Método Racional — contraste global independiente",
  "Uso: contraste global independiente de caudal pico.",
  "",
  "## 8. Contraste Q-5 vs Método Racional",
  "Q-5 y Método Racional son complementarios, pero no equivalentes.",
  "",
  "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  "Relación volumen Q-5 / volumen esperado: 1.000x",
  "",
  "## 10. Validación interna del expediente exportado",
  "Control de tokens inválidos: activo.",
  "",
  "## 11. Sello técnico de generación",
  "Herramienta: HidroFlow.",
  "Tipo de salida: Expediente hidrológico mínimo.",
  "",
  "## 12. Restricciones y advertencias técnicas",
  "- No usar como valor adoptivo final sin revisión profesional.",
  "- No se modifica el motor hidrológico.",
  "- No se recalculan hidrogramas.",
  "- No se alteran Qp, Tp, Volumen ni Q(t)."
].join("\n");

const fallar = (mensaje, detalle = null) => {
  console.error("VALIDACION_OT0060F_FALLIDA:", mensaje);
  if (detalle !== null) {
    console.error(detalle);
  }
  process.exit(1);
};

const afirmar = (condicion, mensaje, detalle = null) => {
  if (!condicion) {
    fallar(mensaje, detalle);
  }
};

const resultadoNoString = adaptarExpedienteDocumental(12345);
afirmar(resultadoNoString.ok === false, "La entrada no string debe fallar.", resultadoNoString);
afirmar(resultadoNoString.errores.includes("ENTRADA_NO_STRING"), "Debe reportar ENTRADA_NO_STRING.", resultadoNoString);

const resultadoVacio = adaptarExpedienteDocumental("");
afirmar(resultadoVacio.ok === false, "La entrada vacía debe fallar.", resultadoVacio);
afirmar(resultadoVacio.errores.includes("ENTRADA_VACIA"), "Debe reportar ENTRADA_VACIA.", resultadoVacio);

const resultadoTokensInvalidos = adaptarExpedienteDocumental(textoExpedienteValido + "\nNaN");
afirmar(resultadoTokensInvalidos.ok === false, "Debe fallar cuando detecta tokens inválidos.", resultadoTokensInvalidos);
afirmar(resultadoTokensInvalidos.errores.includes("TOKENS_INVALIDOS"), "Debe reportar TOKENS_INVALIDOS.", resultadoTokensInvalidos);

const resultadoValido = adaptarExpedienteDocumental(textoExpedienteValido, {
  fuenteExpediente: "prueba-ot-0060f",
  origenPlantilla: "OT-0060F",
  commitFuente: "f7a6751"
});

afirmar(resultadoValido.ok === true, "El expediente válido debe aprobar.", resultadoValido);
afirmar(resultadoValido.titulo === "Expediente hidrológico mínimo — Cuenca activa", "Debe extraer título.", resultadoValido);
afirmar(resultadoValido.estadoTecnico === "CONSISTENTE CON ADVERTENCIAS.", "Debe extraer estado técnico.", resultadoValido);
afirmar(Array.isArray(resultadoValido.secciones), "Debe devolver secciones como arreglo.", resultadoValido);
afirmar(resultadoValido.secciones.length === 12, "Debe separar 12 secciones.", resultadoValido.secciones);
afirmar(resultadoValido.secciones.some((seccion) => seccion.tipo === "tabla_q5"), "Debe clasificar sección Q-5.", resultadoValido.secciones);
afirmar(resultadoValido.secciones.some((seccion) => seccion.tipo === "metodo_racional"), "Debe clasificar Método Racional.", resultadoValido.secciones);
afirmar(resultadoValido.secciones.some((seccion) => seccion.tipo === "restricciones"), "Debe clasificar restricciones.", resultadoValido.secciones);
afirmar(resultadoValido.restricciones.length >= 4, "Debe extraer restricciones.", resultadoValido.restricciones);
afirmar(resultadoValido.trazabilidad.fuenteExpediente === "prueba-ot-0060f", "Debe conservar fuenteExpediente.", resultadoValido.trazabilidad);
afirmar(resultadoValido.trazabilidad.origenPlantilla === "OT-0060F", "Debe conservar origenPlantilla.", resultadoValido.trazabilidad);

console.log("OT-0060F OK — Adaptador documental puro validado contractualmente.");
console.log(JSON.stringify({
  ok: resultadoValido.ok,
  titulo: resultadoValido.titulo,
  estadoTecnico: resultadoValido.estadoTecnico,
  totalSecciones: resultadoValido.secciones.length,
  totalRestricciones: resultadoValido.restricciones.length,
  trazabilidad: resultadoValido.trazabilidad
}, null, 2));
