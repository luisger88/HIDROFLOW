# OT-0202B — Validación aislada helper Tiempo de concentración y roles Tc

## Resumen

```json
{
  "helperExportado": true,
  "casosValidados": 5,
  "todosRetornanArregloTexto": true,
  "validacionEtiquetasAprobada": true,
  "validacionResiduosAprobada": true,
  "validacionErroresAprobada": true,
  "casosConEtiquetasFaltantes": [],
  "casosConResiduos": [],
  "casosConError": [],
  "errorGeneral": "",
  "validacionAisladaAprobada": true
}
```

## Resultado

La validación aislada del helper Tiempo de concentración y roles Tc fue aprobada.

## Hallazgos

- No se detectaron etiquetas faltantes.

- No se detectaron residuos prohibidos.

- No se detectaron errores de ejecución.

## Casos evaluados

### valores operativos controlados

```json
{
  "lineas": 10,
  "retornaArregloTexto": true,
  "etiquetasFaltantes": [],
  "residuos": [],
  "errorCaso": ""
}
```

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: 114.2 min
Tr global activo: 100 años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

### valores enteros simples

```json
{
  "lineas": 10,
  "retornaArregloTexto": true,
  "etiquetasFaltantes": [],
  "residuos": [],
  "errorCaso": ""
}
```

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: 75.0 min
Tr global activo: 50 años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

### valores ausentes

```json
{
  "lineas": 10,
  "retornaArregloTexto": true,
  "etiquetasFaltantes": [],
  "residuos": [],
  "errorCaso": ""
}
```

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: —
Tr global activo: — años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

### valores nulos controlados

```json
{
  "lineas": 10,
  "retornaArregloTexto": true,
  "etiquetasFaltantes": [],
  "residuos": [],
  "errorCaso": ""
}
```

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: —
Tr global activo: — años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

### valores objeto candidatos

```json
{
  "lineas": 10,
  "retornaArregloTexto": true,
  "etiquetasFaltantes": [],
  "residuos": [],
  "errorCaso": ""
}
```

```text
## 3. Tiempo de concentración y roles Tc
Tc comparador: —
Tr global activo: — años
Nota Tr: estado global visual/exportable; no implica recálculo automático hasta propagación hidrológica controlada.
Roles Tc:
- Tc global Índice: referencia hidrológica general.
- Tc operativo Q(t): ruta interna del hidrograma.
- Duración evento: 3 h para almacenamiento/regulación.
- Lag / forma SCS: parámetro derivado para forma temporal.
- Tc comparador: referencia especializada para coherencia Q-5.
```

## Lectura técnica

- El helper se evalúa en aislamiento, sin tocar ruta operativa.
- Se valida encabezado, etiquetas mínimas y ausencia de residuos textuales.
- Esta OT no corrige ni sustituye contenido.

## Restricciones mantenidas

- No se modificó `ComparadorMultiMetodo.jsx`.
- No se modificó `construirExpedienteHidrologicoMinimo.js`.
- No se modificó `textoExpediente`.
- No se modificó botón de copiado.
- No se modificó portapapeles.
- No se tocó Q-5 operativo.
- No se tocó Método Racional.
- No se tocó diagnóstico Q(t).
- No se tocó motor hidrológico.

## Decisión

El helper puede avanzar a comparación controlada contra ruta operativa.