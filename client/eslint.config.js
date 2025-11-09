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
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },

        settings: {
            react: { version: "detect" },
            "import/resolver": {
                node: true,
                typescript: true,
            },
            "boundaries/elements": [
                { type: "app", pattern: "src/app/**" },
                { type: "pages", pattern: "src/pages/**" },
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

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended, // no type-checking needed
        ],

        rules: {
            // General hygiene
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "func-style": ["error", "expression"],
            "max-lines": ["warn", { max: 200, skipBlankLines: true, skipComments: true }],

            // TypeScript
            "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",

            // Hooks
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

            // Imports
            "unused-imports/no-unused-imports": "error",
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

            // Enforce alias usage
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

            // Architectural boundaries
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
