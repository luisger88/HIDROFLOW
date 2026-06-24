\# OT-0123BA — Auditoría de trazabilidad CUENCA



\## Objetivo



Identificar el origen exacto de cada variable de cuenca requerida por el contrato documental maestro.



No se modifica código.



No se implementa nada.



Solo trazabilidad.



\---



\## Sección expediente



```text

EXPEDIENTE.cuenca

```



\---



\## Variables obligatorias



| Variable expediente | Existe | Origen | Variable origen | Observaciones |

|----------|----------|----------|----------|----------|

| area\_km2 | Sí | cuencasCatalogo.js | area\_km2 | Alimenta EXPEDIENTE.cuenca |

| perimetro\_km | Sí | cuencasCatalogo.js | perimetro\_km | Alimenta EXPEDIENTE.cuenca |

| longitudCauce\_km | Sí | cuencasCatalogo.js | longitudCauce\_km | Alimenta EXPEDIENTE.caucePrincipal |

| cotaMaxCuenca\_msnm | Pendiente | Pendiente | Pendiente | Revisar origen real |

| cotaMinCuenca\_msnm | Pendiente | Pendiente | Pendiente | Revisar origen real |

| desnivelCuenca\_m | Pendiente | Pendiente | Pendiente | Derivado de cotas de cuenca |

| pendienteCuenca\_pct | Pendiente | Pendiente | Pendiente | Revisar origen real |

| cotaCabeceraCauce\_msnm | Sí | cuencasCatalogo.js | cotaCabeceraCauce\_msnm | Alimenta EXPEDIENTE.caucePrincipal |

| cotaSalidaCauce\_msnm | Sí | cuencasCatalogo.js | cotaSalidaCauce\_msnm | Alimenta EXPEDIENTE.caucePrincipal |

| desnivelCauce\_m | Pendiente | Derivado | cotaCabecera - cotaSalida | Debe calcularse desde cotas del cauce |

| pendienteCauce\_pct | Pendiente | Derivado | desnivel / longitudCauce | Debe conservar trazabilidad |

| longitudHidraulica\_km | Pendiente | Revisar | Revisar | Confirmar longitud hidráulica publicada |

```



\---



\## Regla de auditoría



Para cada variable identificar:



```text

1\. Dónde nace.



2\. Cómo se llama realmente.



3\. Quién la consume.



4\. A qué campo del expediente alimenta.

```



\---



\## Criterio de cierre



La auditoría se considera cerrada cuando todas las variables de la sección CUENCA tengan origen documentado.

