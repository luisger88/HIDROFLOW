#!/usr/bin/env node
/**
 * HF-CODEMAP CLI de consultas v1.0.0
 * Uso: node consultar-hidroflow.mjs <comando> [argumento]
 */

import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(import.meta.dirname, "out");

function load(name) {
  const fpath = path.join(OUT_DIR, name);
  if (!fs.existsSync(fpath)) return [];
  return JSON.parse(fs.readFileSync(fpath, "utf-8"));
}

const files = load("files.json");
const symbols = load("symbols.json");
const references = load("references.json");
const guards = load("guards.json");
const flows = load("flows.json");
const aliases = load("aliases.json");
const impact = load("impact.json");
const reactFlows = load("react_flows.json");
const documentFlows = load("document_flows.json");
const index = load("index.json");

const cmd = process.argv[2];
const arg = process.argv[3] || "";

function pad(s, n) { return String(s).padEnd(n).slice(0, n); }

function findSymbol(name) {
  const exact = symbols.filter(s => s.name === name);
  if (exact.length > 0) return exact;
  return symbols.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
}

function findRefs(name) {
  return references.filter(r => r.symbol.toLowerCase().includes(name.toLowerCase()));
}

function findAliases(name) {
  return aliases.filter(a =>
    a.canonical.toLowerCase().includes(name.toLowerCase()) ||
    a.aliases.some(al => al.toLowerCase().includes(name.toLowerCase()))
  );
}

function cmdResumen() {
  if (!index || !index.totals) {
    console.log("Indice no encontrado. Ejecuta primero indexar-hidroflow.mjs");
    return;
  }
  console.log("=== HF-CODEMAP Resumen ===");
  console.log("Version:", index.version);
  console.log("Generado:", index.generated);
  console.log("");
  for (const [k, v] of Object.entries(index.totals)) {
    console.log(pad(k, 22) + v);
  }
  console.log("");
  console.log("Dominios:", index.topDomains?.join(", ") || "N/A");
}

function cmdVariable(name) {
  const syms = findSymbol(name);
  if (syms.length === 0) {
    console.log("Variable '" + name + "' no encontrada.");
    return;
  }
  for (const s of syms.slice(0, 10)) {
    console.log("[" + s.kind + "] " + s.name + " en " + s.file + ":" + s.line);
    if (s.domains?.length) console.log("  Dominios: " + s.domains.join(", "));
    const refs = references.filter(r => r.symbol === s.name);
    if (refs.length > 0) {
      console.log("  Referencias (" + refs.length + "):");
      for (const r of refs.slice(0, 5)) {
        console.log("    " + r.file + ":" + r.line);
      }
    }
    console.log("");
  }
}

function cmdProductor(name) {
  const syms = symbols.filter(s =>
    s.name.toLowerCase().includes(name.toLowerCase()) &&
    (s.kind === "variable" || s.kind === "function")
  );
  console.log("Productores de '" + name + "' (" + syms.length + "):");
  for (const s of syms.slice(0, 15)) {
    console.log("  " + pad(s.name, 30) + s.file + ":" + s.line + " [" + s.kind + "]");
  }
}

function cmdConsumidor(name) {
  const refs = findRefs(name);
  console.log("Consumidores de '" + name + "' (" + refs.length + "):");
  const seen = new Set();
  let count = 0;
  for (const r of refs) {
    const key = r.file + ":" + r.line;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log("  " + pad(r.symbol, 30) + r.file + ":" + r.line);
    if (++count >= 20) break;
  }
}

function cmdFlujo(domain) {
  const f = flows.find(fl => fl.domain && fl.domain.toLowerCase() === domain.toLowerCase());
  if (!f) {
    console.log("Dominio '" + domain + "' no encontrado. Disponibles: " + flows.map(f => f.domain).join(", "));
    return;
  }
  console.log("=== Flujo: " + f.domain + " ===");
  console.log("");
  console.log("--- Productores ---");
  for (const p of f.producers.slice(0, 10)) {
    console.log("  " + pad(p.name, 30) + p.file + ":" + p.line);
  }
  console.log("");
  console.log("--- Consumidores ---");
  for (const c of f.consumers.slice(0, 15)) {
    console.log("  " + pad(c.name, 30) + c.file + ":" + c.line);
  }
  console.log("");
  console.log("--- Guards ---");
  for (const g of f.guards.slice(0, 10)) {
    console.log("  " + pad(g.type, 20) + g.file + ":" + g.line + (g.message ? " -> " + g.message : ""));
  }
}

function cmdGuard(text) {
  const results = guards.filter(g =>
    g.guardType?.toLowerCase().includes(text.toLowerCase()) ||
    g.text?.toLowerCase().includes(text.toLowerCase()) ||
    g.probableMessage?.toLowerCase().includes(text.toLowerCase())
  );
  console.log("Guards que coinciden con '" + text + "' (" + results.length + "):");
  for (const g of results.slice(0, 10)) {
    console.log("  [" + g.guardType + "] " + g.file + ":" + g.line);
    if (g.probableMessage) console.log("    Mensaje: " + g.probableMessage);
    if (g.domains?.length) console.log("    Dominios: " + g.domains.join(", "));
  }
}

