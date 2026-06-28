# OT-EXP-CONS-004A

## Resultado de auditoría

Se confirma que:

- Tr activo cambia correctamente.
- El expediente recibe Tr activo correctamente.
- Q-Tr multiescenario responde correctamente.
- El hidrograma principal publicado no sigue el Tr activo.

## Hallazgo

El expediente publica Qp desde contextoBase.hidrogramas.

No existe sincronización explícita entre:

- tr_diseno_activo
- q_tr_multiescenario
- hidrograma principal publicado

## Estado

Auditoría cerrada.

Pendiente implementación OT-EXP-CONS-004.
