# Reporte OT-0005-A — Adaptador de pendientes

## Estado

Abierto.

## Diseño propuesto

Se introduce una capa de transformación previa al uso del motor.

## Arquitectura

Entrada de datos → Adaptador → Motor HidroFlow

## Función conceptual

function normalizarPendiente(metodo, datos) {
  switch(metodo) {

    case 'Kirpich':
      return datos.Sf_ft_ft;

    case 'SCS-Ranser':
      return datos.Sc / 100; // % a decimal

    case 'Temez':
      return datos.So / 1000;

    default:
      return null;
  }
}

## Transformaciones clave

| Variable original | Uso correcto | Transformación |
|------------------|-------------|----------------|
| Sc (%)           | No directa  | Sc / 100       |
| So (‰)           | Tc          | So / 1000      |
| Sf (m/m o ft/ft) | Directa     | ninguna        |

## Aplicación

Antes de llamar a calcTc(p):

p.Sp = normalizarPendiente(metodo, datos);

## Ventajas

- No rompe el motor existente
- Permite trazabilidad
- Permite validaciones futuras

## Riesgos

- Requiere control explícito del flujo de datos

## Estado

Pendiente implementación.
