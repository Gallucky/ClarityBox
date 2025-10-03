#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# Debug mode
DEBUG=${DEBUG:-0}
[[ "$DEBUG" -eq 1 ]] && set -x

# --- Files ---
CHANGELOG_FILE="Changelog.md"
TODO_FILE="Todo.md"
ISSUES_JSON="issues.json"

# --- Helper functions ---
label_with_icon() {
  local label="$1"
  case "$label" in
    Frontend) echo "💻 Frontend" ;;
    Backend) echo "🔧 Backend" ;;
    Bug) echo "🐛 Bug" ;;
    Enhancement) echo "✨ Enhancement" ;;
    Feature) echo "⭐ Feature" ;;
    Fix) echo "🔨 Fix" ;;
    Documentation) echo "📚 Documentation" ;;
    Deployment) echo "🚀 Deployment" ;;
    Deprecated) echo "⚠️ Deprecated" ;;
    Removed) echo "🗑️ Removed" ;;
    Environment) echo "🌍 Environment" ;;
    Other|"") echo "📌 Other" ;;
    *) echo "📌 $label" ;;
  esac
}

format_labels() {
  local labels_json="${1:-$(cat)}"
  local output=""
  while read -r label; do
    label="${label//$'\r'/}"
    label=$(label_with_icon "$label")
    output+="<br>\`$label\`"
  done <<< "$(jq -r '.[]' <<< "$labels_json")"
  # remove leading <br>
  echo "${output#<br>}"
}

format_date() {
  local iso_date="$1"
  [[ "$iso_date" == "-" || -z "$iso_date" ]] && echo "-" || date -d "$iso_date" +"%d/%m/%Y"
}

status_icon() {
  local state="$1"
  case "$state" in
    open) echo "\`💬 Open\`" ;;
    pending|ongoing) echo "\`⏳ On Going\`" ;;
    closed) echo "\`✅ Closed\`" ;;
    *) echo "\`$state\`" ;;
  esac
}

# --- Validate JSON ---
if [[ ! -s "$ISSUES_JSON" ]]; then
  echo "Error: $ISSUES_JSON not found or empty."
  exit 1
fi
if ! jq empty "$ISSUES_JSON" >/dev/null 2>&1; then
  echo "Error: $ISSUES_JSON is not valid JSON."
  exit 1
fi

# --- Clear files ---
> "$TODO_FILE"
> "$CHANGELOG_FILE"

# --- Write Todo header ---
cat <<EOF >> "$TODO_FILE"
# TODO title

Tracks tasks per commit.

The following tags are used throughout the todo list to categorize tasks based on frontend and backend sides:<br>
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \`📚 Documentation\`<br>
\`🔨 Fix\` \`🚀 Deployment\` \`⚠️ Deprecated\` \`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`

> To see the changelogs / changes, check the [Changelog](./Changelog.md) file.

---
EOF

# --- Write Changelog header ---
cat <<EOF >> "$CHANGELOG_FILE"
# Changelog title

All notable changes to this project are documented here. Commit-level tracking is used.

The following tags are used throughout the changelog to categorize changes based on frontend and backend sides:<br>
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \`📚 Documentation\`<br>
\`🔨 Fix\` \`🚀 Deployment\` \`⚠️ Deprecated\` \`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`

> To see the todo list check the [Todo](./Todo.md) file.

---
EOF

# --- Load tasks ---
open_tasks=$(jq '[.[] | select(.state != "closed" and (.pull_request == null))]' "$ISSUES_JSON")
closed_today=$(jq --arg today "$(date +%Y-%m-%d)" '[.[] | select(.state=="closed" and (.closed_at | startswith($today)) and (.pull_request == null))]' "$ISSUES_JSON")

# --- Function to write tasks ---
write_tasks() {
  local tasks_json="$1"
  local file="$2"
  local show_status="${3:-1}" # default 1 = include status/created/closed

  if [[ $(jq length <<< "$tasks_json") -eq 0 ]]; then
    echo "_No tasks available._" >> "$file"
    return
  fi

  if [[ "$show_status" -eq 1 ]]; then
    echo "| Issue # | Created | Closed | Title | Status | Labels |" >> "$file"
    echo "|:------:|:------:|:-----:|:-----|:----:|:-----|" >> "$file"
  else
    echo "| Issue # | Completed At | Title | Labels |" >> "$file"
    echo "|:------:|:------------:|:-----|:-----|" >> "$file"
  fi

  while read -r task; do
    number=$(jq -r .number <<< "$task")
    issue_link="[$number]($(jq -r .url <<< "$task"))"
    created=$(format_date "$(jq -r .created_at <<< "$task")")
    closed=$(format_date "$(jq -r '.closed_at // "-"' <<< "$task")")
    title=$(jq -r .title <<< "$task")
    labels=$(format_labels "$(jq -c .labels <<< "$task")")
    state=$(jq -r .state <<< "$task")
    status=$(status_icon "$state")

    if [[ "$show_status" -eq 1 ]]; then
      echo "| $issue_link | $created | $closed | $title | $status | $labels |" >> "$file"
    else
      echo "| $issue_link | $closed | $title | $labels |" >> "$file"
    fi
  done < <(jq -c '.[]' <<< "$tasks_json")
}

# --- Write tasks ---
write_tasks "$open_tasks" "$TODO_FILE"
if [[ $(jq length <<< "$closed_today") -gt 0 ]]; then
  echo "" >> "$CHANGELOG_FILE"
  echo "### 🏁 Tasks completed in this update" >> "$CHANGELOG_FILE"
  write_tasks "$closed_today" "$CHANGELOG_FILE" 0
fi

echo "Debug: Script completed. Check $TODO_FILE and $CHANGELOG_FILE"
