"""HF-CN-PRODUCTION-001 — Producción de CN (Curve Number).

Produce CN como VARIABLE CANDIDATA (sujeta a decisión profesional) desde:
  - Cobertura gobernada (coberturas96 local) / fuente configurable
  - HSG gobernado (HF_HSG_001.json) / fuente configurable
  - Tabla TR-55 (CATALOGO_CN_OFICIAL_001)

CN_final_candidato = Σ(CN_i × Área_i) / Σ(Área_i)

C-02 (OT-HF-003-CSTATE-001A):
  - La cuenca de entrada es EXPLÍCITA (``--cuenca`` / ``HF_GEO_CUENCA``); no
    hay ruta rígida a los geojson del caso histórico del toolbox.
  - Se valida existencia y CRS de la cuenca.
  - Se registran fuente y hash de la cuenca, y las fuentes de cobertura y HSG.
  - NO se adopta automáticamente el CN del registro histórico; la salida queda
    como candidato con ``estado = CANDIDATO_SIN_ADOPCION``.
  - Se exponen las restricciones de vigencia de la cobertura.
"""

import argparse
import json
import os
import hashlib
from pathlib import Path

from hf_geo.parametros_gobernado import resolver_datos_gobernados

# ── Cobertura → clase HF (mapeo documentado) ────────────────────
COV_A_HF = {
    "Agroecosistema Andino": "Cultivos",
    "Asentamiento humano capital": "Urbano",
    "Bosque Andino fragmentado": "Bosque",
    "Bosque Andino": "Bosque",
    "Bosque Andino plantado": "Bosque",
}

# ── Tabla TR-55 (CATALOGO_CN_OFICIAL_001): CN por clase HF × HSG ──
TR55 = {
    "Urbano":   {"A": 77, "B": 85, "C": 90, "D": 92},
    "Bosque":   {"A": 30, "B": 55, "C": 70, "D": 77},
    "Cultivos": {"A": 62, "B": 71, "C": 78, "D": 81},
}

#: Vigencia documentada de la cobertura por defecto (1996).
REDATE_COBERTURA = "coberturas96_wgs84.shp (1996 — desactualizada; restringe vigencia del candidato)"

ENV_RUTA_CUENCA = "HF_GEO_CUENCA"
ENV_RUTA_COBERTURA = "HF_GEO_COBERTURA"
ENV_RUTA_HSG = "HF_GEO_HSG"


def hash_archivo(ruta: str) -> str:
    """SHA-256 del contenido crudo del archivo."""
    h = hashlib.sha256()
    with open(ruta, "rb") as f:
        for bloque in iter(lambda: f.read(65536), b""):
            h.update(bloque)
    return h.hexdigest()


def resolver_ruta_cuenca(ruta: str | None) -> str:
    """Resuelve la ruta de la cuenca de forma explícita (C-02).

    Orden: ``cuenca`` (arg) > ``HF_GEO_CUENCA`` (env). Sin resolución o con
    archivo inexistente, FALLA. No usa la ruta histórica del caso.
    """
    candidatas = [ruta] if ruta else []
    env = os.environ.get(ENV_RUTA_CUENCA)
    if env:
        candidatas.append(env)
    for cand in candidatas:
        if cand and Path(cand).is_file():
            return str(Path(cand).resolve())
    if not candidatas:
        raise FileNotFoundError(
            "No se recibió '--cuenca' ni 'HF_GEO_CUENCA'. La cuenca de CN debe "
            "ser explícita (C-02)."
        )
    raise FileNotFoundError(
        "Ninguna ruta candidata de cuenca existe: " + "; ".join(candidatas)
    )


def validar_cuenca_geojson(ruta: str) -> dict:
    """Valida existencia, estructura FeatureCollection y CRS de la cuenca.

    Retorna dict con: ``ruta``, ``sha256``, ``crs``, ``crs_epsg``,
    ``n_features`` y ``errores``. No hace clipeo; es la verificación previa.
    """
    errores = []
    if not os.path.isfile(ruta):
        return {
            "ruta": ruta, "sha256": None, "crs": None, "crs_epsg": None,
            "n_features": None,
            "errores": [f"la cuenca no existe: {ruta}"],
        }
    try:
        with open(ruta, "r", encoding="utf-8") as f:
            datos = json.load(f)
    except json.JSONDecodeError as exc:
        return {
            "ruta": ruta, "sha256": None, "crs": None, "crs_epsg": None,
            "n_features": None,
            "errores": [f"la cuenca no es JSON válido: {exc.msg}"],
        }

    if datos.get("type") != "FeatureCollection":
        errores.append("type != FeatureCollection")

    features = datos.get("features", [])
    if not isinstance(features, list) or len(features) == 0:
        errores.append("sin features")

    crs = datos.get("crs")
    if crs is None:
        errores.append("CRS ausente en el artefacto (se recomienda CRS84/EPSG:4326)")
        crs_epsg = None
    else:
        nombre = crs.get("properties", {}).get("name", "")
        crs_epsg = 4326 if "CRS84" in nombre or "4326" in nombre else None
        if crs_epsg is None:
            errores.append(f"CRS no reconocido como geográfico: {nombre}")

    return {
        "ruta": str(Path(ruta).resolve()),
        "sha256": hash_archivo(ruta),
        "crs": crs,
        "crs_epsg": crs_epsg,
        "n_features": len(features) if isinstance(features, list) else 0,
        "errores": errores,
    }