function cmdImpacto(name) {
  const results = impact.filter(i =>
    i.symbol?.toLowerCase().includes(name.toLowerCase())
  );
  console.log("Impacto de '" + name + "' (" + results.length + "):");
  for (const imp of results.slice(0, 10)) {
    console.log("  " + pad(imp.symbol, 30) + imp.file + ":" + imp.line + " [" + imp.kind + "]");
    console.log("    Referencias directas: " + imp.directReferences);
    if (imp.guardsImpacted?.length) {
      console.log("    Guards impactados:");
      for (const g of imp.guardsImpacted.slice(0, 5)) {
        console.log("      " + g.file + ":" + g.line + " [" + g.type + "]");
      }
    }
    if (imp.possibleFlowsImpacted?.length) {
      console.log("    Flujos impactados: " + imp.possibleFlowsImpacted.join(", "));
    }
    console.log("");
  }
}

function cmdAlias(name) {
  const results = findAliases(name);
  console.log("Alias para '" + name + "' (" + results.length + "):");
  for (const a of results) {
    console.log("  Canonico: " + a.canonical + " [dominio=" + a.domain + "]");
    console.log("  Aliases: " + (a.aliases?.join(", ") || "N/A"));
  }
}

function cmdArchivo(text) {
  const results = files.filter(f =>
    f.path?.toLowerCase().includes(text.toLowerCase())
  );
  console.log("Archivos que coinciden con '" + text + "' (" + results.length + "):");
  for (const f of results.slice(0, 15)) {
    console.log("  " + pad(f.path, 50) + f.lineCount + " lineas [" + (f.domains?.join(",") || "N/A") + "]");
  }
}

function cmdBuscar(text) {
  const lower = text.toLowerCase();
  console.log("Busqueda: '" + text + "'");
  console.log("");

  const symMatches = symbols.filter(s => s.name.toLowerCase().includes(lower));
  if (symMatches.length > 0) {
    console.log("--- Simbolos (" + symMatches.length + ") ---");
    for (const s of symMatches.slice(0, 10)) {
      console.log("  " + pad(s.name, 25) + s.file + ":" + s.line + " [" + s.kind + "]");
    }
  }

  const refMatches = references.filter(r =>
    r.symbol?.toLowerCase().includes(lower) || r.text?.toLowerCase().includes(lower)
  );
  if (refMatches.length > 0) {
    console.log("--- Referencias (" + refMatches.length + ") ---");
    for (const r of refMatches.slice(0, 5)) {
      console.log("  " + r.file + ":" + r.line + " -> " + r.symbol);
    }
  }

  const guardMatches = guards.filter(g => g.text?.toLowerCase().includes(lower));
  if (guardMatches.length > 0) {
    console.log("--- Guards (" + guardMatches.length + ") ---");
    for (const g of guardMatches.slice(0, 5)) {
      console.log("  " + g.file + ":" + g.line + " [" + g.guardType + "]");
    }
  }

  const flowMatches = flows.filter(f => f.domain?.toLowerCase().includes(lower));
  if (flowMatches.length > 0) {
    console.log("--- Flujos (" + flowMatches.length + ") ---");
    for (const f of flowMatches) {
      console.log("  " + f.domain);
    }
  }
}

function cmdReactFlow(text) {
  const lower = text.toLowerCase();
  const results = reactFlows.filter(rf =>
    rf.component?.toLowerCase().includes(lower) ||
    rf.hook?.toLowerCase().includes(lower) ||
    rf.file?.toLowerCase().includes(lower) ||
    rf.callbacks?.some(c => c.toLowerCase().includes(lower))
  );
  console.log("React flows que coinciden con '" + text + "' (" + results.length + "):");
  for (const rf of results.slice(0, 10)) {
    console.log("  " + rf.file + ":" + rf.line);
    console.log("    Componente: " + rf.component + " | Hook: " + rf.hook);
    if (rf.produces?.length) console.log("    Produce: " + rf.produces.join(", "));
    if (rf.dependencies?.length) console.log("    Dependencias: " + rf.dependencies.join(", "));
    if (rf.callbacks?.length) console.log("    Callbacks: " + rf.callbacks.join(", "));
    console.log("");
  }
}

function cmdDocumentFlow(text) {
  const lower = text.toLowerCase();
  const results = documentFlows.filter(df =>
    df.domain?.toLowerCase().includes(lower) ||
    df.source?.toLowerCase().includes(lower) ||
    df.outputSection?.toLowerCase().includes(lower)
  );
  console.log("Document flows para '" + text + "' (" + results.length + "):");
  for (const df of results) {
    console.log("  Dominio: " + df.domain);
    console.log("  Source: " + df.source);
    console.log("  Payload fields: " + (df.payloadFields?.join(", ") || "N/A"));
    console.log("  Markdown fields: " + (df.markdownFields?.slice(0, 8).join(", ") || "N/A"));
    console.log("  Output: " + df.outputSection);
    if (df.guards?.length) {
      console.log("  Guards: " + df.guards.length);
      for (const g of df.guards.slice(0, 5)) {
        console.log("    " + g.file + ":" + g.line + " [" + g.type + "]");
      }
    }
  }
}

// Dispatch
const commands = {
  resumen: cmdResumen,
  variable: cmdVariable,
  productor: cmdProductor,
  consumidor: cmdConsumidor,
  flujo: cmdFlujo,
  guard: cmdGuard,
  impacto: cmdImpacto,
  alias: cmdAlias,
  archivo: cmdArchivo,
  buscar: cmdBuscar,
  "react-flow": cmdReactFlow,
  "document-flow": cmdDocumentFlow,
};

if (commands[cmd]) {
  commands[cmd](arg);
} else {
  console.log("HF-CODEMAP CLI v1.0.0");
  console.log("Comandos: resumen | variable <n> | productor <n> | consumidor <n> | flujo <d> | guard <t> | impacto <n> | alias <n> | archivo <t> | buscar <t> | react-flow <t> | document-flow <t>");
  if (cmd) console.log("Comando desconocido: " + cmd);
}
