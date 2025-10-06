#!/usr/bin/env node
"use strict";

const { execSync } = require("child_process");
const fs = require("fs");

const GH_TOKEN = process.env.GH_TOKEN;
if (!GH_TOKEN) {
    console.error("GH_TOKEN is not set");
    process.exit(1);
}

const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

try {
    const raw = execSync(
        `gh api repos/${owner}/${repo}/issues?state=all --paginate --jq '[.[] | select(.pull_request == null) | {number, title, state, url: .html_url, labels: [.labels[].name], closed_at, created_at, pull_request}]'`,
        { env: { ...process.env, GH_TOKEN }, encoding: "utf-8" }
    );

    const issues = JSON.parse(raw);

    if (!issues.length) {
        console.log("No issues found, exiting workflow.");
        process.exit(0);
    }

    fs.writeFileSync("issues.json", JSON.stringify(issues, null, 2));
    console.log(`Collected ${issues.length} issues.`);
} catch (err) {
    console.error("Error fetching issues:", err.message);
    process.exit(1);
}
