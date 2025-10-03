#!/usr/bin/env bash
set -euo pipefail

COMMIT_NUM="$1"
DATE="$(date +'%Y-%m-%d')"
ISSUES_FILE="issues.json"

mkdir -p .tracking/todos .tracking/changelogs

# Todo header (exact required text at start)
cat > Todo.md <<'TODOHEADER'
# Todo
Todos:
Tracks tasks per commit. Snapshot copies are stored in [`.tracking/todos/`](./.tracking/todos/).

To check the current changelog see the [Project's Changelog](./Changelog.md) file, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

---
Changelogs:
All notable changes to this project are documented here. Commit-level tracking is used, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

To see the todo list check the [Project Todo](./Todo.md) file, with snapshots stored in [`.tracking/todos/`](./.tracking/todos/).

The following tags are used throughout the changelog to categorize changes based on frontend and backend sides:<br> `[💻 Frontend]` `[🔧 Backend]`

---
TODOHEADER

echo >> Todo.md
echo "Commit $COMMIT_NUM - $DATE" >> Todo.md
echo >> Todo.md

cat >> Todo.md <<'TABLE'
| Commit # | Date of Completion | Type | Issue # | Description |
|----------|-------------------|------|---------|-------------|
TABLE

# Build rows from issues.json (safe single-row per issue, prefer mapped label)
jq -r --arg COMMIT_NUM "$COMMIT_NUM" --arg DATE "$DATE" '
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

  .[] |
  ( (.labels | map(map_label) | map(select(. != null)) | .[0]) // (.labels[0] | map_label) // "📌 Other" ) as $type |
  "|["+$COMMIT_NUM+"](./.tracking/todos/todo-"+$COMMIT_NUM+".md)|"+$DATE+"|"+$type+"|[#"+(.number|tostring)+"]("+.url+")|"+(.title)
' "$ISSUES_FILE" >> Todo.md

# Changelog header (same intro block)
cat > Changelog.md <<'CHANGEHEADER'
# Changelog
Todos:
Tracks tasks per commit. Snapshot copies are stored in [`.tracking/todos/`](./.tracking/todos/).

To check the current changelog see the [Project's Changelog](./Changelog.md) file, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

---
Changelogs:
All notable changes to this project are documented here. Commit-level tracking is used, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

To see the todo list check the [Project Todo](./Todo.md) file, with snapshots stored in [`.tracking/todos/`](./.tracking/todos/).

The following tags are used throughout the changelog to categorize changes based on frontend and backend sides:<br> `[💻 Frontend]` `[🔧 Backend]`

---
CHANGEHEADER

echo >> Changelog.md
echo "Commit $COMMIT_NUM - $DATE" >> Changelog.md

# Snapshots
cp Changelog.md .tracking/changelogs/changelog-"$COMMIT_NUM".md
cp Todo.md .tracking/todos/todo-"$COMMIT_NUM".md
