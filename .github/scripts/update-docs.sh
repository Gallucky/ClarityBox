#!/usr/bin/env bash
set -euo pipefail

DATE="$(date +'%Y-%m-%d')"
ISSUES_FILE="issues.json"

# Debug: Check what we're working with
echo "=== DEBUG INFO ===" >&2
echo "Total issues in file: $(jq 'length' "$ISSUES_FILE")" >&2
echo "Open issues: $(jq '[.[] | select(.state == "open")] | length' "$ISSUES_FILE")" >&2
echo "Closed issues: $(jq '[.[] | select(.state == "closed")] | length' "$ISSUES_FILE")" >&2
echo "==================" >&2

# ==================== CHANGELOG ====================
cat > Changelog.md <<'CHANGEHEADER'
# Changelog

All notable changes to this project are documented here.

To see the todo list check the [Project Todo](./Todo.md) file.

The following tags are used throughout the changelog to categorize changes:
`[💻 Frontend]` `[🔧 Backend]` `[🐛 Bug]` `[✨ Enhancement]` `[⭐ Feature]` `[🔨 Fix]` `[📚 Documentation]` `[🚀 Deployment]` `[⚠️ Deprecated]` `[🗑️ Removed]` `[🌍 Environment]` `[📌 Other]`

---

CHANGEHEADER

# In Progress section
echo "## 🔄 In Progress" >> Changelog.md
echo >> Changelog.md

jq -r '
  def map_label:
    if . == "Backend" then "🔧 Backend"
    elif . == "Bug" then "🐛 Bug"
    elif . == "Deployment" then "🚀 Deployment"
    elif . == "Deprecated" then "⚠️ Deprecated"
    elif . == "Documentation" then "📚 Documentation"
    elif . == "Enhancement" then "✨ Enhancement"
    elif . == "Environment" then "🌍 Environment"
    elif . == "Feature" then "⭐ Feature"
    elif . == "Fix" then "🔨 Fix"
    elif . == "Frontend" then "💻 Frontend"
    elif . == "Removed" then "🗑️ Removed"
    else null end;

  [.[] | select(.state == "open")] |
  sort_by(.number) |
  .[] |
  ( (.labels | map(map_label) | map(select(. != null)) | .[0]) // "📌 Other" ) as $type |
  "- " + $type + " [#" + (.number|tostring) + "](" + .url + ") - " + .title
' "$ISSUES_FILE" >> Changelog.md

echo >> Changelog.md

# Completed section (at bottom)
echo "## ✅ Completed" >> Changelog.md
echo >> Changelog.md

jq -r '
  def map_label:
    if . == "Backend" then "🔧 Backend"
    elif . == "Bug" then "🐛 Bug"
    elif . == "Deployment" then "🚀 Deployment"
    elif . == "Deprecated" then "⚠️ Deprecated"
    elif . == "Documentation" then "📚 Documentation"
    elif . == "Enhancement" then "✨ Enhancement"
    elif . == "Environment" then "🌍 Environment"
    elif . == "Feature" then "⭐ Feature"
    elif . == "Fix" then "🔨 Fix"
    elif . == "Frontend" then "💻 Frontend"
    elif . == "Removed" then "🗑️ Removed"
    else null end;

  [.[] | select(.state == "closed")] |
  sort_by(.closed_at) | reverse |
  .[] |
  ( (.labels | map(map_label) | map(select(. != null)) | .[0]) // "📌 Other" ) as $type |
  ( if .closed_at then (.closed_at | split("T")[0]) else "N/A" end ) as $date |
  "- " + $type + " [#" + (.number|tostring) + "](" + .url + ") - " + .title + " _(Completed: " + $date + ")_"
' "$ISSUES_FILE" >> Changelog.md


# ==================== TODO ====================
cat > Todo.md <<'TODOHEADER'
# Todo

Tracks all project tasks and issues.

To check the changelog see the [Project's Changelog](./Changelog.md) file.

---

TODOHEADER

echo "## 📋 All Issues" >> Todo.md
echo >> Todo.md

cat >> Todo.md <<'TABLE'
| Issue # | Created At | Completed At | Title | Status |
|---------|------------|--------------|-------|--------|
TABLE

# Build table rows with your preferred column order
jq -r '
  sort_by(.number) | reverse |
  .[] |
  ( if .created_at then (.created_at | split("T")[0]) else "N/A" end ) as $created |
  ( if .closed_at then (.closed_at | split("T")[0]) else "-" end ) as $completed |
  ( if .state == "open" then "🔄 Open" else "✅ Closed" end ) as $status |
  "| [#" + (.number|tostring) + "](" + .url + ") | " + $created + " | " + $completed + " | " + .title + " | " + $status + " |"
' "$ISSUES_FILE" >> Todo.md