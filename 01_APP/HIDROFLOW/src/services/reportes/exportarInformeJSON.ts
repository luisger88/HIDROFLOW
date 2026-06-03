import { InformeHidrologico } from "./generarInformeHidrologico";

/**
 * Exporta un JSON completo del estudio hidrológico
 * (snapshot del modelo – interoperabilidad / agentes / versionado)
 */
export function exportarInformeJSON(
  informe: InformeHidrologico
): void {

  const json = {
    metadata: {
      producto: "HidroFlow",
      version: "1.0",
      fecha: informe.fecha,
      normativa: ["GT-AS-004"],
      tipo_entrega: "Informe Hidrológico Técnico"
    },

    cuenca: {
      nombre: informe.cuenca,
      parametros: informe.parametros
    },

    resultados_base: informe.resultadosBase,

    sensibilidades: {
      Tc: informe.sensibilidadTc,
      AMC: informe.sensibilidadAMC
    },

    comparacion: informe.comparacion,

    SAR: informe.SAR,

    conclusiones: {
      tecnica: informe.conclusion,
      SAR: informe.conclusionSAR
    },

    // extensible (por ejemplo para Ollama o backend)
    extensiones: {
      graficos: (informe as any).graficos ?? null,
      hietograma: (informe as any).hietograma ?? null
    }
  };

  const blob = new Blob(
    [JSON.stringify(json, null, 2)],
    { type: "application/json;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `HidroFlow_${informe.cuenca}_Informe.json`;
  link.click();

  URL.revokeObjectURL(url);
}