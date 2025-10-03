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
  jq -r '.[]' <<< "$1" | while read -r lbl; do
    echo -n "\`$(label_with_icon "$lbl")\` "
  done
}

# Format ISO date to DD/MM/YYYY
format_date() {
  iso_date="$1"
  if [[ "$iso_date" == "-" || -z "$iso_date" ]]; then
    echo "-"
  else
    date -d "$iso_date" +"%d/%m/%Y"
  fi
}

# Map status to icon
status_icon() {
  state="$1"
  case "$state" in
    open) echo "💬 Open" ;;
    pending|ongoing) echo "⏳ $state" ;;
    closed) echo "✅ Closed" ;;
    *) echo "$state" ;;
  esac
}

# --- Clear files ---
> "$CHANGELOG_FILE"
> "$TODO_FILE"

# --- Changelog header ---
echo "# Changelog" >> "$CHANGELOG_FILE"
echo "" >> "$CHANGELOG_FILE"
echo "The following tags are used throughout the changelog to categorize changes:" >> "$CHANGELOG_FILE"
echo "" >> "$CHANGELOG_FILE"
echo "\
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \
\`🔨 Fix\` \`📚 Documentation\` \`🚀 Deployment\` \`⚠️ Deprecated\` \
\`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`" >> "$CHANGELOG_FILE"
echo "" >> "$CHANGELOG_FILE"
echo "> To see the current todo list, check the [Todo](./Todo.md) file." >> "$CHANGELOG_FILE"
echo "---" >> "$CHANGELOG_FILE"

# --- Todo header ---
echo "# Todo" >> "$TODO_FILE"
echo "" >> "$TODO_FILE"
echo "The following tags are used throughout the changelog to categorize changes:" >> "$TODO_FILE"
echo "" >> "$TODO_FILE"
echo "\
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \
\`🔨 Fix\` \`📚 Documentation\` \`🚀 Deployment\` \`⚠️ Deprecated\` \
\`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`" >> "$TODO_FILE"
echo "" >> "$TODO_FILE"
echo "> To see the changelogs for this commit, check the [Changelog](./Changelog.md) file." >> "$TODO_FILE"
echo "---" >> "$TODO_FILE"
echo "| Issue # | Created At | Closed At | Title | Status | Labels |" >> "$TODO_FILE"
echo "|---------|------------|-----------|-------|--------|--------|" >> "$TODO_FILE"

# --- Load tasks ---
open_tasks=$(jq '[.[] | select(.state != "closed")]' "$ISSUES_JSON")
closed_tasks=$(jq '[.[] | select(.state == "closed")] | sort_by(.closed_at)' "$ISSUES_JSON")

# --- Write open tasks ---
echo "$open_tasks" | jq -c '.[]' | while read -r task; do
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
echo "$closed_tasks" | jq -c '.[]' | while read -r task; do
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
  echo "### Tasks completed in this update" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"
  echo "| Issue # | Completed At | Title | Labels |" >> "$CHANGELOG_FILE"
  echo "|---------|--------------|-------|--------|" >> "$CHANGELOG_FILE"

  jq -c '.[]' new_closed.json | while read -r task; do
    number=$(jq -r '.number' <<< "$task")
    issue_link="[$number]($REPO_URL/$number)"
    closed=$(format_date "$(jq -r '.closed_at // "-"' <<< "$task")")
    title=$(jq -r '.title' <<< "$task")
    # Prepend all label icons to title
    icon_labels=$(jq -c '.labels' <<< "$task" | format_labels)
    title="$icon_labels $title"
    labels=$(jq -c '.labels' <<< "$task" | format_labels)
    echo "| $issue_link | $closed | $title | $labels |" >> "$CHANGELOG_FILE"
  done
fi

rm -f new_closed.json
