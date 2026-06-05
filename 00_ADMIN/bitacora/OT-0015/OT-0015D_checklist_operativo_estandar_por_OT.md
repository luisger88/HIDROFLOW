# OT-0015D — Checklist operativo estándar por OT

## Objetivo

Definir un checklist operativo mínimo para futuras Órdenes Técnicas de HidroFlow, reduciendo manualidad, dependencia del chat y proliferación documental innecesaria.

## Regla general

Toda OT futura debe seguir un flujo corto, reproducible y apoyado en tooling PowerShell.

La IA podrá apoyar como auditor técnico o arquitecto, pero no debe ser necesaria para recordar comandos básicos, rutas, commits, push, builds o sincronización post-merge.

## Checklist estándar

### 1. Crear rama

Desde main actualizado:

git checkout main
git pull origin main
git checkout -b nombre-rama
git push -u origin nombre-rama

### 2. Apertura corta

Crear un único documento de apertura con:

- objetivo
- tesis
- alcance
- restricciones
- estado

Usar Nueva-Bitacora.

### 3. Auditoría o cambio

Si es auditoría:

- usar comandos de lectura cortos
- documentar hallazgo
- confirmar con Nueva-Bitacora o Confirmar-Bitacora

Si es cambio funcional:

- aplicar parche mínimo
- validar con búsqueda corta o diff --stat
- ejecutar build si afecta app
- confirmar con Confirmar-CambioFuncional

### 4. Build

Todo cambio funcional en la app debe pasar por:

cd 01_APP/HIDROFLOW
npm run build

La advertencia de chunk size de Vite/Rollup se considera no bloqueante mientras no impida build.

### 5. Cierre corto

Crear un documento de cierre con:

- alcance ejecutado
- commits principales
- restricciones respetadas
- validación
- estado listo para PR

### 6. Pull Request

Crear PR hacia main.

El título debe seguir el patrón:

OT-XXXX — Nombre claro de la OT

### 7. Post-merge

Después de fusionar PR en GitHub, ejecutar:

Sincronizar-MainPostMerge

### 8. Límite documental

Regla recomendada:

- Apertura
- Evidencia/decisión
- Cierre

Solo se permiten más documentos cuando exista cambio funcional crítico o auditoría técnica compleja.

## Herramientas oficiales

Las funciones oficiales están en:

07_TOOLBOX/powershell/hidroflow-git-tools.ps1

Funciones disponibles:

- Ver-EstadoHidroFlow
- Confirmar-Bitacora
- Confirmar-CambioFuncional
- Nueva-Bitacora
- Sincronizar-MainPostMerge

## Dictamen

Este checklist reduce dependencia de la IA, evita comandos manuales repetitivos y convierte el flujo HidroFlow en un proceso reproducible.

## Estado

Política documental. Sin cambios funcionales.
