# OT-0046G2B2A — Diagnóstico runtime P-Ia/área/estación/hidros

## Objetivo

Medir en runtime real por qué el expediente seguía exportando lluvia efectiva e hidrogramas en cero.

## Resultado runtime

La instrumentación temporal mostró que el motor sí calcula valores hidrológicos positivos.

## Lluvia efectiva runtime

- CNact: 94
- S: 16,21 mm
- Ia: 3,24 mm
- Ptotal: 73,41 mm
- Pe filas positivas: 20 a 36 según refresco/runtime observado
- Pe total: 56,652 mm
- Área params: 46,8516 km²
- Estación IDF activa: 2701046 / SAN CRISTOBAL
- AMC: II
- Porcentaje impermeable: 60
- CN base: 88

## Hidrogramas runtime

Se observaron hidrogramas positivos para los métodos evaluados:

- SCS con Qp positivo, Tp positivo y volumen integrado positivo.
- SCS Modificado con Qp positivo, Tp positivo y volumen integrado positivo.
- Snyder con Qp positivo, Tp positivo y volumen integrado positivo.
- Williams & Hann con Qp positivo, Tp positivo y volumen integrado positivo.
- Clark IUH con Qp positivo, Tp positivo y volumen integrado positivo.

Valores representativos observados:

- SCS: Qp aproximado 179–184 m³/s; volumen aproximado 2.654.250,9 m³.
- SCS Modificado: Qp aproximado 177–181 m³/s.
- Snyder: Qp aproximado 124,65 m³/s.
- Williams & Hann: Qp aproximado 492–518 m³/s.
- Clark IUH: Qp aproximado 94,26 m³/s.

## Dictamen

El cero exportado al expediente no nace en:

- fórmula SCS-CN;
- condición P <= Ia;
- área de cuenca;
- estación IDF;
- convolución hidrológica Q(t).

El motor calcula lluvia efectiva e hidrogramas positivos en runtime.

## Nueva hipótesis principal

El problema está en la publicación o transferencia hacia el expediente:

hidros runtime positivos
→ hidrogramasQ5Exportables
→ contextoBase.hidrogramas
→ obtenerMetodosQ5Validos / metodosQ5Payload
→ construirPayloadExpedienteDesdeEstado
→ expediente

## Decisión

OT-0046G2B2A se cierra como diagnóstico runtime.

La instrumentación temporal fue retirada antes de versionar documentación.

## Restricciones cumplidas

- No se modificaron fórmulas hidrológicas.
- No se modificó el motor.
- No se maquillaron valores.
- No se inventaron datos.
- No se dejó instrumentación temporal versionada.

## Siguiente sub-OT recomendada

OT-0046G2B2B — Auditoría de publicación de hidros positivos hacia contextoBase/metodosQ5Payload.
