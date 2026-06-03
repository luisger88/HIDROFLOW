# Reporte OT-0003 — HF_AuditorPendientes

## Estado

Abierto.

## Resumen ejecutivo

Pendiente de diligenciar.

## Evidencias revisadas

Pendiente.

## Hallazgos

### Hallazgo 1

- Archivo:
- Línea aproximada:
- Campo:
- Valor:
- Significado probable:
- Descripción:
- Riesgo:
- Severidad:
- Relación con Tc:

## Matriz preliminar Scp vs Sc

| Campo | Valor observado | Significado probable | Uso actual | Uso correcto esperado | Riesgo |
|---|---:|---|---|---|---|
| pendiente_cuenca | Pendiente | Pendiente | calcTc | Por auditar | Alto |
| Scp | Pendiente | Pendiente cauce principal | Tc | Tc / H-L | Alto |
| Sc | Pendiente | Pendiente media cuenca | Concepto geomorfológico | Clasificación cuenca | Alto |

## Conclusión preliminar

Pendiente.

## Recomendación

Pendiente.

## Requiere cambio de código

No determinado.

---

## Hallazgo 1 — pendiente_cuenca = 8.43 como campo ambiguo

- Archivo: src/data/cuencasCatalogo.js
- Línea aproximada: 172-175
- Campo: pendiente_cuenca
- Valor observado: 8.43
- Significado probable: alias histórico ambiguo
- Severidad: Alta

### Evidencia

En cuencasCatalogo.js se documenta que HidroFlow.jsx todavía lee pendiente_cuenca para:

1. Mostrar Pendiente media en el módulo Parámetros.
2. Calcular el método SCS-Ranser dentro de calcTc().

El valor registrado es:

pendiente_cuenca: 8.43

### Análisis

El nombre pendiente_cuenca sugiere Sc, es decir, pendiente media superficial de la cuenca. Sin embargo, el uso dentro de calcTc puede requerir Scp o una pendiente hidrológica equivalente según el método.

Por lo tanto, el campo no debe interpretarse automáticamente como Sc ni como Scp sin confirmar su origen.

### Riesgo

Alto. Si pendiente_cuenca representa Sc pero se usa como Scp en métodos Tc, los tiempos de concentración pueden quedar técnicamente ambiguos. Si representa Scp pero se muestra como pendiente media, la interfaz induce interpretación incorrecta.

### Recomendación

No modificar código todavía. Primero confirmar si el valor 8.43 proviene del perfil longitudinal del cauce principal o de una pendiente media superficial de cuenca.

---

## Hallazgo 2 — calcTc usa Sp = p.pendiente_cuenca y también calcula So/Sf

- Archivo: src/services/hidroEngine.js
- Línea aproximada: 193-205
- Bloque: export function calcTc(p)
- Variables detectadas:
  - L = p.longitud_cauce
  - A = p.area
  - Sp = p.pendiente_cuenca
  - So = desnivel cauce / longitud cauce
  - Sf = desnivel cauce / longitud cauce en unidades imperiales
- Severidad: Alta

### Evidencia

calcTc(p) asigna:

const Sp = p.pendiente_cuenca;

y además calcula pendientes derivadas desde cotas y longitud:

const So = ((p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 1000)) * 1000;
const Sf = (p.cota_mayor_cauce - p.cota_menor_cauce) / (L * 3280.84);

### Análisis

Esto indica que no todos los métodos Tc dependen necesariamente del mismo tipo de pendiente. Algunos pueden usar desnivel/longitud del cauce, mientras otros pueden usar Sp = pendiente_cuenca.

### Riesgo

Alto. La auditoría debe identificar método por método si el cálculo usa Scp, Sc, H/L, So, Sf o una pendiente equivalente.

### Recomendación

Crear una matriz método-campo para calcTc donde se indique para cada método: fórmula, variable de pendiente usada, unidad esperada y riesgo.

---

## Conclusión preliminar OT-0003

El campo pendiente_cuenca no debe usarse como denominación técnica final. Actualmente funciona como campo heredado o alias ambiguo.

Para la auditoría, se adopta esta clasificación provisional:

- pendiente_cuenca: alias histórico ambiguo.
- Scp: pendiente del cauce principal hasta PC_80, derivada de longitud hidráulica y desnivel del perfil longitudinal.
- Sc: pendiente media superficial de la cuenca, pendiente de confirmación formal para clasificación geomorfológica.

No se autoriza cambio de fórmula ni renombramiento de campo hasta completar la matriz método-campo de calcTc.
