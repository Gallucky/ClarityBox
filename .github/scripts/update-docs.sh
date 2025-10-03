#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# Debug mode
set -x   # print every command before executing

CHANGELOG_FILE="Changelog.md"
TODO_FILE="Todo.md"
ISSUES_JSON="issues.json"
REPO_URL="https://github.com/$GITHUB_REPOSITORY/issues"

# --- Helper functions ---
label_with_icon() {
  label="$1"
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
  local labels_json="$1"
  local output=""
  while read -r label; do
    label="${label//$'\r'/}"
    label=$(label_with_icon "$label")
    output+="$label "
  done <<< "$(jq -r '.[]' <<< "$labels_json")"
  echo "${output%" "}"
}

format_date() {
  local iso_date="$1"
  [[ "$iso_date" == "-" || -z "$iso_date" ]] && echo "-" || date -d "$iso_date" +"%d/%m/%Y"
}

status_icon() {
  local state="$1"
  case "$state" in
    open) echo "💬 Open" ;;
    pending|ongoing) echo "⏳ On Going" ;;
    closed) echo "✅ Closed" ;;
    *) echo "$state" ;;
  esac
}

# --- Validate JSON before proceeding ---
if [[ ! -s "$ISSUES_JSON" ]]; then
  echo "Error: $ISSUES_JSON not found or empty."
  exit 1
fi

if ! jq empty "$ISSUES_JSON" >/dev/null 2>&1; then
  echo "Error: $ISSUES_JSON is not valid JSON."
  exit 1
fi

# --- Clear output files ---
> "$CHANGELOG_FILE"
> "$TODO_FILE"

# --- Headers ---
cat <<EOF >> "$CHANGELOG_FILE"
# Changelog

> To see the current todo list, check the [Todo](./Todo.md) file.
---
EOF

cat <<EOF >> "$TODO_FILE"
# Todo

> To see the changelogs for this commit, check the [Changelog](./Changelog.md) file.
---
| Issue # | Created At | Closed At | Title | Status | Labels |
|---------|------------|-----------|-------|--------|--------|
EOF

# --- Load tasks ---
open_tasks=$(jq '[.[] | select(.state != "closed")]' "$ISSUES_JSON")
closed_tasks=$(jq '[.[] | select(.state == "closed")] | sort_by(.closed_at)' "$ISSUES_JSON")

# --- Function to write tasks ---
write_tasks() {
  local tasks_json="$1"
  local file="$2"

  echo "Debug: write_tasks called with file='$file'"
  echo "Debug: tasks_json length = $(jq length <<< "$tasks_json")"

  if [[ $(jq length <<< "$tasks_json") -eq 0 ]]; then
    echo "_No tasks available._" > "$file"
    return
  fi

  {
    echo "| Issue | Created | Closed | Title | Status | Labels |"
    echo "|-------|---------|--------|-------|--------|--------|"

    local count=0
    while read -r task; do
      echo "Debug: processing task $count" >&2
      echo "Raw task: $task" >&2

      number=$(jq -r .number <<< "$task") || { echo "Error extracting number" >&2; continue; }
      issue_link="[$number]($(jq -r .url <<< "$task"))"
      created=$(format_date "$(jq -r .created_at <<< "$task")")
      closed=$(format_date "$(jq -r '.closed_at // "-"' <<< "$task")")
      title=$(jq -r .title <<< "$task")
      state=$(jq -r .state <<< "$task")
      status=$(status_icon "$state")
      labels=$(jq -c .labels <<< "$task" | format_labels)

      echo "| $issue_link | $created | $closed | $title | $status | $labels |"
      (( count++ ))
    done < <(jq -c '.[]' <<< "$tasks_json")
  } > "$file"
}





# --- Write tasks ---
write_tasks "$open_tasks" "$TODO_FILE"
write_tasks "$closed_tasks" "$TODO_FILE"

# --- Changelog: tasks closed today ---
today=$(date +%Y-%m-%d)
jq --arg today "$today" '[.[] | select(.state=="closed" and (.closed_at | startswith($today)))]' "$ISSUES_JSON" > new_closed.json

if [[ $(jq length new_closed.json) -gt 0 ]]; then
  echo "" >> "$CHANGELOG_FILE"
  echo "### 🏁 Tasks completed in this update" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"
  echo "| Issue # | Completed At | Title | Labels |" >> "$CHANGELOG_FILE"
  echo "|---------|--------------|-------|--------|" >> "$CHANGELOG_FILE"

  write_tasks "$(cat new_closed.json)" "$CHANGELOG_FILE"
fi

rm -f new_closed.json
echo "Debug: Script completed. Check $TODO_FILE and $CHANGELOG_FILE"
