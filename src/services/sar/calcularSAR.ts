import { HidrogramaSAR, ResultadoSAR } from "../../dominio/SAR";

/**
 * Calcula el SAR según GT-AS-004
 */
export function calcularSAR({
  pre,
  post,
  clasificacionCuenca
}: {
  pre: HidrogramaSAR;
  post: HidrogramaSAR;
  clasificacionCuenca: "RURAL" | "URBANA" | "MIXTA";
}): ResultadoSAR {

  // --- Caudales pico ---
  const Q_regulado = pre.Qp;
  const Q_entrada = post.Qp;

  // --- Volumen excedente ---
  let V_excedente = 0;

  const n = Math.min(pre.Qserie.length, post.Qserie.length);
  for (let i = 0; i < n; i++) {
    const dt = i === 0 ? 0 : (post.Qserie[i].t - post.Qserie[i - 1].t);
    const excedente = Math.max(
      post.Qserie[i].Q - pre.Qserie[i].Q,
      0
    );
    V_excedente += excedente * dt;
  }

  // --- Aplicabilidad normativa ---
  const cumplimientoGTAS004 =
    clasificacionCuenca === "URBANA" || clasificacionCuenca === "MIXTA";

  return {
    Q_regulado,
    Q_entrada,
    V_excedente,
    estadoGobernante: "PRE_URBANO",
    clasificacionCuenca,
    cumplimientoGTAS004
  };
}
