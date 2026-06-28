import { CUENCAS_CATALOGO } from "../../data/cuencasCatalogo";

function distancia2(lat1, lon1, lat2, lon2) {

  return (
    Math.pow(Number(lat1) - Number(lat2), 2) +
    Math.pow(Number(lon1) - Number(lon2), 2)
  );

}

export default function resolverCuencaDesdeCoordenadas(
  latitud,
  longitud
) {

  if (
    !Number.isFinite(Number(latitud)) ||
    !Number.isFinite(Number(longitud))
  ) {
    return null;
  }

  let mejor = null;
  let mejorDistancia = Number.POSITIVE_INFINITY;

  for (const cuenca of Object.values(CUENCAS_CATALOGO)) {

    const lat =
      cuenca?.lat_salida ??
      cuenca?.lat ??
      cuenca?.latitud;

    const lon =
      cuenca?.lon_salida ??
      cuenca?.lon ??
      cuenca?.longitud;

    if (
      !Number.isFinite(Number(lat)) ||
      !Number.isFinite(Number(lon))
    ) {
      continue;
    }

    const d = distancia2(
      latitud,
      longitud,
      lat,
      lon
    );

    if (d < mejorDistancia) {

      mejorDistancia = d;
      mejor = cuenca;

    }
  }

  return mejor;
}
