# OT-0012C — Reconstrucción numérica Tc_ref_base

## Síntesis

Se reconstruye documentalmente el Tc sugerido sin modificar código funcional.

Flujo auditado: calcTc(p) → mapTcResultados(tcArray) → metodosTc → seleccionarTc("hidrograma", metodosTc, contextoTc) → Tc_final.

Valores reconstruidos para La Iguaná PC_80:

- Témez = 231.513 min
- Kirpich = 134.519 min
- California = 85.263 min
- Giandotti = 105.071 min
- SCS-Ranser = 122.024 min, excluido de calcularTcRef
- Pérez-Montg. = 11.241 min
- WilliamsHann no aparece en metodosTc del flujo vivo

Pesos efectivos usados: Kirpich 0.25, Temez 0.25, Giandotti 0.20, California 0.10 y Perez 0.10. Suma efectiva = 0.90.

Suma ponderada = 122.173 min.

Tc_ref_base = 122.173 / 0.90 = 135.747 min.

Factor de ajuste = 0.85 * 0.90 * 1.10 = 0.8415.

Tc_final = 135.747 * 0.8415 = 114.216 min.

Contraste OT-0011: rango competente Tc = 105.1–231.5 min. El Tc sugerido reconstruido ≈ 114.2 min cae dentro del rango competente, pero cerca del borde inferior.

Dictamen: el Tc sugerido es trazable, pero debe continuar evaluación de suficiencia conservadora frente a creciente súbita antes de adoptarlo como valor único robusto.

Estado: auditoría documental, sin cambios funcionales.
