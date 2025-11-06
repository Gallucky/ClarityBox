// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import boundaries from "eslint-plugin-boundaries";
import unusedImports from "eslint-plugin-unused-imports";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
    // Ignore non-source files
    {
        ignores: [
            "dist",
            "build",
            "coverage",
            "node_modules",
            "src/__generated__",
            "eslint.config.js",
            "vite.config.{js,ts}",
            "tailwind.config.{js,ts}",
        ],
    },

    {
        files: ["src/**/*.{js,jsx,ts,tsx}"],

        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: globals.browser,
            parserOptions: {
                projectService: false,
                tsconfigRootDir: import.meta.dirname,
            },
        },

        settings: {
            react: { version: "detect" },
            "import/resolver": {
                node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
                typescript: {
                    alwaysTryTypes: true, // optional, resolves @types packages
                    project: "./tsconfig.json", // ensure this points to your TS config
                },
            },
            "boundaries/elements": [
                { type: "app", pattern: "src/app/**" },
                { type: "pages", pattern: "src/pages/*/**" },
                { type: "components", pattern: "src/components/**" },
                { type: "hooks", pattern: "src/hooks/**" },
                { type: "utils", pattern: "src/utils/**" },
                { type: "lib", pattern: "src/lib/**" },
                { type: "types", pattern: "src/types/**" },
            ],
        },

        plugins: {
            import: importPlugin,
            boundaries,
            "unused-imports": unusedImports,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },

        extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],

        rules: {
            // --- General ---
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "func-style": ["error", "expression"], // enforce arrow functions only
            "no-useless-rename": [
                "warn",
                {
                    ignoreDestructuring: false,
                    ignoreImport: false,
                    ignoreExport: false,
                },
            ],
            "max-lines": [
                "warn",
                {
                    max: 200,
                    skipBlankLines: true,
                    skipComments: true,
                },
            ],

            // --- TypeScript ---
            "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/class-methods-use-this": "off", // prevents conflict
            "@typescript-eslint/unbound-method": "off", // disables `this` warnings
            "@typescript-eslint/no-invalid-this": "off", // disables `this` enforcement
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/prefer-promise-reject-errors": "off",

            // --- React Hooks ---
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

            // --- Unused imports ---
            "unused-imports/no-unused-imports": "error",
            "@typescript-eslint/no-unused-vars": "off",

            // --- Import hygiene ---
            "import/no-duplicates": "error",
            "import/no-cycle": ["error", { ignoreExternal: true }],
            "import/order": [
                "warn",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling", "index"],
                        "type",
                    ],
                    alphabetize: { order: "asc", caseInsensitive: true },
                    pathGroups: [{ pattern: "@/**", group: "internal", position: "after" }],
                    pathGroupsExcludedImportTypes: ["builtin"],
                },
            ],

            // --- Enforce path alias usage ---
            "no-restricted-imports": [
                "error",
                {
                    patterns: [
                        {
                            group: ["**/../*", "**/../../*", "**/../../../*"],
                            message: "Use path aliases (e.g. '@/utils') instead of relative paths.",
                        },
                    ],
                },
            ],

            // --- Architectural boundaries ---
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
