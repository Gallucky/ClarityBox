#!/usr/bin/env bash
set -e

CHANGELOG_FILE="Changelog.md"
TODO_FILE="Todo.md"
ISSUES_JSON="issues.json"

REPO_URL="https://github.com/$GITHUB_REPOSITORY/issues"

# --- Helper functions ---

# Map label to icon + name
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

# Format labels array into backtick-wrapped icons
format_labels() {
    local labels_json="$1"
    local output=""
    while read -r label; do
        # Clean carriage return (for Windows-style JSON)
        label="${label//$'\r'/}"
        # Map to icon
        label=$(label_with_icon "$label")
        # Append safely with space
        output+="$label "
    done <<< "$(jq -r '.[]' <<< "$labels_json")"
    # Trim trailing space
    echo "${output%" "}"
}



# Format ISO date to DD/MM/YYYY
format_date() {
  local iso_date="$1"
  if [[ "$iso_date" == "-" || -z "$iso_date" ]]; then
    echo "-"
  else
    date -d "$iso_date" +"%d/%m/%Y"
  fi
}

# Map status to icon
status_icon() {
  local state="$1"
  case "$state" in
    open) echo "💬 Open" ;;
    pending|ongoing) echo "⏳ On Going" ;;
    closed) echo "✅ Closed" ;;
    *) echo "$state" ;;
  esac
}

# --- Clear files ---
> "$CHANGELOG_FILE"
> "$TODO_FILE"

# --- Changelog header ---
cat <<EOF >> "$CHANGELOG_FILE"
# Changelog

The following tags are used throughout the changelog to categorize changes:

\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\`
\`🔨 Fix\` \`📚 Documentation\` \`🚀 Deployment\` \`⚠️ Deprecated\`
\`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`

> To see the current todo list, check the [Todo](./Todo.md) file.
---
EOF

# --- Todo header ---
cat <<EOF >> "$TODO_FILE"
# Todo

The following tags are used throughout the changelog to categorize changes:

\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\`
\`🔨 Fix\` \`📚 Documentation\` \`🚀 Deployment\` \`⚠️ Deprecated\`
\`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`

> To see the changelogs for this commit, check the [Changelog](./Changelog.md) file.
---
| Issue # | Created At | Closed At | Title | Status | Labels |
|---------|------------|-----------|-------|--------|--------|
EOF

# --- Load tasks ---
open_tasks=$(jq '[.[] | select(.state != "closed")]' "$ISSUES_JSON")
closed_tasks=$(jq '[.[] | select(.state == "closed")] | sort_by(.closed_at)' "$ISSUES_JSON")

# --- Write open tasks first ---
for task in $(echo "$open_tasks" | jq -c '.[]'); do
  number=$(jq -r '.number' <<< "$task")
  issue_link="[$number]($REPO_URL/$number)"
  created=$(format_date "$(jq -r '.created_at' <<< "$task")")
  closed=$(format_date "$(jq -r '.closed_at // "-"' <<< "$task")")
  title=$(jq -r '.title' <<< "$task")
  state=$(jq -r '.state' <<< "$task")
  status=$(status_icon "$state")
  labels=$(jq -c '.labels' <<< "$task" | format_labels)
  echo "| $issue_link | $created | $closed | $title | $status | $labels |" >> "$TODO_FILE"
done

# --- Write closed tasks at bottom ---
for task in $(echo "$closed_tasks" | jq -c '.[]'); do
  number=$(jq -r '.number' <<< "$task")
  issue_link="[$number]($REPO_URL/$number)"
  created=$(format_date "$(jq -r '.created_at' <<< "$task")")
  closed=$(format_date "$(jq -r '.closed_at // "-"' <<< "$task")")
  title=$(jq -r '.title' <<< "$task")
  state=$(jq -r '.state' <<< "$task")
  status=$(status_icon "$state")
  labels=$(jq -c '.labels' <<< "$task" | format_labels)
  echo "| $issue_link | $created | $closed | $title | $status | $labels |" >> "$TODO_FILE"
done

# --- Changelog: tasks closed today ---
today=$(date +%Y-%m-%d)
jq --arg today "$today" '[.[] | select(.state=="closed" and (.closed_at | startswith($today)))]' "$ISSUES_JSON" > new_closed.json

if [[ $(jq length new_closed.json) -gt 0 ]]; then
  echo "" >> "$CHANGELOG_FILE"
  echo "### 🏁 Tasks completed in this update" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"
  echo "| Issue # | Completed At | Title | Labels |" >> "$CHANGELOG_FILE"
  echo "|---------|--------------|-------|--------|" >> "$CHANGELOG_FILE"

  for task in $(jq -c '.[]' new_closed.json); do
    number=$(jq -r '.number' <<< "$task")
    issue_link="[$number]($REPO_URL/$number)"
    closed=$(format_date "$(jq -r '.closed_at // "-"' <<< "$task")")
    title=$(jq -r '.title' <<< "$task")
    labels=$(jq -c '.labels' <<< "$task" | format_labels)
    echo "| $issue_link | $closed | $title | $labels |" >> "$CHANGELOG_FILE"
  done
fi

rm -f new_closed.json
