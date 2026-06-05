# OT-0015A — Apertura saneamiento operativo y reducción de dependencia IA

## Objetivo

Abrir una fase de saneamiento operativo para reducir la dependencia del chat/IA en tareas repetitivas de HidroFlow, controlar el crecimiento de archivos y fortalecer el flujo reproducible del proyecto.

## Tesis

HidroFlow no debe depender de instrucciones manuales extensas ni de memoria conversacional para operar. La IA debe actuar como auditor y arquitecto técnico, mientras que las operaciones repetitivas deben quedar soportadas por scripts, reglas de repositorio y estructura limpia.

## Alcance inicial

- Consolidar herramientas PowerShell permanentes.
- Reducir pasos manuales repetitivos.
- Auditar crecimiento de archivos por carpetas.
- Identificar exceso de backups, bitácoras e inventarios.
- Definir reglas de qué se versiona y qué queda local.
- Mantener intacta la app funcional y el motor hidrológico.

## Restricciones

- No borrar archivos sin inventario previo.
- No renombrar HidroFlow todavía.
- No crear nuevo repositorio todavía.
- No modificar motor hidrológico.
- No modificar fórmulas.
- No eliminar trazabilidad histórica.
- No introducir cambios funcionales sin build.

## Decisión inicial

No se hará borrón y cuenta nueva. Se hará saneamiento progresivo, automatizado y auditable.

## Estado

Apertura documental. Sin cambios funcionales.
