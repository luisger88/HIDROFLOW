function numeroSeguro(valor) {
  const n = Number(valor);
  return Number.isFinite(n) ? n : null;
}

export function derivarQDisenoDesdeEscenarioActivo(entrada = {}) {
  const escenario =
    entrada?.escenarioQTrActivo ??
    entrada?.qTrActivo ??
    entrada?.q_tr_activo ??
    entrada?.estadoQTrActivo?.q_tr_activo ??
    entrada?.q_tr_activo_estado?.q_tr_activo ??
    entrada;

  return (
    numeroSeguro(escenario?.caudalDisenoM3s) ??
    numeroSeguro(escenario?.Q) ??
    numeroSeguro(escenario?.q) ??
    numeroSeguro(escenario?.caudal) ??
    numeroSeguro(escenario?.Qp) ??
    numeroSeguro(escenario?.Qpico) ??
    numeroSeguro(escenario?.qPico) ??
    numeroSeguro(escenario?.caudalPicoM3s) ??
    null
  );
}

export default derivarQDisenoDesdeEscenarioActivo;
