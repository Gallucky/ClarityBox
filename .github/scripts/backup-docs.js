#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// --- Config ---
const BACKUP_ROOT = ".tracking";
const FILES_TO_BACKUP = ["Changelog.md", "Todo.md"];
const GITKEEP = ".gitkeep";
const BRANCH_NAME = process.env.GITHUB_REF_NAME || "dev";

// --- Ensure backup root exists ---
if (!fs.existsSync(BACKUP_ROOT)) fs.mkdirSync(BACKUP_ROOT, { recursive: true });

// --- Add .gitkeep if missing ---
const gitkeepPath = path.join(BACKUP_ROOT, GITKEEP);
if (!fs.existsSync(gitkeepPath)) fs.writeFileSync(gitkeepPath, "");

// --- Get current commit hash ---
let HASH = "nohash";
try {
    HASH = execSync("git rev-parse --short HEAD", { encoding: "utf-8" }).trim();
} catch {}

// --- Create unique backup folder ---
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "-");
const BACKUP_DIR = path.join(BACKUP_ROOT, `${BRANCH_NAME}_${TIMESTAMP}_${HASH}`);
fs.mkdirSync(BACKUP_DIR, { recursive: true });

// --- Copy files ---
FILES_TO_BACKUP.forEach((file) => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(BACKUP_DIR, file));
    }
});

console.log(`Backup created at ${BACKUP_DIR}`);
console.log("All backups are preserved in the tracking branch.");
