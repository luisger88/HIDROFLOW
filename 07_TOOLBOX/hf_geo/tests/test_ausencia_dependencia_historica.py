"""Prueba estática: los productores no re-introducen dependencia silenciosa
del caso histórico (C-01, C-02).

Escanea los módulos ``hf_geo/*.py`` (excluyendo tests) y verifica la
AUSENCIA de:
  - literales numéricos históricos embebidos (50.6718, 15.6665, 1662.9,
    0.10567, 37.195);
  - del CN histórico auto-adoptado (79.07);
  - de rutas rígidas legadas a ``caso_real_001/.../cuenca.geojson``.

El uso de estos literales como FIXTURES en los tests es intencional y no se
evalúa aquí.
"""
import pathlib
import re

from hf_geo.parametros_gobernado import (
    CAMPOS_GEOMORFOLOGIA_OBLIGATORIOS,
)

RUTA_PKG = pathlib.Path(__file__).resolve().parents[1]

CONSTANTES_HISTORICAS = ["50.6718", "15.6665", "1662.9", "0.10567", "37.195", "79.07"]
RUTA_RIGIDA = "caso_real_001"


def _fuentes_productor():
    return [
        p for p in RUTA_PKG.glob("*.py")
        if p.name in (
            "producir_tc.py",
            "producir_cn.py",
            "producir_volumen.py",
            "producir_qp.py",
            "producir_geomorfometria.py",
            "producir_lcp_div.py",
            "generar_expediente.py",
        )
    ]


def test_ausencia_constantes_historicas():
    lineas_con = []
    for f in _fuentes_productor():
        for i, linea in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            for c in CONSTANTES_HISTORICAS:
                if re.search(rf"\b{re.escape(c)}\b", linea):
                    lineas_con.append(f"{f.name}:{i} '{c}' → {linea.strip()}")
    assert not lineas_con, "Literales históricos aún presentes:\n" + "\n".join(lineas_con)


def test_ausencia_ruta_rigida_cuenca():
    for f in _fuentes_productor():
        src = f.read_text(encoding="utf-8")
        assert RUTA_RIGIDA not in src, f"{f.name} aún referencia {RUTA_RIGIDA}"


def test_productores_declaran_proveniencia_gobernada():
    tc = RUTA_PKG / "producir_tc.py"
    src = tc.read_text(encoding="utf-8")
    assert "resolver_ruta_parametros" in src
    assert "ruta_parametros" in src
    cn = RUTA_PKG / "producir_cn.py"
    assert "validar_cuenca_geojson" in cn.read_text(encoding="utf-8")


def test_parametros_gobernado_expone_env_docs():
    from hf_geo import parametros_gobernado as pg
    assert pg.ENV_RUTA_PARAMETROS == "HF_GEO_PARAMETROS"
    assert pg.ENV_DATOS_GOBERNADOS == "HF_DATOS_GOBERNADOS"
    assert pg.ENV_DIR_TEMP == "HF_GEO_DIR_TEMP"


def test_cobertura_campos_obligatorios_completa():
    assert len(CAMPOS_GEOMORFOLOGIA_OBLIGATORIOS) == 5
    for c in ("area_km2", "perimetro_km", "lcp_km", "dh_msnm", "sc_m_m"):
        assert c in CAMPOS_GEOMORFOLOGIA_OBLIGATORIOS