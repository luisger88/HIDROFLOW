const texto = (valor, defecto = "NO DETECTADO") =>
  valor === undefined || valor === null || valor === "" ? defecto : String(valor);

const numero = (valor, decimales = 2) => {
  if (valor === undefined || valor === null || valor === "") return "NO DETECTADO";
  return Number.isFinite(Number(valor))
    ? Number(valor).toLocaleString("es-CO", { maximumFractionDigits: decimales })
    : "NO DETECTADO";
};

export default function construirMarkdownExpedienteDesdePayload(payload = {}) {
  const ratio = payload?.controlConsistencia?.ratioVolumetrico;

  return [
    "# Expediente Hidrológico Mínimo — Corte Funcional Exportable",
    "",
    "## 1. Cuenca",
    "",
    `Nombre: ${texto(payload?.cuenca?.nombre)}`,
    `Punto de salida: ${texto(payload?.cuenca?.puntoSalida?.id)}`,
    `Latitud: ${texto(payload?.cuenca?.puntoSalida?.lat)}`,
    `Longitud: ${texto(payload?.cuenca?.puntoSalida?.lon)}`,
    `Cota salida: ${numero(payload?.cuenca?.cotaSalidaMsnm)} msnm`,
    `Cota alta: ${numero(payload?.cuenca?.cotaAltaMsnm)} msnm`,
    "",
    "## 2. Geomorfometría",
    "",
    `Área: ${numero(payload?.geomorfometria?.areaKm2, 4)} km²`,
    `Longitud cauce: ${numero(payload?.geomorfometria?.longitudCauceKm, 3)} km`,
    `Desnivel: ${numero(payload?.geomorfometria?.desnivelM, 2)} m`,
    `Pendiente cauce: ${numero(payload?.geomorfometria?.pendienteCaucePorcentaje, 2)} %`,
    "",
    "## 3. Lluvia y abstracción",
    "",
    `Estación IDF/EPM: ${texto(payload?.lluviaYAbstraccion?.estacionActiva)}`,
    `IDF k: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.k)}`,
    `IDF n: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.n)}`,
    `IDF c: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.c)}`,
    `Condición AMC/SIATA: ${texto(payload?.lluviaYAbstraccion?.condicionAMC)}`,
    `CN base: ${texto(payload?.lluviaYAbstraccion?.cnBase)}`,
    `CN ajustado: ${texto(payload?.lluviaYAbstraccion?.cnAjustado)}`,
    `CN efectivo: ${texto(payload?.lluviaYAbstraccion?.cnEfectivo)}`,
    `Pe total: ${numero(payload?.lluviaYAbstraccion?.peTotalMm, 2)} mm`,
    "",
    "## 4. Tiempo de concentración",
    "",
    `Tc sugerido: ${numero(payload?.tiempoConcentracion?.tcSugeridoMinutos, 2)} min`,
    `Método de ponderación: ${texto(payload?.tiempoConcentracion?.metodoPonderacion)}`,
    `Métodos excluidos: ${(payload?.tiempoConcentracion?.metodosExcluidos ?? []).join(", ") || "NO DETECTADO"}`,
    "",
    "## 5. Escenario Q-Tr activo",
    "",
    `Tr activo: ${numero(payload?.escenarioQTrActivo?.periodoRetornoTrAnios, 0)} años`,
    `Estado: ${texto(payload?.escenarioQTrActivo?.estado)}`,
    `Caudal de diseño Q-Tr: ${numero(payload?.escenarioQTrActivo?.caudalDisenoM3s, 2)} m³/s`,
    "",
    "## 6. Hidrografía principal Q-5",
    "",
    `Método principal: ${texto(payload?.hidrografiaQ5?.metodoPrincipal)}`,
    `Qp: ${numero(payload?.hidrografiaQ5?.caudalPicoM3s, 2)} m³/s`,
    `Tp: ${numero(payload?.hidrografiaQ5?.tiempoPicoMinutos, 0)} min`,
    `Volumen integrado: ${numero(payload?.hidrografiaQ5?.volumenIntegradoM3, 2)} m³`,
    "",
    "## 7. Método Racional — contraste no adoptivo",
    "",
    `Q racional: ${numero(payload?.contrasteRacional?.caudalPicoM3s, 2)} m³/s`,
    `Adoptivo: ${payload?.contrasteRacional?.esAdoptivo === true ? "sí" : "no"}`,
    "",
    "## 8. Control de consistencia volumétrica",
    "",
    `Volumen esperado Pe × Área: ${numero(payload?.controlConsistencia?.volumenEsperadoTeoricoM3, 2)} m³`,
    `Volumen integrado Q-5: ${numero(payload?.controlConsistencia?.volumenIntegradoQ5M3, 2)} m³`,
    `Ratio Vol Q-5 / Vol esperado: ${Number.isFinite(Number(ratio)) ? Number(ratio).toFixed(6) : "NO DETECTADO"}`,
    `Estado: ${texto(payload?.controlConsistencia?.estadoConsistencia)}`,
    "",
    "## 9. Diagnóstico Q(t) no adoptivo",
    "",
    `Filas morfológicas: ${(payload?.diagnosticoQt?.filasMorfologicas ?? []).length}`,
    `Filas forma: ${(payload?.diagnosticoQt?.filasForma ?? []).length}`,
    `Filas riesgo: ${(payload?.diagnosticoQt?.filasRiesgo ?? []).length}`,
    `Síntesis riesgo: ${texto(payload?.diagnosticoQt?.sintesisRiesgo)}`,
    `Adoptivo: ${payload?.diagnosticoQt?.esAdoptivo === true ? "sí" : "no"}`,
    "",
    "## 10. Lectura de cierre",
    "",
    "Este expediente exportable permite revisar la trazabilidad mínima del caso, incluyendo el balance Pe × Área frente al volumen integrado Q-5.",
    ""
  ].join("\n");
}

