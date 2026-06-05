# OT-0015C — Congelamiento operativo de LEGACY

## Objetivo

Definir el tratamiento operativo de la carpeta 09_LEGACY para evitar crecimiento descontrolado de respaldos históricos dentro del repositorio HidroFlow.

## Evidencia

El inventario operativo de OT-0015 mostró que 09_LEGACY contiene múltiples respaldos históricos de versiones previas de HidroFlow, especialmente archivos grandes tipo HidroFlow_PRE_*.jsx y HidroFlow_BACKUP_*.jsx.

Estos archivos conservan valor histórico, pero no forman parte del flujo activo de desarrollo.

## Decisión

09_LEGACY queda declarada como carpeta histórica congelada.

No se deben agregar nuevos respaldos manuales a 09_LEGACY sin una decisión explícita documentada.

No se eliminan archivos existentes en esta fase.

## Política

- 09_LEGACY se conserva solo como referencia histórica.
- No debe usarse para respaldos cotidianos.
- No debe usarse como mecanismo de control de versiones.
- Git será la fuente principal de historial.
- Los respaldos nuevos, si son necesarios, deberán justificarse y preferiblemente quedar fuera del repo activo.
- Cualquier limpieza futura de 09_LEGACY requerirá inventario previo y decisión separada.

## Dictamen

El problema no es la existencia de LEGACY, sino su posible crecimiento futuro.

La acción correcta en esta fase es congelar su uso, no borrar su contenido.

## Estado

Política documental. Sin cambios funcionales.
