#!/usr/bin/env node
"use strict";

import fs from "fs";
import { execSync } from "child_process";
import path from "path";
import process from "process";
import fetch from "node-fetch"; // optional if using GH API directly

const CHANGELOG_FILE = "Changelog.md";
const TODO_FILE = "Todo.md";
const ISSUES_JSON = "issues.json";

// --- Helper functions ---
const labelWithIcon = (label) => {
    switch (label) {
        case "Frontend":
            return "💻 Frontend";
        case "Backend":
            return "🔧 Backend";
        case "Bug":
            return "🐛 Bug";
        case "Enhancement":
            return "✨ Enhancement";
        case "Feature":
            return "⭐ Feature";
        case "Fix":
            return "🔨 Fix";
        case "Documentation":
            return "📚 Documentation";
        case "Deployment":
            return "🚀 Deployment";
        case "Deprecated":
            return "⚠️ Deprecated";
        case "Removed":
            return "🗑️ Removed";
        case "Environment":
            return "🌍 Environment";
        case "Other":
        case "":
            return "📌 Other";
        default:
            return `📌 ${label}`;
    }
};

const formatLabels = (labels) =>
    labels
        .map(labelWithIcon)
        .map((l) => `<br>\`${l}\``)
        .join("")
        .replace(/^<br>/, "");

const formatDate = (iso) => {
    if (!iso || iso === "-") return "-";
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;
};

const statusIcon = (state) => {
    switch (state) {
        case "open":
            return "`💬 Open`";
        case "pending":
        case "ongoing":
            return "`⏳ On Going`";
        case "closed":
            return "`✅ Closed`";
        default:
            return `\`${state}\``;
    }
};

// --- Validate JSON ---
if (!fs.existsSync(ISSUES_JSON)) {
    console.error(`Error: ${ISSUES_JSON} not found.`);
    process.exit(1);
}

let issuesRaw;
try {
    issuesRaw = JSON.parse(fs.readFileSync(ISSUES_JSON, "utf-8"));
} catch (e) {
    console.error(`Error: ${ISSUES_JSON} is not valid JSON.`);
    process.exit(1);
}

// --- Clear files ---
fs.writeFileSync(CHANGELOG_FILE, "");
fs.writeFileSync(TODO_FILE, "");

// --- Write headers ---
const todoHeader = `# TODO title

Tracks tasks per commit.

The following tags are used throughout the todo list to categorize tasks based on frontend and backend sides:<br>
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \`📚 Documentation\`<br>
\`🔨 Fix\` \`🚀 Deployment\` \`⚠️ Deprecated\` \`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`

> To see the changelogs / changes, check the [Changelog](./Changelog.md) file.

---
`;

fs.writeFileSync(TODO_FILE, todoHeader);

const changelogHeader = `# Changelog title

All notable changes to this project are documented here. Commit-level tracking is used.

The following tags are used throughout the changelog to categorize changes based on frontend and backend sides:<br>
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \`📚 Documentation\`<br>
\`🔨 Fix\` \`🚀 Deployment\` \`⚠️ Deprecated\` \`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`

> To see the todo list check the [Todo](./Todo.md) file.

---
`;

fs.writeFileSync(CHANGELOG_FILE, changelogHeader);

// --- Filter issues ---
const openTasks = issuesRaw.filter((i) => i.state !== "closed" && !i.pull_request);
const closedToday = issuesRaw.filter((i) => {
    if (i.state !== "closed" || i.pull_request) return false;
    const today = new Date().toISOString().slice(0, 10);
    return i.closed_at && i.closed_at.startsWith(today);
});
const allClosed = issuesRaw
    .filter((i) => i.state === "closed" && !i.pull_request)
    .sort((a, b) => new Date(b.closed_at) - new Date(a.closed_at));

// --- Write tasks ---
function writeTasks(tasks, file, showStatus = true) {
    if (!tasks.length) {
        fs.appendFileSync(file, "_No tasks available._\n");
        return;
    }

    if (showStatus) {
        fs.appendFileSync(file, "| Issue # | Created | Closed | Title | Status | Labels |\n");
        fs.appendFileSync(file, "|:------:|:------:|:-----:|:-----|:----:|:-----|\n");
    } else {
        fs.appendFileSync(file, "| Issue # | Completed At | Title | Labels |\n");
        fs.appendFileSync(file, "|:------:|:------------:|:-----|:-----|\n");
    }

    tasks.forEach((task) => {
        const number = task.number;
        const issueLink = `[${number}](${task.url})`;
        const created = formatDate(task.created_at);
        const closed = formatDate(task.closed_at || "-");
        const title = task.title;
        const labels = formatLabels(task.labels || []);
        const state = task.state;
        const status = statusIcon(state);

        if (showStatus) {
            fs.appendFileSync(
                file,
                `| ${issueLink} | ${created} | ${closed} | ${title} | ${status} | ${labels} |\n`
            );
        } else {
            fs.appendFileSync(file, `| ${issueLink} | ${closed} | ${title} | ${labels} |\n`);
        }
    });
}

// --- Write files ---
writeTasks(openTasks, TODO_FILE);

fs.appendFileSync(CHANGELOG_FILE, "\n### 🏁 Tasks Completed Today\n\n");
if (closedToday.length) writeTasks(closedToday, CHANGELOG_FILE, false);
else fs.appendFileSync(CHANGELOG_FILE, "> No tasks were completed today.\n");

fs.appendFileSync(CHANGELOG_FILE, "\n### 📋 All Completed Tasks\n\n");
if (allClosed.length) writeTasks(allClosed, CHANGELOG_FILE, false);
else fs.appendFileSync(CHANGELOG_FILE, "> No completed tasks available.\n");

console.log("Update docs script completed.");
