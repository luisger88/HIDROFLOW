let contratoCuencaState = null;

const suscriptores = new Set();

export function getContratoCuencaState() {
  return contratoCuencaState;
}

export function setContratoCuencaState(parcial) {

  contratoCuencaState = parcial;

  suscriptores.forEach(fn => fn(contratoCuencaState));
}

export function subscribeContratoCuenca(fn) {

  if (typeof fn !== "function") {
    return () => {};
  }

  suscriptores.add(fn);

  fn(contratoCuencaState);

  return () => {
    suscriptores.delete(fn);
  };
}
