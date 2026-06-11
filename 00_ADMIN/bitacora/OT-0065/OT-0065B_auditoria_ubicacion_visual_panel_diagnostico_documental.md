# OT-0065B — Auditoría de ubicación visual del panel diagnóstico documental

Fecha: 2026-06-10 23:18:10

## Estado base

- Rama: ot-0065-panel-diagnostico-documental-no-bloqueante.
- OT-0065A cerrada en commit 0a6bab2.
- Main base: 8adaca8, estabilizado post OT-0064.
- Alcance: auditoría visual sin modificar código funcional.

## Objetivo

Auditar la estructura visual del ComparadorMultiMetodo.jsx para identificar una ubicación segura, discreta y no bloqueante del futuro panel diagnóstico documental.

## Archivo auditado

- 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx

## Patrones auditados

### Patrón: Copiar expediente hidrológico mínimo

- Línea 1802: `Copiar expediente hidrológico mínimo`

### Patrón: Panel visual de consistencia cruzada OT-0058

- Línea 1890: `Panel visual de consistencia cruzada OT-0058`

### Patrón: Bloque Q-Tr activo

- Línea 1956: `Bloque Q-Tr activo · Escenario de diseño controlado`

### Patrón: renderTabla

- Línea 640: `const renderTabla = (titulo, tipo) => {`
- Línea 1266: `{renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}`
- Línea 2002: `{renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}`

### Patrón: Bloque Q-5

- Línea 1285: `"- Método Racional: contraste global independiente de caudal pico; no forma parte del bloque Q-5 de hidrogramas.",`
- Línea 1643: `"Relación con Q-5: no pertenece al bloque Q-5 de hidrogramas.",`
- Línea 2002: `{renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}`

### Patrón: Bloque Tc-15

- Línea 1266: `{renderTabla("Bloque Tc-15 · Tiempo de concentración / respuesta", "tc")}`

### Patrón: diagnosticoDocumentalExpediente

- Línea 1715: `const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {`
- Línea 1721: `if (!diagnosticoDocumentalExpediente.ok) {`
- Línea 1722: `console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);`

### Patrón: adaptarExpedienteDocumental

- Línea 7: `import adaptarExpedienteDocumental from "../services/documentos/adaptarExpedienteDocumental";`
- Línea 1715: `const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {`

### Patrón: Referencia de escala

- Línea 1814: `Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³`

### Patrón: Lectura metodológica

- Línea 1917: `Lectura metodológica post-conservación de masa: SCS se toma como método principal de referencia para hidrograma; SCS Mod. queda como variante ajustable; Snyder, Williams & Hann y Clark IUH se mantienen como métodos compa...`

### Patrón: Revalidación post-masa

- Línea 1921: `Revalidación post-masa: los volúmenes ya se contrastan contra la referencia física; Qp y Tp permanecen sujetos a revisión temporal mediante alerta Tc/Tp antes de cualquier adopción técnica.`

