import { useMemo, useState } from "react";
import { ParametrosCuenca, TcResultado } from "../dominio/tipos";
import { calcTcTodos, sugerirMetodoTc } from "../dominio/motorTc";

export function useTc(params: ParametrosCuenca) {
  const resultados = useMemo<TcResultado[]>(() => calcTcTodos(params), [params]);
  const sugerido = useMemo(() => sugerirMetodoTc(params), [params]);
  const [metodo, setMetodo] = useState<string>(sugerido.metodo);
  const activo = useMemo(
    () => resultados.find(r => r.metodo === metodo) ?? resultados[0],
    [resultados, metodo]
  );
  return { resultados, sugerido, metodo, setMetodo, activo };
}