def cn_ponderado(clases: dict[str, float], hsg_dist: dict[str, float]) -> dict:
    """CN ponderado por área, puro y determinista.

    ``clases``: {clase_cobertura: area_km2}. ``hsg_dist``: {HSG_A: %, ...}.
    Retorna unidades y el CN final como CANDIDATO (no adoptado).
    """
    total = sum(clases.values())
    if total <= 0:
        raise ValueError("área total de cobertura vacía: no se puede calcular CN")

    frac = {g: (hsg_dist.get(g, 0.0) or 0.0) / 100.0 for g in ("A", "B", "C", "D")}

    unidades = []
    suma_cn_area = 0.0
    for cov_clase, area in clases.items():
        hf = COV_A_HF.get(cov_clase, "Cultivos")
        cn_ef = (
            frac["A"] * TR55[hf]["A"]
            + frac["B"] * TR55[hf]["B"]
            + frac["C"] * TR55[hf]["C"]
            + frac["D"] * TR55[hf]["D"]
        )
        unidades.append({
            "cobertura": cov_clase,
            "clase_hf": hf,
            "area_km2": round(float(area), 3),
            "porcentaje": round(float(area) / total * 100, 2),
            "cn_hsg_A": TR55[hf]["A"],
            "cn_hsg_B": TR55[hf]["B"],
            "cn_hsg_C": TR55[hf]["C"],
            "cn_hsg_D": TR55[hf]["D"],
            "cn_efectivo": round(cn_ef, 2),
        })
        suma_cn_area += cn_ef * area

    return {
        "cn_final_candidato": round(suma_cn_area / total, 2),
        "unidades": unidades,
        "area_total_km2": round(float(total), 4),
        "asignacion_cobertura_fallback": "Cultivos (documentado)",
        "adoptado": False,
    }


def cargar_hsg_distribucion(ruta_hsg: str | None) -> dict:
    """Lee la distribución HSG desde el artefacto gobernado."""
    if ruta_hsg:
        if not os.path.isfile(ruta_hsg):
            raise FileNotFoundError(f"no existe la fuente HSG: {ruta_hsg}")
        with open(ruta_hsg, "r", encoding="utf-8") as f:
            hsg = json.load(f)
        dist = hsg.get("distribucion_hsg_pct")
        nombre = Path(ruta_hsg).name
        sha = hash_archivo(ruta_hsg)
    else:
        ruta = os.path.join(resolver_datos_gobernados(), "HF_HSG_001.json")
        if not os.path.isfile(ruta):
            raise FileNotFoundError(
                "no existe HF_HSG_001.json en datos gobernados; pase '--hsg' "
                "explícitamente (C-02)"
            )
        with open(ruta, "r", encoding="utf-8") as f:
            hsg = json.load(f)
        dist = hsg.get("distribucion_hsg_pct")
        nombre = "HF_HSG_001.json (datos gobernados)"
        sha = hash_archivo(ruta)
    if not isinstance(dist, dict) or not dist:
        raise ValueError(f"la fuente HSG no expone 'distribucion_hsg_pct': {nombre}")
    return {"distribucion": dist, "fuente": nombre, "sha256": sha}


