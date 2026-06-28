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

  for (const cuenca of CUENCAS_CATALOGO) {

    const lat =
      cuenca?.lat ??
      cuenca?.latitud ??
      cuenca?.coordenadas?.lat;

    const lon =
      cuenca?.lon ??
      cuenca?.longitud ??
      cuenca?.coordenadas?.lon;

    if (
      !Number.isFinite(Number(lat)) ||
      !Number.isFinite(Number(lon))
    ) {
      continue;
    }

    const distancia = distancia2(
      latitud,
      longitud,
      lat,
      lon
    );

    if (distancia < mejorDistancia) {
      mejorDistancia = distancia;
      mejor = cuenca;
    }
  }

  return mejor;
}
