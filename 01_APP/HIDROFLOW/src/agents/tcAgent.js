// ============================================================
// AGENTE Tc con notificación reactiva
// ============================================================

let TcState = {
  Tc_final: null,
  metodosTc: null,
  contextoTc: null
};

let listeners = [];

export function setTcState(data) {
  TcState = { ...TcState, ...data };

  // 🔥 notifica a todos los componentes
  listeners.forEach(fn => fn(TcState));
}

export function getTcState() {
  return TcState;
}

export function subscribeTc(listener) {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter(l => l !== listener);
  };
}