#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

# --- Config ---
BACKUP_ROOT=".tracking"
FILES_TO_BACKUP=("Changelog.md" "Todo.md")
GITKEEP=".gitkeep"
BRANCH_NAME=${GITHUB_REF_NAME:-dev} # default to dev if not set

# --- Ensure backup root exists ---
mkdir -p "$BACKUP_ROOT"

# --- Add .gitkeep if missing ---
if [ ! -f "$BACKUP_ROOT/$GITKEEP" ]; then
    touch "$BACKUP_ROOT/$GITKEEP"
fi

# --- Get current commit hash ---
HASH=$(git rev-parse --short HEAD)

# --- Create backup folder with branch + timestamp + hash ---
TIMESTAMP=$(date +'%d-%m-%Y_%H-%M-%S')
BACKUP_DIR="$BACKUP_ROOT/${BRANCH_NAME}_${TIMESTAMP}_$HASH"
mkdir -p "$BACKUP_DIR"

# --- Copy files ---
for FILE in "${FILES_TO_BACKUP[@]}"; do
    if [ -f "$FILE" ]; then
        cp "$FILE" "$BACKUP_DIR"
    fi
done

echo "Backup created at $BACKUP_DIR"

# --- No pruning needed ---
echo "No pruning required: all backups are preserved in tracking branch."
