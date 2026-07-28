#!/usr/bin/env node
/**
 * HF-CODEMAP CLI de consultas v1.1.0
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
const propsFlows = load("props_flows.json");
const index = load("index.json");

const cmd = process.argv[2];
const arg = process.argv[3] || "";

function pad(s, n) { return String(s).padEnd(n).slice(0, n); }

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
  const syms = symbols.filter(s => s.name === name);
  if (syms.length === 0) {
    // Fallback to partial match
    const partial = symbols.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
    if (partial.length === 0) {
      // Still not found: search props_flows
      const pf = propsFlows.filter(p => p.propName === name);
      if (pf.length > 0) {
        console.log("'" + name + "' no es variable clasica, pero es prop/callback:");
        for (const p of pf.slice(0, 10)) {
          console.log("  [" + p.kind + "] " + p.propName + " en " + p.file + ":" + p.line);
          console.log("    " + p.fromComponent + " -> " + p.toComponent);
          if (p.valueExpression) console.log("    valor: " + p.valueExpression);
        }
        return;
      }
      // Search state links
      const slMatches = [];
      for (const item of load("props_flows.json")) {
        // stateLinks are embedded in reactFlows but not exported separately; check propsFlows for state_setter
      }
      console.log("Variable/prop/state '" + name + "' no encontrada.");
      return;
    }
    console.log("Variable '" + name + "' - coincidencias parciales (" + partial.length + "):");
    for (const s of partial.slice(0, 10)) {
      console.log("  [" + s.kind + "] " + s.name + " en " + s.file + ":" + s.line);
      if (s.domains?.length) console.log("    Dominios: " + s.domains.join(", "));
    }
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
    // Also show prop flows for this name
    const pf = propsFlows.filter(p => p.propName === s.name);
    if (pf.length > 0) {
      console.log("  Prop flows (" + pf.length + "):");
      for (const p of pf.slice(0, 5)) {
        console.log("    [" + p.kind + "] " + p.fromComponent + " -> " + p.toComponent + " en " + p.file + ":" + p.line);
      }
    }
    console.log("");
  }
}

function cmdProp(name) {
  const results = propsFlows.filter(p =>
    p.propName === name || p.propName?.toLowerCase().includes(name.toLowerCase())
  );
  console.log("Props que coinciden con '" + name + "' (" + results.length + "):");
  for (const p of results.slice(0, 15)) {
    console.log("  [" + p.kind + "] " + p.propName);
    console.log("    " + p.fromComponent + " -> " + p.toComponent);
    console.log("    " + p.file + ":" + p.line);
    if (p.valueExpression) console.log("    valor: " + p.valueExpression);
    if (p.target) console.log("    target: " + p.target);
    if (p.domains?.length) console.log("    dominios: " + p.domains.join(", "));
    console.log("");
  }
}

function cmdCallback(name) {
  const results = propsFlows.filter(p =>
    (p.kind === "callback_prop") &&
    (p.propName === name || p.propName?.toLowerCase().includes(name.toLowerCase()))
  );
  console.log("Callbacks que coinciden con '" + name + "' (" + results.length + "):");
  for (const p of results.slice(0, 15)) {
    console.log("  " + p.propName);
    console.log("    Recibido por: " + p.toComponent + " en " + p.file);
    if (p.valueExpression) console.log("    valor: " + p.valueExpression);
    if (p.domains?.length) console.log("    dominios: " + p.domains.join(", "));
    // Find where this callback is passed
    const passing = propsFlows.filter(pp => pp.propName === p.propName && pp.kind === "callback_prop" && pp.file !== p.file);
    if (passing.length > 0) {
      console.log("    Tambien pasado en:");
      for (const pp of passing) {
        console.log("      " + pp.fromComponent + " -> " + pp.toComponent + " en " + pp.file + ":" + pp.line);
      }
    }
    console.log("");
  }
}

function cmdStateFlow(name) {
  console.log("=== State flow: " + name + " ===");
  // Find state setter pairs
  const stateFlows = propsFlows.filter(p => p.kind === "state_setter");
  let found = false;
  for (const sf of stateFlows) {
    if (sf.target === name || sf.propName === name || sf.propName.toLowerCase().includes(name.toLowerCase())) {
      found = true;
      console.log("");
      console.log("State: " + sf.target + ", Setter: " + sf.propName);
      console.log("  Definido en: " + sf.file + ":" + sf.line + " (" + sf.fromComponent + ")");
      // Find useCallback wrappers
      const wrappers = propsFlows.filter(p =>
        p.kind === "component_edge" &&
        p.file === sf.file &&
        p.valueExpression?.includes(sf.propName)
      );
      for (const w of wrappers) {
        console.log("  Envuelto por: " + w.propName + " en " + w.file + ":" + w.line);
      }
      // Find who passes this setter as prop
      const passers = propsFlows.filter(p =>
        (p.kind === "prop_passed" || p.kind === "callback_prop") &&
        (p.valueExpression === sf.propName || p.valueExpression?.includes(sf.propName))
      );
      for (const pas of passers) {
        console.log("  Pasado como prop: " + pas.propName + " de " + pas.fromComponent + " a " + pas.toComponent + " en " + pas.file + ":" + pas.line);
      }
    }
  }
  if (!found) {
    // Also search in all props for this name
    const allMatches = propsFlows.filter(p =>
      p.propName?.toLowerCase().includes(name.toLowerCase()) ||
      p.target?.toLowerCase().includes(name.toLowerCase()) ||
      p.valueExpression?.toLowerCase().includes(name.toLowerCase())
    );
    if (allMatches.length > 0) {
      console.log("Coincidencias en props_flows (" + allMatches.length + "):");
      for (const m of allMatches.slice(0, 10)) {
        console.log("  [" + m.kind + "] " + m.propName + " -> " + m.target + " en " + m.file + ":" + m.line);
      }
    } else {
      console.log("State '" + name + "' no encontrado.");
    }
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
  const seen = new Set();
  let count = 0;
  console.log("Consumidores de '" + name + "' (" + references.filter(r => r.symbol.toLowerCase().includes(name.toLowerCase())).length + "):");
  for (const r of references) {
    if (!r.symbol.toLowerCase().includes(name.toLowerCase())) continue;
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
  console.log("--- Productores ---");
  for (const p of f.producers.slice(0, 10)) console.log("  " + pad(p.name, 30) + p.file + ":" + p.line);
  console.log("--- Consumidores ---");
  for (const c of f.consumers.slice(0, 15)) console.log("  " + pad(c.name, 30) + c.file + ":" + c.line);
  console.log("--- Guards ---");
  for (const g of f.guards.slice(0, 10)) console.log("  " + pad(g.type, 20) + g.file + ":" + g.line + (g.message ? " -> " + g.message : ""));
  // Also show props flows for this domain
  const pf = propsFlows.filter(p => p.domains?.includes(f.domain));
  if (pf.length > 0) {
    console.log("--- Props flows (" + pf.length + ") ---");
    for (const p of pf.slice(0, 10)) console.log("  [" + p.kind + "] " + p.propName + " " + p.fromComponent + "->" + p.toComponent);
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
  const results = impact.filter(i => i.symbol?.toLowerCase().includes(name.toLowerCase()));
  console.log("Impacto de '" + name + "' (" + results.length + "):");
  for (const imp of results.slice(0, 10)) {
    console.log("  " + pad(imp.symbol, 30) + imp.file + ":" + imp.line + " [" + imp.kind + "]");
    console.log("    Referencias directas: " + imp.directReferences);
    if (imp.guardsImpacted?.length) {
      console.log("    Guards impactados:");
      for (const g of imp.guardsImpacted.slice(0, 5)) console.log("      " + g.file + ":" + g.line + " [" + g.type + "]");
    }
    if (imp.possibleFlowsImpacted?.length) console.log("    Flujos impactados: " + imp.possibleFlowsImpacted.join(", "));
    console.log("");
  }
}

function cmdAlias(name) {
  const results = aliases.filter(a =>
    a.canonical.toLowerCase().includes(name.toLowerCase()) ||
    a.aliases.some(al => al.toLowerCase().includes(name.toLowerCase()))
  );
  console.log("Alias para '" + name + "' (" + results.length + "):");
  for (const a of results) {
    console.log("  Canonico: " + a.canonical + " [dominio=" + a.domain + "]");
    console.log("  Aliases: " + (a.aliases?.join(", ") || "N/A"));
  }
}

function cmdArchivo(text) {
  const results = files.filter(f => f.path?.toLowerCase().includes(text.toLowerCase()));
  console.log("Archivos que coinciden con '" + text + "' (" + results.length + "):");
  for (const f of results.slice(0, 15)) console.log("  " + pad(f.path, 50) + f.lineCount + " lineas [" + (f.domains?.join(",") || "N/A") + "]");
}

function cmdBuscar(text) {
  const lower = text.toLowerCase();
  console.log("Busqueda: '" + text + "'");
  const symMatches = symbols.filter(s => s.name.toLowerCase().includes(lower));
  if (symMatches.length > 0) {
    console.log("--- Simbolos (" + symMatches.length + ") ---");
    for (const s of symMatches.slice(0, 10)) console.log("  " + pad(s.name, 25) + s.file + ":" + s.line + " [" + s.kind + "]");
  }
  const refMatches = references.filter(r => r.symbol?.toLowerCase().includes(lower) || r.text?.toLowerCase().includes(lower));
  if (refMatches.length > 0) {
    console.log("--- Referencias (" + refMatches.length + ") ---");
    for (const r of refMatches.slice(0, 5)) console.log("  " + r.file + ":" + r.line + " -> " + r.symbol);
  }
  const guardMatches = guards.filter(g => g.text?.toLowerCase().includes(lower));
  if (guardMatches.length > 0) {
    console.log("--- Guards (" + guardMatches.length + ") ---");
    for (const g of guardMatches.slice(0, 5)) console.log("  " + g.file + ":" + g.line + " [" + g.guardType + "]");
  }
  const pfMatches = propsFlows.filter(p => p.propName?.toLowerCase().includes(lower) || p.valueExpression?.toLowerCase().includes(lower));
  if (pfMatches.length > 0) {
    console.log("--- Props flows (" + pfMatches.length + ") ---");
    for (const p of pfMatches.slice(0, 10)) console.log("  [" + p.kind + "] " + p.propName + " " + p.fromComponent + "->" + p.toComponent + " " + p.file + ":" + p.line);
  }
}

function cmdReactFlow(text) {
  const lower = text.toLowerCase();
  // Search reactFlows
  const rfMatches = reactFlows.filter(rf =>
    rf.component?.toLowerCase().includes(lower) ||
    rf.hook?.toLowerCase().includes(lower) ||
    rf.file?.toLowerCase().includes(lower) ||
    rf.callbacks?.some(c => c.toLowerCase().includes(lower))
  );
  console.log("React flows que coinciden con '" + text + "' (" + rfMatches.length + "):");
  for (const rf of rfMatches.slice(0, 10)) {
    console.log("  " + rf.file + ":" + rf.line);
    console.log("    Componente: " + rf.component + " | Hook: " + rf.hook);
    if (rf.produces?.length) console.log("    Produce: " + rf.produces.join(", "));
    if (rf.dependencies?.length) console.log("    Dependencias: " + rf.dependencies.join(", "));
    if (rf.callbacks?.length) console.log("    Callbacks: " + rf.callbacks.join(", "));
    if (rf.stateLinks?.length) console.log("    State links: " + rf.stateLinks.map(sl => sl.setter + "->" + sl.state).join(", "));
    console.log("");
  }
  // Also search props flows
  const pfMatches = propsFlows.filter(p =>
    p.propName?.toLowerCase().includes(lower) ||
    p.fromComponent?.toLowerCase().includes(lower) ||
    p.toComponent?.toLowerCase().includes(lower) ||
    p.valueExpression?.toLowerCase().includes(lower)
  );
  if (pfMatches.length > 0) {
    console.log("Props/callbacks relacionados (" + pfMatches.length + "):");
    for (const p of pfMatches.slice(0, 10)) {
      console.log("  [" + p.kind + "] " + p.propName + " " + p.fromComponent + "->" + p.toComponent + " " + p.file + ":" + p.line);
      if (p.valueExpression) console.log("    valor: " + p.valueExpression);
    }
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
    console.log("  Output: " + df.outputSection);
    if (df.guards?.length) console.log("  Guards: " + df.guards.length);
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
  prop: cmdProp,
  callback: cmdCallback,
  "state-flow": cmdStateFlow,
  "react-flow": cmdReactFlow,
  "document-flow": cmdDocumentFlow,
};

if (commands[cmd]) {
  commands[cmd](arg);
} else {
  console.log("HF-CODEMAP CLI v1.1.0");
  console.log("Comandos: resumen | variable <n> | prop <n> | callback <n> | state-flow <n>");
  console.log("  productor <n> | consumidor <n> | flujo <d> | guard <t> | impacto <n>");
  console.log("  alias <n> | archivo <t> | buscar <t> | react-flow <t> | document-flow <t>");
  if (cmd) console.log("Comando desconocido: " + cmd);
}
