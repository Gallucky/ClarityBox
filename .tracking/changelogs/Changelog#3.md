# Changelog

All notable changes to this project are documented here. Commit-level tracking is used, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

To see the todo list check the [Todo.md](./Todo.md) file, with snapshots stored in [`.tracking/todos/`](./.tracking/todos/).

---

## 🛠️ Current Commit #3 - 25/09/2025

### ➕ Added

-   Created the mongoose schemas/models for the MVP edition of the project: `User`, `Post`, `Task`, `Project` models with basic fields and relationships.
-   Created sub-schemas/sub-models for nested structures:
    -   `Name` for `User`
    -   `ProfileImage` for `User`
    -   and even `Task` is a sub-schema inside a `Project`.

### 🏷️ Changed / Modified

-   None

### 🩹 Fixed

-   None

### ➖ Removed

-   None


[← Back to Changelog.md](../../Changelog.md)
