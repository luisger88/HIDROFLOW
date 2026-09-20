"""Gobernanza de entrada geomorfológica para los productores HF.

C-01 (OT-HF-003-CSTATE-001A): los productores hidrológicos deben recibir o
leer sus datos geomorfológicos desde un artefacto de entrada EXPLÍCITO,
versionado y configurable — el ``parametros.json`` de la cuenca reproducida —
y NO desde constantes hardcodeadas del caso histórico (La Iguaná PC_80).

Reglas impuestas aquí:

1. La ruta de entrada se resuelve por: argumento explícito > variable de
   entorno ``HF_GEO_PARAMETROS`` > ``parametros.json`` en el directorio de
   trabajo. Sin ninguna de las tres, se FALLA.
2. NO existe fallback silencioso a la geometría histórica de La Iguaná.
3. Se validan estrictamente los campos geomorfológicos requeridos; si falta
   alguno, el productor FALLA con mensaje que enumera los faltantes.
4. Los valores nunca se tratan como constantes globales del caso.
"""

from __future__ import annotations

import json
import os
from pathlib import Path

ENV_RUTA_PARAMETROS = "HF_GEO_PARAMETROS"
ENV_DATOS_GOBERNADOS = "HF_DATOS_GOBERNADOS"
ENV_DIR_TEMP = "HF_GEO_DIR_TEMP"

#: Mapeo canónico: slot geomorfológico -> (sección, campo) de parametros.json
MAPEO_CAMPOS = {
    "area_km2": ("cuenca", "area_km2"),
    "perimetro_km": ("cuenca", "perimetro_km"),
    "lcp_km": ("cauce_principal", "lcp_km"),
    "sc_m_m": ("cauce_principal", "pendiente_cauce_m_m"),
    "dh_msnm": ("relieve", "dh_msnm"),
    "hmax_msnm": ("relieve", "hmax_msnm"),
    "hmin_msnm": ("relieve", "hmin_msnm"),
    "dd_km_km2": ("red_hidrografica", "dd_km_km2"),
}

#: Campos imprescindibles para los productores hidrológicos (C-01).
CAMPOS_GEOMORFOLOGIA_OBLIGATORIOS = (
    "area_km2",
    "perimetro_km",
    "lcp_km",
    "dh_msnm",
    "sc_m_m",
)

#: Campos informativos leídos cuando están presentes.
CAMPOS_GEOMORFOLOGIA_INFORMATIVOS = (
    "hmax_msnm",
    "hmin_msnm",
    "dd_km_km2",
)

_DEFECTOS = {
    "area_km2": "km2",
    "perimetro_km": "km",
    "lcp_km": "km",
    "sc_m_m": "m/m",
    "dh_msnm": "m",
    "hmax_msnm": "msnm",
    "hmin_msnm": "msnm",
    "dd_km_km2": "km/km2",
}


class ParametrosNoDisponibleError(FileNotFoundError):
    """La ruta de parametros.json no pudo resolverse ni leerse."""


class CampoGeomorfologicoFaltanteError(ValueError):
    """Faltan campos geomorfológicos requeridos en el artefacto de entrada.

    Attributes:
        faltantes: lista de nombres de campo ausentes o no numéricos.
        ruta: ruta del artefacto de entrada (si se conoce).
    """

    def __init__(self, faltantes: list[str], ruta: str | None = None):
        super().__init__(
            "Faltan campos geomorfológicos requeridos: " + ", ".join(sorted(faltantes))
        )
        self.faltantes = sorted(faltantes)
        self.ruta = ruta


def resolver_ruta_parametros(ruta: str | None = None) -> str:
    """Resuelve la ruta del artefacto ``parametros.json`` de forma explícita.

    Orden: argumento ``ruta`` > ``HF_GEO_PARAMETROS`` > ``./parametros.json``.
    Sin resolución posible, lanza :class:`ParametrosNoDisponibleError`.
    No existe fallback a geometría histórica.
    """
    candidatas: list[str] = []
    if ruta:
        candidatas.append(ruta)
    env = os.environ.get(ENV_RUTA_PARAMETROS)
    if env:
        candidatas.append(env)
    cwd = Path.cwd() / "parametros.json"
    if cwd.is_file():
        candidatas.append(str(cwd))

    if not candidatas:
        raise ParametrosNoDisponibleError(
            "No se recibió '--parametros' ni 'HF_GEO_PARAMETROS' y no existe "
            "'parametros.json' en el directorio de trabajo. El productor debe "
            "recibir la cuenca reproducida explícitamente (C-01)."
        )
    for cand in candidatas:
        p = Path(cand)
        if p.is_file():
            return str(p.resolve())

    raise ParametrosNoDisponibleError(
        "Ninguna ruta candidata de parametros.json existe: "
        + "; ".join(candidatas)
    )


