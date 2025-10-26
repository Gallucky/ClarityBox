#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

// --- Shared function you can import ---
module.exports = function ensureDirs(...dirs) {
    for (const dir of dirs) {
        const fullPath = path.resolve(dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`✅ Created: ${fullPath}`);
        } else {
            console.log(`ℹ️ Exists: ${fullPath}`);
        }
    }
};

// --- CLI entrypoint support ---
if (process.argv[1].includes("ensure-generated-dirs.js")) {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.error(
            "❌ No directories specified.\nUsage: node ensure-generated-dirs.js <dir1> <dir2> ..."
        );
        process.exit(1);
    }
    ensureDirs(...args);
}
