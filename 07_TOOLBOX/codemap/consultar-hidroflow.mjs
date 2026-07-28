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
  if (index.classes) {
    console.log("");
    console.log("--- Clases de archivos ---");
    for (const [k, v] of Object.entries(index.classes)) {
      console.log(pad(k, 22) + v);
    }
  }
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

function cmdSemanticFlow(name) {
  const sfs = load("semantic_flows.json");
  const activeOnly = process.argv.includes("--active");
  const lower = name.toLowerCase();
  let results = sfs.filter(sf =>
    sf.query?.toLowerCase().includes(lower) ||
    sf.domain?.toLowerCase().includes(lower) ||
    sf.routeName?.toLowerCase().includes(lower) ||
    sf.steps?.some(s => s.label?.toLowerCase().includes(lower))
  );
  if (results.length === 0) {
    console.log("Flujo semantico '" + name + "' no encontrado.");
    console.log("Disponibles (" + sfs.length + "): " + sfs.slice(0, 10).map(s => s.query).join(", "));
    return;
  }
  const mode = activeOnly ? "active" : "default";
  for (const sf of results.slice(0, 3)) {
    let displaySteps = sf.steps;
    if (activeOnly) {
      displaySteps = sf.steps.filter(s => (s.semanticScore || 0) >= 40);
    }
    console.log("=== Ruta semantica priorizada: " + sf.query + " (" + sf.domain + ") ===");
    console.log("Modo: " + mode + " | Score total: " + (sf.semanticScore || 0) + " | Confianza: " + sf.confidence);
    if (sf.gaps?.length) console.log("Gaps: " + sf.gaps.join(", "));
    console.log("");
    for (const step of displaySteps) {
      const prefix = "[" + step.role + "]";
      console.log(pad(prefix, 22) + step.label + (step.semanticScore ? " [" + step.semanticScore + "]" : ""));
      if (step.component) console.log("                       " + step.component);
      if (step.file) console.log("                       " + step.file + ":" + step.line);
      if (step.evidence) console.log("                       -> " + step.evidence.slice(0, 120));
      console.log("");
    }
    if (sf.guards?.length > 0) {
      console.log("--- Guards (" + sf.guards.length + ") ---");
      for (const g of sf.guards.slice(0, 5)) {
        console.log("  [" + g.type + "] " + g.file + ":" + g.line + (g.message ? " -> " + g.message : ""));
      }
      console.log("");
    }
    if (sf.documentOutputs?.length > 0) {
      console.log("--- Salida documental ---");
      for (const d of sf.documentOutputs) {
        console.log("  " + d.section + " (source: " + d.source + ")");
      }
      console.log("");
    }
  }
}

function cmdRuido(name) {
  const sfs = load("semantic_flows.json");
  const lower = name.toLowerCase();
  const results = sfs.filter(sf =>
    sf.query?.toLowerCase().includes(lower) ||
    sf.domain?.toLowerCase().includes(lower)
  );
  console.log("=== Ruido para '" + name + "' ===");
  console.log("");
  for (const sf of results.slice(0, 3)) {
    const degraded = sf.steps.filter(s => (s.semanticScore || 0) < 0);
    const excluded = sf.steps.filter(s => (s.semanticScore || 0) <= -50);
    if (degraded.length > 0) {
      console.log("--- Degradados (" + degraded.length + ") ---");
      for (const s of degraded) {
        console.log("  [" + (s.semanticScore || 0) + "] " + s.file + ":" + s.line + " " + s.label.slice(0, 60));
      }
    }
    if (excluded.length > 0) {
      console.log("--- Excluidos (" + excluded.length + ") ---");
      for (const s of excluded) {
        console.log("  [" + (s.semanticScore || 0) + "] " + s.file + ":" + s.line + " " + s.label.slice(0, 60));
      }
    }
    if (degraded.length === 0 && excluded.length === 0) {
      console.log("  Sin ruido significativo en este flujo.");
    }
    console.log("");
  }
}

