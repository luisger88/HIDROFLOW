# sig/pipeline.py

class SIGPipeline:
    """
    Pipeline principal del módulo SIG de HidroFlow.
    Coordina la delimitación de cuencas y el cálculo morfométrico.
    """

    def __init__(self, backend="arcpy", workspace=None):
        self.backend_name = backend
        self.workspace = workspace
        self.backend = None

    def _load_backend(self):
        if self.backend_name == "arcpy":
            from sig.backend.arcpy_backend import ArcPyBackend
            self.backend = ArcPyBackend(self.workspace)
        elif self.backend_name == "open":
            from sig.backend.open_backend import OpenBackend
            self.backend = OpenBackend(self.workspace)
        else:
            raise ValueError(f"Backend SIG desconocido: {self.backend_name}")

    def run(self, outlet):
        # 1. Validación básica del outlet
        required_keys = {"x", "y", "epsg"}
        if not required_keys.issubset(outlet):
            raise ValueError("El outlet debe contener x, y y epsg")

        # 2. Cargar backend
        self._load_backend()

        # 3. Ejecutar delimitación SIG (abstracto por ahora)
        cuenca_geom = self.backend.delimitar_cuenca(outlet)

        # 4. Calcular morfometría
        from sig.morfometria import calcular_morfometria
        resultados = calcular_morfometria(cuenca_geom)

        # 5. Agregar metadata
        resultados["metadata"] = {
            "backend": self.backend_name,
            "epsg": outlet["epsg"]
        }

        return resultados