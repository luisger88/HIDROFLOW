import { useMemo, useState } from "react";
import { ParametrosCuenca, HietogramaOut } from "../dominio/tipos";
import { calcHietograma } from "../dominio/calcHietograma";

export function useHietograma(p: ParametrosCuenca) {
  const [Tr, setTr] = useState<number>(25);
  const [d, setD] = useState<number>(60);
  const [dt, setDt] = useState<number>(p.dt_min ?? 5);
  const [dist, setDist] = useState<HietogramaOut["distribucion"]>("EPM_Q1");

  const hi = useMemo(() => calcHietograma(p, d, dt, Tr, dist), [p, d, dt, Tr, dist]);

  return { Tr, setTr, d, setD, dt, setDt, dist, setDist, hi };
}
