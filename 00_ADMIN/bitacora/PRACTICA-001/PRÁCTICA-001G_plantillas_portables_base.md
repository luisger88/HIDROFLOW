# PRÁCTICA-001G — Plantillas portables base

## 1. Propósito

Crear plantillas versionables para que HidroFlow pueda configurarse de forma portable en distintas máquinas sin endurecer rutas absolutas dentro del código fuente.

## 2. Artefactos creados

```text
.hidroflow.local.example.json
05_PROYECTOS/Iguana/manifesto.proyecto.example.json
```

## 3. Archivo local no versionable

El archivo real de configuración por máquina será:

```text
.hidroflow.local.json
```

Este archivo no debe versionarse si contiene rutas locales específicas, por lo cual queda protegido en .gitignore.

## 4. Configuración local portable

La plantilla .hidroflow.local.example.json define variables conceptuales como HF_ROOT, rutas base, ruta MDT, GDB rectora, backend geomorfológico y reglas de consumo.

## 5. Manifiesto por fuente hídrica

La plantilla manifesto.proyecto.example.json define la estructura mínima del proyecto Iguana, sus rutas portables, productos espaciales mínimos y productos tabulares mínimos.

## 6. Decisión arquitectónica

HidroFlow no debe depender de rutas absolutas rígidas ni de configuraciones locales incrustadas en el código.

La App debe consumir exportaciones canónicas validadas, no una GDB externa directamente.

## 7. Próximo paso

Validar estructura de plantillas, versionarlas en Git y abrir Pull Request PRÁCTICA-001G.
