\# Registro técnico HidroFlow App



\## 2026-05-24 — Actualización estructura cuencasCatalogo.js



\### Archivo actualizado



`D:\\\\\\\\HidroFlow\\\\\\\\01\\\\\\\_APP\\\\\\\\HIDROFLOW\\\\\\\\src\\\\\\\\data\\\\\\\\cuencasCatalogo.js`



\### Contexto



Se actualiza la estructura del catálogo técnico de cuencas de HidroFlow App para consolidar la información validada de la cuenca `iguana\\\\\\\_pc80`, correspondiente a `Quebrada La Iguana - PC\\\\\\\_80`.



La cuenca ya se encontraba cargada en la app con coordenadas, cota de salida y parámetros geomorfológicos validados desde el Módulo 1 de Geomorfología.



\### Datos validados para La Iguana PC\_80



\- Latitud salida: `6.271785117145225`

\- Longitud salida: `-75.59408755595547`

\- Cota salida: `1511.36 msnm`

\- Área: `46.8516 km²`

\- Perímetro: `47.59 km`

\- Longitud cauce principal: `15.524 km`

\- Cota máxima: `2819.27 msnm`

\- Cota mínima: `1511.36 msnm`

\- Desnivel: `1307.91 m`

\- Pendiente media: `8.43 %`

\- Longitud de red: `127.1283 km`

\- Densidad de drenaje: `2.7134 km/km²`

\- Kc compacidad: `1.9468`

\- Kf forma: `0.1946`

\- Tramos QC: `4`

\- Quiebres QC: `3`



\### Ajuste hidrológico aplicado



Se reemplaza el periodo de retorno base:



`Tr 2 años`



por:



`Tr 2.33 años`



para los cálculos hidrológicos.



El arreglo técnico queda definido como:



```js

periodos\\\\\\\_retorno\\\\\\\_anios: \\\\\\\[2.33, 5, 10, 25, 50, 100]



D:\\\\\\\\HidroFlow\\\\\\\\01\\\\\\\_APP\\\\\\\\HIDROFLOW\\\\\\\\docs\\\\\\\\trazabilidad\\\\\\\\REGISTRO\\\\\\\_TECNICO\\\\\\\_HIDROFLOW\\\\\\\_APP.md



\\\\---



\\\\## 2026-05-25 — Regla preliminar CN, AMC-SIATA, Tc y precipitación efectiva SCS



\\\\### Archivo técnico asociado



`D:\\\\\\\\HidroFlow\\\\\\\\01\\\\\\\_APP\\\\\\\\HIDROFLOW\\\\\\\\src\\\\\\\\data\\\\\\\\cuencasCatalogo.js`



\\\\### Contexto



Se incorpora en el radar técnico de HidroFlow App la relación entre el Número de Curva `CN`, la cobertura y usos del suelo, la condición antecedente de humedad proveniente de SIATA y la selección del tiempo de concentración `Tc`.



Este ajuste se deja definido como insumo conceptual y estructural para el futuro cálculo de precipitación efectiva mediante el método de infiltración del S.C.S.



\\\\### Criterio hidrológico incorporado



El Número de Curva `CN` no debe considerarse como un valor aislado. Debe entenderse como un parámetro que integra:



\\\\- cobertura del suelo;

\\\\- uso del suelo;

\\\\- condición hidrológica;

\\\\- humedad antecedente;

\\\\- ajuste dinámico potencial con información SIATA.



Para La Iguana PC\\\\\\\_80 se conserva:



```js

CN: 88





