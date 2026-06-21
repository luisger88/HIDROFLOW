export default function descargarArchivoMarkdownEnNavegador({
  nombreArchivo = "expediente_hidrologico.md",
  tipoMime = "text/markdown;charset=utf-8",
  contenido = ""
} = {}) {
  if (typeof document === "undefined") {
    return {
      ejecutado: false,
      motivo: "document_no_disponible"
    };
  }

  const blob = new Blob([contenido], { type: tipoMime });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo;
  enlace.style.display = "none";

  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);

  URL.revokeObjectURL(url);

  return {
    ejecutado: true,
    nombreArchivo,
    tipoMime
  };
}
