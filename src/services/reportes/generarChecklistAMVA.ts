import { InformeHidrologico } from "./generarInformeHidrologico";

export type ItemChecklist = {
  criterio: string;
  cumple: boolean;
  observacion: string;
};

export function generarChecklistAMVA(
  informe: InformeHidrologico
): ItemChecklist[] {

  const e = informe.estadoNormativo;

  return [
    {
      criterio: "Evaluación hidrológica con Tr normativo",
      cumple: e.Tr_normativo >= 100,
      observacion: `Se evalúa Tr = ${e.Tr_normativo} años conforme a autoridad ambiental.`
    },
    {
      criterio: "Diferenciación entre caudal generado y caudal descargado",
      cumple: true,
      observacion: "El informe distingue explícitamente condición post‑urbana y pre‑urbana."
    },
    {
      criterio: "Determinación del régimen natural (pre‑urbano)",
      cumple: true,
      observacion: "Se calcula caudal pre‑urbano como referencia ambiental."
    },
    {
      criterio: "Implementación de sistema SAR",
      cumple: e.aplicaSAR,
      observacion: e.aplicaSAR
        ? "Se implementa SAR conforme a GT‑AS‑004."
        : "No aplica SAR por ausencia de urbanización."
    },
    {
      criterio: "Limitación del caudal descargado al régimen natural",
      cumple: e.aplicaSAR,
      observacion: e.aplicaSAR
        ? "Q_descarga = Q_pre‑urbano."
        : "Descarga corresponde al régimen natural."
    },
    {
      criterio: "No incremento del impacto hidrológico aguas abajo",
      cumple: true,
      observacion: "La regulación garantiza no alteración del régimen natural."
    }
  ];
}