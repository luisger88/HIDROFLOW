const limpiarNombreArchivo = (valor = "expediente_hidrologico") =>
  String(valor)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-_]+/g, "_")
    .replace(/^_+|_+$/g, "") || "expediente_hidrologico";

export default function prepararDescargaMarkdownExpediente({
  markdown = "",
  nombreBase = "expediente_hidrologico_minimo"
} = {}) {
  const contenido = typeof markdown === "string" ? markdown : "";

  return {
    nombreArchivo: `${limpiarNombreArchivo(nombreBase)}.md`,
    tipoMime: "text/markdown;charset=utf-8",
    contenido
  };
}
