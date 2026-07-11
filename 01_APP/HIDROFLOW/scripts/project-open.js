import fs from "fs";

const otId = process.argv[2];

if (!otId) {
  console.error(
    "Uso: npm run project:open -- OT-HF-002"
  );
  process.exit(1);
}

const ruta =
  `D:/HidroFlow/02_PROYECTOS/${otId}/${otId}.hfproj`;

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

console.log(
  JSON.stringify(
    proyecto,
    null,
    2
  )
);
