let trState = {
  Tr_activo: 25,
  fuente: "default",
  actualizado_en: null
};

const suscriptores = new Set();

export function getTrState() {
  return trState;
}

export function setTrState(parcial = {}) {
  trState = {
    ...trState,
    ...parcial,
    actualizado_en: new Date().toISOString()
  };

  suscriptores.forEach((fn) => fn(trState));
}

export function subscribeTr(fn) {
  if (typeof fn !== "function") {
    return () => {};
  }

  suscriptores.add(fn);
  fn(trState);

  return () => {
    suscriptores.delete(fn);
  };
}
