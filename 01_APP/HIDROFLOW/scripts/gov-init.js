import fs from "fs";

const otId = process.argv[2];

if (!otId) {
  console.error(
    "Error: Debes especificar el ID de la OT (ej: OT-CALC-001)"
  );
  process.exit(1);
}

const estado = {
  puntoControl: "La Iguaná PC_80",

  estadoActual: `${otId} abierta`,

  conocimientoDisponible: [
    "Formulación inicial"
  ],

  memoriaTecnica: [
    `${otId} · Apertura`
  ],

  situacionActual: {
    siguientePaso: "Formular hipótesis",
    generable: `${otId}_APERTURA.md`
  }
};

const contenido =
`export const ORQUESTADOR_ESTADO = ${JSON.stringify(
  estado,
  null,
  2
)};`;

fs.writeFileSync(
  "./src/data/orquestadorEstado.js",
  contenido
);

console.log(
  `✅ Contexto institucional actualizado para ${otId}`
);
