# OT-0123A — Arquitectura pura del motor de generación del expediente final

## Estado

Diseño arquitectónico.

Sin implementación.

Sin impacto sobre el motor hidrológico.

---

## Principio rector

HidroFlow entra en una etapa de optimización orientada al expediente.

El objetivo principal ya no es aumentar módulos, sino mejorar la capacidad del sistema para producir un expediente hidrológico defendible, trazable y exportable.

Ruta madre:

```text
CUENCA
↓
IDF
↓
LLUVIA
↓
CN
↓
Tc
↓
HIDROGRAMAS
↓
Q-Tr
↓
EXPEDIENTE
```

Todo desarrollo deberá responder:

```text
¿Esto acerca la cuenca al expediente final?
```

Si no lo acerca, no es prioritario.

---

## Objetivo de la OT

Diseñar la arquitectura pura del motor de generación del expediente final de HidroFlow.

Esta OT no implementa exportación, no diseña interfaz y no modifica el motor hidrológico.

Su propósito es dejar definida la capa arquitectónica que ensamblará, validará y trazará los datos necesarios para construir el expediente.

---

## Alcance

Esta OT cubre exclusivamente:

```text
- Definición del pipeline de datos hacia el expediente.
- Definición del contrato documental maestro.
- Reglas de trazabilidad.
- Validación de completitud.
- Separación entre motor, interfaz y exportadores.
- Criterios de aceptación arquitectónica.
```

---

## Fuera de alcance

Quedan expresamente fuera de esta OT:

```text
- Generación PDF.
- Generación Word.
- Exportadores.
- Botones de interfaz.
- Widgets de progreso.
- Estilos de impresión.
- Plantillas textuales avanzadas.
- Nuevos cálculos hidrológicos.
- Cambios en hidroEngine.js.
- Cambios en tcSelector.js.
- Cambios en tcAgent.js.
```

---

## Regla de oro del generador

```text
El generador no calcula.
El generador no corrige.
El generador no maquilla.
El generador ensambla, valida, traza y entrega.
```

---

## Pipeline arquitectónico

El flujo arquitectónico del generador será:

```text
Estado hidrológico consolidado
        ↓
Normalizador de datos
        ↓
Constructor de trazabilidad
        ↓
Validador de completitud
        ↓
Contrato documental maestro
```

---

## Diferenciación obligatoria entre cuenca y cauce principal

El contrato documental maestro deberá diferenciar explícitamente entre las variables asociadas a la cuenca y las variables asociadas al cauce principal.

La finalidad de esta separación es evitar que una variable geomorfológica general sea utilizada como sustituto de una variable hidráulica de cálculo.

### Cuenca

Representa el polígono drenante completo.

Variables típicas:

```text
- Área.
- Perímetro.
- Cota máxima de cuenca.
- Cota mínima de cuenca.
- Desnivel total de cuenca.
- Pendiente media de cuenca.
- Curva hipsométrica.
```

Uso principal:

```text
Caracterización geomorfológica.
Descripción fisiográfica.
Interpretación territorial.
```

### Cauce principal

Representa la ruta hidráulica dominante entre la cabecera competente y el punto de salida o control.

Variables típicas:

```text
- Longitud hidráulica efectiva.
- Cota de cabecera.
- Cota de salida.
- Desnivel del cauce principal.
- Pendiente del cauce principal.
- Perfil longitudinal.
```

Uso principal:

```text
Cálculo del Tiempo de Concentración.
Evaluación hidráulica.
Interpretación del tránsito de caudales.
```

### Regla técnica

```text
La pendiente de cuenca caracteriza la superficie drenante.

La pendiente de cauce caracteriza la ruta hidráulica principal.

No son intercambiables.
```

### Implicación para los cálculos

