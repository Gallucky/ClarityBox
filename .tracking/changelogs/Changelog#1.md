# Changelog

All notable changes to this project are documented here. Commit-level tracking is used, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

To see the todo list check the [Project Todo](./Todo.md) file, with snapshots stored in [`.tracking/todos/`](./.tracking/todos/).

The following tags are used throughout the changelog to categorize changes based on frontend and backend sides:<br> `[🖼️ Frontend]` `[🔙 Backend]`

---

## 🛠️ Current Commit #5 - 26/09/2025

### ➕ Added

-   **User Controller Structure** `[🔙 Backend]`
    -   [`usersController.js`](./server/features/users/routes/usersController.js): Created comprehensive controller structure with route definitions:
        -   `GET /users` - Get all users (admin only)
        -   `GET /users/:id` - Get user by ID (user or admin access)
        -   `POST /users` - Register new user
        -   `POST /users/login` - User login
        -   `PUT /users/:id` - Update user data (user only)
        -   `DELETE /users/:id` - Delete user (user or admin access)
    -   Added proper authentication middleware integration with role-based access control
    -   Added comprehensive JSDoc documentation for all routes
    -   Integrated custom RouterLogger for request tracking
    -   Added proper error handling using `handleWebError` utility
    -   **Note**: Service layer functions still need implementation (`getUsers`, `getUser`, `registerUser`, etc.)

### 🏷️ Changed / Modified

-   **Router Configuration** `[🔙 Backend]`

    [`router.js`](./server/router/router.js): Updated import paths to match new controller structure:

    -   Fixed import path for `usersController`:<br> `'../features/users/usersController'` → `'../features/users/routes/usersController'`
    -   Updated import paths for other controllers to follow consistent `/routes/` structure

-   **Authentication Service** `[🔙 Backend]`

    [`authService.js`](./server/auth/authService.js): Removed outdated TODO comment about verifying token logic

-   **Server Configuration** `[🔙 Backend]`

    [`server.js`](./server/server.js): Added import for `currentDate` utility from `./utils/timeStamp`

### 🩹 Fixed

-   **Import Path Consistency** `[🔙 Backend]`

    Fixed controller import paths in router to match the actual file structure with `/routes/` subdirectories

### ➖ Removed

-   **Code Cleanup** `[🔙 Backend]`

    Removed outdated TODO comment from authentication service regarding token verification logic

---
