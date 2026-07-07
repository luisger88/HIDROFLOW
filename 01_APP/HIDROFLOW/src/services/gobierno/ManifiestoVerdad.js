import manifiesto from "./ManifiestoVerdad.json";

export function obtenerCuenca(
  nombreCuenca
) {
  return (
    manifiesto?.cuencas?.[
      nombreCuenca
    ] ?? null
  );
}
