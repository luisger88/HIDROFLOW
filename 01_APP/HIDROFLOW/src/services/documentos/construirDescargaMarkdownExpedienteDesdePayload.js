import construirMarkdownExpedienteDesdePayload from "./construirMarkdownExpedienteDesdePayload.js";
import prepararDescargaMarkdownExpediente from "./prepararDescargaMarkdownExpediente.js";
import { formatTc } from "../../utils/formatters";

export default function construirDescargaMarkdownExpedienteDesdePayload(payload = {}) {
  const markdown = construirMarkdownExpedienteDesdePayload(payload);

  const nombreCuenca =
    payload?.cuenca?.nombre ||
    payload?.cuenca?.puntoSalida?.id ||
    "expediente_hidrologico_minimo";

  return prepararDescargaMarkdownExpediente({
    markdown,
    nombreBase: nombreCuenca
  });
}
