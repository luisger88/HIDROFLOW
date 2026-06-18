function normalizarValorDocumentalParametroBase(valor, fallback = "—") {
  if (valor === undefined || valor === null) {
    return fallback;
  }

  if (typeof valor === "number") {
    return Number.isFinite(valor) ? String(valor) : fallback;
  }

  if (typeof valor === "string") {
    const texto = valor.trim();
    return texto.length > 0 ? texto : fallback;
  }

  return fallback;
}

export function construirBloqueParametrosHidrologicosBaseExpediente({
  CN = "—",
  CN_base = "—",
  CN_efectivo = "—",
  AMC = "—",
  incluirTitulo = true
} = {}) {
  const lineas = [];

  if (incluirTitulo) {
    lineas.push("## 2. Parámetros hidrológicos base");
  }

  lineas.push(`CN: ${normalizarValorDocumentalParametroBase(CN)}`);
  lineas.push(`CN base: ${normalizarValorDocumentalParametroBase(CN_base)}`);
  lineas.push(`CN efectivo: ${normalizarValorDocumentalParametroBase(CN_efectivo)}`);
  lineas.push(`AMC: ${normalizarValorDocumentalParametroBase(AMC)}`);

  return lineas;
}

export default construirBloqueParametrosHidrologicosBaseExpediente;
