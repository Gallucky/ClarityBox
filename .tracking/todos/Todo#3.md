# TODO

Tracks tasks per commit. Snapshot copies are stored in [`.tracking/todos/`](./.tracking/todos/).

To check the current changelog see the [Changelog.md](./Changelog.md) file, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

---

## Current Commit: #3 - 25/09/2025

### 🔙 Backend

-   [x] Create the mongoose schemas/models for the MVP edition of the project.
-   [ ] Add routes for the created models (User, Post, Task, Project).
    -   [ ] Implement CRUD routes for User model.
    -   [ ] Implement CRUD routes for Post model.
    -   [ ] Implement CRUD routes for Task model.
    -   [ ] Implement CRUD routes for Project model.
-   [ ] Add authentication middleware for protected routes.
-   [ ] Write basic validation for incoming requests.
-   [ ] Implement authentication routes (`/auth/register`, `/auth/login`, `/auth/me`) with JWT.
-   [ ] Add password hashing with **bcrypt** in User model hooks.
-   [ ] Implement data validation on the server side using **joi** or similar.
-   [ ] Write routes tests using **Postman**.

### 🖼️ Frontend

-   [ ] Set up / initialize the project's frontend folders/files structure.

### 🔧 Deployment / Environment

> There are no new tasks for this section currently.

### 🧩 Extras / UI

-   [ ] Add basic UI components for MVP (buttons, forms, layout).

### ✔️ Completed

---

| Commit # | Date Completed | Type | Description |
| --- | --- | --- | --- |
| [`3`](./.tracking/todos/Todo#3.md) | 25/09/2025 | `🔙 Backend` | Create the mongoose schemas/models for the MVP edition of the project. |
| [`2`](./.tracking/changelogs/Changelog#2.md) | 24/09/2025 | `🔧 Deployment / Environment` | Set up deployment and environment configurations using dotenv. |
| [`1`](./.tracking/changelogs/Changelog#1.md) | 23/09/2025 | `🔙 Backend` | Set up centralized error handling middleware. |
| [`1`](./.tracking/changelogs/Changelog#1.md) | 23/09/2025 | `🔙 Backend` | Added custom logger using [`winston`](https://github.com/winstonjs/winston) library. |
| [`1`](./.tracking/changelogs/Changelog#1.md) | 23/09/2025 | `🔙 Backend` | Integrate logging middleware (e.g., `morgan`) for request monitoring. |
| [`1`](./.tracking/changelogs/Changelog#1.md) | 23/09/2025 | `🔙 Backend` | Set up / initialize the project's backend folders/files structure. |
| [`1`](./.tracking/changelogs/Changelog#1.md) | 23/09/2025 | `🔧 Deployment / Environment` | Create `.tracking/todos/` and `.tracking/changelogs/` directories for snapshots. |
| [`1`](./.tracking/changelogs/Changelog#1.md) | 23/09/2025 | `🧩 Extras / UI` | Add `Changelog.md` and `Todo.md` for tracking. |


[← Back to Todo.md](../../Todo.md)
