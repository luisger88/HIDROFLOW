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

function classifyFile(relative) {
  const lower = relative.toLowerCase();
  for (const pat of (config.excludePathPatterns || [])) {
    if (lower.includes(pat.toLowerCase())) return "backup";
  }
  if (lower.includes("00_admin") || lower.includes("bitacora")) return "historical";
  if (lower.includes("07_toolbox/validaciones")) return "historical";
  if (lower.includes("07_toolbox/codemap/out")) return "generated";
  if (lower.includes("07_toolbox/codemap/indexar") || lower.includes("07_toolbox/codemap/consultar")) return "tool_active";
  if (lower.startsWith("01_app/hidroflow/src/hidroflow.jsx")) return "runtime_active";
  if (lower.startsWith("01_app/hidroflow/src/layouts/")) return "runtime_active";
  if (lower.startsWith("01_app/hidroflow/src/components/")) return "runtime_active";
  if (lower.startsWith("01_app/hidroflow/src/services/")) return "runtime_support";
  if (lower.startsWith("01_app/hidroflow/src/agents/")) return "runtime_support";
  if (lower.startsWith("01_app/hidroflow/src/data/")) return "runtime_support";
  if (lower.startsWith("01_app/hidroflow/scripts")) return "runtime_support";
  return "tool_active";
}

