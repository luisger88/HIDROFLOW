// OT-0088B — Helper puro para validar sección de diagnóstico temporal Q(t) en expediente.
// Recibe texto final del expediente. No recibe qSeries, no recalcula métricas,
// no reconstruye Q(t), no interpola y no adopta métodos.

const SECCIONES_OBLIGATORIAS_DIAGNOSTICO_TEMPORAL_QT = [
  "## Diagnóstico temporal Q(t) no adoptivo",
  "### Alcance",
  "### Síntesis ejecutiva temporal",
  "### Lectura temporal por método",
  "### Restricciones de interpretación",
  "### Dictamen"
];

const ADVERTENCIAS_OBLIGATORIAS_DIAGNOSTICO_TEMPORAL_QT = [
  "Diagnóstico temporal no adoptivo",
  "No selecciona automáticamente ningún método",
  "No levanta el estado global No coherente",
  "No reemplaza revisión hidrológica profesional",
  "No modifica Qp, Tp, Volumen ni Q(t)",
  "No reconstruye Q(t) ni interpola series"
];

const TOKENS_INVALIDOS_DIAGNOSTICO_TEMPORAL_QT = [
  "undefined",
  "null",
  "NaN",
  "[object Object]"
];

function normalizarTexto(texto) {
  return String(texto ?? "");
}

function buscarFaltantes(texto, elementos) {
  return elementos.filter((elemento) => !texto.includes(elemento));
}

export default function validarSeccionDiagnosticoTemporalQt(textoExpediente) {
  const texto = normalizarTexto(textoExpediente);

  if (!texto.trim()) {
    return {
      ok: false,
      faltantes: [...SECCIONES_OBLIGATORIAS_DIAGNOSTICO_TEMPORAL_QT],
      advertenciasFaltantes: [...ADVERTENCIAS_OBLIGATORIAS_DIAGNOSTICO_TEMPORAL_QT],
      tokensInvalidos: [],
      mensaje: "El expediente está vacío o no es texto válido."
    };
  }

  const faltantes = buscarFaltantes(
    texto,
    SECCIONES_OBLIGATORIAS_DIAGNOSTICO_TEMPORAL_QT
  );

  const advertenciasFaltantes = buscarFaltantes(
    texto,
    ADVERTENCIAS_OBLIGATORIAS_DIAGNOSTICO_TEMPORAL_QT
  );

  const tokensInvalidos = TOKENS_INVALIDOS_DIAGNOSTICO_TEMPORAL_QT.filter((token) =>
    texto.includes(token)
  );

  const ok =
    faltantes.length === 0 &&
    advertenciasFaltantes.length === 0 &&
    tokensInvalidos.length === 0;

  return {
    ok,
    faltantes,
    advertenciasFaltantes,
    tokensInvalidos,
    mensaje: ok
      ? "Sección de diagnóstico temporal Q(t) válida en expediente exportable."
      : "La sección de diagnóstico temporal Q(t) presenta faltantes o tokens inválidos."
  };
}