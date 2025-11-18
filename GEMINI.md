# GEMINI.md

This file provides a comprehensive overview of the ClarityBox project, its structure, and how to interact with it.

## Project Overview

ClarityBox is a full-stack web application designed as a productivity platform that combines gratitude journaling with project and task management. It's built with a modern tech stack, featuring a React frontend and a Node.js backend.

### Key Technologies

*   **Frontend:** React, TypeScript, Vite, TailwindCSS
*   **Backend:** Node.js, Express, MongoDB
*   **Authentication:** JWT, bcrypt
*   **CI/CD & Automation:** GitHub Actions

The project is structured as a monorepo with two main packages: `client` and `server`.

## Building and Running

### Prerequisites

*   Node.js 20+
*   MongoDB (local or Atlas)
*   `npm` or your preferred package manager

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Gallucky/ClarityBox.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd ClarityBox
    ```
3.  Install dependencies for the entire project (this will install for both `client` and `server` if they are configured in the root `package.json`'s workspaces, which is a good practice to consider):
    ```bash
    npm install
    ```
    If the above does not work, install dependencies for each package separately:
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```

### Running the Application

The application consists of two separate parts: the backend server and the frontend client. You'll need to run both concurrently in separate terminal sessions.

#### Backend (Server)

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
    The server will typically run on the port specified in your environment variables (e.g., `http://localhost:3000`).

#### Frontend (Client)

1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
    The client will be available at `http://localhost:5173` by default.

## Development Conventions

### Code Style

*   The project uses **ESLint** for code linting and **Prettier** for code formatting.
*   Configuration files (`eslint.config.js`, `prettier.config.js`) are present in both the `client` and `server` directories.
*   It is recommended to run the linter and formatter before committing changes:
    *   `npm run lint`
    *   `npm run format`

### Testing

*   There are no explicit test scripts (`test`) in the `package.json` files.
*   **TODO:** Add a testing framework (e.g., Jest, Vitest) and write unit and integration tests for the application.

### Contribution

*   The project follows a conventional commit message format.
*   The `Changelog.md` is automatically updated using GitHub Actions.
*   The project uses a `dev` branch for ongoing development and `main` for stable builds.