function rankByClass(activeClass) {
  const ranks = { runtime_active: 100, runtime_support: 70, tool_active: 40, documentation: 20, historical: -50, backup: -100, generated: -200 };
  return ranks[activeClass] || 0;
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
  const activeClass = classifyFile(relative);
  const activeRank = rankByClass(activeClass);

  const fileEntry = {
    id: fileId, path: relative,
    module: relative.split("/").slice(0, 3).join("/"),
    ext, sha1: hash, lineCount: lines.length, domains,
    importsCount: 0, exportsCount: 0,
    activeClass, activeRank
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

// v1.2.0: Semantic flow reconstruction
function buildSemanticFlows(docFlows, refs) {
  const flows = [];
  let idCounter = 1;

  const fileRankMap = new Map();
  for (const f of allFiles) {
    fileRankMap.set(f.path, f.activeRank || 0);
  }
  function fileRank(fpath) {
    return fileRankMap.get(fpath) || 100;
  }
  function scoreSteps(stepsArr) {
    let total = 0;
    for (const s of stepsArr) {
      const rank = fileRank(s.file);
      s.semanticScore = rank;
      total += rank;
    }
    return total;
  }

  // For each callback_prop, find the full chain
  const callbackProps = allPropsFlows.filter(p => p.kind === "callback_prop" || p.kind === "prop_passed" || p.kind === "prop_received");

  // Group by propName
  const byProp = new Map();
  for (const p of callbackProps) {
    const arr = byProp.get(p.propName) || [];
    arr.push(p);
    byProp.set(p.propName, arr);
  }

  for (const [propName, entries] of byProp) {
    const steps = [];
    const gaps = [];
    let confidence = 1;
    const allDomains = new Set();

    // Step 1: Find the producer component
    const received = entries.filter(e => e.kind === "callback_prop" || e.kind === "prop_received");
    const passed = entries.filter(e => e.kind === "callback_prop" || e.kind === "prop_passed");

    // Find the callback value (what's passed)
    const passers = passed.filter(p => p.valueExpression);
    for (const p of passers.slice(0, 3)) {
      const valExpr = p.valueExpression;
      allDomains.add(...(p.domains || []));

      // Find the wrapper (useCallback) for this value
      const wrapper = allPropsFlows.find(w =>
        w.kind === "component_edge" && w.propName === valExpr
      );
      if (wrapper) {
        steps.push({
          order: steps.length + 1, role: "wrapper",
          label: valExpr + " (useCallback)",
          symbol: valExpr,
          component: wrapper.fromComponent,
          file: wrapper.file, line: wrapper.line,
          evidence: wrapper.valueExpression || wrapper.text,
          domains: wrapper.domains || []
        });
        allDomains.add(...(wrapper.domains || []));

        // Find setter called by wrapper
        const setterName = wrapper.target;
        if (setterName) {
          const stateLink = allStateLinks.find(sl => sl.setter === setterName);
          if (stateLink) {
            steps.push({
              order: steps.length + 1, role: "state_setter",
              label: setterName,
              symbol: setterName,
              component: stateLink.component,
              file: stateLink.file, line: stateLink.line,
              evidence: "setter for " + stateLink.state,
              domains: detectDomains(stateLink.state)
            });
            steps.push({
              order: steps.length + 1, role: "state",
              label: stateLink.state + " (useState)",
              symbol: stateLink.state,
              component: stateLink.component,
              file: stateLink.file, line: stateLink.line,
              evidence: "state variable",
              domains: detectDomains(stateLink.state)
            });
            allDomains.add(...detectDomains(stateLink.state));
          }
        }
      }

      // The prop passing itself
      steps.push({
        order: steps.length + 1, role: "prop_pass",
        label: p.propName + "={" + (valExpr || "?") + "}",
        symbol: p.propName,
        component: p.fromComponent + " -> " + p.toComponent,
        file: p.file, line: p.line,
        evidence: p.text?.slice(0, 150) || "",
        domains: p.domains || []
      });
      allDomains.add(...(p.domains || []));
    }

    // Find receivers
    for (const r of received.slice(0, 3)) {
      if (r.toComponent !== "parent" && r.toComponent !== "unknown") {
        steps.push({
          order: steps.length + 1, role: "callback_receive",
          label: r.propName + " recibido por " + r.toComponent,
          symbol: r.propName,
          component: r.toComponent,
          file: r.file, line: r.line,
          evidence: "prop declaration",
          domains: r.domains || []
        });
        allDomains.add(...(r.domains || []));
      }
    }

    // Find guards related to the domains
    const relatedGuards = allGuards.filter(g => g.domains.some(d => allDomains.has(d)));
    for (const g of relatedGuards.slice(0, 5)) {
      steps.push({
        order: steps.length + 1, role: "guard",
        label: g.guardType + (g.probableMessage ? ": " + g.probableMessage : ""),
        symbol: g.guardType,
        component: "",
        file: g.file, line: g.line,
        evidence: g.text?.slice(0, 150) || "",
        domains: g.domains || []
      });
    }

    // Find document outputs
    const docOuts = [];
    for (const d of docFlows) {
      if (d.domain && allDomains.has(d.domain)) {
        docOuts.push({ section: d.outputSection, source: d.source });
      }
    }

    if (steps.length > 1) {
      // Only include flows with meaningful chains
      if (passed.length > 0 && received.length > 0) confidence = 0.9;
      if (passed.length > 0 && !received.length) { confidence = 0.4; gaps.push("no_consumer_found"); }
      if (!allStateLinks.length) gaps.push("no_state_link");

      flows.push({
        id: idCounter++, query: propName, domain: [...allDomains][0] || "unknown",
        routeName: propName + "_flow",
        steps: steps.sort((a, b) => a.order - b.order),
        guards: relatedGuards.slice(0, 5).map(g => ({ file: g.file, line: g.line, type: g.guardType, message: g.probableMessage })),
        documentOutputs: docOuts,
        confidence: Math.round(confidence * 100) / 100,
        semanticScore: scoreSteps(steps),
        gaps: [...new Set(gaps)]
      });
    }
  }

  // Also build domain-level flows (Q5, Expediente, etc.)
  for (const [domain] of Object.entries(config.domains)) {
    const domainSymbols = allSymbols.filter(s => s.domains.includes(domain));
    const domainRefs = refs.filter(r => r.domains.includes(domain));
    const domainGuards = allGuards.filter(g => g.domains.includes(domain));
    const domainProps = allPropsFlows.filter(p => p.domains?.includes(domain));

    if (domainSymbols.length === 0 && domainProps.length === 0) continue;

    const steps = [];
    const producers = domainSymbols.filter(s => s.kind === "variable" || s.kind === "function").slice(0, 5);
    for (const p of producers) {
      steps.push({
        order: steps.length + 1, role: "producer",
        label: p.name, symbol: p.name,
        component: "", file: p.file, line: p.line,
        evidence: p.text?.slice(0, 100) || "", domains: p.domains || []
      });
    }

    const consumers = domainRefs.slice(0, 5);
    for (const c of consumers) {
      steps.push({
        order: steps.length + 1, role: "consumer",
        label: c.symbol, symbol: c.symbol,
        component: "", file: c.file, line: c.line,
        evidence: c.text?.slice(0, 100) || "", domains: c.domains || []
      });
    }

    for (const g of domainGuards.slice(0, 5)) {
      steps.push({
        order: steps.length + 1, role: "guard",
        label: g.guardType + (g.probableMessage ? ": " + g.probableMessage : ""),
        symbol: g.guardType,
        component: "", file: g.file, line: g.line,
        evidence: g.text?.slice(0, 100) || "", domains: g.domains || []
      });
    }

    const docOuts = (docFlows || []).filter(d => d.domain === domain).map(d => ({ section: d.outputSection, source: d.source }));

    flows.push({
      id: idCounter++, query: domain, domain,
      routeName: domain + "_domain_flow",
      steps: steps.sort((a, b) => a.order - b.order),
      guards: domainGuards.slice(0, 10).map(g => ({ file: g.file, line: g.line, type: g.guardType, message: g.probableMessage })),
      documentOutputs: docOuts,
      confidence: producers.length > 0 ? 0.8 : 0.5,
      semanticScore: scoreSteps(steps),
      gaps: producers.length === 0 ? ["no_producers"] : []
    });
  }

  return flows.sort((a, b) => (b.semanticScore || 0) - (a.semanticScore || 0));
}

// --- MAIN ---
console.log("HF-CODEMAP indexer v1.4.0");
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

console.time("Semantic flows");
const semanticFlows = buildSemanticFlows(docFlows, refs);
console.timeEnd("Semantic flows");
console.log("Semantic flows:", semanticFlows.length);

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
writeJSON("semantic_flows.json", semanticFlows);

writeJSON("index.json", {
  version: config.version,
  generated: new Date().toISOString(),
  totals: {
    files: allFiles.length, symbols: allSymbols.length,
    references: refs.length, guards: allGuards.length,
    flows: flows.length, reactFlows: allReactFlows.length,
    documentFlows: docFlows.length, aliases: aliasList.length,
    impactEntries: impactList.length, propsFlows: allPropsFlows.length,
    stateLinks: allStateLinks.length,
    semanticFlows: semanticFlows.length
  },
  classes: {
    activeFiles: allFiles.filter(f => f.activeRank > 0).length,
    runtimeActive: allFiles.filter(f => f.activeClass === "runtime_active").length,
    runtimeSupport: allFiles.filter(f => f.activeClass === "runtime_support").length,
    historicalFiles: allFiles.filter(f => f.activeClass === "historical").length,
    backupFiles: allFiles.filter(f => f.activeClass === "backup").length,
    generatedFiles: allFiles.filter(f => f.activeClass === "generated").length
  },
  topDomains: Object.keys(config.domains),
  queryHelp: "Usa consultar-hidroflow.mjs resumen | variable <n> | flujo <d> | semantic-flow <n> [--active]"
});

console.log("Index written to " + OUT_DIR);
console.log("Done.");
