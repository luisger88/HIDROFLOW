\# OT-0089A — Diseño de automatización liviana del ritual documental y operativo



\## Contexto



OT-0089 se abre después del cierre de OT-0088, donde el expediente hidrológico mínimo quedó protegido mediante validación textual estricta del diagnóstico temporal Q(t).



La cadena OT-0078 a OT-0088 dejó capacidades técnicas robustas, pero también evidenció una fricción operativa alta en el flujo repetitivo de trabajo:



\- creación manual de carpetas de bitácora,

\- apertura manual de archivos en Notepad,

\- pegado manual de cierres,

\- `git add`,

\- `git commit`,

\- `git push`,

\- revisión de `git status`,

\- preparación manual de PR,

\- sincronización post-merge.



\## Problema



El flujo actual es técnicamente trazable, pero demasiado laborioso.



La repetición manual aumenta el riesgo de:



\- errores de pegado,

\- archivos vacíos,

\- commits en rama equivocada,

\- edición accidental de bitácoras previas,

\- cansancio operativo,

\- pérdida de foco técnico.



\## Objetivo



Diseñar una automatización liviana que reduzca fricción sin alterar la arquitectura hidrológica ni la aplicación.



La automatización debe ayudar a crear bitácoras, cerrar documentos y ejecutar operaciones Git repetitivas de forma controlada.



\## Alcance propuesto



OT-0089 debe enfocarse en tooling operativo, especialmente en:



\- crear carpetas de bitácora OT,

\- abrir archivos de bitácora con nombre controlado,

\- validar `git status`,

\- hacer `git add`,

\- hacer `git commit`,

\- hacer `git push`,

\- evitar commits accidentales en `main`,

\- mantener comandos completos y explícitos.



\## Fuera de alcance



Durante OT-0089 no se debe modificar:



\- `HidroFlow.jsx`,

\- `ComparadorMultiMetodo.jsx`,

\- `hidroEngine.js`,

\- `calcHidroCompleto`,

\- `uh`,

\- qSeries,

\- expediente hidrológico,

\- UI del comparador,

\- lógica hidrológica.



\## Principios



La automatización debe ser:



\- pequeña,

\- auditable,

\- reversible,

\- explícita,

\- sin magia excesiva,

\- compatible con el flujo Git existente,

\- basada en PowerShell,

\- ubicada en `07\_TOOLBOX\\powershell\\hidroflow-git-tools.ps1`.



\## Funciones candidatas



Funciones candidatas para evaluar:



```powershell

Nueva-BitacoraOT

Confirmar-BitacoraOT

Cerrar-OTDocumental

Verificar-RamaNoMain

