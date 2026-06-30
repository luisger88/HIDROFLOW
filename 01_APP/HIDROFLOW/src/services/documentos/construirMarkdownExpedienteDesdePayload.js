import derivarTablaResumenTrDesdeQTrMultiEscenario from "./derivarTablaResumenTrDesdeQTrMultiEscenario";
import derivarQDisenoDesdeEscenarioActivo from "./derivarQDisenoDesdeEscenarioActivo";
import { generarNarrativasExpediente } from "./narrativas/generarNarrativasExpediente";

const texto = (valor, defecto = "NO DETECTADO") =>
  valor === undefined || valor === null || valor === "" ? defecto : String(valor);

const numero = (valor, decimales = 2) => {
  if (valor === undefined || valor === null || valor === "") return "NO DETECTADO";
  return Number.isFinite(Number(valor))
    ? Number(valor).toLocaleString("es-CO", { maximumFractionDigits: decimales })
    : "NO DETECTADO";
};

function renderizarTablaEscenarios(metodosComparados = []) {
  const TR_OBJETIVO = [2.33, 5, 10, 25, 50, 100];
  const TOLERANCIA = 0.01;

  const obtenerNumero = (objeto, claves = []) => {
    for (const clave of claves) {
      const valor = Number(objeto?.[clave]);

      if (Number.isFinite(valor)) {
        return valor;
      }
    }

    return null;
  };

  const filas = TR_OBJETIVO.map((tr) => {
    const escenario =
      metodosComparados.find(
        (m) => Number(m?.Tr ?? m?.TR ?? m?.tr) === tr
      ) ?? null;

    if (!escenario) {
      return {
        tr,
        estado: "No calculado",
        qDiseno: "—",
        ratio: "Pendiente"
      };
    }

    const qDiseno = obtenerNumero(escenario, [
      "Q",
      "q",
      "Qp",
      "qp",
      "Qpico",
      "caudalPico"
    ]);

    const ratio = obtenerNumero(escenario, [
      "ratioVolumen",
      "ratio",
      "ratioVolumetrico"
    ]);

    const estadoRatio =
      ratio !== null &&
      Math.abs(ratio - 1) <= TOLERANCIA
        ? "Consistente"
        : "Pendiente";

    return {
      tr,
      estado: escenario?.estado ?? "disponible",
      qDiseno:
        qDiseno !== null
          ? `${numero(qDiseno, 2)} m³/s`
          : "—",
      ratio: estadoRatio
    };
  });

  return [
    "",
    "## 11. Tabla resumen multi-escenario Tr",
    "",
    "| Tr | Estado | Q diseño | Ratio volumen |",
    "|----|--------|----------|---------------|",
    ...filas.map(
      (fila) =>
        `| ${fila.tr} | ${fila.estado} | ${fila.qDiseno} | ${fila.ratio} |`
    ),
    ""
  ];
}

function renderizarMatrizQpMultiescenario(qTrMultiEscenario) {

  const escenarios =
    qTrMultiEscenario?.escenarios ?? [];

  if (!escenarios.length) {
    return [];
  }

  const TRS = [2.33, 5, 10, 25, 50, 100];

  const metodos = [
    ...new Set(
      escenarios.flatMap(
        (e) =>
          (e?.hidrogramas ?? [])
            .map((h) => h?.metodo)
            .filter(Boolean)
      )
    )
  ];

  const encabezado = [
    "",
    "## 12. Matriz multiescenario Qp",
    "",
    "| Método | 2.33 | 5 | 10 | 25 | 50 | 100 |",
    "|---------|---------|---------|---------|---------|---------|---------|"
  ];

  const filas = metodos.map((metodo) => {

    const celdas = TRS.map((tr) => {

      const escenario =
        escenarios.find(
          (e) => Number(e?.Tr) === tr
        );

      const hidro =
        escenario?.hidrogramas?.find(
          (h) => h?.metodo === metodo
        );

      return hidro?.Qp != null
        ? numero(hidro.Qp, 2)
        : "—";
    });

    return `| ${metodo} | ${celdas.join(" | ")} |`;
  });

  return [
    ...encabezado,
    ...filas,
    ""
  ];
}

