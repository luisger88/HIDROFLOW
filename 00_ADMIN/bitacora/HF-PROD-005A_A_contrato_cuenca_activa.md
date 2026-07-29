\# HF-PROD-005A-A — Contrato de Cuenca Activa



\## Fuente



OT-0090E — Contrato entrada-salida de cuenca activa.



\## Tesis



La cuenca no es la entrada.



Las coordenadas son la entrada.



La cuenca es una consecuencia del contrato.



\## Contrato mínimo



\- coordenadas

\- sistemaReferencia

\- nombreProyecto

\- periodosRetorno

\- tipoSalida



\## Estado objetivo



El Orquestador debe gobernar el contrato.



HidroFlow debe consumir el contrato.



Los motores no deben conocer la cuenca.



## Hallazgo arquitectónico

OT-GOV-002A establece que HF-GOV es el Productor Automático de Contexto Institucional y que el Orquestador consume la Fuente Única de Verdad Institucional.

OT-0090E establece que las coordenadas son la entrada mínima del sistema, mientras que la cuenca es una consecuencia derivada del contrato.

Se concluye que la autoridad de recepción no debe vivir ni en HidroFlow.jsx ni en OrquestadorInstitucional.jsx.

Debe vivir en un Contrato de Cuenca producido por HF-GOV y consumido por el Orquestador mediante ORQUESTADOR\_ESTADO.



\## ContratoDeCuenca v1



\### Entrada del usuario



\- coordenadas

\- sistemaReferencia

\- nombreProyecto

\- periodosRetorno

\- tipoSalida



\### Contexto institucional



\- expedienteActivo

\- estadoGobernanza

\- memoriaTecnicaActiva

\- oiVigentes



\### Contexto físico derivado



\- cuencaActiva

\- puntoControl

\- estacionIDF

\- parametrosGeomorfologicos



\### Productos obligatorios



\- expediente

\- resultadosHidrologicos

\- diagnosticoTemporalQt

\- preparacionHidraulica



\### Regla de autoridad



Las coordenadas son la entrada.



La cuenca es una consecuencia.



El expediente es el producto.



La hidráulica es el consumidor final.

