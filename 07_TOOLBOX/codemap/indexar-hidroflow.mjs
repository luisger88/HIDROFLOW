#!/usr/bin/env node
/**
 * HF-CODEMAP indexer v1.0.0
 * Indexa el codigo de HidroFlow sin dependencias externas.
 * Uso: node indexar-hidroflow.mjs
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.resolve(import.meta.dirname, "..", "..");
const CONFIG_PATH = path.join(import.meta.dirname, "hf-codemap.config.json");
const OUT_DIR = path.join(import.meta.dirname, "out");

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
const FILE_EXT_MAP = { ".js": "js", ".jsx": "jsx", ".mjs": "js", ".cjs": "js", ".json": "json", ".md": "md" };

const allFiles = [];
const allSymbols = [];
const allGuards = [];
const allReactFlows = [];
let symbolIdCounter = 1;
let guardIdCounter = 1;
let reactFlowIdCounter = 1;

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

function extractDeps(lines, startIdx) {
  for (let j = startIdx; j < Math.min(startIdx + 15, lines.length); j++) {
    const m = lines[j].trim().match(/^\s*\],\s*\[(.*?)\]\)(?:;|\s*$)/);
    if (m) return m[1].split(",").map(d => d.trim()).filter(Boolean);
  }
  return [];
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

  const componentName = (content.match(/export\s+default\s+function\s+(\w+)/) || [])[1]
    || (content.match(/function\s+(\w+)\s*\(\s*\{/) || [])[1]
    || path.basename(filePath, ext);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trim = line.trim();
    const ln = i + 1;
    const ld = detectDomains(trim);

    if (trim.startsWith("import ")) { importCount++; }
    if (trim.startsWith("export ")) { exportCount++; }

    // Extract declarations: const/let/var name, function name, class name
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

    // Extract React hook declarations
    let rm;
    if ((rm = trim.match(RE_USE_STATE))) {
      allReactFlows.push({
        id: reactFlowIdCounter++, file: relative, component: componentName,
        hook: "useState", line: ln,
        dependencies: [], produces: [rm[1], rm[2]], consumes: [], callbacks: [], risk: "low"
      });
    } else if ((rm = trim.match(RE_USE_MEMO))) {
      const deps = extractDeps(lines, i);
      allReactFlows.push({
        id: reactFlowIdCounter++, file: relative, component: componentName,
        hook: "useMemo", line: ln,
        dependencies: deps, produces: [rm[1]], consumes: [], callbacks: [], risk: "low"
      });
    } else if ((rm = trim.match(RE_USE_CALLBACK))) {
      const deps = extractDeps(lines, i);
      allReactFlows.push({
        id: reactFlowIdCounter++, file: relative, component: componentName,
        hook: "useCallback", line: ln,
        dependencies: deps, produces: [rm[1]], consumes: [], callbacks: [], risk: "low"
      });
    } else if (RE_USE_EFFECT.test(trim)) {
      const deps = extractDeps(lines, i);
      allReactFlows.push({
        id: reactFlowIdCounter++, file: relative, component: componentName,
        hook: "useEffect", line: ln,
        dependencies: deps, produces: [], consumes: [], callbacks: [], risk: "low"
      });
    }

    // Extract onX callbacks
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

// Fast reference extraction: build a map of symbol names to symbol IDs, then scan all files
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
      // Extract all word tokens from the line
      const tokens = [...new Set(trim.match(/\b\w{2,40}\b/g) || [])];
      for (const token of tokens) {
        if (KEYWORDS.has(token)) continue;
        if (symMap.has(token)) {
          const syms = symMap.get(token);
          for (const s of syms) {
            if (s.file === file.path && s.line === ln) continue; // skip self-declaration
            allReferences.push({
              id: refIdCounter++, symbolId: s.id, symbol: token,
              fileId: file.id, file: file.path, line: ln,
              kind: "reference", text: trim.slice(0, 200), domains: ld
            });
            break; // one ref per token per line
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
console.log("HF-CODEMAP indexer v1.0.0");
console.time("Total");

let scanned = 0;
function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = relativePath(full);
    if (entry.isDirectory()) {
      if (config.excludeDirs.some(d => rel.includes(d))) continue;
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
console.log("Scanned:", scanned, "| Symbols:", allSymbols.length, "| Guards:", allGuards.length, "| React flows:", allReactFlows.length);

// Post-process
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

// Write outputs
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

writeJSON("index.json", {
  version: config.version,
  generated: new Date().toISOString(),
  totals: {
    files: allFiles.length, symbols: allSymbols.length,
    references: refs.length, guards: allGuards.length,
    flows: flows.length, reactFlows: allReactFlows.length,
    documentFlows: docFlows.length, aliases: aliasList.length,
    impactEntries: impactList.length
  },
  topDomains: Object.keys(config.domains),
  queryHelp: "Usa consultar-hidroflow.mjs resumen | variable <n> | flujo <d> | guard <t> | impacto <n>"
});

console.log("Index written to " + OUT_DIR);
console.log("Done.");
