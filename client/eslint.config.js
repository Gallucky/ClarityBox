// eslint.config.js
import { defineConfig } from "eslint/config";

import js from "@eslint/js"; // Core ESLint rules
import globals from "globals"; // Browser globals
import tseslint from "typescript-eslint"; // TypeScript rules + parser
import importPlugin from "eslint-plugin-import"; // Import validation and order
import boundaries from "eslint-plugin-boundaries"; // Architectural isolation

export default defineConfig([
    // Ignore generated / build artifacts
    {
        ignores: [
            "dist",
            "build",
            "coverage",
            "node_modules",
            "src/__generated__",
            // Ignore this file and other config files like this one.
            "eslint.config.js",
            "vite.config.{js,ts}",
            "tailwind.config.{js,ts}",
        ],
    },

    {
        // Rules here applies only to JS/TS files in src folder and subfolders.
        files: ["./src/**/*.{js,jsx,ts,tsx}"],

        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            // Predefines all standard browser global variables so ESLint doesn’t flag them as undefined.
            // Such as window, document, navigator, localStorage, setTimeout, etc.
            globals: { ...globals.browser },
            parserOptions: {
                projectService: true, // auto type-aware linting
                tsconfigRootDir: import.meta.dirname,
            },
        },

        settings: {
            // Auto-detecting the react version.
            react: { version: "detect" },
            // Helps eslint-plugin-import understand how modules are resolved.
            // - 'typescript' uses tsconfig paths and baseUrl for alias imports (e.g. "@/components").
            // - 'node' ensures Node's default resolution logic works for plain JS/TS files.
            "import/resolver": {
                node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
            },
            // Defines logical project layers for eslint-plugin-boundaries.
            // Each "type" maps to a directory pattern and represents a distinct architectural area.
            // These are used by the "boundaries/element-types" rule to control what can import what.
            "boundaries/elements": [
                // Global app structure, routing, providers etc...
                { type: "app", pattern: "src/app/**" },
                // Route level pages / entry points.
                { type: "pages", pattern: "src/pages/*/**" },
                // Shared UI components
                { type: "components", pattern: "src/components/**" },
                // Shared reusable hooks
                { type: "hooks", pattern: "src/hooks/**" },
                // Utility helper functions.
                { type: "utils", pattern: "src/utils/**" },
                // Third party wrappers, API clients.
                { type: "lib", pattern: "src/lib/**" },
                // Shared global type definitions.
                { type: "types", pattern: "src/types/**" },
            ],
        },

        plugins: {
            import: importPlugin,
            "unused-imports": unusedImports,
            boundaries,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },

        extends: [
            js.configs.recommended, // Base ESLint
            ...tseslint.configs.recommendedTypeChecked, // TypeScript + type-aware rules
        ],

        rules: {
            // --- General ---
            "no-console": ["warn", { allow: ["warn", "error"] }], // still useful with Prettier

            // --- TypeScript correctness ---
            "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],

            // --- React Hooks + Fast Refresh ---
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

            // --- Unused imports ---
            "unused-imports/no-unused-imports": "error",
            "@typescript-eslint/no-unused-vars": "off",

            // --- Import hygiene ---
            // Disallowing imports from the same module in one file.
            "import/no-duplicates": "error",
            // Preventing circular imports e.g x imports from y that imports from x.
            "import/no-cycle": ["error", { ignoreExternal: true }],
            "import/order": [
                "error",
                {
                    // Defines how import groups should be ordered and separated by newlines.
                    groups: [
                        "external", // Packages from node_modules
                        "internal", // Aliased project imports (e.g. "@/utils")
                        ["parent", "sibling", "index"], // Relative imports from nearby files
                        "type", // Type-only imports (import type {...})
                    ],
                    // Requires a blank line between groups so it's easier to differentiate between them.
                    "newlines-between": "always",
                    // Sort imports alphabetically (A→Z)
                    alphabetize: { order: "asc", caseInsensitive: true },
                    // Group aliased paths as "internal" so they appear after external packages
                    pathGroups: [
                        { pattern: "@/**", group: "internal", position: "after" },
                        { pattern: "@app/**", group: "internal", position: "after" },
                        { pattern: "@pages/**", group: "internal", position: "after" },
                        { pattern: "@components/**", group: "internal", position: "after" },
                        { pattern: "@utils/**", group: "internal", position: "after" },
                        { pattern: "@lib/**", group: "internal", position: "after" },
                    ],
                    // Keep built-ins at the very top
                    pathGroupsExcludedImportTypes: ["builtin"],
                },
            ],
            // Forbid deep relative imports across major folders.
            // Enforces using configured path aliases (e.g. "@/utils" instead of "../../../utils").
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["../*", "../../*", "../../../*"],
                            message: "Use path aliases for cross-folder imports.",
                        },
                    ],
                },
            ],

            // --- Boundaries (page isolation) ---
            "boundaries/element-types": [
                "error",
                {
                    default: "allow",
                    rules: [
                        {
                            from: ["pages"],
                            disallow: ["pages"],
                            message: "Do not import another page directly.",
                        },
                        {
                            from: ["pages", "components", "hooks"],
                            allow: ["components", "hooks", "utils", "lib", "types", "app"],
                        },
                    ],
                },
            ],
        },
    },
]);
