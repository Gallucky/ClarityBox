#!/usr/bin/env bash
set -e

# --- Config ---
BACKUP_ROOT=".tracking"
MAX_BACKUPS=30
FILES_TO_BACKUP=("Changelog.md" "Todo.md")

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

# --- Prune old backups ---
if [ -d "$BACKUP_ROOT" ]; then
    COUNT=$(ls -1 "$BACKUP_ROOT" | wc -l)
    if [ "$COUNT" -gt "$MAX_BACKUPS" ]; then
        REMOVE_COUNT=$((COUNT - MAX_BACKUPS))
        echo "Pruning $REMOVE_COUNT old backups..."
        ls -1t "$BACKUP_ROOT" | tail -n "$REMOVE_COUNT" | xargs -I {} rm -rf "$BACKUP_ROOT/{}"
    fi
fi
