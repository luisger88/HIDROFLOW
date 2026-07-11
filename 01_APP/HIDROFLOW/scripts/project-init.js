import fs from "fs";
import path from "path";

const otId = process.argv[2];

if (!otId) {
  console.error(
    "Uso: npm run project:init -- OT-HF-001"
  );
  process.exit(1);
}

const baseDir =
  path.join(
    "D:",
    "HidroFlow",
    "02_PROYECTOS",
    otId
  );

[
  baseDir,
  path.join(baseDir, "data"),
  path.join(baseDir, "expediente")
].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true
    });
  }
});

const proyecto = {
  metadata: {
    version: "1.0.0",
    createdAt: new Date().toISOString(),
    otId
  },
  geografia: {},
  hidrologia: {
  tc_criterio: {},
  cn_trazabilidad: {}
},
  configuracion: {},
  resultados: {},
  expediente: {}
};

fs.writeFileSync(
  path.join(
    baseDir,
    `${otId}.hfproj`
  ),
  JSON.stringify(
    proyecto,
    null,
    2
  ),
  "utf8"
);

console.log(
  `✅ Proyecto ${otId} inicializado`
);
