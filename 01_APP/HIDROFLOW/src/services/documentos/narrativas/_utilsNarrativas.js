export const texto = (v) =>
  v === undefined || v === null || v === ""
    ? "NO DETECTADO"
    : String(v);

export const numero = (v, decimales = 2) => {
  const n = Number(v);
  return Number.isFinite(n)
    ? n.toLocaleString("es-CO", { maximumFractionDigits: decimales })
    : "NO DETECTADO";
};
