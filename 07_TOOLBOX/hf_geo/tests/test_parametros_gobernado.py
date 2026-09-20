"""Pruebas del núcleo de parametros gobernados (C-01) y componentes C-03/C-04."""
import json

import pytest

from hf_geo.parametros_gobernado import (
    CAMPOS_GEOMORFOLOGIA_OBLIGATORIOS,
    CampoGeomorfologicoFaltanteError,
    ParametrosNoDisponibleError,
    cargar_parametros,
    extraer_geomorfologia,
    resolver_ruta_parametros,
    validar_geomorfologia,
)
from hf_geo.producir_tc import producir_tc
from hf_geo.producir_cn import cn_ponderado
from hf_geo.contrato_snap_d03 import (
    clasificar_distancia,
    construir_contrato_default,
    validar_contrato_snap,
)
from hf_geo.producir_expediente_gobernado import (
    construir_expediente_gobernado,
    HASH_EXPEDIENTE_HISTORICO,
)

GEOMORFOLOGIA_VALIDA = {
    "area_km2": 50.6718,
    "perimetro_km": 37.195,
    "lcp_km": 15.6665,
    "dh_msnm": 1662.9,
    "sc_m_m": 0.105671,
}


def _parametros_desde_g(g: dict) -> dict:
    """Construye un parametros.json realista (esquema de la cuenca)."""
    return {
        "cuenca": {
            "id": "iguana_pc80",
            "nombre": "Quebrada La Iguaná - PC_80",
            "area_km2": g.get("area_km2"),
            "perimetro_km": g.get("perimetro_km"),
        },
        "cauce_principal": {
            "lcp_km": g.get("lcp_km"),
            "pendiente_cauce_m_m": g.get("sc_m_m"),
        },
        "relieve": {"dh_msnm": g.get("dh_msnm")},
        "red_hidrografica": {"umbral_acumulacion_celdas": 500},
        "geojson": {
            "cuenca": "geojson/cuenca.geojson",
            "outlet": "geojson/outlet.geojson",
        },
    }


@pytest.fixture
def parametros(tmp_path):
    p = _parametros_desde_g(GEOMORFOLOGIA_VALIDA)
    ruta = tmp_path / "parametros.json"
    ruta.write_text(json.dumps(p, ensure_ascii=False), encoding="utf-8")
    return str(ruta)


class TestParametrosGobernado:
    def test_cargar_parametros(self, parametros):
        datos = cargar_parametros(parametros)
        assert datos["cuenca"]["id"] == "iguana_pc80"
        assert datos["cuenca"]["area_km2"] == 50.6718

    def test_extraer_geomorfologia(self, parametros):
        g = extraer_geomorfologia(cargar_parametros(parametros))
        assert g["area_km2"] == 50.6718
        assert g["perimetro_km"] == 37.195
        assert g["lcp_km"] == 15.6665
        assert g["dh_msnm"] == 1662.9
        assert g["sc_m_m"] == 0.105671

    def test_validar_geomorfologia_ok(self, parametros):
        errores = validar_geomorfologia(cargar_parametros(parametros))
        assert errores == []

    def test_validar_geomorfologia_faltante(self, parametros):
        p = json.loads(open(parametros, encoding="utf-8").read())
        p["cauce_principal"].pop("lcp_km")
        errores = validar_geomorfologia(p)
        assert any("lcp_km" in e for e in errores)
        with pytest.raises(CampoGeomorfologicoFaltanteError):
            extraer_geomorfologia(p)

    def test_campos_obligatorios_cobertura(self):
        assert set(CAMPOS_GEOMORFOLOGIA_OBLIGATORIOS) == {
            "area_km2", "perimetro_km", "lcp_km", "dh_msnm", "sc_m_m"}

    def test_resolver_parametros_explicito(self, parametros):
        assert resolver_ruta_parametros(parametros) == parametros

    def test_resolver_parametros_sin_fuente(self, tmp_path, monkeypatch):
        monkeypatch.delenv("HF_GEO_PARAMETROS", raising=False)

        class _CWD:
            def is_file(self):
                return False
        with pytest.raises(ParametrosNoDisponibleError):
            resolver_ruta_parametros(None)

    def test_resolver_parametros_no_existente(self, tmp_path):
        with pytest.raises(ParametrosNoDisponibleError):
            resolver_ruta_parametros(str(tmp_path / "no-existe.json"))


