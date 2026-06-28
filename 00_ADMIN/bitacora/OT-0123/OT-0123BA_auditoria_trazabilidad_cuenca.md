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

| cotaMaxCuenca\_msnm | Sí | cuencasCatalogo.js | cotaMaxCuenca_msnm | Alimenta EXPEDIENTE.cuenca |

| cotaMinCuenca\_msnm | Sí | cuencasCatalogo.js | cotaMinCuenca_msnm | Alimenta EXPEDIENTE.cuenca |

| desnivelCuenca\_m | Sí | Derivado | cotaMaxCuenca - cotaMinCuenca | Alimenta EXPEDIENTE.cuenca |

| pendienteCuenca\_pct | Sí | Derivado | desnivelCuenca / longitudCaracteristica | Alimenta EXPEDIENTE.cuenca |

| cotaCabeceraCauce\_msnm | Sí | cuencasCatalogo.js | cotaCabeceraCauce\_msnm | Alimenta EXPEDIENTE.caucePrincipal |

| cotaSalidaCauce\_msnm | Sí | cuencasCatalogo.js | cotaSalidaCauce\_msnm | Alimenta EXPEDIENTE.caucePrincipal |

| desnivelCauce\_m | Sí | Derivado | cotaCabeceraCauce - cotaSalidaCauce | Alimenta EXPEDIENTE.caucePrincipal |

| pendienteCauce\_pct | Sí | Derivado | desnivelCauce / longitudCauce | Alimenta EXPEDIENTE.caucePrincipal |

| longitudHidraulica\_km | Sí | cuencasCatalogo.js | longitudCauce_km | Alimenta EXPEDIENTE.caucePrincipal |

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


