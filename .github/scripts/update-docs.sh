#!/usr/bin/env bash
set -e

# Paths
CHANGELOG_FILE="Changelog.md"
TODO_FILE="Todo.md"
ISSUES_JSON="issues.json"

# Clear existing files
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

# --- Load issues from JSON ---
open_tasks=$(jq '[.[] | select(.state != "closed")]' "$ISSUES_JSON")
closed_tasks=$(jq '[.[] | select(.state == "closed")] | sort_by(.closed_at)' "$ISSUES_JSON")

# --- Generate Todo.md table ---
echo "| Task | Status | Closed At | Labels | URL |" >> "$TODO_FILE"
echo "|------|--------|-----------|--------|-----|" >> "$TODO_FILE"

# Helper function to format labels
format_labels() {
  jq -r '[.[] | "`" + . + "`"] | join(" ")' <<< "$1"
}

# Write open tasks first
echo "$open_tasks" | jq -c '.[]' | while read -r task; do
  title=$(jq -r '.title' <<< "$task")
  state=$(jq -r '.state' <<< "$task")
  closed_at=$(jq -r '.closed_at // "-"' <<< "$task")
  labels=$(format_labels "$(jq -r '.labels' <<< "$task")")
  url=$(jq -r '.url' <<< "$task")
  echo "| $title | $state | $closed_at | $labels | $url |" >> "$TODO_FILE"
done

# Then write closed tasks sorted by closed_at (oldest last)
echo "$closed_tasks" | jq -c '.[]' | while read -r task; do
  title=$(jq -r '.title' <<< "$task")
  state=$(jq -r '.state' <<< "$task")
  closed_at=$(jq -r '.closed_at // "-"' <<< "$task")
  labels=$(format_labels "$(jq -r '.labels' <<< "$task")")
  url=$(jq -r '.url' <<< "$task")
  echo "| $title | $state | $closed_at | $labels | $url |" >> "$TODO_FILE"
done

# --- Changelog: only tasks closed in this run ---
# Assuming you track which tasks were newly closed in this run by date
# e.g., if you generate issues.json right after updating tasks, filter by today
today=$(date +%Y-%m-%d)
jq --arg today "$today" '[.[] | select(.state=="closed" and (.closed_at | startswith($today)))]' "$ISSUES_JSON" > new_closed.json

if [[ $(jq length new_closed.json) -gt 0 ]]; then
  echo "## Tasks completed in this update" >> "$CHANGELOG_FILE"
  echo "" >> "$CHANGELOG_FILE"
  jq -c '.[]' new_closed.json | while read -r task; do
    title=$(jq -r '.title' <<< "$task")
    closed_at=$(jq -r '.closed_at' <<< "$task")
    labels=$(format_labels "$(jq -r '.labels' <<< "$task")")
    url=$(jq -r '.url' <<< "$task")
    echo "- [$closed_at] $title | Labels: $labels | URL: $url" >> "$CHANGELOG_FILE"
  done
fi

# Clean up
rm -f new_closed.json
