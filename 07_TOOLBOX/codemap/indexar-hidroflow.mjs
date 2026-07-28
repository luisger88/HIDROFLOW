#!/usr/bin/env node
/**
 * HF-CODEMAP indexer v1.1.0
 * Added: prop/callback/state-flow detection, props_flows.json
 * Uso: node indexar-hidroflow.mjs
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const CONFIG_PATH = path.join(import.meta.dirname, "hf-codemap.config.json");
const OUT_DIR = path.join(import.meta.dirname, "out");

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));

const allFiles = [];
const allSymbols = [];
const allGuards = [];
const allReactFlows = [];
const allPropsFlows = [];
const allStateLinks = [];
let symbolIdCounter = 1;
let guardIdCounter = 1;
let reactFlowIdCounter = 1;
let propsFlowIdCounter = 1;

function sha1(text) { return crypto.createHash("sha1").update(text).digest("hex").slice(0, 12); }
function relativePath(absPath) { return path.relative(ROOT, absPath).replace(/\\/g, "/"); }

function detectDomains(text) {
  const lower = text.toLowerCase();
  const found = [];
  for (const [domain, info] of Object.entries(config.domains)) {
    for (const term of info.terms) {
      if (lower.includes(term.toLowerCase())) { found.push(domain); break; }
    }
  }
  return [...new Set(found)];
}

function detectGuardType(text) {
  const lower = text.toLowerCase();
  if (lower.includes("tieneq5publicado") || lower.includes("tabla q-5")) return "Q5_table";
  if (lower.includes("tienehidrogramaspublicados")) return "hidrogramas_published";
  if (lower.includes("tieneracionalpublicado")) return "racional_published";
  if (lower.includes("faltantesexpediente")) return "expediente_faltantes";
  if (lower.includes("expedientelisto")) return "expediente_listo";
  if (lower.includes("!tieneq5publicado") || lower.includes("!tienehidrogramaspublicados")) return "Q5_negated_guard";
  return null;
}

function extractProbableMessage(text) {
  const m = text.match(/["']([^"']{5,80})["']/);
  if (m) return m[1].slice(0, 80);
  return null;
}

const KEYWORDS = new Set([
  "if","for","while","return","switch","case","break","continue","throw","typeof",
  "new","delete","void","in","of","else","try","catch","finally","import","export",
  "default","from","as","true","false","null","undefined","async","await","yield",
  "class","extends","super","this","function","var","let","const"
]);

const RE_SYMBOL = /(?:export\s+(?:default\s+)?)?(?:const|let|var)\s+(\w+)\b|(?:export\s+)?(?:async\s+)?function\s+(\w+)|(?:export\s+)?class\s+(\w+)/g;

const RE_USE_STATE = /const\s+\[(\w+),\s*(\w+)\]\s*=\s*useState/;
const RE_USE_MEMO = /const\s+(\w+)\s*=\s*useMemo\s*\(/;
const RE_USE_CALLBACK = /const\s+(\w+)\s*=\s*useCallback\s*\(/;
const RE_USE_EFFECT = /useEffect\s*\(\s*\(\s*\)\s*=>/;

// New patterns for v1.1
const RE_COMPONENT_DEF = /(?:^|\n)\s*(?:export\s+default\s+)?function\s+(\w+)\s*\(\s*\{([^}]*)\}\s*\)/gm;
const RE_ARROW_COMPONENT = /(?:^|\n)\s*(?:const|let|var)\s+(\w+)\s*=\s*\(\s*\{([^}]*)\}\s*\)\s*=>/gm;
const RE_JSX_TAG = /<\s*(\w+)\s*[\s\S]*?\/?>/g;
const RE_JSX_PROP = /(\w+)=\{([^}]+)\}/g;

function extractDeps(lines, startIdx) {
  for (let j = startIdx; j < Math.min(startIdx + 15, lines.length); j++) {
    const m = lines[j].trim().match(/^\s*\],\s*\[(.*?)\]\)(?:;|\s*$)/);
    if (m) return m[1].split(",").map(d => d.trim()).filter(Boolean);
  }
  return [];
}

function extractDestructuredProps(destructured) {
  const props = [];
  const parts = destructured.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const nameMatch = trimmed.match(/^(\w+)/);
    if (nameMatch) props.push(nameMatch[1]);
  }
  return props;
}

function scanFile(filePath) {
  const relative = relativePath(filePath);
  const ext = path.extname(filePath);
  if (!config.extensions.includes(ext)) return;

  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const hash = sha1(content);
  const domains = detectDomains(content);
  const fileId = allFiles.length + 1;
  const isJS = [".js", ".jsx", ".mjs", ".cjs"].includes(ext);

  let importCount = 0, exportCount = 0;

  const fileEntry = {
    id: fileId, path: relative,
    module: relative.split("/").slice(0, 3).join("/"),
    ext, sha1: hash, lineCount: lines.length, domains,
    importsCount: 0, exportsCount: 0
  };

  if (!isJS) { allFiles.push(fileEntry); return; }

  const compDefMatches = [...content.matchAll(RE_COMPONENT_DEF)];
  const arrowMatches = [...content.matchAll(RE_ARROW_COMPONENT)];
  const firstName = (compDefMatches[0] || [])[1]
    || (arrowMatches[0] || [])[1]
    || (content.match(/(?:^|\n)\s*export\s+default\s+function\s+(\w+)/m) || [])[1]
    || path.basename(filePath, ext);

  // Detect received props from ALL function signatures in this file
  for (const m of compDefMatches) {
    const compName = m[1];
    const destructured = m[2];
    const matchLine = content.slice(0, m.index).split("\n").length;
    const propNames = extractDestructuredProps(destructured);
    for (const propName of propNames) {
      const isCallback = /^on[A-Z]/.test(propName);
      allPropsFlows.push({
        id: propsFlowIdCounter++, kind: isCallback ? "callback_prop" : "prop_received",
        propName, fromComponent: "parent", toComponent: compName,
        file: relative, line: matchLine, target: null, valueExpression: null,
        domains: detectDomains(propName), text: "function " + compName + "({ " + propName + " })"
      });
    }
  }
  for (const m of arrowMatches) {
    const compName = m[1];
    const destructured = m[2];
    const matchLine = content.slice(0, m.index).split("\n").length;
    const propNames = extractDestructuredProps(destructured);
    for (const propName of propNames) {
      const isCallback = /^on[A-Z]/.test(propName);
      allPropsFlows.push({
        id: propsFlowIdCounter++, kind: isCallback ? "callback_prop" : "prop_received",
        propName, fromComponent: "parent", toComponent: compName,
        file: relative, line: matchLine, target: null, valueExpression: null,
        domains: detectDomains(propName), text: "const " + compName + " = ({ " + propName + " }) =>"
      });
    }
  }

  const componentName = firstName;

  let currentJSXTag = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trim = line.trim();
    const ln = i + 1;
    const ld = detectDomains(trim);

    if (trim.startsWith("import ")) { importCount++; }
    if (trim.startsWith("export ")) { exportCount++; }

    // Extract declarations
    let symMatch;
    RE_SYMBOL.lastIndex = 0;
    while ((symMatch = RE_SYMBOL.exec(trim)) !== null) {
      for (let g = 1; g < symMatch.length; g++) {
        if (symMatch[g] && !KEYWORDS.has(symMatch[g])) {
          allSymbols.push({
            id: symbolIdCounter++, name: symMatch[g],
            kind: g === 1 ? "variable" : g === 2 ? "function" : "class",
            fileId, file: relative, line: ln,
            scope: "module", text: trim.slice(0, 200), domains: ld
          });
        }
      }
    }

    // Extract guards
    const gt = detectGuardType(trim);
    if (gt) {
      allGuards.push({
        id: guardIdCounter++, fileId, file: relative, line: ln,
        text: trim.slice(0, 200), domains: ld, guardType: gt,
        probableMessage: extractProbableMessage(line)
      });
    }

    // Track JSX tag context for multiline prop detection
    const tagOpen = trim.match(/<\s*([A-Z]\w*)/);
    const tagClose = trim.match(/\/\s*>/);
    if (tagOpen) {
      currentJSXTag = tagOpen[1];
    }

    // Extract JSX prop passing: <Component propName={value} /> (including multiline)
    if (currentJSXTag) {
      let jsxPropMatch;
      RE_JSX_PROP.lastIndex = 0;
      while ((jsxPropMatch = RE_JSX_PROP.exec(trim)) !== null) {
        const propName = jsxPropMatch[1];
        const valueExpr = jsxPropMatch[2];
        const isCallback = /^on[A-Z]/.test(propName);
        const pfKind = isCallback ? "callback_prop" : "prop_passed";
        allPropsFlows.push({
          id: propsFlowIdCounter++, kind: pfKind,
          propName, fromComponent: componentName, toComponent: currentJSXTag,
          file: relative, line: ln, target: null, valueExpression: valueExpr?.slice(0, 80),
          domains: detectDomains(propName + " " + (valueExpr || "")), text: trim.slice(0, 200)
        });
      }
      if (tagClose || trim.endsWith("/>") || trim.includes("/>")) {
        currentJSXTag = null;
      }
    }

    // Extract useState -> stateLink and React hooks
    let stateM;
    if ((stateM = trim.match(RE_USE_STATE))) {
      allStateLinks.push({
        state: stateM[1], setter: stateM[2],
        file: relative, line: ln, component: componentName
      });
      allReactFlows.push({
        id: reactFlowIdCounter++, file: relative, component: componentName,
        hook: "useState", line: ln,
        dependencies: [], produces: [stateM[1], stateM[2]],
        propsReceived: [], propsPassed: [], callbacksReceived: [], callbacksPassed: [],
        stateLinks: [{ state: stateM[1], setter: stateM[2] }],
        componentEdges: [], consumes: [], callbacks: [], risk: "low"
      });
      allPropsFlows.push({
        id: propsFlowIdCounter++, kind: "state_setter",
        propName: stateM[2],
        fromComponent: componentName, toComponent: componentName,
        file: relative, line: ln, target: stateM[1], valueExpression: "useState",
        domains: detectDomains(stateM[1]), text: trim.slice(0, 200)
      });
    } else {
      let rm;
      if ((rm = trim.match(RE_USE_MEMO))) {
        const deps = extractDeps(lines, i);
        allReactFlows.push({
          id: reactFlowIdCounter++, file: relative, component: componentName,
          hook: "useMemo", line: ln,
          dependencies: deps, produces: [rm[1]],
          propsReceived: [], propsPassed: [], callbacksReceived: [], callbacksPassed: [],
          stateLinks: [], componentEdges: [], consumes: [], callbacks: [], risk: "low"
        });
      } else if ((rm = trim.match(RE_USE_CALLBACK))) {
        const deps = extractDeps(lines, i);
        const stateLinks = [];
        for (const sl of allStateLinks) {
          if (sl.file === relative) {
            const cbBody = lines.slice(i, Math.min(i + 20, lines.length)).join(" ");
            if (cbBody.includes(sl.setter)) {
              stateLinks.push({ state: sl.state, setter: sl.setter, boundBy: rm[1] });
              allPropsFlows.push({
                id: propsFlowIdCounter++, kind: "component_edge",
                propName: rm[1], fromComponent: componentName, toComponent: componentName,
                file: relative, line: ln, target: sl.setter,
                valueExpression: "useCallback wrapping " + sl.setter,
                domains: detectDomains(sl.state), text: trim.slice(0, 200)
              });
            }
          }
        }
        allReactFlows.push({
          id: reactFlowIdCounter++, file: relative, component: componentName,
          hook: "useCallback", line: ln,
          dependencies: deps, produces: [rm[1]],
          propsReceived: [], propsPassed: [], callbacksReceived: [], callbacksPassed: [],
          stateLinks, componentEdges: [], consumes: [], callbacks: [], risk: "low"
        });
      } else if (RE_USE_EFFECT.test(trim)) {
        const deps = extractDeps(lines, i);
        allReactFlows.push({
          id: reactFlowIdCounter++, file: relative, component: componentName,
          hook: "useEffect", line: ln,
          dependencies: deps, produces: [],
          propsReceived: [], propsPassed: [], callbacksReceived: [], callbacksPassed: [],
          stateLinks: [], componentEdges: [], consumes: [], callbacks: [], risk: "low"
        });
      }
    }

    // Extract onX callbacks in JSX
    const cbMatch = trim.match(/\b(on\w+)=/g);
    if (cbMatch) {
      const existing = allReactFlows.find(rf => rf.file === relative && rf.line === ln);
      if (existing) {
        existing.callbacks = [...new Set([...existing.callbacks, ...cbMatch.map(c => c.replace("=", ""))])];
      }
    }
  }

  fileEntry.importsCount = importCount;
  fileEntry.exportsCount = exportCount;
  allFiles.push(fileEntry);
}

// Fast reference extraction
function extractReferences() {
  const symMap = new Map();
  for (const s of allSymbols) {
    if (s.name.length < 2) continue;
    const arr = symMap.get(s.name) || [];
    arr.push(s);
    symMap.set(s.name, arr);
  }

  const allReferences = [];
  let refIdCounter = 1;

  for (const file of allFiles) {
    const fpath = path.resolve(ROOT, file.path);
    if (!fs.existsSync(fpath)) continue;
    const content = fs.readFileSync(fpath, "utf-8");
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const trim = lines[i].trim();
      const ln = i + 1;
      const ld = detectDomains(trim);
      const tokens = [...new Set(trim.match(/\b\w{2,40}\b/g) || [])];
      for (const token of tokens) {
        if (KEYWORDS.has(token)) continue;
        if (symMap.has(token)) {
          const syms = symMap.get(token);
          for (const s of syms) {
            if (s.file === file.path && s.line === ln) continue;
            allReferences.push({
              id: refIdCounter++, symbolId: s.id, symbol: token,
              fileId: file.id, file: file.path, line: ln,
              kind: "reference", text: trim.slice(0, 200), domains: ld
            });
            break;
          }
        }
      }
    }
  }
  return allReferences;
}

function buildFlows() {
  const allFlows = [];
  let flowIdCounter = 1;
  const refs = extractReferences();
  for (const [domain, info] of Object.entries(config.domains)) {
    const producers = allSymbols.filter(s => s.domains.includes(domain));
    const consumers = refs.filter(r => r.domains.includes(domain));
    const guards = allGuards.filter(g => g.domains.includes(domain));
    allFlows.push({
      id: flowIdCounter++, domain,
      producers: producers.slice(0, 30).map(s => ({ name: s.name, file: s.file, line: s.line })),
      transports: [],
      consumers: consumers.slice(0, 30).map(r => ({ name: r.symbol, file: r.file, line: r.line })),
      guards: guards.map(g => ({ file: g.file, line: g.line, type: g.guardType, message: g.probableMessage }))
    });
  }
  return allFlows;
}

function buildDocumentFlows() {
  const guards = allGuards.filter(g => g.domains.includes("Expediente") || g.domains.includes("Q5"));
  return [{
    id: 1, domain: "Expediente", source: "contextoBase",
    payloadFields: ["hidrogramas","hidrogramas_resumen","lluvia_efectiva_total_mm","q_tr_activo_estado"],
    markdownFields: ["cuenca","geomorfometria","lluviaYAbstraccion","escenarioQTrActivo","hidrografiaQ5","controlConsistencia","diagnosticoQt"],
    guards: guards.map(g => ({ file: g.file, line: g.line, type: g.guardType, message: g.probableMessage })),
    outputSection: "expediente_hidrologico_minimo"
  }];
}

function buildAliases() {
  const entries = [];
  for (const [domain, info] of Object.entries(config.domains)) {
    if (info.aliases) {
      for (const [canonical, aliases] of Object.entries(info.aliases)) {
        entries.push({ canonical, domain, aliases, acceptZero: false, acceptNull: false });
      }
    }
  }
  return entries;
}

function buildImpact(refs) {
  const entries = [];
  for (const sym of allSymbols) {
    const rCount = refs.filter(r => r.symbolId === sym.id).length;
    const iGuards = allGuards.filter(g => g.domains.some(d => sym.domains.includes(d)));
    if (rCount > 0 || iGuards.length > 0) {
      entries.push({
        symbolId: sym.id, symbol: sym.name, file: sym.file, line: sym.line,
        kind: sym.kind, domains: sym.domains,
        directReferences: rCount,
        guardsImpacted: iGuards.slice(0, 5).map(g => ({ file: g.file, line: g.line, type: g.guardType })),
        possibleFlowsImpacted: sym.domains
      });
    }
  }
  return entries;
}

// --- MAIN ---
console.log("HF-CODEMAP indexer v1.1.0");
console.time("Total");

let scanned = 0;
function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = relativePath(full);
    if (entry.isDirectory()) {
      if (config.excludeDirs.some(d => rel.split("/").includes(d))) continue;
      walkDir(full);
    } else {
      if (config.extensions.includes(path.extname(entry.name))) {
        scanFile(full);
        scanned++;
      }
    }
  }
}

for (const root of config.scanRoots) {
  walkDir(path.resolve(ROOT, root));
}

console.timeEnd("Total");
console.log("Scanned:", scanned, "| Symbols:", allSymbols.length, "| Guards:", allGuards.length,
  "| React flows:", allReactFlows.length, "| Props flows:", allPropsFlows.length);

console.time("References");
const refs = extractReferences();
console.timeEnd("References");
console.log("References:", refs.length);

console.time("Derived");
const flows = buildFlows();
const docFlows = buildDocumentFlows();
const aliasList = buildAliases();
const impactList = buildImpact(refs);
console.timeEnd("Derived");

const writeJSON = (name, data) => fs.writeFileSync(path.join(OUT_DIR, name), JSON.stringify(data, null, 2), "utf-8");

writeJSON("files.json", allFiles);
writeJSON("symbols.json", allSymbols);
writeJSON("references.json", refs);
writeJSON("guards.json", allGuards);
writeJSON("aliases.json", aliasList);
writeJSON("flows.json", flows);
writeJSON("impact.json", impactList);
writeJSON("react_flows.json", allReactFlows);
writeJSON("document_flows.json", docFlows);
writeJSON("props_flows.json", allPropsFlows);

writeJSON("index.json", {
  version: config.version,
  generated: new Date().toISOString(),
  totals: {
    files: allFiles.length, symbols: allSymbols.length,
    references: refs.length, guards: allGuards.length,
    flows: flows.length, reactFlows: allReactFlows.length,
    documentFlows: docFlows.length, aliases: aliasList.length,
    impactEntries: impactList.length, propsFlows: allPropsFlows.length,
    stateLinks: allStateLinks.length
  },
  topDomains: Object.keys(config.domains),
  queryHelp: "Usa consultar-hidroflow.mjs resumen | variable <n> | flujo <d> | guard <t> | impacto <n> | prop <n> | callback <n> | state-flow <n>"
});

console.log("Index written to " + OUT_DIR);
console.log("Done.");
