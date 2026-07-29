# HF-PROD-005G — Diseño del Adaptador de Contrato de Cuenca

## Objetivo

Derivar CONTRATO_CUENCA_V1 a partir de datos operativos sin acoplar gobernanza y operación.

## Entrada

- params.lat_salida
- params.lon_salida
- params.nombre_cuenca
- TR_LIST

## Salida

- contratoCuenca.entradaUsuario
- contratoCuenca.contextoFisicoDerivado

## Restricciones

- No modificar params
- No modificar casoActivo
- No modificar onContextoComparador
- No modificar motores hidrológicos

## Principio

Gobernanza ≠ Operación

El adaptador deriva información.

No gobierna información.

## Fase siguiente

Implementar derivarContratoCuenca.js como función pura.
