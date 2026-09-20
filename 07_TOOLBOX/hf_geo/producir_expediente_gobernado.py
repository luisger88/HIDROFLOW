"""HF-EXPEDIENTE-GOBERNADO — Producción determinista del expediente gobernado
del caso iguana_pc80 (OT-HF-003-CSTATE-001A, corrección C-04).

C-04 / D-13:
  - Entrada explícita de artefactos; no se lee de rutas rígidas del caso.
  - Serialización canónica (json.dumps con sort_keys=True, indent=2,
    ensure_ascii=False, separadores por defecto) y hash SHA-256 reproducible.
  - Cuerpo (variables, decisiones, restricciones) SEPARADO de metadatos
    (fecha, motor, firmas): el hash cubre el CUE RPO; los metadatos varían
    sin invalidar la reproducción.
  - Mantiene identidad, outlet D-03, geomorfología (Scp y Sc por separado),
    decisiones ratificadas, restricciones, definición de Q-5 (D-11) y
    contraste Racional no adoptivo.
  - Preserva el expediente histórico como ANTECEDENTE (hash cd98512f…);
    NO sobrescribe HF_EXPEDIENTE_001.json.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path

from hf_geo.parametros_gobernado import resolver_datos_gobernados

#: Hash del expediente histórico (preservado como antecedente, no recalculado).
HASH_EXPEDIENTE_HISTORICO = (
    "cd98512feb2ffca76ffde98f40f6dcce875f461efe098626d06da1f386c7921f"
)
RUTA_EXPEDIENTE_HISTORICO = (
    "07_TOOLBOX/datos_gobernados/HF_EXPEDIENTE_001.json"
)


def serializacion_canonica(objeto) -> str:
    return json.dumps(
        objeto,
        ensure_ascii=False,
        indent=2,
        sort_keys=True,
    )


def sha256_canonico(objeto) -> str:
    return hashlib.sha256(
        serializacion_canonica(objeto).encode("utf-8")
    ).hexdigest()


def cargar_insumos(entrada: dict[str, str]) -> dict:
    """Carga y verifica los insumos declarados. ``entrada``: {clave: ruta}.

    FALLA con mensaje explícito si un insumo declarado no existe o no es JSON.
    """
    resultado = {}
    for clave, ruta in entrada.items():
        if not os.path.isfile(ruta):
            raise FileNotFoundError(f"insumo '{clave}' no existe: {ruta}")
        try:
            with open(ruta, "r", encoding="utf-8") as f:
                resultado[clave] = json.load(f)
        except json.JSONDecodeError as exc:
            raise ValueError(
                f"insumo '{clave}' no es JSON válido: {ruta} ({exc.msg})"
            )
    return resultado


def construir_expediente_gobernado(
    identidad: dict,
    outlet: dict,
    geomorfologia: dict,
    decisiones: list,
    restricciones: list,
    q5: dict,
    racional: dict,
    insumos_hash: dict[str, str],
) -> dict:
    """Constructor PURO del expediente gobernado.

    Parametros:
        identidad: id, nombre, ot_identificador.
        outlet: lat, lon, cota_msnm (punto D-03).
        geomorfologia: area_km2, perimetro_km, lcp_km, scp_m_m, sc_m_m,
            dh_msnm, dd_km_km2.
        decisiones: lista de decisiones ratificadas (dict).
        restricciones: lista de restricciones (dict).
        q5: definición de Q-5 conforme D-11.
        racional: dict del contraste Racional (no adoptivo).
        insumos_hash: {clave: sha256} de cada insumo gobernado.

    Returns:
        dict con claves ``cuerpo``, ``metadatos_control`` y ``expediente``
        (merge), más ``hash_expediente`` y ``hash_cuerpo``.
    """
    cuerpo = {
        "01_Identidad": {
            "id": identidad.get("id"),
            "nombre": identidad.get("nombre"),
            "ot_identificador": identidad.get("ot_identificador"),
        },
        "02_Outlet_D03": {
            "lat": outlet.get("lat"),
            "lon": outlet.get("lon"),
            "cota_msnm": outlet.get("cota_msnm"),
            "crs": "EPSG:4326",
        },
        "03_Geomorfologia": {
            "area_km2": geomorfologia.get("area_km2"),
            "perimetro_km": geomorfologia.get("perimetro_km"),
            "lcp_km": geomorfologia.get("lcp_km"),
            "scp_m_m": geomorfologia.get("scp_m_m"),
            "sc_m_m": geomorfologia.get("sc_m_m"),
            "dh_msnm": geomorfologia.get("dh_msnm"),
            "dd_km_km2": geomorfologia.get("dd_km_km2"),
            "nota_scp_sc": (
                "Scp y Sc se registran por separado (C-04); pendiente de cálculo "
                "formal en GATE 2."
            ),
        },
        "04_Hidrologia": {
            "P": None,
            "CN": None,
            "Tr": None,
            "I": None,
            "Q_5": None,
            "Q_p": None,
            "estado": (
                "Hidrología formal no ejecutada (GATE 2 pendiente); no se recalculan "
                "variables reales."
            ),
        },
        "05_Decisiones_Profesionales": decisiones,
        "06_Restricciones": restricciones,
        "07_D11_Q5": q5,
        "08_Contraste_Racional": racional,
        "09_Antecedente_Historico": {
            "expediente": RUTA_EXPEDIENTE_HISTORICO,
            "sha256": HASH_EXPEDIENTE_HISTORICO,
            "tratamiento": (
                "preservado íntegro; no sobrescrito por el expediente gobernado."
            ),
        },
        "10_Firmas_Hash_Insumos": {
            "insumos": insumos_hash,
            "nota": (
                "Nada de la insumos_hash hace parte del hash del cuerpo; se "
                "registra como trazabilidad, no como contenido reproducible."
            ),
        },
    }

    hash_cuerpo = sha256_canonico(cuerpo)

    metadatos_control = {
        "00_Control": {
            "tipo": "expediente_gobernado",
            "version": "1.0",
            "es_reproducible": True,
            "fecha_generacion": "2026-09-20",
            "motor_version": "HF-EXPEDIENTE-GOBERNADO",
            "nota": (
                "Los metadatos de control quedan FUERA del hash; solo el cuerpo "
                "es reproducible."
            ),
        }
    }

    expediente = {**metadatos_control, "hash_cuerpo": hash_cuerpo, **cuerpo}
    hash_expediente = sha256_canonico(expediente)

    return {
        "cuerpo": cuerpo,
        "metadatos_control": metadatos_control,
        "expediente": expediente,
        "hash_cuerpo": hash_cuerpo,
        "hash_expediente": hash_expediente,
    }


def escribir_artefacto_construido(construido: dict) -> dict:
    """Escribe el expediente en datos gobernados si existe el nombre estipulado.

    Retorna dict con ``ruta`` y ``hash_archivo``. Por seguridad de la
    corrección C-04 no escribe sobre HF_EXPEDIENTE_001.json.
    """
    payload = serializacion_canonica(construido["expediente"])
    return {
        "ruta": None,
        "hash_archivo": hashlib.sha256(payload.encode("utf-8")).hexdigest(),
        "payload": payload,
    }


def construir_entrada_desde_archivo(ruta_entrada: str) -> dict:
    """Lee el manifiesto de entrada (JSON) y lo devuelve tal cual."""
    if not os.path.isfile(ruta_entrada):
        raise FileNotFoundError(f"el manifiesto de entrada no existe: {ruta_entrada}")
    with open(ruta_entrada, "r", encoding="utf-8") as f:
        return json.load(f)


def resolver_ruta_entrada(ruta: str | None) -> str:
    """Resuelve el manifiesto de entrada (arg > env > CWD)."""
    if ruta:
        return str(Path(ruta).resolve())
    env = os.environ.get("HF_GEO_MANIFIESTO")
    if env:
        return str(Path(env).resolve())
    cwd = Path.cwd() / "manifiesto_expediente_gobernado.json"
    if cwd.is_file():
        return str(cwd)
    raise FileNotFoundError(
        "No se recibió '--entrada' ni 'HF_GEO_MANIFIESTO' ni manifiesto en CWD."
    )


def main():
    parser = argparse.ArgumentParser(
        description="HF-EXPEDIENTE-GOBERNADO (C-04, determinista)"
    )
    parser.add_argument("--entrada", default=None,
                        help="Manifiesto JSON de insumos del expediente")
    parser.add_argument("--out-dir", default=None,
                        help="Directorio de salida (por defecto: datos gobernados)")
    parser.add_argument("--salida", default=None,
                        help="Nombre del archivo de salida "
                             "(no puede ser HF_EXPEDIENTE_001.json)")
    args = parser.parse_args()

    manifiesto = construir_entrada_desde_archivo(resolver_ruta_entrada(args.entrada))
    for clave in ("identidad", "outlet", "geomorfologia", "decisiones",
                  "restricciones", "q5", "racional", "insumos_hash"):
        if clave not in manifiesto:
            raise ValueError(f"el manifiesto de entrada no declara '{clave}'")

    construido = construir_expediente_gobernado(
        identidad=manifiesto["identidad"],
        outlet=manifiesto["outlet"],
        geomorfologia=manifiesto["geomorfologia"],
        decisiones=manifiesto["decisiones"],
        restricciones=manifiesto["restricciones"],
        q5=manifiesto["q5"],
        racional=manifiesto["racional"],
        insumos_hash=manifiesto["insumos_hash"],
    )

    nombre_salida = args.salida or "HF_EXPEDIENTE_GOBERNADO_001.json"
    if Path(nombre_salida).name == "HF_EXPEDIENTE_001.json":
        raise ValueError(
            "NO se permite sobrescribir HF_EXPEDIENTE_001.json (C-04/D-13)."
        )

    out_dir = args.out_dir or resolver_datos_gobernados()
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, nombre_salida)

    payload = serializacion_canonica(construido["expediente"])
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(payload)

    print("=== HF-EXPEDIENTE-GOBERNADO (C-04) ===")
    print("manifiesto:", resolver_ruta_entrada(args.entrada))
    print("identidad:", construido["expediente"]["01_Identidad"])
    print("hash_cuerpo:", construido["hash_cuerpo"])
    print("hash_expediente:", construido["hash_expediente"])
    print("archivo:", out_path)
    print("antecedente histórico (sin sobrescritura):",
          HASH_EXPEDIENTE_HISTORICO)


if __name__ == "__main__":
    main()