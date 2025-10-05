#!/usr/bin/env node
// scripts/generate-html-tree.js
// Usage:
// npm run tree-client
// npm run tree-server
// npm run tree-all
// or
// node generate-html-tree.js <inputPath> <outputPath> [--depth <number>]

const fs = require("fs");
const path = require("path");

const rootDir = process.argv[2] || ".";
const outputPath = process.argv[3] || "folder-tree.html";
const depthArgIndex = process.argv.indexOf("--depth");
const maxDepth = depthArgIndex !== -1 ? parseInt(process.argv[depthArgIndex + 1]) : Infinity;

const indentUnit = "│   ";

// 🎨 Customize font styles here (applied to <pre>)
const preStyle = `
  font-family: 'Fira Code', 'Consolas', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #eaeaea;
  background-color: #1e1e1e;
  padding: 1rem;
  border-radius: 10px;
  overflow-x: auto;
`;

function generateTree(dir, prefix = "", depth = 1) {
    if (depth > maxDepth) return "";

    const entries = fs
        .readdirSync(dir, { withFileTypes: true })
        .filter((e) => !e.name.startsWith(".") && e.name !== "node_modules");

    let tree = "";

    entries.forEach((entry, index) => {
        const isLast = index === entries.length - 1;
        const pointer = isLast ? "└── " : "├── ";
        const fullPath = path.join(dir, entry.name);
        const relPath = "./" + path.relative(rootDir, fullPath).replace(/\\/g, "/");

        if (entry.isDirectory()) {
            tree += `${prefix}${pointer}📁 <a href="${relPath}/">${entry.name}/</a>\n`;
            tree += generateTree(fullPath, prefix + (isLast ? "    " : indentUnit), depth + 1);
        } else {
            tree += `${prefix}${pointer}📄 <a href="${relPath}">${entry.name}</a>\n`;
        }
    });

    return tree;
}

// Wrap in <pre> for monospace formatting
const treeContent = `
<!--
📁 Auto-generated folder tree — created by the generate-html-tree.js script.
Keep this file (or its contents) in the same directory as the input path.
Moving it elsewhere will break the relative links to files and folders.
-->
<pre style="${preStyle}">
📦 <strong>${path.basename(path.resolve(rootDir))}/</strong>
${generateTree(rootDir)}
</pre>
`;

fs.writeFileSync(outputPath, treeContent, "utf8");

console.log(`✅ Folder tree saved to: ${outputPath}`);
console.log(`📏 Max depth: ${maxDepth === Infinity ? "unlimited" : maxDepth}`);
