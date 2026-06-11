import adaptarExpedienteDocumental from "../src/services/documentos/adaptarExpedienteDocumental.js";

const textoExpedienteRepresentativo = [
  "# Expediente hidrológico mínimo — Cuenca activa",
  "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
  "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
  "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
  "",
  "## 1. Identificación",
  "Cuenca: La Iguaná PC_80",
  "Área: 46.8516 km²",
  "",
  "## 2. Parámetros base",
  "CN efectivo: 86.00",
  "Lluvia efectiva total: 56.65 mm",
  "",
  "## 3. Contexto Tc / Tr / roles hidrológicos",
  "Tc comparador: 114.2 min",
  "Tr global activo: 100 años",
  "",
  "## 4. Volumen de referencia",
  "Volumen esperado: 2654251 m³",
  "Fórmula: Pe(mm) × Área(km²) × 1000.",
  "",
  "## 5. Escenario Q-Tr activo — control de trazabilidad",
  "Estado: publicado",
  "Tr activo: 100 años",
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
  console.error("CONSUMO_OT0061B_FALLIDO:", mensaje);
  if (detalle !== null) console.error(detalle);
  process.exit(1);
};

const afirmar = (condicion, mensaje, detalle = null) => {
  if (!condicion) fallar(mensaje, detalle);
};

const resultado = adaptarExpedienteDocumental(textoExpedienteRepresentativo, {
  fuenteExpediente: "consumo-representativo-ot-0061b",
  origenPlantilla: "OT-0061B",
  commitBase: "2d31efe"
});

afirmar(resultado.ok === true, "El consumo representativo debe aprobar.", resultado);
afirmar(resultado.titulo === "Expediente hidrológico mínimo — Cuenca activa", "Debe extraer título.", resultado);
afirmar(resultado.estadoTecnico === "CONSISTENTE CON ADVERTENCIAS.", "Debe extraer estado técnico.", resultado);
afirmar(resultado.secciones.length === 12, "Debe reconocer 12 secciones.", resultado.secciones);
afirmar(resultado.restricciones.length >= 4, "Debe extraer restricciones.", resultado.restricciones);
afirmar(resultado.secciones.some((seccion) => seccion.tipo === "metodo_racional"), "Debe clasificar Método Racional.", resultado.secciones);
afirmar(resultado.secciones.some((seccion) => seccion.tipo === "consistencia"), "Debe clasificar consistencia cruzada.", resultado.secciones);
afirmar(resultado.trazabilidad.fuenteExpediente === "consumo-representativo-ot-0061b", "Debe conservar trazabilidad.", resultado.trazabilidad);

console.log("OT-0061B OK — Consumo documental representativo validado sin UI.");
console.log(JSON.stringify({
  ok: resultado.ok,
  titulo: resultado.titulo,
  estadoTecnico: resultado.estadoTecnico,
  totalSecciones: resultado.secciones.length,
  totalRestricciones: resultado.restricciones.length,
  tipos: resultado.secciones.map((seccion) => seccion.tipo),
  trazabilidad: resultado.trazabilidad
}, null, 2));