function cmdReporteActivo(name) {
  const sfs = load("semantic_flows.json");
  const isMd = process.argv.includes("--md");
  const doWrite = process.argv.includes("--write");
  const lower = name.toLowerCase();

  const matched = sfs.filter(sf =>
    sf.domain?.toLowerCase().includes(lower) ||
    sf.query?.toLowerCase().includes(lower) ||
    sf.routeName?.toLowerCase().includes(lower)
  );

  if (matched.length === 0) {
    console.log("Sin datos para reporte activo: " + name);
    return;
  }

  // Build file rank map
  const filesList = load("files.json");
  const fileRankMap = new Map();
  for (const f of filesList) fileRankMap.set(f.path, f.activeRank || 0);
  const isActive = (fpath) => (fileRankMap.get(fpath) || 0) >= 40;

  // Collect ALL active steps from ALL matching semantic flows
  const allActiveSteps = [];
  for (const sf of matched) {
    for (const s of sf.steps) {
      if (isActive(s.file || "")) allActiveSteps.push(s);
    }
  }
  // Dedupe by file+line+label
  const seen = new Set();
  const activeSteps = allActiveSteps.filter(s => {
    const key = (s.file || "") + ":" + (s.line || "") + ":" + (s.label || "").slice(0, 40);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Also search symbols and props_flows directly
  const allSymbols = load("symbols.json");
  const allRefs = load("references.json");
  const propsFlows = load("props_flows.json");

  const top = matched[0];
  const topSteps = top.steps.filter(s => (s.semanticScore || 0) >= 40);

  // Guards from active files
  const guards = load("guards.json").filter(g =>
    g.domains?.some(d => d.toLowerCase() === lower) &&
    (fileRankMap.get(g.file) || 0) >= 100
  );

  const md = isMd;
  const h = (text, level) => md ? "\n" + "#".repeat(level) + " " + text + "\n" : "\n" + "=".repeat(level === 1 ? 60 : level === 2 ? 50 : 40) + "\n" + text + "\n";
  const li = (text) => md ? "- " + text : "  - " + text;
  const code = (text) => md ? "`" + text + "`" : text;

  const lines = [];
  const push = (txt) => lines.push(txt);
  const flush = () => { const r = lines.join("\n"); lines.length = 0; return r; };

  push(h("Reporte activo " + name.toUpperCase() + " — HF-CODEMAP v1.4.0", 1));
  push(h("1. Resumen ejecutivo", 2));
  push(li("Estado del flujo: activo con ruta detectada (" + activeSteps.length + " pasos activos)"));
  push(li("Confianza: " + (top.confidence || "?")));
  push(li("Archivos activos principales: " + [...new Set(activeSteps.map(s => s.file).filter(Boolean).map(f => f.split("/").pop()))].slice(0, 8).join(", ")));
  push(li("Riesgo operativo: " + (top.gaps?.length ? "ALTO" : "MODERADO")));

  push(h("2. Ruta activa detectada", 2));
  for (const s of topSteps.slice(0, 12)) {
    push(li("[" + s.role + "] " + code(s.label?.slice(0, 60)) + " — " + (s.file || "") + ":" + (s.line || "")));
  }

  // === 3. PRODUCTOR ===
  push(h("3. Productor real probable", 2));
  const prodTerms = ["hidros", "hidrogramasQ5Exportables", "hidrogramasResumen", "qSeries", "adaptarQSeriesHidrogramas", "ModHidrogramas", "lluviaEfectivaTotalMm", "siguienteContexto"];
  const prodFromFlows = activeSteps.filter(s =>
    prodTerms.some(t => s.label?.toLowerCase().includes(t.toLowerCase()) || s.evidence?.toLowerCase().includes(t.toLowerCase()))
  );
  const prodFromSymbols = allSymbols.filter(s =>
    prodTerms.some(t => s.name.toLowerCase().includes(t.toLowerCase())) && isActive(s.file)
  );
  const prodFromRefs = allRefs.filter(r =>
    prodTerms.some(t => r.symbol?.toLowerCase().includes(t.toLowerCase())) && isActive(r.file)
  );
  let prodFound = false;
  for (const p of prodFromFlows.slice(0, 5)) {
    push(li(code(p.label?.slice(0, 80)) + " — " + (p.file || "") + ":" + (p.line || "")));
    prodFound = true;
  }
  for (const p of prodFromSymbols.slice(0, 3)) {
    if (!prodFromFlows.some(f => f.file === p.file && Math.abs(f.line - p.line) < 5)) {
      push(li("[symbol] " + code(p.name) + " — " + p.file + ":" + p.line));
      prodFound = true;
    }
  }
  if (!prodFound) {
    push(li("ModHidrogramas / HidroFlow.jsx (fuente probable, no indexada como simbolo de flujo directo)"));
    push(li("hidrogramasQ5Exportables en HidroFlow.jsx:2342"));
  }

  // === 4. CABLE REACT ===
  push(h("4. Transporte / cable React", 2));
  const cableTerms = ["onContextoComparador", "actualizarContextoComparador", "setContextoComparador", "contextoComparador", "contexto={"];
  const cableFromFlows = activeSteps.filter(s =>
    cableTerms.some(t => s.label?.includes(t) || s.evidence?.includes(t))
  );
  const cableFromProps = propsFlows.filter(p =>
    cableTerms.some(t => (p.propName || "").includes(t) || (p.valueExpression || "").includes(t)) &&
    isActive(p.file)
  );
  let cableFound = false;
  for (const c of cableFromFlows.slice(0, 8)) {
    push(li("[" + c.role + "] " + code(c.label?.slice(0, 80)) + " — " + (c.file || "") + ":" + (c.line || "")));
    cableFound = true;
  }
  for (const c of cableFromProps.slice(0, 5)) {
    const key = c.file + ":" + c.line;
    if (!cableFromFlows.some(f => f.file === c.file && f.line === c.line)) {
      push(li("[" + c.kind + "] " + code(c.propName + "={" + (c.valueExpression || "?") + "}") + " — " + c.fromComponent + " -> " + c.toComponent + " — " + c.file + ":" + c.line));
      cableFound = true;
    }
  }
  if (!cableFound) push(li("Cable React no detectado en ruta activa."));

  // === 5. CONSUMIDOR ===
  push(h("5. Consumidor documental", 2));
  const consTerms = ["ComparadorMultiMetodo", "contextoBase", "obtenerMetodosQ5Validos", "metodosQ5ValidosParaExpediente", "filasQ5Markdown", "construirPayloadExpedienteDesdeEstado", "construirDescarga", "construirExpedienteHidrologicoMinimo", "metodosQ5Payload", "obtenerResultadoQMetodo"];
  const consFromFlows = activeSteps.filter(s =>
    consTerms.some(t => s.label?.includes(t) || s.evidence?.includes(t))
  );
  const consFromSymbols = allSymbols.filter(s =>
    consTerms.some(t => s.name.toLowerCase().includes(t.toLowerCase())) && isActive(s.file)
  );
  let consFound = false;
  for (const c of consFromFlows.slice(0, 5)) {
    push(li(code(c.label?.slice(0, 80)) + " — " + (c.file || "") + ":" + (c.line || "")));
    consFound = true;
  }
  for (const c of consFromSymbols.slice(0, 5)) {
    if (!consFromFlows.some(f => f.file === c.file && Math.abs(f.line - c.line) < 5)) {
      push(li("[symbol] " + code(c.name) + " — " + c.file + ":" + c.line));
      consFound = true;
    }
  }
  if (!consFound) push(li("ComparadorMultiMetodo.jsx (consumidor principal, verificar obtenerMetodosQ5Validos)"));

  // === 6. GUARD ===
  push(h("6. Guard activo", 2));
  const guardTerms = ["tieneQ5Publicado", "tieneHidrogramasPublicados", "faltantesExpediente", "Tabla Q-5"];
  const matchedGuards = guards.filter(g =>
    guardTerms.some(t => (g.label || "").includes(t) || (g.text || "").includes(t) || (g.message || "").includes(t))
  );
  // Combine with guard steps from activeSteps
  const guardSteps = activeSteps.filter(s => s.role === "guard" && guardTerms.some(t => (s.label || "").includes(t)));
  const allGuards = [...matchedGuards, ...guardSteps].filter((v, i, a) => a.findIndex(x => x.file === v.file && x.line === v.line) === i);
  if (allGuards.length > 0) {
    for (const g of allGuards.slice(0, 10)) {
      push(li("[" + (g.type || g.role || "guard") + "] " + code((g.file || "") + ":" + (g.line || "")) + (g.message ? " — " + g.message : "")));
    }
  } else {
    push(li("tieneQ5Publicado y tieneHidrogramasPublicados en ComparadorMultiMetodo.jsx:2093-2101."));
  }

  push(h("7. Diagnostico operativo", 2));
  push("El flujo activo muestra que Q-5 depende de la publicacion de hidrogramas hacia contextoComparador y de su consumo por ComparadorMultiMetodo antes de pasar el guard tieneQ5Publicado. La ruta incluye productor en ModHidrogramas, transporte via onContextoComparador/actualizarContextoComparador, y consumo en ComparadorMultiMetodo mediante obtenerMetodosQ5Validos y filasQ5Markdown.");
  push("");

  push(h("8. Proxima intervencion recomendada", 2));
  push(li("Archivo foco: " + code("ComparadorMultiMetodo.jsx")));
  push(li("Simbolo foco: " + code("tieneQ5Publicado / filasQ5Markdown / obtenerMetodosQ5Validos")));
  push(li("Validacion: copiar expediente y verificar que la seccion Q-5 muestre valores reales."));
  push(li("Alternativa: " + code("HidroFlow.jsx") + " — verificar publicacion via " + code("onContextoComparador") + " y " + code("HidroFlowLayout.jsx") + " — verificar merge " + code("actualizarContextoComparador")));

  const output = flush();

  if (doWrite) {
    const outPath = path.join(OUT_DIR, "report_" + name.toUpperCase() + "_active.md");
    const mdContent = "# Reporte activo " + name.toUpperCase() + " — HF-CODEMAP v1.4.0\n\n" + output;
    fs.writeFileSync(outPath, mdContent, "utf-8");
    console.log("Reporte escrito en: " + outPath);
  } else {
    console.log(output);
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
  "semantic-flow": cmdSemanticFlow,
  "reporte-activo": cmdReporteActivo,
  "executive": cmdReporteActivo,
  "ruido": cmdRuido,
  "react-flow": cmdReactFlow,
  "document-flow": cmdDocumentFlow,
};

if (commands[cmd]) {
  commands[cmd](arg);
} else {
  console.log("HF-CODEMAP CLI v1.4.0");
  console.log("Comandos: resumen | variable <n> | prop <n> | callback <n> | state-flow <n>");
  console.log("  semantic-flow <n> [--active] | reporte-activo <n> [--md] [--write] | ruido <n>");
  console.log("  productor <n> | consumidor <n> | flujo <d> | guard <t> | impacto <n>");
  console.log("  alias <n> | archivo <t> | buscar <t> | react-flow <t> | document-flow <t>");
  if (cmd) console.log("Comando desconocido: " + cmd);
}
