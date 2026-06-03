export function normalizarPendiente(metodo, datos) {
  if (!datos) return null;

  switch (metodo) {

    case 'Kirpich':
      return datos.Sf_ft_ft ?? null;

    case 'SCS-Ranser':
      if (datos.Sc !== undefined) {
        return datos.Sc / 100; // % → decimal
      }
      return null;

    case 'Temez':
    case 'California':
      if (datos.So !== undefined) {
        return datos.So / 1000; // ‰ → decimal
      }
      return null;

    default:
      return null;
  }
}
