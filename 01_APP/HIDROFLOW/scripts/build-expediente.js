import fs from "fs";
import path from "path";

const otId = process.argv[2];
if (!otId) process.exit(1);

const ruta = path.join(
  "D:",
  "HidroFlow",
  "02_PROYECTOS",
  otId,
  `${otId}.hfproj`
);

const proyecto = JSON.parse(
  fs.readFileSync(ruta, "utf8")
);

const params =
  proyecto.estado_operativo?.params || {};

proyecto.expediente.caso = {
  id_proyecto: otId
};

proyecto.expediente.cuenca = {
  nombre:
    params.nombre_cuenca ??
    "No definido"
};

fs.writeFileSync(
  ruta,
  JSON.stringify(proyecto, null, 2),
  "utf8"
);

console.log(
  `✅ Expediente reconstruido para ${otId}`
);
