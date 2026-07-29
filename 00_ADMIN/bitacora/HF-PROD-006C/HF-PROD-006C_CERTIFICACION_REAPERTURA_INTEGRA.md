# HF-PROD-006C — Certificación de reapertura íntegra HFPROJ_v1

## Resultado

APROBADO.

## Evidencia visual

- Botón Abrir HFPROJ visible en barra superior.
- Botón Guardar HFPROJ visible en barra superior.
- Se ejecutó Guardar HFPROJ.
- La aplicación mostró confirmación de guardado HFPROJ.
- La aplicación permaneció visible después del guardado.

## Evidencia técnica

- build_certificacion.txt: build verde.
- evidencia_hfproj_restaurado_v3.json: archivo HFPROJ validado.
- El archivo OT-HF-003.hfproj contiene schema HFPROJ_v1.
- El archivo OT-HF-003.hfproj contiene contratoCuenca.
- contratoCuenca.hidrogramas contiene resultados Q-5 reales.

## Criterios aprobados

- Cuenca persistida/restaurable desde contratoCuenca.
- CN persistido/restaurable desde contratoCuenca.
- Tc persistido/restaurable desde contratoCuenca.
- Tr/Q-Tr persistido/restaurable desde contratoCuenca.
- Hidrogramas persistidos/restaurables desde contratoCuenca.
- Diagnósticos persistidos/restaurables desde contratoCuenca.
- Expediente persistido/restaurable desde contratoCuenca.
- Sin ReferenceError derivarContratoCuenca.
- La aplicación no quedó en blanco.

## Dictamen

HF-PROD-006C queda APROBADO.

## Cierre

HF-PROD-005 queda CERRADO.
HF-PROD-006 queda CERRADO.

ContratoCuenca queda certificado como Fuente Única de Verdad, unidad oficial de persistencia, unidad oficial de restauración y fuente de sincronización reactiva.
