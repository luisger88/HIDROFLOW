# Reporte OT-0006 — Competencia de métodos Tc

## Estado

Abierto.

## Concepto clave

Cada método empírico de Tc tiene un dominio de validez específico.

---

## Clasificación de métodos

### 1. Témez

- Tipo: semi-empírico
- Escala: media–grande
- Competencia: ✅ ALTA
- Uso: método principal


### 2. Kirpich

- Tipo: empírico
- Escala: pequeña
- Sensibilidad: alta a pendiente
- Competencia: ⚠️ CONDICIONADO
- Uso: contraste


### 3. SCS-Ranser

- Tipo: empírico SCS
- Escala: pequeña
- Limitación: flujo superficial simple
- Competencia: ❌ NO COMPETENTE
- Justificación: no representa redes complejas ni cuencas grandes


### 4. California

- Tipo: empírico
- Escala: media
- Competencia: ✅ COMPLEMENTARIO


### 5. Giandotti

- Tipo: semiempírico
- Escala: media-grande
- Competencia: ✅ ALTA


### 6. Pérez-Montg.

- Tipo: regional
- Requiere validación
- Competencia: ⚠️ EN AUDITORÍA


---

## Caso La Iguaná PC_80

| Método       | Tc (min) | Lectura |
|--------------|----------|---------|
| Témez        | ~231     | Coherente |
| Kirpich      | ~85      | Sensible |
| SCS-Ranser   | ~1220    | No representativo |


## Principio operativo

El sistema HidroFlow debe:

- Usar métodos competentes como base
- Usar métodos condicionados como contraste
- Excluir métodos no competentes


## Regla crítica

NO usar métodos fuera de su dominio de validez.


## Conclusión

SCS-Ranser queda excluido como método de cálculo principal.


## Recomendación

Implementar filtro de métodos antes del cálculo de Tc.
