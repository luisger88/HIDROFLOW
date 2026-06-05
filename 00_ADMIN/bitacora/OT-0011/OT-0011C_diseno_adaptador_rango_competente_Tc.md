# OT-0011C — Diseño del adaptador mínimo para Rango competente Tc

## Estado de entrada

- Rama: ot-0011-rango-tc-bruto-competente
- OT-0011A cerrada con commit 13ae409.
- OT-0011B documentada con commits 6a1652d y 4471a98.
- Working tree limpio antes de iniciar OT-0011C.

## Objetivo

Diseñar el adaptador mínimo que permita derivar Rango competente Tc a partir de valores Tc ya calculados y de la evaluación técnica ya existente.

El adaptador no debe recalcular Tc, no debe modificar el motor hidrológico y no debe introducir umbrales manuales.

## Tesis Senior

El adaptador debe ser una función pura, localizable, testeable y reversible.

No debe modificar metodosTc.
No debe modificar evaluacionCompetencia.
No debe recalcular Tc.
No debe cambiar Tc_final.
No debe cambiar mapTcResultados.
No debe tocar hidroEngine.js.
No debe tocar tcSelector.js.
No debe tocar tcAgent.js.

Su única responsabilidad será cruzar valores existentes con criterios existentes.

## Entradas del adaptador

El adaptador deberá recibir:

- metodosTc: objeto con valores numéricos Tc publicados por mapTcResultados.
- evaluacionCompetenciaTc: arreglo de métodos Tc evaluados por matrizCompetenciaComparador.js.

Ejemplo conceptual de metodosTc:

- Kirpich
- Temez
- California
- Giandotti
- Perez
- SCS

Ejemplo conceptual de evaluacionCompetenciaTc:

- tc_kirpich
- tc_temez
- tc_california
- tc_giandotti
- tc_perez_montoya
- tc_scs_ranser

## Adaptador de claves candidato

tc_kirpich -> Kirpich
tc_temez -> Temez
tc_california -> California
tc_giandotti -> Giandotti
tc_perez_montoya -> Perez
tc_scs_ranser -> SCS

tc_williams_hann no se incluye inicialmente porque mapTcResultados no lo publica dentro de metodosTc.

## Criterio de competencia

El filtro de competencia debe usar estrictamente:

estadoCompetencia == competente

No se usarán:

- umbrales manuales de Tc
- rangos hipotéticos
- puntajeCompetencia como sustituto del estado
- semaforo como sustituto del estado
- criterios duplicados en componentes visuales

## Salidas esperadas del adaptador

El adaptador deberá producir una estructura conceptual con:

- metodosTcCompetentes
- rangoCompetenteTc

metodosTcCompetentes deberá contener únicamente métodos con:

- valor numérico positivo disponible en metodosTc
- estadoCompetencia igual a competente
- id del catálogo trazable
- clave interna Tc trazable
- nombre del método
- justificacionCompetencia conservada

rangoCompetenteTc deberá contener:

- min
- max
- n

Si no existen métodos competentes válidos, rangoCompetenteTc debe ser null.

## Casos borde obligatorios

1. evaluacionCompetenciaTc ausente o vacía.
2. metodosTc ausente o vacío.
3. método competente sin clave equivalente en metodosTc.
4. clave existente con valor no numérico.
5. clave existente con valor menor o igual a cero.
6. ningún método competente válido.

En todos los casos, el sistema debe conservar Rango bruto Tc sin cambios.

## Ubicación candidata

Se propone que el adaptador viva inicialmente cerca de la integración en ComparadorMultiMetodo.jsx o como archivo auxiliar pequeño si se decide privilegiar limpieza y prueba aislada.

Opción A:

ComparadorMultiMetodo.jsx

Ventaja: cambio mínimo y localizado.
Riesgo: aumenta responsabilidad del componente.

Opción B:

Archivo auxiliar externo, por ejemplo:

01_APP/HIDROFLOW/src/services/tc/derivarRangoCompetenteTc.js

Ventaja: función pura, testeable y reusable.
Riesgo: crea archivo nuevo e import adicional.

## Recomendación preliminar

Para una implementación robusta y mantenible, se recomienda usar un adaptador externo pequeño, sin dependencias del motor, importado por ComparadorMultiMetodo.jsx.

ComparadorMultiMetodo.jsx integraría:

- metodosTc
- evaluacionCompetencia.tc
- adaptador de rango competente

y publicaría en setTcState:

- rangoCompetenteTc
- metodosTcCompetentes

tcAgent.js permanecería sin cambios.

IndiceHidrologico.jsx solo visualizaría rangoCompetenteTc si está disponible.

## Criterios de aceptación futura

Antes de implementar, la solución deberá garantizar:

1. Rango bruto Tc permanece sin cambios.
2. Tc sugerido permanece sin cambios.
3. Métodos válidos permanece sin cambios.
4. Rango competente Tc se deriva solo de métodos competentes.
5. No se modifica hidroEngine.js.
6. No se modifica tcSelector.js.
7. No se modifica tcAgent.js.
8. Build Vite debe aprobar.
9. git diff debe mostrar cambios mínimos y auditables.

## Estado

Documento de diseño. Sin cambios funcionales aplicados.
