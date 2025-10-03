#!/usr/bin/env bash
set -euo pipefail

DATE="$(date +'%Y-%m-%d')"
ISSUES_FILE="issues.json"
LABEL_CONFIG="label-config.yml"

# --- Load label mapping from YAML ---
declare -A label_map
for key in $(yq e '.mapping | keys | .[]' "$LABEL_CONFIG"); do
  value=$(yq e ".mapping.\"$key\"" "$LABEL_CONFIG")
  label_map[$key]=$value
done

map_label() {
  local label="$1"
  echo "${label_map[$label]:-📌 Other}"
}

# --- Debug info ---
echo "Total issues: $(jq 'length' "$ISSUES_FILE")"
echo "Open: $(jq '[.[] | select(.state=="open")] | length' "$ISSUES_FILE")"
echo "Closed: $(jq '[.[] | select(.state=="closed")] | length' "$ISSUES_FILE")"

# ==================== CHANGELOG ====================
cat > Changelog.md <<'CHANGEHEADER'
# Changelog

All notable changes to this project are documented here.

To see the todo list check the [Project Todo](./Todo.md) file.

---

CHANGEHEADER

echo "## 🔄 In Progress" >> Changelog.md
echo >> Changelog.md

jq -r --argfile config "$LABEL_CONFIG" '
  [.[] | select(.state=="open")] |
  sort_by(.number) |
  .[] |
  "- [" + (.labels[0] // "Other") + "] [#" + (.number|tostring) + "](" + .url + ") - " + .title
' "$ISSUES_FILE" | while read -r line; do
  # Map labels using bash function
  issue_label=$(echo "$line" | sed -n 's/- \[\(.*\)\] .*/\1/p')
  mapped_label=$(map_label "$issue_label")
  echo "$line" | sed "s/\[$issue_label\]/$mapped_label/" >> Changelog.md
done

echo >> Changelog.md
echo "## ✅ Completed" >> Changelog.md
echo >> Changelog.md

jq -r '
  [.[] | select(.state=="closed")] |
  sort_by(.closed_at) | reverse |
  .[] |
  ( if .closed_at then (.closed_at|split("T")[0]) else "N/A" end ) as $date |
  "- [#" + (.number|tostring) + "](" + .url + ") - " + .title + " _(Completed: " + $date + ")_" 
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

jq -r '
  sort_by(.number) | reverse |
  .[] |
  ( if .created_at then (.created_at|split("T")[0]) else "N/A" end ) as $created |
  ( if .closed_at then (.closed_at|split("T")[0]) else "-" end ) as $completed |
  ( if .state=="open" then "🔄 Open" else "✅ Closed" end ) as $status |
  "| [#" + (.number|tostring) + "](" + .url + ") | " + $created + " | " + $completed + " | " + .title + " | " + $status + " |" 
' "$ISSUES_FILE" >> Todo.md