def construir_documento_cn(
    *,
    validacion_cuenca: dict,
    ruta_cuenca: str,
    ruta_cobertura: str | None,
    fuente_hsg: dict,
    cn: dict,
) -> dict:
    """Ensambla el artefacto HF_CN_001.json como CANDIDATO gobernado."""
    return {
        "identificador": "CN",
        "variable": "CN (Curve Number / Número de Curva)",
        "version": "1.1",
        "fecha": "2026-09-20",
        "caso": "iguana_pc80",
        "cn_final_candidato": cn["cn_final_candidato"],
        "estado": "CANDIDATO_SIN_ADOPCION",
        "nota_adopcion": "CN no adoptado automáticamente; sujeto a decisión profesional (C-02)",
        "unidad": "adimensional (30-98)",
        "metodo": "SCS-CN (TR-55), CN ponderado por área",
        "cuenca": {
            "ruta": ruta_cuenca,
            "sha256": validacion_cuenca["sha256"],
            "crs_epsg": validacion_cuenca["crs_epsg"],
            "n_features": validacion_cuenca["n_features"],
            "errores_validacion": validacion_cuenca["errores"],
        },
        "hsg_distribucion_pct": fuente_hsg["distribucion"],
        "fuentes": {
            "cuenca": ruta_cuenca,
            "cobertura": ruta_cobertura or REDATE_COBERTURA,
            "hsg": fuente_hsg["fuente"],
            "tabla_tr55": "CATALOGO_CN_OFICIAL_001",
        },
        "hash_fuentes": {
            "cuenca": validacion_cuenca["sha256"],
            "hsg": fuente_hsg["sha256"],
        },
        "restricciones_vigencia_cobertura": [
            "Cobertura 1996 considerada desactualizada; el candidato CN depende "
            "de una cobertura sin vigencia documentada.",
            "Adopción profesional requerida antes de usar el CN candidato.",
        ],
        "unidades": cn["unidades"],
        "area_total_km2": cn["area_total_km2"],
        "reproducible": True,
    }


def main():
    parser = argparse.ArgumentParser(description="HF-CN-PRODUCTION-001")
    parser.add_argument("--cuenca", default=None,
                        help="Ruta explícita a cuenca.geojson (C-02)")
    parser.add_argument("--cobertura", default=None,
                        help="Ruta explícita a la capa de coberturas")
    parser.add_argument("--hsg", default=None,
                        help="Ruta explícita al artefacto HSG (JSON)")
    parser.add_argument("--out-dir", default=None,
                        help="Directorio de salida (por defecto: datos gobernados)")
    args = parser.parse_args()

    ruta_cuenca = resolver_ruta_cuenca(args.cuenca)
    validacion = validar_cuenca_geojson(ruta_cuenca)
    if validacion["errores"]:
        for e in validacion["errores"]:
            print(f"[ERROR] cuenca: {e}")
        raise SystemExit(1)

    import geopandas as gpd
    from shapely.geometry import shape
    from shapely.ops import unary_union
    from geopandas.tools import clip as gpd_clip

    ruta_cobertura = args.cobertura or os.environ.get(ENV_RUTA_COBERTURA)
    if not ruta_cobertura or not os.path.isfile(ruta_cobertura):
        print("[ERROR] se requiere '--cobertura' o HF_GEO_COBERTURA (C-02)")
        raise SystemExit(1)

    fuente_hsg = cargar_hsg_distribucion(args.hsg)

    cuenca = json.load(open(ruta_cuenca, encoding="utf-8"))
    geom = unary_union([shape(f["geometry"]) for f in cuenca["features"]])
    basin = gpd.GeoDataFrame(geometry=[geom], crs="EPSG:4326")

    cov = gpd.read_file(ruta_cobertura)
    try:
        clip = gpd_clip(cov, basin).to_crs("EPSG:32618")
    except Exception as exc:
        print(f"[ERROR] clip de cobertura falló: {exc}")
        raise SystemExit(1)
    clip["area_km2"] = clip.geometry.area / 1e6
    areas = clip.groupby("COBERTURA")["area_km2"].sum().to_dict()

    cn = cn_ponderado(areas, fuente_hsg["distribucion"])
    doc = construir_documento_cn(
        validacion_cuenca=validacion,
        ruta_cuenca=ruta_cuenca,
        ruta_cobertura=ruta_cobertura,
        fuente_hsg=fuente_hsg,
        cn=cn,
    )

    out_dir = args.out_dir or resolver_datos_gobernados()
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "HF_CN_001.json")
    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=True)
    sha = hashlib.sha256(payload.encode("utf-8")).hexdigest()
    doc["sha256"] = sha
    payload = json.dumps(doc, ensure_ascii=False, indent=2, sort_keys=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(payload)

    print("=== HF-CN-PRODUCTION-001 (C-02, candidato) ===")
    print("cuenca:", ruta_cuenca)
    print("cuenca sha256:", validacion["sha256"])
    print("área total:", cn["area_total_km2"], "km2")
    for u in cn["unidades"]:
        print(f"  {u['cobertura']:35s} {u['clase_hf']:10s} {u['area_km2']:8.2f} km2 "
              f"CN_ef={u['cn_efectivo']}")
    print("CN final CANDIDATO (ponderado):", cn["cn_final_candidato"])
    print("estado:", doc["estado"])
    print("JSON:", out_path)
    print("SHA-256:", sha)


if __name__ == "__main__":
    main()