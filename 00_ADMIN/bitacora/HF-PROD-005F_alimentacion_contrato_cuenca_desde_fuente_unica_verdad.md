# HF-PROD-005F — Alimentación del Contrato de Cuenca desde la Fuente Única de Verdad

## Antecedentes recuperados

### OT-GOV-002A

HF-GOV se definió como Productor Automático de Contexto Institucional.

El Orquestador consume la Fuente Única de Verdad Institucional mediante ORQUESTADOR_ESTADO.

### OT-0090E

Las coordenadas son la entrada.

La cuenca es una consecuencia.

El expediente es el producto.

La hidráulica es el consumidor final.

### OT-0013D

onContextoComparador no fue creado para gobernanza.

Fue creado para transportar contexto hidrológico normalizado hacia ComparadorMultiMetodo.

No debe asumirse como Fuente Única de Verdad Institucional.

## Evidencia de código auditada

### Orquestador

ORQUESTADOR_ESTADO
  ↓
getEstudioActivo()
  ↓
OrquestadorInstitucional

### Hidrología

params
  ↓
casoActivo
  ↓
expediente
  ↓
Q(t)

## Dictamen

Se confirma separación arquitectónica explícita:

Gobernanza ≠ Operación

ORQUESTADOR_ESTADO constituye la Fuente Única de Verdad Institucional.

casoActivo constituye un objeto operativo de contexto hidrológico.

CONTRATO_CUENCA_V1 debe alimentarse desde la Fuente Única de Verdad y no desde onContextoComparador.

## Próxima fase

HF-PROD-005G

Diseño del mecanismo de alimentación de CONTRATO_CUENCA_V1 desde ORQUESTADOR_ESTADO manteniendo independencia respecto a casoActivo y contexto hidrológico.
