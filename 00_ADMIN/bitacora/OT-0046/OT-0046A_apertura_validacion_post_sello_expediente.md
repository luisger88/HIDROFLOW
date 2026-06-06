# OT-0046A — Apertura validación post-sello de completitud global

## Objetivo

Abrir la validación post-sello del expediente hidrológico mínimo, verificando que la salida firmada conserve completitud global y no presente campos críticos vacíos.

## Problema

OT-0045 incorporó el sello técnico de generación al expediente. Durante la revisión se observó que algunos campos de identificación, como Estación IDF, pueden quedar vacíos bajo ciertas rutas de navegación.

## Tesis

Después de firmar técnicamente el expediente, debe certificarse que el documento completo mantenga todos los campos críticos poblados y que no existan líneas vacías, valores problemáticos ni contaminación de portapapeles.

## Alcance

Validar:

- identificación de cuenca;
- estación IDF;
- parámetros hidrológicos base;
- lluvia efectiva;
- volumen esperado;
- tabla Q-5 auditada;
- tabla Método Racional;
- contraste Q-5 vs Método Racional;
- sello técnico de generación;
- ausencia de campos críticos vacíos;
- ausencia de undefined, null, NaN y [object Object].

## Restricciones

- No usar caudales externos como fundamento.
- No usar SIATA para justificar caudales.
- No modificar hidroEngine.js.
- No modificar fórmulas hidrológicas.
- No alterar Qp.
- No alterar Tp.
- No alterar Volumen.
- No alterar Q(t).
- No introducir setTimeout.
- No introducir console.log permanentes.

## Estado

Apertura documental. Sin cambios funcionales.
