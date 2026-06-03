import html2pdf from "html2pdf.js";
import { InformeHidrologico } from "./generarInformeHidrologico";
import { renderInformeHTML } from "./renderInformeHTML";

/**
 * Exporta el Informe Hidrológico a PDF
 * (HTML → PDF)
 */
export function exportarInformePDF(
  informe: InformeHidrologico
): void {

  // Render HTML técnico
  const html = renderInformeHTML(informe);

  // Contenedor temporal
  const container = document.createElement("div");
  container.innerHTML = html;

  // ⚠️ html2pdf no tiene typings confiables
  const html2pdfAny = html2pdf as any;

  // Opciones PDF
  const options = {
    margin: 10,
    filename: `Informe_Hidrologico_${informe.cuenca}.pdf`,
    image: { type: "jpeg", quality: 0.95 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    }
  };

  // Exportar
  html2pdfAny()
    .from(container)
    .set(options)
    .save();
}