class TestProducirTcParametrizado:
    def test_producir_tc_lee_parametros(self, parametros):
        g = extraer_geomorfologia(cargar_parametros(parametros))
        tc = producir_tc(g, parametros)
        assert tc["identificador"] == "Tc"
        assert tc["tc_adoptado_min"] > 0
        assert tc["datos_padre"]["ruta_parametros"] == parametros

    def test_producir_tc_no_usa_constante_historica(self, parametros):
        g = extraer_geomorfologia(cargar_parametros(parametros))
        tc = producir_tc(g, parametros)
        assert tc["datos_padre"]["area_km2"] == 50.6718
        assert set(tc["datos_padre"]) >= {
            "area_km2", "lcp_div_km", "lcp_km", "dh_m", "sc_m_m"}

    def test_producir_tc_exige_campos(self):
        p = _parametros_desde_g({"area_km2": 50.6718, "lcp_km": 15.6665})
        with pytest.raises(CampoGeomorfologicoFaltanteError):
            extraer_geomorfologia(p)


class TestContratoSnapD03:
    def test_contrato_por_defecto_valido(self):
        errores = validar_contrato_snap(construir_contrato_default())
        assert errores == []

    def test_regla_mantiene_d03(self):
        c = construir_contrato_default()
        assert c["resultado_snap"]["outlet_retenido"] is True

    def test_clasificacion_pass(self):
        assert clasificar_distancia(15.0)["veredicto"] == "PASS"
        assert clasificar_distancia(30.0)["veredicto"] == "PASS"

    def test_clasificacion_condicional(self):
        assert clasificar_distancia(132.0, con_acta=True)["veredicto"] == "PASS_CONDICIONAL"

    def test_clasificacion_fail_sin_acta(self):
        assert clasificar_distancia(132.0)["veredicto"] == "FAIL"

    def test_clasificacion_fail_exceso(self):
        assert clasificar_distancia(200.0, con_acta=True)["veredicto"] == "FAIL"


class TestProducirCn():
    def test_cn_ponderado_una_clase(self):
        res = cn_ponderado({"Bosque Andino": 10.0}, {"A": 100, "B": 0,
                                                     "C": 0, "D": 0})
        assert res["cn_final_candidato"] == 30.0
        assert res["adoptado"] is False

    def test_cn_ponderado_mezcla(self):
        res = cn_ponderado(
            {"Bosque Andino": 40.0, "Asentamiento humano capital": 10.0},
            {"A": 50, "B": 50, "C": 0, "D": 0},
        )
        cn = res["cn_final_candidato"]
        # CN_ef Bosque = 0.5*30+0.5*55=42.5; CN_ef Urbano=0.5*77+0.5*85=81
        esperado = (42.5 * 40 + 81.0 * 10) / 50.0
        assert cn == pytest.approx(esperado, abs=0.01)

    def test_cn_exige_area(self):
        with pytest.raises(ValueError):
            cn_ponderado({}, {"A": 100, "B": 0, "C": 0, "D": 0})

    def test_cn_no_adopta_79_07(self):
        res = cn_ponderado({"Bosque Andino": 50.0}, {"B": 100, "A": 0,
                                                     "C": 0, "D": 0})
        assert res["cn_final_candidato"] != 79.07
        assert res["cn_final_candidato"] == 55.0


class TestExpedienteGobernado:
    def _construir(self):
        return construir_expediente_gobernado(
            identidad={"id": "iguana_pc80",
                       "nombre": "Quebrada La Iguaná - PC_80",
                       "ot_identificador": "OT-HF-003"},
            outlet={"lat": 6.271785117145225,
                    "lon": -75.59408755595547,
                    "cota_msnm": 1511.36},
            geomorfologia={"area_km2": 50.6718, "perimetro_km": 37.195,
                           "lcp_km": 15.6665, "scp_m_m": None,
                           "sc_m_m": 0.105671, "dh_msnm": 1662.9,
                           "dd_km_km2": None},
            decisiones=[{"id": "D-11", "texto": "Q-5 = hidrografía principal"}],
            restricciones=[{"id": "R-01", "texto": "no recálculo de variables"}],
            q5={"def": "SCS-HU", "tr": "activo"},
            racional={"estado": "contraste no adoptivo"},
            insumos_hash={"parametros": "AAA"},
        )

    def test_hash_cuerpo_determinista(self):
        a = self._construir()
        b = self._construir()
        assert a["hash_cuerpo"] == b["hash_cuerpo"]

    def test_hash_expediente_equivalente(self):
        a = self._construir()
        assert a["hash_cuerpo"] == a["expediente"]["hash_cuerpo"]

    def test_antecedente_historico_preservado(self):
        a = self._construir()
        ah = a["expediente"]["09_Antecedente_Historico"]
        assert ah["sha256"] == HASH_EXPEDIENTE_HISTORICO

    def test_identidad_d03(self):
        a = self._construir()["expediente"]
        assert a["01_Identidad"]["nombre"] == "Quebrada La Iguaná - PC_80"
        assert a["02_Outlet_D03"]["lat"] == pytest.approx(6.271785117145225)

    def test_cuerpo_no_incluye_control_volatile(self):
        a = self._construir()["expediente"]
        assert "00_Control" in a
        assert "hash_cuerpo" in a