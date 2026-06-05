# OT-0015B — Política de archivos versionados y locales

## Objetivo

Definir una política operativa para controlar el crecimiento del repositorio HidroFlow, diferenciando archivos fuente, evidencia técnica, exportaciones, respaldos, inventarios y productos locales.

## Evidencia de diagnóstico

Se generó un inventario local en 10_LOGS mediante tooling PowerShell.

El diagnóstico confirma que el repositorio contiene una estructura raíz organizada, con carpetas funcionales como 00_ADMIN, 01_APP, 01_DEM_HIDRO, 06_EXPORTACIONES, 07_TOOLBOX, 09_LEGACY y 10_LOGS.

También se observa que los archivos más pesados corresponden principalmente a insumos DEM, rásteres, exportaciones y respaldos históricos.

## Dictamen

No procede un borrón y cuenta nueva.

HidroFlow conserva valor técnico, histórico y científico. La solución correcta es saneamiento progresivo y política de versionamiento, no eliminación impulsiva ni cambio de nombre inmediato.

## Política propuesta

### Se versiona

- Código fuente activo de la app.
- Scripts operativos permanentes.
- Bitácoras de decisiones técnicas relevantes.
- Configuración mínima del repositorio.
- Catálogos y datos livianos necesarios para reproducibilidad.

### No se versiona de forma rutinaria

- Inventarios locales generados automáticamente.
- Logs temporales.
- Builds de producción.
- node_modules.
- dist.
- Salidas intermedias pesadas no necesarias para reproducir una decisión.
- Nuevos respaldos manuales sin justificación.

### LEGACY

La carpeta 09_LEGACY se conserva como archivo histórico temporal, pero queda congelada.

No se deben seguir agregando respaldos nuevos a LEGACY sin una decisión explícita.

### Bitácoras futuras

Las OT futuras deben reducir documentación repetitiva.

Regla recomendada:

- Apertura.
- Evidencia/decisión.
- Cierre.

Solo se permiten más documentos si hay cambio funcional crítico o auditoría técnica compleja.

### Inventarios

Los inventarios locales se generan en 10_LOGS, pero no se versionan.

La regla ya fue incorporada en .gitignore:

10_LOGS/inventario_hidroflow_*.txt

## Decisiones

- No borrar HidroFlow.
- No renombrar el proyecto todavía.
- No migrar a nuevo repositorio todavía.
- Mantener saneamiento progresivo.
- Priorizar tooling y reproducibilidad.
- Reducir dependencia operativa del chat.

## Estado

Política documental. Sin cambios funcionales.
