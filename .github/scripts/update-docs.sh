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
    output+="\`$label\` "
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

# --- Write Todo ---
{
  echo "# Todo"
  echo ""
  echo "> To see the changelogs for this commit, check the [Changelog](./Changelog.md) file."
  echo "---"
} >> "$TODO_FILE"

open_tasks=$(jq '[.[] | select(.state != "closed" and (.pull_request | not))]' "$ISSUES_JSON")

write_tasks() {
  local tasks_json="$1"
  local file="$2"
  local show_status="${3:-1}"   # default 1 = include status and created/closed columns

  if [[ $(jq length <<< "$tasks_json") -eq 0 ]]; then
    echo "_No tasks available._" >> "$file"
    return
  fi

  if [[ "$show_status" -eq 1 ]]; then
    echo "| Issue | Created | Closed | Title | Status | Labels |" >> "$file"
    echo "|-------|---------|--------|-------|--------|--------|" >> "$file"
  else
    echo "| Issue # | Completed At | Title | Labels |" >> "$file"
    echo "|---------|--------------|-------|--------|" >> "$file"
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

write_tasks "$open_tasks" "$TODO_FILE"

# --- Write Changelog (closed today) ---
today=$(date +%Y-%m-%d)
closed_today=$(jq --arg today "$today" '[.[] | select(.state=="closed" and (.closed_at | startswith($today)) and (.pull_request | not))]' "$ISSUES_JSON")

if [[ $(jq length <<< "$closed_today") -gt 0 ]]; then
  {
    echo ""
    echo "# Changelog"
    echo ""
    echo "> To see the current todo list, check the [Todo](./Todo.md) file."
    echo "---"
    echo ""
    echo "### 🏁 Tasks completed in this update"
    echo ""
  } >> "$CHANGELOG_FILE"

  write_tasks "$closed_today" "$CHANGELOG_FILE" 0
fi

echo "Debug: Script completed. Check $TODO_FILE and $CHANGELOG_FILE"
