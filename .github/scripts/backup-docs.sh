#!/usr/bin/env bash
set -e

# --- Config ---
BACKUP_ROOT=".tracking"
MAX_BACKUPS=30
FILES_TO_BACKUP=("Changelog.md" "Todo.md")
GITKEEP=".gitkeep"

# --- Ensure backup root exists ---
mkdir -p "$BACKUP_ROOT"

# --- Add .gitkeep if missing ---
if [ ! -f "$BACKUP_ROOT/$GITKEEP" ]; then
    touch "$BACKUP_ROOT/$GITKEEP"
fi

# --- Get current commit hash ---
HASH=$(git rev-parse --short HEAD)

# --- Create backup folder ---
TIMESTAMP=$(date +'%d-%m-%Y_%H-%M-%S')
BACKUP_DIR="$BACKUP_ROOT/${TIMESTAMP}_$HASH"
mkdir -p "$BACKUP_DIR"

# --- Copy files ---
for FILE in "${FILES_TO_BACKUP[@]}"; do
    if [ -f "$FILE" ]; then
        cp "$FILE" "$BACKUP_DIR"
    fi
done

echo "Backup created at $BACKUP_DIR"

# --- Prune old backups (ignoring .gitkeep) ---
BACKUPS=($(ls -1t "$BACKUP_ROOT" | grep -v "$GITKEEP"))
COUNT=${#BACKUPS[@]}

if [ "$COUNT" -gt "$MAX_BACKUPS" ]; then
    REMOVE_COUNT=$((COUNT - MAX_BACKUPS))
    echo "Pruning $REMOVE_COUNT old backups..."
    for OLD in "${BACKUPS[@]:$MAX_BACKUPS}"; do
        rm -rf "$BACKUP_ROOT/$OLD"
    done
fi
