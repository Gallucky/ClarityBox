# TODO

Tracks tasks per commit. Snapshot copies are stored in [`.tracking/todos/`](./.tracking/todos/).

To check the current changelog see the [Project's Changelog](./Changelog.md) file, with snapshots stored in [`.tracking/changelogs/`](./.tracking/changelogs/).

---

## Current Commit: #5 - 02/10/2025


### 🔙 Backend

-   [ ] Write routes tests using Postman [#7](https://github.com/Gallucky/ClarityBox/issues/7)
-   [ ] Follow controller structure pattern for Posts, Projects, and Tasks [#6](https://github.com/Gallucky/ClarityBox/issues/6)
    - Proper authentication
    - Logging
-   [ ] Add password hashing with bcrypt in User model hooks [#5](https://github.com/Gallucky/ClarityBox/issues/5)
-   [ ] Implement authentication routes [#4](https://github.com/Gallucky/ClarityBox/issues/4)
    - /users/login for login
    - /users for register
-   [ ] Complete User service layer functions [#3](https://github.com/Gallucky/ClarityBox/issues/3)
    - getUsers
    - getUser
-   [ ] Write basic validation for incoming requests [#2](https://github.com/Gallucky/ClarityBox/issues/2)
-   [ ] Add routes for the created models (User, Post, Task, Project) [#1](https://github.com/Gallucky/ClarityBox/issues/1)
    - Implement CRUD routes for User model (in progress - controller structure created, missing service layer functions)
    - Implement CRUD routes for Post model
    - Implement CRUD routes for Task model

### 🖼️ Frontend

-   [ ] Add basic UI components for MVP [#9](https://github.com/Gallucky/ClarityBox/issues/9)
    - Buttons
    - Forms
-   [ ] Set up / initialize the project's frontend folders/files structure [#8](https://github.com/Gallucky/ClarityBox/issues/8)

### ✔️ Completed

---

| Commit # | Date Completed | Type | Description |
| --- | --- | --- | --- |
| [`5`](./.tracking/todos/Todo#5.md) | 02/10/2025 | `🔧 Deployment / Environment` | [Create tracking directories for snapshots](https://github.com/Gallucky/ClarityBox/issues/17) |
| [`5`](./.tracking/changelogs/Changelog#5.md) | 02/10/2025 | `🔙 Backend` | [Set up backend project structure](https://github.com/Gallucky/ClarityBox/issues/16) |
| [`5`](./.tracking/changelogs/Changelog#5.md) | 02/10/2025 | `🔙 Backend` | [Integrate logging middleware for request monitoring](https://github.com/Gallucky/ClarityBox/issues/15) |
| [`5`](./.tracking/changelogs/Changelog#5.md) | 02/10/2025 | `🔙 Backend` | [Add custom logger using winston](https://github.com/Gallucky/ClarityBox/issues/14) |
| [`5`](./.tracking/changelogs/Changelog#5.md) | 02/10/2025 | `🔙 Backend` | [Set up centralized error handling middleware](https://github.com/Gallucky/ClarityBox/issues/13) |
| [`5`](./.tracking/todos/Todo#5.md) | 02/10/2025 | `🔧 Deployment / Environment` | [Set up deployment and environment configurations](https://github.com/Gallucky/ClarityBox/issues/12) |
| [`5`](./.tracking/changelogs/Changelog#5.md) | 02/10/2025 | `🔙 Backend` | [Create mongoose schemas/models for MVP](https://github.com/Gallucky/ClarityBox/issues/11) |
| [`5`](./.tracking/changelogs/Changelog#5.md) | 02/10/2025 | `🔙 Backend` | [Add authentication middleware for protected routes](https://github.com/Gallucky/ClarityBox/issues/10) |

> Synced at Thu, 02 Oct 2025 20:46:54 GMT
