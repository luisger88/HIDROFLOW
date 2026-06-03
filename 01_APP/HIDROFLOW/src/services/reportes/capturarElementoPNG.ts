import html2canvas from "html2canvas";

/**
 * Captura un elemento del DOM como PNG (base64)
 */
export async function capturarElementoPNG(
  elementId: string
): Promise<string> {

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`No se encontró el elemento ${elementId}`);
  }

  const canvas = await html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: 2
  });

  return canvas.toDataURL("image/png");
}
