import fs from "fs";
import path from "path";

const otId = process.argv[2];

if (!otId) {
  console.error(
    "Error: Debes especificar el ID de la OT (ej: OT-CALC-001)"
  );
  process.exit(1);
}

/* ==========================================================
   PAYLOAD INSTITUCIONAL ENRIQUECIDO
========================================================== */

const estado = {
  puntoControl: "La Iguaná PC_80",

  estadoActual: `${otId} abierta`,

  faseActual: "Apertura",

  responsable: "Ingeniería Hidrológica",

  estadoCertificacion: "Pendiente",

  conocimientoDisponible: [
    "Formulación inicial"
  ],

  memoriaTecnica: [
    `${otId} · Apertura`
  ],

  oiVigentes: [
    "OI-0031",
    "OI-0035"
  ],

  riesgos: [
    "Hipótesis no validada",
    "Sin certificación técnica"
  ],

  validacionesPendientes: [
    "Línea base",
    "Hipótesis",
    "Build"
  ],

  situacionActual: {
    siguientePaso: "Formular hipótesis",
    generable: `${otId}_APERTURA.md`
  }
};

/* ==========================================================
   FUENTE ÚNICA DE VERDAD
========================================================== */

const contenidoEstado =
  `export const ORQUESTADOR_ESTADO = ${JSON.stringify(
    estado,
    null,
    2
  )};`;

fs.writeFileSync(
  "./src/data/orquestadorEstado.js",
  contenidoEstado,
  "utf8"
);

/* ==========================================================
   REFERENCIA LIGERA
========================================================== */

const carpetaBitacora =
  "D:/HidroFlow/00_ADMIN/bitacora";

if (!fs.existsSync(carpetaBitacora)) {
  fs.mkdirSync(
    carpetaBitacora,
    {
      recursive: true
    }
  );
}

const archivoReferencia =
  path.join(
    carpetaBitacora,
    `${otId}_REFERENCIA.md`
  );

const contenidoReferencia = `
REFERENCIA OFICIAL

OT: ${otId}

Estado:
ABIERTA

Fuente canónica:

D:\\HidroFlow\\00_ADMIN\\HF-ARQ-00012\\${otId}

Fase:
${estado.faseActual}

Responsable:
${estado.responsable}

Estado de certificación:
${estado.estadoCertificacion}

OI vigentes:
${estado.oiVigentes.join(", ")}

Riesgos:
${estado.riesgos.join(", ")}

Validaciones pendientes:
${estado.validacionesPendientes.join(", ")}

Regla:

Consultar siempre la fuente canónica.
`;

fs.writeFileSync(
  archivoReferencia,
  contenidoReferencia.trim(),
  "utf8"
);

/* ==========================================================
   SALIDA
========================================================== */

console.log(
  `✅ Contexto institucional actualizado para ${otId}`
);

console.log(
  `✅ Referencia institucional creada: ${archivoReferencia}`
);