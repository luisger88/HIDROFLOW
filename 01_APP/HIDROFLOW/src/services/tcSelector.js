// ============================================================
// HidroFlow — Sistema Tc Multimétodo Adaptativo
// OT-0007-A + OT-0007-B + OT-0007-C
// ============================================================


// ============================================================
// 1. Agregador multimétodo (SOLO métodos competentes)
// ============================================================

function calcularTcRef(metodos) {

  // 🔥 Pesos hidrológicos (ajustables pero ya coherentes)
  const pesos = {
    Kirpich: 0.25,        // respuesta rápida
    Temez: 0.25,          // respuesta integrada
    Giandotti: 0.2,
    California: 0.1,
    Perez: 0.1,
    WilliamsHann: 0.1
    // ❌ SCS-Ranser NO se incluye (no competente)
  };

  let suma = 0;
  let sumaPesos = 0;

  Object.keys(pesos).forEach(nombreMetodo => {
    const valor = metodos[nombreMetodo];

    if (valor && !isNaN(valor)) {
      suma += valor * pesos[nombreMetodo];
      sumaPesos += pesos[nombreMetodo];
    }
  });

  if (sumaPesos === 0) return null;

  return suma / sumaPesos;
}


// ============================================================
// 2. Ajuste por condiciones de la cuenca (OT-0007-C)
// ============================================================

function ajustarTcPorCondiciones(Tc, contexto) {

  if (!Tc) return null;

  const {
    pendiente = 0,
    area = 0,
    CN = 0,
    urbanizacion = 0
  } = contexto;

  let factor = 1;

  // 🔹 Pendiente alta → flujo rápido
  if (pendiente > 8) {
    factor *= 0.85;
  }

  // 🔹 Urbanización → menos infiltración
  if (urbanizacion > 0.5) {
    factor *= 0.8;
  }

  // 🔹 CN alto → suelos impermeables
  if (CN > 85) {
    factor *= 0.9;
  }

  // 🔹 Cuenca grande → mayor tiempo de respuesta
  if (area > 30) {
    factor *= 1.1;
  }

  return Tc * factor;
}


// ============================================================
// 3. Selector final inteligente (OT-0007-A)
// ============================================================

export function seleccionarTc(modo, metodosTc, contexto = {}) {

  // 🔹 Límites físicos
  const Tc_min = metodosTc.Kirpich ?? null;
  const Tc_max = metodosTc.Temez ?? null;

  // 🔥 Tc dinámico real
  const Tc_ref_base = calcularTcRef(metodosTc);
  const Tc_ref = ajustarTcPorCondiciones(Tc_ref_base, contexto);

  switch (modo) {

    case 'Qp':           // Caudal pico (Racional)
      return Tc_min;

    case 'hidrograma':   // UH, SCS, Snyder, Clark
      return Tc_ref;

    case 'volumen':      // análisis conservador
      return Tc_max;

    default:
      return Tc_ref;
  }
}