## Ventanas de contexto


  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1705:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1706:            "## 12. Restricciones y advertencias técnicas",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1707:            "- No se usaron caudales externos como fundamento.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1708:            "- No se usó SIATA para justificar caudales.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1709:            "- No se modifica el motor hidrológico.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1710:            "- No se recalculan hidrogramas en este expediente.",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1711:            "- No se alteran Qp, Tp, Volumen ni Q(t).",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1712:            "",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1713:          ].join("\n");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1714:          try {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1715:            const diagnosticoDocumentalExpediente = adaptarExpedienteDocumental(textoExpediente, {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1716:              fuenteExpediente: "ComparadorMultiMetodo.textoExpediente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1717:              origenPlantilla: "OT-0064",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1718:              cuencaActiva: contextoBase?.cuencaNombre ?? "Cuenca activa"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1719:            });
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1720:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1721:            if (!diagnosticoDocumentalExpediente.ok) {
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1722:              console.warn("Diagnóstico documental no invasivo:", diagnosticoDocumentalExpediente);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1723:            }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1724:          } catch (errorDiagnosticoDocumental) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1725:            console.warn("Diagnóstico documental no invasivo no ejecutado:", errorDiagnosticoDocumental);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1726:          }
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1727:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1728:              // OT-0056E valida expediente copiado antes de enviarlo al portapapeles.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1729:              const tokensInvalidosExpediente = ["undefined", "null", "NaN", "[object Object]"];
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1730:              const tokensDetectadosExpediente = tokensInvalidosExpediente.filter((token) =>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1731:                textoExpediente.includes(token)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1732:              );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1733:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1734:              const seccionesObligatoriasExpediente = [
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1735:                "# Expediente hidrológico mínimo — Cuenca activa",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1736:                "## 5. Escenario Q-Tr activo — control de trazabilidad",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1737:                "## 6. Resumen Q-5 auditado",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1738:                "## 7. Método Racional — contraste global independiente",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1792:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1793:          document.body.removeChild(areaTexto);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1794:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1795:          if (copiado) {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1796:            window.alert("Expediente hidrológico mínimo copiado al portapapeles.");
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1797:          } else {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1798:            window.prompt("No fue posible copiar automáticamente. Copie manualmente el expediente hidrológico mínimo:", textoExpediente);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1799:          }        }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1800:        style={{ ...estilos.chip, cursor: "pointer", marginBottom: "10px", marginLeft: "8px" }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1801:      >
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1802:        Copiar expediente hidrológico mínimo
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1803:      </button>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1804:      {(() => {
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1805:        const areaKm2 = Number(contextoBase?.area_km2);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1806:        const peTotalMm = Number(contextoBase?.lluvia_efectiva_total_mm);
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1807:        const volumenEsperadoM3 =
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1808:          Number.isFinite(areaKm2) && Number.isFinite(peTotalMm)
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1809:            ? areaKm2 * peTotalMm * 1000
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1810:            : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1811:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1812:        return volumenEsperadoM3 ? (
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1813:          <div style={{ ...estilos.muted, marginBottom: "10px" }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1814:            Referencia de escala: Volumen esperado ≈ {volumenEsperadoM3.toLocaleString("es-CO", { maximumFractionDigits: 0 })} m³
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1815:            {" "}({peTotalMm.toFixed(2)} mm × {areaKm2.toFixed(4)} km² × 1000).
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1816:          </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1817:        ) : null;
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1818:      })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1880:              <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1881:                style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1882:                  border: `1px solid ${colorBorde}`,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1883:                  borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1884:                  padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1885:                  margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1886:                  background: "rgba(15, 23, 42, 0.70)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1887:                }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1888:              >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1889:                <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1890:                  Panel visual de consistencia cruzada OT-0058
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1891:                </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1892:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1893:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1894:                  Control Pe–Área–Volumen/Q-5 visible antes de copiar el expediente. No recalcula hidrogramas, no modifica Q-5 y no adopta resultados.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1895:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1896:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1897:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1898:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1899:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1900:                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1901:                    gap: 8
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1902:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1903:                >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1904:                  <div><strong>Pe total:</strong> {formato(peTotalMm, 4)} mm</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1905:                  <div><strong>Área:</strong> {formato(areaKm2, 4)} km²</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1906:                  <div><strong>Volumen esperado:</strong> {formato(volumenEsperadoM3, 0)} m³</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1946:              <section
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1947:                style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1948:                  border: disponibleQTrActivo ? "1px solid #16a34a" : "1px solid #a16207",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1949:                  borderRadius: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1950:                  padding: 12,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1951:                  margin: "12px 0",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1952:                  background: disponibleQTrActivo ? "rgba(22, 163, 74, 0.10)" : "rgba(161, 98, 7, 0.10)"
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1953:                }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1954:              >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1955:                <h3 style={{ margin: "0 0 8px 0" }}>
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1956:                  Bloque Q-Tr activo · Escenario de diseño controlado
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1957:                </h3>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1958:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1959:                <div style={{ ...estilos.muted, marginBottom: 10 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1960:                  Escenario activo de periodo de retorno publicado desde el contexto hidrológico. Este bloque no recalcula caudales, no modifica Q-5 y funciona como control visual del Tr activo.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1961:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1962:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1963:                <div
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1964:                  style={{
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1965:                    display: "grid",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1966:                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1967:                    gap: 8,
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1968:                    marginBottom: 10
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1969:                  }}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1970:                >
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1971:                  <div><strong>Estado:</strong> {estadoQTrActivo?.estado ?? "no_publicado"}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1972:                  <div><strong>Tr activo:</strong> {formatearValorQTr(qTrActivo.tr_activo, " años")}</div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1992:                  </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1993:                )}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1994:
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1995:                <div style={{ ...estilos.muted, marginTop: 8 }}>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1996:                  Fuente: {estadoQTrActivo?.fuente ?? "—"}. Estado no adoptivo: la adopción técnica permanece subordinada a la validación hidrológica del expediente.
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1997:                </div>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1998:              </section>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:1999:            );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2000:          })()}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2001:
> 01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2002:      {renderTabla("Bloque Q-5 · Caudal pico / hidrograma", "q")}
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2003:    </main>
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2004:  );
  01_APP\HIDROFLOW\src\components\ComparadorMultiMetodo.jsx:2005:}



## Lectura preliminar

La ubicación futura del panel debe quedar cerca del expediente hidrológico mínimo, pero no debe reemplazar ni invadir el botón de copiado. El panel debe aparecer como lectura diagnóstica auxiliar, no como condición de validación ni como exportador documental.

## Restricciones

- No modificar ComparadorMultiMetodo.jsx en OT-0065B.
- No modificar UI.
- No cambiar el flujo de copiado.
- No generar PDF, Word ni mapas.
- No tocar hidroEngine.js.
- No recalcular Q-Tr, Q-5 ni Método Racional.

## Criterio de salida

OT-0065B queda completa cuando exista una auditoría versionada de ubicación visual para el panel diagnóstico documental, sin cambios funcionales sobre la aplicación.
