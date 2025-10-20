# ClarityBox Server

> Backend web service for the ClarityBox full-stack project.<br> The server provides REST APIs endpoints for the frontend,<br> authentication, and database handling and access.

## ⚙️ Overview

-   Express.js server built with modular architecture
-   MongoDB for custom requirements and rules (document based)
-   JWT authentication and bcrypt password hashing.
-   Logging with Morgan and Winston for custom logger.

---

## 🧱 Tech Stack

| Layer | Technology |
| :-- | :-- |
| **Runtime** | [Node.js](https://nodejs.org/en) |
| **Framework** | [Express.js](https://expressjs.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) |
| **Authentication** | [JWT](https://www.jwt.io/) |
| **Password Hashing** | [bcrypt](https://www.npmjs.com/package/bcrypt) |
| **Logging** | [Morgan](https://www.npmjs.com/package/morgan), [Winston](https://www.npmjs.com/package/winston) |

## 📁 Folder Structure

<!--
📁 Auto-generated folder tree — created by the generate-html-tree.js script.
Keep this file (or its contents) in the same directory as the input path.
Moving it elsewhere will break the relative links to files and folders.
-->
<pre style="
  font-family: 'Fira Code', 'Consolas', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #eaeaea;
  background-color: #1e1e1e;
  padding: 1rem;
  border-radius: 10px;
  overflow-x: auto;
">
📦 <strong>server/</strong>
├── 📁 <a href="./auth/">auth/</a>
│   ├── 📁 <a href="./auth/Providers/">Providers/</a>
│   └── 📄 <a href="./auth/authService.js">authService.js</a>
├── 📁 <a href="./DB/">DB/</a>
│   ├── 📁 <a href="./DB/mongodb/">mongodb/</a>
│   └── 📄 <a href="./DB/dbService.js">dbService.js</a>
├── 📁 <a href="./features/">features/</a>
│   ├── 📁 <a href="./features/posts/">posts/</a>
│   ├── 📁 <a href="./features/projects/">projects/</a>
│   ├── 📁 <a href="./features/tasks/">tasks/</a>
│   └── 📁 <a href="./features/users/">users/</a>
├── 📁 <a href="./initialData/">initialData/</a>
│   ├── 📄 <a href="./initialData/initialData.json">initialData.json</a>
│   └── 📄 <a href="./initialData/initialDataService.js">initialDataService.js</a>
├── 📁 <a href="./logger/">logger/</a>
│   ├── 📁 <a href="./logger/loggers/">loggers/</a>
│   └── 📄 <a href="./logger/loggerService.js">loggerService.js</a>
├── 📁 <a href="./middlewares/">middlewares/</a>
│   └── 📄 <a href="./middlewares/cors.js">cors.js</a>
├── 📁 <a href="./router/">router/</a>
│   └── 📄 <a href="./router/router.js">router.js</a>
├── 📁 <a href="./utils/">utils/</a>
│   ├── 📄 <a href="./utils/getLocationFormatted.js">getLocationFormatted.js</a>
│   ├── 📄 <a href="./utils/globalValidations.js">globalValidations.js</a>
│   ├── 📄 <a href="./utils/handleErrors.js">handleErrors.js</a>
│   └── 📄 <a href="./utils/timeStamp.js">timeStamp.js</a>
├── 📄 <a href="./eslint.config.mjs">eslint.config.mjs</a>
├── 📄 <a href="./package-lock.json">package-lock.json</a>
├── 📄 <a href="./package.json">package.json</a>
├── 📄 <a href="./README.md">README.md</a>
└── 📄 <a href="./server.js">server.js</a>
</pre>

## 🚀 Setup

### 🔒 Environment Variables (.env)

> The structure should be like this:

<pre>
  .env
  .env.development
  .env.production
</pre>

#### Default Environment Variables

```bash
TOKEN_GENERATOR=<enter the token generator>
TOKEN_SECRET_KEY=<enter the secret key for encoding/decoding a token (token signing)>
```

#### Development Environment Variables

```bash
ENV=Development
PORT=<enter the development port>
TOKEN_VALID_DURATION=<enter the token validity duration in development>
```

#### Production Environment Variables

```bash
ENV=Production
PORT=<enter the production port>
TOKEN_VALID_DURATION=<enter the token validity duration in production>
ALLOWED_ORIGINS=<enter the list of allowed origins - multiple origins separated by commas with no spaces>
```

### Installation

> Starting from the root directory.

```bash
cd server
npm install
```

### Development Run

> Starting from the root directory.

```bash
cd server
npm run dev
```

### Production Run

> Starting from the root directory.

```bash
cd server
npm run start
```

## ⛳ API Overview

### Users Endpoints

| Endpoint | Method | Description | Permission Level | MVP | Status |
| :-- | :-: | :-- | :-- | --- | :-: |
| `/users/:id` | GET | Get User | The referenced user or admin | ✅ | ✅ |
| `/users/` | GET | Get All Users | Admin | ❌ | ✅ |
| `/users/` | POST | Register new user | Everyone | ✅ | ✅ |
| `/users/login` | POST | Login-in and authenticate a user | Everyone | ✅ | ✅ |
| `/users/:id` | PUT | Update User | The referenced user | ✅ | ✅ |
| `/users/:id` | PATCH | Block a user | Admin | ❌ | ❌ |
| `/users/ban/:id` | PATCH | Ban a user | Admin | ❌ | ❌ |
| `/users/:id` | DELETE | Delete User | The referenced user or admin | ✅ | ✅ |

### Posts Endpoints

| Endpoint | Method | Description | Permission Level | MVP | Status |
| :-- | :-: | :-- | :-- | --- | :-: |
| `/posts/:id` | GET | Get Post by Id | The creator of the post or an admin user /<br>Everyone if the post is public | ✅ | ✅ |
| `/posts/public` | GET | Get All Public Posts | Everyone | ✅ | ✅ |
| `/posts/` | GET | Get All Posts | Admin | ✅ | ✅ |
| `/posts/my-posts` | GET | Get All of my Posts | Authenticated User | ✅ | ✅ |
| `/posts/user-posts/:id` | GET | Get User's Posts | Admin | ✅ | ✅ |
| `/posts/` | POST | Create a Post | Authenticated User | ✅ | ✅ |
| `/posts/` | PUT | Update / edit a Post | The creator of the post | ✅ | ✅ |
| `/posts/:id/like` | PATCH | Like a Post | Authenticated User | ❌ | ❌ |
| `/posts/:id/comment` | PATCH | Comment on a Post | Authenticated User | ❌ | ❌ |
| `/posts/:id/favorite` | PATCH | Favorite a Post | Authenticated User | ❌ | ❌ |
| `/posts/:id/share` | PATCH | Share a Post | Authenticated User | ❌ | ❌ |
| `/posts/:id` | DELETE | Delete a Post | The creator of the post or an admin user | ✅ | ✅ |

### Projects Endpoints

| Endpoint | Method | Description | Permission Level | MVP | Status |
| :-- | :-: | :-- | :-- | --- | :-: |
| `/projects/` | GET | Get All Projects | Admin | ✅ | 🏗️ - 1/3 |
| `/projects/public` | GET | Get All Public Projects | Everyone | ✅ | 🏗️ - 1/3 |
| `/projects/my-projects` | GET | Get All of my Projects | Authenticated User | ✅ | 🏗️ - 1/3 |
| `/projects/user-projects/:id` | GET | Get User's Projects | Admin or authenticated user | ✅ | 🏗️ - 1/3 |
| `/projects/:id` | GET | Get Public Project | Everyone - If the project is public / <br>Creator/Participant or admin | ✅ | 🏗️ - 1/3 |
| `/projects` | POST | Create a Project | Authenticated User | ✅ | 🏗️ - 1/3 |
| `/projects/` | PUT | Update / edit a Project | The creator of the project | ✅ | 🏗️ - 1/3 |
| `/projects/:projectId/attach-task/:taskId` | PATCH | Adding / attaching a task to a project | The creator of the project | ✅ | 🏗️ - 1/3 |
| `/projects/:projectId/detach-task/:taskId` | PATCH | Removing / detaching a task to a project | The creator of the project | ✅ | 🏗️ - 1/3 |
| `/projects/:id` | DELETE | Delete a Project | The creator of the project or an admin user | ✅ | 🏗️ - 1/3 |

### Tasks Endpoints

| Endpoint | Method | Description | Permission Level | MVP | Status |
| :-- | :-: | :-- | :-- | --- | :-: |
| `/tasks/` | GET | Get All Tasks | Admin | ✅ | ❌ |
| `/tasks/:id` | GET | Get Task | Creator of the task or an admin user | ✅ | ⏳ |
| `/tasks` | POST | Create a Task | Authenticated User | ✅ | ⏳ |
| `/tasks/:id` | PUT | Update / edit a Task | The creator of the task | ✅ | ⏳ |
| `/tasks/mark-completed/:id` | PATCH | Complete a Task | The creator of the task or an admin user | ❌ | ❌ |
| `/tasks/restore-task/:id` | PATCH | Restore a detached Task | The creator of the task | ❌ | ❌ |
| `/tasks/:id` | DELETE | Delete a Task | The creator of the task or an admin user | ✅ | ⏳ |

## 📝 Notes

-   Centralized error handling under [`./utils/handleErrors.js`](./utils/handleErrors.js).
-   Custom logger created by using the [Winston](https://www.npmjs.com/package/winston) package for logging.
-   MongoDB models defined using the [Mongoose](https://www.npmjs.com/package/mongoose) package's schemas.
-   JWT tokens are used to authenticate users and their permission level.
-   Passwords are hashed using the [bcrypt](https://www.npmjs.com/package/bcrypt) package.
-   Environment variables are loaded using the [Dotenv](https://www.npmjs.com/package/dotenv) package.

## License

MIT License © 2025 [Gallucky](https://github.com/Gallucky)
