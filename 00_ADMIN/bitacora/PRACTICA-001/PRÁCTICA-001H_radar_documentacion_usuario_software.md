# PRÁCTICA-001H — Radar documentación de usuario y software

## 1. Propósito

Registrar como radar arquitectónico que HidroFlow, en su estado maduro, debe incluir documentación formal para usuarios, operación y mantenimiento del software.

Esta documentación debe permitir que HidroFlow sea entendible, portable, mantenible y operable por personas distintas a quien desarrolló inicialmente el sistema.

## 2. Contexto

Durante PRÁCTICA-001F y PRÁCTICA-001G se consolidó la necesidad de portabilidad, configuración local y manifiestos por fuente hídrica.

A partir de esa línea arquitectónica, se identifica que HidroFlow también debe contar con documentación formal para su adopción, operación y mantenimiento.

## 3. Documentos objetivo

Cuando HidroFlow madure, se debe incluir al menos:

```text
Guía de usuario
Guía del software
Manual operativo
Documentación técnica-operativa
```

## 4. Guía de usuario

La Guía de usuario debe estar orientada a quien usa HidroFlow para operar un proyecto hidrológico o geomorfológico.

Debe explicar, como mínimo:

```text
Cómo configurar HidroFlow en una máquina
Cómo crear o seleccionar una fuente hídrica
Cómo preparar o referenciar el MDT
Cómo generar productos geomorfológicos
Cómo revisar las exportaciones
Cómo interpretar el Índice Hidrológico
Cómo interpretar el Comparador Multi-Método
Cómo generar o copiar el expediente hidrológico
Cómo reconocer advertencias y restricciones técnicas
```

## 5. Guía del software

La Guía del software debe estar orientada a personas que mantengan, desarrollen o auditen HidroFlow.

Debe explicar, como mínimo:

```text
Arquitectura general del repositorio
Estructura de carpetas
Configuración portable
Manifiestos por fuente hídrica
Módulo 1 de Geomorfología
Dependencia actual ArcGIS Pro / ArcPy
Ruta futura hacia backend abierto
Motor hidrológico
App React HidroFlow
Tooling PowerShell
Convenciones Git y Pull Request
Reglas de auditoría técnica
Reglas de no modificación del motor sin auditoría previa
```

## 6. Manual operativo

El Manual operativo debe documentar la operación diaria del proyecto.

Debe incluir, como mínimo:

```text
Comandos frecuentes
Creación de ramas
Creación de bitácoras
Commit y push
Creación de Pull Request
Sincronizar-MainPostMerge
Validación de build
Manejo de advertencias
Control de archivos locales
Control de archivos versionados
```

## 7. Ubicación documental futura

Se propone evaluar una estructura documental futura como:

```text
00_ADMIN/documentacion/
├── GUIA_USUARIO_HIDROFLOW.md
├── GUIA_SOFTWARE_HIDROFLOW.md
├── MANUAL_OPERATIVO_HIDROFLOW.md
└── ARQUITECTURA_HIDROFLOW.md
```

Esta ubicación podrá ajustarse en una práctica posterior si se define una carpeta docs pública o técnica.

## 8. Regla de madurez

HidroFlow no se considera maduro solo por ejecutar cálculos. También debe ser comprensible, documentado, portable, auditable y transferible.

## 9. Decisión preliminar

Se registra como radar arquitectónico que HidroFlow debe incorporar Guía de usuario, Guía del software, Manual operativo y documentación técnica-operativa en una fase posterior de madurez.

## 10. Próximo paso

Versionar este radar documental y abrir Pull Request PRÁCTICA-001H.
