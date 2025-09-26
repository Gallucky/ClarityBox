# Changelog

All notable changes to this project are documented here. Commit-level tracking is used, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

To see the todo list check the [Project Todo](./Todo.md) file, with snapshots stored in [`.tracking/todos/`](./.tracking/todos/).

---

## 🛠️ Current Commit #4 - 26/09/2025

### ➕ Added

-   **Authentication**

    -   [`authService.js`](./auth/authService.js): Added middleware to authenticate requests using JWT tokens, validating the `x-auth-token` header and attaching decoded user data to `req.user`.
    -   [`jwt.js`](./auth/Providers/jwt.js): Added JWT utility functions:
        -   `validateRequiredEnvVars` – checks for required `TOKEN_SECRET_KEY` and `TOKEN_VALID_DURATION`.
        -   `generateAuthToken` – generates a signed JWT token with expiration.
        -   `verifyToken` – verifies token validity and decodes user data.
    -   Added detailed JSDoc comments to all authentication-related functions.

-   **Routing & Controllers**

    -   [`router.js`](./router/router.js): Introduced a central Express router to handle `/users`, `/posts`, `/projects`, and `/tasks` routes, plus a 404 fallback.
    -   [`usersController.js`](./features/users/routes/usersController.js): Created initial `usersController` with `auth` middleware integration and custom logger.

-   **Server Setup**

    -   [`server.js`](./server.js): Added Express app setup with middlewares ([`cors.js`](./middlewares/cors.js), logger, JSON/text parsing, static files, router).
    -   Implemented global error handling middleware.
    -   Added server start logic with port config and startup logging (using `chalk` + custom logger).

-   **Development Tools**
    -   [`package.json`](./package.json): Added `diff` and `status` npm scripts:
        -   `npm run diff` → saves `git diff` to `.git-diff`.
        -   `npm run status` → prints and saves `git status` to `.git-status`.

### 🏷️ Changed / Modified

-   [`.gitignore`](./.gitignore)

    -   Added ignores for `.vscode/`, `*.git-diff`, `*.git-status`, and `eslint-report.log`.
    -   Grouped sections with clear comments.

-   [`cors.js`](./middlewares/cors.js)

    -   Replaced hardcoded origins with `process.env.ALLOWED_ORIGINS` (comma-separated list).
    -   Updated TODO note for deployment.

### 🩹 Fixed

> None (structural and feature additions only).

### ➖ Removed

> None
