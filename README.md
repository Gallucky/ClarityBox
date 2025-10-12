# ClarityBox

> **Full Stack Project by Gal Ben Abu**  
> Gratitude journaling ✨ meets project & task management 🧩 all in one integrated productivity platform.<br> Gal Ben Abu's HackerU full stack web development final project about gratitude writing, project and task management along side of a habit tracker.

---

## 📘 Overview

ClarityBox is a full-stack web application combining:

-   **Gratitude Tracker** — promote positive reflection and mindset.
-   **Project & Task Manager** — manage goals and track progress visually.

> Currently in **active backend development** _(pre-MVP)_.<br> Frontend scaffolded with React + Vite + TypeScript.

---

## 🧱 Tech Stack

| Layer | Stack |
| :-- | :-- |
| **Frontend** | [React](https://react.dev), [TypeScript](https://www.typescriptlang.org), [Vite](https://vitejs.dev), [TailwindCSS](https://tailwindcss.com) |
| **Backend** | [Node.js](https://nodejs.org), [Express](https://expressjs.com), [MongoDB](https://www.mongodb.com) |
| **Authentication** | [JWT](https://jwt.io), [bcrypt](https://www.npmjs.com/package/bcrypt) |
| **CI/CD & Automation** | [GitHub Actions](https://github.com/features/actions) _(auto-changelog, auto-todo)_ |
| **Logging** | [Winston](https://github.com/winstonjs/winston), [Morgan](https://github.com/expressjs/morgan) |
| **Documentation** | Markdown + automated tracking scripts |

---

## 🧩 Development Progress

### Workflows

> Full development history intentionally preserved (149+ commits) for transparency.  
> Those early commits (~150) are showing the full learning process of building semi-automated<br> (Requiring manual click to start) workflows from scratch without any proper background on the topic.<br>All of those commits were saved to the [`testing/workflows`](https://github.com/Gallucky/ClarityBox/tree/testing/workflows) branch, which is now deprecated and squash merged to the [`dev`](https://github.com/Gallucky/ClarityBox/tree/dev) branch.

| Version | Status | Summary |
| :-- | :-: | :-- |
| Next | 🏗️ | Working on MVP CRUD routes |
| [`v0.1.2-alpha`](https://github.com/Gallucky/ClarityBox/releases/tag/v0.1.2-alpha) | ✅ | Fixing CI/CD workflows, changing the backup scripts logic,<br>Migrating from ShellScript to JavaScript and changes to the README files... |
| [`v0.1.1-alpha`](https://github.com/Gallucky/ClarityBox/releases/tag/v0.1.1-alpha) | ✅ | Stabilizing CI/CD pipelines |
| [`v0.1.0-alpha`](https://github.com/Gallucky/ClarityBox/releases/tag/v0.1.0-alpha) | ✅ | Backend foundation — Auth system, user module, and architecture |

---

## 🧭 Folder Structure

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
📦 <strong style="color: #ce966e">ClarityBox/</strong>
├── 📁 <a href="./client/">client/</a>
│   ├── 📁 <a href="./client/public/">public/</a>
│   ├── 📁 <a href="./client/src/">src/</a>
│   ├── 📄 <a href="./client/index.html">index.html</a>
│   ├── 📄 <a href="./client/package-lock.json">package-lock.json</a>
│   ├── 📄 <a href="./client/package.json">package.json</a>
│   ├── 📄 <a href="./client/README.md">README.md</a>
│   ├── 📄 <a href="./client/eslint.config.js">eslint.config.js</a>
│   ├── 📄 <a href="./client/eslint.config.ts">eslint.config.ts</a>
│   ├── 📄 <a href="./client/tsconfig.app.json">tsconfig.app.json</a>
│   ├── 📄 <a href="./client/tsconfig.json">tsconfig.json</a>
│   ├── 📄 <a href="./client/tsconfig.node.json">tsconfig.node.json</a>
│   └── 📄 <a href="./client/vite.config.ts">vite.config.ts</a>
├── 📁 <a href="./docs/">docs/</a>
│   ├── 📁 <a href="./docs/assets/">assets/</a>
│   ├── 📄 <a href="./docs/architecture.md">architecture.md</a>
│   ├── 📄 <a href="./docs/database.md">database.md</a>
│   ├── 📄 <a href="./docs/requirements.md">requirements.md</a>
│   └── 📄 <a href="./docs/ui.md">ui.md</a>
├── 📁 <a href="./scripts/">scripts/</a>
│   ├── 📁 <a href="./scripts/generated/">generated/</a>
│   └── 📁 <a href="./scripts/utils/">utils/</a>
│   ├── 📄 <a href="./scripts/create-edit-issue-labels.ps1">create-edit-issue-labels.ps1</a>
│   ├── 📄 <a href="./scripts/generate-folder-tree.js">generate-folder-tree.js</a>
│   ├── 📄 <a href="./scripts/generate-issues-via-csv.ps1">generate-issues-via-csv.ps1</a>
├── 📁 <a href="./server/">server/</a>
│   ├── 📁 <a href="./server/auth/">auth/</a>
│   ├── 📁 <a href="./server/DB/">DB/</a>
│   ├── 📁 <a href="./server/features/">features/</a>
│   ├── 📁 <a href="./server/initialData/">initialData/</a>
│   ├── 📁 <a href="./server/logger/">logger/</a>
│   ├── 📁 <a href="./server/middlewares/">middlewares/</a>
│   ├── 📁 <a href="./server/router/">router/</a>
│   └── 📁 <a href="./server/utils/">utils/</a>
│   ├── 📄 <a href="./server/package-lock.json">package-lock.json</a>
│   ├── 📄 <a href="./server/package.json">package.json</a>
│   ├── 📄 <a href="./server/server.js">server.js</a>
│   ├── 📄 <a href="./server/README.md">README.md</a>
│   ├── 📄 <a href="./server/eslint.config.mjs">eslint.config.mjs</a>
├── 📄 <a href="./package.json">package.json</a>
├── 📄 <a href="./README.md">README.md</a>
├── 📄 <a href="./Changelog.md">Changelog.md</a>
└── 📄 <a href="./Todo.md">Todo.md</a>
</pre>

---

## 🧰 Setup Instructions

### Prerequisites

-   Node.js 20+
-   MongoDB (local or Atlas)
-   npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Gallucky/ClarityBox.git

# Navigate to the project directory
cd ClarityBox

# Install dependencies
npm install
```

### Run backend

```bash
# Navigate to the server directory
cd server

# Start the server in development mode
npm run dev
```

### Run frontend

```bash
# Navigate to the client directory
cd client

# Start the client in development mode
npm run dev
```

---

## 🧪 Notes

-   Early commit history intentionally preserved for transparency — this project documents both **learning and implementation**.
-   Future versions will include structured documentation and API reference under [`/docs`](./docs/).

---

## 📜 License

MIT License © 2025 Gal Ben Abu
