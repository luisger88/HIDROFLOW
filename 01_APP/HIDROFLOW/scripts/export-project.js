import fs from "fs";
import { crearContratoCuencaVacio } from "../src/data/contratoCuenca.js";

const otId = process.argv[2];

if (!otId) {
  console.error("Debe especificar una OT. Ejemplo: OT-HF-001");
  process.exit(1);
}

const contrato = crearContratoCuencaVacio();

contrato.cuenca.nombre = otId;
contrato.version = "1.0.0";

const proyecto = {
  schema: "HFPROJ_v1",
  version: "1.0.0",
  createdAt: new Date().toISOString(),
  projectOwner: "Luis German Montoya",
  projectStatus: "ACTIVE",
  contratoCuenca: contrato
};

const carpeta = "D:/HidroFlow/02_PROYECTOS";

if (!fs.existsSync(carpeta)) {
  fs.mkdirSync(carpeta, { recursive: true });
}

const ruta = `${carpeta}/${otId}.hfproj`;

fs.writeFileSync(ruta, JSON.stringify(proyecto, null, 2), "utf8");

console.log(`Proyecto exportado: ${ruta}`);