```text
- La pendiente media de cuenca podrá emplearse para análisis geomorfológico.

- La pendiente del cauce principal deberá emplearse en métodos de Tc que dependan de longitud, desnivel o pendiente hidráulica.

- El expediente deberá declarar explícitamente el origen de cada pendiente utilizada.

- Todo cálculo dependiente de pendiente deberá conservar trazabilidad.
```

### Requisito contractual

```javascript
cotasCuenca: {
  maxima_msnm: null,
  minima_msnm: null,
  desnivel_m: null,
  trazabilidad: {}
},

cotasCaucePrincipal: {
  cabecera_msnm: null,
  salida_msnm: null,
  desnivel_m: null,
  longitud_km: null,
  pendiente_m_m: null,
  pendiente_pct: null,
  trazabilidad: {}
}
```

---

## Contrato documental maestro

El motor de generación deberá producir un único contrato documental estructurado.

Ninguna capa externa deberá consumir directamente componentes de interfaz ni resultados dispersos del motor hidrológico.

Toda salida deberá construirse exclusivamente a partir del contrato documental maestro.

Arquitectura:

```text
Motor hidrológico
        ↓
Generador de expediente
        ↓
Contrato documental maestro
```

### Estructura conceptual mínima

```javascript
expedienteFinal = {

  metadatos: {},

  identificacion: {},

  cuenca: {
  cotasCuenca: {},
  pendienteCuenca: {},
  caucePrincipal: {
    cotasCaucePrincipal: {},
    pendienteCauce: {},
    longitudHidraulica: {}
  }
},

  lluvia: {},

  abstraccion: {},

  tiempoConcentracion: {},

  hidrogramas: {},

  caudalesTr: {},

  criterios: {},

  restricciones: {},

  trazabilidad: {},

  estadoCompletitud: {}
}
```

### Secciones obligatorias

```text
1. Metadatos
2. Identificación
3. Cuenca
4. Lluvia
5. Abstracción
6. Tiempo de concentración
7. Hidrogramas
8. Caudales por período de retorno
9. Criterios
10. Restricciones
11. Trazabilidad
12. Estado de completitud
```

### Producto principal

El producto principal del contrato documental maestro será la publicación estructurada de los resultados hidrológicos necesarios para soportar el expediente técnico.

Jerarquía de publicación:

```text
Cuenca
↓
IDF
↓
Lluvia
↓
CN
↓
Tc
↓
Hidrogramas
↓
Caudales por Tr
↓
Expediente
```

Los módulos operativos son proveedores de datos.

El expediente es el producto final.

---

## Separación de capas

La arquitectura deberá mantener separación estricta entre responsabilidades.

```text
Motor hidrológico
    Produce resultados.

Generador de expediente
    Ensambla, valida y traza.

Exportadores
    Transforman el contrato documental.

Interfaz
    Visualiza y opera.
```

Regla:

```text
Ninguna capa posterior puede modificar resultados técnicos.
```

---

## Criterios de aceptación

La arquitectura OT‑0123A se considerará aceptada si cumple:

```text
- Existe principio rector orientado al expediente.
- Existe pipeline de datos definido.
- Existe diferenciación entre cuenca y cauce principal.
- Existe contrato documental maestro.
- Existe separación entre motor, interfaz y exportadores.
- Existe trazabilidad como requisito obligatorio.
- Existe validación de completitud.
- No se agregan cálculos nuevos.
- No se modifica el motor hidrológico.
- Se conserva la ruta madre del sistema.
```

---

## Cierre arquitectónico

La finalidad del motor de generación no es producir archivos.

La finalidad es producir un contrato documental técnicamente defendible, completo y trazable.

La generación de PDF, Word, HTML o cualquier otro formato será una responsabilidad posterior.

Principio final:

```text
El expediente es el producto.

Los módulos son proveedores.

La interfaz es soporte.

El motor de generación es la capa de ensamblaje,
validación y trazabilidad.
```

Conclusión:

```text
HidroFlow deja de optimizar módulos.

HidroFlow empieza a optimizar la capacidad de producir expedientes técnicos defendibles.
```