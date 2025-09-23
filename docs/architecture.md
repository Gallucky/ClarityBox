# ClarityBox Project Architecture

## 1. Overview

ClarityBox is a full-stack web application with a React frontend and Node.js backend, using MongoDB for data persistence. The architecture is modular to support maintainability, scalability, and easy deployment.

## 2. Folder Structure

### Frontend (React)

my-app-frontend/ ├─ public/ ├─ src/ │ ├─ components/ # Reusable UI components │ ├─ pages/ # Page components mapped to routes │ ├─ services/ # API calls using axios │ ├─ styles/ # Tailwind + CSS modules │ ├─ assets/ # Images, icons │ └─ utils/ # Helper functions ├─ .env # Environment variables (local only) ├─ package.json ├─ README.md ├─ TODO.md └─ CHANGELOG.md

### Backend (Node.js + Express)

my-app-backend/ ├─ src/ │ ├─ controllers/ # Business logic for routes │ ├─ models/ # Mongoose schemas │ ├─ routes/ # API endpoints │ ├─ middleware/ # Auth, error handling │ ├─ utils/ # Helper functions │ └─ app.js # Express server entry ├─ .env # MONGO_URI, JWT_SECRET, PORT ├─ package.json ├─ README.md ├─ TODO.md └─ CHANGELOG.md

## 3. Flow Overview

1. User interacts with React frontend.
2. Frontend makes API requests via Axios.
3. Backend routes receive requests, validate, authenticate, and execute business logic.
4. MongoDB stores and retrieves data.
5. Responses are sent back to frontend for rendering.

## 4. Deployment Flow

-   Frontend: Vercel / Render
-   Backend: Render / Node server
-   MongoDB: Atlas or local
-   Environment variables configured in `.env` and deployment settings.
