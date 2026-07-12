const format = (val, dec) =>
  Number.isFinite(Number(val))
    ? Number(val).toFixed(dec)
    : "—";

export const formatTc = (val) => format(val, 4);
export const formatQ = (val) => format(val, 3);
export const formatArea = (val) => format(val, 2);
export const formatCN = (val) => format(val, 0);
export const formatPendiente = (val) => format(val, 4);
export const formatVolumen = (val) => format(val, 2);