def cargar_parametros(ruta: str) -> dict:
    """Carga y retorna el diccionario de ``parametros.json``.

    Lanza :class:`ParametrosNoDisponibleError` si el archivo no existe o no es
    un objeto JSON válido.
    """
    try:
        with open(ruta, "r", encoding="utf-8") as f:
            datos = json.load(f)
    except FileNotFoundError as exc:
        raise ParametrosNoDisponibleError(f"parametros.json no existe: {ruta}") from exc
    except json.JSONDecodeError as exc:
        raise ParametrosNoDisponibleError(
            f"parametros.json no es JSON válido: {ruta}: {exc.msg}"
        ) from exc
    if not isinstance(datos, dict):
        raise ParametrosNoDisponibleError(
            f"parametros.json no contiene un objeto: {ruta}"
        )
    return datos


def _leer_campo(parametros: dict, seccion: str, campo: str):
    seccion_datos = parametros.get(seccion)
    if not isinstance(seccion_datos, dict):
        return None
    valor = seccion_datos.get(campo)
    if isinstance(valor, bool):
        return None
    try:
        return float(valor)
    except (TypeError, ValueError):
        return None


def extraer_geomorfologia(parametros: dict) -> dict:
    """Extrae y valida los campos geomorfológicos del artefacto de entrada.

    Retorna un dict con los slots canónicos de :data:`MAPEO_CAMPOS`. Si falta
    algún campo obligatorio (o no es numérico), lanza
    :class:`CampoGeomorfologicoFaltanteError`. Nunca completa con valores del
    caso histórico.
    """
    obtenidos: dict[str, float] = {}
    for slot, (seccion, campo) in MAPEO_CAMPOS.items():
        valor = _leer_campo(parametros, seccion, campo)
        if valor is not None:
            obtenidos[slot] = valor

    faltantes = [
        slot
        for slot in CAMPOS_GEOMORFOLOGIA_OBLIGATORIOS
        if slot not in obtenidos
    ]
    if faltantes:
        raise CampoGeomorfologicoFaltanteError(faltantes)

    salida = {slot: obtenidos[slot] for slot in CAMPOS_GEOMORFOLOGIA_OBLIGATORIOS}
    for slot in CAMPOS_GEOMORFOLOGIA_INFORMATIVOS:
        if slot in obtenidos:
            salida[slot] = obtenidos[slot]
    salida["unidades"] = {slot: _DEFECTOS[slot] for slot in salida if slot != "unidades"}
    return salida


def validar_geomorfologia(parametros: dict) -> list[str]:
    """Variante NO lanzadora de :func:`extraer_geomorfologia`.

    Retorna una lista de errores (vacía si el artefacto cumple el contrato).
    """
    try:
        extraer_geomorfologia(parametros)
    except CampoGeomorfologicoFaltanteError as exc:
        return [f"Falta campo geomorfológico: {f}" for f in exc.faltantes]
    return []


def resolver_datos_gobernados() -> str:
    """Directorio de salida de los artefactos gobernados.

    Orden: ``HF_DATOS_GOBERNADOS`` (env) > ``07_TOOLBOX/datos_gobernados``
    (derivado de la ubicación del módulo, relativo al paquete).
    """
    env = os.environ.get(ENV_DATOS_GOBERNADOS)
    if env:
        return str(Path(env).resolve())
    return str((Path(__file__).resolve().parent.parent / "datos_gobernados"))


def resolver_dir_temp(ruta: str | None = None) -> str:
    """Directorio temporal de rasters operativos (M01-M07).

    Orden: argumento ``ruta`` > ``HF_GEO_DIR_TEMP`` (env). Sin resolución,
    lanza :class:`ParametrosNoDisponibleError`. NO usa una ruta rígida del
    caso histórico.
    """
    if ruta:
        return str(Path(ruta).resolve())
    env = os.environ.get(ENV_DIR_TEMP)
    if env:
        return str(Path(env).resolve())
    raise ParametrosNoDisponibleError(
        "No se recibió '--dir_temp' ni 'HF_GEO_DIR_TEMP'. Los productores de "
        "raster requieren el directorio temporal de forma explícita (C-01)."
    )