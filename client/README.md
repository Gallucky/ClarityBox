# React + TypeScript + Vite

> This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

<p align="center" style="display: flex; flex-direction: column; align-items: center;">
  <a href="../README.md">
    <img src="../docs/assets/icons/claritybox-logo-client.svg" alt="ClarityBox Logo" width="750"/>
  </a>
  <div style="display: flex; align-items: center; justify-content: center; margin-top: -3rem; gap: 1rem;">
  <a href="./server/README.md">
      <img src="https://img.shields.io/badge/Server-Node.js%20%2B%20Express-3B5BFF?style=for-the-badge&logo=node.js&logoColor=white" alt="Server Badge"/>
  </a>
  <a href="../README.md">
    <img src="https://img.shields.io/badge/App-Full Stack-47E0F3?style=for-the-badge&logo=react&logoColor=white" alt="Client Badge"/>
  </a>
  <a href="../docs/README.md">
    <img src="https://img.shields.io/badge/Docs-Planning%20%26%20Architecture-6B5BFF?style=for-the-badge&logo=markdown&logoColor=white" alt="Docs Badge"/>
  </a>
  </div>
</p>

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...

            // Remove tseslint.configs.recommended and replace with this
            ...tseslint.configs.recommendedTypeChecked,
            // Alternatively, use this for stricter rules
            ...tseslint.configs.strictTypeChecked,
            // Optionally, add this for stylistic rules
            ...tseslint.configs.stylisticTypeChecked,

            // Other configs...
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs["recommended-typescript"],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ["./tsconfig.node.json", "./tsconfig.app.json"],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```
