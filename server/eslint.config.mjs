import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

// Custom rules
const rules = {
    // --- Error Prevention ---
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-undef": "off",
    "no-unused-vars": "warn",

    // --- Best Practices ---
    // Prioritize the use of === and !== over == and !=
    eqeqeq: ["warn", "always"],
    // Disallow var; use let/const instead.
    "no-var": "error",
    // Suggest const when variable is not reassigned.
    "prefer-const": ["warn", { destructuring: "all" }],
    // Prevent irregular spacing.
    "no-multi-spaces": "error",
    // Prevent redeclaring variables.
    "no-redeclare": "error",
    // Prevent reversed conditions like if (5 === count).
    yoda: ["error", "never"],
    // Ensure callback is called properly (Express-specific).
    "callback-return": ["warn", ["callback", "cb", "next"]],

    // --- Node Environment ---
    // Require all require() calls at the top.
    "global-require": "error",

    // --- Style Consistency ---
    // Require semicolons.
    semi: ["error", "always"],
    // Require space before block `{`.
    "space-before-blocks": ["error", "always"],
    // Enforce spacing around keywords.
    "keyword-spacing": ["error", { before: true, after: true }],
    // Require spaces around => in arrow functions.
    "arrow-spacing": ["error", { before: true, after: true }],

    // --- Maintainability ---
    "max-lines": ["error", { max: 200, skipBlankLines: true, skipComments: true }],
    // Warn about deeply nested code.
    "max-depth": ["warn", 4],
    // Warn about too many nested callbacks.
    "max-nested-callbacks": ["warn", 3],
    // Avoid importing same module twice.
    "no-duplicate-imports": "error",

    // --- ES6+ Modernization ---
    // Prefer arrow functions in callbacks.
    "prefer-arrow-callback": "error",
    // Use concise arrow functions when possible.
    "arrow-body-style": ["warn", "as-needed"],
    // Use { key } instead of { key: key }.
    "object-shorthand": ["error", "always"],
};

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser },
        rules,
    },
    {
        files: ["**/*.js"],
        languageOptions: { sourceType: "commonjs" },
    },
]);
