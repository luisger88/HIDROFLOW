# OT-0063A — Auditoría focal del constructor textoExpediente

Fecha: 2026-06-10 22:30:53

## Estado base

- Rama: ot-0063-diagnostico-documental-no-invasivo-comparador.
- Rama creada desde main limpio post OT-0062.
- Main base: 271e212, estabilizado post PR #93.
- Alcance: auditoría focal sin modificar código funcional.

## Objetivo

Auditar el constructor textoExpediente en ComparadorMultiMetodo.jsx para determinar si existe un punto seguro para un diagnóstico documental no invasivo.

## Archivo auditado



01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1293:            "## 9. Sello técnico de generación",
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1305:          const areaTextoResumen = document.createElement("textarea");
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1318:            resumenCopiado = document.execCommand("copy");
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1326:            window.alert("Resumen técnico Q-5 copiado al portapapeles.");
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1328:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el resumen técnico Q-5:", textoResumenQ5);
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1521:            window.alert(
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:          const textoExpediente = [
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1685:            "## 10. Validación interna del expediente exportado",
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1694:            "## 11. Sello técnico de generación",
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1705:            "## 12. Restricciones y advertencias técnicas",
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1715:              const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1716:              const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1717:                textoExpediente.includes(token)
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1720:              const seccionesObligatoriasExpediente = [
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1727:                "## 10. Validación interna del expediente exportado",
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1728:                "## 11. Sello técnico de generación",
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1729:                "## 12. Restricciones y advertencias técnicas"
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1731:              const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1732:                !textoExpediente.includes(seccion)
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1736:                window.alert(
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1761:          const areaTexto = document.createElement("textarea");
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1762:          areaTexto.value = textoExpediente;
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1774:            copiado = document.execCommand("copy");
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1782:            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1788:        Copiar expediente hidrológico mínimo



## Ventanas de contexto

Se incluyen ventanas de contexto alrededor de patrones críticos. Esta evidencia orienta una posible integración diagnóstica futura, pero no modifica código.

  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1297:            `Fecha de generación: ${new Date().toLocaleString("es-CO")}.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1298:            "Estado técnico: completo, limpio, numéricamente útil y con plausibilidad hidrológica interna preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1299:            "Validaciones superadas: estructura, coherencia entre salidas, completitud numérica y plausibilidad hidrológica preliminar.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1300:            `Tr global activo al generar expediente: ${trDisenoActivoExpediente} años.`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1301:            "Alcance: diagnóstico técnico reproducible no adoptivo hasta revisión hidrológica responsable.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1302:            "Restricción principal: no usar como valor adoptivo final sin revisión de competencia metodológica, escala de cuenca, duración Tc, alcance normativo y criterio profesional."
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1303:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1304:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1305:          const areaTextoResumen = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1306:          areaTextoResumen.value = textoResumenQ5;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1307:          areaTextoResumen.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1308:          areaTextoResumen.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1309:          areaTextoResumen.style.left = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1310:          areaTextoResumen.style.top = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1311:          document.body.appendChild(areaTextoResumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1312:          areaTextoResumen.focus();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1313:          areaTextoResumen.select();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1314:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1315:          let resumenCopiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1316:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1317:          try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1318:            resumenCopiado = document.execCommand("copy");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1319:          } catch {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1320:            resumenCopiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1321:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1322:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1323:          document.body.removeChild(areaTextoResumen);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1324:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1325:          if (resumenCopiado) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1326:            window.alert("Resumen técnico Q-5 copiado al portapapeles.");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1327:          } else {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1328:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el resumen técnico Q-5:", textoResumenQ5);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1329:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1330:        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1331:        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px" }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1332:      >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1567:                relacionVolumenQ5Esperado === null
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1568:                  ? "no evaluada"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1569:                  : relacionVolumenQ5Esperado >= 0.95 && relacionVolumenQ5Esperado <= 1.05
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1570:                  ? "superada"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1571:                  : relacionVolumenQ5Esperado >= 0.80 && relacionVolumenQ5Esperado <= 1.20
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1572:                  ? "requiere revisión menor"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1573:                  : "requiere revisión técnica";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1574:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1575:          const textoExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1576:            "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1577:            "Estado técnico del expediente: CONSISTENTE CON ADVERTENCIAS.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1578:            "Lectura técnica: expediente exportable completo, con controles internos presentes, no adoptivo y sujeto a revisión hidrológica profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1579:            "Alcance: estado textual/exportable; no recalcula resultados ni reemplaza criterio profesional.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1580:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1581:            "## 1. Identificación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1582:            `Cuenca: ${contextoBase?.cuencaNombre ?? "Cuenca activa"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1583:            `Área: ${Number.isFinite(areaKm2) ? areaKm2.toFixed(4) + " km²" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1584:            `Fuente de contexto: ${contextoBase?.fuente ?? "HidroFlow"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1585:            `Estación IDF: ${estacionIdfExpediente}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1586:            `Pendiente media: ${Number.isFinite(Number(contextoBase?.pendiente_media_pct)) ? Number(contextoBase.pendiente_media_pct).toFixed(2) + " %" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1587:            `Longitud cauce principal: ${Number.isFinite(Number(contextoBase?.longitud_cauce_km)) ? Number(contextoBase.longitud_cauce_km).toFixed(3) + " km" : "—"}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1588:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1589:            "## 2. Parámetros hidrológicos base",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1707:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1708:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1709:            "- No se recalculan hidrogramas en este expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1710:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1711:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1712:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1713:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1714:              // OT-0056E valida expediente copiado antes de enviarlo al portapapeles.
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1715:              const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1716:              const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1717:                textoExpediente.includes(token)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1718:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1719:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1720:              const seccionesObligatoriasExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1721:                "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1722:                "## 5. Escenario Q-Tr activo — control de trazabilidad",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1723:                "## 6. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1724:                "## 7. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1725:                "## 8. Contraste Q-5 vs Método Racional",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1726:                "## 9. Control de consistencia cruzada Pe–Área–Volumen/Q-5",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1727:                "## 10. Validación interna del expediente exportado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1728:                "## 11. Sello técnico de generación",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1729:                "## 12. Restricciones y advertencias técnicas"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1730:              ];
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1731:              const seccionesFaltantesExpediente = seccionesObligatoriasExpediente.filter((seccion) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1732:                !textoExpediente.includes(seccion)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1733:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1734:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1735:              if (tokensDetectadosExpediente.length > 0 || seccionesFaltantesExpediente.length > 0) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1736:                window.alert(
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1737:                  [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1738:                    "Validación del expediente copiado fallida.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1739:                    "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1740:                    "No se copió el expediente porque contiene tokens inválidos o perdió secciones obligatorias.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1741:                    "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1742:                    ...(tokensDetectadosExpediente.length > 0
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1743:                      ? [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1744:                          "Tokens inválidos detectados:",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1745:                          ...tokensDetectadosExpediente.map((token) => `- ${token}`),
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1753:                        ]
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1754:                      : [])
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1755:                  ].join("\n")
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1756:                );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1757:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1758:                return;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1759:              }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1760:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1761:          const areaTexto = document.createElement("textarea");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1762:          areaTexto.value = textoExpediente;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1763:          areaTexto.setAttribute("readonly", "");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1764:          areaTexto.style.position = "fixed";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1765:          areaTexto.style.left = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1766:          areaTexto.style.top = "-9999px";
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1767:          document.body.appendChild(areaTexto);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1768:          areaTexto.focus();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1769:          areaTexto.select();
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1770:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1771:          let copiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1772:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1773:          try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1774:            copiado = document.execCommand("copy");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1775:          } catch {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1776:            copiado = false;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1777:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1778:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1779:          document.body.removeChild(areaTexto);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1780:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1781:          if (copiado) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1782:            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1783:          } else {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1784:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1785:          }        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1786:        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1787:      >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1788:        Copiar expediente hidrológico mínimo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1789:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1790:      {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1791:        const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1792:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1793:        const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1794:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1795:            ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1796:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1797:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1798:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1799:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1800:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1801:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1802:          </div>



## Lectura preliminar

La integración diagnóstica futura solo sería aceptable si reutiliza el texto exportable ya construido, sin duplicar el constructor, sin reemplazar la validación existente y sin alterar el flujo de copiado.

## Criterio de salida

OT-0063A queda completa cuando exista una auditoría focal versionada del constructor textoExpediente y de los puntos de validación/copiado asociados, sin cambios funcionales sobre la aplicación.
