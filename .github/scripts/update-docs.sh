#!/usr/bin/env bash
set -e

CHANGELOG_FILE="Changelog.md"
TODO_FILE="Todo.md"
ISSUES_JSON="issues.json"

# Clear files
> "$CHANGELOG_FILE"
> "$TODO_FILE"

# --- Changelog header ---
echo "## Changelog" >> "$CHANGELOG_FILE"
echo "" >> "$CHANGELOG_FILE"
echo "The following tags are used throughout the changelog to categorize changes:" >> "$CHANGELOG_FILE"
echo "\
\`💻 Frontend\` \`🔧 Backend\` \`🐛 Bug\` \`✨ Enhancement\` \`⭐ Feature\` \
\`🔨 Fix\` \`📚 Documentation\` \`🚀 Deployment\` \`⚠️ Deprecated\` \
\`🗑️ Removed\` \`🌍 Environment\` \`📌 Other\`" >> "$CHANGELOG_FILE"
echo "" >> "$CHANGELOG_FILE"

# --- Load tasks ---
open_tasks=$(jq '[.[] | select(.state != "closed")]' "$ISSUES_JSON")
closed_tasks=$(jq '[.[] | select(.state == "closed")] | sort_by(.closed_at)' "$ISSUES_JSON")

# --- Helper: format labels with backticks ---
format_labels() {
  jq -r '[.[] | "`" + . + "`"] | join(" ")' <<< "$1"
}

# --- Todo.md table header (original order) ---
echo "| Issue # | Created At | Closed At | Title | Status | Labels | URL |" >> "$TODO_FILE"
echo "|---------|------------|-----------|-------|--------|--------|-----|" >> "$TODO_FILE"

# --- Write open tasks first ---
echo "$open_tasks" | jq -c '.[]' | while read -r task; do
  number=$(jq -r '.number' <<< "$task")
  created=$(jq -r '.created_at' <<< "$task")
  closed=$(jq -r '.closed_at // "-"' <<< "$task")
  title=$(jq -r '.title' <<< "$task")
  state=$(jq -r '.state' <<< "$task")
  labels=$(format_labels "$(jq -r '.labels' <<< "$task")")
  url=$(jq -r '.url' <<< "$task")
  echo "| $number | $created | $closed | $title | $state | $labels | $url |" >> "$TODO_FILE"
done

# --- Write closed tasks at bottom ---
echo "$closed_tasks" | jq -c '.[]' | while read -r task; do
  number=$(jq -r '.number' <<< "$task")
  created=$(jq -r '.created_at' <<< "$task")
  closed=$(jq -r '.closed_at // "-"' <<< "$task")
  title=$(jq -r '.title' <<< "$task")
  state=$(jq -r '.state' <<< "$task")
  labels=$(format_labels "$(jq -r '.labels' <<< "$task")")
  url=$(jq -r '.url' <<< "$task")
  echo "| $number | $created | $closed | $title | $state | $labels | $url |" >> "$TODO_FILE"
done

# --- Changelog: tasks closed in this run (with table, title with icon, labels in backticks) ---
today=$(date +%Y-%m-%d)
jq --arg today "$today" '[.[] | select(.state=="closed" and (.closed_at | startswith($today)))]' "$ISSUES_JSON" > new_closed.json

if [[ $(jq length new_closed.json) -gt 0 ]]; then
  echo "" >> "$CHANGELOG_FILE"
  echo "### Tasks completed in this update" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"
  echo "| Issue # | Completed At | Title | Labels | URL |" >> "$CHANGELOG_FILE"
  echo "|---------|--------------|-------|--------|-----|" >> "$CHANGELOG_FILE"

  jq -c '.[]' new_closed.json | while read -r task; do
    number=$(jq -r '.number' <<< "$task")
    closed=$(jq -r '.closed_at' <<< "$task")
    title=$(jq -r '.title' <<< "$task")
    # Prepend icon if available (take first label as example)
    first_label=$(jq -r '.labels[0] // ""' <<< "$task")
    icon=$(case "$first_label" in
      Frontend) echo "💻" ;;
      Backend) echo "🔧" ;;
      Bug) echo "🐛" ;;
      Enhancement) echo "✨" ;;
      Feature) echo "⭐" ;;
      Fix) echo "🔨" ;;
      Documentation) echo "📚" ;;
      Deployment) echo "🚀" ;;
      Deprecated) echo "⚠️" ;;
      Removed) echo "🗑️" ;;
      Environment) echo "🌍" ;;
      Other|"") echo "📌" ;;
      *) echo "📌" ;;
    esac)
    title="$icon $title"
    labels=$(format_labels "$(jq -r '.labels' <<< "$task")")
    url=$(jq -r '.url' <<< "$task")
    echo "| $number | $closed | $title | $labels | $url |" >> "$CHANGELOG_FILE"
  done
fi

rm -f new_closed.json
