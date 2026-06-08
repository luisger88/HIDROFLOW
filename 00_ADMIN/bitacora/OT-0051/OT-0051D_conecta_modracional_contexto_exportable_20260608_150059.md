# OT-0051D — Conecta ModRacional al contexto exportable

Fecha: 06/08/2026 15:00:59
Rama: ot-0051-alineacion-runtime-verdad-geomorfologica-motor

## 1. Hallazgo

ModRacional calcula resultados racionales, pero no recibía onContextoComparador en su instancia JSX. Por tanto, su useEffect retornaba antes de publicar metodo_racional, area_km2 y pendiente_media_pct al contexto consumido por IndiceHidrologico.

## 2. Coincidencias exactas

Coincidencias exactas encontradas: 0

ABORTADO: se esperaba exactamente 1 coincidencia. No se modificó HidroFlow.jsx.