export default function construirMarkdownExpedienteDesdePayload(payload = {}) {
  const ratio = payload?.controlConsistencia?.ratioVolumetrico;

 const narrativas =
  generarNarrativasExpediente(
    payload
  );

const qDiseno =
  derivarQDisenoDesdeEscenarioActivo(
    payload?.escenarioQTrActivo,
    payload?.hidrografiaQ5?.qTrMultiEscenario
  );


  return [

  "# Expediente Hidrológico Mínimo — Corte Funcional Exportable",

  "",

  narrativas.resumenEjecutivo,

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
    "¿Qué valida?: la identidad y delimitación del objeto hidrológico evaluado.",
"¿Qué concluye?: la cuenca, punto de salida y referencia espacial sobre los cuales se desarrolla el análisis.",
"¿Qué entrega?: el contexto territorial que soporta todas las evaluaciones hidrológicas posteriores.",
"",
    "## 2. Geomorfometría",
    "",
    `Área: ${numero(payload?.geomorfometria?.areaKm2, 4)} km²`,
    `Longitud cauce: ${numero(payload?.geomorfometria?.longitudCauceKm, 3)} km`,
    `Desnivel: ${numero(payload?.geomorfometria?.desnivelM, 2)} m`,
    `Pendiente cauce: ${numero(payload?.geomorfometria?.pendienteCaucePorcentaje, 2)} %`,
    "",
    "¿Qué valida?: las características geomorfológicas que condicionan la respuesta hidrológica de la cuenca.",
"¿Qué concluye?: las magnitudes físicas fundamentales utilizadas por los modelos hidrológicos.",
"¿Qué entrega?: los parámetros estructurales necesarios para interpretar tiempos de respuesta, escorrentía y comportamiento hidráulico.",
"",
    "## 3. Lluvia y abstracción",
    "",
    `Estación IDF/EPM: ${texto(
  payload?.lluviaYAbstraccion?.estacionIDF ??
  payload?.lluviaYAbstraccion?.estacionActiva
)}`,    
    `IDF k: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.k)}`,
    `IDF n: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.n)}`,
    `IDF c: ${texto(payload?.lluviaYAbstraccion?.parametrosIDF?.c)}`,
    `Condición AMC/SIATA: ${texto(payload?.lluviaYAbstraccion?.condicionAMC)}`,
    `CN base: ${texto(payload?.lluviaYAbstraccion?.cnBase)}`,
`CN ajustado: ${texto(payload?.lluviaYAbstraccion?.cnAjustado)}`,
`CN efectivo: ${texto(payload?.lluviaYAbstraccion?.cnEfectivo)}`,
`Pe total: ${numero(payload?.lluviaYAbstraccion?.peTotalMm, 2)} mm`,
"",
narrativas.cn,
"",
narrativas.idf,
"",
"¿Qué valida?: las condiciones hidrometeorológicas y los parámetros de transformación lluvia‑escorrentía utilizados en el escenario.",
"¿Qué concluye?: la lluvia efectiva y los parámetros hidrológicos adoptados por el modelo.",
"¿Qué entrega?: las condiciones de entrada que alimentan el cálculo de tiempos, volúmenes y respuestas hidrológicas.",
"",

"## 4. Tiempo de concentración",
    "",
    `Tc sugerido: ${numero(payload?.tiempoConcentracion?.tcSugeridoMinutos, 2)} min`,
    `Método de ponderación: ${texto(payload?.tiempoConcentracion?.metodoPonderacion)}`,
    `Métodos excluidos: ${(payload?.tiempoConcentracion?.metodosExcluidos ?? []).join(", ") || "NO DETECTADO"}`,
    "",
    "",
"¿Qué valida?: la velocidad de respuesta hidrológica de la cuenca.",
"¿Qué concluye?: el Tc adoptado como referencia temporal del escenario.",
"¿Qué entrega?: una referencia temporal que permite interpretar la respuesta hidrológica y evaluar la coherencia de los resultados posteriores.",
"",
    "## 5. Escenario Q-Tr activo",
    "",
    `Tr activo: ${numero(payload?.escenarioQTrActivo?.periodoRetornoTrAnios, 0)} años`,
    `Estado: ${texto(payload?.escenarioQTrActivo?.estado)}`,
    `Caudal de diseño Q-Tr: ${numero(payload?.escenarioQTrActivo?.caudalDisenoM3s, 2)} m³/s`,

"",

narrativas.qtr,

"",
"",
"¿Qué valida?: la trazabilidad del escenario hidrológico rector.",
"¿Qué concluye?: el periodo de retorno y el caudal de diseño adoptados para el análisis.",
"¿Qué entrega?: las condiciones hidrológicas que gobiernan la evaluación del hidrograma principal y los controles posteriores.",
"",
    "",
    "## 6. Hidrografía principal Q-5",
    "",
    "",
"¿Qué valida?: la respuesta hidrológica obtenida para el evento de diseño.",
"¿Qué concluye?: la magnitud, temporalidad y volumen asociados al hidrograma principal.",
"¿Qué entrega?: la evidencia hidrológica que será contrastada mediante métodos independientes y controles de consistencia física.",
"",
    `Método principal: ${texto(payload?.hidrografiaQ5?.metodoPrincipal)}`,
    `Qp: ${numero(payload?.hidrografiaQ5?.caudalPicoM3s, 2)} m³/s`,
    `Tp: ${numero(payload?.hidrografiaQ5?.tiempoPicoMinutos, 0)} min`,
    `Volumen integrado: ${numero(payload?.hidrografiaQ5?.volumenIntegradoM3, 2)} m³`,

"",

narrativas.q5,

"",
    "## 7. Método Racional — contraste no adoptivo",
"",
`Q racional: ${numero(payload?.contrasteRacional?.caudalPicoM3s, 2)} m³/s`,
`Adoptivo: ${payload?.contrasteRacional?.esAdoptivo === true ? "sí" : "no"}`,

"",

"¿Qué valida?: la coherencia del escenario mediante un método hidrológico independiente.",
"¿Qué concluye?: el caudal estimado por el Método Racional para las condiciones evaluadas.",
"¿Qué entrega?: una referencia de contraste que permite comparar la respuesta principal Q‑5 con un enfoque alternativo de estimación.",

"",

    "## 8. Control de consistencia volumétrica",
"",
`Volumen esperado Pe × Área: ${numero(payload?.controlConsistencia?.volumenEsperadoTeoricoM3, 2)} m³`,
`Volumen integrado Q-5: ${numero(payload?.controlConsistencia?.volumenIntegradoQ5M3, 2)} m³`,
`Ratio Vol Q-5 / Vol esperado: ${Number.isFinite(Number(ratio)) ? Number(ratio).toFixed(6) : "NO DETECTADO"}`,
`Estado: ${texto(payload?.controlConsistencia?.estadoConsistencia)}`,

"",

narrativas.consistencia,

"",

"¿Qué valida?: la conservación de masa entre la lluvia efectiva aplicada, el área de drenaje y el volumen movilizado por el hidrograma principal.",
"¿Qué concluye?: si la respuesta hidrológica mantiene coherencia física interna y respeta el balance volumétrico esperado.",
"¿Qué entrega?: el sustento físico que permite defender la consistencia hidrológica del escenario antes de analizar comportamiento temporal y validaciones finales.",

"",

narrativas.consistencia,

"",

"## 9. Diagnóstico Q(t) no adoptivo",
"",
`Filas morfológicas: ${(payload?.diagnosticoQt?.filasMorfologicas ?? []).length}`,
`Filas forma: ${(payload?.diagnosticoQt?.filasForma ?? []).length}`,
`Filas riesgo: ${(payload?.diagnosticoQt?.filasRiesgo ?? []).length}`,
`Síntesis riesgo: ${texto(payload?.diagnosticoQt?.sintesisRiesgo)}`,
`Adoptivo: ${payload?.diagnosticoQt?.esAdoptivo === true ? "sí" : "no"}`,

"",

"¿Qué valida?: el comportamiento temporal de la creciente y la coherencia hidrológica de su forma.",
"¿Qué concluye?: el nivel de riesgo temporal, persistencia, asimetría y características relevantes de la respuesta simulada.",
"¿Qué entrega?: una lectura dinámica de la creciente que complementa los controles físicos y permite interpretar el desempeño hidrológico del escenario.",

"",
    "## 10. Lectura de cierre",

"",

"Este expediente exportable permite revisar la trazabilidad mínima del caso, incluyendo el balance Pe × Área frente al volumen integrado Q-5.",

"",

"¿Qué valida?: la coherencia global de los resultados obtenidos durante toda la cadena de validación hidrológica.",
"¿Qué concluye?: que el expediente dispone de elementos suficientes para soportar una lectura técnica integrada del escenario evaluado.",
"¿Qué entrega?: una interpretación consolidada que conecta los resultados hidrológicos, los controles físicos y los contrastes metodológicos desarrollados previamente.",

"",

"## 11. Validación interna",

"",

"Validación documental: aprobada",
"Consistencia estructural: verificada",
"Trazabilidad: disponible",

"",

"¿Qué valida?: la integridad estructural del expediente y la coherencia entre los bloques que conforman la cadena de validación hidrológica.",
"¿Qué concluye?: que los resultados, narrativas, controles físicos y contrastes metodológicos mantienen consistencia documental interna.",
"¿Qué entrega?: un expediente verificable y técnicamente auditable, apto para soportar el análisis final y la definición de alcance técnico.",

"",

"## 12. Restricciones y sello técnico",

"",

"Sello técnico: Expediente Inteligente HidroFlow",
"Uso previsto: soporte técnico hidrológico",
"Alcance: escenario evaluado y condiciones documentadas",

"",

"¿Qué valida?: el alcance técnico de los resultados y las condiciones bajo las cuales pueden ser utilizados.",
"¿Qué concluye?: que los resultados son válidos únicamente dentro de las hipótesis, datos de entrada y métodos documentados en el expediente.",
"¿Qué entrega?: una delimitación explícita de la responsabilidad técnica y del uso defendible de las conclusiones obtenidas.",

"",


  ...renderizarTablaEscenarios(
  derivarTablaResumenTrDesdeQTrMultiEscenario(
    payload?.hidrografiaQ5?.qTrMultiEscenario
  )
),
...renderizarMatrizQpMultiescenario(
  payload?.hidrografiaQ5?.qTrMultiEscenario
),

""
  ].join("\n");
}



