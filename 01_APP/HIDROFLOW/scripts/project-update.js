import fs from "fs";
import path from "path";

const [otId, seccion, valorJson] =
  process.argv.slice(2);

if (!otId || !seccion || !valorJson) {
  console.error(
    "Uso: npm run project:update -- <OT-ID> <SECCION> <JSON>"
  );
  process.exit(1);
}

const ruta = path.join(
  "D:",
  "HidroFlow",
  "02_PROYECTOS",
  otId,
  `${otId}.hfproj`
);

if (!fs.existsSync(ruta)) {
  console.error(
    `Proyecto no encontrado: ${ruta}`
  );
  process.exit(1);
}

const proyecto =
  JSON.parse(
    fs.readFileSync(
      ruta,
      "utf8"
    )
  );

const nuevosDatos =
  JSON.parse(valorJson);

proyecto[seccion] = {
  ...proyecto[seccion],
  ...nuevosDatos
};

fs.writeFileSync(
  ruta,
  JSON.stringify(
    proyecto,
    null,
    2
  ),
  "utf8"
);

console.log(
  `✅ Proyecto ${otId} actualizado en ${seccion}`
);