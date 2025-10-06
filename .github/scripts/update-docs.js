#!/usr/bin/env node
"use strict";

const fs = require("fs");
const { execSync } = require("child_process");

// --- Files ---
const CHANGELOG_FILE = "Changelog.md";
const TODO_FILE = "Todo.md";
const ISSUES_JSON = "issues.json";

// --- Helper functions ---
function labelWithIcon(label) {
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
}

function formatLabels(labels) {
    return labels
        .map(labelWithIcon)
        .map((l) => `<br>\`${l}\``)
        .join("")
        .replace(/^<br>/, "");
}

function formatDate(iso) {
    if (!iso || iso === "-") return "-";
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(
        2,
        "0"
    )}/${d.getFullYear()}`;
}

function statusIcon(state) {
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
}

// --- Validate JSON ---
if (!fs.existsSync(ISSUES_JSON)) {
    console.error(`${ISSUES_JSON} not found`);
    process.exit(1);
}

let issues;
try {
    issues = JSON.parse(fs.readFileSync(ISSUES_JSON, "utf-8"));
} catch {
    console.error(`${ISSUES_JSON} is not valid JSON`);
    process.exit(1);
}

// --- Clear files ---
fs.writeFileSync(TODO_FILE, "");
fs.writeFileSync(CHANGELOG_FILE, "");

// --- Write Todo header ---
fs.appendFileSync(
    TODO_FILE,
    `# TODO title

Tracks tasks per commit.

The following tags are used throughout the todo list to categorize tasks based on frontend and backend sides:<br>
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \`📚 Documentation\`<br>
\`🔨 Fix\` \`🚀 Deployment\` \`⚠️ Deprecated\` \`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`

> To see the changelogs / changes, check the [Changelog](./Changelog.md) file.

---
`
);

// --- Write Changelog header ---
fs.appendFileSync(
    CHANGELOG_FILE,
    `# Changelog title

All notable changes to this project are documented here. Commit-level tracking is used.

The following tags are used throughout the changelog to categorize changes based on frontend and backend sides:<br>
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \`📚 Documentation\`<br>
\`🔨 Fix\` \`🚀 Deployment\` \`⚠️ Deprecated\` \`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`

> To see the todo list check the [Todo](./Todo.md) file.

---
`
);

// --- Filter tasks ---
const openTasks = issues.filter((i) => i.state !== "closed");
const closedToday = issues.filter(
    (i) => i.state === "closed" && i.closed_at?.startsWith(new Date().toISOString().slice(0, 10))
);
const allClosed = issues
    .filter((i) => i.state === "closed")
    .sort((a, b) => new Date(b.closed_at) - new Date(a.closed_at));

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
        const link = `[${number}](${task.url})`;
        const created = formatDate(task.created_at);
        const closed = formatDate(task.closed_at ?? "-");
        const title = task.title;
        const labels = formatLabels(task.labels);
        const state = task.state;
        const status = statusIcon(state);

        if (showStatus) {
            fs.appendFileSync(
                file,
                `| ${link} | ${created} | ${closed} | ${title} | ${status} | ${labels} |\n`
            );
        } else {
            fs.appendFileSync(file, `| ${link} | ${closed} | ${title} | ${labels} |\n`);
        }
    });
}

// --- Write tasks ---
writeTasks(openTasks, TODO_FILE);

fs.appendFileSync(CHANGELOG_FILE, "\n### 🏁 Tasks Completed Today\n\n");
if (closedToday.length) writeTasks(closedToday, CHANGELOG_FILE, false);
else fs.appendFileSync(CHANGELOG_FILE, "> No tasks were completed today.\n");

fs.appendFileSync(CHANGELOG_FILE, "\n### 📋 All Completed Tasks\n\n");
if (allClosed.length) writeTasks(allClosed, CHANGELOG_FILE, false);
else fs.appendFileSync(CHANGELOG_FILE, "> No completed tasks available.\n");

console.log(`Docs updated: ${TODO_FILE}, ${CHANGELOG_FILE}`);
