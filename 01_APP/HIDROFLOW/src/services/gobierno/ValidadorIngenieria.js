export function validarDato(
  dato,
  contexto
) {

  if (
    dato === null ||
    dato === undefined
  ) {
    console.warn(
      `[HF-001] Dato sin trazabilidad: ${contexto}`
    );
    return false;
  }

  return true;
}
