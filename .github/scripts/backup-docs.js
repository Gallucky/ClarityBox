#!/usr/bin/env node
"use strict";

import fs from "fs";
import path from "path";

// --- Config ---
const BACKUP_ROOT = ".tracking";
const FILES_TO_BACKUP = ["Changelog.md", "Todo.md"];
const GITKEEP = ".gitkeep";
const BRANCH_NAME = process.env.GITHUB_REF_NAME || "dev"; // fallback

// --- Ensure backup root exists ---
if (!fs.existsSync(BACKUP_ROOT)) fs.mkdirSync(BACKUP_ROOT, { recursive: true });

// --- Add .gitkeep if missing ---
const gitkeepPath = path.join(BACKUP_ROOT, GITKEEP);
if (!fs.existsSync(gitkeepPath)) fs.writeFileSync(gitkeepPath, "");

// --- Unique folder per workflow run ---
const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
const backupDir = path.join(BACKUP_ROOT, `${BRANCH_NAME}_${timestamp}`);
fs.mkdirSync(backupDir, { recursive: true });

// --- Copy files ---
FILES_TO_BACKUP.forEach((file) => {
    if (fs.existsSync(file)) {
        const dest = path.join(backupDir, file);
        fs.copyFileSync(file, dest);
    }
});

console.log(`Backup created at ${backupDir}`);
