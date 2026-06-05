# OT-0011B — Diseño de Rango Competente Tc

## Estado de entrada

- Rama: ot-0011-rango-tc-bruto-competente
- OT-0011A cerrada con commit 13ae409.
- Cambio previo: etiqueta visual de Rango Tc a Rango bruto Tc en IndiceHidrologico.jsx.
- Build Vite aprobado.
- Working tree limpio antes de iniciar OT-0011B.

## Tesis Senior

El cálculo hidrológico permanece intacto.
La competencia técnica permanece en la matriz existente.
El Agente Tc solo transporta estado.
El Índice Hidrológico solo visualiza y comunica.
El Rango competente Tc debe ser una derivación trazable de métodos ya calculados y evaluados, no una nueva fórmula ni un umbral inventado.

## Evidencia ya auditada

### Rango bruto Tc

El rango actual mostrado por el Índice Hidrológico se calcula desde tcState.metodosTc tomando todos los valores numéricos positivos.

Por tanto, el rango actual corresponde a rango bruto Tc.

### Competencia técnica

La competencia técnica ya existe en matrizCompetenciaComparador.js mediante evaluarCompetenciaMetodo, evaluarCompetenciaComparador y resumirCompetenciaComparador.

Cada método evaluado puede incluir:

- estadoCompetencia
- semaforo
- puntajeCompetencia
- justificacionCompetencia

### Incompatibilidad de claves detectada

mapTcResultados genera claves:

- Kirpich
- Temez
- California
- Giandotti
- Perez
- SCS

El catálogo de competencia usa IDs:

- tc_kirpich
- tc_temez
- tc_california
- tc_giandotti
- tc_perez_montoya
- tc_scs_ranser

Por tanto, se requiere un adaptador explícito antes de calcular rango competente Tc.

## Adaptador candidato

tc_kirpich -> Kirpich
tc_temez -> Temez
tc_california -> California
tc_giandotti -> Giandotti
tc_perez_montoya -> Perez
tc_scs_ranser -> SCS

## Regla de no intervención

Durante el diseño de OT-0011B queda prohibido:

- Modificar hidroEngine.js
- Modificar tcSelector.js
- Modificar tcAgent.js
- Modificar fórmulas Tc
- Modificar Tc_final
- Modificar mapTcResultados
- Introducir constantes de rango competente
- Introducir setTimeout
- Introducir console.log permanentes
- Usar IndiceHidrologico.corregido.jsx

## Preguntas de diseño pendientes

1. Dónde debe vivir el adaptador id catálogo -> clave metodosTc.
2. Si ComparadorMultiMetodo.jsx debe publicar evaluacionCompetenciaTc.
3. Si IndiceHidrologico.jsx debe calcular visualmente el rango competente.
4. Cómo mostrar ausencia de métodos competentes.
5. Cómo validar que Tc sugerido, métodos válidos y rango bruto no cambien.

## Criterio preliminar de rango competente

El rango competente Tc debe calcularse únicamente con métodos cuyo estadoCompetencia sea competente y que tengan valor numérico positivo disponible en tcState.metodosTc.

## Estado

Documento de apertura. Sin cambios funcionales aplicados.

## Decisión de arquitectura propuesta

La derivación del Rango competente Tc debe vivir inicialmente en ComparadorMultiMetodo.jsx, porque allí coexisten los valores numéricos de metodosTc y la evaluación técnica evaluacionCompetencia.

El Agente Tc no debe modificarse. Su responsabilidad se mantiene como transporte reactivo de estado mediante getTcState, setTcState y subscribeTc.

IndiceHidrologico.jsx no debe conocer reglas de competencia ni detalles del mapeo entre IDs del catálogo y claves internas del motor. Debe limitarse a visualizar rangoCompetenteTc si está disponible.

La arquitectura recomendada queda definida como:

- Motor hidrológico: calcula valores Tc.
- Matriz de competencia: evalúa competencia técnica.
- ComparadorMultiMetodo.jsx: integra metodosTc con evaluacionCompetencia y deriva rangoCompetenteTc.
- tcAgent.js: transporta estado sin cambios.
- IndiceHidrologico.jsx: visualiza Rango bruto Tc y Rango competente Tc.

Esta decisión no autoriza todavía cambios funcionales. Cualquier implementación posterior deberá ser mínima, auditable y validada con build.
