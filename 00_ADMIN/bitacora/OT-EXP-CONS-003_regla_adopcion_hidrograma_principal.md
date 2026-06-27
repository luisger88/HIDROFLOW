# OT-EXP-CONS-003

## Problema observado

Tr activo = 100 años.

Tabla multiescenario:
SCS = 20,62 m³/s.

Expediente:
Qp = 17,13 m³/s.

La publicación del hidrograma principal no está sincronizada con el escenario Tr activo.

## Decisión adoptada

El hidrograma principal del expediente será el hidrograma adoptado técnicamente
para el escenario Tr activo.

La adopción no se realizará por:

- primer método encontrado,
- promedio de métodos,
- orden interno de arreglos,
- orden visual del comparador.

La adopción se realizará mediante:

1. Tr activo vigente.
2. Lluvia de diseño asociada al Tr activo.
3. CN efectivo vigente.
4. Tc adoptado.
5. Método competente para la cuenca.
6. Hidrograma resultante del escenario activo.

## Regla operativa

Si el usuario cambia:

Tr 2.33
Tr 5
Tr 10
Tr 25
Tr 50
Tr 100

el expediente deberá actualizar automáticamente:

- Q diseño
- Hidrograma principal
- Qp
- Tp
- Volumen

sin conservar resultados de escenarios anteriores.

## Criterio de consistencia

Queda prohibido publicar en el mismo expediente:

Tr activo = A

y

Qp perteneciente a Tr = B

porque rompe la trazabilidad hidrológica del documento.

## Resultado esperado

Ejemplo:

Tr activo = 100 años

↓

Q diseño = 20,62 m³/s

↓

Hidrograma principal = escenario Tr 100

↓

Qp publicado = 20,62 m³/s

o el valor real correspondiente al método adoptado para ese mismo escenario.

## Estado

Decisión arquitectónica aprobada.

Pendiente de implementación en código mediante OT‑EXP‑CONS‑004.