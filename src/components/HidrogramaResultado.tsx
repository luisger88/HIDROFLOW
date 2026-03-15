// src/components/HidrogramaResultado.tsx
import React from "react";
import { useHidrograma } from "../hooks/useHidrograma";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend
} from "recharts";

type Props = {
  P_mm: number[];   // P(t) mm por Δt
  dt_min: number;
  A_km2: number;
  Tc_min: number;
  CN: number;
  AMC: "I" | "II" | "III";
  pctImperv: number;
};

function buildData(ticks: number[], Q: number[], P: number[]) {
  return ticks.map((t, i) => ({
    t_min: t,
    Q_m3s: Q[i] ?? 0,
    P_mm: P[i] ?? 0
  }));
}

function toCSV(rows: any[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const r of rows) lines.push(headers.map(h => r[h]).join(","));
  return lines.join("\n");
}

export default function HidrogramaResultado({
  P_mm, dt_min, A_km2, Tc_min, CN, AMC, pctImperv
}: Props) {

  const { ok, Pn_mm, Q_m3s, kpis, meta } = useHidrograma({
    P_mm, dt_min, A_km2, Tc_min, CN, AMC, pctImperv
  });

  if (!ok) return <div className="card">Carga los parámetros para ver Q(t)</div>;

  const ticks = Array.from({ length: Q_m3s.length }, (_, i) => i * dt_min);
  const data = buildData(ticks, Q_m3s, Pn_mm);

  const onExportCSV = () => {
    const csv = toCSV(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Hidrograma_Q.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card" style={{ padding: 12 }}>
      <h3>Hidrograma Q(t) — SCS</h3>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <div className="kpi">Qp: <b>{kpis.Qp_m3s.toFixed(2)}</b> m³/s</div>
        <div className="kpi">Tp (min): <b>{(kpis.Tp_idx * dt_min).toFixed(0)}</b></div>
        <div className="kpi">Vol (m³): <b>{kpis.Vol_m3.toFixed(0)}</b></div>
        <div className="kpi">Tp_UH (min): <b>{meta.Tp_min}</b></div>
        <div className="kpi">Tb_UH (min): <b>{meta.Tb_min}</b></div>
        <div className="kpi">qp_UH: <b>{meta.qp_m3s_mm}</b> m³/s/mm</div>
      </div>

      <div style={{ width: "100%", height: 320, marginTop: 8 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: 8, right: 16, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t_min" label={{ value: "Tiempo (min)", position: "insideBottom", dy: 8 }} />
            <YAxis yAxisId="left" label={{ value: "Q (m³/s)", angle: -90, position: "insideLeft" }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: "Pn (mm)", angle: -90, position: "insideRight" }} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="Q_m3s" stroke="#1565c0" strokeWidth={2} dot={false} name="Q (m³/s)" />
            <Line yAxisId="right" type="monotone" dataKey="P_mm" stroke="#8e24aa" strokeWidth={1} dot={false} name="Pn (mm)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: 8 }}>
        <button className="btn" onClick={onExportCSV}>Exportar CSV Q(t)</button>
      </div>
    </div>
  );
}